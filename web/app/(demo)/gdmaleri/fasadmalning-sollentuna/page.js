import DemoSida from '../../_mall/DemoSida';
import { M, tema, logo, kontakt, cta, formular, bokning, kundtyp, formNot, epostNamn, SIDOR, footerTjanster, footerBild, footerLankar, footerOrter, menyExtra, navUndersida, hero, varfor, om, steg, instagramBas, RECO, SKV_ROT, samarbeten, tjanstSchema, GOOGLE_BETYG, GOOGLE_OMDOMEN, skapadAv, recoKort, BAND, UTVALDA, RITNING } from '../_gd';

/* ===========================================================================
   GD MÅLERI STHLM AB — ortssida FASADMÅLNING I SOLLENTUNA (/gdmaleri/fasadmalning-sollentuna/),
   2026-10-14. Mathias 2026-10-14: "bygg dom andra platserna också". Slug på gdmaleri.se:
   /fasadmalning-sollentuna/, WordPress-sajtens gamla slug (Search Console vecka 41: "sollentuna"
   39 visningar, plats 11,2).

   INGET BELAGT JOBB I SOLLENTUNA 2026-10-14; byt in ett riktigt jobb (ort, år, yta, foto) när det finns.
   Sidan säger "Vi har inga bilder från Sollentuna på sidan än" och visar närmaste belagda jobb:
   Täby kyrkby (IG Dc1IM7Pgpeh, 350 kvm) i grannkommunen Täby, och Bromma (IG Dd-zVd3ggOI, 234 kvm).
   Inget avstånd anges (inte verifierat), bara att Täby är grannkommun (källa nedan).

   VERIFIERAT (2026-10-14), utöver huvudsidans VERIFIERAT-block och _gd.js:
   Hela Stockholm: Ghandi via Mathias 2026-10-08.
   Sollentuna, lokala fakta: sv.wikipedia.org/wiki/Sollentuna_kommun (läst 2026-10-14): villabyggandet
   tog fart i början av 1900-talet när "gamla herrgårdarnas mark" styckades och såldes som
   "villatomter"; "Mellan 1906 och 1910 byggs 114 villor i det nya samhället Norrviken"; "Edsviken
   villastad"; kommunen gränsar "i sydväst till Stockholms kommun".
   sv.wikipedia.org/wiki/Täby_kommun (läst 2026-10-14): Täby gränsar "i väster åt Sollentuna kommun".
   Erbjudandet, öppettider, hembesök och ROT: som fasadmalning-bromma/page.js.
   Omdömen ordagrant ur RECO_LISTA och GOOGLE_OMDOMEN; inget säger Sollentuna.

   INTE verifierat, och finns därför inte på sidan: jobb, kunder, ytor eller år i Sollentuna,
   restid eller avstånd, priser, ledtider.
   OPTIMERING: egen titel, beskrivning, hero-rad, kort och frågor. JSON-LD Service med areaServed
   Sollentuna → HousePainter (@id gdmaleri.se/#business), inget betygsschema, inget FAQPage.
   Sollentuna läggs INTE till i startsidans areaServed (inget belagt jobb).
   =========================================================================== */

export const metadata = {
  title: 'Fasadmålning i Sollentuna – målare för fasad och villa | GD Måleri Sthlm AB',
  description:
    'Fasadmålning i Sollentuna: genomgång, tvätt, skrapning och ny färg på villan. I grannkommunen Täby kan vi visa 350 kvm träfasad. Kostnadsfri offert och ROT på fakturan.',
  robots: { index: false, follow: false },
};

