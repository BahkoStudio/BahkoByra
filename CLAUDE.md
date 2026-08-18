# Agent Instructions

You're working inside the **WAT framework** (Workflows, Agents, Tools). This architecture separates concerns so that probabilistic AI handles reasoning while deterministic code handles execution. That separation is what makes this system reliable.

## The WAT Architecture

**Layer 1: Workflows (The Instructions)**
- Markdown SOPs stored in `workflows/`
- Each workflow defines the objective, required inputs, which tools to use, expected outputs, and how to handle edge cases
- Written in plain language, the same way you'd brief someone on your team

**Layer 2: Agents (The Decision-Maker)**
- This is your role. You're responsible for intelligent coordination.
- Read the relevant workflow, run tools in the correct sequence, handle failures gracefully, and ask clarifying questions when needed
- You connect intent to execution without trying to do everything yourself
- Example: If you need a competitor analysis, don't improvise it in chat. Read `workflows/competitor_analysis.md`, figure out the required inputs, then execute `tools/competitor_research.js`

**Layer 3: Tools (The Execution)**
- Node.js-skript (`.js`) i `tools/` that do the actual work — körs med `node tools/<script>.js`
- API calls, data transformations, file operations, database queries
- Credentials and API keys are stored in `.env`
- These scripts are consistent, testable, and fast

**Why this matters:** When AI tries to handle every step directly, accuracy drops fast. If each step is 90% accurate, you're down to 59% success after just five steps. By offloading execution to deterministic scripts, you stay focused on orchestration and decision-making where you excel.

## How to Operate

**1. Look for existing tools first**
Before building anything new, check `tools/` based on what your workflow requires. Only create new scripts when nothing exists for that task.

**2. Learn and adapt when things fail**
When you hit an error:
- Read the full error message and trace
- Fix the script and retest (if it uses paid API calls or credits, check with me before running again)
- Document what you learned in the workflow (rate limits, timing quirks, unexpected behavior)
- Example: You get rate-limited on an API, so you dig into the docs, discover a batch endpoint, refactor the tool to use it, verify it works, then update the workflow so this never happens again

**3. Keep workflows current**
Workflows should evolve as you learn. When you find better methods, discover constraints, or encounter recurring issues, update the workflow. That said, don't create or overwrite workflows without asking unless I explicitly tell you to. These are your instructions and need to be preserved and refined, not tossed after one use.

## The Self-Improvement Loop

Every failure is a chance to make the system stronger:
1. Identify what broke
2. Fix the tool
3. Verify the fix works
4. Update the workflow with the new approach
5. Move on with a more robust system

This loop is how the framework improves over time.

## File Structure

**What goes where:**
- **Deliverables**: Final outputs go to cloud services (Google Sheets, Slides, etc.) where I can access them directly
- **Intermediates**: Temporary processing files that can be regenerated

**Directory layout:**
```
.tmp/           # Temporary files (scraped data, intermediate exports). Regenerated as needed.
tools/          # Node.js-skript (.js) för deterministisk exekvering
workflows/      # Markdown SOPs defining what to do and how
content/        # Copy och SOP:er för utskick (content/email/, content/ig/)
reference/      # Levande källdokument (PDF:er, bl.a. sales methodology) — raderas aldrig
web/            # Next.js-appen som Vercel deployar (bahkobyra.se + bahkobyra.cloud)
web/public/     # Statiskt som serveras skarpt: demos i cloud/, CRM, foretag, brand
bahkobyra/      # ENDAST kundsajterna smamaleri + brommatradgardsservice (egna Vercel-projekt)
docs/           # Beslut och planer (docs/superpowers/ = revisionens planer/specar)
.claude/skills/ # Skills (se Skills-sektionen)
server.js       # Lokal dev-server (`npm start`)
.env            # API keys and environment variables (NEVER store secrets anywhere else)
credentials.json, token.json  # Google OAuth (gitignored)
```

**Verktygen som finns (2026-08-05):** `competitor_research.js`, `enrich_leads.js`,
`export_to_google_docs.js`, `generate_audit.js`, `generate_report.js`, `outreach_manager.js`,
`score_email.js` — sju skript, alla Node.js. Ingen Python i `tools/`.

**Raderat material:** allt som tagits bort (verktyg, workflows, sidor) loggas i `DELETIONS.md`
med motivering och beslut — kolla där innan du letar efter något som "borde finnas".
Revisionens planer och designbeslut ligger i `docs/superpowers/plans/` och `docs/superpowers/specs/`.

