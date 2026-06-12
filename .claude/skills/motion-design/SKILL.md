---
name: motion-design
description: Use when someone asks to create motion design, animate a logo, make a promo video, "animera loggan", "logo-animation", "promovideo", "reels-intro", "motion graphics", "brand motion" or "gör en video av min logga". Guides a full Higgsfield motion design flow from brief to storyboard to rendered video.
argument-hint: [varumärke/produkt + classic eller hyper, t.ex. "Bahko Byrå hyper 9:16"]
disable-model-invocation: true
---

# Motion Design (Higgsfield)

Full motion design-flöde: brief → storyboard (EN grid-bild) → video (Seedance 2.0).
Svara alltid på användarens språk. Var kortfattad och rak.

**OBS: Kostar Higgsfield-credits. Kör aldrig utan explicit beställning.**

## Bahko-användning (varför skillen finns)

Motion design är **ALDRIG front offer** — hemsidor är offerten (positioneringsregeln i CLAUDE.md).
Den används för att attrahera och merförsälja:

1. **Reels-hooks för @bahkostudio** (ihop med instagram-engine): 5s kinetiska intro-stings till
   content-batcharna — högre stopp-effekt i flödet än statisk text. Format 9:16, highMD.
2. **Uppsell-trappan ("Mer wizardry"):** logo-animation/promovideo som tilläggstjänst EFTER
   hemsideleveransen — kundens nya sajt + en animerad brand-video till deras IG. Prissätts separat.
3. **Demo-kryddning (sparsamt):** 5s logo sting av prospektets varumärke kan adderas i en kunddemo
   som wow-moment — men bara för kvalificerade leads (värdeprincipen, credits).
4. **Eget varumärke:** Bahko Byrå-sting för IG-annonser och bahkobyra.se.

## Miljöanpassning (viktigt — originalet antog andra verktygsnamn)

- Higgsfield-verktygen i denna miljö har server-prefix — ladda dem via **ToolSearch**
  (sök "higgsfield generate_video balance models_explore job_display media_upload"), inte `mcp__higgsfield__*`.
- Intake-frågor ställs med **AskUserQuestion** (inte `ask_user_input_v0`), ALLA i en enda runda (multi-question).
- **Bildmodell: `gpt_image_2`** (verifierat ID 2026-06-12; params `quality: low/medium/high`, `resolution: 1k/2k/4k`)
  — varianterna "pro/banana/nano" finns INTE. Fallback om gpt_image_2 saknas: `nano_banana_pro`.
- **Videomodell: `seedance_2_0`** (verifierad i scroll-cinematic-pipelinen; stödjer `start_image`, 1080p, 16:9/9:16/1:1)
  eller **`kling3_0`** (verifierad 2026-06-12: pro-läge 5s 9:16 ≈ 12,5 credits — mycket billigare än Seedance;
  `mode: std/pro/4k`, `sound: on/off`, 3–15s). **KLING-KRAV (lärdom): `end_image` ENSAM ger status failed —
  skicka ALLTID både `start_image` OCH `end_image`.** Generera en startruta (~2 credits) om en saknas,
  och matcha referensbildernas aspect mot videons.
- **`media_import_url` accepterar INTE SVG** (lärdom 2026-06-12) — rastrera loggan via `gpt_image_2`
  med `brand/brand.json`-beskrivningen istället. Färdiga Bahko-rasters finns redan i brand.json
  (`logo_raster_16x9`, `logo_raster_9x16_stacked`, `brand_sting_9x16`).
- **Budget-preflight FÖRST:** `balance` + `get_cost:true`. Riktpris: 8s 1080p Seedance ≈ 72 credits,
  storyboard-bild ≈ 2–6 credits beroende på quality. Under 200 credits: fråga användaren innan du kör.
- Får du `preset_recommendation`-notis: kör om bokstavligt med `declined_preset_id`.

## STEG 0 — Avgör flödestyp

- **classicMD** — standardannonser, brand-promos, tjänstepresentationer, logo reveals, atmosfäriskt.
- **highMD** — sport/tech/musik/fashion, AI-demos. Extrem kamerafart, aggressiva klipp, peak dynamics.
  Inga realistiska människor — endast siluetter, kromfigurer eller abstrakta 3D-former.

