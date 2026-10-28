# Proffsmaskiner — struktur på proffsmaskiner.se

En sida (one-pager) med ankare, ur `web/app/(demo)/proffsmaskiner/page.js` 2026-10-28.

| Sökväg | Källa | Sida |
|---|---|---|
| `/` | `proffsmaskiner/page.js` | Startsida: hero (tom tomt blir etablerad arbetsplats), maskinkategorier, därför Proffsmaskiner, vanliga frågor, kontakt och formulär |

Egen robots.txt och sitemap.xml på kunddomänen kommer ur `web/middleware.js`.

301 på kunddomänen (middleware, `enkelsida: true`): alla gamla WordPress-adresser utan
filändelse → `/`. Kända gamla adresser enligt gamla sajtens sitemap 2026-10-28:
`/om-oss/`, `/hyra-snoskoter/`, `/kontakt/`, `/maskiner/`.

På bahkobyra.se: `/proffsmaskiner/` finns kvar med noindex (så demolänken i Peters inkorg
fortsätter fungera), utan demorutan när sidan serveras på kunddomänen.
