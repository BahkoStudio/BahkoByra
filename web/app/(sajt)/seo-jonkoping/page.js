import Link from 'next/link';
import Image from 'next/image';
import Faq from '../../komponenter/Faq';
import styles from '../webbyra-jonkoping/jonkoping.module.css';
import egen from './seo.module.css';
import { TJANSTER } from '../../data.js';

/* /seo-jonkoping/ (SEO & AEO Desk, brief 2026-11-02, idétavla 26).
   Sidan äger "seo + jönköping/huskvarna". /tjanster/seo/ är ortsneutral och
   /webbyra-jonkoping/ äger webbyrå/hemsida; de tre korslänkar.
   Regler: du-form, inga tankstreck, inga påhittade siffror, inget antal omdömen för Bahko.
   Resultat: BARA de två bevisen nedan (Matboden skärmdump 2026-11-02, Smålands Måleri
   enligt Mathias 2026-11-02). Priser läses ur data.js så att de aldrig glider isär. */

const HEMSIDOR = TJANSTER.find((t) => t.slug === 'hemsidor');
const [UNDERHALL, GOOGLE] = HEMSIDOR.tillagg;
const PAKET = HEMSIDOR.paket;
const PREMIUM = PAKET.find((p) => p.namn === 'Premium');

const TITEL = 'SEO-byrå i Jönköping för hantverkare, 2 470 kr/mån | Bahko Byrå';
const BESKRIVNING =
  'Lokal SEO i Jönköping och Huskvarna för hantverkare. Fast pris 2 470 kr i månaden, ingen bindningstid och garanti på första sidan inom 90 dagar.';

export const metadata = {
  title: { absolute: TITEL },
  description: BESKRIVNING,
  alternates: { canonical: '/seo-jonkoping/' },
  openGraph: { title: TITEL, description: BESKRIVNING, url: '/seo-jonkoping/' },
};

const PIL = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const GARANTI_DU =
  'Når du inte första sidan på Google inom 90 dagar från start, på de lokala sökord vi skriftligt kommit överens om, får du tillbaka det du betalat för tillägget under perioden. Efter 90 dagar gäller ingen garanti.';

const DELAR = [
  {
    h: 'Google Företagsprofil',
    p: 'Primärkategorin är den enskilt viktigaste inställningen. Vi sätter rätt kategori, fyller i tjänster och tjänsteområde och lägger upp riktiga bilder på dina jobb. Kör du ut till kunderna behöver du ingen butik: profilen kan visa ett tjänsteområde i stället för en adress.',
  },
  {
    h: 'Omdömen där de syns',
    p: 'Många hantverkare har sina bästa omdömen på offertplattformar. De syns inte i Google. Vi lägger upp en enkel rutin så att nöjda kunder lämnar sitt omdöme där stjärnorna faktiskt visas, på din Google-profil.',
  },
  {
    h: 'Sidor per tjänst och ort',
    p: 'En egen sida för varje tjänst du vill sälja, och för orterna där du faktiskt jobbar: Jönköping, Huskvarna, Tenhult, Bankeryd och så vidare. Inga långa ortslistor i sidfoten, utan sidor som svarar på det kunden i just den orten undrar.',
  },
  {
    h: 'Teknisk grund',
    p: 'Att Google kan hitta och indexera sidorna, att de laddar snabbt i mobilen och att strukturerad data talar om vad du gör och var. Utan grunden hjälper ingen text.',
  },
];

const STEG = [
  {
    h: 'Granskning av nuläget',
    p: 'Vi går igenom din Google-profil, din hemsida och vilka sökningar du syns på i dag. Det blir baslinjen allt mäts mot.',
  },
  {
    h: 'Åtgärder i prioritetsordning',
    p: 'Det som ger mest först: oftast profilen och kategorin, sedan sidorna per tjänst och ort, sedan omdömena och den tekniska grunden.',
  },
  {
    h: 'Uppföljning mot baslinjen',
    p: 'Du ser hur placeringen på de överenskomna sökorden förändras jämfört med starten, inte en rapport full av siffror som inte betyder något för dig.',
  },
];

