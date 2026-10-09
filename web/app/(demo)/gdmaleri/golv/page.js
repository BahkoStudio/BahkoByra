import DemoSida from '../../_mall/DemoSida';
import { M, tema, logo, kontakt, cta, formular, bokning, kundtyp, formNot, epostNamn, footerTjanster, footerBild, menyExtra, navUndersida, hero, varfor, om, steg, instagramBas, RECO, SKV_ROT, samarbeten, tjanstSchema } from '../_gd';

/* ===========================================================================
   GD MÅLERI STHLM AB — tjänstesida GOLV (/gdmaleri/golv/), 2026-10-08.
   Samma mall, tema, logotyp, filmer och kontakt som huvudsidan (gemensamt i ../_gd.js).
   Struktur efter förebilden marlonshantverksgrupp.se (en sida per tjänst), ingen text kopierad.

   VERIFIERAT (2026-10-08), utöver huvudsidans VERIFIERAT-block:
   NY TJÄNST: golvläggning, golvslipning och golvmålning. Källa: Mathias på
   Ghandis vägnar 2026-10-08. Bolagsverkets verksamhetsbeskrivning (allabolag.se):
   "Bolaget skall utföra måleritjänster, golvläggning …". GD:s eget svar på Reco
   (till Marita O, 2024-10-20): "… när ni känner att de är dags för en till runda
   med målningprojekt eller golvläggning".
   Golvslipning är redan gjord åt kunder, två femmor från verifierade kunder på
   Reco, ordagrant: Susanne P 2025-11-14 ("En noggrann offert för både slipning
   av golv och målning av alla väggar/tak i villa i två plan …", "GD Måleri Sthlm
   AB hanterade helheten, allt från golvslipning, materialinköp och målning",
   kortat med …) och Anneli N 2025-10-16 ("måla vår lägenhet på 80 kvm plus
   slipning av vardagsrumsgolv").
   Skatteverket (gerarbetetratttillrotavdrag, hämtat 2026-10-08): "slipa och
   byta golv" och "måla golv" ger rotavdrag; avdraget gäller bara arbetskostnaden.

   INTE verifierat, och finns därför inte på sidan: golvtyper och material
   (parkett, laminat, plastmatta, klinker …), metoder, lack/olja/såpa, priser,
   ledtider, garanti på golvarbete (ett års garanti gäller måleriarbetet och
   nämns bara i Varför-sektionen som på huvudsidan), antal golvjobb.

   FLAGGOR: INGA EGNA GOLVBILDER. Tjänstekortens tre bilder är GENERERADE
   illustrationer (Higgsfield API, Qwen Image 3, 2k, 4:3, 2026-10-08, 0,075 USD
   styck): golv-lagt.jpg (nylagt ljust ekgolv), golv-slipat.jpg (trägolv halvvägs
   slipat med golvslip), golv-malat.jpg (ljusgrått målat trägolv). Alt-texterna
   börjar med "Illustrationsbild" och jobb.not säger det. Ghandi bör skicka riktiga
   golvbilder (se content/leads/gdmaleri.md). Banden är egna målningsfoton.
   Omdömena här är fasta (inte levande), så att de handlar om golv.

   OPTIMERING: egen titel och beskrivning, JSON-LD Service som pekar på samma
   HousePainter-entitet (@id gdmaleri.se/#business), inget betygsschema, noindex
   som huvudsidan tills flytten till gdmaleri.se.
   =========================================================================== */

export const metadata = {
  title: 'Golvläggning och golvslipning i Stockholm | GD Måleri Sthlm AB',
  description:
    'GD Måleri Sthlm AB lägger, slipar och målar golv i Stockholm, gärna i samma jobb som väggar och tak. Kostnadsfri offert, ROT direkt på fakturan och 4,9 av 5 på Reco.',
  robots: { index: false, follow: false },
};

const schema = tjanstSchema({
  namn: 'Golvläggning, golvslipning och golvmålning i Stockholm',
  typ: 'Golvläggning och golvslipning',
  beskrivning: 'Golvläggning, golvslipning och golvmålning i Stockholm, gärna i samma offert som målning av väggar och tak. ROT dras direkt på fakturan.',
});

