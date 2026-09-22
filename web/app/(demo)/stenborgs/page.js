import Image from 'next/image';
import { Archivo, Inter } from 'next/font/google';
import styles from './stenborgs.module.css';

/* ===========================================================================
   STENBORGS MEDIA AB — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: instagram.com/stenborgs.media · Gävle · har hemsida (stenborgen.se,
   Wix, en sida + Om oss) — förslaget är en förbättring.
   Byggd på golvvision-kanon (via rskompakt) med hero som före/efter-effekt.

   Bärande idé: skillnaden mellan en mobilbild och en produktion är inte
   kameran, det är förberedelsen. Heron visar exakt det: samma lokal, osminkad
   i platt ljus, som riggas och ljussätts tills den ser ut som något folk vill
   gå till. Deras egen mening bär det: "Vi förstår affärer på riktigt, inte
   enbart det estetiska."

   VERIFIERAT (stenborgen.se + Om oss + IG-bio + allabolag, 2026-09-09):
   Firmanamn "Stenborgs Media AB" · org.nr 559452-2848, registrerat
   2023-10-12, aktiebolag, 1 anställd · Södra Centralgatan 15, 802 51 Gävle
   · telefon 076-050 29 89 (sajtens tel-länk) · Jim Stenborg, "över 20 år
   gammal passion", "drygt 10 år" av anställningar innan eget (Om oss) ·
   tjänster i deras ord: fotografering och videoproduktion för företag,
   löpande content · egna fraser: "Producerar förtroende, ibland foto &
   film", "Vi förstår affärer på riktigt, inte enbart det estetiska", "Inga
   idéer blev verklighet i tystnad" · ett omdöme på sajten: Philip Bergström,
   Eldson AB, ordagrant · kundlogotyper på Om oss: Solargate, Svenska Bil &
   Däck, Tandhälsovården, Strandbaden, Webbo, Anna Nordlöw · i IG-flödet:
   Torggatans Tandvård, Bakfickan, Hamnköket Gefle · IG 294 inlägg, 2 033
   följare, höjdpunkter Film/Tävling/Företag/Porträtt · logotypen är deras
   egen (vitt ordmärke med kameraikon, ikonen inverterad till vitt).

   INTE verifierat, och finns därför inte på sidan: e-post (sajten har bara
   formulär), Google-betyg, priser, ledtider, antal produktioner, Facebook.
   "Över 20 år" står som deras egen uppgift, inte som ett räknat tal.

   FLAGGOR: formuläret går till mathias@bahkobyra.se; två omdömeskort är
   exempel och märkta; galleriet och sociala är illustrationer, märkt en gång.
   =========================================================================== */

const display = Archivo({ subsets: ['latin'], weight: ['400', '600'], display: 'swap', variable: '--st-display' });
const displayKursiv = Archivo({ subsets: ['latin'], weight: ['400', '600'], style: ['italic'], display: 'swap', preload: false, variable: '--st-display-kursiv' });
const ui = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap', variable: '--st-ui' });

