import DemoSida from '../_mall/DemoSida';

/* ===========================================================================
   HÄLLGREN NORD — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: hallgrennord.se · bygg, rivning, sanering, håltagning, fukt ·
   Stockholm (Sollentuna), Luleå, Piteå (under etablering). HAR hemsida
   (WordPress, nästan bara grafiska rutor och stockbilder av skog).

   Bärande idé: rivning, sanering, håltagning och bygg i samma lag, med egen
   maskinpark och certifierad personal, så att projektet inte stannar i
   glappet mellan entreprenörerna. Deras egna ord: "helhetsansvar", "egen
   maskinpark … mindre beroende av externa resurser".

   VERIFIERAT (hallgrennord.se /, /om-oss, /rivning, /sanering, /kontakt,
   wp-json-mediabiblioteket; ratsit/hitta/bygg.se/genomsyn; IG-embed; LinkedIn,
   allt 2026-10-09):
   Firmanamn "A Hällgren Nord AB" (varumärke "Hällgren Nord") · org.nr
   559106-6930, AB, registrerat 2017-03-28, säte Sollentuna, F-skatt och moms
   (hitta.se) · Bäckvägen 20, 192 54 Sollentuna (registret; sajten stavar
   "Backvägen") · Torpslingan 21, 973 47 Luleå · Piteå "kontor under
   etablering", öppnar 2026 · tel Stockholm 010-200 78 35, Luleå 010-179 72 00,
   info@hallgrennord.se · grundat i Boden 2017, huvudkontor i Stockholm ·
   tjänster i deras ord: bygg (nyproduktion, ombyggnation, renovering), total-
   och selektiv rivning med fokus på säkerhet, miljö och återbruk, sanering av
   asbest, PCB, brand-, mögel- och avloppsskador, håltagning och sågning i
   betong, sten och tegel, fuktmätning och skadeutredning med RISE-certifierade
   fukttekniker, mark och grund (schaktning, dränering, grundläggning),
   projektledning med licensierad KMA-samordnare · BKR-behörighet · egen
   maskinpark och erfarna operatörer · "riskbedömning, avskärmning och
   undertryck säkerställs före start", "rengöring, egenkontroll och mätning",
   "spårbar dokumentation", "från inventering till godkänd efterkontroll" ·
   "Oavsett om det handlar om små serviceuppdrag eller stora entreprenader" ·
   "Över 10 års erfarenhet" av sanering, bygg och rivning (deras egen uppgift)
   · LinkedIn (deras egen sida): egna snickare, rivare, saneringstekniker och
   håltagare · Instagram @hallgrennord (Hällgren Nord AB) · ETT riktigt
   omdöme med text: Jonny J., Enebyberg, 5 stjärnor på hitta.se, ordagrant.

   INTE verifierat, och finns därför inte på sidan: Google-betyget (kundernas.se
   visar 5,0 men omväxlande 4 och 8 recensioner, och textomdömena där är från
   "2783 Huseynov" — troligen delägaren Seymur Huseynov, används inte),
   öppettider, Facebook, försäkring, priser, ledtider, antal projekt och
   anställda, garantier.

   FLAGGOR:
   - Formuläret går till mathias@bahkobyra.se (demonyckeln).
   - Hero-filmen är INTE en genererad förvandling: Higgsfield-nyckeln saknas
     (tools/hf-api/.env.local finns inte), så den är byggd lokalt ur tre av
     deras egna Instagram-foton i långsam rörelse (ffmpeg, 0 USD). Varför-filmen
     = deras eget foto från Luleå + logokortet. Kontaktfilmen = hero, suddad.
   - Tjänstebilderna och övre jobbandet är deras egna foton (Instagram + sajten).
     Nedre jobbandet är fem LÅNADE illustrationsbilder (hg, osterlunds, hd —
     alla genererade), märkta i jobb.not. Inga bilder från Proffsmaskiner
     (systerbolag, samma ägare och adress) — visa aldrig de två demona med
     samma material.
   - Deras egna projektfilmer (Rivning Sollentuna, Balkonger Blackeberg, hero-
     film på sajten) gick inte att hämta från lådan (TLS stängs mot
     hallgrennord.se). Be om filerna: de är det bästa materialet de har.
   - Riktiga kontaktuppgifter och org.nr på sidan: visa INTE offentligt.
   =========================================================================== */

