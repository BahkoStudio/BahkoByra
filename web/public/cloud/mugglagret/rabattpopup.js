/* ===========================================================================
   MUGGLAGRET — rabattpopup med äkta nedräkning
   Demo av Bahko Byrå. Fristående modul: egen CSS injiceras härifrån, så filen
   kan läggas till och tas bort utan att röra style.css eller app.js.

   VIKTIGT OM ERBJUDANDET: procentsatsen och koden nedan är ett FÖRSLAG, inte
   något Mugglagret har lovat. Mekaniken är byggd, siffran är deras beslut.

   Varför deadlinen sparas i localStorage: en "15 minuter kvar" som nollställs
   varje gång man byter sida är genomskinligt påhittad. Här startar klockan en
   gång och fortsätter ticka över sidbyten — det är både ärligare och det som
   faktiskt får folk att handla. Går tiden ut visas erbjudandet inte igen.
   =========================================================================== */
(function () {
  "use strict";

  var CONFIG = {
    minuter: 15,          // hur länge erbjudandet gäller
    procent: 10,          // rabattsats
    kod: "MUGG10",        // koden kunden anger i kassan
    visaEfterSek: 20,     // visas efter så här lång tid på sidan
    visaVidScroll: 0.45,  // ...eller när man skrollat så här långt
    nyckel: "mugglagret_demo_rabatt_v1"
  };

  /* Egen nyckel — krockar inte med mugglagret_demo_cart_v1 */
  function las() {
    try { return JSON.parse(localStorage.getItem(CONFIG.nyckel) || "{}"); }
    catch (e) { return {}; }
  }
  function skriv(o) {
    try { localStorage.setItem(CONFIG.nyckel, JSON.stringify(o)); } catch (e) {}
  }

  var stat = las();

  /* Har erbjudandet redan gått ut eller stängts? Då är vi klara. */
  if (stat.stangd) return;
  if (stat.slutTid && Date.now() > stat.slutTid) return;

  var STIL = ''
    + '.rp-lager{position:fixed;inset:0;z-index:120;display:grid;place-items:center;padding:1.2rem;'
    + 'opacity:0;visibility:hidden;transition:opacity .32s cubic-bezier(.22,1,.36,1),visibility .32s}'
    + '.rp-lager.rp-on{opacity:1;visibility:visible}'
    + '.rp-skugga{position:absolute;inset:0;background:rgba(43,33,29,.62);backdrop-filter:blur(3px);border:0;padding:0;cursor:pointer}'
    + '.rp-kort{position:relative;z-index:1;width:min(100%,428px);background:#FCFAF5;border-radius:4px;'
    + 'box-shadow:0 30px 70px -20px rgba(43,33,29,.5);padding:2.1rem 1.7rem 1.6rem;text-align:center;'
    + 'transform:translateY(14px) scale(.97);transition:transform .34s cubic-bezier(.34,1.56,.64,1)}'
    + '.rp-lager.rp-on .rp-kort{transform:none}'
    + '.rp-x{position:absolute;top:.35rem;right:.35rem;width:44px;height:44px;display:grid;place-items:center;'
    + 'background:none;border:0;cursor:pointer;color:#8C7B71;font-size:1.05rem;line-height:1}'
    + '.rp-x:hover{color:#2B211D}'
    + '.rp-flagga{display:inline-flex;align-items:center;gap:.45rem;font-size:.63rem;font-weight:700;'
    + 'letter-spacing:.2em;text-transform:uppercase;color:#8F4A2F}'
    + '.rp-punkt{width:6px;height:6px;border-radius:50%;background:#A85C3E;flex-shrink:0;'
    + 'animation:rpPuls 2.2s cubic-bezier(.22,1,.36,1) infinite}'
    + '@keyframes rpPuls{0%{box-shadow:0 0 0 0 rgba(168,92,62,.5)}70%{box-shadow:0 0 0 7px rgba(168,92,62,0)}'
    + '100%{box-shadow:0 0 0 0 rgba(168,92,62,0)}}'
    + '.rp-kort h2{font-family:"Fraunces",Georgia,serif;font-weight:500;font-size:1.62rem;line-height:1.12;'
    + 'letter-spacing:-.015em;color:#2B211D;margin:.85rem 0 .6rem}'
    + '.rp-kort p{font-size:.92rem;line-height:1.55;color:#6B564C;margin:0 auto .3rem;max-width:34ch}'
    + '.rp-klocka{display:flex;align-items:baseline;justify-content:center;gap:.5rem;margin:1.15rem 0 .35rem}'
    + '.rp-tid{font-family:"Fraunces",Georgia,serif;font-size:2.5rem;font-weight:600;line-height:1;'
    + 'color:#2B211D;font-variant-numeric:tabular-nums}'
    + '.rp-tid-txt{font-size:.66rem;letter-spacing:.18em;text-transform:uppercase;color:#8C7B71}'
    + '.rp-kod{display:flex;align-items:center;justify-content:center;gap:.6rem;margin:1.05rem 0 1.15rem;'
    + 'padding:.7rem;border:1px dashed #D8CAB4;border-radius:3px;background:#F4EDE0}'
    + '.rp-kod b{font-size:1rem;letter-spacing:.22em;color:#2B211D}'
    + '.rp-kod span{font-size:.66rem;letter-spacing:.14em;text-transform:uppercase;color:#8C7B71}'
    + '.rp-cta{display:flex;align-items:center;justify-content:center;min-height:52px;width:100%;'
    + 'background:#2B211D;color:#FCFAF5;border-radius:2px;font-size:.76rem;font-weight:600;'
    + 'letter-spacing:.14em;text-transform:uppercase;text-decoration:none;transition:background .25s}'
    + '.rp-cta:hover{background:#6B564C}'
    + '.rp-nej{display:block;width:100%;min-height:44px;margin-top:.15rem;background:none;border:0;cursor:pointer;'
    + 'font-size:.78rem;color:#8C7B71;text-decoration:underline;text-underline-offset:3px}'
    + '.rp-nej:hover{color:#2B211D}'
    + '.rp-fot{margin-top:.7rem;font-size:.68rem;color:#8C7B71}'
    + '@media(max-width:420px){.rp-kort{padding:1.8rem 1.2rem 1.3rem}.rp-kort h2{font-size:1.42rem}.rp-tid{font-size:2.1rem}}'
    + '@media(prefers-reduced-motion:reduce){.rp-lager,.rp-kort{transition:none}.rp-punkt{animation:none}}';

  function injiceraStil() {
    var s = document.createElement("style");
    s.textContent = STIL;
    document.head.appendChild(s);
  }

  var lager, tidEl, timer, sisteFokus;

  function bygg() {
    lager = document.createElement("div");
    lager.className = "rp-lager";
    lager.innerHTML = ''
      + '<button class="rp-skugga" type="button" aria-label="Stäng"></button>'
      + '<div class="rp-kort" role="dialog" aria-modal="true" aria-labelledby="rp-rubrik">'
      +   '<button class="rp-x" type="button" aria-label="Stäng">&#10005;</button>'
      +   '<span class="rp-flagga"><i class="rp-punkt" aria-hidden="true"></i>Gäller en kort stund</span>'
      +   '<h2 id="rp-rubrik">' + CONFIG.procent + ' % på din första mugg</h2>'
      +   '<p>Ange koden i kassan. Erbjudandet gäller så länge klockan tickar, och den startar först nu.</p>'
      +   '<div class="rp-klocka"><span class="rp-tid" data-rp-tid>' + CONFIG.minuter + ':00</span>'
      +     '<span class="rp-tid-txt">kvar</span></div>'
      +   '<div class="rp-kod"><b>' + CONFIG.kod + '</b><span>Rabattkod</span></div>'
      +   '<a class="rp-cta" href="katalog.html">Välj din mugg</a>'
      +   '<button class="rp-nej" type="button">Nej tack, jag betalar fullt pris</button>'
      +   '<p class="rp-fot">Fast pris 136 kr &middot; 11 oz keramik &middot; leverans 3&ndash;6 dagar</p>'
      + '</div>';
    document.body.appendChild(lager);
    tidEl = lager.querySelector("[data-rp-tid]");

    lager.querySelector(".rp-skugga").addEventListener("click", stang);
    lager.querySelector(".rp-x").addEventListener("click", stang);
    lager.querySelector(".rp-nej").addEventListener("click", stang);
    /* CTA:n stänger också — annars ligger lagret kvar över katalogen */
    lager.querySelector(".rp-cta").addEventListener("click", function () { doljBara(); });
  }

  function tick() {
    var kvar = Math.max(0, stat.slutTid - Date.now());
    var m = Math.floor(kvar / 60000);
    var s = Math.floor((kvar % 60000) / 1000);
    if (tidEl) tidEl.textContent = m + ":" + (s < 10 ? "0" : "") + s;
    if (kvar <= 0) {
      clearInterval(timer);
      doljBara();
    }
  }

  function visa() {
    if (!lager) bygg();
    if (!stat.slutTid) {
      stat.slutTid = Date.now() + CONFIG.minuter * 60000;
      skriv(stat);
    }
    lager.classList.add("rp-on");
    document.body.style.overflow = "hidden";
    sisteFokus = document.activeElement;
    lager.querySelector(".rp-x").focus();
    tick();
    timer = setInterval(tick, 1000);
    document.addEventListener("keydown", vidTangent);
  }

  function doljBara() {
    if (!lager) return;
    lager.classList.remove("rp-on");
    document.body.style.overflow = "";
    clearInterval(timer);
    document.removeEventListener("keydown", vidTangent);
    if (sisteFokus && sisteFokus.focus) sisteFokus.focus();
  }

  /* Stängd på riktigt: kommer inte tillbaka och tjatar */
  function stang() {
    stat.stangd = true;
    skriv(stat);
    doljBara();
  }

  function vidTangent(e) {
    if (e.key === "Escape") { stang(); return; }
    /* Fokusfälla: tab ska inte lämna dialogen medan den är öppen */
    if (e.key !== "Tab") return;
    var f = lager.querySelectorAll(".rp-x,.rp-cta,.rp-nej");
    var forst = f[0], sist = f[f.length - 1];
    if (e.shiftKey && document.activeElement === forst) { e.preventDefault(); sist.focus(); }
    else if (!e.shiftKey && document.activeElement === sist) { e.preventDefault(); forst.focus(); }
  }

  /* Tre triggers, den som kommer först vinner: tid på sidan, skrolldjup och
     att pekaren lämnar fönstret uppåt (på väg mot fliken eller adressfältet). */
  function starta() {
    injiceraStil();
    var avfyrad = false;
    function avfyra() {
      if (avfyrad) return;
      avfyrad = true;
      window.removeEventListener("scroll", vidScroll);
      document.removeEventListener("mouseout", vidUt);
      visa();
    }
    var t = setTimeout(avfyra, CONFIG.visaEfterSek * 1000);
    function vidScroll() {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      if (h > 0 && window.scrollY / h >= CONFIG.visaVidScroll) { clearTimeout(t); avfyra(); }
    }
    function vidUt(e) {
      if (!e.relatedTarget && e.clientY <= 0) { clearTimeout(t); avfyra(); }
    }
    window.addEventListener("scroll", vidScroll, { passive: true });
    document.addEventListener("mouseout", vidUt);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", starta);
  } else {
    starta();
  }
})();
