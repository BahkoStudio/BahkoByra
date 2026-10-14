# Kvist: Skills & verktyg

Vilka skills och verktyg gren 3 använder, och när. Skills med `~/.claude/skills/` ligger
globalt på Mathias dator, inte i repot. Kontrollerat på disk 2026-10-14.

| Skill eller verktyg | Var det bor | När det används | Kvist |
|---|---|---|---|
| **vidIQ (MCP)** | Kopplat på användarnivå | Alla siffror om kanalen och konkurrenterna, utliggare, Grindens sökningar, CTA-målet, uppföljningen. **5 credits per anrop** | `strategi/`, `ideer/`, `paket/`, `publicering/` |
| **`/youtube-roast`** | `~/.claude/skills/youtube-roast/` | YouTube-rådet: sex simulerade YouTube-experter roastar **ett beslut på en kvist** och lämnar en SOP. När Mathias ska bestämma något om kanalen och behöver emot, inte medhåll | alla kvistar, ett beslut i taget |
| **`/manusloop`** | `~/.claude/skills/manusloop/` (motorn i `~/.claude/skills/design-loop/`) | Skriver manuset: builder plus tre kritiker med färsk kontext. **Max 3 rundor**, sedan redovisa och fråga | `manus/` |
| **`/kolla-over`** | `~/.claude/skills/kolla-over/` | Bred genomlysning av hela kanalen eller en plan, fem perspektiv. `strategi/panelens-beslut.md` kom därifrån | `strategi/` |
| **Webbsökning** | Inbyggd | Tidskritiska fakta slås upp live innan paketet låses | `research/` |
| **`tools/hf-api/hf.mjs`** | Repots `tools/hf-api/` | Miniatyrerna: `node tools/hf-api/hf.mjs bild --modell qwen`. En bild i taget, granska stavningen | `paket/` |
| **`/hyperframes`** | `~/.claude/skills/hyperframes/` | Bara om en video behöver grafik, titelkort eller textskyltar. Inte en del av rutinen i dag | `produktion/` |
| ~~`/higgsfield-youtube-thumbnail`~~ | `~/.claude/skills/` och repots `.claude/skills/` | **Används INTE.** Skillen renderar med Nano Banana Pro, som inte finns i API:t som kanalen kör. Miniatyrerna görs med Qwen via `hf.mjs` (Mathias "kör på som vanligt" 2026-10-09) | (`paket/`) |

## Ordningen i en vanlig video

1. **`vidIQ`** i `strategi/`: läget och utliggarna.
2. **Grinden** i `ideer/`, med vidIQ (cirka 15 credits).
3. **Faktabanken** i `research/`, källa per siffra.
4. **Paketet** i `paket/`, miniatyren med `hf.mjs`.
5. **`/manusloop`** i `manus/`, max 3 rundor, sedan webbsökning på tidskritiska fakta.
6. **Produktion** i `produktion/`.
7. **Publicering** och uppföljning efter 48 timmar, 7 och 28 dagar med vidIQ i
   `publicering/`.

Står Mathias inför ett vägval på någon kvist: **`/youtube-roast`**. Vill han ha en bred
genomlysning av allt: **`/kolla-over`**.

## Skills som INTE hör till gren 3

| Skill | Varför inte |
|---|---|
| `/bahkobyra-roast` | Byråns råd för gren 1, 2 och 4. Beast of Ages har `/youtube-roast` |
| `/roast-room` | Det äldre rådet med båda borden |
| `/reel`, `/bahko-reel`, `/bahko-reklamfilm` | Bahko Byrås eget content, svenska och kortformat |
