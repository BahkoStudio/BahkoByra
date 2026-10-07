import Link from 'next/link';
import HeroBygge from '../komponenter/HeroBygge';
import HeroVideo from '../komponenter/HeroVideo';
import Maskot from '../komponenter/Maskot';
import MaskotScen from '../komponenter/MaskotScen';
import Marquee from '../komponenter/Marquee';
import RoiKalkyl from '../komponenter/RoiKalkyl';
import Portfolj from '../komponenter/Portfolj';
import BevisBromma, { BevisSiffror } from '../komponenter/BevisBromma';
import TjanstIkon from '../komponenter/TjanstIkon';
import Faq from '../komponenter/Faq';
import { TJANSTER, FRAGOR } from '../data';
import styles from './page.module.css';

/* Startsidan nås som /, med parametrar och via www-varianter — den behöver
   peka ut sig själv. Undersidorna har redan canonical via sina metadata. */
export const metadata = {
  alternates: { canonical: '/' },
};

const PIL = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

/* Tjänsterna som en resa: ordningen är den vi bygger i, texten talar om vad steget ger. */
/* Tjänsterna: korta texter i kundens perspektiv, och en länk som säger vad man får se. */
const TJANSTTEXT = {
  hemsidor: { text: 'Kunden ser vad ni gör och hur man når er, redan på första skärmen i mobilen.', lank: 'Så gör vi hemsidan' },
  seo: { text: 'Ni kan komma upp när någon i er stad söker på det ni gör.', lank: 'Så syns ni i er stad' },
  'google-ads': { text: 'Annonser som kan ligga ovanför träffarna redan första veckan.', lank: 'Så fungerar annonserna' },
  reklamfilmer: { text: 'Film på ert arbete, så att kunden ser skillnaden innan priserna jämförs.', lank: 'Se en reklamfilm' },
  appar: { text: 'Bokning direkt på sidan, så att förfrågningarna inte drunknar bland samtalen.', lank: 'Så bokar kunden själv' },
};

/* Hur vi jobbar, som en resa i fyra stationer */
const RESAN = [
  { nr: '01', h: 'Ni får ett förslag', p: 'En färdig sida för er firma och er stad, inom 48 timmar.' },
  { nr: '02', h: 'Ni tittar och säger till', p: 'Gillar ni den fyller vi på med era bilder och kontaktuppgifter.' },
  { nr: '03', h: 'Sidan kommer ut', p: 'På er egen domän, normalt inom sju dagar.' },
  { nr: '04', h: 'Kunderna hittar in', p: 'Snabb i mobilen, med en kontaktknapp på varje skärm. Vill ni ändra något når ni samma person hela vägen.' },
];

