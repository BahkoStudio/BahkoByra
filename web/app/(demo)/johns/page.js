import Image from 'next/image';
import { Archivo, Inter } from 'next/font/google';
import styles from './johns.module.css';

/* ===========================================================================
   JOHNS REKLAM AB — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: instagram.com/johnsreklam · Norrköping · HAR hemsida (johnsreklam.se,
   One.com-editor, sju sidor) — förslaget är en förbättring.
   Byggd på golvvision-kanon (via rskompakt) med hero som före/efter-effekt.

   Bärande idé: en omärkt bil är en betald reklamplats som står tom. Heron
   visar exakt det: en vit skåpbil som folieras panel för panel tills den
   syns. Deras egna ord bär resten: "från idé och design till färdig produkt",
   "vi kan foliera allt".

   VERIFIERAT (johnsreklam.se + undersidor + IG + allabolag/hitta, 2026-09-09):
   Firmanamn "Johns Reklam AB" · org.nr 559208-0062, registrerat 2019-06-03,
   aktiebolag, 2 anställda · VD John Ammar Yosif Al-Maqdisy · Finspångsvägen
   63, 602 13 Norrköping · telefon 076-266 06 60 · info@johnsreklam.se ·
   öppet mån–fre 09:00–18:30, lör 11:00–17:00 · tjänster i deras ord:
   skyltar (utomhus, LED/neon, pyloner, byggskyltar, vägskyltar, inomhus,
   skyltservice), fordonsdekor (bildekor, foliering, solfilm, lastbil/buss,
   MC, båt, magnetskylt), event- och mässmaterial, banderoller/vepor/
   rollups, profilkläder (tryck/brodyr), trycksaker, montering ·
   egna fraser: "Vi hjälper dig genom hela processen – från idé och design
   till färdig produkt", "Vi kan foliera allt!", "Vi bjuder gärna på en
   fika", "Vår tillväxt har till stor del drivits av rekommendationer från
   nöjda kunder", "över 30 års erfarenhet inom … skyltar" (skyltsidan),
   "Alla priser är SEK exkl. moms" · Facebook facebook.com/johnsreklam
   (sajten) · IG 204 inlägg, 4 615 följare · 33 egna foton på sajten — sju
   används här · logotypen är deras egen (marinblått ordmärke, vänt till
   vitt för filmen, CMYK-prickarna kvar).

   INTE verifierat, och finns därför inte på sidan: omdömena på deras sajt
   (Lars Svensson m.fl.) är One.com-mallens exempeltexter — INTE riktiga,
   därför exempelläge här · Google-betyg · priser · ledtider · antal projekt.
   "Över 30 år" står som deras egen uppgift.

   FLAGGOR: formuläret går till mathias@bahkobyra.se; omdömen i exempelläge
   (märkt); före/efter-paret är illustration (märkt); galleri och sociala är
   deras egna foton.
   =========================================================================== */

const display = Archivo({ subsets: ['latin'], weight: ['400', '600'], display: 'swap', variable: '--jr-display' });
const displayKursiv = Archivo({ subsets: ['latin'], weight: ['400', '600'], style: ['italic'], display: 'swap', preload: false, variable: '--jr-display-kursiv' });
const ui = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap', variable: '--jr-ui' });

