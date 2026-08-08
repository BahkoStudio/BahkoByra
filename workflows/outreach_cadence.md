# Workflow: 7-dagars Outreach-Cadence

Strukturen från "Outreach Cadence"-bilden. Driver bygg-outreachen (cold email / cold call / IRL)
och styr CRM:et i `bahkobyra/crm-f2822a6f3a/index.html`. Instagram-DM kör samma logik
(se `workflows/instagram_engine.md`).

## Objektiv

Få ett möte bokat. Välj EN primär väg per lead, kör dag 1/3/5/7, gren efter svar.

---

## Steg 1: Välj EN väg (7 dagar)

| Väg | Dag 1 | Dag 3 | Dag 5 | Dag 7 |
|-----|-------|-------|-------|-------|
| **A · Skriven-first** (mejl/DM) | Meddelande #1 | Uppföljning #2 | Uppföljning #3 | Uppföljning #4 |
| **B · Samtal-first** | Samtal #1 + recap-mejl | Samtal #2 | Samtal #3 | Close-loop-mejl |
| **C · IRL-first** | Besök #1 | Uppföljning | Samtal (om direktnr) | — |

I CRM:et: fältet `pathway` = `skriven` | `samtal` | `irl`. Knappen "logga touch" stegar
`cadenceDay` 1 → 3 → 5 → 7 → `nurture` och sätter `nextAction` till rätt datum.

---

## Steg 2: Grenar

```
                 ┌─ JA / svar ──→ ENGAGED: svara samma dag, mål = boka möte
ANY REPLY? ──────┤
(dag 7)          └─ NEJ ────────→ Inget svar dag 7 → ESKALERA EN gång → annars NURTURE/STÄNG
```

- **ENGAGED** → boka möte → `status: Möte`. No-show → +10 min, samma-dag-uppföljning → reschedule.
- **BOOKED** → möte schemalagt → beslutssamtal → offert → `status: Offert`.
- **NURTURE** → följ upp om ~30 dagar (`cadenceDay: nurture`, `nextAction = +30d`).
- **NOT INTERESTED** → `status: Inte intresserad`, sluta. (= STOP)

Mappning till statusar: `Ny → Kontaktad → Uppföljning 2 → Uppföljning 3 → Svar → Möte → Offert →
Stängd` / sidospår `Inte intresserad`.

---

## Steg 3: CRM-fält

| Fält | Värden | Syfte |
|------|--------|-------|
| `niche` | `bygg` | enda nischen sedan 2026-07-28 (klinik avvecklad) |
| `pathway` | `skriven` \| `samtal` \| `irl` | vilken cadence-kolumn |
| `cadenceDay` | `1`\|`3`\|`5`\|`7`\|`nurture`\|`stängd` | var i sekvensen |
| `nextAction` | ISO-datum | när nästa touch ska ske |
| `lastTouch` | ISO-datum | senaste kontakt |

"Dagens uppföljningar"-vyn i dashboarden listar alla leads där `nextAction <= idag`.

---

## Steg 4: Skript

Alla dag-för-dag-skript (de tre vägarna) + IG-DM-cadence finns kopierbara i dashboardens
"Outreach-skript"-sektion. Loom-script + offer finns i `workflows/sales_methodology.md`.

## Regler

- En väg i taget per lead. Byt inte mitt i utan att logga varför i `notes`.
- Svarar de → hoppa direkt till ENGAGED, strunta i resten av cadencen.
- Texting = logistik ("när ringer/ses vi?"), inte långa säljmejl. Korta, mänskliga, hjälpsamma.
- Eskalera bara EN gång vid tystnad. Sen nurture. Var aldrig needy.

---

## Automatiserat mejlutskick (tools/outreach_manager.js)

Skickar 4-stegssekvensen (dag 0/3/5/7: intro+demo, uppföljning, socialt bevis, sista CTA)
via one.com-SMTP (nodemailer), max 20 mejl/dag.
`.env`: `FROM_EMAIL`, `FROM_NAME`, `SMTP_PASSWORD` (one.com), valfria `MAX_PER_DAY`, `LOOM_URL`.

```bash
node tools/outreach_manager.js --dry-run        # simulera (kör alltid först)
node tools/outreach_manager.js                  # skicka dagens mejl
node tools/outreach_manager.js --status         # läget
node tools/outreach_manager.js --mark-replied=5 # stoppa sekvens vid svar
node tools/outreach_manager.js --unsubscribe=12 # opt-out (state-filen är GDPR-registret)
node tools/outreach_manager.js --reset=3        # börja om ett lead
```

State: `.tmp/outreach_state.json` (auto-skapad). Leadlista: `data/leads.json` —
**OBS: filen finns inte i repot i dag; verktyget kräver ny leadlista innan det används igen.**
Daglig rutin: `--status` → kör → uppdatera CRM:et för leads som svarat.
Svar med "avregistrera"/"ta bort mig" hanteras manuellt med `--unsubscribe`.

*(Ersätter `outreach_automation.md`, raderad 2026-08-05 — dess Resend-setup stämde aldrig
med koden, som kör nodemailer mot one.com.)*
