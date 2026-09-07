---
name: ig-karusell
description: Bygger premium Instagram-karuseller för @bahkobyra (6 slides, 4:5) i Bahkos visuella värld — antingen Brand-läge (HTML→Edge-rendering, 0 kr, exakt varumärke) eller Cinematiskt läge (Higgsfield AI-bilder, kräver MCP + credits). Alltid dunder hook på omslaget, undervisande innehåll för bygg/hantverk-nischen, mjuk CTA. Använd när användaren säger "karusell", "ig carousel", "instagram-karusell", "gör en karusell", "carousel post", "veckans karusell" eller vill återanvända en text/video som slide-baserat innehåll. Levererar direkt till Drive-strukturen (Karusell N).
argument-hint: [ämne eller text/transkript att återanvända]
---

# IG-karusell för @bahkobyra

Bygger 6-slides-karuseller där alla slides lever i samma visuella värld. Baserad på "famous-ig-carousel"-konceptet (säkerhetsgranskad 2026-08-15) men helt anpassad till Bahko Byrå: svensk copy, bygg/hantverk-nischen, varumärke v2 och husets content-principer.

Full stilspecifikation, prompt-mallar och HTML-mall: [references/stil-bahko.md](references/stil-bahko.md) — läs den innan slides byggs.

## Grundprinciper (gäller varje karusell)

- **Förtjäna förtroende:** undervisa, sälj inte. Tittaren ska bli klokare av varje slide även om de aldrig hör av sig.
- **Veckans lösning (rotation, 2026-08-16):** karusellens lösning baseras på EN av sex, samma som allt annat innehåll den veckan: mer förfrågningar / bättre betalt / mer trovärdighet / direktbokning / rekrytering / månadsvård av Google-profilen. Rotationen är förankrad i v34 2026 = mer förfrågningar: (ISO-veckonummer − 34) delat med 6, resten avgör — 0 = förfrågningar, 1 = bättre betalt, 2 = trovärdighet, 3 = direktbokning, 4 = rekrytering, 5 = Google-månadsvård (v34 förfrågningar, v35 bättre betalt, v36 trovärdighet, v37 direktbokning, v38 rekrytering, v39 Google-månadsvård, v40 om igen). Säg vilken som gäller vid leverans. Aldrig två lösningar i samma karusell.
- **Barton:** skriv som en vän på en bar förklarar det — varmt, rakt, noll corporate-svenska. Expertton genom nischförståelse, inte genom svåra ord.
- **Dunder hook:** omslaget avgör allt. Skriv 5 hook-varianter, välj den vassaste.
- **Mjuk CTA:** de flesta karuseller avslutas mjukt ("följ för mer", "spara den här"). Hård CTA (DM:a DEMO → kostnadsfri demo som visar hur de får fler kundförfrågningar, mer trovärdighet och kan ta mer betalt) bara när innehållet naturligt leder dit.
- **Ärlighet:** aldrig påhittade siffror eller kundresultat. Räkneexempel märks som exempel.
- **Aldrig tankstreck** i slide-copy eller caption. Korta meningar, enkel svenska.

## Steg

### 1. Ämne och innehåll
`$ARGUMENTS` = ämnet, eller en text/transkript att återanvända. Saknas ämne: föreslå 3 vinklar ur bygg/hantverk-nischen (hemsida/synlighet-problem ur kundens vardag) och låt användaren välja.

### 2. Välj läge

| Läge | När | Kostnad |
|------|-----|---------|
| **Cinematiskt** (STANDARD, Mathias beslut 2026-08-16) | Alltid när skillen körs, om inget annat sägs. Higgsfield AI-bildvärld med maskot via `higgsfield-generate`-skillen. Att användaren kör skillen räknas som credit-godkännande för en karusell (~6–15 credits inkl. omkörningar). | ~6–15 credits |
| **Brand** (på begäran) | Bara när användaren uttryckligen ber om det, eller när Higgsfield-CLI:n inte är inloggad. HTML→Edge, exakt varumärke. | 0 kr |

Om Higgsfield-CLI:n inte är inloggad (`higgsfield auth login`): säg det och fråga om Brand-läget duger. Blanda aldrig lägen i samma karusell.

**Higgsfield-lärdomar (2026-08-16):** kör slides 2–6 parallellt i bakgrunden med omslagets job-id som `--image`-referens; jobb misslyckas ibland tyst — kolla `"status"` i json-svaret (inte exit-koden, egna grep-rader ger falska larm) och kör om misslyckade (debiteras ej); AI:n klarar svensk text förvånansvärt bra om prompten citerar exakt text och avslutar med "Render all quoted Swedish text exactly as spelled"; småfel att leta efter i QA: extra ansiktsdrag på maskoten, engelsk rekvisita-text (skriv KONTRAKT etc. i prompten).

### 3. Planera 6 slides (alltid denna dramaturgi)

1. **Omslag** — dunder hook, maximal nyfikenhet, inget svar
2. **Insikten/problemet** — vad de flesta i nischen missar
3. **Exempel/lista** — 3–5 konkreta punkter
4. **Jämförelse** — fel sätt vs rätt sätt
5. **Gör så här** — konkreta steg tittaren kan ta själv idag (walk-away value)
6. **CTA** — mjuk som standard: @bahkobyra + spara/följ; hård (DM:a DEMO → kostnadsfri demo) endast när ämnet leder dit

Inga utfyllnadsslides. Omslaget ÄR hooken, varje annan slide levererar värde.

### 4. Bygg slidesen
Följ valt läges instruktioner i [references/stil-bahko.md](references/stil-bahko.md):
- **Brand-läge:** generera HTML per slide från mallen, rendera med Edge headless till 1080×1350 PNG. OBS: spara PowerShell-skript med UTF-8 BOM (annars blir åäö förstörda) och verifiera EN renderad slide visuellt innan resten godkänns.
- **Cinematiskt läge:** invoka `higgsfield-generate`-skillen. Omslaget först (Nano Banana Pro, 4:5, 2k), sedan slides 2–6 med omslaget som referensbild så alla lever i samma värld. Ladda ner till disk.

### 5. Kvalitetskoll före leverans
- Läs varje slide visuellt (Read på PNG:erna): korrekt svenska, rätt färger, läsbar text
- Copyn klarar: undervisar den? Skulle en byggare spara den? Är hooken dunder?
- Inga påhittade siffror, inga tankstreck

### 6. Leverera
1. Leverans sker ALLTID till veckomappen: `H:\Min enhet\BahkoByrå\BahkoByra\Planerat v[vecka]\karusell N\` där N räknas inom veckan (karusell 1, karusell 2 ...). Rotens gamla `Karusell 1–3` är arkiv — skapa aldrig nya där.
2. Lägg slides som `1.png`–`6.png` + `Caption och postinfo.txt` i mappen
3. Caption-filen: hook-rad + 2–3 värderader + CTA + 5 nischade hashtags + postinstruktioner (ordning, föreslagen dag)
4. Om H: inte är monterad: spara lokalt i `.tmp/` och säg till användaren att starta Google Drive

## Guardrails

- Higgsfield kostar credits — generera ALDRIG AI-bilder utan uttryckligt ja i samma konversation
- Posta aldrig automatiskt — publicering är alltid Mathias beslut
- Handtaget är **@bahkobyra** (bytt från @bahkostudio 2026-08-15) — logga: smaragdgrön rundad kvadrat med vitt B
- En stil per karusell, alla 6 slides i samma visuella värld
