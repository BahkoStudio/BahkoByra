/* ============================================================
   Prisberäkningen (Rami 2026-09-28: "valen påverkar priset").
   TESTPRISER: beloppen nedan är platshållare tills Alltfix skickar sin
   riktiga prislista. Allt i kronor inklusive moms. Ändra bara siffrorna,
   uträkningen följer med.
   ============================================================ */
export const TESTPRISER = true;

export const PRISER = {
  grund: 3200,                                   // per m² golvyta: stomme, bjälklag, montage
  vagg: { skjut: 5200, vik: 6400, oppen: 0 },   // per löpmeter glasparti (front och gavlar)
  glas: { klart: 0, tonat: 450 },               // tillägg per löpmeter glasparti
  gavel: { klart: 4800, tonat: 5300 },           // per m² gavelglas ovanför partierna (lutande tak)
  hojd: 1800,                                    // per påbörjade 10 cm över standardhöjden, hela rummet
  hojdStandard: 2.5,                             // meter vid takfoten som ingår i grundpriset
  takform: { plant: 0, pulpet: 0, sadel: 14000 },
  tak: { lamell: 4200, glas: 3400, kanalplast: 1200, takpapp: 1600, takpannor: 2100 },  // per m² takyta
  golv: { trall: 0, parkett: 950, klinker: 1450 },                                       // tillägg per m² golvyta
  led: 7500,
  nat: 3900,
};

// raderna i hela hundralappar; totalen är deras summa, så uppställningen går jämnt ut
const avrunda = (kr) => Math.round(kr / 100) * 100;
const tal = (v, n = 1) => v.toFixed(n).replace('.', ',');
const GOLVNAMN = { trall: 'trätrall', parkett: 'parkett', klinker: 'klinker' };

/* v: { b, d, h, form, lut, tak, vagg, glas, golv, led, nat }  (mått i meter, lutning i grader)
   Varje rad har text, belopp och hur: underlaget som visas under "Så räknas det". */
export function berakna(v) {
  const yta = v.b * v.d;
  const lop = v.b + 2 * v.d;
  const a = (v.form === 'plant' ? 0 : v.lut) * Math.PI / 180;
  // pulpet: ett fall b × d/cos; sadel: två fall (b/2)/cos × d, lika stor summa
  const takyta = v.b * v.d / Math.cos(a);
  const over = Math.max(0, Math.ceil((v.h - PRISER.hojdStandard - 1e-9) / 0.1));
  /* Gavelglaset, samma trianglar som 3D-bilden bygger: pulpettaket en på
     varje sida (d × d·tan), sadeltaket en i fronten (b × b/2·tan). */
  const t = Math.tan(a);
  const gavel = v.vagg === 'oppen' ? 0 : v.form === 'pulpet' ? v.d * v.d * t : v.form === 'sadel' ? v.b * v.b * t / 4 : 0;
  const rader = [
    ['Stomme och golvbjälklag', PRISER.grund * yta, `${tal(yta)} m² golvyta`],
    ['Glaspartier', (PRISER.vagg[v.vagg] + (v.vagg === 'oppen' ? 0 : PRISER.glas[v.glas])) * lop, `${tal(lop)} löpmeter, front och gavlar`],
    ['Gavelglas', PRISER.gavel[v.glas] * gavel, `${tal(gavel)} m² ovanför partierna`],
    ['Tak', PRISER.tak[v.tak] * takyta + PRISER.takform[v.form],
      `${tal(takyta)} m² takyta${PRISER.takform[v.form] ? ' + tillägg för takformen' : ''}`],
    ['Golv', PRISER.golv[v.golv] * yta, `${tal(yta)} m² ${GOLVNAMN[v.golv]}`],
    ['Extra höjd', PRISER.hojd * over, `${over} × 10 cm över ${tal(PRISER.hojdStandard, 2)} m`],
    ['LED-belysning', v.led ? PRISER.led : 0, ''],
    ['Insektsnät', v.nat ? PRISER.nat : 0, ''],
  ].map(([text, kr, hur]) => ({ text, kr: avrunda(kr), hur })).filter((r) => r.kr > 0);
  return { rader, total: rader.reduce((s, r) => s + r.kr, 0) };
}

export const kronor = (kr) => kr.toLocaleString('sv-SE').replace(/,/g, ' ') + ' kr';
