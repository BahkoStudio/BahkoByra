import DemoSida from '../../_mall/DemoSida';
import { M, DOMAN, tema, logo, kontakt, cta, formular, bokning, kundtyp, formNot, epostNamn, SIDOR, footerTjanster, footerBild, footerLankar, footerOrter, menyExtra, hero, varfor, om, steg, instagramBas, RECO, RECO_IFRAME, RECO_LISTA, SKV_ROT, samarbeten, GOOGLE_BETYG, GOOGLE_OMDOMEN, skapadAv } from '../_gd';

/* ===========================================================================
   GD MÅLERI STHLM AB — guidesida "Så väljer du målare" (/gdmaleri/basta-malare-stockholm/),
   2026-10-14. Mathias: "se till att han rankar för: den bästa målare expert i stockholm".
   Search Console (90 dagar): "måleri stockholm" 1 037 visningar, plats 20,8; "målerifirma
   stockholm" 360, plats 37; "målare stockholm" 135, plats 45; "bästa målare stockholm" 33,
   plats 30. Den exakta frasen har ingen volym; sidan svarar på avsikten bakom "bästa målare
   stockholm": hur man väljer. Slug på gdmaleri.se: /basta-malare-stockholm/ (ny).

   MARKNADSFÖRINGSLAGEN: sidan påstår ALDRIG att GD är bäst. H1 är en fråga plus ett löfte att
   hjälpa läsaren välja; varje kriterium har en kontroll läsaren kan göra själv och GD:s belägg.

   VERIFIERAT, utöver huvudsidans VERIFIERAT-block och _gd.js:
   Reco 4,9 av 5, 46 omdömen (RECO_IFRAME, kontrollerat 2026-10-14), Rekommenderat företag
   2024, 2025 och 2026 (Recos märken på profilen). Google 4,8 av 5, 19 recensioner (GOOGLE_BETYG).
   Recos egen sida reco.se/foretag/rekommenderat-foretag (hämtad 2026-10-14): "minst 10 omdömen
   från dina kunder, från det aktuella kalenderåret", "snittbetyg på minst 4,0 av 5,0", "Ett
   Rekommenderat företag har uppnått volym- och betygskraven på Reco"; "Verifierat företag" =
   omdömen via integrerat affärssystem (RECO_WIDGET.not i _gd.js säger samma sak).
   gdmaleri.se FAQ (leadfilen, Löften): F-skatt, fullt försäkrade via Trygg-Hansa, kostnadsfri
   offert med material, förarbete, städning och bortforsling, inga extraarbeten utan godkännande,
   faktura efter slutfört arbete (över 500 kvm: 50 % av arbetskostnaden vid halva jobbet), ROT på
   fakturan, Flügger, 1 års garanti på måleriarbetet. Förarbetet själva: Om oss i _gd.js.
   Skatteverket (SKV_ROT, live 2026-10-13 enligt leadfilen): 30 % av arbetskostnaden, högst
   50 000 kr per person och år, äga bostaden, material ger inget avdrag, bostadsrätt bara inne i
   lägenheten, föreningens gemensamma ytor inget avdrag.
   Jobb: Bromma fasad 234 kvm (IG Dd-zVd3ggOI), Täby kyrkby fasad 350 kvm (IG Dc1IM7Pgpeh),
   Södertälje tak och väggar 180 kvm (IG DeNI1zEkcpW), fasader i Handen 2025 och på Värmdö 2026
   (leadfilen), rum i Nacka och Tyresö (leadfilens ortlista, tapetsering/page.js).
   Google-citaten ordagrant ur GOOGLE_OMDOMEN (Therese G, Jenny E, Viktor E).

   INTE verifierat, och finns därför inte på sidan: "ansvarsförsäkring" (gdmaleri.se säger bara
   "fullt försäkrade via Trygg-Hansa", leadfilen), ytor för Nacka och Tyresö (uppdraget nämnde
   200 och 180 kvm, de står inte i leadfilen eller _gd.js), priser, ledtider, antal jobb,
   Måleriföretagen och AAA. Inga påståenden om konkurrenter.
   OPTIMERING: egen titel och beskrivning, JSON-LD WebPage med about → HousePainter
   (@id gdmaleri.se/#business), inget betygsschema, inget FAQPage. Raden robots: index:false byts
   av extern/gdmaleri/kopiera.mjs mot canonical gdmaleri.se/basta-malare-stockholm/.
   Internlänkar hit: footerns bottenrad på alla GD-sidor (GUIDE i _gd.js) och ett stycke i
   startsidans Om oss. Inte i mobilmenyn. Mallfält som bara den här sidan använder:
   hero.rubrik (h1 = texten, logotypen som <p>) och kontaktSektion.typer.
   =========================================================================== */

