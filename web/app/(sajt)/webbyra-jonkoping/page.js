import Link from 'next/link';
import Faq from '../../komponenter/Faq';
import styles from './jonkoping.module.css';

export const metadata = {
  title: 'Webbyrå i Jönköping',
  description:
    'Bahko Byrå är en webbyrå med kontor i Jönköping. Vi bygger hemsidor för bygg- och hantverksfirmor: färdigt förslag inom 48 timmar, live inom sju dagar. Välkommen förbi kontoret.',
  alternates: { canonical: '/webbyra-jonkoping/' },
};

const PIL = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

/* Sidan finns för att kontoret finns — det är inte en instansad ortssida.
   NAP-regeln: adress, nummer och tider nedan ska vara tecken för tecken samma
   som i footern och Google Företagsprofilen. Skriv "Bahko Byrå i Jönköping",
   aldrig "vi här": styckena ska bära sig själva utlyfta. */

const LOKALT = [
  {
    h: 'Kontor i Huskvarna',
    p: 'Bahko Byrå sitter på Kungsängsvägen 27 i Huskvarna, strax öster om centrala Jönköping. Öppet alla dagar 9 till 18, och det går utmärkt att ses där, före ett beslut eller mitt i ett bygge. Ring 076-254 09 51 innan så står kaffet framme.',
  },
  {
    h: 'Kund i stan, i drift',
    p: 'Smålands Måleri i Jönköping fick sin sida byggd av Bahko Byrå, med offertflöde i mobilen och ROT-texten skriven enligt Skatteverkets regler. Sidan är i drift och går att syna innan ni hör av er.',
  },
  {
    h: 'Hela Sverige, digitalt',
    p: 'Arbetet sker digitalt, så avståndet spelar ingen roll: kunderna finns i Jönköping, Stockholm och däremellan. Kontoret är för er som hellre tar mötet öga mot öga.',
  },
];

const BESOK = {
  adress: ['Kungsängsvägen 27', '561 51 Huskvarna'],
  tider: 'Alla dagar 9–18',
  tel: '076-254 09 51',
  telHref: 'tel:+46762540951',
  karta: 'https://maps.google.com/?q=Kungs%C3%A4ngsv%C3%A4gen+27,+561+51+Huskvarna',
};

const FRAGOR_JKPG = [
  {
    fraga: 'Kan vi ses på kontoret innan vi bestämmer oss?',
    svar:
      'Ja. Boka en tid så går vi igenom er nuvarande synlighet och vad ett förslag skulle innehålla. Det kostar ingenting och ni binder er inte vid något genom att komma förbi.',
  },
  {
    fraga: 'Jobbar ni bara med företag i Jönköping?',
    svar:
      'Nej. Bahko Byrå bygger för bygg- och hantverksfirmor i hela Sverige och arbetet sker digitalt. Kontoret i Jönköping är för er som föredrar att ses, inte en gräns för var kunderna finns.',
  },
  {
    fraga: 'Vad kostar en hemsida hos en webbyrå i Jönköping?',
    svar:
      'Ni får ett exakt fast pris i det kostnadsfria förslaget, innan ni bestämmer er. Engångspris, inga månadsavgifter, ingen bindningstid. Vad som avgör priset förklaras öppet på sidan om vad en hemsida kostar.',
  },
  {
    fraga: 'Hur snabbt kan vi ha en ny sida?',
    svar:
      'Färdigt förslag inom 48 timmar. Säger ni ja är sidan normalt live inom sju dagar, på er egen domän, och ni äger både sidan och domänen.',
  },
];

export default function Jonkoping() {
  return (
    <>
      <section className={`mork ${styles.topp}`}>
        <div className="wrap">
          <nav className={styles.brod} aria-label="Brödsmulor">
            <Link href="/">Start</Link>
            <span aria-hidden="true">/</span>
            <span>Webbyrå i Jönköping</span>
          </nav>
          <h1>Webbyrå i Jönköping</h1>
          <p className="lede" style={{ marginTop: '1.1rem' }}>
            Bahko Byrå är en webbyrå med kontor i Jönköping som bygger hemsidor för bygg- och
            hantverksfirmor. Färdigt förslag inom 48 timmar, live inom sju dagar, och en kund
            här i stan vars sajt ni kan syna innan ni hör av er.
          </p>
          <div className={styles.toppKnappar}>
            <Link href="/kontakt/" className="btn btn-primar">
              Få kostnadsfritt förslag {PIL}
            </Link>
            <Link href="/case/" className="btn btn-sekundar">
              Se leveranser
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="eyebrow">Lokalt</span>
          <h2>På plats i Jönköping</h2>
          <div className={styles.punktNat}>
            {LOKALT.map((p) => (
              <div key={p.h} className="kort">
                <h3>{p.h}</h3>
                <p>{p.p}</p>
              </div>
            ))}
          </div>
          <div className={styles.brodtext}>
            <p>
              Det Bahko Byrå gör för en hantverksfirma är alltid samma tre steg: ett färdigt
              förslag på er nya sida inom 48 timmar, byggt på riktigt så ni ser exakt hur den
              blir. Säger ni ja görs den skarp med era bilder, texter och uppgifter och går
              live inom sju dagar på er egen domän. Säger ni nej kostar det ingenting, och
              förslaget var ändå värt titten.
            </p>
            <p>
              För firmor i Jönköping med omnejd finns en fördel till: det går att ses. Ta med
              telefonen och era frågor till kontoret, så tittar vi på hur ni syns idag och vad
              som skulle göra störst skillnad först.
            </p>
          </div>

          <div className={styles.besok}>
            <div>
              <h3>Hitta hit</h3>
              <p>
                {BESOK.adress[0]}
                <br />
                {BESOK.adress[1]}
              </p>
              <p>{BESOK.tider}</p>
            </div>
            <div className={styles.besokKnappar}>
              <a href={BESOK.telHref} className="btn btn-primar">
                Ring {BESOK.tel}
              </a>
              <a href={BESOK.karta} target="_blank" rel="noopener" className="btn btn-sekundar">
                Öppna i kartan
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaYta}>
        <div className="wrap">
          <div className={styles.cta}>
            <div>
              <h3>Se er firma på en riktig sida, innan ni betalar något</h3>
              <p>Förslaget byggs inom 48 timmar. Ni bestämmer sen.</p>
            </div>
            <Link href="/kontakt/" className="btn btn-primar">
              Få kostnadsfritt förslag {PIL}
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="eyebrow">Vanliga frågor</span>
          <h2>Raka svar</h2>
          <div style={{ marginTop: '2rem' }}>
            <Faq frager={FRAGOR_JKPG} />
          </div>
        </div>
      </section>
    </>
  );
}
