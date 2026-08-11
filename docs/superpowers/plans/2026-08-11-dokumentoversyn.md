# Dokumentöversyn: scroll-cinematic v3 + CLAUDE.md + task-observer

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Städa och synka de tre styrdokumenten — scroll-cinematic-skillen (624 → ~340 rader), BahkoByras CLAUDE.md (rätta inaktuella fakta) och task-observer (aktivera enligt dess egen rekommendation) — så nästa demo byggs på EN sanning i stället för tre delvis motsägande.

**Architecture:** Allt levereras som EN PR från en worktree baserad på origin/main (arbetskopian är 40+ commits bakom och får inte användas som bas). Skillens v3 skrivs från den lokala 624-radersversionen (som har alla sessionens lärdomar) men med sökvägar och facit rättade mot CLAUDE.md:s migrationsfakta. Ingen kod ändras — bara styrdokument.

**Tech Stack:** Markdown, git worktree, gh CLI. Verifiering via grep i stället för tester.

## Global Constraints

- **Steg-numreringen 0–7 i scroll-cinematic får INTE ändras** — `demo-recopy/SKILL.md` refererar "Steg 0", "Steg 1", "Steg 5" vid namn (14 referenser).
- **Heligt-listan GÖRS OM** (Mathias beslut 2026-08-11) — varje punkt omverifieras mot nuvarande deploy-verklighet (tre Vercel-projekt, web/-migrationen) och skrivs om; inget skyddsvärt får tappas i flytten.
- **task-observer FÅR redigeras** (Mathias beslut 2026-08-11) — CC BY 4.0 tillåter bearbetning; attributionsblocket (Eoghan Henn/rebelytics + licens) BEHÅLLS intakt.
- Kanonisk demoplats enligt CLAUDE.md på main: **`web/public/cloud/[kund]/`** — gamla `bahkobyra/cloud/` byggs inte längre (404-incidenten 2026-08-06).
- Verifierade siffror som ska stå överallt: demo ≈ **49 credits** (3×3 seedream + 2×20 mini), recopy = **0 credits**. CLAUDE.md:s "~150 credits" är stalet som ska bort.
- Daterade lärdomar BEHÅLLS men komprimeras till en rad + datum; långa berättelser ersätts med pekare till `storm-reports/`-rapporten respektive git-loggen.
- Inga tankstreck i exempel-DM-texter som citeras.

---

### Task 1: task-observer — banta, Bahko-anpassa och aktivera

**Files:**
- Ändra: `C:\Users\mathi\.claude\skills\task-observer\SKILL.md` (446 → ~150 rader)
- Läs: `references/environments.md` för aktiveringsformuleringen

**Redigeringsprinciper:**
- Attributionsblocket (Eoghan Henn / rebelytics, CC BY 4.0, canonical source) behålls ordagrant överst.
- Banta: Session Start Protocol → 5 rader; When to Observe/What to Watch For slås ihop till en Bahko-lista; Surfacing/Acting komprimeras.
- Bahko-routing (NYTT avsnitt): demo-lärdomar → scroll-cinematic daterade regler · copy-lärdomar → skillens Steg 6 · deploy/infra → CLAUDE.md · DM/säljregler → CLAUDE.md POSITIONERING · övrigt → loggen.
- Loggplats: `.claude/observations.md` i BahkoByra-repot (committad, skillens Log Structure-format).
- Behåll taxonomin (quick version) + arkiveringsregeln. OBS: task-observer ligger i ~/.claude/skills som RIKTIG mapp (inte symlink till BahkoByra) — ändringen görs direkt där och ingår inte i PR:en.

**Interfaces:**
- Produces: en beslutsrad för CLAUDE.md Skills-tabell + aktiveringstext, konsumeras av Task 3.

- [ ] **Step 1: Läs aktiveringskraven** — `references/environments.md`, CLAUDE.md-formuleringen.
- [ ] **Step 2: Skriv om SKILL.md** enligt redigeringsprinciperna (446 → ~150 rader). Verifiera: attributionsblock intakt (grep rebelytics ≥ 2), Bahko-routing finns, loggplats .claude/observations.md.
- [ ] **Step 3: Formulera raden** för Skills-tabellen + aktiveringsmening under tabellen:
  ```markdown
  | task-observer | (auto) | aktiveras vid varje flerstegsuppgift — fångar lärdomar som ska bli skill-regler |
  ```
  plus under tabellen: `**task-observer** — Aktiveras vid start av varje flerstegssession (bygge, deploy, research). Loggar mönster och korrigeringar till .claude/observations.md enligt skillens Log Structure; återkommande fynd lyfts som förslag på skill-uppdatering. Tredjepartsskill (CC BY 4.0, rebelytics) — redigeras inte, bara aktiveras härifrån.`