Uppenbart av förfrågan → fortsätt tyst. Annars fråga: "Vilken stil passar projektet bäst?"
(Classic Motion: mjuka övergångar, elegant typografi, filmiskt / Hyper-Kinetic: snabba klipp, extrem dynamik, CGI-energi)

## STEG 1 — Brief (EN runda, alla frågor samtidigt via AskUserQuestion)

1. Har du befintliga assets? (Ja — laddar upp logga/produktfoto/referens / Nej — hjälp mig skapa visualen)
2. Längd: 5s (teaser/logo sting) · 10s (post/stories) · 15s (promo/produktvideo)
3. Format: 16:9 (YouTube/sajt) · 9:16 (Reels/TikTok/Stories) · 1:1 (Feed)
4. Mood/stil (fritext): energisk, minimalistisk, lyx, teknologisk, atmosfärisk, aggressiv, filmisk…
5. Varumärke/produktnamn + ev. tagline
6. Antal storyboard-rutor: 6 (standard) · 8 (detaljerad) · 9 (max)

Spara alla svar innan du går vidare.

## STEG 2 — Assets

**Har assets:** be om uppladdning (PNG/JPG/SVG). I Apps UI: använd `media_upload_widget`
(remote-verktyg kan inte läsa chatt-bilagor). Web-URL: `media_import_url` → media_id.

**Saknar assets:** generera basvisual med `gpt_image_2` utifrån briefen (varumärke, mood, palett,
format). Visa med `job_display`. Fråga: "Funkar bilden eller vill du ändra något?" Iterera tills godkänd.

## STEG 3 — Storyboard (EN enda grid-bild — aldrig N separata bilder)

Generera ETT `gpt_image_2`-anrop med godkänd asset som referens (`medias:[{value:<id>, role:'image'}]`):

```
Storyboard sheet with [N] sequential panels in a grid layout, each panel labeled "Frame 1", "Frame 2"…
Panel 1: [scen]. Panel 2: [scen]. … Panel N: [logo lock / varumärke].
Each panel shows: [kameravinkel], [rörelsetillstånd], [mood/ljus]. Visual style: [cinematic/kinetic].
Consistent color palette throughout. Clean storyboard design, thin border between panels, [format per panel].
```

Varje ruta: distinkt ögonblick (öppning → bygg → klimax → upplösning → logo lock), kamera/motion-state,
2–4 ords inbränd scenetikett. classicMD: mjuka kompositioner, elegant typografi, filmiskt ljus.
highMD: peak-action-frysningar, splittrade element, neonkontrast.

Visa med `job_display` + presentera sammanfattning (Frame 1…N, Mood, Motion, Ending).
Fråga: "Hur ser storyboarden ut? Godkänn eller ändra?" — iterera tills godkänd.

## STEG 4 — Video (seedance_2_0)

Prompt = storyboard-narrativ + flödestyp + längd + format + mood + logo lock.

classicMD: `smooth motion design, [scenflöde], elegant transitions, [mood] atmosphere, cinematic camera
movement, [längd]s, brand reveal at end: [varumärke], [format]`

highMD: `high-intensity kinetic motion, [scenflöde], extreme camera speed, aggressive match-cuts,
peak-action freeze frames, [mood] CGI aesthetic, neon contrast, [längd]s, hard stop logo lock: [varumärke], [format]`

- highMD: sista sekunderna = statisk hold på loggan, skrivs in explicit i prompten.
  Proportion: ~1s (5s-klipp), ~2s (10s), ~2–3s (15s).
- `medias: [{value: <original-asset eller första godkända storyboard-jobbet>, role:'start_image'}]`
- Polla `job_display` tills klar, leverera `results.rawUrl`.

## STEG 5 — Granska & iterera

"Klart! Vad tycker du?" — Älskar den (klar) · Annan klippning (ny prompt, samma storyboard) ·
Annan stil (tillbaka till steg 1) · En version till (parallell variant).

## Regler

- Alla intake-frågor i EN runda — aldrig uppdelat.
- Storyboard = EN bild. Inget moodboard-steg.
- highMD: aldrig realistiska människor; logo lock-längd proportionell mot kliplängd.
- classicMD-logga: öppning, avslut eller båda — fråga om ospecificerat.
- Jag kan inte spela upp resultatet från sandboxen — be användaren ögongranska före leverans/publicering.
- Misslyckad generering: förklara kort, erbjud retry med justerade parametrar. Max 1 retry utan att fråga.
