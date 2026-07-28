---
name: puzzle-me
description: Use when the user hands over a build (HTML-fil, mall, template, demo, sida) and wants it directed at the bygg/hantverk-nischen och deras smärta, och sedan ett reel-paket för att visa upp jobbet. Trigger på "här är ett bygge", "dirigera bygget", "nischa bygget", "anpassa mallen till nischen", "gör om den till bygg/hantverk", "gör den till en lösning för dom", "ge mig reel-script för bygget", "hur ska vi filma det här", "lägg upp vårt jobb".
argument-hint: [sökväg till bygget + ev. trade/kund, t.ex. "bahkobyra/cloud/nyfirma/index.html tak Solna"]
---

# Bygge → nisch → reel

Tar ett **inkommande bygge** (en mall, en demo, en sida, ett kodbygge som lämnats
över), dirigerar om det så att det blir en **lösning för bygg/hantverksnischens smärta**,
och lämnar sedan ett **reel-paket** (manus + inspelningsinstruktioner + caption) för att
visa upp jobbet på @bahkostudio.

Två leveranser, i denna ordning. Hoppa aldrig till reelen innan bygget är dirigerat och
QA:at, för reelen bygger på vad som faktiskt finns i bygget.

Nisch-kunskapen (smärtlager, per-trade-ord, bevis, reel-vinklar, copy-regler) bor i
[nisch.md](nisch.md). **Läs den innan du skriver en rad copy.**

## Kör INTE den här skillen om

| Läget | Rätt skill |
|---|---|
| Ny demo ska genereras från grunden med nya klipp | `scroll-cinematic` |
| Befintlig bahkobyra-demo ska återanvändas för ny lead, samma nisch, bara copy | `demo-recopy` |
| Veckans content-batch (3 reels + 2 carouseller), inte kopplat till ett bygge | `instagram-engine` |
| Bara en logo-animation eller ett intro-sting | `motion-design` |

Den här skillen är för när **något redan byggt kommer in utifrån** och ska vändas mot
nischen, och jobbet sedan ska ut som content.

---

## Steg 1 — Ta emot och inventera bygget

`$1` = sökväg eller beskrivning av bygget. `$2` = trade (`bygg` | `tak` | `måleri` |
`mark` | `badrum` | `snickeri` | `el/rör` | `allservice`). `$3` = ort/kund om känt.

Saknas bygget: fråga efter sökväg, klistrad kod, URL eller zip. Gissa aldrig vilket
bygge som menas. Saknas trade: fråga, eller använd `bygg` och säg att du gjorde det.

Läs bygget och skriv en kort inventering till användaren (max 10 rader):

1. **Vad är det?** Statisk HTML, React, scroll-driven, mall från nätet, egen demo?
2. **Vem säljer det till idag?** Vilken bransch/målgrupp är copyn skriven för nu?
3. **Vilka sektioner finns?** Hero, om, tjänster, galleri, process, stats, kontakt, CTA.
4. **Vad saknas** mot lager B-checklistan i [nisch.md](nisch.md) §2.
5. **Vad är värt att bevara?** Struktur, animationer, CSS, koreografi, videolager.

Är bygget en av våra egna `cloud/`-demos: säg det, och föreslå `demo-recopy` i stället
om det bara är copyn som ska bytas mot en lead i samma nisch.

## Steg 2 — Nisch-lås innan du skriver

Läs [nisch.md](nisch.md) §1–§3. Fastställ tre saker och skriv ut dem:

- **Lager A** (vår köpare, hantverkaren) → styr reelen i Steg 5.
- **Lager B** (villaägaren som ska handla upp jobbet) → styr all copy i bygget.
- **Trade-raden** ur §3 → motiv, ord, konkret smärta.

Är bygget för en **riktig kund**: verifiera deras faktiska bransch (Instagram, hemsida,
allabolag/ratsit via WebSearch) enligt samma regel som `scroll-cinematic` Steg 0. Gissa
aldrig bransch från namnet. Går den inte att verifiera: säg det och fråga.

## Steg 3 — Dirigera bygget

Målet: varje sektion ska döda en namngiven tyst rädsla ur [nisch.md](nisch.md) §2.
Formeln per sektion är ärvd: **led med smärtan → svara med mekanismen → stäng med
riskreversering.**

**Skriv om:**
1. `<title>` + meta description → trade + ort.
2. Varumärke: loader, header-logo, footer.
3. Hero-rubrik: 2 rader, konkret, begriplig på en sekund. Inte poetisk. Testa på en
   trött villaägare, inte på en art director.
