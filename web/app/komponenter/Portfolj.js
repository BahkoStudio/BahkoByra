import { PORTFOLJ } from '../portfolj';
import styles from './Portfolj.module.css';

/* Kundsektionen (siterabbits-mönstret): kolumner med riktiga sidtoppar som
   rullar av sig själva, varje kort en liten webbläsare.

   Två kolumner med tre sajter var (kunder till vänster, demos till höger),
   åt varsitt håll. Referensen har tre kolumner, men sex sajter räcker inte
   till tre utan att samma firma står i bild två gånger samtidigt (design-
   loopen, runda 2). Tillbaka till tre när det finns tolv sajter.

   Sömlös loop: listan tredubblas och spåret flyttas en tredjedel. Bara det
   första exemplaret är nåbart med tangentbord och skärmläsare. Pekaren
   pausar rullningen (CSS). Reduced motion: kolumnerna står still och bara
   originalen visas. */

const KOLUMNER = [
  { id: 'kunder', lista: PORTFOLJ.filter((k) => k.typ === 'kund'), riktning: 'upp' },
  { id: 'demos', lista: PORTFOLJ.filter((k) => k.typ === 'demo'), riktning: 'ner' },
];

function Kort({ k, dubblett }) {
  return (
    <li className={dubblett ? styles.dubblett : undefined} aria-hidden={dubblett || undefined}>
      <a href={k.url} target="_blank" rel="noopener" className={styles.kort} tabIndex={dubblett ? -1 : undefined}>
        <span className={styles.krom} aria-hidden="true">
          <span className={`${styles.prickar} ${k.adress.split('/')[0].length > 18 ? styles.prickarLang : ''}`}>
            <i />
            <i />
            <i />
          </span>
          <span className={styles.adress}>
            <span className={styles.lang}>https://{k.adress}</span>
            <span className={styles.kortAdress}>{k.adress.split('/')[0]}</span>
          </span>
        </span>
        <span className={styles.bild}>
          <img src={k.bild} alt={`Sidtoppen på ${k.namn}`} width="800" height="640" loading="eager" decoding="async" />
        </span>
        <span className={styles.kropp}>
          <span className={styles.tagg}>
            <span className={styles.lang}>{k.kategori}</span>
            <span className={styles.kortTagg}>{k.kort}</span>
          </span>
          <strong>{k.namn}</strong>
        </span>
      </a>
    </li>
  );
}

export default function Portfolj() {
  return (
    <div className={styles.fonster}>
      {KOLUMNER.map((kol) => (
        <div key={kol.id} className={`${styles.kolumn} ${styles[kol.riktning]}`}>
          <ul className={styles.spar}>
            {[0, 1, 2].map((varv) =>
              kol.lista.map((k) => <Kort key={`${varv}-${k.namn}`} k={k} dubblett={varv > 0} />)
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}
