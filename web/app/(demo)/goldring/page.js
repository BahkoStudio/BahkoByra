import Image from 'next/image';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import styles from './goldring.module.css';

/* ===========================================================================
   GOLDRING BYGG & ENTREPRENAD AB — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: instagram.com/goldringbygg · Kågeröd, nordvästra Skåne · har hemsida
   (goldring.se, WordPress/Yoast på one.com — ett rutnät av stad × tjänst-
   sidor med samma text) — förslaget är en förbättring, inte en första sida.
   Byggd på golvvision-kanon (modulerna 2026-09-06) i alltfix-utförandet
   (senaste demon, 2026-09-14): konturstjärnor på exempelkorten, Google-raden
   säger var betyget hamnar. Copy-stommen via andrens (samma nisch).

   Bärande idé: ett bygge är många yrken, men kunden ska bara behöva ringa
   ett nummer. Firmans egna ord: "snickeri, hantverk, projektledning och
   konsultation", "nybyggnation, renoveringar och specialkonstruktioner",
   "brett nätverk av samarbetspartners". Projektledningen ÄR argumentet —
   Goldring håller ihop bygget så att kunden slipper stå mitt emellan.

   VERIFIERAT (goldring.se via sökindex, IG-bio ur Mathias skärmdump,
   allabolag/proff via sök — 2026-09-17; sajten själv är blockerad från
   byggmiljön):
   Firmanamn "Goldring Bygg & Entreprenad AB" · org.nr 559319-6230 ·
   registrerat 2021-05-27 · Petréns väg 6, 268 77 Kågeröd (registret) ·
   telefon 070-719 84 44 och e-post alexander@goldring.se (IG-bion) ·
   kontakt Alexander Goldring (styrelseledamot) · IG-bio ordagrant
   "Byggfirma i Nordvästra Skåne" · sajtens tjänster: snickeri, renovering,
   nybyggnation, tillbyggnad, takarbeten/takbyte, uterum, altaner och
   trädäck, kök och badrum, fönsterbyte, projektledning, konsultation ·
   sajtens orter: Helsingborg, Ängelholm, Landskrona, Svalöv, Klippan ·
   Facebook-sida hittad via sök (facebook.com/p/…100072164707743) ·
   Instagram 68 inlägg, 487 följare · logotypen är deras egen (IG-profil-
   bilden ur skärmdumpen: vit skiva borttagen, grått ordmärke vänt till vitt,
   guldet orört) · de tre bilderna i sociala-rutnätet är deras egna IG-foton
   (trädäck, poolrum, takisolering) ur samma skärmdump.

   INTE verifierat, och finns därför inte på sidan: antal anställda,
   omsättning, antal projekt, Google-recensioner (inga hittade; bygg.se
   listar inga omdömen), försäkringar, garantier, ledtider, priser, hur
   ROT hanteras. Statsraden är LÖFTESBASERAD enligt skillen (0 kr, 24 h,
   en kontaktperson) plus registrets startår 2021 — Alexander ska bekräfta
   löftena innan demon skickas.

   OMDÖMESMODULEN i exempelläge: tre kort märkta Exempel, stjärnorna i kontur
   (inget betyg påstås), knappen går till en Maps-sökning på firmanamnet.

   MEDIA: Lån-läget, 0 credits. Hero, Varför oss-film, före/efter och makro
   är altanserien från rskompakt (Seedance/nano_banana, samma subjekt hela
   vägen); uterum, tak och badrum ur biblioteket (alfredallservice, bygg).
   Märkta som illustration en gång under galleriet. Sociala är deras egna.

   FLAGGOR: formuläret går till mathias@bahkobyra.se; galleriet är
   illustrationer; logotypen är 178 px ur en skärmdump — be om vektorfil.
   =========================================================================== */

const display = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '600'], display: 'swap', variable: '--gr-display' });
const displayKursiv = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '600'], style: ['italic'], display: 'swap', preload: false, variable: '--gr-display-kursiv' });
const ui = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap', variable: '--gr-ui' });

