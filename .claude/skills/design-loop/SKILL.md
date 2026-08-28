---
name: design-loop
description: Kvalitetsloop för visuella byggen - builder plus tre färska kritiker per bit (brief/system/craft) med binära domar, tills allt är grönt. Använd när en sida, demo eller dashboard ska hålla en definierad ribba, när användaren säger "design-loop", "kör kritikerna", "stress-testa designen", eller efter en större omklädnad/nybygge som ska verifieras mot ett designsystem. Kritikerna dömer RENDERAT utfall via Playwright, aldrig kod.
argument-hint: [vad som ska dömas + var ribban är definierad]
---

# Design-loop — builder och färska kritiker tills allt är grönt

Metoden som klädde om Mugglagret (12 rundor) och kvalitetssäkrade Bahko OS.
Kärnidén: byggaren får ALDRIG godkänna sitt eget arbete, och kritikerna får
ALDRIG se varandras domar eller tidigare rundor. Utgången är att vinna, inte
att hinna: ingen fast rundgräns, användaren kan stoppa när som helst.

## Faserna

**1. Interview.** Vad byggs, för vem, och VAR är ribban definierad? Ribban
måste vara konkret (ett designsystem, en referenssida, brand.json) - "snyggt"
är ingen ribba. Saknas svar: fråga via AskUserQuestion innan något byggs.

**2. Preflight.** Verifiera att kritikerna kan RENDERA utfallet (lokal server,
Playwright med /opt/pw-browsers/chromium). Är referensen onåbar (egress) sägs
det öppet: då döms mot bar.md, inte sida-vid-sida.

**3. Teardown → bar.md.** Destillera ribban till MEKANISMER som kan
kontrolleras i rendering, aldrig adjektiv. Bra regel: "rubriker >= 32px har
vikt 300-350". Dålig regel: "rubrikerna ska kännas lätta". Skriv bar.md +
design-system.md (tokens) i scratchpad så kritikerna kan läsa dem.

**4. Loopen.** Dela bygget i 2-4 bitar. Per bit, builder först, sedan TRE
kritiker via Workflow-fan-out, alla med FÄRSK kontext:
- **Brief-kritikern** ser bara målet: gör sidan sitt jobb (säljer, driver
  leads, följer positioneringen)? Binärt.
- **System-kritikern** mäter designsystemet i renderad DOM med
  getComputedStyle: färgvärden, radier, vikter, kontrast, skuggor. Binärt.
- **Craft-kritikern** dömer skärmdumpar blint mot bar.md, mekanism för
  mekanism. Binärt.

Alla tre måste godkänna. FAIL returnerar det ENDA största gapet, konkret och
åtgärdbart - buildern fixar exakt det och de underkända kritikerna kör om.
En PASS ärvs bara om renderingen inte ändrats sedan domen; global ändring
(tokens, ytor) = alla döms om.

**5. Rapportering.** Rundräkning och domar redovisas löpande i chatten.
Aldrig låtsade tokenkostnader.

## Hårda regler (lärdomar, daterade)

- **Kritiker dömer rendering, aldrig kod** - TDZ-buggar, hover-katastrofer
  och inerta knappar syns bara i browsern. (2026-08-19: header-CTA blev
  osynlig i hover, 1,07:1 - ingen kodläsning hade hittat det.)
- **Mät hover, fyllda tillstånd och fixerade element** - statiska granskningar
  missar dem systematiskt (2026-08-19: varukorgsräknare 1,17:1 endast med
  varor i korgen).
- **Mät på flera bredder** - fel kan gå jämnt ut vid exakt 1400px och synas
  vid alla andra (2026-08-20: banderoll med dubbel padding).
- **`scroll-behavior:smooth` lurar mätningar**: scrolla med
  `behavior:'instant'` och vänta ut transitions innan avläsning.
- **Interagera**: klicka knappar, läs urklippet, seeda localStorage. En
  kopieraknapp som inte kopierar är ett brief-fail (2026-08-20: rabattkod
  var en inert div).
- Kritiker-agenter skriver `.cjs`-testfiler i web/ och raderar dem efteråt.
- Workflow-fan-out kräver användarens opt-in ("kör design-loop" räknas).

## Ursprung

Bearbetning av design-loop-metoden ur Jack Roberts design-OS-flöde
(hitta → bygg → kodifiera), anpassad till Bahko-repots verktyg och härdad
med Mugglagret-revisionens mätlärdomar.
