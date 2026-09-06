# Demolänkar — index

Alla demosajter som finns att skicka till prospekt eller visa i content, med
källa och känslighetsstatus. Byggd 2026-08-26. Uppdatera raden när en ny demo
skapas eller en lead blir kund (flytta då till `content/kundarbete/<kund>/`).

Två tekniska nivåer, båda serveras av `web`-appen (`next start`, se
`.claude/skills/hemsidor/SKILL.md`):
- **Next.js-mallar** (`web/app/(demo)/<kund>/`) → `bahkobyra.se/<kund>/`
- **Statiska demos** (`web/public/cloud/<kund>/`) → `bahkobyra.se/cloud/<kund>/`

🔒 = listad i `docs/heligt.md`, rör inte utan Mathias ja.

| Demo | Nisch | Källa | Äkta lead / generisk | 🔒 | Notis |
|---|---|---|---|---|---|
| nordicsnickare | Snickeri, renovering, gips (Stockholm) | `web/app/(demo)/nordicsnickare/` | Äkta lead (IG @nordicsnickare) | | Mallkanon 2026-08-21 → ersatt av golvvision 2026-09-06 (saknar modulerna) |
| golvvision | Golvavjämning, mattläggning, plattsättning, parkett (Älvsjö, Stockholm) | `web/app/(demo)/golvvision/` | Äkta lead (IG @golvvisionstockholm, golvvision.se) | | **Ny mall-kanon 2026-09-06** — första demon med modulerna (lager-hero, Varför oss-film, omdömen, sociala). Riktigt telefonnummer och e-post på sidan (från deras sajt) — visa INTE offentligt. `content/leads/golvvision.md` |
| shabifix | Bygg + snickeri + måleri (Göteborg) | `web/app/(demo)/shabifix/` | Äkta lead, demo skickad | | `/cloud/shabifix` 301:ar hit — får aldrig brytas |
| glowingservice | Måleri | `web/app/(demo)/glowingservice/` | Äkta lead | | Ingen ort på sidan, medvetet |
| svhus | Nybyggnation/totalentreprenad (Österåker) | `web/app/(demo)/svhus/` | Äkta företag, verifierat | | Äldre mall — kopiera INTE längre. Org.nr + riktigt telefonnr på sidan |
| bygg (GRANIT) | Totalentreprenad (Mälardalen) | `web/public/cloud/bygg/` | Fiktivt flaggskepp | | Länkad från bahkobyra.se `/case` — säkrast att visa offentligt |
| vajjebygg | Nybyggnation & renovering (Skåne) | `web/public/cloud/vajjebygg/` | Redan publik | | Länkad från `/case` |
| asmar | Relining/rör | `web/public/cloud/asmar/` | Redan publik | | Länkad från `/case` |
| alfredallservice | Allservice/renovering (Nässjö) | `web/public/cloud/alfredallservice/` | Äkta lead | 🔒 | `content/leads/alfred_allservice.md` |
| ekstromsbygg | Golv/parkett | `web/public/cloud/ekstromsbygg/` | Äkta lead, aktiv dialog | | Org.nr, telefon, e-post på sidan — visa INTE offentligt |
| tryggbyggservice | Badrum & renovering | `web/public/cloud/tryggbyggservice/` | Äkta lead | 🔒 | `content/leads/tryggbyggservice.md` |
| alggarden | Tak & fasad (Södertälje) | `web/public/cloud/alggarden/` | Generisk/overifierad | | |
| galiano | Måleri/renovering (Södertälje) | `web/public/cloud/galiano/` | Real-ish (AB-namn) | | |
| golvresan (FloorMagic) | Golvslipning/golvläggning | `web/public/cloud/golvresan/` | Troligen fiktiv | | |
| grontoglanser | Softwash fasad/tak (Eskilstuna) | `web/public/cloud/grontoglanser/` | Generisk | | |
| k9maleri | Måleri inne/ute (Göteborg) | `web/public/cloud/k9maleri/` | Generisk mall, äkta kontaktuppgifter i texten | | Telefon, e-post, adress, org.nr på sidan — mest exponerad, visa INTE offentligt |
| kmctransport | Kranbil/transport/bud | `web/public/cloud/kmctransport/` | Generisk | 🔒 | |
| nordiapartner | Taktvätt | `web/public/cloud/nordiapartner/` | Generisk | | |
| osterlunds | Jordbyggnad, infra, sprängning, maskintransport (Oravais, FINLAND) | `web/app/(demo)/osterlunds/` | Äkta lead (IG @osterlundsjordbyggnad) | | Byggd om 2026-08-31 på nya mallen. Gamla `/cloud/osterlunds` 301:ar hit — får aldrig brytas. Den gamla demon sålde villamark och låg fel mot nischen |
| pizzeriamatstugan | Restaurang | `web/public/cloud/pizzeriamatstugan/` | Off-nisch | 🔒 | |
| solpanelstjejen | Solcellsbesiktning (Värmland) | `web/public/cloud/solpanelstjejen/` | Generisk | | |
| mugglagret | E-handel, keramikmuggar | `web/public/cloud/mugglagret/` | Off-nisch | | |
| prismotor | Prissättningsverktyg | `web/public/cloud/prismotor/` | Internt verktyg, ej kunddemo | | |
| sop-ringa | Ring-SOP | `web/public/cloud/sop-ringa/` | Internt, ej kunddemo | | |

## Riktiga kunder (inte demos — se `content/kundarbete/`)
brommatradgardsservice, smamaleri och maykaskitchen har egna live-sajter i
`bahkobyra/cloud/` (🔒) och egna mappar i `content/kundarbete/` — de listas
inte här som "demo" eftersom de redan är levererat kundarbete.

## Platshållarfälla (bifynd 2026-08-26)
`070-123 45 67` är ett klickbart platshållarnummer på flera demos (bygg,
golvresan, nordicsnickare; nya osterlunds anvander 040 123 4567 i finskt format). Städa bort/byt till ett tydligt
"exempel"-nummer innan en demo visas för en riktig prospekt.
