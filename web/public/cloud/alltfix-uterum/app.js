import * as THREE from 'three';
import { OrbitControls } from './vendor/OrbitControls.js';
import { RoomEnvironment } from './vendor/RoomEnvironment.js';
import { berakna, kronor, TESTPRISER } from './pris.js';

/* ============================================================
   ALLTFIX — uterumskonfigurator i 3D.
   Samma grundregler som 3D-planlösningen (../planlosning-3d/,
   docs/design/3d-planlosning-bar.md):
   · en easing för varje rörelse, inget studsar eller svävar
   · bilden ritas bara när något hänt, skuggkartan bara när något flyttats
   · ljus läggs in och tas ut ur scenen, aldrig nollställda
   · duken mäts i CSS-pixlar, DPR sätts först (fällan på retinaskärmar)
   Allt i uterummet räknas ur bredd, djup, höjd och taklutning. Ytan och
   priset i panelen är samma tal som byggde geometrin, aldrig en
   handskriven siffra.
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
/* Taket väljs i två steg: form och täckning (Rami 2026-09-28). Varje form
   har sina täckningar; lameller kräver plant tak, pannor minst 14° fall. */
const FORM = { plant: 'Plant tak', pulpet: 'Pulpettak', sadel: 'Sadeltak' };
const FORM_TEXT = {
  plant: 'Rakt tak i samma höjd hela vägen in till huset.',
  pulpet: 'Taket lutar åt ett håll, från huset ner mot trädgården.',
  sadel: 'Två takfall med nocken från huset ut mot trädgården.',
};
const TAK = { lamell: 'Lamelltak', glas: 'Glastak', kanalplast: 'Kanalplast', takpapp: 'Takpapp', takpannor: 'Takpannor' };
const TAK_FOR = {
  plant: ['lamell', 'takpapp'],
  pulpet: ['glas', 'kanalplast', 'takpapp', 'takpannor'],
  sadel: ['glas', 'kanalplast', 'takpapp', 'takpannor'],
};
const LUT = { pulpet: { min: 5, max: 25, std: 10 }, sadel: { min: 15, max: 35, std: 25 } };
const PANNOR_MIN = 14;
const TATT = { takpapp: true, takpannor: true };   // täta tak: skiva med utsprång och vit vindskiva
const GOLV = { trall: 'Trätrall', parkett: 'Parkett', klinker: 'Klinker' };
const VAGG = { skjut: 'Skjutpartier', vik: 'Viksystem', oppen: 'Öppet utan glas' };
const VAGG_TEXT = {
  skjut: 'Glaspartierna glider åt sidan och staplas i ena änden.',
  vik: 'Glaspartierna viks ihop som ett dragspel och samlas mot hörnen.',
  oppen: 'Bara tak och stolpar. Välj glaspartier om rummet ska kunna stängas.',
};
const GLAS = { klart: 'Klart glas', tonat: 'Tonat glas' };
const RIKT_GRAD = { S: 0, V: 90, N: 180, O: -90 };
const RIKT_ORD = { S: 'söder', V: 'väster', N: 'norr', O: 'öster' };
/* Måtten i meter, alltid avrundade till hela centimeter. Höjden är
   takfotens höjd över altangolvet, i fronten. */
const MATT = {
  b: { id: 'bredd', min: 3, max: 7, namn: 'bredden' },
  d: { id: 'djup', min: 2, max: 4.5, namn: 'djupet' },
  h: { id: 'hojd', min: 2.1, max: 3, namn: 'höjden' },
};
const har = (lista, v) => v != null && Object.prototype.hasOwnProperty.call(lista, v);
const klamMatt = (k, v) => Math.min(MATT[k].max, Math.max(MATT[k].min, Math.round(v * 100) / 100));

const S = { b: 5, d: 3.5, h: 2.5, form: 'plant', lut: 10, tak: 'lamell', golv: 'trall', vagg: 'skjut', farg: 'antracit', glas: 'klart',
  led: true, nat: false, rikt: 'S', tid: 15, lamell: 0.6 };
const STANDARD = { ...S };

/* Lutningens gränser för formen just nu, eller null för plant tak. */
function lutGranser() {
  const g = LUT[S.form];
  if (!g) return null;
  return { min: S.tak === 'takpannor' ? Math.max(g.min, PANNOR_MIN) : g.min, max: g.max };
}
/* Håller ihop valen: täckningen måste finnas för formen och lutningen ligga
   inom formens och pannornas gränser. Anropas efter lasHash och varje val. */
let pannorHojde = false;    // lutningen lyftes till 14° för att pannor valdes
function normalisera() {
  if (!har(FORM, S.form)) S.form = 'plant';
  if (!TAK_FOR[S.form].includes(S.tak)) S.tak = TAK_FOR[S.form][0];
  if (!har(GOLV, S.golv)) S.golv = 'trall';
  for (const k in MATT) S[k] = klamMatt(k, Number.isFinite(S[k]) ? S[k] : (MATT[k].min + MATT[k].max) / 2);
  const g = lutGranser();
  if (g) {
    let v = Math.round(Number.isFinite(S.lut) ? S.lut : LUT[S.form].std);
    if (v < g.min && S.tak === 'takpannor' && v >= LUT[S.form].min) pannorHojde = true;
    S.lut = Math.min(g.max, Math.max(g.min, v));
  }
  if (S.tak !== 'takpannor') pannorHojde = false;
}

/* Delad länk: hela designen ligger i adressens #-del. Mått skrivs i meter
   med hela centimeter (5.37); ett tal över 20 läses som centimeter. */
