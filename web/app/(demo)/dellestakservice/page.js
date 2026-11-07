import DemoSida from '../_mall/DemoSida';

/* ===========================================================================
   DELLES TAKSERVICE — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: instagram.com/delles.takservice · Motala, Östergötland · HAR hemsida
   (dellestakservice.se, en sida). Ägaren i DM: "Jag har en hemsida med den är
   ganska trött gjort. Va skulle det kosta?" Byggd 2026-10-23 på demomallen v3
   (kanon: swedcro).

   Bärande idé: ett slitet tak behöver inte bytas. Tvättat, behandlat och
   målat håller det längre, och färgen fäster bara på ett rent tak, därför
   tvättar de alltid först (deras egna ord: "Två tjänster, ett mål. Ett tak
   som håller längre", "Vi tvättar alltid taket först"). Filmen i Varför
   visar deras eget plåttak i Linköping mitt i målningen.

   VERIFIERAT (2026-10-23):
   - dellestakservice.se (hela sidan, inga undersidor; JSON-LD RoofingContractor):
     namn "Delles Takservice" · tel 070-685 22 52 · delles.takservice@outlook.com ·
     område "Motala, Östergötland" (postnr 591 73 Motala i JSON-LD, ingen gata) ·
     tjänster: taktvätt, takmålning (sprutmålning, främst plåttak, även
     garagetak, plåtdetaljer, skorstenar, tegel och betong när det passar),
     fasad (tvätt och målning), garage, stenplattor, plåtdetaljer ·
     "Kostnadsfri takbesiktning" före offert · "Hjälp med ROT-avdrag", "Vi
     sköter hela ansökan åt dig" · "Svanenmärkt takfärg" (100 % akrylat,
     "utvecklad för nordiskt klimat") · "Beprövade, skonsamma metoder" · "Vi
     tvättar alltid taket först" · processen rengöring → anti-algbehandling →
     grundmålning → slutmålning · stegen kontakt → gratis besiktning & offert →
     tid → arbete → klart · "Skicka gärna med bilder på taket" · "Tydlig offert
     – utan förpliktelser" · taktvätt och takmålning går att beställa var för
     sig · foton på sajten: hero, arbete-1/2/5/6/7/8, takmalning (plåttak i
     Östergötland enligt sajten, hero med Linköpings domkyrka), logo.png (alfa).
     taktvatt.png (kyrktak under tvätt, skylift) ligger på deras server men
     visas inte på sidan just nu.
   - Instagram @delles.takservice (skärmdump Mathias + embed): Delles
     Takservice, 13 inlägg, 150 följare, bio "Taktvätt • Takmålning •
     Fasadtvätt", "Östergötland", "Gratis offert & prisgaranti". Inlägg:
     DcG6rJTjJAT "Målning av tak i Åtvidaberg", DbbUY3zjDyg "Målning av kupor",
     Dan79kaDFTX "Målning av kupor i Åtvidaberg", DcB52SrMyeI "Målning i
     Motala", DbyVY8LjOCI "Invändigt målning i Linköping" (köket — deras eget
     jobb, men invändig målning står inte på sajten och lämnas utanför).
   - Alla stillbilder är deras egna (sajten + Instagram-embed).

   INTE verifierat, och finns därför inte på sidan: org.nr och bolagsform
   (ingen träff på allabolag/merinfo på namnet — troligen enskild firma i
   ägarens namn), Google-profil och omdömen (inga hittade → exempelkort),
   priser (inga på sajten; flyern på Instagram med "8 950 kr" och "30 %
   rabatt" är en kampanj som inte står på sajten), prisgarantins villkor
   (står i bion men utan villkor → används inte), ägarens efternamn, antal
   jobb, årtal. Sajtens "upp till 25 år längre livslängd" och "upp till 70 %
   billigare än takbyte" är deras egna påståenden utan källa och lämnas
   utanför.

   FLAGGOR: formuläret går till mathias@bahkobyra.se (demonyckeln). Hero-filmen
   är en GENERERAD illustration (Qwen A → Qwen B → Wan 3.0 Prime 720p, 5 s +
   1,5 s stillbild), inte deras tak. Varför- och kontaktfilmen = deras eget
   foto (hero.png) i långsam rörelse, ffmpeg, 0 kr. Logotypen är deras
   logo.png (redan friställd), beskuren och uppskalad 2x; ljus variant gjord
   lokalt (svart → vitt, grönt → #8BD67A). Porträttet "delle-portatt.png" på
   sajten ser AI-sammansatt ut och används inte.
   =========================================================================== */

