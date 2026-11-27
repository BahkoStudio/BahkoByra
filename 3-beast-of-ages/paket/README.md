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
| **CTA** | Pekar på **senaste avsnittet i samma serie** (samma format eller samma djur), och slutskärmen likaså. Finns inget sådant: kanalens senaste långvideo (beslut 2026-11-27, `../youtube.md`). Hämta vilken den är med `vidiq_channel_videos({ videoFormat: 'long', popular: false })`, gissa aldrig. Kopplingen ska vara ett ämne, inte en artighetsfras. (Panelen 2026-11-07 föreslår "senaste avsnittet i samma serie"; ändras här först när Mathias sagt ja till `../youtube.md`-paketet) |
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

    node tools/hf-api/hf.mjs bild --modell sunburst --upplosning 2k --format 16:9

GPT Image 2.5 sedan 2026-11-11 (Mathias), inte Qwen. Körs från `Skrivbord/bahko-gd-wt`, där
`hf.mjs` har modellen `sunburst`. Sparas som 1280×720 jpg. Nyckeln ligger i
`tools/hf-api/.env.local` och läses eller skrivs aldrig ut.

- **En bild i taget.** Parallella körningar har gett "fetch failed" och "temporarily
  unavailable".
- **Granska varje bild innan den lämnas över.** Qwen stavar ibland fel (dubblerad text,
  avklippta ord).
- **Ordet "DEAD" stoppas av filtret.** Använd "GONE".
- **Högst 6 bilder per video** (3 valda + 3 omtag); skriv dollarbeloppet ur hf.mjs-utskriften
  i raden första gången (`../skills.md`, Budget per video).
- `/higgsfield-youtube-thumbnail` används **inte**, se `../skills.md`.

Godkända stilar (de tre sista sedan 2026-11-27, och det är de som gäller för nya videor):

| Stil | När | Hur den ser ut |
|---|---|---|
| **Streckgubbe** | Djuptidsvideor (som Tasmanien) och vardagsvideor | Platt tecknad stil, tjocka svarta konturer, vita streckgubbar, stor gul text med svart kant upptill. Referenser: Quiet Science, Poko, Wondrcore |
| **Gorilla** | De-extinction och djur i närbild | Fotorealistiskt, svart bakgrund, djuret i profil på höger 60 %, vit serif-text till vänster, liten rad plus stor rad i versaler, röd dubbel penselstreck under |
| **Lager** | Ett djur, ett påstående | Svart bakgrund, extrem närbild på huvudet, tung vit versaltext staplad nere till vänster med sista ordet rött, nosen eller hornet ligger framför kanten på bokstäverna |
| **Svartvit med lysande ögon** | Hot, gåta, "X mot Y" | Allt svartvitt mot svart, ögonen lyser vitt, en rad text med ETT rött ord, röd pil mot en liten sak i hörnet |
| **Ljus scen** | Djuret i vår värld | Dagsljus eller färgscen uppifrån, djuret gör något omöjligt i dag, gul och vit text med svart kant, vit pil, högst fyra ord |

Fällor (2026-11-27): låt aldrig djuret skära genom texten (i lagerstilen täcks bara kanten),
be om trubbig platt näbb på moan (blir annars en örn), be om bil utan märke, och kolla att
djurets storlek mot en människa stämmer. Streckgubben används inte på de-extinction-videor
(Mathias: "inte streckgubbe").

## Lokala miniatyrer

Bilderna sparas sedan 2026-10-15 i OneDrive, i
`C:/Users/mathi/OneDrive/2 Beast of Ages/Paket/Miniatyrer/<video>/` (Mathias: allt han
laddar upp ska ligga i `2 Beast of Ages`). De är inte med i git, för bilderna är stora och
repot är publikt. `paket/thumbnails/` står kvar i `paket/.gitignore` men används inte längre.

## Filer i kvisten

| Fil | Vad |
|---|---|
| `paket-2026-09-25.md` | Fem paket från 2026-09-25 som väntade på Mathias ok innan manus |
