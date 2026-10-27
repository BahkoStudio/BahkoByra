/**
 * Innehållskälla för nischsidorna: en sida per nisch på startsidan (Mathias
 * 2026-10-23: alla åtta). Ny nisch = ny post här + en tunn page.js under
 * /hemsida-for-<yrke>/. Beviset är ärligt märkt: typ 'kund' (riktig leverans),
 * 'demo' (vår egen demo, ingen kund bakom) eller 'google' (vi sköter profilen,
 * inte sajten). Saknas en kund i branschen står det utskrivet i texten.
 * Fakta 2026: ROT 30 % av arbetskostnaden, max 50 000 kr per person och år
 * (Skatteverket); elinstallationsföretag ska vara registrerade hos
 * Elsäkerhetsverket (elsäkerhetslagen 2016:732); 14 dagars ångerrätt vid
 * distansköp (distansavtalslagen); Säker Vatten enligt branschorganisationen.
 *
 * Faktaregel: ROT/RUT-formuleringarna nedan följer Skatteverkets regler
 * (ROT kräver hus äldre än fem år och gäller arbetskostnaden; RUT gäller
 * skötsel men inte nyanläggning). Ändra aldrig utan att slå upp källan.
 */

export const NISCHER = [
  {
    slug: 'hemsida-for-malerifirma',
    yrke: 'målerifirma',
    namn: 'Måleri',
    title: 'Hemsida för målerifirma',
    beskrivning:
      'Vad en målerifirmas hemsida måste klara: ROT förklarat rätt, era jobb som bevis och offert i mobilen. Se en riktig leverans och få ett förslag inom 48 timmar.',
    h1: 'Hemsida för målerifirma',
    ingress:
      'En hemsida för en målerifirma ska göra tre saker: visa era jobb, förklara ROT-avdraget rätt och göra det enkelt att begära offert i mobilen. Så här bygger Bahko Byrå den, med en riktig leverans ni kan klicka in i.',
    punkter: [
      {
        h: 'ROT förklarat rätt',
        p: 'Rotavdraget gäller arbetskostnaden, inte materialet, och kräver att huset är äldre än fem år. Vi skriver texten enligt Skatteverkets regler och länkar till källan. Kunden räknar på vad det kostar efter avdraget innan de ringer, och fel ROT-information är vanligare än rätt.',
      },
      {
        h: 'Era jobb som bevis',
        p: 'Före- och efterbilder från riktiga uppdrag, med ort utskriven. Den som ska släppa in en målare i hemmet vill se vad ni gjort hos andra först.',
      },
      {
        h: 'Offert med en tumme',
        p: 'Formuläret ska gå att fylla i med ena handen i mobilen, och telefonnumret ska synas utan att öppna menyn. Det är där jobben annars läcker.',
      },
      {
        h: 'Omdömen där de syns',
        p: 'Era Google-omdömen inlyfta på sidan med namn, ort och vad jobbet gällde. Det är det första folk letar efter, och det går inte att fejka.',
      },
    ],
    brodtext: [
      'Måleri köps lokalt. Ingen söker bara "målare", de söker målare i sin stad, och de jämför tre eller fyra firmor innan de hör av sig. Sidan ska därför säga var ni jobbar i klartext, i rubriker och i text, inte i en kommunlista längst ned som ingen läser.',
      'Texterna ska låta som firman, inte som en byrå. Vad ni gör, var ni jobbar och hur det går till från förfrågan till färdigt jobb. Kunden som förstår processen vågar ta första steget, och den som möts av ord som kvalitet och kundfokus klickar vidare.',
    ],
    bevis: {
      namn: 'Smålands Måleri',
      ort: 'Jönköping',
      url: 'https://smamaleri.se/',
      bild: '/img/demo-smalands-maleri.webp',
      text: 'Smålands Måleri i Jönköping fick en sida med offertflöde som funkar i mobilen och en ROT-sektion skriven enligt Skatteverkets regler, med länk direkt till källan. Sidan är i drift och tar emot förfrågningar. Klicka in och syna den, det är så här ett förslag till er skulle se ut i verkligheten.',
    },
    fragor: [
      {
        fraga: 'Vi får de flesta jobben via rekommendationer. Behöver vi en sida ändå?',
        svar:
          'Rekommendationen är starten, inte avslutet. Den som fått ert namn googlar er innan de ringer. Hittar de ingenting, eller en sida som inte gått att uppdatera sedan 2019, går de vidare till nästa namn de fått.',
      },
      {
        fraga: 'Kan ni skriva ROT-texten åt oss?',
        svar:
          'Ja, och vi skriver den mot Skatteverkets regler i stället för att kopiera vad andra målarsajter påstår. Rätt ROT-information är ett säljargument, eftersom kunden räknar på nettot och konkurrenterna ofta förklarar det fel.',
      },
      {
        fraga: 'Vad behöver ni från oss?',
        svar:
          'Bilder från jobb ni gjort, vilka orter ni jobbar i och era kontaktuppgifter. Texterna skriver vi. Ni behöver inte kunna något tekniskt, och ni äger sidan och domänen när den är klar.',
      },
      {
        fraga: 'Vad kostar en hemsida för en målerifirma?',
        svar:
          'Ni får ett exakt fast pris i det kostnadsfria förslaget, innan ni bestämmer er. Underhåll och grundläggande SEO och ranking på Google är valfria tillägg med ett pris i månaden, som också står i förslaget, och det finns ingen bindningstid. Vad som avgör priset förklarar vi öppet på sidan om vad en hemsida kostar.',
      },
    ],
  },
  {
    slug: 'hemsida-for-tradgardsfirma',
    yrke: 'trädgårdsfirma',
    namn: 'Trädgård',
    title: 'Hemsida för trädgårdsfirma',
    beskrivning:
      'Vad en trädgårdsfirmas hemsida måste klara: RUT och egen sida per tjänst, ringknapp på varje skärm. Se en riktig leverans och få ett förslag inom 48 timmar.',
    h1: 'Hemsida för trädgårdsfirma',
    ingress:
      'En hemsida för en trädgårdsfirma ska svara på tre frågor innan kunden ringer: gör ni det jag behöver, jobbar ni där jag bor och vad gäller med RUT. Så här bygger Bahko Byrå den, med en riktig leverans ni kan klicka in i.',
    punkter: [
      {
        h: 'RUT utskrivet per tjänst',
        p: 'Rutavdraget gäller skötsel som gräsklippning och häckklippning, men inte nyanläggning. Byter ni en häck ger borttagningen avdrag men inte planteringen. Vi skriver beskedet per tjänst så kunden slipper gissa, enligt Skatteverkets regler.',
      },
      {
        h: 'En sida per tjänst',
        p: 'Häckklippning, trädgårdsskötsel och skötsel för bostadsrättsföreningar är olika sökningar från olika kunder. Egna sidor per tjänst gör att ni hittas på var och en av dem.',
      },
      {
        h: 'Ringknapp på varje skärm',
        p: 'För trädgård är samtalet det som blir en affär. Numret ska synas utan att öppna menyn, och ringknappen ska följa med hela vägen ned på sidan.',
      },
      {
        h: 'Rätt tjänst i rätt säsong',
        p: 'Häckklippning söks när häcken är hög och snöröjning innan första snön. Sidan byggs så att det är enkelt att lyfta fram det kunderna letar efter just nu.',
      },
    ],
    brodtext: [
      'Trädgårdstjänster köps nära hemmet och ofta av någon som jämför i mobilen på kvällen. Sidan ska säga vilka områden ni jobbar i, i klartext, och visa riktiga bilder från era jobb. En kund som känner igen sitt eget kvarter i bilderna har redan bestämt sig till hälften.',
      'RUT är dessutom halva köpbeslutet. Den firma som förklarar avdraget rätt, per tjänst, framstår som den som kan sina saker, och den som skriver fel eller inget alls skapar tvekan i exakt det ögonblick kunden var redo att ringa.',
    ],
    bevis: {
      namn: 'Bromma Trädgårdsservice',
      ort: 'Bromma, Stockholm',
      url: 'https://brommatradgardsservice.se/',
      bild: '/img/demo-bromma-tradgard.webp',
      text: 'Bromma Trädgårdsservice i västra Stockholm fick en sida med telefonnumret synligt på varje skärm, egna sidor för häckklippning, trädgårdsskötsel och skötsel för bostadsrättsföreningar, och RUT-beskedet utskrivet per tjänst. Den 30 juli 2026 låg firman först av sex i Googles Platser-flik för trädgårdsservice i Stockholm och nämndes först i ChatGPT:s svar. På två månader kom 35+ offertförfrågningar in via sidan.',
    },
    fragor: [
      {
        fraga: 'Räcker inte vår Facebook-sida?',
        svar:
          'Facebook når de som redan följer er. Den som googlar häckklippning i ert område hittar firmorna med egna sidor, och det är där jobbet hamnar. Sidan och Facebook gör olika jobb, den ena ersätter inte den andra.',
      },
      {
        fraga: 'Vad gäller med RUT egentligen?',
        svar:
          'Skötsel ger avdrag, nyanläggning gör det inte. Gräsklippning, häckklippning och beskärning går bra, medan att anlägga en ny rabatt eller plantera en ny häck inte gör det. Vi skriver beskedet rätt per tjänst på er sida, med Skatteverket som källa.',
      },
      {
        fraga: 'Kan sidan visa olika tjänster olika tider på året?',
        svar:
          'Ja. Sidan byggs så att det går att lyfta fram beskärning på sensommaren och snöröjning på hösten utan att bygga om något. Det är en textändring, inte ett projekt.',
      },
      {
        fraga: 'Vad kostar en hemsida för en trädgårdsfirma?',
        svar:
          'Ni får ett exakt fast pris i det kostnadsfria förslaget, innan ni bestämmer er. Underhåll och grundläggande SEO och ranking på Google är valfria tillägg med ett pris i månaden, som också står i förslaget, och det finns ingen bindningstid. Vad som avgör priset förklarar vi öppet på sidan om vad en hemsida kostar.',
      },
    ],
  },
  {
    slug: 'hemsida-for-snickare',
    yrke: 'snickare',
    namn: 'Snickare',
    title: 'Hemsida för snickare',
    beskrivning: 'Vad en snickares hemsida måste klara: ROT förklarat rätt, era jobb som bevis per ort och offert i mobilen. Se hur det ser ut och få ett förslag inom 48 timmar.',
    h1: 'Hemsida för snickare',
    ingress: 'En hemsida för en snickare ska svara på tre saker innan kunden ringer: vad ni bygger, var ni jobbar och vad ROT gör med priset. Så här bygger Bahko Byrå den.',
    punkter: [
      { h: 'ROT förklarat rätt', p: 'Rotavdraget är 30 procent av arbetskostnaden, högst 50 000 kronor per person och år, och gäller inte material eller resor. Huset ska vara äldre än fem år. Vi skriver texten enligt Skatteverkets regler och länkar dit, så att kunden kan räkna på nettot själv.' },
      { h: 'Jobben sorterade som kunden söker', p: 'Altan, kök, fönsterbyte och attefallshus är fyra olika sökningar. Egna sidor per jobbtyp, med bilder från riktiga uppdrag och orten utskriven, gör att ni hittas på var och en.' },
      { h: 'Fast pris eller löpande, sagt i klartext', p: 'Den som ska anlita en snickare är rädd för en räkning som växer. Sidan ska säga hur ni tar betalt, vad som ingår i en offert och när ni kan börja. Det är den informationen som får kunden att välja er.' },
      { h: 'Offert med en tumme', p: 'Formuläret ska gå att fylla i med ena handen i mobilen, med plats för en bild på det som ska byggas, och telefonnumret ska synas utan att öppna menyn.' },
    ],
    brodtext: [
      'Snickare söks lokalt och med ett konkret jobb i tankarna: "snickare Huskvarna altan", inte "snickeri". Sidan ska därför nämna orterna ni jobbar i och jobbtyperna ni gör, i rubriker och text, inte i en kommunlista längst ned.',
      'Bilderna gör jobbet. Före och efter från en riktig altan i rätt kvarter slår varje adjektiv om kvalitet. Vi lägger dem så att de syns på första skärmen i mobilen, där kunden faktiskt bestämmer sig.',
      'Google-profilen gör halva jobbet. En snickare med rätt kategori, riktiga bilder från jobb och tio färska omdömen hamnar i platslistan när någon i er stad söker, och det är dit sidan ska länka tillbaka. Vi sätter upp profilen rätt om den saknas, och sköter den varje månad om ni vill. Omdömen ber vi om efter varje avslutat jobb, med en länk som kunden kan trycka på i mobilen, för det är volymen och färskheten som Google väger.',
    ],
    bevis: {
      typ: 'demo',
      namn: 'GRANIT Bygg',
      ort: 'Demo, bygg och snickeri',
      url: 'https://www.bahkobyra.se/cloud/bygg/',
      bild: '/img/portfolj/granit.jpg',
      text: 'GRANIT Bygg är en demo vi byggt för att visa hur en bygg- och snickerifirmas sida kan se ut: ett förfallet hus blir ett drömhus medan man bläddrar, projekten ligger som egna sidor och offertknappen följer med hela vägen. Ingen riktig kund står bakom den, det står utskrivet. Ert förslag byggs på samma sätt, med era jobb och er ort.',
    },
    fragor: [
      { fraga: 'Vi har fullt med jobb via kontakter. Varför en hemsida?', svar: 'För att välja jobben i stället för att ta dem som kommer. Den som googlar "snickare" plus er ort och hittar en sida med riktiga altaner och tydligt ROT-besked ringer med ett konkret jobb, inte för att pruta.' },
      { fraga: 'Hur mycket är rotavdraget 2026?', svar: '30 procent av arbetskostnaden, högst 50 000 kronor per person och år. Material och resor ingår inte, och bostaden ska vara äldre än fem år. Under 2025 var avdraget tillfälligt höjt, och många sajter har inte uppdaterat sin text. Vi skriver er mot Skatteverkets aktuella regler.' },
      { fraga: 'Vad behöver ni från oss?', svar: 'Bilder från jobb ni gjort, vilka orter ni jobbar i och hur ni tar betalt. Texterna skriver vi. Ni äger sidan och domänen när den är klar.' },
      { fraga: 'Vad kostar en hemsida för en snickare?', svar: 'Bygget har ett fast pris ex moms: 10 000, 13 000 eller 25 000 kronor beroende på paket. Underhåll och grundläggande SEO (500 kronor i månaden) och Google-ranking (2 470 kronor i månaden) är valfria tillägg, båda utan bindningstid. Ni får ett exakt pris i det kostnadsfria förslaget innan ni bestämmer er.' },
    ],
  },
  {
    slug: 'hemsida-for-elektriker',
    yrke: 'elfirma',
    namn: 'Elektriker',
    title: 'Hemsida för elektriker',
    beskrivning: 'Vad en elfirmas hemsida måste klara: registreringen hos Elsäkerhetsverket synlig, ROT rätt, akutnummer på varje skärm. Få ett förslag inom 48 timmar.',
    h1: 'Hemsida för elektriker',
    ingress: 'En hemsida för en elfirma ska göra en sak snabbare än alla andra: få kunden att ringa. Den ska också visa att ni är registrerade hos Elsäkerhetsverket och förklara ROT rätt. Så här bygger Bahko Byrå den.',
    punkter: [
      { h: 'Registreringen synlig', p: 'Företag som gör elinstallationer åt andra ska vara registrerade hos Elsäkerhetsverket, och kunden kan kontrollera det i tjänsten Kolla elföretaget. Vi skriver ut det på sidan och länkar till kontrollen. Det är ert starkaste förtroendeargument, och få konkurrenter använder det.' },
      { h: 'Ringknapp på varje skärm', p: 'Den som har en jordfelsbrytare som löser ut läser inte brödtext. Numret ska synas direkt i mobilen utan att öppna menyn, och följa med hela vägen ned.' },
      { h: 'ROT utskrivet rätt', p: 'Elarbete i bostaden ger rotavdrag på arbetskostnaden, 30 procent och högst 50 000 kronor per person och år, inte på material. Vi skriver det enligt Skatteverkets regler med länk till källan.' },
      { h: 'Tjänsterna kunden söker på', p: 'Elbilsladdare, byte av elcentral, belysning och felsökning är olika sökningar. Egna sidor per tjänst, med vad som ingår och ungefär hur lång tid det tar, gör att ni hittas på var och en.' },
    ],
    brodtext: [
      'Elfirmor söks i två lägen: akut och planerat. Den akuta kunden vill ha ett nummer på en sekund, den planerade vill veta om ni gör elbilsladdare och vad det kostar ungefär. Sidan ska klara båda utan att den ena stör den andra.',
      'Förtroende avgör. Elsäkerhetsverkets registrering, era omdömen från Google och bilder från riktiga installationer med orten utskriven är det kunden letar efter. Vi lägger det där det syns, inte längst ned.',
      'Google-profilen är lika viktig som sidan. Kategorin ska vara elektriker, tjänsteområdet ska vara de orter ni faktiskt åker till och bilderna ska komma från riktiga installationer. När profilen och sidan säger samma sak hamnar ni i platslistan, och det är därifrån de flesta akutsamtal kommer. Vi sätter upp profilen rätt om den saknas och sköter den varje månad om ni vill, med svar på varje omdöme.',
    ],
    bevis: {
      typ: 'kund',
      namn: 'Bromma Trädgårdsservice',
      ort: 'Stockholm, annan bransch, samma mekanik',
      url: 'https://brommatradgardsservice.se/',
      bild: '/img/portfolj/bromma.jpg',
      text: 'Vi har ännu ingen elfirma som kund, så här står en trädgårdsfirma som bevis i stället. Bromma Trädgårdsservice i Stockholm fick en sida med numret synligt på varje skärm och egna sidor per tjänst. Den 30 juli 2026 låg firman etta i Googles platslista på "trädgårdsservice i Stockholm". Mekaniken är densamma för en elfirma: egna sidor per tjänst, ort i klartext och ringknapp överallt.',
    },
    fragor: [
      { fraga: 'Måste vi visa registreringen hos Elsäkerhetsverket?', svar: 'Ni måste vara registrerade för att få göra elinstallationer åt andra, men ingen tvingar er att visa det på sidan. Vi gör det ändå, med länk till Kolla elföretaget, eftersom kunden som kontrollerar det väljer den firma som gjorde kontrollen enkel.' },
      { fraga: 'Ger elarbete rotavdrag?', svar: 'Ja, elarbete i en bostad äldre än fem år ger rotavdrag på arbetskostnaden: 30 procent, högst 50 000 kronor per person och år. Material som kablar, elcentral och laddbox ingår inte. Vi skriver det rätt på er sida, med Skatteverket som källa.' },
      { fraga: 'Kan sidan ta akutsamtal och planerade jobb samtidigt?', svar: 'Ja. Ringknappen ligger överst för den som har bråttom, och tjänstesidorna med offertformulär ligger under för den som planerar. Två vägar, en sida.' },
      { fraga: 'Vad kostar en hemsida för en elfirma?', svar: 'Bygget har ett fast pris ex moms: 10 000, 13 000 eller 25 000 kronor beroende på paket. Underhåll och grundläggande SEO (500 kronor i månaden) och Google-ranking (2 470 kronor i månaden) är valfria tillägg, båda utan bindningstid. Ni får ett exakt pris i det kostnadsfria förslaget innan ni bestämmer er.' },
    ],
  },
  {
    slug: 'hemsida-for-rormokare',
    yrke: 'VVS-firma',
    namn: 'Rörmokare',
    title: 'Hemsida för rörmokare och VVS-firma',
    beskrivning: 'Vad en VVS-firmas hemsida måste klara: akutnumret först, Säker Vatten-auktorisationen synlig och ROT rätt. Se en demo och få ett förslag inom 48 timmar.',
    h1: 'Hemsida för rörmokare',
    ingress: 'En hemsida för en rörmokare har två kunder: den med vatten på golvet och den som planerar ett badrum. Sidan ska ge den första ett nummer på en sekund och den andra skäl att välja just er. Så här bygger Bahko Byrå den.',
    punkter: [
      { h: 'Akutnumret först', p: 'Vid en vattenläcka läser ingen om företaget. Numret ska vara det första som syns i mobilen och gå att trycka på direkt, med öppettider för jour utskrivna.' },
      { h: 'Säker Vatten synligt', p: 'Är ni auktoriserade av Säker Vatten ska det stå på första skärmen, med länk till deras register. Enligt branschorganisationen kan försäkringsbolag be om intyg om Säker Vatteninstallation efter en skada, och det är ett argument kunden förstår.' },
      { h: 'ROT rätt, även för badrum', p: 'VVS-arbete i bostaden ger rotavdrag på arbetskostnaden, 30 procent och högst 50 000 kronor per person och år. Material som blandare och rör ingår inte. Vi skriver det enligt Skatteverkets regler och länkar till källan.' },
      { h: 'Före och efter, utan att gräva', p: 'Relining, badrum och värmepump visas bäst med bilder från riktiga jobb, gärna som före och efter. Det är det som gör att en planerad kund stannar på sidan.' },
    ],
    brodtext: [
      'Rörmokare söks i stunden, ofta med ordet akut: "rörmokare akut Växjö". Sidan ska därför laddas snabbt i mobilen och visa numret innan något annat. Den som tvingas leta efter kontaktuppgifter ringer nästa firma i listan.',
      'Den planerade kunden vill se auktorisation, omdömen och bilder på badrum ni gjort. Egna sidor för badrum, värmepump och relining gör att ni hittas på rätt sökning och kan svara på frågan "vad kostar det" innan kunden ställer den.',
      'Google-profilen avgör akutjobben. Kategorin ska vara rörmokare eller VVS-firma, öppettiderna ska visa om ni har jour och bilderna ska komma från riktiga jobb. När profilen och sidan stämmer överens hamnar ni i platslistan, och det är därifrån samtalet om vattenläckan kommer. Vi sätter upp profilen rätt om den saknas, och sköter den varje månad om ni vill, med svar på varje omdöme.',
    ],
    bevis: {
      typ: 'demo',
      namn: 'Asmar Relining',
      ort: 'Demo, relining och VVS',
      url: 'https://www.bahkobyra.se/cloud/asmar/',
      bild: '/img/portfolj/asmar.jpg',
      text: 'Asmar Relining är en demo vi byggt för att visa hur en VVS-sida kan se ut: ett rör inifrån, före och efter, utan att gräva, med offertknappen synlig hela vägen. Ingen riktig kund står bakom den, det står utskrivet. Ert förslag byggs på samma sätt, med era jobb, er auktorisation och er ort.',
    },
    fragor: [
      { fraga: 'Vi får akutjobben via Google redan. Vad tillför sidan?', svar: 'De planerade jobben, som betalar bättre. Badrum, värmepump och stambyte söks i lugn och ro, och då jämför kunden sidor. Den som visar auktorisation, omdömen och riktiga bilder får samtalet.' },
      { fraga: 'Vad är Säker Vatten och ska det stå på sidan?', svar: 'Säker Vatten är branschens regelverk för VVS-installationer, och auktoriserade företag får utfärda intyg om Säker Vatteninstallation. Är ni auktoriserade ska det stå på första skärmen med länk till registret. Är ni inte det skriver vi inget om det, påhittade märkningar gör mer skada än nytta.' },
      { fraga: 'Ger VVS-arbete rotavdrag?', svar: 'Ja, arbetskostnaden för VVS-arbete i en bostad äldre än fem år ger rotavdrag: 30 procent, högst 50 000 kronor per person och år. Material ingår inte. Vi skriver det rätt på er sida med Skatteverket som källa.' },
      { fraga: 'Vad kostar en hemsida för en VVS-firma?', svar: 'Bygget har ett fast pris ex moms: 10 000, 13 000 eller 25 000 kronor beroende på paket. Underhåll och grundläggande SEO (500 kronor i månaden) och Google-ranking (2 470 kronor i månaden) är valfria tillägg, båda utan bindningstid. Ni får ett exakt pris i det kostnadsfria förslaget innan ni bestämmer er.' },
    ],
  },
  {
    slug: 'hemsida-for-byggfirma',
    yrke: 'byggfirma',
    namn: 'Byggfirma',
    title: 'Hemsida för byggfirma',
    beskrivning: 'Vad en byggfirmas hemsida måste klara: projekt som egna sidor, ROT och fast pris förklarat, offert i mobilen. Se en demo och få ett förslag inom 48 timmar.',
    h1: 'Hemsida för byggfirma',
    ingress: 'En hemsida för en byggfirma säljer ett stort beslut: någon ska släppa in er i sitt hus i veckor och betala sexsiffrigt. Sidan ska visa vad ni byggt, hur ni tar betalt och vad ROT gör med priset. Så här bygger Bahko Byrå den.',
    punkter: [
      { h: 'Projekten som egna sidor', p: 'Tillbyggnad, badrum, takbyte och totalrenovering är olika sökningar och olika kunder. Varje projekttyp får en egen sida med riktiga bilder, orten utskriven och vad som ingick.' },
      { h: 'ROT och pris i klartext', p: 'Rotavdraget är 30 procent av arbetskostnaden, högst 50 000 kronor per person och år, och gäller inte material. På ett stort projekt är skillnaden mellan rätt och fel besked tiotusentals kronor. Vi skriver det enligt Skatteverkets regler och förklarar hur ni offererar: fast pris, löpande eller en blandning.' },
      { h: 'Förtroende före pris', p: 'F-skatt, försäkring, referenser och omdömen från Google med namn och ort. Det kunden egentligen frågar är "vågar jag". Sidan ska svara ja innan priset kommer på tal.' },
      { h: 'Offert med bilder', p: 'Formuläret ska ta emot bilder och ritningar direkt från mobilen, så att ni kan ge ett vettigt första svar utan ett platsbesök.' },
    ],
    brodtext: [
      'Byggprojekt söks med ort och projekttyp: "byggfirma Nässjö tillbyggnad". Sidan ska nämna orterna ni jobbar i och projekttyperna ni gör, i rubriker och text. En kommunlista längst ned räknas inte.',
      'Före och efter är byggfirmans starkaste säljare. Ett förfallet hus som blir ett drömhus medan man bläddrar säger mer än någon text om kvalitet och kundfokus, och det går att visa utan att lova något ni inte kan hålla.',
      'Google-profilen ska stämma med sidan. Kategorin byggfirma, tjänsteområdet de orter ni faktiskt bygger i, bilder från riktiga projekt och omdömen med namn. En byggfirma med tjugo färska omdömen och tydliga projektbilder vinner platslistan före den med flest år i branschen. Vi sätter upp profilen rätt om den saknas och sköter den varje månad om ni vill, så att nya projekt och omdömen kommer upp löpande.',
    ],
    bevis: {
      typ: 'demo',
      namn: 'GRANIT Bygg',
      ort: 'Demo, bygg och totalrenovering',
      url: 'https://www.bahkobyra.se/cloud/bygg/',
      bild: '/img/portfolj/granit.jpg',
      text: 'GRANIT Bygg är en demo vi byggt för att visa hur en byggfirmas sida kan se ut: huset förvandlas medan man bläddrar, projekten ligger som egna sidor och offertknappen följer med. Ingen riktig kund står bakom den, det står utskrivet. Ert förslag byggs på samma sätt, med era projekt och er ort.',
    },
    fragor: [
      { fraga: 'Våra kunder kommer via rekommendationer. Behövs en sida?', svar: 'Rekommendationen ger er namnet, sidan ger er jobbet. Den som fått ert namn googlar er innan de ringer, och ett sexsiffrigt beslut tas inte på en Facebook-sida med tre bilder.' },
      { fraga: 'Hur mycket rotavdrag får kunden på ett byggprojekt?', svar: '30 procent av arbetskostnaden, högst 50 000 kronor per person och år, så två ägare kan få 100 000 kronor. Material, resor och maskinhyra ingår inte, och huset ska vara äldre än fem år. Vi skriver det rätt på er sida, med Skatteverket som källa.' },
      { fraga: 'Kan vi visa pågående projekt?', svar: 'Ja. Sidan byggs så att ni kan lägga upp ett projekt med några bilder och en rad text från mobilen, utan att något byggs om. Pågående projekt är det bästa beviset på att ni har jobb.' },
      { fraga: 'Vad kostar en hemsida för en byggfirma?', svar: 'Bygget har ett fast pris ex moms: 10 000, 13 000 eller 25 000 kronor beroende på paket. Underhåll och grundläggande SEO (500 kronor i månaden) och Google-ranking (2 470 kronor i månaden) är valfria tillägg, båda utan bindningstid. Ni får ett exakt pris i det kostnadsfria förslaget innan ni bestämmer er.' },
    ],
  },
  {
    slug: 'hemsida-for-restaurang',
    yrke: 'restaurang',
    namn: 'Restaurang',
    title: 'Hemsida för restaurang',
    beskrivning: 'Vad en restaurangs hemsida måste klara: menyn som text, rätt öppettider, bokning och vägbeskrivning direkt och en skött Google-profil. Förslag inom 48 timmar.',
    h1: 'Hemsida för restaurang',
    ingress: 'En restaurang hittas i Google Maps innan någon ser hemsidan. Sidan och Google-profilen ska därför säga samma sak: meny, öppettider, bokning och var ni ligger. Så här bygger Bahko Byrå den, och så här sköter vi profilen.',
    punkter: [
      { h: 'Menyn som text, inte bild', p: 'En meny som bara finns som bild eller PDF kan varken Google eller AI-tjänster läsa. Vi lägger menyn som riktig text på sidan, med priser och allergener, så att "lunch Huskvarna" kan leda till er rätt.' },
      { h: 'Google-profilen som sköts', p: 'De flesta gäster bestämmer sig i Google Maps: betyg, foton, öppettider och om det är öppet nu. Vi sköter profilen varje månad, svarar på omdömen och håller tiderna rätt, det är det som avgör platslistan.' },
      { h: 'Boka och hitta på första skärmen', p: 'Bokningslänk, ringknapp och vägbeskrivning ska ligga överst i mobilen. Gästen som letar efter numret i en meny längst ned har redan öppnat nästa restaurang.' },
      { h: 'Bilder på maten, inte på logotypen', p: 'Riktiga bilder på rätterna och lokalen, tagna i dagsljus, är det gästen scrollar efter. Vi lägger dem så att de syns utan att klicka.' },
    ],
    brodtext: [
      'Restauranger söks "nära mig" och med ett behov: lunch, buffé, fest, catering. Sidan ska ha en egen del för varje sådant behov, med menyn som text, så att den kan hittas på just den sökningen.',
      'Öppettiderna är den vanligaste orsaken till en missnöjd gäst som aldrig kom in. Sidan och Google-profilen ska uppdateras samtidigt, och det är ett jobb vi tar på oss varje månad så att ni slipper.',
      'Vad kostar det att bli hittad? Hemsidan har ett fast pris i tre paket, och Google-profilen kan skötas som ett valfritt tillägg med ett pris i månaden, utan bindningstid. Det ni får är att meny, tider och bilder stämmer överallt, att varje omdöme får ett svar och att ni ligger där gästen letar när hungern slår till. Priset står i det kostnadsfria förslaget, och ni ser förslaget innan ni bestämmer er.',
    ],
    bevis: {
      typ: 'google',
      namn: 'Matboden i Huskvarna',
      ort: 'Huskvarna',
      url: '',
      bild: '',
      text: 'Matboden i Huskvarna är en restaurang vars Google-profil Bahko Byrå sköter. Den 23 oktober 2026 låg Matboden etta i Googles platslista på sökningen "buffé i Huskvarna", före övriga restauranger i stan. Hemsidan är inte vår, men det är profilen som avgör platslistan, och det är den vi sköter varje månad.',
    },
    fragor: [
      { fraga: 'Räcker inte Google Maps och Instagram?', svar: 'Google Maps är där gästen hittar er, men profilen länkar vidare till en sida, och saknas den eller visar den fel tider tappar ni gästen där. Instagram når de som redan följer er. Sidan är det som fångar den som söker "lunch" i er stad för första gången.' },
      { fraga: 'Kan ni sköta vår Google-profil?', svar: 'Ja, det är en månadstjänst: öppettider, foton, inlägg, svar på omdömen och kontroll av att kategorin och området stämmer. Det är så Matboden i Huskvarna ligger etta på "buffé i Huskvarna".' },
      { fraga: 'Vi byter meny ofta. Blir det dyrt?', svar: 'Nej. Menyn ligger som text som ni eller vi byter på några minuter. Det ingår i underhållet, inga projekt för en ny lunchmeny.' },
      { fraga: 'Vad kostar en hemsida för en restaurang?', svar: 'Bygget har ett fast pris ex moms: 10 000, 13 000 eller 25 000 kronor beroende på paket. Underhåll och grundläggande SEO (500 kronor i månaden) och Google-ranking (2 470 kronor i månaden) är valfria tillägg, båda utan bindningstid. Ni får ett exakt pris i det kostnadsfria förslaget innan ni bestämmer er.' },
    ],
  },
  {
    slug: 'hemsida-for-e-handel',
    yrke: 'e-handel',
    namn: 'E-handel',
    title: 'Hemsida för e-handel med en produkt',
    beskrivning: 'En säljsida för en produkt i stället för en webbutik med hundra: produkten i 3D, köpknapp på varje skärm och ångerrätt rätt. Förslag inom 48 timmar.',
    h1: 'Hemsida för e-handel',
    ingress: 'Säljer ni en produkt, eller några få, behöver ni ingen webbutik med kategorier och filter. Ni behöver en säljsida som gör en sak: få besökaren att trycka på köp. Så här bygger Bahko Byrå den, med en riktig leverans ni kan klicka in i.',
    punkter: [
      { h: 'Produkten som huvudperson', p: 'Namnet stort, produkten framför i 3D som vrider sig när man bläddrar, och en köpknapp på varje skärm. Inte en butik att leta i, en sida att bestämma sig på.' },
      { h: 'Köpknapp i er egen röst', p: 'Knapparna säger vad kunden får, inte "lägg i varukorg". Länken går till den butik eller återförsäljare ni redan säljer genom, så ni slipper lager, betalväxel och frakt på sidan.' },
      { h: 'Villkor och ångerrätt rätt', p: 'Vid köp på distans har kunden 14 dagars ångerrätt enligt distansavtalslagen, och säljaren ska informera om den innan köpet. Vi skriver villkoren rätt och länkar till Konsumentverket, det är ett förtroendeargument.' },
      { h: 'Innehåll som leder tillbaka till köpet', p: 'Recept, guider eller bakgrund till produkten ger sökträffar, och varje sådan sida leder tillbaka till köpknappen. Det är så en säljsida får trafik utan annonser.' },
    ],
    brodtext: [
      'En produkt säljs på känsla och en tydlig väg till köp. Besökaren ska förstå vad det är på första skärmen, se den på nära håll och kunna köpa utan att leta. Varje extra steg tappar en del av dem som var på väg.',
      'Sökningarna är ofta frågor: "vegansk kokbok", "köp kokbok online". Innehållssidor som svarar på de frågorna, med produkten synlig intill, ger både träffar och köp. Sidan byggs så att ni kan lägga till sådant innehåll själva.',
      'Sidan ska också gå att hitta. Produktens namn, upphovspersonen och de frågor köparen ställer ska stå som riktig text, inte bara som bilder, så att Google och AI-tjänster kan läsa den. Vi skriver titlar och beskrivningar så att sidan svarar på frågan först, och lägger upp en enkel mätning så att ni ser var köparna kommer ifrån. Det är skillnaden mellan en snygg sida och en sida som säljer.',
    ],
    bevis: {
      typ: 'kund',
      namn: 'Mayka\'s Kitchen',
      ort: 'Kokboken Maykas gröna kök',
      url: 'https://maykaskitchen.se/',
      bild: '/img/portfolj/maykaskitchen.jpg',
      text: 'Mayka Gulo fick en säljsida för kokboken Maykas gröna kök: boken i 3D som vrider sig när man bläddrar, namnet stort i bokens egna färger, köpknapp på varje skärm som leder till återförsäljaren och recept som leder tillbaka till boken. Sidan är i drift. Klicka in och syna den, det är så här ett förslag till er skulle se ut i verkligheten.',
    },
    fragor: [
      { fraga: 'Vi säljer redan via en återförsäljare. Varför en egen sida?', svar: 'För att äga sökningen på ert eget namn och kunna berätta om produkten på ert sätt. Återförsäljaren visar er bredvid hundra andra. Er sida visar bara er, och skickar köparen vidare till återförsäljaren när beslutet är taget.' },
      { fraga: 'Behöver vi varukorg och betalning på sidan?', svar: 'Inte om ni redan säljer genom en butik eller återförsäljare, då länkar köpknappen dit. Vill ni sälja direkt kopplar vi en betalning som Stripe eller Klarna, och då skriver vi också villkor, ångerrätt och leveransinformation enligt distansavtalslagen.' },
      { fraga: 'Vad gäller med ångerrätt på nätet?', svar: 'Kunden har 14 dagars ångerrätt vid köp på distans enligt distansavtalslagen, och ni måste informera om den före köpet. Informerar ni inte förlängs fristen. Vissa varor är undantagna, till exempel livsmedel som snabbt blir dåliga. Vi skriver villkoren rätt och länkar till Konsumentverket.' },
      { fraga: 'Vad kostar en säljsida?', svar: 'Bygget har ett fast pris ex moms: 10 000, 13 000 eller 25 000 kronor beroende på paket. Underhåll och grundläggande SEO (500 kronor i månaden) och Google-ranking (2 470 kronor i månaden) är valfria tillägg, båda utan bindningstid. Ni får ett exakt pris i det kostnadsfria förslaget innan ni bestämmer er.' },
    ],
  },
];
