import Maskot from './Maskot';
import styles from './RubrikMedMaskot.module.css';

/**
 * Sidans H1 med maskoten bredvid, inte inuti. En bild i H1 gör att
 * sökmotorer läser in en tom alt-text i sidans huvudrubrik
 * (SEO-granskning 2026-11-17). Utseendet är detsamma som när maskoten
 * satt inline i rubriken.
 */
export default function RubrikMedMaskot({ pose, alt, stil = 'liten', children }) {
  return (
    <div className={styles.rad}>
      <Maskot pose={pose} stil={stil} alt={alt} />
      <h1>{children}</h1>
    </div>
  );
}
