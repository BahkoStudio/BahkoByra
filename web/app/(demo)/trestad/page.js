import DemoSida from '../_mall/DemoSida';

/* ===========================================================================
   TRESTAD BYGG AB — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: instagram.com/trestadbyggab · Vänersborg · har hemsida
   (trestadbygg.se — tre sidor: START, OM OSS, KONTAKTA OSS) — förslaget är
   en förbättring, inte en första sida. VARM: sa ja till gratis prototyp i
   IG-DM 2026-09-18, Mathias lovade prototyp inom 48 h.
   Byggd av en annan session 2026-09-18; omklädd till demomallen v3
   samma dag (0 credits).

   Bärande idé: det som avgör ett bygge syns aldrig. Tätskiktet, fallet mot
   brunnen, fästmassan bakom plattan. Firman har själv valt att certifiera
   sig enligt ISO 9001 — ett kvalitetssystem är just kravet att varje sådant
   moment dokumenteras. Förvandlingsfilmen visar badrummet före och efter.

   VERIFIERAT (trestadbygg.se via sökindex, IG-bio och profil ur Mathias
   skärmdump, allabolag/merinfo via sök — 2026-09-18):
   Firmanamn "Trestad Bygg AB" · org.nr 559463-5251 · registrerat 2023-12-18 ·
   Rådmansgatan 6, 462 37 Vänersborg · telefon 076-912 87 62 och e-post
   info@trestadbygg.se (sajtens kontaktsida) · IG-bio ordagrant "Byggföretag
   i Västra Götaland." · Facebook facebook.com/TrestadsByggRenovering ·
   sajtens egna formuleringar: "kvalitetssäkrat byggföretag med bas i
   Trestad – Vänersborg, Trollhättan och Uddevalla", bygger, renoverar och
   utvecklar fastigheter i Trestad och tar uppdrag i hela Västra Götaland,
   premiumtjänster till privatpersoner, företag och organisationer,
   hantverksskicklighet, erfarenhet och professionell projektledning,
   certifierade enligt ISO 9001, uttalat miljöansvar · logotypen är deras
   egen (IG-profilbilden, vit skiva bortnycklad; mörk variant gjord för
   ljusa ytor — samma märke) · de tre bilderna i Instagram-sektionen är
   deras egna IG-foton (jugendvillan, det vita köket, badrummet med
   valvspeglarna).

   INTE verifierat, och finns därför inte på sidan: antal anställda,
   omsättning, antal projekt, Google-recensioner (inga hittade), garantier,
   försäkringar, priser, vilket organ som utfärdat ISO-certifikatet.
   "Svar inom ett dygn" och kostnadsfritt hembesök är löften i förslagets
   form — ska bekräftas innan demon skickas.

   FÖRVÄXLINGSRISK: Allbygg Trestad AB, Trestads Bygg & Underhåll i
   Vänersborg AB, Bygg Bolaget Trestad AB och Trestads Murarfirma AB är
   ANDRA bolag. Nämns aldrig.

   MEDIA: 0 credits. Förvandlingsfilmen och badrumsbilderna är
   badrumsserien från hd (illustration — samma klipp som hd-demon);
   köket och uterummet via förra versionen, villan ur biblioteket
   (alggarden). Märkta som illustration i noterna.

   FLAGGOR: riktigt telefon och mejl — visa inte offentligt. Formuläret går
   till mathias@bahkobyra.se. ISO 9001 är firmans egen uppgift och bör
   bekräftas. Logotypen kommer ur en skärmdump — be om vektorfil. Omdömen i
   exempelläge. Instagram-inlägg gick inte att läsa ut 2026-09-18 —
   IG-sektionen visar deras egna IG-foton i Instagram-ram (små original).
   =========================================================================== */

