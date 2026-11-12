import Image from 'next/image';
import localFont from 'next/font/local';
import styles from './proffsmaskiner.module.css';
import DemoFormular from '../../komponenter/DemoFormular';
import { arKunddoman } from './kunddoman';

/* ===========================================================================
   PROFFSMASKINER SVERIGE AB — hemsida för en betalande kund (avtal 2026-10-06,
   kund 2026-10-28: 15 000 kr i två delar + 3 500 kr/mån), Bahko Byrå.
   Byggd som förslag 2026-09-11 (lead från instagram.com/proffsmaskinerab, Sollentuna);
   Peter är nöjd med sidan som den är, bilder och filmer byts bara på hans begäran.
   Kunddomänen proffsmaskiner.se serveras härifrån via web/middleware.js när DNS pekats om
   (gamla sajten: WordPress/Elementor av Weblab). På kunddomänen indexeras sidan med canonical
   https://proffsmaskiner.se/ och utan demorutan; på bahkobyra.se/proffsmaskiner/ noindex.
   Byggd på golvvision-kanon (via rskompakt) med hero som före/efter-effekt.

   Bärande idé: deras egen mening "Alltid rätt maskin när du behöver den".
   Heron visar exakt det: ett tomt, urrivet betongrum som fylls med plastvägg, kärnborr,
   stoftavskiljare, golvsåg, bilningshammare och luftrenare — levererat, på plats, klart.
   (Nya filmer 2026-11-12 på Peters begäran, Wan 3.0 Prime ur GPT Image 2.5-bilder. Gamla
   filmerna med grävare, lift och bod ligger kvar i media/ men används inte.)
   Sidan argumenterar för att det är leveransen och servicen som avgör, inte
   maskinlistan.

   VERIFIERAT (proffsmaskiner.se + IG-bio + allabolag, 2026-09-11):
   Firmanamn "Proffsmaskiner Sverige AB" · org.nr 559154-6329, registrerat
   2018-04-05, aktiebolag · Bäckvägen 20, 192 54 Sollentuna ("Ny butik!") ·
   telefon 08-545 899 90 · e-post info@proffsmaskiner.se · kategorier i deras
   ord: anläggning, bodar & rastvagnar, byggmaskiner, betonghåltagning,
   elförsörjning, liftar, rivningsmaskiner, fritid · maskiner i deras ord:
   grävmaskiner och minigrävare, liftar och ställningar, kompressorer och
   generatorer, vibrationsplattor och markvibratorer, snöskotrar och
   specialmaskiner · egna fraser: "Proffs jobbar med proffs", "Alltid rätt
   maskin när du behöver den", "från förbrukningsmaterial till
   bodetableringar", "Alla våra maskiner är noggrant kontrollerade och
   servade innan varje uthyrning", "Vi tror på enkelhet, kvalitet och
   personlig kontakt" · löften på sajten: leverans till arbetsplatsen eller
   hämtning, ersättningsmaskin om något går sönder, inget konto krävs,
   gratis elbilsladdning för kunder, "0 kr i dolda avgifter", "rengöring
   ingår" · IG 16 inlägg, bio "Stockholms nya maskinuthyrare" · egna foton:
   butiken/kassan, maskinhallen, rivningsrobot med egen dekal, snöskotrar ·
   logotypen är deras egen SVG (vit).

   INTE verifierat, och finns därför inte på sidan: Google-betyg, antal
   maskiner, priser, ledtider, "95 % kundnöjdhet" (sajtens räknare).
   Snöskotrarna ("i Norrbotten med omnejd" enligt sajten) nämns inte.

   PETERS UPPDATERING 2026-11-11 (mejl till Mathias): tjänsterna är Bygg (sågar, fräsar,
   stoftavskiljare), Rivning (bilningshammare, mattstrippers, luftrenare), Sanering (plast, tejp,
   skyddsutrustning) och Håltagning (kärnborrar, klingor, golvsågar). Ägs av ett företag från
   branschen inom just de kategorierna. Hyr ut OCH återförsäljare av maskiner, handverktyg,
   förbrukningsmaterial och betongbearbetning. Leverantörer: Flex, Stanley, DeWalt (samma koncern),
   Hilti, JLM Group, Husqvarna Construction, Brokk. Logotyperna visas inte, bara namnen som text.
   Heron, varför-filmen och 07:00/08:00-paret visar sedan 2026-11-12 bygg, rivning, sanering
   och håltagning. Galleriet under paret byttes 2026-11-12 på Peters begäran mot bygg, rivning, sanering och
   håltagning (GPT Image 2.5). Gamla galleribilderna ligger kvar i media/ men används inte.

   FLAGGOR: formuläret går till peter@proffsmaskiner.se (Web3Forms, 2026-11-10); omdömessektionen och illustrationstexten borttagna (Mathias 2026-11-10);
   före/efter och galleri är illustrationer; sociala är deras egna.
   =========================================================================== */

