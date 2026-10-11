import DemoSida from '../_mall/DemoSida';

/* ===========================================================================
   SÖDERHOLMS EL & VVS — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: soderholms.se (kom via länken i deras Instagram-bio) · värmepumpar
   (Thermia-återförsäljare), installation och service, el och VVS ·
   Stockholm och Uppsala. HAR hemsida (sajtbyggare, bara stockbilder, ingen
   logotyp, ingen bild på ett eget jobb).

   Bärande idé: en firma sedan 1940 som har jobbat med en enda
   värmepumpstillverkare, Thermia, sedan början av 90-talet: samma firma
   installerar, servar och svarar i telefon, och den finns kvar när pumpen
   behöver service om tio år.

   VERIFIERAT (soderholms.se via WebFetch + webbarkivet 2026-04-16; allabolag,
   syna, bolagsfakta, byggkatalogen, merinfo; allt 2026-10-11):
   Firmanamn "Söderholms El & VVS AB" · org.nr 556041-3055, AB, registrerat
   1942-05-23, F-skatt och moms (syna) · besöksadress Tranebergsvägen 78 bv,
   167 44 Bromma (sajten + registret) · tel 08-25 30 33 · info@soderholms.se
   · "har funnits sedan 1940" · "jobbat med Thermias värmepumpar sedan början
   av 90-talet" · "stolta återförsäljare av Thermia värmepumpar" · installerar
   och utför service på Thermias värmepumpar i Stockholm och Uppsala · "både
   villa och större fastighetsanläggningar" · "för både företag och
   privatkunder" · luft-, vatten- och bergvärmepumpar · rådgivning och
   konsultation · priser: "kontakta oss för en offert" · SNI 43210
   Elinstallationer · två anställda (registret).

   INTE verifierat, och finns därför inte på sidan: Google-betyget (en
   katalog visar 4,5 av 2 recensioner, ingen text att citera), öppettider
   (samma katalog säger mån–fre 8–17, obekräftat), Instagram-inläggen
   (kontot @soderholms08 svarar tomt utan inloggning — be Mathias bekräfta
   handle), Facebook, ägarnamn, priser, ledtider, garantier, certifieringar
   (behörighet för el/kyl), ROT/grön teknik-avdrag.

   FLAGGOR:
   - Formuläret går till mathias@bahkobyra.se (demonyckeln).
   - INGEN logotyp finns (sajten har bara firmanamnet i text): ordmärke.
     Slutkortet i Varför-filmen är ordmärket satt i Outfit.
   - INGA egna foton: alla bilder är LÅNADE illustrationsbilder. Fyra är
     stockbilderna från deras egen sajt (laptop, elcentral, verktyg, telefon),
     resten är fria bilder från Wikimedia Commons (CC0/PD/CC BY/CC BY-SA —
     fotograf och licens per fil i content/leads/soderholms.md). Märkt i
     jobb.not. Bilden på Thermia-pumpen (tjanst-installation) är en riktig
     Thermia, men inte deras installation.
   - Hero-filmen är en GENERERAD ILLUSTRATION (Grok Imagine, gjord av Mathias
     2026-10-11): rostig oljepanna och oljetank i ett mörkt källarrum blir ett
     ljust pannrum med värmepump och varmvattenberedare. Inget riktigt jobb,
     ingen Thermia-modell, ingen vattenstämpel eller logga i bild. Liggande =
     16:9-beskärning, stående = 9:16 runt pannan/pumpen.
     Varför-filmen = samma förvandling + ordmärkeskortet. Kontaktfilmen =
     drönarfilm över Uppsala domkyrka i höstfärger (Grok Imagine, Mathias
     2026-10-11, genererad illustration), ping-pong-loop, lätt suddad.
   - Omdömena är EXEMPEL.
   - Riktiga kontaktuppgifter och org.nr på sidan: visa INTE offentligt.
   =========================================================================== */

