import DemoSida from '../_mall/DemoSida';

/* ===========================================================================
   GD MÅLERI STHLM AB — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: instagram.com/gdmaleristhlm · Stockholm · HAR hemsida (gdmaleri.se).
   Byggd 2026-10-08 på demomallen v3 (kopia av swedcro-kanon).

   Bärande idé: ägaren själv besiktar huset innan offerten skrivs och går
   igenom resultatet med kunden när jobbet är klart, och fakturan kommer först
   då. Kunderna på Reco nämner det gång på gång (besiktning före offert,
   genomgång och påskrift efter, slutbesiktning). Varför-sektionen bär den.

   VERIFIERAT (2026-10-08):
   gdmaleri.se: "Din målare i Stockholm", "flera års erfarenhet", tjänsterna
   invändig målning, tapetsering, snickerier & fönstermålning, takmålning,
   fasadmålning, bredspackling & tapetborttagning · "Nöjd kund garanti",
   "kostnadsfri offert" · "från planering och materialval till genomförande
   och slutbesiktning" · FAQ: F-skatt och fullt försäkrade via Trygg-Hansa;
   offerten inkluderar material, arbetskraft, förberedelser som tvättning och
   skrapning, städning och bortforsling; färg från Flügger, miljövänliga
   alternativ finns; 1 års garanti på måleriarbetet, åtgärdas utan extra
   kostnad; ytor täcks med plast eller papper, möbler och golv skyddas;
   faktura efter slutfört arbete, ingen förskottsbetalning (över 500 kvm: 50 %
   av arbetskostnaden vid halva jobbet); inga extraarbeten utan kundens
   godkännande; ROT dras direkt på fakturan · info@gdmaleri.se · sajtens
   synliga nummer 073-729 88 89 (länken bakom är platshållaren tel:123-456-7890).
   Telefon 073-729 88 89 bekräftad i IG-inlägg Dd-zVd3ggOI ("Tel:0737298889")
   och på Reco. Facebook-sidan länkas från sajten.
   allabolag.se: GD Måleri Sthlm AB, org.nr 559468-2444, Södertälje,
   aktiebolag registrerat 2024-01-16, F-skatt och moms, Ghandi Danho
   (befattningshavare), "Bolaget skall utföra måleritjänster, golvläggning …".
   Reco.se/gd-maleri-sthlm: 4,9 av 5, 45 omdömen (39 femmor, 6 fyror),
   "Verifierat företag", Rekommenderat företag 2024, 2025 och 2026 (IG-inlägg
   DcmMHrIEbrF: "rekommenderat företag för tredje året i rad"); omdömena från
   Ola A (2026-08-25), Anders F (2025-12-19) och Inga-Lill M (2026-07-26) är
   femmor från verifierade kunder, citerade ordagrant (Ola i sin helhet, Anders
   kortat i slutet, markerat med …).
   Instagram @gdmaleristhlm, bildtexter ordagrant: Dd-zVd3ggOI "Årets sista Fasad
   på 234 kvm 2026 är avklarad i Bromma" · Dc1IM7Pgpeh "Exklusiv Fasadmålning
   klar 350 kvm i Täby kyrkby" (platstagg Täby) · DeNI1zEkcpW "180 kvm Tak/Vägg
   målning samt microlituppsättning och snobbkant" (platstagg Södertälje). Alla
   tre är inbäddade i Instagram-sektionen. Reco-omdöme Johan W: lägenhet 43 kvm.
   Jobbildernas bildtexter säger bara vad bilden visar och vilken tjänstesida på
   gdmaleri.se den ligger under; ingen ort är belagd för dem.
   Alla stillbilder är firmans egna foton från gdmaleri.se (galleri, utförda
   arbeten, tjänstesidor) och bildrutor ur deras egen film.

   INTE verifierat, och finns därför inte på sidan: Google-profil och betyg
   (ingen hittad), öppettider, priser, antal projekt, ledtider, medlemskap i
   Måleriföretagen och AAA-kreditbetyg (märkena står på sajten men är inte
   kontrollerade), "Alltid fast pris" (sajten säger det, men ett Reco-omdöme
   beskriver slutpris över offert vid tillägg — utelämnat). Gatuadressen
   (Prosten Linders Väg 39, Södertälje, enligt Reco) visas inte.

   FLAGGOR: hero-filmen (rödfärgad villa, förvandlingen) är en genererad
   illustration (Grok Imagine A + B, Kling 3.0) — inte ett av deras hus.
   Logotypen är deras egen: formerna, penseln och texten är vektorerna ur
   GD-MALERI-STHLM-AB-logo-1.svg i deras mediebibliotek (gradientbilden i den
   filen är bortstrippad), fyllda med färgerna ur deras 512-px PNG. 1400 px
   bred. Den ljusa varianten har bara texten omfärgad till vit, som i deras
   egen vita variant i sajtens header. Varför-filmens slutkort har den gamla,
   mjukare loggan. Formuläret går till
   mathias@bahkobyra.se (demonyckeln).
   =========================================================================== */

