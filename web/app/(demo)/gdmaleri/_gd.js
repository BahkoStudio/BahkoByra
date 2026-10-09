/* ===========================================================================
   GD MÅLERI STHLM AB — det som är gemensamt för alla GD-sidor:
   huvudsidan (page.js), BRF (brf/) och tjänstesidorna invandig-malning/, fasad/,
   tak/ och golv/ (2026-10-08, efter förebilden marlonshantverksgrupp.se som
   Ghandi skickade: en sida per tjänst, kundtyp i formuläret, svarstid).
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
  // Vardagar 08–17: bekräftat av Ghandi (via Mathias 2026-10-08).
  oppet: 'Vardagar 08–17',
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
  not: 'Kostnadsfri offert vid ett hembesök på 45 minuter, vardagar 08–17.',
  ringUrl: 'https://cal.com/gdmaleri/ring-mig',
  ringTxt: 'Boka att Ghandi ringer upp',
  kortTxt: 'Eller boka offertbesök',
  inbaddad: {
    eyebrow: 'Boka online',
    rubrik: ['Boka offertbesök', 'direkt'],
    lead: 'Välj en tid som passar – Ghandi kommer hem till dig. Vardagar 08–17.',
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
export const SIDOR = [
  { href: '/gdmaleri/invandig-malning/', txt: 'Invändig målning och tapet', kort: 'Invändig målning' },
  { href: '/gdmaleri/fasad/', txt: 'Fasadtvätt och fasadmålning', kort: 'Fasad' },
  { href: '/gdmaleri/tak/', txt: 'Taktvätt och takmålning', kort: 'Tak' },
  { href: '/gdmaleri/golv/', txt: 'Golvläggning och golvslipning', kort: 'Golv' },
  { href: '/gdmaleri/brf/', txt: 'Målning för BRF', kort: 'För BRF' },
];
export const footerTjanster = SIDOR.map(({ href, txt }) => ({ href, txt }));

// Mobilmenyn får tjänstesidorna utom den man står på och de som redan finns i pillret.
export const menyExtra = (...utom) => SIDOR.filter((l) => !utom.includes(l.href)).map(({ href, kort }) => ({ href, txt: kort }));

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
  rubrik: ['Ägaren driver', 'firman själv'],
  bild: { src: `${M}/reco-kort.png`, w: 827, h: 845, alt: 'Reco: GD Måleri Sthlm AB, rekommenderat företag tre år i rad, 4,9 av 5', rundad: true },
  utanKort: true,
  stycken: [
    'GD Måleri Sthlm AB är målare i Stockholm, och firman drivs av Ghandi Danho. Vi målar inomhus och utomhus och gör förarbetet själva, med flera års erfarenhet i yrket.',
    'Vi målar åt villaägare, bostadsrätter och företag, från en lägenhet på 43 kvm till en fasad på 350 kvm i Täby kyrkby. Färgen är Flügger, och vi är försäkrade via Trygg-Hansa.',
  ],
  bevis: [
    { ord: '4,9 av 5', text: 'i snitt på Reco, 45 omdömen' },
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

export const RECO = { href: 'https://www.reco.se/gd-maleri-sthlm', txt: 'Läs alla på Reco' };
export const SKV_ROT = 'https://www.skatteverket.se/foretag/skatterochavdrag/rotochrut/gerarbetetratttillrotavdrag.4.5c1163881590be297b5173bf.html';

export const modal = {
  rubrik: 'Så här kan GD Måleri se ut på nätet',
  text: 'Det här är ett förslag, byggt på det ni själva visar på gdmaleri.se, Instagram och Reco, med era egna projektfoton. Ingen beställning, inget åtagande. Boka ett kostnadsfritt 15-minuterssamtal med Mathias.',
};

// Service-post för en tjänstesida. Pekar på huvudsidans HousePainter (@id). Inget betygsschema (svartlistan).
// Ingen url: sidan ligger inte på gdmaleri.se än (vid flytten: se URL-kartan i content/leads/gdmaleri.md).
export const tjanstSchema = ({ namn, typ, beskrivning }) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: namn,
  serviceType: typ,
  description: beskrivning,
  provider: { '@type': 'HousePainter', '@id': `${DOMAN}/#business`, name: 'GD Måleri Sthlm AB', url: `${DOMAN}/`, telephone: '+46737298889' },
  // "Hela Stockholm": bekräftat av Ghandi (via Mathias 2026-10-08).
  areaServed: [{ '@type': 'City', name: 'Stockholm' }, { '@type': 'AdministrativeArea', name: 'Stockholms län' }],
});

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

// Partnerbandet (mallfältet d.partner, Mathias 2026-10-09): samma fyra märken som i
// gdmaleri.se:s sidfot. Filerna är deras egna från sajten (wp-content/uploads/2025/02/:
// 0x0.png = Flügger, maleriforetagen.png, aaa-soliditet-hogsta-kreditvardighet.png) och
// Recos egen märkesfil trust2024.svg (samma märke som sajtens Unknown.jpg, skarpare).
// Se FLAGGOR om Måleriföretagen och AAA.
export const PARTNER = {
  etikett: 'Märken och leverantörer',
  lista: [
    { src: `${M}/partner-maleriforetagen.png`, w: 393, h: 91, hojd: 40, alt: 'Måleriföretagen i Sverige' },
    { src: `${M}/partner-flugger.png`, w: 720, h: 204, hojd: 52, alt: 'Flügger färg, Måleriets leverantör' },
    { src: `${M}/partner-aaa.png`, w: 100, h: 44, hojd: 40, alt: 'AAA, högsta kreditvärdighet' },
    { src: `${M}/partner-reco-2024.png`, w: 320, h: 320, hojd: 76, alt: 'Reco: Rekommenderat företag 2024' },
  ],
};
