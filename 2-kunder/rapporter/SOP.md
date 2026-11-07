# SOP: Rapporter & uppföljning

**Varför:** en kund som betalar varje månad måste se svart på vitt vad den får. Rapporten
är det enda bevis kunden ser, så den är lika viktig som själva arbetet.

## Vilken rapport, för vilken kund

| Kund | Rapport | Dag | Hur |
|---|---|---|---|
| Bromma Trädgårdsservice | Veckorapport, 2 sidor PDF. **Sista rapporten 2026-10-18** (rapport 12, täcker v41–v42), samarbetet slutar efter vecka 42 | Söndag | Mallen är `rapport10-bromma.html` i `OneDrive/1 Bahko Byrå/Kunder/Bromma Trädgårdsservice/Rapporter/HTML-källor/` (med teaserbilderna bredvid). Edge till PDF, till Drive "05 Rapporter och planer" |
| GD Måleri | Veckorapport, 1 sida PDF | Söndag | `node tools/gd-rapport/hamta.mjs` och `bygg.mjs`, se `tools/gd-rapport/README.md` |
| Ny kund med månadsavgift | Månadsrapport, 1 sida PDF | Första vardagen i månaden | GD-verktyget är byggt bara för GD. Det måste först göras generellt (kunden som parameter), annars görs månadsrapporten för hand |

Varje rapportdag ligger i `web/public/crm-f2822a6f3a/atagande.json`, så dashboarden varnar
när en rapport förfaller.

## Vad en rapport alltid innehåller

1. **Förfrågningarna** (formulär, samtalsklick, mejlklick), jämfört med perioden innan. Det är
   kundens viktigaste siffra, den står först.
2. **Google:** visningar, klick och de sökord kunden syns på (Search Console), placering på
   kundens huvudsökning.
3. **Vad vi gjorde** den här perioden, högst fyra punkter.
4. **Vad vi gör nästa** period, högst tre punkter.

Inget annat. Hellre en sida som läses än tre som inte gör det.

**Undantag, contentkunder** (som Bromma från rapport 10): vad som gått ut, vad det gav och vad
som kommer. Google-siffror bara när vi har åtkomst till dem.

## Innan den skickas

- Antalet förfrågningar tas från Web3Forms (Submissions) och bokningsverktyget. GA4 visar bara
  klick och beteende, och räknar bara besökare som sagt ja till kakor.
- Siffrorna ser rimliga ut (jämför med förra rapporten). Ögonläs PDF:en, texten kan klippas tyst.
- Inga påhittade siffror, inga förutsägelser om placering.
- **Mejltext på högst två meningar** bifogas: mening ett säger vad som ligger bifogat, mening
  två det enda kunden behöver göra eller veta. Mathias mejlar själv.
- Rapporten arkiveras bara i kundens Drive, aldrig i repot (repot är publikt).
