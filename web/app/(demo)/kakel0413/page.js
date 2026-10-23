import DemoSida from '../_mall/DemoSida';
import { arKunddoman } from './kunddoman';
import BildUpload from './BildUpload';

/* ===========================================================================
   KAKEL 0413 AB — hemsida för en betalande kund (12 000 kr-paketet), Bahko Byrå
   Kund: Nuh, kakelsättning och badrumsrenovering. Bolaget startas nu:
   org.nr är inte utfärdat ännu. Byggd 2026-10-22 på demomallen v3
   (kvalitetsnivå efter velebitmaleri).

   Bärande idé: trygghet. Ett badrum är ett stort beslut, och bakom firman står
   en hantverkare med 17+ år i branschen som håller det han lovar.

   VERIFIERAT (2026-10-22, kundens egen text via Mathias):
   - Firmanamn och logotyp: "KAKEL 0413 AB" (logofilen från kunden).
   - E-post: Nuh@kakel0413.se och Info@kakel0413.se.
   - Telefon 073-875 27 25. Utgår från Eslöv, arbetar i hela Skåne (Mathias 2026-10-22).
   - Introtexten (heron + Om Nuh) och "Så går det till" (intro + sex steg)
     är kundens ordagranna text, bara lätta stavfel rättade
     ("Han arbetat" → "Han har arbetat", "byggöretag" → "byggföretag").
   - Siffrorna: över 17 års erfarenhet, upp till sju stora projekt samtidigt,
     totalt cirka 800 nya toaletter, har arbetat med Skanska, NCC och Peab.
   - Tjänster i dag: badrumsrenovering, kakel- och klinkersättning (badrum,
     kök, hallar, trapphus) och mindre arbeten. Fler tjänster kan tillkomma:
     lägg bara till ett kort i tjanster.kort (och ett ord i tejp).

   INTE verifierat, och finns därför inte på sidan: gatuadress,
   hemsida, Instagram, org.nr, F-skatt, ROT-avdrag, garantier, priser,
   ledtider, omdömen, projektbilder.

   FLAGGOR (för Mathias):
   - LOGOTYP: Mathias frilagda fil (2026-10-22) som logo.webp. Kundens första
     fil på vit botten ligger kvar som logo-original.jpg (bara i dolda jobbanden).
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
     Tjänstekortens bilder märks i tjanster.lead-noten nedan.
   - Formuläret går till info@kakel0413.se (Nuhs Web3Forms-nyckel, PRO, KUND_NYCKEL nedan),
     både på kakel0413.se och bahkobyra.se/kakel0413. Bilder följer med som bilagor (BildUpload.js).
   =========================================================================== */

const META = {
  title: 'Kakel 0413 AB — kakelsättare och badrumsrenovering i Eslöv och Skåne',
  description:
    'Kakelsättare i Eslöv för hela Skåne: badrumsrenovering, kakel- och klinkersättning i badrum, kök, hallar och trapphus. Över 17 års erfarenhet. Kostnadsfri genomgång.',
};

// Kunddomänen (Mathias 2026-10-23): på kakel0413.se/www indexeras sidan, canonical pekar på
// https://kakel0413.se/ och demorutan "Om det här förslaget" är borta (kund: true).
// På bahkobyra.se/kakel0413/ är allt som förut: noindex och demoruta.

export async function generateMetadata() {
  return (await arKunddoman())
    ? { ...META, alternates: { canonical: 'https://kakel0413.se/' }, robots: { index: true, follow: true } }
    : { ...META, robots: { index: false, follow: false } };
}

const M = '/kakel0413/media';

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
    punkter: ['Hela badrummet', 'Kakel på vägg och golv', 'Genomgång när det är klart'],
    ritning: (<><path d="M30 70h140v15a25 25 0 01-25 25H55a25 25 0 01-25-25z" /><path d="M45 70V30a12 12 0 0124 0" /><path d="M60 110l-6 8M140 110l6 8" /></>),
  },
  {
    id: 'kok',
    namn: 'Kakel i kök',
    bild: `${M}/tjanst-kok.jpg`,
    alt: 'Illustration: vitt kakel i fiskbensmönster bakom en blandare i mässing',
    text: 'Kakel- och klinkerarbeten i kök, till exempel kakel ovanför bänkskivan.',
    punkter: ['Kakel- och klinkersättning', 'Kök', 'Noggrant och rent'],
    ritning: (<><path d="M30 25h140v50H30z" /><path d="M65 25v50M100 25v50M135 25v50M30 50h140" /><path d="M20 85h160v10H20z" /></>),
  },
  {
    id: 'hall',
    namn: 'Hallar och trapphus',
    bild: `${M}/tjanst-trapp.jpg`,
    alt: 'Illustration: ljus hall med klinkergolv och trappa',
    text: 'Kakel- och klinkerarbeten i hallar och trapphus.',
    punkter: ['Hallar', 'Trapphus', 'Klinker på golv'],
    ritning: (<><path d="M20 105h40V85h30V65h30V45h30V25h30" /><path d="M20 105h160" /></>),
  },
  {
    id: 'mindre',
    namn: 'Mindre arbeten',
    bild: `${M}/tjanst-mindre.jpg`,
    alt: 'Illustration: nykaklad duschnisch med guldlist och verktyg på en duk',
    text: 'Inget jobb är för litet. Berätta vad du behöver hjälp med, gärna med bilder.',
    punkter: ['Mindre kakelarbeten', 'Skicka gärna bilder', 'Kostnadsfri genomgång'],
    ritning: (<><path d="M50 30h45v45H50zM105 30h45v45h-45zM50 85h45v20M105 85h45v20" /></>),
  },
];

