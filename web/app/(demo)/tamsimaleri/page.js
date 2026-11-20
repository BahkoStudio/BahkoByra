import DemoSida from '../_mall/DemoSida';

/* ===========================================================================
   TAMSI MÅLERI AB · kostnadsfritt hemsideförslag från Bahko Byrå (2026-11-20)
   Lead från Mathias: tamsimaleri.se + instagram.com/tamsimaleri. HAR hemsida.
   Mathias: "lägg med hans samarbeten, de som är Reco och sånt".

   Bärande idé: tredje generationen målare som ger fast pris efter ett hembesök,
   innan något målas. Det är deras egen mening ("Du vet vad jobbet kostar innan vi
   börjar") och det kunderna skriver på Reco ("till överenskommen kostnad").

   VERIFIERAT (tamsimaleri.se: start, /om-oss, /tjanster, /priser, /kontakt, hämtat 2026-11-20):
   - Tamsi Måleri AB, org.nr 556772-4504, F-skatt. Römora 30, 153 95 Järna.
     Verksamhetsansvarig Robin Tamsi, 073-804 35 88, robin@tamsi.se.
   - "Familjeföretag i tredje generationen", "arbetat med måleri sedan 2008" (loggan: ETABL. 2008),
     "i dag med Robin Tamsi i spetsen och åtta anställda", plus inhyrda egenföretagare.
     "Far & son driver familjeföretaget vidare i Gnesta och Södertälje."
   - Tjänster: invändig målning, fasadmålning (trä, puts, plåt), tapetsering, lackering
     (köksluckor, dörrar, garderober), fönsterrenovering, våtrumsmålning, trapphus för BRF,
     mikrocement, rådgivning och färgsättning. Privatpersoner, BRF och företag.
   - Kostnadsfritt hembesök, skriftlig offert med fast pris, ROT-avdraget dras på fakturan
     och de sköter ansökan. "Vi ger alltid svar inom 24 timmar."
   - Område: Stockholm och Södermanland, "från Täby i norr till Nyköping i söder" (20 ortssidor).
   - Priser (/priser, inkl. moms): lackering lådfront 180 kr, normalstor lucka 360 kr, stor lucka
     540 kr, innerdörr 1 126 kr. Fasad: riktmärke 250–600 kr/kvm före ROT, fast pris efter hembesök.
   - Fasad ingår: tvätt, skrapning, grundning av bart trä, två strykningar, täckning, städning,
     slutgenomgång.
   - Utmärkelser, kundens egna filer på tamsimaleri.se: DI Gasell 2024 och 2025, UC Högsta
     kreditvärdighet (2025-12-27), Länets företagare 2023 (Sveriges Företag, Stockholms län),
     UC Nordiskt tillväxtcertifikat (2023-12-01).
   - Reco (reco.se/tamsi-maleri-ab, hämtat 2026-11-20): 4,7 av 5, 115 omdömen, trovärdighet
     "Mycket Bra". Märken på profilen: Rekommenderat företag 2019, 2021, 2022, 2024, 2025, 2026
     och "3 år i rad". Omdömena nedan ordagrant med datum och reco.se/r/<id>; stjärnorna lästa ur
     Recos sida. Ett omdöme med 1 stjärna (2026-09-09) visas inte som kort men räknas i snittet.
   - Instagram @tamsimaleri (1 262 följare 2026-11-20). Inläggen: Deg2WhOjhkQ (fasadmålning i
     Strängnäs), DddcVLZujEB (jobb i gång), Dc-tuddO685 (gula villan i Järna).
     Facebook: facebook.com/tamsimaleri (länkad från deras sajt).
   - Alla foton i tjänstekorten och banden är deras egna, från galleriet på tamsimaleri.se.

   INTE verifierat, och står därför inte på sidan: garantier, försäkring, ledtider, antal jobb,
   Google-betyg, vilka färgmärken de använder, medlemskap i branschorganisation.

   FLAGGOR
   - Hero-filmen är GENERERAD (Wan 3.0 Prime): deras eget foto av den gula villan är slutbilden,
     startbilden (flagnande färg) är en redigering av samma foto (GPT Image 2.5). Huset är deras
     jobb, förfallet är påhittat. Ingen not på sidan (Mathias regel 2026-09-19). Säg det till Robin.
   - Logotypen är OMRITAD ur deras 276 px breda fil (GPT Image 2.5), eftersom originalet blev
     suddigt i stor storlek. Monogrammets seriffer skiljer sig något. Be Robin om originalfilen.
   - 3D-märkena på tjänstekorten är genererade (GPT Image 2.5).
   - Varför-filmen är en långsam inzoomning över deras egen bild av huset med skylten och bilen.
   - Länets företagare-märket är bara 150 px i original och blir mjukt. Be om en skarp fil.
   - Reco-profilens "3 år i rad" och årsmärkena är Recos egna SVG-filer.
   - Formuläret går till mathias@bahkobyra.se (demonyckeln). Riktiga kontaktuppgifter på sidan:
     noindex, visas inte publikt.
   =========================================================================== */

