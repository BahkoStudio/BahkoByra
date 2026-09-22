import Image from 'next/image';
import { Archivo, Inter } from 'next/font/google';
import styles from './romerike.module.css';

/* ===========================================================================
   ROMERIKE SERVICE & UTLEIE AS — gratis nettsideforslag fra Bahko Byrå
   Lead: instagram.com/romerike.service.utleie · Kløfta, Romerike (Norge).
   SPRÅK: norsk bokmål (Mathias 2026-09-07). Bygget på golvvision-kanon med
   hero som før/etter-effekt (start- og sluttbilde fra kjeden A → B).

   Bærende idé: de tilbyr både arbeidet og maskinen. Instagram-bioen sier
   "utleie og entreprenørtjenester" — du kan leie minigraveren selv, eller la
   dem gjøre jobben. Samme firma, samme telefon.

   VERIFISERT (Brønnøysundregistrene + Instagram, 2026-09-07):
   Firmanavn "ROMERIKE SERVICE & UTLEIE AS" · org.nr 937 745 265 · stiftet
   2026-05-20 · forretningsadresse Bogstadvegen 36, 2040 Kløfta ·
   næringskode "Utleie og leasing av bygge- og anleggsmaskiner og -utstyr" ·
   Instagram (verifisert konto): "Vi tilbyr pålitelig utleie og
   entreprenørtjenester på Romerike med fokus på kvalitet, fleksibilitet og
   profesjonell…", 14 innlegg, 716 følgere, adresse "Bogstadvegen, Kløfta
   2040" · innleggene viser minigraver på tilhenger, belegningsstein,
   terrasse, dørmontering, trelast, firmakort.

   IKKE verifisert, og derfor ikke på siden: telefon, e-post (nettsiden
   romerikeserviceutleie.no er NEDE — Webador "Nettside utilgjengelig"),
   priser, maskinpark, antall ansatte, omtaler (ingen funnet), åpningstider.
   Logo: Instagram-profilbildet (grønn/svart R) kan ikke lastes ned — siden
   bærer et ordmerke. Be om logofilen.

   PLASSHOLDERE som må byttes før utsending:
   - Telefon 400 00 000 er oppdiktet (norsk format). Skjemaet går til
     mathias@bahkobyra.se.
   - Omtalemodulen er i eksempelmodus (merket Eksempel).
   - Galleriet og to av tre sosiale-bilder er illustrasjoner, merket én gang.
   SALGSARGUMENT: nettsiden deres er nede. Et tre måneder gammelt AS med
   verifisert Instagram og 716 følgere, og ingen fungerende nettside.
   =========================================================================== */

const display = Archivo({ subsets: ['latin'], weight: ['400', '600'], display: 'swap', variable: '--ro-display' });
const displayKursiv = Archivo({ subsets: ['latin'], weight: ['400', '600'], style: ['italic'], display: 'swap', preload: false, variable: '--ro-display-kursiv' });
const ui = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap', variable: '--ro-ui' });

export const metadata = {
  title: 'Romerike Service & Utleie AS — grunnarbeid, belegningsstein og maskinutleie på Romerike',
  description:
    'Entreprenørtjenester og utleie av minigraver og utstyr på Romerike. Lei maskinen selv, eller la oss gjøre jobben. Kløfta. Nettsideforslag fra Bahko Byrå.',
  robots: { index: false, follow: false },
};

/* Oppdiktet nummer i norsk format — se plassholderlisten øverst. */
const TEL = '400 00 000';
const TEL_HREF = 'tel:+4740000000';
const ADRESSE = 'Bogstadvegen 36, 2040 Kløfta';
const IG = 'https://www.instagram.com/romerike.service.utleie/';
const FORM_ACTION = 'mailto:mathias@bahkobyra.se?subject=Romerike%20Service%20%26%20Utleie%20-%20foresp%C3%B8rsel';

const LANKAR = [
  { href: '#tjenester', txt: 'Det vi gjør' },
  { href: '#prosess', txt: 'Slik går det' },
  { href: '#hvorfor', txt: 'Hvorfor oss' },
  { href: '#sporsmal', txt: 'Vanlige spørsmål' },
];