const BESOK = {
  adress: ['Kungsängsvägen 27', '561 51 Huskvarna'],
  tider: 'Alla dagar 8 till 22',
  tel: '076-254 09 51',
  telHref: 'tel:+46762540951',
  karta: 'https://g.page/r/CY8e778hr3z7EAE',
};

const FRAGOR = [
  {
    fraga: 'Vad kostar SEO i Jönköping hos Bahko Byrå?',
    svar: `Ranking på Google och optimering av Google-profilen kostar ${GOOGLE.pris} ex moms, med underhåll inräknat. Vill du bara ha underhåll och grundläggande SEO kostar det ${UNDERHALL.pris} ex moms. Det finns ingen bindningstid.`,
  },
  {
    fraga: 'Hur lång tid tar lokal SEO?',
    svar: 'Profilen och de tekniska felen går att rätta på några dagar. Placeringar tar längre tid och beror på hur hård konkurrensen är på ditt sökord. Därför gäller garantin första sidan inom 90 dagar på överenskomna lokala sökord.',
  },
  {
    fraga: 'Vad händer om det inte fungerar?',
    svar: `Då gäller garantin. ${GARANTI_DU}`,
  },
  {
    fraga: 'Hur syns jag på Google Maps utan butik?',
    svar: 'Du kan ha en Google Företagsprofil med tjänsteområde i stället för synlig adress, om du åker ut till kunderna. Profilen visas då för sökningar i området du anger.',
  },
  {
    fraga: 'Är jag bunden?',
    svar: 'Nej. Det finns ingen bindningstid på tilläggen. Du kan sluta när du vill.',
  },
  {
    fraga: 'Behöver jag en ny hemsida?',
    svar: 'Inte alltid. Fungerar din sida i mobilen och går den att ändra, kan vi jobba med den. Är den för gammal eller långsam är det oftast billigare att bygga nytt än att laga.',
    lank: { href: '/tjanster/hemsidor/', text: 'Se paketen för hemsidor.' },
  },
];

const SIDA = 'https://www.bahkobyra.se/seo-jonkoping/';
const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': SIDA + '#webpage',
      url: SIDA,
      name: TITEL,
      description: BESKRIVNING,
      inLanguage: 'sv-SE',
      datePublished: '2026-11-02',
      dateModified: '2026-11-02',
      about: { '@id': 'https://www.bahkobyra.se/#organization' },
      breadcrumb: { '@id': SIDA + '#breadcrumb' },
    },
    {
      '@type': 'Service',
      '@id': SIDA + '#service',
      name: 'Lokal SEO i Jönköping',
      serviceType: 'Sökmotoroptimering',
      url: SIDA,
      provider: { '@id': 'https://www.bahkobyra.se/#organization' },
      areaServed: [
        { '@type': 'City', name: 'Jönköping' },
        { '@type': 'City', name: 'Huskvarna' },
      ],
      offers: {
        '@type': 'Offer',
        name: GOOGLE.namn,
        price: GOOGLE.pris.replace(/\D/g, ''),
        priceCurrency: 'SEK',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: GOOGLE.pris.replace(/\D/g, ''),
          priceCurrency: 'SEK',
          unitCode: 'MON',
          valueAddedTaxIncluded: false,
        },
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': SIDA + '#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Start', item: 'https://www.bahkobyra.se/' },
        { '@type': 'ListItem', position: 2, name: 'SEO-byrå i Jönköping', item: SIDA },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': SIDA + '#faq',
      mainEntity: FRAGOR.map((f) => ({
        '@type': 'Question',
        name: f.fraga,
        acceptedAnswer: { '@type': 'Answer', text: f.lank ? `${f.svar} ${f.lank.text}` : f.svar },
      })),
    },
  ],
};

