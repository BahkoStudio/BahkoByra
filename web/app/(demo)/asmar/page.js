import DemoSida from '../_mall/DemoSida';

/* ===========================================================================
   ASMAR RELINING AB — kostnadsfritt hemsideförslag från Bahko Byrå (varm lead)
   Lead: asmarrelining.se · instagram.com/asmar_relining · relining, rörinspektion,
   spolning/fräsning och serviceavtal i Stockholms län, Järfälla och Uppsala.
   Mathias pratade med Asmar i telefon 2026-10-29; han bad om ett mejl med vem vi är,
   vad vi gör, hur de hamnar på första sidan på Google, demon och priserna.
   Ombyggd 2026-10-29 på demomallen v3 (kanon: swedcro) från den statiska demon
   /cloud/asmar/ (2026-08). Den gamla adressen 301:ar hit (next.config.mjs).

   Bärande idé (ur deras eget material): nya rör inuti de gamla, utan att riva och
   utan stambyte. Ni bor kvar. Vi filmar före och efter, så ni ser skillnaden själva.

   VERIFIERAT (asmarrelining.se alla sidor, reco.se, Instagram-embed, 2026-10-29):
   - Firmanamn "Asmar Relining AB", org.nr 559389-0980 (sajtens html och reco.se;
     årsredovisning 2025/26 undertecknad av Youssef Asmar). Meteorvägen 4, 175 60
     Järfälla. Telefon 08-799 99 21, mobil 0763 372 323, info@asmarrelining.se och
     yosef@asmarrelining.se. Kontaktperson Yosef Asmar, projektledare. Öppet mån–fre 07–16.
   - Tjänster i deras ord: rörinspektion (filmning med kamera, "det erbjuder vi
     kostnadsfritt"), relining/rörinfodring (strumpa + epoxi, "teknisk livslängd på
     50 år", "rör äldre än 50 år"), spolning och fräsning, serviceavtal (spolning,
     filmning, inspektion återkommande, för BRF/förvaltare). Område: "hela Stockholms
     län, Järfälla och Uppsala"; på Reco "Storstockholm, Mälardalen och Uppsala".
   - Egna fraser: "Relining – det smarta alternativet till stambyte", "Vi filmar alltid
     våra inspektioner så att kunden själv får möjlighet att fatta ett klokt beslut",
     "över 10 års erfarenhet", "Vi lämnar garanti på vårt arbete", "Ett miljömedvetet
     arbete är en självklarhet", "Alla medarbetare har gått de nödvändiga kurser",
     "Vi ser alltid till att välja den mest optimala metoden och det bästa materialet",
     "Stolt partner till Offerta".
   - Referenser (deras sida): Brf Fridhemsplan, Brf Östermalmsgatan, Brf Vattentornet,
     Brf Vällingby, Brf Gjuteriet, Brf Kinnekullavägen, "Förberedelse av strumpa i Nacka".
     Tio egna filmklipp med egna bildtexter (hitta rör med sond, filmning, kapa strumpa,
     grenförstärkning, påfyllning, uppblåsning, epoxi på grenförstärkning, valsning,
     strumpan in i kanonen, fräsning) — bildrutor ur dem är jobbilderna här, med deras
     egna bildtexter. Sex egna foton från referenssidan.
   - Reco (reco.se/asmar-relining-ab, JSON-LD 2026-10-29): 4,9 av 5, 71 omdömen,
     "Verifierat företag", trovärdighet "Mycket bra", andel tillfrågade 100 %, sedan 2024.
     Fem omdömen ordagrant ur JSON-LD med datum och länk. Märkena "Rekommenderat företag
     2024, 2025, 2026" står på deras sajt (skärmbild) — filen är deras.
   - SSTT-logotypen (Scandinavian Society for Trenchless Technology) står på deras sajt.
   - Instagram @asmar_relining, 565 följare (embed 2026-10-29). Tre inlägg som visar
     arbete, inbäddade direkt från Instagram.
   - Logotypen: deras egen PNG (gul platta, blå rör och text) från sajten.

   INTE verifierat, och finns därför inte på sidan: garantins längd (bara "garanti" som
   ord), antal projekt, priser, ledtider i dagar, Google-betyg (ingen profil hittad),
   "10 års garanti" och "BRF i Vasastan"/"Villa i Täby" ur den gamla demon (ej belagda,
   borttagna), hur många som bor kvar under arbetet.

   FLAGGOR:
   - Formuläret går till mathias@bahkobyra.se (demonyckeln).
   - Hero-filmen är en genererad förvandling (Qwen A→B + Wan 3.0 Prime 5 s, 2026-10-29,
     0,71 USD): ett uppsågat gjutjärnsrör i en källare där strumpan förs in och härdar till
     ett nytt rör. Illustration, inte deras rör. Står inte på sidan. Den gamla demons klipp
     ratades av Mathias ("heros videon är inte bra").
   - Varför-filmen: deras eget foto (verkstadsbilen) i långsam inzoomning + logokort.
     Kontaktfilmen: heron nedskalad och suddad. 0 USD i media.
   - Alla stillbilder är deras egna (foton och bildrutor ur deras filmklipp). Ansikten
     på de egna fotona är deras egen personal, från deras egen sajt.
   =========================================================================== */

