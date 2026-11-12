---
name: optimering
description: Använd när en kundsajt ska optimeras för Google, AI-svar eller konvertering — lokal SEO enligt SOP:en (benchmark med heatmap, easy-win-check, Google Företagsprofil med 5–6 kategorier och 30–40 tjänster, sajtens grunder, citeringar, veckorutin, tjänste- och ortssidor), GEO/AEO, schema markup, teknisk sajtgranskning, Cowork-uppdrag för Google-profilen. Trigga på "optimera sajten", "SEO för [kund]", "lokal SEO", "GEO/AEO", "schema markup", "ranka på Google", "synas i AI-svar", "Google Business Profile", "Google Företagsprofil", "cowork-instruktion", "heatmap", "varför syns vi inte", eller när någon föreslår en SEO-åtgärd och du behöver kontrollera om den faktiskt fungerar eller är en myt.
argument-hint: [kund eller sajt, t.ex. "proffsmaskiner"]
---

# Optimering — lokal SEO, GEO, AEO och sajt

Två delar:

- **Del A, Lokal SEO-SOP** (version 2026-11-06). Arbetsordningen. Den uppdateras varje fredag i kursen.
- **Del B, Våra noteringar.** Bahkos egna regler, evidens och lärdomar. Det är vår "My Notes" och den överlever alla SOP-uppdateringar.

**När en ny SOP-version kommer:** de nya stegen ersätter Del A helt. Del B behålls. Visa Mathias vad som ändrades. Står något i nya SOP:en som krockar med Del B (lag, Googles riktlinjer, våra fasta regler), behåll Del B-regeln och säg till.

Detaljer, schema-mallar och full evidenstabell: [reference.md](reference.md).

## Grundregler (gäller alltid, före SOP:en)

1. **White hat, utan undantag.** Bryter vi mot Googles regler kan kundens profil stängas, och då finns inget kvar att ranka.
2. **Ange evidensgrad.** Dokumenterat (Google/schema.org säger det), Sannolikt (flera oberoende mätningar), Rapporterat (SOP:en eller branschen har sett det, ingen dokumentation), Spekulation, Fel. Säg aldrig "ger 30 % mer trafik" utan mätning.
3. **Blockerare före finlir.** Fel domän, noindex, fel canonical eller innehåll som bara finns i JavaScript gör allt annat preliminärt. Kolla först.
4. **Vi ändrar aldrig något i kundens konton utan att Mathias sett listan.** Ändringar i Google-profilen görs av Cowork med ett skrivet uppdrag (se Del B, "Cowork-uppdrag").

---

# Del A: Lokal SEO-SOP

Två nivåer: **Grund** och **Avancerat**. Gör varje Grund-steg först. Når kunden inte topp 3 inom några veckor: gå till Avancerat.

**Resultat:** en kund med baslinje, fixad Google Företagsprofil, fixad sajt, citeringar på plats och en veckorutin som rullar.

## Det här behövs först

- Åtkomst till kundens sajt och Google Företagsprofil. Kolla att åtkomsten faktiskt fungerar innan du börjar. Vi ska vara **Ansvarig** (Manager), inte Ägare.
- Ett heatmap-verktyg. SOP:en använder Leadsnap. **Bahko:** vi har inget konto än, fråga Mathias innan något köps.
- GMB Everywhere (webbläsartillägg som visar konkurrenternas kategorier, tjänster och profilfunktioner). **Bahko:** installerat i Mathias Chrome, syns som "AI Tools" i Google-panelen.
- En AI-chatt för listor och texter.

Indata: företagsnamn, sajt, ort, huvudsökord.

## Steg 1: Baslinje

1. **Huvudsökord.** Oftast självklart: maskinuthyrning i Sollentuna vill ha "maskinuthyrning Sollentuna". Annars: fråga AI, stäm av med kunden. Heatmap-verktyget visar volym och konkurrens.
2. **Heatmap** på huvudsökordet. Spara med datum, det är före-bilden. Räkna **antal rutnätspunkter i topp 3**, det är siffran vi rapporterar, inte snittplaceringen. En förflyttning räknas först när den håller i 2–3 mätningar.
3. **Topp 10.** Anteckna antal omdömen och foton för topp 10. Ligger kunden långt efter: säg direkt att vi behöver omdömen och foton från dem.
4. **Falska profiler** i topp 10 (se "Falska profiler i vägen").
5. **AI-koll.** Fråga ChatGPT och Gemini vem de rekommenderar för huvudsökordet, några gånger var. Notera om kunden saknas eller om något om kunden är fel, och hitta var det kommer ifrån. Ett svar bevisar ingenting, det är en grov koll, ingen ranking.

