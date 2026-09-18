import DemoSida from '../_mall/DemoSida';

/* ===========================================================================
   HG MASKINENTREPRENAD — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: instagram.com/hgmaskinentreprenad · ingen hemsida · ingen ort angiven.
   Omklädd till demomallen v3 2026-09-18 (0 credits).

   Bärande idé: deras egen bio säger att de "riktar sig främst mot
   företagskunder". En platschef köper inte en maskin, hen köper en dag som
   blir klar. Förvandlingsfilmen visar just det: en obruten tomt vid
   skogskanten som blir en plan, packad grusplan med dike.

   VERIFIERAT (IG-profil och bio, skärmdump från Mathias 2026-09-18):
   Kontonamn "HG Maskinentreprenad" (@hgmaskinentreprenad) · kategori
   Entreprenör · bio ordagrant (avklippt i skärmdumpen): "HG
   Maskinentreprenad riktar sig främst mot företagskunder med fokus på
   maskinkörning och övriga entreprenad/markjobb" · 2 inlägg: en maskin på
   trailer och en hjullastare · logotypen är en rund svart/röd badge med
   "HG" och "ENTREPRENAD" (profilbilden, 100 px — för liten att använda).

   INTE verifierat, och finns därför inte på sidan: org.nr (ingen
   registerträff på namnet), hemsida, telefon, e-post, ORT, maskinpark,
   priser, omdömen. Underpunkterna i tjänstekorten (schakt, planering,
   dränering) är vanliga exempel på "markjobb" — bekräfta med kunden.
   "Offerten kostar ingenting" och ramavtal är erbjudanden i förslagets form.

   FLAGGOR: ingen kontaktväg utom Instagram — knapparna går till formuläret
   och till Instagram; mallen byter själv Ring-knapparna mot Instagram.
   Ordmärke i stället för logotyp (be om logotypfilen) — filmens slutkort är
   ordmärket i Bebas Neue med märkets röda. Omdömen i exempelläge. ALLA
   bilder och filmer är illustrationer (märkt). Ingen Instagram-sektion:
   kontot har två inlägg och gick inte att läsa ut 2026-09-18.
   =========================================================================== */

