#!/usr/bin/env bash
# Maskotfilm v37, koers i Higgsfields sandlada. Argument: N C1 C2 T0..T5 WM BG UP
# Struktur: klipp1 (8.0) -> fryst sista ruta (5.5) -> klipp2 (8.0) -> outro (3.8), xfade 0.4/0.4/0.5 => 24.0 s
set -euo pipefail
N=$1; C1=$2; C2=$3; T0=$4; T1=$5; T2=$6; T3=$7; T4=$8; T5=$9; WM=${10}; BG=${11}; UP=${12}
mkdir -p /home/user/f$N && cd /home/user/f$N
curl -sf -o clip1.mp4 "$C1"; curl -sf -o clip2.mp4 "$C2"
i=0; for u in "$T0" "$T1" "$T2" "$T3" "$T4" "$T5"; do curl -sf -o txt_$i.png "$u"; i=$((i+1)); done
curl -sf -o wm.png "$WM"; curl -sf -o outro_bg.png "$BG"
for n in 1 2; do
  ffmpeg -v error -y -i clip$n.mp4 -t 8.0 -vf "fps=24,scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setsar=1,format=yuv420p" -an -c:v libx264 -crf 18 -preset medium seg_c$n.mp4
done
ffmpeg -v error -y -f lavfi -t 0.9 -i "anoisesrc=color=pink:sample_rate=48000:amplitude=0.8" -af "highpass=f=300,lowpass=f=6000,afade=t=in:st=0:d=0.3:curve=exp,afade=t=out:st=0.35:d=0.55:curve=exp,volume=2.2,aformat=channel_layouts=stereo:sample_rates=48000" sfx_whoosh.wav
ffmpeg -v error -y -f lavfi -t 1.9 -i "sine=frequency=880:sample_rate=48000" -f lavfi -t 1.9 -i "sine=frequency=1318.5:sample_rate=48000" -f lavfi -t 1.9 -i "sine=frequency=1760:sample_rate=48000" -filter_complex "[0]volume=0.5[a];[1]adelay=90:all=1,volume=0.4[b];[2]adelay=180:all=1,volume=0.3[c];[a][b][c]amix=inputs=3:normalize=0,afade=t=in:st=0:d=0.01,afade=t=out:st=0.9:d=1.0:curve=exp,aformat=channel_layouts=stereo:sample_rates=48000" sfx_chime.wav
ffmpeg -v error -y -f lavfi -t 0.4 -i "sine=frequency=1046:sample_rate=48000" -f lavfi -t 0.4 -i "sine=frequency=1568:sample_rate=48000" -filter_complex "[0]volume=0.9[a];[1]volume=0.32[b];[a][b]amix=inputs=2:normalize=0,afade=t=in:st=0:d=0.004,afade=t=out:st=0.02:d=0.33:curve=exp,aformat=channel_layouts=stereo:sample_rates=48000" sfx_blip.wav
ffmpeg -v error -y -sseof -0.15 -i seg_c1.mp4 -frames:v 1 c1_sista.png
ffmpeg -v error -y -loop 1 -framerate 24 -t 5.5 -i c1_sista.png -filter_complex "[0:v]scale=1296:2304,zoompan=z='1.0+0.00030*on':d=1:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=24,setsar=1,format=yuv420p[v]" -map "[v]" -c:v libx264 -crf 18 -preset medium -t 5.5 still_seg.mp4
ffmpeg -v error -y -loop 1 -framerate 24 -t 3.8 -i outro_bg.png -filter_complex "[0:v]scale=1296:2304,zoompan=z='1.0+0.0004*on':d=1:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=24,setsar=1,format=yuv420p[v]" -map "[v]" -c:v libx264 -crf 18 -preset medium -t 3.8 outro_seg.mp4
ffmpeg -v error -y -i seg_c1.mp4 -i still_seg.mp4 -i seg_c2.mp4 -i outro_seg.mp4 \
  -loop 1 -framerate 24 -t 24 -i wm.png -loop 1 -framerate 24 -t 24 -i txt_0.png -loop 1 -framerate 24 -t 24 -i txt_1.png -loop 1 -framerate 24 -t 24 -i txt_2.png -loop 1 -framerate 24 -t 24 -i txt_3.png -loop 1 -framerate 24 -t 24 -i txt_4.png -loop 1 -framerate 24 -t 24 -i txt_5.png \
  -i sfx_blip.wav -i sfx_whoosh.wav -i sfx_chime.wav \
  -filter_complex "[0:v][1:v]xfade=transition=fade:duration=0.4:offset=7.6[xa];[xa][2:v]xfade=transition=fade:duration=0.4:offset=12.7[xb];[xb][3:v]xfade=transition=fade:duration=0.5:offset=20.2[base];[4:v]format=rgba,fade=t=in:st=0.2:d=0.6:alpha=1,fade=t=out:st=19.8:d=0.5:alpha=1[wm];[base][wm]overlay=0:0:enable='lt(t,20.4)'[b0];[5:v]format=rgba,fade=t=in:st=0.50:d=0.35:alpha=1,fade=t=out:st=3.05:d=0.35:alpha=1[o0];[b0][o0]overlay=0:0:enable='between(t,0.45,3.45)'[b1];[6:v]format=rgba,fade=t=in:st=3.90:d=0.35:alpha=1,fade=t=out:st=6.85:d=0.35:alpha=1[o1];[b1][o1]overlay=0:0:enable='between(t,3.85,7.25)'[b2];[7:v]format=rgba,fade=t=in:st=8.20:d=0.35:alpha=1,fade=t=out:st=10.45:d=0.35:alpha=1[o2];[b2][o2]overlay=0:0:enable='between(t,8.15,10.85)'[b3];[8:v]format=rgba,fade=t=in:st=11.20:d=0.25:alpha=1,fade=t=out:st=12.15:d=0.3:alpha=1[o3];[b3][o3]overlay=0:0:enable='between(t,11.15,12.5)'[b4];[9:v]format=rgba,fade=t=in:st=13.30:d=0.35:alpha=1,fade=t=out:st=16.05:d=0.35:alpha=1[o4];[b4][o4]overlay=0:0:enable='between(t,13.25,16.45)'[b5];[10:v]format=rgba,fade=t=in:st=16.90:d=0.35:alpha=1,fade=t=out:st=19.45:d=0.35:alpha=1[o5];[b5][o5]overlay=0:0:enable='between(t,16.85,19.85)'[vout];[11:a]volume=0.45,asplit=6[p0][p1][p2][p3][p4][p5];[p0]adelay=500:all=1[q0];[p1]adelay=3900:all=1[q1];[p2]adelay=8200:all=1[q2];[p3]adelay=11200:all=1[q3];[p4]adelay=13300:all=1[q4];[p5]adelay=16900:all=1[q5];[12:a]asplit=3[w0][w1][w2];[w0]adelay=7400:all=1[r0];[w1]adelay=12500:all=1[r1];[w2]adelay=20000:all=1[r2];[13:a]volume=0.85,adelay=20500:all=1[chime];[q0][q1][q2][q3][q4][q5][r0][r1][r2][chime]amix=inputs=10:normalize=0:duration=longest,apad=whole_dur=24,alimiter=level_in=1:level_out=1:limit=0.92,loudnorm=I=-16:TP=-1.5:LRA=11,aformat=sample_rates=48000:channel_layouts=stereo[aout]" \
  -map "[vout]" -map "[aout]" -t 24.0 -c:v libx264 -crf 19 -preset slow -pix_fmt yuv420p -r 24 -c:a aac -b:a 192k -movflags +faststart out.mp4
ffprobe -v error -show_entries "format=duration,size" -of default=nw=1 out.mp4
ffmpeg -v error -y -ss 12.0 -i out.mp4 -frames:v 1 -vf scale=270:-1 -q:v 8 preview.jpg
curl -sf -o /dev/null -w "UPLOAD %{http_code}\n" -X PUT -H "Content-Type: video/mp4" --upload-file out.mp4 "$UP"
echo KLART f$N
