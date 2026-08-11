---
name: scroll-cinematic
description: Use when someone asks to build a bygg-demo, scroll-cinematic demosajt, 3D scroll website för byggföretag, hus-förvandlings-demo, or "demo enligt GRANIT-mallen". Builds a cinematic demo site where Higgsfield-generated loops of the same subject (old → transformed → walking in/closer) drive an Élara-style scroll choreography, followed by a real static site (om oss/process/galleri/kontakt).
argument-hint: [företagsnamn + nisch/ort, t.ex. "Tryggbyggservice badrum Stockholm"]
disable-model-invocation: true
---

# Scroll-Cinematic Demo (GRANIT-mallen)

Bygger en kunddemo för hantverksnischer: **den videodrivna koreografin** (fast
videolager + sektioner på progress-fönster) med **Higgsfield-genererade videoloopar**
(gif-känsla) som visar en förvandling i kundens egen nisch: gammalt/trasigt/smutsigt
→ åtgärdat (hero-loopen) → kameran rör sig närmare/in i resultatet (bakgrundsloopen).
Följt av en **riktig hemsida-del** (om oss / så går det till / galleri / kontakt)
så sidan känns komplett, inte bara en snygg trailer.

**Kostar ~49 credits/demo om inget kan återanvändas (recopy: 0 — prova alltid
`demo-recopy` först vid känd nisch). Kör aldrig utan explicit beställning.**

## Referenser & facit

- **Modern referens — KOPIERA DENNA:** `web/public/cloud/glowingservice/index.html`.
  Nyast, med alla härdade regler: tempo-lagarna, apple-design-heron (setup/punch),
  galleri/mobil/klick-reglerna, `.static-site`, `#nudge-popup`, typgolvet.
- **Palett-/nischvarianter att låna från:** `grontoglanser` (smaragd, fasadtvätt-
  exteriör) · `galiano` (lera, interiörmåleri) · `k9maleri` (kobolt, måleri inne+ute)
  · `golvresan` (logo-orange, golv) · `solpanelstjejen` (solgul, besiktning, jag-form).
  Varje ny demo får en EGEN distinkt palett — kolla att den inte krockar med dessa.
- **Historiskt fryst:** `web/public/cloud/bygg/` = GAMLA varumärket (guld/Cormorant),
  rörs aldrig (CLAUDE.md-beslut). `tryggbyggservice`/`vajjebygg` har den föråldrade
  700vh/`syncTouch:true`-arkitekturen — låna aldrig deras JS, bara deras media.
- **Output: `web/public/cloud/[kund]/index.html` ENBART.** Gamla `bahkobyra/cloud/`
  byggs inte längre av något Vercel-projekt (404-incidenten 2026-08-06) — lägg
  aldrig demos där. Kundlänk: `bahkobyra.se/cloud/[kund]/`.

## Higgsfield: modeller, priser, kommandon (verifierat 2026-08-06→11)

CLI:t är `@higgsfield/cli` (binär `higgsfield`, alias `hf`). I Git Bash:
`export PATH="/c/Users/mathi/AppData/Local/hermes/node:$PATH"` först.

| Uppgift | Kommando |
|---|---|
| Saldo | `higgsfield account status` |
| Tidigare jobb | `higgsfield generate list --size 60` (visar INTE prompts) |
| Kostnad (gratis) | `higgsfield generate cost <modell> --prompt "…" [params]` |
| Generera | `higgsfield generate create <modell> --prompt "…" --wait --wait-timeout 9m` |
| Hämta jobb | `higgsfield generate get <id>` |

Params: `--namn värde`, snake_case → kebab-case. Media-flaggor (`--image`,
`--start-image`, `--end-image`) tar **lokal filväg** (auto-upload) — rått jobb-ID
ger typfel (`input_images.0.type`), använd fil.

**Modeller & priser (verifierade via `generate cost`):**

| Modell | Roll | Pris | Regler |
|---|---|---|---|
| `seedream_v5_pro` | Keyframes | 3 cr | `--resolution 2k --aspect_ratio 16:9` (Mathias-beslut 2026-08-06). NSFW-flaggar ibland exteriörer/smuts-prompter → max 1 omformulering, sen fallback `nano_banana_pro` (2 cr) |
| `seedance_2_0_mini` | Klipp, STANDARD | 20 cr (8s 720p) | **Alltid `--generate-audio false`** (default är true!). Ljud kostar inget extra men gör MP4:an tyngre — loopar spelas alltid mutade |
| `seedance_2_5` | Klipp, på beställning | 52 cr | `--mode omni_reference` krävs för start/slutbild. Klarar interiörer; NSFW-flaggar husexteriörer (2026-08-11). Endast när Mathias ber om det |
| `seedance_2_0` / `seedance1_5` | — | 36–72 cr | Används aldrig |

