/* ===========================================================================
   RENA RÖR I VÄST AB — delad data för startsidan och alla undersidor.
   Understrecket gör filen osynlig för routern (som gdmaleri/_gd.js).

   2026-11-11 kväll, Mathias: "gör det som en riktig sida" (kund: true, ingen
   Bahko-knapp), "varje tjänst ska ha en landningssida, varje plats ska ha en
   landningssida där han jobbar", en BRF-sida i footern, prislistan i heron och
   footern, sifferraden efter heron, omdömen som klisterlappar i ett band, 3D-märken
   på tjänsterna som på bahkobyra.se, Göteborg i footern, inga anställdas namn i
   texterna, mindre text. Källor och flaggor: se page.js (VERIFIERAT) och
   1-byran/intern-tillvaxt/leads/renaror.md.
   =========================================================================== */

export const M = '/renaror/media';
export const BAS = '/renaror';
export const TEL = '070-413 97 00';
export const TELHREF = 'tel:+46704139700';
export const GOOGLE = 'https://maps.google.com/?cid=11694852875622201275';

export const ORTNAMN = ['Göteborg', 'Partille', 'Mölndal', 'Kungsbacka', 'Kungälv', 'Ale', 'Mölnlycke'];

export const tema = {
  mork: '#0A1420',
  accent: '#FFBB00',
  accentHover: '#E6A800',
  accentText: '#8A5A00',
  accentLjus: '#FFC933',
  paAccent: '#0F172A',
};

export const logo = { src: `${M}/logo-renaror.png`, w: 972, h: 417, alt: 'Rena Rör i Väst' };

export const kontakt = {
  tel: TEL,
  telHref: TELHREF,
  epost: 'kontakt@renaror.se',
  adress: 'Bååthsgatan 5, 417 20 Göteborg',
  oppet: 'Jour dygnet runt, året runt',
  ig: 'https://www.instagram.com/renaror/',
  igHandle: '@renaror',
  orgnr: '556921-8927',
};

export const cta = { txt: 'Boka tid', kort: 'Boka tid', lank: 'Boka tid' };

// Formuläret: demonyckeln (förfrågan landar hos Mathias) tills Rena Rör har en egen nyckel, men
// utan förslagstext i ämne och avsändare, eftersom sidan ska se ut som deras egen.
export const formular = { amne: 'Rena Rör: ny förfrågan från hemsidan', fran: 'Rena Rör hemsida' };

/* Tjänstesidorna. marke = 3D-märket (GPT Image 2.5, 2026-11-11). */
export const TJANSTER = [
  { slug: 'avloppsspolning', namn: 'Avloppsspolning', kort: 'Spolning', marke: 'spolning', bild: 'tjanst-spolning.jpg' },
  { slug: 'rorinspektion', namn: 'Rörinspektion med kamera', kort: 'Rörinspektion', marke: 'kamera', bild: 'tjanst-kamera.jpg' },
  { slug: 'stamspolning', namn: 'Stamspolning', kort: 'Stamspolning', marke: 'stam', bild: 'tjanst-stam.jpg' },
  { slug: 'avloppsjour', namn: 'Avloppsjour dygnet runt', kort: 'Avloppsjour', marke: 'jour', bild: 'tjanst-jour.jpg' },
  { slug: 'avloppsbrunn', namn: 'Avloppsbrunnar och pumpbrunnar', kort: 'Brunnar', marke: 'brunn', bild: 'tjanst-brunn.jpg' },
  { slug: 'byta-avlopp', namn: 'Byta avlopp', kort: 'Byta avlopp', marke: 'byte', bild: 'tjanst-byte.jpg' },
];
export const href = (slug) => `${BAS}/${slug}/`;

export const ORTER = ORTNAMN.map((ort) => ({
  ort,
  slug: `avlopp-${ort.toLowerCase().replace(/ö/g, 'o').replace(/ä/g, 'a').replace(/å/g, 'a')}`,
}));

