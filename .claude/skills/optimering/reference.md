# Optimering — referens

Detaljunderlag till [SKILL.md](SKILL.md). Läses vid behov, inte varje gång.

Källa: korsgranskad kartläggning juli 2026. Fyra parallella utredningar med källsökning, var och en granskad av en separat skeptiker med uppdrag att skilja dokumenterat från branschmyt.

---

## Evidenstabell

| Påstående | Status | Not |
|---|---|---|
| AI-crawlers kör inte JavaScript | **Dokumenterat** | Vercel/MERJ, 500M+ crawls. GPTBot laddar JS i ~11 % av anrop, ClaudeBot ~24 %, men exekverar aldrig. Google/Gemini är undantaget |
| Primärkategori styr local pack | **Dokumenterat** | Googles egen dokumentation om kategorier |
| Recensioner påverkar lokal ranking | **Dokumenterat** | GBP-faktor |
| Självbetjänande recensioner otillåtna i schema | **Dokumenterat** | Googles strukturerad data-policy, sedan 2019 |
| FAQ rich results borta för vanliga sajter | **Dokumenterat** | Begränsat till myndighet/hälsa aug 2023, dokumentation deprecerad 7 maj 2026 |
| BreadcrumbList desktop-only | **Dokumenterat** | Jan 2025 |
| `WebSite`/`SearchAction` avvecklat | **Dokumenterat** | 21 nov 2024 |
| Google stödjer inte llms.txt | **Dokumenterat** | Gary Illyes, juli 2025. Mueller om Content Signals: "no effects whatsoever" (juli 2026) |
| Google-Extended påverkar inte Search | **Dokumenterat** | Googles dokumentation |
| ChatGPT Search lutar mot Bing-index | **Dokumenterat** | |
| Egna URL:er per tjänst slår one-pager | **Sannolikt** | Passage-retrieval är verkligt. "2–4x fler citeringar" är leverantörssiffra utan metod |
| Områdessidor krävs för service area business | **Sannolikt** | Flera oberoende källor, ingen kontrollerad studie |
| Schema ger fler AI-citeringar | **Spekulation** | Ahrefs maj 2026: ingen positiv effekt, snarast svagt negativ. Schema läses, men driver inte citering |
| "GBP = 32 % av rankingvikten" | **Spekulation** | Whitespark är en åsiktsenkät: 47 konsulter poängsätter 187 faktorer. Ingen mätning, ingen korrelationsdata |
| "Citerar källor ger +30–40 % AI-synlighet" | **Spekulation** | Princeton-studien mäter på syntetiska korpusar, inte på riktiga AI-svar i produktion |
| llms.txt förbättrar citering | **Spekulation, lutar mot nej** | Försumbar crawler-trafik mot filen i mätningar |
| AI Overviews och AI Mode är Google Search, inte separata motorer | **Dokumenterat** | Googles egen optimeringsguide. Samma index, crawling och ranking, AI-teknik ovanpå |
| AEO och GEO är branschetiketter, inte Google-system | **Dokumenterat** | Följer av ovan. Optimering för generativ AI-sökning hos Google är SEO |
| Det finns inget AI-specifikt schema | **Dokumenterat** | Googles guide. Schema ger berättigade rich results och tydligare innebörd, inget AI-lyft |
| `noindex` i rå HTML kan stoppa renderingen | **Dokumenterat** | Google kan hoppa över rendering. JS som tar bort taggen hjälper inte |
| Innehåll kan gå bra utan uttalat SEO-arbete | **Dokumenterat** | Googles guide säger det uttryckligen. Motmedel mot checklisteceremoni |
| Chunking av innehåll krävs för AI | **Fel** | Google efterfrågar det inte |
| En sida per fan-out-variant ger täckning | **Fel** | Google avvisar det uttryckligen. Ger tunna dubbletter |

---

## Källkarta

Skillen säger "verifiera om påståendet i primärkällan". Här är primärkällorna.

**Googles guide för generativ AI-sökning** är huvuddokumentet:
`developers.google.com/search/docs/fundamentals/ai-optimization-guide`

| Ämne | URL under `developers.google.com` |
|---|---|
| Search Essentials | `/search/docs/essentials` |
| Tekniska krav | `/search/docs/essentials/technical` |
| Spampolicyer | `/search/docs/essentials/spam-policies` |
| Hjälpsamt, tillförlitligt, människa först | `/search/docs/fundamentals/creating-helpful-content` |
| AI-genererat innehåll | `/search/docs/fundamentals/using-gen-ai-content` |
| Så fungerar Google Search | `/search/docs/fundamentals/how-search-works` |
| JavaScript-SEO | `/search/docs/crawling-indexing/javascript/javascript-seo-basics` |
| Crawl budget | `/crawling/docs/crawl-budget` |
| Sidupplevelse | `/search/docs/appearance/page-experience` |
| Bild-SEO | `/search/docs/appearance/google-images` |
| Video-SEO | `/search/docs/appearance/video` |
| Företagsuppgifter | `/search/docs/appearance/establish-business-details` |

