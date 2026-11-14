import { notFound } from 'next/navigation';
import styles from '../eriksonbil.module.css';
import { BAS, MEDIA, BILAR, LANEVILLKOR, hittaBil } from '../_bilar';
import { fontKlasser, Bild, Topp, Fot, Exempel } from '../_delar';
import DemoForm from '../_form';

/* En sida per exempelbil: galleri, plats för film, specar, servicehistorik,
   månadskostnad och boka visning. Allt om bilarna är påhittat (se _bilar.js). */

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
  const galleri = [
    { namn: `${b.bild}-1280.webp`, stor: `${b.bild}-1920.webp`, alt: b.alt },
    { namn: `${b.bild}-bak-960.webp`, stor: `${b.bild}-bak-1600.webp`, alt: `${b.marke} ${b.modell} bakifrån` },
    { namn: `${b.bild}-inne-960.webp`, stor: `${b.bild}-inne-1600.webp`, alt: `Förarplats och instrumentbräda i ${b.marke} ${b.modell}` },
    { namn: `${b.bild}-detalj-960.webp`, stor: `${b.bild}-detalj-1600.webp`, alt: `Framhjul och strålkastare på ${b.marke} ${b.modell}` },
  ];

  return (
    <div className={`${fontKlasser} ${styles.sida}`}>
      <a href="#fakta" className={styles.hoppa}>Hoppa till fakta</a>
      <Topp />
      <main>
        <section className={styles.skarm} aria-labelledby="bil-rubrik">
          <Bild namn={b.bild} alt={b.alt} prio className={`${styles.bg} ${styles.kenburns}`} />
          <div className={styles.sloja} />
          <div className={styles.skarmTopp}>
            <Exempel />
            <h1 id="bil-rubrik" className={styles.bilRubrik}>{b.marke} {b.modell}</h1>
            <p className={styles.bilVersion}>{b.version}</p>
            <ul className={styles.bilFakta} aria-label="Fakta">
              <li><b>{b.ar}</b><span>Årsmodell</span></li>
              <li><b>{b.mil} mil</b><span>Miltal</span></li>
              <li><b>{b.pris} kr</b><span>Pris</span></li>
            </ul>
            <p className={styles.manad}>eller från <b>{b.manad} kr/mån</b></p>
          </div>
          <div className={styles.skarmBotten}>
            <div className={styles.knappar}>
              <a href="#boka" className={styles.knappGuld}>Boka visning</a>
              <a href="#ring" className={styles.knappGlas}>Ring oss</a>
            </div>
            <p className={styles.illustration}>Bilden är en illustration</p>
          </div>
        </section>

        <section className={styles.innehall} id="fakta" aria-label="Om bilen">
          <p className={styles.ingress}>{b.ingress}</p>

          <h2 className={styles.delRubrik}>Bilder</h2>
          <ul className={styles.galleri}>
            {galleri.map((g, i) => (
              <li key={g.namn} className={i === 0 ? styles.galleriStor : undefined}>
                <a href={`${MEDIA}/${g.stor}`} target="_blank" rel="noopener" aria-label={`Öppna bilden större i en ny flik: ${g.alt}`}>
                  <img src={`${MEDIA}/${g.namn}`} alt={g.alt} width={960} height={638} loading="lazy" decoding="async" />
                </a>
              </li>
            ))}
          </ul>
          <p className={styles.bildNot}>Alla bilder är illustrationer. Den riktiga bilen fotograferas när den kommer in.</p>

          <h2 className={styles.delRubrik}>Film</h2>
          <div className={styles.film}>
            <img src={`${MEDIA}/${b.bild}-detalj-960.webp`} alt="" width={960} height={638} loading="lazy" decoding="async" />
            <div className={styles.filmText}>
              <p className={styles.filmRubrik}>Här kommer filmen</p>
              <p>En lugn runda runt bilen, motorn i gång och en titt under huven. Ungefär 40 sekunder.</p>
            </div>
          </div>

          <h2 className={styles.delRubrik}>Specifikationer</h2>
          <dl className={styles.specar}>
            {b.specar.map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>

          <h2 className={styles.delRubrik}>Utrustning</h2>
          <ul className={styles.utrustning}>
            {b.utrustning.map((u) => <li key={u}>{u}</li>)}
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

          <div className={styles.pengar}>
            <div>
              <p className={styles.etikett}>Pris</p>
              <p className={styles.pengarStor}>{b.pris} kr</p>
            </div>
            <div>
              <p className={styles.etikett}>Eller per månad</p>
              <p className={styles.pengarStor}>från {b.manad} kr/mån</p>
              <p className={styles.pengarNot}>{LANEVILLKOR} Kontantinsats {b.kontant} kr.</p>
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

          <h2 className={styles.delRubrik}>Fler bilar</h2>
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
