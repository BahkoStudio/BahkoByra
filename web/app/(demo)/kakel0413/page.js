import DemoSida from '../_mall/DemoSida';
import BildUpload from './BildUpload';
import KontaktFalt from './KontaktFalt';
import Galleri from './Galleri';
import Referenser from './Referenser';
import { jobb } from './jobb';
import Matning from './Matning';

/* ===========================================================================
   KAKEL 0413 AB — hemsida för en betalande kund (12 000 kr-paketet), Bahko Byrå
   Kund: Nuh, kakelsättning och badrumsrenovering. Bolaget startas nu:
   org.nr är inte utfärdat ännu. Byggd 2026-10-22 på demomallen v3
   (kvalitetsnivå efter velebitmaleri).

   Bärande idé: trygghet. Ett badrum är ett stort beslut, och bakom firman står
   en hantverkare med 16+ år i branschen som håller det han lovar.

   VERIFIERAT (2026-10-22, kundens egen text via Mathias):
   - Firmanamn och logotyp: "KAKEL 0413 AB" (logofilen från kunden).
   - E-post: Nuh@kakel0413.se och Info@kakel0413.se.
   - Telefon 073-875 27 25. Utgår från Eslöv, arbetar i hela Skåne (Mathias 2026-10-22). Orterna Nuh nämner
     (2026-11-11): Malmö, Lund, Eslöv, Höör, Hörby, Landskrona, Svalöv, Helsingborg, Trelleborg, Kristianstad.
     Bolaget registrerat: org.nr 559611-8546 (allabolag, 2026-11-11). Öppettider 08–16 alla dagar.
   - Introtexten (heron + Om Nuh) och "Så går det till" (intro + sex steg)
     är kundens ordagranna text, bara lätta stavfel rättade
     ("Han arbetat" → "Han har arbetat", "byggöretag" → "byggföretag").
   - Intro efter heron (Nuh SMS 2026-11-09, Mathias vidarebefordrade): kakel och klinker
     för privatpersoner och företag, samt namnen Skanska, NCC, MVB, Peab och Tornstaden
     (hans stavning). Portas in före #tjanster via Referenser.js. Inga logotyper.
   - Siffrorna: över 16 års erfarenhet (rättat i revision 3, Mathias 2026-10-25),
     upp till sju stora projekt samtidigt, totalt cirka 800 nya toaletter, har arbetat
     med Skanska, NCC, Peab, MVB och Tornstaden.
   - Tjänster i dag: badrumsrenovering, kakel- och klinkersättning (badrum,
     kök, hallar, trapphus, tvättstuga) och mindre arbeten. Fler tjänster kan tillkomma:
     lägg bara till ett kort i tjanster.kort (och ett ord i tejp).

   INTE verifierat, och finns därför inte på sidan: gatuadress,
   hemsida, Instagram, org.nr, F-skatt, garantier, priser,
   ledtider, omdömen, projektbilder.

   FLAGGOR (för Mathias):
   - LOGOTYP (ny 2026-11-11): K i silverram med marmor och orange linje, frilagd ur Nuhs bild.
     logo-ljus.webp över filmen, logo.webp (mörka toner) på vit header och footer. Kundens bild
     ligger som logo-original.jpg (bara i dolda jobbanden). Varför-filmen slutar på den nya loggan.
   - HERO-COPY: rubrik + underrad ligger i hero.tjanster[1] som JSX (mallen har
     ingen plats för det utan att röra 🔒 DemoSida). Föreslå ett valfritt
     hero.slogan-fält i mallen om Mathias vill ha det permanent.
   - JOBBANDEN OCH OMDÖMEN är dolda (stilblocket nedan), eftersom mallen
     kräver båda och kunden inte har jobbfoton eller omdömen ännu. Inget
     påhittat galleri, inga exempelomdömen. Ta bort döljningen och fyll i
     data.jobb / data.omdomen när riktiga bilder och omdömen finns.
   - HERO-FILMEN, VARFÖR-FILMEN OCH ALLA TJÄNSTEBILDER ÄR GENERERADE
     (Higgsfield: Qwen Image 3 för stillbilderna, Wan 3.0 Prime bild-till-film
     1080p utan ljud för de tre klippen). Illustrationer, INTE Nuhs egna jobb.
     Tjänstekortens bilder märks i tjanster.lead-noten nedan. Undantag: tvättstugebilden
     (revision 3) är genererad med GPT Image via Higgsfield, samma stil som de andra.
   - Formuläret går till info@kakel0413.se (Nuhs Web3Forms-nyckel, PRO, KUND_NYCKEL nedan),
     både på kakel0413.se och bahkobyra.se/kakel0413. Bilder följer med som bilagor (BildUpload.js).
   - REVISION 3 (Mathias 2026-10-25): nytt kort Tvättstuga, nya punkter i Kök och Hallar,
     Därför oss med två punkter och utan ingress, 16 års erfarenhet överallt, MVB och Tornstaden tillagda.
     Mobilmenyn: mallen lägger alltid till "Vanliga frågor" (fragor.eyebrow), så nav-länken
     "Frågor" döljs bara i mobilmenyn (stilblocket nedan); desktop-pillret har den kvar.
     Formuläret: "Kontaktar som" (kontaktar_som) och "Stadsdel/Kommun" (kommun) monteras
     före namnfälten av KontaktFalt.js, på samma sätt som BildUpload.js.
   - RÄTTNING (Mathias 2026-11-10, kundens skärmdumpar): Badrumsrenovering säger nu
     "Kakel på vägg och klinker på golv". Om oss (Om Nuh på startsidan och /om-oss/) borttagen helt,
     /om-oss/ går med 308 till startsidan och är struken ur kakel0413.se:s sitemap. Logga överallt: logo.webp / logo-ljus.webp.
   - BKR (pausad 2026-11-23, Nuh SMS via Mathias): sektionen #om med BKR-behörigheten är dold
     tills Nuh fått BKR-diplom. Texten ligger kvar i OM_BKR. Sätt VISA_BKR till true för att visa den igen.
   =========================================================================== */

