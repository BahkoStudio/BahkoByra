---
name: demo-recopy
description: AVVECKLAD 2026-08-21 — använd `hemsidor` i stället, där återbruk är ett läge (0 credits). Fångar upp de gamla triggerorden så att inget hamnar på fel mall: "återanvänd demon", "byt copy på demon till...", "ny lead samma nisch", "modda demon till...", "gör om demon".
argument-hint: [använd hemsidor i stället]
disable-model-invocation: true
---

# Avvecklad — läs `hemsidor`

En recopy skilde sig från ett nybygge på exakt en punkt: **ingen ny
mediagenerering.** Det är inte en egen skill, det är ett läge — och det är nu
Återbruk-läget i `hemsidor` (0 credits), tillsammans med Lån och Nybygge.

**Gör så här:** invokera skillen `hemsidor` och följ media-trappan. Steg 1 och 2
i trappan är en recopy; steg 3 är det som kostar credits och kräver beställning.

## Varför den togs bort

Den här skillen delegerade allt av substans till `hemsidor` ("Strukturen,
mönstren och alla regler ägs av `hemsidor`-skillen — läs den först") — men
`hemsidor` fanns bara inne i repot, aldrig i den globala skills-mappen. Den
hänvisningen gick alltså inte att följa i en session som kördes utanför repot.
Två filer där den ena bara pekar på den andra är en felkälla, inte en struktur.
