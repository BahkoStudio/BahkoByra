import DemoSida from '../_mall/DemoSida';

/* ===========================================================================
   RENA RÖR I VÄST AB — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: Mathias 2026-11-11 · renaror.se + instagram.com/renaror · avlopp
   (spolning, kamera, stamspolning, jour, brunnar, avloppsbyte) i Göteborg.
   Byggd 2026-11-11 på demomallen v3 (närmast: stahlgrensvvs).

   Bärande idé: du vet priset innan vi kommer. Branschen har rykte om sig
   att ta betalt i efterhand, särskilt på jouren. Rena Rör har fasta priser
   i en öppen prislista, bekräftar pris vid bokning ("lämnar pris innan vi
   kommer"), avråder själva från filmning som inte behövs och kör mindre
   spolbilar för att hålla kostnaden nere. Sajtens egen titel: "allt som rör
   husets avlopp, till ett schysst pris". Idén står i Varför-sektionen och
   ekar i tjänsternas ingress, frågorna, kontakten och popupen.

   VERIFIERAT (2026-11-11):
   - renaror.se, alla 13 sidor lästa (start, sju tjänstesidor, tre
     problemsidor, prislista, kontakt): "Rena Rör i Väst AB, Bååthsgatan 5,
     417 20 Göteborg", 0704 139 700 "(Dygnet runt)", kontakt@renaror.se.
     "Vi servar Göteborg med omnejd (även jour!)", "jourtjänst dygnet runt och
     året runt", orterna "Göteborg, Partille, Mölndal, Kungsbacka, Kungälv,
     Ale och Mölnlycke med flera". "fulltjänstföretag när det kommer till
     avlopp, vi gör också kamerainspektion, slamsugning, stamrensning,
     hetvattenspolning och tinar frusna avlopp. Skulle dina avloppsledningar
     behöva bytas gör vi även grävjobb." "Rena Rör hjälper dig även med
     ROT-avdrag." Motto: "kunden skall få hjälp på utsatt tid, med minsta
     möjliga olägenhet och till ett bra pris." "kundnöjdhetsgaranti på våra
     jobb, om du inte är nöjd kommer vi arbeta tills dina förväntningar har
     uppfyllts". Team: Claudio Congiu (ägare och avloppstekniker), Martin
     Andersson och Vahid Rostami (avloppstekniker). Egna siffror: "12 års
     erfarenhet", "3400+ kunder", "8000+ utförda jobb".
   - Prislistan ("Prislista 2025", renaror.se/prislista + /avloppsspolning):
     privat, inkl. moms efter ROT-avdrag: spolning med efterkontroll 2 250 kr ·
     spolning + filmning 3 500 kr · spolning + filmning + dokumentation och
     filmfiler 4 750 kr. I alla ingår en timmes arbete, framkörningsavgift,
     kök/toalett/avloppsbrunn, hetvattenspolning 60 °C, roterande munstycken,
     kontroll av vattenlås. Företag/BRF: stamspolning 5–10 lgh 995 kr/lgh ex
     moms (kök, golvbrunnar, tvättställ, demontering/kontroll av vattenlås,
     spolning av utgående stammar), fler än 10 lgh offert.
   - Spolbilssidan: "bekräftar vi din bokning och lämnar pris innan vi
     kommer", bokningsformuläret frågar efter fastighetsbeteckning för ROT.
     "valt att använda mindre spolbilar … mer kostnadseffektiv", "minskar
     viktbelastningen på uppfarter och tomter", "mindre drivmedelskostnad".
   - Stopp i avlopp: filmning "är inget vi rekommenderar om det verkligen
     inte behövs", "hetvattenpanna i bilen", "bara rent vatten", säg till om
     du använt propplösare "för vår säkerhet". Stopp i toaletten: häll inte
     kokande vatten, porslinet kan spricka. Byta avlopp: "som tumregel får man
     räkna med ett par veckor", inspektion → offert → utförande, "återställer
     även trädgård så gott det går", gjutjärn 40+ år, vita plaströr i 60- och
     70-talsvillor, ROT ("Vi hjälper dig med pappersarbetet"). Brunn: "en
     brunn som är 50-60 år" går inte alltid att rädda, då byts den.
   - allabolag.se/5569218927: Rena rör i väst AB, org.nr 556921-8927,
     Bååthsgatan 5, registrerat 2013-02-07, Claudio Paolo Andrea Congiu.
   - Google Maps (cid 11694852875622201275, läst 2026-11-11): 4,7 av 5,
     14 recensioner (13 × 5 stjärnor, 1 × 1 stjärna), "Avloppshantering",
     070-413 97 00. Lennart Skoglund och Kjell Hellström, 5 stjärnor, ordagrant.
   - Omdömena på renaror.se (Julia Stuxgren, Fredrik Sjölin, Tom Vujnovac, David Ljunggren):
     ordagrant, utan stjärnor i källan.
   - Instagram @renaror ("Claudio", 159 följare, 49 inlägg, läst 2026-11-11).
     Bildtexterna styr jobbandens texter: brf i Gårda, genomrostat rör i garage
     (DY9oEj5jcBb) · relining i Eriksberg (DY9nmNKDbLw) · dränering av två
     väggar i Tuve, dag-/spillvatten separerat, pumpbrunn (DY9neXmjTJR) · ny
     vattenledning besiktigad (DYsWM_IjXAQ) · ny renslucka under trappa
     (DYlnXolDeT_) · rötter i utgående ledning i Tuve, omläggning
     (DYW4IANDQN5) · ny pumpbrunn i Andalen godkänd av kommunen (DZN8G7vDYgJ) ·
     avlopp hos Magasinet Barbecue i Hällingsjö (DZN7VzdDfSb) · stopp på Glimra
     biltvätt (DZN6mC_txzj) · stopp i skärgården (DZN6ihfDbCy) · nytt
     grävprojekt (DZN9RX3jdYp).

   INTE verifierat, och finns därför INTE på sidan: svarstid/inställelsetid,
   jourpris och vad som gäller efter första timmen, garantitider, certifikat
   och försäkring, öppettider på kontoret (Google: "stänger kl. 17"),
   Facebook.

   FLAGGOR:
   - PRISERNA är från "Prislista 2025". ROT-avdraget var tillfälligt 50 % under
     2025 och är åter 30 % från 2026: fråga Claudio om priserna "efter ROT"
     gäller än, innan förslaget blir skarpt.
   - Herofilmen (igensatt brunn på en uppfart spolas ren) är en GENERERAD
     illustration: Qwen Image 3 (A och B) + Wan 3.0 Prime 5 s. Kontaktfilmen
     är samma film suddad. Ingen not på sidan (Mathias regel), sägs i
     förslagsrutan (modal).
   - Varför-filmen: deras eget foto av Martin vid spolbilen (renaror.se) +
     logokort. Alla övriga bilder är deras egna: Instagram och renaror.se.
     Flera av sajtens foton är små (250–560 px) och uppskalade.
   - Logotypen: sajtens fil är 180×77 px. Byggd ur den äldre filen på
     400×184 px (samma form, röd skrift) med skriften i dagens grå, uppskalad
     3×. Be om vektorfilen.
   - Telefonnumret skrivs som på Google (070-413 97 00); sajten skriver
     0704 139 700. Samma nummer.
   - Formuläret går till mathias@bahkobyra.se (demonyckeln).
   - Riktiga kontaktuppgifter och org.nr på sidan: visa INTE offentligt.
   =========================================================================== */

