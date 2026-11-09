import { Landning } from '../_sida';
import { bas, M, SKV_RUT } from '../_br';

/* HÄCK (/bromma/hackklippning/), samma slug som nuvarande sajt. Text ur nuvarande
   brommatradgardsservice.se/hackklippning/ (2026-11-08). Omdömen: Marta (tujahäck) och Sifat (häckbyte). */
export const metadata = {
  title: 'Häckklippning, häckplantering och borttagning i Bromma | Bromma Trädgårdsservice',
  description: 'Vi klipper häckar, planterar nya på rätt djup och tar bort gamla med rothalsen. Plantor, jord och bortforsling ingår. Planera vårens häck under vintern.',
  robots: { index: false, follow: false },
};

const fragor = [
  { q: 'När är bästa tiden att plantera häck?', a: 'Vår och höst. Barrotade plantor sätts tidig vår innan knoppbrytning eller sen höst efter lövfällning. Krukodlade plantor går hela säsongen om de vattnas. Ska häcken stå klar till sommaren avgörs det av planeringen under vintern.' },
  { q: 'Får jag rutavdrag på häckbyte?', a: <>Borttagningen av den gamla häcken ger rutavdrag, planteringen av den nya gör det inte, och bortforslingen räknas inte in. Vi delar upp posterna på fakturan. Källa: <a href={SKV_RUT} target="_blank" rel="noopener">Skatteverket</a>.</> },
  { q: 'Tar ni rötterna när en gammal häck ska bort?', a: 'Ja, vi tar häcken med rothalsen och kör bort allt samma dag. Lämnas rötterna kvar skjuter många arter nya skott.' },
  { q: 'Vad kostar en häck?', a: 'Det beror på art, höjd, antal meter och åtkomst. Vi kommer ut, mäter och ger ett pris med plantor, jord, täckmaterial, arbete och bortforsling inräknat.' },
  { q: 'Tar ni hand om hela häckbytet?', a: 'Ja. Vi beställer plantorna, tar emot leveransen av jord och täckmaterial, tar bort den gamla häcken och kör bort allt. Du har en kontaktperson hela vägen.' },
];

export default function Sida() {
  return <Landning schema={{ namn: 'Häckklippning och häckplantering', typ: 'Häckklippning', beskrivning: metadata.description }} sida={{
    hero: { ...bas.hero, rubrik: { fraga: 'Häck i Bromma och Stockholm', svar: 'Klipp & Plantering.' } },
    tejp: ['Häckklippning', 'Häckplantering', 'Tuja och liguster', 'Borttagning med rothals', 'Plantor och jord ingår', 'Bortforsling samma dag'],
    tjanster: { ...bas.tjanster, eyebrow: 'Häck', rubrik: ['Tre olika jobb', 'på samma häck'], lead: 'Klippa, plantera och ta bort skiljer sig i tid, pris och rutavdrag. Vi går igenom skillnaden innan du bestämmer dig.', kolumner: 3,
      kort: [
        { id: 'klipp', namn: 'Häckklippning', bild: `${M}/nyplanterad-hack-raka-linjer.webp`, alt: 'Häck i raka linjer', text: 'I form uppåt och på sidorna, riset bortkört samma dag.', punkter: ['Formklippning', 'Bortforsling', 'Rutavdrag'] },
        { id: 'plantera', namn: 'Häckplantering', bild: `${M}/anlagd-tradgard-planteringar.webp`, alt: 'Nyanlagd trädgård med planteringar', text: 'Rätt djup, rätt jord, täckmaterial. Vi beställer plantorna.', punkter: ['Tuja och liguster', 'Jord och täckmaterial', 'Leverans tas emot'] },
        { id: 'bort', namn: 'Ta bort gammal häck', bild: `${M}/fore-igenvuxen-tradgard.webp`, alt: 'Igenvuxen trädgård före arbetet', text: 'Med rothalsen, inte bara det som syns. Allt bort samma dag.', punkter: ['Rothalsen med', 'Bortforsling', 'Rutavdrag på borttagningen'] },
      ] },
    omdomen: { ...bas.omdomen, rubrik: ['Kunder om', 'sina häckar'], googleLista: [bas.omdomen.googleLista[0], ...bas.omdomen.googleLista.slice(2)], lista: [bas.omdomen.lista[0]] },
    fragor: { ...bas.fragor, eyebrow: 'Frågor om häck', lista: fragor },
  }} />;
}
