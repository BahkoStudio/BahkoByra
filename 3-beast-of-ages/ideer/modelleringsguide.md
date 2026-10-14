# Modelleringsguiden

*Skapad 2026-08-29. Reglerna kommer från `CLAUDE.md` och `youtube.md` — den här filen
lägger till det som lärdes den här sessionen och samlar Mathias egna godkända referenser.*

**Vad filen är till för:** att svara på "får den här idén byggas, och hur?" innan en
manusloop startar. `utliggare-att-modellera.md` säger vad som finns där ute.
Den här säger vad vi gör med det.

---

## Del 1 — Reglerna

### Ärvda (redan beslutade, står oförändrade)

1. **Mät på median, aldrig på snitt.** Gäller egna kanalen och varje referens.
   Kanalens median är ungefär 1 300.
2. **Långform-filtrering först.** Är kanalen Shorts i förklädnad är siffran oanvändbar.
   Fyra av nio "toppval" i Grow Channels-listan hade noll långformsvideor.
3. **Publiken är män 45–70, tyngdpunkt 65+.** Tolvåringstestet är en läsbarhetsribba,
   inte en publikbeskrivning.
4. **Utliggarribban är 3 000–5 000 visningar.** Kanalen står i testläge, inte
   dubbla ner-läge. Direktvargsspåret är slut.
   Källdokumentet ordagrant med fallstudie: `reference/testa-vs-dubbla-ner.md`.
5. **Inga påhittade djurfakta.** Osäker siffra betyder att meningen skrivs om så den
   inte behöver siffran.
6. **Unikhetsregeln:** tre olika formuleringar via `vidiq_youtube_search` innan en loop
   startar. En formulering räcker inte — det var så Pig Milk-manuset kasserades.
7. **Max 2 000 ord. Paketet före manuset.** CTA:n pekar på faktiskt senaste video,
   hämtad via `vidiq_channel_videos`, aldrig gissad.
8. **Breakout-talet mäter avvikelse från kanalens eget snitt**, inte om videon går att
   kopiera. Kolla format och genre innan en titel plockas.

### Nya (lärda 2026-08-29)

9. **Kolla egen katalog före konkurrenter.** Grönlandshaj-idén föll på att kanalen redan
   gjort den (`15 Mindblowing Facts About Animals That Don't Age`, 2026-08-02). Egen kanal
   är billigast att kolla och lättast att missa, eftersom unikhetsregeln bara letar utåt.
   Kör `vidiq_channel_videos` på egna kanalen som steg ett, alltid.

10. **Kolla om en jämförbar kanal gjort det nyligen.** En stor kanal som täckt ämnet är en
    varning. En **jämförbar** kanal som nyss lyckats är ett stopp. Chronic wasting
    disease dödades av Pack Vibes: 18 500 prenumeranter, 738 822 visningar, tre månader
    gammal, nästan exakt konceptet.

11. **Sök på ämnet, aldrig på vår egen kategorietikett.** Sökorden "de-extinction" och
    "wild animal biology" gav spelgenomspelningar och barn-djurljud. "extinct animal" och
    "prehistoric predator" gav riktiga träffar. Sök på art, plats eller fenomen.

12. **Djuret är hela skillnaden, inte mallen.** Identisk Knapp-matfråga:
    hippo **529 653** visningar, duva **60 095**. Välj det stora, farliga, ritbara djuret.
    Samma insikt som Species Decoder gav: megalodon 54 190, stegosaurus 154.
    Renaste beviset hittills (2026-09-09): Wilder America körde `Scientists Found the
    "Extinct" [X]` två gånger på tretton timmar — Atlaslejon **127 377**, kaspisk tiger
    **6 515**. Se mall A.

13. **Ett djur plus en konkret siffra slår flera djur plus ett begrepp.**
    Cheetah-videon (en kejsare försökte 9 000 gånger, ett djur) **997 601** visningar.
    Konvergent evolution över fyra djur, samma längd, samma kanalklass: **33 971**.
    Skillnaden är 29 gånger. Wilder Americas största video någonsin är samma sak i
    stor skala: Nilgai i Texas, tolv djur blev trettiotusen, **1 045 376** visningar.
    Deras hybridvideo med sex djur ligger på nionde plats hos dem själva.

