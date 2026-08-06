---
name: scroll-cinematic
description: Use when someone asks to build a bygg-demo, scroll-cinematic demosajt, 3D scroll website för byggföretag, hus-förvandlings-demo, or "demo enligt GRANIT-mallen". Builds a cinematic demo site where Higgsfield-generated loops of the same subject (old → transformed → walking in/closer) drive an Élara-style scroll choreography, followed by a real static site (om oss/process/galleri/kontakt).
argument-hint: [företagsnamn + nisch/ort, t.ex. "Tryggbyggservice badrum Stockholm"]
disable-model-invocation: true
---

# Scroll-Cinematic Bygg-Demo (GRANIT-mallen)

Bygger en kunddemo för bygg/anläggning/transport-nischer: **den videodrivna koreografin**
(fast videolager + sektioner på progress-fönster, se `bahkobyra/cloud/tryggbyggservice/index.html`
eller `bahkobyra/cloud/vajjebygg/index.html`) med
**Higgsfield-genererade videoloopar (gif-känsla)** som visar en förvandling i kundens
egen nisch: gammalt/trasigt/skräpigt → åtgärdat/förvandlat (hero-loopen) → kameran rör
sig närmare/in i resultatet (bakgrundsloopen). Följt av en **riktig hemsida-del**
(om oss / så går det till / galleri / kontakt) så sidan känns komplett, inte bara en
snygg trailer.

**Facit / godkänd slutversion: `bahkobyra/cloud/bygg/index.html`** — kopiera den till
`bahkobyra/cloud/[kund]/index.html` och byt varumärke (namn, palett om kunden har egen,
copy, klipp, kontaktuppgifter).

**OBS varumärke (rebrand 2026-08-05):** facit `cloud/bygg/index.html` är **FRYST som
historisk referens i GAMLA Bahko-varumärket** (guld/cream/Cormorant) — uppdatera den aldrig.
Mekaniken/koreografin i facit gäller fortfarande och kopieras som förut. Framtida demos byggs
i **kundens egen stil** precis som tidigare, MEN alla **Bahko-brandade element** (logga,
footer-badge "Byggd av Bahko Byrå", Bahko-modalen) ska använda **nya varumärket från
`bahkobyra/brand/brand.json` (v2)**: smaragdgrön mark med vitt B, Outfit, knappar = smaragd
med marinblå text (aldrig vit på smaragd).

**OBS delade filer:** `bahkobyra/css/style.css` och `bahkobyra/js/main.js` är **FRYSTA**
(delas med frysta `cloud/bygg` — Bahkos egna sidor kör `style-v2.css`/`main-v2.js`). Nya
byggen får ALDRIG länka de frysta filerna — varje demo ska ha sina egna kopior av all
CSS/JS, som demosajterna redan har (self-contained `index.html` + egen media-mapp).

**OBS: Kostar Higgsfield-credits (~46/demo med seedance_2_0_mini om inget kan återanvändas). Kör aldrig utan
explicit beställning.**

## Vem gör vad (håll kostnad och kvalitet i balans)

| Arbete | Vem | Varför |
|---|---|---|
| Nisch-anpassad metafor, art direction, copy, sektionsinnehåll, slutlig QA-bedömning | **Du (Claude)**, aldrig delegerat | Det är här smaken och varumärkeskänslan avgörs |
| Verifiering av kundens faktiska bransch (Steg 0), bild-/videoåteranvändning (Steg 1) | Du, med research-verktyg (WebSearch/WebFetch/vidIQ) | Måste vara sant för en RIKTIG kund — gissa aldrig nischen |
| Flera parallella projektkorts-bilder, keyframe-generering | Du, men skjut iväg oberoende `generate_image`-anrop i samma meddelande | Oberoende bilder — ingen anledning att göra dem i serie |
| `node --check`, git-kommandon, `job_display`-polling | Ren mekanik, inget resonemang krävs | Billigt, deterministiskt, gör det varje gång |

## Strukturen (fast — ändra inte)