### Task 2: scroll-cinematic SKILL.md v3 (624 → ~340 rader)

**Files:**
- Skriv om: `.claude/skills/scroll-cinematic/SKILL.md` (i worktreen — v3 ersätter både lokala 624 och mains 287)

**Interfaces:**
- Consumes: lokala 624-radersversionen (allt innehåll), CLAUDE.md:s migrationsfakta (Task 3 synkar åt andra hållet).
- Produces: v3 med oförändrad Steg 0–7-numrering (demo-recopy-kontraktet).

**Struktur för v3 (i ordning):**
1. Frontmatter + intro (oförändrad ton, uppdaterad kostnad ~49 cr)
2. **Referenser & facit** (NY, ersätter "VERIFIERAD AVVIKELSE"-varningen som nu är LÖST):
   - Modern referens: `web/public/cloud/glowingservice/index.html` (nyast, alla regler: tempo, apple-hero, galleri/mobil/klick, static-site, nudge) — kopiera den.
   - Alternativa paletter/nischer: grontoglanser (smaragd/exteriör), galiano (lera/interiör), k9maleri (kobolt/måleri), golvresan (orange/golv), solpanelstjejen (solgul/besiktning).
   - Historisk fryst: `web/public/cloud/bygg/` = GAMLA varumärket, rörs aldrig (CLAUDE.md-beslut).
   - **Output: `web/public/cloud/[kund]/index.html` ENBART** — gamla `bahkobyra/cloud/`-kopian ströks (byggs inte, 404-incidenten 2026-08-06).
3. **Higgsfield: modeller, priser, kommandon** (konsoliderar CLI-tabellen + Steg 3/4-modellregler + guardrail-priserna till ETT block):
   - Bilder: `seedream_v5_pro --resolution 2k` (3 cr) — NSFW-flaggar ibland exteriörer/smuts → fallback `nano_banana_pro` (2 cr), max 1 omformulering före fallback.
   - Video: `seedance_2_0_mini` standard (20 cr, alltid `--generate-audio false`); `seedance_2_5 --mode omni_reference` (52 cr) endast på beställning och endast interiörer (exteriörer NSFW-flaggas, daterat 2026-08-11); `seedance1_5` aldrig.
   - CLI-översättningstabellen (behålls komprimerad), `--wait`-mönster, filväg i stället för jobb-ID till `--image`.
   - 15 %-serverfel + CLI-timeout ≠ jobbfel (kolla `generate list` innan omkörning — lärdom 2026-08-11).
4. Vem gör vad + Design-skills-tabellen (behålls, trimmas)
5. Strukturen (fast) — tabellen behålls med hero/float-raderna som är uppdaterade
6. **Känsla & craft, komprimerad** (166 → ~60 rader): varje löst bugg blir en enradsregel med datum; Storm-berättelserna ersätts med pekare till `storm-reports/scroll-cinematic-craft-audit-briefing.html`. Fackterm-tabellen behålls.
7. Galleri-, mobil- och klickregler (nyskrivna 2026-08-11 — behålls i sin helhet)
8. Tempo-lagar (orörda)
9. Steg 0–7 (numrering orörd; Steg 3/4 pekar på modellblocket i stället för att upprepa det; Steg 5 får output-sökvägen rättad + defer-fällan från CLAUDE.md: inline `<script>` aldrig `defer`)
10. Copy-regler inkl. enkelhetsregler + spegelfrasregeln (orörda)
11. QA-checklistan (omnumrerad ren 1–16, inkl. 11b/11c → egna nummer — demo-recopy refererar INTE QA-nummer, verifierat)
12. Guardrails (hotlink-rutinen orörd; IDENTICAL-interiörchecklistan behålls; modellpriser flyttade till block 3)

- [ ] **Step 1: Skriv v3** enligt strukturen ovan i worktreen.
- [ ] **Step 2: Verifiera kontrakt** — `grep -c "Steg 0\|Steg 1\|Steg 5" demo-recopy/SKILL.md`-referenserna matchar fortfarande (Steg 0 = nischverifiering, 1 = återanvändning, 5 = anti-fabrikation).
- [ ] **Step 3: Verifiera städning** — grep i v3: `bahkobyra/cloud/[kund]` = 0 träffar (utom historiknot), "VERIFIERAD AVVIKELSE" = 0, "150 credits" = 0, radantal 300–380.
- [ ] **Step 4: Commit** i worktreen: `docs: scroll-cinematic v3 — konsoliderad, web/public-sökvägar, modellblock`

### Task 3: CLAUDE.md — rätta stalet, gör om Heligt-listan, lägg till task-observer

**Files:**
- Ändra: `CLAUDE.md` (worktree, origin/main-bas) — Skills-sektionen + HELA Heligt-listan + tillägg