14. **Mall A får bara användas när videon faktiskt avslöjar något.**
    `Biologists Finally Know What's Hunting [X] in [plats]` lovar ett fynd.
    Yellowstone-videon betalar det (grizzlyns största naturliga fiende är en annan
    grizzly). Vi betalar löftet eller använder inte mallen. Det var precis därför
    titelkritikern strök La Brea-varianten. Kaspisk tiger-videon (6 515) är
    motexemplet i skarpt läge: "found the extinct" var en utsättning, inte ett fynd.

15. **Modellering, aldrig kopiering.** Samma ämne som en referens är tillåtet. Samma
    titelformulering plus samma miniatyrkomposition är kopiering, och det straffas hårt:
    en kanal tog Economics Explaineds titel ordagrant och byggde om miniatyren element
    för element med ett ord utbytt — **5,1 miljoner visningar mot 2 500**. Källa och
    bevisbilder: `reference/modellering-vs-kopiering.md`.

    Kontrollfrågan före publicering: går titeln att lägga bredvid referensens utan att
    man ser att de är släkt, och delar miniatyren komposition, färgspråk eller
    textplacering med den? **Mallarna nedan är element att bygga om, inte formulär att
    fylla i.**

    Konkret 2026-09-09: `— And It Shouldn't Be Possible` och `— And No One Can Explain
    Why` sitter på ett tjugotal Wilder America-videor. De är nu deras signatur, inte en
    fri mall. Se mall A.

16. **Miniatyrmotivet väljs ur manusets höjdpunkt**, inte ur titeln och inte ur en
    generisk bild av djuret. Vanligtvis mekanik 6 (den mörkare mittvändningen) eller
    mekanik 8 (den obekväma sanningen). Fyra hårda krav, fulla reglerna i
    `reference/thumbnail-reglerna.md`:

    - **50-procentstestet.** Täck nedre halvan — finns nog kvar för att någon ska vilja
      trycka ned på fjärrkontrollen? Text i **översta tredjedelen**. Publiken är 45–70
      och tittar på TV, så det här är kanalens viktigaste miniatyrregel.
    - **Fråga och känsla före relevans.** Börja inte med "vad ska jag visa" utan med
      "vad ska tittaren undra och känna". *Questions and emotions trump relevance every
      time.*
    - **10–15 referenser före varje miniatyr**, från fem håll: egna utliggare, andras
      utliggare, modellkanaler, bokmärken, utanför plattformen. Låna **mekanismen**
      (hur den väcker frågan), aldrig kompositionen.
    - **Textvarianter.** Fem minuter på alternativa ord varje gång text sätts i bild.

**Ingen utförbarhets- eller nischspärr.** Referenserna nedan är godkända av Mathias och
gäller även när formatet ligger utanför kanalens vanliga. Vad som går att låna ur var och
en står i kolumnen "Att låna".

---

## Del 2 — Mathias godkända referenser

*Femton videor. Elva inlämnade 2026-08-29, fyra 2026-09-09 (markerade ★). Sorterade
efter visningar. Siffrorna för de fyra nya och Yellowstone är hämtade 2026-09-09.*