export const metadata = {
  title: 'Stenborgs Media AB — foto och film för företag i Gävle',
  description:
    'Produktionsbolag i Gävle. Företagsfilm, produktfoto, porträtt och löpande content med affären i fokus. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

const TEL = '076-050 29 89';
const TEL_HREF = 'tel:+46760502989';
const ADRESS = 'Södra Centralgatan 15, 802 51 Gävle';
const IG = 'https://www.instagram.com/stenborgs.media/';
const FORM_ACTION = 'mailto:mathias@bahkobyra.se?subject=Stenborgs%20Media%20-%20f%C3%B6rfr%C3%A5gan';

const LANKAR = [
  { href: '#tjanster', txt: 'Vad vi gör' },
  { href: '#process', txt: 'Så går det till' },
  { href: '#varfor', txt: 'Varför oss' },
  { href: '#fragor', txt: 'Vanliga frågor' },
];

const RITNINGAR = {
  film: (<><path d="M30 34h110v56H30z" /><path d="M140 52l32-16v56l-32-16" /><path d="M46 50h18M46 62h30" /><path d="M30 104h142M30 100v8M172 100v8" /></>),
  foto: (<><path d="M28 40h32l10-14h60l10 14h32v60H28z" /><circle cx="100" cy="68" r="18" /><circle cx="100" cy="68" r="8" /><path d="M150 52h10" /></>),
  portratt: (<><path d="M40 20h120v84H40z" /><circle cx="100" cy="52" r="14" /><path d="M70 96c4-18 16-26 30-26s26 8 30 26" /><path d="M40 112h120" /></>),
  content: (<><path d="M22 24h48v48H22zM76 24h48v48H76zM130 24h48v48h-48z" /><path d="M22 80h48v24H22zM76 80h48v24H76zM130 80h48v24h-48z" /><path d="M36 48l10-10 12 14 10-8 8 12" /></>),
};

const TJANSTER = [
  { id: 'film', ritning: 'film', namn: 'Företagsfilm', text: 'Filmen som visar vad ni gör och hur det känns att anlita er. Planerad efter vad den ska åstadkomma, inte efter vad som ser häftigt ut.', punkter: ['Presentationsfilm', 'Reklamfilm och reels', 'Eventfilm'] },
  { id: 'foto', ritning: 'foto', namn: 'Foto för företag', text: 'Lokalen, produkten, teamet. Bilder som håller på hemsidan, i annonsen och på skylten, tagna så att de går att använda i åratal.', punkter: ['Lokal och miljö', 'Produktfoto', 'Mat och dryck'] },
  { id: 'portratt', ritning: 'portratt', namn: 'Porträtt', text: 'Medarbetarporträtt och profilbilder i samma ton för hela teamet. Snabbt på plats hos er, eller i studio.', punkter: ['Medarbetarporträtt', 'Profilbilder', 'Samma ton för alla'] },
  { id: 'content', ritning: 'content', namn: 'Löpande content', text: 'En långsiktig partner som tar fram foto och film varje månad, så att kanalerna aldrig står tomma och allt håller samma nivå.', punkter: ['Månadsvisa produktioner', 'Sociala medier', 'Foto och film i ett'] },
];

const STEGRITNINGAR = {
  samtal: (<><path d="M40 30h120v60H40z" /><path d="M40 30l60 40 60-40" /><path d="M40 104h120M40 100v8M160 100v8" /></>),
  plan: (<><path d="M28 18h144v84H28z" /><path d="M44 38h64M44 52h96M44 66h48" /><path d="M120 60h36v30h-36z" /><path d="M28 110h144M28 106v8M172 106v8" /></>),
  inspelning: (<><path d="M30 34h110v56H30z" /><path d="M140 52l32-16v56l-32-16" /><path d="M60 90v24M110 90v24M46 114h28M96 114h28" /></>),
  efterarbete: (<><path d="M20 24h160v80H20z" /><path d="M36 84h128" /><path d="M36 84l24-20 20 12 28-30 20 16 24-22" /><path d="M20 112h160" /></>),
  leverans: (<><path d="M32 20h136v76H32z" /><path d="M32 66h136" /><path d="M58 40l16 16 32-34" /><path d="M54 82h92" /><path d="M32 108h136M32 104v8M168 104v8" /></>),
};

const STEG = [
  { nr: '1', namn: 'Ett samtal om affären', ritning: 'samtal', text: 'Vi börjar inte med kameran. Vi börjar med vad ni säljer, till vem, och vad bilden eller filmen ska få den personen att göra.' },
  { nr: '2', namn: 'Plan och pris', ritning: 'plan', text: 'Ni får ett upplägg med vad som ska produceras, när, och vad det kostar. Inga dolda tillägg, inga överraskningar i efterhand.' },
  { nr: '3', namn: 'Inspelning hos er', ritning: 'inspelning', text: 'Vi kommer till er lokal, riggar ljus och ser till att det går smidigt för er som ska vara med. Ofta är det klart på en dag.' },
  { nr: '4', namn: 'Efterarbete', ritning: 'efterarbete', text: 'Klipp, färg och ljud. Det är här bilden får sin ton och filmen sitt tempo. Ni får se ett utkast innan något låses.' },
  { nr: '5', namn: 'Leverans i rätt format', ritning: 'leverans', text: 'Färdigt material i de format ni behöver: hemsida, Instagram, annons, skylt. Redo att användas samma dag.' },
];

const STATS = [
  { tal: 2023, prefix: '', etikett: 'Grundat' },
  { tal: 20, prefix: '+', etikett: 'År bakom kameran' },
  { tal: 0, prefix: '', etikett: 'Kronor för första samtalet' },
  { tal: 1, prefix: '', etikett: 'Kontaktperson hela vägen' },
];

const VARFOR = [
  'Vi förstår affärer på riktigt, inte enbart det estetiska.',
  'Foto och film från samma person: en ton, en kontakt, en faktura.',
  'Ni får se utkastet innan något låses.',
  'Räcker det med tre bra bilder säger vi det. Även när en film hade gett oss mer betalt.',
];

/* Ett riktigt omdöme (sajten, ordagrant). De två andra är exempel och märkta. */
const OMDOMEN = [
  { namn: 'Philip Bergström', ort: 'Eldson AB', text: 'Lättsamt och professionellt bemötande. Mycket nöjd. Vi blir återkommande kunder av denna mediabyrå!! Rekommenderar starkt. 5/5', exempel: false },
  { namn: 'Exempel', ort: 'Restaurang, Gävle', text: 'Exempel: här står ett riktigt omdöme från en kund, med namn och företag som de själva skrivit det.', exempel: true },
  { namn: 'Exempel', ort: 'Tandvård, Gävle', text: 'Exempel: ett tredje kort, hämtat ur er Google-profil när den är på plats.', exempel: true },
];

const FRAGOR = [
  { q: 'Vad kostar en företagsfilm?', a: 'Det beror på längd, antal inspelningsdagar och hur mycket efterarbete som behövs. Första samtalet kostar ingenting, och ni får ett fast pris innan något bokas.' },
  { q: 'Hur går det till?', a: 'Ett samtal om affären, ett upplägg med pris, inspelning hos er, efterarbete med utkast, och leverans i de format ni behöver. Ofta är inspelningen klar på en dag.' },
  { q: 'Gör ni både foto och film?', a: 'Ja, och ofta vid samma tillfälle. Fördelen är att allt får samma ton och att ni bara har en kontakt.' },
  { q: 'Kan ni ta fram content löpande?', a: 'Ja. Många kunder vill ha nytt material varje månad till sociala medier och hemsidan. Då planerar vi det tillsammans, så att det finns en röd tråd.' },
  { q: 'Behöver vi vara med i bild?', a: 'Inte nödvändigtvis. Lokalen, produkten och hantverket berättar mycket. Vill ni vara med hjälper vi er att känna er bekväma framför kameran.' },
  { q: 'Vem äger materialet?', a: 'Ni får använda det i era egna kanaler utan begränsning i tid. Vad som gäller i övrigt står tydligt i upplägget innan ni bokar.' },
  { q: 'Hur lång tid tar leveransen?', a: 'Det beror på omfattningen. Ni får en tidplan med upplägget, och vi håller den.' },
  { q: 'Var arbetar ni?', a: 'Gävle med omnejd. Ligger ni längre bort får ni säga var, så säger vi om vi kan ta det.' },
];

const Stjarnor = ({ tom }) => (<span className={`${styles.stjarnor}${tom ? ` ${styles.stjarnorTomma}` : ''}`} role="img" aria-label={tom ? 'Stjärnor, exempel' : 'Fem stjärnor'}>{[0, 1, 2, 3, 4].map((i) => (<svg viewBox="0 0 24 24" aria-hidden="true" key={i}><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.5L12 17.3l-5.9 3.2 1.3-6.5L2.5 9.4l6.6-.8z" /></svg>))}</span>);

export default function StenborgsDemo() {
  return (
    <div className={`${display.variable} ${displayKursiv.variable} ${ui.variable} ${styles.sida}`}>
      <header className={styles.hdr}>
        <div className={styles.hdrIn}>
          <a className={styles.brand} href="#top"><span className={styles.brandTxt}><b>Stenborgs Media</b><i>Gävle</i></span></a>
          <nav className={styles.nav}>{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}</nav>
          <a className={styles.mobilNavKnapp} href="#meny"><span>Meny</span><span className={styles.mobilNavIkon} aria-hidden="true" /></a>
          <a className={styles.hdrTel} href={TEL_HREF} aria-label={`Ring ${TEL}`}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg><span className={styles.hdrTelNr} aria-hidden="true">{TEL}</span><span className={styles.hdrTelKort} aria-hidden="true">Ring</span></a>
        </div>
      </header>

      <section className={styles.hero} id="top">
        <figure className={styles.heroFilm}>
          <video className={styles.heroLiggande} autoPlay muted loop playsInline preload="metadata" poster="/stenborgs/media/poster-hero.jpg"><source src="/stenborgs/media/video-hero-fore-efter-lokal.mp4" type="video/mp4" /></video>
          <video className={styles.heroStaende} autoPlay muted loop playsInline preload="metadata" poster="/stenborgs/media/poster-hero-mobil.jpg"><source src="/stenborgs/media/video-hero-fore-efter-lokal-mobil.mp4" type="video/mp4" /></video>
        </figure>
        <div className={styles.heroLager}>
          <div className={styles.heroLagerIn}>
            <h1 className={`${styles.heroLogo} ${styles.heroLogoBred}`}><Image src="/stenborgs/media/logo-stenborgs-media-vit.png" alt="Stenborgs Media AB" width={3000} height={301} priority /></h1>
            <p className={styles.heroTjanster}>Företagsfilm · Foto</p>
            <p className={styles.heroOrt}>Gävle</p>
            <div className={styles.heroCta}>
              <a className={styles.btn} href="#kontakt">Boka ett första samtal</a>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={TEL_HREF}>Ring {TEL}</a>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.tejp} role="group" aria-label="Det här gör vi">
        <div className={styles.tejpSpar}>{[false, true].map((kopia) => (<div className={styles.tejpIn} aria-hidden={kopia || undefined} key={kopia ? 'b' : 'a'}><span>Företagsfilm</span><span>Reklamfilm</span><span>Produktfoto</span><span>Porträtt</span><span>Mat och dryck</span><span>Löpande content</span><span>Drönare</span><span>Gävle med omnejd</span></div>))}</div>
      </div>

      <div className={styles.wrap}>
        <div className={styles.stats} role="list" aria-label="Stenborgs Media i siffror">
          {STATS.map((s) => (<div className={styles.stat} role="listitem" key={s.etikett}><b>{s.prefix}<span className={styles.statTal} style={{ '--mal': s.tal }} aria-hidden="true" /><span className={styles.statStatisk}>{s.tal}</span></b><span>{s.etikett}</span></div>))}
        </div>
      </div>

      <section className={styles.sek} id="forvandling">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Förvandlingen</p><h2 className={styles.h2}>Samma lokal. <em>Förberedd.</em></h2><p className={styles.sekLead}>Skillnaden mellan en mobilbild och en produktion är inte kameran. Det är allt som händer innan den slås på.</p></div>
          <div className={styles.forvandling}>
            <figure><Image src="/stenborgs/media/galleri-fore-osminkad-lokal.jpg" alt="Bardisk i platt dagsljus med kartong, blandade glas och en trave servetter" width={1200} height={1200} /><figcaption><b>Före</b></figcaption></figure>
            <figure><Image src="/stenborgs/media/galleri-efter-ljussatt-lokal.jpg" alt="Samma bardisk städad, med polerade glas, levande ljus, softbox och filmkamera i bild" width={1200} height={1200} /><figcaption><b>Efter</b></figcaption></figure>
          </div>
          <div className={styles.galleri}>
            <figure><Image src="/stenborgs/media/galleri-makro-lins.jpg" alt="Närbild på filmkamerans frontlins med reflexer av ljus och lågor" width={1200} height={1200} /><figcaption>Linsen som ser det ni vill visa.</figcaption></figure>
            <figure><Image src="/stenborgs/media/galleri-portrattstudio.jpg" alt="Porträttstudio med pall framför grå fond, softbox och kamera på stativ" width={1200} height={1200} /><figcaption>Porträtt: samma ton för hela teamet.</figcaption></figure>
            <figure><Image src="/stenborgs/media/galleri-produktbord.jpg" alt="Produktbord med kaffekopp, LED-panel med diffusion och makrokamera" width={1200} height={1200} /><figcaption>Produktfoto: ljuset gör jobbet.</figcaption></figure>
            <figure><Image src="/stenborgs/media/galleri-klipprum.jpg" alt="Klipprum på kvällen med tidslinje och färgskopor på skärmen" width={1200} height={1200} /><figcaption>Efterarbetet: färg, klipp och ljud.</figcaption></figure>
          </div>
          <p className={styles.forvandlingNot}>Illustrationsbilder — byts mot era egna produktioner.</p>
        </div>
      </section>

      <section className={styles.sek} id="tjanster">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Vad vi gör</p><h2 className={styles.h2}>Foto och film, <em>med affären i fokus</em></h2><p className={styles.sekLead}>Vi hjälper varumärken att kommunicera tydligare, starkare och mer lönsamt. Varje bild och varje film har en tanke bakom sig om vad den ska åstadkomma.</p></div>
          <div className={styles.tjanster}>{TJANSTER.map((t) => (<article className={styles.tjanst} key={t.id}><svg className={styles.ritning} viewBox="0 0 200 120" aria-hidden="true">{RITNINGAR[t.ritning]}</svg><h3>{t.namn}</h3><p>{t.text}</p><ul>{t.punkter.map((p) => <li key={p}>{p}</li>)}</ul></article>))}</div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="process">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Så går det till</p><h2 className={styles.h2}>Fem steg, och ni bestämmer <em>i det andra</em></h2><p className={styles.sekLead}>Inga idéer blev verklighet i tystnad. Så här går det från ett samtal till färdigt material.</p></div>
          <div className={styles.stegBlock}>
            {STEG.map((s, i) => <input type="radio" name="steg" id={`steg-${s.nr}`} className={styles.stegRadio} defaultChecked={i === 0} key={`r-${s.nr}`} />)}
            <div className={styles.stegVal} role="tablist" aria-label="Så går det till">{STEG.map((s) => <label className={styles.stegKnapp} htmlFor={`steg-${s.nr}`} key={`l-${s.nr}`}><span>{s.namn}</span></label>)}</div>
            <div className={styles.stegKort}>{STEG.map((s) => (<article className={styles.stegPanel} key={`p-${s.nr}`}><svg className={styles.stegRitning} viewBox="0 0 200 120" aria-hidden="true">{STEGRITNINGAR[s.ritning]}</svg><div><h3>{s.namn}</h3><p>{s.text}</p></div></article>))}</div>
          </div>
        </div>
      </section>

      <section className={styles.sek} id="varfor">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Varför oss</p><h2 className={styles.h2}>Producerar förtroende. <em>Ibland foto och film.</em></h2></div>
          <div className={styles.varforModul}>
            <figure className={styles.varforFilm}><video autoPlay muted loop playsInline preload="metadata" poster="/stenborgs/media/poster-varfor.jpg" aria-label="Långsam åkning förbi filmkameran mot den ljussatta bardisken"><source src="/stenborgs/media/video-varfor-kamerariggen.mp4" type="video/mp4" /></video></figure>
            <ul className={styles.varforPunkter}>{VARFOR.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="omdomen">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Omdömen</p><h2 className={styles.h2}>Vad kunderna säger</h2><p className={styles.googleRad}><svg className={styles.googleG} viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.4a4.6 4.6 0 01-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.4z" /><path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0012 22z" /><path fill="#FBBC04" d="M6.4 14a6 6 0 010-3.8V7.6H3.1a10 10 0 000 9l3.3-2.6z" /><path fill="#EA4335" d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 003.1 7.6L6.4 10c.8-2.3 3-4 5.6-4z" /></svg><span>Här står ert Google-betyg när profilen är på plats</span></p></div>
          <div className={styles.recensioner}>
            {OMDOMEN.map((o, i) => (<figure className={styles.recension} key={`${o.namn}-${i}`}><div className={styles.recensionHuvud}><span className={styles.avatar} aria-hidden="true">{o.namn[0]}</span><figcaption><b>{o.namn}</b><span>{o.ort}</span></figcaption></div><Stjarnor tom={o.exempel} /><blockquote>{o.text}</blockquote></figure>))}
          </div>
          <div className={styles.recensionerFot}><p className={styles.recensionerNot}>Första omdömet är från stenborgen.se, som det står där. De två andra är exempel — byts mot era riktiga.</p><a className={`${styles.btn} ${styles.btnMork}`} href="https://www.google.com/maps/search/Stenborgs+Media+AB+G%C3%A4vle" target="_blank" rel="noopener">Se alla recensioner</a></div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sociala}`} id="sociala">
        <div className={styles.wrap}>
          <div className={styles.socialaIkoner}>
            <a href={IG} target="_blank" rel="noopener" aria-label="Stenborgs Media på Instagram"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" /><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" /></svg></a>
          </div>
          <p className={styles.socialaTxt}>Följ vårt arbete i vardagen</p>
          <div className={styles.socialaRutnat}>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/stenborgs/media/sociala-stativ-pa-gatan.jpg" alt="Filmkamera på stativ på en gata i skymning" width={1200} height={1200} /></a></figure>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/stenborgs/media/sociala-kameravaska.jpg" alt="Öppen kameraväska med hus, objektiv och drönare" width={1200} height={1200} /></a></figure>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/stenborgs/media/sociala-ljus-i-lagerhall.jpg" alt="Ljusrigg och kamera på slider i en lagerhall" width={1200} height={1200} /></a></figure>
          </div>
          <p className={styles.forvandlingNot}>Illustrationsbilder — byts mot era egna.</p>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="fragor">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Vanliga frågor</p><h2 className={styles.h2}>Det ni brukar fråga först</h2><p className={styles.sekLead}>Pris och upplägg först, det praktiska sedan. Gäller det just er produktion är telefonen snabbare än en sida.</p></div>
          <div className={styles.fragorGrid}>
            <div className={styles.fragor}>{FRAGOR.map((f) => <details className={styles.fraga} name="faq" key={f.q}><summary>{f.q}<span className={styles.fragaIkon} aria-hidden="true" /></summary><p>{f.a}</p></details>)}</div>
            <aside className={styles.fragaKort}><h3>Hittar ni inte svaret?</h3><p>Ring och fråga rakt ut. Vi säger vad som gäller just er produktion.</p><a className={`${styles.btn} ${styles.btnMork}`} href={TEL_HREF}>Ring {TEL}</a></aside>
          </div>
        </div>
      </section>

      <section className={styles.kontakt} id="kontakt">
        <div className={styles.wrap}>
          <div className={styles.kontaktGrid}>
            <div>
              <p className={styles.eyebrow}>Kontakt</p>
              <h2 className={styles.h2}>Vad ska bilden<br /><em>få folk att göra?</em></h2>
              <p className={styles.sekLead}>Ring, eller skriv några rader om vad ni vill åstadkomma. Första samtalet kostar ingenting, och ni får ett fast pris innan något bokas.</p>
              <div className={styles.kontaktRader}>
                <a className={styles.kontaktRad} href={TEL_HREF}><span>Telefon</span><b>{TEL}</b></a>
                <div className={styles.kontaktRad}><span>Adress</span><b>{ADRESS}</b></div>
                <a className={styles.kontaktRad} href={IG} target="_blank" rel="noopener"><span>Instagram</span><b>@stenborgs.media</b></a>
              </div>
            </div>
            <form className={styles.form} action={FORM_ACTION} method="post" encType="text/plain" aria-describedby="form-not">
              <label>Företagsnamn<input type="text" name="foretag" autoComplete="organization" required /></label>
              <label>Telefon<input type="tel" name="telefon" autoComplete="tel" required /></label>
              <label>E-post<input type="email" name="epost" autoComplete="email" required /></label>
              <label>Vad handlar det om?<select name="typ" defaultValue="Företagsfilm"><option>Företagsfilm</option><option>Foto</option><option>Porträtt</option><option>Löpande content</option><option>Något annat</option></select></label>
              <label>Vad kan vi hjälpa dig med?<textarea name="meddelande" rows={4} placeholder="Vad ni säljer, vem bilden är till för, och när ni vill ha det klart" /></label>
              <button className={styles.btn} type="submit">Boka ett första samtal</button>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={TEL_HREF}>Eller ring {TEL}</a>
              <p className={styles.formNot} id="form-not">Skriv kort om affären — då kan vi ge ett vettigt svar redan i första samtalet. Inga massutskick, ingen säljlista.</p>
              <p className={styles.formNot}>Obs: i det här förslaget öppnar knappen ditt e-postprogram och skickar raderna till Bahko Byrå. I den skarpa sajten kopplas formuläret in och landar direkt i er egen inkorg.</p>
            </form>
          </div>
        </div>
      </section>

      <footer className={styles.ftr}>
        <div className={styles.wrap}>
          <div className={styles.ftrGrid}>
            <div><span className={styles.brandTxt}><b>Stenborgs Media AB</b><i>Foto och videoproduktion</i></span><p className={styles.ftrText}>Produktionsbolag i Gävle. Företagsfilm, foto, porträtt och löpande content för företag som vill kommunicera tydligare.</p></div>
            <div className={styles.ftrLankar}>{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}<a href={TEL_HREF}>{TEL}</a><a href={IG} target="_blank" rel="noopener">@stenborgs.media</a><a href="#top">Till toppen</a></div>
          </div>
          <div className={styles.ftrBar}><span>Stenborgs Media AB · Org.nr 559452-2848 · {ADRESS}</span><span>Förslag byggt av <a href="https://www.bahkobyra.se" target="_blank" rel="noopener">Bahko Byrå</a></span></div>
        </div>
      </footer>

      <div className={styles.mobilMenyLager} id="meny"><a className={styles.mobilMenySkugga} href="#stangd" tabIndex={-1} aria-hidden="true" /><nav className={styles.mobilMenyPanel} aria-label="Meny">{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}<a href="#kontakt">Kontakt</a><a className={styles.mobilMenyStang} href="#stangd">Stäng menyn</a></nav></div>
      <span className={styles.stangdAnkare} id="stangd" />
      <input type="checkbox" id="popup-bort" className={styles.popupBort} aria-hidden="true" tabIndex={-1} />
      <aside className={styles.popup} aria-label="Kontakta Stenborgs Media"><label className={styles.popupX} htmlFor="popup-bort" role="button" aria-label="Stäng" tabIndex={0}>✕</label><p className={styles.popupEyebrow}>Film till hösten?</p><p className={styles.popupTxt}>Första samtalet kostar ingenting. Ni får höra vad som är värt att filma, och vad det kostar, innan ni bestämmer något.</p><a className={`${styles.btn} ${styles.popupCta}`} href={TEL_HREF}>Ring {TEL}</a><a className={styles.popupAlt} href="#kontakt">Eller skriv några rader →</a></aside>
      <a className={styles.demoKnapp} href="#bahko-demo">Om det här förslaget</a>
      <div className={styles.modalLager} id="bahko-demo"><a className={styles.modalSkugga} href="#stangd" tabIndex={-1} aria-hidden="true" /><section className={styles.modal} aria-labelledby="bahko-rubrik"><a className={styles.modalX} href="#stangd" aria-label="Stäng">✕</a><span className={styles.modalBadge}>Förslag av Bahko Byrå</span><h3 id="bahko-rubrik">Så här kan Stenborgs Media se ut på nätet</h3><p>Det här är ett kostnadsfritt förslag, byggt på det ni själva visar på stenborgen.se och Instagram. Ingen beställning, inget åtagande. Vill ni se den skarpt med era egna produktioner och ett formulär som landar i inkorgen? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.</p><a className={styles.modalCta} href="https://cal.eu/bahkobyra/15min" target="_blank" rel="noopener">Boka 15 min gratis samtal →</a><a className={styles.modalAlt} href="mailto:mathias@bahkobyra.se?subject=Stenborgs%20Media%20-%20f%C3%B6rslag%20p%C3%A5%20hemsida">Eller mejla → mathias@bahkobyra.se</a><span className={styles.modalFot}>Bahko Byrå · Synlighet som säljer.</span></section></div>
    </div>
  );
}
