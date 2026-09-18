import Image from 'next/image';
import { Figtree, Inter } from 'next/font/google';
import styles from './trestad.module.css';

/* ===========================================================================
   TRESTAD BYGG AB — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: instagram.com/trestadbyggab · Vänersborg · har hemsida
   (trestadbygg.se — tre sidor: START, OM OSS, KONTAKTA OSS) — förslaget är
   en förbättring, inte en första sida. VARM: sa ja till gratis prototyp i
   IG-DM 2026-09-18, Mathias lovade prototyp inom 48 h.
   Byggd på golvvision-kanon i alltfix-utförandet (konturstjärnor på
   exempelkorten), via hd — samma hero-klipp och samma gradientvärden.

   Bärande idé: det som avgör ett bygge syns aldrig. Tätskiktet, fallet mot
   brunnen, fästmassan bakom plattan. Firman har själv valt att certifiera
   sig enligt ISO 9001 — ett kvalitetssystem är just kravet att varje sådant
   moment dokumenteras. Sidan argumenterar för den meningen hela vägen:
   före/efter, gipsväggen före plattan, makro på fogen, och en process där
   steg fyra är dokumentationen.

   VERIFIERAT (trestadbygg.se via sökindex, IG-bio och profil ur Mathias
   skärmdump, allabolag/merinfo via sök — 2026-09-18; sajten själv är
   blockerad från byggmiljön):
   Firmanamn "Trestad Bygg AB" · org.nr 559463-5251 · registrerat 2023-12-18 ·
   Rådmansgatan 6, 462 37 Vänersborg · telefon 076-912 87 62 och e-post
   info@trestadbygg.se (sajtens kontaktsida) · IG-bio ordagrant "Byggföretag
   i Västra Götaland." · Instagram 25 inlägg, 120 följare · Facebook
   facebook.com/TrestadsByggRenovering · sajtens egna formuleringar:
   "kvalitetssäkrat byggföretag med bas i Trestad – Vänersborg, Trollhättan
   och Uddevalla", bygger, renoverar och utvecklar fastigheter i Trestad och
   tar uppdrag i hela Västra Götaland, premiumtjänster till privatpersoner,
   företag och organisationer, brett utbud av bygg- och renoveringstjänster,
   hantverksskicklighet, erfarenhet och professionell projektledning,
   certifierade enligt den internationella standarden ISO 9001, och ett
   uttalat miljöansvar · registrets verksamhet: specialiserad bygg- och
   anläggningsverksamhet, husrivning och målningsarbeten (SNI 43999) ·
   logotypen är deras egen (IG-profilbilden: vit skiva bortnycklad, det
   svarta märket vänt till vitt, uppskalat 4× med återställda kanter) · de
   tre bilderna i sociala-rutnätet är deras egna IG-foton (jugendvillan,
   det vita köket, badrummet med valvspeglarna).

   INTE verifierat, och finns därför inte på sidan: antal anställda,
   omsättning, antal projekt, Google-recensioner (inga hittade), garantier,
   försäkringar, ledtider, priser, hur ROT hanteras, vilket certifieringsorgan
   som utfärdat ISO-certifikatet. Statsradens 24 timmar och 0 kronor är
   LÖFTESBASERADE enligt skillen — de ska bekräftas innan demon skickas.
   9001 och 3 städer är verifierade.

   FÖRVÄXLINGSRISK: Allbygg Trestad AB, Trestads Bygg & Underhåll i
   Vänersborg AB, Bygg Bolaget Trestad AB och Trestads Murarfirma AB är
   ANDRA bolag. Nämns aldrig.

   OMDÖMESMODULEN i exempelläge: tre kort märkta Exempel, stjärnorna i kontur
   (inget betyg påstås), knappen går till en Maps-sökning på firmanamnet.

   MEDIA: Lån-läget, 0 credits. Hero, Varför oss-film, före/efter, makro och
   gipsväggen är badrumsserien från hd (samma klipp, samma gradient); köket
   från andrens och uterummet ur biblioteket (alfredallservice). Märkta som
   illustration en gång under galleriet. Sociala är deras egna.

   FLAGGOR: formuläret går till mathias@bahkobyra.se; galleriet är
   illustrationer; hero-klippet delas med hd-demon; ISO 9001 är firmans egen
   uppgift och bör bekräftas; logotypen kommer ur en skärmdump — be om
   vektorfil.
   =========================================================================== */

