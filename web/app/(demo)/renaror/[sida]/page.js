import { notFound } from 'next/navigation';
import DemoSida from '../../_mall/DemoSida';
import { sida, tjanstKort, kontaktSektion, href, TEL, BAS, ORTER, TJANSTER, metadataBas, M } from '../_rr';

/* ===========================================================================
   RENA RÖR I VÄST — landningssidorna (2026-11-11, Mathias: "varje tjänst ska ha
   en landningssida, varje plats ska ha en landningssida där han jobbar", och en
   BRF-sida i footern). Sex tjänstesidor, BRF-sidan och sju ortssidor, alla på
   mallen med delad data i ../_rr.js.

   Sanningsregeln: allt nedan står på renaror.se (tjänstesidorna, prislistan,
   spolbilssidan) eller i deras Instagram-bildtexter, se ../page.js VERIFIERAT.
   Ortssidorna säger bara det som är belagt: att orten ingår i området, jouren,
   de fasta priserna (framkörning ingår). Inga påhittade jobb på orten. Bara
   Göteborgssidan nämner jobb med plats (Gårda, Eriksberg, Tuve), ur Instagram.
   =========================================================================== */

const SIDOR = {
  avloppsspolning: {
    titel: 'Avloppsspolning i Göteborg · fast pris 2 250 kr efter ROT',
    besk: 'Stopp i kök, toalett eller golvbrunn? Vi spolar med 60-gradigt hetvatten och roterande munstycken. 2 250 kr efter ROT, framkörning ingår. Jour dygnet runt.',
    hero: ['Avloppsspolning', 'Hetvatten'],
    tjanster: { eyebrow: 'Avloppsspolning', rubrik: ['Fett och matrester', 'spolas bort'], lead: 'Hetvatten på 60 grader och roterande munstycken. Bara rent vatten, inga kemikalier som skadar rören.' },
    priser: true,
    fragor: [
      { q: 'Vad kostar det?', a: '2 250 kr efter ROT, inklusive moms. Med filmning efteråt 3 500 kr.' },
      { q: 'Vad ingår?', a: 'Framkörning, en timmes arbete, spolning av kök, toalett eller avloppsbrunn och kontroll av vattenlåset.' },
      { q: 'Hur vet jag att det behövs?', a: 'Vattnet rinner sakta, det kluckar eller luktar. Då sitter det något i röret.' },
      { q: 'Jag har hällt i propplösare. Gör det något?', a: 'Säg det när du ringer. Det är för vår säkerhet.' },
      { q: 'Kan jag prova själv först?', a: 'Ja, i köket. Vaskrensare eller bakpulver och ättika. Hjälper det inte: ring.' },
    ],
  },
  rorinspektion: {
    titel: 'Rörinspektion med kamera i Göteborg · Rena Rör',
    besk: 'Kommer stoppet tillbaka? Vi filmar avloppet och visar var felet sitter: rötter, sprickor, läckor eller fel fall. Spolning och filmning 3 500 kr efter ROT.',
    hero: ['Rörinspektion', 'Kamera'],
    tjanster: { eyebrow: 'Rörinspektion', rubrik: ['Se felet', 'innan du gräver'], lead: 'Kameran åker in i röret och visar exakt var det sitter. Du slipper gräva på chans.' },
    priser: true,
    fragor: [
      { q: 'Vad kostar det?', a: 'Spolning och filmning 3 500 kr efter ROT. Med dokumentation och filmfilerna till dig 4 750 kr.' },
      { q: 'När behövs kamera?', a: 'När stoppet kommer tillbaka, när det luktar, inför en renovering. Eller när en fläck av gräsmattan plötsligt växer snabbare än resten.' },
      { q: 'Vad hittar ni?', a: 'Rötter, sprickor, trasiga fogar, läckor och rör som lagts med fel fall.' },
      { q: 'Behöver jag filma om stoppet släppte?', a: 'Oftast inte. Vi föreslår kameran bara när det behövs.' },
    ],
  },
  stamspolning: {
    titel: 'Stamspolning för BRF i Göteborg · 995 kr per lägenhet',
    besk: 'Stamspolning för bostadsrättsföreningar och fastighetsägare: kök, golvbrunnar, tvättställ och utgående stammar. 995 kr per lägenhet ex moms vid 5–10 lägenheter.',
    hero: ['Stamspolning', 'BRF'],
    tjanster: { eyebrow: 'Stamspolning', rubrik: ['Hela huset', 'på en gång'], lead: 'Vi går igenom varje lägenhet och spolar sedan de utgående stammarna. Färre stopp, längre livslängd på rören.' },
    fragor: [
      { q: 'Vad kostar det?', a: '995 kr per lägenhet exklusive moms vid 5–10 lägenheter. Större fastigheter får offert.' },
      { q: 'Vad ingår?', a: 'Kök, golvbrunnar och tvättställ i varje lägenhet. Vattenlåsen tas isär och kontrolleras. Sist spolas de utgående stammarna.' },
      { q: 'När är det dags?', a: 'Vattnet rinner sakta, det luktar, stoppen kommer tillbaka. Eller efter en renovering, då byggdamm hamnar i rören.' },
      { q: 'Kan ni filma stammarna också?', a: (<>Ja. <a href={href('rorinspektion')}>Mer om rörinspektion</a>.</>) },
    ],
  },
  avloppsjour: {
    titel: 'Avloppsjour dygnet runt i Göteborg · Rena Rör',
    besk: `Akut stopp i toalett, kök eller golvbrunn? Avloppsjour dygnet runt, året runt i Göteborg med omnejd. Ring ${TEL}.`,
    hero: ['Avloppsjour', 'Dygnet runt'],
    tjanster: { eyebrow: 'Avloppsjour', rubrik: ['Stopp kommer', 'aldrig på kontorstid'], lead: 'Det händer när hela familjen är hemma. Därför svarar vi dygnet runt, året runt.' },
    fragor: [
      { q: 'När svarar ni?', a: `Dygnet runt, året runt. Ring ${TEL}.` },
      { q: 'Vad kostar jouren?', a: 'Du får priset innan vi åker.' },
      { q: 'Tinar ni frusna avlopp?', a: 'Ja.' },
      { q: 'Vad ska jag tänka på innan ni kommer?', a: 'Har du hällt i propplösare: säg det. Häll aldrig kokande vatten i toaletten, porslinet kan spricka.' },
    ],
  },
  avloppsbrunn: {
    titel: 'Rensa avloppsbrunn och byta pumpbrunn i Göteborg · Rena Rör',
    besk: 'Igensatt brunn på tomten? Vi spolar, slamsuger och byter uttjänta brunnar och pumpbrunnar i Göteborg med omnejd.',
    hero: ['Brunnar', 'Pumpbrunnar'],
    tjanster: { eyebrow: 'Avloppsbrunnar', rubrik: ['Vatten på uppfarten?', 'Kolla brunnen'], lead: 'Löv, grus och slam sätter igen brunnen tills vattnet står kvar. Vi spolar rent, slamsuger eller byter.' },
    fragor: [
      { q: 'Varför blir brunnen igensatt?', a: 'Kvistar, grus, löv och slam samlas med åren.' },
      { q: 'Går den att rädda?', a: 'Oftast. En brunn på 50–60 år går inte alltid. Då byter vi den.' },
      { q: 'Byter ni pumpbrunnar?', a: 'Ja. Senast bytte vi en egenbyggd pumpbrunn från 80-talet mot en ny, godkänd av kommunen.' },
      { q: 'Slamsuger ni?', a: 'Ja.' },
    ],
  },
  'byta-avlopp': {
    titel: 'Byta avlopp i Göteborg · filmning, offert, ROT · Rena Rör',
    besk: 'Återkommande stopp, rötter eller spröda 70-talsrör? Vi filmar, lämnar offert, gräver och lägger nytt avlopp. ROT-avdrag, och tomten återställs.',
    hero: ['Byta avlopp', 'Grävjobb'],
    tjanster: { eyebrow: 'Byta avlopp', rubrik: ['När spolning', 'inte räcker längre'], lead: 'Vi filmar först. Sedan får du en offert. Sist gräver vi och lägger nytt, och återställer tomten så gott det går.' },
    fragor: [
      { q: 'Hur vet jag att det är dags?', a: 'Stoppen kommer tillbaka, det luktar, det är fuktigt. Gjutjärnsrör över 40 år och vita plaströr i 60- och 70-talsvillor är vanliga syndare.' },
      { q: 'Hur lång tid tar det?', a: 'Räkna med ett par veckor.' },
      { q: 'Får jag ROT-avdrag?', a: 'Ja, på arbetskostnaden. Vi sköter pappren.' },
      { q: 'Kan vi bo kvar under tiden?', a: 'Ja. Det blir avbrott i avloppet ibland, men vi håller dem korta.' },
    ],
  },
  brf: {
    titel: 'Avlopp för BRF och fastighetsägare i Göteborg · Rena Rör',
    besk: 'Stamspolning 995 kr per lägenhet ex moms, rörinspektion med kamera, rörbyten och jour dygnet runt för bostadsrättsföreningar i Göteborg med omnejd.',
    hero: ['BRF', 'Fastighet'],
    tjanster: { eyebrow: 'För BRF', rubrik: ['Avlopp för', 'hela föreningen'], lead: 'Stamspolning, kamera och rörbyten. Ett nummer att ringa när någon i huset har stopp.', forst: 'stamspolning' },
    fragor: [
      { q: 'Vad kostar stamspolning?', a: '995 kr per lägenhet exklusive moms vid 5–10 lägenheter. Större fastigheter får offert.' },
      { q: 'Vad ingår?', a: 'Kök, golvbrunnar och tvättställ i varje lägenhet, kontroll av vattenlåsen och spolning av de utgående stammarna.' },
      { q: 'Har ni jobbat åt föreningar?', a: 'Ja. Hos en förening i Gårda hittade vi ett genomrostat rör i garaget, i ett hus från 2007. Röret byttes direkt.' },
      { q: 'Har ni jour för de boende?', a: `Ja, dygnet runt på ${TEL}.` },
    ],
  },
};

