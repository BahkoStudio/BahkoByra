import Image from 'next/image';
import { Archivo, Inter } from 'next/font/google';
import styles from './rolssons.module.css';

/* ===========================================================================
   R. OLSSONS MÅLERI AB — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: instagram.com/rolssonsmaleri · Kristinehamn · har hemsida
   (rolssonsmaleri.se, WordPress/Elementor) — Mathias: "hade visst en kass
   sida". Förslaget ska slå den.
   Byggd på golvvision-kanon (via alltfix) med hero som före/efter-effekt.

   Bärande idé: deras egen slogan, som står i logotypbilden på sajten:
   "Du får tid, jag förnyar." Kunden slipper helgerna med penseln, och
   trapphuset, fasaden eller rummet blir som nytt. Heron visar det i ett
   trapphus, det jobb där BRF och fastighetsbolag är deras kunder.

   VERIFIERAT (rolssonsmaleri.se + IG-bio + Offerta, 2026-09-18):
   Firmanamn "R. Olssons Måleri AB" · org.nr 559286-6981 (sajtens sidfot) ·
   Varnumsleden 5, Kristinehamn · telefon 072-251 08 28 · e-post
   ronny@rolssonsmaleri.se · kontaktperson Ronny Olsson (Offerta) ·
   områden ordagrant: Kristinehamn, Karlskoga, Karlstad, Degerfors och
   Örebro med omnejd · tjänster: inomhusmålning, fasadmålning, tapetsering,
   trapphusmålning, mikrocement · kunder: privatpersoner, företag,
   fastighetsbolag, byggföretag, bostadsrättsföreningar, offentlig
   verksamhet · "kostnadsfri offert", "inledande besök", "Nöjd
   kundgaranti", nära samarbete med ledande färg- och tapetleverantörer ·
   IG-bio: "Allt inom Måleri invändigt & utvändigt utifrån kundens behov
   med stort fokus på kvalitet." · Offerta: 5 stjärnor på 1 omdöme
   (Matilda, Nora, 2026-09-08, citeras ordagrant), ansvarsförsäkring hos
   Trygg-Hansa upp till 10 000 000 kr, F-skatt, moms, skuldsaldo 0 kr,
   medlem sedan 2023, "många års erfarenhet i branschen" · Facebook-profil
   länkad från sajten · egna jobbilder från sajten (tapetsering, trapphus,
   nymålade rum) · logotypen är deras egen, svart bakgrund bortnycklad.

   INTE verifierat, och finns därför inte på sidan: grundat år, antal
   anställda, antal jobb, priser, Google-betyg. Sajtens ROT-belopp nämns
   inte som siffra — reglerna ändras och det är deras uppgift, inte vår.

   FLAGGOR: riktigt telefon och mejl på sidan — visa inte offentligt.
   Formuläret går till mathias@bahkobyra.se. Ett riktigt omdöme + två
   märkta exempel. Heron och Varför-klippet är illustrationer; galleri och
   sociala är deras egna bilder.
   =========================================================================== */

const display = Archivo({ subsets: ['latin'], weight: ['400', '600'], display: 'swap', variable: '--ro-display' });
const displayKursiv = Archivo({ subsets: ['latin'], weight: ['400', '600'], style: ['italic'], display: 'swap', preload: false, variable: '--ro-display-kursiv' });
const ui = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap', variable: '--ro-ui' });

