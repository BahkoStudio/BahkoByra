---
name: scroll-cinematic
description: Use when someone asks to build a bygg-demo, scroll-cinematic demosajt, 3D scroll website för byggföretag, hus-förvandlings-demo, or "demo enligt GRANIT-mallen". Builds a cinematic scroll-driven demo site where an old broken house transforms into a dream home as you scroll, ending by walking in through the front door.
argument-hint: [företagsnamn + nisch/ort, t.ex. "Tryggbyggservice badrum Stockholm"]
disable-model-invocation: true
---

# Scroll-Cinematic Bygg-Demo

Bygger en demosajt för byggföretag enligt **GRANIT-mallen** med en filmisk scroll-resa:
samma hus genom hela berättelsen — **gammalt & trasigt → förvandling → drömhus → kameran kliver IN genom dörren**.
Higgsfield MCP genererar klippen (1080p), scrollen skrubbar videon.

**OBS: Kostar Higgsfield-credits (~150/demo). Kör aldrig utan explicit beställning.**

## Berättelsen (fast koncept — ändra inte strukturen)

| Akt | Innehåll | Källa |
|-----|----------|-------|
| 0. Hero | Det utdömda huset, stillbild + premium-copy ("Vi ser huset ingen annan ser.") | Keyframe A |
| 1. Förvandlingen | Pinned videoscrub: huset renoveras framför ögonen (3 textrader tonar in/ut) | Klipp 1 (A→B) |
| — Mitt | Vision + Projektgrid (3 kort) — GRANIT-mallens mid-sections | Befintliga/nya bilder |
| 2. Steget in | Pinned videoscrub: kameran glider fram, dörren öppnas, in i vardagsrummet ("Välkommen hem.") | Klipp 2 (B→C) |
| 3. CTA | "Vad ser du i ditt hus?" + Bahko-modal med Cal.eu | Mall |

**Mall/facit:** `bahkobyra/cloud/bygg/index.html` — kopiera den till `bahkobyra/cloud/[kund]/index.html`
och byt varumärke (namn, färger om kunden har egna, copy, klipp). Behåll alltid: nav, vision,
work-grid, CTA, footer, Bahko-modalen (Cal.eu `bahkobyra/15min`), `noindex`, reduced-motion-fallbacks.

## Steg

### 1. Budget-preflight (OBLIGATORISKT före all generering)

```
balance → kräver ~160 credits fritt. Under 200: fråga användaren innan du kör.
generate_video med get_cost:true → verifiera klippkostnad (8s 1080p Seedance ≈ 72 credits/klipp)
```

Budget per demo: 3 bilder (nano_banana_pro, ~2 credits/st) + 2 videoklipp à 8s 1080p (~72/st) ≈ **150 credits**.
Generera ALDRIG ett tredje "etablerings-klipp" — scrollens start håller ändå klipp 1:s första frame.

### 2. Generera keyframes (nano_banana_pro, 16:9)

Konsistensen bygger på referenskedjan — generera i exakt denna ordning:

1. **Keyframe A — gamla huset:** fotorealistiskt, svensk villa i förfall (flagnande fasad, trasigt tak,
   igenvuxen trädgård), front trekvartsvy i ögonhöjd, huset centrerat med luft runtom, "no people, no text".
   Anpassa husstil efter kundens nisch/ort.
2. **Keyframe B — drömhuset:** `medias:[{value:<jobb-id A>, role:'image'}]` + prompt som börjar
   "Use the reference image as the exact same house, same camera angle, same composition — but fully renovated…"
   och slutar "Keep the house geometry, position and perspective IDENTICAL to the reference."
3. **Keyframe C — interiören:** `medias:[{value:<jobb-id B>, role:'image'}]`, "Interior of the same renovated
   villa, seen from just inside the front door", samma ljussättning (golden hour), exteriörens palett ekad i detaljer.

### 3. Generera klippen (seedance_2_0 — stödjer start_image + end_image i 1080p)

```
Klipp 1 "Förvandlingen": duration 8, aspect_ratio 16:9, resolution 1080p
  medias: [{value:A, role:'start_image'}, {value:B, role:'end_image'}]
  Prompt: "Cinematic time-lapse of a complete house renovation, locked-off camera, no camera movement…
  The first frame matches the start image exactly and the final frame matches the end image exactly."

Klipp 2 "Steget in": samma params
  medias: [{value:B, role:'start_image'}, {value:C, role:'end_image'}]
  Prompt: "Single continuous cinematic steadicam shot, smooth slow dolly forward… the door opens smoothly
  inward, and the camera continues through the doorway into the living room… no cuts."
```

