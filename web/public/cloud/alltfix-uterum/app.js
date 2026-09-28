import * as THREE from 'three';
import { OrbitControls } from './vendor/OrbitControls.js';
import { RoomEnvironment } from './vendor/RoomEnvironment.js';

/* ============================================================
   ALLTFIX — uterumskonfigurator i 3D.
   Samma grundregler som 3D-planlösningen (../planlosning-3d/,
   docs/design/3d-planlosning-bar.md):
   · en easing för varje rörelse, inget studsar eller svävar
   · bilden ritas bara när något hänt, skuggkartan bara när något flyttats
   · ljus läggs in och tas ut ur scenen, aldrig nollställda
   · duken mäts i CSS-pixlar, DPR sätts först (fällan på retinaskärmar)
   Allt i uterummet räknas ur två tal, bredd och djup. Ytan i panelen
   är samma tal som byggde geometrin, aldrig en handskriven siffra.
   ============================================================ */

const KAMERA_MS = 900;
const INTRO_MS = 1200;
const OPPNA_MS = 1300;
const REDUCERAD = matchMedia('(prefers-reduced-motion: reduce)').matches;
/* Granskningsklocka: med ?frys i adressen står tiden still från start och
   stegas bara av __demo.tick(ms). Då blir varje filmremsa likadan. */
const FRYST = new URLSearchParams(location.search).has('frys');
let virtuellTid = 0;
const nuTid = () => (FRYST ? virtuellTid : performance.now());
const D2R = Math.PI / 180;
const dec = (v, n = 1) => v.toFixed(n).replace('.', ',');

/* ---------- valen ---------- */
const FARGER = [
  { id: 'vit', namn: 'Vit', hex: 0xefefec, css: '#efefec' },
  { id: 'gra', namn: 'Silvergrå', hex: 0xa7abaf, css: '#a7abaf' },
  { id: 'antracit', namn: 'Antracit', hex: 0x3a3e44, css: '#3a3e44' },
  { id: 'svart', namn: 'Svart', hex: 0x18191c, css: '#18191c' },
  { id: 'brun', namn: 'Brun', hex: 0x5c4231, css: '#5c4231' },
];
const TAK = { lamell: 'Lamelltak', glas: 'Glastak' };
const VAGG = { skjut: 'Skjutpartier', vik: 'Viksystem', oppen: 'Öppet utan glas' };
const VAGG_TEXT = {
  skjut: 'Glaspartierna glider åt sidan och staplas i ena änden.',
  vik: 'Glaspartierna viks ihop som ett dragspel och samlas mot hörnen.',
  oppen: 'Bara tak och stolpar. Välj glaspartier om rummet ska kunna stängas.',
};
const GLAS = { klart: 'Klart glas', tonat: 'Tonat glas' };
const RIKT_GRAD = { S: 0, V: 90, N: 180, O: -90 };
const RIKT_ORD = { S: 'söder', V: 'väster', N: 'norr', O: 'öster' };

const S = { b: 5, d: 3.5, tak: 'lamell', vagg: 'skjut', farg: 'antracit', glas: 'klart',
  led: true, nat: false, rikt: 'S', tid: 15, lamell: 0.6 };

/* Delad länk: hela designen ligger i adressens #-del. */
function lasHash() {
  const p = new URLSearchParams(location.hash.slice(1));
  const tal = (k, min, max, steg) => {
    const v = parseFloat(p.get(k));
    if (!Number.isFinite(v)) return;
    S[k] = Math.min(max, Math.max(min, Math.round(v / steg) * steg));
  };
  const ur = (k, lista) => { const v = p.get(k); if (v && v in lista) S[k] = v; };
  tal('b', 3, 7, 0.5); tal('d', 2, 4.5, 0.5); tal('tid', 5, 23, 0.25);
  ur('tak', TAK); ur('vagg', VAGG); ur('glas', GLAS); ur('rikt', RIKT_GRAD);
  const f = p.get('farg'); if (FARGER.some((x) => x.id === f)) S.farg = f;
  if (p.has('led')) S.led = p.get('led') === '1';
  if (p.has('nat')) S.nat = p.get('nat') === '1';
  const l = parseFloat(p.get('lamell')); if (Number.isFinite(l)) S.lamell = Math.min(1, Math.max(0, l / 100));
}
let hashTimer = 0;
function skrivHash() {
  clearTimeout(hashTimer);
  hashTimer = setTimeout(() => {
    const p = new URLSearchParams({ b: S.b, d: S.d, tak: S.tak, vagg: S.vagg, farg: S.farg, glas: S.glas,
      led: S.led ? 1 : 0, nat: S.nat ? 1 : 0, rikt: S.rikt, tid: S.tid, lamell: Math.round(S.lamell * 100) });
    history.replaceState(null, '', '#' + p.toString());
  }, 250);
}
lasHash();

/* ---------- scen ---------- */
const scenEl = document.getElementById('scen');
const scen = new THREE.Scene();
const renderare = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
renderare.setClearColor(0x000000, 0);          // himlen är sidans egen CSS-toning
renderare.shadowMap.enabled = true;
renderare.shadowMap.type = THREE.PCFShadowMap;
renderare.shadowMap.autoUpdate = false;        // byggs om bara när något flyttats
renderare.toneMapping = THREE.ACESFilmicToneMapping;
renderare.toneMappingExposure = 1.0;
scenEl.appendChild(renderare.domElement);

/* Reflektionerna i glas och aluminium kommer ur en rumsmiljö som räknas
   fram lokalt. Alltfix nuvarande konfigurator hämtar sin från en extern
   GitHub-adress — faller den bort blir deras fönster matta. */
const pmrem = new THREE.PMREMGenerator(renderare);
scen.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
scen.environmentIntensity = 0.55;
scen.fog = new THREE.Fog(0xe3e8ea, 28, 75);

const kamera = new THREE.PerspectiveCamera(40, 1, 0.05, 220);
const kontroller = new OrbitControls(kamera, renderare.domElement);
kontroller.enableDamping = true;
kontroller.dampingFactor = 0.08;
kontroller.enablePan = false;

/* ---------- material ---------- */
const M = {
  fasad: new THREE.MeshStandardMaterial({ color: 0xe8e5de, roughness: 0.86 }),
  sockel: new THREE.MeshStandardMaterial({ color: 0x6b6966, roughness: 0.92 }),
  tak: new THREE.MeshStandardMaterial({ color: 0x3b3e43, roughness: 0.78 }),
  vitt: new THREE.MeshStandardMaterial({ color: 0xf3f2ee, roughness: 0.55 }),
  fonsterGlas: new THREE.MeshStandardMaterial({ color: 0x27303a, roughness: 0.06, metalness: 0.35, emissive: 0x000000 }),
  dack: new THREE.MeshStandardMaterial({ color: 0x9b7a55, roughness: 0.74 }),
  gras: new THREE.MeshStandardMaterial({ color: 0x587d40, roughness: 1.0 }),
  sten: new THREE.MeshStandardMaterial({ color: 0xb0aba2, roughness: 0.9 }),
  hack: new THREE.MeshStandardMaterial({ color: 0x4d7040, roughness: 1.0 }),
  krona: new THREE.MeshStandardMaterial({ color: 0x4f7438, roughness: 1.0 }),
  stam: new THREE.MeshStandardMaterial({ color: 0x5a4634, roughness: 1.0 }),
  profil: new THREE.MeshStandardMaterial({ color: 0x3a3e44, roughness: 0.36, metalness: 0.55 }),
  glas: new THREE.MeshStandardMaterial({ color: 0x86a3ab, roughness: 0.04, metalness: 0.0,
    transparent: true, opacity: 0.2, depthWrite: false, side: THREE.DoubleSide, envMapIntensity: 1.8 }),
  nat: new THREE.MeshStandardMaterial({ color: 0x2a2d31, roughness: 1.0, transparent: true, opacity: 0.34,
    depthWrite: false, side: THREE.DoubleSide }),
  tyg: new THREE.MeshStandardMaterial({ color: 0xd9d3c7, roughness: 1.0 }),
  tyg2: new THREE.MeshStandardMaterial({ color: 0x8e8474, roughness: 1.0 }),
  matta: new THREE.MeshStandardMaterial({ color: 0xcdc3b1, roughness: 1.0 }),
  tra: new THREE.MeshStandardMaterial({ color: 0xa0764a, roughness: 0.6 }),
  kruka: new THREE.MeshStandardMaterial({ color: 0xe6e1d8, roughness: 0.7 }),
  blad: new THREE.MeshStandardMaterial({ color: 0x46683a, roughness: 1.0 }),
  led: new THREE.MeshStandardMaterial({ color: 0xf2efe8, roughness: 0.4, emissive: 0x000000 }),
  matt: new THREE.MeshBasicMaterial({ color: 0x1c1c30 }),
};

/* ---------- ytstruktur ur världskoordinaten ----------
   Samma teknik som planlösningen: ETT program för alla strukturerade ytor,
   typen skickas som uniform. Fasadpanelen följer väggens riktning via
   världsnormalen, så gavlarna får stående panel även de. */
