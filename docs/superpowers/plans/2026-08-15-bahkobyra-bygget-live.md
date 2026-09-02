# bahkobyra.se "Bygget live" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bygga om startsidan på bahkobyra.se enligt specen `docs/superpowers/specs/2026-08-15-bahkobyra-bygget-live-design.md` (riktning C + A:s copy) och sätta maskoten i tio sammanhang över hela huvudsajten.

**Architecture:** Next.js 15 app router, route-gruppen `web/app/(sajt)/`. Nya klientkomponenter (`HeroBygge`, `Rakna`, `Portfolj`, `StickyBokning`) bredvid befintliga i `web/app/komponenter/`. Bildrutor som statiska webp i `web/public/brand/maskot/bygge/`. Inga nya beroenden.

**Tech Stack:** Next 15.5, React 19, CSS Modules, ffmpeg (bildrutor). Verifiering: `npm run build`.

## Global Constraints

- Rör inte: `(demo)`-gruppen, `web/public/cloud/`, `web/public/css/style.css`, `web/public/js/main.js`, `web/next.config.mjs`, `web/vercel.json`, kundsajterna.
- Knappregeln: smaragd `#10b981` + marinblå text, aldrig vit text på smaragd. Klassen `btn btn-primar` finns.
- Inga nya npm-paket. Inga emoji. Copy ordagrant enligt specen §2.
- Bara `transform`/`opacity` animeras. `prefers-reduced-motion` hanteras i varje ny komponent.
- Worktree `site/bygget-live` från `origin/main`. Ingen merge utan Mathias.

---

### Task 1: Bildrutor + HeroBygge

**Files:**
- Create: `tools/assets/bygge-frames.sh`
- Create: `web/public/brand/maskot/bygge/f-000.webp … f-071.webp`
- Create: `web/app/komponenter/HeroBygge.js`, `web/app/komponenter/HeroBygge.module.css`
- Modify: `web/app/(sajt)/page.js` (hero-sektionen), `web/app/(sajt)/page.module.css`

- [ ] **Step 1:** Skapa rutorna: `ffmpeg -i web/public/brand/maskot/bahko-bygger-loop.mp4 -vf "fps=9,scale=1200:-2" -c:v libwebp -quality 72 web/public/brand/maskot/bygge/f-%03d.webp` (numrering från 000 via `-start_number 0`). Verifiera: 72 filer, största ≤ 30 KB, summa ≤ 1,8 MB.
- [ ] **Step 2:** `HeroBygge.js` ('use client'): props `antal=72`, `bas='/brand/maskot/bygge/f-'`. Renderar `<div class=scen>` med `<img src=f-000>` (alltid) och `<canvas>` (visas när ≥ 8 rutor laddats). Effekt: mät sektionens rektangel, progress `p = clamp((-rect.top) / (rect.height - vh))`, utjämning 0.14, rita ruta `Math.round(p*(antal-1))`. Laddning: rutor 0–7 direkt, resten i batchar om 8 via `requestIdleCallback` (fallback `setTimeout`). Under 900 px eller reduced-motion: rendera `<video>` (loopen) resp. sista rutan, ingen canvas.
- [ ] **Step 3:** Framstegsstreck: fyra `<span>` under scenen, fylls via `--p` custom property satt på wrappern.
- [ ] **Step 4:** Byt heron i `page.js` till specens §2-copy + `<HeroBygge/>`. Sektionen: `.heroBygge { min-height: 220vh }` + `.heroPin { position: sticky; top: 0; height: 100svh; display: grid; grid-template-columns: 1fr 1fr }` (≥ 900 px). Under 900 px: `min-height: auto`, block.
- [ ] **Step 5:** `npm run build` grönt. Commit `feat: hero Bygget live`.

### Task 2: Räknare, videosektion, marquee

**Files:**
- Create: `web/app/komponenter/Rakna.js`
- Modify: `web/app/(sajt)/page.js`, `page.module.css`

- [ ] **Step 1:** `Rakna.js` ('use client'): props `till` (nummer), `suffix`, `decimaler=0`. IntersectionObserver (threshold .5, once) → 1,1 s `power1.out`-tick via rAF. Reduced motion → slutvärdet direkt. Icke-numeriska värden ("48h") delas i tal + suffix av anroparen.
- [ ] **Step 2:** SIFFROR → `<Rakna till={48} suffix="h"/>` osv. Behåll maskoten `pekar`.
- [ ] **Step 3:** Ny sektion `#video` (mörk) efter siffrorna: eyebrow "Två minuter, rakt på sak", H2 "Därför syns inte ditt företag på Google.", `<HeroVideo/>`. Herons sekundärknapp → `href="#video"`.
- [ ] **Step 4:** MARQUEE-listan: `smamaleri.se`, `brommatradgardsservice.se`, `maykaskitchen.se`, `Förslag inom 48 timmar`, `Ni äger sidan`, `Synlighet som säljer`.
- [ ] **Step 5:** Build grönt. Commit `feat: räknare, videosektion, bevis-marquee`.

### Task 3: Portföljen

**Files:**
- Create: `web/app/portfolj.js` (data), `web/app/komponenter/Portfolj.js`, `Portfolj.module.css`
- Modify: `web/app/(sajt)/page.js` (CASE-sektionen ersätts)

