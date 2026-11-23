---
name: optimering-general
description: Använd när en sajt ska granskas eller rättas för Google i allmänhet, enligt General SEO SOP — audit med visuell rapport och rangordnad åtgärdslista, mätning och baslinje, indexering och crawl, pengasidorna (title, meta, H1, H2, första 100 orden, FAQ, bilder, mobil, fart), innehåll, länkar, interna länkar-passet, quick win (etta på Google på ungefär en vecka för en lätt fras) och felsökning av trafiktapp. Trigga på "optimering general", "audit av sajten", "SEO-granskning", "granska sajten", "gör SEO:n", "fixa pengasidorna", "interna länkar", "quick win", "etta på Google", "varför tappade vi trafik", "är sidan indexerad", eller när någon föreslår en SEO-åtgärd och du behöver kontrollera om den fungerar eller är en myt. Google Företagsprofil, heatmap och kartan ligger i optimering-local. AI-svar ligger i optimering-ai.
argument-hint: [kund eller sajt, och vad som ska göras, t.ex. "proffsmaskiner audit"]
---

# Optimering general: allmän SEO för en sajt

SEO-arbetet är delat i tre skills:

| Skill | Äger | SOP uppdateras |
|---|---|---|
| **optimering-general** (den här) | Sajten: mätning, indexering, pengasidor, innehåll, länkar, quick win, trafiktapp, rapporten | Måndagar |
| **optimering-local** | Google Företagsprofil, heatmap, kartan, citeringar, Cowork-uppdrag, ortssidor | Fredagar |
| **optimering-ai** | Synas i AI-svar. Inte byggd än, noteringarna ligger tills vidare i Del B här | |

Den här skillen har två delar:

- **Del A, General SEO SOP** (version 2026-11-23). Arbetsordningen från kursen.
- **Del B, Våra noteringar.** Bahkos egna regler, evidens och lärdomar. Det är vår "My Notes" och den överlever alla SOP-uppdateringar.

**När en ny SOP-version kommer:** de nya stegen ersätter Del A helt. Del B behålls. Visa Mathias vad som ändrades. Står något i nya SOP:en som krockar med Del B (lag, Googles riktlinjer, våra fasta regler), behåll Del B-regeln och säg till.

Detaljer, schema-mallar och full evidenstabell: [reference.md](reference.md).

## Grundregler (gäller alltid, före SOP:en)

1. **White hat, utan undantag.**
2. **Ange evidensgrad.** Dokumenterat (Google eller schema.org säger det), Sannolikt (flera oberoende mätningar), Rapporterat (SOP:en eller branschen har sett det, ingen dokumentation), Spekulation, Fel. Rapporterade resultat ur tester och kundcase är exempel, inga löften. Säg aldrig "ger 30 % mer trafik" utan mätning.
3. **Blockerare före finlir.** Fel domän, noindex, fel canonical eller innehåll som bara finns i JavaScript gör allt annat preliminärt. Kolla först.
4. **Där Del B säger något annat än Del A gäller Del B.** Se "Där vi avviker från SOP:en".

---

# Del A: General SEO SOP

## Vad det ger

Det Mathias ber om:

- **En audit:** en sajt granskad, som visuell rapport med rangordnad åtgärdslista, utan att något ändras.
- **Jobbet gjort:** de viktigaste rättningarna gjorda på sajten, interna länkar-passet gjort.
- **En quick win:** plats ett på Google för en lätt fras på ungefär en vecka, något att visa upp för vilken kund som helst.
- **Ett trafiktapp förklarat,** och vad som ska göras åt det.

## Till dig som kör det här

Stegen nedan är skrivna till dig. Mathias är den du jobbar åt.

1. **Ombedd om en audit:** kör Steg 1 till 5 och kontrollerna i interna länkar-passet, ändra ingenting, och lämna den visuella rapporten från Steg 6.
2. **Ombedd att göra något:** gör det. Skriv om titlarna, rätta länkarna, bygg quick win-sidan, gör rättningarna. Lämna aldrig tillbaka en lista med instruktioner för jobb du kan göra själv.
3. **Ombedd att "göra SEO:n" för en sajt utan mer:** audit först, visa den rangordnade listan, gör sedan de översta rättningarna i ordning.
4. **Kommer du inte in på sajten eller i Search Console?** Förbered varje ändring så att den tar en inklistring: sidan, fältet och dess nya text. Säg exakt vilken åtkomst som skulle låta dig göra det själv.
5. **Innan du publicerar något** på sajten eller någon annanstans offentligt, eller lägger pengar: visa listan med ändringar en gång och vänta på ett ja. Gör sedan alla.
6. **Efter varje ändring:** säg vad du ändrade, var och när, och logga det under "Logga varje ändring", så att det går att ångra.

