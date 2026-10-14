import DemoSida from '../../_mall/DemoSida';
import { M, tema, logo, kontakt, cta, formular, bokning, kundtyp, formNot, epostNamn, SIDOR, footerTjanster, footerBild, footerLankar, footerOrter, menyExtra, navUndersida, hero, varfor, om, steg, instagramBas, RECO, RECO_IFRAME, RECO_LISTA, SKV_ROT, samarbeten, tjanstSchema, GOOGLE_BETYG, GOOGLE_OMDOMEN, skapadAv, BAND, UTVALDA, RITNING } from '../_gd';

/* ===========================================================================
   GD MÅLERI STHLM AB — ortssida FASADMÅLNING PÅ LIDINGÖ (/gdmaleri/fasadmalning-lidingo/), 2026-10-14.
   Mathias 2026-10-14: "bygg dom andra platserna också". Slug på gdmaleri.se: /fasadmalning-lidingo/,
   WordPress-sajtens gamla slug (Search Console vecka 41: "fasadmålning lidingö" 60 visningar,
   plats 13). Titeln säger "på Lidingö" (så säger man om ön), inte "i Lidingö".

   INGET BELAGT JOBB PÅ LIDINGÖ 2026-10-14; byt in ett riktigt jobb (ort, år, yta, foto) när det finns.
   Sidan säger "Vi har inga bilder från Lidingö på sidan än" och visar närmaste belagda jobb, märkta
   med sina riktiga orter: Bromma (IG Dd-zVd3ggOI, 234 kvm) och Täby kyrkby (IG Dc1IM7Pgpeh, 350 kvm).
   Inget avstånd anges (inte verifierat).

   VERIFIERAT (2026-10-14), utöver huvudsidans VERIFIERAT-block och _gd.js:
   Hela Stockholm: Ghandi via Mathias 2026-10-08 (Lidingö ligger i Stockholms län).
   Lidingö, lokala fakta: sv.wikipedia.org/wiki/Lidingö (läst 2026-10-14): "en ö i södra Uppland",
   ön bildar med mindre ögrupper Lidingö kommun; "Lidingö villastäder byggdes upp genom bolagsförvärv
   av mark med början 1906"; "Efterkrigstidens koncentrerade bostadsområden med flerbostadshus
   byggdes upp från omkring 1950".
   Erbjudandet, öppettider, hembesök och ROT: som fasadmalning-bromma/page.js. BRF: brf/page.js.
   Omdömen: Google-citaten ordagrant ur GOOGLE_OMDOMEN, Recos egen widget; inget säger Lidingö.

   INTE verifierat, och finns därför inte på sidan: jobb, kunder, ytor eller år på Lidingö,
   restid eller avstånd, priser, ledtider, typiska fasader på ön utöver källan ovan.
   OPTIMERING: egen titel, beskrivning, hero-rad, kort och frågor. JSON-LD Service med areaServed
   Lidingö → HousePainter (@id gdmaleri.se/#business), inget betygsschema, inget FAQPage. Lidingö
   läggs INTE till i startsidans areaServed (inget belagt jobb).
   =========================================================================== */

export const metadata = {
  title: 'Fasadmålning på Lidingö – målare för fasad och hus | GD Måleri Sthlm AB',
  description:
    'Fasadmålning på Lidingö: tvätt, skrapning och ny färg på trä, puts, tegel och plåt. Kostnadsfritt hembesök, offert med allt inräknat, faktura när jobbet är klart och ROT på fakturan.',
  robots: { index: false, follow: false },
};