export const metadata = {
  title: 'Johns Reklam AB — skyltar, bildekor och tryck i Norrköping',
  description:
    'Reklam och tryckeri i Norrköping. Skyltar, fordonsdekor, foliering, banderoller, profilkläder och trycksaker, från idé till montering. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

const TEL = '076-266 06 60';
const TEL_HREF = 'tel:+46762660660';
const EPOST = 'info@johnsreklam.se';
const ADRESS = 'Finspångsvägen 63, 602 13 Norrköping';
const IG = 'https://www.instagram.com/johnsreklam/';
const FB = 'https://www.facebook.com/johnsreklam';
const FORM_ACTION = 'mailto:mathias@bahkobyra.se?subject=Johns%20Reklam%20-%20offertf%C3%B6rfr%C3%A5gan';

const LANKAR = [
  { href: '#tjanster', txt: 'Vad vi gör' },
  { href: '#process', txt: 'Så går det till' },
  { href: '#varfor', txt: 'Varför oss' },
  { href: '#fragor', txt: 'Vanliga frågor' },
];

const RITNINGAR = {
  skylt: (<><path d="M30 24h140v56H30z" /><path d="M46 40h60M46 54h108" /><path d="M92 80v28M108 80v28M80 108h44" /></>),
  bil: (<><path d="M22 84h156" /><path d="M34 84V54l22-22h84l22 22v30" /><path d="M56 32v22h56V32M34 54h124" /><circle cx="58" cy="90" r="10" /><circle cx="142" cy="90" r="10" /><path d="M60 70l60-14" /></>),
  vepa: (<><path d="M28 20h144" /><path d="M40 20v84M160 20v84" /><path d="M40 36h120v60H40z" /><path d="M56 52h40M56 66h72M56 80h56" /><path d="M28 104h144" /></>),
  klader: (<><path d="M64 26l36 12 36-12 22 22-18 16-6-6v54H66V58l-6 6-18-16z" /><path d="M84 68h32v20H84z" /></>),
};

const TJANSTER = [
  { id: 'skylt', ritning: 'skylt', namn: 'Skyltar', text: 'Från namnskylten på dörren till ljuslådan på fasaden. Design, tillverkning och montage, med skyltservice när något behöver underhållas.', punkter: ['Fasadskyltar och ljuslådor', 'LED, neon och pyloner', 'Byggskyltar och vägskyltar'] },
  { id: 'bil', ritning: 'bil', namn: 'Fordonsdekor', text: 'Bilen blir en rullande reklampelare. Bildekor, helfoliering, solfilm och magnetskyltar, på skåpbil, lastbil, buss, MC och båt. Vi kan foliera allt.', punkter: ['Bildekor och helfoliering', 'Lastbil och buss', 'Solfilm och magnetskylt'] },
  { id: 'vepa', ritning: 'vepa', namn: 'Banderoller och mässmaterial', text: 'Vepor, banderoller, rollups och beachflaggor som syns på mässan, vid bygget och över entrén. Storformat i material som håller ute.', punkter: ['Banderoller och vepor', 'Rollups och flaggor', 'Fönsterdekor'] },
  { id: 'klader', ritning: 'klader', namn: 'Profilkläder och tryck', text: 'Arbetskläder med tryck eller brodyr, och trycksakerna som hör till: visitkort, flyers, affischer och menyer. Samma profil på allt.', punkter: ['Tryck och brodyr', 'Visitkort och flyers', 'Dekaler och klistermärken'] },
];

const STEGRITNINGAR = {
  kontakt: (<><path d="M40 30h120v60H40z" /><path d="M40 30l60 40 60-40" /><path d="M40 104h120M40 100v8M160 100v8" /></>),
  skiss: (<><path d="M28 18h144v84H28z" /><path d="M44 38h64M44 52h96M44 66h48" /><path d="M120 60h36v30h-36z" /><path d="M28 110h144M28 106v8M172 106v8" /></>),
  produktion: (<><path d="M20 30h160v64H20z" /><path d="M20 62h160" /><path d="M52 30v64M100 30v64M148 30v64" /><path d="M20 104h160" /></>),
  montering: (<><path d="M30 24h140v56H30z" /><path d="M46 40h60M46 54h108" /><path d="M92 80v28M108 80v28M80 108h44" /><path d="M140 96l12 12 20-24" /></>),
  klart: (<><path d="M32 20h136v76H32z" /><path d="M32 66h136" /><path d="M58 40l16 16 32-34" /><path d="M54 82h92" /><path d="M32 108h136M32 104v8M168 104v8" /></>),
};

const STEG = [
  { nr: '1', namn: 'Ring eller kom förbi', ritning: 'kontakt', text: 'Berätta vad som ska synas och var. Har du vägarna förbi Finspångsvägen bjuder vi på fika medan vi hittar lösningen.' },
  { nr: '2', namn: 'Idé och skiss', ritning: 'skiss', text: 'Vi bollar idéer och tar fram en skiss på hur det kommer att se ut, med material, mått och pris. Inget produceras innan du sagt ja.' },
  { nr: '3', namn: 'Produktion', ritning: 'produktion', text: 'Digitalt storformatstryck i eget hus, på folie, banderoll, akryl, aluminium eller PVC. Skärning och laminering ingår.' },
  { nr: '4', namn: 'Montering', ritning: 'montering', text: 'Vi monterar skylten, folierar bilen och sätter dekoren på plats. Du får det färdigt, inte i delar.' },
  { nr: '5', namn: 'Klart och synligt', ritning: 'klart', text: 'Skylten sitter, bilen rullar. Behöver något underhållas senare finns skyltservice.' },
];

const STATS = [
  { tal: 2019, prefix: '', etikett: 'Grundat' },
  { tal: 30, prefix: '+', etikett: 'År med skyltar' },
  { tal: 0, prefix: '', etikett: 'Kronor för idé och skiss' },
  { tal: 1, prefix: '', etikett: 'Kontakt hela vägen' },
];

const VARFOR = [
  'Från idé och design till färdig produkt, monterad.',
  'Eget tryckeri i Norrköping: storformat, skärning, laminering.',
  'Vi kan foliera allt. Skåpbil, lastbil, buss, MC och båt.',
  'Räcker det med en magnetskylt säger vi det. Även när en helfoliering hade gett oss mer betalt.',
];

/* Exempelläge: omdömena på deras egen sajt är mallens platshållartexter. */
const OMDOMEN = [
  { namn: 'Exempel', ort: 'Butik, Norrköping', text: 'Exempel: här står ett riktigt omdöme från en kund, med namn och företag som de själva skrivit det.' },
  { namn: 'Exempel', ort: 'Åkeri, Östergötland', text: 'Exempel: ett andra kort, hämtat ur er Google-profil eller Facebook-sida.' },
  { namn: 'Exempel', ort: 'Restaurang, Norrköping', text: 'Exempel: ett tredje kort. Tre korta omdömen räcker för att sidan ska kännas trovärdig.' },
];

const FRAGOR = [
  { q: 'Vad kostar en skylt eller en foliering?', a: 'Det beror på storlek, material och montering. Idé, skiss och pris kostar ingenting, och inget produceras innan du sagt ja. Alla priser är exklusive moms.' },
  { q: 'Hur går det till?', a: 'Ring, mejla eller kom förbi. Vi tar fram en skiss med pris, producerar i eget hus, monterar på plats och lämnar det klart.' },
  { q: 'Kan ni foliera min bil?', a: 'Ja. Bildekor, helfoliering, solfilm och magnetskyltar, på allt från moped till lastbil och båt. Vi kan foliera allt.' },
  { q: 'Gör ni skyltar med belysning?', a: 'Ja. Ljuslådor, LED- och neonskyltar, profilbokstäver och pyloner, både nytt och underhåll av befintliga.' },
  { q: 'Hur lång tid tar det?', a: 'Det beror på jobbet. Enklare tryck går snabbt, skyltar och folieringar planeras in. Du får en tid när du godkänner skissen.' },
  { q: 'Monterar ni också?', a: 'Ja. Vi monterar skyltar, sätter dekor och folierar fordon själva, så att du får det färdigt och inte i delar.' },
  { q: 'Kan jag få profilkläder i små upplagor?', a: 'Ja. Tryck eller brodyr på arbetskläder även i små antal, och vi kan komplettera senare i samma profil.' },
  { q: 'Var finns ni?', a: 'Finspångsvägen 63 i Norrköping. Öppet måndag till fredag 09–18:30 och lördag 11–17. Vi arbetar i Norrköping och Östergötland.' },
];

const Stjarnor = ({ tom }) => (<span className={`${styles.stjarnor}${tom ? ` ${styles.stjarnorTomma}` : ''}`} role="img" aria-label={tom ? 'Stjärnor, exempel' : 'Fem stjärnor'}>{[0, 1, 2, 3, 4].map((i) => (<svg viewBox="0 0 24 24" aria-hidden="true" key={i}><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.5L12 17.3l-5.9 3.2 1.3-6.5L2.5 9.4l6.6-.8z" /></svg>))}</span>);

export default function JohnsDemo() {
  return (
    <div className={`${display.variable} ${displayKursiv.variable} ${ui.variable} ${styles.sida}`}>
      <header className={styles.hdr}>
        <div className={styles.hdrIn}>
          <a className={styles.brand} href="#top"><span className={styles.brandTxt}><b>Johns Reklam</b><i>Norrköping</i></span></a>
          <nav className={styles.nav}>{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}</nav>
          <a className={styles.mobilNavKnapp} href="#meny"><span>Meny</span><span className={styles.mobilNavIkon} aria-hidden="true" /></a>
          <a className={styles.hdrTel} href={TEL_HREF} aria-label={`Ring ${TEL}`}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg><span className={styles.hdrTelNr} aria-hidden="true">{TEL}</span><span className={styles.hdrTelKort} aria-hidden="true">Ring</span></a>
        </div>
      </header>

      <section className={styles.hero} id="top">
        <figure className={styles.heroFilm}>
          <video className={styles.heroLiggande} autoPlay muted loop playsInline preload="metadata" poster="/johns/media/poster-hero.jpg"><source src="/johns/media/video-hero-fore-efter-foliering.mp4" type="video/mp4" /></video>
          <video className={styles.heroStaende} autoPlay muted loop playsInline preload="metadata" poster="/johns/media/poster-hero-mobil.jpg"><source src="/johns/media/video-hero-fore-efter-foliering-mobil.mp4" type="video/mp4" /></video>
        </figure>
        <div className={styles.heroLager}>
          <div className={styles.heroLagerIn}>
            <h1 className={`${styles.heroLogo} ${styles.heroLogoBred}`}><Image src="/johns/media/logo-johns-reklam-vit.png" alt="Johns Reklam AB" width={2400} height={405} priority /></h1>
            <p className={styles.heroTjanster}>Skyltar · Fordonsdekor</p>
            <p className={styles.heroOrt}>Norrköping</p>
            <div className={styles.heroCta}>
              <a className={styles.btn} href="#kontakt">Få skiss och pris</a>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={TEL_HREF}>Ring {TEL}</a>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.tejp} role="group" aria-label="Det här gör vi">
        <div className={styles.tejpSpar}>{[false, true].map((kopia) => (<div className={styles.tejpIn} aria-hidden={kopia || undefined} key={kopia ? 'b' : 'a'}><span>Skyltar och ljuslådor</span><span>Bildekor och foliering</span><span>Banderoller och vepor</span><span>Rollups och flaggor</span><span>Profilkläder</span><span>Trycksaker</span><span>Montering</span><span>Norrköping och Östergötland</span></div>))}</div>
      </div>

      <div className={styles.wrap}>
        <div className={styles.stats} role="list" aria-label="Johns Reklam i siffror">
          {STATS.map((s) => (<div className={styles.stat} role="listitem" key={s.etikett}><b>{s.prefix}<span className={styles.statTal} style={{ '--mal': s.tal }} aria-hidden="true" /><span className={styles.statStatisk}>{s.tal}</span></b><span>{s.etikett}</span></div>))}
        </div>
      </div>

      <section className={styles.sek} id="forvandling">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Förvandlingen</p><h2 className={styles.h2}>En omärkt bil är en <em>tom reklamplats.</em></h2><p className={styles.sekLead}>Den står på varje parkering och kör förbi varje kund. Folierad jobbar den dygnet runt, utan månadskostnad.</p></div>
          <div className={styles.forvandling}>
            <figure><Image src="/johns/media/galleri-fore-vit-skapbil.jpg" alt="Omärkt vit skåpbil framför en verkstadsport" width={1200} height={1200} /><figcaption><b>Före</b></figcaption></figure>
            <figure><Image src="/johns/media/galleri-efter-folierad-skapbil.jpg" alt="Samma skåpbil helfolierad i blått med vitt diagonalt band" width={1200} height={1200} /><figcaption><b>Efter</b></figcaption></figure>
          </div>
          <p className={styles.forvandlingNot}>Före/efter-paret är en illustration. Bilderna nedan är våra egna jobb.</p>
          <div className={styles.galleri}>
            <figure><Image src="/johns/media/galleri-makro-folie.jpg" alt="Närbild på foliekanten där det vita bandet möter den blå folien vid dörrskarven" width={1200} height={1200} /><figcaption>Kanten som avgör om det håller.</figcaption></figure>
            <figure><Image src="/johns/media/galleri-fasadskylt-salles.jpg" alt="Belyst fasadskylt med profilbokstäver på en industribyggnad" width={1200} height={1200} /><figcaption>Fasadskylt med belysning.</figcaption></figure>
            <figure><Image src="/johns/media/galleri-ljuslada-grill-king.jpg" alt="Röd ljusskylt över en restaurangentré på kvällen" width={1200} height={1200} /><figcaption>Ljusskylt som syns på kvällen.</figcaption></figure>
            <figure><Image src="/johns/media/galleri-bildekor-lem-maleri.jpg" alt="Skåpbil med bildekor för en målerifirma" width={1200} height={1200} /><figcaption>Bildekor som bär hela profilen.</figcaption></figure>
          </div>
        </div>
      </section>

      <section className={styles.sek} id="tjanster">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Vad vi gör</p><h2 className={styles.h2}>Från idé till <em>monterad produkt</em></h2><p className={styles.sekLead}>Skyltar, bildekor, banderoller, profilkläder och trycksaker. Tryckt i eget hus i Norrköping, monterat av oss.</p></div>
          <div className={styles.tjanster}>{TJANSTER.map((t) => (<article className={styles.tjanst} key={t.id}><svg className={styles.ritning} viewBox="0 0 200 120" aria-hidden="true">{RITNINGAR[t.ritning]}</svg><h3>{t.namn}</h3><p>{t.text}</p><ul>{t.punkter.map((p) => <li key={p}>{p}</li>)}</ul></article>))}</div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="process">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Så går det till</p><h2 className={styles.h2}>Fem steg, och du bestämmer <em>i det andra</em></h2><p className={styles.sekLead}>Vi är med genom hela processen, från att bolla idéer till montering. Så här enkelt är det.</p></div>
          <div className={styles.stegBlock}>
            {STEG.map((s, i) => <input type="radio" name="steg" id={`steg-${s.nr}`} className={styles.stegRadio} defaultChecked={i === 0} key={`r-${s.nr}`} />)}
            <div className={styles.stegVal} role="tablist" aria-label="Så går det till">{STEG.map((s) => <label className={styles.stegKnapp} htmlFor={`steg-${s.nr}`} key={`l-${s.nr}`}><span>{s.namn}</span></label>)}</div>
            <div className={styles.stegKort}>{STEG.map((s) => (<article className={styles.stegPanel} key={`p-${s.nr}`}><svg className={styles.stegRitning} viewBox="0 0 200 120" aria-hidden="true">{STEGRITNINGAR[s.ritning]}</svg><div><h3>{s.namn}</h3><p>{s.text}</p></div></article>))}</div>
          </div>
        </div>
      </section>

      <section className={styles.sek} id="varfor">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Varför oss</p><h2 className={styles.h2}>Vi kan <em>foliera allt.</em></h2></div>
          <div className={styles.varforModul}>
            <figure className={styles.varforFilm}><video autoPlay muted loop playsInline preload="metadata" poster="/johns/media/poster-varfor.jpg" aria-label="Långsam åkning längs den folierade skåpbilens sida"><source src="/johns/media/video-varfor-folien.mp4" type="video/mp4" /></video></figure>
            <ul className={styles.varforPunkter}>{VARFOR.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="omdomen">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Omdömen</p><h2 className={styles.h2}>Vad kunderna säger</h2><p className={styles.googleRad}><svg className={styles.googleG} viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.4a4.6 4.6 0 01-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.4z" /><path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0012 22z" /><path fill="#FBBC04" d="M6.4 14a6 6 0 010-3.8V7.6H3.1a10 10 0 000 9l3.3-2.6z" /><path fill="#EA4335" d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 003.1 7.6L6.4 10c.8-2.3 3-4 5.6-4z" /></svg><span>Här står ert Google-betyg när profilen är på plats</span></p></div>
          <div className={styles.recensioner}>
            {OMDOMEN.map((o, i) => (<figure className={styles.recension} key={i}><div className={styles.recensionHuvud}><span className={styles.avatar} aria-hidden="true">{o.namn[0]}</span><figcaption><b>{o.namn}</b><span>{o.ort}</span></figcaption></div><Stjarnor tom /><blockquote>{o.text}</blockquote></figure>))}
          </div>
          <div className={styles.recensionerFot}><p className={styles.recensionerNot}>Exempel — byts mot era riktiga omdömen från Google eller Facebook.</p><a className={`${styles.btn} ${styles.btnMork}`} href="https://www.google.com/maps/search/Johns+Reklam+AB+Norrk%C3%B6ping" target="_blank" rel="noopener">Se alla recensioner</a></div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sociala}`} id="sociala">
        <div className={styles.wrap}>
          <div className={styles.socialaIkoner}>
            <a href={IG} target="_blank" rel="noopener" aria-label="Johns Reklam på Instagram"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" /><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" /></svg></a>
            <a href={FB} target="_blank" rel="noopener" aria-label="Johns Reklam på Facebook"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 8h2.5V4.5H14c-2.2 0-3.5 1.5-3.5 3.6V10H8v3.3h2.5V21h3.4v-7.7h2.6l.5-3.3h-3.1V8.5c0-.3.2-.5.6-.5z" fill="currentColor" /></svg></a>
          </div>
          <p className={styles.socialaTxt}>Följ vårt arbete i vardagen</p>
          <div className={styles.socialaRutnat}>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/johns/media/sociala-egen-bil.jpg" alt="Johns Reklams egen folierade skåpbil" width={1200} height={1200} /></a></figure>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/johns/media/sociala-gatupratare.jpg" alt="Gatupratare med tryckt meny utanför ett café" width={1200} height={1200} /></a></figure>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/johns/media/sociala-profilpennor.jpg" alt="Blå profilpennor med tryck" width={1200} height={1200} /></a></figure>
          </div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="fragor">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Vanliga frågor</p><h2 className={styles.h2}>Det ni brukar fråga först</h2><p className={styles.sekLead}>Pris och tid först, det praktiska sedan. Gäller det just er skylt eller bil är telefonen snabbare än en sida.</p></div>
          <div className={styles.fragorGrid}>
            <div className={styles.fragor}>{FRAGOR.map((f) => <details className={styles.fraga} name="faq" key={f.q}><summary>{f.q}<span className={styles.fragaIkon} aria-hidden="true" /></summary><p>{f.a}</p></details>)}</div>
            <aside className={styles.fragaKort}><h3>Hittar du inte svaret?</h3><p>Ring och fråga rakt ut. Vi säger vad som gäller just ditt jobb.</p><a className={`${styles.btn} ${styles.btnMork}`} href={TEL_HREF}>Ring {TEL}</a></aside>
          </div>
        </div>
      </section>

      <section className={styles.kontakt} id="kontakt">
        <div className={styles.wrap}>
          <div className={styles.kontaktGrid}>
            <div>
              <p className={styles.eyebrow}>Kontakt</p>
              <h2 className={styles.h2}>Vad ska synas,<br /><em>och var?</em></h2>
              <p className={styles.sekLead}>Ring, skriv några rader, eller kom förbi Finspångsvägen. Idé, skiss och pris kostar ingenting.</p>
              <div className={styles.kontaktRader}>
                <a className={styles.kontaktRad} href={TEL_HREF}><span>Telefon</span><b>{TEL}</b></a>
                <a className={styles.kontaktRad} href={`mailto:${EPOST}`}><span>E-post</span><b>{EPOST}</b></a>
                <div className={styles.kontaktRad}><span>Adress</span><b>{ADRESS}</b></div>
                <div className={styles.kontaktRad}><span>Öppettider</span><b>Mån–fre 09–18:30, lör 11–17</b></div>
              </div>
            </div>
            <form className={styles.form} action={FORM_ACTION} method="post" encType="text/plain" aria-describedby="form-not">
              <label>Namn<input type="text" name="namn" autoComplete="name" required /></label>
              <label>Telefon<input type="tel" name="telefon" autoComplete="tel" required /></label>
              <label>E-post (valfritt)<input type="email" name="epost" autoComplete="email" /></label>
              <label>Vad handlar det om?<select name="typ" defaultValue="Skyltar"><option>Skyltar</option><option>Fordonsdekor</option><option>Banderoller och mässmaterial</option><option>Profilkläder och tryck</option><option>Något annat</option></select></label>
              <label>Kort om jobbet<textarea name="meddelande" rows={4} placeholder="Vad som ska synas, var det ska sitta, ungefärlig storlek, och när ni vill ha det klart" /></label>
              <button className={styles.btn} type="submit">Få skiss och pris</button>
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
            <div><span className={styles.brandTxt}><b>Johns Reklam AB</b><i>Norrköping</i></span><p className={styles.ftrText}>Skyltar, fordonsdekor, banderoller, profilkläder och trycksaker. Från idé och design till färdig, monterad produkt. Alla priser exklusive moms.</p></div>
            <div className={styles.ftrLankar}>{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}<a href={TEL_HREF}>{TEL}</a><a href={`mailto:${EPOST}`}>{EPOST}</a><a href={IG} target="_blank" rel="noopener">@johnsreklam</a><a href="#top">Till toppen</a></div>
          </div>
          <div className={styles.ftrBar}><span>Johns Reklam AB · Org.nr 559208-0062 · {ADRESS}</span><span>Förslag byggt av <a href="https://www.bahkobyra.se" target="_blank" rel="noopener">Bahko Byrå</a></span></div>
        </div>
      </footer>

      <div className={styles.mobilMenyLager} id="meny"><a className={styles.mobilMenySkugga} href="#stangd" tabIndex={-1} aria-hidden="true" /><nav className={styles.mobilMenyPanel} aria-label="Meny">{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}<a href="#kontakt">Kontakt</a><a className={styles.mobilMenyStang} href="#stangd">Stäng menyn</a></nav></div>
      <span className={styles.stangdAnkare} id="stangd" />
      <input type="checkbox" id="popup-bort" className={styles.popupBort} aria-hidden="true" tabIndex={-1} />
      <aside className={styles.popup} aria-label="Kontakta Johns Reklam"><label className={styles.popupX} htmlFor="popup-bort" role="button" aria-label="Stäng" tabIndex={0}>✕</label><p className={styles.popupEyebrow}>Ny bil eller ny lokal?</p><p className={styles.popupTxt}>Skissen kostar ingenting. Du får se hur det blir, och vad det kostar, innan något produceras.</p><a className={`${styles.btn} ${styles.popupCta}`} href={TEL_HREF}>Ring {TEL}</a><a className={styles.popupAlt} href="#kontakt">Eller skriv några rader →</a></aside>
      <a className={styles.demoKnapp} href="#bahko-demo">Om det här förslaget</a>
      <div className={styles.modalLager} id="bahko-demo"><a className={styles.modalSkugga} href="#stangd" tabIndex={-1} aria-hidden="true" /><section className={styles.modal} aria-labelledby="bahko-rubrik"><a className={styles.modalX} href="#stangd" aria-label="Stäng">✕</a><span className={styles.modalBadge}>Förslag av Bahko Byrå</span><h3 id="bahko-rubrik">Så här kan Johns Reklam se ut på nätet</h3><p>Det här är ett kostnadsfritt förslag, byggt på det ni själva visar på johnsreklam.se och Instagram, med era egna bilder. Ingen beställning, inget åtagande. Vill ni se den skarpt med riktiga omdömen och ett formulär som landar i inkorgen? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.</p><a className={styles.modalCta} href="https://cal.eu/bahkobyra/15min" target="_blank" rel="noopener">Boka 15 min gratis samtal →</a><a className={styles.modalAlt} href="mailto:mathias@bahkobyra.se?subject=Johns%20Reklam%20-%20f%C3%B6rslag%20p%C3%A5%20hemsida">Eller mejla → mathias@bahkobyra.se</a><span className={styles.modalFot}>Bahko Byrå · Synlighet som säljer.</span></section></div>
    </div>
  );
}
