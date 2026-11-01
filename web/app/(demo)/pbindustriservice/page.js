import DemoSida from '../_mall/DemoSida';

/* ===========================================================================
   PB INDUSTRISERVICE (PBService AB) · kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: instagram.com/pb_industriservice · Malmö (Husie) · HAR hemsida (pbservice.se,
   inriktad på bygg och renovering). Byggd 2026-11-01 på demomallen v3 (kanon: swedcro).
   Ingen befintlig demo i nischen industrisvets/stål, därför nybygge (demo-recopy gav 0 träffar).

   Bärande idé: samma folk som svetsar på fartyg och i processindustri på natten
   kommer ut och lagar det som står still. Arbete på plats, i hela Sverige.

   VERIFIERAT (2026-11-01):
   - Instagram @pb_industriservice (skärmdump Mathias + embed): kategori
     "Industrisvets", bio "Reparation, montering, tillverkning, underhåll och
     montage av stålkonstruktion. Info@PBService.se". Fyra inlägg: Dbu5DPgCLCw
     (stålbalkar och svetsutrustning, #jinertmalmö #nrcgroupsverige),
     DbxVOsJi2ao (stålkonstruktion i natt, "Fel omdöme lär ut erfarenhet men
     erfarenhet lär ut bra omdöme"), DcDa2k0CNfA (fartyg i hamn, "A small glimpse
     into a project we were proud to be part of"), DeBBu12C7c2 (svetsreel, 53 s,
     "we weld the world together", #pbindustriservice).
   - pbservice.se (start, /omoss, /ovrigatjanster, /kontaktaoss): PBService
     (Persson Brothers Service AB), org.nr 559122-4596, tel 072 991 77 34,
     info@pbservice.se, Pyrusgatan 7 Malmö (Husie), "Verkstad i Husie, Malmö &
     Trelleborg", "Sedan 2017", Patrik Persson grundare och arbetsledare, "resa
     inom bygg och industri började för ca 17år sedan som resemontör", arbetat som
     snickare, plattsättare, murare och montör inom bygg- och industrisektorn,
     "montage i hela Sverige", industriservice "i hela Sverige": underhåll,
     reparationer, specialprojekt.
   - Registret (syna.se, bolagsfakta.se, hitta.se): Persson Brothers Service AB,
     aktiebolag, registrerat 2017-08-23, F-skatt, SNI 25530 Metallegoarbeten och
     33120 Reparation och underhåll av maskiner. Verksamhet bl.a. "mekanisk
     underhåll inom processindustrin".
   - Alla stillbilder är deras egna: IG-bildernas omslag + stillbilder ur
     svetsreelen DeBBu12C7c2.

   INTE verifierat, och finns därför inte på sidan: certifikat (EN ISO 9606 m.fl.),
   kunder/projekt med namn (hashtaggarna nämns inte som referenser), ledtider,
   jour, priser, antal projekt, Google-betyg (hitta.se visar 5,0 av ett omdöme,
   texten ej läst), att "PB Industriservice" är ett eget registrerat namn.

   FLAGGOR: hero-filmen är GENERERAD (Higgsfield Wan 3.0 Prime, 5 s 1080p, ur
   deras eget fartygsfoto DcDa2k0CNfA; svetsljuset i bogporten är tillagt).
   Mobilversionen är beskuren ur den liggande. Varför-filmen = deras nattfoto
   (DbxVOsJi2ao) i långsam rörelse + logokort. Logotypen = "Ny-logga-svart" från
   pbservice.se (kugghjulet), ljusa varianten inverterad av oss. Omdömen i
   exempelläge. Formuläret går till mathias@bahkobyra.se (demonyckeln).
   =========================================================================== */

export const metadata = {
  title: 'PB Industriservice | Industrisvets och stålkonstruktion i Malmö',
  description:
    'Svetsning, reparation, underhåll, tillverkning och montage av stålkonstruktion. Industriservice från Malmö, på plats i hela Sverige. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

const M = '/pbindustriservice/media';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'PB Industriservice',
  legalName: 'Persson Brothers Service AB',
  url: 'https://www.pbservice.se/',
  telephone: '+46729917734',
  email: 'info@pbservice.se',
  taxID: '559122-4596',
  address: { '@type': 'PostalAddress', streetAddress: 'Pyrusgatan 7', postalCode: '212 32', addressLocality: 'Malmö', addressCountry: 'SE' },
  areaServed: [{ '@type': 'City', name: 'Malmö' }, { '@type': 'City', name: 'Trelleborg' }, { '@type': 'Country', name: 'Sverige' }],
  sameAs: ['https://www.instagram.com/pb_industriservice/', 'https://www.pbservice.se/'],
  makesOffer: ['Industrisvets', 'Reparation av stålkonstruktion', 'Industriellt underhåll', 'Montage av stålkonstruktion', 'Tillverkning i stål'].map((n) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', name: n },
  })),
};

