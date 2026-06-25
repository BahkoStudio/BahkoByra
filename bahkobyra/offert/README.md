# Offert-estimator — Bahko Byrå

En liten "quote estimator manager" för bygg/hantverk. Priser och katalog
styrs från en dashboard (utan inloggning). Den publika sidan räknar ut ett
riktpris från **live-data i Supabase** och sparar besökarens förfrågan för
uppföljning.

## Filer

| Fil | Roll |
|-----|------|
| `schema.sql` | Skapar tabellerna `services`, `add_ons`, `quote_requests` + RLS + demo-data. Kör en gång i Supabase. |
| `supabase.js` | Delat datalager: Supabase-klient, CRUD och **prislogiken** (samma uträkning på båda sidor). |
| `dashboard.html` | Admin (ingen inloggning): hantera tjänster, tillval, priser och se inkomna förfrågningar. |
| `index.html` | Publik estimator: välj tjänst + tillval, se pris direkt, skicka förfrågan. |

## Kom igång (3 steg)

1. **Skapa tabeller.** Supabase → SQL Editor → New query → klistra in hela
   `schema.sql` → Run. (Idempotent — går att köra om. Lägger även in
   demo-tjänster och tillval.)

2. **Anslut.** Hämta `Project URL` + `anon public`-nyckeln i Supabase →
   Project Settings → API. Antingen:
   - **Snabbt:** öppna `dashboard.html`, klicka **Anslut Supabase**, klistra
     in värdena (sparas i webbläsarens localStorage), eller
   - **För produktion:** skriv in dem i `HARDCODED` högst upp i `supabase.js`.

3. **Använd.**
   - `dashboard.html` — lägg till/redigera tjänster och tillval, sätt
     baspriser, publicera/arkivera, och följ inkomna förfrågningar.
   - `index.html` — den publika sidan besökarna får. Visar bara
     **publicerade** tjänster/tillval.

Lokalt: `node server.js` → `http://localhost:3001/offert/dashboard.html`.

## Prismodell ("configurable business logic")

Allt pris styrs av datan i Supabase, inte av kod:

- **Tjänst** har `pricing_type`:
  - `fixed` → tjänstekostnad = `base_price`.
  - `per_sqm` → tjänstekostnad = `base_price × yta (m²)`. Besökaren anger ytan.
- **Tillval** lägger till sitt `price` ovanpå.
- **Uppskattning** = tjänstekostnad + summan av valda tillval.

Uträkningen ligger i `calculateEstimate()` i `supabase.js` och används av
**både** den publika sidan (för direktvisning) och vid inskick (priset som
sparas). Förfrågan sparar en **ögonblicksbild** av tjänstenamn, valda tillval
och priset, så att gamla förfrågningar inte ändras när du justerar katalogen.

## Statusflöden

- **Tjänst / tillval:** `draft` (dold) → `published` (syns publikt) →
  `archived`. Avpublicera = tillbaka till `draft`.
- **Förfrågan:** `new` → `contacted` → `quoted` → `won` / `lost` /
  `archived`. Ändras via rullgardinen i dashboardens flik
  *Offertförfrågningar*.

## Säkerhet (viktigt)

Detta är en **demo utan inloggning**. RLS är på, men policyn tillåter anon att
hantera katalogen eftersom dashboarden använder samma publika anon-nyckel som
den publika sidan. Innan skarp drift: flytta dashboarden bakom Supabase Auth
och begränsa skriv-policyn på `services`/`add_ons` till `authenticated`. Den
publika sidan behöver bara `select` (published) på katalogen + `insert` på
`quote_requests`.