const TYPER = { panel: 1, dack: 2, gras: 3, sten: 4, matta: 5, takpanna: 6 };
const STRUKTUR_GLSL = `
  float m = 1.0;
  if (uTyp == 1) {
    if (abs(vNormW.y) < 0.5) {
      float u = abs(vNormW.x) > 0.5 ? vVarld.z : vVarld.x;
      float p = u / 0.172;
      float kant = abs(fract(p) - 0.5) * 2.0;
      m *= 1.0 - 0.26 * smoothstep(0.86, 1.0, kant);
      m *= 0.965 + 0.05 * fract(sin(floor(p) * 12.9898) * 43758.5453);
    }
  } else if (uTyp == 2) {
    float p = vVarld.z / 0.145;
    float kant = abs(fract(p) - 0.5) * 2.0;
    m *= 1.0 - 0.5 * smoothstep(0.88, 1.0, kant);
    m *= 0.9 + 0.16 * fract(sin(floor(p) * 12.9898) * 43758.5453);
    m *= 0.97 + 0.03 * sin(vVarld.x * 23.0 + floor(p) * 3.1);
  } else if (uTyp == 3) {
    m *= 0.95 + 0.07 * fract(sin(dot(floor(vVarld.xz * 5.0), vec2(12.9898, 78.233))) * 43758.5453);
    m *= 0.95 + 0.08 * (0.5 + 0.5 * sin(vVarld.x * 0.9) * sin(vVarld.z * 0.7));
  } else if (uTyp == 4) {
    vec2 k = vVarld.xz * 2.0;
    vec2 e = abs(fract(k) - 0.5) * 2.0;
    m *= 1.0 - 0.18 * smoothstep(0.86, 1.0, max(e.x, e.y));
    m *= 0.92 + 0.14 * fract(sin(dot(floor(k), vec2(39.3468, 11.135))) * 24634.6345);
  } else if (uTyp == 5) {
    m *= 0.93 + 0.12 * fract(sin(dot(floor(vVarld.xz * 80.0), vec2(12.9898, 78.233))) * 43758.5453);
  } else if (uTyp == 6) {
    float r = abs(fract(vVarld.y * 3.1) - 0.5) * 2.0;
    m *= 1.0 - 0.3 * smoothstep(0.78, 1.0, r);
    m *= 0.95 + 0.07 * fract(sin(floor(vVarld.x * 3.3) * 12.9898 + floor(vVarld.y * 3.1)) * 43758.5453);
  }
  diffuseColor.rgb *= m;
`;
function strukturera(mat, typ) {
  mat.userData.struktur = typ;
  mat.customProgramCacheKey = () => 'struktur';
  mat.onBeforeCompile = (sh) => {
    sh.uniforms.uTyp = { value: TYPER[typ] };
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vVarld;\nvarying vec3 vNormW;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\n  vVarld = (modelMatrix * vec4(transformed, 1.0)).xyz;\n  vNormW = normalize(mat3(modelMatrix) * objectNormal);');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vVarld;\nvarying vec3 vNormW;\nuniform int uTyp;')
      .replace('#include <map_fragment>', '#include <map_fragment>\n{\n' + STRUKTUR_GLSL + '\n}');
  };
}
for (const [k, t] of [['fasad', 'panel'], ['dack', 'dack'], ['gras', 'gras'], ['sten', 'sten'], ['matta', 'matta'], ['tak', 'takpanna']]) strukturera(M[k], t);

/* ---------- geometri ---------- */
const BOX = new THREE.BoxGeometry(1, 1, 1);
const CYL = new THREE.CylinderGeometry(1, 1, 1, 18);
const IKOS = new THREE.IcosahedronGeometry(1, 3);
function box(m, w, h, d, x, y, z, skugga = true) {
  const o = new THREE.Mesh(BOX, m);
  o.scale.set(w, h, d); o.position.set(x, y, z);
  o.castShadow = skugga; o.receiveShadow = true;
  return o;
}

/* ---------- huset (står still) ----------
   En enplansvilla med stående panel och sadeltak. Uterummet byggs mot
   långsidan, som ligger i z = 0 och vetter ut mot trädgården (+z). */
const HUS_B = 14;
const hus = new THREE.Group();
{
  const profil = new THREE.Shape();
  profil.moveTo(0, 0); profil.lineTo(0, 3.1); profil.lineTo(4, 5.25); profil.lineTo(8, 3.1); profil.lineTo(8, 0); profil.closePath();
  const kropp = new THREE.Mesh(new THREE.ExtrudeGeometry(profil, { depth: HUS_B, bevelEnabled: false }), M.fasad);
  kropp.rotation.y = Math.PI / 2;           // formens x blir världens -z, extruderingen blir x
  kropp.position.x = -HUS_B / 2;
  kropp.castShadow = true; kropp.receiveShadow = true;
  hus.add(kropp);
  hus.add(box(M.sockel, HUS_B + 0.04, 0.42, 8.04, 0, 0.21, -4));
  // takfall med utsprång
  const dz = 4.55, dy = 2.28, L = Math.hypot(dz, dy), a = Math.atan2(dy, dz);
  const fram = box(M.tak, HUS_B + 0.8, 0.16, L, 0, (3.0 + 5.28) / 2 + 0.08, (0.55 - 4) / 2);
  fram.rotation.x = a; hus.add(fram);
  const bak = box(M.tak, HUS_B + 0.8, 0.16, L, 0, (3.0 + 5.28) / 2 + 0.08, -4 - (0.55 + 4) / 2 + 4 - 4 + 0);
  bak.position.z = -4 - (4 + 0.55) / 2 + 0; bak.rotation.x = -a; hus.add(bak);
  hus.add(box(M.tak, HUS_B + 0.8, 0.12, 0.3, 0, 5.36, -4));
  hus.add(box(M.vitt, HUS_B + 0.8, 0.22, 0.04, 0, 3.0, 0.57));     // vindskiva
  hus.add(box(M.sockel, HUS_B + 0.8, 0.1, 0.12, 0, 2.86, 0.6));    // hängränna
  // fönster och altandörr i långsidan
  const fonster = (x, y0, w, h, delad = true) => {
    hus.add(box(M.vitt, w, h, 0.07, x, y0 + h / 2, 0.035, false));
    const g = box(M.fonsterGlas, w - 0.14, h - 0.14, 0.02, x, y0 + h / 2, 0.075, false);
    g.userData.fonster = true; hus.add(g);
    if (delad) hus.add(box(M.vitt, 0.05, h - 0.14, 0.03, x, y0 + h / 2, 0.085, false));
  };
  fonster(-5.4, 1.05, 1.4, 1.3); fonster(5.4, 1.05, 1.4, 1.3);
  fonster(-2.25, 1.05, 1.1, 1.3); fonster(2.25, 1.05, 1.1, 1.3);
  fonster(0, 0.2, 1.5, 2.15);               // altandörren som leder ut i uterummet
}
scen.add(hus);

/* ---------- tomten (står still) ---------- */
const tomt = new THREE.Group();
{
  const mark = new THREE.Mesh(new THREE.PlaneGeometry(120, 120), M.gras);
  mark.rotation.x = -Math.PI / 2; mark.receiveShadow = true;
  tomt.add(mark);
  // häck längst bort, med hack så den inte läser som en vägg
  for (let x = -12; x < 12; x += 1.5) {
    const h = 1.15 + 0.12 * Math.sin(x * 2.3);
    tomt.add(box(M.hack, 1.52, h, 0.95, x + 0.75, h / 2, 12.8));
  }
  const trad = (x, z, s) => {
    const st = new THREE.Mesh(CYL, M.stam); st.scale.set(0.11 * s, 1.7 * s, 0.11 * s); st.position.set(x, 0.85 * s, z);
    st.castShadow = true; tomt.add(st);
    for (const [dx, dy, dz, r] of [[0, 2.45, 0, 1.05], [0.55, 2.15, 0.25, 0.8], [-0.45, 2.3, -0.3, 0.85], [0.1, 2.95, -0.1, 0.7]]) {
      const kr = new THREE.Mesh(IKOS, M.krona); kr.scale.setScalar(r * s); kr.position.set(x + dx * s, dy * s, z + dz * s);
      kr.castShadow = true; kr.receiveShadow = true; tomt.add(kr);
    }
  };
  trad(-7.8, 7.5, 1.0); trad(8.6, 9.2, 1.15); trad(-11, 2.5, 0.9);
}
scen.add(tomt);

/* ---------- uterummet (byggs om när måtten eller valen ändras) ---------- */
const Y0 = 0.18;           // altangolvets ovankant
const P = 0.09;            // stolpens sida
const rum = new THREE.Group();
scen.add(rum);
let sektioner = [];         // glaspartier som kan öppnas
let lamellMesh = null, lamellData = [];
let natGrupp = null, ledGrupp = null, natLista = [];
let mattPunkter = [];
let rumMatt = null;         // höjder och gränser, till inramningen

