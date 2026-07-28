# Workflow: Local SEO / GBP-leverans (INTERN)

Hur vi faktiskt levererar "Växa på Google" — som **intern leverans** (uppsell efter hemsidan) och som underlag
för **bahkobyra.se:s** växa-på-google-copy/lead magnet. Distillerat från `reference/Local_SEO_Workflow.pdf`
+ `reference/BM_Challenge.pdf`. **OBS:** detta är leverans/copy för bahkobyra.se — INTE outreach-säljbudskapet.
Front-offern i outreach/DM = hemsidor (se `workflows/sales_methodology.md`).

## Objektiv

Ranka ett lokalt företag i topp 3 på Google Maps (och stärka organisk synlighet) genom tre pelare.
Vi kör **white hat** — följer Googles regler (annars riskerar kundens profil att bannas).

## Princip

> "Var trollkarlen, men visa aldrig magin bakom kulisserna."

80%+ av alla företag i varje kategori är inkompetenta på det här. Lägger du 20 min där de lagt 0,
har du investerat *oändligt* mycket mer. Det räcker långt. Du måste bara vara bättre än andra
[målare/takläggare], inte bättre än världens bästa marknadsförare.

---

## Steg 0: Benchmark (innan & efter)

- Kör en heatmap (Leadsnap/BrightLocal) på huvud-keyword. Spara "status quo"-screenshot för case study.
- Notera topp-10: antal recensioner, antal foton, ev. blackhat-aktörer.
- Sätt kalenderhändelse: "efter 4 veckor"-screenshot.

---

## Pelare 1: Google Business Profile (GBP)

1. **Huvud-keyword** — välj termen att ranka för ("[tjänst] [stad]"). Verifiera med kund vid tvekan.
2. **Konkurrentanalys** — GMB Everywhere-plugin → local scan på keyword. Se snitt antal kategorier (oftast ~2).
3. **Business Name** — matcha verkligt namn. Mixtra bara om allt annat uttömt.
4. **Kategori** — 1 huvudkategori + 0–3 underkategorier. Inte fler (utspädning).
5. **Komplettera profilen** — full adress, telefon, hemsida, öppettider → grön cirkel. Minst 3/5 profilfeatures.
6. **Services** — bygg lista (max 99). GMB Everywhere category-tool → relaterade tjänster. Avdedupa med AI.
   Lägg beskrivning (≤300 tecken) på topp-20. Topp-rankande har ofta ~30 tjänster listade.
7. **Bookings** — länka "kontakta oss" för extra profilfeature.
8. **FAQ** — AI-genererade Q&A för nisch + plats.
9. **Posts** — minst 1–2/vecka. Geotagga foton (geoimgr.com / geosetter.de) för områden du vill ranka.

---

## Pelare 2: On-page SEO

**Basic (första körning):**
- **Title tag:** `BÄSTA + huvudkategori + stad + företagsnamn + främsta tjänster + nära mig` (~150–200 tecken).
- **H1:** huvudkategori + stad. **H2:** sekundära kategorier + främsta tjänster.
- **NAP** (Namn/Adress/Telefon) konsekvent på startsida + i footer på varje sida.
- **Inbäddad Google-karta** på startsidan.
- Minst ~30 indexerade sidor (`site:domän.se` i Google). Schema markup (validator.schema.org).

**Advanced (om topp-3 inte nås på några veckor):**
- Bygg ut sidantal: varje tjänst får egen sida (1500–2500 ord, interlänkade).
  Hierarki: startsida → kategori/serviceområde → tjänstesidor.
- **Topical authority:** prata om alla relaterade ämnen i nischen (egna undersidor).
- **Local authority:** "Områden vi servar"-sida + undersida per område/stadsdel (1200–2200 ord).
- **Interlänkning:** länka tjänster ↔ områden med naturlig ankartext. Max 8–10 länkar/sida, variera texten.

AI-prompts för service-/authority-sidor finns i `reference/Local_SEO_Workflow.pdf` (sid 22–26).

---

## Pelare 3: Citations

Google letar high-trust-sajter som pekar mot kunden. Konsekvent NAP överallt (Namn/Adress/Telefon).

**80/20 (måste-ha, gör manuellt, kund verifierar mejl):**
Bing Places, Apple Business Connect, Foursquare, Yelp, (+ lokala motsvarigheter).

**Hitta högst-värde-citations:** sök ditt keyword, kolla topp-20 organiska — directories/listor som rankar
(t.ex. branschkataloger) är guld att synas på. Kolla även konkurrenters backlink-profil ("More about" på GBP).

En stark citation > 50 svaga. Kvalitet > kvantitet. De flesta gör aldrig detta → du vinner på default.

---

## Veckoschema (12 veckor → säljsamtal)

| Vecka | Fokus |
|-------|-------|
| 1 | Benchmark |
| 2–4 | GBP (start → komplettering → översikt) |
| 5–8 | On-page SEO (basics → struktur → komplettering → översikt) |
| 9–10 | Citations |
| 11 | Ranking-översikt |
| 12 | Grand översikt + prep för uppsell-samtal |

Veckovis uppdatering till kund varje update-dag. Be kund om: (1) löpande recensioner, (2) nya bilder/vecka.

---

## Koppling till verktyg

- `tools/generate_audit.js --type=gbp` — producerar GBP-auditen vi använder som leverans-underlag (uppsell)
  och för bahkobyra.se:s växa-på-google-innehåll.
- bahkobyra.se:s lead magnet (gratis granskning/guide) bor i `bahkobyra/foretag/`.
- Sälj-/offer-logik: `workflows/sales_methodology.md`. Cadence: `workflows/outreach_cadence.md`.
