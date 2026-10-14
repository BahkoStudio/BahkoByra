# Kvist: Research

**En faktabank per video, byggd innan manuset skrivs.** Reglerna står i `../youtube.md` och
vinner om något här säger annat.

## Varför research kommer före manuset

Mathias satte 2026-09-11 ett golv på **minst 1 800 ord** per manus, efter att två manus
(1 169 och 884 ord) underkänts som för korta. Orsaken var för lite research före skrivandet,
inte loopen. Kritikerna i `/manusloop` tar bara bort text, så ett tunt förstautkast blir
bara tunnare.

Därför: gör researchen så stor att förstautkastet landar på cirka **1 950–2 200 ord**
(kritikerna trimmar några procent) och slutmanuset på 1 800–2 000. Bygg ut med nya belagda
avsnitt, till exempel studier med namn, tidskrift och år. Aldrig utfyllnad.

## Så görs det

1. Idén har gått genom Grinden (`../ideer/README.md`). Ingen research på en idé som inte
   klarat den.
2. Kopiera `research-mall.md` till `research/<video>.md`. Använd samma filnamn som
   manusfilen ska få i `../manus/`, så hör de ihop.
3. Fyll i mallen. Varje fakta får en rad med sin källa.
4. Skriv paketet (`../paket/`) och manuset (`../manus/`) **bara ur faktabanken.** Står det
   inte i faktabanken står det inte i manuset.
5. Efter runda 3 i manusloopen, innan paketet låses: slå upp de tidskritiska fakta live
   (se nedan).

## Källreglerna

- **Varje påstående ska gå att slå upp.** Påhittad bitkraft, hastighet, livslängd,
  temperatur, populationssiffra eller datum är oacceptabelt. Det är där falska djurfakta
  sprids snabbast och lever längst.
- **Källa per siffra.** Varje siffra i faktabanken har en egen källa på samma rad, inte en
  gemensam källista längst ner.
- **Hellre studien än artikeln om studien.** Namn, tidskrift och år.
- **Säger två källor olika** skrivs båda in under "Konflikter", och manuset får inte välja
  den som låter bäst.
- **Osäker: skriv om meningen** så den inte behöver siffran, i stället för att gissa.
  Exempel ur `../manus/de-extinction-eras.md`: *"How hard it could actually bite, nobody
  agrees on, so nobody gets to hand you a number."*
- **Ett djur har ingen avsikt.** Spänningen kommer från överlevnadsodds, tidspress eller en
  strid som inte går att vinna med styrka, inte från att djuret "valde" något.
- **Djuptidsformatet** ("What It Was Like to Live…"): varje scendetalj i öppningen
  (temperatur, ljud, vad man ser) måste också finnas i faktabanken.

## Tidskritiska fakta: slå upp live

Kritikerna kontrollerar mot faktabanken, inte mot världen. Ett påstående som var sant när
faktabanken skrevs kan vara föråldrat utan att någon kritiker märker det. Dodo-manuset sa att
mammutprojektet hade målet 2028; det hade redan flyttats till "early 2030s", och alla
kritiker godkände raden tre rundor i sträck.

Därför: **innan paketet låses** slås varje tidskänsligt påstående upp med en webbsökning.
Det gäller mål och deadlines för projekt, "senaste uppdatering", "ingen har ännu" och siffror
på pågående forskning. Det är ett eget steg efter runda 3, inte en till kritikerrunda.
CTA-målet (kanalens senaste video) kontrolleras på samma sätt.

## Var materialet ligger

| Vad | Var |
|---|---|
| Faktabanken (text med källor) | `research/<video>.md` i den här mappen |
| Källmaterial som inte hör hemma i git (PDF:er, nedladdade rapporter, långa utdrag) | OneDrive `C:/Users/mathi/OneDrive/2 Beast of Ages/Research/` |

Repot är publikt. Inga personuppgifter och inga belopp i faktabankerna.
