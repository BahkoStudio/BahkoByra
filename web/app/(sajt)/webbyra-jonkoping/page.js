import Link from 'next/link';
import Faq from '../../komponenter/Faq';
import Maskot from '../../komponenter/Maskot';
import styles from './jonkoping.module.css';
// Paketkorten delar stil med /tjanster/hemsidor/, så att priserna ser likadana ut på båda sidorna.
import paketStil from '../tjanster/[slug]/tjanst.module.css';
import { TJANSTER, GARANTI, GARANTI_VILLKOR, GARANTI_PREMIUM_VILLKOR, PRISMODELL } from '../../data.js';

/* Priser och tillägg läses ur TJANSTER (hemsidor) i data.js, en plats att ändra på. */
const HEMSIDOR = TJANSTER.find((t) => t.slug === 'hemsidor');
const PAKET = HEMSIDOR.paket;
const TILLAGG = HEMSIDOR.tillagg;
const BAS = PAKET[0];
const [UNDERHALL, GOOGLE] = TILLAGG;

export const metadata = {
  /* absolute: layoutens mall lägger annars till "| Bahko Byrå" en gång till. */
  title: { absolute: `Webbyrå & webbdesign i Jönköping – från ${BAS.pris} | Bahko Byrå` },
  description:
    'Webbyrå och webbdesign för företag i Jönköping, med kontor i Huskvarna. Fast pris från 10 000 kr ex moms, färdigt förslag inom 48 timmar.',
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
    p: 'Bahko Byrå sitter på Kungsängsvägen 27 i Huskvarna, strax öster om centrala Jönköping. Vi svarar alla dagar 8 till 22, och det går utmärkt att boka ett möte där, före ett beslut eller mitt i ett bygge. Ring 076-254 09 51 innan så står kaffet framme.',
  },
  {
    h: 'Kund i Jönköping, i drift',
    p: 'Smålands Måleri i Jönköping fick sin sida byggd av Bahko Byrå, med offertflöde i mobilen och ROT-texten skriven enligt Skatteverkets regler. Sidan är i drift och går att syna innan ni hör av er.',
  },
  {
    h: 'Hela Sverige, digitalt',
    p: 'Arbetet sker digitalt, så avståndet spelar ingen roll: kunderna finns i Jönköping, Stockholm och däremellan. Kontoret är för er som hellre tar mötet öga mot öga.',
  },
];

/* Bevis: bara verifierat. Plats 1 på Google och först i ChatGPT är skärmbilderna i
   rapport 1, 30 juli 2026 (2-kunder/kunder/bromma/bevis/). Förfrågningarna är
   35+ på två månader (Mathias 2026-10-17). Ingen procentsats:
   det finns ingen mätning av läget före (Mathias 2026-09-23). */
const RESULTAT = [
  { tal: '1', etikett: 'Plats på Google', text: 'Bromma Trädgårdsservice i Stockholm låg först av sex firmor i Googles Platser-flik för trädgårdsservice i Stockholm den 30 juli 2026.' },
  { tal: '1', etikett: 'Först i ChatGPT', text: 'Samma firma kom först i ChatGPT:s svar på frågan om trädgårdsservice i Stockholm.' },
  { tal: '35+', etikett: 'Förfrågningar via sidan', text: '35+ offertförfrågningar kom in via formuläret på sidan på två månader. Ett kundcase, inget löfte.' },
];

/* Vad en sida från Bahko Byrå innehåller. Samma moduler som varje demo byggs med. */
const INGAR = [
  'Telefonnumret syns direkt i mobilen och går att trycka på, utan att öppna någon meny.',
  'Ett formulär på tre fält som tar tjugo sekunder att fylla i, med bekräftelse direkt på skärmen.',
  'Bilder på era riktiga jobb, inte stockfoton, så kunden ser vad ni faktiskt gör.',
  'Era omdömen synliga där kunden letar, inte bara på Google eller en offertplattform.',
  'Byggd för att synas på Google i er ort: rätt rubriker, snabb laddning och er adress på samma sätt överallt.',
  'Er egen domän. Ni äger sidan och domänen, och det finns ingen bindningstid.',
];

