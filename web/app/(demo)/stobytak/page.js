import DemoSida from '../_mall/DemoSida';

/* ===========================================================================
   STOBY TAK — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: instagram.com/stobytak · Stoby, Hässleholms kommun, Skåne · HAR hemsida
   (stobytak.se). Byggd 2026-10-14 på demomallen v3 (kanon: swedcro).

   Bärande idé: du ska förstå vad som behöver göras med taket innan arbetet
   börjar (deras egen formulering på /om-oss). Besiktning på plats, skriftlig
   offert, protokoll och garantidokument efteråt. Filmen i Varför visar ett
   färdigt tak av deras egna.

   VERIFIERAT (2026-10-14):
   - stobytak.se (start, /om-oss, /galleri): "STOBY TAK by Perna Consulting AB ·
     Org.nr 556967-6611" · tel 0722 365 069, alt. 0701 89 13 98 ·
     info@stobytak.se · "baserade i Stoby och arbetar främst i Hässleholms och
     Kristianstads kommuner" · orterna Hässleholm, Tyringe, Vinslöv, Bjärnum,
     Sösdala, Vittsjö, Hästveda, Perstorp, Kristianstad, Åhus, Tollarp,
     Knislinge, Höör · tjänster: kompletta takbyten, plåtarbeten, rännor &
     avvattning, takfönster, papptak, skorstenar & detaljer · "materialgaranti
     upp till 30 år enligt tillverkarens villkor" · kostnadsfri besiktning och
     offert · "flera arbetslag ... takläggare, plåtslagare och tätskiktsmontörer
     som arbetar med svetsad takpapp" · "samlad erfarenhet ... mer än tio år" ·
     protokoll och garantidokument efter arbetet · städat efter arbetet ·
     tre omdömen ordagrant (Slöjd kanalen, Vilma Johansson, Huibert Oostra) och
     texten "5,0 av 5 på Google" (antal står inte → inget betyg på demon).
   - hitta.se: juridiskt namn Perna Consulting AB, registrerat 2014-04-10,
     aktiebolag, F-skatt, SNI 43412 takarbeten. Besöksadress Jägarevägen 3,
     281 44 Stoby (inte på sidan).
   - Instagram @stobytak (skärmdump Mathias + embed): kategori Takläggare, bio
     "Takläggare från Stoby". Inläggen Dcy1LBkiDR_ (300 m² Benders Candor),
     DdKHMqcnSOs (nockreparation, tre takläggare), DcdllLLjS7Y (valmtak i
     Huaröd, ny råspont).
   - Alla stillbilder är deras egna (stobytak.se/images + IG-embed).

   INTE verifierat, och finns därför inte på sidan: Google-betygets antal,
   ledtider ("tak på 3 dagar" står i deras FAQ men lämnas utanför), priser,
   antal projekt, grundår för varumärket (bolaget är från 2014, men inget
   "sedan 2014" påstås), ROT-belopp.

   FLAGGOR: formuläret går till mathias@bahkobyra.se (demonyckeln). Hero-filmen
   är INTE en genererad förvandling (Higgsfield-nyckeln saknas på lådan): det är
   deras eget foto (gallery-1) i långsam rörelse, ffmpeg, 0 kr. Varför-filmen =
   deras foto (IG) + logokort. Logotypen är friställd ur stobytak.se/images/logo.png.
   Accent tegelröd ur deras egna tegeltak; resten svart-vitt som logotypen.
   =========================================================================== */

