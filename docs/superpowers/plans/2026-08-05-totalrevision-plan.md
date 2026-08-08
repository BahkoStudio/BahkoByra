# Totalrevision 2026 — Implementationsplan

> **För agentiska arbetare:** Kör paket-för-paket enligt superpowers:executing-plans /
> subagent-driven-development. Detaljerade uppgiftslistor (bite-sized, med checkboxar) genereras
> per arbetspaket EFTER att backloggen godkänts av Mathias — se Fasgrindar nedan.
> Spec: `docs/superpowers/specs/2026-08-05-totalrevision-design.md`

**Mål:** Revidera hela Bahko Byrå-systemet — ta bort gammalt, förnya (rebrand marinblå+smaragd)
och förbättra (affär, SEO, innehåll) — utan att kundsajterna går sönder.

**Arkitektur:** Statisk Vercel-sajt (`bahkobyra/` = webbroot, inget byggsteg). Allt arbete sker
i git worktree på branch `refactor/totalrevision-2026` skapad från `origin/main`. Små commits,
paketvisa pushar efter OK.

**Teknikstack:** Ren HTML/CSS/JS (GSAP + Lenis på huvudsajten), Vercel, Edge headless för
skärmdumpsverifiering, Lighthouse/crawl för mätning, rclone för Drive-verifiering.

## Globala constraints (kopierade ur spec + hårda regler)

- Ingen radering utan att nuläget först är committat på branch (uppfyllt: `backup/pre-revision-2026` a1a0070).
- Allt som tas bort listas i `DELETIONS.md` med motivering.
- `cloud/smamaleri/` och `cloud/brommatradgardsservice/` får inte förändras (diff mot origin/main = noll före varje push).
- De 8 frysta demosajterna rörs inte; alla demo-URL:er lever.
- Kundsajterna byggtestas (rendering + skärmdump) efter varje ändring som kan påverka dem.
- Inga pushar till main utan Mathias uttryckliga OK, per paket.
- Ny palett: marinblå `#0A1628→#0F1F38`, smaragd `#10B981`/`#34D399`, amber `#F59E0B`, vit + slate `#5B6B82`. Guld utgår ur eget material.
- Typografi: fet geometrisk sans (Inter/Outfit), Cormorant Garamond fasas ut ur eget material.
- Pris i allt material: 12 000 kr ex moms (15 000 kr inkl moms i 15-minutersmanuset).
- Aldrig tankstreck i kundriktade meddelandemallar. "Växa på Google"-copy endast på bahkobyra.se.
- file:///-länk levereras till varje bygge och till Storm-rapporten.

## Faser och grindar

### Fas 0 — Förberedelse ✅ (klar 2026-08-05)
- [x] Grillning → beslutslogg (11 beslut)
- [x] `git fetch origin main` (582afa4)
- [x] Arbetskopian säkrad: branch `backup/pre-revision-2026`, commit a1a0070
- [x] Plugins: superpowers 6.2.0 ✓, impeccable 4.0.4 ✓ (fanns), code-simplifier + claude-security installerade
- [x] Spec skriven och självgranskad

### Fas 1 — Granskning (läsande, ingen kod rörs)
- [ ] Storm-research: "Totalrevision av Bahko Byrås system och webbplattform 2026" med fem
      anpassade linser (PRAKTIKERN=repo-arkeologi, TEKNIKERN=2026-standard, SKEPTIKERN=rör-inte-
      det-som-funkar, EKONOMEN=värde per timme mot leads, DESIGNERN=apple-design +
      web-design-guidelines som riktmärken). Verifiering: varje systempåstående mot fil:rad,
      varje best-practice-påstående mot källa med URL.
- [ ] /optimering (granska-läget) på smamaleri.se, brommatradgardsservice.se + bahkobyra.se —
      baslinjer sparas i `.tmp/seo/<kund>/`
- [ ] Impeccable audit + critique på designen (körs från disk: `~/.claude/plugins/cache/impeccable/…`)
- [ ] Lighthouse-baslinjer för huvudsajt + kundsajter (mäts FÖRE alla ändringar)
- [ ] Samlad Storm-rapport (HTML, självförsörjande) + file:///-länk till Mathias