function hashParametrar() {
  return new URLSearchParams({ b: S.b, d: S.d, h: S.h, form: S.form, lut: S.lut, tak: S.tak, golv: S.golv, vagg: S.vagg,
    farg: S.farg, glas: S.glas, led: S.led ? 1 : 0, nat: S.nat ? 1 : 0, rikt: S.rikt, tid: S.tid, lamell: Math.round(S.lamell * 100) });
}
function lasHash() {
  const p = new URLSearchParams(location.hash.slice(1));
  for (const k in MATT) {
    const v = parseFloat(p.get(k));
    if (Number.isFinite(v)) S[k] = klamMatt(k, v > 20 ? v / 100 : v);
  }
  const t = parseFloat(p.get('tid'));
  if (Number.isFinite(t)) S.tid = Math.min(23, Math.max(5, Math.round(t / 0.25) * 0.25));
  const ur = (k, lista) => { const v = p.get(k); if (har(lista, v)) S[k] = v; };
  ur('tak', TAK); ur('golv', GOLV); ur('vagg', VAGG); ur('glas', GLAS); ur('rikt', RIKT_GRAD);
  // gamla länkar saknar form: glastaket lutade, lamelltaket var plant
  if (har(FORM, p.get('form'))) S.form = p.get('form');
  else if (p.has('tak')) S.form = S.tak === 'lamell' || S.tak === 'takpapp' ? 'plant' : 'pulpet';
  const lu = parseFloat(p.get('lut'));
  S.lut = Number.isFinite(lu) ? lu : LUT[S.form] ? LUT[S.form].std : S.lut;
  const f = p.get('farg'); if (FARGER.some((x) => x.id === f)) S.farg = f;
  if (p.has('led')) S.led = p.get('led') === '1';
  if (p.has('nat')) S.nat = p.get('nat') === '1';
  const l = parseFloat(p.get('lamell')); if (Number.isFinite(l)) S.lamell = Math.min(1, Math.max(0, l / 100));
  normalisera();
  pannorHojde = false;      // en delad länk har redan sin lutning
}
let hashTimer = 0;
function skrivHash() {
  clearTimeout(hashTimer);
  hashTimer = setTimeout(() => history.replaceState(null, '', '#' + hashParametrar().toString()), 250);
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
  // taktäckningarna utöver glaset, och golven inne i rummet
  // kanalplast: mjölkvit och halvgenomskinlig; ett svagt eget sken (dagsljuset som
  // sprids i skivan) gör undersidan ljus i stället för grå, sattSol släcker det i mörkret
  kanal: new THREE.MeshStandardMaterial({ color: 0xeef0ec, roughness: 0.42, transparent: true, opacity: 0.62,
    depthWrite: false, side: THREE.DoubleSide, envMapIntensity: 0.8, emissive: 0xf4f6f2, emissiveIntensity: 0.25 }),
  papp: new THREE.MeshStandardMaterial({ color: 0x2f3134, roughness: 0.95 }),
  pannor: new THREE.MeshStandardMaterial({ color: 0x3b3e43, roughness: 0.78 }),
  parkett: new THREE.MeshStandardMaterial({ color: 0xd8b98a, roughness: 0.5 }),    // ljus ek, ljusare än trallen
  klinker: new THREE.MeshStandardMaterial({ color: 0xa9a8a3, roughness: 0.6 }),    // gråare än mattan
};
/* Kanalplastens skuggdjup: hälften av skuggkartans punkter, se byggRum. */
const KANAL_SKUGGA = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, alphaHash: true, opacity: 0.5 });

/* ---------- ytstruktur ur världskoordinaten ----------
   Samma teknik som planlösningen: ETT program för alla strukturerade ytor,
   typen skickas som uniform. Fasadpanelen följer väggens riktning via
   världsnormalen, så gavlarna får stående panel även de. */
