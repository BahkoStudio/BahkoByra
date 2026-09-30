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
/* Taket väljs i två steg: form och täckning (Rami 2026-09-28). Täckningen är
   exakt Ramis tre: kanalplast, takpapp och takpannor (tegel eller betong).
   Lamelltak och glastak är borttagna (2026-09-29). Pannor kräver minst 14° fall,
   så ett plant tak har bara kanalplast och takpapp. */
const FORM = { plant: 'Plant tak', pulpet: 'Pulpettak', sadel: 'Sadeltak' };
const FORM_TEXT = {
  plant: 'Nästan plant tak med ett litet fall ut från huset, så att vattnet rinner av.',
  pulpet: 'Taket lutar åt ett håll, från huset ner mot trädgården.',
  sadel: 'Två takfall med nocken från huset ut mot trädgården.',
};
const TAK = { kanalplast: 'Kanalplast', takpapp: 'Takpapp', takpannor: 'Takpannor' };
const TAK_FOR = {
  plant: ['takpapp', 'kanalplast'],
  pulpet: ['kanalplast', 'takpapp', 'takpannor'],
  sadel: ['kanalplast', 'takpapp', 'takpannor'],
};
// gamla länkar: lamelltaket var tätt och plant, glastaket genomskinligt
const TAK_GAMMAL = { lamell: 'takpapp', glas: 'kanalplast' };
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
// en glasvägg med Glaspartier: Öppet har inget glas, bara stolpar (sista rundan: etiketten sa "Glas")
const materialOrd = (k) => (S[k] === 'glas' && S.vagg === 'oppen' ? 'öppen' : MATERIAL_KORT[S[k]]);
const VAGG_KORT = { vv: 'Vänster', vf: 'Front', vh: 'Höger' };
const INSIDA = { ingen: 'Ingen beklädnad', skiva: 'Vit skiva', parlspont: 'Vit pärlspont', tra: 'Träpanel' };
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

/* Startdesignen är ett Alltfix-bygge där allt ingår i grundpriset: vita stolpar, plant tak med
   takpapp och bred vit vindskiva, ljus trall, inga tillval (kundloopen 2026-09-29: första bilden var
   ett svart lamelltak som Rensons, med två tillval förvalda). */
const S = { b: 5, d: 3.5, h: 2.5, form: 'plant', lut: 10, tak: 'takpapp', golv: 'trall', vagg: 'skjut', farg: 'vit', glas: 'klart',
  vv: 'glas', vf: 'glas', vh: 'glas', insida: 'ingen', led: false, nat: false, rikt: 'S', tid: 15, lutOnskad: 10 };
/* lutOnskad är lutningen kunden valde. normalisera klämmer S.lut ur den, så
   att lutningen går tillbaka när en gräns släpper (Rami-runda 3: 20° blev 17°
   när djupet ökades, och stod kvar på 17° när djupet minskades igen). */
const STANDARD = { ...S };

/* Fotoläget (Rami 2026-09-29): kundens eget foto bakom duken och uterummet
   ovanpå, i verklig skala. aktiv: ett foto är inläst och läget gäller; då
   finns inget påhittat hus att ansluta mot, så taket slutar mot husväggen på
   fotot och husets nock sätter ingen gräns. lage: kamerans höjd h (m) och
   lutning (rad, uppåt positiv), rummets bakre mitt (cx, cz) på marken och
   vridning t. ljus: varifrån solen kommer (grader, 0 = bakom fotografen).
   fov: fotots lodräta bildvinkel i grader (ur EXIF, annars en mobilkamera).
   bekraftad: kunden har flyttat punkterna eller sagt att placeringen stämmer.
   takfot: husets takfot på fotot [x, y] i andelar, eller null (inte markerad).
   dorr: dörrmåttstockens tröskel [x, y] och överkant y, och dörrens höjd i meter. */
const foto = { aktiv: false, bild: null, url: null, w: 0, h: 0, kvot: 4 / 3, fov: 50, exif: false,
  lage: { h: 1.6, lutning: 0, cx: 0, cz: -8, t: 0 }, ljus: { az: -35, mulet: false },
  bekraftad: false, takfot: null, dorr: null, dorrMatt: false, pensel: null };
/* Sidans läge: 'start' (första skärmen), '3d' (det påhittade huset) eller 'foto'. */
let sidlage = 'start';
let fpFranLank = null;       // placeringen ur en delad länk, till samma foto
let drarNu = false;          // en punkt, horisonten eller rummet dras på fotot
/* De fotorealistiska bilderna (AI) till det här fotot: versionerna, den som
   visas eller senast visades, och om före/efter-bilden ligger över skissen. */
const versioner = [];
let visad = -1, aiVisas = false, aiArbetar = false;
/* Visas fotot just nu? I fotoläget visar Inifrån 3D-bilden utan foto. */
function fotoVyNu() { return foto.aktiv && vy === 'foto'; }

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
  const tS = tatt ? TJ : 0.016;                   // kanalplasten
  const topFram = Y0 + o.h;
  if (o.form === 'pulpet') {
    const y = topFram + o.d * t + (tatt ? TJ + 0.02 : 0.04) / c;
    return { c0: y, s: t, kant0: y };
  }
  if (o.form === 'sadel') {
    const nock = topFram + (o.b / 2) * t;
    return { c0: nock + (tS + 0.03) / c, s: 0, kant0: topFram - (tatt ? UT * t : 0) + tS / c };
  }
  const y = topFram + (tatt ? TJ + 0.03 : tS + 0.07);   // kanalplast: på sparrarna ovanpå balkarna
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
  if (foto.aktiv) return false;
  const m = takMote(o);
  return m.c0 - 0.66 * m.s > RANNA_UNDER - 0.01;
}
/* Fotoläget: når uterummets tak över husets takfot, om kunden har markerat den?
   Svaret är hur många meter över, annars 0. Granskningen 2026-09-29: sadeltaket
   stack upp framför husets tak utan varning. */
function overTakfot(o = S) {
  const t = foto.aktiv ? takfotHojd() : null;
  return t == null ? 0 : Math.max(0, takLinje(o).c0 - t);
}
/* Går taket för högt: över husets nock, eller pulpettaket mer än FORL_MAX
   upp på husets tak? Svaret är gränsen som slår till, annars null. */
function forHogt(o = S) {
  if (foto.aktiv) return null;               // husets nock på fotot känner vi inte; takfoten ger en varning (overTakfot)
  const m = takMote(o);
  if (m.hogst > NOCK_GRANS) return 'nock';
  return o.form === 'pulpet' && -m.z > FORL_MAX ? 'forl' : null;
}

/* Hur långt uterummets tak fortsätter bakom husväggen, in i husets takfall:
   tills ovankanten ligger 3 cm inne i husets tak. Samma tal i bygget och priset. */
function forlangning(o = S) {
  if (o.form === 'plant' || foto.aktiv) return 0;
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
  // en täckning som inte finns för formen blir den som ingår för formen (kundloopen: pulpet gav glastak, ett tillval)
  if (!TAK_FOR[o.form].includes(o.tak)) o.tak = TAK_FOR[o.form].includes(GRUNDVAL.tak[o.form]) ? GRUNDVAL.tak[o.form] : TAK_FOR[o.form][0];
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
  const p = new URLSearchParams({ b: S.b, d: S.d, h: S.h, form: S.form, lut: S.lut, tak: S.tak, golv: S.golv, vagg: S.vagg,
    vv: S.vv, vf: S.vf, vh: S.vh, ins: S.insida, farg: S.farg, glas: S.glas, led: S.led ? 1 : 0, nat: S.nat ? 1 : 0, rikt: S.rikt, tid: S.tid });
  /* Fotot kan inte delas, men placeringen kan: punkterna A och B och horisonten
     i promille av fotot (fp=ax,ay,bx,by,hy). Samma foto ger samma bild. */
  /* kh: kamerans höjd i cm, som skalan räknas ur (sedan 2026-09-29; äldre länkar
     räknade höjden ur bredden). tf: husets takfot på fotot, om den är markerad. */
  if (foto.aktiv) {
    const f = fotoPunkter();
    if (f) {
      p.set('fp', [f.A[0], f.A[1], f.B[0], f.B[1], f.H].map((v) => Math.round(v * 1000)).join(','));
      p.set('kh', Math.round(foto.lage.h * 100));
      p.set('fv', Math.round(foto.fov * 10));   // bildvinkeln i tiondels grader: samma foto ger samma bild
      if (foto.takfot) p.set('tf', foto.takfot.map((v) => Math.round(v * 1000)).join(','));
    }
  }
  return p;
}
function lasHash() {
  const p = new URLSearchParams(location.hash.slice(1));
  // ett hörn får ligga utanför fotot när rummet är brett (granskningen: −6 promille kastade placeringen)
  const tal = (k, n) => { const v = (p.get(k) || '').split(',').map(Number); return v.length === n && v.every((x) => Number.isFinite(x) && x >= -500 && x <= 1500) ? v.map((x) => x / 1000) : null; };
  const fp = tal('fp', 5), kh = parseFloat(p.get('kh')), fv = parseFloat(p.get('fv'));
  fpFranLank = fp ? { A: [fp[0], fp[1]], B: [fp[2], fp[3]], H: fp[4], kh: Number.isFinite(kh) && kh >= 30 && kh <= 1000 ? kh / 100 : null, tf: tal('tf', 2),
    fv: Number.isFinite(fv) && fv >= 100 && fv <= 1000 ? fv / 10 : null } : null;
  for (const k in MATT) {
    const v = parseFloat(p.get(k));
    if (Number.isFinite(v)) S[k] = klamMatt(k, v > 20 ? v / 100 : v);
  }
  const t = parseFloat(p.get('tid'));
  if (Number.isFinite(t)) S.tid = Math.min(23, Math.max(5, Math.round(t / 0.25) * 0.25));
  const ur = (k, lista) => { const v = p.get(k); if (har(lista, v)) S[k] = v; };
  // lamelltak och glastak finns inte längre: gamla länkar får takpapp och kanalplast
  const takRa = p.get('tak'), tk = TAK_GAMMAL[takRa] || takRa;
  if (har(TAK, tk)) S.tak = tk;
  ur('golv', GOLV); ur('vagg', VAGG); ur('glas', GLAS); ur('rikt', RIKT_GRAD);
  // väggarna och insidan: gamla länkar saknar dem och får glas och vit skiva; ogiltigt blir också det
  for (const k of VAGGAR) S[k] = har(MATERIAL, p.get(k)) ? p.get(k) : 'glas';
  // gamla länkar utan ins hade vit skiva; en tom adress behåller startdesignen
  if (har(INSIDA, p.get('ins'))) S.insida = p.get('ins'); else if (p.has('tak')) S.insida = 'skiva';
  // gamla länkar saknar form: glastaket lutade, lamelltaket var plant
  if (har(FORM, p.get('form'))) S.form = p.get('form');
  else if (p.has('tak')) S.form = takRa === 'lamell' || takRa === 'takpapp' ? 'plant' : 'pulpet';
  const lu = parseFloat(p.get('lut'));
  S.lut = S.lutOnskad = Number.isFinite(lu) ? lu : LUT[S.form] ? LUT[S.form].std : S.lut;
  const f = p.get('farg'); if (FARGER.some((x) => x.id === f)) S.farg = f;
  if (p.has('led')) S.led = p.get('led') === '1';
  if (p.has('nat')) S.nat = p.get('nat') === '1';
  normalisera();
  pannorHojde = false; hojdSankt = false;      // en delad länk har redan sin lutning
}
let hashTimer = 0;
function skrivHash() {
  clearTimeout(hashTimer);
  // på första skärmen skrivs ingenting: en tom adress ska visa första skärmen igen efter en omladdning
  if (sidlage === 'start') return;
  hashTimer = setTimeout(() => history.replaceState(null, '', '#' + hashParametrar().toString()), 250);
}
lasHash();
/* En delad länk med en design men utan placering på ett foto öppnas i 3D, som
   förut. En tom adress, eller en länk från fotoläget, börjar på första skärmen. */
{ const p = new URLSearchParams(location.hash.slice(1)); if (!fpFranLank && ['b', 'tak', 'form'].some((k) => p.has(k))) sidlage = '3d'; }

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
// i fotoläget ligger dimman långt bort i stället för att tas bort: ingen omkompilering vid bytet
const DIMMA = { near: 28, far: 75 };

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
  kanal: new THREE.MeshStandardMaterial({ color: 0xeef0ec, roughness: 0.42, transparent: true, opacity: 0.8,
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
  // ingen beklädnad: obehandlade reglar mot vindskyddet, stommen syns
  insIngen: new THREE.MeshStandardMaterial({ color: 0xd3bd93, roughness: 0.85 }),
  // vald vägg blinkar till i guld; träffytorna för klick i bilden ritas aldrig
  markering: new THREE.MeshBasicMaterial({ color: 0xc5a572, transparent: true, opacity: 0.38, depthWrite: false, side: THREE.DoubleSide }),
  // på en vit tät vägg syntes 0,38 knappt (runda 3: medelfärgen ändrades 3/−2/−14)
  markeringTat: new THREE.MeshBasicMaterial({ color: 0xc5a572, transparent: true, opacity: 0.62, depthWrite: false, side: THREE.DoubleSide }),
  traff: new THREE.MeshBasicMaterial({ visible: false, side: THREE.DoubleSide }),
  // plåtbeslaget över takpappens kant: från marken är takets kant det enda som syns av täckningen
  plat: new THREE.MeshStandardMaterial({ color: 0x8e9499, roughness: 0.38, metalness: 0.6 }),
  /* Öppningen i en öppen sida: ritas aldrig, men räknas som glas i fotolägets
     glasmask, så att fotots egna pixlar syns genom öppningen (granskningen:
     med Öppet kom husväggen bakom rummet helt från AI:n). */
  oppning: new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: false, side: THREE.DoubleSide }),
};
const INS_MAT = { ingen: M.insIngen, skiva: M.insSkiva, parlspont: M.insParlspont, tra: M.insTra };
/* Kanalplastens skuggdjup: hälften av skuggkartans punkter, se byggRum. */
const KANAL_SKUGGA = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, alphaHash: true, opacity: 0.5 });

/* ---------- ytstruktur ur världskoordinaten ----------
   Samma teknik som planlösningen: ETT program för alla strukturerade ytor,
   typen skickas som uniform. Fasadpanelen följer väggens riktning via
   världsnormalen, så gavlarna får stående panel även de. */
const TYPER = { panel: 1, dack: 2, gras: 3, sten: 4, matta: 5, takpanna: 6, parkett: 7, pannor: 8, kanal: 9, klinker: 10,
  liggande: 11, parlspont: 12, trapanel: 13, skiva: 14, reglar: 15 };
