import DemoSida from '../../_mall/DemoSida';
import { M, tema, logo, kontakt, cta, formular, bokning, kundtyp, formNot, epostNamn, SIDOR, footerTjanster, footerBild, footerLankar, footerOrter, menyExtra, navUndersida, hero, varfor, om, steg, instagramBas, RECO, SKV_ROT, samarbeten, tjanstSchema, GOOGLE_BETYG, GOOGLE_OMDOMEN, skapadAv, recoKort, BAND, UTVALDA, RITNING } from '../_gd';

/* ===========================================================================
   GD MÅLERI STHLM AB — ortssida FASADMÅLNING I DANDERYD (/gdmaleri/fasadmalning-danderyd/), 2026-10-14.
   Mathias 2026-10-14: "bygg dom andra platserna också". Slug på gdmaleri.se: /fasadmalning-danderyd/,
   WordPress-sajtens gamla slug (Search Console vecka 41: sidan /fasadmalning-danderyd/ 41 visningar,
   plats 7,8).

   INGET BELAGT JOBB I DANDERYD 2026-10-14; byt in ett riktigt jobb (ort, år, yta, foto) när det finns.
   Sidan säger "Vi har inga bilder från Danderyd på sidan än" och visar belagda jobb med sina riktiga
   orter: Täby kyrkby (IG Dc1IM7Pgpeh, 350 kvm) i grannkommunen Täby, och Bromma (IG Dd-zVd3ggOI,
   234 kvm). Inget avstånd anges (inte verifierat), bara att Täby är grannkommun (källa nedan).

   VERIFIERAT (2026-10-14), utöver huvudsidans VERIFIERAT-block och _gd.js:
   Hela Stockholm: Ghandi via Mathias 2026-10-08.
   Danderyd, lokala fakta: sv.wikipedia.org/wiki/Danderyds_kommun (läst 2026-10-14): "Danderyds kommun
   består på grund av sitt läge nära Stockholm av förortsbebyggelse", "större delen av arealen
   omfattas av villakvarter", rosorna i kommunvapnet syftar på "den tidiga villastadsbebyggelsen",
   "Enebybergs villastads municipalsamhälle" bildades 1914, kommunen "gränsar i norr till Täby
   kommun". "Kommunen är indelad i fyra kommundelar: Danderyd, Djursholm,
   Enebyberg och Stocksund."
   Erbjudandet, öppettider, hembesök och ROT: som fasadmalning-bromma/page.js.
   Omdömen ordagrant ur RECO_LISTA och GOOGLE_OMDOMEN; inget säger Danderyd.

   INTE verifierat, och finns därför inte på sidan: jobb, kunder, ytor eller år i Danderyd, restid
   eller avstånd, priser, ledtider, kulturhistoriska krav eller bygglov för fasadfärg.
   OPTIMERING: egen titel, beskrivning, hero-rad, kort och frågor. JSON-LD Service med areaServed
   Danderyd → HousePainter (@id gdmaleri.se/#business), inget betygsschema, inget FAQPage.
   Danderyd läggs INTE till i startsidans areaServed (inget belagt jobb).
   =========================================================================== */

export const metadata = {
  title: 'Fasadmålning i Danderyd – målare för fasad och villa | GD Måleri Sthlm AB',
  description:
    'Fasadmålning i Danderyd, Djursholm, Stocksund och Enebyberg: villans fasad, takfot och dörrar. Ingen förskottsbetalning, ett års garanti och ROT direkt på fakturan.',
  robots: { index: false, follow: false },
};

