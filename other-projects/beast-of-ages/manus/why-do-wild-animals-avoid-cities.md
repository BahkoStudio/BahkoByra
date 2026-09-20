# Why Do Wild Animals Avoid Cities?

Beast of Ages. Manus och leveranspaket i samma fil — paketet överst.

**Status: klart att spela in.** 1 799 ord, cirka tolv minuter. Tre rundor manusloop (taket,
satt av Mathias 2026-09-09), fyra färska kritiker per runda (fakta, hook, klarhet, craft).
Ingen kritiker godkände rakt av i runda 3, men alla anmärkningar var mekaniska och
specificerade av kritikern själv (dela en mening, byt ett ord, stryk en rad, rätta ett
årtal) och är applicerade utan en fjärde AI-körning, enligt taket. Vad som rättades och
vad som medvetet står kvar finns under "Vad rundorna rättade". Förlagan är Knapps
*Why Don't We Eat Male Chickens?* (mall B i `analys/modelleringsguide.md`), en variabel
bytt: frågan. Ryggraden är staden som säker mark, inte rädslan för människor: den vinkeln
är övertäckt (se Grinden, steg 3). Byggd 2026-09-20 på Mathias idé. Faktabanken
(`bar-cities.md` i sessionens scratchpad) byggdes på primärkällor innan ett ord skrevs och
varje siffra i manuset verifierades av faktakritikern mot källa med URL i tre rundor.

