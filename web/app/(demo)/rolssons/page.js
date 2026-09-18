import DemoSida from '../_mall/DemoSida';

/* ===========================================================================
   R. OLSSONS MÅLERI AB — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: instagram.com/rolssonsmaleri · Kristinehamn · har hemsida
   (rolssonsmaleri.se, WordPress/Elementor) — Mathias: "hade visst en kass
   sida". Förslaget ska slå den.
   Omklädd till demomallen v3 2026-09-18 (0 credits).

   Bärande idé: deras egen slogan, som står i logotypbilden på sajten:
   "Du får tid, jag förnyar." Kunden slipper helgerna med penseln, och
   trapphuset, fasaden eller rummet blir som nytt. Förvandlingsfilmen visar
   det i ett trapphus, det jobb där BRF och fastighetsbolag är deras kunder.

   VERIFIERAT (rolssonsmaleri.se + IG-bio + Offerta, 2026-09-18):
   Firmanamn "R. Olssons Måleri AB" · org.nr 559286-6981 (sajtens sidfot) ·
   Varnumsleden 5, Kristinehamn · telefon 072-251 08 28 · e-post
   ronny@rolssonsmaleri.se · kontaktperson Ronny Olsson (Offerta) ·
   områden ordagrant: Kristinehamn, Karlskoga, Karlstad, Degerfors och
   Örebro med omnejd · tjänster: inomhusmålning, fasadmålning, tapetsering,
   trapphusmålning, mikrocement · kunder: privatpersoner, företag,
   fastighetsbolag, byggföretag, bostadsrättsföreningar, offentlig
   verksamhet · "kostnadsfri offert", "inledande besök", "Nöjd
   kundgaranti", nära samarbete med ledande färg- och tapetleverantörer ·
   IG-bio: "Allt inom Måleri invändigt & utvändigt utifrån kundens behov
   med stort fokus på kvalitet." · Offerta: 5 stjärnor på 1 omdöme
   (Matilda, Nora, 2026-09-08, citeras ordagrant), ansvarsförsäkring hos
   Trygg-Hansa upp till 10 000 000 kr, F-skatt, medlem sedan 2023, "många
   års erfarenhet i branschen" · Facebook-profil länkad från sajten ·
   egna jobbilder från sajten (tapetsering, trapphus, nymålade rum) ·
   logotypen är deras egen (svart bakgrund bortnycklad, mörk variant gjord
   ur den vita — samma märke).

   INTE verifierat, och finns därför inte på sidan: grundat år, antal
   anställda, antal jobb, priser, Google-betyg. Sajtens ROT-belopp nämns
   inte som siffra — reglerna ändras och det är deras uppgift, inte vår.

   FLAGGOR: riktigt telefon och mejl på sidan — visa inte offentligt.
   Formuläret går till mathias@bahkobyra.se. Ett riktigt omdöme + två
   märkta exempel. Förvandlingsfilmen är en illustration (märkt); heron är
   deras eget trapphusfoto i rörelse, med dörrarnas namnskyltar suddade.
   Fasadkortets bild är en bild från deras sajt som inte är deras eget jobb
   (sprutmålning) — märkt i noten under jobbanden. Instagram: kontot gick
   inte att läsa ut inlägg ur 2026-09-18 (Instagram blockerade), så
   IG-sektionen visar deras egna jobbilder i Instagram-ram — byt till
   riktiga inlägg (koder) när de går att hämta. Loggans sista "S" är
   avklippt i deras egen fil — be om originalet.
   =========================================================================== */