| Del | Innehåll |
|-----|----------|
| Loader | Varumärke + amber progressbar (simulerad, snabb ~0,6s) |
| Header | Fixed: logo + nav-länkar (till riktiga ankare) + telefonnummer + CTA-knapp · hamburger + helskärms-mobilnav < 768px |
| Hero (100svh) | **Förvandlingsloopen (klipp 1) autoplay bakom** ordvis staggad rubrik (`.word`, shimmer-accent, rörelse ~26px), tagline, scroll-indikator. `hero-content` har `padding-bottom:clamp(5rem,12vh,8rem)` så indikatorn ALDRIG krockar med taglinen |
| Fast videolager | **Bakgrundsloopen (klipp 2) fixed bakom alla sektioner**, nedtonad (`brightness(.62)` + vinjett). **Circle-wipe:n är knuten till HERO-utscrollningen** (`trigger:hero, start:'top top', end:'bottom top'`, radie `min(1,p*1.35)*75%`) — fullt avtäckt exakt när heron lämnat = inget svart gap |
| Scroll-container | **520vh desktop / 620vh mobil** (mobil behöver MER, inte mindre — se Tempo-lagar). Absolut positionerade sektioner på progress-fönster, VARIERADE entréer — aldrig samma två gånger i rad |
| Sektionsfönster | 001 Filosofi `3–24` slide-left · 002 Projektgrid (3 kort) `28–45` stagger-up · 003 Tjänstelista `49–63` slide-right · 004 Stats + räknare `67–80` stagger-up · CTA `84–100` scale-up + `data-persist="true"` |
| Övrigt | Dark overlay-fönster `0.27–0.46` (max .5) och `0.66–0.81` (max .55) · räknare triggas `0.67–0.80`, nollas < `0.63` · flytande offert-knapp efter 60 % viewport · footer med kontaktuppgifter · Bahko-modal (Cal.eu `bahkobyra/15min`) · `noindex, nofollow` |
| **Bokningspopup (nudge)** | `#nudge-popup` — liten dismissbar kort-popup (inte samma som Bahko-modalen) som puffar mot bokning/tjänster. Visas **3 gånger totalt**, tidsstyrt från sidladdning: **1:a efter 10s, 2:a 90s senare, 3:e ytterligare 60s senare** (dvs. absolut t≈10s / 100s / 160s). Auto-döljs efter 8s om ingen interagerar. Avbryts helt (`cancelNudges()`) om besökaren redan öppnat Bahko-modalen — nagga inte någon som redan är på väg att boka. CTA öppnar samma modal som `#float-offert`. |
| **Riktig hemsida-del** (efter scroll-containern) | `.static-site` med fyra sektioner: **Om oss** (bild + brödtext + punktlista tjänster), **Så går det till** (4 steg, `.steps-grid`), **Galleri** (3 bilder, `.gallery-grid` — återanvänd projektkortsbilderna), **Kontakt** (stort klickbart telefonnummer, e-post, område, offert-kort). Nav-länkarna i header/mobilnav pekar på `#om-oss` `#process` `#kontakt`. **Detta är inte valfritt** — utan den känns sidan som en trailer, inte en hemsida (bekräftat av kundfeedback) |

**Medvetet BORTTAGET (beslut 2026-06-11 — lägg inte tillbaka):** marquee-jättetext och
före/efter-slider — de krockade visuellt med videolagret. Säljlöftena bor i hero-tagline + cta-sub.

**Videopresentation: autoplay-loopar (gif-känsla), INTE scroll-scrub.** `<video autoplay muted loop
playsinline preload="auto" poster="<keyframe>">`. Gest-säkring: vid första `touchstart/pointerdown`
→ `play()` på pausade videos, men **guarda med `if(reduce)return`** (annars startar videon ändå för
reduced-motion-användare vid första tryck). `prefers-reduced-motion`: pausa videos, dölj loader/bgvid,
gör sektionerna statiska (`#scroll-container{height:auto}`, `.scroll-section{position:static;opacity:1}`),
och sätt räknarna direkt till sina slutvärden i `goStatic()` (annars visar fallback-läget "0%" istället
för rätt siffra).

### Tempo-lagar (hårt lärda — bryt inte utan starkt skäl)

Tidigare version av den här skillen körde 700vh/500vh med långsam Lenis och `syncTouch:true` —
kundfeedback var samstämmig: "för mycket film och action", suddig text, och på mobil **rusade**
sidan okontrollerat vid varje svep. Rotorsaken satt i tre ställen samtidigt:

