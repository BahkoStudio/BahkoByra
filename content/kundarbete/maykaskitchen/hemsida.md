# Mayka's Kitchen — hemsida

| | |
|---|---|
| Live-URL | https://maykaskitchen.se |
| Redigeringskälla (detta repo) | `bahkobyra/cloud/maykaskitchen/` — **ändra alltid här** |
| Serveras av | Vercel-projektet `mayka`, ur repot `BahkoStudio/MaykaKitchen` (gren `main`) |
| Sökväg i det repot | `.claude/skills/video-to-website/maykas/site/` (satt via dess `vercel.json` → outputDirectory) |
| Deploy | `.github/workflows/deploy.yml` synkar hit vid push till `main` som rör kundmappen. Vercel bygger sedan om automatiskt |
| Kund sedan | **TODO — inget datum dokumenterat** |
| Status | Avlyft från 🔒 2026-08-21 (se `docs/heligt.md`, avsnitt "Avlyft") |

## ⚠ Sajten bor i TVÅ repon
Redigera aldrig direkt i `BahkoStudio/MaykaKitchen` — då skrivs ändringen över nästa
gång workflowen synkar. All redigering sker i `bahkobyra/cloud/maykaskitchen/`.

**Historik:** fram till 2026-08-28 publicerade workflowen till en `gh-pages`-gren i
MaykaKitchen som ingenting serverar (DNS pekar på Vercel, inte GitHub Pages). Varje
körning blev grön medan sajten stod stilla. Upptäcktes när ett nytt recept inte syntes.

## OBS — gap i dokumentationen (2026-08-26)
Repot har hittills bara behandlat den här sajten som en referens-/exempelsajt
för `video-to-website`-skillen, inte som en kunds sajt. Mathias bekräftade
2026-08-26 att det är en riktig kund. Följande saknas helt och bör fyllas i:
- Kontaktperson/ägare
- Vad avtalet omfattar (bara sajten, eller löpande arbete?)
- Drive-mapp (se `drive.md`)
- SEO/GEO/AEO-uppgifter (se `seo-geo-aeo.md`)

**Löst 2026-08-28:** workflowen triggas nu bara när något i den här kundmappen
ändras, inte vid varje push till main.

## Sidor
Se `struktur.md` i den här mappen.
