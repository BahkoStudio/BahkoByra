# Bromma Trädgårdsservice — produktionsrutin för contentplanen

**Plan:** `.tmp/rapporter/Contentplan-Bromma-augusti-2026.pdf` (2 reels + 3 bilder/vecka, start v32).
**Drive:** mappen "Bromma Trädgårdsservice" i den delade Bahko-mappen — allt färdigt content
och allt råmaterial från Jens bor där. Struktur: 01 Råmaterial från Jens · 02 Färdiga inlägg ·
03 Reels · 04 Grafik och mallar · 05 Rapporter och planer.

## Grundregeln

**AI får aldrig spela Jens riktiga jobb.** Före/efter, teamet och maskinerna är alltid äkta
material från Jens (WhatsApp → Drive 01). Higgsfield används ENDAST till:
ramen (logga-intro/outro på reels), bakgrunder till tipsgrafiken och **maskotvärlden**
(se nedan). Omdömeskorten är HTML-mall, ingen AI.

## Maskoten "Robotklipparen" (kanon 2026-08-16, Mathias val)

Bromma har en officiell maskot: en gullig leksaksaktig robotgräsklippare (originaldesign,
INTE en Husqvarna-kopia) — grön gradient-kropp, cream-paneler, antenn med gul glödande kula,
två stora runda strålkastarögon, lövdekal. Den används för **undervisande innehåll**
(karuseller, tipsbilder, maskot-reels) och är uppenbart en karaktär — den bryter därför inte
grundregeln ovan. Jens äkta material förblir kravet för allt som visar riktiga jobb.

- Kanon + referensbilder: Drive `Bromma Trädgårdsservice/04 Grafik och mallar/maskot/`
  (master + poser: klipper, häck, vinter-med-snöskyffel; LASMIG-filen har genererings-regler)
- Vid AI-generering: skicka ALLTID med `robotklipparen-master.png` som referensbild och kräv
  "Match the reference character EXACTLY" i prompten; QA: antenn med gul kula, lövdekal, leende

## Byggstenarna (klara 2026-08-04)

| Fil | Vad |
|---|---|
| `mallar/omdomeskort.html` | 1080×1080-omdömeskort. Parametrar: `?q=citat&n=namn&j=tjänst, ort` |
| `mallar/tipsgrafik.html` | 1080×1350-tipsgrafik. Parametrar: `?bg=&k=&t=&b1..b3=&rut=1` |
| `mallar/bakgrunder/v32–v35*.png` | 4 AI-bakgrunder (gpt_image_2, 3:4, 2k) — UTAN text |
| `mallar/intro-frame.html` + `intro-start.png` | startbild för logga-intro |
| `media/logo-intro-5s.mp4` | seedance 2.0-intro, **1920×1080 liggande** — funkar i CapCut-reels men får svarta band om den klistras rakt in i en 9:16-film. Använd `mallar/reel/outro.html` som slutbild istället |
| `mallar/reel/` | reel-pipeline: textbilder, vattenstämpel, slutbild och `bygg-reel.sh`. Se `mallar/reel/LASMIG.md` |
| `inlagg/` | färdigrenderade inlägg (omdöme + v32–v35-tips) |

## Rendera ett nytt kort (exempel)

```powershell
& "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless --disable-gpu `
  --window-size=1080,1080 --hide-scrollbars --screenshot="ut.png" `
  "file:///C:/Users/mathi/testar/BahkoByra/content/kunder/bromma/mallar/omdomeskort.html?q=CITAT&n=NAMN&j=TJÄNST · ORT"
```
Tipsgrafik: samma sak med `tipsgrafik.html`, `--window-size=1080,1350` och bg/t/b1-parametrarna.
Å/ä/ö i parametrar: URL-koda (`%C3%A5` osv) eller redigera default-texterna i HTML-filen.

## Ny AI-bakgrund (när ett nytt tips-ämne behövs)

