/** Innehållskälla för tjänstesidorna och FAQ. En plats att ändra på. */

export const TJANSTER = [
  {
    slug: 'hemsidor',
    namn: 'Hemsidor',
    tagg: 'Design · Bygg',
    kort: 'Hemsidor som gör att fler hör av sig, inte bara ser snyggare ut.',
    rubrik: 'Hemsidor som ger fler jobb',
    ingress:
      'Det vi är bäst på. Ni får ett färdigt förslag på er nya hemsida inom 48 timmar och ser exakt hur den blir innan ni bestämmer er.',
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
    ingress:
      'Har ni återkommande kunder, avtal eller bokningar som sköts i telefonen kan en app spara timmar varje vecka. Vi bygger bara när det faktiskt lönar sig.',
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
    ingress:
      'Kort video till sociala medier och YouTube. Före och efter, ert arbete på nära håll, ansiktet bakom företaget.',
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
      'Det beror på hur mycket ni behöver. Ni får ett fast pris svart på vitt i förslaget, och förslaget är kostnadsfritt.',
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
      'Där betalar ni för förfrågan och delar den med flera firmor, ofta på pris. Från er egen hemsida kommer den bara till er. En del kör båda en tid.',
  },
  {
    fraga: 'Hur snabbt kan den vara klar?',
    svar:
      'Förslaget tar två dygn. Säger ni ja är sidan normalt ute inom en vecka. Det som brukar ta tid är att få in bilder, så ju snabbare ni skickar dem desto snabbare går det.',
  },
  {
    fraga: 'Måste jag kunna något tekniskt?',
    svar:
      'Nej. Vi sköter domän, publicering och texterna. Ni berättar om firman och skickar bilder från jobb ni gjort.',
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
