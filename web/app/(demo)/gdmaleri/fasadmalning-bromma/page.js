import DemoSida from '../../_mall/DemoSida';
import { M, tema, logo, kontakt, cta, formular, bokning, kundtyp, formNot, epostNamn, SIDOR, footerTjanster, footerBild, footerLankar, footerOrter, menyExtra, navUndersida, hero, varfor, om, steg, instagramBas, RECO, SKV_ROT, samarbeten, tjanstSchema, GOOGLE_BETYG, GOOGLE_OMDOMEN, skapadAv, recoKort, BAND, UTVALDA, RITNING } from '../_gd';

/* ===========================================================================
   GD MÅLERI STHLM AB — ortssida FASADMÅLNING I BROMMA (/gdmaleri/fasadmalning-bromma/), 2026-10-14.
   Mathias 2026-10-14: "bygg dom andra platserna också". Slug på gdmaleri.se: /fasadmalning-bromma/,
   WordPress-sajtens gamla slug (Search Console vecka 41: "fasadmålning bromma" 57 visningar, plats
   12,6). 308:an till /fasad-malning/ i extern/gdmaleri/next.config.mjs är borttagen.

   VERIFIERAT (2026-10-14), utöver huvudsidans VERIFIERAT-block och _gd.js:
   Belagt jobb i Bromma: IG Dd-zVd3ggOI (publicerat 2026-10-02), ordagrant "Årets sista Fasad på 234
   kvm 2026 är avklarad i Bromma..Riktigt fräscht Väggar Vindskivor Takfot Fönsterkarmar".
   fasad-fore-efter.webp och fasad-fore-efter-kortbild.webp = sammansatt före/efter av samma gavel
   (fasad/page.js, NYA BILDER), jobb-bromma-altan.webp = bild 6 ur samma inlägg.
   Bromma, lokala fakta: sv.wikipedia.org/wiki/Bromma (läst 2026-10-14): "På 1880-talet började
   Brommas äldsta villaområde att bebyggas", "På 1910-, 1920- och 1930-talen byggdes Gamla Bromma
   trädgårdsstad".
   Erbjudandet (offert med material, förarbete, städning och bortforsling, inget extra utan ja,
   faktura när jobbet är klart, F-skatt, Trygg-Hansa, ett års garanti, Flügger, ROT) ur gdmaleri.se
   (leadfilen, Löften); hela Stockholm och alla dagar 08–17: Ghandi via Mathias; hembesök 45 minuter:
   bokning.not i _gd.js (Cal.com). ROT: Skatteverket (SKV_ROT, live 2026-10-13).
   Omdömen ordagrant ur RECO_LISTA och GOOGLE_OMDOMEN. INGET av dem säger att huset ligger i Bromma,
   och sidan påstår det inte.

   INTE verifierat, och finns därför inte på sidan: fler jobb i Bromma än det här, år eller ålder på
   huset, fasadmaterial på Bromma-huset (bilden visar panel), priser, ledtider, omdömen från Bromma.
   FLAGGOR: inga omdömen med ort Bromma; be Ghandi om kundens tillstånd att visa adressområdet eller
   ett omdöme från jobbet.
   OPTIMERING: egen titel, beskrivning, hero-rad, kort och frågor. JSON-LD Service med areaServed
   Bromma → HousePainter (@id gdmaleri.se/#business), inget betygsschema, inget FAQPage. Raden
   robots: index:false byts av extern/gdmaleri/kopiera.mjs mot canonical gdmaleri.se/fasadmalning-bromma/.
   =========================================================================== */

export const metadata = {
  title: 'Fasadmålning i Bromma – målare för fasad och villa | GD Måleri Sthlm AB',
  description:
    'Fasadmålning i Bromma: senast 234 kvm väggar, vindskivor, takfot och fönsterkarmar, klart hösten 2026. Kostnadsfritt hembesök, ROT direkt på fakturan och 4,9 av 5 på Reco.',
  robots: { index: false, follow: false },
};

const schema = tjanstSchema({
  namn: 'Fasadmålning i Bromma',
  typ: 'Fasadmålning',
  beskrivning: 'Fasadtvätt och fasadmålning i Bromma, med vindskivor, takfot och fönsterkarmar. Senast en fasad på 234 kvm hösten 2026. ROT på småhus dras direkt på fakturan.',
  omrade: [{ '@type': 'Place', name: 'Bromma, Stockholm' }],
});

