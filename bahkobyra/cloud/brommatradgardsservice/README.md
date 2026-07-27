# Bromma Trädgårdsservice

Kundsajt byggd av Bahko Byrå. Statisk sajt, inga byggsteg, inga beroenden.

## Deploy

Den här mappen är **rot** för ett eget Vercel-projekt. Inställningen som gör det:

| Vercel-inställning | Värde |
|---|---|
| Repository | `bahkostudio/bahkobyra` |
| Root Directory | `bahkobyra/cloud/brommatradgardsservice` |
| Framework Preset | Other |
| Build Command | (tomt) |
| Output Directory | (tomt) |
| Install Command | (tomt) |

Eftersom mappen är rot serveras filerna direkt på domänen:

- `/` → `index.html`
- `/tradgardsskotsel/`, `/hackklippning/` → tjänstesidorna, ren URL utan `.html`
  eftersom varje sida ligger som `index.html` i sin egen mapp
- `/llms.txt` → hamnar i domänroten, vilket krävs för att AI-crawlers ska hitta den
- `/robots.txt`, `/sitemap.xml` → samma sak
- `/logo.svg`, `/logo-ljus.svg`, `/symbol.svg`
- `/sida.css`, `/offert.js` → delade av tjänstesidorna

Ingen `vercel.json` finns i den här mappen och ingen behövs. Projektet servar rakt
från filsystemet. Repots `vercel.json` i roten gäller bahkobyra.se-projektet, inte
det här, och innehåller 301:an från den gamla demo-URL:en hit.

Deploy sker automatiskt vid push till `main`.

## Domän

`brommatradgardsservice.se` (apex) + `www` som 308-redirect till apex.

Canonical i `index.html` pekar på apex, så www får aldrig vara den kanoniska adressen.

DNS ligger hos **Loopia**. Vid ändring: rör bara A-post under `@` och CNAME under `www`.
**MX-posterna ska aldrig röras**, kundens e-post (`jens@brommatradgardsservice.se`) ligger på samma domän.

## Filer

| Fil | Innehåll |
|---|---|
| `index.html` | Startsidan. Inline CSS och JS, JSON-LD för `LandscapingBusiness` och `FAQPage` |
| `tradgardsskotsel/index.html` | Tjänstesida: löpande skötsel. JSON-LD `Service` + `BreadcrumbList` |
| `hackklippning/index.html` | Tjänstesida: häckklippning, plantering och borttagning. Samma schematyper |
| `sida.css` | Delad formatmall för tjänstesidorna. Samma tokens och komponentnamn som startsidan, utan scroll-koreografin |
| `offert.js` | Delad JS för tjänstesidorna: offertmodal, Web3Forms, mobilnav, samtycke, GA4 |
| `logo.svg` | Logotyp för mörk bakgrund (headern). Ordmärket är konverterat till paths |
| `logo-ljus.svg` | Samma logotyp för ljus bakgrund (offert, faktura, dekaler) |
| `symbol.svg` | Bara symbolen, kvadratisk. Favicon, profilbild på Google och sociala medier |
| `llms.txt` | Maskinläsbar sammanfattning för AI-crawlers |
| `robots.txt` | Tillåter alla crawlers, pekar ut sitemap |
| `sitemap.xml` | Tre URL:er: startsidan och de två tjänstesidorna |

## Konfiguration

Överst i det avslutande `<script>`-blocket i `index.html` ligger ett `CFG`-objekt
med två värden. **Båda är tomma tills de fylls i, och sajten fungerar utan dem.**

| Nyckel | Vad | Tom betyder |
|---|---|---|
| `CFG.web3forms` | Access key från web3forms.com, mottagare `jens@brommatradgardsservice.se` | Offertformuläret skickar inget själv, utan använder `mailto:` och SMS som förut |
| `CFG.ga4` | Mät-ID `G-XXXXXXXXXX` | Ingen samtyckesbanner, ingen mätkod, inga kakor sätts |

Båda är **publika identifierare, inte hemligheter**. De är designade för att ligga
i klientkoden och ger ingen åtkomst till något. Riktiga API-nycklar hör fortsatt
hemma i `.env` enligt `CLAUDE.md`.

**Samma `CFG` finns på två ställen:** inline i `index.html` och överst i
`offert.js`. Startsidans logik är sammanvävd med scroll-koreografin och bröts
därför inte ut. Ändras en nyckel måste den ändras på båda ställena. Vill någon
städa upp det är rätt ordning: flytta startsidans modal- och samtyckesdel till
`offert.js`, verifiera formuläret live, och först då ta bort den inline.

### Offertformuläret

`CFG.web3forms` är ifylld sedan 2026-07-27. `submitOffert` postar till Web3Forms och
Jens får mejlet direkt. Går anropet inte igenom faller flödet tillbaka på `mailto:`
och SMS, alltså exakt det beteende sidan hade innan nyckeln fanns. Steg 2 i modalen
har därför två lägen, `setSummaryMode()`:

- **Skickat:** förfrågan ligger hos Jens, mejl och SMS visas som frivilliga genvägar
- **Ett steg kvar:** inget nådde fram, besökaren måste klicka vidare

Ett honeypot-fält (`#of-hp`) fångar bottar. Är det ifyllt skickas ingenting.

### Mätning

