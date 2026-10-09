import DemoSida from '../../_mall/DemoSida';
import { M, tema, logo, kontakt, cta, formular, bokning, kundtyp, formNot, epostNamn, footerTjanster, menyExtra, navUndersida, hero, varfor, om, steg, instagramBas, RECO, SKV_ROT, modal, samarbeten, tjanstSchema } from '../_gd';

/* ===========================================================================
   GD MÅLERI STHLM AB — tjänstesida FASAD (/gdmaleri/fasad/), 2026-10-08.
   Samma mall, tema, logotyp, filmer och kontakt som huvudsidan (gemensamt i ../_gd.js).
   Struktur efter förebilden marlonshantverksgrupp.se/villa-fasadmalning/, ingen text kopierad.
   Snickerier, fönster och vindskivor ligger HÄR (ingen egen sida): innehållet
   räcker till kort och punkter men inte till en egen sida med egna omdömen.

   VERIFIERAT (2026-10-08), utöver huvudsidans VERIFIERAT-block:
   gdmaleri.se/vara-tjanster/ fasadmålning: "träfasad, puts, tegel eller plåt",
   "noggrann analys av fasadens skick, inklusive tvättning, skrapning av lös färg
   och nödvändig reparation"; fönster: "skrapar bort gammal färg … slipning och
   grundmålning", "träfönster, metallfönster". Fasadtvätt som tjänst: Ghandi via
   Mathias 2026-10-08. Instagram, ordagrant: Dd-zVd3ggOI "Årets sista Fasad på 234
   kvm 2026 är avklarad i Bromma..Riktigt fräscht Väggar Vindskivor Takfot
   Fönsterkarmar" · Dc1IM7Pgpeh "Exklusiv Fasadmålning klar 350 kvm i Täby kyrkby".
   Reco, femmor från verifierade kunder, ordagrant: Lovisa B 2026-09-07 ("slipa
   och måla vår stora fasad"), Stefan G 2026-07-22 (träfasad), Susanne J
   2026-07-22 (fasaden på vårt hus).
   Skatteverket (hämtat 2026-10-08): på småhus ger "måla fasader" och "rengöra
   … fasader" rotavdrag; i bostadsrätt ger "måla eller olja fasader, balkonger,
   altaner" inget avdrag.

   INTE verifierat, och finns därför inte på sidan: tvättmetod och medel
   (högtryck, kemikalier, mögelbehandling), ställning/lift, priser, ledtider,
   antal fasader, bygglov.

   FLAGGOR: alla bilder är GD:s egna foton. Kortet "Fasadtvätt" har ingen bild
   av en tvätt: bilden är en färdigmålad långsida och alt-texten säger det.
   Täby-inlägget har en kampanjtext (10 % / 30 %): byt inlägg när kampanjen är slut.
   Omdömena här är fasta (inte levande), så att de handlar om fasader.
   OPTIMERING: egen titel och beskrivning, JSON-LD Service → HousePainter
   (@id gdmaleri.se/#business), inget betygsschema, noindex tills flytten.
   =========================================================================== */

export const metadata = {
  title: 'Fasadmålning och fasadtvätt i Stockholm | GD Måleri Sthlm AB',
  description:
    'Fasadtvätt och fasadmålning i Stockholm: trä, puts, tegel och plåt, med fönster, vindskivor och takfot. Senast 234 kvm i Bromma. Kostnadsfri offert, ROT på småhus och 4,9 av 5 på Reco.',
  robots: { index: false, follow: false },
};

const schema = tjanstSchema({
  namn: 'Fasadtvätt och fasadmålning i Stockholm',
  typ: 'Fasadmålning',
  beskrivning: 'Fasadtvätt och fasadmålning av trä, puts, tegel och plåt i Stockholm, med fönster, vindskivor, takfot och snickerier. ROT på småhus dras direkt på fakturan.',
});

