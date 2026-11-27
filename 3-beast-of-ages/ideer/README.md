# Kvist: Idébank & Grinden — Remixloopen

Här väljs nästa video. **Sedan 2026-10-18 börjar varje idé i en bevisad video**, aldrig i
ett tomt ark. Manusarbetet (research → paket → `/manusloop`) är oförändrat: det fungerar.
Det som byggdes om är hur idén väljs och förpackas. Reglerna står i `../youtube.md` och
vinner om något här säger annat.

| Fil | Vad |
|---|---|
| `README.md` | Remixloopen, steg för steg (det här dokumentet) |
| `modelleringsguide.md` | Reglerna (del 1), Mathias godkända referenser och mallarna A–H (del 2), formatkatalogen (del 2c) och **Grinden** i sin fulla text (del 3) |
| `klarerade-ideer.md` | Idéer som gått igenom, vilka som är skrivna, och tabellen över dödade. Den gamla kön från september är parkerad, se "Omstart 2026-10-18" |
| `dubbla-ner-ideer.md` | Arkiv från augusti: Knapp- och Apex Paleo-varianter. Läses bara som exempel på vinkel B |

## Varför strukturen byggdes om

Den gamla rutinen letade **nya** idéer och dödade allt som en jämförbar kanal nyss lyckats
med (Grindens gamla steg 3). Resultatet blev tvärtom mot avsikten: de idéer som överlevde
var de ingen bevisat (hjorten 260, saigan 330, hästköttet 460, vardagsfrågorna 64–495),
medan de bevisade idéerna slängdes. Egen anteckning i `klarerade-ideer.md` säger det själv:
*"idéer som KÄNNS färska är ofta redan tagna av just den anledningen — de är bra."*

Fabio Morena (kursen *How To Grow A Faceless YouTube Channel In 2026*, 2026-04-12) säger
samma sak från andra hållet: *"reframe your thinking from 'it's already been done, so I
can't do it' to 'it's already been done, which means if I do it, it will do well.'"* Hans
metod: *"Find the best performing videos from your competition and find ways to make them
slightly better."* Och hans mått på om något är fel: två videor i veckan i sex månader utan
en enda över 100 000 betyder att *"something is fundamentally wrong"*. Då kollar man
konkurrenterna: *"Are they pulling views? If they are, then your videos are the problem."*
Wilder America, Primeval Earth och The Curious Kid drar visningar i vår nisch just nu.
Alltså är det vårt urval och vår förpackning som är problemet, inte nischen.

Gränsen mot kopiering står kvar och är hård: *take inspiration, don't clone.* Samma vibb,
helt annan titel, egen miniatyr. Beviset för varför: `../reference/modellering-vs-kopiering.md`
(ordagrann kopia 2 500 visningar mot originalets 5,1 miljoner).

## Remixloopen: tre steg

### Steg 1. Hitta utliggaren (beviset på efterfrågan)

En utliggare är en video som gått mycket bättre än kanalen den ligger på. Det är beviset på
att publiken vill ha ämnet. Krav, alla fyra:

| Krav | Siffra |
|---|---|
| Engelsk långform | minst 8 minuter, berättarröst, ingen kompilation |
| Överpresterar | minst **3 gånger kanalens median** (eller breakout över 20 i vidIQ) |
| Kanalen är jämförbar | under 150 000 prenumeranter; under 50 000 är bäst |
| Fortfarande varm | publicerad senaste sex månaderna **eller** drar visningar per timme fortfarande (`vidiq_video_stats`) |

Var vi letar, i den här ordningen:

1. **Mathias egna fynd.** En video han sett fungera går före allt annat. Den skrivs in här
   med länk, kanal, visningar och kanalens median innan något görs.
2. **Konkurrentarket** (Google Sheets *Beast of Ages – konkurrenter 2026-10-17*, 19 kanaler,
   rådets bedömning per rad). Reservmodellerna Primeval Earth och The Curious Kid först,
   sedan "Bevaka"-raderna.
3. **`vidiq_outliers`** en gång i månaden på konkurrentlistan, långform, under 50 000, tre
   månader, sorterat på breakout. Kommandot står i `../strategi/README.md`.
4. **Trending hos konkurrenterna.** Morenas verktyg: vidIQ:s *view trending videos* på en
   konkurrents kanal, sortera på visningar per timme. *"245 views per hour three months
   ago, which means that it's still pulling views. This topic is hot."* Hos oss:
   `vidiq_channel_videos` med `popular: true` plus `vidiq_video_stats` på toppkandidaten.

Kolla format och genre innan en titel plockas: breakout-talet mäter avvikelse från kanalens
eget snitt, inte om videon går att göra om (filmtrailers och riktiga naturfilmer har legat
överst). Stopplistan: `../strategi/utliggare-att-modellera.md`.

