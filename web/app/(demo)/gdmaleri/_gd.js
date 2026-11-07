/* ===========================================================================
   GD MÅLERI STHLM AB — det som är gemensamt för alla GD-sidor:
   huvudsidan (page.js), BRF (brf/) och tjänstesidorna invandig-malning/, fasad/,
   tak/ och golv/ (2026-10-08, efter förebilden marlonshantverksgrupp.se som
   Ghandi skickade: en sida per tjänst, kundtyp i formuläret, svarstid) samt
   tapetsering/, snickerier-fonster-malning/, fasadtvatt/ och taktvatt/ (2026-10-13).
   Källorna för allt nedan står i huvudsidans VERIFIERAT-block.
   =========================================================================== */

export const M = '/gdmaleri/media';
export const DOMAN = 'https://gdmaleri.se';

export const tema = {
  mork: '#0D1B2A',
  accent: '#D42E44',
  accentHover: '#B82237',
  accentText: '#B82237',
  accentLjus: '#FF8E9A',
  paAccent: '#fff',
};

export const logo = { src: `${M}/logo-gdmaleri.png`, ljus: `${M}/logo-gdmaleri-ljus.png`, w: 1400, h: 1315, alt: 'GD Måleri Sthlm AB', topp: 'fri' };

export const kontakt = {
  tel: '073-729 88 89',
  telHref: 'tel:+46737298889',
  epost: 'info@gdmaleri.se',
  ig: 'https://www.instagram.com/gdmaleristhlm/',
  igHandle: '@gdmaleristhlm',
  fb: 'https://www.facebook.com/people/GD-M%C3%A5leri-Sthlm-AB/61557609848512/',
  orgnr: '559468-2444',
  // Alla dagar 08–17: Ghandi via Mathias 2026-10-13 (ersätter "vardagar" från 2026-10-08).
  oppet: 'Alla dagar 08–17',
};

/* Bokning i Cal.com (Mathias 2026-10-08, länkarna svarar 200). Ingen klient-JS och
   ALDRIG någon Cal.com-nyckel. Formuläret är huvudvägen, bokningen ett alternativ.
   inbaddad (Mathias 2026-10-08 kväll: "vill se själva bokningssystemet på sidan"):
   kalendern för /offert som <iframe> i egen sektion före kontakt, utan Cal.coms embed.js.
   Adressen blir cal.com/gdmaleri/offert?embed=true&theme=light: Cal.coms /embed-route
   håller sidan dold tills embed.js svarar, ?embed=true på vanliga bokningssidan visar
   kalendern direkt. Inga X-Frame-Options/frame-ancestors hos Cal.com (kollat 2026-10-08).
   Med inbaddad utgår bokningsknappen i kontaktsektionen och frågekortets länk pekar på #boka. */
export const bokning = {
  url: 'https://cal.com/gdmaleri/offert',
  txt: 'Boka offertbesök',
  not: 'Kostnadsfri offert vid ett hembesök på 45 minuter, alla dagar 08–17.',
  ringUrl: 'https://cal.com/gdmaleri/ring-mig',
  ringTxt: 'Boka att GD Måleri Sthlm AB ringer upp',
  kortTxt: 'Eller boka offertbesök',
  inbaddad: {
    eyebrow: 'Boka online',
    rubrik: ['Boka offertbesök', 'direkt'],
    lead: 'Välj en tid som passar – vi kommer hem till dig. Alla dagar 08–17.',
    titel: 'Boka kostnadsfritt offertbesök med GD Måleri (Cal.com)',
  },
};

export const cta = { txt: 'Begär kostnadsfri offert', kort: 'Begär offert', lank: 'Begär offert' };

/* Formuläret går till Ghandis EGEN Web3Forms-nyckel (Mathias 2026-10-08), inte till
   Bahkos demonyckel. Web3Forms-nycklar är publika i klienten och får ligga i koden.
   Ämne och avsändare är inställda i HANS Web3Forms-panel (skärmdump från Mathias
   2026-10-08): "Ny förfrågan via hemsidan – {field:kundtyp}" och "GD Måleri hemsida".
   Web3Forms dokumentation säger inte om subject/from_name i anropet går före panelen,
   så anropet skickar INGA sådana fält (amne/fran: null) och panelen gäller. Fältet
   kundtyp skickas med exakt det namnet (gemener). Han har Web3Forms Pro och
   autosvaret slås på i panelen: det går till fältet som heter email, därför heter
   e-postfältet email på GD-sidorna (kontaktSektion.epostNamn). E-post är valfritt,
   så bekräftelsen lovas bara den som fyller i den (formNot).
   Svarstiden "inom 24 timmar": Mathias på Ghandis vägnar 2026-10-08. */
export const formular = {
  nyckel: 'a5e107f5-03a1-4736-8c79-8b79f826efbc',
  amne: null,
  fran: null,
  kvittens: ['Tack! Din förfrågan är skickad.', 'Vi återkommer inom 24 timmar. Har du bråttom går det bra att ringa 073-729 88 89.'],
};

// Formulärets kundtyp (som Marlons): obligatoriskt val, följer med som fältet kundtyp och i ämnesraden.
export const kundtyp = ['Privatperson', 'Företag', 'BRF'];
export const formNot = 'Vi återkommer inom 24 timmar. Fyller du i e-post får du en bekräftelse direkt.';
export const epostNamn = 'email';