export const metadata = {
  title: 'Asmar Relining — relining och rörinspektion i Stockholm, Järfälla och Uppsala',
  description:
    'Relining utan stambyte i Stockholms län, Järfälla och Uppsala. Kostnadsfri rörinspektion med kamera, nya rör inuti de gamla, ni bor kvar. 4,9 av 5 på Reco. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

const M = '/asmar/media';

const RECO_LANK = 'https://www.reco.se/asmar-relining-ab';

const data = {
  namn: 'Asmar Relining',
  tema: {
    mork: '#0A1F3D',
    accent: '#0B6BBF',
    accentHover: '#0958A0',
    accentText: '#0A5BA3',
    accentLjus: '#5BB8F0',
    paAccent: '#fff',
  },
  logo: { src: `${M}/logo.png`, w: 1533, h: 538, alt: 'Asmar Relining', topp: 'bricka' },
  kontakt: {
    tel: '08-799 99 21',
    telHref: 'tel:+4687999921',
    epost: 'info@asmarrelining.se',
    adress: 'Meteorvägen 4, 175 60 Järfälla',
    oppet: 'Mån–fre 07–16',
    ig: 'https://www.instagram.com/asmar_relining/',
    igHandle: '@asmar_relining',
    fb: 'https://www.facebook.com/profile.php?id=61554993216612',
    orgnr: '559389-0980',
  },
  cta: { txt: 'Boka kostnadsfri rörinspektion', kort: 'Boka inspektion', lank: 'Boka inspektion' },
  nav: {
    vanster: [{ href: '#tjanster', txt: 'Tjänster' }, { href: '#jobb', txt: 'Så gör vi' }],
    hoger: [{ href: '#om', txt: 'Om oss' }, { href: '#omdomen', txt: 'Omdömen' }],
  },

  hero: {
    ort: 'Stockholm · Järfälla · Uppsala',
    tjanster: ['Relining', 'Rörinspektion'],
    video: `${M}/video-hero.mp4`,
    videoMobil: `${M}/video-hero-mobil.mp4`,
    poster: `${M}/poster-hero.jpg`,
    posterMobil: `${M}/poster-hero-mobil.jpg`,
  },
  tejp: ['Relining', 'Rörinspektion', 'Spolning', 'Fräsning', 'Serviceavtal', 'Stockholm', 'Järfälla', 'Uppsala'],

  tjanster: {
    eyebrow: 'Vad vi gör',
    rubrik: ['Nya rör,', 'utan att riva'],
    lead: 'Vi filmar röret, visar exakt vad som behöver göras och förnyar det inifrån. Inget stambyte, inga uppbilade golv.',
    kort: [
      { id: 'rorinspektion', namn: 'Rörinspektion', bild: `${M}/tjanst-rorinspektion.jpg`, alt: 'Tekniker vid kamerautrustning filmar ett avloppsrör', text: 'Vi filmar avloppsrören med kamera och hittar även små skador innan de blir stora. Ni får filmen och ett rakt besked om skicket. Inspektionen kostar ingenting.', punkter: ['Kostnadsfri inspektion', 'Filmen till er', 'Rakt besked om skicket'], ritning: (<><circle cx="60" cy="60" r="26" /><circle cx="60" cy="60" r="10" /><path d="M86 60h60M146 40v40" /><path d="M100 52l8 8-8 8" /></>) },
      { id: 'relining', namn: 'Relining', bild: `${M}/tjanst-relining.jpg`, alt: 'Tekniker vid reliningmaskinen förbereder strumpan', text: 'Ett nytt, fogfritt rör inuti det gamla. Strumpan mättas med epoxi, blåses in med tryckluft och härdar. Klart på dagar, ni bor kvar.', punkter: ['Alternativet till stambyte', 'Ingen rivning', 'Teknisk livslängd 50 år'], ritning: (<><path d="M20 40h160v40H20z" /><path d="M30 50h140v20H30z" /><path d="M30 60h140" strokeDasharray="6 6" /></>) },
      { id: 'spolning', namn: 'Spolning och fräsning', bild: `${M}/tjanst-spolning.jpg`, alt: 'Spolutrustning uppställd under tält vid ett hus', text: 'Vi spolar bort avlagringar och fräser bort rötter och beläggningar, så att röret är slätt och rent. Som underhåll, eller som första steg före relining.', punkter: ['Stopp och avlagringar', 'Rötter och beläggningar', 'Rent rör före relining'], ritning: (<><path d="M20 60h110" /><path d="M130 60c12-18 24-18 36 0" /><path d="M40 60c0-12 10-22 22-22M60 60c0-12 10-22 22-22M80 60c0-12 10-22 22-22" /></>) },
      { id: 'serviceavtal', namn: 'Serviceavtal', bild: `${M}/tjanst-serviceavtal.jpg`, alt: 'Två tekniker inspekterar rör i ett källarutrymme', text: 'Återkommande spolning, filmning och inspektion så att problem upptäcks i tid. För bostadsrättsföreningar och förvaltare som vill ha koll även när styrelsen byts.', punkter: ['Spolning och filmning på schema', 'Dokumentation som följer fastigheten', 'Skräddarsytt efter behov'], ritning: (<><path d="M30 30h140v70H30z" /><path d="M30 50h140" /><path d="M50 30v-10M150 30v-10" /><path d="M48 70l10 10 20-20M100 72h40" /></>) },
    ],
  },

  jobb: {
    eyebrow: 'Så gör vi',
    rubrik: ['Varje steg,', 'filmat av oss'],
    lead: 'Från sonden som hittar röret till den färdiga strumpan. Bildrutor ur våra egna filmer, med våra egna ord.',
    not: 'Alla bilder är ur våra egna filmer och foton från jobb.',
    tid: '70s',
    rad1: [
      { src: `${M}/jobb-hitta-ror.jpg`, alt: 'Handhållen sond med skärm hålls över ett golv', txt: 'Hitta rör med sond inför grävning' },
      { src: `${M}/jobb-filmning.jpg`, alt: 'Kamera förs ned i ett rör under en brunnslucka', txt: 'Filmning av strumpa efter relining' },
      { src: `${M}/jobb-kapa-strumpa.jpg`, alt: 'Tigersåg kapar strumpan i rörets mynning', txt: 'Kapa strumpa med tigersåg' },
      { src: `${M}/jobb-grenforstarkning.jpg`, alt: 'Skärm visar kamerabild inifrån röret vid grenförstärkning', txt: 'Montering av grenförstärkning' },
      { src: `${M}/jobb-pafyllning.jpg`, alt: 'Tekniker håller strumpan medan epoxi fylls på', txt: 'Epoxi hälls i strumpan inför valsning' },
      { src: `${M}/jobb-uppblasning.jpg`, alt: 'Strumpan spänns fast inför uppblåsning', txt: 'Strumpa inne i röret innan uppblåsning' },
    ],
    rad2: [
      { src: `${M}/jobb-epoxi-gren.jpg`, alt: 'Orange epoxi smetas in i strumpan med handskar', txt: 'Epoxi på grenförstärkning' },
      { src: `${M}/jobb-valsning.jpg`, alt: 'Strumpan valsas på bordet', txt: 'Valsa rätt tjocklek på strumpan' },
      { src: `${M}/jobb-kanonen.jpg`, alt: 'Strumpan stoppas in i kanonen', txt: 'Strumpan in i kanonen' },
      { src: `${M}/jobb-frasning.jpg`, alt: 'Skärm visar fräsning inne i röret', txt: 'Fräsning inför grenförstärkning' },
      { src: `${M}/jobb-takbrunn.jpg`, alt: 'Tekniker på ett platt tak med slang vid en takbrunn', txt: 'Dagvatten från taket' },
    ],
  },

  varfor: {
    eyebrow: 'Varför Asmar',
    rubrik: ['Vi river inte.', 'Vi förnyar.'],
    lead: 'Ett stambyte betyder uppbilade golv och månader av byggarbetsplats. Relining gör samma jobb inifrån: ett nytt rör i det gamla, ni bor kvar, klart på dagar.',
    punkter: [
      { rubrik: 'Filmen först', text: 'Vi filmar alltid röret innan vi föreslår något. Ni ser skicket med egna ögon och fattar beslutet på fakta.' },
      { rubrik: 'Rätt metod för just ert rör', text: 'Relining, spolning eller fräsning. Vi väljer den metod och det material som passar röret, inte det som ger oss mest.' },
      { rubrik: 'Över tio år i branschen', text: 'Yosef Asmar har gått från tekniker till arbetsledare till eget företag, med varje del av jobbet i händerna.' },
      { rubrik: 'Garanti och dokumentation', text: 'Vi lämnar garanti på arbetet och filmar efteråt, så att ni har beviset på att röret är helt.' },
    ],
    video: `${M}/video-varfor.mp4`,
    poster: `${M}/poster-varfor.jpg`,
    videoAlt: 'Långsam inzoomning i verkstadsbilen där strumpan förbereds. Filmen slutar med Asmar Relinings logotyp.',
  },

  om: {
    eyebrow: 'Om Asmar Relining',
    rubrik: ['Relining i Järfälla', 'sedan tekniker blev företag'],
    kortRad: 'Järfälla',
    stycken: [
      'Yosef Asmar började som tekniker, blev arbetsledare och projektledare inom relining, och startade sedan Asmar Relining AB. Han kan varje del av jobbet: inspektion, planering, fräsning, relining, filmning och besiktning.',
      'Vi arbetar i hela Stockholms län, Järfälla och Uppsala, för privatpersoner, bostadsrättsföreningar och företag. Vi väljer alltid den metod och det material som passar röret, arbetar miljömedvetet, och lämnar garanti på det vi gör.',
    ],
    bevis: [
      { ord: '10+ år', text: 'i branschen, från tekniker till eget företag' },
      { ord: '4,9 av 5', text: '71 verifierade omdömen på Reco' },
      { ord: 'Garanti', text: 'på allt arbete, och film efteråt' },
    ],
  },

  steg: {
    eyebrow: 'Så går det till',
    rubrik: ['Från filmning', 'till nytt rör'],
    lead: 'Ni bor kvar hela vägen. Så här enkelt är det.',
    lista: [
      { namn: 'Ring eller boka', text: 'Berätta vad som hänt, eller att ni bara vill veta skicket. Vi svarar snabbt.', ikon: 'kontakt' },
      { namn: 'Kostnadsfri filmning', text: 'Vi filmar röret med kamera och går igenom vad vi ser. Ni får filmen.', ikon: 'besok' },
      { namn: 'Offert med metod', text: 'Relining, spolning eller fräsning. Vad som ingår, vad det kostar och hur lång tid det tar.', ikon: 'offert' },
      { namn: 'Vi förnyar röret', text: 'Fräsning, strumpa, epoxi och härdning. Inget rivs, ni bor kvar.', ikon: 'arbete' },
      { namn: 'Film och besiktning', text: 'Vi filmar det färdiga röret och går igenom resultatet med er. Garantin gäller.', ikon: 'klart' },
    ],
  },

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['71 kunder', 'har sagt sitt'],
    lead: 'Alla omdömen är verifierade av Reco. Reco bjuder in 100 procent av våra kunder.',
    reco: {
      betyg: '4,9',
      antal: 71,
      trovardighet: 'Mycket bra',
      lank: RECO_LANK,
      not: 'Reco har full insyn i vårt affärssystem och verifierar att varje omdöme kommer från en riktig kund. Rekommenderat företag 2024, 2025 och 2026.',
    },
    lista: [
      { namn: 'Matt R', kalla: 'Verifierad kund', betyg: 5, datum: '2026-09-27', lank: 'https://www.reco.se/r/3355473', text: 'Kan varmt rekommendera Asmar Relining som relinade våra gamla och slitna avloppsrör. Toppenbra kommunikation innan, under och efter arbetet. De arbetade snabbt och effektivt och till ett betydligt rimligare pris än vad några andra företag ville ha för samma arbete.' },
      { namn: 'Anna A', kalla: 'Verifierad kund', betyg: 5, datum: '2026-09-02', lank: 'https://www.reco.se/r/3328349', text: 'Vi ger våra bästa rekommendationer till Asmar relining AB efter ett mycket väl utfört arbete, dessutom med ett trevligt bemötande, tydlig och bra information kring åtgärderna samt att det var väl dokumenterat. Det var också rent och snyggt efter att de var klara.' },
      { namn: 'Kenneth E', kalla: 'Verifierad kund', betyg: 5, datum: '2026-09-02', lank: 'https://www.reco.se/r/3327988', text: 'Kompetent företag, kommer och utför allt överenskommet i rätt tid och offererat pris. Rekommenderas. Kenneth, Brf Vattentornet 3.' },
      { namn: 'Birgitta J', kalla: 'Verifierad kund', betyg: 5, datum: '2026-09-26', lank: 'https://www.reco.se/r/3354631', text: 'Arbetet med vårt avlopp påbörjades av andra. Därför finns jämförelsematerial, inte bara genom offerter utan också genom praktiskt arbete och vad som debiterats för det. Prisvärd, för att inte säga låg prissättning jämfört med konkurrerande firmor.' },
      { namn: 'Gholamreza D', kalla: 'Verifierad kund', betyg: 5, datum: '2026-10-21', lank: 'https://www.reco.se/r/3380944', text: 'Great experience from start to finish! He was professional, reliable, and always kept to the agreed schedule. Asmar Relining managed the entire project smoothly and had a great team that handled any issues along the way.' },
    ],
    not: 'Fem av 71 omdömen, som de står på Reco. Kortade utan att ändra innebörd.',
    lank: { href: RECO_LANK, txt: 'Läs alla på Reco' },
  },

  instagram: {
    eyebrow: 'Instagram',
    rubrik: ['Följ jobben', 'i vardagen'],
    lead: 'Det senaste från vårt konto, direkt från Instagram.',
    bio: 'Relining · Stockholm, Järfälla och Uppsala',
    koder: ['DackXFhO_9b', 'Db-Pj9HO6Uu', 'DebqQ9xO3oc'],
  },

  fragor: {
    eyebrow: 'Vanliga frågor',
    rubrik: ['Det ni brukar', 'fråga först'],
    lead: 'Pengar och risk först, tekniken sedan.',
    kort: { rubrik: 'Hittar ni inte svaret?', text: 'Ring och fråga rakt ut. Vi säger vad som gäller just era rör.' },
    lista: [
      { q: 'Vad kostar det?', a: 'Det beror på rörens längd, skick och hur många grenar som ska förstärkas. Därför börjar vi alltid med en rörinspektion, som kostar ingenting. Sedan får ni en offert med metod, pris och tid.' },
      { q: 'Vad är relining?', a: 'En metod för att förnya gamla eller skadade rör utan att gräva upp eller byta ut dem. Ett nytt rör skapas inuti det gamla, vilket ger en stark och hållbar yta som förlänger rörens livslängd avsevärt.' },
      { q: 'Hur går relining till?', a: 'Röret rengörs genom fräsning. Sedan mättas en flexibel strumpa med epoxi och förs in i röret med tryckluft. När den härdat har ni ett nytt, slitstarkt rör inuti det gamla, med en teknisk livslängd på 50 år.' },
      { q: 'Måste vi flytta ut under arbetet?', a: 'Nej. Inget rivs och inga golv bilas upp. Det är det som skiljer relining från ett stambyte.' },
      { q: 'Hur vet jag om våra rör behöver åtgärdas?', a: 'Rör äldre än 50 år är det dags att se över. Första steget är en rörinspektion med kamera, som vi erbjuder kostnadsfritt. Ni får filmen och ett rakt besked.' },
      { q: 'Lämnar ni garanti?', a: 'Ja, vi lämnar garanti på vårt arbete, och vi filmar det färdiga röret så att ni har dokumentationen. Vad garantin omfattar står i offerten.' },
      { q: 'Jobbar ni med bostadsrättsföreningar?', a: 'Ja, det är en stor del av det vi gör. Våra referenser på reco.se och på vår sida kommer till stor del från styrelser i Stockholm. Ett serviceavtal gör att dokumentationen följer fastigheten även när styrelsen byts.' },
      { q: 'Var arbetar ni?', a: 'I hela Stockholms län, Järfälla och Uppsala. Ligger fastigheten längre bort får ni säga var, så säger vi om vi kan ta det.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Boka en rörinspektion,', 'den kostar ingenting'],
    lead: 'Ring, eller skriv några rader om fastigheten. Vi filmar röret, visar vad vi ser och lämnar en tydlig offert.',
    checkar: ['Kostnadsfri rörinspektion med kamera', 'Relining utan stambyte, ni bor kvar', 'Garanti och film på det färdiga röret'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta kort om fastigheten',
    placeholder: 'Villa eller flerbostadshus, var den ligger, vad som hänt eller när rören senast sågs över',
    formNot: 'Skriv kort om fastigheten, då kan vi ge ett vettigt svar redan i första samtalet. Inga massutskick, ingen säljlista.',
  },

  samarbeten: {
    eyebrow: 'Verifierat och anslutet',
    rubrik: ['Omdömen ni', 'kan lita på'],
    lead: 'Våra omdömen verifieras av Reco, och vi är anslutna till branschorganisationen för schaktfri teknik.',
    lista: [
      { namn: 'Reco', text: 'Rekommenderat företag 2024, 2025 och 2026. 4,9 av 5 på 71 verifierade omdömen.', href: RECO_LANK, bilder: [{ src: `${M}/reco-2024-2026.png`, w: 562, h: 256, alt: 'Reco: Rekommenderat företag 2024, 2025 och 2026', hojd: 72 }] },
      { namn: 'SSTT', text: 'Scandinavian Society for Trenchless Technology, branschorganisationen för schaktfri teknik.', href: 'https://www.sstt.se/', bilder: [{ src: `${M}/sstt.png`, w: 735, h: 186, alt: 'SSTT, Scandinavian Society for Trenchless Technology', hojd: 46 }] },
    ],
  },

  popup: {
    rubrik: 'Hur ser det ut i era rör?',
    text: 'Rörinspektionen kostar ingenting. Vi filmar, ni får filmen och ett rakt besked om vad som behöver göras, och vad det kostar.',
  },

  footer: {
    text: 'Relining, rörinspektion, spolning och serviceavtal i Stockholms län, Järfälla och Uppsala. Nya rör utan att riva. Stolt partner till Offerta.',
  },

  modal: {
    rubrik: 'Så här kan Asmar Relining se ut på nätet',
    text: 'Det här är ett kostnadsfritt förslag, byggt på det ni själva visar på asmarrelining.se, Reco och Instagram, med era egna foton och filmer. Ingen beställning, inget åtagande. Vill ni se den skarpt med ett formulär som landar i er inkorg? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.',
  },
};

export default function AsmarDemo() {
  return <DemoSida data={data} />;
}
