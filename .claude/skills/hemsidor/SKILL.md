---
name: hemsidor
description: Use when building a customer website or demo in Next.js in the SV Hus style — "hemsida i Next.js", "kunddemo i Next.js", "demo som SV Hus", "SV Hus-mallen", "bygg hemsidan för [kund] i next", "nextjs-demo för [kund]". Builds a server-rendered, zero-client-JS page inside the web/ app with the (demo) route group: :target-modal, CSS-only popup, rolling service tape, exclusive FAQ, hero video. Sibling skill to scroll-cinematic (static demos) — this one is the Next.js track.
argument-hint: [företag + nisch/ort, t.ex. "SV Hus nybyggnation Österåker"]
disable-model-invocation: true
---

# Hemsidor — kunddemo i Next.js (SV Hus-mallen)

Bygger en kundhemsida/demo som **server-renderad Next.js-route med NOLL egen
klient-JS**. All interaktivitet är HTML/CSS: `:target`, `<details>`, checkbox-
mönstret, CSS-animationer. Snabbare än något script-tungt, och inget kan krascha.

**Referensimplementation — KOPIERA DENNA:** `web/app/(demo)/svhus/`
(`page.js` + `svhus.module.css`). Live: `bahkobyra.se/svhus/`.
Mall-kanon fastslagen av Mathias 2026-08-18.

## Arkitektur

- **Route-gruppen `web/app/(demo)/`** har en egen rot-layout utan Bahkos
  header/footer/popup. Marknadssajten bor i `(sajt)/`. Gruppnamn i parentes
  påverkar inte URL:er. Lägg demon som `app/(demo)/<kund>/page.js`.
- **Lägg ALDRIG routen under `/cloud/`** — catch-all-rewriten i heliga
  `next.config.mjs` (`/cloud/:path*` → `index.html`) vinner över app-routen
  och ger 404. Dokumenterad incident 2026-08-18. URL blir `bahkobyra.se/<kund>/`.
- **Media i `web/public/<kund>/media/`.** Bilder genom `next/image` med
  `width`/`height` (ger WebP/AVIF + responsivt utan förarbete). Video som ren
  `<video>` — containern saknar ffmpeg, transkoda inte.
- **Fonter via `next/font`** (self-hostade, inget externt i kritisk väg).
  Kursiv display-vikt i EGEN instans med `preload: false` — den används i
  enstaka rubrikord och ska inte belasta första renderingen.
- Mörk canvas: `html:has(.sida), body:has(.sida) { margin:0; background:... }`
  + ett fixed `::before`-lager som hängslen där `:has` saknas.
  `scroll-padding-top` = headerhöjd + marginal, annars landar ankarhopp under
  den klistrade headern.

## Noll klient-JS-mönstren (med sina fallgropar)

| Mönster | Så | Fallgrop |
|---|---|---|
| Modal | `:target`-lager, stängkryss först i tab-ordning | Stäng mot ett fast `#stangd`-ankare, INTE `#top` — annars hoppar skrollpositionen. Sätt ALDRIG `aria-modal`/`role="dialog"`: utan JS finns ingen Escape/fokusfälla, och markeringen får inte lova det. Använd `<section aria-labelledby>`. |
| Mobilmeny | `:target`-panel i fixed lager UTANFÖR headern | Headerns `backdrop-filter` blir annars containing block för fixed. Panelen självstänger när hashen byter till sektionen man valde. |
| Auto-popup | CSS-animation med ~14 s `animation-delay` som entré; stängning via checkbox-mönstret (`input:checked ~ .popup { display:none }`) | Starta `opacity:0; visibility:hidden` så den är oklickbar före entrén. Vid `prefers-reduced-motion`: visa den INTE alls — en ruta som dyker upp av sig själv ÄR rörelse. Lyft den ovanför Bahko-demo-knappen på mobil. |
| Tjänste-tejp | Rullande band: `translateX(-50%)`-loop, listan dubblerad för sömlöshet, kopian `aria-hidden` | Paus på hover, stopp vid `prefers-reduced-motion`. |
| Exklusiv FAQ | `<details name="faq">` — webbläsaren stänger förra frågan själv | Äldre webbläsare ignorerar attributet (graceful: flera kan stå öppna). |
| Hero-video | `autoplay muted loop playsinline preload="metadata"` + `poster` | Playwrights Chromium saknar H.264 — verifiera via poster + HTTP 200, inte `readyState`. |
| Scroll-reveal | `animation-timeline: view()` bakom `@supports`, synligt utgångsläge | Sidan måste vara komplett även utan stöd. |

## Kaskad-lärdomen (kostade en hel rättningsrunda)

