'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './eriksonbil.module.css';
import { BAS, MEDIA } from './_bilar';

/* Bilsidan, byggd som Teslas designsida: stor bild till vänster med punkter man
   trycker på, bildväxlare under, panel till höger och en fast rad längst ner.
   Ingen köpknapp: raden leder till "Boka visning". */

const PUNKTNAMN = { exterior: 'Exteriör', interior: 'Interiör', teknik: 'Teknik', historik: 'Historik' };

export default function Studio({ b, villkor, children }) {
  const d = `${MEDIA}/${b.bild}`;
  const spec = Object.fromEntries(b.specar);
  const bilder = [
    { src: `${d}-1920.webp`, srcSet: `${d}-1280.webp 1280w, ${d}-1920.webp 1920w`, alt: b.alt },
    { src: `${d}-bak-1600.webp`, srcSet: `${d}-bak-960.webp 960w, ${d}-bak-1600.webp 1600w`, alt: `${b.marke} ${b.modell} bakifrån` },
    { src: `${d}-inne-1600.webp`, srcSet: `${d}-inne-960.webp 960w, ${d}-inne-1600.webp 1600w`, alt: `Förarplats och instrumentbräda i ${b.marke} ${b.modell}` },
    { src: `${d}-detalj-1600.webp`, srcSet: `${d}-detalj-960.webp 960w, ${d}-detalj-1600.webp 1600w`, alt: `Framhjul och strålkastare på ${b.marke} ${b.modell}` },
  ];

  const [bild, setBild] = useState(0);
  const [oppen, setOppen] = useState(null);
  const [finans, setFinans] = useState(false);
  const spar = useRef(null);
  const ruta = useRef(null);

  useEffect(() => {
    if (oppen && ruta.current && !ruta.current.open) ruta.current.showModal();
  }, [oppen]);

  function gaTill(i) {
    const el = spar.current;
    if (!el) return;
    const n = (i + bilder.length) % bilder.length;
    const lugn = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollTo({ left: n * el.clientWidth, behavior: lugn ? 'auto' : 'smooth' });
  }

  const info = {
    exterior: { bild: `${d}-bak-960.webp`, text: `${b.farg}. ${spec.Kaross}.`, lista: b.ute },
    interior: { bild: `${d}-inne-960.webp`, text: 'Sätt dig i den på visningen. Det säger mer än bilderna.', lista: b.inne },
    teknik: {
      bild: `${d}-detalj-960.webp`,
      text: b.teknik,
      rader: [['Drivmedel', spec.Drivmedel], ['Effekt', spec.Effekt], ['Växellåda', spec['Växellåda']], ['Drivning', spec.Drivning]],
    },
    historik: {
      bild: `${d}-1280.webp`,
      text: 'Servicehäftet ligger i bilen. Läs det själv vid visningen.',
      rader: [['Ägare', spec['Ägare']], ['Besiktigad', spec.Besiktigad]],
      service: b.service,
    },
  };
  const visad = oppen ? info[oppen] : null;

  return (
    <>
      <div className={styles.studio}>
        <div className={styles.scen}>
          <div className={styles.ram}>
            <div
              className={styles.spar}
              ref={spar}
              tabIndex={0}
              aria-label={`Bilder på ${b.marke} ${b.modell}. Bläddra i sidled.`}
              onScroll={(e) => setBild(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
            >
              {bilder.map((x, i) => (
                <div key={x.src} className={styles.bildruta}>
                  <img
                    src={x.src}
                    srcSet={x.srcSet}
                    sizes="(min-width: 900px) calc(100vw - 27rem), 100vw"
                    alt={x.alt}
                    width={1920}
                    height={1080}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    fetchPriority={i === 0 ? 'high' : 'auto'}
                    decoding="async"
                  />
                  {i === 0 && b.punkter.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      className={`${styles.punkt} ${p.etikett > p.y ? styles.punktNer : ''}`}
                      style={{ left: `${p.x}%`, top: `${Math.min(p.y, p.etikett)}%`, height: `${Math.abs(p.y - p.etikett)}%` }}
                      aria-haspopup="dialog"
                      onClick={() => setOppen(p.id)}
                    >
                      <span className={styles.punktEtikett}>
                        {PUNKTNAMN[p.id]}
                        <span className={styles.plus} aria-hidden="true">+</span>
                      </span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.reglage}>
            <button type="button" className={styles.pil} onClick={() => gaTill(bild - 1)} aria-label="Förra bilden">
              <svg width="12" height="20" viewBox="0 0 12 20" aria-hidden="true"><path d="M10 2 2 10l8 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <div className={styles.prickar}>
              {bilder.map((x, i) => (
                <button
                  key={x.src}
                  type="button"
                  className={`${styles.prick} ${i === bild ? styles.prickAktiv : ''}`}
                  onClick={() => gaTill(i)}
                  aria-label={`Bild ${i + 1} av ${bilder.length}`}
                  aria-current={i === bild ? 'true' : undefined}
                />
              ))}
            </div>
            <button type="button" className={styles.pil} onClick={() => gaTill(bild + 1)} aria-label="Nästa bild">
              <svg width="12" height="20" viewBox="0 0 12 20" aria-hidden="true"><path d="m2 2 8 8-8 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
          <p className={styles.illustration}>Bilderna är illustrationer. Den riktiga bilen fotograferas när den kommer in.</p>
        </div>

        <div className={styles.panel} id="fakta">
          <span className={styles.exempel}>Exempelbil</span>
          <h1 className={styles.panelRubrik}>{b.marke} {b.modell}</h1>
          <p className={styles.panelVersion}>{b.version}</p>

          <ul className={styles.nyckeltal} aria-label="Fakta">
            <li><b>{b.ar}</b><span>Årsmodell</span></li>
            <li><b>{b.mil}<small> mil</small></b><span>Miltal</span></li>
            <li><b>{spec.Effekt.replace(' hk', '')}<small> hk</small></b><span>Effekt</span></li>
          </ul>

          <div className={styles.val} role="group" aria-label="Visa priset som">
            <button type="button" aria-pressed={!finans} className={!finans ? styles.valAktiv : undefined} onClick={() => setFinans(false)}>Kontant</button>
            <button type="button" aria-pressed={finans} className={finans ? styles.valAktiv : undefined} onClick={() => setFinans(true)}>Finansiering</button>
          </div>
          <div className={styles.prisKort} aria-live="polite">
            {finans ? (
              <>
                <p className={styles.prisRad}><span>{b.marke} {b.modell}</span><b>från {b.manad} kr/mån</b></p>
                <p className={styles.prisNot}>{villkor} Kontantinsats {b.kontant} kr.</p>
              </>
            ) : (
              <>
                <p className={styles.prisRad}><span>{b.marke} {b.modell}</span><b>{b.pris} kr</b></p>
                <p className={styles.prisNot}>Besiktigad {spec.Besiktigad.toLowerCase()}. {spec['Ägare'].replace(' st', '')} ägare.</p>
              </>
            )}
          </div>
          <div className={styles.panelKnappar}>
            <a href="#boka" className={styles.knappGuld}>Boka visning</a>
            <a href="#ring" className={styles.knappGhost}>Ring oss</a>
          </div>

          <p className={styles.panelIngress}>{b.ingress}</p>

          {children}
        </div>
      </div>

      <div className={styles.rad}>
        <div className={styles.radVanster}>
          <p className={styles.radNamn}>{b.marke} {b.modell}</p>
          <p className={styles.radInfo}>{b.ar} · {b.mil} mil · {spec.Drivmedel.split(' (')[0]} · {b.farg}</p>
        </div>
        <div className={styles.radHoger}>
          <p className={styles.radPris}>
            <b>{finans ? `${b.manad} kr/mån` : `${b.pris} kr`}</b>
            <span>{finans ? 'Räkneexempel' : 'Pris'}</span>
          </p>
          <a href="#boka" className={styles.knappGuld}>Boka visning</a>
        </div>
      </div>

      <dialog
        ref={ruta}
        className={styles.ruta}
        aria-labelledby="ruta-rubrik"
        onClose={() => setOppen(null)}
        onClick={(e) => { if (e.target === e.currentTarget) e.currentTarget.close(); }}
      >
        {visad && (
          <div className={styles.rutaInre}>
            <div className={styles.rutaBild}>
              <img src={visad.bild} alt="" width={960} height={638} decoding="async" />
            </div>
            <div className={styles.rutaInfo}>
              <p className={styles.etikett}>{b.marke} {b.modell}</p>
              <h2 id="ruta-rubrik" className={styles.rutaRubrik}>{PUNKTNAMN[oppen]}</h2>
              <p className={styles.rutaIngress}>{visad.text}</p>
              {visad.lista && (
                <ul className={styles.utrustning}>
                  {visad.lista.map((u) => <li key={u}>{u}</li>)}
                </ul>
              )}
              {visad.rader && (
                <dl className={styles.rutaRader}>
                  {visad.rader.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
                </dl>
              )}
              {visad.service && (
                <ol className={styles.service}>
                  {visad.service.map(([nar, mil, vad]) => (
                    <li key={nar}>
                      <p className={styles.serviceNar}>{nar}</p>
                      <p className={styles.serviceMil}>{mil}</p>
                      <p className={styles.serviceVad}>{vad}</p>
                    </li>
                  ))}
                </ol>
              )}
              <a href={`${BAS}/${b.slug}/#boka`} className={styles.knappGuld} onClick={() => ruta.current?.close()}>Boka visning</a>
            </div>
            <button type="button" className={styles.rutaStang} onClick={() => ruta.current?.close()} aria-label="Stäng">
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="m2 2 12 12M14 2 2 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
