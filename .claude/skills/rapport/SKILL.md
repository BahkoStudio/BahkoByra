---
name: rapport
description: Use when someone asks to generate a report, create a competitor analysis, create a client report, create a lead profile, analyze a clinic, "generera rapport", "konkurrensanalys", "klientrapport", "lead-rapport", or "analysera [klinik/lead]".
argument-hint: [klinik-namn eller URL]
disable-model-invocation: false
---

# Rapport-skill

Genererar tre typer av rapporter och exporterar till Google Docs/Sheets.

## Rapport-typer

| Typ | Trigger-ord | Output |
|-----|-------------|--------|
| Konkurrensanalys | "konkurrensanalys", "analysera marknaden", "konkurrenter" | Google Docs |
| Klientrapport | "klientrapport", "månadsrapport", "rapport för [klient]" | Google Docs |
| Lead-profil | "lead-rapport", "prospekt-rapport", "analysera lead" | Google Sheets |

---

## Steg

### 1. Identifiera rapport-typ och mål

Om argumentet (`$1`) är satt, tolka det som klinik/lead-namn eller URL.

Om typ är oklar, fråga:
- "Vilken typ av rapport? (1) Konkurrensanalys (2) Klientrapport (3) Lead-profil"
- "Vad ska rapporten handla om? (kliniknamn, URL, eller lead-namn)"

### 2. Kör research-verktyget

**Konkurrensanalys:**
```bash
node tools/competitor_research.js
```
Läser `.env` för `PERPLEXITY_API_KEY` + `SERPAPI_KEY`.
Output: `.tmp/research_raw.json`

Om du vill avgränsa till en specifik klinik, be användaren bekräfta och kör sedan:
```bash
node tools/competitor_research.js --target="[kliniknamn]"
```
(om `--target`-flaggan finns, annars gör en generell analys)

**Klientrapport:**
Samla in från användaren:
- Klientens namn och webbplats
- Period (t.ex. "mars 2026")
- Nyckeltal om tillgängliga (trafik, bokningar, konverteringar)

Scrapa klientens webbplats med Firecrawl för att hämta aktuell info:
```bash
npx -y firecrawl-cli@latest scrape [URL] --formats markdown
```

Bygg rapport-innehållet baserat på insamlad data + användarens nyckeltal.

**Lead-profil:**
```bash
node tools/enrich_leads.js --id=[lead-id]
```
Eller om du har ett kliniknamn/URL, scrapa och analysera direkt:
```bash
npx -y firecrawl-cli@latest scrape [URL] --formats markdown
```
Kombinera med Perplexity-research om kliniken.

### 3. Generera rapport-innehåll

Skapa strukturerat innehåll baserat på research-data.

**Konkurrensanalys — struktur:**
```
# Konkurrensanalys: [Ämne]
Datum: [DATUM]

## Sammanfattning
[3-5 meningar om marknadsläget]

## Nyckelaktörer
| Aktör | Styrkor | Svagheter | Priser |
|-------|---------|-----------|--------|

## Prisjämförelse
[Tabell med tjänster och prisintervall]

## Gaps & Möjligheter
[Konkreta möjligheter för Bahko Byrå]

## Rekommendation
[Vad Bahko Byrå bör göra baserat på analysen]
```

**Klientrapport — struktur:**
```
# Månadsrapport: [Klientnamn] — [Period]

## Resultat denna period
- Trafik: [siffror]
- Bokningar: [siffror]
- Konverteringsgrad: [%]

## Genomförda aktiviteter
[Lista vad som gjordes]

## Nästa period
[Prioriterade åtgärder]
```

**Lead-profil — struktur (Google Sheets-rader):**
```
Kliniknamn | Webb | Stad | Tjänster | Nuvarande webbstatus | Möjligheter | Kontakt | Prioritet
```

### 4. Exportera till Google Docs/Sheets

Kör export-verktyget:
```bash
node tools/export_to_google_docs.js --type=[docs|sheets] --title="[rapportnamn]"
```

Verktyget läser innehållet från `.tmp/rapport_content.json` och exporterar.

**Första gången (Google OAuth-setup):**
Om `credentials.json` saknas, guida användaren:
1. Gå till [console.cloud.google.com](https://console.cloud.google.com)
2. Skapa projekt → Aktivera Google Docs API + Google Sheets API
3. Skapa OAuth2-credentials (Desktop app)
4. Ladda ner `credentials.json` → lägg i projektets root
5. Kör export-verktyget — det öppnar en browser för autentisering
6. `token.json` sparas automatiskt för framtida körningar

---

## Guardrails

- Kör aldrig `competitor_research.js` utan att bekräfta med användaren — det gör API-anrop som kostar pengar
- Om `PERPLEXITY_API_KEY` saknas i `.env`, stoppa och informera användaren
- Spara alltid rådata till `.tmp/` innan export — aldrig direkt till Google
- Skapa aldrig ny Google Docs-fil om det redan finns en med samma namn i sessionen — uppdatera befintlig istället
- Lead-profiler exporteras alltid till Sheets, aldrig till Docs (tabelldata)

---

## Felsökning

| Fel | Åtgärd |
|-----|--------|
| `credentials.json not found` | Se Google OAuth-setup ovan |
| `PERPLEXITY_API_KEY missing` | Öppna `.env`, lägg till nyckeln |
| `rate limit` från Perplexity | Vänta 60 sek, kör igen |
| Firecrawl timeout | Prova med `--timeout=30000` flaggan |
| Google API `403 insufficient permissions` | Gå igenom OAuth-setup på nytt, välj rätt scopes |
