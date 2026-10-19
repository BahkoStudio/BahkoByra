import DemoSida from '../_mall/DemoSida';

/* ===========================================================================
   CK MÅLERI & GOLV — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: instagram.com/ckmaleri · golvslipning, måleri, microcement och
   plattsättning i Uddevalla (Trestad) · INGEN egen hemsida hittad.
   Byggd 2026-10-19 på demomallen v3 (kanon: swedcro, närmast: avisnickeri).

   Bärande idé: ett golv som ser slut ut är oftast bara slitet. Under ytan
   ligger ett bra trägolv, och slipen tar fram det igen. Hero-filmen berättar
   det i tre steg i ett och samma vardagsrum (deras eget jobb).

   VERIFIERAT (2026-10-19):
   - Instagram @ckmaleri (skärmbild från Mathias + embed utan inloggning):
     namn "CK Måleri & Golv", 13 inlägg, 69 följare. Bio: Golvslipning,
     Måleri & Tapet, Microcement, Plattsättning · Ckmaleri@gmail.com ·
     0737033717. Egen grafik: "ALLT INOM MÅLERI OCH KAKEL", "Kontakta oss för
     en kostnadsfri offert".
   - Inlägg: DdZoA71nBAM (2026-09-17, "30 år gammal parket får sig nytt liv",
     Bonas ultra matt), DdKXynPDeKt (2026-09-11, slipning på kulturhusets
     scen), DXZ4VOLjPdh (2026-04-21, målade om luftvärnskanonerna på
     Bohusläns försvarsmuseum i Uddevalla), DUgfTvdDFMx (2026-02-08, golv &
     slip), DTs91TzjB4K (2026-01-19, brädgolv under plastmatta, trösklar
     gjorda rullstolsvänliga), DRhkVtpjGK2 (2025-11-26, fiskbensparkett).
   - hitta.se + hantverkskollen.se + lokalaforetag.se + branschaktuellt.se:
     "CK Måleri & Kakel", enskild firma, Föreningsgatan 12, 451 52 Uddevalla,
     samma telefon och e-post. Egen text där: "målare och kakelfirma i
     Trestad", "fullt utbildade inom Microcement", "lång erfarenhet",
     "ansvarsförsäkrade", "Alltid kostnadsfri offert". "Jag arbetar med
     ytskikt men inte med tätskikt" (lokalaforetag.se).
   - Servicefinder (servicefinder.se/foretag/7849162): 5,0 från 15 omdömen,
     23 slutförda jobb via plattformen, verksam i Uddevalla, Trollhättan,
     Vänersborg, Stenungsund m.fl. Tre omdömen citeras ordagrant (ett kortat)
     utan stjärnor per kort, eftersom betyget per omdöme inte står i källan.

   INTE verifierat, och finns därför inte på sidan: grundår, antal projekt
   (utöver Servicefinders 23), garantier, priser, ledtider, öppettider,
   Google-profil, Facebook-sida, F-skatt (troligt men ej läst ur registret).
   Org.nr för enskild firma är ägarens personnummer: visas INTE.
   Ägarens namn finns i källorna men står inte i sidans egna texter.

   FLAGGOR: formuläret går till mathias@bahkobyra.se (demonyckeln).
   HERO-FILMEN är GENERERAD (Higgsfield Wan 3.0 Prime bild-till-film, 1080p,
   utan ljud) ur tre av deras egna foton från samma vardagsrum (inlägget
   DdZoA71nBAM): 1) slipen går över det gamla golvet, 2) den nya lacken tar
   sig över det slipade golvet, 3) det färdiga rummet. Rummet är deras,
   rörelsen är genererad (maskinen rör sig utan synlig förare).
   LOGOTYP SAKNAS i användbar storlek (profilbilden är 100 px): ordmärke i
   text, även på slutkortet. Be om originalfilen.
   Tjänstebilderna för Microcement och Plattsättning är LÅNADE ur biblioteket
   (maximumplatt, rskompakt). Målerikortet är en stillbild ur en video
   (640 px). Två jobbilder (brädgolv, kantslip) likaså.
   =========================================================================== */

