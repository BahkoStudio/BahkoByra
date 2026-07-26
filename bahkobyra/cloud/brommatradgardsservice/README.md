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
- `/llms.txt` → hamnar i domänroten, vilket krävs för att AI-crawlers ska hitta den
- `/robots.txt`, `/sitemap.xml` → samma sak
- `/logo.svg`, `/logo-ljus.svg`, `/symbol.svg`

Deploy sker automatiskt vid push till `main`.

## Domän

`brommatradgardsservice.se` (apex) + `www` som 308-redirect till apex.

Canonical i `index.html` pekar på apex, så www får aldrig vara den kanoniska adressen.

DNS ligger hos **Loopia**. Vid ändring: rör bara A-post under `@` och CNAME under `www`.
**MX-posterna ska aldrig röras**, kundens e-post (`jens@brommatradgardsservice.se`) ligger på samma domän.

## Filer

| Fil | Innehåll |
|---|---|
| `index.html` | Hela sajten. Inline CSS och JS, JSON-LD för `LandscapingBusiness` och `FAQPage` |
| `logo.svg` | Logotyp för mörk bakgrund (headern). Ordmärket är konverterat till paths |
| `logo-ljus.svg` | Samma logotyp för ljus bakgrund (offert, faktura, dekaler) |
| `symbol.svg` | Bara symbolen, kvadratisk. Favicon, profilbild på Google och sociala medier |
| `llms.txt` | Maskinläsbar sammanfattning för AI-crawlers |
| `robots.txt` | Tillåter alla crawlers, pekar ut sitemap |
| `sitemap.xml` | En URL, sajten är en one-pager |

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

### Offertformuläret

`submitOffert` postar till Web3Forms och Jens får mejlet direkt. Går anropet inte
igenom faller flödet tillbaka på `mailto:` och SMS, alltså exakt det beteende
sidan hade innan. Steg 2 i modalen har därför två lägen, `setSummaryMode()`:

- **Skickat:** förfrågan ligger hos Jens, mejl och SMS visas som frivilliga genvägar
- **Ett steg kvar:** inget nådde fram, besökaren måste klicka vidare

Ett honeypot-fält (`#of-hp`) fångar bottar. Är det ifyllt skickas ingenting.

### Mätning

GA4 laddas **först efter att besökaren klickat Acceptera**. Ingen begäran går till
Google innan dess, vilket är varför sajten klarar sig utan cookie-hantering i
övrigt. Valet sparas i `localStorage` under `bts-consent`.

Händelser som loggas: `ring_klick` (med vilken av de fem telefonlänkarna),
`offert_oppnad`, `offert_skickad`, `offert_reservlage`, `reservvag_mejl`,
`reservvag_sms`, `google_profil_klick`.

`offert_skickad` är den riktiga konverteringen. Web3Forms räknar dessutom varje
inskickad förfrågan oavsett samtycke, så antalet leads går alltid att stämma av
även om analysdatan är ofullständig.

## Att göra

- [ ] Byt ut AI-genererade bilder mot kundens egna. Galleriet heter "Så kan det se ut" tills dess, det får inte påstå att bilderna är utförda jobb
- [ ] Uppdatera företagsnamn och organisationsnummer när enskild firma blir AB (september 2026)
- [ ] Fyll i `CFG.web3forms` och `CFG.ga4`. Tills dess levererar formuläret inga leads av egen kraft och ingen mätning sker
- [ ] Komplettera schema med `openingHoursSpecification` (kräver kundens faktiska öppettider) och `identifier` (orgnummer, kommer med AB-bytet). `geo` är klart

Optimeringsordning och evidensgrader: se `.claude/skills/optimering/` i huvudrepot.