export const metadata = {
  title: 'STOBY TAK — takläggning och takbyte i Hässleholm och Kristianstad',
  description:
    'Takläggare från Stoby. Takbyten, plåtarbeten, rännor, papptak och skorstenar i Hässleholms och Kristianstads kommuner. Kostnadsfri besiktning och offert. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

const M = '/stobytak/media';

const data = {
  namn: 'STOBY TAK',
  tema: {
    mork: '#0B0B0C',
    accent: '#B42318',
    accentHover: '#912018',
    accentText: '#A61F15',
    accentLjus: '#FF8A7A',
    paAccent: '#fff',
  },
  logo: { src: `${M}/logo-stobytak.png`, w: 896, h: 542, alt: 'STOBY TAK', topp: 'vit', ljus: `${M}/logo-stobytak-ljus.png` },
  kontakt: {
    tel: '0722 365 069',
    telHref: 'tel:+46722365069',
    epost: 'info@stobytak.se',
    ig: 'https://www.instagram.com/stobytak/',
    igHandle: '@stobytak',
    orgnr: '556967-6611',
  },
  cta: { txt: 'Boka kostnadsfri besiktning', kort: 'Boka besiktning', lank: 'Boka besiktning' },
  nav: {
    vanster: [{ href: '#tjanster', txt: 'Tjänster' }, { href: '#jobb', txt: 'Våra jobb' }],
    hoger: [{ href: '#om', txt: 'Om oss' }, { href: '#omdomen', txt: 'Omdömen' }],
  },

  hero: {
    ort: 'Stoby · Hässleholm',
    tjanster: ['Takbyte', 'Plåt'],
    video: `${M}/video-hero.mp4`,
    videoMobil: `${M}/video-hero-mobil.mp4`,
    poster: `${M}/poster-hero.jpg`,
    posterMobil: `${M}/poster-hero-mobil.jpg`,
  },
  tejp: ['Takbyte', 'Takpannor', 'Plåtarbeten', 'Hängrännor', 'Papptak', 'Skorstenar', 'Hässleholm', 'Kristianstad'],

  tjanster: {
    eyebrow: 'Vad vi gör',
    rubrik: ['Allt som rör taket,', 'på ett ställe'],
    lead: 'Takläggare, plåtslagare och tätskiktsmontörer i samma firma. Vi planerar efter takets konstruktion och de detaljer som faktiskt behöver åtgärdas.',
    kort: [
      { id: 'takbyte', namn: 'Kompletta takbyten', bild: `${M}/tjanst-takbyte.jpg`, alt: 'Röd villa med vita knutar och veranda under nytt svart pannat tak', text: 'Vi byter hela taket, från råspont och underlag till läkt och takpannor. Materialgaranti upp till 30 år enligt tillverkarens villkor.', punkter: ['Ny råspont och underlagspapp', 'Läkt och takpannor', 'Rännor och plåt i samma jobb'], ritning: (<><path d="M20 96L100 30l80 66" /><path d="M44 76h112M60 62h80M76 48h48" /><path d="M20 96h160" /></>) },
      { id: 'plat', namn: 'Plåtarbeten', bild: `${M}/tjanst-plat.jpg`, alt: 'Svart pannat tak med plåtad vindskiva mot ljus panelgavel', text: 'Beslag och tätningar runt skorstenar, genomföringar, takfot och gavlar. Vår plåtslagare anpassar plåten på plats.', punkter: ['Gavel- och fotplåt', 'Genomföringar', 'Tätning mot läckage'], ritning: (<><path d="M24 40h152v20H24z" /><path d="M24 60l20 30h112l20-30" /><path d="M60 40v20M100 40v20M140 40v20" /></>) },
      { id: 'rannor', namn: 'Rännor & avvattning', bild: `${M}/tjanst-rannor.jpg`, alt: 'Takfot med hängränna över ett inglasat uterum', text: 'Montering och byte av hängrännor och stuprör som leder bort vattnet från fasad och grund.', punkter: ['Hängrännor', 'Stuprör', 'Anslutningar mot taket'], ritning: (<><path d="M20 34h160" /><path d="M30 34c0 18 140 18 140 0" /><path d="M150 46v58M140 104h20" /></>) },
      { id: 'skorsten', namn: 'Skorstenar & detaljer', bild: `${M}/tjanst-skorsten.jpg`, alt: 'Skorsten under renovering med blottat murverk och gammal plåt', text: 'Plåt och anslutningar kring skorstenar och andra känsliga takdetaljer, där de flesta läckor börjar.', punkter: ['Skorstensplåt', 'Nock och nocktätning', 'Papptak med svetsad papp'], ritning: (<><path d="M20 100L100 40l80 60" /><path d="M126 60V24h22v52" /><path d="M120 24h34" /></>) },
    ],
  },

  jobb: {
    eyebrow: 'Våra jobb',
    rubrik: ['Tak vi har lagt', 'i nordöstra Skåne'],
    lead: 'Takbyten, nockar och plåtdetaljer, fotograferade av oss på plats.',
    not: 'Alla bilder är från våra egna projekt.',
    tid: '70s',
    rad1: [
      { src: `${M}/jobb-tegelvilla-nytt-tak.jpg`, alt: 'Tegelvilla med nylagt svart pannat tak under molnig himmel', txt: 'Nytt tak på tegelvilla' },
      { src: `${M}/jobb-z-panel-garage.jpg`, alt: 'Nymålad liggande Z-panel på en garagegavel mot blå himmel', txt: 'Ny Z-panel på garage' },
      { src: `${M}/jobb-stallning-takbyte.jpg`, alt: 'Byggställning runt ett tegelhus under takbyte', txt: 'Takbyte på ställning' },
      { src: `${M}/jobb-rott-tegeltak.jpg`, alt: 'Vitt tvåplanshus med rött tegeltak och skorsten', txt: 'Klassiskt tegeltak' },
      { src: `${M}/jobb-l-hus-tradgard.jpg`, alt: 'L-format tegelhus med nytt svart tak sett från trädgården', txt: 'L-hus, färdigt tak' },
      { src: `${M}/jobb-rivning-pannor.jpg`, alt: 'Gamla takpannor nedplockade på läkten under rivning', txt: 'Rivning av gamla pannor' },
      { src: `${M}/jobb-nockpannor.jpg`, alt: 'Rad med nockpannor längs nocken på ett betongpannetak', txt: 'Nocken på plats' },
    ],
    rad2: [
      { src: `${M}/jobb-tegelhus-molnig-himmel.jpg`, alt: 'Tegelhus med nytt mörkt tak och skorsten', txt: 'Valmat tak, klart' },
      { src: `${M}/jobb-gammalt-tak-fore.jpg`, alt: 'Slitet brunt tak på en villa före takbytet, stegar mot fasaden', txt: 'Före takbytet' },
      { src: `${M}/jobb-vindskiva-fore.jpg`, alt: 'Närbild på sliten vindskiva och takkant', txt: 'Sliten takkant före' },
      { src: `${M}/jobb-gavel-horn.jpg`, alt: 'Gavelhörn med sliten mörk träpanel före arbetet', txt: 'Gaveln före' },
      { src: `${M}/jobb-nock-detalj.jpg`, alt: 'Närbild under en nockpanna med gammalt bruk och smuts', txt: 'Nocken inifrån' },
      { src: `${M}/jobb-pannor-narbild.jpg`, alt: 'Närbild på grå betongpannor med nockpanna', txt: 'Pannorna på nära håll' },
    ],
  },

  varfor: {
    eyebrow: 'Varför STOBY TAK',
    rubrik: ['Du ska förstå taket', 'innan vi börjar'],
    lead: 'Vi börjar med en besiktning på plats och en skriftlig offert. Du får veta vad som ska göras, varför det behövs och vad som ingår. När taket är klart får du protokoll och garantidokument.',
    punkter: [
      { rubrik: 'Lokal i Stoby', text: 'Vi utgår från Stoby och arbetar främst i Hässleholms och Kristianstads kommuner.' },
      { rubrik: 'Hela taket i ett lag', text: 'Takläggare, plåtslagare och tätskiktsmontörer, så plåten och pappen inte väntar på någon annan.' },
      { rubrik: 'Bara det som behövs', text: 'Vi planerar efter de detaljer som faktiskt behöver åtgärdas. Räcker det att laga nocken säger vi det.' },
      { rubrik: 'Städat och dokumenterat', text: 'Arbetsplatsen lämnas i ordnat skick, och du får garantivillkoren skriftligt.' },
    ],
    video: `${M}/video-varfor.mp4`,
    poster: `${M}/poster-varfor.jpg`,
    videoAlt: 'Långsam inzoomning mot ett tegelhus med nylagt svart tak. Filmen slutar med STOBY TAKs logotyp.',
  },

  om: {
    eyebrow: 'Om STOBY TAK',
    rubrik: ['Takläggare', 'från Stoby'],
    kortRad: 'Stoby · Hässleholms kommun',
    stycken: [
      'STOBY TAK utgår från Stoby och hjälper villa- och fastighetsägare i Hässleholms och Kristianstads kommuner med takbyte, papptak, plåtdetaljer, avvattning och takfönster.',
      'Vi har flera arbetslag med olika kompetenser och en samlad erfarenhet på mer än tio år. Vill du höra hur tidigare kunder har upplevt arbetet? Fråga oss gärna om referenser.',
    ],
    bevis: [
      { ord: '30 år', text: 'materialgaranti, enligt tillverkarens villkor' },
      { ord: 'F-skatt', text: 'registrerat aktiebolag' },
      { ord: '0 kr', text: 'för besiktning och offert' },
    ],
  },

  steg: {
    eyebrow: 'Så går det till',
    rubrik: ['Från första samtalet', 'till protokollet'],
    lead: 'Tre steg, och du vet vad som ingår innan något görs.',
    lista: [
      { namn: 'Kontakta oss', text: 'Skicka adress och en kort beskrivning av taket, eller ring. Vi bokar en tid som passar.', ikon: 'kontakt' },
      { namn: 'Besiktning & offert', text: 'Vi mäter, dokumenterar och lämnar en tydlig offert där omfattning och material framgår.', ikon: 'besok' },
      { namn: 'Takarbetet', text: 'Vi håller kontakt under projektet och avslutar med protokoll och garantidokument.', ikon: 'klart' },
    ],
  },

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Vad kunderna', 'säger'],
    lista: [
      { namn: 'Slöjd kanalen', kalla: 'Google-omdöme, från stobytak.se', text: 'Supernöjd med Stoby Tak! Allt flöt på riktigt bra från början till slut. De kom när de skulle, gjorde ett grymt jobb och lämnade rent och snyggt efter sig.' },
      { namn: 'Vilma Johansson', kalla: 'Google-omdöme, från stobytak.se', text: 'Vi använde Stoby Tak för takarbete på vår 80-tals villa och är mycket nöjd. De kom på utsatt tid, kommunikationen genom hela processen var klar och tydlig, och själva arbetet gick snabbt och effektivt.' },
      { namn: 'Huibert Oostra', kalla: 'Google-omdöme, från stobytak.se', text: 'Stoby Tak gjorde ett proffsigt jobb med vårt tak. Punktliga, effektiva och lätta att ha att göra med. Slutresultatet blev precis som vi hoppats.' },
    ],
    not: 'Som de står på stobytak.se. Kortade utan att ändra innebörd.',
  },

  instagram: {
    eyebrow: 'Instagram',
    rubrik: ['Följ jobben', 'från taket'],
    lead: 'Det senaste från vårt konto, direkt från Instagram.',
    bio: 'Takläggare från Stoby',
    koder: ['Dcy1LBkiDR_', 'DdKHMqcnSOs', 'DcdllLLjS7Y'],
  },

  fragor: {
    eyebrow: 'Vanliga frågor',
    rubrik: ['Det ni brukar', 'fråga först'],
    lead: 'Pengar och risk först, det praktiska sedan.',
    kort: { rubrik: 'Hittar du inte svaret?', text: 'Ring och fråga. Vi säger vad som gäller just ditt tak.' },
    lista: [
      { q: 'Vad kostar ett nytt tak?', a: 'Det beror på takets storlek, lutning, underlagets skick och vilka pannor du väljer. Därför börjar vi med en besiktning och en skriftlig offert, båda kostnadsfria och utan förpliktelser.' },
      { q: 'Vilken garanti får jag?', a: 'Materialgaranti upp till 30 år enligt tillverkarens villkor. De aktuella villkoren står skriftligt, och du får garantidokumenten när arbetet är klart.' },
      { q: 'Måste hela taket bytas?', a: 'Inte alltid. Ibland räcker det att åtgärda nocken, plåten runt skorstenen eller en ränna. Vi planerar efter de detaljer som faktiskt behöver åtgärdas.' },
      { q: 'Hur går en besiktning till?', a: 'Vi kommer ut, mäter och dokumenterar taket. Sedan får du en offert där omfattning och material framgår.' },
      { q: 'Kan jag använda ROT-avdrag?', a: 'Arbete på taket till din bostad ger ofta rätt till ROT-avdrag på arbetskostnaden. Vi säger vad som gäller ditt jobb i offerten.' },
      { q: 'Gör ni papptak och plåt också?', a: 'Ja. I teamet finns plåtslagare och tätskiktsmontörer som arbetar med svetsad takpapp, så hela taket görs av samma firma.' },
      { q: 'Var arbetar ni?', a: 'Vi utgår från Stoby och arbetar främst i Hässleholms och Kristianstads kommuner, bland annat Tyringe, Vinslöv, Bjärnum, Sösdala, Vittsjö, Hästveda, Åhus, Tollarp, Knislinge, Perstorp och Höör.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Boka en besiktning,', 'det kostar ingenting'],
    lead: 'Skicka adressen och några rader om taket, eller ring. Vi bokar en tid som passar.',
    checkar: ['Kostnadsfri besiktning och offert', 'Tydligt vad som ingår', 'Protokoll och garantidokument efteråt'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta kort om taket',
    placeholder: 'Adress eller ort, typ av tak, ungefär hur gammalt det är och vad du har sett',
    formNot: 'Skriv kort om taket, då kan vi ge ett vettigt svar redan i första samtalet. Inga massutskick, ingen säljlista.',
  },

  popup: {
    rubrik: 'Taket före vintern?',
    text: 'Besiktningen kostar ingenting. Du får veta vad taket behöver, och vad det kostar, innan du bestämmer något.',
  },

  footer: {
    text: 'Takläggning, takbyte, plåt, rännor och papptak i Hässleholms och Kristianstads kommuner. Tydlig offert och dokumentation efter avslutat arbete.',
  },

  modal: {
    rubrik: 'Så här kan STOBY TAK se ut på nätet',
    text: 'Det här är ett kostnadsfritt förslag, byggt på det ni själva visar på stobytak.se och Instagram, med era egna projektfoton. Ingen beställning, inget åtagande. Vill ni se den skarpt med ett formulär som landar i er inkorg? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.',
  },
};

export default function StobyTakDemo() {
  return <DemoSida data={data} />;
}
