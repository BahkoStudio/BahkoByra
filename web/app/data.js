/** Innehållskälla för tjänstesidorna och FAQ. En plats att ändra på. */

export const TJANSTER = [
  {
    slug: 'hemsidor',
    namn: 'Hemsidor',
    tagg: 'Design · Bygg',
    kort: 'Hemsidor som gör att fler hör av sig, inte bara ser snyggare ut.',
    rubrik: 'Hemsidor som ger fler jobb',
    // SEO/AEO-briefen 2026-10-20: tjänsten och sökordet först, sloganen som underrubrik.
    title: 'Hemsida för hantverkare, fast pris från 10 000 kr',
    h1: 'Hemsida för hantverkare till fast pris',
    slogan: 'Hemsidor som ger fler jobb',
    ingress:
      'Hos Bahko Byrå i Huskvarna och Jönköping köper ni en hemsida för ert hantverks- eller lokala företag till fast pris: tre paket från 10 000 kr ex moms. Innan ni bestämmer er får ni ett färdigt förslag på er nya hemsida, kostnadsfritt och inom 48 timmar, så att ni ser exakt hur den blir.',
    meta:
      'Köp en hemsida för hantverkare och lokala företag. Tre paket med fast pris från 10 000 kr ex moms. Kostnadsfritt färdigt förslag inom 48 timmar.',
    // Paketen, Mathias text 2026-10-20 (lätt putsad). Alla belopp ex moms.
    paket: [
      {
        namn: 'Basic',
        pris: '10 000 kr',
        kort: 'En snygg och tydlig hemsida.',
        ingar: ['Fungerar i mobilen, med ringknapp och kontaktformulär', 'Era bilder och er logga', 'Er egen domän, ni äger sidan'],
      },
      {
        namn: 'Standard',
        pris: '13 000 kr',
        kort: 'Hemsidan som ska hittas på Google.',
        markerad: true,
        ingar: ['Allt i Basic', 'Egna landningssidor för varje tjänst, så många som behövs', 'Automatiserade mejl som svarar kunden direkt', 'Optimerad för att ranka på Google'],
      },
      {
        namn: 'Premium',
        pris: '25 000 kr',
        kort: 'Allt i Standard, plus att vi sköter Google.',
        ingar: ['Allt i Standard', 'Ranking på Google och optimering av Google-profilen', 'Garanti: Googles första sida', 'Ingår i 3 månader, även underhåll och grundläggande SEO'],
      },
    ],
    tillagg: [
      { namn: 'Underhåll och grundläggande SEO', pris: '500 kr i månaden', not: 'Ingår i Premium i 3 månader.' },
      { namn: 'Ranking på Google och optimering av Google-profilen, garanterat första sidan', pris: '2 470 kr i månaden', not: 'Ingår i Premium i 3 månader.' },
    ],
    fragor: [
      {
        fraga: 'Vad kostar det att köpa en hemsida hos er?',
        svar:
          'Tre paket med fast pris: Basic 10 000 kr, Standard 13 000 kr och Premium 25 000 kr, alla ex moms. Underhåll och grundläggande SEO (500 kr i månaden) och ranking på Google (2 470 kr i månaden) finns som tillägg, och ingår i Premium de första 3 månaderna.',
      },
      {
        fraga: 'Hur snabbt kan jag se hur min hemsida blir?',
        svar: 'Ni får ett färdigt förslag inom 48 timmar, kostnadsfritt och utan förpliktelse.',
      },
      {
        fraga: 'Gör ni hemsidor för hantverkare?',
        svar:
          'Ja, hantverkare och lokala företag är vår huvudsakliga målgrupp. Hemsidan byggs för att ge fler förfrågningar och jobb.',
      },
    ],
    schema: { typ: 'Webbdesign', namn: 'Hemsida för hantverkare och lokala företag' },
    // De tio granskningspunkterna, ordagrant desamma som pa gratis-granskning.html
    // sa att sidorna sager samma sak. Beslutat av Mathias 2026-08-09.
    punkter: [
      {
        h: 'Mobilanpassning',
        p: 'De flesta lokala sökningar sker på telefon. Fungerar er sajt perfekt på mobil?',
      },
      {
        h: 'Laddningshastighet',
        p: 'En sida som laddar långsamt tappar besökare innan de ser numret. Hur snabbt laddar er?',
      },
      {
        h: 'Lokal SEO & Google Maps',
        p: 'Syns ni när folk söker "[tjänst] [stad]"? Är er Google Företagsprofil komplett?',
      },
      {
        h: 'Boknings- & kontaktflöde',
        p: 'Hur många klick krävs för att boka eller begära offert? Varje extra steg kostar kunder.',
      },
      {
        h: 'Trustsignaler',
        p: 'Certifikat, betyg och riktiga bilder på ert arbete. Syns de tydligt? Förtroende avgör valet.',
      },
      {
        h: 'Sociala bevis',
        p: 'Recensioner, genomförda uppdrag, nöjda kunder. Visas det på er sajt?',
      },
      {
        h: 'SEO-grundstruktur',
        p: 'Titlar, meta-beskrivningar och URL-struktur. Är de optimerade för Google?',
      },
      {
        h: 'Prissättning & erbjudanden',
        p: 'Är priserna lätta att förstå? Otydliga priser får kunden att ringa någon annan.',
      },
      {
        h: 'Design & varumärke',
        p: 'Speglar designen det ert företag faktiskt erbjuder? Professionellt = förtroende.',
      },
      {
        h: 'Konverteringspotential',
        p: 'Är CTA-knappar tydliga? Fångar ni leads som inte bokar direkt?',
      },
    ],
    // Interna länkar till nischsidorna och prisguiden, renderas bara när fältet finns.
    relaterat: [
      { href: '/hemsida-for-malerifirma/', namn: 'Hemsida för målerifirma', kort: 'ROT rätt, era jobb som bevis och offert i mobilen.' },
      { href: '/hemsida-for-tradgardsfirma/', namn: 'Hemsida för trädgårdsfirma', kort: 'RUT per tjänst, egna tjänstesidor och ringknapp överallt.' },
      { href: '/hemsida-for-snickare/', namn: 'Hemsida för snickare', kort: 'ROT 2026 rätt, jobben sorterade som kunden söker.' },
      { href: '/hemsida-for-elektriker/', namn: 'Hemsida för elektriker', kort: 'Registreringen hos Elsäkerhetsverket synlig, akutnummer överst.' },
      { href: '/hemsida-for-rormokare/', namn: 'Hemsida för rörmokare', kort: 'Akutnumret först, Säker Vatten synligt, ROT rätt.' },
      { href: '/hemsida-for-byggfirma/', namn: 'Hemsida för byggfirma', kort: 'Projekten som egna sidor, ROT och fast pris i klartext.' },
      { href: '/hemsida-for-restaurang/', namn: 'Hemsida för restaurang', kort: 'Menyn som text, Google-profilen skött, bokning överst.' },
      { href: '/hemsida-for-e-handel/', namn: 'Hemsida för e-handel', kort: 'En produkt, köpknapp på varje skärm, ångerrätt rätt.' },
      { href: '/vad-kostar-en-hemsida/', namn: 'Vad kostar en hemsida?', kort: 'Ärligt svar på vad som avgör priset, och fällorna att undvika.' },
    ],
  },
  {
    slug: 'seo',
    namn: 'SEO',
    tagg: 'Lokal · Teknisk',
    kort: 'Synas när någon i er stad söker efter det ni gör.',
    rubrik: 'Synas när kunden söker',
    ingress:
      'Svenskar söker "målare Jönköping", inte "målning". Lokal SEO handlar om att finnas där, med rätt uppgifter, när någon i närheten behöver er.',
    punkter: [
      {
        h: 'Google Företagsprofil',
        p: 'Primärkategorin är den enskilt viktigaste inställningen. Komplett profil med riktiga foton, öppettider och tjänsteområden.',
      },
      {
        h: 'Omdömen på rätt ställe',
        p: 'Omdömen på offertplattformar syns inte i Google. Vi flyttar rutinen dit stjärnorna faktiskt visas.',
      },
      {
        h: 'Sidor per tjänst och ort',
        p: 'Egna sidor för de tjänster och orter där ni faktiskt jobbar, inte instansade ortslistor.',
      },
      {
        h: 'Teknisk grund',
        p: 'Indexering, laddtid, struktur och schema. Det som gör att sidan alls kan ranka.',
      },
    ],
    process: ['Granskning av nuläget', 'Åtgärder i prioritetsordning', 'Uppföljning mot baslinje'],
  },
  {
    slug: 'google-ads',
    namn: 'Google Ads',
    tagg: 'SEM · PPC',
    kort: 'Betald annonsering som visas exakt när era kunder söker.',
    rubrik: 'Annonser när behovet finns',
    ingress:
      'SEO tar tid. Annonser ger utrymme direkt, för de sökningar där någon redan letar efter det ni säljer.',
    punkter: [
      { h: 'Rätt sökord', p: 'Vi annonserar på köpsignaler, inte på nyfikenhet.' },
      { h: 'Geografisk styrning', p: 'Bara i det område ni faktiskt åker ut till.' },
      { h: 'Landningssida som matchar', p: 'Annonsen och sidan säger samma sak. Annars betalar ni för klick som studsar.' },
      { h: 'Mätning från dag ett', p: 'Vi sätter upp spårning innan första kronan går ut.' },
    ],
    process: ['Sökordsanalys', 'Konto och kampanjer', 'Löpande optimering'],
  },
  {
    slug: 'appar',
    namn: 'Appar',
    tagg: 'iOS · Android',
    kort: 'Bokningsappar och kundportaler när sidan inte räcker.',
    rubrik: 'När en sida inte räcker',
    title: 'App till företag, byggd för hantverkare',
    h1: 'App till företag, när en hemsida inte räcker',
    ingress:
      'Bahko Byrå i Huskvarna bygger appar till företag, främst hantverkare och lokala företag med återkommande kunder, serviceavtal eller bokningar som i dag sköts per telefon. En egen app kan låta kunderna boka, se sina avtal och få påminnelser själva. Vi börjar alltid med att räkna på om en app faktiskt lönar sig för er, och avråder om en bra hemsida räcker.',
    meta:
      'Egen app till företaget för bokningar, avtal och återkommande kunder. Vi i Huskvarna och Jönköping bygger bara när det lönar sig. Fråga oss om er idé.',
    fragor: [
      {
        fraga: 'Behöver mitt företag en app eller räcker en hemsida?',
        svar:
          'För de flesta lokala företag räcker en bra hemsida. En app lönar sig när ni har återkommande kunder, avtal eller bokningar som tar tid att hantera manuellt. Vi hjälper er att bedöma det innan något byggs.',
      },
      {
        fraga: 'Vad kan en app för hantverkare göra?',
        svar:
          'Till exempel låta kunder boka tid, se serviceavtal, få påminnelser och skicka bilder på jobbet. Allt det som annars blir telefonsamtal och sms.',
      },
      {
        fraga: 'Vad kostar en app till företag?',
        svar: 'Det beror på vad appen ska göra. Vi ger ett besked efter ett första samtal.',
      },
    ],
    schema: { typ: 'Apputveckling', namn: 'App till företag' },
    punkter: [
      { h: 'Bokning och avtal', p: 'Kunden bokar, ni ser allt i en vy.' },
      { h: 'Kundportal', p: 'Historik, dokument och nästa besök på ett ställe.' },
      { h: 'Fungerar i mobilen först', p: 'Byggd för att användas i bilen och på bygget.' },
    ],
    process: ['Genomgång av flödet', 'Prototyp', 'Bygge och lansering'],
  },
  {
    slug: 'reklamfilmer',
    namn: 'Reklamfilmer',
    tagg: 'Video · UGC',
    kort: 'Rörligt som stannar i minnet och funkar i flödet.',
    rubrik: 'Film som stoppar tummen',
    title: 'Reklamfilm för hantverkare och lokala företag',
    h1: 'Reklamfilm för hantverkare och lokala företag',
    slogan: 'Film som stoppar tummen',
    ingress:
      'Bahko Byrå i Huskvarna och Jönköping gör reklamfilm för hantverkare och lokala företag: korta videor för sociala medier och YouTube. Vi filmar före och efter, ert arbete på nära håll och människorna bakom företaget, så att tittaren stannar upp och förstår vad ni gör.',
    meta:
      'Reklamfilm för hantverkare och lokala företag: korta videor till sociala medier och YouTube. Före och efter, ert arbete på nära håll. Hör av er.',
    fragor: [
      {
        fraga: 'Vilken sorts reklamfilm passar en hantverkare?',
        svar:
          'Korta filmer som visar före och efter, arbetet på nära håll och ansiktet bakom företaget fungerar bra i sociala medier.',
      },
      {
        fraga: 'Var kan filmerna användas?',
        svar: 'I sociala medier, på YouTube, på er hemsida och i annonser.',
      },
      {
        fraga: 'Kan ni även köra annonser med filmen?',
        svar: 'Ja, vi gör också annonser på Google, se vår tjänst Google Ads.',
      },
    ],
    schema: { typ: 'Reklamfilm och videoproduktion', namn: 'Reklamfilm för hantverkare' },
    punkter: [
      { h: 'Före och efter', p: 'Den starkaste sortens bevis ni kan visa.' },
      { h: 'Format för flödet', p: 'Vertikalt, textat, begripligt utan ljud.' },
      { h: 'Återanvänds på sidan', p: 'Samma material lyfter hemsidan och Google-profilen.' },
    ],
    process: ['Idé och manus', 'Inspelning', 'Klipp och leverans'],
  },
];

