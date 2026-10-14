# Reel-pipeline för Bromma (maskot-reels med logga, text och ljud)

Byggd 2026-08-17 för v34-reelen "Bästa tiden att så gräs är nu" (30 s).
Allt utom AI-klippen och ljudet är gratis: HTML + Edge headless + ffmpeg.

## Vad som ingår

| Fil | Vad den gör |
|---|---|
| `overlay.html` | Textbilderna. `?i=0..6` väljer replik. Beats-arrayen längst ner redigeras per reel. Transparent PNG 1080×1920. |
| `wm.html` | Loggan uppe till vänster, ligger kvar genom hela reelen. |
| `outro.html` | Slutbilden: logga, tjänster, telefon, sajt och RUT-badge. Läggs ovanpå en suddad ruta ur sista klippet. |
| `bygg-reel.sh` | Formar ljudeffekterna, bygger slutbilden och monterar hela reelen med övertoningar, text och ljudmix. |

Texten bor i HTML-filerna, aldrig i skriptargument. Skickas svenska tecken genom
PowerShell blir det lätt "grÃ¤s" istället för "gräs".

## Så bygger du en ny reel

1. Skriv om `BEATS` i `overlay.html` (kicker + två rader per replik, `<em>` ger grön färg).
2. Rendera bilderna till en arbetsmapp:
   ```
   msedge --headless=new --disable-gpu --hide-scrollbars --default-background-color=00000000 \
     --user-data-dir=<unik mapp> --window-size=1080,1920 --virtual-time-budget=7000 \
     --screenshot=build/txt_0.png "file:///.../overlay.html?i=0"
   ```
   `--default-background-color=00000000` är det som ger genomskinlig bakgrund. Samma
   kommando för `wm.html` och `outro.html`. Använd en ny `--user-data-dir` per bild,
   annars hoppar Edge ibland över renderingen utan felmeddelande.
3. Lägg klippen som `testreel.mp4`, `clip2.mp4`, `clip3.mp4` i arbetsmappen och
   justera längder och tidpunkter i `bygg-reel.sh`.
4. `bash bygg-reel.sh`

## Higgsfield: vad som fungerar och inte

- **Video:** `seedance_2_0`, 9:16, 1080p kostar **9 credits per sekund** (12 s = 108).
  8-sekunders klipp räcker gott för en beat och halverar kostnaden.
- **Karaktären håller ihop** om man skickar `robotklipparen-master.png` som
  `--image-references`, eller sista rutan ur föregående klipp som `--start-image`
  när scenen ska fortsätta.
- **Klippens eget ljud** (`generate_audio true`) är omgivningsljud, inte musik.
  Det ligger fint under musiken på ca 30 procents volym.
- **Musik:** `sonilo_music` fungerar bra och kostar nästan inget (34 s ≈ 2 credits).
- **Ljudeffekter:** `mirelo_text_to_audio` ger **tysta filer för korta smällar**
  (pop, knäpp) — mätt till −72 dB, oanvändbart. Längre, jämna ljud fungerar.
  Whooshen kom som ett jämnt brus och formades till en svisch med `afade` i skriptet.
  Textklicket syntetiseras med två sinustoner i ffmpeg. Mät alltid nytt ljud med
  `ffmpeg -i fil -af volumedetect -f null -` innan det används.

## Levererad ljudnivå

Reelen normaliseras till −14 LUFS (`loudnorm`), vilket är vad Instagram spelar upp i.
Slutfilen mättes till −13,3 LUFS med toppar på −2,4 dB.
