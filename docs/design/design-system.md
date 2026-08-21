# design-system.md — Bahko Byrås kunddemos

Systemet för allt som byggs på **bahkomallen** (`web/app/(demo)/svhus/` är
kanon). Det här är dokumentet system-kritikern dömer mot: varje rad är en
objektiv regel, inte en smakfråga. Skriven 2026-08-21 ur mallens egen CSS,
`hemsidor`-skillen och Bahkos varumärkesregler.

## Arkitektur

- Server-renderad Next.js-route i route-gruppen `(demo)/`. **Noll egen
  klient-JS.** Modal, meny, popup och dragspel körs på `:target`, `<details>`
  och checkbox-mönstret.
- Routen ligger som `app/(demo)/<kund>/page.js` + `<kund>.module.css`.
  **Aldrig under `/cloud/`** — catch-all-rewriten ger 404 där.
- Media i `web/public/<kund>/media/`. Bilder genom `next/image` med
  `width`/`height`. Video som ren `<video>` med `poster`.
- Fonter via `next/font`. Kursiv display-vikt i egen instans med
  `preload: false`.

## Färg

- **Egen distinkt palett per kund.** Upptaget: smaragd, lera, kobolt, orange,
  solgul, cyan, energigrön, kalksten/mässing, timber-amber, brun/créme,
  espresso/lönn.
- Paletten deklareras som CSS-variabler på `.sida`. Ingen komponent får en egen
  hexkod.
- **Kontrast: ljus yta → mörk text, aldrig tvärtom.**
- **Varje klickbart element ska mäta ≥ 4,5:1** med WCAG-formeln, mätt på
  beräknad färg mot faktisk bakgrund. Genomskinlig förgrund blandas mot sin
  bakgrund innan den mäts.
- Bahkos egna element (demo-knapp, modal) följer **knappregeln**: marinblå
  `#0A1628` på smaragd `#10B981` (7,1:1). Aldrig vit text på smaragd (2,54:1).
  De byter inte färg med kundens palett.

## Typografi

- Typskala i **fem steg** som CSS-variabler (`--tx-xs` … `--tx-xl`), inte lösa
  värden.
- **Inget under 11 px** någonstans, inklusive bildtexter och etiketter.
- **Inga versaler på rader över ~35 tecken** — ordformen försvinner. Gäller
  varje element med `text-transform: uppercase`.
- Rubriker skalar med `clamp()`. Inget får brytas under 380 px bredd.
- Display-typsnitt för rubriker och kortrubriker, UI-typsnitt för brödtext.

## Rum och rytm

- Sektionspadding, kortpadding och radavstånd kommer ur variabler, aldrig ur
  lösa px i en komponent.
- Heron fyller vyn: `min-height: 100svh` med innehållet centrerat. `svh`, inte
  `vh` — annars blir heron längre än skärmen på iOS.
- Hero-videon ligger i en **ratio-styrd ruta** (`aspect-ratio` +
  `height: auto`), inte som fullskärmsbakgrund. Därför behövs ingen
  mobilvariant av klippet.

## Kaskad

- Basregeln för länkar är `.sida :where(a) { color: inherit }`. `:where()`
  nollar specificiteten så komponentklasserna vinner på ordning. Skrivs den
  `.sida a` slår den ut varje knappklass — uppmätt resultat var osynlig text
  (1,00:1) på telefon-CTA:n.
- **Aldrig `!important`.**

## Rörelse

- Rörelse i lager: hero-video, tejp, scroll-reveal, popup. Allt avstängbart via
  `prefers-reduced-motion`, och inget av det får bära innehåll ensamt.
- Auto-popupen visas **inte alls** vid `prefers-reduced-motion` — en ruta som
  dyker upp av sig själv är rörelse.
- **Inga skuggor.** Höjd görs med ram och yta, inte med skugga. Slop gömmer sig
  i `filter: drop-shadow` lika ofta som i `box-shadow`.

## Sanning i innehållet

- **VERIFIERAT-block** i sidfilens toppkommentar: allt som får påstås, plus en
  rad om vad som inte är verifierat. Allt utanför blocket är förbjudet.
- **Ingen fabricerad historik** åt en riktig kund. Saknas publicerade siffror
  blir statsraden löftesbaserad.
- Lånade eller genererade bilder ska vara **märkta som illustration minst en
  gång per sida**. Ingen sektion får heta Våra projekt eller Referenser.
- Kontaktuppgifter: bara verifierade. Annars platshållare `070-123 45 67` och
  formulär-mailto till `mathias@bahkobyra.se`.

## Copy

- **EN handling per sida.** Samma verb och objekt i header, mobilmeny, popup,
  CTA-sektion och kontaktkort. Aldrig synonymvariation.
- Hero: tvådelad rubrik, uppställning plus punch på 2–3 ord. Noll slutledning.
- Punchen får inte vara ordvits, och **spegelfraser räknas som ordvits**.
- Minst en mening per sida som **avstår försäljning** ("räcker det med X säger
  vi det").
- Svenska, du-tilltal. Aldrig ordet "gratis" — alltid "kostnadsfri".
- Knapptext är en handling, aldrig "Läs mer" eller "Skicka".

## Tillgänglighet

- Modalen får **aldrig** `aria-modal` eller `role="dialog"`: utan JS finns
  ingen Escape och ingen fokusfälla. Använd `<section aria-labelledby>`.
- Stängkryss först i tab-ordningen. Stängning mot ett fast `#stangd`-ankare,
  aldrig `#top`.
- Träffyta minst 44 px på allt klickbart.
- Varje lazy-bild har en styrd låda, annars hoppar innehållet när den laddar.
  Ska ration styras i CSS trots attributen: `height: auto` **före**
  `aspect-ratio`.

## Mätbart utfall som ska hålla före leverans

1. Rent bygge: `rm -rf .next && next build`.
2. Fyra lägen med noll pageerror: normal, `prefers-reduced-motion`, helt utan
   JavaScript, och 390 px mobil.
3. `scrollWidth` exakt = viewport vid 390 px.
4. Noll egna inline-script i renderad HTML.
5. Marknadssajten och övriga demos svarar 200 med header och footer kvar.