export const metadata = {
  title: 'Avloppsspolning och avloppsjour i Göteborg · Rena Rör i Väst',
  description:
    'Stopp i avloppet? Rena Rör spolar, filmar och byter avlopp i Göteborg med omnejd. Fast pris: spolning 2 250 kr efter ROT. Jour dygnet runt på 070-413 97 00.',
  robots: { index: false, follow: false },
};

const M = '/renaror/media';
const TEL = '070-413 97 00';
const TELHREF = 'tel:+46704139700';
const GOOGLE = 'https://maps.google.com/?cid=11694852875622201275';
const ORTER = ['Göteborg', 'Partille', 'Mölndal', 'Kungsbacka', 'Kungälv', 'Ale', 'Mölnlycke'];

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Plumber',
  name: 'Rena Rör i Väst',
  legalName: 'Rena Rör i Väst AB',
  url: 'https://www.renaror.se/',
  telephone: '+46704139700',
  email: 'kontakt@renaror.se',
  taxID: '556921-8927',
  address: { '@type': 'PostalAddress', streetAddress: 'Bååthsgatan 5', postalCode: '417 20', addressLocality: 'Göteborg', addressCountry: 'SE' },
  areaServed: ORTER.map((o) => ({ '@type': 'City', name: o })),
  sameAs: ['https://www.instagram.com/renaror/'],
  makesOffer: ['Avloppsspolning', 'Rörinspektion med kamera', 'Stamspolning', 'Avloppsjour', 'Byta avlopp'].map((n) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', name: `${n} i Göteborg` },
  })),
};

