import ForslagFormular from './ForslagFormular';
import kontaktStil from '../kontakt/kontakt.module.css';
import styles from './forslag.module.css';

/* /forslag: landningssidan för LinkedIn-erbjudandet "förslag" (Mathias 2026-10-28).
   Texten är Tillväxtskribentens utkast 2026-10-28, ordagrant utom där regeln
   säger annat: 35+ (samma tal som i FAQ:n), inga priser, inga procent, inga tankstreck.
   Formuläret delar stil med /kontakt/ och skickas på samma sätt (Web3Forms). */

const TITEL = 'Gratis förslag: så ger din hemsida fler kunder | Bahko Byrå';
const BESKRIVNING =
  'Skicka adressen till din hemsida. Inom 48 timmar får du ett gratis förslag i DM på LinkedIn om hur sidan kan ge dig fler kunder.';

export const metadata = {
  /* absolute: layoutens mall lägger annars till "| Bahko Byrå" en gång till. */
  title: { absolute: TITEL },
  description: BESKRIVNING,
  alternates: { canonical: '/forslag/' },
  openGraph: { title: TITEL, description: BESKRIVNING, url: '/forslag/' },
};

const TITTAR = [
  { h: 'Första skärmen.', p: 'Förstår man vad du gör och var, innan man har scrollat?' },
  { h: 'Numret.', p: 'Syns det direkt? Ringer det rätt när man trycker? Jag har sett en ringknapp som ringde 123-456-7890.' },
  { h: 'Formuläret.', p: 'Går det att fylla i med tummen?' },
  { h: 'Google.', p: 'Vad kommer upp när någon söker på det du gör i din stad?' },
];

const FAR = [
  { h: 'Video först.', p: 'Kunden ser ditt jobb innan hen läser ett ord.' },
  { h: 'Snabb i mobilen.', p: 'Sidan laddar direkt.' },
  { h: 'Byggd som kunden bestämmer sig.', p: 'Det som får hen att välja just dig står högst upp.' },
  { h: 'Orden folk skriver i Google.', p: 'Så att du syns där de letar.' },
  { h: 'Mejl som jobbar efteråt.', p: 'Den som frågade blir kund. Den som blev kund kommer tillbaka.' },
  { h: 'Underhåll varje månad.', p: 'Jag sköter sidan och håller den uppdaterad.' },
];

/* Strukturerad data: bara sidan själv. Organisationen finns i layouten (@id #organization).
   Ingen FAQ på sidan, alltså inget FAQPage-schema. */
const SIDA = 'https://www.bahkobyra.se/forslag/';
const SIDSCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': SIDA + '#webpage',
  url: SIDA,
  name: TITEL,
  description: BESKRIVNING,
  inLanguage: 'sv-SE',
  about: { '@id': 'https://www.bahkobyra.se/#organization' },
};

export default function Forslag() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SIDSCHEMA) }} />

      <section className={`mork ${styles.topp}`}>
        <div className={`wrap ${kontaktStil.inner}`}>
          <div data-trapp>
            <span className="eyebrow">Gratis förslag</span>
            <h1>
              Gratis förslag på hur din hemsida ger dig <span className="accent">fler kunder.</span>
            </h1>
            <p className={styles.under}>
              Inom 48 timmar. I DM på LinkedIn, eller i mejlen om du inte har LinkedIn. Hela Sverige.
            </p>
            <p className="lede">
              Jag öppnar din sida i mobilen, som en kund gör. Jag letar efter numret och trycker på det.
            </p>
            <p className="lede" style={{ marginTop: '0.8rem' }}>
              Sedan skriver jag vad jag skulle ändra först, och varför. Gratis och utan förpliktelse.
            </p>
          </div>

          <div className={kontaktStil.formYta} id="formular" data-avsloja="upp">
            <ForslagFormular />
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2>Det här tittar jag på</h2>
          <ul className={styles.nat}>
            {TITTAR.map((t) => (
              <li key={t.h} className="kort">
                <h3>{t.h}</h3>
                <p>{t.p}</p>
              </li>
            ))}
          </ul>
          <p className={styles.brodtext}>
            Förslaget säger vad jag skulle ändra först, och varför. Kort och på svenska. Sedan
            bestämmer du själv om du vill höra mer.
          </p>
        </div>
      </section>

      <section className="mork">
        <div className="wrap">
          <h2>Det här får du med en sida från Bahko Byrå</h2>
          <ul className={`${styles.nat} ${styles.tre}`}>
            {FAR.map((f) => (
              <li key={f.h} className="kort">
                <h3>{f.h}</h3>
                <p>{f.p}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.ytaLjus}>
        <div className="wrap">
          <figure className={styles.bevis}>
            <p>En trädgårdsfirma i Stockholm har fått 35+ förfrågningar via sin nya hemsida sedan juli.</p>
            <figcaption>Räknat från 27 juli 2026, egna tester borträknade.</figcaption>
          </figure>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className={styles.jag}>
            {/* Mathias valde fotot 2026-10-28 (stillbild ur hans video). 800x1000 webp, visas cirka 220 px brett. */}
            <img
              src="/img/mathias-bahko.webp"
              alt="Mathias Bahko, Bahkobyrå"
              width="800"
              height="1000"
              loading="lazy"
              decoding="async"
              className={styles.foto}
            />
            <div>
              <h2 className={styles.jagRubrik}>Vem jag är</h2>
              <p>
                Jag heter Mathias Bahko och driver Bahko Byrå i Huskvarna. Jag bygger hemsidor åt
                småföretag i hela Sverige, oftast åt hantverkare.
              </p>
              <p className={styles.kontaktRad}>
                <a href="tel:+46762540951">076-254 09 51</a> ·{' '}
                <a href="mailto:mathias@bahkobyra.se">mathias@bahkobyra.se</a> · Kungsängsvägen 27, Huskvarna
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
