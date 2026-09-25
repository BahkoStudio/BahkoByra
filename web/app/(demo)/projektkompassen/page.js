import DemoSida from '../_mall/DemoSida';

/* ===========================================================================
   PROJEKTKOMPASSEN — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: instagram.com/projektkompassen · Bankeryd (Jönköping) · INGEN hemsida
   (projektkompassen.se är One.coms parkeringssida 2026-09-25; den gamla
   phsbyggkonsult.se ligger kvar). Mathias lovade i DM: "Vill du ha en
   prototyp baserat på byggande av trovärdighet … bygger den gratis".

   Bärande idé: Philip har stått på båda sidor, som beställare och som
   entreprenör, och är certifierad KA med behörighet K. Han håller projektet
   på kurs hela vägen till slutbesiktningen. Trovärdigheten bärs av riktiga
   namn: Riksbyggen, Junecon, EstateWork, Förvaltningsgruppen, Bring.

   VERIFIERAT (2026-09-25):
   · Instagram-bio (skärmbild från Mathias): "Projektkompassen", "F.d PHS
     Byggkonsult AB", Philip@projektkompassen.se, 070-970 75 38, Aspåsgatan 36,
     Bankeryd 564 33, @psvartz.
   · Bolaget: The Project Compass Company AB, tidigare PHS Byggkonsult AB,
     org.nr 559374-9509, Bankeryd, vd Philip Svartz (allabolag, merinfo,
     bolagsfakta). Registrerat 2022.
   · Namnbytet (IG-inlägg DUjPjJVAJHq, 2026-02-09): "Samma engagemang. Samma
     organisationsnummer. Samma telefonnummer. Ny e-postadress."
   · KA: certifierad kontrollansvarig, behörighet K, cert.nr C005155, giltigt
     till 2030-10-15 (buildly.se). IG-inlägg DP4OFlViHs- (2025-10-16): "Från och
     med idag är jag certifierad kontrollansvarig!"
   · phsbyggkonsult.se: tjänsterna (byggledning/projektledning,
     skyddsrumsbesiktning, inköp/kalkyl/upphandling, besiktning/kontroll, KA
     enl. PBL, projektering/utredning), referensprojekten (MOBIS Torsvik via
     Junecon, Riksbyggen-projekt, Lyran 8, Masen 10, Kloret 2, Spobik,
     tvätthall via Junecon, Brf Kabban 96 lgh, underhållsplaner, Värnamo,
     Nässjö), Philips text "över tio års erfarenhet … både på beställarsidan
     och som entreprenör. Sedan 2022 … alltid med fokus på helheten och ett
     gott samarbete", certifieringarna (fastighetsingenjör & projektledare,
     sakkunnig skyddsrum, KA) och tre omdömen (Mattias Karlsson/EstateWork,
     Nicodemus Stiller/Riksbyggen, Hampus Lundin/Brf Masen 10), ordagrant.
   · IG-inlägg: Lyran 8 för Förvaltningsgruppen (DIerFy6xE8a: "Från söders
     fulaste till söders snyggaste", skyltfönster, fönster, balkonger + räcken,
     tilläggsisolering + ny puts, tak), tvätthall för Bring med Junecon
     (DM5vVggMWlE: verksamheten rullade under bygget), Norrköping (DNllzqRsh97:
     byggledare för beställaren och projektledare för EstateWork samtidigt).

   INTE verifierat, och finns därför inte på sidan: priser, öppettider,
   Google-profil och betyg (ingen hittad), antal projekt, ledtider,
   svarstider, att första samtalet är gratis.

   FLAGGOR: hero-filmen är en GENERERAD illustration av en fasadrenovering
   (Qwen Image 3 + Kling 3.0 Std via API, $0,38) — inte Lyran 8. Alla
   stillbilder och Varför-/kontaktfilmen är bildrutor ur Philips egna
   Instagram-filmer. Logotypen är friställd ur namnbytesinlägget (ingen
   vektorfil). Omdömena säger "PHS Byggkonsult" (firmans tidigare namn).
   Varför-punkten "Räcker det med en KA …" är vår formulering av en hållning,
   inte Philips ord — stäm av med honom. Formuläret går till
   mathias@bahkobyra.se. Adressen är Philips egen (står i hans IG-bio).
   =========================================================================== */

