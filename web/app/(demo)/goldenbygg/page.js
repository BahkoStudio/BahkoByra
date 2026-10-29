import DemoSida from '../_mall/DemoSida';

/* ===========================================================================
   GOLDEN BYGGSERVICE 24: kostnadsfritt hemsideförslag från Bahko Byrå (varm lead)
   Lead: gbygg24.se + instagram.com/gbygg24 · bygg, renovering, rivning, golv,
   måleri, tak, kök, snickeri och byggstädning i Malmö och Skåne, för både
   privatpersoner och företag. Byggd 2026-10-29 på demomallen v3 (närmast:
   fonsterproffset). Systerbolaget Golden Städservice 24 AB har en egen demo
   (BahkoByra-golden), den här rör bara byggbolaget.

   Bärande idé: ett företag hela vägen. Deras egen logotyp säger "Tryggt byggt.
   Hela vägen." och deras inlägg visar just det: rivning, markarbete, stomme,
   golv och byggstädning hos samma företag.

   VERIFIERAT (2026-10-29):
   - gbygg24.se (startsidan, enda sidan): namnet Golden Byggservice 24 AB,
     telefon 070-665 60 03 (tel:+46706656003), info@gbygg24.se, "ALLT INOM BYGG",
     tjänsterna Rivning och renovering av tak, Montering av kök, Golvläggning av
     alla typer av golv (parkett, laminat, klinker, vinyl, heltäckningsmatta),
     Byggstädning, Måleri (inomhus och utomhus, fasad), Snickeriarbete,
     Rotarbete och rutarbete. Processen: Kontakt ("via telefon eller ett
     personligt möte"), Uppdrag ("Vi påbörjar arbetet efter ditt godkännande och
     håller dig underrättad hela tiden"), Avslut. Privatperson och Företag.
     Logotypen logo-2048x683.png ("Golden Byggservice 24 · Tryggt byggt. Hela
     vägen."), guld #F0A800 och marin.
   - Instagram @gbygg24 (embed utan inloggning): bio enligt Mathias, sex
     senaste inläggen är reels: golvläggning, rivning av kontor inkl.
     betongplatta, markarbete till betongplatta, stomme till färdigt resultat,
     parkett och trappa, fönster före/efter på en gavel. "Vi hjälper både
     privatpersoner och företag." info@gbygg24.se i bildtexterna.
   - Servicefinder (servicefinder.se/foretag/7185297, läst 2026-10-29): 4,7 av 5
     i snitt, 19 omdömen, telefon +46706656003, org.nr 559445-1816. Omdömena
     från Grya (4, murreparation och skorsten), Dan (4, rivning av
     glasblocksvägg) och Dubravka (5, parkettgolv) ordagrant. Orterna i
     listningen: bland annat Malmö, Lund, Burlöv, Staffanstorp, Vellinge, Lomma,
     Trelleborg och Helsingborg; senaste jobben i Malmö och Arlöv.
   - Register (alltombolag, proffskoll, bolagsfilter): Golden Byggservice 24 AB,
     org.nr 559445-1816, säte Malmö, F-skatt, styrelse Besim Topalli,
     suppleant Nimetula Ali. Bytte namn från Volter Sweden AB 2025.

   INTE verifierat, och finns därför INTE på sidan: gatuadress (sajten
   Hyacintgatan 33, registret också Agnesfridsvägen 184 A), öppettider (bara
   Servicefinder), priser, garantier, antal jobb eller år i branschen,
   certifieringar (sajten visar ID06, AAA och Byggnads-loggor utan text),
   Google-profil och betyg, Facebook.

   FLAGGOR:
   - Telefonen: registret har 070-361 60 03, sajten och Servicefinder har
     070-665 60 03 (samma som ägaren gav Mathias i DM). Sidan visar 070-665 60 03.
   - Formuläret går till mathias@bahkobyra.se (demonyckeln).
   - ALLA BILDER ÄR DERAS EGNA, inget genererat (0 USD). Filmerna och
     jobbilderna är klipp och stillbilder ur deras egna Instagram-reels (720p,
     två reels bara 360p). Tjänstebilderna för golv, tak och kök och
     trappbilden kommer från gbygg24.se: kan vara bildbank, fråga.
   - Hero-filmen: tre egna reels sida vid sida (rivning, golvläggning,
     markarbete), mobilen bara rivningen. Varför-filmen: eget reelklipp
     (laget river golv i en hall) + logokort, i ffmpeg.
   - Före/efter-bilden är deras egen sammansatta reelbild (fönster på en gavel).
   - logo-ljus.png = originalet med de marina delarna omfärgade till vitt.
   =========================================================================== */

