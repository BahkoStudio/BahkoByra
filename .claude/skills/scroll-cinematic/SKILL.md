---
name: scroll-cinematic
description: Use when someone asks to build a bygg-demo, scroll-cinematic demosajt, 3D scroll website för byggföretag, hus-förvandlings-demo, or "demo enligt GRANIT-mallen". Builds a cinematic demo site where Higgsfield-generated loops of the same house (old → dream home → walking in the door) drive an Élara-style scroll choreography.
argument-hint: [företagsnamn + nisch/ort, t.ex. "Tryggbyggservice badrum Stockholm"]
disable-model-invocation: true
---

# Scroll-Cinematic Bygg-Demo (GRANIT-mallen)

Bygger en kunddemo för byggföretag: **Élara-koreografin** (`bahkobyra/cloud/index.html`) — som ALLTID
är strukturen för våra kunddemos — med **Higgsfield-genererade videoloopar (gif-känsla)** av samma hus:
gammalt & trasigt → förvandlas till drömhus (hero-loopen) → kameran kliver in genom dörren (bakgrundsloopen).

**Facit / godkänd slutversion: `bahkobyra/cloud/bygg/index.html`** — kopiera den till
`bahkobyra/cloud/[kund]/index.html` och byt varumärke (namn, palett om kunden har egen, copy, klipp).

**OBS: Kostar Higgsfield-credits (~150/demo). Kör aldrig utan explicit beställning.**

## Strukturen (fast — ändra inte)

| Del | Innehåll |
|-----|----------|
| Loader | Varumärke + amber progressbar (simulerad, snabb ~1,5s) |
| Header | Fixed: logo + nav-länkar + CTA-knapp · hamburger + helskärms-mobilnav < 768px |
| Hero (100svh) | **Förvandlingsloopen (klipp 1) autoplay bakom** ordvis staggad rubrik (`.word`, shimmer-accent), tagline, scroll-indikator. `hero-content` har `padding-bottom:clamp(5rem,12vh,8rem)` så indikatorn ALDRIG krockar med taglinen |
| Fast videolager | **"Steget in"-loopen (klipp 2) fixed bakom alla sektioner**, nedtonad (`brightness(.62)` + vinjett). **Circle-wipe:n är knuten till HERO-utscrollningen** (`trigger:hero, start:'top top', end:'bottom top'`, radie `min(1,p*1.35)*75%`) — fullt avtäckt exakt när heron lämnat = inget svart gap |
| Scroll-container | **700vh desktop / 500vh mobil.** Absolut positionerade sektioner på progress-fönster, VARIERADE entréer — aldrig samma två gånger i rad |
| Sektionsfönster | 001 Filosofi `8–22` slide-left · 002 Projektgrid (3 kort) `26–42` stagger-up · 003 Tjänstelista `46–60` slide-right · 004 Stats + räknare `64–78` stagger-up · CTA `84–100` scale-up + `data-persist="true"` |
| Övrigt | Dark overlay-fönster `0.25–0.43` (max .5) och `0.63–0.79` (max .55) · räknare triggas `0.64–0.78`, nollas < `0.60` · flytande offert-knapp efter 60 % viewport · footer · Bahko-modal (Cal.eu `bahkobyra/15min`) · `noindex, nofollow` |

**Medvetet BORTTAGET (beslut 2026-06-11 — lägg inte tillbaka):** marquee-jättetext och
före/efter-slider — de krockade visuellt med videolagret. Säljlöftena bor i hero-tagline + cta-sub.

**Videopresentation: autoplay-loopar (gif-känsla), INTE scroll-scrub.** `<video autoplay muted loop
playsinline preload="auto" poster="<keyframe>">`. Gest-säkring: vid första `touchstart/pointerdown`
→ `play()` på pausade videos (mobilens lågenergiläge kan blockera autoplay). `prefers-reduced-motion`:
pausa videos, dölj loader/bgvid, gör sektionerna statiska (`#scroll-container{height:auto}`,
`.scroll-section{position:static;opacity:1}`).

## Steg

### 1. Budget-preflight (OBLIGATORISKT före all generering)

```
balance → kräver ~160 credits fritt. Under 200: fråga användaren innan du kör.
generate_video med get_cost:true → verifiera klippkostnad (8s 1080p Seedance ≈ 72 credits/klipp)
```

Budget per demo: 3 bilder (nano_banana_pro, ~2 credits/st) + 2 videoklipp à 8s 1080p (~72/st) ≈ **150 credits**.
Generera ALDRIG ett tredje "etablerings-klipp" — hero-loopen börjar ändå på gamla huset.

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
Klipp 1 "Förvandlingen" (hero-loopen): duration 8, aspect_ratio 16:9, resolution 1080p
  medias: [{value:A, role:'start_image'}, {value:B, role:'end_image'}]
  Prompt: "Cinematic time-lapse of a complete house renovation, locked-off camera, no camera movement…
  The first frame matches the start image exactly and the final frame matches the end image exactly."

