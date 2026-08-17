/**
 * _schema.js — vad en demo MÅSTE innehålla för att få byggas.
 *
 * Poängen med filen: de copy- och designregler som gick att göra strukturella
 * ska vara omöjliga att bryta, i stället för att stå som text i en skill som
 * ingen läser i stridens hetta. Historiken är entydig — varje avslag
 * ("hela copyn är värdelös", "galleribilderna är för stora", "inte
 * telefonoptimerad") gällde en regel som redan fanns nedskriven.
 *
 * Reglerna som blivit struktur här:
 *   barandeIde      obligatorisk  → idé före formel, annars byggs inget
 *   arligMening     obligatorisk  → minst en mening som avstår försäljning
 *   cta.verb        EN sträng     → samma handling överallt, kan inte spreta
 *   galleri ≤ 6                   → galleriet kan inte svälla
 *   platshållare    självflaggande → påhittade uppgifter kan inte nå en kund
 *   palettkontrast  räknas        → oläslig knapptext kan inte levereras
 *
 * Ingen import, inget JSX: filen ska kunna läsas av ett nodskript utan Next.
 */

/** Markera en uppgift som ej verifierad: telefon: pl('070-123 45 67') */
export const pl = (text) => [text, 'PL'];

/** Är fältet en platshållare? */
export const arPl = (v) => Array.isArray(v) && v[1] === 'PL';

/** Plocka ut texten oavsett om fältet är markerat eller inte. */
export const text = (v) => (arPl(v) ? v[0] : v);

/* ------------------------------------------------------------ WCAG-kontrast */

function luminans(hex) {
  const d = String(hex).replace('#', '');
  const full = d.length === 3 ? d.split('').map((c) => c + c).join('') : d;
  const kanaler = (full.match(/../g) || []).map((x) => parseInt(x, 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  if (kanaler.length < 3) return null;
  return 0.2126 * kanaler[0] + 0.7152 * kanaler[1] + 0.0722 * kanaler[2];
}

/** Kontrastkvot enligt WCAG 2.2. Returnerar null om någon färg inte är hex. */
export function kontrast(a, b) {
  const la = luminans(a), lb = luminans(b);
  if (la === null || lb === null) return null;
  const [hog, lag] = la > lb ? [la, lb] : [lb, la];
  return (hog + 0.05) / (lag + 0.05);
}

/* ------------------------------------------------------------------ regler */

const OBLIGATORISKA = [
  ['slug', (d) => typeof d.slug === 'string' && /^[a-z0-9-]+$/.test(d.slug)],
  ['kit', (d) => typeof d.kit === 'string'],
  ['barandeIde', (d) => typeof d.barandeIde === 'string' && d.barandeIde.trim().length > 10],
  ['arligMening', (d) => typeof d.arligMening === 'string' && d.arligMening.trim().length > 10],
  ['cta.verb', (d) => typeof d?.cta?.verb === 'string' && d.cta.verb.trim().length > 2],
  ['varumarke.namn', (d) => typeof d?.varumarke?.namn === 'string'],
  ['varumarke.palett', (d) => d?.varumarke?.palett && typeof d.varumarke.palett === 'object'],
  ['hero.setup', (d) => typeof d?.hero?.setup === 'string'],
  ['hero.punch', (d) => typeof d?.hero?.punch === 'string'],
  ['hero.video', (d) => typeof d?.hero?.video === 'string'],
  ['hero.poster', (d) => typeof d?.hero?.poster === 'string'],
  ['kontakt.telefon', (d) => Boolean(d?.kontakt?.telefon)],
  ['seo.titel', (d) => typeof d?.seo?.titel === 'string'],
];

/** Alla strängfält som kan vara platshållarmarkerade, med sökväg. */
function hittaPlatshallare(objekt, stig = '') {
  const ut = [];
  for (const [nyckel, varde] of Object.entries(objekt || {})) {
    const p = stig ? `${stig}.${nyckel}` : nyckel;
    if (arPl(varde)) ut.push(p);
    else if (varde && typeof varde === 'object' && !Array.isArray(varde)) {
      ut.push(...hittaPlatshallare(varde, p));
    }
  }
  return ut;
}

/**
 * Validera en demo.
 * @returns {{ok:boolean, fel:string[], varningar:string[], platshallare:string[]}}
 */
export function validera(demo) {
  const fel = [];
  const varningar = [];
  if (!demo || typeof demo !== 'object') {
    return { ok: false, fel: ['Datafilen exporterar inget objekt'], varningar: [], platshallare: [] };
  }

  for (const [namn, test] of OBLIGATORISKA) {
    let ok = false;
    try { ok = test(demo); } catch { ok = false; }
    if (!ok) fel.push(`Fältet "${namn}" saknas eller är fel — utan det får demon inte byggas`);
  }

  // Galleriet: taket finns för att sex bilder redan är mer än en telefon orkar.
  if (Array.isArray(demo.galleri) && demo.galleri.length > 6) {
    fel.push(`Galleriet har ${demo.galleri.length} bilder, taket är 6`);
  }

  // Palettens läsbarhet. Knappen är accentyta med mörk text — samma regel som
  // globals.css slår fast (vit text på smaragd = 2,54:1, underkänt).
  const p = demo?.varumarke?.palett;
  if (p) {
    const par = [
      ['accent mot bas (knapptext)', p.accent, p.bas, 4.5],
      ['text mot bas (brödtext)', p.text, p.bas, 7],
      ['accentLjus mot bas (etiketter)', p.accentLjus, p.bas, 4.5],
    ];
    for (const [namn, f1, f2, krav] of par) {
      if (!f1 || !f2) continue;
      const k = kontrast(f1, f2);
      if (k === null) { varningar.push(`Kunde inte räkna kontrast för ${namn} (använd hex, inte rgba)`); continue; }
      if (k < krav) fel.push(`För låg kontrast: ${namn} ${k.toFixed(2)}:1, kravet är ${krav}:1`);
    }
  }

  const platshallare = hittaPlatshallare(demo);

  // En levererad demo får aldrig innehålla uppgifter vi hittat på.
  if (demo.status === 'levererad' && platshallare.length) {
    fel.push(`Status är "levererad" men dessa uppgifter är overifierade: ${platshallare.join(', ')}`);
  }
  if (platshallare.length) {
    varningar.push(`Platshållare kvar (säg det till kunden): ${platshallare.join(', ')}`);
  }

  return { ok: fel.length === 0, fel, varningar, platshallare };
}
