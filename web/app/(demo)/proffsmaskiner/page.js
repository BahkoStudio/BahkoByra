import Image from 'next/image';
import { Archivo, Inter } from 'next/font/google';
import styles from './proffsmaskiner.module.css';

/* ===========================================================================
   PROFFSMASKINER SVERIGE AB — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: instagram.com/proffsmaskinerab · Sollentuna · VARM: bad om förslag i
   DM 2026-09-09 · HAR hemsida (proffsmaskiner.se, WordPress/Elementor av
   Weblab, stockfoton) — förslaget ska slå den.
   Byggd på golvvision-kanon (via rskompakt) med hero som före/efter-effekt.

   Bärande idé: deras egen mening "Alltid rätt maskin när du behöver den".
   Heron visar exakt det: en tom byggarbetsplats i gryningen som fylls med
   minigrävare, vibratorplatta, lift och bod — levererat, på plats, klart.
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

   FLAGGOR: formuläret går till mathias@bahkobyra.se; omdömen i exempelläge;
   före/efter och galleri är illustrationer (märkt); sociala är deras egna.
   =========================================================================== */

const display = Archivo({ subsets: ['latin'], weight: ['400', '600'], display: 'swap', variable: '--pm-display' });
const displayKursiv = Archivo({ subsets: ['latin'], weight: ['400', '600'], style: ['italic'], display: 'swap', preload: false, variable: '--pm-display-kursiv' });
const ui = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap', variable: '--pm-ui' });

