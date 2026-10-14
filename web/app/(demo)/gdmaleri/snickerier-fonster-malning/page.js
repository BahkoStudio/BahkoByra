import DemoSida from '../../_mall/DemoSida';
import { M, tema, logo, kontakt, cta, formular, bokning, kundtyp, formNot, epostNamn, footerTjanster, footerBild, footerLankar, menyExtra, navUndersida, hero, varfor, om, steg, instagramBas, RECO, SKV_ROT, samarbeten, tjanstSchema, GOOGLE_BETYG, GOOGLE_OMDOMEN, skapadAv } from '../_gd';

/* ===========================================================================
   GD MÅLERI STHLM AB — tjänstesida FÖNSTER OCH SNICKERIER
   (/gdmaleri/snickerier-fonster-malning/), 2026-10-13.
   Mathias 2026-10-13: "varje tjänst ska ha en undersida/landningssida". Slug på
   gdmaleri.se: /snickerier-fonster-malning/ (gammal WordPress-slug, 301:ade till
   /fasad-malning/ sedan 2026-10-10; 301:an är borttagen). Fönster och dörrar står
   kvar som kort på fasad/ (ute) och invandig-malning/ (inne).
   Samma mall, tema, logotyp, filmer och kontakt som huvudsidan (gemensamt i ../_gd.js).

   VERIFIERAT (2026-10-13), utöver huvudsidans VERIFIERAT-block:
   gdmaleri.se:s egen tjänstesida /snickerier-fonster-malning/ (WordPress-versionen,
   v1.gdmaleri.se, hämtad 2026-10-13): "Snickerier och fönster kräver noggrant
   underhåll för att förbli i gott skick"; fönster är extra utsatta för väder, utan
   underhåll flagnar färgen och träet spricker; gamla färglager skrapas bort, ytan
   slipas och grundas innan täckfärgen; färg som skyddar träet mot fukt och UV;
   "både inom- och utomhussnickerier, till exempel dörrar, lister, fönsterbågar och
   andra trädetaljer". gdmaleri.se/vara-tjanster/ (leadfilen): "träfönster,
   metallfönster". Instagram Dd-zVd3ggOI, ordagrant: "Väggar Vindskivor Takfot
   Fönsterkarmar" (Bromma, 234 kvm). Google (GOOGLE_OMDOMEN): Thorellski
   ("målning av vita snickerier samt byte av ruttna fönsterfoder"), Per (hus
   utvändigt), Jenny E (tydlig offert). Reco (RECO_LISTA), femmor från verifierade
   kunder, ordagrant: Stefan G 2026-07-22 (träfasad), Bo M 2026-08-28 (två
   fritidshus och en sjöstuga).
   Skatteverket (hämtat live 2026-10-13, SKV_ROT + "Så fungerar rotavdraget"):
   30 procent av arbetskostnaden, högst 50 000 kr per person och år, du ska äga
   bostaden, material och resor ger inget avdrag. Småhus: "måla golv, tak, väggar,
   fönster och element" ger rotavdrag. Bostadsrätt: "måla innerdörrar och insidan
   av ytterdörrar och fönster" ger avdrag, "måla eller olja utsidan av fönster
   eller ytterdörrar" ger inget.

   INTE verifierat, och finns därför inte på sidan: köksluckor (nämns inte av GD
   själva; Skatteverket nämner dem bara som exempel), fönsterrenovering med
   kittning eller glasbyte, priser, ledtider, antal fönster, färgprodukt för
   fönster utöver "Flügger", ställning/lift.
   FLAGGOR: alla bilder är GD:s egna foton (inga genererade). Ingen bild visar en
   vindskiva på nära håll (tak-vindskiva.jpg hör till taktvatt/ och tak/); kortet
   "Vindskivor och knutar" visar en långsida med vita fönster och knutar.
   Omdömena är fasta, inte levande, så att de handlar om fönster och utsidan.
   OPTIMERING: egen titel och beskrivning, JSON-LD Service → HousePainter
   (@id gdmaleri.se/#business), inget betygsschema. Raden robots: index:false
   byts av extern/gdmaleri/kopiera.mjs mot canonical gdmaleri.se/snickerier-fonster-malning/.
   =========================================================================== */

