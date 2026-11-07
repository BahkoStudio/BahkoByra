import DemoSida from '../_mall/DemoSida';

/* ===========================================================================
   FÖNSTERPROFFSET — kostnadsfritt hemsideförslag från Bahko Byrå (varm lead)
   Lead: fonsterproffset.se + instagram.com/fonsterproffsetnykoping · fönsterbyte
   (svensktillverkade PVC- och trä-alu-fönster, monterat och klart) i Nyköping
   med omnejd. Byggd 2026-10-27 på demomallen v3 (kanon: swedcro, närmast: ckmaleri).

   Kundens problem (DM till Mathias): "Mitt problem är att jag inte får in några
   leads idag på sidan" och "Vill skapa mer lojal trafik till den utifrån
   människor i min närhet som söker fönsterbyte". Förslaget är därför byggt för
   lokala förfrågningar: fönsterbyte i Nyköping, Oxelösund, Flen, Trosa,
   Katrineholm och Stigtomta i rubriker, frågor och schema, och EN handling
   (gratis hembesök) på varje knapp.

   Bärande idé: från hembesök till besiktning hos samma företag, till ett fast
   pris med montage. Det är deras egen process ("Vi gör det enkelt från start
   till mål") och deras eget "Monterat & Klart".

   VERIFIERAT (2026-10-27):
   - fonsterproffset.se (startsidan, enda sidan utöver /tack/): namnet
     Fönsterproffset, telefon +46 705 251 918, "Boka gratis hembesök!",
     "svensktillverkade fönster med hög kvalitet och oslagbara priser",
     "svensktillverkade PVC och träfönster i måttanpassade storlekar och stilar",
     "Ett klassiskt hantverk … Varje fönster måttanpassas", "Monterat & Klart",
     "Vi svarar vanligen inom 1 arbetsdag", Instagram-länken. Logotypen
     fonsterproffset.se-vit-large.png ("fonsterproffset.se · vi kan fönster").
     Sajtens accentfärg #0C4DA2.
   - Sajtens infografik "Vi gör det enkelt från start till mål": Hembesök,
     Behovsanalys, Mätning ("Vi tar mått på fönster och material till ett fast
     pris på en komplett lösning med montage"), Affär, Projektering, Leverans,
     Montering ("utförda av våra montörer"), Återvinning ("Vi kör allt till
     återvinningsstation"), Besiktning ("slutkontroll på utfört arbete
     tillsammans med er"). Infografik "PVC- eller träfönster?": Trä-alu 3-glas
     U-värde 1,0 (B), PVC 3-glas U-värde 0,83 (A), 115 mm, vridfönster,
     dreh-kipp-beslag.
   - Två omdömen som skärmdumpar på sajten (Isa Smith, Per Damperud, fem
     stjärnor vardera). Plattformen syns inte i bilden: inget samlat betyg, inget
     G-märke. Per Damperuds omdöme är kortat (sista meningen bort).
   - Instagram @fonsterproffsetnykoping (skärmbild från Mathias + embed utan
     inloggning): bio "Vi erbjuder underhållsfria, svensktillverkade
     energifönster byggda efter just er fastighet monterat och klart till lågt
     pris med höga garantier." Orter ur deras egna inlägg: Nyköping, Oxelösund,
     Flen, Trosa, Katrineholm, Stigtomta. "Svart karm är ofta väldigt snyggt!"
   - Register (näringslivsregistret, eniro, bolagsfilter): Fönsterproffsetnyköping
     AB, org.nr 559443-6759, säte Nyköping, registrerat 2023. Årsredovisning 2025:
     "försäljning av specialmåttade, energismarta fönster och dörrar mot
     privatpersoner … inmätning, leverans, montering med snickarpartners och
     besiktning".

   INTE verifierat, och finns därför INTE på sidan: e-post (ingen på sajten),
   gatuadress (registrets adress kan vara privat), öppettider, garantiernas
   längd eller villkor ("höga garantier" står bara som ord), priser, ledtider,
   antal jobb, grundår utöver registret, Google-profil och betyg, Facebook,
   F-skatt (bara eniro), ROT-avdragets storlek (länk till Skatteverket i stället).

   FLAGGOR:
   - Formuläret går till mathias@bahkobyra.se (demonyckeln).
   - ALLA BILDER ÄR DERAS EGNA, inget genererat (0 USD). Jobbfotona är från
     deras Instagram (1080 px), två arkitekturbilder (jobb-villa-glasparti,
     jobb-glasparti-tra) från deras sajt: kan vara tillverkarens bilder, fråga.
     jobb-nytt-fonster är förhandsbilden (497 px) uppskalad.
     PVC-kortets bild är beskuren ur deras egen infografik.
   - Hero-filmen är ett eget IG-foto (montör i en nymonterad dörr) med långsam in- och utzoomning; Varför-filmen ett annat (färdiga vita fönster) med
     långsam inzoomning och övertoning i ffmpeg, ingen genererad rörelse.
   - Mörka logotypen (logo.png) är den vita originalfilen omfärgad till marin,
     inte omritad. Be om originalet i vektor.
   =========================================================================== */