const STRUKTUR_GLSL = `
  float m = 1.0;
  if (uTyp == 1) {
    if (abs(vNormW.y) < 0.5) {
      float u = abs(vNormW.x) > 0.5 ? vVarld.z : vVarld.x;
      float p = u / 0.172;
      float kant = abs(fract(p) - 0.5) * 2.0;
      /* Fogen blir bredare och svagare när den är smalare än en pixel. Utan det bröts
         fogarna på en gavel i flack vinkel upp i prickar och fasadväggen såg ut som puts
         (trovärdighet 2026-09-29). Medelvärdet är detsamma, så husväggen ser ut som förut. */
      float fw = min(1.0, max(0.14, 3.0 * fwidth(p)));
      m *= 1.0 - 0.26 * (0.14 / fw) * smoothstep(1.0 - fw, 1.0, kant);
      m *= 0.965 + 0.05 * fract(sin(floor(p) * 12.9898) * 43758.5453);
    }
  } else if (uTyp == 2) {
    float p = vVarld.z / 0.145;
    float kant = abs(fract(p) - 0.5) * 2.0;
    float fw = min(1.0, max(0.12, 3.0 * fwidth(p)));
    m *= 1.0 - 0.5 * (0.12 / fw) * smoothstep(1.0 - fw, 1.0, kant);
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
    } else if (uTyp == 15) {
      // ingen beklädnad: reglar 45 mm c/c 60 cm, mörkare vindskydd mellan dem
      float f = abs(fract(u / 0.6) - 0.5);
      float regel = 1.0 - smoothstep(0.0225, 0.03, f);
      m *= mix(0.62, 1.0, regel);
      m *= 0.96 + 0.04 * sin(l * 9.0 + floor(u / 0.6) * 2.3);
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
  ['traVagg', 'liggande'], ['insSkiva', 'skiva'], ['insParlspont', 'parlspont'], ['insTra', 'trapanel'], ['insIngen', 'reglar']]) strukturera(M[k], t);

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

/* Uterummets delar, till fotolägets masker: stomme, tak, vagg, mobler och
   matt. Allt som ännu saknar del när en bit av byggRum är klar får den. */
function tagga(del) { rum.traverse((o) => { if (o !== rum && !o.userData.del) o.userData.del = del; }); }
/* Möblerna och växterna syns inte på kundens foto: mot ett riktigt foto var de
   det mest datorritade i bilden, och de stansade hål i glasmasken (granskningen
   2026-09-29). AI:n får ett tomt rum; Inifrån och 3D-läget är möblerade. */
function moblerSynliga() { const syns = !fotoVyNu(); rum.traverse((o) => { if (o.userData.del === 'mobler') o.visible = syns; }); }

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
  rum.traverse((o) => { if (o.userData.egenGeo) o.geometry.dispose(); });
  rum.clear();
  sektioner = [];
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
  rumMatt = { W, D, topBak: foto.aktiv ? hogst : Math.max(hogst, mote.hogst + 0.05), topFram, nock, zBak: -forl };   // topBak: rummets högsta punkt, till inramningen
  markeringar = {};

  // altanen med ett trappsteg ut mot trädgården
  rum.add(box(M.dack, W + 0.8, Y0, D + 0.7, 0, Y0 / 2, (D + 0.7) / 2));
  rum.add(box(M.dack, 1.5, Y0 / 2, 0.38, 0.9, Y0 / 4, D + 0.7 + 0.19));
  // golvet inne i rummet; altanen utanför och trappsteget förblir trall
  if (S.golv !== 'trall') rum.add(box(S.golv === 'parkett' ? M.parkett : M.klinker, W - 0.02, 0.006, D - 0.02, 0, Y0 + 0.003, D / 2, false));
  // gångplattor ut i gräset; på kundens foto finns redan en trädgård
  const plattor = new THREE.Group(); plattor.name = 'plattor'; plattor.visible = !fotoVyNu(); rum.add(plattor);
  for (let i = 0; i < 4; i++) plattor.add(box(M.sten, 0.62, 0.04, 0.46, 0.9 + (i % 2 ? 0.12 : -0.08), 0.02, D + 1.45 + i * 0.78));

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
  tagga('stomme');

  /* Täta skivor kastar skugga. Kanalplasten släpper igenom ungefär halva solen: skuggkartan kan bara
     säga av eller på, så dess skuggdjup ritas prickigt (alphaHash) och
     mjukas av skuggfiltret till en halvskugga. */
  const kanal = tak === 'kanalplast';
  const skiva = (forald, mat, w, t, d, x, y, z) => {
    const o = box(mat, w, t, d, x, y, z, tatt || kanal);
    if (kanal) o.customDepthMaterial = KANAL_SKUGGA;
    if (!tatt) o.renderOrder = 2;
    forald.add(o); return o;
  };
  const TACK = { kanalplast: M.kanal, takpapp: M.papp, takpannor: M.pannor };
  const [sb, sh, delning] = kanal ? [0.035, 0.07, 0.6] : [0.05, 0.09, 0.95];   // mellansparrarna
  const tS = tatt ? TJ : 0.016;                                                // täckningens tjocklek
  /* Ett lutande fall slutar med en ände vinkelrät mot fallet. Förlängs en del
     med vid(y) förbi sin ände hamnar dess ovankant y precis på huset (pulpet)
     eller mitt i nocken (sadel); resten går in i väggen eller i andra fallet. */
  const vid = (y) => y * Math.tan(a);
  ledBak = null;
  /* Takfoten på ett tätt tak, där täckningen syns från marken (granskningen:
     takpapp och takpannor skilde 1 % av pixlarna på fotot, bara takets kant och
     undersida syns i ögonhöjd). Pannor: raden av vågiga pannändar över
     takfotsbrädan. Papp: ett plåtbeslag över kanten. Takfoten löper längs x
     (pulpettakets front) eller längs z (sadeltakets sidor, utåt s). */
  const takfotKant = (grp, L, langs, kantPos, yTopp, mitt = 0, s = 1) => {
    if (tak === 'takpannor') {
      for (let u = -L / 2 + 0.15; u < L / 2 - 0.05; u += 0.3) {
        const p = new THREE.Mesh(CYL, M.pannor);
        if (langs === 'x') { p.rotation.x = Math.PI / 2; p.scale.set(0.14, 0.12, 0.04); p.position.set(u, TJ, kantPos - 0.06); }
        else { p.rotation.z = Math.PI / 2; p.scale.set(0.04, 0.12, 0.14); p.position.set(kantPos - s * 0.06, TJ, mitt + u); }
        p.castShadow = true; p.receiveShadow = true; grp.add(p);
      }
    } else if (tak === 'takpapp') {
      grp.add(langs === 'x' ? box(M.plat, L + 0.07, 0.035, 0.05, 0, yTopp - 0.012, kantPos + 0.012)
        : box(M.plat, 0.05, 0.035, L + 0.05, kantPos + s * 0.012, yTopp - 0.012, mitt));
    }
  };

  if (form === 'plant') {
    rum.add(box(M.profil, W, BH, 0.12, 0, topBak - BH / 2, 0.06));              // väggbalk
    rum.add(box(M.profil, 0.12, BH, D, -W / 2 + 0.06, topBak - BH / 2, D / 2));
    rum.add(box(M.profil, 0.12, BH, D, W / 2 - 0.06, topBak - BH / 2, D / 2));
    if (mitt) rum.add(box(M.profil, 0.12, BH, D, 0, topBak - BH / 2, D / 2));
    if (kanal) {
      /* Kanalplast på ett plant tak: sparrar ut från huset ovanpå balkarna,
         skivan på dem, kantprofiler längs sidorna och ränna i fronten. */
      const n = Math.max(2, Math.round(W / delning));
      for (let i = 0; i <= n; i++) {
        const x = -W / 2 + 0.03 + (i * (W - 0.06)) / n;
        rum.add(box(M.profil, i === 0 || i === n ? 0.06 : sb, sh, D, x, topFram + sh / 2, D / 2));
      }
      skiva(rum, M.kanal, W - 0.02, tS, D, 0, topFram + sh + tS / 2, D / 2);
      // kantprofilerna 2 mm längre än skivan i fronten: inga ändytor i samma plan
      for (const s of [-1, 1]) rum.add(box(M.profil, 0.05, 0.035, D + 0.002, s * (W / 2 - 0.025), topFram + sh + tS + 0.0175 - 0.01, D / 2 + 0.001));
      rum.add(box(M.profil, W + 0.08, 0.09, 0.12, 0, topFram + 0.02, D + 0.05));
    } else {
      // takpapp på balkarna, med utsprång, vit takfotsbräda runt om och ränna i fronten
      skiva(rum, M.papp, W + 2 * UT, TJ, D + UT, 0, topFram + TJ / 2, (D + UT) / 2);
      rum.add(box(INS_MAT[S.insida], W - 0.02, 0.012, D - 0.02, 0, topFram - 0.006, D / 2));   // innertak i kundens beklädnad
      const vy = topFram + TJ + 0.02 - 0.1;
      rum.add(box(M.vitt, W + 2 * UT + 0.05, 0.2, 0.025, 0, vy, D + UT + 0.0125));
      for (const s of [-1, 1]) rum.add(box(M.vitt, 0.025, 0.2, D + UT + 0.025, s * (W / 2 + UT + 0.0125), vy, (D + UT + 0.025) / 2));
      // plåtbeslag över takfotsbrädan och pappens kant
      rum.add(box(M.plat, W + 2 * UT + 0.07, 0.035, 0.05, 0, topFram + TJ + 0.02 - 0.012, D + UT + 0.012));
      for (const s of [-1, 1]) rum.add(box(M.plat, 0.05, 0.035, D + UT + 0.05, s * (W / 2 + UT + 0.012), topFram + TJ + 0.02 - 0.012, (D + UT + 0.05) / 2));
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
      takfotKant(fall, W + 2 * UT, 'x', UT, TJ + 0.01);
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
        takfotKant(fall, D + UT + forl, 'z', s * (Ls + UT), TJ + 0.01, (D + UT - forl) / 2, s);
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
  tagga('tak');

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
  // på kundens foto får fasadväggen husets färg från fotot (provFasad)
  const VAGG_MAT = { tra: M.traVagg, fasad: foto.aktiv ? M.fotoFasad : M.fasad };
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
    // en öppen sida: samma kontur som osynlig öppning, som glaset i fotolägets glasmask
    if (glas(k) && S.vagg === 'oppen') {
      const op = new THREE.Mesh(geo, M.oppning);
      op.position.z = -0.1; op.scale.z = 0.05; op.userData = { oppning: true, vagg: k };
      ramGrupp(k).add(op);
    }
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
  tagga('vagg');

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
  tagga('tak');

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
  tagga('mobler');
  moblerSynliga();

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
  mattGrupp.visible = vy !== 'inne' && !drarNu;
  rum.add(mattGrupp);
  tagga('matt');
  mattPunkter = [new THREE.Vector3(-W * 0.15, mY, zF + 0.32), new THREE.Vector3(xS + 0.32, mY, D * 0.5), new THREE.Vector3(xH - 0.3, Y0 + H * 0.5, zF)];
  // materialet mitt på varje vägg, på väggens utsida; normalen avgör om väggen vetter mot kameran
  const hM = Y0 + H * 0.62;
  materialPunkter = [
    { k: 'vv', p: new THREE.Vector3(-W / 2 - 0.05, hM, D * 0.42), n: new THREE.Vector3(-1, 0, 0) },
    { k: 'vf', p: new THREE.Vector3(0, hM, D + 0.05), n: new THREE.Vector3(0, 0, 1) },
    { k: 'vh', p: new THREE.Vector3(W / 2 + 0.05, hM, D * 0.42), n: new THREE.Vector3(1, 0, 0) },
  ];
  // inifrån sitter gavlarnas etikett längre fram, där kamerans blick mot främre hörnet når den
  const hI = Y0 + H * 0.72;
  materialPunkter[0].pi = new THREE.Vector3(-W / 2 + 0.3, hI, D * 0.78);
  materialPunkter[1].pi = new THREE.Vector3(0, hI, D - 0.3);
  materialPunkter[2].pi = new THREE.Vector3(W / 2 - 0.3, hI, D * 0.78);
  materialPunkter.forEach(({ k }, i) => { materialEl[i].textContent = `${VAGG_KORT[k]} · ${materialOrd(k)}`; materialEl[i].dataset.m = S[k]; });
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
  /* På kundens foto finns inget påhittat hus att ansluta mot: taket slutar mot
     husväggen på fotot, och inget av husets snitt byggs. */
  if (!foto.aktiv) {
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
  } else {
    anslutning = false;
    /* Sadeltaket på fotot: gaveln mot huset stängs ovanför väggbalken, i husets
       färg. Annars syntes husets eget tak ur fotot genom gavelns glas, som en
       mörk tegeltriangel mitt i innertaket (granskningen 2026-09-29). */
    if (form === 'sadel') {
      const o = new THREE.Mesh(new THREE.ExtrudeGeometry(form2d([[-W / 2, topFram - BH], [W / 2, topFram - BH], [W / 2, topFram], [0, nock], [-W / 2, topFram]]),
        { depth: 0.02, bevelEnabled: false }), M.fotoFasad);
      o.position.z = 0.002; o.castShadow = true; o.receiveShadow = true; o.userData.egenGeo = true;
      rum.add(o);
    }
  }
  tagga('tak');
  if (foto.aktiv) kontaktSkugga();

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
  if (fotoVyNu()) { sattFotoLjus(); return; }
  // tillbaka från fotot: 3D-bildens egen exponering, sol och dimma
  renderare.toneMappingExposure = 1.0;
  sol.target.position.set(0, 0, 2); sol.shadow.radius = 1;
  scen.fog.near = DIMMA.near; scen.fog.far = DIMMA.far;
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
      + (S.glas === 'tonat' ? 'Det tonade glaset dämpar solen.' : 'Tonat glas dämpar solen genom partierna.');
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
/* Kundloopen 2026-09-29: med två täta gavlar syntes bara den högra inifrån, också när
   Vänster valdes. Nu tittar kameran mot den gavel som valdes sist; innan någon valts
   mot den täta gaveln om bara en är tät. */
let inneSida = null;
const inneSpegel = () => ((inneSida || (S.vv !== 'glas' && S.vh === 'glas' ? 'vv' : 'vh')) === 'vv' ? -1 : 1);
function vyLage(v) {
  const { W, D } = rumMatt;
  // inramningen räknas med den vyns egen bildvinkel, inte den som råkar gälla nu
  const spara = kamera.fov;
  kamera.fov = VY_FOV[v]; kamera.updateProjectionMatrix();
  let ut;
  const sx = uteSida === 'vv' ? -1 : 1;
  if (v === 'ute') ut = centreraI(new THREE.Vector3(sx * 0.3, 1.25, D * 0.55), new THREE.Vector3(sx * 0.85, 0.56, 1).normalize(), rumHorn());
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
  const mg = rum.getObjectByName('matt'); if (mg) mg.visible = v !== 'inne' && !drarNu;
  /* Fotot och Inifrån i fotoläget: scenen byts, och kameran hoppar i stället
     för att åka mellan två olika bilder. På fotot står kameran still. */
  if (foto.aktiv && (v === 'foto') !== (vyFore === 'foto')) { tween = null; tillampaFotoVy(); ms = 0; }
  if (v === 'foto') { tween = null; kontroller.enabled = false; fotoKamera(); sattFotoLjus(); skrivFotoInfo(); ritaNu(); return; }
  const { pos, mal, fov } = vyLage(v);
  flytta(pos, mal, ms, () => { kontrollLage(v); kontroller.enabled = true; }, fov);
}

/* ---------- storlek ---------- */
function passa() {
  const b = scenEl.clientWidth, h = scenEl.clientHeight;
  // på fotot gäller fotots eget bildförhållande, så placeringen aldrig glider av en avrundad pixel
  kamera.aspect = fotoVyNu() ? foto.kvot : b / h; kamera.updateProjectionMatrix();
  renderare.setPixelRatio(Math.min(devicePixelRatio, 1.75));   // först, setPixelRatio kallar setSize
  renderare.setSize(b, h, false);
  canvasRekt = renderare.domElement.getBoundingClientRect();
  ritaNu();
}
let storlekTimer = 0;
addEventListener('resize', () => {
  if (fotoVyNu()) lagFotoLayout();
  passa();
  clearTimeout(storlekTimer);
  storlekTimer = setTimeout(() => { if (vy !== 'inne' && vy !== 'foto') { const l = vyLage(vy); flytta(l.pos, l.mal, 400, () => { kontrollLage(vy); kontroller.enabled = true; }, l.fov); } }, 180);
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
  const w = e.offsetWidth, h = e.offsetHeight;
  e._ruta = [Math.round(x - w / 2), Math.round(y - h / 2), w, h];
  e.style.transform = `translate3d(${e._ruta[0]}px, ${e._ruta[1]}px, 0)`;
  return syns;
}
/* Punkterna är i rummets egna koordinater; på fotot står rummet flyttat och vridet. */
const iVarlden = (p) => p.clone().applyMatrix4(rum.matrixWorld);
function placeraEtiketter() {
  const bw = renderare.domElement.clientWidth, bh = renderare.domElement.clientHeight;
  const synligaMatt = [];
  rum.updateMatrixWorld();
  (vy === 'ovan' ? mattPunkterOvan : mattPunkter).map(iVarlden).forEach((p, i) => {
    const syns = flyttaEtikett(mattEl[i], p, bw, bh) && vy !== 'inne';
    mattEl[i].style.opacity = !syns ? '0' : skymsAvVagg(p) ? '0.22' : '1';
    if (syns) synligaMatt.push(mattEl[i]._ruta);
  });
  /* Väggens namn och material, med samma namn som i panelen ("Vänster · Trä"). Inifrån
     sitter etiketten på väggens insida (kundloopen: bilden sa bara "Glas" och "Trä"). */
  const visa = vy !== 'ovan' && (vaggSekSyns || nuTid() < materialTill);
  const inne = vy === 'inne';
  materialPunkter.forEach(({ k, p, n, pi }, i) => {
    const q = iVarlden(inne ? pi : p), nv = n.clone().transformDirection(rum.matrixWorld);
    const mot = _r.copy(kamera.position).sub(q).dot(nv);
    const syns = flyttaEtikett(materialEl[i], q, bw, bh) && visa && (inne ? mot < -0.3 : mot > 0.3);
    /* Sista rundan: "Front · Glas" lade sig över måttet "3,50 m". En väggetikett som
       krockar med ett synligt mått flyttas upp ovanför det (eller ner om det inte går). */
    if (syns) {
      const ruta = materialEl[i]._ruta, [x, , w, h] = ruta;
      // några varv: en flytt kan landa på nästa etikett (också en tidigare väggetikett)
      for (let varv = 0; varv < 3; varv++) {
        const krock = synligaMatt.find(([mx, my, mw, mh]) => x < mx + mw + 4 && x + w + 4 > mx && ruta[1] < my + mh + 4 && ruta[1] + h + 4 > my);
        if (!krock) break;
        const upp = krock[1] - h - 6;
        ruta[1] = upp >= 0 ? upp : krock[1] + krock[3] + 6;
      }
      materialEl[i].style.transform = `translate3d(${x}px, ${ruta[1]}px, 0)`;
      synligaMatt.push(ruta);
    }
    materialEl[i].style.opacity = syns ? '1' : '0';
    materialEl[i].classList.toggle('vald', k === valdVagg);
  });
}

/* ---------- slingan ---------- */
function slinga() {
  requestAnimationFrame(slinga);
  stegRuta(true);
  if (foto.aktiv) autoSlinga();
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
  if (takInsetSyns()) ritaTakInset();
  placeraEtiketter();
  placeraPunkter();
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
// glas någonstans: glaspartier i en glasvägg. Då gäller valet klart eller tonat glas.
const harGlasYta = (o = S) => harGlas(o) && o.vagg !== 'oppen';
/* Grupper som inte gäller med valen just nu. De fälls ihop till sin förklaring. */
const gruppAv = (grupp) => (grupp === 'vagg' ? !harGlas() : grupp === 'glas' ? !harGlasYta() : grupp === 'insida' ? !harInsida() : false);
const listaOrd = (a) => (a.length > 1 ? a.slice(0, -1).join(', ') + ' och ' + a[a.length - 1] : a[0] || '');
const stor = (t) => t.charAt(0).toUpperCase() + t.slice(1);

/* ---------- stegen ----------
   Kundloopen 2026-09-29: alla tio grupper låg i en lista på 3,3 skärmhöjder, och på
   telefonen syntes 345 px av den åt gången. Nu är valen fem steg i en flikrad, som
   Rensons, och bara ett steg syns åt gången. */
const FASER = ['matt', 'tak', 'vaggar', 'golv', 'tillval'];
let fas = 'matt';
const mobil = () => innerWidth <= 860;
function visaFas(f, rulla = true) {
  if (!FASER.includes(f)) return;
  const byt = f !== fas;
  fas = f;
  // på fotot: punkterna försvinner när kunden går vidare från Mått första gången, så bilden blir ren
  if (foto.aktiv && placeraAuto && f !== 'matt') {
    placeraAuto = false; sattPlacering(false);
    // första gången: säg var placeringen finns (granskningen: på telefonen är knappen bara en ikon)
    if (!placeringTips) { placeringTips = true; visaToast('Placeringen är sparad. Tryck på Placering (knappen med korset) för att ändra den.'); }
  }
  for (const p of document.querySelectorAll('[data-fas]')) p.hidden = p.dataset.fas !== f;
  for (const t of document.querySelectorAll('[data-flik]')) {
    const pa = t.dataset.flik === f;
    t.setAttribute('aria-selected', String(pa)); t.tabIndex = pa ? 0 : -1;
  }
  if (byt && rulla) {
    if (!mobil()) $('panel-inre').scrollTop = 0;
    else {
      // flikraden fram precis under den klistrade 3D-bilden, om kunden har skrollat förbi den
      const fl = document.querySelector('.flikar').getBoundingClientRect(), under = $('buhne').getBoundingClientRect().bottom;
      if (fl.top < under) scrollBy(0, fl.top - under - 8);
    }
  }
  ritaNu();
}
/* Ett element fram i panelens synliga del: på datorn i panelens rullning, på telefonen
   mellan 3D-bilden och den fasta bokningsraden (friktion: materialknapparna hamnade
   under bokningsraden, bara 30 px syntes). */
const LAG_SKARM = matchMedia('(min-width:861px) and (max-height:960px)');
function framTill(el, smidigt = !REDUCERAD, behall = null) {
  if (!el || !el.getClientRects().length) return;
  const r = el.getBoundingClientRect();
  let topp, botten, rulla;
  if (!mobil()) {
    const inre = $('panel-inre'), c = inre.getBoundingClientRect();
    // 36 px tonad nederkant (28 px på låga skärmar, se index.html) och 8 px luft
    topp = c.top + 12; botten = c.bottom - (LAG_SKARM.matches ? 36 : 44);
    rulla = (d) => inre.scrollBy({ top: d, behavior: smidigt ? 'smooth' : 'auto' });
  } else {
    topp = $('buhne').getBoundingClientRect().bottom + 12;
    const pb = $('prisbar');
    botten = innerHeight - (pb.classList.contains('dold') ? 0 : pb.offsetHeight) - 12;
    rulla = (d) => scrollBy({ top: d, behavior: smidigt ? 'smooth' : 'auto' });
  }
  let d = 0;
  if (r.bottom > botten) d = r.bottom - botten;
  if (r.top - d < topp) d = r.top - topp;
  // behall: det här ska synas kvar (knappen man just tryckte på), hellre en bit av el under kanten
  if (behall && d > 0) d = Math.min(d, Math.max(0, behall.getBoundingClientRect().top - (topp - 12)));
  if (Math.abs(d) > 1) rulla(d);
}
/* En kort not under fältet när ett mått hamnar utanför gränserna (kundloopen: 1500 cm blev tyst 700). */
const gransTimer = {};
function visaGrans(el, text) {
  el.textContent = text; el.hidden = false;
  clearTimeout(gransTimer[el.id]);
  gransTimer[el.id] = setTimeout(() => { el.hidden = true; }, 6000);
}

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
  if (grupp === 'form') {
    const lut = v === S.form ? S.lutOnskad : LUT[v] ? LUT[v].std : S.lut;
    return { form: v, lut, lutOnskad: lut, tak: takVidForm(v) };
  }
  return { [grupp]: v };
}
/* Täckningen efter ett byte till formen v: var täckningen den som ingår, blir den den som
   ingår för den nya formen (kundloopen: pulpettak bytte tyst till glastak, ett tillval). */
function takVidForm(v, o = S) {
  const ingar = GRUNDVAL.tak[v];
  if (o.tak === GRUNDVAL.tak[o.form] && TAK_FOR[v].includes(ingar)) return ingar;
  return TAK_FOR[v].includes(o.tak) ? o.tak : TAK_FOR[v].includes(ingar) ? ingar : TAK_FOR[v][0];
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
  if (gruppAv(grupp) || (grupp === 'nat' && !harGlas())) return [annat ? 'Ingår' : 'Tillval', !annat];
  const kr = tillaggsPris(grupp, v);
  if (kr == null || kr === 0) return [annat ? 'Ingår' : 'Tillval', !annat];
  return [skillnad(kr), kr > 0 && !annat];
}
/* Dina tillval: allt som skiljer sig från grundpriset, med vad det kostar när priser finns. */
function tillvalLista() {
  const ut = [];
  const nu = prisNu();
  // kort: samma tillval med färre ord, till bokningens två rader
  const lagg = (text, bort, kort = text) => {
    const utan = nu && prisNu(normalisera({ ...S, ...bort }));
    ut.push({ text, kort, kr: nu && utan ? nu.total - utan.total : null });
  };
  if (!ingarVal('form', S.form)) lagg(FORM[S.form], { form: grundFor('form') });
  if (!ingarVal('tak', S.tak)) lagg(TAK[S.tak], { tak: grundFor('tak') });
  for (const k of VAGGAR) if (S[k] !== GRUNDVAL.material) lagg(`${MATERIAL[S[k]]}: ${VAGGNAMN[k].toLowerCase()}`, { [k]: GRUNDVAL.material }, `${stor(MATERIAL_KORT[S[k]])} ${VAGG_KORT[k].toLowerCase()}`);
  if (harGlas() && S.vagg !== GRUNDVAL.vagg && !annatUtforande('vagg', S.vagg)) lagg(VAGG[S.vagg], { vagg: GRUNDVAL.vagg });
  if (harGlasYta() && S.glas !== GRUNDVAL.glas) lagg(GLAS[S.glas], { glas: GRUNDVAL.glas });
  if (S.golv !== GRUNDVAL.golv) lagg(`Golv i ${GOLV[S.golv].toLowerCase()}`, { golv: GRUNDVAL.golv }, GOLV[S.golv]);
  if (S.h > GRUNDVAL.hojd + 1e-9) lagg(`Höjd ${dec(S.h, 2)} m vid takfoten`, { h: GRUNDVAL.hojd }, `Höjd ${dec(S.h, 2)} m`);
  if (harInsida() && S.insida !== GRUNDVAL.insida) lagg(S.insida === 'ingen' ? 'Insida utan beklädnad' : `Insida i ${INSIDA[S.insida].toLowerCase()}`, { insida: GRUNDVAL.insida }, `${INSIDA[S.insida]} inne`);
  if (S.led) lagg('LED-belysning', { led: false });
  if (S.nat && harGlas()) lagg('Insektsnät', { nat: false });
  return ut;
}
/* Ingår i grundpriset: en kort lista, skriven ur GRUNDVAL. */
function ingarLista() {
  const g = GRUNDVAL, perTak = {};
  for (const f of Object.keys(FORM)) (perTak[g.tak[f]] = perTak[g.tak[f]] || []).push(FORM[f].toLowerCase());
  return [
    `Stomme och golv i ${GOLV[g.golv].toLowerCase()}`,
    stor(g.form.map((f) => FORM[f].toLowerCase()).join(' eller ')),
    stor(Object.entries(perTak).map(([t, f]) => `${TAK[t].toLowerCase()} på ${listaOrd(f)}`).join(', ')),
    `Väggar i glas med ${VAGG[g.vagg].toLowerCase()} och ${GLAS[g.glas].toLowerCase()}`,
    `Höjd upp till ${dec(g.hojd, 2)} m vid takfoten`,
    g.insida === 'ingen' ? 'Insida utan beklädnad (beklädnad är tillval)' : `${INSIDA[g.insida]} på insidan`,
    'Alla profilfärger',
  ];
}
/* Det som ingår i grundpriset i kundens egen design, val för val. Tillsammans med
   tillvalLista är det hela designen: summeringen visar båda utan extra tryck. */
function ingarDesign() {
  const ut = ['stomme'];
  if (ingarVal('form', S.form)) ut.push(lutande() ? `${FORM[S.form].toLowerCase()} ${S.lut}°` : FORM[S.form].toLowerCase());
  if (ingarVal('tak', S.tak)) ut.push(TAK[S.tak].toLowerCase());
  const glasV = VAGGAR.filter((k) => S[k] === GRUNDVAL.material);
  const oppet = S.vagg === 'oppen';
  if (glasV.length === VAGGAR.length) ut.push(oppet ? 'öppna sidor utan glas' : 'glasväggar');
  else if (glasV.length) ut.push(`${oppet ? 'öppet' : 'glas'}: ${listaOrd(glasV.map((k) => VAGGNAMN[k].toLowerCase()))}`);
  if (glasV.length && !oppet && (S.vagg === GRUNDVAL.vagg || annatUtforande('vagg', S.vagg))) ut.push(VAGG[S.vagg].toLowerCase());
  if (harGlasYta() && S.glas === GRUNDVAL.glas) ut.push(GLAS[S.glas].toLowerCase());
  if (harInsida() && S.insida === GRUNDVAL.insida) ut.push(S.insida === 'ingen' ? 'insida utan beklädnad' : `insida i ${INSIDA[S.insida].toLowerCase()}`);
  if (S.golv === GRUNDVAL.golv) ut.push(GOLV[S.golv].toLowerCase());
  if (S.h <= GRUNDVAL.hojd + 1e-9) ut.push(`höjd ${dec(S.h, 2)} m`);
  ut.push(`profilfärg ${FARGER.find((x) => x.id === S.farg).namn.toLowerCase()}`);
  return ut;
}
const mattText = () => `${dec(S.b, 2)} × ${dec(S.d, 2)} m · höjd ${dec(S.h, 2)} m`;
const tillvalText = (t) => (t.length ? t.map((r) => r.text + (r.kr != null ? ` (${skillnad(r.kr)})` : '')).join(', ') : 'Inga tillval');

function vaggText() {
  if (VAGGAR.every((k) => S[k] === 'glas')) return S.vagg === 'oppen' ? 'öppna sidor utan glas' : 'glasväggar';
  return 'väggar: ' + VAGGAR.map((k) => `${VAGGNAMN[k].toLowerCase()} ${materialOrd(k)}`).join(', ');
}
function sammanfattning(html = true) {
  const f = FARGER.find((x) => x.id === S.farg).namn;
  const till = [S.led && 'LED-belysning', S.nat && harGlas() && 'insektsnät'].filter(Boolean);
  const matt = `${dec(S.b, 2)} × ${dec(S.d, 2)} m · höjd ${dec(S.h, 2)} m`;
  const form = lutande() ? `${FORM[S.form]} ${S.lut}°` : FORM[S.form];
  const delar = [`${dec(S.b * S.d)} m²`, form, TAK[S.tak], vaggText()];
  if (harGlas()) delar.push(VAGG[S.vagg]);
  if (harGlasYta()) delar.push(GLAS[S.glas]);
  if (harInsida()) delar.push(S.insida === 'ingen' ? 'insida utan beklädnad' : `insida i ${INSIDA[S.insida].toLowerCase()}`);
  delar.push(`golv i ${GOLV[S.golv].toLowerCase()}`, f);
  if (till.length) delar.push(till.join(' och '));
  return html ? `<b>${matt}</b> · ${delar.join(' · ')}` : `${matt} · ${delar.join(' · ')}`;
}
/* Summeringen: med priser det uppskattade priset och "Så räknas det", utan
   priser vad som ingår och dina tillval. Inga kronor syns utan priser. */
function skrivPris() {
  const pris = prisNu(), till = tillvalLista();
  const pd = $('pris-detaljer');
  pd.hidden = !pris;
  if (!pris && pd.open) pd.open = false;
  $('pris-etikett').textContent = PRISLAGE === 'exempel' ? 'Exempelpris' : 'Uppskattat pris';
  $('ut-pris').textContent = pris ? kronor(pris.total) : '';
  $('prisrader').innerHTML = pris ? pris.rader.map((r) => `<li><span>${r.text}${r.hur ? `<small>${r.hur}</small>` : ''}</span><b>${kronor(r.kr)}</b></li>`).join('') : '';
  $('prisbar-text').innerHTML = pris ? `${PRISLAGE === 'exempel' ? 'Exempelpris' : 'Uppskattat pris'} <b id="ut-pris-bar">${kronor(pris.total)}</b>`
    : `Dina tillval <b id="ut-pris-bar">${till.length ? `${till.length} valda` : 'Inga'}</b>`;
  // båda listorna utfällda, hela tiden (kundloopen: tillvalen kapades med "…" och ingår låg bakom "Vad ingår")
  $('sammanfattning').innerHTML = `<b>${mattText()}</b> · ${dec(S.b * S.d)} m²`;
  const ingarTxt = stor(ingarDesign().join(', '));
  const tillTxt = till.length ? till.map((r) => r.text + (r.kr != null ? ` (${skillnad(r.kr)})` : '')).join(', ') : 'Inga än';
  $('sum-ingar').textContent = ingarTxt; $('sum-tillval').textContent = tillTxt;
  $('sum-ingar').title = ingarTxt; $('sum-tillval').title = tillTxt;
  // samma listor hela i steget Tillval (låga skärmar kapar sammanfattningen till en rad)
  $('lista-ingar').textContent = ingarTxt; $('lista-tillval').textContent = tillTxt;
  $('testnot').textContent = PRISLAGE === 'exempel' ? 'Exempelpriser – inte Alltfix priser. Slutpris efter hembesök.'
    : PRISLAGE ? 'Slutpris efter hembesök.' : 'Priset tar vi fram tillsammans vid hembesöket.';
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
    const lf = $('lut-grad');
    if (document.activeElement !== lf) lf.value = S.lut;
    lf.setAttribute('aria-valuenow', S.lut); lf.setAttribute('aria-valuemin', r.min); lf.setAttribute('aria-valuemax', r.max);
    $('lut-min').textContent = `${r.min}°`; $('lut-max').textContent = `${r.max}°`;
    const nn = $('nock-not');
    nn.hidden = !(nockMax < lg.max && S.lut >= nockMax);
    const varfor = forHogt({ ...S, lut: nockMax + 1 }) === 'forl' ? `gå mer än ${dec(FORL_MAX, 0)} m upp på husets tak` : 'gå över husets nock';
    nn.textContent = S.lutOnskad > S.lut ? `Lutningen är sänkt från ${S.lutOnskad}° till ${S.lut}°: brantare skulle taket ${varfor}.`
      : `Brantare än ${nockMax}° skulle taket ${varfor}.`;
  }
  // på fotot: taket över husets takfot (om den är markerad) ger samma sorts not, med förslag
  const overTf = foto.aktiv && overTakfot() > 0.01;
  $('anslut-not').hidden = !ansluter() && !overTf;
  $('anslut-not').textContent = overTf ? takfotRad() : 'Taket ansluts till husets tak. Anslutningen går vi igenom vid hembesöket.';
  const pannNot = S.tak === 'takpannor' && S.form === 'pulpet';
  $('lut-not').hidden = !pannNot;
  $('lut-not').textContent = pannorHojde ? `Takpannor kräver minst ${PANNOR_MIN}° lutning, så lutningen är höjd till ${PANNOR_MIN}°.`
    : `Takpannor kräver minst ${PANNOR_MIN}° lutning.`;
  for (const b of document.querySelectorAll('[data-grupp="tak"] [data-varde]')) b.hidden = !TAK_FOR[S.form].includes(b.dataset.varde);
  // datorn och plattan liggande: knapparna står utan beskrivning, den valda täckningens står under dem
  const takBesk = document.querySelector(`[data-grupp="tak"] [data-varde="${S.tak}"] small`);
  $('tak-text').textContent = takBesk ? `${takBesk.textContent}.` : '';
  $('tak-ingar').textContent = `Ingår i grundpriset: ${listaOrd(GRUNDVAL.form.map((f) => `${FORM[f].toLowerCase()} med ${TAK[GRUNDVAL.tak[f]].toLowerCase()}`))}. Övriga tak är tillval.`;
  // väggarna: ritningen färgas efter materialet, knapparna gäller vald vägg
  for (const b of document.querySelectorAll('[data-vagg]')) {
    const k = b.dataset.vagg;
    b.className = `plan-vagg m-${S[k]}`;
    b.setAttribute('aria-pressed', String(k === valdVagg));
    b.setAttribute('aria-label', `${VAGGNAMN[k]}: ${MATERIAL[S[k]].toLowerCase()}`);
    // väggens namn och material i segmentet (runda 3: namnet syntes först efter ett val)
    b.querySelector('span').innerHTML = `<small>${VAGG_KORT[k]}</small>${stor(materialOrd(k))}`;
  }
  $('vagg-vald').textContent = `${VAGGNAMN[valdVagg]}: ${materialOrd(valdVagg)}`;
  $('material-text').textContent = S[valdVagg] === 'glas' ? 'Glasväggen får glaspartier som går att öppna.'
    : S[valdVagg] === 'tra' ? 'Vitmålad träpanel med vita hörnbrädor.'
      + (S.farg !== 'vit' ? ' Med profilfärg Vit blir också stolparna vita.' : '')
      : 'Samma fasad och sockel som huset, så uterummet ser ut som en del av huset.';
  /* Grupper som inte gäller just nu fälls ihop till rubriken och förklaringen
     (runda 3: nedtonade knappar tog 165–200 px var). */
  const glasNu = harGlas();
  for (const k of ['vagg', 'glas', 'insida']) {
    const g = document.querySelector(`[data-grupp="${k}"]`), av = gruppAv(k);
    g.classList.toggle('av', av); g.closest('.sek').classList.toggle('av', av);
    for (const b of g.querySelectorAll('[data-varde]')) b.setAttribute('aria-disabled', String(av));
  }
  $('vagg-text').textContent = glasNu ? VAGG_TEXT[S.vagg] : 'Ingen vägg är av glas.';
  const glasText = !harGlasYta() ? (glasNu ? 'Inga glaspartier i väggarna.' : 'Ingen vägg är av glas.') : '';
  $('glas-text').hidden = !glasText;
  $('glas-text').textContent = glasText;
  $('insida-text').textContent = harInsida() ? `På insidan av trä- och fasadväggarna och i innertaket under tätt tak. ${foto.aktiv ? 'Syns genom glaset, och i vyn Inifrån.' : 'Syns i vyn Inifrån.'}`
    : 'Gäller trävägg, fasadvägg och tätt tak.';
  // nätet finns bara på glasväggar: utan dem går det inte att slå på (runda 3)
  const nat = $('nat');
  nat.disabled = !glasNu; nat.checked = S.nat && glasNu;
  $('led').checked = S.led;                // också när en AI-version läser tillbaka sin design (granskningen)
  nat.closest('.vaxel').classList.toggle('av', !glasNu);
  $('nat-text').textContent = glasNu ? 'Nät i öppningarna när glaset är öppet' : 'Finns bara på glasväggar';
  // priset räknas ur samma tal som byggde rummet, i samma bildruta
  skrivPris();
  skrivEtiketter();
  $('ut-farg').textContent = FARGER.find((x) => x.id === S.farg).namn;
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
  skrivAi();
  if (foto.aktiv) skrivFotoInfo();
  skrivHash();
}
function tillampaFarg() { M.profil.color.setHex(FARGER.find((x) => x.id === S.farg).hex); ritaNu(); }
/* På fotot släpper klart glas igenom fotot nästan orört: granskningen mätte att
   husväggen bakom 3D-glaset tappade 55–80 % av färgen (falurött blev gråbrunt).
   Tonat glas behåller en tydlig ton. */
function tillampaGlas() {
  const pa = fotoVyNu();
  if (S.glas === 'tonat') { M.glas.color.set(pa ? 0x4c5553 : 0x55605f); M.glas.opacity = pa ? 0.32 : 0.44; }
  else if (pa) { M.glas.color.set(0xc9d1d3); M.glas.opacity = 0.04; }
  else { M.glas.color.set(0x86a3ab); M.glas.opacity = 0.2; }
  M.glas.envMapIntensity = pa ? 0.6 : 1.8;
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
function avmarkera() {
  clearTimeout(markerTimer); markerad = null;
  for (const o of Object.values(markeringar)) o.visible = false;
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
  const sidaFore = inneSpegel();
  valdVagg = k;
  if (k !== 'vf') inneSida = k;
  visaFas('vaggar', false);
  markera(k); visaMaterial(); uppdateraText();
  /* Kameran vänds så att väggen syns i varje vy (kundloopen: inifrån stod den kvar).
     Ovanifrån syns inga väggar, så vyn går ut till Utifrån. */
  if (vy === 'inne') { if (inneSpegel() !== sidaFore) sattVy('inne', 600); }
  else if (vy === 'ovan') { if (k !== 'vf') uteSida = k; sattVy('ute', 700); }
  else vandTill(k);
  if (fran3D) visaToast(`${VAGGNAMN[k]}: ${materialOrd(k)}. Välj material under ritningen.`);
  // materialknapparna fram (runda 3 och kundloopen: de låg under bokningsraden eller utanför panelen)
  requestAnimationFrame(() => framTill(document.querySelector('[data-grupp="material"]')));
}

document.addEventListener('click', (e) => {
  const flik = e.target.closest('[data-flik]');
  if (flik) { visaFas(flik.dataset.flik); return; }
  const nasta = e.target.closest('[data-till]');
  if (nasta) {
    visaFas(nasta.dataset.till);
    document.querySelector(`[data-flik="${nasta.dataset.till}"]`).focus({ preventScroll: true });
    return;
  }
  const knapp = e.target.closest('[data-varde]');
  if (knapp) {
    const gr = knapp.closest('[data-grupp]');
    if (gr.classList.contains('av')) return;           // gäller inget just nu, förklaringen står under
    const grupp = gr.dataset.grupp;
    const nyckel = grupp === 'material' ? valdVagg : grupp;
    const v = knapp.dataset.varde;
    if (S[nyckel] === v) return;
    const takFore = S.tak, takNy = grupp === 'form' ? takVidForm(v) : null;
    S[nyckel] = v;
    if (takNy) S.tak = takNy;
    // ny form börjar på sin standardlutning; pannor kan sedan lyfta den
    if (grupp === 'form' && LUT[v]) S.lut = S.lutOnskad = LUT[v].std;
    if (grupp === 'form' || grupp === 'tak') { pannorHojde = false; normalisera(); }
    if (grupp === 'form' && S.tak !== takFore) {
      visaToast(`Taktäckningen är nu ${TAK[S.tak].toLowerCase()}${ingarVal('tak', S.tak) ? `, som ingår för ${FORM[v].toLowerCase()}` : ''}.`);
    }
    /* Ny takform på datorn och plattan liggande: täckningen och lutningen fram i panelens
       rullning, men aldrig så långt att takformen man just tryckte på rullar bort
       (granskningen 2026-09-29). På telefonen och plattan stående rullar inget, som förut. */
    if (grupp === 'form' && !mobil()) {
      setTimeout(() => framTill(!$('lut-rad').hidden ? $('lut-rad') : document.querySelector('[data-grupp="tak"]'), undefined, gr), 60);
    }
    if (['tak', 'vagg', 'form', 'golv', 'material', 'insida'].includes(grupp)) {
      if (grupp === 'vagg' || grupp === 'material') stangPartier();
      byggRum();
      if (['tak', 'vagg', 'form'].includes(grupp) && vy !== 'inne') sattVy(vy, 600);
      if (grupp === 'material') {
        /* På fotot skimrar väggen inte i guld när materialet byts: skimret låg
           över det nya materialet i 1,4 s, och fasadväggen såg beige ut i stället
           för husets färg (granskningen 2026-09-29). Ett pågående skimmer släcks. */
        if (fotoVyNu()) avmarkera(); else markera(valdVagg);
        visaMaterial();
        // inifrån: blicken vänds mot den täta väggen; utifrån: mot gaveln som ändrades
        if (vy === 'inne') sattVy('inne', 600); else if (uteSida !== valdVagg && valdVagg !== 'vf' && vy === 'ute') vandTill(valdVagg);
        if (v === 'tra' && S.farg !== 'vit' && !traTips) { traTips = true; visaToast('Tips: Alltfix målar stolparna vita till trä. Välj Vit under Profilfärg.'); }
      }
      // insidan syns bara inifrån: dit går kameran när kunden väljer beklädnad (runda 3).
      // På fotot stannar bilden på kundens hus och Inifrån är ett frivilligt val (granskningen 2026-09-29).
      if (grupp === 'insida') {
        if (fotoVyNu()) visaToast('Beklädnaden syns genom glaset. Tryck på Inifrån för att se den på nära håll.');
        else sattVy('inne', vy === 'inne' ? 600 : KAMERA_MS);
      }
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

document.querySelector('.flikar').addEventListener('keydown', (e) => {
  const i = FASER.indexOf(fas);
  const ny = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? FASER.length - 1 : null;
  if (ny == null) return;
  e.preventDefault();
  const f = FASER[(ny + FASER.length) % FASER.length];
  visaFas(f); document.querySelector(`[data-flik="${f}"]`).focus({ preventScroll: true });
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
  /* Under placeringen på fotot väljer ett tryck ingen vägg: valet bytte till steget
     Väggar, och det stängde placeringen (granskningen 2026-09-29: punkterna
     försvann efter ett drag som inte träffade punkten). */
  if (fotoVyNu() && placeraPa) return;
  const k = vaggVid(e.clientX, e.clientY);
  if (k) valjVagg(k, true);
});
/* Vilken vägg ligger under en punkt på skärmen? Strålen går mot allt i
   rummet och huset, och det första ogenomskinliga den träffar avgör. Hör det
   till en vägg väljs den: en tät gavel som syns genom frontens glas väljs
   alltså, inte fronten. Annars väljs den närmaste glasväggen strålen
   passerat före träffen. Tak, hus och mark väljer ingenting (runda 3: ett
   klick på taket valde en dold gavel bakom det). */
const GENOMSKINLIGT = new Set([M.glas, M.kanal, M.nat, M.markering, M.markeringTat, M.matt, M.oppning]);
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
  /* På fotot står uterummets vänstra hörn (A) kvar vid väggens fot när bredden
     ändras, och B flyttas (granskningen: bredden växte åt båda håll, förbi husets hörn). */
  if (foto.aktiv && k === 'b') {
    const l = foto.lage, [A] = hornVarld(l, fore), ux = Math.cos(l.t), uz = -Math.sin(l.t);
    sattFotoLage({ cx: A.x + ux * S.b / 2, cz: A.z + uz * S.b / 2 });
  }
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
  // gränserna skrivs ur MATT, samma tal som reglaget och fältet klämmer till
  const [cmMin, cmMax] = [Math.round(g.min * 100), Math.round(g.max * 100)];
  document.querySelector(`[data-granser="${k}"]`).innerHTML = `<span>${cmMin} cm</span><span>${cmMax} cm</span>`;
  const not = $(g.id + '-not');
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
    if (Number.isFinite(cm)) {
      sattMattVarde(k, cm / 100);
      if (cm < cmMin || cm > cmMax) visaGrans(not, `${stor(g.namn)} går från ${cmMin} till ${cmMax} cm, så ${cm} cm blev ${Math.round(S[k] * 100)} cm.`);
    }
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
    const steg = () => {
      tillampaInskrivet();
      const vid = riktning > 0 ? S[k] >= g.max - 1e-9 : S[k] <= g.min + 1e-9;
      sattMattVarde(k, S[k] + riktning * 0.01); skrivFalt();
      if (vid) visaGrans(not, riktning > 0 ? `${stor(g.namn)} är högst ${cmMax} cm.` : `${stor(g.namn)} är minst ${cmMin} cm.`);
    };
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
/* Reglagen på pekskärm (granskningen 2026-09-29: ett rullsvep uppåt som började
   på Taklutning ändrade 10° till 15°). Webbläsaren flyttar reglaget redan när
   fingret sätts ned. Värdet hålls därför kvar hos reglaget tills fingret visat
   vart det är på väg: mer lodrätt än vågrätt är ett rullsvep, och reglaget går
   tillbaka till värdet det hade, utan att designen hunnit ändras; vågrätt är
   ett drag och värdet släpps fram som förut. Ett tryck utan rörelse flyttar
   reglaget dit, som förut. Mus, tangentbord, −/+ och fälten berörs inte. */
{
  let g = null, sparrChange = false, sparrTimer = 0;
  const slapp = (r) => { g.lage = 'h'; if (g.vantar && r.value !== g.v0) r.dispatchEvent(new Event('input', { bubbles: true })); };
  const tillbaka = (r) => { r.value = g.v0; sparrChange = true; clearTimeout(sparrTimer); sparrTimer = setTimeout(() => { sparrChange = false; }, 600); };
  addEventListener('touchstart', (e) => {
    const r = e.target instanceof Element && e.target.closest('input[type=range]');
    if (g && e.touches.length > 1) { if (g.lage !== 'h') tillbaka(g.r); g = null; return; }   // ett andra finger: inget ändras
    if (!r || e.touches.length !== 1) return;
    const t = e.changedTouches[0];
    sparrChange = false;
    g = { r, id: t.identifier, x: t.clientX, y: t.clientY, v0: r.value, lage: '?', vantar: false };
  }, { capture: true, passive: true });
  addEventListener('touchmove', (e) => {
    if (!g || g.lage !== '?') return;
    const t = [...e.changedTouches].find((u) => u.identifier === g.id); if (!t) return;
    const dx = t.clientX - g.x, dy = t.clientY - g.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 8) return;
    if (Math.abs(dy) > Math.abs(dx)) { g.lage = 'v'; tillbaka(g.r); } else slapp(g.r);
  }, { capture: true, passive: true });
  const slut = (e, avbrutet) => {
    if (!g || ![...e.changedTouches].some((u) => u.identifier === g.id)) return;
    if (g.lage === '?' && !avbrutet) slapp(g.r);
    else if (g.lage !== 'h') tillbaka(g.r);
    g = null;
  };
  addEventListener('touchend', (e) => slut(e, false), { capture: true, passive: true });
  addEventListener('touchcancel', (e) => slut(e, true), { capture: true, passive: true });
  addEventListener('input', (e) => {
    if (!g || e.target !== g.r || g.lage === 'h') return;
    e.stopImmediatePropagation();
    if (g.lage === 'v') g.r.value = g.v0; else g.vantar = true;
  }, true);
  addEventListener('change', (e) => {
    if (!(e.target instanceof HTMLInputElement) || e.target.type !== 'range') return;
    if ((g && e.target === g.r && g.lage !== 'h') || sparrChange) e.stopImmediatePropagation();
  }, true);
}
const lutInp = $('lut');
lutInp.addEventListener('input', () => {
  const v = Math.round(+lutInp.value);
  if (v === S.lut) return;
  S.lut = S.lutOnskad = v; pannorHojde = false; normalisera();
  byggINastaRuta(); uppdateraText();
});
lutInp.addEventListener('change', mattKlart);
/* Lutningen i hela grader, klämd till reglagets gränser (formens och husets nock). */
function sattLut(v) {
  const lo = +lutInp.min, hi = +lutInp.max, ny = Math.min(hi, Math.max(lo, Math.round(v)));
  if (ny !== S.lut) { S.lut = S.lutOnskad = ny; pannorHojde = false; normalisera(); byggINastaRuta(); uppdateraText(); }
  return { ny, lo, hi };
}
{
  const f = $('lut-grad'), not = $('lut-grans');
  let vidFokus = S.lut, smutsig = false;
  const skriv = () => { f.value = S.lut; smutsig = false; };
  const tillampa = () => {
    if (!smutsig) return;
    const t = /^\s*(\d+(?:[.,]\d+)?)\s*(°|grader)?\s*$/i.exec(f.value);
    if (t) {
      const v = Math.round(parseFloat(t[1].replace(',', '.')));
      const { ny, lo, hi } = sattLut(v);
      if (ny !== v) visaGrans(not, `Lutningen går från ${lo}° till ${hi}° här, så ${v}° blev ${ny}°.`);
    }
    smutsig = false;
  };
  const klart = () => { tillampa(); skriv(); if (S.lut !== vidFokus) { vidFokus = S.lut; mattKlart(); } };
  f.addEventListener('focus', () => { vidFokus = S.lut; smutsig = false; f.select(); });
  f.addEventListener('input', () => { smutsig = true; });
  f.addEventListener('blur', klart);
  f.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); klart(); f.select(); }
    else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') { e.preventDefault(); tillampa(); sattLut(S.lut + (e.key === 'ArrowUp' ? 1 : -1)); skriv(); }
  });
  f.addEventListener('keyup', (e) => { if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && S.lut !== vidFokus) { vidFokus = S.lut; mattKlart(); } });
  for (const knapp of document.querySelectorAll('[data-lutsteg]')) {
    knapp.addEventListener('click', () => {
      tillampa();
      const r = +knapp.dataset.lutsteg, fore = S.lut, { lo, hi } = sattLut(S.lut + r);
      skriv();
      if (S.lut === fore) visaGrans(not, r > 0 ? `Brantast här är ${hi}°.` : `Flackast här är ${lo}°.`);
      else mattKlart();
    });
  }
}
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
    { rootMargin: '-52% 0px 0px 0px', threshold: [0, 0.5, 1] }).observe($('boka'));
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
  // fotot kan inte delas, bara designen och placeringen (säg det kort)
  const utanFoto = foto.aktiv ? ' Fotot följer inte med.' : '';
  try { await navigator.clipboard.writeText(location.href); visaToast('Länken till din design är kopierad.' + utanFoto); }
  catch { visaToast('Kopiera länken i adressfältet, den innehåller din design.' + utanFoto); }
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
  // på fotot: en länk med placering flyttar rummet till samma ställe på fotot
  if (foto.aktiv) {
    const fp = fpFranLank, r = fp && lageUrLank(fp);
    if (r) { foto.lage = r.l; foto.takfot = fp.tf; foto.bekraftad = true; }
    fpFranLank = null;
  }
  byggKo = false; byggRum(); tillampaFarg(); tillampaGlas(); sattSol(); uppdateraText();
  sattVy(vy, ms);
  if (foto.aktiv) skrivFotoInfo();
}
addEventListener('hashchange', () => nyHash());

/* ============================================================
   Fotoläget: uterummet på kundens eget foto
   Rami 2026-09-29: ett riktigt foto av platsen där uterummet ska byggas,
   och uterummet inlagt med rätt storlek, perspektiv och ljus, med alla val.
   Fotot ligger bakom duken och duken täcker exakt fotots yta. Kameran står
   i origo och tittar längs −z, marken är y = 0 och uterummet byggs med samma
   byggRum i verkliga meter.
   Placeringen (granskningen 2026-09-29): skalan kommer från kamerans höjd,
   inte från att två punkter ska ligga exakt bredden isär på ett foto utan
   måttstock. Den förra regeln gav rummet i 64–85 % av rätt storlek.
   · Den streckade horisonten ligger på kamerans höjd: där husets vågräta
     linjer ser helt raka ut. Den ger kamerans lutning.
   · Kamerans höjd: 1,6 m (ögonhöjd) om inget annat anges, eller uppmätt med
     en dörr på fotot (tröskel och överkant).
   · Punkterna A och B vid väggens fot är uterummets bakre hörn. Avståndet
     mellan dem på marken är bredden, som skrivs in i breddfältet. Ändras
     bredden efteråt står A kvar och B flyttas.
   · Bildvinkeln läses ur fotots EXIF (35 mm-brännvidden), annars en
     mobilkamera: 50° lodrätt i ett liggande 4:3-foto.
   ============================================================ */
const fotoEl = $('foto'), punktLager = $('punkter'), horisontEl = $('horisont'), jmfEl = $('jmf'), arbetarEl = $('arbetar');
const luppEl = $('lupp'), fotoLapp = $('foto-lapp'), dorrLinje = $('dorr-linje');
const handtag = Object.fromEntries([...punktLager.querySelectorAll('[data-punkt]')].map((el) => [el.dataset.punkt, el]));
/* Den fotorealistiska bilden (knappen Skapa fotorealistisk bild, routen
   /api/uterum-montage/). Av i leveransen till Alltfix (Mathias 2026-09-29, "A"):
   då anropar sidan aldrig routen, knapparna och jämförelsen tas bort ur sidan,
   och fotot stannar i webbläsaren. Slås den på igen: byt också texterna om
   fotot i index.html (foto-sek och start-integritet). */
const AI_BILD = false;
let aiBildUrl = null;         // adressen till AI-bilden som visas eller senast visades, följer med bokningen
let placeraPa = false, placeraAuto = false, dorrLage = false, placeringTips = false;
let guide = null;             // eget foto: 'dorr' (första draget), 'vagg' (andra draget) eller null
let drag = null;

/* Skuggfångare: osynliga ytor som bara visar rummets skugga, på marken och på
   husväggens plan bakom rummet. De följer rummets placering. Skuggan tonas ut
   en bit utanför rummet, på väggen också uppåt: granskningen såg skuggan gå
   runt husets hörn och in på gaveln, som är ett annat plan. */
const skuggGrans = { b: { value: 3.4 }, y: { value: 4 }, z: { value: 8 }, inv: { value: new THREE.Matrix4() } };
const skuggMat = new THREE.ShadowMaterial({ opacity: 0.36, depthWrite: false });
skuggMat.onBeforeCompile = (sh) => {
  Object.assign(sh.uniforms, { uHalvB: skuggGrans.b, uYTopp: skuggGrans.y, uZMax: skuggGrans.z, uInv: skuggGrans.inv });
  sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vVarldS;')
    .replace('#include <project_vertex>', '#include <project_vertex>\n  vVarldS = (modelMatrix * vec4(transformed, 1.0)).xyz;');
  sh.fragmentShader = sh.fragmentShader.replace('uniform float opacity;', 'uniform float opacity;\nvarying vec3 vVarldS;\nuniform float uHalvB;\nuniform float uYTopp;\nuniform float uZMax;\nuniform mat4 uInv;')
    .replace('#include <tonemapping_fragment>', `vec3 lok = (uInv * vec4(vVarldS, 1.0)).xyz;
  gl_FragColor.a *= (1.0 - smoothstep(uHalvB, uHalvB + 0.6, abs(lok.x))) * (1.0 - smoothstep(uYTopp - 0.6, uYTopp, lok.y)) * (1.0 - smoothstep(uZMax - 2.5, uZMax, lok.z));
  #include <tonemapping_fragment>`);
};
const fotoSkugga = new THREE.Group();
{
  const mark = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), skuggMat);
  mark.rotation.x = -Math.PI / 2; mark.position.set(0, 0.002, 20);
  const vagg = new THREE.Mesh(new THREE.PlaneGeometry(40, 14), skuggMat);
  vagg.position.set(0, 7, -0.004);
  for (const o of [mark, vagg]) { o.receiveShadow = true; o.renderOrder = 1; fotoSkugga.add(o); }
}
/* Kontaktskuggan: en mjuk mörk kant runt altanen på marken, så att rummet står
   på fotots gräs och inte svävar över det. Solens skugga ensam räcker inte när
   solen står bakom fotografen, då faller den bakom rummet. Kanvasen har fast
   storlek: en CanvasTexture som byter storlek efter första ritningen får ett
   GL_INVALID_VALUE, och skuggan syntes aldrig (granskningen 2026-09-29). */