/* Korttexterna: korta (Mathias: "copyn är för texttung"). */
const KORT = {
  avloppsspolning: {
    alt: 'Avloppstekniker drar spolslangen från spolbilen ner i en brunn på en villagata',
    text: 'Hetvatten och roterande munstycken. Bara rent vatten, inga kemikalier.',
    punkter: ['2 250 kr efter ROT', 'Framkörning ingår'],
  },
  rorinspektion: {
    alt: 'Avloppstekniker pekar på skärmen till en rörkamera där insidan av ett avloppsrör syns',
    text: 'Kommer stoppet tillbaka? Kameran visar varför.',
    punkter: ['Rötter, sprickor, fel fall', '3 500 kr med spolning'],
  },
  stamspolning: {
    alt: 'Avloppstekniker drar ut den blå spolslangen ur spolbilen',
    text: 'Hela föreningen på en gång. Varje lägenhet, sedan stammarna.',
    punkter: ['995 kr/lgh ex moms', '5–10 lägenheter'],
  },
  avloppsjour: {
    alt: 'Avloppstekniker från Rena Rör framför spolbilen',
    text: 'Stopp väntar inte till måndag. Vi svarar dygnet runt.',
    punkter: ['Akuta stopp', 'Frusna avlopp tinas'],
  },
  avloppsbrunn: {
    alt: 'Ny grön pumpbrunn på en gräsmatta bredvid en grävmaskin',
    text: 'Löv och slam sätter igen brunnen. Vi spolar, suger eller byter.',
    punkter: ['Slamsugning', 'Nya pumpbrunnar'],
  },
  'byta-avlopp': {
    alt: 'Uppgrävd grop där ett gammalt avloppsrör ligger blottat i leran',
    text: 'När spolning inte räcker längre. Vi filmar, gräver och lägger nytt.',
    punkter: ['ROT-avdrag', 'Tomten återställs'],
  },
};

/** Tjänstekorten. forst = slug som ska stå först (på tjänstesidan). Alla kort leder till sin egen sida. */
export const tjanstKort = (forst) => {
  const lista = forst ? [TJANSTER.find((t) => t.slug === forst), ...TJANSTER.filter((t) => t.slug !== forst)] : TJANSTER;
  return lista.map((t) => ({
    id: t.slug,
    namn: t.namn,
    bild: `${M}/${t.bild}`,
    alt: KORT[t.slug].alt,
    marke: `${M}/marke-${t.marke}.webp`,
    text: KORT[t.slug].text,
    punkter: KORT[t.slug].punkter,
    lank: { href: href(t.slug), txt: `Allt om ${t.kort.toLowerCase()}` },
  }));
};

export const siffror = [
  { tal: 14, text: 'års erfarenhet' },
  { tal: 3400, efter: '+', text: 'kunder' },
  { tal: 8000, efter: '+', text: 'utförda avloppsjobb' },
];

const ING = ['Framkörning ingår', 'En timmes arbete', 'Hetvatten 60 °C', 'Kontroll av vattenlåset'];
export const priser = {
  eyebrow: 'Prislista',
  rubrik: ['Fast pris', 'på spolning'],
  lead: 'För privatpersoner. Inklusive moms, efter ROT-avdrag.',
  kort: [
    { namn: 'Spolning med efterkontroll', pris: '2 250 kr', villkor: 'inkl. moms, efter ROT', ingar: ING },
    { namn: 'Spolning och filmning', pris: '3 500 kr', villkor: 'inkl. moms, efter ROT', ingar: [...ING, 'Kamera efteråt'], utvald: true, etikett: 'När stoppet kommer tillbaka' },
    { namn: 'Spolning, filmning och dokumentation', pris: '4 750 kr', villkor: 'inkl. moms, efter ROT', ingar: [...ING, 'Kamera efteråt', 'Dokumentation', 'Filmfilerna till dig'] },
  ],
  not: 'Jour kvällar och helger: priset får du i telefon innan vi åker. Föreningar och företag: stamspolning 995 kr per lägenhet exklusive moms vid 5–10 lägenheter, större fastigheter får offert.',
};