Övrigt: agentvänliga sajter `web.dev/articles/ai-agent-site-ux`, Merchant Center uppladdningsmetoder `support.google.com/merchants/answer/11586438`.

**Regel:** citerar du en siffra eller en policy på en kundsajt, slå upp den här först. Det är också det som gör texten svår för en konkurrent att kopiera, för de har inte gjort det.

---

## Googles pipeline, och var man tappar

Att veta ordningen gör felsökningen snabb, för fel i ett tidigt steg gör allt senare arbete meningslöst.

1. **Upptäckt.** Länkar, sitemaps, omdirigeringar.
2. **Crawl.** Googlebot hämtar sidan och de resurser den behöver, även CSS, JS och bilder.
3. **Rendering.** JavaScript körs vid behov. Google är undantaget bland AI-crawlers här.
4. **Indexering.** Text, bilder, video, metadata, canonical-kluster, språk, plats.
5. **Servering.** Ranking för frågan.
6. **Generativa ytor.** Hämtar ur indexet och genererar svar med länkar till källorna.

**Fälla värd att skriva upp:** står `noindex` i den **råa** HTML:en kan Google hoppa över renderingen helt. Att låta JavaScript ta bort taggen senare fungerar alltså inte. Vi har haft en skarp kundsajt liggande med `noindex` i headen, och den hade aldrig kunnat indexeras.

---

## Agentberedskap

Nytt område, och relevant för oss eftersom våra mallar är animationstunga. Webbläsaragenter läser skärmbild, DOM och tillgänglighetsträd. En sida som fungerar för en skärmläsare fungerar oftast för en agent.

- [ ] Knappar är `<button>`, navigation är `<a href>`, inte klickbara `<div>`
- [ ] Kan inte semantiska element användas: korrekt `role`, `tabindex`, etikett och tillstånd
- [ ] Formulärfält har `<label for>`, namn och synliga tillstånd
- [ ] Tillstånd som ändras vid offertförfrågan, filtrering eller bokning syns i gränssnittet
- [ ] Layouten hoppar inte under uppgiften
- [ ] Genomskinliga overlays och sticky-element täcker inga kontroller
- [ ] Kritisk information finns som text, inte bara i bild, canvas eller video
- [ ] Interaktiva element är synligt tillräckligt stora och har `cursor:pointer`
- [ ] Namn och roller i tillgänglighetsträdet matchar det man ser

Vår vanligaste avvikelse: `onclick` på ett `<a href="#">` i stället för en riktig knapp. Fungerar för mus, inte för tangentbord eller agent.

---

## Medie-SEO

**Bilder**
- [ ] Riktiga `<img>` eller `<picture>` med `src`, inte CSS-bakgrunder för innehållsbilder
- [ ] Beskrivande alt-text på meningsfulla bilder
- [ ] Bilden ligger nära den text den hör till
- [ ] Beskrivande filnamn där det är praktiskt
- [ ] Förhandsbild i metadata, inte extrem bildkvot

**Video**
- [ ] Videon är framträdande på sidan, unik titel och beskrivning
- [ ] Giltig tumnagel och stabil video-URL
- [ ] `VideoObject` när det är berättigat
- [ ] Google får hämta filen om förhandsvisning eller nyckelmoment ska fungera

---

## Triageordning när en sajt har många fel

1. **Behörighetsblockerare.** Crawl, index, `200`, `noindex`, robots, inloggningsvägg, canonical-fel.
2. **Innehållets värde.** Commodity-sidor, saknad expertis, tunt eller dubblerat.
3. **Sidförståelse.** Titlar, rubriker, interna länkar, synlig text, mediekontext, schema.
4. **Användarupplevelse.** Mobil, hastighet, påträngande element, tydligt huvudinnehåll.
5. **Rikare ytor.** Bilder, video, Företagsprofil, agentberedskap.
6. **Mätning.** Search Console, URL-inspektion, löpande innehållsgranskning.

Punkt 1 slår allt annat. Är sidan inte indexerbar är resten preliminärt.

---

## Schema: vad som är värt att lägga till

Utgångsläge i våra scroll-cinematic-sajter: `LandscapingBusiness` (eller motsvarande `LocalBusiness`-subtyp), `FAQPage`, `Service`, `Offer`, `City`.

### Komplettera med

```json
{
  "@context": "https://schema.org",
  "@type": "LandscapingBusiness",
  "@id": "https://kunddoman.se/#business",
  "name": "Företagsnamn",
  "alternateName": "Tidigare namn (12 mån efter bolagsändring)",
  "url": "https://kunddoman.se/",
  "logo": "https://kunddoman.se/logo.svg",
  "image": "https://kunddoman.se/bild.jpg",
  "telephone": "+467...",
  "email": "kund@kunddoman.se",
  "priceRange": "$$",
  "identifier": {
    "@type": "PropertyValue",
    "name": "Organisationsnummer",
    "value": "556XXX-XXXX"
  },
  "address": { "@type": "PostalAddress", "addressLocality": "...", "addressRegion": "...", "addressCountry": "SE" },
  "geo": { "@type": "GeoCoordinates", "latitude": 59.33, "longitude": 17.94 },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "07:00", "closes": "17:00"
  }],
  "sameAs": [
    "https://www.google.com/maps/place/...",
    "https://www.instagram.com/...",
    "https://www.hitta.se/...",
    "https://www.allabolag.se/..."
  ],
  "areaServed": [{ "@type": "City", "name": "Ort" }]
}
```

