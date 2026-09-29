/* ── MaykasKitchen ───────────────────────────────────────── */
'use strict';

gsap.registerPlugin(ScrollTrigger);

/* ── NYHETSBREV via Web3Forms ─────────────────────────────
   Nyckeln är publik med flit: den säger bara vilken inkorg inskicket går till och ger
   ingen åtkomst till något (se docs/formular-web3forms.md). Tills Mayka har en egen
   nyckel används Bahkos demonyckel, som landar hos mathias@bahkobyra.se med
   "Nyhetsbrev maykaskitchen.se" i ämnesraden. Byt NL_NYCKEL här OCH i index.html
   (sidfotsformulärets dolda access_key, används när JavaScript inte körs) när Maykas nyckel finns. */
const NL_NYCKEL = '38db5da0-8af0-4b31-bcdc-a840e84e5764';

async function skickaNyhetsbrev(form, kalla) {
  const data = new FormData(form);
  data.set('access_key', NL_NYCKEL);
  data.set('subject', 'Nyhetsbrev maykaskitchen.se');
  data.set('from_name', 'maykaskitchen.se');
  data.set('kalla', kalla);
  data.delete('redirect');   // med redirect svarar Web3Forms 303 och svaret går inte att läsa
  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST', body: data, headers: { Accept: 'application/json' }
  });
  const svar = await res.json().catch(() => ({}));
  return res.ok && svar.success !== false;   // tack visas bara när inskicket faktiskt gick fram
}

const REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── LENIS – mjuk skroll (inte vid reducerad rörelse) ───── */
if (!REDUCE && typeof Lenis === 'function') {
  const lenis = new Lenis({
    anchors: { offset: -70 },
    duration: 1.3,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true
  });
  window.MK_LENIS = lenis;
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(time => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ── HEADER ─────────────────────────────────────────────── */
function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;
  // Genomskinlig över den gröna scenen, gräddvit så fort scenen släppt.
  // Scenen är fastnålad, så gränsen hämtas från scenens egen ScrollTrigger.
  const slut = () => { const st = ScrollTrigger.getById('scen'); return (st ? st.end : window.innerHeight) - 70; };
  ScrollTrigger.create({
    trigger: document.body, start: slut, end: () => slut() + 1e6,
    onEnter: () => header.classList.add('on-scroll'),
    onLeaveBack: () => header.classList.remove('on-scroll')
  });
  // Slutet är början igen: samma genomskinliga rubrikrad över den mörka scenen.
  if (document.getElementById('slut')) ScrollTrigger.create({
    trigger: '#slut', start: 'top 70px', end: 'bottom 70px',
    onToggle: self => header.classList.toggle('over-slut', self.isActive)
  });
}

/* ── SCENEN – 3D-boken snurrar medan textbilderna byter ─── */
function initStage() {
  const stage = document.getElementById('hero');
  if (!stage) return;

  // Fotot av omslaget syns tills 3D-boken bevisligen ritats rätt (bok3d.js byter själv).
  const har3d = window.BOK3D && window.BOK3D.init && window.BOK3D.init();
  const st = har3d ? window.BOK3D.state : { ry: 0, rx: 0, rz: 0, scale: 1, x: 0, y: 0, mix: 0 };

  // Intro: boken landar (eget offset-objekt så att den inte krockar med skrollens värden), texten stiger
  if (har3d) gsap.from(window.BOK3D.intro, { scale: 0.6, y: -0.8, ry: -1.1, duration: 1.6, ease: 'power3.out', delay: 0.1 });
  gsap.from('.slide-1 > *', { y: 40, autoAlpha: 0, duration: 1.1, ease: 'power3.out', stagger: 0.12, delay: 0.25 });
  gsap.from('#stage-cta', { y: 30, autoAlpha: 0, duration: 1.0, ease: 'power3.out', delay: 0.85 });

  if (REDUCE) return;

  // Fyra vyer, som förlagan: omslag → baksida → sidkanterna uppifrån → omslag
  const tl = gsap.timeline({
    scrollTrigger: { id: 'scen', trigger: stage, start: 'top top', end: '+=320%', pin: true, scrub: 0.8, anticipatePin: 1 }
  });
  // Boken flyttar sig åt motsatt sida mot texten (som burken i förlagan); på mobil ignoreras x.
  // Fyra vyer med var sin text: omslag → baksida → ovanifrån med sidkanterna → omslag + köp.
  // Nästa text tonar in i samma stund som den förra tonar ut, så boken aldrig står som en
  // tunn kant utan text bredvid. Boken glider åt motsatt sida mot texten (desktop).
  // På mobil (my) sitter boken lägre i första vyn, under rubriken, och lyfts sedan upp.
  const F = 0.13;
  // Uttoningen har uttryckligt startläge (synlig) så att skroll tillbaka alltid tar fram texten igen,
  // även om man skrollade medan introt pågick.
  const byt = (ut, in_, t) => tl
    .fromTo(ut, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -24, ease: 'none', duration: F, immediateRender: false }, t)
    .fromTo(in_, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, ease: 'none', duration: F }, t + F);
  tl.fromTo(st, { ry: -0.35, rx: 0.08, rz: 0, x: 0, scale: 1, mix: 0 },
               { ry: Math.PI - 0.3, rx: 0.10, rz: 0.03, x: -0.72, scale: 1.02, mix: 1, ease: 'power1.inOut', duration: 1 }, 0)
    .to(st, { ry: Math.PI * 1.35, rx: 1.0, rz: -0.28, x: 0.72, scale: 1.04, ease: 'power1.inOut', duration: 1 }, 1)
    .to(st, { ry: Math.PI * 2 - 0.3, rx: 0.08, rz: 0, x: -0.72, scale: 1.08, ease: 'power1.inOut', duration: 1 }, 2)
    .to({}, { duration: 0.5 }, 3);
  byt('[data-slide="1"]', '.slide-2', 0.2);
  byt('.slide-2', '.slide-3', 1.2);
  byt('.slide-3', '.slide-4', 2.2);
}