const KONTAKT_PX = 512;
const kontaktKanvas = document.createElement('canvas');
kontaktKanvas.width = KONTAKT_PX; kontaktKanvas.height = KONTAKT_PX;
const kontaktTex = new THREE.CanvasTexture(kontaktKanvas);
const kontakt = new THREE.Mesh(new THREE.PlaneGeometry(1, 1),
  new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, alphaMap: kontaktTex, opacity: 0.4, depthWrite: false }));
kontakt.rotation.x = -Math.PI / 2; kontakt.renderOrder = 1;
fotoSkugga.add(kontakt);
let kontaktNyckel = '';
function kontaktSkugga() {
  const Wd = S.b + 0.8, Dd = S.d + 0.7, m = 0.6;   // altanen, 60 cm runt om
  const nyckel = `${Wd}|${Dd}`;
  if (nyckel === kontaktNyckel) return;
  kontaktNyckel = nyckel;
  const bw = Wd + 2 * m, bh = Dd + m, sx = KONTAKT_PX / bw, sy = KONTAKT_PX / bh;
  const g = kontaktKanvas.getContext('2d');
  g.filter = 'none'; g.fillStyle = '#000'; g.fillRect(0, 0, KONTAKT_PX, KONTAKT_PX);
  // kanvasens överkant är husväggen: skuggan börjar där och går aldrig in bakom väggen
  g.filter = `blur(${Math.round(0.16 * (sx + sy) / 2)}px)`; g.fillStyle = '#fff';
  g.fillRect(m * sx, 0, Wd * sx, Dd * sy);
  g.fillRect((m + Wd / 2 + 0.15) * sx, Dd * sy, 1.5 * sx, 0.38 * sy);   // trappsteget
  g.filter = 'none';
  kontaktTex.needsUpdate = true;
  kontakt.scale.set(bw, bh, 1);
  kontakt.position.set(0, 0.003, bh / 2);
}
fotoSkugga.visible = false;
scen.add(fotoSkugga);
/* Fasadväggen på fotot får husets egen färg, uppmätt på fotot bredvid rummet. */
M.fotoFasad = new THREE.MeshStandardMaterial({ color: 0xe8e5de, roughness: 0.86 });
strukturera(M.fotoFasad, 'panel');
function provFasad() {
  if (!foto.bild) return;
  const g = foto.bild.getContext('2d'), l = foto.lage, ux = Math.cos(l.t), uz = -Math.sin(l.t), prov = [];
  // husväggen till vänster och höger om rummet, mellan 0,8 och 1,6 m: medianen tål ett fönster eller ett träd
  for (const u of [-S.b / 2 - 0.9, -S.b / 2 - 0.5, S.b / 2 + 0.5, S.b / 2 + 0.9]) for (const y of [0.8, 1.2, 1.6]) {
    const f = tillFoto(new THREE.Vector3(l.cx + ux * u, y, l.cz + uz * u));
    if (!f || f[0] < 0.01 || f[0] > 0.99 || f[1] < 0.01 || f[1] > 0.99) continue;
    const d = g.getImageData(Math.round(f[0] * foto.w) - 3, Math.round(f[1] * foto.h) - 3, 7, 7).data;
    const s = [0, 0, 0];
    for (let i = 0; i < d.length; i += 4) { s[0] += d[i]; s[1] += d[i + 1]; s[2] += d[i + 2]; }
    prov.push(s.map((v) => v / (d.length / 4)));
  }
  if (prov.length < 3) { M.fotoFasad.color.copy(M.fasad.color); return; }
  const med = (k) => prov.map((p) => p[k]).sort((a, b) => a - b)[prov.length >> 1] / 255;
  // fotots färg har redan dagsljuset i sig: något ljusare grundfärg, så väggen inte blir mörkare än huset
  M.fotoFasad.color.setRGB(med(0), med(1), med(2), THREE.SRGBColorSpace).multiplyScalar(1.3);
  for (const k of ['r', 'g', 'b']) M.fotoFasad.color[k] = Math.min(1, M.fotoFasad.color[k]);
  ritaNu();
}
/* Inifrån i fotoläget: dagens 3D-vy, men utan det påhittade huset. En slät
   vägg i husets färg från fotot står där husväggen på fotot är, så ingen
   takfot går in i rummet (granskningen: inifrån syntes en generisk vägg). */
const fotoHusvagg = box(M.fotoFasad, 18, 7, 0.2, 0, 3.5, -0.1);
fotoHusvagg.visible = false;
scen.add(fotoHusvagg);

/* ---------- kameran ---------- */
const TAN_STD = Math.tan(25 * D2R);
/* En mobilkameras bildvinkel: 50° lodrätt i ett liggande 4:3-foto. Andra format
   räknas som en beskärning av samma sensor (granskningen: ett kvadratiskt foto
   fick 63,7° och djupet ritades 23 % för kort). */
function standardFov(kvot) {
  const t = TAN_STD, L = t * 4 / 3;
  const tv = kvot >= 4 / 3 ? L / kvot : kvot >= 1 ? t : kvot >= 3 / 4 ? t / kvot : L;
  return (2 * Math.atan(tv)) / D2R;
}
/* 35 mm-brännvidden ur JPEG-filens EXIF (0xA405), med bildens pixelmått
   (0xA002, 0xA003) om de finns, eller null. Läses innan fotot ritas om i en
   canvas, där EXIF försvinner. 0,5×, 1×, 2× och 3× ger olika brännvidd. */
async function exifBrannvidd(fil) {
  try {
    const d = new DataView(await fil.slice(0, 256 * 1024).arrayBuffer());
    if (d.getUint16(0) !== 0xffd8) return null;
    for (let o = 2; o + 10 < d.byteLength;) {
      const mk = d.getUint16(o), len = d.getUint16(o + 2);
      if (mk === 0xffe1 && d.getUint32(o + 4) === 0x45786966) {        // "Exif"
        const t = o + 10, le = d.getUint16(t) === 0x4949;
        const u16 = (p) => d.getUint16(t + p, le), u32 = (p) => d.getUint32(t + p, le);
        const ifd = (p) => { const ut = {}; for (let i = 0, n = u16(p); i < n; i++) { const e = p + 2 + i * 12; ut[u16(e)] = u16(e + 2) === 3 ? u16(e + 8) : u32(e + 8); } return ut; };
        const ifd0 = ifd(u32(4));
        if (!ifd0[0x8769]) return null;
        const ex = ifd(ifd0[0x8769]);
        return ex[0xa405] ? { f35: ex[0xa405], w: ex[0xa002] || 0, h: ex[0xa003] || 0 } : null;
      }
      if ((mk & 0xff00) !== 0xff00 || mk === 0xffda) break;
      o += 2 + len;
    }
  } catch { /* ingen läsbar EXIF */ }
  return null;
}
/* Lodrät bildvinkel ur 35 mm-brännvidden: den gäller diagonalen (43,27 mm).
   Är fotot beskuret (EXIF-måtten har ett annat format) används standarden. */
function fovUrExif(ex, w, h) {
  if (!ex || ex.f35 < 8 || ex.f35 > 400) return null;
  if (ex.w && ex.h && Math.abs(Math.log((Math.max(ex.w, ex.h) / Math.min(ex.w, ex.h)) / (Math.max(w, h) / Math.min(w, h)))) > 0.02) return null;
  const fpx = (ex.f35 * Math.hypot(w, h)) / 43.27;
  return Math.min(100, Math.max(10, (2 * Math.atan(h / 2 / fpx)) / D2R));
}
const fotoFov = () => foto.fov;
const tanV = () => Math.tan((foto.fov * D2R) / 2);
function fotoKamera() {
  const l = foto.lage;
  kamera.fov = fotoFov(); kamera.aspect = foto.kvot; kamera.updateProjectionMatrix();
  kamera.position.set(0, l.h, 0); kamera.rotation.set(l.lutning, 0, 0); kamera.updateMatrixWorld(true);
  rum.position.set(l.cx, 0, l.cz); rum.rotation.set(0, l.t, 0); rum.updateMatrixWorld(true);
  fotoSkugga.position.copy(rum.position); fotoSkugga.rotation.copy(rum.rotation); fotoSkugga.updateMatrixWorld(true);
  // skuggan tonas ut 0,35–0,95 m utanför rummets sidor, under husets takfot och några meter framför altanen
  const tf = takfotHojd();
  skuggGrans.b.value = S.b / 2 + 0.35;
  skuggGrans.y.value = tf != null ? Math.max(1.5, tf + 0.3) : Math.max(3.4, (rumMatt ? rumMatt.topBak : 3) + 0.6);
  skuggGrans.z.value = S.d + 0.7 + 4;
  skuggGrans.inv.value.copy(fotoSkugga.matrixWorld).invert();
}
/* Taket ovanifrån, infällt uppe till höger i fotot medan steget Tak visas: från
   marken syns bara takets kant, så takpapp och takpannor skilde 1 % av
   pixlarna på fotot (granskningen 2026-09-29). Samma renderare och skuggkarta,
   en egen kamera i en ruta; skissen och maskerna ritas utan den. */
const insetKamera = new THREE.PerspectiveCamera(36, 4 / 3, 0.1, 150);
const takInsetSyns = () => fotoVyNu() && fas === 'tak' && !aiVisas && !!rumMatt;
/* Rutan står i det hörn av fotot som uterummet täcker minst, helst nertill: där
   är det oftast gräs. Uppe till höger täckte den husets gavel och övre fönster
   (granskningen 2026-09-29). */
function takInsetRuta() {
  const el = renderare.domElement, cw = el.clientWidth, ch = el.clientHeight;
  const w = Math.round(cw * (cw < 600 ? 0.4 : 0.3)), h = Math.round(w * 0.75), m = Math.round(Math.max(6, cw * 0.012));
  const horn = [[cw - w - m, ch - h - m], [m, ch - h - m], [cw - w - m, m], [m, m]];
  let [x, y] = horn[2];
  if (foto.aktiv && rumMatt) {
    const l = foto.lage, ux = Math.cos(l.t), uz = -Math.sin(l.t), fx = Math.sin(l.t), fz = Math.cos(l.t), bu = S.b / 2 + 0.4;
    const pts = [];
    for (const [u, yy, z] of [[-bu, 0, 0], [bu, 0, 0], [-bu, 0, S.d + 0.7], [bu, 0, S.d + 0.7], [-bu, rumMatt.topBak, 0], [bu, rumMatt.topBak, 0], [-bu, S.h, S.d], [bu, S.h, S.d]]) {
      const p = tillFoto(new THREE.Vector3(l.cx + ux * u + fx * z, yy, l.cz + uz * u + fz * z));
      if (p) pts.push([p[0] * cw, p[1] * ch]);
    }
    if (pts.length) {
      const x0 = Math.min(...pts.map((p) => p[0])), x1 = Math.max(...pts.map((p) => p[0])), y0 = Math.min(...pts.map((p) => p[1])), y1 = Math.max(...pts.map((p) => p[1]));
      const tackt = ([a, b]) => Math.max(0, Math.min(a + w, x1) - Math.max(a, x0)) * Math.max(0, Math.min(b + h, y1) - Math.max(b, y0));
      [x, y] = horn.reduce((bast, hh) => (tackt(hh) < tackt(bast) - 1 ? hh : bast), horn[0]);
    }
  }
  return { x, y, w, h, cw, ch };
}
function ritaTakInset() {
  const r = takInsetRuta();
  rum.updateMatrixWorld(true);
  const { W: rw, D: rd, topBak } = rumMatt, avst = Math.max(rw, rd) * 1.7 + 2;
  const mal = new THREE.Vector3(0, topBak * 0.4, rd * 0.5).applyMatrix4(rum.matrixWorld);
  insetKamera.position.copy(new THREE.Vector3(rw * 0.25, topBak + avst * 0.9, rd * 0.5 + avst * 0.6).applyMatrix4(rum.matrixWorld));
  insetKamera.up.set(0, 1, 0); insetKamera.lookAt(mal); insetKamera.aspect = r.w / r.h; insetKamera.updateProjectionMatrix();
  const skugga = fotoSkugga.visible, mg = rum.getObjectByName('matt'), mgSyns = mg && mg.visible;
  fotoSkugga.visible = false; if (mg) mg.visible = false;
  const cc = renderare.getClearColor(new THREE.Color()), ca = renderare.getClearAlpha();
  // WebGL räknar rutan nedifrån
  renderare.setScissorTest(true); renderare.setScissor(r.x, r.ch - r.y - r.h, r.w, r.h); renderare.setViewport(r.x, r.ch - r.y - r.h, r.w, r.h);
  renderare.setClearColor(0x2a2a44, 1);
  renderare.render(scen, insetKamera);
  renderare.setScissorTest(false); renderare.setViewport(0, 0, r.cw, r.ch); renderare.setClearColor(cc, ca);
  fotoSkugga.visible = skugga; if (mg) mg.visible = mgSyns;
}
/* En punkt på fotot (andelar 0–1 från övre vänstra hörnet) ner på marken, med
   kameran på höjden h och lutningen lut. null ovanför horisonten. */
function markTraff(fx, fy, h = foto.lage.h, lut = foto.lage.lutning) {
  const tv = tanV(), x = (2 * fx - 1) * tv * foto.kvot, y = (1 - 2 * fy) * tv;
  const c = Math.cos(lut), s = Math.sin(lut);
  const dy = y * c + s, dz = y * s - c;
  if (dy > -1e-4) return null;
  const k = h / -dy;
  return new THREE.Vector3(x * k, 0, dz * k);
}
/* En punkt i världen till fotot, i andelar, med kameran i läget l. */
function tillFoto(p, l = foto.lage) {
  const tv = tanV(), y = p.y - l.h, c = Math.cos(l.lutning), s = Math.sin(l.lutning);
  const yc = y * c + p.z * s, zc = -y * s + p.z * c;
  if (zc > -1e-3) return null;
  return [(p.x / (-zc * tv * foto.kvot) + 1) / 2, (1 - yc / (-zc * tv)) / 2];
}
const horisontY = (lut = foto.lage.lutning) => 0.5 + Math.tan(lut) / (2 * tanV());
const lutningAv = (fy) => Math.atan((fy - 0.5) * 2 * tanV());
/* Uterummets bakre hörn vid husväggens fot: rummets lokala x = ∓b/2. */
function hornVarld(l = foto.lage, b = S.b) {
  const ux = Math.cos(l.t), uz = -Math.sin(l.t);
  return [new THREE.Vector3(l.cx - ux * b / 2, 0, l.cz - uz * b / 2), new THREE.Vector3(l.cx + ux * b / 2, 0, l.cz + uz * b / 2)];
}
/* Punkterna på fotot: A och B som [x, y] och horisonten H som y, i andelar. */
function fotoPunkter() {
  const [A, B] = hornVarld(), a = tillFoto(A), b = tillFoto(B);
  return a && b ? { A: a, B: b, H: horisontY() } : null;
}
/* Rummets golv, med altanen, ligger framför kameran och inte runt den. */
function rumFramfor(l, b = S.b) {
  const ux = Math.cos(l.t), uz = -Math.sin(l.t), fz = Math.cos(l.t);
  if (Math.hypot(l.cx, l.cz) > 80) return false;
  return [[-b / 2, 0], [b / 2, 0], [-b / 2, S.d + 0.7], [b / 2, S.d + 0.7]].every(([u, w]) => l.cz + uz * u + fz * w < -0.3);
}
/* Placeringen ur punkterna A och B (andelar), lutningen och kamerans höjd h.
   Avståndet mellan punkternas markträffar blir bredden, klämd till 3–7 m.
   Hörnet fast ('A' eller 'B') står kvar och det andra flyttas, med 'M' står
   mitten kvar (dragen längs väggen: rummet flyttar inte kundens punkt åt ena
   hållet); med bredd given används den i stället. Svaret är { l, b, klamd } eller null. */
function lageFranPunkter(a, b, lut = foto.lage.lutning, h = foto.lage.h, fast = 'A', bredd = null) {
  const p = markTraff(a[0], a[1], h, lut), q = markTraff(b[0], b[1], h, lut);
  if (!p || !q || !(h > 0.2 && h < 30)) return null;
  const dx = q.x - p.x, dz = q.z - p.z, L = Math.hypot(dx, dz);
  if (L < 0.05) return null;
  const bb = bredd != null ? bredd : klamMatt('b', L), ux = dx / L, uz = dz / L, t = Math.atan2(-uz, ux);
  if (Math.abs(t) > 80 * D2R) return null;
  const [ax, az] = fast === 'B' ? [q.x - ux * bb, q.z - uz * bb] : fast === 'M' ? [(p.x + q.x) / 2 - ux * bb / 2, (p.z + q.z) / 2 - uz * bb / 2] : [p.x, p.z];
  const l = { h, lutning: lut, cx: ax + ux * bb / 2, cz: az + uz * bb / 2, t };
  return rumFramfor(l, bb) ? { l, b: bb, klamd: bredd == null && Math.abs(bb - L) > 0.006 } : null;
}
/* Äldre länkar (före 2026-09-29): kamerans höjd räknades så att punkterna låg
   exakt bredden isär. */
function hojdUrBredd(a, b, lut, bredd = S.b) {
  const p = markTraff(a[0], a[1], 1, lut), q = markTraff(b[0], b[1], 1, lut);
  return p && q ? bredd / Math.hypot(q.x - p.x, q.z - p.z) : null;
}
/* En punkt på fotot som höjd över marken på husväggen: strålen genom punkten
   träffar husväggens plan genom A och B (rummets bakkant). */
function vaggHojd(pt, l = foto.lage) {
  if (!pt) return null;
  const tv = tanV(), x = (2 * pt[0] - 1) * tv * foto.kvot, y = (1 - 2 * pt[1]) * tv;
  const c = Math.cos(l.lutning), s = Math.sin(l.lutning);
  const dx = x, dy = y * c + s, dz = y * s - c, nx = Math.sin(l.t), nz = Math.cos(l.t);
  const den = dx * nx + dz * nz;
  if (Math.abs(den) < 1e-6) return null;
  const k = (l.cx * nx + l.cz * nz) / den;
  return k > 0 ? l.h + k * dy : null;
}
/* Husets takfot på fotot som höjd över marken, eller null när ingen är markerad. */
const takfotHojd = (l = foto.lage, tf = foto.takfot) => vaggHojd(tf, l);
/* Kamerans höjd ur dörrmåttstocken: dörrens tröskel och överkant på fotot, i
   husväggens plan. Tröskeln behöver inte stå på marken (en altandörr sitter på
   sockeln). Allt i bilden skalar med kamerans höjd: med höjden 1 blir dörren
   hd hög, och kamerans höjd är dörrens höjd / hd. */
function hojdUrDorr(d = foto.dorr, lut = foto.lage.lutning, f = fotoPunkter()) {
  if (!d || !f) return null;
  const p = markTraff(f.A[0], f.A[1], 1, lut), q = markTraff(f.B[0], f.B[1], 1, lut);
  if (!p || !q) return null;
  const l1 = { h: 1, lutning: lut, cx: (p.x + q.x) / 2, cz: (p.z + q.z) / 2, t: Math.atan2(-(q.z - p.z), q.x - p.x) };
  const yb = vaggHojd(d.fot, l1), yt = vaggHojd([d.fot[0], d.topp], l1);
  return yb != null && yt != null && yt - yb > 1e-3 ? d.hojd / (yt - yb) : null;
}
/* Startläget på ett nytt foto: telefonen rak, kameran i ögonhöjd och
   uterummets bakkant mitt i bilden, en tredjedel från nederkanten. Punkterna
   ska sedan flyttas till väggens fot: ingen text säger att det här stämmer. */