**Heligt-listan v2 (omverifierad mot TRE-Vercel-verkligheten):**
1. Kundsajterna `bahkobyra/cloud/smamaleri/` + `bahkobyra/cloud/brommatradgardsservice/` — oförändrat heliga (egna Vercel-projekt med Root Directory på exakt de sökvägarna).
2. De 8 frysta demosajterna — **sökvägar rättade till `web/public/cloud/…`** (därifrån serveras de nu; gamla bahkobyra/cloud-kopiorna noteras som döda dubbletter).
3. `.github/workflows/deploy.yml` + maykas site-mapp — oförändrat.
4. localStorage-kontrakten `bb_crm_v2` + `bahko_sop_dagslogg_v1` — oförändrat.
5. **`web/next.config.mjs` host-rewrites + `web/vercel.json`** ERSÄTTER "alla routes i vercel.json" — bahko-byra bygger från `web/`, rotens vercel.json läses inte av något projekt längre. Rotfilen flaggas som raderingskandidat i PR:en, raderas INTE nu.
6. Frysta `web/public/css/style.css` + `web/public/js/main.js` — oförändrat.
7. `reference/`-PDF:erna — oförändrat.
8. **NY: aktiva leaddemos** (grontoglanser, galiano, k9maleri, golvresan, solpanelstjejen, glowingservice m.fl. i `web/public/cloud/`) — inte frysta, men länkarna är skickade till prospekt: får förbättras, aldrig raderas eller brytas utan beslut.
9. **NY: de tre Vercel-projektens Root Directory-inställningar** — ändras aldrig utan uttryckligt beslut (Root Directory-incidenten 2026-08-06/07 när bahkobyra.se 404:ade).

**Interfaces:**
- Consumes: Task 1:s beslutsrad, Task 2:s v3-fakta.

- [ ] **Step 1: Rätta scroll-cinematic-stycket** i Skills-sektionen:
  - "Kostar ~150 Higgsfield-credits/demo" → "Kostar ~49 credits/demo (recopy: 0) — körs aldrig utan beställning"
  - Lägg till: "Modern referensimplementation: `web/public/cloud/glowingservice/`. Regler för galleri/mobil/klickvägar, copy-enkelhet och modellval bor i skillen — dupliceras inte här."
  - Behåll: fryst-facit-beslutet, koreografi-notisen, defer-fällan (den flyttas OCKSÅ in i skillen men får stå kvar här).
- [ ] **Step 2: Lägg till demo-recopy-principen** en rad: "Ny lead i nisch som redan har demo → alltid demo-recopy först (0 credits)."
- [ ] **Step 3: Lägg till task-observer** i skill-tabellen + beskrivningsraden från Task 1.
- [ ] **Step 4: Verifiera** — grep "150 credits" = 0 · grep task-observer ≥ 2 · Heligt v2 täcker alla 7 gamla skyddsobjekt (inget tappat) + 2 nya · de 8 frysta demoernas sökvägar pekar på web/public/cloud/.
- [ ] **Step 5: Commit**: `docs: CLAUDE.md — rättad demokostnad, referenspekare, task-observer aktiverad`

### Task 4: Leverans som PR

**Files:**
- Worktree: ny branch `docs/dokumentoversyn` från `origin/main`

- [ ] **Step 1: Skapa worktree** — `git worktree add -b docs/dokumentoversyn <scratchpad>/wt-docs origin/main`
- [ ] **Step 2: Applicera** Task 2 + Task 3 där (Task 2 skrivs direkt i worktreen).
- [ ] **Step 3: Heligt-diff** — `git diff --stat origin/main -- <alla Heligt-sökvägar>` = tomt.
- [ ] **Step 4: Push + PR** med sammanfattning av vad som togs bort och varför. INGEN merge utan Mathias.
- [ ] **Step 5: Synka lokala symlink-kopian** — efter merge ersätts den lokala 624-radersversionen; tills dess noteras i PR:en att arbetskopians skill-fil är superseded.

## Självgranskning (utförd)

- Spec-täckning: skill-städning ✓ (Task 2), CLAUDE.md ✓ (Task 3), task-observer ✓ (Task 1), "ta bort gammalt" ✓ (löst varning, dubblerade modellregler, fel kostnad, döda sökvägar).
- demo-recopy-kontraktet skyddat som global constraint ✓.
- Inga platshållare; alla grep-verifieringar har exakta mönster ✓.
- CLAUDE.md:s engelska toppsektioner (WAT-arkitekturen) lämnas orörda — de är en annan sessions ramverk och "ta bort gammalt" tolkas som *inaktuella fakta*, inte omstrukturering av hela dokumentet. Flaggas i PR:en som möjlig framtida städning.