export const jobb = {
  eyebrow: 'Våra jobb',
  rubrik: ['Riktiga jobb,', 'riktiga rör'],
  lead: '',
  not: 'Bilderna i bandet är från våra egna jobb.',
  tid: '60s',
  rad1: [
    { src: `${M}/jobb-relining.jpg`, alt: 'Nytt foder på väg ner i ett avloppsrör i marken', txt: 'Relining i Eriksberg' },
    { src: `${M}/jobb-glimra.jpg`, alt: 'Spolbilen parkerad i ett tvättbås på en biltvätt', txt: 'Stopp på en biltvätt' },
    { src: `${M}/jobb-hallingsjo.jpg`, alt: 'Nya avloppsrör mellan golvreglarna i en byggnad under uppförande', txt: 'Nytt avlopp i Hällingsjö' },
    { src: `${M}/jobb-vattenledning.jpg`, alt: 'Grävmaskinens skopa vid en uppgrävd vattenledning intill en husgrund', txt: 'Ny vattenledning' },
    { src: `${M}/jobb-andalen.jpg`, alt: 'Liten grävmaskin och en hög makadam på en gräsmatta', txt: 'Ny pumpbrunn' },
  ],
  rad2: [
    { src: `${M}/jobb-rens.jpg`, alt: 'Grått avloppsrör med rensanslutning bakom en öppnad vägg', txt: 'Ny renslucka under trappan' },
    { src: `${M}/jobb-skargard.jpg`, alt: 'Uppgrävt dike längs en husgrund', txt: 'Stopp i skärgården' },
    { src: `${M}/jobb-kamera-falt.jpg`, alt: 'Rörkamerans skärm visar insidan av ett rör, ute på en gårdsplan', txt: 'Kameran på plats' },
    { src: `${M}/jobb-projekt.jpg`, alt: 'Vit villa med uppfart och en brunn i asfalten, inför ett grävjobb', txt: 'Grävjobb påbörjat' },
    { src: `${M}/jobb-slangar.jpg`, alt: 'Avloppstekniker bär en bunt spolslangar framför spolbilen', txt: 'Spolbilen på plats' },
  ],
};

export const varfor = {
  eyebrow: 'Varför Rena Rör',
  rubrik: ['Du vet priset', 'innan vi åker'],
  lead: 'Priset står i listan. Du får det innan vi åker.',
  punkter: [
    { rubrik: 'Fast pris', text: '2 250 kr efter ROT. Framkörning och första timmen ingår.' },
    { rubrik: 'Kamera bara när den behövs', text: 'Filmning kostar mer. Vi rekommenderar den inte i onödan.' },
    { rubrik: 'Små spolbilar', text: 'Kommer in på trånga uppfarter och drar mindre bränsle. Det håller nere priset.' },
    { rubrik: 'Nöjd, annars fortsätter vi', text: 'Vi jobbar tills du är nöjd. Det är vår kundnöjdhetsgaranti.' },
  ],
  video: `${M}/video-varfor.mp4`,
  poster: `${M}/poster-varfor.jpg`,
  videoAlt: 'Långsam inzoomning mot en avloppstekniker som drar ut spolslangen ur spolbilen. Filmen slutar med Rena Rör i Västs logotyp.',
};

export const om = {
  eyebrow: 'Om oss',
  rubrik: ['Ett litet företag', 'med egna spolbilar'],
  kortRad: 'Göteborg med omnejd',
  bild: { src: `${M}/om-bilen.jpg`, w: 800, h: 600, alt: 'Ägaren vid en av Rena Rörs spolbilar', rundad: true },
  stycken: [
    'Vi är tre avloppstekniker, och bilarna är våra egna.',
    'Villor, föreningar och företag från Kungälv till Kungsbacka. Vi kommer på utsatt tid och ställer till så lite som möjligt.',
  ],
  bevis: [
    { ord: 'Jour', text: 'dygnet runt, året runt' },
    { ord: 'Fast pris', text: 'på spolning' },
    { ord: '4,7 av 5', text: 'på Google' },
  ],
};

