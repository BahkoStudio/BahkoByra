---
name: bahko-reel
description: Använd när ett klipp där Mathias pratar ska bli en färdig 9:16-reel i BahkoByrås varumärke. Videon fyller HELA ramen hela tiden och den animerade grafiken ligger som ett genomskinligt lager ovanpå - ingen delad ram, inget svart band. Maskoten står vid honom i valda fönster. Text, musik och SFX är val han styr, inget läggs på av sig självt. Trigga på "bahko-reel", "gör en reel av det här klippet", "reel med grafik över mig", "reel för @bahkostudio", eller när ett talking-head-klipp av Mathias ska bli reel. INTE för kunddemos (se scroll-cinematic/hemsidor) och INTE för publicering.
---

# Bahko-reel

Ett klipp där Mathias pratar blir en färdig 9:16-reel: **han syns i hela bilden
hela tiden**, och den Bahko-brandade grafiken ligger som ett alfa-lager över
honom. Maskoten står vid honom där hon passar.

## Skillnad mot famous-reel-editor

`famous-reel-editor` delar ramen: grafik i övre 864 px, ansiktet i nedre 1056.
Halva bilden motion, halva person. Den här skillen gör inte det (Mathias beslut
2026-08-18) — videon fyller allt, grafiken flyter ovanpå.

De tunga stegen i klippningen är inte dubblerade. Transkribering, EDL, klipp och
tystnadstrim körs med `famous-reel-editor/scripts/` (transcribe, cutjoin,
silence_keep) — reglerna för dem bor i den skillen och ska läsas där, särskilt
allt om att hitta rena tagningar och att inte klippa av ord.

## Kedjan

```
1  Klipp klart videon med famous-reel-editor: transcribe -> EDL -> cutjoin ->
   silence_keep -> cutjoin -> RE-transkribera det färdiga klippet.
   Är källan liggande: beskär till 1080x1920 FÖRST, hela ramen ska vara video.

2  python <skill>/scripts/brand.py grafik
      palett, logga, maskotlager, Outfit och gsap ur brand.json

3  cd grafik && python <skill>/scripts/gen.py ../edit/tF/transcripts/cutF.json
      grafiklagret + beats.json

4  npx hyperframes render . --format mov -o grafik.mov
      MÅSTE vara --format mov (eller png-sequence). En mp4 har ingen alfakanal
      och täcker videon helt svart.

5  python <skill>/scripts/maskot.py <maskot_dir> maskot 300 vinkar 12 4.0     (om maskot)
   python <skill>/scripts/sfx.py grafik/beats.json grafik/sfx.m4a <total_s>   (om SFX)
   python <skill>/scripts/captions.py <transkript> capt 12 92                 (om text)

6  MASKOT=maskot MASKOT_FONSTER="4.2-8.6,11.0-15.4" SFX=grafik/sfx.m4a \
     bash <skill>/scripts/compose.sh edit/cutF.mp4 grafik/grafik.mov renders/<namn>.mp4
```

## Vad som är Mathias val, inte skillens

Inget av det här läggs på av sig självt. Utan flaggor blir resultatet: full
video, grafik ovanpå, bara rösten.

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
