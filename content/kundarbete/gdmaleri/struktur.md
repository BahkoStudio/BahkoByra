# GD Måleri — struktur på gdmaleri.se

Ur `extern/gdmaleri/kopiera.mjs` (SLUGS) och `app/sitemap.js`, 2026-10-10.

| Sökväg | Demo-mapp i web/ | Sida |
|---|---|---|
| `/` | `gdmaleri/page.js` | Startsida |
| `/fasad-malning/` | `gdmaleri/fasad/` | Fasadtvätt och fasadmålning (gammal WP-slug) |
| `/takmalning/` | `gdmaleri/tak/` | Taktvätt och takmålning (gammal WP-slug) |
| `/malning-invandigt/` | `gdmaleri/invandig-malning/` | Invändig målning och tapet (gammal WP-slug) |
| `/golv/` | `gdmaleri/golv/` | Golvläggning och golvslipning (ny) |
| `/brf/` | `gdmaleri/brf/` | Målning för BRF (ny) |

301 från gamla WordPress-sidor (`extern/gdmaleri/next.config.mjs`):
- `/vara-tjanster/`, `/offert/`, `/kontakta-oss/`, `/om-oss/`, `/galleri/`, `/utforda-arbeten/` → `/`
- `/tapetsering/`, `/bredspackling-tapetborttagning/` → `/malning-invandigt/`
- `/snickerier-fonster-malning/`, `/fasadmalning-{bromma,taby,danderyd,huddinge,lidingo,sollentuna}/` → `/fasad-malning/`
- `/wp-content/*`, `/feed/` → `/` · `/wp-admin/*` → v1.gdmaleri.se (tillfällig)