export const metadata = {
  title: 'CK Måleri & Golv — golvslipning och måleri i Uddevalla',
  description:
    'Golvslipning, måleri och tapet, microcement och plattsättning i Uddevalla och Trestad. Kostnadsfri offert. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

const M = '/ckmaleri/media';

const data = {
  namn: 'CK Måleri & Golv',
  ordmarke: 'CK Måleri & Golv',
  tema: {
    mork: '#05221B',
    accent: '#00805A',
    accentHover: '#006B4B',
    accentText: '#006B4B',
    accentLjus: '#4FD1A5',
    paAccent: '#fff',
  },
  kontakt: {
    tel: '073-703 37 17',
    telHref: 'tel:+46737033717',
    epost: 'ckmaleri@gmail.com',
    adress: 'Uddevalla',
    ig: 'https://www.instagram.com/ckmaleri/',
    igHandle: '@ckmaleri',
  },
  cta: { txt: 'Begär kostnadsfri offert', kort: 'Begär offert', lank: 'Begär offert' },
  nav: {
    vanster: [{ href: '#tjanster', txt: 'Tjänster' }, { href: '#jobb', txt: 'Våra jobb' }],
    hoger: [{ href: '#om', txt: 'Om oss' }, { href: '#fragor', txt: 'Frågor' }],
  },

  hero: {
    h1: ['CK', { txt: 'Måleri & Golv', liten: true }],
    ort: 'Uddevalla',
    tjanster: ['Golvslipning', 'Microcement'],
    video: `${M}/video-hero.mp4`,
    videoMobil: `${M}/video-hero-mobil.mp4`,
    poster: `${M}/poster-hero.jpg`,
    posterMobil: `${M}/poster-hero-mobil.jpg`,
  },
  tejp: ['Golvslipning', 'Parkett', 'Måleri', 'Tapet', 'Microcement', 'Kakel', 'Uddevalla', 'Trestad'],

  tjanster: {
    eyebrow: 'Vad vi gör',
    rubrik: ['Golv, väggar och kakel,', 'från samma hand'],
    lead: 'Vi slipar och lackar trägolv, målar och tapetserar, lägger microcement och sätter kakel. Du har en kontakt för hela ytan.',
    kort: [
      { id: 'golvslipning', namn: 'Golvslipning', bild: `${M}/tjanst-golvslipning.jpg`, alt: 'Golvslip på ett halvslipat parkettgolv på en stor scen', text: 'Parkett, fiskben och gamla brädgolv slipas ner till rent trä och behandlas med lack eller olja.', punkter: ['Parkett och fiskben', 'Gamla brädgolv', 'Lack, olja eller pigment'], ritning: (<><path d="M20 100h160" /><path d="M30 100l25-25h45l-25 25M90 100l25-25h45l-25 25" /><path d="M120 40v30M110 40h20" /></>) },
      { id: 'maleri', namn: 'Måleri & Tapet', bild: `${M}/tjanst-maleri.jpg`, alt: 'Nymålad gammal kanon på gräsmatta framför ett rött hus', text: 'Väggar, tak, fönster och dörrar, inne och ute. Tapetsering och spackling så väggen blir slät.', punkter: ['Invändigt och fasad', 'Tapetsering', 'Spackling och fog'], ritning: (<><path d="M40 20h90v26H40z" /><path d="M130 33h20v30H85v20" /><path d="M78 83h14v24H78z" /></>) },
      { id: 'microcement', namn: 'Microcement', bild: `${M}/tjanst-microcement.jpg`, alt: 'Badrum med grå sömlös yta och duschvägg i svart ram', text: 'En sömlös yta med betongkänsla på golv, väggar och bänkskivor. Går ofta att lägga på det gamla underlaget.', punkter: ['Badrum och kök', 'Golv och väggar', 'Utan fogar'], ritning: (<><path d="M20 100h160" /><path d="M40 80h80l20 20" /><path d="M120 80l30-40h20l-30 40" /></>) },
      { id: 'plattsattning', namn: 'Plattsättning', bild: `${M}/tjanst-plattsattning.jpg`, alt: 'Ljust kaklat badrum med duschvägg, tvättställ och rund spegel', text: 'Kakel och klinker i hall, kök och badrum. Vi gör ytskiktet, och säger till när det behövs ett tätskikt först.', punkter: ['Kakel och klinker', 'Hall, kök och badrum', 'Fogning'], ritning: (<><path d="M30 20h140v80H30z" /><path d="M30 47h140M30 74h140M77 20v80M123 20v80" /></>) },
    ],
  },

  jobb: {
    eyebrow: 'Våra jobb',
    rubrik: ['Slipat i Trestad,', 'fotat på plats'],
    lead: 'Parkett, fiskben och gamla brädgolv, som vi visar dem på Instagram.',
    not: 'Alla bilder är från våra egna jobb på Instagram.',
    tid: '70s',
    rad1: [
      { src: `${M}/jobb-slip-vardagsrum.jpg`, alt: 'Golvslip vid fönstret i ett vardagsrum med halvlackad ekparkett', txt: 'Mitt i jobbet' },
      { src: `${M}/jobb-nylackat.jpg`, alt: 'Nylackad blank ekparkett där fönstren speglas', txt: 'Nylackat' },
      { src: `${M}/jobb-ekparkett-rum.jpg`, alt: 'Färdig ekparkett i ett tomt rum med grå väggar', txt: 'Ekparkett klar' },
      { src: `${M}/jobb-ekparkett-fonster.jpg`, alt: 'Matt ekparkett framför stora spröjsade fönster', txt: '30 år gammal parkett' },
      { src: `${M}/jobb-bradgolv.jpg`, alt: 'Slipat brädgolv i furu som legat under en plastmatta', txt: 'Brädgolv under plastmatta' },
      { src: `${M}/jobb-kantslip.jpg`, alt: 'Golvslip med slang vid väggen på ett parkettgolv', txt: 'Slipning vid väggen' },
      { src: `${M}/jobb-scen-halvslipad.jpg`, alt: 'Scengolv i parkett, halvt slipat, i en mörk salong', txt: 'Kulturhusets scen' },
    ],
    rad2: [
      { src: `${M}/jobb-fiskben-hall.jpg`, alt: 'Slipad fiskbensparkett i en ljus hall', txt: 'Fiskben i hallen' },
      { src: `${M}/jobb-fiskben-rum.jpg`, alt: 'Fiskbensparkett i ett tomt rum efter slipning', txt: 'Fiskben slipat' },
      { src: `${M}/jobb-fiskben-ljust.jpg`, alt: 'Ljus fiskbensparkett mot en vit radiator', txt: 'Ljust och rent' },
      { src: `${M}/jobb-maskiner.jpg`, alt: 'Två golvmaskiner på ett nyslipat parkettgolv', txt: 'Maskinerna på plats' },
      { src: `${M}/jobb-fiskben-slip.jpg`, alt: 'Golvslip vid fönstret på en fiskbensparkett', txt: 'Slipning pågår' },
      { src: `${M}/jobb-golvslip.jpg`, alt: 'Golvslip sedd uppifrån på ett ljust trägolv', txt: 'Slipen' },
      { src: `${M}/jobb-scen-slipad.jpg`, alt: 'Slipade parkettstråk på en scen med en hink och verktyg', txt: 'Scengolvet klart' },
    ],
  },

  varfor: {
    eyebrow: 'Varför CK Måleri & Golv',
    rubrik: ['Golvet är inte slut,', 'bara slitet'],
    lead: 'Under en matt, repig yta ligger nästan alltid ett bra trägolv. Vi slipar fram det och behandlar det, så att ett 30 år gammalt golv ser nytt ut igen.',
    punkter: [
      { rubrik: 'Golv, färg och kakel', text: 'Slipning, måleri, microcement och plattsättning hos samma firma.' },
      { rubrik: 'Nyansen du tänkt', text: 'Lack, olja eller pigment: vi går igenom kulören innan vi börjar.' },
      { rubrik: 'Ärligt om tätskikt', text: 'Vi gör ytskikt. Behöver badrummet ett nytt tätskikt säger vi det, i stället för att lägga kakel på fel underlag.' },
      { rubrik: 'Kostnadsfri offert', text: 'Du vet vad jobbet kostar innan du bestämmer dig.' },
    ],
    video: `${M}/video-varfor.mp4`,
    poster: `${M}/poster-varfor.jpg`,
    videoAlt: 'Långsam inzoomning över en nyslipad fiskbensparkett. Filmen slutar med namnet CK Måleri & Golv.',
  },

  om: {
    eyebrow: 'Om CK Måleri & Golv',
    rubrik: ['Allt inom måleri,', 'golv och kakel'],
    kortRad: 'Uddevalla · Trestad',
    stycken: [
      'CK Måleri & Golv är en målar- och golvfirma i Uddevalla. Vi slipar trägolv, målar och tapetserar, sätter kakel och är utbildade inom microcement.',
      'Jobben syns på Instagram: en 30 år gammal parkett som fick nytt liv, scengolvet på ett kulturhus, ett brädgolv som legat under en plastmatta och kanonerna på Bohusläns försvarsmuseum, som vi målade om.',
    ],
    bevis: [
      { ord: '5,0', text: 'av 15 omdömen på Servicefinder' },
      { ord: 'Försäkrade', text: 'ansvarsförsäkring på jobben' },
      { ord: 'Kostnadsfri', text: 'offert på ditt jobb' },
    ],
  },

  steg: {
    eyebrow: 'Så går det till',
    rubrik: ['Från första samtalet', 'till färdigt golv'],
    lead: 'Tre steg, och du vet vad som händer i varje.',
    lista: [
      { namn: 'Hör av dig', text: 'Ring eller skicka några rader om vad som ska göras, och var.', ikon: 'kontakt' },
      { namn: 'Kostnadsfri offert', text: 'Vi tittar på ytan och du får en offert. Den kostar ingenting.', ikon: 'offert' },
      { namn: 'Vi gör jobbet', text: 'Vi slipar, målar eller lägger tills det är klart.', ikon: 'klart' },
    ],
  },

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Vad kunderna', 'säger'],
    lista: [
      { namn: 'Ingrid', kalla: 'Servicefinder · ekparkett', lank: 'https://servicefinder.se/foretag/7849162', stjarnor: false, text: 'Väldigt nöjd med slipning och behandling av mitt parkettgolv, det blev precis som jag hade hoppats på. Dessutom trevligt bemötande och bra kommunikation.' },
      { namn: 'Annika', kalla: 'Servicefinder · furugolv och trappor', lank: 'https://servicefinder.se/foretag/7849162', stjarnor: false, text: 'Jag är jättenöjd med slipning och behandling av mitt furugolv samt trappor. De blev precis som jag hade tänkt mig.' },
      { namn: 'Mladen', kalla: 'Servicefinder · golv och målning', lank: 'https://servicefinder.se/foretag/7849162', stjarnor: false, text: 'Jäkligt duktiga och väldigt bra service fick man. Otroligt trevliga och hjälpsamma.' },
    ],
    not: 'Omdömena är hämtade från Servicefinder.',
    lank: { href: 'https://servicefinder.se/foretag/7849162', txt: 'Läs alla på Servicefinder' },
  },

  instagram: {
    eyebrow: 'Instagram',
    rubrik: ['Följ jobben', 'på Instagram'],
    lead: 'Det senaste från vårt konto, direkt från Instagram.',
    bio: 'Golvslipning · Måleri & Tapet · Microcement · Plattsättning',
    koder: ['DdZoA71nBAM', 'DdKXynPDeKt', 'DRhkVtpjGK2'],
  },

  fragor: {
    eyebrow: 'Vanliga frågor',
    rubrik: ['Det ni brukar', 'fråga först'],
    lead: 'Pengar och risk först, det praktiska sedan.',
    kort: { rubrik: 'Hittar du inte svaret?', text: 'Ring och fråga. Vi säger vad som gäller för just ditt golv.' },
    lista: [
      { q: 'Vad kostar en golvslipning?', a: 'Det beror på hur stor ytan är, vilket golv det är och hur det ska behandlas. Skicka några rader eller ring, så får du en offert på just ditt jobb.' },
      { q: 'Kostar offerten något?', a: 'Nej, offerten är kostnadsfri.' },
      { q: 'Kan jag använda ROT-avdrag?', a: (<>Arbete i din bostad ger ofta rätt till ROT-avdrag på arbetskostnaden. Reglerna står hos <a href="https://www.skatteverket.se/privat/fastigheterochbostad/rotarbeteochrutarbete.4.2e56d4ba1202f95012080002966.html" target="_blank" rel="noopener">Skatteverket</a>.</>) },
      { q: 'Går mitt gamla golv att rädda?', a: 'Ofta. Vi har slipat fram en 30 år gammal parkett och ett brädgolv som legat under en plastmatta. Skicka en bild, så säger vi vad vi tror.' },
      { q: 'Lack eller olja?', a: 'Båda går. Vi går igenom nyans och yta med dig innan, till exempel en ultramatt lack som knappt syns.' },
      { q: 'Kan microcement läggas på mitt gamla golv?', a: 'Microcement går att lägga på de flesta underlag, även på en plastmatta. Vi tittar på ytan först.' },
      { q: 'Gör ni tätskikt i badrum?', a: 'Nej, vi gör ytskiktet: kakel, klinker och microcement. Behövs ett nytt tätskikt säger vi det innan.' },
      { q: 'Var arbetar ni?', a: 'I Uddevalla och Trestad, och runt om i Västra Götaland.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Berätta om golvet,', 'offerten kostar inget'],
    lead: 'Skicka några rader om jobbet och var det ligger, eller ring. Du får en offert på just ditt jobb.',
    checkar: ['Kostnadsfri offert', 'Golv, måleri, microcement och kakel', 'Uddevalla och Trestad'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta kort om jobbet',
    placeholder: 'Ort, vad som ska göras (slipa golv, måla, kakel …) och ungefär hur stor yta',
    formNot: 'Skriv kort om jobbet, då kan vi ge ett vettigt svar redan i första samtalet. Inga massutskick, ingen säljlista.',
  },

  popup: {
    rubrik: 'Är golvet slitet?',
    text: 'Offerten kostar ingenting. Du får veta vad det blir innan du bestämmer dig.',
  },

  footer: {
    text: 'Golvslipning, måleri och tapet, microcement och plattsättning i Uddevalla och Trestad.',
  },

  modal: {
    rubrik: 'Så här kan CK Måleri & Golv se ut på nätet',
    text: 'Det här är ett kostnadsfritt förslag, byggt på det ni själva visar på Instagram, med era egna jobbfoton. Ingen beställning, inget åtagande. Vill ni se den skarpt med ett formulär som landar i er inkorg? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.',
  },
};

export default function CkMaleriDemo() {
  return <DemoSida data={data} />;
}