const data = {
  namn: 'Kakel 0413 AB',
  // Mathias egen loggfil (frilagd PNG, 2026-10-22) → logo.webp 1000 px bred (@2x för heron).
  logo: { src: `${M}/logo.webp`, w: 1000, h: 502, alt: 'Kakel 0413 AB' },
  tema: {
    mork: '#16130E',
    accent: '#C29B48',
    accentHover: '#A9832F',
    accentText: '#7A5A16',
    accentLjus: '#D9B867',
    paAccent: '#0F172A',
  },
  ...(KUND_NYCKEL ? { formular: { nyckel: KUND_NYCKEL, amne: 'Ny förfrågan från kakel0413.se', fran: 'Kakel 0413 AB' } } : {}),
  kontakt: {
    tel: '073-875 27 25',
    telHref: 'tel:+46738752725',
    epost: 'info@kakel0413.se',
    adress: 'Eslöv · hela Skåne',
  },
  cta: { txt: 'Boka kostnadsfri genomgång', kort: 'Boka genomgång', lank: 'Boka genomgång' },
  nav: {
    vanster: [{ href: '#tjanster', txt: 'Tjänster' }, { href: '#process', txt: 'Så går det till' }],
    hoger: [{ href: '#varfor', txt: 'Därför oss' }, { href: '#fragor', txt: 'Frågor' }],
  },

  hero: {
    h1: ['Kakel', { txt: '0413', liten: true }],
    // ort borttagen (Nuh v2): Eslöv och Skåne står redan i tejpen under heron.
    // Nuhs budskap i heron (Mathias 2026-10-22). Mallen har ingen rubrik/ingress-plats i standardheron,
    // så rubriken och underraden ligger som block först i tjänsteraden: rubrik + underrad + "Kakel & Badrum."
    tjanster: [(
      <>
        <span style={{ display: 'block', maxWidth: '36rem', marginInline: 'auto', marginTop: '0.2rem', marginBottom: '0.9rem', fontFamily: 'var(--f-text, inherit)', fontStyle: 'normal', fontWeight: 500, color: '#F5F1E8', fontSize: 'clamp(1rem, 1.6vw, 1.15rem)', lineHeight: 1.5 }}>Att renovera ett badrum är ett stort beslut. Därför är det viktigt att du känner dig trygg med den som utför arbetet.</span>
      </>
    ), ''],
    video: `${M}/video-hero.mp4`,
    videoMobil: `${M}/video-hero-mobil.mp4`,
    poster: `${M}/poster-hero.jpg`,
    posterMobil: `${M}/poster-hero-mobil.jpg`,
  },
  tejp: ['Badrumsrenovering', 'Kakel', 'Klinker', 'Kök', 'Trapphus', 'Mindre arbeten', 'Eslöv', 'Skåne'],

  tjanster: {
    eyebrow: 'Tjänster',
    rubrik: ['Kakel och klinker,', 'från golv till tak'],
    lead: 'Hela badrumsrenoveringar, kakelsättning och mindre arbeten. Bilderna är illustrationer.',
    kort: tjanster,
  },

  // Dold (se FLAGGOR): mallen kräver fältet. Fylls med Nuhs egna jobbfoton senare.
  // Banden kan inte vara tomma (mallens fyllUt loopar då för evigt): en dold post med logofilen var.
  jobb: {
    eyebrow: '', rubrik: [''], lead: '', not: '', tid: '60s',
    rad1: [{ src: `${M}/logo-original.jpg`, alt: '', txt: '' }],
    rad2: [{ src: `${M}/logo-original.jpg`, alt: '', txt: '' }],
  },

  // Därför oss (Nuh v2): Nuhs egen introtext ordagrant (samma stycken som om.stycken nedan),
  // bara uppdelad i ingress + punkter. Punktrubrikerna är korta etiketter, texterna är hans.
  varfor: {
    eyebrow: 'Därför oss',
    rubrik: ['Att alltid hålla', 'det man lovar'],
    lead: 'Efter många år i branschen valde Nuh att starta eget för att kunna fokusera ännu mer på det som betyder mest, hög kvalitet, noggrant arbete, tydlig kommunikation och att alltid hålla det man lovar.',
    punkter: [
      { rubrik: 'Över 17 års erfarenhet', text: 'Bakom företaget står Nuh, som har över 17 års erfarenhet inom byggbranschen. Han har arbetat med allt från kakelsättning och badrumsrenoveringar till stora byggprojekt.' },
      { rubrik: 'Upp till sju stora projekt samtidigt', text: 'Under sin karriär har Nuh ansvarat för upp till sju stora projekt samtidigt, med arbeten som omfattat totalt cirka 800 nya toaletter. Utöver detta har han även utfört kakel- och klinkerarbeten i trapphus, hallar och kök.' },
      { rubrik: 'Skanska, NCC och Peab', text: 'Han har arbetat tillsammans med välkända byggföretag som Skanska, NCC och Peab.' },
      { rubrik: 'Samma mål, varje jobb', text: 'Oavsett om du behöver hjälp med en hel badrumsrenovering, kakelsättning eller ett mindre arbete är målet alltid detsamma: att leverera ett resultat som du som kund kan känna dig riktigt nöjd med.' },
    ],
    video: `${M}/video-varfor.mp4`,
    poster: `${M}/poster-varfor.jpg`,
    videoAlt: 'Illustration: ett färdigt badrum i vit marmor och borstad guld, som slutar med Kakel 0413:s logotyp',
  },

  om: {
    eyebrow: 'Om Nuh',
    rubrik: ['Över 17 år', 'i byggbranschen'],
    kortRad: 'Skanska · NCC · Peab',
    stycken: [
      'Bakom företaget står Nuh, som har över 17 års erfarenhet inom byggbranschen. Han har arbetat med allt från kakelsättning och badrumsrenoveringar till stora byggprojekt.',
      'Under sin karriär har Nuh ansvarat för upp till sju stora projekt samtidigt, med arbeten som omfattat totalt cirka 800 nya toaletter. Utöver detta har han även utfört kakel- och klinkerarbeten i trapphus, hallar och kök.',
      'Han har arbetat tillsammans med välkända byggföretag som Skanska, NCC och Peab.',
      'Efter många år i branschen valde Nuh att starta eget för att kunna fokusera ännu mer på det som betyder mest, hög kvalitet, noggrant arbete, tydlig kommunikation och att alltid hålla det man lovar.',
      'Oavsett om du behöver hjälp med en hel badrumsrenovering, kakelsättning eller ett mindre arbete är målet alltid detsamma: att leverera ett resultat som du som kund kan känna dig riktigt nöjd med.',
    ],
    bevis: [
      { ord: '17+ år', text: 'i byggbranschen' },
      { ord: 'Upp till 7', text: 'stora projekt samtidigt' },
      { ord: 'Ca 800', text: 'nya toaletter' },
    ],
  },

  steg: {
    eyebrow: 'Så går det till',
    rubrik: ['Från första kontakt', 'tills arbetet är klart'],
    lead: 'Vi vill att det ska kännas enkelt och tryggt att anlita oss. Därför får du veta vad som händer från första kontakt tills arbetet är klart.',
    lista: [
      { namn: 'Kontakt', ikon: 'kontakt', text: 'Du kontaktar oss och berättar kort vad du vill ha hjälp med. Det kan vara en badrumsrenovering, nytt kakel eller ett mindre arbete. Du kan gärna skicka bilder så att vi får en bättre bild av jobbet.' },
      { namn: 'Kostnadsfri genomgång', ikon: 'besok', text: 'Vi går igenom vad du vill göra och tittar på vilka möjligheter som finns. Vid behov kommer vi ut och tittar på plats. Genomgången är kostnadsfri och du får möjlighet att ställa alla dina frågor.' },
      { namn: 'Offert', ikon: 'offert', text: 'Efter genomgången får du en tydlig offert på arbetet. Vi går igenom vad som ingår så att du vet vad du betalar för innan arbetet börjar. Inga onödiga överraskningar.' },
      { namn: 'Planering', ikon: 'plan', text: 'När du har godkänt offerten planerar vi arbetet tillsammans. Vi går igenom när vi kan börja, hur arbetet ska utföras och andra viktiga detaljer. Du ska känna dig trygg med planen innan vi sätter igång.' },
      { namn: 'Arbetet utförs', ikon: 'arbete', text: 'Nu börjar vi arbetet. Vi arbetar noggrant och håller dig informerad under projektets gång. Om något oväntat dyker upp pratar vi med dig innan vi går vidare.' },
      { namn: 'Genomgång med kunden', ikon: 'klart', text: 'När arbetet är färdigt går vi igenom resultatet tillsammans med dig. Vi ser till att arbetet är klart enligt det vi har kommit överens om och att du får möjlighet att ställa frågor.' },
    ],
  },

  // Dold (se FLAGGOR): inga omdömen ännu, och vi hittar inte på några.
  omdomen: { eyebrow: '', rubrik: [''], lista: [], not: '' },

  fragor: {
    eyebrow: 'Vanliga frågor',
    rubrik: ['Det du kanske', 'undrar först'],
    lead: 'Kort om hur det fungerar.',
    kort: { rubrik: 'Hittar du inte svaret?', text: 'Ring och fråga, så får du besked om just ditt jobb.' },
    lista: [
      { q: 'Kostar genomgången något?', a: 'Nej. Genomgången är kostnadsfri och du får möjlighet att ställa alla dina frågor.' },
      { q: 'Vet jag vad det kostar innan ni börjar?', a: 'Ja. Efter genomgången får du en tydlig offert, och vi går igenom vad som ingår så att du vet vad du betalar för innan arbetet börjar.' },
      { q: 'Vad hjälper ni till med?', a: 'Hela badrumsrenoveringar, kakel- och klinkersättning i badrum, kök, hallar och trapphus, och mindre arbeten.' },
      { q: 'Kan jag skicka bilder?', a: 'Gärna. Bilder gör att vi får en bättre bild av jobbet redan från början.' },
      { q: 'Var arbetar ni?', a: 'Vi utgår från Eslöv och arbetar i hela Skåne.' },
      { q: 'Kommer ni ut och tittar?', a: 'Ja, vid behov kommer vi ut och tittar på plats.' },
      { q: 'Vad händer om något oväntat dyker upp?', a: 'Då pratar vi med dig innan vi går vidare.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Berätta vad du vill göra,', 'genomgången är kostnadsfri'],
    lead: 'Ring, eller skriv kort vad du vill ha hjälp med. Vi utgår från Eslöv och arbetar i hela Skåne. Du kan gärna skicka bilder.',
    checkar: ['Kostnadsfri genomgång', 'Tydlig offert innan arbetet börjar', 'Badrum, kök, hallar och trapphus'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta kort om jobbet',
    // "Vad gäller det?" utan Mindre arbeten (Nuh v2). Mallen lägger till Annat sist.
    typer: ['Badrumsrenovering', 'Kakel i kök', 'Hallar och trapphus'],
    placeholder: 'Vad vill du ha hjälp med (badrum, kakel i kök, hall …) och ungefär hur stort är det?',
    formNot: 'Skriv kort om jobbet, då blir första samtalet mer konkret. Inga massutskick, ingen säljlista.',
  },

  popup: {
    rubrik: 'Dags för nytt badrum?',
    text: 'Genomgången är kostnadsfri, och du får en tydlig offert innan arbetet börjar.',
  },

  footer: {
    lankar: [{ href: '/kakel0413/om-oss/', txt: 'Om oss' }],
    text: 'Badrumsrenovering, kakel- och klinkersättning och mindre arbeten i Eslöv och hela Skåne. Över 17 års erfarenhet i byggbranschen.',
  },

  modal: {
    rubrik: 'Så här kan Kakel 0413 se ut på nätet',
    text: 'Det här är en förhandsvisning av hemsidan, byggd på Nuhs egen text. Bilderna och filmen är illustrationer tills egna jobbfoton finns. Formuläret landar ännu inte i Kakel 0413:s inkorg.',
  },
};

export default async function Kakel0413Demo() {
  const kund = await arKunddoman();
  return (
    <>
      {/* Om Nuh flyttade till /kakel0413/om-oss (Mathias 2026-10-22), länkad i footern. Jobbanden och omdömena döljs tills Nuh har egna foton och riktiga omdömen (se FLAGGOR). */}
      {/* Nuh v2: ingen stor logotyp i heron (h1 finns kvar för skärmläsare/SEO, visuellt dold; headerns logga kvar)
          och inget telefonnummer i heron (Ring-knappen i headern kvar). Raden "Kakel & Badrum." struken: mallen skriver alltid " & " och ".",
          så tjänsteraden får font-size 0 och bara Nuhs mening (egen fontstorlek) syns. */}
      <style>{'#jobb,#omdomen,#om{display:none!important}#top h1{position:absolute!important;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}#top a[href^="tel:"]{display:none!important}#top p[class*="heroTjanster"]{font-size:0!important;line-height:0!important}'}</style>
      <DemoSida data={kund ? { ...data, kund: true } : data} />
      <BildUpload epost={data.kontakt.epost} />
    </>
  );
}