**Core principle:** Local files are just for processing. Anything I need to see or use lives in cloud services. Everything in `.tmp/` is disposable.

## Bottom Line

You sit between what I want (workflows) and what actually gets done (tools). Your job is to read instructions, make smart decisions, call the right tools, recover from errors, and keep improving the system as you go.

Stay pragmatic. Stay reliable. Keep learning.

---

## Säljsystem (BIAB / ProfResults)

Fundamentet för all försäljning. Full playbook: `workflows/sales_methodology.md`. Leverans:
`workflows/local_seo_delivery.md`. Cadence: `workflows/outreach_cadence.md`. IG: `workflows/instagram_engine.md`.
Källdokument i `reference/`. **Allt operativt körs från dashboarden:** `web/public/crm-f2822a6f3a/index.html`
(CRM med cadence, offert-väljare, outreach-skript, Instagram-motor, Spelbok).

**POSITIONERING (viktigt):**
- **Offerten = hemsidor.** På ALLA kanaler (Instagram, cold email/call/IRL, DM) säljer vi hemsidor som front offer.
- **"Växa på Google"-copy ENDAST på `www.bahkobyra.se`.** Aldrig i outreach, DM, reels eller dashboard-skript.
- Local SEO / Google-ranking är intern leverans (uppsell efter hemsidan) — inte säljbudskapet.

**Offer-stegen (en nisch: bygg & hantverk, alla kanaler):**

| | Bygg & hantverk (Instagram @bahkostudio, cold email/call/IRL) |
|--|----------------------------------------------------------------|
| Front (gratis) | Gratis hemsideförslag (utkast, ev. 2-min Loom) |
| Core (betalt) | Hemsida engångs (12 000 kr ex moms) |
| Uppsell | Löpande optimering / motion design efter levererad sajt |

- **Offer-regel:** resultat + mekanism + riskreversering + villkor. FOR THEM / REAL / Financial Sense / Easy YES.
- **Outreach-copy:** kort, personlig, mänsklig, hjälpsam. En konkret observation om DERAS sajt + en tydlig CTA.
- **Front-offer = bevisa "the wizard"**, inte tjäna pengar. Sen uppsell.
- **Cadence:** välj EN väg/lead (skriven/samtal/IRL), dag 1/3/5/7 → svar=boka, tyst=nurture/stäng.
- **JA-protokollet (när prospekt säger ja till demo):** gör ENDAST tre saker, i ordning, lugn/mänsklig ton: 1) instruktion — "Kika på [plats] och se hur [friktion] visar sig." 2) kvalificering (binär, låg friktion) — "Bara så jag förstår, ser du samma sak på din sida idag?" 3) optionalitet — "Om det stämmer när du kollat kan jag visa nästa steg. Helt upp till dig." ALDRIG pitch, hype, värme-fluff, "let me know" eller call-push. Demo-länken levereras alltid. Full version + färdiga mallar i dashboardens Spelbok/skript.
- **Skrivregler för alla DM/mejl till prospekt:** mänsklig, naturlig svenska — ALDRIG tankstreck (—) i meddelanden. Börja alltid med en hälsning ("Hejsan!") och avsluta alltid med "Vänliga hälsningar / Mathias Bahko". **Lärdom 2026-06-12: långa DM får inga svar.** Uppföljning del 2 (vid tystnad): max 40 ord, ledig ton ("Tjena!"), formatet är fast: påminn ("vet inte om du hann se demon") + demolänken IGEN + värdelöftet i en mening ("visar exakt varför kunden ska välja just er") + låg friktion ("kika i mobilen, tar en minut"). Ingen omtagning av pitchen.
- **Varumärke/logga (rebrand 2026-08-05):** ALLT definieras i `web/public/brand/brand.json` (v2) — det är källan, beskriv aldrig varumärket ur minnet. Logga & favicon = **platta 2D-märket** (grön rundad kvadrat, vitt B, ett öga — källa `tools/assets/mark-flat.png`); 3D i loggan blev för mycket. **3D-maskoten** (glaskuben, ersatte Hemsidedoktorn 2026-08-16) är FIGUREN i sektioner, popup och content — animerad i lager med gesterna master/vinkar/pekar/undersoker/dansar (`app/komponenter/Maskot.js`), källa `tools/assets/mascot-sheet.png`. Allt (märke, lockups, favicon, apple-ikon, maskotlager) genereras med `python3 tools/assets/build_mascot.py` — rör aldrig de genererade filerna för hand. Palett: bas `#0A1628`, yta `#13233F`, text vit/`#94A7BF`, accent `#10B981`/`#34D399`; ljusa ytor `#F8FAFC` med accent-text `#047857`. **KNAPP-REGEL: smaragd yta med marinblå text — ALDRIG vit text på smaragd (2,54:1, underkänd kontrast).** Typografi: Outfit rakt igenom. Guld/cream/Cormorant Garamond är UTFASAT ur eget material (lever bara kvar i frysta historiska byggen, se Heligt-listan).
- **Daglig blast:** volym slår allt. Flaskhals = bokade möten/vecka.
- **Nisch:** bygg/tak/måleri/mark/hantverk (CRM + Instagram). Klinik-nischen är avvecklad 2026-07-28 — leads och skript borttagna; `tools/score_email.js` omskriven till bygg-nischen 2026-08-05.

