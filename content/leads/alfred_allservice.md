# Lead-analys: Alfred Allservice (Nässjö)

**Datum:** 2026-06-11
**Källa lead:** Instagram @alfredallservice (8 inlägg, 77 följare) — positivt DM-svar
**Telefon (från IG-inlägg):** 0380-69 20 07 (riktnr 0380 = Nässjö)
**Bio-länk:** www.alfredallseevice.se — VERIFIERAT DÖD (ingen DNS-post). Felstavning av alfredallservice.se (DNS OK).
**IG-content:** renovering, golv, badrum före/efter, kakel, altan/uterum, snickeri

---
## Steg 1 — Hemsidan (alfredallservice.se)

**Verifierat 2026-06-11:**

| Kontroll | Resultat | Källa |
|---|---|---|
| DNS alfredallservice.se | OK — pekar på 2a02:250:0:8::52 (IPv6, svensk hosting-range) | `getent hosts` |
| DNS www.alfredallservice.se | OK — samma adress | `getent hosts` |
| DNS alfredallseevice.se (bio-länken) | **INGEN POST — domänen existerar inte** | `getent hosts` (tom träff) |
| HTTPS-hämtning https://alfredallservice.se | **HTTP 403 Forbidden** — servern vägrar leverera sidan till vår fetcher | WebFetch 2026-06-11 |
| HTTPS-hämtning https://www.alfredallservice.se | **HTTP 403 Forbidden** | WebFetch 2026-06-11 |
| Google-index `site:alfredallservice.se` | **0 indexerade sidor** — domänen finns inte i Googles index | WebSearch 2026-06-11 |

**Tolkning (försiktig):**
- Vi kunde INTE verifiera title, meta description, H1, tjänstelista, CTA, viewport, copyright-år eller plattform — servern svarar 403 mot automatiserade hämtningar. (Obs: 403 mot bot ≠ nödvändigtvis 403 i webbläsare — verifiera manuellt i mobil före mötet.)
- **Det som ÄR säkert:** Google har noll sidor indexerade från domänen. Oavsett om en sida ligger där eller inte är den **osynlig i Google** — den kan inte ranka på en enda sökning.
- Bio-länken på Instagram (www.alfredallseevice.se) är felstavad och leder till en domän som inte finns → alla 77 följare + alla som hittar profilen via reels klickar in i ett DNS-fel.

**Att göra manuellt före mötet:** öppna https://alfredallservice.se i mobil och screenshota det som visas (funkar den/parkerad/tom).

---
## Steg 2 — Google Business Profile, omdömen & NAP

**Sökningar utförda 2026-06-11 (WebSearch):** `"Alfred Allservice" Nässjö`, `"Alfred Allservice" omdömen recensioner`, `"0380-69 20 07"`, `"alfredallservice"`, `Alfred allservice Nässjö bygg renovering snickeri`.

**Resultat:**
- **Ingen träff på företaget i någon sökning.** Varken Google Business Profile, hitta.se, eniro.se, reco.se, bygg.se eller annan katalog dyker upp för "Alfred Allservice" i Nässjö.
- Telefonnumret 0380-69 20 07 ger **noll träffar** — numret är inte kopplat till någon indexerad företagsprofil eller katalogpost.
- Sökningen "Alfred Allservice Nässjö" toppas i stället av **Höglandet Allservice AB** (städ, Industrigatan 32A, Nässjö, aktivt sedan 2009 — hitta.se) och Elenas Allservice AB (eniro.se). Dvs. den som googlar leadets namn + ort hamnar hos ANDRA företag.
- Obs: "Alfreds allservice" (enskild firma, Karl Alfred Emilsson, Åseda, växtodling/skog, tel 072-368 97 96 — bolagsfakta.se) är ett **annat företag** i fel bransch/ort — får inte förväxlas.
- Caveat: WebSearch körs från US — svenska Maps-resultat kan vara underrepresenterade. **Verifiera manuellt i Google Maps före mötet** att GBP verkligen saknas. Men frånvaron i alla indexerade kataloger är i sig stark signal.

**Slutsats NAP:** Det finns ingen konsekvent NAP att granska — namn/adress/telefon finns inte publicerat någonstans utom på Instagram.

---
## Steg 3 — Bolagsinfo (allabolag m.fl.)

