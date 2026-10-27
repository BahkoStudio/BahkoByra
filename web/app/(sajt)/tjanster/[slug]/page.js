import Link from 'next/link';
import { notFound } from 'next/navigation';
import Faq from '../../../komponenter/Faq';
import { TJANSTER, FRAGOR } from '../../../data';
import Maskot from '../../../komponenter/Maskot';
import styles from './tjanst.module.css';

const PIL = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const SAJT = 'https://www.bahkobyra.se';
const ORG = `${SAJT}/#organization`; // samma @id som organisationen i (sajt)/layout.js

export function generateStaticParams() {
  return TJANSTER.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const t = TJANSTER.find((x) => x.slug === slug);
  if (!t) return {};
  return {
    // SEO-briefen 2026-10-20: tjänsten och sökordet först. Suffixet "| Bahko Byrå" läggs på av layoutens mall.
    title: t.title || t.rubrik,
    description: t.meta || t.ingress,
    alternates: { canonical: `/tjanster/${t.slug}/` },
  };
}

/* Strukturerad data per tjänst: Service (pekar på organisationen), BreadcrumbList
   (Start → tjänsten; det finns ingen /tjanster/-sida att lägga emellan) och FAQPage
   byggd ur samma frågelista som visas på sidan. Paketen blir Offer-noder. */
function schema(t) {
  const url = `${SAJT}/tjanster/${t.slug}/`;
  const graf = [
    {
      '@type': 'Service',
      '@id': `${url}#service`,
      name: t.schema?.namn || t.namn,
      serviceType: t.schema?.typ || t.namn,
      url,
      provider: { '@id': ORG },
      areaServed: [
        { '@type': 'City', name: 'Jönköping' },
        { '@type': 'City', name: 'Huskvarna' },
        { '@type': 'Country', name: 'Sverige' },
      ],
      audience: { '@type': 'BusinessAudience', name: 'Hantverkare och lokala företag' },
      ...(t.paket
        ? {
            offers: t.paket.map((p) => ({
              '@type': 'Offer',
              name: `${p.namn}: ${p.kort}`,
              price: p.pris.replace(/\D/g, ''),
              priceCurrency: 'SEK',
              priceSpecification: {
                '@type': 'PriceSpecification',
                price: p.pris.replace(/\D/g, ''),
                priceCurrency: 'SEK',
                valueAddedTaxIncluded: false,
              },
              description: 'Engångspris ex moms',
            })),
          }
        : {}),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Start', item: `${SAJT}/` },
        { '@type': 'ListItem', position: 2, name: t.namn, item: url },
      ],
    },
  ];
  if (t.fragor) {
    graf.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: t.fragor.map((f) => ({
        '@type': 'Question',
        name: f.fraga,
        acceptedAnswer: { '@type': 'Answer', text: f.svar },
      })),
    });
  }
  return { '@context': 'https://schema.org', '@graph': graf };
}

export default async function Tjanst({ params }) {
  const { slug } = await params;
  const t = TJANSTER.find((x) => x.slug === slug);
  if (!t) notFound();

  const andra = TJANSTER.filter((x) => x.slug !== t.slug);
  const fragor = t.fragor || FRAGOR.slice(0, 4);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema(t)) }} />

      <section className={`mork ${styles.topp}`}>
        <div className="wrap" data-trapp>
          <nav className={styles.brod} aria-label="Brödsmulor">
            <Link href="/">Start</Link>
            <span aria-hidden="true">/</span>
            <span>{t.namn}</span>
          </nav>
          <h1>{t.h1 || t.rubrik}</h1>
          {t.slogan && <p className={styles.slogan}>{t.slogan}</p>}
          {/* Introstycket står direkt under H1 som vanlig text, så att det kan citeras av AI-svar. */}
          <p className="lede" style={{ marginTop: '1.1rem' }}>
            {t.ingress}
            {t.ingressLank && (
              <>
                {' '}
                {t.ingressLank.fore}
                <Link href={t.ingressLank.href} className="textlank">
                  {t.ingressLank.text}
                </Link>
                {t.ingressLank.efter}
              </>
            )}
          </p>
          <div className={styles.toppKnappar}>
            <Link href="/kontakt/" className="btn btn-primar">
              Få kostnadsfritt förslag {PIL}
            </Link>
            <Link href="/case/" className="btn btn-sekundar">
              Se leveranser
            </Link>
          </div>
        </div>
      </section>

      {t.paket && (
        <section className={styles.paketYta}>
          <div className="wrap">
            <span className="eyebrow">Fast pris</span>
            <h2>Tre paket, ni väljer</h2>
            <div className={styles.paketNat} data-trapp>
              {t.paket.map((p) => (
                <div key={p.namn} className={`${styles.paket} ${p.markerad ? styles.markerad : ''}`}>
                  {p.markerad && <span className={styles.bricka}>Vanligast</span>}
                  <h3>{p.namn}</h3>
                  <span className={styles.pris}>
                    {p.pris}
                    <small>ex moms</small>
                  </span>
                  <p className={styles.kort}>{p.kort}</p>
                  <ul>
                    {p.ingar.map((rad) => (
                      <li key={rad}>
                        <span aria-hidden="true">✓</span>
                        {rad}
                      </li>
                    ))}
                  </ul>
                  <Link href="/kontakt/" className={p.markerad ? 'btn btn-primar' : 'btn btn-sekundar'}>
                    Få kostnadsfritt förslag {PIL}
                  </Link>
                </div>
              ))}
            </div>
            {t.tillagg && (
              <>
                <h3 style={{ marginTop: '2.4rem' }}>Tilläggstjänster</h3>
                <div className={styles.tillagg}>
                  {t.tillagg.map((x) => (
                    <div key={x.namn}>
                      <strong>{x.namn}</strong>
                      <b>{x.pris}</b>
                      {x.not && <small>{x.not}</small>}
                    </div>
                  ))}
                </div>
              </>
            )}
            <p className={styles.momsNot}>
              Alla priser är exklusive moms. Hemsidan har ett fast pris, och månadsavgiften för det
              löpande står i förslaget. Ni äger sidan och domänen.
              Ingen bindningstid på tilläggen.
            </p>
          </div>
        </section>
      )}

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
            <Maskot pose="pekar" stil="stor" alt="Bahko-maskoten pekar på knappen för kostnadsfritt förslag" />
            <Link href="/kontakt/" className="btn btn-primar">
              Få kostnadsfritt förslag {PIL}
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
          <h2>Vanliga frågor</h2>
          <div style={{ marginTop: '2rem' }}>
            <Faq frager={fragor} />
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
