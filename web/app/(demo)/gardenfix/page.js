import Image from 'next/image';
import { Archivo, Inter } from 'next/font/google';
import styles from './gardenfix.module.css';

/* ===========================================================================
   GARDEN FIX STOCKHOLM — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: instagram.com/gardenfixstockholm · Stockholm · ingen hemsida.
   VARM: Mathias erbjöd prototyp inom 48 h i DM, de svarade "Är det
   kostnadsfritt?" → "Japp" (2026-09-14).
   Byggd på golvvision-kanon (via rskompakt/swedcro) med hero som
   före/efter-effekt.

   Bärande idé: deras egen bio lovar "en vacker och välskött trädgård" — två
   ord som inte är samma sak. Vacker är en helg med klippt gräs. Välskött är
   någon som kommer tillbaka innan det hinner växa igen. Hela sidan säljer
   den skillnaden, alltså återkommande skötsel och inte engångsstädning.

   VERIFIERAT (IG-profil + bio + logotyp, skärmdump från Mathias 2026-09-14):
   Kontonamn "Garden Fix Stockholm" (@gardenfixstockholm) · logotypen bär
   "GardenFix" över "STOCKHOLM" · bio ordagrant: "Vi hjälper dig att få en
   vacker och välskött trädgård", "Stockholm", "Gratis offert" ·
   e-post gardenfixstockholm@gmail.com (bion) · 16 inlägg, 271 följare ·
   en Facebook-sida med samma namn är länkad från bion · flödet visar deras
   eget arbete: klippt gräsmatta vid en berghäll, rund stensättning kring en
   eldplats, grusuppfart, planteringslåda med buske.

   INTE verifierat, och finns därför inte på sidan: telefonnummer (inget
   publicerat — Ring-knapparna är ersatta med mejl och formulär, aldrig ett
   gissat nummer), org.nr (ingen träff i registret på namnet), Facebook-URL
   (sidan syns i bion men adressen går inte att läsa — ingen FB-ikon),
   Google-betyg, priser, ledtider, antal kunder, hur länge de funnits.
   Siffrorna i statsraden är ERBJUDANDEN i mallens form, inte historik.

   FLAGGOR: formuläret går till mathias@bahkobyra.se; omdömen i exempelläge;
   ordmärke i stället för logotyp (profilbilden är 100 px); alla bilder är
   illustrationer, märkt en gång.

   OBS intressekonflikt: Bromma Trädgårdsservice är kund hos Bahko i samma
   nisch och samma stad. Mathias känner till leadet och bad om demon.
   =========================================================================== */

const display = Archivo({ subsets: ['latin'], weight: ['400', '600'], display: 'swap', variable: '--gf-display' });
const displayKursiv = Archivo({ subsets: ['latin'], weight: ['400', '600'], style: ['italic'], display: 'swap', preload: false, variable: '--gf-display-kursiv' });
const ui = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap', variable: '--gf-ui' });

