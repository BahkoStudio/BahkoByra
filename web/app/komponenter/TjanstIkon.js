import styles from './TjanstIkon.module.css';

/**
 * Ikoner med djup: en förskjuten bakplatta i mörk smaragd ger 3D-känslan,
 * och en tydlig marinblå symbol på framsidan gör dem åtskiljbara i småformat.
 * SVG, inga bilder och inga emoji.
 */

const SYMBOLER = {
  hemsidor: (
    // Webbläsarfönster
    <>
      <rect x="14" y="19" width="30" height="22" rx="3" fill="#0A1628" opacity=".9" />
      <rect x="14" y="19" width="30" height="6.5" rx="3" fill="#0A1628" />
      <circle cx="18.5" cy="22.2" r="1.3" fill="#34D399" />
      <circle cx="23" cy="22.2" r="1.3" fill="#34D399" opacity=".6" />
      <rect x="18" y="29" width="16" height="2.4" rx="1.2" fill="#34D399" opacity=".85" />
      <rect x="18" y="34" width="10" height="2.4" rx="1.2" fill="#34D399" opacity=".5" />
    </>
  ),
  seo: (
    // Förstoringsglas
    <>
      <circle cx="26" cy="26" r="10" fill="none" stroke="#0A1628" strokeWidth="3.6" />
      <circle cx="26" cy="26" r="10" fill="#34D399" opacity=".28" />
      <path d="M33.5 33.5 42 42" stroke="#0A1628" strokeWidth="4.2" strokeLinecap="round" />
    </>
  ),
  'google-ads': (
    // Stigande staplar
    <>
      <rect x="15" y="30" width="7" height="12" rx="2" fill="#0A1628" opacity=".65" />
      <rect x="25" y="24" width="7" height="18" rx="2" fill="#0A1628" opacity=".82" />
      <rect x="35" y="16" width="7" height="26" rx="2" fill="#0A1628" />
      <path d="M16 26l10-6 9 5 8-9" stroke="#34D399" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  appar: (
    // Telefon
    <>
      <rect x="20" y="14" width="18" height="32" rx="4" fill="#0A1628" />
      <rect x="23" y="19" width="12" height="18" rx="1.6" fill="#34D399" opacity=".5" />
      <rect x="25.5" y="40.5" width="7" height="2.2" rx="1.1" fill="#34D399" opacity=".8" />
    </>
  ),
  reklamfilmer: (
    // Spela-knapp i ram
    <>
      <rect x="14" y="18" width="30" height="24" rx="4" fill="#0A1628" />
      <path d="M25 25.5v11l10-5.5z" fill="#34D399" />
      <rect x="14" y="18" width="30" height="4" rx="2" fill="#34D399" opacity=".35" />
    </>
  ),
};

export default function TjanstIkon({ slug }) {
  const symbol = SYMBOLER[slug];
  if (!symbol) return null;

  return (
    <span className={styles.ikon} aria-hidden="true">
      <svg viewBox="0 0 58 58" width="58" height="58">
        <defs>
          <linearGradient id={`yta-${slug}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#34D399" />
            <stop offset="1" stopColor="#10B981" />
          </linearGradient>
        </defs>
        {/* Förskjuten bakplatta ger djupet */}
        <rect x="10" y="10" width="44" height="44" rx="13" fill="#047857" opacity=".55" />
        <rect x="4" y="4" width="48" height="48" rx="14" fill={`url(#yta-${slug})`} />
        <g transform="translate(-1,-1) scale(0.95)">{symbol}</g>
      </svg>
    </span>
  );
}