## Steg 2: Easy-win-check

Kör innan något ändras. Varje "nej" är en enkel vinst, och listan är vad vi visar kunden i början.

Sajten:
1. **Namn, adress, telefon** på startsidan, exakt som i Google-profilen.
2. **Title och H1** innehåller huvudkategorin och orten.
3. **Indexerade sidor:** sök `site:doman.se`, Verktyg för antal. SOP:en säger minst 30 relevanta sidor, fler vid hård konkurrens (Rapporterat).
4. **Schema:** startsidan i validator.schema.org. Saknas LocalBusiness är det en enkel vinst.
5. **Karta:** Google-profilens karta inbäddad på startsidan.

Google Företagsprofil:
6. **Kategorier:** färre än 5, eller sådana som inte stämmer med vad företaget gör?
7. **Profilfunktioner:** saknas full adress, webbplats, telefon eller bokningslänk?
8. **Tjänster:** färre än 30, eller utan beskrivningar?
9. **Namn:** stämmer det med det riktiga företagsnamnet?

## Steg 3: Fixa Google Företagsprofilen

Kör först huvudsökordet i GMB Everywheres lokala skanning. Den visar vad topp 20 gör: kategorier, tjänster, profilfunktioner, attribut. Kopiera det som fungerar.

1. **Namn:** det riktiga företagsnamnet, inget tillagt. Rör det inte.
2. **Kategorier:** sikta på 5–6 totalt, 1 primär plus extra, men bara kategorier som stämmer med vad företaget verkligen gör. Titta på vad topp 20 använder. En kategori för något kunden inte gör drar fel sökare som klickar och lämnar. Ta bort den. (Ersätter vår gamla regel "max tre underkategorier", som saknade källa.)
3. **Fyll i profilen** tills fullständighetscirkeln bredvid namnet är helt grön. Minst: full adress, webbplats, telefon, kontaktsidan under Bookings. Lägg in **särskilda öppettider för varje helgdag i förväg**. **Bahko:** jul, nyår, trettondagen, påsk, 1 maj, Kristi himmelfärd, nationaldagen, midsommar. Tiderna kommer från kunden, gissa aldrig.
4. **Attribut:** fyll i de som stämmer, men räkna inte med mycket (de flesta i topp 10 har inga). Matställen: kostattribut på menyrätter, och tredjepartslänkar för beställning går att slå av/på och prioritera i profilen.
5. **Bookings:** länka kontaktsidan (eller kontaktsektionen, t.ex. `/#kontakt`).
6. **Webbplatslänk:** till sidan som är optimerad för sökordet. Den ska matcha på kategori, ort och namn/adress/telefon.
7. **Samtalsspårning:** har kunden ett spårningsnummer blir det primär telefon i profilen och det riktiga numret extra telefon. Sajt, schema och kataloger behåller det riktiga numret.
8. **Tjänster:** sikta på 30–40 (taket är 99). Topp 20 har ofta nära 30 var. Fler tjänster ger Google mer att jobba med och fångar långa sökningar (Rapporterat). Bygg listan:
   - A: GMB Everywheres kategoriverktyg. Ange kategorin, be om relaterade tjänster, kopiera.
   - B: sök huvudsökordet, öppna topp 10, kopiera deras tjänster till ett dokument.
   - Rensa listan med prompten nedan. Gallra resten för hand.
   - Osäker på att kunden gör allt? Skicka listan (mejlet nedan) och fråga vilka de INTE gör. **Bahko:** lägg aldrig in en tjänst kunden inte bekräftat.
   - Lägg in alla, upp till 99. Flera kategorier: låt AI sortera tjänsterna under rätt kategori.
   - Låt AI skriva en beskrivning på högst 300 tecken för de 20 viktigaste.
   Det är tråkig kopiera-klistra. Nästan ingen gör det, därför vinner det.