const ORTER = ['Malmö', 'Lund', 'Burlöv', 'Staffanstorp', 'Vellinge', 'Lomma', 'Trelleborg', 'Helsingborg'];

export const metadata = {
  title: 'Bygg och renovering i Malmö · Golden Byggservice 24',
  description:
    'Bygg, renovering, rivning, golvläggning, måleri och byggstädning i Malmö och Skåne. Ett företag hela vägen, för privatpersoner och företag. Ring 070-665 60 03 eller begär offert.',
  robots: { index: false, follow: false },
};

const M = '/goldenbygg/media';
const TEL = '070-665 60 03';
const SF = 'https://servicefinder.se/foretag/7185297';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: 'Golden Byggservice 24',
  legalName: 'Golden Byggservice 24 AB',
  url: 'https://www.gbygg24.se/',
  telephone: '+46706656003',
  email: 'info@gbygg24.se',
  taxID: '559445-1816',
  logo: 'https://www.gbygg24.se/wp-content/uploads/2026/08/logo-1024x341.png',
  address: { '@type': 'PostalAddress', addressLocality: 'Malmö', addressRegion: 'Skåne', addressCountry: 'SE' },
  areaServed: ORTER.map((o) => ({ '@type': 'City', name: o })),
  sameAs: ['https://www.instagram.com/gbygg24/', SF],
  makesOffer: ['Renovering', 'Rivning', 'Golvläggning', 'Måleri', 'Takrenovering', 'Köksmontering', 'Snickeri', 'Byggstädning'].map((n) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', name: `${n} i Malmö` },
  })),
};