/* Köpa hemsida: samma tre steg som förut stod som brödtext under "På plats".
   Flyttade hit i stället för att stå på två ställen (brief 2026-10-14). */
const STEG = [
  {
    h: 'Ni berättar om firman',
    p: 'Via formuläret, ett samtal eller på kontoret i Huskvarna. Har ni redan en sida kan ni börja med en',
    lank: { href: '/foretag/gratis-granskning.html', text: 'kostnadsfri granskning av er nuvarande hemsida' },
  },
  {
    h: 'Färdigt förslag inom 48 timmar',
    p: 'Inte en offert med punkter och ett pris, utan er nya sida byggd på riktigt, med ert namn och era tjänster. Ni klickar runt i den på mobilen och ser exakt hur den blir. Det fasta priset står i samma förslag.',
  },
  {
    h: 'Ja eller nej',
    p: 'Säger ni ja görs sidan skarp med era bilder, texter och uppgifter och går live inom sju dagar på er egen domän. Säger ni nej kostar det ingenting.',
  },
];

/* Segment. Länka bara till sidor som finns: /hemsida-for-byggfirma/ är 404
   (2026-10-14), lägg till länken när sidan är publicerad. Ingen e-handel här
   förrän Mathias bekräftat erbjudandet. */
const SEGMENT = [
  {
    h: 'Målerifirmor',
    p: 'Offertflöde i mobilen, ROT förklarat enligt Skatteverket och bilder på riktiga jobb. Kunderna Smålands Måleri i Jönköping och GD Måleri i Stockholm har sådana sidor i drift, byggda av Bahko Byrå.',
    lank: { href: '/hemsida-for-malerifirma/', text: 'Hemsida för målerifirma' },
  },
  {
    h: 'Trädgårdsfirmor',
    p: 'Säsongens tjänster först, områdena ni kör i och en snabb väg till offert. Bromma Trädgårdsservice är caset längre ner på sidan.',
    lank: { href: '/hemsida-for-tradgardsfirma/', text: 'Hemsida för trädgårdsfirma' },
  },
  {
    h: 'Bygg och andra hantverkare',
    p: 'Byggfirmor, VVS, el, tak och mark: samma moduler, anpassade efter hur era kunder letar och vad de vill se innan de ringer.',
  },
  {
    h: 'Lokala tjänsteföretag',
    p: 'Firmor som lever på att folk i Jönköping och Huskvarna hittar dem, ringer och bokar. Sidan byggs för samtalet, inte för att se fin ut i en portfolio.',
  },
];

const SYNAS = [
  {
    h: 'Lokal SEO och Google Företagsprofil',
    p: 'Rätt uppgifter överallt, en profil som sköts och sidor som svarar på det folk i Jönköping faktiskt söker på.',
    lank: { href: '/tjanster/seo/', text: 'Lokal SEO' },
  },
  {
    h: 'Synas i AI-svar',
    p: 'Googles AI-översikter och ChatGPT hämtar svar från sidor som svarar tydligt. Samma arbete, med texter skrivna för att kunna citeras.',
  },
  {
    h: 'Google Ads',
    p: 'Annonser när ni vill ha förfrågningar snabbt, kopplade till sidan så att ni ser vad klicken ger.',
    lank: { href: '/tjanster/google-ads/', text: 'Google Ads' },
  },
  {
    h: 'Appar',
    p: 'Bokningsappar och kundportaler när en sida inte räcker.',
    lank: { href: '/tjanster/appar/', text: 'Appar' },
  },
];

