# scroll-cinematic v4 — tre expertlager Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Uppgradera `.claude/skills/scroll-cinematic/SKILL.md` (v3, 346 rader) med tre expertlager — copyexpert, designexpert, webb/telefon-optimering — byggda på Nordia Partner-sessionens verifierade lärdomar 2026-08-12.

**Architecture:** En fil ändras. Varje lager skrivs in i den sektion där regeln hör hemma (Steg 6, Steg 3–4, Struktur/QA) — inga nya toppsektioner utom mobillagret. Steg-numreringen 0–7 är FRYST (demo-recopy refererar Steg 0/1/5 vid namn).

**Tech Stack:** Markdown. Verifiering via grep.

## Global Constraints

- Steg 0/1/5-rubrikerna behålls ordagrant (demo-recopy-kontraktet, 14 referenser).
- Ingen v3-regel får tappas: tempo-lagarna, hotlink-guardrailen, modellblocket, Heligt-flödet i QA 16.
- Alla nya regler dateras 2026-08-12 med incident som källa.
- Måltal: ~420–460 rader (v3 = 346).

---

### Task 1: Copyexpert-lagret (Steg 6 skrivs om)

**Files:** Modify: `.claude/skills/scroll-cinematic/SKILL.md` — Steg 6

**Källor (verifierade denna session):** "hela copyn är värdelös" (staccato-formeln utan idé ratades trots att alla enkelhetsregler var uppfyllda) → omskrivningen med "det billigaste taket är det du redan har" godkändes och mergades.

- [ ] **Step 1:** Ny inledning: **Bärande idé FÖRST.** Innan någon rubrik skrivs formuleras EN mening som är (a) sann för kunden, (b) differentierande i nischen, (c) samma sak som videon visar. Exempel: "Det billigaste taket är det du redan har" (tvätta först, byt sist). Utan idé blir enkelhetsreglerna en staccato-formel — exakt det som ratades 2026-08-12. Formeln smärta→mekanism→riskreversering är underordnad idén.
- [ ] **Step 2:** **Ärlighet som positionering:** den starkaste riskreverseringen är att avstå försäljning ("Räcker det med en tvätt säger vi det. Även när ett byte hade gett oss mer betalt." / "Vi säljer inte takbyten till tak som bara behöver ett bad."). Minst en sådan mening per demo — i citatet eller Om oss.
- [ ] **Step 3:** **EN handling per sida:** samma CTA-verb överallt (header, float, CTA-sektion, nudge, kontaktkort) — "Boka gratis takkoll" ×6, aldrig synonymvariation. Knappen ska vara det lägsta tänkbara åtagandet i nischen (takkoll < offert < köp).
- [ ] **Step 4:** **Rytmregeln:** hero/punch kort — men brödtext i människoton med varierad meningslängd. En sida där varje mening är 3–5 ord läses som reklamrobot. Kolon hellre än tankstreck (em-dash är AI-kadens, designdetektorns advisory).
- [ ] **Step 5:** Behåll oförändrat: punch 2–3 ord, noll slutledning, siffran slår bilden, spegelfras=ordvits, tolvåringstestet, ingen hero/stats-dubblett, jag-form för personligt varumärke.

### Task 2: Designexpert-lagret (Steg 3–4 + galleriregler)

**Files:** Modify: samma fil — Steg 3, Steg 4, Galleri-sektionen

**Källor:** plastglans-B:n ratades ("bilderna dåliga"); crossfade-morfen ratades ("videon är dålig"); glödlinje-klippet kasserades (20 cr); spraysvepet godkändes; "bilderna för stora" för andra gången (Nordia-galleriet).

- [ ] **Step 1 (Steg 3):** Art direction-regel för alla keyframes: "documentary contractor photography, natural muted colors, no HDR". Blank/plastig AI-finish ratades 2026-08-12.
- [ ] **Step 2 (Steg 3):** **Exteriör-checklista** (parallell till interiör-checklistan): B granskas mot A punkt för punkt — takpannornas PROFIL och typ (materialprofil räknas som geometri!), panelantal + delning, skorsten/ventiler, takkupa, hängrännor/stuprör, bakgrund. Pannprofilbytet var det som gjorde v1-klippet till en synlig morf.
- [ ] **Step 3 (Steg 4):** **Förvandlingen ska se ut som ARBETE, aldrig som en crossfade.** Global uttoning ("mossan försvinner överallt samtidigt") = AI-morf, ratad. Recept: en fysisk process rör sig över subjektet — högtrycksstråle med dimma, rent bakom/smutsigt framför, rad för rad. Prompta explicit: "NO glowing lines, NO light effects, no lens flares" (första svepet renderades som sci-fi-glödlinje och kasserades).
- [ ] **Step 4 (Steg 4):** **Diagnostisera klipp med frames före leverans:** `ffmpeg -i klipp.mp4 -vf "select='eq(n\,48)+eq(n\,96)+eq(n\,144)',scale=1100:-2,tile=1x3" -frames:v 1 check.jpg` och GRANSKA. Fångar morf, glöd och geometridrift som `generate get` aldrig visar.
- [ ] **Step 5 (Galleri):** Desktop-galleriet får bredtak: `max-width:920px;margin:0 auto` — fullbredds-thumbrad flaggades "för stora" två gånger (Glowing 2026-08-11, Nordia 2026-08-12).

