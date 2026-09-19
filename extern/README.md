# extern/ — demos som publiceras på egna Vercel-adresser

Undantag (Mathias 2026-09-19): några få demos är gjorda åt en annan firma och ska
ha en egen `*.vercel.app`-adress i stället för `bahkobyra.se/<kund>/`. Just nu gäller
det bara:

| Mapp | Vercel-projekt | Källa |
|---|---|---|
| `extern/hg/` | `hg-maskinentreprenad` | `web/app/(demo)/hg/` + `web/public/hg/` |
| `extern/rolssons/` | `rolssons-maleri` | `web/app/(demo)/rolssons/` + `web/public/rolssons/` |

**Här finns ingen egen kopia av sidan.** `kopiera.mjs` körs före varje bygge och
hämtar demomallen (`web/app/(demo)/_mall/`), kundens `page.js` och kundens media
från `web/`. Ändra alltså demon på det vanliga stället — båda adresserna följer med.

Vercel bygger bara om projektet när något av det som kopieras har ändrats
(`ignoreCommand` i `vercel.json`), så vanliga pushar till main kostar inga extra
deploys.

Lägg inte till fler demos här utan att Mathias sagt att de är undantag.
