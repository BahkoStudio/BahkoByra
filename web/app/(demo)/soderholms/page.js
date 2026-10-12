import DemoSida from '../_mall/DemoSida';

/* ===========================================================================
   SÖDERHOLMS EL & VVS — kostnadsfritt hemsideförslag från Bahko Byrå
   Version 2 (2026-10-12): omgjord efter kundens önskemål om att sticka ut.
   Lead: soderholms.se + Instagram @soderholms.se (113 följare) · värmepumpar
   (Thermia-återförsäljare), varmvatten, systemrening, el och laddbox, VVS ·
   Stockholm och Uppsala.

   Bärande idé: en el- och VVS-firma sedan 1942 som installerar Thermias
   senaste pumpar (Sigrin, Atlas) och tar hand om hela systemet runt pumpen:
   el, rör, systemvatten. Deras egna ord: "vi tar hand om hela systemet, inte
   bara symptomen".

   VERIFIERAT (Instagram @soderholms.se — profil + 10 inlägg via embed,
   soderholms.se via WebFetch, allabolag/syna/bolagsfakta; allt 2026-10-12):
   Namn "Söderholms El & VVS" (IG-profilnamn; bolaget Söderholms El & VVS AB)
   · org.nr 556041-3055, registrerat 1942-05-23, F-skatt och moms · logotypen
   (IG-profilbilden) säger "SEDAN 1942" — sajtens äldre årtal är fel och används ALDRIG
   · Tranebergsvägen 78 bv, 167 44 Bromma · 08-25 30 33 · info@soderholms.se
   · Thermia-återförsäljare, Thermia sedan början av 90-talet (sajten) ·
   installation, service och rådgivning; luft-, vatten- och bergvärme; villa och
   större fastighetsanläggningar; privat och företag; Stockholm och Uppsala
   (sajten) · IG: installerar Thermia Sigrin ("Thermias nya flaggskepp",
   "precis fått Sigrin på plats hos en kund"; "vår perfekta utbytespump",
   ersätter berg-, jord- eller sjövärmepump, "ger mycket varmvatten") · bytte
   en gammal IVT mot Thermia Atlas 12 kW (före/efter-bilderna är deras) ·
   tillfälligt TTM FiltrX C250-systemfilter för att rena värmesystem från
   magnetit · Zaptec Go 2-laddbox: "från rådgivning och dimensionering till
   komplett installation" · "Trappor? Inga problem" — pump bärs i trappa ·
   "vi tar hand om hela systemet, inte bara symptomen" · "hjälper dig hela
   vägen från första fråga till färdig installation".

   INTE verifierat, och finns därför inte på sidan: Google-betyg och omdömen
   (exempelkort), öppettider, priser, ledtider, garantier (Zaptecs 5 år är
   tillverkarens, nämns inte), behörigheter, ROT/grön teknik.
   VARMVATTENBEREDARE: med i Mathias brief, men deras kanaler nämner bara
   varmvatten från värmepumpen (Sigrin). Kortet säger därför "varmvatten"
   och "byte av beredare" — STÄM AV med kunden.

   FLAGGOR:
   - Logotypen är OMRITAD efter IG-profilbilden (bara 100×100 px finns
     publikt): samma uppbyggnad (guldlinjer, hus med värmevågor, "SÖDERHOLMS
     EL & VVS", "SEDAN 1942"), satt i Oswald med guldtoning. Be om originalfilen.
   - Egna bilder (IG): före/efter IVT→Atlas (sammansatt av deras två foton,
     etiketter inbrända), Sigrin, TTM-filtret, filtret i pannrummet, Zaptec,
     pumpen i trappan. LÅNADE: tjanst-installation (Commons, en Thermia men inte
     deras jobb) och båda jobbanden (Commons + stockbilder från deras gamla
     sajt), märkta i jobb.not.
   - HERON (Mathias 2026-10-12): kundens EGET jobb, före/efter IVT → Thermia
     Atlas 12 kW (deras två IG-foton, deras Före/Efter-etiketter), bredvid
     logotyp, ort och knappar. Den genererade källarfilmen är borta ur heron;
     förvandlingen finns kvar som Varför-filmen (+ logotypen i guld på svart).
     Kontaktfilmen (Uppsala) är en GENERERAD illustration (Grok Imagine).
     Utvalda jobb = de två övriga egna bilderna (trappan, filtret).
   - Formuläret går till mathias@bahkobyra.se (demonyckeln).
   - Riktiga kontaktuppgifter och org.nr på sidan: visa INTE offentligt.
   =========================================================================== */

