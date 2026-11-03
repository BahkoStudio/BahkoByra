import DemoSida from '../_mall/DemoSida';

/* ===========================================================================
   ARCHER KNOX AB · kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: instagram.com/archer_knox.se · Kungsängen · HAR hemsida (archerknox.se, Shopify-webbutik).
   Byggd 2026-11-03 på demomallen v3 (struktur som pbindustriservice, kanon swedcro).
   Ingen befintlig demo för takprodukter/fågelskydd i web/public (alla media-mappar), därför nybygge
   med kundens egna bilder (demo-recopy/hemsidor-återbruk gav 0 träffar i nischen).

   Bärande idé: allt för taket och fågelskyddet under solpanelerna, i lager hos ett litet
   företag i Kungsängen som svarar själva, säljer till både proffs och privatpersoner.

   VERIFIERAT (2026-11-03):
   - archerknox.se/pages/contact: Archer Knox AB, Örtugsvägen 15, 196 32 Kungsängen,
     070-560 55 38, info@archerknox.se, org.nr 559288-1238, VAT SE559288123801.
   - archerknox.se (start): "Din självklara leverantör av produkter för tak", produkter för tak
     och fasad samt fågelskydd för solpaneler från BirdBlocker, "levererar på en till två dagar
     eller hämta i vår lagershop i Kungsängen", "Vid större order kontakta oss så skickar vi er
     en offert". Kategorier: nocktätning och skorstenstätning, fågelband och fågelstopp,
     nockbrädshållare, tätningstejp och butyl, vindduk, takmembran, taksäkerhet, BirdBlocker
     för solpaneler, trädgård. Logotyp ak-logo-thin.png, slogan "Skyddar dig i alla väder".
   - /collections/birdblocker: fågelband som hindrar fåglar att vistas och häcka under
     solpaneler, vid nyinstallation eller i efterhand, BB-Boxclip för boxframe-paneler,
     CableFixPro, "designade så de inte skadar fåglarna", "alltid alla BirdBlockers produkter
     i lager för leverans till dig på 1 till 2 dagar".
   - /pages/besok-oss-pa-massor: 2026 NordBygg, Nordiska Trädgårdar, Elmia Solar (med
     BirdBlocker). 2025 och 2024 bl.a. Elmässan Kista, Elmia Solar, Elmia Garden.
   - Instagram @archer_knox.se (embed): 195 inlägg, 573 följare. DeORMwFjCFD "Kunden har
     monterat fågelband från BirdBlocker och fågelpiggar på en villa utanför Stockholm".
     De6CW9bio3n "Sveriges största utbud av nockband nocktätning i lager för snabb leverans i
     hela Sverige ... Vi säljer till både proffs o privatkunder". DeiwGgSDKGh: BESÖKTE Elmia
     Lantbruk 14-16 oktober (ställde inte ut), levererade nockband och BirdBlocker till kunder i
     Norrköping och Linköping.
   - Omdömen: Judge.me i deras egen webbutik, ordagrant (fagelband-bb200: Smart Takvård
     2026-10-13; nocktatning-m: Anonym 2026-10-26, Lars-Anders Pettersson 2026-09-09), alla 5 av 5.
   - Registret (bolagsfakta, hitta, syna): aktiebolag registrerat 2020-12-08, F-skatt sedan
     2021-11-26, säte Upplands-Bro.

   INTE verifierat, och finns därför inte på sidan: att de monterar själva (kunderna monterar),
   reparationer som tjänst, BB-TopGuard och BB-Topclip (syns bara i IG-rutnätet, inte i
   webbutiken), utställning på Elmia Lantbruk, Google-betyg (hitta.se visar 4,8 av 5, ej läst),
   garantier, antal kunder.

   FLAGGOR: hero-filmen är GENERERAD (Higgsfield Wan 3.0 Prime, 5 s 1080p, image-to-video ur
   deras eget foto DeOQkMksSJW i inlägg DeORMwFjCFD). Mobilen = beskuren ur den liggande.
   Varför-filmen = deras foto DeOQkT6MIDj i långsam rörelse + logokort. Ljus logovariant gjord
   av oss (svart text till vit). Formuläret går till mathias@bahkobyra.se (demonyckeln).
   =========================================================================== */

