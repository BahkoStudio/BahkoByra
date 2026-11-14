import DemoSida from '../_mall/DemoSida';

/* ===========================================================================
   TMK KAKEL AB · kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: Mathias 2026-11-14 · instagram.com/tmk_kakel · plattsättare i Trollhättan.
   HAR hemsida (tmkkakel.se, WordPress/Divi, tre sidor). Byggd 2026-11-14 på demomallen v3
   (kanon swedcro, närmast pbindustriservice) med tjänsternas runda 3D-märken (mallens
   marke-fält, som Rena Rör och bahkobyra.se, Mathias 2026-11-11).
   Återbruk: nischen kakel finns (kakel0413), men TMK har egna foton nog, så inget lånat.

   Bärande idé: en offert på hela badrummet, och du pratar med Tomi som äger firman.
   Hans egen sajt säger "vi ger dig en offert på hela projektet" och "allt från rivning och
   plattsättning till snickeri och montage av badrumsmöbler tillsammans med våra
   samarbetspartners". Hans referenser har riktiga ortnamn runt Trollhättan och Vänersborg.

   VERIFIERAT (2026-11-14):
   - tmkkakel.se (start + /referenser/): "15 års erfarenhet av kakel- & klinkerarbeten",
     "Oavsett om du behöver renovera i hemmet eller på jobbet, i köket eller badrummet",
     "gedigen erfarenhet från olika många uppdrag och firmor". Tjänster: "Kakel & klinker"
     (kök, badrum, hallar eller andra rum, i hemmet eller på arbetsplatsen) och "Badrum"
     (badrum eller WC: rivning, plattsättning, snickeri, montage av badrumsmöbler tillsammans
     med samarbetspartners). "Bakom företaget står Tomi Määttä", "VD & grundare", "Med oss
     blir allt enkelt och vi ger dig en offert på hela projektet". info@tmkkakel.se,
     0739-87 36 34, Org.nr 559156-7101, Larstorpsvägen 16, 461 98 Trollhättan.
     Referenser (rubriker): Badrum i Vargön, Badrum i Egna hem, Ljust badrum i Skoftebyn,
     Badrum i Sjuntorp, Badrum i Varekil, Badrum i Skoftebyn, Badrum och tegel bakom kamin
     i Kode, Teknikrum i Vänersnäs (inlägg daterade mars till juni 2022).
   - Registret (allabolag, merinfo, hitta, syna, eniro): TMK Kakel AB, org.nr 559156-7101,
     registrerat 2018-04-23, Larstorpsvägen 16, Trollhättan, F-skatt och moms, SNI 43330
     Golv- och väggbeläggningsarbeten, "Golv- och väggbeläggningsarbeten och mindre
     byggnationer", 1 anställd, ledamot Tomi Kristian Määttä. Eniro: 073-987 36 34.
   - Instagram @tmk_kakel ("TMK Kakel AB", 341 följare, 33 inlägg, embed 2026-11-14).
     Jobbinlägg: DfaL3utI18N (dusch med nisch och bänk, reel), DfB7A57oHgy ("Ghost Flush",
     spolknapp infälld i stenplatta), DclnVTCCF_M (badrum i stenplatta, "Tenax Glaxs Fast").
     Bilden på bussen med "TMK Kakel AB" (DfP77t8I10L) är en reklamreel för verktyg.
   - ALLA BILDER ÄR DERAS EGNA, från tmkkakel.se (mediebiblioteket). Tjänstekortens bilder är
     referensernas: Sjuntorp (badrum), Skoftebyn (schackgolv), Kode (kamin), Vänersnäs
     (teknikrum); kopplingen bild till ort är läst ur ordningen på /referenser/.
     Jobbanden har bara beskrivande texter, inga orter, eftersom orten inte står vid bilden.

   INTE verifierat, och står därför INTE på sidan: Google-profil och omdömen (inga hittade;
   Hantverkskollen: "Inga omdömen än"), garantier, våtrumsbehörighet/certifikat (GVK, BKR),
   priser, ledtider, att de sköter ROT-avdraget åt kunden, VVS och el, köksjobb i bild,
   arbetsområde utöver orterna i referenserna, Facebook.

   FLAGGOR:
   - HERO-FILMEN ÄR EN PLATSHÅLLARE: långsam inzoomning (ffmpeg, gratis) över deras eget foto
     WPGT7482. Den riktiga ska göras med Wan 3.0 Prime när Mathias godkänt kostnaden
     (prompt och kostnad i leadfilen). Filvägarna är desamma, så bara filerna byts.
   - Kontaktfilmen = platshållar-heron suddad. Görs om när heron byts.
   - Varför-filmen = deras foto VMPM9543 (Badrum i Vargön) i långsam rörelse + logokort.
   - 3D-märkena på tjänsterna är GENERERADE (GPT Image 2.5 / Sunburst, 4 st, ca 0,07 USD).
   - Logotypen = deras logo.png från tmkkakel.se (gråskala). Ljus variant gjord av oss
     (svart blir vitt, bokstäverna mörka) till heron och headern över filmen.
   - Accenten (#0F766E, petrol) är vald av oss: loggan är gråskala och mallen kräver en mättad
     accent. Byts om Tomi har en egen färg.
   - Omdömen DOLDA (STIL nedan): inga riktiga hittade, och exempelkort ville Mathias inte ha
     (Proffsmaskiner 2026-11). Mallen kräver fältet.
   - Formuläret går till mathias@bahkobyra.se (demonyckeln). Riktiga kontaktuppgifter på
     sidan: noindex, visas inte publikt.
   =========================================================================== */