export const metadata = {
  title: 'Garden Fix Stockholm — trädgårdsskötsel och anläggning',
  description:
    'Gräsklippning, häckklippning, beskärning, ogräs och stensättning i Stockholm. Vi håller trädgården skött hela säsongen. Gratis offert. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

const EPOST = 'gardenfixstockholm@gmail.com';
const IG = 'https://www.instagram.com/gardenfixstockholm/';
const FORM_ACTION = 'mailto:mathias@bahkobyra.se?subject=Garden%20Fix%20-%20offertf%C3%B6rfr%C3%A5gan';

const LANKAR = [
  { href: '#tjanster', txt: 'Vad vi gör' },
  { href: '#process', txt: 'Så går det till' },
  { href: '#varfor', txt: 'Varför oss' },
  { href: '#fragor', txt: 'Vanliga frågor' },
];

const RITNINGAR = {
  gras: (<><path d="M20 100h160" /><path d="M36 100c0-18 6-30 14-38M52 100c0-22 8-36 18-46M72 100c0-18 6-30 14-38M92 100c0-22 8-36 18-46M112 100c0-18 6-30 14-38M132 100c0-22 8-36 18-46M152 100c0-18 6-30 14-38" /></>),
  hack: (<><path d="M24 96h152" /><path d="M40 96V44h120v52" /><path d="M40 44h120" /><path d="M60 44v52M80 44v52M100 44v52M120 44v52M140 44v52" /><path d="M30 32h140" /></>),
  sten: (<><path d="M20 98h160" /><path d="M32 98V70h40v28zM76 98V70h44v28zM124 98V70h44v28z" /><path d="M44 70V46h44v24zM92 70V46h44v24z" /><path d="M56 46V28h60v18" /></>),
  plantering: (<><path d="M30 96h140l-10-34H40z" /><path d="M100 62V36" /><path d="M100 44c-12-6-18-16-16-24 10 0 18 8 16 24zM100 44c12-6 18-16 16-24-10 0-18 8-16 24z" /><path d="M30 106h140" /></>),
};

const TJANSTER = [
  { id: 'gras', ritning: 'gras', namn: 'Gräsklippning', text: 'Regelbunden klippning genom hela säsongen, kantskuret mot rabatter och gångar. Vi tar med klippet, det ligger inte kvar i högar.', punkter: ['Klippning varannan vecka', 'Kantskärning', 'Vi tar hand om klippet'] },
  { id: 'hack', ritning: 'hack', namn: 'Häck och beskärning', text: 'Häcken klippt rak i topp och sidor, buskar och mindre träd beskurna vid rätt tid på året. Det som beskärs fel växer igen dubbelt.', punkter: ['Häckklippning', 'Beskärning av buskar', 'Bortforsling av ris'] },
  { id: 'sten', ritning: 'sten', namn: 'Sten och anläggning', text: 'Stensättning, plattor och grusgångar som ligger rätt: dränerat underlag, jämn fall och kanter som håller sig kvar när tjälen släpper.', punkter: ['Plattsättning', 'Stensättning och murar', 'Grusgångar och uppfarter'] },
  { id: 'plantering', ritning: 'plantering', namn: 'Rabatt och plantering', text: 'Ogräsrensning, ny jord och bark, plantering av växter som trivs på just din plats. En rabatt som inte är full av tistlar i juli.', punkter: ['Ogräsrensning', 'Plantering', 'Barkning och jordförbättring'] },
];

const STEGRITNINGAR = {
  hor: (<><path d="M40 30h120v60H40z" /><path d="M40 30l60 40 60-40" /><path d="M40 104h120M40 100v8M160 100v8" /></>),
  besok: (<><path d="M20 96h160" /><path d="M36 96c0-18 6-30 14-38M56 96c0-22 8-36 18-46M76 96c0-18 6-30 14-38" /><path d="M120 96V56h44v40z" /><path d="M120 56l22-14 22 14" /></>),
  offert: (<><path d="M28 18h144v84H28z" /><path d="M44 38h64M44 52h96M44 66h48" /><path d="M120 60h36v30h-36z" /><path d="M28 110h144M28 106v8M172 106v8" /></>),
  skotsel: (<><path d="M20 100h160" /><path d="M20 100c0-14 4-24 12-30M44 100c0-14 4-24 12-30M68 100c0-14 4-24 12-30" /><path d="M104 100V74h60v26z" /><path d="M104 74h60" /><path d="M120 74v26M140 74v26" /></>),
  saknad: (<><path d="M32 20h136v76H32z" /><path d="M32 66h136" /><path d="M58 40l16 16 32-34" /><path d="M54 82h92" /><path d="M32 108h136M32 104v8M168 104v8" /></>),
};

const STEG = [
  { nr: '1', namn: 'Hör av dig', ritning: 'hor', text: 'Skriv några rader om trädgården, eller skicka bilder. Du behöver inte veta vad växterna heter.' },
  { nr: '2', namn: 'Vi tittar på plats', ritning: 'besok', text: 'Vi kommer ut och ser vad som behöver göras nu och vad som kan vänta till nästa säsong. Det kostar ingenting.' },
  { nr: '3', namn: 'Gratis offert', ritning: 'offert', text: 'Du får ett pris på engångsjobbet, eller på löpande skötsel om du hellre vill slippa tänka på det.' },
  { nr: '4', namn: 'Vi håller efter', ritning: 'skotsel', text: 'Vi kommer på överenskomna tider hela säsongen. Gräset klipps innan det hinner bli högt, häcken innan den blir vild.' },
  { nr: '5', namn: 'Du ser skillnaden', ritning: 'saknad', text: 'Det bästa betyget är att du slutar tänka på trädgården. Den är bara fin, varje gång du tittar ut.' },
];

/* Löftesbaserad statsrad — ingen historik finns verifierad. "Gratis offert"
   är deras egen formulering i bion; resten är erbjudanden i mallens form. */
const STATS = [
  { tal: 0, prefix: '', etikett: 'Kronor för offerten' },
  { tal: 4, prefix: '', etikett: 'Säsonger vi håller efter' },
  { tal: 1, prefix: '', etikett: 'Kontaktperson hela vägen' },
  { tal: 0, prefix: '', etikett: 'Bindningstid på skötseln' },
];

const VARFOR = [
  'Vi kommer tillbaka. Gräset klipps innan det blir högt, inte efteråt.',
  'Samma personer varje gång, som lär sig din trädgård.',
  'Vi tar med klippet och riset. Inga säckar kvar på uppfarten.',
  'Behöver häcken bara klippas säger vi det. Även när en ny plantering hade gett oss mer betalt.',
];

/* Inga riktiga omdömen hittade — exempelläge, märkt. */
const OMDOMEN = [
  { namn: 'Exempel', ort: 'Villaägare, Stockholm', text: 'Exempel: här står ett riktigt omdöme från en kund, med namn och ort som de själva skrivit det.' },
  { namn: 'Exempel', ort: 'Bostadsrättsförening', text: 'Exempel: ett andra kort, hämtat ur er Google-profil när den är på plats.' },
  { namn: 'Exempel', ort: 'Radhus, Stockholm', text: 'Exempel: ett tredje kort. Tre riktiga omdömen räcker för att sidan ska kännas sann.' },
];

const FRAGOR = [
  { q: 'Vad kostar det?', a: 'Det beror på tomtens storlek och hur mycket som behöver göras. Offerten kostar ingenting, och du får priset innan vi börjar.' },
  { q: 'Måste jag binda upp mig?', a: 'Nej. Vi gör gärna ett engångsjobb. Vill du ha löpande skötsel sätter vi upp ett upplägg som du kan avsluta när du vill.' },
  { q: 'Hur ofta klipper ni gräset?', a: 'Varannan vecka under säsongen passar de flesta trädgårdar. Växer det snabbt hos dig kommer vi oftare, det säger vi när vi sett tomten.' },
  { q: 'Tar ni hand om avfallet?', a: 'Ja. Klipp, ris och ogräs åker med oss. Du ska inte stå med fulla säckar på uppfarten.' },
  { q: 'När ska häcken klippas?', a: 'De flesta häckar mår bäst av en klippning i slutet av juni och en i augusti. Vi håller reda på tiderna åt dig.' },
  { q: 'Gör ni stenläggning också?', a: 'Ja. Plattor, stensättning, murar och grusgångar, med dränerat underlag så att det ligger kvar även efter tjällossningen.' },
  { q: 'Kan jag använda RUT eller ROT?', a: 'Trädgårdsskötsel ger ofta rätt till RUT, och anläggningsarbete kan ge ROT. Vi säger vad som gäller ditt jobb när vi sett det.' },
  { q: 'Var arbetar ni?', a: 'Stockholm med omnejd. Ligger tomten längre bort får du säga var, så säger vi om vi kan ta den.' },
];

const Stjarnor = ({ tom }) => (<span className={`${styles.stjarnor}${tom ? ` ${styles.stjarnorTomma}` : ''}`} role="img" aria-label={tom ? 'Stjärnor, exempel' : 'Fem stjärnor'}>{[0, 1, 2, 3, 4].map((i) => (<svg viewBox="0 0 24 24" aria-hidden="true" key={i}><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.5L12 17.3l-5.9 3.2 1.3-6.5L2.5 9.4l6.6-.8z" /></svg>))}</span>);

export default function GardenFixDemo() {
  return (
    <div className={`${display.variable} ${displayKursiv.variable} ${ui.variable} ${styles.sida}`}>
      <header className={styles.hdr}>
        <div className={styles.hdrIn}>
          <a className={styles.brand} href="#top"><span className={styles.brandTxt}><b>Garden Fix</b><i>Stockholm</i></span></a>
          <nav className={styles.nav}>{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}</nav>
          <a className={styles.mobilNavKnapp} href="#meny"><span>Meny</span><span className={styles.mobilNavIkon} aria-hidden="true" /></a>
          <a className={styles.hdrTel} href="#kontakt" aria-label="Få gratis offert"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg><span className={styles.hdrTelNr} aria-hidden="true">Gratis offert</span><span className={styles.hdrTelKort} aria-hidden="true">Offert</span></a>
        </div>
      </header>

      <section className={styles.hero} id="top">
        <figure className={styles.heroFilm}>
          <video className={styles.heroLiggande} autoPlay muted loop playsInline preload="metadata" poster="/gardenfix/media/poster-hero.jpg"><source src="/gardenfix/media/video-hero-fore-efter-tradgard.mp4" type="video/mp4" /></video>
          <video className={styles.heroStaende} autoPlay muted loop playsInline preload="metadata" poster="/gardenfix/media/poster-hero-mobil.jpg"><source src="/gardenfix/media/video-hero-fore-efter-tradgard-mobil.mp4" type="video/mp4" /></video>
        </figure>
        <div className={styles.heroLager}>
          <div className={styles.heroLagerIn}>
            <h1 className={styles.heroOrdmarke}>Garden Fix Stockholm</h1>
            <p className={styles.heroTjanster}>Trädgårdsskötsel · Anläggning</p>
            <p className={styles.heroOrt}>Stockholm</p>
            <div className={styles.heroCta}>
              <a className={styles.btn} href="#kontakt">Få gratis offert</a>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={`mailto:${EPOST}`}>Mejla oss</a>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.tejp} role="group" aria-label="Det här gör vi">
        <div className={styles.tejpSpar}>{[false, true].map((kopia) => (<div className={styles.tejpIn} aria-hidden={kopia || undefined} key={kopia ? 'b' : 'a'}><span>Gräsklippning</span><span>Häckklippning</span><span>Beskärning</span><span>Ogräsrensning</span><span>Plattsättning</span><span>Stensättning</span><span>Grusgångar</span><span>Stockholm med omnejd</span></div>))}</div>
      </div>

      <div className={styles.wrap}>
        <div className={styles.stats} role="list" aria-label="Garden Fix i siffror">
          {STATS.map((s) => (<div className={styles.stat} role="listitem" key={s.etikett}><b>{s.prefix}<span className={styles.statTal} style={{ '--mal': s.tal }} aria-hidden="true" /><span className={styles.statStatisk}>{s.tal}</span></b><span>{s.etikett}</span></div>))}
        </div>
      </div>

      <section className={styles.sek} id="forvandling">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Förvandlingen</p><h2 className={styles.h2}>Vacker tar en helg. <em>Välskött tar en säsong.</em></h2><p className={styles.sekLead}>Vem som helst kan klippa gräset en gång. Skillnaden syns i juli, när det som blev gjort i maj fortfarande ser gjort ut.</p></div>
          <div className={styles.forvandling}>
            <figure><Image src="/gardenfix/media/galleri-fore-overvuxen.jpg" alt="Övervuxen trädgård med högt gräs, ogräs i stengången och vildvuxna buskar" width={1200} height={1200} /><figcaption><b>Före</b></figcaption></figure>
            <figure><Image src="/gardenfix/media/galleri-efter-skott.jpg" alt="Samma trädgård med klippt gräsmatta, rensad stengång och beskurna buskar" width={1200} height={1200} /><figcaption><b>Efter</b></figcaption></figure>
          </div>
          <div className={styles.galleri}>
            <figure><Image src="/gardenfix/media/galleri-makro-kant.jpg" alt="Närbild på den skurna kanten där klippt gräs möter den rensade stengången" width={1200} height={1200} /><figcaption>Kanten som visar handen.</figcaption></figure>
            <figure><Image src="/gardenfix/media/galleri-stensattning.jpg" alt="Rund stensättning i granit kring en eldplats, omgiven av klippt gräs" width={1200} height={1200} /><figcaption>Stensättning som ligger kvar.</figcaption></figure>
            <figure><Image src="/gardenfix/media/galleri-grusgang.jpg" alt="Nykrattad grusuppfart med skarp kant mot gräsmattan" width={1200} height={1200} /><figcaption>Grusgången, krattad och kantad.</figcaption></figure>
            <figure><Image src="/gardenfix/media/galleri-rabatt.jpg" alt="Rabatt med mörk bark, nyplanterade växter och skuren kant mot gräset" width={1200} height={1200} /><figcaption>Rabatten: bark, kant och nya växter.</figcaption></figure>
          </div>
          <p className={styles.forvandlingNot}>Illustrationsbilder — byts mot era egna projektfoton.</p>
        </div>
      </section>

      <section className={styles.sek} id="tjanster">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Vad vi gör</p><h2 className={styles.h2}>Vi hjälper dig till en <em>välskött trädgård</em></h2><p className={styles.sekLead}>Gräs, häck, rabatter och sten. Allt som gör att tomten ser omhändertagen ut, gjort av samma firma så att ingenting faller mellan stolarna.</p></div>
          <div className={styles.tjanster}>{TJANSTER.map((t) => (<article className={styles.tjanst} key={t.id}><svg className={styles.ritning} viewBox="0 0 200 120" aria-hidden="true">{RITNINGAR[t.ritning]}</svg><h3>{t.namn}</h3><p>{t.text}</p><ul>{t.punkter.map((p) => <li key={p}>{p}</li>)}</ul></article>))}</div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="process">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Så går det till</p><h2 className={styles.h2}>Fem steg, och offerten är gratis <em>i det tredje</em></h2><p className={styles.sekLead}>Du ska inte behöva hålla reda på när häcken ska klippas. Det är vårt jobb.</p></div>
          <div className={styles.stegBlock}>
            {STEG.map((s, i) => <input type="radio" name="steg" id={`steg-${s.nr}`} className={styles.stegRadio} defaultChecked={i === 0} key={`r-${s.nr}`} />)}
            <div className={styles.stegVal} role="tablist" aria-label="Så går det till">{STEG.map((s) => <label className={styles.stegKnapp} htmlFor={`steg-${s.nr}`} key={`l-${s.nr}`}><span>{s.namn}</span></label>)}</div>
            <div className={styles.stegKort}>{STEG.map((s) => (<article className={styles.stegPanel} key={`p-${s.nr}`}><svg className={styles.stegRitning} viewBox="0 0 200 120" aria-hidden="true">{STEGRITNINGAR[s.ritning]}</svg><div><h3>{s.namn}</h3><p>{s.text}</p></div></article>))}</div>
          </div>
        </div>
      </section>

      <section className={styles.sek} id="varfor">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Varför oss</p><h2 className={styles.h2}>Den som <em>kommer tillbaka</em></h2></div>
          <div className={styles.varforModul}>
            <figure className={styles.varforFilm}><video autoPlay muted loop playsInline preload="metadata" poster="/gardenfix/media/poster-varfor.jpg" aria-label="Långsam åkning längs den nyklippta häcken mot huset"><source src="/gardenfix/media/video-varfor-hacken.mp4" type="video/mp4" /></video></figure>
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
          <div className={styles.recensionerFot}><p className={styles.recensionerNot}>Exempel — byts mot era riktiga omdömen. Inget betyg påstås förrän det finns.</p><a className={`${styles.btn} ${styles.btnMork}`} href="https://www.google.com/maps/search/Garden+Fix+Stockholm" target="_blank" rel="noopener">Se alla recensioner</a></div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sociala}`} id="sociala">
        <div className={styles.wrap}>
          <div className={styles.socialaIkoner}>
            <a href={IG} target="_blank" rel="noopener" aria-label="Garden Fix på Instagram"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" /><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" /></svg></a>
          </div>
          <p className={styles.socialaTxt}>Följ vårt arbete i vardagen</p>
          <div className={styles.socialaRutnat}>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/gardenfix/media/sociala-verktyg.jpg" alt="Kratta, spade och häcksax mot ett staket bredvid en fylld trädgårdssäck" width={1200} height={1200} /></a></figure>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/gardenfix/media/sociala-halvklippt.jpg" alt="Gräsklippare på en halvklippt gräsmatta med skarp linje mellan högt och klippt gräs" width={1200} height={1200} /></a></figure>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/gardenfix/media/sociala-tradgardssackar.jpg" alt="Fyllda trädgårdssäckar med ris och ogräs vid en grusuppfart" width={1200} height={1200} /></a></figure>
          </div>
          <p className={styles.forvandlingNot}>Illustrationsbilder — byts mot era egna.</p>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="fragor">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Vanliga frågor</p><h2 className={styles.h2}>Det ni brukar fråga först</h2><p className={styles.sekLead}>Pris och bindningstid först, det praktiska sedan. Gäller det just din tomt är ett mejl snabbare än en sida.</p></div>
          <div className={styles.fragorGrid}>
            <div className={styles.fragor}>{FRAGOR.map((f) => <details className={styles.fraga} name="faq" key={f.q}><summary>{f.q}<span className={styles.fragaIkon} aria-hidden="true" /></summary><p>{f.a}</p></details>)}</div>
            <aside className={styles.fragaKort}><h3>Hittar du inte svaret?</h3><p>Skriv några rader så svarar vi på vad som gäller just din trädgård.</p><a className={`${styles.btn} ${styles.btnMork}`} href={`mailto:${EPOST}`}>Mejla oss</a></aside>
          </div>
        </div>
      </section>

      <section className={styles.kontakt} id="kontakt">
        <div className={styles.wrap}>
          <div className={styles.kontaktGrid}>
            <div>
              <p className={styles.eyebrow}>Kontakt</p>
              <h2 className={styles.h2}>Hur ser trädgården ut<br /><em>i juli?</em></h2>
              <p className={styles.sekLead}>Skriv några rader om tomten, eller skicka bilder. Vi tittar på plats och du får en offert utan kostnad.</p>
              <div className={styles.kontaktRader}>
                <a className={styles.kontaktRad} href={`mailto:${EPOST}`}><span>E-post</span><b>{EPOST}</b></a>
                <div className={styles.kontaktRad}><span>Område</span><b>Stockholm med omnejd</b></div>
                <a className={styles.kontaktRad} href={IG} target="_blank" rel="noopener"><span>Instagram</span><b>@gardenfixstockholm</b></a>
              </div>
            </div>
            <form className={styles.form} action={FORM_ACTION} method="post" encType="text/plain" aria-describedby="form-not">
              <label>Namn<input type="text" name="namn" autoComplete="name" required /></label>
              <label>E-post<input type="email" name="epost" autoComplete="email" required /></label>
              <label>Telefon (valfritt)<input type="tel" name="telefon" autoComplete="tel" /></label>
              <label>Vad gäller det?<select name="typ" defaultValue="Löpande skötsel"><option>Löpande skötsel</option><option>Gräsklippning</option><option>Häck och beskärning</option><option>Sten och anläggning</option><option>Rabatt och plantering</option><option>Något annat</option></select></label>
              <label>Kort om trädgården<textarea name="meddelande" rows={4} placeholder="Ungefär hur stor tomt, vad som behöver göras, var du bor och när du vill komma igång" /></label>
              <button className={styles.btn} type="submit">Få gratis offert</button>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={`mailto:${EPOST}`}>Eller mejla direkt</a>
              <p className={styles.formNot} id="form-not">Skriv kort om trädgården — då kan vi ge ett vettigt svar redan i första mejlet. Inga massutskick, ingen säljlista.</p>
              <p className={styles.formNot}>Obs: i det här förslaget öppnar knappen ditt e-postprogram och skickar raderna till Bahko Byrå. I den skarpa sajten kopplas formuläret in och landar direkt i er egen inkorg.</p>
            </form>
          </div>
        </div>
      </section>

      <footer className={styles.ftr}>
        <div className={styles.wrap}>
          <div className={styles.ftrGrid}>
            <div><span className={styles.brandTxt}><b>Garden Fix Stockholm</b><i>Trädgårdsskötsel</i></span><p className={styles.ftrText}>Vi hjälper dig att få en vacker och välskött trädgård. Gräs, häck, rabatter, sten och grus i Stockholm med omnejd.</p></div>
            <div className={styles.ftrLankar}>{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}<a href={`mailto:${EPOST}`}>{EPOST}</a><a href={IG} target="_blank" rel="noopener">@gardenfixstockholm</a><a href="#top">Till toppen</a></div>
          </div>
          <div className={styles.ftrBar}><span>Garden Fix Stockholm · Stockholm med omnejd</span><span>Förslag byggt av <a href="https://www.bahkobyra.se" target="_blank" rel="noopener">Bahko Byrå</a></span></div>
        </div>
      </footer>

      <div className={styles.mobilMenyLager} id="meny"><a className={styles.mobilMenySkugga} href="#stangd" tabIndex={-1} aria-hidden="true" /><nav className={styles.mobilMenyPanel} aria-label="Meny">{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}<a href="#kontakt">Kontakt</a><a className={styles.mobilMenyStang} href="#stangd">Stäng menyn</a></nav></div>
      <span className={styles.stangdAnkare} id="stangd" />
      <input type="checkbox" id="popup-bort" className={styles.popupBort} aria-hidden="true" tabIndex={-1} />
      <aside className={styles.popup} aria-label="Kontakta Garden Fix"><label className={styles.popupX} htmlFor="popup-bort" role="button" aria-label="Stäng" tabIndex={0}>✕</label><p className={styles.popupEyebrow}>Hinner gräset före dig?</p><p className={styles.popupTxt}>Vi tittar på tomten och ger dig ett pris utan kostnad. Sedan slipper du tänka på det resten av säsongen.</p><a className={`${styles.btn} ${styles.popupCta}`} href="#kontakt">Få gratis offert</a><a className={styles.popupAlt} href={`mailto:${EPOST}`}>Eller mejla oss →</a></aside>
      <a className={styles.demoKnapp} href="#bahko-demo">Om det här förslaget</a>
      <div className={styles.modalLager} id="bahko-demo"><a className={styles.modalSkugga} href="#stangd" tabIndex={-1} aria-hidden="true" /><section className={styles.modal} aria-labelledby="bahko-rubrik"><a className={styles.modalX} href="#stangd" aria-label="Stäng">✕</a><span className={styles.modalBadge}>Förslag av Bahko Byrå</span><h3 id="bahko-rubrik">Så här kan Garden Fix se ut på nätet</h3><p>Det här är ett kostnadsfritt förslag, byggt på det ni själva visar på Instagram. Ingen beställning, inget åtagande. Vill ni se den skarpt med era egna projektfoton, er logotyp och ett formulär som landar i inkorgen? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.</p><a className={styles.modalCta} href="https://cal.eu/bahkobyra/15min" target="_blank" rel="noopener">Boka 15 min gratis samtal →</a><a className={styles.modalAlt} href="mailto:mathias@bahkobyra.se?subject=Garden%20Fix%20-%20f%C3%B6rslag%20p%C3%A5%20hemsida">Eller mejla → mathias@bahkobyra.se</a><span className={styles.modalFot}>Bahko Byrå · Synlighet som säljer.</span></section></div>
    </div>
  );
}