export const metadata = {
  title: 'GD Måleri Sthlm AB — målare i Stockholm, inne och ute',
  description:
    'Målare i Stockholm. Invändig målning, fasadmålning, tapetsering, bredspackling och snickerier. Besiktning före offerten, ett års garanti och ROT direkt på fakturan. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

const M = '/gdmaleri/media';

const data = {
  namn: 'GD Måleri Sthlm AB',
  tema: {
    mork: '#0D1B2A',
    accent: '#D42E44',
    accentHover: '#B82237',
    accentText: '#B82237',
    accentLjus: '#FF8E9A',
    paAccent: '#fff',
  },
  logo: { src: `${M}/logo-gdmaleri.png`, ljus: `${M}/logo-gdmaleri-ljus.png`, w: 1400, h: 1315, alt: 'GD Måleri Sthlm AB', topp: 'bricka' },
  kontakt: {
    tel: '073-729 88 89',
    telHref: 'tel:+46737298889',
    epost: 'info@gdmaleri.se',
    ig: 'https://www.instagram.com/gdmaleristhlm/',
    igHandle: '@gdmaleristhlm',
    fb: 'https://www.facebook.com/people/GD-M%C3%A5leri-Sthlm-AB/61557609848512/',
    orgnr: '559468-2444',
  },
  cta: { txt: 'Begär kostnadsfri offert', kort: 'Begär offert', lank: 'Begär offert' },
  nav: {
    vanster: [{ href: '#tjanster', txt: 'Tjänster' }, { href: '#jobb', txt: 'Våra jobb' }],
    hoger: [{ href: '#om', txt: 'Om oss' }, { href: '#omdomen', txt: 'Omdömen' }],
  },

  hero: {
    ort: 'Stockholm',
    tjanster: ['Måleri', 'Fasad'],
    video: `${M}/video-hero-rodfarg.mp4`,
    videoMobil: `${M}/video-hero-rodfarg-mobil.mp4`,
    poster: `${M}/poster-hero.jpg`,
    posterMobil: `${M}/poster-hero-mobil.jpg`,
  },
  tejp: ['4,9 av 5 på Reco', 'Rekommenderat tre år i rad', 'Invändig målning', 'Fasadmålning', 'F-skatt och försäkrade', 'Tapetsering', 'Ett års garanti', 'Bredspackling'],

  tjanster: {
    eyebrow: 'Vad vi gör',
    rubrik: ['Inne, ute och', 'allt förarbete'],
    lead: '4,9 av 5 i snitt på Reco från 45 omdömen, och Rekommenderat företag på Reco tre år i rad. Vi målar inne och ute och gör förarbetet själva: skrapning, slipning, spackling och tapetborttagning.',
    kort: [
      { id: 'invandig', namn: 'Invändig målning', bild: `${M}/tjanst-invandig.jpg`, alt: 'Rum med mörkblått målat tak, ljusa väggar och vitt fönster', text: 'Väggar, tak och lister i hem, kontor och lokaler. Golv och möbler täcks med plast eller papper innan första penseldraget.', punkter: ['Väggar och tak', 'Takmålning', 'Kontor och lokaler'], ritning: (<><path d="M30 26h140v72H30z" /><path d="M30 26l22 16h96l22-16" /><path d="M52 42v56M148 42v56" /><path d="M84 60h32v24H84z" /></>) },
      { id: 'fasad', namn: 'Fasadmålning', bild: `${M}/tjanst-fasad.jpg`, alt: 'Nymålad laxrosa panelfasad med vitt burspråksfönster och svart stuprör', text: 'Tvätt, skrapning och ny färg på träfasaden, vindskivor, takfot och fönsterkarmar. Vi målar med Flügger, som täcker bra och skyddar länge.', punkter: ['Tvätt och skrapning', 'Vindskivor och takfot', 'Rödmålning'], ritning: (<><path d="M20 100V48l80-34 80 34v52" /><path d="M20 100h160" /><path d="M44 56v44M68 50v50M92 44v56M116 44v56M140 50v50M164 56v44" /></>) },
      { id: 'tapet', namn: 'Tapetsering och spackel', bild: `${M}/tjanst-tapet.jpg`, alt: 'Nyuppsatt mönstrad tapet med fåglar och blad runt en dörr', text: 'Gammal tapet bort, väggen bredspacklas slät och den nya tapeten sätts upp. Vi hjälper dig också att välja.', punkter: ['Tapetborttagning', 'Bredspackling', 'Hjälp att välja tapet'], ritning: (<><path d="M40 20h120v84H40z" /><path d="M80 20v84M120 20v84" /><path d="M48 40c8-8 16 8 24 0M88 40c8-8 16 8 24 0M128 40c8-8 16 8 24 0M48 72c8-8 16 8 24 0M88 72c8-8 16 8 24 0M128 72c8-8 16 8 24 0" /></>) },
      { id: 'snickerier', namn: 'Snickerier och fönster', bild: `${M}/tjanst-snickerier.jpg`, alt: 'Spegeldörr målad i mörkgrönt i en ljus lägenhet', text: 'Dörrar, foder, lister och fönster målas så att de skyddas och ser nya ut igen. Ruttna fönsterfoder kan bytas i samma veva.', punkter: ['Fönstermålning', 'Dörrar och lister', 'Byte av fönsterfoder'], ritning: (<><path d="M54 16h92v88H54z" /><path d="M100 16v88M54 60h92" /><path d="M44 104h112" /></>) },
    ],
  },

  jobb: {
    eyebrow: 'Våra jobb',
    rubrik: ['Hus och hem vi', 'har målat om'],
    lead: 'Fasader, trapphus och rum, fotograferade av oss på plats.',
    not: 'Alla bilder är från våra egna projekt.',
    tid: '70s',
    rad1: [
      { src: `${M}/jobb-rod-gavel.jpg`, alt: 'Rödmålad timmergavel med vita vindskivor mot blå himmel', txt: 'Gavel målad i rött' },
      { src: `${M}/jobb-rod-fonster.jpg`, alt: 'Vitmålat spröjsat fönster i en röd träfasad', txt: 'Fönster målade vita' },
      { src: `${M}/jobb-hornet.jpg`, alt: 'Laxrosa panelfasad med vitt burspråksfönster', txt: 'Panelfasad och foder målade' },
      { src: `${M}/jobb-terrass.jpg`, alt: 'Nymålad laxrosa fasad och vit dörr vid en trädäcksaltan', txt: 'Fasad och dörr målade' },
      { src: `${M}/jobb-fonsterbleck.jpg`, alt: 'Närbild på vitmålad fönsterbåge och svart fönsterbleck mot panel', txt: 'Fönsterbåge målad' },
      { src: `${M}/jobb-fonster-maskerade.jpg`, alt: 'Spröjsade fönster maskerade med blå tejp inför målning', txt: 'Fönster maskade före målning' },
      { src: `${M}/jobb-spackel-tak.jpg`, alt: 'Målare i vit t-shirt spacklar ett innertak', txt: 'Innertak spacklas' },
    ],
    rad2: [
      { src: `${M}/jobb-sekelskifte.jpg`, alt: 'Ljust rum med två höga spröjsade fönster och radiatorer', txt: 'Rum målat i ljust' },
      { src: `${M}/jobb-bla-tak.jpg`, alt: 'Ljusblått målat tak med spotlightskena och bokhylla', txt: 'Tak målat ljusblått' },
      { src: `${M}/jobb-gul-hall.jpg`, alt: 'Hall i varmgul kulör med vita snickerier och balkongdörr', txt: 'Hall målad i gult' },
      { src: `${M}/jobb-panelvagg.jpg`, alt: 'Vitmålad bröstpanel under en ljusgrön vägg', txt: 'Bröstpanel målad vit' },
      { src: `${M}/jobb-trapphus.jpg`, alt: 'Trapphus med mörkrosa nederdel och ljus vägg ovanför', txt: 'Trapphus målat i två kulörer' },
      { src: `${M}/jobb-vardagsrum.jpg`, alt: 'Tomt vardagsrum med ljusrosa väggar och tre fönster', txt: 'Vardagsrum målat ljusrosa' },
      { src: `${M}/jobb-bredspackling.jpg`, alt: 'Vägg under bredspackling, golvet täckt med papper', txt: 'Vägg bredspacklas före målning' },
    ],
  },

  varfor: {
    eyebrow: 'Varför GD Måleri',
    rubrik: ['Samma ögon före', 'och efter jobbet'],
    lead: 'Ghandi besiktar huset själv innan offerten skrivs, och går igenom resultatet med dig när vi är klara. Fakturan kommer först efter det.',
    punkter: [
      { rubrik: 'Besiktning före offert', text: 'Ghandi tittar på huset själv och föreslår det du kanske inte tänkt på, innan han räknar.' },
      { rubrik: 'Inget extra utan ditt ja', text: 'Dyker något oväntat upp hör vi av oss direkt. Vi gör inga extraarbeten utan ditt godkännande.' },
      { rubrik: 'Ett års garanti', text: 'Behöver något åtgärdas under det första året gör vi det utan extra kostnad.' },
      { rubrik: 'Allt med i offerten', text: 'Material, förarbete som tvätt och skrapning, städning och bortforsling räknas in från början.' },
    ],
    video: `${M}/video-varfor-rodgavel.mp4`,
    poster: `${M}/poster-varfor.jpg`,
    videoAlt: 'Långsam inzoomning mot en rödmålad gavel med vitt fönster mot blå himmel. Filmen slutar med GD Måleris logotyp.',
  },

  om: {
    eyebrow: 'Om GD Måleri',
    rubrik: ['Målerifirman där', 'ägaren svarar själv'],
    kortRad: 'Stockholm',
    stycken: [
      'GD Måleri Sthlm AB är en målerifirma i Stockholm som drivs av Ghandi Danho. Vi målar inomhus och utomhus och gör förarbetet själva, med flera års erfarenhet i yrket.',
      'Vi målar åt villaägare, bostadsrätter och företag, från en lägenhet på 43 kvm till en fasad på 350 kvm i Täby kyrkby. Du har samma kontakt hela vägen, vi målar med Flügger och vi är försäkrade via Trygg-Hansa.',
    ],
    bevis: [
      { ord: '4,9 av 5', text: 'i snitt på Reco, 45 omdömen' },
      { ord: 'Tre år i rad', text: 'Rekommenderat företag på Reco' },
      { ord: 'F-skatt', text: 'och fullt försäkrade' },
    ],
  },

  steg: {
    eyebrow: 'Så går det till',
    rubrik: ['Från första samtalet till', 'färdig genomgång'],
    lead: 'Samma kontakt hela vägen, och fakturan kommer när jobbet är klart.',
    lista: [
      { namn: 'Ring eller skriv', text: 'Berätta vad som ska målas, inne eller ute. Det räcker med några rader.', ikon: 'kontakt' },
      { namn: 'Besiktning', text: 'Ghandi tittar på huset eller lägenheten, mäter och föreslår det du kanske inte tänkt på.', ikon: 'besok' },
      { namn: 'Kostnadsfri offert', text: 'Material, arbete, förarbete, städning och bortforsling ingår.', ikon: 'offert' },
      { namn: 'Vi målar', text: 'Allt som inte ska målas täcks. Du hålls uppdaterad, och inget extra görs utan ditt ja.', ikon: 'arbete' },
      { namn: 'Genomgång', text: 'Vi går igenom resultatet tillsammans. Fakturan kommer efter det, med ROT redan avdraget.', ikon: 'klart' },
    ],
  },

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Det kunderna', 'lägger märke till'],
    lista: [
      { namn: 'Ola A', kalla: 'Verifierad kund · Reco', text: 'Målning av 2-plans hus. Vi fick ett väldigt bra intryck av Ghandi då han gjorde en noggrann besiktning av huset innan offert skickades samt kom med förslag på saker vi inte hade tänkt på innan vad gäller estetik. Jobbet utfördes smidigt och snabbt och vi är jättenöjda. Jag kan starkt rekommendera GD Måleri.' },
      { namn: 'Inga-Lill M', kalla: 'Verifierad kund · Reco', text: 'GD Måleri gav ett proffsigt intryck. Trevliga och informativa. Snyggt och snabbt arbete. Efter arbetet, genomgång och påskrift av arbetsorder. Jag är väldigt nöjd med resultatet. Rekommenderas varmt.' },
      { namn: 'Anders F', kalla: 'Verifierad kund · Reco', text: 'Vi anlitade GD Måleri Sthlm AB för att måla om hall, trapphus och vardagsrum, och är mycket nöjda med resultatet. Arbetet håller riktigt hög kvalitet, utfördes med stor erfarenhet och noggrannhet, och levererades helt enligt överenskommen tidsplan. …' },
    ],
    not: 'Från Reco.se, där kundrelationen kontrolleras. Ordagrant, ett av dem kortat där det står …',
    lank: { href: 'https://www.reco.se/gd-maleri-sthlm', txt: 'Läs alla på Reco' },
  },

  instagram: {
    eyebrow: 'Instagram',
    rubrik: ['Följ jobben', 'i vardagen'],
    lead: 'Det senaste från vårt konto, direkt från Instagram.',
    bio: 'Måleri inne och ute · Stockholm',
    koder: ['Dd-zVd3ggOI', 'Dc1IM7Pgpeh', 'DeNI1zEkcpW'],
  },

  fragor: {
    eyebrow: 'Vanliga frågor',
    rubrik: ['Det ni brukar', 'fråga först'],
    lead: 'Pengar och risk först, det praktiska sedan.',
    kort: { rubrik: 'Hittar du inte svaret?', text: 'Ring Ghandi och fråga rakt ut. Du får ett ärligt besked om just ditt hus eller din lägenhet.' },
    lista: [
      { q: 'Vad kostar det?', a: 'Det beror på ytan, skicket och vad som ska göras. Därför börjar vi med en besiktning och en offert, utan kostnad. Offerten tar med material, arbete, förarbete som tvätt och skrapning, städning och bortforsling.' },
      { q: 'Hur fungerar ROT-avdraget?', a: 'Vi drar av ROT direkt på fakturan och sköter resten, så du behöver inte göra något själv. Hur stort avdraget blir beror på arbetskostnaden och hur mycket avdrag du redan har använt i år.' },
      { q: 'När betalar jag?', a: 'Du får fakturan när arbetet är klart, ingen förskottsbetalning. På stora jobb över 500 kvm betalas halva arbetskostnaden när halva jobbet är gjort.' },
      { q: 'Vad händer om något oväntat dyker upp?', a: 'Då hör vi av oss direkt och föreslår en lösning. Vi gör inga extraarbeten utan ditt godkännande.' },
      { q: 'Har ni garanti?', a: 'Ja, ett år på måleriarbetet. Behöver något åtgärdas under den tiden gör vi det utan extra kostnad.' },
      { q: 'Är ni försäkrade?', a: 'Ja. Vi har F-skatt och är fullt försäkrade via Trygg-Hansa. Skulle något gå fel under arbetet är du skyddad.' },
      { q: 'Hur skyddar ni hemmet?', a: 'Allt som inte ska målas täcks med plast eller papper, och vi skyddar möbler och golv innan vi börjar.' },
      { q: 'Var arbetar ni?', a: 'I Stockholm med omnejd. I år har vi bland annat målat fasader i Bromma och Täby kyrkby och tak och väggar i Södertälje.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Begär en offert,', 'den kostar ingenting'],
    lead: 'Ring, eller skriv några rader. Ghandi tittar på jobbet och skickar en offert där allt ingår.',
    checkar: ['Kostnadsfri besiktning och offert', 'ROT dras direkt på fakturan', 'Ett års garanti på arbetet'],
    video: `${M}/video-kontakt-rodgavel.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta kort om jobbet',
    placeholder: 'Vad som ska målas, inne eller ute, ungefärlig yta, och var i Stockholm',
    formNot: 'Skriv kort om jobbet, så kan Ghandi ge ett vettigt svar redan i första samtalet. Inga massutskick, ingen säljlista.',
  },

  popup: {
    rubrik: 'Inne eller ute?',
    text: 'Ghandi tittar på jobbet och skickar en offert som inte kostar något. ROT dras direkt på fakturan.',
  },

  footer: {
    text: 'Invändig målning, fasadmålning, tapetsering och snickerier i Stockholm. Besiktning före offerten och genomgång innan fakturan.',
  },

  modal: {
    rubrik: 'Så här kan GD Måleri se ut på nätet',
    text: 'Det här är ett kostnadsfritt förslag, byggt på det ni själva visar på gdmaleri.se, Instagram och Reco, med era egna projektfoton. Ingen beställning, inget åtagande. Vill ni se den skarpt med ett formulär som landar i inkorgen? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.',
  },
};

export default function GdMaleriDemo() {
  return <DemoSida data={data} />;
}