const ledLjus = [new THREE.PointLight(0xffcf94, 0, 0, 2), new THREE.PointLight(0xffcf94, 0, 0, 2)];
for (const l of ledLjus) l.castShadow = false;

function glasPanel(w, h) {
  const g = new THREE.Group();
  const glas = new THREE.Mesh(BOX, M.glas);
  glas.scale.set(w - 0.03, h - 0.06, 0.01); glas.position.set(0, h / 2, 0);
  glas.renderOrder = 2;
  g.add(glas);
  g.add(box(M.profil, 0.03, h, 0.034, -w / 2 + 0.015, h / 2, 0));
  g.add(box(M.profil, 0.03, h, 0.034, w / 2 - 0.015, h / 2, 0));
  g.add(box(M.profil, w, 0.045, 0.034, 0, 0.0225, 0));
  g.add(box(M.profil, w, 0.045, 0.034, 0, h - 0.0225, 0));
  return g;
}

/* En sektion är en rak vägg med ett eget koordinatsystem: lokal x längs
   väggen (u), lokal z ut från rummet (w). Då räknas skjut och vik likadant
   på fronten och på båda gavlarna. */
function sektion(forald, u0, u1, stack, hBot, hTop) {
  const L = u1 - u0;
  const hP = hTop - hBot;
  const s = { typ: S.vagg, paneler: [], u0, u1, stack, L };
  if (S.vagg === 'skjut') {
    const n = Math.max(2, Math.ceil(L / 1.15));
    const pw = L / n + 0.03;
    s.pw = pw;
    for (let i = 0; i < n; i++) {
      const p = glasPanel(pw, hP);
      const stegU = (L - pw) / (n - 1);
      const c = u0 + pw / 2 + i * stegU;
      const spar = stack === 'slut' ? (n - 1 - i) : i;      // panelen i staplingsänden står på yttersta spåret
      p.userData = { c, w: -spar * 0.04, slut: stack === 'slut' ? u1 - pw / 2 : u0 + pw / 2 };
      p.position.set(c, hBot, p.userData.w);
      forald.add(p); s.paneler.push(p);
    }
    const djup = n * 0.04;
    forald.add(box(M.profil, L, 0.03, djup, (u0 + u1) / 2, hBot - 0.015, -djup / 2 + 0.02));
    forald.add(box(M.profil, L, 0.04, djup, (u0 + u1) / 2, hTop + 0.02, -djup / 2 + 0.02));
  } else if (S.vagg === 'vik') {
    const n = Math.max(2, Math.ceil(L / 0.95));
    const pw = L / n;
    s.pw = pw;
    for (let i = 0; i < n; i++) {
      const p = glasPanel(pw - 0.01, hP);
      p.userData = { i };
      forald.add(p); s.paneler.push(p);
    }
    forald.add(box(M.profil, L, 0.03, 0.06, (u0 + u1) / 2, hBot - 0.015, 0));
    forald.add(box(M.profil, L, 0.04, 0.06, (u0 + u1) / 2, hTop + 0.02, 0));
  }
  // insektsnätet sitter innanför glaset och täcker hela öppningen
  const nat = new THREE.Mesh(BOX, M.nat);
  nat.scale.set(L, hP, 0.004); nat.position.set((u0 + u1) / 2, hBot + hP / 2, S.vagg === 'skjut' ? -Math.ceil(L / 1.15) * 0.04 - 0.03 : -0.06);
  nat.castShadow = false; nat.receiveShadow = false;
  nat.visible = S.nat;
  natLista.push(nat);
  forald.add(nat);
  sektioner.push(s);
}

/* Öppningsgraden s (0 stängt, 1 helt öppet) sätts direkt på panelerna. */
let oppen = 0, oppenMal = 0;
function tillampaOppen(v) {
  for (const s of sektioner) {
    if (s.typ === 'skjut') {
      for (const p of s.paneler) {
        const d = p.userData;
        p.position.x = d.c + (d.slut - d.c) * v;
      }
    } else if (s.typ === 'vik') {
      const th = v * 84 * D2R;
      const dir = s.stack === 'start' ? 1 : -1;
      const ankare = s.stack === 'start' ? s.u0 : s.u1;
      const pw = s.pw;
      for (const p of s.paneler) {
        const i = p.userData.i;
        const u = ankare + dir * (i + 0.5) * pw * Math.cos(th);
        const w = (pw * Math.sin(th)) / 2 + 0.02;
        const tecken = i % 2 === 0 ? 1 : -1;
        const phi = Math.atan2(tecken * Math.sin(th), dir * Math.cos(th));
        p.position.x = u; p.position.z = w;
        p.rotation.y = -phi + (dir < 0 ? Math.PI : 0);
      }
    }
  }
}

function tillampaLameller() {
  if (!lamellMesh) return;
  // framkanten uppåt: från trädgården ser man ner mellan lamellerna, inte bara deras ovansida
  const th = -S.lamell * 90 * D2R;
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), sk = new THREE.Vector3(), po = new THREE.Vector3();
  const ax = new THREE.Vector3(1, 0, 0);
  lamellData.forEach((d, i) => {
    q.setFromAxisAngle(ax, th);
    po.set(d.x, d.y, d.z); sk.set(d.len, 0.026, 0.215);
    m.compose(po, q, sk);
    lamellMesh.setMatrixAt(i, m);
  });
  lamellMesh.instanceMatrix.needsUpdate = true;
}

