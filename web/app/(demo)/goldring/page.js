import DemoSida from '../_mall/DemoSida';

/* ===========================================================================
   GOLDRING BYGG & ENTREPRENAD AB — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: instagram.com/goldringbygg · Kågeröd, nordvästra Skåne · har hemsida
   (goldring.se, WordPress/Yoast på one.com — ett rutnät av stad × tjänst-
   sidor med samma text) — förslaget är en förbättring, inte en första sida.
   Byggd av en annan session 2026-09-17; omklädd till demomallen v3
   2026-09-18 (0 credits).

   Bärande idé: ett bygge är många yrken, men kunden ska bara behöva ringa
   ett nummer. Firmans egna ord: "snickeri, hantverk, projektledning och
   konsultation", "nybyggnation, renoveringar och specialkonstruktioner",
   "brett nätverk av samarbetspartners". Projektledningen ÄR argumentet.

   VERIFIERAT (goldring.se via sökindex, IG-bio ur Mathias skärmdump,
   allabolag/proff via sök — 2026-09-17):
   Firmanamn "Goldring Bygg & Entreprenad AB" · org.nr 559319-6230 ·
   registrerat 2021-05-27 · Petréns väg 6, 268 77 Kågeröd (registret) ·
   telefon 070-719 84 44 och e-post alexander@goldring.se (IG-bion) ·
   kontakt Alexander Goldring (styrelseledamot) · IG-bio ordagrant
   "Byggfirma i Nordvästra Skåne" · sajtens tjänster: snickeri, renovering,
   nybyggnation, tillbyggnad, takarbeten/takbyte, uterum, altaner och
   trädäck, kök och badrum, fönsterbyte, projektledning, konsultation ·
   sajtens orter: Helsingborg, Ängelholm, Landskrona, Svalöv, Klippan ·
   Facebook-sida hittad via sök · logotypen är deras egen (IG-profilbilden;
   en mörk variant gjord för ljusa ytor — samma märke, grått ordmärke) ·
   de tre bilderna i Instagram-sektionen är deras egna IG-foton (trädäck,
   poolrum, takisolering) ur samma skärmdump.

   INTE verifierat, och finns därför inte på sidan: antal anställda,
   omsättning, antal projekt, Google-recensioner (inga hittade),
   försäkringar, garantier, ledtider, priser. "Svar inom en arbetsdag" och
   kostnadsfritt hembesök är löften i förslagets form — Alexander ska
   bekräfta dem innan demon skickas.

   MEDIA: 0 credits. Förvandlingsfilmen, heron och altanbilderna är
   altanserien från rskompakt (illustration); uterum, tak och badrum ur
   biblioteket via förra versionen; villan och nybygget ur cloud/bygg.
   Märkta som illustration i noterna. Instagram-bilderna är deras egna.

   FLAGGOR: riktigt telefon och mejl — visa inte offentligt. Formuläret går
   till mathias@bahkobyra.se. Logotypen är 178 px ur en skärmdump — be om
   vektorfil (slutkortet i filmen blir mjukt av uppskalningen). Omdömen i
   exempelläge. Instagram-inlägg gick inte att läsa ut 2026-09-18 —
   IG-sektionen visar deras egna IG-foton i Instagram-ram.
   2026-09-19 (Mathias feedback): heron är logotyp + ort + två tjänster,
   tjänsteband under heron, stegen är en resa utan siffror. Filmerna har
   bytt plats: FÖRVANDLINGEN (genererad illustration) är hero-film, och den
   lugna filmen ur ett foto ligger i Varför med logotypen på slutet.
   Illustrationsnoten under filmen är struken på Mathias begäran — att
   hero-filmen är en illustration står bara här och i leadfilen.
   =========================================================================== */

