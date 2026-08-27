---
name: bahko-reel
description: Använd när en färdigklippt 9:16-video ska få BahkoByrås animerade grafik och motion ovanpå. Mathias filmar och klipper själv - ingen avatar, ingen VO, ingen transkribering, och panelernas tider sätts i sekunder. Videon fyller HELA ramen hela tiden och grafiken ligger som ett genomskinligt alfa-lager över den, ingen delad ram och inget svart band. Maskoten står vid honom i valda fönster. Text, musik och SFX är val han styr, inget läggs på av sig självt. Trigga på "bahko-reel", "lägg grafik på det här klippet", "animera min video", "motion på det här", "reel för @bahkostudio", eller när en färdig video ska bli reel. INTE för kunddemos (se scroll-cinematic/hemsidor) och INTE för publicering.
---

# Bahko-reel

Ett klipp där Mathias pratar blir en färdig 9:16-reel: **han syns i hela bilden
hela tiden**, och den Bahko-brandade grafiken ligger som ett alfa-lager över
honom. Maskoten står vid honom där hon passar.

## Skillnad mot famous-reel-editor

`famous-reel-editor` delar ramen: grafik i övre 864 px, ansiktet i nedre 1056.
Halva bilden motion, halva person. Den här skillen gör inte det (Mathias beslut
2026-08-18) — videon fyller allt, grafiken flyter ovanpå.

Klippningen ligger inte här och är inte dubblerad. Mathias klipper själv och
lämnar ett färdigt klipp — den här skillen börjar där redigeringen slutar. Ska en
rå tagning någon gång klippas maskinellt finns transcribe, cutjoin och
silence_keep i `famous-reel-editor/scripts/`, och reglerna för dem läses där.

## Kedjan

Mathias producerar videon själv (beslut 2026-08-19): **ingen avatar, ingen VO,
ingen transkribering.** Han lämnar ett färdigklippt klipp, skillen gör animering
och motion. Klippsteget i famous-reel-editor (transcribe -> EDL -> cutjoin ->
silence_keep) körs alltså inte, och ingen API-nyckel behövs.

```
0  Kontrollera det inlämnade klippet:
      ffprobe -v error -select_streams v:0 \
        -show_entries stream=width,height -show_entries format=duration \
        -of default=nw=1 <video>
   Måste vara 1080x1920. Är källan liggande: beskär till 1080x1920 FÖRST,
   hela ramen ska vara video. Längden i sekunder går vidare till steg 2.

1  python <skill>/scripts/brand.py grafik
      palett, logga, maskotlager, Outfit och gsap ur brand.json
      Kräver BahkoByra-repot (eller BAHKO_BRAND_DIR=<mapp med brand.json>).

2  cd grafik && python <skill>/scripts/gen.py <videons_langd_i_sekunder>
      Sätt BEATS i gen.py med SEKUNDER som trigger: ("3.5", "graf", {...}).
      Skriver grafiklagret + beats.json.

3  npx hyperframes render . --format mov -o grafik.mov
      MÅSTE vara --format mov (eller png-sequence). En mp4 har ingen alfakanal
      och täcker videon helt svart.

4  python <skill>/scripts/maskot.py <maskot_dir> maskot 300 vinkar 12 4.0   (om maskot)
   python <skill>/scripts/sfx.py grafik/beats.json grafik/sfx.m4a <total_s>  (om SFX)

5  MASKOT=maskot MASKOT_FONSTER="4.2-8.6,11.0-15.4" SFX=grafik/sfx.m4a \
     bash <skill>/scripts/compose.sh <video> grafik/grafik.mov renders/<namn>.mp4
```

**Var tiderna kommer ifrån.** Utan transkript finns inga ord att hänga panelerna
på, så de tidsätts för hand: se klippet, skriv ner sekunden där varje panel ska
komma in, lägg in den som trigger. `gen.py` vägrar en ordtrigger i det här läget
och vägrar en sekund som ligger efter videons slut.

**Om det ändå finns tal i klippet** och undertexter ska med: `captions.py` läser
ett transkript med ordtider och kan inte köras utan ett. Då krävs
transkribering — säg till, det är ett eget beslut och en egen nyckel.

