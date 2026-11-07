import DemoSida from '../_mall/DemoSida';

/* ===========================================================================
   ROOS BYGG — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: instagram.com/roosbygg · byggföretag med kontor i Borlänge, uppdrag i
   Uppsala och Dalarna · HAR hemsida (roosbygg.com, Wix-mall med flera
   oredigerade mallsidor). Byggd 2026-10-19 på demomallen v3 (kanon: swedcro,
   närmast förebild: stobytak).

   Bärande idé: du bestämmer själv hur mycket inblick du vill ha i projektet
   (deras egen mening på roosbygg.com: "Du får så mycket eller lite inblick i
   projektet som du vill"). Varför-filmen visar ett av deras egna takbyten.

   VERIFIERAT (2026-10-19):
   - roosbygg.com (start, /about-3, /faq, /contact, sitemap): namnet ROOS BYGG ·
     titel "Byggföretag i Uppsala & Dalarna" · "Tak", "Tillbyggnation ¤
     Ombyggnation" · "Oavsett vad så hjälper vi på ROOS BYGG gärna till. Du får
     så mycket eller lite inblick i projektet som du vill." · "arbetsprocess som
     består av Kvalitet, Säkerhet och en nöjd kund i slutresultat" · meta:
     "trygg renovering och nybyggnation", "Fackmannamässigt takbyte i Dalarna
     och Uppsala. Boka kostnadsfri offert" · takbyte "vare sig det är tegel
     eller plåttak", "Sadeltak och Pulpettak", "Övriga tak: Kontakta oss för
     offert på just ditt tak" · FAQ-kategorier Kundservice, Altan och Uteplats,
     Renovering, Takbyte och Takrenovering, Tillbyggnad och Ombyggnad ·
     tel 073 817 81 31 · kontor Tången 7, Borlänge (adressen står inte på
     sidan).
   - Instagram @roosbygg (embed utan inloggning, 2026-10-19): namn ROOS BYGG,
     448 följare, 5 inlägg, ingen bio. Grafik i inlägget Dc4HSGBDRi8: logotypen
     och "Bygger för en bättre vardag". Inläggen: Dc4HSGBDRi8 (2026-09-04,
     ishallsförrådet åt Kvarnsveden Hockey: målat om, platsbyggda bänkar och
     förvaring, snickerier; e-post info@roosbygg.com i bildtexten),
     DTvUBmNgkEk (fiskbensparkett i hall och sovrum, som ledde till 60x60
     klinker i entrén), DTu51XqAg-A (reklamförråd utbyggt på höjden åt
     Kvarnsveden Hockey; "Har själv hängt upp reklam för att sponsra
     föreningen"), DRKnTvJgiUZ (Borlänge: nya innerväggar i dränerad källare,
     stålreglar, icke-organisk isolering, luftspalt), DQXeZ-QAq9p (Borlänge
     kommun: "Takbyte slutfört hos en väldigt nöjd återkommande kund").
   - roosbygg.com har MX hos Google, så info@roosbygg.com är en riktig
     brevlåda. (Sajten själv anger roosbygg@gmail.com, banderollen
     inforoosbygg@gmail.com. Den nyaste, egna domänen används.)
   - Alla stillbilder och filmer är deras egna foton (roosbygg.com/Wix-media +
     IG-embed).

   INTE verifierat, och finns därför inte på sidan: org.nr och bolagsform (inget
   registerträff matchar Borlänge: Roos Bygg AB 559594-6103 = Horn, Roos Bygg
   & Fastighets AB = Köping, Roos Byggvisioner AB = Leksand, annat telefonnr),
   grundår, ägarens namn, priser (sajten säger både "från 800 kr/m2" och
   "Takbyte från 1200kr/m2", motsägelsefullt, utelämnat), öppettider (sajtens
   rad är halvt kvar från mallen), garantier, antal projekt, Google-profil och
   omdömen, altanprojekt (bara en FAQ-rubrik, inga bilder), Facebook.

   FLAGGOR: formuläret går till mathias@bahkobyra.se (demonyckeln). Hero-filmen
   är GENERERAD (Higgsfield, Wan 3.0 Prime bild-till-film, 1080p, 6 s, utan ljud,
   0,67 USD) ur deras eget foto av takbytet i Borlänge: lugn kameraglidning och
   träd i vind, spelad fram och tillbaka till en 12 s slinga. Mobil = samma klipp
   beskuret till 9:16. Huset är deras, rörelsen är genererad.
   LOGOTYPEN är återskapad som vektor av oss ur deras egen grafik (IG-inlägget
   Dc4HSGBDRi8 och profilbilden): R-märket spårat, texten satt i Montserrat.
   Be om originalfilen. Accent = logotypens röda #D80E22, resten svart-vitt.
   Omdömena är exempelkort. Jobbilderna "förvaring" och de två källarbilderna är
   uppskalade från 768–900 px.
   =========================================================================== */