1. **`syncTouch:true` + `touchMultiplier:1.5` i Lenis** gjorde att varje mobilsvep for iväg 1,5× för
   långt. Fixen: `syncTouch:false` — mobilen scrollar helt nativt (mjukt, förutsägbart), Lenis mjukar
   bara mushjulet på desktop.
2. **Baklänges-animation vid utscroll** (`tl.reverse()`) gjorde att text både gled OCH tonade samtidigt
   när en sektion lämnade vyn = suddig känsla. Fixen: ingen reverse — sektioner tonar bara ut via
   opacity, ingen rörelse ut.
3. **För smala sektionsfönster + kort animationsduration** gav ingen lästid. Fixen: bredare fönster
   (`fadeRange:0.045` i stället för `0.03`) och kortare men *mjukare* entré-animationer (`power2.out`,
   22–32px rörelse i stället för 50–80px).

Konkreta värden att använda (redan i facit — kopiera, hitta inte på nya):
- Loader: `simulateLoad` med `+=Math.random()*24+16` var `35+Math.random()*45`ms, paus `180`ms innan hero-entré.
- Hero-entré: `animateHero()`-timeline på ~0,7s totalt (ord-stagger `.08`, duration `.55`, power2.out).
- Sektionsentré: `stagger:.06-.07`, `duration:.45-.5`, `power2.out`, rörelse 22–32px (se switch-caset i facit).
- Räknare: `duration:1.1`, trösklar `p>=0.67&&p<=0.80` (nollas `<0.63`).
- Mobil scroll-längd **högre** än desktop (620vh mot 520vh) — mer scrollsträcka per sektion på mobil, inte mindre.
- `html,body{overflow-x:hidden;overflow-x:clip}` + `touch-action:pan-y pinch-zoom` på body — annars kan
  hero-videon göra sidan scrollbar i sidled på mobil.

## Steg

### 0. Verifiera kundens faktiska nisch (OBLIGATORISKT för riktiga kunder)

Gissa ALDRIG bransch från namnet. Kolla Instagram/hemsida om det går (WebFetch/vidIQ); om
sandboxens nätverkspolicy blockerar det (vanligt för externa domäner), sök upp bolaget via
bolagsregister (allabolag.se, ratsit.se, eniro.se — WebSearch hittar dessa) och läs
SNI-kod + verksamhetsbeskrivning. Anpassa hela metaforen efter vad de FAKTISKT gör — inte
bara husrenovering-mallen rakt av:

- Bygg/renovering → gammalt hus → drömhus (GRANIT-mallen, originalmetaforen).
- Mark/anläggning/schakt → sönderkörd/vattensjuk tomt → färdig infart/dränerad gräsmatta.
- Rörinstallation/relining → korroderat rör → nyrelinat rör → kameran glider ut i rent badrum.
- Kranbil/transport → skräpig/blockerad tomt → uppstädad med kranbil som lyfter en last.

Om nischen inte går att verifiera alls (inga träffar någonstans): säg det explicit till
användaren och fråga, gissa inte tyst och bygg fel metafor.

### 1. Kolla återanvändning FÖRE ny generering (spar credits)

Innan du genererar en enda ny bild eller video, kolla om vi redan har något användbart:

```
show_generations(type:'image', size:100) → skanna prompts/resultat för nischmatch
show_generations(type:'video', size:100) → samma, för klipp
```

Vad går att återanvända:
- **Generiska stödbilder** (projektkort, galleri-fyllnad, "om oss"-bild) — helt fria
  från text/logotyper per våra egna guardrails, så de går att återanvända tvärs över kunder
  i SAMMA nisch utan problem. Kolla alltid facit och tidigare kunders demos i samma nisch
  först (t.ex. `cloud/osterlunds/`, `cloud/kmctransport/` för mark/transport) innan du
  genererar nya.
- **Hela keyframe-kedjor/klipp** — endast om en TIDIGARE kund har EXAKT samma nisch och du
  bygger en ny demo i den nischen (sällsynt, men händer). Återanvänd hela A/B/C-kedjan +
  båda klippen direkt (0 credits) i stället för att regenerera.

