---
name: scroll-cinematic
description: AVVECKLAD 2026-08-21 — använd `hemsidor` i stället. Fångar upp de gamla triggerorden så att inget bygge hamnar på fel mall: "bygg-demo", "scroll-cinematic demosajt", "3D scroll website för byggföretag", "hus-förvandlings-demo", "demo enligt GRANIT-mallen". Alla kunddemos byggs nu på bahkomallen (SV Hus) som server-renderad Next.js-route.
argument-hint: [använd hemsidor i stället]
disable-model-invocation: true
---

# Avvecklad — läs `hemsidor`

Den här skillen byggde statiska demos under `web/public/cloud/<kund>/` med en
scroll-koreografi på GSAP och Lenis. **Den arkitekturen används inte längre.**

**Gör så här:** invokera skillen `hemsidor`. Den äger allt som var värt att
behålla härifrån — nischverifieringen, metaforerna, Higgsfield-kedjan A → B → C,
förvandlings-receptet, copy-reglerna och mobilreglerna — och bygger på
bahkomallen i stället.

## Varför den togs bort

- **Mallen var avskaffad.** `hemsidor` blev mall-kanon 2026-08-18, men den här
  skillen fortsatte peka på `web/public/cloud/`, vilket `hemsidor` uttryckligen
  förbjuder (catch-all-rewriten i `next.config.mjs` ger 404 där). Två
  arkitekturer parallellt ledde till att en demo byggdes på den avskaffade
  mallen 2026-08-21.
- **Den motsade sig själv.** Toppen sa "kopiera nordiapartner", steg 5 sa
  "kopiera glowingservice".
- **Den pekade på saker som inte finns:** en designdetektor som inte är
  installerad och en Drive-mapp för assetarkiv som inte gick att hitta.
- **Koreografin gav klagomålen.** För mycket film, suddig text, mobilen rusade.
  Förvandlingen lever kvar i `hemsidor` som hero-video och före/efter-par, som
  är där den faktiskt säljer.

De gamla demosarna under `web/public/cloud/` ligger kvar och fungerar — deras
länkar är skickade till kunder och får inte brytas. Ska en av dem ersättas,
följ redirect-steget i `hemsidor`.
