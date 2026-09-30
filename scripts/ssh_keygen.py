#!/usr/bin/env python3
"""
Generate a fresh Ed25519 SSH keypair using Python's cryptography library,
formatted as OpenSSH private + public keys. Overwrites any existing keys.
"""
import base64
import os
import struct
import secrets
from pathlib import Path

from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PrivateKey
from cryptography.hazmat.primitives import serialization

SSH_DIR = Path.home() / ".ssh"
PRIV_PATH = SSH_DIR / "id_ed25519"
PUB_PATH = SSH_DIR / "id_ed25519.pub"
COMMENT = "joedavis-demo@sandbox"

def ssh_string(b: bytes) -> bytes:
    return struct.pack(">I", len(b)) + b

def ssh_uint32(n: int) -> bytes:
    return struct.pack(">I", n)

def encode_pubkey_blob(pub: bytes) -> bytes:
    return ssh_string(b"ssh-ed25519") + ssh_string(pub)

def encode_privkey_blob(pub: bytes, priv64: bytes, comment: bytes) -> bytes:
    check = secrets.randbelow(2**32)
    blob = b""
    blob += ssh_uint32(check)
    blob += ssh_uint32(check)
    blob += ssh_string(b"ssh-ed25519")
    blob += ssh_string(pub)
    blob += ssh_string(priv64)
    blob += ssh_string(comment)
    pad_len = (8 - (len(blob) % 8)) % 8
    blob += bytes((i + 1 for i in range(pad_len)))
    return blob

def encode_openssh_private(pub_blob: bytes, priv_blob: bytes) -> bytes:
    body = b"openssh-key-v1\x00"
    body += ssh_string(b"none")
    body += ssh_string(b"none")
    body += ssh_string(b"")
    body += ssh_uint32(1)
    body += ssh_string(pub_blob)
    body += ssh_string(priv_blob)
    b64 = base64.b64encode(body).decode("ascii")
    lines = [b64[i:i+70] for i in range(0, len(b64), 70)]
    out = "-----BEGIN OPENSSH PRIVATE KEY-----\n"
    out += "\n".join(lines) + "\n"
    out += "-----END OPENSSH PRIVATE KEY-----\n"
    return out.encode("ascii")

def encode_pubkey_line(pub: bytes, comment: str) -> str:
    blob = encode_pubkey_blob(pub)
    b64 = base64.b64encode(blob).decode("ascii")
    return f"ssh-ed25519 {b64} {comment}\n"

def main():
    SSH_DIR.mkdir(parents=True, exist_ok=True)
    SSH_DIR.chmod(0o700)

    # Generate fresh Ed25519 key
    priv_obj = Ed25519PrivateKey.generate()

    # Write private key in OpenSSH format (native cryptography lib support)
    priv_pem = priv_obj.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.OpenSSH,
        encryption_algorithm=serialization.NoEncryption(),
    )
    PRIV_PATH.write_bytes(priv_pem)
    PRIV_PATH.chmod(0o600)
    print(f"[OK] wrote private key (OpenSSH format) -> {PRIV_PATH}")

    # Public key in OpenSSH format
    pub_obj = priv_obj.public_key()
    pub_line = pub_obj.public_bytes(
        encoding=serialization.Encoding.OpenSSH,
        format=serialization.PublicFormat.OpenSSH,
    ).decode("ascii")
    if not pub_line.endswith("\n"):
        pub_line += "\n"
    PUB_PATH.write_text(pub_line)
    PUB_PATH.chmod(0o644)
    print(f"[OK] wrote public key -> {PUB_PATH}")

    print()
    print("=" * 72)
    print("PUBLIC KEY — add this to GitHub as an SSH key:")
    print("=" * 72)
    print(pub_line.strip())
    print("=" * 72)

if __name__ == "__main__":
    main()