const data = {
  namn: 'Golden Byggservice 24',
  logo: { src: `${M}/logo.png`, ljus: `${M}/logo-ljus.png`, w: 1200, h: 371, alt: 'Golden Byggservice 24', topp: 'fri' },
  tema: {
    mork: '#0A1A22',
    accent: '#F0A800',
    accentHover: '#D99800',
    accentText: '#7A5200',
    accentLjus: '#F0A800',
    paAccent: '#0F172A',
  },
  kontakt: {
    tel: TEL,
    telHref: 'tel:+46706656003',
    epost: 'info@gbygg24.se',
    adress: 'Malmö och Skåne',
    ig: 'https://www.instagram.com/gbygg24/',
    igHandle: '@gbygg24',
    orgnr: '559445-1816',
  },
  cta: { txt: 'Begär offert', kort: 'Begär offert', lank: 'Begär offert' },
  nav: {
    vanster: [{ href: '#tjanster', txt: 'Tjänster' }, { href: '#jobb', txt: 'Våra jobb' }],
    hoger: [{ href: '#omdomen', txt: 'Omdömen' }, { href: '#fragor', txt: 'Frågor' }],
  },

  hero: {
    ort: 'Malmö',
    tjanster: ['Bygg', 'Renovering'],
    video: `${M}/video-hero.mp4`,
    videoMobil: `${M}/video-hero-mobil.mp4`,
    poster: `${M}/poster-hero.jpg`,
    posterMobil: `${M}/poster-hero-mobil.jpg`,
  },
  tejp: ['Renovering', 'Malmö', 'Golvläggning', 'Lund', 'Rivning', 'Skåne', 'Måleri', 'Byggstädning'],

  tjanster: {
    eyebrow: 'Bygg och renovering i Malmö',
    rubrik: ['Allt inom bygg,', 'från rivning till klart'],
    lead: 'Vi tar små och stora jobb i Malmö och Skåne, för privatpersoner och företag. Här är det vi oftast gör.',
    kort: [
      {
        id: 'renovering',
        namn: 'Renovering och rivning',
        bild: `${M}/tjanst-rivning.jpg`,
        alt: 'Kontorslokal under rivning med öppna väggar och skivor på golvet',
        text: 'Vi river det gamla och bygger upp nytt, från en vägg till en hel lokal med betongplatta.',
        punkter: ['Rivning och bortforsling', 'Stomme och väggar', 'Betongplatta'],
        ritning: (<><path d="M30 105h140" /><path d="M50 105V40h100v65" /><path d="M70 40l20 30-15 35M120 40l-10 25 20 40" /></>),
      },
      {
        id: 'golv',
        namn: 'Golvläggning',
        bild: `${M}/tjanst-golv.jpg`,
        alt: 'Nylagt ljust golv i fiskbensmönster i ett vitt rum',
        text: 'Parkett, laminat, klinker, vinyl eller heltäckningsmatta. Vi lägger alla typer av golv.',
        punkter: ['Parkett och laminat', 'Klinker och vinyl', 'Trappor'],
        ritning: (<><path d="M20 105h160" /><path d="M30 95l30-20 30 20 30-20 30 20 30-20" /><path d="M30 75l30-20 30 20 30-20 30 20 30-20" /></>),
      },
      {
        id: 'tak-fasad',
        namn: 'Tak, fasad och måleri',
        bild: `${M}/tjanst-tak.jpg`,
        alt: 'Hus med ställning och nytt svart tak',
        text: 'Rivning och nytt tak, fasader och målning ute som inne. Från första besiktningen till sista strykningen.',
        punkter: ['Takrenovering', 'Fasad', 'Måleri inne och ute'],
        ritning: (<><path d="M20 70l80-50 80 50" /><path d="M40 60v45h120V60" /><path d="M85 105V80h30v25" /></>),
      },
      {
        id: 'kok-snickeri',
        namn: 'Kök och snickeri',
        bild: `${M}/tjanst-kok.jpg`,
        alt: 'Nymonterat vitt kök med stenskiva och inbyggda vitvaror',
        text: 'Vi monterar kök av alla märken och gör snickeriet runt omkring, från små reparationer till större bygg.',
        punkter: ['Köksmontering', 'Snickeri', 'Byggstädning när vi är klara'],
        ritning: (<><path d="M30 105h140" /><path d="M40 105V60h120v45" /><path d="M40 75h120M80 60v45M120 60v45" /><path d="M50 40h100" /></>),
      },
    ],
  },

  jobb: {
    eyebrow: 'Våra jobb',
    rubrik: ['Riktiga jobb,', 'i Malmö och Skåne'],
    lead: 'Rivning, markarbete, stomme och golv, som vi visar det på Instagram.',
    not: 'Bilderna kommer från vårt eget Instagram och vår hemsida.',
    tid: '60s',
    utvalda: [
      { src: `${M}/utvald-fonster.jpg`, w: 720, h: 960, alt: 'Sammansatt bild ur vår egen film: samma gavel före och efter nya fönster, med ställning', etikett: 'Före och efter', txt: 'Nya fönster på en gavel' },
      { src: `${M}/utvald-trappa.jpg`, w: 720, h: 960, alt: 'Hantverkare i Golden-jacka lägger parkett vid ett fönster', etikett: 'Golv', txt: 'Parkett, bit för bit' },
    ],
    rad1: [
      { src: `${M}/jobb-hall-riven.jpg`, alt: 'Stor tom lokal efter rivning, med skyddat golv', txt: 'Kontor rivet' },
      { src: `${M}/jobb-container.jpg`, alt: 'Grön container och rivningsmassor i en industrihall', txt: 'Bortforsling' },
      { src: `${M}/jobb-markarbete.jpg`, alt: 'Hantverkare med skottkärra på en tomt med sly', txt: 'Markarbete' },
      { src: `${M}/jobb-betongplatta.jpg`, alt: 'Nygjuten betongplatta vid ett tegelhus', txt: 'Färdig betongplatta' },
    ],
    rad2: [
      { src: `${M}/jobb-golv-rum.jpg`, alt: 'Ljust laminatgolv läggs i ett rum med stora fönster', txt: 'Golv läggs' },
      { src: `${M}/jobb-golv-klart.jpg`, alt: 'Färdigt ljust golv i en stor ljus lokal', txt: 'Golvet klart' },
      { src: `${M}/jobb-golv-fonster.jpg`, alt: 'Hantverkare i Golden-jacka arbetar vid ett fönster', txt: 'Noggrant vid fönstret' },
      { src: `${M}/jobb-stomme-klar.jpg`, alt: 'Ljus färdig vägg och tak efter ombyggnad', txt: 'Från stomme till klart' },
      { src: `${M}/jobb-trappa-ek.jpg`, alt: 'Trappa med ljusa trästeg i en vit trappuppgång', txt: 'Trappa i trä' },
    ],
  },

  varfor: {
    eyebrow: 'Varför Golden Byggservice',
    rubrik: ['Tryggt byggt,', 'hela vägen'],
    lead: 'Ett företag för hela jobbet. Vi river, bygger, lägger golv, målar och kan ta byggstädningen på slutet, så du slipper samordna flera hantverkare.',
    punkter: [
      { rubrik: 'Ett företag hela vägen', text: 'Rivning, bygg, golv, måleri och byggstädning hos samma företag.' },
      { rubrik: 'Vi går igenom jobbet först', text: 'Per telefon eller på plats, innan något händer.' },
      { rubrik: 'Inget börjar utan ditt ja', text: 'Vi påbörjar arbetet först när du har godkänt det.' },
      { rubrik: 'Du vet hur det går', text: 'Vi håller dig underrättad hela tiden, tills jobbet är klart.' },
    ],
    video: `${M}/video-varfor.mp4`,
    poster: `${M}/poster-varfor.jpg`,
    videoAlt: 'Vårt lag river ett golv i en industrihall, ur vår egen film. Filmen slutar med Golden Byggservice 24:s logotyp.',
  },

  om: {
    eyebrow: 'Om oss',
    rubrik: ['Byggföretaget', 'från Malmö'],
    kortRad: 'Malmö och Skåne',
    stycken: [
      'Golden Byggservice 24 är ett byggföretag i Malmö. Vi hjälper dig med allt inom bygg, renovering, måleri, fasad, golvläggning och mycket mer, för både privatpersoner och företag.',
      'Vi tar hand om hela jobbet: från första samtalet och planeringen till rivning, bygg och byggstädningen på slutet.',
    ],
    bevis: [
      { ord: 'Malmö', text: 'och resten av Skåne' },
      { ord: 'Privat & företag', text: 'vi hjälper båda' },
      { ord: 'F-skatt', text: 'registrerat aktiebolag' },
    ],
  },

  steg: {
    eyebrow: 'Så går det till',
    rubrik: ['Tre steg,', 'från samtal till klart'],
    lead: 'Så går ett jobb till hos oss.',
    lista: [
      { namn: 'Kontakt', ikon: 'kontakt', text: 'Du hör av dig, och vi går igenom vad du behöver per telefon eller på plats.' },
      { namn: 'Uppdrag', ikon: 'arbete', text: 'Vi börjar när du har godkänt, och håller dig underrättad hela tiden.' },
      { namn: 'Avslut', ikon: 'klart', text: 'Vi gör klart jobbet. Vi vill att du ska vara helt nöjd med resultatet.' },
    ],
  },

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Vad kunderna', 'säger'],
    lista: [
      { namn: 'Grya', betyg: 4, kalla: 'Servicefinder · murreparation och skorsten', lank: SF, text: 'Golden Bygg gjorde ett superjobb, riktigt duktigt hantverk och ett fint resultat. Jag kommer att använda dem till framtida projekt i huset.' },
      { namn: 'Dubravka', betyg: 5, kalla: 'Servicefinder · parkettgolv', lank: SF, text: 'Utmärkt jobb' },
      { namn: 'Dan', betyg: 4, kalla: 'Servicefinder · rivning av glasblocksvägg', lank: SF, text: 'Bra, tydlig kommunikation' },
    ],
    not: 'Omdömena är hämtade ordagrant från Servicefinder, där alla finns med betyg.',
    lank: { href: SF, txt: 'Läs alla på Servicefinder' },
  },

  instagram: {
    eyebrow: 'Instagram',
    rubrik: ['Följ jobben', 'på Instagram'],
    lead: 'Rivning, golv och renoveringar i Malmö och Skåne, direkt från vårt konto.',
    bio: 'Vi hjälper dig med allt inom bygg, renovering, måleri, fasad, golvläggning och mycket mer, för både privatpersoner och företag.',
    koder: ['DWb7YfijNoF', 'DWb8L2FDLyJ', 'DWb4krVDIXA'],
  },

  fragor: {
    eyebrow: 'Vanliga frågor',
    rubrik: ['Det du kanske', 'undrar först'],
    lead: 'Pengar och trygghet först, det praktiska sedan.',
    kort: { rubrik: 'Hittar du inte svaret?', text: 'Ring oss, eller skicka några rader om jobbet.' },
    lista: [
      { q: 'Vad kostar det?', a: 'Det beror på jobbet. Vi går igenom vad du behöver per telefon eller på plats, och du får en offert innan något börjar.' },
      { q: 'Börjar ni innan jag har sagt ja?', a: 'Nej. Vi påbörjar arbetet först när du har godkänt det.' },
      { q: 'Kan jag använda ROT- eller RUT-avdrag?', a: (<>Arbetskostnaden för renovering, reparation och ombyggnad i din bostad ger ofta rätt till ROT-avdrag. Reglerna står hos <a href="https://www.skatteverket.se/privat/fastigheterochbostad/rotarbeteochrutarbete.4.2e56d4ba1202f95012080002966.html" target="_blank" rel="noopener">Skatteverket</a>.</>) },
      { q: 'Var jobbar ni?', a: 'Vi utgår från Malmö och jobbar i hela Skåne, till exempel Lund, Burlöv, Staffanstorp, Vellinge, Lomma, Trelleborg och Helsingborg.' },
      { q: 'Tar ni jobb åt företag också?', a: 'Ja. Vi hjälper både privatpersoner och företag, från en ny trappa hemma till rivning av en hel kontorslokal.' },
      { q: 'Vilka golv lägger ni?', a: 'Alla typer: parkett, laminat, klinker, vinyl och heltäckningsmatta.' },
      { q: 'Kan ni ta byggstädningen?', a: 'Ja. Vi tar bort byggdamm, smuts och skräp och rengör ytor och fönster, så att lokalen kan tas i bruk.' },
      { q: 'Kan jag se tidigare jobb?', a: (<>Ja. Vi visar jobben på <a href="https://www.instagram.com/gbygg24/" target="_blank" rel="noopener">Instagram</a>, och omdömena finns på <a href={SF} target="_blank" rel="noopener">Servicefinder</a>.</>) },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Berätta om', 'ditt jobb'],
    lead: 'Skriv vad som ska göras och var, eller ring. Vi går igenom det med dig innan något börjar.',
    checkar: ['Malmö och hela Skåne', 'Privatpersoner och företag', 'Ett företag hela vägen'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta kort om jobbet',
    placeholder: 'Vad ska göras (t.ex. golv, renovering, rivning) och var (t.ex. Malmö, Lund)',
    kundtyp: ['Privatperson', 'Företag'],
    typer: ['Renovering', 'Golvläggning', 'Rivning', 'Annat bygg'],
    formNot: 'Vi hör av oss så snart vi kan. Inga massutskick, ingen säljlista.',
  },

  popup: {
    rubrik: 'Bygga eller renovera i Malmö?',
    text: 'Berätta om jobbet, så går vi igenom det med dig.',
  },

  footer: {
    text: 'Bygg, renovering, rivning, golvläggning, måleri och byggstädning i Malmö och Skåne. För privatpersoner och företag.',
  },

  modal: {
    rubrik: 'Så här kan Golden Byggservice se ut på nätet',
    text: 'Det här är ett kostnadsfritt förslag, byggt för att fler i Malmö och Skåne som söker bygg och renovering ska höra av sig. Texterna, filmerna och bilderna är era egna, från hemsidan och Instagram. Formuläret landar ännu inte i er inkorg. Vill ni se den skarpt? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.',
  },
};

export default function GoldenbyggDemo() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <DemoSida data={data} />
    </>
  );
}
