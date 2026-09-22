import Link from 'next/link';
import Maskot from '../../komponenter/Maskot';
import styles from './tack.module.css';

/* Landningssidan efter ett inskickat formulär. Web3Forms skickar hit med
   `redirect`, så besökaren ser aldrig Web3Forms egen kvittenssida.
   Inte indexerad: sidan säger ingenting för den som söker. */
export const metadata = {
  title: 'Tack, vi hörde dig',
  description: 'Din förfrågan är skickad. Vi svarar inom 24 timmar.',
  robots: { index: false, follow: false },
};

export default function Tack() {
  return (
    <section className={styles.yta}>
      <div className={`wrap ${styles.inner}`}>
        <span className="eyebrow">Skickat</span>
        <h1>
          Tack! Nu är det <span className="accent">hos oss.</span>
        </h1>
        <p className="lede" style={{ marginTop: '1.1rem' }}>
          Vi läser varje förfrågan själva och svarar inom 24 timmar. Har ni bråttom går det
          lika bra att ringa eller mejla direkt.
        </p>

        <p className={styles.maskotRad}>
          <Maskot pose="vinkar" stil="stor" alt="Bahko-maskoten vinkar" />
          <span>Ingen bot, ingen säljavdelning. Ni hör från Mathias.</span>
        </p>

        <div className={styles.knappar}>
          <a className="btn btn-primar" href="mailto:mathias@bahkobyra.se">
            Mejla mathias@bahkobyra.se
          </a>
          <Link className="btn btn-sekundar" href="/">
            Tillbaka till startsidan
          </Link>
        </div>
      </div>
    </section>
  );
}