export const metadata = {
  title: 'Goldring Bygg & Entreprenad — byggfirma i nordvästra Skåne: uterum, altan, tak, renovering',
  description:
    'Byggfirma i Kågeröd. Uterum, altan, takbyte, kök, badrum, tillbyggnad och nybyggnation i Helsingborg, Ängelholm, Landskrona, Svalöv och Klippan. En kontakt genom hela bygget. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

/* Verifierade uppgifter: telefon och e-post ur IG-bion, adress ur registret. */
const TEL = '070-719 84 44';
const TEL_HREF = 'tel:+46707198444';
const EPOST = 'alexander@goldring.se';
const ADRESS = 'Petréns väg 6, 268 77 Kågeröd';
const IG = 'https://www.instagram.com/goldringbygg/';
const FB = 'https://www.facebook.com/p/Goldring-Bygg-Entreprenad-AB-100072164707743/';
/* Demoformuläret postar till Bahko Byrå. I den skarpa sajten byts action mot
   alexander@goldring.se. */
const FORM_ACTION = 'mailto:mathias@bahkobyra.se?subject=Goldring%20Bygg%20-%20hembes%C3%B6k';

const LANKAR = [
  { href: '#tjanster', txt: 'Vad vi gör' },
  { href: '#process', txt: 'Så går det till' },
  { href: '#varfor', txt: 'Varför oss' },
  { href: '#fragor', txt: 'Vanliga frågor' },
];

/* Fyra måttsatta linjeritningar i byggets eget språk. */
const RITNINGAR = {
  uterum: (
    <>
      <path d="M24 100V52l72-26v74" />
      <path d="M96 26l80 18v56" />
      <path d="M40 100V58M56 100V52M72 100V46M120 100V44M144 100V50M160 100V56" />
      <path d="M24 74h72M96 70h80" />
      <path d="M24 112h152M24 108v8M176 108v8" />
    </>
  ),
  tak: (
    <>
      <path d="M20 70L100 22l80 48" />
      <path d="M34 62v40h132V62" />
      <path d="M20 70h160" />
      <path d="M120 30v14h12V38" />
      <path d="M20 112h160M20 108v8M180 108v8" />
    </>
  ),
  badrum: (
    <>
      <path d="M30 26h140v76H30z" />
      <path d="M30 52h140M30 78h140M65 26v76M100 26v76M135 26v76" />
      <path d="M118 60h34v22h-34z" />
      <path d="M135 52v8" />
      <path d="M30 112h140M30 108v8M170 108v8" />
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
};

/* Fyra kort, alla ur sajtens egen tjänstelista (sidtitlar och utdrag). */
const TJANSTER = [
  { id: 'uterum', ritning: 'uterum', namn: 'Uterum och altan', text: 'Uterum ritade för att smälta in i huset som redan står där, och altaner och trädäck som tål tjugo vintrar. Grunden görs rätt först, det är den ingen ser.', punkter: ['Uterum', 'Altan och trädäck', 'Räcken och trappor'] },
  { id: 'tak', ritning: 'tak', namn: 'Tak och takbyte', text: 'Takarbeten från enstaka läckor till hela takbyten. Vi säger om det räcker att lägga om delar innan vi räknar på ett helt.', punkter: ['Takbyte', 'Takarbeten', 'Fönsterbyte'] },
  { id: 'badrum', ritning: 'badrum', namn: 'Kök och badrum', text: 'Kök och badrum där funktion och form hänger ihop. Snickeriet är vårt, och det som kräver andra yrken håller vi ihop åt dig.', punkter: ['Köksrenovering', 'Badrumsrenovering', 'Platsbyggt snickeri'] },
  { id: 'tillbyggnad', ritning: 'tillbyggnad', namn: 'Tillbyggnad och nybyggnation', text: 'Från tillbyggnaden som ger familjen ett rum till, till nybyggnation och specialkonstruktioner. Vi projektleder, så du har en kontakt hela vägen.', punkter: ['Tillbyggnad', 'Nybyggnation', 'Specialkonstruktioner'] },
];

const STEGRITNINGAR = {
  samtal: (<><path d="M40 30h120v60H40z" /><path d="M40 30l60 40 60-40" /><path d="M40 104h120M40 100v8M160 100v8" /></>),
  besok: (<><path d="M14 74h172v22H14z" /><path d="M32 74v10M50 74v14M68 74v10M86 74v14M104 74v10M122 74v14M140 74v10M158 74v14" /><path d="M14 56h172M14 50v12M186 50v12" /><path d="M60 30h80" /></>),
  offert: (<><path d="M28 18h144v84H28z" /><path d="M44 38h64M44 52h96M44 66h48" /><path d="M120 60h36v30h-36z" /><path d="M28 110h144M28 106v8M172 106v8" /></>),
  bygge: (<><path d="M20 70L100 22l80 48" /><path d="M34 62v40h132V62" /><path d="M20 70h160" /><path d="M20 112h160M20 108v8M180 108v8" /></>),
  besiktning: (<><path d="M32 20h136v76H32z" /><path d="M32 66h136" /><path d="M58 40l16 16 32-34" /><path d="M54 82h92" /><path d="M32 108h136M32 104v8M168 104v8" /></>),
};

const STEG = [
  { nr: '1', namn: 'Ring eller skriv', ritning: 'samtal', text: 'Berätta vad du vill bygga. Du får svar inom en arbetsdag, och ofta en känsla redan i telefon för vad det handlar om.' },
  { nr: '2', namn: 'Kostnadsfritt hembesök', ritning: 'besok', text: 'Vi kommer ut och tittar på huset, tomten eller taket. Du får höra vad som behöver göras, vad som kan vänta, och vad som kräver bygglov.' },
  { nr: '3', namn: 'Offert med tydligt pris', ritning: 'offert', text: 'Du ser vad som ingår och vad det kostar innan vi börjar. Behövs fler yrken än vårt står de med i samma offert.' },
  { nr: '4', namn: 'Bygget', ritning: 'bygge', text: 'En kontakt genom hela projektet. Vi håller tidplanen, håller ihop samarbetspartnerna och håller arbetsplatsen städad.' },
  { nr: '5', namn: 'Slutgenomgång', ritning: 'besiktning', text: 'Vi går igenom allt tillsammans innan vi lämnar. Är något inte som det ska tar vi det då, inte om ett halvår.' },
];

/* Löftesbaserad statsrad (skillen: 0 kr, 24 h, en kontaktperson) plus
   registrets startår. Inga historiksiffror utöver året. */
const STATS = [
  { tal: 24, prefix: '', etikett: 'Timmar till svar' },
  { tal: 0, prefix: '', etikett: 'Kronor för hembesöket' },
  { tal: 1, prefix: '', etikett: 'Kontaktperson hela vägen' },
  { tal: 2021, prefix: '', etikett: 'Byggfirma sedan' },
];

/* Max fyra punkter, alla inom det verifierade eller löftesbaserade.
   Riskreverseringen är den tredje. */
const VARFOR = [
  'Snickeri, projektledning och ett nätverk av samarbetspartners. Du ringer ett nummer, vi håller ihop resten.',
  'Från Kågeröd till Helsingborg, Ängelholm, Landskrona, Svalöv och Klippan. Samma person på plats hela vägen.',
  'Är det ett jobb för en ensam snickare säger vi det. Då betalar du inte för projektledning du inte behöver.',
];

/* Inga riktiga omdömen hittade — exempelläge, märkt. */
const OMDOMEN = [
  { namn: 'Exempel', ort: 'Villaägare, Helsingborg', text: 'Exempel: här står ett riktigt omdöme från en kund, med namn och ort som de själva skrivit det.' },
  { namn: 'Exempel', ort: 'Altanbygge, Svalöv', text: 'Exempel: ett andra kort, hämtat ur er Google-profil när den är på plats.' },
  { namn: 'Exempel', ort: 'Takbyte, Ängelholm', text: 'Exempel: ett tredje kort. Tre riktiga omdömen räcker för att sidan ska kännas sann.' },
];

const FRAGOR = [
  { q: 'Vad kostar det att anlita er?', a: 'Det beror helt på projektet, därför börjar vi alltid med ett kostnadsfritt hembesök och en offert. Du får ett tydligt pris och en beskrivning av vad som ingår innan något arbete påbörjas.' },
  { q: 'Kan jag använda ROT-avdrag?', a: 'Arbetskostnaden vid renovering, tillbyggnad och underhåll ger normalt rätt till ROT-avdrag. Vi går igenom vad som gäller för just ditt projekt när vi räknar på det.' },
  { q: 'Behöver jag bygglov för ett uterum eller en tillbyggnad?', a: 'Det beror på storlek, placering och vad som redan byggts på tomten. Vi tittar på det vid hembesöket och säger vad som gäller innan du bestämmer dig.' },
  { q: 'Hur lång tid tar ett projekt?', a: 'En altan tar ofta någon vecka, ett uterum eller en tillbyggnad längre. Du får en tidplan i offerten, och det är den vi håller.' },
  { q: 'Behöver jag byta hela taket?', a: 'Inte alltid. Vi tittar på råspont, underlag och pannor var för sig och säger vad som faktiskt behöver bytas. Räcker det med delar säger vi det.' },
  { q: 'Vad händer om bygget kräver fler yrken än snickare?', a: 'Då håller vi ihop det. Vi projektleder och tar in samarbetspartner för det som inte är vårt, och du har fortfarande en kontakt och en tidplan.' },
  { q: 'Vilka områden arbetar ni i?', a: 'Vi utgår från Kågeröd och tar uppdrag i nordvästra Skåne: Helsingborg, Ängelholm, Landskrona, Svalöv, Klippan och orterna däremellan. Ligger jobbet längre bort får du säga var, så säger vi om vi kan ta det.' },
  { q: 'Hur kommer jag igång?', a: 'Ring, eller skriv några rader om vad du vill bygga. Du får svar inom en arbetsdag och ett kostnadsfritt hembesök när det passar dig.' },
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

export default function GoldringDemo() {
  return (
    <div className={`${display.variable} ${displayKursiv.variable} ${ui.variable} ${styles.sida}`}>
      <header className={styles.hdr}>
        <div className={styles.hdrIn}>
          <a className={styles.brand} href="#top"><span className={styles.brandTxt}><b>Goldring Bygg</b><i>Nordvästra Skåne</i></span></a>
          <nav className={styles.nav}>{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}</nav>
          <a className={styles.mobilNavKnapp} href="#meny"><span>Meny</span><span className={styles.mobilNavIkon} aria-hidden="true" /></a>
          <a className={styles.hdrTel} href={TEL_HREF} aria-label={`Ring ${TEL}`}>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span className={styles.hdrTelNr} aria-hidden="true">{TEL}</span><span className={styles.hdrTelKort} aria-hidden="true">Ring</span>
          </a>
        </div>
      </header>

      {/* Lager-hero: logotyp, två tjänster, ort, knapparna. Ingen rubrik.
          Filmen är en före/efter-effekt (sliten altan → ny), lånad. */}
      <section className={styles.hero} id="top">
        <figure className={styles.heroFilm}>
          <video className={styles.heroLiggande} autoPlay muted loop playsInline preload="metadata" poster="/goldring/media/poster-hero.jpg"><source src="/goldring/media/video-hero-fore-efter-altan.mp4" type="video/mp4" /></video>
          <video className={styles.heroStaende} autoPlay muted loop playsInline preload="metadata" poster="/goldring/media/poster-hero-mobil.jpg"><source src="/goldring/media/video-hero-fore-efter-altan-mobil.mp4" type="video/mp4" /></video>
        </figure>
        <div className={styles.heroLager}>
          <div className={styles.heroLagerIn}>
            {/* h1 omsluter logotypen: heron har ingen rubrik, sidan måste ha en. */}
            <h1 className={styles.heroLogo}><Image src="/goldring/media/logo-goldring-vit.png" alt="Goldring Bygg & Entreprenad AB" width={178} height={197} priority /></h1>
            <p className={styles.heroTjanster}>Snickeri · Projektledning</p>
            <p className={styles.heroOrt}>Nordvästra Skåne</p>
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
              <span>Snickeri</span><span>Renovering</span><span>Uterum</span><span>Altan och trädäck</span><span>Takbyte</span><span>Kök och badrum</span><span>Fönsterbyte</span><span>Tillbyggnad</span><span>Nybyggnation</span><span>Helsingborg, Ängelholm, Landskrona, Svalöv, Klippan</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.wrap}>
        <div className={styles.stats} role="list" aria-label="Goldring Bygg i siffror">
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
            <h2 className={styles.h2}>Ett bygge är många yrken. <em>Ett nummer räcker.</em></h2>
          </div>
          <div className={styles.forvandling}>
            <figure><Image src="/goldring/media/galleri-fore-sliten-altan.jpg" alt="Sliten grå altan med spruckna brädor och mossa, ogräs runt kanten" width={1200} height={1200} /><figcaption><b>Före</b></figcaption></figure>
            <figure><Image src="/goldring/media/galleri-efter-ny-altan.jpg" alt="Samma plats med ny altan i furu, insynsskydd och trappa mot gräsmattan" width={1200} height={1200} /><figcaption><b>Efter</b></figcaption></figure>
          </div>
          <div className={styles.galleri}>
            <figure><Image src="/goldring/media/galleri-makro-altanhorn.jpg" alt="Närbild på altanhörnet där brädorna möter räckesstolpen" width={1200} height={1200} /><figcaption>Hörnet som visar hantverket.</figcaption></figure>
            <figure><Image src="/goldring/media/galleri-inglasat-uterum.jpg" alt="Nybyggd altan med inglasat uterum mot en villa" width={896} height={1200} /><figcaption>Uterummet, ritat efter huset.</figcaption></figure>
            <figure><Image src="/goldring/media/galleri-taklaggning.jpg" alt="Takläggning pågår: skifferplattor läggs rad för rad" width={1200} height={896} /><figcaption>Taket, rad för rad.</figcaption></figure>
            <figure><Image src="/goldring/media/galleri-badrum-renoverat.jpg" alt="Totalrenoverat badrum i mörk sten med walk-in-dusch" width={1200} height={896} /><figcaption>Badrummet, klart.</figcaption></figure>
          </div>
          <p className={styles.forvandlingNot}>Illustrationsbilder — byts mot era egna projektfoton.</p>
        </div>
      </section>

      <section className={styles.sek} id="tjanster">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}>
            <p className={styles.eyebrow}>Vad vi gör</p>
            <h2 className={styles.h2}>Ute, inne <em>och det som ska hålla ihop det</em></h2>
            <p className={styles.sekLead}>Uterum, altan och tak är det som syns från vägen. Kök, badrum och tillbyggnad är det som gör huset till ert. Vi gör snickeriet själva och projektleder resten.</p>
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
            <h2 className={styles.h2}>Fem steg, och samma person <em>i alla fem</em></h2>
            <p className={styles.sekLead}>Det börjar med ett samtal och slutar med en genomgång där du får säga om något sitter fel.</p>
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
            <h2 className={styles.h2}>Bräda för bräda, <em>med en tidplan som håller</em></h2>
          </div>
          <div className={styles.varforModul}>
            <figure className={styles.varforFilm}>
              <video autoPlay muted loop playsInline preload="metadata" poster="/goldring/media/poster-varfor.jpg" aria-label="Altanbrädorna läggs en efter en på det nya bjälklaget">
                <source src="/goldring/media/video-varfor-altanbradorna.mp4" type="video/mp4" />
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
            <a className={`${styles.btn} ${styles.btnMork}`} href="https://www.google.com/maps/search/Goldring+Bygg+%26+Entreprenad+AB+K%C3%A5ger%C3%B6d" target="_blank" rel="noopener">Se alla recensioner</a>
          </div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sociala}`} id="sociala">
        <div className={styles.wrap}>
          <div className={styles.socialaIkoner}>
            <a href={IG} target="_blank" rel="noopener" aria-label="Goldring Bygg på Instagram"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" /><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" /></svg></a>
            <a href={FB} target="_blank" rel="noopener" aria-label="Goldring Bygg på Facebook"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 8h2.5V4.5H14c-2.2 0-3.5 1.5-3.5 3.6V10H8v3.3h2.5V21h3.4v-7.7h2.6l.5-3.3h-3.1V8.5c0-.3.2-.5.6-.5z" fill="currentColor" /></svg></a>
          </div>
          <p className={styles.socialaTxt}>Följ vårt arbete i vardagen</p>
          <div className={styles.socialaRutnat}>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/goldring/media/sociala-tradack.jpg" alt="Goldring på Instagram: stort nybyggt trädäck i solen framför ett rött hus" width={356} height={356} /></a></figure>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/goldring/media/sociala-inomhuspool.jpg" alt="Goldring på Instagram: poolrum med synliga takbjälkar och loungehörna" width={356} height={356} /></a></figure>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/goldring/media/sociala-takisolering.jpg" alt="Goldring på Instagram: snickare i Goldring-tröja isolerar ett snedtak" width={356} height={356} /></a></figure>
          </div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="fragor">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}>
            <p className={styles.eyebrow}>Vanliga frågor</p>
            <h2 className={styles.h2}>Det du brukar fråga först</h2>
            <p className={styles.sekLead}>Pengar och bygglov först, det praktiska sedan. Gäller det just ditt hus är telefonen snabbare än en sida.</p>
          </div>
          <div className={styles.fragorGrid}>
            <div className={styles.fragor}>{FRAGOR.map((f) => <details className={styles.fraga} name="faq" key={f.q}><summary>{f.q}<span className={styles.fragaIkon} aria-hidden="true" /></summary><p>{f.a}</p></details>)}</div>
            <aside className={styles.fragaKort}><h3>Hittar du inte svaret?</h3><p>Ring och fråga rakt ut. Vi svarar inom en arbetsdag.</p><a className={`${styles.btn} ${styles.btnMork}`} href={TEL_HREF}>Ring {TEL}</a></aside>
          </div>
        </div>
      </section>

      <section className={styles.kontakt} id="kontakt">
        <div className={styles.wrap}>
          <div className={styles.kontaktGrid}>
            <div>
              <p className={styles.eyebrow}>Kontakt</p>
              <h2 className={styles.h2}>Redo att komma igång?<br /><em>Börja med hembesöket.</em></h2>
              <p className={styles.sekLead}>Berätta vad du vill bygga, så återkommer vi inom en arbetsdag och bokar ett kostnadsfritt hembesök. Vill du hellre prata direkt: ring.</p>
              <div className={styles.kontaktRader}>
                <a className={styles.kontaktRad} href={TEL_HREF}><span>Telefon</span><b>{TEL}</b></a>
                <a className={styles.kontaktRad} href={`mailto:${EPOST}`}><span>E-post</span><b>{EPOST}</b></a>
                <div className={styles.kontaktRad}><span>Adress</span><b>{ADRESS}</b></div>
                <a className={styles.kontaktRad} href={IG} target="_blank" rel="noopener"><span>Instagram</span><b>@goldringbygg</b></a>
              </div>
            </div>
            <form className={styles.form} action={FORM_ACTION} method="post" encType="text/plain" aria-describedby="form-not">
              <label>Namn<input type="text" name="namn" autoComplete="name" required /></label>
              <label>Telefon<input type="tel" name="telefon" autoComplete="tel" required /></label>
              <label>E-post (valfritt)<input type="email" name="epost" autoComplete="email" /></label>
              <label>Vad handlar det om?<select name="typ" defaultValue="Uterum eller altan"><option>Uterum eller altan</option><option>Tak</option><option>Kök eller badrum</option><option>Tillbyggnad eller nybyggnation</option><option>Fönsterbyte</option><option>Något annat</option></select></label>
              <label>Kort om projektet<textarea name="meddelande" rows={4} placeholder="Vad du vill bygga, var huset ligger, och när du vill ha det klart" /></label>
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
            <div><span className={styles.brandTxt}><b>Goldring Bygg & Entreprenad AB</b><i>Byggfirma i nordvästra Skåne</i></span><p className={styles.ftrText}>Uterum, altan, tak, kök, badrum, tillbyggnad och nybyggnation i Helsingborg, Ängelholm, Landskrona, Svalöv och Klippan. Snickeri och projektledning under samma nummer.</p></div>
            <div className={styles.ftrLankar}>{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}<a href={TEL_HREF}>{TEL}</a><a href={`mailto:${EPOST}`}>{EPOST}</a><a href={IG} target="_blank" rel="noopener">@goldringbygg</a><a href="#top">Till toppen</a></div>
          </div>
          <div className={styles.ftrBar}><span>Goldring Bygg & Entreprenad AB · Org.nr 559319-6230 · {ADRESS}</span><span>Förslag byggt av <a href="https://www.bahkobyra.se" target="_blank" rel="noopener">Bahko Byrå</a></span></div>
        </div>
      </footer>

      <div className={styles.mobilMenyLager} id="meny">
        <a className={styles.mobilMenySkugga} href="#stangd" tabIndex={-1} aria-hidden="true" />
        <nav className={styles.mobilMenyPanel} aria-label="Meny">{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}<a href="#kontakt">Kontakt</a><a className={styles.mobilMenyStang} href="#stangd">Stäng menyn</a></nav>
      </div>
      <span className={styles.stangdAnkare} id="stangd" />
      <input type="checkbox" id="popup-bort" className={styles.popupBort} aria-hidden="true" tabIndex={-1} />
      <aside className={styles.popup} aria-label="Kontakta Goldring Bygg">
        <label className={styles.popupX} htmlFor="popup-bort" role="button" aria-label="Stäng" tabIndex={0}>✕</label>
        <p className={styles.popupEyebrow}>Funderar du på uterum?</p>
        <p className={styles.popupTxt}>Hembesöket kostar ingenting, och du får höra vad som kräver bygglov och vad som inte gör det. Svar inom en arbetsdag.</p>
        <a className={`${styles.btn} ${styles.popupCta}`} href={TEL_HREF}>Ring {TEL}</a>
        <a className={styles.popupAlt} href="#kontakt">Eller skriv några rader →</a>
      </aside>
      <a className={styles.demoKnapp} href="#bahko-demo">Om det här förslaget</a>
      <div className={styles.modalLager} id="bahko-demo">
        <a className={styles.modalSkugga} href="#stangd" tabIndex={-1} aria-hidden="true" />
        <section className={styles.modal} aria-labelledby="bahko-rubrik">
          <a className={styles.modalX} href="#stangd" aria-label="Stäng">✕</a>
          <span className={styles.modalBadge}>Förslag av Bahko Byrå</span>
          <h3 id="bahko-rubrik">Så här kan Goldring Bygg se ut på nätet</h3>
          <p>Det här är ett kostnadsfritt förslag, byggt på det ni själva visar på goldring.se och Instagram. Ingen beställning, inget åtagande. Vill ni se den skarpt med era egna projektfoton, riktiga omdömen och ett formulär som landar i inkorgen? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.</p>
          <a className={styles.modalCta} href="https://cal.eu/bahkobyra/15min" target="_blank" rel="noopener">Boka 15 min gratis samtal →</a>
          <a className={styles.modalAlt} href="mailto:mathias@bahkobyra.se?subject=Goldring%20Bygg%20-%20f%C3%B6rslag%20p%C3%A5%20hemsida">Eller mejla → mathias@bahkobyra.se</a>
          <span className={styles.modalFot}>Bahko Byrå · Synlighet som säljer.</span>
        </section>
      </div>
    </div>
  );
}
