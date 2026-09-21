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

---

## Prestandagolv

**≥30 bildrutor per sekund med processorn strypt 4×**, mätt med CDP och rAF-sampling,
aldrig gissat. Mätriggen bevisas på runda 1 innan någon siffra rapporteras.
