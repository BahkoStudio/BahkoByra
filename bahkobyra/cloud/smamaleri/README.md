# Smålands Måleri AB

Kundsajt byggd av Bahko Byrå. Statisk sajt, inga byggsteg, inga beroenden.

| | |
|---|---|
| Företag | Smålands Måleri AB, org.nr **556967-2271** |
| Registrerad adress | Havsörnsgatan 57 Lgh 1103, 556 10 Jönköping. **Lägenhet**, står medvetet inte på sajten |
| Telefon | 072-011 91 73 |
| E-post | kontakt@smamaleri.se |
| Domän | smamaleri.se |
| Kund sedan | 2026-07-27 |

## Namnet delas med ett annat bolag

Det finns ett **annat** Smålands Måleri AB, org.nr 556960-8002, beskrivet med säte
Göteborg respektive Malmö och 42 anställda. Två separata aktiebolag, samma firmanamn.

Det styr hur sajten är skriven:

- **Titeln leder med tjänst och ort**, inte med varumärket. "Målare i Jönköping" är ett
  sökuttryck vår kund kan vinna. "Smålands Måleri" ensamt är det inte, där vinner den
  etablerade parten länge.
- **Orten står alltid tillsammans med företagsnamnet** i brödtexten. Det är den signal
  som skiljer entiteterna åt.
- **`identifier` i schemat är org.nr.** Gör åtskillnaden maskinläsbar.
- Google Företagsprofil är viktigare här än vanligt, den knyter namnet till Jönköping.
  Underlag: `content/kunder/smamaleri-google-foretagsprofil.md` i huvudrepot.

## Deploy

Mappen är **rot** för ett eget Vercel-projekt, samma upplägg som Bromma:

| Vercel-inställning | Värde |
|---|---|
| Repository | `bahkostudio/bahkobyra` |
| Root Directory | `bahkobyra/cloud/smamaleri` |
| Framework Preset | Other |
| Build Command | (tomt) |
| Output Directory | (tomt) |
| Install Command | (tomt) |

Eftersom mappen är rot serveras filerna direkt på domänen: `/`, `/robots.txt`,
`/sitemap.xml`, `/symbol.svg`, `/logo.png`, `/og-image.png`.

Deploy sker automatiskt vid push till `main`. **Sajten är live**, så en merge går
direkt ut till kunden.

## Domän: www måste omdirigeras

**Öppet problem per 2026-07-27.** `smamaleri.se` (apex) servar den här sajten.
`www.smamaleri.se` servar fortfarande kundens gamla mallsajt.

DNS hos **Simply.com** är redan rätt, alla tre pekar på Vercel (`216.198.79.1`):

| Typ | Namn | Värde |
|---|---|---|
| A | `smamaleri.se` | 216.198.79.1 |
| A | `www.smamaleri.se` | 216.198.79.1 |
| A | `*.smamaleri.se` | 216.198.79.1 |

Vercel dirigerar per domännamn, så `www.smamaleri.se` är tilldelad ett **annat**
Vercel-projekt. Åtgärd, i den ordningen:

1. Hitta projektet som äger `www.smamaleri.se` och ta bort domänen därifrån
2. Lägg till `www.smamaleri.se` i det här projektet
3. Sätt den som **redirect till apex**, inte som egen sajt

Två sajter för samma företag delar signalerna, och med namnkollisionen ovan är det
extra dyrt. Canonical i `index.html` pekar på apex, så www får aldrig bli kanonisk.

**MX-posterna ska aldrig röras.** Kundens e-post går via Google (`SMTP.GOOGLE.COM`)
och SPF, DKIM och DMARC ligger på samma domän.

## Filer

| Fil | Innehåll |
|---|---|
| `index.html` | Hela sajten. Inline CSS och JS, JSON-LD för `HousePainter` |
| `logo.png` | Logotypen med genomskinlig bakgrund. Marinblå text, för **ljusa** ytor |
| `logo-ljus.png` | Samma logotyp med krämfärgad text, för **mörka** ytor |
| `logo-ord.png` | Enbart ordbilden, utan huset |
| `symbol.svg` | Bara märket, kvadratiskt. Primär favicon |
| `favicon.png` | 512 px, märket på marinblå botten. Reserv där SVG inte tas emot |
| `apple-touch-icon.png` | 180 px, solid botten eftersom iOS inte hanterar genomskinlighet |
| `og-image.png` | 1200×630, används av `og:image` och som `image` i schemat |
| `robots.txt` | Tillåter alla crawlers, pekar ut sitemap |
| `sitemap.xml` | En URL, sajten är en one-pager |

Rasterfilerna är genererade ur kundens två logotypfiler: vit bakgrund nycklad till
genomskinlighet, och en ljus variant där marinblått mappats till krämfärg medan guldet
lämnats orört. Källfilerna kom via WhatsApp 2026-07-27.

Headern och laddaren använder inte rasterloggan utan en **inline SVG** av samma märke,
så att taket kan byta färg med CSS när headern går från marinblå till cream.

## Formulären

Sidan har två vägar in: kontaktformuläret i `#cform` och offertmodalen `#pop`. Båda
går genom samma leveranslager.

⚠️ **`CFG.web3forms` är tom, och det är avsiktligt.** Nyckeln som föreslogs
2026-07-27 (`62471305-…`) är **Bromma Trädgårdsservices** och levererar till
`jens@brommatradgardsservice.se`. Hade den lagts in här skulle Smålands Måleris
offertförfrågningar hamna hos Jens.

Skapa en **ny** access key på web3forms.com med mottagare `kontakt@smamaleri.se` och
klistra in den i `CFG` i `index.html`. Tills dess levererar båda formulären via
`mailto` och SMS, och kvittensen säger "Ett steg kvar" i stället för att påstå att
förfrågan är mottagen.

Ett honeypot-fält (`#pf-hp`) fångar bottar i modalen. Är det ifyllt skickas ingenting.

Offertmodalen visas tre gånger per besökare, sedan aldrig mer: efter 22 sekunder första
gången och 60 sekunder de två följande. Räknaren (`smamaleri_pop_count` i
`localStorage`) stegas bara när modalen faktiskt öppnas.

## Att göra

- [ ] **Web3Forms-nyckel för kontakt@smamaleri.se.** Tills den finns tappas inga leads,
      men varje besökare måste klicka en gång extra
- [ ] **www-omdirigeringen ovan.** Viktigast av allt just nu
- [ ] Byt ut de AI-genererade bilderna mot kundens egna jobbfoton. De ligger på
      CloudFront och är Higgsfield-genererade. De får aldrig påstås vara utförda arbeten
- [ ] Bekräfta ortlistan med kunden. Bankeryd och Vaggeryd står i chipsen men nämns
      ingenstans i copyn. "Hela Småland" är borttaget, ett överbrett område skadar aktivt
- [ ] Google Företagsprofil, se underlaget i `content/kunder/`
- [ ] Komplettera schema med `openingHoursSpecification` och `geo` när kunden bekräftat
      öppettider. `identifier` är klart
- [ ] Bing Places och Bing Webmaster Tools
- [ ] Verifiera i Google Search Console att `noindex` är borta och att sidan indexeras.
      Den låg med `noindex, nofollow` medan sajten var live, så den har aldrig indexerats

Optimeringsordning och evidensgrader: se `.claude/skills/optimering/` i huvudrepot.
