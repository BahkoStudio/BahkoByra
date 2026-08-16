import styles from './Maskot.module.css';

/* Hemsidedoktorn — Bahkos maskot (kanon 2026-08-16, se brand.json).
   Poserna är förrenderade webp:er i /brand/maskot/. Tre stilar:
   rund (sektionsporträtt), flyt (svävande kort), liten (inline-badge). */

const BILDER = {
  master: '/brand/maskot/hemsidedoktorn-master.webp',
  pekar: '/brand/maskot/hemsidedoktorn-pekar.webp',
  undersoker: '/brand/maskot/hemsidedoktorn-undersoker.webp',
  vinkar: '/brand/maskot/hemsidedoktorn-vinkar.webp',
};

export default function Maskot({ pose = 'master', stil = 'rund', alt = 'Hemsidedoktorn, Bahko Byrås maskot' }) {
  return (
    <span className={`${styles.maskot} ${styles[stil]}`}>
      <img src={BILDER[pose] || BILDER.master} alt={alt} loading="lazy" />
    </span>
  );
}