export const metadata = {
  title: 'Bästa målaren i Stockholm? Så väljer du rätt | GD Måleri',
  description:
    'Så väljer du rätt målare i Stockholm: jämför verifierade omdömen, F-skatt, försäkring och vad offerten ska innehålla. Checklista från GD Måleri Sthlm AB.',
  robots: { index: false, follow: false },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Bästa målaren i Stockholm? Så väljer du rätt målerifirma',
  description: 'Sex punkter att jämföra innan du anlitar en målare i Stockholm: verifierade omdömen, F-skatt och försäkring, offertens innehåll, betalning och ROT, förarbete och garanti, och belagda jobb.',
  url: `${DOMAN}/basta-malare-stockholm/`,
  inLanguage: 'sv-SE',
  dateModified: '2026-10-14',
  about: { '@type': 'HousePainter', '@id': `${DOMAN}/#business`, name: 'GD Måleri Sthlm AB', url: `${DOMAN}/` },
  publisher: { '@id': `${DOMAN}/#business` },
};

const ny = { target: '_blank', rel: 'noopener' };

const data = {
  namn: 'GD Måleri Sthlm AB',
  tema,
  logo,
  kontakt,
  cta,
  formular,
  bokning,
  nav: {
    vanster: [{ href: '#tjanster', txt: 'Checklista' }, { href: '#jobb', txt: 'Våra jobb' }],
    hoger: [{ href: '#omdomen', txt: 'Omdömen' }, { href: '/gdmaleri/', txt: 'Startsida' }],
    extra: menyExtra(),
  },

  hero: { ...hero, rubrik: { fraga: 'Bästa målaren i Stockholm?', svar: 'Så väljer du rätt målerifirma.' } },
  tejp: ['Så väljer du målare', 'Verifierade omdömen', 'F-skatt och försäkring', 'Allt med i offerten', 'Ingen förskottsbetalning', 'ROT direkt på fakturan', 'Ett års garanti', '4,9 av 5 på Reco'],

  tjanster: {
    eyebrow: 'Checklista',
    rubrik: ['Sex saker att jämföra', 'innan du anlitar en målare'],
    lead: 'Det finns ingen officiell lista över vem som är bäst. Det som går att göra är att jämföra varje målare i Stockholm på samma sex punkter. Under varje punkt står hur du kontrollerar den, och hur GD Måleri Sthlm AB står sig.',
    lattKort: true,
    kolumner: 3,
    kort: [
      {
        id: 'omdomen',
        namn: 'Verifierade omdömen',
        bild: `${M}/jobb-taby-43.webp`,
        alt: 'Nymålad grå träfasad på ett modernt tvåvåningshus i Täby kyrkby, sedd från tomten',
        text: 'Läs omdömen där kundrelationen kontrolleras, inte bara citat på firmans egen sajt. Titta på hur många de är och hur nya, inte bara på snittbetyget.',
        punkter: ['4,9 av 5 på Reco, 46 omdömen', 'Rekommenderat företag 2024, 2025 och 2026', '4,8 av 5 på Google, 19 recensioner'],
        lank: { href: '#omdomen', txt: 'Läs omdömena' },
        ritning: (<path d="M100 12L112 45L148 47L120 68L129 102L100 83L71 102L80 68L52 47L88 45z" />),
      },
      {
        id: 'forsakring',
        namn: 'F-skatt och försäkring',
        bild: `${M}/jobb-fonster-maskerade.jpg`,
        alt: 'Spröjsade fönster maskerade med blå tejp inför målning',
        text: 'Kontrollera att firman har F-skatt och fråga vilket försäkringsbolag den har. Går något sönder under jobbet ska det vara firmans försäkring som står för det, inte din.',
        punkter: ['F-skatt och moms', 'Fullt försäkrade via Trygg-Hansa', 'Org.nr 559468-2444'],
        ritning: (<><path d="M100 10l50 18v30c0 30-21 48-50 56-29-8-50-26-50-56V28z" /><path d="M78 60l15 15 30-31" /></>),
      },
      {
        id: 'offert',
        namn: 'En offert där allt står med',
        bild: `${M}/jobb-bredspackling.jpg`,
        alt: 'Vägg under bredspackling, golvet täckt med papper',
        text: 'Be om offerten skriftligt och se efter att material, förarbete, städning och bortforsling står med. Fråga också hur extraarbete godkänns innan det görs.',
        punkter: ['Kostnadsfri offert', 'Material, förarbete, städning och bortforsling ingår', 'Inget extraarbete utan ditt ja'],
        ritning: (<><path d="M64 10h56l22 22v80H64z" /><path d="M120 10v22h22" /><path d="M80 50h46M80 66h46M80 82h30" /></>),
      },
      {
        id: 'betalning',
        namn: 'Betalning och ROT',
        bild: `${M}/tjanst-fasad.jpg`,
        alt: 'Nymålad laxrosa panelfasad med vitt burspråksfönster och svart stuprör',
        text: (<>Betala inte i förskott, och se till att ROT dras direkt på fakturan: 30 procent av arbetskostnaden, högst 50 000 kronor per person och år, för dig som äger och bor i bostaden. Källa: <a href={SKV_ROT} {...ny}>Skatteverket</a>.</>),
        punkter: ['Faktura när jobbet är klart', 'ROT redan avdraget på fakturan', 'Ingen förskottsbetalning'],
        ritning: (<><path d="M66 10h68v98l-11-8-12 8-11-8-11 8-12-8-11 8z" /><path d="M82 34h36M82 50h36M82 66h20" /></>),
      },
      {
        id: 'forarbete',
        namn: 'Förarbete, färg och garanti',
        bild: `${M}/jobb-spackel-tak.jpg`,
        alt: 'Målare i vit t-shirt spacklar ett innertak',
        text: (<>Fråga vem som gör förarbetet, vilken färg som används och vad garantin täcker. Det är förarbetet som gör att färgen fäster, vid <a href="/gdmaleri/invandig-malning/">invändig målning i Stockholm</a> lika väl som vid <a href="/gdmaleri/tapetsering/">tapetsering och bredspackling</a>.</>),
        punkter: ['Förarbetet gör vi själva', 'Färg från Flügger', 'Ett års garanti på måleriarbetet'],
        lank: { href: '/gdmaleri/fasad/', txt: 'Fasadmålning i Stockholm' },
        ritning: (<><path d="M48 20h88v28H48z" /><path d="M136 34h16v30h-52v16" /><path d="M93 80h14v30H93z" /></>),
      },
      {
        id: 'jobb-nara',
        namn: 'Jobb du kan titta på',
        bild: `${M}/tjanst-invandig.jpg`,
        alt: 'Rum med mörkblått målat tak, ljusa väggar och vitt fönster',
        text: 'Be om bilder från liknande jobb, gärna med ort och yta. En firma som har jobbat nära dig kan visa det.',
        punkter: ['Fasad, 234 kvm i Bromma', 'Fasad, 350 kvm i Täby kyrkby', 'Tak och väggar, 180 kvm i Södertälje'],
        lank: { href: '#jobb', txt: 'Se jobben' },
        ritning: (<><path d="M100 96S70 66 70 44a30 30 0 0160 0c0 22-30 52-30 52z" /><circle cx="100" cy="44" r="11" /><path d="M44 110h112" /></>),
      },
    ],
  },

  jobb: {
    eyebrow: 'Våra jobb',
    rubrik: ['Jobb i Stockholm', 'som du kan kontrollera'],
    lead: 'Fasaden i Bromma på 234 kvm, fasaden i Täby kyrkby på 350 kvm och tak och väggar på 180 kvm i Södertälje ligger på vårt Instagram, med ort och yta.',
    not: 'Alla bilder är från våra egna projekt. Före/efter-bilden är två foton av samma gavel, tagna före och efter jobbet och satta ihop på mitten.',
    utvalda: [
      { src: `${M}/fasad-fore-efter.webp`, w: 900, h: 1200, etikett: 'Bromma, 234 kvm', txt: 'Samma gavel: vänster halva före, höger halva efter jobbet.', alt: 'Sammansatt före/efter-bild av samma gavel i Bromma: vänster halva visar smutsig, flagnande grå färg och en byggställning, höger halva den rena, nymålade ljusgrå panelen med vita fönster', lank: { href: 'https://www.instagram.com/p/Dd-zVd3ggOI/', txt: 'Se jobbet på Instagram' } },
      { src: `${M}/jobb-taby-1.webp`, w: 900, h: 1200, etikett: 'Täby kyrkby, 350 kvm', txt: 'Träfasad i grått, klar i september 2026.', alt: 'Nymålad grå träfasad på ett modernt tvåvåningshus med altan och utemöbler i Täby kyrkby', lank: { href: 'https://www.instagram.com/p/Dc1IM7Pgpeh/', txt: 'Se jobbet på Instagram' } },
    ],
    tid: '70s',
    rad1: [
      { src: `${M}/jobb-bromma-altan.webp`, alt: 'Ljusgrå panelfasad med vita spröjsade altandörrar och fönsterkarmar mot ett trädäck', txt: 'Bromma: väggar och fönsterkarmar' },
      { src: `${M}/jobb-langsida.jpg`, alt: 'Långsida på ett hus med laxrosa stående panel, vita fönster och svart stuprör', txt: 'Panel och fönster målade' },
      { src: `${M}/jobb-rod-timmer.jpg`, alt: 'Närbild på en rödmålad timmervägg med vit knutbräda och altanräcke', txt: 'Timmervägg målad i rött' },
      { src: `${M}/jobb-taby-2.webp`, alt: 'Samma nymålade grå träfasad i Täby kyrkby, sedd från tomten med tallar och berghällar', txt: 'Täby kyrkby, 350 kvm' },
      { src: `${M}/jobb-rod-fonster.jpg`, alt: 'Vitmålat spröjsat fönster i en röd träfasad', txt: 'Fönster målade vita' },
      { src: `${M}/jobb-fonsterbleck.jpg`, alt: 'Närbild på vitmålad fönsterbåge och svart fönsterbleck mot panel', txt: 'Fönsterbåge målad' },
      { src: `${M}/jobb-terrass.jpg`, alt: 'Nymålad laxrosa fasad och vit dörr vid en trädäcksaltan', txt: 'Fasad och dörr målade' },
    ],
    rad2: [
      { src: `${M}/invandig-sodertalje-1.webp`, alt: 'Nymålat rum med ljusa väggar, vit taklist och skrivbord vid fönstret i Södertälje', txt: 'Södertälje: tak och väggar, 180 kvm' },
      { src: `${M}/jobb-sekelskifte.jpg`, alt: 'Ljust rum med två höga spröjsade fönster och radiatorer', txt: 'Rum målat i ljust' },
      { src: `${M}/jobb-bla-tak.jpg`, alt: 'Ljusblått målat tak med spotlightskena och bokhylla', txt: 'Tak målat ljusblått' },
      { src: `${M}/jobb-gul-hall.jpg`, alt: 'Hall i varmgul kulör med vita snickerier och balkongdörr', txt: 'Hall målad i gult' },
      { src: `${M}/jobb-trapphus.jpg`, alt: 'Trapphus med mörkrosa nederdel och ljus vägg ovanför', txt: 'Trapphus målat i två kulörer' },
      { src: `${M}/jobb-tak-fore.jpg`, alt: 'Betongpannetak med mossa och gul lav före taktvätt', txt: 'Tak före tvätt' },
      { src: `${M}/tjanst-tak.jpg`, alt: 'Grått betongpannetak efter taktvätt, med en vit villa och tallar i bakgrunden', txt: 'Tak efter tvätt' },
    ],
  },

  varfor,
  om,
  steg,

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Kunderna om', 'att välja oss'],
    betyg: GOOGLE_BETYG,
    // Tre Google-omdömen som handlar om valet och förtroendet, ordagrant, före Recos egen widget
    // (tre, inte fyra: rutnätet är tre kolumner på dator och ett fjärde kort blev ensamt på en egen rad).
    googleLista: [GOOGLE_OMDOMEN.therese, GOOGLE_OMDOMEN.jenny, GOOGLE_OMDOMEN.viktor],
    recoIframe: RECO_IFRAME,
    lista: RECO_LISTA,
    not: 'Omdömena är hämtade från Google (4,8 av 5, 19 recensioner) och Reco.se, där kundrelationen kontrolleras. Google-citaten ordagrant, hämtade 2026-10-09; Reco-rutan visar Recos egna, senaste omdömen.',
    lank: RECO,
  },

  instagram: { ...instagramBas, koder: ['Dd-zVd3ggOI', 'Dc1IM7Pgpeh', 'DeNI1zEkcpW'] },

  fragor: {
    eyebrow: 'Frågor om att välja målare',
    rubrik: ['Det folk undrar', 'innan de anlitar en målare'],
    lead: 'Korta svar, med källa där det finns en.',
    kort: { rubrik: 'Vill du jämföra med oss?', text: 'Ring och berätta om jobbet, så får du en kostnadsfri offert att lägga bredvid de andra.' },
    lista: [
      { q: 'Vem är den bästa målaren i Stockholm?', a: 'Det finns inget officiellt facit för vem som är bäst, och topplistor bygger på olika underlag. Den bästa målaren för dig är den som klarar en jämförelse på samma punkter: verifierade omdömen, F-skatt och försäkring, en offert där allt står med och betalning först när jobbet är klart. Som exempel har GD Måleri Sthlm AB 4,9 av 5 på Reco från 46 omdömen, har varit Rekommenderat företag på Reco 2024, 2025 och 2026, har 4,8 av 5 på Google och är försäkrade via Trygg-Hansa. Jämför gärna det med andra firmor.' },
      { q: 'Hur ser jag om en målare är seriös?', a: 'Kontrollera att firman har F-skatt och en försäkring, och läs omdömen där kundrelationen kontrolleras. En seriös målerifirma ger dig en skriftlig offert, gör inget extraarbete utan ditt godkännande och vill inte ha betalt i förskott. Organisationsnumret går att slå upp; GD Måleri Sthlm AB har 559468-2444.' },
      { q: 'Vad ska stå i offerten?', a: 'Vad som ska göras, på vilka ytor, vad som ingår och vad det kostar. Se efter att material, förarbete som tvätt och skrapning, städning och bortforsling står med, och att det framgår hur extraarbete godkänns. I offerten från GD Måleri Sthlm AB ingår allt det, och offerten är kostnadsfri.' },
      { q: 'Får jag ROT-avdrag för målning?', a: <>Ja, om du är privatperson och äger och bor i bostaden. Avdraget är 30 procent av arbetskostnaden, högst 50 000 kronor per person och år, och materialet ger inget avdrag. GD Måleri Sthlm AB drar av det direkt på fakturan. I en bostadsrätt gäller avdraget arbete inne i lägenheten; föreningens gemensamma ytor, som fasad och trapphus, ger inget avdrag. Källa: <a href={SKV_ROT} {...ny}>Skatteverket, Ger arbetet rätt till rotavdrag?</a></> },
      { q: 'När ska jag betala målaren?', a: 'När jobbet är klart och ni har gått igenom resultatet. GD Måleri Sthlm AB tar ingen förskottsbetalning; på stora jobb över 500 kvm betalas halva arbetskostnaden när halva jobbet är gjort. ROT är redan avdraget på fakturan.' },
      { q: 'Vad är Rekommenderat företag på Reco?', a: <>En utmärkelse som Reco ger företag som under ett kalenderår har fått minst tio omdömen med ett snittbetyg på minst 4,0 av 5. Eftersom omdömena ska vara från samma år säger den något om hur nöjda kunderna är nu. GD Måleri Sthlm AB har fått den 2024, 2025 och 2026, och omdömena är verifierade: Reco frågar kunderna direkt, utifrån kontaktuppgifter som företaget delar via sitt affärssystem. Källa: <a href="https://www.reco.se/foretag/rekommenderat-foretag" {...ny}>Reco, Rekommenderat företag</a></> },
      { q: 'Var i Stockholm jobbar GD Måleri?', a: <>I hela Stockholm och Stockholms län. I år har GD Måleri Sthlm AB bland annat gjort <a href="/gdmaleri/fasad/">fasadmålning</a> på 234 kvm i Bromma och 350 kvm i Täby kyrkby, fasader på Värmdö och tak och väggar på 180 kvm i Södertälje, och tidigare en fasad i Handen och rum i Nacka och Tyresö. Samma firma gör <a href="/gdmaleri/fasadtvatt/">fasadtvätt</a>, <a href="/gdmaleri/tak/">takmålning</a>, <a href="/gdmaleri/taktvatt/">taktvätt</a>, <a href="/gdmaleri/snickerier-fonster-malning/">målning av fönster och snickerier</a>, <a href="/gdmaleri/golv/">golvläggning och golvslipning</a> och <a href="/gdmaleri/brf/">målning för bostadsrättsföreningar</a>.</> },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Jämför med', 'vår offert'],
    lead: 'Begär en kostnadsfri offert och lägg den bredvid de andra. Material, förarbete, städning och bortforsling ingår, och inget extra görs utan ditt ja.',
    checkar: ['Svar inom 24 timmar', 'Kostnadsfri offert, allt inräknat', 'ROT dras direkt på fakturan'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta kort om jobbet',
    placeholder: 'Vad som ska göras, inne eller ute, ungefärlig yta, och var i Stockholm',
    // Korten här är kriterier, inte tjänster: formulärets val är tjänsterna (mallfältet kontaktSektion.typer).
    typer: SIDOR.map((l) => l.txt),
    kundtyp,
    formNot,
    epostNamn,
    formNotBock: true,
  },

  popup: {
    rubrik: 'Vill du jämföra?',
    text: 'Begär en offert som inte kostar något och lägg den bredvid de andra. ROT dras direkt på fakturan.',
  },

  footer: {
    text: 'Så väljer du målare i Stockholm: verifierade omdömen, F-skatt och försäkring, en offert där allt står med och faktura när jobbet är klart.',
    tjanster: footerTjanster,
    bild: footerBild, // Stockholms siluett i skymning, se _gd.js
    lankar: footerLankar, // Så väljer du målare, Integritet och Cookieinställningar, se _gd.js
    orter: footerOrter, // Där vi jobbar: ortssidorna, se _gd.js
  },

  // KUND, inte förslag (Mathias 2026-10-09): ingen demo-knapp, ingen Bahko-modal, ingen byråtext i footern.
  kund: true,
  skapadAv,
  samarbeten,
};

export default function GdMaleriBastaMalare() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <DemoSida data={data} />
    </>
  );
}