export const metadata = {
  title: 'Delles Takservice — taktvätt och takmålning i Motala och Östergötland',
  description:
    'Taktvätt, takmålning och fasadtvätt i Motala och Östergötland. Kostnadsfri takbesiktning, Svanenmärkt takfärg och hjälp med ROT-avdraget. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

const M = '/dellestakservice/media';

const data = {
  namn: 'Delles Takservice',
  tema: {
    mork: '#0B1A0C',
    accent: '#2F7A26',
    accentHover: '#24601D',
    accentText: '#24601D',
    accentLjus: '#8BD67A',
    paAccent: '#fff',
  },
  logo: { src: `${M}/logo-delles.png`, w: 1044, h: 614, alt: 'Delles Takservice', topp: 'vit', ljus: `${M}/logo-delles-ljus.png` },
  kontakt: {
    tel: '070-685 22 52',
    telHref: 'tel:+46706852252',
    epost: 'delles.takservice@outlook.com',
    adress: 'Motala, Östergötland',
    ig: 'https://www.instagram.com/delles.takservice/',
    igHandle: '@delles.takservice',
  },
  cta: { txt: 'Boka gratis takbesiktning', kort: 'Boka besiktning', lank: 'Boka besiktning' },
  nav: {
    vanster: [{ href: '#tjanster', txt: 'Tjänster' }, { href: '#jobb', txt: 'Våra jobb' }],
    hoger: [{ href: '#om', txt: 'Om oss' }, { href: '#omdomen', txt: 'Omdömen' }],
  },

  hero: {
    ort: 'Östergötland',
    tjanster: ['Taktvätt', 'Takmålning'],
    video: `${M}/video-hero.mp4`,
    videoMobil: `${M}/video-hero-mobil.mp4`,
    poster: `${M}/poster-hero.jpg`,
    posterMobil: `${M}/poster-hero-mobil.jpg`,
  },
  tejp: ['Taktvätt', 'Takmålning', 'Fasadtvätt', 'Plåttak', 'Kupor', 'Motala', 'Linköping', 'Åtvidaberg'],

  tjanster: {
    eyebrow: 'Vad vi gör',
    rubrik: ['Från nocken', 'till stenplattorna'],
    lead: 'Taktvätt skyddar taket här och nu, takmålning ger det nya år. Ofta hänger de ihop, men du kan lika gärna beställa dem var för sig. Fasaden, garaget och plåtdetaljerna tar vi också.',
    kort: [
      { id: 'taktvatt', namn: 'Taktvätt', bild: `${M}/tjanst-taktvatt.jpg`, alt: 'Kyrktak under tvätt från skylift, ena halvan ren och mörk, andra halvan grå av lavar', text: 'Högtryckstvätt som tar bort mossa, alger, lavar och smuts, anpassad efter takets material och skick. Som egen tjänst, och alltid som första steg före en målning.', punkter: ['Mossa, alger och lavar bort', 'Minskar risken för fukt', 'Anti-algbehandling efteråt'], ritning: (<><path d="M20 100L100 40l80 60" /><path d="M20 100h160" /><path d="M150 14l-26 30M164 22l-26 30M136 10l-22 26" /></>) },
      { id: 'takmalning', namn: 'Takmålning', bild: `${M}/tjanst-takmalning.jpg`, alt: 'Nymålat rostrött falsat plåttak med skarpa skarvar mot klarblå himmel', text: 'Sprutmålning med Svanenmärkt takfärg, främst på plåttak och garagetak, men även tegel och betong när det passar. Grundfärg först, sedan ett tjockt slutlager.', punkter: ['Plåttak och garagetak', 'Grund- och slutmålning', 'Svanenmärkt takfärg'], ritning: (<><path d="M20 100L100 30l80 70" /><path d="M20 100h160" /><path d="M60 65v35M80 48v52M100 30v70M120 48v52M140 65v35" /></>) },
      { id: 'fasad', namn: 'Fasad och garage', bild: `${M}/tjanst-fasad.jpg`, alt: 'Radhus i Motala med ljus träfasad, vit balkong och vitt staket', text: 'Tvätt och målning av fasader, garage, garageportar och mindre byggnader, så att hela huset ser fräschare och mer välskött ut.', punkter: ['Fasadtvätt', 'Fasadmålning', 'Garage och garageportar'], ritning: (<><path d="M30 104V48l70-30 70 30v56" /><path d="M30 104h140" /><path d="M54 62h24v22H54zM122 62h24v22h-24z" /><path d="M88 104V76h24v28" /></>) },
      { id: 'detaljer', namn: 'Kupor och plåtdetaljer', bild: `${M}/tjanst-kupor.jpg`, alt: 'Takkupa med nymålad röd plåt på ett rött tegeltak', text: 'Målning av kupor, plåtdetaljer, skorstenar och andra slitna utvändiga ytor. Tvätt av stenplattor, gångar och uppfarter också.', punkter: ['Kupor och skorstenar', 'Plåtdetaljer', 'Tvätt av stenplattor'], ritning: (<><path d="M14 104L100 34l86 70" /><path d="M76 72V56l24-18 24 18v16" /><path d="M86 72V60h28v12" /><path d="M14 104h172" /></>) },
    ],
  },

  jobb: {
    eyebrow: 'Våra jobb',
    rubrik: ['Tak vi har gett', 'nya år'],
    lead: 'Plåttak, kupor och tegeltak i Östergötland, fotograferade av oss på plats.',
    not: 'Alla bilder är från våra egna jobb.',
    tid: '75s',
    rad1: [
      { src: `${M}/jobb-svart-platak-gronska.jpg`, alt: 'Färdigställt svart falsat plåttak omgivet av grönska', txt: 'Svart plåttak, klart' },
      { src: `${M}/jobb-atvidaberg-fore.jpg`, alt: 'Slitet plåttak med flagnande färg och rostfläckar före arbetet i Åtvidaberg', txt: 'Plåttaket före, Åtvidaberg' },
      { src: `${M}/jobb-atvidaberg-efter.jpg`, alt: 'Samma plåttak i Åtvidaberg nymålat i mörkgrått, med flerbostadshus runt omkring', txt: 'Och efter målningen' },
      { src: `${M}/jobb-silvergratt-platak.jpg`, alt: 'Färdigställt silvergrått falsat plåttak sett ovanifrån', txt: 'Silvergrått plåttak' },
      { src: `${M}/jobb-platak-stadsmiljo.jpg`, alt: 'Mörkt plåttak på en byggnad i stadsmiljö med flerbostadshus i bakgrunden', txt: 'Plåttak i stadsmiljö' },
      { src: `${M}/jobb-morkgratt-takfonster.jpg`, alt: 'Mörkgrått falsat plåttak med takfönster', txt: 'Mörkgrått, med takfönster' },
      { src: `${M}/jobb-valmat-platak-villa.jpg`, alt: 'Mörkgrått falsat plåttak med vinklar och valmning på en villa', txt: 'Valmat plåttak på villa' },
    ],
    rad2: [
      { src: `${M}/jobb-sprutmalning-grundfarg.jpg`, alt: 'Hantverkare i sele sprutmålar ett stort plåttak, halva taket grundmålat i grått', txt: 'Sprutmålning pågår' },
      { src: `${M}/jobb-kupor-tegelhus.jpg`, alt: 'Tegelhus med rad av nymålade svarta takkupor', txt: 'Kupor i Åtvidaberg' },
      { src: `${M}/jobb-svart-kupa.jpg`, alt: 'Svart målad takkupa på ett rött tegeltak', txt: 'Kupan, nymålad' },
      { src: `${M}/jobb-rod-kupa-narbild.jpg`, alt: 'Närbild på takkupa med nymålad röd plåt mot tegelpannor', txt: 'Röd plåt runt kupan' },
      { src: `${M}/jobb-roda-kupor-tegeltak.jpg`, alt: 'Rött tegeltak med nymålad röd takkupa och skorsten', txt: 'Kupa i takets färg' },
      { src: `${M}/jobb-atvidaberg-pagaende.jpg`, alt: 'Plåttak under arbete med slangar och utrustning på taket', txt: 'Mitt i jobbet' },
    ],
  },

  varfor: {
    eyebrow: 'Varför Delles',
    rubrik: ['Ett tak som', 'håller längre'],
    lead: 'Ett slitet tak behöver inte alltid bytas. Tvättat, behandlat och målat håller det längre, och färgen fäster bara på ett rent tak. Därför tvättar vi alltid först.',
    punkter: [
      { rubrik: 'Gratis takbesiktning', text: 'Varje uppdrag börjar med att vi går igenom taket på plats, innan du får din offert.' },
      { rubrik: 'Alltid tvätt först', text: 'Taket tvättas och algbehandlas noggrant, så att färgen fäster och resultatet håller.' },
      { rubrik: 'Svanenmärkt takfärg', text: 'Vi sprutmålar med Svanenmärkt akrylatfärg, utvecklad för nordiskt klimat.' },
      { rubrik: 'Bara det taket behöver', text: 'Räcker det med en tvätt säger vi det. Taktvätten går att beställa för sig.' },
    ],
    video: `${M}/video-varfor.mp4`,
    poster: `${M}/poster-varfor.jpg`,
    videoAlt: 'Långsam inzoomning mot en hantverkare som sprutmålar ett stort plåttak i Linköping. Filmen slutar med Delles Takservices logotyp.',
  },

  om: {
    eyebrow: 'Om Delles Takservice',
    rubrik: ['Omsorg om varje tak', 'vi tar oss an'],
    kortRad: 'Motala · Östergötland',
    stycken: [
      'Delles Takservice hjälper dig med taktvätt, takmålning och utvändigt underhåll i Motala och Östergötland. Vi arbetar noggrant och metodiskt, håller kontakten tydlig genom hela jobbet och lämnar efter oss ett rent, välgjort resultat.',
      'Vi använder beprövade, skonsamma metoder och Svanenmärkt takfärg, och sköter ROT-ansökan åt dig när arbetet är berättigat. Målet är enkelt: att taket, fasaden eller uteplatsen ska se fräsch och välskött ut.',
    ],
    bevis: [
      { ord: '0 kr', text: 'för takbesiktning och offert' },
      { ord: 'ROT', text: 'vi sköter hela ansökan' },
      { ord: 'Svanen', text: 'märkt takfärg' },
    ],
  },

  steg: {
    eyebrow: 'Så går det till',
    rubrik: ['Från kontakt', 'till klart tak'],
    lead: 'Du vet vad som ska göras och vad det kostar innan vi börjar.',
    lista: [
      { namn: 'Du kontaktar oss', text: 'Ring eller skriv. Skicka gärna med bilder på taket, så får vi en första bild.', ikon: 'kontakt' },
      { namn: 'Besiktning & offert', text: 'Vi går igenom taket på plats och lämnar ett tydligt pris, utan kostnad.', ikon: 'besok' },
      { namn: 'Vi bokar en tid', text: 'En tid som passar dig och säsongen.', ikon: 'plan' },
      { namn: 'Vi utför arbetet', text: 'Vi tvättar, behandlar och målar taket noggrant.', ikon: 'arbete' },
      { namn: 'Klart resultat', text: 'Ett renare, snyggare och mer välskött tak.', ikon: 'klart' },
    ],
  },

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Vad kunderna', 'säger'],
    lista: [
      { namn: 'Villaägare', kalla: 'Taktvätt och takmålning', exempel: true, text: 'Här står ett riktigt omdöme från en kund, med namn och ort som de själva skrivit det.' },
      { namn: 'Husägare', kalla: 'Plåttak', exempel: true, text: 'Ett andra kort, hämtat ur er Google-profil när den är på plats.' },
      { namn: 'Fastighetsägare', kalla: 'Fasadtvätt', exempel: true, text: 'Ett tredje kort. Tre riktiga omdömen räcker för att sidan ska kännas sann.' },
    ],
    not: 'Exempel — byts mot era riktiga omdömen.',
  },

  instagram: {
    eyebrow: 'Instagram',
    rubrik: ['Följ jobben', 'från taket'],
    lead: 'Det senaste från vårt konto, direkt från Instagram.',
    bio: 'Taktvätt • Takmålning • Fasadtvätt · Östergötland',
    koder: ['DcG6rJTjJAT', 'DbbUY3zjDyg', 'DcB52SrMyeI'],
  },

  fragor: {
    eyebrow: 'Vanliga frågor',
    rubrik: ['Det ni brukar', 'fråga först'],
    lead: 'Pengar och risk först, det praktiska sedan.',
    kort: { rubrik: 'Hittar du inte svaret?', text: 'Ring och fråga. Vi säger vad som gäller just ditt tak.' },
    lista: [
      { q: 'Vad kostar det?', a: 'Det beror på takets storlek, material och skick. Därför börjar vi med en kostnadsfri takbesiktning, och sedan får du en tydlig offert utan förpliktelser. Skicka gärna bilder på taket redan i första kontakten.' },
      { q: 'Kan jag använda ROT-avdrag?', a: 'När arbetet är berättigat till ROT sköter vi hela ansökan åt dig. Av offerten framgår vad avdraget gäller, och du betalar bara din del. Avdraget gäller normalt arbetskostnaden, inte material.' },
      { q: 'Måste taket bytas?', a: 'Inte alltid. Ett tak som tvättas och målas i tid håller längre, och det är ett kostnadseffektivt alternativ till ett helt takbyte. Vi ser över taket och föreslår rätt åtgärd.' },
      { q: 'Kan jag beställa bara taktvätt?', a: 'Ja. Taktvätten är en egen tjänst. Den är också alltid första steget när vi målar, så att färgen fäster och resultatet håller.' },
      { q: 'Vilka tak målar ni?', a: 'Främst plåttak och garagetak, men även plåtdetaljer, kupor och skorstenar, och tegel eller betong när det passar.' },
      { q: 'Hur går en takmålning till?', a: 'Fyra moment: noggrann rengöring, anti-algbehandling som dödar algernas rotstruktur, ett grundlager av akrylat som förseglar ytan, och ett tjockt slutlager av Svanenmärkt akrylatfärg.' },
      { q: 'Var arbetar ni?', a: 'Vi utgår från Motala och tar jobb i Östergötland, bland annat i Linköping och Åtvidaberg. Ligger huset längre bort får du säga var, så säger vi om vi kan ta det.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Boka en takbesiktning,', 'det kostar ingenting'],
    lead: 'Berätta kort om ditt tak, så bokar vi en kostnadsfri takbesiktning och återkommer med en tydlig offert.',
    checkar: ['Kostnadsfri takbesiktning', 'Tydlig offert, utan förpliktelser', 'Vi hjälper dig med ROT-avdraget'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta kort om taket',
    placeholder: 'Adress eller ort, typ av tak (plåt, tegel, betong), ungefärlig storlek och vad du vill ha gjort',
    formNot: 'Har du bilder på taket kan du skicka dem när vi hörs, det ger ett mer exakt pris. Inga massutskick, ingen säljlista.',
  },

  popup: {
    rubrik: 'Mossa på taket?',
    text: 'Takbesiktningen kostar ingenting. Du får veta vad taket behöver, och vad det kostar, innan du bestämmer något.',
  },

  footer: {
    text: 'Taktvätt, takmålning, fasad, garage och stenplattor i Motala och Östergötland. Kostnadsfri takbesiktning och tydlig offert.',
  },

  modal: {
    rubrik: 'Så här kan Delles Takservice se ut på nätet',
    text: 'Det här är ett kostnadsfritt förslag, byggt på det ni själva visar på dellestakservice.se och Instagram, med era egna jobbfoton. Ingen beställning, inget åtagande. Vill ni se den skarpt med ett formulär som landar i er inkorg? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.',
  },
};

export default function DellesTakserviceDemo() {
  return <DemoSida data={data} />;
}
