import DemoSida from '../_mall/DemoSida';
import ForeEfterReglage from './ForeEfterReglage';

/* ===========================================================================
   FÄRGA TAK: hemsida på demomallen v3, byggd som kundens egen sida (kund: true)
   Takmålning i hela Sverige. Ägaren startar AB vid årsskiftet: inget org.nr än.
   Byggd 2026-10-22 på demomallen v3 (hero exakt som velebitmaleri, placeholders
   och dolda sektioner som kakel0413).

   Bärande idé: ett trött, mossigt tak kan se ut som nytt igen. Heron visar
   det: mossigt och blekt → nymålat tak, i en dragbar före/efter.

   VERIFIERAT (Mathias 2026-10-22):
   - Namn och NY logotyp "FÄRGA TAK" (kundens filer 2026-10-23: rund och fyrkantig,
     vit text + två korallröda takvinklar på svart). Originalen ligger som
     logo-original-rund.jpg / logo-original-fyrkant.jpg. logo.png/.webp = den
     fyrkantiga, svart bakgrund gjord transparent och beskuren (1504×648), inte
     omritad. ikon.png/apple-ikon.png = takvinklarna på svart (favicon).
     Logans slogan "VI MÅLAR TAK I HELA SVERGIE" (sic) står kvar i filen; i
     sidtexten skrivs "Sverige".
   - Tjänst: takmålning. Område: hela Sverige (logans slogan).
   - Firman är ny (AB startas vid årsskiftet).
   - Färger ur nya logon: svart bas, vitt, korall #FE504F (uppmätt ur bilden).
     Rubriker i Outfit 800 versaler (geometrisk sans, nära logans typsnitt). Stilen ligger i STIL nedan.

   VERIFIERAT 2026-10-23: telefon 070-789 45 61, e-post info@fargatak.se.

   ÄNDRAT 2026-11-09 (Philip via Mathias):
   - Vit bakgrund i stället för den mörka neon/glow-stilen. Korall #FE504F som accent.
   - logo-mork.webp = vit text i logo.png ominfärgad till svart med PIL (koralltaket orört);
     används som både logo.src och logo.ljus på den vita sidan. logo.webp (vit text) sparad.
   - Varför-filmen omgjord 2026-11-09 (Mathias: Wan såg för AI-aktig ut): Marketing Studio
     Sunburst still + Kling 4.0 5 s 720p. Vardaglig svensk 70-talsvilla, nymålat matt
     svart betongpannetak, mulet ljus, DJI-dolly. Wan-versionen i media/gammal/video-varfor-wan.mp4.

   KUNDLOOP RUNDA 1 2026-11-09 (Philip via Mathias, hårda krav i docs/design/fargatak-kund-bar.md):
   - Inga neonknappar men loggans färg (Mathias): tema.accent = dämpad korall #B5433E (vit text 5,47:1),
     hover #9F3A36, ingen glöd. Ljus korall #FE504F bara som detalj (logga, takvinkeln i eyebrow, tunn
     linje i footern). Band, processen och före/efter-handtaget neutrala (svart/vitt/ljusgrått).
   - Vit kontaktsektion (ingen film, ingen slöja), neutralt ljusgrått band under heron, popupen av
     (den täckte formuläret), headern vit med mörk text från start.

   KUNDLOOP RUNDA 3 2026-11-09 (alla tre kritiker + Mathias):
   - kund: true (Mathias: "ta bort detta är ett förslag, gör det som en kund som ska ha hemsida"):
     ingen Bahko-knapp, ingen förslagsruta, kreditraden "Hemsida skapad av bahkobyra.se" i footern.
   - Kortare sida där varje sak sägs en gång. Process i tre steg, tre frågor. Heron: h1 "Takmålning i hela
     Sverige" (hero.rubrik), den stora loggan i heron dold (headern bär loggan).
   - Ingen synlig illustrationstext (Mathias: "filmen ska vara kvar utan illustration text").
     Alt- och aria-texterna säger "Illustration:". Se leadfilens FLAGGOR.
   - Texten enligt design-loop/references/skriv-som-en-manniska.md, inom VERIFIERAT.

   INTE verifierat, och finns därför INTE på sidan: ort,
   hemsida, Instagram, org.nr, F-skatt, ROT-avdrag, priser, garantier,
   ledtider, omdömen, jobbfoton, taktyper, metoder, vem som svarar i telefon.

   PLATSHÅLLARE (för Mathias):
   - Stegen (tre) och frågorna (tre) är allmän information utan åtaganden och ska stämmas av med ägaren.
   - 2026-11-10 (Philip via Mathias): tjänstesektionen visad igen, med runda linjeikoner i samma
     anda som bahkobyra.se. Tre kort ur sidans historia: Takmålning, Färgval, Ett tak som ser nytt ut.
   - Samma dag (Mathias): Varför-texten bort (leaden om sol och mossa, rubriken "Taket är det första
     man ser av huset", och kortet "Ny firma"). Filmen är kvar.
   - JOBB, OMDÖMEN OCH OM OSS är dolda (stilblocket nedan): inga jobbfoton,
     inga omdömen, ingen ägarberättelse ännu. Inget påhittat.
   - VARFÖR-FILMEN (Sunburst + Kling 4.0 5 s 720p) och HERONS FÖRE/EFTER (GPT Image 2.5 Sunburst,
     efter-bilden en redigering av före-bilden) är GENERERADE ILLUSTRATIONER, INTE kundens egna jobb.
     Byts mot egna jobbfoton. Hero- och kontaktfilmen ligger kvar i media men visas inte.
   - Formuläret går till demonyckeln (Mathias). Vid leverans: egen nyckel.
   =========================================================================== */