## Måste finnas

- Sajtens adress
- Kundens huvudtjänst och ort eller marknad

## Bra att ha

- Åtkomst till Google Search Console och GA4. Utan dem går auditen ändå att köra. Steg 1 står då som inte kollat.
- Åtkomst till sajten. Den behövs bara för att göra rättningarna.

## Steg 1: Kolla mätningen

Kräver Search Console och GA4. Ingen åtkomst? Markera steget som inte kollat och gå till Steg 2.

1. **Search Console** kopplat och verifierat. Sätt upp det dag ett om det saknas.
2. **GA4:s nyckelhändelser** finns och går iväg. Skicka in ett test själv. Många sajter mäter inga konverteringar alls, och då kan ingen säga om SEO fungerar.
3. **Spara en baslinje med dagens datum:** organiska sessioner, toppsidor, sökord som rankar, konverteringar. Search Console visade en klicktopp runt 31 oktober till 2 november 2026 som Google inte har förklarat, medan visningarna låg still. Lämna de dagarna utanför baslinjen och stäm av dem mot GA4.

## Steg 2: Kolla att Google kan läsa sajten

1. Kör `site:doman.se`. En företagssajt bör ha minst 30 relevanta sidor (Rapporterat). Titta på vad som är indexerat: 30 sidor i ämnet slår 60 slumpmässiga blogginlägg.
2. Jämför indexerade sidor med sidor som borde vara indexerade. Är 60 % eller mindre indexerat finns ett problem. Hitta det innan något nytt skrivs.
3. Kolla robots.txt. Den styr bara åtkomst, och okända regler ignoreras tyst. Den styr inte AI-träning.
4. Leta efter noindex-taggar som hamnat fel och ta bort dem. Sätt noindex på sajtens interna söksidor.
5. HTTPS överallt och en version av sajten. Välj www eller utan www och omdirigera den andra.
6. Ingen panik över 404. Google säger att de varken ger straff eller kostar crawlbudget. Omdirigera bara när det finns en verklig ersättare. Fel 500 och 429 bromsar däremot crawlingen, så rätta dem.
7. En sajt som ligger nere eller är i underhåll ska svara med status 503, aldrig 200. Google säger att en "strax tillbaka"-sida som svarar 200 kan indexeras med den texten och klumpas ihop som dubblett med andra sajter, och det kan ta lång tid att få ogjort. Kolla vilken statuskod driftstoppssidan skickar och rätta det före nästa driftstopp.
8. En pengasida som syns i Google med bara sin titel, utan beskrivning och ikon, kan svara med ett fel. Google kan hålla kvar en viktig sida i resultaten ett tag fast den ger fel. Öppna den och rätta det samma dag.
9. Efter varje lansering eller ombyggnad: crawla med skärmbilder. Ett enda JavaScript-fel kan göra hundratals sidor tomma för Google.
10. Ska sajten bakom ett CDN som Cloudflare? Slå på regeln som släpper igenom verifierade bottar innan något botskydd slås på. Google säger att Googlebot inte klarar en CAPTCHA, och blockerade sidor börjar falla ur sökresultaten. Gör samma sak för Google-Agent, agenten Google använder när den agerar åt en användare. Google har publicerat hur den släpps igenom CDN, brandväggar och botskydd. Tillåt den tillsammans med de verifierade bottarna.
11. Kolla vad som finns i rå HTML. Öppna sidkällan och sök efter en fras ur en flik, ett dragspel eller ett bildspel. Finns den inte där ser inte ChatGPT, Claude och Perplexity den, eftersom deras crawlers inte kör JavaScript, och Google kan se den sent. Title, metabeskrivning, canonical och robots-taggen ska också finnas i källan. Rapporterat: sidbyggare kan dessutom tappa text ur HTML-taggarna. Testa om Google läser en text genom att lägga in en unik fras och söka på den inom citattecken. Finns en lucka: flytta texten in i själva HTML:en.
12. "Crawled, currently not indexed" i Search Console är vanligt och kräver ofta ingen åtgärd, säger Google. Kolla de viktiga sidorna en och en med URL-inspektionen och låt resten vara. En stor andel sidor med den statusen betyder oftast att Google inte är övertygat om sajten som helhet. Att radera sidor för att göra sajten mindre rättar inte det, och inte heller att flytta sajten till en ny domän, säger Google. Förbättra sidorna som spelar roll.
13. Ingen egen crawler? Screaming Frog är gratis upp till 500 sidor. Låt Mathias köra den och ge dig fliken Issues, välj sedan de 20 % av rättningarna som ger 80 % av resultatet och lämna resten.

## Steg 3: Kolla varje pengasida

Gå igenom i ordning, och är det en rättning: gör den.

