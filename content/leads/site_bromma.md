# Site research: brommatradgardsservice.se
Datum: 2026-06-11

## Åtkomststatus (2026-06-11)
- WebFetch mot `/`: HTTP 403.
- curl (browser-UA, även utan sandbox): HTTP 403, body "Host not in allowlist" → blockeringen sker i körmiljöns nätverksproxy. Sajten bekräftat nåbar i webbläsare enligt användaren.
- Fallback: WebSearch (site:-sökningar + cachade snippets). Alla fynd nedan källmärkta.

## Fynd 1 — Google-index (site:brommatradgardsservice.se, 2026-06-11)
- Endast EN indexerad sida: startsidan. Title i index: **"Startsida - Bromma Trädgårdsservice"** ("Startsida -" = standard-title, typiskt WordPress utan SEO-anpassad title).
- Indexsnippet bekräftar copy-inriktningen: pålitliga och anpassade lösningar för **fastigheter och offentliga miljöer i Stockholm**, mål att skapa välskötta och trivsamma utemiljöer **året runt**.
- Teamet leds av **Jens Amnesten**.
- Tjänster enligt snippet: trädgårdsskötsel, professionella mark-/anläggningstjänster samt **snöröjning och halkbekämpning**.
- Källa: Google-sökresultat för site:brommatradgardsservice.se.

## Fynd 2 — Cachade snippets från startsidan (Google, 2026-06-11)
Formuleringar (parafraserade ur indexsnippets, mycket nära originalcopy):
- "Med **Jens Amnesten** och hans team får du pålitlig, kostnadseffektiv service som sticker ut i Stockholm."
- "Bromma Trädgårdsservice skapar **trygga och välskötta utemiljöer året runt** med **anpassade avtal** som matchar dina behov."
- Tjänstetriad så som den framställs på startsidan:
  1. "**Effektiv snöröjning och halkbekämpning** för trygga fastigheter året runt"
  2. "**Trädgårdsskötsel** med precision och omsorg enligt dina önskemål"
  3. "**Professionella marktjänster** för hållbara och vackra utemiljöer"
- BEKRÄFTAT: copyn riktas mot "**fastigheter och offentliga miljöer** i Stockholm" — B2B/BRF-ton, inte villaträdgårdar.
- BEKRÄFTAT: snöröjning/halkbekämpning ligger framträdande på startsidan (vinter-copy mitt i sommaren — demo-vinkel håller).
- Källa: Google-snippets för brommatradgardsservice.se (sökning "Bromma Trädgårdsservice" "Jens Amnesten").

## Fynd 3 — Bekräftelse av meta description-copy (WebSearch "Bromma Trädgårdsservice" Stockholm, 2026-06-11)
Indexsnippetarna ger en konsekvent bild av startsidans copy (samma formuleringar i tre separata sökningar):
- Erbjuder pålitliga och anpassade/skräddarsydda lösningar för **fastigheter och offentliga miljöer i Stockholm**
- Mål: skapa **välskötta och trivsamma utemiljöer året runt**
- Leds av **Jens Amnesten** ("Med Jens Amnesten och hans team får du pålitlig, kostnadseffektiv service som sticker ut i Stockholm")
- Tjänstetriad: **trädgårdsskötsel** ("med precision och omsorg"), **professionella marktjänster** ("för hållbara och vackra utemiljöer"), **snöröjning och halkbekämpning** ("effektiv ... för trygga fastigheter året runt")
- **BEKRÄFTAT:** B2B/fastighets-vinkeln OCH snöröjningen ligger kvar i startsidecopyn per 2026-06-11 — vinter-copy mitt i juni. Demo-vinkeln håller.
- Källa: Google-snippets för brommatradgardsservice.se (tre oberoende sökfrågor).

