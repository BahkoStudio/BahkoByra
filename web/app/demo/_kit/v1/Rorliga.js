'use client';

/**
 * Rorliga.js — allt på demon som reagerar på scroll eller klick.
 *
 * Samlat i en klientfil så att resten av sidan kan vara serverrenderad.
 */

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useScenProgress, useRullProgress, useEntre, useRaknare } from './rorelse.js';
import s from './demo.module.css';

/** Sektioner ber om modalen via en händelse; bara Krom äger själva modalen. */
export const OFFERT_HANDELSE = 'bahko:offert';

/* ------------------------------------------------------------------- hero */

/**
 * Hero + överlämningen.
 *
 * Med bara en video behövs en övergång som förklarar varför filmen tar slut:
 * den fryser till fotografi (videons sista bildruta), rubriken lyfter bort,
 * och resten av sidan är byggd av det fotografiet. Ersätter circle-wipen, som
 * krävde ett andra videolager.
 */
export function Hero({ hero, ctaVerb, onOffert }) {
  const scen = useRef(null);
  const vid = useRef(null);
  const frys = useRef(null);
  const text = useRef(null);

  useScenProgress(scen, (p) => {
    // Filmen tonar över i stillbild mellan 15 % och 55 % av scenen.
    const t = Math.max(0, Math.min(1, (p - 0.15) / 0.4));
    if (frys.current) frys.current.style.opacity = String(t);
    if (text.current) {
      text.current.style.transform = `translateY(${-p * 40}px)`;
      text.current.style.opacity = String(Math.max(0, 1 - p * 1.8));
    }
    // Spara batteri när filmen ändå inte syns.
    const v = vid.current;
    if (v) { if (t > 0.9 && !v.paused) v.pause(); else if (t < 0.85 && v.paused) v.play().catch(() => {}); }
  });

  // Autoplay nekas ibland tills användaren rört skärmen.
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const knuff = () => vid.current?.play().catch(() => {});
    addEventListener('touchstart', knuff, { once: true, passive: true });
    addEventListener('pointerdown', knuff, { once: true, passive: true });
    return () => {
      removeEventListener('touchstart', knuff);
      removeEventListener('pointerdown', knuff);
    };
  }, []);

  return (
    <section className={s.scen} ref={scen} data-qa="hero">
      <div className={s.klister}>
        <div className={s.heroMedia}>
          <video
            ref={vid} src={hero.video} poster={hero.poster}
            autoPlay muted loop playsInline preload="auto" aria-hidden="true"
          />
          {/* Videons sista bildruta — hämtad med ffmpeg, kostar inga credits. */}
          <img ref={frys} className={s.frysbild} src={hero.frysbild} alt="" aria-hidden="true" />
        </div>
        <div className={s.korn} />
        <div className={s.heroText} ref={text}>
          <span className={s.etikett}>{hero.etikett}</span>
          <h1 className={s.rubrik}>
            <span className={s.setup}>{hero.setup}</span>
            <span className={s.punch}>{hero.punch}</span>
          </h1>
          <p className={s.tagline}>{hero.tagline}</p>
        </div>
        <div className={s.scrollcue}>
          <span>{hero.scrollcue}</span>
          <span className={s.pil} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- före/efter */

export function ForeEfter({ data }) {
  const ruta = useRef(null);
  const efter = useRef(null);
  useRullProgress(ruta, (p) => {
    if (efter.current) efter.current.style.clipPath = `inset(0 ${(1 - p) * 100}% 0 0)`;
  }, { fran: 0.9, till: 0.35 });

  const ref = useEntre();
  return (
    <section className={`${s.sektion} ${s.sektionYta}`} data-qa="foreefter" ref={ref}>
      <div className={`${s.inner} ${s.smal}`}>
        <span className={s.sekEtikett} data-stig style={{ '--i': 0 }}>{data.etikett}</span>
        <h2 className={s.sekRubrik} data-stig style={{ '--i': 1 }}>{data.rubrik}</h2>
        {data.ingress && <p className={s.brod} data-stig style={{ '--i': 2 }}>{data.ingress}</p>}
        <div className={s.foreEfter} ref={ruta} data-stig style={{ '--i': 3 }}>
          <Image src={data.fore.fil} alt={data.fore.alt} fill sizes="(max-width:768px) 100vw, 920px" />
          <div className={s.efterLager} ref={efter} style={{ position: 'absolute', inset: 0 }}>
            <Image src={data.efter.fil} alt={data.efter.alt} fill sizes="(max-width:768px) 100vw, 920px" />
          </div>
          <span className={`${s.feEtikett} ${s.feFore}`}>{data.fore.text}</span>
          <span className={`${s.feEtikett} ${s.feEfter}`}>{data.efter.text}</span>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ löften */

export function Loften({ data }) {
  const ref = useEntre();
  const bage = useRef(null);
  const tal = useRef(null);
  const OMKRETS = 2 * Math.PI * 86;

  useRaknare(tal, data.matare.tal);
  useRullProgress(ref, (p) => {
    if (bage.current) bage.current.style.strokeDashoffset = String(OMKRETS * (1 - p * 0.88));
  }, { fran: 0.9, till: 0.4 });

  return (
    <section className={s.sektion} data-qa="loften" ref={ref}>
      <div className={s.inner}>
        <span className={s.sekEtikett} data-stig style={{ '--i': 0 }}>{data.etikett}</span>
        <h2 className={s.sekRubrik} data-stig style={{ '--i': 1 }}>{data.rubrik}</h2>
        <div className={s.loftenGrid}>
          <div className={s.matare} data-stig style={{ '--i': 2 }}>
            <svg viewBox="0 0 190 190" aria-hidden="true">
              <circle className={s.matarSpar} cx="95" cy="95" r="86" />
              <circle
                className={s.matarBage} cx="95" cy="95" r="86" ref={bage}
                strokeDasharray={OMKRETS} strokeDashoffset={OMKRETS}
              />
            </svg>
            <div className={s.matarTal}>
              <span><span ref={tal}>0</span>{data.matare.suffix}</span>
            </div>
          </div>
          <div className={s.loftenRader}>
            <div className={s.loftRad} data-stig style={{ '--i': 3 }}>
              <span className={s.loftTal}>{data.matare.tal}{data.matare.suffix}</span>
              <span className={s.loftEtikett}>{data.matare.etikett}</span>
            </div>
            {data.rader.map((r, i) => (
              <div className={s.loftRad} key={r.etikett} data-stig style={{ '--i': 4 + i }}>
                <span className={s.loftTal}>{r.tal}{r.suffix}</span>
                <span className={s.loftEtikett}>{r.etikett}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- entré-omslag */

/** Server-sektioner som bara behöver entréanimation lindas i denna. */
export function Entre({ children, className, qa }) {
  const ref = useEntre();
  return <section className={className} data-qa={qa} ref={ref}>{children}</section>;
}

/* -------------------------------------------------------------------- krom */

const Telefonikon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" />
  </svg>
);

/**
 * Krom — header, mobilnav, flytknapp, nudge och Bahko-modalen.
 * Allt CTA-текст kommer från demo.cta.verb: en sträng, sex platser.
 */
export function Krom({ demo, telefon, telLank }) {
  const [tat, setTat] = useState(false);
  const [flyt, setFlyt] = useState(false);
  const [nav, setNav] = useState(false);
  const [nudge, setNudge] = useState(false);
  const [modal, setModal] = useState(false);
  const nudgeAv = useRef(false);
  const progress = useRef(null);
  const verb = demo.cta.verb;

  useEffect(() => {
    const vidScroll = () => {
      setTat(scrollY > 8);
      setFlyt(scrollY > innerHeight * 0.6);
      if (progress.current) {
        const h = document.documentElement.scrollHeight - innerHeight;
        progress.current.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
      }
    };
    vidScroll();
    addEventListener('scroll', vidScroll, { passive: true });
    return () => removeEventListener('scroll', vidScroll);
  }, []);

  // Tre knuffar, sedan tyst. Avbryts direkt om någon öppnar modalen.
  useEffect(() => {
    const klockor = [10000, 100000, 160000].map((ms) => setTimeout(() => {
      if (nudgeAv.current) return;
      setNudge(true);
      setTimeout(() => setNudge(false), 8000);
    }, ms));
    return () => klockor.forEach(clearTimeout);
  }, []);

  const oppnaModal = useCallback(() => {
    nudgeAv.current = true;
    setNudge(false);
    setModal(true);
    document.body.style.overflow = 'hidden';
  }, []);
  const stangModal = useCallback(() => {
    setModal(false);
    document.body.style.overflow = '';
  }, []);

  useEffect(() => {
    const tangent = (e) => { if (e.key === 'Escape') { stangModal(); setNav(false); } };
    addEventListener('keydown', tangent);
    addEventListener(OFFERT_HANDELSE, oppnaModal);
    return () => {
      removeEventListener('keydown', tangent);
      removeEventListener(OFFERT_HANDELSE, oppnaModal);
    };
  }, [stangModal, oppnaModal]);

  const mejl = `mailto:mathias@bahkobyra.se?subject=${encodeURIComponent(demo.bahko.mejlAmne)}`
    + `&body=${encodeURIComponent(`Hej Mathias, jag såg ${demo.varumarke.namn}-demon och vill veta mer.`)}`;

  return (
    <>
      <div className={s.progress} ref={progress} />

      <header className={`${s.header} ${tat ? s.headerTat : ''}`}>
        <a href="#top" className={s.logga}>
          {demo.varumarke.ordmark[0]}<em>{demo.varumarke.ordmark[1]}</em>
        </a>
        <nav className={s.nav}>
          <a href="#om-oss">Om oss</a>
          <a href="#process">Så går det till</a>
          <a href="#kontakt">Kontakt</a>
          <a className={s.navTel} href={`tel:${telLank}`}>{telefon}</a>
          <button type="button" className="btn btn-primar" onClick={oppnaModal}>{verb}</button>
        </nav>
        <a className={s.ringknapp} href={`tel:${telLank}`} aria-label={`Ring ${demo.varumarke.namn}, ${telefon}`}>
          <Telefonikon />
        </a>
        <button
          type="button" className={`${s.hamburgare} ${nav ? s.hamburgareOppen : ''}`}
          onClick={() => setNav((v) => !v)} aria-label="Meny" aria-expanded={nav}
        >
          <span /><span /><span />
        </button>
      </header>

      <nav className={`${s.mobilnav} ${nav ? s.mobilnavOppen : ''}`}>
        <a href="#om-oss" onClick={() => setNav(false)}>Om oss</a>
        <a href="#process" onClick={() => setNav(false)}>Så går det till</a>
        <a href="#kontakt" onClick={() => setNav(false)}>Kontakt</a>
        <a href={`tel:${telLank}`} onClick={() => setNav(false)}>{telefon}</a>
        <button
          type="button" className="btn btn-primar"
          onClick={() => { setNav(false); oppnaModal(); }}
        >{verb}</button>
      </nav>

      {/* Mobil ringer, desktop begär offert — samma verb i båda fallen. */}
      <a className={`${s.flyt} ${flyt ? s.flytSyns : ''}`} href={`tel:${telLank}`} data-qa="flyt-mobil">
        Ring {telefon}
      </a>

      <div className={`${s.nudge} ${nudge ? s.nudgeSyns : ''}`} role="complementary" aria-label="Erbjudande">
        <button type="button" className={s.stang} onClick={() => setNudge(false)} aria-label="Stäng">✕</button>
        <div className={s.nudgeKick}>{demo.nudge.kicker}</div>
        <p>{demo.nudge.text}</p>
        <button type="button" className="btn btn-primar" style={{ width: '100%' }} onClick={oppnaModal}>{verb}</button>
      </div>

      <div
        className={`${s.modalBg} ${modal ? s.modalOppen : ''}`}
        onClick={(e) => { if (e.target === e.currentTarget) stangModal(); }}
      >
        <div className={s.modal} role="dialog" aria-modal="true" aria-label={demo.bahko.rubrik}>
          <button type="button" className={s.stang} onClick={stangModal} aria-label="Stäng">✕</button>
          <div className={s.modalBadge}>Demo av Bahko Byrå</div>
          <h3>{demo.bahko.rubrik}</h3>
          <p>{demo.bahko.text}</p>
          <button
            type="button" className="btn btn-primar" style={{ width: '100%' }}
            data-cal-namespace="15min" data-cal-link={demo.bahko.cal} data-cal-origin="https://cal.eu"
          >
            Boka 15 min gratis samtal →
          </button>
          <a className={s.modalAlt} href={mejl}>Eller mejla → mathias@bahkobyra.se</a>
        </div>
      </div>
    </>
  );
}

/**
 * Knapp som öppnar Bahko-modalen från en serverrenderad sektion.
 * Går via en händelse i stället för att peta i DOM: sektionerna behöver då
 * inte känna till kromet, och modalen förblir Kroms ensamma ansvar.
 */
export function OffertKnapp({ verb, bred = false }) {
  return (
    <button
      type="button" className="btn btn-primar"
      style={bred ? { width: '100%' } : undefined}
      onClick={() => dispatchEvent(new CustomEvent(OFFERT_HANDELSE))}
    >
      {verb}
    </button>
  );
}