function autoPlacera() {
  const c = markTraff(0.5, 0.66, 1.6, 0);
  foto.lage = { h: 1.6, lutning: 0, cx: c.x, cz: c.z, t: 0 };
}
/* Exempelhuset är känt: placeringen, bildvinkeln (45,5°, ur fotots två
   flyktpunkter) och horisonten är uppmätta på fotot (granskningen 2026-09-29),
   kamerans höjd (0,97 m) ur altandörren (2,1 m) och takfoten (2,4 m) ur
   fotot. Fotot är mulet. Utan egen design blir rummet 4,5 × 3 m med höjden
   2,1 m, så att det ryms under husets låga takfot. */
const EXEMPEL = { fov: 45.5, A: [0.3375, 0.752], B: [0.789, 0.812], H: 0.63, dorr: { fot: [0.519, 0.754], topp: 0.442, hojd: 2.1 },
  tf: [0.52, 0.418], matt: { b: 4.5, d: 3, h: 2.1 },
  // björkstammen framför platsen, i fotots pixlar: den står 3 m närmare kameran än rummet
  bjork: [[62, 1125], [190, 1125], [166, 1060], [160, 950], [168, 860], [185, 780], [195, 700], [200, 600], [206, 500], [172, 480], [150, 560],
    [136, 700], [126, 790], [110, 760], [80, 700], [56, 620], [36, 520], [10, 470], [0, 520], [20, 620], [55, 720], [90, 810], [96, 870], [92, 960], [88, 1060]],
  /* stammarna ovanför klykan och grenarna framför rummets tak, som linjer med
     bredd [x, y, bredd] i fotots pixlar (granskningen 2026-09-29: taket skar av
     högra stammen vid klykan, och den tjocka grenen mot huset försvann) */
  grenar: [
    [[180, 650, 36], [179, 560, 34], [176, 480, 32], [172, 400, 30], [178, 320, 30], [182, 250, 28]],            // högra stammen
    [[196, 545, 26], [212, 450, 25], [233, 360, 24], [258, 280, 22], [268, 250, 20]],                             // stammen till höger om den
    [[196, 562, 26], [240, 536, 22], [282, 512, 19], [340, 483, 16], [393, 466, 13], [447, 400, 10], [513, 350, 8]], // tjocka grenen mot huset
    [[18, 300, 14], [60, 332, 15], [110, 392, 14], [158, 454, 13]],                                               // mörka grenen snett ned mot stammen
    [[100, 302, 11], [130, 340, 11], [162, 376, 10]],
    [[74, 650, 28], [70, 560, 27], [67, 470, 26], [66, 380, 25], [70, 290, 24]],                                  // vänstra stammen
    [[10, 650, 22], [6, 560, 22], [0, 470, 20]],                                                                  // stammen längst till vänster
  ] };
function exempelLage() {
  const lut = lutningAv(EXEMPEL.H), h = hojdUrDorr(EXEMPEL.dorr, lut, { A: EXEMPEL.A, B: EXEMPEL.B }) || 1;
  if (['b', 'd', 'h'].every((k) => S[k] === STANDARD[k])) { Object.assign(S, EXEMPEL.matt); normalisera(); }
  const r = lageFranPunkter(EXEMPEL.A, EXEMPEL.B, lut, h, 'A', S.b);
  if (r) foto.lage = r.l;
  foto.takfot = EXEMPEL.tf.slice();
  foto.dorr = { ...EXEMPEL.dorr, fot: EXEMPEL.dorr.fot.slice() }; foto.dorrMatt = true;
  foto.ljus.mulet = true; $('mulet').checked = true;
  foto.bekraftad = true;
  // björken målas in som förgrund från början
  if (!foto.pensel) {
    const c = penselKanvas(), g = c.getContext('2d'), sx = c.width / 1600, sy = c.height / 1200;
    g.fillStyle = '#fff'; g.beginPath();
    EXEMPEL.bjork.forEach(([x, y], i) => (i ? g.lineTo(x * sx, y * sy) : g.moveTo(x * sx, y * sy)));
    g.closePath(); g.fill();
    g.strokeStyle = '#fff'; g.lineCap = 'round'; g.lineJoin = 'round';
    for (const gren of EXEMPEL.grenar) for (let i = 1; i < gren.length; i++) {
      const [x0, y0, b0] = gren[i - 1], [x1, y1, b1] = gren[i];
      g.lineWidth = ((b0 + b1) / 2) * sx;
      g.beginPath(); g.moveTo(x0 * sx, y0 * sy); g.lineTo(x1 * sx, y1 * sy); g.stroke();
    }
    penselNr++;
  }
}
/* Placeringen ur en delad länk, till samma foto. */
function lageUrLank(fp) {
  if (fp.fv) foto.fov = fp.fv;
  const lut = lutningAv(fp.H), h = fp.kh || hojdUrBredd(fp.A, fp.B, lut);
  return h ? lageFranPunkter(fp.A, fp.B, lut, h, 'A', S.b) : null;
}
function sattFotoLage(l) {
  Object.assign(foto.lage, l);
  fotoKamera(); sattFotoLjus(); skrivFotoInfo(); skrivAi(); ritaNu();
}
/* En ny placering ur punkterna: bredden in i designen (rummet byggs om i nästa
   bildruta) och kameran och rummet på plats. */
function tillampaPlacering(r) {
  if (!r) return false;
  foto.klamd = r.klamd;
  if (r.b !== S.b) { S.b = r.b; normalisera(); byggINastaRuta(); }
  sattFotoLage(r.l); uppdateraText();
  return true;
}
/* Kamerans höjd, skriven eller stegad: punkterna står kvar på fotot. */
function sattKameraHojd(h, franDorr = false) {
  const f = fotoPunkter(); if (!f || !Number.isFinite(h)) return false;
  const ok = tillampaPlacering(lageFranPunkter(f.A, f.B, foto.lage.lutning, Math.min(10, Math.max(0.3, h)), 'A'));
  if (ok && !franDorr) foto.dorrMatt = false;
  skrivFotoInfo();
  return ok;
}

/* ---------- fotots ruta på sidan ---------- */
function fotoRuta() {
  // mediefrågan, inte innerWidth: på telefonen kan en zoomad vy göra innerWidth bredare än sidan
  const bu = $('buhne'), bw = bu.clientWidth, bh = bu.clientHeight, dator = !matchMedia('(max-width: 860px)').matches;
  const x0 = dator ? 20 + 372 + 24 : 0, x1 = dator ? bw - 20 : bw;
  const y0 = dator ? 84 : 58, y1 = dator ? bh - 88 : bh - 62;
  let w = x1 - x0, h = w / foto.kvot;
  if (h > y1 - y0) { h = y1 - y0; w = h * foto.kvot; }
  w = Math.round(w); h = Math.round(w / foto.kvot);
  return { x: Math.round(x0 + (x1 - x0 - w) / 2), y: Math.round(y0 + (y1 - y0 - h) / 2), w, h };
}
function lagFotoLayout() {
  const pa = fotoVyNu();
  document.documentElement.classList.toggle('fotovy', pa);
  document.documentElement.style.setProperty('--kvot', foto.kvot.toFixed(4));
  const r = pa ? fotoRuta() : null;
  for (const el of [fotoEl, scenEl, etikettLager, jmfEl, arbetarEl, punktLager, forgrundEl, penselYta, strakYta]) {
    if (r) Object.assign(el.style, { left: r.x + 'px', top: r.y + 'px', width: r.w + 'px', height: r.h + 'px', right: 'auto', bottom: 'auto' });
    else for (const k of ['left', 'top', 'width', 'height', 'right', 'bottom']) el.style[k] = '';
  }
  // först när rutan är satt: ett foto i naturlig storlek (1600 px) vidgade sidan på telefonen
  fotoEl.hidden = !pa; punktLager.hidden = !pa;
  jmfEl.hidden = !(pa && aiVisas);
  visaGuide();
  document.documentElement.classList.toggle('aivy', pa && aiVisas);
  ritaForgrund();
}
/* Scenens innehåll efter läget: fotot (bara rummet och skuggfångarna) eller
   3D (huset och tomten; i fotoläget Inifrån en slät vägg i stället för huset). */
function tillampaFotoVy() {
  const pa = fotoVyNu();
  hus.visible = !foto.aktiv;
  tomt.visible = !pa;
  fotoHusvagg.visible = foto.aktiv && !pa;
  fotoSkugga.visible = pa;
  const pl = rum.getObjectByName('plattor'); if (pl) pl.visible = !pa;
  moblerSynliga(); tillampaGlas();
  if (!pa) { rum.position.set(0, 0, 0); rum.rotation.set(0, 0, 0); rum.updateMatrixWorld(true); }
  // AI-bilden gäller fotot: Inifrån visar 3D, och tillbaka på fotot syns skissen
  if (!pa) aiVisas = false;
  lagFotoLayout();
  passa();
  if (pa) fotoKamera();
  kontroller.enabled = !pa && !tween;
  scenEl.setAttribute('aria-label', pa ? 'Uterummet på ditt foto. Dra guldpunkterna och horisontlinjen för att placera det.'
    : '3D-vy av uterummet. Dra för att vrida, nyp eller skrolla för att zooma.');
  sattPlacering(placeraPa);
  sattSol();
  skrivAi();
}
/* Knappar och texter som hör till läget. */
function visaLageKnappar() {
  const f = foto.aktiv;
  for (const b of document.querySelectorAll('[data-vy]')) b.hidden = f ? !['foto', 'inne'].includes(b.dataset.vy) : b.dataset.vy === 'foto';
  $('byt-foto').hidden = !f;
  $('till-foto').hidden = f || sidlage === 'start';
  $('foto-sek').hidden = !f;
  $('se-ovan').hidden = !f;
  $('sol-sek').hidden = f;                    // tiden på dagen gäller 3D-bilden; på fotot styrs ljuset under Mått
  skrivAi();
  $('marke-text').textContent = f ? 'Uterum på ditt hus' : 'Uterum i 3D';
  $('panel-ingress').textContent = f ? 'Fem steg. Varje val syns direkt på ditt foto, och vad som ingår.'
    : 'Fem steg. Du ser uterummet mot huset direkt, och vad som ingår.';
}
/* Punkterna och horisonten syns medan placeringen är på; då går rummet också att dra. */
function sattPlacering(pa) {
  placeraPa = pa;
  if (!pa && dorrLage) sattDorrLage(false);
  if (!pa && guide) guide = null;
  // ett eget foto som inte är placerat än: placeringen börjar med de två dragen igen
  if (pa && !guide && foto.aktiv && foto.bild && !foto.exempel && !foto.bekraftad) guide = foto.dorrMatt ? 'vagg' : 'dorr';
  punktLager.classList.toggle('av', !pa);
  document.documentElement.classList.toggle('placerar', pa && fotoVyNu());
  visaGuide();
  $('placera').setAttribute('aria-pressed', String(pa));
  skrivFotoInfo();
  ritaNu();
}
/* Dörrmåttstocken: två punkter på en dörr i fotot, tröskel och överkant. Den
   börjar mitt mellan A och B, på väggens fot, med överkanten dörrens höjd upp. */
function sattDorrLage(pa) {
  dorrLage = pa;
  if (pa && !foto.dorr) {
    const f = fotoPunkter(), l = foto.lage;
    const fot = f ? [(f.A[0] + f.B[0]) / 2, (f.A[1] + f.B[1]) / 2] : [0.5, 0.75];
    const g = markTraff(fot[0], fot[1]), t = g && tillFoto(new THREE.Vector3(g.x, 2.1, g.z), l);
    foto.dorr = { fot, topp: t ? t[1] : fot[1] - 0.25, hojd: 2.1 };
  }
  if (pa && !placeraPa) sattPlacering(true);
  punktLager.classList.toggle('dorr', pa);
  $('dorr-knapp').setAttribute('aria-pressed', String(pa));
  $('dorr-knapp').querySelector('span').textContent = pa ? 'Klar med dörren' : 'Mät kamerans höjd med en dörr';
  $('dorr-rad').hidden = !pa;
  skrivFotoInfo(); ritaNu();
}
const inom = (v, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
function placeraPunkter() {
  if (!fotoVyNu()) return;
  const f = fotoPunkter();
  const w = punktLager.clientWidth, h = punktLager.clientHeight;
  /* Ett hörn utanför fotot (brett rum) står kvar vid kanten, halvgenomskinligt,
     i stället för att försvinna (granskningen). */
  const flytta = (el, x, y) => {
    el.classList.toggle('utanfor', x < 0 || x > 1 || y < 0 || y > 1);
    el.style.transform = `translate3d(${Math.round(inom(x) * w)}px, ${Math.round(inom(y) * h)}px, 0)`;
  };
  for (const k of ['A', 'B']) { handtag[k].hidden = !f; if (f) flytta(handtag[k], f[k][0], f[k][1]); }
  const tl = $('tak-lapp'), ts = takInsetSyns();
  tl.hidden = !ts;
  if (ts) { const r = takInsetRuta(); tl.style.transform = `translate3d(${r.x + 8}px, ${r.y + 8}px, 0)`; }
  const hy = Math.round(horisontY() * h);
  handtag.H.style.transform = `translate3d(${Math.round(w * 0.9)}px, ${hy}px, 0)`;
  horisontEl.style.transform = `translateY(${hy}px)`;
  // takfoten: markerad eller föreslagen 2,8 m upp på väggen mitt över rummet
  let tf = foto.takfot;
  if (!tf) { const p = tillFoto(new THREE.Vector3(foto.lage.cx, 2.8, foto.lage.cz)); tf = p || [0.5, 0.3]; }
  handtag.T.classList.toggle('valfri', !foto.takfot);
  handtag.T.dataset.text = foto.takfot ? 'Takfot' : 'Takfot · valfri';
  flytta(handtag.T, tf[0], tf[1]);
  const d = foto.dorr;
  if (d) {
    flytta(handtag.D1, d.fot[0], d.fot[1]); flytta(handtag.D2, d.fot[0], d.topp);
    dorrLinje.style.transform = `translate3d(${Math.round(inom(d.fot[0]) * w)}px, ${Math.round(inom(d.topp) * h)}px, 0)`;
    dorrLinje.style.height = Math.max(0, Math.round((inom(d.fot[1]) - inom(d.topp)) * h)) + 'px';
  }
}
/* Varningar om placeringen, på fotot och i panelen: ett hörn utanför fotot,
   rummets framkant nära kameran (rummet fyller då hela bilden) och taket över
   husets takfot. */
function fotoVarningar() {
  const ut = [];
  const f = fotoPunkter();
  if (f && [f.A, f.B].some(([x, y]) => x < 0 || x > 1 || y > 1)) ut.push('Uterummet går utanför fotot. Minska bredden eller flytta punkterna.');
  const l = foto.lage, ux = Math.cos(l.t), uz = -Math.sin(l.t), fx = Math.sin(l.t), fz = Math.cos(l.t);
  const nara = Math.min(...[-1, 1].map((s) => { const u = s * (S.b / 2 + 0.4), w = S.d + 0.7; return Math.hypot(l.cx + ux * u + fx * w, l.cz + uz * u + fz * w); }));
  if (nara < 2.5) ut.push(`Du står nära: uterummets framkant är bara ${dec(nara, 1)} m från kameran. Ta gärna ett foto längre ifrån.`);
  const over = overTakfot();
  if (over > 0.01) ut.push(`Taket når ${Math.round(over * 100)} cm över husets takfot.`);
  return ut;
}
/* Texten om placeringen: i panelen, och kort på fotot medan placeringen är på
   (granskningen: på telefonen låg instruktionen under bokningsraden). */
function skrivFotoInfo() {
  if (!foto.aktiv) return;
  const h = foto.lage.h, varn = fotoVarningar();
  /* Stegen i panelen följer läget (granskningen 2026-09-29: exempelhuset stod
     redan placerat men panelen sa "dra från dörrens tröskel", och det draget
     flyttade rummet). De två dragen bara medan guiden på fotot väntar på dem. */
  $('foto-hjalp').hidden = !guide;
  $('foto-hjalp-klar').hidden = !!guide;
  $('foto-hjalp-klar').querySelector('.foto-steg-rubrik').textContent = foto.bekraftad
    ? `Uterummet står mot husväggen${foto.dorrMatt ? ', mätt mot altandörren' : ''}. Vill du ändra placeringen:`
    : 'Placera uterummet på fotot:';
  const f = $('kamera-cm');
  if (document.activeElement !== f) f.value = Math.round(h * 100);
  $('foto-kamera').textContent = !foto.bekraftad ? 'Flytta de två punkterna till husväggens fot, där uterummet ska börja och sluta.'
    : `Bredden enligt punkterna: ${dec(S.b, 2)} m${foto.klamd ? ' (uterummet är 3–7 m brett)' : ''}. `
      + (foto.dorrMatt ? `Kameran hölls ${dec(h, 2)} m upp, uppmätt med dörren.` : `Kameran antas ha hållits ${dec(h, 2)} m upp.`);
  const lapp = [];
  if (placeraPa) lapp.push(dorrLage ? 'Dra punkterna till dörrens tröskel och överkant'
    : foto.bekraftad ? 'Punkterna vid väggens fot · linjen där husets vågräta linjer ser raka ut'
      : '1 Dra punkterna till husväggens fot · 2 Dra linjen dit husets vågräta linjer ser raka ut');
  fotoLapp.innerHTML = [...lapp.map((t) => `<span>${t}</span>`), ...varn.map((t) => `<span class="varn">${t}</span>`)].join('');
  fotoLapp.hidden = !lapp.length && !varn.length;
  const tn = $('takfot-not'); tn.hidden = !(varn.length && overTakfot() > 0.01);
  if (!tn.hidden) tn.textContent = takfotRad();
}
/* Förslaget när taket går över husets takfot: lägre höjd eller flackare tak. */
function takfotRad() {
  const over = overTakfot();
  const lagre = klamMatt('h', S.h - over - 0.02);
  const g = lutGranser();
  let lut = null;
  if (g) for (let v = S.lut - 1; v >= g.min; v--) if (overTakfot({ ...S, lut: v }) < 0.005) { lut = v; break; }
  const forslag = [lagre < S.h && overTakfot({ ...S, h: lagre }) < 0.005 && `höjden ${dec(lagre, 2)} m`, lut != null && `lutningen ${lut}°`].filter(Boolean);
  return `Taket når ${Math.round(over * 100)} cm över husets takfot på fotot. Då ansluts det till husets tak, och det går vi igenom vid hembesöket.`
    + (forslag.length ? ` Ska taket sluta under takfoten räcker ${listaOrd(forslag).replace(' och ', ' eller ')}.` : '');
}

/* ---------- ljuset ---------- */
const ljusOrd = (az) => {
  const s = az < 0 ? 'vänster' : 'höger', v = Math.abs(az);
  return v <= 20 ? 'Bakom dig' : v <= 70 ? `Snett bakom dig, ${s}` : v <= 110 ? `Från ${s}` : v <= 160 ? `Snett bakom huset, ${s}` : 'Bakom huset';
};
/* Solen i fotoläget: varifrån den kommer räknat från fotografen (0 = bakom
   kameran, ±90 = från sidan, 180 = bakom huset). Mulet ger högre ljus och en
   mjuk, svag skugga. Exponeringen är lägre än i 3D, så rummet inte lyser mot fotot. */
function sattFotoLjus() {
  const { az, mulet } = foto.ljus, l = foto.lage;
  const el = (mulet ? 62 : 36) * D2R, a = az * D2R;
  const mx = l.cx + Math.sin(l.t) * S.d / 2, mz = l.cz + Math.cos(l.t) * S.d / 2;
  sol.target.position.set(mx, 0, mz);
  sol.position.set(mx + Math.sin(a) * Math.cos(el) * 34, Math.sin(el) * 34, mz + Math.cos(a) * Math.cos(el) * 34);
  // nästan vitt ljus: det varma 3D-solljuset gjorde en vit trävägg gräddgul mot fotot
  sol.intensity = mulet ? 1.0 : 2.2;
  sol.color.set(0xfffaf4);
  sol.shadow.radius = mulet ? 9 : 2;
  himmel.intensity = mulet ? 1.15 : 0.8;
  scen.environmentIntensity = 0.5;
  M.kanal.emissiveIntensity = 0.22;
  skuggMat.opacity = mulet ? 0.22 : 0.38;
  renderare.toneMappingExposure = 0.9;
  scen.fog.near = 1000; scen.fog.far = 2000;
  if (ljusNatt) sattNatt(false);
  $('ut-ljus').textContent = ljusOrd(az);
  uppdateraSkuggor();
}
{
  const r = $('ljus');
  r.value = foto.ljus.az; fyll(r);
  r.addEventListener('input', () => { foto.ljus.az = +r.value; fyll(r); if (fotoVyNu()) sattFotoLjus(); else $('ut-ljus').textContent = ljusOrd(foto.ljus.az); skrivAi(); });
  $('mulet').addEventListener('change', (e) => { foto.ljus.mulet = e.target.checked; if (fotoVyNu()) sattFotoLjus(); skrivAi(); });
}

/* ---------- kamerans höjd och dörren i panelen ---------- */
{
  const f = $('kamera-cm');
  const las = () => { const cm = tolkaCm(f.value); if (Number.isFinite(cm)) sattKameraHojd(cm / 100); skrivFotoInfo(); skrivHash(); };
  f.addEventListener('focus', () => f.select());
  f.addEventListener('blur', las);
  f.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); las(); f.select(); }
    else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') { e.preventDefault(); sattKameraHojd(foto.lage.h + (e.key === 'ArrowUp' ? 0.01 : -0.01)); skrivFotoInfo(); }
  });
  for (const k of document.querySelectorAll('[data-khsteg]')) k.addEventListener('click', () => { sattKameraHojd(Math.round(foto.lage.h * 100 + +k.dataset.khsteg * 5) / 100); skrivHash(); });
  $('dorr-knapp').addEventListener('click', () => sattDorrLage(!dorrLage));
  const dh = $('dorr-cm');
  const lasDorr = () => {
    const cm = tolkaCm(dh.value);
    if (Number.isFinite(cm) && foto.dorr) { foto.dorr.hojd = Math.min(3, Math.max(1.6, cm / 100)); const h = hojdUrDorr(); if (h) { foto.dorrMatt = true; sattKameraHojd(h, true); } }
    dh.value = foto.dorr ? Math.round(foto.dorr.hojd * 100) : 210;
  };
  dh.addEventListener('blur', lasDorr);
  dh.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); lasDorr(); dh.select(); } });
}

/* ---------- dra punkterna, horisonten och rummet ----------
   Medan man drar tonas måtten och väggnamnen ned och måttlinjerna på golvet
   döljs, så att de inte skymmer placeringen. På pekskärm visar ett
   förstoringsglas ovanför fingret det som ligger under punkten. */
function borjaDra() {
  // placeringen innan draget: ett andra finger lägger tillbaka den (se flerFingrar)
  dragFore = { lage: { ...foto.lage }, takfot: foto.takfot && foto.takfot.slice(), dorr: foto.dorr && { ...foto.dorr, fot: foto.dorr.fot.slice() },
    dorrMatt: foto.dorrMatt, bekraftad: foto.bekraftad, klamd: foto.klamd, b: S.b };
  drarNu = true;
  document.documentElement.classList.add('drar');
  const mg = rum.getObjectByName('matt'); if (mg) mg.visible = false;
  ritaNu();
}
function slutaDra() {
  drag = null; dragFore = null;
  luppEl.hidden = true;
  if (!drarNu) return;
  drarNu = false;
  document.documentElement.classList.remove('drar');
  const mg = rum.getObjectByName('matt'); if (mg) mg.visible = vy !== 'inne';
  provFasad(); uppdateraSkuggor(); skrivHash(); skrivFotoInfo();
}
/* Två fingrar på fotot (granskningen 2026-09-29: ett nyp flyttade punkt B och
   ändrade bredden från 4,50 till 7,00 m, och under "1 av 2" räknades nypet som
   dörrmåttet). Ett andra finger avbryter det som pågår och lägger tillbaka
   placeringen som den var när första fingret satte ned; resten av gesten, tills
   alla fingrar lyfts, gör ingenting. Webbläsaren märker bara första fingret som
   isPrimary, så det gäller alla sätt att röra fotot: punkterna, linjen, rummet,
   de två dragen och penseln. */
let flerFingrar = false, dragFore = null, avbrytPensel = null;
addEventListener('pointerdown', (e) => {
  if (e.pointerType !== 'touch') return;
  if (e.isPrimary) { flerFingrar = false; return; }
  if (flerFingrar) return;
  flerFingrar = true;
  avbrytFotoDrag();
}, true);
function avbrytFotoDrag() {
  if (strak) { strak = null; luppEl.hidden = true; ritaStrak(null, null); }
  if (avbrytPensel) avbrytPensel();
  if (!drag) return;
  const f = dragFore;
  drag = null; dragFore = null;
  if (f) {
    Object.assign(foto, { takfot: f.takfot, dorr: f.dorr, dorrMatt: f.dorrMatt, bekraftad: f.bekraftad, klamd: f.klamd });
    if (S.b !== f.b) { S.b = f.b; normalisera(); byggINastaRuta(); }
    sattFotoLage(f.lage); uppdateraText();
  }
  slutaDra();
}
function visaLupp(fx, fy) {
  const w = punktLager.clientWidth, h = punktLager.clientHeight, S0 = 116, zoom = 3;
  const dpr = Math.min(2, devicePixelRatio || 1);
  if (luppEl.width !== S0 * dpr) { luppEl.width = luppEl.height = S0 * dpr; }
  const px = fx * w, py = fy * h, upp = py > S0 + 30;
  luppEl.style.transform = `translate3d(${Math.round(px - S0 / 2)}px, ${Math.round(upp ? py - S0 - 34 : py + 34)}px, 0)`;
  const g = luppEl.getContext('2d'), k = foto.w / w, hs = (S0 / 2 / zoom) * k;
  g.fillStyle = '#1c1c30'; g.fillRect(0, 0, luppEl.width, luppEl.height);
  g.drawImage(foto.bild, fx * foto.w - hs, fy * foto.h - hs, 2 * hs, 2 * hs, 0, 0, luppEl.width, luppEl.height);
  const c = luppEl.width / 2;
  g.strokeStyle = '#fff'; g.lineWidth = 1.5 * dpr; g.beginPath();
  g.moveTo(c, c - 18 * dpr); g.lineTo(c, c - 4 * dpr); g.moveTo(c, c + 4 * dpr); g.lineTo(c, c + 18 * dpr);
  g.moveTo(c - 18 * dpr, c); g.lineTo(c - 4 * dpr, c); g.moveTo(c + 4 * dpr, c); g.lineTo(c + 18 * dpr, c); g.stroke();
  luppEl.hidden = false;
}
/* Punkt A, B, horisonten H, takfoten T eller dörrens D1 och D2 till en punkt
   på fotot (andelar). A, B och tröskeln stannar under horisonten, horisonten
   ovanför dem. Ändras horisonten står punkterna kvar på fotot och placeringen
   (och med dörren kamerans höjd) räknas om ur dem. */
function dragTill(namn, fx, fy) {
  const f = fotoPunkter(); if (!f) return;
  const lut = foto.lage.lutning;
  if (namn === 'H') {
    const lagst = Math.min(f.A[1], f.B[1], dorrLage && foto.dorr ? foto.dorr.fot[1] : 1);
    const nl = lutningAv(Math.min(lagst - 0.03, Math.max(0.04, fy)));
    if (Math.abs(nl) > 30 * D2R) return;
    const h = foto.dorrMatt ? hojdUrDorr(foto.dorr, nl) || foto.lage.h : foto.lage.h;
    tillampaPlacering(lageFranPunkter(f.A, f.B, nl, h, 'A'));
  } else if (namn === 'A' || namn === 'B') {
    const p = [inom(fx), Math.min(1, Math.max(f.H + 0.03, fy))];
    const [a, b] = namn === 'A' ? [p, f.B] : [f.A, p];
    // en uppmätt dörr sitter i husväggens plan: flyttas väggen räknas kamerans höjd om
    const h = foto.dorrMatt ? hojdUrDorr(foto.dorr, lut, { A: a, B: b }) || foto.lage.h : foto.lage.h;
    if (tillampaPlacering(lageFranPunkter(a, b, lut, h, namn === 'A' ? 'B' : 'A'))) foto.bekraftad = true;
  } else if (namn === 'T') {
    foto.takfot = [inom(fx), inom(fy, 0, Math.min(f.A[1], f.B[1]) - 0.04)];
    fotoKamera(); uppdateraText(); skrivFotoInfo(); ritaNu();
  } else if (foto.dorr) {
    const d = foto.dorr;
    if (namn === 'D1') { const y = inom(fy); d.topp = inom(d.topp + y - d.fot[1]); d.fot = [inom(fx), y]; }
    else d.topp = Math.min(d.fot[1] - 0.03, Math.max(0, fy));
    const h = hojdUrDorr();
    if (h) { foto.dorrMatt = true; sattKameraHojd(h, true); }
    ritaNu();
  }
}
const pekPunkt = (namn) => { const f = fotoPunkter(); if (!f) return null; return namn === 'H' ? [0.9, f.H] : namn === 'T' ? (foto.takfot || null) : namn === 'D1' ? foto.dorr?.fot : namn === 'D2' ? foto.dorr && [foto.dorr.fot[0], foto.dorr.topp] : f[namn]; };
function kopplaDrag(el, namn) {
  el.addEventListener('pointerdown', (e) => {
    if (e.button !== 0 || !fotoVyNu() || !e.isPrimary || flerFingrar) return;
    e.preventDefault(); e.stopPropagation();
    const r = punktLager.getBoundingClientRect(), mx = (e.clientX - r.left) / r.width, my = (e.clientY - r.top) / r.height;
    // greppet sitter kvar där fingret tog tag, punkten hoppar inte till fingret; på linjen hoppar den till fingrets höjd
    const p = el === horisontEl ? [mx, my] : pekPunkt(namn) || [mx, my];
    drag = { typ: namn, el, id: e.pointerId, dx: p[0] - mx, dy: p[1] - my, lupp: e.pointerType !== 'mouse' && namn !== 'H' };
    try { el.setPointerCapture(e.pointerId); } catch { /* äldre webbläsare */ }
    borjaDra();
  });
  el.addEventListener('pointermove', (e) => {
    if (!drag || drag.el !== el || drag.id !== e.pointerId) return;
    const r = punktLager.getBoundingClientRect();
    dragTill(namn, (e.clientX - r.left) / r.width + drag.dx, (e.clientY - r.top) / r.height + drag.dy);
    const p = pekPunkt(namn);
    if (drag.lupp && p) visaLupp(inom(p[0]), inom(p[1]));
  });
  for (const ev of ['pointerup', 'pointercancel', 'lostpointercapture']) el.addEventListener(ev, () => { if (drag && drag.el === el) slutaDra(); });
}
for (const [namn, el] of Object.entries(handtag)) {
  kopplaDrag(el, namn);
  // piltangenterna: 0,4 % av fotot per tryck, med skift 2 %
  el.addEventListener('keydown', (e) => {
    const d = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key];
    if (!d) return;
    e.preventDefault();
    const p = pekPunkt(namn) || (namn === 'T' ? [0.5, 0.3] : null); if (!p) return;
    const s = e.shiftKey ? 0.02 : 0.004;
    dragTill(namn, p[0] + d[0] * s, p[1] + d[1] * s);
    provFasad(); uppdateraSkuggor(); skrivHash(); skrivFotoInfo();
  });
}
// hela den streckade linjen går att dra, inte bara punkten längst till höger (granskningen)
kopplaDrag(horisontEl, 'H');
/* Dra i rummet: det glider längs marken, i höjd med stället man tog tag i. */
const fotoStral = new THREE.Raycaster(), _fn = new THREE.Vector2();
function stralMot(e) {
  const r = renderare.domElement.getBoundingClientRect();
  _fn.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  kamera.updateMatrixWorld();
  fotoStral.setFromCamera(_fn, kamera);
  return fotoStral;
}
renderare.domElement.addEventListener('pointerdown', (e) => {
  if (!fotoVyNu() || !placeraPa || !e.isPrimary || flerFingrar || e.button !== 0) return;
  const mark = new Set(Object.values(markeringar));
  const t = stralMot(e).intersectObject(rum, true).find((h) => h.object.userData.del !== 'matt' && (synlig(h.object) || mark.has(h.object)));
  if (!t) return;
  /* Rummet glider längs husväggen med fingret, aldrig ut från den: planet är
     väggens eget (lodrätt), och bara rörelsen längs väggen räknas. Granskningen
     2026-09-29: ett drag uppåt på exempelhusets dörr (skärmens steg 1) sköt det
     färdigplacerade rummet ut på gräsmattan, till en prick vid horisonten. */
  const nv = new THREE.Vector3(Math.sin(foto.lage.t), 0, Math.cos(foto.lage.t));
  drag = { typ: 'rum', id: e.pointerId, plan: new THREE.Plane().setFromNormalAndCoplanarPoint(nv, t.point), p0: t.point.clone(),
    u: [Math.cos(foto.lage.t), -Math.sin(foto.lage.t)], c0: { cx: foto.lage.cx, cz: foto.lage.cz } };
  try { renderare.domElement.setPointerCapture(e.pointerId); } catch { /* äldre webbläsare */ }
  borjaDra();
});
renderare.domElement.addEventListener('pointermove', (e) => {
  if (!drag || drag.typ !== 'rum' || drag.id !== e.pointerId) return;
  const p = new THREE.Vector3();
  if (!stralMot(e).ray.intersectPlane(drag.plan, p)) return;
  const s = (p.x - drag.p0.x) * drag.u[0] + (p.z - drag.p0.z) * drag.u[1];
  const l = { ...foto.lage, cx: drag.c0.cx + drag.u[0] * s, cz: drag.c0.cz + drag.u[1] * s };
  if (rumFramfor(l) && fotoPunkterFor(l) && inomFotot(l)) { sattFotoLage(l); foto.bekraftad = true; }
});
for (const ev of ['pointerup', 'pointercancel']) renderare.domElement.addEventListener(ev, (e) => { if (drag && drag.typ === 'rum' && drag.id === e.pointerId) slutaDra(); });
/* Rummet glider inte ut ur fotot: hörnen vid väggens fot stannar i bilden, eller
   åtminstone inte längre ut än de redan står (granskningen: ett drag längs
   väggens fot som började på rummet sköt det halvvägs ut ur bilden). */
