import Link from 'next/link';
import styles from '../forslag/forslag.module.css';

/* /sveriges-vardefullaste-hemsidor: listans sida (SEO-desk 2026-10-31).
   Regler: frasen används bara som listans namn, aldrig som slogan om byrån.
   maykagulo.se visas som vårt eget case (jäv), inte som rankad etta. Inga poäng,
   inga resultatsiffror, inga tankstreck. Vikterna nedan är metoden, inte mätdata. */

const TITEL = 'Sveriges värdefullaste hemsidor: så mäter vi affärsvärde | Bahko Byrå';
const BESKRIVNING =
  'Sveriges värdefullaste hemsidor är en lista över svenska småföretags hemsidor, bedömda efter affärsvärde och inte trafik. Öppen metod med sju kriterier och 0 till 100 poäng.';

export const metadata = {
  title: { absolute: TITEL },
  description: BESKRIVNING,
  alternates: { canonical: '/sveriges-vardefullaste-hemsidor/' },
  openGraph: { title: TITEL, description: BESKRIVNING, url: '/sveriges-vardefullaste-hemsidor/' },
};

const DEFINITION =
  'Sveriges värdefullaste hemsidor är Bahko Byrås lista över svenska småföretags hemsidor, bedömda efter affärsvärde, inte trafik. Varje sajt får 0 till 100 poäng på sju kriterier: tydligt erbjudande, hastighet, mobil och tillgänglighet, kontaktvägar, förtroende, SEO-grunder och video. Metoden är öppen.';

const KRITERIER = [
  { h: 'Tydligt erbjudande', v: 15, p: 'Förstår du på första skärmen vad företaget gör, för vem och vad nästa steg är, utan att scrolla? Två personer bedömer och vi tar snittet.' },
  { h: 'Hastighet', v: 20, p: 'Core Web Vitals i mobilen via PageSpeed Insights. Fältdata när det finns, annars labbdata. Tre körningar och medianen räknas.' },
  { h: 'Mobil och tillgänglighet', v: 10, p: 'Lighthouse tillgänglighet i mobil, viewport och tryckytor som går att träffa med tummen.' },
  { h: 'Kontaktvägar', v: 15, p: 'Tydliga knappar ovanför vecket, klickbart nummer och mejl, formulär och ett svarslöfte.' },
  { h: 'Förtroende', v: 15, p: 'Recensioner, kundcase, namngivna referenser, organisationsnummer och kontaktuppgifter.' },
  { h: 'SEO-grunder', v: 15, p: 'Title, meta, H1, canonical, sitemap, robots, schema och samma kontaktuppgifter överallt. För lokala företag även Google Företagsprofil.' },
  { h: 'Video', v: 10, p: 'Finns egen video ovanför vecket eller på viktiga sidor, och laddas den utan att göra sidan långsam?' },
];

const FAQ = [
  { q: 'Vad är Sveriges värdefullaste hemsidor?', a: DEFINITION },
  { q: 'Hur väljs sajterna?', a: 'Sajter nomineras, av företagen själva eller av oss. Alla bedöms med samma sju kriterier och metoden är öppen.' },
  { q: 'Vem står bakom listan och finns det jäv?', a: 'Bahko Byrå i Huskvarna/Jönköping står bakom listan. Sajter som vi själva har byggt redovisas öppet som våra egna case och rankas inte som oberoende.' },
  { q: 'Hur mäts hastighet?', a: 'Med PageSpeed Insights i mobil. Vi använder fältdata från riktiga besökare när det finns, annars labbdata, och räknar medianen av tre körningar.' },
  { q: 'Kan jag förbättra min plats?', a: 'Ja. Varje kriterium går att jobba med: ett tydligare erbjudande, en snabbare sida, enklare kontaktvägar, fler synliga bevis och bättre SEO-grunder.' },
  { q: 'Varför inte trafik eller domänvärde?', a: 'Trafik säger hur många som kommer. Affärsvärde säger hur många som blir kunder. Ett lokalt företag behöver inte miljoner besök, utan rätt besökare som hör av sig.' },
];

