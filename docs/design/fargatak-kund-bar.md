# bar.md — Färga Tak, kundloopen (2026-11-09)

**Loop:** kundloop (Kund · Friktion · Trovärdighet). Max 3 rundor (Mathias). Sidan:
`web/app/(demo)/fargatak/page.js` (data + sidans eget stilblock STIL). Mallen `web/app/(demo)/_mall/`
rörs inte (en lead rör inga andra demos).

**Kundens två krav (Philip via Mathias 2026-11-09), hårda:**
- **Bakgrunden är vit.** Ingen sektion i mörkt eller svart som yta, utom footerns bottenrad om den behövs.
- **Inga neonfärger på knapparna, men de matchar loggan** (Mathias 2026-11-09: "det ska fortfarande matcha
  loggan så knapparna i den färgen fast utan neonfärg"). Knapparna är en dämpad, mörkare version av loggans
  korall (#FE504F), t.ex. runt #C2413F–#B5433E: matt, inte lysande, ingen glöd, vit text minst 4,5:1.
  Inte svarta. Stora ytor (band, sektioner, ikonrutor) är fortfarande inte korall.
- **Det rullande bandet under heron passar inte in** (Mathias 2026-11-09): inte korall. Neutral ton som
  smälter in i den vita sidan (svart, mörkgrå eller ljusgrå med mörk text), samma lugn som resten.

**Baren:** en villaägare någonstans i Sverige med ett blekt, mossigt betong- eller plåttak öppnar sidan på
telefonen bland tre takmålare. Sidan ska få henne att ringa 070-789 45 61 eller skicka en förfrågan.
Standarden är mallens egna referenser (P.N Byggentreprenad och Axel's Landscaping: logotyp, ort och två
tjänster i heron, ingen copy där) och det Färga Tak faktiskt har: namn, logotyp, takmålning i hela
Sverige, telefon och e-post. Inget org.nr, inga omdömen, inga egna jobbfoton än (AB startas vid årsskiftet).

## Mekanismerna

1. **Första skärmen på telefon (390 × 844) säger vem och vad utan skroll:** loggan läsbar, "takmålning",
   "hela Sverige", och en Ring-knapp med 070-789 45 61.
2. **Telefonnumret nås med ett tryck från varje skärm**, och formuläret med högst två tryck.
3. **Vit yta och lugn färg:** alla sektioner har vit (eller nästan vit) bakgrund; knapparna är svarta eller
   dämpade; inga glödeffekter; korall högst som liten detalj per skärm.
4. **Före/efter i heron visar vad man köper** (blekt → nymålat). Sidan är Färga Taks egen hemsida,
   inte ett förslag (Mathias 2026-11-09: "ta bort detta är ett förslag, gör det som en kund som ska ha
   hemsida"): `kund: true`, ingen Bahko-knapp, ingen förslagsruta. Att bilderna och filmen är
   illustrationer står i alt-texterna och i leadfilens FLAGGOR, INTE som synlig text på sidan (Mathias 2026-11-09: "filmen ska
   vara kvar utan illustration text"). Alt-texter får säga illustration.
7. **Texten låter som en människa** (Mathias 2026-11-09), enligt
   `~/.claude/skills/design-loop/references/skriv-som-en-manniska.md`: rakt och säkert, korta meningar,
   varierad rytm, "du", inga tankstreck, inget "inte X, utan Y", inga reflexmässiga tretal eller
   balanserade punktlistor, inga tomma ord. Sanningsregeln går före: inga påhittade detaljer.
5. **Inget påstående utanför VERIFIERAT:** inga omdömen, betyg, år, priser, garantier, ROT, ledtider,
   org.nr eller orter som inte är belagda. Generella steg och frågor får inte låta som löften.
6. **Det som saknas ersätts med ärlighet, inte utfyllnad:** en kort mening som förklarar hur man kommer
   igång (ring eller skriv, de tittar på taket) i stället för påhittade bevis.
