---
name: demo-recopy
description: Use when the user wants to reuse an EXISTING demo for a new lead/company by changing ONLY copy, palette and media references — no new generation, no credits spent. Since 2026-08-18 every recopy is built as a Next.js route on the SV Hus template (web/app/(demo)/svhus/), exactly like bahkobyra.se/svhus/. Trigger on "återanvänd demon", "byt copy på demon till...", "ny lead, samma nisch", "modda demon till...", "gör om demon", or any request to repurpose a built demo for a different company without regenerating media.
argument-hint: [nya leadets namn + nisch/ort, t.ex. "Väsby Mark AB anläggning Sollentuna"]
disable-model-invocation: true
---

# Demo-recopy — SV Hus-mallen med ny copy, återanvänt media, 0 credits

**Mathias beslut 2026-08-18: varje recopy byggs som Next.js-route på
SV Hus-mallen** (`web/app/(demo)/svhus/` — live: `bahkobyra.se/svhus/`).
Den gamla statiska GRANIT-koreografin används inte längre för nya recopys.
Strukturen, mönstren och alla regler ägs av **`hemsidor`-skillen** — läs den
först; den här skillen beskriver bara vad som skiljer en recopy från ett
nybygge: **noll ny mediagenerering.**

**Referensimplementationer:** `web/app/(demo)/svhus/` (originalet) och
`web/app/(demo)/shabifix/` (första recopyn på mallen — visar hur en befintlig
demos media och copy porteras in).

## Steg 1 — Utgångsdemo och media

Ingen ny generering. Media hämtas i den här ordningen:
1. Leadens befintliga demo (vid "gör om demon"): flytta mappen till
   `web/public/<kund>/media/`.
2. En annan demo i samma nisch (`ls web/public/cloud/*/media`): kopiera de
   filer som passar. Lånade bilder är illustrationer — se sanningsregeln.
3. Räcker inte det är det inte längre en recopy — då gäller `hemsidor`-skillens
   media-trappa (Higgsfield, kostar credits, kräver beställning).

## Steg 2 — Nisch-koll (obligatorisk)

Verifiera leadens faktiska bransch (Instagram/hemsida/bolagsregister — gissa
aldrig) mot mediat. Kranlyft säljer inte måleri: vid tydlig mismatch, stanna
och flagga i stället för att köra.

## Steg 3 — Bygg routen

```
cp -r "web/app/(demo)/svhus" "web/app/(demo)/<kund>"
mv <kund>/svhus.module.css <kund>/<kund>.module.css   # + uppdatera importen
```

Byt sedan — och bara detta:
1. **VERIFIERAT-blocket** i toppkommentaren: skriv leadens verifierade fakta.
   Allt utanför blocket får inte stå på sidan. Platshållarkonvention för
   okontaktade leads: `070-123 45 67`, formulär-mailto till
   `mathias@bahkobyra.se` (aldrig en gissad kundadress).
2. **Palett**: egen distinkt per kund (upptagna paletter listas i
   `hemsidor`-skillen). Har leaden redan en demo vars länk är skickad —
   behåll den identiteten.
3. **Typografi**: byt next/font-familj om kundens karaktär kräver det.
4. **Copyn**: hero (setup/punch), tejp-orden, tjänstekorten, processen,
   skälen, FAQ, kontakt. Samma smärta→mekanism→riskreversering som alltid.
   Löftesbaserade stats — aldrig historik-siffror åt en riktig kund.
5. **Media-sökvägarna**: peka på `/​<kund>/media/…`, sätt width/height,
   märk med "Illustration — era projektfoton läggs in här".
6. **Bahko-modalen**: mailto-subject med leadens namn; Cal-länken orörd.

Rör INTE mönstren: :target-modal/-meny, checkbox-popupen, tejpen,
`<details name>`-FAQ:n, scroll-reveal, `.sida :where(a)`-basen.

## Steg 4 — Gamla länkar

Ersätter recopyn en befintlig demo under `/cloud/<kund>/` är den länken
skickad och får aldrig brytas: lägg en redirect i `next.config.mjs`
(mönstret finns — sök på shabifix). Filen är helig: exakt de två raderna,
inget annat, och motivera i commiten.

## Steg 5 — QA och leverans

Kör `hemsidor`-skillens verifieringsrutin (bygg rent, Playwright, mät
kontrast, scrollWidth 390, grep gamla leadens namn = 0 träffar, pageerror 0,
marknadssajten oskadd) plus: verifiera redirecten med `curl -I` mot gamla
adressen. Committa, PR, merga på Mathias klartecken. Länk:
`bahkobyra.se/<kund>/`.

## Varför skillen finns

En ny lead i en känd nisch ska inte kosta credits eller byggtid. Mallen är
färdig, mediat finns — det enda nya är sanningen om just den här kunden.
