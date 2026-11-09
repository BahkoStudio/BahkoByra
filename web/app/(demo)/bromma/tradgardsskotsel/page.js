import { Landning } from '../_sida';
import { bas, M, SKV_RUT } from '../_br';

/* TRÄDGÅRDSSKÖTSEL (/bromma/tradgardsskotsel/), samma slug som nuvarande sajt. All text ur
   nuvarande brommatradgardsservice.se/tradgardsskotsel/ (2026-11-08). Rut-listan följer Skatteverket (länk). */
export const metadata = {
  title: 'Trädgårdsskötsel i Bromma och Storstockholm | Bromma Trädgårdsservice',
  description: 'Gräsklippning, häckklippning, ogräsrensning, beskärning och löv genom säsongen, snöröjning på vintern. Rutavdrag på arbetet och kostnadsfritt hembesök.',
  robots: { index: false, follow: false },
};

const fragor = [
  { q: 'Får jag rutavdrag på trädgårdsskötsel?', a: <>Ja, på arbetskostnaden för skötsel: gräs- och häckklippning, krattning, ogräsrensning, beskärning och mossbekämpning. Nyanläggning, plantering och bortforsling ger inget avdrag. Källa: <a href={SKV_RUT} target="_blank" rel="noopener">Skatteverket</a>.</> },
  { q: 'Hur ofta kommer ni?', a: 'De flesta väljer ett fast intervall genom säsongen. Andra hör av sig när det vuxit till sig. Vi går igenom vad som passar din tomt vid hembesöket.' },
  { q: 'Vad kostar skötseln?', a: 'Det beror på tomten. Slänter, träd och trånga passager tar längre tid än en öppen yta. Vi kommer ut gratis, räknar och ger ett pris innan vi börjar.' },
  { q: 'Måste jag vara hemma?', a: 'Nej. Behöver vi vatten, el eller garage stämmer vi av det i förväg.' },
  { q: 'Gör ni snöröjning också?', a: 'Ja. Uppfarter, gångar och parkeringar röjs genom vintern, med samma kontaktperson som på sommaren.' },
];

export default function Sida() {
  return <Landning schema={{ namn: 'Trädgårdsskötsel', typ: 'Trädgårdsskötsel', beskrivning: metadata.description }} sida={{
    hero: { ...bas.hero, rubrik: { fraga: 'Trädgårdsskötsel i Bromma', svar: 'Gräs & Häck.' } },
    tejp: ['Gräsklippning', 'Häckklippning', 'Ogräsrensning', 'Beskärning', 'Löv och krattning', 'Snöröjning', 'Rutavdrag på arbetet'],
    tjanster: { ...bas.tjanster, eyebrow: 'Skötsel', rubrik: ['Tomten i skick', 'år efter år'], lead: 'Skötsel är det som håller tomten jämn. Du väljer fast intervall eller att vi kommer när det behövs.', kolumner: 3,
      kort: [
        { id: 'gras', namn: 'Gräsklippning', bild: `${M}/efter-klippt-grasmatta-rabatter.webp`, alt: 'Nyklippt gräsmatta och rensade rabatter', text: 'Kanter trimmade, klippet omhändertaget, mossan bekämpad.', punkter: ['Klippning', 'Kantklippning', 'Mossbekämpning'] },
        { id: 'hack', namn: 'Häck och buskar', bild: `${M}/nyplanterad-hack-raka-linjer.webp`, alt: 'Häck i raka linjer', text: 'Klippt i form, riset bortkört.', punkter: ['Häckklippning', 'Beskärning', 'Bortforsling'], lank: { href: '/bromma/hackklippning/', txt: 'Allt om häck' } },
        { id: 'lov', namn: 'Löv och rabatter', bild: `${M}/anlagd-tradgard-planteringar.webp`, alt: 'Trädgård med planteringar', text: 'Rabatter rensade, löven bort innan snön kommer.', punkter: ['Ogräsrensning', 'Krattning', 'Höststädning'] },
      ] },
    // Design-loop struktur 2026-11-09: egna rubriker och texter i Varför, Om och Kontakt, inga sektioner som kopierar startsidan.
    varfor: { ...bas.varfor, eyebrow: 'Varför oss för skötseln', rubrik: ['Samma händer', 'varje gång'], lead: 'Skötsel blir bra när samma person ser tomten vecka efter vecka och märker vad som ändras.',
      punkter: [
        { rubrik: 'Fast intervall eller vid behov', text: 'Varannan vecka, en gång i månaden eller när du ringer. Du väljer.' },
        { rubrik: 'Rutavdrag på arbetet', text: 'Klippning, rensning, krattning och beskärning ger avdrag. Vi drar det på fakturan.' },
        { rubrik: 'Allt körs bort', text: 'Klipp, ris och löv följer med oss samma dag. Ingen hög vid tomtgränsen.' },
        { rubrik: 'Egna maskiner', text: 'Husqvarna för gräs och häck, minigrävare när rabatten ska göras om.' },
      ] },
    om: { ...bas.om, rubrik: ['Trädgårdar är', 'där vi började'], stycken: [
      'Bromma Trädgårdsservice började med gräsklippning och häckar åt villaägare i Bromma, och det är fortfarande kärnan i verksamheten.',
      'I dag sköter vi trädgårdar åt villor och föreningar i hela Storstockholm, och tar snön på samma tomter när vintern kommer.',
    ] },
    steg: null,
    instagram: null,
    fragor: { ...bas.fragor, eyebrow: 'Frågor om skötsel', lista: fragor },
    kontaktSektion: { ...bas.kontaktSektion, rubrik: ['Boka', 'trädgårdshjälp'], lead: 'Skriv några rader om tomten och vad som ska göras. Du får ett pris eller en tid för hembesök inom 24 timmar.', placeholder: 'Gräs, häck, rabatter eller löv, ungefärlig yta och var du bor' },
  }} />;
}