4. Tagline → **löften, inte adjektiv**: `Fast pris innan start · Svar inom 24h · En kontakt hela vägen`.
5. Filosofi/om-sektion: öppna med en KONKRET smärta ur trade-raden (vatten i källaren,
   fuktfläck i taket), svara med mekanismen, avsluta med riskreversering.
6. Projektkort/galleri: sälj **utfall**, inte moment. Bara texten, inte bildkällorna.
7. Tjänstelista: kundens egna ord ur §3, inte branschtermer.
8. Stats: **löftesbaserade** för riktiga kunder. Aldrig påhittad historik.
9. CTA: öppnande fråga + `Begär kostnadsfri offert` + löftena i undertexten.
10. Kontakt: telefon stort och klickbart. Platshållare om kunden inte gett riktiga
    uppgifter, och säg det till användaren.

**Lägg till om det saknas** (detta är dirigeringen, inte scope creep):
- Före/efter på riktiga jobb. Tyngsta beviset i nischen.
- "Så går det till", 4 steg, ett steg per oro.
- Kontaktsektion med område de jobbar i.
- Klickbart telefonnummer i header.

**Rör inte:** CSS, animationstider, scroll-koreografi, sektionsfönster, `<video src>`,
`poster=`, `<img src>`, Lenis/GSAP-parametrar. Kräver bygget helt nya bilder/klipp för
att kännas rätt i nischen är det inte längre en dirigering, då hänvisar du till
`scroll-cinematic`.

**Anti-fabrikation:** en riktig kund får aldrig påhittade verifierbara påståenden
(antal projekt, betyg, grundår, namngivna referenskunder). Hade mallen sådana siffror,
byt till löftesbaserade, hitta inte på nya för att behålla formatet.

## Steg 4 — QA i två lager

**Smärt-QA (först, det är den som avgör om bygget är en lösning):**
- Peka på varje sektion och namnge vilken rad ur §2 den dödar. Ingen match = skriv om.
- Läs hero-rubriken högt. Fattar en trött kund budskapet vid första ögonkastet?
- Finns FOR THEM / REAL / Financial Sense / Easy to say YES i varje block?
- Noll "Växa på Google"/SEO-copy i bygget om det är en kundsajt.

**Teknisk QA:**
1. `node --check` på inline-scriptet (extrahera `<script>`-blocket, kör mot temp-fil).
2. `grep` efter den gamla mallens/leadens namn. Inget kvar i varumärke, mailto-subject
   eller alt-texter.
3. Inga `__PLACEHOLDER__` kvar.
4. Mobil: hamburger funkar, ingen sidled-scroll, textsektioner läsbara.
5. `prefers-reduced-motion`: sidan statisk, videos pausade, räknare visar rätt slutvärde.
6. Nav-länkarna scrollar faktiskt till sina ankare.

## Steg 5 — Reel-paketet

Format (låst): **svenska, 20–30 sekunder, 9:16, enbart skärminspelning + voiceover.**
Ingen kamera, ingen talking head. On-screen text för hooken.

Välj EN vinkel ur [nisch.md](nisch.md) §4. Default `Förvandling`. Följ copy-reglerna i
§5 hårt: inga tankstreck, inget pris, ingen SEO-copy, en CTA (`DM:a SAJT`).

Beat-schema för 30s (komprimera proportionerligt för 20s):

| Tid | Beat | Vad som händer på skärmen |
|---|---|---|
| 0–3s | **Hook** | Det snyggaste i bygget direkt. Hero-loopen eller före/efter. Hooken som on-screen text. |
| 3–8s | **Problem** | Långsam scroll neråt. "Kunden googlar dig innan de ringer." |
| 8–13s | **Agitera + diskvalificera** | Fortsatt scroll genom bevis-sektionen. |
| 13–22s | **Lösning, visad** | Det som säljer: före/efter, offertknapp, klickbart nummer. Peka med muspekaren. |
| 22–27s | **CTA** | Tillbaka till heron eller CTA-sektionen. `DM:a SAJT` som text. |
| 27–30s | **Future pace** | Sista bilden står still. Måla bilden av en kund som redan är såld. |

**Skriv ut manuset ordagrant** enligt mallen nedan. Voiceover ska gå att läsa högt i
tempo utan att bli andfådd. Räkna orden: cirka 2,5 ord per sekund, alltså 50–75 ord
totalt. Ligger du över, stryk.

### Inspelningsinstruktioner (ta med dessa, de är inte självklara)

- **Spela in i mobilbredd**, inte desktop. Antingen sajten i mobilens webbläsare med
  telefonens egen skärminspelning, eller DevTools på 390×844 och spela in fönstret.
  Desktop-inspelning beskärd till 9:16 ser alltid fel ut.
