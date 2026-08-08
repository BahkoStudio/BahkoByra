# Spec: Totalrevision av Bahko Byrå-systemet 2026

**Datum:** 2026-08-05 · **Status:** Beslutad efter grillning (3 rundor, 11 beslut) · **Ägare:** Mathias

## 1. Bakgrund och mål

Repot BahkoStudio/BahkoByra har vuxit organiskt sedan 2025 genom flera epoker (klinik-nischen,
outreach-automation, bygg/hantverk-pivoten, CRM v1→v2) och bär spår av alla. Målet med
totalrevisionen: **ta bort gammalt, förnya och förbättra allt** — kod, struktur, design, SEO,
innehåll — utan att kundsajterna i `bahkobyra/cloud/` går sönder.

Deploykedjan är känslig: Vercel deployar `main` automatiskt, och kunddomänerna
(smamaleri.se, brommatradgardsservice.se) serveras från samma repo. **Varje push till main är
en livedeploy även för betalande kunder.**

## 2. Beslutslogg (grillning 2026-08-05)

| # | Beslut | Innebörd |
|---|--------|----------|
| 1 | **Heliga: Smamaleri + Bromma** | De enda skarpa kundleveranserna. Deras kataloger (`cloud/smamaleri/`, `cloud/brommatradgardsservice/`) och livesajter får inte förändras funktionellt eller visuellt utan separat beställning. `.env`, nycklar, credentials och CRM-data (localStorage) är också heliga. |
| 2 | **Radera + DELETIONS.md** | Git-historiken är arkivet. Allt som tas bort listas i `DELETIONS.md` med motivering. Ingen radering utan att nuläget först är committat på branch (uppfyllt: `backup/pre-revision-2026`, commit a1a0070). |
| 3 | **Prioritet: städa → affär → design → innehåll** | Först bort med gammalt, sedan det som driver leads (bahkobyra.se-konvertering + SEO), sedan rebrand/design, sist innehåll/copy. |
| 4 | **Deploy paketvis** | Varje arbetspaket: byggs på `refactor/totalrevision-2026` → demo med file:///-länk → Mathias OK → push. Inga pushar till main utan uttryckligt OK. |
| 5 | **Rebrand: marinblå + smaragd** | Hela det egna materialet styrs om från cream/navy/guld till bildstilens identitet: marinblå bas `#0A1628→#0F1F38`, smaragd `#10B981`/`#34D399` som primär accent, amber `#F59E0B` som signalfärg, vit text + slate-grå `#5B6B82` sekundärtext. Guld utgår ur eget material. Kundsajter och frysta demos behåller sina stilar. |
| 6 | **Ny logga i smaragd-stilen** | Smaragdgrön rundad fyrkant med vitt B + ordmärke (samma märke som marknadsbilderna redan använder). SVG-varianter tas fram; Mathias väljer innan bytet sker. |
| 7 | **Typografi: modern sans rakt igenom** | Fet geometrisk sans (Inter eller Outfit i tyngre vikter) för rubriker och brödtext. Cormorant Garamond fasas ut ur eget material. |
| 8 | **Demos frysta** | De 8 demosajterna (alfredallservice, asmar, bygg, kmctransport, osterlunds, pizzeriamatstugan, tryggbyggservice, vajjebygg) rörs inte: varken förnyelse, rebrand eller radering. Alla URL:er lever (länkar finns i prospekts inkorgar). |
| 9 | **Klart = mätbar slutchecklista** | Se §6. |
| 10 | **Media: Drive-först, sedan radera** | Varje mediafil i repot verifieras mot Google Drive (saknade laddas upp), därefter raderas den ur repot + listas i DELETIONS.md. `.md`-dokument behålls alltid. |
| 11 | **Workflows: full konsolidering** | Uttryckligt godkännande att radera döda workflows, slå ihop överlappande och skriva om CLAUDE.md mot dagens process (12 000 kr ex moms, CRM v2, reels-doktrinen). |

**Processbeslut:** Saknade skills (Superpowers, impeccable, /simplify, /security-review m.fl.)
installeras eller körs likvärdigt från disk. Superpowers 6.2.0 + impeccable 4.0.4 fanns redan
installerade (ej laddade i sessionen — instruktionerna läses från disk och följs);
code-simplifier + claude-security installerades 2026-08-05.

## 3. Omfattning

**I scope (eget material — rebrandas + revideras):**
- `bahkobyra/index.html`, `css/`, `js/`, `brand/` (logga, brand.json), `foretag/`, `offert/`,
  `dashboard/` (CRM v2), `cloud/sop-ringa/`, `cloud/prismotor/` (eget säljverktyg), `pitchdeck.html`
- `vercel.json` (legacy-routes från kliniker-eran), `robots.txt`, `sitemap.xml`
- `tools/` (konsolidering, död kod), `workflows/` (konsolidering), `CLAUDE.md`, `.claude/skills/`
  (uppdateras så framtida demos/material byggs i nya stilen)
- `content/` (media Drive-först-städas; dokument uppdateras), `reference/`, `server.js`,
  `package.json` (nodemailer-beroendet utreds), `CEO_AUDIT.md`
- SEO/GEO/AEO-granskning av kundsajterna (fynd → åtgärdsförslag; ändringar på heliga sajter
  kräver separat OK)

**Utanför scope:**
- Funktionella/visuella ändringar i `cloud/smamaleri/` och `cloud/brommatradgardsservice/`
- De 8 frysta demosajterna (beslut 8)
- Git-historik-omskrivning (media som raderas finns kvar i historiken — accepterat)
- Nya Higgsfield-genereringar utan beställning (kostar credits; off-brand IG-intro efter
  rebrand blir en flaggad backlogpunkt, inte automatik)

