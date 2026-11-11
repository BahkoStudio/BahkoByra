import { notFound } from 'next/navigation';
import DemoSida from '../../_mall/DemoSida';
import { sida, tjanstKort, kontaktSektion, href, TEL, TELHREF, BAS, ORTER, ORTNAMN, metadataBas, M } from '../_rr';

/* ===========================================================================
   RENA RÖR I VÄST — landningssidorna (2026-11-11). Sex tjänstesidor, BRF-sidan och
   sju ortssidor. Runda 2 i kundloopen: alla i mallens andra layout (layout: 'styrelse',
   som gdmaleri.se/brf/, Mathias: "brf-sidan ska vara mer som gdmaleri.se brf-sida"):
   egen rubrik och ingress, egen bild, numrerade steg, egna frågor, bara tre rader
   tjänster. Kortare än startsidan och inte en kopia av den.

   Sanningsregeln: varje mening står på renaror.se (tjänstesidorna, prislistan,
   spolbilssidan, stopp-i-avlopp, stopp-i-toaletten, byta-avlopp, rensa-avloppsbrunn)
   eller i deras Instagram-bildtexter, se ../page.js VERIFIERAT. Ortssidorna hittar
   inte på lokala jobb; bara Göteborg nämner jobb med plats (Gårda, Tuve, Eriksberg,
   Instagram). BRF-sidans bild och herobilden är genererade (FLAGGOR i ../page.js).
   =========================================================================== */

const B = (fil, alt) => ({ src: `${M}/${fil}`, w: 800, h: 600, alt });
const STEG_RING = { namn: 'Ring eller boka', text: `Dygnet runt på ${TEL}, eller via formuläret.` };
const STEG_PRIS = { namn: 'Pris innan vi åker', text: 'Du får priset när vi bekräftar tiden.' };