- ~15 % av jobben failar server-side utan orsak och debiteras inte — kör om en gång.
- **CLI-timeout ≠ jobbfel:** kolla `generate list` innan omkörning; jobbet kan ha
  blivit klart server-side (lärdom 2026-08-11, annars dubbel debitering).
- NSFW-flaggade jobb debiteras inte.
- Budget per demo: 3 keyframes × 3 + 2 klipp × 20 ≈ **49 credits**. Under 200 kvar
  efter reuse-check: fråga Mathias först. Aldrig ett tredje "etablerings-klipp".

## Vem gör vad

| Arbete | Vem |
|---|---|
| Nisch-metafor, art direction, copy, QA-bedömning | **Du (Claude)**, aldrig delegerat |
| Nischverifiering (Steg 0), återanvändningskoll (Steg 1) | Du, med research-verktyg |
| Oberoende bildgenereringar | Parallella anrop i samma meddelande |
| `node --check`, git, polling | Ren mekanik — gör det varje gång |

## Design-skills att koppla in

| Skill | När |
|---|---|
| **find-animation-opportunities** | Efter Steg 5, innan QA |
| **animate** | När ett animationshål hittas eller ny sektionstyp läggs till — tempo-lagarna är constraints |
| **review-animations** + **web-design-guidelines** | Steg 7 QA på ny/ändrad motion-/UI-kod. Hoppa vid ren rebrand mot oförändrad referens |
| **prototype** | Steg 0, om metaforvalet står mellan 2+ riktningar |
| **apple-design** + **emil-design-eng** | Alltid i bakgrunden — källorna till Känsla & craft |
| **improve-animations** / **pick-ui-library** / **animation-vocabulary** | Sällan: mall-refresh / bibliotekbyte / terminologi |

## Strukturen (fast — ändra inte)

| Del | Innehåll |
|-----|----------|
| Loader | Varumärke + progressbar (simulerad ~0,6s, animerar `transform:scaleX`, aldrig `width`) |
| Header | Fixed: logo + nav + klickbart tel + CTA · hamburger + helskärms-mobilnav <768px · kompakt ring-knapp synlig BREDVID hamburgaren på mobil |
| Hero (100svh) | Förvandlingsloopen autoplay bakom tvådelad rubrik: `.setup` (liten uppställning) + `.punch` (stor accent-poäng), båda `.word`-staggade, rörelse `.34em`. Tagline i normal skrift. `hero-content` har `padding-top:clamp(6.5rem,15vh,9rem)` OCH `padding-bottom:clamp(6rem,13vh,8.5rem)` (rensar header resp. indikator) |
| Fast videolager | Bakgrundsloopen fixed bakom sektionerna, `brightness(.62)` + vinjett. Circle-wipe knuten till HERO-utscrollning: `trigger:hero, start:'top top', end:'bottom top'`, radie `min(1,p*1.35)*75%` |
| Scroll-container | **520vh desktop / 620vh mobil** (mobil MER, inte mindre). Absoluta sektioner på progress-fönster, varierade entréer |
| Sektionsfönster | 001 `3–24` slide-left · 002 `28–45` stagger-up · 003 `49–63` slide-right · 004 stats `67–80` stagger-up · CTA `84–100` scale-up + `data-persist` |
| Övrigt | Dark overlay `0.27–0.46` (max .5) och `0.66–0.81` (max .55) · räknare `0.67–0.80`, nollas <`0.63` · flytande knapp efter 60 % viewport (desktop: Begär offert → modal · mobil: Ring → `tel:`) · Bahko-modal (Cal.eu `bahkobyra/15min`) · `noindex, nofollow` |
| Nudge-popup | `#nudge-popup`: 3 visningar (t≈10s/100s/160s), auto-döljs 8s, `cancelNudges()` när modalen öppnas. CTA-text matchar nischen |
| Riktig hemsida-del | `.static-site`: Om oss (bild+text+punktlista) · Så går det till (4 steg) · Galleri (se Galleri-reglerna) · Kontakt (stort klickbart tel, mejl, område, offert-kort). Nav pekar på `#om-oss` `#process` `#kontakt`. Engångs-scroll-reveal (`once:true`, `start:'top 85%'`, samma rörelsevärden som mallen). INTE valfri |

