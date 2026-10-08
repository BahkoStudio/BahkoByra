import DemoSida from '../../_mall/DemoSida';
import { M, tema, logo, kontakt, cta, formular, bokning, kundtyp, formNot, epostNamn, footerTjanster, menyExtra, navUndersida, hero, varfor, om, steg, instagramBas, RECO, SKV_ROT, modal, tjanstSchema } from '../_gd';

/* ===========================================================================
   GD MÅLERI STHLM AB — tjänstesida INVÄNDIG MÅLNING (/gdmaleri/invandig-malning/), 2026-10-08.
   Samma mall, tema, logotyp, filmer och kontakt som huvudsidan (gemensamt i ../_gd.js).
   Struktur efter förebilden marlonshantverksgrupp.se/invandigt-maleri/, ingen text kopierad.

   VERIFIERAT (2026-10-08), utöver huvudsidans VERIFIERAT-block:
   gdmaleri.se: invändig målning, tapetsering, bredspackling & tapetborttagning,
   takmålning (= INNERTAK), snickerier & fönstermålning, dörrmålning; "spackling,
   slipning och grundmålning", "hjälpa till med färgval och designförslag",
   "lägenhet, villa, kontorslokal eller trapphus".
   Reco, femmor från verifierade kunder, ordagrant (kortade med …): Nils F
   2024-09-22 (innertak med sprickor i 20-talslägenhet), Elin Linnea G 2024-09-09
   (flera våningar, många färgval), Pia T 2025-11-11 (lägenhetens väggar).
   Ytor ur Reco: lägenhet 80 kvm (Anneli N, verifierad), radhus 125 kvm invändigt
   (Oskar Matteus E, verifierad). IG DeNI1zEkcpW: "180 kvm Tak/Vägg målning samt
   microlituppsättning och snobbkant" (Södertälje).
   Skatteverket (hämtat 2026-10-08): "måla golv, tak, väggar, fönster och element",
   "måla eller lacka dörrar", "tapetsera" ger rotavdrag; bara arbetskostnaden.

   INTE verifierat, och finns därför inte på sidan: priser per kvm, ledtider,
   färgmärken utöver Flügger, antal rum/projekt.

   FLAGGOR: alla bilder är GD:s egna foton (samma som huvudsidan). Omdömena här
   är fasta (inte levande), så att de handlar om invändig målning.
   OPTIMERING: egen titel och beskrivning, JSON-LD Service → HousePainter
   (@id gdmaleri.se/#business), inget betygsschema, noindex tills flytten.
   =========================================================================== */

export const metadata = {
  title: 'Invändig målning i Stockholm | GD Måleri Sthlm AB',
  description:
    'Invändig målning i Stockholm: väggar, innertak, tapetsering, bredspackling, dörrar och snickerier. Kostnadsfri offert med allt inräknat, ROT direkt på fakturan och 4,9 av 5 på Reco.',
  robots: { index: false, follow: false },
};

const schema = tjanstSchema({
  namn: 'Invändig målning i Stockholm',
  typ: 'Invändig målning',
  beskrivning: 'Målning av väggar och innertak, tapetsering, bredspackling och tapetborttagning, och målning av dörrar och snickerier i Stockholm. ROT dras direkt på fakturan.',
});