**Grinden körd 2026-09-20. vidIQ-servern var nere, så steg 1–3 gjordes med yt-dlp mot
kanalen och YouTube-sök plus webbsök. Alla fem steg gröna, med ett villkor.**
Steg 1 (egen katalog, 90 videor listade): ingen video om städer, urbana djur eller
varför djur undviker människor. Steg 2 (tre formuleringar: "why do wild animals avoid
cities", "why don't wild animals come into cities", "why animals fear humans more than
predators"): den exakta frågan har ingen engelsk långform alls. Träffarna är
kompilationer (BRAIN TIME *Wild Animals Invading Cities Caught on Camera* 8,4 M, WOW TV
778 704) och PBS *Can Wild Animals and Humans Coexist in Cities?* (22 147, 2021, 95 000
pren.). Steg 3, **villkoret:** grannvinkeln "varför är djur rädda för människor" är
mättad av kanaler i vår klass under senaste tre månaderna: Myrk *Why are animals afraid
of humans?* 356 734 visningar på 3 780 pren. (juni 2026), Quark 571 935, Mack 501 567,
BraincientGuy 232 360. Professor Primal (5 140 pren.) gjorde *Why Do Wild Animals Hide
Near Humans From Bigger Predators?* i juli 2026 och fick 3 988, alltså ingen lyckad
jämförbar. Beslut: rädslan är ett stycke i manuset, inte ryggraden. Ryggraden är
staden som det säkraste stället på jorden och vilka djur som förstått det. Steg 4:
titeln delar frågeform med Knapp (mallen), inte med Myrk; miniatyren delar ingenting.
Steg 5: frågan är generisk, så miniatyren bär ETT djur (regel 12–13): leoparden i
Mumbai, stor, farlig, ritbar, och manusets höjdpunkt.

---

## Del 1 — Paketet

### Titlarna — nummer 1 är låst (Mathias idé)

#### 1. Why Do Wild Animals Avoid Cities?

**Mall:** LÅST. Knapp-vardagsfrågan rakt av, mall B. **Bevis:** Knapps *Why Don't We Eat
Male Chickens?* 262 891 på 3 350 pren.; hjortmanuset (Mathias godkänt) byggt på samma
form. vidIQ-titelpoäng: ej scorad, servern nere 2026-09-20.

Frågan ligger redan i huvudet på var och en som sett en räv i en förort. Manuset betalar
den med ett experiment vid 21 vattenhål, en flock på fyra tusen prärievargar och en
stad med leoparder.

#### 2. The Safest Place on Earth for a Wild Animal Is a City

**Mall:** Kontrastpåstående, betalas av lärdomen. Läggs bredvid Knapps titel utan
släktskap.

#### 3. Why Coyotes Live Longer in Chicago Than in the Wild

**Mall:** Ett djur plus en siffra (regel 13). Betalas ordagrant av Gehrts 60 mot 30
procent.

#### 4. There Are Leopards Inside Mumbai. Here's Why They Stay.

**Mall:** Ett djur, en plats, två meningar. Betalas av stycke tio.

#### 5. Wild Animals Aren't Afraid of Cities. They're Afraid of You.

**Mall:** Negativ parallellism i titeln (tillåtet där, inte i manuset). Risk: ligger
nära den mättade rädsla-vågen, se Grinden.

#### 6. The Animals Moved Into Our Cities When We Fell Asleep

**Mall:** Nattskiftet (mekanik 5) som titel. Betalas av Gaynor 1,36.

#### 7. 4,000 Coyotes Live in Chicago. Almost Nobody Has Seen One.

**Mall:** Siffra först, gåta sedan. Betalas av öppningsbilden.

#### 8. Why Wolves Won't Enter a City (And Coyotes Do)

**Mall:** Två djur i kontrast, "(And …)"-form. Betalas av Reinhardt och Gehrt.

#### 9. A City Is the One Place We Stopped Hunting. Almost No Animal Has Noticed.

**Mall:** Två meningar, mekanism i titeln. Risk: avslöjar svaret.

#### 10. There Is a Forest Inside Mumbai. It Has Thirty-Five Leopards.

**Mall:** Ett djur, en plats, en siffra (regel 13). Betalas ordagrant av stycke tio.

---

### Thumbnail

**Motivet kommer ur manusets höjdpunkt** (regel 16): leoparden på gränsen mellan skog
och storstad, stycke tio (Khanolkar-bilden: gränden, lampan, tornen i Goregaon bortom). Tittaren ska se ett stort rovdjur och en tänd stad i samma
bild, och undra vilken av dem som hör hemma där.

**Frågan vi vill väcka:** vad gör den där?
**Känslan:** att kartan över vad som är vilt och vad som är vårt inte stämmer.

**Text i bild — översta tredjedelen, vänsterställd.** A/B-testa dessa fyra:

| Variant | Ord | Kommentar |
|---|---|---|
| A | `WHY IT STAYS` | Leoparden som stannar, matchar titel 4 |
| B | `WHERE WE STOPPED HUNTING` | Lärdomen, matchar titel 9 |
| C | `IT'S NOT THE CITY` | Pekar på svaret utan att avslöja det |
| D | `NO HUNTERS HERE` | Svaret i tre ord, matchar titel 2 |

**Prompt:**

```
Photorealistic night photograph, a large adult leopard standing on a low concrete wall at the edge of a dark forest, seen from the side in three-quarter view, its head turned toward the camera, eyes catching the light, filling the lower two-thirds of the frame, and behind it, far below and out of focus, the dense orange and white lights of a vast city stretching to the horizon, warm haze over the skyline, the leopard's spotted coat tack-sharp against the soft glow, the upper third of the frame a deep dark blue sky with clear empty space reserved for text, no text, no letters, no logos, no people, no vehicles, 8k detail
```

**50-procentstestet:** täcker man nedre halvan syns texten uppe till vänster, leopardens
huvud och stadens glöd. Publiken är 45–70 och TV-tung.

**Motivering (svenska, ingår inte i prompten):** Ingen prärievarg. En prärievarg på en
gata är en bild publiken sett i tusen nyhetsinslag och väcker ingen fråga. En leopard
med en storstad bakom sig gör det, och den är manusets starkaste scen. Mörk himmel
upptill och tänd stad nedtill klarar TV-krympningen. Alternativ, om Mathias vill ha
öppningsbilden: en tom fyrfilig gata i Chicago klockan tre på natten med en ensam
prärievarg mitt på övergångsstället, text `4,000 OF THEM`. Sämre på frågan, bättre på
igenkänning.

### Beskrivning

```
Up to four thousand coyotes live in Chicago, and most people there have never seen one. Drive a few hours north and the wolves still will not come near it. So why do wild animals avoid cities?

The answer starts at twenty-one waterholes in South Africa, where a recording of two people talking sent elephants and rhinos running faster than a lion did. It runs through seventy-six studies of mammals that on average moved a third of their lives into the night, a moose herd whose calves are born a little closer to the highway every year, and a national park inside Mumbai where a few dozen leopards live on a diet of stray dogs. And it ends in the one place where the wolves came back sevenfold: a zone the size of Luxembourg that everyone left.

Chapters:
00:00 Three in the Morning
00:00 The Safest Ground
00:00 Twenty-One Waterholes
00:00 The Super Predator
00:00 The Night Shift
00:00 The Human Shield
00:00 Five Hundred Years
00:00 The Ones That Moved In
00:00 The Zone Everyone Left
00:00 The Last to Know

The animal that runs the same night schedule: You Meet a Hippo on Land at Night. Here's What Actually Happens.
```

### Pinnad kommentar

```
Quick test: which sound makes an elephant leave a waterhole faster, a lion or two people chatting? Scientists tested it at twenty-one waterholes. The answer is in the video. Have you ever had a wild animal show up where it had no business being?
```

### CTA — sista partiet i manuset

Pekar på **You Meet a Hippo on Land at Night. Here's What Actually Happens**, kanalens
senaste video (`4lbV2eXV2Lg`, publicerad 2026-09-19, hämtad med yt-dlp 2026-09-20
eftersom vidIQ var nere, aldrig gissad). Bryggan: nattskiftet. Flodhästen lämnar vattnet
i mörker och är tillbaka innan människorna vaknar, samma schema som prärievargen på
gatan. Nattskiftet planteras i stycke fem och i återkopplingen.

```
There is another video on this channel about an animal that keeps the same schedule. It leaves the water after dark, and it is back under the surface before anyone is up. It is about what happens when you meet it on land. It is called You Meet a Hippo on Land at Night. Here's What Actually Happens.
```

---

## Del 2 — Manuset

*1 799 ord, cirka tolv minuter. Snittmening 13,8 ord, längsta 25, noll
meningar över 25, noll tankstreck. Skrivs och läses på engelska. CTA:n ovan ingår som
sista parti.*

---

It is three in the morning in downtown Chicago, and a coyote is standing at the curb of a four-lane street. One taxi goes by. The coyote waits for it to pass, and then it is across and gone between two buildings before the light changes. Up to four thousand coyotes live in Cook County, which covers Chicago and its inner suburbs, among more than five million people. Most of those people have never seen one. A few hours north of Chicago, in the woods of Wisconsin, a wolf pack is running deer through the snow. No pack has ever settled in the city, or in the farmland around it. In Mumbai, a leopard walks past lit doorways at night. So why do wild animals avoid cities?

Your own guess is probably that they are afraid of us. Hold that thought, because it is true, and it points the wrong way. A second guess is that a city has nothing for them. Look at what a city actually holds. Food arrives in bins every night, and gardens stay watered through droughts that leave the countryside brown. Rats are everywhere, and so are the deer that eat the hedges. Wolves have spread back across Germany over the last twenty-five years. A team led by Ilka Reinhardt fitted eighteen of them with GPS collars to see how they use the land. The wolves strongly avoided towns and main roads, and they avoided them most of all in daylight. Inside a town, nobody is allowed to shoot them.

The answer begins at a waterhole. One dry season in the Greater Kruger area of South Africa, an elephant came down to drink. That region holds one of the largest lion populations left in the world. A speaker hidden by the water played a recording, and a camera filmed what the elephant did. Liana Zanette of Western University in Canada had set that trap at twenty-one waterholes. They lay in the private reserves along the western edge of Kruger National Park, and Zanette called it a mega-experiment. Whenever an animal came to drink, the speaker played the sound of lions, or of two people talking in a calm, normal voice. Barking dogs and gunshots went in as comparisons, and birdsong as a control. The experiment ran through one dry season, and nineteen species came to drink, elephants and rhinos among them. Nineteen out of twenty of those species ran more often from the human voice than from the lion. Zanette published the results in 2023. Some elephants went the other way and walked toward the lion speaker. One of them smashed it. Her team had already run a similar test on pumas in California. There, the sound of people talking cut a cat's feeding time on its kill by more than half.

There is a reason for that. In 2015, Chris Darimont at the University of Victoria compared how humans hunt with how other predators hunt. He used more than two thousand measurements of how fast a hunter takes its prey, on land and at sea. Wild predators mostly take the young. Humans take the adults in their prime. We kill large carnivores such as wolves and bears about nine times as often as those animals kill each other. And we do it from a distance, without ever coming close enough to be bitten. Now set that beside a city. More than five million of that predator live in Cook County alone.

So the animals that live near us changed when they are awake. In 2018, Kaitlyn Gaynor at the University of California, Berkeley, gathered seventy-six studies of mammals from six continents. She asked one question of all of them. What happens to an animal's daily rhythm when people move in? The answer was the same on every continent. Near people, mammals became on average about a third more nocturnal. The shift held whether the people were hunting or just hiking. Wild boar outside Kraków moved into the dark, and so did tigers in the Chitwan valley of Nepal. That is why the coyote crosses the street in the small hours. A city is not empty of wild animals. It is empty of them while you are awake.

The city has a second effect, and it shows up in the birth records of moose. Between 1995 and 2004, Joel Berger of the Wildlife Conservation Society followed a small group of marked moose cows. They lived in and around Grand Teton National Park. Those were the years when grizzly bears were spreading back into the valley. Each spring the cows gave birth about a hundred and twenty-five meters closer to the paved roads than the spring before. Ten years, ten steps toward the highway. The bears stay roughly five hundred meters from a road. A calf born by the roadside had a wall of asphalt between it and the animal that eats calves. Cows without calves stayed where they were, and so did cows in the parts of the range where the bears had not yet returned. Berger published the study in 2007 and called it a human shield.

The pattern repeats in Banff, in the Canadian Rockies, where the town sits inside the national park. Elk gather on its lawns, and wolves and cougars seldom follow them in. The valley's elk herd has shrunk since the nineties, as the wolf pack came back. Parks Canada counts dozens of elk killed on the park's roads and railway every year. Its wardens spend part of every season herding the elk back toward the forest. Across the United States, State Farm, an insurance company, estimates that drivers hit animals nearly two million times in a single year. Most of those animals were deer. More of the collisions came in November, the deer mating season, than in any other month. A driver in West Virginia had the highest odds in the country of hitting one.

For most of history, a town was where the hunters slept, and the most dangerous place an animal could go. England was paying a bounty on wolves as early as 1212, and by around the year 1500 it had no wolves left to pay for. Today a rifle fired inside a city is a crime almost everywhere.

Stanley Gehrt at Ohio State University has tracked the coyotes of Chicago since the year 2000, more than twenty-five years and counting. His team collars the adults and puts microchips in the pups. In 2020 his best estimate for Cook County was about three thousand seven hundred, roughly double what it was in 2005. A coyote in the city has about a sixty percent chance of surviving the next year. A coyote in the countryside has about thirty. The city ones are more nocturnal than their rural cousins. They raise their pups in cemeteries and on golf courses, and one den turned up in a parking garage. Gehrt's cameras have caught them stopping at the roadside until a car has passed before they cross. Berlin tells the story with a different animal. The city's own estimate is around five thousand wild boar. Researchers at the Leibniz Institute for Zoo and Wildlife Research found two kinds of Berlin boar. One kind wanders in from the countryside. The other kind is born inside Berlin and dies inside Berlin, in three separate pockets of forest that the city grew around.

And then there is Mumbai. At night, leopards walk out of the woods in the middle of the city and into the settlements along its edge. In January 2016 an infrared camera in Aarey, one of those settlements, caught one of them. The photograph shows a leopard in a narrow alley, under a single pale bulb, looking straight into the lens. The houses on either side belong to tribal families who live along the park's edge. Beyond the settlement stand the apartment towers of Goregaon. The photographer, Nayan Khanolkar, had waited four months for that frame. Those woods are a national park called Sanjay Gandhi, a hundred and four square kilometers of trees inside a city of some twenty million people. In 2018 Alexander Braczkowski of the University of Queensland and his colleagues put its leopards at around thirty-five. Stray dogs make up about forty percent of what those leopards eat. By his team's reckoning, the park's leopards take on the order of fifteen hundred dogs a year. In Mumbai, where dog bites spread rabies, that is fifteen hundred fewer dogs on the streets. In the early 2000s, leopards trapped elsewhere were trucked in and released inside the park. In 2002 alone, twenty-five people were attacked. A decade later the releases were long over. Residents were meeting with the forest department and the biologist Vidya Athreya about where the leopards walked at night. From late 2013 into 2016, the park had no serious attack at all.

Here is the uncomfortable part: the city was safe ground all along. The proof is in the places where the people left. After the reactor exploded at Chernobyl in 1986, an area larger than Luxembourg was emptied of people. The zone straddles the border of Ukraine and Belarus. Tatiana Deryabina's team counted animal tracks in the snow on the Belarusian side, walking fixed routes every winter from 2008 to 2010. Elk and wild boar were as common inside the zone as in the nature reserves nearby. Wolves were about seven times as common. The difference between the zone and the reserves was hunting. Inside the zone, legal hunting had ended in 1986.

Then in the spring of 2020 the cities themselves ran a version of that experiment. Christian Rutz and his co-authors gave it a name, the anthropause, in the journal Nature Ecology and Evolution. They asked researchers everywhere to pool the tracking data from animals that were already wearing collars and tags when the world stopped. Pumas were filmed walking through Santiago, the capital of Chile. At the University of California, Davis, Fraser Shilling's road ecology team counted the animals killed on the state's highways in those weeks. With the traffic gone, the count fell by about a fifth.

The safest ground a wild animal can stand on is wherever we stopped hunting, and most often that is a city.

Which brings it back to the coyote at three in the morning, waiting at the curb. It is standing on that ground. The wolf is still a few hours north, keeping to the woods.

There is another video on this channel about an animal that keeps the same schedule. It leaves the water after dark, and it is back under the surface before anyone is up. It is about what happens when you meet it on land. It is called You Meet a Hippo on Land at Night. Here's What Actually Happens.


---

## Vad rundorna rättade

Tre rundor, fyra kritiker per runda. Sammanfattat efter tema:

1. **Fakta (runda 1–3):** "vargarna en timme norr om Chicago" (Illinois har inga flockar;
   Wisconsins ligger flera timmar bort) → "a few hours north"; Darimonts "två tusen arter"
   var 2 125 skattningar → "measurements"; State Farm-siffran var branschuppskattning för
   alla djur, inte bolagets egna hjortanspråk → "estimates … nearly two million … most of
   them deer"; Kruger hade FEM inspelningar (fågelsång som kontroll), inget fältår i
   artikeln → årtalet struket, kontrollen nämnd; 1212-beloppet osäkert (5 eller 10 shilling
   för två vargar) → beloppet struket; Berlins "handful" jägare är ca 30 → siffran struken;
   Berlin-boaren "vandrar ut igen" saknar stöd → struket; Mumbai: leoparderna släpptes IN i
   parken (inte ut ur den), "peaked 2002" motsägs av Athreyas 30/år 2004–05 → "In 2002
   alone", "in the early 2000s"; lugnet var okt 2013–juni 2016 (sju attacker 2017) →
   "From late 2013 into 2016"; "parkens biologer" → forest department + Vidya Athreya;
   Tjernobyl "ingen jakt sedan 1986" → "legal hunting had ended"; vägdöden under lockdown
   är UC Davis (Shilling), inte Rutz → namngiven; "half a million years of instinct" och
   "six weeks" (lockdown) var uppdiktade → strukna.
2. **Agens-språk:** "worked that out", "stopped believing us", "learned the two rules",
   "not braver than the wolf", "live as if that were true", "found out" → allt omskrivet
   till observerat beteende; lärdomen bytte från "the last to find out" till "wherever we
   stopped hunting, and most often that is a city" (som dessutom håller mot Tjernobyl,
   hookkritikerns fynd i runda 3).
