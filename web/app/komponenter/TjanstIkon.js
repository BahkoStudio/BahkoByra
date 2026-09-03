import styles from './TjanstIkon.module.css';

/**
 * Ikonerna är klistermärken: en platt smaragdplatta med en hård, förskjuten
 * baksida i mörk smaragd (Duolingos sticker-språk, ingen gradient, ingen glöd).
 * Varje ikon står lite på sned i vila och rätar upp sig med en studs när
 * kortet pekas på. Symbolen gör då något som hör till tjänsten: fönstret
 * skriver, luppen tittar, staplarna växer, telefonen surrar, filmen spelar.
 * All rörelse ligger på transform och opacity, och bara vid hover.
 */

const SYMBOLER = {
  hemsidor: (
    // Webbläsarfönster som fylls med text
    <>
      <rect x="14" y="19" width="30" height="22" rx="3" fill="#0A1628" opacity=".9" />
      <rect x="14" y="19" width="30" height="6.5" rx="3" fill="#0A1628" />
      <circle cx="18.5" cy="22.2" r="1.3" fill="#34D399" />
      <circle cx="23" cy="22.2" r="1.3" fill="#34D399" opacity=".6" />
      <rect className={styles.rad1} x="18" y="29" width="16" height="2.4" rx="1.2" fill="#34D399" opacity=".85" />
      <rect className={styles.rad2} x="18" y="34" width="10" height="2.4" rx="1.2" fill="#34D399" opacity=".5" />
    </>
  ),
  seo: (
    // Förstoringsglas som svänger till
    <g className={styles.lupp}>
      <circle cx="26" cy="26" r="10" fill="none" stroke="#0A1628" strokeWidth="3.6" />
      <circle cx="26" cy="26" r="10" fill="#34D399" opacity=".28" />
      <path d="M33.5 33.5 42 42" stroke="#0A1628" strokeWidth="4.2" strokeLinecap="round" />
    </g>
  ),
  'google-ads': (
    // Staplar som växer
    <>
      <rect className={styles.stapel1} x="15" y="30" width="7" height="12" rx="2" fill="#0A1628" opacity=".65" />
      <rect className={styles.stapel2} x="25" y="24" width="7" height="18" rx="2" fill="#0A1628" opacity=".82" />
      <rect className={styles.stapel3} x="35" y="16" width="7" height="26" rx="2" fill="#0A1628" />
      <path className={styles.kurva} d="M16 26l10-6 9 5 8-9" stroke="#34D399" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  appar: (
    // Telefon som surrar
    <g className={styles.telefon}>
      <rect x="20" y="14" width="18" height="32" rx="4" fill="#0A1628" />
      <rect x="23" y="19" width="12" height="18" rx="1.6" fill="#34D399" opacity=".5" />
      <rect x="25.5" y="40.5" width="7" height="2.2" rx="1.1" fill="#34D399" opacity=".8" />
    </g>
  ),
  reklamfilmer: (
    // Spela-knapp som trycks
    <>
      <rect x="14" y="18" width="30" height="24" rx="4" fill="#0A1628" />
      <path className={styles.spela} d="M25 25.5v11l10-5.5z" fill="#34D399" />
      <rect className={styles.remsa} x="14" y="18" width="30" height="4" rx="2" fill="#34D399" opacity=".35" />
    </>
  ),
};

export default function TjanstIkon({ slug }) {
  const symbol = SYMBOLER[slug];
  if (!symbol) return null;

  return (
    <span className={styles.ikon} aria-hidden="true">
      <svg viewBox="0 0 58 58" width="58" height="58">
        {/* Hård baksida: står kvar när framsidan lyfter, så djupet växer */}
        <rect className={styles.baksida} x="9" y="9" width="48" height="48" rx="14" fill="#047857" />
        <g className={styles.fram}>
          <rect x="4" y="4" width="48" height="48" rx="14" fill="#10B981" />
          <g transform="translate(-1,-1) scale(0.95)">{symbol}</g>
        </g>
      </svg>
    </span>
  );
}