function inomFotot(l) {
  const [A, B] = hornVarld(l), a = tillFoto(A, l), b = tillFoto(B, l), f = fotoPunkter();
  if (!a || !b || !f) return false;
  const ut = (x) => Math.max(0, -x, x - 1);
  return ut(a[0]) <= Math.max(0.005, ut(f.A[0]) + 1e-4) && ut(b[0]) <= Math.max(0.005, ut(f.B[0]) + 1e-4);
}
// rummet får inte dras så att ett bakre hörn hamnar över horisonten
function fotoPunkterFor(l) {
  const [A, B] = hornVarld(l), a = tillFoto(A, l), b = tillFoto(B, l), hy = horisontY(l.lutning);
  return a && b && a[1] > hy + 0.01 && b[1] > hy + 0.01;
}
$('placera').addEventListener('click', () => { placeraAuto = false; sattPlacering(!placeraPa); });
/* De två dragen igen, också på exempelhuset: dörren och väggens fot. */
$('gor-om').addEventListener('click', () => {
  if (!fotoVyNu()) return;
  guide = 'dorr'; guideFel = '';
  if (!placeraPa) sattPlacering(true); else visaGuide();
  skrivFotoInfo();
  if (mobil()) scrollTo({ top: 0, behavior: REDUCERAD ? 'auto' : 'smooth' });
});
$('se-ovan').addEventListener('click', () => sattVy('ovan'));

/* ---------- två drag på ett eget foto ----------
   Granskningen 2026-09-29: ett eget foto tog 7–9 moment, och innan kunden hittat
   dörrmätningen ritades rummet 40 % för litet (kameran antogs 1,6 m upp, den
   var 0,9 m). Nu är det två drag med fingret, direkt på fotot:
   1 Dörren: från altandörrens tröskel upp till överkanten. Dörren (2,1 m) ger
      skalan. Vid väggen blir bredd och höjd rätt även om horisonten inte är
      exakt: bägge skalar lika med avståndet.
   2 Väggens fot: ett streck längs väggen där uterummet ska stå. Bredden blir
      streckets längd (3–7 m), med mitten där strecket har sin mitt.
   Sedan är det vanliga punkter och linjen för den som vill finjustera. */
const strakYta = $('strak-yta'), strakLapp = $('strak-lapp');
let strak = null, guideFel = '';
const guideSyns = () => !!guide && placeraPa && fotoVyNu() && !aiVisas;
function visaGuide() {
  const pa = guideSyns();
  strakYta.hidden = !pa;
  punktLager.classList.toggle('guide', pa);
  // under dragen syns bara fotot: rummet skymde väggens fot (det stod framför kameran innan väggen var dragen)
  rum.visible = !pa;
  if (fotoVyNu()) fotoSkugga.visible = !pa;
  document.documentElement.classList.toggle('guidar', pa);
  ritaNu();
  if (pa) punktLager.classList.toggle('dorr', guide === 'vagg' && !!foto.dorr && foto.dorrMatt);
  else if (!dorrLage) punktLager.classList.remove('dorr');
  if (!pa) { strakLapp.innerHTML = ''; return; }
  const fel = guideFel ? `<p class="varn">${guideFel}</p>` : '';
  strakLapp.innerHTML = guide === 'dorr'
    ? `<p><b>1 av 2</b> Dra med fingret från altandörrens tröskel rakt upp till dörrens överkant</p>${fel}<button type="button" data-guide="utan-dorr">Ingen dörr på fotot</button>`
    : `<p><b>2 av 2</b> Dra med fingret längs husväggens fot, från där uterummet ska börja till där det ska sluta</p>${fel}<button type="button" data-guide="punkter">Placera med punkterna i stället</button>`;
}
strakLapp.addEventListener('click', (e) => {
  const b = e.target.closest('[data-guide]'); if (!b) return;
  guideFel = '';
  if (b.dataset.guide === 'utan-dorr') { guide = 'vagg'; foto.dorrMatt = false; }
  else { guide = null; foto.bekraftad = true; }
  visaGuide(); skrivFotoInfo(); skrivAi(); ritaNu();
});
const strakPunkt = (e) => { const r = strakYta.getBoundingClientRect(); return [inom((e.clientX - r.left) / r.width), inom((e.clientY - r.top) / r.height)]; };
function ritaStrak(a, b) {
  const w = strakYta.clientWidth, h = strakYta.clientHeight, L = $('strak-linje'), ca = $('strak-a'), cb = $('strak-b');
  const syns = a && b ? 'visible' : 'hidden';
  for (const el of [L, ca, cb]) el.setAttribute('visibility', syns);
  if (!a || !b) return;
  // dörren är lodrät: linjen står rakt ovanför tröskeln
  const b2 = guide === 'dorr' ? [a[0], b[1]] : b;
  L.setAttribute('x1', a[0] * w); L.setAttribute('y1', a[1] * h); L.setAttribute('x2', b2[0] * w); L.setAttribute('y2', b2[1] * h);
  ca.setAttribute('cx', a[0] * w); ca.setAttribute('cy', a[1] * h); cb.setAttribute('cx', b2[0] * w); cb.setAttribute('cy', b2[1] * h);
}
/* Fotot i låg upplösning (en fjärdedel), till horisonten och förgrunden. */
function litetFoto() {
  if (foto.litet && foto.litet.kalla === foto.bild) return foto.litet;
  const w = Math.max(1, Math.round(foto.w / 4)), h = Math.max(1, Math.round(foto.h / 4));
  const c = kanvas(w, h), g = c.getContext('2d', { willReadFrequently: true });
  g.imageSmoothingQuality = 'high';
  g.drawImage(foto.bild, 0, 0, w, h);
  const d = g.getImageData(0, 0, w, h).data, L = new Float32Array(w * h);
  for (let i = 0; i < L.length; i++) L[i] = 0.3 * d[i * 4] + 0.59 * d[i * 4 + 1] + 0.11 * d[i * 4 + 2];
  foto.litet = { kalla: foto.bild, w, h, d, L };
  return foto.litet;
}
/* Horisonten ur husväggens vågräta linjer. Väggens fot (A–B) och väggens
   andra vågräta linjer (sockel, fönsterbänkar, dörrens överkant, takfoten)
   möts i en flyktpunkt på horisonten. Flyktpunkten söks längs linjen A–B:
   den punkt som flest kanter i väggen pekar mot. Med horisonten mitt i bilden
   (telefonen rak) blev en vägg i vinkel 26 % för smal (granskningen: fotot
   var taget snett uppåt). Svaret är horisontens y i andelar, eller null när
   väggen står rakt mot kameran (då spelar horisonten ingen roll för bredden)
   eller kanterna inte räcker. */
let horisontLogg = null;
/* Väggens fot som linjen genom flyktpunkten: { mx, my, k } i andelar, eller null. */
let horisontLinje = null;
function horisontUrVagg(A, B, skala = null) {
  horisontLinje = null;
  const F = litetFoto(), w = F.w, h = F.h, L = F.L;
  const ax = A[0] * w, ay = A[1] * h, bx = B[0] * w, by = B[1] * h;
  const k = (by - ay) / (bx - ax);                      // väggens fot: y = ay + k (x − ax)
  if (!Number.isFinite(k) || Math.abs(k) < 0.02) return null;
  // väggen ovanför foten: upp till 2,8 m (dörren ger skalan), annars 30 % av bilden
  const upp = skala ? Math.min(h * 0.6, skala * h * 2.8 / 2.1) : h * 0.3;
  const x0 = Math.max(2, Math.floor(Math.min(ax, bx) - 0.1 * w)), x1 = Math.min(w - 3, Math.ceil(Math.max(ax, bx) + 0.1 * w));
  const kant = [];
  let stor = 0;
  for (let y = 2; y < h - 2; y++) for (let x = x0; x <= x1; x++) {
    const fot = ay + k * (x - ax);
    if (y > fot + 2 || y < fot - upp) continue;
    const i = y * w + x;
    const gx = (L[i + 1 - w] + 2 * L[i + 1] + L[i + 1 + w]) - (L[i - 1 - w] + 2 * L[i - 1] + L[i - 1 + w]);
    const gy = (L[i + w - 1] + 2 * L[i + w] + L[i + w + 1]) - (L[i - w - 1] + 2 * L[i - w] + L[i - w + 1]);
    const m = Math.hypot(gx, gy);
    if (m < 60) continue;
    // kantens riktning (vinkelrät mot gradienten), nära väggfotens riktning
    const dx = -gy / m, dy = gx / m;
    const vinkel = Math.abs(Math.atan((dy / dx - k) / (1 + k * dy / dx)));
    if (!(vinkel < 0.45)) continue;
    kant.push(x, y, dx, dy, m); stor++;
  }
  if (stor < 80) return null;
  /* Flyktpunkten på en linje genom strecket mitt, som 1/(x − mitten): täcker
     också punkter långt utanför bilden. Linjens lutning får avvika något från
     strecket (dk): granskningen 2026-09-29 drog strecket en aning för flackt
     (0,74 till 0,754 mot väggens 0,735 till 0,771), och flyktpunkten på det
     strecket gav horisonten 0,685 och kameran 0,46 m i stället för 0,64 och 0,79 m. */
  const cx = w / 2, mx = (ax + bx) / 2, my = (ay + by) / 2;
  // grovsökningen med högst 1 200 kanter, finsökningen med alla (tiden: 1,7 s med alla i båda)
  const glesa = Math.max(1, Math.ceil(stor / 1200));
  const poangFor = (vx, vy, gles = 1) => {
    let poang = 0;
    for (let j = 0; j < kant.length; j += 5 * gles) {
      const px = kant[j], py = kant[j + 1], ex = vx - px, ey = vy - py, n = Math.hypot(ex, ey);
      const sin = Math.abs(ex * kant[j + 3] - ey * kant[j + 2]) / n;   // vinkeln mellan kanten och riktningen mot punkten
      if (sin < 0.026) poang += Math.min(kant[j + 4], 400);
    }
    return poang * gles;
  };
  let bast = null;
  const prova = (s, dk, gles = 1) => {
    const u = s / 40 * (4 / w);                         // |x − cx| från w/4 till 40 w
    const vx = cx + 1 / u, vy = my + (k + dk) * (vx - mx);
    const poang = poangFor(vx, vy, gles);
    if (!bast || poang > bast.poang) bast = { poang, vy, vx, s, dk };
    if (horisontLogg) horisontLogg.push([+s.toFixed(1), +dk.toFixed(3), +(vy / h).toFixed(3), Math.round(poang)]);
  };
  // grovt i hela steg och lutningar, sedan fint (tiondelar) runt det bästa
  const DK = [];
  for (let d = -0.08; d <= 0.0801; d += 0.02) DK.push(d);
  for (let s = -40; s <= 40; s++) if (s) for (const dk of DK) prova(s, dk, glesa);
  if (!bast) return null;
  { const b0 = bast.s, d0 = bast.dk; bast = null;
    for (let f = -9; f <= 9; f += 1) for (let e = -6; e <= 6; e++) if (Math.abs(b0 + f / 10) > 0.05) prova(b0 + f / 10, d0 + e * 0.0025); }
  if (!bast) return null;
  const hy = bast.vy / h;
  // horisonten ovanför väggens fot och högst 30° lutning
  if (!(hy < Math.min(A[1], B[1]) - 0.04) || hy < 0.02 || Math.abs(lutningAv(hy)) > 30 * D2R) return null;
  horisontLinje = { mx: mx / w, my: my / h, k: (k + bast.dk) * w / h };
  return hy;
}
/* Första draget: tröskeln och överkanten. Tröskeln antas stå vid väggens fot
   tills väggen är dragen; sedan räknas höjden om i väggens plan (hojdUrDorr). */
function dorrDrag(a, b) {
  const nere = a[1] >= b[1] ? a : b, topp = Math.min(a[1], b[1]);
  // lodrät: tröskeln rakt under där fingret började
  const fot = [a[0], nere[1]];
  if (fot[1] - topp < 0.04) return 'Dra längre: från tröskeln hela vägen upp till dörrens överkant.';
  let lut = foto.lage.lutning;
  // tröskeln över bildens mitt: fotot är taget snett nedåt, horisonten ligger högre
  if (fot[1] < horisontY(lut) + 0.05) lut = lutningAv(Math.max(0.03, Math.min(topp, fot[1] - 0.12)));
  const g1 = markTraff(fot[0], fot[1], 1, lut); if (!g1) return 'Börja draget nere vid dörrens tröskel.';
  const l1 = { h: 1, lutning: lut, cx: g1.x, cz: g1.z, t: 0 };
  const yt = vaggHojd([fot[0], topp], l1);
  if (!(yt > 0.05)) return 'Dra från tröskeln upp till dörrens överkant.';
  const h = Math.min(10, Math.max(0.3, 2.1 / yt));
  foto.dorr = { fot: fot.slice(), topp, hojd: 2.1 }; foto.dorrMatt = true;
  // rummet mitt för dörren, mot en vägg rakt mot kameran, tills väggen är dragen
  const g = markTraff(fot[0], fot[1], h, lut), l = { h, lutning: lut, cx: g.x, cz: g.z, t: 0 };
  foto.lage.lutning = lut;
  if (rumFramfor(l)) sattFotoLage(l); else sattFotoLage({ h });
  $('dorr-cm').value = 210;
  return null;
}
/* Andra draget: väggens fot. */
function vaggDrag(a, b) {
  if (Math.abs(b[0] - a[0]) < 0.06) return 'Dra längre åt sidan, längs väggens fot.';
  const [p0, q0] = a[0] <= b[0] ? [a, b] : [b, a];
  // horisonten ur väggens egna linjer; står väggen rakt mot kameran behålls den
  const hyNy = horisontUrVagg(p0, q0, foto.dorrMatt && foto.dorr ? foto.dorr.fot[1] - foto.dorr.topp : null);
  const lut = hyNy != null ? lutningAv(hyNy) : foto.lage.lutning, hy = horisontY(lut);
  foto.horisontAuto = hyNy;
  /* Strecket rättas till linjen genom flyktpunkten, högst 3 % av fotots höjd:
     ett för flackt streck (granskningen: 0,74 till 0,754 mot väggens 0,735 till
     0,771) gav annars 3,1 m där väggen är drygt 4 m. */
  const L = horisontLinje, ratt = ([x, y]) => (L && Math.abs(L.my + L.k * (x - L.mx) - y) < 0.03 ? [x, L.my + L.k * (x - L.mx)] : [x, y]);
  const [p, q] = [p0, q0].map(ratt).map(([x, y]) => [x, Math.max(hy + 0.03, y)]);
  const h = foto.dorrMatt ? hojdUrDorr(foto.dorr, lut, { A: p, B: q }) || foto.lage.h : foto.lage.h;
  const r = lageFranPunkter(p, q, lut, h, 'M');
  if (!r) return 'Det gick inte att ställa uterummet där. Dra längs väggens fot, nedanför dörren och fönstren.';
  tillampaPlacering(r);
  foto.bekraftad = true;
  return null;
}
strakYta.addEventListener('pointerdown', (e) => {
  if (!guideSyns() || e.button !== 0 || !e.isPrimary || flerFingrar || e.target.closest('button')) return;
  e.preventDefault();
  const p = strakPunkt(e);
  strak = { id: e.pointerId, a: p, b: p, lupp: e.pointerType !== 'mouse' };
  try { strakYta.setPointerCapture(e.pointerId); } catch { /* äldre webbläsare */ }
  ritaStrak(p, p);
  if (strak.lupp) visaLupp(p[0], p[1]);
});
strakYta.addEventListener('pointermove', (e) => {
  if (!strak || strak.id !== e.pointerId) return;
  strak.b = strakPunkt(e);
  ritaStrak(strak.a, strak.b);
  if (strak.lupp) visaLupp(guide === 'dorr' ? strak.a[0] : strak.b[0], strak.b[1]);
});
function slutaStrak(e, avbryt = false) {
  if (!strak || strak.id !== e.pointerId) return;
  const { a, b } = strak; strak = null;
  luppEl.hidden = true; ritaStrak(null, null);
  if (avbryt || !guideSyns()) return;
  if (Math.hypot(b[0] - a[0], b[1] - a[1]) < 0.02) { guideFel = 'Håll kvar fingret och dra, ett tryck räcker inte.'; visaGuide(); return; }
  const fel = guide === 'dorr' ? dorrDrag(a, b) : vaggDrag(a, b);
  guideFel = fel || '';
  if (!fel) {
    if (guide === 'dorr') guide = 'vagg';
    else { guide = null; visaToast('Uterummet står mot väggen. Finjustera med punkterna om det behövs.'); }
  }
  visaGuide();
  provFasad(); uppdateraSkuggor(); skrivHash(); skrivFotoInfo(); skrivAi(); ritaNu();
}
strakYta.addEventListener('pointerup', (e) => slutaStrak(e));
strakYta.addEventListener('pointercancel', (e) => slutaStrak(e, true));


/* ---------- fotot in ----------
   Fotot skalas ned i webbläsaren (längsta sidan högst 1600 px, EXIF-vridningen
   följs) och stannar här. Med AI_BILD av skickas det aldrig någonstans; med
   den på först när någon skapar den fotorealistiska bilden (steg 2). */
const startEl = $('start');
function visaStart() {
  sidlageFore = sidlage;
  startEl.hidden = false;
  $('start-behall').hidden = !foto.bild;
  $('start-not').hidden = !(fpFranLank && !foto.bild);
  $('start-fel').hidden = true;
  setTimeout(() => (foto.bild ? $('start-behall') : $('start-kamera')).focus({ preventScroll: true }), 30);
}
let sidlageFore = 'start';
function stangStart() { startEl.hidden = true; }
const START_KNAPPAR = ['start-kamera', 'start-valj', 'start-exempel', 'start-behall', 'start-3d'];
/* Medan ett stort foto läses in: knapparna av och en rad som säger det
   (granskningen: 8–14 s utan att något hände, och en andra inläsning gick att starta). */
function laser(pa) {
  for (const id of START_KNAPPAR) $(id).disabled = pa;
  startEl.querySelector('.start-kort').setAttribute('aria-busy', String(pa));
  $('start-laser').hidden = !pa;
}
async function lasFoto(kalla, { exempel = false } = {}) {
  const fel = $('start-fel');
  fel.hidden = true;
  laser(true);
  try {
    const ex = exempel ? null : await exifBrannvidd(kalla);
    let bmp;
    try { bmp = await createImageBitmap(kalla, { imageOrientation: 'from-image' }); }
    catch {
      fel.textContent = 'Fotot gick inte att läsa. Prova en JPG- eller PNG-bild, eller ta ett nytt foto.';
      fel.hidden = false; return false;
    }
    const s = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
    const c = document.createElement('canvas');
    c.width = Math.round(bmp.width * s); c.height = Math.round(bmp.height * s);
    c.getContext('2d', { willReadFrequently: true }).drawImage(bmp, 0, 0, c.width, c.height);
    if (bmp.close) bmp.close();
    const blob = await new Promise((ok) => c.toBlob(ok, 'image/jpeg', 0.9));
    if (foto.url) URL.revokeObjectURL(foto.url);
    const kvot = c.width / c.height;
    Object.assign(foto, { bild: c, blob, url: URL.createObjectURL(blob), w: c.width, h: c.height, kvot,
      fov: exempel ? EXEMPEL.fov : fovUrExif(ex, c.width, c.height) || standardFov(kvot), exif: !!fovUrExif(ex, c.width, c.height), exempel,
      bekraftad: false, takfot: null, dorr: null, dorrMatt: false, klamd: false, pensel: null, sudd: null, auto: null, autoAv: false, litet: null, halvt: null });
    autoSig = ''; autoNyckel = '';
    await new Promise((ok) => { fotoEl.onload = ok; fotoEl.onerror = ok; fotoEl.src = foto.url; });
    // ett nytt foto: bilderna gällde det förra
    for (const v of versioner) URL.revokeObjectURL(v.url);
    aiBildUrl = null; versioner.length = 0; visad = -1; aiVisas = false; vantar = null; ritaVersioner();
    rensaPensel();
    oppnaFoto(true);
    return true;
  } finally { laser(false); }
}
/* In i fotoläget. Ett nytt foto får placeringen ur länken om det finns en,
   exempelhusets uppmätta placering, eller startläget, och punkterna syns
   tills kunden går vidare från Mått. */
function oppnaFoto(nytt) {
  stangStart();
  foto.aktiv = true; sidlage = 'foto';
  if (nytt) {
    guide = null;
    const fp = fpFranLank, r = fp && lageUrLank(fp);
    if (r) { foto.lage = r.l; foto.takfot = fp.tf; foto.bekraftad = true; }
    else if (foto.exempel) exempelLage();
    else { autoPlacera(); guide = 'dorr'; }
    fpFranLank = null;
    provFasad();
    placeraAuto = true; placeraPa = true;
    hamtaKvar();
  }
  normalisera(); stangPartier();
  byggKo = false; byggRum();
  vyFore = vy; vy = 'foto';
  for (const b of document.querySelectorAll('[data-vy]')) b.setAttribute('aria-pressed', String(b.dataset.vy === 'foto'));
  tween = null;
  visaLageKnappar(); tillampaFotoVy();
  if (nytt) {
    visaFas('matt', false);
    // instruktionen överst (granskningen: på plattan öppnades ett nytt foto med panelen nedskrollad)
    $('panel-inre').scrollTop = 0;
    if (mobil()) scrollTo(0, 0);
  }
  skrivFotoInfo(); uppdateraText();
}
/* 3D utan foto: det påhittade huset, som förut. Designen följer med. */
function valj3D() {
  stangStart();
  const franFoto = foto.aktiv;
  sidlage = '3d';
  foto.aktiv = false;
  normalisera(); byggKo = false; byggRum();
  visaLageKnappar(); tillampaFotoVy();
  sattVy('ute', franFoto ? 0 : 600);
  uppdateraText();
}
for (const [knapp, fil] of [['start-kamera', 'fil-kamera'], ['start-valj', 'fil-valj']]) {
  $(knapp).addEventListener('click', () => $(fil).click());
  $(fil).addEventListener('change', (e) => { const f = e.target.files[0]; if (f) lasFoto(f); e.target.value = ''; });
}
$('start-exempel').addEventListener('click', async () => {
  try { const r = await fetch('./exempel-hus.jpg'); await lasFoto(await r.blob(), { exempel: true }); }
  catch { $('start-fel').textContent = 'Exempelhuset gick inte att hämta. Försök igen.'; $('start-fel').hidden = false; }
});
$('start-behall').addEventListener('click', () => oppnaFoto(false));
$('start-3d').addEventListener('click', valj3D);
$('byt-foto').addEventListener('click', visaStart);
$('till-foto').addEventListener('click', visaStart);
// på datorn går fotot också att dra in i rutan
{
  const kort = startEl.querySelector('.start-kort');
  startEl.addEventListener('dragover', (e) => { e.preventDefault(); kort.classList.add('dra'); });
  startEl.addEventListener('dragleave', (e) => { if (e.target === startEl) kort.classList.remove('dra'); });
  startEl.addEventListener('drop', (e) => { e.preventDefault(); kort.classList.remove('dra'); const f = e.dataTransfer.files[0]; if (f) lasFoto(f); });
  // Escape tillbaka dit man kom ifrån, utom på allra första skärmen
  addEventListener('keydown', (e) => { if (e.key !== 'Escape' || startEl.hidden) return; if (sidlageFore === 'foto') oppnaFoto(false); else if (sidlageFore === '3d') stangStart(); });
}

/* ============================================================
   Förgrunden: det som står framför uterummet på fotot
   Granskningen 2026-09-29: björken framför altandörren stod 3 m närmare
   kameran än rummet, men ritades bakom det. Kunden eller säljaren målar över
   det som står framför; de pixlarna läggs överst från fotot, på skissen, i
   bilden som skickas till AI:n och i den färdiga bilden.
   ============================================================ */
const forgrundEl = $('forgrund'), penselYta = $('pensel-yta');
let penselLage = false, penselSudd = false, penselNr = 0;
function rensaPensel(alla = false) {
  foto.pensel = null; foto.sudd = null; penselNr++;
  // Rensa allt: också det sidan hittat själv, och det letas inte fram igen på det här fotot
  if (alla) { foto.auto = null; foto.autoAv = true; }
  ritaForgrund();
}
function suddKanvas() {
  if (!foto.sudd) { foto.sudd = kanvas(Math.round(foto.w / 2), Math.round(foto.h / 2)); }
  return foto.sudd;
}
function penselKanvas() {
  if (!foto.pensel) { foto.pensel = kanvas(Math.round(foto.w / 2), Math.round(foto.h / 2)); }
  return foto.pensel;
}
/* Förgrunden på skärmen: fotots egna pixlar där det är målat. Medan man målar
   syns det målade också som en guldton, så man ser vad som är med. */
