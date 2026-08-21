---
name: hemsidor
description: Bygger kundhemsidor och demoförslag för Bahko Byrå på bahkomallen (SV Hus) — server-renderad Next.js-route med noll egen klient-JS. Enda spåret sedan 2026-08-21; ersätter scroll-cinematic (statiska GRANIT-demos) och demo-recopy (återbruk), som nu är lägen i den här skillen. Trigger på "bygg hemsidan för [kund]", "kunddemo", "demo enligt bahkomallen", "demo som SV Hus", "hemsida i Next.js", "nytt förslag till [lead]", "återanvänd demon", "byt copy på demon", "ny lead samma nisch", "gör om demon", "modda demon till". INTE för bahkobyra.se själv (marknadssajten bor i (sajt)/), inte för reels (bahko-reel) och inte för enstaka bild eller video (higgsfield-generate).
argument-hint: [företag + nisch/ort, t.ex. "Nordic Snickare snickeri Stockholm"]
disable-model-invocation: true
---

# Hemsidor — kunddemo på bahkomallen

En väg, inga alternativ: **server-renderad Next.js-route med noll egen
klient-JS**. Modal, meny, popup och dragspel körs på `:target`, `<details>`
och checkbox-mönstret. Inget script kan krascha, för det finns inget script.

**Referens — KOPIERA DENNA:** `web/app/(demo)/nordicsnickare/` (`page.js` +
`nordicsnickare.module.css`). Mall-kanon 2026-08-21. Den har allt det nya:
fullskärmsvideo med drönarshot, EN hero-rubrik, linjeritningar i tjänstekorten,
klickbara steg utan JavaScript, och orienteringsväxling med två video-element.

`web/app/(demo)/svhus/` är den **äldre** förlagan (mall-kanon 2026-08-18) och
saknar allt ovan — kopiera den inte längre. Den och `shabifix/` har dessutom
kvar två brister som rättats i nordicsnickare: sex CSS-regler under typgolvet
11 px, och versalrader över 35 tecken.

Skillen har **tre lägen som bara skiljer sig i mediakostnad** — strukturen,
copy-reglerna och QA:n är identiska:

| Läge | När | Credits |
|---|---|---|
| **Återbruk** | Leadet har redan en demo, eller en demo i samma nisch finns | 0 |
| **Lån** | Nischen finns i biblioteket men inte leadet | 0 |
| **Nybygge** | Ingen bild i nischen finns | ~50 — **under 100 körs, över 100 frågas** (CLAUDE.md) |

## Vad som INTE längre byggs

Den gamla scroll-koreografin (fast videolager, cirkel-wipe, 520vh/620vh,
GSAP, Lenis, progress-fönster) är **avskaffad 2026-08-21**. Den gav
återkommande klagomål: för mycket film, suddig text, mobilen rusade.
Förvandlingen lever kvar där den hör hemma — som hero-video och som
före/efter-par. Bygg aldrig nya demos under `web/public/cloud/`.

## Arkitektur

- Routen läggs som `web/app/(demo)/<kund>/page.js` + `<kund>.module.css`.
  Route-gruppen `(demo)/` har egen rot-layout utan Bahkos header och footer.
  Marknadssajten bor i `(sajt)/`. URL blir `bahkobyra.se/<kund>/`.
- **Lägg ALDRIG routen under `/cloud/`.** Catch-all-rewriten i heliga
  `next.config.mjs` (`/cloud/:path*` → `index.html`) vinner över app-routen
  och ger 404. Dokumenterad incident 2026-08-18.
- Media i `web/public/<kund>/media/`. Bilder genom `next/image` med
  `width`/`height` (ger WebP/AVIF och responsivt gratis). Video som ren
  `<video>`.
- **Transkodning:** `ffmpeg` finns på Mathias maskin men **inte i
  container-sessioner**. Kontrollera med `command -v ffmpeg` innan du planerar
  in ett videosteg; saknas det, leverera filen som den är.
