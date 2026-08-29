# Beast of Ages

YouTube-kanal. **Inte** en Bahko Byrå-kund — eget projekt, egen publik, egna regler.
Ligger här för att materialet annars hamnar i en temporär sessionsmapp och försvinner.

Kanal-ID `UCWxSYqJuIrRX92qZTEm2XwA`. Engelskspråkig publik, svenskt konto.
**Manus skrivs på engelska.** Samtal om arbetet förs på svenska.

## Vad som finns här

| Fil | Vad |
|---|---|
| `manus/de-extinction-eras.md` | **Video 1, klar att spela in.** Paketet överst, manuset under |
| `manus/saiga-200000-antelope.md` | **Video 2, klar att spela in.** Apex-modellering, unikhetskontrollerad |
| `manus/tander.md` | **Video 3, klar att spela in.** Knapp-modellering, sex rundor manusloop |
| `manus/de-extinction-eras-veo.md` | 106 Veo-prompter à 8 sekunder, stilbibeln, musikbädden |
| `analys/kanalen.md` | Siffrorna, topp- och bottenvideor, vad 464k-videon faktiskt var |
| `analys/konkurrenter.md` | 48 konkurrenter, filtrerade på långform. Vilka som är Shorts i förklädnad |
| `analys/klarerade-ideer.md` | Fem unikhetskontrollerade idéer redo att välja bland, plus de dödade |
| `analys/utliggare-att-modellera.md` | Tio utliggare värda att modellera, plus stopplistan |
| `analys/modelleringsguide.md` | ⭐ **Reglerna före varje ny video** + Mathias elva godkända referenser |
| `reference/testa-vs-dubbla-ner.md` | Källdokumentet bakom testa/dubbla ner-ramverket, med Vintage Vehicles-fallstudien |
| `reference/modellering-vs-kopiering.md` | Var gränsen går mellan att låna och att stjäla, med bevisbilder |
| `analys/panelens-beslut.md` | Kolla-over-panelens 15 beslut, tre videor att göra först, vad som skjuts upp |

**En fil per video.** Paketet och manuset bor tillsammans, för de dömdes mot varandra —
en titel får bara lova vad manuset betalar. Mekanismerna de båda dömdes mot ligger i skillen
(`~/.claude/skills/design-loop/references/`), inte här, så de gäller varje kommande manus.

## Det viktigaste att veta innan något görs

**Mät på median, aldrig på snitt.** 81,5 procent av kanalens livstidsvisningar sitter i
en enda nyhetsvåg kring Colossals varghybrider i mars 2026. Snittet på 6 890 visningar per
video beskriver den vågen, inte kanalen. Medianen är ungefär 1 300.

**464k-videon går inte att upprepa.** Den låg på 816 visningar i 26 dagar innan vågen kom.
Vågen är slut — augusti gav 69, 17, 81 och 56 visningar.

**Vi kör långform, och den filtreringen avgör vem som ens är en konkurrent.** De fyra
största siffrorna i Grow Channels-listan — Pulseoryx 15,5 miljoner visningar i månaden,
Primalapse 20,9, SnowClaw 14,3, WildDna 10,6 — tillhör kanaler med **noll**
långformsvideor. The Earth Realms två långformsvideor gjorde 346 och 120 visningar.
Månadsvisningar är oanvändbart som jämförelsetal utan att formatet kollats först.

**Publiceringstakt är en verklig skillnad, men inte den enda.** De format-matchade
explainer-kanalerna släpper 8–26 videor i månaden mot 4, och deras *vanliga* video går
sämre än denna kanals botten. Men Wild Origins har 77 900 prenumeranter och
långformsvideor med sex miljoner visningar — det är en kanal som är genuint mycket större,
i vårt format. Deras premiss är däremot fiktion (aliens, Medusa, King Kong) och går inte
att kopiera här. Deras **titelmall** går: de kör en enda form över nästan alla videor.

**Hantverket är inte problemet.** Gillningar per visning: 9–23 procent här, 2,1 procent på
Edmund Extinctions 673k-video. De som hittar videorna gillar dem mer.

