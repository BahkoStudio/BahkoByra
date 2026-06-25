-- ============================================================
--  Bahko Byrå — Offert-estimator
--  Supabase-schema (services, add_ons, quote_requests)
--  Kör hela filen EN gång i Supabase → SQL Editor → New query.
--  Skriptet är idempotent: går bra att köra om.
-- ============================================================

-- ── SERVICES (tjänster) ─────────────────────────────────────
create table if not exists public.services (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  description   text not null default '',
  pricing_type  text not null default 'fixed'
                  check (pricing_type in ('fixed','per_sqm')),
  base_price    numeric(12,2) not null default 0 check (base_price >= 0),
  unit_label    text not null default '',          -- t.ex. "per m²" / "fast pris"
  status        text not null default 'draft'
                  check (status in ('draft','published','archived')),
  sort_order    int not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ── ADD-ONS (tillval) ───────────────────────────────────────
create table if not exists public.add_ons (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  description   text not null default '',
  price         numeric(12,2) not null default 0 check (price >= 0),
  status        text not null default 'draft'
                  check (status in ('draft','published','archived')),
  sort_order    int not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ── QUOTE REQUESTS (offertförfrågningar) ────────────────────
--  service_name, addons_snapshot och estimated_price sparas som
--  ögonblicksbild så att förfrågan speglar priserna VID inskick,
--  även om katalogen ändras senare.
create table if not exists public.quote_requests (
  id               uuid primary key default gen_random_uuid(),
  customer_name    text not null,
  customer_email   text not null,
  customer_phone   text not null default '',
  service_id       uuid references public.services(id) on delete set null,
  service_name     text not null,                  -- snapshot
  addons_snapshot  jsonb not null default '[]'::jsonb, -- [{id,name,price}]
  project_area     numeric(12,2),                  -- m², kan vara null
  project_details  text not null default '',
  estimated_price  numeric(12,2) not null default 0,
  status           text not null default 'new'
                     check (status in ('new','contacted','quoted','won','lost','archived')),
  created_at       timestamptz not null default now()
);

create index if not exists idx_quote_requests_created on public.quote_requests (created_at desc);
create index if not exists idx_services_sort on public.services (sort_order, created_at);
create index if not exists idx_add_ons_sort on public.add_ons (sort_order, created_at);

-- ── updated_at-trigger ──────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_services_updated on public.services;
create trigger trg_services_updated before update on public.services
  for each row execute function public.set_updated_at();

drop trigger if exists trg_add_ons_updated on public.add_ons;
create trigger trg_add_ons_updated before update on public.add_ons
  for each row execute function public.set_updated_at();

-- ── Row Level Security ──────────────────────────────────────
--  OBS: detta är en demo UTAN inloggning. Dashboarden använder samma
--  publika anon-nyckel som den publika sidan, så anon måste tillåtas
--  hantera katalogen. Lås detta innan skarp drift (t.ex. flytta
--  dashboarden bakom Supabase Auth och begränsa write till authenticated).
alter table public.services       enable row level security;
alter table public.add_ons        enable row level security;
alter table public.quote_requests enable row level security;

drop policy if exists "anon read services"  on public.services;
drop policy if exists "anon write services" on public.services;
create policy "anon read services"  on public.services for select using (true);
create policy "anon write services" on public.services for all using (true) with check (true);

drop policy if exists "anon read add_ons"  on public.add_ons;
drop policy if exists "anon write add_ons" on public.add_ons;
create policy "anon read add_ons"  on public.add_ons for select using (true);
create policy "anon write add_ons" on public.add_ons for all using (true) with check (true);

drop policy if exists "anon insert quotes" on public.quote_requests;
drop policy if exists "anon read quotes"   on public.quote_requests;
drop policy if exists "anon update quotes" on public.quote_requests;
create policy "anon insert quotes" on public.quote_requests for insert with check (true);
create policy "anon read quotes"   on public.quote_requests for select using (true);
create policy "anon update quotes" on public.quote_requests for update using (true) with check (true);

-- ── Startkatalog (frivillig demo-data) ──────────────────────
insert into public.services (name, description, pricing_type, base_price, unit_label, status, sort_order)
select * from (values
  ('Takbyte',           'Komplett takbyte inkl. rivning, underlagstäckning och nytt yttertak.', 'per_sqm', 950::numeric,    'per m²',    'published', 1),
  ('Fasadrenovering',   'Puts, målning och fasadtvätt för ett fräscht och skyddat hus.',        'per_sqm', 750::numeric,    'per m²',    'published', 2),
  ('Altanbygge',        'Måttbyggd altan i tryckimpregnerat virke eller komposit.',             'fixed',   45000::numeric,  'fast pris', 'published', 3),
  ('Badrumsrenovering', 'Totalrenovering med tätskikt, kakel och VVS enligt branschregler.',    'fixed',   120000::numeric, 'fast pris', 'draft',     4)
) as v(name, description, pricing_type, base_price, unit_label, status, sort_order)
where not exists (select 1 from public.services);

insert into public.add_ons (name, description, price, status, sort_order)
select * from (values
  ('Bortforsling av rivningsmaterial', 'Vi tar hand om allt rivningsavfall och kör till återvinning.', 6500::numeric, 'published', 1),
  ('Express-start inom 2 veckor',      'Prioriterad inplanering och snabbare byggstart.',              9000::numeric, 'published', 2),
  ('Förlängd garanti 10 år',           'Utökad garanti på utfört arbete och material.',                4500::numeric, 'published', 3),
  ('Ritning & bygglovshjälp',          'Vi tar fram underlag och hjälper er genom bygglovsprocessen.', 7500::numeric, 'published', 4)
) as v(name, description, price, status, sort_order)
where not exists (select 1 from public.add_ons);
