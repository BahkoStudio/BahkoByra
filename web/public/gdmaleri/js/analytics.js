/* GD Måleri Sthlm AB: Google Analytics 4 bakom samtycke (Consent Mode).
   Samma upplägg som bahkobyra.se (web/public/js/analytics.js): ingenting laddas
   och ingen ruta visas förrän besökaren valt. Valet sparas i localStorage
   ('gd_consent': 'ja'/'nej'). Länken "Cookieinställningar" (href="#cookieval")
   i sidfoten visar rutan igen, så att samtycket går att ta tillbaka.

   Mät-ID:t läggs ALDRIG i den här filen: extern/gdmaleri/app/layout.js skriver
   window.GD_GA_ID från miljövariabeln GDMALERI_GA_ID i Vercel. Saknas den gör
   filen ingenting (ingen ruta, inga cookies).

   Händelser (det här är underlaget till söndagsrapporten, tools/gd-rapport/):
   - generate_lead  när Web3Forms bekräftat ett inskick (händelsen bb:skickat
                    skickas av DemoFormular). Nyckelhändelse i GA4.
   - form_forsok    när någon trycker på skicka, oavsett om det gick fram
   - tel_klick      klick på telefonnumret (tel:)
   - mejl_klick     klick på e-postadressen (mailto:)
   - bokning_klick  klick till Cal.com (boka hembesök / ring mig)
   - offert_klick   klick på en knapp som leder till formuläret (#kontakt) */
(function () {
  var GA_ID = window.GD_GA_ID || '';
  if (!GA_ID) return;

  var KEY = 'gd_consent';
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

  /* Delegering på document: sidorna är statisk HTML utan klient-JS, men
     delegeringen är billig och tål att DOM:en byts. */
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
      var text = (a.textContent || '').trim().slice(0, 40);
      if (href.indexOf('tel:') === 0) {
        gtag('event', 'tel_klick', { nummer: href, sida: location.pathname, plats: plats });
      } else if (href.indexOf('mailto:') === 0) {
        gtag('event', 'mejl_klick', { sida: location.pathname, plats: plats });
      } else if (href.indexOf('cal.com') !== -1 || href === '#boka') {
        gtag('event', 'bokning_klick', { maltext: text, mal: href, sida: location.pathname, plats: plats });
      } else if (href === '#kontakt' || href.indexOf('/#kontakt') !== -1) {
        gtag('event', 'offert_klick', { maltext: text, sida: location.pathname, plats: plats });
      }
    });
  }

  function banner() {
    if (document.getElementById('gd-consent')) return;
    var b = document.createElement('div');
    b.id = 'gd-consent';
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-label', 'Samtycke till statistik');
    /* GD:s färger: mörk #0D1B2A, accent #D42E44 (tema i _gd.js). */
    b.style.cssText = 'position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:9999;max-width:420px;width:calc(100% - 32px);background:#0D1B2A;color:#fff;border:1px solid rgba(255,255,255,.08);padding:16px 18px;border-radius:12px;box-shadow:0 12px 40px rgba(0,0,0,.35);font:14px/1.5 Outfit,system-ui,sans-serif';
    b.innerHTML = '<p style="margin:0 0 10px">Får vi använda Google Analytics för att se hur sidan används? Det sätter cookies. <a href="/integritet/" style="color:#FF8E9A;text-decoration:underline">Läs mer</a></p>' +
      '<div style="display:flex;gap:10px">' +
      '<button id="gd-c-ja" style="flex:1;padding:9px 14px;border:0;border-radius:8px;background:#D42E44;color:#fff;font-weight:600;cursor:pointer">Okej</button>' +
      '<button id="gd-c-nej" style="flex:1;padding:9px 14px;border:1px solid rgba(255,255,255,.3);border-radius:8px;background:transparent;color:#fff;cursor:pointer">Nej tack</button></div>';
    document.body.appendChild(b);
    document.getElementById('gd-c-ja').addEventListener('click', function () {
      spara('ja'); b.remove(); loadGA();
    });
    document.getElementById('gd-c-nej').addEventListener('click', function () {
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
