# GD Måleri — struktur på gdmaleri.se

Ur `extern/gdmaleri/kopiera.mjs` (SLUGS) och `app/sitemap.js`, 2026-10-10, fyra nya tjänstesidor 2026-10-13.

| Sökväg | Demo-mapp i web/ | Sida |
|---|---|---|
| `/` | `gdmaleri/page.js` | Startsida |
| `/fasad-malning/` | `gdmaleri/fasad/` | Fasadtvätt och fasadmålning (gammal WP-slug) |
| `/takmalning/` | `gdmaleri/tak/` | Taktvätt och takmålning (gammal WP-slug) |
| `/malning-invandigt/` | `gdmaleri/invandig-malning/` | Invändig målning och tapet (gammal WP-slug) |
| `/golv/` | `gdmaleri/golv/` | Golvläggning och golvslipning (ny) |
| `/brf/` | `gdmaleri/brf/` | Målning för BRF (ny) |
| `/tapetsering/` | `gdmaleri/tapetsering/` | Tapetsering, bredspackling och tapetborttagning (gammal WP-slug, egen sida igen 2026-10-13) |
| `/snickerier-fonster-malning/` | `gdmaleri/snickerier-fonster-malning/` | Fönster, dörrar och snickerier (gammal WP-slug, egen sida igen 2026-10-13) |
| `/fasadtvatt/` | `gdmaleri/fasadtvatt/` | Fasadtvätt (ny 2026-10-13) |
| `/taktvatt/` | `gdmaleri/taktvatt/` | Taktvätt (ny 2026-10-13) |
| `/integritet/` | `gdmaleri/integritet/` | Integritet och cookies (2026-10-13, inte i sitemapen; länkad i footern) |

301 från gamla WordPress-sidor (`extern/gdmaleri/next.config.mjs`):
- `/vara-tjanster/`, `/offert/`, `/kontakta-oss/`, `/om-oss/`, `/galleri/`, `/utforda-arbeten/` → `/`
- `/bredspackling-tapetborttagning/` → `/tapetsering/`
- `/fasadmalning-{bromma,taby,danderyd,huddinge,lidingo,sollentuna}/` → `/fasad-malning/`
- (`/tapetsering/` och `/snickerier-fonster-malning/` 301:ades till 2026-10-13, nu egna sidor)
- `/wp-content/*`, `/feed/` → `/` · `/wp-admin/*` → v1.gdmaleri.se (tillfällig)