const META = {
  // Lokal SEO-SOP steg 4.1 (2026-11-17): huvudkategorin och orten först, firmanamnet sist. Inget tankstreck.
  // Kortad 2026-11-17 (Mathias): under 60 tecken så att Google inte kapar den.
  // 2026-11-18 (Mathias: "kakelarbete Eslöv och eller kakel Eslöv"): "kakel i Eslöv" in i titeln, kakelarbete i
  // beskrivningen. Undersidan /kakelarbete-eslov/ (./kund/kakelarbete-eslov/) tar den exakta frasen kakelarbete i Eslöv.
  title: 'Kakelsättare och kakel i Eslöv och Skåne | Kakel 0413 AB',
  description:
    'Kakel och kakelarbete i Eslöv och hela Skåne: badrum, kök, hallar, trapphus och tvättstugor. Kostnadsfri genomgång, tydlig offert och ROT-avdrag.',
};

const OG_BILD = {
  url: '/kakel0413/media/og.jpg',
  width: 1200,
  height: 630,
  alt: 'Illustration: färdigt badrum i ljus marmor med duschvägg i glas och mässingsdetaljer',
};

const OPEN_GRAPH = {
  title: META.title,
  description: META.description,
  siteName: 'Kakel 0413 AB',
  locale: 'sv_SE',
  type: 'website',
  images: [OG_BILD],
};

const ICONS = {
  icon: [
    { url: '/kakel0413/media/icon.png', type: 'image/png' },
    { url: '/kakel0413/media/favicon.ico' },
  ],
  apple: '/kakel0413/media/apple-touch-icon.png',
};

const TWITTER = { card: 'summary_large_image', title: META.title, description: META.description, images: [OG_BILD.url] };