const TITEL = 'Tamsi Måleri AB | Målare i Stockholm och Södermanland';
const BESKRIVNING =
  'Familjeföretag i tredje generationen. Invändig målning, fasadmålning, tapetsering och lackering. Kostnadsfritt hembesök och fast pris. 4,7 av 5 på Reco. Förslag på hemsida från Bahko Byrå.';

export const metadata = {
  title: TITEL,
  description: BESKRIVNING,
  robots: { index: false, follow: false },
  openGraph: {
    title: TITEL,
    description: 'Målare i tredje generationen. Kostnadsfritt hembesök och fast pris innan vi börjar.',
    siteName: 'Tamsi Måleri AB',
    locale: 'sv_SE',
    type: 'website',
    images: [{ url: '/tamsimaleri/media/poster-varfor.jpg', width: 1280, height: 720, alt: 'Tamsi Måleri AB' }],
  },
};

const M = '/tamsimaleri/media';
const RECO = 'https://www.reco.se/tamsi-maleri-ab';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'HousePainter',
  name: 'Tamsi Måleri AB',
  legalName: 'Tamsi Måleri AB',
  logo: `https://www.bahkobyra.se${M}/logo-tamsi.png`,
  image: `https://www.bahkobyra.se${M}/poster-varfor.jpg`,
  url: 'https://tamsimaleri.se/',
  telephone: '+46738043588',
  email: 'robin@tamsi.se',
  taxID: '556772-4504',
  foundingDate: '2008',
  address: { '@type': 'PostalAddress', streetAddress: 'Römora 30', postalCode: '153 95', addressLocality: 'Järna', addressCountry: 'SE' },
  areaServed: ['Stockholm', 'Södertälje', 'Gnesta', 'Nykvarn', 'Trosa', 'Strängnäs', 'Nyköping', 'Eskilstuna'].map((n) => ({ '@type': 'City', name: n })),
  sameAs: ['https://www.instagram.com/tamsimaleri/', 'https://www.facebook.com/tamsimaleri', RECO, 'https://tamsimaleri.se/'],
  makesOffer: ['Invändig målning', 'Fasadmålning', 'Tapetsering', 'Lackering', 'Mikrocement', 'Fönsterrenovering', 'Trapphus för BRF'].map((n) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', name: n },
  })),
};

