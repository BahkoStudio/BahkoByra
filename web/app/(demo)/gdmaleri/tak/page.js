import DemoSida from '../../_mall/DemoSida';
import { M, tema, logo, kontakt, cta, formular, bokning, kundtyp, formNot, epostNamn, footerTjanster, menyExtra, navUndersida, hero, varfor, om, steg, instagramBas, RECO, SKV_ROT, modal, samarbeten, tjanstSchema } from '../_gd';

/* ===========================================================================
   GD MÅLERI STHLM AB — tjänstesida TAK (/gdmaleri/tak/), 2026-10-08. YTTERTAK.
   (gdmaleri.se:s "Takmålning" är innertak; det står på invandig-malning/.)
   Samma mall, tema, logotyp, filmer och kontakt som huvudsidan (gemensamt i ../_gd.js).
   Struktur efter förebilden marlonshantverksgrupp.se, ingen text kopierad.

   VERIFIERAT (2026-10-08), utöver huvudsidans VERIFIERAT-block:
   Taktvätt och takmålning (yttertak): Ghandi via Mathias 2026-10-08. Takfotona
   är Ghandis egna (images/5.png före, 6.png efter, samma jobb som IG-karusellen
   Dcja9QqkbrR) och visar TAKTVÄTT: jobb-tak-fore.jpg (före) och tjanst-tak.jpg
   (efter tvätt). Ingen bild påstås visa ett målat tak, och jobb.not säger det.
   Takfot och vindskivor: IG Dd-zVd3ggOI ("Väggar Vindskivor Takfot
   Fönsterkarmar", Bromma) och deras egen film (takfot rollas).
   Skatteverket (hämtat 2026-10-08): på småhus ger "rengöra … tak, takpannor"
   och "byta och reparera … takpannor" rotavdrag; i bostadsrätt inget avdrag
   för gemensamma ytor som tak. Bara arbetskostnaden.
   Reco, femmor från verifierade kunder, ordagrant: Torbjörn K 2025-09-20 ("fixa
   vår tak" — säger inte om det var yttertak eller innertak), Ola A 2026-08-25
   (2-plans hus, samma som huvudsidan), Edwin N 2025-01-18 (målning av mitt hus).

   INTE verifierat, och finns därför inte på sidan: tvättmetod, medel och
   kemikalier, takfärg/produkt, garanti på takmålning, ställning/lift,
   hängrännor, plåttak, priser, ledtider, antal tak.

   tak-vindskiva.jpg: bildruta 0:20.5 ur deras egen film (Omslag-hemsida-2.mp4,
   samma villa som heron; den delen av filmen används inte i någon film på sidan),
   beskuren till 4:3.

   FLAGGOR: tre tjänstekort (tjanster.kolumner: 3). Kortet Takmålning visar
   taket EFTER TVÄTT, inte målat. Omdömena är fasta (inte levande).
   OPTIMERING: egen titel och beskrivning, JSON-LD Service → HousePainter
   (@id gdmaleri.se/#business), inget betygsschema, noindex tills flytten.
   =========================================================================== */

export const metadata = {
  title: 'Taktvätt och takmålning i Stockholm | GD Måleri Sthlm AB',
  description:
    'Taktvätt och takmålning i Stockholm: mossa och lav bort, och taket målat om. ROT på småhus dras direkt på fakturan. Kostnadsfri offert och 4,9 av 5 på Reco.',
  robots: { index: false, follow: false },
};

const schema = tjanstSchema({
  namn: 'Taktvätt och takmålning i Stockholm',
  typ: 'Taktvätt och takmålning',
  beskrivning: 'Taktvätt och målning av yttertak i Stockholm, och målning av takfot och vindskivor. ROT på småhus dras direkt på fakturan.',
});

