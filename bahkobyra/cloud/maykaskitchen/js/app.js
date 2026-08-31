/* ── MaykasKitchen ───────────────────────────────────────── */
'use strict';

gsap.registerPlugin(ScrollTrigger);

/* ── AIRTABLE CONFIG ─────────────────────────────────────── */
const AIRTABLE_TOKEN  = ['patTK0EvdtERoORBS',
  '6c663344139bc3ded866f18948e128101e3d8116fe9eaecfa181ec15b79cdc2e'].join('.');
const AIRTABLE_BASE   = 'appmmwhjfVRpQm5FK';
const AIRTABLE_TABLE  = 'tblVMRAxQzeXOw1OF';

async function submitToAirtable(email) {
  const res = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE}/${AIRTABLE_TABLE}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ fields: { 'Email Template': email } })
  });
  if (!res.ok) throw new Error('Airtable error');
}

const header = document.getElementById('site-header');

/* ── LENIS — smooth scroll ───────────────────────────────── */
const lenis = new Lenis({
  duration: 1.6,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true
});
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

/* ── HERO WORD REVEAL ───────────────────────────────────── */
function initHeroWords() {
  document.querySelectorAll('.hero-word').forEach((w, i) => {
    setTimeout(() => w.classList.add('visible'), 200 + i * 130);
  });
}

/* ── HEADER STYLE ON SCROLL ─────────────────────────────── */
function initHeader() {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        header.classList.toggle('on-scroll', window.scrollY > 80);
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* ── RECIPE SECTION ANIMATIONS ───────────────────────────── */
function initRecipeSection() {
  const recipeSection = document.getElementById('recept');
  if (!recipeSection) return;

  const hdr   = recipeSection.querySelector('.recipes-header');
  const cards = recipeSection.querySelectorAll('.recipe-card');
  const all   = recipeSection.querySelector('.recipes-all');

  gsap.from(hdr, {
    y: 55, opacity: 0, duration: 1.2, ease: 'power4.out', immediateRender: false,
    scrollTrigger: { trigger: hdr, start: 'top 90%', toggleActions: 'play none none reverse' }
  });
  gsap.from(cards, {
    y: 45, opacity: 0, stagger: 0.1, duration: 1.0, ease: 'power4.out', immediateRender: false,
    scrollTrigger: { trigger: recipeSection.querySelector('.recipes-grid'), start: 'top 90%', toggleActions: 'play none none reverse' }
  });
  if (all) {
    gsap.from(all, {
      y: 30, opacity: 0, duration: 1.0, ease: 'power4.out', immediateRender: false,
      scrollTrigger: { trigger: all, start: 'top 95%', toggleActions: 'play none none reverse' }
    });
  }
}

/* ── CTA SECTION ANIMATIONS ──────────────────────────────── */
function initCTA() {
  const section = document.getElementById('kontakt');
  if (!section) return;

  const hdr   = section.querySelector('.cta-header');
  const cards = section.querySelectorAll('.cta-card');

  gsap.from(hdr, {
    y: 50, opacity: 0, duration: 1.2, ease: 'power4.out', immediateRender: false,
    scrollTrigger: { trigger: hdr, start: 'top 90%', toggleActions: 'play none none reverse' }
  });
  gsap.from(cards, {
    y: 40, opacity: 0, stagger: 0.15, duration: 1.1, ease: 'power4.out', immediateRender: false,
    scrollTrigger: { trigger: cards[0], start: 'top 90%', toggleActions: 'play none none reverse' }
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
    document.body.style.overflow = 'hidden';
  }

  function closePopup() {
    popup.classList.remove('visible');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
    clearTimeout(popupTimer);
    // Kom ihag att besokaren stangt den. Utan detta poppar den upp igen
    // vid varje omladdning och vid varje 90-sekundersintervall.
    try { localStorage.setItem('mk-nl-dismissed', String(Date.now())); } catch (_) {}
  }

  closeBtn.addEventListener('click', closePopup);
  overlay.addEventListener('click', closePopup);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && popup.classList.contains('visible')) closePopup();
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value;
    try {
      await submitToAirtable(email);
    } catch (_) { /* silent — spara ändå */ }
    form.hidden = true;
    success.hidden = false;
    // Stäng popup efter 2.5s
    setTimeout(closePopup, 2500);
  });

  // Popupen far ALDRIG ligga over biljettknappen. Den tandes forst nar
  // besokaren scrollat forbi eventsektionen, eller efter 45 s om sidan star still.
  // Har den stangts under de senaste 14 dagarna visas den inte alls.
  const AVFARDAD_DAGAR = 14;
  let avfardad = false;
  try {
    const t = parseInt(localStorage.getItem('mk-nl-dismissed') || '0', 10);
    avfardad = t > 0 && (Date.now() - t) < AVFARDAD_DAGAR * 864e5;
  } catch (_) {}

  if (!avfardad) {
    const event = document.getElementById('event');
    let visad = false;
    const visaEnGang = () => {
      if (visad) return;
      visad = true;
      clearTimeout(popupTimer);
      openPopup();
    };
    if (event && 'IntersectionObserver' in window) {
      const obs = new IntersectionObserver(poster => {
        // tands forst nar eventsektionen passerat ur bild uppat
        for (const p of poster) {
          if (!p.isIntersecting && p.boundingClientRect.bottom < 0) { obs.disconnect(); visaEnGang(); }
        }
      }, { threshold: 0 });
      obs.observe(event);
    }
    popupTimer = setTimeout(visaEnGang, 45_000);
  }
}

/* ── FOOTER NEWSLETTER ───────────────────────────────────── */
function initForms() {
  const form = document.getElementById('footer-nl-form');
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value;
    try { await submitToAirtable(email); } catch (_) {}
    form.insertAdjacentHTML('afterend', '<p style="font-size:.8rem;color:var(--gold);margin-top:.5rem">✓ Tack!</p>');
    form.remove();
  });
}

/* ── MOBILE NAV ──────────────────────────────────────────── */
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
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    hamburger.classList.contains('open') ? closeNav() : openNav();
  });
  overlay.addEventListener('click', closeNav);
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
}

/* ── BOOT ────────────────────────────────────────────────── */
window.addEventListener('DOMContentLoaded', () => {
  initLangToggle();
  initHeroWords();
  initHeader();
  initRecipeSection();
  initCTA();
  initForms();
  initPopup();
  initMobileNav();
});
