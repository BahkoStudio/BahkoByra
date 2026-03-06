/* ── MaykasKitchen — Scroll-Driven Site ───────────────────── */
'use strict';

gsap.registerPlugin(ScrollTrigger);

/* ── CONFIG ─────────────────────────────────────────────── */
const FRAME_COUNT = 122;
const FRAME_SPEED = 2.0;

/* ── ELEMENTS ───────────────────────────────────────────── */
const loader      = document.getElementById('loader');
const loaderBar   = document.getElementById('loader-bar');
const loaderPct   = document.getElementById('loader-percent');
const canvas      = document.getElementById('canvas');
const canvasWrap  = document.getElementById('canvas-wrap');
const sceneBg     = document.getElementById('scene-bg');
const darkOverlay = document.getElementById('dark-overlay');
const heroEl      = document.getElementById('hero');
const scrollCont  = document.getElementById('scroll-container');
const header      = document.getElementById('site-header');
const ctx         = canvas.getContext('2d');

/* ── CANVAS SETUP ───────────────────────────────────────── */
const DPR = window.devicePixelRatio || 1;
function resizeCanvas() {
  canvas.width  = window.innerWidth  * DPR;
  canvas.height = window.innerHeight * DPR;
  ctx.scale(DPR, DPR);
}
resizeCanvas();
window.addEventListener('resize', () => { resizeCanvas(); drawFrame(currentFrame); });

/* ── LENIS — smoother, slower ───────────────────────────── */
const lenis = new Lenis({
  duration: 1.8,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -12 * t)),
  smoothWheel: true
});
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

/* ── FRAMES ─────────────────────────────────────────────── */
const frames    = new Array(FRAME_COUNT).fill(null);
let loadedCount = 0;
let currentFrame = 0;

/* ── CANVAS RENDERER — transparent bg ──────────────────── */
function drawFrame(index) {
  const img = frames[index];
  if (!img) return;
  const cw = canvas.width  / DPR;
  const ch = canvas.height / DPR;
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const scale = (ch / ih) * 0.90;
  const dw = iw * scale;
  const dh = ih * scale;
  const dx = (cw - dw) / 2;
  const dy = (ch - dh) / 2;
  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(img, dx, dy, dw, dh);
}

/* ── LOADER ─────────────────────────────────────────────── */
function loadFrame(i) {
  return new Promise(resolve => {
    const img = new Image();
    img.src = `frames/frame_${String(i + 1).padStart(4, '0')}.webp`;
    img.onload = () => {
      frames[i] = img;
      loadedCount++;
      const pct = Math.round(loadedCount / FRAME_COUNT * 100);
      loaderBar.style.width = pct + '%';
      loaderPct.textContent = pct + '%';
      resolve();
    };
    img.onerror = () => { loadedCount++; resolve(); };
  });
}

async function loadAllFrames() {
  await Promise.all(Array.from({ length: Math.min(10, FRAME_COUNT) }, (_, i) => loadFrame(i)));
  drawFrame(0);
  await Promise.all(Array.from(
    { length: FRAME_COUNT - Math.min(10, FRAME_COUNT) },
    (_, i) => loadFrame(i + Math.min(10, FRAME_COUNT))
  ));
  gsap.to(loader, {
    opacity: 0, duration: 1.0, ease: 'power2.inOut',
    onComplete: () => { loader.style.display = 'none'; initAll(); }
  });
}

/* ── HERO WORD REVEAL ───────────────────────────────────── */
function initHeroWords() {
  document.querySelectorAll('.hero-word').forEach((w, i) => {
    setTimeout(() => w.classList.add('visible'), 250 + i * 150);
  });
}

/* ── HERO FADE + CIRCLE WIPE + SCENE BG ─────────────────── */
function initHeroTransition() {
  ScrollTrigger.create({
    trigger: heroEl,
    start: 'top top',
    end:   'bottom top',
    scrub: 1.5,
    onUpdate: self => {
      const p = self.progress;
      heroEl.style.opacity = Math.max(0, 1 - p * 1.3);
      canvasWrap.style.clipPath = `circle(${p * 92}% at 50% 50%)`;
      // Fade in scene background so body bg doesn't flash through
      if (sceneBg) sceneBg.style.opacity = Math.min(1, p * 3);
      // Toggle body class for color transition
      document.body.classList.toggle('scene-active', p > 0.05);
    }
  });
}