export const metadata = {
  title: 'Archer Knox | Fågelskydd för solpaneler, nockband och takprodukter',
  description:
    'BirdBlocker fågelskydd för solpaneler, nockband, nocktätning, takmembran och taksäkerhet. Lager och lagershop i Kungsängen, leverans i hela Sverige. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
  icons: { icon: '/archerknox/media/icon-archerknox.png', apple: '/archerknox/media/apple-icon-archerknox.png' },
  openGraph: {
    title: 'Archer Knox | Fågelskydd för solpaneler och takprodukter',
    description: 'BirdBlocker, nockband, takmembran och taksäkerhet. I lager i Kungsängen, leverans i hela Sverige.',
    siteName: 'Archer Knox',
    locale: 'sv_SE',
    type: 'website',
    images: [{ url: '/archerknox/media/og-archerknox.jpg', width: 1200, height: 630, alt: 'Archer Knox' }],
  },
};

const M = '/archerknox/media';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'Archer Knox',
  legalName: 'Archer Knox AB',
  logo: 'https://www.bahkobyra.se/archerknox/media/logo-archerknox.png',
  image: 'https://www.bahkobyra.se/archerknox/media/og-archerknox.jpg',
  url: 'https://archerknox.se/',
  telephone: '+46705605538',
  email: 'info@archerknox.se',
  taxID: '559288-1238',
  vatID: 'SE559288123801',
  address: { '@type': 'PostalAddress', streetAddress: 'Örtugsvägen 15', postalCode: '196 32', addressLocality: 'Kungsängen', addressCountry: 'SE' },
  areaServed: { '@type': 'Country', name: 'Sverige' },
  sameAs: ['https://www.instagram.com/archer_knox.se/', 'https://archerknox.se/'],
  makesOffer: ['Fågelskydd för solpaneler BirdBlocker', 'Nockband och nocktätning', 'Skorstenstätning', 'Takmembran och underlagsduk', 'Taksäkerhet och takbrygga', 'Fågelstopp och fågelpiggar'].map((n) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Product', name: n },
  })),
};