// Tjänstesidorna. Footerns Tjänster-kolumn länkar hit på alla GD-sidor.
// 2026-10-13 (Mathias: "varje tjänst ska ha en undersida"): fyra nya sidor, tapetsering/,
// snickerier-fonster-malning/, fasadtvatt/ och taktvatt/. Samma ordning som startsidans åtta kort.
export const SIDOR = [
  { href: '/gdmaleri/invandig-malning/', txt: 'Invändig målning', kort: 'Invändig målning' },
  { href: '/gdmaleri/tapetsering/', txt: 'Tapetsering och bredspackling', kort: 'Tapetsering' },
  { href: '/gdmaleri/fasad/', txt: 'Fasadmålning', kort: 'Fasadmålning' },
  { href: '/gdmaleri/fasadtvatt/', txt: 'Fasadtvätt', kort: 'Fasadtvätt' },
  { href: '/gdmaleri/tak/', txt: 'Takmålning', kort: 'Takmålning' },
  { href: '/gdmaleri/taktvatt/', txt: 'Taktvätt', kort: 'Taktvätt' },
  { href: '/gdmaleri/snickerier-fonster-malning/', txt: 'Fönster och snickerier', kort: 'Fönster och snickerier' },
  { href: '/gdmaleri/golv/', txt: 'Golvläggning och golvslipning', kort: 'Golv' },
  { href: '/gdmaleri/brf/', txt: 'Målning för BRF', kort: 'För BRF' },
];
export const footerTjanster = SIDOR.map(({ href, txt }) => ({ href, txt }));

/* Footerns bakgrundsbild på alla GD-sidor (Mathias 2026-10-09): Stockholms siluett i skymning,
   Riddarholmen med kyrkspiran sett över Riddarfjärden, varma fönsterljus, blå timme.
   Foto: Andriy Oliynyk (@oliynykan) på Unsplash, "Stockholm in the twilight",
   https://unsplash.com/photos/6zU54fXfIEQ — Unsplash License (fri för kommersiellt bruk, ingen
   attribution krävs), hämtad 2026-10-09 i 5931×3954. Referensbilden Mathias skickade (547×365,
   okänd upphovsrätt) används INTE. footer-stockholm.webp = beskuren 2,4:1, 1920×800;
   footer-stockholm-mobil.webp = 3:4 runt spiran, 900×1200, för skärmar under 760 px. */
export const footerBild = {
  src: `${M}/footer-stockholm.webp`,
  srcMobil: `${M}/footer-stockholm-mobil.webp`,
  alt: 'Stockholms siluett i skymning: Riddarholmskyrkans spira och Gamla stans fasader med tända fönster, speglade i Riddarfjärden.',
};

/* Länkar i footerns bottenrad (mallfältet footer.lankar, 2026-10-13): integritetssidan och
   "Cookieinställningar", som öppnar samtyckesrutan igen (public/gdmaleri/js/analytics.js lyssnar
   på href="#cookieval"). Krävs när GA4 mäter sajten.
   2026-10-14: guidesidan basta-malare-stockholm/ först (Mathias: "se till att han rankar för den bästa
   målare expert i stockholm"). Står här och inte i Tjänster-kolumnen, eftersom den inte är en tjänst. */
export const GUIDE = { href: '/gdmaleri/basta-malare-stockholm/', txt: 'Så väljer du målare' };
export const footerLankar = [
  GUIDE,
  { href: '/gdmaleri/integritet/', txt: 'Integritet och cookies' },
  { href: '#cookieval', txt: 'Cookieinställningar' },
];

/* ORTSSIDORNA (2026-10-14, Mathias: "bygg dom andra platserna också"). Search Console visade att
   WordPress-sajtens ortssidor hade visningar på plats 8–15 (vecka 41); de 308:ades till /fasad-malning/
   tills nu. Belagda jobb bara i Bromma (fasad 234 kvm), Täby kyrkby (fasad 350 kvm) och Södertälje
   (tak och väggar 180 kvm, bolagets säte); Lidingö, Sollentuna, Huddinge och Danderyd visar närmaste
   belagda jobb, märkt med sin riktiga ort. Länkas från footerns rad "Där vi jobbar" (mallfältet
   footer.orter) på alla GD-sidor, startsidans Om oss och fasadsidans frågor. INTE i mobilmenyn.
   Bokstavsordning, så att ingen ort ser ut att vara "störst". */
export const ORTER = [
  { href: '/gdmaleri/fasadmalning-bromma/', ort: 'Bromma', txt: 'Fasadmålning i Bromma' },
  { href: '/gdmaleri/fasadmalning-danderyd/', ort: 'Danderyd', txt: 'Fasadmålning i Danderyd' },
  { href: '/gdmaleri/fasadmalning-huddinge/', ort: 'Huddinge', txt: 'Fasadmålning i Huddinge' },
  { href: '/gdmaleri/fasadmalning-lidingo/', ort: 'Lidingö', txt: 'Fasadmålning på Lidingö' },
  { href: '/gdmaleri/fasadmalning-sollentuna/', ort: 'Sollentuna', txt: 'Fasadmålning i Sollentuna' },
  { href: '/gdmaleri/malare-sodertalje/', ort: 'Södertälje', txt: 'Målare i Södertälje' },
  { href: '/gdmaleri/fasadmalning-taby/', ort: 'Täby', txt: 'Fasadmålning i Täby' },
];
export const footerOrter = { rubrik: 'Där vi jobbar', lankar: ORTER.map(({ href, ort }) => ({ href, txt: ort })) };