Vad INTE går att återanvända: **den bespoke keyframe-kedjan för DEN HÄR specifika kunden**
(A/B/C måste referera varandra för att hänga ihop visuellt — du kan inte splitta en ny
kunds hero-klipp mot en gammal kunds slutbild). Generera alltid en ny kedja när nischen
eller det visuella konceptet skiljer sig från vad som redan finns.

Hittar du inget användbart → gå vidare till Steg 2 och generera nytt.

### 2. Budget-preflight (OBLIGATORISKT före all ny generering)

```
balance → kräver ~50 credits fritt. Under 80: fråga användaren innan du kör.
generate_video med get_cost:true → verifiera klippkostnad (8s 720p seedance_2_0_mini ≈ 20 credits/klipp)
```

Budget per demo (om inget återanvänds): 3 bilder (nano_banana_pro, ~2 credits/st) + 2
videoklipp à 8s 720p seedance_2_0_mini (~20/st) ≈ **46 credits**. Generera ALDRIG ett tredje
"etablerings-klipp" — hero-loopen börjar ändå på det ursprungliga läget.

### 3. Generera keyframes (nano_banana_pro, 16:9)

Konsistensen bygger på referenskedjan — generera i exakt denna ordning:

1. **Keyframe A — utgångsläget:** fotorealistiskt, anpassat till kundens nisch (se Steg 0):
   svensk villa i förfall, sönderkörd tomt, korroderat rör, skräpig infart osv. Front
   trekvartsvy i ögonhöjd, subjektet centrerat med luft runtom, "no people, no text, no logos".
2. **Keyframe B — resultatet:** `medias:[{value:<jobb-id A>, role:'image'}]` + prompt som börjar
   "Use the reference image as the exact same [hus/tomt/rör/infart], same camera angle, same
   composition — but [renoverat/uppstädat/relinat/åtgärdat]…" och slutar "Keep the [subjekt]
   geometry, position and perspective IDENTICAL to the reference."
3. **Keyframe C — närmare/in i resultatet:** `medias:[{value:<jobb-id B>, role:'image'}]`, en
   detalj- eller inifrån-vy av samma scen (interiör, kranlyft i närbild, ren infart från
   markhöjd), samma ljussättning, exteriörens palett ekad i detaljer.

### 4. Generera klippen (seedance_2_0_mini — ALLTID mini, ALLTID utan ljud)

**Fast regel, alltid (2026-07-19):** använd `seedance_2_0_mini` med `generate_audio:false`
för BÅDA klippen, i varje demo, oavsett kreditläge — inte bara när saldot är lågt. 20
credits/klipp i stället för 72 för stora seedance_2_0, och demovideorna spelas ändå alltid
muted (autoplay-loopar har aldrig ljud på i denna mall). Mini stödjer start_image + end_image
men max 720p — det räcker gott som bakgrundsvideo bakom text. Uppgradera till seedance_2_0
(std-läge, 1080p) ENDAST om kunden uttryckligen klagar på videokvaliteten på en levererad demo
— gissa aldrig i förväg att en kund behöver högre upplösning.

```
Klipp 1 "Förvandlingen" (hero-loopen): duration 8, aspect_ratio 16:9, resolution 720p, generate_audio false
  medias: [{value:A, role:'start_image'}, {value:B, role:'end_image'}]
  Prompt: "Cinematic time-lapse of [nischanpassad förvandling], locked-off camera, no camera movement…
  The first frame matches the start image exactly and the final frame matches the end image exactly."

Klipp 2 "Steget in/närmare" (bakgrundsloopen): samma params
  medias: [{value:B, role:'start_image'}, {value:C, role:'end_image'}]
  Prompt: "Single continuous cinematic steadicam shot, smooth slow dolly forward… [nischanpassad
  rörelse mot detaljen] … no cuts."
```

- Får du en `preset_recommendation`-notis: kör om bokstavligt med `declined_preset_id` — vi vill ha exakt våra keyframes.
- Polla med `job_display` tills `status: completed`; ta `results.rawUrl` (cloudfront-MP4).
- Hotlinka rawUrl:erna i `<video src>` + keyframe-PNG:erna som `poster` (omedelbar första målning).
- **~15% av Higgsfield-jobb failar server-side utan anledning och debiteras inte** — kör bara om.

