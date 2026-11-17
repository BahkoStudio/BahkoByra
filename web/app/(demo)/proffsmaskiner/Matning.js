'use client';

/* GA4 med samtycke för proffsmaskiner.se. Samma beteende som på de andra
   kundsajterna: ingen mätkod, inga kakor och ingen begäran till Google innan
   besökaren sagt ja. Valet sparas i localStorage under pm-consent.
   Komponenten monteras bara på kunddomänen (se page.js). */
import { useEffect, useState } from 'react';
import styles from './proffsmaskiner.module.css';

const GA4 = 'G-G74WFQ3CSE';
const NYCKEL = 'pm-consent';

const las = () => { try { return localStorage.getItem(NYCKEL); } catch { return null; } };
const spara = (v) => { try { localStorage.setItem(NYCKEL, v); } catch {} };

function laddaGA() {
  if (typeof window === 'undefined' || window.__pmGaLaddad) return;
  window.__pmGaLaddad = true;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA4);
}

function track(namn, params = {}) {
  if (typeof window !== 'undefined' && window.gtag && window.__pmGaLaddad) {
    window.gtag('event', namn, params);
  }
}

export default function Matning() {
  const [visa, setVisa] = useState(false);

  useEffect(() => {
    const c = las();
    if (c === 'ja') laddaGA();
    else if (c !== 'nej') setVisa(true);

    const klick = (e) => {
      const a = e.target.closest && e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      if (href === '#cookieval') {
        e.preventDefault();
        setVisa(true);
        return;
      }
      if (href.startsWith('tel:')) track('tel_klick', { sida: location.pathname });
      else if (href.startsWith('mailto:')) track('mejl_klick', { sida: location.pathname });
    };
    const skickat = (e) => {
      track('generate_lead', { formular: (e && e.detail) || 'okant', sida: location.pathname });
    };
    const skicka = (e) => {
      if (e.target && e.target.tagName === 'FORM') {
        track('form_forsok', { form_id: e.target.id || 'okand', sida: location.pathname });
      }
    };
    addEventListener('click', klick);
    addEventListener('bb:skickat', skickat);
    addEventListener('submit', skicka);
    return () => {
      removeEventListener('click', klick);
      removeEventListener('bb:skickat', skickat);
      removeEventListener('submit', skicka);
    };
  }, []);

  const svara = (ok) => {
    const hadeJa = las() === 'ja' || (typeof window !== 'undefined' && window.__pmGaLaddad);
    spara(ok ? 'ja' : 'nej');
    setVisa(false);
    if (ok) laddaGA();
    else if (hadeJa) location.reload();
  };

  if (!visa) return null;
  return (
    <div className={styles.samtycke} role="dialog" aria-label="Samtycke till statistik">
      <p>Får vi använda Google Analytics för att se hur sajten används? Det sätter kakor, och sker bara om du godkänner det.</p>
      <div className={styles.samtyckeKnappar}>
        <button type="button" className={styles.samtyckeJa} onClick={() => svara(true)}>Okej</button>
        <button type="button" className={styles.samtyckeNej} onClick={() => svara(false)}>Nej tack</button>
      </div>
    </div>
  );
}