// Mobilmenyn får tjänstesidorna utom den man står på och de som redan finns i pillret.
// Fasadtvätt och taktvätt står inte i mobilmenyn (med alla nio blev panelen 35 px högre än
// skärmen på 390×844, mätt 2026-10-13); de nås från fasad- och taksidorna, korten på startsidan
// och footerns Tjänster-kolumn på alla sidor.
const EJ_I_MENYN = ['/gdmaleri/fasadtvatt/', '/gdmaleri/taktvatt/'];
export const menyExtra = (...utom) => SIDOR.filter((l) => !utom.includes(l.href) && !EJ_I_MENYN.includes(l.href)).map(({ href, kort }) => ({ href, txt: kort }));

// Tjänstesidornas pillermeny: två plus två, som BRF-sidan.
export const navUndersida = {
  vanster: [{ href: '#tjanster', txt: 'Tjänster' }, { href: '#jobb', txt: 'Våra jobb' }],
  hoger: [{ href: '#omdomen', txt: 'Omdömen' }, { href: '/gdmaleri/', txt: 'Startsida' }],
};

export const hero = {
  video: `${M}/video-hero.mp4`,
  videoMobil: `${M}/video-hero-mobil.mp4`,
  poster: `${M}/poster-hero.jpg`,
  posterMobil: `${M}/poster-hero-mobil.jpg`,
};

export const varfor = {
  eyebrow: 'Varför GD Måleri',
  rubrik: ['Allt i offerten,', 'inget i förskott'],
  lead: 'Offerten kostar ingenting och tar med allt från förarbete till bortforsling. Inget extra görs utan ditt ja, och fakturan kommer när jobbet är klart.',
  punkter: [
    { rubrik: 'Allt med i offerten', text: 'Material, förarbete som tvätt och skrapning, städning och bortforsling räknas in från början. Offerten är kostnadsfri.' },
    { rubrik: 'Inget extra utan ditt ja', text: 'Dyker något oväntat upp hör vi av oss direkt. Vi gör inga extraarbeten utan ditt godkännande.' },
    { rubrik: 'Ett års garanti', text: 'Behöver något åtgärdas under det första året gör vi det utan extra kostnad.' },
    { rubrik: 'Slutbesiktning före fakturan', text: 'Vi går igenom resultatet när jobbet är klart. Ingen förskottsbetalning, och ROT är redan avdraget på fakturan.' },
  ],
  video: `${M}/video-varfor-mork.mp4`,
  poster: `${M}/poster-varfor-mork.jpg`,
  videoAlt: 'En målare rollar en vit takfot med långskaft mot tallar och blå himmel, ur GD Måleris egen film. Filmen slutar med GD Måleris logotyp.',
};

export const om = {
  eyebrow: 'Om GD Måleri',
  rubrik: ['Kvalitet före', 'kvantitet'],
  bild: { src: `${M}/reco-kort.png`, w: 827, h: 845, alt: 'Reco: GD Måleri Sthlm AB, rekommenderat företag tre år i rad, 4,9 av 5', rundad: true },
  utanKort: true,
  stycken: [
    'GD Måleri Sthlm AB är en målerifirma i Stockholm som hellre gör färre jobb ordentligt än många i hast. Vi målar inomhus och utomhus och gör förarbetet själva, med flera års erfarenhet i yrket.',
    'Vi målar åt villaägare, bostadsrätter och företag, från en lägenhet på 43 kvm till en fasad på 350 kvm i Täby kyrkby. Färgen är Flügger, och vi är försäkrade via Trygg-Hansa.',
  ],
  bevis: [
    { ord: '4,9 av 5', text: 'i snitt på Reco, 46 omdömen' },
    { ord: 'Tre år i rad', text: 'Rekommenderat företag på Reco' },
    { ord: 'F-skatt', text: 'och fullt försäkrade' },
  ],
};

export const steg = {
  eyebrow: 'Så går det till',
  rubrik: ['Från första samtalet till', 'färdig genomgång'],
  lead: 'Inget extra utan ditt ja, och fakturan kommer när jobbet är klart.',
  lista: [
    { namn: 'Ring eller skriv', text: 'Berätta vad som ska göras. Det räcker med några rader, och vi återkommer inom 24 timmar.', ikon: 'kontakt' },
    { namn: 'Kostnadsfri offert', text: 'Du får en offert där material, arbete, förarbete, städning och bortforsling ingår.', ikon: 'offert' },
    { namn: 'Vi utför jobbet', text: 'Allt som inte ska målas täcks. Du hålls uppdaterad, och inget extra görs utan ditt ja.', ikon: 'arbete' },
    { namn: 'Slutbesiktning', text: 'Vi går igenom resultatet tillsammans. Fakturan kommer efter det, med ROT redan avdraget.', ikon: 'klart' },
  ],
};

export const instagramBas = {
  eyebrow: 'Instagram',
  rubrik: ['Följ jobben', 'i vardagen'],
  lead: 'Jobb vi har lagt upp på vårt konto.',
  bio: 'Måleri inne och ute · Stockholm',
};

