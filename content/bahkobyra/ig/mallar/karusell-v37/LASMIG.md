# Karuseller v37, byggda med ig-karusell i Cinematiskt läge (2026-09-07)

Två karuseller à sex slides, 1080 × 1350. Veckans lösning enligt rotationen: v37 = direktbokning.

- Karusell 1, tisdag, Invändningen: "Grannen tipsade om er. Sen hände ingenting."
- Karusell 2, torsdag, Sanningen: "Tre sekunder. Fyra frågor. Sen scrollar de vidare."

## Avvikelse från skillens flöde, med motivering

Skillen låter Nano Banana Pro rendera den svenska texten i bilden. Här genererades bilderna
UTAN text (prompten säger "no text, no letters"), och texten lades ovanpå i Outfit med
`overlay-karusell.html` renderad i Chromium (transparent PNG), sedan ffmpeg-overlay i
Higgsfields sandlåda. Två skäl: molncontainern kan inte se Higgsfields bilder (proxyn
blockerar cloudfront) och kan därför inte kontrollera AI-renderad svenska, och Outfit i
overlay ger exakt varumärke utan stavfel. Bildvärlden, maskotdoseringen (bara omslag och
CTA), dramaturgin i sex steg och captionreglerna följer skillen.

CTA-sliden använder `.claude/skills/ig-karusell/references/maskot/bahko-cta-dma-demo.png`
som bild, noll credits.

## Kostnad

10 bilder à 2 credits (Nano Banana Pro, 4:5, 2k) = cirka 20 credits för båda karusellerna.

## Rendera om texten

`overlay-karusell.html?s=t&i=0` till `i=5` för tisdag, `s=h` för torsdag. Chromium headless,
1080 × 1350, `--default-background-color=00000000`. Lägg sedan PNG:en över AI-bilden.