function ritaForgrund() {
  const fg = fotoVyNu() ? forgrundKanvas() : null, pa = !!fg;
  forgrundEl.hidden = !pa;
  if (!pa) return;
  const r = forgrundEl.getBoundingClientRect(), dpr = Math.min(2, devicePixelRatio || 1);
  const w = Math.max(1, Math.round(r.width * dpr)), h = Math.max(1, Math.round(r.height * dpr));
  if (forgrundEl.width !== w || forgrundEl.height !== h) { forgrundEl.width = w; forgrundEl.height = h; }
  const g = forgrundEl.getContext('2d');
  g.clearRect(0, 0, w, h);
  g.globalCompositeOperation = 'source-over';
  g.drawImage(fg, 0, 0, w, h);
  g.globalCompositeOperation = 'source-in';
  g.drawImage(foto.bild, 0, 0, w, h);
  if (penselLage) { g.globalCompositeOperation = 'source-atop'; g.fillStyle = 'rgba(197,165,114,.38)'; g.fillRect(0, 0, w, h); }
  g.globalCompositeOperation = 'source-over';
}
/* Fotots förgrund ovanpå en bild i fotots upplösning (skissen och den färdiga bilden). */
function laggForgrund(g, w, h) {
  const fg = forgrundKanvas();
  if (!fg) return;
  const c = kanvas(w, h), x = c.getContext('2d');
  x.filter = `blur(${Math.max(1, Math.round(w * 0.0015))}px)`;
  x.drawImage(fg, 0, 0, w, h); x.filter = 'none';
  x.globalCompositeOperation = 'source-in';
  x.drawImage(foto.bild, 0, 0, w, h);
  g.drawImage(c, 0, 0);
}
function sattPenselLage(pa) {
  penselLage = pa;
  if (pa && placeraPa) sattPlacering(false);
  penselYta.hidden = !pa;
  document.documentElement.classList.toggle('penslar', pa);
  $('pensel-knapp').setAttribute('aria-pressed', String(pa));
  $('pensel-knapp').querySelector('span').textContent = pa ? 'Klar med penseln' : 'Måla det som står framför uterummet';
  $('pensel-rad').hidden = !pa;
  ritaForgrund();
}
{
  let penselDrag = null;
  const punkt = (e) => { const r = penselYta.getBoundingClientRect(); return [(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height]; };
  // penseln målar i sitt lager och suddet i sitt, så att suddet också tar bort det sidan hittat själv
  const stryk = (a, b) => {
    const c = penselKanvas(), R = c.width * 0.022;
    const linje = (duk, op) => {
      const g = duk.getContext('2d');
      g.globalCompositeOperation = op; g.strokeStyle = '#fff'; g.lineWidth = 2 * R; g.lineCap = 'round';
      g.beginPath(); g.moveTo(a[0] * duk.width, a[1] * duk.height); g.lineTo(b[0] * duk.width, b[1] * duk.height); g.stroke();
      g.globalCompositeOperation = 'source-over';
    };
    if (penselSudd) { linje(c, 'destination-out'); linje(suddKanvas(), 'source-over'); }
    else { linje(c, 'source-over'); if (foto.sudd) linje(foto.sudd, 'destination-out'); }
    forgrundCache = null;
    ritaForgrund();
  };
  const kopia = (c) => { if (!c) return null; const k = kanvas(c.width, c.height); k.getContext('2d').drawImage(c, 0, 0); return k; };
  // ett andra finger: strecket som målats med det första tas bort igen
  avbrytPensel = () => {
    if (!penselDrag) return;
    foto.pensel = penselDrag.pensel; foto.sudd = penselDrag.sudd; penselDrag = null;
    forgrundCache = null; ritaForgrund();
  };
  penselYta.addEventListener('pointerdown', (e) => {
    if (!penselLage || e.button !== 0 || !e.isPrimary || flerFingrar) return;
    e.preventDefault();
    const p = punkt(e); penselDrag = { id: e.pointerId, p, pensel: kopia(foto.pensel), sudd: kopia(foto.sudd) };
    try { penselYta.setPointerCapture(e.pointerId); } catch { /* äldre webbläsare */ }
    stryk(p, p);
  });
  penselYta.addEventListener('pointermove', (e) => {
    if (!penselDrag || penselDrag.id !== e.pointerId) return;
    const p = punkt(e); stryk(penselDrag.p, p); penselDrag.p = p;
  });
  for (const ev of ['pointerup', 'pointercancel']) penselYta.addEventListener(ev, () => { if (penselDrag) { penselDrag = null; penselNr++; skrivAi(); } });
  $('pensel-knapp').addEventListener('click', () => sattPenselLage(!penselLage));
  $('pensel-sudd').addEventListener('click', () => { penselSudd = !penselSudd; $('pensel-sudd').setAttribute('aria-pressed', String(penselSudd)); });
  $('pensel-rensa').addEventListener('click', () => { rensaPensel(true); skrivAi(); });
}

/* ---------- förgrunden hittas själv ----------
   Granskningen 2026-09-29: på kundens eget foto hamnade björken bakom rummet
   (stammen syntes genom glaset, trallen täckte stamfoten), och på exempelhuset
   målade taket och stolparna över de hängande grenarna. Sidan letar nu själv,
   i fotot i låg upplösning, efter två slags förgrund i uterummets del av bilden:
   · Löv och grenar framför huset: grönt (inte gräsets: bara ovanför väggens
     fot) med husets vägg eller tak omkring sig, i färgerna som mäts mellan A och
     B. Träd bakom huset har himmel och annat grönt omkring sig och räknas inte.
   · Det som står på marken framför rummet: en stam, en stolpe. Det börjar i
     marken strax framför altanen, har en annan färg än gräset där, och följs
     uppåt rad för rad så länge färgen håller i sig.
   Kunden kan sudda bort eller måla till med penseln; det som målats för hand
   ligger kvar när sidan letar igen. */
let autoNyckel = '', autoTimer = 0, autoSig = '', autoBump = 0;
const arGront = (r, g, b) => 2 * g - r - b > 20 && g - b > 35;
function beraknaAuto() {
  if (!foto.aktiv || !foto.bild || foto.autoAv || !fotoVyNu()) return;
  const F = litetFoto(), w = F.w, h = F.h, d = F.d;
  const l = foto.lage, ux = Math.cos(l.t), uz = -Math.sin(l.t), fx = Math.sin(l.t), fz = Math.cos(l.t);
  const px = (u, y, z) => { const p = tillFoto(new THREE.Vector3(l.cx + ux * u + fx * z, y, l.cz + uz * u + fz * z)); return p && [p[0] * w, p[1] * h]; };
  const bu = S.b / 2 + 0.4, bd = S.d + 0.7, topp = rumMatt ? rumMatt.topBak : S.h + 1;
  const golv = [px(-bu, 0, 0), px(bu, 0, 0), px(bu, 0, bd), px(-bu, 0, bd)];
  const lada = [...golv, px(-bu, topp, 0), px(bu, topp, 0), px(-bu, S.h + 0.3, S.d), px(bu, S.h + 0.3, S.d)];
  if (golv.some((p) => !p) || lada.some((p) => !p)) return;
  const xMin = Math.max(0, Math.floor(Math.min(...lada.map((p) => p[0])) - 4)), xMax = Math.min(w - 1, Math.ceil(Math.max(...lada.map((p) => p[0])) + 4));
  const yTopp = Math.max(0, Math.floor(Math.min(...lada.map((p) => p[1])) - 6));
  if (xMax <= xMin) return;
  const f = fotoPunkter(); if (!f) return;
  const kf = (f.B[1] - f.A[1]) * h / ((f.B[0] - f.A[0]) * w), fotY = (x) => f.A[1] * h + kf * (x - f.A[0] * w);
  // altanens nederkant per kolumn: det nedersta av golvets fyra kanter
  const lag = new Float32Array(w).fill(-1);
  for (let e = 0; e < 4; e++) {
    const [a, b] = [golv[e], golv[(e + 1) % 4]];
    const [x0, x1] = a[0] < b[0] ? [a, b] : [b, a];
    for (let x = Math.max(0, Math.ceil(x0[0])); x <= Math.min(w - 1, Math.floor(x1[0])); x++) {
      const t = x1[0] - x0[0] > 1e-6 ? (x - x0[0]) / (x1[0] - x0[0]) : 0, y = x0[1] + t * (x1[1] - x0[1]);
      if (y > lag[x]) lag[x] = y;
    }
  }
  const M = new Uint8Array(w * h);
  const rgb = (i) => [d[i * 4], d[i * 4 + 1], d[i * 4 + 2]];
  const avst = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
  /* 1 Löv och grenar framför husväggen: grönt i väggens höjd (mellan foten och
     takfoten), med väggens egen färg omkring sig. Väggens färg mäts mellan A och B. */
  const hojd = new Float32Array(w * h).fill(-1);
  for (let y = yTopp; y < h; y++) for (let x = xMin; x <= xMax; x++) { const v = vaggHojd([(x + 0.5) / w, (y + 0.5) / h]); if (v != null) hojd[y * w + x] = v; }
  const vprov = [];
  for (let x = Math.round(f.A[0] * w); x <= Math.round(f.B[0] * w); x++) for (let y = yTopp; y < h; y++) {
    const v = hojd[y * w + x]; if (!(v > 0.3 && v < 2)) continue;
    const p = rgb(y * w + x), mx = Math.max(...p), mn = Math.min(...p);
    if (!arGront(...p) && !(mx > 165 && mx - mn < 45) && mx > 35) vprov.push(p);
  }
  const vaggTopp = (takfotHojd() ?? 2.8) + 0.3;
  if (vprov.length > 40) {
    const vmed = [0, 1, 2].map((k) => vprov.map((p) => p[k]).sort((a, b) => a - b)[vprov.length >> 1]);
    /* Väggens färg: samma kulör och ungefär samma ljushet. Mörka buskar låg nära
       en falröd vägg i vanligt färgavstånd (första försöket). */
    const lik = (ref) => { const s0 = ref[0] + ref[1] + ref[2] + 1, k0 = ref.map((v) => v / s0);
      return (p) => { const t = p[0] + p[1] + p[2] + 1, l = t / s0; return l > 0.55 && l < 1.8 && Math.abs(p[0] / t - k0[0]) + Math.abs(p[1] / t - k0[1]) + Math.abs(p[2] / t - k0[2]) < 0.12; }; };
    const likVagg = lik(vmed);
    /* Husets tak ovanför väggen, om det syns och har en annan färg: löv framför
       takfoten och taket räknas också (granskningen: grenarna framför takfoten). */
    const tprov = [];
    for (let x = Math.round(f.A[0] * w); x <= Math.round(f.B[0] * w); x++) for (let y = yTopp; y < h; y++) {
      const v = hojd[y * w + x]; if (!(v > vaggTopp - 0.6 && v < vaggTopp + 1.2)) continue;
      const p = rgb(y * w + x), mx = Math.max(...p), mn = Math.min(...p);
      if (!arGront(...p) && !(mx > 165 && mx - mn < 45) && !likVagg(p)) tprov.push(p);
    }
    const tmed = tprov.length > 40 ? [0, 1, 2].map((k) => tprov.map((p) => p[k]).sort((a, b) => a - b)[tprov.length >> 1]) : null;
    const likTak = tmed ? lik(tmed) : () => false;
    const vagg = new Float32Array((w + 1) * (h + 1));   // summerad tabell: hur mycket av huset som syns runt en punkt
    for (let y = 0; y < h; y++) for (let x = 0, rad = 0; x < w; x++) {
      const i = y * w + x, p = rgb(i), v = hojd[i];
      rad += likVagg(p) || (v > 2 && likTak(p)) ? 1 : 0; vagg[(y + 1) * (w + 1) + x + 1] = vagg[y * (w + 1) + x + 1] + rad;
    }
    const R = 5, tat = (x, y) => {
      const a = Math.max(0, x - R), b = Math.min(w, x + R + 1), c = Math.max(0, y - R), e = Math.min(h, y + R + 1);
      return (vagg[e * (w + 1) + b] - vagg[c * (w + 1) + b] - vagg[e * (w + 1) + a] + vagg[c * (w + 1) + a]) / ((b - a) * (e - c));
    };
    for (let y = yTopp; y < h; y++) for (let x = xMin; x <= xMax; x++) {
      const i = y * w + x, v = hojd[i];
      if (!(v > 0.05 && v < vaggTopp + (tmed ? 1.2 : 0)) || y > fotY(x) - 1) continue;
      if (arGront(d[i * 4], d[i * 4 + 1], d[i * 4 + 2]) && tat(x, y) > 0.12) M[i] = 1;
    }
  }
  /* 2 Det som står på marken framför altanen. */
  const band = Math.max(3, Math.round(h * 0.03)), bandRad = (x) => Math.min(Math.round(lag[x]) + 2, h - band);
  const prov = [];
  for (let x = xMin; x <= xMax; x++) if (lag[x] >= 0) for (let y = bandRad(x); y < bandRad(x) + band; y++) if (y >= 0) prov.push(rgb(y * w + x));
  if (prov.length > 20) {
    const med = [0, 1, 2].map((k) => prov.map((p) => p[k]).sort((a, b) => a - b)[prov.length >> 1]);
    const fro = [];
    for (let x = xMin; x <= xMax; x++) {
      if (lag[x] < 0) { fro.push(false); continue; }
      let n = 0;
      for (let y = bandRad(x); y < bandRad(x) + band; y++) { const p = rgb(y * w + x); if (!arGront(...p) && avst(p, med) > 50) n++; }
      fro.push(n >= band * 0.6);
    }
    // frön i sammanhängande spann, minst två kolumner
    let spann = [];
    for (let x = xMin, s = -1; x <= xMax + 1; x++) {
      const pa = x <= xMax && fro[x - xMin];
      if (pa && s < 0) s = x;
      if (!pa && s >= 0) { if (x - s >= 2) spann.push({ x0: s, x1: x - 1, w0: x - s, y: Math.min(...Array.from({ length: x - s }, (_, j) => bandRad(s + j))) + band - 1, miss: 0 }); s = -1; }
    }
    /* Fröets färg: medel och spridning. En björk är vit och svart (stor spridning):
       då följs bara det gråskaliga. En stolpe har en färg: då följs den färgen. */
    for (const s of spann) {
      const px = [];
      for (let x = s.x0; x <= s.x1; x++) for (let y = s.y - band + 1; y <= s.y; y++) px.push(rgb(y * w + x));
      const m = [0, 1, 2].map((k) => px.reduce((a, p) => a + p[k], 0) / px.length);
      const sd = [0, 1, 2].map((k) => Math.sqrt(px.reduce((a, p) => a + (p[k] - m[k]) ** 2, 0) / px.length));
      s.farg = { m, sd, gra: (sd[0] + sd[1] + sd[2]) / 3 > 30 };
    }
    // uppåt rad för rad: fröets färg, eller gråskala för en björkstam; inte grönt, inte bredare
    const liknar = (p, s) => {
      if (arGront(...p)) return false;
      const mx = Math.max(...p), mn = Math.min(...p);
      if (mx - mn < 28) return true;
      return !s.farg.gra && p.every((v, k) => Math.abs(v - s.farg.m[k]) < 2.5 * s.farg.sd[k] + 12);
    };
    const ymin = Math.max(yTopp, 0);
    let y = Math.max(...spann.map((s) => s.y), 0);
    for (; y >= ymin && spann.length; y--) {
      const nya = [];
      for (const s of spann) {
        if (y > s.y) { nya.push(s); continue; }
        // en stam blir inte bredare uppåt: högst en och en halv gång fröets bredd (granskningen av första försöket: den växte ut i buskarna bakom)
        const bredd = Math.min(s.x1 - s.x0 + 1, Math.round(s.w0 * 1.5) + 3), a = Math.max(0, s.x0 - 2), b = Math.min(w - 1, s.x1 + 2);
        const runs = [];
        for (let x = a, r0 = -1; x <= b + 1; x++) {
          const pa = x <= b && liknar(rgb(y * w + x), s);
          if (pa && r0 < 0) r0 = x;
          if (!pa && r0 >= 0) { runs.push([r0, x - 1]); r0 = -1; }
        }
        const ok = runs.filter(([r0, r1]) => r1 >= s.x0 - 1 && r0 <= s.x1 + 1 && r1 - r0 >= 0);
        if (!ok.length) {
          // svarta fläckar på en björk: ett par rader utan träff bryter inte stammen
          if (++s.miss <= 3) { for (let x = s.x0; x <= s.x1; x++) M[y * w + x] = 2; nya.push(s); }
          continue;
        }
        const grenar = ok.length > 1 && ok.every(([r0, r1]) => r1 - r0 + 1 >= 2);
        for (const [r0, r1] of grenar ? ok : [[Math.min(...ok.map((r) => r[0])), Math.max(...ok.map((r) => r[1]))]]) {
          let x0 = r0, x1 = r1;
          if (x1 - x0 + 1 > bredd + 2) { const m = (Math.max(x0, s.x0) + Math.min(x1, s.x1)) / 2; x0 = Math.max(x0, Math.round(m - bredd / 2) - 1); x1 = Math.min(x1, Math.round(m + bredd / 2) + 1); }
          for (let x = x0; x <= x1; x++) M[y * w + x] = 2;
          nya.push({ x0, x1, w0: grenar ? Math.max(2, Math.round(s.w0 * 0.7)) : s.w0, y: s.y, miss: 0, farg: s.farg });
        }
      }
      spann = nya.slice(0, 12);
    }
  }
  /* Masken i penselns upplösning (halv). Löven pixel för pixel: bara de gröna
     pixlarna nära ett hittat löv, inte väggen mellan löven (första försöket: husets
     röda vägg syntes i fläckar på uterummets vita vägg). Stammen som den är. */
  const hw = Math.round(foto.w / 2), hh = Math.round(foto.h / 2);
  if (!foto.halvt || foto.halvt.kalla !== foto.bild) {
    const c2 = kanvas(hw, hh), g2 = c2.getContext('2d', { willReadFrequently: true });
    g2.imageSmoothingQuality = 'high'; g2.drawImage(foto.bild, 0, 0, hw, hh);
    foto.halvt = { kalla: foto.bild, d: g2.getImageData(0, 0, hw, hh).data };
  }
  const H2 = foto.halvt.d;
  const ut = kanvas(hw, hh), ug = ut.getContext('2d'), id = ug.createImageData(hw, hh);
  let antal = 0;
  for (let y = 0; y < hh; y++) for (let x = 0; x < hw; x++) {
    const qx = Math.min(w - 1, (x * w / hw) | 0), qy = Math.min(h - 1, (y * h / hh) | 0), m = M[qy * w + qx];
    let v = m === 2;
    if (!v) {
      let nara = false;
      for (let dy = -1; dy <= 1 && !nara; dy++) for (let dx = -1; dx <= 1 && !nara; dx++) { const yy = qy + dy, xx = qx + dx; if (yy >= 0 && yy < h && xx >= 0 && xx < w && M[yy * w + xx] === 1) nara = true; }
      if (nara) { const i = (y * hw + x) * 4, r = H2[i], g = H2[i + 1], b = H2[i + 2]; v = 2 * g - r - b > 14 && g - b > 25; }
    }
    if (v) { const i = (y * hw + x) * 4; id.data[i] = id.data[i + 1] = id.data[i + 2] = 255; id.data[i + 3] = 255; antal++; }
  }
  ug.putImageData(id, 0, 0);
  // samma mask som förut (samma placering igen): inget nytt, och en visad AI-bild står kvar
  let sig = antal;
  for (let i = 3; i < id.data.length; i += 4 * 97) sig = (sig * 31 + id.data[i]) | 0;
  if (String(sig) === autoSig) return;
  autoSig = String(sig);
  foto.auto = antal ? ut : null; foto.autoAndel = antal / (hw * hh);
  penselNr++; autoBump++; forgrundCache = null;
  ritaForgrund(); skrivAi(); ritaNu();
}
/* Förgrunden som mask i halv upplösning: det sidan hittat och det kunden
   målat, minus det kunden suddat. null när inget finns. */
let forgrundCache = null;
function forgrundKanvas() {
  if (!foto.auto && !foto.pensel) return null;
  if (forgrundCache && forgrundCache.nr === penselNr) return forgrundCache.c;
  const c = kanvas(Math.round(foto.w / 2), Math.round(foto.h / 2)), g = c.getContext('2d');
  if (foto.auto) g.drawImage(foto.auto, 0, 0);
  if (foto.pensel) g.drawImage(foto.pensel, 0, 0);
  if (foto.sudd) { g.globalCompositeOperation = 'destination-out'; g.drawImage(foto.sudd, 0, 0); g.globalCompositeOperation = 'source-over'; }
  forgrundCache = { nr: penselNr, c };
  return c;
}
function autoSlinga() {
  if (!fotoVyNu() || drarNu || strak || guide || foto.autoAv) return;
  const k = placeringsNyckel();
  if (k === autoNyckel) return;
  autoNyckel = k; clearTimeout(autoTimer); autoTimer = setTimeout(beraknaAuto, 250);
}

/* ============================================================
   Underlag till den fotorealistiska bilden (steg 2)
   somBild(): fotot med uterummet inritat, i fotots egen upplösning, som JPEG.
   mask(del): var uterummet syns, vitt på svart, i fotots upplösning.
     'alla'  hela rummet, utvidgat och med mjuk kant (marginal för AI:ns avvikelser)
     'tak'   taket med sparrar, vindskivor och rännor, utvidgat och mjukt
     'vagg'  väggarna: glaspartier, öppningar, täta väggar, gavlar och hörnbrädor
     'glas'  bara glasytor och öppningar där fotot syns igenom, skarp: utan
             något av rummet (ramar, golv, täta väggar) framför eller bakom.
             Där ska fotots egna pixlar synas (lärdomen från fotomontagets runda 4).
     'opak'  allt av rummet som inte är glas, skarp: till jämförelsen med AI-bilden
     'skugga' rummets skugga på fotots mark och vägg, i gråskala
   Handtag och etiketter ligger i sidan, inte i duken, och kommer aldrig med.
   ============================================================ */
function iFotoupplosning(fn) {
  if (!fotoVyNu()) throw new Error('bara i fotoläget');
  const w = foto.w, h = foto.h;
  const mg = rum.getObjectByName('matt'), mgSyns = mg && mg.visible;
  if (mg) mg.visible = false;
  const mark = Object.values(markeringar).filter((o) => o.visible);
  for (const o of mark) o.visible = false;
  renderare.setPixelRatio(1); renderare.setSize(w, h, false);
  kamera.aspect = w / h; kamera.updateProjectionMatrix();
  try { return fn(w, h); } finally {
    if (mg) mg.visible = mgSyns;
    for (const o of mark) o.visible = true;
    passa(); fotoKamera(); ritaNu();
  }
}
const kanvas = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
const pixlar = (c) => c.getContext('2d', { willReadFrequently: true }).getImageData(0, 0, c.width, c.height);
/* Fotot med uterummet inritat, och förgrunden överst, som kanvas: det som skickas. */
function skissKanvas() {
  const c = kanvas(foto.w, foto.h);
  iFotoupplosning((w, h) => {
    const g = c.getContext('2d');
    g.drawImage(foto.bild, 0, 0, w, h);
    renderare.shadowMap.needsUpdate = true;
    renderare.render(scen, kamera);
    g.drawImage(renderare.domElement, 0, 0, w, h);
    laggForgrund(g, w, h);
  });
  return c;
}
function somBild(kvalitet = 0.9) {
  const c = skissKanvas();
  return new Promise((ok) => c.toBlob(ok, 'image/jpeg', kvalitet));
}
/* Bara rummets skugga på fotots mark och vägg, genomskinlig runt om: samma
   skugga som i skissen, till fotot utanför AI-bildens mask. */
function skuggBild() {
  return iFotoupplosning((w, h) => {
    if (renderare.shadowMap.needsUpdate) renderare.render(scen, kamera);
    renderare.shadowMap.needsUpdate = false;
    const dolda = [];
    rum.traverse((o) => { if (o.isMesh && o.visible) { o.visible = false; dolda.push(o); } });
    renderare.setClearColor(0x000000, 0);
    renderare.render(scen, kamera);
    const c = kanvas(w, h); c.getContext('2d').drawImage(renderare.domElement, 0, 0, w, h);
    for (const o of dolda) o.visible = true;
    uppdateraSkuggor();
    return c;
  });
}
/* Rummets meshar som valj() godkänner, vita på svart. Skuggkartan ritas inte
   om: den är kvar från senaste vanliga bilden, med hela rummet. */
const MASK_VIT = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, toneMapped: false });
function tackning(w, h, valj, tom = 1) {
  const dolda = [], mark = new Set(Object.values(markeringar));
  rum.traverse((o) => { if (o.isMesh && o.visible && (mark.has(o) || o.userData.del === 'matt' || !valj(o))) { o.visible = false; dolda.push(o); } });
  const skugga = fotoSkugga.visible; fotoSkugga.visible = false;
  scen.overrideMaterial = MASK_VIT;
  renderare.setClearColor(0x000000, tom);
  renderare.render(scen, kamera);
  const c = kanvas(w, h); c.getContext('2d').drawImage(renderare.domElement, 0, 0, w, h);
  scen.overrideMaterial = null;
  renderare.setClearColor(0x000000, 0);
  fotoSkugga.visible = skugga;
  for (const o of dolda) o.visible = true;
  return c;
}
/* Utvidga (marginal för AI:ns avvikelser), sträck nedåt för kontaktskuggan och
   uppåt och i sidled för takets plåtar, tröskla och ge en mjuk kant. Smalare
   än fotomontagets mask(): med ±2 % och −3,5…+3 % täckte masken 60 % av fotot
   och husets nock fick dubbla konturer (granskningen). AI-bilden justeras mot
   fotot innan, så marginalen behövs bara för rummets egna avvikelser. */
function mjukMask(ra, w, h) {
  const m = kanvas(w, h), g = m.getContext('2d');
  g.fillStyle = '#000'; g.fillRect(0, 0, w, h);
  g.filter = `blur(${Math.round(w * 0.01)}px)`;
  const steg = Math.max(1, Math.round(h * 0.005));
  for (let dy = -Math.round(h * 0.022); dy <= Math.round(h * 0.02); dy += steg) g.drawImage(ra, 0, dy);
  for (const dx of [-Math.round(w * 0.012), Math.round(w * 0.012)]) g.drawImage(ra, dx, 0);
  g.filter = 'none';
  const d = g.getImageData(0, 0, w, h);
  for (let i = 0; i < d.data.length; i += 4) { const v = d.data[i] > 18 ? 255 : 0; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; }
  g.putImageData(d, 0, 0);
  const mjuk = kanvas(w, h), g2 = mjuk.getContext('2d');
  g2.filter = `blur(${Math.round(w * 0.006)}px)`; g2.drawImage(m, 0, 0);
  return mjuk;
}
const arGlas = (o) => o.material === M.glas || o.userData.oppning === true;
const DELAR = ['tak', 'vagg', 'stomme'];
/* Rummets delar tak, vägg och stomme i en halvstor bild, en färgkanal var: sparas
   med versionen, så att en ändring också täcker där den förra designen stod
   (granskningen: takpappens utsprång låg kvar när taket blev kanalplast). */
function delBild() {
  return iFotoupplosning((w, h) => {
    const tm = renderare.toneMapping; renderare.toneMapping = THREE.NoToneMapping;
    try {
      const c = kanvas(Math.round(w / 2), Math.round(h / 2)), g = c.getContext('2d', { willReadFrequently: true });
      const ut = g.createImageData(c.width, c.height);
      DELAR.forEach((del, k) => {
        const t = kanvas(c.width, c.height), tg = t.getContext('2d', { willReadFrequently: true });
        tg.drawImage(tackning(w, h, (o) => o.userData.del === del), 0, 0, c.width, c.height);
        const d = tg.getImageData(0, 0, c.width, c.height).data;
        for (let i = 0; i < d.length; i += 4) { ut.data[i + k] = d[i]; ut.data[i + 3] = 255; }
      });
      g.putImageData(ut, 0, 0);
      return c;
    } finally { renderare.toneMapping = tm; uppdateraSkuggor(); }
  });
}
function mask(del = 'alla', fore = null, utanMarginal = false) {
  return iFotoupplosning((w, h) => {
    // skuggkartan måste gälla rummet som det ser ut nu, innan något döljs
    if (renderare.shadowMap.needsUpdate) renderare.render(scen, kamera);
    renderare.shadowMap.needsUpdate = false;
    const tm = renderare.toneMapping;
    renderare.toneMapping = THREE.NoToneMapping;
    try {
      if (del === 'glas') {
        const glas = tackning(w, h, arGlas), annat = tackning(w, h, (o) => !arGlas(o) && o.material !== M.nat);
        const g = glas.getContext('2d', { willReadFrequently: true }), a = g.getImageData(0, 0, w, h), b = pixlar(annat);
        for (let i = 0; i < a.data.length; i += 4) { const v = a.data[i] > 127 && b.data[i] < 128 ? 255 : 0; a.data[i] = a.data[i + 1] = a.data[i + 2] = v; a.data[i + 3] = 255; }
        g.putImageData(a, 0, 0);
        return glas;
      }
      if (del === 'opak') return tackning(w, h, (o) => !arGlas(o) && o.material !== M.nat);
      if (del === 'skugga') {
        const dolda = [];
        rum.traverse((o) => { if (o.isMesh && o.visible) { o.visible = false; dolda.push(o); } });
        const [farg, opac] = [skuggMat.color.getHex(), skuggMat.opacity];
        skuggMat.color.set(0xffffff); skuggMat.opacity = 1; kontakt.material.color.set(0xffffff);
        renderare.setClearColor(0x000000, 1);
        renderare.render(scen, kamera);
        const c = kanvas(w, h); c.getContext('2d').drawImage(renderare.domElement, 0, 0, w, h);
        renderare.setClearColor(0x000000, 0);
        skuggMat.color.setHex(farg); skuggMat.opacity = opac; kontakt.material.color.set(0x000000);
        for (const o of dolda) o.visible = true;
        return c;
      }
      // en del eller flera: ['tak', 'vagg'] ger båda i samma mask, med förra versionens delar (fore) om de finns
      const delar = [].concat(del), valj = del === 'alla' ? () => true : (o) => delar.includes(o.userData.del);
      const ra = tackning(w, h, valj);
      if (utanMarginal) return ra;
      if (fore && del !== 'alla') {
        const d = pixlar(fore), t = kanvas(fore.width, fore.height), tg = t.getContext('2d'), ut = tg.createImageData(fore.width, fore.height);
        const kanaler = delar.map((x) => DELAR.indexOf(x)).filter((k) => k >= 0);
        for (let i = 0; i < d.data.length; i += 4) { const v = Math.max(0, ...kanaler.map((k) => d.data[i + k])); ut.data[i] = ut.data[i + 1] = ut.data[i + 2] = v; ut.data[i + 3] = 255; }
        tg.putImageData(ut, 0, 0);
        const rg = ra.getContext('2d'); rg.globalCompositeOperation = 'lighten'; rg.drawImage(t, 0, 0, w, h); rg.globalCompositeOperation = 'source-over';
      }
      return mjukMask(ra, w, h);
    } finally { renderare.toneMapping = tm; uppdateraSkuggor(); }
  });
}

/* ---------- valen till bildtjänsten ----------
   Routen vitlistar varje fält. syns och horn räknas ur kameran och rummets
   läge, så att prompten säger vilka väggar som syns utifrån och var hörnen står
   (granskningen: AI:ns rum blev smalare, vridet och fick väggarna på fel ställen). */
function vaggSyns() {
  const ut = {}, cam = new THREE.Vector3(0, foto.lage.h, 0);
  rum.updateMatrixWorld(true);
  for (const [k, p, n] of [['vv', [-S.b / 2, 1.2, S.d / 2], [-1, 0, 0]], ['vf', [0, 1.2, S.d], [0, 0, 1]], ['vh', [S.b / 2, 1.2, S.d / 2], [1, 0, 0]]]) {
    const q = new THREE.Vector3(...p).applyMatrix4(rum.matrixWorld), nv = new THREE.Vector3(...n).transformDirection(rum.matrixWorld);
    const d = cam.clone().sub(q).normalize().dot(nv);
    if (d > 0.2) ut[k] = 'ute';
    else if (d < -0.2) { if (S.vf === 'glas' && S.vagg !== 'oppen') ut[k] = 'inne'; }
    else ut[k] = 'kant';
  }
  return ut;
}
function hornProcent(ruta) {
  rum.updateMatrixWorld(true);
  const x = (lx, lz) => { const f = tillFoto(new THREE.Vector3(lx, 0.2, lz).applyMatrix4(rum.matrixWorld)); return f ? Math.round((ruta.x + f[0] * ruta.w) * 100) : null; };
  const ut = { fv: x(-S.b / 2, S.d), fh: x(S.b / 2, S.d), bv: x(-S.b / 2, 0), bh: x(S.b / 2, 0) };
  for (const k in ut) if (ut[k] == null || ut[k] < -20 || ut[k] > 120) delete ut[k];
  return ut;
}
const fotoVal = (ruta = { x: 0, y: 0, w: 1, h: 1 }, kvot = foto.kvot) => ({ b: S.b, d: S.d, h: S.h, form: S.form, lut: S.lut, tak: S.tak, vagg: S.vagg, glas: S.glas, golv: S.golv,
  vv: S.vv, vf: S.vf, vh: S.vh, insida: S.insida, farg: S.farg, led: S.led, nat: S.nat && harGlas(), kvot,
  ...(fotoVyNu() ? { syns: vaggSyns(), horn: hornProcent(ruta) } : {}) });
/* Samma bild: är nyckeln oförändrad sedan förra AI-bilden har bara material,
   täckning, färg, golv, glas, insida eller tillval ändrats, och förra bilden kan vara bas.
   Mått, takform, lutning och placering ger en ny nyckel och en ny bild ur fotot. */
const placeringsNyckel = () => [S.b, S.d, S.h, S.form, S.lut, ...Object.values(foto.lage)].map((v) => (typeof v === 'number' ? v.toFixed(4) : v)).join('|');
/* Ljuset och förgrunden: ändras bara de sätts bilden ihop igen här, utan ny AI-bild. */
const lokalNyckel = () => `${foto.ljus.az}|${foto.ljus.mulet}|${autoSig}|${penselNr - autoBump}`;
/* Valen som syns i bilden, med bara det som gäller: insidan när något kläs,
   glaset när det finns glaspartier, partierna när en vägg är av glas
   (granskningen: en betald ändring med tom instruktion när bara en dold insida skilde). */
const aiVal = (o) => ({ tak: o.tak, farg: o.farg, golv: o.golv, vv: o.vv, vf: o.vf, vh: o.vh, vagg: harGlas(o) ? o.vagg : '-',
  glas: harGlasYta(o) ? o.glas : '-', insida: harInsida(o) ? o.insida : '-', led: !!o.led, nat: !!(o.nat && harGlas(o)) });