export const metadata = {
  title: 'Hällgren Nord — bygg, rivning och sanering i Stockholm, Luleå och Piteå',
  description:
    'Bygg, rivning, sanering av asbest och PCB, betonghåltagning och fuktutredning. Egen maskinpark och certifierad personal, kontor i Stockholm, Luleå och Piteå. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

const M = '/hallgrennord/media';

const data = {
  namn: 'Hällgren Nord',
  tema: {
    mork: '#0F1A14',
    accent: '#5CBF1A',
    accentHover: '#4FA815',
    accentText: '#336F12',
    accentLjus: '#7DD63E',
    paAccent: '#0F172A',
  },
  logo: { src: `${M}/logo-hallgrennord.png`, ljus: `${M}/logo-hallgrennord-ljus.png`, w: 880, h: 232, alt: 'Hällgren Nord', topp: 'fri' },
  kontakt: {
    tel: '010-200 78 35',
    telHref: 'tel:+46102007835',
    epost: 'info@hallgrennord.se',
    adress: 'Bäckvägen 20, 192 54 Sollentuna · Torpslingan 21, 973 47 Luleå',
    ig: 'https://www.instagram.com/hallgrennord/',
    igHandle: '@hallgrennord',
    orgnr: '559106-6930',
  },
  cta: { txt: 'Begär offert', kort: 'Begär offert', lank: 'Begär offert' },
  nav: {
    vanster: [{ href: '#tjanster', txt: 'Tjänster' }, { href: '#jobb', txt: 'Våra jobb' }],
    hoger: [{ href: '#om', txt: 'Om oss' }, { href: '#omdomen', txt: 'Omdömen' }],
  },

  hero: {
    ort: 'Stockholm · Luleå',
    tjanster: ['Rivning', 'Sanering'],
    video: `${M}/video-hero.mp4`,
    videoMobil: `${M}/video-hero-mobil.mp4`,
    poster: `${M}/poster-hero.jpg`,
    posterMobil: `${M}/poster-hero-mobil.jpg`,
  },
  tejp: ['Rivning', 'Asbestsanering', 'Betonghåltagning', 'Fuktutredning', 'Bygg', 'Mark & grund', 'Projektledning', 'Stockholm · Luleå'],

  tjanster: {
    eyebrow: 'Vad vi gör',
    rubrik: ['Från rivning till', 'färdig yta'],
    lead: 'Vi river, sanerar, tar hål och bygger upp igen. Med egna yrkesfolk och egen maskinpark tar vi ansvar för hela processen, från planering till färdigt resultat.',
    kort: [
      { id: 'rivning', namn: 'Rivning', bild: `${M}/tjanst-rivning.jpg`, alt: 'Grävmaskin med hydraulhammare river en betonggrund', text: 'Total- och selektiv rivning med fokus på säkerhet, miljö och återbruk. Egen maskinpark och erfarna operatörer.', punkter: ['Total- och selektiv rivning', 'Källsortering och återbruk', 'Riskbedömning och avspärrning'], ritning: (<><path d="M24 100h152" /><path d="M40 100V56h44v44" /><path d="M54 70h16v14H54z" /><path d="M120 100l14-30 26-22" /><path d="M160 48l12 14-10 8" /><path d="M96 92l10-14 8 10" /></>) },
      { id: 'sanering', namn: 'Sanering', bild: `${M}/tjanst-sanering.jpg`, alt: 'Avskärmat rivningsområde med varningsskylt för asbest och avspärrningsband', text: 'Asbest, PCB och brand-, mögel- och avloppsskador. Certifierad personal, undertryck före start och mätning innan ytan lämnas.', punkter: ['Asbest och PCB', 'Brand, mögel och avlopp', 'Spårbar dokumentation'], ritning: (<><path d="M100 12l66 96H34z" /><path d="M100 44v34" /><path d="M100 90v4" /></>) },
      { id: 'haltagning', namn: 'Betonghåltagning', bild: `${M}/tjanst-haltagning.jpg`, alt: 'Håltagare i Hällgren Nord-kläder kärnborrar i en betongvägg', text: 'Håltagning och sågning i betong, sten och tegel för bygg- och entreprenadprojekt. Modern utrustning och hög precision.', punkter: ['Kärnborrning', 'Väggsågning och golvsågning', 'Betong, sten och tegel'], ritning: (<><path d="M24 22h152v76H24z" /><circle cx="78" cy="60" r="18" /><circle cx="78" cy="60" r="6" /><path d="M120 60h44" /><path d="M150 46l14 14-14 14" /></>) },
      { id: 'fukt', namn: 'Fuktutredning', bild: `${M}/tjanst-fukt.jpg`, alt: 'Tekniker med andningsskydd arbetar med dammsugare och slip på ett golv efter vattenskada', text: 'Fuktmätning och skadeutredning med RISE-certifierade fukttekniker. Vi tar reda på orsaken innan något rivs.', punkter: ['Fuktmätning', 'Skadeutredning', 'Åtgärd efter vattenskada'], ritning: (<><path d="M100 16c22 30 36 50 36 66a36 36 0 01-72 0c0-16 14-36 36-66z" /><path d="M84 84a16 16 0 0016 16" /></>) },
    ],
  },

  jobb: {
    eyebrow: 'Våra jobb',
    rubrik: ['Ute på', 'plats'],
    lead: 'Sågning, håltagning, rivning och logistik, från Sollentuna till Norrbotten.',
    not: 'Övre bandet: våra egna bilder. Nedre bandet: illustrationsbilder — byts mot era egna projektfoton.',
    tid: '60s',
    rad1: [
      { src: `${M}/jobb-golvsagning.jpg`, alt: 'Håltagare med hörselskydd styr en golvsåg i en tom lokal', txt: 'Golvsågning i betong' },
      { src: `${M}/jobb-betongsagning-ute.jpg`, alt: 'Håltagare i varselkläder och hjälm vid en betongsåg utomhus', txt: 'Sågning på bygget' },
      { src: `${M}/jobb-truck-i-lokalen.jpg`, alt: 'Truckförare i varselväst flyttar material i en lokal', txt: 'Materialet ut ur lokalen' },
      { src: `${M}/jobb-inplastat-material.jpg`, alt: 'Inplastat material på pall i en tömd lokal', txt: 'Inplastat och klart för transport' },
      { src: `${M}/jobb-firmabil.jpg`, alt: 'Vit firmabil med Hällgren Nords logotyp på dörren', txt: 'På väg till nästa jobb' },
    ],
    rad2: [
      { src: `${M}/jobb-lan-markarbete.jpg`, alt: 'Hjullastare på en grusad yta vid skogskant', txt: 'Markarbete' },
      { src: `${M}/jobb-lan-grund.jpg`, alt: 'Grävmaskin vid en grund med formsättning', txt: 'Grundläggning' },
      { src: `${M}/jobb-lan-dranering.jpg`, alt: 'Grävmaskin schaktar ett dike längs en grusväg', txt: 'Schakt och dränering' },
      { src: `${M}/jobb-lan-skopa.jpg`, alt: 'Närbild på en lastarskopa i grus', txt: 'Egen maskinpark' },
      { src: `${M}/jobb-lan-vatrum.jpg`, alt: 'Våtrum med nya gipsväggar och golvbrunn', txt: 'Uppbyggnad efter rivning' },
    ],
  },

  varfor: {
    eyebrow: 'Varför Hällgren Nord',
    rubrik: ['Ett lag', 'genom hela kedjan'],
    lead: 'Projekt stannar ofta i glappet mellan rivningsfirman, saneringsfirman och byggfirman. Hos oss är det samma lag och samma maskinpark, från första riskbedömningen till färdig yta.',
    punkter: [
      { rubrik: 'Egna yrkesfolk', text: 'Rivare, saneringstekniker, håltagare och snickare i egen regi, så de största delarna av entreprenaden stannar hos oss.' },
      { rubrik: 'Egen maskinpark', text: 'Vi styr planering och tidsplan själva och är mindre beroende av externa resurser.' },
      { rubrik: 'Certifierad personal', text: 'RISE-certifierade fukttekniker, licensierad KMA-samordnare och BKR-behörighet. Asbest och PCB hanteras med spårbar dokumentation.' },
      { rubrik: 'Utredning före rivning', text: 'Fuktutredningen kommer först. Visar mätningen att det räcker med en mindre åtgärd får du veta det.' },
    ],
    video: `${M}/video-varfor.mp4`,
    poster: `${M}/poster-varfor.jpg`,
    videoAlt: 'Långsam inzoomning mot en håltagare i Hällgren Nord-kläder som kärnborrar i en betongvägg. Filmen slutar med Hällgren Nords logotyp.',
  },

  om: {
    eyebrow: 'Om Hällgren Nord',
    rubrik: ['Från Norrbotten', 'till Stockholm'],
    kortRad: 'Stockholm · Luleå · Piteå',
    stycken: [
      'Hällgren Nord grundades i Boden 2017 med målet att bli en trygg och strukturerad helhetsleverantör inom bygg, rivning och sanering. I dag sitter huvudkontoret i Sollentuna, vi har kontor i Luleå, och ett nytt kontor i Piteå öppnar under 2026.',
      'Vi arbetar efter etablerade KMA-system för kvalitet, miljö och arbetsmiljö. Oavsett om det är ett litet serviceuppdrag eller en stor entreprenad får du samma noggrannhet och samma ansvar.',
    ],
    bevis: [
      { ord: 'Sedan 2017', text: 'grundat i Boden' },
      { ord: 'Egen maskinpark', text: 'och erfarna operatörer' },
      { ord: 'RISE', text: 'certifierade fukttekniker' },
    ],
  },

  steg: {
    eyebrow: 'Så går det till',
    rubrik: ['Från riskbedömning', 'till godkänd yta'],
    lead: 'Samma ordning varje gång, oavsett om det gäller en vägg eller en hel fastighet.',
    lista: [
      { namn: 'Ring eller skriv', text: 'Berätta vad som ska göras och var. Vi återkommer med frågor eller ett förslag på genomgång.', ikon: 'kontakt' },
      { namn: 'Inventering', text: 'Vi går igenom objektet, inventerar material och gör en riskbedömning.', ikon: 'besok' },
      { namn: 'Offert och plan', text: 'Du får en offert med omfattning och upplägg, och en plan för avskärmning och arbetsmiljö.', ikon: 'offert' },
      { namn: 'Utförande', text: 'Egen personal och egen maskinpark. Saneringsbehov hanteras av certifierad personal och dokumenteras löpande.', ikon: 'arbete' },
      { namn: 'Egenkontroll', text: 'Rengöring, egenkontroll och mätning innan ytan lämnas för fortsatt arbete.', ikon: 'klart' },
    ],
  },

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Vad kunderna', 'säger'],
    lista: [
      { namn: 'Jonny J.', kalla: 'Enebyberg · från hitta.se', text: 'Kunniga, serviceinriktade och hjälpsamma killar, dom utförde renovering samt anpassade nya fönster i vårt badrum. Kommer att anlita dem igen, rekommenderas starkt.' },
      { namn: 'Fastighetsförvaltare', kalla: 'Stockholm', exempel: true, text: 'Här står ett riktigt omdöme från en beställare, med namn och ort som de själva skrivit det.' },
      { namn: 'Bostadsrättsförening', kalla: 'Luleå', exempel: true, text: 'Ett tredje kort, hämtat ur er Google-profil när den är på plats.' },
    ],
    not: 'Första omdömet är från hitta.se, som det står där. De två andra är exempel — byts mot era riktiga omdömen.',
    lank: { href: 'https://www.google.com/maps/search/H%C3%A4llgren+Nord+AB+B%C3%A4ckv%C3%A4gen+20+Sollentuna', txt: 'Se oss på Google' },
  },

  instagram: {
    eyebrow: 'Instagram',
    rubrik: ['Följ jobben', 'i vardagen'],
    lead: 'Det senaste från vårt konto, direkt från Instagram.',
    bio: 'Bygg, rivning och sanering · Stockholm och Norrbotten',
    koder: ['DIlX2UBtIdR', 'DFE1hlmNJ6j', 'DE0NJ1EuSIa'],
  },

  fragor: {
    eyebrow: 'Vanliga frågor',
    rubrik: ['Det ni brukar', 'fråga först'],
    lead: 'Pengar och risk först, det praktiska sedan.',
    kort: { rubrik: 'Hittar du inte svaret?', text: 'Ring och fråga rakt ut. Vi säger vad som gäller just ditt objekt.' },
    lista: [
      { q: 'Vad kostar det?', a: 'Det beror på omfattning, material och vad som hittas vid inventeringen. Därför börjar vi med en genomgång och lämnar en offert där omfattning och upplägg står svart på vitt.' },
      { q: 'Hur hanterar ni asbest och PCB?', a: 'Med certifierad personal och enligt gällande regelverk. Riskbedömning, avskärmning och undertryck säkerställs före start, och allt dokumenteras spårbart. Efteråt gör vi rengöring, egenkontroll och mätning innan ytan lämnas.' },
      { q: 'Kan ni både riva och bygga upp igen?', a: 'Ja. Vi utför entreprenader inom nyproduktion, ombyggnation och renovering, så samma lag kan ta projektet från rivning och sanering till färdig yta.' },
      { q: 'Tar ni mindre uppdrag också?', a: 'Ja. Från små serviceuppdrag till stora entreprenader, med samma noggrannhet.' },
      { q: 'Vad ingår i en fuktutredning?', a: 'Fuktmätning och skadeutredning av RISE-certifierade fukttekniker. Vi tar reda på orsaken och föreslår åtgärd, så att rätt saker rivs och inget i onödan.' },
      { q: 'Vilken håltagning gör ni?', a: 'Håltagning och sågning i betong, sten och tegel, till exempel kärnborrning och vägg- och golvsågning, för bygg- och entreprenadprojekt.' },
      { q: 'Har ni F-skatt?', a: 'Ja. A Hällgren Nord AB har F-skatt och är momsregistrerat.' },
      { q: 'Var arbetar ni?', a: 'Vi har kontor i Sollentuna och Luleå, och ett nytt kontor i Piteå öppnar under 2026. Med egen maskinpark tar vi uppdrag även utanför de orterna.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Begär en offert,', 'vi tar det därifrån'],
    lead: 'Ring, eller skriv några rader om objektet. Vi återkommer, går igenom vad som ska göras och lämnar en offert.',
    checkar: ['Offert med tydlig omfattning', 'Certifierad personal och egen maskinpark', 'Riskbedömning före start'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta kort om objektet',
    placeholder: 'Vad som ska göras (rivning, sanering, håltagning, bygg), var objektet ligger, ungefärlig yta och när det behöver vara klart',
    formNot: 'Skriv kort om objektet, då kan vi ge ett vettigt svar redan i första samtalet.',
    kundtyp: ['Företag', 'Fastighetsägare', 'Privatperson'],
  },

  popup: {
    rubrik: 'Hittat asbest eller fukt?',
    text: 'Börja med en inventering. Du får veta vad som behöver göras, och i vilken ordning, innan något rivs.',
  },

  footer: {
    text: 'Bygg, rivning, sanering, betonghåltagning och fuktutredning. Kontor i Stockholm, Luleå och Piteå.',
  },

  modal: {
    rubrik: 'Så här kan Hällgren Nord se ut på nätet',
    text: 'Det här är ett kostnadsfritt förslag, byggt på det ni själva visar på hallgrennord.se och Instagram, med era egna foton där vi hade dem. Ingen beställning, inget åtagande. Vill ni se den skarpt med ett formulär som landar i inkorgen? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.',
  },
};

export default function HallgrenNordDemo() {
  return <DemoSida data={data} />;
}
