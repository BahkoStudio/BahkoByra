import Link from 'next/link';
import Maskot from '../../komponenter/Maskot';
import DemoFormular from '../../komponenter/DemoFormular';
import { NYCKEL_KONTAKT } from '../../formular';
import styles from './kontakt.module.css';

export const metadata = {
  title: 'Få ett kostnadsfritt hemsideförslag',
  description:
    'Berätta kort om er firma så bygger vi ett förslag på er nya hemsida och skickar det inom 48 timmar. Kostnadsfritt och utan krav.',
  alternates: { canonical: '/kontakt/' },
};

const AMNE = 'Ny förfrågan om kostnadsfritt hemsideförslag';
const MAILTO =
  'mailto:mathias@bahkobyra.se?subject=' + encodeURIComponent(AMNE);

const LOFTEN = [
  'Förslaget är kostnadsfritt och binder er inte vid något',
  'Ni ser hela sidan innan ni bestämmer er',
  'Svar inom 24 timmar, förslag inom 48',
];

export default function Kontakt() {
  return (
    <section className={styles.yta}>
      <div className={`wrap ${styles.inner}`}>
        <div data-trapp>
          <span className="eyebrow">Kostnadsfritt förslag</span>
          <h1>Se er nya sida innan ni bestämmer er.</h1>
          <p className="lede" style={{ marginTop: '1.1rem' }}>
            Berätta kort om firman så bygger vi ett förslag och skickar det inom 48 timmar.
            Gillar ni det kör vi. Gillar ni det inte kostar det ingenting.
          </p>

          <ul className={styles.loften}>
            {LOFTEN.map((l) => (
              <li key={l}>
                <span aria-hidden="true">✓</span>
                {l}
              </li>
            ))}
          </ul>

          <p className={styles.maskotRad}>
            <Maskot pose="vinkar" stil="stor" alt="Bahko-maskoten vinkar" />
            <span>Vi läser varje förfrågan själva. Ingen bot, ingen säljavdelning.</span>
          </p>

          <p className={styles.direkt}>
            Hellre prata direkt? Ring <a href="tel:+46762540951">076-254 09 51</a> eller mejla{' '}
            <a href="mailto:mathias@bahkobyra.se">mathias@bahkobyra.se</a>. Kontoret på
            Kungsängsvägen 27 i Huskvarna har öppet alla dagar 9–18.
          </p>
        </div>

        <div className={styles.formYta} data-avsloja="upp">
          <DemoFormular
            className={styles.form}
            amne={AMNE}
            nyckel={NYCKEL_KONTAKT}
            tel="076-254 09 51"
            fran="bahkobyra.se"
            tack
            kvittens={
              <>
                <p className={styles.kvittensRubrik}>Tack! Nu är det hos oss.</p>
                <p>Vi läser varje förfrågan själva och hör av oss inom 24 timmar. Ert förslag är klart inom 48.</p>
                <p className={styles.finstilt}>Har ni bråttom går det bra att ringa eller mejla mathias@bahkobyra.se direkt.</p>
              </>
            }
          >
            <div className={styles.rad}>
              <label>
                Namn
                <input type="text" name="namn" required autoComplete="name" placeholder="Anna Svensson" />
              </label>
              <label>
                Telefon
                <input type="tel" name="telefon" autoComplete="tel" placeholder="070 000 00 00" />
              </label>
            </div>
            <label>
              Företag
              <input type="text" name="foretag" required placeholder="Svenssons Bygg AB" />
            </label>
            <label>
              E-post
              <input type="email" name="email" required autoComplete="email" placeholder="anna@svenssonsbygg.se" />
            </label>
            <label>
              Har ni en sida idag? Vad vill ni få ut av den nya?
              <textarea name="meddelande" rows="4" placeholder="Berätta kort om vad ni gör och var ni jobbar." />
            </label>


            <button type="submit" className="btn btn-primar">
              Skicka förfrågan
            </button>
            <p className={styles.finstilt}>
              Vi använder uppgifterna för att kontakta er om förslaget. Inget nyhetsbrev, ingen
              vidareförsäljning. <Link href="/integritet/">Så hanterar vi uppgifterna</Link>.
            </p>
          </DemoFormular>
        </div>
      </div>
    </section>
  );
}