1. **Title.** Läs sidans title-tagg. SOP:ens formel: BEST + huvudsökord + ort + huvudtjänster + "near me" om det får plats, upp till ungefär 200 tecken, strunta i 60-teckensregeln. **Bahko gör inte så, se Del B: korta titlar och inget "Bäst".**
2. **Metabeskrivning.** Rätt språk, sökord och ort, och den säljer klicket. Den är annonsen i sökresultatet. En sida i topp tio som får färre klick än placeringen borde ge: skriv om title och metabeskrivning, notera datumet och följ placeringen. Rapporterat: sidor som får fler klick än placeringen normalt ger brukar ranka högre veckan efter.
3. **Exakt en H1.** Huvudsökord plus ort. Vanligt fel: loggan är märkt som H1, så sidan har flera.
4. **H2:or.** Sekundära ämnen och huvudtjänsterna.
5. **Första 100 orden.** Säg vad företaget gör och var, i klartext.
6. **FAQ.** Håll texten helt synlig. Ett kontrollerat test visade att synlig text slog dragspel med 12 % i organiska sessioner.
7. **Länkar.** Rena adresser, inga trasiga länkar i meny eller sidfot, inga föräldralösa sidor.
8. **Bilder.** Riktig alt-text, komprimerade, under ungefär 200 KB styck.
9. **Mobil.** Kolla sidan i mobilbredd. Läsbar, knapparna går att trycka på, telefonnumret ett tryck bort. Går den inte att ladda i mobilbredd: be Mathias öppna den på sin telefon och berätta vad som syns.
10. **Fart.** Testa på pagespeed.web.dev, mobil. Under ungefär 60: hitta orsaken. 100 behövs inte.

## Steg 4: Kolla innehållet

1. Varje tjänst får en egen sida. Bygg ett kluster helt färdigt innan nästa påbörjas.
2. Kör byteskollen. Kan en konkurrent sätta in sitt namn och använda sidan? Då säger den ingenting. Lägg till riktiga priser, riktiga jobb, riktiga foton och riktiga namn, från Mathias eller kunden.
3. Faktagranska all AI-text rad för rad, din egen också. Googles vägledning till granskarna från 1 oktober 2026 tittar på ansträngning, originalitet, skicklighet och korrekthet.
4. Hitta aldrig på en författare. Googles vägledning sedan 6 oktober 2026 kallar AI-genererade porträtt, påhittade namn och falska meriter för en form av vilseledning och ett tecken på en sida av låg kvalitet. Sätt en riktig människa på sidan.
5. Jaga inte AI-detektorers poäng. Rapporterat: en studie av 600 000 sidor fann nästan inget samband mellan poängen och rankingen (korrelation 0,11). Ingen har testat om en sänkt poäng hjälper, och humaniseringsverktyg tar enligt rapporter bort användbara detaljer. Granska innehållet med stegen ovan i stället.
6. Gamla slarviga AI-sidor: städa en sektion i taget, värst först, mät, sedan nästa.
7. Publicera nya sidor i jämn takt. Rapporterat: många sidor på en gång drar Googles uppmärksamhet till massproducerat innehåll mer än vem som skrev dem. Börja med några sidor i veckan och öka bara så länge de nya fortsätter att indexeras.
8. Gör interna länkar-passet nedan. Använd vanliga ord som en människa skulle säga.
9. Lägg inte in länktexter över hela sajten utan att läsa dem. Länktexter i sidfoten kan få en sajt som kör Google Ads att se ut att sälja något den inte säljer. Det är ett enda fall, men billigt att kolla.

## Steg 5: Kolla länkarna

1. Jämför hänvisande domäner med de tre främsta konkurrenterna.
2. Leta efter en plötslig topp av billiga länkar med exakt matchande länktext. Ett rapporterat fall föll under sin startplacering efter två Google-uppdateringar.
3. Köp inga billiga länkpaket. Förtjäna eller placera länkar på riktiga sajter i nischen.

## Interna länkar-passet

Interna länkar är länkarna från en sida på sajten till en annan. De visar Google vilka sidor som är viktiga och hjälper besökaren till nästa steg. På en småföretagssajt är det ofta den billigaste rättningen i hela auditen.

Ändringarna kräver åtkomst till sajten. Punkt 3 kräver också Search Console. Ingen åtkomst: markera punkt 3 som inte kollad och gör resten.

