/* ── Samtycke via Googles egen ruta (AdSense → Sekretess och meddelanden) ─────
   Googles certifierade samtyckesruta levereras av AdSense-koden (adsbygoogle.js), så koden
   laddas på alla sidor. Annonser visas bara där skripttaggen har data-annonser="ja"
   (receptsidan); övriga sidor pausar annonsförfrågningarna (pauseAdRequests = 1).
   Google Analytics (G-37QD3TJL56) laddas först när besökaren samtyckt i Googles ruta
   (TCF-syfte 1, lagra/läsa information), eller när GDPR inte gäller besökaren.
   "Kakinställningar" i sidfoten öppnar Googles ruta igen (krav från Google). */
(function () {
  'use strict';
  var MATT_ID = 'G-37QD3TJL56';
  var PUB = 'ca-pub-4880340628636698';
  var tagg = document.currentScript;
  var annonser = !!(tagg && tagg.getAttribute('data-annonser') === 'ja');
  var gaLaddad = false;

  // Consent mode: allt nekat tills Googles ruta säger annat (rutan uppdaterar själv).
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('consent', 'default', {
    ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied', wait_for_update: 500
  });

  // AdSense-koden, som också levererar samtyckesrutan
  window.adsbygoogle = window.adsbygoogle || [];
  if (!annonser) window.adsbygoogle.pauseAdRequests = 1;      // säljsidan och integritetssidan: inga annonser
  var a = document.createElement('script');
  a.async = true; a.crossOrigin = 'anonymous';
  a.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + PUB;
  document.head.appendChild(a);

  function laddaAnalytics() {
    if (gaLaddad) return;
    gaLaddad = true;
    window.gtag('js', new Date());
    window.gtag('config', MATT_ID);
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + MATT_ID;
    document.head.appendChild(s);
  }

  // Lyssna på Googles ruta (TCF). Laddas aldrig Googles ruta, laddas aldrig Analytics heller.
  window.googlefc = window.googlefc || {};
  window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];
  window.googlefc.callbackQueue.push({
    CONSENT_DATA_READY: function () {
      if (typeof window.__tcfapi !== 'function') return;
      window.__tcfapi('addEventListener', 2.2, function (tc, ok) {
        if (!ok || !tc) return;
        if (tc.eventStatus !== 'tcloaded' && tc.eventStatus !== 'useractioncomplete') return;
        var samtycke = tc.gdprApplies === false || !!(tc.purpose && tc.purpose.consents && tc.purpose.consents[1]);
        if (samtycke) laddaAnalytics();
      });
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-kakinstallningar]').forEach(function (l) {
      l.addEventListener('click', function (e) {
        e.preventDefault();
        window.googlefc.callbackQueue.push(window.googlefc.showRevocationMessage);
      });
    });
  });
})();
