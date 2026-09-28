import * as THREE from 'three';
import { OrbitControls } from './vendor/OrbitControls.js';
import { RoomEnvironment } from './vendor/RoomEnvironment.js';
import { berakna, kronor, skillnad, ytor, PRISLAGE, GRUNDVAL } from './pris.js';

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
/* Väggarna vägg för vägg (Rami 2026-09-28): vänster gavel, front och höger
   gavel; baksidan är huset. Varje vägg är glas, trä eller fasad. */
const VAGGAR = ['vv', 'vf', 'vh'];
const VAGGNAMN = { vv: 'Vänster gavel', vf: 'Front', vh: 'Höger gavel' };
const MATERIAL = { glas: 'Glas', tra: 'Trävägg', fasad: 'Fasadvägg' };
const MATERIAL_KORT = { glas: 'glas', tra: 'trä', fasad: 'fasad' };
const VAGG_KORT = { vv: 'Vänster', vf: 'Front', vh: 'Höger' };
const INSIDA = { skiva: 'Vit skiva', parlspont: 'Vit pärlspont', tra: 'Träpanel' };
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
  vv: 'glas', vf: 'glas', vh: 'glas', insida: 'skiva', led: true, nat: false, rikt: 'S', tid: 15, lamell: 0.6, lutOnskad: 10 };
/* lutOnskad är lutningen kunden valde. normalisera klämmer S.lut ur den, så
   att lutningen går tillbaka när en gräns släpper (Rami-runda 3: 20° blev 17°
   när djupet ökades, och stod kvar på 17° när djupet minskades igen). */
const STANDARD = { ...S };

/* ---------- husets tak och uterummets tak ----------
   Huset har fast höjd (vägg 3,1 m). Når uterummets tak över husets takfot
   förlängs dess fall bakåt tills det går in i husets takfall (Rami-runda 3:
   förut växte huset med 0,6–3 m). Takfallet på husets långsida går från
   takfoten i z = 0,55 upp till nocken i z = -4; talen är samma som byggHus. */
const Y0 = 0.18;           // altangolvets ovankant
const UT = 0.14;           // utsprång för täta tak
const HUS_VAGG = 3.1;
const HUS_TF = HUS_VAGG - 0.1;                  // takfoten, 10 cm under väggens överkant
const HUS_DZ = 4.55, HUS_DY = 2.28;
const HUS_TAN = HUS_DY / HUS_DZ, HUS_COS = HUS_DZ / Math.hypot(HUS_DZ, HUS_DY);
const HUS_KANT = 0.55;                          // takfallets framkant
/* Takfallets ovansida och undersida över marken, som funktion av z. */
const husTopp = (z) => HUS_TF + HUS_DY / 2 + 0.08 + 0.08 / HUS_COS - (z + (4 - HUS_KANT) / 2) * HUS_TAN;
const husUnder = (z) => husTopp(z) - 0.16 / HUS_COS;
const HUS_NOCK = husTopp(-4);
const NOCK_GRANS = HUS_NOCK - 0.3;              // uterummets högsta punkt stannar minst 30 cm under husets nock
/* Pulpettaket fortsätter högst så här långt in över husets tak, räknat bakom
   husväggen. Rami-runda 3: utan gräns låg det 2–3,7 m upp på husets tak, med
   vindskiva och sidoplåt längs hela sträckan. Värdet stäms av med Alltfix. */
const FORL_MAX = 1.0;
const RANNA_UNDER = HUS_VAGG - 0.29;            // hängrännans underkant

/* Uterummets tak som en linje i z: c0 är takets högsta ovankant vid husväggen
   (z = 0), s hur mycket den stiger per meter bakåt, kant0 ovankanten längs
   sidorna. Samma tal som byggRum bygger med. */
function takLinje(o = S) {
  const a = o.form === 'plant' ? 0 : o.lut * D2R, t = Math.tan(a), c = Math.cos(a);
  const tatt = !!TATT[o.tak];
  const TJ = o.tak === 'takpannor' ? 0.07 : o.tak === 'takpapp' ? 0.05 : 0;
  const tS = tatt ? TJ : o.tak === 'kanalplast' ? 0.016 : 0.012;
  const topFram = Y0 + o.h;
  if (o.form === 'pulpet') {
    const y = topFram + o.d * t + (tatt ? TJ + 0.02 : 0.04) / c;
    return { c0: y, s: t, kant0: y };
  }
  if (o.form === 'sadel') {
    const nock = topFram + (o.b / 2) * t;
    return { c0: nock + (tS + 0.03) / c, s: 0, kant0: topFram - (tatt ? UT * t : 0) + tS / c };
  }
  const y = topFram + (tatt ? TJ + 0.03 : 0);
  return { c0: y, s: 0, kant0: y };
}
/* Var går uterummets tak in i husets takfall? z < 0 betyder att fallet
   förlängs in över husets tak; höjden där är rummets högsta punkt. */
function takMote(o = S) {
  const l = takLinje(o);
  const z = (husTopp(0) - l.c0) / (HUS_TAN - l.s);
  return { ...l, z, hogst: z < 0 ? l.c0 - z * l.s : l.c0 };
}

/* Går uterummets tak in i husets hängränna? Samma tal som byggRum kapar
   rännan efter, men räknat ur valen, så att noten under lutningen stämmer
   också innan rummet hunnit byggas om (Rami-runda 3: noten låg ett steg efter). */
function ansluter(o = S) {
  const m = takMote(o);
  return m.c0 - 0.66 * m.s > RANNA_UNDER - 0.01;
}
/* Går taket för högt: över husets nock, eller pulpettaket mer än FORL_MAX
   upp på husets tak? Svaret är gränsen som slår till, annars null. */
function forHogt(o = S) {
  const m = takMote(o);
  if (m.hogst > NOCK_GRANS) return 'nock';
  return o.form === 'pulpet' && -m.z > FORL_MAX ? 'forl' : null;
}

/* Hur långt uterummets tak fortsätter bakom husväggen, in i husets takfall:
   tills ovankanten ligger 3 cm inne i husets tak. Samma tal i bygget och priset. */
function forlangning(o = S) {
  if (o.form === 'plant') return 0;
  const m = takMote(o);
  return Math.max(0, -(husTopp(0) - 0.03 - m.c0) / (HUS_TAN - m.s));
}

/* Lutningens gränser för formen just nu, eller null för plant tak. */
function lutGranser(o = S) {
  const g = LUT[o.form];
  if (!g) return null;
  return { min: o.tak === 'takpannor' ? Math.max(g.min, PANNOR_MIN) : g.min, max: g.max };
}
/* Brantaste hela grad där taket fortfarande stannar under husets nock (och
   pulpettaket inom FORL_MAX på husets tak). */
function lutNockMax(o = S) {
  const g = lutGranser(o);
  if (!g) return null;
  let v = g.max;
  while (v > g.min && forHogt({ ...o, lut: v })) v--;
  return v;
}
/* Håller ihop valen: täckningen måste finnas för formen och lutningen ligga
   inom formens och pannornas gränser, och taket stanna under husets nock.
   Anropas efter lasHash, varje val och varje mått. Med ett annat objekt än S
   räknas en kopia (knapparnas tilläggspris), utan att röra panelens noter. */
let pannorHojde = false;    // lutningen lyftes till 14° för att pannor valdes
let hojdSankt = false;      // höjden sänktes för att taket annars gått över husets nock
function normalisera(o = S) {
  const egen = o === S;
  if (!har(FORM, o.form)) o.form = 'plant';
  if (!TAK_FOR[o.form].includes(o.tak)) o.tak = TAK_FOR[o.form][0];
  if (!har(GOLV, o.golv)) o.golv = 'trall';
  for (const k of VAGGAR) if (!har(MATERIAL, o[k])) o[k] = 'glas';
  if (!har(INSIDA, o.insida)) o.insida = 'skiva';
  for (const k in MATT) o[k] = klamMatt(k, Number.isFinite(o[k]) ? o[k] : (MATT[k].min + MATT[k].max) / 2);
  const g = lutGranser(o);
  if (egen) hojdSankt = false;
  if (g) {
    const onskad = Number.isFinite(o.lutOnskad) ? o.lutOnskad : o.lut;
    let v = Math.round(Number.isFinite(onskad) ? onskad : LUT[o.form].std);
    if (egen && v < g.min && o.tak === 'takpannor' && v >= LUT[o.form].min) pannorHojde = true;
    o.lut = Math.min(lutNockMax(o), Math.max(g.min, v));
    // redan brantast tillåtna lutning och ändå över nocken: sänk höjden
    while (forHogt(o) && o.h > MATT.h.min) { o.h = klamMatt('h', o.h - 0.01); if (egen) hojdSankt = true; }
  }
  if (egen && o.tak !== 'takpannor') pannorHojde = false;
  return o;
}

/* Delad länk: hela designen ligger i adressens #-del. Mått skrivs i meter
   med hela centimeter (5.37); ett tal över 20 läses som centimeter. */
function hashParametrar() {
  return new URLSearchParams({ b: S.b, d: S.d, h: S.h, form: S.form, lut: S.lut, tak: S.tak, golv: S.golv, vagg: S.vagg,
    vv: S.vv, vf: S.vf, vh: S.vh, ins: S.insida, farg: S.farg, glas: S.glas, led: S.led ? 1 : 0, nat: S.nat ? 1 : 0, rikt: S.rikt, tid: S.tid, lamell: Math.round(S.lamell * 100) });
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
  // väggarna och insidan: gamla länkar saknar dem och får glas och vit skiva; ogiltigt blir också det
  for (const k of VAGGAR) S[k] = har(MATERIAL, p.get(k)) ? p.get(k) : 'glas';
  S.insida = har(INSIDA, p.get('ins')) ? p.get('ins') : 'skiva';
  // gamla länkar saknar form: glastaket lutade, lamelltaket var plant
  if (har(FORM, p.get('form'))) S.form = p.get('form');
  else if (p.has('tak')) S.form = S.tak === 'lamell' || S.tak === 'takpapp' ? 'plant' : 'pulpet';
  const lu = parseFloat(p.get('lut'));
  S.lut = S.lutOnskad = Number.isFinite(lu) ? lu : LUT[S.form] ? LUT[S.form].std : S.lut;
  const f = p.get('farg'); if (FARGER.some((x) => x.id === f)) S.farg = f;
  if (p.has('led')) S.led = p.get('led') === '1';
  if (p.has('nat')) S.nat = p.get('nat') === '1';
  const l = parseFloat(p.get('lamell')); if (Number.isFinite(l)) S.lamell = Math.min(1, Math.max(0, l / 100));
  normalisera();
  pannorHojde = false; hojdSankt = false;      // en delad länk har redan sin lutning
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
  // täta väggar: vitmålad liggande träpanel som på Alltfix bygge (Ramis foto), fasadväggen är husets egen M.fasad
  traVagg: new THREE.MeshStandardMaterial({ color: 0xf4f3ee, roughness: 0.7 }),
  // invändig beklädnad på täta väggar och innertak
  insSkiva: new THREE.MeshStandardMaterial({ color: 0xf1f0eb, roughness: 0.82 }),
  insParlspont: new THREE.MeshStandardMaterial({ color: 0xf6f5f0, roughness: 0.6 }),
  insTra: new THREE.MeshStandardMaterial({ color: 0xdcc096, roughness: 0.62 }),     // ljus furu
  // vald vägg blinkar till i guld; träffytorna för klick i bilden ritas aldrig
  markering: new THREE.MeshBasicMaterial({ color: 0xc5a572, transparent: true, opacity: 0.38, depthWrite: false, side: THREE.DoubleSide }),
  // på en vit tät vägg syntes 0,38 knappt (runda 3: medelfärgen ändrades 3/−2/−14)
  markeringTat: new THREE.MeshBasicMaterial({ color: 0xc5a572, transparent: true, opacity: 0.62, depthWrite: false, side: THREE.DoubleSide }),
  traff: new THREE.MeshBasicMaterial({ visible: false, side: THREE.DoubleSide }),
};
const INS_MAT = { skiva: M.insSkiva, parlspont: M.insParlspont, tra: M.insTra };
/* Kanalplastens skuggdjup: hälften av skuggkartans punkter, se byggRum. */
const KANAL_SKUGGA = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, alphaHash: true, opacity: 0.5 });

