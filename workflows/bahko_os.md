# Bahko OS — kommandocentralen

**Adress:** `https://www.bahkobyra.se/cloud/os-4337c997e7/` (noindex, skyddad av
obskyr adress precis som CRM:et). Källa: `web/public/cloud/os-4337c997e7/index.html`,
en självbärande fil på sop-ringa-routerns mönster.

## Vad OS:et är

Operativsystemet för varumärke, content och leads, byggt på två ramverk:

- **Design-OS-idén:** ett Claude-byggt system med moduler som växer, där varje
  förmåga kodifieras till en skill (`/design-loop`, `/famous-reel-editor`,
  `/bahko-reel` är exempel).
- **Varumärket som spel:** publiken är huvudpersonen, content är questlinjen.
  Fienden (Osynligheten), huvudpersonen (Förstavalet), metoden
  (48-timmarsprototypen) och missionen (Inga fler förlorade jobb) bor i
  OS:ets Spelvärld, som är FILTRET för allt content. Knappen "Kopiera som
  AI-kontext" matar strategin till Claude-sessioner.

Modulerna: Kommandobryggan (dagens uppdrag, 15-minutersrutinen),
Spelvärlden, Säsongen (90 dagar, 13 veckokapitel), Instagram, YouTube,
LinkedIn, Manus (äger all kopierbar text), SOP:er, Kundverkstan.

## Data — var saker bor

| Nyckel | Innehåll | Karaktär |
|---|---|---|
| `bb_os_v1` | spelvärlden + säsongen | lågfrekvent, dyrt att förlora |
| `bb_os_logg_v1` | KPI-rader, dagens checklista, MVL-läge, idébanken | högfrekvent |

Båda är **formfrysta** när de tagits i bruk (Heligt-listan) och åker med i
CRM:ets backup (bb_-prefixet). OS:et har dessutom egen Export-knapp.
`bb_crm_v2` och `bahko_sop_dagslogg_v1` läses på sin höjd — **skrivs ALDRIG**
från OS:et. Korrupt data stashas som `<nyckel>_korrupt_<ts>` och nyckeln sås om.

**Origin-regeln:** datat bor på www.bahkobyra.se. OS:et redirectar självt bort
från bahkobyra.cloud (samma /cloud/-rewrite serverar båda värdarna).

## Rutinerna OS:et äger

- **Fredag 15:00:** veckans KPI skrivs in per kanal I OS:ET. Detta ersätter
  IG-loggen i Google Sheet V1 (Mathias beslut 2026-08-27). Instagram: Räckvidd,
  Sparningar, DEMO-DM. DEMO-DM driver XP-mätaren (mål 3/vecka).
- **IG-veckocadence (beslut 2026-08-27):** 2 maskotreels (/bahko-reel) +
  2 karuseller (/instagram-engine) + 1 bildkort + 1 ansiktspost
  (/famous-reel-editor) + dagliga stories.
- **Säsongsbyte efter vecka 13:** Export-knappen arkiverar JSON:en → skriv
  nytt tema och nya kapitel i Säsongen → uppdatera startdatum.

## Regler för agenter

1. Spelvärldens **kanalmatris är copy-lag**: Google-löften ENDAST på
   bahkobyra.se/offert, garantin aldrig i IG-poster, pris endast i offert.
2. Manus-modulen äger all kopierbar text — dubbleras aldrig i andra moduler
   eller dokument; ändras texten, ändras den där.
3. Nya moduler byggs i samma fil, samma BLAD-mönster, och kvalitetssäkras
   med `/design-loop` innan merge.
4. OS:et kräver 0 credits. Allt som kostar (soul-id, media) är beställningar.
