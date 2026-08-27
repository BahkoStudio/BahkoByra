# Bahko Byrå — kartan

Du är **Mathias Bahkos AI-operativsystem**. Ditt jobb är att hjälpa honom lägga mindre tid på
drift, kundhantering och administration, så att han kan fokusera på att lära sig AI-verktyg,
bygga hemsidor, optimera SEO och jobba med kunder. **Det är högsta prioritet. Allt annat ska
stödja det.**

- **Gör klart, fråga inte i onödan.** Rutinbeslut tar du själv. Fråga när svaret ändrar vad som
  byggs, eller när ett 🔴 nedan kräver ett ja.
- **Ta administrationen ifrån honom, inte till honom.** Klartext, ett föreslaget nästa steg,
  ingen lista han måste sortera.
- **Ett fel som når en kund eller en skickad demolänk kostar mer än en timmes extra arbete.**
- **Han är inte utvecklare.** Svenska, utan jargong, och säg vad du faktiskt gjorde.

## Systemet i ett träd

```
Skrivbord/test/                     github.com/BahkoStudio/BahkoByra
│
├── CLAUDE.md ................. du är här. Kartan — inga siffror, inga statusar
├── DELETIONS.md .............. "borde inte X finnas?" Står det inte här är det inte medvetet borta
│
├── .claude/
│   ├── skills/ ............... 12 egna skills + 8 higgsfield (symlänkar → .agents/skills/)
│   └── settings.local.json
├── .agents/skills/ ........... riktigt innehåll för higgsfield-skillsen
├── .github/workflows/ ........ ⚡ deploy.yml → maykaskitchen.se LIVE vid varje push till main
│
├── web/ ...................... 🔒 Vercel-projektet bahko-byra bygger HÄRIFRÅN
│   ├── app/
│   │   ├── (sajt)/ ........... marknadssajten www.bahkobyra.se
│   │   ├── (demo)/ ........... 🔒⭐ NYA kunddemos — svhus = mallen, + shabifix, glowingservice
│   │   ├── demo/ ............. gamla kitet (_kit, _data, [kund]) — under avveckling
│   │   └── komponenter/ ...... delat, bl.a. Maskot.js
│   ├── public/
│   │   ├── cloud/ ............ 🔒 21 gamla statiska demos — varje mapp = en länk i någons inkorg
│   │   ├── crm-f2822a6f3a/ ... ⭐ DASHBOARDEN. Allt operativt körs härifrån
│   │   ├── brand/ ............ brand.json = enda sanningen om varumärket
│   │   ├── css/ + js/ ........ 🔒 style.css och main.js FRYSTA (delas med cloud/bygg)
│   │   └── svhus/ shabifix/ glowingservice/ ... media till Next-demoserna
│   ├── next.config.mjs ....... 🔒 host-rewrites: styr vad .se och .cloud visar
│   └── vercel.json ........... 🔒
│
├── bahkobyra/ ................ 🔒 ENDAST kundernas LIVE sajtkod, egna Vercel-projekt
│   └── cloud/                    ⚠ Inte att förväxla med content/bahkobyra/ nedan (byråns
│       ├── smamaleri/ ................ 🔒 smamaleri.se — får aldrig flyttas    EGET arbete)
│       └── brommatradgardsservice/ ... 🔒 brommatradgardsservice.se — får aldrig flyttas
│
├── content/ .................. copy, SOP och kundarbete per kanal
│   ├── kundarbete/ ............ ⭐ LEVERERAT KUNDARBETE, en mapp per kund (bromma/, smamaleri/,
│   │                              maykaskitchen/), vardera med hemsida.md · struktur.md ·
│   │                              drive.md · seo-geo-aeo.md. `_mall/` = facit för nästa kund.
│   │                              Rör inte utan koll. Filerna PEKAR på 🔒-sajtkoden ovan,
│   │                              flyttar den aldrig.
│   ├── leads/ ................. lead-research + demolankar.md (index över ALLA demosajter)
│   └── bahkobyra/ .............. byråns EGET arbete: ig/ dm/ email/ cold-call/ reels/
│                                  apps-script/ guider/ — inte samma sak som toppnivå-bahkobyra/
│
├── workflows/ ................ SOP:er — säljmetodik, cadence, leverans, IG
├── tools/ .................... node tools/<skript>.js · kör `ls tools/` för aktuell lista
│   ├── assets/ ............... 💰 build_mascot.py genererar ALLT varumärkesmaterial
│   └── demo/ ................. QA som mäter demos (layout-shift, iOS-vh, skärmbilder)
│
├── docs/
│   ├── operativa-regler.md ... detaljlagret bakom den här kartan
│   ├── design/
│   └── superpowers/ .......... revisionens planer och specar
│
├── reference/ ................ levande källdokument (3 PDF, säljmetodiken) — inte skräp
├── other-projects/ ........... allt som INTE är Bahko Byrå. Byggs av ingen Vercel
│   └── beast-of-ages/ ........ YouTube-kanalen. Se dess LASMIG.md
├── data/ ..................... tom sedan klinik-leadsen raderades 2026-08-21
├── .tmp/ ..................... slängbart — UTOM session-context.md = lägesbilden
└── .env ...................... nycklar. Aldrig hårdkodat någon annanstans
```