- [ ] **Step 1:** `portfolj.js`: 6 poster `{namn, kategori, typ:'kund'|'demo', url, bild, rad}` — kunder från `case/page.js` (rad = en mening ur `lang`, utan nya siffror), demos Vajje Bygg / GRANIT / Asmar med bild ur `/img/`.
- [ ] **Step 2:** `Portfolj.js` ('use client'): chips Alla · Kunder · Demos (state), grid `repeat(3,1fr)` → 2 → 1, kort: bild 16/10, tagg, namn, rad, "Öppna sajt"-pil. Första kortet får `position: relative` + `<Maskot pose="kikar" stil="liten">` absolut placerad bakom övre högra hörnet, synlig vid hover (desktop) och alltid på mobil.
- [ ] **Step 3:** page.js: sektionen `#case` byter till eyebrow "Leveranser i drift", H2 "Riktiga sajter. Riktiga firmor.", `<Portfolj/>`, kvar: knappen "Se fler leveranser och demos" → `/case/`.
- [ ] **Step 4:** Build grönt. Commit `feat: portföljgrid med filter`.

### Task 4: Sticky bokningsrad

**Files:**
- Create: `web/app/komponenter/StickyBokning.js`, `StickyBokning.module.css`
- Modify: `web/app/(sajt)/layout.js`

- [ ] **Step 1:** Komponent ('use client'): visas när `scrollY > innerHeight * 0.9`, göms när `<footer>` är i bild (IntersectionObserver) eller `body.style.overflow === 'hidden'` (popup/meny öppen — läs `document.body.dataset.lager`; Popup/Header sätter `data-lager` när de öppnar). Innehåll: `<Maskot stil="mini" pose="master">` + text + `<Link href="/kontakt/" class="btn btn-primar">Se er sida gratis</Link>`; under 720 px: text göms, knapp + `<a href="tel:+46762540951">` ring-ikon 44 px.
- [ ] **Step 2:** Entré: `transform: translateY(110%)` → `0`, `--studs`, 400 ms. `env(safe-area-inset-bottom)`. Höjd ≤ 64 px.
- [ ] **Step 3:** Montera i `(sajt)/layout.js` efter `<Footer/>`. Build grönt. Commit `feat: sticky bokningsrad`.

### Task 5: Maskoten i tio sammanhang

**Files:**
- Modify: `web/app/komponenter/Maskot.js`, `Maskot.module.css`, `Header.js`, `Header.module.css`, `Footer.js`, `Footer.module.css`, `Popup.js`, `NischSida.js`, `(sajt)/tjanster/[slug]/page.js`, `(sajt)/om-oss/page.js`, `(sajt)/kontakt/page.js`, `(sajt)/case/page.js`, `(sajt)/vad-kostar-en-hemsida/page.js`, `(sajt)/webbyra-jonkoping/page.js`
- Create: `web/app/(sajt)/not-found.js`, `not-found.module.css`

- [ ] **Step 1:** Nya gester i CSS: `kikar` (figur `translateY(18px) rotate(12deg)` → hover `translateY(0)`, 320 ms `--studs`), `vilar` (figur `rotate(-8deg)`, andning 5,2 s), `rycker` (båda armarna `rotate(±40deg)` + kroppen studsar 2 s). Ny storlek `.mini { width: 34px; height: 34px }`. Lägg till i `GESTER`-listan och reduced-motion-blocket.
- [ ] **Step 2:** Header: `<Maskot stil="mini" pose="vinkar">` före knappen (desktop), `aria-hidden`. Footer: `<Maskot stil="rund" pose="vilar">` i första kolumnen under taglinen. Popup: `<Maskot stil="popup" pose="vinkar">` överst i kortet.
- [ ] **Step 3:** `not-found.js`: mörk sektion, "4 [maskot rycker] 4", H1 "Den här sidan har jag inte byggt än.", text "Kolla adressen, eller börja från startsidan.", knapp "Till startsidan".
- [ ] **Step 4:** Undersidor: i respektive H1-rad `<Maskot pose="vinkar" stil="liten" alt="Bahko-maskoten hälsar"/>` (mönstret från FAQ-rubriken). NischSida får den i sin hero.
- [ ] **Step 5:** Build grönt. Commit `feat: maskoten på hela sajten`.

### Task 6: QA + leverans

- [ ] **Step 1:** `cd web && npm run build` — noll fel/varningar av typen unused/hydration.
- [ ] **Step 2:** Designdetektorn: `node ~/.claude/plugins/cache/impeccable/impeccable/4.0.4/skills/impeccable/scripts/detect.mjs "web/app/(sajt)/page.js"` + nya CSS-moduler; nya fynd åtgärdas eller flaggas.
- [ ] **Step 3:** Heligt-diff mot origin/main över alla skyddade sökvägar = tom. Grep: `Växa på Google` förekommer bara där den redan fanns.
- [ ] **Step 4:** Push `site/bygget-live`, PR med canvaslänk, specen och det som INTE byggdes (ny film, resultatsiffror). Ingen merge utan Mathias. Efter merge: verifiera 200 på `/`, `/tjanster/hemsidor/`, `/case/`, en 404-adress, och att kundsajterna svarar.
