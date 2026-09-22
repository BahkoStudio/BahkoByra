# bar.md — vad vi mäts mot

**Loop:** animering (Rörelse · Prestanda · Craft). Strukturloopen hålls tillbaka.

**Baren, två källor:**
- *Utseende och komposition:* HAVEN-bilden (mörkt tema, dollhouse, rumschips, dag/natt).
- *Rörelse och lägen:* Matterports publika dollhouse. Bekräftat headless 2026-09-21.
  Dess lägesrad heter **View Dollhouse · View Floor Plan · Explore 3D Space** — samma
  tre lägen briefen ber om.

**Ärlig begränsning:** Matterports easing gick inte att tajma (skärmbild ~1,5 s under
SwiftShader). Tidssiffrorna nedan är satta av oss, inte uppmätta ur baren.

---

## Mekanismerna

**1. Kameraflytt tar 700–1100 ms.**
Golv 700: under det läser flytten som ett hopp, och användaren tappar bort var i huset
hen hamnade. Tak 1100: över det känns det trögt och man börjar klicka igen innan det
landat. En enda easing för varje kameraflytt i hela prototypen.

**2. En sak rör sig åt gången.**
När kameran flyttar mot ett rum står allt annat still. Rumspanelen glider inte in
samtidigt — den kommer när kameran landat. Två samtidiga rörelser gör att ögat tappar
huvudsaken.

**3. Vid sidladdning rör sig bara kameran, en gång.**
En intro-åkning in till dollhouse-läget, max 1200 ms, sedan total stillhet tills
användaren gör något. Ingenting tonar, pulserar eller svävar av sig självt.

**4. Varje rörelse löser ut åt ett håll.**
Kameran åker aldrig förbi målet och tillbaka. Ingen studs, ingen overshoot, ingen
fjäder som svänger in sig.

**5. Inramning — två fall, inte ett.**

*Helvy:* modellen tar ~50 % av bildbredden och nuddar aldrig ramens kant.
Uppmätt för hand på Matterports dollhouse: modellen spänner x=100→845 i en 1440 px
bred ram = 52 %.

*Rumsvy:* det VALDA RUMMET plus en bit grannskap ramas in fritt från panelen,
listningsspalten och knappraden. Resten av huset får gå utanför bilden.

**Varför mekanismen delades (runda 4→5):** den var först skriven som en enda regel
för hela modellen. Tillämpad bokstavligt på rumsvyn tvingade den fram motsatsen till
vad ett rumsval finns för: när panelen öppnades krympte den fria ytan, och kameran
backade för att få plats med hela huset. Rörelsekritikern mätte det — modellen gick
från 767 till 659 px bredd vid klick, alltså 13 % LÄNGRE BORT efter en rörelse som
ska föra besökaren närmare. Regeln var motsägelsefull, inte bygget. Den är delad
här i stället för att tyst kringgås.

**6. Snabb markering, långsam kamera.**
Rummet färgas inom 150 ms vid klick. Kameran tar sina 700–1100. Den snabba
återkopplingen väntar aldrig på den långsamma — annars känns klicket dött.

**7. Nära svart bakgrund, ljuset gör jobbet.**
Bakgrunden under 12 % ljushet. Ingen dekorativ färg utanför modellen: allt som har färg
är material i huset (trä, grönska, textil). Accenten används högst två gånger per skärm.

**Undantag: byråns kreditrad.** Logotypens gröna märke är det enda färgade utanför
modellen. Det är en kredit från ett annat företag, inte en del av mäklarens palett,
och hålls nere genom att ordbilden är enfärgat grå och märket litet.

**8. Ingen yta får vara mörkare än bakgrunden.**
Gäller båda ljuslägena. En yta som ligger under bakgrundens ljushet läser inte som
mörk — den läser som ett **hål i bilden**, och det som stod där försvinner.

*Varför regeln finns (runda 6):* i nattläget mätte gräsmattan 0,0,0 mot bakgrundens
29,29,29. Hela tomten föll ur bilden: fyra träd, uteplatsen och gräset. Etiketten
"Trädgård" svävade över tomrum och raden "Egen trädgård" i faktarutan blev ett
obevisat påstående. En tredjedel av produkten fanns bara i det ena av två lägen.