### Task 3: Webb/telefon-optimeringslagret (ny undersektion + Struktur/budget/QA)

**Files:** Modify: samma fil — Galleri/mobil/klick-sektionen byggs ut, modellblockets budgetrad, Strukturtabellen (Hero), QA-listan

**Källor:** "den är inte telefonoptimerad" — 16:9 cover-croppad på stående skärm visade en smal remsa av förvandlingen; tre staplade fullbreddskort; textknapp trängde loggan vid 390px.

- [ ] **Step 1:** **Porträtthero för mobil:** generera en TREDJE video — samma klipp-1-prompt och samma A/B-referenser men `--aspect_ratio 9:16` — och ladda den vid stående orientering med inline-script direkt efter hero-markupen (aldrig defer):
```html
<script>
(function(){
  var v=document.getElementById('hero-vid');
  if(v&&matchMedia('(orientation: portrait)').matches){
    v.poster='media/poster-fore-[motiv]-mobil.jpg';
    v.src='media/video-[motiv]-mobil.mp4';
  }
})();
</script>
```
Egen poster ur porträttklippets frame 0. Budget uppdateras: 3×3 + 3×20 = **69 credits/demo** (49 utan porträttklipp — hoppa bara över det om Mathias säger det).
- [ ] **Step 2:** **Projektkorten på mobil:** `repeat(2,1fr)` + tredje kortet `grid-column:1/-1` — ALDRIG tre staplade fullbreddare (= "långa bilder"-klagomålet).
- [ ] **Step 3:** **Ikon-ringknapp:** 44×44 px rund telefonikon bredvid hamburgaren (textknappen "Ring oss" trängde loggan vid 390 px). aria-label med hela numret.
- [ ] **Step 4:** **Lästext ≥13 px på mobil** (brödtext, kort-texter, captions, service-rader). Uppercase-kickers/etiketter ≥11 px är undantagna — de är möbler, inte läsning.
- [ ] **Step 5:** **Mediabudget per demo:** hero-mp4 ≈1 MB · bakgrund ≈1,7 MB · porträtt ≈0,8 MB · thumbs ≤300 KB · posters ≤300 KB. CRF 26 + `-an` + faststart som förr.
- [ ] **Step 6 (QA):** Två tillägg: (a) **designdetektorn körs manuellt** när sidan byggts/ändrats via skript — hooken triggar bara på Edit/Write-verktygen: `node ~/.claude/plugins/cache/impeccable/impeccable/<version>/skills/impeccable/scripts/detect.mjs web/public/cloud/[kund]/index.html` från repo-roten; (b) porträttvideon + orientation-scriptet verifieras (poster matchar porträttklippets frame 0).
- [ ] **Step 7 (Higgsfield-blocket):** ny CLI-lärdom: `Error: request failed (no response received)` betyder INTE att jobbet misslyckades — det kan ha registrerats server-side. Kolla `generate list` innan omkörning (Nordia B2 debiterades och lyckades trots felet).

### Task 4: Referens + verifiering + leverans

- [ ] **Step 1:** Modern referens uppdateras: **`web/public/cloud/nordiapartner/`** (nyast — porträtthero, 2-kol kort, ikon-ringknapp, galleribredtak, tvätta-först-copyn). glowingservice kvarstår i palettlistan.
- [ ] **Step 2:** Verifieringar: `grep -c "### 0\.\|### 1\.\|### 5\."` = 3 (frysta rubriker) · grep "Tempo-lagar" ≥1 · grep "Hotlinka ALDRIG" =1 · grep "69 credits" ≥1 · grep "orientation: portrait" =1 · grep "NO glowing lines" ≥1 · grep "920px" ≥1 · grep "detect.mjs" =1 · radantal 400–480.
- [ ] **Step 3:** Commit + push + PR. Planen ingår i PR:en. INGEN merge utan Mathias.