- Får du en `preset_recommendation`-notis: kör om bokstavligt med `declined_preset_id` — vi vill ha exakt våra keyframes.
- Polla med `job_display` tills `status: completed`; ta `results.rawUrl` (cloudfront-MP4).

### 4. Scroll-implementation — två vägar beroende på miljö

**Cloud-sandbox (Claude Code on the web — CDN-nedladdning blockerad, ffmpeg saknas):**
Hotlinka MP4-url:erna i `<video muted playsinline preload="auto" crossorigin="anonymous" poster="<keyframe>">`
och skrubba med `video.currentTime` — webbläsarens dekoder söker via range requests (cloudfront stödjer det).
Mönstret finns färdigt i `bahkobyra/cloud/bygg/index.html` (funktionen `initCine`): pinned ScrollTrigger
(`end:'+=300%'`, `scrub:.8`), textrader med `data-in`/`data-out` som tonas manuellt i `onUpdate` (FADE=0.06).

**TRE OBLIGATORISKA delar för att currentTime-scrub ska fungera (lärdom 2026-06-11 — utan dem ser videon
fryst ut på mobil):**
1. **Gest-upplåsning:** mobila webbläsare avkodar inte video före `play()` i en användargest — kör
   `play().then(pause)` på alla cine-videos vid första `touchstart/wheel/pointerdown/keydown` (`{once:true}`).
2. **Seek-kö:** skicka ALDRIG ny `currentTime` innan förra seeken är klar. Håll `target` uppdaterad i
   `onUpdate`, pumpa nästa seek i `'seeked'`-eventet. Att spamma seeks får mobildekodern att hacka/frysa.
3. **Buffert-uppvärmning:** separat ScrollTrigger med `start:'top 150%'`, `once:true` som kör
   `play().then(pause)` strax innan sektionen når skärmen.

**Lokalt (ffmpeg finns + nätverk öppet):** ladda ner MP4:erna, extrahera frames och kör canvas-scrub
enligt **video-to-website-skillen** (`fps≈12`, webp, 150-300 frames) — mjukare skrubb än currentTime.
Lägg frames i `bahkobyra/cloud/[kund]/frames/`.

### 5. Copy-regler

- Akt 1-raderna berättar förvandlingen (3 st): "Vi river inte drömmar." → "Vi bygger fram dem." → "Från utdömt till drömhus."
- Akt 2 (2 st): "Öppna dörren." → "Välkommen hem."
- Säljlöftena (fast pris / i tid / garanti) bor i hero-meta + cta-sub — INTE i cine-raderna.
- Allt på svenska, inga klyschor, GRANIT-tonen: kort, tungt, självsäkert.

### 6. QA före leverans

1. `node --check` på inline-scriptet (extrahera `<script>`-blocket).
2. Verifiera att `__VIDEO1_URL__`/`__VIDEO2_URL__`-platshållare är ersatta med riktiga rawUrl:er.
3. Posters = keyframe A (cine1) resp. B (cine2) så första målningen är omedelbar.
4. `prefers-reduced-motion`: videorna ska falla tillbaka till autoplay-loop, cine-rader synliga utan scrub.
5. Mobil: 100svh, `playsinline`, scrollcue dold under 760px.
6. Committa, pusha, PR → main (Vercel deployar `bahkobyra/`).

## Guardrails

- **Credits:** preflight alltid `balance` + `get_cost`. Under 200 credits → fråga först. Max 1 retry per klipp.
- **Hotlink-risken:** cloudfront-url:erna ägs av Higgsfield. Vid lokal körning: ladda ner och committa
  MP4/frames i stället. Notera i PR:en vilken väg som användes.
- **Konsistens före allt:** om keyframe B inte ser ut som SAMMA hus som A — generera om B med skarpare
  "IDENTICAL"-instruktion i stället för att acceptera ett annat hus. Det är hela konceptet.
- Skriv aldrig "Växa på Google"-copy i demon (positioneringsregeln i CLAUDE.md).
- Demon ska alltid ha `noindex, nofollow` och Bahko-modalen.
