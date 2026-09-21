import * as THREE from 'three';
import { OrbitControls } from './vendor/OrbitControls.js';

/* ============================================================
   HAVEN — interaktiv 3D-planlosning.
   Geometrin ar med flit dum: lador och plan. Varde sitter i
   navigering och interaktion, inte i polygoner (briefens ledtrad).
   Siffrorna som styr rorelsen kommer ur bar.md bredvid.
   ============================================================ */

const KAMERA_MS = 900;    // mekanism 1: golv 700, tak 1100
const INTRO_MS  = 1200;   // mekanism 3: en enda rorelse vid laddning
const VH        = 2.5;    // ytterväggshojd
const VH_INRE   = 1.05;   // innervagg, kapad sa man ser NER i varje rum
const TJOCK     = 0.12;   // vaggtjocklek

/* ---------- rummen ----------
   Rektanglar som kaklar bottenplattan exakt. Ytorna raknas ur
   geometrin, aldrig ur en siffra nagon skrivit for hand. */
const RUM = [
  // bottenvaning
  { id:'wc',      namn:'WC',          v:0, x0:0,   x1:1.8, z0:0,   z1:3.3, golv:'kakelvat',
    text:'A practical ground-floor cloakroom just off the hall.' },
  { id:'hall',    namn:'Hall',        v:0, x0:1.8, x1:4.6, z0:0,   z1:3.3, golv:'stenljus',
    text:'The entrance hall, with stairs rising to the first floor.' },
  { id:'dining',  namn:'Dining',      v:0, x0:4.6, x1:8.2, z0:0,   z1:3.3, golv:'tra',
    text:'A dining area that opens onto the living space, with a window to the street.' },
  { id:'kitchen', namn:'Kitchen',     v:0, x0:0,   x1:4.0, z0:3.3, z1:7.1, golv:'kakel',
    text:'An open kitchen with an island, fitted units and a view over the garden.' },
  { id:'living',  namn:'Living Room', v:0, x0:4.0, x1:8.2, z0:3.3, z1:7.1, golv:'tra',
    text:'A bright and spacious living area with floor-to-ceiling doors opening onto the garden.' },
  // overvaning
  { id:'bed2',    namn:'Bedroom 2',   v:1, x0:0,   x1:3.4, z0:0,   z1:3.3, golv:'matta',
    text:'A double bedroom overlooking the street, with built-in storage.' },
  { id:'landing', namn:'Landing',     v:1, x0:3.4, x1:5.4, z0:0,   z1:3.3, golv:'stenljus',
    text:'The first-floor landing, connecting all three bedrooms and the bathroom.' },
  { id:'bath',    namn:'Bathroom',    v:1, x0:5.4, x1:8.2, z0:0,   z1:3.3, golv:'kakelvat',
    text:'The family bathroom, with a bath, walk-in shower and heated floor.' },
  { id:'bed1',    namn:'Bedroom 1',   v:1, x0:0,   x1:4.4, z0:3.3, z1:7.1, golv:'matta',
    text:'The principal bedroom, running the full width of the garden side of the house.' },
  { id:'bed3',    namn:'Bedroom 3',   v:1, x0:4.4, x1:8.2, z0:3.3, z1:7.1, golv:'matta',
    text:'A third bedroom, equally suited as a study or nursery.' },
];
const TRADGARD = { id:'garden', namn:'Garden', v:0, x0:0, x1:8.2, z0:7.1, z1:11.8, golv:'gras',
  text:'A private landscaped garden with a paved terrace directly off the living room.' };

const HUS = { x0:0, x1:8.2, z0:0, z1:7.1 };
const MITT = new THREE.Vector3((HUS.x0+HUS.x1)/2, 0, (HUS.z0+HUS.z1)/2);

const area  = r => (r.x1-r.x0) * (r.z1-r.z0);
const centrum = (r, y=0) => new THREE.Vector3((r.x0+r.x1)/2, y, (r.z0+r.z1)/2);
const YTA_TOT = RUM.reduce((s,r) => s + area(r), 0);

/* ---------- scen ---------- */
const scen = new THREE.Scene();
const renderare = new THREE.WebGLRenderer({ antialias:true, powerPreference:'high-performance' });
renderare.shadowMap.enabled = true;
renderare.shadowMap.type = THREE.PCFShadowMap;   // PCFSoft kostar manga texturuppslag/pixel
renderare.shadowMap.autoUpdate = false;          // huset och solen star stilla
renderare.toneMapping = THREE.ACESFilmicToneMapping;
renderare.toneMappingExposure = 1.05;
document.getElementById('scen').appendChild(renderare.domElement);

const kamera = new THREE.PerspectiveCamera(38, 1, 0.1, 200);
const kontroller = new OrbitControls(kamera, renderare.domElement);
kontroller.enableDamping = true;
kontroller.dampingFactor = 0.075;
kontroller.minDistance = 4;
kontroller.maxDistance = 34;
kontroller.maxPolarAngle = Math.PI * 0.49;   // aldrig under marken
kontroller.enablePan = false;                // panorering tappar bort folk i en dollhouse

/* Helvyn. Mekanism 5: modellen ska ta ca 50% av bildbredden, med
   marginal runt om. Hojd vinkel (48 grader) sa man ser NER i rummen
   i stallet for att mota bortre vaggarnas utsidor. Malet ar hela
   tomtens mittpunkt, inte husets: annars hamnar tradgarden utanfor. */
const TOMT_MITT = new THREE.Vector3(4.1, 0, 4.85);
const HUS_RADIE  = 6.0;    // halva husets diagonal, plus lite luft
const TOMT_RADIE = 8.3;    // hus + tradgard + gata

/* En inramningsregel i stallet for gissade avstand.
   Rakna ut hur langt bort kameran maste sta for att en sfar med given
   radie ska rymmas i bilden med marginal. Anvander det SMALASTE
   synfaltet, sa regeln haller aven pa mobil dar bilden ar smal —
   det var dar modellen tidigare skar ut mot kanterna. */
function avstandForRadie(radie, marginal) {
  const vFov = kamera.fov * Math.PI / 180;
  const hFov = 2 * Math.atan(Math.tan(vFov / 2) * kamera.aspect);
  return (radie * marginal) / Math.sin(Math.min(vFov, hFov) / 2);
}
/* Samma anflygningsriktning overallt: da vet man var man hamnade. */
const RIKT = new THREE.Vector3(0.52, 0.86, 0.62).normalize();

const HELVY = { pos: new THREE.Vector3(), mal: TOMT_MITT.clone() };
function raknaHelvy() {
  HELVY.mal.copy(TOMT_MITT);
  HELVY.pos.copy(TOMT_MITT).add(RIKT.clone().multiplyScalar(avstandForRadie(TOMT_RADIE, 1.18)));
}

/* ============================================================
   RIKTIG INRAMNING.
   Sfarformeln ovan racker bara i startvyn: den vet inget om att
   rumspanelen tar 320 px till hoger, att listningen tar 330 px till
   vanster och att knappraden ater av underkanten. Resultatet blev
   att modellen skar ut i kanten eller gomde sig bakom panelen i
   atta av nio lagen.
   Har projiceras modellens atta horn i stallet, och avstandet sok's
   fram tills allt ligger innanfor den FRIA ytan. Kors bara vid
   lagesbyte, aldrig per bildruta.
   ============================================================ */
