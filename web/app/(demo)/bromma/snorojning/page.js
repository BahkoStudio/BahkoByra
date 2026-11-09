import { Landning } from '../_sida';
import { bas, M } from '../_br';

/* SNÖRÖJNING (/bromma/snorojning/), 2026-11-08. Ny landningssida för vintern.
   VERIFIERAT: nuvarande brommatradgardsservice.se (startsida, BRF-sida, skötselsida): uppfarter,
   gångar, entréer och parkeringar röjs genom vintersäsongen, halkbekämpning vid behov, samma firma och
   kontaktperson året om, i BRF-avtal tillsammans med sommarskötseln. Kostnadsfritt besök, svar inom 24 h.
   INTE belagt, därför inte på sidan: utryckningstider, snödjup för utryckning, priser, säsongsavtalets villkor
   för villor, rutavdrag på snöskottning (står inte på nuvarande sajt). FLAGGOR: kortbilden är genererad. */
export const metadata = {
  title: 'Snöröjning och halkbekämpning i Bromma och Stockholm | Bromma Trädgårdsservice',
  description: 'Snöröjning av uppfarter, gångar, entréer och parkeringar i Bromma och Storstockholm, med halkbekämpning vid behov. Villor, BRF och fastigheter. Kostnadsfritt besök.',
  robots: { index: false, follow: false },
};

const fragor = [
  { q: 'Vad ingår i snöröjningen?', a: 'Vi röjer uppfarter, gångar, entréer och parkeringar genom hela vintersäsongen. Halkbekämpning gör vi vid behov.' },
  { q: 'Röjer ni åt villor eller bara åt föreningar?', a: 'Båda. Vi röjer åt villaägare, bostadsrättsföreningar och fastighetsägare i Bromma och hela Storstockholm.' },
  { q: 'Kan snöröjningen ligga i samma avtal som sommarskötseln?', a: 'Ja. Gräs, häckar, rabatter och löv genom säsongen och snöröjning genom vintern, i samma avtal och med samma kontaktperson.' },
  { q: 'Vad kostar snöröjning?', a: 'Det beror på ytan och hur åtkomlig den är. Vi kommer ut gratis, går igenom ytorna och ger ett pris innan vintern börjar. Du binder dig inte vid något.' },
  { q: 'Vilka områden kör ni snöröjning i?', a: 'Vi utgår från Bromma och kör i hela Storstockholm, bland annat Västerort, Solna, Sundbyberg, Lidingö, Täby, Nacka och Ekerö. Är du osäker, ring 070-766 65 14.' },
];

export default function Sida() {
  return <Landning schema={{ namn: 'Snöröjning och halkbekämpning', typ: 'Snöröjning', beskrivning: metadata.description }} sida={{
    hero: { ...bas.hero, rubrik: { fraga: 'Snöröjning i Bromma och Stockholm', svar: 'Snö & Halka.' } },
    tejp: ['Snöröjning', 'Halkbekämpning', 'Uppfarter', 'Gångar och entréer', 'Parkeringar', 'Villor och BRF', 'Samma kontaktperson året om'],
    tjanster: { ...bas.tjanster, eyebrow: 'Snöröjning', rubrik: ['Det vi håller', 'fritt i vinter'], lead: 'En uppfart som är röjd när du ska till jobbet. En entré där ingen halkar. Vi tar snön genom hela säsongen, och halkan när det behövs.', kolumner: 3,
      kort: [
        { id: 'villa', namn: 'Villa och uppfart', bild: `${M}/snorojning-illustration.webp`, alt: 'Illustrationsbild: nyskottad uppfart framför en röd villa en vintermorgon', text: 'Uppfart och gångar röjda hela vintern.', punkter: ['Uppfart', 'Gångar till entrén', 'Halkbekämpning vid behov'] },
        { id: 'brf', namn: 'BRF och fastighet', bild: `${M}/efter-klippt-grasmatta-rabatter.webp`, alt: 'Skött gård med gräsmatta och rabatter', text: 'Entréer, gångar och parkeringar, i samma avtal som sommaren.', punkter: ['Entréer och gångar', 'Parkeringar', 'Ett avtal året om'], lank: { href: '/bromma/tradgardsskotsel-brf/', txt: 'Skötselavtal för BRF' } },
        { id: 'aret', namn: 'Samma team året om', bild: `${M}/nyanlagd-grasmatta-skarpa-kanter.webp`, alt: 'Nyanlagd gräsmatta med skarpa kanter', text: 'När snön smält klipper och planterar vi.', punkter: ['Gräs och häck', 'Anläggning', 'En kontaktperson'], lank: { href: '/bromma/tradgardsskotsel/', txt: 'Trädgårdsskötsel' } },
      ] },
    fragor: { ...bas.fragor, eyebrow: 'Frågor om snöröjning', rubrik: ['Det folk frågar', 'innan vintern'], lista: fragor },
    kontaktSektion: { ...bas.kontaktSektion, rubrik: ['Snöröjning', 'i vinter?'], placeholder: 'Uppfart, gång eller parkering, ungefärlig yta och var du bor' },
  }} />;
}