### 5. Bygg sidan

Kopiera `bahkobyra/cloud/bygg/index.html` → `bahkobyra/cloud/[kund]/index.html` och byt:
1. Varumärke: titel, meta description, loader-brand, header-logo, footer, palett-variabler
   om kunden har egen profil.
2. Video-url:er + posters (klipp 1 i heron, klipp 2 i `.bgvid-wrap`). Använd platshållare
   `__HERO_MP4__` / `__BG_MP4__` om klippen inte är klara än — men committa aldrig en
   platshållare till huvudgrenen.
3. Copy per sektion (se copy-regler nedan). Projektkortens bilder OCH galleri-bilderna i
   den statiska delen: samma tre bilder, återanvänd (se Steg 1) eller generera 3 st i
   kundens nisch (nano_banana_pro, ~2 credits/st) om inget passar.
4. **Den statiska delen (om oss/process/galleri/kontakt):** skriv om per kund, men
   telefonnummer/e-post är ALLTID platshållare (`070-123 45 67` / `info@[kund].se`) tills
   kunden gett riktiga uppgifter — hitta aldrig på ett nummer som ser äkta ut.
5. Stats: anpassa till kundens verkliga siffror om kända — **hitta aldrig på verifierbara
   påståenden åt en RIKTIG kund** (antal projekt, betyg, grundår, kundnamn). Använd
   löftesbaserade stats i stället ("100% fast pris", "svar inom 24h", "1 kontaktperson",
   "0 kr dolda avgifter") — de är sanna oavsett hur ny eller liten firman är. Rena
   historik-siffror (240+ projekt, 4,9★) är bara OK för fiktiva varumärken som GRANIT.

**Scroll-scrub (ENDAST om kunden uttryckligen ber om det):** `video.currentTime`-scrub kräver
(1) gest-upplåsning `play().then(pause)` vid första gest, (2) seek-kö — aldrig ny `currentTime` innan
`'seeked'`, pumpa mot senaste målet, (3) buffert-uppvärmning `start:'top 150%'`. Lokalt med ffmpeg:
canvas-frames enligt video-to-website-skillen. Historik i git: commit "Videoscrub som faktiskt rör sig…".

### 6. Copy-regler (skriv som en världsklass-copywriter, inte en broschyr)

Copy ska göra företaget till det självklara valet genom att träffa köparens tysta rädslor,
inte genom adjektiv. Formeln: **led med smärtan → svara med mekanismen → stäng med
riskreversering.**

- **Hero-rubrik:** 2 rader, ordvis animerad, accentordet i grad-text. Konkret och begriplig
  på en sekund — INTE poetisk/kryptisk. ("Det ingen ser bär allt du ser" var för svårt;
  "Marken avgör. Vi gör den rätt." fungerade.) Testa: skulle en trött kund fatta budskapet
  vid första ögonkastet?
- **Tagline = löften, inte adjektiv:** "Fast pris innan start · Klart på utsatt dag · Varje
  lager dokumenterat" — konkreta åtaganden kunden kan hålla dig till, inte "professionell
  kvalitet" eller liknande luft.
- **001 Filosofi:** öppna med en KONKRET smärta (sprickor i grunden, vatten i källaren, en
  infart som sjunker efter två vintrar — inte "vi bygger med kvalitet"), svara med
  mekanismen (rätt lager, fotodokumentation, fast pris), avsluta med ett citat som är en
  riskreversering ("Du ska aldrig behöva gräva upp det vi har gjort.").
- **Projektkort:** sälj UTFALL, inte moment. "Ligger still vinter efter vinter" slår
  "grusade kanter". "Torr källare i decennier" slår "ny dränering".