| Visningar | Titel | Kanal | Längd |
|---|---|---|---|
| 103 514 223 | World's Biggest vs Smallest Egg — Hatching Experiment | Dr. Plants (5,69M) | 14:19 |
| 2 152 837 | A Wall of Water Hit Nepal With No Rain — Here's What Actually Fell | GeoOrigins | 10:25 |
| 997 601 | Why Cheetahs Are Friendly (But Never Domesticated) | Pack Vibes (18 400) | 15:59 |
| 644 310 | DARKEST things ancient humans did to Survive the cold | Oddlyhuman | 8:35 |
| 529 653 | Why We Don't Eat Hippo meat? | Bright Psycho | 16:41 |
| 442 948 | Biologists Finally Know What's Hunting the Grizzlies in Yellowstone (var 288 753 den 29 aug) | Wilder America (19 500) | 24:41 |
| 227 408 | 15 of the World's Rarest and Most Endangered Animals | Before It Happened (5 470) | 33:15 |
| 155 925 | Do Wild Animals Think Humans Are Weak? | Thalvor | 8:35 |
| ★ 153 988 | Hybrid Animals Are Taking Over America — And It's Already Too Late to Stop Them | Wilder America (19 500) | 21:11 |
| ★ 127 377 | Scientists Found the "Extinct" Atlas Lion — And It Shouldn't Be Possible | Wilder America (19 500) | 21:25 |
| 126 080 | Biologists Finally Know What's Hunting Grizzly Bears In Montreal | Wild Uncover | 11:25 |
| ★ 76 833 | Horse Evolution Explained | Curious Cabinet (13 400) | 18:53 |
| 60 095 | Why Do We Eat Chickens But NOT Pigeons? | Quirk | 10:01 |
| 33 971 | Why Evolution Keeps Turning Animals Into Cats | Amazon Archives | 15:20 |
| ★ 26 439 | How One Egg Helped Life Conquer Land | Colossal Biosciences (766 000) | 14:43 |

### Mall A — "Biologists Finally Know What's Hunting [X] in [plats]"

**Yellowstone-grizzly** (288 753) · **Montreal-grizzly** (126 080) · publicerade tre dagar isär.

Det här är Apex Paleo-mallen ur `utliggare-att-modellera.md`, nu bekräftad på två nya
kanaler samtidigt. **Hetast av allt i högen.**

*Att låna:* strukturen där ett spår presenteras först och förövaren sist. Yellowstone
betalar löftet med sexuellt selekterat infanticid och kannibalism efter att den inhemska
födan kollapsat. Montreal sträcker sig längre, mot kryptozoologi och obekräftade
observationer — den vinkeln tar vi inte, faktaregeln stoppar den.

*Regel som gäller:* nummer 14. Vi måste ha ett verkligt fynd att leverera.

**Tillägg 2026-09-09 — Wilder America är en mallmaskin, och det ändrar hur mall A får
användas.** Kanalen skapades 2026-05-05. Fyra månader senare: 19 500 prenumeranter,
61 videor, 3 056 689 visningar, och Yellowstone-videon har gått från 288 753 till
**442 948**. Publiceringstakten är cirka 40 videor i månaden, senaste veckan över två
om dagen. Alla 20–28 minuter. Mathias lämnade in två till härifrån: **Atlaslejonet**
(127 377, 21:25) och **hybriddjuren** (153 988, 21:11).

Hela katalogen körs på fem-sex titelmallar med bytt djur och plats:

| Mall | Bäst | Sämst |
|---|---|---|
| `Scientists Finally Found What's Hunting/Killing [X] in [plats] — And It Shouldn't Be Possible` | Pytonormar Everglades 416 244 | Älg Maine 10 900 |
| `Scientists Found the "Extinct" [X] — And It Shouldn't Be Possible` | Atlaslejon 127 377 | Kaspisk tiger 6 515 |
| `[Rovdjur] in [plats] Are Growing Far Bigger Than They Should — And No One Can Explain Why` | Prärievargar nordöst 228 096 | Lodjur nordöst 23 588 |
| `N Predators in [plats] That Grow Far Bigger Than They Should` | 11 Appalacherna 136 007 | 7 Alaska 1 034 |
| `[Exotiskt djur] Are Spreading in [plats] — And They're More Dangerous Than You Think` | **Nilgai Texas 1 045 376** | Aoudad Texas 9 447 |

*Vad paret Atlaslejon/kaspisk tiger bevisar:* samma mall, samma kanal, publicerade
tretton timmar isär (7 och 8 september), **tjugo gångers skillnad**. Lejonet är ett djur
alla känner, och titelns löfte betalas: 700 år gammalt skall-DNA från Towern kopplat till
den marockanska kungablodlinjen. Tigern är en underart få känner, och "found the extinct"
är i själva verket en utsättning i Kazakstan den 31 juli. Regel 12 och regel 14 i ett
enda dygn.