const _box = new THREE.Box3();
const _horn = Array.from({ length: 8 }, () => new THREE.Vector3());

function synligLada() {
  scen.updateMatrixWorld(true);   // annars mats en foraldrad lada
  _box.makeEmpty();
  for (const g of vaningar) if (g.visible) _box.expandByObject(g);
  if (utegrupp.visible) _box.expandByObject(utegrupp);
  if (_box.isEmpty()) _box.setFromCenterAndSize(TOMT_MITT, new THREE.Vector3(8, 3, 12));
  const mn = _box.min, mx = _box.max;
  let i = 0;
  for (const x of [mn.x, mx.x]) for (const y of [mn.y, mx.y]) for (const z of [mn.z, mx.z])
    _horn[i++].set(x, y, z);
  return _horn;
}

/* Den fria ytan: hela duken minus det chromet faktiskt tacker. */
function friYta() {
  const el = renderare.domElement;
  const b = el.clientWidth, h = el.clientHeight;
  const bred = b > 860;
  const panelPa = !panel.hidden;
  return {
    x0: bred ? 352 : 22,
    x1: b - (bred ? (panelPa ? 372 : 48) : 22),
    y0: bred ? 108 : 16,
    y1: h - (bred ? 138 : 64),
  };
}

function passaAvstand(mal, riktning, egnaHorn) {
  const horn = egnaHorn || synligLada();
  const y = friYta();
  const el = renderare.domElement;
  const b = el.clientWidth, h = el.clientHeight;
  const sparaPos = kamera.position.clone(), sparaQ = kamera.quaternion.clone();

  const ryms = d => {
    kamera.position.copy(mal).add(riktning.clone().multiplyScalar(d));
    kamera.lookAt(mal);
    kamera.updateMatrixWorld(true);
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    for (const p of horn) {
      const q = p.clone().project(kamera);
      const sx = (q.x * 0.5 + 0.5) * b, sy = (-q.y * 0.5 + 0.5) * h;
      if (sx < x0) x0 = sx; if (sx > x1) x1 = sx;
      if (sy < y0) y0 = sy; if (sy > y1) y1 = sy;
    }
    return x0 >= y.x0 && x1 <= y.x1 && y0 >= y.y0 && y1 <= y.y1;
  };

  let lo = 6, hi = 70;
  if (!ryms(hi)) hi = 90;
  for (let i = 0; i < 20; i++) {
    const d = (lo + hi) / 2;
    if (ryms(d)) hi = d; else lo = d;
  }
  kamera.position.copy(sparaPos); kamera.quaternion.copy(sparaQ);
  kamera.updateMatrixWorld(true);
  return hi;
}
/* Ger ett kameralage som garanterat ryms i den fria ytan. */
function ramaIn(mal, riktning = RIKT, egnaHorn = null) {
  const d = passaAvstand(mal, riktning, egnaHorn);
  return { pos: mal.clone().add(riktning.clone().multiplyScalar(d)), mal: mal.clone() };
}
/* Hornen for EN lada i varlden, med marginal runt. */
function hornForLada(x0, y0, z0, x1, y1, z1) {
  const ut = [];
  for (const x of [x0, x1]) for (const y of [y0, y1]) for (const z of [z0, z1])
    ut.push(new THREE.Vector3(x, y, z));
  return ut;
}

/* ---------- material ----------
   Delas mellan alla meshar som kan dela dem: farre unika material
   = farre draw calls = jamnare bildfrekvens pa mobil. */
const M = {
  vagg:    new THREE.MeshStandardMaterial({ color:0xe8e4dd, roughness:0.94 }),
  vaggYtt: new THREE.MeshStandardMaterial({ color:0xb9b3a8, roughness:0.95 }),
  /* Fyra tydligt skilda golv: kok/vatrum, hall, parkett, sovrum.
     Trat var for orange och tog over hela bilden — dampat har. */
  tra:      new THREE.MeshStandardMaterial({ color:0x9c7342, roughness:0.62 }),  // parkett, morkare
  kakel:    new THREE.MeshStandardMaterial({ color:0xe6e4df, roughness:0.3 }),   // klinker, ljusast
  kakelvat: new THREE.MeshStandardMaterial({ color:0x9fb0b6, roughness:0.25 }),  // vatrum, tydligt kallare
  stenljus: new THREE.MeshStandardMaterial({ color:0x8f8a82, roughness:0.72 }),  // hall, morkt sten
  matta:    new THREE.MeshStandardMaterial({ color:0x8a7565, roughness:1.0 }),   // sovrum, varm matta
  gras:     new THREE.MeshStandardMaterial({ color:0x3f5c31, roughness:1.0 }),   // dampat
  hack:     new THREE.MeshStandardMaterial({ color:0x35502a, roughness:1.0 }),
  sten:    new THREE.MeshStandardMaterial({ color:0x8d8880, roughness:0.9 }),
  glas:    new THREE.MeshStandardMaterial({ color:0x9fc4d6, roughness:0.08, metalness:0.1,
                                            transparent:true, opacity:0.32 }),
  ram:     new THREE.MeshStandardMaterial({ color:0x2e2e2e, roughness:0.6 }),
  mobel:   new THREE.MeshStandardMaterial({ color:0xd9d4cb, roughness:0.85 }),
  mobel2:  new THREE.MeshStandardMaterial({ color:0x6f6a63, roughness:0.85 }),
  vit:     new THREE.MeshStandardMaterial({ color:0xf2f0ec, roughness:0.5 }),
  gron:    new THREE.MeshStandardMaterial({ color:0x3f6b34, roughness:1.0 }),
  stam:    new THREE.MeshStandardMaterial({ color:0x5a4634, roughness:1.0 }),
};
const BOX = new THREE.BoxGeometry(1,1,1);      // ateranvands till allt lador-aktigt
const box = (m, w,h,d, x,y,z) => {
  const o = new THREE.Mesh(BOX, m);
  o.scale.set(w,h,d); o.position.set(x,y,z);
  o.castShadow = true; o.receiveShadow = true;
  return o;
};

/* ---------- vaggar med oppningar ----------
   En vagg ar en linje fran A till B. Oppningar anges som stracka
   langs vaggen. Doerr gar till golvet, fonster har brostning och
   overstycke. Enklare an CSG och tillrackligt for en dollhouse. */
