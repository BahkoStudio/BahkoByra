/* ============================================================
   PRISERNA — så fyller Alltfix i dem
   Rami 2026-09-28: priserna läggs in i ett senare steg, när prisunderlaget
   är klart. Tills dess står alla belopp i PRISER som null och sidan visar
   inga kronor alls, bara vad som ingår och vilka tillval kunden gjort.

   1. Skriv beloppen i PRISER nedan, i kronor inklusive moms, i stället för
      null. Enheten står efter varje rad (per m², per löpmeter och så vidare).
   2. Fyll i ALLA belopp. Ett tillägg som inte kostar något (klart glas,
      trätrall, ingen beklädnad …) skrivs 0, inte null. Så länge något belopp
      fortfarande är null visar sidan inga kronor alls, bara vad som ingår
      och vilka tillval kunden gjort (webbläsarens konsol säger vilka som
      saknas). Då kan en halvfärdig prislista aldrig ge en för låg summa.
   3. Vad som ingår i grundpriset står i GRUNDVAL längre ner och kan ändras
      för sig. Knapparnas etiketter "Ingår" och "+ 4 200 kr" räknas ur det.

   EXEMPELPRISER är påhittade siffror med samma nycklar. De används bara när
   adressen slutar på ?priser=test, så att uträkningen kan provas, och sidan
   skriver då "Exempelpriser – inte Alltfix priser".
   ============================================================ */
export const PRISER = {
  grund: null,                                   // per m² golvyta: stomme, bjälklag, montage
  vagg: { skjut: null, vik: null, oppen: null },  // per löpmeter glasvägg (skjut, vik eller öppet)
  glas: { klart: null, tonat: null },             // tillägg per löpmeter glasvägg
  material: { tra: null, fasad: null },           // per löpmeter trävägg eller fasadvägg, i stället för glas
  gavel: { klart: null, tonat: null, tra: null, fasad: null },  // per m² gavel ovanför väggarna när taket lutar
  insida: { ingen: null, skiva: null, parlspont: null, tra: null },  // per m² insida: täta väggar och innertak under tätt tak (ingen: 0)
  hojd: null,                                    // per påbörjade 10 cm över grundhöjden (GRUNDVAL.hojd), hela rummet
  takform: { plant: null, pulpet: null, sadel: null },           // fast tillägg per takform
  tak: { lamell: null, glas: null, kanalplast: null, takpapp: null, takpannor: null },  // per m² takyta
  golv: { trall: null, parkett: null, klinker: null },           // tillägg per m² golvyta
  led: null,                                     // fast pris
  nat: null,                                     // fast pris, bara när någon vägg är av glas
};

export const EXEMPELPRISER = {
  grund: 3200,
  vagg: { skjut: 5200, vik: 6400, oppen: 0 },
  glas: { klart: 0, tonat: 450 },
  material: { tra: 3900, fasad: 5800 },
  gavel: { klart: 4800, tonat: 5300, tra: 2600, fasad: 3400 },
  insida: { ingen: 0, skiva: 290, parlspont: 420, tra: 560 },
  hojd: 1800,
  takform: { plant: 0, pulpet: 0, sadel: 14000 },
  tak: { lamell: 4200, glas: 3400, kanalplast: 1200, takpapp: 1600, takpannor: 2100 },
  golv: { trall: 0, parkett: 950, klinker: 1450 },
  led: 7500,
  nat: 3900,
};

/* Vad som ingår i grundpriset. Allt annat är tillval (eller "annat
   utförande", som trä- och fasadvägg i stället för glas). */
export const GRUNDVAL = {
  form: ['plant', 'pulpet'],                                     // sadeltak är tillval
  tak: { plant: 'takpapp', pulpet: 'kanalplast', sadel: 'kanalplast' },   // täckningen som ingår för varje takform
  material: 'glas',                                              // väggar i glas
  vagg: 'skjut',                                                 // skjutpartier
  glas: 'klart',
  golv: 'trall',
  hojd: 2.5,                                                     // meter vid takfoten
  insida: 'ingen',                                               // Rami: invändig beklädnad är ett tillval
  led: false,
  nat: false,
};