- Fonter via `next/font`. Kursiv display-vikt i EGEN instans med
  `preload: false` — den används i enstaka rubrikord och ska inte belasta
  första renderingen.
- Mörk canvas: `html:has(.sida), body:has(.sida) { margin:0; background:… }`
  plus ett fixed `::before`-lager som hängslen där `:has` saknas.
  `scroll-padding-top` = headerhöjd + marginal, annars landar ankarhopp under
  den klistrade headern.

## Sanningsregeln — avgör om förslaget går att skicka

Ta den här först, för det är den som stoppar leveranser.

- **Skriv ett VERIFIERAT-block** i sidfilens toppkommentar: allt som får
  påstås, och en rad om vad som INTE är verifierat (ledtider, antal,
  garantier, policyer, priser). Allt utanför blocket är förbjudet — även
  "harmlösa" detaljer som "elva yrkesgrupper".
- **Aldrig fabricerad historik åt en riktig kund.** Har firman inga
  publicerade siffror blir statsraden löftesbaserad: 0 kr för första steget,
  svar inom 24 h, fast pris, en kontaktperson. Registrets registreringsår är
  den enda historiksiffra som får användas, och bara om den är verifierad.
- **Varje bild i `media/` ska användas exakt en gång.** Samma bild på två
  ställen läser som att materialet är tunt; en oanvänd fil är betald och
  bortglömd. Räkna förekomsterna i ett skript före leverans, och städa bort det
  som hörde till en tidigare arkitektur (bakgrundsloopar, gamla postrar).
- **Lånade och genererade bilder märks — en gång per sida, inte per bild.**
  En egen rad under före/efter-paret: "Illustrationsbilder — byts mot era egna
  projektfoton." Bildtext på varje enskild bild ratades 2026-08-21: fyra
  upprepningar av samma brasklapp drar blicken från arbetet och får sidan att
  se osäker ut. Ärligheten kräver att det står, inte att det står överallt.
  Ingen sektion får heta Våra projekt eller Referenser.
- **Kontaktuppgifter:** bara verifierade. Annars platshållaren
  `070-123 45 67` och formulär-mailto till `mathias@bahkobyra.se` — aldrig en
  gissad kundadress. **Flagga platshållarna i både PR och leverans.**
- Firmanamnet räknas som en uppgift. Är det läst ur ett Instagram-handle, säg
  det och be Mathias bekräfta stavningen.

## Steg 1 — Verifiera nischen (obligatoriskt)

Gissa **aldrig** bransch från firmanamnet. Verifierade fällor: ett IG-namn
krockade med ett orelaterat USA-bolag; ett register spretade åt tre håll och
krävde Mathias blick på kundens Instagram.

Ordning: kundens hemsida → Instagram → bolagsregister (allabolag/merinfo via
WebSearch, `r.jina.ai`-proxy när sidan blockerar). Instagram är oftast
inloggningsspärrad — **profilnamnet i en DM-tråd Mathias klistrar in räknas som
verifiering**, det är firmans egen självbeskrivning.

Går nischen inte att verifiera: säg det och fråga. Bygg aldrig på tyst
gissning. Vid mismatch mellan media och nisch (kranlyft säljer inte måleri):
stanna och flagga.

## Steg 2 — Media

**Trappan, i kostnadsordning. Gå aldrig vidare utan att ha uttömt steget före.**

1. **Leadets egen demo** (vid "gör om demon"): flytta mappen till
   `web/public/<kund>/media/`.
2. **Lån ur biblioteket:** `ls web/public/cloud/*/media/`. Rikast är
   `cloud/bygg/media/` (före/efter-hus, villa, badrum, skiffertak), plus
   `nordiapartner`, `ekstromsbygg`, `galiano`, `alfredallservice`.
3. **Ny generering** — kostar credits. Kostnadsregeln bor i CLAUDE.md och gäller
   före den här skillen: **under 100 credits körs, över 100 frågas.**
   Formuleringen "aldrig utan beställning" gäller inte längre.