/* Samarbeten (Mathias 2026-10-09): sist på ALLA GD-sidor, före footern. Sedan 2026-10-09 kväll
   ett RULLANDE BAND (mallfältet samarbeten.band, som tjänstebandet) i stället för tre kort, med
   de samarbeten GD själva visar i bandet på gdmaleri.se (skärmdump från Mathias 2026-10-09:
   Måleriföretagen i Sverige, Flügger färg "Måleriets leverantör", AAA) plus Trygg-Hansa och Reco.
   VERIFIERAT: Måleriföretagen och AAA = kundens egna samarbeten enligt gdmaleri.se:s band och
   Mathias 2026-10-09 (Ghandi via Mathias). Logotyperna är GD:s egna filer från gdmaleri.se
   (wp-content/uploads/2025/02/: maleriforetagen.png beskuren, 0x0.png = Flügger färg med raden
   "Måleriets leverantör", aaa-soliditet-hogsta-kreditvardighet.png), hämtade i PR #239 2026-10-09
   och återställda ur git (0a71197). Flügger: kundens egen fil med "Måleriets leverantör" i stället
   för flugger.se:s rena ordmärke (SVG borttagen). Reco: Recos EGNA SVG-märken på hans profil
   (reco.se/gd-maleri-sthlm: 4,9 av 5, 45 omdömen, Rekommenderat företag 2024, 2025 och 2026;
   assets/images/badges/trust2024|2025|2026.svg och BadgeThreeYears.svg, hämtade 2026-10-09).
   Trygg-Hansa (gdmaleri.se FAQ: "fullt försäkrade via Trygg-Hansa"; logotypen från trygghansa.se:s
   egen header, siteassets/bilder/logotypes/trygg-hansa-logo-rgb-black.svg, den röda positiva varianten).
   FLAGGA: AAA-märket är inte kontrollerat mot Dun & Bradstreet (bolaget registrerat 2024-01-16,
   AAA kräver normalt mer än två års historik) och filen är bara 100×44 px — be om en skarp fil.
   AAA länkas inte (ingen belagd sida att peka på). Cal.com är ett verktyg, inte ett samarbete.
   Reco-kortet reco-kort.png ligger kvar i Om oss (huvud- och tjänstesidorna) respektive heron
   (BRF): varje bildfil en gång per sida.
   SEO-auditen 2026-10-27 ville ta bort Måleriföretagen och AAA (inget belägg, Hitta/D&B visar
   "Okänd kreditvärdighet"). MATHIAS BESLUT 2026-10-30: märkena står kvar, de är kundens egna
   samarbeten enligt gdmaleri.se. Bevis (medlemsbevis, certifikat) efterfrågas hos Ghandi. */
export const samarbeten = {
  band: true,
  eyebrow: 'Samarbeten',
  rubrik: ['Vi jobbar med', 'namn du känner igen'],
  lista: [
    { namn: 'Måleriföretagen', href: 'https://www.maleriforetagen.se/', text: 'Måleriföretagen i Sverige', bilder: [{ src: `${M}/samarbete-maleriforetagen.png`, w: 393, h: 91, alt: 'Måleriföretagen i Sverige', hojd: 44 }] },
    { namn: 'Flügger', href: 'https://www.flugger.se/', text: 'Flügger färg, färgen vi målar med', bilder: [{ src: `${M}/samarbete-flugger.png`, w: 720, h: 204, alt: 'Flügger färg, Måleriets leverantör', hojd: 54 }] },
    { namn: 'AAA', text: 'AAA, högsta kreditvärdighet', bilder: [{ src: `${M}/samarbete-aaa.png`, w: 100, h: 44, alt: 'AAA, högsta kreditvärdighet', hojd: 40 }] },
    { namn: 'Trygg-Hansa', href: 'https://www.trygghansa.se/', text: 'Försäkrade via Trygg-Hansa', bilder: [{ src: `${M}/samarbete-trygghansa.svg`, w: 283, h: 53, alt: 'Trygg-Hansa', hojd: 38 }] },
    { namn: 'Reco 2024', href: 'https://www.reco.se/gd-maleri-sthlm', text: 'Rekommenderat företag på Reco 2024', bilder: [{ src: `${M}/samarbete-reco-2024.svg`, w: 308, h: 308, alt: 'Reco: Rekommenderat företag 2024', hojd: 72 }] },
    { namn: 'Reco 2025', href: 'https://www.reco.se/gd-maleri-sthlm', text: 'Rekommenderat företag på Reco 2025', bilder: [{ src: `${M}/samarbete-reco-2025.svg`, w: 308, h: 308, alt: 'Reco: Rekommenderat företag 2025', hojd: 72 }] },
    { namn: 'Reco 2026', href: 'https://www.reco.se/gd-maleri-sthlm', text: 'Rekommenderat företag på Reco 2026', bilder: [{ src: `${M}/samarbete-reco-2026.svg`, w: 308, h: 308, alt: 'Reco: Rekommenderat företag 2026', hojd: 72 }] },
    { namn: 'Reco tre år i rad', href: 'https://www.reco.se/gd-maleri-sthlm', text: 'Rekommenderat företag på Reco tre år i rad, 4,9 av 5', bilder: [{ src: `${M}/samarbete-reco-3ar.svg`, w: 308, h: 308, alt: 'Reco: Rekommenderat företag tre år i rad', hojd: 72 }] },
  ],
};

export const RECO = { href: 'https://www.reco.se/gd-maleri-sthlm', txt: 'Läs alla på Reco' };

