import DemoSida from '../../_mall/DemoSida';
import { M, tema, logo, kontakt, cta, formular, bokning, kundtyp, formNot, epostNamn, footerTjanster, footerBild, footerLankar, footerOrter, menyExtra, navUndersida, hero, varfor, om, steg, instagramBas, RECO, SKV_ROT, samarbeten, tjanstSchema, GOOGLE_BETYG, GOOGLE_OMDOMEN, skapadAv } from '../_gd';

/* ===========================================================================
   GD MÅLERI STHLM AB — tjänstesida TAKTVÄTT (/gdmaleri/taktvatt/), 2026-10-13. YTTERTAK.
   Mathias 2026-10-13: "varje tjänst ska ha en undersida/landningssida". Slug på
   gdmaleri.se: /taktvatt/ (ny, fanns inte på WordPress-sajten). Takmålningen
   stannar på tak/ (/takmalning/), där taktvätt också är ett kort.
   Samma mall, tema, logotyp, filmer och kontakt som huvudsidan (gemensamt i ../_gd.js).

   VERIFIERAT (2026-10-13), utöver huvudsidans VERIFIERAT-block:
   Taktvätt och takmålning (yttertak): Ghandi via Mathias 2026-10-08. Takfotona är
   Ghandis egna (images/5.png före, 6.png efter, samma jobb som IG-karusellen
   Dcja9QqkbrR) och visar TAKTVÄTT: jobb-tak-fore.jpg (före, mossa och gul lav på
   betongpannor) och tjanst-tak.jpg (efter tvätt). tak-vindskiva.jpg: bildruta ur
   deras egen film (vit vindskiva och balkongräcke). Takfot och vindskivor: IG
   Dd-zVd3ggOI ("Väggar Vindskivor Takfot Fönsterkarmar", Bromma).
   Reco, femmor från verifierade kunder, ordagrant: Torbjörn K 2025-09-20 ("fixa
   vår tak", säger inte om det var yttertak eller innertak; samma citat som på
   tak/), Ola A 2026-08-25 (2-plans hus, RECO_LISTA), Inga-Lill M 2026-07-26
   (genomgång och påskrift av arbetsorder, RECO_LISTA). Google (GOOGLE_OMDOMEN):
   Oliwer C, Per (hus utvändigt).
   Skatteverket (hämtat live 2026-10-13, SKV_ROT + "Så fungerar rotavdraget"):
   30 procent av arbetskostnaden, högst 50 000 kr per person och år, du ska äga
   bostaden, material och resor ger inget avdrag. Småhus: "rengöra altandäck,
   fasader, tak, takpannor, hängrännor och solceller" ger rotavdrag. Bostadsrätt:
   rengöring av tak och takpannor ger inget avdrag, "gemensamma ytor, till exempel
   tak, fasader, trapphus och entréer" ger inget.

   INTE verifierat, och finns därför inte på sidan: tvättmetod, medel och
   kemikalier (högtryck, alg- och mossmedel, efterbehandling), taktyper utöver
   betongpannor (tegel, plåt, papp), hängrännor, hur ofta ett tak bör tvättas,
   takfärg/produkt, garanti på tvätt eller takmålning, ställning/lift, priser,
   ledtider, antal tak. "Alger" står på sidan som det taktvätt tar bort i
   allmänhet (uppdragets ordval), bilderna visar mossa och lav.
   FLAGGOR: tre tjänstekort (tjanster.kolumner: 3). Kortet "Takmålning som
   tillval" visar en vindskiva, inte ett målat tak: ingen bild av ett målat
   yttertak finns, och jobb.not säger det. Alla bilder är GD:s egna foton.
   Omdömena är fasta, inte levande, så att de handlar om tak och hus.
   OPTIMERING: egen titel och beskrivning, JSON-LD Service → HousePainter
   (@id gdmaleri.se/#business), inget betygsschema. Raden robots: index:false
   byts av extern/gdmaleri/kopiera.mjs mot canonical gdmaleri.se/taktvatt/.
   =========================================================================== */