const BESOK = {
  adress: ['Kungsängsvägen 27', '561 51 Huskvarna'],
  tider: 'Alla dagar 8–22',
  tel: '076-254 09 51',
  telHref: 'tel:+46762540951',
  karta: 'https://g.page/r/CY8e778hr3z7EAE', // Google-profilen: klicken landar på profilen, inte på en adressökning
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
      'Nej. Bahko Byrå bygger för bygg- och hantverksfirmor i hela Sverige och arbetet sker digitalt. Kontoret i Huskvarna, nära Jönköping, är för er som föredrar att ses, inte en gräns för var kunderna finns.',
  },
  {
    fraga: 'Vad kostar en hemsida i Jönköping hos Bahko Byrå?',
    svar: `${PRISMODELL} Vilket paket som passar ert företag ser ni i det kostnadsfria förslaget, innan ni bestämmer er.`,
  },
  {
    fraga: 'Vad är baspriset för en hemsida?',
    svar: `Baspriset är ${BAS.pris} ex moms, för paketet ${BAS.namn}: ${BAS.ingar.join(', ').toLowerCase()}. Det är ett fast pris för bygget, inte en hyra.`,
  },
  {
    fraga: 'Vad är skillnaden mellan Basic, Standard och Premium?',
    svar: PAKET.map((p) => `${p.namn} (${p.pris}): ${p.kort}`).join(' '),
  },
  {
    fraga: 'Hur snabbt kan vi ha en ny sida?',
    svar:
      'Färdigt förslag inom 48 timmar. Säger ni ja är sidan normalt live inom sju dagar, på er egen domän, och ni äger både sidan och domänen.',
  },
  {
    fraga: 'Vad är skillnaden mellan ert förslag och en vanlig offert?',
    svar:
      'En offert beskriver en sida och sätter ett pris. Förslaget från Bahko Byrå är sidan: byggd med ert namn och era tjänster, så att ni kan klicka runt i den innan ni bestämmer er. Det fasta priset står i samma förslag, och det kostar ingenting att säga nej.',
  },
  {
    fraga: 'Tillkommer det några månadskostnader efteråt?',
    svar: `Bara om ni väljer ett tillägg. Båda är valfria: ${UNDERHALL.namn} (${UNDERHALL.pris}) och ${GOOGLE.namn} (${GOOGLE.pris}), som inkluderar underhållet, ex moms. I Premium ingår Google-tillägget de första 3 månaderna, sedan ${GOOGLE.pris} om ni vill fortsätta. Byter ni domän tillkommer en kostnad för det. Allt står i förslaget innan ni bestämmer er, och det finns ingen bindningstid.`,
  },
  {
    fraga: 'Äger vi hemsidan och domänen?',
    svar:
      'Ja. Sidan och domänen är era, även om ni en dag slutar hos Bahko Byrå. Det finns ingen bindningstid som håller er kvar.',
  },
  {
    fraga: 'Kan ni hjälpa oss att synas på Google och i AI-svar i Jönköping?',
    svar:
      `Ja, som tillägg: lokal SEO, Google Företagsprofil, synlighet i AI-svar och Google Ads. Tillägget ${GOOGLE.namn} kostar ${GOOGLE.pris}, är valfritt och ingår i Premium de första 3 månaderna. ${GARANTI} Ett exempel är Bromma Trädgårdsservice, med 35+ förfrågningar via hemsidan på 2 månader.`,
    lank: { href: '/case/', text: 'Läs caset om Bromma Trädgårdsservice.' },
  },
  {
    fraga: 'Hur fungerar garantin om Googles första sida?',
    svar: `Garantin gäller tillägget ${GOOGLE.namn}: ${GARANTI_VILLKOR} I Premium gäller: ${GARANTI_PREMIUM_VILLKOR}`,
  },
];

/* Strukturerad data för just den här sidan. Organisationen finns redan i
   layouten (@id #organization) och upprepas inte, den refereras. FAQ-schemat
   byggs ur samma lista som visas, så text och schema kan aldrig glida isär. */