const ORTER = ['Nyköping', 'Oxelösund', 'Flen', 'Trosa', 'Katrineholm', 'Stigtomta'];

export const metadata = {
  title: 'Fönsterbyte i Nyköping — Fönsterproffset · monterat & klart',
  description:
    'Fönsterbyte i Nyköping, Oxelösund, Flen, Trosa och Katrineholm. Svensktillverkade, måttanpassade PVC- och trä-alu-fönster, monterat och klart till fast pris. Boka gratis hembesök.',
  robots: { index: false, follow: false },
};

const M = '/fonsterproffset/media';
const TEL = '070-525 19 18';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: 'Fönsterproffset',
  legalName: 'Fönsterproffsetnyköping AB',
  url: 'https://www.fonsterproffset.se/',
  telephone: '+46705251918',
  logo: 'https://www.fonsterproffset.se/wp-content/uploads/2023/05/fonsterproffset.se-vit-large.png',
  address: { '@type': 'PostalAddress', addressLocality: 'Nyköping', addressCountry: 'SE' },
  areaServed: ORTER.map((o) => ({ '@type': 'City', name: o })),
  sameAs: ['https://www.instagram.com/fonsterproffsetnykoping/'],
  makesOffer: [
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Fönsterbyte, monterat och klart' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Gratis hembesök och inmätning' } },
  ],
};