const data = {
  namn: 'Rena Rör i Väst',
  tema: {
    mork: '#0A1420',
    accent: '#FFBB00',
    accentHover: '#E6A800',
    accentText: '#8A5A00',
    accentLjus: '#FFC933',
    paAccent: '#0F172A',
  },
  logo: { src: `${M}/logo-renaror.png`, w: 972, h: 417, alt: 'Rena Rör i Väst' },
  kontakt: {
    tel: TEL,
    telHref: TELHREF,
    epost: 'kontakt@renaror.se',
    adress: 'Bååthsgatan 5, 417 20 Göteborg',
    oppet: 'Jour dygnet runt, året runt',
    ig: 'https://www.instagram.com/renaror/',
    igHandle: '@renaror',
    orgnr: '556921-8927',
  },
  cta: { txt: 'Boka tid', kort: 'Boka tid', lank: 'Boka tid' },
  nav: {
    vanster: [{ href: '#tjanster', txt: 'Tjänster' }, { href: '#jobb', txt: 'Våra jobb' }],
    hoger: [{ href: '#om', txt: 'Om oss' }, { href: '#omdomen', txt: 'Omdömen' }],
    extra: [{ href: '#fragor', txt: 'Priser och frågor' }, { href: TELHREF, txt: `Ring ${TEL}` }],
  },

  hero: {
    ort: 'Göteborg',
    tjanster: ['Avloppsspolning', 'Jour'],
    video: `${M}/video-hero.mp4`,
    videoMobil: `${M}/video-hero-mobil.mp4`,
    poster: `${M}/poster-hero.jpg`,
    posterMobil: `${M}/poster-hero-mobil.jpg`,
  },
  // Udda platser fylls (bevisen), jämna är kontur (tjänsterna).
  tejp: ['Jour dygnet runt', 'Avloppsspolning', '4,7 av 5 på Google', 'Rörinspektion', 'Pris innan vi kommer', 'Stamspolning', 'Sedan 2013', 'Byta avlopp'],

  tjanster: {
    eyebrow: 'Vad vi gör',
    rubrik: ['Allt som rör', 'husets avlopp'],
    lead: 'Stopp i köket, toaletten eller brunnen på tomten: vi spolar, filmar, lagar och byter. Priserna står här, inte på en faktura i efterhand. 4,7 av 5 på Google.',
    kolumner: 3,
    kort: [
      {
        id: 'spolning',
        namn: 'Avloppsspolning',
        bild: `${M}/tjanst-spolning.jpg`,
        alt: 'Avloppstekniker från Rena Rör drar spolslangen från bilen ner i en brunn på en villagata',
        text: 'Stopp i kök, toalett eller golvbrunn spolar vi loss med hetvatten och roterande munstycken. Bara rent vatten, inga kemikalier. 2 250 kr efter ROT-avdrag.',
        punkter: ['En timmes arbete och framkörning ingår', 'Hetvatten 60 °C', 'Vattenlåset kontrolleras'],
        ritning: (<><path d="M20 40h70v40h90" /><path d="M20 60h50v40h110" /><path d="M120 86c6-6 12 6 18 0s12 6 18 0" /></>),
      },
      {
        id: 'kamera',
        namn: 'Rörinspektion med kamera',
        bild: `${M}/tjanst-kamera.jpg`,
        alt: 'Avloppstekniker pekar på skärmen till en rörkamera där insidan av ett avloppsrör syns',
        text: 'Kommer stoppet tillbaka filmar vi ledningen och ser om det är rötter, sprickor eller ett rör som ligger fel. Spolning och filmning 3 500 kr efter ROT. Med dokumentation och filmfiler 4 750 kr.',
        punkter: ['Hittar rötter, sprickor och läckor', 'Slipper gräva på chans', 'Inför renovering eller ombyggnad'],
        ritning: (<><rect x="30" y="30" width="90" height="60" rx="8" /><circle cx="75" cy="60" r="16" /><path d="M120 60h30c14 0 20 10 20 24v20" /></>),
      },
      {
        id: 'stam',
        namn: 'Stamspolning',
        bild: `${M}/tjanst-stam.jpg`,
        alt: 'Martin från Rena Rör drar ut den blå spolslangen ur spolbilen',
        text: 'För bostadsrättsföreningar och fastighetsägare. Vi går igenom varje lägenhet och spolar sedan de utgående stammarna. 995 kr per lägenhet exklusive moms vid 5–10 lägenheter.',
        punkter: ['Kök, golvbrunnar och tvättställ', 'Vattenlåsen tas isär och kontrolleras', 'Fler än 10 lägenheter: offert'],
        ritning: (<><path d="M50 108V16h100v92" /><path d="M30 108h140" /><path d="M100 16v92" /><path d="M66 34h18M116 34h18M66 58h18M116 58h18M66 82h18M116 82h18" /></>),
      },
      {
        id: 'jour',
        namn: 'Avloppsjour dygnet runt',
        bild: `${M}/tjanst-jour.jpg`,
        alt: 'Claudio Congiu, ägare till Rena Rör, står med armarna i kors framför spolbilen',
        text: 'Stopp kommer sällan på kontorstid, utan när hela familjen är hemma. Vi svarar dygnet runt, året runt, och rycker ut i Göteborg med omnejd.',
        punkter: ['Akut stopp i toalett, kök och golvbrunn', 'Frusna avlopp tinas', `Ring ${TEL}`],
        ritning: (<><circle cx="100" cy="60" r="44" /><path d="M100 30v30l20 14" /></>),
      },
      {
        id: 'brunn',
        namn: 'Avloppsbrunnar och pumpbrunnar',
        bild: `${M}/tjanst-brunn.jpg`,
        alt: 'Ny grön pumpbrunn står på en gräsmatta bredvid en grävmaskin, redo att sättas i marken',
        text: 'Löv, grus och slam sätter igen brunnen tills vattnet står på uppfarten. Vi spolar och slamsuger. En brunn på 50–60 år går inte alltid att rädda, och då byter vi den.',
        punkter: ['Spolning och slamsugning', 'Byte av uttjänt brunn', 'Ny pumpbrunn, godkänd av kommunen'],
        ritning: (<><path d="M40 30h120" /><path d="M56 30v70c0 6 6 10 12 10h64c6 0 12-4 12-10V30" /><path d="M56 62h88" /><path d="M76 30V18M100 30V18M124 30V18" /></>),
      },
      {
        id: 'byte',
        namn: 'Byta avlopp',
        bild: `${M}/tjanst-byte.jpg`,
        alt: 'Uppgrävd grop där ett gammalt avloppsrör ligger blottat i leran',
        text: 'Genomrostat gjutjärn, rötter i ledningen eller 70-talets spröda plaströr: då hjälper ingen spolning. Vi filmar, lämnar offert, gräver och lägger nytt. Räkna med ett par veckor.',
        punkter: ['Grävjobb och omläggning', 'Dränering, dag- och spillvatten', 'ROT-avdrag, vi sköter pappren'],
        ritning: (<><path d="M20 44h60l20 30h80" /><path d="M20 64h50l20 30h90" /><path d="M150 20l-14 20h28z" /></>),
      },
    ],
  },

  jobb: {
    eyebrow: 'Våra jobb',
    rubrik: ['Rost, rötter och', 'en gräsklippare'],
    lead: 'Bilder vi själva tagit ute på jobb i Göteborg. På Glimra biltvätt hade någon tvättat gräsklipparen i båset.',
    not: 'Alla bilder är Rena Rörs egna, från Instagram @renaror och renaror.se.',
    tid: '60s',
    utvalda: [
      { src: `${M}/utvald-garda.jpg`, w: 900, h: 1200, alt: 'Insidan av ett genomrostat avloppsrör, fullt av rostflagor', etikett: 'Brf i Gårda', txt: 'Genomrostat rör i garaget, bytt samma jobb' },
      { src: `${M}/utvald-rotter.jpg`, w: 900, h: 1200, alt: 'Uppgrävt avloppsrör av lera med rötter som vuxit in i öppningen', etikett: 'Villa i Tuve', txt: 'Rötter i ledningen, avloppet lades om' },
      { src: `${M}/utvald-tuve.jpg`, w: 900, h: 1200, alt: 'Husgrund med dräneringsmatta och grus längs den uppgrävda väggen', etikett: 'Tuve', txt: 'Två väggar dränerade, ny pumpbrunn' },
    ],
    rad1: [
      { src: `${M}/jobb-relining.jpg`, alt: 'Nytt foder på väg ner i ett avloppsrör i marken', txt: 'Relining i Eriksberg' },
      { src: `${M}/jobb-glimra.jpg`, alt: 'Rena Rörs spolbil parkerad i ett tvättbås på Glimra biltvätt', txt: 'Stopp på Glimra biltvätt' },
      { src: `${M}/jobb-hallingsjo.jpg`, alt: 'Nya avloppsrör dragna mellan golvreglarna i en byggnad under uppförande', txt: 'Nytt avlopp i Hällingsjö' },
      { src: `${M}/jobb-vattenledning.jpg`, alt: 'Grävmaskinens skopa vid en uppgrävd vattenledning intill en husgrund', txt: 'Ny vattenledning inkopplad' },
      { src: `${M}/jobb-andalen.jpg`, alt: 'Liten grävmaskin och en hög makadam på en gräsmatta med syrener bakom', txt: 'Pumpbrunn i Andalen' },
    ],
    rad2: [
      { src: `${M}/jobb-rens.jpg`, alt: 'Grått avloppsrör med rensanslutning bakom en öppnad vägg', txt: 'Ny renslucka under trappan' },
      { src: `${M}/jobb-skargard.jpg`, alt: 'Uppgrävt dike längs en husgrund', txt: 'Stopp i skärgården' },
      { src: `${M}/jobb-kamera-falt.jpg`, alt: 'Rörkamerans skärm visar insidan av ett rör, ute på en gårdsplan', txt: 'Rörkameran på plats' },
      { src: `${M}/jobb-projekt.jpg`, alt: 'Vit villa med uppfart och en brunn i asfalten, inför ett grävjobb', txt: 'Nytt grävjobb påbörjat' },
      { src: `${M}/jobb-slangar.jpg`, alt: 'Claudio Congiu bär en bunt spolslangar framför Rena Rörs spolbil', txt: 'Claudio vid spolbilen' },
    ],
  },

  varfor: {
    eyebrow: 'Varför Rena Rör',
    rubrik: ['Du vet priset', 'innan vi kommer'],
    lead: 'Avloppsfirmor har rykte om sig att ta betalt i efterhand. Vi gör tvärtom. Priserna står i en öppen lista, och när du bokar bekräftar vi priset innan vi åker.',
    punkter: [
      { rubrik: 'Fast pris på spolning', text: '2 250 kr efter ROT-avdrag. Då ingår framkörning, en timmes arbete och hetvattenspolning.' },
      { rubrik: 'Kamera bara vid behov', text: 'Filmning kostar mer. Vi rekommenderar den bara när stoppet kommer tillbaka eller orsaken inte går att se.' },
      { rubrik: 'Mindre spolbilar', text: 'De tar sig in på trånga uppfarter, belastar tomten mindre och drar mindre bränsle. Det håller nere priset.' },
      { rubrik: 'Nöjd, annars fortsätter vi', text: 'Vi lämnar kundnöjdhetsgaranti på jobben. Är du inte nöjd arbetar vi tills du är det.' },
    ],
    video: `${M}/video-varfor.mp4`,
    poster: `${M}/poster-varfor.jpg`,
    videoAlt: 'Långsam inzoomning mot Martin som drar ut spolslangen ur Rena Rörs spolbil. Filmen slutar med Rena Rör i Västs logotyp.',
  },

  om: {
    eyebrow: 'Om Rena Rör',
    rubrik: ['Tre avloppstekniker,', 'en egen firma'],
    kortRad: 'Claudio Congiu, ägare',
    bild: { src: `${M}/om-claudio.jpg`, w: 750, h: 900, alt: 'Claudio Congiu, ägare och avloppstekniker på Rena Rör i Väst', rundad: true },
    stycken: [
      'Rena Rör i Väst AB startade 2013 och drivs av Claudio Congiu, ägare och avloppstekniker. Tillsammans med Martin Andersson och Vahid Rostami tar han hand om stopp, spolningar, filmningar och avloppsbyten i Göteborg med omnejd.',
      'Vårt motto är att du ska få hjälp på utsatt tid, med minsta möjliga olägenhet och till ett bra pris. Vi jobbar åt villaägare, bostadsrättsföreningar och företag, från Kungälv i norr till Kungsbacka i söder.',
    ],
    bevis: [
      { ord: 'Sedan 2013', text: 'eget aktiebolag i Göteborg' },
      { ord: '3 400+ kunder', text: 'och över 8 000 utförda jobb' },
      { ord: '4,7 av 5', text: 'på Google, 14 recensioner' },
    ],
  },

  steg: {
    eyebrow: 'Så går det till',
    rubrik: ['Från stopp', 'till rena rör'],
    lista: [
      { namn: 'Ring eller boka', ikon: 'kontakt', text: `Ring ${TEL} dygnet runt, eller boka i formuläret om det inte är akut.` },
      { namn: 'Vi tar reda på felet', ikon: 'besok', text: 'Ofta räcker det att du beskriver stoppet i telefon. Annars tittar vi på plats.' },
      { namn: 'Pris innan vi åker', ikon: 'offert', text: 'Vi bekräftar bokningen och lämnar pris innan vi kommer.' },
      { namn: 'Rena rör', ikon: 'klart', text: 'Vi kommer på utsatt tid, spolar loss stoppet och kontrollerar vattenlåset innan vi åker.' },
    ],
  },

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Löst på 15 minuter,', 'samma dag'],
    betyg: { varde: 4.7, antal: 14, href: GOOGLE },
    lista: [
      { namn: 'Lennart Skoglund', kalla: 'Recension på Google', google: true, betyg: 5, text: 'Claudio på Rena rör gjorde ett fantastiskt bra jobb med mitt avlopp i köket, snabbt och snyggt, ett riktigt proffs. Nu fungerar det perfekt, var helt täppt. Bästa rekommendationer om ni tänker rensa avloppen.' },
      { namn: 'Kjell Hellström', kalla: 'Recension på Google', google: true, betyg: 5, text: 'Hade Rena Rör hemma i huset och fick en perfekt videogenomgång av rörsystemet. Fick åtgärdat det som behövdes och känner mig nu helt trygg.' },
      { namn: 'Julia Stuxgren', kalla: 'Omdöme på renaror.se', stjarnor: false, text: 'Fick stopp i avloppet. De löste på problemet på 15 min samma dag! Imponerande och trevliga att ha att göra med.' },
      { namn: 'Fredrik Sjölin', kalla: 'Omdöme på renaror.se', stjarnor: false, text: 'Riktigt proffsigt och bra hanterat. Man vet hur man beter sig i privata hem och man sköter arbetsplatsen med omsorg. Ringer lätt igen om jag behöver era tjänster.' },
      { namn: 'Tom Vujnovac', kalla: 'Omdöme på renaror.se', stjarnor: false, text: "Excellent service! These guys are as nice as they're professional. Job was done smoothly and efficiently. I would highly recommend this company." },
      { namn: 'David Ljunggren', kalla: 'Omdöme på renaror.se', stjarnor: false, text: 'Snabb service och bra återkoppling. Trevlig och proffsig personal. Rekommenderas!' },
    ],
    not: 'Två av 14 recensioner på Google och fyra omdömen från renaror.se, ordagrant.',
  },

  instagram: {
    eyebrow: 'Instagram',
    rubrik: ['Claudio visar', 'vad som satt i röret'],
    bio: 'Rötter, rost och nya brunnar. Claudio lägger upp jobben själv.',
    koder: ['DY9oEj5jcBb', 'DYW4IANDQN5', 'DZN8G7vDYgJ'],
  },

  fragor: {
    eyebrow: 'Priser och frågor',
    rubrik: ['Vad kostar det,', 'och vad ingår?'],
    lead: 'Pengarna först. Det praktiska sedan.',
    kort: { rubrik: 'Akut stopp?', text: `Ring ${TEL}. Vi svarar dygnet runt, året runt.` },
    lista: [
      { q: 'Vad kostar en avloppsspolning?', a: '2 250 kr efter ROT-avdrag, inklusive moms. Då ingår framkörning, en timmes arbete, hetvattenspolning på 60 grader med roterande munstycken och kontroll av vattenlåset. Gäller kök, toalett och avloppsbrunn.' },
      { q: 'Och om ni ska filma avloppet?', a: 'Spolning och filmning kostar 3 500 kr efter ROT. Med dokumentation och filmfilerna till dig kostar det 4 750 kr.' },
      { q: 'Får jag veta priset innan ni kommer?', a: 'Ja. När du bokar bekräftar vi bokningen och lämnar pris innan vi åker.' },
      { q: 'Måste ni filma för att lösa ett stopp?', a: 'Nej, oftast räcker spolningen. Filmning rekommenderar vi när stoppet kommer tillbaka eller när orsaken inte går att förstå utifrån. Då ser vi rötter, sprickor och rör som ligger fel.' },
      { q: 'Hur fungerar ROT-avdraget?', a: (<>Priserna ovan är redan efter ROT-avdrag. Ha fastighetsbeteckningen till hands när du bokar, så sköter vi resten. Reglerna står hos <a href="https://www.skatteverket.se/privat/fastigheterochbostad/rotarbeteochrutarbete.4.2e56d4ba1202f95012080002966.html" target="_blank" rel="noopener">Skatteverket</a>.</>) },
      { q: 'Vad kostar stamspolning för en förening?', a: '995 kr per lägenhet exklusive moms för 5–10 lägenheter. Vi spolar kök, golvbrunnar och tvättställ, kontrollerar vattenlåsen och spolar de utgående stammarna. Större fastigheter får offert.' },
      { q: 'Kan jag lösa stoppet själv?', a: 'Ibland. Vid ett litet stopp i köket kan en vaskrensare eller bakpulver och ättika räcka. Häll aldrig kokande vatten i toaletten, porslinet kan spricka. Har du använt propplösare: säg det när du ringer, för vår säkerhet.' },
      { q: 'Hur lång tid tar ett avloppsbyte?', a: 'Räkna med ett par veckor, beroende på tomten och hur mycket som ska bytas. Vi filmar först, lämnar offert och återställer trädgården så gott det går.' },
      { q: 'Var jobbar ni?', a: 'Göteborg, Partille, Mölndal, Kungsbacka, Kungälv, Ale och Mölnlycke med omnejd.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Stopp nu?', 'Ring direkt'],
    lead: `Akut ringer du ${TEL}, dygnet runt. Annars skriver du några rader, så bekräftar vi tid och pris.`,
    checkar: ['Pris innan vi kommer', 'Jour dygnet runt, året runt', 'Priserna är efter ROT-avdrag'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Boka tid',
    placeholder: 'Var det är stopp (kök, toalett, golvbrunn, brunn ute), adress och gärna fastighetsbeteckning för ROT',
    formNot: 'Vi bekräftar bokningen och lämnar pris innan vi kommer.',
    kundtyp: ['Privatperson', 'BRF', 'Företag'],
  },

  popup: {
    rubrik: 'Stopp i avloppet?',
    text: 'Spolning 2 250 kr efter ROT, med framkörning och en timmes arbete. Jour dygnet runt.',
  },

  footer: {
    text: 'Avloppsspolning, rörinspektion, stamspolning och avloppsbyten i Göteborg med omnejd. Jour dygnet runt, året runt.',
  },

  modal: {
    rubrik: 'Så här kan Rena Rör se ut på nätet',
    text: 'Det här är ett kostnadsfritt förslag, byggt på det ni själva skriver på renaror.se, er prislista, era recensioner på Google och jobben ni lagt upp på Instagram. Bilderna är era egna, och filmen överst är en illustration. Formuläret landar ännu inte i er inkorg. Vill ni se den skarpt? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.',
  },
};

export default function RenaRorDemo() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <DemoSida data={data} />
    </>
  );
}