const data = {
  namn: 'GD Måleri Sthlm AB',
  tema,
  logo,
  kontakt,
  cta,
  formular,
  bokning,
  nav: { ...navUndersida, extra: menyExtra('/gdmaleri/invandig-malning/') },

  hero: { ...hero, ort: 'Stockholm', tjanster: ['Invändig målning', 'Tapet'] },
  tejp: ['Väggar', 'Innertak', 'Tapetsering', 'Bredspackling', 'Tapetborttagning', 'Dörrar och lister', '4,9 av 5 på Reco', 'ROT direkt på fakturan'],

  tjanster: {
    eyebrow: 'Invändig målning',
    rubrik: ['Väggar, tak och', 'allt förarbete'],
    lead: 'Från en lägenhet på 80 kvm till ett radhus på 125 kvm. Vi spacklar, slipar och grundar själva, och golv och möbler täcks innan vi börjar.',
    lattKort: true,
    kort: [
      { id: 'vaggar', namn: 'Väggar', bild: `${M}/jobb-vardagsrum.jpg`, alt: 'Tomt vardagsrum med ljusrosa väggar och tre fönster', text: 'Ett rum eller hela hemmet, i kulören du väljer.', punkter: ['Spackling och slipning', 'Hjälp med färgval', 'Golv och möbler täcks'], ritning: (<><path d="M30 26h140v72H30z" /><path d="M30 26l22 16h96l22-16" /><path d="M52 42v56M148 42v56" /><path d="M84 60h32v24H84z" /></>) },
      { id: 'innertak', namn: 'Innertak', bild: `${M}/tjanst-invandig.jpg`, alt: 'Rum med mörkblått målat tak, ljusa väggar och vitt fönster', text: 'Sprickor lagas och taket målas jämnt.', punkter: ['Sprickor lagas', 'Spackling och grundmålning', 'Kulört eller vitt'], ritning: (<><path d="M20 30h160" /><path d="M20 30l30 24h100l30-24" /><path d="M50 54v46M150 54v46" /><path d="M70 40l10 6M110 38l-6 8" /></>) },
      { id: 'tapet', namn: 'Tapet och bredspackling', bild: `${M}/tjanst-tapet.jpg`, alt: 'Nyuppsatt mönstrad tapet runt en dörr', text: 'Gammal tapet bort, väggen slät, ny tapet eller färg upp.', punkter: ['Tapetborttagning', 'Bredspackling', 'Tapetsering'], ritning: (<><path d="M40 16h50v88H40zM90 16h50v88H90z" /><path d="M140 16h20v88h-20" /><path d="M56 40l10 10M106 60l10 10M56 80l10 10" /></>) },
      { id: 'snickerier', namn: 'Dörrar och snickerier', bild: `${M}/tjanst-snickerier.jpg`, alt: 'Spegeldörr målad i mörkgrönt i en ljus lägenhet', text: 'Dörrar, foder och lister skrapas, slipas och målas.', punkter: ['Dörrmålning', 'Foder och lister', 'Fönster inifrån'], ritning: (<><path d="M54 16h92v88H54z" /><path d="M66 28h68v30H66zM66 68h68v26H66z" /><path d="M136 62h4" /></>) },
    ],
  },

  jobb: {
    eyebrow: 'Våra jobb',
    rubrik: ['Rum vi har', 'målat om'],
    lead: 'Hallar, vardagsrum, tak och trappor. Alla bilder är från våra egna projekt.',
    not: 'Fler jobb, med ort och yta, finns på vårt Instagram.',
    tid: '70s',
    rad1: [
      { src: `${M}/jobb-sekelskifte.jpg`, alt: 'Ljust rum med två höga spröjsade fönster och radiatorer', txt: 'Rum målat i ljust' },
      { src: `${M}/jobb-gul-hall.jpg`, alt: 'Hall i varmgul kulör med vita snickerier och balkongdörr', txt: 'Hall målad i gult' },
      { src: `${M}/jobb-bla-tak.jpg`, alt: 'Ljusblått målat tak med spotlightskena och bokhylla', txt: 'Tak målat ljusblått' },
      { src: `${M}/jobb-panelvagg.jpg`, alt: 'Vitmålad bröstpanel under en ljusgrön vägg', txt: 'Bröstpanel målad vit' },
      { src: `${M}/jobb-trapphus.jpg`, alt: 'Trappa i ett hem med mörkrosa nederdel och ljus vägg ovanför', txt: 'Trappa målad i två kulörer' },
      { src: `${M}/jobb-spackel-tak.jpg`, alt: 'Målare i vit t-shirt spacklar ett innertak', txt: 'Innertak spacklas' },
      { src: `${M}/jobb-bredspackling.jpg`, alt: 'Vägg under bredspackling, golvet täckt med papper', txt: 'Vägg bredspacklas före målning' },
    ],
    rad2: [
      { src: `${M}/jobb-fonster-maskerade.jpg`, alt: 'Spröjsade fönster maskerade med blå tejp inför målning', txt: 'Fönster maskade före målning' },
      { src: `${M}/jobb-rod-fonster.jpg`, alt: 'Vitmålat spröjsat fönster i en röd träfasad', txt: 'Fönster målade vita' },
      { src: `${M}/jobb-fonsterbleck.jpg`, alt: 'Närbild på vitmålad fönsterbåge och svart fönsterbleck mot panel', txt: 'Fönsterbåge målad' },
      { src: `${M}/tjanst-fasad.jpg`, alt: 'Nymålad laxrosa panelfasad med vitt burspråksfönster och svart stuprör', txt: 'Panelfasad målad' },
      { src: `${M}/jobb-terrass.jpg`, alt: 'Nymålad laxrosa fasad och vit dörr vid en trädäcksaltan', txt: 'Fasad och dörr målade' },
      { src: `${M}/jobb-rod-timmer.jpg`, alt: 'Närbild på en rödmålad timmervägg med vit knutbräda och altanräcke', txt: 'Timmervägg målad i rött' },
    ],
  },

  varfor,
  om,
  steg,

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Kunderna om', 'jobben inomhus'],
    lista: [
      { namn: 'Nils F', kalla: 'Verifierad kund · Reco', text: 'Vi anlitade GD Måleri för att åtgärda taket i vår 20-talslägenhet, som hade stora sprickor på flera ställen. Vi fick dem rekommenderade av en granne och förstår verkligen varför. Vi är otroligt nöjda med resultatet! … När vissa områden behövde en andra omgång, kom de snabbt tillbaka och fixade det utan problem.' },
      { namn: 'Elin Linnea G', kalla: 'Verifierad kund · Reco', text: 'Större målning på flera våningar hos oss, med många olika färgval etc. Det hanterade de jättebra. Bra dialoger innan och under, lätta att få tag på och bra att resonera med. … Blev jättefint hemma - rekommenderar!' },
      { namn: 'Pia T', kalla: 'Verifierad kund · Reco', text: 'Väggarna i min lägenhet blev fint målade precis med den färg som jag önskade. Likaså gick det snabbt! Bra kommunikation o bästa samarbete. Tack - jag är så nöjd!' },
    ],
    not: 'Från Reco.se, där kundrelationen kontrolleras. Ordagrant, två av dem kortade där det står …',
    lank: RECO,
  },

  instagram: { ...instagramBas, koder: ['DeNI1zEkcpW', 'DcmMHrIEbrF', 'Dd-zVd3ggOI'] },

  fragor: {
    eyebrow: 'Vanliga frågor om invändig målning',
    rubrik: ['Det ni brukar', 'fråga först'],
    lead: 'Pengar och risk först, det praktiska sedan.',
    kort: { rubrik: 'Hittar du inte svaret?', text: 'Ring och berätta om rummen, så svarar vi på just ditt hem.' },
    lista: [
      { q: 'Vad kostar det att måla om inne?', a: 'Det beror på ytan, skicket och vad som ska göras. Därför börjar vi med en offert, och den är kostnadsfri. Offerten tar med material, arbete, förarbete som spackling och slipning, städning och bortforsling.' },
      { q: 'Får jag ROT-avdrag?', a: <>Ja, på arbetskostnaden. Skatteverket räknar att måla väggar, tak, dörrar och fönster och att tapetsera som rotarbete. Vi drar av det direkt på fakturan. Bor du i bostadsrätt gäller det arbete inne i lägenheten. Källa: <a href={SKV_ROT} target="_blank" rel="noopener">Skatteverket, Ger arbetet rätt till rotavdrag?</a></> },
      { q: 'Hur skyddar ni hemmet?', a: 'Allt som inte ska målas täcks med plast eller papper, och vi skyddar möbler och golv innan vi börjar.' },
      { q: 'Hjälper ni till med färgval?', a: 'Ja. Vi hjälper till med färgval och förslag, och färgen är Flügger. Miljövänliga alternativ finns.' },
      { q: 'När betalar jag?', a: 'Du får fakturan när arbetet är klart, ingen förskottsbetalning.' },
      { q: 'Har ni garanti?', a: 'Ja, ett år på måleriarbetet. Behöver något åtgärdas under den tiden gör vi det utan extra kostnad.' },
      { q: 'Målar ni kontor också?', a: 'Ja. Vi målar hemma hos privatpersoner och åt företag, från lägenheter och villor till kontorslokaler.' },
      { q: 'Var arbetar ni?', a: 'I hela Stockholm. I år har vi bland annat målat tak och väggar på 180 kvm i Södertälje.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Begär en offert,', 'den kostar ingenting'],
    lead: 'Ring, eller skriv några rader om rummen. Du får en kostnadsfri offert där allt ingår, från förarbete till bortforsling.',
    checkar: ['Svar inom 24 timmar', 'Kostnadsfri offert, allt inräknat', 'ROT dras direkt på fakturan'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta kort om jobbet',
    placeholder: 'Vilka rum, väggar, tak eller tapet, ungefärlig yta, och var i Stockholm',
    kundtyp,
    formNot,
    epostNamn,
    formNotBock: true,
  },

  popup: {
    rubrik: 'Dags att måla om?',
    text: 'Berätta vilka rum det gäller så får du en offert som inte kostar något. ROT dras direkt på fakturan.',
  },

  footer: {
    text: 'Invändig målning i Stockholm: väggar, innertak, tapetsering, bredspackling, dörrar och snickerier. Kostnadsfri offert och slutbesiktning innan fakturan.',
    tjanster: footerTjanster,
  },

  modal,
};

export default function GdMaleriInvandig() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <DemoSida data={data} />
    </>
  );
}