export const metadata = {
  title: 'Färga Tak: takmålning i hela Sverige',
  description: 'Färga Tak är en ny firma som målar tak i hela Sverige. Ring 070-789 45 61 eller begär en offert.',
  robots: { index: false, follow: false },
  icons: { icon: '/fargatak/media/ikon.png', apple: '/fargatak/media/apple-ikon.png' },
};

const M = '/fargatak/media';

const data = {
  namn: 'Färga Tak',
  // Kundens egen sida (runda 3, Mathias): ingen demo-knapp, ingen förslagsruta, kreditrad i footern.
  kund: true,
  skapadAv: 'Hemsida skapad av',
  // Kundens logga: svart text + korall (logo-mork) på vit sida. logo.webp (vit text) ligger kvar i media.
  logo: { src: `${M}/logo-mork.webp`, ljus: `${M}/logo-mork.webp`, w: 1504, h: 648, alt: 'Färga Tak', topp: 'fri' },
  // Philip/Mathias 2026-11-09: knapparna matchar loggan men utan neon = dämpad, matt korall (loggans #FE504F
  // mörkad). Vit text 5,47:1. Hover mörkare, aldrig ljusare. Ingen glöd (STIL).
  tema: {
    mork: '#0A0A0A',
    accent: '#B5433E',
    accentHover: '#9F3A36',
    accentText: '#B5433E',
    accentLjus: '#FF8A89',
    paAccent: '#FFFFFF',
  },
  kontakt: {
    tel: '070-789 45 61',
    telHref: 'tel:+46707894561',
    epost: 'info@fargatak.se',
    adress: 'Hela Sverige',
  },
  cta: { txt: 'Begär offert', kort: 'Begär offert', lank: 'Begär offert' },
  nav: {
    vanster: [{ href: '#tjanster', txt: 'Tjänster' }, { href: '#process', txt: 'Så går det till' }],
    hoger: [{ href: '#fragor', txt: 'Frågor' }, { href: '#kontakt', txt: 'Kontakt' }],
    // Mobilmenyn: panelen täcker headerns Ring-knapp, så numret står i menyn. Raden "Kontakt" och
    // mallens "Vanliga frågor" döljs där (STIL): Begär offert-knappen och "Frågor" når samma mål.
    extra: [{ href: 'tel:+46707894561', txt: 'Ring 070-789 45 61' }],
  },

  hero: {
    // h1 = texten (hero.rubrik). Den stora loggan i heron döljs i STIL: headern bär loggan.
    rubrik: { fraga: 'Takmålning', svar: 'i hela Sverige' },
    tjanster: ['Takmålning', 'Hela Sverige'],
    video: `${M}/video-hero.mp4`,
    videoMobil: `${M}/video-hero-mobil.mp4`,
    poster: `${M}/poster-hero.jpg`,
    posterMobil: `${M}/poster-hero-mobil.jpg`,
    // Före/efter: samma tak och vinkel, illustration (bara i alt). ForeEfterReglage lägger den dragbara jämförelsen ovanpå.
    foreEfter: { src: `${M}/hero-fore.webp`, alt: 'Illustration: tak före målning, mossigt och blekt', w: 900, h: 1200, txt: 'Dra i handtaget: före och efter' },
  },
  tejp: ['Takmålning', 'Hela Sverige', 'Färga Tak'],

  // Tjänstekorten tillbaka (Philip via Mathias 2026-11-10): ikoner i samma anda som bahkobyra.se
  // (runt märke överst, kort med rubrik och en mening). Bara det som redan stått på sidan:
  // Takmålning, Färgval och Ett tak som ser nytt ut. Inga foton, ingen ny tjänst.
  // Formulärets val kommer ur kontaktSektion.typer.
  tjanster: {
    eyebrow: 'Tjänster',
    rubrik: ['Det här', 'gör vi'],
    lead: 'Takmålning i hela Sverige.',
    kolumner: 3,
    kort: [
      {
        id: 'takmalning',
        namn: 'Takmålning',
        bild: `${M}/transparent.png`,
        alt: '',
        text: 'Vi målar tak i hela Sverige.',
        ritning: (<><path d="M36 78l64-46 64 46" /><path d="M52 66v36h96V66" /><path d="M118 32v-16h16" /></>),
      },
      {
        id: 'fargval',
        namn: 'Färgval',
        bild: `${M}/transparent.png`,
        alt: '',
        text: 'Du väljer kulör till taket.',
        ritning: (<><path d="M100 22c26 34 38 50 38 68a38 38 0 1 1-76 0c0-18 12-34 38-68z" /></>),
      },
      {
        id: 'klart',
        namn: 'Ett tak som ser nytt ut',
        bild: `${M}/transparent.png`,
        alt: '',
        text: 'Ett nymålat tak syns från gatan.',
        ritning: (<><circle cx="100" cy="60" r="40" /><path d="M80 62l14 14 30-32" /></>),
      },
    ],
  },

  // Dold (se PLATSHÅLLARE): inga jobbfoton än. Banden får inte vara tomma, så en dold post var.
  jobb: {
    eyebrow: '', rubrik: [''], lead: '', not: '', tid: '60s',
    rad1: [{ src: `${M}/logo.webp`, alt: '', txt: '' }],
    rad2: [{ src: `${M}/logo.webp`, alt: '', txt: '' }],
  },

  // Filmen är kvar. Texten togs bort 2026-11-10 (Mathias): leaden om sol, regn och mossa,
  // rubriken "Taket är det första man ser av huset" och kortet "Ny firma". Tomma fält + STIL
  // döljer rubrik och punktlista, så bara filmen och knapparna syns.
  varfor: {
    eyebrow: '',
    rubrik: [''],
    lead: '',
    punkter: [],
    video: `${M}/video-varfor.mp4`,
    poster: `${M}/poster-varfor.jpg`,
    videoAlt: 'Illustration: hus med nymålat svart tak, filmat från luften',
  },

  // Dold (se PLATSHÅLLARE): ingen ägarberättelse ännu. Mallen kräver fältet; inga stycken.
  om: {
    eyebrow: 'Om oss',
    rubrik: ['Färga Tak', ''],
    kortRad: '',
    stycken: [],
    bevis: [],
  },

  // Allmän information utan åtaganden: inga besiktnings-, planerings- eller genomgångslöften.
  steg: {
    eyebrow: 'Så går det till',
    rubrik: ['Tre steg', 'till en offert'],
    lead: '',
    lista: [
      { namn: 'Ring eller skriv', ikon: 'kontakt', text: 'Ring, eller fyll i formuläret längre ner.' },
      { namn: 'Berätta om taket', ikon: 'besok', text: 'Vad det är för tak och var huset ligger. Har du bilder, mejla dem till info@fargatak.se.' },
      { namn: 'Offert', ikon: 'offert', text: 'Sedan får du en offert på ditt tak.' },
    ],
  },

  // Dold (se PLATSHÅLLARE): inga omdömen ännu, och vi hittar inte på några.
  omdomen: { eyebrow: '', rubrik: [''], lista: [], not: '' },

  fragor: {
    eyebrow: 'Vanliga frågor',
    rubrik: ['Innan', 'du ringer'],
    lead: '',
    // Knappen i kortet är mallens Ring-knapp; texten pekar också till formuläret, så båda vägarna syns.
    kort: { rubrik: 'Hittar du inte svaret?', text: (<>Ring, eller <a href="#kontakt">skriv några rader i formuläret</a>.</>) },
    lista: [
      { q: 'Vad kostar det att måla taket?', a: 'Det beror på hur stort taket är och vilket skick det är i. Priset står i offerten.' },
      { q: 'Huset står i Norrland. Kommer ni dit?', a: 'Ja. Vi tar jobb i hela Sverige.' },
      { q: 'Måste jag skicka bilder?', a: 'Nej. Men ett par foton säger mer än en lång beskrivning.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Hör av dig', 'om ditt tak'],
    lead: 'Skriv några rader här, eller ring om du hellre pratar.',
    checkar: [],
    // Ingen film i den vita kontaktsektionen (STIL döljer den); mallen kräver fälten.
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Din förfrågan',
    placeholder: 'Till exempel ort, typ av tak och ungefär hur stort det är.',
    formNot: 'Namn och telefon räcker. Resten fyller du i om du vill.',
    typer: ['Takmålning'],
  },

  // Ämnesraden i mejlet (dolt fält i formuläret): ingen förslagstext i sidans HTML. Nyckeln är fortfarande
  // demonyckeln (förfrågan landar hos Mathias); vid leverans: formular.nyckel med kundens egen nyckel.
  formular: { amne: 'Färga Tak: ny förfrågan från hemsidan', fran: 'Färga Tak hemsida' },

  // Dold i STIL: popupen låg över formuläret på både mobil och dator. Mallen kräver fältet.
  popup: {
    rubrik: 'Ser taket trött ut?',
    text: 'Ring eller skriv några rader om ditt tak.',
  },

  footer: {
    text: '',
    // Kolumnen Tjänster döljs i STIL ("Takmålning" står redan under Sidan).
    tjanster: [{ href: '#tjanster', txt: 'Takmålning' }],
  },
};

/* STIL: vit bas, knappar i dämpad korall (tema.accent), kraftig geometrisk versal-rubrik och takvinkeln som detalj.
   2026-11-09: Philip bad om vitt och inga neonknappar; Mathias: knapparna i loggans färg, fast matt. Stora ytor
   (band, processlinjen, handtaget) är neutrala. Mallen (🔒) är orörd. */
const K = '#FE504F'; // loggans korall: bara detalj (takvinkel, tunn linje), aldrig yta eller text
const STIL = `
#jobb,#omdomen,#om{display:none!important}
[class*="sida"]{--vit:#fff;--mjuk:#F5F7FA;--kram:#F7F4EE;--text:#0A0A0A;--text-2:#475569;--linje:#E2E8F0;--f-kursiv:var(--f-rubrik)}
body:has([class*="sida"]){background:#fff}
/* Header: vit med mörk text från start (telefonnumret, menypillret och "Meny" syns direkt på vitt). */
[class*="sida"] header{--bahko-hdr-t:1!important;background:rgba(255,255,255,.96)!important;box-shadow:0 1px 0 rgba(10,10,10,.08)!important}
/* Knappar: dämpad korall, vit text, ingen glöd (mallens korallskugga bort). */
[class*="sida"] [class*="btn"]:not(:focus-visible){box-shadow:none!important}
/* Hero: vitt. Den stora loggan döljs (headern bär den); h1 är "Takmålning i hela Sverige". */
[class*="sida"] [class*="hero"]{background:#fff!important;color:var(--text)}
[class*="sida"] [class*="hero"]::before{background:none!important}
[class*="sida"] #top p[class*="h1"]{display:none!important}
[class*="sida"] [class*="hero"] :is([class*="heroOrt"],[class*="heroTjanster"]){text-shadow:none!important;filter:none}
[class*="sida"] #top [class*="heroOrt"]{margin-top:0;color:var(--text)}
[class*="sida"] #top [class*="heroTjanster"]{font-family:var(--f-rubrik);font-style:normal;font-weight:700;letter-spacing:0;text-transform:none;color:var(--text)!important}
[class*="sida"] [class*="hero"] [class*="btnKontur"]{color:var(--text)!important;border-color:rgba(10,10,10,.28)!important;background:transparent!important}
[class*="sida"] [class*="heroForeEfter"] figcaption{color:var(--text-2)!important}
[class*="sida"] [class*="heroForeEfterBild"]{border-color:rgba(10,10,10,.12)!important;box-shadow:0 18px 40px rgba(10,10,10,.12)!important}
/* Tejp: ljusgrått band med mörk text och tunna linjer (Mathias: korallen passade inte in). */
[class*="sida"] [role="group"][class*="tejp"]{background:#F5F5F4!important;border-block:1px solid #E7E5E4!important}
[class*="sida"] [class*="tejpGrupp"] span{color:#0A0A0A!important;-webkit-text-stroke:0!important}
[class*="sida"] [class*="tejpGrupp"] span::after{background:#A8A29E!important}
/* Rubriker */
[class*="sida"] :is(h2,h3){font-family:var(--f-rubrik);font-weight:800;text-transform:uppercase;letter-spacing:.01em}
[class*="sida"] :is(h2,p) :is(em,i){font-style:normal;font-weight:800;text-transform:uppercase;letter-spacing:.02em}
[class*="sida"] h2 :is(em,i){color:var(--text)!important}
[class*="sida"] [class*="eyebrow"]{color:var(--text)!important}
[class*="sida"] [class*="eyebrow"]::before{content:"";display:inline-block;width:.9em;height:.5em;margin-right:.45em;vertical-align:.1em;background:${K}!important;clip-path:polygon(0 100%,50% 0,100% 100%,82% 100%,50% 36%,18% 100%)}
[class*="sida"] [class*="bock"]{color:var(--text)!important}
[class*="sida"] footer{border-top:2px solid ${K}}
/* Tätare: mindre luft under heron och mellan sektionerna (inga stora hål på telefon eller dator). */
[class*="sida"] #top{padding-bottom:clamp(2rem,5vh,3.5rem)!important}
[class*="sida"] main > section[class*="sek"]{padding-block:clamp(3.5rem,7vw,5.5rem)}
@media (min-width:901px){[class*="sida"] [class*="fragorGrid"]{align-items:center}[class*="sida"] [class*="fragorSida"]{position:static}}
/* Alla sektioner vita; tunna linjer skiljer dem åt. */
[class*="sida"] #process,[class*="sida"] #fragor,[class*="sida"] #varfor{background:#fff!important;border-top:1px solid var(--linje)}
/* Mobilmenyn: Ring-raden (nav.extra) som konturknapp; dubbletterna till #fragor och #kontakt bort. */
[class*="mobilMenyPanel"] a[href="#fragor"] ~ a[href="#fragor"],
[class*="mobilMenyPanel"] a[href="#kontakt"]:not([class*="btn"]){display:none!important}
[class*="mobilMenyPanel"] a[href^="tel:"]{justify-content:center;gap:.5rem;margin-top:1rem;min-height:52px;border:1.5px solid rgba(10,10,10,.28)!important;border-radius:12px;color:var(--text)}
/* Popupen av: den låg över formuläret på mobil och dator. Ring finns i headern, sidfliken och frågekortet. */
[class*="sida"] aside[class*="popup"]{display:none!important}
/* Sidfliken (dator): nedtonad, vit med mörk text och tunn kant. */
[class*="sida"] a[class*="sidflik"]{background:#fff!important;box-shadow:none!important;color:var(--text)!important;border:1px solid #D6D3D1;border-right:0;padding:.9rem .55rem;font-size:var(--tx-s);font-weight:600;letter-spacing:.08em}
[class*="sida"] a[class*="sidflik"]:hover{background:#F5F5F4!important}
/* Frågekortet: länken till formuläret i texten. */
[class*="sida"] [class*="fragaKort"] p a{color:var(--text);font-weight:600;text-decoration:underline;text-underline-offset:3px}
/* Varför: vitt, ingen glow. Texten är borta, filmen ligger centrerad. */
[class*="sida"] [class*="varfor"]{background:#fff!important;color:var(--text)}
[class*="sida"] [class*="varfor"]::before{display:none!important}
[class*="sida"] [class*="varfor"] [class*="paMork"],
[class*="sida"] [class*="varfor"] [class*="sekHuvud"]{color:var(--text)!important}
[class*="sida"] [class*="varfor"] :is([class*="eyebrow"],[class*="h2"],[class*="sekLead"]){color:inherit!important}
[class*="sida"] [class*="varfor"] [class*="sekLead"]{color:var(--text-2)!important}
[class*="sida"] [class*="varforPunkter"] li{background:#fff!important;border-color:var(--linje)!important;color:var(--text-2)!important}
[class*="sida"] [class*="varforPunkter"] b{color:var(--text)!important}
[class*="sida"] [class*="varfor"] [class*="btnKontur"]{color:var(--text)!important;border-color:rgba(10,10,10,.28)!important}
[class*="sida"] [class*="varforFilm"]{box-shadow:0 18px 40px rgba(10,10,10,.12)!important;outline:1px solid var(--linje)!important;background:#f3f4f6!important}
[class*="sida"] [class*="varforGrid"]{align-items:center}
[class*="sida"] [class*="varforMedia"]{position:static;margin-top:0}
/* Tjänster: runda linjeikoner överst på korten, i samma anda som bahkobyra.se (cirkelmärke, kort med kant). */
#tjanster{background:#fff!important;border-top:1px solid var(--linje)}
[class*="sida"] [class*="tjanstBildIn"]{display:none!important}
[class*="sida"] [class*="tjanstBild"]{aspect-ratio:auto;background:transparent!important;min-height:0;display:flex;justify-content:center;align-items:center;padding:1.7rem 0 0;overflow:visible}
[class*="sida"] [class*="tjanstIkon"]{position:static;left:auto;bottom:auto;width:104px;height:104px;margin:0;padding:22px;border-radius:50%;background:#fff;color:#0A0A0A;border:1px solid #E7E5E4;box-shadow:0 12px 28px rgba(10,10,10,.10);transition:transform .35s}
[class*="sida"] [class*="tjanst"]:hover [class*="tjanstIkon"]{transform:translateY(-6px) rotate(-4deg)}
[class*="sida"] [class*="tjanst"]{text-align:center;box-shadow:none!important;border:2px solid var(--linje)}
[class*="sida"] [class*="tjanst"]:hover{border-color:#B5433E;box-shadow:none!important}
[class*="sida"] [class*="tjanstTxt"]{padding:1.1rem 1.4rem 1.4rem;align-items:center}
[class*="sida"] [class*="tjanstTxt"] p{text-wrap:pretty}
/* Varför: bara filmen och knapparna, ingen tom textkolumn efter att lead och Ny firma tagits bort. */
[class*="sida"] [class*="varfor"] [class*="sekHuvud"],
[class*="sida"] [class*="varforPunkter"]{display:none!important}
[class*="sida"] [class*="varforGrid"]{grid-template-columns:1fr;justify-items:center}
[class*="sida"] [class*="varforMedia"]{position:static;margin-top:0;width:min(100%,56rem);order:-1}
[class*="sida"] [class*="varforCta"]{justify-content:center;margin-top:1.6rem}
/* Processen: alla hållplatser likadana (vit cirkel, svart kant och ikon), linjen svart. */
[class*="sida"] ol[class*="resa"]::after{background:#0A0A0A!important}
[class*="sida"] [class*="resaNod"]{border-color:#0A0A0A!important;color:#0A0A0A!important;background:#fff!important}
/* Frågornas öppna-ikon och kant: neutrala. */
[class*="sida"] details[open] [class*="fragaIkon"]{background:#0A0A0A!important}
[class*="sida"] details[open][class*="fraga"]{border-color:#CBD5E1!important}
/* Kontakt: vit sektion, ingen film och ingen slöja; formuläret på vitt kort med tunn kant. */
[class*="sida"] #kontakt{background:#fff!important;color:var(--text)!important;border-top:1px solid var(--linje);padding-block:clamp(3.5rem,7vw,5.5rem)}
[class*="sida"] #kontakt::before,[class*="sida"] #kontakt [class*="kontaktFilm"]{display:none!important}
[class*="sida"] #kontakt [class*="paMork"]{color:var(--text)!important}
[class*="sida"] #kontakt [class*="sekLead"]{color:var(--text-2)!important}
[class*="sida"] #kontakt ul[class*="kontaktCheckar"]:empty{display:none}
[class*="sida"] #kontakt [class*="kontaktRad"]{background:#fff!important;border-color:var(--linje)!important;-webkit-backdrop-filter:none;backdrop-filter:none}
[class*="sida"] #kontakt a[class*="kontaktRad"]:hover{background:var(--mjuk)!important}
[class*="sida"] #kontakt [class*="kontaktRad"] span{color:var(--text-2)!important}
[class*="sida"] #kontakt form{border:1px solid var(--linje);box-shadow:0 24px 60px -30px rgba(10,10,10,.22)!important}
@media (min-width:901px){[class*="sida"] #kontakt [class*="kontaktGrid"]{align-items:center}}
/* Footer: ingen tom text, kolumnen Tjänster bort (Takmålning står under Sidan), Kontakt en gång. */
[class*="sida"] footer p[class*="ftrText"]:empty{display:none}
[class*="sida"] footer [class*="ftrGrid"] > div[class*="ftrKol"]:not(:last-child){display:none}
@media (min-width:901px){[class*="sida"] footer [class*="ftrGrid"]{grid-template-columns:minmax(0,1.5fr) repeat(2,minmax(0,1fr))}}
[class*="sida"] footer nav li:has(a[href="#kontakt"]) ~ li:has(a[href="#kontakt"]){display:none}
`;

export default function FargaTakDemo() {
  return (
    <>
      {/* Jobbanden, omdömena och Om oss döljs tills det finns egna foton, riktiga omdömen och en ägartext (se PLATSHÅLLARE). */}
      {/* Kommentarerna i STIL är interna anteckningar: de rensas bort så att de inte följer med i kundens HTML. */}
      <style>{STIL.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\n\s*\n/g, '\n')}</style>
      <DemoSida data={data} />
      <ForeEfterReglage fore={`${M}/hero-fore.webp`} efter={`${M}/hero-efter.webp`} altFore="Illustration: tak före målning, mossigt och blekt" altEfter="Illustration: taket efter målning, nymålat i matt svart" />
    </>
  );
}