9. **AI på profilen:** Google rullar ut AI-meddelanden på profiler (bara inbjudan) och visar enligt rapporter en AI-sammanfattning byggd på profil, omdömen och sajt. Innan AI-meddelanden slås på: kolla att tjänster, priser, öppettider, helgtider och tjänsteområde stämmer med sajten, skicka ett testmeddelande och läs svaret.

Prompt för att rensa tjänstelistan:

```
Jag klistrar in en lista med tjänster från konkurrenter.
Din uppgift:
1. Ta bort alla exakta dubbletter.
2. Ta bort nästan identiska varianter av samma tjänst. Behåll bara EN version av varje. Välj den vanligaste eller mest professionella formen, men skriv INTE om den, välj bara en ur listan.
3. Lägg INTE till, slå INTE ihop, formulera INTE om och korta INTE ner något.
4. Gruppera, kategorisera eller formatera INTE. Skriv ut den rensade listan, en tjänst per rad, inget annat.
Lista:
[KLISTRA IN LISTAN]
```

Prompt för beskrivningarna:

```
Skriv en tjänstebeskrivning på svenska för varje tjänst i den här topp 20-listan. Varje beskrivning högst 300 tecken. Hitta inte på priser, år, siffror eller garantier som inte står här: [FAKTA OM KUNDEN].
[KLISTRA IN TOPP 20]
```

Mejl till kunden om tjänsterna (Mathias skickar):

```
Hej [förnamn]!

Jag fyller i tjänstelistan på er Google-profil, det hjälper er att synas.
Kan du titta igenom listan och säga vilka ni INTE gör?

[LISTA]

Tack på förhand!
Mathias
```

## Steg 4: Fixa sajten (Grund, ungefär en timme)

1. **Title:** huvudkategori + ort + företagsnamn + viktigaste tjänster (+ "nära mig" om det får plats). SOP:en säger ca 200 tecken och strunta i 60-teckensregeln, med "BEST" först (Rapporterat). **Bahko:** inget "Bäst"/"BEST" på svenska sajter. Ett superlativ måste kunna bevisas enligt marknadsföringslagen, och Google skriver om titlar som ser fyllda med sökord ut (Dokumenterat). Lång title med kategori, ort och tjänster är ok.
   Exempel: `Maskinuthyrning Sollentuna | Hyr sågar, kärnborrar och bilningshammare nära dig | Proffsmaskiner Sverige AB i Stockholm`
2. **H1:** huvudkategori + ort. Exakt en H1. (En logga som H1 räknas inte.)
3. **H2:or:** sekundära kategorier och viktigaste tjänsterna (från GMB Everywhere).
4. **Första 100 orden:** vad företaget gör och var.
5. **Namn, adress, telefon** på startsidan (eller sidan profilen länkar till) och i sidfoten på varje sida, exakt som i profilen. Telefonnumret klickbart.
6. **Karta:** bädda in profilens karta på startsidan.
7. **Omdömen:** några som riktig text på landningssidan som nämner tjänst och ort, inte bara i en widget (Rapporterat: Google läser inte alltid widgetar). **Bahko:** inget review-schema på egna omdömen, se svartlistan.
8. **FAQ på sajten:** Google ersätter enligt rapporter Frågor och svar i profilen med AI-svar byggda på profil, sajt och offentliga källor. Lägg kundens 10 vanligaste frågor med svar på sajten och håll profilen komplett. **Bahko:** lägg inte längre in Q&A i profilen via Cowork.

## Steg 5: Citeringar (Grund)

Namn, adress och telefon ska vara identiska överallt.

80/20, sätts upp för hand (kunden får ofta klicka i ett verifieringsmejl):
1. Bing Places, och sajten i Bing Webmaster Tools. ChatGPT lutar mot Bing (Dokumenterat för ChatGPT Search).
2. Apple Business Connect
3. Foursquare (betalt)
4. Yelp
5. Data Axle: hoppa över, bara USA.

**Bahko, svenska kataloger:** hitta.se, Eniro, Reco (för hantverkare). Allabolag och Ratsit matas från Bolagsverket, rör dem inte.

De mest relevanta extra:
1. Sök huvudsökordet, gå igenom topp 20 organiska träffar.
2. Varje katalog eller lista där är en sajt Google säger är relevant för sökningen. Registrera kunden.
3. Upprepa för några varianter av sökordet.

