import DemoSida from '../_mall/DemoSida';

/* ===========================================================================
   SWEDCRO MÅLERI & FASAD — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: instagram.com/swedcromaleri · Eskilstuna · HAR hemsida (swedcro.se).
   FÖRSTA DEMON PÅ DEMOMALLEN v3 (2026-09-18) — kanon för den nya designen.

   Bärande idé: fasaden är husets ansikte utåt (deras egen mening), och det
   som skiljer en fasad som håller från en som spricker är förarbetet och
   sockeln. Förvandlingsfilmen i Varför-sektionen visar exakt det.

   VERIFIERAT (swedcro.se + IG-bio + hitta.se, 2026-09-09):
   Firmanamn "Swedcro Måleri & Fasad" · enskild firma, Hedevägen 22, 633 47
   Eskilstuna · telefon 072-271 74 41 · info@swedcro.se · öppet mån–fre 07–16 ·
   tjänster i deras ord: måleri, renovering, tapetsering, akrylfasad med
   Rockwool-isolering, mosaik/sockelputs · egna fraser: "Vi kommer hem till
   dig", "Hederligt hantverk, rena ytor och tydliga offerter", "Du betalar när
   du är 100 % nöjd", "Vi svarar oftast inom 24 timmar", "15+ års erfarenhet",
   "F-skatt & försäkrade" · Google 5,0 av 2 recensioner (Ivan Lukic, Stina
   Bergqvist, ordagrant) plus sajt-omdöme (Yohanna, Eskilstuna) · 66 egna
   projektfoton via sajtens galleri — arton används här, vart och ett en gång ·
   Instagram-inläggen är deras egna, inbäddade direkt från Instagram.

   INTE verifierat, och finns därför inte på sidan: org.nr, antal projekt,
   priser, garantier utöver "betala när du är nöjd". "15+ år" står som deras
   egen uppgift.

   FLAGGOR: formuläret går till mathias@bahkobyra.se; hero-filmen är deras eget
   foto i långsam rörelse (ffmpeg, 0 credits); förvandlingsfilmen är en
   illustration och märkt så på sidan; alla stillbilder är deras egna foton.
   2026-09-19 (Mathias feedback): heron är logotyp + ort + två tjänster,
   tjänsteband under heron, stegen är en resa utan siffror. Filmerna har
   bytt plats: FÖRVANDLINGEN (genererad illustration) är hero-film, och den
   lugna filmen ur ett foto ligger i Varför med logotypen på slutet.
   Illustrationsnoten under filmen är struken på Mathias begäran — att
   hero-filmen är en illustration står bara här och i leadfilen.
   =========================================================================== */

