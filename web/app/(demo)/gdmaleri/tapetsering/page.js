import DemoSida from '../../_mall/DemoSida';
import { M, tema, logo, kontakt, cta, formular, bokning, kundtyp, formNot, epostNamn, footerTjanster, footerBild, footerLankar, menyExtra, navUndersida, hero, varfor, om, steg, instagramBas, RECO, SKV_ROT, samarbeten, tjanstSchema, GOOGLE_BETYG, GOOGLE_OMDOMEN, skapadAv } from '../_gd';

/* ===========================================================================
   GD MÅLERI STHLM AB — tjänstesida TAPETSERING (/gdmaleri/tapetsering/), 2026-10-13.
   Mathias 2026-10-13: "varje tjänst ska ha en undersida/landningssida". Slug på
   gdmaleri.se: /tapetsering/ (gammal WordPress-slug, 301:ade till /malning-invandigt/
   sedan 2026-10-10; 301:an är borttagen). /bredspackling-tapetborttagning/ 301:as hit.
   Samma mall, tema, logotyp, filmer och kontakt som huvudsidan (gemensamt i ../_gd.js).
   Tapet, bredspackling och tapetborttagning står kvar som ett kort på invandig-malning/.

   VERIFIERAT (2026-10-13), utöver huvudsidans VERIFIERAT-block:
   gdmaleri.se:s egna tjänstesidor (WordPress-versionen, v1.gdmaleri.se, hämtade
   2026-10-13): /tapetsering/: "Vi har erfarenhet av att arbeta med alla typer av
   tapeter, inklusive papperstapeter, non-woven och vinyltapeter"; gammal tapet tas
   bort, bredspackling där det behövs och grundning innan tapeten sätts upp;
   mönsterpassning och jämn finish; hjälp med val av tapet. /bredspackling-
   tapetborttagning/: "För att få ett snyggt och professionellt slutresultat vid
   målning eller tapetsering krävs ofta ett bra grundarbete", "Vi använder oss av
   rätt tekniker och verktyg för att ta bort tapeten utan att skada väggen"; flera
   lager eller hårt sittande tapet kan ta tid; efter borttagningen jämnas väggen
   till helt slät, redo för målning eller ny tapet. Leadfilens Tjänster-rad:
   "tapetsering", "bredspackling & tapetborttagning".
   Reco, femmor från verifierade kunder, ordagrant (samma citat som redan står på
   invandig-malning/ och huvudsidan): Nils F 2024-09-22 (innertak med sprickor,
   kortat med …), Pia T 2025-11-11 (lägenhetens väggar), Anders F 2025-12-19 (hall,
   trapphus, vardagsrum; RECO_LISTA). Google (GOOGLE_OMDOMEN): Viktor E ("3 rum
   med gamla tapeter och ojämnt tak till helt släta ytor"), Matteus E (radhus
   125 kvm invändigt, kortat av Google).
   Skatteverket (hämtat live 2026-10-13, SKV_ROT + "Så fungerar rotavdraget"):
   "Företaget får dra av högst 30 procent av arbetskostnaden på fakturan",
   "Högst 50 000 kronor får vara rotavdrag" (per person och år), "Du ska äga
   bostaden när arbetet utförs", "Material och resekostnader i samband med arbetet
   ger inte rätt till avdrag". Småhus: "tapetsera" och "måla golv, tak, väggar,
   fönster och element" ger rotavdrag. Bostadsrätt: bara arbete "innanför
   bostadens tak, väggar och golv".

   INTE verifierat, och finns därför inte på sidan: priser, ledtider, antal
   tapetjobb, tapetmärken, specifika spackelprodukter, egna tapeter i lager.
   FLAGGOR: inga foton av en tapetborttagning finns. Kortet "Tapetborttagning"
   visar en slät, nymålad vägg (jobb-panelvagg.jpg) och alt-texten säger det.
   Alla bilder är GD:s egna foton (inga genererade). Omdömena är fasta, inte
   levande, så att de handlar om tapet, spackel och väggar inomhus.
   OPTIMERING: egen titel och beskrivning, JSON-LD Service → HousePainter
   (@id gdmaleri.se/#business), inget betygsschema. Raden robots: index:false
   byts av extern/gdmaleri/kopiera.mjs mot canonical gdmaleri.se/tapetsering/.
   =========================================================================== */