export const metadata = {
  title: 'Trestad Bygg AB — bygg och renovering i Vänersborg, Trollhättan och Uddevalla',
  description:
    'Kvalitetssäkrat byggföretag enligt ISO 9001. Badrum, kök, renovering, tillbyggnad och uterum i Vänersborg, Trollhättan, Uddevalla och hela Västra Götaland. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

const M = '/trestad/media';

const data = {
  namn: 'Trestad Bygg AB',
  tema: {
    mork: '#0C1320',
    accent: '#1F5FBF',
    accentHover: '#1A51A3',
    accentText: '#1A51A3',
    accentLjus: '#8AB6FF',
    paAccent: '#fff',
  },
  logo: { src: `${M}/logo-trestad.png`, w: 477, h: 414, alt: 'Trestad Bygg AB', topp: 'vit' },
  kontakt: {
    tel: '076-912 87 62',
    telHref: 'tel:+46769128762',
    epost: 'info@trestadbygg.se',
    adress: 'Rådmansgatan 6, 462 37 Vänersborg',
    ig: 'https://www.instagram.com/trestadbyggab/',
    igHandle: '@trestadbyggab',
    fb: 'https://www.facebook.com/TrestadsByggRenovering/',
    orgnr: '559463-5251',
  },
  cta: { txt: 'Boka kostnadsfritt hembesök', kort: 'Boka hembesök', lank: 'Boka hembesök' },
  nav: {
    vanster: [{ href: '#tjanster', txt: 'Tjänster' }, { href: '#jobb', txt: 'Projekt' }],
    hoger: [{ href: '#om', txt: 'Om oss' }, { href: '#fragor', txt: 'Frågor' }],
  },
  formAction: 'mailto:mathias@bahkobyra.se?subject=Trestad%20Bygg%20-%20hembes%C3%B6k',

  hero: {
    marke: 'Vänersborg · Trollhättan · Uddevalla',
    h1: ['Trestad', { txt: 'Bygg AB', liten: true }],
    ingress: 'Det som avgör ett bygge syns aldrig. Kvalitetssäkrat enligt ISO 9001, med bas i Trestad och uppdrag i hela Västra Götaland.',
    video: `${M}/video-hero-badrum.mp4`,
    videoMobil: `${M}/video-hero-badrum-mobil.mp4`,
    poster: `${M}/poster-hero.jpg`,
    posterMobil: `${M}/poster-hero-mobil.jpg`,
    bevis: ['Certifierade enligt ISO 9001', 'Kostnadsfritt hembesök', 'Hela Västra Götaland'],
  },

  tjanster: {
    eyebrow: 'Vad vi gör',
    rubrik: ['Bygg och renovering', 'i hela Västra Götaland'],
    lead: 'Vi bygger, renoverar och utvecklar fastigheter åt privatpersoner, företag och organisationer. Hantverket är vårt, och det som kräver andra yrken projektleder vi.',
    kort: [
      { id: 'badrum', namn: 'Badrum och våtrum', bild: `${M}/tjanst-badrum.jpg`, alt: 'Våtrum under uppbyggnad med gips, laser och plattsättning', text: 'Hela badrummet, från rivning till sista fogen. Tätskikt och fall mot brunnen syns inte efteråt, därför dokumenterar vi dem.', punkter: ['Totalrenovering', 'Tätskikt och plattsättning', 'Tvättstuga'], ritning: (<><path d="M30 20h140v84H30z" /><path d="M30 48h140M30 76h140M77 20v84M123 20v84" /></>) },
      { id: 'kok', namn: 'Kök och inredning', bild: `${M}/tjanst-kok.jpg`, alt: 'Renoverat kök med ljusa luckor', text: 'Nytt kök i ett hus som redan står där. Vi löser väggar som inte är raka och stammar som sitter fel innan luckorna kommer.', punkter: ['Köksrenovering', 'Snickeri och inredning', 'Målning'], ritning: (<><path d="M20 60h160v44H20z" /><path d="M60 60v44M100 60v44M140 60v44" /><path d="M20 20h160v24H20z" /></>) },
      { id: 'renovering', namn: 'Renovering och tillbyggnad', bild: `${M}/tjanst-renovering.jpg`, alt: 'Villa med mörk träfasad och vita fönster', text: 'Rum, våningar och hela fastigheter. Behöver bygget fler yrken håller vi ihop dem, och du har en kontakt genom hela projektet.', punkter: ['Totalrenovering', 'Tillbyggnad', 'Fastighetsutveckling'], ritning: (<><path d="M20 104V52l50-32 50 32v52" /><path d="M120 104V64h60v40" /><path d="M20 104h160" /></>) },
      { id: 'uterum', namn: 'Uterum och altan', bild: `${M}/tjanst-uterum.jpg`, alt: 'Inglasat uterum mot en trädgård', text: 'Uterum och altaner ritade efter huset som redan finns. Grunden och infästningen görs rätt först.', punkter: ['Uterum', 'Altan och trädäck', 'Räcken och trappor'], ritning: (<><path d="M20 100h160" /><path d="M30 100V50h140v50" /><path d="M30 50l70-30 70 30" /><path d="M65 50v50M100 50v50M135 50v50" /></>) },
    ],
  },

  jobb: {
    eyebrow: 'Projekt',
    rubrik: ['Ett litet bolag', 'med stora bolags ordning'],
    lead: 'Varje moment kvitteras av innan nästa påbörjas. Så ser det ut på vägen.',
    not: 'Illustrationsbilder — byts mot era egna projektfoton. Bilderna i Instagram-sektionen är era egna.',
    tid: '60s',
    rad1: [
      { src: `${M}/jobb-badrum-80tal.jpg`, alt: 'Slitet badrum från 80-talet med gammalt kakel', txt: 'Före: badrum från 80-talet' },
      { src: `${M}/jobb-badrum-pagar.jpg`, alt: 'Badrum under renovering med nya våtrumsskivor', txt: 'Våtrumsskivorna på plats' },
    ],
    rad2: [
      { src: `${M}/jobb-plattsattning.jpg`, alt: 'Plattsättning pågår i ett våtrum', txt: 'Plattsättning, rad för rad' },
      { src: `${M}/jobb-fog.jpg`, alt: 'Närbild på en ny fog mellan plattor', txt: 'Fogen där det syns' },
    ],
  },

  varfor: {
    eyebrow: 'Varför Trestad',
    rubrik: ['Det som avgör ett bygge', 'syns aldrig'],
    lead: 'Det du ser är kaklet. Det som avgör om badrummet står sig är tätskiktet under det, fallet mot brunnen och fogen runt om.',
    punkter: [
      { rubrik: 'Certifierade enligt ISO 9001', text: 'Varje moment dokumenteras, och du får pärmen vid överlämningen.' },
      { rubrik: 'Nära till hands', text: 'Bas i Vänersborg, Trollhättan och Uddevalla, uppdrag i hela Västra Götaland.' },
      { rubrik: 'Ett nummer', text: 'Hantverk och projektledning i samma bolag. Vi håller ihop resten.' },
      { rubrik: 'Ärliga råd', text: 'Räcker det att renovera det som redan sitter säger vi det, även när ett helt byte hade gett oss mer betalt.' },
    ],
    video: `${M}/video-varfor-forvandling.mp4`,
    poster: `${M}/poster-varfor.jpg`,
    videoAlt: 'Ett slitet badrum från 80-talet blir ett nytt, kaklat badrum. Filmen slutar med Trestad Byggs logotyp.',
    not: 'Filmen är en illustration av en badrumsrenovering.',
  },

  om: {
    eyebrow: 'Om Trestad Bygg',
    rubrik: ['Kvalitetssäkrat', 'byggföretag i Trestad'],
    kortRad: 'Vänersborg',
    stycken: [
      'Trestad Bygg AB är ett kvalitetssäkrat byggföretag med bas i Trestad: Vänersborg, Trollhättan och Uddevalla. Vi bygger, renoverar och utvecklar fastigheter och tar uppdrag i hela Västra Götaland.',
      'Vi erbjuder privatpersoner, företag och organisationer hantverksskicklighet, erfarenhet och professionell projektledning, med ett uttalat miljöansvar.',
    ],
    bevis: [
      { ord: 'ISO 9001', text: 'certifierat kvalitetssystem' },
      { ord: 'Tre städer', text: 'Vänersborg, Trollhättan, Uddevalla' },
      { ord: 'En kontakt', text: 'genom hela projektet' },
    ],
  },

  steg: {
    eyebrow: 'Så går det till',
    rubrik: ['Fem steg, och', 'inget hoppas över'],
    lead: 'Det börjar med ett samtal och slutar med att du får dokumentationen i handen.',
    lista: [
      { namn: 'Ring eller skriv', text: 'Berätta vad du vill göra. Du får svar inom ett dygn.' },
      { namn: 'Kostnadsfritt hembesök', text: 'Vi tittar på rummet, huset eller tomten och säger vad som behöver göras.' },
      { namn: 'Offert och tidplan', text: 'Vad som ingår, vad det kostar och när vi är klara, innan vi börjar.' },
      { namn: 'Bygget, steg för steg', text: 'Varje moment kvitteras av innan nästa påbörjas. Tätskiktet är godkänt innan plattan sätts.' },
      { namn: 'Överlämning', text: 'Vi går igenom allt och lämnar över dokumentationen.' },
    ],
  },

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Vad kunderna', 'säger'],
    lista: [
      { namn: 'Badrum', kalla: 'Vänersborg', exempel: true, text: 'Här står ett riktigt omdöme från en kund, med namn och ort som de själva skrivit det.' },
      { namn: 'Köksrenovering', kalla: 'Trollhättan', exempel: true, text: 'Ett andra kort, hämtat ur er Google-profil när den är på plats.' },
      { namn: 'Tillbyggnad', kalla: 'Uddevalla', exempel: true, text: 'Ett tredje kort. Tre riktiga omdömen räcker för att sidan ska kännas sann.' },
    ],
    not: 'Exempel — byts mot era riktiga omdömen. Här står ert Google-betyg när profilen är på plats.',
    lank: { href: 'https://www.google.com/maps/search/Trestad+Bygg+AB+V%C3%A4nersborg', txt: 'Hitta oss på Google' },
  },

  instagram: {
    eyebrow: 'Instagram',
    rubrik: ['Följ bygget', 'i vardagen'],
    lead: 'Villor, kök och badrum, som vi visar dem på Instagram.',
    bio: 'Byggföretag i Västra Götaland.',
    kort: [
      { bild: `${M}/ig-jugendvilla.jpg`, alt: 'Jugendvilla med ljus fasad', text: 'Jugendvillan, varsamt omhändertagen.' },
      { bild: `${M}/ig-kok-vitt.jpg`, alt: 'Vitt kök med ljusa bänkar', text: 'Vitt kök, från stommarna till luckorna.' },
      { bild: `${M}/ig-badrum-valvspeglar.jpg`, alt: 'Badrum med två valvformade speglar', text: 'Badrum med valvspeglar. Det som avgör syns inte, men det här gör det.' },
    ],
  },

  fragor: {
    eyebrow: 'Vanliga frågor',
    rubrik: ['Det du brukar', 'fråga först'],
    lead: 'Pengar och tid först, det tekniska sedan.',
    kort: { rubrik: 'Hittar du inte svaret?', text: 'Ring och fråga rakt ut. Gäller det just ditt hus är telefonen snabbare än en sida.' },
    lista: [
      { q: 'Vad kostar en renovering?', a: 'Det beror helt på rummet och på vad som döljer sig bakom väggen. Därför börjar vi med ett kostnadsfritt hembesök och en offert där du ser vad som ingår.' },
      { q: 'Vad betyder ISO 9001 för mig som kund?', a: 'Att vi arbetar efter ett dokumenterat kvalitetssystem. Varje moment har ett bestämt sätt att utföras och kvitteras av innan nästa påbörjas, och du får dokumentationen vid överlämningen.' },
      { q: 'Kan jag använda ROT-avdrag?', a: 'Arbetskostnaden vid renovering, om- och tillbyggnad ger normalt rätt till ROT-avdrag. Vi går igenom vad som gäller när vi räknar på det.' },
      { q: 'Hur lång tid tar ett badrum?', a: 'Ett normalstort badrum tar några veckor, och tätskiktet behöver sin torktid oavsett hur bråttom någon har. Du får en tidplan i offerten, och det är den vi håller.' },
      { q: 'Vilka områden arbetar ni i?', a: 'Vi har vår bas i Trestad, alltså Vänersborg, Trollhättan och Uddevalla, och tar uppdrag i hela Västra Götaland.' },
      { q: 'Gör ni uterum och altaner också?', a: 'Ja. Uterum, altan och trädäck, anpassade efter huset som redan står där.' },
      { q: 'Gör ni allt själva?', a: 'Vi gör hantverket och projektleder det som kräver andra yrken, som el och vatten. Du har fortfarande en kontaktperson och en tidplan.' },
      { q: 'Hur kommer jag igång?', a: 'Ring, eller skriv några rader om vad du vill göra. Du får svar inom ett dygn och ett kostnadsfritt hembesök när det passar dig.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Vad ska göras?', 'Börja med hembesöket.'],
    lead: 'Berätta vad du vill göra, så återkommer vi inom ett dygn och bokar ett kostnadsfritt hembesök.',
    checkar: ['Kostnadsfritt hembesök', 'Svar inom ett dygn', 'Dokumentation vid överlämningen'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta kort om projektet',
    placeholder: 'Vad som ska göras, var huset står och när du vill att det ska vara klart',
    formNot: 'Skriv kort om projektet, då kan vi ge ett vettigt svar redan i första samtalet. Inga massutskick, ingen säljlista.',
  },

  popup: {
    rubrik: 'Ska badrummet göras om?',
    text: 'Hembesöket kostar ingenting, och du får höra vad som behöver göras innan du bestämmer dig.',
  },

  footer: {
    text: 'Badrum, kök, renovering, tillbyggnad och uterum med bas i Vänersborg, Trollhättan och Uddevalla. Kvalitetssäkrat arbete enligt ISO 9001, i hela Västra Götaland.',
  },

  modal: {
    rubrik: 'Så här kan Trestad Bygg se ut på nätet',
    text: 'Det här är ett kostnadsfritt förslag, byggt på det ni själva skriver på trestadbygg.se och visar på Instagram. Ingen beställning, inget åtagande. Vill ni se den skarpt med era egna projektfoton, riktiga omdömen och ett formulär som landar i inkorgen? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.',
  },
};

export default function TrestadDemo() {
  return <DemoSida data={data} />;
}