/* ── FRAME → SCROLL ─────────────────────────────────────── */
function initFrameScroll() {
  ScrollTrigger.create({
    trigger: scrollCont,
    start: 'top top', end: 'bottom bottom',
    scrub: 1.5,
    onUpdate: self => {
      const acc = Math.min(self.progress * FRAME_SPEED, 1);
      const idx = Math.min(Math.floor(acc * FRAME_COUNT), FRAME_COUNT - 1);
      if (idx !== currentFrame) {
        currentFrame = idx;
        requestAnimationFrame(() => drawFrame(currentFrame));
      }
    }
  });
}

/* ── DARK OVERLAY (stats: 19%–37%) ─────────────────────── */
function initDarkOverlay() {
  const enter = 0.19, leave = 0.37, fade = 0.03;
  ScrollTrigger.create({
    trigger: scrollCont,
    start: 'top top', end: 'bottom bottom',
    scrub: 1.5,
    onUpdate: self => {
      const p = self.progress;
      let op = 0;
      if      (p >= enter - fade && p <= enter) op = (p - (enter - fade)) / fade;
      else if (p > enter && p < leave)          op = 0.96;
      else if (p >= leave && p <= leave + fade) op = 0.96 * (1 - (p - leave) / fade);
      darkOverlay.style.opacity = Math.min(0.96, Math.max(0, op));
    }
  });
}

/* ── MARQUEES ────────────────────────────────────────────── */
function initMarquees() {
  const m1 = document.getElementById('marquee-1');
  const m2 = document.getElementById('marquee-2');

  [m1, m2].forEach((m, i) => {
    if (!m) return;
    gsap.to(m.querySelector('.marquee-text'), {
      xPercent: -(24 + i * 4), ease: 'none',
      scrollTrigger: { trigger: scrollCont, start: 'top top', end: 'bottom bottom', scrub: 1.5 }
    });
  });

  ScrollTrigger.create({
    trigger: scrollCont, start: 'top top', end: 'bottom bottom',
    scrub: 1.5,
    onUpdate: self => {
      const p = self.progress;
      if (m1) m1.style.opacity = clamp(remap(p, 0.13, 0.21, 0, 1)) * clamp(remap(p, 0.52, 0.59, 1, 0));
      if (m2) m2.style.opacity = clamp(remap(p, 0.66, 0.74, 0, 1)) * clamp(remap(p, 0.88, 0.95, 1, 0));
    }
  });
}

function remap(v, a, b, c, d) { return c + (d - c) * ((v - a) / (b - a)); }
function clamp(v) { return Math.min(1, Math.max(0, v)); }

/* ── COUNTER ─────────────────────────────────────────────── */
function animateCounter(el, triggerAt) {
  const target   = parseFloat(el.dataset.value);
  const decimals = parseInt(el.dataset.decimals || '0');
  let   done     = false;
  ScrollTrigger.create({
    trigger: scrollCont, start: 'top top', end: 'bottom bottom',
    onUpdate: self => {
      if (self.progress >= triggerAt && !done) {
        done = true;
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target, duration: 3, ease: 'power3.out',
          onUpdate() {
            el.textContent = decimals > 0
              ? obj.v.toFixed(decimals)
              : Math.floor(obj.v).toLocaleString('sv-SE');
          },
          onComplete() {
            el.textContent = decimals > 0 ? target.toFixed(decimals) : target.toLocaleString('sv-SE');
          }
        });
      }
    }
  });
}