const TYPER = { panel: 1, dack: 2, gras: 3, sten: 4, matta: 5, takpanna: 6, parkett: 7, pannor: 8, kanal: 9, klinker: 10 };
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
  } else if (uTyp == 7) {
    // ekparkett: smala stavar längs djupet, skarvarna förskjutna i halvförband
    float rad = vVarld.x / 0.09;
    float ri = floor(rad);
    float l = vVarld.z / 0.62 + 0.5 * mod(ri, 2.0);
    float kx = abs(fract(rad) - 0.5) * 2.0, kz = abs(fract(l) - 0.5) * 2.0;
    m *= 1.0 - 0.3 * smoothstep(0.84, 1.0, kx) - 0.24 * smoothstep(0.96, 1.0, kz);
    m *= 0.9 + 0.14 * fract(sin(ri * 12.9898 + floor(l) * 78.233) * 43758.5453);
    m *= 0.97 + 0.03 * sin(vVarld.z * 37.0 + ri * 2.7);
  } else if (uTyp == 8) {
    // takpannor på uterummet: raderna följer takfallet, som på huset. Ett
    // pulpettak faller längs z, sadeltakets fall längs x (normalen avgör).
    bool sid = abs(vNormW.x) > abs(vNormW.z);
    float rad = (sid ? abs(vVarld.x) : vVarld.z) / 0.34;
    float kol = (sid ? vVarld.z : vVarld.x) / 0.3;
    float r = abs(fract(rad) - 0.5) * 2.0;
    m *= 1.0 - 0.3 * smoothstep(0.78, 1.0, r);
    m *= 0.95 + 0.07 * fract(sin(floor(kol) * 12.9898 + floor(rad)) * 43758.5453);
    m *= 0.94 + 0.06 * sin(kol * 6.2832);
  } else if (uTyp == 9) {
    // kanalplast: kanalerna löper i fallriktningen
    bool sid = abs(vNormW.x) > abs(vNormW.z);
    float k = abs(fract((sid ? vVarld.z : vVarld.x) / 0.032) - 0.5) * 2.0;
    m *= 1.0 - 0.1 * smoothstep(0.7, 1.0, k);
  } else if (uTyp == 10) {
    // klinker 60 x 60 cm med fogar, plattorna mitt för rummets mittlinje
    vec2 k = vec2(vVarld.x / 0.6 + 0.5, vVarld.z / 0.6);
    vec2 e = abs(fract(k) - 0.5) * 2.0;
    m *= 1.0 - 0.32 * smoothstep(0.93, 0.985, max(e.x, e.y));
    m *= 0.95 + 0.07 * fract(sin(dot(floor(k), vec2(39.3468, 11.135))) * 24634.6345);
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
for (const [k, t] of [['fasad', 'panel'], ['dack', 'dack'], ['gras', 'gras'], ['sten', 'sten'], ['matta', 'matta'], ['tak', 'takpanna'],
  ['papp', 'matta'], ['pannor', 'pannor'], ['kanal', 'kanal'], ['parkett', 'parkett'], ['klinker', 'klinker']]) strukturera(M[k], t);

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

/* ---------- huset ----------
   En enplansvilla med stående panel och sadeltak. Uterummet byggs mot
   långsidan, som ligger i z = 0 och vetter ut mot trädgården (+z).
   Väggen är 3,1 m, men ett högt pulpet- eller sadeltak får aldrig gå in i
   husets takfot eller ränna: då höjs väggen och takfallen följer med. */
const HUS_B = 14;
const HUS_VAGG = 3.1;
const hus = new THREE.Group();
scen.add(hus);
let husVagg = 0;
function byggHus(vH) {
  if (Math.abs(vH - husVagg) < 0.005) return;
  husVagg = vH;
  hus.traverse((o) => { if (o.userData.egenGeo) o.geometry.dispose(); });
  hus.clear();
  const profil = new THREE.Shape();
  profil.moveTo(0, 0); profil.lineTo(0, vH); profil.lineTo(4, vH + 2.15); profil.lineTo(8, vH); profil.lineTo(8, 0); profil.closePath();
  const kropp = new THREE.Mesh(new THREE.ExtrudeGeometry(profil, { depth: HUS_B, bevelEnabled: false }), M.fasad);
  kropp.rotation.y = Math.PI / 2;           // formens x blir världens -z, extruderingen blir x
  kropp.position.x = -HUS_B / 2;
  kropp.castShadow = true; kropp.receiveShadow = true;
  kropp.userData.egenGeo = true;
  hus.add(kropp);
  hus.add(box(M.sockel, HUS_B + 0.04, 0.42, 8.04, 0, 0.21, -4));
  // takfall med utsprång; takfoten ligger 10 cm under väggens överkant
  const tf = vH - 0.1;
  const dz = 4.55, dy = 2.28, L = Math.hypot(dz, dy), a = Math.atan2(dy, dz);
  const fram = box(M.tak, HUS_B + 0.8, 0.16, L, 0, tf + dy / 2 + 0.08, (0.55 - 4) / 2);
  fram.rotation.x = a; hus.add(fram);
  const bak = box(M.tak, HUS_B + 0.8, 0.16, L, 0, tf + dy / 2 + 0.08, -4 - (4 + 0.55) / 2);
  bak.rotation.x = -a; hus.add(bak);
  hus.add(box(M.tak, HUS_B + 0.8, 0.12, 0.3, 0, vH + 2.26, -4));
  hus.add(box(M.vitt, HUS_B + 0.8, 0.22, 0.04, 0, tf, 0.57));        // vindskiva
  hus.add(box(M.sockel, HUS_B + 0.8, 0.1, 0.12, 0, vH - 0.24, 0.6));  // hängränna
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
let ledBak = null;          // pulpettakets fall, där spotarna mot huset sitter

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
  const form = S.form, tak = S.tak;
  const a = form === 'plant' ? 0 : S.lut * D2R;
  const tatt = !!TATT[tak];
  const BH = form === 'plant' ? 0.24 : 0.16;
  const topFram = Y0 + S.h;                                                  // takfoten i fronten
  const topBak = form === 'pulpet' ? topFram + D * Math.tan(a) : topFram;   // mot huset
  const nock = form === 'sadel' ? topFram + (W / 2) * Math.tan(a) : topFram;
  const UT = 0.14;                                                           // utsprång för täta tak
  const TJ = tak === 'takpannor' ? 0.07 : tak === 'takpapp' ? 0.05 : 0;     // den täta skivans tjocklek
  const hogst = form === 'sadel' ? nock + (tatt ? TJ / Math.cos(a) + 0.06 : 0.07)
    : form === 'pulpet' ? topBak + (tatt ? TJ / Math.cos(a) + 0.03 : 0.045)
    : topFram + (tatt ? TJ + 0.03 : 0);
  rumMatt = { W, D, topBak: hogst, topFram, nock };      // topBak: rummets högsta punkt, till inramningen

  // altanen med ett trappsteg ut mot trädgården
  rum.add(box(M.dack, W + 0.8, Y0, D + 0.7, 0, Y0 / 2, (D + 0.7) / 2));
  rum.add(box(M.dack, 1.5, Y0 / 2, 0.38, 0.9, Y0 / 4, D + 0.7 + 0.19));
  // golvet inne i rummet; altanen utanför och trappsteget förblir trall
  if (S.golv !== 'trall') rum.add(box(S.golv === 'parkett' ? M.parkett : M.klinker, W - 0.02, 0.006, D - 0.02, 0, Y0 + 0.003, D / 2, false));
  // gångplattor ut i gräset
  for (let i = 0; i < 4; i++) rum.add(box(M.sten, 0.62, 0.04, 0.46, 0.9 + (i % 2 ? 0.12 : -0.08), 0.02, D + 1.45 + i * 0.78));

  // stolpar
  const stolpe = (x, z, h) => rum.add(box(M.profil, P, h, P, x, Y0 + h / 2, z));
  const frontH = topFram - Y0;
  const mitt = W > 4.5;
  stolpe(-W / 2 + P / 2, D - P / 2, frontH); stolpe(W / 2 - P / 2, D - P / 2, frontH);
  if (mitt) stolpe(0, D - P / 2, frontH);
  // väggprofiler mot huset; under pulpettaket slutar de under takfallet, som lutar redan i z = 0,06
  const vpTopp = form === 'pulpet' ? topBak - 0.06 * Math.tan(a) - 0.003 : topBak;
  rum.add(box(M.profil, P, vpTopp - Y0, 0.06, -W / 2 + P / 2, Y0 + (vpTopp - Y0) / 2, 0.03));
  rum.add(box(M.profil, P, vpTopp - Y0, 0.06, W / 2 - P / 2, Y0 + (vpTopp - Y0) / 2, 0.03));
  // frontbalk
  rum.add(box(M.profil, W, BH, 0.12, 0, topFram - BH / 2, D - 0.06));

  /* Glas kastar ingen skugga, som glastaket förut; täta skivor gör det.
     Kanalplasten släpper igenom ungefär halva solen: skuggkartan kan bara
     säga av eller på, så dess skuggdjup ritas prickigt (alphaHash) och
     mjukas av skuggfiltret till en halvskugga. */
  const kanal = tak === 'kanalplast';
  const skiva = (forald, mat, w, t, d, x, y, z) => {
    const o = box(mat, w, t, d, x, y, z, tatt || kanal);
    if (kanal) o.customDepthMaterial = KANAL_SKUGGA;
    if (!tatt) o.renderOrder = 2;
    forald.add(o); return o;
  };
  const TACK = { glas: M.glas, kanalplast: M.kanal, takpapp: M.papp, takpannor: M.pannor };
  const [sb, sh, delning] = kanal ? [0.035, 0.07, 0.6] : [0.05, 0.09, 0.95];   // mellansparrarna
  const tS = tatt ? TJ : kanal ? 0.016 : 0.012;                                // täckningens tjocklek
  /* Ett lutande fall slutar med en ände vinkelrät mot fallet. Förlängs en del
     med vid(y) förbi sin ände hamnar dess ovankant y precis på huset (pulpet)
     eller mitt i nocken (sadel); resten går in i väggen eller i andra fallet. */
  const vid = (y) => y * Math.tan(a);
  ledBak = null;

  if (form === 'plant') {
    rum.add(box(M.profil, W, BH, 0.12, 0, topBak - BH / 2, 0.06));              // väggbalk
    rum.add(box(M.profil, 0.12, BH, D, -W / 2 + 0.06, topBak - BH / 2, D / 2));
    rum.add(box(M.profil, 0.12, BH, D, W / 2 - 0.06, topBak - BH / 2, D / 2));
    if (mitt) rum.add(box(M.profil, 0.12, BH, D, 0, topBak - BH / 2, D / 2));
    if (tak === 'lamell') {
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
    } else {
      // takpapp på balkarna, med utsprång, vit takfotsbräda runt om och ränna i fronten
      skiva(rum, M.papp, W + 2 * UT, TJ, D + UT, 0, topFram + TJ / 2, (D + UT) / 2);
      rum.add(box(M.vitt, W - 0.02, 0.012, D - 0.02, 0, topFram - 0.006, D / 2));   // innertak
      const vy = topFram + TJ + 0.02 - 0.1;
      rum.add(box(M.vitt, W + 2 * UT + 0.05, 0.2, 0.025, 0, vy, D + UT + 0.0125));
      for (const s of [-1, 1]) rum.add(box(M.vitt, 0.025, 0.2, D + UT + 0.025, s * (W / 2 + UT + 0.0125), vy, (D + UT + 0.025) / 2));
      rum.add(box(M.profil, W + 2 * UT + 0.05, 0.1, 0.12, 0, topFram - 0.13, D + UT + 0.09));
    }
  } else if (form === 'pulpet') {
    /* Takfallet är en egen grupp med origo i frontens överkant: lokal z går
       från huset (-L) till fronten (0), lokal y = 0 är sparrarnas ovansida.
       del(): lokal y från y0 till y0 + h, lokal z från z0 till z1. */
    const L = D / Math.cos(a);
    const fall = new THREE.Group(); fall.position.set(0, topFram, D); fall.rotation.x = a; rum.add(fall);
    const del = (m, w, h, y0, z0, z1, x = 0) => fall.add(box(m, w, h, z1 - z0, x, y0 + h / 2, (z0 + z1) / 2));
    const sparre = (x, bw, bh) => del(M.profil, bw, bh, -bh, -L, 0, x);
    sparre(-W / 2 + P / 2, P, BH); sparre(W / 2 - P / 2, P, BH);
    const n = Math.max(2, Math.round(W / delning));
    for (let i = 1; i < n; i++) sparre(-W / 2 + (i * W) / n, sb, sh);
    // väggbalken ligger i fallet under sparrarna: ovansidan följer lutningen, inget sticker upp genom taket
    del(M.profil, W, 0.14, -0.14, -L, -L + 0.1);
    let kant = 0;                                                          // täckningens framkant, lokal z
    if (tatt) {
      skiva(fall, TACK[tak], W + 2 * UT, TJ, L + UT + vid(TJ), 0, TJ / 2, (-L - vid(TJ) + UT) / 2);
      del(M.vitt, W - 0.02, 0.012, -0.012, -L, 0);                       // innertak på sparrarna
      for (const s of [-1, 1]) del(M.vitt, 0.025, 0.2, TJ + 0.02 - 0.2, -L - vid(TJ + 0.02), UT + 0.025, s * (W / 2 + UT + 0.0125));
      fall.add(box(M.vitt, W + 2 * UT + 0.05, 0.16, 0.025, 0, TJ + 0.01 - 0.08, UT + 0.0125));
      kant = UT + 0.025;
    } else {
      skiva(fall, TACK[tak], W - 0.02, tS, L + vid(tS), 0, tS / 2, (-L - vid(tS)) / 2);
      // kantprofilerna 2 mm längre än skivan i fronten: inga ändytor i samma plan
      if (kanal) for (const s of [-1, 1]) del(M.profil, 0.05, 0.035, 0.0025, -L - vid(0.0375), 0.002, s * (W / 2 - 0.025));
    }
    // anslutningsplåt mot husväggen över täckningens övre ände
    del(M.profil, W + (tatt ? 2 * UT : 0), 0.012, tS, -L - vid(tS + 0.012), -L + 0.08);
    // ränna i fronten, under täckningens framkant
    const zE = D + kant * Math.cos(a), yE = topFram - kant * Math.sin(a);
    rum.add(box(M.profil, W + (tatt ? 2 * UT + 0.05 : 0.08), 0.09, 0.12, 0, yE - (tatt ? 0.12 : 0.02), zE + 0.05));
    // spotarna mot huset sitter under väggbalken, i fallets lutning
    ledBak = { fall, y: -0.14 - 0.006, z: -L + 0.05 };
  } else {
    /* Sadeltak: nocken löper från huset ut mot trädgården i x = 0, takfötterna
       ligger längs sidorna. Varje takfall är en grupp med origo i nocken vid
       huset: lokal x går ut mot takfoten (s * Ls), lokal z längs nocken.
       del(): från x0 till x1 räknat utåt från nocken, lokal y från y0. */
    const Ls = (W / 2) / Math.cos(a);
    rum.add(box(M.profil, 0.12, BH, D, -W / 2 + 0.06, topFram - BH / 2, D / 2));
    rum.add(box(M.profil, 0.12, BH, D, W / 2 - 0.06, topFram - BH / 2, D / 2));
    rum.add(box(M.profil, W, BH, 0.12, 0, topFram - BH / 2, 0.06));            // väggbalk
    rum.add(box(M.profil, 0.1, 0.16, D, 0, nock - 0.1, D / 2));                // nockbalk
    const n = Math.max(2, Math.round(D / delning));
    for (const s of [-1, 1]) {
      const fall = new THREE.Group(); fall.position.set(0, nock, 0); fall.rotation.z = -s * a; rum.add(fall);
      const del = (m, x0, x1, h, y0, d, z) => fall.add(box(m, x1 - x0, h, d, s * (x0 + x1) / 2, y0 + h / 2, z));
      del(M.profil, 0, Ls, BH, -BH, P, P / 2);
      del(M.profil, 0, Ls, BH, -BH, P, D - P / 2);
      for (let i = 1; i < n; i++) del(M.profil, 0, Ls, sh, -sh, sb, (i * D) / n);
      if (tatt) {
        // skivan och nockpannan förlängs förbi nocken så att fallens ovankanter möts i en spets
        skiva(fall, TACK[tak], Ls + UT + vid(TJ), TJ, D + UT, s * (Ls + UT - vid(TJ)) / 2, TJ / 2, (D + UT) / 2);
        del(M.vitt, 0, Ls, 0.012, -0.012, D, D / 2);                                      // innertak på sparrarna
        del(TACK[tak], -vid(TJ + 0.03), 0.13, 0.03, TJ, D + UT, (D + UT) / 2);               // nockpanna
        // vindskiva längs gavelns kant, spetsig i nocken, och takfotsbräda längs sidan
        del(M.vitt, -vid(TJ + 0.02), Ls + UT + 0.01, 0.2, TJ + 0.02 - 0.2, 0.025, D + UT + 0.0125);
        fall.add(box(M.vitt, 0.025, 0.16, D + UT + 0.025, s * (Ls + UT + 0.0125), TJ + 0.01 - 0.08, (D + UT + 0.025) / 2));
      } else {
        skiva(fall, TACK[tak], Ls + vid(tS), tS, D - 0.02, s * (Ls - vid(tS)) / 2, tS / 2, D / 2);
        // kantprofilen 2 mm längre än skivan vid takfoten: inga ändytor i samma plan
        if (kanal) del(M.profil, -vid(0.0375), Ls + 0.002, 0.035, 0.0025, 0.05, D - 0.025);
        del(M.profil, -vid(tS + 0.03), 0.07, 0.03, tS, D, D / 2);                           // nockprofil
      }
      // ränna längs sidan, under takfoten
      const kant = tatt ? UT + 0.025 : 0;
      const xE = W / 2 + kant * Math.cos(a), yE = topFram - kant * Math.sin(a);
      rum.add(box(M.profil, 0.12, 0.09, D + (tatt ? UT + 0.03 : 0.04), s * (xE + 0.05), yE - (tatt ? 0.12 : 0.02), (D + (tatt ? UT : 0)) / 2));
    }
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
  // gavelglaset ovanför partierna när taket lutar: trianglar på sidorna
  // under pulpettaket, en triangel i fronten under sadeltaket
  // Stående profiler delar gavelglaset i rutor, som partierna under: ingen
  // hantverkare sätter ett glas på 7 × 2 m (runda 1).
  const sprojs = (h, x, y0, z, langsZ) => { if (h > 0.12) rum.add(box(M.profil, langsZ ? 0.04 : 0.05, h, langsZ ? 0.05 : 0.04, x, y0 + h / 2, z)); };
  if (form === 'pulpet' && S.vagg !== 'oppen') {
    const y0 = hTop + 0.04, y1 = topBak - BH - 0.01;
    const f = new THREE.Shape();
    f.moveTo(0, y0); f.lineTo(D, y0); f.lineTo(0, y1); f.closePath();
    const geo = new THREE.ShapeGeometry(f);
    for (const x of [-W / 2 + 0.07, W / 2 - 0.07]) {
      const g = new THREE.Mesh(geo, M.glas);
      g.rotation.y = -Math.PI / 2; g.position.x = x; g.renderOrder = 2;
      g.userData.egenGeo = x > 0;
      rum.add(g);
      sprojs((y1 - y0) / 2, x, y0, D / 2, true);                  // en profil mitt på djupet
    }
  }
  if (form === 'sadel' && S.vagg !== 'oppen') {
    const x1 = W / 2 - P, y1 = nock - 0.14;
    const f = new THREE.Shape();
    f.moveTo(-x1, topFram); f.lineTo(x1, topFram); f.lineTo(0, y1); f.closePath();
    const g = new THREE.Mesh(new THREE.ShapeGeometry(f), M.glas);
    g.position.z = D - 0.07; g.renderOrder = 2; g.userData.egenGeo = true;
    rum.add(g);
    // mittprofilen bär nockbalken i fronten; på breda rum en till mitt i varje halva
    const xs = W / 2 > 1.6 ? [0, -W / 4, W / 4] : [0];
    for (const x of xs) sprojs((y1 - topFram) * (1 - Math.abs(x) / x1) + (x === 0 ? 0.06 : 0), x, topFram, D - 0.07, false);
  }
  natGrupp.visible = S.nat;
  rum.add(natGrupp);

  // LED-spotar i takprofilerna: frontbalken och balken mot huset
  const ledY = topFram - BH - 0.006;
  for (let x = -W / 2 + 0.5; x <= W / 2 - 0.45; x += 0.9) ledGrupp.add(box(M.led, 0.07, 0.012, 0.07, x, ledY, D - 0.1, false));
  // mot huset: under väggbalken. Pulpettakets balk ligger i fallet, så dess spotar får fallets lutning.
  const bakRad = new THREE.Group();
  if (ledBak) { bakRad.position.copy(ledBak.fall.position); bakRad.rotation.copy(ledBak.fall.rotation); }
  const [bakY, bakZ] = ledBak ? [ledBak.y, ledBak.z] : [topBak - BH - 0.006, 0.06];
  for (let x = -W / 2 + 0.5; x <= W / 2 - 0.45; x += 0.9) bakRad.add(box(M.led, 0.07, 0.012, 0.07, x, bakY, bakZ, false));
  ledGrupp.add(bakRad);
  ledGrupp.visible = S.led;
  rum.add(ledGrupp);
  ledLjus[0].position.set(-W / 4, ledY - 0.25, D * 0.55);
  ledLjus[1].position.set(W / 4, ledY - 0.25, D * 0.55);

  // möblering: soffa mot husväggen, bord, matta, två krukväxter
  const sw = Math.min(2.2, W - 1.6);
  const sx = W > 4 ? -(W / 2 - 0.55 - sw / 2) : 0;
  rum.add(box(M.matta, Math.min(W - 1.2, 2.6), 0.014, Math.min(D - 1.0, 1.9), sx * 0.4, Y0 + 0.007, D * 0.52, false));
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
  mattEl[0].textContent = `${dec(W, 2)} m`;
  mattEl[1].textContent = `${dec(D, 2)} m`;
  mattEl[2].textContent = `${dec(H, 2)} m`;

  tillampaOppen(oppen);
  if (ljusNatt && S.led) rum.add(...ledLjus);
  byggHus(Math.max(HUS_VAGG, Math.ceil((rumMatt.topBak + 0.4) * 100) / 100));
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
  M.kanal.emissiveIntensity = 0.25 * dag;
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
      + (S.tak === 'lamell' ? 'Vinkla lamellerna för skugga.' : S.glas === 'tonat' ? 'Det tonade glaset dämpar solen.'
        : S.tak === 'glas' ? 'Tonat glas eller ett tätt tak ger skugga.' : 'Tonat glas dämpar solen genom partierna.');
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
const lutande = () => S.form !== 'plant';
/* Höjden vid huset (pulpet) eller nocken (sadel), räknad från altangolvet. */
function hogstaHojd() {
  const t = Math.tan(S.lut * D2R);
  return S.form === 'pulpet' ? S.h + S.d * t : S.form === 'sadel' ? S.h + (S.b / 2) * t : S.h;
}
function prisNu() {
  return berakna({ b: S.b, d: S.d, h: S.h, form: S.form, lut: S.lut, tak: S.tak, vagg: S.vagg,
    glas: S.glas, golv: S.golv, led: S.led, nat: S.nat });
}
function sammanfattning(html = true) {
  const f = FARGER.find((x) => x.id === S.farg).namn;
  const till = [S.led && 'LED-belysning', S.nat && 'insektsnät'].filter(Boolean);
  const matt = `${dec(S.b, 2)} × ${dec(S.d, 2)} m · höjd ${dec(S.h, 2)} m`;
  const form = lutande() ? `${FORM[S.form]} ${S.lut}°` : FORM[S.form];
  const delar = [`${dec(S.b * S.d)} m²`, form, TAK[S.tak], `golv i ${GOLV[S.golv].toLowerCase()}`, VAGG[S.vagg], f, GLAS[S.glas]];
  if (till.length) delar.push(till.join(' och '));
  return html ? `<b>${matt}</b> · ${delar.join(' · ')}` : `${matt} · ${delar.join(' · ')}`;
}
function uppdateraText() {
  for (const k in MATT) {
    const g = MATT[k];
    $('ut-' + g.id).textContent = `${dec(S[k], 2)} m`;
    const r = $(g.id);
    if (+r.value !== S[k]) r.value = S[k];
    fyll(r);
    const f = $(g.id + '-cm');
    if (document.activeElement !== f) f.value = Math.round(S[k] * 100);
    f.setAttribute('aria-valuenow', Math.round(S[k] * 100));
  }
  $('ut-yta').textContent = `${dec(S.b * S.d)} m²`;
  $('hojd-info').textContent = S.form === 'pulpet' ? `Höjd vid huset: ${dec(hogstaHojd(), 2)} m`
    : S.form === 'sadel' ? `Nockhöjd: ${dec(hogstaHojd(), 2)} m` : 'Samma höjd hela vägen in till huset.';
  // taket: formens text, lutningen och bara de täckningar som finns för formen
  $('form-text').textContent = FORM_TEXT[S.form];
  const lg = lutGranser();
  $('lut-rad').hidden = !lg;
  if (lg) {
    const r = $('lut');
    r.min = lg.min; r.max = lg.max;
    if (+r.value !== S.lut) r.value = S.lut;
    fyll(r);
    $('ut-lut').textContent = `${S.lut}°`;
  }
  const pannNot = S.tak === 'takpannor' && S.form === 'pulpet';
  $('lut-not').hidden = !pannNot;
  $('lut-not').textContent = pannorHojde ? `Takpannor kräver minst ${PANNOR_MIN}° lutning, så lutningen är höjd till ${PANNOR_MIN}°.`
    : `Takpannor kräver minst ${PANNOR_MIN}° lutning.`;
  for (const b of document.querySelectorAll('[data-grupp="tak"] [data-varde]')) b.hidden = !TAK_FOR[S.form].includes(b.dataset.varde);
  // priset räknas ur samma tal som byggde rummet, i samma bildruta
  const pris = prisNu();
  $('ut-pris').textContent = $('ut-pris-bar').textContent = kronor(pris.total);
  $('prisrader').innerHTML = pris.rader.map((r) => `<li><span>${r.text}${r.hur ? `<small>${r.hur}</small>` : ''}</span><b>${kronor(r.kr)}</b></li>`).join('');
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
    // ny form börjar på sin standardlutning; pannor kan sedan lyfta den
    if (grupp === 'form' && LUT[v]) S.lut = LUT[v].std;
    if (grupp === 'form' || grupp === 'tak') { pannorHojde = false; normalisera(); }
    if (grupp === 'tak' || grupp === 'vagg' || grupp === 'form' || grupp === 'golv') {
      if (grupp === 'vagg') { oppen = 0; oppenMal = 0; }
      byggRum();
      if (grupp !== 'golv' && vy !== 'inne') sattVy(vy, 600);
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

/* ---------- måtten: reglage, knappar och sifferfält ----------
   Rami 2026-09-28: 50 cm per steg var för grovt. Allt går nu i hela cm:
   reglagets piltangenter, knapparna (håll inne för att fortsätta) och
   fältet där man skriver måttet. Rummet byggs om högst en gång per
   bildruta; kameran ramar om först när ett mått är färdigändrat. */
function sattMattVarde(k, v) {
  const ny = klamMatt(k, v);
  if (ny === S[k]) return false;
  S[k] = ny;
  byggINastaRuta(); uppdateraText();
  return true;
}
function mattKlart() {
  // Rummet måste ha sina nya mått innan omramningen räknas (runda 3: ramen
  // räknades på det gamla rummet medan ombygget väntade på nästa bildruta).
  if (byggKo) { byggKo = false; byggRum(); }
  if (vy !== 'inne') sattVy(vy, 800); else sattVy('inne', 600);
}
/* "537", "537,5", "537 cm", "5,37" och "5,37 m" blir alla 537 cm. Utan enhet
   läses ett tal under 10 som meter (inget mått är under 10 cm). Allt annat,
   "-450", "1e3", "4 50", är ogiltigt och ändrar ingenting. */
function tolkaCm(txt, meter = true) {
  const t = /^\s*(\d+(?:[.,]\d+)?)\s*(cm|m)?\s*$/i.exec(String(txt));
  if (!t) return NaN;
  const v = parseFloat(t[1].replace(',', '.'));
  const enhet = t[2] ? t[2].toLowerCase() : '';
  return Math.round(enhet === 'm' || (!enhet && meter && v < 10) ? v * 100 : v);
}
for (const k in MATT) {
  const g = MATT[k];
  const r = $(g.id), f = $(g.id + '-cm');
  r.min = g.min; r.max = g.max; r.step = 0.01; r.value = S[k];
  f.setAttribute('aria-valuemin', Math.round(g.min * 100));
  f.setAttribute('aria-valuemax', Math.round(g.max * 100));
  /* smutsig: fältet har text som inte tillämpats eller skrivits tillbaka.
     Bara då får blur läsa fältet. Runda 1: skrev man 537 + Enter och
     tryckte + flyttade tryckets mousedown fokus, blur läste fältets gamla
     "537" och tog tillbaka centimetern, så första trycket försvann. */
  let vidFokus = S[k], smutsig = false;
  const skrivFalt = () => { f.value = Math.round(S[k] * 100); smutsig = false; };
  r.addEventListener('input', () => { sattMattVarde(k, +r.value); skrivFalt(); });
  r.addEventListener('change', mattKlart);
  f.addEventListener('focus', () => { vidFokus = S[k]; smutsig = false; f.select(); });
  // medan man skriver: rummet följer så fort talet är ett giltigt mått
  f.addEventListener('input', () => {
    smutsig = true;
    const cm = tolkaCm(f.value, false);
    if (cm >= g.min * 100 && cm <= g.max * 100) sattMattVarde(k, cm / 100);
  });
  const bekrafta = () => {
    if (smutsig) {
      const cm = tolkaCm(f.value);
      if (Number.isFinite(cm)) sattMattVarde(k, cm / 100);
    }
    skrivFalt();                               // klämt till gränserna, eller tillbaka om det var ogiltigt
    if (S[k] !== vidFokus) { vidFokus = S[k]; mattKlart(); }
  };
  f.addEventListener('blur', bekrafta);
  f.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); bekrafta(); f.select(); }
    else if (e.key === 'Escape') {
      // ångra till måttet som gällde när fältet fick fokus
      sattMattVarde(k, vidFokus); skrivFalt(); f.select();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      sattMattVarde(k, S[k] + (e.key === 'ArrowUp' ? 0.01 : -0.01));
      skrivFalt();
    }
  });
  f.addEventListener('keyup', (e) => { if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && S[k] !== vidFokus) { vidFokus = S[k]; mattKlart(); } });

  // − och +: 1 cm per tryck; håller man inne upprepas steget efter 400 ms, allt snabbare
  for (const knapp of r.closest('.reglage').querySelectorAll('[data-steg]')) {
    const riktning = +knapp.dataset.steg;
    let timer = 0, n = 0, aktiv = false, fore = 0;
    const steg = () => { sattMattVarde(k, S[k] + riktning * 0.01); skrivFalt(); };
    const upprepa = () => { steg(); n++; timer = setTimeout(upprepa, n < 8 ? 90 : n < 30 ? 45 : 20); };
    const slapp = () => {
      if (!aktiv) return;
      aktiv = false; clearTimeout(timer);
      if (S[k] !== fore) mattKlart();
    };
    knapp.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 || aktiv) return;
      aktiv = true; n = 0; fore = S[k];
      try { knapp.setPointerCapture(e.pointerId); } catch { /* äldre webbläsare */ }
      steg();
      timer = setTimeout(upprepa, 400);
    });
    for (const ev of ['pointerup', 'pointercancel', 'lostpointercapture']) knapp.addEventListener(ev, slapp);
    // tangentbordet (Enter och mellanslag) ger ett klick utan pekare
    knapp.addEventListener('click', (e) => { if (e.detail === 0) { fore = S[k]; steg(); if (S[k] !== fore) mattKlart(); } });
    knapp.addEventListener('contextmenu', (e) => e.preventDefault());
  }
}
const lutInp = $('lut');
lutInp.addEventListener('input', () => {
  const v = Math.round(+lutInp.value);
  if (v === S.lut) return;
  S.lut = v; pannorHojde = false; normalisera();
  byggINastaRuta(); uppdateraText();
});
lutInp.addEventListener('change', mattKlart);
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

