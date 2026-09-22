import Image from 'next/image';
import { Archivo, Inter } from 'next/font/google';
import styles from './valora.module.css';
import DemoFormular from '../../komponenter/DemoFormular';

/* ===========================================================================
   VALORA — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: instagram.com/reel_innovations ("Valora") · företagsförmedling ·
   ingen hemsida. VD Adrian Alawi.

   RÄTTELSE: det här kontot ledde 2026-09-07 till demon på /elvionel/, som
   byggdes åt elektrikerfirman kontot då länkade till. Det var fel mottagare.
   Mathias 2026-09-14: demon riktas om till Valora själva. Elvion El-demon
   ligger kvar på /elvionel/ som en egen lead — den är sann om Elvion El.

   Bärande idé: deras egen sista bio-rad, "From Idea to Completed Deal".
   Hela affären är osynlig ända fram till den sista sidan som skrivs under.
   Heron visar just det: samma styrelserum tomt och släckt på morgonen, och
   med avtalet påskrivet när dagen är slut. Sidan säljer vägen däremellan.

   VERIFIERAT (IG-profil och bio, skärmdump från Mathias 2026-09-14):
   Kontonamn "Valora" (@reel_innovations) · kategori Företagstjänst · bio
   ordagrant, på engelska: "Buying & Selling Businesses", "Connecting Buyers
   & Sellers", "Valuation & Negotiation", "From Idea to Completed Deal",
   "CEO: Adrian Alawi" · 1 inlägg, 309 följare · bland följarna finns
   svenska hantverks- och transportföretag, och kontakten med Bahko har
   skett på svenska — därför är sidan skriven på svenska.

   INTE verifierat, och finns därför inte på sidan: org.nr (A.D. Valora AB
   i registret tillhör en annan person och är inte dem), hemsida (valora.se
   är tom, valorapartners.se är parkerad), telefon, e-post, ORT, antal
   affärer, provision, priser, ledtider, omdömen. Alla siffror i statsraden
   är ERBJUDANDEN i mallens form, inte historik. Tjänsterna är deras fyra
   bio-rader översatta, ingenting utöver dem.

   FLAGGOR: ingen kontaktväg finns publicerad — knapparna går till formuläret
   och till Instagram, aldrig till ett gissat nummer eller en gissad adress.
   Ordmärke i stället för logotyp (profilbilden är 100 px). Omdömen i
   exempelläge. Alla bilder är illustrationer, märkt en gång.
   =========================================================================== */

const display = Archivo({ subsets: ['latin'], weight: ['400', '600'], display: 'swap', variable: '--va-display' });
const displayKursiv = Archivo({ subsets: ['latin'], weight: ['400', '600'], style: ['italic'], display: 'swap', preload: false, variable: '--va-display-kursiv' });
const ui = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap', variable: '--va-ui' });

