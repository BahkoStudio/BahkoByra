'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './Header.module.css';

const LANKAR = [
  { href: '/tjanster/hemsidor/', text: 'Hemsidor' },
  { href: '/case/', text: 'Case' },
  { href: '/om-oss/', text: 'Om oss' },
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
    return () => {
      document.body.style.overflow = '';
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
        </nav>

        <div className={styles.hoger}>
          <Link href="/kontakt/" className={`btn btn-primar ${styles.headerKnapp}`}>
            Gratis förslag
          </Link>
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
        <Link href="/kontakt/" className="btn btn-primar">
          Gratis förslag
        </Link>
      </div>
    </header>
  );
}