const data = {
  namn: 'PB Industriservice',
  tema: {
    mork: '#0E1116',
    accent: '#F5B301',
    accentHover: '#D99A00',
    accentText: '#7A5000',
    accentLjus: '#FFC83D',
    paAccent: '#0F172A',
  },
  logo: { src: `${M}/logo-pbservice.png`, w: 800, h: 804, alt: 'PB Industriservice', topp: 'vit', ljus: `${M}/logo-pbservice-ljus.png` },
  kontakt: {
    tel: '072 991 77 34',
    telHref: 'tel:+46729917734',
    epost: 'info@pbservice.se',
    adress: 'Pyrusgatan 7, Malmö (Husie)',
    ig: 'https://www.instagram.com/pb_industriservice/',
    igHandle: '@pb_industriservice',
    orgnr: '559122-4596',
  },
  cta: { txt: 'Beskriv jobbet, få offert', kort: 'Begär offert', lank: 'Begär offert' },
  nav: {
    vanster: [{ href: '#tjanster', txt: 'Tjänster' }, { href: '#jobb', txt: 'Våra jobb' }],
    hoger: [{ href: '#om', txt: 'Om oss' }, { href: '#kontakt', txt: 'Kontakt' }],
  },

  hero: {
    ort: 'Malmö · hela Sverige',
    tjanster: ['Industrisvets', 'Stål'],
    video: `${M}/video-hero.mp4`,
    videoMobil: `${M}/video-hero-mobil.mp4`,
    poster: `${M}/poster-hero.jpg`,
    posterMobil: `${M}/poster-hero-mobil.jpg`,
  },
  tejp: ['Industrisvets', 'Reparation', 'Stålkonstruktion', 'Underhåll', 'Montage', 'Tillverkning', 'Malmö', 'Hela Sverige'],

  tjanster: {
    eyebrow: 'Vad vi gör',
    rubrik: ['Svets och stål,', 'där det behövs'],
    lead: 'Vi reparerar, monterar, tillverkar och underhåller stålkonstruktioner åt industri, hamn och fastighet. Vi kommer ut och gör jobbet på plats.',
    kort: [
      { id: 'svetsning', namn: 'Industrisvets & reparation', bild: `${M}/tjanst-svetsning.jpg`, alt: 'Svetsare i skyddsmask svetsar på en stålcylinder i en industrihall', text: 'Sprickor, slitage och skador på stål och utrustning. Vi svetsar på plats så att det kan köras igen.', punkter: ['Reparationssvets på plats', 'Akuta skador och slitage', 'Arbete på höjd och i trånga utrymmen'], ritning: (<><path d="M30 90h140" /><path d="M60 90l40-50 40 50" /><path d="M100 40v-18M88 28l12-6 12 6" /></>) },
      { id: 'underhall', namn: 'Underhåll i industrin', bild: `${M}/tjanst-underhall.jpg`, alt: 'Montör i varselkläder och hjälm inne i en stor transportskruv i en industrianläggning', text: 'Regelbundna kontroller och åtgärder på utrustning och anläggning, så att det inte blir driftstopp i onödan.', punkter: ['Förebyggande underhåll', 'Mekaniskt underhåll i processindustri', 'Planerade stopp'], ritning: (<><circle cx="100" cy="60" r="30" /><circle cx="100" cy="60" r="10" /><path d="M100 18v12M100 90v12M58 60h12M130 60h12" /></>) },
      { id: 'montage', namn: 'Montage av stålkonstruktion', bild: `${M}/tjanst-stalkonstruktion.jpg`, alt: 'Grå stålbalkar och fästen monterade på plats, svetsmask och varselväst på stålet', text: 'Vi monterar balkar, ramar och fästen enligt ritning, i hela Sverige.', punkter: ['Balkar och ramverk', 'Fästen och infästningar', 'Montage efter ritning'], ritning: (<><path d="M30 30h140M30 90h140" /><path d="M40 30l30 60 30-60 30 60 30-60" /></>) },
      { id: 'tillverkning', namn: 'Tillverkning i stål', bild: `${M}/tjanst-tillverkning.jpg`, alt: 'Närbild på en färsk svetsfog längs ett stålrör', text: 'Detaljer, förstärkningar och reservdelar i stål, gjorda efter måtten på plats.', punkter: ['Förstärkningar', 'Specialdetaljer', 'Anpassat efter befintligt'], ritning: (<><path d="M30 80h140v20H30z" /><path d="M60 80V40h80v40" /><path d="M80 40V24h40v16" /></>) },
    ],
  },

  jobb: {
    eyebrow: 'Våra jobb',
    rubrik: ['Fartyg, fabrik', 'och natt'],
    lead: 'Bilder från våra egna jobb, tagna av oss på plats.',
    not: 'Alla bilder är våra egna, från Instagram.',
    tid: '70s',
    rad1: [
      { src: `${M}/jobb-svets-pa-knan.jpg`, alt: 'Svetsare på knä vid ett stålrör i en industrihall', txt: 'Svets på rör' },
      { src: `${M}/jobb-skarbrannare.jpg`, alt: 'Starkt ljus och gnistor från skärning i stål', txt: 'Skärning i stål' },
      { src: `${M}/jobb-stege-schakt.jpg`, alt: 'Montör i varselkläder klättrar på en stege i ett schakt', txt: 'Jobb i schakt' },
      { src: `${M}/jobb-anlaggning-natt.jpg`, alt: 'Upplyst industrianläggning sedd ovanifrån på natten', txt: 'Anläggning på natten' },
      { src: `${M}/jobb-svets-sele.jpg`, alt: 'Svetsare i sele som svetsar högt upp på en stålkonstruktion', txt: 'Svets på höjd' },
      { src: `${M}/jobb-ror-detalj.jpg`, alt: 'Stålrör monterat mot en perforerad plåtvägg', txt: 'Rör på plats' },
    ],
    rad2: [
      { src: `${M}/jobb-svets-hojd.jpg`, alt: 'Svetsljus mot en svetsare högt uppe i en ståltrappa', txt: 'Svets i trapphus' },
      { src: `${M}/jobb-slipning.jpg`, alt: 'Händer i arbetshandskar slipar stål med en vinkelslip', txt: 'Slipning efter svets' },
      { src: `${M}/jobb-gangdack.jpg`, alt: 'Gallerdurk och stålbalkar sedda uppifrån', txt: 'Gångdäck i stål' },
      { src: `${M}/jobb-utsikt-natt.jpg`, alt: 'Stadens ljus på natten sett från en hög plattform', txt: 'Nattskift på höjd' },
      { src: `${M}/jobb-solnedgang-anlaggning.jpg`, alt: 'Industrianläggning i solnedgång med lyftkran', txt: 'Skiftet börjar' },
      { src: `${M}/jobb-inuti-tank.jpg`, alt: 'Insidan av en stor ståltank med svetsfog', txt: 'Inne i tanken' },
    ],
  },

  varfor: {
    eyebrow: 'Varför PB Industriservice',
    rubrik: ['Vi kommer ut', 'och löser det'],
    lead: 'Står något still kostar varje timme. Vi kommer dit där jobbet är, på fartyget, i fabriken eller på taket, och gör det klart. Dag som natt.',
    punkter: [
      { rubrik: 'På plats i hela Sverige', text: 'Verkstad i Husie, Malmö, men vi gör montage och industriservice i hela landet.' },
      { rubrik: 'Bygg och industri', text: 'Bakgrund som resemontör, snickare och montör, så vi förstår både stålet och byggnaden runt det.' },
      { rubrik: 'Bara det som behövs', text: 'Räcker det att laga en fog i stället för att byta hela delen säger vi det.' },
      { rubrik: 'Säkerhet först', text: 'Höjd, trånga utrymmen och heta arbeten planeras innan vi börjar.' },
    ],
    video: `${M}/video-varfor.mp4`,
    poster: `${M}/poster-varfor.jpg`,
    videoAlt: 'Långsam inzoomning mot en upplyst stålkonstruktion på natten. Filmen slutar med logotypen.',
  },

  om: {
    eyebrow: 'Om oss',
    rubrik: ['Från resemontör', 'till eget företag'],
    kortRad: 'Husie, Malmö · sedan 2017',
    stycken: [
      'PBService startades 2017 av Patrik Persson. Resan inom bygg och industri började för ungefär 17 år sedan som resemontör, och sedan dess har det blivit jobb som snickare, plattsättare, murare och montör.',
      'I dag har vi verkstad i Husie i Malmö och tar uppdrag inom svets, underhåll och montage av stålkonstruktion i hela Sverige. Vi trivs bäst på plats, mitt i jobbet.',
    ],
    bevis: [
      { ord: '2017', text: 'startat, aktiebolag i Malmö' },
      { ord: 'F-skatt', text: 'registrerat och momsregistrerat' },
      { ord: 'Hela Sverige', text: 'montage och industriservice' },
    ],
  },

  steg: {
    eyebrow: 'Så går det till',
    rubrik: ['Från samtal', 'till klart jobb'],
    lead: 'Kort och rakt, så att det kan börja fungera igen.',
    lista: [
      { namn: 'Berätta om jobbet', text: 'Ring eller skicka några rader och gärna en bild på skadan eller ritningen.', ikon: 'kontakt' },
      { namn: 'Vi tittar på det', text: 'Vi kommer ut eller går igenom underlaget och säger vad som behöver göras.', ikon: 'besok' },
      { namn: 'Offert', text: 'Du får ett tydligt pris och vad som ingår innan vi börjar.', ikon: 'offert' },
      { namn: 'Jobbet görs', text: 'Vi svetsar, monterar eller lagar på plats och lämnar klart.', ikon: 'klart' },
    ],
  },

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Vad kunderna', 'säger'],
    lista: [
      { namn: 'Industrikund', kalla: 'Reparationssvets', exempel: true, text: 'Här står ett riktigt omdöme från en kund, med namn och företag som de själva skrivit det.' },
      { namn: 'Rederi eller hamn', kalla: 'Montage', exempel: true, text: 'Ett andra kort, hämtat ur er Google-profil när den är på plats.' },
      { namn: 'Fastighetsägare', kalla: 'Stålkonstruktion', exempel: true, text: 'Ett tredje kort. Tre riktiga omdömen räcker för att sidan ska kännas sann.' },
    ],
    not: 'Exempel: byts mot era riktiga omdömen.',
  },

  instagram: {
    eyebrow: 'Instagram',
    rubrik: ['Följ jobben', 'på Instagram'],
    lead: 'Det senaste från vårt konto, direkt från Instagram.',
    bio: 'Reparation, montering, tillverkning, underhåll och montage av stålkonstruktion.',
    koder: ['DeBBu12C7c2', 'DcDa2k0CNfA', 'Dbu5DPgCLCw'],
  },

  fragor: {
    eyebrow: 'Vanliga frågor',
    rubrik: ['Det ni brukar', 'fråga först'],
    lead: 'Pengar och risk först, det praktiska sedan.',
    kort: { rubrik: 'Hittar du inte svaret?', text: 'Ring och beskriv jobbet. Du får ett rakt besked om vad som går.' },
    lista: [
      { q: 'Vad kostar ett svetsjobb?', a: 'Det beror på material, omfattning och var jobbet görs. Skicka en bild och några rader, så får du en offert där det står vad som ingår.' },
      { q: 'Kan ni komma ut på kort varsel?', a: 'Hör av dig direkt när något har gått sönder. Vi säger ärligt när vi kan vara på plats.' },
      { q: 'Var arbetar ni?', a: 'Vi har verkstad i Husie, Malmö, och arbetar i Skåne och i hela Sverige med montage och industriservice.' },
      { q: 'Svetsar ni på fartyg och i hamn?', a: 'Ja. Vi har gjort jobb på fartyg och i hamnmiljö, och i industrianläggningar dag som natt.' },
      { q: 'Kan ni ta underhåll löpande?', a: 'Ja. Vi gör regelbundna kontroller och åtgärder så att utrustningen håller längre och stoppen blir färre.' },
      { q: 'Tillverkar ni detaljer efter mått?', a: 'Ja. Förstärkningar, fästen och specialdetaljer i stål, gjorda efter måtten på plats eller efter ritning.' },
      { q: 'Är ni ett registrerat företag?', a: 'Ja. Persson Brothers Service AB, org.nr 559122-4596, med F-skatt.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Beskriv jobbet,', 'vi hör av oss'],
    lead: 'Skriv vad som ska göras och var. En bild säger ofta mest, skicka den gärna efteråt.',
    checkar: ['Svets, montage och underhåll', 'Tydlig offert innan vi börjar', 'På plats i hela Sverige'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta kort om jobbet',
    placeholder: 'Var är jobbet, vad ska svetsas eller monteras, och när behöver det vara klart?',
    formNot: 'Skriv kort om jobbet, så kan vi ge ett vettigt svar redan i första samtalet.',
    meddelandeEtikett: 'Kort om jobbet',
  },

  popup: {
    rubrik: 'Något som står still?',
    text: 'Beskriv skadan eller jobbet, så hör vi av oss med ett rakt besked.',
  },

  footer: {
    text: 'Industrisvets, reparation, underhåll, tillverkning och montage av stålkonstruktion. Verkstad i Husie, Malmö. Uppdrag i hela Sverige.',
  },

  modal: {
    rubrik: 'Så här kan PB Industriservice se ut på nätet',
    text: 'Det här är ett kostnadsfritt förslag, byggt på det ni själva visar på Instagram och pbservice.se, med era egna bilder. Filmen överst är en illustration gjord ur ert eget fartygsfoto. Formuläret landar ännu inte i er inkorg. Vill ni se den skarpt? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.',
  },
};

export default function PbIndustriserviceDemo() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <DemoSida data={data} />
    </>
  );
}
