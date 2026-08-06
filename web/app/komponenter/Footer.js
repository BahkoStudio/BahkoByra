import Link from 'next/link';
import { TJANSTER } from '../data';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.foot}>
      <div className={styles.inner}>
        <div className={styles.kolumner}>
          <div>
            <Link href="/" className={styles.marke}>
              <img src="/brand/mark.svg" alt="" width="30" height="30" />
              <span>Bahko Byrå</span>
            </Link>
            <p className={styles.tagline}>Synlighet som säljer.</p>
          </div>

          <nav aria-label="Tjänster">
            <h2 className={styles.kolrubrik}>Tjänster</h2>
            <ul>
              {TJANSTER.map((t) => (
                <li key={t.slug}>
                  <Link href={`/tjanster/${t.slug}/`}>{t.namn}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Sidor">
            <h2 className={styles.kolrubrik}>Byrån</h2>
            <ul>
              <li>
                <Link href="/case/">Case</Link>
              </li>
              <li>
                <Link href="/om-oss/">Om oss</Link>
              </li>
              <li>
                <Link href="/kontakt/">Kontakt</Link>
              </li>
              <li>
                <a href="/foretag/gratis-guide.html">Gratis guide</a>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className={styles.kolrubrik}>Kontakt</h2>
            <ul>
              <li>
                <a href="mailto:mathias@bahkobyra.se">mathias@bahkobyra.se</a>
              </li>
              <li>
                <a href="https://www.instagram.com/bahkobyra1/" target="_blank" rel="noopener">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.botten}>
          <span>© {new Date().getFullYear()} Bahko Byrå</span>
          <span>bahkobyra.se</span>
        </div>
      </div>
    </footer>
  );
}