export const metadata = {
  title: 'Tapetsering och bredspackling i Stockholm | GD Måleri Sthlm AB',
  description:
    'Tapetsering, bredspackling och tapetborttagning i Stockholm: gammal tapet bort, väggen slät, ny tapet eller färg upp. Kostnadsfri offert, ROT direkt på fakturan och 4,9 av 5 på Reco.',
  robots: { index: false, follow: false },
};

const schema = tjanstSchema({
  namn: 'Tapetsering, bredspackling och tapetborttagning i Stockholm',
  typ: 'Tapetsering',
  beskrivning: 'Tapetsering med papperstapet, non-woven och vinyl, bredspackling och tapetborttagning i Stockholm. ROT dras direkt på fakturan.',
});

const data = {
  namn: 'GD Måleri Sthlm AB',
  tema,
  logo,
  kontakt,
  cta,
  formular,
  bokning,
  nav: { ...navUndersida, extra: menyExtra('/gdmaleri/tapetsering/') },

  hero: { ...hero, ort: 'Tapet i Stockholm', tjanster: ['Tapetsering', 'Spackling'] },
  tejp: ['Tapetsering', 'Bredspackling', 'Tapetborttagning', 'Papperstapet, non-woven och vinyl', 'Mönsterpassning', '4,9 av 5 på Reco', 'ROT direkt på fakturan', 'Kostnadsfri offert'],

  tjanster: {
    eyebrow: 'Tapetsering',
    rubrik: ['Gammal tapet bort,', 'ny tapet upp'],
    lead: 'Vi tar bort den gamla tapeten, bredspacklar väggen slät och sätter upp ny tapet med mönsterpassning. Eller målar väggen, om du hellre vill det.',
    lattKort: true,
    kolumner: 3,
    kort: [
      { id: 'tapetsering', namn: 'Tapetsering', bild: `${M}/tjanst-tapet.jpg`, alt: 'Nyuppsatt mönstrad tapet runt en dörr', text: 'Papperstapet, non-woven eller vinyl, med mönsterpassning.', punkter: ['Alla typer av tapet', 'Grundning innan tapeten', 'Hjälp med val av tapet'], ritning: (<><path d="M40 16h50v88H40zM90 16h50v88H90z" /><path d="M140 16h20v88h-20" /><path d="M56 40l10 10M106 60l10 10M56 80l10 10" /></>) },
      { id: 'bredspackling', namn: 'Bredspackling', bild: `${M}/jobb-bredspackling.jpg`, alt: 'Vägg under bredspackling, golvet täckt med papper', text: 'Ojämnheter jämnas ut tills väggen är helt slät.', punkter: ['Före tapet eller färg', 'Golv och möbler täcks', 'ROT på arbetet'], ritning: (<><path d="M30 26h140v72H30z" /><path d="M30 26l22 16h96l22-16" /><path d="M52 42v56M148 42v56" /><path d="M72 70l20-14 20 14 20-14" /></>) },
      { id: 'tapetborttagning', namn: 'Tapetborttagning', bild: `${M}/jobb-panelvagg.jpg`, alt: 'Slät ljusgrön vägg ovanför en vitmålad bröstpanel, färdigt resultat efter spackling och målning', text: 'Gammal tapet bort utan att skada väggen, även flera lager.', punkter: ['Rätt verktyg och teknik', 'Flera lager går bra', 'Sedan tapet eller färg'], ritning: (<><path d="M30 26h140v72H30z" /><path d="M30 26l22 16h96l22-16" /><path d="M52 42v56M148 42v56" /><path d="M100 42c-10 14 10 20 0 34c-8 10 8 14 0 22" /></>) },
    ],
  },

  jobb: {
    eyebrow: 'Våra jobb',
    rubrik: ['Väggar och tak', 'vi har gjort släta'],
    lead: 'Rum, hallar och tak inomhus. Alla bilder är från våra egna projekt.',
    not: 'Kortet Tapetborttagning visar en färdig vägg efter spackling och målning, inte själva borttagningen. Fler jobb finns på vårt Instagram.',
    tid: '70s',
    rad1: [
      { src: `${M}/invandig-sodertalje-1.webp`, alt: 'Nymålat rum med ljusa väggar, vit taklist och skrivbord vid fönstret i Södertälje', txt: 'Södertälje: tak och väggar, 180 kvm' },
      { src: `${M}/jobb-spackel-tak.jpg`, alt: 'Målare i vit t-shirt spacklar ett innertak', txt: 'Innertak spacklas' },
      { src: `${M}/jobb-vardagsrum.jpg`, alt: 'Tomt vardagsrum med ljusrosa väggar och tre fönster', txt: 'Vardagsrum målat ljusrosa' },
      { src: `${M}/jobb-gul-hall.jpg`, alt: 'Hall i varmgul kulör med vita snickerier och balkongdörr', txt: 'Hall målad i gult' },
      { src: `${M}/jobb-sekelskifte.jpg`, alt: 'Ljust rum med två höga spröjsade fönster och radiatorer', txt: 'Rum målat i ljust' },
      { src: `${M}/tjanst-invandig.jpg`, alt: 'Rum med mörkblått målat tak, ljusa väggar och vitt fönster', txt: 'Tak målat mörkblått' },
    ],
    rad2: [
      { src: `${M}/invandig-sodertalje-2.webp`, alt: 'Nymålat vitt tak med taklampa och bred taklist mot ljusgrå väggar, en öppen dörr med glasrutor, i Södertälje', txt: 'Södertälje: nymålat tak' },
      { src: `${M}/jobb-trapphus.jpg`, alt: 'Trappa i ett hem med mörkrosa nederdel och ljus vägg ovanför', txt: 'Trappa målad i två kulörer' },
      { src: `${M}/jobb-bla-tak.jpg`, alt: 'Ljusblått målat tak med spotlightskena och bokhylla', txt: 'Tak målat ljusblått' },
      { src: `${M}/tjanst-snickerier.jpg`, alt: 'Spegeldörr målad i mörkgrönt i en ljus lägenhet', txt: 'Dörr målad mörkgrön' },
      { src: `${M}/jobb-taby-43.webp`, alt: 'Nymålad grå träfasad på ett modernt tvåvåningshus i Täby kyrkby, sedd från tomten', txt: 'Täby kyrkby, 350 kvm' },
      { src: `${M}/jobb-terrass.jpg`, alt: 'Nymålad laxrosa fasad och vit dörr vid en trädäcksaltan', txt: 'Fasad och dörr målade' },
    ],
  },

  varfor,
  om,
  steg: { ...steg, lista: steg.lista.map((s) => (s.ikon === 'arbete' ? { ...s, text: 'Golv och möbler täcks. Du hålls uppdaterad, och inget extra görs utan ditt ja.' } : s)) },

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Kunderna om', 'väggar och tak'],
    betyg: GOOGLE_BETYG,
    lista: [
      { namn: 'Nils F', kalla: 'Verifierad kund · Reco', text: 'Vi anlitade GD Måleri för att åtgärda taket i vår 20-talslägenhet, som hade stora sprickor på flera ställen. Vi fick dem rekommenderade av en granne och förstår verkligen varför. Vi är otroligt nöjda med resultatet! … När vissa områden behövde en andra omgång, kom de snabbt tillbaka och fixade det utan problem.' },
      { namn: 'Pia T', kalla: 'Verifierad kund · Reco', text: 'Väggarna i min lägenhet blev fint målade precis med den färg som jag önskade. Likaså gick det snabbt! Bra kommunikation o bästa samarbete. Tack - jag är så nöjd!' },
      { namn: 'Anders F', kalla: 'Verifierad kund · Reco', text: 'Vi anlitade GD Måleri Sthlm AB för att måla om hall, trapphus och vardagsrum, och är mycket nöjda med resultatet. Arbetet håller riktigt hög kvalitet, utfördes med stor erfarenhet och noggrannhet, och levererades helt enligt överenskommen tidsplan. Allt dessutom till ett väldigt bra pris. Vi upplevde kommunikationen som smidig och professionell genom hela processen. Starkaste rekommendationer – vi skulle utan tvekan anlita dem igen.' },
      GOOGLE_OMDOMEN.viktor,
      GOOGLE_OMDOMEN.matteus,
    ],
    not: 'Från Google (4,8 av 5, 19 recensioner) och Reco.se, där kundrelationen kontrolleras. Ordagrant, hämtade 2026-10-09, antalet 2026-10-13; två av dem kortade där det står …',
    lank: RECO,
  },

  instagram: { ...instagramBas, koder: ['DeNI1zEkcpW', 'DcmMHrIEbrF', 'Dd-zVd3ggOI'] },

  fragor: {
    eyebrow: 'Vanliga frågor om tapet',
    rubrik: ['Det ni brukar', 'fråga om tapeten'],
    lead: 'Pengar och risk först, det praktiska sedan.',
    kort: { rubrik: 'Hittar du inte svaret?', text: 'Ring och berätta om rummet, så svarar vi på just dina väggar.' },
    lista: [
      { q: 'Vad kostar tapetsering?', a: 'Det beror på hur många väggar det gäller, väggarnas skick och vilken tapet du väljer. Därför börjar GD Måleri Sthlm AB med en offert, och den är kostnadsfri. Offerten tar med material, arbete, förarbete som tapetborttagning och spackling, städning och bortforsling.' },
      { q: 'Får jag ROT-avdrag för tapetsering och bredspackling?', a: <>Ja, på arbetskostnaden: Skatteverket räknar tapetsering och målning av väggar och tak som rotarbete, och GD Måleri Sthlm AB drar av det direkt på fakturan. Avdraget är 30 procent av arbetskostnaden, högst 50 000 kronor per person och år, och gäller dig som äger och bor i bostaden. Materialet, alltså tapeten och spacklet, ger inget avdrag. I en bostadsrätt gäller avdraget arbete inne i lägenheten. Källa: <a href={SKV_ROT} target="_blank" rel="noopener">Skatteverket, Ger arbetet rätt till rotavdrag?</a></> },
      { q: 'Kan ni ta bort gammal tapet och bredspackla innan ni tapetserar?', a: 'Ja, det är det vanliga upplägget. GD Måleri Sthlm AB tar bort den gamla tapeten utan att skada väggen, även om det är flera lager, bredspacklar väggen slät och grundar innan den nya tapeten sätts upp. Vill du hellre ha en målad vägg efter spacklingen går det lika bra.' },
      { q: 'Vilka tapeter sätter ni upp?', a: 'Papperstapet, non-woven och vinyltapet. Vi hjälper gärna till med valet, oavsett om du vill ha en enfärgad tapet eller ett mönster, och sätter upp den med mönsterpassning.' },
      { q: 'Kan ni måla resten av rummet i samma jobb?', a: <>Ja. Tak, lister, dörrar och de väggar som ska målas i stället för tapetseras tas med i samma offert. Läs mer om <a href="/gdmaleri/invandig-malning/">invändig målning i Stockholm</a>.</> },
      { q: 'När betalar jag?', a: 'Du får fakturan från GD Måleri Sthlm AB när arbetet är klart och vi har gått igenom resultatet tillsammans, ingen förskottsbetalning.' },
      { q: 'Var arbetar ni?', a: 'I hela Stockholm. Senast målade GD Måleri Sthlm AB tak och väggar på 180 kvm i Södertälje, och innan dess rum i Nacka och Tyresö.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Begär en offert', 'på tapetseringen'],
    lead: 'Ring, eller skriv några rader om rummet. Du får en kostnadsfri offert där allt ingår, från tapetborttagning till städning.',
    checkar: ['Svar inom 24 timmar', 'Kostnadsfri offert, allt inräknat', 'ROT dras direkt på fakturan'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta kort om väggarna',
    placeholder: 'Antal rum eller väggar, gammal tapet som ska bort, tapet eller färg, och var i Stockholm',
    kundtyp,
    formNot,
    epostNamn,
    formNotBock: true,
  },

  popup: {
    rubrik: 'Dags för ny tapet?',
    text: 'Berätta om rummet så får du en offert som inte kostar något. ROT dras direkt på fakturan.',
  },

  footer: {
    text: 'Tapetsering, bredspackling och tapetborttagning i Stockholm. Kostnadsfri offert och slutbesiktning innan fakturan.',
    tjanster: footerTjanster,
    bild: footerBild, // Stockholms siluett i skymning, se _gd.js
    lankar: footerLankar, // Integritet och Cookieinställningar, se _gd.js
  },

  // KUND, inte förslag (Mathias 2026-10-09): ingen demo-knapp, ingen Bahko-modal, ingen byråtext i footern.
  kund: true,
  skapadAv,
  samarbeten,
};

export default function GdMaleriTapetsering() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <DemoSida data={data} />
    </>
  );
}