const data = {
  namn: 'Archer Knox',
  tema: {
    mork: '#140A18',
    accent: '#CC00CC',
    accentHover: '#A800A8',
    accentText: '#A30DAA',
    accentLjus: '#F08AF5',
    paAccent: '#fff',
  },
  logo: { src: `${M}/logo-archerknox.png`, w: 819, h: 162, alt: 'Archer Knox', ljus: `${M}/logo-archerknox-ljus.png`, topp: 'fri' },
  kontakt: {
    tel: '070 560 55 38',
    telHref: 'tel:+46705605538',
    epost: 'info@archerknox.se',
    adress: 'Örtugsvägen 15, 196 32 Kungsängen',
    ig: 'https://www.instagram.com/archer_knox.se/',
    igHandle: '@archer_knox.se',
    orgnr: '559288-1238',
  },
  cta: { txt: 'Berätta om taket, få offert', kort: 'Begär offert', lank: 'Begär offert' },
  nav: {
    vanster: [{ href: '#tjanster', txt: 'Produkter' }, { href: '#jobb', txt: 'På taken' }],
    hoger: [{ href: '#om', txt: 'Om oss' }, { href: '#kontakt', txt: 'Kontakt' }],
  },

  hero: {
    ort: 'Kungsängen',
    tjanster: ['Fågelskydd', 'Nockband'],
    video: `${M}/video-hero.mp4`,
    videoMobil: `${M}/video-hero-mobil.mp4`,
    poster: `${M}/poster-hero.jpg`,
    posterMobil: `${M}/poster-hero-mobil.jpg`,
  },
  tejp: ['BirdBlocker', 'Fågelskydd', 'Nockband', 'Nocktätning', 'Takmembran', 'Taksäkerhet', 'Kungsängen', 'Hela Sverige'],

  tjanster: {
    eyebrow: 'Vad vi säljer',
    rubrik: ['Allt för taket,', 'i lager nu'],
    lead: 'Vi säljer produkter för tak och fasad till både proffs och privatpersoner. Beställ, så skickar vi i hela Sverige, eller hämta i lagershopen i Kungsängen.',
    kort: [
      { id: 'birdblocker', namn: 'Fågelskydd för solpaneler', bild: `${M}/tjanst-birdblocker.jpg`, alt: 'Fågelband från BirdBlocker monterat längs kanten på solpaneler över ett tegeltak', text: 'BirdBlocker stänger ute fåglar som vill bo och häcka under solpanelerna. Passar ny anläggning och i efterhand.', punkter: ['Fågelband BB85, BB125 och BB200', 'BB-Boxclip för boxframe-paneler', 'Skadar inte fåglarna'], ritning: (<><path d="M30 80l70-40 70 40" /><path d="M50 70h100" /><path d="M60 70v10M80 70v10M100 70v10M120 70v10M140 70v10" /></>) },
      { id: 'nockband', namn: 'Nockband & nocktätning', bild: `${M}/tjanst-nockband.jpg`, alt: 'Svart nockband utrullat längs nocken på ett tak med betongpannor', text: 'Nockband som tätar nocken och skorstenen mot regn, snö och djur. Flera bredder och färger.', punkter: ['Nockband CV-30, M och PRO', 'Skorstenstätning ALU och K-FLEX', 'Kopparband mot mossa'], ritning: (<><path d="M20 90l80-50 80 50" /><path d="M70 59l30-19 30 19" /></>) },
      { id: 'takmembran', namn: 'Takmembran & vindduk', bild: `${M}/tjanst-takmembran.jpg`, alt: 'Röd underlagsduk utlagd på ett tak med läkt, takläggare i arbete', text: 'Diffusionsöppen underlagsduk som skyddar taket under pannorna, och vindduk till ytterväggen.', punkter: ['RED Strong, CLASSIC och METAL', 'Ångbroms ACTIVE', 'Tätningstejp och butyl'], ritning: (<><path d="M30 90l70-55 70 55" /><path d="M50 75h100M65 63h70" /></>) },
      { id: 'taksakerhet', namn: 'Taksäkerhet', bild: `${M}/tjanst-taksakerhet.jpg`, alt: 'Svart takbrygga i metall med fästen', text: 'Takbrygga, taksteg och sotarbrygga så att sotaren och du själv kan gå säkert på taket.', punkter: ['Takbrygga och taksteg', 'Sotarbrygga för skorsten', 'Skarvjärn och fästen'], ritning: (<><path d="M40 70h120" /><path d="M50 70v20M150 70v20" /><path d="M60 62h80" /></>) },
    ],
  },

  jobb: {
    eyebrow: 'På taken',
    rubrik: ['Våra produkter,', 'på riktiga tak'],
    lead: 'Bilder från tak där våra produkter sitter, och från lagret i Kungsängen.',
    not: 'Alla bilder är våra egna, från Instagram och webbutiken.',
    tid: '70s',
    rad1: [
      { src: `${M}/jobb-birdblocker-villa.jpg`, alt: 'Fågelband under solpaneler på en villa med tegeltak', txt: 'Villa utanför Stockholm' },
      { src: `${M}/jobb-fagelbo-under-panel.jpg`, alt: 'Fågelbo med kvistar under en solpanel innan fågelskyddet monterats', txt: 'Fågelbo under panel' },
      { src: `${M}/jobb-birdblocker-takfot.jpg`, alt: 'Fågelband längs nedre kanten av solpaneler på ett tegeltak', txt: 'BirdBlocker på plats' },
      { src: `${M}/jobb-duvor-pa-taket.jpg`, alt: 'Två duvor sitter på kanten av en solpanel', txt: 'Det vi stänger ute' },
      { src: `${M}/jobb-fagelband-kant.jpg`, alt: 'Fågelband och fågelpiggar vid kanten av en solpanel på ett rött tak', txt: 'Fågelband och piggar' },
    ],
    rad2: [
      { src: `${M}/jobb-nockband-cv30.jpg`, alt: 'Svart nockband CV-30 monterat längs nocken på ett tegeltak', txt: 'Nockband CV-30' },
      { src: `${M}/jobb-nockband-rullar.jpg`, alt: 'Rullar med nockband från Archer Knox, en utrullad', txt: 'Nockband i lager' },
      { src: `${M}/jobb-nockband-alternativ.jpg`, alt: 'Nockband i flera färger och bredder', txt: 'Många alternativ' },
      { src: `${M}/jobb-fagelband-solpanel.jpg`, alt: 'Solpaneler med fågelband längs kanten mot tegelpannorna', txt: 'Skydd under panelerna' },
      { src: `${M}/jobb-fagelstopp-tak.jpg`, alt: 'Fågelstopp monterat på ett tak med tegelpannor', txt: 'Fågelstopp' },
      { src: `${M}/jobb-nockband-koppar.jpg`, alt: 'Nockband PRO med koppar på en nock', txt: 'Nockband PRO koppar' },
    ],
  },

  varfor: {
    eyebrow: 'Varför Archer Knox',
    rubrik: ['Rätt produkt,', 'första gången'],
    lead: 'Fåglar under solpanelerna och en otät nock är små fel som blir dyra. Vi har produkterna i lager och hjälper dig välja rätt, så att jobbet blir gjort en gång.',
    punkter: [
      { rubrik: 'I lager i Kungsängen', text: 'Vi skickar i hela Sverige, eller så hämtar du i vår lagershop.' },
      { rubrik: 'Proffs och privat', text: 'Vi säljer till takläggare, solcellsföretag och till dig som fixar ditt eget tak.' },
      { rubrik: 'Bara det som behövs', text: 'Säg vad du har för tak och paneler, så får du det som passar och inget extra.' },
      { rubrik: 'Offert på större order', text: 'Ska du köpa mycket skickar vi en offert direkt till dig.' },
    ],
    video: `${M}/video-varfor.mp4`,
    poster: `${M}/poster-varfor.jpg`,
    videoAlt: 'Långsam inzoomning mot solpaneler med fågelskydd på ett tegeltak. Filmen slutar med logotypen.',
  },

  om: {
    eyebrow: 'Om oss',
    rubrik: ['Ett litet företag', 'med stort lager'],
    kortRad: 'Kungsängen · hela Sverige',
    stycken: [
      'Archer Knox AB är ett företag i Kungsängen som säljer produkter för tak och fasad. Vi har nockband, takmembran, taksäkerhet och fågelskydd från BirdBlocker, och vi säljer till både proffs och privatpersoner.',
      'Du träffar oss på mässor som NordBygg, Nordiska Trädgårdar och Elmia Solar. Där visar vi produkterna och svarar på frågor om just ditt tak.',
    ],
    bevis: [
      { ord: 'BirdBlocker', text: 'hela sortimentet i lager' },
      { ord: 'F-skatt', text: 'aktiebolag i Upplands-Bro' },
      { ord: 'Hela Sverige', text: 'leverans eller hämtning i Kungsängen' },
    ],
  },

  steg: {
    eyebrow: 'Så går det till',
    rubrik: ['Från fråga', 'till tätt tak'],
    lead: 'Enkelt, oavsett om du är takläggare eller villaägare.',
    lista: [
      { namn: 'Berätta om taket', text: 'Ring eller skriv vad du har för tak och paneler. En bild hjälper.', ikon: 'kontakt' },
      { namn: 'Vi föreslår rätt produkt', text: 'Du får besked om vad som passar, och en offert på större order.', ikon: 'offert' },
      { namn: 'Leverans eller hämtning', text: 'Vi skickar i hela Sverige, eller så hämtar du i Kungsängen.', ikon: 'plan' },
      { namn: 'Taket är skyddat', text: 'Produkterna monteras och taket står emot fåglar och väder.', ikon: 'klart' },
    ],
  },

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Vad kunderna', 'säger'],
    lista: [
      { namn: 'Smart Takvård', kalla: 'Fågelband BB200, webbutiken', text: 'Alltid kvalitetsprodukter, fantastisk service och kunnig samt lösningsorienterad personal! Rekommeras starkt!' },
      { namn: 'Lars-Anders Pettersson', kalla: 'Nockband M, webbutiken', text: 'Funkar toppen snabbt och rätt.' },
      { namn: 'Anonym kund', kalla: 'Nockband M, webbutiken', text: 'Mycket snabb och fin service! Återkommer gärna!!!' },
    ],
    not: 'Omdömen från vår webbutik på archerknox.se.',
  },

  instagram: {
    eyebrow: 'Instagram',
    rubrik: ['Följ oss', 'på Instagram'],
    lead: 'Det senaste från vårt konto, direkt från Instagram.',
    bio: 'Produkter för tak och fasad, och fågelskydd för solpaneler från BirdBlocker.',
    koder: ['DeORMwFjCFD', 'De6CW9bio3n', 'DeOSUiRM5dM'],
  },

  fragor: {
    eyebrow: 'Vanliga frågor',
    rubrik: ['Det ni brukar', 'fråga först'],
    lead: 'Pengar och leverans först, det tekniska sedan.',
    kort: { rubrik: 'Hittar du inte svaret?', text: 'Ring och berätta om ditt tak. Du får ett rakt besked om vad som passar.' },
    lista: [
      { q: 'Vad kostar det?', a: 'Priserna står i webbutiken på archerknox.se. Ska du köpa mycket, hör av dig så skickar vi en offert.' },
      { q: 'Hur snabbt får jag varorna?', a: 'Vi har produkterna i lager och skickar i hela Sverige. Har vi inte något hemma hör vi av oss och säger när det kommer.' },
      { q: 'Kan jag hämta själv?', a: 'Ja. Du kan hämta i vår lagershop i Kungsängen efter överenskommelse.' },
      { q: 'Passar BirdBlocker mina solpaneler?', a: 'Det finns flera modeller och clips, bland annat BB-Boxclip för paneler med boxframe. Berätta vilka paneler du har så säger vi vilket som passar.' },
      { q: 'Kan fågelskyddet sättas upp i efterhand?', a: 'Ja. BirdBlocker går att montera både när solanläggningen är ny och på en befintlig anläggning.' },
      { q: 'Skadar fågelskyddet fåglarna?', a: 'Nej. Produkterna från BirdBlocker är gjorda för att hålla fåglarna borta utan att skada dem.' },
      { q: 'Säljer ni till företag?', a: 'Ja. Vi säljer till takläggare, solcellsföretag och andra proffs, och till privatpersoner.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Berätta om taket,', 'vi hör av oss'],
    lead: 'Skriv vad du har för tak eller paneler och vad du behöver. En bild säger ofta mest, skicka den gärna efteråt.',
    checkar: ['Fågelskydd, nockband och takprodukter', 'Offert på större order', 'Leverans i hela Sverige'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta kort om taket',
    placeholder: 'Vad har du för tak eller solpaneler, och vad behöver du? Ungefär hur många meter?',
    formNot: 'Skriv kort om taket, så kan vi ge ett vettigt svar direkt.',
    meddelandeEtikett: 'Kort om taket',
    kundtyp: ['Privatperson', 'Företag'],
  },

  popup: {
    rubrik: 'Fåglar under panelerna?',
    text: 'Berätta vilka solpaneler du har, så säger vi vilket fågelskydd som passar.',
  },

  footer: {
    text: 'Fågelskydd för solpaneler från BirdBlocker, nockband, takmembran och taksäkerhet. Lager och lagershop i Kungsängen. Leverans i hela Sverige.',
  },

  modal: {
    rubrik: 'Så här kan Archer Knox se ut på nätet',
    text: 'Det här är ett kostnadsfritt förslag, byggt på det ni själva visar på archerknox.se och Instagram, med era egna bilder, er logga och riktiga omdömen från er webbutik. Filmen överst är en illustration gjord ur ert eget foto. Formuläret landar ännu inte i er inkorg. Vill ni se den skarpt? Boka ett kostnadsfritt 15 minuters samtal med Mathias.',
  },
};

export default function ArcherKnoxDemo() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <DemoSida data={data} />
    </>
  );
}