## Steg 6: Veckorutin

1. **Inlägg** i profilen varje vecka, skrivet som en jobbrapport: vad jobbet var, orten, materialet, vad som var svårt. Ett erbjudande ibland är ok. AI skriver utkastet, vi putsar lätt. (Rapporterat: sådana inlägg citeras i Googles AI-svar och ChatGPT.)
2. **Foton** varje vecka. **Bara riktiga foton**, aldrig AI-genererade (inte heller våra AI-filmer och AI-bilder från kundsajten). Kunden tar dem med mobilen: före och efter, teamet, bilen, platsen.
3. **Säg två saker till kunden:** be varje kund om omdöme, och fota varje jobb och skicka till oss varje vecka. Postar de på Instagram eller Facebook varje vecka kan vi ta därifrån.

## Avancerat

Bara om Grund inte gav topp 3 inom några veckor.

### Schema

LocalBusiness-schema (technicalseo.com:s generator fungerar, eller mallarna i reference.md) på sajten.

### Bygg ut sidorna

Målet är ämnesauktoritet (företaget kan ämnet) och lokal auktoritet (företaget jobbar i området).

Struktur:
- Nivå 1: landningssidan.
- Nivå 2: tjänstesidan, underkategori om det finns, och kärntjänsterna (1–3).
- Nivå 3: en sida per övrig tjänst, länkad från nivå 2. De länkar till varandra.

**Tjänstesidor.** Varje huvudtjänst får en egen sida. Fem huvudtjänster = sex sidor: en tjänstesida plus en per tjänst. Hitta ämnena genom att googla sökordet och läsa vad konkurrenterna tar upp. AI som reserv, inte första steg. Varje sida 1 000–2 000 ord unik text.

Prompt för tjänstesida:

```
Du är en erfaren lokal SEO-skribent som specialiserat dig på [TYP AV FÖRETAG]. Du skriver engagerande, trovärdig text som rankar och som riktiga människor läser. Skriv på svenska.

Uppgift: skriv en tjänstesida på 1 000–2 000 ord som bygger ämnesauktoritet kring: "[ÄMNE]".

Målgrupp: [MÅLGRUPP]
Sökavsikt: mest informativ, delvis kommersiell. Folk vill se alternativen, hitta bästa lokala leverantören och få praktiska tips.
Huvudsökord: "[HUVUDSÖKORD]"
Sekundära sökord, naturligt inflätade: [SEKUNDÄRA SÖKORD]
Fakta du får använda (hitta inte på andra siffror, priser, år eller kunder): [FAKTA]

Instruktioner:
1. Börja med en kort sammanfattning av sökavsikten och varför sidan svarar bättre än konkurrenterna.
2. Bygg en tydlig disposition (H1–H3): intro, nyckelbegrepp, det lokala läget, rekommendationer, tips, vanliga frågor.
3. Visa verklig expertis: praktiska insikter, riktiga lokala platser, unika tips eller en kort checklista.
4. Struktur: krok och löfte i introt; korta stycken, punktlistor, numrerade listor och 1–2 små tabeller; 4–7 föreslagna interna länkar med länktext; 6–10 vanliga frågor; ett vänligt avslut med uppmaning.
5. Ton: varm, kunnig, lättillgänglig. Mänsklig, inget fluff, inga upprepningar, inga tankstreck.
6. Lägg till på slutet: förslag på SEO-title (ca 200 tecken, inget "bäst"), metabeskrivning (150–160 tecken), H1, 3–4 alt-texter med lokal vinkel och en kort skiss på LocalBusiness- eller FAQ-schema.

Svara i fyra delar med rubrikerna: Strategi i korthet, Disposition, Hela texten, SEO-element.
```

Fyll sidorna med texten, lägg till riktiga bilder, gör dem sedan lokala.

## Avancerat: ortssidor

Lägg "Områden vi jobbar i" i menyn. Välj ca 5 områden att börja med (stadsdelar, kommuner, orter; fråga kunden). En översiktssida plus en undersida per område. **Bahko:** bara orter där kunden faktiskt jobbat, och baka in ett riktigt jobb eller omdöme därifrån. Ett överbrett område skadar (Sannolikt).

Prompt för ortssida:

