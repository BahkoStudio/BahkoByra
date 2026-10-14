import DemoSida from '../../_mall/DemoSida';
import { M, tema, logo, kontakt, cta, formular, bokning, kundtyp, formNot, epostNamn, SIDOR, footerTjanster, footerBild, footerLankar, footerOrter, menyExtra, navUndersida, hero, varfor, om, steg, instagramBas, RECO, RECO_IFRAME, RECO_LISTA, SKV_ROT, samarbeten, tjanstSchema, GOOGLE_BETYG, GOOGLE_OMDOMEN, skapadAv, BAND, UTVALDA, RITNING } from '../_gd';

/* ===========================================================================
   GD MÅLERI STHLM AB — ortssida FASADMÅLNING I HUDDINGE (/gdmaleri/fasadmalning-huddinge/), 2026-10-14.
   Mathias 2026-10-14: "bygg dom andra platserna också". Slug på gdmaleri.se: /fasadmalning-huddinge/,
   WordPress-sajtens gamla slug (Search Console vecka 41: "huddinge" 32 visningar, plats 7,7).

   INGET BELAGT JOBB I HUDDINGE 2026-10-14; byt in ett riktigt jobb (ort, år, yta, foto) när det finns.
   Sidan säger "Vi har inga bilder från Huddinge på sidan än" och visar närmaste belagda jobb: på södra
   sidan Södertälje (IG DeNI1zEkcpW, tak och väggar 180 kvm, firmans säte; ett INVÄNDIGT jobb, och sidan
   säger det), och fasaderna i Bromma (234 kvm) och Täby kyrkby (350 kvm). Inget avstånd anges.

   VERIFIERAT (2026-10-14), utöver huvudsidans VERIFIERAT-block och _gd.js:
   Hela Stockholm: Ghandi via Mathias 2026-10-08.
   Huddinge, lokala fakta: sv.wikipedia.org/wiki/Huddinge_kommun (läst 2026-10-14): "Kommunen gränsar
   i norr helt till Stockholms kommun, och större delen av bebyggelsen ingår i tätorten Stockholm";
   kring centrum "ligger villaområden i de flesta väderstrecken"; bakom Flemingsberg i väster "ligger
   stora villaområden som Kästa".
   Taktvätt som egen tjänst: Ghandi via Mathias 2026-10-08 (taktvatt/page.js).
   Erbjudandet, öppettider, hembesök och ROT: som fasadmalning-bromma/page.js.
   Omdömen: Google-citaten ordagrant ur GOOGLE_OMDOMEN, Recos egen widget; inget säger Huddinge.

   INTE verifierat, och finns därför inte på sidan: jobb, kunder, ytor eller år i Huddinge, restid
   eller avstånd, priser, ledtider, vilka kommundelar som har vilka hus utöver källan.
   OPTIMERING: egen titel, beskrivning, hero-rad, kort och frågor. JSON-LD Service med areaServed
   Huddinge → HousePainter (@id gdmaleri.se/#business), inget betygsschema, inget FAQPage.
   Huddinge läggs INTE till i startsidans areaServed (inget belagt jobb).
   =========================================================================== */

export const metadata = {
  title: 'Fasadmålning i Huddinge – målare för fasad och hus | GD Måleri Sthlm AB',
  description:
    'Fasadmålning i Huddinge: fasad och tak på villan, offererat vid ett hembesök utan kostnad. Inget extra utan ditt ja, faktura när jobbet är klart och ROT direkt på fakturan.',
  robots: { index: false, follow: false },
};