export const metadata = {
  title: 'HG Maskinentreprenad — maskinkörning och markarbeten för företag',
  description:
    'Maskinkörning, entreprenad och markjobb för företagskunder. Maskin med förare, en kontakt och ett jobb som blir klart. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

const M = '/hg/media';

const data = {
  namn: 'HG Maskinentreprenad',
  ordmarke: 'HG Maskinentreprenad',
  tema: {
    mork: '#111315',
    accent: '#C8102E',
    accentHover: '#A50D26',
    accentText: '#A50D26',
    accentLjus: '#FF7A85',
    paAccent: '#fff',
  },
  kontakt: {
    ig: 'https://www.instagram.com/hgmaskinentreprenad/',
    igHandle: '@hgmaskinentreprenad',
  },
  cta: { txt: 'Begär offert', kort: 'Begär offert', lank: 'Begär offert' },
  nav: {
    vanster: [{ href: '#tjanster', txt: 'Tjänster' }, { href: '#jobb', txt: 'Jobb' }],
    hoger: [{ href: '#varfor', txt: 'Varför oss' }, { href: '#fragor', txt: 'Frågor' }],
  },
  formAction: 'mailto:mathias@bahkobyra.se?subject=HG%20Maskinentreprenad%20-%20f%C3%B6rfr%C3%A5gan',

  hero: {
    marke: 'Maskinkörning för företag',
    h1: ['HG', { txt: 'Maskinentreprenad', liten: true }],
    ingress: 'Maskinkörning och övriga entreprenad- och markjobb, främst åt företagskunder. Ni beställer en dag som blir klar, inte bara timmar.',
    video: `${M}/video-hero-gryning.mp4`,
    videoMobil: `${M}/video-hero-gryning-mobil.mp4`,
    poster: `${M}/poster-hero.jpg`,
    posterMobil: `${M}/poster-hero-mobil.jpg`,
    bevis: ['Maskin med förare', 'Mark och entreprenad', 'Främst åt företag'],
  },

  tjanster: {
    eyebrow: 'Vad vi gör',
    rubrik: ['Mark och maskin,', 'klart till nästa led'],
    lead: 'Fokus på maskinkörning och övriga entreprenad- och markjobb.',
    kort: [
      { id: 'maskin', namn: 'Maskinkörning', bild: `${M}/tjanst-maskinkorning.jpg`, alt: 'Grävmaskin lastad på en trailer vid skogskanten', text: 'Maskin med förare på plats när ni behöver den. Ni beställer resultatet, inte bara timmarna.', punkter: ['Maskin med förare', 'Hjullastare', 'Korta och längre uppdrag'], ritning: (<><path d="M20 96h160" /><path d="M36 96V70h44l16-30h30l10 30h10v26" /><circle cx="56" cy="96" r="10" /><circle cx="126" cy="96" r="10" /></>) },
      { id: 'schakt', namn: 'Mark och schakt', bild: `${M}/tjanst-schakt.jpg`, alt: 'Grävt dike längs en grusväg med gul ledning i botten', text: 'Markjobb som gör att nästa led kan börja på utsatt dag. Rätt nivå, rätt lutning, ingen omtagning.', punkter: ['Schakt', 'Dränering och diken', 'Återfyllnad'], ritning: (<><path d="M14 60h60v40h52V60h60" /><path d="M14 110h172" /></>) },
      { id: 'plan', namn: 'Planering och grus', bild: `${M}/tjanst-plan.jpg`, alt: 'Nyanlagd grusväg genom skogen med en vibratorplatta', text: 'Uppställningsytor, grusplaner och tillfartsvägar som är plana, packade och klara att använda.', punkter: ['Grusplaner', 'Tillfartsvägar', 'Packning'], ritning: (<><path d="M20 84h160" /><path d="M20 84l18-20h124l18 20" /><path d="M40 96h120" /></>) },
      { id: 'foretag', namn: 'Entreprenad för företag', bild: `${M}/tjanst-foretag.jpg`, alt: 'Gul grävmaskins hytt på en byggarbetsplats', text: 'Byggföretag, fastighetsägare och andra entreprenörer som behöver en pålitlig underentreprenör.', punkter: ['Underentreprenad', 'Ramavtal', 'En kontakt per uppdrag'], ritning: (<><path d="M28 18h144v84H28z" /><path d="M44 38h64M44 52h96M44 66h48" /><path d="M120 60h36v30h-36z" /></>) },
    ],
  },

  jobb: {
    eyebrow: 'Jobb',
    rubrik: ['Från obruten mark', 'till färdig yta'],
    lead: 'Så ser markjobb ut som blir klara: plant, packat och redo för nästa led.',
    not: 'Illustrationsbilder — byts mot era egna jobbfoton.',
    tid: '60s',
    rad1: [
      { src: `${M}/jobb-grusplan.jpg`, alt: 'Plan, packad grusplan vid skogskanten med hjullastare', txt: 'Grusplan, klar att bygga på' },
      { src: `${M}/jobb-skopa.jpg`, alt: 'Närbild på en grävskopa mot grus och sten', txt: 'Skopan i arbete' },
      { src: `${M}/jobb-arbete-pagar.jpg`, alt: 'Hjullastare planar en tomt vid skogen', txt: 'Planering pågår' },
    ],
    rad2: [
      { src: `${M}/jobb-obruten-tomt.jpg`, alt: 'Obruten tomt med ris och sten vid skogskanten', txt: 'Före: obruten tomt' },
      { src: `${M}/jobb-sten-och-grus.jpg`, alt: 'Högar av sten och grus på en arbetsplats', txt: 'Sten och grus på plats' },
    ],
  },

  varfor: {
    eyebrow: 'Varför HG',
    rubrik: ['En dag som', 'blir klar'],
    lead: 'En försenad markentreprenad kostar varje led efter. Därför planerar vi jobbet innan maskinen rullar ut.',
    punkter: [
      { rubrik: 'Byggt för företag', text: 'Vi riktar oss främst mot företagskunder och vet vad en försening kostar nästa led.' },
      { rubrik: 'Maskin och förare', text: 'Från samma ställe, med en kontakt som svarar.' },
      { rubrik: 'Offert och tidplan först', text: 'Ni får pris och plan innan start, och besked direkt om något ändras.' },
      { rubrik: 'Ärliga råd', text: 'Räcker en mindre maskin för jobbet säger vi det, även när en större hade gett oss mer betalt.' },
    ],
    video: `${M}/video-varfor-forvandling.mp4`,
    poster: `${M}/poster-varfor.jpg`,
    videoAlt: 'En obruten tomt vid skogskanten planas till en packad grusplan. Filmen slutar med HG Maskinentreprenads namn.',
    not: 'Filmen är en illustration av ett markjobb.',
  },

  om: {
    eyebrow: 'Om HG',
    rubrik: ['Maskinentreprenad', 'för företag'],
    kortRad: 'Mark och maskin',
    stycken: [
      'HG Maskinentreprenad riktar sig främst mot företagskunder, med fokus på maskinkörning och övriga entreprenad- och markjobb.',
      'Ni får maskin och förare från samma ställe, en kontakt per uppdrag och ett jobb som lämnas klart för nästa hantverkare.',
    ],
    bevis: [
      { ord: 'Företag', text: 'främst byggföretag och fastighetsägare' },
      { ord: 'Maskin + förare', text: 'från samma ställe' },
      { ord: 'En kontakt', text: 'per uppdrag' },
    ],
  },

  steg: {
    eyebrow: 'Så går det till',
    rubrik: ['Fem steg till', 'färdig mark'],
    lead: 'Från förfrågan till en yta som är klar för nästa led.',
    lista: [
      { namn: 'Förfrågan', text: 'Beskriv jobbet, platsen och när det ska vara klart. Ritning eller bilder räcker långt.' },
      { namn: 'Vi tittar på plats', text: 'Vi ser på förutsättningarna så att rätt maskin kommer ut första gången.' },
      { namn: 'Offert', text: 'Ni får pris och tidplan innan något startar. Offerten kostar ingenting.' },
      { namn: 'Utförande', text: 'Maskin och förare på plats på utsatt dag. Vi håller er uppdaterade.' },
      { namn: 'Klart för nästa led', text: 'Ytan lämnas plan, packad och redo. Nästa hantverkare kan börja direkt.' },
    ],
  },

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Vad kunderna', 'säger'],
    lista: [
      { namn: 'Byggföretag', kalla: 'Underentreprenad', exempel: true, text: 'Här står ett riktigt omdöme från en kund, med namn och företag som de själva skrivit det.' },
      { namn: 'Fastighetsägare', kalla: 'Grusplan och tillfart', exempel: true, text: 'Ett andra kort, hämtat ur er Google-profil när den är på plats.' },
      { namn: 'Entreprenör', kalla: 'Maskin med förare', exempel: true, text: 'Ett tredje kort. Tre riktiga omdömen räcker för att sidan ska kännas sann.' },
    ],
    not: 'Exempel — byts mot era riktiga omdömen.',
  },

  fragor: {
    eyebrow: 'Vanliga frågor',
    rubrik: ['Det ni brukar', 'fråga först'],
    lead: 'Pris och tid först, det praktiska sedan.',
    kort: { rubrik: 'Hittar du inte svaret?', text: 'Beskriv jobbet i formuläret, så får ni ett rakt besked om vad som går.' },
    lista: [
      { q: 'Tar ni jobb åt privatpersoner?', a: 'Vi riktar oss främst mot företagskunder. Hör av dig ändå, så säger vi om vi kan hjälpa till.' },
      { q: 'Hyr ni ut maskin med förare?', a: 'Ja. Maskinkörning med förare är kärnan i det vi gör.' },
      { q: 'Vad kostar det?', a: 'Det beror på jobbet, maskinen och tiden. Offerten kostar ingenting, och ni får pris och tidplan innan start.' },
      { q: 'Hur snabbt kan ni komma ut?', a: 'Det beror på beläggningen. Beskriv jobbet och datumet så får ni ett rakt besked.' },
      { q: 'Kan vi få ramavtal?', a: 'Ja, för återkommande uppdrag går det att lägga upp ett ramavtal med fasta villkor.' },
      { q: 'Var arbetar ni?', a: 'Berätta var jobbet ligger, så säger vi om vi kan ta det.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Vad ska göras,', 'och när?'],
    lead: 'Beskriv jobbet, platsen och datumet. Ni får pris och tidplan innan något startar.',
    checkar: ['Offert och tidplan före start', 'Maskin med förare', 'En kontakt per uppdrag'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta kort om jobbet',
    placeholder: 'Vad som ska göras, var, ungefärlig yta och när det ska vara klart',
    formNot: 'Skriv kort om jobbet, då kan vi ge ett vettigt svar direkt. Inga massutskick, ingen säljlista.',
  },

  popup: {
    rubrik: 'Markjobb som ska bli klart?',
    text: 'Beskriv jobbet och datumet. Ni får pris och tidplan innan något startar.',
  },

  footer: {
    text: 'Maskinkörning och övriga entreprenad- och markjobb, främst åt företagskunder.',
  },

  modal: {
    rubrik: 'Så här kan HG Maskinentreprenad se ut på nätet',
    text: 'Det här är ett kostnadsfritt förslag, byggt på det ni själva skriver på Instagram. Bilderna är illustrationer som byts mot era egna. Ingen beställning, inget åtagande. Vill ni se den skarpt med ett formulär som landar i inkorgen? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.',
  },
};

export default function HgDemo() {
  return <DemoSida data={data} />;
}
