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
- [ ] **Slutskärm** som pekar vidare till en annan video på kanalen.
- [ ] **Fäst kommentar**, högst två meningar, ur paketet.
- [ ] **CTA:n** i videon pekar på kanalens senaste video, kontrollerad med
      `vidiq_channel_videos({ videoFormat: 'long', popular: false })` samma dag.

## Uppföljning

Siffrorna hämtas via vidIQ (MCP, 5 credits per anrop), aldrig ur minnet. Skriv in dem i
`../strategi/kanalen.md` så nästa beslut har dem.

| När | Vad du tittar på |
|---|---|
| **48 timmar** | Har videon fått visningar alls? Klickfrekvens på miniatyren, och hur många som är kvar efter första minuten. Stämmer titel, miniatyr, beskrivning, kapitel och taggar? |
| **7 dagar** | Visningar mot kanalens median (inte snittet). Var trafiken kommer ifrån: startsidan, sök eller förslag |
| **28 dagar** | Domen. Visningar mot utliggarribban, se nedan. Döm inte ett format före dag 30 |

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