function byggRum() {
  rum.traverse((o) => { if (o.userData.egenGeo) o.geometry.dispose(); if (o.isInstancedMesh) o.dispose(); });
  rum.clear();
  sektioner = []; lamellMesh = null; lamellData = [];
  natGrupp = new THREE.Group(); ledGrupp = new THREE.Group(); natLista = [];
  const W = S.b, D = S.d;
  const glastak = S.tak === 'glas';
  const BH = glastak ? 0.16 : 0.24;
  const topBak = glastak ? Y0 + 2.62 : Y0 + 2.5;
  const topFram = glastak ? Y0 + 2.26 : Y0 + 2.5;
  rumMatt = { W, D, topBak, topFram };

  // altanen med ett trappsteg ut mot trädgården
  rum.add(box(M.dack, W + 0.8, Y0, D + 0.7, 0, Y0 / 2, (D + 0.7) / 2));
  rum.add(box(M.dack, 1.5, Y0 / 2, 0.38, 0.9, Y0 / 4, D + 0.7 + 0.19));
  // gångplattor ut i gräset
  for (let i = 0; i < 4; i++) rum.add(box(M.sten, 0.62, 0.04, 0.46, 0.9 + (i % 2 ? 0.12 : -0.08), 0.02, D + 1.45 + i * 0.78));

  // stolpar
  const stolpe = (x, z, h) => rum.add(box(M.profil, P, h, P, x, Y0 + h / 2, z));
  const frontH = topFram - Y0;
  const mitt = W > 4.5;
  stolpe(-W / 2 + P / 2, D - P / 2, frontH); stolpe(W / 2 - P / 2, D - P / 2, frontH);
  if (mitt) stolpe(0, D - P / 2, frontH);
  // väggprofiler mot huset
  rum.add(box(M.profil, P, topBak - Y0, 0.06, -W / 2 + P / 2, Y0 + (topBak - Y0) / 2, 0.03));
  rum.add(box(M.profil, P, topBak - Y0, 0.06, W / 2 - P / 2, Y0 + (topBak - Y0) / 2, 0.03));
  // frontbalk
  rum.add(box(M.profil, W, BH, 0.12, 0, topFram - BH / 2, D - 0.06));

  if (glastak) {
    const fall = topBak - topFram, L = Math.hypot(D, fall), a = Math.atan2(fall, D);
    const sparre = (x, bw, bh) => {
      const o = box(M.profil, bw, bh, L, x, (topBak + topFram) / 2 - bh / 2, D / 2);
      o.rotation.x = a; rum.add(o);
    };
    sparre(-W / 2 + P / 2, P, BH); sparre(W / 2 - P / 2, P, BH);
    const n = Math.max(2, Math.round(W / 0.95));
    for (let i = 1; i < n; i++) sparre(-W / 2 + (i * W) / n, 0.05, 0.09);
    rum.add(box(M.profil, W, 0.14, 0.08, 0, topBak - 0.07, 0.04));        // väggbalk
    const tak = new THREE.Mesh(BOX, M.glas);
    tak.scale.set(W - 0.02, 0.012, L); tak.rotation.x = a;
    tak.position.set(0, (topBak + topFram) / 2 + 0.006, D / 2); tak.renderOrder = 2;
    rum.add(tak);
    rum.add(box(M.profil, W + 0.08, 0.09, 0.12, 0, topFram - 0.02, D + 0.05)); // ränna
  } else {
    rum.add(box(M.profil, W, BH, 0.12, 0, topBak - BH / 2, 0.06));              // väggbalk
    rum.add(box(M.profil, 0.12, BH, D, -W / 2 + 0.06, topBak - BH / 2, D / 2));
    rum.add(box(M.profil, 0.12, BH, D, W / 2 - 0.06, topBak - BH / 2, D / 2));
    if (mitt) rum.add(box(M.profil, 0.12, BH, D, 0, topBak - BH / 2, D / 2));
    // lamellerna: en instansmesh, ett ritanrop för alla
    const spann = mitt ? [[-W / 2 + 0.12, -0.06], [0.06, W / 2 - 0.12]] : [[-W / 2 + 0.12, W / 2 - 0.12]];
    const antal = Math.floor((D - 0.24) / 0.2);
    const z0 = 0.12 + ((D - 0.24) - (antal - 1) * 0.2) / 2;
    for (const [a0, a1] of spann) for (let i = 0; i < antal; i++)
      lamellData.push({ x: (a0 + a1) / 2, y: topBak - BH / 2, z: z0 + i * 0.2, len: a1 - a0 - 0.01 });
    lamellMesh = new THREE.InstancedMesh(BOX, M.profil, lamellData.length);
    lamellMesh.castShadow = true; lamellMesh.receiveShadow = true;
    rum.add(lamellMesh);
    tillampaLameller();
  }

  // glaspartier: front och båda gavlarna
  const hBot = Y0 + 0.03;
  const hTop = topFram - BH - 0.03;
  if (S.vagg !== 'oppen' || S.nat) {
    const front = new THREE.Group(); front.position.set(-W / 2, 0, D - 0.07); rum.add(front);
    const hoger = new THREE.Group(); hoger.position.set(W / 2 - 0.07, 0, D); hoger.rotation.y = Math.PI / 2; rum.add(hoger);
    const vanster = new THREE.Group(); vanster.position.set(-W / 2 + 0.07, 0, 0); vanster.rotation.y = -Math.PI / 2; rum.add(vanster);
    if (mitt) { sektion(front, P, W / 2 - P / 2, 'start', hBot, hTop); sektion(front, W / 2 + P / 2, W - P, 'slut', hBot, hTop); }
    else sektion(front, P, W - P, 'slut', hBot, hTop);
    sektion(hoger, P, D - 0.06, 'slut', hBot, hTop);
    sektion(vanster, 0.06, D - P, 'start', hBot, hTop);
    if (S.vagg === 'oppen') for (const s of sektioner) s.paneler.length = 0;
  }
  // gavelglaset ovanför partierna när taket lutar
  if (glastak && S.vagg !== 'oppen') {
    const f = new THREE.Shape();
    f.moveTo(0, hTop + 0.04); f.lineTo(D, hTop + 0.04); f.lineTo(0, topBak - BH - 0.01); f.closePath();
    const geo = new THREE.ShapeGeometry(f);
    for (const x of [-W / 2 + 0.07, W / 2 - 0.07]) {
      const g = new THREE.Mesh(geo, M.glas);
      g.rotation.y = -Math.PI / 2; g.position.x = x; g.renderOrder = 2;
      g.userData.egenGeo = x > 0;
      rum.add(g);
    }
  }
  natGrupp.visible = S.nat;
  rum.add(natGrupp);

  // LED-spotar i takprofilerna
  const ledY = topFram - BH - 0.006;
  for (let x = -W / 2 + 0.5; x <= W / 2 - 0.45; x += 0.9) ledGrupp.add(box(M.led, 0.07, 0.012, 0.07, x, ledY, D - 0.1, false));
  const bakY = glastak ? topBak - 0.145 : topBak - BH - 0.006;
  for (let x = -W / 2 + 0.5; x <= W / 2 - 0.45; x += 0.9) ledGrupp.add(box(M.led, 0.07, 0.012, 0.07, x, bakY, 0.16, false));
  ledGrupp.visible = S.led;
  rum.add(ledGrupp);
  ledLjus[0].position.set(-W / 4, ledY - 0.25, D * 0.55);
  ledLjus[1].position.set(W / 4, ledY - 0.25, D * 0.55);

  // möblering: soffa mot husväggen, bord, matta, två krukväxter
  const sw = Math.min(2.2, W - 1.6);
  const sx = W > 4 ? -(W / 2 - 0.55 - sw / 2) : 0;
  rum.add(box(M.matta, Math.min(W - 1.2, 2.6), 0.012, Math.min(D - 1.0, 1.9), sx * 0.4, Y0 + 0.006, D * 0.52, false));
  rum.add(box(M.tyg, sw, 0.36, 0.84, sx, Y0 + 0.18, 0.62));
  rum.add(box(M.tyg, sw, 0.46, 0.18, sx, Y0 + 0.36 + 0.2, 0.29));
  rum.add(box(M.tyg, 0.16, 0.24, 0.84, sx - sw / 2 + 0.08, Y0 + 0.48, 0.62));
  rum.add(box(M.tyg, 0.16, 0.24, 0.84, sx + sw / 2 - 0.08, Y0 + 0.48, 0.62));
  const dyna = (sw - 0.36) / 2;
  rum.add(box(M.tyg2, dyna - 0.02, 0.1, 0.62, sx - dyna / 2 - 0.01, Y0 + 0.41, 0.7));
  rum.add(box(M.tyg2, dyna - 0.02, 0.1, 0.62, sx + dyna / 2 + 0.01, Y0 + 0.41, 0.7));
  const bordZ = D >= 3 ? 1.75 : 1.45;
  rum.add(box(M.tra, 0.9, 0.05, 0.52, sx, Y0 + 0.38, bordZ));
  rum.add(box(M.tra, 0.8, 0.33, 0.42, sx, Y0 + 0.19, bordZ));
  const vaxt = (x, z) => {
    const k = new THREE.Mesh(CYL, M.kruka); k.scale.set(0.19, 0.44, 0.19); k.position.set(x, Y0 + 0.22, z);
    k.castShadow = true; k.receiveShadow = true; rum.add(k);
    const b = new THREE.Mesh(IKOS, M.blad); b.scale.set(0.36, 0.46, 0.36); b.position.set(x, Y0 + 0.44 + 0.36, z);
    b.castShadow = true; rum.add(b);
  };
  vaxt(W / 2 - 0.45, D - 0.45);
  if (W >= 4) vaxt(-W / 2 + 0.45, D - 0.45);

  // måttlinjer på rummets egna kanter, på altanens golv, och höjden vid hörnstolpen
  const mY = Y0 + 0.006, ut = 0.17, H = topFram - Y0;
  const zF = D + ut, xS = W / 2 + ut;
  const mattGrupp = new THREE.Group();
  const linje = (w, h, d, x, y, z) => mattGrupp.add(box(M.matt, w, h, d, x, y, z, false));
  const T = 0.035, L = 0.26;   // linjens tjocklek och ändmarkeringens längd: syns i dagsljus mot trädäcket
  const xH = -W / 2 - ut;
  linje(W, 0.008, T, 0, mY, zF); linje(T, 0.008, L, -W / 2, mY, zF); linje(T, 0.008, L, W / 2, mY, zF);
  linje(T, 0.008, D, xS, mY, D / 2); linje(L, 0.008, T, xS, mY, 0); linje(L, 0.008, T, xS, mY, D);
  linje(T, H, T, xH, Y0 + H / 2, zF); linje(L, T, T, xH, topFram, zF); linje(L, T, T, xH, Y0 + T / 2, zF);
  for (const o of mattGrupp.children) o.receiveShadow = false;
  mattGrupp.name = 'matt';
  mattGrupp.visible = vy !== 'inne';
  rum.add(mattGrupp);
  mattPunkter = [new THREE.Vector3(-W * 0.15, mY, zF + 0.32), new THREE.Vector3(xS + 0.32, mY, D * 0.5), new THREE.Vector3(xH - 0.3, Y0 + H * 0.5, zF)];
  mattEl[0].textContent = `${dec(W)} m`;
  mattEl[1].textContent = `${dec(D)} m`;
  mattEl[2].textContent = `${dec(H)} m`;

  tillampaOppen(oppen);
  if (ljusNatt && S.led) rum.add(...ledLjus);
  uppdateraSkuggor();
}

/* ---------- ljus och sol ---------- */
const himmel = new THREE.HemisphereLight(0xdfe9f3, 0x5b5245, 0.9);
const sol = new THREE.DirectionalLight(0xfff1dc, 3.0);
sol.castShadow = true;
sol.shadow.mapSize.set(2048, 2048);
sol.shadow.camera.left = -12; sol.shadow.camera.right = 12;
sol.shadow.camera.top = 12; sol.shadow.camera.bottom = -12;
sol.shadow.camera.near = 1; sol.shadow.camera.far = 70;
sol.shadow.bias = -0.0006; sol.shadow.normalBias = 0.025;
sol.target.position.set(0, 0, 2);
scen.add(himmel, sol, sol.target);