export default function SeoJonkoping() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <section className={`mork ${styles.topp}`}>
        <div className="wrap">
          <nav className={styles.brod} aria-label="Brödsmulor">
            <Link href="/">Start</Link>
            <span aria-hidden="true">/</span>
            <span>SEO-byrå i Jönköping</span>
          </nav>
          <h1>SEO-byrå i Jönköping för hantverkare och lokala företag</h1>
          <p className="lede" style={{ marginTop: '1.1rem' }}>
            Bahko Byrå gör lokal SEO för hantverkare och lokala företag i Huskvarna/Jönköping. Ranking på
            Google och optimering av din Google-profil kostar {GOOGLE.pris} ex moms, utan
            bindningstid. Når du inte första sidan inom 90 dagar på de sökord vi kommit överens om får du
            pengarna för tillägget tillbaka. Kontoret ligger på Kungsängsvägen 27 i Huskvarna, så du kan
            komma förbi.
          </p>
          <div className={styles.toppKnappar}>
            <Link href="/foretag/gratis-granskning.html" className="btn btn-primar">
              Få en kostnadsfri analys {PIL}
            </Link>
            <Link href="#pris" className="btn btn-sekundar">
              Se priset
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="eyebrow">Lokal SEO</span>
          <h2>Vad lokal SEO i Jönköping betyder för ditt företag</h2>
          <div className={styles.brodtext}>
            <p>
              Din kund skriver inte "målning". Hen skriver "målare Jönköping" eller "elektriker Huskvarna".
              Då visar Google först en karta med tre företag, och under den de vanliga träffarna. Lokal SEO
              handlar om att du finns i båda, med rätt uppgifter, när någon i närheten behöver dig. Så här
              jobbar vi med det. Vill du läsa mer om metoden i stort, se{' '}
              <Link href="/tjanster/seo/">hur vi jobbar med SEO</Link>.
            </p>
          </div>
          <div className={`${styles.punktNat} ${styles.fyra}`}>
            {DELAR.map((d) => (
              <div key={d.h} className="kort">
                <h3>{d.h}</h3>
                <p>{d.p}</p>
              </div>
            ))}
          </div>
          <div className={styles.brodtext}>
            <p>
              Vi jobbar mest med hantverkare:{' '}
              <Link href="/hemsida-for-malerifirma/">målerifirmor</Link>,{' '}
              <Link href="/hemsida-for-snickare/">snickare</Link>,{' '}
              <Link href="/hemsida-for-elektriker/">elektriker</Link>,{' '}
              <Link href="/hemsida-for-rormokare/">rörmokare</Link> och{' '}
              <Link href="/hemsida-for-byggfirma/">byggföretag</Link>. Undrar du var förfrågningarna
              försvinner i dag? Läs <Link href="/var-lacker-jobben/">var läcker jobben</Link>.
            </p>
          </div>
        </div>
      </section>

      <section id="pris" className={styles.ytaLjus}>
        <div className="wrap">
          <span className="eyebrow">Pris</span>
          <h2>Vad det kostar</h2>
          <div className={styles.brodtext}>
            <p>
              Ranking på Google och optimering av Google-profilen kostar <strong>{GOOGLE.pris}</strong> ex
              moms, med underhåll av hemsidan inräknat. Vill du bara ha underhåll och grundläggande SEO
              kostar det <strong>{UNDERHALL.pris}</strong> ex moms. Det finns ingen bindningstid.
            </p>
            <p>
              Det är ett lågt fast pris jämfört med många SEO-byråer, som ofta tar flera tusen kronor mer i
              månaden och riktar sig till e-handel och större företag. Vi har valt att jobba med lokala
              företag, där arbetet är tydligt avgränsat: din profil, dina tjänster, dina orter.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="eyebrow">Garanti</span>
          <h2>Garantin: första sidan inom 90 dagar</h2>
          <div className={styles.brodtext}>
            <p>
              Garantin gäller tillägget {GOOGLE.namn.toLowerCase()}. Vi kommer skriftligt överens med dig om vilka
              lokala sökord det gäller, till exempel "målare Jönköping". {GARANTI_DU}
            </p>
            <p>
              I paketet Premium gäller garantin hela beloppet: når vi inte första sidan inom 90 dagar på de
              överenskomna sökorden får du tillbaka {PREMIUM.pris}.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.ytaLjus}>
        <div className="wrap">
          <span className="eyebrow">Så går det till</span>
          <h2>Så går det till</h2>
          <ol className={styles.steg}>
            {STEG.map((st, i) => (
              <li key={st.h} className="kort">
                <span className={styles.stegNr} aria-hidden="true">{i + 1}</span>
                <h3>{st.h}</h3>
                <p>{st.p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mork">
        <div className="wrap">
          <span className="eyebrow">Resultat</span>
          <h2>Resultat från lokala kunder</h2>
          <div className={egen.tvaKol}>
            <div className={egen.caseLista}>
              <div className="kort">
                <h3>Matboden i Huskvarna: etta på "buffe huskvarna"</h3>
                <p>
                  Sök "buffe huskvarna" på Google. Den 2 november 2026 låg Matboden i Huskvarna först i
                  Googles platslista. Skärmdumpen bredvid är tagen samma dag.
                </p>
              </div>
              <div className="kort">
                <h3>Smålands Måleri AB i Jönköping: plats 3</h3>
                <p>
                  Smålands Måleri AB ligger nu på plats 3 när man söker "måleri jönköping" på Google. Två månader tidigare
                  hade företaget ingen placering alls där.
                </p>
              </div>
            </div>
            <figure>
              <Image
                src="/img/seo-jonkoping/matboden-buffe-huskvarna-2026-11-02.jpg"
                alt='Google-sökning på "buffe huskvarna" där Matboden i Huskvarna står först i platslistan'
                width={720}
                height={1187}
                className={egen.bevisBild}
              />
              <figcaption className={egen.bildtext}>Skärmdump från Google, 2 november 2026.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="eyebrow">Kontoret</span>
          <h2>Kontoret i Huskvarna</h2>
          <div className={egen.tvaKol}>
            <div>
              <div className={styles.brodtext}>
                <p>
                  Det är Mathias som gör jobbet. Du träffar honom på kontoret i Huskvarna, strax öster om
                  centrala Jönköping, eller tar allt digitalt om det passar dig bättre. Ta med telefonen,
                  så tittar vi på hur du syns i dag.
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
                  <Link href="/kontakt/" className="btn btn-sekundar">
                    Boka möte
                  </Link>
                </div>
              </div>
            </div>
            <Image
              src="/img/seo-jonkoping/mathias-kontoret-huskvarna.jpg"
              alt="Mathias Bahko vid skrivbordet på kontoret i Huskvarna"
              width={496}
              height={690}
              className={egen.bild}
            />
          </div>
        </div>
      </section>

      <section className={styles.ytaLjus}>
        <div className="wrap">
          <span className="eyebrow">Hemsida</span>
          <h2>Har du ingen bra hemsida än?</h2>
          <div className={styles.brodtext}>
            <p>
              SEO fungerar bäst på en sida som laddar snabbt och säger tydligt vad du gör. Har du ingen
              sådan bygger vi den till fast pris, från {PAKET[0].pris} ex moms. I Premium ingår
              Google-tillägget de första 3 månaderna. Se <Link href="/tjanster/hemsidor/">paketen och
              tilläggen</Link> eller läs om oss som <Link href="/webbyra-jonkoping/">webbyrå i
              Jönköping</Link>. Funderar du på om din nuvarande sida går att rädda? Läs{' '}
              <Link href="/kan-en-seo-expert-radda-min-hemsida/">kan en SEO-expert rädda min hemsida</Link>.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="eyebrow">Vanliga frågor</span>
          <h2>Vanliga frågor</h2>
          <div style={{ marginTop: '2rem' }}>
            <Faq frager={FRAGOR} />
          </div>
        </div>
      </section>

      <section className={styles.ctaYta}>
        <div className="wrap">
          <div className={styles.cta}>
            <div>
              <h3>Se hur du syns i Huskvarna/Jönköping i dag</h3>
              <p>Du får en kostnadsfri analys av din Google-profil och hemsida, med ett förslag på vad som ger mest först.</p>
            </div>
            <Link href="/foretag/gratis-granskning.html" className="btn btn-primar">
              Få en kostnadsfri analys {PIL}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
