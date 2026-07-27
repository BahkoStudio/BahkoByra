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

## Domän

**Klart per 2026-07-27.** Båda domänerna ligger i Vercel-projektet `smamaleri`:

| Domän | Beteende |
|---|---|
| `smamaleri.se` | Servar sajten |
| `www.smamaleri.se` | **308-omdirigering till apex** |

Canonical i `index.html` pekar på apex, så www kan aldrig bli den kanoniska adressen.

DNS ligger hos **Simply.com**. De auktoritativa namnservrarna (`ns3.simply.com`) svarar
`216.198.79.1` för både apex och www, vilket är Vercels IP. Verifierat direkt mot
Vercels edge med `curl --resolve`, som ger 308 på www och 200 på apex.

**MX-posterna ska aldrig röras.** Kundens e-post går via Google (`SMTP.GOOGLE.COM`)
och SPF, DKIM och DMARC ligger på samma domän.

### Fälla att komma ihåg vid nästa domänfelsökning

Under utredningen pekade allt först mot att www låg i ett annat Vercel-projekt. Det var
fel, och två mätningar avslöjade varför:

1. `curl` mot domänen gav `Server: Simply.com` och HTTP 455. Det var inte Vercel som
   svarade, utan Simplys webbhotell, för att den **lokala resolvern fortfarande hade den
   gamla A-posten cachad** (94.231.103.145, TTL 3600).
2. `nslookup` mot den auktoritativa namnservern gav `216.198.79.1`, alltså rätt värde
   vid källan.

Lärdomen: skilj alltid cache från konfiguration. Fråga den auktoritativa namnservern
direkt, och testa origin med `curl --resolve doman:443:ip` så att DNS hoppas över helt.
Att läsa av vad webbläsaren visar räcker inte, olika resolvers hinner olika långt och då
ser apex och www ut att vara olika sajter fast de inte är det.

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

`CFG.web3forms` är ifylld sedan 2026-07-27 med Smålands Måleris egen access key,
mottagare `kontakt@smamaleri.se`. Nyckeln är en publik identifierare, avsiktligt i
klientkoden, och ger ingen åtkomst till något.

⚠️ **Förväxla den aldrig med Bromma Trädgårdsservices nyckel** (`62471305-…`, ligger i
`bahkobyra/cloud/brommatradgardsservice/`). En Web3Forms-nyckel är låst till en
mottagaradress, så fel nyckel skickar den ena kundens leads till den andra. Det var
nära att hända här: den nyckeln föreslogs först för den här sajten.

Går anropet inte igenom faller båda formulären tillbaka på `mailto` och SMS, och
kvittensen säger "Ett steg kvar" i stället för att påstå att förfrågan är mottagen.

Ett honeypot-fält (`#pf-hp`) fångar bottar i modalen. Är det ifyllt skickas ingenting.

Offertmodalen visas tre gånger per besökare, sedan aldrig mer: efter 22 sekunder första
gången och 60 sekunder de två följande. Räknaren (`smamaleri_pop_count` i
`localStorage`) stegas bara när modalen faktiskt öppnas.

## Att göra

- [x] ~~Web3Forms-nyckel för kontakt@smamaleri.se~~ ifylld 2026-07-27
- [ ] **Skicka en testförfrågan efter deploy** och bekräfta att den landar i
      `kontakt@smamaleri.se`. Nyckeln är inte verifierad end-to-end ännu
- [x] ~~www-omdirigering till apex~~ satt till 308 i Vercel 2026-07-27
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