const SIDOR = {
  avloppsspolning: {
    titel: 'Avloppsspolning i Göteborg · 2 250 kr efter ROT · Rena Rör',
    besk: 'Stopp i kök, toalett eller golvbrunn? Vi spolar med 60-gradigt hetvatten och roterande munstycken. 2 250 kr efter ROT, framkörning ingår.',
    hero: {
      eyebrow: 'Avloppsspolning i Göteborg',
      h1: ['Stopp i avloppet?', 'Vi spolar bort det.'],
      ingress: 'Hetvatten på 60 grader och roterande munstycken. Bara rent vatten, inga kemikalier. 2 250 kr efter ROT, framkörningen ingår.',
      bevis: ['2 250 kr efter ROT', 'Framkörning ingår', 'Jour dygnet runt'],
      bild: B('tjanst-spolning.jpg', 'Avloppstekniker drar spolslangen från spolbilen ner i en brunn på en villagata'),
    },
    steg: [STEG_RING, STEG_PRIS,
      { namn: 'Hetvatten och munstycken', text: 'Vi spolar kök, toalett eller avloppsbrunn med 60 grader varmt vatten.' },
      { namn: 'Vattenlåset kontrolleras', text: 'Vi tittar på vattenlåset innan vi åker.' },
      { namn: 'Kommer stoppet tillbaka?', text: 'Då filmar vi och visar vad som sitter i röret.' }],
    rader: ['rorinspektion', 'avloppsjour', 'avloppsbrunn'],
    fragor: [
      { q: 'Vad kostar det?', a: '2 250 kr efter ROT, inklusive moms. Med filmning efteråt 3 500 kr.' },
      { q: 'Vad ingår?', a: 'Framkörning, en timmes arbete, spolning av kök, toalett eller avloppsbrunn och kontroll av vattenlåset.' },
      { q: 'Hur vet jag att det behövs?', a: 'Vattnet rinner sakta, det kluckar eller luktar.' },
      { q: 'Jag har hällt i propplösare. Gör det något?', a: 'Säg det när du ringer. Det är för vår säkerhet.' },
      { q: 'Kan jag prova själv först?', a: 'I köket, ja: vaskrensare eller bakpulver och ättika. Häll aldrig kokande vatten i toaletten, porslinet kan spricka.' },
    ],
  },
  rorinspektion: {
    titel: 'Rörinspektion med kamera i Göteborg · Rena Rör',
    besk: 'Kommer stoppet tillbaka? Vi filmar avloppet och visar var felet sitter: rötter, sprickor, läckor eller fel fall. Spolning och filmning 3 500 kr efter ROT.',
    hero: {
      eyebrow: 'Rörinspektion i Göteborg',
      h1: ['Se felet', 'innan du gräver.'],
      ingress: 'Kameran åker in i röret och visar var det sitter. Spolning och filmning 3 500 kr efter ROT. Med filmfilerna till dig 4 750 kr.',
      bevis: ['3 500 kr efter ROT', 'Filmfiler om du vill', 'Rötter, sprickor, läckor'],
      bild: B('jobb-kamera-falt.jpg', 'Rörkamerans skärm visar insidan av ett avloppsrör, ute på en gårdsplan'),
    },
    steg: [STEG_RING, STEG_PRIS,
      { namn: 'Spolning', text: 'Först spolar vi rent, så att kameran ser något.' },
      { namn: 'Filmning', text: 'Kameran visar rötter, sprickor, trasiga fogar och rör med fel fall.' },
      { namn: 'Filmen till dig', text: 'Vill du ha dokumentation och filmfilerna får du dem.' }],
    rader: ['byta-avlopp', 'avloppsspolning', 'stamspolning'],
    fragor: [
      { q: 'Vad kostar det?', a: 'Spolning och filmning 3 500 kr efter ROT. Med dokumentation och filmfilerna till dig 4 750 kr.' },
      { q: 'När behövs kamera?', a: 'När stoppet kommer tillbaka, när det luktar, inför en renovering. Eller när en fläck av gräsmattan växer fortare än resten.' },
      { q: 'Vad hittar ni?', a: 'Rötter, sprickor, trasiga fogar, läckor och rör med fel fall.' },
      { q: 'Slipper jag gräva?', a: 'Kameran visar var felet sitter. Då gräver ingen på chans.' },
      { q: 'Kan jag få filmen till försäkringsbolaget?', a: 'Du får dokumentation och filmfilerna i paketet för 4 750 kr.' },
    ],
  },
  stamspolning: {
    titel: 'Stamspolning i Göteborg · 995 kr per lägenhet · Rena Rör',
    besk: 'Stamspolning för föreningar och fastighetsägare: kök, golvbrunnar, tvättställ och utgående stammar. 995 kr per lägenhet ex moms vid 5–10 lägenheter.',
    hero: {
      eyebrow: 'Stamspolning i Göteborg',
      h1: ['Hela huset', 'på en gång.'],
      ingress: 'Varje lägenhet först, sedan de utgående stammarna. 995 kr per lägenhet exklusive moms vid 5–10 lägenheter.',
      bevis: ['995 kr/lgh ex moms', '5–10 lägenheter', 'Större hus: offert'],
      bild: B('tjanst-stam.jpg', 'Avloppstekniker drar ut den blå spolslangen ur spolbilen'),
    },
    steg: [STEG_RING,
      { namn: 'Pris per lägenhet', text: '995 kr exklusive moms vid 5–10 lägenheter. Fler än tio: offert.' },
      { namn: 'Lägenhet för lägenhet', text: 'Kök, golvbrunnar och tvättställ spolas.' },
      { namn: 'Vattenlåsen', text: 'Vi tar isär och kontrollerar vattenlåsen.' },
      { namn: 'Stammarna', text: 'Sist spolar vi de utgående stammarna.' }],
    rader: ['rorinspektion', 'avloppsjour', 'byta-avlopp'],
    fragor: [
      { q: 'Vad kostar det?', a: '995 kr per lägenhet exklusive moms vid 5–10 lägenheter. Större fastigheter får offert.' },
      { q: 'När är det dags?', a: 'Vattnet rinner sakta, det luktar, stoppen kommer tillbaka. Eller efter en renovering, när byggdamm har hamnat i rören.' },
      { q: 'Kan ni filma stammarna?', a: (<>Ja. <a href={href('rorinspektion')}>Mer om rörinspektion</a>.</>) },
      { q: 'Får föreningen ROT-avdrag?', a: 'Nej. ROT gäller privatpersoner, inte föreningens gemensamma stammar.' },
      { q: 'Har ni jour för de boende?', a: `Ja, dygnet runt på ${TEL}.` },
    ],
  },
  avloppsjour: {
    titel: 'Avloppsjour dygnet runt i Göteborg · Rena Rör',
    besk: `Akut stopp i toalett, kök eller golvbrunn? Avloppsjour dygnet runt, året runt i Göteborg med omnejd. Ring ${TEL}.`,
    hero: {
      eyebrow: 'Avloppsjour i Göteborg',
      h1: ['Stopp en söndagkväll?', 'Vi svarar.'],
      ingress: 'Stopp kommer sällan på kontorstid. Därför svarar vi dygnet runt, året runt.',
      bevis: ['Dygnet runt', 'Året runt', 'Pris innan vi åker'],
      bild: B('tjanst-jour.jpg', 'Avloppstekniker från Rena Rör framför spolbilen'),
    },
    steg: [
      { namn: 'Ring', text: `${TEL}, dygnet runt.` },
      { namn: 'Berätta vad som hänt', text: 'Var stoppet sitter, och om du hällt i något.' },
      STEG_PRIS,
      { namn: 'Vi kommer', text: 'Med spolbilen, till dig i Göteborgstrakten.' },
      { namn: 'Rena rör', text: 'Vi spolar loss stoppet och kontrollerar vattenlåset.' }],
    rader: ['avloppsspolning', 'rorinspektion', 'avloppsbrunn'],
    fragor: [
      { q: 'När svarar ni?', a: `Dygnet runt, året runt. Ring ${TEL}.` },
      { q: 'Vad kostar jouren?', a: 'Du får priset innan vi åker.' },
      { q: 'Tinar ni frusna avlopp?', a: 'Ja.' },
      { q: 'Jag har hällt i propplösare. Gör det något?', a: 'Säg det när du ringer. Det är för vår säkerhet.' },
      { q: 'Kan jag hälla kokande vatten i toaletten?', a: 'Nej. Porslinet kan spricka.' },
    ],
  },
  avloppsbrunn: {
    titel: 'Rensa avloppsbrunn och byta pumpbrunn i Göteborg · Rena Rör',
    besk: 'Igensatt brunn på tomten? Vi spolar, slamsuger och byter uttjänta brunnar och pumpbrunnar i Göteborg med omnejd.',
    hero: {
      eyebrow: 'Avloppsbrunnar i Göteborg',
      h1: ['Vatten på uppfarten?', 'Kolla brunnen.'],
      ingress: 'Löv, grus och slam sätter igen brunnen. Vi spolar rent, slamsuger eller byter den.',
      bevis: ['Spolning', 'Slamsugning', 'Nya pumpbrunnar'],
      bild: B('jobb-andalen.jpg', 'Liten grävmaskin och en hög makadam på en gräsmatta, där en ny pumpbrunn ska ner'),
    },
    steg: [STEG_RING, STEG_PRIS,
      { namn: 'Spolning', text: 'Vi spolar brunnen och ledningen ren.' },
      { namn: 'Slamsugning', text: 'Slam och grus sugs upp.' },
      { namn: 'Byte vid behov', text: 'En brunn på 50–60 år går inte alltid att rädda. Då byter vi den.' }],
    rader: ['avloppsspolning', 'byta-avlopp', 'rorinspektion'],
    fragor: [
      { q: 'Varför blir brunnen igensatt?', a: 'Kvistar, grus, löv och slam samlas med åren.' },
      { q: 'Går den att rädda?', a: 'Oftast. En brunn på 50–60 år går inte alltid. Då byter vi den.' },
      { q: 'Byter ni pumpbrunnar?', a: 'Ja. Vi har bytt en egenbyggd pumpbrunn från 80-talet mot en ny, godkänd av kommunen.' },
      { q: 'Slamsuger ni?', a: 'Ja.' },
      { q: 'Får jag ROT-avdrag?', a: 'Ja, på arbetskostnaden.' },
    ],
  },
  'byta-avlopp': {
    titel: 'Byta avlopp i Göteborg · filmning, offert, ROT · Rena Rör',
    besk: 'Återkommande stopp, rötter eller spröda 70-talsrör? Vi filmar, lämnar offert, gräver och lägger nytt avlopp. ROT-avdrag på arbetet.',
    hero: {
      eyebrow: 'Byta avlopp i Göteborg',
      h1: ['När spolning', 'inte räcker längre.'],
      ingress: 'Vi filmar först. Sedan får du en offert. Sist gräver vi och lägger nytt, och återställer tomten.',
      bevis: ['Filmning först', 'Offert innan vi gräver', 'ROT-avdrag'],
      bild: B('tjanst-byte.jpg', 'Uppgrävd grop där ett gammalt avloppsrör ligger blottat i leran'),
    },
    steg: [STEG_RING,
      { namn: 'Filmning', text: 'Kameran visar vad som är trasigt och om allt behöver bytas.' },
      { namn: 'Offert', text: 'Du får en offert innan något grävs.' },
      { namn: 'Grävning och nya rör', text: 'Vi tar bort det gamla och lägger nytt.' },
      { namn: 'Tomten återställs', text: 'Vi fyller igen och återställer trädgården.' }],
    rader: ['rorinspektion', 'avloppsbrunn', 'avloppsspolning'],
    fragor: [
      { q: 'Hur vet jag att det är dags?', a: 'Stoppen kommer tillbaka, det luktar, det är fuktigt. Gjutjärnsrör över 40 år och vita plaströr i 60- och 70-talsvillor är vanliga syndare.' },
      { q: 'Hur lång tid tar det?', a: 'Räkna med ett par veckor.' },
      { q: 'Får jag ROT-avdrag?', a: 'Ja, på arbetskostnaden. Vi hjälper dig med pappren.' },
      { q: 'Kan vi använda avloppet under tiden?', a: 'Det blir vissa avbrott. Vi gör allt vi kan för att hålla dem små.' },
      { q: 'Vad kostar det?', a: 'Det beror på hur mycket som ska bytas. Därför filmar vi först och lämnar offert.' },
    ],
  },
  brf: {
    titel: 'Avlopp för BRF och fastighetsägare i Göteborg · Rena Rör',
    besk: 'Stamspolning 995 kr per lägenhet ex moms, rörinspektion med kamera, rörbyten och jour dygnet runt för bostadsrättsföreningar i Göteborg med omnejd.',
    hero: {
      eyebrow: 'För styrelser i Göteborg',
      h1: ['Avlopp för föreningen.', 'Ett pris per lägenhet.'],
      ingress: 'Stamspolning för 995 kr per lägenhet exklusive moms. Kamera när ni behöver se, rörbyten när det är dags och jour för de boende.',
      bevis: ['995 kr/lgh ex moms', 'Jour för de boende', '4,7 av 5 på Google'],
      bild: { src: `${M}/brf-hero.jpg`, w: 1440, h: 1080, alt: 'Spolbil med Rena Rörs logotyp utanför ett landshövdingehus, spolslangen dragen in i källaren' },
    },
    steg: [
      { namn: 'Styrelsen hör av sig', text: `Ring ${TEL} eller skriv. Berätta hur många lägenheter föreningen har.` },
      { namn: 'Pris', text: '995 kr per lägenhet exklusive moms vid 5–10 lägenheter. Större föreningar får offert.' },
      { namn: 'Lägenhet för lägenhet', text: 'Kök, golvbrunnar och tvättställ spolas. Vattenlåsen tas isär och kontrolleras.' },
      { namn: 'Stammarna', text: 'Sist spolar vi de utgående stammarna.' },
      { namn: 'Kamera vid behov', text: 'Vill styrelsen se skicket på rören filmar vi dem.' }],
    rader: ['stamspolning', 'rorinspektion', 'avloppsjour'],
    raderRubrik: { eyebrow: 'Tjänster för föreningen', rubrik: ['Stammar, kamera', 'och jour'], lead: 'Hos en förening i Gårda hittade vi ett genomrostat rör i garaget, i ett hus från 2007. Röret byttes.' },
    fragor: [
      { q: 'Vad kostar stamspolning?', a: '995 kr per lägenhet exklusive moms vid 5–10 lägenheter. Större fastigheter får offert.' },
      { q: 'Får föreningen ROT-avdrag?', a: 'Nej. ROT gäller privatpersoner, inte föreningens gemensamma stammar. Räkna med priset exklusive moms.' },
      { q: 'Vad ingår?', a: 'Kök, golvbrunnar och tvättställ i varje lägenhet, kontroll av vattenlåsen och spolning av de utgående stammarna.' },
      { q: 'Har ni jobbat åt föreningar?', a: 'Ja. Hos en förening i Gårda spolade vi en liggande ledning i garaget och hittade ett genomrostat rör. Röret byttes.' },
      { q: 'Har ni jour för de boende?', a: `Ja, dygnet runt på ${TEL}.` },
      { q: 'Kan ni filma stammarna?', a: 'Ja. Med dokumentation och filmfiler till styrelsen.' },
    ],
    kundtypVald: 'BRF',
  },
};