```
Du är en erfaren lokal SEO-specialist som rankat många företag med hyperlokala landningssidor. Skriv på svenska.

Uppgift: skriv en områdessida på 1 200–2 000 ord för [TYP AV FÖRETAG] "[FÖRETAGSNAMN]" i [ORT], som jobbar i [OMRÅDE].

Sidans mål: ranka på "[tjänst] [område]" och "[tjänst] nära [landmärke]".
Huvudsökord: "[HUVUDSÖKORD]"

Fakta att väva in (hitta inte på något annat):
- Namn, adress, telefon: [NAP]
- Avstånd eller restid till [OMRÅDE]: [AVSTÅND]
- Det som skiljer företaget från andra: [USP]
- Lokala kopplingar: [landmärken, händelser, problem kunderna i området har]
- Riktiga jobb och omdömen från området: [JOBB/OMDÖMEN]

Instruktioner:
1. Analysera först vad sökare i området vill ha, och hur relevansen visas utan att påstå en adress företaget inte har.
2. Disposition (H1–H3): områdesintro, varför vi passar folk här, tjänster i området, vägbeskrivning och bevis, vanliga frågor, uppmaning.
3. Lokal auktoritet: riktiga gator, landmärken och händelser; närhet; typer av lokala kunder; förslag på inbäddad karta.
4. Delar: H1 och intro med lokal krok; tjänster i området; "Därför väljer folk här oss" (bara riktiga omdömen, aldrig påhittade); vägbeskrivning från kända platser; 8–10 lokala frågor; tydlig uppmaning.
5. På slutet: SEO-title (ca 200 tecken, inget "bäst") och metabeskrivning, LocalBusiness-schema med areaServed för området, 4–6 alt-texter, 5–7 förslag på interna länkar till tjänster och andra områden.
6. Ton: varm, lokal, kunnig men grannlik. Ingen företagssvenska, inga tankstreck.

Svara i fyra delar med rubrikerna: Lokal sökavsikt, Disposition, Hela sidan, On-page-SEO och schema.
```

Faktagranska allt. **Går det att byta ortnamnet och sidan fortfarande fungerar är den lat.** Lägg till riktiga jobb, riktiga foton och riktiga lokala detaljer.

## Avancerat: interna länkar och fler citeringar

### Interna länkar

Koppla tjänstesidor och ortssidor så Google ser vilka tjänster som finns i vilka områden. Regel ett: bara en länk som hjälper läsaren.

1. **Plan.** Lista tjänstesidor och ortssidor, bestäm vilka tjänster som passar vilka områden.
2. **Tjänstesidor:** 2–4 länkar till ortssidor, mest i 1–3 meningar i texten ("Vi hjälper många kunder i Upplands Väsby"), plus en kort lista "Vi jobbar också i" längst ner.
3. **Ortssidor:** 3–6 länkar till tjänstesidor, i 2–4 meningar i texten, plus "Tjänster vi gör här".
4. **Startsida och kontaktsida:** "Områden vi jobbar i" med länkar till alla (eller de flesta) ortssidor, och "Våra huvudtjänster".
5. **Länktext:** vanliga ord en människa skulle säga, varierade.
6. **Kontroll:** varje viktig sida har några inkommande länkar. Klicka varje länk en gång.

Gör inte: fler än 8–10 länkar per sida, samma länktext om och om, orelaterade länkar, alla länkar bara i sidfoten.

### Fler citeringar

1. **Konkurrenternas källor:** sök sökordet, öppna en toppkonkurrents profil, scrolla till "Mer om" för sajter som pekar på platsen. Gör det för topp 3–10 och fyll luckorna.
2. **Fråga AI:** "Vilka kataloger och länkar passar för [bransch] i [ort]?"
3. **Köp** om det blir många kunder (citeringstjänster ca 20 USD/mån per kund). Gör 80/20 och sökordskatalogerna först.

## Falska profiler i vägen

Vi kör inte black hat, men andra gör: falska företag som rankas för att hyra ut platsen. De står i vägen.

Tecken: sökordsfyllt namn i versaler, en adress som inte är rimlig för branschen (trädfällare i ett köpcentrum), en sajt med telefon men ingen adress.

