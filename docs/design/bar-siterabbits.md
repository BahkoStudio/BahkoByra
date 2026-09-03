# Ribban: siterabbits.com:s kundsektion, på bahkobyra.se

Referens: https://siterabbits.com (kundsektionen med rullande kolumner av riktiga sajter)
plus **Duolingo-rörelsen** som redan gäller sajten (`bar.md`, mekanism 1–14). Den här filen
lägger till det som kritikerna i loopen *Loopen: bahkobyra.se skärm 1–2 och kundsektionen*
dömer mot. Referensen är onåbar från kritikernas miljö (egress), så de dömer mot den här
listan, aldrig sida vid sida.

Tre bitar: **A** entré skärm 1–2 (heron, bevisremsan, siffrorna), **B** kundsektionen,
**C** (avslutad: pinnad scrubb valdes bort i runda 1, heron spelar loopen som film).

## Mekanismerna (det en kritiker ska kunna se)

### Kundsektionen (bit B)

1. **Kolumner rullar av sig själva, åt varsitt håll.** Referensen har tre kolumner, mitten åt
   andra hållet, 35 s per varv. **Beslut i loopen (runda 2): två kolumner med tre sajter var**,
   eftersom sex sajter inte räcker till tre kolumner utan att samma firma står i bild två
   gånger samtidigt. Tillbaka till tre kolumner när det finns tolv sajter.
   *Kontroll: två bildrutor 500 ms isär, kolumnerna har flyttat sig i motsatt riktning
   (cirka 25 px per 500 ms), ingen skarv, ingen dubblett synlig samtidigt.*

2. **Sömlös loop.** Innehållet tredubblat, spåret flyttas en tredjedel. Inget hopp, ingen tom
   yta när varvet börjar om.
   *Kontroll: bildruta strax före och strax efter 35 s är identiska.*

3. **Fönster 560 px (mobil) / 640 px (desktop) med toning i topp och botten.** Toningen ska
   täcka snittet där ett kort klipps och släppa snabbt: cirka 100 px, inte en tung slöja. Ett
   avklippt kort får inte se ut som en tom låda med spöktext (runda 3).
   *Kontroll: mät fönstrets höjd; ett kort i snittet är läsbart 100 px in.*

4. **Kort = liten webbläsare.** Tre prickar, adressrad, riktig sidtopp i 5:4, kategori, namn.
   Adressraden visar domänen (mobil) eller hela adressen (desktop). Sidtoppen är sajtens
   riktiga topp (800×640), inte en mockup.
   *Kontroll: titta på kortet; bilden matchar sajten som länken går till.*

5. **Pekaren pausar; hover ljusnar kanten och zoomar bilden 5 %.**
   *Kontroll: hovra en kolumn, transform slutar ändras; kantfärgen blir smaragd.*

6. **Mobil: samma mekanism i två kolumner.** Ingen ellips i kategori eller adress, kategorin
   på en rad (kort variant).
   *Kontroll: 390 px, sök efter "…" i renderad text.*

7. **Sektionen är mörk som referensen** och ledet säger att tre av sajterna är demos.

### Entré skärm 1–2 (bit A)

8. **Scenen syns på desktop och mobil, från första bildrutan.** Första rutan ligger som bild
   under filmen; ingenting flimrar när filmen tar över. Ingen tom högerhalva.
   *Kontroll: skärmdump vid 0 ms och 1500 ms, scenen finns i båda.*

9. **Sidan står still när ingen scrollar.** På första skärmen får bara filmen röra sig:
   nav-maskoten står still tills pekaren är över, bevisremsan står still tills man scrollat.
   *Kontroll: skillnadsbild mellan två rutor 1 s isär utan scroll; endast scenen ändras.*

10. **Ingen sidled-scroll.** `scrollWidth === innerWidth` på 390, 768, 1024, 1440.

11. **Siffrorna är siffror, hela, på en rad.** Tre siffror i tre lika kolumner, siffrorna
    toppjusterade så de står på samma höjd oavsett hur många rader etiketten tar. Ingen
    etikett klipps av skärmkanten, inget ord bryts mitt i.
    *Kontroll: 390 px, varje etiketts högerkant ≤ innerWidth; strong-elementens top är lika.*

12. **Bubblan pratar aldrig i en tom ruta och täcker aldrig maskoten.** Desktop: uppe till
    höger, kommer in nerifrån med studs efter att första rutan laddats. Mobil: full bredd
    direkt under scenen.
    *Kontroll: bubblans rektangel skär inte maskotens öga eller hand (desktop); på mobil
    ligger bubblans top under scenens bottom och bredden är scenens.*

13. **Entréer 400–900 ms med studs, en sektion från ett håll.** Hero-texten trappar in
    nerifrån; bubblan samma håll. Bokningsraden kommer först när videon lämnats, aldrig över
    spelknappen.
    *Kontroll: scrolla till #video, raden syns inte; scrolla förbi, raden kommer upp.*

14. **Mobilordning: text → knappar → scen → siffror.** Knapparna i full bredd under 480 px.

15. **Prestanda: under 10 % långsamma rutor (> 32 ms) på desktop och mobil under stationär
    rullning, noll layoutförändringar när sidan står still.** Mät medianen av tre körningar,
    utan andra webbläsare igång samtidigt (runda 3: samtidig belastning gav 20 %, isolerat
    6 %). Allt som rör sig ligger på transform/opacity; räknarna i `contain: layout`.

### Maskoten (bit A och sajten i övrigt)

16. **Maskoten är en scen, minst 200 px hög på desktop, och gör något som hör till
    sektionen** (`bar.md` mekanism 10). Scenbilderna är frilagda och står på ytan utan
    ram, som Duolingos figurer. Ett öga, B:et till vänster, ögat uppe till höger.
    *Kontroll: mät i helsidesbilden; räkna ögon.*

### Copy (gäller alla bitar)

17. **Ni-form, aldrig "gratis" (alltid "kostnadsfri"), rubriker under åtta ord som säger vad
    läsaren får, CTA-knappar som namnger det man får** (`bar.md` 11–14). Tonen är Duolingos:
    korta meningar, konkreta löften, inga utrop.
    *Kontroll: läs rubriker och knappar i bilden; sök " du " och "gratis" i renderad text.*