**Kontrollera alltid lånade filer med `md5sum`.** Samma bild ligger under olika
namn i olika demos: `galleri-platsbyggt-snickeri.jpg` (galiano) och
`mattbestalld-frast-spegel-bjorkplywood.jpg` (tryggbyggservice) är identiska.
Två "olika" lånade bilder blev samma spegel i ett galleri 2026-08-21. Kör
`md5sum` på hela mediamappen och jämför antalet unika hashar mot antalet filer
innan du skriver bildtexter.

### Generering

Kostnadskolla varje modell före körning — priser ändras, hårdkoda dem inte här.
Under 100 credits körs utan att fråga; över 100 frågas (CLAUDE.md).
Bilder: `nano_banana_2` eller `seedream_v5_pro`. Video: `seedance_2_5`
(mall-standard för Next.js-spåret, Mathias 2026-08-18), `--mode omni_reference`
för start- och slutbild.

**Förvandlingen är kedjan A → B → C**, i den ordningen, för konsistensen ÄR
konceptet:

- **A — utgångsläget.** Fotorealistiskt, subjektet centrerat, naturlig vy.
  Alltid `"documentary contractor photography, natural muted colors, no HDR"`
  — blank AI-finish har ratats. Alltid `"no people, no text, no logos"`.
- **B — resultatet.** `--image <A>`, prompten börjar "Use the reference image
  as the exact same …" och slutar "Keep the … geometry, position and
  perspective IDENTICAL to the reference." Räkna upp varje objekt som ska vara
  kvar: "no new panels, nothing added or removed anywhere else".
- **C — beviset.** `--image <B>`, makro på detaljen som visar hantverket
  (fogen, snittet, ådringen, klämman).

**Granska B mot A punkt för punkt innan något klipp genereras.** Interiör:
blandare, väggar, luckor, fönsterbräda, golv. Exteriör: takpannornas profil
(**materialprofil räknas som geometri**), panelantal, skorsten, hängrännor,
bakgrundshus. En insmugen stänkpanel kostade 104 credits.

Metaforer per nisch: bygg → förfallet hus → drömhus · mark → sönderkörd tomt →
färdig infart · rör → korroderat rör → rent badrum · fasadtvätt → påväxt → ren
fasad · interiör (måleri, golv, städ, snickeri) → slitet rum → nyklart, makro på
detaljen · tjänst utan synlig förvandling → **förvandlingen är avståndet**:
helhet → närmare → detaljen experten ser.

**Förvandlingsklippet ska se ut som ARBETE, aldrig som en crossfade.** Global
uttoning läses som AI-morf och har ratats. Låt en fysisk process röra sig över
subjektet — högtrycksstrålen rad för rad, stommarna som reses sektion för
sektion. Prompta explicit `"NO glowing lines, NO light effects, no lens flares,
no crossfade, no morphing"`: första svepförsöket blev en sci-fi-glödlinje och
kastades.

**Diagnostisera klippet med bildrutor före leverans** — `generate get` visar
inte morf eller geometridrift:

```sh
ffmpeg -i klipp.mp4 -vf "select='eq(n\,0)+eq(n\,48)+eq(n\,96)+eq(n\,144)',scale=1100:-2,tile=1x4" -frames:v 1 check.jpg
```

Skriv kommandot till en fil och kör filen — backslasharna i `select` kollapsar
annars i skalet. **Granska bilden**, lita inte på att jobbet gick igenom.

**Hämta ner allt omedelbart.** Hotlinka aldrig Higgsfields CDN: assets raderas
efter ~30 dagar och sajten tappar dem tyst. Weboptimera (bilder JPG max 1920 px
`-q:v 3`; video H.264 CRF 26 `-an -movflags +faststart` — loopar är alltid
mutade) och lägg i `web/public/<kund>/media/` med beskrivande kebab-namn.