## Heligt - rör aldrig utan uttryckligt beslut

Följande får ALDRIG ändras, flyttas eller raderas utan Mathias uttryckliga beslut i den aktuella sessionen (omverifierad 2026-08-11 mot tre-Vercel-verkligheten):

- **`bahkobyra/cloud/smamaleri/` + `bahkobyra/cloud/brommatradgardsservice/`** — betalande kunders domäner; egna Vercel-projekt med Root Directory på exakt de sökvägarna. Får varken ändras eller FLYTTAS.
- **De 8 frysta demosajterna i `web/public/cloud/`** — `alfredallservice`, `asmar`, `bygg`, `kmctransport`, `osterlunds`, `pizzeriamatstugan`, `tryggbyggservice`, `vajjebygg`. URL:erna lever i prospekts inkorgar. (Kopiorna i gamla `bahkobyra/cloud/` är döda dubbletter som inte serveras — de får städas i separat beslut, inte i förbifarten.)
- **Aktiva leaddemos i `web/public/cloud/`** (grontoglanser, galiano, k9maleri, golvresan, solpanelstjejen, glowingservice m.fl.) — INTE frysta: de får förbättras på beställning, men länkarna är skickade till prospekt och får aldrig raderas eller brytas.
- **`.github/workflows/deploy.yml` + `.claude/skills/video-to-website/maykas/site/`** — deployar LIVE maykaskitchen.se vid varje push till main.
- **localStorage-kontrakten `bb_crm_v2` + `bahko_sop_dagslogg_v1`** — nycklar och dataformat. Bryts kontraktet tappar Mathias CRM-data och dagsloggar.
- **`web/next.config.mjs` host-rewrites + `web/vercel.json`** — styr vad bahkobyra.se OCH bahkobyra.cloud serverar. (Ersätter gamla "alla routes i vercel.json": rotens `vercel.json` läses inte längre av något projekt sedan bahko-byra bygger från `web/` — rotfilen är raderingskandidat, men radera den bara i ett eget beslut.)
- **De tre Vercel-projektens Root Directory-inställningar** (`bahko-byra` = `web/`, kundsajterna = sina mappar) — Root Directory-incidenten 2026-08-06/07 tog ner hela bahkobyra.se. Ändras aldrig från kod eller API utan uttryckligt beslut.
- **`web/public/css/style.css` + `web/public/js/main.js`** — FRYSTA, delas med frysta `cloud/bygg`. Egna sidor kör `style-v2.css`/`main-v2.js`.
- **`reference/`-PDF:erna** — levande källdokument, inte skräp.

### Nya demos ska till `web/public/cloud/`

Marknadssajten byggs av Next.js från `web/`, och allt som ska serveras på
bahkobyra.se ligger i `web/public/`. En demo som hamnar i gamla `bahkobyra/cloud/`
byggs inte och ger **404 på den länk du precis skickat till prospektet**.
Det hände 2026-08-06 med två demos och upptäcktes först vid merge.

Enda undantaget är kundsajterna `bahkobyra/cloud/smamaleri/` och
`bahkobyra/cloud/brommatradgardsservice/`, som har egna Vercel-projekt med
Root Directory pekad på just de sökvägarna.

### Repot deployas av TRE Vercel-projekt

Det här är den vanligaste fällan i repot. Tre separata Vercel-projekt bygger från
samma git-repo, och de delar bara en sak: **roten**.

