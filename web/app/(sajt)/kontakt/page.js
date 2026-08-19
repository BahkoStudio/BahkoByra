import Maskot from '../../komponenter/Maskot';
import styles from './kontakt.module.css';

export const metadata = {
  title: 'Få ett gratis hemsideförslag',
  description:
    'Berätta kort om er firma så bygger vi ett förslag på er nya hemsida och skickar det inom 48 timmar. Kostnadsfritt och utan krav.',
  alternates: { canonical: '/kontakt/' },
};

const LOFTEN = [
  'Förslaget är gratis och binder er inte vid något',
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
            <Maskot pose="vinkar" stil="liten" alt="Bahko-maskoten vinkar" />
            <span>Vi läser varje förfrågan själva. Ingen bot, ingen säljavdelning.</span>
          </p>

          <p className={styles.direkt}>
            Hellre prata direkt? Ring <a href="tel:+46762540951">076-254 09 51</a> eller mejla{' '}
            <a href="mailto:mathias@bahkobyra.se">mathias@bahkobyra.se</a>. Kontoret på
            Kungsängsvägen 27 i Huskvarna har öppet alla dagar 9–18.
          </p>
        </div>

        <div className={styles.formYta} data-avsloja="upp">
          <form action="https://formspree.io/f/mgonrnep" method="POST" className={styles.form}>
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

            {/* Honeypot mot skräppost. Syns inte för människor. */}
            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className={styles.gotcha}
            />
            <input type="hidden" name="_subject" value="Ny förfrågan om gratis hemsideförslag" />

            <button type="submit" className="btn btn-primar">
              Skicka förfrågan
            </button>
            <p className={styles.finstilt}>
              Vi använder uppgifterna för att kontakta er om förslaget. Inget nyhetsbrev, ingen
              vidareförsäljning.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
