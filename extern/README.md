# extern/ — demos som publiceras på egna Vercel-adresser

Undantag (Mathias 2026-09-19): några få demos är gjorda åt en annan firma och ska
ha en egen `*.vercel.app`-adress i stället för `bahkobyra.se/<kund>/`. Just nu gäller
det bara:

| Mapp | Vercel-projekt | Källa |
|---|---|---|
| `extern/hg/` | `hg-maskinentreprenad` | `web/app/(demo)/hg/` + `web/public/hg/` |
| `extern/rolssons/` | `rolssons-maleri` | `web/app/(demo)/rolssons/` + `web/public/rolssons/` |
| `extern/gdmaleri/` | `gdmaleri` | `web/app/(demo)/gdmaleri/` (alla sex sidorna) + `web/public/gdmaleri/` — **kundsajt på gdmaleri.se** |

**Här finns ingen egen kopia av sidan.** `kopiera.mjs` körs före varje bygge och
hämtar demomallen (`web/app/(demo)/_mall/`), kundens `page.js` och kundens media
från `web/`. Ändra alltså demon på det vanliga stället — båda adresserna följer med.

Vercel bygger bara om projektet när något av det som kopieras har ändrats
(`ignoreCommand` i `vercel.json`), så vanliga pushar till main kostar inga extra
deploys.

Lägg inte till fler demos här utan att Mathias sagt att de är undantag.

## gdmaleri — kundsajt på egen domän (Mathias 2026-10-10)

Inte ett undantag utan en riktig kund: GD Måleri Sthlm AB på **gdmaleri.se**. Samma
princip som ovan, men `kopiera.mjs` gör tre saker till:

- Kopierar **hela** `(demo)/gdmaleri/` till route-gruppen `app/(gd)/` (sex sidor + `_gd.js`),
  och mallen till `app/_mall/` — samma inbördes läge som i `web/`, så importerna funkar orörda.
- Skriver om sökvägarna: `/gdmaleri/` → `/`, och tjänstesidorna får WordPress-sajtens gamla
  slugs (`fasad` → `/fasad-malning/`, `tak` → `/takmalning/`, `invandig-malning` →
  `/malning-invandigt/`; `golv` och `brf` heter samma). Mediasökvägen `/gdmaleri/media/`
  behålls. En ny undersida i web/ utan rad i `SLUGS` får bygget att faila med flit.
- Byter `FILBAS` i schemat till `https://gdmaleri.se`.

`next.config.mjs` här 301:ar de gamla WordPress-URL:erna. Den gamla WordPress-sajten flyttas
till **v1.gdmaleri.se** (egen host, krockar inte med reglerna). Redigera alltid sajten i
`web/app/(demo)/gdmaleri/` — demon på bahkobyra.se/gdmaleri/ och gdmaleri.se följer med.
Se `content/kundarbete/gdmaleri/hemsida.md` för Vercel-, DNS- och uppföljningslistan.