const schema = tjanstSchema({
  namn: 'Fasadmålning på Lidingö',
  typ: 'Fasadmålning',
  beskrivning: 'Fasadtvätt och fasadmålning på Lidingö: trä, puts, tegel och plåt, med fönster, vindskivor och takfot. Kostnadsfritt hembesök och ROT på småhus direkt på fakturan.',
  omrade: [{ '@type': 'City', name: 'Lidingö' }],
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

  hero: { ...hero, rubrik: { fraga: 'Fasadmålning på Lidingö', svar: 'Villor & föreningar.' } },
  tejp: ['Fasadmålning på Lidingö', 'Hembesök utan kostnad', 'Trä, puts, tegel och plåt', 'Tvätt för sig eller före målning', 'Ingen förskottsbetalning', 'Ett års garanti', 'Rekommenderat företag 2024–2026', 'ROT på fakturan'],

  tjanster: {
    eyebrow: 'Fasad på Lidingö',
    rubrik: ['Ny färg på fasaden', 'ute på Lidingö'],
    lead: 'Lidingö är en ö och en egen kommun, med villastäder som började byggas 1906 och flerbostadshus från omkring 1950. Vi tar fasadjobb här som i resten av Stockholm: vi kommer hem till dig, tittar på fasaden och lämnar en offert som inte kostar något.',
    lattKort: true,
    kolumner: 3,
    kort: [
      { id: 'villa', namn: 'Fasaden på villan', bild: `${M}/tjanst-fasad.jpg`, alt: 'Nymålad laxrosa panelfasad med vitt burspråksfönster och svart stuprör', text: 'Trä, puts, tegel eller plåt. Vid hembesöket ser vi vad fasaden behöver: tvätt, skrapning av lös färg och de lagningar som behövs.', punkter: ['Hembesök utan kostnad', 'Färg från Flügger', 'ROT på småhus'], lank: { href: '/gdmaleri/fasad/', txt: 'Allt om fasadmålning' }, ritning: RITNING.fasad },
      { id: 'forening', namn: 'Flerbostadshus och föreningar', bild: `${M}/jobb-fonster-maskerade.jpg`, alt: 'Spröjsade fönster maskerade med blå tejp inför målning', text: 'Bor du i en bostadsrättsförening tar vi fram en offert till styrelsen, för fasad, trapphus eller entréer.', punkter: ['Offert till styrelsen', 'Fasad, trapphus och entréer', 'Faktura efter jobbet'], lank: { href: '/gdmaleri/brf/', txt: 'Målning för BRF' }, ritning: RITNING.dorr },
      { id: 'narmast', namn: 'Närmaste jobb vi kan visa', bild: `${M}/jobb-bromma-altan.webp`, alt: 'Ljusgrå panelfasad med vita spröjsade altandörrar och fönsterkarmar mot ett trädäck, ett jobb i Bromma', text: 'Vi har inga bilder från Lidingö på sidan än. Fasaderna vi kan visa med ort och yta är i Bromma och Täby kyrkby.', punkter: ['Bromma: 234 kvm', 'Täby kyrkby: 350 kvm', 'Alla bilder märkta med ort'], lank: { href: '/gdmaleri/fasadmalning-bromma/', txt: 'Fasadmålning i Bromma' }, ritning: RITNING.plats },
    ],
  },

  jobb: {
    eyebrow: 'Närmaste jobb vi kan visa',
    rubrik: ['Fasader i Bromma', 'och Täby kyrkby'],
    lead: 'Vi har inga bilder från Lidingö på sidan än. De två stora bilderna är fasader vi har gjort i Bromma och Täby kyrkby, och varje bild med ort är märkt med var den är tagen.',
    not: 'Före/efter-bilden från Bromma är två foton av samma gavel, satta ihop på mitten. Bilder utan ort i bildtexten är från jobb där vi inte anger orten.',
    utvalda: [UTVALDA.brommaForeEfter, UTVALDA.taby1],
    tid: '70s',
    rad1: [BAND.taby43, BAND.langsida, BAND.rodFonster, BAND.terrass, BAND.fonsterbleck, BAND.rodTimmer],
    rad2: [BAND.blaTak, BAND.takFore, BAND.takEfter, BAND.sodertalje1, BAND.trappa, BAND.gulHall],
  },

  varfor,
  om,
  steg,

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Omdömen från', 'kunder i Stockholm'],
    betyg: GOOGLE_BETYG,
    googleLista: [GOOGLE_OMDOMEN.marianne, GOOGLE_OMDOMEN.per, GOOGLE_OMDOMEN.thorellski],
    recoIframe: RECO_IFRAME,
    lista: RECO_LISTA,
    not: 'Google-citaten ordagrant, hämtade 2026-10-09 (4,8 av 5, 19 recensioner). Reco-rutan visar Recos egna, senaste omdömen. Inget av omdömena säger var i Stockholm jobbet gjordes.',
    lank: RECO,
  },

  instagram: { ...instagramBas, koder: ['Dd-zVd3ggOI', 'Dc1IM7Pgpeh', 'DcmMHrIEbrF'] },

  fragor: {
    eyebrow: 'Frågor om fasad på Lidingö',
    rubrik: ['Det du kanske undrar', 'om du bor på Lidingö'],
    lead: 'Raka svar, också om vad vi kan visa och inte.',
    kort: { rubrik: 'Har du ett hus på Lidingö?', text: 'Boka en tid, så kommer vi ut på ön och tittar på fasaden innan du bestämmer dig.' },
    lista: [
      { q: 'Tar GD Måleri jobb på Lidingö?', a: 'Ja. GD Måleri Sthlm AB tar uppdrag i hela Stockholm, och Lidingö ingår. Vi kommer ut på ett kostnadsfritt hembesök och lämnar en skriftlig offert efter det.' },
      { q: 'Vilket är närmaste jobb ni kan visa?', a: 'Vi har inga bilder från Lidingö på sidan än. Fasaderna vi kan visa med ort och yta är 234 kvm i Bromma, klar hösten 2026, och 350 kvm i Täby kyrkby, klar i september 2026. Båda finns på vårt Instagram.' },
      { q: 'Hur bokar jag hembesök på Lidingö?', a: 'Välj en tid i kalendern på sidan, eller ring 073-729 88 89. Vi kommer alla dagar mellan 08 och 17, och besöket tar ungefär 45 minuter. Efter besöket får du offerten.' },
      { q: 'Får jag ROT-avdrag för fasadmålning på Lidingö?', a: <>Reglerna är desamma i hela landet. Äger och bor du i en villa räknar Skatteverket målning och tvätt av fasaden som rotarbete: 30 procent av arbetskostnaden, högst 50 000 kronor per person och år, och vi drar av det direkt på fakturan. I en bostadsrättsförening ger fasaden inget avdrag. Källa: <a href={SKV_ROT} target="_blank" rel="noopener">Skatteverket, Ger arbetet rätt till rotavdrag?</a></> },
      { q: 'Målar ni flerbostadshus på Lidingö?', a: <>Ja, vi tar också jobb åt bostadsrättsföreningar, och offerten går då till styrelsen. Läs mer på sidan om <a href="/gdmaleri/brf/">målning för bostadsrättsföreningar</a>.</> },
      { q: 'Vad händer om något oväntat dyker upp på fasaden?', a: 'Då hör vi av oss innan vi gör något. Inget extraarbete görs utan ditt godkännande, och fakturan kommer först när jobbet är klart och vi har gått igenom resultatet tillsammans.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Fasaden på Lidingö,', 'offererad på plats'],
    lead: 'Skriv några rader om huset eller ring, så bokar vi ett besök. Offerten är kostnadsfri och tar med material, förarbete, städning och bortforsling.',
    checkar: ['Svar inom 24 timmar', 'Hembesök utan kostnad', 'Inget extra utan ditt ja'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta om huset på Lidingö',
    placeholder: 'Villa eller förening, fasadens material, ungefärlig yta och när du vill ha det gjort',
    typer: SIDOR.map((l) => l.txt),
    kundtyp,
    formNot,
    epostNamn,
    formNotBock: true,
  },

  popup: {
    rubrik: 'Fasad på Lidingö?',
    text: 'Boka ett hembesök så får du en offert som inte kostar något. ROT på småhus dras direkt på fakturan.',
  },

  footer: {
    text: 'Fasadmålning på Lidingö: tvätt, skrapning och ny färg på villor och flerbostadshus. Kostnadsfritt hembesök, inget extra utan ditt ja och faktura när jobbet är klart.',
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

export default function GdMaleriFasadLidingo() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <DemoSida data={data} />
    </>
  );
}