/* Metadatan är statisk (SEO 2026-11-17). Förut läste generateMetadata request headers (kunddoman.js),
   och då strömmar Next 15.5 metadatan in i <body> i stället för <head>: Google ser då ingen canonical.
   Nu finns två statiska sidor med samma innehåll (demorutan är borta på båda, kund: true):
   - bahkobyra.se/kakel0413/ (den här filen): noindex, ingen canonical, ingen Search Console-tagg.
   - kakel0413.se/ serveras från ./kund/page.js (middleware skriver om / dit): index, canonical
     https://kakel0413.se/, Search Console-taggen och GA4 med samtycke. */
export const metadata = { ...META, robots: { index: false, follow: false }, icons: ICONS, openGraph: OPEN_GRAPH, twitter: TWITTER };

export const KUND_METADATA = {
  ...META,
  metadataBase: new URL('https://kakel0413.se'),
  alternates: { canonical: 'https://kakel0413.se/' },
  robots: { index: true, follow: true },
  verification: { google: 'mYz-GokIfzG1cH0TA1qeZ1UZWDLiIr1dAYkZ7HZOnc4' },
  icons: ICONS,
  openGraph: { ...OPEN_GRAPH, url: 'https://kakel0413.se/' },
  twitter: TWITTER,
};

const M = '/kakel0413/media';

// Pausad 2026-11-23 tills Nuh fått BKR-diplom (Nuh SMS, Mathias: lägg BKR-texten på paus tills vidare).
// Sätt VISA_BKR till true för att visa sektionen #om igen. Mallen kräver fältet om, därför finns OM_DOLJD.
const VISA_BKR = false;

const OM_BKR = {
  eyebrow: 'Behörighet',
  rubrik: ['Vi är ett', 'BKR‑behörigt företag'], // ‑ = hårt bindestreck, så BKR- inte hamnar ensamt på mobil
  kortRad: 'Behörigt enligt Byggkeramikrådet',
  stycken: [
    'Vi på Kakel 0413 är stolta över att vara ett behörigt företag enligt Byggkeramikrådet (BKR).',
    'Det innebär att vi har rätt utbildning och kompetens för att utföra våtrumsarbeten enligt branschreglerna BBV, Byggkeramikrådets Branschregler för Våtrum.',
    'För dig som kund innebär det en extra trygghet när du anlitar oss för badrumsrenovering och plattsättning. Vi arbetar fackmässigt med fokus på kvalitet och säkerhet.',
  ],
  bevis: [],
};

const OM_DOLJD = {
  eyebrow: '',
  rubrik: [''],
  kortRad: '',
  stycken: [],
  bevis: [],
};


// Företagsschema (lokal SEO-SOP, easy-win-checken punkt 4, 2026-11-17). Bara uppgifter som redan står på sidan.
// Ingen gatuadress: Nuh har ingen butik och adressen är dold i Google-profilen. Inget betyg, inga omdömen.
const FORETAG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  '@id': 'https://kakel0413.se/#business',
  name: 'Kakel 0413 AB',
  legalName: 'Kakel 0413 AB',
  url: 'https://kakel0413.se/',
  image: `https://kakel0413.se${M}/poster-hero.jpg`,
  telephone: '+46738752725',
  email: 'info@kakel0413.se',
  taxID: '559611-8546',
  description: 'Kakel och klinker åt privatpersoner och företag i Eslöv och hela Skåne: kakelarbete och badrumsrenovering, kakel i kök, hallar, trapphus och tvättstugor, och mindre arbeten.',
  knowsAbout: ['Kakel', 'Klinker', 'Kakelsättning', 'Kakelarbete', 'Badrumsrenovering'],
  address: { '@type': 'PostalAddress', addressLocality: 'Eslöv', addressRegion: 'Skåne län', addressCountry: 'SE' },
  areaServed: ['Eslöv', 'Malmö', 'Lund', 'Helsingborg', 'Landskrona', 'Höör', 'Hörby', 'Svalöv', 'Trelleborg', 'Kristianstad'].map((name) => ({ '@type': 'City', name })),
};

