#!/usr/bin/env node
/**
 * generate_audit.js — Bahko Byrå
 *
 * Genererar en 10-punktsanalys av en kliniksajt.
 * Scrapar med Firecrawl, analyserar med Claude, sparar rapport.
 *
 * Krav i .env:
 *   FIRECRAWL_API_KEY
 *   ANTHROPIC_API_KEY
 *   BREVO_API_KEY (valfritt — skickar rapporten via mejl)
 *
 * Användning:
 *   node tools/generate_audit.js --url=https://klinik.se
 *   node tools/generate_audit.js --url=https://klinik.se --email=hej@klinik.se
 *   node tools/generate_audit.js --url=https://klinik.se --email=hej@klinik.se --send
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ── Load .env ──────────────────────────────────────────────────────────────
function loadEnv() {
  const p = join(ROOT, '.env');
  if (!existsSync(p)) return;
  readFileSync(p, 'utf8').split('\n').forEach(line => {
    const [k, ...v] = line.split('=');
    if (k && !k.startsWith('#') && v.length) process.env[k.trim()] ??= v.join('=').trim();
  });
}
loadEnv();

// ── Args ───────────────────────────────────────────────────────────────────
const args = Object.fromEntries(
  process.argv.slice(2)
    .filter(a => a.startsWith('--'))
    .map(a => { const [k, ...v] = a.slice(2).split('='); return [k, v.join('=') || true]; })
);

const URL_ARG   = args.url;
const EMAIL_ARG = args.email   || null;
const SEND      = args.send    === true || args.send === 'true';

if (!URL_ARG) {
  console.error('❌ Ange en URL: --url=https://klinik.se');
  process.exit(1);
}

const FIRECRAWL_KEY = process.env.FIRECRAWL_API_KEY;
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
const BREVO_KEY     = process.env.BREVO_API_KEY;
const FROM_EMAIL    = process.env.FROM_EMAIL   || 'mathias@bahkostudio.live';
const FROM_NAME     = process.env.FROM_NAME    || 'Mathias · Bahko Byrå';

if (!FIRECRAWL_KEY) { console.error('❌ FIRECRAWL_API_KEY saknas i .env'); process.exit(1); }
if (!ANTHROPIC_KEY) { console.error('❌ ANTHROPIC_API_KEY saknas i .env'); process.exit(1); }

const domain = new URL(URL_ARG).hostname.replace(/^www\./, '');
const slug   = domain.replace(/\./g, '_');
const outDir = join(ROOT, '.tmp');
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, `audit_${slug}.md`);

// ── Step 1: Scrape with Firecrawl ──────────────────────────────────────────
console.log(`\n🔍 Scrapar ${URL_ARG} med Firecrawl...`);

let scraped = '';
try {
  scraped = execSync(
    `npx -y firecrawl-cli@latest scrape "${URL_ARG}" --formats markdown`,
    { env: { ...process.env, FIRECRAWL_API_KEY: FIRECRAWL_KEY }, maxBuffer: 4 * 1024 * 1024 }
  ).toString();
  console.log(`✅ Scrapad (${scraped.length} tecken)`);
} catch (err) {
  console.error('❌ Firecrawl misslyckades:', err.message);
  process.exit(1);
}

// Trim to reasonable size for Claude
const content = scraped.slice(0, 12000);

// ── Step 2: Analyze with Claude ────────────────────────────────────────────
console.log('\n🤖 Analyserar med Claude...');

const prompt = `Du är en senior webbstrateg specialiserad på kliniker och estetisk medicin.

Analysera denna kliniksajt och skriv en 10-punktsanalys. Sajten är: ${URL_ARG}

Scrapad innehåll:
---
${content}
---

Skriv rapporten på svenska. För varje punkt: ge ett betyg (Bra / OK / Behöver åtgärd), en konkret observation och ett specifikt förslag på åtgärd.

Format för varje punkt:
## [Nr]. [Punktnamn]
**Betyg:** [Bra / OK / Behöver åtgärd]
**Observation:** [Vad du ser]
**Åtgärd:** [Konkret rekommendation]

De 10 punkterna:
1. Mobilanpassning
2. Laddningshastighet (bedöm baserat på sidans komplexitet/bilder/scripts)
3. Lokal SEO & Google Maps
4. Bokningsflöde
5. Trustsignaler (betyg, certifikat, before/after)
6. Sociala bevis (recensioner, antal behandlingar)
7. SEO-grundstruktur (titlar, meta, URL-struktur)
8. Prissättning & erbjudanden
9. Design & varumärke
10. Konverteringspotential (CTA-tydlighet, leadsfångst)

Avsluta med:
## Sammanfattning
En sammanfattande bedömning (3-4 meningar) och de 3 viktigaste åtgärderna att prioritera.`;

let report = '';
try {
  const resp = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': ANTHROPIC_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`Anthropic API ${resp.status}: ${err}`);
  }

  const data = await resp.json();
  report = data.content[0].text;
  console.log('✅ Rapport genererad');
} catch (err) {
  console.error('❌ Claude-analys misslyckades:', err.message);
  process.exit(1);
}

// ── Step 3: Save report ────────────────────────────────────────────────────
const fullReport = `# Webbplatsanalys: ${domain}
Genererad: ${new Date().toLocaleDateString('sv-SE')}
URL: ${URL_ARG}
${EMAIL_ARG ? `Beställd av: ${EMAIL_ARG}` : ''}

---

${report}
`;

writeFileSync(outPath, fullReport, 'utf8');
console.log(`\n📄 Rapport sparad: ${outPath}`);
console.log('\n' + '─'.repeat(60));
console.log(fullReport);
console.log('─'.repeat(60));

// ── Step 4: Send via Brevo (optional) ──────────────────────────────────────
if (SEND && EMAIL_ARG) {
  if (!BREVO_KEY) {
    console.warn('⚠️  BREVO_API_KEY saknas — kan inte skicka mejl');
    process.exit(0);
  }

  console.log(`\n📧 Skickar rapport till ${EMAIL_ARG}...`);

  // Convert markdown headers/bold to simple HTML
  const htmlReport = fullReport
    .replace(/^## (.+)$/gm, '<h3 style="color:#c9a96e;margin:1.5rem 0 .5rem;font-size:1rem">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');

  const emailHtml = `
<div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;background:#12122A;color:#F0EDFF;padding:2rem;border-radius:8px">
  <div style="margin-bottom:1.5rem">
    <span style="font-size:.7rem;letter-spacing:.2em;text-transform:uppercase;color:#c9a96e">Bahko Byrå</span>
    <h2 style="font-size:1.4rem;margin:.5rem 0 .3rem">Din gratis webbplatsanalys</h2>
    <p style="color:rgba(240,237,255,.6);font-size:.85rem">Här är den personliga analysen av <strong>${domain}</strong></p>
  </div>
  <hr style="border:none;border-top:1px solid rgba(255,255,255,.1);margin:1.5rem 0">
  <div style="font-size:.88rem;line-height:1.7">${htmlReport}</div>
  <hr style="border:none;border-top:1px solid rgba(255,255,255,.1);margin:1.5rem 0">
  <p style="font-size:.75rem;color:rgba(240,237,255,.4)">
    Mathias · Bahko Byrå · bahkobyra.se<br>
    Vill du veta hur vi kan hjälpa er att åtgärda dessa punkter? Svara på detta mejl.
  </p>
</div>`;

  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': BREVO_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender:  { name: FROM_NAME, email: FROM_EMAIL },
        to:      [{ email: EMAIL_ARG }],
        bcc:     [{ email: FROM_EMAIL }],
        subject: `Webbplatsanalys: ${domain}`,
        htmlContent: emailHtml,
      }),
    });

    if (!res.ok) throw new Error(`Brevo ${res.status}: ${await res.text()}`);
    console.log(`✅ Rapport skickad till ${EMAIL_ARG}`);
  } catch (err) {
    console.error('❌ Mejlutskick misslyckades:', err.message);
  }
} else if (SEND && !EMAIL_ARG) {
  console.warn('⚠️  --send kräver --email=adress');
}
