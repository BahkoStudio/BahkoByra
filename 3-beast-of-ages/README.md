# Gren 3: Beast of Ages (YouTube & Media Engine)

Eget projekt med egen publik, inte en Bahko Byrå-kund. **Läs `youtube.md` först**: där står
alla regler, kanalens nuläge och ett index över varje fil. Manus skrivs på engelska,
samtalet om dem på svenska.

## Kvistarna

En mapp per steg i arbetet. Varje mapp har en `README.md` som säger hur steget görs.

| Kvist | Mapp | Innehåll |
|---|---|---|
| Strategi & vidIQ-data | `strategi/` | `kanalen.md`, `konkurrenter.md`, `utliggare-att-modellera.md`, `panelens-beslut.md`. README: vidIQ-rutinen, mät på median, utliggarribban, hur nya utliggare hittas |
| Idébank & Grinden | `ideer/` | `modelleringsguide.md` (⭐ reglerna och Grinden), `klarerade-ideer.md`, `dubbla-ner-ideer.md`. README: Remixloopen (sedan 2026-10-18): utliggare → vinkel A/B/C → förpackning → Grinden |
| Research | `research/` | En faktabank per video innan manuset skrivs. README: källreglerna och tidskritiska fakta. `research-mall.md` = mallen |
| Manus | `manus/` | En fil per video, paketet överst. README: manusreglerna och listan över alla manus med status |
| Paketet | `paket/` | README: titlar, miniatyr, beskrivning, fäst kommentar, CTA, miniatyrerna med `hf.mjs`. Miniatyrerna ligger i OneDrive `2 Beast of Ages/Paket/Miniatyrer/` (inte i git) |
| Produktion | `produktion/` | README: röst, bild och klipp, musik, redigering. Inga videopromptar |
| Publicering & uppföljning | `publicering/` | README: checklistan vid uppladdning, Dag 1–2-blocket, utliggare på två tal, testa eller dubbla ner. `ko.md` (inspelningskön), `uppfoljning.md` (en rad per video), `veckoplan.md` (veckorytmen), `studio-playbook.md`, `studio-plan-v2.md` |
| Struktur & regler | `reference/` | Källdokumenten bakom reglerna: `testa-vs-dubbla-ner.md`, `modellering-vs-kopiering.md`, `thumbnail-reglerna.md`, `youtube-ordlista.md` (Grow Channels A–Z och vad den ändrar hos oss), med bevisbilder i `bilder/` |
| Skills & verktyg | `skills.md` | Vilka skills och verktyg gren 3 använder, och när |
| Konvertering & tratt | `konvertering.md` | Väntar på beslut, läs varningen där innan något byggs |

Flödet för en video: `strategi/` → `ideer/` (Remixloopen, sedan Grinden) → `research/` → `paket/` → `manus/` →
`produktion/` → `publicering/` → tillbaka till `strategi/`.

Material som inte hör hemma i git ligger i OneDrive under `2 Beast of Ages/`: miniatyrerna
(`Paket/Miniatyrer/`), `Research/` (källmaterial) och `Musik och ljud/`. Varje kvistmapp där
har en genväg "Öppna i repot (…)" till kvisten här, och toppnivån en genväg till `youtube.md`,
så Mathias når allt från ett ställe. Text (manus, faktabanker, idéer, paket) bor kvar här.

## Lokala filer (inte i git)

Miniatyrer, musik och källmaterial ligger i OneDrive `2 Beast of Ages/`. Text bor här.
`medlemsstrategi-cowork.md` ligger sedan 2026-10-14 i `strategi/` (Mathias: den får ligga i repot).

## Repo-läget

Repo-läget: lokalt mergad med origin/main 2026-11-07, inte pushad. Säkerhetskopia av
`3-beast-of-ages/` i OneDrive `2 Beast of Ages/_backup-2026-11-07/`. Push och pull request
bara när Mathias ber om det: en pull request, en merge.