const ORTBILD = ['jobb-projekt.jpg', 'jobb-slangar.jpg', 'jobb-glimra.jpg', 'jobb-vattenledning.jpg', 'jobb-andalen.jpg', 'brf-hero.jpg', 'jobb-relining.jpg'];
const ORTSIDOR = Object.fromEntries(ORTER.map(({ ort, slug }, i) => {
  const andra = ORTNAMN.filter((o) => o !== ort);
  const lista = `${andra.slice(0, -1).join(', ')} och ${andra[andra.length - 1]}`;
  return [slug, {
    ort,
    titel: `Avlopp och avloppsjour i ${ort} · Rena Rör i Väst`,
    besk: `Stopp i avloppet i ${ort}? Spolning 2 250 kr efter ROT, framkörning ingår. Kamera, stamspolning och avloppsbyten. Jour dygnet runt på ${TEL}.`,
    hero: {
      eyebrow: `Avlopp i ${ort}`,
      h1: [`Stopp i ${ort}?`, 'Ring, så kommer vi.'],
      ingress: ort === 'Göteborg'
        ? 'Från Tuve till Eriksberg och Gårda. Spolning 2 250 kr efter ROT, framkörningen ingår.'
        : `Spolning 2 250 kr efter ROT, framkörningen till ${ort} ingår. Jour dygnet runt.`,
      bevis: ['2 250 kr efter ROT', 'Framkörning ingår', 'Jour dygnet runt'],
      bild: B(ORTBILD[i % ORTBILD.length], 'Ett av Rena Rörs jobb i Göteborgstrakten'),
    },
    steg: [STEG_RING, STEG_PRIS,
      { namn: `Vi kommer till ${ort}`, text: 'Med spolbilen och allt som behövs.' },
      { namn: 'Rena rör', text: 'Vi spolar loss stoppet och kontrollerar vattenlåset.' }],
    rader: ['avloppsspolning', 'rorinspektion', 'avloppsjour'],
    fragor: [
      { q: `Kommer ni till ${ort}?`, a: `Ja. Vi jobbar i ${ort} och i ${lista}.` },
      { q: 'Kostar det extra att köra hit?', a: 'Inte för spolningen. Framkörningen ingår i 2 250 kr efter ROT.' },
      { q: `Har ni jour i ${ort}?`, a: `Ja, dygnet runt. Ring ${TEL}.` },
      { q: 'Får jag priset innan ni kommer?', a: 'Ja, när vi bekräftar tiden.' },
      { q: 'Vad kostar filmning?', a: '3 500 kr med spolning, efter ROT. Med dokumentation och filmfiler 4 750 kr.' },
    ],
  }];
}));