`CFG.ga4` är ifylld sedan 2026-07-27 (G-1EKF0NFE5M). GA4 laddas **först efter att besökaren klickat Acceptera**. Ingen begäran går till
Google innan dess, vilket är varför sajten klarar sig utan cookie-hantering i
övrigt. Valet sparas i `localStorage` under `bts-consent`.

Händelser som loggas: `ring_klick` (med vilken av de fem telefonlänkarna),
`offert_oppnad`, `offert_skickad`, `offert_reservlage`, `reservvag_mejl`,
`reservvag_sms`, `google_profil_klick`.

`offert_skickad` är den riktiga konverteringen. Web3Forms räknar dessutom varje
inskickad förfrågan oavsett samtycke, så antalet leads går alltid att stämma av
även om analysdatan är ofullständig.

## Tjänstesidor

Startsidan är inte längre en one-pager. Två tjänstesidor är brutna ut, enligt
`.claude/skills/optimering/` steg 3: egna URL:er per tjänst höjer ämnesfokus och
fungerar bättre med passage-retrieval än tio ämnen på en URL.

| Sida | Äger sökämnet |
|---|---|
| `/tradgardsskotsel/` | Löpande skötsel: gräsklippning, ogräs, beskärning, löv |
| `/hackklippning/` | Allt om häck: klippning, plantering, borttagning |

**Häckklippning nämns på båda sidorna**, eftersom det både är ett skötselmoment
och ett häckarbete. Skötselsidan beskriver det i en mening och länkar vidare;
häcksidan är den som ska ranka. Skrivs mer om häckklippning på skötselsidan
börjar sidorna konkurrera med varandra.

Innehållet ligger i rå HTML utan JS-beroende, eftersom GPTBot, ClaudeBot och
PerplexityBot inte kör JavaScript. Ingen `FAQPage`-markup på tjänstesidorna:
rich results för det är avvecklat, men FAQ-*innehållet* är fortfarande värt att ha.

### Rutavdraget

Faktarutan på båda sidorna är verifierad mot primärkällan 2026-07-27, sidan
"Vilken typ av trädgårdsarbete kan jag få rutavdrag för?" hos Skatteverket, både
privat- och företagsvarianten. Verifierat och använt:

- Ger avdrag: häck- och gräsklippning, krattning, ogräsrensning, klippning av
  buskar, mossbekämpning i gräsmatta, beskärning, fällning och borttagande av
  träd och buskar, röjning av sly, stubbfräsning, vedkapning, höstgrävning
- Ger inte avdrag: planteringsarbeten, anläggning av gräsmatta, murar, uppfarter,
  staket, trädgårdsgångar, sten- och plattläggning
- Bortforsling räknas aldrig in, inte ens när arbetet i sig ger avdrag

**Fälla:** en av Skatteverkets äldre formuleringar säger att trädbeskärning och
trädfällning *inte* ger avdrag. Den är föråldrad och samstämmigheten på de två
aktuella FAQ-sidorna är entydig. Använd alltid formuleringen ovan, och slå upp
den igen innan den skrivs på nästa kundsajt.

Inga belopp, procentsatser eller tak nämns någonstans i copyn. De ändras och är
inte verifierade här. Sidorna säger "arbetskostnaden" och länkar till Skatteverket.

## Att göra

- [ ] Byt ut AI-genererade bilder mot kundens egna. Galleriet heter "Så kan det se ut" tills dess, det får inte påstå att bilderna är utförda jobb
- [ ] Uppdatera företagsnamn och organisationsnummer när enskild firma blir AB (september 2026)
- [ ] Komplettera schema med `identifier` (orgnummer, kommer med AB-bytet). `geo` och `openingHoursSpecification` är klara
- [ ] Nästa tjänstesidor när de två första fått mätdata: gräsmatta med sprinklers, trädgårdsanläggning, snöröjning inför oktober
- [ ] Bilder på tjänstesidorna. De har medvetet ingen hero-bild, vilket gör dem snabba men torra. Kundens egna före- och efterbilder hör hemma här först av allt
- [ ] Bekräfta `areaServed` med Jens. Salem, Solna och Sundbyberg står i schemat men nämns ingenstans i copyn; Saltsjö-Boo och Rönninge står i `llms.txt` men saknas i schemat. Ett överbrett tjänsteområde skadar aktivt, så listan ska bara innehålla orter där arbeten faktiskt utförts
- [ ] Beslut om formuleringen "Det priset står sig" i prissektionen. Den läses som en prisgaranti, vilket Jens sagt att de inte lämnar
- [ ] Omdöme 4 (Sifat Bin) är omärkt och påstår samtidigt att priset var lägre än hos andra företag. Källbelägg eller ta bort

## Bildfiler

| Fil | Användning |
|-----|-----------|
| `logo.svg` / `logo.png` | Mörk bakgrund (krämfärgad text). PNG:en är den Jens fått och den GBP kan ta emot |
| `logo-ljus.svg` / `logo-ljus.png` | Ljus bakgrund (marinblå text) |
| `symbol.svg` / `favicon.png` | Enbart symbolen. SVG som primär favicon, PNG som reserv |
| `apple-touch-icon.png` | 180 px, solid bakgrund eftersom iOS inte hanterar genomskinlighet |
| `og-image.png` | 1200×630, används av `og:image` och som `image` i schemat |

Samtliga PNG:er utom `apple-touch-icon` och `og-image` har äkta alfakanal.

Optimeringsordning och evidensgrader: se `.claude/skills/optimering/` i huvudrepot.