const RITNINGAR = {
  graving: (<><path d="M10 84h180" /><path d="M64 84l14 22h44l14-22" /><path d="M78 20h44l-7 26H85z" /><path d="M87 46l3 7M100 46v7M113 46l-3 7" /><path d="M10 112h180M10 108v8M190 108v8" /></>),
  stein: (<><path d="M22 40h156v60H22z" /><path d="M22 60h156M22 80h156" /><path d="M61 40v20M100 40v20M139 40v20M42 60v20M81 60v20M120 60v20M159 60v20M61 80v20M100 80v20M139 80v20" /><path d="M22 112h156M22 108v8M178 108v8" /></>),
  utleie: (<><path d="M12 88h176" /><path d="M40 70h70l8-12h26v20H40z" /><path d="M56 70V54h32v16" /><path d="M52 80a6 6 0 1 0 12 0a6 6 0 1 0-12 0M128 80a6 6 0 1 0 12 0a6 6 0 1 0-12 0" /><path d="M12 104h176M12 100v8M188 100v8" /></>),
  terrasse: (<><path d="M20 78h160" /><path d="M36 78v-8h128v8" /><path d="M36 70v-22M164 70v-22M36 48h128" /><path d="M52 62h96" /><path d="M20 96h160M20 92v8M180 92v8" /></>),
};

const TJANSTER = [
  { id: 'graving', ritning: 'graving', namn: 'Graving og grunnarbeid', text: 'Tomt, drenering, grøfter og planering med minigraver. Vi graver der det er trangt, og vi gjør grunnen klar før det som skal stå på den.', punkter: ['Tomtegraving og planering', 'Drenering og grøfter', 'Masseflytting'] },
  { id: 'stein', ritning: 'stein', namn: 'Belegningsstein og kantstein', text: 'Innkjørsel, gårdsplass og gangvei. Riktig underlag, riktig fall og kantstein som holder steinen på plass i mange vintre.', punkter: ['Innkjørsel og gårdsplass', 'Kantstein og trapper', 'Underlag og fall'] },
  { id: 'utleie', ritning: 'utleie', namn: 'Utleie av minigraver og utstyr', text: 'Vil du gjøre jobben selv? Lei minigraver og tilhenger av oss. Vi leverer, viser deg hvordan den brukes, og henter når du er ferdig.', punkter: ['Minigraver med tilhenger', 'Levering og henting', 'Fleksibel leietid'] },
  { id: 'terrasse', ritning: 'terrasse', namn: 'Terrasse og småsnekring', text: 'Terrasse, platting og montering. Fra fundament til siste skrue, tilpasset huset og tomten.', punkter: ['Terrasse og platting', 'Dørmontering', 'Utebod og gjerde'] },
];

const STEGRITNINGAR = {
  kontakt: (<><path d="M40 30h120v60H40z" /><path d="M40 30l60 40 60-40" /><path d="M40 104h120M40 100v8M160 100v8" /></>),
  befaring: (<><path d="M14 74h172v22H14z" /><path d="M32 74v10M50 74v14M68 74v10M86 74v14M104 74v10M122 74v14M140 74v10M158 74v14" /><path d="M14 56h172M14 50v12M186 50v12" /><path d="M60 30h80" /></>),
  tilbud: (<><path d="M28 18h144v84H28z" /><path d="M44 38h64M44 52h96M44 66h48" /><path d="M120 60h36v30h-36z" /><path d="M28 110h144M28 106v8M172 106v8" /></>),
  arbeid: (<><path d="M14 92h172" /><path d="M40 92h120v-10H40z" /><path d="M40 82h120v-10H40z" /><path d="M78 72V52h44v20M90 52V38h20v14" /><path d="M14 106h172M14 102v8M186 102v8" /></>),
  overlevering: (<><path d="M32 20h136v76H32z" /><path d="M32 66h136" /><path d="M58 40l16 16 32-34" /><path d="M54 82h92" /><path d="M32 108h136M32 104v8M168 104v8" /></>),
};