**Viktigt om organisationsnummer:** använd `identifier` med `PropertyValue`, **inte** `vatID`. Svenskt organisationsnummer är inte ett VAT-nummer. VAT-numret är `SE` + orgnr utan bindestreck + `01`.

**`@id`** ger entiteten en stabil identitet över sidor. Använd samma `@id` på alla sidor när sajten växer till flera URL:er.

**`sameAs`** är den enda schema-egenskapen med rimligt stöd för entitetskoppling. Länka bara till profiler som faktiskt finns och är korrekta.

### Vid flera tjänstesidor

Varje tjänstesida får eget `Service`-schema som pekar tillbaka på huvudentiteten:

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Häckplantering",
  "provider": { "@id": "https://kunddoman.se/#business" },
  "areaServed": { "@type": "City", "name": "Stockholm" },
  "description": "..."
}
```

---

## Teknisk checklista

**Innehåll i rå HTML**
- [ ] Nyckelinnehåll syns utan JavaScript (kör skriptet i SKILL.md Steg 2)
- [ ] En `<h1>`, logisk `<h2>`/`<h3>`-hierarki
- [ ] Semantiska taggar: `article`, `section`, `details`
- [ ] Listor är riktiga `<ul>`/`<ol>`, inte `<div>`-rader
- [ ] Jämförbar data i `<table>`, inte i grafiskt utformade rutor

**Indexering**
- [ ] `noindex` borttagen när sajten går skarpt
- [ ] `robots.txt`: `Allow: /` för alla, inga AI-bottar blockerade
- [ ] Canonical pekar på rätt URL på rätt domän
- [ ] Sajten borttagen ur vår egen `sitemap.xml` efter flytt
- [ ] Egen `sitemap.xml` på kundens domän

**Gråzon att städa**
- [ ] `opacity:0` / `visibility:hidden` i statisk CSS på innehållssektioner → flytta till `gsap.set()` i JS så innehållet är synligt om skriptet inte kör

---

## Google Företagsprofil

**Ordning vid uppsättning**
1. Primärkategori, exakt matchande huvudtjänsten
2. Max tre underkategorier
3. Fullständig NAP, identisk med sajt och kataloger
4. Tjänsteområden som orter, bara där kunden faktiskt jobbar
5. Öppettider
6. Foton: riktiga jobb och maskiner, inte stockbilder
7. Tjänstelista med beskrivningar
8. Webbadress, till kundens domän

**Recensionsarbete**
- Be alltid efter avslutat jobb, medan kunden är nöjd
- Direktlänk till recensionsformuläret, inte "sök upp oss på Google"
- Svara på varje recension, även korta
- Omdömen på offertplattformar påverkar inte Google, flytta över kunderna

---

## Mätning

Innan optimering påbörjas, sätt baslinje:

```
# AI-crawlers i serverloggar
grep -E 'GPTBot|OAI-SearchBot|ClaudeBot|Claude-SearchBot|PerplexityBot|Google-Extended' access.log | wc -l
```

- GA4-segment: referrals från `chatgpt.com`, `perplexity.ai`, `gemini.google.com`
- Search Console: verifiera domänen, notera utgångsläget
- Lokal ranking: Chrome DevTools → Sensors → sätt koordinater för orten, sök i inkognito. Gratis. Betalalternativ: Local Falcon (geo-grid), BrightLocal

---

## Vanliga fällor i våra egna mallar

Fynd från granskning av scroll-cinematic-sajter:

1. **Telefonnumret göms på mobil.** `.header-nav{display:none}` under 768px tar med telefonnumret. Bryt ut det som egen knapp.
2. **`text-shadow` lyser igenom gradienttext.** Element med `-webkit-text-fill-color:transparent` visar skuggan genom den transparenta fyllningen, texten blir mörk. Nolla `text-shadow`, använd `drop-shadow` i stället.
3. **Pseudo-element i grid.** `::before` på ett `display:grid`-element blir ett extra grid-item och spräcker kolumnlayouten. Lägg scrimen som `background` i stället.
4. **`scroll-behavior:smooth` + Lenis.** Dubbel interpolering ger hoppig scroll. `scroll-behavior` ska vara `auto`, ankarlänkar går via `lenis.scrollTo()`.
5. **Lenis pausas inte av `overflow:hidden`.** Anropa `lenis.stop()`/`start()` explicit när modal eller meny öppnas.
6. **Videons mitt täckt av text och scrim.** Om videon är säljargumentet: bottenviktad scrim, mindre rubrik, innehåll ankrat i underkant.