Klipp 2 "Steget in" (bakgrundsloopen): samma params
  medias: [{value:B, role:'start_image'}, {value:C, role:'end_image'}]
  Prompt: "Single continuous cinematic steadicam shot, smooth slow dolly forward… the door opens smoothly
  inward, and the camera continues through the doorway into the living room… no cuts."
```

- Får du en `preset_recommendation`-notis: kör om bokstavligt med `declined_preset_id` — vi vill ha exakt våra keyframes.
- Polla med `job_display` tills `status: completed`; ta `results.rawUrl` (cloudfront-MP4).
- Hotlinka rawUrl:erna i `<video src>` + keyframe-PNG:erna som `poster` (omedelbar första målning).

### 4. Bygg sidan

Kopiera `bahkobyra/cloud/bygg/index.html` → `bahkobyra/cloud/[kund]/index.html` och byt:
1. Varumärke: titel, logo, loader-brand, footer, palett-variabler om kunden har egen profil.
2. Video-url:er + posters (klipp 1 i heron, klipp 2 i `.bgvid-wrap`).
3. Copy per sektion (se copy-regler). Projektkortens bilder: generera 3 st i kundens nisch
   (nano_banana_pro, ~2 credits/st) eller använd kundens egna jobbfoton om de finns.
4. Stats: anpassa till kundens verkliga siffror om kända — hitta aldrig på verifierbara påståenden
   åt en RIKTIG kund; demosiffror är OK för fiktiva varumärken som GRANIT.

**Scroll-scrub (ENDAST om kunden uttryckligen ber om det):** `video.currentTime`-scrub kräver
(1) gest-upplåsning `play().then(pause)` vid första gest, (2) seek-kö — aldrig ny `currentTime` innan
`'seeked'`, pumpa mot senaste målet, (3) buffert-uppvärmning `start:'top 150%'`. Lokalt med ffmpeg:
canvas-frames enligt video-to-website-skillen. Historik i git: commit "Videoscrub som faktiskt rör sig…".

### 5. Copy-regler

- Hero-rubrik: 2 rader, ordvis animerad, accentordet i grad-text ("Vi ser huset / ingen annan ser.").
- Tagline = säljlöftena: "Fast pris på papper · Hållen tidplan · 10 års garanti".
- Sektionsrubriker: korta, tunga, 2 rader, gärna grad-text på rad 2 ("Välj hantverk. / Inte chansning.").
- CTA: fråga som öppnar ("Vad ser du i ditt hus?") + "Begär kostnadsfri offert" + cta-sub med löftena.
- Allt på svenska, inga klyschor, GRANIT-tonen: kort, tungt, självsäkert. Aldrig "Växa på Google"-copy.

### 6. QA före leverans

1. `node --check` på inline-scriptet (extrahera `<script>`-blocket med regex, kör mot temp-fil).
2. Inga `__PLACEHOLDER__` kvar; båda `.mp4`-url:erna + posters satta.
3. Sektionsfönster överlappar inte; dark overlay-/räknarfönster matchar sektionernas.
4. Hero: indikatorn under taglinen (padding-bottom finns), `autoplay muted loop playsinline` på båda videos.
5. Mobil: hamburger funkar, textsektioner får frostad backdrop, 500vh-container.
6. `prefers-reduced-motion`: sidan statisk, videos pausade.
7. Committa, pusha, PR → main (Vercel deployar `bahkobyra/`). Skicka demolänken: `bahkobyra.se/cloud/[kund]/`.

## Guardrails

- **Credits:** preflight alltid `balance` + `get_cost`. Under 200 credits → fråga först. Max 1 retry per klipp.
- **Hotlink-risken:** cloudfront-url:erna ägs av Higgsfield. Vid lokal körning: ladda ner och committa
  MP4 i stället. Notera i PR:en vilken väg som användes. (Cloud-sandboxen kan INTE ladda ner från CDN:et
  och saknar ffmpeg — där är hotlink enda vägen.)
- **Konsistens före allt:** om keyframe B inte ser ut som SAMMA hus som A — generera om B med skarpare
  "IDENTICAL"-instruktion i stället för att acceptera ett annat hus. Det är hela konceptet.
- Demon ska alltid ha `noindex, nofollow` och Bahko-modalen (Cal.eu `bahkobyra/15min` + mailto till mathias@bahkobyra.se).
- Jag kan inte spela upp klippen från sandboxen — be alltid användaren ögongranska förvandlingen
  (samma hus?) och loopkänslan innan demon skickas till kund.