Basregeln för länkar ska vara **`.sida :where(a) { color: inherit }`** —
`:where()` nollar specificiteten (0,1,0) så komponentklasserna vinner på
ordning. Skrivs den `.sida a` (0,1,1) slår den ut VARJE knappklass: uppmätt
resultat var osynlig text (1,00:1) på telefon-CTA:n. Aldrig `!important`.
Kontrastregeln: ljus yta → mörk text; Bahko-element följer knappregeln
(marinblå på smaragd).

## Sanningsregeln (avgör om förslaget går att skicka)

- **Bara verifierade kundfakta.** Skriv ett VERIFIERAT-block i sidfilens
  toppkommentar med allt som får påstås, och en rad om vad som INTE är
  verifierat (ledtider, antal, garantier, policyer, priser). Allt utanför
  blocket är förbjudet — även "harmlösa" detaljer som "elva yrkesgrupper".
- **Lånade/genererade bilder märks:** "Illustration — era projektfoton läggs
  in här". Ingen sektion får heta Våra projekt eller Referenser.
- **Formulärets utgång:** `mailto:` till mathias@bahkobyra.se med ärlig not,
  tills kundens egen adress är verifierad. Gissa aldrig en kundadress.

## Media-trappan (i kostnadsordning)

1. **Återbruk = 0 cr.** Låna media från befintliga demos i samma nisch
   (aldrig deras JS). Byggbiblioteket: `web/public/cloud/bygg/media/`
   (GRANIT: före/efter-hus + videor, villa, badrum, skiffertak), även
   `nordiapartner`, `ekstromsbygg` m.fl. Kopiera till `web/public/<kund>/media/`.
2. **Higgsfield-generering** (via MCP `mcp__Higgsfield__*`; kör ALDRIG utan
   Mathias beställning, kostnadskoll med `get_cost: true` före varje modell):
   - **Bilder: `nano_banana_2`** med kundens egen bild som referens
     (uppmätt 1,5 cr/st; Mathias 2026-08-18: modellen är bra). Prompten låser
     produkten: "Keep ... EXACTLY as in the reference, unchanged".
   - **Video: `seedance_2_5`** (Mathias beslut 2026-08-18 — mall-standard för
     Next.js-spåret, ersätter seedance_2_0_mini här; ca 52 cr enligt repots
     pristabell, verifiera med kostnadskoll). `--mode omni_reference` för
     start-/slutbild.
   - Flödet: `media_upload` → curl PUT till presignerad URL → `media_confirm`
     → `generate_image_batch`/`generate_video_batch` → `jobs_wait` → en
     `show_generation_by_ids`. OBS: resultat-CDN:en kan vara blockerad av
     containerns egress-policy — då levereras länkarna till Mathias som
     hämtar filerna.
   - ~15 % av jobben failar server-side utan debitering: kör om EN gång, och
     kolla alltid jobblistan före omkörning (dubbel-debiteringsfall finns).

## Verifieringsrutinen (obligatorisk före merge)

1. `cd web && rm -rf .next && npx next build` — kör ALDRIG två byggen
   parallellt mot samma `.next` (ger falska ENOENT-fel).
2. `next start` på ledig port; Playwright med
   `executablePath: '/opt/pw-browsers/chromium'`, `.cjs`-filer i `web/` som
   raderas efteråt.
3. **Mät, tro inte:** kontrast med WCAG-formeln på VARJE knapp (≥ 4,5:1),
   `scrollWidth` exakt = viewport vid 390 px, borttagna texter grep:as bort ur
   renderad HTML, noll pageerror (bortse från ERR_TUNNEL/ERR_CONNECTION_RESET
   — sandlådans blockerade domäner), och att marknadssajtens `/`, `/om-oss/`
   m.fl. fortfarande svarar 200 med header/footer/maskoter kvar.
4. Tidsberoende copy (nedräkningar): testa med `page.clock` FÖRE och EFTER
   gränsen samt en helg — copy som ljuger efter klockslag är skickstopp.

## Design-ramar

- Egen distinkt palett per kund. Upptagna: smaragd (grontoglanser), lera
  (galiano), kobolt (k9maleri), orange (golvresan), solgul (solpanelstjejen),
  cyan (glowingservice), energigrön (nordiapartner), kalksten/mässing (svhus),
  timber-amber (vajjebygg), brun/créme (mugglagret).
- Typskala i fem steg som CSS-variabler, inte lösa värden.
- Rörelse i lager: hero-video, tejp, scroll-reveal, popup — men allt avstängbart
  via `prefers-reduced-motion`, och inget av det får bära innehåll ensamt.