/* ---------- ytstruktur ur världskoordinaten ----------
   Samma teknik som planlösningen: ETT program för alla strukturerade ytor,
   typen skickas som uniform. Fasadpanelen följer väggens riktning via
   världsnormalen, så gavlarna får stående panel även de. */
const TYPER = { panel: 1, dack: 2, gras: 3, sten: 4, matta: 5, takpanna: 6, parkett: 7, pannor: 8, kanal: 9, klinker: 10,
  liggande: 11, parlspont: 12, trapanel: 13, skiva: 14 };
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
  } else if (uTyp == 11) {
    // vitmålad liggande panel, 12 cm: en skuggfog under varje bräda
    if (abs(vNormW.y) < 0.5) {
      float p = vVarld.y / 0.12;
      // bredare och mörkare skuggfog än fasadens stående panel, så trä och fasad skiljs åt (runda 3)
      m *= 1.0 - 0.62 * smoothstep(0.72, 1.0, 1.0 - fract(p));
      m *= 0.92 + 0.08 * fract(p);
      m *= 0.98 + 0.03 * fract(sin(floor(p) * 12.9898) * 43758.5453);
    }
  } else if (uTyp >= 12) {
    // insidan: stående bräder på väggarna, i fallets riktning i innertaket
    bool tak = abs(vNormW.y) >= 0.5;
    float u = tak ? (abs(vNormW.x) > abs(vNormW.z) ? vVarld.z : vVarld.x) : (abs(vNormW.x) > 0.5 ? vVarld.z : vVarld.x);
    float l = tak ? (abs(vNormW.x) > abs(vNormW.z) ? vVarld.x : vVarld.z) : vVarld.y;
    if (uTyp == 12) {
      // pärlspont: 9,5 cm bräder med fog i skarven och en pärla mitt på
      float f = fract(u / 0.095);
      m *= 1.0 - 0.3 * smoothstep(0.9, 1.0, f) - 0.14 * (1.0 - smoothstep(0.012, 0.04, abs(f - 0.5)));
    } else if (uTyp == 13) {
      // träpanel i ljus furu: 12 cm bräder, olika toner och ådring längs brädan
      float p = u / 0.12, ri = floor(p), f = fract(p);
      m *= 1.0 - 0.3 * smoothstep(0.92, 1.0, f);
      m *= 0.88 + 0.16 * fract(sin(ri * 12.9898) * 43758.5453);
      m *= 0.94 + 0.06 * sin(l * 7.0 + sin(f * 5.0 + ri * 1.7) * 2.2 + ri);
    } else {
      // vit skiva: skarvar var 1,2 m
      m *= 1.0 - 0.1 * smoothstep(0.988, 1.0, fract(u / 1.2));
    }
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
  ['papp', 'matta'], ['pannor', 'pannor'], ['kanal', 'kanal'], ['parkett', 'parkett'], ['klinker', 'klinker'],
  ['traVagg', 'liggande'], ['insSkiva', 'skiva'], ['insParlspont', 'parlspont'], ['insTra', 'trapanel']]) strukturera(M[k], t);

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
   Huset har alltid samma höjd. Går uterummets tak in i husets takfot kapas
   hängrännan och vindskivan över uterummets bredd, och når uterummets
   innertak över takfotens undersida kapas också takutsprånget där (snitt). */
