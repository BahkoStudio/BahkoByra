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

### Fälla: cream-blixten i marquee-bandet

Marquee-bandet blinkade vitt en kort stund innan svepet öppnade. Orsaken var att
`gsap.fromTo` klippte bort **hela** `.marquee` med `clip-path`. Bandet är en fristående
`div` med egen marinblå bakgrund, inte innehåll i en `.dark`-sektion, så när det klipptes
bort fanns ingen mörk yta kvar och `html{background:var(--cream)}` lyste igenom.

Fixat genom ett extra lager, `.marquee-clip`, som klipps i stället. Bandets marinblå yta
ligger alltid kvar. Klipper du något igen: kontrollera vad som finns **bakom** elementet,
inte bara att animationen ser rätt ut i slutläget.

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
| `logo.png` | Original, genomskinlig bakgrund, marinblå text. Arkiv, används inte på sajten |
| `logo-ljus.png` | Original med krämfärgad text. Arkiv |
| `logo-ord.png` | Enbart ordbilden, utan huset. Arkiv |
| `logo-ljus-340.png` | **Headern** på marinblå botten, 7 kB |
| `logo-mork-340.png` | **Headern** efter scroll, när den blivit cream, 6 kB |
| `logo-ljus-840.png` | **Laddaren**, 22 kB |
| `logo-ljus-1160.png` | **Sidfotens** stora ordbild, 27 kB |
| `favicon.png` | 512 px, märket på marinblå botten. Primär favicon |
| `apple-touch-icon.png` | 180 px, solid botten eftersom iOS inte hanterar genomskinlighet |
| `og-image.png` | 1200×630, används av `og:image` och som `image` i schemat |
| `robots.txt` | Tillåter alla crawlers, pekar ut sitemap |
| `sitemap.xml` | En URL, sajten är en one-pager |

Rasterfilerna är genererade ur kundens två logotypfiler: vit bakgrund nycklad till
genomskinlighet, och en ljus variant där marinblått mappats till krämfärg medan guldet
lämnats orört. Källfilerna kom via WhatsApp 2026-07-27.

**Kundens riktiga logotyp används överallt**, inte en efterliknelse. En tidigare version
hade en handritad inline-SVG av märket i headern och laddaren; den är helt borta sedan
2026-07-27 tillsammans med all `.mark-*`-CSS.

De visningsfilerna är nedskalade och kvantiserade till 64 färger. Logotypen har få
färger, så det syns inte, men originalet på 377 kB blev 6 till 27 kB. Det spelar roll:
den största filen laddas i headern på varje sidvisning.

**Headern har båda färgvarianterna stackade.** Den går från marinblå till cream vid
scroll, och den marinblå ordbilden skulle försvinna in i den marinblå headern. Därför
korsfadar `.brand-ljus` och `.brand-mork` på `.hdr.scrolled`.

Laddaren visar `logo-ljus-840.png` och stryker fram den vänster till höger med
`clip-path`, som ett penseldrag. Bilden ligger bortklippt i CSS för att kunna avslöjas,
så vägen utan GSAP och vid reduced motion **måste** nolla klippningen. Utan den raden
står laddaren tom i tre sekunder.

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

## Mätning

`CFG.ga4` är `G-N3EM5QZZBJ`, ifyllt 2026-07-27.

⚠️ **Googles egen kodsnutt är medvetet INTE inklistrad.** Den laddar `gtag` direkt och
sätter kakor innan besökaren svarat, vilket kräver samtycke i Sverige. Här laddas
mätkoden först efter att besökaren klickat Acceptera i `#cbar`. Ingen begäran går till
Google innan dess, och därför klarar sajten sig utan kakhantering i övrigt. Valet sparas
i `localStorage` under `sm-consent`. Tom `CFG.ga4` = ingen ruta, ingen mätkod, inga kakor.

Händelser som loggas: `ring_klick` (varje klick på ett telefonnummer, med `plats`),
`offert_oppnad`, `offert_skickad`, `offert_reservlage`, `formular_skickat`,
`formular_reservlage`, `reservvag_mejl`, `reservvag_sms`.

`offert_skickad` och `formular_skickat` är de riktiga konverteringarna. Web3Forms räknar
dessutom varje inskickad förfrågan oavsett samtycke, så antalet leads går alltid att
stämma av även om analysdatan är ofullständig.

Händelser som sker innan samtycke köas i `window.__ko` och skickas när GA laddas.
**Fälla:** i första versionen skrevs den ena förekomsten med kyrilliskt `о` i stället för
latinskt `o`. Koden kastade inget fel, kön flushades bara aldrig. Icke-ASCII i
identifierare är en tystnadsbugg, kontrollera den vid varje ändring här.

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