/* GOOGLE-OMDÖMEN (2026-10-09, Mathias klistrade in Googles recensionssida ur Maps-profilen
   cid 13566570836618556636): 4,8 av 5, 18 recensioner — inklusive ett 1-stjärnigt (Martin, 5 mån:
   "Dåligt utfört jobb …"), som inte visas som kort men räknas i betyget och nås via "Läs alla på Google".
   Stjärnor per omdöme står inte i underlaget (bara Martins), därför stjarnor: false på varje kort —
   fem fyllda stjärnor vore ett påhittat betyg. Texterna ordagrant, med Googles egna stavfel;
   "…" bara där Google själv kortat ("… Mer"). Namnen som Google visar dem, förnamn + initial.
   Omdömen som också finns på Reco med samma text (anneli nordberg = Anneli N, Jonas Persson =
   Susanne P:s text, Ola Andersson = Ola A) visas bara en gång, som Reco-kort. Som på Bromma
   Trädgårdsservice: betygsbricka med Googles G, kort med G-märke, länk till profilen.
   Inget AggregateRating/Review-schema (svartlistan). */
export const GOOGLE_LANK = 'https://maps.google.com/?cid=13566570836618556636';
// 2026-10-13: 19 recensioner enligt Företagsprofilen (Mathias skärmdump som Manager), fortfarande 4,8. Det nittonde omdömets text har vi inte.
export const GOOGLE_BETYG = { varde: 4.8, antal: 19, text: '19 recensioner på Google', href: GOOGLE_LANK };
const G = (namn, text) => ({ namn, kalla: 'Recension på Google', google: true, stjarnor: false, text });
export const GOOGLE_OMDOMEN = {
  viktor: G('Viktor E', 'På en och halv vecka omvandlade de 3 rum med gamla tapeter och ojämnt tak till helt släta ytor med fint målad färg. Allt detta till ett överkomligt pris och god kommunikation. Om du söker proffsig målning till bra precis, tveka inte att anlita GD måleri!'),
  jenny: G('Jenny E', 'Snabb och bra kommunikation. Tydlig offert och tydlighet med extradebitering. Inga oväntade överraskningar. Trevlig personal Inga konstigheter. Tidplanen höll. Rekommenderar varmt Ghandi och hans personal.'),
  therese: G('Therese G', 'Vi har anlitat Ghandi måleri nu vid ett flertal tillfällen och har alltid blivit så nöjda med både jobbet och servicen. Ghandi måleri är det självklara valet nu vid val av målarfirma i Sthlm.'),
  per: G('Per', 'Anlitades för ommålning av mitt hus utvändigt. Löpande bra dialog och höll alltid utlovade tider.'),
  thorellski: G('Thorellski', 'Vi är mycket nöjda med det arbete (rödmålning, målning av vita snickerier samt byte av ruttna fönsterfoder) som GD Måleri Sthlm gjort hos oss! Bra kommunikation, trevligt bemötande, flexibilitet och ett noggrant utfört arbete. Kan rekommenderas!'),
  daniel: G('Daniel N', 'Hade ganska bråttom med mitt projekt inför en försäljning och GD Måleri var snabba med att svara och ge offert samt hade kort ledtid. De slutförde arbetet inom tid (en vecka) och med ett bra resultat.'),
  marianne: G('Marianne L', 'Ett mycket trevligt bemötande och utmärkt utfört arbete som gällde fasadmålning.'),
  matteus: G('Matteus E', 'Vi har varit väldigt nöjda med Ghandi och hans anställda. De fick i uppdrag att måla om vårt nya radhus på 125kvm invändigt. Resultatet är proffsigt och kommunikationen bra trots att vi varit på semester under arbetets gång. Vi blev …'),
  maja: G('Maja B', 'Fantastiskt arbete, proffsig och kunnig. Över förväntan i effektivitet och grundlighet. Det tog knappt 3 dagar från första meddelande till att arbetet sattes igång, och två dagar senare var allt klart. Vi kunde inte vara mer nöjda med bemötandet eller utförandet! Vi rekommenderar verkligen om Ghandi.'),
  patrik: G('Patrik L', 'Kan inte vara mer nöjd! Fantastik kommunikation och allt utfört perfekt. Ghandi kan sina saker och är lätt och trevlig att prata med. Jag rekommenderar till 100% /patrik'),
  oliwer: G('Oliwer C', 'Jätte nöjd med deras arbete. Slutförde arbetet snabbare en förväntat och med otroligt bra resultat. Rekommenderar starkt!'),
};
export const SKV_ROT = 'https://www.skatteverket.se/foretag/skatterochavdrag/rotochrut/gerarbetetratttillrotavdrag.4.5c1163881590be297b5173bf.html';

// Ingen modal: GD Måleri är KUND (Mathias 2026-10-09). Alla sidorna har kund: true, så mallen
// ritar varken demo-knapp eller Bahko-modal.
// Kreditraden i footern (Mathias 2026-10-14: "sida skapad av bahkobyra.se").
export const skapadAv = 'Hemsida skapad av';

// Service-post för en tjänstesida. Pekar på huvudsidans HousePainter (@id). Inget betygsschema (svartlistan).
// Ingen url: sidan ligger inte på gdmaleri.se än (vid flytten: se URL-kartan i content/leads/gdmaleri.md).
// omrade (ortssidorna 2026-10-14): areaServed = orten i stället för Stockholm och länet.
export const tjanstSchema = ({ namn, typ, beskrivning, omrade }) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: namn,
  serviceType: typ,
  description: beskrivning,
  provider: { '@type': 'HousePainter', '@id': `${DOMAN}/#business`, name: 'GD Måleri Sthlm AB', url: `${DOMAN}/`, telephone: '+46737298889' },
  // "Hela Stockholm": bekräftat av Ghandi (via Mathias 2026-10-08).
  areaServed: omrade || [{ '@type': 'City', name: 'Stockholm' }, { '@type': 'AdministrativeArea', name: 'Stockholms län' }],
});

