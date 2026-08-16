import styles from './Maskot.module.css';

/* Bahko-maskoten — grön glaskub med vitt B och ett öga (kanon 2026-08-16, se brand.json).
   Ersatte Hemsidedoktorn: samma karaktär, men renderad utan stetoskop och läkarrock.
   Assets genereras av tools/assets/build_mascot.py ur karaktärsarket.
   Tre stilar: rund (sektionsporträtt), flyt (svävande kort), liten (inline-badge).

   Just nu finns en kanonisk pose. Karaktärsarket har fler vinklar — när
   pekar/vinkar/undersöker frilagts läggs de till i BILDER och pose-propen
   börjar peka på olika filer igen. */

const MASTER = '/brand/maskot/bahko-master.webp';

const BILDER = {
  master: MASTER,
  pekar: MASTER,
  undersoker: MASTER,
  vinkar: MASTER,
};

export default function Maskot({ pose = 'master', stil = 'rund', alt = 'Bahko-maskoten' }) {
  return (
    <span className={`${styles.maskot} ${styles[stil]}`}>
      <img src={BILDER[pose] || MASTER} alt={alt} loading="lazy" />
    </span>
  );
}