**Medvetet borttaget (2026-06-11, lägg inte tillbaka):** marquee-jättetext och
före/efter-slider — krockade med videolagret.

**Video:** autoplay-loopar, INTE scroll-scrub. `<video autoplay muted loop playsinline
preload="auto" poster="…">` — `preload="auto"` ENDAST hero, bakgrundsloopen
`preload="metadata"`. Gest-säkring vid första touch (guarda `if(reduce)return`).
`prefers-reduced-motion`: pausa video, statiska sektioner, räknare till slutvärden.
Scroll-scrub endast på uttrycklig kundbegäran (seek-kö, gest-upplåsning — se git-historik).

## Känsla & craft — regelsamling (destillat; full historik i storm-reports/ + git)

Teori-importerat lager (apple-design + emil-design-eng), granskad av Storm
Research-audit 2026-08-05 (`storm-reports/scroll-cinematic-craft-audit-briefing.html`).

- **Scrub-baserad koreografi, aldrig `.play()`/`.reverse()`-timelines** — analogt
  med Apples interruptibility (presentationsvärdet styr). Reverse gav "suddig
  känsla"-klagomålet 2026-06-11.
- **Knapptryck:** alla klickbara har `:active{transform:scale(.97)}`, 100–160ms,
  `--ease-out-strong:cubic-bezier(.23,1,.32,1)` (endast CSS-micro, aldrig GSAP:s
  power2.out). Utöka BEFINTLIGA `transition`-regler — en andra `transition`-rad på
  samma selektor tystar de gamla egenskaperna (shorthand-fällan, verifierad bugg
  2026-08-05). Hover gated bakom `@media(hover:hover) and (pointer:fine)`.
- **Modal:** `transform-origin:center` (inte trigger-ankrad — fem CTA:er öppnar
  den), in från `scale(.95)+opacity:0` (aldrig `scale(0)`), stänger snabbare än
  den öppnar. Nudge: slide in/ut samma bana, ingen scrim. CSS-transitions, inte
  keyframes (måste kunna avbrytas).
- **Hero-typografi (verifierad bugg 2026-08-06 — rubriken sprängde headern):**
  tvådelad `.setup`/`.punch` med storleksspecifik tracking (`.005em`/`-.022em`)
  och leading (`1.15`/`.94`). Max-width `min(1120px,94vw)` — ALDRIG `ch`/`em`
  (räknas mot ärvda 16px när storleken bor på barnen). `text-wrap:balance`.
- **Typgolv:** inget under 11 px (detektorn flaggar), etiketter ≥ .72rem, inga
  versaler på rader över ~35 tecken (ordform försvinner).
- **Material:** header + mobil textbackdrop = translucenta (`backdrop-filter`),
  aldrig två translucenta lager på varandra. `prefers-reduced-transparency`:
  solida plattor, inte försvunna.
- **Prestanda:** entréer animerar bara `transform`/`opacity`. `will-change` sätts
  strax före ett sektionsfönster, tas bort efter. OBS: blur ovanpå autoplay-video
  på mellanklass-mobil är OMÄTT — profilera innan skarp kundleverans i stor skala.
- **Skuggor:** neutrala höjdskuggor (`rgba(0,0,0,…)`), aldrig färgade glöd-halos.
- **Facktermer** (animation-vocabulary): scroll-koreografin = *scroll-driven
  animation* · cirkel-wipen = *reveal* · sektionsentréer = *stagger* + *fade in* +
  translate (22–32px är INTE *slide in* — det kräver entré utifrån skärmen) ·
  CTA:n = *scale in* · statisk del = *scroll reveal* (`once:true`).

## Galleri-, mobil- och klickregler (2026-08-11, Mathias: "galleribilderna är för stora")

**Galleriet:**
- Mobil ≤768px: `grid-template-columns:repeat(2,1fr);gap:.6rem` — **ALDRIG `1fr`**
  (sex fullbreddsbilder = sex skärmhöjder scroll). Desktop: 3 kolumner.
