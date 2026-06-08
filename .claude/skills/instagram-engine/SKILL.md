---
name: instagram-engine
description: Use when someone asks to plan or generate Instagram content for the bygg/hantverk niche — "instagram-motor", "skapa reels", "content-batch", "veckans content", "reels för bygg/tak/måleri/mark". Produces reel scripts, carousel outlines, story ideas and DM cadence that sell websites via a free Google audit.
argument-hint: [trade: bygg|tak|måleri|mark] [vecka]
disable-model-invocation: false
---

# Instagram-motor (bygg & hantverk)

Producerar content-batchar för **@bahkostudio** som driver top of funnel för bygg/hantverk-nischen.
Mål: DM-konversationer → gratis hemsideförslag (utkast) → sälj hemsida (engångsköp).
**Offerten = hemsidor. "Växa på Google"-copy hör ENDAST hemma på bahkobyra.se — aldrig i reels/DM.**

Full SOP: `workflows/instagram_engine.md`. Metodik/formler: `workflows/sales_methodology.md`.
Allt operativt (cadence, skript, content-kalender) speglas i dashboarden:
`bahkobyra/dashboard/index.html` → sektionen **Instagram-motor**.

## Cadence (default)

3 reels + 2 carouseller/vecka + daglig story. Skippa inte dagar — volym slår perfektion.

## Steg

1. **Välj trade + vecka.** `$1` = bygg | tak | måleri | mark. Om saknas — fråga.
2. **Hämta vinklar** ur `templates.md` (hooks/carouseller/DM per trade).
3. **Generera batchen:**
   - **3 reel-script** enligt formeln: Hook → Problem → Agitera → Diskvalificera andra lösningar →
     Lösning → CTA → Future pacing. CTA = gratis hemsideförslag ("DM:a 'SAJT'").
   - **2 carousell-outlines** (6–8 slides: hook-slide → värde → bevis → CTA-slide).
   - **Story-idéer** (poll, BTS, audit-CTA).
   - **DM-cadence** (skriven-first dag 1/3/5/7, se `workflows/outreach_cadence.md`).
4. **Kvalitetskoll:** varje stycke ska vara FOR THEM / REAL / Financial Sense / Easy to say YES.
5. **Spara** till `.tmp/ig_batch_[trade]_v[vecka].md`. Ev. export till Google Sheets via
   `node tools/export_to_google_docs.js --type=sheets --title="IG [trade] v[vecka]"`.
6. **Logga DM-svar** som leads i dashboardens CRM (`niche: bygg`, `pathway: skriven`).

## Guardrails

- Generera inte bilder/video automatiskt utan att användaren ber om det (kostar credits).
- Håll allt på svenska, lokal ton, ingen corporate-svenska.
- En tydlig CTA per post → alltid front-offern (gratis audit).
