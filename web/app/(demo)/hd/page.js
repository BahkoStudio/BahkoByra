import Image from 'next/image';
import { Archivo, Inter } from 'next/font/google';
import styles from './hd.module.css';

/* ===========================================================================
   HD BYGGSERVICE AB — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: instagram.com/hdbyggserviceab · Norrort, Stockholm · har hemsida
   (hdbyggservice.se, WordPress/Astra) — förslaget är en förbättring.
   Byggd på golvvision-kanon (modulerna 2026-09-06) med den nya hero-metoden
   2026-09-07: hero-filmen är en före/efter-effekt (start- och slutbild ur
   kedjan A → B), inte en drönarshot.

   Bärande idé: "Premium finish" är deras egen rad i Instagram-bion, och
   sajten säger "oftast inom 10 dagar". En renovering som blir klar — och
   ser klar ut — på under två veckor. Det är löftet sidan bygger på.

   VERIFIERAT (hdbyggservice.se + IG-bio + allabolag, 2026-09-07):
   Firmanamn "HD Byggservice AB" · org.nr 559245-5199, registrerat
   2020-03-02, säte Vätö/Norrtälje, 3 anställda (registret) · familjeägt,
   drivs av Hannes och Jesper (sajten) · e-post hdbyggservice.hannes@gmail.com
   och hdbyggservice.jesper@gmail.com (sajten) · tjänster ordagrant: renovering
   (rivning, gjutning, snickeri, plattsättning, kök, golv, väggar), om- och
   tillbyggnad (altaner, uterum, planlösningar), smarta hem och belysning
   (Plejd, LED-konvertering, Google Home) · kunder: privatpersoner och BRF ·
   områden ordagrant: Norrort och innerstaden — Österåker, Vallentuna, Järva,
   Upplands Väsby, Täby, Sollentuna, Östermalm, City · sajten uppger: "över
   45 års samlad erfarenhet", garanti på arbetet, "oftast inom 10 dagar",
   kostnadsfri bedömning · IG-bio: "Helhetsrenoveringar & snickeri · Premium
   finish · Stockholm", 178 inlägg, 221 följare, höjdpunkt "Omdömen" ·
   Facebook länkad från sajten · franska bulldoggen Harry (sajten och IG) ·
   logotypen är deras egen (rund badge, favicon 512 px, svart platta
   bortnycklad) · tre foton i sociala-rutnätet är deras egna från sajten
   (drönarbild altan med belysning, Hannes under tältet, bilarna).

   INTE verifierat, och finns därför inte på sidan: telefonnummer (finns inte
   i sajtens text), Google-betyg (höjdpunkten "Omdömen" går inte att läsa;
   inga recensioner hittade), antal projekt, priser. "45 års samlad
   erfarenhet", garanti och "inom 10 dagar" står som deras egna uppgifter.

   OMDÖMESMODULEN i exempelläge: tre kort märkta Exempel. De HAR en
   höjdpunkt med omdömen på Instagram — be om skärmdumpar.

   FLAGGOR: formuläret går till mathias@bahkobyra.se; inget telefonnummer på
   sidan (Ring-knapparna leder till kontaktformuläret); galleriet är
   illustrationer, märkt en gång.
   =========================================================================== */

const display = Archivo({ subsets: ['latin'], weight: ['400', '600'], display: 'swap', variable: '--hd-display' });
const displayKursiv = Archivo({ subsets: ['latin'], weight: ['400', '600'], style: ['italic'], display: 'swap', preload: false, variable: '--hd-display-kursiv' });
const ui = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap', variable: '--hd-ui' });