/* ============================================================
   Den fotorealistiska bilden (AI)
   Rami 2026-09-29: "som om det redan vore byggt på kundens hus". Flödet är
   fotomontagets: skissen (fotot med uterummet inritat) skickas med skiss=1
   till /api/uterum-montage/, sidan pollar, hämtar resultatet via ?hamta= och
   sätter ihop bilden här:
   · AI-bilden skärs till fotots format (bildtjänsten har fem format, fotot
     fylls ut innan) och flyttas så att huset ligger där det ligger på fotot
   · stämmer AI:ns uterum inte med skissen visas bilden inte (granskningen:
     13 % av bildbredden fel och vridet)
   · utanför uterummet alltid kundens foto, med rummets skugga från 3D
   · uterummet (ramar, tak, täta väggar, golv) från AI-bilden, genom masken
     av rummets siluett som forfina() utökar med AI:ns faktiska ändring nära
   · glasytorna och öppningarna från FOTOTS EGNA pixlar, med bara en svag,
     suddig ton av AI-bildens glas (GLAS_AI), utom där AI-bilden har en karm
   · förgrunden (det som står framför rummet) överst från fotot
   Byts bara material, täckning, färg, golv, glas, insida eller tillval (samma
   placeringsnyckel) redigeras den ihopsatta förra bilden med en ändring, så
   rummet står kvar och huset är kundens foto. Nya mått, takform, lutning
   eller placering ger en ny bild ur fotot. Nytt ljus eller ny förgrund sätts
   ihop här utan ny bild.
   ============================================================ */
const API = '/api/uterum-montage/';
/* Så mycket av AI-bildens glas som syns i glasytorna, kraftigt suddat: bara
   glasets ton och reflex. Med 25 % och lätt sudd syntes AI:ns omritade dörrkarmar
   som spöklika dubbla karmar över fotots egna (granskningen 2026-09-29). */
const GLAS_AI = 0.18, GLAS_SUDD = 0.016;
const FORMAT_AI = [1, 4 / 3, 3 / 4, 16 / 9, 9 / 16];   // bildtjänstens format, som i routen
const sov = (ms) => new Promise((ok) => setTimeout(ok, ms));
const laddaBild = (src) => new Promise((ok, fel) => { const im = new Image(); im.crossOrigin = 'anonymous'; im.onload = () => ok(im); im.onerror = fel; im.src = src; });
const FEL_AI = {
  tak: 'Prototypen skapar tre bilder per enhet och dygn. Bilderna du redan har finns kvar att visa och spara.',
  'tak-totalt': 'Många skapar bilder just nu. Försök igen om en stund, eller ring <a href="tel:+46735192333" style="color:inherit">073-519 23 33</a>.',
  bild: 'Fotot gick inte att använda. Prova ett annat foto.',
  saldo: 'Bildtjänsten är tillfälligt stängd. Ring <a href="tel:+46735192333" style="color:inherit">073-519 23 33</a> så hjälper vi dig.',
  'ej-konfigurerad': 'Bildtjänsten är inte påslagen här. Skissen på fotot fungerar som vanligt.',
  'ingen-andring': 'Ändringen syns inte i bilden, så ingen ny bild behövs.',
  misslyckades: 'Bilden gick inte att skapa den här gången. Försök igen: ett försök som bildtjänsten inte klarar räknas inte.',
  format: 'Bildtjänsten svarade med fel bildformat, så bilden visas inte. Försök igen.',
  skiss: 'Bildtjänsten lade uterummet på fel ställe den här gången, så bilden visas inte. Försöket räknas tyvärr mot dagens bilder.',
};
let aiKvar = null;                    // bilder kvar i dag enligt routen
let aiBekraftat = false;              // kunden har sagt ja till att fotot skickas
/* Bilderna kvar i dag, innan något skickas (GET ?kvar=1, inget foto följer med). */
async function hamtaKvar() {
  if (!AI_BILD) return;
  try { const r = await fetch(API + '?kvar=1'); const d = await r.json(); if (typeof d.kvar === 'number') { aiKvar = d.kvar; skrivAi(); } } catch { /* visas inte */ }
}
let vantar = null;                    // en bild som tog för lång tid: jobbets id och underlaget, för att hämta den senare

/* Vilka delar av rummet en ändring gäller, som mask(del) vill ha dem. */
function andradeDelar(fore) {
  const a = aiVal(fore), b = aiVal(S);
  if (a.farg !== b.farg) return 'alla';                      // profilerna sitter överallt
  const d = new Set();
  if (a.tak !== b.tak || a.led !== b.led) d.add('tak');
  if (VAGGAR.some((k) => a[k] !== b[k]) || a.vagg !== b.vagg || a.glas !== b.glas || a.nat !== b.nat) d.add('vagg');
  if (a.insida !== b.insida) { d.add('vagg'); d.add('tak'); }   // väggarnas insida och innertaket
  if (a.golv !== b.golv) d.add('stomme');
  return [...d];
}
/* Läget mot versionen som visas: ingen, samma bild, bara ljus eller förgrund
   ändrat, bara material ändrat, eller ny bild. */
function aiLage() {
  const v = versioner[visad];
  if (!v) return 'ingen';
  if (v.nyckel !== placeringsNyckel()) return 'ny';
  const a = aiVal(v.design), b = aiVal(S);
  if (Object.keys(a).some((k) => a[k] !== b[k])) return 'andring';
  return v.lokal === lokalNyckel() ? 'samma' : 'lokal';
}
/* Knapparna på fotot efter läget. Ändras ett val medan AI-bilden visas syns
   ändringen direkt i skissen på samma foto, och knappen erbjuder att visa
   den fotorealistiskt. Innan placeringen är gjord är knappen nedtonad. */
function skrivAi() {
  if (!AI_BILD) { $('placera').hidden = !foto.aktiv || !fotoVyNu(); $('oppna').hidden = false; ritaForgrund(); return; }
  const pa = fotoVyNu(), f = foto.aktiv, lage = aiLage();
  if (aiVisas && lage !== 'samma') { aiVisas = false; lagFotoLayout(); }
  const visar = pa && aiVisas;
  $('placera').hidden = !f || !pa || visar;
  $('oppna').hidden = visar;
  const sk = $('skapa-ai');
  sk.hidden = !(pa && AI_BILD) || visar || lage === 'samma';
  sk.disabled = aiArbetar;
  sk.classList.toggle('dampad', !foto.bekraftad);
  const skText = lage === 'andring' ? 'Visa ändringen fotorealistiskt'
    : lage === 'lokal' ? 'Visa det nya i bilden' : lage === 'ny' ? 'Skapa ny fotorealistisk bild' : 'Skapa fotorealistisk bild';
  // bilderna kvar i dag står på knappen innan något skickas (ett nytt ljus sätts ihop här och kostar ingen bild)
  sk.querySelector('span').innerHTML = skText + (lage !== 'lokal' && aiKvar != null ? `<small class="ai-kvar">${aiKvar > 0 ? `${aiKvar} av 3 bilder kvar i dag` : 'Inga bilder kvar i dag'}</small>` : '');
  const va = $('visa-ai');
  va.hidden = !(pa && AI_BILD && (visar || lage === 'samma'));
  va.querySelector('span').textContent = visar ? 'Visa skissen' : 'Visa AI-bilden';
  va.setAttribute('aria-pressed', String(visar));
  $('spara-ai').hidden = !visar;
  $('ai-sek').hidden = !f || !versioner.length;
  ritaForgrund();
}
function visaSkissen() {
  aiVisas = false; lagFotoLayout(); skrivAi(); ritaNu();
}
/* En version på fotot: dess design, placering och ljus tillbaka, och före/efter över skissen. */
function visaVersion(i) {
  const v = versioner[i]; if (!v) return;
  visad = i;
  if (vy !== 'foto') sattVy('foto', 0);
  Object.assign(S, v.design);
  Object.assign(foto.ljus, v.ljus); $('ljus').value = foto.ljus.az; fyll($('ljus')); $('mulet').checked = foto.ljus.mulet;
  normalisera(); stangPartier(); byggKo = false; byggRum();
  tillampaFarg(); tillampaGlas();
  sattFotoLage(v.lage); provFasad(); uppdateraSkuggor();
  uppdateraText();
  aiBildUrl = /^https:/.test(v.ai) ? v.ai : null;
  $('jmf-efter').src = v.url; $('jmf-fore').src = foto.url;
  $('spara-ai').href = v.url; $('spara-ai').download = `uterum-alltfix-${i + 1}.jpg`;
  // startläget för jämförelsen hör till versionen (granskningen: bytet behöll förra reglagets läge)
  $('delning').value = v.start; jmfEl.style.setProperty('--delning', v.start + '%');
  aiVisas = true; lagFotoLayout(); skrivAi(); ritaVersioner();
}
function vaggKort(val) {
  const tata = VAGGAR.filter((k) => val[k] !== 'glas');
  if (!tata.length) return val.vagg === 'oppen' ? 'öppna sidor' : 'glasväggar';
  return tata.map((k) => `${VAGG_KORT[k].toLowerCase()} ${MATERIAL_KORT[val[k]]}`).join(', ');
}
function versionsText(val) {
  const form = val.form === 'plant' ? FORM.plant : `${FORM[val.form]} ${val.lut}°`;
  return `${form} · ${TAK[val.tak].toLowerCase()} · ${vaggKort(val)}`;
}
function ritaVersioner() {
  if (!AI_BILD) { skrivAi(); return; }
  const r = $('remsa'); r.innerHTML = '';
  versioner.forEach((v, i) => {
    const b = document.createElement('button'); b.type = 'button';
    b.setAttribute('aria-pressed', String(i === visad && aiVisas));
    b.setAttribute('aria-label', `Visa bild ${i + 1}: ${versionsText(v.val)}`);
    b.title = `Bild ${i + 1}: ${versionsText(v.val)}`;
    b.innerHTML = `<img src="${v.url}" alt=""><b aria-hidden="true">${i + 1}</b>`;
    b.addEventListener('click', () => visaVersion(i));
    r.appendChild(b);
  });
  const v = versioner[visad];
  $('ai-vald').innerHTML = v ? `<b>Bild ${visad + 1}</b> · ${versionsText(v.val)}` : '';
  skrivAi();
}
const kvarText = () => (aiKvar == null ? '' : aiKvar > 0 ? ` Du kan skapa ${aiKvar} ${aiKvar === 1 ? 'bild' : 'bilder'} till i dag.` : ' Det var dagens sista bild.');

/* ---------- bildformatet ----------
   Bildtjänsten ritar i 1:1, 4:3, 3:4, 16:9 eller 9:16. Ett foto i annat format
   (3:2 till exempel) fylls ut till närmaste format med en suddig förlängning
   av fotot, och samma ruta skärs ut ur svaret (granskningen: AI-bilden sträcktes
   annars 12,5 % mot masken). ruta: fotots del av den utfyllda bilden, i andelar. */
function tillFormat(c) {
  const k = c.width / c.height;
  const mal = FORMAT_AI.reduce((a, f) => (Math.abs(Math.log(f / k)) < Math.abs(Math.log(a / k)) ? f : a));
  if (Math.abs(Math.log(mal / k)) < 0.01) return { bild: c, ruta: { x: 0, y: 0, w: 1, h: 1 }, kvot: mal };
  const W = mal > k ? Math.round(c.height * mal) : c.width, H = mal > k ? c.height : Math.round(c.width / mal);
  const u = kanvas(W, H), g = u.getContext('2d');
  g.filter = `blur(${Math.round(Math.max(W, H) * 0.02)}px)`; g.drawImage(c, 0, 0, W, H); g.filter = 'none';
  const x = Math.round((W - c.width) / 2), y = Math.round((H - c.height) / 2);
  g.drawImage(c, x, y);
  return { bild: u, ruta: { x: x / W, y: y / H, w: c.width / W, h: c.height / H }, kvot: mal };
}

/* ---------- AI-bilden mot fotot och skissen ----------
   Gradientbilder i låg upplösning: kanterna (stolpar, takfötter, fönster) är
   det som ska ligga på samma ställe. Färgerna byter AI:n, kanterna ska den inte flytta. */
const JMF_B = 320;
function gradienter(bild, sw, sh) {
  const c = kanvas(sw, sh), g = c.getContext('2d', { willReadFrequently: true });
  g.filter = 'blur(0.6px)'; g.drawImage(bild, 0, 0, sw, sh); g.filter = 'none';
  const d = g.getImageData(0, 0, sw, sh).data, L = new Float32Array(sw * sh), G = new Float32Array(sw * sh);
  for (let i = 0; i < L.length; i++) L[i] = 0.3 * d[i * 4] + 0.59 * d[i * 4 + 1] + 0.11 * d[i * 4 + 2];
  for (let y = 1; y < sh - 1; y++) for (let x = 1; x < sw - 1; x++) {
    const i = y * sw + x;
    G[i] = Math.abs(L[i + 1] - L[i - 1]) + Math.abs(L[i + sw] - L[i - sw]);
  }
  return G;
}
function maskLag(mask, sw, sh) {
  const c = kanvas(sw, sh), g = c.getContext('2d', { willReadFrequently: true }); g.drawImage(mask, 0, 0, sw, sh);
  const d = g.getImageData(0, 0, sw, sh).data, M0 = new Uint8Array(sw * sh);
  for (let i = 0; i < M0.length; i++) M0[i] = d[i * 4] > 127 ? 1 : 0;
  return M0;
}
/* Normerad korrelation mellan A och B förskjuten (dx, dy), över pixlarna där vikt är 1. */
function korrelation(A, B, vikt, sw, sh, dx, dy) {
  let n = 0, sa = 0, sb = 0, saa = 0, sbb = 0, sab = 0;
  for (let y = 4; y < sh - 4; y += 1) {
    const yb = y + dy; if (yb < 1 || yb >= sh - 1) continue;
    for (let x = 4; x < sw - 4; x += 1) {
      const i = y * sw + x; if (!vikt[i]) continue;
      const xb = x + dx; if (xb < 1 || xb >= sw - 1) continue;
      const a = A[i], b = B[yb * sw + xb];
      n++; sa += a; sb += b; saa += a * a; sbb += b * b; sab += a * b;
    }
  }
  if (n < 50) return 0;
  const va = saa - sa * sa / n, vb = sbb - sb * sb / n;
  return va > 0 && vb > 0 ? (sab - sa * sb / n) / Math.sqrt(va * vb) : 0;
}
/* Bästa förskjutning (i låga pixlar) inom ±r, grovt och sedan fint. */
function bastaSkift(A, B, vikt, sw, sh, r) {
  let bast = { dx: 0, dy: 0, k: korrelation(A, B, vikt, sw, sh, 0, 0) };
  for (let dy = -r; dy <= r; dy += 2) for (let dx = -r; dx <= r; dx += 2) {
    const k = korrelation(A, B, vikt, sw, sh, dx, dy); if (k > bast.k) bast = { dx, dy, k };
  }
  const g = bast;
  for (let dy = g.dy - 1; dy <= g.dy + 1; dy++) for (let dx = g.dx - 1; dx <= g.dx + 1; dx++) {
    const k = korrelation(A, B, vikt, sw, sh, dx, dy); if (k > bast.k) bast = { dx, dy, k };
  }
  return { ...bast, k0: korrelation(A, B, vikt, sw, sh, 0, 0) };
}
/* AI-bilden i fotots format och läge: rutan skärs ut ur den utfyllda bilden, och
   bilden flyttas så att huset och trädgården utanför rummet ligger där de
   ligger på fotot (granskningen: AI:n flyttade husets nock ungefär 20 px, och
   den mjuka kanten blandade två nockar). */
function aiIFoto(ai, ruta, rum0) {
  const w = foto.w, h = foto.h, aw = ai.naturalWidth || ai.width, ah = ai.naturalHeight || ai.height;
  const sx = ruta.x * aw, sy = ruta.y * ah, sW = ruta.w * aw, sH = ruta.h * ah;
  const rakt = kanvas(w, h); rakt.getContext('2d').drawImage(ai, sx, sy, sW, sH, 0, 0, w, h);
  const sw = JMF_B, sh = Math.round(JMF_B / foto.kvot);
  const utanfor = maskLag(rum0, sw, sh).map((v) => 1 - v);
  const s = bastaSkift(gradienter(foto.bild, sw, sh), gradienter(rakt, sw, sh), utanfor, sw, sh, Math.round(sw * 0.025));
  const px = (s.dx * w) / sw, py = (s.dy * h) / sh;
  const rit = { ai, sx: sx + px * (sW / w), sy: sy + py * (sH / h), sW, sH };
  return { bild: aiFotoAv(rit), rit, skift: [+(px / w).toFixed(4), +(py / h).toFixed(4)], husK: +s.k.toFixed(3) };
}
/* AI-bilden i fotots format ur den laddade bilden och utsnittet: versionerna
   sparar bara det, inte en kanvas i full storlek till (minnet på telefonen). */
function aiFotoAv(rit) {
  const c = kanvas(foto.w, foto.h);
  c.getContext('2d').drawImage(rit.ai, rit.sx, rit.sy, rit.sW, rit.sH, 0, 0, foto.w, foto.h);
  return c;
}
const halv = (m) => { const c = kanvas(Math.round(m.width / 2), Math.round(m.height / 2)); c.getContext('2d').drawImage(m, 0, 0, c.width, c.height); return c; };
/* Stämmer AI:ns uterum med skissen (ny bild) eller med förra bilden (ändring)?
   Kanterna inne i rummets område jämförs: ligger de bäst med en stor
   förskjutning, eller stämmer de dåligt även med den bästa, har AI:n lagt
   rummet någon annanstans. */
const SKISS_MIN_K = 0.15, SKISS_MAX_SKIFT = 0.03;
/* utan: en mask som dras ifrån området. En ändring jämförs i det av rummet som
   INTE ändrades (stolparna, golvet och väggarna när taket byts): där ska den nya
   bilden ha samma kanter som den förra. Granskningen 2026-09-29: jämfört i själva
   taket skilde kanalplast och takpapp så mycket att båda ändringarna underkändes,
   fast rummet stod kvar. */
function stammerMed(ref, aiFoto, omrade, utan = null) {
  const sw = JMF_B, sh = Math.round(JMF_B / foto.kvot);
  const vikt = maskLag(omrade, sw, sh);
  if (utan) {
    const u = maskLag(utan, sw, sh);
    let n = 0;
    for (let i = 0; i < vikt.length; i++) { if (u[i]) vikt[i] = 0; n += vikt[i]; }
    if (n < 400) { const v2 = maskLag(omrade, sw, sh); vikt.set(v2); }   // ändringen gäller nästan hela rummet (färgen): jämför allt
  }
  const s = bastaSkift(gradienter(ref, sw, sh), gradienter(aiFoto, sw, sh), vikt, sw, sh, Math.round(sw * 0.08));
  const skift = Math.hypot(s.dx / sw, s.dy / sh);
  return { ok: s.k0 >= SKISS_MIN_K && skift <= SKISS_MAX_SKIFT, k0: +s.k0.toFixed(3), k: +s.k.toFixed(3), skift: +skift.toFixed(3) };
}

/* Runda 3 i fotomontaget: där AI:n ritade uterummet en bit utanför skissen blev
   kanten suddig och dubbel, eftersom masken tonade ut mitt i det nya taket.
   Masken utökas därför med det AI:n faktiskt ändrade, men bara nära skissen,
   och bara där skillnaden är stor. */
function forfina(mask, ai, grund, w, h) {
  const k = 4, sw = Math.round(w / k), sh = Math.round(h / k);
  const las = (bild, filter = 'none') => { const c = kanvas(sw, sh), x = c.getContext('2d', { willReadFrequently: true }); x.filter = filter; x.drawImage(bild, 0, 0, sw, sh); return x.getImageData(0, 0, sw, sh).data; };
  const A = las(ai, 'blur(1px)'), G = las(grund, 'blur(1px)'), Mk = las(mask), Nk = las(mask, `blur(${Math.round(sw * 0.012)}px)`);
  const ut = kanvas(sw, sh), gu = ut.getContext('2d'), d = gu.createImageData(sw, sh);
  for (let i = 0; i < d.data.length; i += 4) {
    const diff = Math.max(Math.abs(A[i] - G[i]), Math.abs(A[i + 1] - G[i + 1]), Math.abs(A[i + 2] - G[i + 2]));
    // mjuk gräns: ju längre från skissen, desto svagare får AI:ns ändring vara med
    const v = Math.max(Mk[i], diff > 48 ? Math.min(255, Nk[i] * 3) : 0);
    d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255;
  }
  gu.putImageData(d, 0, 0);
  // stäng små hål och ge en smal mjuk kant
  const stor = kanvas(w, h), gs = stor.getContext('2d');
  gs.filter = `blur(${Math.max(1, Math.round(w * 0.003))}px)`; gs.drawImage(ut, 0, 0, w, h);
  return stor;
}
/* Glasmasken minus där AI-bilden har en karm, en profil eller en vägg: pixlar
   i profilfärgen som skiljer sig tydligt från fotot. Där visades annars fotots
   husvägg ovanpå AI:ns karmar (granskningen: 5,3 % av glasmasken låg på vita
   karmar och balkar). */
/* Rummets egna delar i skissen, utvidgade med andelen u av bildbredden: AI:ns
   karmar och profiler ska ligga nära dem. */
function naraOpak(opak, w, h, u) {
  const c = kanvas(w, h), g = c.getContext('2d', { willReadFrequently: true });
  g.fillStyle = '#000'; g.fillRect(0, 0, w, h);
  g.filter = `blur(${Math.max(1, Math.round(w * u))}px)`; g.drawImage(opak, 0, 0, w, h); g.filter = 'none';
  const d = g.getImageData(0, 0, w, h), n = new Uint8Array(w * h);
  for (let j = 0; j < n.length; j++) n[j] = d.data[j * 4] > 8 ? 1 : 0;
  return n;
}
function glasMotAi(glas, ai, w, h, opak = null) {
  const G = pixlar(glas), A = pixlar(ai), F = pixlar(foto.bild);
  /* Bara karmar nära skissens egna ramar räknas: en vit karm mitt i glaset är
     husets dörr eller fönster som AI:n ritat om en bit bredvid, och där ska
     fotots egen karm synas (granskningen: dubbla dörrkarmar bakom glaset). */
  const naraRam = opak ? naraOpak(opak, w, h, 0.012) : null;
  const p = new THREE.Color(FARGER.find((x) => x.id === S.farg).hex), pr = p.r * 255, pg = p.g * 255, pb = p.b * 255;
  const ljus = pr + pg + pb > 500;
  const karm = new Uint8ClampedArray(w * h);
  for (let i = 0, j = 0; i < G.data.length; i += 4, j++) {
    if (G.data[i] < 128) continue;
    const r = A.data[i], g = A.data[i + 1], b = A.data[i + 2];
    const diff = Math.max(Math.abs(r - F.data[i]), Math.abs(g - F.data[i + 1]), Math.abs(b - F.data[i + 2]));
    const nara = ljus ? Math.min(r, g, b) > 175 && Math.max(r, g, b) - Math.min(r, g, b) < 34 : Math.abs(r - pr) + Math.abs(g - pg) + Math.abs(b - pb) < 90;
    if (nara && diff > 45 && (!naraRam || naraRam[j])) karm[j] = 255;
  }
  // karmen breddas några pixlar, så att ingen ljus kant blir kvar
  const kc = kanvas(w, h), kg = kc.getContext('2d', { willReadFrequently: true }), kd = kg.createImageData(w, h);
  for (let j = 0; j < karm.length; j++) { kd.data[j * 4 + 3] = karm[j]; }
  kg.putImageData(kd, 0, 0);
  const bred = kanvas(w, h), bg = bred.getContext('2d', { willReadFrequently: true });
  bg.filter = `blur(${Math.max(1, Math.round(w * 0.0015))}px)`; bg.drawImage(kc, 0, 0); bg.filter = 'none';
  const B = bg.getImageData(0, 0, w, h).data;
  const ut = kanvas(w, h), ug = ut.getContext('2d'), ud = ug.createImageData(w, h);
  let kvar = 0, bort = 0;
  for (let i = 0; i < G.data.length; i += 4) {
    const v = G.data[i] > 127 && B[i + 3] < 30 ? 255 : 0;
    if (G.data[i] > 127) { if (v) kvar++; else bort++; }
    ud.data[i] = ud.data[i + 1] = ud.data[i + 2] = v; ud.data[i + 3] = 255;
  }
  ug.putImageData(ud, 0, 0);
  ut.statistik = { kvar, bort };
  return ut;
}
/* En mask (vitt på svart) som alfakanal, för destination-in. */
function somAlfa(mask, w, h, oskarpa = 0) {
  const c = kanvas(w, h), g = c.getContext('2d', { willReadFrequently: true });
  if (oskarpa) g.filter = `blur(${oskarpa}px)`;
  g.drawImage(mask, 0, 0, w, h); g.filter = 'none';
  const d = g.getImageData(0, 0, w, h);
  for (let i = 0; i < d.data.length; i += 4) { d.data[i + 3] = d.data[i]; d.data[i] = d.data[i + 1] = d.data[i + 2] = 255; }
  g.putImageData(d, 0, 0);
  return c;
}
/* Var AI-bildens ändring börjar (andel från vänster), för jämförelsens
   startläge: strax till vänster om uterummet, aldrig vid kanten (granskningen:
   3 %, och greppet hamnade halvt utanför telefonens skärm). */
function vansterkant(mask) {
  const c = kanvas(200, 150), x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(mask, 0, 0, 200, 150);
  const d = x.getImageData(0, 0, 200, 150).data;
  for (let px = 0; px < 200; px++) { let n = 0; for (let py = 0; py < 150; py++) if (d[(py * 200 + px) * 4] > 128) n++; if (n > 3) return px / 200; }
  return 0.3;
}
/* Sätt ihop bilden. grund: fotot med skuggan. genom: det som syns genom
   glaset, fotot med rummets skugga. aiFoto: AI-bilden i fotots format och läge.
   Svarar med den rena bilden, den märkta som JPEG-adress och masken som
   jämförelsens startläge räknas ur. */
/* Utanför skissens rum (i maskens marginal och där forfina() tog med AI:ns
   ändring) får fotot tillbaka sina egna pixlar där AI-bilden bara ritat om det
   som redan fanns: samma färg i stort. Där AI:n ritat något nytt (sin karm, sin
   takkant, sin skugga) skiljer färgen, och AI-bilden står kvar (granskningen
   2026-09-29: kronan runt rummet och bakgrunden vid stammen var nygenererade).
   Rummets delar i skissen och glaset hanteras för sig. Svaret är en alfamask i
   full storlek. (Prövat och förkastat: att också genom glaset leta fotots pixlar
   en bit förskjutna. Då syntes AI:ns egen gavel där skissen visar husväggen.) */
function egnaPixlar(aiFoto, grund, opak, w, h) {
  const k = 4, sw = Math.round(w / k), sh = Math.round(h / k);
  const las = (bild) => { const c = kanvas(sw, sh), x = c.getContext('2d', { willReadFrequently: true }); x.filter = 'blur(1.5px)'; x.drawImage(bild, 0, 0, sw, sh); return x.getImageData(0, 0, sw, sh).data; };
  const A = las(aiFoto), G = las(grund), nara = naraOpak(opak, sw, sh, 0.006);
  const c = kanvas(sw, sh), g = c.getContext('2d'), d = g.createImageData(sw, sh);
  for (let j = 0, i = 0; j < nara.length; j++, i += 4) {
    const diff = Math.abs(A[i] - G[i]) + Math.abs(A[i + 1] - G[i + 1]) + Math.abs(A[i + 2] - G[i + 2]);
    const v = nara[j] ? 0 : Math.round(255 * (1 - Math.min(1, Math.max(0, (diff - 30) / 40))));
    d.data[i] = d.data[i + 1] = d.data[i + 2] = 255; d.data[i + 3] = v;
  }
  g.putImageData(d, 0, 0);
  const ut = kanvas(w, h), ug = ut.getContext('2d');
  ug.imageSmoothingQuality = 'high'; ug.drawImage(c, 0, 0, w, h);
  return ut;
}
/* Var den nya AI-bilden får synas: där den förra bilden (ref) visar rummet,
   alltså skiljer sig från fotot (bas), och där den nya designen täcker mer än
   den förra (nyRa utom gamRa), med en smal marginal för AI:ns egen kant. Resten
   är den förra bilden. Granskningen 2026-09-29: bytet till kanalplast målade om
   husets eget tegeltak ovanför rummet till en vit, suddig fläck, eftersom
   forfina() tog med allt AI:n ändrat nära taket. Husets pannor är fotots pixlar
   i bild 1, så där får bild 2 inte ändra något. Förra bildens rum räknas bara
   nära skissens rum (allaRa, 0,6 % marginal): AI:ns tak och husets pannor är
   båda mörka, och gränsen mellan dem blev annars en vågig, suddig kant. */
function andringsYta(ref, bas, nyRa, gamRa, allaRa) {
  const w = foto.w, h = foto.h, k = 4, sw = Math.round(w / k), sh = Math.round(h / k);
  const las = (bild, filter = 'none') => { const c = kanvas(sw, sh), x = c.getContext('2d', { willReadFrequently: true }); x.filter = filter; x.drawImage(bild, 0, 0, sw, sh); return x.getImageData(0, 0, sw, sh).data; };
  const R = las(ref, 'blur(1px)'), B = las(bas, 'blur(1px)'), N = las(nyRa), G = gamRa ? las(gamRa) : null;
  const nara = naraOpak(allaRa, sw, sh, 0.006);
  const c = kanvas(sw, sh), g = c.getContext('2d', { willReadFrequently: true }), d = g.createImageData(sw, sh);
  for (let i = 0, j = 0; i < d.data.length; i += 4, j++) {
    const diff = Math.abs(R[i] - B[i]) + Math.abs(R[i + 1] - B[i + 1]) + Math.abs(R[i + 2] - B[i + 2]);
    const v = (diff > 45 && nara[j]) || (N[i] > 127 && !(G && G[i] > 127)) ? 255 : 0;
    d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255;
  }
  g.putImageData(d, 0, 0);
  const u = kanvas(sw, sh), gu = u.getContext('2d', { willReadFrequently: true });
  gu.fillStyle = '#000'; gu.fillRect(0, 0, sw, sh);
  gu.filter = `blur(${Math.max(1, Math.round(sw * 0.003))}px)`; gu.drawImage(c, 0, 0); gu.filter = 'none';
  const e = gu.getImageData(0, 0, sw, sh);
  for (let i = 0; i < e.data.length; i += 4) { const v = e.data[i] > 10 ? 255 : 0; e.data[i] = e.data[i + 1] = e.data[i + 2] = v; e.data[i + 3] = 255; }
  gu.putImageData(e, 0, 0);
  const ut = kanvas(w, h), go = ut.getContext('2d');
  go.fillStyle = '#000'; go.fillRect(0, 0, w, h);
  go.filter = `blur(${Math.max(1, Math.round(w * 0.002))}px)`; go.drawImage(u, 0, 0, w, h); go.filter = 'none';
  return ut;
}
/* Förra versionens delar (delBild) som en vit mask för delarna del. */
function delarMask(delBild0, del) {
  const d = pixlar(delBild0), t = kanvas(delBild0.width, delBild0.height), tg = t.getContext('2d'), ut = tg.createImageData(delBild0.width, delBild0.height);
  const kanaler = del === 'alla' ? [0, 1, 2] : [].concat(del).map((x) => DELAR.indexOf(x)).filter((q) => q >= 0);
  for (let i = 0; i < d.data.length; i += 4) { const v = Math.max(0, ...kanaler.map((q) => d.data[i + q])); ut.data[i] = ut.data[i + 1] = ut.data[i + 2] = v; ut.data[i + 3] = 255; }
  tg.putImageData(ut, 0, 0);
  return t;
}
async function satsIhop(aiFoto, { mask, glas, genom, grund, opak = null, tillaten = null }) {
  const w = foto.w, h = foto.h;
  const c = kanvas(w, h), g = c.getContext('2d');
  g.drawImage(grund, 0, 0, w, h);
  // uterummet ur AI-bilden, genom den förfinade masken
  const fin = forfina(mask, aiFoto, grund, w, h);
  if (tillaten) { const gf = fin.getContext('2d'); gf.globalCompositeOperation = 'multiply'; gf.drawImage(tillaten, 0, 0, w, h); gf.globalCompositeOperation = 'source-over'; }
  const lager = kanvas(w, h), gl = lager.getContext('2d');
  gl.drawImage(aiFoto, 0, 0, w, h);
  gl.globalCompositeOperation = 'destination-in';
  gl.drawImage(somAlfa(fin, w, h), 0, 0);
  g.drawImage(lager, 0, 0);
  // fotots egna pixlar tillbaka där AI:n bara ritat om det som fanns, utanför rummets delar
  if (opak) {
    const eg = kanvas(w, h), ge = eg.getContext('2d');
    ge.drawImage(grund, 0, 0, w, h);
    ge.globalCompositeOperation = 'destination-in';
    ge.drawImage(egnaPixlar(aiFoto, grund, opak, w, h), 0, 0);
    g.drawImage(eg, 0, 0);
  }
  /* glasytorna: fotots pixlar och en svag, kraftigt suddad ton av AI:ns glas, utom
     där AI-bilden har en karm nära skissens ramar. Inte 3D-glaset: dess ton blev
     mjölkiga rutor mot AI-bildens klara glas. */
  const glasRen = glasMotAi(glas, aiFoto, w, h, opak);
  const gy = kanvas(w, h), gg = gy.getContext('2d');
  gg.drawImage(genom, 0, 0, w, h);
  gg.globalAlpha = GLAS_AI; gg.filter = `blur(${Math.max(2, Math.round(w * GLAS_SUDD))}px)`;
  gg.drawImage(aiFoto, 0, 0, w, h);
  gg.globalAlpha = 1; gg.filter = 'none';
  gg.globalCompositeOperation = 'destination-in';
  gg.drawImage(somAlfa(glasRen, w, h, 1.5), 0, 0);
  g.drawImage(gy, 0, 0);
  laggForgrund(g, w, h);
  const ren = kanvas(w, h); ren.getContext('2d').drawImage(c, 0, 0);
  // märkningen nere till höger
  const fs = Math.max(14, Math.round(w * 0.014)), text = 'AI-illustration · Alltfix';
  g.font = `600 ${fs}px Poppins, sans-serif`;
  const tw = g.measureText(text).width, pad = fs * 0.6, x0 = w - tw - pad * 3;
  g.fillStyle = 'rgba(20,20,36,.72)'; g.fillRect(x0, h - fs * 2.2 - pad, tw + pad * 2, fs * 2.2);
  g.fillStyle = '#fff'; g.fillText(text, x0 + pad, h - pad - fs * 0.75);
  const blob = await new Promise((ok) => c.toBlob(ok, 'image/jpeg', 0.92));
  return { ren, url: URL.createObjectURL(blob), fin, glasStatistik: glasRen.statistik };
}
/* Vänta in ett jobb hos bildtjänsten, högst tio minuter. lang() anropas när
   det gått längre tid än vanligt (granskningen: efter 150 s gav sidan upp och
   sa att försöket inte räknades, fast jobbet räknades och kunde bli klart). */