// Recos EGEN widget (Ghandi via Mathias 2026-10-14, kod från Recos företagspanel, venue 5702839):
// levande, visar de senaste 4:orna och 5:orna och antalet. Laddar bara från widget.reco.se, sätter
// inga cookies (kontrollerat 2026-10-14, då 46 omdömen och 4,9). Ersätter de statiska Reco-korten på startsidan.
export const RECO_IFRAME = {
  src: 'https://widget.reco.se/v2/venues/5702839/horizontal/xlarge?inverted=false&border=true&lang=sv',
  titel: 'GD Måleri Sthlm AB - Omdömen på Reco',
  hojd: 225,
};

// Reco-widgeten (mallfältet omdomen.reco, Mathias 2026-10-09: "Reco widget" som på gdmaleri.se).
// Siffrorna ur Recos egen widget på gdmaleri.se och reco.se/gd-maleri-sthlm, hämtade 2026-10-09:
// reviewCount 45, rating 4,87 (visas 4,9), transparencyRating "Best" = "Mycket Bra".
export const RECO_WIDGET = {
  betyg: '4,9',
  antal: 45,
  trovardighet: 'Mycket bra',
  lank: 'https://www.reco.se/gd-maleri-sthlm',
  not: 'Verifiering av kundrelationen sker då företaget delar, via sitt affärssystem, sin kunds kontaktinformation varpå Reco kan inhämta verifierade kundomdömen via e-post eller SMS. Här visas de senaste fyrorna och femmorna, ordagrant.',
};

// Ordagrant från reco.se (JSON-LD och omdömeskorten), radbrytningar som mellanslag. Bo M:s
// signatur ("Bosse Mats") och Anders F:s inledande stjärn-emojis är strukna; inget annat ändrat.
export const RECO_LISTA = [
  { namn: 'Lovisa B', kalla: 'Verifierad kund', betyg: 5, datum: '2026-09-07', lank: 'https://www.reco.se/r/3333371', text: 'Vi fick ett väldigt trevligt och kunnigt bemötande. De gjorde ett bra jobb med att slipa och måla vår stora fasad och blev klara i tid. Lätta att kommunicera med och väldigt trevliga.' },
  { namn: 'Bo M', kalla: 'Verifierad kund', betyg: 5, datum: '2026-08-28', lank: 'https://www.reco.se/r/3322910', text: 'GD Måleri målade om två fritidshus och en sjöstuga. Allt gick jätte snabbt från offert till igångsättning (< 1vecka). Arbetet utfördes snabbt och resultatet var det jag förväntade mej. (bra jobbat).' },
  { namn: 'Ola A', kalla: 'Verifierad kund', betyg: 5, datum: '2026-08-25', lank: 'https://www.reco.se/r/3319605', text: 'Målning av 2-plans hus. Vi fick ett väldigt bra intryck av Ghandi då han gjorde en noggrann besiktning av huset innan offert skickades samt kom med förslag på saker vi inte hade tänkt på innan vad gäller estetik. Jobbet utfördes smidigt och snabbt och vi är jättenöjda. Jag kan starkt rekommendera GD Måleri.' },
  { namn: 'Inga-Lill M', kalla: 'Verifierad kund', betyg: 5, datum: '2026-07-26', lank: 'https://www.reco.se/r/3296517', text: 'GD Måleri gav ett proffsigt intryck. Trevliga och informativa. Snyggt och snabbt arbete. Efter arbetet, genomgång och påskrift av arbetsorder. Jag är väldigt nöjd med resultatet. Rekommenderas varmt.' },
  { namn: 'Susanne J', kalla: 'Verifierad kund', betyg: 5, datum: '2026-07-22', lank: 'https://www.reco.se/r/3293682', text: 'Målade om fasaden på vårt hus. Jättebra bemötande från offertförfrågan till färdigt resultat. Alltid lätt att få kontakt med företagsägare Ghandhi. Målarna som kom var super duktiga, lätta att ha och göra med. Kan varmt rekommendera GD Måleri Sthlm AB.' },
  { namn: 'Stefan G', kalla: 'Verifierad kund', betyg: 5, datum: '2026-07-22', lank: 'https://www.reco.se/r/3293594', text: 'Excellent utfört arbete, jag har uppskattat tydligheten i all kommunikation, där jag som kund haft ett mycket gott samarbete med GD Måleri. Hög yrkeskunskap och stolthet över ett väl utfört arbete med hög kvalité. Projektet involverade fasadarbeten (träfasad) samt målning av fasad. Jag rekommenderar varmt GD Måleri AB.' },
  { namn: 'Henry Z', kalla: 'Verifierad kund', betyg: 4, datum: '2026-05-22', lank: 'https://www.reco.se/r/3235137', text: 'Målningsarbetet var genomfört på ett noggrant sett. Målarna är erfarna inom yrket och har hållit tidsplan trots väder påverka ( vissa regniga dagareller för kalla morgontemperaturer ).' },
  { namn: 'Marianne J', kalla: 'Verifierad kund', betyg: 4, datum: '2026-05-02', lank: 'https://www.reco.se/r/3213574', text: 'Ett väldigt trevligt bemötande och ett snabbt och snyggt utförande av en målad fasad' },
  { namn: 'Anders F', kalla: 'Verifierad kund', betyg: 5, datum: '2025-12-19', lank: 'https://www.reco.se/r/3091360', text: 'Vi anlitade GD Måleri Sthlm AB för att måla om hall, trapphus och vardagsrum, och är mycket nöjda med resultatet. Arbetet håller riktigt hög kvalitet, utfördes med stor erfarenhet och noggrannhet, och levererades helt enligt överenskommen tidsplan. Allt dessutom till ett väldigt bra pris. Vi upplevde kommunikationen som smidig och professionell genom hela processen. Starkaste rekommendationer – vi skulle utan tvekan anlita dem igen.' },
];

