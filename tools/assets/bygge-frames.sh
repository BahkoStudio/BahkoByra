#!/usr/bin/env bash
# Bildrutorna till heron "Bygget live" på bahkobyra.se.
# 72 rutor (9 fps × 8 s) ur maskotloopen, 1200 px breda, webp q72 → ~1,9 MB totalt.
# Körs från repo-roten. Kräver ffmpeg med libwebp.
set -euo pipefail
KALLA="web/public/brand/maskot/bahko-bygger-loop.mp4"
MAL="web/public/brand/maskot/bygge"
mkdir -p "$MAL"
ffmpeg -y -loglevel error -i "$KALLA" -vf "fps=9,scale=1200:-2" -c:v libwebp -quality 72 -start_number 0 "$MAL/f-%03d.webp"
echo "$(ls "$MAL" | wc -l) rutor, $(du -sk "$MAL" | cut -f1) kB"