/* ---------- priset ----------
   Mobil: den smala prisraden längst ner följer med medan man väljer och
   göms när summeringens eget pris syns. Dator: "Så räknas det" fälls ut
   som ett kort ovanför summeringen och får panelens höjd som tak. */
const prisbar = $('prisbar'), prisDetaljer = document.querySelector('.pris');
// den övre halvan räknas inte: där ligger den klistrade duken över sidan
if ('IntersectionObserver' in window)
  new IntersectionObserver(([e]) => prisbar.classList.toggle('dold', e.intersectionRatio > 0.5),
    { rootMargin: '-52% 0px 0px 0px', threshold: [0, 0.5, 1] }).observe($('ut-pris'));
function prisKortHojd() {
  const ul = $('prisrader'), panel = document.querySelector('.panel'), sum = document.querySelector('.summering');
  ul.style.maxHeight = innerWidth > 860 ? `${Math.max(120, sum.getBoundingClientRect().top - panel.getBoundingClientRect().top - 20)}px` : '';
}
prisDetaljer.addEventListener('toggle', prisKortHojd);
addEventListener('resize', prisKortHojd);
prisDetaljer.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && prisDetaljer.open) { prisDetaljer.open = false; prisDetaljer.querySelector('summary').focus(); }
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
  history.replaceState(null, '', '#' + hashParametrar().toString());
  try { await navigator.clipboard.writeText(location.href); visaToast('Länken till din design är kopierad'); }
  catch { visaToast('Kopiera länken i adressfältet, den innehåller din design'); }
});

