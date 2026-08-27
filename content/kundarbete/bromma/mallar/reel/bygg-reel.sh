#!/usr/bin/env bash
# Bygger v34-reelen for Bromma Tradgardsservice:
#   3 seedance-klipp + brandad slutbild, logga hela vagen, svensk text och ljudmix.
# Kors i Git Bash. Alla kallor ligger i samma mapp som skriptet.
set -euo pipefail
cd "$(dirname "$0")"

B=build
UT=final-reel-v2.mp4

# ── Steg 1: forma ljudeffekterna ───────────────────────────────────────────
# Whooshen fran Mirelo ar ett jamnt brus utan attack. Vi skar ut 0.9 s och
# formar den till en svisch med snabb uppgang och langre svans.
ffmpeg -v error -y -ss 1.0 -t 0.9 -i ljud_sfx_whoosh.mp3 \
  -af "afade=t=in:st=0:d=0.3:curve=exp,afade=t=out:st=0.35:d=0.55:curve=exp,volume=5.0,highpass=f=300,aformat=channel_layouts=stereo:sample_rates=48000" \
  sfx_whoosh.wav

# Klockan har sitt anslag vid 0.25 s - vi tar anslaget plus svansen.
ffmpeg -v error -y -ss 0.15 -t 1.9 -i ljud_sfx_logo.mp3 \
  -af "afade=t=out:st=1.4:d=0.5,volume=1.0,aformat=channel_layouts=stereo:sample_rates=48000" \
  sfx_chime.wav

# Mirelo gav bara tystnad for korta smallar - textklicket syntetiseras istallet.
ffmpeg -v error -y -f lavfi -t 0.4 -i "sine=frequency=1046:sample_rate=48000" \
  -f lavfi -t 0.4 -i "sine=frequency=1568:sample_rate=48000" \
  -filter_complex "[0]volume=0.9[a];[1]volume=0.32[b];[a][b]amix=inputs=2:normalize=0,afade=t=in:st=0:d=0.004,afade=t=out:st=0.02:d=0.33:curve=exp,aformat=channel_layouts=stereo:sample_rates=48000" \
  sfx_blip.wav

# ── Steg 2: slutbilden (3.6 s) ────────────────────────────────────────────
# Sista rutan ur klipp 3, suddad och nedtonad, med langsam inzoomning bakom kortet.
ffmpeg -v error -y -sseof -0.15 -i clip3.mp4 -frames:v 1 clip3_sista.png
ffmpeg -v error -y -loop 1 -framerate 24 -t 3.6 -i clip3_sista.png -loop 1 -framerate 24 -t 3.6 -i "$B/outro.png" \
  -filter_complex "[0:v]scale=1296:2304,boxblur=22:2,eq=brightness=-0.10:saturation=0.75,zoompan=z='1.06-0.00035*on':d=1:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=24,setsar=1[bg];\
[1:v]format=rgba,fade=t=in:st=0.15:d=0.5:alpha=1[kort];\
[bg][kort]overlay=0:0,format=yuv420p[v]" \
  -map "[v]" -c:v libx264 -crf 18 -preset medium -t 3.6 outro_seg.mp4