const ORTSIDOR = Object.fromEntries(ORTER.map(({ ort, slug }) => [slug, {
  ort,
  titel: `Avlopp och avloppsjour i ${ort} · Rena Rör i Väst`,
  besk: `Stopp i avloppet i ${ort}? Spolning 2 250 kr efter ROT, framkörning ingår. Kamera, stamspolning och avloppsbyten. Jour dygnet runt på ${TEL}.`,
  hero: ['Avloppsspolning', 'Jour'],
  tjanster: {
    eyebrow: `Avlopp i ${ort}`,
    rubrik: [`Stopp i ${ort}?`, 'Vi kommer'],
    lead: ort === 'Göteborg'
      ? 'Hela Göteborg, från Tuve till Eriksberg och Gårda. Fast pris, framkörning ingår.'
      : `${ort} ingår i området. Fast pris, framkörning ingår.`,
  },
  priser: true,
  fragor: [
    { q: `Kommer ni till ${ort}?`, a: `Ja. ${ort} ingår, liksom Göteborg, Partille, Mölndal, Kungsbacka, Kungälv, Ale och Mölnlycke.` },
    { q: 'Kostar det extra att köra hit?', a: 'Inte på spolningen. Framkörning ingår i 2 250 kr efter ROT.' },
    { q: `Har ni jour i ${ort}?`, a: `Ja, dygnet runt. Ring ${TEL}.` },
    { q: 'Får jag priset innan ni kommer?', a: 'Ja, när vi bekräftar tiden.' },
  ],
}]));