## Hård regel för allt innehåll

**Publiken är vuxna män, inte barn** — vilket tidigare antogs här. Uppmätt i YouTube
Studio 2026-08-24 (visningar, 28 dagar): 84 % män. Åldrarna: 35–44 år 22 %, 45–54 år 21 %,
65+ **20,6 % och största enskilda gruppen**, 55–64 år 18 %, 25–34 år 17 %. Under 25: 1,3 %.

Tolvåringstestet i manusloopen står kvar, men som läsbarhetsribba — enkelt språk vinner i
alla åldrar. För ämnesval betyder publiken i stället: en man 45–70 med
naturdokumentär-tradition, vetenskapshistoria (DDT och örnarna, kalla krigets experiment),
gårdsminnen. Mer TV-skärm än mobil, längre tittarsessioner.

**Påhittad bitkraft, hastighet, livslängd,
temperatur, populationssiffra eller datum är oacceptabelt** — det är där falska djurfakta
sprids snabbast och lever längst. Varje påstående ska gå att slå upp.

Är du osäker: skriv om meningen så den inte behöver siffran, i stället för att gissa.
Manuset i `manus/` gör det tre gånger, till exempel om pungvargens bettkraft:
*"How hard it could actually bite, nobody agrees on, so nobody gets to hand you a number."*

## Manusets status

**Klart att spela in.** 1 956 ord, snittmening 10,6 ord, längsta 24, noll meningar över 25,
noll tankstreck, noll AI-mönster. Överlevnadstiderna faller monotont: tre veckor, elva
dagar, nio timmar, elva minuter.

Tre rundor manusloop och två rundor på paketet. Vad varje runda faktiskt rättade står i
`manus/de-extinction-eras.md` längst ner — läs det innan nästa manus, för två av felen är
sådana jag gjorde i instruktionen och inte i texten.

## Paketet skrivs före manuset

Tio titlar, en thumbnail-prompt, en beskrivning, en pinnad kommentar på högst två meningar
och en CTA. **CTA:n pekar alltid på kanalens senaste video** så kanalen ses som en serie —
hämta vilken den är med `vidiq_channel_videos({ videoFormat: 'long', popular: false })`,
gissa aldrig. Kopplingen ska vara ett ämne, inte en artighetsfras.

**"Shocked" är brus, inte mekanism.** Midnight Zone har ett dussin titlar med ordet,
spännvidd 107 till 1 005 832.

## Så hittas nya utliggare

Ordningen som gäller: ta konkurrentlistan, börja med alla **under 50 000 prenumeranter**,
leta utliggare att modellera (ju nyare desto bättre), gå sedan upp till **150 000**.

    vidiq_outliers({ channelIds: [...], contentType: 'long',
                     maxSubscribers: 50000, publishedWithin: 'threeMonths',
                     sort: 'breakoutScore' })

**Breakout-talet mäter avvikelse från kanalens eget snitt, inte om videon går att kopiera.**
De två högsta talen i senaste körningen (243 och 232) var en filmtrailer och en riktig
naturfilmsdokumentär. Kolla alltid format och genre innan en titel plockas.

## Unikhetsregeln — före varje ny video

**Algoritmen pushar inte liknande idéer: varje idé måste vara unik.** Innan en loop
startar söks idéns exakta fråga med `vidiq_youtube_search` sorterad på visningar. En
färsk eller synlig video med samma idé dödar idén — formatet får lånas, idén måste vara
ny. Pig Milk-manuset byggdes färdigt innan kontrollen gjordes och fick kasseras: Knapp
hade publicerat exakt samma fråga tolv dagar tidigare. Kontrollen är billig (5 krediter),
misstaget kostade en hel loop.

## Testa eller dubbla ner — beslutet som styr vilken video som görs

Ordningen är **fristående video → format → subnisch.** Enskilda videor testas för att hitta
format. Två eller tre vinnande format blir subnischen. Formatet uppfinns inte i förväg — det
upptäcks genom att en enskild video går över ribban.