// Web3Forms-nyckel för info@kakel0413.se (Nuhs, verifierad, Mathias 2026-10-23). Gäller både kakel0413.se och bahkobyra.se/kakel0413.
// PRO: filbilagor på (BILAGOR_PA = true i BildUpload.js). Tom = demonyckeln
// (mathias@bahkobyra.se). Nyckeln är publik av design (se app/formular.js).
const KUND_NYCKEL = '3f13101e-b99a-4276-87cb-c8645caf27a9';

// Lägg till fler tjänster här när Nuh breddar utbudet: ett kort per tjänst (bild 4:3).
const tjanster = [
  {
    id: 'badrum',
    namn: 'Badrumsrenovering',
    bild: `${M}/tjanst-badrum.jpg`,
    alt: 'Illustration: ljust kaklat badrum med duschvägg i glas och mässingsblandare',
    text: 'En hel badrumsrenovering, från genomgång och offert till färdigt badrum.',
    punkter: ['Hela badrummet', 'Kakel på vägg och klinker på golv', 'Genomgång när det är klart'],
    ritning: (<><path d="M30 70h140v15a25 25 0 01-25 25H55a25 25 0 01-25-25z" /><path d="M45 70V30a12 12 0 0124 0" /><path d="M60 110l-6 8M140 110l6 8" /></>),
  },
  {
    id: 'kok',
    namn: 'Kakel i kök',
    bild: `${M}/tjanst-kok.jpg`,
    alt: 'Illustration: vitt kakel i fiskbensmönster bakom en blandare i mässing',
    text: 'Kakel- och klinkerarbeten i kök, till exempel kakel ovanför bänkskivan.',
    punkter: ['Kakel och klinker', 'Noggrant och rent'],
    ritning: (<><path d="M30 25h140v50H30z" /><path d="M65 25v50M100 25v50M135 25v50M30 50h140" /><path d="M20 85h160v10H20z" /></>),
  },
  {
    id: 'hall',
    namn: 'Hallar och trapphus',
    bild: `${M}/tjanst-trapp.jpg`,
    alt: 'Illustration: ljus hall med klinkergolv och trappa',
    text: 'Kakel och klinker i hallar och trapphus.',
    punkter: ['Hallar', 'Trapphus', 'Golv'],
    ritning: (<><path d="M20 105h40V85h30V65h30V45h30V25h30" /><path d="M20 105h160" /></>),
  },
  {
    id: 'tvatt',
    namn: 'Tvättstuga',
    bild: `${M}/tjanst-tvatt.jpg`,
    alt: 'Illustration: ljus tvättstuga med marmorkakel, tvättmaskin och torktumlare under en bänkskiva i ek och blandare i mässing',
    text: 'Kakel och klinker i tvättstugan, på vägg och golv.',
    punkter: ['Kakel på vägg', 'Klinker på golv'],
    // Tvättmaskin: skåp, lucka och reglage.
    ritning: (<><path d="M65 12h70v100H65z" /><path d="M65 32h70" /><circle cx="100" cy="72" r="24" /><circle cx="100" cy="72" r="14" /><path d="M75 22h14M120 22h4" /></>),
  },
  {
    id: 'mindre',
    namn: 'Mindre arbeten',
    bild: `${M}/tjanst-mindre.jpg`,
    alt: 'Illustration: nykaklad duschnisch med guldlist och verktyg på en duk',
    text: 'Inget jobb är för litet.',
    punkter: ['Mindre kakelarbeten'],
    ritning: (<><path d="M50 30h45v45H50zM105 30h45v45h-45zM50 85h45v20M105 85h45v20" /></>),
  },
];