const display = localFont({
  /* Archivo, lokal kopia av Googles latin-fil (se app/typsnitt/LASMIG.md) */
  src: [
    { path: '../../typsnitt/archivo-normal-variabel.woff2', weight: '400', style: 'normal' },
    { path: '../../typsnitt/archivo-normal-variabel.woff2', weight: '600', style: 'normal' },
  ],
  display: 'swap',
  variable: '--pm-display',
});
const displayKursiv = localFont({
  /* Archivo italic, lokal kopia av Googles latin-fil (se app/typsnitt/LASMIG.md) */
  src: [
    { path: '../../typsnitt/archivo-italic-variabel.woff2', weight: '400', style: 'italic' },
    { path: '../../typsnitt/archivo-italic-variabel.woff2', weight: '600', style: 'italic' },
  ],
  display: 'swap',
  preload: false,
  variable: '--pm-display-kursiv',
});
const ui = localFont({
  /* Inter, lokal kopia av Googles latin-fil (se app/typsnitt/LASMIG.md) */
  src: [
    { path: '../../typsnitt/inter-normal-variabel.woff2', weight: '400', style: 'normal' },
    { path: '../../typsnitt/inter-normal-variabel.woff2', weight: '500', style: 'normal' },
    { path: '../../typsnitt/inter-normal-variabel.woff2', weight: '600', style: 'normal' },
  ],
  display: 'swap',
  variable: '--pm-ui',
});

const META = {
  title: 'Proffsmaskiner Sverige AB | Maskinuthyrning i Sollentuna och Stockholm',
  description:
    'Hyr och köp maskiner för bygg, rivning, sanering och håltagning i Sollentuna och Stockholm. Leverantörer som Hilti, Husqvarna Construction och Brokk. Levererat till arbetsplatsen, servat före varje uthyrning.',
};

// Kunddomänen: indexeras med canonical proffsmaskiner.se. På bahkobyra.se/proffsmaskiner/: noindex.
export async function generateMetadata() {
  return (await arKunddoman())
    ? { ...META, alternates: { canonical: 'https://proffsmaskiner.se/' }, robots: { index: true, follow: true } }
    : { ...META, robots: { index: false, follow: false } };
}

// Web3Forms-nyckel för peter@proffsmaskiner.se (formuläret "proffsmaskiner" i Bahkos Web3Forms-konto,
// Pro, Peter verifierade adressen 2026-11-10). Mottagare i panelen: bara peter@. Nyckeln är publik av design.
const KUND_NYCKEL = '9eef7e83-b068-40b9-96f9-93e62e449990';

const TEL = '08-545 899 90';
const TEL_HREF = 'tel:+46854589990';
const EPOST = 'info@proffsmaskiner.se';
const ADRESS = 'Bäckvägen 20, 192 54 Sollentuna';
const IG = 'https://www.instagram.com/proffsmaskinerab/';

const LANKAR = [
  { href: '#tjanster', txt: 'Maskiner' },
  { href: '#om', txt: 'Om oss' },
  { href: '#process', txt: 'Så går det till' },
  { href: '#varfor', txt: 'Varför oss' },
  { href: '#fragor', txt: 'Vanliga frågor' },
];

