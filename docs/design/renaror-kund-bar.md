# bar.md — Rena Rör i Väst, kundloopen (2026-11-11)

**Loop:** kundloop (Kund · Friktion · Trovärdighet). Max 3 rundor (Mathias). Sidorna:
`web/app/(demo)/renaror/` (startsidan `page.js`, landningssidorna `[sida]/page.js`, delad data `_rr.js`).
Mallen `web/app/(demo)/_mall/` fick nya valfria fält i den här omgången (`siffror`, `omdomen.lappar`,
`hero.lank`, `tjanster.kort[].marke`, `priser`); de får justeras, men andra demos ska renderas som förut.

**Mathias krav (2026-11-11), hårda:**
- Sidan är Rena Rörs **egen** hemsida (`kund: true`): ingen "Om det här förslaget", ingen förslagstext.
- **Mindre text.** "Copyn är för texttung." Skriv som en copyexpert: korta, raka meningar, en poäng per rad.
- **Inga anställdas namn** i texterna (inte "Claudio visar …"). Kundernas namn på omdömena får stå.
- Sifferraden (14 år, 3 400+ kunder, 8 000+ jobb) direkt efter heron, **räknas upp vid skroll**.
- Omdömen som **klisterlappar i ett band**.
- Tjänsternas ikoner som **runda 3D-märken** som på bahkobyra.se.
- **Prislistan** syns i heron (länk) och i footern; prislistan som kort på sidan.
- **Göteborg** som bild i footern.
- Egen **BRF-sida** i footern, **en landningssida per tjänst och per ort**.
- Herofilmen: 3D-illustration i deras stil med deras logga på bilen.

**Baren:** en villaägare i Göteborgstrakten står med vatten upp till kanten i diskhon en söndagkväll,
eller en BRF-ordförande som ska ta in pris på stamspolning. Hen har tre avloppsfirmor öppna på
telefonen. Sidan ska få hen att ringa 070-413 97 00 eller boka. Standarden är mallens referenser och det
Rena Rör faktiskt har: öppen prislista, jour dygnet runt, Google 4,7 av 5 (14), egna jobbfoton.

## Mekanismerna

1. **Första skärmen på telefon (390 × 844) säger vem, var och vad utan skroll:** logotypen, "Göteborg",
   två tjänster, en Ring-knapp och vägen till prislistan.
2. **Telefonnumret nås med ett tryck från varje skärm**, formuläret med högst två.
3. **Priset syns inom två skrollar** efter heron, med vad som ingår, och samma pris står likadant överallt.
4. **Ingen sektion har mer än tre korta meningar brödtext** före något visuellt (kort, bild, lista).
   Inga meningar över ~20 ord i rubriker och ingresser.
5. **Inget påstående utanför VERIFIERAT** (page.js): inga påhittade jobb på orter, inga svarstider,
   inget jourpris, inga garantitider. Ortssidorna säger bara att orten ingår.
6. **Varje landningssida är värd sin egen sida:** rubrik, ingress och frågor handlar om just den tjänsten
   eller orten, och den leder vidare till prislistan och kontakt.
7. **Det ser ut som ett riktigt, påkostat företag:** märkena, lapparna, siffrorna och filmen hänger ihop i
   samma färger (gul, grafit, marin), inga trasiga eller dubbla element.