### Stående mobil

Heron är fullskärmsvideo, så detta gäller **alltid**: ett 16:9-klipp med
`object-fit: cover` beskärs ~4× på en telefon och visar en oanvändbar närbild.
Fixa **utan ny generering** genom att rama om samma klipp till 9:16 med suddig
utfyllnad:

```sh
ffmpeg -i hero.mp4 -filter_complex "\
[0:v]scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,boxblur=44:3,eq=brightness=-0.34:saturation=0.55[bg];\
[0:v]scale=720:-2[fg];[bg][fg]overlay=(W-w)/2:0[ut]" \
-map "[ut]" -c:v libx264 -crf 26 -an -movflags +faststart hero-mobil.mp4
```

Skala **förgrunden till 1,5× ramens bredd och kapa i sidorna** (`scale=1080:-2,
crop=720:608`): då täcker bildremsan 47 % av höjden i stället för 32 %. Med hela
bilden inlagd blev remsan en tredjedel av skärmen och resten ett tomt fält.
Motivet måste vara centrerat för att croppen bara ska ta väggarna.

Låt hero-gradienten mörkna **genom remsans underkant** (en egen gradient i
mobil-media-queryn), annars läses övergången mot utfyllnaden som en linje.
Utfyllnaden ska vara dämpad, inte svart: `brightness=-0.17`, inte `-0.34`.
**Postern måste vara den nya filens bildruta 0** — ta den ur den färdiga filen,
inte ur källbilden.

## Steg 3 — Copyn

**Bärande idé först.** Innan en rubrik skrivs: formulera EN mening som är (a)
sann för kunden, (b) särskiljande i nischen och (c) samma sak som bilden visar.
Exempel som burit hela sidor: *"Det billigaste taket är det du redan har."* ·
*"Ingen färdigköpt garderob passar ett snedtak."* Hela sidan argumenterar sedan
för den meningen. En sida som följer varje formregel men saknar idé blir en
staccato-formel — det har ratats med "hela copyn är värdelös" samma dag som
alla formregler var uppfyllda.

Formeln **smärta → mekanism → riskreversering** är verktyget som bär idén,
aldrig tvärtom.

- **Ärlighet som positionering.** Den starkaste riskreverseringen är att avstå
  försäljning: *"Räcker det med en tvätt säger vi det. Även när ett byte hade
  gett oss mer betalt."* Minst en sådan mening per demo.
- **EN handling per sida.** Samma verb och objekt i header, mobilmeny, popup,
  CTA-sektion och kontaktkort. Aldrig synonymvariation (Begär offert /
  Kontakta oss / Läs mer). Välj nischens lägsta åtagande: mätning < takkoll <
  offert < köp. Mobilens flytknapp får vara `tel:` — hantverkskunder ringer.
- **Hero: noll slutledning.** Tvådelad rubrik, `.setup` (liten uppställning) +
  `.punch` (2–3 ord). Kräver budskapet två tankesteg är det fel budskap. Finns
  en verifierad siffra som bär smärtan, sätt den i heron. Ingen siffra: led med
  kundens rädsla, rakt på.
- **Punchen får aldrig vara ordvits — spegelfraser räknas som ordvits**
  ("Golvet gör rummet / Vi gör golvet" ratades: kiasmen är fyndig, inte tydlig).
- **Rytm.** Hero och punchar hålls korta, men brödtext skrivs i människoton med
  varierad meningslängd. Varje mening 3–5 ord läses som reklamrobot. Kolon
  hellre än tankstreck.
- Knapptext = handling ("Ring 070-…", "Boka mätning"), aldrig "Läs mer" eller
  "Skicka". CTA-rubriken är en fråga kunden svarar ja på i huvudet; knappen är
  svaret.
- Svenska, du-tilltal, inga klyschor. Personligt varumärke → jag-form. Aldrig
  "Växa på Google"-copy.