export const metadata = {
  title: 'ROOS BYGG — takbyte, tillbyggnad och renovering i Dalarna och Uppsala',
  description:
    'Byggföretag med kontor i Borlänge. Takbyte i tegel eller plåt, tillbyggnad, ombyggnad, golv och renovering i Dalarna och Uppsala. Kostnadsfri offert. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

const M = '/roosbygg/media';

const data = {
  namn: 'ROOS BYGG',
  tema: {
    mork: '#0D0D0F',
    accent: '#D80E22',
    accentHover: '#B80C1D',
    accentText: '#B80C1D',
    accentLjus: '#FF7A7A',
    paAccent: '#fff',
  },
  logo: { src: `${M}/logo-roosbygg.png`, w: 902, h: 607, alt: 'ROOS BYGG', topp: 'vit', ljus: `${M}/logo-roosbygg-ljus.png` },
  kontakt: {
    tel: '073 817 81 31',
    telHref: 'tel:+46738178131',
    epost: 'info@roosbygg.com',
    ig: 'https://www.instagram.com/roosbygg/',
    igHandle: '@roosbygg',
  },
  cta: { txt: 'Begär kostnadsfri offert', kort: 'Begär offert', lank: 'Begär offert' },
  nav: {
    vanster: [{ href: '#tjanster', txt: 'Tjänster' }, { href: '#jobb', txt: 'Våra jobb' }],
    hoger: [{ href: '#om', txt: 'Om oss' }, { href: '#fragor', txt: 'Frågor' }],
  },

  hero: {
    ort: 'Uppsala & Dalarna',
    tjanster: ['Takbyte', 'Tillbyggnad'],
    video: `${M}/video-hero.mp4`,
    videoMobil: `${M}/video-hero-mobil.mp4`,
    poster: `${M}/poster-hero.jpg`,
    posterMobil: `${M}/poster-hero-mobil.jpg`,
  },
  tejp: ['Takbyte', 'Tillbyggnad', 'Ombyggnad', 'Renovering', 'Golv', 'Snickeri', 'Borlänge', 'Uppsala'],

  tjanster: {
    eyebrow: 'Vad vi gör',
    rubrik: ['Från taket', 'till golvet i hallen'],
    lead: 'Vi byter tak, bygger till och bygger om. Och vi tar gärna de mindre jobben också: ett golv, en källarvägg eller ett förråd som behöver ett lyft.',
    kort: [
      { id: 'takbyte', namn: 'Takbyte', bild: `${M}/tjanst-takbyte.jpg`, alt: 'Tak under arbete där nya röda plåtpannor möter det gamla tegeltaket', text: 'Vi tar hand om ditt tak när det är dags att byta, vare sig du vill ha tegel eller plåt. Har du ett annat tak räknar vi på just ditt.', punkter: ['Tegel eller plåt', 'Sadeltak och pulpettak', 'Kostnadsfri offert'], ritning: (<><path d="M20 96L100 30l80 66" /><path d="M44 76h112M60 62h80M76 48h48" /><path d="M20 96h160" /></>) },
      { id: 'tillbyggnad', namn: 'Tillbyggnad & ombyggnad', bild: `${M}/tjanst-tillbyggnad.jpg`, alt: 'Förråd på en läktare som byggts ut på höjden med OSB-skivor', text: 'Mer plats där du redan har en byggnad. Vi bygger till, bygger på och bygger om, som reklamförrådet vi byggde ut på höjden i ishallen.', punkter: ['Tillbyggnad', 'Påbyggnad på höjden', 'Ombyggnad'], ritning: (<><path d="M20 100V56l40-28 40 28v44z" /><path d="M100 100V64h80v36" /><path d="M120 100V80h20v20" /></>) },
      { id: 'lokaler', namn: 'Lokaler & förråd', bild: `${M}/tjanst-lokaler.jpg`, alt: 'Mörkmålat ishallsförråd med hockeyklubbor i ställ längs väggen', text: 'Ett förråd eller en lokal som ska fungera för dem som använder den. Vi målar, bygger förvaring på plats och gör snickerierna.', punkter: ['Målning invändigt', 'Platsbyggda bänkar och förvaring', 'Snickeridetaljer'], ritning: (<><path d="M24 100V28h152v72" /><path d="M24 52h152M24 76h152" /><path d="M60 28v72M140 28v72" /></>) },
      { id: 'golv', namn: 'Golv & invändigt', bild: `${M}/tjanst-golv.jpg`, alt: 'Nylagd fiskbensparkett i en hall framför en ytterdörr', text: 'Fiskbensparkett, klinker och nya innerväggar. Det mesta som gör ett rum klart inifrån.', punkter: ['Fiskbensparkett', 'Klinker', 'Innerväggar i källare'], ritning: (<><path d="M20 100l40-40 40 40M60 100l40-40 40 40M100 100l40-40 40 40" /><path d="M20 100h160" /></>) },
    ],
  },

  jobb: {
    eyebrow: 'Våra jobb',
    rubrik: ['Byggt i Dalarna,', 'fotat på plats'],
    lead: 'Tak, påbyggnader, golv och lokaler, som vi visar dem på Instagram.',
    not: 'Alla bilder är från våra egna projekt.',
    tid: '70s',
    rad1: [
      { src: `${M}/jobb-takbyte-vit-villa.jpg`, alt: 'Vit trävilla med nytt mörkt tak mot blå himmel', txt: 'Takbyte i Borlänge' },
      { src: `${M}/jobb-lakt-och-plat.jpg`, alt: 'Läkt och nya röda plåtpannor på ett tak under arbete', txt: 'Läkt och plåt på plats' },
      { src: `${M}/jobb-forrad-fore.jpg`, alt: 'Vitt förråd på en läktare i en ishall innan påbyggnaden', txt: 'Förrådet före' },
      { src: `${M}/jobb-stomme-pabyggnad.jpg`, alt: 'Ny träregelstomme ovanpå förrådet på läktaren', txt: 'Stommen reses' },
      { src: `${M}/jobb-pabyggt-hojden.jpg`, alt: 'Förrådet utbyggt på höjden med OSB-skivor ovanför läktarstolarna', txt: 'Påbyggt på höjden' },
      { src: `${M}/jobb-reklamforrad-klart.jpg`, alt: 'Det påbyggda förrådet i ishallen med ROOS BYGGs banderoll', txt: 'Klart, med vår banderoll' },
      { src: `${M}/jobb-torsangs-cafe.jpg`, alt: 'Trädäck och räcke längs en röd träbyggnad vid Torsångs Café', txt: 'Torsångs Café' },
    ],
    rad2: [
      { src: `${M}/jobb-ishallsforrad-fore.jpg`, alt: 'Ishallsförrådet före renoveringen, med ljusa väggar och gamla hyllor', txt: 'Ishallsförrådet före' },
      { src: `${M}/jobb-platsbyggda-bankar.jpg`, alt: 'Snickare monterar platsbyggda bänkar mot en mörkmålad vägg', txt: 'Bänkarna byggs' },
      { src: `${M}/jobb-forvaring.jpg`, alt: 'Mörkmålade väggar med nya ställ för förvaring', txt: 'Förvaring på plats' },
      { src: `${M}/jobb-ishallsforrad-efter.jpg`, alt: 'Det färdiga ishallsförrådet med mörk färgsättning och arbetsbänk', txt: 'Förrådet efter' },
      { src: `${M}/jobb-stalreglar-kallare.jpg`, alt: 'Stålreglar längs källarens yttervägg innan skivorna sätts upp', txt: 'Stålreglar i källaren' },
      { src: `${M}/jobb-innervaggar-kallare.jpg`, alt: 'Färdiga ljusa innerväggar i en källare', txt: 'Nya innerväggar' },
      { src: `${M}/jobb-parkett-laggs.jpg`, alt: 'Hall med fiskbensparkett under läggning och skyddspapp på golvet', txt: 'Parketten läggs' },
    ],
  },

  varfor: {
    eyebrow: 'Varför ROOS BYGG',
    rubrik: ['Så mycket inblick', 'som du vill ha'],
    lead: 'En del vill se varje steg. Andra vill bara att det blir klart. Hos oss bestämmer du själv hur mycket du är med i projektet, och arbetet vilar på tre saker: kvalitet, säkerhet och en nöjd kund när vi är klara.',
    punkter: [
      { rubrik: 'Kontor i Borlänge', text: 'Vi utgår från Borlänge och tar uppdrag i Dalarna och Uppsala.' },
      { rubrik: 'Små jobb också', text: 'En källarvägg, ett golv i hallen eller ett förråd. Alla jobb behöver inte vara stora.' },
      { rubrik: 'Kunder som kommer tillbaka', text: 'Takbytet i Borlänge gjorde vi åt en kund vi haft förut, och parketten i hallen ledde till klinkern i entrén.' },
      { rubrik: 'Tak och invändigt', text: 'Takbyte, tillbyggnad, golv och snickeri. En kontakt för hela jobbet.' },
    ],
    video: `${M}/video-varfor.mp4`,
    poster: `${M}/poster-varfor.jpg`,
    videoAlt: 'Långsam inzoomning mot en gul trävilla med nytt rött plåttak. Filmen slutar med ROOS BYGGs logotyp.',
  },

  om: {
    eyebrow: 'Om ROOS BYGG',
    rubrik: ['Bygger för en', 'bättre vardag'],
    kortRad: 'Borlänge · Dalarna & Uppsala',
    stycken: [
      'ROOS BYGG är ett byggföretag med kontor i Borlänge. Vi byter tak, bygger till och bygger om, och tar uppdrag i Dalarna och Uppsala.',
      'Det senaste vi gjort syns på Instagram: ett takbyte åt en återkommande kund, nya innerväggar i en dränerad källare, fiskbensparkett och klinker i en hall, och ishallsförrådet åt Kvarnsveden Hockey, föreningen vi också sponsrar.',
    ],
    bevis: [
      { ord: 'Kostnadsfri', text: 'offert på just ditt tak' },
      { ord: 'Tegel & plåt', text: 'du väljer taket' },
      { ord: 'Kvalitet', text: 'säkerhet och en nöjd kund' },
    ],
  },

  steg: {
    eyebrow: 'Så går det till',
    rubrik: ['Från första samtalet', 'till färdigt jobb'],
    lead: 'Tre steg, och du bestämmer hur nära du vill följa dem.',
    lista: [
      { namn: 'Hör av dig', text: 'Ring eller skicka några rader om vad du vill få gjort, och var.', ikon: 'kontakt' },
      { namn: 'Kostnadsfri offert', text: 'Du får en offert på just ditt jobb. Den kostar ingenting.', ikon: 'offert' },
      { namn: 'Vi bygger', text: 'Du väljer själv hur mycket inblick du vill ha medan arbetet pågår.', ikon: 'klart' },
    ],
  },

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Vad kunderna', 'säger'],
    lista: [
      { namn: 'Villaägare', kalla: 'Takbyte', exempel: true, text: 'Här står ett riktigt omdöme från en kund, med namn och ort som de själva skrivit det.' },
      { namn: 'Förening', kalla: 'Lokal och förråd', exempel: true, text: 'Ett andra kort, hämtat ur er Google-profil när den är på plats.' },
      { namn: 'Bostadsägare', kalla: 'Golv och klinker', exempel: true, text: 'Ett tredje kort. Tre riktiga omdömen räcker för att sidan ska kännas sann.' },
    ],
    not: 'Exempel — byts mot era riktiga omdömen.',
  },

  instagram: {
    eyebrow: 'Instagram',
    rubrik: ['Följ bygget', 'på Instagram'],
    lead: 'Det senaste från vårt konto, direkt från Instagram.',
    bio: 'Bygger för en bättre vardag',
    koder: ['Dc4HSGBDRi8', 'DTvUBmNgkEk', 'DQXeZ-QAq9p'],
  },

  fragor: {
    eyebrow: 'Vanliga frågor',
    rubrik: ['Det ni brukar', 'fråga först'],
    lead: 'Pengar och risk först, det praktiska sedan.',
    kort: { rubrik: 'Hittar du inte svaret?', text: 'Ring och fråga. Vi säger vad som gäller för just ditt jobb.' },
    lista: [
      { q: 'Vad kostar ett takbyte?', a: 'Det beror på takets storlek och form och på om du väljer tegel eller plåt. Skicka några rader om taket så får du en offert på just ditt tak.' },
      { q: 'Kostar offerten något?', a: 'Nej, offerten är kostnadsfri. Du bestämmer dig när du vet vad som ingår.' },
      { q: 'Kan jag använda ROT-avdrag?', a: (<>Arbete på din bostad ger ofta rätt till ROT-avdrag på arbetskostnaden. Reglerna står hos <a href="https://www.skatteverket.se/privat/fastigheterochbostad/rotarbeteochrutarbete.4.2e56d4ba1202f95012080002966.html" target="_blank" rel="noopener">Skatteverket</a>.</>) },
      { q: 'Vilka tak byter ni?', a: 'Sadeltak och pulpettak, med tegel eller plåt. Har du ett annat tak räknar vi gärna på just ditt.' },
      { q: 'Gör ni tillbyggnader?', a: 'Ja, tillbyggnad och ombyggnad. Senast byggde vi ut ett reklamförråd på höjden åt Kvarnsveden Hockey.' },
      { q: 'Tar ni mindre jobb?', a: 'Ja. Ett golv i hallen, nya innerväggar i källaren eller ett förråd som behöver ett lyft.' },
      { q: 'Hur mycket behöver jag vara med?', a: 'Så mycket eller lite du vill. En del vill se varje steg, andra vill bara att det blir klart.' },
      { q: 'Var arbetar ni?', a: 'Vi har kontor i Borlänge och tar uppdrag i Dalarna och Uppsala.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Berätta vad du vill bygga,', 'offerten kostar inget'],
    lead: 'Skicka några rader om jobbet och var det ligger, eller ring. Du får en offert på just ditt jobb.',
    checkar: ['Kostnadsfri offert', 'Tak, bygg och invändigt', 'Dalarna och Uppsala'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta kort om jobbet',
    placeholder: 'Ort, vad som ska göras (tak, tillbyggnad, golv …) och ungefär när',
    formNot: 'Skriv kort om jobbet, då kan vi ge ett vettigt svar redan i första samtalet. Inga massutskick, ingen säljlista.',
  },

  popup: {
    rubrik: 'Dags för nytt tak?',
    text: 'Offerten kostar ingenting. Tegel eller plåt, du får veta vad det blir innan du bestämmer dig.',
  },

  footer: {
    text: 'Takbyte, tillbyggnad, ombyggnad, golv och renovering i Dalarna och Uppsala. Kontor i Borlänge.',
  },

  modal: {
    rubrik: 'Så här kan ROOS BYGG se ut på nätet',
    text: 'Det här är ett kostnadsfritt förslag, byggt på det ni själva visar på roosbygg.com och Instagram, med era egna projektfoton. Ingen beställning, inget åtagande. Vill ni se den skarpt med ett formulär som landar i er inkorg? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.',
  },
};

export default function RoosByggDemo() {
  return <DemoSida data={data} />;
}
