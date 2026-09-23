import styles from './BevisBromma.module.css';

/* Brommas bevis, bara det som går att belägga (Mathias 2026-09-23):
   - Plats 1 av 6 i Googles Platser-flik och först i ChatGPT:s svar på
     "trädgårdsservice i Stockholm". Skärmbilderna är från rapport 1, 30 juli 2026
     (original i content/kundarbete/bromma/bevis/).
   - Förfrågningarna räknade i kundens Web3Forms-inkorg: 27 inskick 27 juli till
     22 september, minus Mathias två egna tester: 25 (Mathias beslut 2026-09-23: "25+").
     Ingen procentsats, det finns ingen mätning av läget före. */

export const BEVIS = [
  { tal: '1:a', text: 'på Google, före fem andra trädgårdsfirmor' },
  { tal: '1:a', text: 'i ChatGPT:s svar på samma fråga' },
  { tal: '25+', text: 'förfrågningar via hemsidan inom två månader' },
];

export function BevisSiffror({ className }) {
  return (
    <ul className={`${styles.siffror} ${className || ''}`}>
      {BEVIS.map((b) => (
        <li key={b.text}>
          <strong>{b.tal}</strong>
          <span>{b.text}</span>
        </li>
      ))}
    </ul>
  );
}

export default function BevisBromma() {
  return (
    <div className={styles.telefoner}>
      <figure className={`${styles.telefon} ${styles.vanster}`}>
        <img
          src="/img/bevis/bromma-google-plats-1.webp"
          alt="Googles Platser-flik för trädgårdsservice i Stockholm, med Bromma Trädgårdsservice överst"
          width="600"
          height="1150"
          loading="lazy"
          decoding="async"
        />
        <figcaption>Google, 30 juli</figcaption>
      </figure>
      <figure className={`${styles.telefon} ${styles.hoger}`}>
        <img
          src="/img/bevis/bromma-chatgpt-forst.webp"
          alt="ChatGPT svarar på trädgårdsservice i Stockholm och nämner Bromma Trädgårdsservice först"
          width="600"
          height="1100"
          loading="lazy"
          decoding="async"
        />
        <figcaption>ChatGPT, 30 juli</figcaption>
      </figure>
    </div>
  );
}