const HUS_B = 14;
const hus = new THREE.Group();
scen.add(hus);
let husSnitt = null;
function byggHus(snitt = { ranna: 0, vind: 0, over: 0 }) {
  const nyckel = `${snitt.ranna.toFixed(3)}|${snitt.vind.toFixed(3)}|${snitt.over.toFixed(3)}`;
  if (nyckel === husSnitt) return;
  husSnitt = nyckel;
  hus.traverse((o) => { if (o.userData.egenGeo) o.geometry.dispose(); });
  hus.clear();
  const vH = HUS_VAGG;
  const profil = new THREE.Shape();
  profil.moveTo(0, 0); profil.lineTo(0, vH); profil.lineTo(4, vH + 2.15); profil.lineTo(8, vH); profil.lineTo(8, 0); profil.closePath();
  const kropp = new THREE.Mesh(new THREE.ExtrudeGeometry(profil, { depth: HUS_B, bevelEnabled: false }), M.fasad);
  kropp.rotation.y = Math.PI / 2;           // formens x blir världens -z, extruderingen blir x
  kropp.position.x = -HUS_B / 2;
  kropp.castShadow = true; kropp.receiveShadow = true;
  kropp.userData.egenGeo = true;
  hus.add(kropp);
  hus.add(box(M.sockel, HUS_B + 0.04, 0.42, 8.04, 0, 0.21, -4));
  // en låda längs långsidan, delad med ett glapp på ±g där uterummets tak går in
  const B2 = (HUS_B + 0.8) / 2;
  const langs = (m, h, d, y, z, g, rot = 0) => {
    const delar = g > 0 ? [[-B2, -g], [g, B2]] : [[-B2, B2]];
    for (const [x0, x1] of delar) { const o = box(m, x1 - x0, h, d, (x0 + x1) / 2, y, z); o.rotation.x = rot; hus.add(o); }
  };
  // takfall med utsprång; takfoten ligger 10 cm under väggens överkant
  const tf = HUS_TF;
  const dz = HUS_DZ, dy = HUS_DY, L = Math.hypot(dz, dy), a = Math.atan2(dy, dz);
  langs(M.tak, 0.16, L, tf + dy / 2 + 0.08, (HUS_KANT - 4) / 2, snitt.over, a);
  if (snitt.over > 0) {
    /* Över uterummet börjar takfallet vid husväggen. Lådans ände står
       vinkelrätt mot fallet, så dess övre framkant låg 3,6 cm ute i rummet och
       syntes inifrån som ett mörkt band (Rami-runda 3). Lådan kortas i
       framänden så att hela änden ligger i husväggen, z ≤ 0. */
    const kort = 0.08 * Math.tan(a) + 0.004, Lm = 4 / HUS_COS - kort;
    const zc = -2 - (kort / 2) * HUS_COS;
    const mitt = box(M.tak, 2 * snitt.over, 0.16, Lm, 0, tf + dy / 2 + 0.08 - (zc - (HUS_KANT - 4) / 2) * HUS_TAN, zc);
    mitt.rotation.x = a; hus.add(mitt);
  }
  const bak = box(M.tak, HUS_B + 0.8, 0.16, L, 0, tf + dy / 2 + 0.08, -4 - (4 + HUS_KANT) / 2);
  bak.rotation.x = -a; hus.add(bak);
  hus.add(box(M.tak, HUS_B + 0.8, 0.12, 0.3, 0, vH + 2.26, -4));
  langs(M.vitt, 0.22, 0.04, tf, 0.57, snitt.vind);           // vindskiva
  langs(M.sockel, 0.1, 0.12, vH - 0.24, 0.6, snitt.ranna);   // hängränna
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
const P = 0.09;            // stolpens sida
const rum = new THREE.Group();
scen.add(rum);
let sektioner = [];         // glaspartier som kan öppnas
let lamellMesh = null, lamellData = [];
let natGrupp = null, ledGrupp = null, natLista = [];
let mattPunkter = [], mattPunkterOvan = [];   // ovanifrån sitter etiketterna i takets höjd, bredvid taket
let rumMatt = null;         // höjder och gränser, till inramningen
let markeringar = {};       // en yta per vägg: guldskimret när väggen väljs, och träffytan för klick i bilden
let anslutning = false;     // uterummets tak går in i husets takfot
let markerad = null, markerTimer = 0;   // väggen som skimrar i guld just nu
let ledBak = null;          // pulpettakets fall, där spotarna mot huset sitter
let tataVaggar = [];        // täta väggars ytterbeklädnad: måttetiketter bakom dem tonas ned
let materialPunkter = [];   // var materialet står på varje vägg i bilden

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

/* Polygon [[u, y], ...] till en Shape, utan punkter som sammanfaller. */
function form2d(pts) {
  const f = new THREE.Shape();
  pts.filter((q, i) => i === 0 || Math.hypot(q[0] - pts[i - 1][0], q[1] - pts[i - 1][1]) > 1e-4)
    .forEach(([u, y], i) => (i ? f.lineTo(u, y) : f.moveTo(u, y)));
  f.closePath();
  return f;
}
/* En tät vägg i väggens eget koordinatsystem (samma som sektion: lokal x
   längs väggen, lokal z ut från rummet, z = 0 i väggens yttersida).
   delar: polygoner i (u, y). Ytterbeklädnaden är 10,5 cm och den
   invändiga beklädnaden 12 mm innanför, i kundens val (Insida). */
function tatVagg(forald, mat, delar) {
  const geo = new THREE.ExtrudeGeometry(delar.map(form2d), { depth: 1, bevelEnabled: false });
  const yttre = new THREE.Mesh(geo, mat); yttre.scale.z = 0.105; yttre.position.z = -0.105;
  const inre = new THREE.Mesh(geo, INS_MAT[S.insida]); inre.scale.z = 0.012; inre.position.z = -0.117;
  for (const o of [yttre, inre]) { o.castShadow = true; o.receiveShadow = true; o.userData.egenGeo = true; forald.add(o); }
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
  const TJ = tak === 'takpannor' ? 0.07 : tak === 'takpapp' ? 0.05 : 0;     // den täta skivans tjocklek
  const hogst = form === 'sadel' ? nock + (tatt ? TJ / Math.cos(a) + 0.06 : 0.07)
    : form === 'pulpet' ? topBak + (tatt ? TJ / Math.cos(a) + 0.03 : 0.045)
    : topFram + (tatt ? TJ + 0.03 : 0);
  /* Mot husets tak: går uterummets tak över husets takfall förlängs det
     bakåt tills ovankanten ligger 3 cm inne i husets tak (z-bufferten gör
     skärningen). forl är förlängningen i meter bakom husväggen. */
  const mote = takMote();
  const forl = forlangning();
  rumMatt = { W, D, topBak: Math.max(hogst, mote.hogst + 0.05), topFram, nock, zBak: -forl };   // topBak: rummets högsta punkt, till inramningen
  markeringar = {};

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
  if (mitt && S.vf === 'glas') stolpe(0, D - P / 2, frontH);     // en tät front bär balken själv
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
      rum.add(box(INS_MAT[S.insida], W - 0.02, 0.012, D - 0.02, 0, topFram - 0.006, D / 2));   // innertak i kundens beklädnad
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
    const Lx = L + forl / Math.cos(a);                                     // täckningen, förlängd in i husets tak
    if (tatt) {
      skiva(fall, TACK[tak], W + 2 * UT, TJ, Lx + UT + vid(TJ), 0, TJ / 2, (-Lx - vid(TJ) + UT) / 2);
      del(INS_MAT[S.insida], W - 0.02, 0.012, -0.012, -L, 0);            // innertak på sparrarna, i kundens beklädnad
      for (const s of [-1, 1]) del(M.vitt, 0.025, 0.2, TJ + 0.02 - 0.2, -Lx - vid(TJ + 0.02), UT + 0.025, s * (W / 2 + UT + 0.0125));
      fall.add(box(M.vitt, W + 2 * UT + 0.05, 0.16, 0.025, 0, TJ + 0.01 - 0.08, UT + 0.0125));
      kant = UT + 0.025;
    } else {
      skiva(fall, TACK[tak], W - 0.02, tS, Lx + vid(tS), 0, tS / 2, (-Lx - vid(tS)) / 2);
      // kantprofilerna 2 mm längre än skivan i fronten: inga ändytor i samma plan
      if (kanal) for (const s of [-1, 1]) del(M.profil, 0.05, 0.035, 0.0025, -Lx - vid(0.0375), 0.002, s * (W / 2 - 0.025));
    }
    // anslutningsplåt mot husväggen över täckningens övre ände (förlängt tak: den sitter inne i husets tak)
    if (!forl) del(M.profil, W + (tatt ? 2 * UT : 0), 0.012, tS, -L - vid(tS + 0.012), -L + 0.08);
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
      // förlängt tak: täckningen fortsätter forl bakom husväggen, in i husets takfall
      if (tatt) {
        // skivan och nockpannan förlängs förbi nocken så att fallens ovankanter möts i en spets
        skiva(fall, TACK[tak], Ls + UT + vid(TJ), TJ, D + UT + forl, s * (Ls + UT - vid(TJ)) / 2, TJ / 2, (D + UT - forl) / 2);
        del(INS_MAT[S.insida], 0, Ls, 0.012, -0.012, D, D / 2);                             // innertak på sparrarna, i kundens beklädnad
        del(TACK[tak], -vid(TJ + 0.03), 0.13, 0.03, TJ, D + UT + forl, (D + UT - forl) / 2);   // nockpanna
        // vindskiva längs gavelns kant, spetsig i nocken, och takfotsbräda längs sidan
        del(M.vitt, -vid(TJ + 0.02), Ls + UT + 0.01, 0.2, TJ + 0.02 - 0.2, 0.025, D + UT + 0.0125);
        fall.add(box(M.vitt, 0.025, 0.16, D + UT + 0.025 + forl, s * (Ls + UT + 0.0125), TJ + 0.01 - 0.08, (D + UT + 0.025 - forl) / 2));
      } else {
        skiva(fall, TACK[tak], Ls + vid(tS), tS, D - 0.02 + forl, s * (Ls - vid(tS)) / 2, tS / 2, (D - forl) / 2);
        // kantprofilen 2 mm längre än skivan vid takfoten: inga ändytor i samma plan
        if (kanal) del(M.profil, -vid(0.0375), Ls + 0.002, 0.035, 0.0025, 0.05, D - 0.025);
        del(M.profil, -vid(tS + 0.03), 0.07, 0.03, tS, D + forl, (D - forl) / 2);             // nockprofil
      }
      // ränna längs sidan, under takfoten
      const kant = tatt ? UT + 0.025 : 0;
      const xE = W / 2 + kant * Math.cos(a), yE = topFram - kant * Math.sin(a);
      rum.add(box(M.profil, 0.12, 0.09, D + (tatt ? UT + 0.03 : 0.04), s * (xE + 0.05), yE - (tatt ? 0.12 : 0.02), (D + (tatt ? UT : 0)) / 2));
    }
  }

  /* Väggarna vägg för vägg. Varje vägg har en ram: lokal x längs väggen,
     lokal z ut från rummet, z = 0 i stolparnas yttersida. Glasväggar får
     partier och gavelglas, täta väggar byggs av trä eller fasad från golvet
     upp till balken, och gaveln ovanför följer väggens material. */
  const hBot = Y0 + 0.03;
  const hTop = topFram - BH - 0.03;
  const t = Math.tan(a), c = Math.cos(a);
  const glas = (k) => S[k] === 'glas';
  const ram = {
    vf: [new THREE.Vector3(-W / 2, 0, D), 0, W],
    vh: [new THREE.Vector3(W / 2, 0, D), Math.PI / 2, D],
    vv: [new THREE.Vector3(-W / 2, 0, 0), -Math.PI / 2, D],
  };
  // userData.vagg: ett klick i bilden som träffar något i gruppen väljer den väggen
  const ramGrupp = (k, inne = 0) => {
    const [pos, rot] = ram[k], g = new THREE.Group();
    g.position.copy(pos); g.rotation.y = rot; g.translateZ(-inne); g.userData.vagg = k; rum.add(g); return g;
  };
  // sidornas överkant över golvet som funktion av z: under sparren (pulpet) eller sidobalken
  const sidTopp = (z) => (form === 'pulpet' ? topFram - BH / c + (D - z) * t : topFram - BH);
  /* Ytterbeklädnaden på en tät gavel går ända upp till takets undersida, över
     sparren eller sidobalken. Runda 3: den slutade under sparren, och en mörk
     profilremsa syntes mellan den vita väggen och den vita vindskivan. */
  const kladTopp = (z) => (form === 'pulpet' ? topFram + (D - z) * t : topFram);
  const hogerU = (z) => D - z;                     // höger gavels u räknas från fronten, vänster från huset
  if (S.vagg !== 'oppen' || S.nat) {
    if (glas('vf')) {
      const front = ramGrupp('vf', 0.07);
      if (mitt) { sektion(front, P, W / 2 - P / 2, 'start', hBot, hTop); sektion(front, W / 2 + P / 2, W - P, 'slut', hBot, hTop); }
      else sektion(front, P, W - P, 'slut', hBot, hTop);
    }
    if (glas('vh')) sektion(ramGrupp('vh', 0.07), P, D - 0.06, 'slut', hBot, hTop);
    if (glas('vv')) sektion(ramGrupp('vv', 0.07), 0.06, D - P, 'start', hBot, hTop);
    if (S.vagg === 'oppen') for (const s of sektioner) s.paneler.length = 0;
  }
  const VAGG_MAT = { tra: M.traVagg, fasad: M.fasad };
  const TK = 0.034;                                // beklädnaden och hörnbrädan utanpå stommen
  tataVaggar = [];
  for (const k of VAGGAR) {
    if (glas(k)) continue;
    const delar = [];
    if (k === 'vf') {
      delar.push([[P, Y0], [W - P, Y0], [W - P, topFram - BH], [P, topFram - BH]]);
      if (form === 'sadel') {
        // gaveltriangeln över frontbalken, under sparrarna och nockbalken
        const spets = nock - BH / c, xk = Math.min(W / 2 - P, (spets - topFram) / t), yk = spets - xk * t;
        delar.push([[W / 2 - xk, topFram], [W / 2 + xk, topFram], [W / 2 + xk, yk], [W / 2, spets], [W / 2 - xk, yk]]);
      }
    } else {
      // gavlarna mellan husets väggprofil (z = 0,06) och hörnstolpen
      const [z0, z1] = [0.06, D - P];
      delar.push(k === 'vh'
        ? [[hogerU(z1), Y0], [hogerU(z0), Y0], [hogerU(z0), sidTopp(z0)], [hogerU(z1), sidTopp(z1)]]
        : [[z0, Y0], [z1, Y0], [z1, sidTopp(z1)], [z0, sidTopp(z0)]]);
    }
    tatVagg(ramGrupp(k, 0.01), VAGG_MAT[S[k]], delar);
    /* Beklädnaden går utanpå stolparna och balken, så väggen läser som en
       hel vägg och inte som fyllning mellan aluminiumprofiler. */
    const g = ramGrupp(k);
    /* Fronten går ut över gavlarnas beklädnad i hörnen där en gavel är tät,
       så att inget mörkt hack syns mellan två täta väggar (runda 3: 3,4 cm). */
    const [fa, fb] = [glas('vv') ? 0 : -TK, glas('vh') ? W : W + TK];
    const klader = k === 'vf'
      ? [[[fa, Y0], [fb, Y0], [fb, topFram], [fa, topFram]], ...delar.slice(1)]
      : [k === 'vh' ? [[0, Y0], [D, Y0], [D, kladTopp(0)], [0, kladTopp(D)]] : [[0, Y0], [D, Y0], [D, kladTopp(D)], [0, kladTopp(0)]]];
    const kl = new THREE.Mesh(new THREE.ExtrudeGeometry(klader.map(form2d), { depth: 0.012, bevelEnabled: false }), VAGG_MAT[S[k]]);
    kl.castShadow = true; kl.receiveShadow = true; kl.userData.egenGeo = true;
    g.add(kl); tataVaggar.push(kl);
    const L0 = k === 'vf' ? W : D;
    if (S[k] === 'fasad') {
      // fasadväggen får husets sockel nedtill, så den läser som huset och inte som en vit trävägg (runda 3)
      g.add(box(M.sockel, (k === 'vf' ? fb - fa : L0), 0.42 - Y0, 0.018, k === 'vf' ? (fa + fb) / 2 : L0 / 2, Y0 + (0.42 - Y0) / 2, 0.021));
    } else {
      /* Vita hörnbrädor över stolparna, som på Alltfix eget bygge (Ramis foto:
         vitmålade stolpar). I ett hörn mot en tät gavel är frontens bräda
         bredare och täcker gavelns beklädnad. */
      const brada = (grp, u, y1, b = 0.1, z0 = 0.012) => grp.add(box(M.vitt, b, y1 - Y0, TK - z0, u, Y0 + (y1 - Y0) / 2, (z0 + TK) / 2));
      if (k === 'vf') { brada(g, (fa + 0.1) / 2, topFram, 0.1 - fa); brada(g, (fb + W - 0.1) / 2, topFram, fb - W + 0.1); }
      else {
        const u = k === 'vh' ? hogerU : (z) => z;
        brada(g, u(D - 0.05), kladTopp(D - 0.05)); brada(g, u(0.05), kladTopp(0.05));
        // en glasfront: hörnstolpens framsida blir också vit, och täcker gavelns kant
        if (glas('vf')) brada(ramGrupp('vf'), k === 'vh' ? W - 0.1 + (0.1 + TK) / 2 : 0.1 - (0.1 + TK) / 2, topFram - BH, 0.1 + TK, 0);
      }
    }
  }
  /* Guldskimret och träffytan: väggens hela kontur från golvet upp till
     taket, en tunn skiva i väggens plan. Samma mesh används för klick i
     bilden (en osynlig mesh träffas ändå av strålen). */
  for (const k of VAGGAR) {
    const [, , L0] = ram[k];
    let pts;
    if (k === 'vf') pts = [[0, Y0], [W, Y0], [W, topFram], ...(form === 'sadel' ? [[W / 2, nock]] : []), [0, topFram]];
    else {
      const kontur = (z) => (form === 'pulpet' ? topFram + (D - z) * t : topFram);
      pts = k === 'vh' ? [[0, Y0], [L0, Y0], [L0, kontur(0)], [0, kontur(D)]] : [[0, Y0], [L0, Y0], [L0, kontur(D)], [0, kontur(0)]];
    }
    const geo = new THREE.ExtrudeGeometry(form2d(pts), { depth: 0.16, bevelEnabled: false });
    const o = new THREE.Mesh(geo, glas(k) ? M.markering : M.markeringTat);
    o.position.z = -0.145; o.renderOrder = 3; o.visible = markerad === k;
    o.userData = { egenGeo: true, vagg: k };
    ramGrupp(k).add(o);
    markeringar[k] = o;
  }
  // gavelglaset ovanför partierna när taket lutar: trianglar på sidorna
  // under pulpettaket, en triangel i fronten under sadeltaket, bara på glasväggar
  // Stående profiler delar gavelglaset i rutor, som partierna under: ingen
  // hantverkare sätter ett glas på 7 × 2 m (runda 1).
  const sprojs = (h, x, y0, z, langsZ) => { if (h > 0.12) rum.add(box(M.profil, langsZ ? 0.04 : 0.05, h, langsZ ? 0.05 : 0.04, x, y0 + h / 2, z)); };
  if (form === 'pulpet' && S.vagg !== 'oppen') {
    const y0 = hTop + 0.04, y1 = topBak - BH - 0.01;
    const f = new THREE.Shape();
    f.moveTo(0, y0); f.lineTo(D, y0); f.lineTo(0, y1); f.closePath();
    const geo = new THREE.ShapeGeometry(f);
    let forst = true;
    for (const [k, x] of [['vv', -W / 2 + 0.07], ['vh', W / 2 - 0.07]]) {
      if (!glas(k)) continue;
      const g = new THREE.Mesh(geo, M.glas);
      g.rotation.y = -Math.PI / 2; g.position.x = x; g.renderOrder = 2;
      g.userData.egenGeo = forst; forst = false;
      rum.add(g);
      sprojs((y1 - y0) / 2, x, y0, D / 2, true);                  // en profil mitt på djupet
    }
    if (forst) geo.dispose();
  }
  if (form === 'sadel' && S.vagg !== 'oppen' && glas('vf')) {
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
  // materialet mitt på varje vägg, på väggens utsida; normalen avgör om väggen vetter mot kameran
  const hM = Y0 + H * 0.62;
  materialPunkter = [
    { k: 'vv', p: new THREE.Vector3(-W / 2 - 0.05, hM, D / 2), n: new THREE.Vector3(-1, 0, 0) },
    { k: 'vf', p: new THREE.Vector3(0, hM, D + 0.05), n: new THREE.Vector3(0, 0, 1) },
    { k: 'vh', p: new THREE.Vector3(W / 2 + 0.05, hM, D / 2), n: new THREE.Vector3(1, 0, 0) },
  ];
  materialPunkter.forEach(({ k }, i) => { materialEl[i].textContent = MATERIAL_KORT[S[k]]; materialEl[i].dataset.m = S[k]; });
  mattEl[0].textContent = `${dec(W, 2)} m`;
  mattEl[1].textContent = `${dec(D, 2)} m`;
  mattEl[2].textContent = `${dec(H, 2)} m`;

  // ovanifrån: etiketterna i takets höjd, utanför takets kant, så de inte ligger ovanpå taket
  const kantUt = (tatt ? UT : 0) + 0.3;
  const yTak = (z) => (form === 'pulpet' ? topFram + (D - z) * t : topFram) + 0.1;
  mattPunkterOvan = [new THREE.Vector3(-W * 0.15, yTak(D), D + kantUt + 0.35), new THREE.Vector3(W / 2 + kantUt + 0.35, yTak(D / 2), D * 0.5),
    new THREE.Vector3(xH - kantUt, Y0 + H * 0.5, zF)];

  /* ---------- anslutningen mot husets tak ----------
     topp(z): takets ovankant mitt på, stomme(z): sparrarnas ovansida, alltså
     innertaket. Går taket in i hängrännan kapas husets ränna och vindskiva
     över uterummet; når innertaket över takfotens undersida kapas också
     husets takutsprång där, så att takfoten aldrig sticker in i rummet. */
  const topp = (z) => mote.c0 - z * mote.s;
  const stomme = (z) => (form === 'pulpet' ? topFram + (D - z) * t : form === 'sadel' ? nock : topFram);
  const kx = W / 2 + (tatt ? UT + 0.025 : 0.04);                 // takets ytterkant med vindskiva eller ränna
  anslutning = ansluter();
  const overKapas = stomme(HUS_KANT) > husUnder(HUS_KANT);
  // sadeltaket sluttar åt sidorna: kapa bara där det faktiskt når upp till rännan och utsprånget
  const halv = (y, grans) => Math.min(kx, form === 'sadel' ? Math.max(0, (y - grans) / t) : kx);
  if (form === 'sadel') {
    /* Sadeltaket: ränna, vindskiva och takutsprång kapas lika brett, där
       takets ovankant når rännan. Runda 3: tre olika bredder lämnade vita och
       mörka hack på båda sidor om nocken, där man såg in under husets takfot.
       Glappet mellan takfallen och husets tak täcks av husets fasad, som om
       väggen fortsatte upp under takfallet. */
    const hw = anslutning ? halv(mote.c0, RANNA_UNDER - 0.01) : 0;
    byggHus({ ranna: hw, vind: hw, over: hw });
    const yt = nock + tS / c - 0.02, topp0 = husTopp(0.04) + 0.02;   // takets ovankant i nocken, lite under; husets tak
    const yx = (x) => yt - Math.abs(x) * t;
    if (hw > 0 && yx(hw) < topp0) {
      const x0 = yt > topp0 ? (yt - topp0) / t : 0;                     // där takfallet går in i husets tak
      const delar = x0 > 0
        ? [[[-hw, yx(hw)], [-x0, topp0], [-hw, topp0]], [[x0, topp0], [hw, yx(hw)], [hw, topp0]]]
        : [[[-hw, yx(hw)], [0, yt], [hw, yx(hw)], [hw, topp0], [-hw, topp0]]];
      const o = new THREE.Mesh(new THREE.ExtrudeGeometry(delar.map(form2d), { depth: 0.02, bevelEnabled: false }), M.fasad);
      o.position.z = 0.004; o.castShadow = true; o.receiveShadow = true; o.userData.egenGeo = true;
      rum.add(o);
    }
  } else {
    byggHus({ ranna: anslutning ? halv(mote.c0, RANNA_UNDER - 0.01) : 0, vind: topp(0.6) > HUS_TF - 0.12 ? halv(mote.c0, HUS_TF - 0.12) : 0,
      over: overKapas ? halv(nock, husUnder(HUS_KANT)) : 0 });
  }
  // sidoplåten: vit som vindskivan på täta tak, annars i husets takfärg (runda 3: ett svart blad på husets tak)
  const sidMat = tatt ? M.vitt : M.tak;
  // plåt över glipan mellan uterummets tak och husets takfall där utsprånget kapats
  if (overKapas && form !== 'sadel' && topp(0.05) < husTopp(0.04)) {
    const y0 = topp(0.05) - 0.02, y1 = husTopp(0.04) + 0.02;
    rum.add(box(M.profil, 2 * kx, y1 - y0, 0.02, 0, (y0 + y1) / 2, 0.05));
  }
  // från sidan: kilen mellan takets kant och husets takfall fylls med en sidoplåt
  const kantUnder = (z) => mote.kant0 - z * mote.s - 0.19;
  if (anslutning && kantUnder(0.59) > husTopp(HUS_KANT)) {
    const zc = (husTopp(0) - mote.kant0 + 0.19) / (HUS_TAN - mote.s);
    const geo = new THREE.ExtrudeGeometry(form2d([[0.59, kantUnder(0.59)], [0.59, husTopp(HUS_KANT)], [zc, husTopp(zc)]]), { depth: 0.025, bevelEnabled: false });
    for (const sx of [-1, 1]) {
      const o = new THREE.Mesh(geo, sidMat);
      o.rotation.y = -Math.PI / 2; o.position.x = sx > 0 ? kx : -kx + 0.025;
      o.castShadow = true; o.receiveShadow = true; o.userData.egenGeo = sx > 0;
      rum.add(o);
    }
  }
  // husväggen fortsätter upp till uterummets tak: annars syns takfotens undersida inifrån
  if (stomme(0) > HUS_VAGG - 0.02) {
    const yb = HUS_VAGG - 0.015;                  // börjar 1,5 cm under husväggens överkant: ingen synlig skarv
    const pts = form === 'sadel'
      ? (topFram >= yb ? [[-W / 2, yb], [W / 2, yb], [W / 2, topFram], [0, nock], [-W / 2, topFram]]
        : [[-(nock - yb) / t, yb], [(nock - yb) / t, yb], [0, nock]])
      : [[-W / 2, yb], [W / 2, yb], [W / 2, stomme(0)], [-W / 2, stomme(0)]];
    // 4 mm tunn mot husväggen: runda 3 såg en tjockare skivas underkant som en grå linje inifrån
    const o = new THREE.Mesh(new THREE.ExtrudeGeometry(form2d(pts), { depth: 0.004, bevelEnabled: false }), M.fasad);
    o.position.z = 0; o.receiveShadow = true; o.userData.egenGeo = true;
    rum.add(o);
  }

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
  } else if (r < 60 && S.vf === 'glas') {
    t = 'Solen lyser rakt in genom fronten. '
      + (S.tak === 'lamell' ? 'Vinkla lamellerna för skugga.' : S.glas === 'tonat' ? 'Det tonade glaset dämpar solen.'
        : S.tak === 'glas' ? 'Tonat glas eller ett tätt tak ger skugga.' : 'Tonat glas dämpar solen genom partierna.');
  } else if (r < 60 && S.vf !== 'glas') {
    t = 'Solen står mot fronten. Den täta frontväggen håller solen ute.';
  } else if (r < 115) {
    t = S.vv === 'glas' || S.vh === 'glas' ? 'Solen faller in från sidan, genom gavelns glas.' : 'Solen står åt sidan. De täta gavlarna ger skugga.';
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
  if (REDUCERAD || ms <= 0) { steg(1); if (klar) klar(); ritaNu(); return null; }
  const a = { t0: nuTid(), ms, steg, klar };
  animationer.add(a); ritaNu();
  return a;
}
/* Partierna stängs när väggarna byggs om eller en ny design läses in. En
   öppning som pågår avbryts, annars öppnade den de nybyggda partierna medan
   knappen sa "Öppna partierna" (runda 3). */