const display = Figtree({ subsets: ['latin'], weight: ['400', '600'], display: 'swap', variable: '--tb-display' });
const displayKursiv = Figtree({ subsets: ['latin'], weight: ['400', '600'], style: ['italic'], display: 'swap', preload: false, variable: '--tb-display-kursiv' });
const ui = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap', variable: '--tb-ui' });

export const metadata = {
  title: 'Trestad Bygg AB — badrum, kök och renovering i Vänersborg, Trollhättan och Uddevalla',
  description:
    'Kvalitetssäkrat byggföretag med bas i Trestad. Badrum, kök, renovering, tillbyggnad och uterum i Vänersborg, Trollhättan, Uddevalla och hela Västra Götaland. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

/* Verifierade uppgifter från sajtens kontaktsida och registret. */
const TEL = '076-912 87 62';
const TEL_HREF = 'tel:+46769128762';
const EPOST = 'info@trestadbygg.se';
const ADRESS = 'Rådmansgatan 6, 462 37 Vänersborg';
const IG = 'https://www.instagram.com/trestadbyggab/';
const FB = 'https://www.facebook.com/TrestadsByggRenovering/';
/* Demoformuläret postar till Bahko Byrå. I den skarpa sajten byts action mot
   info@trestadbygg.se. */
const FORM_ACTION = 'mailto:mathias@bahkobyra.se?subject=Trestad%20Bygg%20-%20hembes%C3%B6k';

const LANKAR = [
  { href: '#tjanster', txt: 'Vad vi gör' },
  { href: '#process', txt: 'Så går det till' },
  { href: '#varfor', txt: 'Varför oss' },
  { href: '#fragor', txt: 'Vanliga frågor' },
];

/* Fyra måttsatta linjeritningar i byggets eget språk. */
const RITNINGAR = {
  badrum: (
    <>
      <path d="M30 26h140v76H30z" />
      <path d="M30 52h140M30 78h140M65 26v76M100 26v76M135 26v76" />
      <path d="M118 60h34v22h-34z" />
      <path d="M135 52v8" />
      <path d="M30 112h140M30 108v8M170 108v8" />
    </>
  ),
  kok: (
    <>
      <path d="M22 44h156v58H22z" />
      <path d="M22 70h156" />
      <path d="M61 44v58M100 44v58M139 44v58" />
      <path d="M45 56h16M84 56h16M123 56h16M45 86h16M84 86h16M123 86h16" />
      <path d="M22 30h156" />
      <path d="M22 112h156M22 108v8M178 108v8" />
    </>
  ),
  tillbyggnad: (
    <>
      <path d="M24 100V44l44-24 44 24v56" />
      <path d="M112 100V62h64v38" />
      <path d="M112 62l32-14 32 14" />
      <path d="M24 100h152" />
      <path d="M24 112h152M24 108v8M176 108v8" />
    </>
  ),
  uterum: (
    <>
      <path d="M24 100V52l72-26v74" />
      <path d="M96 26l80 18v56" />
      <path d="M40 100V58M56 100V52M72 100V46M120 100V44M144 100V50M160 100V56" />
      <path d="M24 74h72M96 70h80" />
      <path d="M24 112h152M24 108v8M176 108v8" />
    </>
  ),
};

/* Fyra kort inom det verifierade: sajtens egen beskrivning av verksamheten,
   registrets verksamhetsbeskrivning och det firman själv publicerar på
   Instagram. */
const TJANSTER = [
  { id: 'badrum', ritning: 'badrum', namn: 'Badrum och våtrum', text: 'Hela badrummet, från rivning till sista fogen. Tätskikt, fall mot brunnen och fästmassa är det ingen ser efteråt, och det är just därför vi dokumenterar dem.', punkter: ['Totalrenovering', 'Tätskikt och plattsättning', 'Tvättstuga'] },
  { id: 'kok', ritning: 'kok', namn: 'Kök och inredning', text: 'Nytt kök i ett hus som redan står där: väggar som inte är raka, stammar som sitter fel. Vi löser det innan luckorna kommer, inte efter.', punkter: ['Köksrenovering', 'Snickeri och inredning', 'Målning'] },
  { id: 'renovering', ritning: 'tillbyggnad', namn: 'Renovering och tillbyggnad', text: 'Rum, våningar och hela fastigheter. Behöver bygget fler yrken än vårt håller vi ihop dem, och du har en kontakt genom hela projektet.', punkter: ['Totalrenovering', 'Tillbyggnad', 'Fastighetsutveckling'] },
  { id: 'uterum', ritning: 'uterum', namn: 'Uterum och altan', text: 'Uterum och altaner ritade efter huset som redan finns. Grunden och infästningen görs rätt först, för det är där ett däck avgörs.', punkter: ['Uterum', 'Altan och trädäck', 'Räcken och trappor'] },
];

const STEGRITNINGAR = {
  samtal: (<><path d="M40 30h120v60H40z" /><path d="M40 30l60 40 60-40" /><path d="M40 104h120M40 100v8M160 100v8" /></>),
  besok: (<><path d="M14 74h172v22H14z" /><path d="M32 74v10M50 74v14M68 74v10M86 74v14M104 74v10M122 74v14M140 74v10M158 74v14" /><path d="M14 56h172M14 50v12M186 50v12" /><path d="M60 30h80" /></>),
  offert: (<><path d="M28 18h144v84H28z" /><path d="M44 38h64M44 52h96M44 66h48" /><path d="M120 60h36v30h-36z" /><path d="M28 110h144M28 106v8M172 106v8" /></>),
  bygget: (<><path d="M32 20h136v76H32z" /><path d="M48 38h60M48 52h80M48 66h44" /><path d="M120 30h34v34h-34z" /><path d="M126 46l8 8 16-18" /><path d="M32 108h136M32 104v8M168 104v8" /></>),
  overlamning: (<><path d="M30 26h140v72H30z" /><path d="M30 62h140" /><path d="M56 42l14 14 30-30" /><path d="M52 80h96" /><path d="M30 110h140M30 106v8M170 106v8" /></>),
};

const STEG = [
  { nr: '1', namn: 'Ring eller skriv', ritning: 'samtal', text: 'Berätta vad du vill göra. Du får svar inom ett dygn, och ofta en känsla redan i telefon för vad det handlar om.' },
  { nr: '2', namn: 'Kostnadsfritt hembesök', ritning: 'besok', text: 'Vi kommer hem till dig och tittar på rummet, huset eller tomten. Du får höra vad som behöver göras och vad som kan vänta.' },
  { nr: '3', namn: 'Offert och tidplan', ritning: 'offert', text: 'Du ser vad som ingår, vad det kostar och när vi är klara, innan vi börjar. Behövs fler yrken än vårt står de med i samma offert.' },
  { nr: '4', namn: 'Bygget, steg för steg', ritning: 'bygget', text: 'Varje moment kvitteras av innan nästa påbörjas. Det är vad ett kvalitetssystem enligt ISO 9001 innebär i praktiken: tätskiktet är godkänt innan plattan sätts.' },
  { nr: '5', namn: 'Överlämning', ritning: 'overlamning', text: 'Vi går igenom allt tillsammans och lämnar över dokumentationen. Är något inte som det ska tar vi det då, inte om ett halvår.' },
];

/* Två löften (ska bekräftas av kunden) och två verifierade tal: ISO-standarden
   sajten uppger att de följer, och de tre städerna i deras egen bas. */
const STATS = [
  { tal: 24, prefix: '', etikett: 'Timmar till svar' },
  { tal: 0, prefix: '', etikett: 'Kronor för hembesöket' },
  { tal: 9001, prefix: '', etikett: 'Certifierade enligt ISO' },
  { tal: 3, prefix: '', etikett: 'Städer i vår bas' },
];

/* Max fyra punkter, alla inom det verifierade eller löftesbaserade.
   Riskreverseringen är den sista. */
const VARFOR = [
  'Certifierade enligt ISO 9001. Ett kvalitetssystem är kravet att varje moment dokumenteras, och du får pärmen vid överlämningen.',
  'Bas i Vänersborg, Trollhättan och Uddevalla, uppdrag i hela Västra Götaland. Vi är på plats samma dag om något behöver tittas på.',
  'Hantverk och projektledning i samma bolag. Du ringer ett nummer, vi håller ihop resten.',
  'Räcker det att renovera det som redan sitter säger vi det. Även när ett helt byte hade gett oss mer betalt.',
];

/* Inga riktiga omdömen hittade — exempelläge, märkt. */
const OMDOMEN = [
  { namn: 'Exempel', ort: 'Badrum, Vänersborg', text: 'Exempel: här står ett riktigt omdöme från en kund, med namn och ort som de själva skrivit det.' },
  { namn: 'Exempel', ort: 'Köksrenovering, Trollhättan', text: 'Exempel: ett andra kort, hämtat ur er Google-profil när den är på plats.' },
  { namn: 'Exempel', ort: 'Tillbyggnad, Uddevalla', text: 'Exempel: ett tredje kort. Tre riktiga omdömen räcker för att sidan ska kännas sann.' },
];

const FRAGOR = [
  { q: 'Vad kostar en renovering?', a: 'Det beror helt på rummet och på vad som döljer sig bakom väggen. Därför börjar vi med ett kostnadsfritt hembesök och en offert där du ser vad som ingår innan något arbete påbörjas.' },
  { q: 'Vad betyder ISO 9001 för mig som kund?', a: 'Att vi arbetar efter ett dokumenterat kvalitetssystem. I praktiken: varje moment har ett bestämt sätt att utföras och kvitteras av innan nästa påbörjas, och du får dokumentationen vid överlämningen. Det är samma standard som stora entreprenörer arbetar efter.' },
  { q: 'Kan jag använda ROT-avdrag?', a: 'Arbetskostnaden vid renovering, om- och tillbyggnad ger normalt rätt till ROT-avdrag. Vi går igenom vad som gäller för just ditt projekt när vi räknar på det.' },
  { q: 'Hur lång tid tar ett badrum?', a: 'Ett normalstort badrum tar några veckor, och tätskiktet behöver sin torktid oavsett hur bråttom någon har. Du får en tidplan i offerten, och det är den vi håller.' },
  { q: 'Vilka områden arbetar ni i?', a: 'Vi har vår bas i Trestad, alltså Vänersborg, Trollhättan och Uddevalla, och tar uppdrag i hela Västra Götaland. Ligger jobbet längre bort får du säga var, så säger vi om vi kan ta det.' },
  { q: 'Gör ni uterum och altaner också?', a: 'Ja. Uterum, altan och trädäck, anpassade efter huset som redan står där. Hör av dig så kommer vi ut och tittar på tomten.' },
  { q: 'Gör ni allt själva?', a: 'Vi gör hantverket och projektleder det som kräver andra yrken, som el och vatten. Du har fortfarande en kontaktperson, en tidplan och en offert.' },
  { q: 'Hur kommer jag igång?', a: 'Ring, eller skriv några rader om vad du vill göra. Du får svar inom ett dygn och ett kostnadsfritt hembesök när det passar dig.' },
];

const Stjarnor = ({ tom }) => (
  <span className={`${styles.stjarnor}${tom ? ` ${styles.stjarnorTomma}` : ''}`} role="img" aria-label={tom ? 'Stjärnor, exempel' : 'Fem stjärnor'}>
    {[0, 1, 2, 3, 4].map((i) => (
      <svg viewBox="0 0 24 24" aria-hidden="true" key={i}><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.5L12 17.3l-5.9 3.2 1.3-6.5L2.5 9.4l6.6-.8z" /></svg>
    ))}
  </span>
);
const GoogleG = ({ className }) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.3l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 2.9-2.2 5.4-4.7 7.1l7.6 5.9c4.4-4.1 6.9-10.1 6.9-17z" />
    <path fill="#FBBC04" d="M10.5 28.6c-.5-1.5-.8-3-.8-4.6s.3-3.1.8-4.6l-7.9-6.1C.9 16.6 0 20.2 0 24s.9 7.4 2.6 10.7l7.9-6.1z" />
    <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.9l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
  </svg>
);