const SIDA = 'https://www.bahkobyra.se/sveriges-vardefullaste-hemsidor/';
const SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': SIDA + '#webpage',
    url: SIDA,
    name: TITEL,
    description: BESKRIVNING,
    inLanguage: 'sv-SE',
    datePublished: '2026-10-31',
    dateModified: '2026-10-31',
    publisher: { '@id': 'https://www.bahkobyra.se/#organization' },
    mainEntity: { '@id': SIDA + '#kriterier' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': SIDA + '#kriterier',
    name: 'Sveriges värdefullaste hemsidor: de sju kriterierna',
    numberOfItems: KRITERIER.length,
    itemListElement: KRITERIER.map((k, i) => ({ '@type': 'ListItem', position: i + 1, name: k.h, description: k.p })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': SIDA + '#faq',
    mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  },
];

export default function VardefullasteHemsidor() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <section className={`mork ${styles.topp}`}>
        <div className="wrap" data-trapp>
          <span className="eyebrow">Hemsidor som är värda något</span>
          <h1>
            Sveriges värdefullaste <span className="accent">hemsidor.</span>
          </h1>
          <p className="lede" style={{ maxWidth: '62ch' }}>{DEFINITION}</p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2>Så poängsätter vi: sju kriterier, 0 till 100</h2>
          <p className={styles.brodtext}>
            Varje kriterium får 0 till 5 poäng. Poängen delas med 5 och gångras med kriteriets vikt.
            Vikterna blir tillsammans 100. Allt kontrolleras med publika verktyg, och datum och rådata sparas.
          </p>
          <ul className={styles.nat}>
            {KRITERIER.map((k) => (
              <li key={k.h} className="kort">
                <h3>{k.h} (vikt {k.v})</h3>
                <p>{k.p}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mork">
        <div className="wrap">
          <h2>Trafikvärde eller affärsvärde?</h2>
          <p className={styles.brodtext} style={{ color: 'var(--text-lag)' }}>
            Många listor över värdefulla sajter räknar trafik eller domänvärde. Då hamnar banker,
            tidningar och stora butiker högst. Det säger mycket om hur många som besöker en sida, men
            lite om vad den gör för ett småföretag.
          </p>
          <p className={styles.brodtext} style={{ color: 'var(--text-lag)' }}>
            Den här listan mäter affärsvärde. Förstår besökaren vad du erbjuder? Laddar sidan snabbt i
            mobilen? Är det lätt att ringa eller skriva? Finns det bevis för att du gör ett bra jobb? En
            sida med få besökare kan vara mer värd för ditt företag än en med många, om fler av dem hör av sig.
          </p>
        </div>
      </section>

      <section className={styles.ytaLjus}>
        <div className="wrap">
          <h2>Vårt eget case: maykagulo.se</h2>
          <p className={styles.brodtext}>
            Vi har byggt maykagulo.se, sajten för matkreatören Mayka Gulo och kokboken Maykas gröna kök.
            Eftersom vi byggt den visar vi den som vårt eget case och rankar den inte bland de oberoende sajterna.
          </p>
          <p className={styles.brodtext}>
            Sajten har recept, information om boken och en väg för samarbetsförfrågningar via mejl. Den har
            title och metabeskrivning, sitemap, robots.txt, strukturerad data för webbplats, organisation,
            person och bok, bilder som laddas först när de behövs och egna videoinslag.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2>Nominera din sajt</h2>
          <p className={styles.brodtext}>
            Vill du att din hemsida ska bedömas? Hör av dig så tittar vi på den med samma sju kriterier.
            Du behöver inte länka till oss för att komma med.
          </p>
          <p className={styles.brodtext}>
            <Link href="/kontakt/" className="btn btn-primar">Nominera via kontakt</Link>
          </p>
        </div>
      </section>

      <section className="mork">
        <div className="wrap">
          <h2>Vanliga frågor</h2>
          <ul className={`${styles.nat} ${styles.tre}`}>
            {FAQ.map((f) => (
              <li key={f.q} className="kort">
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