function vagg(grupp, ax, az, bx, bz, oppningar = [], ytter = false, hojd = VH) {
  const dx = bx-ax, dz = bz-az;
  const lang = Math.hypot(dx, dz);
  const vinkel = Math.atan2(dz, dx);
  const mat = ytter ? M.vaggYtt : M.vagg;
  const h = new THREE.Group();
  h.position.set(ax, 0, az);
  h.rotation.y = -vinkel;
  h.userData.arVagg = true;   // taggas har, inte gissas i efterhand

  const sorterade = [...oppningar].sort((a,b) => a.t0-b.t0);
  let t = 0;
  const bit = (t0, t1, y0, y1) => {
    if (t1-t0 < 0.02 || y1-y0 < 0.02) return;
    h.add(box(mat, t1-t0, y1-y0, TJOCK, (t0+t1)/2, (y0+y1)/2, 0));
  };
  for (const o of sorterade) {
    bit(t, o.t0, 0, hojd);                          // vaggen fore oppningen
    const oy0 = Math.min(o.y0, hojd), oy1 = Math.min(o.y1, hojd);
    if (oy0 > 0) bit(o.t0, o.t1, 0, oy0);           // brostning under fonster
    if (oy1 < hojd) bit(o.t0, o.t1, oy1, hojd);     // overstycke
    // glas och karm
    const g = new THREE.Mesh(BOX, M.glas);
    g.scale.set(o.t1-o.t0, Math.max(0.02, oy1-oy0), 0.04);
    g.position.set((o.t0+o.t1)/2, (oy0+oy1)/2, 0);
    if (!o.dorr && oy1 > oy0 + 0.05) h.add(g);
    if (o.dorr) {
      if (oy1 > 0.1) {
        h.add(box(M.ram, 0.06, oy1-oy0, TJOCK*1.1, o.t0+0.03, (oy0+oy1)/2, 0));
        h.add(box(M.ram, 0.06, oy1-oy0, TJOCK*1.1, o.t1-0.03, (oy0+oy1)/2, 0));
      }
    } else {
      h.add(box(M.ram, o.t1-o.t0, 0.05, TJOCK*1.05, (o.t0+o.t1)/2, oy0, 0));
      if (oy1 < hojd - 0.02) h.add(box(M.ram, o.t1-o.t0, 0.05, TJOCK*1.05, (o.t0+o.t1)/2, oy1, 0));
    }
    t = o.t1;
  }
  bit(t, lang, 0, hojd);
  grupp.add(h);
}
const DORR   = (t0,t1) => ({ t0, t1, y0:0,    y1:2.05, dorr:true });
const FONST  = (t0,t1) => ({ t0, t1, y0:0.95, y1:2.15 });
const GOLVDORR = (t0,t1) => ({ t0, t1, y0:0.02, y1:2.25 });   // golvdjupa partier

/* ---------- mobler ----------
   Igenkanning pa en sekund ar hela kravet. Ingen realism. */
function mobler(rum, g) {
  const c = centrum(rum);
  const w = rum.x1-rum.x0, d = rum.z1-rum.z0;
  const add = (...a) => g.add(box(...a));

  /* Soffa med rygg OCH armstod. En ensam lada laser inte som soffa —
     silhuetten ar det som gor rummet igenkannligt pa en sekund. */
  const soffa = (x, z, bred, vand) => {
    const s = new THREE.Group();
    s.add(box(M.mobel, bred, 0.34, 0.92, 0, 0.30, 0));          // sits
    s.add(box(M.mobel, bred, 0.52, 0.22, 0, 0.47, -0.35));      // rygg
    s.add(box(M.mobel, 0.22, 0.42, 0.92, -bred/2+0.11, 0.42, 0)); // armstod v
    s.add(box(M.mobel, 0.22, 0.42, 0.92,  bred/2-0.11, 0.42, 0)); // armstod h
    s.add(box(M.mobel2, bred-0.5, 0.12, 0.12, 0, 0.13, 0));     // sockel
    s.position.set(x, 0, z); s.rotation.y = vand || 0;
    g.add(s);
  };
  const stol = (x, z, vand=0) => {
    const st = new THREE.Group();
    st.add(box(M.mobel2, 0.42, 0.06, 0.42, 0, 0.45, 0));        // sits
    st.add(box(M.mobel2, 0.42, 0.48, 0.05, 0, 0.69, -0.19));    // rygg
    for (const [sx,sz] of [[-0.17,-0.17],[0.17,-0.17],[-0.17,0.17],[0.17,0.17]])
      st.add(box(M.mobel2, 0.04, 0.45, 0.04, sx, 0.22, sz));
    st.position.set(x, 0, z); st.rotation.y = vand;
    g.add(st);
  };

  switch (rum.id) {
    case 'kitchen': {
      // bankrad langs bortre vaggen, med skiva som skjuter ut
      add(M.mobel, w-0.6, 0.82, 0.6, c.x, 0.41, rum.z1-0.45);
      add(M.mobel2, w-0.6, 0.06, 0.66, c.x, 0.85, rum.z1-0.43);   // bankskiva
      add(M.vit, 0.7, 1.9, 0.64, rum.x0+0.45, 0.95, rum.z1-0.45); // kylskap
      add(M.ram, 0.7, 0.12, 0.5, c.x+0.6, 1.85, rum.z1-0.5);      // flakt
      // koksö med skiva
      add(M.mobel, 1.9, 0.82, 0.85, c.x+0.15, 0.41, c.z-0.2);
      add(M.mobel2, 2.05, 0.07, 1.0, c.x+0.15, 0.855, c.z-0.2);
      stol(c.x-0.45, c.z+0.5, Math.PI); stol(c.x+0.6, c.z+0.5, Math.PI);
      break;
    }
    case 'living': {
      add(M.mobel2, 2.5, 0.02, 1.7, c.x-0.1, 0.02, c.z+0.1);      // matta
      soffa(c.x-0.1, rum.z0+0.85, 2.3, 0);
      add(M.tra, 1.05, 0.08, 0.58, c.x-0.1, 0.38, c.z+0.15);      // soffbord skiva
      add(M.mobel2, 0.9, 0.34, 0.44, c.x-0.1, 0.17, c.z+0.15);
      add(M.mobel2, 1.7, 0.42, 0.42, c.x-0.1, 0.21, rum.z1-0.4);  // tv-bank
      add(M.ram, 1.3, 0.76, 0.06, c.x-0.1, 1.12, rum.z1-0.28);    // tv
      add(M.gron, 0.34, 0.5, 0.34, rum.x1-0.45, 0.6, rum.z0+0.45);// vaxt
      add(M.mobel, 0.3, 0.3, 0.3, rum.x1-0.45, 0.15, rum.z0+0.45);
      break;
    }
    case 'dining': {
      add(M.tra, 1.75, 0.07, 0.95, c.x, 0.75, c.z);               // bordsskiva
      for (const [sx,sz] of [[-0.75,-0.35],[0.75,-0.35],[-0.75,0.35],[0.75,0.35]])
        add(M.mobel2, 0.09, 0.72, 0.09, c.x+sx, 0.36, c.z+sz);
      stol(c.x-0.55, c.z-0.85, 0); stol(c.x+0.55, c.z-0.85, 0);
      stol(c.x-0.55, c.z+0.85, Math.PI); stol(c.x+0.55, c.z+0.85, Math.PI);
      add(M.ram, 0.3, 0.3, 0.3, c.x, 2.15, c.z);                  // taklampa
      break;
    }
    case 'hall': {
      for (let i=0;i<7;i++) add(M.stenljus, 1.05, 0.16, 0.26, rum.x0+0.75, 0.08+i*0.16, rum.z1-0.35-i*0.26);
      add(M.mobel2, 0.95, 0.75, 0.32, rum.x1-0.65, 0.38, rum.z0+0.28);
      add(M.gron, 0.26, 0.42, 0.26, rum.x1-0.65, 0.96, rum.z0+0.28);
      break;
    }
    case 'wc': {
      add(M.vit, 0.36, 0.4, 0.55, c.x+0.2, 0.2, rum.z1-0.55);
      add(M.vit, 0.34, 0.5, 0.2, c.x+0.2, 0.55, rum.z1-0.8);      // cistern
      add(M.mobel2, 0.62, 0.55, 0.36, c.x-0.25, 0.28, rum.z0+0.45);
      add(M.vit, 0.56, 0.1, 0.38, c.x-0.25, 0.6, rum.z0+0.45);    // tvattstall
      break;
    }
    case 'bath': {
      add(M.vit, 1.7, 0.5, 0.76, rum.x0+1.0, 0.25, rum.z1-0.55);  // badkar
      add(M.kakelvat, 1.55, 0.06, 0.62, rum.x0+1.0, 0.5, rum.z1-0.55);
      add(M.mobel2, 0.85, 0.5, 0.45, rum.x1-0.75, 0.55, rum.z0+0.42);
      add(M.vit, 0.9, 0.1, 0.48, rum.x1-0.75, 0.83, rum.z0+0.42); // handfat
      add(M.vit, 0.36, 0.4, 0.55, rum.x1-0.45, 0.2, c.z+0.45);
      add(M.glas, 0.05, 1.95, 1.0, rum.x0+0.12, 0.98, rum.z0+0.75);
      break;
    }
    case 'bed1': case 'bed2': case 'bed3': {
      const stor = rum.id === 'bed1';
      const bw = stor ? 1.65 : 1.3;
      const bz = c.z + 0.15;
      add(M.mobel2, bw+0.16, 0.85, 0.1, c.x, 0.43, bz-1.05);      // gavel
      add(M.mobel, bw, 0.32, 2.0, c.x, 0.26, bz);                 // madrass
      add(M.mobel2, bw-0.04, 0.12, 1.25, c.x, 0.46, bz+0.32);     // overkast
      add(M.vit, bw/2-0.08, 0.14, 0.42, c.x-bw/4, 0.49, bz-0.78); // kuddar
      add(M.vit, bw/2-0.08, 0.14, 0.42, c.x+bw/4, 0.49, bz-0.78);
      add(M.mobel2, 0.42, 0.42, 0.36, c.x-bw/2-0.32, 0.21, bz-0.8);
      if (stor) {
        add(M.mobel, 0.58, 2.0, 1.6, rum.x1-0.42, 1.0, rum.z0+1.15);  // garderob
        add(M.mobel2, 0.03, 1.9, 0.05, rum.x1-0.7, 1.0, rum.z0+1.15);
      } else {
        add(M.mobel, 0.5, 1.75, 0.95, rum.x1-0.38, 0.88, rum.z0+0.75);
      }
      break;
    }
    case 'landing': {
      for (let i=0;i<7;i++) add(M.stenljus, 1.05, 0.16, 0.26, rum.x0+0.75, 0.96-i*0.16, rum.z1-0.35-i*0.26);
      add(M.ram, 0.06, 0.9, 1.8, rum.x0+1.35, 0.45, rum.z1-1.1);  // racke
      break;
    }
  }
}