**Teckenförklaring**

| | Betyder |
|---|---|
| 🔒 | Heligt. Ändras, flyttas eller raderas ALDRIG utan Mathias ja i den aktuella sessionen |
| ⚡ | Går live vid push till main |
| 💰 | Kostar pengar eller credits när det körs |
| ⭐ | Här bor det viktiga — börja leta här |
| ⚠ | Känd fälla, se längst ner |

**Ligger inte i repot:** `~/.claude/skills/` (33 globala skills — se `docs/skills-oversikt.md`
för hela listan, samma filer som repots), minnesmappen `~/.claude/projects/…/memory/`,
`OneDrive/audits/` (OS-audit-rapporter), `OneDrive/Dokument/Backups/higgsfield-genererat/`
(betalda genereringar utanför repot), Google Drive **H:** (`BahkoByrå/BahkoByra/` —
contentleveranser, karuseller, Bromma-material), `OneDrive/Skrivbord/youtube/youtube.md`
(Beast of Ages-regler — Mathias eget YouTube-projekt, skiljt från Bahko Byrå-kunderna).

## Vill du något? Hit går du

| Vill du… | Gå till |
|---|---|
| Bygga kunddemo eller kundhemsida | `/hemsidor` — mall `web/app/(demo)/svhus/` |
| Ny lead i en nisch som redan har demo | `/demo-recopy` (0 credits) — **alltid detta först** |
| Bygga scroll-cinematic-demo (gamla mönstret) | `/scroll-cinematic` — referens `web/public/cloud/glowingservice/` |
| Göra en video till scroll-sajt | `/video-to-website` |
| SEO, lokal SEO, GEO, AEO, Google Företagsprofil | `/optimering` |
| Konkurrensanalys, klientrapport, lead-profil | `/rapport` |
| Instagram-content | `/instagram-engine` — handtag **@bahkobyra** |
| Animera loggan, reels-intro | `/motion-design` |
| Stress-testa en plan | `/grill-me` · rita diagram `/excalidraw-diagram` |
| Spara sessionen före `/clear` | `/rensa` |
| Bygga eller granska en skill | `/skill` |
| Kolla om systemet självt är aktuellt | `/os-audit` |
| Hitta en kunds hemsida/struktur/Drive/SEO-underlag | `content/kundarbete/<kund>/` — mall i `_mall/README.md` |
| Hitta en demolänk att skicka | `content/leads/demolankar.md` |
| Se vilka skills som finns | `docs/skills-oversikt.md` |
| Skriva manus för Beast of Ages (YouTube) | `/manusloop` — regler i `OneDrive/Skrivbord/youtube/youtube.md` |
| Sälja: metodik, offer, cadence, JA-protokollet | `workflows/sales_methodology.md` + dashboardens Spelbok |
| Köra något operativt | dashboarden `web/public/crm-f2822a6f3a/index.html` |
| Detaljregler (WAT, brand-hex, offer-stegen) | `docs/operativa-regler.md` |

Skills bor i `.claude/skills/[namn]/SKILL.md`. Beskrivningarna laddas alltid, innehållet vid
anrop — därför står detaljerna i skillen, inte här.

## 🔴 Fråga ALLTID först

