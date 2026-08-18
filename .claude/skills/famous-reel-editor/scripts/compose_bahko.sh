#!/bin/bash
# Bahko-komposition: talande huvud (nedre bandet) + kort (övre bandet) + MASKOT
# + karaoke-undertexter + musik.
#
# Skillnad mot compose.sh: maskoten läggs på som eget genomskinligt lager i nedre
# bandet, vid Mathias, genom hela reelen (beslut 2026-08-18: assistent/kompis).
# Den kan inte ligga i kortlagret -- hyperframes renderar yuv420p utan alpha och
# kortbandet klipps till de övre 864 px.
#
# Usage: compose_bahko.sh <cut.mp4> <cards.mp4> <capt_dir> <maskot_dir> <out.mp4> [crop_y=420]
#   MASKOT_XY=x:y   överstyr placeringen (default: nedre vänster, fri från både
#                   undertexterna och Instagrams knapprad på högerkanten)
#   MASKOT_FONSTER="4.2-8.6,22.0-27.4"   tidsfönster där figuren syns. Detta är
#                   NORMALFALLET: maskoten ska vara med där hon passar innehållet,
#                   inte tvingad genom hela klippet (Mathias 2026-08-18). Utan
#                   variabeln ligger hon på hela tiden.
#   MUSIC=/spår.m4a MUSIC_VOL=0.06   som i compose.sh
set -e
CUT="$1"; CARDS="$2"; CAPT="$3"; MASK="$4"; OUT="$5"; CY="${6:-420}"
SKILL_DIR="$(cd "$(dirname "$0")/.." && pwd)"
MUSIC="${MUSIC:-$SKILL_DIR/assets/bg-music.m4a}"
MUSIC_VOL="${MUSIC_VOL:-0.06}"
MASK_FPS="${MASK_FPS:-12}"

for d in "$CAPT" "$MASK"; do
  [ -d "$d" ] || { echo "FEL: katalogen finns inte: $d" >&2; exit 1; }
done
FIRST=$(ls "$MASK"/*.png 2>/dev/null | head -1)
[ -n "$FIRST" ] || { echo "FEL: inga PNG-rutor i $MASK (kör scripts/maskot_frames.py)" >&2; exit 1; }

# Rutstorleken läses ur filen i stället för att antas, så placeringen stämmer
# även när gesten ger en annan marginal (armens svep styr dukens bredd).
MW=$(ffprobe -v error -select_streams v:0 -show_entries stream=width  -of csv=p=0 "$FIRST")
MH=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "$FIRST")
if [ -n "$MASKOT_XY" ]; then
  MX="${MASKOT_XY%%:*}"; MY="${MASKOT_XY##*:}"
else
  # Nedre VÄNSTER som standard. Undertexterna landar kring y=778-900, så figuren
  # måste ligga under dem. Och Instagrams knapprad ligger längs HÖGER kant
  # (grovt x>950, y 1100-1750), så nedre höger blir delvis täckt i flödet.
  MX=40; MY=$((1920 - MH - 150))
fi
if [ "$MY" -lt 920 ]; then
  echo "VARNING: maskoten hamnar på y=$MY, ovanför undertexternas zon (~778-900)." >&2
  echo "         Sätt MASKOT_XY till ett y >= 920 om undertexterna blir svårlästa." >&2
fi

DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$CUT")
FOUT=$(python3 -c "print(max(0,$DUR-2))")

# Fönstren blir ett enable-uttryck: between(t,a,b)+between(t,c,d)+...
# (summan funkar som ELLER i ffmpeg, fönstren överlappar inte.)
if [ -n "$MASKOT_FONSTER" ]; then
  MASK_ENABLE=$(python3 - "$MASKOT_FONSTER" "$DUR" <<'PYW'
import sys
spec, dur = sys.argv[1], float(sys.argv[2])
delar = []
for bit in spec.split(","):
    bit = bit.strip()
    if not bit:
        continue
    if "-" not in bit:
        sys.exit(f"FEL: fönstret '{bit}' saknar bindestreck (skriv 'start-slut')")
    a, b = (x.strip() for x in bit.split("-", 1))
    a, b = float(a), float(b)
    if b <= a:
        sys.exit(f"FEL: fönstret '{bit}' slutar inte efter sin start")
    if a > dur:
        sys.exit(f"FEL: fönstret '{bit}' börjar efter klippets slut ({dur:.2f}s)")
    delar.append(f"between(t,{a},{min(b, dur)})")
if not delar:
    sys.exit("FEL: MASKOT_FONSTER var tomt")
print("+".join(delar))
PYW
) || exit 1
  MASK_OV=":enable='$MASK_ENABLE'"
  echo "maskotfönster: $MASKOT_FONSTER"
else
  MASK_OV=""
  echo "maskoten ligger på hela klippet (sätt MASKOT_FONSTER för att begränsa)"
fi

# Lagerordning: ansikte -> kort (övre) -> maskot -> undertexter överst.
ffmpeg -y -i "$CUT" -i "$CARDS" -framerate 12 -i "$CAPT/%05d.png" \
  -framerate "$MASK_FPS" -stream_loop -1 -i "$MASK/%05d.png" -filter_complex \
"[0:v]scale=1080:-2,crop=1080:1056:0:$CY[v];\
color=c=black:s=1080x1920[bg];[bg][v]overlay=0:864:shortest=1[stage];\
[1:v]crop=1080:864:0:0[ctop];[stage][ctop]overlay=0:0[wc];\
[wc][3:v]overlay=$MX:$MY:shortest=0$MASK_OV[wm];[wm][2:v]overlay=0:78[final]" \
  -map "[final]" -map 0:a -c:v libx264 -preset medium -crf 21 -pix_fmt yuv420p \
  -c:a aac -b:a 160k -shortest "$OUT.noaudio.mp4"

# aresample=48000 + -ar 48000 är OBLIGATORISKT: utan dem ger loudnorm 96kHz på
# ffmpeg 6.x medan sampelantalet svarar mot 48kHz -> ljudet blir dubbelt så snabbt.
# Röst normaliserad till dialognivå, musik lågt (6%). +faststart => filen öppnas
# i QuickTime och streamar direkt.
ffmpeg -y -i "$OUT.noaudio.mp4" -i "$MUSIC" -filter_complex \
"[0:a]loudnorm=I=-16:TP=-1.5:LRA=11,aresample=48000[vo];[1:a]atrim=start=4,asetpts=PTS-STARTPTS,volume=$MUSIC_VOL,afade=in:st=0:d=0.5,afade=out:st=$FOUT:d=2,aresample=48000[m];[vo][m]amix=inputs=2:duration=first:normalize=0[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart "$OUT"
rm -f "$OUT.noaudio.mp4"
echo "KLAR -> $OUT   (maskot ${MW}x${MH} vid ${MX}:${MY})"