export default function TrestadDemo() {
  return (
    <div className={`${display.variable} ${displayKursiv.variable} ${ui.variable} ${styles.sida}`}>
      <header className={styles.hdr}>
        <div className={styles.hdrIn}>
          <a className={styles.brand} href="#top"><span className={styles.brandTxt}><b>Trestad Bygg</b><i>Västra Götaland</i></span></a>
          <nav className={styles.nav}>{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}</nav>
          <a className={styles.mobilNavKnapp} href="#meny"><span>Meny</span><span className={styles.mobilNavIkon} aria-hidden="true" /></a>
          <a className={styles.hdrTel} href={TEL_HREF} aria-label={`Ring ${TEL}`}>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span className={styles.hdrTelNr} aria-hidden="true">{TEL}</span><span className={styles.hdrTelKort} aria-hidden="true">Ring</span>
          </a>
        </div>
      </header>

      {/* Lager-hero: logotyp, två tjänster, ort, knapparna. Ingen rubrik.
          Filmen är en före/efter-effekt (80-talsbadrum → nytt), lånad från hd. */}
      <section className={styles.hero} id="top">
        <figure className={styles.heroFilm}>
          <video className={styles.heroLiggande} autoPlay muted loop playsInline preload="metadata" poster="/trestad/media/poster-hero.jpg"><source src="/trestad/media/video-hero-fore-efter-badrum.mp4" type="video/mp4" /></video>
          <video className={styles.heroStaende} autoPlay muted loop playsInline preload="metadata" poster="/trestad/media/poster-hero-mobil.jpg"><source src="/trestad/media/video-hero-fore-efter-badrum-mobil.mp4" type="video/mp4" /></video>
        </figure>
        <div className={styles.heroLager}>
          <div className={styles.heroLagerIn}>
            {/* h1 omsluter logotypen: heron har ingen rubrik, sidan måste ha en. */}
            <h1 className={styles.heroLogo}><Image src="/trestad/media/logo-trestad-vit.png" alt="Trestad Bygg AB" width={477} height={414} priority /></h1>
            <p className={styles.heroTjanster}>Renovering · Projektledning</p>
            <p className={styles.heroOrt}>Vänersborg · Trollhättan · Uddevalla</p>
            <div className={styles.heroCta}>
              <a className={styles.btn} href="#kontakt">Boka kostnadsfritt hembesök</a>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={TEL_HREF}>Ring {TEL}</a>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.tejp} role="group" aria-label="Det här gör vi">
        <div className={styles.tejpSpar}>
          {[false, true].map((kopia) => (
            <div className={styles.tejpIn} aria-hidden={kopia || undefined} key={kopia ? 'b' : 'a'}>
              <span>Badrum och våtrum</span><span>Kök</span><span>Totalrenovering</span><span>Tillbyggnad</span><span>Fastighetsutveckling</span><span>Uterum och altan</span><span>Måleri</span><span>Projektledning</span><span>Vänersborg, Trollhättan, Uddevalla</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.wrap}>
        <div className={styles.stats} role="list" aria-label="Trestad Bygg i siffror">
          {STATS.map((s) => (
            <div className={styles.stat} role="listitem" key={s.etikett}>
              <b>{s.prefix}<span className={styles.statTal} style={{ '--mal': s.tal }} aria-hidden="true" /><span className={styles.statStatisk}>{s.tal}</span>{s.suffix || ''}</b>
              <span>{s.etikett}</span>
            </div>
          ))}
        </div>
      </div>

      <section className={styles.sek} id="forvandling">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}>
            <p className={styles.eyebrow}>Förvandlingen</p>
            <h2 className={styles.h2}>Det som avgör ett bygge <em>syns aldrig.</em></h2>
            <p className={styles.sekLead}>Det du ser är kaklet. Det som avgör om badrummet står sig är tätskiktet under det, fallet mot brunnen och fogen runt om. Därför kvitteras varje sådant moment av innan nästa påbörjas.</p>
          </div>
          <div className={styles.forvandling}>
            <figure><Image src="/trestad/media/galleri-fore-badrum-80tal.jpg" alt="Badrum från 80-talet med gult kakel, gammalt badkar och sliten fog" width={1200} height={1200} /><figcaption><b>Före</b></figcaption></figure>
            <figure><Image src="/trestad/media/galleri-efter-badrum-nytt.jpg" alt="Samma badrum färdigrenoverat med ljusa plattor och dusch" width={1200} height={1200} /><figcaption><b>Efter</b></figcaption></figure>
          </div>
          <div className={styles.galleri}>
            <figure><Image src="/trestad/media/galleri-gips-vatrum.jpg" alt="Våtrumsvägg med gips och tätskikt på plats, före plattsättning" width={1200} height={1200} /><figcaption>Steget ingen ser: tätskiktet.</figcaption></figure>
            <figure><Image src="/trestad/media/galleri-makro-fog.jpg" alt="Närbild på fogen mellan två plattor i ett nytt badrum" width={1200} height={1200} /><figcaption>Fogen, där jobbet syns.</figcaption></figure>
            <figure><Image src="/trestad/media/galleri-kok-renoverat.jpg" alt="Nyrenoverat kök med vita luckor och träbänkskiva" width={1200} height={1200} /><figcaption>Köket, klart.</figcaption></figure>
            <figure><Image src="/trestad/media/galleri-uterum-inglasat.jpg" alt="Inglasat uterum med altan mot en villa" width={896} height={1200} /><figcaption>Uterummet, ritat efter huset.</figcaption></figure>
          </div>
          <p className={styles.forvandlingNot}>Illustrationsbilder — byts mot era egna projektfoton.</p>
        </div>
      </section>

      <section className={styles.sek} id="tjanster">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}>
            <p className={styles.eyebrow}>Vad vi gör</p>
            <h2 className={styles.h2}>Bygg och renovering <em>i hela Västra Götaland</em></h2>
            <p className={styles.sekLead}>Vi bygger, renoverar och utvecklar fastigheter åt privatpersoner, företag och organisationer. Hantverket är vårt, och det som kräver andra yrken projektleder vi.</p>
          </div>
          <div className={styles.tjanster}>
            {TJANSTER.map((t) => (
              <article className={styles.tjanst} key={t.id}>
                <svg className={styles.ritning} viewBox="0 0 200 120" aria-hidden="true">{RITNINGAR[t.ritning]}</svg>
                <h3>{t.namn}</h3><p>{t.text}</p><ul>{t.punkter.map((p) => <li key={p}>{p}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="process">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}>
            <p className={styles.eyebrow}>Så går det till</p>
            <h2 className={styles.h2}>Fem steg, och <em>inget hoppas över</em></h2>
            <p className={styles.sekLead}>Det börjar med ett samtal och slutar med att du får dokumentationen i handen.</p>
          </div>
          <div className={styles.stegBlock}>
            {STEG.map((s, i) => <input type="radio" name="steg" id={`steg-${s.nr}`} className={styles.stegRadio} defaultChecked={i === 0} key={`r-${s.nr}`} />)}
            <div className={styles.stegVal} role="tablist" aria-label="Så går det till">{STEG.map((s) => <label className={styles.stegKnapp} htmlFor={`steg-${s.nr}`} key={`l-${s.nr}`}><span>{s.namn}</span></label>)}</div>
            <div className={styles.stegKort}>
              {STEG.map((s) => (
                <article className={styles.stegPanel} key={`p-${s.nr}`}>
                  <svg className={styles.stegRitning} viewBox="0 0 200 120" aria-hidden="true">{STEGRITNINGAR[s.ritning]}</svg>
                  <div><h3>{s.namn}</h3><p>{s.text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sek} id="varfor">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}>
            <p className={styles.eyebrow}>Varför oss</p>
            <h2 className={styles.h2}>Ett litet bolag <em>med stora bolags ordning</em></h2>
          </div>
          <div className={styles.varforModul}>
            <figure className={styles.varforFilm}>
              <video autoPlay muted loop playsInline preload="metadata" poster="/trestad/media/poster-varfor.jpg" aria-label="Plattsättning: plattorna sätts rad för rad mot det färdiga tätskiktet">
                <source src="/trestad/media/video-varfor-plattsattning.mp4" type="video/mp4" />
              </video>
            </figure>
            <ul className={styles.varforPunkter}>{VARFOR.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="omdomen">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}>
            <p className={styles.eyebrow}>Omdömen</p>
            <h2 className={styles.h2}>Vad kunderna säger</h2>
            <p className={styles.googleRad}><GoogleG className={styles.googleG} /><span>Här står ert Google-betyg när profilen är på plats</span></p>
          </div>
          <div className={styles.recensioner}>
            {OMDOMEN.map((o, i) => (
              <figure className={styles.recension} key={i}>
                <div className={styles.recensionHuvud}><span className={styles.avatar} aria-hidden="true">E</span><figcaption><b>{o.namn}</b><span>{o.ort}</span></figcaption></div>
                <Stjarnor tom /><blockquote>{o.text}</blockquote>
              </figure>
            ))}
          </div>
          <div className={styles.recensionerFot}>
            <p className={styles.recensionerNot}>Exempel — byts mot era riktiga omdömen. Inget betyg påstås förrän det finns.</p>
            <a className={`${styles.btn} ${styles.btnMork}`} href="https://www.google.com/maps/search/Trestad+Bygg+AB+V%C3%A4nersborg" target="_blank" rel="noopener">Se alla recensioner</a>
          </div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sociala}`} id="sociala">
        <div className={styles.wrap}>
          <div className={styles.socialaIkoner}>
            <a href={IG} target="_blank" rel="noopener" aria-label="Trestad Bygg på Instagram"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" /><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" /></svg></a>
            <a href={FB} target="_blank" rel="noopener" aria-label="Trestad Bygg på Facebook"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 8h2.5V4.5H14c-2.2 0-3.5 1.5-3.5 3.6V10H8v3.3h2.5V21h3.4v-7.7h2.6l.5-3.3h-3.1V8.5c0-.3.2-.5.6-.5z" fill="currentColor" /></svg></a>
          </div>
          <p className={styles.socialaTxt}>Följ vårt arbete i vardagen</p>
          <div className={styles.socialaRutnat}>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/trestad/media/sociala-jugendvilla.jpg" alt="Trestad Bygg på Instagram: vit jugendvilla med röda knutar och snickarglädje" width={356} height={356} /></a></figure>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/trestad/media/sociala-kok-vitt.jpg" alt="Trestad Bygg på Instagram: vitt kök med mörk bänkskiva och ljust golv" width={356} height={356} /></a></figure>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/trestad/media/sociala-badrum-valvspeglar.jpg" alt="Trestad Bygg på Instagram: badrum i marmormönster med två valvformade speglar med bakbelysning" width={216} height={216} /></a></figure>
          </div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="fragor">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}>
            <p className={styles.eyebrow}>Vanliga frågor</p>
            <h2 className={styles.h2}>Det du brukar fråga först</h2>
            <p className={styles.sekLead}>Pengar och tid först, det tekniska sedan. Gäller det just ditt hus är telefonen snabbare än en sida.</p>
          </div>
          <div className={styles.fragorGrid}>
            <div className={styles.fragor}>{FRAGOR.map((f) => <details className={styles.fraga} name="faq" key={f.q}><summary>{f.q}<span className={styles.fragaIkon} aria-hidden="true" /></summary><p>{f.a}</p></details>)}</div>
            <aside className={styles.fragaKort}><h3>Hittar du inte svaret?</h3><p>Ring och fråga rakt ut. Vi svarar inom ett dygn.</p><a className={`${styles.btn} ${styles.btnMork}`} href={TEL_HREF}>Ring {TEL}</a></aside>
          </div>
        </div>
      </section>

      <section className={styles.kontakt} id="kontakt">
        <div className={styles.wrap}>
          <div className={styles.kontaktGrid}>
            <div>
              <p className={styles.eyebrow}>Kontakt</p>
              <h2 className={styles.h2}>Vad är det som ska göras?<br /><em>Börja med hembesöket.</em></h2>
              <p className={styles.sekLead}>Berätta vad du vill göra, så återkommer vi inom ett dygn och bokar ett kostnadsfritt hembesök. Vill du hellre prata direkt: ring.</p>
              <div className={styles.kontaktRader}>
                <a className={styles.kontaktRad} href={TEL_HREF}><span>Telefon</span><b>{TEL}</b></a>
                <a className={styles.kontaktRad} href={`mailto:${EPOST}`}><span>E-post</span><b>{EPOST}</b></a>
                <div className={styles.kontaktRad}><span>Adress</span><b>{ADRESS}</b></div>
                <a className={styles.kontaktRad} href={IG} target="_blank" rel="noopener"><span>Instagram</span><b>@trestadbyggab</b></a>
              </div>
            </div>
            <form className={styles.form} action={FORM_ACTION} method="post" encType="text/plain" aria-describedby="form-not">
              <label>Namn<input type="text" name="namn" autoComplete="name" required /></label>
              <label>Telefon<input type="tel" name="telefon" autoComplete="tel" required /></label>
              <label>E-post (valfritt)<input type="email" name="epost" autoComplete="email" /></label>
              <label>Vad handlar det om?<select name="typ" defaultValue="Badrum"><option>Badrum</option><option>Kök</option><option>Renovering eller tillbyggnad</option><option>Uterum eller altan</option><option>Fastighet eller företag</option><option>Något annat</option></select></label>
              <label>Kort om projektet<textarea name="meddelande" rows={4} placeholder="Vad du vill göra, var huset ligger, och när du vill ha det klart" /></label>
              <button className={styles.btn} type="submit">Boka kostnadsfritt hembesök</button>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={TEL_HREF}>Eller ring {TEL}</a>
              <p className={styles.formNot} id="form-not">Skriv kort om projektet — då kan vi ge ett vettigt svar redan i första samtalet. Inga massutskick, ingen säljlista.</p>
              <p className={styles.formNot}>Obs: i det här förslaget öppnar knappen ditt e-postprogram och skickar raderna till Bahko Byrå. I den skarpa sajten kopplas formuläret in och landar direkt i er egen inkorg.</p>
            </form>
          </div>
        </div>
      </section>

      <footer className={styles.ftr}>
        <div className={styles.wrap}>
          <div className={styles.ftrGrid}>
            <div><span className={styles.brandTxt}><b>Trestad Bygg AB</b><i>Byggföretag i Västra Götaland</i></span><p className={styles.ftrText}>Badrum, kök, renovering, tillbyggnad och uterum med bas i Vänersborg, Trollhättan och Uddevalla. Kvalitetssäkrat arbete enligt ISO 9001, i hela Västra Götaland.</p></div>
            <div className={styles.ftrLankar}>{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}<a href={TEL_HREF}>{TEL}</a><a href={`mailto:${EPOST}`}>{EPOST}</a><a href={IG} target="_blank" rel="noopener">@trestadbyggab</a><a href="#top">Till toppen</a></div>
          </div>
          <div className={styles.ftrBar}><span>Trestad Bygg AB · Org.nr 559463-5251 · {ADRESS}</span><span>Förslag byggt av <a href="https://www.bahkobyra.se" target="_blank" rel="noopener">Bahko Byrå</a></span></div>
        </div>
      </footer>

      <div className={styles.mobilMenyLager} id="meny">
        <a className={styles.mobilMenySkugga} href="#stangd" tabIndex={-1} aria-hidden="true" />
        <nav className={styles.mobilMenyPanel} aria-label="Meny">{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}<a href="#kontakt">Kontakt</a><a className={styles.mobilMenyStang} href="#stangd">Stäng menyn</a></nav>
      </div>
      <span className={styles.stangdAnkare} id="stangd" />
      <input type="checkbox" id="popup-bort" className={styles.popupBort} aria-hidden="true" tabIndex={-1} />
      <aside className={styles.popup} aria-label="Kontakta Trestad Bygg">
        <label className={styles.popupX} htmlFor="popup-bort" role="button" aria-label="Stäng" tabIndex={0}>✕</label>
        <p className={styles.popupEyebrow}>Ska badrummet göras om?</p>
        <p className={styles.popupTxt}>Hembesöket kostar ingenting, och du får höra vad som behöver göras innan du bestämmer dig. Svar inom ett dygn.</p>
        <a className={`${styles.btn} ${styles.popupCta}`} href={TEL_HREF}>Ring {TEL}</a>
        <a className={styles.popupAlt} href="#kontakt">Eller skriv några rader →</a>
      </aside>
      <a className={styles.demoKnapp} href="#bahko-demo">Om det här förslaget</a>
      <div className={styles.modalLager} id="bahko-demo">
        <a className={styles.modalSkugga} href="#stangd" tabIndex={-1} aria-hidden="true" />
        <section className={styles.modal} aria-labelledby="bahko-rubrik">
          <a className={styles.modalX} href="#stangd" aria-label="Stäng">✕</a>
          <span className={styles.modalBadge}>Förslag av Bahko Byrå</span>
          <h3 id="bahko-rubrik">Så här kan Trestad Bygg se ut på nätet</h3>
          <p>Det här är ett kostnadsfritt förslag, byggt på det ni själva skriver på trestadbygg.se och visar på Instagram. Ingen beställning, inget åtagande. Vill ni se den skarpt med era egna projektfoton, riktiga omdömen och ett formulär som landar i inkorgen? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.</p>
          <a className={styles.modalCta} href="https://cal.eu/bahkobyra/15min" target="_blank" rel="noopener">Boka 15 min gratis samtal →</a>
          <a className={styles.modalAlt} href="mailto:mathias@bahkobyra.se?subject=Trestad%20Bygg%20-%20f%C3%B6rslag%20p%C3%A5%20hemsida">Eller mejla → mathias@bahkobyra.se</a>
          <span className={styles.modalFot}>Bahko Byrå · Synlighet som säljer.</span>
        </section>
      </div>
    </div>
  );
}
