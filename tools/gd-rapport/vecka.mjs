// Veckohjälp: ISO-veckor, måndag till söndag. Delas av hamta.mjs och bygg.mjs.

function iso(d) {
  return d.toISOString().slice(0, 10);
}

function utcDatum(ar, man, dag) {
  return new Date(Date.UTC(ar, man, dag));
}

// Måndagen i ISO-vecka nr i år ar.
function mandagIVecka(ar, nr) {
  const fjardeJan = utcDatum(ar, 0, 4);
  const dagIVeckan = fjardeJan.getUTCDay() || 7; // måndag = 1 ... söndag = 7
  const mandagV1 = new Date(fjardeJan);
  mandagV1.setUTCDate(fjardeJan.getUTCDate() - dagIVeckan + 1);
  const m = new Date(mandagV1);
  m.setUTCDate(mandagV1.getUTCDate() + (nr - 1) * 7);
  return m;
}

// ISO-vecka (år + nummer) för ett datum.
export function isoVecka(d) {
  const t = utcDatum(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  const dag = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - dag); // torsdagen i samma vecka
  const ar = t.getUTCFullYear();
  const forstaJan = utcDatum(ar, 0, 1);
  const nr = Math.ceil(((t - forstaJan) / 86400000 + 1) / 7);
  return { ar, nr };
}

export function veckaObjekt(ar, nr) {
  const start = mandagIVecka(ar, nr);
  const slut = new Date(start);
  slut.setUTCDate(start.getUTCDate() + 6);
  return {
    id: `${ar}-W${String(nr).padStart(2, '0')}`,
    ar,
    nr,
    start: iso(start),
    slut: iso(slut),
  };
}

// Förra hela veckan (måndag till söndag) räknat från i dag, eller den vecka som anges som "2026-W42".
export function veckaFranArg(arg) {
  if (arg) {
    const m = /^(\d{4})-W(\d{1,2})$/i.exec(arg.trim());
    if (!m) throw new Error('Veckan ska skrivas som 2026-W42, inte "' + arg + '".');
    const nr = Number(m[2]);
    if (nr < 1 || nr > 53) throw new Error('Veckonummer måste vara 1 till 53.');
    return veckaObjekt(Number(m[1]), nr);
  }
  const idag = new Date();
  const forraVeckan = new Date(Date.UTC(idag.getFullYear(), idag.getMonth(), idag.getDate() - 7));
  const { ar, nr } = isoVecka(forraVeckan);
  return veckaObjekt(ar, nr);
}

export function veckaFore(v) {
  const start = new Date(v.start + 'T00:00:00Z');
  start.setUTCDate(start.getUTCDate() - 7);
  const { ar, nr } = isoVecka(start);
  return veckaObjekt(ar, nr);
}

// "v41-2026", används i filnamn.
export function formateraVeckaId(v) {
  return `v${String(v.nr).padStart(2, '0')}-${v.ar}`;
}

const MANADER = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'];

// "5 till 11 oktober 2026" eller "28 september till 4 oktober 2026".
export function datumintervall(v) {
  const a = new Date(v.start + 'T00:00:00Z');
  const b = new Date(v.slut + 'T00:00:00Z');
  const ma = MANADER[a.getUTCMonth()];
  const mb = MANADER[b.getUTCMonth()];
  if (ma === mb) return `${a.getUTCDate()} till ${b.getUTCDate()} ${mb} ${b.getUTCFullYear()}`;
  return `${a.getUTCDate()} ${ma} till ${b.getUTCDate()} ${mb} ${b.getUTCFullYear()}`;
}
