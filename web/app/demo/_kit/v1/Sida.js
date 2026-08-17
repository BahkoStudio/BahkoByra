import Image from 'next/image';
import { text } from '../../_data/_schema.js';
import { Hero, ForeEfter, Loften, Entre, Krom, OffertKnapp } from './Rorliga.js';
import s from './demo.module.css';

/**
 * Sida — komponerar en demo ur dess datafil.
 *
 * Ordningen är hook → överlämning → problem → bevis → riskreversering → hur →
 * vad → vem → handling. En hantverkskund köper på "det ser ut som jag kan lita
 * på dem" långt före "de har en snygg processgrafik", så beviset kommer före
 * löftet och löftet före processen.
 *
 * Sektionsordningen är data: saknas ett block i datafilen renderas det inte.
 * En lead utan före/efter-bilder får en kortare sida, aldrig en trasig.
 */
export default function Sida({ demo }) {
  const telefon = text(demo.kontakt.telefon);
  const telLank = text(demo.kontakt.telefonLank || demo.kontakt.telefon).replace(/\s/g, '');
  const verb = demo.cta.verb;

  return (
    <div className={`${s.rot} mork`} data-demo={demo.slug} id="top">
      <Krom demo={demo} telefon={telefon} telLank={telLank} />

      <Hero hero={demo.hero} ctaVerb={verb} />

      {/* 001 — den bärande idén, med ärlighetsmeningen som avslutning */}
      {demo.barande && (
        <Entre className={s.sektion} qa="barande">
          <div className={`${s.inner} ${s.tvaKol}`}>
            <div>
              <span className={s.sekEtikett} data-stig style={{ '--i': 0 }}>{demo.barande.etikett}</span>
              <h2 className={s.sekRubrik} data-stig style={{ '--i': 1 }}>{demo.barande.rubrik}</h2>
              {demo.barande.stycken.map((p, i) => (
                <p className={s.brod} key={p.slice(0, 24)} data-stig style={{ '--i': 2 + i }}>{p}</p>
              ))}
              <p className={s.arlig} data-stig style={{ '--i': 4 }}>{demo.arligMening}</p>
            </div>
            {demo.barande.bild && (
              <div className={s.bildruta} data-stig style={{ '--i': 3 }}>
                <Image
                  src={demo.barande.bild.fil} alt={demo.barande.bild.alt}
                  fill sizes="(max-width:768px) 100vw, 520px"
                />
              </div>
            )}
          </div>
        </Entre>
      )}

      {demo.foreEfter && <ForeEfter data={demo.foreEfter} />}
      {demo.loften && <Loften data={demo.loften} />}

      {demo.process && (
        <Entre className={`${s.sektion} ${s.sektionYta}`} qa="process">
          <div className={s.inner} id="process">
            <span className={s.sekEtikett} data-stig style={{ '--i': 0 }}>{demo.process.etikett}</span>
            <h2 className={s.sekRubrik} data-stig style={{ '--i': 1 }}>{demo.process.rubrik}</h2>
            <div className={s.spar}>
              {demo.process.steg.map((st, i) => (
                <div className={s.steg} key={st.n} data-stig style={{ '--i': 2 + i }}>
                  <div className={s.stegN}>{st.n}</div>
                  <h3>{st.rubrik}</h3>
                  <p>{st.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Entre>
      )}

      {demo.tjanster && (
        <Entre className={s.sektion} qa="tjanster">
          <div className={`${s.inner} ${s.smal}`}>
            <span className={s.sekEtikett} data-stig style={{ '--i': 0 }}>{demo.tjanster.etikett}</span>
            <h2 className={s.sekRubrik} data-stig style={{ '--i': 1 }}>{demo.tjanster.rubrik}</h2>
            {demo.tjanster.rader.map((t, i) => (
              <div className={s.tjanstRad} key={t.namn} data-stig style={{ '--i': 2 + i }}>
                <span className={s.tjanstNamn}>{t.namn}</span>
                <span className={s.tjanstTagg}>{t.tagg}</span>
                <span className={s.tjanstDetalj}>{t.detalj}</span>
              </div>
            ))}
          </div>
        </Entre>
      )}

      {demo.galleri && (
        <Entre className={`${s.sektion} ${s.sektionYta}`} qa="galleri">
          <div className={s.inner} id="galleri">
            <span className={s.sekEtikett} data-stig style={{ '--i': 0 }}>{demo.galleri.etikett}</span>
            <h2 className={s.sekRubrik} data-stig style={{ '--i': 1 }}>{demo.galleri.rubrik}</h2>
            <div className={s.galleri}>
              {demo.galleri.bilder.map((b, i) => (
                <figure className={s.galleriRuta} key={b.fil} data-stig style={{ '--i': 2 + (i % 3) }}>
                  {/* fill: inga width/height-attribut, lådan äger höjden. */}
                  <Image src={b.fil} alt={b.alt} fill sizes="(max-width:768px) 50vw, 300px" />
                  <figcaption className={s.bildtext}>{b.bildtext}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </Entre>
      )}

      {demo.om && (
        <Entre className={s.sektion} qa="om">
          <div className={`${s.inner} ${s.tvaKol}`} id="om-oss">
            <div>
              <span className={s.sekEtikett} data-stig style={{ '--i': 0 }}>{demo.om.etikett}</span>
              <h2 className={s.sekRubrik} data-stig style={{ '--i': 1 }}>{demo.om.rubrik}</h2>
              {demo.om.stycken.map((p, i) => (
                <p className={s.brod} key={p.slice(0, 24)} data-stig style={{ '--i': 2 + i }}>{p}</p>
              ))}
              <ul className={s.brod} data-stig style={{ '--i': 4 }}>
                {demo.om.punkter.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </div>
            {demo.om.bild && (
              <div className={s.bildruta} data-stig style={{ '--i': 3 }}>
                <Image src={demo.om.bild.fil} alt={demo.om.bild.alt} fill sizes="(max-width:768px) 100vw, 520px" />
              </div>
            )}
          </div>
        </Entre>
      )}

      {demo.kontakt && (
        <Entre className={`${s.sektion} ${s.sektionYta}`} qa="kontakt">
          <div className={`${s.inner} ${s.tvaKol}`} id="kontakt">
            <div>
              <span className={s.sekEtikett} data-stig style={{ '--i': 0 }}>{demo.kontakt.etikett}</span>
              <h2 className={s.sekRubrik} data-stig style={{ '--i': 1 }}>{demo.kontakt.rubrik}</h2>
              <a className={s.telStor} href={`tel:${telLank}`} data-stig style={{ '--i': 2 }}>{telefon}</a>
              <div className={s.rad} data-stig style={{ '--i': 3 }}><b>Mejl</b>{demo.kontakt.epost}</div>
              {demo.kontakt.instagram && (
                <div className={s.rad} data-stig style={{ '--i': 4 }}><b>Instagram</b>{demo.kontakt.instagram}</div>
              )}
              <div className={s.rad} data-stig style={{ '--i': 5 }}><b>Område</b>{demo.kontakt.omrade}</div>
              {demo.kontakt.rot && (
                <div className={s.rad} data-stig style={{ '--i': 6 }}><b>ROT</b>{demo.kontakt.rot}</div>
              )}
            </div>
            <div className={s.offertkort} data-stig style={{ '--i': 4 }}>
              <h3>{demo.kontakt.offertkort.rubrik}</h3>
              <p>{demo.kontakt.offertkort.text}</p>
              <OffertKnapp verb={verb} bred />
            </div>
          </div>
        </Entre>
      )}

      <Entre className={`${s.sektion} ${s.slutcta}`} qa="slutcta">
        <div className={s.inner}>
          <span className={s.sekEtikett} data-stig style={{ '--i': 0 }}>{demo.slutcta.etikett}</span>
          <h2 className={s.rubrik} data-stig style={{ '--i': 1 }}>
            <span className={s.setup}>{demo.slutcta.setup}</span>
            <span className={s.punch}>{demo.slutcta.punch}</span>
          </h2>
          <div data-stig style={{ '--i': 2 }}><OffertKnapp verb={verb} /></div>
          <span className={s.ctaUnder} data-stig style={{ '--i': 3 }}>
            <a href={`tel:${telLank}`}>{telefon}</a> · {demo.slutcta.under}
          </span>
        </div>
      </Entre>

      <footer className={s.fot}>
        <span>{demo.varumarke.namn} · {demo.varumarke.ort} · Demo</span>
        <span>
          <a href={`tel:${telLank}`}>{telefon}</a>
          {' · Byggd av '}
          <a href="https://bahkobyra.se" target="_blank" rel="noopener">Bahko Byrå</a>
        </span>
      </footer>
    </div>
  );
}