const STEG = [
  { nr: '1', namn: 'Ring eller skriv', ritning: 'kontakt', text: 'Fortell hva du vil gjøre, eller hva du vil leie. Ofte kan vi si allerede på telefon om det er en jobb for oss, eller en maskin for deg.' },
  { nr: '2', namn: 'Gratis befaring', ritning: 'befaring', text: 'Ved større jobber kommer vi ut og ser på tomten. Du får høre hva som må gjøres, hva som kan vente, og om det lønner seg å gjøre noe selv.' },
  { nr: '3', namn: 'Fast pris', ritning: 'tilbud', text: 'Prisen settes når vi har sett jobben, og den står. Finner vi fjell eller vann vi ikke kunne se, ringer vi før vi gjør noe med det.' },
  { nr: '4', namn: 'Arbeidet', ritning: 'arbeid', text: 'Graving, underlag, stein eller terrasse. Vi rydder etter oss hver dag, og vi sier fra hvis noe tar lengre tid.' },
  { nr: '5', namn: 'Overlevering', ritning: 'overlevering', text: 'Vi går over jobben sammen før vi laster maskinen. Sitter noe feil, tar vi det da, ikke etter en vinter.' },
];

const STATS = [
  { tal: 2026, prefix: '', etikett: 'Etablert' },
  { tal: 0, prefix: '', etikett: 'Kroner for befaringen' },
  { tal: 1, prefix: '', etikett: 'Kontaktperson hele veien' },
  { tal: 2, prefix: '', etikett: 'Måter: vi gjør det, eller du leier' },
];

const VARFOR = [
  'Arbeidet og maskinen fra samme firma. Lei den selv, eller la oss gjøre jobben.',
  'Fast pris når vi har sett tomten, og den står.',
  'Lokalt på Romerike: kort vei, rask befaring, henting og levering av maskin.',
  'Klarer du jobben selv med en leid minigraver, sier vi det. Selv om en entreprise hadde gitt oss mer betalt.',
];

const OMDOMEN = [
  { namn: 'Eksempel', text: 'Slik ser en omtale ut når den står her: kort, med fornavn og sted, hentet fra Google-profilen deres.' },
  { namn: 'Eksempel', text: 'Kunden skriver hva som ble gjort, om prisen holdt og hvordan det så ut etterpå. Det er den teksten som selger.' },
  { namn: 'Eksempel', text: 'Tre til fem ekte holder. En oppdiktet er verre enn ingen — derfor står det Eksempel her.' },
];

const FRAGOR = [
  { q: 'Hva koster det å leie en minigraver?', a: 'Det avhenger av hvor lenge, og om du vil ha levering og henting. Ring, så får du en pris på telefon. Vi viser deg hvordan maskinen brukes før du starter.' },
  { q: 'Hva koster graving eller belegningsstein?', a: 'Det avhenger av massene, underlaget og hvor lett det er å komme til. Derfor starter vi med en gratis befaring før noen pris settes. Prisen du får, står.' },
  { q: 'Bør jeg leie maskinen selv, eller la dere gjøre jobben?', a: 'Vi sier det ærlig når vi ser tomten. Mindre grøfter og planering klarer mange selv med en leid minigraver. Belegningsstein med riktig underlag og fall er ofte en jobb for oss.' },
  { q: 'Leverer dere maskinen hjem til meg?', a: 'Ja. Minigraveren kommer på tilhenger, og vi henter når du er ferdig. Si hvor du bor, så sier vi når vi kan komme.' },
  { q: 'Hvor lang tid tar en jobb?', a: 'En innkjørsel i belegningsstein tar gjerne noen dager, en terrasse omtrent det samme. Du får alltid en tidsplan i tilbudet, og vi sier fra hvis den endrer seg.' },
  { q: 'Hva om det er fjell i grunnen?', a: 'Da ringer vi før vi gjør noe, og du får høre hva det betyr for tid og pris. Ingen overraskelser på fakturaen.' },
  { q: 'Hvor jobber dere?', a: 'Romerike, med utgangspunkt i Kløfta: Ullensaker, Jessheim, Nannestad, Gjerdrum, Lillestrøm og stedene rundt. Ligger jobben lenger unna, si hvor, så sier vi om vi kan ta den.' },
  { q: 'Hvordan kommer jeg i gang?', a: 'Ring, eller skriv noen linjer om hva du vil gjøre. Befaringen er gratis, og du får en fast pris før noe starter.' },
];

