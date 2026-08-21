# 🔒 Heligt — rör aldrig utan uttryckligt beslut

Allt nedan får ALDRIG ändras, flyttas eller raderas utan Mathias uttryckliga ja i den aktuella
sessionen. Listan flyttades hit ur `CLAUDE.md` 2026-08-21 för att kartan skulle bli lättare att
läsa — **frågan gäller precis som förut.** Trädet i `CLAUDE.md` märker varje låst plats med 🔒, så
du ser vad som är skyddat utan att öppna den här filen.

Två av posterna har redan tagit ner sajten en gång var. Det är därför de står här.

- **`bahkobyra/cloud/smamaleri/` + `brommatradgardsservice/`** — betalande kunders domäner. Egna
  Vercel-projekt med Root Directory på exakt de sökvägarna. Se `bahkobyra/LASMIG.md`.
- **`web/public/cloud/` + `web/app/(demo)/`** — varje mapp är en länk som ligger i någons inkorg.
  De 8 frysta (`alfredallservice`, `asmar`, `bygg`, `kmctransport`, `osterlunds`,
  `pizzeriamatstugan`, `tryggbyggservice`, `vajjebygg`) rörs inte alls; övriga får förbättras på
  beställning men aldrig raderas eller brytas.
- **`.github/workflows/deploy.yml` + `.claude/skills/video-to-website/maykas/site/`** — deployar
  maykaskitchen.se live vid varje push till main.
- **localStorage-nycklarna `bb_crm_v2` + `bahko_sop_dagslogg_v1`** — bryts kontraktet tappar
  Mathias sin CRM-data och sina dagsloggar.
- **`web/next.config.mjs` + `web/vercel.json`** — styr vad bahkobyra.se OCH bahkobyra.cloud
  serverar. (Rotens `vercel.json` läses inte av något projekt — raderingskandidat, men i eget beslut.)
- **De tre Root Directory-inställningarna** — incidenten 2026-08-06/07 tog ner hela bahkobyra.se.
  Ändras aldrig från kod eller API.
- **`web/public/css/style.css` + `web/public/js/main.js`** — frysta, delas med `cloud/bygg`. Egna
  sidor kör `style-v2.css` / `main-v2.js`.
- **`reference/`-PDF:erna** — levande källdokument, inte skräp.

## Sammanhanget bakom låsen

De tre Root Directory-inställningarna och host-rewritesen hänger ihop — se avsnittet
"Tre Vercel-projekt bygger samma repo" i `CLAUDE.md` för tabellen över vilket projekt som bygger
vad. Kundsajternas egna varning bor i `bahkobyra/LASMIG.md`.
