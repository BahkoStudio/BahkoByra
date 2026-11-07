import Link from 'next/link';
import MaskotScen from './MaskotScen';
import Vagen from './Vagen';
import styles from './Nischer.module.css';

/* Kundens väg till er (Mathias 2026-10-23 kväll: "mer som en resa, kreativare, bättre bilder").
   En slingrande streckad väg börjar i en Google-sökruta och slutar hos maskoten med telefonen.
   Längs vägen sitter åtta branscher som runda klistermärken: en liten 3D-scen per bransch
   (GPT Image 2.5, samma glansiga stil som maskoten) och under varje det kunden skriver i Google.

   Bilderna är illustrationer, inte kundjobb. Sökfraserna är exempel, inte mätta volymer.
   Länkarna går till nischsidan där en finns, annars till en öppen demo eller kontakt. */

const NISCHER = [
  { slug: 'snickare', namn: 'Snickare', soker: 'snickare Huskvarna', href: '/hemsida-for-snickare/' },
  { slug: 'elektriker', namn: 'Elektriker', soker: 'elektriker Jönköping', href: '/hemsida-for-elektriker/' },
  { slug: 'rormokare', namn: 'Rörmokare', soker: 'rörmokare akut Växjö', href: '/hemsida-for-rormokare/' },
  { slug: 'malare', namn: 'Målare', soker: 'målare Linköping', href: '/hemsida-for-malerifirma/' },
  { slug: 'tradgard', namn: 'Trädgård', soker: 'trädgårdsservice Stockholm', href: '/hemsida-for-tradgardsfirma/' },
  { slug: 'bygg', namn: 'Byggfirma', soker: 'byggfirma Nässjö', href: '/hemsida-for-byggfirma/' },
  { slug: 'restaurang', namn: 'Restaurang', soker: 'buffé i Huskvarna', href: '/hemsida-for-restaurang/' },
  { slug: 'ehandel', namn: 'E-handel', soker: 'köp kokbok online', href: '/hemsida-for-e-handel/' },
];

const LUPP = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

const PIL = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default function Nischer() {
  return (
    <section id="tjanster" className={styles.yta}>
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.intro} data-trapp>
          <span className="eyebrow">För vem</span>
          <h2>
            Kundens väg <span className="accent">till er.</span>
          </h2>
          <p className="lede">
            Snickare, målare, restauranger, e-handlare och alla andra som kunden googlar fram.
            Vi vet vad era kunder skriver i rutan, och bygger sidan runt de orden.
          </p>
        </div>

        {/* Vägen: ritas av CSS på dator (slingrande), lodrät på mobil */}
        <div className={styles.karta}>
          <Vagen />
          <div className={styles.start} data-avsloja="upp">
            <span className={styles.sokruta} data-start>
              {LUPP}
              <span>
                <b>kunden googlar</b> …
              </span>
            </span>
          </div>

          <ol className={styles.vag} data-trapp>
            {NISCHER.map((n, i) => (
              <li key={n.slug} className={styles.stopp} style={{ '--i': i }}>
                <Link href={n.href} className={styles.marke}>
                  <span className={styles.bild} data-stopp>
                    <img
                      src={`/img/nischer/${n.slug}-3d.webp`}
                      alt=""
                      width="640"
                      height="640"
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                  <span className={styles.text}>
                    <strong>{n.namn}</strong>
                    <span className={styles.sok}>
                      {LUPP}
                      <span>{n.soker}</span>
                    </span>
                  </span>
                  <span className={styles.pil} aria-hidden="true">{PIL}</span>
                </Link>
              </li>
            ))}
          </ol>

          <div className={styles.mal} data-avsloja="upp">
            <span className={styles.malFigur} data-mal>
            <MaskotScen
              src="/img/maskot-scener/ringer.webp"
              alt="Bahko-maskoten i bygghjälm håller upp en mobil som ringer"
              oga={{ x: 65.9, y: 38.4, rx: 4.7, ry: 3.7, gron: 'rgb(33,127,94)' }}
              index={2}
            />
            </span>
            <p>
              <strong>… och ringer er.</strong>
              Det är hela resan. Vi bygger sidan som gör att den slutar hos er.
            </p>
            <Link href="/kontakt/" className="btn btn-primar">
              <span className={styles.langt}>Visa hur min hemsida kan se ut</span>
              <span className={styles.kortText}>Se mitt förslag</span> {PIL}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
