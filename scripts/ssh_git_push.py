#!/usr/bin/env python3
"""
Push a local git repository to GitHub over SSH, using paramiko + git's
own smart protocol. This works around the absence of an `ssh` binary
in this sandbox.

How git push over SSH works under the hood:
  1. Local git runs `git-receive-pack '<repo>'` on the remote via SSH.
  2. The remote responds with a pkt-line announcement of its current refs
     and capabilities.
  3. Local git computes the packfile of objects to upload, prefixed with
     the new ref assignments ("old-id new-id refname").
  4. The local side writes everything to the stdin of the remote command.
  5. The remote reports progress / results on stdout.

This script:
  - Creates a git bundle of the local repo (full clone in bundle format).
  - Then runs `git-receive-pack` on the remote, manually negotiating the
    push using the bundle's contents.

Actually — the simplest reliable path is to use git's built-in
GIT_SSH_COMMAND / core.gitssh. But without an ssh binary we can't.

Plan B (what we do here): write a tiny "gitssh" wrapper script that
implements the SSH transport via paramiko, and tell git to use it via
GIT_SSH_COMMAND. Git only ever calls this binary as:

    ssh -o... -p PORT git@github.com "git-receive-pack 'user/repo.git'"

(plus optionally -o options). Our wrapper parses out the command and
runs it via paramiko. It reads the local git's stdin (the packfile)
and writes it to the remote's stdin; reads the remote's stdout and
writes it to local git's stdout. That's all git needs.
"""
import os
import sys
import stat
import shlex
import paramiko
from pathlib import Path

KEY_PATH = Path.home() / ".ssh" / "id_ed25519"
WRAPPER_PATH = Path.home() / "bin" / "gitssh-wrapper"

WRAPPER_TEMPLATE = '''#!/usr/bin/env python3
"""Tiny SSH shim that git invokes as GIT_SSH_COMMAND. Routes the request
to github.com:22 over paramiko."""
import os
import sys
import shlex
import paramiko
from pathlib import Path

KEY_PATH = Path.home() / ".ssh" / "id_ed25519"
HOST = "github.com"
PORT = 22
USER = "git"

def parse_args(argv):
    """Drop -o options etc. Pull out host and remote command."""
    host = None
    remote_cmd = None
    port = PORT
    i = 1
    rest = argv[1:]
    while rest:
        a = rest.pop(0)
        if a == "-p":
            port = int(rest.pop(0))
        elif a.startswith("-o"):
            # skip option arg
            if "=" in a:
                pass
            else:
                rest.pop(0)
        elif a.startswith("-"):
            pass  # ignore other flags
        else:
            if host is None:
                host = a
            elif remote_cmd is None:
                remote_cmd = a
            else:
                remote_cmd += " " + a
    return host, port, remote_cmd

def main():
    host, port, remote_cmd = parse_args(sys.argv)
    if host is None or remote_cmd is None:
        sys.stderr.write("gitssh-wrapper: missing host or command\\n")
        sys.exit(2)

    # If host is "user@host" form, split it
    if "@" in host:
        user, host = host.split("@", 1)
    else:
        user = USER

    key = paramiko.Ed25519Key.from_private_key_file(str(KEY_PATH))
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(
        hostname=host,
        port=port,
        username=user,
        pkey=key,
        look_for_keys=False,
        allow_agent=False,
        timeout=30,
    )

    # Open the channel and request the command. Use the raw remote_cmd
    # as a single shell argument (git already quotes the repo path).
    chan = client.get_transport().open_session()
    chan.exec_command(remote_cmd)

    # Wire stdin/stdout/stderr bidirectionally between this process and
    # the remote channel. Git writes packfile to our stdin; we forward
    # it to the channel. We read channel stdout and write to our stdout.
    import select
    import threading

    def pump_stdin_to_chan():
        try:
            while True:
                data = os.read(0, 65536)
                if not data:
                    break
                chan.sendall(data)
        except OSError:
            pass
        finally:
            try:
                chan.shutdown_write()
            except OSError:
                pass

    t = threading.Thread(target=pump_stdin_to_chan, daemon=True)
    t.start()

    # Read from channel stdout/stderr and forward to local stdout/stderr.
    while True:
        r, _, _ = select.select([chan], [], [], 1.0)
        if chan.recv_ready():
            data = chan.recv(65536)
            if not data:
                break
            os.write(1, data)
        if chan.recv_stderr_ready():
            data = chan.recv_stderr(65536)
            if data:
                os.write(2, data)
        if chan.exit_status_ready() and not chan.recv_ready() and not chan.recv_stderr_ready():
            break
    # Drain anything left.
    while chan.recv_ready():
        data = chan.recv(65536)
        if not data:
            break
        os.write(1, data)
    while chan.recv_stderr_ready():
        data = chan.recv_stderr(65536)
        if data:
            os.write(2, data)

    rc = chan.recv_exit_status()
    chan.close()
    client.close()
    sys.exit(rc)

if __name__ == "__main__":
    main()
'''

def install_wrapper():
    WRAPPER_PATH.parent.mkdir(parents=True, exist_ok=True)
    WRAPPER_PATH.write_text(WRAPPER_TEMPLATE)
    WRAPPER_PATH.chmod(0o755)
    print(f"[OK] installed gitssh wrapper at {WRAPPER_PATH}")

def main():
    install_wrapper()
    print()
    print("To push, run:")
    print()
    print(f"  GIT_SSH_COMMAND={WRAPPER_PATH} git push -u origin main")
    print()
    print("(git will call the wrapper as if it were ssh; the wrapper")
    print(" routes the connection to github.com:22 over paramiko.)")

if __name__ == "__main__":
    main()