1. Var 100 % säker på att det inte är ett riktigt företag. Anmäler vi riktiga företag slutar Google lyssna på våra anmälningar.
2. På profilen: Föreslå en ändring, "Stängd eller finns inte här", lägg till bevis (foto av platsen, en rad: "sökordsfyllt namn, adressen är ett köpcentrum utan detta företag").
3. Fungerar inte det: låt kunden filma en kort promenad förbi adressen och skicka in.

Se upp: överklaganden av omdömen är enligt rapporter försenade, och Google har setts be om legitimation på profiler (kanske en bugg). En begäran om organisationsnummer (EIN i USA) följer med när man accepterar Googles inbjudan till AI-meddelanden, det är ingen ny verifiering.

## Det kunden får

Heatmap före, heatmap efter och en enkel lista över vad vi gjort.

## Klart betyder

- Baslinje klar
- Konkurrentanalys klar
- Google-profilen optimerad
- Sajtens grunder klara
- Grundcitationer klara
- Veckorutinen rullar
- Avancerade sidor klara (om det behövs)
- Avancerade citeringar klara (om det behövs)

---

# Del B: Våra noteringar

## Cowork-uppdrag för Google-profilen

Ändringar i kundens Google-profil görs av Cowork (Claude i webbläsaren) som är inloggad som bahkostudio@gmail.com. Vi skriver uppdraget, Mathias klistrar in det.

- Fil: `2-kunder/kunder/<kund>/cowork-optimering.md`. Mallen är GD Måleris (`2-kunder/kunder/gdmaleri/cowork-optimering.md`).
- Fyra fasta regler överst: gör bara det som står, i ordning, skapa aldrig ny profil, byt aldrig namn, ta aldrig bort något; klistra in texter ordagrant, hitta inte på; hoppa över annonser, "Finish your ad", "Add chat" och "AI Tools" (GMB Everywhere är inte Google); stanna och säg till vid verifiering, sms-kod, betalning eller saknad behörighet. "Del N klar" efter varje del.
- Delar som bara läser (baslinje, konkurrentskanning, tjänstelista från topp 10) och delar som ändrar hålls isär. Det som behöver kundens ja (tjänster vi inte vet att de gör, helgtider) läggs inte in förrän svaret finns.
- Foton bara från kundens egna jobb, med direktlänkar till filerna.

## Vad Google själva säger om AI-sökning

**AI Overviews och AI Mode är Google Search, inte en separat motor.** Samma index, crawling, ranking och kvalitetssystem, med AI ovanpå (Dokumenterat, Googles optimeringsguide). AEO och GEO är branschetiketter, inga Google-system. Den som säljer "AEO-paket" som något annat än SEO säljer en etikett.

Två verkliga begrepp: **retrieval** (svaret grundas i sidor ur indexet, oindexerat finns inte) och **query fan-out** (modellen skickar flera relaterade frågor, därför slår ett väl täckt ämne på en stark sida tio tunna sidor). Google skriver uttryckligen att innehåll kan gå bra utan uttalat SEO-arbete. Att säga vilka tre punkter som spelar roll är jobbet, inte en lång lista.

## Maskinerna måste se innehållet

GPTBot, ClaudeBot, PerplexityBot och Bytespider kör inte JavaScript (Dokumenterat, Vercel/MERJ). Undantaget är Google/Gemini. **Innehållet måste finnas i rå HTML.** Under ca 800 ord i rå HTML är ett problem. Kontroll:

```bash
python3 - <<'PY'
import re, pathlib
h = pathlib.Path('index.html').read_text()
body = h.split('<body>',1)[1]
body = re.sub(r'<script.*?</script>',' ',body,flags=re.S)
body = re.sub(r'<style.*?</style>',' ',body,flags=re.S)
text = re.sub(r'\s+',' ',re.sub(r'<[^>]+>',' ',body)).strip()
print('ord utan JS:', len(text.split()))
for t in ['<nyckelfras 1>','<nyckelfras 2>']:
    print(('JA ' if t.lower() in text.lower() else 'NEJ'), t)
print('H1:',len(re.findall(r'<h1',h)),'H2:',len(re.findall(r'<h2',h)),'H3:',len(re.findall(r'<h3',h)))
PY
```

Vid domänflytt: 301 från gamla URL:en, ta bort raden ur vår `sitemap.xml`, uppdatera canonical, verifiera i Search Console.