**Grind 1:** Rapport levererad. Ingen kod har rörts.

### Fas 2 — Backlog
- [ ] Rapportens fynd → prioriterad backlog i tre spann: **TA BORT / FÖRNYA / FÖRBÄTTRA**,
      sorterad enligt beslut 3 (städa → affär → design → innehåll), med DELETIONS-kandidatlista
- [ ] Detaljerade uppgiftslistor per arbetspaket skrivs (writing-plans-granularitet: exakta
      filvägar, exakt innehåll, teststeg, commitsteg)

**Grind 2 (HÅRD):** Mathias godkänner backloggen innan något röres. Bortvalda punkter markeras.

### Fas 3 — Genomförande (paketvis på refactor/totalrevision-2026 i worktree)

Preliminära paket (fastställs av backloggen):

| Paket | Ström | Innehåll (preliminärt) |
|-------|-------|------------------------|
| P1 | TA BORT | Döda tools/workflows/kliniker-arv raderas, DELETIONS.md skapas |
| P2 | TA BORT | Media Drive-först-verifieras (rclone) och raderas ur repot; brand.json CDN-assets lokaliseras |
| P3 | AFFÄR | vercel.json-sanering, sitemap/robots/schema, CRO + SEO på bahkobyra.se, CEO_AUDIT-rester |
| P4 | DESIGN | Nya designtokens + logga-SVG-varianter (prototyper → Mathias väljer) |
| P5 | DESIGN | Omskinning: bahkobyra.se + foretag/ + pitchdeck (prototype-metodik, animate för ny rörelse) |
| P6 | DESIGN | Omskinning: dashboard/ (CRM v2) + sop-ringa/ + prismotor/ + offert/ |
| P7 | INNEHÅLL | Workflows-konsolidering + CLAUDE.md-omskrivning + skills-uppdatering (scroll-cinematic-facit → nya stilen) |
| P8 | INNEHÅLL | Content-dokument, off-brand-flaggor (IG-intro → beställningspunkt) |

**Per paket, obligatorisk avslutssekvens:**
1. /simplify-metodik på all ändrad kod (code-simplifier, läses från disk)
2. Impeccable polish som sista designpass (för designpaket)
3. Superpowers verification-before-completion (bevis före "klart": rendering, skärmdumpar,
   crawl, diff mot heliga kataloger = noll)
4. /security-review-metodik (claude-security) på ändringarna
5. Demo till Mathias med file:///-länk → uttryckligt OK → push av det paketet

### Fas 4 — Avslut
- [ ] Slutchecklistan i specens §6 verifieras punkt för punkt med bevis
- [ ] Lighthouse slutmätning vs baslinje
- [ ] Sammanfattning (klientvänlig /rapport-version på begäran)

## Uppgiftsmall (används för alla paketuppgifter i Fas 2)

````markdown
### Uppgift N: [Namn]
**Filer:** Create/Modify/Delete med exakta sökvägar (+ radintervall vid Modify)
**Gränssnitt:** Konsumerar/Producerar (exakta tokens/klassnamn/URL:er som grannuppgifter beror på)
- [ ] Steg 1: [en handling, 2–5 min, med exakt innehåll/kod]
- [ ] Steg 2: Verifiera: [exakt kommando/kontroll + förväntat resultat]
- [ ] Steg 3: Commit: `git commit -m "..."`
````

## Självgranskning av planen (utförd)

1. **Spec-täckning:** Strömmar A–D i specen §5 mappar till P1–P8; definition av klart §6 → Fas 4; risker §7 → globala constraints + avslutssekvens. Inga luckor.
2. **Placeholder-skanning:** Paketinnehåll är märkt "preliminärt" per design — detaljuppgifter genereras i Fas 2 bakom Grind 2 (dokumenterad grind, inte utelämnad detalj).
3. **Konsistens:** Palett-tokens, branchnamn och katalognamn är identiska med specen.