// Reco-omdömen, ordagrant (reco.se/tamsi-maleri-ab 2026-11-20). Signaturer i slutet strukna.
const RECO_LISTA = [
  { namn: 'Richard L', kalla: 'Verifierad kund', betyg: 5, datum: '2026-08-23', lank: 'https://www.reco.se/r/3317780', text: 'Ärliga, utför enligt vår överenskommelse under tajt tidsplan med otrolig finish. Jag och sambo är mycket nöjda.' },
  { namn: 'Carmina F', kalla: 'Verifierad kund', betyg: 4, datum: '2026-06-25', lank: 'https://www.reco.se/r/3269703', text: 'Trevligt och seriöst bemötande. Jag hade en hel del detaljfrågor. Tamsi Måleri tog sig verkligen tid att svara utförligt. Hela arbetet mycket bra genomfört, i rätt tid och till överenskommen kostnad. Vi är mycket nöjda. Rekommenderas varmt.' },
  { namn: 'Rickard B', kalla: 'Verifierad kund', betyg: 5, datum: '2026-05-04', lank: 'https://www.reco.se/r/3214582', text: 'Snabb respons, bra kommunikation, väl utförda arbeten och inte en massa tillkommande äta-kostnader.' },
  { namn: 'Susanne Maria E', kalla: 'Verifierad kund', betyg: 5, datum: '2026-04-27', lank: 'https://www.reco.se/r/3208050', text: 'Jag är mycket nöjd med bemötande och det arbete som har utförts hos mig. Kom på avtalad tid o avslutade innan utlovad tid. Trevlig o duktig målare. Lätt att kommunicera med Robin o fick snabb återkoppling på mail. Uppskattade speciellt att jag blev uppringd efter avslutat arbete med frågan om jag var nöjd med arbetet. Ett litet backjobb utfördes snabbt. Jag rekommenderar varmt Tamsi Måleri.' },
  { namn: 'Johanna H', kalla: 'Verifierad kund', betyg: 5, datum: '2025-12-16', lank: 'https://www.reco.se/r/3088186', text: 'Vi är JÄTTENÖJDA med Tamsis arbete. Vi fick en helt ny lägenhet, så snyggt och professionellt målat och snickrat. Det var lätt att kommunicera, Tamsi svarade nästan alltid med vändande post. Vi hör av oss nästa gång vi behöver hjälp.' },
  { namn: 'Maria T', kalla: 'Verifierad kund', betyg: 5, datum: '2025-10-23', lank: 'https://www.reco.se/r/3020666', text: 'Mycket bra service. Trevliga och proffsiga. Fönsterna blev riktigt bra och snyggt. Kan starkt rekommendera.' },
  { namn: 'Thomas A', kalla: 'Verifierad kund', betyg: 5, datum: '2025-09-09', lank: 'https://www.reco.se/r/2971273', text: 'Tydlig och god kommunikation under hela projektet. Målaren gjorde ett väldigt bra jobb, höll tider enligt överenskommelse. Mycket nöjda!' },
  { namn: 'Henrik M', kalla: 'Verifierad kund', betyg: 5, datum: '2024-12-09', lank: 'https://www.reco.se/r/2747543', text: 'Seriös och bra rådgivning före beställning och kanonsnyggt slutresultat. Extra stort plus för det trevliga bemötandet från alla medarbetare. Mycket nöjd med arbetet att renovera ett stort vardagsrum med gamla vävtapeter som bredspacklades. En mycket bra kundupplevelse, från början till slut. Anlitar gärna igen.' },
];

