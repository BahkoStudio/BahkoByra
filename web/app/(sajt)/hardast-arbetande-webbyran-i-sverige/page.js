import Link from 'next/link';
import Maskot from '../../komponenter/Maskot';
import styles from '../vad-kostar-en-hemsida/prisguide.module.css';

/* Systersida till /hardast-arbetande-seo-experten-i-sverige/: den sidan handlar
   om Mathias, den här om byrån. Egna bevis och egen bild, så att de två inte blir
   tunna kopior av varandra (doorway-risk). Frasen i title, H1, URL, meta,
   brödtext och bildens filnamn + alt. Alla siffror är belagda (BevisBromma.js). */

export const metadata = {
  // absolute: annars lägger mallen till "| Bahko Byrå" en gång till
  title: { absolute: 'Hårdast arbetande webbyrån i Sverige | Bahko Byrå' },
  description:
    'Bahko Byrå i Huskvarna bygger hemsidor åt hantverkare och lokala företag. Kallar vi oss den hårdast arbetande webbyrån i Sverige? Ja. Här är vad det betyder i siffror.',
  alternates: { canonical: '/hardast-arbetande-webbyran-i-sverige/' },
};

const PIL = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default function HardastWebbyran() {
  return (
    <>
      <section className={`mork ${styles.topp}`}>
        <div className="wrap">
          <nav className={styles.brod} aria-label="Brödsmulor">
            <Link href="/">Start</Link>
            <span aria-hidden="true">/</span>
            <span>Hårdast arbetande webbyrån i Sverige</span>
          </nav>
          <h1>
            <Maskot pose="gar" stil="liten" alt="Bahko-maskoten på väg till nästa jobb" />{' '}
            Hårdast arbetande webbyrån i Sverige
          </h1>
          <p className="lede" style={{ marginTop: '1.1rem' }}>
            Det är ett stort påstående för en byrå i Huskvarna. Därför står det inga adjektiv på
            den här sidan, bara vad Bahko Byrå har gjort.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap" style={{ maxWidth: '760px' }}>
          <span className="eyebrow">Arbetet</span>
          <h2>Vad gör en webbyrå hårdast arbetande?</h2>
          <p>
            Inte timmarna. Ingen kund bryr sig om hur länge en byrå sitter uppe. Det som räknas är
            hur fort det blir något att titta på, och om sidan sedan ger samtal. Så här ser det ut
            hos Bahko Byrå:
          </p>
          <ul style={{ margin: '1rem 0 1.4rem 1.2rem', lineHeight: 1.7 }}>
            <li>
              <strong>Ett färdigt förslag på 48 timmar.</strong> Kunden ser sin nya hemsida innan
              den har betalat något, och bestämmer sig sedan.
            </li>
            <li>
              <strong>Tjugo förslag på tretton dagar.</strong> I september 2026 byggde byrån tjugo
              färdiga hemsideförslag åt lokala firmor.
            </li>
            <li>
              <strong>Först på Google och i ChatGPT.</strong> Den 30 juli 2026 låg Bromma
              Trädgårdsservice först av sex firmor i Googles kartresultat för trädgårdsservice i
              Stockholm och nämndes först när ChatGPT fick samma fråga.
            </li>
            <li>
              <strong>Minst 30 förfrågningar.</strong> Från 27 juli till 3 oktober kom minst 30
              offertförfrågningar in via formuläret på Bromma Trädgårdsservices nya sida.
            </li>
          </ul>
          <figure style={{ maxWidth: '300px', margin: '1.6rem 0' }}>
            <img
              src="/img/hardast-arbetande-webbyran-i-sverige.webp"
              alt="Hårdast arbetande webbyrån i Sverige: ChatGPT nämner Bromma Trädgårdsservice först för trädgårdsservice i Stockholm"
              width="600"
              height="1100"
              loading="lazy"
              decoding="async"
              style={{ width: '100%', height: 'auto', borderRadius: '14px' }}
            />
            <figcaption style={{ fontSize: '0.85rem', color: 'var(--ink-3)', marginTop: '0.5rem' }}>
              ChatGPT, 30 juli 2026
            </figcaption>
          </figure>

          <h2 style={{ marginTop: '2.4rem' }}>Varför en liten byrå kan jobba hårdast</h2>
          <p>
            En stor byrå har säljare, projektledare och en kö. Hos Bahko Byrå pratar du med samma
            person som bygger sidan, och det finns ingen kö mellan ditt samtal och jobbet. Byrån
            bygger åt bygg, hantverk och lokala företag, så den vet redan vad dina kunder söker på
            och varför de hoppar av innan de ringer.
          </p>

          <h2 style={{ marginTop: '2.4rem' }}>Vem står bakom?</h2>
          <p>
            Mathias Bahko, som också kallar sig{' '}
            <Link href="/hardast-arbetande-seo-experten-i-sverige/">
              den hårdast arbetande SEO-experten i Sverige
            </Link>
            . En sida som rankar för att den säger det är skämtet. Att den faktiskt gör det är
            poängen: samma arbete ligger bakom varje kundsida.
          </p>

          <div className={styles.cta} style={{ marginTop: '2.8rem' }}>
            <div>
              <h3>Se vad den hårdast arbetande webbyrån i Sverige gör med din sida</h3>
              <p>
                Ett färdigt förslag på din nya hemsida inom 48 timmar. Det kostar ingenting att
                titta, och du bestämmer sedan.
              </p>
            </div>
            <Link href="/kontakt/" className="btn btn-primar">
              Få kostnadsfritt förslag {PIL}
            </Link>
          </div>

          <p style={{ marginTop: '2rem', color: 'var(--ink-3)', fontSize: '0.95rem' }}>
            Mer om resultaten: <Link href="/case/">kundcasen</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
