# Delles Takservice — lead

**Instagram:** [@delles.takservice](https://www.instagram.com/delles.takservice/) — Delles Takservice, 13 inlägg, 150 följare, bio "Taktvätt • Takmålning • Fasadtvätt", "Östergötland", "Gratis offert & prisgaranti" (skärmdump Mathias 2026-10-23 + IG-embed).
**Hemsida:** [dellestakservice.se](https://dellestakservice.se/) (en sida i Next.js, inga undersidor, läst 2026-10-23). Ägaren i DM: "Jag har en hemsida med den är ganska trött gjort. Va skulle det kosta?"
**Demo:** https://www.bahkobyra.se/dellestakservice/ (källa: `web/app/(demo)/dellestakservice/`). Gren `demo/dellestakservice`, committad lokalt, inte pushad.
**Status:** byggd 2026-10-23 på demomallen v3. Media 0,43 USD. Inte skickad.

## Verifierat

| Uppgift | Värde | Källa |
|---|---|---|
| Namn | Delles Takservice | dellestakservice.se (titel, JSON-LD, footer), IG |
| Bolag | **inte verifierat**: ingen träff på allabolag/merinfo på namnet (allabolag gav bara Adells El & Tv-Service AB, Kalix = namnfälla). Troligen enskild firma i ägarens namn | allabolag, merinfo 2026-10-23 |
| Ort | "Motala, Östergötland", postnr 591 73 Motala (JSON-LD, ingen gata). IG-inlägg från Motala, Linköping och Åtvidaberg | sajten, IG-bildtexter |
| Telefon / e-post | 070-685 22 52 · delles.takservice@outlook.com | sajten |
| Tjänster | Taktvätt, takmålning (sprutmålning, främst plåttak, även garagetak, plåtdetaljer, skorstenar, tegel och betong när det passar), fasad (tvätt och målning), garage och garageportar, tvätt av stenplattor, plåtdetaljer. Kupor från IG ("Målning av kupor") | sajten, IG |
| Löften | Kostnadsfri takbesiktning före offert · "Tydlig offert – utan förpliktelser" · hjälp med ROT, "Vi sköter hela ansökan åt dig" · Svanenmärkt takfärg (100 % akrylat, "utvecklad för nordiskt klimat") · "Vi tvättar alltid taket först" · beprövade, skonsamma metoder · tvätt och målning går att beställa var för sig | sajten |
| Process | rengöring → anti-algbehandling → grundmålning → slutmålning; kontakt (gärna med bilder) → gratis besiktning & offert → tid → arbete → klart | sajten |
| Grundare | "Delle, grundare av Delles Takservice" (alt-text på porträttet). Efternamn okänt | sajten |
| Priser | Inga på sajten | sajten |
| Omdömen | Inga på sajten, ingen Google-profil hittad | WebSearch 2026-10-23 |
| IG-inlägg på demon | DcG6rJTjJAT "Målning av tak i Åtvidaberg", DbbUY3zjDyg "Målning av kupor", DcB52SrMyeI "Målning i Motala" | IG-embed |

## INTE verifierat, och står inte på demon

- Org.nr och bolagsform (se ovan). Inget org.nr i footern.
- Google-betyg och omdömen: **exempelkort** (`exempel: true`, tomma stjärnor), QA i läge `nej`.
- Priser: flyern på IG med "8 950 kr" och "30 % rabatt" för taktvätt syntes inte i embedden och priset står inte på sajten, så inget pris används.
- "Prisgaranti" (IG-bion): villkoren står ingenstans, så ordet används inte. Fråga Delle vad den innebär, sedan kan den in som en Varför-punkt.
- Sajtens "upp till 25 år längre livslängd" och "upp till 70 % billigare än takbyte" saknar källa och används inte.
- Invändig målning: köksinlägget "Invändigt målning i Linköping" är deras eget jobb, men tjänsten står inte på sajten och är inte med.

## Media (0,43 USD)

- **Egna foton (alla stillbilder):** sajten (`arbete-1/2/5/6/7/8.png`, `takmalning.png`, `hero.png`, `taktvatt.png`) + IG-embed (Åtvidaberg-taket före/under/efter, kuporna, Motala-fasaden). 4 tjänstebilder + 13 jobbilder, alla 960×720, varje fil en gång. Inget lånat.
- `taktvatt.png` (kyrktak under tvätt från skylift) ligger på deras server men visas inte på sajten just nu. Bör bekräftas att det är deras jobb.
- **Hero = genererad förvandling (illustration, inte deras tak):** Qwen A (mossigt betongpannetak på östgötsk villa, 0,075) → Qwen B (samma tak tvättat och tegelrött, 0,075) → Wan 3.0 Prime 720p 5 s (0,28), högtryckstvätt i strängar och sedan sprutmålning. 1,5 s stillbild på slutet, uppskalad till 1080p, stående version omramad till 9:16.
- **Varför och kontakt:** deras `hero.png` (plåttak i Linköping med domkyrkan, Delle i sele) i långsam inzoomning, ffmpeg, 0 kr. Varför slutar på logokortet (vit bakgrund).
- **Logotyp:** deras `logo.png` (redan med alfa), beskuren och uppskalad 2x. Ljus variant lokalt: svart → vitt, grönt → `#8BD67A`. `topp: 'vit'` + `ljus`. Vektorfil saknas, originalet är 612×408.
- Porträttet `delle-portatt.png` (Delle framför villa med skåpbil och logga) ser AI-sammansatt ut och används inte. Om Mathias vill ha honom i bild: be om ett riktigt foto.

## Design

Grönt ur logotypen: `mork #0B1A0C` (lum 0,008) · `accent #2F7A26` (vit text 5,34:1) · `accentHover/accentText #24601D` (6,92:1 mot kräm) · `accentLjus #8BD67A` (10,28:1 mot mork) · `paAccent #fff`. Hero: logga + "Östergötland" + "Taktvätt & Takmålning." ("Motala · Östergötland" bröts fult på mobil.)

**Bärande idé:** ett slitet tak behöver inte bytas. Tvättat, behandlat och målat håller det längre, och färgen fäster bara på ett rent tak, därför tvättar de alltid först. Varför-rubrik "Ett tak som *håller längre*" (deras egen fras). CTA "Boka gratis takbesiktning".

## QA

`node qa.mjs dellestakservice/ 3044 "Delles" "Maximum Platt|Kakel 0413|GD Måleri|lorem" nej inbaddat` — 111 OK, 0 fel (1440, 390, 768, 1100). md5: 27 filer, 27 unika, ingen dubblett mot andra demos, ingen oanvänd fil.

## Flaggor före utskick

- Formuläret går till mathias@bahkobyra.se (demonyckeln).
- Riktigt telefon och mejl på sidan: visa INTE offentligt (noindex).
- Hero-filmen är en genererad illustration, inte deras tak.
- Exempelomdömen: be om Google-profil eller tre kundomdömen.
- Org.nr saknas: fråga efter det före en skarp sida.
- Prisgaranti och kampanjpriset 8 950 kr används inte förrän villkoren är kända.

## DM-utkast (svar på "Va skulle det kosta?")

> Hej Delle! Jag byggde ett förslag på hur din sida kan se ut, med dina egna jobb och din logga: https://www.bahkobyra.se/dellestakservice/ En sån här sida kostar 8 000 kr (Basic), 12 000 kr med en egen landningssida per tjänst, automejl och Google-optimering (Standard), eller 20 000 kr där vi dessutom sköter din Google-profil, garanterar förstasidan inom 90 dagar och underhåller sidan i 90 dagar (Premium), allt ex moms. Ingen bindningstid och du äger sidan och domänen, och vill du ha hjälp efteråt är det 500 kr/mån för underhåll eller 2 000 kr/mån för Google-hantering.