export const metadata = {
  title: 'Valora — företagsförmedling, värdering och förhandling',
  description:
    'Vi förmedlar köp och försäljning av företag. Värdering, rätt köpare och förhandling hela vägen från idé till avslutad affär. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

const IG = 'https://www.instagram.com/reel_innovations/';

const LANKAR = [
  { href: '#tjanster', txt: 'Vad vi gör' },
  { href: '#process', txt: 'Så går det till' },
  { href: '#varfor', txt: 'Varför oss' },
  { href: '#fragor', txt: 'Vanliga frågor' },
];

const RITNINGAR = {
  salja: (<><path d="M28 24h144v72H28z" /><path d="M28 44h144" /><path d="M44 62h44M44 74h64" /><path d="M116 58h40v34h-40z" /><path d="M128 58v-8h16v8" /><path d="M28 106h144" /></>),
  kopa: (<><path d="M20 96h160" /><path d="M36 96V54h40v42zM84 96V38h40v58zM132 96V66h32v30z" /><path d="M56 54V40M104 38V26M148 66V54" /><path d="M20 106h160" /></>),
  vardering: (<><path d="M24 98h152" /><path d="M40 98V74h24v24zM76 98V56h24v42zM112 98V38h24v60z" /><path d="M148 98V64h16v34" /><path d="M32 30l40 20 36-18 44 22" /><circle cx="32" cy="30" r="4" /><circle cx="152" cy="54" r="4" /></>),
  forhandling: (<><path d="M20 78h160" /><path d="M44 78V52h48v26zM108 78V52h48v26" /><path d="M56 52V36h24v16M120 52V36h24v16" /><path d="M92 64h16" /><path d="M20 90h160" /></>),
};

const TJANSTER = [
  { id: 'salja', ritning: 'salja', namn: 'Sälja företag', text: 'Du har byggt något som är värt pengar. Vi tar fram underlaget, hittar köparna och driver processen så att du kan sköta bolaget under tiden.', punkter: ['Säljunderlag', 'Urval av köpare', 'Process till avslut'] },
  { id: 'kopa', ritning: 'kopa', namn: 'Köpa företag', text: 'Att köpa ett bolag är snabbare än att bygga ett. Vi letar upp objekt som passar, granskar dem och säger ifrån när siffrorna inte håller.', punkter: ['Söka objekt', 'Granskning', 'Bud och struktur'] },
  { id: 'vardering', ritning: 'vardering', namn: 'Värdering', text: 'Vad är bolaget faktiskt värt, och varför? Du får en värdering som håller i ett förhandlingsrum, inte bara en siffra på ett papper.', punkter: ['Värdering av bolag', 'Underlag som håller', 'Genomgång med dig'] },
  { id: 'forhandling', ritning: 'forhandling', namn: 'Förhandling', text: 'Den svåraste delen ligger mellan handslaget och signaturen. Vi sitter med hela vägen och håller ihop parterna tills det är påskrivet.', punkter: ['Förhandling', 'Villkor och upplägg', 'Fram till signering'] },
];

const STEGRITNINGAR = {
  samtal: (<><path d="M40 30h120v60H40z" /><path d="M40 30l60 40 60-40" /><path d="M40 104h120M40 100v8M160 100v8" /></>),
  vardera: (<><path d="M24 98h152" /><path d="M40 98V74h24v24zM76 98V56h24v42zM112 98V38h24v60z" /><path d="M148 98V64h16v34" /></>),
  matcha: (<><path d="M46 62a26 26 0 1152 0 26 26 0 01-52 0z" /><path d="M102 62a26 26 0 1152 0 26 26 0 01-52 0z" /><path d="M92 62h16" /><path d="M20 104h160" /></>),
  forhandla: (<><path d="M20 78h160" /><path d="M44 78V52h48v26zM108 78V52h48v26" /><path d="M56 52V36h24v16M120 52V36h24v16" /></>),
  avslut: (<><path d="M32 20h136v76H32z" /><path d="M32 66h136" /><path d="M58 40l16 16 32-34" /><path d="M54 82h92" /><path d="M32 108h136M32 104v8M168 104v8" /></>),
};

const STEG = [
  { nr: '1', namn: 'Ett samtal', ritning: 'samtal', text: 'Berätta vad du funderar på. Vi säger rakt ut om det är läge att gå vidare eller inte, och det kostar ingenting.' },
  { nr: '2', namn: 'Värdering', ritning: 'vardera', text: 'Vi går igenom siffrorna och tar fram vad bolaget är värt, med resonemanget bakom. Du vet vad du har innan någon annan får veta.' },
  { nr: '3', namn: 'Rätt motpart', ritning: 'matcha', text: 'Vi letar upp köpare eller objekt som faktiskt passar, och sållar bort dem som bara vill titta.' },
  { nr: '4', namn: 'Förhandling', ritning: 'forhandla', text: 'Pris, villkor och upplägg. Vi sitter mellan parterna och håller processen igång när den kärvar.' },
  { nr: '5', namn: 'Avslut', ritning: 'avslut', text: 'Avtalet skrivs under och affären går i mål. Från idé till avslutad affär, som vi brukar säga.' },
];

/* Löftesbaserad statsrad — ingen historik är verifierad. "From Idea to
   Completed Deal" är deras egen bio-rad; resten är erbjudanden i mallens
   form (första samtalet, sekretess, en kontakt). */
const STATS = [
  { tal: 0, prefix: '', etikett: 'Kronor för första samtalet' },
  { tal: 100, prefix: '', etikett: 'Procent sekretess i processen' },
  { tal: 1, prefix: '', etikett: 'Kontaktperson hela vägen' },
  { tal: 5, prefix: '', etikett: 'Steg från idé till avslut' },
];

const VARFOR = [
  'Vi förmedlar köp och försäljning av företag. Det är hela vår verksamhet.',
  'Värdering, urval och förhandling från samma bord, inte tre olika rådgivare.',
  'Allt du berättar stannar mellan oss tills du säger annat.',
  'Är det fel läge att sälja säger vi det. Även när en affär hade gett oss arvode.',
];

/* Inga omdömen hittade — exempelläge, märkt. En förmedlare kan sällan namnge
   parter, så korten är skrivna så att anonyma omdömen passar in. */
const OMDOMEN = [
  { namn: 'Exempel', ort: 'Säljare, tjänsteföretag', text: 'Exempel: här står ett riktigt omdöme från en säljare, med den formulering och den grad av anonymitet ni kommer överens om.' },
  { namn: 'Exempel', ort: 'Köpare, industri', text: 'Exempel: ett andra kort, hämtat ur er Google-profil när den är på plats.' },
  { namn: 'Exempel', ort: 'Ägarledd rörelse', text: 'Exempel: ett tredje kort. Tre riktiga omdömen räcker för att sidan ska kännas sann.' },
];

const FRAGOR = [
  { q: 'Vad kostar det?', a: 'Första samtalet kostar ingenting. Vad ett uppdrag kostar beror på bolagets storlek och vad som ingår, och det säger vi innan du bestämmer dig.' },
  { q: 'Hur går det till?', a: 'Ett samtal, en värdering, urval av rätt motpart, förhandling och avslut. Fem steg, och du bestämmer efter varje.' },
  { q: 'Får någon veta att jag funderar på att sälja?', a: 'Nej. Sekretess är själva förutsättningen. Vi går ut mot marknaden först när du sagt ja, och bara mot dem vi valt ut.' },
  { q: 'Hur värderar ni ett bolag?', a: 'Vi utgår från resultat, tillgångar, avtal och hur beroende verksamheten är av dig som ägare. Du får resonemanget, inte bara siffran.' },
  { q: 'Hur lång tid tar en affär?', a: 'Det beror på bolaget och på hur köpklar marknaden är. Vi säger vad vi tror efter värderingen, och du slipper gissa.' },
  { q: 'Jag vill köpa i stället. Hjälper ni med det?', a: 'Ja. Vi letar upp objekt som passar din plan, granskar dem och hjälper till med bud och upplägg.' },
  { q: 'Är bolaget för litet för er?', a: 'Hör av dig så säger vi det rakt ut. Ett kort samtal kostar ingenting för någon av oss.' },
  { q: 'Vad händer efter att avtalet är påskrivet?', a: 'Vi följer med genom överlämningen tills båda parter är på plats i det nya upplägget.' },
];

const Stjarnor = ({ tom }) => (<span className={`${styles.stjarnor}${tom ? ` ${styles.stjarnorTomma}` : ''}`} role="img" aria-label={tom ? 'Stjärnor, exempel' : 'Fem stjärnor'}>{[0, 1, 2, 3, 4].map((i) => (<svg viewBox="0 0 24 24" aria-hidden="true" key={i}><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.5L12 17.3l-5.9 3.2 1.3-6.5L2.5 9.4l6.6-.8z" /></svg>))}</span>);

export default function ValoraDemo() {
  return (
    <div className={`${display.variable} ${displayKursiv.variable} ${ui.variable} ${styles.sida}`}>
      <header className={styles.hdr}>
        <div className={styles.hdrIn}>
          <a className={styles.brand} href="#top"><span className={styles.brandTxt}><b>Valora</b><i>Företagsförmedling</i></span></a>
          <nav className={styles.nav}>{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}</nav>
          <a className={styles.mobilNavKnapp} href="#meny"><span>Meny</span><span className={styles.mobilNavIkon} aria-hidden="true" /></a>
          <a className={styles.hdrTel} href="#kontakt" aria-label="Boka ett samtal"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg><span className={styles.hdrTelNr} aria-hidden="true">Boka samtal</span><span className={styles.hdrTelKort} aria-hidden="true">Samtal</span></a>
        </div>
      </header>

      <section className={styles.hero} id="top">
        <figure className={styles.heroFilm}>
          <video className={styles.heroLiggande} autoPlay muted loop playsInline preload="metadata" poster="/valora/media/poster-hero.jpg"><source src="/valora/media/video-hero-fore-efter-affaren.mp4" type="video/mp4" /></video>
          <video className={styles.heroStaende} autoPlay muted loop playsInline preload="metadata" poster="/valora/media/poster-hero-mobil.jpg"><source src="/valora/media/video-hero-fore-efter-affaren-mobil.mp4" type="video/mp4" /></video>
        </figure>
        <div className={styles.heroLager}>
          <div className={styles.heroLagerIn}>
            <h1 className={styles.heroOrdmarke}>Valora</h1>
            <p className={styles.heroTjanster}>Köpa · Sälja · Värdera företag</p>
            <p className={styles.heroOrt}>Företagsförmedling</p>
            <div className={styles.heroCta}>
              <a className={styles.btn} href="#kontakt">Boka ett samtal</a>
              <a className={`${styles.btn} ${styles.btnGhost}`} href="#tjanster">Se vad vi gör</a>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.tejp} role="group" aria-label="Det här gör vi">
        <div className={styles.tejpSpar}>{[false, true].map((kopia) => (<div className={styles.tejpIn} aria-hidden={kopia || undefined} key={kopia ? 'b' : 'a'}><span>Sälja företag</span><span>Köpa företag</span><span>Värdering</span><span>Förhandling</span><span>Köpare och säljare</span><span>Från idé till avslut</span><span>Sekretess</span><span>Ägarskifte</span></div>))}</div>
      </div>

      <div className={styles.wrap}>
        <div className={styles.stats} role="list" aria-label="Valora i korthet">
          {STATS.map((s) => (<div className={styles.stat} role="listitem" key={s.etikett}><b>{s.prefix}<span className={styles.statTal} style={{ '--mal': s.tal }} aria-hidden="true" /><span className={styles.statStatisk}>{s.tal}</span></b><span>{s.etikett}</span></div>))}
        </div>
      </div>

      <section className={styles.sek} id="forvandling">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Affären</p><h2 className={styles.h2}>Från idé <em>till avslutad affär.</em></h2><p className={styles.sekLead}>Ingen ser arbetet som ligger mellan de två. Värderingen, urvalet, samtalen som inte leder någonstans och det ena som gör det. Vi gör den delen.</p></div>
          <div className={styles.forvandling}>
            <figure><Image src="/valora/media/galleri-fore-tomt-rum.jpg" alt="Tomt släckt styrelserum på morgonen, blankt bord och tomma stolar" width={1200} height={1200} /><figcaption><b>Idén</b></figcaption></figure>
            <figure><Image src="/valora/media/galleri-efter-pasktrivet.jpg" alt="Samma rum upplyst med påskrivet avtal, penna och kaffekoppar på bordet" width={1200} height={1200} /><figcaption><b>Affären</b></figcaption></figure>
          </div>
          <div className={styles.galleri}>
            <figure><Image src="/valora/media/galleri-makro-signaturen.jpg" alt="Närbild på reservoarpennan som vilar över den påskrivna sista sidan" width={1200} height={1200} /><figcaption>Sista sidan: där allt landar.</figcaption></figure>
            <figure><Image src="/valora/media/galleri-forhandling.jpg" alt="Två stolar mitt emot varandra vid ett förhandlingsbord med varsin pärm" width={1200} height={1200} /><figcaption>Förhandlingen: två sidor, ett bord.</figcaption></figure>
            <figure><Image src="/valora/media/galleri-nyckel.jpg" alt="Nyckelknippa på en bunt påskrivna handlingar" width={1200} height={1200} /><figcaption>Överlämningen, sist av allt.</figcaption></figure>
            <figure><Image src="/valora/media/galleri-avslutat-mote.jpg" alt="Tomma kaffekoppar och en stängd pärm på ett konferensbord efter avslutat möte" width={1200} height={1200} /><figcaption>Mötet som blev en affär.</figcaption></figure>
          </div>
          <p className={styles.forvandlingNot}>Illustrationsbilder — byts mot era egna.</p>
        </div>
      </section>

      <section className={styles.sek} id="tjanster">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Vad vi gör</p><h2 className={styles.h2}>Köpare och säljare, <em>ihopförda</em></h2><p className={styles.sekLead}>Vi förmedlar köp och försäljning av företag: värdering, urval och förhandling, hela vägen till avslut.</p></div>
          <div className={styles.tjanster}>{TJANSTER.map((t) => (<article className={styles.tjanst} key={t.id}><svg className={styles.ritning} viewBox="0 0 200 120" aria-hidden="true">{RITNINGAR[t.ritning]}</svg><h3>{t.namn}</h3><p>{t.text}</p><ul>{t.punkter.map((p) => <li key={p}>{p}</li>)}</ul></article>))}</div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="process">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Så går det till</p><h2 className={styles.h2}>Fem steg, och du bestämmer <em>efter varje</em></h2><p className={styles.sekLead}>Ingenting går vidare utan ditt ja. Det gäller särskilt det första steget mot marknaden.</p></div>
          <div className={styles.stegBlock}>
            {STEG.map((s, i) => <input type="radio" name="steg" id={`steg-${s.nr}`} className={styles.stegRadio} defaultChecked={i === 0} key={`r-${s.nr}`} />)}
            <div className={styles.stegVal} role="tablist" aria-label="Så går det till">{STEG.map((s) => <label className={styles.stegKnapp} htmlFor={`steg-${s.nr}`} key={`l-${s.nr}`}><span>{s.namn}</span></label>)}</div>
            <div className={styles.stegKort}>{STEG.map((s) => (<article className={styles.stegPanel} key={`p-${s.nr}`}><svg className={styles.stegRitning} viewBox="0 0 200 120" aria-hidden="true">{STEGRITNINGAR[s.ritning]}</svg><div><h3>{s.namn}</h3><p>{s.text}</p></div></article>))}</div>
          </div>
        </div>
      </section>

      <section className={styles.sek} id="varfor">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Varför oss</p><h2 className={styles.h2}>Det som avgör <em>ligger i mitten</em></h2></div>
          <div className={styles.varforModul}>
            <figure className={styles.varforFilm}><video autoPlay muted loop playsInline preload="metadata" poster="/valora/media/poster-varfor.jpg" aria-label="Långsam åkning över värderingsunderlaget på skrivbordet"><source src="/valora/media/video-varfor-underlaget.mp4" type="video/mp4" /></video></figure>
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
          <div className={styles.recensionerFot}><p className={styles.recensionerNot}>Exempel — byts mot era riktiga omdömen. Inget betyg påstås förrän det finns.</p><a className={`${styles.btn} ${styles.btnMork}`} href="https://www.google.com/maps/search/Valora+f%C3%B6retagsf%C3%B6rmedling" target="_blank" rel="noopener">Se alla recensioner</a></div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sociala}`} id="sociala">
        <div className={styles.wrap}>
          <div className={styles.socialaIkoner}>
            <a href={IG} target="_blank" rel="noopener" aria-label="Valora på Instagram"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" /><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" /></svg></a>
          </div>
          <p className={styles.socialaTxt}>Följ vårt arbete i vardagen</p>
          <div className={styles.socialaRutnat}>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/valora/media/sociala-kontoret.jpg" alt="Kontorshörna med stängd laptop, anteckningsbok och kaffe" width={1200} height={1200} /></a></figure>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/valora/media/sociala-staden.jpg" alt="Utsikt över staden i skymning från ett kontorsfönster" width={1200} height={1200} /></a></figure>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/valora/media/sociala-entren.jpg" alt="Portfölj, telefon och rock på en bänk vid en kontorsentré i morgonljus" width={1200} height={1200} /></a></figure>
          </div>
          <p className={styles.forvandlingNot}>Illustrationsbilder — byts mot era egna.</p>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="fragor">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Vanliga frågor</p><h2 className={styles.h2}>Det ni brukar fråga först</h2><p className={styles.sekLead}>Pris och sekretess först, det praktiska sedan. Gäller det ditt bolag är ett samtal snabbare än en sida.</p></div>
          <div className={styles.fragorGrid}>
            <div className={styles.fragor}>{FRAGOR.map((f) => <details className={styles.fraga} name="faq" key={f.q}><summary>{f.q}<span className={styles.fragaIkon} aria-hidden="true" /></summary><p>{f.a}</p></details>)}</div>
            <aside className={styles.fragaKort}><h3>Hittar du inte svaret?</h3><p>Skriv några rader om bolaget så säger vi rakt ut vad vi tror.</p><a className={`${styles.btn} ${styles.btnMork}`} href="#kontakt">Boka ett samtal</a></aside>
          </div>
        </div>
      </section>

      <section className={styles.kontakt} id="kontakt">
        <div className={styles.wrap}>
          <div className={styles.kontaktGrid}>
            <div>
              <p className={styles.eyebrow}>Kontakt</p>
              <h2 className={styles.h2}>Vad är bolaget värt,<br /><em>och vad vill du?</em></h2>
              <p className={styles.sekLead}>Skriv några rader om verksamheten och vad du funderar på. Första samtalet kostar ingenting, och ingenting lämnar oss utan ditt ja.</p>
              <div className={styles.kontaktRader}>
                <div className={styles.kontaktRad}><span>Kontaktperson</span><b>Adrian Alawi, VD</b></div>
                <a className={styles.kontaktRad} href={IG} target="_blank" rel="noopener"><span>Instagram</span><b>@reel_innovations</b></a>
                <div className={styles.kontaktRad}><span>Sekretess</span><b>Allt stannar mellan oss</b></div>
              </div>
            </div>
            <DemoFormular className={styles.form} amne="Valora - förfrågan">
              <label>Namn<input type="text" name="namn" autoComplete="name" required /></label>
              <label>E-post<input type="email" name="epost" autoComplete="email" required /></label>
              <label>Telefon (valfritt)<input type="tel" name="telefon" autoComplete="tel" /></label>
              <label>Vad gäller det?<select name="typ" defaultValue="Jag funderar på att sälja"><option>Jag funderar på att sälja</option><option>Jag vill köpa ett företag</option><option>Jag vill veta vad bolaget är värt</option><option>Något annat</option></select></label>
              <label>Kort om bolaget<textarea name="meddelande" rows={4} placeholder="Bransch, ungefärlig omsättning, hur länge du drivit det och vad du funderar på" /></label>
              <button className={styles.btn} type="submit">Boka ett samtal</button>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={IG} target="_blank" rel="noopener">Eller skriv på Instagram</a>
              <p className={styles.formNot} id="form-not">Skriv kort om bolaget — då kan vi säga något vettigt redan i första samtalet. Inga massutskick, ingen säljlista.</p>
            </DemoFormular>
          </div>
        </div>
      </section>

      <footer className={styles.ftr}>
        <div className={styles.wrap}>
          <div className={styles.ftrGrid}>
            <div><span className={styles.brandTxt}><b>Valora</b><i>Företagsförmedling</i></span><p className={styles.ftrText}>Vi förmedlar köp och försäljning av företag: värdering, rätt motpart och förhandling, från idé till avslutad affär.</p></div>
            <div className={styles.ftrLankar}>{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}<a href={IG} target="_blank" rel="noopener">@reel_innovations</a><a href="#kontakt">Boka ett samtal</a><a href="#top">Till toppen</a></div>
          </div>
          <div className={styles.ftrBar}><span>Valora · Företagsförmedling</span><span>Förslag byggt av <a href="https://www.bahkobyra.se" target="_blank" rel="noopener">Bahko Byrå</a></span></div>
        </div>
      </footer>

      <div className={styles.mobilMenyLager} id="meny"><a className={styles.mobilMenySkugga} href="#stangd" tabIndex={-1} aria-hidden="true" /><nav className={styles.mobilMenyPanel} aria-label="Meny">{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}<a href="#kontakt">Kontakt</a><a className={styles.mobilMenyStang} href="#stangd">Stäng menyn</a></nav></div>
      <span className={styles.stangdAnkare} id="stangd" />
      <input type="checkbox" id="popup-bort" className={styles.popupBort} aria-hidden="true" tabIndex={-1} />
      <aside className={styles.popup} aria-label="Kontakta Valora"><label className={styles.popupX} htmlFor="popup-bort" role="button" aria-label="Stäng" tabIndex={0}>✕</label><p className={styles.popupEyebrow}>Funderar du på att sälja?</p><p className={styles.popupTxt}>Ett första samtal kostar ingenting och stannar mellan oss. Du får veta vad bolaget är värt innan du bestämmer något.</p><a className={`${styles.btn} ${styles.popupCta}`} href="#kontakt">Boka ett samtal</a><a className={styles.popupAlt} href={IG} target="_blank" rel="noopener">Eller skriv på Instagram →</a></aside>
      <a className={styles.demoKnapp} href="#bahko-demo">Om det här förslaget</a>
      <div className={styles.modalLager} id="bahko-demo"><a className={styles.modalSkugga} href="#stangd" tabIndex={-1} aria-hidden="true" /><section className={styles.modal} aria-labelledby="bahko-rubrik"><a className={styles.modalX} href="#stangd" aria-label="Stäng">✕</a><span className={styles.modalBadge}>Förslag av Bahko Byrå</span><h3 id="bahko-rubrik">Så här kan Valora se ut på nätet</h3><p>Det här är ett kostnadsfritt förslag, byggt på det ni själva skriver på Instagram. Ingen beställning, inget åtagande. Vill ni se den skarpt med era egna uppgifter, er logotyp och ett formulär som landar i inkorgen? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.</p><a className={styles.modalCta} href="https://cal.eu/bahkobyra/15min" target="_blank" rel="noopener">Boka 15 min gratis samtal →</a><a className={styles.modalAlt} href="mailto:mathias@bahkobyra.se?subject=Valora%20-%20f%C3%B6rslag%20p%C3%A5%20hemsida">Eller mejla → mathias@bahkobyra.se</a><span className={styles.modalFot}>Bahko Byrå · Synlighet som säljer.</span></section></div>
    </div>
  );
}
