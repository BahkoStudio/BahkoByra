/* ── MaykasKitchen ───────────────────────────────────────── */
'use strict';

gsap.registerPlugin(ScrollTrigger);

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

/* ── NEWSLETTER FORM ─────────────────────────────────────── */
function initForms() {
  const form = document.getElementById('footer-nl-form');
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value;
    try {
      await fetch('https://hook.eu2.make.com/sfjfkezizhjh4x7r1rrjmjwyei2sufj2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'newsletter', email, source: 'footer' })
      });
    } catch (_) { /* silent */ }
    form.insertAdjacentHTML('afterend', '<p style="font-size:.8rem;color:var(--gold);margin-top:.5rem">✓ Tack!</p>');
    form.remove();
  });
}

/* ── BOOT ────────────────────────────────────────────────── */
window.addEventListener('DOMContentLoaded', () => {
  initHeroWords();
  initHeader();
  initRecipeSection();
  initCTA();
  initForms();
});
