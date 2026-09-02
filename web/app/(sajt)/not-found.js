import Link from 'next/link';
import Maskot from '../komponenter/Maskot';
import styles from './not-found.module.css';

export const metadata = {
  title: 'Sidan finns inte',
  robots: { index: false, follow: true },
};

/* 404: maskoten är nollan i 404 och rycker på axlarna. Ett steg tillbaka
   till startsidan, inget mer — sidan ska inte se ut som ett fel i sajten. */
export default function SaknasSida() {
  return (
    <section className={`mork ${styles.yta}`}>
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.siffror} aria-label="404">
          <span>4</span>
          <Maskot pose="rycker" stil="stor" alt="Bahko-maskoten rycker på axlarna" />
          <span>4</span>
        </div>
        <h1>Den här sidan har jag inte byggt än.</h1>
        <p className="lede">Kolla adressen, eller börja från startsidan.</p>
        <Link href="/" className="btn btn-primar">
          Till startsidan
        </Link>
      </div>
    </section>
  );
}
