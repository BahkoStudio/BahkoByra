# Ribban: Duolingos rörelse på en mörk sajt

Referens: https://styles.refero.design/style/7088d695-362b-4e09-b325-fa8136d4f350
("Duolingo — playful classroom mascot on white paper")

Mathias val 2026-08-19: **behåll den mörka sajten**, lån endast rörelsen, sektionsrytmen
och maskotplaceringen. Maskoten själv ändras inte, bara var han står och vad han gör.

## Vad som INTE tas över

Referensens ljusa värld står kvar hos Duolingo. Vi tar alltså inte "no gradients, no
shadows, no glass", inte den vita duken, inte Duolingo-grönt #58CC02 och inte Feather-
typsnittet. Bahkos marinblå, smaragd och Outfit gäller som förut. Det är ett medvetet
avsteg, inte en miss, och en kritiker ska inte fälla arbetet för det.

## Mekanismerna (det en kritiker ska kunna se)

Varje rad går att kontrollera genom att titta på en bild eller en filmremsa.

1. **En sektion, en entré, ett håll.** Innehållet i en sektion kommer in från ETT håll och
   landar. Inget tonar in på plats, inget kommer från två håll i samma sektion.
   *Kontroll: jämför bildruta vid 400 ms med den färdiga bilden.*

2. **Allt studsar förbi och tillbaka.** Entréer och hover passerar sitt viloläge och
   återvänder. Ingen linjär rörelse, ingen ren ease-out utan överskjutning.
   *Kontroll: en mellanruta visar elementet förbi sitt slutläge.*

3. **Entréer 400 till 900 ms, mikrorörelser 120 till 250 ms.** Duolingos rörelse är kort
   och glad, under en sekund. En sektion som kommer in ska hinna läsas (minst 400 ms), en
   knapp som svarar på pekaren ska kännas direkt (högst 250 ms). Att döma en hover-effekt
   mot entrégolvet är fel.
   *Kontroll: durationsvärdena i CSS.*

4. **Maskoten byter sida.** Han står till höger om texten i en sektion och till vänster i
   nästa. Aldrig samma sida två sektioner i rad, aldrig mitt i en textspalt.
   *Kontroll: titta på helsidesbilden.*

5. **Maskoten reagerar på vad sektionen säger.** Varje placering har en rörelse kopplad
   till innehållet: pekar på siffran, vinkar vid knappen, undersöker vid problemet. En
   maskot som bara står still är ett underkänt läge.
   *Kontroll: filmremsan visar honom i olika lägen.*

6. **Max en sak rör sig kontinuerligt per skärmhöjd.** Allt annat är stilla tills man
   scrollar dit eller pekar på det. Annars vibrerar sidan.
   *Kontroll: skillnadsbild mellan två bildrutor, räkna områden som ändrat sig.*

7. **80 till 120 px luft mellan sektioner, och text och figur byter sida.** Rytmen är
   referensens: en spalt text, en figur bredvid, generöst mellanrum, sedan omvänt.
   *Kontroll: mät i bilden.*

## Utgångsläget (mätt 2026-08-19)

Startsidans ovanför-vikten-yta är **helt stilla efter cirka en sekund**: bildrutorna vid
1200, 2000 och 2800 ms är identiska ner till byten. Det finns alltså ingen kontinuerlig
rörelse där ögat landar först. Längre ner rör sig marquee-raden och maskoten (uppmätt
skillnad 2,2 av 255 mellan sekund 3 och 7).

## Omgång 3 (2026-08-19): sloppen ut, copyn om, maskoten som hos Duolingo

Mathias beslut: mörkblå + smaragd står kvar, men glas, gradienter och mjuka glöd-skuggor
åker ut. Copyn skrivs om rak och förtroendeingivande. Maskoten används oftare och större,
som Duolingos figurer: en scen bredvid texten, inte en dekoration i hörnet.

### Nya mekanismer, form

8. **Inga gradienter, inget frostat glas, ingen oskarp skugga.** Ytor är platta fyllningar.
   En HÅRD kant (skugga utan oskärpa, som en 4 px mörkare underkant på en knapp) är
   tillåten — det är Duolingos sticker-språk. En mjuk glöd är förbjuden.
   *Kontroll: sök i CSS efter gradient, backdrop-filter och box-shadow med oskärpa > 0.*

9. **Kort och paneler har 2 px kant, inte 1 px + skugga.** Hover markeras med kantfärg
   och lyft, aldrig med glöd.
   *Kontroll: titta på korten i bilden, läs CSS.*

10. **Maskoten är en SCEN, inte en dekal.** Där han står bredvid text är han minst 200 px
    hög på desktop och gör något som hör till sektionen. Små maskoter (under 100 px) får
    bara finnas inuti rubrikrader.
    *Kontroll: mät i helsidesbilden.*

### Nya mekanismer, copy

11. **Ni-form överallt.** Aldrig "du/din" på sajten — målgruppen är firmor.
    *Kontroll: sök "din kalender", " du " i renderad text.*

12. **Aldrig ordet "gratis" — alltid "kostnadsfri".** Husregel sedan tidigare, gäller nu
    även sajten.
    *Kontroll: sök i bilden och i koden.*

13. **Varje rubrik säger vad läsaren får, under åtta ord.** Inga utrop, inga säljfraser
    som "inga säljtrick".
    *Kontroll: läs rubrikerna i bilden.*

14. **Varje CTA-knapp namnger det man får.** "Få kostnadsfri analys", inte "Klicka här"
    eller "Kom igång".
    *Kontroll: läs knapparna.*