export const metadata = {
  title: 'Proffsmaskiner Sverige AB — maskinuthyrning i Sollentuna och Stockholm',
  description:
    'Hyr minigrävare, liftar, bodar, håltagning, elförsörjning och byggmaskiner i Sollentuna. Leverans till arbetsplatsen, rengöring ingår, 0 kr i dolda avgifter. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

const TEL = '08-545 899 90';
const TEL_HREF = 'tel:+46854589990';
const EPOST = 'info@proffsmaskiner.se';
const ADRESS = 'Bäckvägen 20, 192 54 Sollentuna';
const IG = 'https://www.instagram.com/proffsmaskinerab/';
const FORM_ACTION = 'mailto:mathias@bahkobyra.se?subject=Proffsmaskiner%20-%20hyresf%C3%B6rfr%C3%A5gan';

const LANKAR = [
  { href: '#tjanster', txt: 'Maskiner' },
  { href: '#process', txt: 'Så går det till' },
  { href: '#varfor', txt: 'Varför oss' },
  { href: '#fragor', txt: 'Vanliga frågor' },
];

const RITNINGAR = {
  anlaggning: (<><path d="M20 96h160" /><path d="M36 96V70h44l16-30h30l10 30h10v26" /><circle cx="56" cy="96" r="10" /><circle cx="126" cy="96" r="10" /><path d="M96 40l40-22 30 18" /><path d="M166 36l12 20-10 4" /></>),
  lift: (<><path d="M40 100h120" /><path d="M56 100V90h88v10" /><path d="M64 90l72-24M136 90L64 66M64 66l72-24M136 66L64 42" /><path d="M56 42h88v-8H56z" /><path d="M60 34v-10h80v10" /></>),
  bod: (<><path d="M24 44h152v56H24z" /><path d="M24 44l76-20 76 20" /><path d="M48 62h24v20H48zM128 62h24v20h-24z" /><path d="M88 100V64h24v36" /><path d="M24 108h152" /></>),
  el: (<><path d="M30 40h140v56H30z" /><path d="M30 60h140" /><path d="M46 78h24M130 78h24" /><path d="M104 44l-14 24h20l-14 24" /><path d="M60 104v10M140 104v10" /></>),
};

const TJANSTER = [
  { id: 'anlaggning', ritning: 'anlaggning', namn: 'Anläggning', text: 'Minigrävare, grävmaskiner, vibrationsplattor och markvibratorer. Rätt storlek för tomten, kontrollerad och servad innan den lämnar oss.', punkter: ['Grävmaskiner och minigrävare', 'Vibrationsplattor', 'Markvibratorer'] },
  { id: 'lift', ritning: 'lift', namn: 'Liftar och ställningar', text: 'Saxliftar, bomliftar och ställning för fasad, tak och installation inomhus. Vi hjälper er välja höjd och räckvidd efter jobbet, inte efter listan.', punkter: ['Saxliftar', 'Bomliftar', 'Ställningar'] },
  { id: 'bod', ritning: 'bod', namn: 'Bodar och rastvagnar', text: 'Personalbod, kontorsbod och rastvagn levererade och uppställda. Från förbrukningsmaterial till hela bodetableringen, från samma leverantör.', punkter: ['Bodetablering', 'Rastvagnar', 'Förbrukningsmaterial'] },
  { id: 'el', ritning: 'el', namn: 'El, håltagning och rivning', text: 'Generatorer och kompressorer, borriggar för betonghåltagning och rivningsmaskiner. Specialmaskinerna som gör att jobbet inte stannar.', punkter: ['Elförsörjning', 'Betonghåltagning', 'Rivningsmaskiner'] },
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
  { tal: 1, prefix: '', etikett: 'Leverantör, från material till bod' },
];

const VARFOR = [
  'Proffs jobbar med proffs. Vi har själva stått på fältet och sålt maskinerna.',
  'Varje maskin är kontrollerad och servad innan den lämnar oss.',
  'Går den sönder får ni en ersättningsmaskin. Projektet stannar inte.',
  'Räcker en mindre grävare för jobbet säger vi det. Även när en större hade gett oss mer betalt.',
];

/* Inga riktiga omdömen hittade — exempelläge, märkt. */
const OMDOMEN = [
  { namn: 'Exempel', ort: 'Byggfirma, Sollentuna', text: 'Exempel: här står ett riktigt omdöme från en kund, med namn och företag som de själva skrivit det.' },
  { namn: 'Exempel', ort: 'Markentreprenad, Stockholm', text: 'Exempel: ett andra kort, hämtat ur er Google-profil när den är på plats.' },
  { namn: 'Exempel', ort: 'Fastighetsbolag, Upplands Väsby', text: 'Exempel: ett tredje kort. Tre riktiga omdömen räcker för att sidan ska kännas sann.' },
];

const FRAGOR = [
  { q: 'Måste jag ha ett konto för att hyra?', a: 'Nej. Ring eller skriv så får du offert eller bokning direkt. Kundportalen är ett tillval för dig som vill hantera bokningar och fakturor själv.' },
  { q: 'Levererar ni, eller hämtar jag själv?', a: 'Det väljer du. Vi levererar direkt till arbetsplatsen, eller så hämtar du hos oss på Bäckvägen 20 i Sollentuna. Behöver du den snabbt säger du det.' },
  { q: 'Vad händer om maskinen går sönder?', a: 'Kontakta oss direkt. Vi hjälper till med felsökning, reparation eller ersättningsmaskin så att projektet inte behöver stanna.' },
  { q: 'Vad kostar det?', a: 'Det beror på maskin och hyrestid. Du får ett pris innan du bokar, och fakturan har inga dolda avgifter. Rengöringen ingår.' },
  { q: 'Vilka maskiner har ni?', a: 'Grävmaskiner och minigrävare, liftar och ställningar, kompressorer och generatorer, vibrationsplattor, bodar och rastvagnar, borriggar för håltagning och rivningsmaskiner. Saknas något: fråga.' },
  { q: 'Hyr ni ut till privatpersoner?', a: 'Vi är byggda för företag och proffs, men hör av dig så säger vi vad som går.' },
  { q: 'Kan jag ladda elbilen hos er?', a: 'Ja. Kunder laddar gratis när de besöker oss på Bäckvägen.' },
  { q: 'Var finns ni?', a: 'Bäckvägen 20 i Sollentuna, med leverans i Stockholm med omnejd. Ligger jobbet längre bort får du säga var, så säger vi om vi kan ta det.' },
];

const Stjarnor = ({ tom }) => (<span className={`${styles.stjarnor}${tom ? ` ${styles.stjarnorTomma}` : ''}`} role="img" aria-label={tom ? 'Stjärnor, exempel' : 'Fem stjärnor'}>{[0, 1, 2, 3, 4].map((i) => (<svg viewBox="0 0 24 24" aria-hidden="true" key={i}><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.5L12 17.3l-5.9 3.2 1.3-6.5L2.5 9.4l6.6-.8z" /></svg>))}</span>);

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
          <video className={styles.heroLiggande} autoPlay muted loop playsInline preload="metadata" poster="/proffsmaskiner/media/poster-hero.jpg"><source src="/proffsmaskiner/media/video-hero-fore-efter-etablering.mp4" type="video/mp4" /></video>
          <video className={styles.heroStaende} autoPlay muted loop playsInline preload="metadata" poster="/proffsmaskiner/media/poster-hero-mobil.jpg"><source src="/proffsmaskiner/media/video-hero-fore-efter-etablering-mobil.mp4" type="video/mp4" /></video>
        </figure>
        <div className={styles.heroLager}>
          <div className={styles.heroLagerIn}>
            <h1 className={styles.heroLogo}><Image src="/proffsmaskiner/media/logo-proffsmaskiner-vit.svg" alt="Proffsmaskiner Sverige AB" width={255} height={142} priority unoptimized /></h1>
            <p className={styles.heroTjanster}>Anläggning · Liftar · Bodar</p>
            <p className={styles.heroOrt}>Sollentuna · Stockholm</p>
            <div className={styles.heroCta}>
              <a className={styles.btn} href="#kontakt">Få offert på maskin</a>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={TEL_HREF}>Ring {TEL}</a>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.tejp} role="group" aria-label="Det här hyr vi ut">
        <div className={styles.tejpSpar}>{[false, true].map((kopia) => (<div className={styles.tejpIn} aria-hidden={kopia || undefined} key={kopia ? 'b' : 'a'}><span>Anläggning</span><span>Bodar och rastvagnar</span><span>Byggmaskiner</span><span>Betonghåltagning</span><span>Elförsörjning</span><span>Liftar</span><span>Rivningsmaskiner</span><span>Leverans till arbetsplatsen</span></div>))}</div>
      </div>

      <div className={styles.wrap}>
        <div className={styles.stats} role="list" aria-label="Proffsmaskiner i siffror">
          {STATS.map((s) => (<div className={styles.stat} role="listitem" key={s.etikett}><b>{s.prefix}<span className={styles.statTal} style={{ '--mal': s.tal }} aria-hidden="true" /><span className={styles.statStatisk}>{s.tal}</span></b><span>{s.etikett}</span></div>))}
        </div>
      </div>

      <section className={styles.sek} id="forvandling">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Leveransen</p><h2 className={styles.h2}>Alltid rätt maskin <em>när du behöver den.</em></h2><p className={styles.sekLead}>Klockan sju är tomten tom. Klockan åtta står grävaren, plattan, liften och boden där jobbet ska göras. Det är skillnaden mellan en maskinlista och en leverantör.</p></div>
          <div className={styles.forvandling}>
            <figure><Image src="/proffsmaskiner/media/galleri-fore-tom-tomt.jpg" alt="Inhägnad tom byggarbetsplats i gryningen, grus och lera, inga maskiner" width={1200} height={1200} /><figcaption><b>07:00</b></figcaption></figure>
            <figure><Image src="/proffsmaskiner/media/galleri-efter-etablerad.jpg" alt="Samma tomt med minigrävare, vibratorplatta, saxlift och byggbod på plats" width={1200} height={1200} /><figcaption><b>08:00</b></figcaption></figure>
          </div>
          <div className={styles.galleri}>
            <figure><Image src="/proffsmaskiner/media/galleri-makro-hydraulik.jpg" alt="Närbild på minigrävarens hydraulikkoppling och nya slangar" width={1200} height={1200} /><figcaption>Servad innan den lämnar oss.</figcaption></figure>
            <figure><Image src="/proffsmaskiner/media/galleri-liftar.jpg" alt="Rad av saxliftar och en bomlift i en uthyrningshall" width={1200} height={1200} /><figcaption>Liftar: sax och bom, rätt höjd för jobbet.</figcaption></figure>
            <figure><Image src="/proffsmaskiner/media/galleri-haltagning.jpg" alt="Borrigg för betonghåltagning monterad på en betongvägg" width={1200} height={1200} /><figcaption>Betonghåltagning.</figcaption></figure>
            <figure><Image src="/proffsmaskiner/media/galleri-elforsorjning.jpg" alt="Generator på släp som matar en upplyst byggbod i skymningen" width={1200} height={1200} /><figcaption>Elförsörjning till boden och bygget.</figcaption></figure>
          </div>
          <p className={styles.forvandlingNot}>Illustrationsbilder — byts mot era egna maskiner och etableringar.</p>
        </div>
      </section>

      <section className={styles.sek} id="tjanster">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Maskiner</p><h2 className={styles.h2}>Från förbrukningsmaterial <em>till bodetablering</em></h2><p className={styles.sekLead}>Stort som smått, för bygg-, rivnings- och markprojekt. Alla maskiner är kontrollerade och servade innan varje uthyrning.</p></div>
          <div className={styles.tjanster}>{TJANSTER.map((t) => (<article className={styles.tjanst} key={t.id}><svg className={styles.ritning} viewBox="0 0 200 120" aria-hidden="true">{RITNINGAR[t.ritning]}</svg><h3>{t.namn}</h3><p>{t.text}</p><ul>{t.punkter.map((p) => <li key={p}>{p}</li>)}</ul></article>))}</div>
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

      <section className={styles.sek} id="varfor">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Varför oss</p><h2 className={styles.h2}>Proffs jobbar <em>med proffs</em></h2></div>
          <div className={styles.varforModul}>
            <figure className={styles.varforFilm}><video autoPlay muted loop playsInline preload="metadata" poster="/proffsmaskiner/media/poster-varfor.jpg" aria-label="Långsam åkning längs maskinerna på den etablerade tomten"><source src="/proffsmaskiner/media/video-varfor-maskinerna.mp4" type="video/mp4" /></video></figure>
            <ul className={styles.varforPunkter}>{VARFOR.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="omdomen">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Omdömen</p><h2 className={styles.h2}>Vad kunderna säger</h2><p className={styles.googleRad}><svg className={styles.googleG} viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.4a4.6 4.6 0 01-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.4z" /><path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0012 22z" /><path fill="#FBBC04" d="M6.4 14a6 6 0 010-3.8V7.6H3.1a10 10 0 000 9l3.3-2.6z" /><path fill="#EA4335" d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 003.1 7.6L6.4 10c.8-2.3 3-4 5.6-4z" /></svg><span>Här står ert Google-betyg när profilen är på plats</span></p></div>
          <div className={styles.recensioner}>
            {OMDOMEN.map((o, i) => (<figure className={styles.recension} key={i}><div className={styles.recensionHuvud}><span className={styles.avatar} aria-hidden="true">E</span><figcaption><b>{o.namn}</b><span>{o.ort}</span></figcaption></div><Stjarnor tom /><blockquote>{o.text}</blockquote></figure>))}
          </div>
          <div className={styles.recensionerFot}><p className={styles.recensionerNot}>Exempel — byts mot era riktiga omdömen. Inget betyg påstås förrän det finns.</p><a className={`${styles.btn} ${styles.btnMork}`} href="https://www.google.com/maps/search/Proffsmaskiner+Sverige+AB+Sollentuna" target="_blank" rel="noopener">Se alla recensioner</a></div>
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
            <form className={styles.form} action={FORM_ACTION} method="post" encType="text/plain" aria-describedby="form-not">
              <label>Företag<input type="text" name="foretag" autoComplete="organization" required /></label>
              <label>Telefon<input type="tel" name="telefon" autoComplete="tel" required /></label>
              <label>E-post (valfritt)<input type="email" name="epost" autoComplete="email" /></label>
              <label>Vad behöver ni?<select name="typ" defaultValue="Anläggning"><option>Anläggning</option><option>Liftar och ställningar</option><option>Bodar och rastvagnar</option><option>Elförsörjning</option><option>Betonghåltagning</option><option>Rivningsmaskiner</option><option>Något annat</option></select></label>
              <label>Kort om jobbet<textarea name="meddelande" rows={4} placeholder="Vad som ska göras, var, hur länge, och om ni vill ha maskinen levererad" /></label>
              <button className={styles.btn} type="submit">Få offert på maskin</button>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={TEL_HREF}>Eller ring {TEL}</a>
              <p className={styles.formNot} id="form-not">Skriv kort om jobbet — då kan vi föreslå rätt maskin redan i första samtalet. Inga massutskick, ingen säljlista.</p>
              <p className={styles.formNot}>Obs: i det här förslaget öppnar knappen ditt e-postprogram och skickar raderna till Bahko Byrå. I den skarpa sajten kopplas formuläret in och landar direkt i er egen inkorg.</p>
            </form>
          </div>
        </div>
      </section>

      <footer className={styles.ftr}>
        <div className={styles.wrap}>
          <div className={styles.ftrGrid}>
            <div><span className={styles.brandTxt}><b>Proffsmaskiner Sverige AB</b><i>Maskinuthyrning</i></span><p className={styles.ftrText}>Anläggning, liftar, bodar, elförsörjning, håltagning och rivning för bygg- och markprojekt i Stockholm med omnejd. Leverans till arbetsplatsen.</p></div>
            <div className={styles.ftrLankar}>{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}<a href={TEL_HREF}>{TEL}</a><a href={`mailto:${EPOST}`}>{EPOST}</a><a href={IG} target="_blank" rel="noopener">@proffsmaskinerab</a><a href="#top">Till toppen</a></div>
          </div>
          <div className={styles.ftrBar}><span>Proffsmaskiner Sverige AB · Org.nr 559154-6329 · {ADRESS}</span><span>Förslag byggt av <a href="https://www.bahkobyra.se" target="_blank" rel="noopener">Bahko Byrå</a></span></div>
        </div>
      </footer>

      <div className={styles.mobilMenyLager} id="meny"><a className={styles.mobilMenySkugga} href="#stangd" tabIndex={-1} aria-hidden="true" /><nav className={styles.mobilMenyPanel} aria-label="Meny">{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}<a href="#kontakt">Kontakt</a><a className={styles.mobilMenyStang} href="#stangd">Stäng menyn</a></nav></div>
      <span className={styles.stangdAnkare} id="stangd" />
      <input type="checkbox" id="popup-bort" className={styles.popupBort} aria-hidden="true" tabIndex={-1} />
      <aside className={styles.popup} aria-label="Kontakta Proffsmaskiner"><label className={styles.popupX} htmlFor="popup-bort" role="button" aria-label="Stäng" tabIndex={0}>✕</label><p className={styles.popupEyebrow}>Maskin till måndag?</p><p className={styles.popupTxt}>Ring så säger vi vad vi kan leverera, och när. Inget konto, inga dolda avgifter.</p><a className={`${styles.btn} ${styles.popupCta}`} href={TEL_HREF}>Ring {TEL}</a><a className={styles.popupAlt} href="#kontakt">Eller skriv några rader →</a></aside>
      <a className={styles.demoKnapp} href="#bahko-demo">Om det här förslaget</a>
      <div className={styles.modalLager} id="bahko-demo"><a className={styles.modalSkugga} href="#stangd" tabIndex={-1} aria-hidden="true" /><section className={styles.modal} aria-labelledby="bahko-rubrik"><a className={styles.modalX} href="#stangd" aria-label="Stäng">✕</a><span className={styles.modalBadge}>Förslag av Bahko Byrå</span><h3 id="bahko-rubrik">Så här kan Proffsmaskiner se ut på nätet</h3><p>Det här är ett kostnadsfritt förslag, byggt på det ni själva visar på proffsmaskiner.se och Instagram. Ingen beställning, inget åtagande. Vill ni se den skarpt med era egna maskiner, kundportalen inkopplad och ett formulär som landar i inkorgen? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.</p><a className={styles.modalCta} href="https://cal.eu/bahkobyra/15min" target="_blank" rel="noopener">Boka 15 min gratis samtal →</a><a className={styles.modalAlt} href="mailto:mathias@bahkobyra.se?subject=Proffsmaskiner%20-%20f%C3%B6rslag%20p%C3%A5%20hemsida">Eller mejla → mathias@bahkobyra.se</a><span className={styles.modalFot}>Bahko Byrå · Synlighet som säljer.</span></section></div>
    </div>
  );
}
