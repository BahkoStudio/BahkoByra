import { skapadAv } from '../gdmaleri/_gd';

/* Gemensamt för alla Bromma-sidor (startsida + landningssidor). VERIFIERAT/FLAGGOR: page.js. */
export const M = '/bromma/media';
export const DOMAN = 'https://brommatradgardsservice.se';
const FILBAS = 'https://www.bahkobyra.se';

// Landningssidorna. Sluggarna tradgardsskotsel/, hackklippning/ och tradgardsskotsel-brf/ är
// samma som på nuvarande brommatradgardsservice.se, så inga URL:er försvinner vid domänbytet.
export const SIDOR = [
  { href: '/bromma/snorojning/', txt: 'Snöröjning och halkbekämpning' },
  { href: '/bromma/tradgardsskotsel-brf/', txt: 'Skötselavtal för BRF' },
  { href: '/bromma/tradgardsskotsel/', txt: 'Trädgårdsskötsel' },
  { href: '/bromma/hackklippning/', txt: 'Häckklippning och häckplantering' },
];
export const SKV_RUT = 'https://www.skatteverket.se/privat/etjansterochblanketter/svarpavanligafragor/rotochrutarbete/privatrotochrutarbetefaq/vilkentypavtradgardsarbetekanjagfarutavdragfor.5.64a656d113f4c75970170a.html';
export const SKV_BRF = 'https://www.skatteverket.se/privat/etjansterochblanketter/svarpavanligafragor/rotochrutarbete/privatrotochrutarbetefaq/kanvisomarmedlemmarienbostadsrattsforeningfaavdragforrutarbeteomvilaterforetagetsomstadartrapphusetochtvattstuganfaktureraossistalletforforeningen.5.383cc9f31134f01c98a80003209.html';

export const foretag = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  '@id': `${DOMAN}/#business`,
  name: 'Bromma Trädgårdsservice',
  url: `${DOMAN}/`,
  logo: `${FILBAS}/bromma/media/logo-ljus.png`,
  image: `${FILBAS}/bromma/media/anlagd-tradgard-planteringar.webp`,
  description: 'Snöröjning och halkbekämpning, trädgårdsskötsel, häckar, anläggning och skötselavtal för BRF i Bromma och Storstockholm.',
  telephone: '+46707666514',
  email: 'jens@brommatradgardsservice.se',
  address: { '@type': 'PostalAddress', addressLocality: 'Bromma', addressRegion: 'Stockholms län', addressCountry: 'SE' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '07:00', closes: '22:00' },
  areaServed: ['Bromma','Västerort','Täby','Lidingö','Nacka','Saltsjö-Boo','Ekerö','Salem','Rönninge','Solna','Sundbyberg','Stockholm'].map((name) => ({ '@type': 'Place', name })),
  sameAs: ['https://www.instagram.com/brommatradgardsservice/', 'https://maps.google.com/?cid=3748114357443815533'],
};
export const tjanstSchema = ({ namn, typ, beskrivning }) => ({
  '@context': 'https://schema.org', '@type': 'Service', name: namn, serviceType: typ, description: beskrivning,
  provider: { '@type': 'HomeAndConstructionBusiness', '@id': `${DOMAN}/#business`, name: 'Bromma Trädgårdsservice', telephone: '+46707666514' },
  areaServed: foretag.areaServed,
});
// FAQPage bara för synlig text på sidan (frågorna står ordagrant i fragor.lista). a måste vara ren sträng.
export const faqSchema = (lista) => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: lista.filter((f) => typeof f.a === 'string').map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});
export const navUndersida = {
  vanster: [{ href: '#tjanster', txt: 'Tjänster' }, { href: '#omdomen', txt: 'Omdömen' }],
  hoger: [{ href: '#fragor', txt: 'Frågor' }, { href: '/bromma/', txt: 'Startsida' }],
};

export const GOOGLE = 'https://maps.google.com/?cid=3748114357443815533';
const G = (namn, kalla, text) => ({ namn, kalla, google: true, text });
const E = (namn, kalla, text) => ({ namn, kalla, text });