function stangPartier() {
  if (stangPartier.anim) animationer.delete(stangPartier.anim);
  stangPartier.anim = null;
  oppen = 0; oppenMal = 0;
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
    // in genom en glasvägg: höger gavel, annars vänster, annars fronten (runda 3: täta gavlar)
    const sida = S.vh === 'glas' ? 1 : S.vv === 'glas' ? -1 : S.vf === 'glas' ? 0 : 1;
    const yttre = sida ? new THREE.Vector3(sida * (W / 2 + 3.0), Y0 + 1.5, D * 0.75) : new THREE.Vector3(0.4, Y0 + 1.5, D + 3.0);
    const inre = sida ? new THREE.Vector3(sida * (W / 2 + 0.9), Y0 + 1.45, D * 0.32) : new THREE.Vector3(0.3, Y0 + 1.45, D + 0.9);
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
  const { W, D, topBak, zBak } = rumMatt;
  const ut = [];
  // ett tak som förlängts in över husets tak ramas in med sin bakre ände
  for (const x of [-W / 2 - 0.45 - extra, W / 2 + 0.5 + extra]) for (const y of [0, topBak + 0.25]) for (const z of [Math.min(-0.1, zBak - 0.1), D + 1.15 + extra])
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
/* Utifrån tittar kameran snett från höger, så vänster gavel syns inte. Väljs
   en gavel vrids vyn till dess sida (runda 3: en trägavel till vänster såg
   kunden aldrig utan att själv dra runt bilden). Fronten syns från båda. */
let uteSida = 'vh';
/* Inifrån står kameran vid den ena gaveln och tittar mot det främre hörnet
   vid den andra. Är bara vänster gavel tät vänds blicken mot den, så att
   dess insida syns (runda 3: valet av insida syntes inte alls). */
const inneSpegel = () => (S.vv !== 'glas' && S.vh === 'glas' ? -1 : 1);
function vyLage(v) {
  const { W, D } = rumMatt;
  // inramningen räknas med den vyns egen bildvinkel, inte den som råkar gälla nu
  const spara = kamera.fov;
  kamera.fov = VY_FOV[v]; kamera.updateProjectionMatrix();
  let ut;
  const sx = uteSida === 'vv' ? -1 : 1;
  if (v === 'ute') ut = centreraI(new THREE.Vector3(sx * 0.3, 1.25, D * 0.55), new THREE.Vector3(sx * 0.6, 0.52, 1).normalize(), rumHorn());
  else if (v === 'ovan') ut = centreraI(new THREE.Vector3(0.3, 0.2, D * 0.55 + 0.3), new THREE.Vector3(0.0001, 1, 0.3).normalize(), rumHorn(0.1));
  else {
    // från soffan, snett över rummet mot det främre hörnet, lite uppåt så taket syns
    // bredvid soffans gavel, inte ovanför den (runda 1: en vit soffkant i bildens hörn)
    const sp = inneSpegel();
    const pos = new THREE.Vector3(sp * (-W / 2 + 0.42), Y0 + 1.35, Math.min(1.4, Math.max(1.12, D * 0.4)));
    const titta = new THREE.Vector3(sp * (W / 2 - 0.2), Y0 + 1.45, D + 0.5);
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
const materialEl = [0, 1, 2].map(() => { const e = document.createElement('div'); e.className = 'matt mat'; etikettLager.appendChild(e); return e; });
let canvasRekt = null;
const _p = new THREE.Vector3(), _r = new THREE.Vector3(), skymd = new THREE.Raycaster();
/* Ligger en tät vägg mellan kameran och punkten? Då tonas måttet ned, så att
   det inte ser ut att måtta väggen framför (runda 3: djupet stod mitt på fronten). */
function skymsAvVagg(p) {
  if (!tataVaggar.length) return false;
  _r.copy(p).sub(kamera.position);
  const d = _r.length();
  skymd.set(kamera.position, _r.divideScalar(d)); skymd.far = d - 0.05;
  return skymd.intersectObjects(tataVaggar, false).length > 0;
}
function flyttaEtikett(e, p, bw, bh) {
  _p.copy(p).project(kamera);
  const syns = _p.z < 1 && Math.abs(_p.x) < 1.05 && Math.abs(_p.y) < 1.05;
  const x = (_p.x * 0.5 + 0.5) * bw;
  const y = (-_p.y * 0.5 + 0.5) * bh;
  e.style.transform = `translate3d(${Math.round(x - e.offsetWidth / 2)}px, ${Math.round(y - e.offsetHeight / 2)}px, 0)`;
  return syns;
}
function placeraEtiketter() {
  const bw = renderare.domElement.clientWidth, bh = renderare.domElement.clientHeight;
  (vy === 'ovan' ? mattPunkterOvan : mattPunkter).forEach((p, i) => {
    const syns = flyttaEtikett(mattEl[i], p, bw, bh) && vy !== 'inne';
    mattEl[i].style.opacity = !syns ? '0' : skymsAvVagg(p) ? '0.22' : '1';
  });
  const visa = vy === 'ute' && (vaggSekSyns || nuTid() < materialTill);
  materialPunkter.forEach(({ p, n }, i) => {
    const syns = flyttaEtikett(materialEl[i], p, bw, bh) && visa && _r.copy(kamera.position).sub(p).dot(n) > 0.3;
    materialEl[i].style.opacity = syns ? '1' : '0';
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
/* Valen som pris.js räknar på, ur S eller en kopia. */
const valen = (o = S) => ({ b: o.b, d: o.d, h: o.h, form: o.form, lut: o.lut, tak: o.tak, vagg: o.vagg, glas: o.glas, golv: o.golv,
  led: o.led, nat: o.nat, vv: o.vv, vf: o.vf, vh: o.vh, insida: o.insida, forl: forlangning(o) });
const prisNu = (o = S) => berakna(valen(o));   // null tills Alltfix lagt in priser (eller ?priser=test)
const harGlas = (o = S) => VAGGAR.some((k) => o[k] === 'glas');
// något att klä invändigt: en trä- eller fasadvägg, eller ett tätt tak med innertak
const harInsida = (o = S) => ytor(valen(o)).insida > 0;
// glas någonstans: glaspartier i en glasvägg, eller glastaket. Då gäller valet klart eller tonat glas.
const harGlasYta = (o = S) => (harGlas(o) && o.vagg !== 'oppen') || o.tak === 'glas';
/* Grupper som inte gäller med valen just nu. De fälls ihop till sin förklaring. */
const gruppAv = (grupp) => (grupp === 'vagg' ? !harGlas() : grupp === 'glas' ? !harGlasYta() : grupp === 'insida' ? !harInsida() : false);
const listaOrd = (a) => (a.length > 1 ? a.slice(0, -1).join(', ') + ' och ' + a[a.length - 1] : a[0] || '');
const stor = (t) => t.charAt(0).toUpperCase() + t.slice(1);

/* ---------- vad som ingår och vad som är tillval (GRUNDVAL i pris.js) ---------- */
let valdVagg = 'vf';        // väggen som knapparna under ritningen gäller
function ingarVal(grupp, v, o = S) {
  if (grupp === 'form') return GRUNDVAL.form.includes(v);
  if (grupp === 'tak') return GRUNDVAL.tak[o.form] === v;
  return GRUNDVAL[grupp] === v;
}
/* Grundvalet i en grupp att räkna skillnaden mot: det valda om det ingår, annars det som ingår. */
function grundFor(grupp, o = S) {
  if (grupp === 'form') return GRUNDVAL.form.includes(o.form) ? o.form : GRUNDVAL.form[GRUNDVAL.form.length - 1];
  if (grupp === 'tak') return GRUNDVAL.tak[o.form];
  return GRUNDVAL[grupp];
}
/* Ett val i en grupp som ändring av S: en ny takform börjar på sin standardlutning, som i panelen. */
function andring(grupp, v) {
  if (grupp === 'material') return { [valdVagg]: v };
  if (grupp === 'form') { const lut = v === S.form ? S.lutOnskad : LUT[v] ? LUT[v].std : S.lut; return { form: v, lut, lutOnskad: lut }; }
  return { [grupp]: v };
}
/* Priset med valet v jämfört med grundvalet, med alla andra val som nu. null utan priser. */
function tillaggsPris(grupp, v) {
  if (!PRISLAGE) return null;
  // ett nät utan glasväggar finns inte, och räknas inte in när en vägg blir glas (runda 3: 3 900 kr för mycket)
  const bas = { ...S, nat: S.nat && harGlas() };
  const med = prisNu(normalisera({ ...bas, ...andring(grupp, v) }));
  const utan = prisNu(normalisera({ ...bas, ...andring(grupp, grundFor(grupp)) }));
  return med && utan ? med.total - utan.total : null;
}
/* Öppet utan glas är ett annat utförande, inget tillval: ingen etikett utan
   priser, och med priser skillnaden utan guld (hur det prissätts avgör Alltfix). */
const annatUtforande = (grupp, v) => grupp === 'vagg' && v === 'oppen';
/* [text, tillval?] för knappens etikett: "Ingår", "Tillval" eller "+ 4 200 kr".
   Guld bara för det som kostar extra; en billigare väg ("− 6 500 kr") står i vitt. */
function etikett(grupp, v) {
  if (ingarVal(grupp, v)) return ['Ingår', false];
  const annat = annatUtforande(grupp, v);
  // en grupp som inte gäller just nu, eller ett nät utan glasväggar: inget belopp (runda 3: "+ 0 kr")
  if (gruppAv(grupp) || (grupp === 'nat' && !harGlas())) return [annat ? '' : 'Tillval', !annat];
  const kr = tillaggsPris(grupp, v);
  if (kr == null || kr === 0) return [annat ? '' : 'Tillval', !annat];
  return [skillnad(kr), kr > 0 && !annat];
}
/* Dina tillval: allt som skiljer sig från grundpriset, med vad det kostar när priser finns. */
function tillvalLista() {
  const ut = [];
  const nu = prisNu();
  const lagg = (text, bort) => {
    const utan = nu && prisNu(normalisera({ ...S, ...bort }));
    ut.push({ text, kr: nu && utan ? nu.total - utan.total : null });
  };
  if (!ingarVal('form', S.form)) lagg(FORM[S.form], { form: grundFor('form') });
  if (!ingarVal('tak', S.tak)) lagg(TAK[S.tak], { tak: grundFor('tak') });
  for (const k of VAGGAR) if (S[k] !== GRUNDVAL.material) lagg(`${MATERIAL[S[k]]}: ${VAGGNAMN[k].toLowerCase()}`, { [k]: GRUNDVAL.material });
  if (harGlas() && S.vagg !== GRUNDVAL.vagg && !annatUtforande('vagg', S.vagg)) lagg(VAGG[S.vagg], { vagg: GRUNDVAL.vagg });
  if (harGlasYta() && S.glas !== GRUNDVAL.glas) lagg(GLAS[S.glas], { glas: GRUNDVAL.glas });
  if (S.golv !== GRUNDVAL.golv) lagg(`Golv i ${GOLV[S.golv].toLowerCase()}`, { golv: GRUNDVAL.golv });
  if (S.h > GRUNDVAL.hojd + 1e-9) lagg(`Höjd ${dec(S.h, 2)} m vid takfoten`, { h: GRUNDVAL.hojd });
  if (harInsida() && S.insida !== GRUNDVAL.insida) lagg(`Insida i ${INSIDA[S.insida].toLowerCase()}`, { insida: GRUNDVAL.insida });
  if (S.led) lagg('LED-belysning', { led: false });
  if (S.nat && harGlas()) lagg('Insektsnät', { nat: false });
  return ut;
}
/* Ingår i grundpriset: en kort lista, skriven ur GRUNDVAL. */
function ingarLista() {
  const g = GRUNDVAL, perTak = {};
  for (const f of Object.keys(FORM)) (perTak[g.tak[f]] = perTak[g.tak[f]] || []).push(FORM[f].toLowerCase());
  return [
    `Stomme, montage och golv i ${GOLV[g.golv].toLowerCase()}`,
    stor(g.form.map((f) => FORM[f].toLowerCase()).join(' eller ')),
    stor(Object.entries(perTak).map(([t, f]) => `${TAK[t].toLowerCase()} på ${listaOrd(f)}`).join(', ')),
    `Väggar i glas med ${VAGG[g.vagg].toLowerCase()} och ${GLAS[g.glas].toLowerCase()}`,
    `Höjd upp till ${dec(g.hojd, 2)} m vid takfoten`,
    `${INSIDA[g.insida]} på insidan`,
    'Alla profilfärger',
  ];
}
/* En rad om grundpriset till summeringen, också den ur GRUNDVAL. */
function ingarKort() {
  const g = GRUNDVAL;
  return stor(listaOrd(['stomme', ...(g.material === 'glas' ? ['glasväggar'] : []), GOLV[g.golv].toLowerCase()])) + ' ingår.';
}
const tillvalText = (t) => (t.length ? t.map((r) => r.text + (r.kr != null ? ` (${skillnad(r.kr)})` : '')).join(', ') : 'Inga tillval');

function vaggText() {
  if (VAGGAR.every((k) => S[k] === 'glas')) return 'glasväggar';
  return 'väggar: ' + VAGGAR.map((k) => `${VAGGNAMN[k].toLowerCase()} ${MATERIAL_KORT[S[k]]}`).join(', ');
}
function sammanfattning(html = true) {
  const f = FARGER.find((x) => x.id === S.farg).namn;
  const till = [S.led && 'LED-belysning', S.nat && harGlas() && 'insektsnät'].filter(Boolean);
  const matt = `${dec(S.b, 2)} × ${dec(S.d, 2)} m · höjd ${dec(S.h, 2)} m`;
  const form = lutande() ? `${FORM[S.form]} ${S.lut}°` : FORM[S.form];
  const delar = [`${dec(S.b * S.d)} m²`, form, TAK[S.tak], vaggText()];
  if (harGlas()) delar.push(VAGG[S.vagg]);
  if (harGlasYta()) delar.push(GLAS[S.glas]);
  if (harInsida()) delar.push(`insida i ${INSIDA[S.insida].toLowerCase()}`);
  delar.push(`golv i ${GOLV[S.golv].toLowerCase()}`, f);
  if (till.length) delar.push(till.join(' och '));
  return html ? `<b>${matt}</b> · ${delar.join(' · ')}` : `${matt} · ${delar.join(' · ')}`;
}
/* Summeringen: med priser det uppskattade priset och "Så räknas det", utan
   priser vad som ingår och dina tillval. Inga kronor syns utan priser. */
function skrivPris() {
  const pris = prisNu(), till = tillvalLista();
  const ut = $('ut-pris');
  $('pris-etikett').textContent = pris ? (PRISLAGE === 'exempel' ? 'Exempelpris' : 'Uppskattat pris') : 'Dina tillval';
  // utan priser står tillvalen med namn direkt i summeringen (runda 3: bara "2 tillval" och ett extra klick)
  ut.textContent = pris ? kronor(pris.total) : till.length ? till.map((r) => r.text).join(', ') : 'Inga tillval';
  ut.classList.toggle('antal', !pris);
  $('pris-hur-text').textContent = pris ? 'Så räknas det' : 'Vad ingår';
  $('prisbar-text').innerHTML = pris ? `${PRISLAGE === 'exempel' ? 'Exempelpris' : 'Uppskattat pris'} <b id="ut-pris-bar">${kronor(pris.total)}</b>`
    : `Tillval <b id="ut-pris-bar">${till.length ? `${till.length} valda` : 'Inga'}</b>`;
  const rader = $('prisrader');
  rader.hidden = !pris;
  rader.innerHTML = pris ? pris.rader.map((r) => `<li><span>${r.text}${r.hur ? `<small>${r.hur}</small>` : ''}</span><b>${kronor(r.kr)}</b></li>`).join('') : '';
  // dina tillval först: på en låg skärm syntes annars bara det första (runda 3)
  $('ingar-tillval').innerHTML = '<h3>Dina tillval</h3>' + (till.length
    ? `<ul>${till.map((r) => `<li><span>${r.text}</span>${r.kr != null ? `<b>${skillnad(r.kr)}</b>` : '<b class="ingar">Tillval</b>'}</li>`).join('')}</ul>`
    : '<p class="tom">Inga tillval</p>')
    + `<h3>Ingår i grundpriset</h3><ul>${ingarLista().map((t) => `<li><span>${t}</span></li>`).join('')}</ul>`;
  $('testnot').textContent = PRISLAGE === 'exempel' ? 'Exempelpriser – inte Alltfix priser. Slutpris efter hembesök.'
    : PRISLAGE ? 'Slutpris efter hembesök.' : `${ingarKort()} Priset tar vi fram tillsammans vid hembesöket.`;
}
function skrivEtiketter() {
  for (const g of document.querySelectorAll('[data-grupp]')) {
    const grupp = g.dataset.grupp;
    if (!['form', 'tak', 'material', 'vagg', 'glas', 'golv', 'insida'].includes(grupp)) continue;
    for (const b of g.querySelectorAll('[data-varde]')) {
      if (b.hidden) continue;
      let e = b.querySelector('.etikett');
      if (!e) { e = document.createElement('span'); e.className = 'etikett'; b.appendChild(e); }
      const [text, till] = etikett(grupp, b.dataset.varde);
      e.textContent = text; e.classList.toggle('tillval', till); e.hidden = !text;
    }
  }
  for (const k of ['led', 'nat']) {
    const [text, till] = etikett(k, true);
    const e = document.querySelector(`[data-etikett="${k}"]`);
    e.textContent = text; e.classList.toggle('tillval', till);
  }
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
  {
    const g = dec(GRUNDVAL.hojd, 2);
    const kr = PRISLAGE && S.h > GRUNDVAL.hojd + 1e-9 ? (() => { const a = prisNu(), b = prisNu(normalisera({ ...S, h: GRUNDVAL.hojd })); return a && b ? a.total - b.total : null; })() : null;
    $('hojd-tillval').innerHTML = hojdSankt ? `Höjden är sänkt till ${dec(S.h, 2)} m så att taket får plats mot husets tak.`
      : S.h <= GRUNDVAL.hojd + 1e-9 ? `Höjd upp till ${g} m ingår i grundpriset.`
        : `Över ${g} m är ett tillval${kr != null ? `: <b>${skillnad(kr)}</b>` : '.'}`;
  }
  // taket: formens text, lutningen och bara de täckningar som finns för formen
  $('form-text').textContent = FORM_TEXT[S.form];
  const lg = lutGranser();
  $('lut-rad').hidden = !lg;
  if (lg) {
    // reglagets tak är den brantaste lutning som stannar under husets nock
    const r = $('lut'), nockMax = lutNockMax();
    r.min = lg.min; r.max = Math.max(lg.min + 1, nockMax);
    if (+r.value !== S.lut) r.value = S.lut;
    fyll(r);
    $('ut-lut').textContent = `${S.lut}°`;
    const nn = $('nock-not');
    nn.hidden = !(nockMax < lg.max && S.lut >= nockMax);
    const varfor = forHogt({ ...S, lut: nockMax + 1 }) === 'forl' ? `gå mer än ${dec(FORL_MAX, 0)} m upp på husets tak` : 'gå över husets nock';
    nn.textContent = S.lutOnskad > S.lut ? `Lutningen är sänkt från ${S.lutOnskad}° till ${S.lut}°: brantare skulle taket ${varfor}.`
      : `Brantare än ${nockMax}° skulle taket ${varfor}.`;
  }
  $('anslut-not').hidden = !ansluter();
  const pannNot = S.tak === 'takpannor' && S.form === 'pulpet';
  $('lut-not').hidden = !pannNot;
  $('lut-not').textContent = pannorHojde ? `Takpannor kräver minst ${PANNOR_MIN}° lutning, så lutningen är höjd till ${PANNOR_MIN}°.`
    : `Takpannor kräver minst ${PANNOR_MIN}° lutning.`;
  for (const b of document.querySelectorAll('[data-grupp="tak"] [data-varde]')) b.hidden = !TAK_FOR[S.form].includes(b.dataset.varde);
  // väggarna: ritningen färgas efter materialet, knapparna gäller vald vägg
  for (const b of document.querySelectorAll('[data-vagg]')) {
    const k = b.dataset.vagg;
    b.className = `plan-vagg m-${S[k]}`;
    b.setAttribute('aria-pressed', String(k === valdVagg));
    b.setAttribute('aria-label', `${VAGGNAMN[k]}: ${MATERIAL[S[k]].toLowerCase()}`);
    // väggens namn och material i segmentet (runda 3: namnet syntes först efter ett val)
    b.querySelector('span').innerHTML = `<small>${VAGG_KORT[k]}</small>${stor(MATERIAL_KORT[S[k]])}`;
  }
  $('vagg-vald').textContent = `${VAGGNAMN[valdVagg]}: ${MATERIAL_KORT[S[valdVagg]]}`;
  $('material-text').textContent = S[valdVagg] === 'glas' ? 'Glasväggen får glaspartier som går att öppna.'
    : S[valdVagg] === 'tra' ? 'Vitmålad träpanel med vita hörnbrädor, som på Alltfix egna byggen.'
      + (S.farg !== 'vit' ? ' Med profilfärg Vit blir också stolparna vita.' : '')
      : 'Samma fasad och sockel som huset, så uterummet ser ut som en del av huset.';
  /* Grupper som inte gäller just nu fälls ihop till rubriken och förklaringen
     (runda 3: nedtonade knappar tog 165–200 px var). Glaset gäller också glastaket. */
  const glasNu = harGlas();
  for (const k of ['vagg', 'glas', 'insida']) {
    const g = document.querySelector(`[data-grupp="${k}"]`), av = gruppAv(k);
    g.classList.toggle('av', av); g.closest('.sek').classList.toggle('av', av);
    for (const b of g.querySelectorAll('[data-varde]')) b.setAttribute('aria-disabled', String(av));
  }
  $('vagg-text').textContent = glasNu ? VAGG_TEXT[S.vagg] : 'Ingen vägg är av glas. Välj glas på en vägg för att få glaspartier.';
  const vaggGlas = glasNu && S.vagg !== 'oppen';
  const glasText = !harGlasYta() ? 'Glaset gäller glasväggar och glastak. Just nu finns inget glas.'
    : !vaggGlas ? 'Gäller glastaket.' : S.tak === 'glas' ? 'Gäller glasväggarna och glastaket.' : '';
  $('glas-text').hidden = !glasText;
  $('glas-text').textContent = glasText;
  $('insida-text').textContent = harInsida() ? 'På insidan av trä- och fasadväggarna och i innertaket under tätt tak. Syns i vyn Inifrån.'
    : 'Välj en trä- eller fasadvägg eller ett tätt tak för att få en insida att klä.';
  // nätet finns bara på glasväggar: utan dem går det inte att slå på (runda 3)
  const nat = $('nat');
  nat.disabled = !glasNu; nat.checked = S.nat && glasNu;
  nat.closest('.vaxel').classList.toggle('av', !glasNu);
  $('nat-text').textContent = glasNu ? 'Nät i öppningarna när glaset är öppet' : 'Finns bara på glasväggar';
  // priset räknas ur samma tal som byggde rummet, i samma bildruta
  skrivPris();
  skrivEtiketter();
  $('sammanfattning').innerHTML = sammanfattning();
  $('ut-farg').textContent = FARGER.find((x) => x.id === S.farg).namn;
  $('ut-lamell').textContent = `${Math.round(S.lamell * 100)} %`;
  $('lamell-rad').hidden = S.tak !== 'lamell';
  const kn = $('oppna'), stangd = S.vagg === 'oppen' || !glasNu;
  kn.disabled = stangd;
  kn.title = !glasNu ? 'Ingen vägg är av glas, så det finns inga partier att öppna' : '';
  kn.querySelector('span').textContent = !glasNu ? 'Inga glasväggar' : S.vagg === 'oppen' ? 'Inga glaspartier' : oppenMal > 0.5 ? 'Stäng partierna' : 'Öppna partierna';
  kn.setAttribute('aria-pressed', String(oppenMal > 0.5 && !stangd));
  for (const g of document.querySelectorAll('[data-grupp]')) {
    const varde = g.dataset.grupp === 'material' ? S[valdVagg] : S[g.dataset.grupp];
    for (const b of g.querySelectorAll('[data-varde]')) b.setAttribute('aria-pressed', String(varde === b.dataset.varde));
  }
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

let traTips = false;         // tipset om vita stolpar visas en gång
/* Vald vägg skimrar i guld en kort stund, i bilden. */
function markera(k) {
  markerad = k;
  for (const [n, o] of Object.entries(markeringar)) o.visible = n === k;
  clearTimeout(markerTimer);
  markerTimer = setTimeout(() => { markerad = null; for (const o of Object.values(markeringar)) o.visible = false; ritaNu(); }, 1400);
  ritaNu();
}
/* Utifrån vrids vyn till en vald gavels sida, så att den syns. */
function vandTill(k) {
  if (vy === 'ute' && k !== 'vf' && uteSida !== k) { uteSida = k; sattVy('ute', 600); }
}
/* Materialet står på varje vägg i bilden en stund efter ett val, och hela
   tiden medan Väggar syns i panelen (runda 3: trä och fasad gick knappt att
   skilja åt i bilden). */
let materialTill = 0, materialTimer = 0, vaggSekSyns = false;
function visaMaterial(ms = 3200) {
  materialTill = nuTid() + ms;
  clearTimeout(materialTimer); materialTimer = setTimeout(ritaNu, ms + 50);
  ritaNu();
}
function valjVagg(k, fran3D = false) {
  if (!VAGGAR.includes(k)) return;
  valdVagg = k; markera(k); visaMaterial(); uppdateraText();
  vandTill(k);
  if (fran3D) {
    visaToast(`${VAGGNAMN[k]}: ${MATERIAL_KORT[S[k]]}. Välj material under ritningen.`);
    // materialknapparna fram, nedanför duken på mobilen (runda 3: de låg 1 000 px längre ner)
    $('vagg-val').scrollIntoView({ block: 'nearest', behavior: REDUCERAD ? 'auto' : 'smooth' });
  }
}

document.addEventListener('click', (e) => {
  const knapp = e.target.closest('[data-varde]');
  if (knapp) {
    const gr = knapp.closest('[data-grupp]');
    if (gr.classList.contains('av')) return;           // gäller inget just nu, förklaringen står under
    const grupp = gr.dataset.grupp;
    const nyckel = grupp === 'material' ? valdVagg : grupp;
    const v = knapp.dataset.varde;
    if (S[nyckel] === v) return;
    S[nyckel] = v;
    // ny form börjar på sin standardlutning; pannor kan sedan lyfta den
    if (grupp === 'form' && LUT[v]) S.lut = S.lutOnskad = LUT[v].std;
    if (grupp === 'form' || grupp === 'tak') { pannorHojde = false; normalisera(); }
    if (['tak', 'vagg', 'form', 'golv', 'material', 'insida'].includes(grupp)) {
      if (grupp === 'vagg' || grupp === 'material') stangPartier();
      byggRum();
      if (['tak', 'vagg', 'form'].includes(grupp) && vy !== 'inne') sattVy(vy, 600);
      if (grupp === 'material') {
        markera(valdVagg); visaMaterial();
        // inifrån: blicken vänds mot den täta väggen; utifrån: mot gaveln som ändrades
        if (vy === 'inne') sattVy('inne', 600); else if (uteSida !== valdVagg && valdVagg !== 'vf' && vy === 'ute') vandTill(valdVagg);
        if (v === 'tra' && S.farg !== 'vit' && !traTips) { traTips = true; visaToast('Tips: Alltfix målar stolparna vita till trä. Välj Vit under Profilfärg.'); }
      }
      // insidan syns bara inifrån: dit går kameran när kunden väljer beklädnad (runda 3)
      if (grupp === 'insida') sattVy('inne', vy === 'inne' ? 600 : KAMERA_MS);
      sattSol();
    }
    if (grupp === 'farg') tillampaFarg();
    if (grupp === 'glas') tillampaGlas();
    if (grupp === 'rikt') sattSol();
    uppdateraText();
    return;
  }
  const pv = e.target.closest('[data-vagg]');
  if (pv) { valjVagg(pv.dataset.vagg); return; }
  const vk = e.target.closest('[data-vy]');
  if (vk && vk.dataset.vy !== vy) sattVy(vk.dataset.vy);
});

/* Ett rent klick på en vägg i 3D-bilden väljer väggen. Kamerans dragning
   störs inte: klicket räknas bara om pekaren knappt rört sig. */
const stral = new THREE.Raycaster(), _ndc = new THREE.Vector2();
let tryck = null;
// bara vänster knapp (eller ett finger); runda 3: högerklick valde också väggen
renderare.domElement.addEventListener('pointerdown', (e) => {
  tryck = e.isPrimary && e.button === 0 ? { x: e.clientX, y: e.clientY, t: e.timeStamp, id: e.pointerId } : null;
});
// en dragning som går tillbaka till startpunkten är ingen klick (runda 3: svep fram och tillbaka valde fronten)
renderare.domElement.addEventListener('pointermove', (e) => {
  if (tryck && tryck.id === e.pointerId && Math.hypot(e.clientX - tryck.x, e.clientY - tryck.y) > 6) tryck = null;
});
renderare.domElement.addEventListener('pointercancel', () => { tryck = null; });
renderare.domElement.addEventListener('pointerup', (e) => {
  const t = tryck; tryck = null;
  if (!t || t.id !== e.pointerId) return;
  // tidsstämplarna, inte klockan nu: en tung bildruta får inte göra ett klick till ett långt tryck
  if (Math.hypot(e.clientX - t.x, e.clientY - t.y) > 6 || e.timeStamp - t.t > 700) return;
  const k = vaggVid(e.clientX, e.clientY);
  if (k) valjVagg(k, true);
});
/* Vilken vägg ligger under en punkt på skärmen? Strålen går mot allt i
   rummet och huset, och det första ogenomskinliga den träffar avgör. Hör det
   till en vägg väljs den: en tät gavel som syns genom frontens glas väljs
   alltså, inte fronten. Annars väljs den närmaste glasväggen strålen
   passerat före träffen. Tak, hus och mark väljer ingenting (runda 3: ett
   klick på taket valde en dold gavel bakom det). */
const GENOMSKINLIGT = new Set([M.glas, M.kanal, M.nat, M.markering, M.markeringTat, M.matt]);
const synlig = (o) => { for (let q = o; q; q = q.parent) if (!q.visible) return false; return true; };
const vaggAv = (o) => { for (let q = o; q; q = q.parent) if (q.userData.vagg) return q.userData.vagg; return null; };
function vaggVid(x, y) {
  const r = renderare.domElement.getBoundingClientRect();
  _ndc.set(((x - r.left) / r.width) * 2 - 1, -((y - r.top) / r.height) * 2 + 1);
  kamera.updateMatrixWorld();
  stral.setFromCamera(_ndc, kamera);
  const forsta = stral.intersectObjects([rum, hus], true).find((h) => !GENOMSKINLIGT.has(h.object.material) && synlig(h.object));
  const k = forsta && vaggAv(forsta.object);
  if (k) return k;
  const d = forsta ? forsta.distance + 0.15 : Infinity;
  const g = stral.intersectObjects(Object.values(markeringar), false).find((h) => S[h.object.userData.vagg] === 'glas' && h.distance < d);
  return g ? g.object.userData.vagg : null;
}

/* ---------- måtten: reglage, knappar och sifferfält ----------
   Rami 2026-09-28: 50 cm per steg var för grovt. Allt går nu i hela cm:
   reglagets piltangenter, knapparna (håll inne för att fortsätta) och
   fältet där man skriver måttet. Rummet byggs om högst en gång per
   bildruta; kameran ramar om först när ett mått är färdigändrat. */
function sattMattVarde(k, v) {
  const ny = klamMatt(k, v);
  if (ny === S[k]) return false;
  const fore = S[k];
  S[k] = ny;
  normalisera();              // lutningen (och i sista hand höjden) stannar under husets nock
  if (S[k] === fore) return false;
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
  /* Ett inskrivet mått som ännu inte tillämpats tolkas med samma regler som
     vid Enter innan − och + eller piltangenterna stegar (Rami-runda 3:
     "5,37" och "800" kastades bort). */
  const tillampaInskrivet = () => {
    if (!smutsig) return;
    const cm = tolkaCm(f.value);
    if (Number.isFinite(cm)) sattMattVarde(k, cm / 100);
    smutsig = false;
  };
  // reglaget skrivs tillbaka också när nockgränsen håller emot (runda 3: tummen stod på 3,00, höjden på 2,90)
  r.addEventListener('input', () => { sattMattVarde(k, +r.value); skrivFalt(); if (+r.value !== S[k]) { r.value = S[k]; fyll(r); } });
  r.addEventListener('change', mattKlart);
  f.addEventListener('focus', () => { vidFokus = S[k]; smutsig = false; f.select(); });
  // medan man skriver: rummet följer så fort talet är ett giltigt mått
  f.addEventListener('input', () => {
    smutsig = true;
    const cm = tolkaCm(f.value, false);
    if (cm >= g.min * 100 && cm <= g.max * 100) sattMattVarde(k, cm / 100);
  });
  const bekrafta = () => {
    tillampaInskrivet();
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
      tillampaInskrivet();
      sattMattVarde(k, S[k] + (e.key === 'ArrowUp' ? 0.01 : -0.01));
      skrivFalt();
    }
  });
  f.addEventListener('keyup', (e) => { if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && S[k] !== vidFokus) { vidFokus = S[k]; mattKlart(); } });

  // − och +: 1 cm per tryck; håller man inne upprepas steget efter 400 ms, allt snabbare
  for (const knapp of r.closest('.reglage').querySelectorAll('[data-steg]')) {
    const riktning = +knapp.dataset.steg;
    let timer = 0, n = 0, aktiv = false, fore = 0;
    const steg = () => { tillampaInskrivet(); sattMattVarde(k, S[k] + riktning * 0.01); skrivFalt(); };
    const upprepa = () => { steg(); n++; timer = setTimeout(upprepa, n < 8 ? 90 : n < 30 ? 45 : 20); };
    const slapp = () => {
      if (!aktiv) return;
      aktiv = false; clearTimeout(timer);
      if (S[k] !== fore) { vidFokus = S[k]; mattKlart(); }
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
  S.lut = S.lutOnskad = v; pannorHojde = false; normalisera();
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
  if (S.vagg === 'oppen' || !harGlas()) return;
  const fran = oppen;
  oppenMal = oppenMal > 0.5 ? 0 : 1;
  const till = oppenMal;
  stangPartier.anim = animera(OPPNA_MS * Math.abs(till - fran), (e) => {
    oppen = fran + (till - fran) * e;
    tillampaOppen(oppen);
    renderare.shadowMap.needsUpdate = true;
  });
  uppdateraText();
});

if ('IntersectionObserver' in window)
  new IntersectionObserver(([e]) => { vaggSekSyns = e.isIntersecting; ritaNu(); },
    { rootMargin: innerWidth > 860 ? '0px' : '-52% 0px -64px 0px' }).observe($('vagg-val'));

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
  const ul = $('pris-kort'), panel = document.querySelector('.panel'), sum = document.querySelector('.summering');
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
  stangPartier();                         // runda 3: öppna partier följde med från förra designen
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
  // mått och tillval först; vad som ingår går att fälla ut (runda 3: en textvägg på mobilen)
  $('designrad').innerHTML = `<p>Din design: ${sammanfattning()}</p>`
    + `<p>Dina tillval: <b>${tillvalText(tillvalLista())}</b></p>`
    + (pris ? `<p>${PRISLAGE === 'exempel' ? 'Exempelpris' : 'Uppskattat pris'}: <b>${kronor(pris.total)}</b>${PRISLAGE === 'exempel' ? ' (exempelpriser – inte Alltfix priser)' : ' (slutpris efter hembesök)'}</p>`
      : '<p>Priset tar vi fram tillsammans vid hembesöket.</p>')
    + `<details><summary>Vad ingår i grundpriset</summary><ul>${ingarLista().map((t) => `<li>${t}</li>`).join('')}</ul></details>`;
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
    data.set('design', sammanfattning(false) + ` · fronten mot ${RIKT_ORD[S.rikt]}`);
    data.set('ingar', ingarLista().join(', '));
    data.set('tillval', tillvalText(tillvalLista()));
    if (pris) {
      const prisText = `${kronor(pris.total)}${PRISLAGE === 'exempel' ? ' (exempelpriser, inte Alltfix priser)' : ''}`;
      data.set('pris', prisText + ': ' + pris.rader.map((r) => `${r.text} ${kronor(r.kr)}`).join(', '));
    } else data.set('pris', 'Priset tas fram vid hembesöket');
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
   aldrig hackar: dag och natt, alla takformer, kanalplastens genomskinliga
   struktur och golven, med och utan nät. */
(function varmUpp() {
  const spara = { ...S };
  const kombinationer = [
    { form: 'plant', tak: 'lamell', nat: true, tid: 15 }, { form: 'plant', tak: 'lamell', nat: true, tid: 22.5 },
    { form: 'pulpet', tak: 'glas', golv: 'parkett', nat: true, tid: 15 }, { form: 'pulpet', tak: 'glas', golv: 'parkett', nat: true, tid: 22.5 },
    { form: 'sadel', tak: 'kanalplast', golv: 'klinker', nat: true, tid: 15 }, { form: 'sadel', tak: 'kanalplast', golv: 'klinker', nat: true, tid: 22.5 },
    { form: 'pulpet', tak: 'takpannor', lut: 20, nat: true, tid: 15 },
    // täta väggar, insidorna och guldskimret över vald vägg
    { form: 'pulpet', tak: 'takpapp', vv: 'tra', vf: 'fasad', insida: 'parlspont', nat: true, tid: 15, markerad: 'vf' },
    { form: 'sadel', tak: 'takpannor', vf: 'tra', insida: 'tra', tid: 22.5, markerad: 'vv' },
  ];
  const l = vyLage('ute');
  kamera.position.copy(l.pos); kontroller.target.copy(l.mal); kamera.lookAt(l.mal);
  for (const { markerad: mk, ...k } of kombinationer) {
    Object.assign(S, k); markerad = mk || null; byggRum(); sattSol();
    renderare.compile(scen, kamera);
    renderare.render(scen, kamera);
  }
  markerad = null;
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
  hus: () => HUS_VAGG,
  /* Husets snitt ("ränna|vindskiva|utsprång", halva glappets bredd i meter; 0 = helt) och om taket ansluter. */
  husSnitt: () => ({ snitt: husSnitt, anslutning, mote: takMote(), nockGrans: +NOCK_GRANS.toFixed(3), forl: rumMatt.zBak }),
  /* Väggarna: välj vägg (vv, vf, vh) och material genom panelens knappar. */
  valjVagg: (k) => valjVagg(k),
  vaggVid: (x, y) => vaggVid(x, y),
  vagg: (k, m) => { valjVagg(k); const el = document.querySelector(`[data-grupp="material"] [data-varde="${m}"]`); if (el) el.click(); return { vv: S.vv, vf: S.vf, vh: S.vh }; },
  tillval: () => tillvalLista(),
  ingar: () => ingarLista(),
  prislage: () => PRISLAGE,
  /* Etiketterna på knapparna, grupp för grupp: { form: { plant: 'Ingår', ... }, ... } */
  etiketter: () => {
    const ut = {};
    for (const g of document.querySelectorAll('[data-grupp]')) for (const b of g.querySelectorAll('.etikett'))
      (ut[g.dataset.grupp] = ut[g.dataset.grupp] || {})[b.parentElement.dataset.varde] = b.textContent;
    for (const e of document.querySelectorAll('[data-etikett]')) ut[e.dataset.etikett] = e.textContent;
    return ut;
  },
  /* Var en vägg hamnar på duken (mitten av dess kontur), för klick i bilden. */
  vaggPunkt: (k) => {
    const o = markeringar[k]; if (!o) return null;
    o.geometry.computeBoundingBox(); const c = o.geometry.boundingBox.getCenter(new THREE.Vector3());
    o.localToWorld(c); c.project(kamera);
    const r = renderare.domElement.getBoundingClientRect();
    return [r.left + (c.x * 0.5 + 0.5) * r.width, r.top + (-c.y * 0.5 + 0.5) * r.height];
  },
  /* Kameran till en viss punkt, för närbilder i granskningen (zoomspärren släpps). */
  kamera: (pos, mal, fov = kamera.fov) => {
    kontroller.minDistance = 0.05; kontroller.maxDistance = 200; kontroller.minPolarAngle = 0; kontroller.maxPolarAngle = Math.PI;
    flytta(new THREE.Vector3(...pos), new THREE.Vector3(...mal), 0, null, fov);
  },
  matt: () => ({ ...rumMatt }),
  /* Materialetiketterna på väggarna: [text, synlig] per vägg (vv, vf, vh). */
  materialEtiketter: () => materialEl.map((e) => [e.textContent, e.style.opacity === '1']),
  uteSida: () => uteSida,
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