- Enhetlig `aspect-ratio:16/11` + `object-fit:cover` på alla. Max 6 bilder,
  **före/efter-paret först**. Thumbs >300 KB: gör en 1280px-variant
  (`ffmpeg -vf "scale=1280:-2" -q:v 4`). Bildtexter: en rad, ≤45 tecken,
  "Namn — kort utfall."

**Mobilen:**
- **Hero-postern MÅSTE matcha videons frame 0** — byts videon (Mathias genererar
  egna): `ffmpeg -i video.mp4 -vframes 1 f0.png` och jämför.
- Grid-kollaps: galleri 3→2 (aldrig 1) · steg 4→2→1 · stats 4→2.
- Test i 390px: ingen sidled-scroll, inget under 13px, galleriet inom ~2,5 skärmhöjder.

**Klickvägarna:**
- **Hantverkskunder ringer.** Numret klickbart (`tel:`) i header, mobilnav,
  cta-sub, kontakt OCH footer.
- Mobil-headern: kompakt ring-knapp synlig bredvid hamburgaren — en handling
  ovanför vecket utan scroll/menyklick.
- Flytande knappen: mobil = `tel:`-länk "Ring oss", desktop = "Begär offert" (modal).
- Knapptext = handling: "Begär offert" · "Ring 070-…" · "Boka besiktning".
  Aldrig "Läs mer"/"Skicka". CTA-rubriken är en fråga kunden svarar ja på i
  huvudet; knappen är svaret.

## Tempo-lagar (hårt lärda 2026-06-11 — bryt inte utan starkt skäl)

Gamla 700vh/500vh med `syncTouch:true` och `tl.reverse()` gav samstämmiga kund-
klagomål ("för mycket film", suddig text, mobilen rusade). Rotorsaker och fixar:

1. `syncTouch:false` — mobilen scrollar nativt; Lenis mjukar bara mushjulet.
2. Ingen reverse — sektioner tonar bara ut via opacity, ingen rörelse ut.
3. Bredare fönster (`fadeRange:0.045`) + mjukare entréer (`power2.out`, 22–32px).

Konkreta värden (kopiera, hitta inte på nya): loader `+=Math.random()*24+16` var
`35+Math.random()*45`ms, paus 180ms · hero-entré ~0,7s (ord-stagger `.08`,
duration `.55`) · sektionsentré `stagger:.06-.07`, `duration:.45-.5` · räknare
`duration:1.1` · mobil 620vh > desktop 520vh · `overflow-x:clip` +
`touch-action:pan-y pinch-zoom` på body.

## Steg

### 0. Verifiera kundens faktiska nisch (OBLIGATORISKT)

Gissa ALDRIG bransch från namn eller visningsnamn — verifierade fällor: leadens
IG-namn krockade med ett orelaterat USA-bolag (FloorMagic, 2026-08-11); registret
spretade åt tre håll och krävde Mathias blick på deras IG (Glowing, 2026-08-11).
Kolla Instagram/hemsida; blockeras det: bolagsregister (allabolag/merinfo/ratsit
via WebSearch + r.jina.ai-proxy) → org.nr, verksamhetsbeskrivning, reg.datum.
Registrets reg.år är enda tillåtna historiksiffran. Metaforexempel:

- Bygg/renovering → förfallet hus → drömhus (originalet)
- Mark/anläggning → sönderkörd tomt → färdig infart
- Rör/relining → korroderat rör → rent badrum
- Fasadtvätt/softwash → algpåväxt → ren fasad (locked-off funkar bäst här —
  subjektet står stilla, bara ytan ändras)
- Måleri/golv/städ (interiör) → slitet/smutsigt rum → nyklart, makro på detaljen
  som bevisar hantverket (snittet, ådringen, kranen)
- Besiktning/tjänst utan synlig förvandling → **förvandlingen är avståndet**:
  helhet → närmare → detaljen experten ser (solpanelstjejen-mönstret)

Omöjligt att verifiera? Säg det och FRÅGA — bygg aldrig på tyst gissning.

### 1. Kolla återanvändning FÖRE ny generering

`higgsfield generate list --size 60` + skanna befintliga demos media-mappar.
Generiska stödbilder (galleri, om oss) är fria att återanvända inom samma nisch —
repot har bl.a. fiskbensparkett, badrum, trädgård, tak/skiffer, fasader, kranbil.
Hela keyframe-kedjor endast vid EXAKT samma nisch. Den bespoke A/B/C-kedjan för
en specifik kund kan aldrig splittas mot en annans. Ny lead i nisch med befintlig
demo → **demo-recopy i stället (0 credits)**.

