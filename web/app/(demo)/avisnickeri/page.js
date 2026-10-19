import DemoSida from '../_mall/DemoSida';

/* ===========================================================================
   AVISNICKERI.AB — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: instagram.com/avisnickeri.ab · snickeri och renovering i Stockholm
   (Älvsjö enligt bion) · INGEN hemsida hittad. Byggd 2026-10-19 på demomallen
   v3 (kanon: swedcro, närmast förebild: roosbygg).

   Bärande idé: snickeriet är hantverket som syns. Kök, bastu, altan, parkett
   och platsbyggda hyllor: samma snickare från rivning till sista listen.
   Varför-filmen visar deras egen nya entré och altan.

   VERIFIERAT (2026-10-19):
   - Instagram @avisnickeri.ab (skärmbild från Mathias + embed utan inloggning):
     namn "Avisnickeri.ab", kategori Flerbostadshus, 109 inlägg, 319 följare.
     Bio: "Dags att fräscha upp hemmet? Vi gör allt inom renovering – kök,
     badrum, parkett, altan & rivning. Kontakta oss!" · plats "älvsjö,
     Stockholm" · TikTok @erdit.metaj.
   - Egen grafik (IG DcePNbpjqoy): logotypen, "SNICKERI · RENOVERING ·
     BYGGSERVICE", tel 0737253970 och 0790340652 · andra bilden: "Kvalitet och
     noggrannhet i varje detalj", "Snickeriarbeten, Renovering, Montering,
     Byggservice", "Kontakta oss för kostnadsfri offert", "Pålitligt,
     Erfarenhet, Nöjda kunder".
   - Inlägg: DenEwpDOKPA (2026-10-17, #bastur: bastu/badrum i trä),
     DeFSE_QuMZK (2026-10-04, #altan), DdO1qn-DEnY (2026-09-13: fasad,
     fönsterfoder, entrédörr, altan, invändigt), DcgKYHbDLqF (2026-08-26: kök
     före/efter, ny bänkskiva och kakel), DceJTKCs8Yd (vitt kök). Äldre rutor i
     profilrutnätet: staket, attefallshus/bod, ribbvägg, takfönster i tegeltak,
     belysta platsbyggda hyllor, ekparkett i hall.
   - Bolagsverket via allabolag/syna/hitta/eniro: avisnickeri.ab Aktiebolag,
     org.nr 559577-3358, registrerat 2026-03-18, säte Järfälla (Aspnäsvägen 14),
     F-skatt och moms, SNI 43320 byggnadssnickeri m.fl., verksamhet "snickeri
     renovering". Vice VD heter som TikTok-kontot (erdit.metaj).
   - Servicefinder (servicefinder.se/foretag/9620420): 4,8 av 5 från 5
     utvärderingar, "inte aktivt". Omdömestexterna går inte att läsa ut, därför
     exempelkort på sidan och inget betyg.

   INTE verifierat, och finns därför inte på sidan: grundår före 2026, antal
   projekt, garantier, priser, ledtider, öppettider, e-post, Google-profil,
   Facebook, verksamhet i Skåne (står bara i IG:s platsrad), ägarens namn i
   texten.

   FLAGGOR: formuläret går till mathias@bahkobyra.se (demonyckeln). Hero-filmen
   är GENERERAD (Higgsfield Wan 3.0 Prime bild-till-film, 1080p, 6 s, utan
   ljud) ur en stillbild från deras egen bastu-reel (DenEwpDOKPA): liggande =
   låst kamera med vind i träden, stående = långsam inåtglidning, båda spelade
   fram och tillbaka. Rummet är deras, rörelsen är genererad.
   LOGOTYPEN är frilagd ur deras egen IG-grafik (1024 px raster) — be om
   originalfilen. Fem jobbilder (attefall, ribbvägg, takfönster, hyllor,
   parkett) är beskurna ur profilrutnätet i Mathias skärmbild och har låg
   upplösning (314 px) — byt mot originalen.
   =========================================================================== */

