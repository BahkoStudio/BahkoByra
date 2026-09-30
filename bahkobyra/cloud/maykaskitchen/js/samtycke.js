/* ── Samtycke + Google Analytics (G-37QD3TJL56) + AdSense på receptsidan ─────
   Lagen om elektronisk kommunikation kräver samtycke innan statistikkakor sätts.
   Därför laddas gtag.js och AdSense först när besökaren tryckt "Godkänn". Valet sparas i
   webbläsaren och kan ändras via "Kakinställningar" i sidfoten. */
(function () {
  'use strict';
  var MATT_ID = 'G-37QD3TJL56';
  var NYCKEL = 'mk-analys';          // 'ja' | 'nej'
  var laddad = false, annonserLaddade = false;

  function las() { try { return localStorage.getItem(NYCKEL); } catch (_) { return null; } }
  function spara(v) { try { localStorage.setItem(NYCKEL, v); } catch (_) {} }

  function laddaAnalytics() {
    if (laddad) return;
    laddad = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    window.gtag('js', new Date());
    window.gtag('config', MATT_ID);
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + MATT_ID;
    document.head.appendChild(s);
  }

  function laddaAnnonser() {
    // Bara på sidor som har annonser (receptsidan). Laddas efter load så första skärmen inte bromsas.
    var meta = document.querySelector('meta[name="mk-annonser"]');
    if (!meta || annonserLaddade) return;
    annonserLaddade = true;
    var ladda = function () {
      setTimeout(function () {
        var a = document.createElement('script'); a.async = true; a.crossOrigin = 'anonymous';
        a.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + meta.getAttribute('content');
        document.head.appendChild(a);
      }, 2500);
    };
    if (document.readyState === 'complete') ladda(); else window.addEventListener('load', ladda);
  }

  function rensaGaKakor() {
    // Vid "Nej tack" efter ett tidigare ja: ta bort Analytics-kakorna på den här domänen.
    document.cookie.split(';').forEach(function (c) {
      var namn = c.split('=')[0].trim();
      if (/^(_ga|__gads|__gpi|__eoi)/.test(namn)) {
        var d = location.hostname.replace(/^www\./, '');
        document.cookie = namn + '=; Max-Age=0; path=/';
        document.cookie = namn + '=; Max-Age=0; path=/; domain=.' + d;
      }
    });
  }

  function ruta() { return document.getElementById('samtycke'); }
  function visa() { var r = ruta(); if (r) { r.hidden = false; document.documentElement.classList.add('har-samtycke-ruta'); } }
  function dolj() { var r = ruta(); if (r) { r.hidden = true; document.documentElement.classList.remove('har-samtycke-ruta'); } }

  function stangAv() {
    // Googles egen avstängning: taggen slutar skicka och skriver inga fler kakor.
    window['ga-disable-' + MATT_ID] = true;
    if (typeof window.gtag === 'function') window.gtag('consent', 'update', { analytics_storage: 'denied' });
  }

  function val(v) {
    spara(v);
    dolj();
    if (v === 'ja') { window['ga-disable-' + MATT_ID] = false; laddaAnalytics(); laddaAnnonser(); }
    else {
      stangAv();
      rensaGaKakor();
      if (laddad || annonserLaddade) setTimeout(function () { rensaGaKakor(); location.reload(); }, 150);
    }
  }

  window.MK_SAMTYCKE = { oppna: visa, val: val };

  var start = las();
  // Annonsraden (meta mk-annonser) står längre ner i <head> än det här skriptet: vänta tills sidan är inläst.
  if (start === 'ja') { laddaAnalytics(); document.addEventListener('DOMContentLoaded', laddaAnnonser); }
  else if (start === 'nej') { stangAv(); rensaGaKakor(); }

  document.addEventListener('DOMContentLoaded', function () {
    var r = ruta();
    if (!r) return;
    var ja = r.querySelector('[data-samtycke="ja"]'), nej = r.querySelector('[data-samtycke="nej"]');
    if (ja) ja.addEventListener('click', function () { val('ja'); });
    if (nej) nej.addEventListener('click', function () { val('nej'); });
    document.querySelectorAll('[data-kakinstallningar]').forEach(function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); visa(); });
    });
    var nu = las();
    if (nu !== 'ja' && nu !== 'nej') visa();
  });
})();
