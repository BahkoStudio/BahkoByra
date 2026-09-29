/* ── 3D-boken (Three.js) ──────────────────────────────────────
   En inbunden bok: omslag med laminatglans som speglar ett ljust
   softbox-fönster, flack rundad rygg, pappersblock med bladlinjer,
   kontaktskugga som följer bokens bredd. Styrs via window.BOK3D.state.
   ─────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  const W = 1, H = 1.395, T = 0.13;          // bredd, höjd, tjocklek (omslagets proportion 1100×1534)
  const BOARD = 0.016;                        // pärmens tjocklek
  const api = {
    state: { ry: -0.35, rx: 0.08, rz: 0, scale: 1, x: 0, y: 0, my: 0 },
    intro: { ry: 0, y: 0, scale: 1 },
    ready: false, portrait: false, yPortrait: 0
  };
  window.BOK3D = api;

  /* Miljö i HDR: mörkgrönt rum, ett stort varmt softbox-fönster framför boken,
     en smal ljuslist från sidan. Ger en riktig glansreflex som vandrar över
     omslaget när boken vrids. */
  function hdrMiljo() {
    const EW = 256, EH = 128, d = new Float32Array(EW * EH * 4);
    const ss = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
    const box = (u, v, u0, u1, v0, v1, f) => ss(u0 - f, u0, u) * (1 - ss(u1, u1 + f, u)) * ss(v0 - f, v0, v) * (1 - ss(v1, v1 + f, v));
    for (let j = 0; j < EH; j++) {
      const v = (j + 0.5) / EH;
      for (let i = 0; i < EW; i++) {
        const u = (i + 0.5) / EW, k = (j * EW + i) * 4;
        // grundton: golv mörkt, horisont grön, tak ljusare
        // mörkt rum, så miljön inte bleker omslaget
        let r = 0.012 + 0.03 * v, g = 0.03 + 0.05 * v, b = 0.02 + 0.03 * v;
        // smal hög ljuslist rakt bakom kameran: ger ett glansband som sveper över omslaget när boken vrids
        const list = box(u, v, 0.744, 0.756, 0.40, 0.70, 0.004) * 7.0;
        // två svagare fönster snett framför, så glansen syns även i vilovinkeln
        const f1 = box(u, v, 0.655, 0.675, 0.60, 0.72, 0.004) * 6.0;   // liten skarp softbox: glansfläck när boken vrids
        const f2 = 0;
        const bak = box(u, v, 0.23, 0.27, 0.35, 0.85, 0.01) * 0.8;   // kantljus bakifrån
        const L = list + f1 + f2 + bak;
        r += L; g += L * 0.96; b += L * 0.88;
        d[k] = r; d[k + 1] = g; d[k + 2] = b; d[k + 3] = 1;
      }
    }
    const h = new Uint16Array(d.length);
    for (let q = 0; q < d.length; q++) h[q] = THREE.DataUtils.toHalfFloat(d[q]);
    const t = new THREE.DataTexture(h, EW, EH, THREE.RGBAFormat, THREE.HalfFloatType);
    t.mapping = THREE.EquirectangularReflectionMapping;
    t.magFilter = THREE.LinearFilter; t.minFilter = THREE.LinearFilter;
    t.needsUpdate = true;
    return t;
  }

  /* Bladlinjer: 160 sidor = 80 blad, ojämna som riktigt papper */
  function bladTextur(vertikal, aniso) {
    const N = 512, c = document.createElement('canvas');
    c.width = vertikal ? N : 8; c.height = vertikal ? 8 : N;
    const g = c.getContext('2d');
    g.fillStyle = '#f2ead9'; g.fillRect(0, 0, c.width, c.height);
    let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    for (let p = 0; p < N; p++) {
      const l = 214 + Math.floor(rnd() * 34);                  // ljus variation per blad
      g.fillStyle = `rgb(${l},${l - 8},${l - 22})`;
      if (vertikal) g.fillRect(p, 0, 1, 8); else g.fillRect(0, p, 8, 1);
      if (p % 6 === 0) {                                        // bladkant
        g.fillStyle = 'rgba(120,100,70,0.35)';
        if (vertikal) g.fillRect(p, 0, 1, 8); else g.fillRect(0, p, 8, 1);
      }
    }
    // mörkare mot pärmarna, där bladen trycks ihop
    const grad = vertikal ? g.createLinearGradient(0, 0, N, 0) : g.createLinearGradient(0, 0, 0, N);
    grad.addColorStop(0, 'rgba(60,45,25,0.28)'); grad.addColorStop(0.08, 'rgba(0,0,0,0)');
    grad.addColorStop(0.92, 'rgba(0,0,0,0)'); grad.addColorStop(1, 'rgba(60,45,25,0.28)');
    g.fillStyle = grad; g.fillRect(0, 0, c.width, c.height);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = aniso;
    return t;
  }

  function initBook() {
    const canvas = document.getElementById('bok-canvas');
    if (!canvas || typeof THREE === 'undefined') return false;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch (_) { return false; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;   // behåll omslagets tryckfärger

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 50);

    try {
      const pmrem = new THREE.PMREMGenerator(renderer);
      const envTex = hdrMiljo();
      scene.environment = pmrem.fromEquirectangular(envTex).texture;
      envTex.dispose(); pmrem.dispose();
    } catch (_) { /* utan miljö blir det matt men fungerar */ }

    /* Ljus */
    // Miljön står för nästan allt ljus; lamporna ger bara riktning och kantljus.
    const hemi = new THREE.HemisphereLight(0xfff6e8, 0x0f2417, 0.4); scene.add(hemi);
    const key = new THREE.DirectionalLight(0xfff3e2, 1.8); key.position.set(-1.6, 2.2, 3.8); scene.add(key);
    const rim = new THREE.DirectionalLight(0xf1c76b, 0.5); rim.position.set(2.8, 1.2, -2.6); scene.add(rim);

    /* Texturer */
    const aniso = Math.min(4, renderer.capabilities.getMaxAnisotropy());
    const maxTex = renderer.capabilities.maxTextureSize || 2048;
    let laddade = 0;
    function tex(src, w, h) {
      w = Math.min(w, maxTex); h = Math.min(h, maxTex);
      const c = document.createElement('canvas'); c.width = w; c.height = h;
      const t = new THREE.CanvasTexture(c);
      t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = aniso;
      const img = new Image();
      img.onload = () => {
        c.getContext('2d').drawImage(img, 0, 0, w, h);
        t.needsUpdate = true;
        if (++laddade >= 3) api.ready = true;
      };
      img.onerror = () => { api.fel = 'bild'; };
      img.src = src;
      return t;
    }
    const texFram = tex('img/bok-fram.jpg', 1024, 1024);
    const texBak  = tex('img/bok-bak.jpg', 1024, 1024);
    const texRygg = tex('img/bok-rygg.jpg', 128, 1024);
    const texKantU = bladTextur(true, aniso);    // framkanten: blad staplas längs tjockleken
    const texKantV = bladTextur(false, aniso);   // över- och underkant

    const book = new THREE.Group();
    scene.add(book);

    /* Material: laminerat omslag = klarlack med låg ruffighet ovanpå tryckt papper */
    const omslag = [];
    const matCover = (map) => { const m = new THREE.MeshPhysicalMaterial({
      // Uppmätt mot omslagsfotot 2026-09-28: vilovinkeln ger grönt (29,65,38) mot (28,66,41) och
      // MAYKAS (193,86,52) mot (194,83,53). Grundlagret speglar inget, bara lacken glänser.
      map, roughness: 0.9, metalness: 0, specularIntensity: 0, clearcoat: 0.4, clearcoatRoughness: 0.08,
      envMapIntensity: 1.65
    }); omslag.push(m); return m; };
    const matBoard = new THREE.MeshStandardMaterial({ color: 0x173a25, roughness: 0.55, envMapIntensity: 0.6 });
    const matPaper = new THREE.MeshStandardMaterial({ color: 0xf0e7d4, roughness: 0.95, envMapIntensity: 0.3 });
    const matKantU = new THREE.MeshStandardMaterial({ map: texKantU, roughness: 0.92, envMapIntensity: 0.3 });
    const matKantV = new THREE.MeshStandardMaterial({ map: texKantV, roughness: 0.92, envMapIntensity: 0.3 });

    /* Pappersblocket: pärmarna sticker ut ca 3 mm runt om (inbunden bok) */
    const sq = 0.022;
    const pagesGeo = new THREE.BoxGeometry(W - sq - 0.012, H - sq * 2, T - BOARD * 2);
    // ordning: +x (framkant), -x (mot ryggen), +y (topp), -y (botten), +z, -z
    const pages = new THREE.Mesh(pagesGeo, [matKantU, matBoard, matKantV, matKantV, matPaper, matPaper]);
    pages.position.x = -sq / 2 + 0.006;
    book.add(pages);

    /* Fram- och bakpärm */
    const boardGeo = new THREE.BoxGeometry(W, H, BOARD);
    const front = new THREE.Mesh(boardGeo, [matBoard, matBoard, matBoard, matBoard, matCover(texFram), matBoard]);
    front.position.z = T / 2 - BOARD / 2;
    book.add(front);
    const back = new THREE.Mesh(boardGeo, [matBoard, matBoard, matBoard, matBoard, matBoard, matCover(texBak)]);
    back.position.z = -T / 2 + BOARD / 2;
    book.add(back);

    /* Falsen: det svaga spåret i pärmen intill ryggen som alla inbundna böcker har */
    const falsMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.28, depthWrite: false });
    const falsGeo = new THREE.PlaneGeometry(0.007, H * 0.998);
    const falsF = new THREE.Mesh(falsGeo, falsMat); falsF.position.set(-W / 2 + 0.03, 0, T / 2 + 0.0006); book.add(falsF);
    const falsB = new THREE.Mesh(falsGeo, falsMat); falsB.position.set(-W / 2 + 0.03, 0, -T / 2 - 0.0006); falsB.rotation.y = Math.PI; book.add(falsB);

    /* Flack rundad rygg: en båge på 80°, inte en halvcirkel, så trycket inte trycks ihop i kanten */
    const theta = 1.4;
    const R = (T / 2) / Math.sin(theta / 2);
    const sag = R * (1 - Math.cos(theta / 2));
    const spineGeo = new THREE.CylinderGeometry(R, R, H, 40, 1, true, 1.5 * Math.PI - theta / 2, theta);
    const spine = new THREE.Mesh(spineGeo, new THREE.MeshPhysicalMaterial({
      map: texRygg, roughness: 0.75, clearcoat: 0.35, clearcoatRoughness: 0.3, side: THREE.FrontSide, envMapIntensity: 0.6
    }));
    spine.position.x = -W / 2 + R * Math.cos(theta / 2);
    book.add(spine);
    const spineBack = new THREE.Mesh(new THREE.BoxGeometry(0.02, H - sq * 2, T - BOARD * 2), matBoard);
    spineBack.position.x = -W / 2 + 0.01;
    book.add(spineBack);
    void sag;

    /* Kontaktskugga som följer bokens synliga bredd */
    const sc = document.createElement('canvas'); sc.width = 256; sc.height = 256;
    const sg = sc.getContext('2d');
    const rg = sg.createRadialGradient(128, 128, 6, 128, 128, 128);
    rg.addColorStop(0, 'rgba(0,0,0,0.62)'); rg.addColorStop(0.45, 'rgba(0,0,0,0.26)'); rg.addColorStop(1, 'rgba(0,0,0,0)');
    sg.fillStyle = rg; sg.fillRect(0, 0, 256, 256);
    const shadow = new THREE.Mesh(new THREE.PlaneGeometry(1, 0.42), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(sc), transparent: true, depthWrite: false }));
    shadow.rotation.x = -Math.PI / 2;
    scene.add(shadow);

    /* Storlek: ~56 % av höjden på desktop, ~70 % av bredden på mobil (≈45 % av höjden) */
    let visH = 1;
    function resize() {
      const w = canvas.clientWidth || 1, h = canvas.clientHeight || 1;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      const tan = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      const dH = H / (0.56 * 2 * tan);
      const dW = W / (0.70 * 2 * tan * camera.aspect);
      const d = Math.max(dH, dW);
      camera.position.set(0, 0, d);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
      visH = 2 * d * tan;
      api.portrait = camera.aspect < 0.8;
      // mobil: bokens mitt på 44 % av höjden, så den täcker rubrikens nederkant och lämnar plats för texten
      api.yPortrait = api.portrait ? 0.06 * visH : 0;
    }
    resize();
    window.addEventListener('resize', resize);
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas);

    // Kalibrering (används vid mätning): api.tune({ hemi, key, rim, env, clearcoat, ccr, rough })
    api.tune = (o) => {
      if (o.hemi != null) hemi.intensity = o.hemi;
      if (o.key != null) key.intensity = o.key;
      if (o.rim != null) rim.intensity = o.rim;
      omslag.forEach(m => {
        if (o.env != null) m.envMapIntensity = o.env;
        if (o.clearcoat != null) m.clearcoat = o.clearcoat;
        if (o.ccr != null) m.clearcoatRoughness = o.ccr;
        if (o.rough != null) m.roughness = o.rough;
        if (o.spec != null) m.specularIntensity = o.spec;
      });
    };

    /* Renderloop: vilorörelse + tillstånd utifrån */
    const clock = new THREE.Clock();
    let synlig = true;
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(e => { synlig = e[0].isIntersecting; }).observe(canvas);
    }
    function frame() {
      requestAnimationFrame(frame);
      if (!synlig) return;
      const t = clock.getElapsedTime();
      const s = api.state, i = api.intro;
      const bob = Math.sin(t * 1.1) * 0.03;
      const ry = s.ry + i.ry;
      book.rotation.set(s.rx, ry, s.rz + Math.sin(t * 0.7) * 0.015);
      book.position.x = api.portrait ? 0 : s.x;
      book.position.y = s.y + i.y + bob + api.yPortrait + (api.portrait ? s.my * visH : 0);
      const sk = s.scale * i.scale;
      book.scale.setScalar(sk);
      // skuggan: under boken, bred när omslaget vänder sig mot oss, smal när kanten gör det
      const bredd = Math.abs(Math.cos(ry)) * W + Math.abs(Math.sin(ry)) * T;
      shadow.position.set(book.position.x, book.position.y - (H / 2) * sk * Math.cos(s.rx) - 0.16, 0);
      shadow.scale.set(Math.max(0.45, bredd * 1.25) * sk, 1, sk * (0.8 + Math.abs(Math.sin(s.rx)) * 0.6));
      shadow.material.opacity = 0.8 - bob * 4;
      renderer.render(scene, camera);
      if (api.ready && !api.kontrollerad) kontrollera();
    }

    // Läser av några punkter på omslaget direkt efter ritningen. Är de nästan lika (tomt omslag)
    // eller har ett skuggprogram fallerat, stannar fotot kvar och 3D-duken göms.
    const px = new Uint8Array(4), v3 = new THREE.Vector3();
    let forsok = 0;
    function kontrollera() {
      if (++forsok < 3) return;                   // ge uppladdningen ett par bildrutor
      api.kontrollerad = true;
      const gl = renderer.getContext();
      const trasigt = (renderer.info.programs || []).some(p => p.diagnostics && p.diagnostics.runnable === false);
      const punkter = [[0, 0.33], [0, 0], [0, -0.33], [0.28, 0.18], [-0.28, -0.18], [0.2, -0.4]];
      const farger = [];
      book.updateMatrixWorld();
      for (const [x, y] of punkter) {
        v3.set(x * W, y * H, T / 2 + 0.001).applyMatrix4(book.matrixWorld).project(camera);
        const bx = Math.round((v3.x + 1) / 2 * gl.drawingBufferWidth), by = Math.round((v3.y + 1) / 2 * gl.drawingBufferHeight);
        if (bx < 0 || by < 0 || bx >= gl.drawingBufferWidth || by >= gl.drawingBufferHeight) continue;
        gl.readPixels(bx, by, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
        farger.push([px[0], px[1], px[2]]);
      }
      let spann = 0;
      for (let k = 0; k < 3; k++) { const vals = farger.map(f => f[k]); spann = Math.max(spann, Math.max(...vals) - Math.min(...vals)); }
      api.kontroll = { trasigt, spann, punkter: farger.length };
      if (trasigt || api.fel || farger.length < 3 || spann < 40) visaReserv(); else visa3d();
    }
    function visa3d() { canvas.classList.add('redo'); const fb = document.getElementById('book-fallback'); if (fb) fb.classList.add('dold'); api.visar = '3d'; }
    function visaReserv() { canvas.style.display = 'none'; api.visar = 'foto'; }

    // Safari kan kasta 3D-duken när man byter app. Då visas fotot, och 3D prövas igen när duken kommer tillbaka.
    canvas.addEventListener('webglcontextlost', e => { e.preventDefault(); canvas.classList.remove('redo'); const fb = document.getElementById('book-fallback'); if (fb) fb.classList.remove('dold'); }, false);
    canvas.addEventListener('webglcontextrestored', () => { [texFram, texBak, texRygg].forEach(t => { t.needsUpdate = true; }); api.kontrollerad = false; forsok = 0; }, false);

    frame();
    return true;
  }

  api.init = initBook;
}());