- **Scrolla långsamt.** Bygget har entré-animationer på sektionsfönster. Far du förbi
  hinner de inte spela och det ser trasigt ut. Ungefär halva hastigheten av normal scroll.
- **Kolla om bygget har en tidsstyrd popup** innan du spelar in (`grep -c "nudge-popup"`).
  Élara/klinik-demos har en bokningspopup som slår in efter cirka 10 sekunder, medan
  bygg-facit (`cloud/bygg/`) inte har någon. Finns den: gör den till en poäng i klippet
  eller håll tagningarna under 10 sekunder. Låt den inte glida in oförklarat.
- **Ladda sidan färdigt en gång innan du spelar in** så loopar och bilder ligger i cache.
  Annars fångar du en halvladdad sida.
- **Ljud:** spela in voiceover separat i ett tyst rum, lägg på i efterhand. Tala inte
  medan du scrollar, då hörs fingret mot skärmen.
- **Musik:** lågt, under rösten. Bygg-demos har egna videoloopar men de är alltid mutade.
- **Visa aldrig en riktig kunds ogodkända demo publikt.** Kunddemos ligger
  `noindex, nofollow` och är inte publicerade. Har kunden inte sagt ja: filma
  GRANIT-facit (`bahkobyra/cloud/bygg/`) i stället, det är ett fiktivt varumärke och
  fritt att visa. Fråga användaren om godkännande innan en kundsajt syns i en reel.
- **Kolla URL-fältet** i inspelningen. Är det inte en URL du vill visa, göm adressfältet
  eller beskär bort det.

### Output-mall

Skriv filen till `content/reels/bygge-[kund-eller-trade].md`. Är det en engångsgrej som
inte ska sparas, lägg den i `.tmp/` i stället och säg det.

```markdown
# Reel — [kund/trade]: "[hooken]"

**Kanal:** @bahkostudio · **Nisch:** [trade] · **Vinkel:** [vinkel ur nisch.md §4]
**Mål:** DM:a SAJT → gratis hemsideförslag
**Format:** 9:16, [20/30]s, skärminspelning + voiceover. Bygget: [sökväg eller URL]

## Manus

| Tid | Voiceover (läs exakt) | På skärmen | On-screen text |
|---|---|---|---|
| 0–3s | "[hook]" | [vad du filmar] | [kort text] |
| ... | | | |

**Ordräkning:** [n] ord. **Uppläst tid:** cirka [n]s.

## Inspelningsordning (tagningar)
1. [tagning, vad som filmas, hur länge]
2. ...

## Caption
[1–2 rader som förstärker hooken]

DM:a SAJT så bygger jag ett gratis förslag på hur er sida kan se ut.

[3–5 hashtags: trade + jobb + ort]

## Checklista före publicering
- [ ] Mobilbredd (9:16), inte beskärd desktop
- [ ] Långsam scroll, animationerna hann spela
- [ ] Popupen hanterad eller undviken
- [ ] Voiceover separat inspelad, tyst rum
- [ ] Inga tankstreck, inget pris, ingen SEO-copy
- [ ] En CTA: DM:a SAJT
- [ ] Kundens godkännande om en riktig kundsajt syns
```

## Steg 6 — Leverans

1. Committa bygget och reel-filen i samma commit, arbetsgren.
2. Pusha med `git push -u origin <gren>`.
3. **Fråga innan merge till `main`.** Vercel deployar `bahkobyra/`, så en merge är en
   publicering. Ny kundsajt är en leverans, inte en automatisk produktionspush.
4. Skicka länken (`bahkobyra.se/cloud/[kund]/`) och sammanfatta i tre rader: vad som
   dirigerades, vilken smärta bygget nu svarar på, vilken reel-vinkel som valdes.
5. Loggas DM-svar sedan: lägg in som leads i dashboardens CRM, `niche: bygg`,
   `pathway: skriven`.

## Guardrails

- **Läs [nisch.md](nisch.md) innan copy skrivs.** Utan lager A/B-uppdelningen blir
  bygget en sida som pratar med sig själv.
- Generera aldrig bilder eller video automatiskt. Det kostar credits och kräver
  explicit beställning. Den här skillen ska klara sig på noll credits.
- Reelen visar ETT bygge och har EN CTA. Två budskap i samma reel dödar båda.
- Aldrig pris i reelen. Pris landar i samtal.
- Aldrig SEO/"Växa på Google"-copy i en reel. Det bor bara på bahkobyra.se.
- Ändra inte bygget så mycket att det blir en ny demo. Går inte bygget att rikta mot
  nischen med copy och sektionstillägg: säg det rakt och hänvisa till `scroll-cinematic`.
- Jag kan inte spela upp video i sandboxen. Be alltid användaren ögongranska bygget
  och tagningarna innan något publiceras.