const data = {
  namn: 'GD Måleri Sthlm AB',
  tema,
  logo,
  kontakt,
  cta,
  formular,
  bokning,
  nav: { ...navUndersida, extra: menyExtra('/gdmaleri/tak/') },

  hero: { ...hero, ort: 'Tak i Stockholm', tjanster: ['Tvätt', 'Målning'] },
  tejp: ['Taktvätt', 'Takmålning', 'Mossa och lav bort', 'Takfot och vindskivor', 'ROT på småhus', '4,9 av 5 på Reco', 'Rekommenderat tre år i rad', 'Kostnadsfri offert'],

  tjanster: {
    eyebrow: 'Tak',
    rubrik: ['Mossan bort,', 'taket fräscht'],
    lead: 'Mossa och lav tvättas bort från takpannorna, och taket kan sedan målas om. På ett småhus dras ROT direkt på fakturan.',
    lattKort: true,
    kolumner: 3,
    kort: [
      { id: 'taktvatt', namn: 'Taktvätt', bild: `${M}/jobb-tak-fore.jpg`, alt: 'Betongpannetak med mossa och gul lav före taktvätt', text: 'Mossa och lav tvättas bort från pannorna.', punkter: ['Mossa och lav bort', 'Före målning eller för sig', 'ROT på småhus'], ritning: (<><path d="M16 76L100 24l84 52" /><path d="M36 64v40h128V64" /><path d="M70 50c4 6 4 10 0 14M100 40c4 6 4 10 0 14M130 50c4 6 4 10 0 14" /></>) },
      { id: 'takmalning', namn: 'Takmålning', bild: `${M}/tjanst-tak.jpg`, alt: 'Grått betongpannetak efter taktvätt, med en vit villa och tallar i bakgrunden', text: 'Efter tvätten kan taket målas om.', punkter: ['Tvätt först', 'Takfot och vindskivor', 'ROT på småhus'], ritning: (<><path d="M16 76L100 24l84 52" /><path d="M36 64v40h128V64" /><path d="M58 52l84 0M46 62h108" /><path d="M136 30v18" /></>) },
      { id: 'takfot', namn: 'Takfot och vindskivor', bild: `${M}/tak-vindskiva.jpg`, alt: 'Vitmålad vindskiva och balkongräcke på en vit villa mot blå himmel, bildruta ur GD Måleris egen film', text: 'Takfot och vindskivor målas i samma veva.', punkter: ['Takfot', 'Vindskivor', 'Samma offert som taket'], ritning: (<><path d="M20 90L100 30l80 60" /><path d="M34 94L100 44l66 50" /><path d="M60 64l6 6M84 48l6 6M116 48l-6 6M140 64l-6 6" /></>) },
    ],
  },

  jobb: {
    eyebrow: 'Våra jobb',
    rubrik: ['Hus och hem vi', 'har målat om'],
    lead: 'Fasader och fönster ute, rum och tak inne. Alla bilder är från våra egna projekt.',
    not: 'Takbilderna under Tjänster visar ett av våra tak före och efter tvätt. Fler jobb finns på vårt Instagram.',
    tid: '70s',
    rad1: [
      { src: `${M}/jobb-rod-timmer.jpg`, alt: 'Närbild på en rödmålad timmervägg med vit knutbräda och altanräcke', txt: 'Timmervägg målad i rött' },
      { src: `${M}/jobb-rod-fonster.jpg`, alt: 'Vitmålat spröjsat fönster i en röd träfasad', txt: 'Fönster målade vita' },
      { src: `${M}/jobb-langsida.jpg`, alt: 'Långsida på ett hus med laxrosa stående panel, vita fönster och svart stuprör', txt: 'Panel och fönster målade' },
      { src: `${M}/jobb-terrass.jpg`, alt: 'Nymålad laxrosa fasad och vit dörr vid en trädäcksaltan', txt: 'Fasad och dörr målade' },
      { src: `${M}/jobb-fonsterbleck.jpg`, alt: 'Närbild på vitmålad fönsterbåge och svart fönsterbleck mot panel', txt: 'Fönsterbåge målad' },
      { src: `${M}/tjanst-fasad.jpg`, alt: 'Nymålad laxrosa panelfasad med vitt burspråksfönster och svart stuprör', txt: 'Panelfasad målad' },
    ],
    rad2: [
      { src: `${M}/jobb-sekelskifte.jpg`, alt: 'Ljust rum med två höga spröjsade fönster och radiatorer', txt: 'Rum målat i ljust' },
      { src: `${M}/jobb-gul-hall.jpg`, alt: 'Hall i varmgul kulör med vita snickerier och balkongdörr', txt: 'Hall målad i gult' },
      { src: `${M}/jobb-bla-tak.jpg`, alt: 'Ljusblått målat tak med spotlightskena och bokhylla', txt: 'Innertak målat ljusblått' },
      { src: `${M}/jobb-panelvagg.jpg`, alt: 'Vitmålad bröstpanel under en ljusgrön vägg', txt: 'Bröstpanel målad vit' },
      { src: `${M}/jobb-vardagsrum.jpg`, alt: 'Tomt vardagsrum med ljusrosa väggar och tre fönster', txt: 'Vardagsrum målat ljusrosa' },
      { src: `${M}/jobb-spackel-tak.jpg`, alt: 'Målare i vit t-shirt spacklar ett innertak', txt: 'Innertak spacklas' },
    ],
  },

  varfor,
  om,
  steg,

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Kunderna om', 'tak och hus'],
    lista: [
      { namn: 'Torbjörn K', kalla: 'Verifierad kund · Reco', text: 'GD Måleri fick i uppdrag att fixa vår tak. Riktigt bra slutresultat och färdiga före utsatt slutdag. Kan varmt rekommendera GD Måleri.' },
      { namn: 'Ola A', kalla: 'Verifierad kund · Reco', text: 'Målning av 2-plans hus. Vi fick ett väldigt bra intryck av Ghandi då han gjorde en noggrann besiktning av huset innan offert skickades samt kom med förslag på saker vi inte hade tänkt på innan vad gäller estetik. Jobbet utfördes smidigt och snabbt och vi är jättenöjda. Jag kan starkt rekommendera GD Måleri.' },
      { namn: 'Edwin N', kalla: 'Verifierad kund · Reco', text: 'Jag anlitade GD Måleri för målning av mitt hus och är riktig nöjd med slutresultatet. Ghandi som ansvarade för projektet var serviceinriktad, punktlig och professionell. De levererade det vi hade kommit överens om och enligt tidplan, Jag stark rekommenderar GD Måler: Ghandi. Mvh Amin' },
    ],
    not: 'Från Reco.se, där kundrelationen kontrolleras. Ordagrant.',
    lank: RECO,
  },

  instagram: { ...instagramBas, koder: ['Dcja9QqkbrR', 'Dd-zVd3ggOI', 'DcmMHrIEbrF'] },

  fragor: {
    eyebrow: 'Vanliga frågor om tak',
    rubrik: ['Det ni brukar', 'fråga om taket'],
    lead: 'Pengar och risk först, det praktiska sedan.',
    kort: { rubrik: 'Hittar du inte svaret?', text: 'Ring och berätta om taket, så svarar vi på just ditt.' },
    lista: [
      { q: 'Vad kostar taktvätt eller takmålning?', a: 'Det beror på takets storlek, lutning och skick. Därför börjar vi med en offert, och den är kostnadsfri. Offerten tar med material, arbete, städning och bortforsling.' },
      { q: 'Får jag ROT-avdrag för taket?', a: <>På ett småhus, ja: Skatteverket räknar rengöring av tak och takpannor och underhåll av takpannor som rotarbete, och vi drar av det direkt på fakturan. Avdraget gäller bara arbetskostnaden. I en bostadsrättsförening är taket en gemensam yta och ger inget avdrag. Källa: <a href={SKV_ROT} target="_blank" rel="noopener">Skatteverket, Ger arbetet rätt till rotavdrag?</a></> },
      { q: 'Kan jag beställa bara taktvätt?', a: 'Ja. Taktvätt går att beställa för sig, och ska taket målas görs tvätten först.' },
      { q: 'Målar ni takfot och vindskivor?', a: 'Ja. Takfot och vindskivor kan ingå i samma offert som taket eller fasaden.' },
      { q: 'När betalar jag?', a: 'Du får fakturan när arbetet är klart, ingen förskottsbetalning.' },
      { q: 'Vad händer om något oväntat dyker upp?', a: 'Då hör vi av oss direkt och föreslår en lösning. Vi gör inga extraarbeten utan ditt godkännande.' },
      { q: 'Är ni försäkrade?', a: 'Ja. Vi har F-skatt och är fullt försäkrade via Trygg-Hansa.' },
      { q: 'Var arbetar ni?', a: 'I hela Stockholm.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Begär en offert', 'på taket'],
    lead: 'Ring, eller skriv några rader om taket. Du får en kostnadsfri offert där allt ingår.',
    checkar: ['Svar inom 24 timmar', 'Kostnadsfri offert, allt inräknat', 'ROT på småhus, direkt på fakturan'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta kort om taket',
    placeholder: 'Tvätt och/eller målning, typ av tak, ungefärlig storlek, och var i Stockholm',
    kundtyp,
    formNot,
    epostNamn,
    formNotBock: true,
  },

  popup: {
    rubrik: 'Mossa på taket?',
    text: 'Berätta om taket så får du en offert som inte kostar något. På småhus dras ROT direkt på fakturan.',
  },

  footer: {
    text: 'Taktvätt och takmålning i Stockholm, med takfot och vindskivor. Kostnadsfri offert och slutbesiktning innan fakturan.',
    tjanster: footerTjanster,
  },

  modal,
  samarbeten,
};

export default function GdMaleriTak() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <DemoSida data={data} />
    </>
  );
}