*Fällan under felet:* gräsmattan använder en **klon** av gräsmaterialet, eftersom
varje rumsyta behöver eget material för att kunna markeras vid klick. Första
åtgärden satte det delade materialet och tände häcken och trädkronorna men aldrig
själva mattan. Ett delat material och en klon ser likadana ut i koden. Mät på
pixeln, inte på raden som ändrades.

**9. Ytorna ska ha struktur, och den räknas ur världskoordinaten.**
Golv och väggar får mönster: brädor, fog, korn. Det som gör att man läser ett hem
i stället för en volymstudie.

*Varför inte texturbilder:* `box()` delar EN enda boxgeometri mellan alla lådor, så
samma UV 0–1 sitter på en 0,12 m tjock vägg och på ett 4 m golv. Ett plankmönster
skulle sträckas olika i varje rum. Mönstret räknas därför ur världskoordinaten i
shadern: samma skala på varje yta oavsett hur lådan är skalad, noll byte över nätet,
noll texturuppladdningar.

*Kostnaden, mätt:* första försöket gav varje mönstertyp en egen programnyckel och
programantalet gick 17 → 62. Typen skickas nu som en uniform i stället, så alla
strukturerade ytor delar ETT program: 25 totalt, noll nya under demot.

---

## Två fällor som kostat mest i det här bygget

**Mät i DPR 2, aldrig bara i DPR 1.**
Duken låg utlagd på sina attributpixlar, så på en skärm med bildpunktsförhållande 2
blev den 2800×1750 i en ruta på 1600×1000: halva huset utanför bild. På mobil växte
vyn till 682 px och hela sidan zoomade ut. Tre fulla kritikrundor kördes i DPR 1 och
såg det aldrig — vi mätte noggrant på en konfiguration nästan ingen besökare har.

**Ett delat material och en klon ser likadana ut i koden.**
`Material.clone()` tar varken med `onBeforeCompile` eller ändringar gjorda på
originalet efteråt. Gräsmattan och varje rumsgolv är kloner, för att kunna markeras
var för sig. Två separata fel kom ur det: nattens månsken nådde häcken men inte
mattan, och ytstrukturen nådde väggarna men inte golven. Båda såg ut som rätt
kodrad. Mät på pixeln.

**Mät text först när typsnittet har laddat.**
Etiketternas bredd cachades vid första layouten, innan Inter hunnit fram, så
"Vardagsrum" mättes till 42 halvpixlar i stället för 44. Det visade sig som en
mystisk "drift på 1 341 pixlar efter ett våningsbyte" som kostade två rundor att
jaga — och ingenting i 3D-scenen var inblandat. `document.fonts.ready` löser det.

---

## Prestandagolv

**Bildfrekvens går inte att mäta i den här riggen och ska inte rapporteras.**
SwiftShader gav 6,7 bilder/s både med och utan 4× processorstrypning — identiska
siffror, vilket bevisar att talet mäter programrenderaren och inte bygget. Det
tidigare golvet "≥30 bildrutor per sekund" stod kvar här efter att mätningen
underkänts; det är struket.

Det som mäts i stället är hårdvaruoberoende:

- **Noll nya shaderprogram efter laddskärmen.** Varje program som byggs mitt i
  demon är en hackning på en telefon. Mäts genom att räkna `linkProgram` och gå
  igenom natt, planritning, 3D, dag, våningsbyte och rumsval i båda ljuslägena.
  *Runda 6:* första rumsklicket i **mörker** byggde två nya program, 11 → 13.
  Uppvärmningen hade bara körts i dagsläge, och förhandsbilden renderas till ett
  eget rendermål som bygger egna program.
- **Släckta ljus lämnar scengrafen**, de nollas inte. Ett ljus med intensitet 0
  kostar ändå per bildpunkt.
- **Noll ritanrop i vila.** Sidan står still tills någon rör den.
- **Överförd vikt mäts komprimerad**, per begäran, aldrig ur en filstorlek.
