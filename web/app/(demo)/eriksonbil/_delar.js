import localFont from 'next/font/local';
import styles from './eriksonbil.module.css';
import { BAS, MEDIA } from './_bilar';

const rubrik = localFont({
  /* Outfit, lokal kopia av Googles latin-fil (se app/typsnitt/LASMIG.md) */
  src: [
    { path: '../../typsnitt/outfit-normal-variabel.woff2', weight: '500', style: 'normal' },
    { path: '../../typsnitt/outfit-normal-variabel.woff2', weight: '600', style: 'normal' },
  ],
  display: 'swap',
  variable: '--eb-rubrik',
});
const text = localFont({
  /* Inter, lokal kopia av Googles latin-fil (se app/typsnitt/LASMIG.md) */
  src: [
    { path: '../../typsnitt/inter-normal-variabel.woff2', weight: '400', style: 'normal' },
    { path: '../../typsnitt/inter-normal-variabel.woff2', weight: '500', style: 'normal' },
  ],
  display: 'swap',
  variable: '--eb-text',
});
export const fontKlasser = `${rubrik.variable} ${text.variable}`;

/* Bild med egen stående beskärning för mobil. Förgenererade webp i tre bredder,
   så sidan inte är beroende av Vercels bildtjänst. */
export function Bild({ namn, alt, prio = false, className, mobil = true }) {
  const d = `${MEDIA}/${namn}`;
  return (
    <picture>
      {mobil && (
        <source
          media="(max-aspect-ratio: 4/5)"
          type="image/webp"
          srcSet={`${d}-mob-720.webp 720w, ${d}-mob-1080.webp 1080w`}
          sizes="100vw"
        />
      )}
      <source type="image/webp" srcSet={`${d}-1280.webp 1280w, ${d}-1920.webp 1920w, ${d}-2560.webp 2560w`} sizes="100vw" />
      <img
        src={`${d}-1920.webp`}
        alt={alt}
        className={className}
        width={1920}
        height={1086}
        loading={prio ? 'eager' : 'lazy'}
        fetchPriority={prio ? 'high' : 'auto'}
        decoding="async"
      />
    </picture>
  );
}

export function Topp() {
  return (
    <header className={styles.topp}>
      <a href={`${BAS}/`} className={styles.toppLogo} aria-label="Erikson Bil, till startsidan">
        <img src={`${MEDIA}/logo-rad.svg`} alt="Erikson Bil" width={353} height={100} />
      </a>
      <nav className={styles.toppNav} aria-label="Meny">
        <a href={`${BAS}/#bilar`}>Bilar</a>
        <a href={`${BAS}/#verkstad`}>Verkstad</a>
        <a href={`${BAS}/#kontakt`}>Kontakt</a>
      </nav>
    </header>
  );
}

export function Exempel({ children = 'Exempelbil' }) {
  return <span className={styles.exempel}>{children}</span>;
}

export function Fot() {
  return (
    <footer className={styles.fot}>
      <img src={`${MEDIA}/logo-rad.svg`} alt="Erikson Bil" width={212} height={60} className={styles.fotLogo} loading="lazy" />
      <nav className={styles.fotNav} aria-label="Sidfot">
        <a href={`${BAS}/#bilar`}>Bilar</a>
        <a href={`${BAS}/#verkstad`}>Verkstad</a>
        <a href={`${BAS}/#nyhetsbrev`}>Nya bilar först</a>
        <a href={`${BAS}/#kontakt`}>Kontakt</a>
      </nav>
      <p className={styles.fotDemo}>
        Förslag från Bahko Byrå. Bilar, priser, tjänster, adress och öppettider är exempel, och alla bilder är illustrationer.
      </p>
      <p className={styles.fotCopy}>© 2026 Erikson Bil</p>
    </footer>
  );
}
