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
- Example: If you need to pull data from a website, don't attempt it directly. Read `workflows/scrape_website.md`, figure out the required inputs, then execute `tools/scrape_single_site.py`

**Layer 3: Tools (The Execution)**
- Python scripts in `tools/` that do the actual work
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
tools/          # Python scripts for deterministic execution
workflows/      # Markdown SOPs defining what to do and how
.env            # API keys and environment variables (NEVER store secrets anywhere else)
credentials.json, token.json  # Google OAuth (gitignored)
```

**Core principle:** Local files are just for processing. Anything I need to see or use lives in cloud services. Everything in `.tmp/` is disposable.

## Bottom Line

You sit between what I want (workflows) and what actually gets done (tools). Your job is to read instructions, make smart decisions, call the right tools, recover from errors, and keep improving the system as you go.

Stay pragmatic. Stay reliable. Keep learning.

---

## Säljsystem (BIAB / ProfResults)

Fundamentet för all försäljning. Full playbook: `workflows/sales_methodology.md`. Leverans:
`workflows/local_seo_delivery.md`. Cadence: `workflows/outreach_cadence.md`. IG: `workflows/instagram_engine.md`.
Källdokument i `reference/`. **Allt operativt körs från dashboarden:** `bahkobyra/dashboard/index.html`
(CRM med cadence, offert-väljare, outreach-skript, Instagram-motor, Spelbok).

**POSITIONERING (viktigt):**
- **Offerten = hemsidor.** På ALLA kanaler (Instagram, cold email/call/IRL, DM) säljer vi hemsidor som front offer.
- **"Växa på Google"-copy ENDAST på `www.bahkobyra.se`.** Aldrig i outreach, DM, reels eller dashboard-skript.
- Local SEO / Google-ranking är intern leverans (klinik-retainer) — inte säljbudskapet.

**Offer-stegen (ett varumärke, två nischer):**

| | Klinik (cold email/call/IRL) | Bygg & hantverk (Instagram @bahkostudio) |
|--|------------------------------|-------------------------------------------|
| Front (gratis) | Gratis hemsideförslag (2-min Loom + utkast) | Gratis hemsideförslag (utkast) |
| Core (betalt) | Hemsida + löpande optimering (35 000 kr + 9 000 kr/mån) | Hemsida engångs (29 900 kr) |

- **Offer-regel:** resultat + mekanism + riskreversering + villkor. FOR THEM / REAL / Financial Sense / Easy YES.
- **Outreach-copy:** kort, personlig, mänsklig, hjälpsam. En konkret observation om DERAS sajt + en tydlig CTA.
- **Front-offer = bevisa "the wizard"**, inte tjäna pengar. Sen uppsell.
- **Cadence:** välj EN väg/lead (skriven/samtal/IRL), dag 1/3/5/7 → svar=boka, tyst=nurture/stäng.
- **JA-protokollet (när prospekt säger ja till demo):** gör ENDAST tre saker, i ordning, lugn/mänsklig ton: 1) instruktion — "Kika på [plats] och se hur [friktion] visar sig." 2) kvalificering (binär, låg friktion) — "Bara så jag förstår, ser du samma sak på din sida idag?" 3) optionalitet — "Om det stämmer när du kollat kan jag visa nästa steg. Helt upp till dig." ALDRIG pitch, hype, värme-fluff, "let me know" eller call-push. Demo-länken levereras alltid. Full version + färdiga mallar i dashboardens Spelbok/skript.
- **Skrivregler för alla DM/mejl till prospekt:** mänsklig, naturlig svenska — ALDRIG tankstreck (—) i meddelanden. Börja alltid med en hälsning ("Hejsan!") och avsluta alltid med "Vänliga hälsningar / Mathias Bahko". **Lärdom 2026-06-12: långa DM får inga svar.** Uppföljning del 2 (vid tystnad): max 40 ord, ledig ton ("Tjena!"), formatet är fast: påminn ("vet inte om du hann se demon") + demolänken IGEN + värdelöftet i en mening ("visar exakt varför kunden ska välja just er") + låg friktion ("kika i mobilen, tar en minut"). Ingen omtagning av pitchen.
- **Varumärke/logga:** Bahko Byrå-loggan ligger i `bahkobyra/brand/logo.svg` (live: bahkobyra.se/brand/logo.svg, definition i `bahkobyra/brand/brand.json`) — använd ALLTID den i allt material: demos, reels, motion design, dokument. Guld-B i guldram + "Bahko *Byrå*" i Cormorant Garamond marinblå #181C38 + tagline "SYNLIGHET SOM SÄLJER". Guld #C9A96E/#E3C88E på cream #F7F3EA.
- **Daglig blast:** volym slår allt. Flaskhals = bokade möten/vecka.
- **Nischer:** kliniker (CRM) + bygg/tak/måleri/mark (Instagram).

## Skills

Skills live in `.claude/skills/[skill-name]/SKILL.md`. Descriptions are always loaded; full content loads on invocation.

| Skill | Command | Trigger phrases |
|-------|---------|-----------------|
| skill-builder | `/skill-builder` | "build a skill", "create a new skill", "audit this skill", "optimize skill" |
| video-to-website | `/video-to-website` | "turn this video into a website", "scroll-driven website", "video to website" |
| scroll-cinematic | `/scroll-cinematic [företag + nisch/ort]` | "bygg-demo", "scroll-cinematic demosajt", "hus-förvandlings-demo", "demo enligt GRANIT-mallen" |
| excalidraw-diagram | `/excalidraw-diagram` | "draw a diagram", "make a diagram of", "create an Excalidraw diagram" |
| rapport | `/rapport [klinik]` | "generera rapport", "konkurrensanalys", "klientrapport", "lead-rapport", "analysera [klinik]" |
| instagram-engine | `/instagram-engine [trade]` | "instagram-motor", "skapa reels", "content-batch", "veckans content", "reels för bygg/tak/måleri/mark" |
| grill-me | `/grill-me` | "grill me", "stress-test planen", "intervjua mig om planen" |
| motion-design | `/motion-design [varumärke + classic/hyper]` | "motion design", "animera loggan", "logo-animation", "promovideo", "reels-intro" |
| optimering | `/optimering [kund]` | "optimera sajten", "SEO för [kund]", "GEO/AEO", "schema markup", "ranka på Google", "synas i AI-svar", "Google Business Profile" |
| rensa | `/rensa` | "rensa chatten", "spara och rensa", "clear men behåll det viktiga", "rensa kontexten" |

- **skill-builder** — Guides building/auditing/optimizing skills. Runs Discovery Interview before creating. See `.claude/skills/skill-builder/reference.md`.
- **video-to-website** — Converts a video into a scroll-driven animated website (FFmpeg + GSAP + Lenis + canvas).
- **scroll-cinematic** — Kunddemos enligt GRANIT-mallen: **Élara-koreografin (`bahkobyra/cloud/index.html`) är ALLTID strukturen för kunddemos** (loader, ordvis hero, sektioner på progress-fönster med varierade entréer, räknare, flytknapp, persist-CTA, Bahko-modal). För bygg: Higgsfield-genererad husförvandling (gammalt hus → drömhus → kliv in) som autoplay-loopar/gif — ALDRIG scroll-scrub. Facit: `bahkobyra/cloud/bygg/index.html`. Kostar ~150 Higgsfield-credits/demo — körs aldrig utan beställning. Output: `bahkobyra/cloud/[kund]/index.html`.
- **excalidraw-diagram** — Generates editable Excalidraw diagrams, saves `.excalidraw` files.
- **rapport** — Genererar konkurrensanalys, klientrapporter och lead-profiler. Exporterar till Google Docs/Sheets. Kräver `credentials.json` för Google OAuth. Export-verktyg: `tools/export_to_google_docs.js`.
- **instagram-engine** — Producerar content-batchar (reels/carouseller/DM-cadence) för bygg/hantverk-nischen (@bahkostudio). Speglas i dashboardens Instagram-motor. Se `.claude/skills/instagram-engine/templates.md`.
- **grill-me** — Intervjuar dig relentlessly genom designträdet tills delad förståelse nås. Ger rekommenderat svar per fråga, frågar i rundor via AskUserQuestion.
- **motion-design** — Higgsfield-flöde brief → storyboard (en grid-bild, gpt_image_2) → video (seedance_2_0). Används för reels-hooks (@bahkostudio), uppsell efter hemsideleverans och eget varumärke — ALDRIG som front offer. Kostar credits, körs aldrig utan beställning.
- **rensa** — Destillerar ENDAST det nödvändiga från sessionen till `.tmp/session-context.md` (överlever `/clear`), säger sedan åt dig att köra det inbyggda `/clear`. Skillnad mot session-handoff: skriver till fil istället för chatt, och tar bara med minsta möjliga (aktiv uppgift, låsta beslut, rörda filer, körande tillstånd, nästa steg). `/clear` kan inte köras av skillen själv.
- **optimering** — SEO, lokal SEO, GEO och AEO för kundsajter. Kärnvärdet är att skilja **dokumenterat från branschmyt**: varje åtgärd märks med evidensgrad, och skillen har en svartlista över sånt som riskerar manuell åtgärd från Google (dolt innehåll, review-schema på egna omdömen). Blockerar alltid på grundfel först (egen domän, indexerbarhet, innehåll i rå HTML) innan finlir. Evidenstabell, schema-mallar och kända fällor i våra egna mallar: `.claude/skills/optimering/reference.md`.

New skills go in `.claude/skills/[skill-name]/SKILL.md`. API keys go in `.env`, never hardcoded.