### 2. Budget-preflight

`higgsfield account status` + `generate cost` per modell (se modellblocket).
Under 200 credits efter reuse-check: fråga Mathias.

### 3. Generera keyframes (se modellblocket för modell/pris)

Referenskedjan i exakt denna ordning — konsistensen ÄR konceptet:

1. **A — utgångsläget:** fotorealistiskt, nischanpassat, front trekvartsvy/naturlig
   vy, subjektet centrerat, "no people, no text, no logos".
2. **B — resultatet:** `--image <A-filväg>` + prompt som börjar "Use the reference
   image as the exact same …" och slutar "Keep the … geometry, position and
   perspective IDENTICAL to the reference."
3. **C — närmare/detaljen:** `--image <B-filväg>`, makro på beviset (snittet,
   klämman, ådringen, kranen), samma ljus.

**Granska B mot A punkt för punkt INNAN klippen** (interiör-checklista 2026-08-11):
kran/blandare, väggar (inga NYA paneler), luckor/öppningar, fönsterbräda, golv.
Explicit förbud funkar: "keep EVERY object, fixture and surface IDENTICAL … NO
new panels … no cabinet or gap added or removed anywhere." Mathias fångade en
tillsmugen stänkpanel — kostade 104 extra credits.

### 4. Generera klippen (se modellblocket — mini standard, alltid utan ljud)

```
Klipp 1 "Förvandlingen" (hero): --start-image A --end-image B, duration 8, 720p, 16:9
  Prompt: "Cinematic time-lapse of [förvandling], locked-off camera, no camera
  movement… The first frame matches the start image exactly and the final frame
  matches the end image exactly."
Klipp 2 "Närmare" (bakgrund): --start-image B --end-image C, samma params
  Prompt: "Single continuous cinematic [dolly/steadicam]… no cuts."
```

`preset_recommendation`-notis → kör om med `declined_preset_id`. Ta `rawUrl`,
ladda ner OMEDELBART (hotlink-guardrailen nedan).

### 5. Bygg sidan

Kopiera moderna referensen (`web/public/cloud/glowingservice/index.html`) →
`web/public/cloud/[kund]/index.html` och byt:

1. Palett (egen, distinkt — se referenslistan), varumärke, titel, meta.
2. Video-url:er + posters (lokala `media/`-filer, beskrivande kebab-namn).
3. Copy per Steg 6. Galleri per Galleri-reglerna.
4. Kontakt: **verkliga uppgifter endast om verifierade** — annars platshållare
   (`070-123 45 67` / `info@[kund].se`) och SÄG det till Mathias. Instagram-rad
   med äkta handle om den finns. Hitta aldrig på något som ser äkta ut.
5. Stats: verifierade siffror (reg.år ur registret, kundens egna publicerade
   påståenden) eller löftesbaserade (0 kr offert, 24h svar, 1 kontaktperson,
   0 dolda avgifter). **Aldrig påhittad historik åt en riktig kund.** Rena
   historik-siffror (240+ projekt, 4,9★) endast för fiktiva varumärken.
6. **Fälla:** inline `<script>` får aldrig ha `defer` (ignoreras per spec), och
   biblioteksflaggor måste mätas EFTER att deferrade CDN-script körts.

### 6. Copy-regler (världsklass-copywriter, inte broschyr)

Formeln: **led med smärtan → svara med mekanismen → stäng med riskreversering.**

**Enkelhetsreglerna (2026-08-11, efter Solpanelstjejen + FloorMagic):**
- **Noll slutledning i heron.** Kräver budskapet två tankesteg är det fel budskap.
  Ratat: "Från marken ser allt rätt ut / Jag går upp och kollar" → ersatt med
  fakta: "Över 500 solcellstak besiktade. / Noll felfria."
- **Siffran slår bilden** — finns en verifierad siffra som bär smärtan, sätt den
  i heron. Ingen siffra? Led med kundens rädsla, rakt på.
- **Punchen 2–3 ord.** Aldrig metafor eller ordvits — **spegelfraser räknas som
  ordvits** ("Golvet gör rummet / Vi gör golvet" ratades; kiasmen är fyndig,
  inte tydlig).