1. **Varje länk är en riktig länk.** Google följer länkar som har en webbadress bakom sig. Vissa sidbyggare gör knappar som bara kör ett skript, och dem kan Google inte följa. Kolla sidkällan: en riktig länk är en `<a>`-tagg med `href`. Hittar du en skriptknapp: byt den mot en riktig länk.
2. **Varje viktig sida får en länk från en annan sida.** En sida som ingenting länkar till är föräldralös, och Google och besökare hittar sällan dit. Varje tjänstesida och ortssida behöver minst en länk från en annan relevant sida. Två eller tre är bättre.
3. **Skjut på sidorna som nästan rankar.** I Search Console: öppna Resultat, sedan Sökfrågor, och hitta sökningar där sajten ligger på plats 4 till 20 med visningar varje vecka. Kolla vilken sida som rankar för var och en. Lägg länkar till den sidan från två eller tre besläktade sidor, med länktext som säger vad sidan handlar om. Börja med dem som ligger närmast topp 3. Rapporterat ur Search Console-data från 166 stora varumärken: från plats 4 till 3 ger ungefär 18 till 19 extra klick per 1 000 visningar, från 8 till 7 ungefär 1. Rapporterat som vanlig praxis, inget löfte. Notera datumet och kolla igen efter några veckor.
4. **Varje blogginlägg länkar till tjänstesidan det stöder.** Ett inlägg om att laga en droppande kran länkar till sidan för rörtjänster. Lägg länken där läsaren behöver svaret, inte längst ner.
5. **Tjänstesidor och ortssidor länkar till varandra.** Varje tjänstesida länkar till områdena som täcks. Varje ortssida länkar tillbaka till sina tjänster.
6. **Bevis länkar till erbjudandet.** Omdömen, kundcase och före och efter-bilder länkar till tjänsten de bevisar, så att en övertygad besökare har ett nästa steg.
7. **Länktexten säger vart den leder.** Inte "klicka här" eller "läs mer". Nämn tjänsten eller svaret som nästa sida ger. De bästa orden är ofta sökningarna som sidan redan rankar för i Search Console. Använd dem där meningen redan säger det, och skriv aldrig om en mening bara för att få in ett sökord. Variera formuleringen från sida till sida, som en människa skulle.
8. **Rätta trasiga länkar och länkar via en omdirigering.** En länk till en sida som inte finns längre, eller till en gammal adress som omdirigerar, pekas rakt på den levande sidan.
9. **Håll det lätt och kolla innan du ändrar.** Högst 3 till 5 nya länkar per sida, utspridda i texten, inte i rubriker. Länka till samma sida en gång per sida, och aldrig till sidan själv. Visa Mathias en tabell först: sida, länktext, vart den leder och varför. På hans ja: gör ändringarna och logga dem under "Logga varje ändring", så att en enskild går att ångra.

Varje gång en ny sida går live: sök igenom sajten efter dess ämne och lägg en länk till den från de äldre sidorna som nämner det.

## Steg 6: Gör auditen till en visuell rapport

Text på en skärm blir inte läst. Bygg resultatet som en webbsida som går att läsa med en blick, även på telefon:

1. Öppna med det största fyndet i en enkel mening. Under den: antalet av varje status.
2. En status per steg, i färg och i ord: bra, delvis där, behöver rättas, inte kollat än.
3. De fem rättningarna som rangordnade kort, ett under det andra: vad som är fel, vad som ska göras.
4. Det som redan fungerar. En rapport med bara problem läses som ett angrepp.
5. Staplar för siffrorna som spelar roll, till exempel hur många sidor som har varje problem av alla sidor.
6. Varje steg i sin helhet längst ner, i sektioner som fälls ut.
7. Visa det du inte kunde kolla som inte kollat. Fyll aldrig en lucka med en gissning eller en påhittad poäng.
8. Sätt datum på den. Bygg samma rapport efter rättningarna, så att kunden ser vad som rört sig.

Stil, eftersom det är en företagare som läser och ingen SEO-expert:

- Ljus bakgrund, mörk text, mycket luft. Ingen mörk dashboard.
- Ett vänligt, läsbart typsnitt, minst 16 px. Ingen liten grå text.
- En huvudfärg för rättningar och staplar. Mjukt grönt, bärnsten och korall bara för statusarna.
- Rundade kort med en sak på varje. Tryck inte ihop dem sida vid sida.

Finns logga, färger eller rapportstil i Del B: använd dem i stället.

## Quick win: etta på Google på ungefär en vecka

Gör det åt Bahko Byrå först, sedan åt en kund. En fras som nästan ingen siktar på är lätt att vinna, och en förstaplats är ett bevis som går att visa för vem som helst. Det fungerar bara vid låg konkurrens. Lån, försäkringar, bolån och andra stora sökord går aldrig så här fort, försök inte.

På en sajt som Google redan besöker har sidor byggda så här rankat på en till tre dagar. En helt ny sajt tar längre tid. Det är exempel, inga löften.

Det krävs en sajt som går att ändra, och Search Console. Finns ingen sajt: gör "Ingen sajt än? Bygg en" efter Steg B.