| Innan du | Varför |
|---|---|
| **pushar, mergear eller deployar** | Vercel-taket delas av tre projekt. Varje push+merge kostar ~6 deploys. Batcha allt i EN pull request. |
| **kör något som drar över 100 credits** | Under 100 kör jag på — en AI-bakgrund kostar 2–5. Över 100 frågar jag: en reel ligger på ~150. |
| **raderar, flyttar eller döper om** | Läs 🔒 först. Radering loggas i `DELETIONS.md` samma session. |
| **rör något med 🔒** | Kräver Mathias uttryckliga ja i den aktuella sessionen. |

**Innan någon analys eller ändring:** `git fetch` och jämför med `origin/main`. Det mesta arbetet
sker i cloud-sessioner via PR:ar, så den lokala mappen hamnar efter. Mappen ska stå på `main`.

**Polla aldrig `bahkobyra.se` i loop efter en deploy** — hela domänen 403:ar från den här datorns
IP. Verifiera i Vercel-dashboarden i stället.

## 🔒 Heligt

Låsen står i **`docs/heligt.md`** med motiveringen bakom varje. Trädet ovan märker dem med 🔒, så
du ser vad som är skyddat utan att slå upp något.

Regeln är oförändrad: **rör inget 🔒 utan Mathias uttryckliga ja i den aktuella sessionen.** Är du
osäker på om något är låst — läs filen innan du gör något, inte efter.

## Tre Vercel-projekt bygger samma repo

Den vanligaste fällan. De delar bara **roten**.

| Projekt | Root Directory | Domän |
|---|---|---|
| `bahko-byra` | `web/` | www.bahkobyra.se + bahkobyra.cloud |
| `smamaleri` | `bahkobyra/cloud/smamaleri` | smamaleri.se |
| `brommatradgardsservice.se` | `bahkobyra/cloud/brommatradgardsservice` | brommatradgardsservice.se |

- **Lägg aldrig ett ramverk i repo-roten.** När Next.js låg där failade alla tre samtidigt
  (2026-08-06). Marknadssajten bor därför i `web/`.
- **Nya demos till `web/app/(demo)/`** — aldrig under `/cloud/` (rewriten vinner → 404) och aldrig
  i `bahkobyra/cloud/` (byggs inte → **404 på länken du precis skickade**).
- **bahkobyra.cloud serveras av samma projekt som bahkobyra.se.** Att den visar GRANIT-demon
  avgörs av host-rewrites i `web/next.config.mjs`.
- **Kontrollera Output Directory-overriden efter varje deploy-strul.** Den stod 2026-08-06 på
  maykas-skillens site-mapp, vilket hade serverat Mayka's Kitchen på bahkobyra.se. Ska förbli av.

## other-projects/ — allt som inte är Bahko Byrå

Egna projekt med egen publik och egna regler. **Byggs av inget Vercel-projekt** och ligger
utanför deployflödet — en ändring där kan aldrig ta ner en kundsajt.

**`other-projects/beast-of-ages/`** — YouTube-kanal, kanal-ID `UCWxSYqJuIrRX92qZTEm2XwA`.
Engelskspråkig publik på ett svenskt konto: **manus skrivs på engelska**, samtal om arbetet
förs på svenska. Full bakgrund i `other-projects/beast-of-ages/LASMIG.md`.

Fem saker att veta innan något görs där:

1. **Mät på median, aldrig på snitt.** 81,5 procent av kanalens livstidsvisningar sitter i
   en enda nyhetsvåg (Colossals varghybrider, mars 2026). Snittet 6 890 visningar per video
   beskriver vågen, inte kanalen. Medianen är ungefär 1 300. Samma fälla gäller
   konkurrenterna — deras snitt mäter hur många videor de släppt, inte hur bra de är.
2. **Publiceringstakt är den enda variabel som skiljer kanalen från konkurrenterna.**
   De släpper 8–26 videor i månaden mot 4. Deras vanliga video går sämre än denna kanals
   botten. De vinner på antal lotter, inte på kvalitet — gillningar per visning är 9–23 %
   här mot 2,1 % på den största konkurrentvideon.
3. **Publiken är vuxna män, tyngdpunkt 45+.** Uppmätt i YouTube Studio 2026-08-24:
   84 % män, 82 % är 35 eller äldre, och största enskilda gruppen är 65+ (20,6 %).
   Barn finns i praktiken inte (1,3 % under 25). Tolvåringstestet i manusloopen står
   kvar som läsbarhetsribba — enkelt språk vinner i alla åldrar — men ämnen, referenser
   och thumbnails ska träffa en man 45–70: naturdokumentär-tradition, vetenskapshistoria,
   gårdsminnen. Mer TV-skärm än mobil.
