# Beast of Ages

YouTube-kanal. **Inte** en Bahko Byrå-kund — eget projekt, egen publik, egna regler.
Ligger här för att materialet annars hamnar i en temporär sessionsmapp och försvinner.

Kanal-ID `UCWxSYqJuIrRX92qZTEm2XwA`. Engelskspråkig publik, svenskt konto.
**Manus skrivs på engelska.** Samtal om arbetet förs på svenska.

## Vad som finns här

| Fil | Vad |
|---|---|
| `analys/kanalen.md` | Siffrorna, topp- och bottenvideor, vad 464k-videon faktiskt var |
| `analys/konkurrenter.md` | Nio konkurrenter med kanal-ID, deras utliggare, vad de gör annorlunda |
| `analys/panelens-beslut.md` | Kolla-over-panelens 15 beslut, tre videor att göra först, vad som skjuts upp |
| `manus/forlaga-mekanismer.md` | Elva mekanismer uttagna ur Mathias två inklistrade förlagor |
| `manus/bar-de-extinction-eras.md` | Ribban för de-extinction-manuset, tio kontrollerbara mekanismer |
| `manus/de-extinction-eras-v1.md` | Manus, version 1. Underkänd av slutkritikern |
| `manus/de-extinction-eras-v2.md` | Version 2. Åldersstegen bröts vid sista stoppet |
| `manus/de-extinction-eras-v3.md` | **Version 3 — den som gäller.** 1 956 ord |
| `paket/de-extinction-eras.md` | **Leveranspaketet.** Tio titlar, thumbnail-prompt, beskrivning, pinnad kommentar, CTA |

## Det viktigaste att veta innan något görs

**Mät på median, aldrig på snitt.** 81,5 procent av kanalens livstidsvisningar sitter i
en enda nyhetsvåg kring Colossals varghybrider i mars 2026. Snittet på 6 890 visningar per
video beskriver den vågen, inte kanalen. Medianen är ungefär 1 300.

**464k-videon går inte att upprepa.** Den låg på 816 visningar i 26 dagar innan vågen kom.
Vågen är slut — augusti gav 69, 17, 81 och 56 visningar.

**Publiceringstakt är den enda variabel som skiljer kanalen från konkurrenterna.**
De släpper 8–26 videor i månaden. Beast of Ages släpper 4. Deras *vanliga* video går
sämre än denna kanals botten. De vinner på antal lotter.

**Hantverket är inte problemet.** Gillningar per visning: 9–23 procent här, 2,1 procent på
Edmund Extinctions 673k-video. De som hittar videorna gillar dem mer.

## Hård regel för allt innehåll

Wildlife till en publik som delvis är barn. **Påhittad bitkraft, hastighet, livslängd,
temperatur, populationssiffra eller datum är oacceptabelt** — det är där falska djurfakta
sprids snabbast och lever längst. Varje påstående ska gå att slå upp.

Är du osäker: skriv om meningen så den inte behöver siffran, i stället för att gissa.
Manuset i `manus/` gör det tre gånger, till exempel om pungvargens bettkraft:
*"How hard it could actually bite, nobody agrees on, so nobody gets to hand you a number."*

## Manusets status

**Version 3 gäller.** 1 956 ord, snittmening 10,6 ord, längsta 24, noll tankstreck, noll
AI-mönster. Tre av fyra kritiker godkände i runda 3 — fakta, hook och klarhet.

Vad de tre rundorna faktiskt rättade, i ordning:

1. **Runda 1:** alla tre delarna underkändes och skrevs om. Slutkritikern hittade sedan ett
   fel ingen enskild del kunde se — direktvargen förekom två gånger, som egen era och som
   final. Fyra djur utspridda på fem pinnar.
2. **Runda 2:** dubbletter bort (varg, Perri 2021, La Brea, gåshud), och fem
   gissningsreservationer på cirka 130 ord ersatta av en enda tidig rad.
3. **Runda 3:** åldersstegen bröts vid sista stoppet — jag hade instruerat 1936 → 1662 →
   20 000 → 13 000 år, alltså ett steg *framåt* i tiden. La Brea-eran omdaterad till
   **fyrtiotusen år**, vilket ligger mitt i tjärgroparnas fångstintervall (ca 50 000–11 000
   år). Generationskedjan räknades om från femhundra till femtonhundra.
4. **Efter runda 3**, tre riktade fixar på det craft- och klarhetskritikerna pekade på:
   de två efterhängda gissningstaggarna bort (paraplyvarningen täcker alla fyra ändå),
   fossilräkningen omskriven så inget barn läser den som en huvudräkning på plats, och
   femtonhundra mödrar fick en bild ögat rymmer.

Överlevnadstiderna faller monotont: **tre veckor → elva dagar → nio timmar → elva minuter.**

## Verktyg

vidIQ är kopplat som MCP-server på användarnivå. Nyttiga anrop:
`vidiq_channel_stats`, `vidiq_channel_videos`, `vidiq_outliers`, `vidiq_similar_channels`,
`vidiq_video_transcript` (läs hur en konkurrents video faktiskt är skriven).
De flesta kostar 5 krediter.

## Paketet skrivs före manuset

Tio titlar, en thumbnail-prompt, en beskrivning, en pinnad kommentar på högst två meningar
och en CTA. **CTA:n pekar alltid på kanalens senaste video** så kanalen ses som en serie —
hämta vilken den är med `vidiq_channel_videos({ videoFormat: 'long', popular: false })`,
gissa aldrig. Kopplingen ska vara ett ämne, inte en artighetsfras.

Två spärrar som utliggarmaterialet slog fast, och som gäller framåt:

**Klona inte en egen vinnare genom att byta djur.** The Midnight Zone gjorde 1 005 832 på
en gris och 1 913 på en ko fyra dagar senare — samma mall, 0,19 procent. Apex Paleo fick
1–8 procent på sina fyra kloner.

**"Shocked" är brus, inte mekanism.** Midnight Zone har ett dussin titlar med ordet,
spännvidd 107 till 1 005 832.

Loopar som gäller det här projektet: `/manusloop` för manus, `/kolla-over` för genomlysning.