// Linjeritningar i samma stil som stegen: 200 x 120, bara streck. Bygg = cirkelsåg,
// Rivning = bilningshammare, Sanering = plastvägg med dragkedja och tejprulle,
// Håltagning = kärnborr på stativ.
const RITNINGAR = {
  bygg: (<><path d="M24 98h152" /><path d="M58 98a34 34 0 0 1 68 0" /><path d="M70 98a22 22 0 0 1 44 0" /><path d="M118 70h40v16h-34" /><path d="M134 70l8-20h22" /></>),
  rivning: (<><path d="M64 22h72" /><path d="M76 22v14M124 22v14" /><path d="M84 36h32v40H84z" /><path d="M96 76h8v20l-4 8-4-8z" /><path d="M28 110h144M52 106l6-6 6 6M136 106l6-6 6 6" /></>),
  sanering: (<><path d="M26 18h118" /><path d="M32 18c6 28-6 58 2 88M138 18c-6 28 6 58-2 88" /><path d="M85 28v78" /><path d="M78 40h14M78 56h14M78 72h14M78 88h14" /><circle cx="166" cy="88" r="16" /><circle cx="166" cy="88" r="7" /></>),
  haltagning: (<><path d="M40 104h120" /><path d="M66 104V16" /><path d="M58 40h44v22H58z" /><path d="M102 44h26v14h-26" /><path d="M76 62v30M90 62v30M76 92h14" /></>),
};

const TJANSTER = [
  { id: 'bygg', ritning: 'bygg', namn: 'Bygg', text: 'Sågar, fräsar och stoftavskiljare för bygget. Kontrollerade och servade innan de lämnar oss.', punkter: ['Sågar', 'Fräsar', 'Stoftavskiljare'] },
  { id: 'rivning', ritning: 'rivning', namn: 'Rivning', text: 'Bilningshammare och mattstrippers för rivningen, och luftrenare som håller dammet nere medan ni jobbar.', punkter: ['Bilningshammare', 'Mattstrippers', 'Luftrenare'] },
  { id: 'sanering', ritning: 'sanering', namn: 'Sanering', text: 'Plast, tejp och skyddsutrustning för att stänga av och skydda arbetsplatsen. Materialet finns på samma ställe som maskinerna.', punkter: ['Plast', 'Tejp', 'Skyddsutrustning'] },
  { id: 'haltagning', ritning: 'haltagning', namn: 'Håltagning', text: 'Kärnborrar, klingor och golvsågar för håltagning och sågning i betong.', punkter: ['Kärnborrar', 'Klingor', 'Golvsågar'] },
];

// Peters lista 2026-11-11. Stanley och DeWalt är samma koncern men egna märken.
// Samarbetsbandet är byggt som kundbältet på bahkobyra.se (Mathias 2026-11-11): logga och en
// rad under om vad märket står för. Flex, Stanley, DeWalt och Hilti i egna färger (rutorna syns
// mot mörkt), JLM:s egen röd-vita logga, Husqvarna och Brokk i ljus enfärgad version.
// Källor: Flex, JLM och Brokk från märkenas sajter, övriga från Wikimedia Commons.
// hojd = visad höjd i px, satt per logga så att de väger lika.
const LEVERANTORER = [
  { namn: 'Flex', url: 'https://www.flex-tools.com/sv-se', logo: 'flex.svg', w: 121, h: 56, hojd: 36, rad: 'Elverktyg' },
  { namn: 'Stanley', url: 'https://www.stanleyworks.se/sv-se', logo: 'stanley.svg', w: 67, h: 32, hojd: 36, rad: 'Handverktyg' },
  { namn: 'DeWalt', url: 'https://www.dewalt.se/sv-se', logo: 'dewalt.svg', w: 886, h: 272, hojd: 34, rad: 'Elverktyg och handverktyg' },
  { namn: 'Hilti', url: 'https://www.hilti.se/', logo: 'hilti.svg', w: 482, h: 113, hojd: 30, rad: 'Borrning, håltagning och infästning' },
  { namn: 'JLM Group', url: 'https://jlmgroup.se/', logo: 'jlm-ljus.png', w: 640, h: 177, hojd: 38, rad: 'Diamantverktyg, klingor och kärnborr' },
  { namn: 'Husqvarna Construction', url: 'https://www.husqvarnaconstruction.com/se/', logo: 'husqvarna-ljus.png', w: 653, h: 120, hojd: 30, rad: 'Maskiner för sågning och borrning i betong' },
  { namn: 'Brokk', url: 'https://www.brokk.com/sv/', logo: 'brokk-ljus.png', w: 468, h: 120, hojd: 27, rad: 'Rivningsrobotar' },
];

