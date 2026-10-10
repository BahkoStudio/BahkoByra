# GD Måleri Sthlm AB — hemsida

| | |
|---|---|
| Live-URL | https://gdmaleri.se (**live sedan 2026-10-11** på Vercel-projektet `gdmaleri`) |
| Gamla sajten | WordPress hos Hostinger → flyttas till **v1.gdmaleri.se** (Mathias 2026-10-10) |
| Källkod (i detta repo) | `web/app/(demo)/gdmaleri/` (sex sidor + `_gd.js`) och `web/public/gdmaleri/`; byggs för domänen av `extern/gdmaleri/` (`kopiera.mjs`) |
| Gamla demo-adressen | https://www.bahkobyra.se/gdmaleri/ → 301 till gdmaleri.se |
| Org.nr | 559468-2444 |
| Telefon / e-post | 073-729 88 89 · info@gdmaleri.se |
| Kontaktperson | Ghandi Danho (ägare) |
| Kund sedan | 2026-10-08 |
| Vercel-projekt | `gdmaleri` (ska skapas av Mathias), Root Directory `extern/gdmaleri`, Framework Next.js |
| E-post | Hostinger Mail (MX mx1/mx2.hostinger.com) — **får inte brytas vid DNS-bytet** |

## Sidor och sökvägar på gdmaleri.se
Se `struktur.md`. Tjänstesidorna behåller WordPress-sajtens slugs.

## Vercel (Mathias, i dashboarden)
- Projektnamn `gdmaleri`, repo `BahkoStudio/BahkoByra`, gren `main`
- Root Directory `extern/gdmaleri` ("Include files outside the root directory" PÅ — kopiera.mjs läser `../../web`)
- Framework Preset Next.js · Build Command `npm run build` (prebuild kör kopiera.mjs) · Install `npm install` · Output: standard
- Miljövariabler (valfria — utan dem visas de statiska omdömena/inläggen): `GOOGLE_PLACES_KEY`, `GDMALERI_RECO_URL`, `GDMALERI_IG_FLODE`
- Domäner: `gdmaleri.se` (primär) + `www.gdmaleri.se` → 308 till `gdmaleri.se`

## DNS hos Hostinger (när projektet byggt grönt på *.vercel.app)
Ändra:
- A `@`: ta bort 37.98.151.201 och 91.108.99.236 → lägg till **76.76.21.21**
- AAAA `@`: ta bort båda (2a02:4780:…)
- CNAME `www`: www.gdmaleri.se.cdn.hstgr.net → **cname.vercel-dns.com** (eller värdet Vercel visar)
- Stäng av Hostingers CDN för domänen
- `v1`: peka på WordPress-installationen enligt Hostingers instruktion när domänen byts där (görs i hPanel, egen host)

Rör INTE: MX (5 mx1 / 10 mx2.hostinger.com), TXT SPF (`v=spf1 include:_spf.mail.hostinger.com include:_spf.reach.hostinger.com ~all`), TXT google-site-verification, TXT `_dmarc`, CNAME `hostingermail-a/-b/-c._domainkey`, CNAME `autodiscover` och `autoconfig`.

## Uppföljning
1. ~~noindex~~ **Klart 2026-10-11:** kopiera.mjs byter sidornas noindex mot self-canonical i extern-bygget (källan i web/ har kvar noindex, men nås inte — 301).
2. **Klart 2026-10-11:** 301 från bahkobyra.se/gdmaleri/* → gdmaleri.se i 🔒 `web/next.config.mjs` (Mathias ja), med slug-kartan.
3. Ghandi bekräftar: AAA-betyg + licens och Måleriföretagen-medlemskap (Samarbeten-bandet), att kontaktuppgifterna får synas offentligt.
4. Search Console (domänegendom, TXT finns), lämna in sitemap; Bing Webmaster.
5. Stäng staging-kopian på hostingersite.com.
6. Ortssidorna (Bromma, Täby …) 301:as till /fasad-malning/ tills riktiga sidor finns (content/leads/gdmaleri.md punkt 6).