3. **Negativ parallellism:** sju i runda 1 → en (Gaynor-slutet "not empty … while you are
   awake"); "Radiation is no friend…", "never the wall/barrier", "not about the city",
   "instead of" ×2 alla strukna eller rakställda.
4. **Fraktala sammanfattningar:** åtta styckesslut i aforismform → två (lärdomen och
   Gaynor-slutet). "The most frightening sound on the savanna was a conversation",
   "The road has no teeth…", "the line moves", "Something keeps the wolf out…",
   "Within weeks … in the streets" strukna; styckena slutar nu på fakta.
5. **Trekolon:** elva i runda 1 → noll. Artlistan i Kruger, Gaynors tre exempel,
   rifle/trap/hound, pumor/schakaler/vägdöd, orsakskedjan i Mumbai, lodjur/hästar i zonen.
6. **Hook:** öppningsbilden motsade sig själv ("tom gata" + "lucka i trafiken") → en taxi;
   vargen fick en lika konkret bild (flocken i Wisconsin-snön) och står omedelbart före
   frågan, leoparden flyttad till direkt före frågan; tittarens egen gissning (rädslan)
   erkänns med "Hold that thought … it points the wrong way" i stället för att avfärdas;
   slutets lärdom spenderades i gissningsstycket → sparad till slutet; fisk-siffran i
   Darimont (avhoppspunkt) struken.
7. **Craft:** svepet var fyra meningar → exakt tre (67 ord); moose/Banff-stycket 269 ord →
   delat; Tjernobyl/lockdown 244 ord → delat vid "Then in the spring of 2020"; Mumbai
   öppnar på fotot med tornen i Goregaon bortom (miniatyrens källa); pumorna flyttade efter
   elefanten; Gehrts siffertrav (fyra siffror i två meningar) → en siffra med riktning;
   paketet synkat (titel 9 och 10, thumbnailtext B och D, beskrivningen, kapitel, CTA-block).

**Kvarstående, medvetet inte åtgärdade (ingen fällde en runda på egen hand):** artparen i
Kruger-stycket är strukna till "elephants and rhinos among them" men hookkritikern tyckte
stycket fortfarande är metodtungt (kontroll, jämförelser) — behållet eftersom
faktakritikern krävde att kontrollen nämns; "forest" förekommer fyra gånger (klarhet ville
ha tre), varav två är egennamn/myndighet (forest department); Gehrt-stycket säger
"twenty-five years and counting" som är räknat från 2000, inte hämtat ur en källa som
säger just det.
