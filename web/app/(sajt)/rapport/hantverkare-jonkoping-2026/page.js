import Link from 'next/link';
import jkp from '../../webbyra-jonkoping/jonkoping.module.css';
import styles from './rapport.module.css';

/* RAPPORTMALL: "Så syns Jönköpings hantverkare på nätet 2026" (arbetstitel).
 *
 * ALLT innehåll i hakparenteser är platshållare. Sidan är noindex, står inte i
 * sitemapen och länkas inte från någon annan sida förrän datan är insamlad,
 * kontrollerad och inskriven. Hitta aldrig på siffror: varje nyckeltal ska ha
 * källa och mätdatum i en kommentar bredvid sig. */
export const metadata = {
  title: { absolute: 'Så syns Jönköpings hantverkare på nätet 2026 | Bahko Byrå' },
  description: '[Metabeskrivning kommer när rapporten är klar.]',
  alternates: { canonical: '/rapport/hantverkare-jonkoping-2026/' },
  robots: { index: false, follow: false },
};

const PIL = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const METOD = [
  { h: 'Urval', p: '[Vilka företag som ingår: antal, branscher och kommuner i Jönköpings län. Källa för urvalet.]' },
  { h: 'Vad som mättes', p: '[Kriterierna, t.ex. mobilanpassning, laddningstid, Google Företagsprofil, omdömen, synlighet i AI-svar.]' },
  { h: 'När och hur', p: '[Mätperiod, verktyg och hur varje kriterium bedömdes.]' },
  { h: 'Begränsningar', p: '[Vad rapporten inte säger och var osäkerheten finns.]' },
];

const NYCKELTAL = [
  { tal: '[X] %', etikett: '[Nyckeltal 1]', text: '[Förklaring och källa kommer.]' },
  { tal: '[X] %', etikett: '[Nyckeltal 2]', text: '[Förklaring och källa kommer.]' },
  { tal: '[X]', etikett: '[Nyckeltal 3]', text: '[Förklaring och källa kommer.]' },
  { tal: '[X] s', etikett: '[Nyckeltal 4]', text: '[Förklaring och källa kommer.]' },
];

/* Staplarna har medvetet samma höjd: de är en ram för diagrammet, inte data. */
const DIAGRAM = ['[Bransch A]', '[Bransch B]', '[Bransch C]', '[Bransch D]', '[Bransch E]'];

const SLUTSATSER = [
  '[Slutsats 1 kommer, med hänvisning till nyckeltalet den bygger på.]',
  '[Slutsats 2 kommer.]',
  '[Slutsats 3 kommer.]',
];

const SIDA = 'https://www.bahkobyra.se/rapport/hantverkare-jonkoping-2026/';
const SIDSCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Report',
  '@id': SIDA + '#report',
  headline: 'Så syns Jönköpings hantverkare på nätet 2026',
  inLanguage: 'sv-SE',
  url: SIDA,
  author: { '@id': 'https://www.bahkobyra.se/#organization' },
  publisher: { '@id': 'https://www.bahkobyra.se/#organization' },
  spatialCoverage: { '@type': 'AdministrativeArea', name: 'Jönköpings län' },
};

export default function RapportHantverkareJonkoping() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SIDSCHEMA) }} />

      <section className={`mork ${jkp.topp}`}>
        <div className="wrap">
          <span className="eyebrow">Rapport · Jönköpings län · 2026</span>
          <h1>
            Så syns Jönköpings hantverkare <span className="accent">på nätet 2026</span>
          </h1>
          <p className="lede" style={{ marginTop: '1.1rem' }}>
            [Ingress kommer: två till tre meningar om vad rapporten visar, hur många företag som
            ingår och den viktigaste slutsatsen.]
          </p>
          <p className={styles.utkast}>Utkast. Alla siffror och slutsatser på sidan är platshållare.</p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="eyebrow">Metod</span>
          <h2>Så gjordes granskningen</h2>
          <div className={jkp.punktNat}>
            {METOD.map((m) => (
              <div key={m.h} className="kort">
                <h3>{m.h}</h3>
                <p>{m.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mork">
        <div className="wrap">
          <span className="eyebrow">Nyckeltal</span>
          <h2>Det viktigaste i siffror</h2>
          <div className={styles.nyckelNat}>
            {NYCKELTAL.map((n) => (
              <div key={n.etikett} className={`${jkp.resultatKort} ${styles.plats}`}>
                <strong>{n.tal}</strong>
                <span>{n.etikett}</span>
                <p>{n.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={jkp.ytaLjus}>
        <div className="wrap">
          <span className="eyebrow">Diagram</span>
          <h2>[Diagramrubrik kommer]</h2>
          <figure className={styles.diagram}>
            <div className={styles.staplar} aria-hidden="true">
              {DIAGRAM.map((d) => (
                <div key={d} className={styles.stapelKol}>
                  <span className={styles.stapelVarde}>[värde]</span>
                  <span className={styles.stapel} />
                  <span className={styles.stapelEtikett}>{d}</span>
                </div>
              ))}
            </div>
            <figcaption>[Diagramyta: diagrammet ersätts när datan finns. Källa och mätdatum kommer.]</figcaption>
          </figure>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="eyebrow">Slutsatser</span>
          <h2>Vad det betyder för företag i Jönköping</h2>
          <ol className={styles.slutsatser}>
            {SLUTSATSER.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className={jkp.ctaYta}>
        <div className="wrap">
          <div className={jkp.cta}>
            <div>
              <h3>Hur syns ert företag?</h3>
              <p>
                Få en kostnadsfri granskning av er hemsida mot samma punkter. Bahko Byrå i
                Huskvarna/Jönköping skickar svaret inom 24 timmar.
              </p>
            </div>
            <Link href="/foretag/gratis-granskning.html" className="btn btn-primar">
              Få kostnadsfri granskning {PIL}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