export const metadata = {
  title: 'R. Olssons Måleri AB — målare i Kristinehamn, Karlskoga och Karlstad',
  description:
    'Inomhusmålning, fasadmålning, tapetsering och trapphusmålning i Kristinehamn, Karlskoga, Karlstad, Degerfors och Örebro. Kostnadsfri offert. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

const M = '/rolssons/media';

const data = {
  namn: 'R. Olssons Måleri AB',
  tema: {
    mork: '#0E1A14',
    accent: '#1F7A4D',
    accentHover: '#17623D',
    accentText: '#1A6B43',
    accentLjus: '#6FD39B',
    paAccent: '#fff',
  },
  logo: { src: `${M}/logo-rolssons.png`, w: 1079, h: 809, alt: 'R. Olssons Måleri AB', topp: 'vit' },
  kontakt: {
    tel: '072-251 08 28',
    telHref: 'tel:+46722510828',
    epost: 'ronny@rolssonsmaleri.se',
    adress: 'Varnumsleden 5, Kristinehamn',
    ig: 'https://www.instagram.com/rolssonsmaleri/',
    igHandle: '@rolssonsmaleri',
    fb: 'https://www.facebook.com/profile.php?id=100063985335827',
    orgnr: '559286-6981',
  },
  cta: { txt: 'Få kostnadsfri offert', kort: 'Få offert', lank: 'Få kostnadsfri offert' },
  nav: {
    vanster: [{ href: '#tjanster', txt: 'Tjänster' }, { href: '#jobb', txt: 'Våra jobb' }],
    hoger: [{ href: '#om', txt: 'Om oss' }, { href: '#omdomen', txt: 'Omdömen' }],
  },
  formAction: 'mailto:mathias@bahkobyra.se?subject=R.%20Olssons%20M%C3%A5leri%20-%20offertf%C3%B6rfr%C3%A5gan',

  hero: {
    marke: 'Kristinehamn · Karlskoga · Karlstad',
    h1: ['R. Olssons', { txt: 'Måleri AB', liten: true }],
    ingress: 'Du får tid, vi förnyar. Allt inom måleri, invändigt och utvändigt, med stort fokus på kvalitet.',
    video: `${M}/video-hero-trapphus.mp4`,
    videoMobil: `${M}/video-hero-trapphus-mobil.mp4`,
    poster: `${M}/poster-hero.jpg`,
    posterMobil: `${M}/poster-hero-mobil.jpg`,
    bevis: ['Kostnadsfri offert', 'Nöjd kundgaranti', 'Ansvarsförsäkrade'],
  },

  tjanster: {
    eyebrow: 'Vad vi gör',
    rubrik: ['Allt inom måleri,', 'invändigt och utvändigt'],
    lead: 'Utifrån kundens behov, med stort fokus på kvalitet. Åt privatpersoner, företag, fastighetsbolag och bostadsrättsföreningar.',
    kort: [
      { id: 'inne', namn: 'Inomhusmålning', bild: `${M}/tjanst-inomhus.jpg`, alt: 'Nymålat rum i dov grön kulör med ljust trägolv', text: 'Väggar, tak och snickerier i hem och på kontor. Rätt förarbete, rätt färg och känsla för detaljer.', punkter: ['Väggar och tak', 'Snickerier och dörrar', 'Mikrocement'], ritning: (<><path d="M30 26h140v72H30z" /><path d="M30 62h140" /><path d="M64 26v72M100 26v72M136 26v72" /></>) },
      { id: 'fasad', namn: 'Fasadmålning', bild: `${M}/tjanst-fasad.jpg`, alt: 'Målare sprutmålar en ljus putsad vägg', text: 'Många väntar för länge med fasaden, och då blir jobbet både dyrare och större. Vi målar i tid och enligt konstens alla regler.', punkter: ['Träfasad', 'Putsfasad', 'Fönster och detaljer'], ritning: (<><path d="M20 100V44l80-30 80 30v56" /><path d="M20 100h160" /><path d="M56 60h20v20H56zM124 60h20v20h-20z" /></>) },
      { id: 'tapet', namn: 'Tapetsering', bild: `${M}/tjanst-tapet.jpg`, alt: 'Rum med mönstrad tapet, trägolv och en svart kamin', text: 'Raka skarvar, mönster som stämmer och väggar som är förberedda innan första våden. Små och stora projekt.', punkter: ['Tapetborttagning', 'Förarbete av väggar', 'Mönster och fondväggar'], ritning: (<><path d="M40 20h120v84H40z" /><path d="M80 20v84M120 20v84" /><path d="M48 40c8-8 16 8 24 0M88 40c8-8 16 8 24 0M128 40c8-8 16 8 24 0M48 72c8-8 16 8 24 0M88 72c8-8 16 8 24 0M128 72c8-8 16 8 24 0" /></>) },
      { id: 'trapphus', namn: 'Trapphusmålning', bild: `${M}/tjanst-trapphus.jpg`, alt: 'Nymålat trapphus med räcke i trä och en röd vägg', text: 'Trapphuset är det första den som besöker huset ser. Vi målar för BRF, fastighetsbolag och byggföretag med färg som tål slitaget.', punkter: ['Bostadsrättsföreningar', 'Fastighetsbolag', 'Byggföretag'], ritning: (<><path d="M20 104h40V84h30V64h30V44h30V24h30" /><path d="M20 104h160" /><path d="M30 94l140-80" /></>) },
    ],
  },

  jobb: {
    eyebrow: 'Våra jobb',
    rubrik: ['Rum och trapphus', 'vi har förnyat'],
    lead: 'Tapet, kulör och trapphus, fotograferade efter att vi packat ihop.',
    not: 'Bilderna i banden är från våra egna jobb. Bilden på fasadkortet är en illustration.',
    tid: '70s',
    rad1: [
      { src: `${M}/jobb-trappa-tapet.jpg`, alt: 'Trappa med mönstrad tapet och vitmålat räcke', txt: 'Tapet längs trappan' },
      { src: `${M}/jobb-olivgront-rum.jpg`, alt: 'Nymålat rum i olivgrönt med trägolv och balkongdörr', txt: 'Olivgrönt, från tak till golv' },
      { src: `${M}/jobb-kok-tapet.jpg`, alt: 'Kök med nytapetserad vägg i grönt bladmönster', txt: 'Köksvägg med bladmönster' },
      { src: `${M}/jobb-trappa-ovan.jpg`, alt: 'Vitmålad trappa sedd ovanifrån med trästeg och ledstång', txt: 'Trappa i vitt och trä' },
      { src: `${M}/jobb-morkblatt-rum.jpg`, alt: 'Rum målat i mörkblått runt ett fönster', txt: 'Mörka väggar, jämn hand' },
    ],
    rad2: [
      { src: `${M}/jobb-vit-trappa.jpg`, alt: 'Vit trappvägg med profilerade speglar och trappsteg i trä', txt: 'Snickerier längs trappan' },
      { src: `${M}/jobb-ljust-rum.jpg`, alt: 'Ljusgrått nymålat rum med två fönster', txt: 'Ljust och lugnt' },
      { src: `${M}/jobb-gratt-rum.jpg`, alt: 'Nymålat rum i grått med fönster', txt: 'Omålat till klart' },
      { src: `${M}/jobb-tomt-rum.jpg`, alt: 'Nymålat tomt rum med vita väggar och laminatgolv', txt: 'Redo för inflyttning' },
    ],
  },

  varfor: {
    eyebrow: 'Varför R. Olssons',
    rubrik: ['Personligt,', 'och noggrant'],
    lead: 'Ett trapphus som är slitet säger något om hela huset. Skillnaden är en målare som gör förarbetet och inte har bråttom.',
    punkter: [
      { rubrik: 'Du får tid, vi förnyar', text: 'Du lägger inte helgerna på stegen. Vi tar hand om hela jobbet.' },
      { rubrik: 'Nöjd kundgaranti', text: 'Vi lämnar inte projektet förrän du är nöjd, och har ansvarsförsäkring på tio miljoner kronor.' },
      { rubrik: 'Färg och tapet av kvalitet', text: 'Nära samarbete med ledande leverantörer, för bättre val, pris och garanti.' },
      { rubrik: 'Ärliga råd', text: 'Räcker det att bättringsmåla säger vi det, även när en ommålning hade gett oss mer betalt.' },
    ],
    video: `${M}/video-varfor-forvandling.mp4`,
    poster: `${M}/poster-varfor.jpg`,
    videoAlt: 'Ett slitet trapphus med märken på väggarna målas om till ljust och fräscht. Filmen slutar med R. Olssons logotyp.',
    not: 'Filmen är en illustration av ett trapphusjobb.',
  },

  om: {
    eyebrow: 'Om R. Olssons',
    rubrik: ['Måleri i Värmland', 'och Bergslagen'],
    kortRad: 'Kristinehamn',
    stycken: [
      'R. Olssons Måleri AB är en målerifirma i Kristinehamn med många års erfarenhet i branschen. Vi målar och tapetserar inne och ute i Kristinehamn, Karlskoga, Karlstad, Degerfors och Örebro med omnejd.',
      'Du har en kontakt hela vägen, Ronny. Vi kommer ut på ett inledande besök, lämnar en kostnadsfri offert och lämnar inte jobbet förrän du är nöjd.',
    ],
    bevis: [
      { ord: '10 MSEK', text: 'ansvarsförsäkring hos Trygg-Hansa' },
      { ord: 'Fem orter', text: 'från Karlstad till Örebro' },
      { ord: 'Nöjd kund', text: 'garanti på varje jobb' },
    ],
  },

  steg: {
    eyebrow: 'Så går det till',
    rubrik: ['Fem steg, och offerten', 'kostar ingenting'],
    lead: 'Personligt, lyhört och utan överraskningar.',
    lista: [
      { namn: 'Hör av dig', text: 'Ring eller skriv några rader om vad som ska målas. Du behöver inte kunna facktermerna.' },
      { namn: 'Inledande besök', text: 'Vi tittar på ytorna, pratar färg och tapet och ser vad som behöver förarbetas.' },
      { namn: 'Kostnadsfri offert', text: 'Du får priset innan något börjar. Offerten kostar ingenting.' },
      { namn: 'Vi målar', text: 'Förarbete, täckning och färg av kvalitet. Du får tiden, vi förnyar.' },
      { namn: 'Nöjd kund', text: 'Vi går igenom resultatet med dig och lämnar inte förrän du är nöjd.' },
    ],
  },

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Vad kunderna', 'säger'],
    lista: [
      { namn: 'Matilda', kalla: 'Målning och tapetsering, Nora · Offerta', text: 'Personligt engagemang, lyhörd för önskemål och ett jättefint resultat. Vi är så nöjda! Tack så mycket R. Olssons Måleri AB' },
      { namn: 'Bostadsrättsförening', kalla: 'Karlstad', exempel: true, text: 'Här står ett riktigt omdöme från en kund, med namn och ort som de själva skrivit det.' },
      { namn: 'Villaägare', kalla: 'Kristinehamn', exempel: true, text: 'Ett tredje kort, hämtat ur er Google-profil när den är på plats.' },
    ],
    not: 'Första omdömet är från Offerta, som det står där. De två andra är exempel — byts mot era riktiga omdömen.',
    lank: { href: 'https://offerta.se/foretag/r-olssons-maleri-ab', txt: 'Se omdömet på Offerta' },
  },

  instagram: {
    eyebrow: 'Instagram',
    rubrik: ['Följ jobben', 'i vardagen'],
    lead: 'Tapet, trapphus och nymålade rum, som vi visar dem på Instagram.',
    bio: 'Allt inom måleri invändigt och utvändigt',
    kort: [
      { bild: `${M}/ig-barnrum-tapet.jpg`, alt: 'Barnrum med mönstrad tapet och vit spjälsäng', text: 'Nytapetserat barnrum, mönstret passat vid varje skarv.' },
      { bild: `${M}/ig-kok-tapet.jpg`, alt: 'Kök under renovering med nytapetserad vägg', text: 'Köket tar form. Tapeten sitter, snart är snickerierna på plats.' },
      { bild: `${M}/ig-gron-tapet.jpg`, alt: 'Rum med mörkgrön tapet under två fönster', text: 'Mörkgrön tapet som ger rummet djup.' },
    ],
  },

  fragor: {
    eyebrow: 'Vanliga frågor',
    rubrik: ['Det ni brukar', 'fråga först'],
    lead: 'Pris och försäkring först, det praktiska sedan.',
    kort: { rubrik: 'Hittar du inte svaret?', text: 'Ring Ronny och fråga rakt ut. Du får ett ärligt svar om vad som behöver göras.' },
    lista: [
      { q: 'Vad kostar det att måla om?', a: 'Det beror på ytorna och skicket. Vi kommer gärna ut på ett inledande besök, och offerten kostar ingenting.' },
      { q: 'Hur går det till?', a: 'Du hör av dig, vi tittar på plats, du får en kostnadsfri offert, vi målar och går igenom resultatet med dig innan vi lämnar.' },
      { q: 'Målar ni trapphus åt bostadsrättsföreningar?', a: 'Ja. Trapphus är en stor del av vårt arbete, åt BRF, fastighetsbolag och byggföretag.' },
      { q: 'Kan jag använda ROT-avdrag?', a: 'Målning och tapetsering i din bostad ger ofta rätt till ROT. Vi säger vad som gäller ditt jobb när vi har sett det.' },
      { q: 'Är ni försäkrade?', a: 'Ja. Vi har ansvarsförsäkring hos Trygg-Hansa upp till tio miljoner kronor, F-skatt och en nöjd kundgaranti.' },
      { q: 'Gör ni mikrocement?', a: 'Ja, utöver måleri och tapetsering. Hör av dig och berätta vilken yta det gäller.' },
      { q: 'När ska fasaden målas om?', a: 'Innan färgen släpper. Många väntar för länge, och då blir jobbet både större och dyrare. Vi tittar gärna och säger ärligt om det kan vänta.' },
      { q: 'Var arbetar ni?', a: 'Kristinehamn, Karlskoga, Karlstad, Degerfors och Örebro med omnejd.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Vad ska målas,', 'och när?'],
    lead: 'Ring eller skriv några rader. Vi kommer gärna ut på ett inledande besök, och offerten kostar ingenting.',
    checkar: ['Kostnadsfri offert', 'Inledande besök på plats', 'Nöjd kundgaranti'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta kort om jobbet',
    placeholder: 'Vad som ska målas, ungefär hur stort, var och när du vill ha det klart',
    formNot: 'Skriv kort om jobbet, då kan vi ge ett vettigt svar redan i första samtalet. Inga massutskick, ingen säljlista.',
  },

  popup: {
    rubrik: 'Trött på väggarna?',
    text: 'Ronny kommer gärna ut och tittar. Offerten kostar ingenting, och du bestämmer efteråt.',
  },

  footer: {
    text: 'Du får tid, vi förnyar. Allt inom måleri invändigt och utvändigt i Kristinehamn, Karlskoga, Karlstad, Degerfors och Örebro med omnejd.',
  },

  modal: {
    rubrik: 'Så här kan R. Olssons Måleri se ut på nätet',
    text: 'Det här är ett kostnadsfritt förslag, byggt på det ni själva visar på rolssonsmaleri.se, Offerta och Instagram, med era egna jobbilder. Ingen beställning, inget åtagande. Vill ni se den skarpt med ett formulär som landar i inkorgen? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.',
  },
};

export default function RolssonsDemo() {
  return <DemoSida data={data} />;
}
