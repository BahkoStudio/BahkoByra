# Gren 3: Beast of Ages (YouTube & Media Engine)

Eget projekt med egen publik, inte en Bahko Byrå-kund. **Läs `youtube.md` först**: där står
alla regler, kanalens nuläge och ett index över varje fil. Manus skrivs på engelska,
samtalet om dem på svenska.

## Kvistarna

En mapp per steg i arbetet. Varje mapp har en `README.md` som säger hur steget görs.

| Kvist | Mapp | Innehåll |
|---|---|---|
| Strategi & vidIQ-data | `strategi/` | `kanalen.md`, `konkurrenter.md`, `utliggare-att-modellera.md`, `panelens-beslut.md`. README: vidIQ-rutinen, mät på median, utliggarribban, hur nya utliggare hittas |
| Idébank & Grinden | `ideer/` | `modelleringsguide.md` (⭐ reglerna och Grinden), `klarerade-ideer.md`, `dubbla-ner-ideer.md`. README: idébanken och Grindens fem steg, körs alltid först |
| Research | `research/` | En faktabank per video innan manuset skrivs. README: källreglerna och tidskritiska fakta. `research-mall.md` = mallen |
| Manus | `manus/` | En fil per video, paketet överst. README: manusreglerna och listan över alla manus med status |
| Paketet | `paket/` | README: titlar, miniatyr, beskrivning, fäst kommentar, CTA, miniatyrerna med `hf.mjs`. Lokala miniatyrer i `paket/thumbnails/` (inte i git) |
| Produktion | `produktion/` | README: röst, bild och klipp, musik, redigering. Inga videopromptar |
| Publicering & uppföljning | `publicering/` | README: checklistan vid uppladdning, uppföljning efter 48 timmar, 7 och 28 dagar, testa eller dubbla ner |
| Struktur & regler | `reference/` | Källdokumenten bakom reglerna: `testa-vs-dubbla-ner.md`, `modellering-vs-kopiering.md`, `thumbnail-reglerna.md`, med bevisbilder i `bilder/` |
| Skills & verktyg | `skills.md` | Vilka skills och verktyg gren 3 använder, och när |
| Konvertering & tratt | `konvertering.md` | Väntar på beslut, läs varningen där innan något byggs |

Flödet för en video: `strategi/` → `ideer/` (Grinden) → `research/` → `paket/` → `manus/` →
`produktion/` → `publicering/` → tillbaka till `strategi/`.

Material som inte hör hemma i git ligger i OneDrive under `2 Beast of Ages/`: `Research/`
(källmaterial), `Musik och ljud/` och `Gamla manus 2025/`.

## Lokala filer (inte i git)

Den lokala grenen `main` hade 18 opushade commits med Beast of Ages-material. De är
**inmergade i den här grenen 2026-10-14**: tio manus ligger i `manus/` (med en rad var i
`manus/README.md`), `paket-2026-09-25.md` i `paket/`, `studio-playbook.md` och
`studio-plan-v2.md` i `publicering/`, och tilläggen i idéfilerna i `ideer/`.

Kvar i huvudmappen `C:/Users/mathi/OneDrive/Skrivbord/test`, undantaget från git via
`.git/info/exclude`:

| Fil (`other-projects/beast-of-ages/…`) | Ska till efter merge | Vad |
|---|---|---|
| `thumbnails/` (en mapp per video) | `paket/thumbnails/` | Miniatyrerna, stannar utanför git (`paket/.gitignore`) |
| övriga undantagna kopior | tas bort när huvudmappen står på main | Samma filer finns nu spårade i kvistmapparna |

Efter merge: byt Beast of Ages-raderna i huvudmappens `.git/info/exclude` till de nya
mapparna, flytta miniatyrerna och kör `git status --short -- 3-beast-of-ages/`.
`medlemsstrategi-cowork.md` ligger sedan 2026-10-14 i `strategi/` (Mathias: den får ligga i repot).

