#!/usr/bin/env node
/**
 * enrich_crm_contacts.js — Fyller i mejl/telefon för dashboardens CRM-seed.
 *
 * Besöker varje kliniks sajt (startsida + vanliga kontaktsidor), plockar
 * e-post (mailto: + text) och telefon (tel: + svenska format) och skriver
 * resultatet till .tmp/crm_contacts.json.
 *
 * Kör:   node tools/enrich_crm_contacts.js            # hämta + visa resultat
 *        node tools/enrich_crm_contacts.js --apply    # skriv även in i dashboardens SEED
 *
 * OBS: kräver fri utgående nätåtkomst (kör lokalt, inte i sandlådad miljö).
 * Efter --apply: dashboardens CRM ligger i localStorage — exportera ev. Backup
 * först, ladda om dashboarden med rensad bb_crm_v1 för att läsa in nya seeden.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DASH = join(ROOT, 'bahkobyra', 'dashboard', 'index.html');
const OUT = join(ROOT, '.tmp', 'crm_contacts.json');
const APPLY = process.argv.includes('--apply');

const CONTACT_PATHS = ['', '/kontakt', '/kontakta-oss', '/contact', '/kontakt-oss', '/om-oss'];
const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const PHONE_RE = /(?:tel:|callto:)?(\+46[\s\-()]?\d[\d\s\-()]{6,12}|0\d{1,3}[\s\-]?\d{2,3}[\s\-]?\d{2,3}[\s\-]?\d{2,3})/g;
const SKIP_EMAIL = /\.(png|jpg|jpeg|webp|svg|gif)$|sentry|wixpress|example\.|@2x/i;

function readSeed() {
  const html = readFileSync(DASH, 'utf8');
  const rows = [...html.matchAll(/\{id:'(s\d+)',name:'((?:[^'\\]|\\.)*)',web:'([^']*)'[^}]*?phone:'([^']*)',email:'([^']*)'/g)];
  return rows.map(m => ({ id: m[1], name: m[2].replace(/\\'/g, "'"), web: m[3], phone: m[4], email: m[5] }));
}

async function fetchText(url) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), 12000);
  try {
    const res = await fetch(url, {
      signal: ctl.signal,
      redirect: 'follow',
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126 Safari/537.36', 'Accept-Language': 'sv-SE,sv;q=0.9' }
    });
    if (!res.ok) return '';
    return await res.text();
  } catch { return ''; } finally { clearTimeout(t); }
}

function pickEmail(emails, domain) {
  const clean = [...new Set(emails.map(e => e.toLowerCase()))].filter(e => !SKIP_EMAIL.test(e));
  if (!clean.length) return '';
  // Prioritera egna domänen, sedan info@/kontakt@, sedan första bästa
  const own = clean.filter(e => domain && e.endsWith('@' + domain.replace(/^www\./, '')));
  const pool = own.length ? own : clean;
  return pool.find(e => /^(info|kontakt|hej|booking|bokning)@/.test(e)) || pool[0];
}

function pickPhone(phones) {
  const clean = [...new Set(phones.map(p => p.replace(/^(tel:|callto:)/, '').trim()))]
    .filter(p => p.replace(/\D/g, '').length >= 8);
  return clean[0] || '';
}

async function enrich(lead) {
  let domain = '';
  try { domain = new URL(lead.web).hostname; } catch { return { ...lead, status: 'ogiltig URL' }; }
  const emails = [], phones = [];
  for (const path of CONTACT_PATHS) {
    const html = await fetchText(lead.web.replace(/\/$/, '') + path);
    if (!html) continue;
    emails.push(...(html.match(EMAIL_RE) || []), ...[...html.matchAll(/mailto:([^"'?]+)/g)].map(m => m[1]));
    phones.push(...(html.match(PHONE_RE) || []), ...[...html.matchAll(/tel:([+\d\s\-()]+)/g)].map(m => m[1]));
    if (emails.length && phones.length) break;
  }
  const email = lead.email || pickEmail(emails, domain);
  const phone = lead.phone || pickPhone(phones);
  return { ...lead, email, phone, status: email || phone ? 'hittad' : 'kolla manuellt' };
}

const leads = readSeed();
console.log(`Hittade ${leads.length} leads i dashboard-seeden. Hämtar kontaktuppgifter…\n`);

const results = [];
for (const lead of leads) {
  const r = await enrich(lead);
  results.push(r);
  console.log(`  ${r.status === 'hittad' ? '✓' : '·'} ${r.name.padEnd(32)} ${r.email || '—'}  ${r.phone || ''}`);
}

mkdirSync(join(ROOT, '.tmp'), { recursive: true });
writeFileSync(OUT, JSON.stringify(results, null, 2));
const found = results.filter(r => r.status === 'hittad').length;
console.log(`\n${found}/${results.length} med kontaktuppgift → ${OUT}`);
console.log(results.filter(r => r.status !== 'hittad').length
  ? 'Resterande: slå upp manuellt (Google "[namn] kontakt" eller Instagram-bio).' : 'Alla klara!');

if (APPLY) {
  let html = readFileSync(DASH, 'utf8');
  let patched = 0;
  for (const r of results) {
    html = html.replace(new RegExp(`(\\{id:'${r.id}',[^}]*?phone:')[^']*(',email:')[^']*(')`),
      (_, a, b, c) => { patched++; return a + r.phone + b + r.email + c; });
  }
  writeFileSync(DASH, html);
  console.log(`\n--apply: ${patched} seed-rader uppdaterade i dashboarden.`);
  console.log('OBS: har du redan öppnat dashboarden ligger gamla CRM:et i localStorage.');
  console.log('Ta Backup först → rensa nyckeln bb_crm_v1 → ladda om för att läsa in nya seeden.');
}