**Utliggarribban är 3 000–5 000 visningar.** Under den finns inget att dubbla ner på.

### Vad som gäller just nu

Kanalens median är ungefär 1 300 och augustivideorna gav 17, 56, 69 och 81. **Beast of Ages
är alltså i testläge, inte i dubbla ner-läge.** Det enda som passerat ribban på egen kraft
är direktvargsspåret, och det har redan körts: 464 165 → 74 041 → 47 576 → 20 749 → 17 497
→ 17 426 → 12 379 → 10 285 → 9 677. En obruten nedgång i nio steg. **Det spåret är slut.
Sluta dubbla ner på det.**

### Reglerna

1. **Testa tills en enskild video blir en utliggare** över 3 000–5 000 visningar.
2. **Dubbla ner en gång och mät.** Fler visningar än originalet betyder att du kan fortsätta
   tills det planar ut. Färre visningar ger dig ett försök till — men slår inget av dem
   originalet, sluta och gå tillbaka till att testa.
3. **Räkna med att en nedslagning ger färre visningar än originalet.** Det är normalt och
   betyder inte att den misslyckats. 300 000 följt av 50 000, 80 000, 10 000, 2 000 är en
   normal serie som ska avbrytas efter den fjärde. 10 000 följt av 4 000 ska avbrytas direkt.
4. **Högst 1–3 videor i samma format.** Fungerade det inte första gången, inte andra gången
   och möjligen inte tredje — gå vidare. Det vanligaste misstaget är tjugo videor fördelade
   på tre format.
5. **Testa hela tiden parallellt**, även när en nedslagning fungerar. Varje nytt vinnande
   format läggs till i rotationen.

### En rättelse av det jag skrev tidigare

Jag skrev "klona inte en egen vinnare genom att byta djur" som ett förbud, med The Midnight
Zones gris på 1 005 832 mot ko på 1 913 som bevis. **Det var för absolut.** Rätt regel är
den här: dubbla ner en gång, mät, och sluta när nedslagningen inte slår originalet. Ko-videon
är inte ett skäl att aldrig dubbla ner — den är ett exempel på ett format som skulle stoppats
efter första försöket. Skillnaden spelar roll: förbudet hade kostat oss varje vinnande
formats andra och tredje video.

Loopar som gäller det här projektet: `/manusloop` för manus, `/kolla-over` för genomlysning.

## Äldre arbetsmapp på skrivbordet — två lösta konflikter

`OneDrive/Skrivbord/youtube/` innehåller kanalens material från hösten 2025 och januari
2026: fem manus med titel- och thumbnailpaket (giant dogs, brown hyena, early humans,
porcupine vs komodo) plus mallen `SCRIPT_TEMPLATE_UPDATED.txt`. Renderade filer ligger i
`OneDrive/Skrivbord/Short Djur/`.

Materialet är sju månader äldre än reglerna ovan och motsäger dem på två punkter. **Det
här dokumentet vinner:**

1. **Ordgränsen.** Den gamla mallen säger 1 500 ord och 170 ord i minuten. Gäller inte —
   hård gräns är 2 000 ord, ungefär 13 minuter i 150 ord i minuten (beslut 2026-08-24).
2. **Tonen.** De gamla manusen är skrivna som komplott och tillskriver utdöda djur vilja
   ("de valde stolthet framför överlevnad"). Det bryter mot faktaregeln ovan: ett djur har
   ingen avsikt, och spänningen ska komma från överlevnadsodds, tidspress eller en strid
   som inte går att vinna med styrka.

Den gamla mallens tidsindelning (hook 0:00–0:20, setup till 1:00, huvuddel till 9:00 i
tre till fem underdelar med varsin liten payoff, höjdpunkt, avrundning, CTA) motsäger
ingenting och går att använda som stöd.

`mansa_musa_script.md` i samma mapp handlar om Mansa Musas rikedom, inte om djur, och
`Day_15_SITREP.md` är en personlig checklista. Ingen av dem hör till kanalens regler.