/* ---------- bygg en vaning ---------- */
const vaningar = [new THREE.Group(), new THREE.Group()];
const rumsYtor = new Map();     // id -> mesh som klickas och markeras

function byggVaning(vi) {
  const g = vaningar[vi];
  g.position.y = vi * VH;
  const lista = RUM.filter(r => r.v === vi);

  for (const r of lista) {
    // golv, ett plan per rum sa varje rum kan ha eget material och markeras
    const golv = new THREE.Mesh(
      new THREE.BoxGeometry(r.x1-r.x0, 0.08, r.z1-r.z0),
      M[r.golv].clone()
    );
    golv.position.set((r.x0+r.x1)/2, -0.04, (r.z0+r.z1)/2);
    golv.receiveShadow = true;
    golv.userData.rum = r;
    golv.userData.grund = golv.material.color.clone();
    g.add(golv);
    rumsYtor.set(r.id, golv);

    const mg = new THREE.Group();
    mg.userData.arMobel = true;
    mobler(r, mg);
    g.add(mg);
  }

  if (vi === 0) {
    // ytterväggar botten
    vagg(g, HUS.x0, HUS.z0, HUS.x1, HUS.z0, [DORR(2.4,3.3), FONST(5.0,6.6), FONST(0.5,1.3)], true);
    vagg(g, HUS.x1, HUS.z0, HUS.x1, HUS.z1, [FONST(1.0,2.4), FONST(4.4,6.2)], true);
    vagg(g, HUS.x1, HUS.z1, HUS.x0, HUS.z1, [GOLVDORR(0.9,3.6), FONST(5.4,7.0)], true);
    vagg(g, HUS.x0, HUS.z1, HUS.x0, HUS.z0, [FONST(1.2,2.6)], true);
    // innervaggar botten
    vagg(g, 1.8, 0, 1.8, 3.3, [DORR(1.2,2.1)], false, VH_INRE);
    vagg(g, 4.6, 0, 4.6, 3.3, [DORR(0.7,2.5)], false, VH_INRE);
    vagg(g, 0,   3.3, 8.2, 3.3, [DORR(1.9,2.8), DORR(5.0,6.8)]);
    vagg(g, 4.0, 3.3, 4.0, 7.1, [DORR(0.8,2.4)], false, VH_INRE);
  } else {
    vagg(g, HUS.x0, HUS.z0, HUS.x1, HUS.z0, [FONST(0.8,2.4), FONST(6.0,7.4)], true);
    vagg(g, HUS.x1, HUS.z0, HUS.x1, HUS.z1, [FONST(1.2,2.4), FONST(4.6,6.0)], true);
    vagg(g, HUS.x1, HUS.z1, HUS.x0, HUS.z1, [FONST(1.0,2.6), FONST(5.0,6.8)], true);
    vagg(g, HUS.x0, HUS.z1, HUS.x0, HUS.z0, [FONST(2.0,3.4)], true);
    vagg(g, 3.4, 0, 3.4, 3.3, [DORR(1.1,2.0)], false, VH_INRE);
    vagg(g, 5.4, 0, 5.4, 3.3, [DORR(1.1,2.0)], false, VH_INRE);
    vagg(g, 0,   3.3, 8.2, 3.3, [DORR(1.0,1.9), DORR(5.6,6.5)]);
    vagg(g, 4.4, 3.3, 4.4, 7.1, [], false, VH_INRE);
  }
  scen.add(g);
}
byggVaning(0);
byggVaning(1);