## Steg 4 — Mönstren och deras fallgropar

| Mönster | Så | Fallgrop |
|---|---|---|
| Modal | `:target`-lager, stängkryss först i tab-ordningen | Stäng mot ett fast `#stangd`-ankare, INTE `#top` — annars hoppar skrollpositionen. Sätt ALDRIG `aria-modal` eller `role="dialog"`: utan JS finns ingen Escape och ingen fokusfälla, och markeringen får inte lova det. Använd `<section aria-labelledby>`. |
| Mobilmeny | `:target`-panel i fixed lager UTANFÖR headern | Headerns `backdrop-filter` blir annars containing block för fixed. Panelen självstänger när hashen byter till valet. |
| Auto-popup | CSS-animation med ~14 s `animation-delay`; stängning via checkbox (`input:checked ~ .popup { display:none }`) | Starta `opacity:0; visibility:hidden` så den är oklickbar före entrén. Vid `prefers-reduced-motion`: visa den **inte alls** — en ruta som dyker upp av sig själv ÄR rörelse. Lyft den ovanför Bahko-knappen på mobil. |
| Tjänste-tejp | `translateX(-50%)`-loop, listan dubblerad för sömlöshet, kopian `aria-hidden` | Paus på hover, stopp vid `prefers-reduced-motion`. |
| Exklusiv FAQ | `<details name="faq">` — webbläsaren stänger förra frågan själv | Äldre webbläsare ignorerar attributet (graceful: flera kan stå öppna). |
| Hero | `min-height: 100svh`, videon som bakgrundslager, texten över den nedtill | **Videon äger hela vyn** (Mathias 2026-08-21). `svh`, aldrig `vh`: `vh` räknar in iOS-adressfältet och gör heron längre än skärmen. Lägg padding-bottom stort nog för rubrik OCH knappar — annars skärs CTA:n av vid vikkanten. |
| Hero-text | **EN rubrik.** Ingen lede, ingen tagline | Filmen visar redan vad som görs; text som upprepar den är slop och ströks 2026-08-21. Etikett ovanför rubriken får stå — den säger vad firman gör, vilket en okänd firma behöver. |
| Hero-video | `autoplay muted loop playsinline preload="metadata"` + `poster`, `object-fit: cover` över hela heron | **Drönarshot är standard** (Mathias 2026-08-21): en FPV-flygning som glider genom rummet och landar på arbetet visar både hemmet och hantverket. En locked-off-shot ratades. Gradient över videon för läsbarhet: nästan klar där förvandlingen sker, tät nedtill där rubriken står. Playwrights Chromium saknar H.264 — verifiera via poster och HTTP 200, **inte** `readyState`. Postern måste matcha bildruta 0; börjar klippet i en dålig vy, trimma bort de första sekunderna i stället för att välja en annan poster. |
| Hero per orientering | Två `<video>`, ett liggande och ett stående, växlade med CSS | Inget script: `<source media>` fungerar inte för video i Chrome, och ett orientation-script bryter noll-klient-JS. Selektorerna behöver två klasser (se kaskad-lärdomen). Det dolda elementet kostar bara sin `preload="metadata"`. |
| Tjänstekort | En måttsatt linjeritning per kort som ritar sig själv i vy | `stroke-dasharray` + `animation-timeline: view()` bakom `@supports`, med **färdigritat utgångsläge** — annars står korten tomma utan stöd. Ritningen är nischens eget språk och bär kortet utan att kosta en bild. `vector-effect: non-scaling-stroke` måste sitta på formen, inte på `svg`: den ärvs inte, och utan den blir linjen hårfin vid nedskalning. **Inga ordningssiffror** (01, 02 …) — de ratades som AI-slop 2026-08-21. |
| Klickbara steg | En dold `<input type="radio">` per steg som syskon FÖRE flikarna och kortet; `:checked ~` väljer aktiv flik och synlig panel | Radio i stället för en `div` med onClick ger piltangentsnavigering och rätt roll gratis, och håller sidan på noll klient-JS. Sätt fokusringen via `.stegRadio:focus-visible ~` — radion är dold, så ringen måste flyttas till labeln. Mät att exakt EN panel är synlig, i webbläsaren. |
| Logotyp | Ordmärke plus ett **inramat** märke: ikonen i en egen ruta med accentram | Lösa linjer intill ordmärket läser som dekoration, inte som en logotyp (Mathias 2026-08-21). Kunden ska känna igen sitt eget märke i headern, mobilmenyn och footern. |
| Galleri i förvandlingssektionen | Före/efter-paret stort, och **de övriga bilderna i ett kvadratiskt rutnät under** | Sektionen ska bära allt bildmaterial (Mathias 2026-08-21): två bilder räcker inte. `repeat(auto-fit, minmax(220px, 1fr))` i stället för media query. Kvadrat är facit — 16/11 kändes fortfarande för stort. `height: auto` **före** `aspect-ratio`, annars vinner img-taggens height-attribut och ration ignoreras. |
| Före/efter | Två stillbilder i ett par | Starkare och lättare än video här. Märk som illustration. |
| Scroll-reveal | `animation-timeline: view()` bakom `@supports`, synligt utgångsläge | Sidan måste vara komplett utan stöd. |
| Bildlådor | `next/image` med `width`/`height` | Varje lazy-bild måste ha styrd låda, annars hoppar innehållet när den laddar (iOS saknar Chromes scroll-förankring). Ska ration styras i CSS trots attributen: `height:auto` **före** `aspect-ratio`, annars vinner attributhöjden och ration ignoreras helt. |

