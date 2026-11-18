'use client';

/* GA4 med samtycke för kakel0413.se (SEO 2026-11-17, Mathias ja). Samma beteende som på
   proffsmaskiner.se och de andra kundsajterna: ingen mätkod, inga kakor och ingen begäran till
   Google innan besökaren sagt ja. Valet sparas i localStorage under k0413-consent.
   Monteras bara på kunddomänen (./kund/page.js), inte på bahkobyra.se/kakel0413/.
   Bara sidvisningar (gtag config), inga egna händelser i den här omgången.
   Länken "Cookieinställningar" i footern (#cookieval) öppnar rutan igen. */
import { useEffect, useState } from 'react';

const GA4 = 'G-NP4FL87QL5';
const NYCKEL = 'k0413-consent';

const las = () => { try { return localStorage.getItem(NYCKEL); } catch { return null; } };
const spara = (v) => { try { localStorage.setItem(NYCKEL, v); } catch {} };

function laddaGA() {
  if (typeof window === 'undefined' || window.__k0413GaLaddad) return;
  window.__k0413GaLaddad = true;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA4);
}

// Färgerna följer sidans tema (mörk skiffer, loggans orange som knapp).
const RUTA = {
  position: 'fixed', left: '50%', bottom: 'max(18px, env(safe-area-inset-bottom))', transform: 'translateX(-50%)',
  zIndex: 120, maxWidth: '28rem', width: 'calc(100% - 32px)', background: '#151719', color: '#F3F4F5',
  border: '1px solid rgba(243, 244, 245, 0.18)', padding: '1rem 1.1rem', borderRadius: '10px',
  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.35)', fontSize: '0.95rem', lineHeight: 1.5,
  fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
};
const KNAPP = { flex: 1, cursor: 'pointer', font: 'inherit', fontWeight: 600, padding: '0.65rem 0.9rem', borderRadius: '8px' };

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
    };
    addEventListener('click', klick);
    return () => removeEventListener('click', klick);
  }, []);

  const svara = (ok) => {
    const hadeJa = las() === 'ja' || (typeof window !== 'undefined' && window.__k0413GaLaddad);
    spara(ok ? 'ja' : 'nej');
    setVisa(false);
    if (ok) laddaGA();
    else if (hadeJa) location.reload();
  };

  if (!visa) return null;
  return (
    <div style={RUTA} role="dialog" aria-label="Samtycke till statistik">
      <p style={{ margin: '0 0 0.8rem' }}>Får vi använda Google Analytics för att se hur sajten används? Det sätter kakor, och sker bara om du godkänner det.</p>
      <div style={{ display: 'flex', gap: '0.6rem' }}>
        <button type="button" style={{ ...KNAPP, border: 0, background: '#F86E09', color: '#141414' }} onClick={() => svara(true)}>Okej</button>
        <button type="button" style={{ ...KNAPP, border: '1px solid rgba(243, 244, 245, 0.3)', background: 'transparent', color: '#F3F4F5' }} onClick={() => svara(false)}>Nej tack</button>
      </div>
    </div>
  );
}
