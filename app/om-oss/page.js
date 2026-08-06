import Link from 'next/link';
import styles from './om.module.css';

export const metadata = {
  title: 'Om Bahko Byrå',
  description:
    'Vi bygger hemsidor för bygg- och hantverksfirmor i Sverige. Du ser sidan innan du betalar och äger allt när den är levererad.',
  alternates: { canonical: '/om-oss/' },
};

const PIL = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const PRINCIPER = [
  {
    h: 'Förslaget först, betalningen sen',
    p: 'Vi bygger en riktig sida åt er innan ni bestämt något. Är den inte värd pengarna ser ni det direkt, och då har det inte kostat er något.',
  },
  {
    h: 'Ni äger allt',
    p: 'Sidan, domänen, texterna och bilderna är era. Inget abonnemang som håller sidan gisslan, inga månadsavgifter som rullar i bakgrunden.',
  },
  {
    h: 'Vi lovar bara det vi styr över',
    p: 'Vi kan bygga en sida som gör det lätt att höra av sig. Vi kan inte lova hur många som ringer. Därför pratar vi om vad sidan gör, inte om siffror vi hittat på.',
  },
  {
    h: 'En nisch, inte alla',
    p: 'Bygg och hantverk. Vi vet vad era kunder söker på, vad de vill se innan de ringer och varför de hoppar av. Det går inte att kunna för alla branscher samtidigt.',
  },
];

export default function OmOss() {
  return (
    <>
      <section className={`mork ${styles.topp}`}>
        <div className="wrap">
          <span className="eyebrow">Om byrån</span>
          <h1>
            Vi bygger sidor för folk som <span className="accent">jobbar med händerna.</span>
          </h1>
          <p className="lede" style={{ marginTop: '1.1rem' }}>
            Bahko Byrå är en liten svensk byrå med en tydlig nisch: bygg och hantverk. Vi gör
            hemsidor som gör det lätt för kunden att höra av sig, och vi visar dem innan ni betalar.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="eyebrow">Så tänker vi</span>
          <h2>Fyra principer vi inte gör avsteg från</h2>
          <div className={styles.nat}>
            {PRINCIPER.map((p) => (
              <div key={p.h} className="kort">
                <h3>{p.h}</h3>
                <p>{p.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.slutYta}>
        <div className="wrap">
          <div className={styles.cta}>
            <div>
              <h2>Nyfiken på hur er sida skulle se ut?</h2>
              <p>Förslaget är gratis och kommer inom 48 timmar.</p>
            </div>
            <Link href="/kontakt/" className="btn btn-primar">
              Få gratis förslag {PIL}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