export const metadata = {
  title: 'Söderholms El & VVS — Thermia värmepumpar, el och VVS i Stockholm och Uppsala',
  description:
    'Thermia värmepumpar, varmvatten, systemrening, el och laddbox. Installation och service i Stockholm och Uppsala, sedan 1942. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

const M = '/soderholms/media';

const data = {
  namn: 'Söderholms El & VVS',
  tema: {
    mork: '#0B0B0C',
    accent: '#C9A227',
    accentHover: '#B08C1E',
    accentText: '#7A5C12',
    accentLjus: '#E0B84A',
    paAccent: '#0B0B0C',
  },
  logo: { src: `${M}/logo-soderholms.png`, ljus: `${M}/logo-soderholms-ljus.png`, w: 680, h: 460, alt: 'Söderholms El & VVS', topp: 'fri' },
  kontakt: {
    tel: '08-25 30 33',
    telHref: 'tel:+468253033',
    epost: 'info@soderholms.se',
    adress: 'Tranebergsvägen 78 bv, 167 44 Bromma',
    ig: 'https://www.instagram.com/soderholms.se/',
    igHandle: '@soderholms.se',
    orgnr: '556041-3055',
  },
  cta: { txt: 'Begär offert', kort: 'Begär offert', lank: 'Begär offert' },
  nav: {
    vanster: [{ href: '#tjanster', txt: 'Tjänster' }, { href: '#jobb', txt: 'Jobb' }],
    hoger: [{ href: '#om', txt: 'Om oss' }, { href: '#kontakt', txt: 'Offert' }],
  },

  hero: {
    ort: 'Stockholm · Uppsala',
    tjanster: ['Värmepumpar', 'El & VVS'],
    // Kundens eget jobb i heron (Mathias 2026-10-12): deras två IG-foton sammansatta, med deras egna Före/Efter-etiketter.
    foreEfter: { src: `${M}/jobb-fore-efter-ivt-atlas.webp`, w: 900, h: 1200, alt: 'Före och efter: till vänster en gammal vit IVT-värmepump, till höger den nya grå Thermia Atlas på samma plats', txt: 'Gammal IVT ut, Thermia Atlas 12 kW in' },
  },
  tejp: ['Thermia Sigrin', 'Bergvärme', 'Luft/vatten', 'Varmvatten', 'Systemrening', 'Laddbox', 'El & VVS', 'Sedan 1942'],

  tjanster: {
    eyebrow: 'Vad vi gör',
    rubrik: ['Hela systemet,', 'inte bara pumpen'],
    lead: 'Vi installerar och servar Thermias värmepumpar, och tar hand om elen, rören och systemvattnet runt dem. För villor, företag och större fastigheter.',
    kort: [
      { id: 'varmepump', namn: 'Värmepumpar', bild: `${M}/tjanst-varmepump-sigrin.webp`, alt: 'Nyinstallerad Thermia Sigrin i grafit i ett tekniskt utrymme', text: 'Vi är Thermia-återförsäljare och installerar bland annat nya Sigrin, som kan ersätta din gamla berg-, jord- eller sjövärmepump.', punkter: ['Berg, luft och vatten', 'Byte av gammal pump', 'Service och underhåll'], ritning: (<><path d="M30 104V44l70-30 70 30v60z" /><path d="M78 104V70h44v34" /><path d="M86 58c6-6 10 6 16 0s10 6 16 0" /></>) },
      { id: 'varmvatten', namn: 'Varmvatten', bild: `${M}/tjanst-installation.jpg`, alt: 'Thermia-värmepump med inbyggd varmvattenberedare i ett pannrum', text: 'Rätt pump ger mycket varmvatten. Vi hjälper dig välja lösning och byter beredaren när den gamla har gjort sitt.', punkter: ['Varmvatten från pumpen', 'Byte av beredare', 'Rådgivning före köp'], ritning: (<><path d="M70 14h60v92H70z" /><path d="M82 40c6-6 10 6 18 0s12 6 18 0" /><path d="M82 60c6-6 10 6 18 0s12 6 18 0" /></>) },
      { id: 'systemrening', namn: 'VVS och systemrening', bild: `${M}/tjanst-systemrening.webp`, alt: 'TTM FiltrX systemfilter med manometer monterat på ett värmesystem', text: 'Vi renar värmesystem från magnetit och smuts med systemfilter, så att pumpar och ventiler håller längre.', punkter: ['Systemfilter (TTM FiltrX)', 'Bättre värmeöverföring', 'Färre driftstörningar'], ritning: (<><circle cx="100" cy="60" r="34" /><path d="M100 26v68M66 60h68" /><path d="M24 60h42M134 60h42" /></>) },
      { id: 'el', namn: 'El och laddbox', bild: `${M}/tjanst-laddbox.webp`, alt: 'Zaptec Go 2-laddbox monterad på en stolpe i en trädgård', text: 'Vi är både el- och VVS-firma. Laddbox som Zaptec Go 2 installerar vi hela vägen, från dimensionering till färdig installation.', punkter: ['Elinstallation', 'Laddbox (Zaptec Go 2)', 'El runt värmepumpen'], ritning: (<><path d="M110 12L70 66h30l-10 42 40-56h-30z" /></>) },
    ],
  },

  jobb: {
    eyebrow: 'Senaste jobben',
    rubrik: ['Från vårt', 'Instagram'],
    lead: 'Riktiga installationer: en pump som skulle upp för trappan och ett värmesystem som renades.',
    not: 'De två utvalda bilderna är våra egna, från Instagram. Bilderna i banden är illustrationsbilder — byts mot era egna projektfoton.',
    tid: '60s',
    utvalda: [
      { src: `${M}/jobb-trappor.webp`, w: 900, h: 1200, alt: 'Värmepump på transportvagn vid en stentrappa utomhus', etikett: 'Installation', txt: 'Trappor? Inga problem' },
      { src: `${M}/jobb-systemfilter-pannrum.webp`, w: 900, h: 1200, alt: 'Tillfälligt systemfilter kopplat till värmesystemet i ett pannrum med rutigt golv', etikett: 'Systemrening', txt: 'Magnetit ut ur värmesystemet' },
    ],
    rad1: [
      { src: `${M}/jobb-inomhusdel.jpg`, alt: 'Thermia-värmepump och expansionskärl i ett pannrum', txt: 'Inomhusdel i pannrummet' },
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
      { src: `${M}/jobb-telefon.jpg`, alt: 'Person i vit skjorta med en mobiltelefon', txt: 'Ring 08-25 30 33' },
    ],
  },

  varfor: {
    eyebrow: 'Varför Söderholms',
    rubrik: ['Vi tar hand om', 'hela systemet'],
    lead: 'En värmepump är bara så bra som systemet runt den. Vi är el- och VVS-firma sedan 1942 och har jobbat med Thermia sedan början av 90-talet, så pumpen, elen och rören hålls i samma hand.',
    punkter: [
      { rubrik: 'Thermia sedan 90-talet', text: 'Återförsäljare av Thermia, och vi installerar deras senaste pumpar som Sigrin och Atlas.' },
      { rubrik: 'El och VVS i samma firma', text: 'Elen, rören och systemvattnet runt pumpen gör vi själva. Du behöver inte samordna flera hantverkare.' },
      { rubrik: 'Hela vägen', text: 'Från första frågan och dimensioneringen till färdig installation och service efteråt.' },
      { rubrik: 'Rätt pump, inte största', text: 'Vi hjälper dig välja det som passar huset och borrhålet du redan har. Räcker en mindre lösning säger vi det.' },
    ],
    video: `${M}/video-varfor.mp4`,
    poster: `${M}/poster-varfor.jpg`,
    videoAlt: 'Ett gammalt pannrum med rostig oljepanna förvandlas till ett ljust rum med värmepump. Filmen slutar med Söderholms El & VVS logotyp i guld.',
  },

  om: {
    eyebrow: 'Om Söderholms',
    rubrik: ['El och VVS', 'sedan 1942'],
    kortRad: 'Bromma · Stockholm och Uppsala',
    stycken: [
      'Söderholms El & VVS har funnits sedan 1942. Sedan början av 90-talet har vi arbetat med Thermias värmepumpar, och i dag är vi stolta återförsäljare av dem.',
      'Vi installerar och servar värmepumpar i Stockholm och Uppsala, för privatpersoner och företag, i villor och i större fastighetsanläggningar. Och eftersom vi är både el- och VVS-firma tar vi hand om hela systemet, inte bara symptomen.',
    ],
    bevis: [
      { ord: 'Sedan 1942', text: 'el och VVS i Bromma' },
      { ord: 'Thermia', text: 'återförsäljare sedan 90-talet' },
      { ord: 'F-skatt', text: 'godkänd för F-skatt' },
    ],
  },

  steg: {
    eyebrow: 'Så går det till',
    rubrik: ['Från första frågan', 'till färdig installation'],
    lead: 'Samma ordning oavsett om det är en villa eller en fastighet.',
    lista: [
      { namn: 'Ring eller skriv', text: 'Ring 08-25 30 33 eller skicka en förfrågan om huset och hur du värmer det i dag.', ikon: 'kontakt' },
      { namn: 'Rådgivning', text: 'Vi går igenom vilken pump som passar: luft, vatten eller berg, och om borrhålet kan återanvändas.', ikon: 'besok' },
      { namn: 'Offert', text: 'Du får en offert anpassad efter typ och installation.', ikon: 'offert' },
      { namn: 'Installation', text: 'Vi installerar pumpen och tar hand om el och VVS runt den, trappor inräknade.', ikon: 'arbete' },
      { namn: 'Service', text: 'Regelbunden service och ett rent systemvatten håller pumpen effektiv i många år.', ikon: 'klart' },
    ],
  },

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Vad kunderna', 'säger'],
    lista: [
      { namn: 'Villaägare', kalla: 'Bromma', exempel: true, text: 'Här står ett riktigt omdöme från en kund, med namn och ort som de själva skrivit det.' },
      { namn: 'Fastighetsägare', kalla: 'Stockholm', exempel: true, text: 'Ett andra kort, hämtat ur er Google-profil.' },
      { namn: 'Privatkund', kalla: 'Uppsala', exempel: true, text: 'Ett tredje kort, gärna om ett pumpbyte eller en service.' },
    ],
    not: 'Exempel — byts mot era riktiga omdömen.',
    lank: { href: 'https://www.google.com/maps/search/S%C3%B6derholms+El+%26+VVS+AB+Bromma', txt: 'Se oss på Google' },
  },

  instagram: {
    eyebrow: 'Instagram',
    rubrik: ['Följ jobben', 'i vardagen'],
    lead: 'Nya installationer och nyheter från Thermia, direkt från vårt konto.',
    bio: 'El & VVS sedan 1942 · Thermia värmepumpar · Stockholm och Uppsala',
    koder: ['DePVBOBCwMu', 'DcMD58mAvQ2', 'DeW6uanghmz'],
  },

  fragor: {
    eyebrow: 'Vanliga frågor',
    rubrik: ['Det du brukar', 'undra först'],
    lead: 'Pengar först, det praktiska sedan.',
    kort: { rubrik: 'Hittar du inte svaret?', text: 'Ring 08-25 30 33 eller mejla info@soderholms.se, så svarar vi på det som gäller just ditt hus.' },
    lista: [
      { q: 'Vad kostar en värmepump?', a: 'Priset beror på typ av pump och installation. Kontakta oss så får du en offert.' },
      { q: 'Kan min gamla bergvärmepump bytas?', a: 'Ja. Thermia Sigrin kan ersätta en berg-, jord- eller sjövärmepump och anpassar sig efter ditt värmebehov och det borrhål som redan finns.' },
      { q: 'Vilka typer av värmepumpar erbjuder ni?', a: 'Luft-, vatten- och bergvärmepumpar, så att det finns en lösning för olika bostäder och energibehov.' },
      { q: 'Varför Thermia?', a: 'Thermia är kända för hög kvalitet och energieffektivitet, vilket ger lägre driftskostnader. Vi har jobbat med deras pumpar sedan början av 90-talet.' },
      { q: 'Vad är systemrening?', a: 'Magnetit bildas av korrosion i värmesystemet och kan sätta igen ventiler och slita på pumpar. Med ett systemfilter renar vi systemvattnet så att värmen förs över bättre.' },
      { q: 'Gör ni elen också?', a: 'Ja. Vi är både el- och VVS-firma och installerar till exempel laddboxar, från dimensionering till färdig installation.' },
      { q: 'Tar ni större fastigheter?', a: 'Ja. Vi gör både villor och större fastighetsanläggningar, för privatpersoner och företag.' },
      { q: 'Var arbetar ni?', a: 'I Stockholm och Uppsala. Vi sitter på Tranebergsvägen i Bromma.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Offert',
    rubrik: ['Begär offert,', 'eller ring oss'],
    lead: 'Ring 08-25 30 33, eller skriv några rader om huset. Vi återkommer med frågor och en offert.',
    checkar: ['Thermia-återförsäljare sedan 90-talet', 'El och VVS i samma firma', 'Stockholm och Uppsala'],
    video: `${M}/video-kontakt-uppsala.mp4`,
    poster: `${M}/poster-kontakt-uppsala.jpg`,
    formRubrik: 'Begär offert',
    placeholder: 'Typ av hus eller fastighet, hur du värmer i dag, och om det gäller ny pump, varmvatten, service eller el',
    formNot: 'Skriv kort om huset, då kan vi ge ett vettigt svar redan i första samtalet.',
    kundtyp: ['Privatperson', 'Företag', 'Fastighet/BRF'],
  },

  popup: {
    rubrik: 'Dags att byta pump?',
    text: 'Ring 08-25 30 33 eller begär en offert. Vi hjälper dig från första frågan till färdig installation.',
  },

  footer: {
    text: 'Thermia värmepumpar, varmvatten, systemrening, el och VVS. Sedan 1942, i Stockholm och Uppsala.',
  },

  modal: {
    rubrik: 'Så här kan Söderholms El & VVS se ut på nätet',
    text: 'Det här är ett kostnadsfritt förslag, byggt på det ni själva visar på soderholms.se och Instagram, med era egna bilder där vi hade dem. Ingen beställning, inget åtagande. Vill ni se den skarpt med ett formulär som landar i inkorgen? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.',
  },
};

export default function SoderholmsDemo() {
  return <DemoSida data={data} />;
}
