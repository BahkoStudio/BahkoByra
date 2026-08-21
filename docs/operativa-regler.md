# Operativa detaljregler

Det här är detaljlagret bakom routingkartan i `CLAUDE.md`. Kartan pekar hit; hit går allt som är
för långt eller för sällan använt för att ligga i en fil som laddas varje session.

Guardrails ligger **inte** här — de bor i `CLAUDE.md` för att de måste läsas innan man agerar.

---

## Arbetsmodellen (WAT: Workflows, Agents, Tools)

Sannolikhetsbaserad AI resonerar, deterministisk kod exekverar. Den uppdelningen är vad som gör
systemet pålitligt: om varje steg är 90 % rätt är fem steg i rad nere på 59 %.

**Workflows** — SOP:er i markdown i `workflows/`. Varje workflow definierar mål, indata, vilka
verktyg som ska användas, förväntad utdata och hur undantag hanteras. Skrivna i klartext.

**Agents** — din roll. Läs rätt workflow, kör verktygen i rätt ordning, hantera fel, ställ
frågor när något är oklart. Improvisera inte fram ett resultat som ett verktyg redan kan göra:
behöver du en konkurrensanalys, läs `workflows/competitor_analysis.md` och kör
`tools/competitor_research.js`.

**Tools** — Node.js-skript i `tools/`, körs med `node tools/<skript>.js`. API-anrop,
datatransformationer, filoperationer. Snabba, testbara, konsekventa. Nycklar i `.env`.

### Arbetssätt

1. **Leta efter befintligt verktyg först.** Bygg nytt bara när inget finns.
2. **Lär av fel.** Läs hela felmeddelandet, fixa skriptet, testa om (kostar det credits eller
   pengar: fråga först). Dokumentera lärdomen i workflowen — rate limits, timing, oväntat
   beteende. Nästa session ska inte gå i samma grop.
3. **Håll workflows aktuella,** men skapa eller skriv aldrig över en workflow utan att fråga.
4. **Slutresultat till molnet, mellansteg lokalt.** Det Mathias ska se eller använda hamnar i
   Google Sheets/Slides/Drive eller i dashboarden. Allt i `.tmp/` är slängbart (utom
   `session-context.md`).

---

## Säljsystemet (BIAB / ProfResults)

Full playbook: `workflows/sales_methodology.md`. Leverans: `workflows/local_seo_delivery.md`.
Cadence: `workflows/outreach_cadence.md`. IG: `workflows/instagram_engine.md`. Källdokument i
`reference/`. Färdiga mallar och fullversioner: dashboardens Spelbok.

### Offer-stegen (en nisch: bygg & hantverk, alla kanaler)

| | Bygg & hantverk (Instagram @bahkobyra, cold email/call/IRL) |
|--|----------------------------------------------------------------|
| Front (gratis) | Gratis hemsideförslag (utkast, ev. 2-min Loom) |
| Core (betalt) | Hemsida engångs (12 000 kr ex moms) |
| Uppsell | Löpande optimering / motion design efter levererad sajt |

- **Offer-regel:** resultat + mekanism + riskreversering + villkor. FOR THEM / REAL /
  Financial Sense / Easy YES.
- **Front-offer = bevisa "the wizard"**, inte tjäna pengar. Uppsell kommer sen.
- **Outreach-copy:** kort, personlig, mänsklig, hjälpsam. En konkret observation om DERAS sajt
  plus en tydlig CTA.
- **Cadence:** välj EN väg per lead (skriven / samtal / IRL), dag 1/3/5/7. Svar = boka.
  Tyst = nurture eller stäng.
- **Daglig blast:** volym slår allt. Flaskhalsen är bokade möten per vecka.

### JA-protokollet (när ett prospekt säger ja till demo)

Gör ENDAST tre saker, i den ordningen, i lugn och mänsklig ton:

1. **Instruktion** — "Kika på [plats] och se hur [friktion] visar sig."
2. **Kvalificering** (binär, låg friktion) — "Bara så jag förstår, ser du samma sak på din sida idag?"
3. **Optionalitet** — "Om det stämmer när du kollat kan jag visa nästa steg. Helt upp till dig."

ALDRIG pitch, hype, värme-fluff, "let me know" eller call-push. Demo-länken levereras alltid.

### Uppföljning del 2 (vid tystnad)

Max 40 ord, ledig ton ("Tjena!"), fast format: påminn ("vet inte om du hann se demon") +
demolänken IGEN + värdelöftet i en mening ("visar exakt varför kunden ska välja just er") +
låg friktion ("kika i mobilen, tar en minut"). Ingen omtagning av pitchen.

### Lead-regler ur panelerna

- Ingen kontakt utan Mathias.
- Aldrig en dyr nygenererad demo till en overifierad lead — recopy (0 credits) först.
- Insatsen matchar leadens verifierade värde.
- Negativa fynd om en lead kräver täckning innan de används.

### Nischhistorik

Klinik-nischen avvecklades 2026-07-28. `tools/score_email.js` skrevs om till bygg-nischen
2026-08-05, och de sista klinik-leadsen (`data/leads.json`, `data/leads_enriched.json`,
`.tmp/outreach_state.json`) raderades 2026-08-21 — de låg kvar fem månader efter avvecklingen och
lästes fortfarande av `tools/enrich_leads.js`.

---

## Varumärkesdetaljer (rebrand 2026-08-05)

**`web/public/brand/brand.json` (v2) är källan.** Beskriv aldrig varumärket ur minnet. Det här är
en sammanfattning, inte en andra sanning.

- **Logga & favicon:** det platta 2D-märket — grön rundad kvadrat, vitt B, ett öga. Källa
  `tools/assets/mark-flat.png`. 3D i loggan blev för mycket.
- **Maskoten:** 3D-glaskuben (ersatte Hemsidedoktorn 2026-08-16). Hon är FIGUREN i sektioner,
  popup och content — animerad i lager med gesterna master / vinkar / pekar / undersoker / dansar
  (`web/app/komponenter/Maskot.js`), källa `tools/assets/mascot-sheet.png`.
- **Allt genererat** (märke, lockups, favicon, apple-ikon, maskotlager) byggs med
  `python3 tools/assets/build_mascot.py`. Rör aldrig de genererade filerna för hand.
- **Palett:** bas `#0A1628`, yta `#13233F`, text vit / `#94A7BF`, accent `#10B981` / `#34D399`.
  Ljusa ytor `#F8FAFC` med accent-text `#047857`.
- **Knappar:** smaragd yta med marinblå text. ALDRIG vit text på smaragd (2,54:1, underkänd
  kontrast).
- **Typografi:** Outfit rakt igenom.
- **Utfasat:** guld, cream och Cormorant Garamond finns bara kvar i frysta historiska byggen
  (se Heligt-listan i `CLAUDE.md`). Använd dem aldrig i nytt material.

---

## Historik: varför den här filen finns

`CLAUDE.md` var på 2 466 ord och innehöll frusna inventeringar ("verktygen som finns 2026-08-05",
"sju skript, ingen Python i tools/" — samtidigt som filen själv hänvisade till ett Python-skript),
en död routing till en skill som inte existerade, och långa skill-beskrivningar som ändå laddas
automatiskt. OS-auditen 2026-08-21 döpte mönstret: situationsfakta i en fil som laddas varje
session blir garanterat fel med tiden, och kostar tokens varje gång fram till dess.

Fixen är en pekare, inte en färskare kopia. Ser du en siffra, en status eller en lista i
`CLAUDE.md` — flytta den till sin källa och lämna en pekare.
