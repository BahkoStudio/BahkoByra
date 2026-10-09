import DemoSida from '../_mall/DemoSida';

/* ===========================================================================
   VANTOORO — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: instagram.com/vantooro (hette @reel_innovations, visningsnamn
   "Valora") · företagsförmedling och rådgivning inför försäljning · ingen
   hemsida. VD Adrian Alawi. Mathias 2026-10-09: "Förbättra valora sida och hans
   nya namn som är vantooro". Omklädd från den gamla Valora-demon (golvvision-
   kanon, 2026-09-14) till demomallen v3, 0 kostnad. /valora/ skickar hit.

   Bärande idé: deras egen rubrik i det enda inlägget, "Ditt företag. Ditt
   värde. Vår strategi." Målet de själva skriver: "att du ska få maximalt betalt
   för det du har byggt". Heron (genererad, från Valora-demon) visar vägen dit:
   samma styrelserum tomt på morgonen och med avtalet påskrivet på kvällen.

   VERIFIERAT:
   1. IG-embed @vantooro, hämtad 2026-10-09: samma profilbild som Valora (blå W
      med cyan bågar) → samma konto, omdöpt från @reel_innovations (den gamla
      adressen svarar inte längre). Visningsnamn fortfarande "Valora", 414
      följare, 1 inlägg (DcUlxvzI2Zv). Inläggets text ordagrant, i urval:
      "Ditt företag. Ditt värde. Vår strategi." · "Vi hjälper företagare att
      maximera värdet inför en försäljning – från värdering och positionering
      till att hitta rätt köpare och förhandla fram bästa möjliga pris." ·
      "Vi identifierar potentialen, skapar rätt förutsättningar och driver
      processen professionellt från start till mål." · "Målet är enkelt: att du
      ska få maximalt betalt för det du har byggt. Vi hjälper dig även med idéer
      och rådgivning för att maximera din intäkt." · "Vi hjälper även företag
      att synas, växa & sälja mer" · "Strategisk marknadsföring som skapar
      resultat" · "Rätt budskap. Rätt målgrupp. Rätt tillväxt." · "Kontakta oss
      för ett förutsättningslöst samtal."
   2. Från Valora-demon (IG-bio, skärmdump från Mathias 2026-09-14): "Buying &
      Selling Businesses", "Connecting Buyers & Sellers", "Valuation &
      Negotiation", "From Idea to Completed Deal", "CEO: Adrian Alawi" ·
      kontakten med Bahko sker på svenska.

   INTE verifierat, och finns därför inte på sidan: att "Vantooro" är
   registrerat (ingen registerträff 2026-10-09; Vanto AB 556277-0189 i Farsta är
   ett annat bolag — namnfälla), org.nr, hemsida (vantooro.se och vantooro.com
   finns inte i DNS), telefon, e-post, ORT, antal affärer, arvode, priser,
   ledtider, omdömen, logotyp i användbar storlek.

   FLAGGOR:
   - Ingen kontaktväg utom Instagram: mallen byter Ring-knapparna mot
     Instagram, formuläret går till mathias@bahkobyra.se (demonyckeln).
   - Ordmärke "Vantooro" i stället för logotyp: profilbilden är 100 px och är
     ett W, inte ett V — be om logotypen för det nya namnet.
   - Visningsnamnet på Instagram säger fortfarande "Valora" — bekräfta namnet.
   - ALLA bilder och filmer är genererade illustrationer från Valora-demon
     (56,5 credits 2026-09-14), märkta i jobb.not. Varför-filmen = gamla
     underlagsfilmen + ordmärkeskort (ffmpeg). Kontaktfilmen = heron, suddad.
   - Jobbanden har 3 + 2 bilder, inte 5 + 5: biblioteket har inga lånbara
     kontorsbilder (bara hantverk), och generering kräver HF-nyckeln.
   - Omdömen i exempelläge. Ingen Instagram-sektion: kontot har ett enda
     inlägg (DcUlxvzI2Zv, en hörsal) och mallen kräver minst tre. Ta in den
     när kontot har fler inlägg.
   =========================================================================== */