const data = {
  namn: 'GD Måleri Sthlm AB',
  tema,
  logo,
  kontakt,
  cta,
  formular,
  bokning,
  nav: { ...navUndersida, extra: menyExtra() },

  hero: { ...hero, rubrik: { fraga: 'Fasadmålning i Bromma', svar: 'Vår senaste fasad: 234 kvm.' } },
  tejp: ['Fasadmålning i Bromma', '234 kvm klart 2026', 'Väggar och vindskivor', 'Takfot och fönsterkarmar', 'Trä, puts, tegel och plåt', 'Färg från Flügger', 'ROT på småhus', 'Kostnadsfritt hembesök'],

  tjanster: {
    eyebrow: 'Fasad i Bromma',
    rubrik: ['Bromma-fasaden,', 'från gavel till takfot'],
    lead: 'Årets sista fasad blev ett hus i Bromma: 234 kvm väggar, vindskivor, takfot och fönsterkarmar. Samma genomgång gör vi på din villa, vare sig fasaden är av trä, puts, tegel eller plåt.',
    lattKort: true,
    kolumner: 3,
    kort: [
      { id: 'bromma-jobbet', namn: 'Jobbet i Bromma, 234 kvm', bild: `${M}/fasad-fore-efter-kortbild.webp`, alt: 'Sammansatt före/efter-bild av samma gavel i Bromma: vänster halva flagnande grå färg och byggställning, höger halva nymålad ljusgrå panel', text: 'Samma gavel före och efter: flagnande grå färg blev en ren, ljusgrå panel med vita fönster.', punkter: ['Väggar och vindskivor', 'Takfot och fönsterkarmar', 'Klart hösten 2026'], lank: { href: '#jobb', txt: 'Se bilderna från jobbet' }, ritning: RITNING.plats },
      { id: 'villan', namn: 'Fasadmålning på villan', bild: `${M}/tjanst-fasad.jpg`, alt: 'Nymålad laxrosa panelfasad med vitt burspråksfönster och svart stuprör', text: 'Bromma har villaområden från 1880-talet och en trädgårdsstad från 1910- till 1930-talen. Oavsett husets ålder börjar vi med fasadens skick: tvätt, skrapning av lös färg och lagning.', punkter: ['Trä, puts, tegel och plåt', 'Färg från Flügger', 'ROT på småhus'], lank: { href: '/gdmaleri/fasad/', txt: 'Allt om fasadmålning' }, ritning: RITNING.fasad },
      { id: 'fonster', namn: 'Fönster och altandörrar', bild: `${M}/jobb-rod-fonster.jpg`, alt: 'Vitmålat spröjsat fönster i en röd träfasad', text: 'På huset i Bromma ingick fönsterkarmarna. Fönster, foder och dörrar kan ligga i samma offert som fasaden.', punkter: ['Fönsterkarmar och foder', 'Ytterdörrar', 'Samma offert'], lank: { href: '/gdmaleri/snickerier-fonster-malning/', txt: 'Fönster och snickerier' }, ritning: RITNING.fonster },
    ],
  },

  jobb: {
    eyebrow: 'Jobbet i Bromma',
    rubrik: ['234 kvm i Bromma,', 'före och efter'],
    lead: 'De två första bilderna är från huset i Bromma, som vi lade upp på Instagram i oktober 2026. Banden under visar fler av våra jobb i Stockholm, med ort där vi kan visa den.',
    not: 'Före/efter-bilden är två foton av samma gavel, tagna före och efter jobbet och satta ihop på mitten. Bilder utan ort i bildtexten är från andra jobb än det i Bromma.',
    utvalda: [
      UTVALDA.brommaForeEfter,
      { src: `${M}/jobb-bromma-altan.webp`, w: 960, h: 720, etikett: 'Bromma, altansidan', txt: 'Väggar och fönsterkarmar mot trädäcket.', alt: 'Ljusgrå panelfasad med vita spröjsade altandörrar och fönsterkarmar mot ett trädäck, samma hus i Bromma' },
    ],
    tid: '70s',
    rad1: [BAND.langsida, BAND.taby2, BAND.rodTimmer, BAND.fonsterbleck, BAND.terrass, BAND.fonsterMaskerade],
    rad2: [BAND.takFore, BAND.takEfter, BAND.taby43, BAND.sekelskifte, BAND.gulHall, BAND.sodertalje1],
  },

  varfor,
  om,
  steg,

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Kunder om', 'sina fasader'],
    betyg: GOOGLE_BETYG,
    lista: [recoKort('Lovisa B'), recoKort('Susanne J'), GOOGLE_OMDOMEN.marianne, GOOGLE_OMDOMEN.per, GOOGLE_OMDOMEN.thorellski, recoKort('Ola A')],
    not: 'Från Google (4,8 av 5, 19 recensioner) och Reco.se, där kundrelationen kontrolleras. Ordagrant, hämtade 2026-10-09. Omdömena gäller jobb i Stockholm; de säger inte i vilken stadsdel.',
    lank: RECO,
  },

  instagram: { ...instagramBas, lead: 'Bromma-jobbet först, sedan fler jobb från vårt konto.', koder: ['Dd-zVd3ggOI', 'Dc1IM7Pgpeh', 'DeNI1zEkcpW'] },

  fragor: {
    eyebrow: 'Frågor om fasaden i Bromma',
    rubrik: ['Det Bromma-bor', 'brukar fråga'],
    lead: 'Om jobbet vi har gjort här, och om hur du får en offert på ditt eget hus.',
    kort: { rubrik: 'Bor du i Bromma?', text: 'Ring och berätta om huset, eller boka en tid så kommer vi förbi och tittar på fasaden.' },
    lista: [
      { q: 'Vilken fasad har ni målat i Bromma?', a: 'Senast ett hus på 234 kvm, klart hösten 2026: väggar, vindskivor, takfot och fönsterkarmar. Före/efter-bilden på den här sidan är från det jobbet, och fler bilder finns i inlägget på vårt Instagram.' },
      { q: 'Tar ni fasadjobb i hela Bromma?', a: 'Ja. GD Måleri Sthlm AB tar uppdrag i hela Stockholm, och Bromma ingår. Vi kommer hem till dig, tittar på fasaden och lämnar sedan en skriftlig offert.' },
      { q: 'Hur bokar jag ett hembesök i Bromma?', a: 'Välj en tid i kalendern längre ner på sidan, eller ring 073-729 88 89. Besöket tar ungefär 45 minuter och kostar ingenting. Vi kommer alla dagar mellan 08 och 17.' },
      { q: 'Kan fönstren och altandörrarna målas samtidigt?', a: <>Ja. På huset i Bromma ingick fönsterkarmarna i jobbet, och fönster, foder och ytterdörrar kan ligga i samma offert som fasaden. Läs mer om <a href="/gdmaleri/snickerier-fonster-malning/">målning av fönster och snickerier</a>.</> },
      { q: 'Får jag ROT-avdrag för fasadmålning på min villa?', a: <>Ja, om du äger och bor i huset. Skatteverket räknar målning och tvätt av fasaden på ett småhus som rotarbete: 30 procent av arbetskostnaden, högst 50 000 kronor per person och år. Vi drar av det direkt på fakturan. Källa: <a href={SKV_ROT} target="_blank" rel="noopener">Skatteverket, Ger arbetet rätt till rotavdrag?</a></> },
      { q: 'Vad ingår i offerten?', a: <>Material, arbete, förarbete som tvätt och skrapning, städning och bortforsling. Inget extra görs utan ditt ja, och fakturan kommer när jobbet är klart. Vill du jämföra med andra firmor först: <a href="/gdmaleri/basta-malare-stockholm/">så väljer du rätt målare i Stockholm</a>.</> },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Begär en offert', 'på fasaden i Bromma'],
    lead: 'Ring, eller skriv några rader om huset i Bromma. Du får en kostnadsfri offert där allt ingår, från tvätt och skrapning till bortforsling.',
    checkar: ['Svar inom 24 timmar', 'Hembesök utan kostnad', 'ROT på småhus, direkt på fakturan'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta kort om huset',
    placeholder: 'Var i Bromma, trä, puts, tegel eller plåt, ungefärlig yta och om fönster eller takfot ska med',
    typer: SIDOR.map((l) => l.txt),
    kundtyp,
    formNot,
    epostNamn,
    formNotBock: true,
  },

  popup: {
    rubrik: 'Fasad i Bromma?',
    text: 'Berätta om huset så kommer vi ut och lämnar en offert som inte kostar något. ROT dras direkt på fakturan.',
  },

  footer: {
    text: 'Fasadmålning i Bromma: väggar, vindskivor, takfot och fönsterkarmar, senast 234 kvm hösten 2026. Kostnadsfri offert och slutbesiktning innan fakturan.',
    tjanster: footerTjanster,
    bild: footerBild, // Stockholms siluett i skymning, se _gd.js
    lankar: footerLankar, // Så väljer du målare, Integritet och Cookieinställningar, se _gd.js
    orter: footerOrter, // Där vi jobbar: ortssidorna, se _gd.js
  },

  // KUND, inte förslag (Mathias 2026-10-09): ingen demo-knapp, ingen Bahko-modal, ingen byråtext i footern.
  kund: true,
  skapadAv,
  samarbeten,
};

export default function GdMaleriFasadBromma() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <DemoSida data={data} />
    </>
  );
}
