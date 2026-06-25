// ============================================================
//  Bahko Byrå — Offert-estimator: delad datalager + prislogik
//  Importeras av både dashboard.html och index.html (publik sida).
//  Ingen build: ESM direkt från CDN.
// ============================================================
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// ── KONFIG ──────────────────────────────────────────────────
//  Fyll i ditt Supabase-projekt. Hämtas i Supabase → Project Settings
//  → API. Anon-nyckeln är publik och säker att lägga i klientkod när
//  RLS är aktiverat (se schema.sql).
//  Alternativ utan att redigera filen: klicka "Anslut Supabase" i
//  dashboarden — då sparas värdena i webbläsarens localStorage.
const HARDCODED = {
  url: 'DIN_SUPABASE_URL',          // t.ex. https://abcxyz.supabase.co
  anonKey: 'DIN_SUPABASE_ANON_KEY', // eyJhbGciOi...
};

const LS_URL = 'bb_supabase_url';
const LS_KEY = 'bb_supabase_key';

function readConfig() {
  let url = HARDCODED.url;
  let anonKey = HARDCODED.anonKey;
  try {
    url = localStorage.getItem(LS_URL) || url;
    anonKey = localStorage.getItem(LS_KEY) || anonKey;
  } catch { /* localStorage kan saknas i vissa lägen */ }
  return { url: (url || '').trim(), anonKey: (anonKey || '').trim() };
}

export function isConfigured() {
  const { url, anonKey } = readConfig();
  return Boolean(
    url && anonKey &&
    url !== 'DIN_SUPABASE_URL' &&
    anonKey !== 'DIN_SUPABASE_ANON_KEY' &&
    /^https?:\/\//.test(url)
  );
}

export function saveConfig(url, anonKey) {
  localStorage.setItem(LS_URL, (url || '').trim());
  localStorage.setItem(LS_KEY, (anonKey || '').trim());
  _client = null; // tvinga ny klient nästa gång
}

export function clearConfig() {
  localStorage.removeItem(LS_URL);
  localStorage.removeItem(LS_KEY);
  _client = null;
}

let _client = null;
function client() {
  if (!isConfigured()) {
    throw new Error('Supabase är inte konfigurerat. Lägg in URL + anon-nyckel.');
  }
  if (!_client) {
    const { url, anonKey } = readConfig();
    _client = createClient(url, anonKey, { auth: { persistSession: false } });
  }
  return _client;
}

// Gör fel begripliga för UI:t.
function wrap(error, fallback) {
  if (!error) return null;
  const msg = error.message || fallback || 'Okänt fel.';
  if (/relation .* does not exist|schema cache|could not find the table/i.test(msg)) {
    return new Error('Tabellerna saknas. Kör schema.sql i Supabase SQL Editor först.');
  }
  return new Error(msg);
}

// ── SERVICES ────────────────────────────────────────────────
//  includeUnpublished=true → dashboarden (alla statusar).
//  false → publika sidan (endast published).
export async function listServices({ includeUnpublished = false } = {}) {
  let q = client().from('services').select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });
  if (!includeUnpublished) q = q.eq('status', 'published');
  const { data, error } = await q;
  const e = wrap(error, 'Kunde inte hämta tjänster.');
  if (e) throw e;
  return data || [];
}

export async function createService(payload) {
  const { data, error } = await client().from('services')
    .insert(cleanService(payload)).select().single();
  const e = wrap(error, 'Kunde inte skapa tjänst.');
  if (e) throw e;
  return data;
}

export async function updateService(id, patch) {
  const { data, error } = await client().from('services')
    .update(cleanService(patch)).eq('id', id).select().single();
  const e = wrap(error, 'Kunde inte uppdatera tjänst.');
  if (e) throw e;
  return data;
}

export async function setServiceStatus(id, status) {
  return updateService(id, { status });
}

export async function deleteService(id) {
  const { error } = await client().from('services').delete().eq('id', id);
  const e = wrap(error, 'Kunde inte ta bort tjänst.');
  if (e) throw e;
}

function cleanService(p) {
  const out = {};
  if (p.name !== undefined) out.name = String(p.name).trim();
  if (p.description !== undefined) out.description = String(p.description || '');
  if (p.pricing_type !== undefined) out.pricing_type = p.pricing_type === 'per_sqm' ? 'per_sqm' : 'fixed';
  if (p.base_price !== undefined) out.base_price = toMoney(p.base_price);
  if (p.unit_label !== undefined) out.unit_label = String(p.unit_label || '');
  if (p.status !== undefined) out.status = p.status;
  if (p.sort_order !== undefined) out.sort_order = parseInt(p.sort_order, 10) || 0;
  return out;
}

