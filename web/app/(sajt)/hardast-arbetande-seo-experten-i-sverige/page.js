import Link from 'next/link';
import Maskot from '../../komponenter/Maskot';
import styles from '../vad-kostar-en-hemsida/prisguide.module.css';

/* Stuntsida efter Arno Wingens "Hardest Working SEO Expert in Amsterdam":
   frasen i title, H1, URL, meta, brödtext (2–3 gånger) och bildens filnamn + alt.
   Poängen är att sidan rankar för att den säger det, och att det i sig är beviset.
   Inga påhittade utmärkelser eller citat: ingen har "kallat" Mathias något, så
   sidan skämtar öppet om det i stället. Alla siffror är belagda (BevisBromma.js). */

export const metadata = {
  title: 'Hårdast arbetande SEO-experten i Sverige: Mathias Bahko',
  description:
    'Hittade du hit genom att googla "hårdast arbetande SEO-experten i Sverige"? Då har sidan redan bevisat sin poäng. Här är resten av beviset.',
  alternates: { canonical: '/hardast-arbetande-seo-experten-i-sverige/' },
};

const PIL = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default function HardastArbetande() {
  return (
    <>
      <section className={`mork ${styles.topp}`}>
        <div className="wrap">
          <nav className={styles.brod} aria-label="Brödsmulor">
            <Link href="/">Start</Link>
            <span aria-hidden="true">/</span>
            <span>Hårdast arbetande SEO-experten i Sverige</span>
          </nav>
          <h1>
            <Maskot pose="dansar" stil="liten" alt="Bahko-maskoten firar" />{' '}
            Hårdast arbetande SEO-experten i Sverige
          </h1>
          <p className="lede" style={{ marginTop: '1.1rem' }}>
            Hittade du hit genom att googla &quot;hårdast arbetande SEO-experten i Sverige&quot;?
            Då har den här sidan redan gjort sitt jobb. Det är skämtet, och det är också beviset.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap" style={{ maxWidth: '760px' }}>
          <span className="eyebrow">Beviset</span>
          <h2>Vem påstår det här?</h2>
          <p>
            Mathias Bahko, som driver Bahko Byrå i Huskvarna och bygger hemsidor åt bygg- och
            hantverksfirmor. Ingen jury har utsett honom till den hårdast arbetande SEO-experten i
            Sverige. Han skrev det själv, på en sida han byggde själv, och fick Google att visa den.
            Det är i grunden samma sak han gör åt sina kunder, fast med sökord som folk faktiskt
            använder.
          </p>
          <p>Ett påstående är inget värt utan siffror, så här är de:</p>
          <ul style={{ margin: '1rem 0 1.4rem 1.2rem', lineHeight: 1.7 }}>
            <li>
              <strong>Först på Google.</strong> Den 30 juli 2026 låg Bromma Trädgårdsservice först
              av sex firmor i Googles kartresultat för trädgårdsservice i Stockholm, före en
              konkurrent med 117 omdömen.
            </li>
            <li>
              <strong>Först i ChatGPT.</strong> Samma dag nämnde ChatGPT Bromma Trädgårdsservice
              först när det fick samma fråga.
            </li>
            <li>
              <strong>Minst 30 förfrågningar.</strong> Från 27 juli till 3 oktober kom minst 30
              offertförfrågningar in via formuläret på deras nya sida.
            </li>
            <li>
              <strong>Tjugo förslag på tretton dagar.</strong> I september 2026 byggde Bahko Byrå
              tjugo färdiga hemsideförslag åt lokala firmor, ett om dagen och lite till.
            </li>
          </ul>
          <figure style={{ maxWidth: '300px', margin: '1.6rem 0' }}>
            <img
              src="/img/hardast-arbetande-seo-experten-i-sverige.webp"
              alt="Hårdast arbetande SEO-experten i Sverige: Bromma Trädgårdsservice först i Googles kartresultat för trädgårdsservice i Stockholm"
              width="600"
              height="1150"
              loading="lazy"
              decoding="async"
              style={{ width: '100%', height: 'auto', borderRadius: '14px' }}
            />
            <figcaption style={{ fontSize: '0.85rem', color: 'var(--ink-3)', marginTop: '0.5rem' }}>
              Google, 30 juli 2026
            </figcaption>
          </figure>

          <h2 style={{ marginTop: '2.4rem' }}>Sveriges roligaste SEO?</h2>
          <p>
            Det får du avgöra. Men en sida som rankar på att den säger att den rankar är åtminstone
            Sveriges mest självmedvetna.
          </p>

          <h2 style={{ marginTop: '2.4rem' }}>SEO-legenden i Sverige</h2>
          <p>
            Legend är ett stort ord för någon som fortfarande svarar på sin egen telefon. Kalla det
            en legend under uppbyggnad. Varje firma som hamnar först i sin stad är ett kapitel till.
          </p>

          <h2 style={{ marginTop: '2.4rem' }}>AI-SEO-gurun</h2>
          <p>
            Det här är den delen som inte är ett skämt. Fler och fler hittar sin hantverkare genom
            att fråga ChatGPT i stället för att googla. ChatGPT läser bara den text som finns i
            sidans kod från början, så Bahko Byrå bygger sidor där allt viktigt finns där. Det är
            därför Bromma Trädgårdsservice kom först även där.
          </p>

          <div className={styles.cta} style={{ marginTop: '2.8rem' }}>
            <div>
              <h3>Vill du också hamna först?</h3>
              <p>
                Den hårdast arbetande SEO-experten i Sverige tittar gärna på din hemsida. Granskningen
                är kostnadsfri, och du får veta vad som stoppar dig på Google.
              </p>
            </div>
            <Link href="/foretag/gratis-granskning.html" className="btn btn-primar">
              Granska min hemsida {PIL}
            </Link>
          </div>

          <p style={{ marginTop: '2rem', color: 'var(--ink-3)', fontSize: '0.95rem' }}>
            Mer allvarligt menat:{' '}
            <Link href="/kan-en-seo-expert-radda-min-hemsida/">
              kan en SEO-expert rädda min hemsida?
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