### Steg A: Ta fram fem fraser

Ta fram 5 fraser som nästan ingen siktar på, som ser bra ut att ligga etta på och som är mycket lätta att ranka för. Formeln: superlativ + det vi gör + vår ort.

Var och en av de fem ska klara alla fyra kontrollerna:

1. **Låg konkurrens.** Superlativ plus tjänst plus en riktig ort tar bort det mesta. Alla slåss om "bästa webbyrån". Nästan ingen slåss om "flitigaste webbyrån i Huskvarna".
2. **Trevlig att ranka för.** En kund ska bli imponerad av att se den på plats ett. Välj något som säljer, inget skämt.
3. **Mycket lätt att ranka för.** Det kollas i Steg B.
4. **Något som går att stå för.** Se Del B: superlativet måste kunna bevisas.

Superlativ som fungerar enligt SOP:en: hårdast arbetande, mest ihärdiga, mest kvalificerade, bäst klädda. "Bäst" har mer konkurrens, kolla det hårdare.

### Steg B: Kolla varje fras och välj en

1. Sök utloggad, i ett inkognitofönster, så att ingens historik ändrar resultaten. Går det inte: ge Mathias de fem sökningarna att köra och be om en skärmbild av varje.
2. Sök varje fras inom citattecken, ord för ord. Citattecknen gör att Google letar efter exakt den frasen.
3. Det vi vill se är att Google säger: Inga resultat hittades för "frasen". Då är den extremt lätt att ranka för. Spara den skärmbilden, det är före-bilden. Några få resultat: fortfarande möjligt, titta på dem först. En lista med riktiga sidor som redan siktar på frasen: stryk den.
4. Välj den med minst konkurrens som Mathias är stoltast över att visa, och stäm av valet med honom. Skriv ner den ord för ord. Exakt så används den överallt nedan.
5. Ta inte en fras ur ett exempel du sett någonstans. Välj en egen.

### Ingen sajt än? Bygg en

Det behövs ingen sidbyggare. Du bygger sajten.

1. **Låt Mathias välja en sajt han gillar.** Vilken sajt som helst vars utseende passar. Den används bara för utseendet: layout, sektioner, färger, typsnitt. Inte dess text, foton, logga eller namn.
2. **Hämta fakta.** Namn eller företagsnamn, vad de gör, ort, telefon, mejl, tre till fem tjänster, riktig bakgrund och frasen från Steg B. Bara riktiga uppgifter.
3. **Använd båda.** Bygg sajten i stilen från den valda sajten: samma slags layout och sektioner, med kundens innehåll. Rena HTML- och CSS-filer som går att ladda upp var som helst: en startsida och en sida på /[frasen] byggd enligt Steg C. All text skrivs ur kundens fakta. Ingen text, bild eller logga från exempelsajten. Den ska fungera på telefon. Lägg till sitemap.xml och en robots.txt som tillåter allt. Går adressen inte att öppna: be om skärmbilder av sajten.
4. **Kunden läser allt innan det går live,** på dator och på telefon, rad för rad. AI hittar på. Inga påhittade omdömen, kunder, priser, siffror eller adresser. Ta bort allt som inte är sant.
5. **Kolla att Google kan läsa den.** Texten finns i själva sidan (rå HTML-kollen i Steg 2). Varje länk är en riktig länk. En H1 per sida. Namn, telefon och mejl står på startsidan.
6. **Lägg ut den på kundens egen domän.** SOP:en använder Cloudflares gratisplan: ladda upp mappen, få en live-adress, koppla domänen. **Bahko: vi kör Vercel, se Del B.**
7. **Ändra på samma sätt.** Kunden säger vad som ska ändras, du gör nya filer och de laddas upp igen. Spara mappen. Det är deras sajt.

Fortsätt sedan med Steg C. Sidan är redan byggd. Låt kunden själv kolla de sex ställena.

### Steg C: Bygg en sida kring frasen

Gör en ny sida, inte startsidan: doman.se/frasen. Kundens egen domän är bäst eftersom den bygger förtroende. En gratisdomän fungerar troligen också, eftersom konkurrensen är så låg.

Hela sidan svarar på en fråga: vem är [frasen]? Lägg den exakta frasen i:

1. Title-taggen: frasen, ett kolon, sedan namnet.
2. H1.
3. Adressen.
4. Metabeskrivningen.
5. Brödtexten, 300 till 500 ord, med riktiga detaljer om personen eller företaget.
6. Bildernas alt-text.

Person-schema är en bonus, inget krav. Skriv sidan själv ur frasen, den här listan och den riktiga bakgrunden. På den här konkurrensnivån behöver texten inte vara lysande. De sex ställena ska vara rätt.

### Steg D: Få Google att hitta den