export const metadata = {
  title: 'Taktvätt i Stockholm | GD Måleri Sthlm AB',
  description:
    'Taktvätt i Stockholm: mossa, alger och smuts tvättas bort från takpannorna, för sig eller inför takmålning. ROT på småhus dras direkt på fakturan. Kostnadsfri offert och 4,9 av 5 på Reco.',
  robots: { index: false, follow: false },
};

const schema = tjanstSchema({
  namn: 'Taktvätt i Stockholm',
  typ: 'Taktvätt',
  beskrivning: 'Rengöring av yttertak i Stockholm: mossa, alger och smuts tvättas bort från takpannorna, som egen tjänst eller inför takmålning. ROT på småhus dras direkt på fakturan.',
});

const data = {
  namn: 'GD Måleri Sthlm AB',
  tema,
  logo,
  kontakt,
  cta,
  formular,
  bokning,
  nav: { ...navUndersida, extra: menyExtra('/gdmaleri/taktvatt/') },

  hero: { ...hero, ort: 'Taktvätt i Stockholm', tjanster: ['Mossa bort', 'Rent tak'] },
  tejp: ['Taktvätt', 'Mossa och alger bort', 'Tvätt för sig', 'Eller inför takmålning', 'Takfot och vindskivor', 'ROT på småhus', '4,9 av 5 på Reco', 'Kostnadsfri offert'],

  tjanster: {
    eyebrow: 'Taktvätt',
    rubrik: ['Mossan bort,', 'taket rent'],
    lead: 'Mossa, alger och smuts samlas på takpannorna med åren. Vi tvättar bort det, så att taket blir rent igen. Vill du måla taket efteråt är det ett tillval.',
    lattKort: true,
    kolumner: 3,
    kort: [
      { id: 'fore', namn: 'Taktvätt', bild: `${M}/jobb-tak-fore.jpg`, alt: 'Betongpannetak med mossa och gul lav före taktvätt', text: 'Mossa, alger och smuts tvättas bort från pannorna.', punkter: ['Mossa och lav bort', 'Tvätt för sig', 'ROT på småhus'], ritning: (<><path d="M16 76L100 24l84 52" /><path d="M36 64v40h128V64" /><path d="M70 50c4 6 4 10 0 14M100 40c4 6 4 10 0 14M130 50c4 6 4 10 0 14" /></>) },
      { id: 'efter', namn: 'Resultatet', bild: `${M}/tjanst-tak.jpg`, alt: 'Grått betongpannetak efter taktvätt, med en vit villa och tallar i bakgrunden', text: 'Ett tak efter tvätten: rena pannor utan mossa.', punkter: ['Ett av våra egna tak', 'Rena pannor, ingen mossa', 'Kostnadsfri offert'], ritning: (<><path d="M16 76L100 24l84 52" /><path d="M36 64v40h128V64" /><path d="M58 52l84 0M46 62h108" /><path d="M136 30v18" /></>) },
      { id: 'malning', namn: 'Takmålning som tillval', bild: `${M}/tak-vindskiva.jpg`, alt: 'Vitmålad vindskiva och balkongräcke på en vit villa mot blå himmel, bildruta ur GD Måleris egen film', text: 'Efter tvätten kan taket målas om, med takfot och vindskivor.', punkter: ['Tvätt först', 'Takfot och vindskivor', 'Samma offert'], lank: { href: '/gdmaleri/tak/', txt: 'Allt om takmålning i Stockholm' }, ritning: (<><path d="M20 90L100 30l80 60" /><path d="M34 94L100 44l66 50" /><path d="M60 64l6 6M84 48l6 6M116 48l-6 6M140 64l-6 6" /></>) },
    ],
  },

  jobb: {
    eyebrow: 'Våra jobb',
    rubrik: ['Tak och hus vi', 'har gjort fina'],
    lead: 'Tak, fasader och fönster ute. Alla bilder är från våra egna projekt.',
    not: 'Takbilderna under Tjänster visar ett av våra tak före och efter tvätt. Ingen bild visar ett målat yttertak. Fler jobb finns på vårt Instagram.',
    tid: '70s',
    rad1: [
      { src: `${M}/jobb-bromma-altan.webp`, alt: 'Ljusgrå panelfasad med vita spröjsade altandörrar och fönsterkarmar mot ett trädäck', txt: 'Bromma: väggar och fönsterkarmar' },
      { src: `${M}/jobb-langsida.jpg`, alt: 'Långsida på ett hus med laxrosa stående panel, vita fönster och svart stuprör', txt: 'Panel och fönster målade' },
      { src: `${M}/jobb-rod-timmer.jpg`, alt: 'Närbild på en rödmålad timmervägg med vit knutbräda och altanräcke', txt: 'Timmervägg målad i rött' },
      { src: `${M}/jobb-taby-43.webp`, alt: 'Nymålad grå träfasad på ett modernt tvåvåningshus i Täby kyrkby, sedd från tomten', txt: 'Täby kyrkby, 350 kvm' },
      { src: `${M}/jobb-rod-fonster.jpg`, alt: 'Vitmålat spröjsat fönster i en röd träfasad', txt: 'Fönster målade vita' },
      { src: `${M}/jobb-terrass.jpg`, alt: 'Nymålad laxrosa fasad och vit dörr vid en trädäcksaltan', txt: 'Fasad och dörr målade' },
    ],
    rad2: [
      { src: `${M}/tjanst-fasad.jpg`, alt: 'Nymålad laxrosa panelfasad med vitt burspråksfönster och svart stuprör', txt: 'Panelfasad målad' },
      { src: `${M}/jobb-fonsterbleck.jpg`, alt: 'Närbild på vitmålad fönsterbåge och svart fönsterbleck mot panel', txt: 'Fönsterbåge målad' },
      { src: `${M}/jobb-fonster-maskerade.jpg`, alt: 'Spröjsade fönster maskerade med blå tejp inför målning', txt: 'Fönster maskade före målning' },
      { src: `${M}/jobb-taby-2.webp`, alt: 'Samma nymålade grå träfasad i Täby kyrkby, sedd från tomten med tallar och berghällar', txt: 'Täby kyrkby, från andra sidan' },
      { src: `${M}/jobb-bla-tak.jpg`, alt: 'Ljusblått målat tak med spotlightskena och bokhylla', txt: 'Innertak målat ljusblått' },
      { src: `${M}/jobb-sekelskifte.jpg`, alt: 'Ljust rum med två höga spröjsade fönster och radiatorer', txt: 'Rum målat i ljust' },
    ],
  },

  varfor,
  om,
  steg,

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Kunderna om', 'tak och hus'],
    betyg: GOOGLE_BETYG,
    lista: [
      { namn: 'Torbjörn K', kalla: 'Verifierad kund · Reco', text: 'GD Måleri fick i uppdrag att fixa vår tak. Riktigt bra slutresultat och färdiga före utsatt slutdag. Kan varmt rekommendera GD Måleri.' },
      { namn: 'Ola A', kalla: 'Verifierad kund · Reco', text: 'Målning av 2-plans hus. Vi fick ett väldigt bra intryck av Ghandi då han gjorde en noggrann besiktning av huset innan offert skickades samt kom med förslag på saker vi inte hade tänkt på innan vad gäller estetik. Jobbet utfördes smidigt och snabbt och vi är jättenöjda. Jag kan starkt rekommendera GD Måleri.' },
      { namn: 'Inga-Lill M', kalla: 'Verifierad kund · Reco', text: 'GD Måleri gav ett proffsigt intryck. Trevliga och informativa. Snyggt och snabbt arbete. Efter arbetet, genomgång och påskrift av arbetsorder. Jag är väldigt nöjd med resultatet. Rekommenderas varmt.' },
      GOOGLE_OMDOMEN.oliwer,
      GOOGLE_OMDOMEN.per,
    ],
    not: 'Från Google (4,8 av 5, 19 recensioner) och Reco.se, där kundrelationen kontrolleras. Ordagrant, hämtade 2026-10-09, antalet 2026-10-13.',
    lank: RECO,
  },

  instagram: { ...instagramBas, koder: ['Dcja9QqkbrR', 'Dd-zVd3ggOI', 'DcmMHrIEbrF'] },

  fragor: {
    eyebrow: 'Vanliga frågor om taktvätt',
    rubrik: ['Det ni brukar', 'fråga om taket'],
    lead: 'Pengar och risk först, det praktiska sedan.',
    kort: { rubrik: 'Hittar du inte svaret?', text: 'Ring och berätta om taket, så svarar vi på just ditt.' },
    lista: [
      { q: 'Vad kostar taktvätt?', a: 'Det beror på takets storlek, lutning och hur mycket mossa som sitter på pannorna. Därför börjar GD Måleri Sthlm AB med en offert, och den är kostnadsfri. Offerten tar med arbete, material, städning och bortforsling.' },
      { q: 'Får jag ROT-avdrag för taktvätt?', a: <>På ett småhus, ja: Skatteverket räknar rengöring av tak och takpannor som rotarbete, och GD Måleri Sthlm AB drar av det direkt på fakturan. Avdraget är 30 procent av arbetskostnaden, högst 50 000 kronor per person och år, och gäller dig som äger och bor i huset. Materialet ger inget avdrag. I en bostadsrättsförening är taket en gemensam yta och ger inget avdrag. Källa: <a href={SKV_ROT} target="_blank" rel="noopener">Skatteverket, Ger arbetet rätt till rotavdrag?</a></> },
      { q: 'Kan jag beställa bara taktvätt, utan målning?', a: 'Ja. Taktvätt går att beställa för sig hos GD Måleri Sthlm AB. Taket på bilderna under Tjänster är tvättat, inte målat.' },
      { q: 'Kan ni måla taket efter tvätten?', a: <>Ja, takmålning är ett tillval. Ska taket målas görs tvätten först, och takfot och vindskivor kan ingå i samma offert. Läs mer om <a href="/gdmaleri/tak/">takmålning i Stockholm</a>.</> },
      { q: 'När betalar jag?', a: 'Du får fakturan från GD Måleri Sthlm AB när arbetet är klart och vi har gått igenom resultatet tillsammans, ingen förskottsbetalning.' },
      { q: 'Var arbetar ni?', a: 'I hela Stockholm. I år har GD Måleri Sthlm AB bland annat jobbat på hus i Bromma, Täby kyrkby och på Värmdö.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Begär en offert', 'på taktvätten'],
    lead: 'Ring, eller skriv några rader om taket. Du får en kostnadsfri offert där allt ingår, bara tvätt eller tvätt och målning.',
    checkar: ['Svar inom 24 timmar', 'Kostnadsfri offert, allt inräknat', 'ROT på småhus, direkt på fakturan'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta kort om taket',
    placeholder: 'Typ av tak, ungefärlig storlek, bara tvätt eller tvätt och målning, och var i Stockholm',
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
    text: 'Taktvätt i Stockholm: mossa, alger och smuts bort från takpannorna, för sig eller inför takmålning. Kostnadsfri offert och slutbesiktning innan fakturan.',
    tjanster: footerTjanster,
    bild: footerBild, // Stockholms siluett i skymning, se _gd.js
    lankar: footerLankar, // Integritet och Cookieinställningar, se _gd.js
    orter: footerOrter, // Där vi jobbar: ortssidorna, se _gd.js
  },

  // KUND, inte förslag (Mathias 2026-10-09): ingen demo-knapp, ingen Bahko-modal, ingen byråtext i footern.
  kund: true,
  skapadAv,
  samarbeten,
};

export default function GdMaleriTaktvatt() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <DemoSida data={data} />
    </>
  );
}
