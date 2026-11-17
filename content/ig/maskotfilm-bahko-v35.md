# Maskotfilm "Bättre betalt" · @bahkobyra · v35 (2026-08-26)

Första helt AI-genererade maskotfilmen för Bahko Byrå, byggd i samma stil som Brommas
"Boka skötsel inför hösten" (två seedance-klipp med maskoten i scen, textbeats, musik, outro).
Beslut av Mathias 2026-08-24/26: maskoten får bära hela reels för Bahko; den gamla
kontentplanens regel "maskoten endast i intro/outro" är borttagen tillsammans med planen.

## Lösning
Veckans lösning enligt rotationen: **bättre betalt**. En lösning, inga siffror, inga tankstreck.

## Struktur (24,0 s, 1080×1920)

| Segment | Längd | Bild | Textbeat |
|---|---|---|---|
| Klipp 1 | 8,0 s | Köksbord i morgonljus, maskoten mellan tre offerter, tveksam | "Tre offerter på köksbordet." → "Alla lovar noggrant och pålitligt." |
| Fryst ruta ur klipp 1 | 5,5 s | Långsam inzoom | "Då jämför kunden det enda som skiljer." → "Siffran." |
| Klipp 2 | 8,0 s | Nyrenoverat rum, ekgarderob, maskoten klappar stolt på träet | "Visa jobbet ingen katalog kan prissätta." → "Då slutar priset vara det enda." |
| Outro | 3,8 s | DM:a DEMO-kortet paddat på #0A1628 | "Kostnadsfri demo av er nya hemsida." |

Övergångar xfade 0,4 / 0,4 / 0,5 vid 7,6 / 12,7 / 20,2. Vattenmärke: Bahko-loggan uppe till
vänster t.o.m. outron. Ljud: musik (24 s) + blip per beat + whoosh vid klippbyten + chime på outron,
loudnorm −14 LUFS.

## Produktion
- Stillbilder: Nano Banana Pro 9:16 2k med `bahko-master.png` som referens (kanon: B mitt på
  framsidan, ett öga uppe till höger, ingen mun, två armar, två ben). Nedre tredjedelen lugn.
- Video: `seedance_2_5`, `--mode omni_reference --start-image scenN.png --image-references
  bahko-master.png`, 8 s, 9:16, 1080p, utan AI-ljud. Uppmätt pris 9 cr/s (72 cr/klipp).
- Montering: `content/ig/mallar/maskotfilm/bygg-maskotfilm.sh` (ffmpeg, kopierad ur
  `.tmp/bahko_maskotfilm/`). Overlay-texter renderas ur `overlay.html` med Edge headless
  (transparent bakgrund, `file:///C:/...`-sökväg, egen `--user-data-dir` per bild).

## Kostnad
Budget godkänd av Mathias: Bromma-klass, ~150 credits. Faktisk kostnad noteras i captionfilen i Drive.

## Leverans
Drive: `BahkoByra/Planerat v35/reel 2 - maskotfilm/` (mp4 + omslag + caption). Publicering är
Mathias beslut.