## Fynd 4 — Undersidor, plattform, priser (vad som KAN och INTE kan verifieras)
- **Undersidor:** endast `/` är indexerad. `site:brommatradgardsservice.se tjänster OR kontakt OR snöröjning` → noll träffar. Existensen av /tjanster, /kontakt, /om-oss kan INTE bekräftas härifrån — antingen one-pager eller oindexerade undersidor. [Källa: site:-sökningar 2026-06-11]
- **Plattform:** title-mönstret "Startsida - Bromma Trädgårdsservice" är klassisk WordPress/sidbyggar-default ("Sidtitel - Sajtnamn"). Stark indikation på WordPress, men EJ verifierat (generator-meta kräver sidkällan). [Källa: indexerad title]
- **Priser/RUT:** inga priser och inget RUT-omnämnande i något indexerat innehåll. Konkurrenter visar pris öppet i SERP (ReGarden 415 kr/h; Hjärtat Miljöservice "från 309 kr/h efter RUT"). [Källa: SERP-snippets 2026-06-11]
- **Kontaktvägar:** e-post **jens@brommatradgardsservice.se** (från IG, intern lead-research). Telefon/adress/formulär på sajten EJ verifierbart härifrån. Org: enskild näringsidkare "Amnesten, Jens", reg. 2026-01-09, säte Nacka (Kvarnholmsvägen 99) — INTE Bromma. [Källa: content/leads/bromma_tradgardsservice.md + bolagsfakta/ratsit via WebSearch]
- **Wayback Machine:** ej nåbar från denna miljö — arkivkopia kunde inte kontrolleras.
- **Bildmaterial:** EJ verifierbart (sajten blockerad). IG @brommatradgardsservice (18 inlägg, 1 863 följare) har egna jobbfoton + highlights (Husqvarna, Tävling). [Källa: intern lead-research]
- **Budskapsglapp (verifierat):** IG-bion säljer villaträdgård (Trädgårdsskötsel & underhåll, Gräsklippning, Beskärning, Häckar, Löv) — sajten säljer fastigheter/offentliga miljöer + snöröjning. [Källa: IG-bio vs Google-snippets]

## OBESVARAT — kräver manuell browser-koll (5 min)
H1, exakt hero-text, kontaktformulär ja/nej, telefonnummer på sajten, footer (org.nr, copyright-år, "skapad med ..."-plattformsrad), meny/undersidor, bildkvalitet (egna vs stock), mobilanpassning.

---
## DEMO-MATERIAL

**Att återanvända i demon (verifierat):**
- Namn: **Bromma Trädgårdsservice** | Person: **Jens Amnesten** (f. 1994, ensam beslutsfattare) | E-post: **jens@brommatradgardsservice.se**
- Deras egna formuleringar att behålla/vrida: "välskötta och trivsamma utemiljöer **året runt**" (perfekt grund för säsongsavtal/ÅVS-erbjudandet), "pålitlig, kostnadseffektiv service", "med precision och omsorg"
- Tjänster till demo-strukturen: **Trädgårdsskötsel** + **Gräsklippning** + **Beskärning/Häckar** + **Lövhantering** (från IG-bion, = sommarsäljet) med **Marktjänster** och **Snöröjning & halkbekämpning** som sekundära/säsongssektioner
- Demo-hero: "Trädgårdsskötsel i Bromma & Västerort" + offertformulär + RUT-pris synligt (konkurrensbevisat: 309-415 kr/h kommuniceras öppet i SERP)
- Social proof: bädda in IG-flödet (1 863 följare, egna jobbfoton)
- Säljkrok: sajtens startsida möter sommarbesökare med **snöröjningscopy i juni** + title "Startsida - ..." + osynlig på "trädgårdsskötsel/gräsklippning bromma" — kontrast mot demon

**Vad som SAKNAS (måste fås från kund/manuell koll):**
- Telefonnummer (ej hittat någonstans), exakt H1/hero-text, formulärstatus, plattformsbekräftelse, riktiga sajtbilder, ev. befintliga referenser/omdömen (Reco-citatet "nedtagning av två höga granar" är OVERIFIERAT — använd inte)

*Alla observationer källmärkta. Sajtens egen HTML kunde inte hämtas (403 i alla våra kanaler) — copy-citaten ovan kommer från Googles indexsnippets, vilka speglar sajtens meta/sidtext men kan vara trunkerade.*
