# DELETIONS.md — Totalrevision 2026

Regel: ingen radering utan committat nuläge (säkrat: branch `backup/pre-revision-2026`, a1a0070).
Git-historiken är arkivet — allt nedan går att återställa därifrån.

| Datum | Raderat | Motivering | Beslut |
|-------|---------|------------|--------|
| 2026-08-05 | `bahkobyra/pitchdeck.html` | Förpivot-artefakt: sålde abonnemang 4 500/12 000 kr/mån + 7 500 kr engångs (motsade offern 12 000 kr ex moms engångs), "sida 1"-garanti, lila off-brand-design (Space Grotesk/#7C3AED), ogrundad statistik. URL:en 301:ar nu till startsidan. | Mathias 2026-08-05 (backlog Paket 0.3) |
| 2026-08-05 | `tools/remove_bg.js` | 0 inkommande referenser (git grep-verifierat), senast ändrad 2026-03-16 | Mathias 2026-08-05 (backlog 1.1) |
| 2026-08-05 | `tools/enrich_crm_contacts.js` | 0 referenser, engångs-seed för gamla CRM:et | Mathias 2026-08-05 (backlog 1.2) |
| 2026-08-05 | `tools/find_linkedin.js` | 0 referenser; linkedin_outreach.md är en manuell SOP | Mathias 2026-08-05 (backlog 1.3) |
| 2026-08-05 | `tools/competitor_research.py` + `tools/generate_report.py` | .js-versionerna är kanoniska (rapport-skillen); competitor_analysis.md uppdaterad till .js i samma commit | Mathias 2026-08-05 (backlog 1.4) |
| 2026-08-05 | `workflows/cold_calling.md` | Ersatt av cold_calling_saljare.md — oförenliga manus (mål/tider/process) sida vid sida | Mathias 2026-08-05 (backlog 1.5) |
| 2026-08-05 | `workflows/outreach_automation.md` | Resend-setup motsade koden (nodemailer/one.com); operativa delar flyttade till outreach_cadence.md | Mathias 2026-08-05 (backlog 1.6) |
| 2026-08-05 | `CEO_AUDIT.md` | Juni-audit: åtgärdat är åtgärdat, Élara-referenser obsoleta, olösta "Kräver dig"-punkter migrerade till backloggens KRÄVER DIG-lista | Mathias 2026-08-05 (backlog 1.7) |
| 2026-08-05 | `bahkobyra-scroll-choreography.excalidraw` + `granit-bygg-scroll-choreography.excalidraw` | Designutkast; byggena levererade sedan länge | Mathias 2026-08-05 (backlog 1.9) |
| 2026-08-05 | `bahkobyra/offert/` (index.html, dashboard.html, data.js, schema.sql, README.md) | Parkerad sedan 2026-06-25, olänkad från webbroten (grep-verifierat), aldrig driftsatt (Supabase saknas), överlapp med cloud/prismotor | Mathias 2026-08-05 (backlog 1.10) |
| 2026-08-06 | `bahkobyra/crm-f2822a6f3a/todo.html` (f.d. dashboard/todo.html) | Kvarglömd instruktionssida från juni-eran i gamla varumärket; GA4/GSC-stegen ersatta av backloggens KRÄVER DIG + vilande js/analytics.js | Backlog-godkännandet (städa) |
| 2026-08-21 | `task-observer`-skillen (routing-rader i CLAUDE.md, tabell + beskrivning) | Skillen fanns inte i repot, inte globalt och inte på main — men CLAUDE.md beordrade "invoka task-observer" vid start av varje flerstegssession. Loggfilen `.claude/observations.md` fanns aldrig. Död routing-regel som träffade varje session. Upptäckt i OS-audit 2026-08-21. | Mathias 2026-08-21 |
| 2026-08-21 | `data/leads.json`, `data/leads_enriched.json`, `.tmp/outreach_state.json` | Klinik-nischens leads och utskicksläge från 2026-03-17 (Akademikliniken, Nordiska Kliniken, Art Clinic m.fl.). Nischen avvecklades 2026-07-28 och CLAUDE.md påstod redan att leadsen var borttagna — de låg kvar och lästes av `tools/enrich_leads.js`. Gitignorerade, så ingen historik fanns att bevara. Upptäckt i OS-audit 2026-08-21. | Mathias 2026-08-21 |
| 2026-08-21 | `Skrivbord/bahko-redesign/` (338 MB) | Git-worktree som tappat sin koppling (`.git` pekade på en pruned worktree — alla git-kommandon dog). Komplett kopia av repot plus en nyare CLAUDE.md. Verifierat före radering: 843 av 845 filer fanns redan i git-objektdatabasen; de två unika (`.tmp-maskotvideo/hero.mp4` + `.json`, seedance_2_5 19 aug) räddades till `OneDrive/Dokument/Backups/higgsfield-genererat/`. Upptäckt i OS-audit 2026-08-21. | Mathias 2026-08-21 |
| 2026-08-21 | `t10.mjs` (repo-roten) + skräp i `.claude/skills/video-to-website/maykas/` (`assetss/`, `project-bolt-sb1-x6ow93ql.zip`, lös `hf_*.mp4`) | Engångs-felsökningsskript som räknade IntersectionObservers på Shabifix-demon (17 aug), noll referenser. Maykas-skräpet låg i samma mapp som deployar maykaskitchen.se live. Upptäckt i OS-audit 2026-08-21. | Mathias 2026-08-21 |
