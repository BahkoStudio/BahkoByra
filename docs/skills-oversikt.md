# Skills-översikt

Alla Claude Code-skills som använts i det här systemet, samlade på ett ställe.
Detta är en **lista**, inte en mapp med kopior — skillsen måste ligga kvar där
Claude Code faktiskt letar efter dem (`C:\Users\mathi\.claude\skills\` på
användarnivå, `.claude\skills\` i respektive repo) annars slutar de fungera.
Flytta eller kopiera aldrig en skill-mapp för att "samla" den här.

**Känd förlegad dubblett:** `C:\Users\mathi\OneDrive\Skrivbord\test\.claude\skills\`
är en gammal kopia av samma repo, 12 skills, saknar alla `higgsfield-*`-skills
och `instagram-engine`. Ignorera den — uppdatera aldrig skills där.

Uppdatera den här listan när en ny skill börjar användas eller en befintlig
pensioneras.

## Design-loop-familjen
Sju loopar delar samma motor (`design-loop`): en byggare + tre kritiker med
färsk kontext, runda efter runda tills alla tre godkänner.

| Skill | Vad den gör |
|---|---|
| `design-loop` | Den delade motorn bakom de sex loopar nedan — intervju → förhandsgranskning → nedmontering → loop. |
| `animeringsloop` | Rörelseloop: entré, scrollkoreografi, interaktion, utgång. |
| `copyloop` | Copyloop: rubrik/brödtext/erbjudande/bevis/CTA, noll påhittade fakta. |
| `kundloop` | Loopar en hantverkarsajt tills den vinner kunden över konkurrenten. |
| `kvalitetsloop` | Tillgänglighet, robusthet utan JS, noll påhittade påståenden. |
| `manusloop` | Långa narrationsmanus för YouTube-kanalen Beast of Ages, se `docs/../Skrivbord/youtube/youtube.md`. |
| `strukturloop` | Navigation, sektionsordning, rubrikhierarki. |

## Higgsfield-familjen
Bild/video/3D/ljud-generering via Higgsfield AI.

| Skill | Vad den gör |
|---|---|
| `higgsfield-generate` | Allmän router — väljer rätt modell för bild/video/3D/ljud/Marketing Studio. |
| `higgsfield-brandkit` | Fullständiga varumärkessystem: palett, SVG-logga, typografi, brandbook, förpackning, skyltar. |
| `higgsfield-marketplace-cards` | Marketplace-produktbilder (huvudbild, sekundära bilder, A+-moduler). |
| `higgsfield-product-photoshoot` | Produktfoto i varumärkeskvalitet, 10 lägen (studio, livsstil, hero, ad-pack, try-on). |
| `higgsfield-soul-id` | Tränar en ansiktstrogen identitetsmodell för återanvändning. |
| `higgsfield-video-explainer` | Hel narrerad förklarande video ur 10-sekundersblock. |
| `higgsfield-websites` | Bygger/deployar fullstacksajter, appar och spel. |
| `higgsfield-youtube-thumbnail` | YouTube-thumbnails/Shorts-omslag med hög klickfrekvens. |
| `motion-design` | Logotypanimationer/reklamfilm (brief → storyboard → Seedance-video). |

## Sajtbygge
| Skill | Vad den gör |
|---|---|
| `hemsidor` | Bygger Bahko Byrås kunddemosajter på "bahkomallen" (SV Hus-mallen), Next.js, sanningsregler. |
| `video-to-website` | Gör om en video till en premium scroll-driven animerad sajt. |
| `excalidraw-diagram` | Redigerbara Excalidraw-diagram. |
| `demo-recopy` | **Pensionerad 2026-08-21** — pekar nu till `hemsidor`s återbruksläge. |
| `scroll-cinematic` | **Pensionerad 2026-08-21** — pekar nu till `hemsidor`. |

## Content för @bahkobyra
| Skill | Vad den gör |
|---|---|
| `ig-karusell` | 6-slides Instagram-karuseller för @bahkobyra (Brand- eller Cinematiskt läge). |
| `reel` | Reels/TikTok-manus för hantverkare, barton-ton, dunder hook, dubbel CTA. |
| `bahko-reel` | Gör om ett rått 9:16-klipp till en färdig Bahko-reel med grafik och maskot. |
| `famous-reel-editor` | Grön-glas "Ambra"-stil reel-redigering, delad ram + AI-b-roll. |
| `instagram-engine` *(projektlokal, bara i bahko-crm)* | Planerar/genererar hela veckans IG-batch (reels + karuseller + stories). |
| `rapport` | Konkurrensanalyser, kundrapporter, lead-profiler. |
| `rtf` | YouTube-URL → ordnivå-transkript + förslag på var grafik hör hemma. |

## Granskning och verktyg
| Skill | Vad den gör |
|---|---|
| `kolla-over` | Femperspektivspanel (analytiskt/kreativt/operativt/kommersiellt/skeptiskt) + en beslutsfattare. |
| `grill-me` | Grillar en plan/design med frågor tills varje beslutsgren är löst. |
| `os-audit` | Skrivskyddad granskning av ett projekts uppsättning — inaktuell data, trasig routing, dubbletter. |
| `skill` *(intern namn `skill-builder`)* | Skapar/granskar Claude Code-skills enligt best practice. |
| `rensa` | Destillerar aktiv uppgift + låsta beslut till `.tmp/session-context.md` före `/clear`. |
| `optimering` *(projektlokal)* | SEO/GEO/AEO/lokal sökoptimering för kundsajter. |

Källa: `C:\Users\mathi\.claude\skills\` (33 skills, användarnivå) +
`.claude\skills\` i `bahko-crm` (20 skills, mest junctions till samma filer,
plus `instagram-engine` som bara finns här).