**Sökningar utförda 2026-06-11:** `"Alfred Allservice" allabolag`, `"Alfred Allservice" merinfo/ratsit/proff/bolagsfakta`, telefonnummervarianter. Direkthämtning av allabolag.se och whois-tjänster blockerades (403).

**Resultat:**
- **Ingen bolagspost hittad för "Alfred Allservice" i Nässjö/Jönköpings län.** Inget org.nr, ingen bolagsform, ingen omsättning kunde verifieras via indexerade källor.
- Två företag med SNARLIKT namn finns — båda är ANDRA företag:
  - "Alfreds allservice", enskild firma, Karl Alfred Emilsson, **Åseda (Uppvidinge, Kronoberg)**, jordbruk/skog, reg. 2023-11-24, tel 072-368 97 96 (allabolag.se, bolagsfakta.se)
  - "Alfreds Allservice", enskild firma, Alfred James Norgren, **Tullinge (Huddinge)**, bilreparationer, reg. 2025-01-25 (allabolag.se, hitta.se)
- **Tolkning:** Leadet driver sannolikt verksamheten under ett annat juridiskt namn, eller är så nyregistrerad/oindexerad att bolagsdata inte syns. Kan INTE verifieras härifrån.
- **Brand-risk (säljargument):** Den som googlar "Alfreds allservice" hittar en jordbruksfirma i Åseda och en bilverkstad i Tullinge — inte leadet.

**Att göra före mötet:** fråga efter org.nr/juridiskt namn i DM, alt. slå telefonnumret 0380-69 20 07 i hitta.se manuellt (blockerar bots).

---
## Steg 4 — Ranking-spotcheck (2026-06-11, WebSearch)

**Alfred Allservice syns INTE på någon av de tre sökningarna.**

### "allservice nässjö" — topplaceringar:
1. **Höglandet Allservice** (hoglandetallservice.se) — flera träffar: städ, storstädning, flyttstädning
2. **K-Z Allservice** (Facebook-sida, Nässjö)
3. **Elenas Allservice** (elenasallservice.se + Facebook + eniro) — städ, aktivt sedan 2010

### "snickare nässjö" — topplaceringar:
1. **Fallnafors Bygg AB** (totalentreprenadnassjo.se — egen landningssida "Snickare Nässjö")
2. Snickare.se (katalog)
3. hitta.se-katalogen (113 träffar snickare i Nässjö)
- Även: **Kansjö Bygg** (kansjobygg.se — egen "Snickare Nässjö"-sida), Grankvist Snickeri (Facebook)

### "badrumsrenovering nässjö" — topplaceringar:
1. **Nässjö Golv** (nassjogolv.se/badrum) — hela processen rivning → färdigt badrum
2. **JB Badrum AB** (jbbadrum.se) — Nässjö/Eksjö/Vetlanda
3. **badrumsrenoveringnassjo.se** — nischad exact match-domän
- Även: LOCAB (locab.se), Kansjö Bygg (egen "Badrumsrenovering Nässjö"-sida), Todd Byggtjänst

**Mönster hos vinnarna:** konkurrenterna som rankar har dedikerade landningssidor per tjänst + ort ("Snickare Nässjö", "Badrumsrenovering Nässjö"). Det är exakt det Alfred Allservice saknar — trots att deras IG-content (badrum före/efter, golv, kakel) bevisar att de levererar just dessa jobb.

---
## PAIN POINTS