const TITEL = 'TMK Kakel AB | Plattsättare och badrumsrenovering i Trollhättan';
const BESKRIVNING =
  'Kakel och klinker, badrumsrenovering och teknikrum i Trollhättan, Vänersborg och närområdet. 15 års erfarenhet. En offert på hela projektet. Förslag på hemsida från Bahko Byrå.';

export const metadata = {
  title: TITEL,
  description: BESKRIVNING,
  robots: { index: false, follow: false },
  openGraph: {
    title: TITEL,
    description: 'Kakel och klinker, badrum och teknikrum i Trollhättan. En offert på hela projektet.',
    siteName: 'TMK Kakel AB',
    locale: 'sv_SE',
    type: 'website',
    images: [{ url: '/tmkkakel/media/poster-hero.jpg', width: 1920, height: 1080, alt: 'TMK Kakel AB' }],
  },
};

const M = '/tmkkakel/media';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: 'TMK Kakel AB',
  legalName: 'TMK Kakel AB',
  logo: 'https://www.bahkobyra.se/tmkkakel/media/logo-tmk.png',
  image: 'https://www.bahkobyra.se/tmkkakel/media/poster-hero.jpg',
  url: 'https://www.tmkkakel.se/',
  telephone: '+46739873634',
  email: 'info@tmkkakel.se',
  taxID: '559156-7101',
  founder: { '@type': 'Person', name: 'Tomi Määttä' },
  address: { '@type': 'PostalAddress', streetAddress: 'Larstorpsvägen 16', postalCode: '461 98', addressLocality: 'Trollhättan', addressCountry: 'SE' },
  areaServed: ['Trollhättan', 'Vänersborg', 'Vargön', 'Sjuntorp'].map((n) => ({ '@type': 'City', name: n })),
  sameAs: ['https://www.instagram.com/tmk_kakel/', 'https://www.tmkkakel.se/'],
  makesOffer: ['Plattsättning', 'Kakel och klinker', 'Badrumsrenovering', 'Teknikrum', 'Tegel bakom kamin'].map((n) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', name: n },
  })),
};

