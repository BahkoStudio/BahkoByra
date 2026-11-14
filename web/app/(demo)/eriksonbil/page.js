import styles from './eriksonbil.module.css';
import { BAS, MEDIA, BILAR, TJANSTER } from './_bilar';
import { fontKlasser, Bild, Topp, Fot, Exempel } from './_delar';
import DemoForm from './_form';

/* Startsidan. Byggd som Teslas sajt: en bil per skärm, svart och guld, mycket luft.
   Allt innehåll utom namnet och loggan är exempel, se blocket överst i _bilar.js. */

export const metadata = {
  title: 'Erikson Bil | Begagnade bilar och egen verkstad',
  description: 'Erikson Bil säljer få, genomgångna begagnade bilar och har en egen verkstad för service, bromsar och däck. Förslag med exempelbilar.',
  robots: { index: false, follow: false },
  icons: { icon: '/eriksonbil/media/mark.svg' },
};

export default function Start() {
  return (
    <div className={`${fontKlasser} ${styles.sida}`}>
      <a href="#bilar" className={styles.hoppa}>Hoppa till bilarna</a>
      <Topp />
      <main>
        <section className={`${styles.skarm} ${styles.hero}`} aria-label="Erikson Bil">
          <Bild namn="hero" alt="Tre bilar i ett mörkt showroom, upplysta av varmt guldljus" prio className={`${styles.bg} ${styles.kenburns}`} />
          <div className={styles.slojaHero} />
          <div className={styles.skarmTopp}>
            <h1 className={styles.heroRubrik}>Få bilar. Rätt bilar.</h1>
            <p className={styles.heroText}>Begagnade bilar och en egen verkstad. Vi säljer bara bilar vi själva skulle köra.</p>
          </div>
          <div className={styles.skarmBotten}>
            <div className={styles.knappar}>
              <a href="#bilar" className={styles.knappGuld}>Se bilarna</a>
              <a href="#verkstad" className={styles.knappGlas}>Boka tid i verkstaden</a>
            </div>
            <p className={styles.illustration}>Bilden är en illustration</p>
          </div>
        </section>

        <div id="bilar">
          {BILAR.map((b, i) => (
            <section key={b.slug} className={styles.skarm} aria-labelledby={`bil-${b.slug}`}>
              <Bild namn={b.bild} alt={b.alt} className={styles.bg} prio={false} />
              <div className={styles.sloja} />
              <div className={styles.skarmTopp}>
                <Exempel />
                <h2 id={`bil-${b.slug}`} className={styles.bilRubrik}>{b.marke} {b.modell}</h2>
                <p className={styles.bilVersion}>{b.version}</p>
                <ul className={styles.bilFakta} aria-label="Fakta">
                  <li><b>{b.ar}</b><span>Årsmodell</span></li>
                  <li><b>{b.mil} mil</b><span>Miltal</span></li>
                  <li><b>{b.pris} kr</b><span>Pris</span></li>
                </ul>
              </div>
              <div className={styles.skarmBotten}>
                <div className={styles.knappar}>
                  <a href={`${BAS}/${b.slug}/#boka`} className={styles.knappGuld}>Boka visning</a>
                  <a href={`${BAS}/${b.slug}/`} className={styles.knappGlas}>Se bilen</a>
                </div>
                <p className={styles.illustration}>Bil {i + 1} av {BILAR.length} · Bilden är en illustration</p>
              </div>
            </section>
          ))}
        </div>

        <section className={styles.vi} aria-labelledby="vi-rubrik">
          <img src={`${MEDIA}/logo.svg`} alt="Erikson Bil" width={886} height={536} className={styles.viLogo} loading="lazy" />
          <h2 id="vi-rubrik" className={styles.sektionRubrik}>Vi är två. Vi kör det vi säljer.</h2>
          <p className={styles.viText}>Vi köper in några få bilar åt gången. Varje bil går upp på lyften i vår egen verkstad innan den hamnar här.</p>
          <p className={styles.viText}>Hittar vi något fixar vi det. Hittar vi för mycket säljer vi den inte. Så enkelt är det.</p>
        </section>

        <section id="verkstad" className={styles.verkstad} aria-labelledby="verkstad-rubrik">
          <div className={styles.verkstadBild}>
            <Bild namn="verkstad" alt="En mörkgrå kombi på en billyft i en ren verkstad med varmt arbetsljus" className={styles.bg} mobil={false} />
            <div className={styles.slojaVerkstad} />
            <div className={styles.verkstadTopp}>
              <p className={styles.etikett}>Verkstaden</p>
              <h2 id="verkstad-rubrik" className={styles.sektionRubrik}>Samma lyft som våra egna bilar.</h2>
              <p className={styles.verkstadText}>Du får pris innan vi börjar. Dyker det upp något mer ringer vi och frågar först.</p>
              <a href="#boka-tid" className={styles.knappGuld}>Boka tid</a>
            </div>
          </div>
          <div className={styles.innehall}>
            <ul className={styles.tjanster}>
              {TJANSTER.map((t) => (
                <li key={t.namn}>
                  <h3>{t.namn}</h3>
                  <p>{t.text}</p>
                  <p className={styles.tjanstPris}>{t.pris}</p>
                </li>
              ))}
            </ul>
            <p className={styles.exempelNot}><Exempel>Exempel</Exempel> Tjänster och priser är påhittade tills verkstaden är igång.</p>
            <div className={styles.bokaRuta} id="boka-tid">
              <h3 className={styles.rutaRubrik}>Boka tid</h3>
              <p className={styles.rutaText}>Skriv vad det gäller. Vi återkommer med en tid och ett pris.</p>
              <DemoForm knapp="Boka tid" kvitto="Tack. Vi hör av oss med en tid." className={styles.form}>
                <label className={styles.falt}><span>Namn</span><input name="namn" autoComplete="name" required /></label>
                <label className={styles.falt}><span>Telefon</span><input name="telefon" type="tel" autoComplete="tel" inputMode="tel" required /></label>
                <label className={styles.falt}><span>Registreringsnummer</span><input name="regnr" autoCapitalize="characters" /></label>
                <label className={styles.falt}>
                  <span>Vad gäller det?</span>
                  <select name="tjanst" defaultValue="Service">
                    {TJANSTER.map((t) => <option key={t.namn}>{t.namn}</option>)}
                    <option>Något annat</option>
                  </select>
                </label>
                <label className={`${styles.falt} ${styles.faltBred}`}><span>Berätta mer (valfritt)</span><textarea name="meddelande" rows={3} /></label>
              </DemoForm>
            </div>
          </div>
        </section>

        <section id="nyhetsbrev" className={styles.nyhetsbrev} aria-labelledby="nyhet-rubrik">
          <h2 id="nyhet-rubrik" className={styles.sektionRubrik}>Få nya bilar först</h2>
          <p className={styles.nyhetText}>De bästa bilarna är sålda innan de hamnar här. Står du på listan får du mejlet ett dygn innan alla andra.</p>
          <DemoForm knapp="Skriv upp mig" kvitto="Klart. Du står på listan." className={styles.nyhetForm}>
            <label className={styles.falt}><span>E-post</span><input name="epost" type="email" autoComplete="email" required /></label>
          </DemoForm>
        </section>

        <section id="kontakt" className={styles.kontakt} aria-labelledby="kontakt-rubrik">
          <h2 id="kontakt-rubrik" className={styles.sektionRubrik}>Kom förbi.</h2>
          <p className={styles.kontaktText}>Ring innan, så står kaffet på och bilen du vill se står framme.</p>
          <dl className={styles.kontaktLista}>
            <div><dt>Adress</dt><dd>Verkstadsvägen 4, 123 45 Exempelby <Exempel>Exempel</Exempel></dd></div>
            <div><dt>Telefon</dt><dd>Numret kommer när firman är registrerad</dd></div>
            <div><dt>E-post</dt><dd>Adressen kommer med domänen</dd></div>
            <div><dt>Öppet</dt><dd>Vardagar 17 till 20, lördagar 10 till 14 <Exempel>Exempel</Exempel></dd></div>
          </dl>
        </section>
      </main>
      <Fot />
    </div>
  );
}
