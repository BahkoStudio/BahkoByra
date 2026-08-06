/* ============================================================
   BAHKO BYRÅ — main-v2.js (rebrand 2026)
   Modular interaction + scroll-choreography layer.
   Depends (CDN, loaded in <head>): GSAP, ScrollTrigger, Lenis.
   Everything degrades gracefully if a CDN fails.
   v2: kort logo-preloader (endast första besöket per session),
   fullt reduced-motion-stöd, inline-formulärfel utan alert().
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
  /* Kort logga-intro (max 500 ms) — endast första besöket per
     session. Återbesök i samma session hoppar över helt. */
  function preloader(done) {
    const pl = $('#preloader');
    if (!pl) { done(); return; }
    let seen = false;
    try { seen = !!sessionStorage.getItem('bb_intro'); } catch (e) { /* visa intro ändå */ }
    if (seen || reduce) {
      pl.classList.add('done');
      pl.style.display = 'none';
      done();
      return;
    }
    try { sessionStorage.setItem('bb_intro', '1'); } catch (e) { /* ok */ }
    const mark = $('.pl-mark');
    if (mark) {
      mark.style.transition = 'opacity .25s ease';
      requestAnimationFrame(() => { mark.style.opacity = 1; });
    }
    pl.style.transition = 'opacity .25s ease .25s';
    requestAnimationFrame(() => requestAnimationFrame(() => { pl.style.opacity = 0; }));
    setTimeout(() => { pl.classList.add('done'); pl.style.display = 'none'; done(); }, 500);
  }

  /* ── SMOOTH SCROLL (Lenis) ─────────────────────────────── */
  let lenis = null;
  function initSmooth() {
    if (reduce || typeof window.Lenis === 'undefined') return;
    try {
      lenis = new Lenis({ lerp: .065, wheelMultiplier: .9, smoothWheel: true, touchMultiplier: 1.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
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
    return $$('.line > *', el);
  }

  /* ── REVEALS ───────────────────────────────────────────── */
  function initReveals() {
    // Reduced motion: visa allt direkt — inga transforms, ingen blur,
    // inte heller maskerade rubrikrader (data-lines). Animationerna
    // gate:as här i JS, inte bara via CSS-opacity.
    if (!hasST || reduce) {
      $$('[data-reveal]').forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
      $$('[data-lines] .line > *').forEach(el => { el.style.transform = 'none'; });
      return;
    }

    // masked headline lines
    $$('[data-lines]').forEach((h) => {
      if (h.closest('.hero')) return; // boot() entrance handles hero h1
      const inner = splitLines(h);
      if (!inner.length) return;
      gsap.set(inner, { yPercent: 115 });
      gsap.to(inner, {
        yPercent: 0, duration: 1, ease: 'expo.out', stagger: .09,
        scrollTrigger: { trigger: h, start: 'top 84%' }
      });
    });

    // generic reveals — eyebrows get clip-path wipe, others get y+opacity
    $$('[data-reveal]').forEach((el) => {
      const d = parseFloat(el.dataset.reveal) || 0;
      if (!reduce && el.classList.contains('eyebrow')) {
        gsap.fromTo(el,
          { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
          { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: .85, ease: 'power4.inOut', delay: d,
            scrollTrigger: { trigger: el, start: 'top 84%' } }
        );
      } else if (el.id === 'cform') {
        // stagger individual fields — more engaging than single-block reveal
        const items = [...$$('.field', el), el.querySelector('.btn')].filter(Boolean);
        gsap.to(el, { opacity: 1, duration: .1 });
        if (!reduce) {
          gsap.fromTo(items, { y: 30, opacity: 0, filter: 'blur(4px)' }, {
            y: 0, opacity: 1, filter: 'blur(0px)', duration: .95, ease: 'expo.out', stagger: .09,
            scrollTrigger: { trigger: el, start: 'top 88%' }
          });
        } else {
          gsap.set(items, { opacity: 1, y: 0 });
        }
      } else {
        gsap.fromTo(el, { y: 56, opacity: 0, filter: 'blur(5px)' }, {
          y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, ease: 'expo.out', delay: d,
          scrollTrigger: { trigger: el, start: 'top 86%' }
        });
      }
    });

    // eyebrows without data-reveal also get wipe animation
    $$('.eyebrow:not([data-reveal])').forEach((el) => {
      if (reduce) return;
      gsap.fromTo(el,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: .85, ease: 'power4.inOut',
          scrollTrigger: { trigger: el, start: 'top 84%' } }
      );
    });

    // grouped stagger — class-aware for varied animation types
    $$('[data-stagger]').forEach((grp) => {
      const items = $$('[data-stagger-item]', grp);
      if (!items.length) return;

      if (!reduce && grp.classList.contains('svc-grid')) {
        // cinematic cascade: scale + deep tilt + opacity, expo ease
        gsap.fromTo(items,
          { y: 80, opacity: 0, scale: 0.86, rotationX: 26, transformOrigin: '50% 0%' },
          { y: 0, opacity: 1, scale: 1, rotationX: 0,
            duration: 1.35, ease: 'expo.out',
            stagger: { each: 0.075, ease: 'power1.out' },
            scrollTrigger: { trigger: grp, start: 'top 85%' } }
        );
      } else if (!reduce && grp.classList.contains('why-list')) {
        // elegant vertical cascade with blur — each card flows in
        gsap.fromTo(items,
          { y: 62, opacity: 0, scale: 0.94, filter: 'blur(9px)' },
          { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)',
            duration: 1.1, ease: 'expo.out',
            stagger: { each: 0.16, ease: 'power1.inOut' },
            scrollTrigger: { trigger: grp, start: 'top 84%' } }
        );
        // checkmark circles pop in after cards arrive
        gsap.fromTo($$('.wi-ck', grp),
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.55, ease: 'back.out(3)',
            stagger: { each: 0.16, delay: 0.5 },
            scrollTrigger: { trigger: grp, start: 'top 84%' } }
        );
      } else {
        gsap.fromTo(items, { y: 52, opacity: 0, filter: 'blur(4px)' }, {
          y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.0, ease: 'expo.out', stagger: .11,
          scrollTrigger: { trigger: grp, start: 'top 84%' }
        });
      }
    });
  }

  /* ── COUNTERS ──────────────────────────────────────────── */
  function initCounters() {
    $$('[data-count]').forEach((el) => {
      const target = parseFloat(el.dataset.count);
      const suf = el.dataset.suffix || '';
      const run = () => {
        if (!hasGSAP || reduce) { el.textContent = target + suf; return; }
        const o = { v: 0 };
        gsap.to(o, {
          v: target, duration: 2.2, ease: 'expo.out',
          onUpdate: () => { el.textContent = Math.round(o.v) + suf; }
        });
      };
      if (hasST) ScrollTrigger.create({ trigger: el, start: 'top 84%', once: true, onEnter: run });
      else run();
    });
  }

  /* ── STATS PUNCH ───────────────────────────────────────── */
  function initStatsPunch() {
    if (!hasST || reduce) return;
    gsap.fromTo('.stat-v', { scale: .5, opacity: 0, y: 24, filter: 'blur(6px)' }, {
      scale: 1, opacity: 1, y: 0, filter: 'blur(0px)',
      duration: 1.45, stagger: .14, ease: 'back.out(2)',
      scrollTrigger: { trigger: '.stats', start: 'top 82%' }
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
  }

  /* ── PROCESS: pinned horizontal scroll ─────────────────── */
  function initProcess() {
    const pin = $('#proc-pin');
    const track = $('#proc-track');
    if (!pin || !track) return;
    const mq = matchMedia('(min-width: 861px)');
    if (!hasST || reduce || !mq.matches) {
      if (hasST) gsap.fromTo($$('.pstep', track),
        { y: 65, opacity: 0, scale: .94, filter: 'blur(6px)' },
        { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)',
          duration: 1.05, ease: 'expo.out', stagger: { each: .13 },
          scrollTrigger: { trigger: track, start: 'top 80%' } });
      return;
    }
    const getDist = () => track.scrollWidth - innerWidth + parseFloat(getComputedStyle(track).paddingLeft);
    gsap.to(track, {
      x: () => -getDist(), ease: 'none',
      scrollTrigger: {
        trigger: pin, start: 'top top', end: () => '+=' + getDist(),
        scrub: 1.5, pin: true, anticipatePin: 1, invalidateOnRefresh: true
      }
    });
  }

  /* ── MARQUEE (velocity-aware drift) ───────────────────── */
  function initMarquee() {
    const track = $('#marquee-track');
    if (!track || !hasGSAP) return;
    const base = track.querySelector('.mq-set');
    if (!base) return;
    const fill = () => { while (track.scrollWidth < innerWidth * 2) track.appendChild(base.cloneNode(true)); };
    fill();

    const BASE_SPEED = .4;
    let x = 0;
    let speed = BASE_SPEED;
    let targetSpeed = BASE_SPEED;
    const half = () => base.offsetWidth;

    // Accelerate on scroll velocity
    if (lenis) {
      lenis.on('scroll', ({ velocity }) => {
        targetSpeed = BASE_SPEED + Math.abs(velocity) * 0.45;
      });
    }

    gsap.ticker.add(() => {
      // Lerp speed toward target, decay target back to base
      speed += (targetSpeed - speed) * .07;
      targetSpeed += (BASE_SPEED - targetSpeed) * .025;
      x -= speed;
      if (Math.abs(x) >= half()) x += half();
      track.style.transform = `translateX(${x}px)`;
    });
  }

  /* ── MAGNETIC BUTTONS ──────────────────────────────────── */
  function initCursor() {
    if (!canHover || reduce) return;
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

  /* ── FORMULÄRFEL (inline, ersätter alert) ──────────────── */
  const FORM_ERR_MSG = 'Något gick fel. Försök igen eller mejla oss direkt på mathias@bahkobyra.se';
  function showFormErr(form, msg) {
    let err = form.querySelector('.form-err');
    if (!err) {
      err = doc.createElement('p');
      err.className = 'form-err';
      err.setAttribute('role', 'alert');
      const btn = form.querySelector('button[type="submit"]');
      if (btn && btn.parentNode) btn.parentNode.insertBefore(err, btn.nextSibling);
      else form.appendChild(err);
    }
    err.textContent = msg || FORM_ERR_MSG;
    err.hidden = false;
  }
  function hideFormErr(form) {
    const err = form.querySelector('.form-err');
    if (err) err.hidden = true;
  }

  /* ── CONTACT FORM ──────────────────────────────────────── */
  function initForm() {
    const form = $('#cform'); const ok = $('#cok');
    if (!form) return;
    const btn = $('button[type="submit"]', form);
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      hideFormErr(form);
      if (btn) btn.disabled = true;
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        if (!res.ok) throw new Error('bad response');
        form.style.display = 'none';
        if (ok) ok.classList.add('show');
      } catch {
        if (btn) btn.disabled = false;
        showFormErr(form);
      }
    });
  }

  /* ── AUDIT POPUP ───────────────────────────────────────── */
  function initPopup() {
    const pop = $('#pop'); if (!pop) return;
    // Visas en gång per besökare, max var 7:e dag — aldrig på nytt i samma session.
    const KEY = 'bb_pop_seen';
    try { if (Date.now() - (+localStorage.getItem(KEY) || 0) < 7 * 864e5) return; } catch (e) { /* visa ändå */ }
    const x = $('#pop-x');
    const seen = () => { try { localStorage.setItem(KEY, Date.now()); } catch (e) {} };
    const show = () => { pop.classList.add('show'); seen(); };
    const hide = () => pop.classList.remove('show');
    if (x) x.addEventListener('click', hide);
    pop.addEventListener('click', (e) => { if (e.target === pop) hide(); });
    addEventListener('keydown', (e) => { if (e.key === 'Escape') hide(); });
    setTimeout(show, 22000);
  }

  /* ── NEWSLETTER (footer) ───────────────────────────────── */
  function initNewsletter() {
    const form = $('#nlform'); if (!form) return;
    const box = form.closest('.foot-nl');
    const btn = $('button[type="submit"]', form);
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      hideFormErr(form);
      if (btn) btn.disabled = true;
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        if (!res.ok) throw new Error('bad response');
        if (box) box.classList.add('sent');
      } catch {
        if (btn) btn.disabled = false;
        showFormErr(form);
      }
    });
  }

  /* ── EXTRAS: marquee, CTA glow, stat labels, proc hint ─── */
  function initExtras() {
    if (!hasST || reduce) return;

    // marquee band wipes in from left
    gsap.fromTo('.marquee',
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'power4.inOut',
        scrollTrigger: { trigger: '.marquee', start: 'top 96%' } }
    );

    // CTA glow scales up as section enters
    gsap.fromTo('.cta .glow',
      { scale: 0.4, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2.2, ease: 'power2.out',
        scrollTrigger: { trigger: '.cta', start: 'top 75%' } }
    );

    // stat labels fade in after the number punch
    gsap.fromTo('.stat-l',
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: .75, ease: 'power3.out', stagger: .13, delay: .9,
        scrollTrigger: { trigger: '.stats', start: 'top 82%' } }
    );

    // process hint line slides in
    gsap.fromTo('.proc-hint',
      { opacity: 0, x: -24 },
      { opacity: 1, x: 0, duration: .9, ease: 'expo.out',
        scrollTrigger: { trigger: '.proc-hint', start: 'top 88%' } }
    );
  }

  /* ── AUDIT REVEAL ──────────────────────────────────────── */
  function initAuditReveal() {
    if (!hasST || reduce) return;
    const audit = $('.audit');
    if (!audit) return;
    const parts = [
      $('.audit-tags', audit),
      $('h3', audit),
      $('p', audit),
      $('.btn', audit)
    ].filter(Boolean);
    gsap.fromTo(parts,
      { y: 28, opacity: 0, filter: 'blur(5px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.95, ease: 'expo.out',
        stagger: 0.1, delay: 0.2,
        scrollTrigger: { trigger: audit, start: 'top 83%' } }
    );
  }

  /* ── DEMO ENTRANCE ─────────────────────────────────────── */
  function initDemoEntrance() {
    if (!hasST || reduce) return;
    gsap.fromTo('.demo-frame',
      { y: 90, opacity: 0, scale: .88, rotationY: -10, transformPerspective: 1600 },
      { y: 0, opacity: 1, scale: 1, rotationY: 0, duration: 1.8, ease: 'expo.out',
        scrollTrigger: { trigger: '.demo-frame', start: 'top 88%' } }
    );
  }

  /* ── FOOTER REVEAL ──────────────────────────────────────── */
  function initFooterReveal() {
    if (!hasST || reduce) return;
    gsap.fromTo('.foot-brand',
      { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
      { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 1.4, ease: 'power4.inOut',
        scrollTrigger: { trigger: '.foot-brand', start: 'top 92%' } }
    );
    gsap.fromTo($$('.foot-cta, .foot-bottom'),
      { y: 32, opacity: 0, filter: 'blur(5px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, ease: 'expo.out', stagger: .18,
        scrollTrigger: { trigger: '.foot-brand', start: 'top 90%' } }
    );
  }

  /* ── BOOT ──────────────────────────────────────────────── */
  function boot() {
    initSmooth();
    initHeader();
    initProgress();
    initReveals();
    initCounters();
    initStatsPunch();
    initExtras();
    initParallax();
    initProcess();
    initMarquee();
    initAuditReveal();
    initDemoEntrance();
    initFooterReveal();
    initCursor();
    initNav();
    initForm();
    initNewsletter();
    initPopup();

    // Hero-entrancen är CSS-driven (style-v2.css) så att LCP inte väntar på GSAP.

    if (hasST) setTimeout(() => ScrollTrigger.refresh(), 300);
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', () => preloader(boot));
  else preloader(boot);
  addEventListener('load', () => { if (hasST) ScrollTrigger.refresh(); });

  // Failsafe: never leave copy hidden if GSAP/ScrollTrigger stalls
  setTimeout(() => {
    const pl = $('#preloader');
    if (pl && !pl.classList.contains('done')) { pl.style.display = 'none'; pl.classList.add('done'); }
    $$('[data-reveal]').forEach((el) => {
      if (getComputedStyle(el).opacity === '0') { el.style.opacity = 1; el.style.transform = 'none'; }
    });
    $$('.hero-h1 .line > *').forEach((el) => { el.style.transform = 'none'; });
  }, 4000);
})();
