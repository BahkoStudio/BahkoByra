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
- `/logo.svg`

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
| `logo.svg` | Logotyp, används även som favicon |
| `llms.txt` | Maskinläsbar sammanfattning för AI-crawlers |
| `robots.txt` | Tillåter alla crawlers, pekar ut sitemap |
| `sitemap.xml` | En URL, sajten är en one-pager |

## Att göra

- [ ] Byt ut AI-genererade bilder mot kundens egna. Galleriet heter "Så kan det se ut" tills dess, det får inte påstå att bilderna är utförda jobb
- [ ] Uppdatera företagsnamn och organisationsnummer när enskild firma blir AB (september 2026)
- [ ] Komplettera schema med `openingHoursSpecification` (kräver kundens faktiska öppettider), `geo` (kräver koordinater) och `identifier` (orgnummer, kommer med AB-bytet)

Optimeringsordning och evidensgrader: se `.claude/skills/optimering/` i huvudrepot.
