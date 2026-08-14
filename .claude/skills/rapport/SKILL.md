---
name: rapport
description: Use when someone asks to generate a report, create a competitor analysis, create a client report, create a lead profile, analyze a company, "generera rapport", "konkurrensanalys", "klientrapport", "lead-rapport", or "analysera [företag/lead]".
argument-hint: [företagsnamn eller URL]
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

Om argumentet (`$1`) är satt, tolka det som företags-/lead-namn eller URL.

Om typ är oklar, fråga:
- "Vilken typ av rapport? (1) Konkurrensanalys (2) Klientrapport (3) Lead-profil"
- "Vad ska rapporten handla om? (företagsnamn, URL, eller lead-namn)"

### 2. Kör research-verktyget

**Konkurrensanalys:**
```bash
node tools/competitor_research.js
```
Läser `.env` för `PERPLEXITY_API_KEY` + `SERPAPI_KEY`.
Output: `.tmp/research_raw.json`

Verktyget tar inga argument och gör alltid en generell marknadsanalys. För att avgränsa till ett specifikt företag: scrapa företaget separat och väv ihop med research-datan i steg 3:
```bash
npx -y firecrawl-cli@latest scrape [URL] --formats markdown
```

**Klientrapport:**
Samla in från användaren:
- Klientens namn och webbplats
- Period (t.ex. "mars 2026")
- Nyckeltal om tillgängliga (trafik, offertförfrågningar, konverteringar)

Scrapa klientens webbplats med Firecrawl för att hämta aktuell info:
```bash
npx -y firecrawl-cli@latest scrape [URL] --formats markdown
```

Bygg rapport-innehållet baserat på insamlad data + användarens nyckeltal.

**Lead-profil:**
```bash
node tools/enrich_leads.js --id=[lead-id]
```
Eller om du har ett företagsnamn/URL, scrapa och analysera direkt:
```bash
npx -y firecrawl-cli@latest scrape [URL] --formats markdown
```
Kombinera med Perplexity-research om företaget.

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
- Offertförfrågningar: [siffror]
- Konverteringsgrad: [%]

## Genomförda aktiviteter
[Lista vad som gjordes]

## Nästa period
[Prioriterade åtgärder]
```

**Lead-profil — struktur (Google Sheets-rader):**
```
Företagsnamn | Webb | Stad | Tjänster | Nuvarande webbstatus | Möjligheter | Kontakt | Prioritet
```

### 4. Exportera till Google Docs/Sheets

Spara först rapportinnehållet till `.tmp/rapport_content.json`. Formatet beror på exporttyp (verifierat mot `tools/export_to_google_docs.js`):

**För Docs** (konkurrensanalys, klientrapport):
```json
{ "markdown": "<hela rapporten som markdown-sträng>" }
```

**För Sheets** (lead-profil):
```json
{
  "headers": ["Företagsnamn", "Webb", "Stad", "Tjänster", "Nuvarande webbstatus", "Möjligheter", "Kontakt", "Prioritet"],
  "rows": [{ "Företagsnamn": "...", "Webb": "...", "Stad": "..." }]
}
```
Varje rad är ett objekt med headers som nycklar — saknade nycklar blir tomma celler.

Kör sedan export-verktyget:
```bash
node tools/export_to_google_docs.js --type=[docs|sheets] --title="[rapportnamn]"
```

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
- Export-verktyget skapar alltid en NY fil (det kan inte uppdatera befintliga) — kör aldrig exporten två gånger med samma titel, lägg datum-/versionssuffix i `--title`
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