Rör inte mönstren vid en recopy. Byt bara VERIFIERAT-blocket, paletten,
typografin, copyn, mediasökvägarna och modalens mailto-ärende.

## Steg 5 — Design

- **Egen distinkt palett per kund.** Upptaget: smaragd (grontoglanser), lera
  (galiano), kobolt (k9maleri), orange (golvresan), solgul (solpanelstjejen),
  cyan (glowingservice), energigrön (nordiapartner), kalksten och mässing
  (svhus), timber-amber (vajjebygg), brun och créme (mugglagret), espresso och
  lönn (nordicsnickare).
- **Kaskad-lärdomen, som slagit till två gånger.** Först på färg: basregeln
  för länkar ska vara `.sida :where(a) { color: inherit }`. `:where()` nollar
  specificiteten så komponentklasserna vinner på ordning. Skrivs den `.sida a`
  slår den ut varje knappklass — uppmätt resultat var osynlig text (1,00:1) på
  telefon-CTA:n. Aldrig `!important`.
  Sedan på `display` (2026-08-21): `.heroFilm video { display: block }` har
  specificitet (0,1,1) och slog ut `.heroStaende { display: none }` (0,1,0), så
  **båda** hero-videorna renderades och 16:9-klippet låg överst på telefon.
  Regeln: när du växlar element med `display`, ge selektorn **två klasser**
  (`.heroFilm .heroStaende`) så den vinner över elementregeln. Och mät vilket
  element som faktiskt renderas — det syns inte i koden, bara i webbläsaren.
- Kontrast: ljus yta → mörk text, aldrig tvärtom. Bahko-element följer
  knappregeln: marinblå `#0A1628` på smaragd `#10B981` (7,1:1), aldrig vit text
- **En mörk yta inuti en ljus sektion måste vända textfärgen explicit.** Ärver
  den sektionens färg blir rubriken mörk på mörkt. Hände i processkortet
  2026-08-21: både de inaktiva flikarna (ljus text på ljus yta) och
  panelrubriken (mörk på mörk) föll samtidigt. Mät varje ny yta, båda
  riktningarna.
  på smaragd (2,54:1).