export default function Start() {
  return (
    <>
      {/* ── HERO "Bygget live": text vänster, maskoten bygger till höger.
             Höjden kommer ur innehållet; filmen spelar på alla skärmar.
             Mobil: text → knappar → scen → siffror. ── */}
      <section className={`mork ${styles.heroBygge}`} id="top">
        <div className={`wrap ${styles.heroGrid}`}>
          <div className={styles.heroText} data-trapp>
            {/* Rubriken talar till firman (Mathias 2026-09-23). Tjänst + ort ligger som första rad
                I H1 (Mathias 2026-10-01): synlig text, samma som Google-profilens kategori och ort. */}
            <h1>
              <span className="eyebrow" style={{ display: 'flex' }}>Webbdesign i Jönköping &amp; Huskvarna</span>
              Bli firman kunderna <span className="accent">ringer först.</span>
            </h1>
            <p className={styles.heroLede}>
              Hemsidor och Google-optimering åt lokala företag som vill ha fler förfrågningar.
            </p>
            <div className={styles.heroKnappar}>
              <Link href="/kontakt/" className="btn btn-primar">
                Visa hur min hemsida kan se ut {PIL}
              </Link>
              <a href="/foretag/gratis-guide.html" className="btn btn-sekundar">
                Kostnadsfri guide {PIL}
              </a>
            </div>
            <p className={styles.heroBevis}>
              <strong>Ni har ett färdigt förslag inom 48 timmar.</strong> Sen bestämmer ni.
            </p>
          </div>

          <div className={styles.heroScen}>
            <HeroBygge />
          </div>

          <div className={styles.heroSiffror} data-trapp>
            <div>
              <strong>7 dagar</strong>
              <span>Normalt tills sidan är live</span>
            </div>
            <div>
              <strong>Ingen</strong>
              <span>Bindningstid</span>
            </div>
            <div>
              <strong>1</strong>
              <span>Kontaktperson, hela vägen</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── BEVISET: Brommas skärmbilder från 30 juli, direkt efter heron.
             Ersätter synlighetspanelen, vars graf var en illustration. ── */}
      <section className={`mork ${styles.panelYta}`} id="bevis">
        <div className={`wrap ${styles.panelInner}`} data-trapp>
          <div>
            <span className="eyebrow">Kundcase</span>
            <h2>
              Vår kund låg etta i Googles platslista, <span className="accent">före en firma med 117 omdömen.</span>
            </h2>
            <p className="lede" style={{ marginTop: '1.1rem' }}>
              Bromma Trädgårdsservice i Stockholm fick ny hemsida av oss. Så här såg det ut den
              30 juli, när man sökte på &quot;trädgårdsservice i Stockholm&quot;.
            </p>
            <BevisSiffror />
            <div className={styles.panelKnapp}>
              <Link href="/case/" className="btn btn-sekundar">
                Se sajten vi gjorde åt dem {PIL}
              </Link>
            </div>
            {/* Ögat sitter bakom luppen — Mathias egen render, som den är */}
            <MaskotScen
              className={styles.panelFigur}
              src="/img/maskot-scener/forstoringsglas.webp"
              alt="Bahko-maskoten granskar en mobil med ett förstoringsglas"
              index={1}
            />
          </div>
          <div className={styles.panelScen}>
            <BevisBromma />
          </div>
        </div>
      </section>

      {/* ── BEVISREMSAN: står still tills man scrollat ── */}
      <Marquee />

      {/* ── PORTFÖLJEN: riktiga sajter och demos i ett rutnät ── */}
      <section className={`mork ${styles.caseYta}`} id="case">
        <div className="wrap">
          <div data-trapp>
            <span className="eyebrow">Kunder och demos</span>
            <h2>
              Här är sidorna vi gjort. <span className="accent">Öppna dem i mobilen.</span>
            </h2>
          </div>

          <Portfolj />

          <div className={styles.caseMer}>
            <Link href="/case/" className="btn btn-sekundar">
              Se alla demos
            </Link>
          </div>
        </div>
      </section>

      {/* ── ROI-KALKYLEN: maskoten pekar på kalkylen, besökaren räknar på sina egna siffror ── */}
      <section className={`mork ${styles.siffrorYta}`} id="rakna">
        <div className={`wrap ${styles.siffrorRad}`}>
          <MaskotScen
            className={styles.siffrorScen}
            src="/img/maskot-scener/pekar-stoppur.webp"
            alt="Bahko-maskoten i bygghjälm pekar på kalkylen med ett stoppur i handen"
            oga={{ x: 74.8, y: 43.9, rx: 6.0, ry: 4.8, gron: 'rgb(22,114,77)' }}
            index={0}
          />
          <div className={styles.kalkylKolumn} data-trapp>
            <RoiKalkyl />
          </div>
        </div>
      </section>

      {/* ── VIDEON: två minuter, rakt på sak ── */}
      <section className={`mork ${styles.videoYta}`} id="video">
        <div className={`wrap ${styles.videoInner}`} data-trapp>
          <h2>
            Därför ringer kunden <span className="accent">en annan firma.</span>
          </h2>
          <p className={`lede ${styles.videoLede}`}>
            Kunden googlar och ringer den som syns först. Syns ni inte där får ni köpa
            förfrågningar i stället, som nummer fem i kön. Och säljaren som lovade guld och gröna
            skogar binder er gärna i två år.
          </p>
          <HeroVideo />
        </div>
      </section>

      {/* ── TJÄNSTER: en resa i fem steg, ikonerna binds ihop av en linje ── */}
      <section id="tjanster">
        <div className="wrap">
          <div className={styles.tjanstIntro} data-trapp>
            <div>
              <span className="eyebrow">Våra tjänster</span>
              <h2>
                Allt som får kunden <span className="accent">att ringa er.</span>
              </h2>
              <p className="lede" style={{ marginTop: '1rem' }}>
                Börja med hemsidan. Resten lägger vi till när det lönar sig.
              </p>
            </div>
            <div className={styles.tjanstMaskot}>
              <MaskotScen
                src="/img/maskot-scener/ringer.webp"
                alt="Bahko-maskoten i bygghjälm håller upp en mobil som ringer"
                oga={{ x: 65.9, y: 38.4, rx: 4.7, ry: 3.7, gron: 'rgb(33,127,94)' }}
                index={2}
              />
            </div>
          </div>

          <div className={styles.tjanstNat} data-trapp>
            {TJANSTER.map((t) => (
              <Link key={t.slug} href={`/tjanster/${t.slug}/`} className={styles.tjanstKort}>
                <TjanstIkon slug={t.slug} />
                <h3>{t.namn}</h3>
                <p>{TJANSTTEXT[t.slug].text}</p>
                <span className={styles.tjanstFot}>
                  <span className={styles.tagg}>{TJANSTTEXT[t.slug].lank}</span>
                  <span className={styles.tjanstPil}>{PIL}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS: resan i fyra stationer med en streckad väg emellan ── */}
      <section className={`mork ${styles.process}`} id="process">
        <div className="wrap">
          <span className="eyebrow">Hur vi jobbar</span>
          <h2>
            Ni ser er nya sida
            <br />
            <span className="accent">innan ni bestämmer er.</span>
          </h2>

          <ol className={styles.resa} data-trapp>
            {RESAN.map((r) => (
              <li key={r.nr} className={styles.resaSteg}>
                <span className={styles.resaNod}>{r.nr}</span>
                <h3>{r.h}</h3>
                <p>{r.p}</p>
              </li>
            ))}
          </ol>

          <div className={styles.processCta} data-avsloja="upp">
            <div>
              <h3>Berätta vad ni gör och var. Vi tar fram förslaget.</h3>
              <p>Sidan och domänen är era, och vi jobbar utan bindningstid.</p>
            </div>
            <MaskotScen
              className={styles.processScen}
              src="/img/maskot-scener/visar-sajten.webp"
              alt="Bahko-maskoten visar upp ett hemsideförslag på en surfplatta"
              oga={{ x: 73.3, y: 38.9, rx: 6.45, ry: 5.0, gron: 'rgb(20,112,75)' }}
              index={3}
            />
            <Link href="/kontakt/" className="btn btn-primar">
              Visa hur min hemsida kan se ut {PIL}
            </Link>
          </div>
        </div>
      </section>

      {/* ── GRATIS ANALYS + GRATIS GUIDE ── */}
      <section className={styles.gratisYta} id="gratis">
        <div className="wrap">
          <span className="eyebrow">Inte redo för ett förslag än?</span>
          <h2>
            Se först var <span className="accent">jobben läcker.</span>
          </h2>
          <p className={styles.gratisMaskot}>
            <span>Två vägar om ni vill titta innan ni ber om ett förslag.</span>
            <MaskotScen
              className={styles.gratisScen}
              src="/img/maskot-scener/fikar.webp"
              alt="Bahko-maskoten sitter på en hög plankor och fikar"
              oga={{ x: 72.7, y: 40.1, rx: 3.85, ry: 3.5, gron: 'rgb(28,147,96)' }}
              index={4}
            />
          </p>

          <div className={styles.gratisNat} data-trapp>
            <a href="/foretag/gratis-granskning.html" className={styles.gratisKort}>
              <span className={styles.gratisTagg}>Kostnadsfri analys</span>
              <h3>10-punktsanalys av er hemsida</h3>
              <p>
                Ni får svaret på mejl, med det som kostar er flest kunder överst.
              </p>
              <span className={styles.gratisLank}>Få kostnadsfri analys {PIL}</span>
            </a>

            <a href="/foretag/gratis-guide.html" className={styles.gratisKort}>
              <span className={styles.gratisTagg}>Kostnadsfri guide</span>
              <h3>3 saker som avgör vem kunden hittar på Google</h3>
              <p>
                Kort video och guide, gjord för den som inte jobbar med webb.
              </p>
              <span className={styles.gratisLank}>Hämta guiden {PIL}</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ: en fråga öppen i taget ── */}
      <section className={styles.faq} id="fragor">
        <div className="wrap">
          <span className="eyebrow">Vanliga frågor</span>
          <h2>
            <Maskot pose="undersoker" stil="liten" alt="Bahko-maskoten undersöker frågorna" />{' '}
            Frågorna säljaren <span className="accent">slingrade sig runt.</span>
          </h2>
          <p className="lede" style={{ margin: '1rem 0 2.4rem' }}>
            Ställ dem till oss också.
          </p>
          <Faq frager={FRAGOR} />
        </div>
      </section>
    </>
  );
}