async function vantaPa(id, lang) {
  for (let i = 0; i < 240; i++) {
    await sov(2500);
    if (i === 40 && lang) lang();
    const q = await fetch(API + '?id=' + encodeURIComponent(id)).catch(() => null);
    const s = q ? await q.json().catch(() => ({})) : {};
    if (['completed', 'failed', 'nsfw', 'canceled'].includes(s.status)) return s;
  }
  return { status: 'tidsgrans' };
}
/* Starta hos bildtjänsten och vänta in resultatet. Svarar bildtjänsten
   "failed" (tillfälligt otillgänglig) görs ett nytt försök direkt; ett
   misslyckat jobb räknas inte mot dygnets tak. */
async function korAi(fd, underlag) {
  let s = {};
  for (let forsok = 0; forsok < 2 && s.status !== 'completed'; forsok++) {
    const r = await fetch(API, { method: 'POST', body: fd });
    const d = await r.json().catch(() => ({}));
    if (!r.ok || !d.id) throw new Error(d.fel || 'start');
    if (typeof d.kvar === 'number') aiKvar = d.kvar;
    s = await vantaPa(d.id, () => { $('arbetar-text').textContent = 'Bilden tar längre tid än vanligt. Vi fortsätter vänta …'; });
    if (s.status === 'tidsgrans') { vantar = { id: d.id, underlag }; throw new Error('tidsgrans'); }
    if (s.status !== 'failed') break;
  }
  if (s.status !== 'completed' || !s.url) throw new Error('misslyckades');
  return s.url;
}
/* Underlaget till en bild, ritat innan något skickas, med designen som den ser ut nu. */
function underlag(andring) {
  const v = versioner[visad];
  const skiss = skissKanvas(), glas = mask('glas'), opak = mask('opak');
  const andrat = andring ? andradeDelar(v.design) : 'alla';
  const delMask = andring ? mask(andrat, v.delar) : mask('alla');
  const alla = andring ? v.alla : delMask;
  const genom = kanvas(foto.w, foto.h);
  { const gg = genom.getContext('2d'); gg.drawImage(foto.bild, 0, 0); gg.drawImage(skuggBild(), 0, 0); }
  const skickas = tillFormat(andring ? v.ren : skiss);
  const tillaten = andring ? andringsYta(v.ren, genom, mask(andrat, null, true), v.delar ? delarMask(v.delar, andrat) : null, mask('alla', null, true)) : null;
  return { skiss, glas, opak, delMask, alla, genom, skickas, andring, fore: v, tillaten, val: fotoVal(skickas.ruta, skickas.kvot), design: { ...S },
    lage: { ...foto.lage }, nyckel: placeringsNyckel(), lokal: lokalNyckel(), ljus: { ...foto.ljus }, delar: delBild() };
}
/* AI-bilden in som en ny version: formatet och läget mot fotot, jämförelsen
   med skissen, ihopsättningen. */
async function nyVersion(aiUrl, u, test) {
  const ai = await laddaBild(test ? test : API + '?hamta=' + encodeURIComponent(aiUrl));
  const k = (ai.naturalWidth || ai.width) / (ai.naturalHeight || ai.height);
  if (Math.abs(Math.log(k / u.skickas.kvot)) > 0.02) throw new Error('format');
  const { bild: aiFoto, rit, skift, husK } = aiIFoto(ai, u.skickas.ruta, u.alla);
  // stämmer rummet? Jämför med skissen (ny bild) eller med förra bilden (ändring), i rummets område
  const kontroll = u.andring ? stammerMed(u.fore.ren, aiFoto, u.alla, u.delMask) : stammerMed(u.skiss, aiFoto, u.alla);
  senasteKontroll = { ...kontroll, husSkift: skift, husK };
  if (!kontroll.ok && !aiUtanKontroll) throw new Error('skiss');
  const grund = u.andring ? u.fore.ren : u.genom;
  const { ren, url, fin, glasStatistik } = await satsIhop(aiFoto, { mask: u.delMask, glas: u.glas, genom: u.genom, grund, opak: u.opak, tillaten: u.tillaten });
  senasteKontroll.glas = glasStatistik;
  const start = Math.round(Math.min(60, Math.max(12, vansterkant(fin) * 100 - 4)));
  versioner.push({ url, ren, ai: aiUrl, rit, alla: u.andring ? u.alla : halv(u.alla), delar: u.delar, val: u.val, design: u.design, lage: u.lage,
    nyckel: u.nyckel, lokal: u.lokal, ljus: u.ljus, start, andring: u.andring });
  await new Promise((ok) => { const im = $('jmf-efter'); im.onload = ok; im.onerror = ok; im.src = url; });
  visaVersion(versioner.length - 1);
}
let senasteKontroll = null, aiUtanKontroll = false;
/* Nytt ljus eller ny förgrund: bilden sätts ihop igen här ur samma AI-bild, utan
   ny bild från bildtjänsten (granskningen: ett nytt ljus kom aldrig in i bilden). */
async function nyttLokalt() {
  const v = versioner[visad];
  const genom = kanvas(foto.w, foto.h);
  { const gg = genom.getContext('2d'); gg.drawImage(foto.bild, 0, 0); gg.drawImage(skuggBild(), 0, 0); }
  const glas = mask('glas'), m = mask('alla'), opak = mask('opak');
  // bara där versionen redan visar rummet (en ändringsbild fick annars tillbaka det bild 2 inte fick ändra)
  const alla = mask('alla', null, true), tillaten = andringsYta(v.ren, foto.bild, alla, null, alla);
  const { ren, url, fin } = await satsIhop(aiFotoAv(v.rit), { mask: m, glas, genom, grund: genom, opak, tillaten });
  const start = Math.round(Math.min(60, Math.max(12, vansterkant(fin) * 100 - 4)));
  versioner.push({ ...v, url, ren, alla: halv(m), lokal: lokalNyckel(), ljus: { ...foto.ljus }, start });
  visaVersion(versioner.length - 1);
}
/* Skapa bilden, eller visa ändringen i samma bild. test: en bild-adress som
   används i stället för bildtjänstens svar (granskningen, inget anrop görs). */
async function skapaAi(test = null) {
  if (!AI_BILD || !fotoVyNu() || aiArbetar) return;
  const fel = $('ai-fel');
  fel.classList.remove('info');
  // placeringen först: tre bilder per dygn ska inte gå åt på startläget (granskningen)
  if (guide && !foto.bekraftad) {
    fel.innerHTML = 'Gör först de två dragen på fotot: från dörrens tröskel upp till överkanten, och sedan längs väggens fot.';
    fel.hidden = false; fel.classList.add('info');
    if (!placeraPa) sattPlacering(true);
    return;
  }
  if (!foto.bekraftad) {
    fel.innerHTML = 'Flytta först guldpunkterna till husväggens fot, där uterummet ska stå. <button type="button" class="knapp guld" id="placering-ok" style="margin-top:8px">Placeringen stämmer</button>';
    fel.hidden = false;
    $('placering-ok').addEventListener('click', () => { foto.bekraftad = true; fel.hidden = true; skrivFotoInfo(); skrivAi(); skapaAi(test); });
    if (!placeraPa) sattPlacering(true);
    return;
  }
  const lage = aiLage();
  if (lage === 'samma') { visaVersion(visad); return; }
  /* Första bilden: en bekräftelse som säger vad som skickas och hur många bilder
     som finns kvar (granskningen 2026-09-29: fotot skickades direkt, och kvoten
     syntes först i felmeddelandet). */
  if (lage !== 'lokal' && !aiBekraftat && !test) {
    const kvar = aiKvar != null ? ` Du har ${aiKvar} av 3 bilder kvar i dag.` : ' Du kan skapa 3 bilder per dag.';
    fel.innerHTML = `Fotot med uterummet inritat skickas nu till vår bildtjänst och blir en AI-illustration. Det tar ungefär en minut.${kvar}`
      + '<span class="ai-val"><button type="button" class="knapp guld" id="ai-ja">Skapa bilden</button><button type="button" class="knapp" id="ai-nej">Inte nu</button></span>';
    fel.hidden = false; fel.classList.add('info');
    $('ai-ja').addEventListener('click', () => { aiBekraftat = true; fel.hidden = true; skapaAi(test); });
    $('ai-nej').addEventListener('click', () => { fel.hidden = true; });
    return;
  }
  aiArbetar = true; skrivAi();
  fel.hidden = true;
  const andring = lage === 'andring';
  $('arbetar-rubrik').textContent = lage === 'lokal' ? 'Bilden sätts ihop igen …' : andring ? 'Ändringen läggs in i samma bild …' : 'Uterummet byggs på ditt foto …';
  $('arbetar-text').textContent = lage === 'lokal' ? 'Det tar några sekunder.' : 'Det tar oftast omkring en minut.';
  arbetarEl.hidden = false;
  // stapeln kryper hela vägen mot slutet, aldrig stilla (granskningen: den stod på 92 % från 32 s)
  const t0 = Date.now(), stapel = $('stapel');
  const tick = setInterval(() => stapel.style.setProperty('--p', (97 * (1 - Math.exp(-(Date.now() - t0) / 45000))).toFixed(1) + '%'), 500);
  try {
    if (lage === 'lokal') { await nyttLokalt(); return; }
    const u = underlag(andring);
    const fd = new FormData();
    fd.set('val', JSON.stringify(u.val));
    if (andring) { fd.set('andring', '1'); fd.set('fore', JSON.stringify(u.fore.val)); }
    else fd.set('skiss', '1');
    fd.set('bild', await new Promise((ok) => u.skickas.bild.toBlob(ok, 'image/jpeg', 0.9)), andring ? 'forra-bilden.jpg' : 'hus-med-skiss.jpg');
    const aiUrl = test || await korAi(fd, u);
    stapel.style.setProperty('--p', '100%');
    await nyVersion(aiUrl, u, test);
    visaToast((andring ? 'Ändringen är inlagd i samma bild. Dra i bilden för att jämföra med huset i dag.'
      : 'Klart. Dra i bilden för att jämföra med huset i dag.') + kvarText());
  } catch (e) {
    console.error('skapa AI-bild', e);
    fel.innerHTML = e.message === 'tidsgrans'
      ? 'Bilden blev inte klar på tio minuter. Den kan bli klar senare: <button type="button" class="knapp guld" id="hamta-igen" style="margin-top:8px">Hämta bilden igen</button>'
      : (FEL_AI[e.message] || FEL_AI.misslyckades) + (e.message === 'skiss' ? kvarText() : '');
    fel.hidden = false;
    if (e.message === 'tidsgrans') $('hamta-igen').addEventListener('click', hamtaVantande);
  } finally {
    clearInterval(tick); arbetarEl.hidden = true; stapel.style.setProperty('--p', '0%');
    aiArbetar = false; skrivAi(); ritaVersioner();
  }
}
/* En bild som tog för lång tid: vänta in samma jobb igen, utan nytt anrop. */
async function hamtaVantande() {
  if (!AI_BILD || !vantar || aiArbetar) return;
  const { id, underlag: u } = vantar, fel = $('ai-fel');
  aiArbetar = true; fel.hidden = true; arbetarEl.hidden = false; skrivAi();
  $('arbetar-rubrik').textContent = 'Bilden hämtas …'; $('arbetar-text').textContent = 'Vi väntar in bildtjänsten.';
  try {
    const s = await vantaPa(id);
    if (s.status === 'tidsgrans') throw new Error('tidsgrans');
    if (s.status !== 'completed' || !s.url) throw new Error('misslyckades');
    vantar = null;
    await nyVersion(s.url, u, null);
  } catch (e) {
    fel.innerHTML = e.message === 'tidsgrans' ? 'Bilden är fortfarande inte klar. <button type="button" class="knapp guld" id="hamta-igen" style="margin-top:8px">Försök igen</button>' : FEL_AI[e.message] || FEL_AI.misslyckades;
    fel.hidden = false;
    if (e.message === 'tidsgrans') $('hamta-igen').addEventListener('click', hamtaVantande);
  } finally { arbetarEl.hidden = true; aiArbetar = false; skrivAi(); ritaVersioner(); }
}
$('skapa-ai').addEventListener('click', () => skapaAi());
$('visa-ai').addEventListener('click', () => { if (aiVisas) visaSkissen(); else visaVersion(visad); });
$('delning').addEventListener('input', (e) => jmfEl.style.setProperty('--delning', e.target.value + '%'));
/* Utan AI-bilden finns knapparna, bildremsan, jämförelsen och väntrutan inte i
   sidan alls (inte bara dolda), så ingen text om bilden står kvar. */
if (!AI_BILD) for (const id of ['skapa-ai', 'visa-ai', 'spara-ai', 'ai-sek', 'jmf', 'arbetar']) $(id)?.remove();

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
  /* Designen på högst tre rader innan fälten (kundloopen: 10–14 rader). Hela designen,
     vad som ingår och tillvalen följer med förfrågan. */
  const till = tillvalLista();
  const formText = lutande() ? `${FORM[S.form].toLowerCase()} ${S.lut}°` : FORM[S.form].toLowerCase();
  $('designrad').innerHTML = `<p class="d1">Din design: <b>${dec(S.b, 2)} × ${dec(S.d, 2)} m</b> · höjd ${dec(S.h, 2)} m · ${formText} · ${TAK[S.tak].toLowerCase()}</p>`
    + `<p class="d2${pris ? ' en' : ''}">${till.length ? `${till.length} tillval: <b>${till.map((r) => r.kort).join(', ')}</b>` : 'Tillval: <b>inga</b>'}</p>`
    + (pris ? `<p class="d1">${PRISLAGE === 'exempel' ? 'Exempelpris' : 'Uppskattat pris'}: <b>${kronor(pris.total)}</b>${PRISLAGE === 'exempel' ? ' (exempelpriser – inte Alltfix priser)' : ' (slutpris efter hembesök)'}</p>` : '')
    + (bokningsBild() ? `<p class="d1">${bokningsBild().aktuell ? 'Din fotorealistiska bild följer med.' : 'En fotorealistisk bild av en tidigare version följer med.'}</p>` : '');
  form.hidden = false; kvitto.hidden = true; formfel.hidden = true;
  modal.hidden = false;
  setTimeout(() => form.querySelector('input[name="namn"]').focus(), 30);
}
/* AI-bilden som följer med bokningen, och om den hör till designen just nu
   (granskningen: bokningen skickade en bild av en tidigare design, också från 3D-läget). */
function bokningsBild() {
  if (!AI_BILD || !aiBildUrl) return null;
  return { url: aiBildUrl, aktuell: foto.aktiv && aiLage() === 'samma' };
}
/* Länken i bokningen öppnar 3D direkt: Alltfix har inte kundens foto, och en
   länk med placering öppnar första skärmen som ber om fotot (granskningen). */
function bokningsLankar() {
  const p = hashParametrar(), bas = location.origin + location.pathname;
  const tre = new URLSearchParams(p); for (const k of ['fp', 'kh', 'tf', 'fv']) tre.delete(k);
  return { lank: `${bas}#${tre}`, foto: p.has('fp') ? `${bas}#${p}` : null };
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
    data.set('design', sammanfattning(false) + (foto.aktiv ? ' · lagt på kundens eget foto (fotot följer inte med)' : ` · fronten mot ${RIKT_ORD[S.rikt]}`));
    /* AI-bilden: bildtjänstens egen bild. Den är inte den ihopsatta bilden kunden
       ser (kundens foto runt rummet och märkningen görs i webbläsaren), och det står i fältet. */
    const bb = bokningsBild();
    if (bb) data.set('ai_bild', `${bb.url} (AI:ns egen bild av uterummet, utan kundens foto runt rummet och utan märkningen${bb.aktuell ? '' : '. Bilden är av en tidigare version av designen'})`);
    data.set('ingar', ingarLista().join(', '));
    data.set('tillval', tillvalText(tillvalLista()));
    if (pris) {
      const prisText = `${kronor(pris.total)}${PRISLAGE === 'exempel' ? ' (exempelpriser, inte Alltfix priser)' : ''}`;
      data.set('pris', prisText + ': ' + pris.rader.map((r) => `${r.text} ${kronor(r.kr)}`).join(', '));
    } else data.set('pris', 'Priset tas fram vid hembesöket');
    const lankar = bokningsLankar();
    data.set('lank', lankar.lank);
    if (lankar.foto) data.set('lank_med_placering', `${lankar.foto} (samma placering om samma foto väljs)`);
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
    { form: 'plant', tak: 'kanalplast', nat: true, tid: 15 }, { form: 'plant', tak: 'takpapp', nat: true, tid: 22.5 },
    { form: 'pulpet', tak: 'kanalplast', golv: 'parkett', nat: true, tid: 15 }, { form: 'pulpet', tak: 'kanalplast', golv: 'parkett', nat: true, tid: 22.5 },
    { form: 'sadel', tak: 'kanalplast', golv: 'klinker', nat: true, tid: 15 }, { form: 'sadel', tak: 'kanalplast', golv: 'klinker', nat: true, tid: 22.5 },
    { form: 'pulpet', tak: 'takpannor', lut: 20, nat: true, tid: 15 },
    // täta väggar, insidorna och guldskimret över vald vägg
    { form: 'pulpet', tak: 'takpapp', vv: 'tra', vf: 'fasad', insida: 'parlspont', nat: true, tid: 15, markerad: 'vf' },
    { form: 'sadel', tak: 'takpannor', vf: 'tra', insida: 'tra', tid: 22.5, markerad: 'vv' },
    // fotolägets fasadvägg (husets färg ur fotot) med sockeln: första trycket frös annars sidan i 2,4 s (granskningen 2026-09-29)
    { form: 'pulpet', tak: 'takpapp', vv: 'fasad', vh: 'fasad', vf: 'tra', tid: 15, fotoFasad: true },
  ];
  const l = vyLage('ute');
  kamera.position.copy(l.pos); kontroller.target.copy(l.mal); kamera.lookAt(l.mal);
  // fotolägets skuggfångare kompileras med, osynliga i bilden men inte för compile
  fotoSkugga.visible = true;
  for (const { markerad: mk, fotoFasad: ff, ...k } of kombinationer) {
    Object.assign(S, k); markerad = mk || null; foto.aktiv = !!ff; byggRum(); sattSol();
    renderare.compile(scen, kamera);
    renderare.render(scen, kamera);
  }
  foto.aktiv = false;
  fotoSkugga.visible = false;
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
// ingen nyp-zoom av hela sidan (Safari följer inte touch-action på sidan)
for (const ev of ['gesturestart', 'gesturechange']) document.addEventListener(ev, (e) => e.preventDefault(), { passive: false });
/* Första skärmen: ett foto av huset, exempelhuset eller 3D. En delad länk
   från 3D-läget öppnas direkt i 3D, som förut. */
visaLageKnappar();
if (sidlage === 'start') visaStart();
const klar = () => $('laddar').classList.add('klar');
(document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(() => setTimeout(klar, 150));

/* Testkrok för granskningen: läs läget och vikten utan att gissa. */
// en kapad rad i sammanfattningen fälls ut med ett tryck (hela listan står också i steget Tillval)
for (const rad of document.querySelectorAll('.summering .sum-rad')) rad.addEventListener('click', () => rad.classList.toggle('hel'));

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
  /* Stegen: fas('tak') visar steget Tak; fasNu() säger vilket som syns. */
  fas: (f) => visaFas(f),
  fasNu: () => fas,
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
  synka: () => { if (kontroller.enabled) kontroller.update(); renderare.render(scen, kamera); if (takInsetSyns()) ritaTakInset(); placeraEtiketter(); placeraPunkter(); const gl = renderare.getContext(); const px = new Uint8Array(4); gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px); return true; },
  /* Var hamnar rummets hörn på duken, jämfört med den fria ytan? */
  ram: () => { const l = projiceradLada(rumHorn()); return { rum: [l.x0, l.y0, l.x1, l.y1].map(Math.round), fri: friYta(), hinder: hinder().map((r) => [r.x0, r.y0, r.x1, r.y1].map(Math.round)) }; },
  /* ---------- fotoläget ----------
     sidlage(): 'start', '3d' eller 'foto'. exempel(): läser in exempelhuset som
     knappen gör. foto(): läget, med punkterna A, B och horisonten H i andelar
     av fotot. placera([ax, ay], [bx, by], hy): punkterna och horisonten direkt,
     som tre drag. punktSkarm('A' | 'B' | 'H'): var punkten står på skärmen, för
     riktiga drag med musen. */
  sidlage: () => sidlage,
  exempel: async () => { const r = await fetch('./exempel-hus.jpg'); await lasFoto(await r.blob(), { exempel: true }); return sidlage; },
  /* Ett eget foto som filväljaren läser det (EXIF och allt), ur en adress. */
  lasFoto: async (src) => { const r = await fetch(src); await lasFoto(await r.blob()); return { fov: foto.fov, exif: foto.exif, w: foto.w, h: foto.h }; },
  valj3D: () => valj3D(),
  visaStart: () => visaStart(),
  foto: () => ({ aktiv: foto.aktiv, vy, w: foto.w, h: foto.h, kvot: foto.kvot, fov: +fotoFov().toFixed(2),
    lage: Object.fromEntries(Object.entries(foto.lage).map(([k, v]) => [k, +(k === 'lutning' || k === 't' ? v / D2R : v).toFixed(3)])),
    punkter: fotoPunkter(), placering: placeraPa, ljus: { ...foto.ljus }, nyckel: placeringsNyckel(), bekraftad: foto.bekraftad, exif: foto.exif,
    takfot: foto.takfot, takfotHojd: takfotHojd(), dorr: foto.dorr, dorrMatt: foto.dorrMatt, varningar: fotoVarningar(),
    info: $('foto-kamera').textContent, lapp: fotoLapp.hidden ? null : fotoLapp.textContent }),
  placera: (a, b, hy, h = foto.lage.h) => { const ok = tillampaPlacering(lageFranPunkter(a, b, hy == null ? foto.lage.lutning : lutningAv(hy), h, 'A')); if (ok) { foto.bekraftad = true; byggKo = false; byggRum(); fotoKamera(); provFasad(); uppdateraSkuggor(); skrivHash(); skrivFotoInfo(); } return ok; },
  /* Läget direkt, i meter och grader (t och lutning), för att återskapa en granskares placering. */
  sattLage: (l) => { sattFotoLage({ ...l, lutning: (l.lutning || 0) * D2R, t: (l.t || 0) * D2R }); foto.bekraftad = true; byggKo = false; byggRum(); fotoKamera(); provFasad(); uppdateraSkuggor(); return fotoPunkter(); },
  kameraHojd: (h) => sattKameraHojd(h),
  /* Horisonten ur väggens linjer för väggens fot A–B (andelar), som i det andra draget. */
  horisontUrVagg: (a, b, skala = null, logg = false) => { horisontLogg = logg ? [] : null; const hy = horisontUrVagg(a, b, skala); const l = horisontLogg; horisontLogg = null; return logg ? { hy, l, kanter: foto.litet && foto.litet.w } : hy; },
  takfot: (tf) => { foto.takfot = tf; fotoKamera(); uppdateraText(); skrivFotoInfo(); return { hojd: takfotHojd(), over: overTakfot(), varn: fotoVarningar() }; },
  dorr: (fot, topp, hojd = 2.1) => { foto.dorr = { fot, topp, hojd }; const h = hojdUrDorr(); if (h) { foto.dorrMatt = true; sattKameraHojd(h, true); } return h; },
  varningar: () => fotoVarningar(),
  punktSkarm: (k) => { const r = handtag[k].getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; },
  placering: (pa) => sattPlacering(pa),
  fotoLjus: (az, mulet = foto.ljus.mulet) => { foto.ljus.az = az; foto.ljus.mulet = mulet; $('ljus').value = az; fyll($('ljus')); $('mulet').checked = mulet; sattFotoLjus(); },
  /* Steg 2: somBild() som storlek och typ, mask(del) som andel vita pixlar och
     ruta [x0, y0, x1, y1] i andelar; bildUrl(del) som data-URL för granskning
     ('foto' ger somBild). */
  somBild: async () => { const b = await somBild(); return { byte: b.size, typ: b.type }; },
  mask: (del) => {
    const c = mask(del), w = c.width, h = c.height, d = c.getContext('2d').getImageData(0, 0, w, h).data;
    let n = 0, x0 = w, y0 = h, x1 = -1, y1 = -1;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (d[(y * w + x) * 4] > 127) { n++; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    return { andel: +(n / (w * h)).toFixed(4), ruta: n ? [x0 / w, y0 / h, x1 / w, y1 / h].map((v) => +v.toFixed(3)) : null, w, h };
  },
  bildUrl: async (del = 'foto') => {
    if (del !== 'foto') return mask(del).toDataURL('image/png');
    const b = await somBild();
    return new Promise((ok) => { const r = new FileReader(); r.onload = () => ok(r.result); r.readAsDataURL(b); });
  },
  fotoVal: () => fotoVal(),
  /* Den fotorealistiska bilden: ai() läget; skapaAi(test) kör hela kedjan, och
     med en bild-adress som test används den i stället för bildtjänstens svar
     (inget anrop). versionBild(i, ren) ger versionens bild som data-URL
     (ren: utan märkningen). visaVersion(i) som ett tryck i remsan. */
  ai: () => ({ antal: versioner.length, visad, aiVisas, arbetar: aiArbetar, lage: aiLage(), kvar: aiKvar, bildUrl: aiBildUrl,
    knapp: !$('skapa-ai') || $('skapa-ai').hidden ? null : $('skapa-ai').textContent.trim(), visaKnapp: !$('visa-ai') || $('visa-ai').hidden ? null : $('visa-ai').textContent.trim(),
    spara: !!$('spara-ai') && !$('spara-ai').hidden, fel: $('ai-fel').hidden ? null : $('ai-fel').textContent,
    versioner: versioner.map((v) => ({ text: versionsText(v.val), ai: v.ai.slice(0, 120), nyckel: v.nyckel })),
    delar: versioner[visad] ? andradeDelar(versioner[visad].design) : null, kontroll: senasteKontroll, vantar: vantar ? vantar.id : null,
    start: versioner[visad] ? versioner[visad].start : null, fil: $('spara-ai')?.download ?? null, pa: AI_BILD }),
  /* Granskningen: sätt ihop också när AI:ns rum inte stämmer med skissen, för att se varför. */
  aiUtanKontroll: (pa = true) => { aiUtanKontroll = pa; return pa; },
  rensaPensel: () => { rensaPensel(); skrivAi(); return true; },
  /* Förgrunden som sidan hittat själv och kunden målat, som PNG-adress (vitt = framför rummet). */
  forgrundBild: () => { const t0 = performance.now(); beraknaAuto(); window.__autoMs = +(performance.now() - t0).toFixed(1); const c = forgrundKanvas(); return c ? c.toDataURL('image/png') : null; },
  /* Bilden som skickas: utfylld till bildtjänstens format, fotots ruta i den, och valen. */
  skickas: () => { const t = tillFormat(skissKanvas()); return { w: t.bild.width, h: t.bild.height, ruta: t.ruta, val: fotoVal(t.ruta, t.kvot) }; },
  sattFov: (v) => { foto.fov = v; fotoKamera(); ritaNu(); return foto.fov; },
  /* Förgrundspenseln: stryk(punkter) målar en linje genom punkterna (andelar av fotot). */
  pensel: (pts, sudd = false) => { const c = penselKanvas(), g = c.getContext('2d'); g.globalCompositeOperation = sudd ? 'destination-out' : 'source-over'; g.strokeStyle = '#fff'; g.lineWidth = c.width * 0.044; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); pts.forEach(([x, y], i) => (i ? g.lineTo(x * c.width, y * c.height) : g.moveTo(x * c.width, y * c.height))); g.stroke(); g.globalCompositeOperation = 'source-over'; penselNr++; ritaForgrund(); skrivAi(); return penselNr; },
  skapaAi: async (test = null) => { await skapaAi(test); return versioner.length; },
  versionBild: (i, ren = false) => (ren ? versioner[i].ren.toDataURL('image/png') : new Promise((ok) => {
    const im = new Image(); im.onload = () => { const c = kanvas(im.naturalWidth, im.naturalHeight); c.getContext('2d').drawImage(im, 0, 0); ok(c.toDataURL('image/png')); }; im.src = versioner[i].url;
  })),
  visaVersion: (i) => visaVersion(i),
  skissBild: () => skissKanvas().toDataURL('image/png'),
  klar: true,
};
