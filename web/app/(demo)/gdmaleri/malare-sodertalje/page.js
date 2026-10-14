import DemoSida from '../../_mall/DemoSida';
import { M, tema, logo, kontakt, cta, formular, bokning, kundtyp, formNot, epostNamn, SIDOR, footerTjanster, footerBild, footerLankar, footerOrter, menyExtra, navUndersida, hero, varfor, om, steg, instagramBas, RECO, RECO_IFRAME, RECO_LISTA, SKV_ROT, samarbeten, tjanstSchema, GOOGLE_BETYG, GOOGLE_OMDOMEN, skapadAv, BAND, RITNING } from '../_gd';

/* ===========================================================================
   GD MÅLERI STHLM AB — ortssida MÅLARE I SÖDERTÄLJE (/gdmaleri/malare-sodertalje/), 2026-10-14.
   Mathias 2026-10-14: "bygg dom andra platserna också". Slug på gdmaleri.se: /malare-sodertalje/
   (ny; WordPress-sajten hade ingen Södertälje-sida). Bredare än fasad: inne och ute.

   VERIFIERAT (2026-10-14), utöver huvudsidans VERIFIERAT-block och _gd.js:
   Säte i Södertälje: allabolag.se och bolagsfakta.se (leadfilen, Verifierat). Adressen visas inte.
   Belagt jobb: IG DeNI1zEkcpW (publicerat 2026-10-07, platstagg Södertälje), ordagrant "180 kvm
   Tak/Vägg målning samt microlituppsättning och snobbkant". invandig-sodertalje-1/-2.webp = bild 2
   och 3 ur inlägget (invandig-malning/page.js). "microlituppsättning" tolkas inte på sidan.
   Reco-kategorin "Målare i Södertälje" (reco.se/kategori/målare/södertälje/1, läst 2026-10-14):
   GD Måleri Sthlm AB står först med 4,9 av 5 och 46 omdömen, "15 rekommenderade målare i
   Södertälje kommun". Reco anger inte hur listan sorteras, så sidan säger "först i listan när vi
   tittade", inte "bäst" eller "etta".
   Södertälje, lokala fakta: sv.wikipedia.org/wiki/Södertälje_kommun (läst 2026-10-14): kommun i
   Stockholms län, i norra delen av Södermanland.
   Erbjudandet, hela Stockholm, öppettider, hembesök och ROT: som fasadmalning-bromma/page.js.
   ROT i bostadsrätt (bara inne i lägenheten): Skatteverket via basta-malare-stockholm/page.js.

   INTE verifierat, och finns därför inte på sidan: fasad- eller takjobb i Södertälje (bara det
   invändiga jobbet är belagt), Järna, Hölö och Mölnbo som arbetsområde, priser, ledtider, omdömen
   med ort Södertälje.
   FLAGGOR: Reco-placeringen kan ändras; frågan säger datumet. Inget fasad- eller takfoto från
   Södertälje; korten Fasad och Tak visar foton utan ort.
   OPTIMERING: egen titel, beskrivning, hero-rad, kort och frågor. JSON-LD Service med areaServed
   Södertälje → HousePainter (@id gdmaleri.se/#business), inget betygsschema, inget FAQPage.
   =========================================================================== */

export const metadata = {
  title: 'Målare i Södertälje – fasad, tak och invändig målning | GD Måleri Sthlm AB',
  description:
    'Målare i Södertälje, där GD Måleri Sthlm AB har sitt säte: invändig målning, fasad och tak. Senast 180 kvm tak och väggar. 4,9 av 5 på Reco, kostnadsfri offert och ROT på fakturan.',
  robots: { index: false, follow: false },
};

const schema = tjanstSchema({
  namn: 'Målare i Södertälje',
  typ: 'Målning',
  beskrivning: 'Invändig målning, fasadmålning, fasadtvätt, taktvätt och takmålning i Södertälje, där firman har sitt säte. Senast tak och väggar på 180 kvm i oktober 2026. ROT dras direkt på fakturan.',
  omrade: [{ '@type': 'City', name: 'Södertälje' }],
});

const ny = { target: '_blank', rel: 'noopener' };

