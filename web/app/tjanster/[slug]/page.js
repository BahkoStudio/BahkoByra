import Link from 'next/link';
import { notFound } from 'next/navigation';
import Faq from '../../komponenter/Faq';
import { TJANSTER, FRAGOR } from '../../data';
import Maskot from '../../komponenter/Maskot';
import styles from './tjanst.module.css';

const PIL = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export function generateStaticParams() {
  return TJANSTER.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const t = TJANSTER.find((x) => x.slug === slug);
  if (!t) return {};
  return {
    title: t.rubrik,
    description: t.ingress,
    alternates: { canonical: `/tjanster/${t.slug}/` },
  };
}

export default async function Tjanst({ params }) {
  const { slug } = await params;
  const t = TJANSTER.find((x) => x.slug === slug);
  if (!t) notFound();

  const andra = TJANSTER.filter((x) => x.slug !== t.slug);

  return (
    <>
      <section className={`mork ${styles.topp}`}>
        <div className="wrap" data-trapp>
          <nav className={styles.brod} aria-label="Brödsmulor">
            <Link href="/">Start</Link>
            <span aria-hidden="true">/</span>
            <span>{t.namn}</span>
          </nav>
          <h1>{t.rubrik}</h1>
          <p className="lede" style={{ marginTop: '1.1rem' }}>
            {t.ingress}
          </p>
          <div className={styles.toppKnappar}>
            <Link href="/kontakt/" className="btn btn-primar">
              Få gratis förslag {PIL}
            </Link>
            <Link href="/case/" className="btn btn-sekundar">
              Se leveranser
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="eyebrow">Vad ni får</span>
          <h2>Det som gör skillnaden</h2>
          <div className={styles.punktNat} data-trapp>
            {t.punkter.map((p) => (
              <div key={p.h} className="kort">
                <h3>{p.h}</h3>
                <p>{p.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.processYta}>
        <div className="wrap">
          {/* Tjänster utan process visar bara CTA:n. Hemsidor beskriver i stället
              allt som byggs in under "Det som gör skillnaden". */}
          {t.process && (
            <>
              <span className="eyebrow">Så går det till</span>
              <ol className={styles.processSteg}>
                {t.process.map((s, i) => (
                  <li key={s}>
                    <span>{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </>
          )}

          <div className={styles.cta} data-avsloja="upp">
            <div>
              <h3>Vill ni se hur er sida skulle se ut?</h3>
              <p>Vi bygger förslaget först. Ni bestämmer sen.</p>
            </div>
            <Maskot pose="pekar" stil="flyt" alt="Bahko-maskoten pekar på knappen för gratis förslag" />
            <Link href="/kontakt/" className="btn btn-primar">
              Få gratis förslag {PIL}
            </Link>
          </div>
        </div>
      </section>

      {t.relaterat && (
        <section>
          <div className="wrap">
            <span className="eyebrow">För ert yrke</span>
            <h2>Så bygger vi för just er bransch</h2>
            <div className={styles.andraNat} data-trapp>
              {t.relaterat.map((r) => (
                <Link key={r.href} href={r.href} className={styles.andraKort}>
                  <span>
                    <strong>{r.namn}</strong>
                    <em>{r.kort}</em>
                  </span>
                  {PIL}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section>
        <div className="wrap">
          <span className="eyebrow">Vanliga frågor</span>
          <h2>Raka svar</h2>
          <div style={{ marginTop: '2rem' }}>
            <Faq frager={FRAGOR.slice(0, 4)} />
          </div>
        </div>
      </section>

      <section className={styles.andraYta}>
        <div className="wrap">
          <span className="eyebrow">Fler tjänster</span>
          <div className={styles.andraNat} data-trapp>
            {andra.map((a) => (
              <Link key={a.slug} href={`/tjanster/${a.slug}/`} className={styles.andraKort}>
                <span>
                  <strong>{a.namn}</strong>
                  <em>{a.kort}</em>
                </span>
                {PIL}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
