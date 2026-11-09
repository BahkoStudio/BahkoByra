'use client';
// GA4 med samtycke för brommatradgardsservice.se. Samma beteende som den gamla statiska sajten:
// ingen mätkod, inga kakor och ingen begäran till Google innan besökaren klickat Acceptera.
// Valet sparas i localStorage under samma nyckel som förut (bts-consent), så den som redan svarat
// på gamla sajten får inte frågan igen. Händelsenamnen är desamma som på gamla sajten.
import { useEffect, useState } from 'react';

const GA4 = 'G-1EKF0NFE5M';
const NYCKEL = 'bts-consent';

const las = () => { try { return localStorage.getItem(NYCKEL); } catch { return null; } };
const spara = (v) => { try { localStorage.setItem(NYCKEL, v); } catch {} };

function laddaGA() {
  if (window.__gaLoaded) return;
  window.__gaLoaded = true;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA4);
}

// Loggar bara när GA är laddat, alltså efter samtycke. Annars skickas ingenting.
function track(namn, params = {}) {
  if (window.gtag && window.__gaLoaded) window.gtag('event', namn, params);
}

const plats = (el) => {
  if (el.closest('header')) return 'header';
  if (el.closest('footer')) return 'footer';
  const sek = el.closest('[id]');
  return sek ? sek.id : 'okand';
};

export default function Matning() {
  const [visa, setVisa] = useState(false);
  const [in_, setIn] = useState(false);

  useEffect(() => {
    const c = las();
    if (c === 'yes') laddaGA();
    else if (c !== 'no') { setVisa(true); requestAnimationFrame(() => requestAnimationFrame(() => setIn(true))); }

    // Telefon, mejl, sms och Google-profilen.
    const klick = (e) => {
      const a = e.target.closest && e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      if (href.startsWith('tel:')) track('ring_klick', { plats: plats(a) });
      else if (href.startsWith('mailto:')) track('reservvag_mejl', { plats: plats(a) });
      else if (href.startsWith('sms:')) track('reservvag_sms', { plats: plats(a) });
      else if (/writereview/.test(href)) track('omdome_lamna_klick', {});
      else if (/maps\.google\.|google\.[a-z.]+\/maps|g\.page/.test(href)) track('google_profil_klick', {});
    };
    // Första gången besökaren börjar fylla i offertformuläret.
    let oppnad = false;
    const fokus = (e) => {
      if (oppnad || !e.target.closest || !e.target.closest('form')) return;
      oppnad = true;
      track('offert_oppnad', {});
    };
    addEventListener('click', klick, { passive: true });
    addEventListener('focusin', fokus);

    // Inskicket: formuläret postar till Web3Forms med fetch. Utfallet avgör händelsen, precis som förut:
    // offert_skickad när förfrågan nådde fram, offert_reservlage när den inte gjorde det.
    const orig = window.fetch;
    if (!orig.__bromma) {
      const ny = async function (url, opt) {
        const arWeb3 = typeof url === 'string' && url.startsWith('https://api.web3forms.com/');
        const data = arWeb3 && opt?.body instanceof FormData ? opt.body : null;
        const params = data ? { tjanst: String(data.get('typ') || ''), kundtyp: String(data.get('kundtyp') || '') } : {};
        try {
          const res = await orig.apply(this, arguments);
          if (arWeb3) {
            const svar = await res.clone().json().catch(() => ({}));
            track(res.ok && svar.success !== false ? 'offert_skickad' : 'offert_reservlage', params);
          }
          return res;
        } catch (err) {
          if (arWeb3) track('offert_reservlage', params);
          throw err;
        }
      };
      ny.__bromma = true;
      window.fetch = ny;
    }
    return () => { removeEventListener('click', klick); removeEventListener('focusin', fokus); };
  }, []);

  const svara = (ok) => {
    spara(ok ? 'yes' : 'no');
    setIn(false);
    setTimeout(() => setVisa(false), 450);
    if (ok) laddaGA();
  };

  if (!visa) return null;
  return (
    <div id="cookie-bar" role="dialog" aria-live="polite" aria-label="Samtycke till statistik" style={{
      position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 2147483000, display: 'flex', flexWrap: 'wrap',
      alignItems: 'center', justifyContent: 'space-between', gap: '0.9rem 1.2rem',
      padding: '1rem clamp(1.1rem, 4vw, 2.4rem)', paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
      background: 'rgba(14, 26, 18, 0.97)', color: '#F2EFE9', borderTop: '1px solid rgba(242, 239, 233, 0.12)',
      fontFamily: 'system-ui, -apple-system, Segoe UI, sans-serif',
      transform: in_ ? 'translateY(0)' : 'translateY(100%)', transition: 'transform .45s ease',
    }}>
      <p style={{ margin: 0, fontSize: '0.85rem', lineHeight: 1.6, maxWidth: '64ch', flex: '1 1 18rem', color: 'rgba(242, 239, 233, 0.85)' }}>
        Vi vill mäta hur sajten används för att kunna förbättra den. Det kräver kakor och sker bara om du godkänner det.
      </p>
      <div style={{ display: 'flex', gap: '0.6rem', flex: '1 1 auto', justifyContent: 'flex-end', maxWidth: '22rem' }}>
        <button type="button" onClick={() => svara(false)} style={knapp(false)}>Neka</button>
        <button type="button" onClick={() => svara(true)} style={knapp(true)}>Acceptera</button>
      </div>
    </div>
  );
}

const knapp = (ja) => ({
  flex: 1, cursor: 'pointer', font: 'inherit', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em',
  textTransform: 'uppercase', padding: '0.8rem 1.4rem', borderRadius: 100, whiteSpace: 'nowrap',
  border: ja ? '1px solid #2E6E2C' : '1px solid rgba(242, 239, 233, 0.35)',
  background: ja ? '#2E6E2C' : 'transparent', color: ja ? '#fff' : '#F2EFE9',
});
