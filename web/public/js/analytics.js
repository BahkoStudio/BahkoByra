/* Bahko Byrå — GA4 med samtycke (Consent Mode).
   VILANDE tills GA_ID fylls i (KRÄVER DIG: skapa GA4-property på analytics.google.com,
   klistra in mät-ID:t nedan, t.ex. 'G-XXXXXXXXXX'). Utan ID laddas ingenting och
   ingen banner visas. Samtycke sparas i localStorage ('bb_consent': 'ja'/'nej'). */
(function () {
  var GA_ID = '';
  if (!GA_ID) return;

  var KEY = 'bb_consent';

  function loadGA() {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    gtag('config', GA_ID, { anonymize_ip: true });
    bindEvents();
  }

  function bindEvents() {
    document.querySelectorAll('form').forEach(function (f) {
      f.addEventListener('submit', function () {
        gtag('event', 'form_skickad', { form_id: f.id || 'okand' });
      });
    });
    document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
      a.addEventListener('click', function () {
        gtag('event', 'tel_klick', { nummer: a.getAttribute('href') });
      });
    });
    document.querySelectorAll('a[href*="gratis-granskning"]').forEach(function (a) {
      a.addEventListener('click', function () {
        gtag('event', 'cta_klick', { maltext: (a.textContent || '').trim().slice(0, 40) });
      });
    });
  }

  function banner() {
    var b = document.createElement('div');
    b.id = 'bb-consent';
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-label', 'Samtycke till statistik');
    b.style.cssText = 'position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:9999;max-width:420px;width:calc(100% - 32px);background:#181C38;color:#fff;padding:16px 18px;border-radius:12px;box-shadow:0 12px 40px rgba(0,0,0,.35);font:14px/1.5 Outfit,sans-serif';
    b.innerHTML = '<p style="margin:0 0 10px">Vi vill använda anonym besöksstatistik (Google Analytics) för att förbättra sajten. Okej för dig?</p>' +
      '<div style="display:flex;gap:10px">' +
      '<button id="bb-c-ja" style="flex:1;padding:9px 14px;border:0;border-radius:8px;background:#C9A96E;color:#181C38;font-weight:600;cursor:pointer">Okej</button>' +
      '<button id="bb-c-nej" style="flex:1;padding:9px 14px;border:1px solid rgba(255,255,255,.3);border-radius:8px;background:transparent;color:#fff;cursor:pointer">Nej tack</button></div>';
    document.body.appendChild(b);
    document.getElementById('bb-c-ja').addEventListener('click', function () {
      localStorage.setItem(KEY, 'ja'); b.remove(); loadGA();
    });
    document.getElementById('bb-c-nej').addEventListener('click', function () {
      localStorage.setItem(KEY, 'nej'); b.remove();
    });
  }

  function init() {
    var v = localStorage.getItem(KEY);
    if (v === 'ja') loadGA();
    else if (v !== 'nej') banner();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