Utan konkurrens är det enda jobbet att bli hittad. Gör alla fyra:

1. Länka till sidan från startsidan, med frasen i länktexten. Inte "klicka här".
2. Sätt upp och verifiera Search Console.
3. Skicka in sitemapen i Search Console. Finns ingen: bygg en XML-sitemap.
4. Begär indexering av sidan i Search Console.

På en sajt som Google redan besöker räcker ofta länken från startsidan. Gör alla fyra ändå.

### Steg E: Cementera med egna profiler på stora sajter

Frivilligt, men det fyller mer av resultatsidan och ger länkar tillbaka till sidan. Använd kundens egna konton, med riktigt innehåll:

1. En kort YouTube-video med frasen som titel, som länkar till sidan.
2. En LinkedIn-artikel om frasen, som länkar till sidan.
3. En Medium-artikel om frasen, som länkar till sidan.

Är sidan för den egna byrån? Lista då också byrån där företag letar efter en: Clutch, GoodFirms och Trustpilot. En grundlistning är gratis. Använd samma namn, adress, telefon och enradsbeskrivning som på sajten, och länka till startsidan. Be sedan de första kunderna om ett omdöme där. En tom profil gör lite.

Skriv artiklarna och ett manus till videon. Alla tre behövs inte. Med tillräckligt med tid och tillräckligt många sådana kan sidan börja ranka för frasen utan citattecken, och AI-svar kan börja nämna företaget. Det är rapporterat, inte garanterat.

### Steg F: Kolla, rätta, visa

1. Kolla utloggad, i inkognito, frasen inom citattecken.
2. Hittas inte alls: sidan är inte indexerad. Gör om Steg D, eller lägg en länk till från en riktig sida. Varje länk från Steg E räknas.
3. Indexerad men inte i topp 3: kolla de sex ställena i Steg C. Oftast har frasen för mycket konkurrens. Gå tillbaka till Steg B och välj en annan.
4. Ge den några dagar efter indexeringen innan något ändras.
5. Etta: ta en skärmbild med datum. Den visas för kunder, som uppmanas att söka själva.

Klart betyder: frasen kollad inom citattecken, sidan live med frasen på alla sex ställena, länkad från startsidan, indexering begärd, daterad inkognitoskärmbild på plats ett.

## Om trafiken föll, gör det här i stället

1. Kolla Search Console först. Rapporterat: Google matar rankingverktyg med fel resultat, så ett verktyg kan visa ett tapp som inte hänt. Search Console är sanningskällan. Gör sedan sökningen själv. Följs rankingen med ett verktyg som bygger på DataForSEO (SEO Utils med flera): slå på rättningen för förgiftade resultat. Rasar alla placeringar på en gång utan orsak: kolla ett sökord i inkognito innan kunden får veta något.
2. Kolla manuella åtgärder i Search Console.
3. Lägg tappet bredvid datumen för Googles uppdateringar. En nedvärdering syns oftast under de första 1 till 2 veckorna av en uppdatering. Googles kärnuppdatering i november 2026 började 10 november och kan ta upp till 2 veckor. Gör inga stora ändringar på en sajt medan en uppdatering rullar ut, för då går ändringen inte att skilja från uppdateringen. Fortsätt publicera, och bedöm placeringarna när den är klar.
4. Crawla sajten.
5. Sök på varumärkesnamnet. En sajt som inte rankar på sitt eget namn ligger nästan alltid under en åtgärd från Google.
6. Kolla organiska och lokala resultat var för sig. De kan röra sig åt olika håll.
7. Stärk där sajten fortfarande rankar innan de största förlusterna jagas.

## Det kunden får

Den visuella rapporten från Steg 6, med: var de står i dag, de fem rättningarna som ger mest pengar, vad som redan är rättat och vad som kommer härnäst. Enkla ord, ingen jargong.

## Klart betyder

- Baslinje sparad med datum, om åtkomsten finns
- Indexeringen kollad
- Varje pengasida genomgången
- Åtgärdslistan rangordnad, de översta rättningarna gjorda
- Interna länkar-passet gjort: riktiga länkar, inga föräldralösa sidor, sidorna på plats 4 till 20 länkade till, eller punkt 3 markerad som inte kollad
- Visuell rapport skickad till kunden

## Logga varje ändring

En rad per ändring: sida, vad som ändrades, datum, varför. Titta igen efter 3 månader. Utan det får ingen någonsin veta vad som fungerade.

## SOP:ens ändringslogg