/* Vilka belopp saknas i en prislista? ["grund", "vagg.skjut", ...] */
const saknade = (o, vag = '') => (typeof o === 'number' ? [] : o != null && typeof o === 'object'
  ? Object.entries(o).flatMap(([k, v]) => saknade(v, vag ? vag + '.' + k : k)) : [vag]);
const SAKNAS = saknade(PRISER);
const TEST = typeof location !== 'undefined' && new URLSearchParams(location.search).get('priser') === 'test';
// halvvägs ifylld: säg vad som saknas, men visa inga kronor
const blad = (o) => (o != null && typeof o === 'object' ? Object.values(o).reduce((n, v) => n + blad(v), 0) : 1);
if (SAKNAS.length && SAKNAS.length < blad(PRISER))
  console.info('Alltfix priser: sidan visar inga kronor förrän alla belopp är ifyllda. Saknas:', SAKNAS.join(', '));
/* 'riktiga' (alla belopp ifyllda), 'exempel' (?priser=test) eller null (inga kronor syns) */
export const PRISLAGE = !SAKNAS.length ? 'riktiga' : TEST ? 'exempel' : null;
const P = PRISLAGE === 'riktiga' ? PRISER : PRISLAGE === 'exempel' ? EXEMPELPRISER : null;

// raderna i hela hundralappar; totalen är deras summa, så uppställningen går jämnt ut
const avrunda = (kr) => Math.round(kr / 100) * 100;
const tal = (v, n = 1) => v.toFixed(n).replace('.', ',');
const GOLVNAMN = { trall: 'trätrall', parkett: 'parkett', klinker: 'klinker' };
const VAGGNAMN = { vv: 'vänster gavel', vf: 'front', vh: 'höger gavel' };
const INSIDANAMN = { ingen: 'utan beklädnad', skiva: 'vit skiva', parlspont: 'vit pärlspont', tra: 'träpanel' };
const TATT = ['takpapp', 'takpannor'];         // samma täta tak som i app.js: de får innertak
// ett belopp ur prislistan, eller null om det inte är ifyllt
const pr = (grupp, k) => { const v = k == null ? P[grupp] : P[grupp] && P[grupp][k]; return typeof v === 'number' ? v : null; };
const ggr = (a, b) => (a == null || b == null ? null : a * b);
const plus = (...d) => (d.some((x) => x == null) ? null : d.reduce((s, x) => s + x, 0));
const lista = (a) => (a.length > 1 ? a.slice(0, -1).join(', ') + ' och ' + a[a.length - 1] : a[0]);

/* Ytorna som både uträkningen och "Dina tillval" behöver.
   v: { b, d, h, form, lut, tak, vagg, glas, golv, led, nat, vv, vf, vh, insida, forl } (meter, grader).
   forl: hur långt pulpettaket fortsätter in över husets tak, bakom husväggen. */
export function ytor(v) {
  const a = (v.form === 'plant' ? 0 : v.lut) * Math.PI / 180, t = Math.tan(a);
  const vaggar = { vv: v.d, vf: v.b, vh: v.d };                  // löpmeter per vägg
  /* Gavlarna, samma trianglar som 3D-bilden bygger: pulpettaket en på
     varje sida (d × d·tan / 2), sadeltaket en i fronten (b × b/2·tan / 2). */
  const gavel = { vv: v.form === 'pulpet' ? v.d * v.d * t / 2 : 0, vf: v.form === 'sadel' ? v.b * v.b * t / 4 : 0,
    vh: v.form === 'pulpet' ? v.d * v.d * t / 2 : 0 };
  const lop = { glas: 0, tra: 0, fasad: 0 }, gavelYta = { glas: 0, tra: 0, fasad: 0 }, namn = { glas: [], tra: [], fasad: [] };
  for (const k of ['vv', 'vf', 'vh']) { lop[v[k]] += vaggar[k]; gavelYta[v[k]] += gavel[k]; namn[v[k]].push(VAGGNAMN[k]); }
  // pulpet: ett fall b × d/cos; sadel: två fall (b/2)/cos × d, lika stor summa. Innertaket
  // täcker bara rummet; pulpettakets täckning fortsätter forl in över husets tak.
  const inneTak = v.b * v.d / Math.cos(a);
  const takyta = v.form === 'pulpet' ? v.b * (v.d + (v.forl || 0)) / Math.cos(a) : inneTak;
  const tatt = TATT.includes(v.tak);
  const insida = (lop.tra + lop.fasad) * v.h + gavelYta.tra + gavelYta.fasad + (tatt ? inneTak : 0);
  return { yta: v.b * v.d, lop, gavelYta, namn, takyta, tatt, insida };
}

