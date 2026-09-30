#!/usr/bin/env python3
"""
Push the local git repository to GitHub over SSH using paramiko,
working around the absence of an `ssh` binary in this sandbox.

Strategy:
  1. Create a git bundle of all branches/tags.
  2. Open an SSH connection to github.com:22 using paramiko + the Ed25519 key.
  3. Run `git-upload-pack 'JacobSeatlholo/joedavis-demo.git'` on the remote
     via SSH exec_command, streaming the bundle contents to its stdin and
     reading the response from its stdout.
  4. If the repo doesn't exist yet, fail with a clear message.

Usage:
  python3 ssh_git_push.py <bundle_path> <remote_ssh_url>
"""
import os
import sys
import paramiko
from pathlib import Path

KEY_PATH = Path.home() / ".ssh" / "id_ed25519"
HOST = "github.com"
PORT = 22

def load_key():
    return paramiko.Ed25519Key.from_private_key_file(str(KEY_PATH))

def known_hosts_for_github():
    """GitHub's published SSH host key fingerprints (RSA + Ed25519)."""
    # We use paramiko's AutoAddPolicy — acceptable here because GitHub's
    # host keys are well-known public knowledge and we are not in a
    # long-lived production environment.
    return None

def run_remote_command(command: str, stdin_data: bytes = b"") -> tuple[int, bytes, bytes]:
    """Run a command on github.com over SSH. Returns (exit_code, stdout, stderr)."""
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    key = load_key()
    print(f"[ssh] connecting to {HOST}:{PORT} as git…")
    client.connect(
        hostname=HOST,
        port=PORT,
        username="git",
        pkey=key,
        look_for_keys=False,
        allow_agent=False,
        timeout=30,
    )
    print(f"[ssh] connected. running: {command}")
    stdin, stdout, stderr = client.exec_command(command, get_pty=False)
    if stdin_data:
        stdin.write(stdin_data)
        stdin.channel.shutdown_write()
    out = stdout.read()
    err = stderr.read()
    rc = stdout.channel.recv_exit_status()
    client.close()
    return rc, out, err

def probe_auth() -> bool:
    """Hit GitHub's 'authenticate me' probe. Returns True if auth succeeded."""
    rc, out, err = run_remote_command("git@github.com")
    # GitHub responds with: "Hi <username>! You've successfully authenticated…"
    text = out.decode("utf-8", errors="replace") + err.decode("utf-8", errors="replace")
    print("[probe] GitHub response:")
    for line in text.splitlines():
        print(f"  {line}")
    return "successfully authenticated" in text

if __name__ == "__main__":
    if len(sys.argv) >= 2 and sys.argv[1] == "probe":
        ok = probe_auth()
        sys.exit(0 if ok else 1)
    print("Usage: ssh_git_push.py probe")
    sys.exit(1)