- Typskala i fem steg som CSS-variabler, inte lösa värden. Inget under 11 px.
- **Inga versaler på rader över ~35 tecken** — ordformen försvinner. Räkna
  tecknen i varje element som har `text-transform: uppercase`, inklusive
  statsetiketter och hero-setup.
- Rörelse i lager (hero-video, tejp, scroll-reveal, popup), allt avstängbart via
  `prefers-reduced-motion`, och inget av det får bära innehåll ensamt.
- Skuggor: neutrala höjdskuggor, aldrig färgade glöd-halos. Slop gömmer sig i
  `filter: drop-shadow` lika ofta som i `box-shadow` — sök på båda.

## Steg 6 — Verifiering (obligatorisk före merge)

**Mät, tro inte.** Varje punkt nedan har fångat en riktig bugg.

1. `cd web && rm -rf .next && npx next build`. Kör aldrig två byggen parallellt
   mot samma `.next` (ger falska ENOENT-fel).
2. `next start` på ledig port, sedan Playwright. I container:
   `executablePath: '/opt/pw-browsers/chromium'`. Testfiler raderas efteråt.
3. **Fyra lägen, alla med noll pageerror:** normal, `prefers-reduced-motion`,
   utan externa script, och 390 px mobil. Bortse från ERR_TUNNEL och
   ERR_CONNECTION_RESET (sandlådans blockerade domäner).
4. Kontrast med WCAG-formeln på **varje** knapp (≥ 4,5:1). Räkna aldrig
   pixelhinkar — bakgrund som skiner genom en knapps rundade hörn har
   feldiagnostiserats som vit text på smaragd.
5. `scrollWidth` exakt = viewport vid 390 px.
6. Galleri och bildrutnät: kvadratisk ratio, max ~2,5 skärmhöjder på mobil, två
   kolumner (**aldrig en** — sex fullbreddsbilder blir sex skärmhöjder).
7. Vid recopy: grep:a förra leadets namn ur den **renderade** HTML:en, noll
   träffar.
8. Marknadssajten oskadd: `/`, `/om-oss/` med flera svarar 200 med header,
   footer och maskotar kvar.
9. Tidsberoende copy (nedräkningar): testa med `page.clock` före och efter
   gränsen samt en helg. Copy som ljuger efter ett klockslag är skickstopp.
10. **Titta på sidan.** Screenshot hero, galleri och kontakt i både 1440 och
    390 px. Headless virtual-time-bilder kan inte användas för att bedöma
    pågående CSS-transitioner — verifiera rörelse i CSS-värden, inte i pixlar.

## Steg 7 — Leverans

- Ersätter demon en befintlig länk under `/cloud/<kund>/` är den länken redan
  skickad och får aldrig brytas: lägg en redirect i `next.config.mjs` (mönstret
  finns — sök på shabifix). Filen är helig: exakt de två raderna, och motivera i
  commiten.
- Gren från aktuell `origin/main` (arbetskopian kan ligga efter — `git fetch`
  först). Commit, push, PR. **Ingen merge utan Mathias klartecken.**
- **Batcha i EN pull request.** Varje push och merge kostar deploys, och taket
  delas med kundsajterna. Fråga innan deploy.
- Efter merge: verifiera `bahkobyra.se/<kund>/` HTTP 200 (deployen tar ~1 min,
  404 direkt efter merge är normalt) och att kundsajterna är oskadda. **Polla
  aldrig bahkobyra.se i loop** — hela domänen 403:ar från Mathias IP.
- Mathias ögongranskar förvandlingsklippet (samma subjekt hela vägen) innan
  demon skickas till kund.
- Flagga i leveransen: platshållar-kontakt, obekräftat firmanamn, och varje
  kontroll du **inte** kunde köra. Påstå aldrig att ett verktyg kördes när det
  inte är installerat.

## Varför skillen finns

En lead ska kunna få ett förslag samma dag, byggt på sanningen om just den
kunden, utan att kosta credits när nischen redan finns i biblioteket. Mallen är
färdig — det enda nya är kunden.
