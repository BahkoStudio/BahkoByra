import styles from './Omdomen.module.css';

/* Omdömen på Google som klisterlappar i ett band som rullar från höger till vänster
   (Mathias 2026-11-14: "så som vi gjorde på vår senaste demo med omdömen som klisterlappar
   i band stil"). Samma lappar som demomallens omdomen.lappar: fyra pappersfärger, lätt
   snedställda, en tejpbit upptill. Paus när man håller musen över, stilla och sidledsskroll
   vid minskad rörelse.

   Texterna är ordagranna från Bahko Byrås Google-profil, stavning och allt. Lägg nya överst.
   Inget review-schema: egna omdömen får inte märkas upp (svartlistan i /optimering). */
const GOOGLE = 'https://g.page/r/CY8e778hr3z7EAE';

const OMDOMEN = [
  {
    namn: 'Kakel 0413 AB',
    text: 'Vi på Kakel 0413 AB är jättenöjda med Bahko Byrå och Matias som har hjälpt oss med vår hemsida. Matias är väldigt trevlig, duktig och alltid hjälpsam. Oavsett vilken tid på dygnet vi behöver hjälp finns han där, även på kvällar och helger. Vi rekommenderar verkligen Matias och Bahko Byrå!',
  },
  {
    namn: 'Jens Amnesten',
    fran: 'Bromma Trädgårdsservice',
    text: 'Vi på Bromma Trädgårdsservice är väldigt glada över samarbetet med Bahko Byrå. Vi uppskattar hur lätt det är att bolla idéer med er och att ni tar er tid att förstå vad vi vill förmedla till våra kunder. Det märks att ni bryr er om både vårt företag och resultatet. Stort tack för ert engagemang och för hjälpen med att göra oss mer synliga på nätet. Vi ser fram emot att fortsätta jobba tillsammans och rekommenderar er varmt! ⭐',
  },
  {
    namn: 'Peter Winqvist',
    fran: 'Proffsmaskiner AB, Sollentuna',
    text: 'Vi är otroligt nöjda med Bahkos Byrås arbete! De har skapat en hemsida som överträffade alla våra förväntningar. Deras engagemang, lyhördhet och fantastiska service har varit imponerande från början till slut. Man känner verkligen att de brinner för det de gör och gör det lilla extra för att kunden ska bli nöjd. Vi kan varmt rekommendera Bahko Byrå!',
  },
  {
    namn: 'Mayka Gulo',
    text: 'Verkligen ett toppenjobb!! 😍 Jag är så himla nöjd med min hemsida och servicen är helt fantastisk! Alltid lika hjälpsamma och tillgängliga när jag behöver hjälp. Känner mig verkligen väl omhändertagen från början till slut. Rekommenderar starkt! ❤️',
  },
  {
    namn: 'GD Måleri Sthlm AB',
    text: 'Mycket nöjda med hans prestationer..Vi är glada av att hittat ett bra samarbete med Bahko byrå som byggt hela våran hemsida gigantisk..Kan starkt rekommendera honom',
  },
  {
    namn: 'Andro Naman',
    text: 'Imponerande arbete. Tydlig kvalitet och genomtänkt från start till mål. vår nya sida skapat av BahkoByrå:',
  },
  {
    namn: 'B B',
    text: 'Topp kvalité, super nöjd över arbetet! Rekommenderar starkt!',
  },
];

function GoogleG() {
  return (
    <svg className={styles.g} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

function Stjarnor() {
  return (
    <span className={styles.stjarnor} role="img" aria-label="5 av 5 stjärnor">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 20 20" aria-hidden="true">
          <path d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8z" />
        </svg>
      ))}
    </span>
  );
}

export default function Omdomen() {
  /* Listan läggs två gånger i varje grupp så att en grupp alltid är bredare än fönstret,
     annars syns en lucka i bandet på breda skärmar. Bara första varvet läses upp. */
  const varv = [0, 1];
  return (
    <section className={`mork ${styles.yta}`} id="omdomen" aria-labelledby="omdomen-rubrik">
      <div className="wrap" data-trapp>
        <span className="eyebrow">Omdömen på Google</span>
        <h2 id="omdomen-rubrik">
          Så säger <span className="accent">kunderna om oss.</span>
        </h2>
      </div>

      <div className={styles.band}>
        <div className={styles.spar}>
          {[false, true].map((kopia) => (
            <ul className={styles.grupp} aria-hidden={kopia || undefined} key={kopia ? 'b' : 'a'}>
              {varv.map((v) =>
                OMDOMEN.map((o, i) => (
                  <li
                    className={`${styles.lapp} ${o.text.length > 220 ? styles.lang : ''}`}
                    style={{ '--lapp': i % 4 }}
                    aria-hidden={(!kopia && v > 0) || undefined}
                    key={`${v}-${o.namn}`}
                  >
                    <blockquote>{o.text}</blockquote>
                    <p className={styles.fot}>
                      <span className={styles.vem}>
                        <b>{o.namn}</b>
                        {o.fran ? <i>{o.fran}</i> : null}
                      </span>
                      <span className={styles.kalla}>
                        <GoogleG />
                        <Stjarnor />
                      </span>
                    </p>
                  </li>
                )),
              )}
            </ul>
          ))}
        </div>
      </div>

      <div className={`wrap ${styles.under}`}>
        <a href={GOOGLE} target="_blank" rel="noopener" className="textlank">
          Läs omdömena på Google ↗
        </a>
      </div>
    </section>
  );
}
