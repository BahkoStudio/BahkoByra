import styles from './TjanstIkon.module.css';

/**
 * Tjänsteikonerna är 3D-renderade glasplattor i samma smaragd som maskoten
 * (Qwen Image 3, en gemensam rendering 2026-10-07 så att vinkel, ljus och
 * material är lika; utklippta till /img/tjanster/<slug>.webp, 240 px).
 * Varje ikon står lite på sned i vila och rätar upp sig med en studs när
 * kortet pekas på. Rörelsen ligger på transform och bara vid hover.
 */

const ALT = {
  hemsidor: 'Glasikon: ett webbläsarfönster',
  seo: 'Glasikon: ett förstoringsglas över en kartnål',
  'google-ads': 'Glasikon: ett stapeldiagram med en pil uppåt',
  reklamfilmer: 'Glasikon: en filmklappa med spelknapp',
  appar: 'Glasikon: en mobil med en ringande klocka',
};

export default function TjanstIkon({ slug }) {
  if (!ALT[slug]) return null;

  return (
    <span className={styles.ikon}>
      <img
        src={`/img/tjanster/${slug}.webp`}
        alt=""
        width="240"
        height="240"
        loading="lazy"
        decoding="async"
      />
    </span>
  );
}
