# Beast of Ages

YouTube-kanal. **Inte** en Bahko Byrå-kund — eget projekt, egen publik, egna regler.
Ligger här för att materialet annars hamnar i en temporär sessionsmapp och försvinner.

Kanal-ID `UCWxSYqJuIrRX92qZTEm2XwA`. Engelskspråkig publik, svenskt konto.
**Manus skrivs på engelska.** Samtal om arbetet förs på svenska.

## Vad som finns här

| Fil | Vad |
|---|---|
| `manus/de-extinction-eras.md` | **Videon som är klar att spela in.** Paketet överst, manuset under |
| `manus/de-extinction-eras-veo.md` | 106 Veo-prompter à 8 sekunder, stilbibeln, musikbädden |
| `analys/kanalen.md` | Siffrorna, topp- och bottenvideor, vad 464k-videon faktiskt var |
| `analys/konkurrenter.md` | Nio konkurrenter med kanal-ID, deras utliggare, vad de gör annorlunda |
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