/* ---------- tradgard och mark ---------- */
const utegrupp = new THREE.Group();
{
  const t = TRADGARD;
  const gras = new THREE.Mesh(new THREE.BoxGeometry(t.x1-t.x0, 0.06, t.z1-t.z0), M.gras.clone());
  gras.position.set((t.x0+t.x1)/2, -0.03, (t.z0+t.z1)/2);
  gras.receiveShadow = true;
  gras.userData.rum = t;
  gras.userData.grund = gras.material.color.clone();
  utegrupp.add(gras);
  rumsYtor.set('garden', gras);

  utegrupp.add(box(M.sten, 8.2, 0.08, 2.0, 4.1, -0.01, 8.1));           // terrass
  const bank = new THREE.Group();
  bank.add(box(M.mobel, 2.1, 0.38, 0.8, 0, 0.2, 0));
  bank.add(box(M.mobel, 2.1, 0.45, 0.2, 0, 0.55, -0.3));
  bank.position.set(3.0, 0.04, 8.3);
  utegrupp.add(bank);
  utegrupp.add(box(M.mobel2, 0.9, 0.32, 0.9, 5.2, 0.2, 8.3));

  // Hack langs staketlinjen: bryter den platta grona rektangeln och
  // ger tomten en kant, som referensen har.
  utegrupp.add(box(M.hack, 8.2, 0.75, 0.42, 4.1, 0.37, 11.55));
  utegrupp.add(box(M.hack, 0.42, 0.7, 4.3, 0.24, 0.35, 9.5));
  utegrupp.add(box(M.hack, 0.42, 0.7, 4.3, 7.96, 0.35, 9.5));
  // rabatt mot terrassen
  utegrupp.add(box(M.hack, 2.6, 0.28, 0.5, 1.6, 0.14, 9.35));

  const trad = (x, z, s) => {
    const t2 = new THREE.Group();
    t2.add(box(M.stam, 0.16, 1.0, 0.16, 0, 0.5, 0));
    const krona = new THREE.Mesh(new THREE.SphereGeometry(0.62, 10, 8), M.gron);
    krona.position.y = 1.5; krona.castShadow = true;
    t2.add(krona);
    t2.position.set(x, 0, z); t2.scale.setScalar(s);
    utegrupp.add(t2);
  };
  trad(0.85, 10.9, 1.15); trad(7.3, 10.8, 1.0); trad(4.3, 11.2, 0.9); trad(7.6, 8.9, 0.8);

  // Staket: lagt och morkt. Hogre an sa tar det over helvyn och
  // laser som en brun platta runt tomten i stallet for en avgransning.
  const staket = (ax,az,bx,bz) => {
    const L = Math.hypot(bx-ax, bz-az);
    const s = box(M.stam, L, 0.95, 0.06, (ax+bx)/2, 0.475, (az+bz)/2);
    s.rotation.y = -Math.atan2(bz-az, bx-ax);
    utegrupp.add(s);
  };
  staket(0, 11.8, 8.2, 11.8); staket(0, 7.1, 0, 11.8); staket(8.2, 7.1, 8.2, 11.8);

}
scen.add(utegrupp);

/* ---------- ljus ---------- */
const himmel   = new THREE.HemisphereLight(0xdfe8f2, 0x4a4238, 1.0);
const sol      = new THREE.DirectionalLight(0xfff2dc, 2.4);
sol.position.set(9, 16, 4);
sol.castShadow = true;
sol.shadow.mapSize.set(1024, 1024);
sol.shadow.camera.left = -14; sol.shadow.camera.right = 16;
sol.shadow.camera.top = 18;   sol.shadow.camera.bottom = -6;
sol.shadow.camera.far = 46;
sol.shadow.bias = -0.0015;
scen.add(himmel, sol);

/* Nattlampor: en varm punkt per rum.
   De laggs INTE i scenen har. Ett ljus med intensitet 0 blir anda
   inkompilerat i shadern och rak'nas per bildpunkt — tio onodiga
   ljusberakningar for varje pixel, aven mitt pa dagen. De adderas
   och tas bort ur scenen i sattLjus() i stallet. */
const nattljus = [];
for (const r of RUM) {
  const p = new THREE.PointLight(0xffc98a, 0, 6.2, 2);
  p.position.copy(centrum(r, r.v*VH + 2.15));
  nattljus.push(p);
}

/* ---------- etiketter ---------- */
const etikettlager = document.getElementById('etiketter');
const etiketter = [];
for (const r of [...RUM, TRADGARD]) {
  const e = document.createElement('button');
  e.className = 'etikett';
  e.type = 'button';
  e.textContent = r.namn;
  e.addEventListener('click', ev => { ev.stopPropagation(); valjRum(r.id); });
  etikettlager.appendChild(e);
  etiketter.push({ el:e, rum:r });
}

/* ============================================================
   Kamerarorelse.
   En enda easing i hela prototypen (mekanism 1). easeInOutCubic
   ar monoton: den passerar aldrig malet och studsar tillbaka,
   vilket ar precis vad mekanism 4 forbjuder.
   ============================================================ */
/* Skuggkartan byggdes om varje bildruta trots att varken hus eller
   sol ror sig. Nu bara nar nagot faktiskt andrats. */
function uppdateraSkuggor() { renderare.shadowMap.needsUpdate = true; behovRitas = true; }
/* Rita bara nar nagot hant. En stillastaende scen malde 60 bilder i
   sekunden i onodan, vilket varmer telefonen tills den stryper sig. */
let behovRitas = true;
const ritaNu = () => { behovRitas = true; };

const easeInOutCubic = t => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2;

let tween = null;
function flytta(pos, mal, ms = KAMERA_MS, klar = null) {
  behovRitas = true;
  tween = {
    fp: kamera.position.clone(), fm: kontroller.target.clone(),
    tp: pos.clone(), tm: mal.clone(),
    t0: performance.now(), ms, klar,
  };
}
function uppdateraTween(nu) {
  // En fryst tween (t0 = Infinity) gav (nu - Infinity)/ms = -Infinity,
  // easingen returnerade NaN och kameran hamnade utanfor talomradet —
  // scenen slutade ritas helt. Filmremsan blev elva svarta rutor.
  if (!tween || !Number.isFinite(tween.t0)) return;
  const t = Math.min(1, (nu - tween.t0) / tween.ms);
  const e = easeInOutCubic(t);
  kamera.position.lerpVectors(tween.fp, tween.tp, e);
  kontroller.target.lerpVectors(tween.fm, tween.tm, e);
  if (t >= 1) {
    const k = tween.klar;
    tween = null;
    if (k) k();     // mekanism 2: panelen kommer forst nar kameran landat
  }
}

/* ---------- tillstand ---------- */
let valdtRum = null;
let aktuellVaning = 0;
let vy = '3d';
let ljuslage = 'dag';

function rumById(id) { return id === 'garden' ? TRADGARD : RUM.find(r => r.id === id); }

/* Rumsvyn ar en NARMARE dollhouse, inte en vy inifran rummet.
   Med lag vinkel hamnar kameran innanfor ytterväggarna och man ser
   tvarsnitt av vaggar i stallet for rummet. 47 grader hall'er den
   ovanfor vagghojden hela vagen in. */
/* Rumsvyn siktar om mot rummet men behaller HELA huset i bild.
   Fokus skapas genom att dampa ovriga rum, inte genom att zooma in
   tills huset skar ut genom alla fyra bildkanter. */
function rumsKamera(r) {
  const c = centrum(r, r.v * VH);
  const ute = r.id === 'garden';
  const m = ute ? 0.8 : 1.6;            // sa mycket granne som foljer med
  const horn = hornForLada(
    r.x0 - m, r.v * VH - 0.2, r.z0 - m,
    r.x1 + m, r.v * VH + (ute ? 2.2 : VH + 0.3), r.z1 + m
  );
  return ramaIn(c.clone().setY(c.y + (ute ? 0.2 : 0.8)), RIKT, horn);
}
/* Vaningsbyte ska landa i en HELVY av den vaningen, inte i ett rumslage. */
function vaningsKamera(v) {
  return ramaIn(new THREE.Vector3(MITT.x, v * VH + 0.4, MITT.z));
}

