import Link from 'next/link';
import styles from './case.module.css';

export const metadata = {
  title: 'Case och demos',
  description:
    'Riktiga sajter vi byggt för bygg-, hantverks- och tjänsteföretag, plus demos du kan klicka runt i.',
  alternates: { canonical: '/case/' },
};

const PIL = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const KUNDER = [
  {
    namn: 'Smålands Måleri',
    bransch: 'Måleri · Jönköping',
    url: 'https://smamaleri.se/',
    bild: '/img/demo-smalands-maleri.webp',
    text: 'Egen domän, offertflöde och ROT-informationen korrekt formulerad mot Skatteverket.',
  },
  {
    namn: 'Bromma Trädgårdsservice',
    bransch: 'Trädgårdsskötsel · Stockholm',
    url: 'https://brommatradgardsservice.se/',
    bild: '/img/demo-bromma-tradgard.webp',
    text: 'Telefonnumret alltid synligt, egna sidor per tjänst och tydligt RUT-besked.',
  },
  {
    namn: "Mayka's Kitchen",
    bransch: 'Restaurang & catering',
    url: 'https://maykaskitchen.se',
    bild: '/img/maykaskitchen.jpg',
    text: 'Receptbibliotek på två språk och en sida byggd runt berättelsen.',
  },
];

const DEMOS = [
  { namn: 'Vajje Bygg', bransch: 'Nybyggnation & renovering', url: '/cloud/vajjebygg/', bild: '/img/demo-vajjebygg.webp' },
  { namn: 'GRANIT Bygg', bransch: 'Bygg & entreprenad', url: '/cloud/bygg/', bild: '/img/demo-granit-bygg.webp' },
  { namn: 'Asmar Relining', bransch: 'Relining & VVS', url: '/cloud/asmar/', bild: '/img/demo-asmar-relining.webp' },
];

export default function Case() {
  return (
    <>
      <section className={`mork ${styles.topp}`}>
        <div className="wrap">
          <span className="eyebrow">Leveranser i drift</span>
          <h1>
            Riktiga sajter, <span className="accent">riktiga firmor.</span>
          </h1>
          <p className="lede" style={{ marginTop: '1.1rem' }}>
            Klicka in i sajterna. Det här är inga mockuper, det är sidor som står och tar emot
            kunder varje dag.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="eyebrow">Kundleveranser</span>
          <h2>Sajter i drift</h2>
          <div className={styles.nat}>
            {KUNDER.map((k) => (
              <a key={k.namn} href={k.url} target="_blank" rel="noopener" className={styles.kort}>
                <span className={styles.bild}>
                  <img src={k.bild} alt={`Förhandsvisning av ${k.namn}`} loading="lazy" />
                </span>
                <span className={styles.kropp}>
                  <strong>{k.namn}</strong>
                  <em>{k.bransch}</em>
                  <span className={styles.text}>{k.text}</span>
                  <span className={styles.oppna}>Öppna sajt {PIL}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.demoYta}>
        <div className="wrap">
          <span className="eyebrow">Demos</span>
          <h2>Byggda för att visa, inte för att sälja</h2>
          <p className="lede" style={{ marginTop: '1rem' }}>
            Så här ser ett förslag ut när det landar hos er. Firmorna är påhittade, sidorna är
            byggda på riktigt.
          </p>
          <div className={styles.nat}>
            {DEMOS.map((d) => (
              <a key={d.namn} href={d.url} target="_blank" rel="noopener" className={styles.kort}>
                <span className={styles.bild}>
                  <img src={d.bild} alt={`Förhandsvisning av ${d.namn}`} loading="lazy" />
                </span>
                <span className={styles.kropp}>
                  <strong>{d.namn}</strong>
                  <em>{d.bransch}</em>
                  <span className={styles.oppna}>Öppna demo {PIL}</span>
                </span>
              </a>
            ))}
          </div>

          <div className={styles.cta}>
            <div>
              <h3>Vill ni se er egen firma på en sådan här sida?</h3>
              <p>Vi bygger förslaget inom 48 timmar. Kostnadsfritt.</p>
            </div>
            <Link href="/kontakt/" className="btn btn-primar">
              Få gratis förslag {PIL}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