export const metadata = {
  title: 'Projektkompassen — byggledning och kontrollansvarig i Jönköping',
  description:
    'Byggledning, projektledning och certifierad kontrollansvarig (behörighet K) från Bankeryd. Upphandling, besiktning och skyddsrum. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

const M = '/projektkompassen/media';

const data = {
  namn: 'Projektkompassen',
  tema: {
    mork: '#111A26',
    accent: '#F2830B',
    accentHover: '#D9740A',
    accentText: '#A94C06',
    accentLjus: '#FF9A3C',
    paAccent: '#0F172A',
  },
  logo: { src: `${M}/logo-projektkompassen.png`, w: 1952, h: 604, alt: 'Projektkompassen', topp: 'vit' },
  kontakt: {
    tel: '070-970 75 38',
    telHref: 'tel:+46709707538',
    epost: 'philip@projektkompassen.se',
    adress: 'Aspåsgatan 36, 564 33 Bankeryd',
    ig: 'https://www.instagram.com/projektkompassen/',
    igHandle: '@projektkompassen',
    orgnr: '559374-9509',
  },
  cta: { txt: 'Berätta om ditt projekt', kort: 'Berätta om projektet', lank: 'Berätta om projektet' },
  nav: {
    vanster: [{ href: '#tjanster', txt: 'Tjänster' }, { href: '#jobb', txt: 'Referenser' }],
    hoger: [{ href: '#om', txt: 'Om mig' }, { href: '#omdomen', txt: 'Omdömen' }],
  },

  hero: {
    ort: 'Jönköping',
    tjanster: ['Byggledning', 'Kontrollansvar'],
    video: `${M}/video-hero-fasad.mp4`,
    videoMobil: `${M}/video-hero-fasad-mobil.mp4`,
    poster: `${M}/poster-hero.jpg`,
    posterMobil: `${M}/poster-hero-mobil.jpg`,
  },
  tejp: ['Byggledning', 'Projektledning', 'Kontrollansvarig', 'Upphandling', 'Besiktning', 'Skyddsrum', 'Kalkyl', 'Jönköping'],

  tjanster: {
    eyebrow: 'Vad jag gör',
    rubrik: ['Från förfrågningsunderlag', 'till slutbesiktning'],
    lead: 'Jag hjälper beställare, föreningar och entreprenörer genom hela byggprojektet, eller med den del där det behövs.',
    kort: [
      { id: 'byggledning', namn: 'Byggledning och projektledning', bild: `${M}/tjanst-byggledning.jpg`, alt: 'Byggarbetare vid en ny stålstomme på en byggplats', text: 'Jag leder projektet för beställaren, eller åt entreprenören: tidplan, byggmöten, ekonomi och kontakten mellan parterna, hela vägen fram till slutbesiktningen.', punkter: ['Byggledare för beställaren', 'Projektledare åt entreprenör', 'Hela vägen till slutbesiktning'], ritning: (<><path d="M24 104h152" /><path d="M44 104V44h64v60" /><path d="M44 64h64M44 84h64M76 44v60" /><path d="M136 104V18M136 18h40M136 18l-28 18M164 18v22" /><path d="M158 40h12v10h-12z" /></>) },
      { id: 'kontrollansvar', namn: 'Kontrollansvarig enligt PBL', bild: `${M}/tjanst-kontrollansvar.jpg`, alt: 'Armering och gjutformar till en grund, markerade med rosa skydd', text: 'Certifierad kontrollansvarig med behörighet K, alltså även för större projekt av komplicerad art. Jag hjälper byggherren med kontrollplanen och följer upp kontrollerna.', punkter: ['Behörighet K, certifierad till 2030', 'Kontrollplan enligt PBL', 'Kontroller och tekniska möten'], ritning: (<><path d="M60 18h80v92H60z" /><path d="M84 12h32v14H84z" /><path d="M72 46l6 6 12-12M72 70l6 6 12-12M72 94l6 6 12-12" /><path d="M100 46h28M100 70h28M100 94h28" /></>) },
      { id: 'besiktning', namn: 'Besiktning och utredning', bild: `${M}/tjanst-besiktning.jpg`, alt: 'Nylagt klinkergolv med golvbrunn i ett badrum', text: 'Besiktningar, kontroller och utredningar när något inte stämmer, som kalla golv i en förening. Jag är också certifierad sakkunnig för skyddsrum.', punkter: ['Besiktning och kontroll', 'Skyddsrumsbesiktning', 'Utredning och utlåtande'], ritning: (<><path d="M24 104V62l44-30 44 30v42z" /><path d="M54 104V80h28v24" /><path d="M120 54a22 22 0 1 0 44 0a22 22 0 1 0-44 0" /><path d="M158 70l20 20" /></>) },
      { id: 'upphandling', namn: 'Upphandling och underhållsplaner', bild: `${M}/tjanst-upphandling.jpg`, alt: 'Mötesrum med ekbord och blå stolar i ett nytt kontor', text: 'Förfrågningsunderlag, kalkyl och anbudsförfarande, så att anbuden går att jämföra. Och underhållsplaner som visar vad fastigheten behöver de kommande åren.', punkter: ['Förfrågningsunderlag', 'Kalkyl och anbud', 'Underhållsplaner'], ritning: (<><path d="M30 18h70v90H30z" /><path d="M44 38h42M44 52h42M44 66h28" /><path d="M116 42h54v66h-54z" /><path d="M126 54h34" /><path d="M128 72h6M144 72h6M128 88h6M144 88h6" /></>) },
    ],
  },

  jobb: {
    eyebrow: 'Referenser',
    rubrik: ['Projekt jag har', 'lett i mål'],
    lead: 'Fasadrenoveringen av Lyran 8 i Jönköping, en tvätthall åt Bring och ett kontor i Norrköping.',
    not: 'Alla bilder är mina egna, från byggena.',
    tid: '80s',
    rad1: [
      { src: `${M}/jobb-lyran-tak.jpg`, alt: 'Hantverkare river gammal takbeläggning på ett lågt tak vid gatan', txt: 'Nytt tak, Lyran 8' },
      { src: `${M}/jobb-lyran-skyltfonster.jpg`, alt: 'Montörer sätter nya skyltfönster i en butiksfasad', txt: 'Nya skyltfönster' },
      { src: `${M}/jobb-lyran-fonsterbyte.jpg`, alt: 'Hantverkare byter fönster inifrån en möblerad lägenhet', txt: 'Fönsterbyte i bebodda lägenheter' },
      { src: `${M}/jobb-lyran-isolering.jpg`, alt: 'Hantverkare på byggställning vid en fasad under tilläggsisolering', txt: 'Tilläggsisolering av fasaden' },
      { src: `${M}/jobb-lyran-ny-puts.jpg`, alt: 'Byggställning längs en nyputsad röd fasad mot gatan', txt: 'Ny puts mot gatan' },
      { src: `${M}/jobb-lyran-gard.jpg`, alt: 'Gul gårdsfasad med byggställning och balkonger', txt: 'Balkongerna mot gården' },
      { src: `${M}/jobb-lyran-gron-fasad.jpg`, alt: 'Byggställning längs en nyputsad grön fasad', txt: 'Grön puts på gårdssidan' },
    ],
    rad2: [
      { src: `${M}/jobb-tvatthall-grund.jpg`, alt: 'Betongväggar och armerad grund till en tvätthall', txt: 'Grunden till tvätthallen' },
      { src: `${M}/jobb-tvatthall-lift.jpg`, alt: 'Saxlift och installationer inne i en ny tvätthall för lastbilar', txt: 'Installationer i hallen' },
      { src: `${M}/jobb-tvatthall-klar.jpg`, alt: 'Tvätthall med röda portar och grusplan framför', txt: 'Tvätthallen åt Bring' },
      { src: `${M}/jobb-norrkoping-ratt.jpg`, alt: 'Kontorsyta med öppet tak och fönsterrad innan inredningen', txt: 'Före: rått kontorsplan' },
      { src: `${M}/jobb-norrkoping-regel.jpg`, alt: 'Nya regelväggar och verktyg på ett kontorsbygge', txt: 'Nya väggar på plats' },
      { src: `${M}/jobb-norrkoping-wc.jpg`, alt: 'Nytt WC med mörka väggar och rund belyst spegel', txt: 'Nytt WC' },
      { src: `${M}/jobb-norrkoping-konferens.jpg`, alt: 'Konferensrum med långbord och origamilampor', txt: 'Konferensrummet klart' },
      { src: `${M}/jobb-norrkoping-pentry.jpg`, alt: 'Nytt pentry med bardisk och vita skåp', txt: 'Pentryt, Norrköping' },
    ],
  },

  varfor: {
    eyebrow: 'Varför Projektkompassen',
    rubrik: ['Någon som håller', 'kursen åt dig'],
    lead: 'Jag har jobbat både på beställarsidan och som entreprenör. Därför vet jag hur båda parter tänker, och kan hålla ditt projekt på rätt kurs hela vägen till slutbesiktningen.',
    punkter: [
      { rubrik: 'Båda sidor av bordet', text: 'Över tio år i bygg, både som beställare och som entreprenör. I Norrköping var jag båda samtidigt.' },
      { rubrik: 'Certifierad, behörighet K', text: 'Kontrollansvarig enligt PBL även för komplicerade projekt, och certifierad sakkunnig för skyddsrum.' },
      { rubrik: 'Hänsyn till det som finns', text: 'Tvätthallen byggdes till medan verksamheten rullade som vanligt. Det som redan fungerar ska fortsätta göra det.' },
      { rubrik: 'Ärliga råd', text: 'Räcker det med en kontrollansvarig säger jag det, även när en hel byggledning hade gett mig mer.' },
    ],
    video: `${M}/video-varfor-bygget.mp4`,
    poster: `${M}/poster-varfor.jpg`,
    videoAlt: 'Långsam inzoomning mot en kranbil som lossar material på en byggplats i sol. Filmen slutar med Projektkompassens logotyp.',
  },

  om: {
    eyebrow: 'Om Projektkompassen',
    rubrik: ['Philip Svartz,', 'byggkonsult i Bankeryd'],
    kortRad: 'Bankeryd · Jönköping',
    stycken: [
      'Jag heter Philip Svartz och har över tio års erfarenhet inom bygg, både på beställarsidan och som entreprenör. Sedan 2022 driver jag egna uppdrag inom byggledning, projektledning, projektering och kontroll, alltid med fokus på helheten och ett gott samarbete.',
      'I början av 2026 bytte firman namn från PHS Byggkonsult till Projektkompassen. Samma engagemang, samma organisationsnummer och samma telefonnummer, men ett namn som gör det tydligare vad jag faktiskt gör. Jag är fastighetsingenjör och projektledare, certifierad kontrollansvarig och certifierad sakkunnig för skyddsrum.',
    ],
    bevis: [
      { ord: '10+ år', text: 'i bygg, som beställare och entreprenör' },
      { ord: 'Behörighet K', text: 'certifierad kontrollansvarig enligt PBL' },
      { ord: 'Skyddsrum', text: 'certifierad sakkunnig' },
    ],
  },

  steg: {
    eyebrow: 'Så går det till',
    rubrik: ['Från första samtal', 'till slutbesiktning'],
    lead: 'Ungefär så här ser ett uppdrag ut. Vad som ingår bestämmer vi tillsammans.',
    lista: [
      { namn: 'Du berättar', text: 'Ring eller skriv om projektet: vad som ska byggas, var och när.', ikon: 'kontakt' },
      { namn: 'Vi ses på plats', text: 'Jag tittar på förutsättningarna och vad du behöver hjälp med.', ikon: 'besok' },
      { namn: 'Underlag och upphandling', text: 'Förfrågningsunderlag, kalkyl och anbud, eller kontrollplanen om du behöver en KA.', ikon: 'plan' },
      { namn: 'Byggtiden', text: 'Byggmöten, kontroller och uppföljning av tid och ekonomi.', ikon: 'arbete' },
      { namn: 'Slutbesiktning', text: 'Projektet besiktas och lämnas över till dig.', ikon: 'klart' },
    ],
  },

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Vad beställarna', 'säger'],
    lista: [
      { namn: 'Mattias Karlsson', kalla: 'EstateWork · från phsbyggkonsult.se', stjarnor: false, text: 'Det är ett nöje att ringa Philip. Han återkopplar alltid, är alltid på bra humör och jobbar lösningsorienterat. Han är en bra resurs för oss när vi behöver en hjälpande hand. Det är därför vi har samarbetat sedan dag 1.' },
      { namn: 'Nicodemus Stiller', kalla: 'Riksbyggen · från phsbyggkonsult.se', stjarnor: false, text: 'Jag har jobbat med PHS Byggkonsult i över 3 år nu. Han är alltid trevlig och pålitlig. Har vi problem vet jag att Philip kan hitta en lösning.' },
      { namn: 'Hampus Lundin', kalla: 'Brf Masen 10 · från phsbyggkonsult.se', stjarnor: false, text: 'Att arbeta med PHS Byggkonsult har varit en positiv erfarenhet. Han var inlyssnande och gav oss råd och feedback under hela processen utan att köra över oss.' },
    ],
    not: 'Från phsbyggkonsult.se, som de står där. PHS Byggkonsult är firmans tidigare namn.',
  },

  instagram: {
    eyebrow: 'Instagram',
    rubrik: ['Följ projekten', 'på plats'],
    lead: 'Det senaste från mitt konto, direkt från Instagram.',
    bio: 'Byggledning, projektledning och KA · Bankeryd',
    koder: ['DIerFy6xE8a', 'DM5vVggMWlE', 'DNllzqRsh97'],
  },

  fragor: {
    eyebrow: 'Vanliga frågor',
    rubrik: ['Det du brukar', 'undra först'],
    lead: 'Pengar och ansvar först, det praktiska sedan.',
    kort: { rubrik: 'Hittar du inte svaret?', text: 'Ring och fråga rakt ut. Jag säger vad som gäller för just ditt projekt.' },
    lista: [
      { q: 'Vad kostar det?', a: 'Det beror på projektets storlek och vad du behöver hjälp med. Berätta om projektet, så får du ett förslag på upplägg och pris.' },
      { q: 'Vad gör en kontrollansvarig?', a: 'En kontrollansvarig, KA, hjälper byggherren att ta fram kontrollplanen och se till att den följs, så att bygget uppfyller kraven i plan- och bygglagen. KA är med på tekniska möten och kontroller under byggtiden.' },
      { q: 'Vad betyder behörighet K?', a: 'K står för komplicerad art: större byggprojekt, till exempel byggnader med fler än två våningar. Med behörighet K kan jag också ta projekt av normal art.' },
      { q: 'Behöver mitt projekt en kontrollansvarig?', a: 'Oftast, om åtgärden kräver bygglov eller anmälan. Byggnadsnämnden avgör. Är du osäker kan du ringa, så reder vi ut det.' },
      { q: 'Jobbar du åt beställaren eller entreprenören?', a: 'Båda. Jag har varit byggledare för beställare och projektledare åt entreprenörer, och i ett projekt i Norrköping båda samtidigt.' },
      { q: 'Kan du hjälpa en bostadsrättsförening?', a: 'Ja. Jag har bland annat lett stambyte, balkongbyte på 96 lägenheter och energiprojekt i föreningar, och tagit fram underhållsplaner.' },
      { q: 'Var arbetar du?', a: 'Från Bankeryd, oftast i Jönköpingstrakten. Jag har också haft uppdrag i Norrköping, Nässjö, Gislaved och Värnamo.' },
      { q: 'Vad hände med PHS Byggkonsult?', a: 'Det är samma firma. Namnet byttes till Projektkompassen i början av 2026, med samma organisationsnummer och telefonnummer.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Berätta om', 'ditt projekt'],
    lead: 'Ring, eller skriv några rader om vad som ska byggas. Så tar vi det därifrån.',
    checkar: ['Byggledning, projektledning eller KA', 'Certifierad kontrollansvarig, behörighet K', 'Uppdrag åt Riksbyggen, Junecon och EstateWork'],
    video: `${M}/video-kontakt-bygget.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta kort om projektet',
    placeholder: 'Vad som ska byggas, var, ungefär när, och om du behöver byggledare, KA eller båda',
    formNot: 'Ju mer du berättar, desto bättre svar redan i första samtalet. Inga massutskick, ingen säljlista.',
  },

  popup: {
    rubrik: 'Behöver du en KA?',
    text: 'Certifierad kontrollansvarig med behörighet K, även för större projekt. Berätta om ditt projekt, så hör jag av mig.',
  },

  footer: {
    text: 'Byggledning, projektledning, kontrollansvar och besiktning från Bankeryd. Tidigare PHS Byggkonsult.',
  },

  modal: {
    rubrik: 'Så här kan Projektkompassen se ut på nätet',
    text: 'Det här är ett kostnadsfritt förslag, byggt på det du själv visar på Instagram och phsbyggkonsult.se, med bilder ur dina egna filmer från byggena. Ingen beställning, inget åtagande. Vill du se den skarpt med ett formulär som landar i inkorgen? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.',
  },
};

export default function ProjektkompassenDemo() {
  return <DemoSida data={data} />;
}
