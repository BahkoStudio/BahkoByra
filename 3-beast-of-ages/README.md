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

I huvudmappen `C:/Users/mathi/OneDrive/Skrivbord/test` ligger Beast of Ages-filer som är
undantagna från git via `.git/info/exclude` (läst 2026-10-14). De flesta är kopior av filer
som är committade på den lokala grenen `main` men ännu inte på GitHub, så de syns för Mathias
fast arbetskopian står på en annan gren. Undantaget är `medlemsstrategi-cowork.md`, som inte
är committad någonstans och bara finns i huvudmappen.

**Flytta inget förrän den här grenen är mergad.** Efter merge ska varje fil hamna i kvisten
nedan. Kontrollera samtidigt att mergen inte lagt filerna fel: committarna på `main` lägger
dem under `other-projects/beast-of-ages/`, som den här grenen flyttat.

| Fil i huvudmappen (`other-projects/beast-of-ages/…`) | Ska till | Vad |
|---|---|---|
| `manus/mammoth-site-pond-61-mammoths.md` | `manus/` | Manus |
| `manus/dodo-hatch-from-a-chicken.md` | `manus/` | Manus |
| `manus/why-did-someone-paint-an-animal-that-was-already-extinct.md` | `manus/` | Manus |
| `manus/mammoth-not-by-2028.md` | `manus/` | Manus |
| `manus/cheetahs-india-keep-dying.md` | `manus/` | Manus |
| `manus/two-extinct-animals-easy-rat-sea-mink.md` | `manus/` | Manus |
| `manus/tasmania-last-thylacine-1936.md` | `manus/` | Manus |
| `manus/liquid-blood-foal-clone.md` | `manus/` | Manus |
| `manus/how-did-ice-age-people-survive-winter-mammoth-bone-houses.md` | `manus/` | Manus |
| `manus/which-extinct-animals-worth-bringing-back-ranked.md` | `manus/` | Manus |
| `analys/paket-2026-09-25.md` | `paket/` | Fem paket som väntade på Mathias ok innan manus |
| `analys/studio-playbook.md` | `publicering/` | Inställningarna i YouTube Studio och checklistan per video |
| `analys/studio-plan-v2.md` | `publicering/` | Det som är kvar i Studio, sök och att behålla tittarna |
| `analys/medlemsstrategi-cowork.md` | `strategi/` | Kanalmedlemmarna och förmånerna |
| `thumbnails/` (en mapp per video) | `paket/thumbnails/` | Miniatyrerna, stannar utanför git (`paket/.gitignore`) |

### Mergerisken: tre filer är ändrade på båda håll

Den lokala `main` har inte bara lagt till filerna ovan. Den har också ändrat tre filer som den
här grenen flyttat eller skrivit om (läst 2026-10-14):

| Fil på `main` (`other-projects/beast-of-ages/…`) | Vad `main` ändrade | Hamnar här |
|---|---|---|
| `youtube.md` | Tio nya rader i indexet: en per manus ovan, med hur det gjordes och status | Indexet här är utbytt mot kvistarna, så mergen krockar. Flytta de tio raderna till tabellen i `manus/README.md`, inte tillbaka in i `youtube.md` |
| `analys/klarerade-ideer.md` | Drygt hundra nya rader | `ideer/klarerade-ideer.md` |
| `analys/modelleringsguide.md` | Drygt fyrtio nya rader | `ideer/modelleringsguide.md` |

Kontrollera efter mergen att de två `analys/`-filerna fick med `main`-ändringarna i sina nya
mappar i `ideer/`, och att ingen av de tio manusstatusarna tappats.

Efter flytten:

1. Lägg en rad per manus i tabellen i `manus/README.md`, med statusen ur `main`:s
   `youtube.md`-index.
2. Byt sökvägarna under Beast of Ages-rubriken i huvudmappens `.git/info/exclude` till de
   nya mapparna (eller ta bort raderna för filer som nu är spårade).
3. Kör `git status --short -- 3-beast-of-ages/` och kontrollera att inget oväntat syns.
