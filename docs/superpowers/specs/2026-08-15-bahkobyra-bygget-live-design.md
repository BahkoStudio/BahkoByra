# bahkobyra.se — "Bygget live" (riktning C med A:s copy)

**Beslut:** Mathias 2026-08-15 på designcanvasen *Bahko Byrå nya sajten*: riktning **C** (maskoten bygger sajten i heron, siterabbits-portfölj, sticky bokningsrad) med **A:s copy** (rubrik, ingress, knapp, sifferremsa, pratbubbla). Maskoten är den befintliga gröna glaskuben B (`web/app/komponenter/Maskot.js`), ingen ny figur.

**Omfattning:** ENDAST huvudsajten `web/app/(sajt)/` + delade komponenter. Inte `(demo)`-gruppen, inte `web/public/cloud/`, inte kundsajterna, inget i Heligt-listan.

## 1. Startsidans ordning

| # | Sektion | Vad som är nytt |
|---|---|---|
| 1 | **Hero "Bygget live"** | Text vänster (A:s copy), till höger ritar en canvas maskotfilmen bildruta för bildruta styrd av scrollen (desktop). Sektionen är pinnad över 220 vh. Mobil: ingen pinning, loopen spelas som video under texten. |
| 2 | Marquee | Behålls, innehållet blir bevis: kundsajternas domäner + löftena. |
| 3 | Siffror | Räknarna **tickar upp** när kortet är i bild (ny komponent `Rakna`). Maskoten pekar (finns). |
| 4 | **Videon** | HeroVideo flyttar ner till en egen kompakt sektion `#video` ("Två minuter, rakt på sak"). Herons sekundärknapp länkar dit. |
| 5 | Synlighetspanelen | Oförändrad (scrollstyrd redan). |
| 6 | Tjänster | Oförändrad, men bygger-loopen tas bort här (den ÄR heron nu) — i stället maskoten "dansar" bredvid rubriken. |
| 7 | Process | Oförändrad (horisontellt spår finns). |
| 8 | **Portföljen** | Ersätter dagens tre case-kort: siterabbits-grid med 6 kort (3 kunder + 3 demos), kategori-tagg, en rads resultatcopy, filterchips (Alla · Kunder · Demos). Maskoten **kikar fram** bakom första kortet vid hover. |
| 9 | Gratis + FAQ | Oförändrade. |
| — | **Sticky bokningsrad** | Fast rad i nederkant efter att heron lämnats: maskot 44 px + "Se er nya hemsida innan ni bestämmer er." + knapp. Göms när footern är i bild och när popupen är öppen. Mobil: knapp + ring-ikon (`tel:`). |

## 2. Copy (A:s, ordagrant)

- Eyebrow: **Byrån för bygg & hantverk**
- H1: **Hemsidor som ger hantverkare fler jobb.** (accent på "fler jobb.")
- Ingress: **Ni får ett färdigt förslag på er nya sida inom 48 timmar och ser den innan ni bestämmer er. Det kostar ingenting att titta.**
- Primär knapp: **Se er sida gratis** → `/kontakt/` · Sekundär: **Se videon · 2 min** → `#video`
- Sifferremsa under ingressen: **48h** Till färdigt förslag · **0 kr** Tills ni säger ja · **1** Kontaktperson, hela vägen
- Pratbubbla vid maskoten: **Den här bygger jag åt er. Klar på 48 timmar.**
- Bygg-etikett ovanför canvasen: **Scrolla, B bygger vidare**
- Portfölj: eyebrow **Leveranser i drift** · H2 **Riktiga sajter. Riktiga firmor.** · korttexter från `case/page.js` nedkortade till en rad, inga påhittade siffror (befintlig "12 % fler kundförfrågningar" behålls bara där den redan står).
- Sticky rad: **Se er nya hemsida innan ni bestämmer er.** · knapp **Se er sida gratis**
- 404: **Den här sidan har jag inte byggt än.** · knapp **Till startsidan**