| Projekt | Root Directory | Domän |
|---|---|---|
| `bahko-byra` | `web/` | www.bahkobyra.se + bahkobyra.cloud |
| `smamaleri` | `bahkobyra/cloud/smamaleri` | smamaleri.se |
| `brommatradgardsservice.se` | `bahkobyra/cloud/brommatradgardsservice` | brommatradgardsservice.se |

- **Lägg aldrig ett ramverk i repo-roten.** När Next.js låg där failade alla tre
  projekten samtidigt (2026-08-06). Marknadssajten bor därför i `web/`.
- **`bahkobyra/cloud/smamaleri/` och `bahkobyra/cloud/brommatradgardsservice/`
  får inte flyttas** — kundprojektens Root Directory pekar på just de sökvägarna.
  Se `bahkobyra/LASMIG.md`.
- **bahkobyra.cloud serveras av samma projekt som bahkobyra.se.** Att domänen
  visar GRANIT-demon och inte marknadssajten avgörs av värdbaserade rewrites i
  `web/next.config.mjs`. Rör man dem byter bahkobyra.cloud innehåll.
- **Kontrollera Output Directory-overriden efter varje deploy-strul.** Den stod
  2026-08-06 på `.claude/skills/video-to-website/maykas/site` i projektinställningarna,
  vilket hade serverat Mayka's Kitchen på bahkobyra.se vid nästa deploy av main.
  Overriden är avslagen sedan dess och ska förbli det: Next.js sköter output själv.

## Skills

Skills live in `.claude/skills/[skill-name]/SKILL.md`. Descriptions are always loaded; full content loads on invocation.

| Skill | Command | Trigger phrases |
|-------|---------|-----------------|
| skill | `/skill` | "build a skill", "create a new skill", "audit this skill", "optimize skill" |
| video-to-website | `/video-to-website` | "turn this video into a website", "scroll-driven website", "video to website" |
| scroll-cinematic | `/scroll-cinematic [företag + nisch/ort]` | "bygg-demo", "scroll-cinematic demosajt", "hus-förvandlings-demo", "demo enligt GRANIT-mallen" |
| demo-recopy | `/demo-recopy [lead + nisch/ort]` | "återanvänd demon", "byt copy på demon", "ny lead, samma nisch", "modda demon till..." |
| hemsidor | `/hemsidor [företag + nisch/ort]` | "hemsida i Next.js", "kunddemo i Next.js", "demo som SV Hus", "SV Hus-mallen", "nextjs-demo för [kund]" |
| excalidraw-diagram | `/excalidraw-diagram` | "draw a diagram", "make a diagram of", "create an Excalidraw diagram" |
| rapport | `/rapport [företag]` | "generera rapport", "konkurrensanalys", "klientrapport", "lead-rapport", "analysera [företag]" |
| instagram-engine | `/instagram-engine [trade]` | "instagram-motor", "skapa reels", "content-batch", "veckans content", "reels för bygg/tak/måleri/mark" |
| grill-me | `/grill-me` | "grill me", "stress-test planen", "intervjua mig om planen" |
| motion-design | `/motion-design [varumärke + classic/hyper]` | "motion design", "animera loggan", "logo-animation", "promovideo", "reels-intro" |
| optimering | `/optimering [kund]` | "optimera sajten", "SEO för [kund]", "GEO/AEO", "schema markup", "ranka på Google", "synas i AI-svar", "Google Business Profile" |
| task-observer | (auto) | aktiveras vid varje flerstegssession — fångar lärdomar som ska bli skill-regler |
| rensa | `/rensa` | "rensa chatten", "spara och rensa", "clear men behåll det viktiga", "rensa kontexten" |

- **skill** — Guides building/auditing/optimizing skills. Runs Discovery Interview before creating. See `.claude/skills/skill/reference.md`.
- **video-to-website** — Converts a video into a scroll-driven animated website (FFmpeg + GSAP + Lenis + canvas). OBS: `maykas/site/` i skill-mappen deployar LIVE maykaskitchen.se (se Heligt-listan).
- **scroll-cinematic** — Kunddemos med videodriven förvandlingskoreografi. **Modern referensimplementation: `web/public/cloud/glowingservice/`** (alla härdade regler). **Facit `web/public/cloud/bygg/index.html` är FRYST som historisk referens i GAMLA varumärket** (guld/cream/Cormorant) — rörs aldrig. Framtida demos byggs i kundens egen stil med egen distinkt palett; Bahko-brandade element (Bahko-modal, footer-badge) använder nya varumärket från `brand.json` v2. Kostar **~49 Higgsfield-credits/demo** (3 keyframes + 2 klipp; recopy = 0) — körs aldrig utan beställning. Output: `web/public/cloud/[kund]/index.html`. Regler för modellval/priser, galleri/mobil/klickvägar och copy-enkelhet bor i skillen — dupliceras inte här. **Fälla:** inline `<script>` får aldrig ha `defer` (ignoreras enligt specen) och biblioteksflaggor måste mätas efter att de deferrade CDN-scripten körts, annars dör hela animationslagret tyst.

