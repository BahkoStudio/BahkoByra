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

**Referens — KOPIERA DENNA:** `web/app/(demo)/svhus/` (`page.js` +
`svhus.module.css`). Live: `bahkobyra.se/svhus/`. Mall-kanon 2026-08-18.
Andra recopy att titta på: `web/app/(demo)/shabifix/`.

Skillen har **tre lägen som bara skiljer sig i mediakostnad** — strukturen,
copy-reglerna och QA:n är identiska:

| Läge | När | Credits |
|---|---|---|
| **Återbruk** | Leadet har redan en demo, eller en demo i samma nisch finns | 0 |
| **Lån** | Nischen finns i biblioteket men inte leadet | 0 |
| **Nybygge** | Ingen bild i nischen finns | ~50, **kräver Mathias beställning** |

## Den andra leveranstypen: säljdemon

Allt ovan gäller **kundhemsidor** — en sida till en namngiven lead. Skillen
äger också en helt annan sak: **säljdemon som visas live i mötet.**

Referens: `web/public/salj/index.html`. Live: `bahkobyra.se/salj/`.

Den är inte en kunds sida. Den är ett verktyg Mathias har uppe på skärmen när
han sitter mittemot en hantverkare, och den spelar upp hantverkarens blivande
slutkund som går **från nyfiken till bokat hembesök utan att någon lyfter en
telefon**. Därför: en enda självständig fil, inga beroenden utom Google Fonts,
ingen localStorage. Den ska öppna direkt även utan nät.

### Arkitekturen är det viktigaste kravet

**Två lager som aldrig blandas.**

1. **Tokenlagret** — ett `THEMES`-objekt med kompletta teman. Varje tema har
   `color`, `font`, `type`, `radius`, `space` och `rules`. Detta är **enda
   stället i hela filen** där en hexkod eller ett rått px-tal får finnas.
2. **Komponentlagret** — läser uteslutande tokens. Ingen komponent får en egen
   färg eller ett eget mått.

Bryggan är en funktion som skriver ut temat som CSS-variabler på `:root`.
Komponent-CSS:en innehåller då bara `var()`.

**Ett temabyte ska ändra karaktär, inte bara färg** — radie, typsnittsvikt och
spacing måste alla röra sig. Byter bara färgen är temat inte ett tema.

**`rules` styr beteende, inte utseende.** Reglerna läses i render-koden:
- `buttonFill: false` → temat tillåter inga fyllda knappar alls;
  primärknappen renderas som ramad text.
- `icons: false` → inga ikoner renderas någonstans.
- `labelIndicator: 'square'` → en kvadrat före varje etikett.
- `accentSurfacesMax: 1` → högst en accentfärgad yta per skärm; render-koden
  **räknar** och degraderar primärknappen till ramad när taket är nått.

**Media queries kan inte läsa CSS-variabler.** Lösningen är att inte behöva
dem: `repeat(auto-fit, minmax(var(--kol-min), 1fr))` bryter på innehållets
mått i stället för på skärmbredd, och måttet kommer ur temat. Då påverkar
temabytet även responsiviteten.

### Flödet

Start → quiz i fyra frågor → laddning → reveal → bokning → bekräftat.

- **Start:** rubrik i display, en mening, en primärknapp, tre trust-rader.
- **Quiz:** en fråga i taget, tunn framstegsindikator, automatisk gång vidare
  vid val, tillbakalänk från fråga två.
- **Laddning:** 2,5 sekunder, tre texter som byts.
- **Reveal — den känslomässiga toppen.** Två saker samtidigt: ett stort
  visualiseringsfält som skiftar färgton efter vald stil, och två tidigare
  projekt som matchar valet, med avstånd i km, hur länge sedan, och ett
  kundcitat.
- **Bokning:** dag (fem vardagar framåt), tid, namn, telefon. Bekräfta-knappen
  är låst tills dag och tid är valda.
- **Bekräftat:** tilltal med förnamn, dag och tid, plus tre rader — sms
  skickat, bokning i kalendern, ingen telefon lyftes.

### Byråns kontrollrad

En smal mörk rad högst upp: temaväxlare, ett fält för kundens företagsnamn som
slår igenom i nav, footer och bekräftelse, och en "börja om"-knapp.

Raden **byter aldrig karaktär med temat** — den har egna `--panel`-variabler
utanför tokenlagret. Följer den temat ser den ut som en del av kundens sida,
och då tappar den sin funktion som säljarens panel.

### Hårda krav — kontrollera var och en före leverans