const data = {
  namn: 'GD Måleri Sthlm AB',
  tema,
  logo,
  kontakt,
  cta,
  formular,
  bokning,
  nav: { ...navUndersida, extra: menyExtra('/gdmaleri/golv/') },

  hero: { ...hero, ort: 'Golv i Stockholm', tjanster: ['Läggning', 'Slipning'] },
  tejp: ['Golvläggning', 'Golvslipning', 'Golvmålning', 'Golv och väggar i samma jobb', '4,9 av 5 på Reco', 'Rekommenderat tre år i rad', 'ROT direkt på fakturan', 'Kostnadsfri offert'],

  tjanster: {
    eyebrow: 'Golv',
    rubrik: ['Golvet och väggarna', 'i samma offert'],
    lead: 'Vi lägger, slipar och målar golv. Golvslipning har vi redan gjort åt kunder, ihop med målningen av rummen.',
    lattKort: true,
    kolumner: 3,
    kort: [
      { id: 'golvlaggning', namn: 'Golvläggning', bild: `${M}/golv-lagt.jpg`, alt: 'Illustrationsbild: nylagt ljust trägolv i ett tomt rum med vita socklar och ett högt fönster', text: 'Nytt golv, i ett rum eller i hela bostaden.', punkter: ['Kostnadsfri offert', 'Material och städning ingår', 'ROT på arbetet'], ritning: (<><path d="M14 100h172" /><path d="M40 100l22-62h76l22 62" /><path d="M74 100l8-62M126 100l-8-62M100 100V38" /></>) },
      { id: 'golvslipning', namn: 'Golvslipning', bild: `${M}/golv-slipat.jpg`, alt: 'Illustrationsbild: trägolv halvvägs slipat, ljust där golvslipen har gått och mörkt och slitet bredvid', text: 'Slitna trägolv slipas, gärna i samma jobb som rummet målas.', punkter: ['Slipning av trägolv', 'Samma offert som målningen', 'ROT på arbetet'], ritning: (<><path d="M14 100h172" /><path d="M58 98V70h52v28" /><path d="M110 76l34-34" /><path d="M140 38l12 12" /><path d="M66 98a8 8 0 0016 0M90 98a8 8 0 0016 0" /></>) },
      { id: 'golvmalning', namn: 'Golvmålning', bild: `${M}/golv-malat.jpg`, alt: 'Illustrationsbild: trägolv målat ljusgrått i ett tomt rum, med en färgburk på en skyddsduk', text: 'Golvet målas i den kulör du väljer.', punkter: ['Förarbete ingår', 'Inget extra utan ditt ja', 'ROT på arbetet'], ritning: (<><path d="M14 100h172" /><path d="M30 100l18-40h104l18 40" /><path d="M120 30h44v18h-44z" /><path d="M142 48v22" /></>) },
    ],
  },

  jobb: {
    eyebrow: 'Våra jobb',
    rubrik: ['Rum vi har', 'gjort klara'],
    lead: 'Väggar, tak och snickerier inne, och fasader ute. Bilderna i banden är från våra egna projekt.',
    not: 'Golvbilderna under Tjänster är illustrationsbilder. Fler egna jobb finns på vårt Instagram.',
    tid: '70s',
    rad1: [
      { src: `${M}/jobb-sekelskifte.jpg`, alt: 'Ljust rum med två höga spröjsade fönster och radiatorer', txt: 'Rum målat i ljust' },
      { src: `${M}/jobb-vardagsrum.jpg`, alt: 'Tomt vardagsrum med ljusrosa väggar och tre fönster', txt: 'Vardagsrum målat ljusrosa' },
      { src: `${M}/jobb-gul-hall.jpg`, alt: 'Hall i varmgul kulör med vita snickerier och balkongdörr', txt: 'Hall målad i gult' },
      { src: `${M}/jobb-bredspackling.jpg`, alt: 'Vägg under bredspackling, golvet täckt med papper', txt: 'Vägg bredspacklas före målning' },
      { src: `${M}/jobb-panelvagg.jpg`, alt: 'Vitmålad bröstpanel under en ljusgrön vägg', txt: 'Bröstpanel målad vit' },
      { src: `${M}/jobb-bla-tak.jpg`, alt: 'Ljusblått målat tak med spotlightskena och bokhylla', txt: 'Tak målat ljusblått' },
      { src: `${M}/tjanst-snickerier.jpg`, alt: 'Spegeldörr målad i mörkgrönt i en ljus lägenhet', txt: 'Dörr målad mörkgrön' },
    ],
    rad2: [
      { src: `${M}/jobb-trapphus.jpg`, alt: 'Trappa i ett hem med mörkrosa nederdel och ljus vägg ovanför', txt: 'Trappa målad i två kulörer' },
      { src: `${M}/jobb-spackel-tak.jpg`, alt: 'Målare i vit t-shirt spacklar ett innertak', txt: 'Innertak spacklas' },
      { src: `${M}/tjanst-tapet.jpg`, alt: 'Nyuppsatt mönstrad tapet runt en dörr', txt: 'Mönstrad tapet uppsatt' },
      { src: `${M}/tjanst-invandig.jpg`, alt: 'Rum med mörkblått målat tak, ljusa väggar och vitt fönster', txt: 'Tak målat mörkblått' },
      { src: `${M}/tjanst-fasad.jpg`, alt: 'Nymålad laxrosa panelfasad med vitt burspråksfönster och svart stuprör', txt: 'Panelfasad målad' },
      { src: `${M}/jobb-rod-fonster.jpg`, alt: 'Vitmålat spröjsat fönster i en röd träfasad', txt: 'Fönster målade vita' },
      { src: `${M}/jobb-terrass.jpg`, alt: 'Nymålad laxrosa fasad och vit dörr vid en trädäcksaltan', txt: 'Fasad och dörr målade' },
    ],
  },

  varfor,
  om,
  steg: { ...steg, lista: steg.lista.map((s) => (s.ikon === 'arbete' ? { ...s, text: 'Möbler och ytor runt omkring skyddas. Du hålls uppdaterad, och inget extra görs utan ditt ja.' } : s)) },

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Kunderna om', 'golven'],
    lista: [
      { namn: 'Susanne P', kalla: 'Verifierad kund · Reco', text: 'En noggrann offert för både slipning av golv och målning av alla väggar/tak i villa i två plan följdes upp med perfekt leverans! Både golvslipningen och målningen startades enligt plan och varje del levererades enligt plan vilket var viktigt för oss då vi hela tiden flyttade efter med alla möbler. … GD Måleri Sthlm AB hanterade helheten, allt från golvslipning, materialinköp och målning. … Vi kommer att använda GD Måleri Sthlm AB igen!' },
      { namn: 'Anneli N', kalla: 'Verifierad kund · Reco', text: 'Anlitade GD Måleri och fick ett otroligt bra bemötande från start till avslut- Uppdraget var att måla vår lägenhet på 80 kvm plus slipning av vardagsrumsgolv. Vi är otroligt nöjda med resultatet som blev fantastisk ,och skulle definitivt rekommendera dem till alla som behöver måleriarbete. Tack för ett strålande jobb!' },
    ],
    not: 'Från Reco.se, där kundrelationen kontrolleras. Ordagrant, ett av dem kortat där det står …',
    lank: RECO,
  },

  instagram: { ...instagramBas, koder: ['DeNI1zEkcpW', 'DcmMHrIEbrF', 'Dd-zVd3ggOI'] },

  fragor: {
    eyebrow: 'Vanliga frågor om golv',
    rubrik: ['Det ni brukar', 'fråga om golvet'],
    lead: 'Pengar och risk först, det praktiska sedan.',
    kort: { rubrik: 'Hittar du inte svaret?', text: 'Ring och berätta om golvet, så svarar vi på just ditt.' },
    lista: [
      { q: 'Vad kostar det?', a: 'Det beror på ytan, golvet och vad som ska göras. Därför börjar vi med en offert, och den är kostnadsfri. Offerten tar med material, arbete, städning och bortforsling.' },
      { q: 'Får jag ROT-avdrag för golvet?', a: <>Ja, på arbetskostnaden. Skatteverket räknar att slipa, byta och måla golv som rotarbete, och vi drar av det direkt på fakturan. Materialet ger inget avdrag. Källa: <a href={SKV_ROT} target="_blank" rel="noopener">Skatteverket, Ger arbetet rätt till rotavdrag?</a></> },
      { q: 'Kan ni slipa golvet och måla rummet i samma jobb?', a: 'Ja, och det har vi gjort förut: en villa i två plan där golvet slipades och alla väggar och tak målades, och en lägenhet på 80 kvm där vardagsrumsgolvet slipades. Då blir det en offert för allt.' },
      { q: 'Vilka golv lägger ni?', a: 'Berätta vad du har i dag och vad du vill ha, och skicka gärna en bild på sms eller mejl. Då får du en offert på just ditt golv.' },
      { q: 'När betalar jag?', a: 'Du får fakturan när arbetet är klart, ingen förskottsbetalning.' },
      { q: 'Vad händer om något oväntat dyker upp?', a: 'Då hör vi av oss direkt och föreslår en lösning. Vi gör inga extraarbeten utan ditt godkännande.' },
      { q: 'Är ni försäkrade?', a: 'Ja. Vi har F-skatt och är fullt försäkrade via Trygg-Hansa.' },
      { q: 'Var arbetar ni?', a: 'I hela Stockholm.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Begär en offert', 'på golvet'],
    lead: 'Ring, eller skriv några rader om golvet. Du får en kostnadsfri offert där allt ingår.',
    checkar: ['Svar inom 24 timmar', 'Kostnadsfri offert, allt inräknat', 'ROT dras direkt på fakturan'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta kort om golvet',
    placeholder: 'Lägga nytt, slipa eller måla, ungefärlig yta, och var i Stockholm',
    kundtyp,
    formNot,
    epostNamn,
    formNotBock: true,
  },

  popup: {
    rubrik: 'Nytt golv eller slipat?',
    text: 'Berätta om golvet så får du en offert som inte kostar något. ROT dras direkt på fakturan.',
  },

  footer: {
    text: 'Golvläggning, golvslipning och golvmålning i Stockholm, gärna i samma jobb som väggar och tak. Kostnadsfri offert och slutbesiktning innan fakturan.',
    tjanster: footerTjanster,
    bild: footerBild, // Stockholms siluett i skymning, se _gd.js
  },

  // KUND, inte förslag (Mathias 2026-10-09): ingen demo-knapp, ingen Bahko-modal, ingen byråtext i footern.
  kund: true,
  samarbeten,
};

export default function GdMaleriGolv() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <DemoSida data={data} />
    </>
  );
}
