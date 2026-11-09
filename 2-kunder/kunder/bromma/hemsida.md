# Bromma Trädgårdsservice — hemsida

| | |
|---|---|
| Live-URL | https://brommatradgardsservice.se |
| Källkod (i detta repo) | Ny design (v3, vinter): `web/app/(demo)/bromma/` + `web/public/bromma/`, byggs för domänen av `extern/bromma/` (`kopiera.mjs`). Gamla statiska sajten: `bahkobyra/cloud/brommatradgardsservice/` (orörd, även taggen `bromma-gammal-design-2026-11-08`) |
| Kund sedan | (se `seo-geo-aeo.md` / rapporter för historik) |
| Vercel-projekt | Idag: `brommatradgardsservice.se`, Root Directory `bahkobyra/cloud/brommatradgardsservice`, Framework Other. Efter domänbytet: `bromma`, Root Directory `extern/bromma`, Framework Next.js (se nedan) |
| Status | 🔒 **Rör aldrig utan Mathias uttryckliga ja** — se `docs/heligt.md` |

Statisk sajt, inga byggsteg, inga beroenden. Full deploy-dokumentation ligger i
`bahkobyra/cloud/brommatradgardsservice/README.md` — läs den innan något som
rör hemsidan ändras.

## Sidor
Se `struktur.md` i den här mappen för fullständig sidlista.

## Kontakt/ägare
Jens (se `produktionsrutin.md` i den här mappen för samarbetsrutinen).

## Domänbytet till v3 (Mathias "Byt domän" 2026-11-09)

Koden ligger i `extern/bromma/`. Själva bytet görs i Vercel-dashboarden (Root Directory ändras aldrig från kod):

1. Nytt projekt `bromma`: repo `BahkoStudio/BahkoByra`, gren `main`, Root Directory `extern/bromma`,
   "Include files outside the root directory" PÅ, Framework Next.js, Build `npm run build`, Install `npm install`.
2. Kontrollera `*.vercel.app`-adressen: startsidan, `/snorojning/`, `/robots.txt`, `/sitemap.xml`, formuläret.
3. Flytta domänerna `brommatradgardsservice.se` (primär) och `www.brommatradgardsservice.se` (308 till apex)
   från projektet `brommatradgardsservice.se` till `bromma`. DNS hos Loopia ändras inte, och MX rörs aldrig.
4. Tillbaka till gamla sajten: flytta domänerna tillbaka till `brommatradgardsservice.se`.

Efter bytet: lämna in sitemapen i Search Console igen, och 301:a `bahkobyra.se/bromma/*` till domänen
i 🔒 `web/next.config.mjs` (egen PR, först när domänen visar v3). Tills dess har demon kvar noindex.

Mätning: den gamla sajten hade GA4 (G-1EKF0NFE5M) bakom samtyckesbanner. Mallen v3 har ingen GA4,
så efter bytet räknas leads bara i Web3Forms (samma nyckel och mottagare som förut).