const schema = tjanstSchema({
  namn: 'Fasadmålning i Danderyd',
  typ: 'Fasadmålning',
  beskrivning: 'Fasadtvätt och fasadmålning av villor i Danderyds kommun: fasad, takfot, vindskivor, fönster och dörrar. Kostnadsfri offert efter hembesök, ROT på småhus direkt på fakturan.',
  omrade: [{ '@type': 'City', name: 'Danderyd' }],
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

  hero: { ...hero, rubrik: { fraga: 'Fasadmålning i Danderyd', svar: 'Fasad & ytterdörrar.' } },
  tejp: ['Fasadmålning i Danderyd', 'Djursholm, Stocksund och Enebyberg', 'Takfot och vindskivor', 'Ytterdörrar och fönster', 'Ingen förskottsbetalning', 'Ett års garanti', 'Rekommenderat företag på Reco', 'ROT på småhus'],

  tjanster: {
    eyebrow: 'Fasad i Danderyd',
    rubrik: ['Villakvarteren', 'i Danderyd'],
    lead: 'Större delen av Danderyds kommun är villakvarter, och rosorna i kommunvapnet syftar på den tidiga villastadsbebyggelsen. Ska villan målas om gäller samma sak hos oss här som i resten av Stockholm: kostnadsfri offert med allt inräknat och faktura först när jobbet är klart.',
    lattKort: true,
    kolumner: 3,
    kort: [
      { id: 'takfot', namn: 'Fasad, takfot och vindskivor', bild: `${M}/tak-vindskiva.jpg`, alt: 'Vitmålad vindskiva och balkongräcke på en vit villa mot blå himmel, bildruta ur GD Måleris egen film', text: 'Hela fasaden i ett jobb, med takfot och vindskivor. Trä, puts, tegel eller plåt.', punkter: ['Tvätt och skrapning först', 'Takfot och vindskivor', 'Färg från Flügger'], lank: { href: '/gdmaleri/fasad/', txt: 'Fasadmålning i Stockholm' }, ritning: RITNING.takfot },
      { id: 'dorrar', namn: 'Ytterdörrar och fönster', bild: `${M}/jobb-terrass.jpg`, alt: 'Nymålad laxrosa fasad och vit dörr vid en trädäcksaltan', text: 'Dörrar, fönsterbågar och foder skrapas, slipas och grundas, och kan ligga i samma offert som fasaden.', punkter: ['Ytterdörrar', 'Fönsterbågar och foder', 'Samma offert'], lank: { href: '/gdmaleri/snickerier-fonster-malning/', txt: 'Fönster och snickerier' }, ritning: RITNING.dorr },
      { id: 'grannkommun', namn: 'Grannkommunen: Täby kyrkby', bild: `${M}/jobb-taby-43.webp`, alt: 'Nymålad grå träfasad på ett modernt tvåvåningshus i Täby kyrkby, sedd från tomten', text: 'Vi har inga bilder från Danderyd på sidan än. I grannkommunen Täby, norr om Danderyd, kan vi visa en träfasad på 350 kvm i Täby kyrkby.', punkter: ['Täby kyrkby: 350 kvm', 'Bromma: 234 kvm', 'Bilder märkta med ort'], lank: { href: '/gdmaleri/fasadmalning-taby/', txt: 'Fasadmålning i Täby' }, ritning: RITNING.plats },
    ],
  },

  jobb: {
    eyebrow: 'Jobb vi kan visa',
    rubrik: ['Täby kyrkby', 'och Bromma'],
    lead: 'Vi har inga bilder från Danderyd på sidan än. De stora bilderna är från Täby kyrkby, i grannkommunen Täby, och från Bromma. Varje bild med ort är märkt med var den är tagen.',
    not: 'Före/efter-bilden från Bromma är två foton av samma gavel, satta ihop på mitten. Bilder utan ort i bildtexten är från jobb där vi inte anger orten.',
    utvalda: [UTVALDA.taby1, UTVALDA.brommaForeEfter],
    tid: '70s',
    rad1: [BAND.taby2, BAND.rodFonster, BAND.langsida, BAND.brommaAltan, BAND.fonsterbleck, BAND.fonsterMaskerade],
    rad2: [BAND.rodTimmer, BAND.takFore, BAND.takEfter, BAND.sodertalje1, BAND.sekelskifte, BAND.dorrGron],
  },

  varfor,
  om,
  steg,

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Kunderna om', 'samarbetet'],
    betyg: GOOGLE_BETYG,
    lista: [recoKort('Stefan G'), recoKort('Anders F'), recoKort('Susanne J'), GOOGLE_OMDOMEN.therese, GOOGLE_OMDOMEN.per, GOOGLE_OMDOMEN.patrik],
    not: 'Från Google (4,8 av 5, 19 recensioner) och Reco.se, där kundrelationen kontrolleras. Ordagrant, hämtade 2026-10-09. Inget av omdömena säger var i Stockholm jobbet gjordes.',
    lank: RECO,
  },

  instagram: { ...instagramBas, koder: ['Dc1IM7Pgpeh', 'Dd-zVd3ggOI', 'DeNI1zEkcpW'] },

  fragor: {
    eyebrow: 'Frågor om fasad i Danderyd',
    rubrik: ['Det villaägare i Danderyd', 'frågar oss'],
    lead: 'Om var vi jobbar, hur du betalar och vad vi kan visa.',
    kort: { rubrik: 'Har du en villa i Danderyd?', text: 'Ring och berätta om huset, eller boka en tid så kommer vi ut och tittar.' },
    lista: [
      { q: 'Tar GD Måleri jobb i Danderyd?', a: 'Ja, i hela kommunen: Danderyd, Djursholm, Stocksund och Enebyberg. GD Måleri Sthlm AB tar uppdrag i hela Stockholm, och vi börjar alltid med ett hembesök som inte kostar något.' },
      { q: 'Vilket är närmaste jobb ni kan visa?', a: <>Vi har inga bilder från Danderyd på sidan än. I grannkommunen Täby, norr om Danderyd, kan vi visa en träfasad på 350 kvm i Täby kyrkby, klar i september 2026, och i Bromma en fasad på 234 kvm. Läs mer om <a href="/gdmaleri/fasadmalning-taby/">fasadmålning i Täby</a>.</> },
      { q: 'Hur bokar jag ett hembesök i Danderyd?', a: 'Boka en tid i kalendern på sidan, eller ring 073-729 88 89. Vi har öppet alla dagar 08 till 17, och efter besöket får du en skriftlig offert.' },
      { q: 'Kan ni måla fasaden på en äldre villa?', a: 'Ja. Vi målar trä, puts, tegel och plåt, och före målningen går vi igenom fasadens skick: tvätt, skrapning av lös färg och de lagningar som behövs. Vad just din fasad behöver ser vi vid hembesöket.' },
      { q: 'Behöver jag betala något i förskott?', a: <>Nej. Fakturan kommer när jobbet är klart och vi har gått igenom resultatet; på stora jobb över 500 kvm betalas halva arbetskostnaden vid halva jobbet. ROT är redan avdraget på fakturan om du äger och bor i huset. Källa för ROT: <a href={SKV_ROT} target="_blank" rel="noopener">Skatteverket, Ger arbetet rätt till rotavdrag?</a></> },
      { q: 'Har ni garanti och försäkring?', a: 'Ja. Ett års garanti på måleriarbetet, F-skatt och fullt försäkrade via Trygg-Hansa. Behöver något åtgärdas under det första året gör vi det utan extra kostnad.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Begär en offert', 'på villan i Danderyd'],
    lead: 'Ring, eller skriv några rader om villan. Du får en kostnadsfri offert där material, förarbete, städning och bortforsling ingår, och betalar först när jobbet är klart.',
    checkar: ['Svar inom 24 timmar', 'Ingen förskottsbetalning', 'ROT på småhus, direkt på fakturan'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta om villan',
    placeholder: 'Danderyd, Djursholm, Stocksund eller Enebyberg, fasadens material, ungefärlig yta och om dörrar och fönster ska med',
    typer: SIDOR.map((l) => l.txt),
    kundtyp,
    formNot,
    epostNamn,
    formNotBock: true,
  },

  popup: {
    rubrik: 'Villa i Danderyd?',
    text: 'Vi kommer ut och lämnar en offert utan kostnad. Ingen förskottsbetalning, och ROT dras direkt på fakturan.',
  },

  footer: {
    text: 'Fasadmålning i Danderyd, Djursholm, Stocksund och Enebyberg: fasad, takfot, dörrar och fönster. Ingen förskottsbetalning och ett års garanti på måleriarbetet.',
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

export default function GdMaleriFasadDanderyd() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <DemoSida data={data} />
    </>
  );
}