- En idé per rad · korta meningar · du-tilltal · verb före adjektiv · ingen
  dubblett mellan hero och stats · tolvåringstestet: kan rubriken återberättas
  efter en högläsning?
- Hero-rubrik konkret på en sekund. Tagline = löften, inte adjektiv ("Fast pris
  innan start · Klart på utsatt dag"). 001 öppnar med KONKRET smärta, svarar med
  mekanism, stänger med riskreverserings-citat. Projektkort säljer UTFALL.
  Process-steg laddas med riskreversering. Om oss positionerar nischen rakt av.
  CTA: fråga + knapp + löften.
- Svenska, inga klyschor, kort/tungt/självsäkert. Aldrig "Växa på Google"-copy
  (endast www.bahkobyra.se, se CLAUDE.md). Personligt varumärke → jag-form.

### 7. QA före leverans

1. `node --check` på inline-scriptet (extrahera `<script>`-blocket → temp-fil).
2. Inga platshållar-URL:er kvar; båda `.mp4` + posters satta och lokala.
3. Sektionsfönster överlappar inte; overlay-/räknarfönster matchar tabellen.
4. Hero: indikator under taglinen, `autoplay muted loop playsinline` ×2,
   postern = videons frame 0.
5. `:active` på alla klickbara; ny transition UTÖKAR befintlig regel; hover gated.
6. Modal centrerad från `scale(.95)`; nudge in/ut samma bana; `cancelNudges` finns.
7. Mobil: ring-knapp i headern, 620vh, `overflow-x:clip`, `syncTouch:false`,
   frostad textbackdrop.
8. `prefers-reduced-motion` statiskt läge med rätt räknarvärden;
   `prefers-reduced-transparency` solida plattor.
9. Typgolv ≥11px; tracking storleksspecifik; entréer bara transform/opacity.
10. Statiska delen finns, nav-ankarna träffar, engångs-reveal på.
11. Galleri: 2 kolumner mobil, 16/11, före/efter först, thumbs ≤300 KB.
12. Klick: `tel:` i header/mobilnav/cta-sub/kontakt/footer; float = tel på mobil.
13. Nudge-CTA matchar nischen.
14. Designdetektorn körd — nya fynd utanför mallkategorin (Bahko-badge-kickern,
    28px-skuggbluren, em-dash-notisen) åtgärdas eller flaggas.
15. review-animations + web-design-guidelines om motion-/UI-kod ändrats
    (hoppa vid ren rebrand — notera i PR:en).
16. Leverans: worktree från `origin/main` (arbetskopian kan ligga efter!), commit,
    push, PR — **ingen merge utan Mathias**. Efter merge: verifiera kundlänken
    HTTP 200 (deployen tar ~1 min — 404 direkt efter merge är normalt, testa om)
    + kundsajterna oskadda. Skicka `bahkobyra.se/cloud/[kund]/`.

## Guardrails

- **Hotlinka ALDRIG Higgsfields CDN i leveranser** — assets raderas efter ~30
  dagar och sajten tappar allt tyst (incident 2026-08-04: tio sajter räddades
  med timmar tillgodo). Rutin: ladda ner vid bygget → weboptimera (bilder JPG
  max 1920px `-q:v 3`; video H.264 CRF 26 `-an -movflags +faststart` — `-an`
  även på Mathias egna klipp, loopar är alltid mutade) → `media/` med
  beskrivande kebab-namn → original till
  `testar/bahko-byra/BahkoByrå asset för hemsidor/[kund]/` → ingen `preconnect`
  mot cloudfront.
- **Konsistens före allt:** B ser inte ut som A → regenerera B med skarpare
  IDENTICAL-instruktion (+ interiör-checklistan i Steg 3).
- **Nischen verifierad före metaforval** (Steg 0) — och demo-recopy före ny
  generering (Steg 1).
- **Ingen fabricerad historik åt riktiga kunder** (Steg 5.5).
- Alltid `noindex, nofollow` + Bahko-modal (Cal.eu `bahkobyra/15min` + mailto
  mathias@bahkobyra.se). Aldrig i sitemap, ingen robots-Disallow (avslöjar sökvägen).
- Jag kan inte spela upp klippen — **Mathias ögongranskar förvandlingen** (samma
  subjekt hela vägen?) innan demon skickas till kund.
- 48h-löften i DM: bygget startar direkt, leverans väl inom löftet, platshållar-
  kontakt flaggas i både PR och DM-utkast.