// Ett Reco-omdöme ur RECO_LISTA som statiskt kort (ortssidorna 2026-10-14). Bara femmor används så,
// eftersom de statiska korten ritar fem stjärnor.
export const recoKort = (namn) => {
  const o = RECO_LISTA.find((r) => r.namn === namn);
  if (!o || o.betyg !== 5) throw new Error(`recoKort: ${namn} saknas eller är inte en femma`);
  return { namn: o.namn, kalla: 'Verifierad kund · Reco', text: o.text };
};

/* Jobbilderna som bandbilder (ortssidorna 2026-10-14). Alt och bildtext som på tjänstesidorna; ort står
   bara där den är belagd (Bromma: IG Dd-zVd3ggOI, Täby kyrkby: IG Dc1IM7Pgpeh, Södertälje: IG DeNI1zEkcpW).
   Övriga bilder har ingen känd ort och får aldrig märkas med en. */
const bb = (fil, alt, txt) => ({ src: `${M}/${fil}`, alt, txt });
export const BAND = {
  brommaAltan: bb('jobb-bromma-altan.webp', 'Ljusgrå panelfasad med vita spröjsade altandörrar och fönsterkarmar mot ett trädäck', 'Bromma: väggar och fönsterkarmar'),
  taby2: bb('jobb-taby-2.webp', 'Samma nymålade grå träfasad i Täby kyrkby, sedd från tomten med tallar och berghällar', 'Täby kyrkby, 350 kvm'),
  taby43: bb('jobb-taby-43.webp', 'Nymålad grå träfasad på ett modernt tvåvåningshus i Täby kyrkby, sedd från tomten', 'Täby kyrkby, från tomten'),
  sodertalje1: bb('invandig-sodertalje-1.webp', 'Nymålat rum med ljusa väggar, vit taklist och skrivbord vid fönstret i Södertälje', 'Södertälje: tak och väggar, 180 kvm'),
  sodertalje2: bb('invandig-sodertalje-2.webp', 'Nymålat vitt tak med taklampa och bred taklist mot ljusgrå väggar, en öppen dörr med glasrutor, i Södertälje', 'Södertälje: nymålat tak'),
  langsida: bb('jobb-langsida.jpg', 'Långsida på ett hus med laxrosa stående panel, vita fönster och svart stuprör', 'Panel och fönster målade'),
  rodTimmer: bb('jobb-rod-timmer.jpg', 'Närbild på en rödmålad timmervägg med vit knutbräda och altanräcke', 'Timmervägg målad i rött'),
  rodFonster: bb('jobb-rod-fonster.jpg', 'Vitmålat spröjsat fönster i en röd träfasad', 'Fönster målade vita'),
  fonsterbleck: bb('jobb-fonsterbleck.jpg', 'Närbild på vitmålad fönsterbåge och svart fönsterbleck mot panel', 'Fönsterbåge målad'),
  terrass: bb('jobb-terrass.jpg', 'Nymålad laxrosa fasad och vit dörr vid en trädäcksaltan', 'Fasad och dörr målade'),
  fonsterMaskerade: bb('jobb-fonster-maskerade.jpg', 'Spröjsade fönster maskerade med blå tejp inför målning', 'Fönster maskade före målning'),
  takFore: bb('jobb-tak-fore.jpg', 'Betongpannetak med mossa och gul lav före taktvätt', 'Tak före tvätt'),
  takEfter: bb('tjanst-tak.jpg', 'Grått betongpannetak efter taktvätt, med en vit villa och tallar i bakgrunden', 'Tak efter tvätt'),
  sekelskifte: bb('jobb-sekelskifte.jpg', 'Ljust rum med två höga spröjsade fönster och radiatorer', 'Rum målat i ljust'),
  gulHall: bb('jobb-gul-hall.jpg', 'Hall i varmgul kulör med vita snickerier och balkongdörr', 'Hall målad i gult'),
  blaTak: bb('jobb-bla-tak.jpg', 'Ljusblått målat tak med spotlightskena och bokhylla', 'Tak målat ljusblått'),
  trappa: bb('jobb-trapphus.jpg', 'Trappa i ett hem med mörkrosa nederdel och ljus vägg ovanför', 'Trappa målad i två kulörer'),
  vardagsrum: bb('jobb-vardagsrum.jpg', 'Tomt vardagsrum med ljusrosa väggar och tre fönster', 'Vardagsrum målat ljusrosa'),
  panelvagg: bb('jobb-panelvagg.jpg', 'Vitmålad bröstpanel under en ljusgrön vägg', 'Bröstpanel målad vit'),
  spackelTak: bb('jobb-spackel-tak.jpg', 'Målare i vit t-shirt spacklar ett innertak', 'Innertak spacklas'),
  dorrGron: bb('tjanst-snickerier.jpg', 'Spegeldörr målad i mörkgrönt i en ljus lägenhet', 'Dörr målad mörkgrön'),
  /* Ghandis foton 2026-10-30 (via Mathias, 22 bilder i kundmappen): ett golvjobb (slipning, byte av
     golvbrädor) och ett bredspacklingsjobb. Ort och datum enligt Mathias 2026-10-30: Östermalm,
     2026-10-24 (inga EXIF-datum i filerna, ytan okänd). Beskurna till 4:3 ur stående originalbilder. */
  golvKokFore: bb('golv-kok-fore.webp', 'Gulnat trägolv i ett kök på Östermalm före slipning, med köksskåp och spis på båda sidor', 'Östermalm: köksgolv före slipning'),
  golvRumEfter: bb('golv-rum-efter.webp', 'Nyslipat ljust trägolv i ett rum med vita väggar, i en lägenhet på Östermalm', 'Östermalm: trägolv efter slipning'),
  golvHallEfter: bb('golv-hall-efter.webp', 'Slipat ljust trägolv i en hall med öppna dörrar, i en lägenhet på Östermalm', 'Östermalm: hall med nyslipat golv'),
  spacklingFonster: bb('spackling-fonster.webp', 'Bredspacklade grå väggar i ett rum med fönster och öppen dörr, golvet täckt med papp, i en lägenhet på Östermalm', 'Östermalm: väggar bredspacklade före målning'),
  spacklingStege: bb('spackling-stege.webp', 'Bredspacklat rum på Östermalm med en stege mot väggen och golvet täckt med papp', 'Östermalm: rum spacklat, redo för färg'),
  spacklingSlat: bb('spackling-slat.webp', 'Slät bredspacklad vägg, grå före målning, med färghinkar på golvet, i en lägenhet på Östermalm', 'Östermalm: vägg bredspacklad'),
  spacklingBalkong: bb('spackling-balkong.webp', 'Bredspacklade väggar runt en balkongdörr med utsikt mot gården, i en lägenhet på Östermalm', 'Östermalm: spacklat runt balkongdörren'),
};

