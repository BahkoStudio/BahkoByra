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

**Strukturen = Élara-koreografin** (`bahkobyra/cloud/index.html`) — det är ALLTID den vi använder för
kunddemos — med Higgsfield-gif:arna i stället för ambient-canvas. Facit för bygg:
`bahkobyra/cloud/bygg/index.html`.

| Del | Innehåll |
|-----|----------|
| Loader | Varumärke + progressbar (simulerad, snabb) |
| Header | Fixed med nav-länkar + CTA-knapp; hamburger + helskärms-mobilnav under 768px |
| Hero (100svh) | **Förvandlingsvideon som autoplay-loop (gif)** bakom ordvis staggad rubrik (`.word`, shimmer-accent), tagline, scroll-indikator. Heron tonar ut när scrollen börjar |
| Fast videolager | **"Steget in"-loopen fixed bakom alla sektioner**, avtäcks med circle-wipe (`clip-path:circle`) när heron lämnar — nedtonad (brightness ~.62 + vinjett) för läsbarhet |
| Scroll-container (900vh / 620vh mobil) | Absolut positionerade sektioner på progress-fönster (`data-enter`/`data-leave`), VARIERADE entréer — aldrig samma två gånger i rad: slide-left → fade-up → stagger-up → slide-right → stagger-up → scale-up |
| Sektionerna | 001 Filosofi (sidoställd) · 002 **Före/efter-slider med keyframes A/B** (scroll-avtäckning + drag) · 003 Projektgrid (3 kort) · 004 Tjänstelista · 005 Stats med räknare som tickar upp · CTA med `data-persist="true"` |
| Övrigt | Marquee i jättetext (outlined, xPercent på scroll) · dark overlay-fönster över projekt+stats · flytande offert-knapp efter 60 % viewport · Bahko-modal (Cal.eu) |

**Videopresentation: autoplay-loopar (gif-känsla), INTE scroll-scrub.** `<video autoplay muted loop
playsinline preload="auto" poster="<keyframe>">`. Gest-säkring (`touchstart/pointerdown` → `play()` på
pausade videos) för lågenergiläge, och `prefers-reduced-motion`: pausa videos, döda loadern, gör
sektionerna statiska (CSS: `#scroll-container{height:auto}`, `.scroll-section{position:static;opacity:1}`).

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

### 4. Videopresentation — autoplay-loop (standard)

Hotlinka MP4-url:erna (`results.rawUrl`) i `<video autoplay muted loop playsinline preload="auto"
poster="<keyframe>">`. Hero = klipp 1 bakom hero-copy (med GSAP-parallax på videoelementet),
"Steget in" = klipp 2 i en 100svh-sektion med overlay-rubrik. Mallen ligger i
`bahkobyra/cloud/bygg/index.html`. Gest-säkring: vid första `touchstart/pointerdown`, `play()` på
alla pausade videos (lågenergiläge på mobil blockerar ibland autoplay). `prefers-reduced-motion`:
pausa looparna (postern står stilla).

**Alternativ (endast om kunden uttryckligen ber om scroll-scrub):** `video.currentTime`-scrub kräver
tre delar för att inte se fryst ut på mobil (lärdom 2026-06-11): (1) gest-upplåsning `play().then(pause)`
vid första gest, (2) seek-kö — aldrig ny `currentTime` innan `'seeked'` har kommit, pumpa mot senaste
målet, (3) buffert-uppvärmning via ScrollTrigger `start:'top 150%'`. Lokalt med ffmpeg: extrahera frames
och kör canvas-scrub enligt video-to-website-skillen (mjukast). Historik: scrub-varianten finns i git
(`git log bahkobyra/cloud/bygg/index.html`, commit "Videoscrub som faktiskt rör sig…").

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