const SIDA = 'https://www.bahkobyra.se/webbyra-jonkoping/';
const SIDSCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': SIDA + '#webpage',
      url: SIDA,
      name: 'Webbyrå och webbdesign i Jönköping',
      inLanguage: 'sv-SE',
      about: { '@id': 'https://www.bahkobyra.se/#organization' },
      breadcrumb: { '@id': SIDA + '#breadcrumb' },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': SIDA + '#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Start', item: 'https://www.bahkobyra.se/' },
        { '@type': 'ListItem', position: 2, name: 'Webbyrå i Jönköping', item: SIDA },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': SIDA + '#faq',
      mainEntity: FRAGOR_JKPG.map((f) => ({
        '@type': 'Question',
        name: f.fraga,
        // Svaret plus länktexten, exakt så som det står på sidan.
        acceptedAnswer: { '@type': 'Answer', text: f.lank ? `${f.svar} ${f.lank.text}` : f.svar },
      })),
    },
  ],
};

export default function Jonkoping() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SIDSCHEMA) }}
      />
      <section className={`mork ${styles.topp}`}>
        <div className="wrap">
          <nav className={styles.brod} aria-label="Brödsmulor">
            <Link href="/">Start</Link>
            <span aria-hidden="true">/</span>
            <span>Webbyrå i Jönköping</span>
          </nav>
          <h1>
            <Maskot pose="vinkar" stil="liten" alt="Bahko-maskoten hälsar" />{' '}
            Webbyrå och webbdesign i Jönköping
          </h1>
          <p className="lede" style={{ marginTop: '1.1rem' }}>
            Bahko Byrå är en webbyrå med kontor i Huskvarna, nära Jönköping, som gör webbdesign och
            bygger hemsidor för bygg- och hantverksföretag och andra lokala företag. Vill ni köpa en
            hemsida i Jönköping får ni ett färdigt förslag med fast pris inom 48 timmar, live inom sju
            dagar, och en kund i Jönköping vars sajt ni kan syna innan ni hör av er.
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
          <h2>På plats i Huskvarna, nära Jönköping</h2>
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

      <section className={styles.ytaLjus}>
        <div className="wrap">
          <span className="eyebrow">Så går det till</span>
          <h2>Köpa hemsida i Jönköping: så går det till</h2>
          <ol className={styles.steg}>
            {STEG.map((st, i) => (
              <li key={st.h} className="kort">
                <span className={styles.stegNr} aria-hidden="true">{i + 1}</span>
                <h3>{st.h}</h3>
                <p>
                  {st.p}
                  {st.lank && (
                    <>
                      {' '}
                      <Link href={st.lank.href}>{st.lank.text}</Link>.
                    </>
                  )}
                </p>
              </li>
            ))}
          </ol>
          <p className={styles.brodtext}>
            Skillnaden mot en vanlig offert är att ni inte behöver föreställa er något. Ni ser
            sidan, med er firma i, innan ni betalar en krona.
          </p>
        </div>
      </section>

      <section id="pris">
        <div className="wrap">
          <span className="eyebrow">Pris</span>
          <h2>Vad kostar en hemsida i Jönköping?</h2>
          <div className={styles.brodtext}>
            <p>
              En hemsida från Bahko Byrå i Huskvarna, nära Jönköping, har ett fast pris, från {BAS.pris} ex
              moms. Det finns tre paket, och vilket som passar ert företag beror på hur många tjänster
              och sidor ni behöver. Det ser ni i förslaget, med sidan framför er, innan ni bestämmer
              er. Säger ni nej har det inte kostat något.
            </p>
          </div>
          <div className={paketStil.paketNat}>
            {PAKET.map((p) => (
              <div key={p.namn} className={`${paketStil.paket} ${p.markerad ? paketStil.markerad : ''}`}>
                {p.markerad && <span className={paketStil.bricka}>Vanligast</span>}
                <h3>{p.namn}</h3>
                <span className={paketStil.pris}>
                  {p.pris}
                  <small>ex moms</small>
                </span>
                <p className={paketStil.kort}>{p.kort}</p>
                <ul>
                  {p.ingar.map((rad) => (
                    <li key={rad}>
                      <span aria-hidden="true">✓</span>
                      {rad}
                    </li>
                  ))}
                </ul>
                <Link href="/kontakt/" className={p.markerad ? 'btn btn-primar' : 'btn btn-sekundar'}>
                  Få kostnadsfritt förslag {PIL}
                </Link>
              </div>
            ))}
          </div>
          <h3 style={{ marginTop: '2.4rem' }}>Tilläggstjänster</h3>
          <div className={paketStil.tillagg}>
            {TILLAGG.map((x) => (
              <div key={x.namn}>
                <strong>{x.namn}</strong>
                <b>{x.pris}</b>
                {x.not && <small>{x.not}</small>}
              </div>
            ))}
          </div>
          <p className={paketStil.momsNot}>
            {/* Prismodellen ordagrant som i FAQ:n och FAQ-schemat (PRISMODELL i data.js). */}
            Alla priser är exklusive moms. {PRISMODELL} Ni äger sidan och domänen även om ni en dag
            slutar hos oss. Byter ni domän tillkommer en kostnad för det. Ingen bindningstid på tilläggen.
          </p>
          <div className={styles.brodtext}>
            <p>
              Vill ni förstå vad som brukar driva priset upp eller ner? Läs{' '}
              <Link href="/vad-kostar-en-hemsida/">vad som avgör priset på en hemsida</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="mork">
        <div className="wrap">
          <span className="eyebrow">Resultat</span>
          <h2>Vad en sida från Bahko Byrå kan göra</h2>
          <p className="lede" style={{ marginTop: '1rem' }}>
            Ett kundcase från Bahko Byrå. Placeringen är skärmbilder från 30 juli 2026.
          </p>
          <div className={styles.resultatNat}>
            {RESULTAT.map((r) => (
              <div key={r.etikett} className={styles.resultatKort}>
                <strong>{r.tal}</strong>
                <span>{r.etikett}</span>
                <p>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="eyebrow">Det här ingår</span>
          <h2>Vad en hemsida från Bahko Byrå innehåller</h2>
          <ul className={styles.ingar}>
            {INGAR.map((t) => (
              <li key={t}>
                <span aria-hidden="true">✓</span>
                {t}
              </li>
            ))}
          </ul>
          <p className={styles.brodtext} style={{ marginTop: '1.4rem' }}>
            Vill ni räkna på vad en bättre sida är värd för just er firma? Kalkylen på{' '}
            <Link href="/#rakna">startsidan</Link> räknar ut det med era egna siffror.
          </p>
        </div>
      </section>

      <section className={styles.ytaLjus}>
        <div className="wrap">
          <span className="eyebrow">För vem</span>
          <h2>Webbdesign för hantverkare och lokala företag i Jönköping</h2>
          <div className={`${styles.punktNat} ${styles.fyra}`}>
            {SEGMENT.map((sg) => (
              <div key={sg.h} className="kort">
                <h3>{sg.h}</h3>
                <p>{sg.p}</p>
                {sg.lank && (
                  <Link href={sg.lank.href} className={styles.kortLank}>
                    {sg.lank.text} {PIL}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="eyebrow">Synas</span>
          <h2>Synas i Jönköping: Google, AI-svar och annonser</h2>
          <p className={styles.brodtext}>
            En ny sida är grunden. Det här är tilläggen för den som vill att fler i Jönköping och
            Huskvarna hittar den.
          </p>
          <div className={`${styles.punktNat} ${styles.fyra}`}>
            {SYNAS.map((sy) => (
              <div key={sy.h} className="kort">
                <h3>{sy.h}</h3>
                <p>{sy.p}</p>
                {sy.lank && (
                  <Link href={sy.lank.href} className={styles.kortLank}>
                    {sy.lank.text} {PIL}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaYta}>
        <div className="wrap">
          <div className={styles.cta}>
            <div>
              <h3>Se er firma på en riktig sida, innan ni betalar något</h3>
              <p>Förslaget byggs inom 48 timmar. Ni bestämmer sen.</p>
              <p className={styles.ctaSmall}>
                Har ni redan en sida?{' '}
                <Link href="/foretag/gratis-granskning.html">Börja med en kostnadsfri granskning</Link>.
              </p>
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