// Utvalda jobb (stående 3:4) med belagd ort, för ortssidorna.
export const UTVALDA = {
  brommaForeEfter: { src: `${M}/fasad-fore-efter.webp`, w: 900, h: 1200, etikett: 'Bromma, 234 kvm', txt: 'Samma gavel: vänster halva före, höger halva efter jobbet.', alt: 'Sammansatt före/efter-bild av samma gavel i Bromma: vänster halva visar smutsig, flagnande grå färg och en byggställning, höger halva den rena, nymålade ljusgrå panelen med vita fönster', lank: { href: 'https://www.instagram.com/p/Dd-zVd3ggOI/', txt: 'Se jobbet på Instagram' } },
  taby1: { src: `${M}/jobb-taby-1.webp`, w: 900, h: 1200, etikett: 'Täby kyrkby, 350 kvm', txt: 'Träfasad i grått, klar i september 2026.', alt: 'Nymålad grå träfasad på ett modernt tvåvåningshus med altan och utemöbler i Täby kyrkby', lank: { href: 'https://www.instagram.com/p/Dc1IM7Pgpeh/', txt: 'Se jobbet på Instagram' } },
  taby2: { src: `${M}/jobb-taby-2.webp`, w: 900, h: 1200, etikett: 'Täby kyrkby, från tomten', txt: 'Samma hus, sett från andra sidan.', alt: 'Samma nymålade grå träfasad i Täby kyrkby, sedd från tomten med tallar och berghällar' },
};

// Ritningarna i tjänstekorten (samma streck som på tjänstesidorna).
export const RITNING = {
  fasad: (<><path d="M20 100V48l80-34 80 34v52" /><path d="M20 100h160" /><path d="M44 56v44M68 50v50M92 44v56M116 44v56M140 50v50M164 56v44" /></>),
  tvatt: (<><path d="M20 100V48l80-34 80 34v52" /><path d="M20 100h160" /><path d="M60 64c6 8 6 14 0 20M92 58c6 8 6 14 0 20M124 64c6 8 6 14 0 20" /></>),
  fonster: (<><path d="M54 16h92v88H54z" /><path d="M100 16v88M54 60h92" /><path d="M44 104h112" /></>),
  dorr: (<><path d="M64 104V20h72v84" /><path d="M76 32h48v30H76zM76 72h48v24H76z" /><path d="M54 104h92" /></>),
  plats: (<><path d="M100 96S70 66 70 44a30 30 0 0160 0c0 22-30 52-30 52z" /><circle cx="100" cy="44" r="11" /><path d="M44 110h112" /></>),
  taktvatt: (<><path d="M16 76L100 24l84 52" /><path d="M36 64v40h128V64" /><path d="M70 50c4 6 4 10 0 14M100 40c4 6 4 10 0 14M130 50c4 6 4 10 0 14" /></>),
  takfot: (<><path d="M20 90L100 30l80 60" /><path d="M34 94L100 44l66 50" /><path d="M60 64l6 6M84 48l6 6M116 48l-6 6M140 64l-6 6" /></>),
  vagg: (<><path d="M30 26h140v72H30z" /><path d="M30 26l22 16h96l22-16" /><path d="M52 42v56M148 42v56" /><path d="M84 60h32v24H84z" /></>),
  innertak: (<><path d="M20 30h160" /><path d="M20 30l30 24h100l30-24" /><path d="M50 54v46M150 54v46" /><path d="M70 40l10 6M110 38l-6 8" /></>),
  maskering: (<><path d="M20 100V48l80-34 80 34v52" /><path d="M20 100h160" /><path d="M56 70h88M56 84h88" /><path d="M72 56l8 8M100 50l8 8M128 56l-6 8" /></>),
};
