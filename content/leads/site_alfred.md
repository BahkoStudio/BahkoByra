# Site research: alfredallservice.se
Datum: 2026-06-11

## Åtkomststatus (2026-06-11)
- WebFetch mot `/` och `/tjanster/`: HTTP 403.
- curl (browser-UA, även utan sandbox): HTTP 403, body "Host not in allowlist" → blockeringen sker i körmiljöns nätverksproxy, INTE nödvändigtvis hos sajten. Sajten är bekräftat nåbar i webbläsare enligt användaren.
- Fallback: WebSearch (site:-sökningar + cachade snippets). Alla fynd nedan källmärkta.

## Fynd 1 — Google-index (site:alfredallservice.se, 2026-06-11)
- site:-sökningen gav INGA träffar för domänen → sajten verkar ej indexerad av Google (eller blockerar indexering). Det är i sig ett demo-säljargument: sajten syns inte i sök.
- Källa: Google-sökresultat (tom site:-träfflista).

## Fynd 2 — Uttömda sökvägar (WebSearch 2026-06-11)
Körda sökningar: `site:alfredallservice.se`, `"alfredallservice.se"`, `"alfredallservice"`, `"Alfred Allservice" Nässjö`, `"Alfred All Service" Nässjö + tjänsteord`, `"Alfred Allservice" allabolag/hitta/ratsit`, `instagram/facebook "alfredallservice"`.
- **Noll träffar på företaget i samtliga sökningar.** Inga cachade snippets existerar — domänen har 0 indexerade sidor, så det finns inget cachat sidinnehåll att hämta.
- Wayback Machine (web.archive.org) ej nåbar från denna miljö ("unable to fetch") — arkivkopia kunde inte kontrolleras.
- Företag med snarlika namn i sök är ANDRA bolag: "Alfreds allservice" (Åseda, jordbruk/skog, Karl Alfred Emilsson) och "Alfreds Allservice" (Tullinge/Botkyrka, bilrekond — facebook.com/p/AlfredsAllservice-61575031715381). Får inte förväxlas.
- Källa: WebSearch 2026-06-11.

## Fynd 3 — Verifierat ur intern lead-research (content/leads/alfred_allservice.md, 2026-06-11)
- **Telefon: 0380-69 20 07** (riktnr 0380 = Nässjö) — hämtat från IG-inlägg, INTE verifierat från sajten.
- **IG: @alfredallservice** (8 inlägg, 77 följare). Content: renovering, golv, badrum före/efter, kakel, altan/uterum, snickeri.
- **Bio-länk www.alfredallseevice.se (dubbel-e) = död domän, ingen DNS-post.** Rätt domän alfredallservice.se har DNS (2a02:250:0:8::52, svensk hosting-range) men svarar 403 mot alla våra fetchers.
- Ingen GBP, ingen katalogpost (hitta/eniro/reco), inget org.nr hittbart. Ingen e-post eller adress publicerad någonstans utom ev. på sajten.
- Källa: content/leads/alfred_allservice.md (intern research samma datum, källmärkt per rad).

## OBESVARAT — kräver manuell browser-koll (sajten oåtkomlig härifrån)
Följande frågor ur uppdraget kunde INTE besvaras via något verktyg (sajt 403, 0 indexerade sidor, inget arkiv):
- Exakt tjänstelista på /tjanster/ — okänd
- Om-oss-text och ton — okänd
- Kontaktuppgifter PÅ SAJTEN (mejl/adress/org.nr) — okända
- Plattform/generator-meta, title/H1, kontaktformulär — okänt
- Bildmaterial (egna jobbfoton vs stock) — okänt
- Nässjö-omnämnande på sajten — okänt (Nässjö dock styrkt via riktnummer 0380)
→ 2 min manuellt: öppna `/` och `/tjanster/` i mobil, screenshota, notera title/H1/tjänster/formulär/footer (plattform syns oftast i footern eller sidkällan: "Sidan skapad med ...").

---
## DEMO-MATERIAL

**Att återanvända i demon (verifierat):**
- Företagsnamn: **Alfred Allservice** | Ort: **Nässjö** (styrkt via riktnr 0380) | Telefon: **0380-69 20 07** → gör till hjälte-CTA ("Ring 0380-69 20 07", klick-för-att-ringa)
- Tjänstekort speglar IG-innehållet: **Badrumsrenovering / Golv & kakel / Altan & uterum / Snickeri & renovering** — varje kort = framtida landningssida ("Snickare Nässjö", "Badrumsrenovering Nässjö" — mönstret som rankande konkurrenter Fallnafors, Kansjö Bygg, Nässjö Golv använder)
- Bildmaterial: deras egna före/efter-foton från IG @alfredallservice (badrum, golv, kakel, altan) — de HAR bildbeviset, fel plattform
- Verksamhetsområde-förslag: "Nässjö med omnejd" (Eksjö, Forserum, Bodafors)
- Säljkrok i mötet: den döda bio-länken (www.alfredallseevice.se = DNS-fel) live i mobil → sedan demon. Plus: "din sajt har 0 sidor i Google — den kan inte ranka på någonting."

**Vad som SAKNAS (kan inte tas från sajten, måste fås från kunden eller kollas manuellt):**
- All befintlig sajtcopy/tjänstelista, om-oss-text, ev. mejladress, org.nr/juridiskt namn, ev. fler bilder
- Bekräftelse att sajten ens visar innehåll i webbläsare (kan vara parkerad/tom)

*Alla observationer källmärkta ovan. Inget på själva sajten kunde verifieras — den är blockerad för alla våra verktyg och saknas helt i Google-index och (åtkomstbart) webbarkiv.*