const data = {
  namn: 'Kakel 0413 AB',
  // Ny logga (Nuh via Mathias 2026-11-11, K i silverram, orange linje), frilagd ur kundens bild på skiffervägg.
  // logo-ljus.webp = originalets vita och grå toner, över filmen högst upp. logo.webp = samma logga med de
  // neutrala tonerna mörka, för vit header efter skroll och vit footer. Den gamla guldloggan är borttagen.
  logo: { src: `${M}/logo.webp`, ljus: `${M}/logo-ljus.webp`, topp: 'fri', w: 1000, h: 265, alt: 'Kakel 0413 AB' },
  // Färgerna följer nya loggan (Nuh 2026-11-11): loggans orange linje som accent, skiffergrått i
  // stället för varmt svart. Mörk text på orange knapp 6,3:1, orange text på vitt 5,3:1 (accentText).
  tema: {
    mork: '#151719',
    accent: '#F86E09',
    accentHover: '#DB5E05',
    accentText: '#B54A00',
    accentLjus: '#FF8A3D',
    paAccent: '#141414',
  },
  ...(KUND_NYCKEL ? { formular: { nyckel: KUND_NYCKEL, amne: 'Ny förfrågan från kakel0413.se', fran: 'Kakel 0413 AB' } } : {}),
  kontakt: {
    tel: '073-875 27 25',
    telHref: 'tel:+46738752725',
    epost: 'info@kakel0413.se',
    adress: 'Eslöv · hela Skåne',
  },
  cta: { txt: 'Skicka förfrågan', kort: 'Skicka förfrågan', lank: 'Skicka förfrågan' },
  nav: {
    vanster: [{ href: '#tjanster', txt: 'Tjänster' }, { href: '#process', txt: 'Så går det till' }],
    hoger: [{ href: '#varfor', txt: 'Därför oss' }, { href: '#fragor', txt: 'Frågor' }],
  },

  hero: {
    h1: ['Kakel', { txt: '0413', liten: true }],
    // Nuhs budskap i heron (Mathias 2026-10-22), samma stil som förut.
    // SEO 2026-11-17 (Mathias ja): text-H1 med tjänst och ort. Mallens valfria hero.rubrik gör h1 till text
    // och logotypen till <p>, som inte visas (Nuh v2: ingen stor logotyp i heron; headerns logga kvar, se stilblocket).
    // Frågan är H1, Nuhs mening ligger i hero.ingress. hero.tjanster används inte när rubrik finns.
    rubrik: {
      fraga: 'Kakelsättare i Eslöv och Skåne',
    },
    // Nuhs mening ordagrant, under h1 i stället för i den (SEO-auditen 2026-11-23). Samma utseende.
    ingress: 'Att renovera ett badrum är ett stort beslut. Därför är det viktigt att du känner dig trygg med den som utför arbetet.',
    tjanster: ['', ''],
    video: `${M}/video-hero.mp4`,
    videoMobil: `${M}/video-hero-mobil.mp4`,
    poster: `${M}/poster-hero.jpg`,
    posterMobil: `${M}/poster-hero-mobil.jpg`,
  },
  tejp: ['Badrumsrenovering', 'Golv', 'Kök', 'Trapphus', 'Tvättstuga', 'ROT-avdrag', 'Eslöv', 'Skåne'],

  tjanster: {
    eyebrow: 'Tjänster',
    // 2026-11-18: orten i H2 och ingress (kakel Eslöv). Länken till undersidan läggs bara på kakel0413.se (Kakel0413Sida nedan).
    rubrik: ['Kakel och klinker i Eslöv,', 'från golv till tak'],
    lead: 'Kakelarbete i Eslöv och hela Skåne: hela badrumsrenoveringar, kakelsättning och mindre arbeten. Bilderna är illustrationer.',
    kort: tjanster,
  },

  // Dold (se FLAGGOR): mallen kräver fältet. Fylls med Nuhs egna jobbfoton senare.
  // Banden kan inte vara tomma (mallens fyllUt loopar då för evigt): en dold post med logofilen var.
  jobb: {
    eyebrow: '', rubrik: [''], lead: '', not: '', tid: '60s',
    rad1: [{ src: `${M}/logo-original.jpg`, alt: '', txt: '' }],
    rad2: [{ src: `${M}/logo-original.jpg`, alt: '', txt: '' }],
  },

  // Därför oss (Mathias 2026-11-03, kundens text ordagrant, ersätter revision 3): rubrik + tre stycken
  // i ingressen, fyra bockar, och slutmeningen som sista punkt utan bock/ruta (stilblocket nedan).
  varfor: {
    eyebrow: 'Därför oss',
    rubrik: ['Har du ett projekt på gång?', 'Vi hjälper dig gärna!'],
    lead: (
      <>
        <span style={{ display: 'block' }}>Oavsett om du är privatperson, byggföretag eller entreprenör är du välkommen att kontakta oss.</span>
        <span style={{ display: 'block', marginTop: '0.8em' }}>Berätta kort om ditt projekt eller skicka ritningar och bilder, så tittar vi på hur vi kan hjälpa dig.</span>
        <span style={{ display: 'block', marginTop: '0.8em' }}>Vi utgår från Eslöv och arbetar i hela Skåne. Vi tar oss an både mindre uppdrag och större entreprenadprojekt inom kakel och klinker.</span>
      </>
    ),
    punkter: [
      { rubrik: 'Kostnadsfri offert', text: '' },
      { rubrik: 'Tydliga offerter och överenskommelser', text: '' },
      { rubrik: 'ROT-avdrag för privatpersoner enligt gällande regler', text: '' },
      { rubrik: 'Badrum, kök, hallar, trapphus och större entreprenader', text: '' },
      { rubrik: '', text: 'Vi värdesätter kvalitet, pålitlighet och goda samarbeten – från första kontakt till färdigt arbete.' },
    ],
    video: `${M}/video-varfor.mp4`,
    poster: `${M}/poster-varfor.jpg`,
    videoAlt: 'Illustration: ett färdigt badrum i vit marmor och borstad guld, som slutar med Kakel 0413:s logotyp på en mörk kakelvägg',
  },

  // Om oss borttagen 2026-11-10. Sektionen #om används sedan 2026-11-19 för BKR-behörigheten:
  // Nuhs egen text ordagrant, bara tankstrecket efter BBV utbytt mot komma.
  // Pausad 2026-11-23 tills Nuh fått BKR-diplom (se VISA_BKR).
  om: VISA_BKR ? OM_BKR : OM_DOLJD,

  steg: {
    eyebrow: 'Så går det till',
    rubrik: ['Från första kontakt', 'tills arbetet är klart'],
    lead: 'Vi vill att det ska kännas enkelt och tryggt att anlita oss. Därför får du veta vad som händer från första kontakt tills arbetet är klart.',
    lista: [
      { namn: 'Kontakt', ikon: 'kontakt', text: 'Du kontaktar oss och berättar kort vad du vill ha hjälp med. Det kan vara en badrumsrenovering, nytt kakel eller ett mindre arbete. Du kan gärna skicka bilder så att vi får en bättre bild av jobbet.' },
      { namn: 'Kostnadsfri genomgång', ikon: 'besok', text: 'Vi går igenom vad du vill göra och tittar på vilka möjligheter som finns. Vi kommer alltid ut och tittar på plats. Genomgången är kostnadsfri och du får möjlighet att ställa alla dina frågor.' },
      { namn: 'Offert', ikon: 'offert', text: 'Efter genomgången får du en tydlig offert på arbetet. Vi går igenom vad som ingår så att du vet vad du betalar för innan arbetet börjar. Inga onödiga överraskningar.' },
      { namn: 'Planering', ikon: 'plan', text: 'När du har godkänt offerten planerar vi arbetet tillsammans. Vi går igenom när vi kan börja, hur arbetet ska utföras och andra viktiga detaljer. Du ska känna dig trygg med planen innan vi sätter igång.' },
      { namn: 'Arbetet utförs', ikon: 'arbete', text: 'Nu börjar vi arbetet. Vi arbetar noggrant och håller dig informerad under projektets gång.' },
      { namn: 'Genomgång med kunden', ikon: 'klart', text: 'När arbetet är färdigt går vi igenom resultatet tillsammans med dig. Vi ser till att arbetet är klart enligt det vi har kommit överens om och att du får möjlighet att ställa frågor.' },
    ],
  },

  // Dold (se FLAGGOR): inga omdömen ännu, och vi hittar inte på några.
  omdomen: { eyebrow: '', rubrik: [''], lista: [], not: '' },

  fragor: {
    oppna: true,
    eyebrow: 'Vanliga frågor',
    rubrik: ['Det du kanske', 'undrar först'],
    kort: { rubrik: 'Hittar du inte svaret?', text: 'Ring och fråga, så får du besked om just ditt jobb.' },
    lista: [
      { q: 'Kostar genomgången något?', a: 'Nej. Genomgången är kostnadsfri och du får möjlighet att ställa alla dina frågor.' },
      { q: 'Vet jag vad det kostar innan ni börjar?', a: 'Ja. Efter genomgången får du en tydlig offert, och vi går igenom vad som ingår så att du vet vad du betalar för innan arbetet börjar.' },
      // ROT (Nuh 2026-10-27, hans formulering).
      { q: 'Kan jag få ROT-avdrag?', a: 'Ja. Med ROT-avdrag sänker du arbetskostnaden med upp till 50 000 kr per person och år.' },
      { q: 'Vad hjälper ni till med?', a: 'Hela badrumsrenoveringar, kakel och klinker i badrum, kök, hallar, trapphus och tvättstugor, och mindre arbeten.' },
      { q: 'Kan jag skicka bilder?', a: 'Gärna. Bilder gör att vi får en bättre bild av jobbet redan från början.' },
      // 2026-11-18: frågan om Eslöv (bara uppgifter som redan står på sidan).
      { q: 'Gör ni kakelarbete i Eslöv?', a: 'Ja. Vi utgår från Eslöv och gör kakelarbete där, från hela badrum till mindre jobb. Vi arbetar också i hela Skåne.' },
      { q: 'Var arbetar ni?', a: 'Vi utgår från Eslöv och arbetar i hela Skåne, bland annat i Malmö, Lund, Helsingborg, Landskrona, Höör, Hörby, Svalöv, Trelleborg och Kristianstad.' },
      { q: 'Kommer ni ut och tittar?', a: 'Ja, vi kommer alltid ut och tittar på plats.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Berätta vad du vill göra,', 'genomgången är kostnadsfri'],
    lead: 'Ring, eller skriv kort vad du vill ha hjälp med. Vi utgår från Eslöv och arbetar i hela Skåne. Du kan gärna skicka bilder.',
    checkar: ['Kostnadsfri genomgång', 'Tydlig offert innan arbetet börjar', 'ROT-avdrag – sänk arbetskostnaden med upp till 50 000 kr/person och år', 'Badrum, kök, hallar och trapphus'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta kort om jobbet',
    // "Vad gäller det?" utan Mindre arbeten (Nuh v2). Mallen lägger till Annat sist. Tvättstuga: revision 3.
    typer: ['Badrumsrenovering', 'Kakel i kök', 'Hallar och trapphus', 'Tvättstuga'],
    placeholder: 'Vad vill du ha hjälp med (badrum, kakel i kök, hall …) och ungefär hur stort är det?',
    formNot: '',
  },

  popup: {
    rubrik: 'Dags för nytt badrum?',
    text: 'Genomgången är kostnadsfri, du får en tydlig offert innan arbetet börjar och ROT-avdrag på arbetskostnaden.',
  },

  // Ingen Om oss-länk längre (sidan borttagen 2026-11-10, /om-oss/ går med 308 till startsidan).
  footer: {
    text: '',
  },

  modal: {
    rubrik: 'Så här kan Kakel 0413 se ut på nätet',
    text: 'Det här är en förhandsvisning av hemsidan, byggd på Nuhs egen text. Bilderna och filmen är illustrationer tills egna jobbfoton finns. Formuläret landar ännu inte i Kakel 0413:s inkorg.',
  },
};

// FAQPage för de 8 frågorna i #fragor (SEO 2026-11-17, samma text som på sidan).
const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: data.fragor.lista.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

// kakel0413.se: länken till undersidan kakelarbete i Eslöv (2026-11-18) i tjänsteingressen och i footerns ortsrad,
// plus Cookieinställningar. Inte på bahkobyra.se/kakel0413/, där undersidan inte finns.
const LANK_ESLOV = '/kakelarbete-eslov/';
const KUND_DATA = {
  ...data,
  kund: true,
  tjanster: {
    ...data.tjanster,
    lead: (
      <>Kakelarbete i Eslöv och hela Skåne: hela badrumsrenoveringar, kakelsättning och mindre arbeten. Läs mer om vårt <a href={LANK_ESLOV} style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '0.2em' }}>kakelarbete i Eslöv</a>. Bilderna är illustrationer.</>
    ),
  },
  footer: {
    ...data.footer,
    orter: { rubrik: 'Områden', lankar: [{ href: LANK_ESLOV, txt: 'Kakelarbete i Eslöv' }] },
    lankar: [{ href: '#cookieval', txt: 'Cookieinställningar' }],
  },
};