const SVART = new THREE.Color(0x0d0d0d);
function markera(id) {
  for (const [rid, mesh] of rumsYtor) {
    const pa = rid === id;
    // Det valda rummet behaller SITT EGET material och lyfts med varm
    // egenglod. Att farga om det mot guld gjorde gräsmattan senapsgul,
    // vilket i en bostadsannons laser som dod grasmatta.
    mesh.material.color.copy(mesh.userData.grund);
    if (!pa && id) mesh.material.color.lerp(SVART, 0.5);
    mesh.material.emissive.setHex(pa ? 0x3a2c0a : 0x000000);
  }
  ritaNu();
  for (const { el, rum } of etiketter) el.dataset.vald = rum.id === id ? '1' : '0';
  for (const c of document.querySelectorAll('.chip'))
    c.setAttribute('aria-pressed', c.dataset.rum === id ? 'true' : 'false');
}

const panel = document.getElementById('rumspanel');
function visaPanel(r) {
  document.getElementById('panel-titel').textContent = r.namn;
  document.getElementById('panel-namn').textContent = r.namn;
  document.getElementById('panel-matt').textContent =
    `${(r.x1-r.x0).toFixed(1)} m × ${(r.z1-r.z0).toFixed(1)} m`;
  document.getElementById('panel-area').textContent = `${area(r).toFixed(1)} m²`;
  document.getElementById('panel-text').textContent = r.text;
  ritaForhandsbild(r);
  panel.hidden = false;
  panelRekt = panel.getBoundingClientRect();
  document.getElementById('ljus').classList.add('flyttad');
}
function doljPanel() {
  panel.hidden = true;
  panelRekt = null;
  document.getElementById('ljus').classList.remove('flyttad');
}

function valjRum(id) {
  const r = rumById(id);
  if (!r) return;
  if (r.v !== aktuellVaning && id !== 'garden') byggVy(r.v);
  valdtRum = id;
  markera(id);                                  // mekanism 6: sker direkt
  const { pos, mal } = rumsKamera(r);
  flytta(pos, mal, KAMERA_MS, () => visaPanel(r));
}

function aterstallVy() {
  valdtRum = null;
  markera(null);
  doljPanel();
  const v = aktuellVaning === 1 ? vaningsKamera(1) : ramaIn(TOMT_MITT.clone());
  flytta(v.pos, v.mal);
}

/* ---------- forhandsbild i panelen ----------
   Renderas EN gang per val, aldrig per bildruta: en extra rendering
   pa ett klick kostar inget, en per bildruta halverar bildfrekvensen. */
const mal = new THREE.WebGLRenderTarget(400, 300);
const forhandsKamera = new THREE.PerspectiveCamera(55, 400/300, 0.1, 100);
const pixlar = new Uint8Array(400*300*4);
/* Inomhus finns inget studsljus i Three.js: solen blockeras av
   vaggarna och rummet blir nastan svart. Forhandsbilden lyfts darfor
   med himmelsljuset under sjalva renderingen — inte med en extra
   lampa i scenen, for en sadan kompileras in i ALLA ritprogram. */

function ritaForhandsbild(r) {
  const halvX = (r.x1 - r.x0) / 2, halvZ = (r.z1 - r.z0) / 2;
  const ute = r.id === 'garden';
  const c = centrum(r, r.v*VH + (ute ? 2.6 : 1.55));
  /* Kameran stod tidigare UTANFOR rummet och tittade rakt in i en
     vagg: avstandet rak'nades fran rummets mitt utan att kollas mot
     rummets kant. Nu star den i ett horn, innanfor vaggarna, och
     tittar diagonalt over golvet. */
  forhandsKamera.fov = ute ? 55 : 68;
  forhandsKamera.position.set(c.x + halvX*0.74, c.y, c.z + halvZ*0.74);
  forhandsKamera.lookAt(c.x - halvX*0.45, c.y - (ute ? 2.0 : 0.72), c.z - halvZ*0.45);
  forhandsKamera.updateProjectionMatrix();

  const varTaket = tak.visible; tak.visible = false;
  const varExp = renderare.toneMappingExposure;
  const varHim = himmel.intensity;
  const varHimFarg = himmel.color.getHex();
  /* En stark punktlampa vid kameran brande ut narmaste vaggen till rent
     vitt medan resten forblev mork. Ett mjukt, riktningslost fyllnadsljus
     lyfter hela rummet jamnt i stallet. */
  himmel.intensity = 1.5;
  himmel.color.setHex(0xffffff);
  renderare.toneMappingExposure = 1.0;

  renderare.setRenderTarget(mal);
  renderare.render(scen, forhandsKamera);
  renderare.readRenderTargetPixels(mal, 0, 0, 400, 300, pixlar);
  renderare.setRenderTarget(null);

  himmel.intensity = varHim;
  himmel.color.setHex(varHimFarg);
  renderare.toneMappingExposure = varExp;
  tak.visible = varTaket;

  const cv = document.getElementById('panel-bild');
  const ctx = cv.getContext('2d');
  const bild = ctx.createImageData(400, 300);
  for (let y = 0; y < 300; y++) {                  // WebGL raknar y nerifran
    const k = (299 - y) * 400 * 4;
    bild.data.set(pixlar.subarray(y*400*4, y*400*4 + 400*4), k);
  }
  ctx.putImageData(bild, 0, 0);
}

/* ---------- tak, bara for att kunna doljas ---------- */
const tak = new THREE.Group();
{
  const p = box(M.vaggYtt, HUS.x1-HUS.x0 + 0.3, 0.16, HUS.z1-HUS.z0 + 0.3, MITT.x, 2*VH + 0.08, MITT.z);
  tak.add(p);
  tak.visible = false;   // dollhouse: taket ar av fran borjan
}
scen.add(tak);

/* ---------- vyer ---------- */
function byggVy(v) {
  aktuellVaning = v;
  // Bara den vaning man tittar pa visas. Med bada synliga blev
  // ovanvaningen en hog lada dar bottenplanet skymde tradgarden.
  vaningar[0].visible = (v === 0);
  vaningar[1].visible = (v === 1);
  for (const b of document.querySelectorAll('.vaning'))
    b.setAttribute('aria-pressed', String(+b.dataset.vaning === v));
  for (const { el, rum } of etiketter)
    el.style.display = (rum.v === v || rum.id === 'garden') ? '' : 'none';
  nattljus.forEach((p, i) => { p.userData.aktiv = RUM[i].v === v; });
  uppdateraSkuggor();
  sattLjus(ljuslage);
}

/* Planvy: moblerna gar bort och vaggarna kryper ner till en fotad
   linje, sa det laser som en ritning i stallet for en modell uppifran. */
