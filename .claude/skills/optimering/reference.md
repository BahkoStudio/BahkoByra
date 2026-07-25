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