*Vad Nilgai bevisar:* deras största video någonsin är ett djur, en plats och en siffra —
tolv djur släppta på King Ranch för hundra år sedan, trettiotusen i dag, bärare av
boskapsfebersfästingen. Regel 13. Hybridvideon Mathias lämnade in har sex djur och ligger
på nionde plats i deras egen katalog. Låna ramen ("naturens svar på luckorna människan
lämnade"), inte listformen.

*Att låna:* fortfarande strukturen — spår först, förövare sist, ett verkligt fynd.
**Att INTE låna:** suffixen. `— And It Shouldn't Be Possible` och `— And No One Can
Explain Why` står på ett tjugotal av deras videor och är nu deras signatur. Ordagrant
återanvända faller de på Grindens steg 4 (regel 15). **Saiga-paketets titel 3 använder
det första — byt före publicering.**

*Volymvarningen:* deras träffprocent är kanske en av tre (7 Alaska 1 034, 10 Ridges 2 265,
7 Texas 2 722, kaninerna 3 928, kaspisk tiger 6 515). De sprayar mallen över varje djur
och plats och låter algoritmen välja. Vi släpper fyra i månaden och måste träffa djuret
första gången. Det är därför Grinden finns.

*Grindens steg 3 — spår Wilder America ockuperat sedan mitten av augusti 2026:* thylacin
(171 782), hybrider/grolar/coywolf (153 988), "utdöd art återfunnen" (Atlaslejon, kaspisk
tiger, `9 Animals Science Says Are Extinct That Keep Being Caught on Camera` 189 867,
jaguarundi, "ranger broke his silence"), Yellowstone-grizzly (442 948), pytonormar
(416 244), prärievarg och rödvarg-DNA (228 096 och `Big Cat That Shouldn't Exist in
North America`). En jämförbar kanal som nyss lyckats är ett stopp. Pizzly-idén som dog i
Grinden 2026-08-29 dog rätt.

### Mall B — Knapp-matfrågan, "Why do/don't we eat X?"

**Hippo** (529 653, 16:41) · **Duva** (60 095, 10:01).

Duvvideon är en ren klon av kanalens egen förlaga (Knapps *Why Don't We Eat Male
Chickens?*). Att hippon gör nästan nio gånger duvans visningar på identisk mall är det
tydligaste beviset i hela materialet för regel 12.

*Att låna:* mallen är redan bevisad hos oss. Det som avgör är djurvalet.

### Mall C — paradox på ETT känt djur

**Cheetah** (997 601) · **Konvergent evolution/katter** (33 971).

*Att låna:* cheetah-videon har ett djur, en paradox och en konkret siffra som betalar den.
Katt-videon har fyra djur och ett abstrakt begrepp. Samma längd, samma kanalklass,
29 gånger skillnad. Det här paret är regel 13 i sin renaste form.

### Mall D — ytterlighetsjämförelse

**Dr. Plants ägg-experiment** (103 514 223, 5,69M prenumeranter, 12 videor totalt).

Mekanismen är ett fysiskt experiment på film: han beställer 10 strutsägg, 20 ankägg och
100 vaktelägg och kläcker dem. Den delen finns inte att låna för en faceless kanal.

*Att låna:* **formen "största mot minsta" med riktiga tal.** Den kräver ingen inspelning.
Ämnet är dessutom redan bevisat hos oss — `The Artificial Egg Built to Hatch a Moa` gjorde
9 505 visningar och är kanalens enda nyare video över utliggarribban. Ett moa-ägg rymmer
ungefär åttio gånger ett hönsäggs volym; den siffran finns redan faktagranskad i
äggmanuset.

**Tillägg 2026-09-09 — Colossals eget äggmanus.** `How One Egg Helped Life Conquer
Land` (26 439, 14:43, publicerad 2026-09-01) är källan bakom vårt moa-ägg. Som
prestationsreferens är den svag: 26 439 på 766 000 prenumeranter är en bottenvideo för
dem. Det som går att låna är ryggraden: en uråldrig uppfinning (fostersäcksägget, 300
miljoner år) → hur den fungerar → de konstigaste levande exemplen → nu bygger vi om
uppfinningen själv. Det är mall G:s kedjeförklaring flyttad till biologi.
*Varning:* Colossal är källan till nyheterna, inte en konkurrent (`konkurrenter.md`).
Att modellera deras egna videor drar kanalen tillbaka mot det Colossal-beroende
panelen satte tak på (30 procent, `panelens-beslut.md` punkt 4).

### Mall E — listformatet

**15 of the World's Rarest and Most Endangered Animals** (227 408, 33:15, 5 470 prenumeranter).

Samma format kanalen redan kör med `15 Mindblowing Facts`. Bekräftar att formatet bär på
en liten kanal och att 33 minuter fungerar.

*Att låna:* längden. Kanalens listvideor ligger på 10–11 minuter.

**Tillägg 2026-09-09.** Wilder Americas hybridvideo (153 988, sex djur) är mid-tier i
deras egen katalog — deras endjursvideor slår den. Samma bild på vår kanal, se del 2b:
`15 Mindblowing Facts About De-Extinct Dire-Wolf Pups` 61 965 mot `15 De-Extinct
Mammoth Facts` 5 972 på identiskt format. Listformatet bär, men djuret bär mer.

### Mall F — människan i naturen

**Istidsmänniskor** (644 310, 8:35) · **Tycker djur att människor är svaga?** (155 925, 8:35).

Båda är människo-fokuserade snarare än djur-fokuserade, och båda är korta för nischen.
Thalvor-videon anger fyra namngivna studier i beskrivningen (Oxford, UC Santa Cruz,
Imperial College, Melbourne) — samma bevisdisciplin som kanalen redan håller.

*Att låna:* öppningen som sätter tittaren i scenen. Thalvor: *"Du är ensam i skogen.
Tio meter bort står en varg och tittar på dig. Den har gjort det i två minuter."*
Det är samma mekanik som Edmunds *"en bit av dem finns inuti dig just nu"*.

### Mall G — katastrofen förklarad timme för timme

**Nepal-floden** (2 152 837, 10:25).

Geologi och nyhetsdriven katastrof, inte djur. Publicerad dagen efter händelsen.

*Att låna:* kedjeförklaringen. Videon förklarar hur en isavlossning på 5 200 meters höjd
blev ett stenras, som genom "entrainment" blev en flodvåg tiotals kilometer nedströms.
En orsakskedja där varje led utlöser nästa — det är exakt formen ett bra utdöende-manus
har.

*Varning:* nyhetsdriven publicering kräver att man är först. Kanalen släpper 4 videor i
månaden och kan inte vinna det loppet.

### Mall H — "[Känt djur] Evolution Explained" (ny 2026-09-09)

**Curious Cabinet.** 13 400 prenumeranter, tjugo videor, 1 976 494 visningar, skapad
2025-02-26. Mathias lämnade in **Horse Evolution Explained** (76 833, 18:53, publicerad
2026-08-31).

Mallen är repeterbar hos dem och har noll klickbete: Häst 76 833 · Uggla 84 068 · Panda
62 199. Tre av tre över 60 000. Släktmallen `How [djur] Evolved [drag]` är svagare och
spretigare: sköldpaddans skal 68 440, apornas svans 17 923, lysande ögon 12 092, ormens
ben 6 132.

Deras två största är Knapp-frågor: `Where Are All The Flightless Bats?` (344 908 —
flyglöshet har uppstått gång på gång hos öfåglar men aldrig hos fladdermöss; frågan är
äkta och svaret finns) och den nyhetsdrivna `Science Has Found a Whole New Kingdom of
Life` (1 210 657, 6:47).

*Vad det bevisar:* det kända djuret vinner även med platt titel — häst, uggla, panda över
60 000; vattenlevande sengångare 4 599, näbbmöss 7 177, oxhackare 4 370. Regel 12 igen.
Hästvideons beskrivning öppnar med myt-dödandet ("often portrayed as a straight line —
the truth is far more complex", mekanik 3) och listar femton primärkällor (Nature,
Science, PNAS). Thalvor-nivå på bevisen.

*Att låna:* den platta titeln som test. `panelens-beslut.md` punkt 4 pekade ut spåret
"djuret du tror att du känner, och vad DNA:t säger" med hund/varg och häst/przewalskihäst.
Curious Cabinet har nu bevisat spåret med titeln rakt av. **Hästen är tagen** (steg 3:
jämförbar kanal, nio dagar sedan). **Hunden är inte det** — deras katalog saknar den.

*Varning:* deras publik är essäpublik, spekulativ evolution och paleontologi. Vår är
45–70 på TV. Titelmekaniken är publikoberoende; tonen är det inte. Testa en gång och mät.

---

## Del 2b — Mathias egna utliggare (inlämnade 2026-09-09)

*Tre egna videor att modellera. Siffror via `vidiq_channel_videos` och
`vidiq_video_stats` 2026-09-09. Kanalen: 2 630 prenumeranter, 125 videor, 862 773
visningar.*

| Visningar | Titel | Publicerad | Längd | VPH nu |
|---|---|---|---|---|
| 61 965 | 15 Mindblowing Facts About De-Extinct Dire-Wolf Pups | 2026-05-23 | 11:54 | **28,54** |
| 23 314 | The Thylacine Is Coming Back… But Something's Wrong | 2026-06-20 | 13:02 | 3,97 |
| 9 516 | The Artificial Egg Built to Hatch a Moa | 2026-07-12 | 11:10 | 7,01 |

### Direwolf-fakta: kanalens motor just nu, inte 464k-videon

Den har högst VPH på hela kanalen. 464k-videon ligger på 10,94; den här på 28,54.
Kurvan 15 augusti till 8 september: 45 709 → 60 963, plus 15 254 på 24 dagar, ungefär
640 om dagen. Och den accelererade: VPH låg på 8–20 i mitten av augusti, hoppade till 47
(24 aug), 84 (28 aug), 94 (29 aug) och har sedan legat 22–62. Något tände den igen i
slutet av augusti. Vad, säger inte vidIQ.

**Formatet har nu klarat utliggarribban två gånger.** `15 De-Extinct Mammoth Facts`
(2026-07-10) gjorde 5 972. Enligt `reference/testa-vs-dubbla-ner.md` är det signalen:
dubbla ner på formatet **en gång** och mät. Tio gångers skillnad mellan varg och mammut
säger samtidigt att formatet inte bär av sig självt — vargen hade nyhetsvågen och
berömmelsen, mammuten bara berömmelsen. Regel 12 gäller listor också.

### Thylacinen: samma djur, samma vinkel, sju gånger mindre

Vår video (23 314, 13:02) och Wilder Americas `Thylacines Are Reappearing in Tasmania —
And They Shouldn't Be This Big` (171 782, 20:38, 2026-08-18) är båda observationsvideor.
Skillnaden sitter i titeln. Deras har en konkret, kontrollerbar paradox: vittnen
beskriver ett vargstort djur, skelettskanningar visar att den riktiga thylacinen var
hälften så stor. Vår säger "something's wrong" — en menande paus utan innehåll. Mekanik 4
(en detalj bär svaret) i titeln slog vår oprecisa olyckskänsla.

Ellipsis-suffixen (`…But Something's Wrong`, `…That's the Problem`, `…Everything
Changes`) är kanalens husstil och sitter på alla sex största (467 826, 83 615, 23 314,
19 280, 14 416, 10 640). Men alla sex är Colossal-videor. Suffixet har aldrig burit ett
ämne utanför nyhetsvågen. Och thylacin-spåret är nu ockuperat (steg 3).

### Moa-ägget: den platta titeln som bär

Näst högst VPH på kanalen (7,01) med en titel utan suffix, utan siffra, utan fråga.
Kanalens två levande dragare just nu är alltså en räknad lista och en rak beskrivande
titel — ingen av dem använder husstilens ellipsis. Colossals egen version av samma ämne
(mall D, tillägget) gjorde 26 439 på 766 000 prenumeranter, så äggets allmänna dragkraft
är måttlig; våra 9 516 kom sannolikt av moa-kläckningen i maj som nyhetskrok.

### Referenspunkt för de två nya manusen

Saiga (`cZuFauecu-0`, publicerad 2026-08-29): 330 visningar efter elva dagar. Hjort
(`hCvJVQGYypg`, publicerad 2026-09-01 som *Why Deer Freeze When They See Headlights*):
260 efter åtta dagar. För tidigt att döma — 464k-videon låg på 816 efter 26 dagar. Mät
igen dag 30. Siffrorna står här så att jämförelsen går att göra.

---

## Del 3 — Grinden: kollas ALLTID på en vald idé, före allt annat

**Den här körs när en idé är vald och innan en enda rad skrivs.** Inte på idélistan, inte
på ett ämnesområde — på den faktiska idén. Grinden kostar 15 credits. En kasserad
manusloop kostar nio rundor kritiker.

### Steg 1 — Har vi redan gjort den?

    vidiq_channel_videos({ channelId: 'UCWxSYqJuIrRX92qZTEm2XwA',
                           videoFormat: 'long', popular: false })

Läs igenom **hela** listan, inte bara titlarna som liknar idén. Grönlandshajsidén dog här:
studien låg inbakad i `15 Mindblowing Facts About Animals That Don't Age` utan att synas i
titeln.

**Dödar idén:** ämnet finns i en egen video, även som ett avsnitt inuti en listvideo.

### Steg 2 — Har någon annan gjort den?

    vidiq_youtube_search({ query: '<formulering>', type: ['video'], order: 'viewCount' })

**Tre olika formuleringar, aldrig en.** En formulering missade att Knapp publicerat exakt
samma fråga tolv dagar tidigare, och Pig Milk-manuset fick kasseras färdigskrivet.

Sök på **art, plats eller fenomen** — aldrig på vår egen kategorietikett. "de-extinction"
och "wild animal biology" gav spelgenomspelningar och barn-djurljud. "extinct animal" och
"prehistoric predator" gav riktiga träffar.

**Dödar idén:** en färsk eller synlig video med samma idé i engelsk långform.
**Dödar inte:** efterfrågan bevisad i Shorts eller på andra språk medan engelsk långform
står tom — *det är exakt gapet kanalen kan äga.*

### Steg 3 — Har en JÄMFÖRBAR kanal nyss lyckats?

Filtrera träffarna från steg 2 på kanalstorlek och datum.

| Vad du hittar | Vad det betyder |
|---|---|
| Stor kanal (100k+) har täckt ämnet | Varning. Vinkeln måste vara tydligt annorlunda |
| Kanal i vår storleksklass, äldre än sex månader | Gå vidare, men läs vad de gjorde |
| **Kanal i vår storleksklass, lyckad, senaste sex månaderna** | **Stopp. Idén är död.** |

Chronic wasting disease dog här: Pack Vibes, 18 500 prenumeranter, 738 822 visningar,
tre månader gammal, nästan exakt konceptet.

Wilder America (19 500 prenumeranter, fyra månader gammal, cirka 40 videor i månaden)
ockuperar sedan augusti 2026 thylacin, hybrider, "utdöd art återfunnen",
Yellowstone-grizzly, pytonormar och prärievarg/rödvarg. Listan med siffror står under
mall A. Kolla deras senaste 50 (`vidiq_channel_videos`, `popular: false`) innan varje
ny idé — de publicerar två om dagen.

### Steg 4 — Är förpackningen vår egen?

Håll den planerade titeln och miniatyren mot referensen.

1. Går titeln att lägga bredvid referensens utan att man ser att de är släkt?
2. Delar miniatyren komposition, färgspråk eller textplacering med referensen?

Ett nej på ettan eller ett ja på tvåan betyder kopiering — bygg om förpackningen.
Se `reference/modellering-vs-kopiering.md`.

### Steg 5 — Bär djuret och betalar titeln?

- **Djurvalet:** stort, farligt, ritbart. Byt djur innan du byter mall. Hippo 529 653 mot
  duva 60 095 på identisk mall.
- **Titelns löfte:** lovar den ett fynd måste videon leverera ett. Gäller särskilt mall A.
- **Miniatyren:** motivet hämtat ur manusets höjdpunkt, klarar 50-procentstestet, väcker
  en fråga eller en känsla. Regel 16 och `reference/thumbnail-reglerna.md`.

### Först när alla fem är gröna

Paketet skrivs, sedan `/manusloop`.

### Dokumentera utfallet

Dödad idé läggs i tabellen "Dödade av kontrollen" i `klarerade-ideer.md` med skälet och
siffran. Fem idéer har redan dött i den här grinden — de står där så ingen föreslår dem
igen.