// Startsidans innehåll, samma på båda adresserna. kund = besöket kommer på kakel0413.se (./kund/page.js):
// bara då laddas samtyckesrutan och GA4, och footern får länken Cookieinställningar.
export function Kakel0413Sida({ kund = false }) {
  return (
    <>
      {/* Om oss borttagen (Mathias 2026-11-10), /om-oss/ omdirigeras till startsidan. BKR-sektionen #om är pausad 2026-11-23 tills Nuh fått BKR-diplom (se VISA_BKR). Jobbanden och omdömena döljs tills Nuh har egna foton och riktiga omdömen (se FLAGGOR). */}
      {/* Nuh v2: ingen stor logotyp i heron (den stora logotypen visas inte, headerns logga kvar)
          och inget telefonnummer i heron (Ring-knappen i headern kvar). H1 är texten i hero.rubrik (SEO 2026-11-17),
          i mindre storlek än mallens ortrad, och Nuhs mening står under den. */}
      <style>{`#jobb,#omdomen${VISA_BKR ? '' : ',#om'}{display:none!important}#top p:has(>img){display:none!important}#top a[href^="tel:"]{display:none!important}#top h1[class*="heroRubrik"] span[class*="heroOrt"]{margin-top:clamp(1.2rem,3vh,2rem);font-size:clamp(1.6rem,4vw,3rem);letter-spacing:.04em;line-height:1.1}[class*="mobilMenyPanel"]>a[href="#fragor"]{display:none!important}[class*="mobilMenyPanel"]>a[href="#fragor"]~a[href="#fragor"]{display:flex!important}#fragor aside[class*="fragaKort"],#form-not,footer p[class*="ftrText"]{display:none!important}#varfor ul[class*="varforPunkter"]{gap:0.6rem}#varfor ul[class*="varforPunkter"] li{padding:0.75rem 1.1rem}#varfor ul[class*="varforPunkter"] li:last-child{display:block;padding:0.6rem 0 0;background:none;border:0;box-shadow:none;color:rgba(255,255,255,.85)}#varfor ul[class*="varforPunkter"] li:last-child svg{display:none}`}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FORETAG_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <DemoSida data={kund ? KUND_DATA : { ...data, kund: true }} />
      <Referenser />
      <Galleri jobb={jobb} />
      <KontaktFalt />
      <BildUpload epost={data.kontakt.epost} />
      {kund ? <Matning /> : null}
    </>
  );
}

// bahkobyra.se/kakel0413/: noindex-kopian (metadata ovan), utan mätning.
export default function Kakel0413Demo() {
  return <Kakel0413Sida />;
}