export const metadata = {
  title: 'Söderholms El & VVS — Thermia värmepumpar i Stockholm och Uppsala',
  description:
    'Installation och service av Thermia värmepumpar, luft, vatten och berg, för villor och större fastigheter. Sedan 1940, Bromma. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

const M = '/soderholms/media';

const data = {
  namn: 'Söderholms El & VVS',
  tema: {
    mork: '#0B1724',
    accent: '#C2410C',
    accentHover: '#9A3412',
    accentText: '#9A3412',
    accentLjus: '#FB923C',
    paAccent: '#fff',
  },
  ordmarke: 'Söderholms',
  kontakt: {
    tel: '08-25 30 33',
    telHref: 'tel:+468253033',
    epost: 'info@soderholms.se',
    adress: 'Tranebergsvägen 78 bv, 167 44 Bromma',
    orgnr: '556041-3055',
  },
  cta: { txt: 'Boka rådgivning', kort: 'Boka rådgivning', lank: 'Boka rådgivning' },
  nav: {
    vanster: [{ href: '#tjanster', txt: 'Tjänster' }, { href: '#jobb', txt: 'Anläggningar' }],
    hoger: [{ href: '#om', txt: 'Om oss' }, { href: '#fragor', txt: 'Frågor' }],
  },

  hero: {
    ort: 'Stockholm · Uppsala',
    tjanster: ['Värmepumpar', 'Service'],
    video: `${M}/video-hero.mp4`,
    videoMobil: `${M}/video-hero-mobil.mp4`,
    poster: `${M}/poster-hero.jpg`,
    posterMobil: `${M}/poster-hero-mobil.jpg`,
  },
  tejp: ['Bergvärme', 'Luft/vatten', 'Vattenvärme', 'Thermia', 'Service', 'Rådgivning', 'El & VVS', 'Stockholm · Uppsala'],

  tjanster: {
    eyebrow: 'Vad vi gör',
    rubrik: ['Värmepumpen, från val', 'till service'],
    lead: 'Vi hjälper dig välja rätt pump, installerar den och kommer tillbaka när den behöver service. För villor, företag och större fastighetsanläggningar.',
    kort: [
      { id: 'installation', namn: 'Installation', bild: `${M}/tjanst-installation.jpg`, alt: 'Thermia bergvärmepump installerad i ett tekniskt utrymme', text: 'Professionell installation av Thermia värmepumpar, anpassad efter huset och ditt behov.', punkter: ['Bergvärme', 'Luft/vatten', 'Vattenvärme'], ritning: (<><path d="M30 104V44l70-30 70 30v60z" /><path d="M78 104V70h44v34" /><path d="M100 70V54" /><path d="M86 54h28" /></>) },
      { id: 'service', namn: 'Service och underhåll', bild: `${M}/tjanst-service.jpg`, alt: 'Tekniker med öppen värmepump, rör och kompressor synliga', text: 'Regelbunden service för bästa prestanda och lång livslängd på pumpen.', punkter: ['Återkommande service', 'Felsökning', 'Thermias värmepumpar'], ritning: (<><circle cx="100" cy="60" r="34" /><circle cx="100" cy="60" r="10" /><path d="M100 14v12M100 94v12M54 60h12M134 60h12" /></>) },
      { id: 'radgivning', namn: 'Rådgivning', bild: `${M}/tjanst-radgivning.jpg`, alt: 'Två personer vid ett bord med laptop och anteckningar', text: 'Vi hjälper dig välja rätt värmelösning för ditt hem eller din fastighet.', punkter: ['Vilken pumptyp passar', 'Villa eller fastighet', 'Offert efter behov'], ritning: (<><path d="M30 26h104v56H76l-22 18V82H30z" /><path d="M150 50h20v44h-16v14l-16-14h-30" /></>) },
      { id: 'el-vvs', namn: 'El och VVS', bild: `${M}/tjanst-el.jpg`, alt: 'Elcentral med automatsäkringar och kopplingsplintar', text: 'Vi är både el- och VVS-firma, så elen och rören runt pumpen hålls i samma hand.', punkter: ['Elinstallation', 'VVS runt pumpen', 'Ett företag att ringa'], ritning: (<><path d="M110 12L70 66h30l-10 42 40-56h-30z" /></>) },
    ],
  },

  jobb: {
    eyebrow: 'Anläggningar',
    rubrik: ['Från villa till', 'fastighet'],
    lead: 'Värmepumpar inne och ute, i villor och i större fastighetsanläggningar.',
    not: 'Illustrationsbilder — byts mot era egna projektfoton.',
    tid: '60s',
    rad1: [
      { src: `${M}/jobb-inomhusdel.jpg`, alt: 'Värmepump och expansionskärl i ett pannrum', txt: 'Inomhusdel i pannrummet' },
      { src: `${M}/jobb-utedel-vagg.jpg`, alt: 'Utedel till en värmepump monterad på en tegelvägg', txt: 'Utedel på vägg' },
      { src: `${M}/jobb-fastighet-ror.jpg`, alt: 'Gula rör och pumpar i en stor värmeanläggning', txt: 'Större fastighetsanläggning' },
      { src: `${M}/jobb-utedel-tegel.jpg`, alt: 'Utedel till en värmepump framför en mörk vägg', txt: 'Luft/vatten, utedel' },
      { src: `${M}/jobb-golvvarme.jpg`, alt: 'Fördelare för golvvärme med rör och ventiler', txt: 'Golvvärmefördelare' },
    ],
    rad2: [
      { src: `${M}/jobb-utedel-tradgard.jpg`, alt: 'Utedel till en värmepump på en platta vid en häck', txt: 'Utedel i trädgården' },
      { src: `${M}/jobb-undercentral.jpg`, alt: 'Rör och värmeväxlare i en undercentral', txt: 'Undercentral' },
      { src: `${M}/jobb-termostat.jpg`, alt: 'Termostatventil på ett vitt element', txt: 'Rätt värme i rummet' },
      { src: `${M}/jobb-verktyg.jpg`, alt: 'Tänger och verktyg i en verktygsväska', txt: 'Verktygen på plats' },
      { src: `${M}/jobb-telefon.jpg`, alt: 'Person i vit skjorta med en mobiltelefon', txt: 'Ring oss direkt' },
    ],
  },

  varfor: {
    eyebrow: 'Varför Söderholms',
    rubrik: ['Samma firma', 'år efter år'],
    lead: 'En värmepump ska gå i många år. Vi har funnits sedan 1940 och jobbat med Thermia sedan början av 90-talet, så den som installerar din pump är också den som servar den.',
    punkter: [
      { rubrik: 'Thermia sedan 90-talet', text: 'Vi är återförsäljare av Thermia och har installerat och servat deras pumpar sedan början av 90-talet.' },
      { rubrik: 'Installation och service', text: 'Samma firma tar hand om pumpen från installationen till servicen efteråt.' },
      { rubrik: 'El och VVS i samma hand', text: 'Vi gör både elen och rören, så du behöver inte samordna flera hantverkare.' },
      { rubrik: 'Rätt pump, inte största', text: 'Vi hjälper dig välja det som passar huset. Räcker en mindre lösning säger vi det.' },
    ],
    video: `${M}/video-varfor.mp4`,
    poster: `${M}/poster-varfor.jpg`,
    videoAlt: 'Ett gammalt pannrum med rostig oljepanna förvandlas till ett ljust rum med värmepump. Filmen slutar med Söderholms ordmärke.',
  },

  om: {
    eyebrow: 'Om Söderholms',
    rubrik: ['I branschen', 'sedan 1940'],
    kortRad: 'Bromma · Stockholm och Uppsala',
    stycken: [
      'Söderholms El & VVS har funnits sedan 1940. Sedan början av 90-talet har vi arbetat med Thermias värmepumpar, och i dag är vi stolta återförsäljare av dem.',
      'Vi installerar och servar värmepumpar i Stockholm och Uppsala, för både privatpersoner och företag, i villor och i större fastighetsanläggningar. Med kunskap och kvalitet i fokus vill vi ge dig en energieffektiv och pålitlig lösning.',
    ],
    bevis: [
      { ord: 'Sedan 1940', text: 'el och VVS i Bromma' },
      { ord: 'Thermia', text: 'återförsäljare sedan 90-talet' },
      { ord: 'F-skatt', text: 'godkänd för F-skatt' },
    ],
  },

  steg: {
    eyebrow: 'Så går det till',
    rubrik: ['Från första samtalet', 'till varmt hus'],
    lead: 'Samma ordning oavsett om det är en villa eller en fastighet.',
    lista: [
      { namn: 'Ring eller skriv', text: 'Berätta om huset och hur du värmer det i dag.', ikon: 'kontakt' },
      { namn: 'Rådgivning', text: 'Vi går igenom vilken typ av pump som passar: luft, vatten eller berg.', ikon: 'besok' },
      { namn: 'Offert', text: 'Du får en offert anpassad efter typ och installation.', ikon: 'offert' },
      { namn: 'Installation', text: 'Vi installerar pumpen och tar hand om el och VVS runt den.', ikon: 'arbete' },
      { namn: 'Service', text: 'Regelbunden service håller pumpen effektiv i många år.', ikon: 'klart' },
    ],
  },

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Vad kunderna', 'säger'],
    lista: [
      { namn: 'Villaägare', kalla: 'Bromma', exempel: true, text: 'Här står ett riktigt omdöme från en kund, med namn och ort som de själva skrivit det.' },
      { namn: 'Fastighetsägare', kalla: 'Stockholm', exempel: true, text: 'Ett andra kort, hämtat ur er Google-profil.' },
      { namn: 'Privatkund', kalla: 'Uppsala', exempel: true, text: 'Ett tredje kort, gärna om en service eller en installation.' },
    ],
    not: 'Exempel — byts mot era riktiga omdömen.',
    lank: { href: 'https://www.google.com/maps/search/S%C3%B6derholms+El+%26+VVS+AB+Bromma', txt: 'Se oss på Google' },
  },

  fragor: {
    eyebrow: 'Vanliga frågor',
    rubrik: ['Det du brukar', 'undra först'],
    lead: 'Pengar först, det praktiska sedan.',
    kort: { rubrik: 'Hittar du inte svaret?', text: 'Ring 08-25 30 33 eller mejla info@soderholms.se, så svarar vi på det som gäller just ditt hus.' },
    lista: [
      { q: 'Vad kostar en värmepump?', a: 'Priset beror på typ av pump och installation. Kontakta oss så får du en offert.' },
      { q: 'Vad är en värmepump?', a: 'En energieffektiv lösning för att värma upp, och kyla ned, ditt hem.' },
      { q: 'Vilka typer av värmepumpar erbjuder ni?', a: 'Luft-, vatten- och bergvärmepumpar, så att det finns en lösning för olika bostäder och energibehov.' },
      { q: 'Varför Thermia?', a: 'Thermia är kända för hög kvalitet och energieffektivitet, vilket ger lägre driftskostnader. Vi har jobbat med deras pumpar sedan början av 90-talet.' },
      { q: 'Hur går installationen till?', a: 'Vi installerar pumpen professionellt och anpassar installationen efter dina behov.' },
      { q: 'Servar ni pumpar ni redan installerat?', a: 'Ja. Vi utför regelbunden service på Thermias värmepumpar, för bästa prestanda och längre livslängd.' },
      { q: 'Tar ni större fastigheter?', a: 'Ja. Vi gör både villor och större fastighetsanläggningar, för privatpersoner och företag.' },
      { q: 'Var arbetar ni?', a: 'I Stockholm och Uppsala. Vi sitter på Tranebergsvägen i Bromma.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Boka rådgivning,', 'vi tar det därifrån'],
    lead: 'Ring 08-25 30 33, eller skriv några rader om huset. Vi återkommer och hjälper dig välja rätt värmelösning.',
    checkar: ['Thermia-återförsäljare sedan 90-talet', 'Installation och service i samma firma', 'Offert anpassad efter ditt hus'],
    video: `${M}/video-kontakt-uppsala.mp4`,
    poster: `${M}/poster-kontakt-uppsala.jpg`,
    formRubrik: 'Berätta kort om huset',
    placeholder: 'Typ av hus eller fastighet, hur du värmer i dag, och om det gäller ny pump eller service',
    formNot: 'Skriv kort om huset, då kan vi ge ett vettigt svar redan i första samtalet.',
    kundtyp: ['Privatperson', 'Företag', 'Fastighet/BRF'],
  },

  popup: {
    rubrik: 'Dags för service?',
    text: 'Vi servar Thermias värmepumpar i Stockholm och Uppsala. Ring eller skriv så bokar vi en tid.',
  },

  footer: {
    text: 'Installation och service av Thermia värmepumpar, el och VVS. Sedan 1940, i Stockholm och Uppsala.',
  },

  modal: {
    rubrik: 'Så här kan Söderholms se ut på nätet',
    text: 'Det här är ett kostnadsfritt förslag, byggt på det ni själva skriver på soderholms.se. Bilderna är lånade tills vi får era egna. Ingen beställning, inget åtagande. Vill ni se den skarpt med ett formulär som landar i inkorgen? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.',
  },
};

export default function SoderholmsDemo() {
  return <DemoSida data={data} />;
}