const STEGRITNINGAR = {
  ring: (<><path d="M40 30h120v60H40z" /><path d="M40 30l60 40 60-40" /><path d="M40 104h120M40 100v8M160 100v8" /></>),
  val: (<><path d="M28 18h144v84H28z" /><path d="M44 38h64M44 52h96M44 66h48" /><path d="M120 60h36v30h-36z" /><path d="M28 110h144M28 106v8M172 106v8" /></>),
  leverans: (<><path d="M14 84h110V40H14z" /><path d="M124 56h34l20 18v10h-54z" /><circle cx="44" cy="92" r="10" /><circle cx="150" cy="92" r="10" /><path d="M14 100h172" /></>),
  jobb: (<><path d="M20 96h160" /><path d="M36 96V70h44l16-30h30l10 30h10v26" /><circle cx="56" cy="96" r="10" /><circle cx="126" cy="96" r="10" /><path d="M96 40l40-22 30 18" /></>),
  klart: (<><path d="M32 20h136v76H32z" /><path d="M32 66h136" /><path d="M58 40l16 16 32-34" /><path d="M54 82h92" /><path d="M32 108h136M32 104v8M168 104v8" /></>),
};

const STEG = [
  { nr: '1', namn: 'Ring eller skriv', ritning: 'ring', text: 'Berätta vad som ska göras och när. Du behöver inget konto: vi svarar med offert eller bokning direkt.' },
  { nr: '2', namn: 'Rätt maskin', ritning: 'val', text: 'Vi har bakgrund i branschen, både från försäljning och ute på fältet. Ni får den maskin jobbet kräver, inte den som råkar stå närmast.' },
  { nr: '3', namn: 'Leverans eller hämtning', ritning: 'leverans', text: 'Vi levererar direkt till arbetsplatsen, eller så hämtar ni på Bäckvägen 20 i Sollentuna. Behöver ni den snabbt säger ni det.' },
  { nr: '4', namn: 'Jobbet görs', ritning: 'jobb', text: 'Går något sönder ringer ni oss. Felsökning, reparation eller ersättningsmaskin, så att projektet inte stannar.' },
  { nr: '5', namn: 'Retur, rengöring ingår', ritning: 'klart', text: 'Lämna tillbaka som den är. Rengöringen ingår, och fakturan har inga dolda avgifter.' },
];

const STATS = [
  { tal: 2018, prefix: '', etikett: 'Grundat' },
  { tal: 0, prefix: '', etikett: 'Kronor i dolda avgifter' },
  { tal: 0, prefix: '', etikett: 'Konton som krävs för att hyra' },
  { tal: 1, prefix: '', etikett: 'Ställe för hyra, köp och material' },
];

const VARFOR = [
  'Proffs jobbar med proffs. Vi har själva stått på fältet och sålt maskinerna.',
  'Varje maskin är kontrollerad och servad innan den lämnar oss.',
  'Går den sönder får ni en ersättningsmaskin. Projektet stannar inte.',
  'Räcker en mindre maskin för jobbet säger vi det. Även när en större hade gett oss mer betalt.',
];


const FRAGOR = [
  { q: 'Måste jag ha ett konto för att hyra?', a: 'Nej. Ring eller skriv så får du offert eller bokning direkt. Kundportalen är ett tillval för dig som vill hantera bokningar och fakturor själv.' },
  { q: 'Levererar ni, eller hämtar jag själv?', a: 'Det väljer du. Vi levererar direkt till arbetsplatsen, eller så hämtar du hos oss på Bäckvägen 20 i Sollentuna. Behöver du den snabbt säger du det.' },
  { q: 'Vad händer om maskinen går sönder?', a: 'Kontakta oss direkt. Vi hjälper till med felsökning, reparation eller ersättningsmaskin så att projektet inte behöver stanna.' },
  { q: 'Vad kostar det?', a: 'Det beror på maskin och hyrestid. Du får ett pris innan du bokar, och fakturan har inga dolda avgifter. Rengöringen ingår.' },
  { q: 'Vilka maskiner har ni?', a: 'För bygg, rivning, sanering och håltagning: sågar, fräsar, stoftavskiljare, bilningshammare, mattstrippers, luftrenare, kärnborrar och golvsågar. Förbrukningsmaterial som plast, tejp, klingor och skyddsutrustning finns också. Saknas något: fråga.' },
  { q: 'Säljer ni maskiner också?', a: 'Ja. Vi hyr ut, och vi är återförsäljare av maskiner och handverktyg, förbrukningsmaterial och betongbearbetning. Vi jobbar bland annat med Hilti, Husqvarna Construction, Brokk, DeWalt, Stanley, Flex och JLM Group.' },
  { q: 'Hyr ni ut till privatpersoner?', a: 'Vi är byggda för företag och proffs, men hör av dig så säger vi vad som går.' },
  { q: 'Kan jag ladda elbilen hos er?', a: 'Ja. Kunder laddar gratis när de besöker oss på Bäckvägen.' },
  { q: 'Var finns ni?', a: 'Bäckvägen 20 i Sollentuna, med leverans i Stockholm med omnejd. Ligger jobbet längre bort får du säga var, så säger vi om vi kan ta det.' },
];