### Steg 2. Remixa med en vinkel, och häng på vad som är hett nu

Utliggaren kopieras aldrig. Den byggs om med **en** av tre vinklar, och titeln skrivs om
så att den har *"same exact vibe, but completely different title"* (Morena: *The Rock Is
Everything Wrong With Hollywood* blev *Why The Rock Is Hollywood's Cancer*).

| Vinkel | Vad | Exempel på vår kanal |
|---|---|---|
| **A. Samma ämne, byt egenskapen** | Behåll djuret, lyft en annan sanning om det | Deras *Thylacines Are Reappearing in Tasmania — And They Shouldn't Be This Big* → vår *The Tasmanian Tiger Weighed Half What Your Textbook Says* |
| **B. Samma ämne, nytt format** | Behåll djuret, byt till ett format vi äger (klockan med vinnare som i `../manus/dire-wolf-yellowstone-winter.md`, "What It Was Like to Live…", en djupdykning; 15 Facts-listan är avslutad 2026-11-27) | Deras djupdykning om dodon → vår *15 Facts About the De-Extinct Dodo That Make No Sense* |
| **C. Stapla ett andra bevisat ämne** | Lägg utliggarens djur ihop med ett ämne som redan bevisat sig hos **oss** (Colossal-nyheten, istiden, dire wolf-publiken) | Deras Garamba-video → vår noshörning + Colossals "de-extinction"-papper |

Regel för vinkel C: det andra ämnet är ett **sammanhang**, inte ett djur till. Ett djur plus
en konkret siffra slår flera djur plus ett begrepp (regel 13, gepard 997 601 mot fyra
kattdjur 33 971).

**Vad som är hett nu** avgör vilken remix som väljs när flera är möjliga. Två kontroller:

- **Nyhetsankaret** (paketets A0, 1–10): finns en levande nyhet den här veckan som videon
  kan öppna i? Slå upp live med WebSearch, aldrig ur minnet (`manus-tidskritiska-fakta`).
  Colossal-nyheter har burit alla kanalens sex största.
- **Fart just nu**: drar utliggaren eller ämnet fortfarande visningar per timme? Ett ämne
  som dör hos konkurrenten dör hos oss.

### Steg 2b. Jämförelsen (ny 2026-11-27)

Innan paketet: sök på utliggarens exakta titel (`vidiq_youtube_search`) och leta efter
samma idé med väldigt olika resultat, helst hos samma kanal eller där en senare version
slog en tidigare. Läs båda manusen (`vidiq_video_transcript`, 5 krediter styck) sida vid
sida och skriv i paketet vad vinnaren ger som floppen inte ger. Alltid i par. Finns ingen
jämförelse: skriv det, och bygg på formeln i `../reference/jamforelsen-samma-titel.md`
(ryggrad, scen, stege, individ). Tre varningar: utliggaren ska vara äldre än en vecka,
kanalen ska inte vara en pyttekanal, och gilla per visning ska inte ligga långt under en
halv procent.

### Steg 3. Förpacka först, sedan Grinden, sedan manuset som vanligt

Morena: *"If people don't click, they won't watch. Drill that into your mind. No matter how
good your content is, if your packaging isn't good, you will not get views."* Därför
skrivs titel och miniatyr **innan** Grinden körs, så att Grinden kan döma förpackningen.

**Titeln:** omskriven från utliggarens (steg 2), högst ungefär åtta ord, och den första
scenen i manuset måste **betala klicket** (Morena: *validate the click*). Tio titlar i
paketet som förut.

**Miniatyren:** välj **ett** ramverk av fyra och säg vilket i paketet.

| Ramverk | Vad bilden gör |
|---|---|
| **Konflikt** | Två saker som inte hör ihop i samma bild (hjärnan är byggd för det: spänning ger klick) |
| **Ett dominant motiv** | Ett djur, en känsla, läsbart på en halv sekund |
| **Nyfikenhetsgap** | Visa en sak, dölj resten. Visa aldrig allt |
| **Attraktion** | Ett verktyg, inte en strategi. Används med avsikt, aldrig i desperation |

Plus kanalens egna krav som gäller alltid: text i översta tredjedelen, 50-procentstestet för
TV, motivet ur manusets höjdpunkt (`../reference/thumbnail-reglerna.md`). De tre stilarna
som är godkända sedan 2026-11-27 (lager, svartvit med lysande ögon, ljus scen) står i
`../youtube.md`; minst en av de tre miniatyrerna görs i någon av dem. **Två tester innan
den går live:**

1. **Zooma till 10 procent.** Syns vinnaren fortfarande? Blir det gröt, rensa.
2. **thumbnailpreview.com**, mot den riktiga startsidan, bredvid konkurrenternas.

Ladda upp **tre miniatyrer**, alltid: YouTube testar dem mot tittartid (Morena, 6.1). Döm på
tittartidsandel, inte klick.

**Grinden** körs sedan på den färdiga idén, med förpackning. Fem steg, fulla texten i
`modelleringsguide.md` del 3. Det som ändrades 2026-10-18 är steg 3:

| Steg | Frågan | Dödar idén |
|---|---|---|
| 1 | Har vi redan gjort den? Läs **hela** kanalens lista (`vidiq_channel_videos`) | Ämnet finns i en egen video, även som avsnitt i en lista |
| 2 | Finns vår **remix** redan? `vidiq_youtube_search`, tre formuleringar på vår vinkel | En färsk engelsk långformsvideo med **samma vinkel** (inte samma djur: djuret är utliggarens, och det ska det vara) |
| 3 | **Är vågen full?** Räkna kanalerna i vår storleksklass som gjort remixen de senaste sex månaderna | **Tre eller fler** = vågen är full (mammutbenhusen dog så). En eller två = grönt, det är beviset vi vill ha |
| 4 | Är förpackningen vår egen? Titel och miniatyr bredvid utliggarens | Titeln går att lägga bredvid utliggarens och man ser släktskapet, eller miniatyren delar komposition, färg eller textplacering. **Miniatyrtexten får inte vara en omskrivning av utliggarens titel.** Test: lägg vår text bredvid deras titel (mastodonten 2026-11-07: NOBODY WANTS IT BACK mot *Why Scientists Don't Want To Bring the Mastodon Back*, därför går NOT A MAMMOTH först) |
| 5 | Bär djuret och betalar titeln? | Djuret är inte stort, farligt eller ritbart, eller titeln lovar något manuset inte levererar |

**Först när alla fem är gröna:** research (`../research/`), paketet färdigt (`../paket/`),
`/manusloop` (`../manus/`). Inget där ändras.

**Ett manus som väntar mer än 7 dagar efter Grinden får steg 3 omkört (ett anrop) före
uppladdning.** Resultatet skrivs i Remixloopens logg och i manusets statusrad (mastodonten
2026-11-07: 16 dagar efter Grinden, omkörd, vågen inte full).

**Dokumentera.** Varje utliggare, vald vinkel och Grind-utfall skrivs in i
`klarerade-ideer.md` under "Remixloopen", med siffrorna. Dödade idéer i tabellen över
dödade, med skälet.

## Mäta och besluta efteråt

Siffrorna hämtas i `../publicering/README.md` dag 7 och dag 28 (vidIQ rapporterar dag 28).
Ribborna, från Morenas
kurs och anpassade till en TV-publik:

| Mått | Ribban | Vad det säger |
|---|---|---|
| Behållning vid 30 sekunder | över 70 %, över 80 % är en "killer intro" | Hooken och förpackningen stämde överens |
| Behållning vid 60 sekunder | över 55 % (dodon 3 nov: 60 % vid 50 s, 54 % vid 80 s) | Rådets nål 2026-10-17, ribban höjd 2026-11-07 |
| Genomsnittlig tittad andel | över 45 % | Manuset håller; 45 % är Morenas gräns för "almost guaranteed a viral video" |
| Klickfrekvens | över 7–8 %, helst 10 % | Miniatyr och titel fungerar |
| Visningar dag 28 (vidIQ rapporterar dag 28) | över utliggarribban 3 000–5 000, och tittad andel över 40 % för att räknas som utliggare (`../publicering/README.md`) | Formatet går att dubbla ner på |

Går en remix över ribban: dubbla ner **en gång** på samma utliggare med nästa vinkel
(A → B → C) och mät igen. Morena mjölkar en vinnare i åtta delar; `../youtube.md` säger
högst tre och sluta när nedslagningen inte slår originalet. **youtube.md gäller.**

## Vad vi inte tar från kursen

- **Återanvända andras klipp.** Kanalen bygger egna bilder; hans källmetod gäller inte.
- **Hans publiceringstakt som mål i sig.** Vi släpper två i veckan (25 på 90 dagar), inte
  fler, för inspelningen är flaskhalsen (`../publicering/veckoplan.md`).
- **"Milka" en titel i åtta delar.** Dire wolf-spåret visade nedgången: nio steg, 464 165 →
  9 677. Regeln "dubbla ner en gång och mät" står kvar.
- **Vilken nisch som helst.** Kärnspåret är de-extinction och istid med ett ikoniskt djur
  (`../strategi/README.md`, "Känd konflikt"). Utliggare utanför det tas bara via vinkel C.
