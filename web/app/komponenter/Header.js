'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Maskot from './Maskot';
import styles from './Header.module.css';

// Kunderna ligger i menyn: den som inte känner oss vill se riktiga sajter först.
const LANKAR = [
  { href: '/tjanster/hemsidor/', text: 'Hemsidor' },
  { href: '/case/', text: 'Kunder' },
  { href: '/om-oss/', text: 'Om oss' },
];

const EXTERNA = [
  { href: '/foretag/gratis-granskning.html', text: 'Kostnadsfri analys' },
  { href: '/foretag/gratis-guide.html', text: 'Kostnadsfri guide' },
];

export default function Header() {
  const [scrollad, setScrollad] = useState(false);
  const [oppen, setOppen] = useState(false);
  const sokvag = usePathname();

  // Sticky header: bakgrunden tätnar när sidan lämnat toppen.
  useEffect(() => {
    const vidScroll = () => setScrollad(window.scrollY > 8);
    vidScroll();
    window.addEventListener('scroll', vidScroll, { passive: true });
    return () => window.removeEventListener('scroll', vidScroll);
  }, []);

  // Menyn stängs vid sidbyte, annars ligger den kvar över nya sidan.
  useEffect(() => setOppen(false), [sokvag]);

  // Ingen bakgrundsscroll bakom öppen mobilmeny.
  useEffect(() => {
    document.body.style.overflow = oppen ? 'hidden' : '';
    // Bokningsraden läser data-lager och gömmer sig medan menyn är öppen
    if (oppen) document.body.setAttribute('data-lager', 'meny');
    else document.body.removeAttribute('data-lager');
    return () => {
      document.body.style.overflow = '';
      document.body.removeAttribute('data-lager');
    };
  }, [oppen]);

  return (
    <header className={`${styles.header} ${scrollad ? styles.tat : ''}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.marke} aria-label="Bahko Byrå, till startsidan">
          <img src="/brand/mark.svg" alt="" width="34" height="34" />
          <span>Bahko Byrå</span>
        </Link>

        <nav className={styles.nav} aria-label="Huvudmeny">
          {LANKAR.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={sokvag.startsWith(l.href) ? styles.aktiv : undefined}
            >
              {l.text}
            </Link>
          ))}
          {EXTERNA.map((l) => (
            <a key={l.href} href={l.href}>
              {l.text}
            </a>
          ))}
        </nav>

        <div className={styles.hoger}>
          <span className={styles.headerMaskot}>
            <Maskot pose="vinkar" stil="mini" alt="" stilla />
          </span>
          <Link href="/kontakt/" className={`btn btn-primar ${styles.headerKnapp}`}>
            Kostnadsfritt förslag
          </Link>
          {/* Mobilen: numret ska gå att trycka på utan att öppna menyn. */}
          <a href="tel:+46762540951" className={styles.ringa} aria-label="Ring Bahko Byrå, 076-254 09 51">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.9 2z" />
            </svg>
          </a>
          <button
            className={styles.burgare}
            onClick={() => setOppen((v) => !v)}
            aria-expanded={oppen}
            aria-controls="mobilmeny"
            aria-label={oppen ? 'Stäng meny' : 'Öppna meny'}
          >
            <span className={oppen ? styles.strecka1 : ''} />
            <span className={oppen ? styles.strecka2 : ''} />
          </button>
        </div>
      </div>

      <div id="mobilmeny" className={`${styles.mobil} ${oppen ? styles.mobilOppen : ''}`} hidden={!oppen}>
        {LANKAR.map((l) => (
          <Link key={l.href} href={l.href}>
            {l.text}
          </Link>
        ))}
        {EXTERNA.map((l) => (
          <a key={l.href} href={l.href}>
            {l.text}
          </a>
        ))}
        <a href="tel:+46762540951">Ring 076-254 09 51</a>
        <Link href="/kontakt/" className="btn btn-primar">
          Kostnadsfritt förslag
        </Link>
      </div>
    </header>
  );
}
