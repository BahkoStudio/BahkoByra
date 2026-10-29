import DemoSida from '../_mall/DemoSida';

/* ===========================================================================
   GOLDEN STÄDSERVICE 24 — kostnadsfritt hemsideförslag från Bahko Byrå (varm lead)
   Lead: tips 2026-10-29 från en befintlig kontakt, IG @gbygg24 (Golden
   Byggservice 24 AB, gbygg24.se), som har samma ägare. Golden Städservice har
   ingen egen hemsida, Instagram eller Facebook som gått att hitta.
   Byggd 2026-10-29 på demomallen v3 (närmast: fonsterproffset).

   Bärande idé: städningen som gör en lokal klar att använda. Byggstädning när
   hantverkarna gått, lokalvård när verksamheten är igång. Ett företag i Malmö.

   VERIFIERAT (2026-10-29):
   - Register (bolagsfakta, ratsit, syna, alltombolag, hitta, eniro):
     Golden Städservice 24 AB, org.nr 559422-3397, säte Malmö, adress
     Hyacintgatan 33, 215 26 Malmö (c/o Besim Topalli), bildat 2023-02-03,
     registrerat 2023-02-16, nuvarande namn registrerat 2026-02-09, aktivt,
     F-skatt sedan 2023-07-14, moms, registrerad arbetsgivare.
     Verksamhetsbeskrivning: "byggstädning samt lokalvård och övriga
     byggnadsarbeten". Styrelse: Besim Topalli (ledamot), Nimetula Ali (suppleant).
   - Systerbolag: Golden Byggservice 24 AB (559445-1816), samma styrelse, samma
     adress, sajt gbygg24.se med telefon 070-665 60 03 och info@gbygg24.se.
   - Telefon 070-665 60 03: gavs av ägaren via IG-DM 2026-10-29 (gbygg24) för
     Golden Städservice. Inget eget publicerat nummer för Golden Städservice hittat.

   INTE verifierat, och finns därför INTE på sidan: e-post för Golden
   Städservice, logotyp, orter utöver Malmö, hemstädning, flyttstäd,
   fönsterputs, priser, RUT, försäkring, garantier, omdömen, antal anställda,
   svarstider, öppettider.

   FLAGGOR:
   - Formuläret går till mathias@bahkobyra.se (demonyckeln).
   - ALLA BILDER ÄR FRIA BILDBANKSFOTON (Pexels), inte deras egna och inte
     genererade. Märkt under jobbanden. Personerna är modeller, inte personal.
   - Hero: långsam zoom (ffmpeg) över ett Pexels-foto, ingen Higgsfield (0 USD).
     Stående mobilfilm = utsnitt av den liggande.
   - Ingen logotyp: ordmärke. Inga omdömen: sektionen visar inga kort.
   =========================================================================== */

export const metadata = {
  title: 'Byggstädning och lokalvård i Malmö — Golden Städservice',
  description:
    'Byggstädning och lokalvård i Malmö. Golden Städservice städar bort byggdamm och skräp efter bygget och håller lokalen ren. Ring 070-665 60 03 eller be om offert.',
  robots: { index: false, follow: false },
};

const M = '/goldenstadservice/media';
const TEL = '070-665 60 03';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Golden Städservice',
  legalName: 'Golden Städservice 24 AB',
  telephone: '+46706656003',
  address: { '@type': 'PostalAddress', streetAddress: 'Hyacintgatan 33', postalCode: '215 26', addressLocality: 'Malmö', addressCountry: 'SE' },
  areaServed: { '@type': 'City', name: 'Malmö' },
  makesOffer: [
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Byggstädning' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Lokalvård' } },
  ],
};