const ALLA = { ...SIDOR, ...ORTSIDOR };

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
  const alla = tjanstKort();
  const rader = p.rader.map((r) => alla.find((k) => k.id === r));
  const data = sida({
    layout: 'styrelse',
    hero: { ...p.hero, knapp: { href: '#kontakt', txt: 'Boka tid' } },
    steg: { eyebrow: 'Så går det till', rubrik: ['Från samtal', 'till rena rör'], lista: p.steg },
    tjanster: { ...(p.raderRubrik || { eyebrow: 'Mer vi gör', rubrik: ['Det här', 'gör vi också'] }), kort: rader },
    varfor: { ...sida().varfor, rubrik: ['Fyra saker du', 'kan räkna med'] },
    nav: {
      vanster: [{ href: `${BAS}/`, txt: 'Startsida' }, { href: '#process', txt: 'Så går det till' }],
      hoger: [{ href: '#fragor', txt: 'Frågor' }, { href: `${BAS}/#priser`, txt: 'Priser' }],
      extra: [{ href: href('brf'), txt: 'För BRF' }, { href: TELHREF, txt: `Ring ${TEL}` }],
    },
    fragor: {
      eyebrow: 'Vanliga frågor',
      rubrik: ['Det du undrar', 'innan du ringer'],
      kort: { rubrik: 'Akut stopp?', text: `Ring ${TEL}. Vi svarar dygnet runt.` },
      lista: p.fragor,
    },
    kontaktSektion: { ...kontaktSektion(p.ort), ...(p.kundtypVald ? { kundtypVald: p.kundtypVald } : {}) },
  });
  delete data.priser;
  delete data.priserForst;
  delete data.siffror;
  delete data.tejp;
  delete data.jobb;
  delete data.om;
  return <DemoSida data={data} />;
}
