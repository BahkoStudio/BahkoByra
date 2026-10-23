import Link from 'next/link';
import MaskotScen from './MaskotScen';
import styles from './Nischer.module.css';

/* Branschresan (Mathias 2026-10-23, efter referensbilden "För firmor som jobbar med händerna"):
   sex stående fotokort med branschen och det kunden faktiskt skriver i Google. Korten står som
   stationer på resans väg, samma formspråk som "Hur vi jobbar".

   Fotona är kategoribilder (Qwen Image 3, händer och verktyg, inga ansikten, inga loggor) och
   påstår inget om kundjobb; de riktiga jobben står i portföljen. Länkarna går till nischsidan
   där en finns, annars till en öppen demo eller kontakt. Sökfraserna är exempel på hur kunder
   söker, inte mätta volymer. */

const NISCHER = [
  { slug: 'snickare', namn: 'Snickare', soker: 'snickare Huskvarna', href: '/kontakt/' },
  { slug: 'elektriker', namn: 'Elektriker', soker: 'elektriker Jönköping', href: '/kontakt/' },
  { slug: 'rormokare', namn: 'Rörmokare', soker: 'rörmokare akut Växjö', href: '/cloud/asmar/' },
  { slug: 'malare', namn: 'Målare', soker: 'målare Linköping', href: '/hemsida-for-malerifirma/' },
  { slug: 'tradgard', namn: 'Trädgård', soker: 'trädgårdsservice Stockholm', href: '/hemsida-for-tradgardsfirma/' },
  { slug: 'bygg', namn: 'Byggfirma', soker: 'byggfirma Nässjö', href: '/cloud/bygg/' },
];

const PIL = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default function Nischer() {
  return (
    <section id="tjanster" className={styles.yta}>
      <div className="wrap">
        <div className={styles.intro} data-trapp>
          <div>
            <span className="eyebrow">För vem</span>
            <h2>
              För firmor som jobbar <span className="accent">med händerna.</span>
            </h2>
            <p className="lede" style={{ marginTop: '1rem' }}>
              Snickare, elektriker, rörmokare, målare och fler. Vi vet vad era kunder skriver i
              Google, och bygger sidan runt de orden.
            </p>
          </div>
          <div className={styles.maskot}>
            <MaskotScen
              src="/img/maskot-scener/ringer.webp"
              alt="Bahko-maskoten i bygghjälm håller upp en mobil som ringer"
              oga={{ x: 65.9, y: 38.4, rx: 4.7, ry: 3.7, gron: 'rgb(33,127,94)' }}
              index={2}
            />
          </div>
        </div>

        {/* Stationerna: vägen ritas av listan, varje kort har sin nod */}
        <ol className={styles.vag} data-trapp>
          {NISCHER.map((n, i) => (
            <li key={n.slug} className={styles.station}>
              <span className={styles.nod} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <Link href={n.href} className={styles.kort}>
                <img
                  src={`/img/nischer/${n.slug}.webp`}
                  alt=""
                  width="900"
                  height="1200"
                  loading="lazy"
                  decoding="async"
                />
                <span className={styles.etikett}>
                  <strong>{n.namn}</strong>
                  <span>Kunden söker: &quot;{n.soker}&quot;</span>
                  <i className={styles.pil}>{PIL}</i>
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <div className={styles.fot} data-avsloja="upp">
          <p>
            Er bransch saknas? Det är samma sak för alla lokala företag: kunden googlar, och ringer
            den som syns och svarar snabbt.
          </p>
          <Link href="/kontakt/" className="btn btn-primar">
            Visa hur min hemsida kan se ut {PIL}
          </Link>
        </div>
      </div>
    </section>
  );
}