const schema = tjanstSchema({
  namn: 'Fasadmålning i Sollentuna',
  typ: 'Fasadmålning',
  beskrivning: 'Fasadtvätt och fasadmålning i Sollentuna: trä, puts, tegel och plåt, med fönster och snickerier. Kostnadsfri offert efter hembesök, ROT på småhus direkt på fakturan.',
  omrade: [{ '@type': 'City', name: 'Sollentuna' }],
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

  hero: { ...hero, rubrik: { fraga: 'Fasadmålning i Sollentuna', svar: 'Från tvätt till sista strykningen.' } },
  tejp: ['Fasadmålning i Sollentuna', 'Genomgång före målning', 'Fönster och snickerier', 'Fasadtvätt', 'Kostnadsfri offert', 'Faktura när jobbet är klart', 'F-skatt och Trygg-Hansa', '4,8 av 5 på Google'],

  tjanster: {
    eyebrow: 'Fasad i Sollentuna',
    rubrik: ['Villan i Sollentuna,', 'nymålad'],
    lead: 'Villabyggandet i Sollentuna tog fart i början av 1900-talet, när de gamla herrgårdarnas mark styckades till villatomter; i Norrviken byggdes 114 villor mellan 1906 och 1910. Gammalt hus eller nytt, fasaden får samma genomgång hos oss: tvätt, skrapning, lagning och sedan färg.',
    lattKort: true,
    kolumner: 3,
    kort: [
      { id: 'genomgang', namn: 'Genomgång och maskering', bild: `${M}/jobb-fonster-maskerade.jpg`, alt: 'Spröjsade fönster maskerade med blå tejp inför målning', text: 'Innan vi målar går vi igenom fasadens skick, och allt som inte ska målas täcks över.', punkter: ['Tvätt och skrapning', 'Lagning där det behövs', 'Allt annat täcks över'], lank: { href: '/gdmaleri/fasad/', txt: 'Fasadmålning i Stockholm' }, ritning: RITNING.maskering },
      { id: 'snickerier', namn: 'Fönster och snickerier', bild: `${M}/jobb-rod-fonster.jpg`, alt: 'Vitmålat spröjsat fönster i en röd träfasad', text: 'Fönsterbågar, foder, knutbrädor och ytterdörrar skrapas, slipas och grundas innan de målas.', punkter: ['Fönsterbågar och foder', 'Knutbrädor', 'Ytterdörrar'], lank: { href: '/gdmaleri/snickerier-fonster-malning/', txt: 'Fönster och snickerier' }, ritning: RITNING.fonster },
      { id: 'narmast', namn: 'Grannkommunen: Täby kyrkby', bild: `${M}/jobb-taby-43.webp`, alt: 'Nymålad grå träfasad på ett modernt tvåvåningshus i Täby kyrkby, sedd från tomten', text: 'Vi har inga bilder från Sollentuna på sidan än. I grannkommunen Täby kan vi visa fasaden på 350 kvm i Täby kyrkby.', punkter: ['Täby kyrkby: 350 kvm', 'Klar i september 2026', 'Bilder märkta med ort'], lank: { href: '/gdmaleri/fasadmalning-taby/', txt: 'Fasadmålning i Täby' }, ritning: RITNING.plats },
    ],
  },

  jobb: {
    eyebrow: 'Närmaste jobb vi kan visa',
    rubrik: ['Grannkommunen Täby', 'och Bromma'],
    lead: 'Vi har inga bilder från Sollentuna på sidan än. De stora bilderna är från Täby kyrkby, i grannkommunen Täby, och från Bromma. Varje bild med ort är märkt med var den är tagen.',
    not: 'Bilder utan ort i bildtexten är från jobb där vi inte anger orten. Fler jobb finns på vårt Instagram.',
    utvalda: [UTVALDA.taby1, UTVALDA.taby2, UTVALDA.brommaForeEfter],
    tid: '70s',
    rad1: [BAND.brommaAltan, BAND.langsida, BAND.terrass, BAND.fonsterbleck, BAND.rodTimmer, BAND.takEfter],
    rad2: [BAND.takFore, BAND.sodertalje2, BAND.panelvagg, BAND.sekelskifte, BAND.dorrGron, BAND.vardagsrum],
  },

  varfor,
  om,
  steg,

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Kunderna om', 'hur det gick'],
    betyg: GOOGLE_BETYG,
    lista: [recoKort('Bo M'), recoKort('Inga-Lill M'), recoKort('Lovisa B'), GOOGLE_OMDOMEN.jenny, GOOGLE_OMDOMEN.therese, GOOGLE_OMDOMEN.oliwer],
    not: 'Från Google (4,8 av 5, 19 recensioner) och Reco.se, där kundrelationen kontrolleras. Ordagrant, hämtade 2026-10-09. Inget av omdömena säger var i Stockholm jobbet gjordes.',
    lank: RECO,
  },

  instagram: { ...instagramBas, koder: ['Dc1IM7Pgpeh', 'Dd-zVd3ggOI', 'DcmMHrIEbrF'] },

  fragor: {
    eyebrow: 'Frågor om fasad i Sollentuna',
    rubrik: ['Det Sollentunabor', 'brukar fråga'],
    lead: 'Om vi kommer hit, vad vi kan visa och hur det går till.',
    kort: { rubrik: 'Har du ett hus i Sollentuna?', text: 'Ring eller boka ett besök, så tittar vi på fasaden och svarar på just ditt hus.' },
    lista: [
      { q: 'Tar GD Måleri jobb i Sollentuna?', a: 'Ja. GD Måleri Sthlm AB tar uppdrag i hela Stockholm, och Sollentuna ingår. Första steget är ett hembesök där vi tittar på fasaden, och det kostar ingenting.' },
      { q: 'Vilket är närmaste jobb ni kan visa?', a: <>Vi har inga bilder från Sollentuna på sidan än. I grannkommunen Täby kan vi visa fasaden på 350 kvm i Täby kyrkby, klar i september 2026. Vi har också en fasad på 234 kvm i Bromma. Läs mer om <a href="/gdmaleri/fasadmalning-taby/">fasadmålning i Täby</a>.</> },
      { q: 'Hur bokar jag hembesök i Sollentuna?', a: 'Boka en tid direkt i kalendern på sidan, eller ring 073-729 88 89 om du hellre pratar först. Vi har öppet alla dagar 08 till 17.' },
      { q: 'Vad kostar det att måla om en villa i Sollentuna?', a: <>Det avgörs av ytan, materialet och fasadens skick, så du får priset i offerten efter besöket. Offerten tar med material, förarbete, städning och bortforsling. Äger och bor du i huset dras ROT direkt på fakturan, 30 procent av arbetskostnaden. Källa: <a href={SKV_ROT} target="_blank" rel="noopener">Skatteverket, Ger arbetet rätt till rotavdrag?</a></> },
      { q: 'Kan ni bara tvätta fasaden?', a: <>Ja, fasadtvätt går att beställa för sig. Ska fasaden målas ingår tvätten i förarbetet. Läs mer om <a href="/gdmaleri/fasadtvatt/">fasadtvätt</a>.</> },
      { q: 'När betalar jag?', a: 'När jobbet är klart och vi har gått igenom resultatet tillsammans. Ingen förskottsbetalning; på stora jobb över 500 kvm betalas halva arbetskostnaden när halva jobbet är gjort.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Begär en offert', 'på villan i Sollentuna'],
    lead: 'Berätta kort om huset, eller ring. Offerten kostar ingenting och allt står med, från förarbete till bortforsling.',
    checkar: ['Svar inom 24 timmar', 'Kostnadsfri offert, allt inräknat', 'ROT på småhus, direkt på fakturan'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta om villan',
    placeholder: 'Var i Sollentuna, fasadens material, ungefärlig yta och om fönster och dörrar ska med',
    typer: SIDOR.map((l) => l.txt),
    kundtyp,
    formNot,
    epostNamn,
    formNotBock: true,
  },

  popup: {
    rubrik: 'Villa i Sollentuna?',
    text: 'Vi tittar på fasaden och lämnar en offert som inte kostar något. Fakturan kommer när jobbet är klart.',
  },

  footer: {
    text: 'Fasadmålning i Sollentuna: genomgång, tvätt, skrapning och ny färg, med fönster och snickerier. Kostnadsfri offert och faktura först när jobbet är klart.',
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

export default function GdMaleriFasadSollentuna() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <DemoSida data={data} />
    </>
  );
}
