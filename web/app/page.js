import Link from 'next/link';
import SynlighetsPanel from './komponenter/SynlighetsPanel';
import Faq from './komponenter/Faq';
import { TJANSTER, FRAGOR } from './data';
import styles from './page.module.css';

const PIL = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const STEG = [
  { n: '01', h: 'Du får ett förslag', p: 'Vi bygger en riktig sida åt er och skickar den inom 48 timmar. Kostar ingenting och binder er inte vid något.' },
  { n: '02', h: 'Ni tittar och säger till', p: 'Gillar ni den gör vi den skarp med era bilder, texter och kontaktuppgifter. Gillar ni den inte är det tack och hej.' },
  { n: '03', h: 'Sidan går live', p: 'På er egen domän, inom sju dagar. Ni äger sidan, domänen och allt innehåll.' },
];

const CASE = [
  { namn: 'Smålands Måleri', bransch: 'Måleri · Jönköping', url: 'https://smamaleri.se/', bild: '/img/demo-smalands-maleri.webp' },
  { namn: 'Bromma Trädgård', bransch: 'Trädgårdsskötsel · Stockholm', url: 'https://brommatradgardsservice.se/', bild: '/img/demo-bromma-tradgard.webp' },
  { namn: "Mayka's Kitchen", bransch: 'Restaurang & catering', url: 'https://maykaskitchen.se', bild: '/img/maykaskitchen.jpg' },
];

export default function Start() {
  return (
    <>
      {/* ── HERO ── */}
      <section className={`mork ${styles.hero}`}>
        <div className={`wrap ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <span className="eyebrow">För bygg och hantverk i Sverige</span>
            <h1>
              Hemsidor som ger <span className="accent">fler jobb.</span>
            </h1>
            <p className="lede">
              Vi bygger en riktig sida åt er och skickar den inom 48 timmar. Ni ser exakt hur den
              blir innan ni bestämmer er, och betalar först när ni sagt ja.
            </p>
            <div className={styles.heroKnappar}>
              <Link href="/kontakt/" className="btn btn-primar">
                Få gratis förslag {PIL}
              </Link>
              <Link href="/case/" className="btn btn-sekundar">
                Se leveranser
              </Link>
            </div>
            <p className={styles.heroMikro}>Kostnadsfritt · Svar inom 24 timmar · Inga krav</p>
          </div>

          <div className={styles.heroPanel}>
            <SynlighetsPanel />
          </div>
        </div>
      </section>

      {/* ── TJÄNSTER: klickbara kort, lika höga ── */}
      <section id="tjanster">
        <div className="wrap">
          <span className="eyebrow">Vad vi gör</span>
          <h2>
            Allt som får kunden <span className="accent">att höra av sig.</span>
          </h2>
          <p className="lede" style={{ marginTop: '1rem' }}>
            Hemsidan är grunden. Resten bygger vi på när den står och fungerar.
          </p>

          <div className={styles.tjanstNat}>
            {TJANSTER.map((t) => (
              <Link key={t.slug} href={`/tjanster/${t.slug}/`} className={styles.tjanstKort}>
                <h3>{t.namn}</h3>
                <p>{t.kort}</p>
                <span className={styles.tjanstFot}>
                  <span className={styles.tagg}>{t.tagg}</span>
                  <span className={styles.tjanstPil}>{PIL}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS: med CTA i slutet ── */}
      <section className={`mork ${styles.process}`} id="process">
        <div className="wrap">
          <span className="eyebrow">Hur vi jobbar</span>
          <h2>
            Från första samtal
            <br />
            till <span className="accent">fulla kalendrar.</span>
          </h2>

          <ol className={styles.stegNat}>
            {STEG.map((s) => (
              <li key={s.n} className="kort">
                <span className={styles.stegNr}>{s.n}</span>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </li>
            ))}
          </ol>

          <div className={styles.processCta}>
            <div>
              <h3>Vill ni se hur er sida skulle se ut?</h3>
              <p>Vi bygger förslaget först. Ni bestämmer sen.</p>
            </div>
            <Link href="/kontakt/" className="btn btn-primar">
              Få gratis förslag {PIL}
            </Link>
          </div>
        </div>
      </section>

      {/* ── CASE ── */}
      <section id="case">
        <div className="wrap">
          <span className="eyebrow">Leveranser i drift</span>
          <h2>
            Riktiga sajter, <span className="accent">riktiga firmor.</span>
          </h2>

          <div className={styles.caseNat}>
            {CASE.map((c) => (
              <a key={c.namn} href={c.url} target="_blank" rel="noopener" className={styles.caseKort}>
                <span className={styles.caseBild}>
                  <img src={c.bild} alt={`Förhandsvisning av ${c.namn}`} loading="lazy" />
                </span>
                <span className={styles.caseMeta}>
                  <span>
                    <strong>{c.namn}</strong>
                    <em>{c.bransch}</em>
                  </span>
                  <span className={styles.tjanstPil}>{PIL}</span>
                </span>
              </a>
            ))}
          </div>

          <div className={styles.caseMer}>
            <Link href="/case/" className="btn btn-sekundar">
              Se fler leveranser och demos
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ: en fråga öppen i taget ── */}
      <section className={styles.faq} id="fragor">
        <div className="wrap">
          <span className="eyebrow">Vanliga frågor</span>
          <h2>
            Raka svar, <span className="accent">inga säljtrick.</span>
          </h2>
          <p className="lede" style={{ margin: '1rem 0 2.4rem' }}>
            Det här undrar de flesta bygg- och hantverksfirmor som hör av sig.
          </p>
          <Faq frager={FRAGOR} />
        </div>
      </section>
    </>
  );
}
