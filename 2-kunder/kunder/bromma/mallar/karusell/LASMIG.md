# Brommas karusellmall (design v4, 2026-10-04)

`bygg-karusell.py` skriver en HTML-fil per slide. Rendera med Edge headless
(1080x1350) från PowerShell. Fotona tas fram separat (Qwen Image 3, format 3:4,
utan text och utan människor) och läggs som `<karusell>/photo<N>.png`.

- Fotot fyller hela sliden, mörkgrön toning nedtill där texten ligger.
- Rubriker i Bricolage Grotesque med nyckelorden i kursiv Instrument Serif
  (skriv {ord} i rubriken), brödtext i Inter. Mathias valde detta (alternativ A)
  efter att Fraunces kändes för basic. Ligaturer och calt AVSTÄNGDA.
- Texten ska vara skarp: konflikt eller igenkännbart läge i varje rubrik.
  Aldrig "hen", formulera bort pronomenet eller skriv "han eller hon".
- Varje frågeslide: "Fråga X av 6", frågan, kort svar + rutavdragsmarkering
  (✓ Ger / ✕ Inget / Delvis), en mening som förklarar.
- Omslag: stor krok + undertitel. Sista sliden: telefonnumret som knapp.
- Texten skrivs alltid lokalt, aldrig av AI:n (Qwen stavar fel på svenska).
- Ändra sökvägen BAS i skriptet till veckans arbetsmapp.