const HIMMEL = {
  dag: { topp: new THREE.Color('#b8cbd9'), hor: new THREE.Color('#e4e9ec') },
  skym: { topp: new THREE.Color('#6d7ea3'), hor: new THREE.Color('#efc9a4') },
  natt: { topp: new THREE.Color('#0b0f1f'), hor: new THREE.Color('#1c2336') },
};
const _t = new THREE.Color(), _h = new THREE.Color();
let ljusNatt = false;
let solInfo = { alt: 0, rel: 0 };

function solLage() {
  const lat = 59.33 * D2R, dekl = 21 * D2R;
  const H = (S.tid - 13.2) * 15 * D2R;          // sommartid: soltiden ligger ca 1 h 10 min efter
  const sinAlt = Math.sin(lat) * Math.sin(dekl) + Math.cos(lat) * Math.cos(dekl) * Math.cos(H);
  const alt = Math.asin(sinAlt);
  const az = Math.atan2(Math.sin(H), Math.cos(H) * Math.sin(lat) - Math.tan(dekl) * Math.cos(lat));
  const rel = az - RIKT_GRAD[S.rikt] * D2R;     // vinkeln mellan solen och uterummets front
  return { alt, sinAlt, az, rel };
}
const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

function sattSol() {
  const { alt, sinAlt, rel } = solLage();
  solInfo = { alt, rel };
  const dag = smooth(-0.07, 0.16, sinAlt);
  const hog = smooth(0.0, 0.4, sinAlt);
  const dir = new THREE.Vector3(-Math.sin(rel) * Math.cos(alt), Math.max(0.02, Math.sin(alt)), Math.cos(rel) * Math.cos(alt)).normalize();
  sol.position.copy(sol.target.position).addScaledVector(dir, 34);
  sol.intensity = 3.1 * smooth(-0.02, 0.12, sinAlt);
  sol.color.set(0xffb070).lerp(new THREE.Color(0xfff2de), hog);
  himmel.intensity = 0.12 + 0.8 * dag;
  scen.environmentIntensity = 0.1 + 0.45 * dag;
  // himmelns två färger: natt -> skymning -> dag
  const a = Math.min(1, dag * 2), b = Math.max(0, dag * 2 - 1);
  _t.copy(HIMMEL.natt.topp).lerp(HIMMEL.skym.topp, a).lerp(HIMMEL.dag.topp, b);
  _h.copy(HIMMEL.natt.hor).lerp(HIMMEL.skym.hor, a).lerp(HIMMEL.dag.hor, b);
  document.documentElement.style.setProperty('--himmel-topp', '#' + _t.getHexString());
  document.documentElement.style.setProperty('--himmel-horisont', '#' + _h.getHexString());
  scen.fog.color.copy(_h);
  sattNatt(sinAlt < 0.035);
  const tim = Math.floor(S.tid), min = Math.round((S.tid - tim) * 60);
  utTid.textContent = `${String(tim).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
  skrivSolrad();
  uppdateraSkuggor();
}

/* Lampor tänds i skymningen. Ljusen läggs in och tas ut ur scenen:
   ett ljus med intensitet 0 kompileras ändå in och räknas per pixel. */
function sattNatt(natt) {
  ljusNatt = natt;
  const lysa = natt && S.led;
  for (const l of ledLjus) { if (l.parent) l.parent.remove(l); l.intensity = 7; }
  if (lysa) rum.add(...ledLjus);
  M.led.emissive.set(lysa ? 0xffe2b0 : 0x000000);
  M.led.emissiveIntensity = lysa ? 3 : 0;
  M.fonsterGlas.emissive.set(natt ? 0xffc27a : 0x000000);
  M.fonsterGlas.emissiveIntensity = natt ? 0.55 : 0;
  ritaNu();
}

function skrivSolrad() {
  const { alt, rel } = solInfo;
  const r = Math.abs(((rel / D2R + 540) % 360) - 180);    // 0 = rakt framifrån, 180 = bakom huset
  let t;
  if (alt < 0.01) {
    t = S.led ? 'Solen har gått ner. LED-spotarna lyser upp rummet.' : 'Solen har gått ner. Med LED-belysning kan rummet användas hela kvällen.';
  } else if (r < 60) {
    t = 'Solen lyser rakt in genom fronten. '
      + (S.tak === 'lamell' ? 'Vinkla lamellerna för skugga.' : S.glas === 'tonat' ? 'Det tonade glaset dämpar solen.' : 'Tonat glas eller lamelltak ger skugga.');
  } else if (r < 115) {
    t = 'Solen faller in från sidan, genom gavelns glas.';
  } else {
    t = 'Solen står bakom huset. Uterummet ligger i skugga.';
  }
  solrad.textContent = t;
}

/* Ett reglage skickar flera input per bildruta på en snabb skärm. Rummet byggs
   om högst en gång per bildruta, i slingan. */
let byggKo = false;
const byggINastaRuta = () => { byggKo = true; ritaNu(); };

/* ---------- rita bara när något hänt ---------- */
let behovRitas = true;
const ritaNu = () => { behovRitas = true; };
function uppdateraSkuggor() { renderare.shadowMap.needsUpdate = true; behovRitas = true; }

/* ---------- rörelse: en easing, inget studsar ---------- */
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const animationer = new Set();
function animera(ms, steg, klar) {
  if (REDUCERAD || ms <= 0) { steg(1); if (klar) klar(); ritaNu(); return; }
  const a = { t0: nuTid(), ms, steg, klar };
  animationer.add(a); ritaNu();
}

let tween = null;
const _blick = new THREE.Vector3();
function flytta(pos, mal, ms = KAMERA_MS, klar = null, fov = kamera.fov) {
  if (REDUCERAD || ms <= 0) {
    /* En pågående åkning måste stoppas, annars drar den tillbaka kameran i
       nästa bildruta. Uppmätt: vybyte under introåkningen landade i fel vy. */
    tween = null;
    kamera.position.copy(pos); kontroller.target.copy(mal); kamera.fov = fov; kamera.updateProjectionMatrix();
    kamera.lookAt(mal); if (klar) klar(); ritaNu(); return;
  }
  /* Runda 1: kameran vreds med lookAt mot ett mål som låg 0,45 m framför den,
     så blicken svängde som snabbast i sista stunden och stannade tvärt, och
     vägen in gick genom soffan och husväggen. Nu vrids blicken jämnt mellan
     start- och slutriktningen, och en flytt in i eller ut ur rummet går i en
     båge genom den öppna fronten. */
  const q0 = kamera.quaternion.clone();
  /* Kamerakonventionen: blicken längs -z. Object3D.lookAt vänder ett vanligt
     objekts +z mot målet, alltså bakvänt för en kamera — runda 2 visade kameran
     vända bort från rummet mitt i åkningen. Matrix4.lookAt(öga, mål) ger rätt. */
  const q1 = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().lookAt(pos, mal, kamera.up));
  const inUt = (vy === 'inne') !== (vyFore === 'inne');
  /* In i eller ut ur rummet: kameran går in från sidan genom gavelns glas,
     och blicken hålls på rummets mitt hela vägen i stället för att vridas
     180 grader. Runda 2 visade husväggen i närbild halvvägs när blicken
     vreds fritt mellan utsikten och huset. */
  let pc = null, ls = null, lc = null, le = null;
  if (inUt && rumMatt) {
    const { W, D } = rumMatt;
    /* Två styrpunkter: kameran sjunker till ögonhöjd UTANFÖR gaveln och går
       sedan rakt in genom glaset. Runda 2: med en styrpunkt skar banan genom
       lamelltakets kant. */
    const inAt = vy === 'inne';
    const yttre = new THREE.Vector3(W / 2 + 3.0, Y0 + 1.5, D * 0.75);
    const inre = new THREE.Vector3(W / 2 + 0.9, Y0 + 1.45, D * 0.32);
    pc = inAt ? [yttre, inre] : [inre, yttre];
    lc = new THREE.Vector3(0, Y0 + 1.0, D * 0.5);
    const langt = (fr, ti) => fr.clone().add(ti.clone().sub(fr).normalize().multiplyScalar(Math.max(5, fr.distanceTo(ti))));
    ls = langt(kamera.position, kontroller.target);
    le = langt(pos, mal);
  }
  tween = { fp: kamera.position.clone(), fm: kontroller.target.clone(), tp: pos.clone(), tm: mal.clone(),
    q0, q1, pc, ls, lc, le, ff: kamera.fov, tf: fov, t0: nuTid(), ms, klar };
  kontroller.enabled = false;
  ritaNu();
}

/* ---------- vyer och inramning ---------- */
let vy = 'ute', vyFore = 'ute';
function friYta() {
  const b = renderare.domElement.clientWidth, h = renderare.domElement.clientHeight;
  if (innerWidth > 860) return { x0: 20 + 372 + 44, x1: b - 48, y0: 104, y1: h - 124 };
  return { x0: 16, x1: b - 16, y0: 68, y1: h - 80 };
}
/* Hinder ovanpå den fria ytan som rummets kontur inte får röra. Solkortet låg
   först nere till höger och sedan uppe till höger; båda gångerna fick kameran
   backa tills rummet tog under halva bredden (runda 2 och 3). Solen ligger nu
   i panelen, så inget kort står över scenen. Kontrollen finns kvar för
   element med klassen .over-scen om något läggs dit igen. */
function hinder() {
  const c = renderare.domElement.getBoundingClientRect();
  return [...document.querySelectorAll('.over-scen')].map((el) => {
    const r = el.getBoundingClientRect(), m = 16;
    return { x0: r.left - c.left - m, y0: r.top - c.top - m, x1: r.right - c.left + m, y1: r.bottom - c.top + m };
  });
}
function konvexHolje(pts) {
  const p = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const kors = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const ned = [], upp = [];
  for (const q of p) { while (ned.length >= 2 && kors(ned[ned.length - 2], ned[ned.length - 1], q) <= 0) ned.pop(); ned.push(q); }
  for (let i = p.length - 1; i >= 0; i--) { const q = p[i]; while (upp.length >= 2 && kors(upp[upp.length - 2], upp[upp.length - 1], q) <= 0) upp.pop(); upp.push(q); }
  upp.pop(); ned.pop();
  return ned.concat(upp);
}
function korsarRuta(poly, r) {
  const inne = (x, y) => x > r.x0 && x < r.x1 && y > r.y0 && y < r.y1;
  if (poly.some(([x, y]) => inne(x, y))) return true;
  const iPoly = (x, y) => { for (let i = 0; i < poly.length; i++) { const a = poly[i], b = poly[(i + 1) % poly.length]; if ((b[0] - a[0]) * (y - a[1]) - (b[1] - a[1]) * (x - a[0]) < 0) return false; } return true; };
  for (const [x, y] of [[r.x0, r.y0], [r.x1, r.y0], [r.x0, r.y1], [r.x1, r.y1]]) if (iPoly(x, y)) return true;
  const sk = (a, b, c, d) => { const f = (p, q, r2) => (q[0] - p[0]) * (r2[1] - p[1]) - (q[1] - p[1]) * (r2[0] - p[0]); return f(a, b, c) * f(a, b, d) < 0 && f(c, d, a) * f(c, d, b) < 0; };
  const kanter = [[[r.x0, r.y0], [r.x1, r.y0]], [[r.x1, r.y0], [r.x1, r.y1]], [[r.x1, r.y1], [r.x0, r.y1]], [[r.x0, r.y1], [r.x0, r.y0]]];
  for (let i = 0; i < poly.length; i++) for (const [c, d] of kanter) if (sk(poly[i], poly[(i + 1) % poly.length], c, d)) return true;
  return false;
}
function rumHorn(extra = 0) {
  const { W, D, topBak } = rumMatt;
  const ut = [];
  for (const x of [-W / 2 - 0.45 - extra, W / 2 + 0.5 + extra]) for (const y of [0, topBak + 0.25]) for (const z of [-0.1, D + 1.15 + extra])
    ut.push(new THREE.Vector3(x, y, z));
  return ut;
}
let hinderNu = [];
function passaAvstand(mal, rikt, horn) {
  const y = friYta();
  hinderNu = hinder();
  const el = renderare.domElement;
  const b = el.clientWidth, h = el.clientHeight;
  const sp = kamera.position.clone(), sq = kamera.quaternion.clone();
  const ryms = (d) => {
    kamera.position.copy(mal).addScaledVector(rikt, d);
    kamera.lookAt(mal); kamera.updateMatrixWorld(true);
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    const pts = [];
    for (const p of horn) {
      const q = p.clone().project(kamera);
      const sx = (q.x * 0.5 + 0.5) * b, sy = (-q.y * 0.5 + 0.5) * h;
      pts.push([sx, sy]);
      x0 = Math.min(x0, sx); x1 = Math.max(x1, sx); y0 = Math.min(y0, sy); y1 = Math.max(y1, sy);
    }
    if (!(x0 >= y.x0 && x1 <= y.x1 && y0 >= y.y0 && y1 <= y.y1)) return false;
    const hk = konvexHolje(pts);
    return !hinderNu.some((r) => korsarRuta(hk, r));
  };
  let lo = 3, hi = 60;
  for (let i = 0; i < 22; i++) { const d = (lo + hi) / 2; if (ryms(d)) hi = d; else lo = d; }
  kamera.position.copy(sp); kamera.quaternion.copy(sq); kamera.updateMatrixWorld(true);
  return hi;
}
/* Målet flyttas så att rummet hamnar mitt i den FRIA ytan, inte mitt i
   duken. Första versionen räknade skiftet i ett enda steg och missade:
   uppmätt stod rummet mot högerkanten med 165 px tomt till vänster.
   Nu mäts rummets hörn på duken och målet justeras tills mitten stämmer. */
function projiceradLada(horn) {
  const el = renderare.domElement, b = el.clientWidth, h = el.clientHeight;
  let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
  for (const p of horn) {
    const q = p.clone().project(kamera);
    const sx = (q.x * 0.5 + 0.5) * b, sy = (-q.y * 0.5 + 0.5) * h;
    x0 = Math.min(x0, sx); x1 = Math.max(x1, sx); y0 = Math.min(y0, sy); y1 = Math.max(y1, sy);
  }
  return { x0, x1, y0, y1 };
}
function centreraI(mal0, rikt, horn) {
  const y = friYta();
  const h = renderare.domElement.clientHeight;
  const sp = kamera.position.clone(), sq = kamera.quaternion.clone();
  const mal = mal0.clone();
  let d = passaAvstand(mal, rikt, horn);
  const hoger = new THREE.Vector3(), upp = new THREE.Vector3();
  for (let k = 0; k < 5; k++) {
    kamera.position.copy(mal).addScaledVector(rikt, d); kamera.lookAt(mal); kamera.updateMatrixWorld(true);
    const l = projiceradLada(horn);
    const dx = (l.x0 + l.x1) / 2 - (y.x0 + y.x1) / 2, dy = (l.y0 + l.y1) / 2 - (y.y0 + y.y1) / 2;
    if (Math.abs(dx) < 1 && Math.abs(dy) < 1) break;
    const perPx = (2 * d * Math.tan((kamera.fov * D2R) / 2)) / h;
    hoger.setFromMatrixColumn(kamera.matrixWorld, 0); upp.setFromMatrixColumn(kamera.matrixWorld, 1);
    mal.addScaledVector(hoger, dx * perPx).addScaledVector(upp, -dy * perPx);
    d = passaAvstand(mal, rikt, horn);
  }
  kamera.position.copy(sp); kamera.quaternion.copy(sq); kamera.updateMatrixWorld(true);
  return { pos: mal.clone().addScaledVector(rikt, d), mal };
}
const VY_FOV = { ute: 40, ovan: 40, inne: 62 };
function vyLage(v) {
  const { W, D } = rumMatt;
  // inramningen räknas med den vyns egen bildvinkel, inte den som råkar gälla nu
  const spara = kamera.fov;
  kamera.fov = VY_FOV[v]; kamera.updateProjectionMatrix();
  let ut;
  if (v === 'ute') ut = centreraI(new THREE.Vector3(0.3, 1.25, D * 0.55), new THREE.Vector3(0.6, 0.52, 1).normalize(), rumHorn());
  else if (v === 'ovan') ut = centreraI(new THREE.Vector3(0.3, 0.2, D * 0.55 + 0.3), new THREE.Vector3(0.0001, 1, 0.3).normalize(), rumHorn(0.1));
  else {
    // från soffan, snett över rummet mot det främre hörnet, lite uppåt så taket syns
    // bredvid soffans gavel, inte ovanför den (runda 1: en vit soffkant i bildens hörn)
    const pos = new THREE.Vector3(-W / 2 + 0.42, Y0 + 1.35, Math.min(1.4, Math.max(1.12, D * 0.4)));
    const titta = new THREE.Vector3(W / 2 - 0.2, Y0 + 1.45, D + 0.5);
    ut = { pos, mal: pos.clone().addScaledVector(titta.sub(pos).normalize(), 0.45) };
  }
  kamera.fov = spara; kamera.updateProjectionMatrix();
  ut.fov = VY_FOV[v];
  return ut;
}
function kontrollLage(v) {
  if (v === 'inne') {
    kontroller.minDistance = 0.45; kontroller.maxDistance = 0.45;
    kontroller.enableZoom = false; kontroller.rotateSpeed = -0.35;
    kontroller.minPolarAngle = 0.22 * Math.PI; kontroller.maxPolarAngle = 0.78 * Math.PI;
  } else {
    kontroller.minDistance = 3; kontroller.maxDistance = 34;
    kontroller.enableZoom = true; kontroller.rotateSpeed = 0.9;
    kontroller.minPolarAngle = 0.03 * Math.PI; kontroller.maxPolarAngle = 0.485 * Math.PI;
  }
}
function sattVy(v, ms = KAMERA_MS) {
  vyFore = vy;
  vy = v;
  for (const b of document.querySelectorAll('[data-vy]')) b.setAttribute('aria-pressed', String(b.dataset.vy === v));
  const mg = rum.getObjectByName('matt'); if (mg) mg.visible = v !== 'inne';
  const { pos, mal, fov } = vyLage(v);
  flytta(pos, mal, ms, () => { kontrollLage(v); kontroller.enabled = true; }, fov);
}

/* ---------- storlek ---------- */
function passa() {
  const b = scenEl.clientWidth, h = scenEl.clientHeight;
  kamera.aspect = b / h; kamera.updateProjectionMatrix();
  renderare.setPixelRatio(Math.min(devicePixelRatio, 1.75));   // först, setPixelRatio kallar setSize
  renderare.setSize(b, h, false);
  canvasRekt = renderare.domElement.getBoundingClientRect();
  ritaNu();
}
let storlekTimer = 0;
addEventListener('resize', () => {
  passa();
  clearTimeout(storlekTimer);
  storlekTimer = setTimeout(() => { if (vy !== 'inne') { const l = vyLage(vy); flytta(l.pos, l.mal, 400, () => { kontrollLage(vy); kontroller.enabled = true; }, l.fov); } }, 180);
});

/* ---------- måttetiketter ---------- */
const etikettLager = document.getElementById('etiketter');
const mattEl = [0, 1, 2].map(() => { const e = document.createElement('div'); e.className = 'matt'; etikettLager.appendChild(e); return e; });
let canvasRekt = null;
const _p = new THREE.Vector3();
function placeraEtiketter() {
  const bw = renderare.domElement.clientWidth, bh = renderare.domElement.clientHeight;
  mattPunkter.forEach((p, i) => {
    const e = mattEl[i];
    _p.copy(p).project(kamera);
    const syns = vy !== 'inne' && _p.z < 1 && Math.abs(_p.x) < 1.05 && Math.abs(_p.y) < 1.05;
    e.style.opacity = syns ? '1' : '0';
    const x = (_p.x * 0.5 + 0.5) * bw;
    const y = (-_p.y * 0.5 + 0.5) * bh;
    e.style.transform = `translate3d(${Math.round(x - e.offsetWidth / 2)}px, ${Math.round(y - e.offsetHeight / 2)}px, 0)`;
  });
}

/* ---------- slingan ---------- */
function slinga() {
  requestAnimationFrame(slinga);
  stegRuta(true);
}
function stegRuta(bara = false) {
  const nu = nuTid();
  if (byggKo) { byggKo = false; byggRum(); }
  if (tween) {
    const t = Math.min(1, (nu - tween.t0) / tween.ms), e = ease(t);
    if (tween.pc) {
      const u = 1 - e, k0 = u * u * u, k1 = 3 * u * u * e, k2 = 3 * u * e * e, k3 = e * e * e;
      const [p1, p2] = tween.pc;
      kamera.position.set(
        k0 * tween.fp.x + k1 * p1.x + k2 * p2.x + k3 * tween.tp.x,
        k0 * tween.fp.y + k1 * p1.y + k2 * p2.y + k3 * tween.tp.y,
        k0 * tween.fp.z + k1 * p1.z + k2 * p2.z + k3 * tween.tp.z);
    } else kamera.position.lerpVectors(tween.fp, tween.tp, e);
    kontroller.target.lerpVectors(tween.fm, tween.tm, e);
    if (tween.ff !== tween.tf) { kamera.fov = tween.ff + (tween.tf - tween.ff) * e; kamera.updateProjectionMatrix(); }
    if (tween.pc) {
      const a = (1 - e) * (1 - e), bb = 2 * (1 - e) * e, c = e * e;
      _blick.set(
        a * tween.ls.x + bb * tween.lc.x + c * tween.le.x,
        a * tween.ls.y + bb * tween.lc.y + c * tween.le.y,
        a * tween.ls.z + bb * tween.lc.z + c * tween.le.z);
      kamera.lookAt(_blick);
    } else kamera.quaternion.slerpQuaternions(tween.q0, tween.q1, e);
    behovRitas = true;
    if (t >= 1) { const k = tween.klar; tween = null; if (k) k(); }
  }
  for (const a of animationer) {
    const t = Math.min(1, (nu - a.t0) / a.ms);
    a.steg(ease(t));
    behovRitas = true;
    if (t >= 1) { animationer.delete(a); if (a.klar) a.klar(); }
  }
  if (kontroller.enabled && kontroller.update()) behovRitas = true;
  if (bara && !behovRitas) return;
  behovRitas = false;
  renderare.render(scen, kamera);
  placeraEtiketter();
}

/* ============================================================
   Panelen
   ============================================================ */
const $ = (id) => document.getElementById(id);
const utTid = $('ut-tid'), solrad = $('solrad');

function fyll(inp) {
  const p = ((inp.value - inp.min) / (inp.max - inp.min)) * 100;
  inp.style.setProperty('--fyll', p + '%');
}
function sammanfattning(html = true) {
  const f = FARGER.find((x) => x.id === S.farg).namn;
  const till = [S.led && 'LED-belysning', S.nat && 'insektsnät'].filter(Boolean);
  const matt = `${dec(S.b)} × ${dec(S.d)} m`;
  const delar = [`${dec(S.b * S.d)} m²`, TAK[S.tak], VAGG[S.vagg], f, GLAS[S.glas]];
  if (till.length) delar.push(till.join(' och '));
  return html ? `<b>${matt}</b> · ${delar.join(' · ')}` : `${matt} · ${delar.join(' · ')}`;
}
function uppdateraText() {
  $('ut-bredd').textContent = `${dec(S.b)} m`;
  $('ut-djup').textContent = `${dec(S.d)} m`;
  $('ut-yta').textContent = `${dec(S.b * S.d)} m²`;
  $('sammanfattning').innerHTML = sammanfattning();
  $('ut-farg').textContent = FARGER.find((x) => x.id === S.farg).namn;
  $('vagg-text').textContent = VAGG_TEXT[S.vagg];
  $('ut-lamell').textContent = `${Math.round(S.lamell * 100)} %`;
  $('lamell-rad').hidden = S.tak !== 'lamell';
  const kn = $('oppna');
  kn.disabled = S.vagg === 'oppen';
  kn.querySelector('span').textContent = S.vagg === 'oppen' ? 'Inga glaspartier' : oppenMal > 0.5 ? 'Stäng partierna' : 'Öppna partierna';
  kn.setAttribute('aria-pressed', String(oppenMal > 0.5 && S.vagg !== 'oppen'));
  for (const g of document.querySelectorAll('[data-grupp]'))
    for (const b of g.querySelectorAll('[data-varde]')) b.setAttribute('aria-pressed', String(S[g.dataset.grupp] === b.dataset.varde));
  skrivSolrad();
  skrivHash();
}
function tillampaFarg() { M.profil.color.setHex(FARGER.find((x) => x.id === S.farg).hex); ritaNu(); }
function tillampaGlas() {
  if (S.glas === 'tonat') { M.glas.color.set(0x55605f); M.glas.opacity = 0.44; }
  else { M.glas.color.set(0x86a3ab); M.glas.opacity = 0.2; }
  ritaNu();
}

// färgrutor
const fargRad = document.querySelector('[data-grupp="farg"]');
for (const f of FARGER) {
  const b = document.createElement('button');
  b.type = 'button'; b.className = 'farg'; b.dataset.varde = f.id;
  b.setAttribute('aria-label', f.namn); b.title = f.namn;
  b.innerHTML = `<span style="background:${f.css}"></span>`;
  fargRad.appendChild(b);
}

document.addEventListener('click', (e) => {
  const knapp = e.target.closest('[data-varde]');
  if (knapp) {
    const grupp = knapp.closest('[data-grupp]').dataset.grupp;
    const v = knapp.dataset.varde;
    if (S[grupp] === v) return;
    S[grupp] = v;
    if (grupp === 'tak' || grupp === 'vagg') {
      if (grupp === 'vagg') { oppen = 0; oppenMal = 0; }
      byggRum();
      if (vy !== 'inne') sattVy(vy, 600);
      sattSol();
    }
    if (grupp === 'farg') tillampaFarg();
    if (grupp === 'glas') tillampaGlas();
    if (grupp === 'rikt') sattSol();
    uppdateraText();
    return;
  }
  const vk = e.target.closest('[data-vy]');
  if (vk && vk.dataset.vy !== vy) sattVy(vk.dataset.vy);
});

for (const id of ['bredd', 'djup']) {
  const inp = $(id);
  inp.value = id === 'bredd' ? S.b : S.d;
  fyll(inp);
  inp.addEventListener('input', () => {
    S[id === 'bredd' ? 'b' : 'd'] = +inp.value;
    fyll(inp);
    byggINastaRuta(); uppdateraText();
  });
  inp.addEventListener('change', () => {
    // Rummet måste ha sina nya mått innan omramningen räknas (runda 3: ramen
    // räknades på det gamla rummet medan ombygget väntade på nästa bildruta).
    if (byggKo) { byggKo = false; byggRum(); }
    if (vy !== 'inne') sattVy(vy, 800); else sattVy('inne', 600);
  });
}
const lamellInp = $('lamell');
lamellInp.value = Math.round(S.lamell * 100); fyll(lamellInp);
lamellInp.addEventListener('input', () => {
  S.lamell = +lamellInp.value / 100; fyll(lamellInp);
  tillampaLameller(); uppdateraSkuggor(); uppdateraText();
});
const tidInp = $('tid');
tidInp.value = S.tid; fyll(tidInp);
tidInp.addEventListener('input', () => { S.tid = +tidInp.value; fyll(tidInp); sattSol(); skrivHash(); });

$('led').checked = S.led;
$('led').addEventListener('change', (e) => { S.led = e.target.checked; ledGrupp.visible = S.led; sattNatt(ljusNatt); uppdateraText(); });
$('nat').checked = S.nat;
$('nat').addEventListener('change', (e) => {
  S.nat = e.target.checked;
  if (S.vagg === 'oppen') byggRum(); else for (const n of natLista) n.visible = S.nat;
  ritaNu(); uppdateraText();
});

$('oppna').addEventListener('click', () => {
  if (S.vagg === 'oppen') return;
  const fran = oppen;
  oppenMal = oppenMal > 0.5 ? 0 : 1;
  const till = oppenMal;
  animera(OPPNA_MS * Math.abs(till - fran), (e) => {
    oppen = fran + (till - fran) * e;
    tillampaOppen(oppen);
    renderare.shadowMap.needsUpdate = true;
  });
  uppdateraText();
});

/* ---------- dela ---------- */
const toast = $('toast');
let toastTimer = 0;
function visaToast(t) {
  toast.textContent = t; toast.classList.add('syns');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('syns'), 2600);
}
$('dela').addEventListener('click', async () => {
  clearTimeout(hashTimer);
  const p = new URLSearchParams({ b: S.b, d: S.d, tak: S.tak, vagg: S.vagg, farg: S.farg, glas: S.glas,
    led: S.led ? 1 : 0, nat: S.nat ? 1 : 0, rikt: S.rikt, tid: S.tid, lamell: Math.round(S.lamell * 100) });
  history.replaceState(null, '', '#' + p.toString());
  try { await navigator.clipboard.writeText(location.href); visaToast('Länken till din design är kopierad'); }
  catch { visaToast('Kopiera länken i adressfältet, den innehåller din design'); }
});

/* ---------- boka hembesök ----------
   Förfrågan skickas med Web3Forms och demonyckeln, precis som
   hemsideförslagen: den landar hos Bahko Byrå tills Alltfix har en egen
   nyckel. Kvittot påstår aldrig att något skickats om anropet föll. */
const DEMO_NYCKEL = '38db5da0-8af0-4b31-bcdc-a840e84e5764';
const modal = $('modal'), form = $('form'), kvitto = $('kvitto'), formfel = $('formfel');
let fokusFore = null;
function oppnaModal() {
  fokusFore = document.activeElement;
  $('designrad').innerHTML = 'Din design: ' + sammanfattning();
  form.hidden = false; kvitto.hidden = true; formfel.hidden = true;
  modal.hidden = false;
  setTimeout(() => form.querySelector('input[name="namn"]').focus(), 30);
}
function stangModal() { modal.hidden = true; if (fokusFore) fokusFore.focus(); }
$('boka').addEventListener('click', oppnaModal);
$('stang').addEventListener('click', stangModal);
$('kvitto-stang').addEventListener('click', stangModal);
modal.addEventListener('click', (e) => { if (e.target === modal) stangModal(); });
addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.hidden) stangModal(); });
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  formfel.hidden = true;
  const namn = form.namn.value.trim(), tel = form.telefon.value.trim();
  if (!namn || tel.replace(/\D/g, '').length < 7) {
    formfel.textContent = 'Skriv ditt namn och ett telefonnummer, så kan vi ringa och boka en tid.';
    formfel.hidden = false;
    (!namn ? form.namn : form.telefon).focus();
    return;
  }
  const skicka = $('skicka');
  skicka.disabled = true; skicka.textContent = 'Skickar …';
  try {
    const data = new FormData(form);
    data.set('access_key', DEMO_NYCKEL);
    data.set('subject', 'Alltfix uterum: ny design från 3D-prototypen');
    data.set('from_name', 'Bahko-förslag');
    data.set('design', sammanfattning(false) + ` · fronten mot ${RIKT_ORD[S.rikt]}`);
    data.set('lank', location.href);
    const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data, headers: { Accept: 'application/json' } });
    const svar = await res.json().catch(() => ({}));
    if (!res.ok || svar.success === false) throw new Error('inte skickat');
    form.hidden = true; kvitto.hidden = false;
    $('kvitto-stang').focus();
  } catch {
    formfel.innerHTML = 'Det gick inte att skicka just nu. Försök igen, eller ring <a href="tel:+46735192333" style="color:inherit">073-519 23 33</a>.';
    formfel.hidden = false;
  } finally {
    skicka.disabled = false; skicka.textContent = 'Skicka min design';
  }
});

/* ============================================================
   Start
   ============================================================ */
passa();
tillampaFarg(); tillampaGlas();
byggRum();
sattSol();
uppdateraText();
kontrollLage('ute');

/* Ritprogrammen byggs bakom laddskärmen, så första tryck på ett val
   aldrig hackar: dag och natt, lamell- och glastak, med och utan nät. */
(function varmUpp() {
  const spara = { ...S };
  const kombinationer = [
    { tak: 'lamell', nat: true, tid: 15 }, { tak: 'lamell', nat: true, tid: 22.5 },
    { tak: 'glas', nat: true, tid: 15 }, { tak: 'glas', nat: true, tid: 22.5 },
  ];
  const l = vyLage('ute');
  kamera.position.copy(l.pos); kontroller.target.copy(l.mal); kamera.lookAt(l.mal);
  for (const k of kombinationer) {
    Object.assign(S, k); byggRum(); sattSol();
    renderare.compile(scen, kamera);
    renderare.render(scen, kamera);
  }
  Object.assign(S, spara);
  byggRum(); sattSol(); uppdateraText();
  const mal = vyLage('ute');
  kamera.position.copy(mal.mal).add(new THREE.Vector3(9, 11, 18));
  kontroller.target.copy(mal.mal);
  kamera.lookAt(mal.mal);
  kamera.fov = mal.fov; kamera.updateProjectionMatrix();
  flytta(mal.pos, mal.mal, INTRO_MS, () => { kontrollLage('ute'); kontroller.enabled = true; }, mal.fov);
})();
requestAnimationFrame(slinga);
const klar = () => $('laddar').classList.add('klar');
(document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(() => setTimeout(klar, 150));

/* Testkrok för granskningen: läs läget och vikten utan att gissa. */
window.__demo = {
  S,
  lage: () => ({ vy, oppen, natt: ljusNatt, kamera: kamera.position.toArray().map((n) => +n.toFixed(2)) }),
  vikt: () => ({ drawCalls: renderare.info.render.calls, trianglar: renderare.info.render.triangles,
    program: renderare.info.programs ? renderare.info.programs.length : null,
    ljus: (() => { let n = 0; scen.traverse((o) => { if (o.isLight) n++; }); return n; })() }),
  sattOppen: (v) => { oppen = v; oppenMal = v > 0.5 ? 1 : 0; tillampaOppen(v); uppdateraSkuggor(); uppdateraText(); },
  sattVy: (v) => sattVy(v, 0),
  bilder: () => renderare.info.render.frame,
  tick: (ms) => { virtuellTid += ms; stegRuta(false); return virtuellTid; },
  byggtid: (n = 10) => { const t0 = performance.now(); for (let i = 0; i < n; i++) byggRum(); return +((performance.now() - t0) / n).toFixed(2); },
  satt: (k, v) => { const el = document.querySelector(`[data-grupp="${k}"] [data-varde="${v}"]`); if (el) el.click(); },
  sattMatt: (b, d) => { const x = document.getElementById('bredd'), y = document.getElementById('djup'); x.value = b; y.value = d; x.dispatchEvent(new Event('input')); y.dispatchEvent(new Event('input')); x.dispatchEvent(new Event('change')); },
  oppna: () => document.getElementById('oppna').click(),
  /* Rita nu och vänta in grafikkortet. I testmiljön renderar SwiftShader på
     processorn, och en skärmdump utan det här visade en bildruta flera sekunder gammal. */
  synka: () => { kontroller.update(); renderare.render(scen, kamera); placeraEtiketter(); const gl = renderare.getContext(); const px = new Uint8Array(4); gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px); return true; },
  /* Var hamnar rummets hörn på duken, jämfört med den fria ytan? */
  ram: () => { const l = projiceradLada(rumHorn()); return { rum: [l.x0, l.y0, l.x1, l.y1].map(Math.round), fri: friYta(), hinder: hinder().map((r) => [r.x0, r.y0, r.x1, r.y1].map(Math.round)) }; },
  klar: true,
};
