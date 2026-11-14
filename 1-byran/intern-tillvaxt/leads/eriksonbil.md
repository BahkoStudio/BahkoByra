# Erikson Bil · bilförsäljning och verkstad (sidoprojekt, inte startat)

**Demo:** https://www.bahkobyra.se/eriksonbil/ (källa: `web/app/(demo)/eriksonbil/`, noindex, visas bara i DM). Bilsidor: `/eriksonbil/volvo-xc60-2021/`, `/eriksonbil/audi-a6-avant-2020/`, `/eriksonbil/bmw-330e-touring-2021/`.
**Status:** byggd 2026-11-14, inte skickad. Kontaktperson: **Peter Winqvist** (befintlig kund, Proffsmaskiner, har lämnat omdöme), driver det med en kompanjon (namn okänt). Kontaktuppgifterna finns i mejltråden "Erikson bil", inte här (repot är publikt).

## Vem han är

Peter och en kompanjon startar en liten bilförsäljning med egen verkstad som sidoprojekt. Firman är inte registrerad, det finns ingen hemsida och verkstaden finns inte än. Peter ser Mathias som expert på hemsidor, så demon ska visa vägen. (Uppgifterna kommer från Mathias 2026-11-14.)

Peter frågade två saker i första mejlet: kan Mathias ta fram ett förslag, och är det svårt att administrera en sida där man säljer bilar. Den andra frågan är inte besvarad än, se mejlutkastet längst ner.

## Verifierat

| Uppgift | Värde | Källa |
|---|---|---|
| Namn | Erikson Bil | loggan Peter skickat |
| Logga | Guldsköld med EB, ordbild ERIKSON (vit) BIL (guld) | `logga-original.jpg` från Mathias (skärmbild 1080×2400) |
| Ort | Sollentuna | Peters mejl 2026-11-14 |
| Bilar | Övre medelklass, 3 till 4 åt gången | Peters mejl 2026-11-14 |

Obesvarat från Mathias frågor: vilka verkstadstjänster, när de öppnar och om priserna är fasta.

**Namnet skaver:** loggan säger Erikson Bil, men skylten i Peters AI-bild av verkstaden säger "Erikson Auto". Fråga vilket som gäller. Verkstadsbilden visar också Audi RS6, Porsche 911 GT3 och Mercedes G-klass, alltså ett snäpp över "övre medelklass". Våra exempelbilar (XC60, A6 Avant, 330e Touring) ligger närmare det han skrev än det han visade. Bara A6 är övre medelklass i strikt mening, så byt gärna XC60 mot V90 och 330e mot 5-serie om Peter reagerar (kräver nya bilder, ca 10 st).

## Loggan

Omritad som SVG av oss 2026-11-14: konturerna spårade (potrace, 4x uppskalning) ur Peters fil, guldet som gradient, skölden med svart insida. Ingen ruta runt, skarp i alla storlekar. Filer: `web/public/eriksonbil/media/logo.svg` (stående, original), `logo-rad.svg` (sköld + ordbild bredvid varandra, för headern, **vår variant**) och `mark.svg` (bara skölden, favicon). Be Peter godkänna radvarianten.

## ALLT PÅHITTAT (byts mot riktigt innan sidan blir skarp)

- **Tre exempelbilar**, alla märkta "Exempelbil":
  - Volvo XC60 Recharge T6 AWD Inscription, 2021, 6 240 mil, 389 900 kr, från 5 310 kr/mån
  - Audi A6 Avant 40 TDI quattro S line, 2020, 8 910 mil, 279 900 kr, från 3 812 kr/mån
  - BMW 330e Touring M Sport, 2021, 5 480 mil, 314 900 kr, från 4 289 kr/mån
  - deras specar (färg, ägare, besiktning), utrustning och servicehistorik
- **Månadskostnaden:** räkneexempel med påhittade villkor (20 % kontant, 72 mån, 6,95 % ränta, annuitet, inga avgifter). Ingen effektiv ränta. Riktig finansiering kräver en finansieringspartner och lagens uppgifter (effektiv ränta, totalbelopp).
- **Verkstadens sex tjänster och "från"priser** (Service 1 995 kr, Bromsar 1 495 kr, Däckbyte 495 kr, Felsökning 695 kr, Besiktningsfel efter koll, Koll före köp 995 kr), däckhotellet.
- **Öppettider** "vardagar 17 till 20, lördagar 10 till 14" (märkta Exempel). Adressen är inte påhittad längre: sidan säger "Sollentuna. Gatuadressen kommer när lokalen är klar."
- **Telefon och e-post finns inte:** sidan säger "Numret kommer när firman är registrerad" och "Adressen kommer med domänen". Inget tel:, inget mailto:.
- **Copyn:** "Få bilar. Rätt bilar.", "Vi säljer bara bilar vi själva skulle köra", "Vi är två. Vi kör det vi säljer", att varje bil går upp på lyften innan den säljs, att bilar med för mycket fel inte säljs, "Du får pris innan vi börjar", nyhetsbrevet "ett dygn innan alla andra", "Vi har kört den. Den är rolig" (BMW), "Ring innan, så står kaffet på". Allt är vårt förslag på arbetssätt, Peter måste stå för det.
- **Alla bilder är genererade illustrationer** (GPT Image 2.5 via Higgsfield, 18 st). De liknar riktiga modeller men är inga foton av riktiga bilar. Varje bilskärm säger "Bilden är en illustration".
- **Formulären** (boka visning, boka tid, nyhetsbrev) skickar ingenting. Kvittensen säger att det är en demo.