- 2026-11-01: Första versionen.
- 2026-11-02: Bytestestet delat i två kontroller, AI-detektorpoäng struken ur innehållskollen, visuell rapport tillagd som Steg 6 med upplägg och stil. Ortsbyteskollen flyttad till lokala SOP:en. Måste ha och bra att ha delade, så att Steg 1 kan stå som inte kollat.
- 2026-11-09: Steg 1 lämnar klicktoppen 31 oktober till 2 november utanför baslinjen. Steg 2 får pengasidor som bara visar en titel, rå HTML-kollen och "Crawled, currently not indexed". Steg 4 får jämn publiceringstakt. Interna länkar-passet och Quick win tillagda.
- 2026-11-16: Steg 2 får CDN-regeln för verifierade bottar, vad en stor andel "Crawled, currently not indexed" betyder och en gratis crawler med 20/80-urvalet. Steg 3 får omskrivning av title och meta på en topp tio-sida med för få klick. Steg 4 får "hitta aldrig på en författare". Interna länkar-passet får klickvinsten per placering. Trafiktapp börjar med Search Console och får kärnuppdateringen i november 2026.
- 2026-11-23: Agentstil: säg vad du vill ha och AI:n gör det. Nytt avsnitt till AI:n som kör, och stegen är skrivna som saker den gör. Quick win får "Ingen sajt än? Bygg en". Steg E får byråkatalogerna (Clutch, GoodFirms, Trustpilot). Steg 2 får Google-Agent bland de verifierade bottarna, status 503 för en sajt som ligger nere, och att en ny domän inte rättar "Crawled, currently not indexed". Trafiktapp får rättningen för förgiftade resultat i verktyg som bygger på DataForSEO.

---

# Del B: Våra noteringar

## Där vi avviker från SOP:en

Våra regler vinner. Säg till Mathias om en ny SOP-version ändrar något av det här.

| SOP:en säger | Vi gör | Varför |
|---|---|---|
| Title upp till cirka 200 tecken med "BEST" först (Steg 3.1) | **Korta titlar, högst cirka 60 tecken.** Huvudsökordet först, firmanamnet sist, inga tjänstelistor, inget "Bäst". Exempel: `Maskinuthyrning i Sollentuna \| Proffsmaskiner Sverige AB` | Mathias beslut 2026-11-17. Ett superlativ måste kunna bevisas enligt marknadsföringslagen, och Google skriver om titlar som ser fyllda med sökord ut (Dokumenterat) |
| Quick win med valfritt superlativ (Steg A) | **Bara superlativ som går att bevisa,** eller en fras utan superlativ som ändå är ledig. "Bäst", "billigast" och "störst" kräver bevis. Ett lekfullt superlativ om oss själva ("flitigaste") stäms av med Mathias först | Marknadsföringslagen. Gäller kundsajter fullt ut |
| Lägg ut på Cloudflare | **Vi kör Vercel.** Kundsajter byggs i repot med demomallen, se skillen `hemsidor` | Vår drift |
| Visa listan en gång, gör sedan allt | **Fråga före push, merge och deploy. Allt i EN pull request.** | Varje push och merge kostar ungefär tio deploys, och taket delas med kundsajterna |
| Synlig FAQ (Steg 3.6) | Samma. FAQ-texten ska synas. **FAQPage-schemat** ger däremot inga rich results för vanliga sajter | Se "Bortkastad tid" |

## Åtkomst: vad vi kan göra själva

- **Sajterna ändrar vi själva.** De ligger i repot `BahkoStudio/BahkoByra`: `web/app/(demo)/<kund>/` för kundsajterna och `web/app/(sajt)/` för bahkobyra.se. Jobba i en egen worktree från färsk `origin/main`.
- **Search Console och GA4 når vi inte härifrån.** Steg 1 och interna länkar-passets punkt 3 görs via Cowork (Claude i webbläsaren, inloggad som bahkostudio@gmail.com) eller med skärmbilder från Mathias. Annars står de som inte kollat.
- **Rendera och mät lokalt** med Playwright ur `web/node_modules`, i DPR 2 och med `reducedMotion`. Polla aldrig bahkobyra.se i en loop efter deploy, hela domänen spärras då från datorns IP. Kontrollera deploys via GitHub.
- **Rå HTML-kollen** görs med `curl` och Googlebots user agent mot den levande sidan. På proffsmaskiner.se och kakel0413.se hamnade title, metabeskrivning och canonical efter `</head>` för Googlebot tills det rättades 2026-11-18. Kolla det på varje ny kundsajt.

## Kunderna

Vilka kunder vi jobbar med, deras huvudsökord och baslinjer står i skillen **optimering-local** (tabellen "Kunder vi kör SOP:en på"). Varje kunds underlag: `2-kunder/kunder/<kund>/seo-geo-aeo.md`.

## Rapporten i Bahkos stil

