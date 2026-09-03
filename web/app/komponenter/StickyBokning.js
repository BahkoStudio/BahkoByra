'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Maskot from './Maskot';
import styles from './StickyBokning.module.css';

/* Fast bokningsrad i nederkant (siterabbits "Book a call"). Visas när heron
   lämnats, göms när footern är i bild och när något lager (popup, mobilmeny)
   låst scrollen — body[data-lager] sätts av de komponenterna. */
export default function StickyBokning() {
  const [synlig, setSynlig] = useState(false);

  useEffect(() => {
    let forbiHero = false;
    let footerSyns = false;
    let lager = false;

    const uppdatera = () => setSynlig(forbiHero && !footerSyns && !lager);

    /* Raden kommer först när besökaren lämnat videon (design-loopen runda 3):
       innan dess låg den över spelknappen. Saknas videosektionen gäller heron. */
    const video = document.getElementById('video');
    const vidScroll = () => {
      forbiHero = video
        ? video.getBoundingClientRect().bottom < window.innerHeight * 0.5
        : window.scrollY > window.innerHeight * 0.9;
      uppdatera();
    };
    vidScroll();
    window.addEventListener('scroll', vidScroll, { passive: true });

    const footer = document.querySelector('footer');
    let obs = null;
    if (footer && 'IntersectionObserver' in window) {
      obs = new IntersectionObserver(
        (poster) => {
          footerSyns = poster.some((p) => p.isIntersecting);
          uppdatera();
        },
        { threshold: 0.05 }
      );
      obs.observe(footer);
    }

    /* Popup och mobilmeny sätter data-lager på body när de öppnar */
    const mo = new MutationObserver(() => {
      lager = document.body.hasAttribute('data-lager');
      uppdatera();
    });
    mo.observe(document.body, { attributes: true, attributeFilter: ['data-lager'] });

    return () => {
      window.removeEventListener('scroll', vidScroll);
      if (obs) obs.disconnect();
      mo.disconnect();
    };
  }, []);

  return (
    <div className={`${styles.rad} ${synlig ? styles.synlig : ''}`} aria-hidden={!synlig}>
      <div className={styles.inner}>
        <span className={styles.figur}>
          <Maskot pose="master" stil="mini" alt="" stilla />
        </span>
        <span className={styles.text}>Se er nya hemsida innan ni bestämmer er.</span>
        <a href="tel:+46762540951" className={styles.ring} aria-label="Ring Bahko Byrå, 076-254 09 51">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.9 2z" />
          </svg>
        </a>
        <Link href="/kontakt/" className={`btn btn-primar ${styles.knapp}`} tabIndex={synlig ? 0 : -1}>
          Se er sida kostnadsfritt
        </Link>
      </div>
    </div>
  );
}