## Design

Egen design, inte demomallen: Teslas sajt som förebild. Svart och guld, en bil per helskärm (16:9 på dator, egen stående bild på mobil), stora knappar "Boka visning" och "Se bilen", ingen köpknapp och ingen varukorg. Typsnitt Outfit och Inter (lokala). Noll beroende av Vercels bildtjänst: förgenererade webp i flera bredder, lat laddning utom heron.

**Bilsidan (ombyggd 2026-11-14 efter Mathias önskemål)** följer Teslas designsida (tesla.com/model3/design): stor bild till vänster med fyra punkter man trycker på (Exteriör, Interiör, Teknik, Historik) som öppnar en ruta, bildväxlare med pilar och prickar under, panel till höger med nyckeltal och växling Kontant/Finansiering, och en fast rad längst ner med pris och "Boka visning". Koden ligger i `_studio.js`. Punkternas lägen är handsatta per bild i `_bilar.js` (`punkter`), så byts en bild måste de sättas om. På startsidan går hela bilskärmen att trycka på.

## Media och kostnad

18 bilder med `sunburst` (GPT Image 2.5, 2k): hero + mobilhero, tre bilar à fem bilder (fram, mobil, bak, interiör, detalj), verkstad. Ca 0,016 USD styck = **ca 0,29 USD, ungefär 5 API-krediter** (prisuppslaget gav NaN, siffran är skillens). Prompterna ligger på boxen i `/workspace/demos/erikson-bil/gen/p-*.txt`.

## Herofilm (förslag, väntar på Mathias ja)

Heron är nu en stillbild med långsam zoom (CSS). Förslag: Wan 3.0 Prime, 5 s, 1080p, start + slutbild.
1. **A (start)**: `sunburst` edit på `hero.png`, ca 0,02 USD: "Keep the geometry, position and perspective IDENTICAL to the reference. The same showroom and the same three cars, but almost completely dark: only a faint outline of each car is visible, no golden light yet. No people, no text, no logos."
2. **B (slut)** = `hero.png`.
3. Filmprompt: "Locked camera in a dark minimal car showroom. Warm golden lights switch on slowly from above, one car at a time from left to right, until all three cars are lit exactly as in the end frame. Reflections grow on the polished black floor. NO glowing lines, NO light effects beyond the overhead lights, no crossfade, no morphing, locked camera."
4. Mobil = 9:16 utsnitt lokalt (gratis).

**Kostnad:** ca 1,40 USD (22,4 krediter) + 0,02 USD för A-bilden = **ca 1,42 USD ≈ 23 krediter.**

## Frågor till Peter (ställs av Mathias, helst i ett samtal)

**Det som styr hela sidan**
1. Heter det Erikson Bil eller Erikson Auto? Loggan säger Bil, skylten i verkstadsbilden säger Auto.
2. Vad är viktigast första året, bilförsäljningen eller verkstaden?
3. Vem är drömkunden? Ålder, var de bor och vad de kör i dag.
4. Varför ska någon köpa av er och inte av en stor handlare eller på Blocket?
5. Finns det en bilsajt du tycker är riktigt snygg? Skicka länken.

**Bilarna**
6. Vilka märken och modeller tänker ni er, och i vilket prisspann? Tre exempel räcker.
7. Köper ni in bilarna själva eller säljer ni åt andra (förmedling)?
8. Fasta priser eller prutbart?
9. Tar ni inbyten?
10. Ska kunden kunna dela upp betalningen? Har ni en finansieringspartner, eller ska vi lämna det tills vidare?
11. Lämnar ni garanti utöver lagen, och gör ni en egen genomgång av varje bil före försäljning?
12. Vem fotar och filmar bilarna? Ni själva med mobilen, eller ska jag ta fram en enkel mall för det?
13. Ska bilarna också ligga på Blocket och Bytbil, med sidan som skyltfönster?

**Verkstaden**
14. Vilka jobb ska verkstaden ta? Service, bromsar, däck, felsökning, något mer?
15. Alla märken eller bara vissa?
16. Ska kunden boka tid på sidan, eller ringer man?
17. När räknar ni med att lokalen är klar, och finns en adress?

**Kontakt och det praktiska**
18. Hur vill ni bli kontaktade? Telefon, sms, mejl eller formulär, och vem av er svarar?
19. Vilka tider kan ni visa bilar? Kvällar och helger?
20. Vad heter din kompanjon, och vill ni synas med namn och bild?
21. Finns firma, domän och mejladress, eller ska jag hjälpa till med domänen (eriksonbil.se)?
22. Vill ni ha Instagram eller Facebook kopplat till sidan?
23. Nyhetsbrevet: ska prenumeranterna få se nya bilar före alla andra?
24. Godkänner du loggan på en rad som i sidhuvudet?
25. När vill ni att sidan ska vara skarp?

## Mejlutkast (skickas inte av oss)

Hejsan Peter!

Här är förslaget: https://www.bahkobyra.se/eriksonbil/

Tryck på en bil, så ser du hur varje bil får sin egen sida. Bilarna, priserna och bilderna är exempel tills ni har era egna.

Du frågade om det är svårt att administrera. Det är det inte. Ni skickar bilder och uppgifter på bilen till mig, så ligger den uppe samma dag. När den är såld tar jag ner den.

Säg vad du tycker, så bygger vi vidare därifrån.

Vänliga hälsningar
Mathias Bahko
