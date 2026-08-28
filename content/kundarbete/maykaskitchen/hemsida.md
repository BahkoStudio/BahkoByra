# Mayka's Kitchen — hemsida

| | |
|---|---|
| Live-URL | https://maykaskitchen.se |
| Källkod (i detta repo) | `bahkobyra/cloud/maykaskitchen/` |
| Deploy | `.github/workflows/deploy.yml` — publicerar LIVE vid varje push till `main` (delar pipeline med bahkobyra.se, se bifynd nedan) |
| Kund sedan | **TODO — inget datum dokumenterat** |
| Status | Avlyft från 🔒 2026-08-21 (se `docs/heligt.md`, avsnitt "Avlyft") |

## OBS — gap i dokumentationen (2026-08-26)
Repot har hittills bara behandlat den här sajten som en referens-/exempelsajt
för `video-to-website`-skillen, inte som en kunds sajt. Mathias bekräftade
2026-08-26 att det är en riktig kund. Följande saknas helt och bör fyllas i:
- Kontaktperson/ägare
- Vad avtalet omfattar (bara sajten, eller löpande arbete?)
- Drive-mapp (se `drive.md`)
- SEO/GEO/AEO-uppgifter (se `seo-geo-aeo.md`)

**Bifynd:** eftersom sajten delar deploy-pipeline med bahkobyra.se publiceras
den om vid VARJE push till huvudgrenen, oavsett om ändringen rör Mayka's
Kitchen eller inte. Värt en egen, avskild deploy-trigger nu när den är en
riktig kund — inte löst i den här filen.

## Sidor
Se `struktur.md` i den här mappen.
