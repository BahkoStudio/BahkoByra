import DemoSida from '../../_mall/DemoSida';
import { M, tema, logo, kontakt, cta, formular, bokning, kundtyp, formNot, epostNamn, SIDOR, footerTjanster, footerBild, footerLankar, footerOrter, menyExtra, navUndersida, hero, varfor, om, steg, instagramBas, RECO, SKV_ROT, samarbeten, tjanstSchema, GOOGLE_BETYG, GOOGLE_OMDOMEN, skapadAv, recoKort, BAND, UTVALDA, RITNING } from '../_gd';

/* ===========================================================================
   GD MÅLERI STHLM AB — ortssida FASADMÅLNING I TÄBY (/gdmaleri/fasadmalning-taby/), 2026-10-14.
   Mathias 2026-10-14: "bygg dom andra platserna också". Slug på gdmaleri.se: /fasadmalning-taby/,
   WordPress-sajtens gamla slug (Search Console vecka 41: "täby" 45 visningar, plats 9,4).

   VERIFIERAT (2026-10-14), utöver huvudsidans VERIFIERAT-block och _gd.js:
   Belagt jobb i Täby: IG Dc1IM7Pgpeh (publicerat 2026-09-03, platstagg Täby), ordagrant "Exklusiv
   Fasadmålning klar 350 kvm i Täby kyrkby". jobb-taby-1/-2/-43.webp = Ghandis foton ur inlägget
   (fasad/page.js, NYA BILDER): grå träfasad, modernt tvåvåningshus, altan, tallar och berghällar.
   Täby, lokala fakta: sv.wikipedia.org/wiki/Täby_kommun (läst 2026-10-14): Täby kyrkby är en
   kommundel ("Täby kyrkby, med Byle, Runborg, Midgård och Karlslund"), "Cirka 40 procent av området
   som utgör kommunen utgörs av bebyggelse", Täby gränsar "i söder åt Danderyds kommun, i väster åt
   Sollentuna kommun".
   Erbjudandet, hela Stockholm, öppettider, hembesök och ROT: som fasadmalning-bromma/page.js.
   Omdömen ordagrant ur RECO_LISTA och GOOGLE_OMDOMEN; inget av dem säger Täby.

   INTE verifierat, och finns därför inte på sidan: fler jobb i Täby, priser, ledtider, vilken
   Flügger-produkt eller kulörkod som användes, omdöme från Täby-kunden.
   FLAGGOR: Täby-inlägget har en kampanjtext (10 % / 30 %) i bildtexten; byt inlägg i Instagram-
   sektionen när kampanjen är slut. Inga omdömen med ort Täby.
   OPTIMERING: egen titel, beskrivning, hero-rad, kort och frågor. JSON-LD Service med areaServed
   Täby → HousePainter (@id gdmaleri.se/#business), inget betygsschema, inget FAQPage.
   =========================================================================== */

export const metadata = {
  title: 'Fasadmålning i Täby – målare för fasad och hus | GD Måleri Sthlm AB',
  description:
    'Fasadmålning i Täby: 350 kvm träfasad i Täby kyrkby, klar i september 2026. Tvätt, skrapning och målning i samma offert, kostnadsfritt hembesök och ROT på fakturan.',
  robots: { index: false, follow: false },
};