export const metadata = {
  title: 'Goldring Bygg & Entreprenad — byggfirma i nordvästra Skåne: uterum, altan, tak, renovering',
  description:
    'Byggfirma i Kågeröd. Uterum, altan, takbyte, kök, badrum, tillbyggnad och nybyggnation i Helsingborg, Ängelholm, Landskrona, Svalöv och Klippan. En kontakt genom hela bygget. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

const M = '/goldring/media';

const data = {
  namn: 'Goldring Bygg & Entreprenad AB',
  tema: {
    mork: '#16140F',
    accent: '#C99A3D',
    accentHover: '#B3872F',
    accentText: '#85600F',
    accentLjus: '#E0B45A',
    paAccent: '#0F172A',
  },
  logo: { src: `${M}/logo-goldring.png`, ljus: `${M}/logo-goldring-vit.png`, w: 178, h: 197, alt: 'Goldring Bygg & Entreprenad AB', topp: 'vit' },
  kontakt: {
    tel: '070-719 84 44',
    telHref: 'tel:+46707198444',
    epost: 'alexander@goldring.se',
    adress: 'Petréns väg 6, 268 77 Kågeröd',
    ig: 'https://www.instagram.com/goldringbygg/',
    igHandle: '@goldringbygg',
    fb: 'https://www.facebook.com/p/Goldring-Bygg-Entreprenad-AB-100072164707743/',
    orgnr: '559319-6230',
  },
  cta: { txt: 'Boka kostnadsfritt hembesök', kort: 'Boka hembesök', lank: 'Boka hembesök' },
  nav: {
    vanster: [{ href: '#tjanster', txt: 'Tjänster' }, { href: '#jobb', txt: 'Projekt' }],
    hoger: [{ href: '#om', txt: 'Om oss' }, { href: '#fragor', txt: 'Frågor' }],
  },
  formAction: 'mailto:mathias@bahkobyra.se?subject=Goldring%20Bygg%20-%20hembes%C3%B6k',

  hero: {
    ort: 'Nordvästra Skåne',
    tjanster: ['Bygg', 'Entreprenad'],
    video: `${M}/video-hero-fore-efter-altan.mp4`,
    videoMobil: `${M}/video-hero-fore-efter-altan-mobil.mp4`,
    poster: `${M}/poster-hero.jpg`,
    posterMobil: `${M}/poster-hero-mobil.jpg`,
  },
  tejp: ['Uterum', 'Altan', 'Takbyte', 'Kök', 'Badrum', 'Tillbyggnad', 'Nybyggnation', 'Snickeri'],

  tjanster: {
    eyebrow: 'Vad vi gör',
    rubrik: ['Ute, inne', 'och det som håller ihop det'],
    lead: 'Uterum, altan och tak är det som syns från vägen. Kök, badrum och tillbyggnad är det som gör huset till ert.',
    kort: [
      { id: 'uterum', namn: 'Uterum och altan', bild: `${M}/tjanst-uterum.jpg`, alt: 'Inglasat uterum i trä mot en trädgård', text: 'Uterum ritade för att smälta in i huset som redan står där, och altaner som tål tjugo vintrar. Grunden görs rätt först.', punkter: ['Uterum', 'Altan och trädäck', 'Räcken och trappor'], ritning: (<><path d="M20 100h160" /><path d="M30 100V50h140v50" /><path d="M30 50l70-30 70 30" /><path d="M65 50v50M100 50v50M135 50v50" /></>) },
      { id: 'tak', namn: 'Tak och takbyte', bild: `${M}/tjanst-tak.jpg`, alt: 'Takläggning pågår på ett villatak', text: 'Från enstaka läckor till hela takbyten. Vi säger om det räcker att lägga om delar innan vi räknar på ett helt.', punkter: ['Takbyte', 'Takarbeten', 'Fönsterbyte'], ritning: (<><path d="M16 80l84-56 84 56" /><path d="M36 67h128M56 53h88M76 40h48" /><path d="M30 80v24h140V80" /></>) },
      { id: 'badrum', namn: 'Kök och badrum', bild: `${M}/tjanst-badrum.jpg`, alt: 'Renoverat badrum med kakel och dusch', text: 'Kök och badrum där funktion och form hänger ihop. Snickeriet är vårt, andra yrken håller vi ihop åt dig.', punkter: ['Köksrenovering', 'Badrumsrenovering', 'Platsbyggt snickeri'], ritning: (<><path d="M30 20h140v84H30z" /><path d="M30 48h140M30 76h140M77 20v84M123 20v84" /></>) },
      { id: 'tillbyggnad', namn: 'Tillbyggnad och nybyggnation', bild: `${M}/tjanst-nybygge.jpg`, alt: 'Nybyggd villa med svart träfasad', text: 'Från tillbyggnaden som ger familjen ett rum till, till nybyggnation och specialkonstruktioner. En kontakt hela vägen.', punkter: ['Tillbyggnad', 'Nybyggnation', 'Specialkonstruktioner'], ritning: (<><path d="M20 104V52l50-32 50 32v52" /><path d="M120 104V64h60v40" /><path d="M20 104h160" /></>) },
    ],
  },

  jobb: {
    eyebrow: 'Projekt',
    rubrik: ['Bräda för bräda,', 'med en tidplan som håller'],
    lead: 'Altaner, tak och hus i nordvästra Skåne.',
    not: 'Illustrationsbilder — byts mot era egna projektfoton. Bilderna i Instagram-sektionen är era egna.',
    tid: '60s',
    rad1: [
      { src: `${M}/jobb-sliten-altan.jpg`, alt: 'Sliten grå altan med spruckna brädor och mossa', txt: 'Före: altanen har gjort sitt' },
      { src: `${M}/jobb-altan-byggs.jpg`, alt: 'Ny altan i furu läggs bredvid den gamla', txt: 'Nya brädor läggs' },
      { src: `${M}/jobb-altanhorn.jpg`, alt: 'Närbild på ett altanhörn i nytt trä', txt: 'Hörnet där det syns' },
    ],
    rad2: [
      { src: `${M}/jobb-nybyggt-hus.jpg`, alt: 'Nybyggt mörkgrått hus i kvällsljus', txt: 'Nybygge, nyckelfärdigt' },
      { src: `${M}/jobb-altanbrador.jpg`, alt: 'Nya altanbrädor i furu intill ett ljusgrått hus', txt: 'Altan med insynsskydd' },
    ],
  },

  varfor: {
    eyebrow: 'Varför Goldring',
    rubrik: ['Ett nummer', 'för hela bygget'],
    lead: 'Ett bygge är många yrken. Du ska inte behöva stå mitt emellan dem.',
    punkter: [
      { rubrik: 'Du ringer ett nummer', text: 'Snickeri, projektledning och ett nätverk av samarbetspartners. Vi håller ihop resten.' },
      { rubrik: 'Samma person hela vägen', text: 'Från Kågeröd till Helsingborg, Ängelholm, Landskrona, Svalöv och Klippan.' },
      { rubrik: 'Tydligt pris först', text: 'Du ser vad som ingår och vad det kostar innan vi börjar.' },
      { rubrik: 'Ärliga råd', text: 'Är det ett jobb för en ensam snickare säger vi det. Då betalar du inte för projektledning du inte behöver.' },
    ],
    video: `${M}/video-varfor-altan.mp4`,
    poster: `${M}/poster-varfor.jpg`,
    videoAlt: 'Långsam inzoomning över en nybyggd altan i furu. Filmen slutar med Goldrings logotyp.',
  },

  om: {
    eyebrow: 'Om Goldring',
    rubrik: ['Byggfirma i', 'nordvästra Skåne'],
    kortRad: 'Kågeröd',
    stycken: [
      'Goldring Bygg & Entreprenad AB startade 2021 i Kågeröd. Vi arbetar med snickeri, hantverk, projektledning och konsultation, från altaner och uterum till renoveringar, nybyggnation och specialkonstruktioner.',
      'Bakom oss finns ett brett nätverk av samarbetspartners. Du har en kontakt, Alexander, genom hela bygget.',
    ],
    bevis: [
      { ord: 'Sedan 2021', text: 'byggfirma i Kågeröd' },
      { ord: 'Fem orter', text: 'från Helsingborg till Klippan' },
      { ord: 'En kontakt', text: 'genom hela bygget' },
    ],
  },

  steg: {
    eyebrow: 'Så går det till',
    rubrik: ['Fem steg, och samma person', 'i alla fem'],
    lead: 'Det börjar med ett samtal och slutar med en genomgång där du får säga om något sitter fel.',
    lista: [
      { namn: 'Ring eller skriv', text: 'Berätta vad du vill bygga. Du får svar inom en arbetsdag.' },
      { namn: 'Kostnadsfritt hembesök', text: 'Vi tittar på huset, tomten eller taket och säger vad som kräver bygglov.' },
      { namn: 'Offert med tydligt pris', text: 'Du ser vad som ingår och vad det kostar. Behövs fler yrken står de med.' },
      { namn: 'Bygget', text: 'En kontakt genom hela projektet, en tidplan som hålls och en städad arbetsplats.' },
      { namn: 'Slutgenomgång', text: 'Vi går igenom allt innan vi lämnar. Är något fel tar vi det då, inte om ett halvår.' },
    ],
  },

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Vad kunderna', 'säger'],
    lista: [
      { namn: 'Villaägare', kalla: 'Helsingborg', exempel: true, text: 'Här står ett riktigt omdöme från en kund, med namn och ort som de själva skrivit det.' },
      { namn: 'Altanbygge', kalla: 'Svalöv', exempel: true, text: 'Ett andra kort, hämtat ur er Google-profil när den är på plats.' },
      { namn: 'Takbyte', kalla: 'Ängelholm', exempel: true, text: 'Ett tredje kort. Tre riktiga omdömen räcker för att sidan ska kännas sann.' },
    ],
    not: 'Exempel — byts mot era riktiga omdömen. Här står ert Google-betyg när profilen är på plats.',
    lank: { href: 'https://www.google.com/maps/search/Goldring+Bygg+%26+Entreprenad+AB+K%C3%A5ger%C3%B6d', txt: 'Hitta oss på Google' },
  },

  instagram: {
    eyebrow: 'Instagram',
    rubrik: ['Följ bygget', 'i vardagen'],
    lead: 'Trädäck, poolrum och tak, som vi visar dem på Instagram.',
    bio: 'Byggfirma i Nordvästra Skåne',
    kort: [
      { bild: `${M}/ig-tradack.jpg`, alt: 'Nybyggt trädäck i trä', text: 'Trädäck på plats, klart för sommaren.' },
      { bild: `${M}/ig-poolrum.jpg`, alt: 'Inomhuspool i ett nybyggt poolrum', text: 'Poolrum från grund till färdig yta.' },
      { bild: `${M}/ig-takisolering.jpg`, alt: 'Takisolering mellan takstolar', text: 'Det ingen ser: isoleringen görs rätt.' },
    ],
  },

  fragor: {
    eyebrow: 'Vanliga frågor',
    rubrik: ['Det du brukar', 'fråga först'],
    lead: 'Pengar och bygglov först, det praktiska sedan.',
    kort: { rubrik: 'Hittar du inte svaret?', text: 'Ring Alexander och fråga rakt ut. Gäller det just ditt hus är telefonen snabbare än en sida.' },
    lista: [
      { q: 'Vad kostar det att anlita er?', a: 'Det beror helt på projektet, därför börjar vi alltid med ett kostnadsfritt hembesök och en offert. Du får ett tydligt pris innan något arbete påbörjas.' },
      { q: 'Kan jag använda ROT-avdrag?', a: 'Arbetskostnaden vid renovering, tillbyggnad och underhåll ger normalt rätt till ROT-avdrag. Vi går igenom vad som gäller när vi räknar på det.' },
      { q: 'Behöver jag bygglov för ett uterum eller en tillbyggnad?', a: 'Det beror på storlek, placering och vad som redan byggts på tomten. Vi tittar på det vid hembesöket och säger vad som gäller.' },
      { q: 'Hur lång tid tar ett projekt?', a: 'En altan tar ofta någon vecka, ett uterum eller en tillbyggnad längre. Du får en tidplan i offerten, och det är den vi håller.' },
      { q: 'Behöver jag byta hela taket?', a: 'Inte alltid. Vi tittar på råspont, underlag och pannor var för sig. Räcker det med delar säger vi det.' },
      { q: 'Vad händer om bygget kräver fler yrken än snickare?', a: 'Då håller vi ihop det. Vi projektleder och tar in samarbetspartner, och du har fortfarande en kontakt och en tidplan.' },
      { q: 'Vilka områden arbetar ni i?', a: 'Vi utgår från Kågeröd och tar uppdrag i nordvästra Skåne: Helsingborg, Ängelholm, Landskrona, Svalöv, Klippan och orterna däremellan.' },
      { q: 'Hur kommer jag igång?', a: 'Ring, eller skriv några rader om vad du vill bygga. Du får svar inom en arbetsdag och ett kostnadsfritt hembesök när det passar dig.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Redo att komma igång?', 'Börja med hembesöket.'],
    lead: 'Berätta vad du vill bygga, så återkommer vi inom en arbetsdag och bokar ett kostnadsfritt hembesök.',
    checkar: ['Kostnadsfritt hembesök', 'Svar inom en arbetsdag', 'En kontakt genom hela bygget'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Vad vill du bygga?',
    placeholder: 'Vad du vill bygga, var huset står och när du vill att det ska vara klart',
    formNot: 'Skriv kort om projektet, då kan vi ge ett vettigt svar redan i första samtalet. Inga massutskick, ingen säljlista.',
  },

  popup: {
    rubrik: 'Funderar du på uterum?',
    text: 'Hembesöket kostar ingenting, och du får höra vad som kräver bygglov och vad som inte gör det.',
  },

  footer: {
    text: 'Uterum, altan, tak, kök, badrum, tillbyggnad och nybyggnation i Helsingborg, Ängelholm, Landskrona, Svalöv och Klippan. Snickeri och projektledning under samma nummer.',
  },

  modal: {
    rubrik: 'Så här kan Goldring Bygg se ut på nätet',
    text: 'Det här är ett kostnadsfritt förslag, byggt på det ni själva visar på goldring.se och Instagram. Ingen beställning, inget åtagande. Vill ni se den skarpt med era egna projektfoton, riktiga omdömen och ett formulär som landar i inkorgen? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.',
  },
};

export default function GoldringDemo() {
  return <DemoSida data={data} />;
}