export const metadata = {
  title: 'Vantooro — sälj ditt företag för vad det är värt',
  description:
    'Värdering, positionering, rätt köpare och förhandling till bästa möjliga pris. Vi hjälper företagare att få maximalt betalt för det de har byggt. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

const M = '/vantooro/media';

const data = {
  namn: 'Vantooro',
  ordmarke: 'Vantooro',
  tema: {
    mork: '#0A1628',
    accent: '#1D6FE0',
    accentHover: '#1659BF',
    accentText: '#0B5394',
    accentLjus: '#6CC4FF',
    paAccent: '#fff',
  },
  kontakt: {
    ig: 'https://www.instagram.com/vantooro/',
    igHandle: '@vantooro',
  },
  cta: { txt: 'Boka ett samtal', kort: 'Boka samtal', lank: 'Boka ett samtal' },
  nav: {
    vanster: [{ href: '#tjanster', txt: 'Tjänster' }, { href: '#varfor', txt: 'Varför oss' }],
    hoger: [{ href: '#process', txt: 'Processen' }, { href: '#fragor', txt: 'Frågor' }],
  },

  hero: {
    // Ingen ort är verifierad, så raden utelämnas. Ingen logotypfil: h1 är ordmärket.
    tjanster: ['Köp', 'Försäljning'], // deras gamla bio: "Buying & Selling Businesses"
    video: `${M}/video-hero-fore-efter-affaren.mp4`,
    videoMobil: `${M}/video-hero-fore-efter-affaren-mobil.mp4`,
    poster: `${M}/poster-hero.jpg`,
    posterMobil: `${M}/poster-hero-mobil.jpg`,
  },
  tejp: ['Sälja företag', 'Köpa företag', 'Värdering', 'Positionering', 'Rätt köpare', 'Förhandling', 'Marknadsföring', 'Från idé till avslut'],

  tjanster: {
    eyebrow: 'Vad vi gör',
    rubrik: ['Ditt företag.', 'Ditt värde.'],
    lead: 'Vi hjälper företagare att maximera värdet inför en försäljning, från värdering och positionering till att hitta rätt köpare och förhandla fram bästa möjliga pris.',
    kort: [
      { id: 'salja', namn: 'Sälja företag', bild: `${M}/tjanst-salja.jpg`, alt: 'Reservoarpenna över en påskriven sista sida', text: 'Du har byggt något som är värt pengar. Vi skapar rätt förutsättningar, hittar köparna och driver processen till avslut.', punkter: ['Positionering inför försäljning', 'Rätt köpare', 'Process till avslut'], ritning: (<><path d="M28 24h144v72H28z" /><path d="M28 44h144" /><path d="M44 62h44M44 74h64" /><path d="M116 58h40v34h-40z" /><path d="M128 58v-8h16v8" /></>) },
      { id: 'kopa', namn: 'Köpa företag', bild: `${M}/tjanst-kopa.jpg`, alt: 'Nyckelknippa på en bunt påskrivna handlingar', text: 'Vi för ihop köpare och säljare. Vill du köpa ett bolag letar vi upp objekt som passar och hjälper till med bud och upplägg.', punkter: ['Söka objekt', 'Granskning', 'Bud och upplägg'], ritning: (<><path d="M20 96h160" /><path d="M36 96V54h40v42zM84 96V38h40v58zM132 96V66h32v30z" /><path d="M56 54V40M104 38V26M148 66V54" /></>) },
      { id: 'vardering', namn: 'Värdering och förhandling', bild: `${M}/tjanst-vardering.jpg`, alt: 'Två stolar mitt emot varandra vid ett förhandlingsbord', text: 'Vi identifierar potentialen, tar fram vad bolaget är värt och sitter med i förhandlingen tills priset är på plats.', punkter: ['Värdering av bolaget', 'Idéer som höjer värdet', 'Förhandling om pris och villkor'], ritning: (<><path d="M24 98h152" /><path d="M40 98V74h24v24zM76 98V56h24v42zM112 98V38h24v60z" /><path d="M32 30l40 20 36-18 44 22" /><circle cx="32" cy="30" r="4" /><circle cx="152" cy="54" r="4" /></>) },
      { id: 'marknadsforing', namn: 'Marknadsföring', bild: `${M}/tjanst-marknadsforing.jpg`, alt: 'Utsikt över en upplyst stadsgata i skymningen från ett kontorsfönster', text: 'Vi hjälper även företag att synas, växa och sälja mer, med strategisk marknadsföring som skapar resultat.', punkter: ['Rätt budskap', 'Rätt målgrupp', 'Rätt tillväxt'], ritning: (<><path d="M24 96h152" /><path d="M36 84l36-28 28 18 56-44" /><path d="M140 30h16v16" /></>) },
    ],
  },

  jobb: {
    eyebrow: 'Affären',
    rubrik: ['Från idé till', 'avslutad affär'],
    lead: 'Ingen ser arbetet mellan det tomma rummet och den påskrivna sidan. Värderingen, urvalet och samtalen som leder fram. Vi gör den delen.',
    not: 'Illustrationsbilder — byts mot era egna.',
    tid: '50s',
    rad1: [
      { src: `${M}/jobb-tomt-rum.jpg`, alt: 'Tomt styrelserum på morgonen med blankt bord och tomma stolar', txt: 'Idén' },
      { src: `${M}/jobb-paskrivet.jpg`, alt: 'Samma rum upplyst med påskrivet avtal, penna och kaffekoppar', txt: 'Affären' },
      { src: `${M}/jobb-avslutat-mote.jpg`, alt: 'Kaffekopp och stängd pärm på ett konferensbord efter mötet', txt: 'Mötet som blev en affär' },
    ],
    rad2: [
      { src: `${M}/jobb-kontoret.jpg`, alt: 'Kontorshörna med stängd laptop, anteckningsbok och kaffe vid fönstret', txt: 'Underlaget tas fram' },
      { src: `${M}/jobb-entren.jpg`, alt: 'Portfölj och rock på en bänk vid en kontorsentré i morgonljus', txt: 'På väg till nästa möte' },
    ],
  },

  varfor: {
    eyebrow: 'Varför Vantooro',
    rubrik: ['Maximalt betalt', 'för det du byggt'],
    lead: 'Målet är enkelt: att du ska få maximalt betalt för det du har byggt. Därför börjar vi med värdet, inte med annonsen.',
    punkter: [
      { rubrik: 'Värdet först', text: 'Vi identifierar potentialen och skapar rätt förutsättningar innan bolaget går ut på marknaden.' },
      { rubrik: 'Hela vägen', text: 'Värdering, positionering, rätt köpare och förhandling, driven professionellt från start till mål.' },
      { rubrik: 'Idéer som höjer intäkten', text: 'Vi hjälper dig även med idéer och rådgivning för att maximera din intäkt.' },
      { rubrik: 'Raka besked', text: 'Är det fel läge att sälja säger vi det. Även när en affär hade gett oss arvode.' },
    ],
    video: `${M}/video-varfor-underlaget.mp4`,
    poster: `${M}/poster-varfor.jpg`,
    videoAlt: 'Långsam åkning över värderingsunderlaget med miniräknare och penna. Filmen slutar med Vantooros namn och orden Ditt företag. Ditt värde. Vår strategi.',
  },

  om: {
    eyebrow: 'Om Vantooro',
    rubrik: ['Köpare och säljare,', 'ihopförda'],
    kortRad: 'Företagsförmedling',
    stycken: [
      'Vantooro hjälper företagare att köpa och sälja bolag: värdering, rätt motpart och förhandling, från idé till avslutad affär.',
      'Bakom står Adrian Alawi, VD. Vi hjälper även företag att synas, växa och sälja mer, med strategisk marknadsföring.',
    ],
    bevis: [
      { ord: 'Värdering', text: 'och positionering' },
      { ord: 'Rätt köpare', text: 'och bästa möjliga pris' },
      { ord: 'Från idé', text: 'till avslutad affär' },
    ],
  },

  steg: {
    eyebrow: 'Så går det till',
    rubrik: ['Från första samtalet', 'till avslut'],
    lead: 'Ingenting går vidare utan ditt ja. Det gäller särskilt det första steget mot marknaden.',
    lista: [
      { namn: 'Ett samtal', text: 'Berätta vad du funderar på. Vi säger rakt ut om det är läge att gå vidare, och samtalet är förutsättningslöst.', ikon: 'kontakt' },
      { namn: 'Värdering', text: 'Vi går igenom siffrorna och tar fram vad bolaget är värt, med resonemanget bakom.', ikon: 'plan' },
      { namn: 'Rätt motpart', text: 'Vi letar upp köpare eller objekt som faktiskt passar och sållar bort dem som bara vill titta.', ikon: 'besok' },
      { namn: 'Förhandling', text: 'Pris, villkor och upplägg. Vi sitter mellan parterna och håller processen igång när den kärvar.', ikon: 'offert' },
      { namn: 'Avslut', text: 'Avtalet skrivs under och affären går i mål. Från idé till avslutad affär.', ikon: 'klart' },
    ],
  },

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Vad kunderna', 'säger'],
    lista: [
      { namn: 'Säljare', kalla: 'Tjänsteföretag', exempel: true, text: 'Här står ett riktigt omdöme från en säljare, med den formulering och den grad av anonymitet ni kommer överens om.' },
      { namn: 'Köpare', kalla: 'Industri', exempel: true, text: 'Ett andra kort, hämtat ur er Google-profil när den är på plats.' },
      { namn: 'Ägarledd rörelse', kalla: 'Ägarskifte', exempel: true, text: 'Ett tredje kort. Tre riktiga omdömen räcker för att sidan ska kännas sann.' },
    ],
    not: 'Exempel — byts mot era riktiga omdömen.',
  },


  fragor: {
    eyebrow: 'Vanliga frågor',
    rubrik: ['Det ni brukar', 'fråga först'],
    lead: 'Pris och sekretess först, det praktiska sedan. Gäller det ditt bolag är ett samtal snabbare än en sida.',
    kort: { rubrik: 'Hittar du inte svaret?', text: 'Skriv några rader om bolaget så säger vi rakt ut vad vi tror.' },
    lista: [
      { q: 'Vad kostar det?', a: 'Första samtalet är förutsättningslöst. Vad ett uppdrag kostar beror på bolagets storlek och vad som ingår, och det säger vi innan du bestämmer dig.' },
      { q: 'Får någon veta att jag funderar på att sälja?', a: 'Nej. Sekretess är själva förutsättningen. Vi går ut mot marknaden först när du sagt ja, och bara mot dem vi valt ut.' },
      { q: 'Hur får jag bästa möjliga pris?', a: 'Genom att börja med värdet. Vi identifierar potentialen, skapar rätt förutsättningar och positionerar bolaget innan det möter köparna, och förhandlar sedan fram priset.' },
      { q: 'Hur värderar ni ett bolag?', a: 'Vi utgår från resultat, tillgångar, avtal och hur beroende verksamheten är av dig som ägare. Du får resonemanget, inte bara siffran.' },
      { q: 'Hur går det till?', a: 'Ett samtal, en värdering, urval av rätt motpart, förhandling och avslut. Fem steg, och du bestämmer efter varje.' },
      { q: 'Hur lång tid tar en affär?', a: 'Det beror på bolaget och på hur köpklar marknaden är. Vi säger vad vi tror efter värderingen, och du slipper gissa.' },
      { q: 'Jag vill köpa i stället. Hjälper ni med det?', a: 'Ja. Vi letar upp objekt som passar din plan, granskar dem och hjälper till med bud och upplägg.' },
      { q: 'Hjälper ni med marknadsföring också?', a: 'Ja. Vi hjälper även företag att synas, växa och sälja mer, med rätt budskap till rätt målgrupp.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Vad är bolaget värt,', 'och vad vill du?'],
    lead: 'Skriv några rader om verksamheten och vad du funderar på. Första samtalet är förutsättningslöst, och ingenting lämnar oss utan ditt ja.',
    checkar: ['Förutsättningslöst första samtal', 'Allt stannar mellan oss', 'Kontakt: Adrian Alawi, VD'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta kort om bolaget',
    meddelandeEtikett: 'Kort om bolaget',
    placeholder: 'Bransch, ungefärlig omsättning, hur länge du drivit det och vad du funderar på',
    formNot: 'Skriv kort om bolaget, då kan vi säga något vettigt redan i första samtalet. Inga massutskick, ingen säljlista.',
  },

  popup: {
    rubrik: 'Funderar du på att sälja?',
    text: 'Ett första samtal är förutsättningslöst och stannar mellan oss. Du får veta vad bolaget är värt innan du bestämmer något.',
  },

  footer: {
    text: 'Köp och försäljning av företag: värdering, positionering, rätt köpare och förhandling. Även strategisk marknadsföring.',
  },

  modal: {
    rubrik: 'Så här kan Vantooro se ut på nätet',
    text: 'Det här är ett kostnadsfritt förslag, byggt på det ni själva skriver på Instagram. Bilderna är illustrationer som byts mot era egna. Ingen beställning, inget åtagande. Vill ni se den skarpt med er logotyp och ett formulär som landar i inkorgen? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.',
  },
};

export default function VantooroDemo() {
  return <DemoSida data={data} />;
}