/* ── SEKTIONER – mjuk infasning ─────────────────────────── */
function initReveals() {
  if (REDUCE) return;
  const grupper = [
    '.inne-text > *', '.inne-media', '.inne-band img',
    '.kok-head > *', '.kok-bild',
    '.siffror-head > *', '.tal li', '.brands',
    '.om-media', '.om-text > *',
    '.cta-inner > *'
  ];
  grupper.forEach(sel => {
    const els = gsap.utils.toArray(sel);
    if (!els.length) return;
    // Inget göms i förväg: allt är synligt och klickbart även om skrollmätningen skulle missa.
    ScrollTrigger.batch(els, {
      start: 'top 98%', once: true,
      onEnter: batch => gsap.fromTo(batch, { y: 28, autoAlpha: 0.001 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out', stagger: 0.06, overwrite: true })
    });
  });
}

/* ── POPUP ───────────────────────────────────────────────── */
function initPopup() {
  const popup    = document.getElementById('nl-popup');
  const overlay  = document.getElementById('nl-popup-overlay');
  const closeBtn = document.getElementById('nl-popup-close');
  const form     = document.getElementById('nl-popup-form');
  const success  = document.getElementById('nl-popup-success');
  if (!popup) return;

  let popupTimer = null;

  function openPopup() {
    popup.classList.add('visible');
    overlay.classList.add('visible');
  }
  function closePopup() {
    popup.classList.remove('visible');
    overlay.classList.remove('visible');
    clearTimeout(popupTimer);
    try { localStorage.setItem('mk-nl-dismissed', String(Date.now())); } catch (_) {}
  }

  closeBtn.addEventListener('click', closePopup);
  overlay.addEventListener('click', closePopup);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && popup.classList.contains('visible')) closePopup();
  });

  const felPopup = document.getElementById('nl-popup-fel');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const knapp = form.querySelector('button[type="submit"]');
    knapp.disabled = true; felPopup.hidden = true;
    let ok = false;
    try { ok = await skickaNyhetsbrev(form, 'popup'); } catch (_) { ok = false; }
    knapp.disabled = false;
    if (ok) {
      form.hidden = true;
      success.hidden = false;
      setTimeout(closePopup, 2500);
    } else {
      felPopup.hidden = false;
    }
  });

  // Tänds först när läsaren nått sidfoten, då har hela sidan fått säga sitt.
  // Har den stängts de senaste 14 dagarna visas den inte alls.
  const AVFARDAD_DAGAR = 14;
  let avfardad = false;
  try {
    const t = parseInt(localStorage.getItem('mk-nl-dismissed') || '0', 10);
    avfardad = t > 0 && (Date.now() - t) < AVFARDAD_DAGAR * 864e5;
  } catch (_) {}
  const fot = document.querySelector('.site-footer');
  if (!avfardad && fot && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver(e => {
      if (e[0].isIntersecting) { obs.disconnect(); popupTimer = setTimeout(openPopup, 1200); }
    }, { threshold: 0.35 });
    obs.observe(fot);
  }
}