const data = {
  namn: 'TMK Kakel AB',
  tema: {
    mork: '#0F1417',
    accent: '#0F766E',
    accentHover: '#0B5E58',
    accentText: '#0B5E58',
    accentLjus: '#5EC8BC',
    paAccent: '#fff',
  },
  logo: { src: `${M}/logo-tmk.png`, ljus: `${M}/logo-tmk-ljus.png`, w: 1021, h: 292, alt: 'TMK Kakel AB', topp: 'fri' },
  kontakt: {
    tel: '0739 87 36 34',
    telHref: 'tel:+46739873634',
    epost: 'info@tmkkakel.se',
    adress: 'Larstorpsvägen 16, Trollhättan',
    ig: 'https://www.instagram.com/tmk_kakel/',
    igHandle: '@tmk_kakel',
    orgnr: '559156-7101',
  },
  cta: { txt: 'Få en offert på hela jobbet', kort: 'Begär offert', lank: 'Begär offert' },
  nav: {
    vanster: [{ href: '#tjanster', txt: 'Tjänster' }, { href: '#jobb', txt: 'Våra jobb' }],
    hoger: [{ href: '#om', txt: 'Om oss' }, { href: '#fragor', txt: 'Frågor' }],
  },

  hero: {
    ort: 'Trollhättan',
    tjanster: ['Kakel', 'Badrum'],
    video: `${M}/video-hero.mp4`,
    videoMobil: `${M}/video-hero-mobil.mp4`,
    poster: `${M}/poster-hero.jpg`,
    posterMobil: `${M}/poster-hero-mobil.jpg`,
  },
  tejp: ['Kakel', 'Klinker', 'Badrum', 'WC', 'Teknikrum', 'Kök', 'Hall', 'Trollhättan'],

  tjanster: {
    eyebrow: 'Vad vi gör',
    rubrik: ['Plattor på vägg och golv,', 'hela vägen'],
    lead: 'Badrum, WC, kök, hall och teknikrum. I hemmet eller på jobbet. Du får en offert på hela projektet.',
    kort: [
      {
        id: 'badrum',
        namn: 'Badrumsrenovering',
        bild: `${M}/tjanst-badrum.jpg`,
        alt: 'Färdigt badrum i Sjuntorp med vitt kakel på väggarna och svart marmorklinker på golvet',
        marke: `${M}/marke-badrum.webp`,
        text: 'Badrum eller WC från rivning till färdigt rum. Vi river, lägger plattor, snickrar och monterar badrumsmöblerna tillsammans med våra samarbetspartners.',
        punkter: ['Rivning av det gamla', 'Kakel och klinker', 'Snickeri och montage av möbler'],
      },
      {
        id: 'kakel',
        namn: 'Kakel och klinker',
        bild: `${M}/tjanst-kakel.jpg`,
        alt: 'Rött och vitt schackmönstrat klinkergolv med golvbrunn i ett badrum i Skoftebyn',
        marke: `${M}/marke-kakel.webp`,
        text: 'Kakel på vägg och klinker på golv, i alla rum där du vill ha plattor. Schackmönster, diagonalt, stora stenplattor eller enkelt vitt.',
        punkter: ['Badrum och WC', 'Kök och hall', 'Mönster och stora format'],
      },
      {
        id: 'teknikrum',
        namn: 'Teknikrum',
        bild: `${M}/tjanst-teknikrum.jpg`,
        alt: 'Ljust klinkergolv och kaklad bänk i ett teknikrum i Vänersnäs',
        marke: `${M}/marke-teknikrum.webp`,
        text: 'Ett golv som tål vatten och är lätt att hålla rent. Vi lägger klinker och kakel i teknikrum och andra rum där det blir blött.',
        punkter: ['Klinker på golv', 'Kakel på vägg', 'Lätt att hålla rent'],
      },
      {
        id: 'kamin',
        namn: 'Tegel bakom kamin',
        bild: `${M}/tjanst-kamin.jpg`,
        alt: 'Svart braskamin framför en vägg i rött tegel i Kode',
        marke: `${M}/marke-kamin.webp`,
        text: 'Tegelplattor på väggen bakom braskaminen. Det gjorde vi i Kode, i samma jobb som ett nytt badrum.',
        punkter: ['Tegel på vägg', 'Runt kamin och rökrör', 'Samma firma som badrummet'],
      },
    ],
  },

  jobb: {
    eyebrow: 'Våra jobb',
    rubrik: ['Badrum vi', 'har lagt'],
    lead: 'Bilder från våra egna jobb, tagna av oss på plats.',
    not: 'Alla bilder är våra egna.',
    tid: '70s',
    rad1: [
      { src: `${M}/jobb-schack-svartvitt.jpg`, alt: 'Svartvitt schackmönstrat klinkergolv i ett badrum', txt: 'Svartvitt schackgolv' },
      { src: `${M}/jobb-svart-marmor.jpg`, alt: 'Svart marmorklinker med en diagonalt lagd golvbrunn', txt: 'Svart marmor' },
      { src: `${M}/jobb-diagonal-gron.jpg`, alt: 'Diagonalt lagt kakel i grönt och vitt med en infälld lucka', txt: 'Diagonalt i grönt' },
      { src: `${M}/jobb-dusch.jpg`, alt: 'Dusch med vitt kakel på väggarna och grå klinker på golvet', txt: 'Duschhörna' },
      { src: `${M}/jobb-traklinker.jpg`, alt: 'Smalt badrum med vitt kakel och klinker som ser ut som trä', txt: 'Klinker i träkänsla' },
      { src: `${M}/jobb-schack-rott.jpg`, alt: 'Rött och vitt schackmönster på ett badrumsgolv', txt: 'Rött och vitt' },
    ],
    rad2: [
      { src: `${M}/jobb-kommod.jpg`, alt: 'Badrumskommod i trä och spegelskåp mot vitt kakel', txt: 'Klart med möbler' },
      { src: `${M}/jobb-marmor-tra.jpg`, alt: 'Grå marmorplattor runt ett fönster i ett badrum', txt: 'Marmor runt fönstret' },
      { src: `${M}/jobb-schack-gront.jpg`, alt: 'Grönt och vitt schackmönster på golvet och vitt kakel på väggen', txt: 'Grönt schackgolv' },
      { src: `${M}/jobb-fonster.jpg`, alt: 'Dusch under ett fönster med vitt kakel och grå klinker', txt: 'Dusch under fönster' },
      { src: `${M}/jobb-mork-klinker.jpg`, alt: 'Mörk stenklinker med diagonal golvbrunn intill vitt kakel', txt: 'Mörk klinker' },
      { src: `${M}/jobb-schack-bla.jpg`, alt: 'Blått och vitt schackmönster på ett badrumsgolv', txt: 'Blått och vitt' },
    ],
  },

  varfor: {
    eyebrow: 'Varför TMK Kakel',
    rubrik: ['En offert,', 'hela badrummet'],
    lead: 'Ett badrum har många moment. Rivning, underlag, plattor, snickeri, möbler. Du ska inte behöva jaga fem firmor. Du ringer Tomi och får ett pris på allt.',
    punkter: [
      { rubrik: 'En offert på hela projektet', text: 'Du vet vad hela jobbet kostar innan vi börjar.' },
      { rubrik: 'Från rivning till möbler', text: 'Vi river, lägger plattor, snickrar och monterar, med våra samarbetspartners där det behövs.' },
      { rubrik: '15 år med kakel och klinker', text: 'Erfarenhet från många uppdrag och firmor innan TMK Kakel.' },
      { rubrik: 'Du pratar med ägaren', text: 'Tomi Määttä startade firman och svarar själv när du ringer.' },
    ],
    video: `${M}/video-varfor.mp4`,
    poster: `${M}/poster-varfor.jpg`,
    videoAlt: 'Långsam inzoomning i ett färdigt badrum i Vargön. Filmen slutar med logotypen.',
  },

  om: {
    eyebrow: 'Om oss',
    rubrik: ['Tomi står', 'bakom firman'],
    kortRad: 'Trollhättan · aktiebolag sedan 2018',
    stycken: [
      'Bakom TMK Kakel står Tomi Määttä, VD och grundare. Han har lagt kakel och klinker i 15 år och fått sin erfarenhet från många olika uppdrag och firmor.',
      'Firman har sitt säte i Trollhättan. Badrum i Vargön, Sjuntorp, Skoftebyn och Egna hem, ett teknikrum i Vänersnäs och tegel bakom en kamin i Kode. Det är några av jobben.',
    ],
    bevis: [
      { ord: '15 år', text: 'med kakel och klinker' },
      { ord: '2018', text: 'aktiebolag i Trollhättan' },
      { ord: 'F-skatt', text: 'registrerat och momsregistrerat' },
    ],
  },

  steg: {
    eyebrow: 'Så går det till',
    rubrik: ['Från samtal', 'till färdigt rum'],
    lead: 'Fyra steg, och du får priset innan något rivs.',
    lista: [
      { namn: 'Ring eller skriv', text: 'Berätta vilket rum det gäller och var du bor. Har du bilder, skicka med dem.', ikon: 'kontakt' },
      { namn: 'Vi går igenom jobbet', text: 'Vi pratar om vad som ska göras, vilka plattor du vill ha och vad som behöver rivas.', ikon: 'besok' },
      { namn: 'Offert på allt', text: 'Du får en offert på hela projektet, så att du vet vad det kostar.', ikon: 'offert' },
      { namn: 'Jobbet görs', text: 'Vi river, lägger plattor och monterar tills rummet är klart.', ikon: 'klart' },
    ],
  },

  // Dold i STIL: inga riktiga omdömen hittade, och vi hittar inte på några. Mallen kräver fältet.
  omdomen: { eyebrow: '', rubrik: [''], lista: [], not: '' },

  instagram: {
    eyebrow: 'Instagram',
    rubrik: ['Följ jobben', 'på Instagram'],
    lead: 'Det senaste från vårt konto, direkt från Instagram.',
    bio: 'TMK Kakel AB · Trollhättan',
    koder: ['DfaL3utI18N', 'DfB7A57oHgy', 'DclnVTCCF_M'],
  },

  fragor: {
    eyebrow: 'Vanliga frågor',
    rubrik: ['Det du brukar', 'undra först'],
    lead: 'Pris och omfattning först, det praktiska sedan.',
    kort: { rubrik: 'Hittar du inte svaret?', text: 'Ring Tomi och berätta om rummet. Du får ett rakt besked.' },
    lista: [
      { q: 'Vad kostar ett nytt badrum?', a: 'Det beror på storlek, plattor och hur mycket som ska rivas. Du får en offert på hela projektet innan vi börjar, så att du vet vad det landar på.' },
      { q: 'Gör ni hela badrummet eller bara plattorna?', a: 'Hela. Vi river, lägger kakel och klinker, snickrar och monterar badrumsmöblerna tillsammans med våra samarbetspartners.' },
      { q: 'Får jag ROT-avdrag?', a: 'ROT-avdraget gäller arbetskostnaden när jobbet görs i ditt hem. Fråga om det när du får offerten.' },
      { q: 'Var jobbar ni?', a: 'Vi utgår från Trollhättan. Jobben på sidan är gjorda i bland annat Vargön, Sjuntorp, Skoftebyn, Egna hem, Vänersnäs, Varekil och Kode.' },
      { q: 'Tar ni jobb åt företag?', a: 'Ja. Vi lägger kakel och klinker både i hem och på arbetsplatser.' },
      { q: 'Är ni ett registrerat företag?', a: 'Ja. TMK Kakel AB, org.nr 559156-7101, med F-skatt.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Berätta om rummet,', 'få en offert'],
    lead: 'Skriv vilket rum det gäller och var du bor. Bilder säger mycket, skicka dem gärna efteråt.',
    checkar: ['En offert på hela projektet', 'Badrum, kök, hall och teknikrum', 'Trollhättan med omnejd'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta kort om jobbet',
    kundtyp: ['Privatperson', 'Företag'],
    placeholder: 'Vilket rum, ungefär hur stort, och vad ska göras? Till exempel: badrum på 5 kvm, allt ska rivas.',
    formNot: 'Skriv kort om jobbet, så kan Tomi ge ett vettigt svar redan i första samtalet.',
    meddelandeEtikett: 'Kort om jobbet',
  },

  popup: {
    rubrik: 'Dags för nytt badrum?',
    text: 'Skriv några rader om rummet, så hör Tomi av sig med ett rakt besked.',
  },

  footer: {
    text: 'Kakel och klinker, badrumsrenovering och teknikrum. TMK Kakel AB i Trollhättan, med 15 års erfarenhet av plattsättning.',
  },

  modal: {
    rubrik: 'Så här kan TMK Kakel se ut på nätet',
    text: 'Det här är ett kostnadsfritt förslag, byggt på det ni själva visar på tmkkakel.se och Instagram, med era egna bilder och er logga. Formuläret landar ännu inte i er inkorg. Vill ni se den skarpt? Boka ett kostnadsfritt samtal på 15 minuter med Mathias.',
  },
};

/* STIL: omdömena döljs (inga riktiga finns, se FLAGGOR). Mallen (🔒) är orörd. */
const STIL = '#omdomen{display:none!important}';

export default function TmkKakelDemo() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <style>{STIL}</style>
      <DemoSida data={data} />
    </>
  );
}