export default function ProffsmaskinerDemo() {
  return (
    <div className={`${display.variable} ${displayKursiv.variable} ${ui.variable} ${styles.sida}`}>
      <header className={styles.hdr}>
        <div className={styles.hdrIn}>
          <a className={styles.brand} href="#top"><span className={styles.brandTxt}><b>Proffsmaskiner</b><i>Sollentuna</i></span></a>
          <nav className={styles.nav}>{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}</nav>
          <a className={styles.mobilNavKnapp} href="#meny"><span>Meny</span><span className={styles.mobilNavIkon} aria-hidden="true" /></a>
          <a className={styles.hdrTel} href={TEL_HREF} aria-label={`Ring ${TEL}`}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg><span className={styles.hdrTelNr} aria-hidden="true">{TEL}</span><span className={styles.hdrTelKort} aria-hidden="true">Ring</span></a>
        </div>
      </header>

      <section className={styles.hero} id="top">
        <figure className={styles.heroFilm}>
          <video className={styles.heroLiggande} autoPlay muted loop playsInline preload="metadata" poster="/proffsmaskiner/media/poster-hero-renovering.jpg"><source src="/proffsmaskiner/media/video-hero-renovering.mp4" type="video/mp4" /></video>
          <video className={styles.heroStaende} autoPlay muted loop playsInline preload="metadata" poster="/proffsmaskiner/media/poster-hero-renovering-mobil.jpg"><source src="/proffsmaskiner/media/video-hero-renovering-mobil.mp4" type="video/mp4" /></video>
        </figure>
        <div className={styles.heroLager}>
          <div className={styles.heroLagerIn}>
            <h1 className={styles.heroLogo}><Image src="/proffsmaskiner/media/logo-proffsmaskiner-vit.svg" alt="Proffsmaskiner Sverige AB" width={255} height={142} priority unoptimized /></h1>
            <p className={styles.heroTjanster}>Bygg · Rivning · Sanering · Håltagning</p>
            <p className={styles.heroOrt}>Sollentuna · Stockholm</p>
            <div className={styles.heroCta}>
              <a className={styles.btn} href="#kontakt">Få offert på maskin</a>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={TEL_HREF}>Ring {TEL}</a>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.tejp} role="group" aria-label="Det här hyr vi ut">
        <div className={styles.tejpSpar}>{[false, true].map((kopia) => (<div className={styles.tejpIn} aria-hidden={kopia || undefined} key={kopia ? 'b' : 'a'}><span>Bygg</span><span>Rivning</span><span>Sanering</span><span>Håltagning</span><span>Uthyrning och försäljning</span><span>Förbrukningsmaterial</span><span>Betongbearbetning</span><span>Leverans till arbetsplatsen</span></div>))}</div>
      </div>

      <div className={styles.wrap}>
        <div className={styles.stats} role="list" aria-label="Proffsmaskiner i siffror">
          {STATS.map((s) => (<div className={styles.stat} role="listitem" key={s.etikett}><b>{s.prefix}<span className={styles.statTal} style={{ '--mal': s.tal }} aria-hidden="true" /><span className={styles.statStatisk}>{s.tal}</span></b><span>{s.etikett}</span></div>))}
        </div>
      </div>

      <section className={styles.sek} id="forvandling">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Leveransen</p><h2 className={styles.h2}>Alltid rätt maskin <em>när du behöver den.</em></h2><p className={styles.sekLead}>Klockan sju är rummet tomt. Klockan åtta står plastväggen, kärnborren, golvsågen och stoftavskiljaren där jobbet ska göras. Det är skillnaden mellan en maskinlista och en leverantör.</p></div>
          <div className={styles.forvandling}>
            <figure><Image src="/proffsmaskiner/media/galleri-fore-tomt-rum.jpg" alt="Tomt, urrivet rum med betongväggar och betonggolv, inga maskiner" width={1200} height={1200} /><figcaption><b>07:00</b></figcaption></figure>
            <figure><Image src="/proffsmaskiner/media/galleri-efter-utrustat-rum.jpg" alt="Samma rum med plastvägg, kärnborr, stoftavskiljare, golvsåg, bilningshammare och luftrenare på plats" width={1200} height={1200} /><figcaption><b>08:00</b></figcaption></figure>
          </div>
          <div className={styles.galleri}>
            <figure><Image src="/proffsmaskiner/media/galleri-bygg.jpg" alt="Cirkelsåg med stoftavskiljare som sågar en plywoodskiva på bockar, en fräs bredvid" width={1200} height={1200} /><figcaption>Bygg: sågar, fräsar och stoftavskiljare.</figcaption></figure>
            <figure><Image src="/proffsmaskiner/media/galleri-rivning.jpg" alt="Bilningshammare som river kakel i ett badrum, luftrenare och mattstripper i bakgrunden" width={1200} height={1200} /><figcaption>Rivning: bilningshammare, mattstrippers och luftrenare.</figcaption></figure>
            <figure><Image src="/proffsmaskiner/media/galleri-sanering.jpg" alt="Plastvägg med dragkedja, undertrycksaggregat, tejp, skyddsoverall och andningsskydd" width={1200} height={1200} /><figcaption>Sanering: plast, tejp och skyddsutrustning.</figcaption></figure>
            <figure><Image src="/proffsmaskiner/media/galleri-haltagning-golvsag.jpg" alt="Golvsåg som sågar i betonggolv, diamantklingor och en utborrad betongkärna bredvid hålet" width={1200} height={1200} /><figcaption>Håltagning: golvsågar, klingor och kärnborrar.</figcaption></figure>
          </div>
        </div>
      </section>

      <section className={styles.sek} id="tjanster">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Maskiner</p><h2 className={styles.h2}>Bygg, rivning, sanering <em>och håltagning</em></h2><p className={styles.sekLead}>Hyr eller köp. Alla maskiner är kontrollerade och servade innan varje uthyrning, och förbrukningsmaterialet finns på samma ställe.</p></div>
          <div className={styles.tjanster}>{TJANSTER.map((t) => (<article className={styles.tjanst} key={t.id}><svg className={styles.ritning} viewBox="0 0 200 120" aria-hidden="true">{RITNINGAR[t.ritning]}</svg><h3>{t.namn}</h3><p>{t.text}</p><ul>{t.punkter.map((p) => <li key={p}>{p}</li>)}</ul></article>))}</div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.om}`} id="om">
        <div className={styles.wrap}>
          <div className={styles.omGrid}>
            <div><p className={styles.eyebrow}>Om oss</p><h2 className={styles.h2}>Vi hyr ut. <em>Vi säljer också.</em></h2></div>
            <div className={styles.omText}>
              <p>Proffsmaskiner ägs av ett företag som själva kommer från branschen, från just bygg, rivning, sanering och håltagning.</p>
              <p>Därför hyr vi inte bara ut maskiner. Vi är också återförsäljare av maskiner och handverktyg, förbrukningsmaterial och betongbearbetning.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Samarbeten: rullande band som kundbältet på bahkobyra.se, mellan Om oss och Så går det till. */}
      <section className={styles.samarbeten} aria-labelledby="samarbeten-rubrik">
        <div className={styles.wrap}><h2 className={styles.samRubrik} id="samarbeten-rubrik">Samarbeten</h2></div>
        <div className={styles.samFonster}>
          <div className={styles.samSpar}>
            {[false, true].map((kopia) => (
              <ul className={styles.samIn} aria-hidden={kopia || undefined} key={kopia ? 'b' : 'a'}>
                {LEVERANTORER.map((l) => (
                  <li key={l.namn}>
                    <a href={l.url} target="_blank" rel="noopener" tabIndex={kopia ? -1 : undefined}>
                      <span className={styles.samLogga}><Image src={`/proffsmaskiner/media/partner/${l.logo}`} alt={kopia ? '' : l.namn} width={l.w} height={l.h} style={{ height: l.hojd, width: 'auto' }} unoptimized /></span>
                      <span className={styles.samRad}>{l.rad}</span>
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="process">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Så går det till</p><h2 className={styles.h2}>Fem steg, och rengöringen <em>ingår i det sista</em></h2><p className={styles.sekLead}>Inget konto, inga dolda avgifter. Så här enkelt är det att hyra hos oss.</p></div>
          <div className={styles.stegBlock}>
            {STEG.map((s, i) => <input type="radio" name="steg" id={`steg-${s.nr}`} className={styles.stegRadio} defaultChecked={i === 0} key={`r-${s.nr}`} />)}
            <div className={styles.stegVal} role="tablist" aria-label="Så går det till">{STEG.map((s) => <label className={styles.stegKnapp} htmlFor={`steg-${s.nr}`} key={`l-${s.nr}`}><span>{s.namn}</span></label>)}</div>
            <div className={styles.stegKort}>{STEG.map((s) => (<article className={styles.stegPanel} key={`p-${s.nr}`}><svg className={styles.stegRitning} viewBox="0 0 200 120" aria-hidden="true">{STEGRITNINGAR[s.ritning]}</svg><div><h3>{s.namn}</h3><p>{s.text}</p></div></article>))}</div>
          </div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekVarfor}`} id="varfor">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Varför oss</p><h2 className={styles.h2}>Proffs jobbar <em>med proffs</em></h2></div>
          <div className={styles.varforModul}>
            <figure className={styles.varforFilm}><video autoPlay muted loop playsInline preload="metadata" poster="/proffsmaskiner/media/poster-varfor-utrustningen.jpg" aria-label="Långsam åkning genom rummet förbi golvsågen, plastväggen och kärnborren"><source src="/proffsmaskiner/media/video-varfor-utrustningen.mp4" type="video/mp4" /></video></figure>
            <ul className={styles.varforPunkter}>{VARFOR.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sociala}`} id="sociala">
        <div className={styles.wrap}>
          <div className={styles.socialaIkoner}>
            <a href={IG} target="_blank" rel="noopener" aria-label="Proffsmaskiner på Instagram"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" /><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" /></svg></a>
          </div>
          <p className={styles.socialaTxt}>Följ vårt arbete i vardagen</p>
          <div className={styles.socialaRutnat}>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/proffsmaskiner/media/sociala-butiken.jpg" alt="Butiken och kassan på Bäckvägen 20 i Sollentuna" width={1200} height={1200} /></a></figure>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/proffsmaskiner/media/sociala-maskinhallen.jpg" alt="Maskinhallen med maskiner redo för uthyrning" width={1200} height={1200} /></a></figure>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/proffsmaskiner/media/sociala-rivningsrobot.jpg" alt="Rivningsrobot med Proffsmaskiners dekal" width={1200} height={1200} /></a></figure>
          </div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="fragor">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Vanliga frågor</p><h2 className={styles.h2}>Det ni brukar fråga först</h2><p className={styles.sekLead}>Konto, leverans och vad som händer om något går sönder. Gäller det just ert jobb är telefonen snabbare än en sida.</p></div>
          <div className={styles.fragorGrid}>
            <div className={styles.fragor}>{FRAGOR.map((f) => <details className={styles.fraga} name="faq" key={f.q}><summary>{f.q}<span className={styles.fragaIkon} aria-hidden="true" /></summary><p>{f.a}</p></details>)}</div>
            <aside className={styles.fragaKort}><h3>Hittar du inte svaret?</h3><p>Ring och fråga rakt ut. Vi säger vilken maskin jobbet kräver.</p><a className={`${styles.btn} ${styles.btnMork}`} href={TEL_HREF}>Ring {TEL}</a></aside>
          </div>
        </div>
      </section>

      <section className={styles.kontakt} id="kontakt">
        <div className={styles.wrap}>
          <div className={styles.kontaktGrid}>
            <div>
              <p className={styles.eyebrow}>Kontakt</p>
              <h2 className={styles.h2}>Vad ska göras,<br /><em>och när?</em></h2>
              <p className={styles.sekLead}>Ring, eller skriv några rader om jobbet. Du får pris innan du bokar, och maskinen levererad dit den ska.</p>
              <div className={styles.kontaktRader}>
                <a className={styles.kontaktRad} href={TEL_HREF}><span>Telefon</span><b>{TEL}</b></a>
                <a className={styles.kontaktRad} href={`mailto:${EPOST}`}><span>E-post</span><b>{EPOST}</b></a>
                <div className={styles.kontaktRad}><span>Butik och hämtning</span><b>{ADRESS}</b></div>
                <a className={styles.kontaktRad} href={IG} target="_blank" rel="noopener"><span>Instagram</span><b>@proffsmaskinerab</b></a>
              </div>
            </div>
            <DemoFormular
              className={styles.form}
              amne={KUND_NYCKEL ? 'Ny förfrågan från {foretag} via proffsmaskiner.se' : 'Proffsmaskiner - hyresförfrågan (kundsajt)'}
              fran={KUND_NYCKEL ? 'Proffsmaskiner Sverige AB' : undefined}
              nyckel={KUND_NYCKEL || undefined}
            >
              <label>Företag<input type="text" name="foretag" autoComplete="organization" required /></label>
              <label>Telefon<input type="tel" name="telefon" autoComplete="tel" required /></label>
              <label>E-post (valfritt)<input type="email" name="epost" autoComplete="email" /></label>
              <label>Vad behöver ni?<select name="typ" defaultValue="Bygg"><option>Bygg</option><option>Rivning</option><option>Sanering</option><option>Håltagning</option><option>Köpa maskin eller verktyg</option><option>Något annat</option></select></label>
              <label>Kort om jobbet<textarea name="meddelande" rows={4} placeholder="Vad som ska göras, var, hur länge, och om ni vill ha maskinen levererad" /></label>
              <button className={styles.btn} type="submit">Få offert på maskin</button>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={TEL_HREF}>Eller ring {TEL}</a>
              <p className={styles.formNot} id="form-not">Skriv kort om jobbet, så kan vi föreslå rätt maskin redan i första samtalet. Inga massutskick, ingen säljlista.</p>
            </DemoFormular>
          </div>
        </div>
      </section>

      <footer className={styles.ftr}>
        <div className={styles.wrap}>
          <div className={styles.ftrGrid}>
            <div><span className={styles.brandTxt}><b>Proffsmaskiner Sverige AB</b><i>Maskinuthyrning</i></span><p className={styles.ftrText}>Uthyrning och försäljning för bygg, rivning, sanering och håltagning i Stockholm med omnejd. Återförsäljare av maskiner, handverktyg och förbrukningsmaterial. Leverans till arbetsplatsen.</p></div>
            <div className={styles.ftrLankar}>{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}<a href={TEL_HREF}>{TEL}</a><a href={`mailto:${EPOST}`}>{EPOST}</a><a href={IG} target="_blank" rel="noopener">@proffsmaskinerab</a><a href="#top">Till toppen</a></div>
          </div>
          <div className={styles.ftrBar}><span>Proffsmaskiner Sverige AB · Org.nr 559154-6329 · {ADRESS}</span><span>Hemsida av <a href="https://www.bahkobyra.se" target="_blank" rel="noopener">Bahko Byrå</a></span></div>
        </div>
      </footer>

      <div className={styles.mobilMenyLager} id="meny"><a className={styles.mobilMenySkugga} href="#stangd" tabIndex={-1} aria-hidden="true" /><nav className={styles.mobilMenyPanel} aria-label="Meny">{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}<a href="#kontakt">Kontakt</a><a className={styles.mobilMenyStang} href="#stangd">Stäng menyn</a></nav></div>
      <span className={styles.stangdAnkare} id="stangd" />
      <input type="checkbox" id="popup-bort" className={styles.popupBort} aria-hidden="true" tabIndex={-1} />
      <aside className={styles.popup} aria-label="Kontakta Proffsmaskiner"><label className={styles.popupX} htmlFor="popup-bort" role="button" aria-label="Stäng" tabIndex={0}>✕</label><p className={styles.popupEyebrow}>Maskin till måndag?</p><p className={styles.popupTxt}>Ring så säger vi vad vi kan leverera, och när. Inget konto, inga dolda avgifter.</p><a className={`${styles.btn} ${styles.popupCta}`} href={TEL_HREF}>Ring {TEL}</a><a className={styles.popupAlt} href="#kontakt">Eller skriv några rader →</a></aside>
      {/* Demorutan "Om det här förslaget" är borta: Proffsmaskiner är kund sedan 2026-10-28 (samma beslut som för Kakel 0413). */}
    </div>
  );
}