4. **Testa eller dubbla ner är ett beslut, inte en känsla.** Utliggarribban är 3 000–5 000
   visningar. Under den är varje ny video ett test av ett *nytt* format, och högst 1–3 videor
   får läggas på samma format innan man går vidare. Över den identifieras formatet och man
   dubblar ner en gång i taget och mäter — slår ingen nedslagning originalet, tillbaka till
   att testa. Direktvargsspåret gick nio steg nedåt i rad och är slut.
5. **Påhittade djurfakta är oacceptabla.** Bitkraft, hastighet, livslängd, temperatur,
   populationssiffror. Det är i wildlife falska djurfakta
   sprids snabbast och lever längst. Osäker: skriv om meningen så den inte behöver siffran.

vidIQ är kopplat som MCP-server på användarnivå och läser kanalen direkt
(`vidiq_channel_stats`, `vidiq_outliers`, `vidiq_video_transcript`, m.fl., 5 credits per anrop).
Loopar som gäller projektet: `/manusloop` för manus, `/kolla-over` för genomlysning.

## Regler som gäller alltid

**Positionering** — Offerten = hemsidor, på ALLA kanaler. **"Växa på Google"-copy ENDAST på
`www.bahkobyra.se`** — aldrig i outreach, DM, reels eller dashboard-skript; local SEO är intern
leverans och uppsell. Nisch: bygg, tak, måleri, mark, hantverk.

**Allt som går till en prospekt eller kund** — mänsklig, naturlig svenska. **ALDRIG tankstreck (—)
i ett meddelande.** Börja med "Hejsan!", avsluta med "Vänliga hälsningar / Mathias Bahko". Kort:
långa DM får inga svar (lärdom 2026-06-12), uppföljning max 40 ord. Ingen kontakt utan Mathias.

**Varumärke** — `brand.json` är källan, beskriv aldrig varumärket ur minnet. Genererade filer byggs
med `python3 tools/assets/build_mascot.py`, rör dem aldrig för hand. **KNAPP-REGEL: smaragd yta med
marinblå text — ALDRIG vit text på smaragd** (2,54:1, underkänd kontrast). Typsnitt Outfit rakt
igenom. Maskoten (glaskuben) är figuren, det platta 2D-märket är loggan.

## Löpande åtaganden

Kundåtagandena bor i **`web/public/crm-f2822a6f3a/atagande.json`** (kadens + startdatum, inga
hårdkodade datum). Läs den vid sessionsstart och säg till när något förfaller inom 2 dagar —
dashboarden visar samma sak som en banner. Ingenting annat fångar dem.

## Källor och företräde

När två källor säger olika:

1. **Disken vinner över alla dokument.** Kolla att filen finns innan du litar på en mening om den.
2. **`main` på GitHub vinner över den lokala mappen.**
3. **`brand.json`** är enda sanningen om varumärket.
4. **Dashboarden och `atagande.json`** är enda sanningen om leads, kundläge och åtaganden.
5. **`DELETIONS.md`** svarar på "borde inte det här finnas?"
6. **Säger en skill "aldrig utan beställning" finns det inte längre** — en enda regel gäller för
   pengar: över 100 credits frågar jag, under kör jag.
7. **Den här filen routar.** Siffror, statusar och inventeringar hör hemma i sin källa. Hittar du
   en här: flytta den och lämna en pekare.

## ⚠ Kända fällor i repot

- **`scroll-cinematic`** — 💰 ~49 credits/demo. Inline `<script>` får aldrig ha `defer`, och
  biblioteksflaggor måste mätas efter att de deferrade CDN-scripten körts, annars dör hela
  animationslagret tyst. Facit `web/public/cloud/bygg/index.html` är fryst i GAMLA varumärket.
- **`hemsidor`** — noll egen klient-JS. Bilder `nano_banana_2`, video `seedance_2_5`.
- **`demo-recopy`** — ersätts en gammal `/cloud/`-demo läggs redirect i `next.config.mjs` så
  skickade länkar aldrig bryts.
- **`motion-design`** — eget varumärke och uppsell, ALDRIG som front offer.

Fällor som bara gäller Mathias dator (symlänkar, saknad Google OAuth, botspärren, UTF-8 BOM) bor i
`CLAUDE.local.md`.