export const steg = {
  eyebrow: 'Så går det till',
  rubrik: ['Från stopp', 'till rena rör'],
  lista: [
    { namn: 'Ring eller boka', ikon: 'kontakt', text: `Dygnet runt på ${TEL}.` },
    { namn: 'Vi hittar felet', ikon: 'besok', text: 'Per telefon eller på plats.' },
    { namn: 'Pris innan vi åker', ikon: 'offert', text: 'Du får priset när vi bekräftar tiden.' },
    { namn: 'Rena rör', ikon: 'klart', text: 'Vi spolar, kollar vattenlåset och åker.' },
  ],
};

export const team = {
  eyebrow: 'Vårt team',
  rubrik: ['Möt teamet', 'i Rena Rör'],
  lista: [
    { namn: 'Claudio Congiu', roll: 'Ägare och avloppstekniker', bild: `${M}/team-claudio.jpg` },
    { namn: 'Martin Andersson', roll: 'Avloppstekniker', bild: `${M}/team-martin.jpg` },
    { namn: 'Vahid Rostami', roll: 'Avloppstekniker', bild: `${M}/team-vahid.jpg` },
  ],
};

export const omdomen = {
  eyebrow: 'Omdömen',
  rubrik: ['Kunderna', 'om oss'],
  betyg: { varde: 4.7, antal: 14, href: GOOGLE },
  lappar: true,
  lista: [
    { namn: 'Lennart Skoglund', kalla: 'Google', google: true, betyg: 5, text: 'Ett fantastiskt bra jobb med mitt avlopp i köket, snabbt och snyggt. Nu fungerar det perfekt, var helt täppt.' },
    { namn: 'Julia Stuxgren', kalla: '', stjarnor: false, text: 'Fick stopp i avloppet. De löste problemet på 15 min samma dag! Imponerande och trevliga att ha att göra med.' },
    { namn: 'Kjell Hellström', kalla: 'Google', google: true, betyg: 5, text: 'Fick en perfekt videogenomgång av rörsystemet. Fick åtgärdat det som behövdes och känner mig nu helt trygg.' },
    { namn: 'Fredrik Sjölin', kalla: '', stjarnor: false, text: 'Man vet hur man beter sig i privata hem och man sköter arbetsplatsen med omsorg.' },
    { namn: 'David Ljunggren', kalla: '', stjarnor: false, text: 'Snabb service och bra återkoppling. Trevlig och proffsig personal. Rekommenderas!' },
  ],
  not: 'Betyget 4,7 av 5 bygger på 14 recensioner på Google.',
};

export const instagram = {
  eyebrow: 'Instagram',
  rubrik: ['Så såg det ut', 'i röret'],
  bio: 'Rötter, rost och nya brunnar. Direkt från jobben.',
  koder: ['DY9oEj5jcBb', 'DYW4IANDQN5', 'DZN8G7vDYgJ'],
};

export const kontaktSektion = (ort, forst) => ({
  eyebrow: 'Kontakt',
  rubrik: ['Stopp nu?', 'Ring direkt'],
  lead: `Akut: ring ${TEL}, dygnet runt. Annars skriver du några rader, så bekräftar vi tid och pris.`,
  checkar: ['Fast pris på spolning', ort ? `Vi kommer till ${ort}` : 'Svar dygnet runt', 'Priser efter ROT-avdrag'],
  // Formulärets val: alla tjänster, sidans egen först (runda 2: valet visade fel tjänst på tjänstesidorna).
  typer: [...TJANSTER.filter((t) => t.slug === forst), ...TJANSTER.filter((t) => t.slug !== forst)].map((t) => t.namn),
  video: `${M}/video-kontakt.mp4`,
  poster: `${M}/poster-kontakt.jpg`,
  formRubrik: 'Boka tid',
  placeholder: 'Var är stoppet? Kök, toalett, golvbrunn eller brunn ute. Adress och gärna fastighetsbeteckning för ROT.',
  formNot: 'Vi bekräftar tiden och lämnar pris innan vi kommer.',
  kundtyp: ['Privatperson', 'BRF', 'Företag'],
});