1. **Bio-länken på Instagram är död.** www.alfredallseevice.se (felstavad, dubbel-e) saknar DNS-post — domänen existerar inte. Varje följare och varje reels-tittare som klickar på länken möts av ett felmeddelande. *Källa: getent/DNS-uppslag 2026-06-11.*
2. **Rätt domän (alfredallservice.se) har 0 sidor i Googles index.** `site:alfredallservice.se` ger noll träffar — vad som än ligger på domänen är osynligt i Google och kan inte ranka på någon sökning. *Källa: WebSearch 2026-06-11.*
3. **Domänen svarar 403 Forbidden mot automatiserade hämtningar** (både med och utan www) — minst en bidragande orsak till att Google inte indexerar den. *Källa: WebFetch 2026-06-11. (Verifiera manuellt i webbläsare före mötet.)*
4. **Noll närvaro i lokala sökningar.** Syns inte på "allservice nässjö", "snickare nässjö" eller "badrumsrenovering nässjö" — trots att IG-flödet visar exakt dessa jobb. *Källa: WebSearch-spotcheck 2026-06-11.*
5. **Ingen hittbar Google Business Profile eller katalogpost.** Företagsnamn + telefonnummer (0380-69 20 07) ger noll träffar i hitta.se/eniro/reco/GBP via sökindex. Den som googlar "Alfred Allservice Nässjö" hamnar hos Höglandet Allservice (städ) i stället. *Källa: WebSearch 2026-06-11; US-index — dubbelkolla Maps manuellt.*
6. **Namnförväxlingsrisk.** Två andra registrerade firmor heter "Alfreds Allservice" (jordbruk i Åseda; bilverkstad i Tullinge) och äger Google-resultaten för namnet. Utan egen sajt + GBP förlorar leadet sitt eget varumärkesnamn i sök. *Källa: allabolag.se/bolagsfakta.se via WebSearch.*
7. **Hela kundresan hänger på Instagram (77 följare).** Telefonnumret finns bara i inlägg — ingen sajt, inget formulär, ingen e-post hittbar. En kund som vill jämföra offerter har inget att granska → leadet tappar jobb till konkurrenter med proffsiga sajter (Nässjö Golv, JB Badrum, Fallnafors, Kansjö Bygg). *Källa: steg 1–4 ovan.*

## QUICK WINS

1. **Fixa bio-länken IDAG** — peka om till alfredallservice.se (eller till demo-sidan vi bygger). Tar 30 sekunder, stoppar blödningen direkt. Perfekt "vi såg det här"-isbrytare i mötet.
2. **Skapa/claima Google Business Profile** med korrekt NAP (namn, Nässjö-adress, 0380-69 20 07) + kategori "Byggfirma/Snickare" + ladda upp före/efter-bilderna från IG.
3. **Få domänen indexerbar:** lös 403-blockeringen, lägg upp en riktig sajt, skicka in i Search Console. Utan detta är domänen en parkeringsplats.
4. **En sida per tjänst + ort** — "Snickare Nässjö", "Badrumsrenovering Nässjö", "Altan & uterum Nässjö". Det är så samtliga rankande konkurrenter gör (Fallnafors, Kansjö Bygg, Nässjö Golv).
5. **Katalogposter:** hitta.se + eniro med samma NAP, så att telefonnumret blir sökbart.

## DEMO-VINKEL

**Känsla:** "Lokal hantverkare man litar på" — varm, jordnära Småland, inte byråslick. Deras IG-content är beviset; demon ska bara rama in det.

- **Hero:** före/efter-slider på ett badrum (deras starkaste IG-content) + rubrik i stil med "Renovering & snickeri i Nässjö med omnejd" + synligt telefonnummer 0380-69 20 07 och klick-för-att-ringa-knapp. Lokal förankring i första meningen.
- **Sektion 2 — Före/efter-galleri:** golv, kakel, badrum, altan/uterum direkt från deras IG. Detta är deras unika tillgång: de HAR bildbeviset, det ligger bara på fel plattform.
- **Sektion 3 — Tjänster:** kort för Badrum / Golv & kakel / Altan & uterum / Snickeri & renovering — speglar exakt deras IG-innehåll, varje kort = framtida landningssida.
- **Sektion 4 — Lokalt förtroende:** "Vi finns i Nässjö" + karta/områden (Nässjö, Eksjö, Forserum, Bodafors...) — samma geografiska grepp som JB Badrum och Höglandet Allservice använder.
- **CTA genomgående:** "Ring 0380-69 20 07" + enkelt formulär (namn, telefon, vad vill du göra?). Hantverkskunder ringer — gör numret till hjälten.
- **Säljkrok i mötet:** öppna med den döda bio-länken (visa felmeddelandet live i mobilen), visa sedan demon på samma mobil. Kontrasten ÄR pitchen: "i dag leder din länk hit — i morgon hit."

---
*Research utförd 2026-06-11 av Bahko Byrå. Alla observationer källmärkta; punkter markerade "verifiera manuellt" kontrolleras i webbläsare/Maps före mötet.*