const Stjarnor = () => (<span className={styles.stjarnor} role="img" aria-label="Fem stjerner">{[0, 1, 2, 3, 4].map((i) => (<svg viewBox="0 0 24 24" aria-hidden="true" key={i}><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.5L12 17.3l-5.9 3.2 1.3-6.5L2.5 9.4l6.6-.8z" /></svg>))}</span>);
const GoogleG = ({ className }) => (<svg viewBox="0 0 48 48" className={className} aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.3l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" /><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 2.9-2.2 5.4-4.7 7.1l7.6 5.9c4.4-4.1 6.9-10.1 6.9-17z" /><path fill="#FBBC04" d="M10.5 28.6c-.5-1.5-.8-3-.8-4.6s.3-3.1.8-4.6l-7.9-6.1C.9 16.6 0 20.2 0 24s.9 7.4 2.6 10.7l7.9-6.1z" /><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.9l-7.9 6.1C6.5 42.6 14.6 48 24 48z" /></svg>);

export default function RomerikeDemo() {
  return (
    <div className={`${display.variable} ${displayKursiv.variable} ${ui.variable} ${styles.sida}`} lang="nb">
      <header className={styles.hdr}>
        <div className={styles.hdrIn}>
          <a className={styles.brand} href="#top"><span className={styles.brandTxt}><b>Romerike Service & Utleie</b><i>Kløfta</i></span></a>
          <nav className={styles.nav}>{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}</nav>
          <a className={styles.mobilNavKnapp} href="#meny"><span>Meny</span><span className={styles.mobilNavIkon} aria-hidden="true" /></a>
          <a className={styles.hdrTel} href={TEL_HREF} aria-label={`Ring ${TEL}`}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg><span className={styles.hdrTelNr} aria-hidden="true">{TEL}</span><span className={styles.hdrTelKort} aria-hidden="true">Ring</span></a>
        </div>
      </header>

      <section className={styles.hero} id="top">
        <figure className={styles.heroFilm}>
          <video className={styles.heroLiggande} autoPlay muted loop playsInline preload="metadata" poster="/romerike/media/poster-hero.jpg"><source src="/romerike/media/video-hero-foer-etter-tomt.mp4" type="video/mp4" /></video>
          <video className={styles.heroStaende} autoPlay muted loop playsInline preload="metadata" poster="/romerike/media/poster-hero-mobil.jpg"><source src="/romerike/media/video-hero-foer-etter-tomt-mobil.mp4" type="video/mp4" /></video>
        </figure>
        <div className={styles.heroLager}>
          <div className={styles.heroLagerIn}>
            {/* Ordmerke: logoen kunne ikke hentes (nettsiden er nede, IG-bildet kan ikke lastes ned). Flagget. */}
            <h1 className={styles.heroOrdmarke}>Romerike <span>Service & Utleie</span></h1>
            <p className={styles.heroTjanster}>Grunnarbeid · Maskinutleie</p>
            <p className={styles.heroOrt}>Kløfta, Romerike</p>
            <div className={styles.heroCta}>
              <a className={styles.btn} href="#kontakt">Bestill gratis befaring</a>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={TEL_HREF}>Ring {TEL}</a>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.tejp} role="group" aria-label="Det vi gjør">
        <div className={styles.tejpSpar}>{[false, true].map((kopia) => (<div className={styles.tejpIn} aria-hidden={kopia || undefined} key={kopia ? 'b' : 'a'}><span>Graving og planering</span><span>Drenering</span><span>Belegningsstein</span><span>Kantstein</span><span>Terrasse</span><span>Utleie av minigraver</span><span>Levering og henting</span><span>Romerike</span></div>))}</div>
      </div>

      <div className={styles.wrap}>
        <div className={styles.stats} role="list" aria-label="Romerike Service & Utleie i tall">
          {STATS.map((s) => (<div className={styles.stat} role="listitem" key={s.etikett}><b>{s.prefix}<span className={styles.statTal} style={{ '--mal': s.tal }} aria-hidden="true" /><span className={styles.statStatisk}>{s.tal}</span></b><span>{s.etikett}</span></div>))}
        </div>
      </div>

      <section className={styles.sek} id="forvandling">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Forvandlingen</p><h2 className={styles.h2}>Vi gjør jobben. <em>Eller du leier maskinen.</em></h2></div>
          <div className={styles.forvandling}>
            <figure><Image src="/romerike/media/galleri-foer-raa-tomt.jpg" alt="Rå tomt foran et hus med bar jord, gamle heller, ugress og en haug med grus" width={1200} height={1200} /><figcaption><b>Før</b></figcaption></figure>
            <figure><Image src="/romerike/media/galleri-etter-belegningsstein.jpg" alt="Samme tomt ferdig lagt med grå belegningsstein, kantstein og en ny plen" width={1200} height={1200} /><figcaption><b>Etter</b></figcaption></figure>
          </div>
          <div className={styles.galleri}>
            <figure><Image src="/romerike/media/galleri-makro-kantstein.jpg" alt="Nærbilde av kantstein og belegningsstein med sand i fugene" width={1200} height={1200} /><figcaption>Kantsteinen som holder alt på plass.</figcaption></figure>
            <figure><Image src="/romerike/media/galleri-belegningsstein.jpg" alt="Nylagt belegningsstein med gummiklubbe og vater" width={1200} height={1200} /><figcaption>Fall og fuger, sjekket med vater.</figcaption></figure>
            <figure><Image src="/romerike/media/galleri-terrasse.jpg" alt="Ny terrasse i impregnert furu med rekkverk og trapp" width={1200} height={1200} /><figcaption>Terrassen, fra fundament til siste skrue.</figcaption></figure>
            <figure><Image src="/romerike/media/galleri-groeft-drenering.jpg" alt="Gravd grøft med drensrør og pukk langs en husvegg" width={1200} height={1200} /><figcaption>Drenering før det blir et problem.</figcaption></figure>
          </div>
          <p className={styles.forvandlingNot}>Illustrasjonsbilder — byttes ut med deres egne prosjektbilder.</p>
        </div>
      </section>

      <section className={styles.sek} id="tjenester">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Det vi gjør</p><h2 className={styles.h2}>Arbeidet, <em>eller maskinen</em></h2><p className={styles.sekLead}>Graving, stein og terrasse når du vil ha det gjort. Minigraver og utstyr når du vil gjøre det selv. Samme firma, samme telefon.</p></div>
          <div className={styles.tjanster}>{TJANSTER.map((t) => (<article className={styles.tjanst} key={t.id}><svg className={styles.ritning} viewBox="0 0 200 120" aria-hidden="true">{RITNINGAR[t.ritning]}</svg><h3>{t.namn}</h3><p>{t.text}</p><ul>{t.punkter.map((p) => <li key={p}>{p}</li>)}</ul></article>))}</div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="prosess">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Slik går det</p><h2 className={styles.h2}>Fem steg, og prisen settes <em>i det tredje</em></h2><p className={styles.sekLead}>Det starter med en telefon og slutter med at vi går over jobben sammen før maskinen lastes.</p></div>
          <div className={styles.stegBlock}>
            {STEG.map((s, i) => <input type="radio" name="steg" id={`steg-${s.nr}`} className={styles.stegRadio} defaultChecked={i === 0} key={`r-${s.nr}`} />)}
            <div className={styles.stegVal} role="tablist" aria-label="Slik går det">{STEG.map((s) => <label className={styles.stegKnapp} htmlFor={`steg-${s.nr}`} key={`l-${s.nr}`}><span>{s.namn}</span></label>)}</div>
            <div className={styles.stegKort}>{STEG.map((s) => (<article className={styles.stegPanel} key={`p-${s.nr}`}><svg className={styles.stegRitning} viewBox="0 0 200 120" aria-hidden="true">{STEGRITNINGAR[s.ritning]}</svg><div><h3>{s.namn}</h3><p>{s.text}</p></div></article>))}</div>
          </div>
        </div>
      </section>

      <section className={styles.sek} id="hvorfor">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Hvorfor oss</p><h2 className={styles.h2}>Grunnen først, <em>så det som skal stå på den</em></h2></div>
          <div className={styles.varforModul}>
            <figure className={styles.varforFilm}><video autoPlay muted loop playsInline preload="metadata" poster="/romerike/media/poster-hvorfor.jpg" aria-label="Minigraveren graver og planerer tomten"><source src="/romerike/media/video-hvorfor-minigraver.mp4" type="video/mp4" /></video></figure>
            <ul className={styles.varforPunkter}>{VARFOR.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="omdomen">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Omtaler</p><h2 className={styles.h2}>Det kundene sier</h2><p className={styles.googleRad}><GoogleG className={styles.googleG} /><span>Google-omtaler</span></p></div>
          <div className={styles.recensioner}>{OMDOMEN.map((o, i) => (<figure className={styles.recension} key={i}><div className={styles.recensionHuvud}><span className={styles.avatar} aria-hidden="true">E</span><figcaption><b>{o.namn}</b><span>Byttes ut med en ekte omtale</span></figcaption><GoogleG className={styles.recensionG} /></div><Stjarnor /><blockquote>{o.text}</blockquote></figure>))}</div>
          <div className={styles.recensionerFot}><p className={styles.recensionerNot}>Eksempel — byttes ut med deres ekte Google-omtaler når profilen er på plass.</p><a className={`${styles.btn} ${styles.btnMork}`} href="https://www.google.com/search?q=Romerike+Service+%26+Utleie+Kl%C3%B8fta" target="_blank" rel="noopener">Se alle omtaler</a></div>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sociala}`} id="sosiale">
        <div className={styles.wrap}>
          <div className={styles.socialaIkoner}><a href={IG} target="_blank" rel="noopener" aria-label="Romerike Service & Utleie på Instagram"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" /><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" /></svg></a></div>
          <p className={styles.socialaTxt}>Følg arbeidet i hverdagen</p>
          <div className={styles.socialaRutnat}>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/romerike/media/sosiale-minigraver-henger.jpg" alt="Minigraver på tilhenger bak en pickup" width={1200} height={1200} /></a></figure>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/romerike/media/sosiale-trelast.jpg" alt="Stabel med impregnert trelast klar til terrassebygging" width={1200} height={1200} /></a></figure>
            <figure><a href={IG} target="_blank" rel="noopener"><Image src="/romerike/media/sosiale-doermontering.jpg" alt="Ny ytterdør montert i en hvit husvegg" width={1200} height={1200} /></a></figure>
          </div>
          <p className={styles.forvandlingNot}>Illustrasjonsbilder — byttes ut med deres egne.</p>
        </div>
      </section>

      <section className={`${styles.sek} ${styles.sekLjus}`} id="sporsmal">
        <div className={styles.wrap}>
          <div className={styles.sekHuvud}><p className={styles.eyebrow}>Vanlige spørsmål</p><h2 className={styles.h2}>Det du pleier å spørre om først</h2><p className={styles.sekLead}>Pris og risiko først, det praktiske etterpå. Gjelder det akkurat din tomt, er telefonen raskere enn en nettside.</p></div>
          <div className={styles.fragorGrid}>
            <div className={styles.fragor}>{FRAGOR.map((f) => <details className={styles.fraga} name="faq" key={f.q}><summary>{f.q}<span className={styles.fragaIkon} aria-hidden="true" /></summary><p>{f.a}</p></details>)}</div>
            <aside className={styles.fragaKort}><h3>Finner du ikke svaret?</h3><p>Ring og spør rett ut. Vi sier hva som gjelder for din tomt.</p><a className={`${styles.btn} ${styles.btnMork}`} href={TEL_HREF}>Ring {TEL}</a></aside>
          </div>
        </div>
      </section>

      <section className={styles.kontakt} id="kontakt">
        <div className={styles.wrap}>
          <div className={styles.kontaktGrid}>
            <div>
              <p className={styles.eyebrow}>Kontakt</p>
              <h2 className={styles.h2}>Skal noe graves, legges eller bygges?<br /><em>Start med befaringen.</em></h2>
              <p className={styles.sekLead}>Ring, eller skriv noen linjer om tomten. Befaringen er gratis, og prisen du får, står.</p>
              <div className={styles.kontaktRader}>
                <a className={styles.kontaktRad} href={TEL_HREF}><span>Telefon</span><b>{TEL}</b></a>
                <a className={styles.kontaktRad} href={IG} target="_blank" rel="noopener"><span>Instagram</span><b>@romerike.service.utleie</b></a>
                <div className={styles.kontaktRad}><span>Adresse</span><b>{ADRESSE}</b></div>
                <div className={styles.kontaktRad}><span>Område</span><b>Romerike</b></div>
              </div>
            </div>
            <form className={styles.form} action={FORM_ACTION} method="post" encType="text/plain" aria-describedby="form-not">
              <label>Navn<input type="text" name="navn" autoComplete="name" required /></label>
              <label>Telefon<input type="tel" name="telefon" autoComplete="tel" required /></label>
              <label>E-post (valgfritt)<input type="email" name="epost" autoComplete="email" /></label>
              <label>Hva gjelder det?<select name="type" defaultValue="Graving og grunnarbeid"><option>Graving og grunnarbeid</option><option>Belegningsstein</option><option>Terrasse</option><option>Leie av minigraver</option><option>Drenering</option><option>Noe annet</option></select></label>
              <label>Kort om jobben<textarea name="melding" rows={4} placeholder="Hvor tomten ligger, hva som skal gjøres, omtrent hvor stort, og når du vil ha det ferdig" /></label>
              <button className={styles.btn} type="submit">Bestill gratis befaring</button>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={TEL_HREF}>Eller ring {TEL}</a>
              <p className={styles.formNot} id="form-not">Skriv kort om tomten — da kan vi gi et fornuftig svar allerede i første samtale. Ingen masseutsendelser, ingen salgsliste.</p>
              <p className={styles.formNot}>Obs: i dette forslaget åpner knappen e-postprogrammet ditt og sender linjene til Bahko Byrå. På den ferdige nettsiden kobles skjemaet til deres egen innboks.</p>
            </form>
          </div>
        </div>
      </section>

      <footer className={styles.ftr}>
        <div className={styles.wrap}>
          <div className={styles.ftrGrid}>
            <div><span className={styles.brandTxt}><b>Romerike Service & Utleie AS</b><i>Grunnarbeid og maskinutleie</i></span><p className={styles.ftrText}>Graving, belegningsstein, terrasse og utleie av minigraver på Romerike. Vi gjør jobben, eller du leier maskinen.</p></div>
            <div className={styles.ftrLankar}>{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}<a href={TEL_HREF}>{TEL}</a><a href={IG} target="_blank" rel="noopener">@romerike.service.utleie</a><a href="#top">Til toppen</a></div>
          </div>
          <div className={styles.ftrBar}><span>Romerike Service & Utleie AS · Org.nr 937 745 265 · {ADRESSE}</span><span>Forslag laget av <a href="https://www.bahkobyra.se" target="_blank" rel="noopener">Bahko Byrå</a></span></div>
        </div>
      </footer>

      <div className={styles.mobilMenyLager} id="meny"><a className={styles.mobilMenySkugga} href="#stangd" tabIndex={-1} aria-hidden="true" /><nav className={styles.mobilMenyPanel} aria-label="Meny">{LANKAR.map((l) => <a href={l.href} key={l.href}>{l.txt}</a>)}<a href="#kontakt">Kontakt</a><a className={styles.mobilMenyStang} href="#stangd">Lukk menyen</a></nav></div>
      <span className={styles.stangdAnkare} id="stangd" />
      <input type="checkbox" id="popup-bort" className={styles.popupBort} aria-hidden="true" tabIndex={-1} />
      <aside className={styles.popup} aria-label="Kontakt Romerike Service & Utleie"><label className={styles.popupX} htmlFor="popup-bort" role="button" aria-label="Lukk" tabIndex={0}>✕</label><p className={styles.popupEyebrow}>Trenger du en minigraver i helgen?</p><p className={styles.popupTxt}>Ring, så sier vi om den er ledig, og hva det koster. Vi leverer og henter.</p><a className={`${styles.btn} ${styles.popupCta}`} href={TEL_HREF}>Ring {TEL}</a><a className={styles.popupAlt} href="#kontakt">Eller skriv noen linjer →</a></aside>
      <a className={styles.demoKnapp} href="#bahko-demo">Om dette forslaget</a>
      <div className={styles.modalLager} id="bahko-demo"><a className={styles.modalSkugga} href="#stangd" tabIndex={-1} aria-hidden="true" /><section className={styles.modal} aria-labelledby="bahko-rubrik"><a className={styles.modalX} href="#stangd" aria-label="Lukk">✕</a><span className={styles.modalBadge}>Forslag fra Bahko Byrå</span><h3 id="bahko-rubrik">Slik kan Romerike Service & Utleie se ut på nett</h3><p>Dette er et gratis forslag, bygget på det dere selv viser på Instagram. Ingen bestilling, ingen forpliktelse. Vil dere se den ferdig med deres egne bilder, logo og et skjema som lander i innboksen? Book en gratis 15-minutters samtale med Mathias.</p><a className={styles.modalCta} href="https://cal.eu/bahkobyra/15min" target="_blank" rel="noopener">Book 15 min gratis samtale →</a><a className={styles.modalAlt} href="mailto:mathias@bahkobyra.se?subject=Romerike%20Service%20%26%20Utleie%20-%20nettsideforslag">Eller send e-post → mathias@bahkobyra.se</a><span className={styles.modalFot}>Bahko Byrå · Synlighet som selger.</span></section></div>
    </div>
  );
}