export const metadata = {
  title: 'HD Byggservice AB — helhetsrenovering och snickeri i Norrort, Stockholm',
  description:
    'Familjeägd byggfirma i Norrort. Helhetsrenovering, snickeri, om- och tillbyggnad och smarta hem med premium finish, oftast klart inom 10 dagar. Kostnadsfri bedömning. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

/* Inget telefonnummer finns verifierat. Ring-knapparna leder därför till
   formuläret — aldrig ett gissat nummer. */
const EPOST = 'hdbyggservice.hannes@gmail.com';
const EPOST2 = 'hdbyggservice.jesper@gmail.com';
const IG = 'https://www.instagram.com/hdbyggserviceab/';
const FB = 'https://www.facebook.com/profile.php?id=61588482044000';
const FORM_ACTION = 'mailto:mathias@bahkobyra.se?subject=HD%20Byggservice%20-%20bed%C3%B6mning';

const LANKAR = [
  { href: '#tjanster', txt: 'Vad vi gör' },
  { href: '#process', txt: 'Så går det till' },
  { href: '#varfor', txt: 'Varför oss' },
  { href: '#fragor', txt: 'Vanliga frågor' },
];

const RITNINGAR = {
  renovering: (<><path d="M30 26h140v72H30z" /><path d="M30 62h140" /><path d="M64 26v72M100 26v72M136 26v72" /><path d="M30 110h140M30 106v8M170 106v8" /></>),
  snickeri: (<><path d="M24 16v96M176 16v96" /><path d="M24 16h152M24 44h152M24 72h152M24 100h152" /><path d="M96 44v28M140 72v28" /></>),
  tillbyggnad: (<><path d="M24 100V44l44-24 44 24v56" /><path d="M112 100V62h64v38" /><path d="M112 62l32-14 32 14" /><path d="M24 100h152" /><path d="M24 112h152M24 108v8M176 108v8" /></>),
  belysning: (<><path d="M100 22v10" /><path d="M76 56a24 24 0 1 0 48 0a24 24 0 1 0-48 0" /><path d="M88 80h24v10H88z" /><path d="M60 40l8 6M140 40l-8 6" /><path d="M40 104h120M40 100v8M160 100v8" /></>),
};

const TJANSTER = [
  { id: 'renovering', ritning: 'renovering', namn: 'Helhetsrenovering', text: 'Kök, badrum och hela lägenheter: rivning, gjutning, snickeri, plattsättning, golv och väggar. Ett lag som gör hela vägen, så ingen väntar på nästa hantverkare.', punkter: ['Kök och badrum', 'Rivning och gjutning', 'Golv, väggar och plattsättning'] },
  { id: 'snickeri', ritning: 'snickeri', namn: 'Snickeri och montering', text: 'Platsbyggt där färdigköpt inte passar, och montering av det som ska sitta rakt: kök, garderober, fönster och dörrar. Fogen mot taket är det som skiljer bra från premium.', punkter: ['Platsbyggda garderober', 'Köksmontering', 'Fönster och dörrar'] },
  { id: 'tillbyggnad', ritning: 'tillbyggnad', namn: 'Om- och tillbyggnad', text: 'Altaner, uterum och nya planlösningar. Vi river, gjuter och bygger så att det nya smälter ihop med det befintliga, från grunden till listen.', punkter: ['Altan och uterum', 'Planlösningar', 'Rivning och gjutning'] },
  { id: 'belysning', ritning: 'belysning', namn: 'Smarta hem och belysning', text: 'Plejd, LED-konvertering och styrning via Google Home. Belysning som är planerad in i renoveringen, inte en eftertanke med sladd på väggen.', punkter: ['Plejd och dimning', 'LED-konvertering', 'Google Home'] },
];

const STEGRITNINGAR = {
  kontakt: (<><path d="M40 30h120v60H40z" /><path d="M40 30l60 40 60-40" /><path d="M40 104h120M40 100v8M160 100v8" /></>),
  bedomning: (<><path d="M28 18h144v84H28z" /><path d="M44 38h64M44 52h96M44 66h48" /><path d="M120 60h36v30h-36z" /><path d="M28 110h144M28 106v8M172 106v8" /></>),
  start: (<><path d="M14 92h172" /><path d="M40 92h120v-10H40z" /><path d="M40 82h120v-10H40z" /><path d="M78 72V52h44v20M90 52V38h20v14" /><path d="M14 106h172M14 102v8M186 102v8" /></>),
  finish: (<><path d="M30 26h140v72H30z" /><path d="M30 62h140" /><path d="M64 26v72M100 26v72M136 26v72" /><path d="M30 110h140M30 106v8M170 106v8" /></>),
  genomgang: (<><path d="M32 20h136v76H32z" /><path d="M32 66h136" /><path d="M58 40l16 16 32-34" /><path d="M54 82h92" /><path d="M32 108h136M32 104v8M168 104v8" /></>),
};

const STEG = [
  { nr: '1', namn: 'Berätta och skicka bilder', ritning: 'kontakt', text: 'Skriv några rader om vad ni vill göra och skicka bilder. Vi lyssnar och gör en första bedömning, oavsett om det är ett fönster som ska monteras eller ett helt badrum.' },
  { nr: '2', namn: 'Kostnadsfri bedömning', ritning: 'bedomning', text: 'Vi går igenom underlaget och ger er en förutsättningslös bedömning av omfattningen. Ni får en klar bild av vad som behöver göras, i vilka steg, och vad det kostar.' },
  { nr: '3', namn: 'Start med tidplan', ritning: 'start', text: 'När ni vill gå vidare sätter vi igång med en tydlig tidplan. De flesta projekt är klara inom tio dagar, och ni får höra direkt om ert är ett som tar längre.' },
  { nr: '4', namn: 'Arbetet, med finish', ritning: 'finish', text: 'Rivning, gjutning, snickeri, plattsättning, belysning. Samma lag hela vägen, och vi håller er uppdaterade under tiden. Premium finish är inte det sista steget, det är varje steg.' },
  { nr: '5', namn: 'Genomgång', ritning: 'genomgang', text: 'Vi går igenom allt tillsammans innan vi lämnar. Vi står bakom vårt arbete med garanti, så sitter något emot tar vi det.' },
];

const STATS = [
  { tal: 45, prefix: '', etikett: 'Års samlad erfarenhet' },
  { tal: 10, prefix: '', etikett: 'Dagar, de flesta projekt' },
  { tal: 0, prefix: '', etikett: 'Kronor för bedömningen' },
  { tal: 2020, prefix: '', etikett: 'Grundat' },
];

const VARFOR = [
  'Premium finish. Fogen mot taket, listen i hörnet, ljuset i rätt vinkel.',
  'De flesta projekt klara inom tio dagar, med en tidplan ni får innan start.',
  'Familjeägt, över 45 års samlad erfarenhet, och garanti på arbetet.',
  'Räcker det med nya luckor säger vi det. Även när ett helt kök hade gett oss mer betalt.',
];

const OMDOMEN = [
  { namn: 'Exempel', text: 'Så här ser ett omdöme ut när det står här: kort, med förnamn och ort, hämtat från er Google-profil.' },
  { namn: 'Exempel', text: 'Kunden skriver vad som gjordes, om tidplanen höll och hur det såg ut när ni gick. Det är den sortens text som säljer.' },
  { namn: 'Exempel', text: 'Ni har redan omdömen i en höjdpunkt på Instagram — de hör hemma här. Ett påhittat är värre än inget, därför står det Exempel.' },
];

const FRAGOR = [
  { q: 'Vad kostar en renovering?', a: 'Det beror på omfattningen, därför börjar vi med en kostnadsfri bedömning utifrån era bilder och beskrivning. Ni får ett tydligt pris och en beskrivning av stegen innan något arbete påbörjas.' },
  { q: 'Hur lång tid tar ett projekt?', a: 'De flesta av våra projekt är klara inom tio dagar. Större renoveringar och tillbyggnader tar längre, och det säger vi direkt. Ni får alltid en tidplan vid start.' },
  { q: 'Har ni garanti på ert arbete?', a: 'Ja. Vi står bakom vårt arbete och erbjuder garanti på våra tjänster.' },
  { q: 'Vilka kunder hjälper ni?', a: 'Främst privatpersoner och bostadsrättsföreningar som vill ha hög kvalitet och personlig service, oavsett om det gäller renovering, tillbyggnad eller ombyggnad.' },
  { q: 'Gör ni bara delar av ett jobb, som snickeriet?', a: 'Ja. Ett fönster som ska monteras, en garderob som ska byggas, ett kök som ska sättas upp. Säg vad det gäller, så säger vi om det är ett jobb för oss.' },
  { q: 'Kan ni koppla in belysning och smarta hem också?', a: 'Ja: Plejd, LED-konvertering och styrning via Google Home. Bäst blir det när belysningen planeras in i renoveringen från början.' },
  { q: 'Får Harry följa med?', a: 'Vår franska bulldog Harry följer ofta med och sprider glädje hos oss och våra kunder. Säg till om ni hellre slipper, det respekterar vi.' },
  { q: 'Vilka områden arbetar ni i?', a: 'Norrort och Stockholms innerstad: Österåker, Vallentuna, Järva, Upplands Väsby, Täby, Sollentuna, Östermalm och City. Ligger jobbet någon annanstans får ni säga var, så säger vi om vi kan ta det.' },
];

const Stjarnor = () => (<span className={styles.stjarnor} role="img" aria-label="Fem stjärnor">{[0, 1, 2, 3, 4].map((i) => (<svg viewBox="0 0 24 24" aria-hidden="true" key={i}><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.5L12 17.3l-5.9 3.2 1.3-6.5L2.5 9.4l6.6-.8z" /></svg>))}</span>);
const GoogleG = ({ className }) => (<svg viewBox="0 0 48 48" className={className} aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.3l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" /><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 2.9-2.2 5.4-4.7 7.1l7.6 5.9c4.4-4.1 6.9-10.1 6.9-17z" /><path fill="#FBBC04" d="M10.5 28.6c-.5-1.5-.8-3-.8-4.6s.3-3.1.8-4.6l-7.9-6.1C.9 16.6 0 20.2 0 24s.9 7.4 2.6 10.7l7.9-6.1z" /><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.9l-7.9 6.1C6.5 42.6 14.6 48 24 48z" /></svg>);

export default function HdDemo() {
  return (
    <div className={`${display.variable} ${displayKursiv.variable} ${ui.variable} ${styles.sida}`}>
      <header className={styles.hdr}>
        <div className={styles.hdrIn}>
          <a className={styles.brand} href="#top"><span className={styles.brandTxt}><b>HD Byggservice</b><i>Norrort · Stockholm</i></span></a>
          <nav className={styles.nav}>{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}</nav>
          <a className={styles.mobilNavKnapp} href="#meny"><span>Meny</span><span className={styles.mobilNavIkon} aria-hidden="true" /></a>
          {/* Inget verifierat telefonnummer: knappen leder till formularet. */}
          <a className={styles.hdrTel} href="#kontakt" aria-label="Till kontaktformuläret">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.6" /><path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span className={styles.hdrTelNr} aria-hidden="true">Skicka bilder</span><span className={styles.hdrTelKort} aria-hidden="true">Kontakt</span>
          </a>
        </div>
      </header>

      <section className={styles.hero} id="top">
        <figure className={styles.heroFilm}>
          <video className={styles.heroLiggande} autoPlay muted loop playsInline preload="metadata" poster="/hd/media/poster-hero.jpg"><source src="/hd/media/video-hero-forvandling-badrum.mp4" type="video/mp4" /></video>
          <video className={styles.heroStaende} autoPlay muted loop playsInline preload="metadata" poster="/hd/media/poster-hero-mobil.jpg"><source src="/hd/media/video-hero-forvandling-badrum-mobil.mp4" type="video/mp4" /></video>
        </figure>
        <div className={styles.heroLager}>
          <div className={styles.heroLagerIn}>
            <h1 className={styles.heroLogo}><Image src="/hd/media/logo-hd-byggservice.png" alt="HD Byggservice AB" width={512} height={512} priority /></h1>
            <p className={styles.heroTjanster}>Renovering · Snickeri</p>
            <p className={styles.heroOrt}>Norrort, Stockholm</p>
            <div className={styles.heroCta}>
              <a className={styles.btn} href="#kontakt">Begär kostnadsfri bedömning</a>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={`mailto:${EPOST}`}>Mejla oss</a>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.tejp} role="group" aria-label="Det här gör vi">
        <div className={styles.tejpSpar}>{[false, true].map((kopia) => (<div className={styles.tejpIn} aria-hidden={kopia || undefined} key={kopia ? 'b' : 'a'}><span>Helhetsrenovering</span><span>Kök och badrum</span><span>Snickeri</span><span>Om- och tillbyggnad</span><span>Altan och uterum</span><span>Plejd och smarta hem</span><span>Premium finish</span><span>Norrort och innerstaden</span></div>))}</div>
      </div>

      <div className={styles.wrap}>
        <div className={styles.stats} role="list" aria-label="HD Byggservice i siffror">
          {STATS.map((s) => (<div className={styles.stat} role="listitem" key={s.etikett}><b>{s.prefix}<span className={styles.statTal} style={{ '--mal': s.tal }} aria-hidden="true" /><span className={styles.statStatisk}>{s.tal}</span></b><span>{s.etikett}</span></div>))}
        </div>
      </div>

      <section className={styles.sek} id="forvandling">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Förvandlingen</p><h2 className={styles.h2}>Klart på tio dagar. <em>Och det ser klart ut.</em></h2></div>
          <div className={styles.forvandling}>
            <figure><Image src="/hd/media/galleri-fore-badrum-80tal.jpg" alt="Slitet badrum från 80-talet med beige kakel, gulnad fog och sprucket spegelskåp" width={1200} height={1200} /><figcaption><b>Före</b></figcaption></figure>
            <figure><Image src="/hd/media/galleri-efter-badrum-nytt.jpg" alt="Samma badrum nyrenoverat med stora ljusa plattor, duschvägg i glas och infälld belysning" width={1200} height={1200} /><figcaption><b>Efter</b></figcaption></figure>
          </div>
          <div className={styles.galleri}>
            <figure><Image src="/hd/media/galleri-makro-fog.jpg" alt="Närbild på fogen mellan plattor och duschvägg, rak och tät" width={1200} height={1200} /><figcaption>Fogen, där premium avgörs.</figcaption></figure>
            <figure><Image src="/hd/media/galleri-gips-vatrum.jpg" alt="Våtrumsgips uppsatt och spacklat, golvbrunn gjuten i nytt spackel" width={1200} height={1200} /><figcaption>Underarbetet ingen ser.</figcaption></figure>
            <figure><Image src="/hd/media/galleri-platsbyggd-garderob.jpg" alt="Platsbyggd garderob i ekfaner monterad golv till tak" width={1200} height={1200} /><figcaption>Platsbyggt, tätt mot taket.</figcaption></figure>
            <figure><Image src="/hd/media/galleri-led-plejd.jpg" alt="Infälld LED-belysning och ljusslinga i tak, dimrad till kvällsläge" width={1200} height={1200} /><figcaption>Ljuset planerat från början.</figcaption></figure>
          </div>
          <p className={styles.forvandlingNot}>Illustrationsbilder — byts mot era egna projektfoton.</p>
        </div>
      </section>

      <section className={styles.sek} id="tjanster">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Vad vi gör</p><h2 className={styles.h2}>Hela renoveringen, <em>med ett lag</em></h2><p className={styles.sekLead}>Rivning, gjutning, snickeri, plattsättning och belysning. Samma hantverkare hela vägen, så ingen väntar på nästa firma.</p></div>
          <div className={styles.tjanster}>{TJANSTER.map((t) => (<article className={styles.tjanst} key={t.id}><svg className={styles.ritning} viewBox="0 0 200 120" aria-hidden="true">{RITNINGAR[t.ritning]}</svg><h3>{t.namn}</h3><p>{t.text}</p><ul>{t.punkter.map((p) => <li key={p}>{p}</li>)}</ul></article>))}</div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="process">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Så går det till</p><h2 className={styles.h2}>Fem steg, och det första <em>är några bilder</em></h2><p className={styles.sekLead}>Det börjar med att ni skickar bilder och berättar, och slutar med en genomgång där ni får säga om något sitter emot.</p></div>
          <div className={styles.stegBlock}>
            {STEG.map((s, i) => <input type="radio" name="steg" id={`steg-${s.nr}`} className={styles.stegRadio} defaultChecked={i === 0} key={`r-${s.nr}`} />)}
            <div className={styles.stegVal} role="tablist" aria-label="Så går det till">{STEG.map((s) => <label className={styles.stegKnapp} htmlFor={`steg-${s.nr}`} key={`l-${s.nr}`}><span>{s.namn}</span></label>)}</div>
            <div className={styles.stegKort}>{STEG.map((s) => (<article className={styles.stegPanel} key={`p-${s.nr}`}><svg className={styles.stegRitning} viewBox="0 0 200 120" aria-hidden="true">{STEGRITNINGAR[s.ritning]}</svg><div><h3>{s.namn}</h3><p>{s.text}</p></div></article>))}</div>
          </div>
        </div>
      </section>

      <section className={styles.sek} id="varfor">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Varför oss</p><h2 className={styles.h2}>Premium finish <em>är varje steg</em></h2></div>
          <div className={styles.varforModul}>
            <figure className={styles.varforFilm}><video autoPlay muted loop playsInline preload="metadata" poster="/hd/media/poster-varfor.jpg" aria-label="Plattorna sätts en efter en på den nya badrumsväggen"><source src="/hd/media/video-varfor-plattsattning.mp4" type="video/mp4" /></video></figure>
            <ul className={styles.varforPunkter}>{VARFOR.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="omdomen">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Omdömen</p><h2 className={styles.h2}>Vad kunderna säger</h2><p className={styles.googleRad}><GoogleG className={styles.googleG} /><span>Google-recensioner</span></p></div>
          <div className={styles.recensioner}>{OMDOMEN.map((o, i) => (<figure className={styles.recension} key={i}><div className={styles.recensionHuvud}><span className={styles.avatar} aria-hidden="true">E</span><figcaption><b>{o.namn}</b><span>Byts mot ett riktigt omdöme</span></figcaption><GoogleG className={styles.recensionG} /></div><Stjarnor /><blockquote>{o.text}</blockquote></figure>))}</div>
          <div className={styles.recensionerFot}><p className={styles.recensionerNot}>Exempel — byts mot era riktiga omdömen. Ni har dem redan i en höjdpunkt på Instagram.</p><a className={`${styles.btn} ${styles.btnMork}`} href="https://www.google.com/search?q=HD+Byggservice+AB+Stockholm" target="_blank" rel="noopener">Se alla recensioner</a></div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sociala}`} id="sociala">
        <div className={styles.wrap}>
          <div className={styles.socialaIkoner}>
            <a href={IG} target="_blank" rel="noopener" aria-label="HD Byggservice på Instagram"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" /><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" /></svg></a>
            <a href={FB} target="_blank" rel="noopener" aria-label="HD Byggservice på Facebook"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 8h2.5V4.5H14c-2.2 0-3.5 1.5-3.5 3.6V10H8v3.3h2.5V21h3.4v-7.7h2.6l.5-3.3h-3.1V8.5c0-.3.2-.5.6-.5z" fill="currentColor" /></svg></a>
          </div>
          <p className={styles.socialaTxt}>Följ vårt arbete i vardagen</p>
          <div className={styles.socialaRutnat}>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/hd/media/sociala-altan-belysning-dronare.jpg" alt="Drönarbild av villa med nybyggd altan och tänd belysning i skymningen" width={800} height={450} /></a></figure>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/hd/media/sociala-hannes-verktyg.jpg" alt="Hannes under arbetstältet med verktygen uppställda" width={900} height={506} /></a></figure>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/hd/media/sociala-bilarna-villaomrade.jpg" alt="HD Byggservices tre bilar på rad i ett villaområde" width={1920} height={1080} /></a></figure>
          </div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="fragor">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Vanliga frågor</p><h2 className={styles.h2}>Det ni brukar fråga först</h2><p className={styles.sekLead}>Pengar och tid först, det praktiska sedan. Gäller det just er lägenhet: skicka bilder, så svarar vi på dem.</p></div>
          <div className={styles.fragorGrid}>
            <div className={styles.fragor}>{FRAGOR.map((f) => <details className={styles.fraga} name="faq" key={f.q}><summary>{f.q}<span className={styles.fragaIkon} aria-hidden="true" /></summary><p>{f.a}</p></details>)}</div>
            <aside className={styles.fragaKort}><h3>Hittar ni inte svaret?</h3><p>Skicka bilder och några rader. Vi återkommer snabbt med en bedömning.</p><a className={`${styles.btn} ${styles.btnMork}`} href="#kontakt">Till formuläret</a></aside>
          </div>
        </div>
      </section>

      <section className={styles.kontakt} id="kontakt">
        <div className={styles.wrap}>
          <div className={styles.kontaktGrid}>
            <div>
              <p className={styles.eyebrow}>Kontakt</p>
              <h2 className={styles.h2}>Ska något göras om?<br /><em>Börja med några bilder.</em></h2>
              <p className={styles.sekLead}>Berätta om era behov och skicka bilder. Bedömningen kostar ingenting, och ni får en klar bild av vad som behöver göras innan ni bestämmer något.</p>
              <div className={styles.kontaktRader}>
                <a className={styles.kontaktRad} href={`mailto:${EPOST}`}><span>Hannes</span><b>{EPOST}</b></a>
                <a className={styles.kontaktRad} href={`mailto:${EPOST2}`}><span>Jesper</span><b>{EPOST2}</b></a>
                <a className={styles.kontaktRad} href={IG} target="_blank" rel="noopener"><span>Instagram</span><b>@hdbyggserviceab</b></a>
                <div className={styles.kontaktRad}><span>Område</span><b>Norrort och Stockholms innerstad</b></div>
              </div>
            </div>
            <form className={styles.form} action={FORM_ACTION} method="post" encType="text/plain" aria-describedby="form-not">
              <label>Namn<input type="text" name="namn" autoComplete="name" required /></label>
              <label>Telefon<input type="tel" name="telefon" autoComplete="tel" required /></label>
              <label>E-post (valfritt)<input type="email" name="epost" autoComplete="email" /></label>
              <label>Vad handlar det om?<select name="typ" defaultValue="Badrum"><option>Badrum</option><option>Kök</option><option>Hel lägenhet</option><option>Snickeri eller montering</option><option>Altan, uterum eller tillbyggnad</option><option>Belysning och smart hem</option></select></label>
              <label>Kort om projektet<textarea name="meddelande" rows={4} placeholder="Vad som ska göras, ungefär hur stort, var ni bor, och när ni vill ha det klart. Bilder kan ni bifoga i mejlet." /></label>
              <button className={styles.btn} type="submit">Begär kostnadsfri bedömning</button>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={`mailto:${EPOST}`}>Eller mejla Hannes direkt</a>
              <p className={styles.formNot} id="form-not">Skriv kort och bifoga bilder — då kan vi ge en vettig bedömning redan i första svaret. Inga massutskick, ingen säljlista.</p>
              <p className={styles.formNot}>Obs: i det här förslaget öppnar knappen ditt e-postprogram och skickar raderna till Bahko Byrå. I den skarpa sajten kopplas formuläret in och landar direkt i er egen inkorg.</p>
            </form>
          </div>
        </div>
      </section>

      <footer className={styles.ftr}>
        <div className={styles.wrap}>
          <div className={styles.ftrGrid}>
            <div><span className={styles.brandTxt}><b>HD Byggservice AB</b><i>Familjeägt, Norrort</i></span><p className={styles.ftrText}>Helhetsrenovering, snickeri, om- och tillbyggnad och smarta hem för privatpersoner och BRF i Norrort och Stockholms innerstad.</p></div>
            <div className={styles.ftrLankar}>{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}<a href={`mailto:${EPOST}`}>{EPOST}</a><a href={IG} target="_blank" rel="noopener">@hdbyggserviceab</a><a href="#top">Till toppen</a></div>
          </div>
          <div className={styles.ftrBar}><span>HD Byggservice AB · Org.nr 559245-5199</span><span>Förslag byggt av <a href="https://www.bahkobyra.se" target="_blank" rel="noopener">Bahko Byrå</a></span></div>
        </div>
      </footer>

      <div className={styles.mobilMenyLager} id="meny"><a className={styles.mobilMenySkugga} href="#stangd" tabIndex={-1} aria-hidden="true" /><nav className={styles.mobilMenyPanel} aria-label="Meny">{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}<a href="#kontakt">Kontakt</a><a className={styles.mobilMenyStang} href="#stangd">Stäng menyn</a></nav></div>
      <span className={styles.stangdAnkare} id="stangd" />
      <input type="checkbox" id="popup-bort" className={styles.popupBort} aria-hidden="true" tabIndex={-1} />
      <aside className={styles.popup} aria-label="Kontakta HD Byggservice"><label className={styles.popupX} htmlFor="popup-bort" role="button" aria-label="Stäng" tabIndex={0}>✕</label><p className={styles.popupEyebrow}>Badrummet på tio dagar?</p><p className={styles.popupTxt}>Skicka några bilder, så säger vi vad som behöver göras och hur lång tid det tar. Bedömningen kostar ingenting.</p><a className={`${styles.btn} ${styles.popupCta}`} href="#kontakt">Skicka bilder</a><a className={styles.popupAlt} href={`mailto:${EPOST}`}>Eller mejla direkt →</a></aside>
      <a className={styles.demoKnapp} href="#bahko-demo">Om det här förslaget</a>
      <div className={styles.modalLager} id="bahko-demo"><a className={styles.modalSkugga} href="#stangd" tabIndex={-1} aria-hidden="true" /><section className={styles.modal} aria-labelledby="bahko-rubrik"><a className={styles.modalX} href="#stangd" aria-label="Stäng">✕</a><span className={styles.modalBadge}>Förslag av Bahko Byrå</span><h3 id="bahko-rubrik">Så här kan HD Byggservice se ut på nätet</h3><p>Det här är ett kostnadsfritt förslag, byggt på det ni själva visar på hdbyggservice.se och Instagram. Ingen beställning, inget åtagande. Vill ni se den skarpt med era egna projektfoton, era riktiga omdömen och ett formulär som landar i inkorgen? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.</p><a className={styles.modalCta} href="https://cal.eu/bahkobyra/15min" target="_blank" rel="noopener">Boka 15 min gratis samtal →</a><a className={styles.modalAlt} href="mailto:mathias@bahkobyra.se?subject=HD%20Byggservice%20-%20f%C3%B6rslag%20p%C3%A5%20hemsida">Eller mejla → mathias@bahkobyra.se</a><span className={styles.modalFot}>Bahko Byrå · Synlighet som säljer.</span></section></div>
    </div>
  );
}