export const metadata = {
  title: 'Måla fönster, dörrar och snickerier i Stockholm | GD Måleri Sthlm AB',
  description:
    'Fönstermålning och målning av dörrar, karmar, foder och snickerier i Stockholm, inne och ute. Gammal färg skrapas bort, ytan slipas och grundas. Kostnadsfri offert, ROT på fakturan och 4,9 av 5 på Reco.',
  robots: { index: false, follow: false },
};

const schema = tjanstSchema({
  namn: 'Målning av fönster, dörrar och snickerier i Stockholm',
  typ: 'Fönstermålning och snickerimålning',
  beskrivning: 'Målning av fönster, fönsterkarmar, foder, dörrar, lister, vindskivor och andra snickerier i Stockholm, inomhus och utomhus. Gammal färg skrapas bort, ytan slipas och grundas. ROT dras direkt på fakturan.',
});

const data = {
  namn: 'GD Måleri Sthlm AB',
  tema,
  logo,
  kontakt,
  cta,
  formular,
  bokning,
  nav: { ...navUndersida, extra: menyExtra('/gdmaleri/snickerier-fonster-malning/') },

  hero: { ...hero, ort: 'Fönster i Stockholm', tjanster: ['Fönster', 'Snickerier'] },
  tejp: ['Fönstermålning', 'Dörrar', 'Karmar och foder', 'Lister och vindskivor', 'Träfönster och metallfönster', 'Inne och ute', '4,9 av 5 på Reco', 'ROT direkt på fakturan'],

  tjanster: {
    eyebrow: 'Fönster och snickerier',
    rubrik: ['Skrapat, slipat', 'och grundat'],
    lead: 'Fönster tar mest stryk av vädret: färgen flagnar och träet spricker om det inte underhålls. Vi skrapar bort gammal färg, slipar, grundar och målar, ute och inne.',
    lattKort: true,
    kort: [
      { id: 'fonster', namn: 'Fönster', bild: `${M}/jobb-rod-fonster.jpg`, alt: 'Vitmålat spröjsat fönster i en röd träfasad', text: 'Bågar och karmar skrapas, slipas, grundas och målas.', punkter: ['Träfönster och metallfönster', 'Skydd mot fukt och sol', 'ROT på småhus'], ritning: (<><path d="M54 16h92v88H54z" /><path d="M100 16v88M54 60h92" /><path d="M44 104h112" /></>) },
      { id: 'karmar', namn: 'Karmar och foder', bild: `${M}/jobb-fonsterbleck.jpg`, alt: 'Närbild på vitmålad fönsterbåge och svart fönsterbleck mot panel', text: 'Karmar, foder och bleck i samma jobb som fönstret.', punkter: ['Fönsterkarmar', 'Byte av ruttna foder', 'Samma offert som fönstren'], ritning: (<><path d="M44 16h112v88H44z" /><path d="M60 30h80v60H60z" /><path d="M100 30v60M60 60h80" /></>) },
      { id: 'dorrar', namn: 'Dörrar', bild: `${M}/tjanst-snickerier.jpg`, alt: 'Spegeldörr målad i mörkgrönt i en ljus lägenhet', text: 'Ytterdörrar och innerdörrar i kulören du väljer.', punkter: ['Ytterdörrar', 'Innerdörrar', 'Gammal färg bort först'], ritning: (<><path d="M64 104V20h72v84" /><path d="M76 32h48v30H76zM76 72h48v24H76z" /><path d="M54 104h92" /></>) },
      { id: 'snickerier', namn: 'Lister, vindskivor och knutar', bild: `${M}/jobb-langsida.jpg`, alt: 'Långsida på ett hus med laxrosa stående panel, vita fönster, vita knutar och svart stuprör', text: 'Lister och foder inne, vindskivor, takfot och knutbrädor ute.', punkter: ['Lister och foder', 'Vindskivor och takfot', 'Knutbrädor'], ritning: (<><path d="M20 90L100 30l80 60" /><path d="M34 94L100 44l66 50" /><path d="M60 64l6 6M84 48l6 6M116 48l-6 6M140 64l-6 6" /></>) },
    ],
  },

  jobb: {
    eyebrow: 'Våra jobb',
    rubrik: ['Fönster och dörrar', 'vi har målat'],
    lead: 'Senast fönsterkarmar, vindskivor och takfot på en fasad i Bromma. Alla bilder är från våra egna projekt.',
    not: 'Fler jobb finns på vårt Instagram.',
    tid: '70s',
    rad1: [
      { src: `${M}/jobb-fonster-maskerade.jpg`, alt: 'Spröjsade fönster maskerade med blå tejp inför målning', txt: 'Fönster maskade före målning' },
      { src: `${M}/jobb-bromma-altan.webp`, alt: 'Ljusgrå panelfasad med vita spröjsade altandörrar och fönsterkarmar mot ett trädäck', txt: 'Bromma: altandörrar och fönsterkarmar' },
      { src: `${M}/jobb-rod-timmer.jpg`, alt: 'Närbild på en rödmålad timmervägg med vit knutbräda och altanräcke', txt: 'Knutbräda målad vit' },
      { src: `${M}/jobb-terrass.jpg`, alt: 'Nymålad laxrosa fasad och vit dörr vid en trädäcksaltan', txt: 'Ytterdörr målad vit' },
      { src: `${M}/jobb-taby-1.webp`, alt: 'Nymålad grå träfasad på ett modernt tvåvåningshus med altan och utemöbler i Täby kyrkby', txt: 'Täby kyrkby, 350 kvm' },
      { src: `${M}/tjanst-fasad.jpg`, alt: 'Nymålad laxrosa panelfasad med vitt burspråksfönster och svart stuprör', txt: 'Burspråksfönster målat vitt' },
    ],
    rad2: [
      { src: `${M}/jobb-gul-hall.jpg`, alt: 'Hall i varmgul kulör med vita snickerier och balkongdörr', txt: 'Snickerier och balkongdörr målade vita' },
      { src: `${M}/jobb-panelvagg.jpg`, alt: 'Vitmålad bröstpanel under en ljusgrön vägg', txt: 'Bröstpanel målad vit' },
      { src: `${M}/jobb-sekelskifte.jpg`, alt: 'Ljust rum med två höga spröjsade fönster och radiatorer', txt: 'Fönster och element målade' },
      { src: `${M}/jobb-trapphus.jpg`, alt: 'Trappa i ett hem med mörkrosa nederdel och ljus vägg ovanför', txt: 'Trappa målad i två kulörer' },
      { src: `${M}/invandig-sodertalje-2.webp`, alt: 'Nymålat vitt tak med taklampa och bred taklist mot ljusgrå väggar, en öppen dörr med glasrutor, i Södertälje', txt: 'Södertälje: taklist och dörr' },
      { src: `${M}/jobb-vardagsrum.jpg`, alt: 'Tomt vardagsrum med ljusrosa väggar och tre fönster', txt: 'Vardagsrum målat ljusrosa' },
    ],
  },

  varfor,
  om,
  steg,

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Kunderna om', 'fönster och snickerier'],
    betyg: GOOGLE_BETYG,
    lista: [
      GOOGLE_OMDOMEN.thorellski,
      GOOGLE_OMDOMEN.per,
      { namn: 'Stefan G', kalla: 'Verifierad kund · Reco', text: 'Excellent utfört arbete, jag har uppskattat tydligheten i all kommunikation, där jag som kund haft ett mycket gott samarbete med GD Måleri. Hög yrkeskunskap och stolthet över ett väl utfört arbete med hög kvalité. Projektet involverade fasadarbeten (träfasad) samt målning av fasad. Jag rekommenderar varmt GD Måleri AB.' },
      { namn: 'Bo M', kalla: 'Verifierad kund · Reco', text: 'GD Måleri målade om två fritidshus och en sjöstuga. Allt gick jätte snabbt från offert till igångsättning (< 1vecka). Arbetet utfördes snabbt och resultatet var det jag förväntade mej. (bra jobbat).' },
      GOOGLE_OMDOMEN.jenny,
    ],
    not: 'Från Google (4,8 av 5, 19 recensioner) och Reco.se, där kundrelationen kontrolleras. Ordagrant, hämtade 2026-10-09, antalet 2026-10-13.',
    lank: RECO,
  },

  instagram: { ...instagramBas, koder: ['Dd-zVd3ggOI', 'Dc1IM7Pgpeh', 'DcmMHrIEbrF'] },

  fragor: {
    eyebrow: 'Vanliga frågor om fönster',
    rubrik: ['Det ni brukar', 'fråga om fönstren'],
    lead: 'Pengar och risk först, det praktiska sedan.',
    kort: { rubrik: 'Hittar du inte svaret?', text: 'Ring och berätta om fönstren, så svarar vi på just ditt hus.' },
    lista: [
      { q: 'Vad kostar det att måla fönster?', a: 'Det beror på hur många fönster det gäller, om de är av trä eller metall och hur mycket gammal färg som ska skrapas bort. Därför börjar GD Måleri Sthlm AB med en offert, och den är kostnadsfri. Offerten tar med material, arbete, förarbete som skrapning och slipning, städning och bortforsling.' },
      { q: 'Får jag ROT-avdrag när ni målar fönster och dörrar?', a: <>På ett småhus, ja: Skatteverket räknar målning av fönster, dörrar och väggar som rotarbete, och GD Måleri Sthlm AB drar av det direkt på fakturan. Avdraget är 30 procent av arbetskostnaden, högst 50 000 kronor per person och år, och gäller dig som äger och bor i bostaden. Materialet ger inget avdrag. I en bostadsrätt ger innerdörrar och insidan av fönster och ytterdörr avdrag, men inte utsidan. Källa: <a href={SKV_ROT} target="_blank" rel="noopener">Skatteverket, Ger arbetet rätt till rotavdrag?</a></> },
      { q: 'Hur går fönstermålning till?', a: 'GD Måleri Sthlm AB skrapar bort de gamla färglagren, slipar ytan och grundar innan täckfärgen läggs på. Vi målar med färg som skyddar träet mot fukt och sol, så att fönstren håller längre.' },
      { q: 'Målar ni fönster inifrån också?', a: 'Ja. Vi målar både inomhus- och utomhussnickerier: fönsterbågar, karmar och foder på båda sidor, innerdörrar, ytterdörrar och lister.' },
      { q: 'Kan ni ta fönstren i samma jobb som fasaden?', a: <>Ja, och det är det vanliga. Senast målade GD Måleri Sthlm AB fönsterkarmar, vindskivor och takfot tillsammans med väggarna på en fasad på 234 kvm i Bromma. Läs mer om <a href="/gdmaleri/fasad/">fasadmålning i Stockholm</a>.</> },
      { q: 'Byter ni ruttna foder?', a: 'Ja. Är ett foder ruttet byts det innan vi målar, och det står med i offerten så att inget extra görs utan ditt ja.' },
      { q: 'Var arbetar ni?', a: 'I hela Stockholm. I år har GD Måleri Sthlm AB bland annat målat fasader i Bromma, Täby kyrkby och på Värmdö, i Bromma med fönsterkarmar, vindskivor och takfot.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Begär en offert', 'på fönstren'],
    lead: 'Ring, eller skriv några rader om fönstren och dörrarna. Du får en kostnadsfri offert där allt ingår, från skrapning till städning.',
    checkar: ['Svar inom 24 timmar', 'Kostnadsfri offert, allt inräknat', 'ROT på småhus, direkt på fakturan'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta kort om fönstren',
    placeholder: 'Antal fönster och dörrar, trä eller metall, inne eller ute, och var i Stockholm',
    kundtyp,
    formNot,
    epostNamn,
    formNotBock: true,
  },

  popup: {
    rubrik: 'Flagnar färgen på fönstren?',
    text: 'Berätta om fönstren så får du en offert som inte kostar något. På småhus dras ROT direkt på fakturan.',
  },

  footer: {
    text: 'Målning av fönster, dörrar, karmar, foder och snickerier i Stockholm, inne och ute. Kostnadsfri offert och slutbesiktning innan fakturan.',
    tjanster: footerTjanster,
    bild: footerBild, // Stockholms siluett i skymning, se _gd.js
    lankar: footerLankar, // Integritet och Cookieinställningar, se _gd.js
  },

  // KUND, inte förslag (Mathias 2026-10-09): ingen demo-knapp, ingen Bahko-modal, ingen byråtext i footern.
  kund: true,
  skapadAv,
  samarbeten,
};

export default function GdMaleriSnickerierFonster() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <DemoSida data={data} />
    </>
  );
}
