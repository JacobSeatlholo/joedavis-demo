#!/usr/bin/env python3
"""Extract clean text + image URLs from the saved joedavis.co.za page."""
import json
import re
from html.parser import HTMLParser

with open("/home/z/my-project/scripts/joedavis-original.json") as f:
    data = json.load(f)

html = data["data"]["html"]
print("=" * 60)
print("PAGE TITLE:", data["data"].get("title", "(none)"))
print("DESCRIPTION:", data["data"].get("description", "(none)"))
print("=" * 60)

# Extract images
imgs = re.findall(r'<img[^>]+src="([^"]+)"', html)
print(f"\nIMAGES FOUND: {len(imgs)}")
for i, src in enumerate(imgs[:30]):
    print(f"  {i+1}. {src}")

# Extract headings
print("\nHEADINGS:")
for m in re.findall(r'<h([1-6])[^>]*>(.*?)</h\1>', html, re.DOTALL):
    text = re.sub(r'<[^>]+>', '', m[1]).strip()
    if text:
        print(f"  h{m[0]}: {text[:100]}")

# Extract links
print("\nLINKS:")
links = re.findall(r'<a[^>]+href="([^"]+)"[^>]*>(.*?)</a>', html, re.DOTALL)
for href, txt in links[:30]:
    text = re.sub(r'<[^>]+>', '', txt).strip()
    if text and href:
        print(f"  {href[:80]} -> {text[:50]}")

# Strip scripts/styles and get plain text
clean = re.sub(r'<script[^>]*>.*?</script>', '', html, flags=re.DOTALL | re.IGNORECASE)
clean = re.sub(r'<style[^>]*>.*?</style>', '', clean, flags=re.DOTALL | re.IGNORECASE)
clean = re.sub(r'<!--.*?-->', '', clean, flags=re.DOTALL)
# Replace tags with newlines for readability
clean = re.sub(r'<br\s*/?>', '\n', clean, flags=re.IGNORECASE)
clean = re.sub(r'</(p|div|section|article|h[1-6]|li)>', '\n', clean, flags=re.IGNORECASE)
clean = re.sub(r'<[^>]+>', ' ', clean)
# Decode entities
import html as html_mod
clean = html_mod.unescape(clean)
# Collapse whitespace
clean = re.sub(r'[ \t]+', ' ', clean)
clean = re.sub(r'\n\s*\n\s*\n+', '\n\n', clean)
clean = clean.strip()

print("\n" + "=" * 60)
print("PLAIN TEXT CONTENT (first 8000 chars):")
print("=" * 60)
print(clean[:8000])
print("\n..." if len(clean) > 8000 else "")
print(f"\nTotal text length: {len(clean)}")