- **demo-recopy** — Återanvänder befintligt demo-media för en ny lead: noll ny generering, 0 credits. **Sedan 2026-08-18 byggs varje recopy som Next.js-route på SV Hus-mallen** (`hemsidor`-skillen äger mönstren; referens `web/app/(demo)/shabifix/`). Ersätts en gammal `/cloud/`-demo läggs redirect i `next.config.mjs` så skickade länkar aldrig bryts. **Regel: ny lead i en nisch som redan har demo → alltid demo-recopy först.**
- **hemsidor** — Kundhemsidor/demos som server-renderade Next.js-routes med NOLL egen klient-JS (`:target`-modal, CSS-popup, rullande tjänste-tejp, `<details name>`-FAQ, hero-video). Referens: `web/app/(demo)/svhus/`. Route-gruppen `(demo)/` — aldrig under `/cloud/` (rewriten vinner, 404). Higgsfield i mallen: bilder `nano_banana_2` med kundreferens, video `seedance_2_5` (Mathias-beslut 2026-08-18). Kör aldrig credits utan beställning.
- **task-observer** — Aktiveras vid start av varje flerstegssession (bygge, deploy, research): loggar mönster och korrigeringar till `.claude/observations.md`; lärdomar med tydligt hem skrivs direkt in i rätt skill som daterad regel (routing-tabell i skillen). Bahko-anpassad bearbetning av rebelytics original (CC BY 4.0, attribution behållen). Vid start av en arbets­session: invoka task-observer innan arbetet börjar.
- **excalidraw-diagram** — Generates editable Excalidraw diagrams, saves `.excalidraw` files.
- **rapport** — Genererar konkurrensanalys, klientrapporter och lead-profiler. Exporterar till Google Docs/Sheets. Kräver `credentials.json` för Google OAuth. Export-verktyg: `tools/export_to_google_docs.js`.
- **instagram-engine** — Producerar content-batchar (reels/carouseller/DM-cadence) för bygg/hantverk-nischen (@bahkostudio). Speglas i dashboardens Instagram-motor. Se `.claude/skills/instagram-engine/templates.md`.
- **grill-me** — Intervjuar dig relentlessly genom designträdet tills delad förståelse nås. Ger rekommenderat svar per fråga, frågar i rundor via AskUserQuestion.
- **motion-design** — Higgsfield-flöde brief → storyboard (en grid-bild, gpt_image_2) → video (seedance_2_0). Används för reels-hooks (@bahkostudio), uppsell efter hemsideleverans och eget varumärke — ALDRIG som front offer. Kostar credits, körs aldrig utan beställning.
- **rensa** — Destillerar ENDAST det nödvändiga från sessionen till `.tmp/session-context.md` (överlever `/clear`), säger sedan åt dig att köra det inbyggda `/clear`. Skillnad mot session-handoff: skriver till fil istället för chatt, och tar bara med minsta möjliga (aktiv uppgift, låsta beslut, rörda filer, körande tillstånd, nästa steg). `/clear` kan inte köras av skillen själv.
- **optimering** — SEO, lokal SEO, GEO och AEO för kundsajter. Kärnvärdet är att skilja **dokumenterat från branschmyt**: varje åtgärd märks med evidensgrad, och skillen har en svartlista över sånt som riskerar manuell åtgärd från Google (dolt innehåll, review-schema på egna omdömen). Blockerar alltid på grundfel först (egen domän, indexerbarhet, innehåll i rå HTML) innan finlir. Evidenstabell, schema-mallar och kända fällor i våra egna mallar: `.claude/skills/optimering/reference.md`.

New skills go in `.claude/skills/[skill-name]/SKILL.md`. API keys go in `.env`, never hardcoded.