/* En delad länk som klistras in i samma flik byter bara #-delen: då kommer
   ingen ny sidladdning, så designen läses här. replaceState i skrivHash
   utlöser ingen hashchange, alltså ingen slinga. */
function nyHash(ms = 600) {
  clearTimeout(hashTimer);
  Object.assign(S, STANDARD);             // det länken inte nämner får standardvärdet
  lasHash();
  $('led').checked = S.led; $('nat').checked = S.nat;
  tidInp.value = S.tid; fyll(tidInp);
  lamellInp.value = Math.round(S.lamell * 100); fyll(lamellInp);
  byggKo = false; byggRum(); tillampaFarg(); tillampaGlas(); sattSol(); uppdateraText();
  sattVy(vy, ms);
}
addEventListener('hashchange', () => nyHash());

/* ---------- boka hembesök ----------
   Förfrågan skickas med Web3Forms och demonyckeln, precis som
   hemsideförslagen: den landar hos Bahko Byrå tills Alltfix har en egen
   nyckel. Kvittot påstår aldrig att något skickats om anropet föll. */
const DEMO_NYCKEL = '38db5da0-8af0-4b31-bcdc-a840e84e5764';
const modal = $('modal'), form = $('form'), kvitto = $('kvitto'), formfel = $('formfel');
let fokusFore = null;
function oppnaModal() {
  fokusFore = document.activeElement;
  const pris = prisNu();
  $('designrad').innerHTML = 'Din design: ' + sammanfattning()
    + `<br>Uppskattat pris: <b>${kronor(pris.total)}</b>${TESTPRISER ? ' (testpriser, slutpris efter hembesök)' : ''}`;
  form.hidden = false; kvitto.hidden = true; formfel.hidden = true;
  modal.hidden = false;
  setTimeout(() => form.querySelector('input[name="namn"]').focus(), 30);
}
function stangModal() { modal.hidden = true; if (fokusFore) fokusFore.focus(); }
$('boka').addEventListener('click', oppnaModal);
for (const b of document.querySelectorAll('[data-boka]')) b.addEventListener('click', oppnaModal);
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
    const pris = prisNu();
    const prisText = `${kronor(pris.total)}${TESTPRISER ? ' (testpriser)' : ''}`;
    data.set('design', sammanfattning(false) + ` · fronten mot ${RIKT_ORD[S.rikt]} · uppskattat pris ${prisText}`);
    data.set('pris', prisText + ': ' + pris.rader.map((r) => `${r.text} ${kronor(r.kr)}`).join(', '));
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
// med Alltfix riktiga priser (TESTPRISER = false) står bara förbehållet kvar
$('testnot').textContent = TESTPRISER ? 'Testpriser i prototypen – Alltfix egna priser läggs in. Slutpris efter hembesök.' : 'Slutpris efter hembesök.';
tillampaFarg(); tillampaGlas();
byggRum();
sattSol();
uppdateraText();
kontrollLage('ute');

