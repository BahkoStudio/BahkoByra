# Kvist: Paketet

Titel, miniatyr, beskrivning, fäst kommentar och CTA. **Paketet skrivs före manuset** och
avgör om någon överhuvudtaget ser videon. Reglerna står i `../youtube.md` och vinner om
något här säger annat.

Paketet sparas **överst i manusfilen** i `../manus/`, när manuset finns. Ett paket som väntar
på Mathias ok innan något manus skrivits kan ligga som egen fil här i `paket/`.

## Vad ett paket innehåller

| Del | Regeln |
|---|---|
| **Titlar** | Tio stycken, den rekommenderade först. Titeln får bara lova vad manuset betalar. "Shocked" är brus, inte mekanism: Midnight Zone har ett dussin titlar med ordet, spännvidd 107 till 1 005 832 |
| **Miniatyr** | Motivet hämtas ur manusets höjdpunkt, inte ur titeln. Texten ligger i översta tredjedelen. Bilden ska klara 50-procentstestet: publiken tittar på TV, där bara övre delen syns innan man trycker ned |
| **Beskrivning** | Skriven för just den här videon. Kontrollera att kanalens standardbeskrivning inte följt med (det har hänt, se `../publicering/README.md`) |
| **Fäst kommentar** | Högst två meningar |
| **CTA** | Pekar **alltid** på kanalens senaste video, så kanalen ses som en serie. Hämta vilken den är med `vidiq_channel_videos({ videoFormat: 'long', popular: false })`, gissa aldrig. Kopplingen ska vara ett ämne, inte en artighetsfras. (Panelen 2026-11-07 föreslår "senaste avsnittet i samma serie"; ändras här först när Mathias sagt ja till `../youtube.md`-paketet) |
| **F. Fakta 16** (obligatorisk) | Ett oanvänt fakta ur faktabanken med källa, färdig engelsk text till community-inlägget dag 1 (`../publicering/README.md`, "Dag 1–2"), och tre till som Script & Sources-bilaga (`../strategi/medlemsstrategi-cowork.md`) |

Förpackningen ska vara vår egen: titel och miniatyr hålls mot utliggarens i Grindens steg 4
(`../ideer/README.md`). Fulla miniatyrreglerna: `../reference/thumbnail-reglerna.md`.

**Sedan 2026-10-18 skrivs paketet före Grinden**, så att Grinden dömer förpackningen.
Paketet anger vilket av fyra miniatyrramverk som används (konflikt, ett dominant motiv,
nyfikenhetsgap, attraktion) och bockar av de två testerna innan bilden går live: zooma
till 10 procent (syns vinnaren?) och thumbnailpreview.com mot den riktiga startsidan.
Ladda upp tre miniatyrer, alltid, YouTube testar dem mot tittartid. Allt står i
`../ideer/README.md`, steg 3.

## Miniatyrerna görs så här

    node tools/hf-api/hf.mjs bild --modell qwen

Körs från repots rot. Qwen Image 3 i 2k, sparas som 1280×720 jpg. Nyckeln ligger i
`tools/hf-api/.env.local` och läses eller skrivs aldrig ut.

- **En bild i taget.** Parallella körningar har gett "fetch failed" och "temporarily
  unavailable".
- **Granska varje bild innan den lämnas över.** Qwen stavar ibland fel (dubblerad text,
  avklippta ord).
- **Ordet "DEAD" stoppas av filtret.** Använd "GONE".
- **Högst 6 bilder per video** (3 valda + 3 omtag); skriv dollarbeloppet ur hf.mjs-utskriften
  i raden första gången (`../skills.md`, Budget per video).
- `/higgsfield-youtube-thumbnail` används **inte**, se `../skills.md`.

Två godkända stilar:

| Stil | När | Hur den ser ut |
|---|---|---|
| **Streckgubbe** | Djuptidsvideor (som Tasmanien) och vardagsvideor | Platt tecknad stil, tjocka svarta konturer, vita streckgubbar, stor gul text med svart kant upptill. Referenser: Quiet Science, Poko, Wondrcore |
| **Gorilla** | De-extinction och djur i närbild | Fotorealistiskt, svart bakgrund, djuret i profil på höger 60 %, vit serif-text till vänster, liten rad plus stor rad i versaler, röd dubbel penselstreck under |

## Lokala miniatyrer

Bilderna sparas sedan 2026-10-15 i OneDrive, i
`C:/Users/mathi/OneDrive/2 Beast of Ages/Paket/Miniatyrer/<video>/` (Mathias: allt han
laddar upp ska ligga i `2 Beast of Ages`). De är inte med i git, för bilderna är stora och
repot är publikt. `paket/thumbnails/` står kvar i `paket/.gitignore` men används inte längre.

## Filer i kvisten

| Fil | Vad |
|---|---|
| `paket-2026-09-25.md` | Fem paket från 2026-09-25 som väntade på Mathias ok innan manus |