const data = {
  namn: 'Golden Städservice',
  ordmarke: 'Golden Städservice',
  tema: {
    mork: '#0E1A2B',
    accent: '#E8B23A',
    accentHover: '#D9A32C',
    accentText: '#8A5B00',
    accentLjus: '#F2C14E',
    paAccent: '#0F172A',
  },
  kontakt: {
    tel: TEL,
    telHref: 'tel:+46706656003',
    adress: 'Malmö',
    orgnr: '559422-3397',
  },
  cta: { txt: 'Be om offert', kort: 'Be om offert', lank: 'Be om offert' },
  nav: {
    vanster: [{ href: '#tjanster', txt: 'Städning' }, { href: '#process', txt: 'Så går det till' }],
    hoger: [{ href: '#fragor', txt: 'Frågor' }, { href: '#kontakt', txt: 'Kontakt' }],
  },

  hero: {
    ort: 'Malmö',
    tjanster: ['Byggstädning', 'Lokalvård'],
    video: `${M}/video-hero.mp4`,
    videoMobil: `${M}/video-hero-mobil.mp4`,
    poster: `${M}/poster-hero.jpg`,
    posterMobil: `${M}/poster-hero-mobil.jpg`,
  },
  tejp: ['Byggstädning', 'Malmö', 'Lokalvård', 'Efter bygget', 'Städfirma Malmö', 'Rena lokaler', 'Byggdamm bort', 'Skåne'],

  tjanster: {
    eyebrow: 'Städning i Malmö',
    rubrik: ['Byggstädning och lokalvård', 'i Malmö'],
    lead: 'Vi städar när bygget är klart och när lokalen är i gång. Berätta vad som ska göras, så får du en offert.',
    kolumner: 3,
    kort: [
      {
        id: 'byggstadning',
        namn: 'Byggstädning',
        bild: `${M}/tjanst-byggstadning.jpg`,
        alt: 'Person dammsuger golvet i ett nyrenoverat kök',
        text: 'Efter renovering eller nybygge: byggdamm, smuts och skräp bort, så att lokalen eller bostaden kan tas i bruk.',
        punkter: ['Efter renovering', 'Efter nybygge', 'Klart att flytta in'],
        ritning: (<><path d="M30 60l70-45 70 45" /><path d="M45 52v53h110V52" /><path d="M70 105l20-30M110 105l20-30" /></>),
      },
      {
        id: 'lokalvard',
        namn: 'Lokalvård',
        bild: `${M}/tjanst-lokalvard.jpg`,
        alt: 'Städvagn med moppar och hinkar i en korridor med tegelvägg',
        text: 'Städning av lokaler, upplagd efter hur ni använder dem.',
        punkter: ['Lokaler', 'Efter era behov', 'I Malmö'],
        ritning: (<><path d="M40 15h120v90H40z" /><path d="M40 45h120M80 15v90" /><path d="M20 105h160" /></>),
      },
      {
        id: 'offert',
        namn: 'Offert',
        bild: `${M}/tjanst-offert.jpg`,
        alt: 'Sprayflaska och städmaterial på ett ljust träbord',
        text: 'Skriv vad som ska städas, var och när. Vi hör av oss med ett förslag.',
        punkter: ['Byggstädning eller lokalvård', 'Säg var och när', 'Svar från oss'],
        ritning: (<><path d="M60 10h80v100H60z" /><path d="M75 35h50M75 55h50M75 75h30" /></>),
      },
    ],
  },

  jobb: {
    eyebrow: 'Rent och klart',
    rubrik: ['Från byggdamm', 'till blank yta'],
    lead: 'Så ser städning ut när den görs ordentligt.',
    not: 'Illustrationsbilder från bildbank. Byts mot era egna foton.',
    tid: '60s',
    rad1: [
      { src: `${M}/jobb-a0.jpg`, alt: 'Städare i orange arbetskläder fyller en hink vid en köksö', txt: 'Kök' },
      { src: `${M}/jobb-a1.jpg`, alt: 'Städare moppar golvet i ett ljust kök', txt: 'Golv' },
      { src: `${M}/jobb-a2.jpg`, alt: 'Städare torkar glas i ett kök med matbord', txt: 'Glasytor' },
      { src: `${M}/jobb-a3.jpg`, alt: 'Person i handskar torkar av ett träbord', txt: 'Ytor' },
      { src: `${M}/jobb-a4.jpg`, alt: 'Gul handske torkar en duschvägg', txt: 'Badrum' },
    ],
    rad2: [
      { src: `${M}/jobb-b0.jpg`, alt: 'Städare med städvagn i en stor ljus hall', txt: 'Lokaler' },
      { src: `${M}/jobb-b1.jpg`, alt: 'Städare moppar golvet i ett lager', txt: 'Stora golv' },
      { src: `${M}/jobb-b2.jpg`, alt: 'Städare torkar ett högt fönster med skaft', txt: 'Höga fönster' },
      { src: `${M}/jobb-b3.jpg`, alt: 'Städare torkar en fönsterkarm', txt: 'Karmar' },
      { src: `${M}/jobb-b4.jpg`, alt: 'Man drar en skrapa över ett skyltfönster', txt: 'Skyltfönster' },
      { src: `${M}/jobb-b5.jpg`, alt: 'Städare med mopp i ett ljust rum', txt: 'Slutstäd' },
    ],
  },

  varfor: {
    eyebrow: 'Varför Golden Städservice',
    rubrik: ['Städningen som gör', 'lokalen klar att använda'],
    lead: 'När hantverkarna har gått ska det gå att flytta in. Vi tar byggdammet och skräpet, och vi kan hålla lokalen ren efteråt.',
    punkter: [
      { rubrik: 'Byggstädning', text: 'Damm, smuts och skräp efter renovering eller nybygge.' },
      { rubrik: 'Lokalvård', text: 'Städning av lokaler, upplagd efter era behov.' },
      { rubrik: 'Lokalt i Malmö', text: 'Vi finns i Malmö, nära jobbet.' },
      { rubrik: 'Ett samtal räcker', text: 'Ring eller skriv, så går vi igenom jobbet med dig.' },
    ],
    video: `${M}/video-varfor.mp4`,
    poster: `${M}/poster-varfor.jpg`,
    videoAlt: 'Långsam inzoomning över ett städteam i ett ljust vardagsrum. Filmen slutar med namnet Golden Städservice.',
  },

  om: {
    eyebrow: 'Om Golden Städservice',
    rubrik: ['Ett städföretag', 'från Malmö'],
    kortRad: 'Malmö',
    stycken: [
      'Golden Städservice 24 AB är ett aktiebolag i Malmö som arbetar med byggstädning och lokalvård.',
      'Vi är systerföretag till Golden Byggservice 24, med samma ägare och samma adress i Malmö.',
    ],
    bevis: [
      { ord: 'F-skatt', text: 'registrerat hos Skatteverket' },
      { ord: 'Aktiebolag', text: 'org.nr 559422-3397' },
      { ord: 'Malmö', text: 'Hyacintgatan 33' },
    ],
  },

  steg: {
    eyebrow: 'Så går det till',
    rubrik: ['Enkelt', 'från första samtalet'],
    lead: 'Från förfrågan till ren lokal.',
    lista: [
      { namn: 'Hör av dig', ikon: 'kontakt', text: 'Ring eller skriv vad som ska städas, var och när.' },
      { namn: 'Offert', ikon: 'offert', text: 'Vi går igenom jobbet och ger dig ett förslag.' },
      { namn: 'Städning', ikon: 'arbete', text: 'Vi städar enligt det vi kommit överens om.' },
      { namn: 'Klart', ikon: 'klart', text: 'Lokalen är redo att användas.' },
    ],
  },

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Vad kunderna', 'säger'],
    lista: [],
    not: 'Här visas era riktiga Google-omdömen när profilen är kopplad.',
  },

  fragor: {
    eyebrow: 'Vanliga frågor',
    rubrik: ['Det du kanske', 'undrar först'],
    lead: 'Pengar och risk först, det praktiska sedan.',
    kort: { rubrik: 'Hittar du inte svaret?', text: 'Ring oss, eller skicka några rader om jobbet.' },
    lista: [
      { q: 'Vad kostar byggstädning?', a: 'Det beror på ytan, hur mycket som ska göras och när. Skriv några rader eller ring, så får du en offert.' },
      { q: 'Vad ingår i byggstädning?', a: 'Byggstädning tar bort byggdamm, smuts och skräp efter renovering eller nybygge, så att lokalen eller bostaden kan tas i bruk. Vi går igenom vad just ditt jobb behöver.' },
      { q: 'Var städar ni?', a: 'Vi finns i Malmö. Ligger jobbet en bit utanför: hör av dig ändå.' },
      { q: 'Gör ni lokalvård löpande?', a: 'Vi arbetar med lokalvård. Berätta hur lokalen används, så lägger vi upp städningen efter det.' },
      { q: 'Kan jag få RUT-avdrag?', a: (<>RUT gäller hushållsnära tjänster i hemmet. Reglerna står hos <a href="https://www.skatteverket.se/privat/fastigheterochbostad/rotarbeteochrutarbete.4.2e56d4ba1202f95012080002966.html" target="_blank" rel="noopener">Skatteverket</a>.</>) },
      { q: 'Har ni F-skatt?', a: 'Ja, Golden Städservice 24 AB är registrerat för F-skatt.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Be om', 'en offert'],
    lead: 'Skriv vad som ska städas, var och när, eller ring.',
    checkar: ['Byggstädning och lokalvård', 'I Malmö', 'Offert innan vi börjar'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta kort om jobbet',
    placeholder: 'Vad ska städas (byggstädning eller lokal), ungefär hur stor yta, var i Malmö och när',
    typer: ['Byggstädning', 'Lokalvård', 'Offert'],
    kundtyp: ['Privatperson', 'Företag', 'BRF'],
    meddelandeEtikett: 'Kort om jobbet',
    formNot: 'Inga massutskick, ingen säljlista.',
  },

  popup: {
    rubrik: 'Byggstädning i Malmö?',
    text: 'Skriv vad som ska städas, så får du en offert.',
  },

  footer: {
    text: 'Byggstädning och lokalvård i Malmö. Golden Städservice 24 AB, Hyacintgatan 33, 215 26 Malmö.',
  },

  modal: {
    rubrik: 'Så här kan Golden Städservice se ut på nätet',
    text: 'Det här är ett kostnadsfritt förslag, byggt för att fler i Malmö som söker byggstädning och lokalvård ska hitta er och höra av sig. Bilderna är lånade från en bildbank och byts mot era egna. Formuläret landar ännu inte i er inkorg. Vill ni se den skarpt? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.',
  },
};

export default function GoldenStadserviceDemo() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <DemoSida data={data} />
    </>
  );
}