/* ── SECTION ANIMATIONS ──────────────────────────────────── */
function setupSection(section) {
  const type    = section.dataset.animation;
  const persist = section.dataset.persist === 'true';
  const enter   = parseFloat(section.dataset.enter) / 100;
  const leave   = parseFloat(section.dataset.leave) / 100;
  const buf     = 0.015;

  const kids = Array.from(section.querySelectorAll(
    '.section-label, .section-heading, .section-body, .section-note, ' +
    '.section-link, .stat, .collab-list li, ' +
    '.nl-form, .nl-success'
  ));
  if (!kids.length) kids.push(section);

  const tl = gsap.timeline({ paused: true, defaults: { ease: 'power4.out' } });

  switch (type) {
    case 'slide-left':
      tl.from(kids, { x: -80, opacity: 0, stagger: 0.16, duration: 1.1 }); break;
    case 'slide-right':
      tl.from(kids, { x: 80,  opacity: 0, stagger: 0.16, duration: 1.1 }); break;
    case 'scale-up':
      tl.from(kids, { scale: 0.86, opacity: 0, stagger: 0.14, duration: 1.2 }); break;
    case 'rotate-in':
      tl.from(kids, { y: 50, rotation: 3, opacity: 0, stagger: 0.14, duration: 1.1 }); break;
    case 'stagger-up':
      tl.from(kids, { y: 60, opacity: 0, stagger: 0.16, duration: 1.0 }); break;
    case 'clip-reveal':
      tl.from(kids, { clipPath: 'inset(100% 0 0 0)', opacity: 0, stagger: 0.15, duration: 1.3, ease: 'power4.inOut' }); break;
    default:
      tl.from(kids, { y: 50, opacity: 0, stagger: 0.16, duration: 1.1 });
  }

  if (type === 'stagger-up') {
    section.querySelectorAll('.stat-number').forEach(el => animateCounter(el, enter));
  }

  let played = false, reversed = true;

  ScrollTrigger.create({
    trigger: scrollCont, start: 'top top', end: 'bottom bottom',
    onUpdate: self => {
      const p = self.progress;
      const inView = p >= (enter - buf) && p <= (leave + buf);
      const past   = p > (leave + buf);

      if (inView && !played) {
        section.style.opacity = '1';
        section.classList.add('is-active');
        tl.play();
        played = true; reversed = false;
      } else if (!inView && !reversed) {
        if (persist && past) { /* stay */ } else {
          tl.reverse();
          reversed = true;
          setTimeout(() => {
            if (reversed) {
              section.style.opacity = '0';
              section.classList.remove('is-active');
              played = false;
            }
          }, 1100);
        }
      }
    }
  });
}

/* ── RECIPE SECTION REVEAL ───────────────────────────────── */
function initRecipeSection() {
  const recipeSection = document.getElementById('recept');
  if (!recipeSection) return;

  const hdr   = recipeSection.querySelector('.recipes-header');
  const cards = recipeSection.querySelectorAll('.recipe-card');
  const all   = recipeSection.querySelector('.recipes-all');

  // Fade out canvas + scene-bg as recipe section scrolls into view
  ScrollTrigger.create({
    trigger: recipeSection,
    start: 'top 100%',
    end:   'top 0%',
    scrub: 0.8,
    onUpdate: self => {
      const p = self.progress;
      const fade = Math.min(1, p * 2.5);
      canvasWrap.style.opacity = String(1 - fade);
      if (sceneBg) sceneBg.style.opacity = String(1 - fade);
    },
    onLeaveBack: () => {
      canvasWrap.style.opacity = '1';
      if (sceneBg) sceneBg.style.opacity = '1';
      document.body.classList.add('scene-active');
    },
    onEnter: () => {
      document.body.classList.remove('scene-active');
    }
  });

  gsap.from(hdr, {
    y: 55, opacity: 0, duration: 1.2, ease: 'power4.out',
    scrollTrigger: { trigger: hdr, start: 'top 82%', toggleActions: 'play none none reverse' }
  });
  gsap.from(cards, {
    y: 45, opacity: 0, stagger: 0.12, duration: 1.0, ease: 'power4.out',
    scrollTrigger: { trigger: recipeSection.querySelector('.recipes-grid'), start: 'top 78%', toggleActions: 'play none none reverse' }
  });
  if (all) {
    gsap.from(all, {
      y: 35, opacity: 0, duration: 1.0, ease: 'power4.out',
      scrollTrigger: { trigger: all, start: 'top 88%', toggleActions: 'play none none reverse' }
    });
  }
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

/* ── NEWSLETTER FORMS ────────────────────────────────────── */
function initForms() {
  function bindForm(formId, successId) {
    const form    = document.getElementById(formId);
    const success = successId ? document.getElementById(successId) : null;
    if (!form) return;
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value;
      try {
        await fetch('https://hook.eu2.make.com/sfjfkezizhjh4x7r1rrjmjwyei2sufj2', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'newsletter', email, source: formId })
        });
      } catch (err) { /* silent */ }
      form.hidden = true;
      if (success) success.hidden = false;
      else form.insertAdjacentHTML('afterend', '<p style="font-size:.8rem;color:var(--gold);margin-top:.5rem">✓ Tack!</p>');
    });
  }
  bindForm('nl-form', 'nl-success');
  bindForm('footer-nl-form', null);
}

/* ── BOOT ────────────────────────────────────────────────── */
function initAll() {
  initHeroWords();
  initHeroTransition();
  initFrameScroll();
  initDarkOverlay();
  initMarquees();
  initHeader();
  document.querySelectorAll('.scroll-section').forEach(setupSection);
  initRecipeSection();
  initForms();
}

loadAllFrames();