export const FRAGOR = [
  {
    fraga: 'Vad kostar en ny hemsida?',
    svar:
      'Tre paket med fast pris: Basic 10 000 kr, Standard 13 000 kr och Premium 25 000 kr, alla ex moms. Ni får ett färdigt förslag kostnadsfritt innan ni väljer.',
  },
  {
    fraga: 'Sitter vi fast i ett avtal?',
    svar:
      'Nej. Ingen bindningstid. Vill ni gå vidare någon gång tar ni med er allt, sida som domän.',
  },
  {
    fraga: 'Hur vet jag att ni inte är en säljare till?',
    svar:
      'En säljare vill ofta ha er underskrift innan ni sett något. Hos oss ser ni förslaget färdigt först.',
  },
  {
    fraga: 'Hur vet jag att det ger fler förfrågningar?',
    svar:
      'Ingen kan lova en plats på Google. Men titta på Bromma. Etta i platslistan och först i ChatGPT den 30 juli. Ett 30-tal förfrågningar via sidan på två månader.',
  },
  {
    fraga: 'Är det inte enklare att köpa förfrågningar från en offertsajt?',
    svar:
      'Där betalar ni för förfrågan och delar den med flera företag, ofta på pris. Från er egen hemsida kommer den bara till er. En del kör båda en tid.',
  },
  {
    fraga: 'Hur snabbt kan den vara klar?',
    svar:
      'Förslaget tar två dygn. Säger ni ja är sidan normalt ute inom en vecka. Det som brukar ta tid är att få in bilder, så ju snabbare ni skickar dem desto snabbare går det.',
  },
  {
    fraga: 'Måste jag kunna något tekniskt?',
    svar:
      'Nej. Vi sköter domän, publicering och texterna. Ni berättar om företaget och skickar bilder från jobb ni gjort.',
  },
  {
    fraga: 'Jag har redan en hemsida, är det lönt att byta?',
    svar:
      'Ta fram mobilen och testa. Hittar man telefonnumret direkt, och förstår man på en gång vad ni gör och var? Är svaret nej är det oftast där jobben läcker.',
  },
  {
    fraga: 'Vad händer efter lanseringen?',
    svar:
      'Vill ni växa vidare hjälper vi till med synlighet på Google och omdömen. Det är valfritt och rullar inte på i bakgrunden.',
  },
  {
    fraga: 'Vilka jobbar ni med?',
    svar:
      'Lokala företag som vill ha fler kunder från sin egen stad. Ute i dag: måleri, trädgård och en säljsida för en kokbok. Demos finns för bygg och VVS.',
  },
];