- **Process/steg:** ladda varje steg med riskreversering ("vi säger ärligt vad som INTE
  behövs", "det priset står sig", "svar av den som faktiskt gör jobbet").
- **Om oss:** positionera nischen rakt av ("Vi gör marken — och bara marken."), inte en
  generisk beskrivning av vad företaget "erbjuder".
- **CTA:** fråga som öppnar ("Vad behöver flyttas idag?") + "Begär kostnadsfri offert" +
  cta-sub med löftena.
- Allt på svenska, inga klyschor, GRANIT-tonen: kort, tungt, självsäkert. Aldrig "Växa på
  Google"-copy (det budskapet hör bara hemma på www.bahkobyra.se, se CLAUDE.md).

### 7. QA före leverans

1. `node --check` på inline-scriptet (extrahera `<script>`-blocket med regex, kör mot temp-fil).
2. Inga `__PLACEHOLDER__`/`__HERO_MP4__`/`__BG_MP4__` kvar; båda `.mp4`-url:erna + posters satta.
3. Sektionsfönster överlappar inte; dark overlay-/räknarfönster matchar sektionernas (se tabellen ovan).
4. Hero: indikatorn under taglinen (padding-bottom finns), `autoplay muted loop playsinline` på båda videos.
5. Mobil: hamburger funkar, textsektioner får frostad backdrop, 620vh-container, `overflow-x:clip` +
   `touch-action:pan-y` finns (ingen sidled-scroll), Lenis har `syncTouch:false`.
6. `prefers-reduced-motion`: sidan statisk, videos pausade, räknarna visar RÄTT slutvärde (inte "0").
7. Den statiska delen finns och nav-länkarna faktiskt scrollar dit (`#om-oss`, `#process`, `#kontakt`).
8. `#nudge-popup` finns, `dismissNudge`/`cancelNudges` definierade, CTA-texten matchar kundens nisch
   (inte "platsbesök" rakt av för en kund utan platsbesök — t.ex. "boka bord"/"beställ" för restaurang).
9. Committa, pusha, PR → main (Vercel deployar `bahkobyra/`). Skicka demolänken: `bahkobyra.se/cloud/[kund]/`.

## Guardrails

- **Credits:** kolla alltid återanvändning (Steg 1) INNAN `balance`/`get_cost`-preflight. Under
  200 credits kvar efter reuse-check → fråga användaren innan du genererar nytt. Max 1 retry per klipp.
- **Hotlinka ALDRIG Higgsfields CDN i det som levereras.** Higgsfield raderar assets efter ~30 dagar,
  och en hotlänkad sajt tappar då alla bilder och videor tyst — inga fel, bara tomma ytor.
  *Lärdom 2026-08-04: alla tio dåvarande sajter hotlänkade, inklusive två betalande kunders,
  och 10 assets fick räddas timmar innan de kunde försvinna.* Rutinen är:
  1. Ladda ner varje genererad fil direkt vid bygget (`curl` mot `results.rawUrl`).
  2. Weboptimera: bilder → JPG max 1920 px (`ffmpeg -vf "scale='min(1920,iw)':-2" -q:v 3`),
     videor → H.264 CRF 26 utan ljudspår (`-an -movflags +faststart`, autoplay-bakgrunder är alltid mutade).
  3. Lägg i `bahkobyra/cloud/[kund]/media/` med **beskrivande kebab-namn** (`fore-villa-flagnande-farg.jpg`,
     `video-efter-nybyggt-hus.mp4`) — aldrig hf_-hashen. Committa med sajten.
  4. Spara originalen i arkivet `testar/bahko-byra/BahkoByrå asset för hemsidor/[kund]/`.
  5. Ingen `preconnect` mot cloudfront i HTML:en.
  (Cloud-sandboxen kan inte ladda ner från CDN:et och saknar ffmpeg — bygg där får hotlänka
  TILLFÄLLIGT, men flagga det i PR:en som blockerande, och nedladdningen görs lokalt innan demon
  skickas till kund.)
- **Konsistens före allt:** om keyframe B inte ser ut som SAMMA subjekt som A — generera om B med skarpare
  "IDENTICAL"-instruktion i stället för att acceptera ett annat subjekt. Det är hela konceptet.
- **Nischen måste vara verifierad** (Steg 0) innan metaforen väljs — gissa aldrig "bygg" bara för
  att en demo brukar handla om hus.
- **Ingen fabricerad historik åt riktiga kunder** — se Steg 5 punkt 5.
- Demon ska alltid ha `noindex, nofollow` och Bahko-modalen (Cal.eu `bahkobyra/15min` + mailto till mathias@bahkobyra.se).
- Jag kan inte spela upp klippen från sandboxen — be alltid användaren ögongranska förvandlingen
  (samma subjekt?) och loopkänslan innan demon skickas till kund.
