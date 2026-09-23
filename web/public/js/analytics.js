/* Bahko Byrå: GA4 med samtycke (Consent Mode).
   Aktiverad 2026-08-08 med skarpt mät-ID. Samtycke sparas i localStorage
   ('bb_consent': 'ja'/'nej'). Ingenting laddas och ingen banner visas
   förrän besökaren valt. Länken "Cookieinställningar" (href="#cookieval")
   visar bannern igen, så att samtycket går att ta tillbaka.

   Händelser:
   - generate_lead  när Web3Forms bekräftat ett inskick (händelsen bb:skickat,
                    skickas av DemoFormular och de två statiska sidorna). Det är
                    den som ska vara nyckelhändelse i GA4.
   - form_forsok    när någon trycker på skicka, oavsett om det gick fram
   - cta_klick      klick till /kontakt/, analysen eller guiden, med sida
   - tel_klick, mejl_klick */
(function () {
  var GA_ID = 'G-N15N9G69B7';
  if (!GA_ID) return;

  var KEY = 'bb_consent';
  var laddad = false;

  function las() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function spara(v) {
    try {
      if (v) localStorage.setItem(KEY, v);
      else localStorage.removeItem(KEY);
    } catch (e) {}
  }

  function loadGA() {
    if (laddad) return;
    laddad = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    gtag('config', GA_ID);
    bindEvents();
  }

  /* Delegering på document i stället för per element: sajten är en Next-app
     där sidbyten skapar ny DOM, och elementbundna lyssnare skulle tystna
     efter första navigeringen. */
  function bindEvents() {
    window.addEventListener('bb:skickat', function (e) {
      gtag('event', 'generate_lead', { formular: (e && e.detail) || 'okant', sida: location.pathname });
    });
    document.addEventListener('submit', function (e) {
      var f = e.target;
      if (f && f.tagName === 'FORM') {
        gtag('event', 'form_forsok', { form_id: f.id || 'okand', sida: location.pathname });
      }
    });
    document.addEventListener('click', function (e) {
      var a = e.target && e.target.closest ? e.target.closest('a') : null;
      if (!a) return;
      var href = a.getAttribute('href') || '';
      var sektion = a.closest('section[id], header, footer');
      var plats = sektion ? (sektion.id || sektion.tagName.toLowerCase()) : '';
      if (href.indexOf('tel:') === 0) {
        gtag('event', 'tel_klick', { nummer: href, sida: location.pathname, plats: plats });
      } else if (href.indexOf('mailto:') === 0) {
        gtag('event', 'mejl_klick', { sida: location.pathname, plats: plats });
      } else if (href.indexOf('/kontakt') !== -1 || href.indexOf('gratis-granskning') !== -1 || href.indexOf('gratis-guide') !== -1) {
        gtag('event', 'cta_klick', {
          maltext: (a.textContent || '').trim().slice(0, 40),
          mal: href,
          sida: location.pathname,
          plats: plats,
        });
      }
    });
  }

  function banner() {
    if (document.getElementById('bb-consent')) return;
    var b = document.createElement('div');
    b.id = 'bb-consent';
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-label', 'Samtycke till statistik');
    /* Färger enligt varumärke v2: yta #13233F, knapp = smaragd med marinblå text
       (knappregeln: aldrig vit text på smaragd). */
    b.style.cssText = 'position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:9999;max-width:420px;width:calc(100% - 32px);background:#13233F;color:#fff;border:1px solid rgba(255,255,255,.08);padding:16px 18px;border-radius:12px;box-shadow:0 12px 40px rgba(0,0,0,.35);font:14px/1.5 Outfit,sans-serif';
    b.innerHTML = '<p style="margin:0 0 10px">Får vi använda Google Analytics för att se hur sajten används? Det sätter cookies. <a href="/integritet/" style="color:#34D399;text-decoration:underline">Läs mer</a></p>' +
      '<div style="display:flex;gap:10px">' +
      '<button id="bb-c-ja" style="flex:1;padding:9px 14px;border:0;border-radius:8px;background:#10B981;color:#0A1628;font-weight:600;cursor:pointer">Okej</button>' +
      '<button id="bb-c-nej" style="flex:1;padding:9px 14px;border:1px solid rgba(255,255,255,.3);border-radius:8px;background:transparent;color:#fff;cursor:pointer">Nej tack</button></div>';
    document.body.appendChild(b);
    document.getElementById('bb-c-ja').addEventListener('click', function () {
      spara('ja'); b.remove(); loadGA();
    });
    document.getElementById('bb-c-nej').addEventListener('click', function () {
      var hadeJa = las() === 'ja';
      spara('nej'); b.remove();
      // Ett återkallat samtycke: ladda om så att GA inte längre körs på sidan.
      if (hadeJa || laddad) location.reload();
    });
  }

  function init() {
    // "Cookieinställningar" i sidfoten öppnar valet igen
    document.addEventListener('click', function (e) {
      var a = e.target && e.target.closest ? e.target.closest('a[href="#cookieval"]') : null;
      if (!a) return;
      e.preventDefault();
      banner();
    });
    var v = las();
    if (v === 'ja') loadGA();
    else if (v !== 'nej') banner();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
