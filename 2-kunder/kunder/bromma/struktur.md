# Bromma Trädgårdsservice — sajtstruktur

Byggd ur `sitemap.xml` + sidornas egna `<title>`-taggar i
`bahkobyra/cloud/brommatradgardsservice/` (2026-08-26).

| Sida | URL | Titel |
|---|---|---|
| Startsida | `/` | Trädgårdsservice i Bromma och Stockholm \| Bromma Trädgårdsservice |
| Trädgårdsskötsel | `/tradgardsskotsel/` | Trädgårdsskötsel i Bromma och Storstockholm \| Bromma Trädgårdsservice |
| Häckklippning | `/hackklippning/` | Häckklippning, häckplantering och borttagning i Bromma \| Bromma Trädgårdsservice |
| Skötselavtal BRF | `/tradgardsskotsel-brf/` | Skötselavtal för BRF och fastighetsägare i Stockholm \| Bromma Trädgårdsservice |

4 sidor totalt, platt struktur (ingen undernivå). `offert.js` + `sida.css` delas
av tjänstesidorna. `llms.txt` i domänroten (AEO/GEO-fil för AI-crawlare) —
innehållet där är den enda tillåtna prisfaktakällan för content om Bromma.

Uppdatera den här filen när en sida läggs till eller tas bort — den ska alltid
spegla `sitemap.xml`.