- En HTML-sida, ljus, med Bahkos gröna som huvudfärg och loggan överst. Hämta färger och logga från bahkobyra.se (`web/app/(sajt)/`).
- Sparas som `OneDrive/1 Bahko Byrå/Kunder/<kund>/SEO/Audit ÅÅÅÅ-MM-DD.html`. Bahkos egen: `OneDrive/1 Bahko Byrå/SEO/`.
- Skrivs för företagaren: enkla ord, inga förkortningar utan förklaring, inga tankstreck.
- Med rapporten följer en mejltext på högst två meningar som Mathias skickar.

## Loggen

En rad per ändring i `2-kunder/kunder/<kund>/seo-logg.md`: datum, sida, vad som ändrades, varför, och pull request-numret. Repot är publikt: inga priser, bankuppgifter eller personnummer i loggen.

## Vad Google själva säger om AI-sökning

Flyttar till optimering-ai när den byggs.

**AI Overviews och AI Mode är Google Search, inte en separat motor.** Samma index, crawling, ranking och kvalitetssystem, med AI ovanpå (Dokumenterat, Googles optimeringsguide). AEO och GEO är branschetiketter, inga Google-system.

Två verkliga begrepp: **retrieval** (svaret grundas i sidor ur indexet, oindexerat finns inte) och **query fan-out** (modellen skickar flera relaterade frågor, därför slår ett väl täckt ämne på en stark sida tio tunna sidor).

**Maskinerna måste se innehållet.** GPTBot, ClaudeBot, PerplexityBot och Bytespider kör inte JavaScript (Dokumenterat, Vercel/MERJ). Under ca 800 ord i rå HTML är ett problem. Kontroll:

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

**Innehåll som AI citerar.** Svara på frågan först. Självbärande stycken med företagsnamn och ort utskrivna. Källhänvisa regler, priser och myndighetskrav. Konkreta siffror slår adjektiv ("2 tons minigrävare", inte "modern maskinpark"). Slå upp regler i primärkällan innan de skrivs på en kundsajt.

Vid domänflytt: 301 från gamla adressen, ta bort raden ur vår `sitemap.xml`, uppdatera canonical, verifiera i Search Console.

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
| Påhittad författare, AI-porträtt eller falska meriter | Googles vägledning sedan 6 oktober 2026: vilseledning |
| Påhittade omdömen, kunder, priser, siffror eller adresser | Vilseleder, och AI hittar gärna på dem |
| Kundens ord ändrade utan att det sägs | Text kunden skrivit eller godkänt rörs bara på Mathias ord |
| Blockera GPTBot/ClaudeBot/PerplexityBot eller Google-Extended | Stänger AI-synlighet utan vinst |
| Låta JS ta bort en `noindex` som står i rå HTML | Sidan blir aldrig indexerad |
| En sida per gissad long-tail-fråga | Google avvisar det, ger tunna dubbletter |
| Köpa länkpaket, omnämnanden eller omdömen | Riktlinjebrott |
| Stora ändringar medan en kärnuppdatering rullar ut | Ändringen går inte att skilja från uppdateringen |

Det som gäller Google-profilen (AI-bilder, kategorier, anmäla falska profiler) står i optimering-local.

## Bortkastad tid

- **FAQPage-schema:** rich results bara för myndighets- och hälsosajter sedan augusti 2023. FAQ-*texten* på sajten är värd att ha (Steg 3.6), schemat ger inget.
- **BreadcrumbList på one-pager, `WebSite`/`SearchAction`, `Person` med `hasCredential`.** Döda eller meningslösa.
- **llms.txt, llms-full.txt, ai.txt.** Ingen dokumenterad effekt hos Google. Skadar inte, men sälj det aldrig som en åtgärd.
- **AI-detektorpoäng och humaniseringsverktyg.** Se Steg 4.5.
- **Jaga 100 på PageSpeed.** Se Steg 3.10.

## Output när ingen rapport beställts

Rangordnad lista där varje punkt har: vad, evidensgrad, uppskattad effekt och varför, och om det går nu eller är blockerat. Skilj på "ger effekt", "billigt experiment" och "gör inte".

## Vad som ändrats i skillen

- 2026-07: första versionen av `optimering`, korsgranskad kartläggning (fyra utredningar plus skeptiker).
- 2026-11-12 och 2026-11-17: lokala SOP:en inlagd och uppdaterad. Den historiken följer med till optimering-local.
- 2026-11-23: `optimering` delad i tre. Den här skillen heter nu **optimering-general** och har General SEO SOP version 2026-11-23 som Del A. Lokala SOP:en (version 2026-11-13) flyttad oförändrad till **optimering-local**. Del B: ny tabell över var vi avviker från SOP:en (korta titlar, bevisbara superlativ, Vercel, en pull request), åtkomst, rapportstil och logg. Svartlistan utökad med påhittad författare, påhittade uppgifter och stora ändringar under en kärnuppdatering.
