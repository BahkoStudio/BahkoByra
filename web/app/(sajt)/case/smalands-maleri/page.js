import Link from 'next/link';
import jkp from '../../webbyra-jonkoping/jonkoping.module.css';
import styles from './caseSida.module.css';

/* Kundcase: Smålands Måleri AB i Jönköping (smamaleri.se).
 *
 * NOINDEX tills platshållarna är ifyllda. Allt under "Vad vi byggde" går att
 * kontrollera i bahkobyra/cloud/smamaleri/ (index.html, README.md, sitemap.xml).
 * Resultat och citat är PLATSHÅLLARE: fyll i med verifierade siffror och ett
 * godkänt citat, ta sedan bort robots-raden nedan och lägg sidan i
 * app/sitemap-sidor.js. Hitta aldrig på siffror eller citat. */
export const metadata = {
  title: { absolute: 'Case: Smålands Måleri i Jönköping | Bahko Byrå' },
  description:
    'Så byggde Bahko Byrå smamaleri.se åt Smålands Måleri AB i Jönköping: offertflöde i mobilen, ROT-avdraget förklarat enligt Skatteverket och en sida byggd för sökningen målare i Jönköping.',
  alternates: { canonical: '/case/smalands-maleri/' },
  robots: { index: false, follow: true },
};

const PIL = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const SAJT = 'https://smamaleri.se/';

const UTGANG = [
  {
    h: 'Ingen egen plats på nätet',
    p: 'Smålands Måleri AB är ett måleriföretag i Jönköping som saknade en egen hemsida. Den som letade efter en målare i Jönköping hade ingen sida att landa på och ingen enkel väg att begära offert.',
  },
  {
    h: 'Ett namn som delas med ett annat bolag',
    p: 'Det finns ett annat aktiebolag som heter Smålands Måleri, med säte på annan ort. Sidan behövde därför göra det tydligt, för både kunder och Google, att det här är måleriföretaget i Jönköping.',
  },
  {
    h: 'Kunden vill förstå ROT först',
    p: 'Den som ska anlita en målare vill veta hur ROT-avdraget fungerar innan de hör av sig. Därför behövde avdraget förklaras rätt, med källan ett klick bort.',
  },
];

/* Verifierbart i bahkobyra/cloud/smamaleri/. */
const BYGGT = [
  'En sida på egen domän, smamaleri.se, i drift sedan juli 2026.',
  'Titeln leder med tjänst och ort, "Målare i Jönköping", eftersom det är sökningen kunderna gör.',
  'Tjänsterna fasadmålning, takmålning, taktvätt, invändig målning och tapetsering samt fasadtvätt, var för sig.',
  'Ett offertformulär som funkar i mobilen: välj tjänst, skriv namn, telefon och ort, klart.',
  'ROT-avdraget förklarat enligt Skatteverkets regler, med länk direkt till Skatteverkets sida.',
  'Arbetsgången i fyra steg: hör av dig, hembesök eller foton, kostnadsfri offert, vi målar.',
  'Vanliga frågor besvarade på sidan, bland annat vad det kostar att måla om huset.',
  'Strukturerad data som måleriföretag, med organisationsnumret och områdena Jönköping, Huskvarna, Habo, Bankeryd och Vaggeryd, så att Google kan skilja företaget från bolaget med samma namn.',
];

/* PLATSHÅLLARE. Byt mot verifierade siffror (källa + datum i kommentar), aldrig uppskattningar. */
const RESULTAT = [
  { tal: '[Siffra kommer]', etikett: 'Samtal via sidan', text: '[Period och källa kommer, t.ex. samtalsloggen eller Google-profilen.]' },
  { tal: '[Siffra kommer]', etikett: 'Förfrågningar via formuläret', text: '[Period och källa kommer.]' },
  {
    tal: '[Före] → [Efter]',
    etikett: 'Position på Google',
    text: 'Sökordet [sökord kommer, t.ex. målare Jönköping]. Före: [position kommer]. Efter: [position kommer]. [Datum för mätningen kommer.]',
  },
];

const CITAT = {
  text: '[Citat från kunden, väntar på godkännande]',
  vem: '[Namn och roll, väntar på godkännande], Smålands Måleri AB',
};

const SIDA = 'https://www.bahkobyra.se/case/smalands-maleri/';
/* Bara fakta i schemat, inga platshållare. schema.org saknar en egen
   CaseStudy-typ, så sidan är en Article med genre "Case study". */
const SIDSCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': SIDA + '#article',
      headline: 'Case: Smålands Måleri i Jönköping',
      genre: 'Case study',
      inLanguage: 'sv-SE',
      url: SIDA,
      mainEntityOfPage: SIDA,
      image: 'https://www.bahkobyra.se/img/demo-smalands-maleri.webp',
      author: { '@id': 'https://www.bahkobyra.se/#organization' },
      publisher: { '@id': 'https://www.bahkobyra.se/#organization' },
      about: {
        '@type': 'HousePainter',
        name: 'Smålands Måleri AB',
        url: SAJT,
        address: { '@type': 'PostalAddress', addressLocality: 'Jönköping', addressCountry: 'SE' },
      },
      breadcrumb: { '@id': SIDA + '#breadcrumb' },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': SIDA + '#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Start', item: 'https://www.bahkobyra.se/' },
        { '@type': 'ListItem', position: 2, name: 'Case', item: 'https://www.bahkobyra.se/case/' },
        { '@type': 'ListItem', position: 3, name: 'Smålands Måleri', item: SIDA },
      ],
    },
  ],
};

export default function CaseSmalandsMaleri() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SIDSCHEMA) }} />

      <section className={`mork ${jkp.topp}`}>
        <div className="wrap">
          <nav className={jkp.brod} aria-label="Brödsmulor">
            <Link href="/">Start</Link>
            <span aria-hidden="true">/</span>
            <Link href="/case/">Case</Link>
            <span aria-hidden="true">/</span>
            <span>Smålands Måleri</span>
          </nav>
          <span className="eyebrow">Case · Måleri · Jönköping</span>
          <h1>
            Smålands Måleri: <span className="accent">en hemsida för målare i Jönköping.</span>
          </h1>
          <p className="lede" style={{ marginTop: '1.1rem' }}>
            Bahko Byrå i Huskvarna/Jönköping byggde smamaleri.se åt Smålands Måleri AB, ett
            måleriföretag i Jönköping. Offertflöde i mobilen, ROT-avdraget förklarat enligt
            Skatteverkets regler och en sida byggd för sökningen målare i Jönköping.
          </p>
          <div className={jkp.toppKnappar}>
            <a href={SAJT} target="_blank" rel="noopener" className="btn btn-primar">
              Öppna smamaleri.se {PIL}
            </a>
            <Link href="/case/" className="btn btn-sekundar">
              Alla case
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="eyebrow">Utgångsläge</span>
          <h2>Var Smålands Måleri stod</h2>
          <div className={jkp.punktNat}>
            {UTGANG.map((u) => (
              <div key={u.h} className="kort">
                <h3>{u.h}</h3>
                <p>{u.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={jkp.ytaLjus}>
        <div className="wrap">
          <span className="eyebrow">Vad vi byggde</span>
          <h2>Det här fick Smålands Måleri</h2>
          <div className={styles.bygge}>
            <ul className={jkp.ingar}>
              {BYGGT.map((t) => (
                <li key={t}>
                  <span aria-hidden="true">✓</span>
                  {t}
                </li>
              ))}
            </ul>
            <a href={SAJT} target="_blank" rel="noopener" className={styles.bild}>
              <img
                src="/img/demo-smalands-maleri.webp"
                alt="Förhandsvisning av smamaleri.se"
                width="1200"
                height="750"
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </section>

      <section className="mork">
        <div className="wrap">
          <span className="eyebrow">Resultat</span>
          <h2>Vad sidan har gett</h2>
          <p className={styles.platsNot}>Platshållare: siffrorna fylls i när de är mätta och verifierade.</p>
          <div className={jkp.resultatNat}>
            {RESULTAT.map((r) => (
              <div key={r.etikett} className={`${jkp.resultatKort} ${styles.platsKort}`}>
                <strong className={styles.platsTal}>{r.tal}</strong>
                <span>{r.etikett}</span>
                <p>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="eyebrow">Kundcitat</span>
          <h2>Med kundens egna ord</h2>
          <figure className={styles.citat}>
            <blockquote>
              <p>{CITAT.text}</p>
            </blockquote>
            <figcaption>{CITAT.vem}</figcaption>
          </figure>
        </div>
      </section>

      <section className={jkp.ctaYta}>
        <div className="wrap">
          <div className={jkp.cta}>
            <div>
              <h3>Vill ni ha en sådan sida för ert företag?</h3>
              <p>Vi bygger ett färdigt förslag inom 48 timmar. Kostnadsfritt.</p>
              <p className={jkp.ctaSmall}>
                Företag i Jönköpingstrakten? Läs om vår{' '}
                <Link href="/webbyra-jonkoping/">webbdesign i Jönköping</Link>.
              </p>
            </div>
            <Link href="/kontakt/" className="btn btn-primar">
              Få kostnadsfritt förslag {PIL}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