```
higgsfield generate create gpt_image_2 --aspect_ratio 3:4 --resolution 2k --wait \
  --prompt "<motiv>, dark moody grading, large dark negative space in the upper half, no people, no text"
```
~2–5 credits. **Ladda ALLTID ner resultatet direkt** (`curl -o mallar/bakgrunder/<namn>.png <url>`) —
Higgsfield raderar efter ~30 dagar. Prompt-regler: alltid "no text" (svensk text i AI blir fel,
mallen lägger texten), alltid mörkt negativt utrymme upptill (rubriken bor där).

## Veckoflödet

1. **Jens skickar klipp/bilder i WhatsApp** → spara i Drive `01 Råmaterial från Jens/<vecka>/`.
   Kommer inget material: veckan körs ändå (karuseller + tipsbilder + ev. maskot-reel) — grundregeln
   gäller, AI ersätter aldrig äkta jobbmaterial, den fyller bara undervisningsluckan.
2. **Reels**: med Jens-material klipps de i CapCut (logo-intro media/logo-intro-5s.mp4 + material +
   outro). Utan material: maskot-reel varannan vecka, byggd med `mallar/reel/bygg-reel.sh`
   (2–3 seedance-klipp à 8 s, robotklipparen-master.png som referens, svensk text, logga hela
   vägen, musik och ljudeffekter, brandad slutbild). Räkna ~150 credits per reel.
   **Reelen ska ha ljud i filen** — en tyst reel tappar halva effekten i flödet.
3. **Onsdagsbilden**: rendera från tipsgrafik-mallen (bakgrund finns för v32–35, ny vid behov)
4. **Lördagsbilden**: omdömeskort (nio omdömen kvar att göra kort av) eller team/maskin-foto
5. Färdigt material → Drive `02 Färdiga inlägg` / `03 Reels` → Jens godkänner (2 min) → publicera
6. Det bästa återpubliceras i Google Företagsprofilen (Jens/GBP-inloggning)

## Godkännandefönster (panelbeslut 2026-08-17 — flaskhalsen är loopen, inte produktionen)

- Veckoleveransen WhatsApp:as till Jens SAMMA DAG den läggs i Drive.
- Inget svar inom 48 h ⇒ **förgodkända format postas ändå** (tipsbilder, omdömeskort,
  karuseller enligt mall). Endast HELT NYA format kräver aktivt ja.
- Ansvar: Jens svarar på kommentarer (hans röst, grundregeln); Mathias flaggar obesvarade
  kommentarer efter 24 h.
- Maskoten är alltid med (Mathias 2026-08-24, ersätter max-1-regeln från 17/8):
  robotklipparen är Brommas egen figur och ska som standard finnas på allt
  producerat content — tipsbilder, karuseller och reels. Undantag: omdömeskorten
  (rena citatkort, kundens ord ska stå ensamma) och äkta jobbmaterial från Jens
  (grundregeln ovan gäller — AI spelar aldrig det riktiga jobbet).
- Månadsmätning sista fredagen: räckvidd, följare, förfrågningar (fråga Jens) — 3 rader i V1.

## Manus

Reels-manus skrivs med `/reel`-skillen (fyra loopar, Kallaway-rytm) veckan innan, enligt planen.

## Kostnad

Engångs: intro ~25 credits + 4 bakgrunder ~10 credits. Löpande: ~2–5 credits per ny bakgrund,
allt annat är gratis (HTML-mallar + Edge headless). Saldo kollas med `higgsfield workspace list`.

Maskot-reel (mätt 2026-08-17): seedance 2.0 i 9:16 och 1080p kostar **9 credits per sekund**,
så ett 8-sekundersklipp går på 72 och ett 12-sekunders på 108. Musik (`sonilo_music`) ~2 credits
för 34 sekunder. En hel 30-sekundersreel med två nya klipp landade på ~150 credits.
Vill man ner i pris: återanvänd ett befintligt klipp och lägg bara till ett nytt.