## 4. Nulägeskarta (verifierad 2026-08-05)

- **Deploy:** Vercel, `outputDirectory: bahkobyra`, statiskt utan byggsteg. Kunddomäner =
  separata Vercel-projekt mot samma repo. `vercel.json` bär kliniker-era-routes
  (elara-klinik-demo, kliniker→foretag-redirects) och host-routing för bahkobyra.cloud → cloud/bygg.
- **Design:** `css/style.css` med tokens `--cream/--navy/--gold`; `brand/brand.json` (guld/cream,
  Cormorant Garamond + Outfit); `brand/brand.json` rad 29–31 pekar på Higgsfield-CDN-länkar
  (30-dagars raderingsrisk — måste lokaliseras oavsett rebrand).
- **Demos delar ingen CSS** med huvudsajten (verifierat via grep) — rebranden läcker inte in
  i frysta demos. Enda externa referensen: `cloud/sop-ringa/` laddar `/brand/logo.svg` (eget material, ska följa nya loggan).
- **Dubblering:** `tools/` har parallella .js/.py-versioner (competitor_research, generate_report);
  `workflows/` har 10 dokument med överlapp (cold_calling vs cold_calling_saljare, tre outreach-dokument).
- **Övrigt gammalt:** `reference/` (9 MB kurs-PDF:er), `content/` (45 MB media), `CEO_AUDIT.md`
  (juni 2026, delvis åtgärdad, "Kräver dig"-punkter kvarstår), `server.js` (lokal dev-server, legitim).

## 5. Arbetsströmmar

**A. TA BORT (städa):** kliniker-arv i vercel.json och koden, döda tools/workflows,
dubbletter, reference-PDF:er (om ej aktiva källdokument — granskningen avgör), Drive-säkrad media,
`.tmp`-rester. Allt via DELETIONS.md.

**B. FÖRBÄTTRA AFFÄR:** bahkobyra.se-konvertering (CRO), SEO/GEO/AEO på egen sajt,
kvarvarande CEO_AUDIT-punkter som går att lösa i repot, teknisk hygien (vercel.json,
sitemap, robots, schema markup), kundsajts-SEO-fynd som åtgärdsförslag.

**C. FÖRNYA DESIGN (rebrand):** designtokens (ny palett §2.5), ny logga (§2.6),
typografi (§2.7), omskinning av bahkobyra.se + foretag/ + offert/ + dashboard/ + sop-ringa/ +
prismotor/ + pitchdeck, ny rörelse (animate/find-animation-opportunities), skills-uppdatering
(scroll-cinematic-facit m.fl. pekas mot nya designsystemet för FRAMTIDA byggen).

**D. FÖRBÄTTRA INNEHÅLL:** workflows-konsolidering, CLAUDE.md-omskrivning, content-dokument
i nya tonen, flagga off-brand-material (IG-intro) för nybeställning.

## 6. Definition av klart (mätbar slutchecklista)

1. Alla punkter i den godkända backloggen är genomförda **eller** uttryckligt bortvalda av Mathias.
2. Lighthouse ≥90 (Performance, SEO, Accessibility, Best Practices) på bahkobyra.se;
   kundsajterna har oförändrade eller bättre värden än baslinjen (mäts före första ändringen).
3. 0 interna 404:or/döda länkar i hela `bahkobyra/` (crawl-verifierat).
4. `DELETIONS.md` komplett: varje raderad fil listad med motivering.
5. Alla 12 cloud-sajter + huvudsajt + dashboard renderar felfritt (byggtest efter varje
   påverkande ändring; skärmdumpsverifiering före push).
6. Säkerhetsgranskning (/security-review-metodik) utan högriskfynd före varje push.
7. Ingen push till main utan Mathias uttryckliga OK per paket.

## 7. Risker och motverkan

| Risk | Motverkan |
|------|-----------|
| Push till main deployar kunddomäner | Heliga kataloger diffas mot origin/main före varje push — ska vara noll diff |
| Parallell session pushar till main under arbetet | `git fetch` + rebase före varje push; aldrig force-push |
| brand.json CDN-länkar (Higgsfield, 30 dagar) dör | Assets laddas ner lokalt i paket B oavsett rebrand |
| Rebrand gör IG/reels-material off-brand | Flaggas i backlog som beställningspunkt (Higgsfield-credits) — inte automatik |
| Frysta demos ser gammal-brandade ut bredvid nya sajten | Accepterad avvägning (beslut 8); scroll-cinematic-skillen uppdateras så nästa demo byggs i nya stilen |
| Radering träffar något levande | Granskningens SKEPTIKER-lins + adversariell verifiering per raderingskandidat; DELETIONS.md granskas av Mathias i backloggen före genomförande |

## 8. Öppna punkter (icke-blockerande, avgörs vid backlog-godkännandet)

- Kliniker-redirects i vercel.json: behålla 301:orna (gratis, bevarar gamla länkar) eller ta bort helt.
- `reference/`-PDF:ernas öde (CLAUDE.md kallar dem källdokument för säljsystemet — SKEPTIKER-linsen utreder om de fortfarande refereras).
- Slutlig smaragd-nyansskala (exakta tokens presenteras i logga/design-prototyperna).
- Offert-sidans (`offert/` med schema.sql) status: levande verktyg eller kliniker-rest — granskningen avgör.
