# 🔒 Heligt — rör aldrig utan uttryckligt beslut

Allt nedan får ALDRIG ändras, flyttas eller raderas utan Mathias uttryckliga ja i den aktuella
sessionen. Listan flyttades hit ur `CLAUDE.md` 2026-08-21 för att kartan skulle bli lättare att
läsa — **frågan gäller precis som förut.** Trädet i `CLAUDE.md` märker varje låst plats med 🔒, så
du ser vad som är skyddat utan att öppna den här filen.

Sex lås, nedbantat från åtta 2026-08-21. Kvar är bara det som drabbar någon annan än dig själv:
en betalande kund, en länk i en prospekts inkorg, eller din egen CRM-data. Två av posterna har
redan tagit ner bahkobyra.se en gång var — det är därför de står här.

- **`bahkobyra/cloud/smamaleri/` + `brommatradgardsservice/`** — betalande kunders domäner. Egna
  Vercel-projekt med Root Directory på exakt de sökvägarna. Se `bahkobyra/LASMIG.md`.
- **`web/public/cloud/` + `web/app/(demo)/`** — varje mapp är en länk som ligger i någons inkorg.
  De 8 frysta (`alfredallservice`, `asmar`, `bygg`, `kmctransport`, `osterlunds`,
  `pizzeriamatstugan`, `tryggbyggservice`, `vajjebygg`) rörs inte alls; övriga får förbättras på
  beställning men aldrig raderas eller brytas.
- **localStorage-nycklarna `bb_crm_v2` + `bahko_sop_dagslogg_v1`** — bryts kontraktet tappar
  Mathias sin CRM-data och sina dagsloggar.
- **`web/next.config.mjs` + `web/vercel.json`** — styr vad bahkobyra.se OCH bahkobyra.cloud
  serverar. (Rotens `vercel.json` läses inte av något projekt — raderingskandidat, men i eget beslut.)
- **De tre Root Directory-inställningarna** — incidenten 2026-08-06/07 tog ner hela bahkobyra.se.
  Ändras aldrig från kod eller API.
- **`web/public/css/style.css` + `web/public/js/main.js`** — frysta, delas med `cloud/bygg`. Egna
  sidor kör `style-v2.css` / `main-v2.js`.

## Sammanhanget bakom låsen

De tre Root Directory-inställningarna och host-rewritesen hänger ihop — se avsnittet
"Tre Vercel-projekt bygger samma repo" i `CLAUDE.md` för tabellen över vilket projekt som bygger
vad. Kundsajternas egna varning bor i `bahkobyra/LASMIG.md`.

## Avlyft 2026-08-21 (Mathias beslut)

- **`.github/workflows/deploy.yml` + `bahkobyra/cloud/maykaskitchen/`.** Deployen är LIVE —
  en push till main som rör `bahkobyra/cloud/maykaskitchen/` synkar filerna till
  `BahkoStudio/MaykaKitchen` (gren `main`, mappen `.claude/skills/video-to-website/maykas/site`),
  och Vercel-projektet `mayka` bygger om maykaskitchen.se därifrån. Faktumet står kvar med ⚡
  i trädet i `CLAUDE.md`, men det krävs inget ja längre innan man rör filerna.
  **Rättat 2026-08-28:** tidigare stod här att deployen skriver till `gh-pages`. Det gjorde den,
  men ingenting serverar den grenen — DNS pekar på Vercel, inte GitHub Pages. Sajten stod därför
  stilla i tre veckor trots gröna körningar. Workflowen skriver nu till rätt gren.
- **`reference/`-PDF:erna.** Alla tre är spårade i git och går att återställa ur historiken. Ett
  lås som skyddar mot något återställbart är inte ett lås. De står kvar i trädet som levande
  källdokument.