/* ── FOOTER-NYHETSBREV ───────────────────────────────────── */
function initForms() {
  const form = document.getElementById('footer-nl-form');
  if (!form) return;
  const tack = document.getElementById('footer-nl-tack');
  const fel = document.getElementById('footer-nl-fel');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const knapp = form.querySelector('button[type="submit"]');
    knapp.disabled = true; fel.hidden = true;
    let ok = false;
    try { ok = await skickaNyhetsbrev(form, 'sidfot'); } catch (_) { ok = false; }
    knapp.disabled = false;
    if (ok) { form.hidden = true; tack.hidden = false; }
    else fel.hidden = false;
  });
}

/* ── MOBILMENY ───────────────────────────────────────────── */
function initMobileNav() {
  const hamburger = document.getElementById('nav-hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const overlay   = document.getElementById('mobile-nav-overlay');
  if (!hamburger) return;

  function openNav() {
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('open');
    mobileNav.removeAttribute('aria-hidden');
    overlay.classList.add('open');
  }
  function closeNav() {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('open');
  }
  hamburger.addEventListener('click', () => hamburger.classList.contains('open') ? closeNav() : openNav());
  overlay.addEventListener('click', closeNav);
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
}

/* ── KÖPRADEN viker undan när slutets egen köpknapp syns (två knappar med samma pris i bild) ── */
function initKopbar() {
  const bar = document.getElementById('kopbar'), mal = document.querySelector('#slut .pris-rad');
  if (!bar || !mal || !('IntersectionObserver' in window)) return;
  new IntersectionObserver(e => bar.classList.toggle('viker', e[0].isIntersecting), { threshold: 0.6 }).observe(mal);
}

/* ── DJUPLÄNK – scenen nålas fast efter webbläsarens eget hopp, så hoppa igen när allt är mätt ── */
function landaPaHash() {
  const id = decodeURIComponent(location.hash.slice(1));
  const mal = id && document.getElementById(id);
  if (!mal) return null;
  if (window.ScrollTrigger) ScrollTrigger.refresh();
  const y = Math.max(0, mal.getBoundingClientRect().top + window.scrollY - 70);
  if (window.MK_LENIS) window.MK_LENIS.scrollTo(y, { immediate: true, force: true });
  else window.scrollTo(0, y);
  return y;
}
let besokarenRorde = false;
['wheel', 'touchstart', 'keydown', 'pointerdown'].forEach(t => window.addEventListener(t, () => { besokarenRorde = true; }, { passive: true, once: true }));
window.addEventListener('load', () => {
  if (landaPaHash() === null) return;
  // Webbläsarens eget ankarhopp och sena bilder/typsnitt kan flytta sidan efteråt: rätta igen tills besökaren själv rör sidan.
  [300, 900, 1800, 3200].forEach(ms => setTimeout(() => { if (!besokarenRorde) landaPaHash(); }, ms));
});
// Även när bara #-delen byts i samma flik. Klick på menylänkar sköter Lenis själv med mjuk skroll.
let senastHashKlick = 0;
document.addEventListener('click', e => { if (e.target.closest && e.target.closest('a[href^="#"]')) senastHashKlick = Date.now(); }, true);
window.addEventListener('hashchange', () => { if (Date.now() - senastHashKlick > 1000) landaPaHash(); });

/* ── START ───────────────────────────────────────────────── */
window.addEventListener('DOMContentLoaded', () => {
  initLangToggle();
  initStage();
  initHeader();
  initReveals();
  initForms();
  initPopup();
  initMobileNav();
  initKopbar();
});