const ALLA = { ...SIDOR, ...ORTSIDOR };

// Minst fem frågor per sida (mallens regel). Fyller på med allmänna frågor som inte redan finns.
const EXTRA = [
  { q: 'Måste ni filma?', a: 'Nej, oftast räcker spolningen. Kameran föreslår vi när stoppet kommer tillbaka.' },
  { q: 'Får jag ROT-avdrag?', a: 'Ja, på arbetskostnaden. Priserna i prislistan är redan efter ROT.' },
  { q: 'Var jobbar ni?', a: 'Göteborg, Partille, Mölndal, Kungsbacka, Kungälv, Ale och Mölnlycke.' },
];
const fyll = (lista, arOrt) => {
  const ut = [...lista];
  for (const x of EXTRA) { if (ut.length >= 5) break; if (arOrt && x.q === 'Var jobbar ni?') continue; if (!ut.some((y) => y.q === x.q)) ut.push(x); }
  return ut;
};

export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(ALLA).map((s) => ({ sida: s }));
}

export async function generateMetadata({ params }) {
  const { sida: slug } = await params;
  const p = ALLA[slug];
  if (!p) return {};
  return { title: p.titel, description: p.besk, ...metadataBas };
}

export default async function RenaRorSida({ params }) {
  const { sida: slug } = await params;
  const p = ALLA[slug];
  if (!p) notFound();
  const tj = TJANSTER.find((t) => t.slug === slug);
  const data = sida({
    hero: { ort: p.ort || 'Göteborg', tjanster: p.hero, lank: { href: `${BAS}/#priser`, txt: 'Se prislistan' }, video: `${M}/video-hero.mp4`, videoMobil: `${M}/video-hero-mobil.mp4`, poster: `${M}/poster-hero.jpg`, posterMobil: `${M}/poster-hero-mobil.jpg` },
    tejp: [p.hero[0], 'Jour dygnet runt', p.ort || 'Göteborg med omnejd', 'Pris innan vi kommer', '4,7 av 5 på Google', 'Fasta priser'],
    tjanster: { ...p.tjanster, kolumner: 3, kort: tjanstKort(p.tjanster.forst || (tj && tj.slug)) },
    priser: p.priser ? undefined : null,
    nav: {
      vanster: [{ href: `${BAS}/`, txt: 'Startsida' }, { href: '#tjanster', txt: 'Tjänster' }],
      hoger: [{ href: '#fragor', txt: 'Frågor' }, { href: '#omdomen', txt: 'Omdömen' }],
      extra: [{ href: `${BAS}/#priser`, txt: 'Prislista' }, { href: href('brf'), txt: 'För BRF' }, { href: `tel:+46704139700`, txt: `Ring ${TEL}` }],
    },
    fragor: {
      eyebrow: 'Vanliga frågor',
      rubrik: ['Det du undrar', 'innan du ringer'],
      kort: { rubrik: 'Akut stopp?', text: `Ring ${TEL}. Vi svarar dygnet runt.` },
      lista: fyll(p.fragor, Boolean(p.ort)),
    },
    kontaktSektion: kontaktSektion(p.ort),
  });
  // priser: undefined = behåll startsidans prislista, null = ingen prislista på sidan.
  if (data.priser === undefined) delete data.priser;
  if (!p.priser) delete data.priser;
  else data.priser = sida().priser;
  return <DemoSida data={data} />;
}
