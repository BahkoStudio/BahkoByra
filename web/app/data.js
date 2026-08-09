/** Innehållskälla för tjänstesidorna och FAQ. En plats att ändra på. */

export const TJANSTER = [
  {
    slug: 'hemsidor',
    namn: 'Hemsidor',
    tagg: 'Design · Bygg',
    kort: 'Hemsidor som gör att fler hör av sig, inte bara ser snyggare ut.',
    rubrik: 'Hemsidor som ger fler jobb',
    ingress:
      'Front offer och det vi är bäst på. Du får ett färdigt förslag på din nya sida inom 48 timmar och ser exakt hur den blir innan du bestämmer dig.',
    // De tio granskningspunkterna, ordagrant desamma som pa gratis-granskning.html
    // sa att sidorna sager samma sak. Beslutat av Mathias 2026-08-09.
    punkter: [
      {
        h: 'Mobilanpassning',
        p: 'De flesta lokala sökningar sker på telefon. Fungerar er sajt perfekt på mobil?',
      },
      {
        h: 'Laddningshastighet',
        p: 'Varje extra sekund tappas 7% av besökarna. Hur snabbt laddar er sida?',
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
        p: 'Certifikat, betyg och riktiga bilder på ert arbete — syns de tydligt? Förtroende avgör valet.',
      },
      {
        h: 'Sociala bevis',
        p: 'Recensioner, genomförda uppdrag, nöjda kunder — visas det på er sajt?',
      },
      {
        h: 'SEO-grundstruktur',
        p: 'Titlar, meta-beskrivningar och URL-struktur — är de optimerade för Google?',
      },
      {
        h: 'Prissättning & erbjudanden',
        p: 'Är priser lätta att hitta? Otydlig prissättning skrämmer bort 43% av besökarna.',
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
    kort: 'Synas när någon i din stad söker efter det du gör.',
    rubrik: 'Synas när kunden söker',
    ingress:
      'Svenskar söker "takläggare Örebro", inte "takläggning". Lokal SEO handlar om att finnas där, med rätt uppgifter, när någon i närheten behöver dig.',
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
    kort: 'Betald annonsering som visas exakt när dina kunder söker.',
    rubrik: 'Annonser när behovet finns',
    ingress:
      'SEO tar tid. Annonser ger utrymme direkt, för de sökningar där någon redan letar efter det du säljer.',
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
      'Kort video till sociala medier och YouTube. Före och efter, hantverket på nära håll, ansiktet bakom firman.',
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
      'Fast engångspris utan månadsavgifter eller bindningstid. Du får exakt pris i det kostnadsfria förslaget, innan du bestämmer dig. Vi tar aldrig betalt för att visa dig hur sidan skulle kunna se ut.',
  },
  {
    fraga: 'Hur snabbt kan den vara klar?',
    svar:
      'Du får ett färdigt förslag inom 48 timmar. Säger du ja är sidan normalt live inom sju dagar, på din egen domän. Det som brukar ta tid är att få in bilder och texter, så ju snabbare du skickar dem desto snabbare går det.',
  },
  {
    fraga: 'Måste jag kunna något tekniskt?',
    svar:
      'Nej. Bahko Byrå sköter domän, publicering, texter och bilder. Du berättar om din verksamhet och skickar bilder från jobb ni gjort, vi gör resten.',
  },
  {
    fraga: 'Vad händer efter lanseringen?',
    svar:
      'Hemsidan är din. Ni äger sidan och domänen. Vill ni växa vidare hjälper vi till med synlighet på Google, omdömen och löpande förbättringar, men det är helt valfritt och inget abonnemang som rullar på i bakgrunden.',
  },
  {
    fraga: 'Jag har redan en hemsida, är det lönt att byta?',
    svar:
      'Beror på. Hittar kunderna telefonnumret direkt i mobilen, förstår de inom fem sekunder vad ni gör och var, och finns det ett enkelt sätt att begära offert? Är svaret ja på allt behöver ni oss inte. Är svaret nej på något är det oftast där jobben läcker.',
  },
  {
    fraga: 'Vilka jobbar ni med?',
    svar:
      'Bygg och hantverk i Sverige. Måleri, tak, mark, bygg, trädgård, VVS. Vi kan branschens säljmönster, vad kunderna söker på och vad de vill se innan de ringer.',
  },
];
