import DemoSida from '../_mall/DemoSida';
import { bas, foretag, faqSchema, smulorSchema } from './_br';
import SynligHero from './_synlig-hero';

/* ===========================================================================
   BROMMA TRÄDGÅRDSSERVICE — KUND. Vinterdesign på mall v3 (2026-11-08).
   Mathias 2026-11-08: engångsundantag att ändra kundsajten, fokus snöröjning
   för vintern, SAMMA herofilm som förut, byggd som /hemsidor (kund: true).
   Gamla designen ligger kvar orörd i bahkobyra/cloud/brommatradgardsservice/
   (senaste ändring 615f2f1) och domänen pekar dit tills Mathias säger ja.

   VERIFIERAT (allt ur den nuvarande brommatradgardsservice.se, index.html):
   070-766 65 14, jens@brommatradgardsservice.se, Jens Amnesten leder arbetet,
   fyra personer i verksamheten, ansvarsförsäkring. Snöröjning och
   halkbekämpning: "Uppfarter, gångar och parkeringar röjs genom
   vintersäsongen, med halkbekämpning vid behov. Samma firma och samma
   kontaktperson året om." BRF-avtal med snöröjning genom vintern.
   Kostnadsfritt hembesök, pris innan start, svar inom 24 timmar, bortforsling
   ingår, ingen bindning. Maskiner: minigrävare 2 ton, Avant kompaktlastare,
   Husqvarna. Områden och FAQ ordagrant i sak. Omdömen ordagrant, alla fem
   stjärnor. Web3Forms-nyckeln är Jens egen (samma som på sajten).
   Resultat 35+ förfrågningar på 2 månader nämns INTE på sidan (byråns siffra).

   FLAGGOR: snöröjningskortets bild är en GENERERAD illustration
   (snorojning-illustration.webp, Qwen, 2026-11-08), alt-texten säger det.
   Byt mot Jens egna vinterfoton när de finns. Inga priser, inga
   jourtider, ingen utryckningstid för snö: inget sådant är belagt.
   Hero = GENERERAD vinterfilm (Wan 3.0 Prime ur snöbilden, 5 s, Mathias ja 2026-11-08). Gamla heron (egen film) finns i 615f2f1. Varför och kontakt är Brommas egna filmer.
   =========================================================================== */

export const metadata = {
  title: 'Snöröjning i Bromma och Stockholm | Bromma Trädgårdsservice',
  description:
    'Snöröjning och halkbekämpning av uppfarter, gångar och parkeringar i Bromma och Storstockholm. Skötselavtal för BRF året om. Kostnadsfritt hembesök.',
  robots: { index: false, follow: false },
  openGraph: { url: 'https://brommatradgardsservice.se/' },
};


// Google-profilens karta under formuläret, bara på startsidan (SOP steg 4.6). Samma cid som GOOGLE i _br.js.
const data = { ...bas, kontaktSektion: { ...bas.kontaktSektion, karta: { cid: '3748114357443815533', titel: 'Bromma Trädgårdsservice på Google Maps' } } };

export default function BrommaVinter() {
  return (
    <>
      <SynligHero />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(foretag) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(bas.fragor.lista)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(smulorSchema()) }} />
      <DemoSida data={data} />
    </>
  );
}