export const metadata = {
  title: 'Swedcro Måleri & Fasad — måleri, fasad och sockelputs i Eskilstuna',
  description:
    'Målare i Eskilstuna. Måleri, fasadrenovering, akrylputs, mosaik/sockelputs och tapetsering. Vi kommer hem till dig, fri offert. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

const M = '/swedcro/media';

const data = {
  namn: 'Swedcro Måleri & Fasad',
  tema: {
    mork: '#0B132B',
    accent: '#D92525',
    accentHover: '#B91C1C',
    accentText: '#B91C1C',
    accentLjus: '#FF8A7E',
    paAccent: '#fff',
  },
  logo: { src: `${M}/logo-swedcro.png`, w: 870, h: 355, alt: 'Swedcro Måleri & Fasad', topp: 'bricka' },
  kontakt: {
    tel: '072-271 74 41',
    telHref: 'tel:+46722717441',
    epost: 'info@swedcro.se',
    adress: 'Hedevägen 22, 633 47 Eskilstuna',
    oppet: 'Mån–fre 07–16',
    ig: 'https://www.instagram.com/swedcromaleri/',
    igHandle: '@swedcromaleri',
    fb: 'https://www.facebook.com/people/Swedcro-M%C3%A5leri-Fasad/61590370362454/',
  },
  cta: { txt: 'Boka gratis hembesök', kort: 'Boka hembesök', lank: 'Boka hembesök' },
  nav: {
    vanster: [{ href: '#tjanster', txt: 'Tjänster' }, { href: '#jobb', txt: 'Våra jobb' }],
    hoger: [{ href: '#om', txt: 'Om oss' }, { href: '#omdomen', txt: 'Omdömen' }],
  },
  formAction: 'mailto:mathias@bahkobyra.se?subject=Swedcro%20-%20offertf%C3%B6rfr%C3%A5gan',

  hero: {
    ort: 'Eskilstuna',
    tjanster: ['Måleri', 'Fasad'],
    video: `${M}/video-hero-fore-efter-fasad.mp4`,
    videoMobil: `${M}/video-hero-fore-efter-fasad-mobil.mp4`,
    poster: `${M}/poster-hero.jpg`,
    posterMobil: `${M}/poster-hero-mobil.jpg`,
  },
  tejp: ['Fasadrenovering', 'Akrylputs', 'Sockelputs', 'Måleri', 'Tapetsering', 'Fönstermålning', 'Renovering', 'Eskilstuna'],

  tjanster: {
    eyebrow: 'Vad vi gör',
    rubrik: ['Allt under', 'samma tak'],
    lead: 'Vi tar hand om hela projektet, ute som inne. Hederligt hantverk, rena ytor och tydliga offerter.',
    kort: [
      { id: 'fasad', namn: 'Fasad och sockelputs', bild: `${M}/tjanst-fasad.jpg`, alt: 'Villa med ljus fasad, grå mosaiksockel och nytt trästaket', text: 'Akrylputs med Rockwool-isolering som skyddar mot fukt, vind och slitage, och en mosaiksockel som tål stötar och smuts utan underhåll.', punkter: ['Akrylfasad med isolering', 'Mosaik och sockelputs', 'Fasadmålning'], ritning: (<><path d="M20 100V44l80-30 80 30v56" /><path d="M20 100h160" /><path d="M20 84h160" /><path d="M56 60h20v20H56zM124 60h20v20h-20z" /></>) },
      { id: 'maleri', namn: 'Måleri inomhus', bild: `${M}/tjanst-maleri.jpg`, alt: 'Nymålat vindsrum med snedtak, takfönster och nytt golv', text: 'Väggar och tak, lister, foder och dörrar. Rätt förarbete och noggrann penselföring ger jämna ytor och skarpa kanter.', punkter: ['Väggar och tak', 'Snickerier och dörrar', 'Fönstermålning'], ritning: (<><path d="M30 26h140v72H30z" /><path d="M30 62h140" /><path d="M64 26v72M100 26v72M136 26v72" /></>) },
      { id: 'tapet', namn: 'Tapetsering', bild: `${M}/tjanst-tapet.jpg`, alt: 'Fondvägg med mönstrad tapet i blått och guld, golvet maskerat', text: 'Raka skarvar och mönsterpassning som stämmer. Vi tar bort den gamla tapeten, förbereder väggen och sätter den nya.', punkter: ['Tapetborttagning', 'Förarbete av väggar', 'Mönster och enfärgat'], ritning: (<><path d="M40 20h120v84H40z" /><path d="M80 20v84M120 20v84" /><path d="M48 40c8-8 16 8 24 0M88 40c8-8 16 8 24 0M128 40c8-8 16 8 24 0M48 72c8-8 16 8 24 0M88 72c8-8 16 8 24 0M128 72c8-8 16 8 24 0" /></>) },
      { id: 'renovering', namn: 'Renovering', bild: `${M}/tjanst-renovering.jpg`, alt: 'Vägg under renovering, spacklad efter tapetborttagning', text: 'Helhetslösningar för ett rum eller hela hemmet, från spackling och slipning till färdig yta. En kontakt genom hela projektet.', punkter: ['Spackel och slipning', 'Lister och foder', 'Totalrenovering'], ritning: (<><path d="M28 24h144v80H28z" /><path d="M28 60h144" /><path d="M44 40h48M44 50h32" /><path d="M120 34l14 14M134 34l-14 14" /><path d="M44 76h112M44 88h80" /></>) },
    ],
  },

  jobb: {
    eyebrow: 'Våra jobb',
    rubrik: ['Arbeten vi har', 'lämnat efter oss'],
    lead: 'Fasader, socklar och rum, fotograferade av oss på plats.',
    not: 'Alla bilder är från våra egna projekt.',
    tid: '75s',
    rad1: [
      { src: `${M}/jobb-garage.jpg`, alt: 'Garage med ny ljus fasad och vit garageport', txt: 'Garage med ny fasad' },
      { src: `${M}/jobb-sockelputs-trappa.jpg`, alt: 'Källartrappa och sockel klädda i grå mosaikputs', txt: 'Sockelputs runt källartrappa' },
      { src: `${M}/jobb-vit-villa-vinter.jpg`, alt: 'Nyputsad vit villa med mörkt tak i snö', txt: 'Ny fasad, klar före vintern' },
      { src: `${M}/jobb-stallning-nybygge.jpg`, alt: 'Hus i byggställning under fasadarbete', txt: 'Fasadarbete på ställning' },
      { src: `${M}/jobb-makro-sockel.jpg`, alt: 'Närbild på mosaikputs i grå sten vid ett hörn', txt: 'Mosaikputsen på nära håll' },
      { src: `${M}/jobb-vit-tegelfasad.jpg`, alt: 'Ljus tegelfasad med målad sockel och stenlagd gång', txt: 'Ljus fasad med målad sockel' },
      { src: `${M}/jobb-gult-hus.jpg`, alt: 'Tvåplanshus med ljus fasad och gula fönsterfoder, firmabil framför', txt: 'Fasad och foder' },
    ],
    rad2: [
      { src: `${M}/jobb-vindsrum.jpg`, alt: 'Nymålat vindsrum med snedtak och balkongdörrar', txt: 'Vindsrum, tak och väggar' },
      { src: `${M}/jobb-tapetrum.jpg`, alt: 'Rum med mönstrad fondtapet och ockra väggar, golvet maskerat', txt: 'Fondvägg med mönsterpassning' },
      { src: `${M}/jobb-kok.jpg`, alt: 'Nymålat kök med matplats och ekgolv', txt: 'Kök och matplats' },
      { src: `${M}/jobb-tv-vagg.jpg`, alt: 'Vardagsrumsvägg med marmormönstrad skiva, ribbor och hyllor', txt: 'Vardagsrum med fondvägg' },
      { src: `${M}/jobb-rum-tragolv.jpg`, alt: 'Nymålat rum i ljusblått med trägolv', txt: 'Sovrum i ny kulör' },
      { src: `${M}/jobb-badrum.jpg`, alt: 'Gästtoalett med gröna väggar och rund spegel', txt: 'Gästtoalett i grönt' },
      { src: `${M}/jobb-maskering.jpg`, alt: 'Rum under målning, golvet täckt och fönstren maskerade', txt: 'Noggrann maskering först' },
    ],
  },

  varfor: {
    eyebrow: 'Varför Swedcro',
    rubrik: ['Hederligt hantverk,', 'rena ytor'],
    lead: 'Det som skiljer en fasad som håller från en som spricker om tre vintrar är förarbetet och sockeln. Det är där vi lägger tiden.',
    punkter: [
      { rubrik: 'Vi kommer hem till dig', text: 'Från första besiktning till sista penseldrag. Hembesöket kostar ingenting.' },
      { rubrik: 'Tydliga offerter', text: 'F-skatt och försäkrade. Du ser vad som ingår och vad det kostar, utan dolda tillägg.' },
      { rubrik: 'Betala när du är nöjd', text: 'Vi går igenom resultatet tillsammans. Du betalar när du är 100 procent nöjd.' },
      { rubrik: 'Ärliga råd', text: 'Räcker det att måla om sockeln säger vi det, även när en hel fasad hade gett oss mer betalt.' },
    ],
    video: `${M}/video-varfor-huset.mp4`,
    poster: `${M}/poster-varfor.jpg`,
    videoAlt: 'Långsam inzoomning mot ett nymålat vitt tvåplanshus i sol. Filmen slutar med Swedcros logotyp.',
  },

  om: {
    eyebrow: 'Om Swedcro',
    rubrik: ['Målare i Eskilstuna med', 'över 15 år i yrket'],
    kortRad: 'Eskilstuna',
    stycken: [
      'Swedcro Måleri & Fasad är en målerifirma i Eskilstuna. Vi arbetar med måleri, fasad, renovering och tapetsering, och har över 15 års erfarenhet av yrket.',
      'Vi kommer hem till dig och tar hand om hela projektet. Du har en kontakt hela vägen, en offert som går att läsa, och du betalar först när du är nöjd.',
    ],
    bevis: [
      { ord: '15+ år', text: 'erfarenhet av måleri och fasad' },
      { ord: 'F-skatt', text: 'och försäkrade' },
      { ord: '24 timmar', text: 'så snabbt svarar vi oftast' },
    ],
  },

  steg: {
    eyebrow: 'Så går det till',
    rubrik: ['Fem steg, och du betalar', 'i det sista'],
    lead: 'Från idé till färdigt resultat. Så här enkelt är det.',
    lista: [
      { namn: 'Ring eller skriv', text: 'Berätta vad som ska göras. Vi svarar oftast inom 24 timmar.' },
      { namn: 'Hembesök', text: 'Vi kommer hem till dig, mäter och tittar på skicket. Besöket kostar ingenting.' },
      { namn: 'Tydlig offert', text: 'Vad som ingår, vad det kostar och när vi kan börja. Inga dolda tillägg.' },
      { namn: 'Vi utför arbetet', text: 'Rätt material och noggrant förarbete. Vi håller dig uppdaterad under vägen.' },
      { namn: 'Godkännande', text: 'Vi går igenom resultatet tillsammans. Du betalar när du är nöjd.' },
    ],
  },

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Vad kunderna', 'säger'],
    betyg: { varde: '5,0', text: '2 recensioner på Google' },
    lista: [
      { namn: 'Stina Bergqvist', kalla: 'Recension på Google', google: true, text: 'Målade om hela vårat radhus invändigt. Vi är otroligt nöjda med arbetet! Måleriet är utfört med hög kvalitet och resultatet blev över förväntan.' },
      { namn: 'Ivan Lukic', kalla: 'Recension på Google', google: true, text: 'De spacklade väggarna efter tapetborttagning och målade hela bostaden med ett mycket professionellt resultat. Vi kan varmt rekommendera företaget till alla som söker en pålitlig och skicklig målare.' },
      { namn: 'Yohanna', kalla: 'Eskilstuna · från swedcro.se', text: 'Jag är supernöjd med både arbetet och bemötandet! Fasaden blev jättefin och allt gick smidigt från början till slut. Mycket trevlig och professionell.' },
    ],
    not: 'Två från Google, ett från swedcro.se, som de står där. Kortade utan att ändra innebörd.',
    lank: { href: 'https://maps.google.com/?cid=17759085738304940273', txt: 'Se alla på Google' },
  },

  instagram: {
    eyebrow: 'Instagram',
    rubrik: ['Följ jobben', 'i vardagen'],
    lead: 'Det senaste från vårt konto, direkt från Instagram.',
    bio: 'Måleri och fasad · Eskilstuna',
    koder: ['DdZi_CwxfmS', 'DcAfF6zDKUl', 'Dcss0IXogAa'],
  },

  fragor: {
    eyebrow: 'Vanliga frågor',
    rubrik: ['Det ni brukar', 'fråga först'],
    lead: 'Pengar och risk först, det praktiska sedan.',
    kort: { rubrik: 'Hittar du inte svaret?', text: 'Ring och fråga rakt ut. Vi säger vad som gäller just ditt hus.' },
    lista: [
      { q: 'Vad kostar det?', a: 'Det beror på ytan, skicket och vad som ska göras. Därför börjar vi med ett hembesök och en offert, båda utan kostnad. Offerten har inga dolda tillägg.' },
      { q: 'Hur går det till?', a: 'Ring eller skriv. Vi kommer hem till dig, mäter och lyssnar, och skickar en tydlig offert. Godkänner du den bokar vi start, gör jobbet, och går igenom resultatet tillsammans innan du betalar.' },
      { q: 'Vad är mosaik och sockelputs?', a: 'En tålig puts av färgad sten som läggs på husets sockel. Den skyddar grunden mot fukt, smuts och stötar, är underhållsfri och ger en ren, rak kant mot fasaden.' },
      { q: 'Vad ingår i en akrylfasad?', a: 'Tilläggsisolering med obrännbara skivor från Rockwool och en flexibel, väderbeständig akrylputs i valfri kulör. Huset blir både varmare och snyggare.' },
      { q: 'Är ni försäkrade?', a: 'Ja. Vi har F-skatt och är försäkrade. Det står också i offerten.' },
      { q: 'Kan jag använda ROT-avdrag?', a: 'Arbete i din bostad ger ofta rätt till ROT. Vi säger vad som gäller ditt jobb när vi har sett det.' },
      { q: 'Gör ni tapetsering också?', a: 'Ja, med raka skarvar och mönsterpassning. Vi tar bort den gamla tapeten och förbereder väggen först, annars syns varje ojämnhet genom den nya.' },
      { q: 'Var arbetar ni?', a: 'Eskilstuna med omnejd. Vi har kunder i Västerås också. Ligger jobbet längre bort får du säga var, så säger vi om vi kan ta det.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Boka ett hembesök,', 'det kostar ingenting'],
    lead: 'Ring, eller skriv några rader. Vi kommer hem till dig, tittar på jobbet och lämnar en tydlig offert.',
    checkar: ['Kostnadsfritt hembesök och offert', 'Svar oftast inom 24 timmar', 'Du betalar när du är 100 % nöjd'],
    video: `${M}/video-kontakt-huset.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta kort om jobbet',
    placeholder: 'Vad som ska göras, var huset står, ungefärlig yta, och när ni vill ha det klart',
    formNot: 'Skriv kort om jobbet, då kan vi ge ett vettigt svar redan i första samtalet. Inga massutskick, ingen säljlista.',
  },

  popup: {
    rubrik: 'Fasaden före vintern?',
    text: 'Hembesöket kostar ingenting. Du får höra vad putsen och sockeln tål, och vad det kostar, innan du bestämmer något.',
  },

  footer: {
    text: 'Måleri, fasad, renovering och tapetsering i Eskilstuna med omnejd. Hederligt hantverk, rena ytor och tydliga offerter.',
  },

  modal: {
    rubrik: 'Så här kan Swedcro se ut på nätet',
    text: 'Det här är ett kostnadsfritt förslag, byggt på det ni själva visar på swedcro.se och Instagram, med era egna projektfoton. Ingen beställning, inget åtagande. Vill ni se den skarpt med ett formulär som landar i inkorgen? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.',
  },
};

export default function SwedcroDemo() {
  return <DemoSida data={data} />;
}