const data = {
  namn: 'Tamsi Måleri AB',
  tema: {
    mork: '#101614',
    accent: '#B5282D',
    accentHover: '#931F24',
    accentText: '#A52227',
    accentLjus: '#FF8F86',
    paAccent: '#fff',
  },
  logo: { src: `${M}/logo-tamsi.png`, ljus: `${M}/logo-tamsi-ljus.png`, w: 1000, h: 371, alt: 'Tamsi Måleri, etablerat 2008', topp: 'fri' },
  kontakt: {
    tel: '073-804 35 88',
    telHref: 'tel:+46738043588',
    epost: 'robin@tamsi.se',
    adress: 'Römora 30, Järna',
    ig: 'https://www.instagram.com/tamsimaleri/',
    igHandle: '@tamsimaleri',
    fb: 'https://www.facebook.com/tamsimaleri',
    orgnr: '556772-4504',
  },
  cta: { txt: 'Boka kostnadsfritt hembesök', kort: 'Boka hembesök', lank: 'Boka hembesök' },
  nav: {
    vanster: [{ href: '#tjanster', txt: 'Tjänster' }, { href: '#priser', txt: 'Priser' }],
    hoger: [{ href: '#omdomen', txt: 'Omdömen' }, { href: '#om', txt: 'Om oss' }],
  },

  hero: {
    ort: 'Stockholm & Södermanland',
    tjanster: ['Måleri', 'Fasad'],
    video: `${M}/video-hero.mp4`,
    videoMobil: `${M}/video-hero-mobil.mp4`,
    poster: `${M}/poster-hero.jpg`,
    posterMobil: `${M}/poster-hero-mobil.jpg`,
  },
  tejp: ['4,7 av 5 på Reco', 'Invändig målning', 'Fasadmålning', 'DI Gasell 2025', 'Tapetsering', 'Lackering', 'Fast pris', 'Mikrocement', 'ROT på fakturan', 'Sedan 2008'],

  // Kundens egna siffror: tre generationer och åtta anställda (tamsimaleri.se), 115 omdömen (Reco 2026-11-20).
  siffror: [
    { tal: 3, text: 'generationer målare' },
    { tal: 8, text: 'anställda målare' },
    { tal: 115, text: 'omdömen på Reco' },
  ],

  tjanster: {
    eyebrow: 'Vad vi gör',
    rubrik: ['Inne, ute och', 'allt förarbete'],
    lead: 'Åt privatpersoner, bostadsrättsföreningar och företag. Du får ett kostnadsfritt hembesök och en skriftlig offert med fast pris.',
    kolumner: 3,
    kort: [
      {
        id: 'invandig',
        namn: 'Invändig målning',
        bild: `${M}/tjanst-invandig.jpg`,
        alt: 'Rum med mörkblå väggar, vita dörrar och foder och ljust tak',
        marke: `${M}/marke-invandig.webp`,
        text: 'Väggar, tak och snickerier. Vi spacklar och slipar innan första strykningen.',
        punkter: ['Väggar och tak', 'Dörrar, foder och lister', 'Badrum och tvättstugor'],
      },
      {
        id: 'fasad',
        namn: 'Fasadmålning',
        bild: `${M}/tjanst-fasad.jpg`,
        alt: 'Grön träfasad med vita vindskivor och fönsterfoder mot blå himmel',
        marke: `${M}/marke-fasad.webp`,
        text: 'Trä, puts och plåt. Fasaden tvättas och skrapas, bart trä grundas, sedan två strykningar.',
        punkter: ['Tvätt och skrapning ingår', 'Två strykningar', 'Fönster skrapas, kittas och målas'],
      },
      {
        id: 'tapet',
        namn: 'Tapetsering',
        bild: `${M}/tjanst-tapet.jpg`,
        alt: 'Bladmönstrad tapet ovanför en gråmålad bröstpanel',
        marke: `${M}/marke-tapet.webp`,
        text: 'Gammal tapet tas ner och ny sätts upp. Vi hjälper dig med färgsättningen om du vill.',
        punkter: ['Uppsättning', 'Borttagning av gammal tapet', 'Rådgivning och färgsättning'],
      },
      {
        id: 'lackering',
        namn: 'Lackering',
        bild: `${M}/tjanst-lackering.jpg`,
        alt: 'Vitmålad trappa med räcke intill en vit spegeldörr',
        marke: `${M}/marke-lackering.webp`,
        text: 'Köksluckor, dörrar och garderober får ny yta. Styckpriserna står längre ner.',
        punkter: ['Köksluckor och lådfronter', 'Innerdörrar', 'Fast pris per styck'],
        lank: { href: '#priser', txt: 'Se styckpriserna' },
      },
      {
        id: 'mikrocement',
        namn: 'Mikrocement',
        bild: `${M}/tjanst-mikrocement.jpg`,
        alt: 'Kök med vita luckor och fogfritt grått golv i mikrocement',
        marke: `${M}/marke-mikrocement.webp`,
        text: 'Fogfria ytor på golv och väggar, i kök, badrum eller hela bottenvåningen.',
        punkter: ['Golv', 'Väggar', 'Utan fogar'],
      },
      {
        id: 'brf',
        namn: 'BRF och företag',
        bild: `${M}/tjanst-foretag.jpg`,
        alt: 'Köpcentrum med målade pelare och balkar ovanför butikerna',
        marke: `${M}/marke-brf.webp`,
        text: 'Trapphus, entréer och lokaler. Vi planerar jobbet så att de boende kan använda trapphuset hela tiden.',
        punkter: ['Trapphus och entréer', 'Gemensamma utrymmen', 'Butiker och lokaler'],
      },
    ],
  },

  // Deras egna styckpriser från kalkylatorn på tamsimaleri.se/priser (inkl. moms).
  priser: {
    eyebrow: 'Priser',
    rubrik: ['Lackering till', 'fast styckpris'],
    lead: 'Räkna luckor och dörrar, så vet du ungefär var du landar. Alla priser inklusive moms.',
    kort: [
      { namn: 'Lådfront', pris: '180 kr', villkor: 'per styck, inkl. moms', ingar: ['Lackering av fronten', 'Samma pris oavsett antal'] },
      { namn: 'Normalstor lucka', pris: '360 kr', villkor: 'per styck, inkl. moms', ingar: ['Lucka lägre än 130 cm', 'Köksluckor och garderober'], utvald: true, etikett: 'Vanligast' },
      { namn: 'Stor lucka', pris: '540 kr', villkor: 'per styck, inkl. moms', ingar: ['Lucka högre än 130 cm', 'Högskåp och skafferi'] },
      { namn: 'Innerdörr', pris: '1 126 kr', villkor: 'per styck, inkl. moms', ingar: ['En innerdörr', 'Tung eller brandklassad: 1 638 kr'] },
    ],
    not: 'Priserna kommer från kalkylatorn på tamsimaleri.se. Högblank finish, speglar, transport och montering räknas till. Fasad och invändig målning får du fast pris på efter hembesöket. Som riktmärke ligger fasadmålning ofta mellan 250 och 600 kr per kvadratmeter före ROT.',
  },

  jobb: {
    eyebrow: 'Våra jobb',
    rubrik: ['Hem och lokaler vi', 'har gjort klart'],
    lead: 'Vardagsrum, trapphallar, golv i mikrocement och en matsal. Bilderna är från våra egna jobb.',
    not: 'Alla bilder är våra egna.',
    tid: '70s',
    rad1: [
      { src: `${M}/jobb-vardagsrum.jpg`, alt: 'Ljust vardagsrum med vita väggar och fönster åt två håll', txt: 'Vardagsrum i vitt' },
      { src: `${M}/jobb-burspraak.jpg`, alt: 'Burspråk med vita spröjsade fönster och två soffor', txt: 'Burspråk och fönster' },
      { src: `${M}/jobb-matsal.jpg`, alt: 'Matsal med vitmålat panelat tak och dukade bord', txt: 'Matsal med paneltak' },
      { src: `${M}/jobb-hoga-fonster.jpg`, alt: 'Rum med höga fönster och gråbeige väggar', txt: 'Höga fönster' },
      { src: `${M}/jobb-galleria.jpg`, alt: 'Gång i ett köpcentrum med grönmålad putsvägg', txt: 'Köpcentrum' },
      { src: `${M}/jobb-hall.jpg`, alt: 'Hall med ljusa väggar och vita pardörrar', txt: 'Hall och pardörrar' },
      { src: `${M}/jobb-snedtak.jpg`, alt: 'Vitt snedtak med spotlights över en fönstervägg', txt: 'Snedtak' },
    ],
    rad2: [
      { src: `${M}/jobb-mikrocement-kamin.jpg`, alt: 'Grått golv i mikrocement framför en vit braskamin', txt: 'Mikrocement vid kaminen' },
      { src: `${M}/jobb-tapet-trapphall.jpg`, alt: 'Trapphall med mönstrad tapet och gråmålad panel', txt: 'Tapet i trapphallen' },
      { src: `${M}/jobb-dorrar.jpg`, alt: 'Två öppna vita dörrar i en ljus hall', txt: 'Dörrar och foder' },
      { src: `${M}/jobb-mikrocement-dusch.jpg`, alt: 'Dusch med väggar och golv i beige mikrocement', txt: 'Dusch i mikrocement' },
      { src: `${M}/jobb-trappa-panel.jpg`, alt: 'Svängd trappa med vitmålad panel och räcke', txt: 'Trappa och panel' },
      { src: `${M}/jobb-entre.jpg`, alt: 'Entré med stengolv, två fåtöljer och en vit dörr', txt: 'Entré' },
      { src: `${M}/jobb-mikrocement-golv.jpg`, alt: 'Stort grått golv i mikrocement i ett vardagsrum', txt: 'Golv utan fogar' },
    ],
  },

  varfor: {
    eyebrow: 'Varför Tamsi Måleri',
    rubrik: ['Fast pris', 'innan vi börjar'],
    lead: 'Vi kommer hem till dig, tittar på ytorna och skriver en offert med fast pris. Det kostar ingenting. Sedan vet du vad jobbet kostar, och vi vet vad som ska göras.',
    punkter: [
      { rubrik: 'Fast pris i avtalet', text: 'Du får en skriftlig offert efter hembesöket. Behövs ställning eller nytt virke står det där.' },
      { rubrik: 'Förarbetet görs ordentligt', text: 'Tvätt, skrapning, spackling och slipning avgör hur länge färgen håller.' },
      { rubrik: 'ROT direkt på fakturan', text: 'Vi drar avdraget och sköter ansökan till Skatteverket.' },
      { rubrik: 'Små jobb går också bra', text: 'Ett rum eller några köksluckor. Du behöver inte måla om hela huset för att ringa.' },
    ],
    video: `${M}/video-varfor.mp4`,
    poster: `${M}/poster-varfor.jpg`,
    videoAlt: 'Långsam inzoomning över Tamsi Måleris hus med skylten på fasaden och firmabilen framför. Filmen slutar med logotypen.',
  },

  om: {
    eyebrow: 'Om oss',
    rubrik: ['Tredje generationen', 'målare'],
    kortRad: 'Järna · sedan 2008',
    stycken: [
      'Tamsi Måleri är ett familjeföretag i tredje generationen. Far och son driver det vidare i Gnesta och Södertälje, i dag med Robin Tamsi i spetsen och åtta anställda målare.',
      'Vi tar små och stora uppdrag, åt privatpersoner, bostadsrättsföreningar och företag. Under jobbet håller vi kontakten med dig, så att du vet var vi är och inte behöver bo i byggkaos längre än nödvändigt.',
    ],
    bevis: [
      { ord: '2008', text: 'måleri sedan dess' },
      { ord: '4,7 av 5', text: 'på Reco, 115 omdömen' },
      { ord: 'DI Gasell', text: '2024 och 2025' },
    ],
  },

  steg: {
    eyebrow: 'Så går det till',
    rubrik: ['Från hembesök', 'till slutgenomgång'],
    lead: 'Du får svar inom 24 timmar, och priset innan vi börjar.',
    lista: [
      { namn: 'Hör av dig', text: 'Ring eller skriv vad som ska målas och var du bor. Vi svarar inom 24 timmar.', ikon: 'kontakt' },
      { namn: 'Kostnadsfritt hembesök', text: 'Vi tittar på ytorna, mäter och pratar igenom färg och förarbete.', ikon: 'besok' },
      { namn: 'Offert med fast pris', text: 'Skriftlig offert där arbete och material står var för sig, så att ROT blir rätt.', ikon: 'offert' },
      { namn: 'Vi målar', text: 'Förarbete, strykningar och städning. Vi går igenom resultatet med dig när vi är klara.', ikon: 'klart' },
    ],
  },

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['115 kunder', 'har sagt sitt'],
    lead: 'Reco kontrollerar att varje omdöme kommer från en riktig kund. Vi ber alla våra kunder om ett.',
    reco: {
      betyg: '4,7',
      antal: 115,
      trovardighet: 'Mycket bra',
      lank: RECO,
      not: 'Vi ber alla våra kunder om ett omdöme, och Reco har full insyn i vårt affärssystem. Rekommenderat företag på Reco 2024, 2025 och 2026.',
    },
    lista: RECO_LISTA,
    not: 'Omdömena är hämtade ordagrant från Reco.se den 20 november 2026.',
    lank: { href: RECO, txt: 'Läs alla på Reco' },
  },

  instagram: {
    eyebrow: 'Instagram',
    rubrik: ['Följ jobben', 'medan de pågår'],
    lead: 'Det senaste från vårt konto, direkt från Instagram.',
    bio: 'Tamsi Måleri · Stockholm och Södermanland',
    koder: ['Deg2WhOjhkQ', 'Dc-tuddO685', 'DddcVLZujEB'],
  },

  fragor: {
    eyebrow: 'Vanliga frågor',
    rubrik: ['Det du brukar', 'undra först'],
    lead: 'Pris först, det praktiska sedan.',
    kort: { rubrik: 'Hittar du inte svaret?', text: 'Ring Robin och berätta vad som ska målas. Du får ett rakt besked.' },
    lista: [
      { q: 'Vad kostar en målare?', a: 'Det beror på yta, underlag och hur mycket förarbete som krävs. Du får ett fast pris efter ett kostnadsfritt hembesök, och 30 procent ROT-avdrag på arbetskostnaden.' },
      { q: 'Vad kostar det att måla om fasaden?', a: 'Som riktmärke 250 till 600 kr per kvadratmeter fasadyta före ROT. En villa med 140 till 160 kvadratmeter fasad i gott skick landar ofta på 38 000 till 58 000 kr före ROT. Exakt pris får du efter hembesöket.' },
      { q: 'Hur fungerar ROT-avdraget?', a: 'Du får 30 procent avdrag på arbetskostnaden, högst 50 000 kr per person och år. Material och ställning ger inget avdrag. Vi drar det på fakturan och sköter ansökan. Du uppger personnummer och fastighetsbeteckning.' },
      { q: 'Hur snabbt kan ni börja?', a: 'Skicka en förfrågan, så svarar vi inom 24 timmar och bokar ett hembesök. Startdatum står i offerten.' },
      { q: 'Målar ni åt bostadsrättsföreningar?', a: 'Ja. Trapphus, entréer och gemensamma utrymmen. Vi planerar arbetet så att de boende kan använda trapphuset under hela projektet.' },
      { q: 'Tar ni små jobb?', a: 'Ja. Allt från ett enskilt rum eller några köksluckor till hela fasader.' },
      { q: 'Var jobbar ni?', a: 'I hela Stockholm och Södermanland, från Täby i norr till Nyköping i söder. Bland annat Södertälje, Gnesta, Nykvarn, Trosa, Strängnäs, Huddinge, Nacka och Södermalm.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Boka hembesök,', 'få fast pris'],
    lead: 'Skriv vad som ska målas och var du bor. Vi svarar inom 24 timmar.',
    checkar: ['Kostnadsfritt hembesök', 'Skriftlig offert med fast pris', 'ROT-avdraget på fakturan'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta kort om jobbet',
    kundtyp: ['Privatperson', 'Bostadsrättsförening', 'Företag'],
    placeholder: 'Vad ska målas, ungefär hur stort, och var? Till exempel: fasad på en villa i två plan i Gnesta.',
    formNot: 'En förfrågan är ingen beställning. Du bestämmer dig när du har sett offerten.',
    meddelandeEtikett: 'Kort om jobbet',
  },

  samarbeten: {
    band: true,
    eyebrow: 'Utmärkelser',
    rubrik: ['Rekommenderade, prisade och', 'kreditvärdiga'],
    lista: [
      { namn: 'Reco tre år i rad', href: RECO, text: 'Rekommenderat företag på Reco tre år i rad', bilder: [{ src: `${M}/marke-reco-3ar.svg`, w: 308, h: 308, alt: 'Reco: Rekommenderat företag tre år i rad', hojd: 88 }] },
      { namn: 'DI Gasell 2025', text: 'DI Gasell 2025', bilder: [{ src: `${M}/utm-gasell-2025.png`, w: 640, h: 249, alt: 'Dagens industri: Gasell 2025', hojd: 62 }] },
      { namn: 'UC', text: 'UC: högsta kreditvärdighet', bilder: [{ src: `${M}/utm-uc-kreditvardighet.png`, w: 480, h: 567, alt: 'UC: Högsta kreditvärdighet, Tamsi Måleri AB', hojd: 96 }] },
      { namn: 'Reco 2026', href: RECO, text: 'Rekommenderat företag på Reco 2026', bilder: [{ src: `${M}/marke-reco-2026.svg`, w: 308, h: 308, alt: 'Reco: Rekommenderat företag 2026', hojd: 88 }] },
      { namn: 'DI Gasell 2024', text: 'DI Gasell 2024', bilder: [{ src: `${M}/utm-gasell-2024.png`, w: 640, h: 249, alt: 'Dagens industri: Gasell 2024', hojd: 62 }] },
      { namn: 'Länets företagare 2023', text: 'Länets företagare 2023, Stockholms län', bilder: [{ src: `${M}/utm-lanets-foretagare-2023.png`, w: 300, h: 300, alt: 'Sveriges Företag: Länets företagare 2023, Stockholms län', hojd: 88 }] },
      { namn: 'Reco 2025', href: RECO, text: 'Rekommenderat företag på Reco 2025', bilder: [{ src: `${M}/marke-reco-2025.svg`, w: 308, h: 308, alt: 'Reco: Rekommenderat företag 2025', hojd: 88 }] },
      { namn: 'Nordiskt tillväxtcertifikat', text: 'UC: Nordiskt tillväxtcertifikat', bilder: [{ src: `${M}/utm-nordiskt-tillvaxtcertifikat.png`, w: 600, h: 153, alt: 'UC: Nordiskt tillväxtcertifikat, Tamsi Måleri AB', hojd: 56 }] },
      { namn: 'Reco 2024', href: RECO, text: 'Rekommenderat företag på Reco 2024', bilder: [{ src: `${M}/marke-reco-2024.svg`, w: 308, h: 308, alt: 'Reco: Rekommenderat företag 2024', hojd: 88 }] },
    ],
  },

  popup: {
    rubrik: 'Dags att måla om?',
    text: 'Boka ett kostnadsfritt hembesök, så får du ett fast pris innan något målas.',
  },

  footer: {
    text: 'Målare i tredje generationen. Invändig målning, fasadmålning, tapetsering och lackering i Stockholm och Södermanland.',
  },

  modal: {
    rubrik: 'Så här kan Tamsi Måleri se ut på nätet',
    text: 'Det här är ett kostnadsfritt förslag, byggt på det ni själva visar på tamsimaleri.se, Reco och Instagram, med era egna bilder, priser och utmärkelser. Filmen överst är en illustration gjord ur ert foto av den gula villan. Formuläret landar ännu inte i er inkorg. Vill ni se den skarpt? Boka ett kostnadsfritt samtal på 15 minuter med Mathias.',
  },
};

// På mobil visas bara det första Instagram-inlägget: tre inbäddningar på rad blir nästan två skärmar scroll.
// Ortsraden är 24 tecken: på mobil krymps den så att den ryms på en rad och inte bryts mitt i ordet.
const STIL = '@media (max-width:700px){[class*="heroOrt"]{font-size:clamp(1.5rem,7.5vw,2.6rem)!important;white-space:nowrap}#instagram [class*="igRutnat"]>div:nth-child(n+2){display:none!important}}';

export default function TamsiMaleriDemo() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <style>{STIL}</style>
      <DemoSida data={data} />
    </>
  );
}
