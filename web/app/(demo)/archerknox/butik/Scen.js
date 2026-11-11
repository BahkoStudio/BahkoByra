'use client';

import { useEffect, useRef } from 'react';

/* Den fastnålade scenen (2026-11-11, Mathias: "som det vi skapade till Mayka, var kreativ, gör det
   vackert, fånga uppmärksamhet"). Samma grepp som maykaskitchen.se: produkten i riktig 3D framför namnet,
   och fyra vyer som byts medan man skrollar. Här är produkten ett fågelband, byggt i Three.js (r158, lokal
   kopia i /archerknox/js/). Bakgrunden byter färg per vy, och i vy 2 flyger tre fåglar in och vänder.

   Robusthet: servern ritar en vanlig hero med produktfotot. Först när WebGL bevisligen ritat byts fotot
   mot 3D och sektionen blir hög och fastnålad (klassen scenAktiv). Utan JavaScript, utan WebGL eller vid
   minskad rörelse står heron kvar som den är. Ingen GSAP: skrollen läses i en rAF-loop. */

// yS = höjdläge på telefon (andel av synlig höjd), em = magentaglöd i materialet (mörka vyn).
const VYER = [
  { bg: [251, 241, 252], ry: -0.45, rx: 0.5, rz: -0.14, x: 0, y: -0.1, s: 0.56, yS: -0.02, em: 0 },
  { bg: [204, 0, 204], ry: 0.75, rx: 0.62, rz: 0.1, x: 0.27, y: 0, s: 0.74, yS: -0.22, em: 0 },
  { bg: [26, 8, 32], ry: 2.5, rx: -0.3, rz: -0.08, x: -0.27, y: 0, s: 0.74, yS: -0.22, em: 0.9 },
  { bg: [251, 241, 252], ry: 5.85, rx: 0.5, rz: -0.14, x: 0, y: -2.45, s: 0.56, yS: -0.2, em: 0 },
];
const MAGENTA = [204, 0, 204];
const lerp = (a, b, t) => a + (b - a) * t;
const mjuk = (t) => t * t * (3 - 2 * t);

function byggBand(THREE) {
  const g = new THREE.Group();
  const svart = new THREE.MeshPhysicalMaterial({ color: 0x15131a, roughness: 0.32, metalness: 0.1, clearcoat: 0.7, clearcoatRoughness: 0.25 });
  const B = 10; // bandets längd
  const list = new THREE.Mesh(new THREE.BoxGeometry(B, 0.2, 0.42), svart);
  list.position.y = 1.5; g.add(list);
  const list2 = new THREE.Mesh(new THREE.BoxGeometry(B, 0.09, 0.16), svart);
  list2.position.set(0, 0.95, 0.12); g.add(list2);
  const N = 46;
  const pinne = new THREE.BoxGeometry(0.075, 3.5, 0.075);
  const ogla = new THREE.TorusGeometry(0.11, 0.028, 8, 18);
  for (let i = 0; i < N; i++) {
    const x = -B / 2 + 0.12 + (i * (B - 0.24)) / (N - 1);
    const p = new THREE.Mesh(pinne, svart);
    p.position.set(x, -0.2, i % 2 ? 0.14 : -0.02);
    p.rotation.x = i % 2 ? 0.1 : -0.03;
    p.rotation.z = 0.035;
    g.add(p);
    if (i % 2 === 0) { const o = new THREE.Mesh(ogla, svart); o.position.set(x + 0.1, 1.2, 0.2); o.rotation.y = 0.5; g.add(o); }
  }
  // Tre clips på listen
  const clip = new THREE.BoxGeometry(0.5, 0.34, 0.62);
  for (const cx of [-3.4, 0, 3.4]) { const c = new THREE.Mesh(clip, svart); c.position.set(cx, 1.56, 0.02); g.add(c); }
  return g;
}

