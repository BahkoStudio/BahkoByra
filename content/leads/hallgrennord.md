# Hällgren Nord (A Hällgren Nord AB) — lead

**Hemsida:** [hallgrennord.se](https://hallgrennord.se/) — finns. WordPress, nio sidor (hem, bygg, rivning, sanering, betonghåltagning, fuktutredning, mark & grund, om oss, kontakt). Tjänstebilderna är grafiska rutor med text på drönarbild av skog; nästan inga riktiga jobbilder på sajten, men två egna projektfilmer i mediabiblioteket (Rivning Sollentuna, Balkonger Blackeberg) och en egen hero-film. Förslaget visar deras eget arbete i stället.
**Instagram:** [@hallgrennord](https://www.instagram.com/hallgrennord/) — "Hällgren Nord AB", 190 följare, få inlägg (senaste 2025): rivning, asbest, vattenskada, betongsågning, rekrytering.
**LinkedIn:** [A Hällgren Nord AB](https://se.linkedin.com/company/a-h%C3%A4llgren-nord-ab).
**Demo:** `bahkobyra.se/hallgrennord/` (källa: `web/app/(demo)/hallgrennord/page.js`). Lokalt: `http://localhost:<port>/hallgrennord/`.
**Status:** demo byggd 2026-10-09 på demomallen v3. Inte committad, inte skickad.

> **Visa INTE offentligt:** sidan bär riktiga kontaktuppgifter (telefon, mejl, båda adresserna) och org.nr. `robots: noindex`. Länkas bara i DM till firman.

## Verifierat (2026-10-09)

| Uppgift | Värde | Källa |
|---|---|---|
| Firmanamn | A Hällgren Nord AB (varumärke "Hällgren Nord") | sajt, register |
| Org.nr | 559106-6930, AB, reg. 2017-03-28, säte Sollentuna, F-skatt + moms | ratsit, hitta.se, bygg.se, genomsyn, kundernas.se |
| Ledning | VD Andreas Hällgren (andreas@hallgrennord.se); delägare/projektledare Seymur Huseynov | sajt (kontakt), bolagsradar, LinkedIn |
| Adress Stockholm | Bäckvägen 20, 192 54 Sollentuna (sajten stavar fel: "Backvägen") — **visa INTE offentligt** | register + sajt |
| Adress Luleå | Torpslingan 21, 973 47 Luleå — **visa INTE offentligt** | sajt |
| Piteå | "Kontor under etablering", öppnar 2026 | sajt |
| Telefon | Stockholm/VD 010-200 78 35, Luleå 010-179 72 00 — **visa INTE offentligt** (på demon: 010-200 78 35) | sajt (kontakt), hitta.se |
| E-post | info@hallgrennord.se — **visa INTE offentligt** | sajt |
| Historik | Grundat i Boden 2017, huvudkontor Stockholm, expanderat söderut | sajt /om-oss |
| Tjänster (deras ord) | bygg (nyproduktion, ombyggnation, renovering); total- och selektiv rivning (säkerhet, miljö, återbruk); sanering av asbest, PCB, brand-, mögel- och avloppsskador; håltagning och sågning i betong, sten och tegel; fuktmätning och skadeutredning; mark & grund (schakt, dränering, grundläggning); projektledning | sajt |
| Kompetens | RISE-certifierade fukttekniker, licensierad KMA-samordnare, BKR-behörighet, KMA-system, "över 10 års erfarenhet" av sanering/bygg/rivning | sajt /om-oss |
| Egna ord | "egen maskinpark och erfarna operatörer", "mindre beroende av externa resurser", "riskbedömning, avskärmning och undertryck säkerställs före start", "rengöring, egenkontroll och mätning", "spårbar dokumentation", "från inventering till godkänd efterkontroll", "små serviceuppdrag eller stora entreprenader" | sajt |
| Egna yrkesfolk | snickare, rivare, saneringstekniker, håltagare (i egen regi) | deras LinkedIn-sida |
| Omdöme | Jonny J., Enebyberg, 5 stjärnor: badrumsrenovering + nya fönster — ordagrant | hitta.se |
| Logotyp | Hallgren-Nord-Logo-Gray-Green.png + White-Green.png (deras egna filer, alfa) | sajtens mediabibliotek |
| Egna foton | 7 IG-bilder (rivning med grävmaskin, betongsågning ute, vattenskada, asbestavskärmning, truck, inplastat material, golvsågning), håltagning Luleå, firmabil med logga | IG-embed, sajtens mediabibliotek |

## INTE verifierat (står inte på sidan)

- **Google-betyg:** kundernas.se visar 5,0 men omväxlande 4 och 8 recensioner. Textomdömena där ("Bolag som man kan lita på!", "Company you can trust!") är från "2783 Huseynov", troligen delägaren själv. Används inte. Ingen betygsbricka.
- Öppettider, Facebook, försäkring, priser, ledtider, antal projekt/anställda (registret: 37 anställda 2024, omsättning 69 Mkr; inte använt), garantier.

## Media

| Slot | Källa | Kostnad |
|---|---|---|
| Hero (liggande + stående) | **deras egna IG-foton** (rivning, golvsågning, vattenskada) i långsam rörelse med övertoning, ffmpeg | 0 |
| Varför-film | deras eget foto (håltagning Luleå), långsam inzoomning + logokortet, ffmpeg | 0 |
| Kontaktfilm | hero nedskalad och suddad | 0 |
| Tjänstebilder (4) | deras egna foton | 0 |
| Jobband övre (5) | deras egna foton | 0 |
| Jobband nedre (5) | **lånade illustrationer** (hg ×2, osterlunds ×2, hd ×1, alla genererade), märkta i `jobb.not` | 0 |
| Instagram | tre riktiga inlägg inbäddade (DIlX2UBtIdR, DFE1hlmNJ6j, DE0NJ1EuSIa) | 0 |

Totalt **0 USD**. Ingen Higgsfield-körning: `tools/hf-api/.env.local` (HF_CREDENTIALS) finns inte på lådan, så förvandlingsfilmen genererades inte.

## Flaggor före utskick

- **Hero är inte en förvandling (före → efter):** den är deras egna foton i rörelse. Vill Mathias ha en genererad förvandling (t.ex. asbestrum före/efter, ~0,23–0,50 USD med kling/qwen) behövs HF-nyckeln.
- **Deras egna filmer** (Rivning Sollentuna 46 s, Balkonger Blackeberg 54 s, sajtens hero-film) gick inte att hämta från lådan: hallgrennord.se stänger TLS mot lådans nät. Hämta dem från en annan dator och byt in som hero: bästa materialet de har.
- Nedre jobbandet är lånade illustrationer. Inget från Proffsmaskiner används (**systerbolag**: Andreas Hällgren är ledamot, samma adress Bäckvägen 20). Visa aldrig de två demona sida vid sida för honom med samma material, och tänk på att `content/leads/proffsmaskiner.md` är samma person.
- Omdömen: ett riktigt (hitta.se) + två exempelkort med tomma stjärnor.
- Formuläret går till mathias@bahkobyra.se (demonyckeln), med kundtyp Företag/Fastighetsägare/Privatperson.
- Heron säger "Stockholm · Luleå" (Piteå öppnar 2026 och nämns i Om oss och footern).
- Säljvinkel: sajten har nästan inga egna bilder och visar inte ett enda omdöme; tjänsterutorna är text på stockbild av skog.

## DM-utkast (skickas INTE utan Mathias ja)

> Hej Andreas! Jag byggde ett kostnadsfritt förslag på hur hallgrennord.se kan se ut med era egna jobbilder från Instagram i stället för skogsbilderna: bahkobyra.se/hallgrennord/ (bara för er, syns inte på Google). Säg till om ni vill se den skarpt, så tar vi 15 minuter.

## Design-loop 2026-10-09 (3 rundor, max)

Ribban: `bar.md` i `/workspace/hn/designloop/` (ur hemsidor-skillen). Kritikerna kördes sekventiellt av byggaren (ingen fan-out-verktyg tillgängligt), mot renderad sida via Playwright.

1. System PASS (efter att två falsklarm i mätskriptet rättats) · Craft FAIL: orten bröts på två rader på mobil med hängande "·" · Brief FAIL: "En kontakt genom hela projektet" stod inte i deras kanaler → struket, ersatt med verifierat ("Riskbedömning före start", "de största delarna av entreprenaden stannar hos oss").
2. System PASS · Brief PASS · Craft FAIL: "Stockholm · Norrbotten" bröts fortfarande på 390 px → orten blev "Stockholm · Luleå".
3. Craft FAIL→fixat: footerns Sidan-kolumn visade "Kontakt" två gånger (nav-länken + mallens egen) → höger nav-länk blev "Omdömen". Efter fix: QA allt grönt (1440/1100/768/390), System PASS, Brief PASS, Craft PASS.