function sattVy(nyVy) {
  vy = nyVy;
  const plan = nyVy === 'plan';
  for (const b of document.querySelectorAll('.lage'))
    b.setAttribute('aria-pressed', String(b.dataset.vy === nyVy));

  /* En ritning utan mobler ar sex farglagda rektanglar. Rakt uppifran
     laser mobelladorna som siluetter — soffa, sang, koksbank — vilket
     ar precis vad en planritning ska visa. Vaggarna behaller sin hojd:
     uppifran blir de linjer, alltsa ritningens vaggar. */
  for (const g of vaningar)
    for (const c of g.children) {
      if (c.userData.arMobel) c.visible = true;
      if (c.userData.arVagg)  c.scale.y = 1;
    }
  utegrupp.visible = true;   // tradgarden hor till fastigheten aven pa ritningen
  tak.visible = false;
  sol.castShadow = !plan;   // skuggor syns inte i en ritning uppifran, men kostar
  if (!plan) uppdateraSkuggor();
  uppdateraSkuggor();
  kontroller.enableRotate = !plan;   // en ritning ska inte gå att vicka på

  if (plan) {
    /* Rakt uppifran ar up-vektorn tvetydig och Three valjer en
       godtycklig rotation — ritningen hamnade snedstalld 45 grader.
       Nord uppat ger en axelriktad ritning, som en ritning ska vara. */
    kamera.up.set(0, 0, -1);
    kontroller.object.up.set(0, 0, -1);
    const c = new THREE.Vector3(TOMT_MITT.x, 0, TOMT_MITT.z);
    const v = ramaIn(c, new THREE.Vector3(0, 1, 0));
    flytta(v.pos, v.mal);
  }
  else {
    kamera.up.set(0, 1, 0);
    kontroller.object.up.set(0, 1, 0);
    const v = ramaIn(TOMT_MITT.clone());
    flytta(v.pos, v.mal);
  }
}

function sattLjus(l) {
  ljuslage = l;
  const natt = l === 'natt';
  himmel.intensity = natt ? 0.16 : 1.0;
  himmel.color.setHex(natt ? 0x2a3550 : 0xdfe8f2);
  sol.intensity = natt ? 0.22 : 2.4;
  sol.color.setHex(natt ? 0x8fa8d8 : 0xfff2dc);
  sol.position.set(natt ? -8 : 9, natt ? 12 : 16, natt ? -6 : 4);
  scen.background = new THREE.Color(natt ? 0x0d0f14 : 0x181818);
  M.gras.color.setHex(natt ? 0x24331d : 0x4a6b3a);
  /* Ta UT lamporna ur scenen i dagslage. Att bara nollstalla dem
     tar inte bort kostnaden — de ligger kvar i ritprogrammet. */
  for (const p of nattljus) {
    const ska = natt && p.userData.aktiv !== false;
    if (ska && !p.parent) scen.add(p);
    else if (!ska && p.parent) scen.remove(p);
    p.intensity = ska ? 5.5 : 0;
  }
  renderare.toneMappingExposure = natt ? 1.25 : 1.05;
  uppdateraSkuggor();
  for (const b of document.querySelectorAll('.ljus button'))
    b.setAttribute('aria-pressed', String(b.dataset.ljus === l));
}

/* ---------- klick i scenen ---------- */
const raycaster = new THREE.Raycaster();
const pekare = new THREE.Vector2();
let nedPos = null;
renderare.domElement.addEventListener('pointerdown', e => { nedPos = { x:e.clientX, y:e.clientY }; });
renderare.domElement.addEventListener('pointerup', e => {
  if (!nedPos) return;
  const drog = Math.hypot(e.clientX-nedPos.x, e.clientY-nedPos.y) > 6;
  nedPos = null;
  if (drog) return;    // rotation ska inte rakna som ett rumsklick
  const r = renderare.domElement.getBoundingClientRect();
  pekare.x = ((e.clientX - r.left) / r.width) * 2 - 1;
  pekare.y = -((e.clientY - r.top) / r.height) * 2 + 1;
  raycaster.setFromCamera(pekare, kamera);
  const ytor = [...rumsYtor.values()].filter(m => m.parent.visible !== false);
  const traff = raycaster.intersectObjects(ytor, false)[0];
  if (traff) valjRum(traff.object.userData.rum.id);
});

/* ---------- chips och knappar ---------- */
const CHIPS = ['living','kitchen','dining','bed1','bath','garden'];
const chipsEl = document.getElementById('chips');
for (const id of CHIPS) {
  const r = rumById(id);
  const b = document.createElement('button');
  b.className = 'chip'; b.type = 'button'; b.dataset.rum = id;
  b.textContent = r.namn;
  b.setAttribute('aria-pressed', 'false');
  b.addEventListener('click', () => valjRum(id));
  chipsEl.appendChild(b);
}
document.getElementById('aterstall').addEventListener('click', aterstallVy);
document.getElementById('panel-stang').addEventListener('click', () => { doljPanel(); markera(null); valdtRum = null; });
for (const b of document.querySelectorAll('.vaning'))
  b.addEventListener('click', () => { byggVy(+b.dataset.vaning); aterstallVy(); });
for (const b of document.querySelectorAll('.lage'))
  b.addEventListener('click', () => sattVy(b.dataset.vy));
for (const b of document.querySelectorAll('.ljus button'))
  b.addEventListener('click', () => sattLjus(b.dataset.ljus));

/* ---------- listningssiffror, raknade ur geometrin ---------- */
const kvm = YTA_TOT;
const sqft = Math.round(kvm * 10.7639);
document.getElementById('total-yta').textContent = `${sqft.toLocaleString('en-GB')} sq ft (${Math.round(kvm)} m²)`;
document.getElementById('fakta-yta').textContent = `${sqft.toLocaleString('en-GB')} sq ft`;

/* ---------- storlek ---------- */
function passa() {
  const el = document.getElementById('scen');
  const b = el.clientWidth, h = el.clientHeight;
  kamera.aspect = b / h;
  kamera.updateProjectionMatrix();
  renderare.setSize(b, h, false);
  renderare.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  raknaHelvy();   // inramningen beror pa bildens proportion
  matCanvas();
  ritaNu();
}
addEventListener('resize', passa);

/* ---------- etikettpositioner ---------- */
const tmp = new THREE.Vector3();
/* Canvasens rektangel las tidigare varje bildruta. Den andras bara
   vid resize, sa den cachas — och etiketterna flyttas med transform
   i stallet for left/top, som tvingar webblasaren att rakna om layouten. */
