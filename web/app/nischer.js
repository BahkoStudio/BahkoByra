/**
 * Innehållskälla för nischsidorna: en sida per hantverksyrke, men bara där
 * en riktig, namngiven kund finns som bevis. Ny nisch = ny post här + en
 * tunn page.js under /hemsida-for-<yrke>/. Ingen byggsida förrän en
 * byggkund finns, regeln kommer ur SEO-planen 2026-08-08.
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
      'Vad en målerifirmas hemsida måste klara: ROT förklarat rätt, era jobb som bevis och offert i mobilen. Se en riktig leverans och få ett eget förslag inom 48 timmar.',
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
          'Ni får ett exakt fast pris i det kostnadsfria förslaget, innan ni bestämmer er. Engångspris, inga månadsavgifter, ingen bindningstid. Vad som avgör priset förklarar vi öppet på sidan om vad en hemsida kostar.',
      },
    ],
  },
  {
    slug: 'hemsida-for-tradgardsfirma',
    yrke: 'trädgårdsfirma',
    namn: 'Trädgård',
    title: 'Hemsida för trädgårdsfirma',
    beskrivning:
      'Vad en trädgårdsfirmas hemsida måste klara: RUT utskrivet per tjänst, egna sidor per tjänst och ringknapp på varje skärm. Se en riktig leverans och få ett förslag inom 48 timmar.',
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
      text: 'Bromma Trädgårdsservice i västra Stockholm fick en sida med telefonnumret synligt på varje skärm, egna sidor för häckklippning, trädgårdsskötsel och skötsel för bostadsrättsföreningar, och RUT-beskedet utskrivet per tjänst. Sidan är i drift och tar emot förfrågningar varje vecka.',
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
          'Ni får ett exakt fast pris i det kostnadsfria förslaget, innan ni bestämmer er. Engångspris, inga månadsavgifter, ingen bindningstid. Vad som avgör priset förklarar vi öppet på sidan om vad en hemsida kostar.',
      },
    ],
  },
];