export const metadata = {
  title: 'Avisnickeri.ab — snickeri och renovering i Stockholm',
  description:
    'Snickeri och renovering i Stockholm: kök, badrum och bastu, parkett, altan och rivning. Kostnadsfri offert. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

const M = '/avisnickeri/media';

const data = {
  namn: 'Avisnickeri.ab',
  tema: {
    mork: '#0B0B0C',
    accent: '#D0121E',
    accentHover: '#B00E1A',
    accentText: '#B00E1A',
    accentLjus: '#FF5C5C',
    paAccent: '#fff',
  },
  logo: { src: `${M}/logo-avisnickeri.png`, w: 860, h: 282, alt: 'Avisnickeri.ab', topp: 'fri', ljus: `${M}/logo-avisnickeri-ljus.png` },
  kontakt: {
    tel: '073-725 39 70',
    telHref: 'tel:+46737253970',
    ig: 'https://www.instagram.com/avisnickeri.ab/',
    igHandle: '@avisnickeri.ab',
    orgnr: '559577-3358',
  },
  cta: { txt: 'Begär kostnadsfri offert', kort: 'Begär offert', lank: 'Begär offert' },
  nav: {
    vanster: [{ href: '#tjanster', txt: 'Tjänster' }, { href: '#jobb', txt: 'Våra jobb' }],
    hoger: [{ href: '#om', txt: 'Om oss' }, { href: '#fragor', txt: 'Frågor' }],
  },

  hero: {
    ort: 'Stockholm',
    tjanster: ['Snickeri', 'Renovering'],
    video: `${M}/video-hero.mp4`,
    videoMobil: `${M}/video-hero-mobil.mp4`,
    poster: `${M}/poster-hero.jpg`,
    posterMobil: `${M}/poster-hero-mobil.jpg`,
  },
  tejp: ['Kök', 'Badrum', 'Bastu', 'Parkett', 'Altan', 'Rivning', 'Snickeri', 'Älvsjö'],

  tjanster: {
    eyebrow: 'Vad vi gör',
    rubrik: ['Allt inom renovering,', 'byggt för hand'],
    lead: 'Kök, badrum, parkett, altan och rivning. Det mesta i ett hem som behöver fräschas upp, och snickerierna som gör att det känns färdigt.',
    kort: [
      { id: 'kok', namn: 'Kök', bild: `${M}/tjanst-kok.jpg`, alt: 'Kök med ny bänkskiva i massivt trä, vitt kakel och ekgolv', text: 'Från rivning till nya bänkskivor och kakel. Vi bygger om köket så att det fungerar för dig.', punkter: ['Rivning av gammalt kök', 'Bänkskivor och kakel', 'Montering av skåp'], ritning: (<><path d="M20 100V60h160v40" /><path d="M20 60h160M60 60v40M120 60v40" /><path d="M30 40h50v10H30zM120 30h40v20h-40z" /></>) },
      { id: 'badrum', namn: 'Badrum & bastu', bild: `${M}/tjanst-badrum.jpg`, alt: 'Bastu med träpanel och bänk i trä bakom en glasvägg', text: 'Badrum och bastu med träpanel, bänkar och glas. Som bastun vi byggde med utsikt mot altanen.', punkter: ['Bastu i trä', 'Badrumsrenovering', 'Panel och bänkar'], ritning: (<><path d="M24 100V24h152v76" /><path d="M24 70h100v30M24 50h100" /><path d="M140 24v76" /></>) },
      { id: 'altan', namn: 'Altan & fasad', bild: `${M}/tjanst-altan.jpg`, alt: 'Ny altan i trä framför en ljusgrå träfasad', text: 'Ny altan, fönsterfoder och fasaddetaljer. Utomhusjobben som gör huset helt igen.', punkter: ['Altan i trä', 'Fönsterfoder och dörrar', 'Staket och bodar'], ritning: (<><path d="M20 90h160M30 90l10-20h120l10 20" /><path d="M50 70V30h100v40" /><path d="M90 70V45h20v25" /></>) },
      { id: 'parkett', namn: 'Golv & parkett', bild: `${M}/tjanst-parkett.jpg`, alt: 'Ekparkett i en ljus hall med vita dörrar', text: 'Parkett i hall, kök och vardagsrum, med lister och trösklar som sitter rätt.', punkter: ['Ekparkett', 'Lister och trösklar', 'Rivning av gamla golv'], ritning: (<><path d="M20 100h160" /><path d="M20 100l30-30h50l-30 30M70 100l30-30h50l-30 30M120 100l30-30h30" /></>) },
    ],
  },

  jobb: {
    eyebrow: 'Våra jobb',
    rubrik: ['Gjort i Stockholm,', 'fotat på plats'],
    lead: 'Kök, bastu, fasad och snickerier, som vi visar dem på Instagram.',
    not: 'Alla bilder är från våra egna projekt på Instagram.',
    tid: '70s',
    rad1: [
      { src: `${M}/jobb-kok-fore.jpg`, alt: 'Kök innan renoveringen med gammal ljus bänkskiva', txt: 'Köket före' },
      { src: `${M}/jobb-bankskiva.jpg`, alt: 'Ny bänkskiva i massivt trä mot vitt kakel', txt: 'Ny bänkskiva' },
      { src: `${M}/jobb-kakel.jpg`, alt: 'Vitt kakel och svart blandare ovanför träbänkskivan', txt: 'Kakel och blandare' },
      { src: `${M}/jobb-vitt-kok.jpg`, alt: 'Ljust kök med vita luckor och svart bänkskiva', txt: 'Vitt kök' },
      { src: `${M}/jobb-badrum.jpg`, alt: 'Badrum i trä med tvättställ, belyst nisch och glasvägg', txt: 'Badrum i trä' },
      { src: `${M}/jobb-entre-altan.jpg`, alt: 'Ny entrédörr med vitt foder och altan i trä', txt: 'Entré och altan' },
    ],
    rad2: [
      { src: `${M}/jobb-attefall.jpg`, alt: 'Litet hus med ljus träpanel på en tomt', txt: 'Attefallshus' },
      { src: `${M}/jobb-ribbvagg.jpg`, alt: 'Lång vägg med mörka träribbor under montering', txt: 'Ribbvägg' },
      { src: `${M}/jobb-takfonster.jpg`, alt: 'Nytt takfönster i ett rött tegeltak', txt: 'Takfönster' },
      { src: `${M}/jobb-belyst-hylla.jpg`, alt: 'Platsbyggd hylla med inbyggd belysning ovanför skåp', txt: 'Belysta hyllor' },
      { src: `${M}/jobb-dorr-insida.jpg`, alt: 'Ny dörr med glasruta sedd inifrån rummet', txt: 'Ny dörr' },
      { src: `${M}/jobb-rum.jpg`, alt: 'Ljust rum efter renovering med radiator och skrivbord', txt: 'Rummet klart' },
    ],
  },

  varfor: {
    eyebrow: 'Varför Avisnickeri.ab',
    rubrik: ['Noggrannhet', 'i varje detalj'],
    lead: 'Ett kök, en bastu eller ett fönsterfoder: det är detaljerna som avgör om ett jobb ser färdigt ut. Vi river, bygger och snickrar själva, så samma händer tar jobbet hela vägen.',
    punkter: [
      { rubrik: 'Från rivning till list', text: 'Vi river det gamla och bygger det nya, så du har en kontakt för hela jobbet.' },
      { rubrik: 'Snickare i grunden', text: 'Bastu, platsbyggda hyllor och ribbväggar: snickerierna gör vi själva.' },
      { rubrik: 'Ärligt besked', text: 'Räcker det att byta bänkskiva och kakel säger vi det, i stället för att sälja ett helt nytt kök.' },
      { rubrik: 'Kostnadsfri offert', text: 'Du vet vad jobbet kostar innan du bestämmer dig.' },
    ],
    video: `${M}/video-varfor.mp4`,
    poster: `${M}/poster-varfor.jpg`,
    videoAlt: 'Långsam inzoomning mot en ny entrédörr och altan i trä. Filmen slutar med Avisnickeri.abs logotyp.',
  },

  om: {
    eyebrow: 'Om Avisnickeri.ab',
    rubrik: ['Dags att fräscha', 'upp hemmet?'],
    kortRad: 'Älvsjö · Stockholm',
    stycken: [
      'Avisnickeri.ab är ett snickeri- och renoveringsföretag i Stockholm. Vi gör allt inom renovering: kök, badrum, parkett, altan och rivning, och snickerierna däremellan.',
      'Det senaste vi byggt syns på Instagram: en bastu i trä med utsikt mot altanen, ett kök med ny bänkskiva och kakel, och en fasad med nya fönsterfoder, entrédörr och altan.',
    ],
    bevis: [
      { ord: 'F-skatt', text: 'registrerat aktiebolag' },
      { ord: 'Kostnadsfri', text: 'offert på ditt jobb' },
      { ord: 'Snickeri', text: 'renovering och byggservice' },
    ],
  },

  steg: {
    eyebrow: 'Så går det till',
    rubrik: ['Från första samtalet', 'till färdigt jobb'],
    lead: 'Tre steg, och du vet vad som händer i varje.',
    lista: [
      { namn: 'Hör av dig', text: 'Ring eller skicka några rader om vad du vill få gjort, och var.', ikon: 'kontakt' },
      { namn: 'Kostnadsfri offert', text: 'Vi tittar på jobbet och du får en offert. Den kostar ingenting.', ikon: 'offert' },
      { namn: 'Vi bygger', text: 'Vi river, bygger och snickrar tills det är klart.', ikon: 'klart' },
    ],
  },

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Vad kunderna', 'säger'],
    lista: [
      { namn: 'Villaägare', kalla: 'Bastu och badrum', exempel: true, text: 'Här står ett riktigt omdöme från en kund, med namn och ort som de själva skrivit det.' },
      { namn: 'Bostadsrättsägare', kalla: 'Kök', exempel: true, text: 'Ett andra kort, hämtat ur er Google-profil när den är på plats.' },
      { namn: 'Husägare', kalla: 'Altan och fasad', exempel: true, text: 'Ett tredje kort. Tre riktiga omdömen räcker för att sidan ska kännas sann.' },
    ],
    not: 'Exempel — byts mot era riktiga omdömen.',
  },

  instagram: {
    eyebrow: 'Instagram',
    rubrik: ['Följ jobben', 'på Instagram'],
    lead: 'Det senaste från vårt konto, direkt från Instagram.',
    bio: 'Dags att fräscha upp hemmet? Vi gör allt inom renovering – kök, badrum, parkett, altan & rivning.',
    koder: ['DenEwpDOKPA', 'DcgKYHbDLqF', 'DdO1qn-DEnY'],
  },

  fragor: {
    eyebrow: 'Vanliga frågor',
    rubrik: ['Det ni brukar', 'fråga först'],
    lead: 'Pengar och risk först, det praktiska sedan.',
    kort: { rubrik: 'Hittar du inte svaret?', text: 'Ring och fråga. Vi säger vad som gäller för just ditt jobb.' },
    lista: [
      { q: 'Vad kostar en renovering?', a: 'Det beror på hur stort jobbet är och vad som ska göras. Skicka några rader eller ring, så får du en offert på just ditt jobb.' },
      { q: 'Kostar offerten något?', a: 'Nej, offerten är kostnadsfri. Du bestämmer dig när du vet vad som ingår.' },
      { q: 'Kan jag använda ROT-avdrag?', a: (<>Arbete på din bostad ger ofta rätt till ROT-avdrag på arbetskostnaden. Reglerna står hos <a href="https://www.skatteverket.se/privat/fastigheterochbostad/rotarbeteochrutarbete.4.2e56d4ba1202f95012080002966.html" target="_blank" rel="noopener">Skatteverket</a>.</>) },
      { q: 'Har ni F-skatt?', a: 'Ja. Avisnickeri.ab är ett aktiebolag registrerat för F-skatt och moms.' },
      { q: 'Tar ni hand om rivningen också?', a: 'Ja. Vi river det gamla köket, golvet eller badrummet innan vi bygger nytt.' },
      { q: 'Bygger ni bastu?', a: 'Ja. Senast byggde vi en bastu i trä med panel, bänkar och glasvägg.' },
      { q: 'Tar ni mindre jobb?', a: 'Ja. Ett fönsterfoder, en hylla eller en ny dörr är också ett jobb.' },
      { q: 'Var arbetar ni?', a: 'I Stockholm. Vi utgår från Älvsjö.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Berätta vad du vill göra,', 'offerten kostar inget'],
    lead: 'Skicka några rader om jobbet och var det ligger, eller ring. Du får en offert på just ditt jobb.',
    checkar: ['Kostnadsfri offert', 'Kök, badrum, golv och altan', 'Stockholm'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta kort om jobbet',
    placeholder: 'Ort, vad som ska göras (kök, badrum, altan …) och ungefär när',
    formNot: 'Skriv kort om jobbet, då kan vi ge ett vettigt svar redan i första samtalet. Inga massutskick, ingen säljlista.',
  },

  popup: {
    rubrik: 'Dags att fräscha upp hemmet?',
    text: 'Offerten kostar ingenting. Du får veta vad det blir innan du bestämmer dig.',
  },

  footer: {
    text: 'Snickeri och renovering i Stockholm: kök, badrum och bastu, parkett, altan och rivning.',
  },

  modal: {
    rubrik: 'Så här kan Avisnickeri.ab se ut på nätet',
    text: 'Det här är ett kostnadsfritt förslag, byggt på det ni själva visar på Instagram, med era egna projektfoton. Ingen beställning, inget åtagande. Vill ni se den skarpt med ett formulär som landar i er inkorg? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.',
  },
};

export default function AvisnickeriDemo() {
  return <DemoSida data={data} />;
}
