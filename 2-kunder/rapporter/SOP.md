# SOP: Rapporter & uppföljning

**Varför:** en kund som betalar varje månad måste se svart på vitt vad den får. Rapporten
är det enda bevis kunden ser, så den är lika viktig som själva arbetet.

## Vilken rapport, för vilken kund

| Kund | Rapport | Dag | Hur |
|---|---|---|---|
| Bromma Trädgårdsservice | Veckorapport, 2 sidor PDF | Söndag | HTML-mallen i `kunder/bromma/rapporter/` (senaste rapportens HTML är mallen), Edge till PDF, till Drive "05 Rapporter och planer" |
| GD Måleri | Veckorapport, 1 sida PDF | Söndag | `node tools/gd-rapport/hamta.mjs` och `bygg.mjs`, se `tools/gd-rapport/README.md` |
| Ny kund med månadsavgift | Månadsrapport, 1 sida PDF | Första vardagen i månaden | Samma upplägg som GD-verktyget, en sida |

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

## Innan den skickas

- Siffrorna ser rimliga ut (jämför med förra rapporten). Ögonläs PDF:en, texten kan klippas tyst.
- Inga påhittade siffror, inga förutsägelser om placering.
- **Mejltext på högst två meningar** bifogas: mening ett säger vad som ligger bifogat, mening
  två det enda kunden behöver göra eller veta. Mathias mejlar själv.
- Rapporten arkiveras i kundens Drive och i `kunder/<kund>/rapporter/`.
