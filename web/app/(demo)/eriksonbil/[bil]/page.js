import { notFound } from 'next/navigation';
import styles from '../eriksonbil.module.css';
import { BAS, MEDIA, BILAR, LANEVILLKOR, hittaBil } from '../_bilar';
import { fontKlasser, Topp, Fot, Exempel } from '../_delar';
import DemoForm from '../_form';
import Studio from '../_studio';

/* En sida per exempelbil, byggd som Teslas designsida (se _studio.js): bild med
   punkter till vänster, panel till höger, fast rad längst ner.
   Allt om bilarna är påhittat (se _bilar.js). */

export const dynamicParams = false;

export function generateStaticParams() {
  return BILAR.map((b) => ({ bil: b.slug }));
}

export async function generateMetadata({ params }) {
  const { bil } = await params;
  const b = hittaBil(bil);
  if (!b) return {};
  return {
    title: `${b.marke} ${b.modell} ${b.ar} | Erikson Bil`,
    description: `Exempelbil: ${b.marke} ${b.modell} ${b.version}, ${b.ar}, ${b.mil} mil, ${b.pris} kr. Boka visning hos Erikson Bil.`,
    robots: { index: false, follow: false },
    icons: { icon: '/eriksonbil/media/mark.svg' },
  };
}

export default async function BilSida({ params }) {
  const { bil } = await params;
  const b = hittaBil(bil);
  if (!b) notFound();
  const andra = BILAR.filter((x) => x.slug !== b.slug);

  return (
    <div className={`${fontKlasser} ${styles.sida} ${styles.studioSida}`}>
      <a href="#fakta" className={styles.hoppa}>Hoppa till fakta</a>
      <Topp />
      <main>
        <Studio b={b} villkor={LANEVILLKOR}>
          <h2 className={styles.delRubrik}>Specifikationer</h2>
          <dl className={styles.specar}>
            {b.specar.map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>

          <h2 className={styles.delRubrik}>Utrustning</h2>
          <ul className={styles.utrustning}>
            {[...b.ute, ...b.inne].map((u) => <li key={u}>{u}</li>)}
          </ul>

          <h2 className={styles.delRubrik}>Servicehistorik</h2>
          <ol className={styles.service}>
            {b.service.map(([nar, mil, vad]) => (
              <li key={nar}>
                <p className={styles.serviceNar}>{nar}</p>
                <p className={styles.serviceMil}>{mil}</p>
                <p className={styles.serviceVad}>{vad}</p>
              </li>
            ))}
          </ol>
          <p className={styles.bildNot}>Servicehäftet ligger i bilen. Läs det själv vid visningen.</p>

          <h2 className={styles.delRubrik}>Film</h2>
          <div className={styles.film}>
            <img src={`${MEDIA}/${b.bild}-detalj-960.webp`} alt="" width={960} height={638} loading="lazy" decoding="async" />
            <div className={styles.filmText}>
              <p className={styles.filmRubrik}>Här kommer filmen</p>
              <p>En lugn runda runt bilen, motorn i gång och en titt under huven. Ungefär 40 sekunder.</p>
            </div>
          </div>

          <div className={styles.bokaRuta} id="boka">
            <h2 className={styles.rutaRubrik}>Boka visning</h2>
            <p className={styles.rutaText}>Välj en dag. Vi ställer fram bilen och har nycklarna redo.</p>
            <DemoForm knapp="Boka visning" kvitto={`Tack. Vi hör av oss om ${b.marke} ${b.modell}.`} className={styles.form}>
              <input type="hidden" name="bil" value={`${b.marke} ${b.modell} ${b.ar}`} />
              <label className={styles.falt}><span>Namn</span><input name="namn" autoComplete="name" required /></label>
              <label className={styles.falt}><span>Telefon</span><input name="telefon" type="tel" autoComplete="tel" inputMode="tel" required /></label>
              <label className={styles.falt}>
                <span>När passar det?</span>
                <select name="nar" defaultValue="En vardagskväll">
                  <option>En vardagskväll</option>
                  <option>En lördag</option>
                  <option>Spelar ingen roll</option>
                </select>
              </label>
              <label className={styles.falt}>
                <span>Provkörning?</span>
                <select name="provkorning" defaultValue="Ja gärna">
                  <option>Ja gärna</option>
                  <option>Nej, bara titta</option>
                </select>
              </label>
              <label className={`${styles.falt} ${styles.faltBred}`}><span>Något du undrar över? (valfritt)</span><textarea name="meddelande" rows={3} /></label>
            </DemoForm>
          </div>

          <div className={styles.ring} id="ring">
            <h2 className={styles.rutaRubrik}>Hellre ringa?</h2>
            <p className={styles.rutaText}>Numret kommer här när firman är registrerad. Tills dess bokar du visning med formuläret ovanför.</p>
          </div>
        </Studio>

        <section className={styles.innehall} aria-labelledby="fler-rubrik">
          <h2 id="fler-rubrik" className={styles.delRubrik}>Fler bilar</h2>
          <ul className={styles.andra}>
            {andra.map((x) => (
              <li key={x.slug}>
                <a href={`${BAS}/${x.slug}/`}>
                  <img src={`${MEDIA}/${x.bild}-1280.webp`} alt="" width={960} height={638} loading="lazy" decoding="async" />
                  <span className={styles.andraNamn}>{x.marke} {x.modell}</span>
                  <span className={styles.andraFakta}>{x.ar} · {x.mil} mil · {x.pris} kr</span>
                  <Exempel />
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Fot />
    </div>
  );
}