export const metadata = {
  title: 'R. Olssons Måleri AB — målare i Kristinehamn, Karlskoga och Karlstad',
  description:
    'Inomhusmålning, fasadmålning, tapetsering och trapphusmålning i Kristinehamn, Karlskoga, Karlstad, Degerfors och Örebro. Kostnadsfri offert. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

const TEL = '072-251 08 28';
const TEL_HREF = 'tel:+46722510828';
const EPOST = 'ronny@rolssonsmaleri.se';
const ADRESS = 'Varnumsleden 5, Kristinehamn';
const IG = 'https://www.instagram.com/rolssonsmaleri/';
const FB = 'https://www.facebook.com/profile.php?id=100063985335827';
const OFFERTA = 'https://offerta.se/foretag/r-olssons-maleri-ab';
const FORM_ACTION = 'mailto:mathias@bahkobyra.se?subject=R.%20Olssons%20M%C3%A5leri%20-%20offertf%C3%B6rfr%C3%A5gan';

const LANKAR = [
  { href: '#tjanster', txt: 'Vad vi gör' },
  { href: '#process', txt: 'Så går det till' },
  { href: '#varfor', txt: 'Varför oss' },
  { href: '#fragor', txt: 'Vanliga frågor' },
];

const RITNINGAR = {
  inne: (<><path d="M30 26h140v72H30z" /><path d="M30 62h140" /><path d="M64 26v72M100 26v72M136 26v72" /><path d="M30 110h140M30 106v8M170 106v8" /></>),
  fasad: (<><path d="M20 100V44l80-30 80 30v56" /><path d="M20 100h160" /><path d="M56 60h20v20H56zM124 60h20v20h-20z" /><path d="M40 40v60M64 32v68M88 24v76M112 24v76M136 32v68M160 40v60" /></>),
  tapet: (<><path d="M40 20h120v84H40z" /><path d="M80 20v84M120 20v84" /><path d="M48 40c8-8 16 8 24 0M88 40c8-8 16 8 24 0M128 40c8-8 16 8 24 0M48 64c8-8 16 8 24 0M88 64c8-8 16 8 24 0M128 64c8-8 16 8 24 0M48 88c8-8 16 8 24 0M88 88c8-8 16 8 24 0M128 88c8-8 16 8 24 0" /></>),
  trapphus: (<><path d="M20 104h40V84h30V64h30V44h30V24h30" /><path d="M20 104h160" /><path d="M30 94l140-80" /><path d="M170 14v10" /></>),
};

const TJANSTER = [
  { id: 'inne', ritning: 'inne', namn: 'Inomhusmålning', text: 'Väggar, tak och snickerier i hem och på kontor. Rätt förarbete, rätt färg och känsla för detaljer, så att rummet får ett rejält lyft som håller.', punkter: ['Väggar och tak', 'Snickerier och dörrar', 'Mikrocement'] },
  { id: 'fasad', ritning: 'fasad', namn: 'Fasadmålning', text: 'Många väntar för länge med fasaden, och då blir jobbet både dyrare och större. Vi målar i tid och enligt konstens alla regler.', punkter: ['Träfasad', 'Putsfasad', 'Fönster och detaljer'] },
  { id: 'tapet', ritning: 'tapet', namn: 'Tapetsering', text: 'Raka skarvar, mönster som stämmer och väggar som är förberedda innan första våden. Små och stora projekt.', punkter: ['Tapetborttagning', 'Förarbete av väggar', 'Mönster och fondväggar'] },
  { id: 'trapphus', ritning: 'trapphus', namn: 'Trapphusmålning', text: 'Trapphuset är det första den som besöker huset ser. Vi målar för BRF, fastighetsbolag och byggföretag med färg som tål slitaget.', punkter: ['Bostadsrättsföreningar', 'Fastighetsbolag', 'Byggföretag'] },
];

const STEGRITNINGAR = {
  kontakt: (<><path d="M40 30h120v60H40z" /><path d="M40 30l60 40 60-40" /><path d="M40 104h120M40 100v8M160 100v8" /></>),
  besok: (<><path d="M14 74h172v22H14z" /><path d="M32 74v10M50 74v14M68 74v10M86 74v14M104 74v10M122 74v14M140 74v10M158 74v14" /><path d="M14 56h172M14 50v12M186 50v12" /><path d="M60 30h80" /></>),
  offert: (<><path d="M28 18h144v84H28z" /><path d="M44 38h64M44 52h96M44 66h48" /><path d="M120 60h36v30h-36z" /><path d="M28 110h144M28 106v8M172 106v8" /></>),
  maleri: (<><path d="M30 26h140v72H30z" /><path d="M30 62h140" /><path d="M64 26v72M100 26v72M136 26v72" /><path d="M30 110h140M30 106v8M170 106v8" /></>),
  klart: (<><path d="M32 20h136v76H32z" /><path d="M32 66h136" /><path d="M58 40l16 16 32-34" /><path d="M54 82h92" /><path d="M32 108h136M32 104v8M168 104v8" /></>),
};

const STEG = [
  { nr: '1', namn: 'Hör av dig', ritning: 'kontakt', text: 'Ring eller skriv några rader om vad som ska målas. Du behöver inte kunna facktermerna.' },
  { nr: '2', namn: 'Inledande besök', ritning: 'besok', text: 'Vi kommer ut och tittar på ytorna, pratar färg och tapet och ser vad som behöver förarbetas.' },
  { nr: '3', namn: 'Kostnadsfri offert', ritning: 'offert', text: 'Du får priset innan något börjar. Offerten kostar ingenting.' },
  { nr: '4', namn: 'Vi målar', ritning: 'maleri', text: 'Förarbete, täckning och färg av kvalitet från ledande leverantörer. Du får tiden, vi förnyar.' },
  { nr: '5', namn: 'Nöjd kund', ritning: 'klart', text: 'Vi går igenom resultatet med dig. Nöjd kundgaranti: vi lämnar inte projektet förrän du är nöjd.' },
];

/* Verifierade tal: 10 MSEK är ansvarsförsäkringen på Offerta, 5 orter är
   sajtens egen lista, 0 kr offert står på sajten. En kontakt är erbjudande. */
const STATS = [
  { tal: 10, prefix: '', etikett: 'MSEK i ansvarsförsäkring' },
  { tal: 5, prefix: '', etikett: 'Orter vi täcker' },
  { tal: 0, prefix: '', etikett: 'Kronor för offerten' },
  { tal: 1, prefix: '', etikett: 'Kontaktperson hela vägen' },
];

const VARFOR = [
  'Du får tid, vi förnyar. Du lägger inte helgerna på stegen.',
  'Nöjd kundgaranti och ansvarsförsäkring på tio miljoner kronor.',
  'Nära samarbete med ledande färg- och tapetleverantörer, för bättre val, pris och garanti.',
  'Räcker det att bättringsmåla säger vi det. Även när en ommålning hade gett oss mer betalt.',
];

/* Ett riktigt omdöme (Offerta, ordagrant). De två andra är exempel och märkta. */
const OMDOMEN = [
  { namn: 'Matilda', ort: 'Målning och tapetsering, Nora · sept 2026', text: 'Personligt engagemang, lyhörd för önskemål och ett jättefint resultat. Vi är så nöjda! Tack så mycket R. Olssons Måleri AB', exempel: false },
  { namn: 'Exempel', ort: 'Bostadsrättsförening, Karlstad', text: 'Exempel: här står ett riktigt omdöme från en kund, med namn och ort som de själva skrivit det.', exempel: true },
  { namn: 'Exempel', ort: 'Villa, Kristinehamn', text: 'Exempel: ett tredje kort, hämtat ur er Google-profil när den är på plats.', exempel: true },
];

const FRAGOR = [
  { q: 'Vad kostar det att måla om?', a: 'Det beror på ytorna och skicket. Vi kommer gärna ut på ett inledande besök, och offerten kostar ingenting.' },
  { q: 'Hur går det till?', a: 'Du hör av dig, vi tittar på plats, du får en kostnadsfri offert, vi målar och går igenom resultatet med dig innan vi lämnar.' },
  { q: 'Målar ni trapphus åt bostadsrättsföreningar?', a: 'Ja. Trapphus är en stor del av vårt arbete, åt BRF, fastighetsbolag och byggföretag.' },
  { q: 'Kan jag använda ROT-avdrag?', a: 'Målning och tapetsering i din bostad ger ofta rätt till ROT. Vi säger vad som gäller ditt jobb när vi har sett det.' },
  { q: 'Är ni försäkrade?', a: 'Ja. Vi har ansvarsförsäkring hos Trygg-Hansa upp till tio miljoner kronor, F-skatt och en nöjd kundgaranti.' },
  { q: 'Gör ni mikrocement?', a: 'Ja, utöver måleri och tapetsering. Hör av dig och berätta vilken yta det gäller.' },
  { q: 'När ska fasaden målas om?', a: 'Innan färgen släpper. Många väntar för länge, och då blir jobbet både större och dyrare. Vi tittar gärna och säger ärligt om det kan vänta.' },
  { q: 'Var arbetar ni?', a: 'Kristinehamn, Karlskoga, Karlstad, Degerfors och Örebro med omnejd.' },
];

const Stjarnor = ({ tom }) => (<span className={`${styles.stjarnor}${tom ? ` ${styles.stjarnorTomma}` : ''}`} role="img" aria-label={tom ? 'Stjärnor, exempel' : 'Fem stjärnor'}>{[0, 1, 2, 3, 4].map((i) => (<svg viewBox="0 0 24 24" aria-hidden="true" key={i}><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.5L12 17.3l-5.9 3.2 1.3-6.5L2.5 9.4l6.6-.8z" /></svg>))}</span>);

export default function RolssonsDemo() {
  return (
    <div className={`${display.variable} ${displayKursiv.variable} ${ui.variable} ${styles.sida}`}>
      <header className={styles.hdr}>
        <div className={styles.hdrIn}>
          <a className={styles.brand} href="#top"><span className={styles.brandTxt}><b>R. Olssons Måleri</b><i>Kristinehamn</i></span></a>
          <nav className={styles.nav}>{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}</nav>
          <a className={styles.mobilNavKnapp} href="#meny"><span>Meny</span><span className={styles.mobilNavIkon} aria-hidden="true" /></a>
          <a className={styles.hdrTel} href={TEL_HREF} aria-label={`Ring ${TEL}`}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg><span className={styles.hdrTelNr} aria-hidden="true">{TEL}</span><span className={styles.hdrTelKort} aria-hidden="true">Ring</span></a>
        </div>
      </header>

      <section className={styles.hero} id="top">
        <figure className={styles.heroFilm}>
          <video className={styles.heroLiggande} autoPlay muted loop playsInline preload="metadata" poster="/rolssons/media/poster-hero.jpg"><source src="/rolssons/media/video-hero-fore-efter-trapphus.mp4" type="video/mp4" /></video>
          <video className={styles.heroStaende} autoPlay muted loop playsInline preload="metadata" poster="/rolssons/media/poster-hero-mobil.jpg"><source src="/rolssons/media/video-hero-fore-efter-trapphus-mobil.mp4" type="video/mp4" /></video>
        </figure>
        <div className={styles.heroLager}>
          <div className={styles.heroLagerIn}>
            <h1 className={`${styles.heroLogo} ${styles.heroLogoBred}`}><Image src="/rolssons/media/logo-rolssons-vit.png" alt="R. Olssons Måleri AB" width={1079} height={809} priority /></h1>
            <p className={styles.heroTjanster}>Måleri · Tapetsering</p>
            <p className={styles.heroOrt}>Kristinehamn · Karlskoga · Karlstad</p>
            <div className={styles.heroCta}>
              <a className={styles.btn} href="#kontakt">Få kostnadsfri offert</a>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={TEL_HREF}>Ring {TEL}</a>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.tejp} role="group" aria-label="Det här gör vi">
        <div className={styles.tejpSpar}>{[false, true].map((kopia) => (<div className={styles.tejpIn} aria-hidden={kopia || undefined} key={kopia ? 'b' : 'a'}><span>Inomhusmålning</span><span>Fasadmålning</span><span>Tapetsering</span><span>Trapphusmålning</span><span>Mikrocement</span><span>Kristinehamn</span><span>Karlskoga</span><span>Karlstad</span></div>))}</div>
      </div>

      <div className={styles.wrap}>
        <div className={styles.stats} role="list" aria-label="R. Olssons Måleri i siffror">
          {STATS.map((s) => (<div className={styles.stat} role="listitem" key={s.etikett}><b>{s.prefix}<span className={styles.statTal} style={{ '--mal': s.tal }} aria-hidden="true" /><span className={styles.statStatisk}>{s.tal}</span></b><span>{s.etikett}</span></div>))}
        </div>
      </div>

      <section className={styles.sek} id="forvandling">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Förvandlingen</p><h2 className={styles.h2}>Du får tid. <em>Vi förnyar.</em></h2><p className={styles.sekLead}>Ett trapphus som är slitet säger något om hela huset. Ett som är fräscht säger något annat. Skillnaden är en målare som gör förarbetet och inte har bråttom.</p></div>
          <div className={styles.forvandling}>
            <figure><Image src="/rolssons/media/galleri-fore-slitet-trapphus.jpg" alt="Slitet trapphus med smutsiga väggar, märken och lagade sprickor" width={1200} height={1200} /><figcaption><b>Före</b></figcaption></figure>
            <figure><Image src="/rolssons/media/galleri-efter-nymalat-trapphus.jpg" alt="Samma trapphus nymålat med släta ljusa väggar och vitlackad ledstång" width={1200} height={1200} /><figcaption><b>Efter</b></figcaption></figure>
          </div>
          <p className={styles.forvandlingNot}>Före/efter-paret är en illustration. Bilderna nedan är våra egna jobb.</p>
          <div className={styles.galleri}>
            <figure><Image src="/rolssons/media/galleri-tapet-kamin.jpg" alt="Rum med mönstrad tapet, trägolv och en svart kamin" width={1200} height={1200} /><figcaption>Tapetsering med mönsterpassning.</figcaption></figure>
            <figure><Image src="/rolssons/media/galleri-gront-rum.jpg" alt="Nymålat rum i dov grön kulör med ljust trägolv" width={1200} height={1200} /><figcaption>Kulör som ger rummet karaktär.</figcaption></figure>
            <figure><Image src="/rolssons/media/galleri-trapphus.jpg" alt="Nymålat trapphus med räcke och röd vägg" width={1200} height={1200} /><figcaption>Trapphus som välkomnar.</figcaption></figure>
            <figure><Image src="/rolssons/media/galleri-morkt-rum.jpg" alt="Rum målat i mörkblått runt ett fönster" width={1200} height={1200} /><figcaption>Mörka väggar kräver jämn hand.</figcaption></figure>
          </div>
        </div>
      </section>

      <section className={styles.sek} id="tjanster">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Vad vi gör</p><h2 className={styles.h2}>Allt inom måleri, <em>invändigt och utvändigt</em></h2><p className={styles.sekLead}>Utifrån kundens behov, med stort fokus på kvalitet. Åt privatpersoner, företag, fastighetsbolag och bostadsrättsföreningar.</p></div>
          <div className={styles.tjanster}>{TJANSTER.map((t) => (<article className={styles.tjanst} key={t.id}><svg className={styles.ritning} viewBox="0 0 200 120" aria-hidden="true">{RITNINGAR[t.ritning]}</svg><h3>{t.namn}</h3><p>{t.text}</p><ul>{t.punkter.map((p) => <li key={p}>{p}</li>)}</ul></article>))}</div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="process">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Så går det till</p><h2 className={styles.h2}>Fem steg, och offerten är gratis <em>i det tredje</em></h2><p className={styles.sekLead}>Personligt, lyhört och utan överraskningar. Så här går ett jobb till.</p></div>
          <div className={styles.stegBlock}>
            {STEG.map((s, i) => <input type="radio" name="steg" id={`steg-${s.nr}`} className={styles.stegRadio} defaultChecked={i === 0} key={`r-${s.nr}`} />)}
            <div className={styles.stegVal} role="tablist" aria-label="Så går det till">{STEG.map((s) => <label className={styles.stegKnapp} htmlFor={`steg-${s.nr}`} key={`l-${s.nr}`}><span>{s.namn}</span></label>)}</div>
            <div className={styles.stegKort}>{STEG.map((s) => (<article className={styles.stegPanel} key={`p-${s.nr}`}><svg className={styles.stegRitning} viewBox="0 0 200 120" aria-hidden="true">{STEGRITNINGAR[s.ritning]}</svg><div><h3>{s.namn}</h3><p>{s.text}</p></div></article>))}</div>
          </div>
        </div>
      </section>

      <section className={styles.sek} id="varfor">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Varför oss</p><h2 className={styles.h2}>Personligt, <em>och noggrant</em></h2></div>
          <div className={styles.varforModul}>
            <figure className={styles.varforFilm}><video autoPlay muted loop playsInline preload="metadata" poster="/rolssons/media/poster-varfor.jpg" aria-label="Långsam åkning längs en nytapetserad trappvägg"><source src="/rolssons/media/video-varfor-tapeten.mp4" type="video/mp4" /></video></figure>
            <ul className={styles.varforPunkter}>{VARFOR.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="omdomen">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Omdömen</p><h2 className={styles.h2}>Vad kunderna säger</h2><p className={styles.googleRad}><Stjarnor /><span>5 på Offerta, ett omdöme</span></p></div>
          <div className={styles.recensioner}>
            {OMDOMEN.map((o, i) => (<figure className={styles.recension} key={i}><div className={styles.recensionHuvud}><span className={styles.avatar} aria-hidden="true">{o.namn[0]}</span><figcaption><b>{o.namn}</b><span>{o.ort}</span></figcaption></div><Stjarnor tom={o.exempel} /><blockquote>{o.text}</blockquote></figure>))}
          </div>
          <div className={styles.recensionerFot}><p className={styles.recensionerNot}>Första omdömet är från Offerta, som det står där. De två andra är exempel — byts mot era riktiga.</p><a className={`${styles.btn} ${styles.btnMork}`} href={OFFERTA} target="_blank" rel="noopener">Se omdömet på Offerta</a></div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sociala}`} id="sociala">
        <div className={styles.wrap}>
          <div className={styles.socialaIkoner}>
            <a href={IG} target="_blank" rel="noopener" aria-label="R. Olssons Måleri på Instagram"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" /><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" /></svg></a>
            <a href={FB} target="_blank" rel="noopener" aria-label="R. Olssons Måleri på Facebook"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 8h2.5V4.5H14c-2.2 0-3.5 1.5-3.5 3.6V10H8v3.3h2.5V21h3.4v-7.7h2.6l.5-3.3h-3.1V8.5c0-.3.2-.5.6-.5z" fill="currentColor" /></svg></a>
          </div>
          <p className={styles.socialaTxt}>Följ vårt arbete i vardagen</p>
          <div className={styles.socialaRutnat}>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/rolssons/media/sociala-kok-tapet.jpg" alt="Kök under renovering med nytapetserad vägg" width={1200} height={1200} /></a></figure>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/rolssons/media/sociala-trapphus-dorr.jpg" alt="Nymålat trapphus med lägenhetsdörr och räcke" width={1200} height={1200} /></a></figure>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/rolssons/media/sociala-ljust-rum.jpg" alt="Nymålat ljusgrått rum med fönster" width={1200} height={1200} /></a></figure>
          </div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="fragor">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Vanliga frågor</p><h2 className={styles.h2}>Det ni brukar fråga först</h2><p className={styles.sekLead}>Pris och försäkring först, det praktiska sedan. Gäller det just ert hus är telefonen snabbare än en sida.</p></div>
          <div className={styles.fragorGrid}>
            <div className={styles.fragor}>{FRAGOR.map((f) => <details className={styles.fraga} name="faq" key={f.q}><summary>{f.q}<span className={styles.fragaIkon} aria-hidden="true" /></summary><p>{f.a}</p></details>)}</div>
            <aside className={styles.fragaKort}><h3>Hittar du inte svaret?</h3><p>Ring Ronny och fråga rakt ut. Du får ett ärligt svar om vad som behöver göras.</p><a className={`${styles.btn} ${styles.btnMork}`} href={TEL_HREF}>Ring {TEL}</a></aside>
          </div>
        </div>
      </section>

      <section className={styles.kontakt} id="kontakt">
        <div className={styles.wrap}>
          <div className={styles.kontaktGrid}>
            <div>
              <p className={styles.eyebrow}>Kontakt</p>
              <h2 className={styles.h2}>Vad ska målas,<br /><em>och när?</em></h2>
              <p className={styles.sekLead}>Ring eller skriv några rader. Vi kommer gärna ut på ett inledande besök, och offerten kostar ingenting.</p>
              <div className={styles.kontaktRader}>
                <a className={styles.kontaktRad} href={TEL_HREF}><span>Telefon</span><b>{TEL}</b></a>
                <a className={styles.kontaktRad} href={`mailto:${EPOST}`}><span>E-post</span><b>{EPOST}</b></a>
                <div className={styles.kontaktRad}><span>Adress</span><b>{ADRESS}</b></div>
                <a className={styles.kontaktRad} href={IG} target="_blank" rel="noopener"><span>Instagram</span><b>@rolssonsmaleri</b></a>
              </div>
            </div>
            <form className={styles.form} action={FORM_ACTION} method="post" encType="text/plain" aria-describedby="form-not">
              <label>Namn<input type="text" name="namn" autoComplete="name" required /></label>
              <label>Telefon<input type="tel" name="telefon" autoComplete="tel" required /></label>
              <label>E-post (valfritt)<input type="email" name="epost" autoComplete="email" /></label>
              <label>Vad gäller det?<select name="typ" defaultValue="Inomhusmålning"><option>Inomhusmålning</option><option>Fasadmålning</option><option>Tapetsering</option><option>Trapphusmålning</option><option>Mikrocement</option><option>Något annat</option></select></label>
              <label>Kort om jobbet<textarea name="meddelande" rows={4} placeholder="Vad som ska målas, ungefär hur stort, var och när du vill ha det klart" /></label>
              <button className={styles.btn} type="submit">Få kostnadsfri offert</button>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={TEL_HREF}>Eller ring {TEL}</a>
              <p className={styles.formNot} id="form-not">Skriv kort om jobbet — då kan vi ge ett vettigt svar redan i första samtalet. Inga massutskick, ingen säljlista.</p>
              <p className={styles.formNot}>Obs: i det här förslaget öppnar knappen ditt e-postprogram och skickar raderna till Bahko Byrå. I den skarpa sajten kopplas formuläret in och landar direkt i er egen inkorg.</p>
            </form>
          </div>
        </div>
      </section>

      <footer className={styles.ftr}>
        <div className={styles.wrap}>
          <div className={styles.ftrGrid}>
            <div><span className={styles.brandTxt}><b>R. Olssons Måleri AB</b><i>Du får tid, vi förnyar</i></span><p className={styles.ftrText}>Allt inom måleri invändigt och utvändigt i Kristinehamn, Karlskoga, Karlstad, Degerfors och Örebro med omnejd.</p></div>
            <div className={styles.ftrLankar}>{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}<a href={TEL_HREF}>{TEL}</a><a href={`mailto:${EPOST}`}>{EPOST}</a><a href={IG} target="_blank" rel="noopener">@rolssonsmaleri</a><a href="#top">Till toppen</a></div>
          </div>
          <div className={styles.ftrBar}><span>R. Olssons Måleri AB · Org.nr 559286-6981 · {ADRESS}</span><span>Förslag byggt av <a href="https://www.bahkobyra.se" target="_blank" rel="noopener">Bahko Byrå</a></span></div>
        </div>
      </footer>

      <div className={styles.mobilMenyLager} id="meny"><a className={styles.mobilMenySkugga} href="#stangd" tabIndex={-1} aria-hidden="true" /><nav className={styles.mobilMenyPanel} aria-label="Meny">{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}<a href="#kontakt">Kontakt</a><a className={styles.mobilMenyStang} href="#stangd">Stäng menyn</a></nav></div>
      <span className={styles.stangdAnkare} id="stangd" />
      <input type="checkbox" id="popup-bort" className={styles.popupBort} aria-hidden="true" tabIndex={-1} />
      <aside className={styles.popup} aria-label="Kontakta R. Olssons Måleri"><label className={styles.popupX} htmlFor="popup-bort" role="button" aria-label="Stäng" tabIndex={0}>✕</label><p className={styles.popupEyebrow}>Trött på väggarna?</p><p className={styles.popupTxt}>Ronny kommer gärna ut och tittar. Offerten kostar ingenting, och du bestämmer efteråt.</p><a className={`${styles.btn} ${styles.popupCta}`} href={TEL_HREF}>Ring {TEL}</a><a className={styles.popupAlt} href="#kontakt">Eller skriv några rader →</a></aside>
      <a className={styles.demoKnapp} href="#bahko-demo">Om det här förslaget</a>
      <div className={styles.modalLager} id="bahko-demo"><a className={styles.modalSkugga} href="#stangd" tabIndex={-1} aria-hidden="true" /><section className={styles.modal} aria-labelledby="bahko-rubrik"><a className={styles.modalX} href="#stangd" aria-label="Stäng">✕</a><span className={styles.modalBadge}>Förslag av Bahko Byrå</span><h3 id="bahko-rubrik">Så här kan R. Olssons Måleri se ut på nätet</h3><p>Det här är ett kostnadsfritt förslag, byggt på det ni själva visar på rolssonsmaleri.se, Offerta och Instagram, med era egna jobbilder. Ingen beställning, inget åtagande. Vill ni se den skarpt med ett formulär som landar i inkorgen? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.</p><a className={styles.modalCta} href="https://cal.eu/bahkobyra/15min" target="_blank" rel="noopener">Boka 15 min gratis samtal →</a><a className={styles.modalAlt} href="mailto:mathias@bahkobyra.se?subject=R.%20Olssons%20M%C3%A5leri%20-%20f%C3%B6rslag%20p%C3%A5%20hemsida">Eller mejla → mathias@bahkobyra.se</a><span className={styles.modalFot}>Bahko Byrå · Synlighet som säljer.</span></section></div>
    </div>
  );
}