// Popupen är avstängd (runda 1: den täckte prislistan och formuläret på mobil). Mallen: popup: false.
export const popup = false;

// Bokning (Mathias 2026-11-11: "lägg som ett förslag men länka nu till vår mejl bahkostudio@gmail.com").
// Ingen Cal.com-kalender hos Rena Rör än; knappen går till Bahkos mejl tills de har en egen.
export const bokning = {
  url: 'mailto:bahkostudio@gmail.com?subject=Boka%20tid%20hos%20Rena%20R%C3%B6r',
  txt: 'Föreslå en tid',
  kortTxt: 'Föreslå en tid',
};

export const footer = {
  text: 'Avlopp i Göteborg med omnejd. Jour dygnet runt, året runt.',
  tjanster: [...TJANSTER.map((t) => ({ href: href(t.slug), txt: t.kort })), { href: `${BAS}/#priser`, txt: 'Prislista' }],
  orter: { rubrik: 'Här jobbar vi', lankar: ORTER.map((o) => ({ href: href(o.slug), txt: o.ort })) },
  bild: {
    src: `${M}/ftr-goteborg.jpg`,
    srcMobil: `${M}/ftr-goteborg-mobil.jpg`,
    alt: 'Göteborg i skymningen: hamnkranarna, Älvsborgsbron och Läppstiftet speglas i Göta älv.',
  },
};

export const hero = {
  ort: 'Göteborg',
  tjanster: ['Avloppsspolning', 'Jour'],
  lank: { href: `${BAS}/#priser`, txt: 'Se prislistan' },
  video: `${M}/video-hero.mp4`,
  videoMobil: `${M}/video-hero-mobil.mp4`,
  poster: `${M}/poster-hero.jpg`,
  posterMobil: `${M}/poster-hero-mobil.jpg`,
};

export const tejp = ['Jour dygnet runt', 'Spolning 2 250 kr', '4,7 av 5 på Google', 'Rörinspektion', 'Egna spolbilar', 'Stamspolning', '14 år med avlopp', 'Byta avlopp'];

/** Grunddata för alla sidor. över = det som skiljer en sida från startsidan. */
export const sida = (over = {}) => ({
  namn: 'Rena Rör i Väst',
  kund: true,
  skapadAv: 'Hemsida skapad av',
  tema,
  logo,
  kontakt,
  cta,
  formular,
  bokning,
  nav: {
    vanster: [{ href: `${BAS}/#tjanster`, txt: 'Tjänster' }, { href: `${BAS}/#priser`, txt: 'Priser' }],
    hoger: [{ href: href('brf'), txt: 'För BRF' }, { href: `${BAS}/#omdomen`, txt: 'Omdömen' }],
    extra: [{ href: `${BAS}/#jobb`, txt: 'Våra jobb' }, { href: TELHREF, txt: `Ring ${TEL}` }],
  },
  hero,
  tejp,
  siffror,
  tjanster: { eyebrow: 'Tjänster', rubrik: ['Stopp?', 'Vi löser det'], lead: 'Kök, toalett, golvbrunn eller brunnen på tomten. Vi spolar, filmar och byter.', kolumner: 3, kort: tjanstKort() },
  priser,
  priserForst: true,
  jobb,
  varfor,
  om,
  team,
  omdomen,
  kontaktSektion: kontaktSektion(),
  popup,
  footer,
  ...over,
});

export const metadataBas = { robots: { index: false, follow: false } };
