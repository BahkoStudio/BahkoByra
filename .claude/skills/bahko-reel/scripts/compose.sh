#!/bin/bash
# Bahko-reel: FULL video i hela 9:16 + grafik som alfa-lager + maskot.
#
# Mathias syns genom hela klippet. Ingen delad ram, inget svart band.
#
# Text, musik, SFX och maskot är VAL som Mathias styr (beslut 2026-08-18) - inget
# av dem läggs på av sig självt. Utan flaggor blir resultatet: full video, grafik
# ovanpå, och bara rösten.
#
# Usage: compose.sh <video.mp4> <grafik.mov> <out.mp4>
#   MASKOT=maskot            katalog med PNG-loop från scripts/maskot.py
#   MASKOT_FONSTER="4.2-8.6,22.0-27.4"   fönster där figuren syns (annars hela klippet)
#   MASKOT_XY=x:y            överstyr placeringen (default nedre vänster)
#   CAPT=edit/capt           katalog med undertextrutor från scripts/captions.py
#                            (CAPT_Y=78 flyttar dem; storlek/font sätts i captions.py)
#   SFX=grafik/sfx.m4a       SFX-spår från scripts/sfx.py (SFX_VOL=0.5)
#   MUSIC=/sökväg/spår.m4a   musikbädd (MUSIC_VOL=0.06). Ligger det en fil på
#                            <skill>/assets/musik.m4a används den automatiskt.
#                            Skillen SYNTETISERAR INTE musik - ett påhittat spår
#                            låter som ett påhittat spår. Lägg in ett eget, eller
#                            beställ ett (Higgsfield-credits, aldrig utan order).
#
# GRAFIKEN MÅSTE HA ALFA. Rendera den med:
#   npx hyperframes render . --format mov -o grafik.mov
# En mp4 har ingen alfakanal och täcker videon helt svart.
set -e
VIDEO="$1"; GRAFIK="$2"; OUT="$3"
[ -n "$OUT" ] || { echo "Usage: compose.sh <video.mp4> <grafik.mov> <out.mp4>" >&2; exit 1; }
for f in "$VIDEO" "$GRAFIK"; do
  [ -f "$f" ] || { echo "FEL: filen finns inte: $f" >&2; exit 1; }
done
SFX_VOL="${SFX_VOL:-0.5}"
MUSIC_VOL="${MUSIC_VOL:-0.06}"
MASK_FPS="${MASK_FPS:-12}"
CAPT_Y="${CAPT_Y:-78}"
SKILL_DIR="$(cd "$(dirname "$0")/.." && pwd)"
# Musik: egen fil i skillen används automatiskt när den finns, annars måste MUSIC sättas.
if [ -z "$MUSIC" ] && [ -f "$SKILL_DIR/assets/musik.m4a" ]; then
  MUSIC="$SKILL_DIR/assets/musik.m4a"
fi

# Alfakontroll: utan den upptäcks felet först när hela videon är svart.
PIXFMT=$(ffprobe -v error -select_streams v:0 -show_entries stream=pix_fmt -of csv=p=0 "$GRAFIK")
case "$PIXFMT" in
  *a*|yuva*|rgba*|argb*|bgra*) ;;
  *) echo "FEL: grafiklagret ($GRAFIK) har pixelformat '$PIXFMT' utan alfakanal." >&2
     echo "     Rendera om med: npx hyperframes render . --format mov -o $(basename "$GRAFIK")" >&2
     exit 1 ;;
esac

DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$VIDEO")

INPUTS=(-i "$VIDEO" -i "$GRAFIK")
# Videon fyller HELA ramen. force_original_aspect_ratio=increase + crop ger
# 1080x1920 oavsett om källan redan är 9:16 eller något annat.
FC="[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setsar=1,fps=25[v];"
FC+="[v][1:v]overlay=0:0:format=auto[vg];"
SISTA="vg"
IDX=2