let canvasRekt = null;
let etikettLagePlan = false;
let panelRekt = null;
function matCanvas() { canvasRekt = renderare.domElement.getBoundingClientRect(); }
function placeraEtiketter() {
  const r = canvasRekt || (canvasRekt = renderare.domElement.getBoundingClientRect());
  // Etiketter som hamnar under panelen kapades mitt i ordet ("...ining").
  // De doljs i stallet — panelen sager redan vilket rum det galler.
  const pr = panel.hidden ? null : panelRekt;
  // I planvyn far etiketten med kvadratmetern — det ar den siffran
  // en planritning finns for att svara pa.
  if (vy === 'plan' && !etikettLagePlan) {
    for (const { el, rum } of etiketter) el.innerHTML = `${rum.namn}<br><span style="opacity:.6">${area(rum).toFixed(1)} m²</span>`;
    etikettLagePlan = true;
  } else if (vy !== 'plan' && etikettLagePlan) {
    for (const { el, rum } of etiketter) el.textContent = rum.namn;
    etikettLagePlan = false;
  }
  for (const { el, rum } of etiketter) {
    if (el.style.display === 'none') continue;
    tmp.copy(centrum(rum, vy === 'plan' ? rum.v*VH + 0.1 : rum.v*VH + 1.1)).project(kamera);
    const x = r.left + (tmp.x*0.5+0.5) * r.width;
    const y = r.top  + (-tmp.y*0.5+0.5) * r.height;
    const bakom = tmp.z > 1;
    const under = pr && x > pr.left - 70 && y > pr.top - 20 && y < pr.bottom + 20;
    const smal = r.width < 700;
    const litet = area(rum) < 10 && rum.id !== 'garden';
    const dold = bakom || under || (smal && litet && valdtRum !== rum.id);
    el.style.opacity = dold ? '0' : '1';
    el.style.pointerEvents = dold ? 'none' : 'auto';
    el.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0) translate(-50%, -50%)`;
  }
}

/* ---------- slingan ---------- */
function slinga(nu) {
  requestAnimationFrame(slinga);
  if (tween && Number.isFinite(tween.t0)) { uppdateraTween(nu); behovRitas = true; }
  if (kontroller.update()) behovRitas = true;   // sant sa lange dampningen lagger sig
  if (!behovRitas) return;
  behovRitas = false;
  renderare.render(scen, kamera);
  placeraEtiketter();
}

/* ---------- start ----------
   Mekanism 3: EN kamerarorelse vid laddning, sedan stillhet.
   Inget svavar, pulserar eller tonar av sig sjalvt. */
passa();
byggVy(0);
sattLjus('dag');
kamera.position.set(MITT.x + 20, 24, MITT.z + 26);
kontroller.target.copy(HELVY.mal);
requestAnimationFrame(slinga);
raknaHelvy();
/* Forsta trycket pa Night byggde tva nya ritprogram mitt i demot.
   De byggs har i stallet, medan laddskarmen anda star kvar. */
(function varmUpp() {
  /* Uppvarmningen byggde tidigare program med en extra punktlampa i
     scenen — alltsa program som aldrig anvands. Night byggde da anda
     tva nya program mitt i demot. Nu varms de fyra kombinationer som
     faktiskt forekommer, med exakt de ljus som kors. */
  const varLjus = ljuslage, varVy = vy;
  renderare.compile(scen, kamera);                      // dag + 3d
  sattVy('plan');    renderare.compile(scen, kamera);   // dag + plan
  sattLjus('natt');  renderare.compile(scen, kamera);   // natt + plan
  sattVy('3d');      renderare.compile(scen, kamera);   // natt + 3d
  sattVy(varVy); sattLjus(varLjus);

  /* Forsta forhandsbilden skapar render-malet och gor sin forsta
     hemhamtning av pixlar. Den engangskostnaden tas har, bakom
     laddskarmen, i stallet for vid forsta rumsklicket. */
  ritaForhandsbild(RUM[0]);

  tween = null;
  const s2 = ramaIn(TOMT_MITT.clone());
  kamera.position.set(MITT.x + 22, 26, MITT.z + 28);
  kontroller.target.copy(s2.mal);
  flytta(s2.pos, s2.mal, INTRO_MS);
})();
setTimeout(() => document.getElementById('laddar').classList.add('klar'), 260);

/* ============================================================
   Testkrok. Kritikerna maste kunna frysa klockan och stega
   animationen manuellt — annars domer de brus i stallet for
   rorelse (skillens krav pa filmremsa).
   ============================================================ */
window.__demo = {
  KAMERA_MS, INTRO_MS,
  /* Sätt en kameraflytt till exakt progress t (0..1) utan att tiden gar. */
  scrub(t) {
    if (!tween) return false;
    const e = easeInOutCubic(Math.max(0, Math.min(1, t)));
    kamera.position.lerpVectors(tween.fp, tween.tp, e);
    kontroller.target.lerpVectors(tween.fm, tween.tm, e);
    kontroller.update();
    renderare.render(scen, kamera);
    placeraEtiketter();
    return true;
  },
  /* Starta en flytt utan att lata den spela: for filmremsan. */
  planeraTill(id) {
    const r = rumById(id); if (!r) return false;
    markera(id);
    const { pos, mal } = rumsKamera(r);
    flytta(pos, mal, KAMERA_MS, () => visaPanel(r));
    tween.t0 = Infinity;      // fryser tweenen, scrub styr den i stallet
    return true;
  },
  stannaTid() { if (tween) tween.t0 = Infinity; },
  /* fps gar INTE att mata harifran: testmiljon renderar pa processorn
     (SwiftShader) och gav 6,7 fps bade med och utan 4x strypning. En
     siffra harifran sager nagot om renderaren, inte om bygget. */
  fps() { return { ogiltig: true, skal: 'SwiftShader: 6,7 fps med OCH utan 4x strypning' }; },
  /* Hardvaruoberoende matt. fps under SwiftShader mater mjukvaru-
     renderaren, inte appen (bevisat: 6,7 fps bade med och utan 4x
     strypning). DE HAR siffrorna sager nagot om en riktig mobil. */
  vikt() {
    const r = renderare.info;
    return {
      drawCalls: r.render.calls,
      trianglar: r.render.triangles,
      geometrier: r.memory.geometries,
      texturer: r.memory.textures,
      program: r.programs ? r.programs.length : null,
      ljuskallor: scen.children.filter(o => o.isLight).length,
      skuggkastare: (() => { let n = 0; scen.traverse(o => { if (o.isLight && o.castShadow) n++; }); return n; })(),
    };
  },
  /* Shaderns egna ljusrakningar. Ett nollstallt ljus forsvinner INTE
     harifran — det ar hela poangen med att mata detta. */
  shaderLjus() {
    return renderare.info.programs.map(p => {
      const m = String(p.cacheKey).match(/,(\d+),(\d+),(\d+),(\d+),(\d+),(\d+)/);
      return { nyckel: String(p.cacheKey).slice(0, 60), punktljus: m ? m[1] : '?' };
    });
  },
  ljusIScenen() { let n = 0; scen.traverse(o => { if (o.isLight) n++; }); return n; },
  /* Ren JS-kostnad per bildruta, utan GPU: matbar aven har. */
  jsKostnad(varv = 60) {
    const t0 = performance.now();
    for (let i = 0; i < varv; i++) { uppdateraTween(performance.now()); kontroller.update(); placeraEtiketter(); }
    return +((performance.now() - t0) / varv).toFixed(3);   // ms per bildruta
  },
  lage() {
    return { vy, vaning: aktuellVaning, ljus: ljuslage, valdtRum,
             panelSynlig: !panel.hidden, tweenAktiv: !!tween,
             kamera: kamera.position.toArray().map(n=>+n.toFixed(2)) };
  },
  rum: [...RUM, TRADGARD].map(r => ({ id:r.id, namn:r.namn, v:r.v, area:+area(r).toFixed(2) })),
  ytaTotal: +YTA_TOT.toFixed(2),
  valj: valjRum, aterstall: aterstallVy, sattVy, sattLjus, byggVy,
  klar: true,
};