1. Noll hexkoder utanför `THEMES` (kontrollradens egna undantagna).
2. Noll px i komponentlagret som inte kommer ur `space` eller `radius`.
3. Orden **pris, kostnad, kr, budget** förekommer inte i något kundvänt fält.
   Hantverkare vill inte visa sina siffror för konkurrenter som surfar in.
   Det är ett hårt krav, inte en preferens.
4. Inga skuggor i något tema.
5. Temat med `buttonFill: false` renderar ingen fylld knapp och ingen ikon.
6. Temat med `labelIndicator: 'square'` renderar kvadraten före varje etikett.
7. Temat med `accentSurfacesMax` överskrider aldrig sitt tak per skärm.
8. Rubriker skalar med `clamp()` — inget bryter under 380 px bredd.
9. Temabyte ändrar radie, typsnittsvikt och spacing, inte bara färg.

Kraven är mätbara med avsikt: de går att kontrollera i ett skript, och ska
kontrolleras i ett skript.

### Vad som byts per bransch

Innehållet är utbytbart och allt är på svenska. Byt **bransch, rum och stilar**
efter vem som sitter i rummet. Nuvarande uppsättning är renoveringsspåret,
eftersom det passar flest hantverkare: rum är badrum, kök, vardagsrum och
uterum; stilar är skandinavisk, modern, klassisk och industriell.
Referensprojekten får vara påhittade men ska vara trovärdiga — riktiga avstånd
i km, rimliga tidsangivelser, korta citat som låter som svenska villaägare.

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
3. **Ny generering** — kostar credits, kräver Mathias uttryckliga beställning.

**Kontrollera alltid lånade filer med `md5sum`.** Samma bild ligger under olika
namn i olika demos: `galleri-platsbyggt-snickeri.jpg` (galiano) och
`mattbestalld-frast-spegel-bjorkplywood.jpg` (tryggbyggservice) är identiska.
Två "olika" lånade bilder blev samma spegel i ett galleri 2026-08-21. Kör
`md5sum` på hela mediamappen och jämför antalet unika hashar mot antalet filer
innan du skriver bildtexter.

### Generering (bara på beställning)

Kostnadskolla varje modell före körning — priser ändras, hårdkoda dem inte här.
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

**I bahkomallen är detta inget problem** — hero-videon ligger i en ratio-styrd
ruta (`aspect-ratio: 1376/768; height: auto`) vid sidan av texten, inte som
fullskärmsbakgrund. Ett 16:9-klipp fyller rutan snyggt i varje bredd, och ingen
mobilvariant behövs.

Receptet nedan gäller bara om en video någon gång ska täcka en hel yta: då
beskärs ett 16:9-klipp ~4× på en telefon och visar en oanvändbar närbild. Fixa
**utan ny generering** genom att rama om samma klipp till 9:16 med suddig
utfyllnad, bildremsan från överkanten:

```sh
ffmpeg -i hero.mp4 -filter_complex "\
[0:v]scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,boxblur=44:3,eq=brightness=-0.34:saturation=0.55[bg];\
[0:v]scale=720:-2[fg];[bg][fg]overlay=(W-w)/2:0[ut]" \
-map "[ut]" -c:v libx264 -crf 26 -an -movflags +faststart hero-mobil.mp4
```

Låt hero-gradienten mörkna genom remsans underkant, så övergången försvinner och
rubriken får en solid textyta. **Postern måste vara den nya filens bildruta 0**
— ta den ur den färdiga filen, inte ur källbilden.

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
| Hero | `min-height: 100svh` med innehållet centrerat | **Heron ska äga första vyn** — inget av nästa sektion får skymta (Mathias 2026-08-21). Använd `svh`, aldrig `vh`: `vh` räknar in iOS-adressfältet och gör heron längre än skärmen. |
| Hero-video | `autoplay muted loop playsinline preload="metadata"` + `poster`, i en ratio-styrd ruta | Rutan, inte fullskärmsbakgrund: ett 16:9-klipp som täcker en hel telefonhero beskärs ~4× och visar en oanvändbar närbild. Playwrights Chromium saknar H.264 — verifiera via poster och HTTP 200, **inte** `readyState`. Postern måste matcha bildruta 0. |
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
- **Kaskad-lärdomen** (kostade en hel rättningsrunda): basregeln för länkar ska
  vara `.sida :where(a) { color: inherit }`. `:where()` nollar specificiteten så
  komponentklasserna vinner på ordning. Skrivs den `.sida a` slår den ut varje
  knappklass — uppmätt resultat var osynlig text (1,00:1) på telefon-CTA:n.
  Aldrig `!important`.
- Kontrast: ljus yta → mörk text, aldrig tvärtom. Bahko-element följer
  knappregeln: marinblå `#0A1628` på smaragd `#10B981` (7,1:1), aldrig vit text
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