## 3. Heron tekniskt

- **Bildrutor:** `web/public/brand/maskot/bygge/f-000.webp … f-071.webp` — 72 rutor ur `bahko-bygger-loop.mp4` (9 fps × 8 s), 1200 px breda, webp q72 (mål ≤ 22 KB/ruta, ≈ 1,5 MB totalt). Skapas med ffmpeg, kommandot dokumenteras i `tools/assets/bygge-frames.sh`.
- **Komponent `HeroBygge` (client):** `<img>` med f-000 renderas direkt (LCP), canvasen tar över när de första 8 rutorna är laddade; resten laddas i `requestIdleCallback`-batchar. Progress = hur långt den 220 vh höga sektionen scrollats; ruta = `round(p × 71)`; ritas med samma utjämning som SynlighetsPanel (`nu += (mal-nu) × 0.14`).
- **Pinning:** sektionen är `min-height: 220vh` med ett `position: sticky; top: 0; height: 100svh`-inre. Endast ≥ 900 px. Under 900 px: vanlig sektion, `<video autoplay muted loop playsinline>` med loopen (finns redan), ingen canvas laddas.
- **Reduced motion:** sista rutan som statisk bild, ingen scrub.
- **Framstegsmarkering:** fyra streck under canvasen (panel 1–4) som fylls med progress.

## 4. Maskoten runt hela sajten

Befintliga gester: master, vinkar, pekar, undersoker, dansar, gar. **Nya i `Maskot.module.css`:** `kikar` (glider upp bakom ett kort, lutar 12°), `vilar` (lutar 8°, långsam andning), `rycker` (båda armarna upp 40°, liten studs). Ny storlek `.mini` (34 px) för headern.

| Ställe | Gest | Fil |
|---|---|---|
| Header, bredvid knappen | mini, vinkar vid hover | `Header.js` |
| Hero | filmen (canvas) | `HeroBygge.js` |
| Siffror | pekar (finns) | `page.js` |
| Synlighetspanelen | går + undersöker (finns) | `page.js` |
| Tjänster | dansar | `page.js` |
| Process-CTA | pekar (finns) | `page.js` |
| Portföljen | kikar (ny) | `Portfolj.js` |
| Popup | hälsar (`.popup`-klassen finns, används inte) | `Popup.js` |
| 404 | rycker (ny) | `(sajt)/not-found.js` (ny) |
| Footer | vilar (ny) | `Footer.js` |
| Undersidor (tjänster, om oss, kontakt, case, nischsidor, prisguide, Jönköping) | liten, vinkar, bredvid H1 | respektive `page.js` / `NischSida.js` |

## 5. Scrollregler (från canvasens Scroll-karta)

En sektion kommer in en gång, från ett håll, och stannar (Rorelse-systemet behålls). Bara transform/opacity animeras. Pinnat: endast heron, endast desktop. Mobil scrollar nativt överallt. Reduced motion: allt syns direkt, räknarna visar slutvärdet, sticky raden står stilla.

## 6. Utanför omfattningen (flaggas, byggs inte nu)

- **Ny, längre maskotfilm** där B bygger hela sajten (hero → sektioner) — Higgsfield-credits, egen beställning. Heron byggs på den befintliga 8-sekunderloopen.
- Riktiga resultatsiffror per case (finns inte verifierade).
- `(demo)`-gruppen, `web/public/cloud/`, kundsajterna, `web/public/css/style.css`, `web/public/js/main.js`, `web/next.config.mjs`, `web/vercel.json`, Vercel Root Directory.

## 7. Verifiering före PR

`npm ci && npm run build` i `web/` grönt · designdetektorn manuellt på startsidan · Heligt-diff mot origin/main tom · reduced-motion-läge kontrollerat i kod · 390 px: ingen sidled-scroll, sticky raden ≤ 64 px hög · LCP-elementet är `<img>` f-000, inte canvasen · ingen merge utan Mathias.
