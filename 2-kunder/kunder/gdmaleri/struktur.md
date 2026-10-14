# GD Måleri — struktur på gdmaleri.se

Ur `extern/gdmaleri/kopiera.mjs` (SLUGS) och `app/sitemap.js`, 2026-10-10, fyra nya tjänstesidor 2026-10-13, guidesidan och sju ortssidor 2026-10-14.

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
| `/basta-malare-stockholm/` | `gdmaleri/basta-malare-stockholm/` | Guide: Bästa målaren i Stockholm? Så väljer du rätt målerifirma (ny 2026-10-14; länkad i footerns bottenrad och startsidans Om oss, inte i mobilmenyn) |
| `/fasadmalning-bromma/` | `gdmaleri/fasadmalning-bromma/` | Ortssida: Fasadmålning i Bromma (gammal WP-slug, egen sida igen 2026-10-14; belagt jobb 234 kvm) |
| `/fasadmalning-taby/` | `gdmaleri/fasadmalning-taby/` | Ortssida: Fasadmålning i Täby (gammal WP-slug, egen sida igen 2026-10-14; belagt jobb 350 kvm i Täby kyrkby) |
| `/malare-sodertalje/` | `gdmaleri/malare-sodertalje/` | Ortssida: Målare i Södertälje (ny 2026-10-14; säte, belagt jobb 180 kvm tak och väggar) |
| `/fasadmalning-lidingo/` | `gdmaleri/fasadmalning-lidingo/` | Ortssida: Fasadmålning på Lidingö (gammal WP-slug, egen sida igen 2026-10-14; inget belagt jobb) |
| `/fasadmalning-sollentuna/` | `gdmaleri/fasadmalning-sollentuna/` | Ortssida: Fasadmålning i Sollentuna (gammal WP-slug, egen sida igen 2026-10-14; inget belagt jobb) |
| `/fasadmalning-huddinge/` | `gdmaleri/fasadmalning-huddinge/` | Ortssida: Fasadmålning i Huddinge (gammal WP-slug, egen sida igen 2026-10-14; inget belagt jobb) |
| `/fasadmalning-danderyd/` | `gdmaleri/fasadmalning-danderyd/` | Ortssida: Fasadmålning i Danderyd (gammal WP-slug, egen sida igen 2026-10-14; inget belagt jobb) |
| `/integritet/` | `gdmaleri/integritet/` | Integritet och cookies (2026-10-13, inte i sitemapen; länkad i footern) |

301 från gamla WordPress-sidor (`extern/gdmaleri/next.config.mjs`):
- `/vara-tjanster/`, `/offert/`, `/kontakta-oss/`, `/om-oss/`, `/galleri/`, `/utforda-arbeten/` → `/`
- `/bredspackling-tapetborttagning/` → `/tapetsering/`
- (`/fasadmalning-{bromma,taby,danderyd,huddinge,lidingo,sollentuna}/` 308:ades till `/fasad-malning/` till 2026-10-14, nu egna ortssidor)
- (`/tapetsering/` och `/snickerier-fonster-malning/` 301:ades till 2026-10-13, nu egna sidor)
- `/wp-content/*`, `/feed/` → `/` · `/wp-admin/*` → v1.gdmaleri.se (tillfällig)

Ortssidorna länkas från footerns rad "Där vi jobbar" på alla GD-sidor (mallfältet `footer.orter`, `ORTER` i `_gd.js`), en mening i startsidans Om oss och frågan "Var arbetar ni?" på `/fasad-malning/`. Inte i mobilmenyn. Sitemapen har 18 URL:er.

301 från bahkobyra.se (`web/next.config.mjs`): `/gdmaleri/<mapp>/` → `gdmaleri.se/<slug>/` för alla sidor ovan, ortssidorna med samma namn på båda ställena.