export const bas = {
  namn: 'Bromma Trädgårdsservice',
  tema: { mork: '#0E1A12', accent: '#2E6E2C', accentHover: '#255A24', accentText: '#2A6428', accentLjus: '#9FE08A', paAccent: '#fff' },
  logo: { src: `${M}/logo-ljus.png`, ljus: `${M}/logo.png`, w: 1920, h: 600, alt: 'Bromma Trädgårdsservice', topp: 'fri' },
  kontakt: {
    tel: '070-766 65 14',
    telHref: 'tel:+46707666514',
    epost: 'jens@brommatradgardsservice.se',
    ig: 'https://www.instagram.com/brommatradgardsservice/',
    igHandle: '@brommatradgardsservice',
    oppet: 'Alla dagar 07–22',
  },
  cta: { txt: 'Boka kostnadsfritt besök', kort: 'Begär offert', lank: 'Begär offert' },
  formular: {
    nyckel: '62471305-bee5-477f-bc2b-b0d6fffffa58',
    amne: 'Ny förfrågan via brommatradgardsservice.se',
    fran: 'Bromma Trädgårdsservice hemsida',
    kvittens: ['Tack! Din förfrågan är skickad.', 'Du får svar inom 24 timmar. Har du bråttom, ring 070-766 65 14.'],
  },
  nav: {
    vanster: [{ href: '#tjanster', txt: 'Tjänster' }, { href: '#jobb', txt: 'Våra jobb' }],
    hoger: [{ href: '#omdomen', txt: 'Omdömen' }, { href: '#fragor', txt: 'Frågor' }],
  },

  hero: {
    rubrik: { fraga: 'Snöröjning i Bromma och Stockholm', svar: 'Snö & Trädgård.' },
    video: `${M}/video-hero.mp4`,
    videoMobil: `${M}/video-hero-mobil.mp4`,
    poster: `${M}/poster-hero.jpg`,
    posterMobil: `${M}/poster-hero-mobil.jpg`,
  },
  tejp: ['Snöröjning', 'Halkbekämpning', 'Uppfarter och gångar', 'Parkeringar', 'Skötselavtal för BRF', 'Samma kontaktperson året om', 'Kostnadsfritt hembesök', 'Svar inom 24 timmar', 'Fem stjärnor på Google'],

  tjanster: {
    eyebrow: 'Vad vi gör',
    rubrik: ['Snö på vintern,', 'trädgård resten av året'],
    lead: 'Vi röjer uppfarter, gångar och parkeringar hela vintersäsongen. När snön smält är det samma team som klipper, planterar och anlägger.',
    lattKort: true,
    kort: [
      { id: 'sno', lank: { href: '/bromma/snorojning/', txt: 'Allt om snöröjning' }, namn: 'Snöröjning och halkbekämpning', bild: `${M}/snorojning-illustration.webp`, alt: 'Illustrationsbild: nyskottad uppfart framför en röd villa en vintermorgon', text: 'Uppfarter, gångar och parkeringar röjs genom hela vintern.', punkter: ['Uppfarter och gångar', 'Parkeringar', 'Halkbekämpning vid behov'], ritning: (<><path d="M100 14v92M60 37l80 46M60 83l80-46" /><path d="M88 22l12 10 12-10M88 98l12-10 12 10" /></>) },
      { id: 'brf', lank: { href: '/bromma/tradgardsskotsel-brf/', txt: 'Allt om skötselavtal' }, namn: 'Skötselavtal för BRF', bild: `${M}/efter-klippt-grasmatta-rabatter.webp`, alt: 'Nyklippt gräsmatta och rensade rabatter', text: 'Snöröjning på vintern, gräs, häck och löv på sommaren. Ett avtal.', punkter: ['Bostadsrättsföreningar', 'Fastighetsägare', 'En kontaktperson'], ritning: (<><path d="M30 100V40h60v60M110 100V20h60v80M20 100h160" /></>) },
      { id: 'skotsel', lank: { href: '/bromma/tradgardsskotsel/', txt: 'Allt om trädgårdsskötsel' }, namn: 'Trädgårdsskötsel', bild: `${M}/nyplanterad-hack-raka-linjer.webp`, alt: 'Nyplanterad häck i raka linjer', text: 'Gräs, häck, ogräs och beskärning, med fast intervall eller efter behov.', punkter: ['Gräs- och häckklippning', 'Beskärning', 'RUT på arbetet'], ritning: (<><path d="M20 100h160M40 100V60M70 100V50M100 100V45M130 100V50M160 100V60" /></>) },
      { id: 'anlaggning', namn: 'Anläggning och gräsmatta', bild: `${M}/nyanlagd-grasmatta-skarpa-kanter.webp`, alt: 'Nyanlagd gräsmatta med skarpa kanter', text: 'Planera vårens trädgård nu. Från markarbete till färdigt rullgräs.', punkter: ['Markarbete och jordutjämning', 'Rullgräs och sprinklers', 'Bortforsling ingår'], ritning: (<><path d="M14 100h172M30 100c20-30 40-30 60 0M90 100c20-40 50-40 80 0" /></>) },
    ],
  },

  jobb: {
    eyebrow: 'Våra jobb',
    rubrik: ['Före och efter,', 'med egna maskiner'],
    lead: 'Bilderna är från våra egna jobb i Storstockholm.',
    tid: '60s',
    rad1: [
      { src: `${M}/fore-igenvuxen-tradgard.webp`, alt: 'Igenvuxen trädgård före arbetet', txt: 'Före: igenvuxen trädgård' },
      { src: `${M}/f-fore-1.webp`, alt: 'Igenvuxen tomt sedd från ena hörnet', txt: 'Före röjningen' },
      { src: `${M}/f-fore-4.webp`, alt: 'Högt gräs och sly på tomten', txt: 'Sly och högt gräs' },
      { src: `${M}/f-fore-7.webp`, alt: 'Tomten innan arbetet börjar', txt: 'Innan vi börjar' },
      { src: `${M}/anlagd-tradgard-planteringar.webp`, alt: 'Färdiganlagd trädgård med planteringar', txt: 'Anlagd trädgård' },
    ],
    rad2: [
      { src: `${M}/f-efter-1.webp`, alt: 'Samma tomt efter klippning', txt: 'Efter: klippt och rensat' },
      { src: `${M}/f-efter-4.webp`, alt: 'Klippt gräsmatta och raka kanter', txt: 'Raka kanter' },
      { src: `${M}/f-efter-7.webp`, alt: 'Tomten färdig och städad', txt: 'Klart och bortkört' },
      { src: `${M}/poster-varfor.jpg`, alt: 'Klippt trädgård efter arbetet', txt: 'Efter skötsel' },
      { src: `${M}/jobb-fore-ovan.jpg`, alt: 'Igenvuxen trädgård från ovan', txt: 'Före, från ovan' },
    ],
  },

  varfor: {
    eyebrow: 'Varför Bromma Trädgårdsservice',
    rubrik: ['Samma team', 'året om'],
    lead: 'Den som svarar i telefon är samma person som leder jobbet. På sommaren i trädgården, på vintern på uppfarten.',
    punkter: [
      { rubrik: 'En kontaktperson', text: 'Jens leder arbetet och är den du pratar med, från första besöket till sista lasset.' },
      { rubrik: 'Fyra personer', text: 'Blir någon sjuk sätts en ersättare in. Ett bokat jobb blir inte liggande.' },
      { rubrik: 'Pris innan start', text: 'Vi kommer ut och räknar. Tillkommer något hör vi av oss innan vi gör det.' },
      { rubrik: 'Egna maskiner', text: 'Minigrävare, Avant kompaktlastare och Husqvarna. Ingen väntan på inhyrd utrustning.' },
    ],
    video: `${M}/video-varfor.mp4`,
    poster: `${M}/poster-varfor.jpg`,
    videoAlt: 'Brommas egen film: en klippt och städad trädgård efter arbetet.',
  },

  om: {
    eyebrow: 'Om oss',
    rubrik: ['Vi gör hela', 'jobbet själva'],
    stycken: [
      'Bromma Trädgårdsservice är ett litet team från Bromma. Jens Amnesten leder arbetet på plats och är den du har kontakt med.',
      'Vi jobbar åt villaägare, bostadsrättsföreningar och fastighetsägare i hela Storstockholm. På vintern håller vi uppfarter, gångar och parkeringar fria från snö och is.',
    ],
    bevis: [
      { ord: '5 av 5', text: 'på varje omdöme på Google' },
      { ord: '24 timmar', text: 'till svar på din förfrågan' },
      { ord: '0 kr', text: 'kostar hembesöket' },
    ],
  },

  steg: {
    eyebrow: 'Så går det till',
    rubrik: ['Fyra steg,', 'inga överraskningar'],
    lista: [
      { namn: 'Du hör av dig', text: 'Ring eller skicka en förfrågan. Svar inom 24 timmar från den som gör jobbet.', ikon: 'kontakt' },
      { namn: 'Vi kommer ut', text: 'Vi går igenom tomten eller uppfarten med dig. Besöket är gratis.', ikon: 'offert' },
      { namn: 'Du får priset', text: 'Allt inräknat. Tillkommer något hör vi av oss först.', ikon: 'arbete' },
      { namn: 'Vi gör klart', text: 'På utsatt tid, och vi lämnar det städat efter oss.', ikon: 'klart' },
    ],
  },

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Vad kunderna', 'faktiskt säger'],
    googleLista: [
      G('Marta Bronowicka', 'Tujahäck, Rönninge', 'Vi är supernöjda med vår nya tujahäck! Från första kontakt har det varit otroligt smidigt, de är extremt pålitliga och lätta att kommunicera med. Det märks att de kan sin sak, vi kunde diskutera olika lösningar och fick ett proffsigt bemötande hela vägen. Arbetet utfördes snabbt, noggrant och med ett strålande resultat.'),
      G('Christoffer Rydberg', 'Jordutjämning, Saltsjö-Boo', 'Väldigt nöjd med avjämning av trädgården från lerhögar till plan trädgård där gräset kommer växa fin fint!'),
      G('Albert Ribeh', 'Recension på Google', 'Hög kvalitet och mycket bra service! Kan varmt rekommendera.'),
      G('Felix Janson', 'Recension på Google', 'Toppenverksamhet! Jens är verkligen trevlig och engagerad.'),
      G('Marina Karromy', 'Recension på Google', 'Trevligt bemötande och smidig kontakt. Rekommenderas väldigt starkt!'),
      G('Jaba Napishvili', 'Recension på Google', 'Vi är otroligt nöjda. Proffsig service och bra kommunikation.'),
    ],
    lista: [
      E('Sifat Bin', 'Häckbyte, Rönninge', 'Jag är otroligt nöjd med servicen, verkligen en helhetslösning från början till slut. Jens är mycket kunnig, effektiv och snabb i sitt arbete. De hjälpte till med hela häckprojektet, från beställning av material till leverans av jord och täckmaterial, samt borttagning och bortforsling av den gamla häcken. Priset var dessutom mycket rimligt, lägre än många andra företag.'),
      E('Martin', 'Gräsmatta 100 kvm, Lidingö', 'Snabba, duktiga och klart inom budget. Satte in ny gräsmatta på en besvärlig tomt med mycket manuellt arbete. De satte även in sprinklers vi hade köpt på ett bra sätt.'),
      E('Thomas', 'Trädgårdsskötsel, Ekerö', 'Mycket professionellt utfört arbete. Kom i tid och höll utlovad plan. Rekommenderas starkt!'),
    ],
    not: 'Omdömen märkta med Google kommer från företagets Google-profil och återges i original.',
    lank: { href: GOOGLE, txt: 'Läs alla på Google' },
  },

  fragor: {
    eyebrow: 'Vanliga frågor',
    rubrik: ['Frågor vi', 'får ofta'],
    kort: { rubrik: 'Hittar du inte svaret?', text: 'Ring 070-766 65 14 så får du besked direkt.' },
    lista: [
      { q: 'Vad röjer ni på vintern?', a: 'Uppfarter, gångar och parkeringar, genom hela vintersäsongen. Halkbekämpning gör vi vid behov.' },
      { q: 'Kan en BRF få snöröjning och sommarskötsel i samma avtal?', a: 'Ja. Gräs, häckar, rabatter och löv genom säsongen och snöröjning genom vintern, i samma avtal och med samma kontaktperson.' },
      { q: 'Vad kostar det?', a: 'Det beror på ytan och åtkomsten. Därför ger vi inget pris per telefon. Vi kommer ut gratis, räknar och du får ett pris med allt inräknat innan vi börjar.' },
      { q: 'Får jag rutavdrag på trädgårdsarbete?', a: 'På skötsel, ja: gräsklippning, häckklippning, ogräsrensning, krattning och beskärning. På nyanläggning, nej. Vi delar upp posterna på fakturan så att avdraget hamnar rätt.' },
      { q: 'Måste jag vara hemma när ni jobbar?', a: 'Nej. Vi går igenom jobbet vid hembesöket och sköter resten själva.' },
      { q: 'Vilka områden kör ni till?', a: 'Vi utgår från Bromma och tar jobb i hela Storstockholm, bland annat Västerort, Täby, Lidingö, Nacka, Saltsjö-Boo, Ekerö, Salem, Rönninge, Solna och Sundbyberg.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Boka innan', 'snön kommer'],
    lead: 'Skriv några rader om uppfarten, gången eller tomten. Du får svar inom 24 timmar med ett pris eller en tid för hembesök.',
    checkar: ['Svar inom 24 timmar', 'Kostnadsfritt hembesök', 'Ingen bindning'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta kort vad som ska göras',
    placeholder: 'Snöröjning, skötsel eller anläggning, ungefärlig yta och var du bor',
    kundtyp: ['Privatperson', 'BRF', 'Företag'],
    formNot: 'Vi svarar inom 24 timmar.',
    epostNamn: 'email',
  },

  popup: { rubrik: 'Snöröjning i vinter?', text: 'Boka ett gratis besök så har du priset klart innan snön kommer.' },

  footer: {
    text: 'Snöröjning, halkbekämpning och trädgårdsservice i Bromma och hela Storstockholm. Kostnadsfritt hembesök och pris innan start.',
    tjanster: SIDOR.map(({ href, txt }) => ({ href, txt })),
  },

  kund: true,
  skapadAv,
};

