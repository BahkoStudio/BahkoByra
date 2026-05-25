/* ============================================================
   BAHKO BYRÅ — main.js
   Modular interaction + scroll-choreography layer.
   Depends (CDN, loaded in <head>): GSAP, ScrollTrigger, Lenis.
   Everything degrades gracefully if a CDN fails.
   ============================================================ */
(() => {
  'use strict';
  const doc = document;
  const root = doc.documentElement;
  root.classList.add('js');

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const hasGSAP = typeof window.gsap !== 'undefined';
  const hasST = hasGSAP && typeof window.ScrollTrigger !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  const $ = (s, c = doc) => c.querySelector(s);
  const $$ = (s, c = doc) => Array.from(c.querySelectorAll(s));

  /* ── PRELOADER ─────────────────────────────────────────── */
  function preloader(done) {
    const pl = $('#preloader');
    const bar = $('#pl-bar');
    const num = $('#pl-num');
    const mark = $('.pl-mark');
    if (!pl) { done(); return; }
    if (reduce || !hasGSAP) {
      if (mark) mark.style.opacity = 1;
      pl.style.transition = 'opacity .5s';
      requestAnimationFrame(() => { pl.style.opacity = 0; });
      setTimeout(() => { pl.classList.add('done'); pl.style.display = 'none'; done(); }, 500);
      return;
    }
    const tl = gsap.timeline({ onComplete: done });
    const counter = { v: 0 };
    tl.to(mark, { opacity: 1, duration: .7, ease: 'power2.out' })
      .to(counter, {
        v: 100, duration: 1.8, ease: 'power2.inOut',
        onUpdate: () => {
          const p = Math.round(counter.v);
          if (num) num.textContent = String(p).padStart(3, '0');
          if (bar) bar.style.right = (100 - p) + '%';
        }
      }, '-=.3')
      .to(mark, { opacity: 0, y: -14, duration: .5, ease: 'power2.in' }, '+=.15')
      .to(pl, {
        clipPath: 'inset(0 0 100% 0)', duration: .9, ease: 'expo.inOut',
        onComplete: () => { pl.classList.add('done'); pl.style.display = 'none'; }
      }, '-=.1');
  }

  /* ── SMOOTH SCROLL (Lenis) ─────────────────────────────── */
  let lenis = null;
  function initSmooth() {
    if (reduce || typeof window.Lenis === 'undefined') return;
    try {
      lenis = new Lenis({ lerp: .085, wheelMultiplier: 1, smoothWheel: true });
      if (hasST) {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((t) => lenis.raf(t * 1000));
        gsap.ticker.lagSmoothing(0);
      } else {
        const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
        requestAnimationFrame(raf);
      }
    } catch (e) { /* graceful */ }
  }
  function scrollTo(target) {
    const el = typeof target === 'string' ? $(target) : target;
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.2 });
    else el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  }

  /* ── HEADER (hide on scroll-down / show on up) ─────────── */
  function initHeader() {
    const hdr = $('#hdr');
    if (!hdr) return;
    let last = 0;
    const onScroll = (y) => {
      hdr.classList.toggle('scrolled', y > 40);
      if (y > last && y > 320) { hdr.classList.add('down'); hdr.classList.remove('up'); }
      else { hdr.classList.add('up'); hdr.classList.remove('down'); }
      last = y;
    };
    if (lenis) lenis.on('scroll', ({ scroll }) => onScroll(scroll));
    else window.addEventListener('scroll', () => onScroll(window.scrollY), { passive: true });
  }

  /* ── SCROLL PROGRESS ───────────────────────────────────── */
  function initProgress() {
    const bar = $('#progress');
    if (!bar) return;
    if (hasST) {
      gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: .2 } });
    } else {
      const upd = () => {
        const h = doc.body.scrollHeight - innerHeight;
        bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
      };
      window.addEventListener('scroll', upd, { passive: true }); upd();
    }
  }

  /* ── TEXT: wrap heading words into line spans for masking ─ */
  function splitLines(el) {
    // Uses existing <span class="line"><span>..</span></span> if present,
    // otherwise leaves text as-is (already authored in HTML for control).
    return $$('.line > *', el);
  }

  /* ── REVEALS ───────────────────────────────────────────── */
  function initReveals() {
    if (!hasST) { $$('[data-reveal]').forEach(el => el.style.opacity = 1); return; }

    // masked headline lines
    $$('[data-lines]').forEach((h) => {
      const inner = splitLines(h);
      if (!inner.length) return;
      gsap.set(inner, { yPercent: 115 });
      gsap.to(inner, {
        yPercent: 0, duration: 1, ease: 'expo.out', stagger: .09,
        scrollTrigger: { trigger: h, start: 'top 85%' }
      });
    });

    // generic staggered reveals (respect optional data-reveal-delay groups)
    $$('[data-reveal]').forEach((el) => {
      const d = parseFloat(el.dataset.reveal) || 0;
      gsap.fromTo(el, { y: 38, opacity: 0 }, {
        y: 0, opacity: 1, duration: .95, ease: 'power3.out', delay: d,
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });

    // grouped stagger via [data-stagger] parent
    $$('[data-stagger]').forEach((grp) => {
      const items = $$('[data-stagger-item]', grp);
      gsap.fromTo(items, { y: 46, opacity: 0 }, {
        y: 0, opacity: 1, duration: .9, ease: 'power3.out', stagger: .1,
        scrollTrigger: { trigger: grp, start: 'top 82%' }
      });
    });
  }

  /* ── COUNTERS ──────────────────────────────────────────── */
  function initCounters() {
    $$('[data-count]').forEach((el) => {
      const target = parseFloat(el.dataset.count);
      const suf = el.dataset.suffix || '';
      const run = () => {
        if (!hasGSAP) { el.textContent = target + suf; return; }
        const o = { v: 0 };
        gsap.to(o, {
          v: target, duration: 2, ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.round(o.v) + suf; }
        });
      };
      if (hasST) ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: run });
      else run();
    });
  }

  /* ── PARALLAX ──────────────────────────────────────────── */
  function initParallax() {
    if (!hasST || reduce) return;
    $$('[data-parallax]').forEach((el) => {
      const amt = parseFloat(el.dataset.parallax) || 60;
      gsap.fromTo(el, { y: -amt }, {
        y: amt, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });
    // hero video subtle drift
    const hv = $('.hero-video');
    if (hv) gsap.to(hv, { yPercent: 18, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  }

  /* ── PROCESS: pinned horizontal scroll ─────────────────── */
  function initProcess() {
    const pin = $('#proc-pin');
    const track = $('#proc-track');
    if (!pin || !track) return;
    const mq = matchMedia('(min-width: 861px)');
    if (!hasST || reduce || !mq.matches) {
      // mobile/reduced: vertical reveal fallback
      if (hasST) gsap.fromTo($$('.pstep', track), { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: .8, ease: 'power3.out', stagger: .12,
          scrollTrigger: { trigger: track, start: 'top 80%' } });
      return;
    }
    const getDist = () => track.scrollWidth - innerWidth + parseFloat(getComputedStyle(track).paddingLeft);
    gsap.to(track, {
      x: () => -getDist(), ease: 'none',
      scrollTrigger: {
        trigger: pin, start: 'top top', end: () => '+=' + getDist(),
        scrub: 1, pin: true, anticipatePin: 1, invalidateOnRefresh: true
      }
    });
  }

  /* ── MARQUEE (constant drift, velocity-aware) ──────────── */
  function initMarquee() {
    const track = $('#marquee-track');
    if (!track || !hasGSAP) return;
    const base = track.querySelector('.mq-set');
    if (!base) return;
    // duplicate until it overflows 2x for seamless loop
    const fill = () => { while (track.scrollWidth < innerWidth * 2) track.appendChild(base.cloneNode(true)); };
    fill();
    let x = 0; const speed = .4; // px/frame baseline
    const half = () => base.offsetWidth;
    gsap.ticker.add(() => {
      x -= speed;
      if (Math.abs(x) >= half()) x += half();
      track.style.transform = `translateX(${x}px)`;
    });
  }

  /* ── CUSTOM CURSOR + MAGNETIC ──────────────────────────── */
  function initCursor() {
    if (!canHover || reduce) return;
    const ring = $('#cursor'); const dot = $('#cursor-dot');
    if (!ring || !dot) return;
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`; });
    const loop = () => { rx += (mx - rx) * .18; ry += (my - ry) * .18; ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`; requestAnimationFrame(loop); };
    loop();
    $$('a, button, .magnetic, input, textarea, [data-cursor]').forEach((el) => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
    addEventListener('mouseleave', () => ring.classList.add('hide'));
    addEventListener('mouseenter', () => ring.classList.remove('hide'));

    // magnetic pull
    $$('.magnetic').forEach((el) => {
      const str = parseFloat(el.dataset.magnetic) || .35;
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * str;
        const y = (e.clientY - (r.top + r.height / 2)) * str;
        el.style.transform = `translate(${x}px,${y}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* ── NAV / SMOOTH ANCHORS ──────────────────────────────── */
  function initNav() {
    const burger = $('#burger'); const mob = $('#mobnav');
    const toggle = (state) => {
      const open = state ?? !mob.classList.contains('open');
      burger.classList.toggle('open', open);
      mob.classList.toggle('open', open);
      root.classList.toggle('noscroll', open);
      if (lenis) open ? lenis.stop() : lenis.start();
    };
    if (burger && mob) burger.addEventListener('click', () => toggle());
    $$('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id.length < 2) return;
        const el = $(id);
        if (!el) return;
        e.preventDefault();
        if (mob && mob.classList.contains('open')) toggle(false);
        scrollTo(el);
      });
    });
  }

  /* ── CONTACT FORM ──────────────────────────────────────── */
  function initForm() {
    const form = $('#cform'); const ok = $('#cok');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.style.display = 'none';
      if (ok) ok.classList.add('show');
    });
  }

  /* ── AUDIT POPUP ───────────────────────────────────────── */
  function initPopup() {
    const pop = $('#pop'); if (!pop) return;
    const x = $('#pop-x');
    const show = () => pop.classList.add('show');
    const hide = () => pop.classList.remove('show');
    if (x) x.addEventListener('click', hide);
    pop.addEventListener('click', (e) => { if (e.target === pop) hide(); });
    addEventListener('keydown', (e) => { if (e.key === 'Escape') hide(); });
    setTimeout(() => { show(); setInterval(show, 90000); }, 18000);
  }

  /* ── HERO VIDEO ────────────────────────────────────────── */
  function initHeroVideo() {
    const v = $('#hero-video');
    if (!v) return;
    const reveal = () => v.classList.add('ready');
    if (v.readyState >= 2) reveal();
    v.addEventListener('loadeddata', reveal);
    v.addEventListener('canplay', reveal);
    // some browsers need an explicit play() kick
    const p = v.play(); if (p && p.catch) p.catch(() => {});
  }

  /* ── BOOT ──────────────────────────────────────────────── */
  function boot() {
    initSmooth();
    initHeader();
    initProgress();
    initHeroVideo();
    initReveals();
    initCounters();
    initParallax();
    initProcess();
    initMarquee();
    initCursor();
    initNav();
    initForm();
    initPopup();

    // hero entrance (independent of scroll)
    if (hasGSAP && !reduce) {
      const lines = $$('.hero-h1 .line > *');
      const tl = gsap.timeline({ delay: .1 });
      gsap.set('.hero-badge,.hero-lede,.hero-svc,.hero-ctas,.scrollcue', { opacity: 0, y: 18 });
      gsap.set(lines, { yPercent: 118 });
      tl.to('.hero-badge', { opacity: 1, y: 0, duration: .7, ease: 'power3.out' })
        .to(lines, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: .1 }, '-=.4')
        .to('.hero-lede', { opacity: 1, y: 0, duration: .8, ease: 'power3.out' }, '-=.6')
        .to('.hero-svc', { opacity: 1, y: 0, duration: .7, ease: 'power3.out' }, '-=.5')
        .to('.hero-ctas', { opacity: 1, y: 0, duration: .7, ease: 'power3.out' }, '-=.5')
        .to('.scrollcue', { opacity: 1, y: 0, duration: .7 }, '-=.4');
    }

    if (hasST) setTimeout(() => ScrollTrigger.refresh(), 300);
  }

  // start after preloader; refresh ScrollTrigger after full load (fonts/video)
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', () => preloader(boot));
  else preloader(boot);
  addEventListener('load', () => { if (hasST) ScrollTrigger.refresh(); });
})();