// ── ADD-ONS ─────────────────────────────────────────────────
export async function listAddons({ includeUnpublished = false } = {}) {
  let q = client().from('add_ons').select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });
  if (!includeUnpublished) q = q.eq('status', 'published');
  const { data, error } = await q;
  const e = wrap(error, 'Kunde inte hämta tillval.');
  if (e) throw e;
  return data || [];
}

export async function createAddon(payload) {
  const { data, error } = await client().from('add_ons')
    .insert(cleanAddon(payload)).select().single();
  const e = wrap(error, 'Kunde inte skapa tillval.');
  if (e) throw e;
  return data;
}

export async function updateAddon(id, patch) {
  const { data, error } = await client().from('add_ons')
    .update(cleanAddon(patch)).eq('id', id).select().single();
  const e = wrap(error, 'Kunde inte uppdatera tillval.');
  if (e) throw e;
  return data;
}

export async function setAddonStatus(id, status) {
  return updateAddon(id, { status });
}

export async function deleteAddon(id) {
  const { error } = await client().from('add_ons').delete().eq('id', id);
  const e = wrap(error, 'Kunde inte ta bort tillval.');
  if (e) throw e;
}

function cleanAddon(p) {
  const out = {};
  if (p.name !== undefined) out.name = String(p.name).trim();
  if (p.description !== undefined) out.description = String(p.description || '');
  if (p.price !== undefined) out.price = toMoney(p.price);
  if (p.status !== undefined) out.status = p.status;
  if (p.sort_order !== undefined) out.sort_order = parseInt(p.sort_order, 10) || 0;
  return out;
}

// ── QUOTE REQUESTS ──────────────────────────────────────────
export async function listQuoteRequests() {
  const { data, error } = await client().from('quote_requests').select('*')
    .order('created_at', { ascending: false });
  const e = wrap(error, 'Kunde inte hämta offertförfrågningar.');
  if (e) throw e;
  return data || [];
}

export async function createQuoteRequest(payload) {
  const row = {
    customer_name: String(payload.customer_name || '').trim(),
    customer_email: String(payload.customer_email || '').trim(),
    customer_phone: String(payload.customer_phone || '').trim(),
    service_id: payload.service_id || null,
    service_name: String(payload.service_name || '').trim(),
    addons_snapshot: Array.isArray(payload.addons_snapshot) ? payload.addons_snapshot : [],
    project_area: payload.project_area === '' || payload.project_area == null
      ? null : toMoney(payload.project_area),
    project_details: String(payload.project_details || ''),
    estimated_price: toMoney(payload.estimated_price),
    status: 'new',
  };
  const { data, error } = await client().from('quote_requests')
    .insert(row).select().single();
  const e = wrap(error, 'Kunde inte spara offertförfrågan.');
  if (e) throw e;
  return data;
}

export async function updateQuoteStatus(id, status) {
  const { data, error } = await client().from('quote_requests')
    .update({ status }).eq('id', id).select().single();
  const e = wrap(error, 'Kunde inte uppdatera status.');
  if (e) throw e;
  return data;
}

// ── PRISLOGIK (delad — samma resultat på båda sidor) ─────────
//  Tjänstekostnad: per_sqm → base_price × area, annars base_price.
//  + summan av valda tillvalspriser.
export function serviceCost(service, area) {
  if (!service) return 0;
  const base = toMoney(service.base_price);
  if (service.pricing_type === 'per_sqm') {
    const a = Math.max(0, toMoney(area));
    return base * a;
  }
  return base;
}

export function calculateEstimate(service, selectedAddons, area) {
  const addons = (selectedAddons || []).reduce((sum, a) => sum + toMoney(a.price), 0);
  return Math.round((serviceCost(service, area) + addons) * 100) / 100;
}

// ── HJÄLPARE ────────────────────────────────────────────────
export function toMoney(v) {
  if (typeof v === 'number') return isFinite(v) ? v : 0;
  const n = parseFloat(String(v).replace(/\s/g, '').replace(',', '.'));
  return isFinite(n) ? n : 0;
}

const _sek = new Intl.NumberFormat('sv-SE', {
  style: 'currency', currency: 'SEK', maximumFractionDigits: 0,
});
export function formatSEK(v) {
  return _sek.format(Math.round(toMoney(v)));
}

export const STATUS_LABELS = {
  new: 'Ny', contacted: 'Kontaktad', quoted: 'Offert skickad',
  won: 'Vunnen', lost: 'Förlorad', archived: 'Arkiverad',
};
export const SERVICE_STATUS_LABELS = {
  draft: 'Utkast', published: 'Publicerad', archived: 'Arkiverad',
};