export default function Scen({ klass: s, children }) {
  const rot = useRef(null);
  const duk = useRef(null);

  useEffect(() => {
    const el = rot.current; const canvas = duk.current;
    if (!el || !canvas) return undefined;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let levande = true; let raf = 0; let rensa = () => {};

    const starta = () => {
      const THREE = window.THREE;
      if (!THREE || !levande) return;
      let renderer;
      try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' }); } catch (e) { return; }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      const scene = new THREE.Scene();
      const kam = new THREE.PerspectiveCamera(30, 1, 0.1, 100); kam.position.set(0, 0, 18);
      scene.add(new THREE.HemisphereLight(0xffffff, 0x3a2040, 1.1));
      const key = new THREE.DirectionalLight(0xffffff, 2.6); key.position.set(4, 7, 9); scene.add(key);
      const kant = new THREE.DirectionalLight(0xff4dff, 3.2); kant.position.set(-7, 2, -5); scene.add(kant);
      const kant2 = new THREE.DirectionalLight(0xffb3ff, 1.6); kant2.position.set(7, -3, -6); scene.add(kant2);
      const band = byggBand(THREE); scene.add(band);
      const material = band.children[0].material; material.emissive = new THREE.Color(0xcc00cc); material.emissiveIntensity = 0;

      const texter = [...el.querySelectorAll('[data-vy]')];
      const faglar = [...el.querySelectorAll('[data-fagel]')];
      const inre = el.querySelector('[data-inre]');
      let w = 0; let h = 0;
      const storlek = () => {
        w = inre.clientWidth; h = inre.clientHeight;
        renderer.setSize(w, h, false); kam.aspect = w / h; kam.updateProjectionMatrix();
      };
      storlek();
      const ro = new ResizeObserver(storlek); ro.observe(inre);

      const rita = (tid) => {
        if (!levande) return;
        const r = el.getBoundingClientRect();
        const langd = Math.max(1, r.height - window.innerHeight);
        const p = Math.min(1, Math.max(0, -r.top / langd));
        const f = p * (VYER.length - 1);
        const i = Math.min(VYER.length - 2, Math.floor(f)); const t = mjuk(f - i);
        const a = VYER[i]; const b = VYER[i + 1];
        const staende = w / h < 0.8;
        // Synlig bredd på bandets avstånd: skala så bandet ryms.
        const synligH = 2 * kam.position.z * Math.tan((kam.fov * Math.PI) / 360);
        const synligB = synligH * kam.aspect;
        const passar = Math.min(1, (synligB * (staende ? 0.92 : 0.62)) / 10);
        const sk = lerp(a.s, b.s, t) * passar * (staende ? 1.25 : 1.25);
        band.scale.setScalar(sk);
        const sving = Math.sin(tid / 1400) * 0.05;
        band.rotation.set(lerp(a.rx, b.rx, t) + sving * 0.6, lerp(a.ry, b.ry, t) + sving, lerp(a.rz, b.rz, t) + (staende ? 0.42 : 0));
        band.position.set(staende ? 0 : lerp(a.x, b.x, t) * synligB, staende ? lerp(a.yS, b.yS, t) * synligH : lerp(a.y, b.y, t), 0);
        material.emissiveIntensity = lerp(a.em, b.em, t);
        // Mörkt till ljust går via magenta, annars blir mellanläget grått.
        const viaMagenta = i === 2;
        const bg = viaMagenta
          ? (t < 0.5 ? a.bg.map((v, k) => Math.round(lerp(v, MAGENTA[k], t * 2))) : MAGENTA.map((v, k) => Math.round(lerp(v, b.bg[k], (t - 0.5) * 2))))
          : a.bg.map((v, k) => Math.round(lerp(v, b.bg[k], t)));
        inre.style.backgroundColor = `rgb(${bg.join(',')})`;
        texter.forEach((n, k) => {
          const d = Math.abs(f - k); const o = Math.max(0, 1 - d * 2.6);
          n.style.opacity = o; n.style.transform = `translateY(${(f - k) * -46}px)`;
          n.style.pointerEvents = o > 0.5 ? 'auto' : 'none'; n.style.visibility = o < 0.02 ? 'hidden' : 'visible';
        });
        // Fåglarna: flyger in från vänster mot bandet i vy 2 och vänder uppåt tillbaka.
        const fp = Math.min(1, Math.max(0, (f - 0.55) / 1.1));
        faglar.forEach((n, k) => {
          const q = Math.min(1, Math.max(0, fp * 1.25 - k * 0.12));
          const in_ = Math.min(1, q / 0.55); const ut = Math.max(0, (q - 0.55) / 0.45);
          const x = lerp(-18, staende ? 22 : 50, mjuk(in_)) - mjuk(ut) * 46;
          const y = staende
            ? lerp(34 + k * 9, 60 + k * 5, in_) - mjuk(ut) * (30 + k * 6)
            : lerp(10 + k * 5, 20 + k * 6, in_) - mjuk(ut) * (34 + k * 6);
          n.style.transform = `translate(${x}vw, ${y}vh) scaleX(${ut > 0.08 ? -1 : 1}) rotate(${ut > 0.08 ? 18 : -6}deg)`;
          n.style.opacity = q <= 0 || q >= 1 ? 0 : Math.min(1, q * 6, (1 - q) * 5);
        });
        renderer.render(scene, kam);
        raf = requestAnimationFrame(rita);
      };
      renderer.render(scene, kam);
      // 3D ritat: byt fotot mot duken och nåla fast scenen.
      el.classList.add(s.scenAktiv);
      raf = requestAnimationFrame(rita);
      rensa = () => { ro.disconnect(); cancelAnimationFrame(raf); renderer.dispose(); el.classList.remove(s.scenAktiv); };
    };

    if (window.THREE) starta();
    else {
      const sc = document.createElement('script'); sc.src = '/archerknox/js/three.min.js'; sc.async = true; sc.onload = starta; document.head.appendChild(sc);
    }
    return () => { levande = false; rensa(); };
  }, [s]);

  return (
    <section className={s.scen} ref={rot}>
      <div className={s.scenInre} data-inre>
        <canvas className={s.duk} ref={duk} aria-hidden="true" />
        {children}
      </div>
    </section>
  );
}