const data = {
  namn: 'GD Måleri Sthlm AB',
  tema,
  logo,
  kontakt,
  cta,
  formular,
  bokning,
  nav: { ...navUndersida, extra: menyExtra() },

  hero: { ...hero, rubrik: { fraga: 'Målare i Södertälje', svar: 'Inne & ute.' } },
  tejp: ['Målare i Södertälje', 'Vårt säte', '180 kvm tak och väggar', 'Invändig målning', 'Fasad och tak', 'Rekommenderat företag på Reco', 'Faktura när jobbet är klart', 'ROT på fakturan'],

  tjanster: {
    eyebrow: 'Målare i Södertälje',
    rubrik: ['Hemma i Södertälje,', 'inne och ute'],
    lead: 'GD Måleri Sthlm AB har sitt säte i Södertälje. Härifrån tar vi jobb inomhus och utomhus i hela Stockholm, och senast målade vi tak och väggar på 180 kvm här i Södertälje.',
    lattKort: true,
    kolumner: 3,
    kort: [
      { id: 'invandigt', namn: 'Invändig målning', bild: `${M}/tjanst-invandig.jpg`, alt: 'Rum med mörkblått målat tak, ljusa väggar och vitt fönster', text: 'Väggar, innertak och snickerier i villan eller lägenheten, med spackling och förarbete gjort av oss.', punkter: ['Tak och väggar', 'Spackling och förarbete', 'ROT inne i bostaden'], lank: { href: '/gdmaleri/invandig-malning/', txt: 'Invändig målning' }, ritning: RITNING.vagg },
      { id: 'fasad', namn: 'Fasadmålning', bild: `${M}/tjanst-fasad.jpg`, alt: 'Nymålad laxrosa panelfasad med vitt burspråksfönster och svart stuprör', text: 'Trä, puts, tegel eller plåt. Fasaden tvättas, skrapas och lagas innan den målas.', punkter: ['Fasadtvätt för sig eller före målning', 'Vindskivor och takfot', 'Färg från Flügger'], lank: { href: '/gdmaleri/fasad/', txt: 'Fasadmålning' }, ritning: RITNING.fasad },
      { id: 'tak', namn: 'Taktvätt och takmålning', bild: `${M}/tjanst-tak.jpg`, alt: 'Grått betongpannetak efter taktvätt, med en vit villa och tallar i bakgrunden', text: 'Mossa och lav bort från yttertaket, med målning som tillval.', punkter: ['Taktvätt', 'Takmålning', 'ROT på småhus'], lank: { href: '/gdmaleri/tak/', txt: 'Taktvätt och takmålning' }, ritning: RITNING.taktvatt },
    ],
  },

  jobb: {
    eyebrow: 'Jobbet i Södertälje',
    rubrik: ['180 kvm tak och väggar', 'i Södertälje'],
    lead: 'Rummen nedan är från jobbet i Södertälje, som vi lade upp på Instagram i oktober 2026. Banden visar fler av våra jobb i Stockholm, med ort där vi kan visa den.',
    not: 'Bilder utan ort i bildtexten är från andra jobb än det i Södertälje. Fler bilder finns på vårt Instagram.',
    utvalda: [
      { src: `${M}/invandig-sodertalje-1.webp`, w: 960, h: 720, etikett: 'Södertälje, 180 kvm', txt: 'Tak och väggar, klart i oktober 2026.', alt: 'Nymålat rum med ljusa väggar, vit taklist och skrivbord vid fönstret i Södertälje', lank: { href: 'https://www.instagram.com/p/DeNI1zEkcpW/', txt: 'Se jobbet på Instagram' } },
      { src: `${M}/invandig-sodertalje-2.webp`, w: 960, h: 720, etikett: 'Södertälje, taket', txt: 'Nymålat vitt tak mot ljusgrå väggar.', alt: 'Nymålat vitt tak med taklampa och bred taklist mot ljusgrå väggar, en öppen dörr med glasrutor, i Södertälje' },
    ],
    tid: '70s',
    rad1: [BAND.sekelskifte, BAND.gulHall, BAND.blaTak, BAND.spackelTak, BAND.trappa, BAND.panelvagg],
    rad2: [BAND.brommaAltan, BAND.takFore, BAND.terrass, BAND.taby2, BAND.rodFonster, BAND.dorrGron],
  },

  varfor,
  om,
  steg,

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Så tycker kunderna', 'om jobben inomhus'],
    betyg: GOOGLE_BETYG,
    googleLista: [GOOGLE_OMDOMEN.viktor, GOOGLE_OMDOMEN.matteus, GOOGLE_OMDOMEN.daniel],
    recoIframe: RECO_IFRAME,
    lista: RECO_LISTA,
    not: 'Google-citaten ordagrant, hämtade 2026-10-09 (4,8 av 5, 19 recensioner). Reco-rutan visar Recos egna, senaste omdömen. Inget av omdömena säger i vilken ort jobbet gjordes.',
    lank: RECO,
  },

  instagram: { ...instagramBas, lead: 'Södertälje-jobbet först, sedan fler jobb från vårt konto.', koder: ['DeNI1zEkcpW', 'Dd-zVd3ggOI', 'Dc1IM7Pgpeh'] },

  fragor: {
    eyebrow: 'Frågor om målare i Södertälje',
    rubrik: ['Det folk i Södertälje', 'brukar fråga'],
    lead: 'Om firman, om jobbet här och om hur du får en offert.',
    kort: { rubrik: 'Bor du i Södertälje?', text: 'Ring och berätta vad som ska målas, inne eller ute, eller boka ett besök direkt.' },
    lista: [
      { q: 'Finns GD Måleri i Södertälje?', a: 'Ja. GD Måleri Sthlm AB, org.nr 559468-2444, har sitt säte i Södertälje. Härifrån tar vi uppdrag i Södertälje och i resten av Stockholm, inomhus och utomhus.' },
      { q: 'Vilket jobb har ni gjort i Södertälje?', a: 'Senast tak och väggar på 180 kvm, med snobbkant, som vi lade upp på Instagram i oktober 2026. Bilderna på rummen här på sidan är från det jobbet.' },
      { q: 'Var hittar jag omdömen om er som målare i Södertälje?', a: <>På Reco, i kategorin Målare i Södertälje. När vi tittade den 14 oktober 2026 stod GD Måleri Sthlm AB först i den listan, med 4,9 av 5 från 46 omdömen. Reco skriver inte hur listan sorteras, så läs gärna omdömena själv. Källa: <a href="https://www.reco.se/kategori/m%C3%A5lare/s%C3%B6dert%C3%A4lje/1" {...ny}>Reco, Målare i Södertälje</a></> },
      { q: 'Målar ni fasader och tak i Södertälje också?', a: <>Ja. Vi gör <a href="/gdmaleri/fasad/">fasadmålning</a> och <a href="/gdmaleri/fasadtvatt/">fasadtvätt</a> i trä, puts, tegel och plåt, och <a href="/gdmaleri/taktvatt/">taktvätt</a> och <a href="/gdmaleri/tak/">takmålning</a> på yttertak. Jobbet vi kan visa från Södertälje är invändigt; fasaderna vi kan visa är från Bromma och Täby kyrkby.</> },
      { q: 'Får jag ROT-avdrag för målning inomhus?', a: <>Ja, om du äger och bor i bostaden. I en villa gäller det både inne och ute; i en bostadsrätt gäller det arbete inne i lägenheten. Avdraget är 30 procent av arbetskostnaden, högst 50 000 kronor per person och år, och vi drar av det direkt på fakturan. Källa: <a href={SKV_ROT} {...ny}>Skatteverket, Ger arbetet rätt till rotavdrag?</a></> },
      { q: 'Hur bokar jag ett hembesök i Södertälje?', a: 'Boka en tid i kalendern längre ner, eller ring 073-729 88 89. Vi kommer hem till dig alla dagar mellan 08 och 17, tittar på det som ska målas och lämnar sedan en offert. Besöket kostar ingenting.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Begär en offert', 'i Södertälje'],
    lead: 'Ring, eller skriv några rader om vad som ska göras. Offerten kostar ingenting, och material, förarbete, städning och bortforsling ingår.',
    checkar: ['Svar inom 24 timmar', 'Kostnadsfri offert, allt inräknat', 'ROT dras direkt på fakturan'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta kort om jobbet',
    placeholder: 'Inne eller ute, vilka rum eller vilken fasad, ungefärlig yta och var i Södertälje',
    typer: SIDOR.map((l) => l.txt),
    kundtyp,
    formNot,
    epostNamn,
    formNotBock: true,
  },

  popup: {
    rubrik: 'Målare i Södertälje?',
    text: 'Berätta vad som ska målas, inne eller ute, så får du en offert som inte kostar något.',
  },

  footer: {
    text: 'Målare i Södertälje, där vi har vårt säte: invändig målning, fasad och tak. Senast 180 kvm tak och väggar. Kostnadsfri offert och slutbesiktning innan fakturan.',
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

export default function GdMaleriSodertalje() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <DemoSida data={data} />
    </>
  );
}