## Innehåll som AI citerar

Svara på frågan först. Självbärande stycken med företagsnamn och ort utskrivna. Källhänvisa regler, priser och myndighetskrav. Konkreta siffror slår adjektiv ("2 tons minigrävare", inte "modern maskinpark"). Slå upp regler i primärkällan innan de skrivs på en kundsajt (rutavdrag gäller trädgårdsskötsel men inte nyanläggning).

## Konverteringskoll

- Syns telefonnumret på mobil utan att öppna menyn?
- Svarar sidan på "vad kostar det"? Annars: förklara varför och sälj in det kostnadsfria besöket.
- Hur många skärmhöjder ner ligger första sociala beviset på mobil?
- Finns en ring-knapp, inte bara formulär?

## Svartlistan, gör aldrig

| Åtgärd | Varför |
|---|---|
| Dold text, cloaking, text bakom `visibility:hidden` för sökmotorer | Riktlinjebrott, manuell åtgärd |
| `Review`/`AggregateRating`-schema på egeninsamlade omdömen | Otillåtet sedan 2019 |
| `["Service","Product"]` för att tvinga fram stjärnor | Spampolicybrott |
| "Bäst"/"BEST" i title eller text utan bevis | Marknadsföringslagen kräver att superlativ kan styrkas |
| AI-bilder i Google-profilen eller som kundens riktiga jobb | Vilseleder kunder, riktlinjebrott |
| Kategorier eller tjänster kunden inte gör | Fel sökare, och kan räknas som vilseledande |
| Blockera GPTBot/ClaudeBot/PerplexityBot eller Google-Extended | Stänger AI-synlighet utan vinst |
| Wikidata-post för småföretag | Raderas utan oberoende källor |
| Låta JS ta bort en `noindex` som står i rå HTML | Sidan blir aldrig indexerad |
| En sida per gissad long-tail-fråga | Google avvisar det, ger tunna dubbletter |
| Köpa eller arrangera omnämnanden och omdömen | Riktlinjebrott |
| Anmäla en konkurrent som falsk utan att vara 100 % säker | Google slutar lyssna på våra anmälningar |

## Bortkastad tid

- **FAQPage-schema:** rich results bara för myndighets- och hälsosajter sedan aug 2023. FAQ-*texten* på sajten är värd att ha (Steg 4.8), schemat ger inget.
- **BreadcrumbList på one-pager, `WebSite`/`SearchAction`, `Person` med `hasCredential`.** Döda eller meningslösa. Skriv "Peter, X år i branschen" i brödtext i stället.
- **llms.txt, llms-full.txt, ai.txt.** Ingen dokumenterad effekt hos Google. Skadar inte, men sälj det aldrig som en åtgärd.
- **"AI-stil", små fragment "för AI", Markdown-version för AI.** Inget av det är dokumenterat.

## Bolagsform (enskild firma till AB)

Nytt organisationsnummer är en ny entitet. Ordning: Bolagsverket, sedan sajt/schema/sidfot, sedan Google-profilen (**byt namn på befintlig, skapa aldrig ny**, planera till lågsäsong), sedan hitta.se och Eniro, sedan sociala profiler. Gamla namnet som `alternateName` i schema i ca tolv månader.

## Output

Rangordnad lista där varje punkt har: vad, evidensgrad, uppskattad effekt och varför, och om det går nu eller är blockerat. Skilj på "ger effekt", "billigt experiment" och "gör inte".

## Vad som ändrats

- 2026-07: första versionen, korsgranskad kartläggning (fyra utredningar plus skeptiker).
- 2026-11-12: Lokal SEO-SOP version 2026-11-06 inlagd som Del A (baslinje med heatmap och topp 3-punkter, easy-win-check, 5–6 kategorier, 30–40 tjänster med promptar och kundmejl, sajtens grunder, citeringar, veckorutin, tjänste- och ortssidor, interna länkar, falska profiler). Gamla innehållet blev Del B. Ändrat mot förr: "max tre underkategorier" borta, Q&A i profilen ersatt av FAQ på sajten, ny evidensgrad "Rapporterat". Svensk anpassning: inget "Bäst" i title, svenska kataloger i stället för Data Axle, helgdagar i Sverige, Cowork-uppdragen.
