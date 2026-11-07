import Quiz from '../../komponenter/Quiz';
import styles from './page.module.css';

export const metadata = {
  title: 'Var läcker jobben? Fem frågor, ett svar',
  description:
    'Fem snabba frågor om hur kunderna hittar er i dag. Ni får ett svar i klartext på var förfrågningarna försvinner, och ett kostnadsfritt förslag om ni vill.',
  alternates: { canonical: '/var-lacker-jobben/' },
};

export default function VarLackerJobben() {
  return (
    <section className={`mork ${styles.yta}`}>
      <div className="wrap">
        <div className={styles.intro}>
          <span className="eyebrow">Fem frågor, inget att skriva</span>
          <h1>Var läcker jobben?</h1>
          <p className="lede">
            Svara med ett tryck per fråga. Ni får ett svar i klartext på var förfrågningarna försvinner,
            och ett kostnadsfritt förslag om ni vill ha det.
          </p>
        </div>
        <Quiz />
      </div>
    </section>
  );
}