const data = {
  namn: 'Fönsterproffset',
  // Vita originalet över filmen, marin omfärgning efter skroll. Ingen bricka bakom.
  logo: { src: `${M}/logo.png`, ljus: `${M}/logo-ljus.png`, w: 1394, h: 218, alt: 'Fönsterproffset', topp: 'fri' },
  tema: {
    mork: '#06142B',
    accent: '#0C4DA2',
    accentHover: '#0A3F86',
    accentText: '#0C4DA2',
    accentLjus: '#8AB8FF',
    paAccent: '#fff',
  },
  kontakt: {
    tel: TEL,
    telHref: 'tel:+46705251918',
    adress: 'Nyköping med omnejd',
    ig: 'https://www.instagram.com/fonsterproffsetnykoping/',
    igHandle: '@fonsterproffsetnykoping',
    orgnr: '559443-6759',
  },
  cta: { txt: 'Boka gratis hembesök', kort: 'Boka hembesök', lank: 'Boka gratis hembesök' },
  nav: {
    vanster: [{ href: '#tjanster', txt: 'Fönster' }, { href: '#process', txt: 'Monterat & klart' }],
    hoger: [{ href: '#jobb', txt: 'Våra jobb' }, { href: '#fragor', txt: 'Frågor' }],
  },

  hero: {
    ort: 'Nyköping',
    tjanster: ['Fönsterbyte', 'Montering'],
    video: `${M}/video-hero.mp4`,
    videoMobil: `${M}/video-hero-mobil.mp4`,
    poster: `${M}/poster-hero.jpg`,
    posterMobil: `${M}/poster-hero-mobil.jpg`,
  },
  tejp: ['Fönsterbyte', 'Nyköping', 'PVC 3-glas', 'Oxelösund', 'Trä-alu', 'Flen', 'Monterat & klart', 'Trosa'],

  tjanster: {
    eyebrow: 'Fönsterbyte i Nyköping',
    rubrik: ['Nya fönster,', 'monterade och klara'],
    lead: 'Svensktillverkade fönster i PVC och trä‑alu, måttanpassade efter ditt hus. Vi mäter, levererar och monterar, i Nyköping och runt omkring.',
    kort: [
      {
        id: 'fonsterbyte',
        namn: 'Fönsterbyte',
        bild: `${M}/tjanst-fonsterbyte.jpg`,
        alt: 'Montör sätter in ett nytt vitt fönster inifrån, med röda trähus och höstträd utanför',
        text: 'Vi byter dina gamla fönster mot nya, monterat och klart. De gamla kör vi till återvinningsstation.',
        punkter: ['Montage ingår', 'Gamla fönster tas om hand', 'Måttanpassat efter huset'],
        ritning: (<><path d="M50 15h100v90H50z" /><path d="M100 15v90M50 60h100" /><path d="M20 105h160" /></>),
      },
      {
        id: 'pvc',
        namn: 'PVC-fönster 3-glas',
        bild: `${M}/tjanst-pvc.jpg`,
        alt: 'Genomskärning av ett vitt PVC-fönster med tre glas och U-värde 0,83, ur Fönsterproffsets egen infografik',
        text: 'Underhållsfria fönster med tre glas. Enligt vår egen jämförelse har PVC 3-glas U-värde 0,83, klass A.',
        punkter: ['Underhållsfritt', 'U-värde 0,83 (A)', 'Vridfönster eller dreh-kipp'],
        ritning: (<><path d="M60 15h80v90H60z" /><path d="M75 30h50v60H75z" /><path d="M20 105h160" /></>),
      },
      {
        id: 'tra-alu',
        namn: 'Trä-alu 3-glas',
        bild: `${M}/tjanst-tra-alu.jpg`,
        alt: 'Hörnprofil av ett trä-alu-fönster med tre glas, trä inåt och vit kant',
        text: 'Trä inåt och tre glas. Trä-alu 3-glas har U-värde 1,0, klass B, i vår jämförelse.',
        punkter: ['Trä inomhus', 'U-värde 1,0 (B)', 'Måttanpassat'],
        ritning: (<><path d="M60 15h80v90H60z" /><path d="M60 35h80M60 55h80M60 75h80" /><path d="M20 105h160" /></>),
      },
      {
        id: 'hembesok',
        namn: 'Gratis hembesök',
        bild: `${M}/tjanst-hembesok.jpg`,
        alt: 'Vita altandörrar med spröjs i ett vardagsrum, ut mot en trädäcksaltan',
        text: 'Vi kommer hem till dig, går igenom huset och tar mått. Du får ett fast pris på hela lösningen med montage.',
        punkter: ['Kostar ingenting', 'Mätning på plats', 'Fast pris med montage'],
        ritning: (<><path d="M30 60l70-45 70 45" /><path d="M45 52v53h110V52" /><path d="M85 105V75h30v30" /></>),
      },
    ],
  },

  jobb: {
    eyebrow: 'Våra jobb',
    rubrik: ['Fönsterbyten nära dig,', 'i Nyköping med omnejd'],
    lead: 'Från leveransen på uppfarten till färdiga fönster, som vi visar det på Instagram.',
    not: 'Bilderna kommer från vårt eget Instagram och vår hemsida.',
    tid: '60s',
    rad1: [
      { src: `${M}/jobb-leverans.jpg`, alt: 'Inplastade fönster på pall utanför ett grått trähus', txt: 'Levererat till huset' },
      { src: `${M}/jobb-montage.jpg`, alt: 'Ny vit dörr med glas i en tegelfasad, texten Montage på gång', txt: 'Ny dörr i tegelfasad' },
      { src: `${M}/jobb-vardagsrum.jpg`, alt: 'Svartvit bild av nytt fönster och altandörr i ett vardagsrum', txt: 'Fönster och altandörr' },
      { src: `${M}/jobb-villa-glasparti.jpg`, alt: 'Villa med mörk panel och stort glasparti mot ett upplyst matrum', txt: 'Stora glaspartier' },
    ],
    rad2: [
      { src: `${M}/jobb-svart-karm.jpg`, alt: 'Nytt fönster med svart karm öppet inåt i ett ljust rum', txt: 'Svart karm' },
      { src: `${M}/jobb-leverans-bw.jpg`, alt: 'Svartvit bild av inplastade fönster och dörr utanför ett tegelhus', txt: 'Fönsterbyte på gång' },
      { src: `${M}/jobb-nytt-fonster.jpg`, alt: 'Nytt vitt fönster med ett öppet fönsterparti i ett ljust rum', txt: 'Nytt och ljust' },
      { src: `${M}/jobb-glasparti-tra.jpg`, alt: 'Stort fönsterparti i en träfasad med utsikt mot vatten', txt: 'Fönster efter huset' },
    ],
  },

  varfor: {
    eyebrow: 'Varför Fönsterproffset',
    rubrik: ['Hela vägen,', 'från hembesök till klart'],
    lead: 'Vi gör hela jobbet: hembesök, mätning, leverans, montering och slutkontroll. Du får ett fast pris på en komplett lösning med montage, och slipper samordna någon själv.',
    punkter: [
      { rubrik: 'Gratis hembesök', text: 'Vi tittar på huset och fönstren på plats. Det kostar ingenting.' },
      { rubrik: 'Fast pris, montage ingår', text: 'Vi tar mått på fönster och material och ger ett fast pris på hela lösningen.' },
      { rubrik: 'Rätt fönster för huset', text: 'PVC eller trä-alu: vi går igenom skillnaden med dig, utifrån ditt hus och dina behov.' },
      { rubrik: 'Slutkontroll ihop med dig', text: 'När fönstren sitter går vi igenom jobbet tillsammans, och de gamla fönstren kör vi till återvinningen.' },
    ],
    video: `${M}/video-varfor.mp4`,
    poster: `${M}/poster-varfor.jpg`,
    videoAlt: 'Långsam inzoomning över nya vita fönster och en vit dörr på ett hus med ljusgul panel. Filmen slutar med Fönsterproffsets logotyp.',
  },

  om: {
    eyebrow: 'Om Fönsterproffset',
    rubrik: ['Ett klassiskt hantverk,', 'från Nyköping'],
    kortRad: 'Nyköping med omnejd',
    stycken: [
      'Fönsterproffset säljer och monterar svensktillverkade fönster i PVC och trä‑alu. Vi utgår från Nyköping och byter fönster i bland annat Oxelösund, Flen, Trosa, Katrineholm och Stigtomta.',
      'Att tillverka fönster är ett av de mest klassiska hantverken i Sverige. Varje fönster måttanpassas efter just din fastighet, och vi står för hela vägen: inmätning, leverans, montering och besiktning.',
    ],
    bevis: [
      { ord: 'Svensktillverkat', text: 'måttanpassat efter ditt hus' },
      { ord: 'Fast pris', text: 'på hela lösningen med montage' },
      { ord: '1 arbetsdag', text: 'så snabbt svarar vi vanligen' },
    ],
  },

  steg: {
    eyebrow: 'Monterat & klart',
    rubrik: ['Vi gör det enkelt', 'från start till mål'],
    lead: 'Så går ett fönsterbyte till hos oss, från första samtalet till slutkontrollen.',
    lista: [
      { namn: 'Boka hembesök', ikon: 'kontakt', text: 'Ring eller skicka några rader, så bokar vi ett gratis hembesök.' },
      { namn: 'Översyn och mätning', ikon: 'besok', text: 'På plats gör vi en översyn av huset och tar mått på fönster och material.' },
      { namn: 'Fast pris', ikon: 'offert', text: 'Du får ett fast pris på en komplett lösning med montage.' },
      { namn: 'Leverans', ikon: 'plan', text: 'Allt måttanpassat material levereras till huset.' },
      { namn: 'Montering', ikon: 'arbete', text: 'Våra montörer sätter in fönstren. Det gamla kör vi till återvinningsstation.' },
      { namn: 'Besiktning', ikon: 'klart', text: 'Till sist gör vi en slutkontroll av arbetet tillsammans med dig.' },
    ],
  },

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Vad kunderna', 'säger'],
    lista: [
      { namn: 'Isa Smith', kalla: 'Omdöme på fonsterproffset.se', text: 'Bra information från början. Trevligt bemötande. Svar på frågor, rätt prisinformation. Noggrann installation, rent o snyggt. Mycket snygga fönster över förväntan. Super nöjd.' },
      { namn: 'Per Damperud', kalla: 'Omdöme på fonsterproffset.se', text: 'Trevligt bemötande. Bra pris. Snygga o fina fönster och riktigt bra hantverkare som satte dit fönsterna. Snyggt och noggrannt.' },
    ],
    not: 'Omdömena är hämtade från vår hemsida.',
  },

  instagram: {
    eyebrow: 'Instagram',
    rubrik: ['Följ fönsterbytena', 'på Instagram'],
    lead: 'Montage, leveranser och färdiga fönster i Nyköping med omnejd, direkt från vårt konto.',
    bio: 'Underhållsfria, svensktillverkade energifönster byggda efter just er fastighet. Monterat och klart.',
    koder: ['De4G-Nqt_F9', 'DexGLsGN4gc', 'Dema4K0NQ7K'],
  },

  fragor: {
    eyebrow: 'Vanliga frågor',
    rubrik: ['Det du kanske', 'undrar först'],
    lead: 'Pengar och risk först, det praktiska sedan.',
    kort: { rubrik: 'Hittar du inte svaret?', text: 'Ring oss, eller skicka några rader. Vi svarar vanligen inom en arbetsdag.' },
    lista: [
      { q: 'Vad kostar ett fönsterbyte?', a: 'Det beror på hur många fönster det är, storlekarna och om du väljer PVC eller trä-alu. Efter hembesöket får du ett fast pris på hela lösningen, montage inräknat.' },
      { q: 'Kostar hembesöket något?', a: 'Nej, hembesöket är gratis.' },
      { q: 'Var byter ni fönster?', a: 'Vi utgår från Nyköping och jobbar i närområdet, till exempel Oxelösund, Flen, Trosa, Katrineholm och Stigtomta. Bor du en bit utanför: hör av dig ändå.' },
      { q: 'PVC eller trä-alu, vad ska jag välja?', a: 'Båda har tre glas. I vår jämförelse har PVC 3-glas U-värde 0,83 (klass A) och trä-alu 3-glas U-värde 1,0 (klass B). Ju lägre U-värde, desto bättre isolerar fönstret. Vi går igenom valet med dig på hembesöket.' },
      { q: 'Ingår monteringen?', a: 'Ja. Vi levererar och monterar, monterat och klart, och avslutar med en slutkontroll tillsammans med dig.' },
      { q: 'Vad händer med de gamla fönstren?', a: 'Vi kör dem till återvinningsstation.' },
      { q: 'Kan jag använda ROT-avdrag?', a: (<>Arbetskostnaden för ett fönsterbyte i din bostad ger ofta rätt till ROT-avdrag. Reglerna står hos <a href="https://www.skatteverket.se/privat/fastigheterochbostad/rotarbeteochrutarbete.4.2e56d4ba1202f95012080002966.html" target="_blank" rel="noopener">Skatteverket</a>.</>) },
      { q: 'Är fönstren måttanpassade?', a: 'Ja. Fönstren är svensktillverkade och varje fönster måttanpassas efter din fastighet.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Boka ett', 'gratis hembesök'],
    lead: 'Skriv var huset ligger och ungefär hur många fönster det gäller, eller ring. Vi svarar vanligen inom en arbetsdag.',
    checkar: ['Gratis hembesök i Nyköping med omnejd', 'Fast pris med montage', 'Svensktillverkade, måttanpassade fönster'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta kort om fönstren',
    placeholder: 'Ort (t.ex. Nyköping, Oxelösund), ungefär hur många fönster, och om du funderar på PVC eller trä-alu',
    typer: ['Gratis hembesök', 'Pris på fönsterbyte', 'PVC eller trä-alu?'],
    meddelandeEtikett: 'Ort och fönster',
    formNot: 'Vi svarar vanligen inom en arbetsdag. Inga massutskick, ingen säljlista.',
    formNotBock: true,
  },

  popup: {
    rubrik: 'Byta fönster i Nyköping?',
    text: 'Boka ett gratis hembesök, så får du ett fast pris med montage.',
  },

  footer: {
    text: 'Fönsterbyte i Nyköping, Oxelösund, Flen, Trosa och Katrineholm. Svensktillverkade, måttanpassade fönster i PVC och trä-alu, monterat och klart.',
  },

  modal: {
    rubrik: 'Så här kan Fönsterproffset se ut på nätet',
    text: 'Det här är ett kostnadsfritt förslag, byggt för att fler i Nyköping med omnejd som söker fönsterbyte ska höra av sig. Texterna och bilderna är era egna, från hemsidan och Instagram. Formuläret landar ännu inte i er inkorg. Vill ni se den skarpt? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.',
  },
};

export default function FonsterproffsetDemo() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <DemoSida data={data} />
    </>
  );
}