const data = {
  namn: 'GD Måleri Sthlm AB',
  tema,
  logo,
  kontakt,
  cta,
  formular,
  bokning,
  nav: { ...navUndersida, extra: menyExtra('/gdmaleri/fasad/') },

  hero: { ...hero, ort: 'Fasad i Stockholm', tjanster: ['Tvätt', 'Målning'] },
  tejp: ['Fasadtvätt', 'Fasadmålning', 'Trä, puts, tegel och plåt', 'Vindskivor och takfot', 'Fönsterkarmar', 'Färg från Flügger', '4,9 av 5 på Reco', 'ROT på småhus'],

  tjanster: {
    eyebrow: 'Fasad',
    rubrik: ['Tvättad, skrapad', 'och nymålad'],
    lead: 'Senast en fasad på 234 kvm i Bromma: väggar, vindskivor, takfot och fönsterkarmar. Innan dess 350 kvm i Täby kyrkby.',
    lattKort: true,
    kort: [
      { id: 'fasadtvatt', namn: 'Fasadtvätt', bild: `${M}/jobb-langsida.jpg`, alt: 'Färdigmålad långsida på ett hus med laxrosa stående panel, vita fönster och svart stuprör', text: 'Smuts och lös färg bort, så att färgen fäster.', punkter: ['Tvätt före målning', 'Eller tvätt för sig', 'ROT på småhus'], ritning: (<><path d="M20 100V48l80-34 80 34v52" /><path d="M20 100h160" /><path d="M60 64c6 8 6 14 0 20M92 58c6 8 6 14 0 20M124 64c6 8 6 14 0 20" /></>) },
      { id: 'fasadmalning', namn: 'Fasadmålning', bild: `${M}/tjanst-fasad.jpg`, alt: 'Nymålad laxrosa panelfasad med vitt burspråksfönster och svart stuprör', text: 'Trä, puts, tegel eller plåt får ny färg.', punkter: ['Skrapning och lagning', 'Vindskivor och takfot', 'Färg från Flügger'], ritning: (<><path d="M20 100V48l80-34 80 34v52" /><path d="M20 100h160" /><path d="M44 56v44M68 50v50M92 44v56M116 44v56M140 50v50M164 56v44" /></>) },
      { id: 'fonster', namn: 'Fönster och karmar', bild: `${M}/jobb-rod-fonster.jpg`, alt: 'Vitmålat spröjsat fönster i en röd träfasad', text: 'Gammal färg skrapas bort, sedan slipning och grund.', punkter: ['Träfönster och metallfönster', 'Fönsterkarmar', 'Byte av ruttna foder'], ritning: (<><path d="M54 16h92v88H54z" /><path d="M100 16v88M54 60h92" /><path d="M44 104h112" /></>) },
      { id: 'snickerier', namn: 'Dörrar och snickerier', bild: `${M}/jobb-terrass.jpg`, alt: 'Nymålad laxrosa fasad och vit dörr vid en trädäcksaltan', text: 'Ytterdörrar, knutar och detaljer i samma jobb.', punkter: ['Ytterdörrar', 'Knutbrädor och foder', 'I samma offert'], ritning: (<><path d="M64 104V20h72v84" /><path d="M76 32h48v30H76zM76 72h48v24H76z" /><path d="M54 104h92" /></>) },
    ],
  },

  jobb: {
    eyebrow: 'Våra jobb',
    rubrik: ['Hus vi har', 'målat om'],
    lead: 'Fasader, fönster och tak ute, och rum inne. Alla bilder är från våra egna projekt.',
    not: 'Fler jobb, med ort och yta, finns på vårt Instagram.',
    tid: '70s',
    rad1: [
      { src: `${M}/jobb-rod-timmer.jpg`, alt: 'Närbild på en rödmålad timmervägg med vit knutbräda och altanräcke', txt: 'Timmervägg målad i rött' },
      { src: `${M}/jobb-fonsterbleck.jpg`, alt: 'Närbild på vitmålad fönsterbåge och svart fönsterbleck mot panel', txt: 'Fönsterbåge målad' },
      { src: `${M}/jobb-fonster-maskerade.jpg`, alt: 'Spröjsade fönster maskerade med blå tejp inför målning', txt: 'Fönster maskade före målning' },
      { src: `${M}/jobb-tak-fore.jpg`, alt: 'Betongpannetak med mossa och gul lav före taktvätt', txt: 'Tak före tvätt' },
      { src: `${M}/tjanst-tak.jpg`, alt: 'Grått betongpannetak efter taktvätt, med en vit villa och tallar i bakgrunden', txt: 'Tak efter tvätt' },
      { src: `${M}/jobb-sekelskifte.jpg`, alt: 'Ljust rum med två höga spröjsade fönster och radiatorer', txt: 'Rum målat i ljust' },
    ],
    rad2: [
      { src: `${M}/jobb-gul-hall.jpg`, alt: 'Hall i varmgul kulör med vita snickerier och balkongdörr', txt: 'Hall målad i gult' },
      { src: `${M}/jobb-bla-tak.jpg`, alt: 'Ljusblått målat tak med spotlightskena och bokhylla', txt: 'Tak målat ljusblått' },
      { src: `${M}/jobb-panelvagg.jpg`, alt: 'Vitmålad bröstpanel under en ljusgrön vägg', txt: 'Bröstpanel målad vit' },
      { src: `${M}/jobb-trapphus.jpg`, alt: 'Trappa i ett hem med mörkrosa nederdel och ljus vägg ovanför', txt: 'Trappa målad i två kulörer' },
      { src: `${M}/jobb-vardagsrum.jpg`, alt: 'Tomt vardagsrum med ljusrosa väggar och tre fönster', txt: 'Vardagsrum målat ljusrosa' },
      { src: `${M}/tjanst-snickerier.jpg`, alt: 'Spegeldörr målad i mörkgrönt i en ljus lägenhet', txt: 'Dörr målad mörkgrön' },
    ],
  },

  varfor,
  om,
  steg,

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Kunderna om', 'sina fasader'],
    lista: [
      { namn: 'Lovisa B', kalla: 'Verifierad kund · Reco', text: 'Vi fick ett väldigt trevligt och kunnigt bemötande. De gjorde ett bra jobb med att slipa och måla vår stora fasad och blev klara i tid. Lätta att kommunicera med och väldigt trevliga.' },
      { namn: 'Stefan G', kalla: 'Verifierad kund · Reco', text: 'Excellent utfört arbete, jag har uppskattat tydligheten i all kommunikation, där jag som kund haft ett mycket gott samarbete med GD Måleri. Hög yrkeskunskap och stolthet över ett väl utfört arbete med hög kvalité. Projektet involverade fasadarbeten (träfasad) samt målning av fasad. Jag rekommenderar varmt GD Måleri AB.' },
      { namn: 'Susanne J', kalla: 'Verifierad kund · Reco', text: 'Målade om fasaden på vårt hus. Jättebra bemötande från offertförfrågan till färdigt resultat. Alltid lätt att få kontakt med företagsägare Ghandhi. Målarna som kom var super duktiga, lätta att ha och göra med. Kan varmt rekommendera GD Måleri Sthlm AB.' },
    ],
    not: 'Från Reco.se, där kundrelationen kontrolleras. Ordagrant.',
    lank: RECO,
  },

  instagram: { ...instagramBas, koder: ['Dd-zVd3ggOI', 'Dc1IM7Pgpeh', 'DcmMHrIEbrF'] },

  fragor: {
    eyebrow: 'Vanliga frågor om fasad',
    rubrik: ['Det ni brukar', 'fråga om fasaden'],
    lead: 'Pengar och risk först, det praktiska sedan.',
    kort: { rubrik: 'Hittar du inte svaret?', text: 'Ring och berätta om huset, så svarar vi på just din fasad.' },
    lista: [
      { q: 'Vad kostar det att måla fasaden?', a: 'Det beror på ytan, materialet och skicket. Därför börjar vi med en offert, och den är kostnadsfri. Offerten tar med material, arbete, förarbete som tvätt och skrapning, städning och bortforsling.' },
      { q: 'Får jag ROT-avdrag?', a: <>På ett småhus, ja: Skatteverket räknar att tvätta och måla fasaden som rotarbete, och vi drar av det direkt på fakturan. I en bostadsrätt ger fasadmålning inget avdrag. Avdraget gäller bara arbetskostnaden. Källa: <a href={SKV_ROT} target="_blank" rel="noopener">Skatteverket, Ger arbetet rätt till rotavdrag?</a></> },
      { q: 'Vilka fasader målar ni?', a: 'Trä, puts, tegel och plåt. Vi går igenom fasadens skick först: tvätt, skrapning av lös färg och de lagningar som behövs.' },
      { q: 'Kan ni bara tvätta fasaden?', a: 'Ja, fasadtvätt går att beställa för sig. Ska fasaden målas ingår tvätten i förarbetet.' },
      { q: 'Målar ni fönster och vindskivor också?', a: 'Ja. Fönster, fönsterkarmar, vindskivor, takfot och dörrar kan ingå i samma offert som fasaden.' },
      { q: 'När betalar jag?', a: 'Du får fakturan när arbetet är klart, ingen förskottsbetalning. På stora jobb över 500 kvm betalas halva arbetskostnaden när halva jobbet är gjort.' },
      { q: 'Har ni garanti?', a: 'Ja, ett år på måleriarbetet. Behöver något åtgärdas under den tiden gör vi det utan extra kostnad.' },
      { q: 'Var arbetar ni?', a: 'I hela Stockholm. I år har vi bland annat målat fasader i Bromma och Täby kyrkby.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Begär en offert', 'på fasaden'],
    lead: 'Ring, eller skriv några rader om huset. Du får en kostnadsfri offert där allt ingår, från tvätt till bortforsling.',
    checkar: ['Svar inom 24 timmar', 'Kostnadsfri offert, allt inräknat', 'ROT på småhus, direkt på fakturan'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta kort om fasaden',
    placeholder: 'Trä, puts, tegel eller plåt, ungefärlig yta, tvätt och/eller målning, och var i Stockholm',
    kundtyp,
    formNot,
    epostNamn,
    formNotBock: true,
  },

  popup: {
    rubrik: 'Dags för fasaden?',
    text: 'Berätta om huset så får du en offert som inte kostar något. På småhus dras ROT direkt på fakturan.',
  },

  footer: {
    text: 'Fasadtvätt och fasadmålning i Stockholm: trä, puts, tegel och plåt, med fönster, vindskivor och takfot. Kostnadsfri offert och slutbesiktning innan fakturan.',
    tjanster: footerTjanster,
  },

  modal,
  samarbeten,
};

export default function GdMaleriFasad() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <DemoSida data={data} />
    </>
  );
}