const schema = tjanstSchema({
  namn: 'Fasadmålning i Huddinge',
  typ: 'Fasadmålning',
  beskrivning: 'Fasadtvätt, fasadmålning och taktvätt i Huddinge: trä, puts, tegel och plåt. Kostnadsfri offert efter hembesök, ROT på småhus direkt på fakturan.',
  omrade: [{ '@type': 'City', name: 'Huddinge' }],
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

  hero: { ...hero, rubrik: { fraga: 'Fasadmålning i Huddinge', svar: 'Offert vid ett hembesök, utan kostnad.' } },
  tejp: ['Fasadmålning i Huddinge', 'Fasad och tak', 'Taktvätt', 'Inget extra utan ditt ja', 'Slutbesiktning före fakturan', 'Färg från Flügger', '46 omdömen på Reco', 'ROT på småhus'],

  tjanster: {
    eyebrow: 'Fasad i Huddinge',
    rubrik: ['Fasaden i Huddinge,', 'offererad på plats'],
    lead: 'Huddinge gränsar i norr till Stockholm, och runt centrum ligger villaområden i de flesta väderstreck. Där tar vi fasadjobb som i resten av Stockholm: en kostnadsfri offert efter hembesöket, inget extra utan ditt ja och faktura när jobbet är klart.',
    lattKort: true,
    kolumner: 3,
    kort: [
      { id: 'fasad', namn: 'Fasadmålning', bild: `${M}/jobb-langsida.jpg`, alt: 'Långsida på ett hus med laxrosa stående panel, vita fönster och svart stuprör', text: 'Trä, puts, tegel eller plåt. Fasaden tvättas och skrapas, och det som behöver lagas lagas, innan färgen kommer på.', punkter: ['Trä, puts, tegel och plåt', 'Vindskivor och takfot', 'Färg från Flügger'], lank: { href: '/gdmaleri/fasad/', txt: 'Fasadmålning i Stockholm' }, ritning: RITNING.fasad },
      { id: 'taktvatt', namn: 'Taktvätt i samma veva', bild: `${M}/jobb-tak-fore.jpg`, alt: 'Betongpannetak med mossa och gul lav före taktvätt', text: 'Mossa och lav bort från betongpannorna. Taktvätten kan ingå i samma offert som fasaden.', punkter: ['Mossa och lav bort', 'ROT på småhus', 'Takmålning som tillval'], lank: { href: '/gdmaleri/taktvatt/', txt: 'Taktvätt' }, ritning: RITNING.taktvatt },
      { id: 'narmast', namn: 'På södra sidan: Södertälje', bild: `${M}/invandig-sodertalje-2.webp`, alt: 'Nymålat vitt tak med taklampa och bred taklist mot ljusgrå väggar, en öppen dörr med glasrutor, i Södertälje', text: 'Vi har inga bilder från Huddinge på sidan än. På södra sidan av Stockholm kan vi visa tak och väggar på 180 kvm i Södertälje, där firman har sitt säte. Det är ett jobb inomhus.', punkter: ['Södertälje: 180 kvm inne', 'Fasader: Bromma och Täby kyrkby', 'Bilder märkta med ort'], lank: { href: '/gdmaleri/malare-sodertalje/', txt: 'Målare i Södertälje' }, ritning: RITNING.plats },
    ],
  },

  jobb: {
    eyebrow: 'Fasader vi kan visa',
    rubrik: ['Med ort och yta,', 'från andra delar av stan'],
    lead: 'Vi har inga bilder från Huddinge på sidan än. De stora bilderna är fasader i Bromma och Täby kyrkby; i banden finns också rummen från Södertälje. Varje bild med ort är märkt med var den är tagen.',
    not: 'Före/efter-bilden från Bromma är två foton av samma gavel, satta ihop på mitten. Bilder utan ort i bildtexten är från jobb där vi inte anger orten.',
    utvalda: [UTVALDA.brommaForeEfter, UTVALDA.taby1],
    tid: '70s',
    rad1: [BAND.terrass, BAND.rodTimmer, BAND.taby2, BAND.fonsterbleck, BAND.brommaAltan, BAND.rodFonster],
    rad2: [BAND.takEfter, BAND.sodertalje1, BAND.fonsterMaskerade, BAND.gulHall, BAND.blaTak, BAND.trappa],
  },

  varfor,
  om,
  steg,

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Det kunderna', 'tar upp först'],
    betyg: GOOGLE_BETYG,
    googleLista: [GOOGLE_OMDOMEN.jenny, GOOGLE_OMDOMEN.maja, GOOGLE_OMDOMEN.daniel],
    recoIframe: RECO_IFRAME,
    lista: RECO_LISTA,
    not: 'Google-citaten ordagrant, hämtade 2026-10-09 (4,8 av 5, 19 recensioner). Reco-rutan visar Recos egna, senaste omdömen. Inget av omdömena säger var i Stockholm jobbet gjordes.',
    lank: RECO,
  },

  instagram: { ...instagramBas, koder: ['DeNI1zEkcpW', 'Dd-zVd3ggOI', 'Dc1IM7Pgpeh'] },

  fragor: {
    eyebrow: 'Frågor om fasad i Huddinge',
    rubrik: ['Det du vill veta', 'innan vi kommer till Huddinge'],
    lead: 'Om var vi jobbar, vad vi kan visa och vad som ingår.',
    kort: { rubrik: 'Bor du i Huddinge?', text: 'Boka ett besök eller ring, så tittar vi på fasaden och taket och lämnar en offert.' },
    lista: [
      { q: 'Tar GD Måleri jobb i Huddinge?', a: 'Ja. GD Måleri Sthlm AB tar uppdrag i hela Stockholm, och det gäller Huddinge. Vi börjar med ett hembesök som inte kostar något, och sedan får du en skriftlig offert.' },
      { q: 'Vilka jobb kan ni visa nära Huddinge?', a: <>Vi har inga bilder från Huddinge på sidan än. På södra sidan av Stockholm kan vi visa tak och väggar på 180 kvm i Södertälje, där firman har sitt säte, men det är ett jobb inomhus. Fasaderna vi kan visa är 234 kvm i Bromma och 350 kvm i Täby kyrkby. Se också <a href="/gdmaleri/malare-sodertalje/">målare i Södertälje</a>.</> },
      { q: 'Hur bokar jag ett hembesök i Huddinge?', a: 'Använd kalendern längre ner på sidan, eller ring 073-729 88 89. Vi kommer alla dagar mellan 08 och 17; besöket tar ungefär 45 minuter.' },
      { q: 'Kan ni tvätta taket samtidigt som ni gör fasaden?', a: <>Ja. Taktvätt är en egen tjänst hos oss och kan ligga i samma offert som fasaden. På ett småhus ger både taktvätt och fasadmålning ROT. Läs mer om <a href="/gdmaleri/taktvatt/">taktvätt</a>.</> },
      { q: 'Får jag ROT-avdrag i Huddinge?', a: <>Ja, om du äger och bor i huset; reglerna är desamma i hela landet. Avdraget är 30 procent av arbetskostnaden, högst 50 000 kronor per person och år, och vi drar av det direkt på fakturan. Materialet ger inget avdrag. Källa: <a href={SKV_ROT} target="_blank" rel="noopener">Skatteverket, Ger arbetet rätt till rotavdrag?</a></> },
      { q: 'Vad händer om något oväntat dyker upp under jobbet?', a: 'Då ringer vi dig först. Vi gör inga extraarbeten utan ditt godkännande, och när jobbet är klart går vi igenom resultatet tillsammans innan fakturan kommer.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Begär en offert', 'på huset i Huddinge'],
    lead: 'Skriv några rader eller ring. Offerten kostar ingenting och tar med material, förarbete, städning och bortforsling, för fasaden, taket eller båda.',
    checkar: ['Svar inom 24 timmar', 'Hembesök utan kostnad', 'Faktura när jobbet är klart'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta om huset',
    placeholder: 'Var i Huddinge, fasad, tak eller båda, ungefärlig yta och fasadens material',
    typer: SIDOR.map((l) => l.txt),
    kundtyp,
    formNot,
    epostNamn,
    formNotBock: true,
  },

  popup: {
    rubrik: 'Fasad i Huddinge?',
    text: 'Boka ett hembesök så får du en offert utan kostnad, på fasaden, taket eller båda.',
  },

  footer: {
    text: 'Fasadmålning i Huddinge: fasad och tak på villan, tvätt, skrapning och ny färg. Hembesök utan kostnad, inget extra utan ditt ja och faktura när jobbet är klart.',
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

export default function GdMaleriFasadHuddinge() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <DemoSida data={data} />
    </>
  );
}