if [ -n "$MASKOT" ]; then
  [ -d "$MASKOT" ] || { echo "FEL: maskotkatalogen finns inte: $MASKOT" >&2; exit 1; }
  FIRST=$(ls "$MASKOT"/*.png 2>/dev/null | head -1)
  [ -n "$FIRST" ] || { echo "FEL: inga PNG-rutor i $MASKOT (kör scripts/maskot.py)" >&2; exit 1; }
  MW=$(ffprobe -v error -select_streams v:0 -show_entries stream=width  -of csv=p=0 "$FIRST")
  MH=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "$FIRST")
  if [ -n "$MASKOT_XY" ]; then
    MX="${MASKOT_XY%%:*}"; MY="${MASKOT_XY##*:}"
  else
    # Nedre vänster: Instagrams knapprad ligger längs högerkanten (grovt x>950,
    # y 1100-1750) och bildtexten nedtill, så 150px botten-marginal håller
    # figuren fri från båda.
    MX=40; MY=$((1920 - MH - 150))
  fi
  MASK_OV=""
  if [ -n "$MASKOT_FONSTER" ]; then
    EN=$(python3 - "$MASKOT_FONSTER" "$DUR" <<'PYW'
import sys
spec, dur = sys.argv[1], float(sys.argv[2])
delar = []
for bit in spec.split(","):
    bit = bit.strip()
    if not bit:
        continue
    if "-" not in bit:
        sys.exit(f"FEL: fönstret '{bit}' saknar bindestreck (skriv 'start-slut')")
    a, b = (float(x) for x in bit.split("-", 1))
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
    MASK_OV=":enable='$EN'"
    echo "maskotfönster: $MASKOT_FONSTER"
  fi
  INPUTS+=(-framerate "$MASK_FPS" -stream_loop -1 -i "$MASKOT/%05d.png")
  FC+="[$SISTA][$IDX:v]overlay=$MX:$MY:shortest=0$MASK_OV[vm];"
  SISTA="vm"
  IDX=$((IDX+1))
fi

if [ -n "$CAPT" ]; then
  [ -d "$CAPT" ] || { echo "FEL: undertextkatalogen finns inte: $CAPT" >&2; exit 1; }
  ls "$CAPT"/*.png >/dev/null 2>&1 || { echo "FEL: inga PNG-rutor i $CAPT (kör scripts/captions.py)" >&2; exit 1; }
  INPUTS+=(-framerate 12 -i "$CAPT/%05d.png")
  FC+="[$SISTA][$IDX:v]overlay=0:$CAPT_Y[vc];"
  SISTA="vc"
  IDX=$((IDX+1))
fi

# Ljud: rösten alltid, SFX och musik bara om de begärs.
# aresample=48000 efter loudnorm och -ar 48000 på utgången är obligatoriskt: utan
# dem lämnar loudnorm ifrån sig 96kHz medan sampelantalet svarar mot 48kHz, och
# ljudet blir dubbelt så snabbt (6,0s spelas som 3,1s). Mätt på ffmpeg 6.1.1.
FOUT=$(python3 -c "print(max(0,$DUR-2))")
FC+="[0:a]loudnorm=I=-16:TP=-1.5:LRA=11,aresample=48000[vo];"
GRENAR="[vo]"
NGRENAR=1
if [ -n "$SFX" ]; then
  [ -f "$SFX" ] || { echo "FEL: SFX-filen finns inte: $SFX" >&2; exit 1; }
  INPUTS+=(-i "$SFX")
  FC+="[$IDX:a]volume=$SFX_VOL,aresample=48000[sx];"
  GRENAR+="[sx]"; NGRENAR=$((NGRENAR+1)); IDX=$((IDX+1))
fi
if [ -n "$MUSIC" ]; then
  [ -f "$MUSIC" ] || { echo "FEL: musikfilen finns inte: $MUSIC" >&2; exit 1; }
  INPUTS+=(-i "$MUSIC")
  FC+="[$IDX:a]volume=$MUSIC_VOL,afade=in:st=0:d=0.5,afade=out:st=$FOUT:d=2,aresample=48000[mu];"
  GRENAR+="[mu]"; NGRENAR=$((NGRENAR+1)); IDX=$((IDX+1))
fi
if [ "$NGRENAR" -gt 1 ]; then
  # normalize=0 är avsiktligt: annars sänker ffmpeg rösten för varje gren som läggs till.
  FC+="${GRENAR}amix=inputs=$NGRENAR:duration=first:normalize=0[a]"
else
  FC="${FC%;}"
  FC="${FC/\[vo\]/[a]}"
fi
AMAP="[a]"

ffmpeg -y "${INPUTS[@]}" -filter_complex "$FC" \
  -map "[$SISTA]" -map "$AMAP" \
  -c:v libx264 -preset medium -crf 20 -pix_fmt yuv420p \
  -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart "$OUT"

V=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height,duration -of csv=p=0 "$OUT")
echo "KLAR -> $OUT   ($V)${MASKOT:+   maskot ${MW}x${MH} vid ${MX}:${MY}}${CAPT:+   text}${SFX:+   SFX $SFX_VOL}${MUSIC:+   musik $MUSIC_VOL}"