const schema = tjanstSchema({
  namn: 'Fasadmålning i Täby',
  typ: 'Fasadmålning',
  beskrivning: 'Fasadtvätt och fasadmålning i Täby kommun, senast en träfasad på 350 kvm i Täby kyrkby i september 2026. ROT på småhus dras direkt på fakturan.',
  omrade: [{ '@type': 'City', name: 'Täby' }, { '@type': 'Place', name: 'Täby kyrkby' }],
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

  hero: { ...hero, rubrik: { fraga: 'Fasadmålning i Täby', svar: '350 kvm träfasad i Täby kyrkby.' } },
  tejp: ['Fasadmålning i Täby', '350 kvm i Täby kyrkby', 'Träfasad i grått', 'Tvätt, skrapning och lagning', 'Fönster och vindskivor', 'Ingen förskottsbetalning', '4,9 av 5 på Reco', 'ROT på småhus'],

  tjanster: {
    eyebrow: 'Fasad i Täby',
    rubrik: ['Täby kyrkby:', '350 kvm träfasad'],
    lead: 'I september 2026 blev en träfasad på 350 kvm i Täby kyrkby klar, målad i grått. Har du ett hus någon annanstans i Täby kommun gör vi samma sak: hembesök, offert, förarbete och målning från samma firma.',
    lattKort: true,
    kolumner: 3,
    kort: [
      { id: 'taby-jobbet', namn: 'Huset i Täby kyrkby', bild: `${M}/jobb-taby-43.webp`, alt: 'Nymålad grå träfasad på ett modernt tvåvåningshus i Täby kyrkby, sedd från tomten', text: 'Ett modernt tvåvåningshus med träfasad, nymålat i grått och klart i september 2026.', punkter: ['350 kvm träfasad', 'Kulör: grått', 'Bilder på Instagram'], lank: { href: '#jobb', txt: 'Se bilderna från Täby' }, ritning: RITNING.plats },
      { id: 'tvatt', namn: 'Tvätt innan färgen', bild: `${M}/jobb-langsida.jpg`, alt: 'Långsida på ett hus med laxrosa stående panel, vita fönster och svart stuprör', text: 'Innan vi målar tvättas fasaden och lös färg skrapas bort. Tvätten går också att beställa för sig.', punkter: ['Tvätt och skrapning', 'Lagning där det behövs', 'ROT på småhus'], lank: { href: '/gdmaleri/fasadtvatt/', txt: 'Fasadtvätt' }, ritning: RITNING.tvatt },
      { id: 'detaljer', namn: 'Fönster och vindskivor', bild: `${M}/jobb-fonsterbleck.jpg`, alt: 'Närbild på vitmålad fönsterbåge och svart fönsterbleck mot panel', text: 'Fönsterbågar, vindskivor och takfot kan målas i samma veva som väggarna, i samma offert.', punkter: ['Fönsterbågar', 'Vindskivor och takfot', 'Färg från Flügger'], lank: { href: '/gdmaleri/fasad/', txt: 'Fasadmålning i Stockholm' }, ritning: RITNING.fonster },
    ],
  },

  jobb: {
    eyebrow: 'Jobbet i Täby',
    rubrik: ['Täby kyrkby,', 'från två håll'],
    lead: 'Båda de stora bilderna är från huset i Täby kyrkby, publicerade på vårt Instagram i september 2026. Banden visar fler av våra jobb i Stockholm, med ort där vi kan visa den.',
    not: 'Bilder utan ort i bildtexten är från andra jobb än det i Täby kyrkby. Fler bilder finns på vårt Instagram.',
    utvalda: [UTVALDA.taby1, UTVALDA.taby2],
    tid: '70s',
    rad1: [BAND.brommaAltan, BAND.rodFonster, BAND.terrass, BAND.rodTimmer, BAND.fonsterMaskerade, BAND.langsida],
    rad2: [BAND.takEfter, BAND.blaTak, BAND.sodertalje2, BAND.trappa, BAND.takFore, BAND.vardagsrum],
  },

  varfor,
  om,
  steg,

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Vad kunderna', 'skriver efteråt'],
    betyg: GOOGLE_BETYG,
    lista: [recoKort('Stefan G'), recoKort('Ola A'), GOOGLE_OMDOMEN.per, GOOGLE_OMDOMEN.patrik, recoKort('Bo M'), GOOGLE_OMDOMEN.marianne],
    not: 'Från Google (4,8 av 5, 19 recensioner) och Reco.se, där kundrelationen kontrolleras. Ordagrant, hämtade 2026-10-09. Omdömena gäller jobb i hela Stockholm, inte bara Täby.',
    lank: RECO,
  },

  instagram: { ...instagramBas, lead: 'Täby-inlägget först, sedan fler jobb från vårt konto.', koder: ['Dc1IM7Pgpeh', 'Dd-zVd3ggOI', 'DeNI1zEkcpW'] },

  fragor: {
    eyebrow: 'Frågor om fasaden i Täby',
    rubrik: ['Det Täbybor', 'undrar om fasaden'],
    lead: 'Om jobbet i Täby kyrkby, om resten av kommunen och om vad det kostar.',
    kort: { rubrik: 'Har du ett hus i Täby?', text: 'Ring eller boka ett besök, så tittar vi på fasaden och lämnar en offert.' },
    lista: [
      { q: 'Har ni målat fasader i Täby?', a: 'Ja. I september 2026 blev en träfasad på 350 kvm i Täby kyrkby klar, målad i grått. Bilderna på den här sidan är från det huset, och inlägget finns på vårt Instagram.' },
      { q: 'Jobbar ni i hela Täby kommun, inte bara i Täby kyrkby?', a: 'Ja. GD Måleri Sthlm AB tar uppdrag i hela Stockholm, och det gäller hela Täby kommun. Täby kyrkby är bara den kommundel där vi har ett färdigt jobb att visa.' },
      { q: 'Hur går ett offertbesök i Täby till?', a: 'Du väljer en tid i kalendern på sidan eller ringer 073-729 88 89. Vi tittar på fasaden, ytan och skicket, och sedan får du en skriftlig offert där material, förarbete, städning och bortforsling ingår. Besöket kostar ingenting.' },
      { q: 'Vad kostar det att måla om fasaden på en villa i Täby?', a: <>Det beror på ytan, materialet och hur fasaden mår, så priset står i offerten efter besöket. På ett småhus dras ROT direkt på fakturan: 30 procent av arbetskostnaden, högst 50 000 kronor per person och år, om du äger och bor i huset. Källa: <a href={SKV_ROT} target="_blank" rel="noopener">Skatteverket, Ger arbetet rätt till rotavdrag?</a></> },
      { q: 'Vilken färg använder ni?', a: 'Vi målar med färg från Flügger. Kulören väljer du; på huset i Täby kyrkby blev det grått.' },
      { q: 'Har ni garanti på fasadmålningen?', a: 'Ja, ett år på måleriarbetet. Behöver något åtgärdas under den tiden gör vi det utan extra kostnad. Vi är också försäkrade via Trygg-Hansa och har F-skatt.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Offert på fasaden,', 'var du än bor i Täby'],
    lead: 'Skriv några rader om huset eller ring. Offerten kostar ingenting och tar med allt från tvätt till bortforsling, och inget extra görs utan ditt ja.',
    checkar: ['Svar inom 24 timmar', 'Kostnadsfri offert, allt inräknat', 'Faktura när jobbet är klart'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta om fasaden',
    placeholder: 'Var i Täby, träfasad eller annat material, ungefärlig yta och om fönster och vindskivor ska med',
    typer: SIDOR.map((l) => l.txt),
    kundtyp,
    formNot,
    epostNamn,
    formNotBock: true,
  },

  popup: {
    rubrik: 'Fasad i Täby?',
    text: 'Vi kommer ut, tittar på huset och lämnar en offert utan kostnad. ROT dras direkt på fakturan.',
  },

  footer: {
    text: 'Fasadmålning i Täby: senast en träfasad på 350 kvm i Täby kyrkby, september 2026. Tvätt, skrapning och målning i samma offert, faktura när jobbet är klart.',
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

export default function GdMaleriFasadTaby() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <DemoSida data={data} />
    </>
  );
}
