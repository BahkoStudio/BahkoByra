import Link from 'next/link';
import styles from '../forslag/forslag.module.css';

/* /mobiltestet: åtta steg att testa sin egen hemsida i mobilen (2026-11-03).
   Texten är ordagrann, inget ord ändrat. Bara knappen till /forslag/ är tillagd.
   Layouten lånar /forslag/ (forslag.module.css och kontakt.module.css).
   og-bilden görs som för /sveriges-vardefullaste-hemsidor/: public/og/<sida>.png, 1200x630.
   Inga priser, inga procent, inga tankstreck. */

const TITEL = 'Mobiltestet: testa din hemsida på tio minuter | Bahko Byrå';
const BESKRIVNING =
  'Ta fram mobilen och öppna din sida som en ny kund. Åtta enkla tester som visar var din hemsida tappar kunder och var du ska börja.';

const OG_BILD = '/og/mobiltestet.png';

export const metadata = {
  title: { absolute: TITEL },
  description: BESKRIVNING,
  alternates: { canonical: '/mobiltestet/' },
  openGraph: {
    title: TITEL,
    description: BESKRIVNING,
    url: '/mobiltestet/',
    images: [{ url: OG_BILD, width: 1200, height: 630, alt: 'Mobiltestet. Tio minuter med din egen hemsida.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITEL,
    description: BESKRIVNING,
    images: [OG_BILD],
  },
};

const STEG_TEXT = [
  'Läs bara det du ser utan att scrolla. Förstår du vad firman gör och var?',
  'Syns ert jobb? En bild eller en film från ett riktigt uppdrag säger mer än en text.',
  'Hur länge väntar du innan sidan är klar? Testa på pagespeed.web.dev och välj mobil.',
  'Tryck på numret. Ringer det rätt?',
  'Fyll i formuläret med tummen och skicka det till dig själv. Kom det ett svar direkt?',
  'Tryck på varje ikon längst ner. Vart hamnar du?',
  'Leta efter gamla datum. Ett erbjudande från förra året säger att ingen är hemma.',
  'Googla det du gör och din ort, till exempel "målare Jönköping". Var hamnar du?',
];

/* Steg 3 visas med länk, texten är densamma. */
function Steg({ text }) {
  const ord = 'pagespeed.web.dev';
  const i = text.indexOf(ord);
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <a href="https://pagespeed.web.dev/" target="_blank" rel="noopener noreferrer">{ord}</a>
      {text.slice(i + ord.length)}
    </>
  );
}

const SIDA = 'https://www.bahkobyra.se/mobiltestet/';
const SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': SIDA + '#webpage',
    url: SIDA,
    name: TITEL,
    description: BESKRIVNING,
    inLanguage: 'sv-SE',
    about: { '@id': 'https://www.bahkobyra.se/#organization' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': SIDA + '#howto',
    name: 'Mobiltestet',
    description: 'Tio minuter med din egen hemsida.',
    inLanguage: 'sv-SE',
    totalTime: 'PT10M',
    image: 'https://www.bahkobyra.se' + OG_BILD,
    step: STEG_TEXT.map((t, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: `Steg ${i + 1}`,
      text: t,
      url: SIDA + '#steg-' + (i + 1),
    })),
  },
];

export default function Mobiltestet() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <section className={`mork ${styles.topp}`}>
        <div className="wrap">
          <div data-trapp>
            <span className="eyebrow">Mobiltestet</span>
            <h1>
              Mobiltestet. <span className="accent">Tio minuter med din egen hemsida.</span>
            </h1>
            <p className="lede" style={{ marginTop: '1.1rem' }}>
              Ta fram mobilen. Öppna din sida som om du vore en kund som aldrig hört talas om dig.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <ol className={styles.nat} style={{ listStyle: 'none' }}>
            {STEG_TEXT.map((t, i) => (
              <li key={i} id={`steg-${i + 1}`} className="kort">
                <h3>{i + 1}.</h3>
                <p><Steg text={t} /></p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.ytaLjus}>
        <div className="wrap">
          <figure className={styles.bevis}>
            <p>Fick du nej på något? Börja där.</p>
          </figure>
        </div>
      </section>

      <section>
        <div className="wrap">
          <p className={styles.brodtext} style={{ marginTop: 0 }}>
            Vill du att jag gör testet åt dig? Skriv "förslag" under något av mina inlägg så skickar
            jag dig ett gratis förslag i DM på hur din hemsida kan ge dig fler kunder.
          </p>
          <p style={{ marginTop: '1.6rem' }}>
            <Link href="/forslag/" className="btn btn-primar">Få ett gratis förslag</Link>
          </p>
        </div>
      </section>
    </>
  );
}