/* Ritprogrammen byggs bakom laddskärmen, så första tryck på ett val
   aldrig hackar: dag och natt, alla takformer, kanalplastens genomskinliga
   struktur och golven, med och utan nät. */
(function varmUpp() {
  const spara = { ...S };
  const kombinationer = [
    { form: 'plant', tak: 'lamell', nat: true, tid: 15 }, { form: 'plant', tak: 'lamell', nat: true, tid: 22.5 },
    { form: 'pulpet', tak: 'glas', golv: 'parkett', nat: true, tid: 15 }, { form: 'pulpet', tak: 'glas', golv: 'parkett', nat: true, tid: 22.5 },
    { form: 'sadel', tak: 'kanalplast', golv: 'klinker', nat: true, tid: 15 }, { form: 'sadel', tak: 'kanalplast', golv: 'klinker', nat: true, tid: 22.5 },
    { form: 'pulpet', tak: 'takpannor', lut: 20, nat: true, tid: 15 },
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
    program: renderare.info.programs ? renderare.info.programs.length : null, geometrier: renderare.info.memory.geometries,
    ljus: (() => { let n = 0; scen.traverse((o) => { if (o.isLight) n++; }); return n; })() }),
  sattOppen: (v) => { oppen = v; oppenMal = v > 0.5 ? 1 : 0; tillampaOppen(v); uppdateraSkuggor(); uppdateraText(); },
  sattVy: (v) => sattVy(v, 0),
  bilder: () => renderare.info.render.frame,
  tick: (ms) => { virtuellTid += ms; stegRuta(false); return virtuellTid; },
  byggtid: (n = 10) => { const t0 = performance.now(); for (let i = 0; i < n; i++) byggRum(); return +((performance.now() - t0) / n).toFixed(2); },
  satt: (k, v) => { const el = document.querySelector(`[data-grupp="${k}"] [data-varde="${v}"]`); if (el) el.click(); },
  /* Mått i meter (h valfri); rummet byggs och ramas om direkt. */
  sattMatt: (b, d, h) => {
    if (b != null) S.b = klamMatt('b', b); if (d != null) S.d = klamMatt('d', d); if (h != null) S.h = klamMatt('h', h);
    normalisera(); byggKo = false; byggRum(); uppdateraText(); sattVy(vy, 0);
  },
  /* Taklutning i grader, genom samma väg som reglaget. */
  sattLut: (v) => { const r = document.getElementById('lut'); r.value = v; r.dispatchEvent(new Event('input')); r.dispatchEvent(new Event('change')); return S.lut; },
  pris: () => prisNu(),
  hus: () => husVagg,
  /* Kameran till en viss punkt, för närbilder i granskningen (zoomspärren släpps). */
  kamera: (pos, mal, fov = kamera.fov) => {
    kontroller.minDistance = 0.05; kontroller.maxDistance = 200; kontroller.minPolarAngle = 0; kontroller.maxPolarAngle = Math.PI;
    flytta(new THREE.Vector3(...pos), new THREE.Vector3(...mal), 0, null, fov);
  },
  matt: () => ({ ...rumMatt }),
  hash: () => hashParametrar().toString(),
  lasHash: (h) => { history.replaceState(null, '', '#' + String(h).replace(/^#/, '')); nyHash(0); return { ...S }; },
  oppna: () => document.getElementById('oppna').click(),
  /* Rita nu och vänta in grafikkortet. I testmiljön renderar SwiftShader på
     processorn, och en skärmdump utan det här visade en bildruta flera sekunder gammal. */
  synka: () => { kontroller.update(); renderare.render(scen, kamera); placeraEtiketter(); const gl = renderare.getContext(); const px = new Uint8Array(4); gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px); return true; },
  /* Var hamnar rummets hörn på duken, jämfört med den fria ytan? */
  ram: () => { const l = projiceradLada(rumHorn()); return { rum: [l.x0, l.y0, l.x1, l.y1].map(Math.round), fri: friYta(), hinder: hinder().map((r) => [r.x0, r.y0, r.x1, r.y1].map(Math.round)) }; },
  klar: true,
};
