import { Landning } from '../_sida';
import { bas, M, SKV_BRF } from '../_br';

/* BRF (/bromma/tradgardsskotsel-brf/), samma slug som nuvarande sajt. Text ur nuvarande
   brommatradgardsservice.se/tradgardsskotsel-brf/ (2026-11-08): gräs, häck, rabatter, löv, snöröjning och
   halkbekämpning i samma avtal, BRF Körsbärsdalen i Bromma som tidigare uppdrag, fast månadsavgift,
   tolv månaders avtal med tre månaders uppsägning, ingen rut för förening (Skatteverket, länk). */
export const metadata = {
  title: 'Skötselavtal för BRF och fastighetsägare i Stockholm, snöröjning ingår | Bromma Trädgårdsservice',
  description: 'Gräs, häckar, rabatter och löv på sommaren, snöröjning och halkbekämpning på vintern, i ett avtal med en kontaktperson. Kostnadsfri genomgång av föreningens ytor.',
  robots: { index: false, follow: false },
};

const fragor = [
  { q: 'Vad ingår i ett skötselavtal?', a: 'Gräsytor, häckar och buskar, rabatter och ogräs, löv och höststädning, snöröjning och halkbekämpning, och bortforsling i egen regi. Styrelsen väljer vilka delar som ska ingå.' },
  { q: 'Får föreningen rutavdrag?', a: <>Nej. En bostadsrättsförening är en juridisk person, och skötsel av föreningens mark ger inget rutavdrag. Vi räknar därför alltid på bruttopris mot föreningar. Källa: <a href={SKV_BRF} target="_blank" rel="noopener">Skatteverket</a>.</> },
  { q: 'Hur ser avtalet ut?', a: 'Fast månadsavgift, tolv månaders avtal och tre månaders uppsägning.' },
  { q: 'Har ni gjort uppdrag åt föreningar tidigare?', a: 'Ja, bland annat åt BRF Körsbärsdalen i Bromma, med löpande trädgårdsskötsel, upprustning och underhåll. Referenser lämnas på förfrågan.' },
  { q: 'Vad händer vid sjukdom eller semester?', a: 'Fyra personer arbetar i verksamheten, så avtalad skötsel genomförs enligt plan.' },
];

export default function Sida() {
  return <Landning schema={{ namn: 'Skötselavtal för BRF och fastighetsägare', typ: 'Utemiljöskötsel och snöröjning', beskrivning: metadata.description }} sida={{
    hero: { ...bas.hero, rubrik: { fraga: 'Skötselavtal för BRF i Stockholm', svar: 'Sommar & Vinter.' } },
    tejp: ['Skötselavtal för BRF', 'Snöröjning ingår', 'Halkbekämpning', 'Gräs och häckar', 'Löv och höststädning', 'En kontaktperson', 'Fast månadsavgift'],
    tjanster: { ...bas.tjanster, eyebrow: 'BRF och fastighet', rubrik: ['Ett avtal,', 'hela året'], lead: 'Två leverantörer betyder två avtal och två parter att ringa. Vi tar både sommaren och snön, och det är samma person som svarar i juli och i januari.', kolumner: 3,
      kort: [
        { id: 'vinter', namn: 'Snöröjning och halka', bild: `${M}/snorojning-illustration.webp`, alt: 'Illustrationsbild: nyskottad gång en vintermorgon', text: 'Uppfarter, gångar, entréer och parkeringar genom vintern.', punkter: ['Entréer', 'Parkeringar', 'Halkbekämpning'], lank: { href: '/bromma/snorojning/', txt: 'Allt om snöröjning' } },
        { id: 'sommar', namn: 'Gräs, häck och rabatter', bild: `${M}/efter-klippt-grasmatta-rabatter.webp`, alt: 'Skött gård med gräsmatta och rabatter', text: 'Fast intervall genom säsongen, fri sikt vid infarter.', punkter: ['Gräsytor', 'Häckar', 'Rabatter'] },
        { id: 'host', namn: 'Löv och bortforsling', bild: `${M}/anlagd-tradgard-planteringar.webp`, alt: 'Trädgård med planteringar', text: 'Löv bort innan snön kommer. Ingen container att boka.', punkter: ['Höststädning', 'Bortforsling', 'Egna maskiner'] },
      ] },
    steg: { eyebrow: 'Så fungerar avtalet', rubrik: ['Ett avtal,', 'en kontaktperson'], lista: [
      { namn: 'Genomgång av ytorna', text: 'Vi går igenom föreningens gård, gångar och parkeringar med styrelsen. Genomgången är kostnadsfri.', ikon: 'kontakt' },
      { namn: 'Avtalsförslag', text: 'Styrelsen väljer vilka delar som ska ingå, sommar som vinter. Bruttopris, eftersom föreningar inte får rutavdrag.', ikon: 'offert' },
      { namn: 'Fast månadsavgift', text: 'Ett pris per månad för det som ingår, sommar som vinter. Inga tillägg utan att styrelsen sagt ja.', ikon: 'arbete' },
      { namn: 'Rapport till styrelsen', text: 'Ni har ett nummer att ringa, och vi hör av oss när något på gården behöver ett beslut.', ikon: 'klart' },
    ] },
    // Design-loop struktur 2026-11-09: egna rubriker och texter i Varför och Om, inga sektioner som kopierar startsidan.
    varfor: { ...bas.varfor, eyebrow: 'Varför oss för föreningen', rubrik: ['En leverantör,', 'inte två'], lead: 'Styrelsen slipper hålla isär sommarfirman och snöfirman. Samma person ansvarar för gården året om.',
      punkter: [
        { rubrik: 'En kontaktperson', text: 'Jens leder arbetet och är den styrelsen ringer, oavsett årstid.' },
        { rubrik: 'Fyra personer', text: 'Blir någon sjuk sätts en ersättare in. Gården blir inte liggande.' },
        { rubrik: 'Ansvarsförsäkrade', text: 'Händer något på gården är det vår försäkring som gäller.' },
        { rubrik: 'Egna maskiner', text: 'Kompaktlastare för parkeringarna, minigrävare för planteringarna. Inget inhyrt.' },
      ] },
    om: { ...bas.om, rubrik: ['Gårdar vi sköter', 'året om'], stycken: [
      'Bromma Trädgårdsservice sköter utemiljön åt bostadsrättsföreningar och fastighetsägare i Bromma och hela Storstockholm.',
      'Vi jobbar lika mycket åt villaägare, så vi vet vad de boende ser när de kommer hem: klippta kanter, rensade rabatter och en röjd entré.',
    ] },
    instagram: null,
    fragor: { ...bas.fragor, eyebrow: 'Frågor från styrelser', lista: fragor },
    kontaktSektion: { ...bas.kontaktSektion, rubrik: ['Begär', 'avtalsförslag'], lead: 'Skriv föreningens namn och vilka ytor det gäller. Vi bokar en kostnadsfri genomgång med styrelsen och skickar ett förslag.', placeholder: 'Föreningens namn, ytor och om snöröjning ska ingå' },
  }} />;
}
