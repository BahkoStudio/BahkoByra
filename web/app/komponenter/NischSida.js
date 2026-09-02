import Link from 'next/link';
import Faq from './Faq';
import Maskot from './Maskot';
import styles from './NischSida.module.css';

const PIL = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const PROCESS = ['Kostnadsfritt förslag inom 48 timmar', 'Ni säger ja', 'Live inom 7 dagar'];

/**
 * Gemensam mall för nischsidorna (en per hantverksyrke, data i app/nischer.js).
 * Samma sektionsrytm som tjänstesidorna så familjen håller ihop:
 * mörk topp → punkter → brödtext → bevis → process/CTA → FAQ.
 */
export default function NischSida({ nisch }) {
  return (
    <>
      <section className={`mork ${styles.topp}`}>
        <div className="wrap">
          <nav className={styles.brod} aria-label="Brödsmulor">
            <Link href="/">Start</Link>
            <span aria-hidden="true">/</span>
            <span>{nisch.h1}</span>
          </nav>
          <h1>
            <Maskot pose="vinkar" stil="liten" alt="Bahko-maskoten hälsar" />{' '}
            {nisch.h1}
          </h1>
          <p className="lede" style={{ marginTop: '1.1rem' }}>
            {nisch.ingress}
          </p>
          <div className={styles.toppKnappar}>
            <Link href="/kontakt/" className="btn btn-primar">
              Få kostnadsfritt förslag {PIL}
            </Link>
            <a href={nisch.bevis.url} target="_blank" rel="noopener" className="btn btn-sekundar">
              Se leveransen
            </a>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="eyebrow">Vad sidan ska klara</span>
          <h2>Det som avgör för en {nisch.yrke}</h2>
          <div className={styles.punktNat}>
            {nisch.punkter.map((p) => (
              <div key={p.h} className="kort">
                <h3>{p.h}</h3>
                <p>{p.p}</p>
              </div>
            ))}
          </div>
          <div className={styles.brodtext}>
            {nisch.brodtext.map((stycke) => (
              <p key={stycke.slice(0, 24)}>{stycke}</p>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.bevisYta}>
        <div className="wrap">
          <span className="eyebrow">Riktig leverans</span>
          <h2>Inte ett exempel. En kund.</h2>
          <div className={styles.bevis}>
            <a
              href={nisch.bevis.url}
              target="_blank"
              rel="noopener"
              className={styles.bevisBild}
              aria-label={`Öppna ${nisch.bevis.namn}`}
            >
              <img
                src={nisch.bevis.bild}
                alt={`Förhandsvisning av ${nisch.bevis.namn}`}
                loading="lazy"
              />
            </a>
            <div className={styles.bevisKropp}>
              <h3>{nisch.bevis.namn}</h3>
              <em>{nisch.bevis.ort}</em>
              <p>{nisch.bevis.text}</p>
              <a href={nisch.bevis.url} target="_blank" rel="noopener" className={styles.lank}>
                Öppna sajten {PIL}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="eyebrow">Så går det till</span>
          <h2>Förslaget först. Beslutet sen.</h2>
          <ol className={styles.processSteg}>
            {PROCESS.map((s, i) => (
              <li key={s}>
                <span>{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>

          <div className={styles.cta}>
            <div>
              <h3>Vill ni se er egen firma på en sådan här sida?</h3>
              <p>Färdigt förslag inom 48 timmar. Kostar ingenting, binder er inte vid något.</p>
            </div>
            <Link href="/kontakt/" className="btn btn-primar">
              Få kostnadsfritt förslag {PIL}
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="eyebrow">Vanliga frågor</span>
          <h2>Raka svar för {nisch.yrke}n</h2>
          <div style={{ marginTop: '2rem' }}>
            <Faq frager={nisch.fragor} />
          </div>
        </div>
      </section>
    </>
  );
}