## Vad som är Mathias val, inte skillens

Inget av det här läggs på av sig självt. Utan flaggor blir resultatet: full
video, grafik ovanpå, och originalljudet ur Mathias klipp orört.

| Val | Flagga | Not |
|---|---|---|
| Maskot | `MASKOT=` + `MASKOT_FONSTER=` | placering `MASKOT_XY=`, default nedre vänster |
| Text (manus) | `CAPT=` | `CAPT_Y=` flyttar, storlek/font i captions.py |
| SFX | `SFX=` | följer med skillen, syntetiseras lokalt, inga credits |
| Musik | `MUSIC=` | **ingen fil följer med** — se nedan |

**Musik:** skillen syntetiserar inte musik. Ett påhittat spår låter som ett
påhittat spår (mätt på Mathias 2026-08-18: "musiken är värdelös"). Lägg ett eget
spår på `assets/musik.m4a` och det används automatiskt, eller peka med `MUSIC=`.
Ett genererat spår är en Higgsfield-beställning och kostar credits — kör aldrig
utan order.

## Layout och säkra zoner

Grafiken bor i **panelzonen y 210–910, x 60–1020**. Tre skäl styr det:

* Ansiktet i ett talking-head-klipp sitter normalt i mitten eller strax under.
* Instagrams knapprad ligger längs **högerkanten** (grovt x>950, y 1100–1750).
* Bildtext och namn ligger **nedtill** (y>1750).

Panelerna har egen yta, kant och skugga. Text kan inte ligga naken över rörlig
bild — den försvinner så fort något ljust rör sig bakom.

Outron är enda undantaget: den får dimma videon och ta hela ramen, för den är
slutbilden och inte ett inslag över talet.

## Varumärket

Palett, typografi, logga och maskotregler läses ur
`web/public/brand/brand.json` vid varje körning. **Beskriv aldrig varumärket ur
minnet.** Detaljer, mätta värden och fällor: `references/brand.md`.

Hårda regler som är inbyggda i koden, inte i disciplinen:

* **CTA:** smaragdyta med marinblå text. Vit text på smaragd är 2,54:1 och
  underkänt — `gen.py` tar färgerna ur `palett.json` så det inte kan slarvas bort.
* **Outro:** `logo-dark.svg` (vit text). `logo.svg` är marinblå och försvinner
  mot både videon och panelen.
* **Typografi:** Outfit rakt igenom.
* **GSAP lokalt:** `assets/gsap.min.js`, inte CDN. `gen.py` kastar om biblioteket
  saknas — annars renderas grafiken i sitt slutläge helt utan animation, med bara
  en mild varning.

## Tempo

`gen.py` varnar för varje panel under 1,4s. En panel ska hinna **läsas**, inte
bara visas (Mathias 2026-08-18: "det går för fort, man hinner inte med"). Sikta
3–5s per panel. Blir det trångt: slå ihop beats eller stryk en panel. Fem paneler
som hinns med slår nio som blinkar.

## Fällor

| Fel | Regel |
|---|---|
| Grafiken renderad som mp4 | Ingen alfakanal → hela videon blir svart. `--format mov`. `compose.sh` kontrollerar pixelformatet och vägrar köra annars. |
| Text naken över video | Allt innehåll i paneler med egen yta. En ljus rörelse bakom och naken text är borta. |
| Grafik i nedre höger | Instagrams knapprad ligger där. Panelzonen och maskotens standardplacering är valda för att undvika den. |
| Manustexten på skärmen | Karaoke-undertexter är ett VAL (`CAPT=`), inte standard. Mathias 2026-08-18: texten ska inte stå där om han inte ber om den. |
| Syntetiserad musik | Låter påhittad. Skillen gör det inte. |
| loudnorm utan aresample | På ffmpeg 6.x ger loudnorm 96kHz medan sampelantalet svarar mot 48kHz → ljudet dubbelt så snabbt. `aresample=48000` + `-ar 48000` + `-shortest` ligger i compose.sh. |
| Att visa ett mellanlager | `grafik.mov` utan video under, eller video utan grafik, läses som att något saknas i bygget. Visa slutkompositionen. |
