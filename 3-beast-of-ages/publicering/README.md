# Kvist: Publicering & uppföljning

Uppladdningen, mätningen efteråt och beslutet om nästa video. Reglerna står i
`../youtube.md` och vinner om något här säger annat.

## Checklista vid uppladdning

Bocka av allt innan videon blir offentlig.

- [ ] **Titeln** är den valda ur paketet överst i manusfilen (`../manus/`).
- [ ] **Miniatyren** är granskad (stavning, rätt djur, texten i översta tredjedelen).
      Filen ligger i OneDrive, `2 Beast of Ages/Paket/Miniatyrer/<video>/`.
- [ ] **Beskrivningen** är videons egen. Kanalens standardbeskrivning har tidigare följt
      med av sig själv (honungsbin-videon fick en gammal safaritext om lejon, elefanter och
      tigrar). Läs igenom hela fältet.
- [ ] **Kapitel** med riktiga tidskoder ur klippningen (`../produktion/README.md`). Moa-videons
      kapitel stod alla på 00:00, då fungerar de inte.
- [ ] **Taggar** som beskriver djuret och ämnet, inte bara "Beast of Ages". Inga taggar om
      djur som inte är med i videon.
- [ ] **Slutskärm** med mallen "en video + en spellista + prenumerera": videon är exakt den
      CTA:n i ljudet säger, spellistan är serielistan *15 Facts That Make No Sense*.
- [ ] **Fäst kommentar**, högst två meningar, ur paketet.
- [ ] **CTA-videon i ljudet finns och är offentlig** (kontrollera i Studio samma dag, eller
      med `vidiq_channel_videos({ videoFormat: 'long', popular: false })`). Saknas den:
      slutskärmen pekar på senaste videon i samma serie tills den finns.
- [ ] **Rutan "Altered or synthetic content"** är ikryssad. Våra miniatyrer och klipp är
      AI-bilder av djur och platser som kan tas för verkliga; att hoppa över rutan kan ge
      straff (`../reference/youtube-ordlista.md`).
- [ ] **Tre miniatyrer, alltid:** Studio → Information → Testa och jämför → ladda upp 1, 2, 3.
      YouTube utser vinnaren på **tittartidsandel, inte klick**, så döm inte testet på CTR.
- [ ] **Mid-rolls PÅ**, manuellt placerade i bryggorna (Mall E: efter fakta 4, 8, 12),
      automatiska placeringar bort; annonsikonen grön före publicering.
- [ ] **Tackrutan** sista 5 sekunderna visar medlemmarnas namn (`../produktion/README.md`).
- [ ] **48-timmarsklockan** startar när videon blir offentlig.

## Dag 1–2 efter publicering (15 minuter)

- [ ] Claude hämtar kommentarerna en gång med `vidiq_video_comments` (5 credits) och skriver
      engelska svarsutkast med källa; Mathias klistrar in i Studio → Kommentarer → filtret
      "Jag har inte svarat" och hjärtar de tre bästa. Mall: "Good question. [One-sentence
      answer with the source's name.]"
- [ ] Community-inlägg **Fakta 16** (paketets rad F, `../paket/README.md`), offentligt.
- [ ] **Script & Sources** som medlemsinlägg (`../strategi/medlemsstrategi-cowork.md`).
- [ ] Fäst kommentar och slutskärm kontrollerade; slutskärmen på de fem dire wolf-videorna
      bytt till den nya videon om den är Mall E (`studio-plan-v2.md`, A4).

**Dodon nu (2026-11-07):** rösten i dodons sista 20 sekunder säger "15 Facts About the
Tasmanian Tiger That Make No Sense" (manusets sista rad), och den videon är inte publicerad
(kontrollerat med `vidiq_channel_videos` 2026-11-07). Sätt dodons slutskärm (Studio →
Innehåll → dodon → Redigerare → Slutskärm → Video → Välj en viss video) till moa-listan tills
pungvargen är ute. Pungvargen har plats 2 i `ko.md` så löftet infrias inom två veckor.

## Uppföljning

Siffrorna läses i Studio (Innehåll → videon → Statistik), aldrig ur minnet, och skrivs in i
`uppfoljning.md` (en rad per video) så nästa beslut har dem. vidIQ bara för CTA-kontrollen
och kommentarerna (`../skills.md`, Budget per video).

| När | Vad du tittar på |
|---|---|
| **48 timmar** | Har videon fått visningar alls? Klickfrekvens på miniatyren (ribban 7–10 %), hur många som är kvar vid **30 sekunder** (YouTube rapporterar det direkt; över 70 %, över 80 % är "killer intro") och vid första minuten. Stämmer titel, miniatyr, beskrivning, kapitel och taggar? |
| **7 dagar** | Visningar mot kanalens median (inte snittet). **Tittad andel** (average percentage viewed, ribban 45 %), inte tittad tid, som beror på längden. Var trafiken kommer ifrån: startsidan, sök eller förslag |
| **28 dagar** | Domen. Visningar mot utliggarribban, se nedan. Döm inte ett format före dag 28 (vidIQ rapporterar dag 28) |

## Beslutet: testa eller dubbla ner

**Utliggarribban är 3 000–5 000 visningar.** Ordningen är fristående video, sedan format,
sedan subnisch. Formatet uppfinns inte i förväg; det upptäcks när en enskild video går över
ribban.

| Efter 28 dagar | Beslut |
|---|---|
| Under ribban | **Testa.** Nästa video prövar ett nytt format. Högst 1–3 videor i samma format innan du går vidare |
| Över ribban | **Dubbla ner en gång och mät.** Gör en video till i samma format |
| Nedslagningen slår originalet | Fortsätt tills det planar ut |
| Nedslagningen slår inte originalet | Ett försök till. Slår inte heller det originalet: sluta och gå tillbaka till att testa |

**Vad som räknas som utliggare (2026-11-07).** En video räknas som utliggare bara om den klarar
BÅDA: över 3 000 visningar dag 28 OCH tittad andel över 40 %. Klarar den bara visningarna är
det en halvvinst: formatet behålls, öppningen byggs om innan nästa video i formatet. Baslinje
för Mall E är mammutlistan 5 972 (första utan nyhetsvåg). Stoppregel: två listor i rad under
5 972 vid dag 28 = Mall E pausas. **Mall E avslutad 2026-11-27 (Mathias), se `../youtube.md`:
pungvargen 280 och mastodonten 253.** Läget: moa 7 629 / 29,5 % och dodo 4 781 på fyra dygn /
32,5 % klarar visningarna men inte behållningen; rankningen 2 741 / 22,5 % klarar ingen.

Testa hela tiden parallellt, även när en nedslagning fungerar. Räkna med att en nedslagning
ger färre visningar än originalet; det betyder inte att den misslyckats. Hela regelverket med
exempel står i `../youtube.md` ("Testa eller dubbla ner") och källdokumentet i
`../reference/testa-vs-dubbla-ner.md`.

Beslutet skrivs in och nästa idé väljs i `../ideer/`.

## Filer i kvisten

| Fil | Vad |
|---|---|
| `studio-playbook.md` | Inställningarna i YouTube Studio och checklistan per video, byggd på kanalens egen statistik |
| `studio-plan-v2.md` | Det som är kvar i Studio, sök och att behålla tittarna |
| `ko.md` | Inspelningskön: fyra platser, CTA-mål per rad, Mathias flyttar datum men inte ordning |
| `uppfoljning.md` | En rad per publicerad video: 48 h, dag 7, dag 28, beslut |
| `veckoplan.md` | Veckorytmen: två videor i veckan, Mathias cirka 6 timmar, vidIQ-budget |