# ── Steg 3: hela reelen ───────────────────────────────────────────────────
# Klipplangder: 12.04 + 8.04 + 8.04 + 3.6, tre overtoningar => ca 30.4 s.
ffmpeg -v error -y \
  -i testreel.mp4 -i clip2.mp4 -i clip3.mp4 -i outro_seg.mp4 \
  -loop 1 -framerate 24 -t 31 -i "$B/wm.png" \
  -loop 1 -framerate 24 -t 31 -i "$B/txt_0.png" \
  -loop 1 -framerate 24 -t 31 -i "$B/txt_1.png" \
  -loop 1 -framerate 24 -t 31 -i "$B/txt_2.png" \
  -loop 1 -framerate 24 -t 31 -i "$B/txt_3.png" \
  -loop 1 -framerate 24 -t 31 -i "$B/txt_4.png" \
  -loop 1 -framerate 24 -t 31 -i "$B/txt_5.png" \
  -loop 1 -framerate 24 -t 31 -i "$B/txt_6.png" \
  -i ljud_musik.m4a -i sfx_blip.wav -i sfx_whoosh.wav -i sfx_chime.wav \
  -filter_complex "\
[0:v]fps=24,scale=1080:1920,setsar=1,format=yuv420p[v0];\
[1:v]fps=24,scale=1080:1920,setsar=1,format=yuv420p[v1];\
[2:v]fps=24,scale=1080:1920,setsar=1,format=yuv420p[v2];\
[3:v]fps=24,scale=1080:1920,setsar=1,format=yuv420p[v3];\
[v0][v1]xfade=transition=fade:duration=0.4:offset=11.64[xa];\
[xa][v2]xfade=transition=fade:duration=0.4:offset=19.28[xb];\
[xb][v3]xfade=transition=fade:duration=0.5:offset=26.82[base];\
[4:v]format=rgba,fade=t=in:st=0.2:d=0.6:alpha=1,fade=t=out:st=26.3:d=0.5:alpha=1[wm];\
[base][wm]overlay=0:0:enable='lt(t,26.9)'[b0];\
[5:v]format=rgba,fade=t=in:st=0.60:d=0.35:alpha=1,fade=t=out:st=3.55:d=0.35:alpha=1[o0];\
[b0][o0]overlay=0:0:enable='between(t,0.55,4.0)'[b1];\
[6:v]format=rgba,fade=t=in:st=4.20:d=0.35:alpha=1,fade=t=out:st=7.35:d=0.35:alpha=1[o1];\
[b1][o1]overlay=0:0:enable='between(t,4.15,7.8)'[b2];\
[7:v]format=rgba,fade=t=in:st=8.00:d=0.35:alpha=1,fade=t=out:st=11.00:d=0.35:alpha=1[o2];\
[b2][o2]overlay=0:0:enable='between(t,7.95,11.45)'[b3];\
[8:v]format=rgba,fade=t=in:st=12.30:d=0.35:alpha=1,fade=t=out:st=15.35:d=0.35:alpha=1[o3];\
[b3][o3]overlay=0:0:enable='between(t,12.25,15.8)'[b4];\
[9:v]format=rgba,fade=t=in:st=16.00:d=0.35:alpha=1,fade=t=out:st=18.80:d=0.35:alpha=1[o4];\
[b4][o4]overlay=0:0:enable='between(t,15.95,19.2)'[b5];\
[10:v]format=rgba,fade=t=in:st=20.00:d=0.35:alpha=1,fade=t=out:st=23.05:d=0.35:alpha=1[o5];\
[b5][o5]overlay=0:0:enable='between(t,19.95,23.5)'[b6];\
[11:v]format=rgba,fade=t=in:st=23.70:d=0.35:alpha=1,fade=t=out:st=26.25:d=0.35:alpha=1[o6];\
[b6][o6]overlay=0:0:enable='between(t,23.65,26.7)'[vout];\
[0:a]atrim=0:12.04,asetpts=N/SR/TB,volume=0.30,afade=t=in:st=0:d=0.6,afade=t=out:st=11.44:d=0.6[a0];\
[1:a]atrim=0:8.04,asetpts=N/SR/TB,volume=0.30,afade=t=in:st=0:d=0.6,afade=t=out:st=7.44:d=0.6,adelay=11640:all=1[a1];\
[2:a]atrim=0:8.04,asetpts=N/SR/TB,volume=0.30,afade=t=in:st=0:d=0.6,afade=t=out:st=7.24:d=0.8,adelay=19280:all=1[a2];\
[12:a]atrim=0:30.42,asetpts=N/SR/TB,volume=0.80,afade=t=in:st=0:d=1.2,afade=t=out:st=28.9:d=1.5[amus];\
[13:a]volume=0.45,asplit=7[p0][p1][p2][p3][p4][p5][p6];\
[p0]adelay=600:all=1[q0];\
[p1]adelay=4200:all=1[q1];\
[p2]adelay=8000:all=1[q2];\
[p3]adelay=12300:all=1[q3];\
[p4]adelay=16000:all=1[q4];\
[p5]adelay=20000:all=1[q5];\
[p6]adelay=23700:all=1[q6];\
[14:a]asplit=3[w0][w1][w2];\
[w0]adelay=11400:all=1[r0];\
[w1]adelay=19050:all=1[r1];\
[w2]adelay=26620:all=1[r2];\
[15:a]volume=0.85,adelay=26900:all=1[chime];\
[a0][a1][a2][amus][q0][q1][q2][q3][q4][q5][q6][r0][r1][r2][chime]amix=inputs=15:normalize=0:duration=longest,\
alimiter=level_in=1:level_out=1:limit=0.92,loudnorm=I=-14:TP=-1.5:LRA=11,aformat=sample_rates=48000:channel_layouts=stereo[aout]" \
  -map "[vout]" -map "[aout]" -t 30.42 \
  -c:v libx264 -crf 19 -preset slow -pix_fmt yuv420p -r 24 \
  -c:a aac -b:a 192k -movflags +faststart \
  "$UT"

echo "KLART: $UT"
ffprobe -v error -show_entries "format=duration,size" -of default=nw=1 "$UT"
