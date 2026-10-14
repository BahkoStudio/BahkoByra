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
| **CTA** | Pekar **alltid** på kanalens senaste video, så kanalen ses som en serie. Hämta vilken den är med `vidiq_channel_videos({ videoFormat: 'long', popular: false })`, gissa aldrig. Kopplingen ska vara ett ämne, inte en artighetsfras |

Förpackningen ska vara vår egen: titel och miniatyr hålls mot referensen i Grindens steg 4
(`../ideer/README.md`). Fulla miniatyrreglerna: `../reference/thumbnail-reglerna.md`.

## Miniatyrerna görs så här

    node tools/hf-api/hf.mjs bild --modell qwen

Körs från repots rot. Qwen Image 3 i 2k, sparas som 1280×720 jpg. Nyckeln ligger i
`tools/hf-api/.env.local` och läses eller skrivs aldrig ut.

- **En bild i taget.** Parallella körningar har gett "fetch failed" och "temporarily
  unavailable".
- **Granska varje bild innan den lämnas över.** Qwen stavar ibland fel (dubblerad text,
  avklippta ord).
- **Ordet "DEAD" stoppas av filtret.** Använd "GONE".
- `/higgsfield-youtube-thumbnail` används **inte**, se `../skills.md`.

Två godkända stilar:

| Stil | När | Hur den ser ut |
|---|---|---|
| **Streckgubbe** | Djuptidsvideor (som Tasmanien) och vardagsvideor | Platt tecknad stil, tjocka svarta konturer, vita streckgubbar, stor gul text med svart kant upptill. Referenser: Quiet Science, Poko, Wondrcore |
| **Gorilla** | De-extinction och djur i närbild | Fotorealistiskt, svart bakgrund, djuret i profil på höger 60 %, vit serif-text till vänster, liten rad plus stor rad i versaler, röd dubbel penselstreck under |

## Lokala miniatyrer

Bilderna sparas i `paket/thumbnails/<video>/`. Mappen är **undantagen från git**
(`paket/.gitignore`), för bilderna är stora och repot är publikt. Fram till att grenen är
mergad ligger de i huvudmappen under `other-projects/beast-of-ages/thumbnails/`, se
`../README.md`.

## Filer i kvisten

| Fil | Vad |
|---|---|
| `paket-2026-09-25.md` | Fem paket från 2026-09-25 som väntade på Mathias ok innan manus |