/* Uträkningen, eller null när sidan saknar priser. Varje rad har text,
   belopp och hur: underlaget som visas under "Så räknas det". Rader utan
   ifyllt pris utelämnas. */
export function berakna(v) {
  if (!P) return null;
  const y = ytor(v);
  const over = Math.max(0, Math.ceil((v.h - GRUNDVAL.hojd - 1e-9) / 0.1));
  const glasPris = v.vagg === 'oppen' ? pr('vagg', 'oppen') : plus(pr('vagg', v.vagg), pr('glas', v.glas));
  const gavelGlas = v.vagg === 'oppen' ? 0 : y.gavelYta.glas;
  const rader = [
    ['Stomme och golvbjälklag', ggr(pr('grund'), y.yta), `${tal(y.yta)} m² golvyta`],
    ['Glasväggar', y.lop.glas ? ggr(glasPris, y.lop.glas) : null, `${tal(y.lop.glas)} löpmeter, ${lista(y.namn.glas) || ''}`],
    ['Trävägg', y.lop.tra ? ggr(pr('material', 'tra'), y.lop.tra) : null, `${tal(y.lop.tra)} löpmeter, ${lista(y.namn.tra) || ''}`],
    ['Fasadvägg', y.lop.fasad ? ggr(pr('material', 'fasad'), y.lop.fasad) : null, `${tal(y.lop.fasad)} löpmeter, ${lista(y.namn.fasad) || ''}`],
    ['Gavelglas', gavelGlas ? ggr(pr('gavel', v.glas), gavelGlas) : null, `${tal(gavelGlas)} m² ovanför partierna`],
    ['Gavel i trä', y.gavelYta.tra ? ggr(pr('gavel', 'tra'), y.gavelYta.tra) : null, `${tal(y.gavelYta.tra)} m² ovanför väggen`],
    ['Gavel i fasad', y.gavelYta.fasad ? ggr(pr('gavel', 'fasad'), y.gavelYta.fasad) : null, `${tal(y.gavelYta.fasad)} m² ovanför väggen`],
    ['Tak', ggr(pr('tak', v.tak), y.takyta), `${tal(y.takyta)} m² takyta${v.form === 'pulpet' && v.forl > 0.05 ? ', med anslutningen in över husets tak' : ''}`],
    ['Tillägg för takformen', pr('takform', v.form), ''],
    ['Golv', ggr(pr('golv', v.golv), y.yta), `${tal(y.yta)} m² ${GOLVNAMN[v.golv]}`],
    ['Extra höjd', ggr(pr('hojd'), over), `${over} × 10 cm över ${tal(GRUNDVAL.hojd, 2)} m`],
    ['Invändig beklädnad', y.insida ? ggr(pr('insida', v.insida), y.insida) : null, `${tal(y.insida)} m² ${INSIDANAMN[v.insida]}`],
    ['LED-belysning', v.led ? pr('led') : null, ''],
    ['Insektsnät', v.nat && y.lop.glas ? pr('nat') : null, ''],
  ].filter(([, kr]) => kr != null && Number.isFinite(kr))
    .map(([text, kr, hur]) => ({ text, kr: avrunda(kr), hur })).filter((r) => r.kr > 0);
  return { rader, total: rader.reduce((s, r) => s + r.kr, 0) };
}

export const kronor = (kr) => kr.toLocaleString('sv-SE').replace(/,/g, ' ') + ' kr';
/* Skillnad med tecken: "+ 4 200 kr", "− 1 300 kr" (minustecknet, inte bindestreck). */
export const skillnad = (kr) => (kr < 0 ? '− ' : '+ ') + kronor(Math.abs(kr));
