---
name: demo-recopy
description: Use when the user wants to reuse an EXISTING scroll-cinematic demo for a new lead/company by changing ONLY the copy — no new images, no new video, no credits spent. Trigger on "återanvänd demon", "byt copy på demon till...", "ny lead, samma nisch", "modda demon till...", "skriv om copyn på [demo] till...", or any request to repurpose a built demo for a different company without regenerating media.
argument-hint: [nya leadets namn + nisch/ort, t.ex. "Väsby Mark AB anläggning Sollentuna"]
disable-model-invocation: true
---

# Demo-recopy — byt bara copyn, återanvänd allt annat

Syskon-skill till `scroll-cinematic`. Där den skillen bygger en helt ny demo (nya
Higgsfield-keyframes/klipp, ~150 credits), gör den här **noll ny generering**: den tar
en redan byggd demo och skriver om texten till en ny lead i (nära nog) samma nisch.
Rätt verktyg när du har en befintlig demo vars video/bilder redan passar den nya
leadens bransch — bara varumärket och orden ska bytas.

**Kärnregeln: ändra ALDRIG video-url:er, poster-url:er, bildkällor, CSS, animationstider
eller sektionsfönster.** Om den nya leaden kräver andra bilder/klipp för att kännas rätt
(helt annan nisch) — det är inte längre en copy-only-uppgift, hänvisa till
`scroll-cinematic` istället.

## Steg 1 — Fråga vilken demo som ska återanvändas

Lista de befintliga demofolderna (kör `ls bahkobyra/cloud/` — listan nedan blir
inaktuell, källan är alltid mappen) och fråga användaren (AskUserQuestion eller ett
enkelt val i chatten) vilken som ska ligga till grund. Visa varje demos nisch så
användaren vet vad den faktiskt föreställer:

| Mapp | Nisch (vad videon föreställer) |
|---|---|
| `bygg/` | Husrenovering (fiktivt facit — GRANIT, används normalt inte direkt mot kund) |
| `osterlunds/` | Markarbeten/anläggning — sönderkörd tomt → granitinfart |
| `kmctransport/` | Kranbil/transport — skräpig tomt → kranlyft |
| `asmar/` | Rörinstallation/relining — korroderat rör → rent badrum |
| `tryggbyggservice/` | Badrumsrenovering |
| `alfredallservice/` | Allservice/hemtjänster |
| `brommatradgardsservice/` | Trädgårdsservice |

## Steg 2 — Nisch-koll (obligatorisk, innan du skriver en rad copy)

Jämför den nya leadens faktiska bransch (fråga eller verifiera enligt samma regel som
`scroll-cinematic` Steg 0 — gissa aldrig, kolla Instagram/hemsida/bolagsregister) mot
vald demos visuella innehåll:

- **Nära nog match** (t.ex. två markanläggningsfirmor, två kranbilsfirmor, två
  badrumsrenoverare) → fortsätt till Steg 3.
- **Tydlig mismatch** (t.ex. vald demo visar ett kranlyft men leaden är en
  målerifirma) → **stanna och flagga det till användaren.** Föreslå antingen en
  bättre matchande befintlig demo, eller att köra `scroll-cinematic` istället för en
  demo med rätt visuellt innehåll. Kör aldrig copy-only mot en demo vars video
  uppenbart inte föreställer leadens jobb.

## Steg 3 — Samla leadens info

Fråga (eller använd redan given info) för:
- Företagsnamn, exakt bransch/nisch, ort/område.
- Telefonnummer och e-post — **om kunden inte gett riktiga uppgifter, använd samma
  platshållarkonvention som `scroll-cinematic`** (`070-123 45 67` / `info@[kund].se`)
  och säg det till användaren, hitta aldrig på något som ser äkta ut.
- Eventuella kända, verifierbara fakta att lyfta fram (grundår, specialitet, område).
  **Hitta aldrig på historik-siffror åt en riktig kund** — se Steg 5 nedan.

## Steg 4 — Kopiera filen, skriv om ENDAST copy

```
cp bahkobyra/cloud/[vald-demo]/index.html bahkobyra/cloud/[ny-kund]/index.html
```

Byt i den nya filen — och bara detta:
1. `<title>`, `<meta name="description">`.
2. `.loader-brand`, `.header-logo`, footer-varumärke.
3. Hero: `.hero-label`, `.hero-heading` (behåll radbrytningen/ordstrukturen om möjligt,
   byt orden), `.hero-tagline`.
4. Sektion 001 (filosofi): rubrik, brödtext, citat/note — samma smärta→mekanism→
   riskreversering-formel som `scroll-cinematic` använder, men skriven för DEN HÄR
   leadens jobb, inte den gamla demons.
5. Projektkortens `.wc-tag`/`h3`/`<p>` (bildkällorna rör du INTE — bara texten på
   korten). Samma för galleriets `alt`-texter i den statiska delen om de nämner den
   gamla leaden vid namn.
6. Sektion 003 (tjänster): `.service-name`/`.service-tag`/`.service-time`.
7. Stats: **löftesbaserade** (fast pris, svarstid, en kontakt, inga dolda avgifter) —
   aldrig historik-siffror för en riktig kund, oavsett vad den gamla demon hade.
8. CTA-rubrik + `.cta-sub`.
9. Den statiska delen (`#om-oss`, `#process`, `#kontakt`): brödtext, punktlista
   tjänster, steg-korten, kontaktuppgifter (telefon/mejl-platshållare enligt Steg 3).
10. `mailto:`-länken i Bahko-modalen: uppdatera `subject`/`body` till den nya leadens namn.

**Rör inte:** `<video src>`, `poster=`, `<img src>` i projektkort/galleri, någon CSS,
`data-enter`/`data-leave`, Lenis/GSAP-parametrar, `#float-offert`-logik, modalens
Cal.eu-länk.

## Steg 5 — Samma anti-fabrikations-regel som scroll-cinematic

En riktig kund får aldrig påhittade verifierbara påståenden (antal projekt, betyg,
grundår, namngivna referenskunder). Om den ursprungliga demon hade sådana siffror
(t.ex. GRANIT-facit har "240+ projekt", "4,9★") — **byt dem till löftesbaserade stats**
när du kopierar till en riktig lead, hitta inte på nya siffror bara för att bibehålla
formatet.

## Steg 6 — QA

1. `node --check` på inline-scriptet (samma metod som `scroll-cinematic`: extrahera
   `<script>`-blocket, kör mot temp-fil).
2. `grep` efter den GAMLA leadens/demons namn i nya filen — inget kvar (varumärke,
   mailto-subject, alt-texter).
3. Inga fabricerade siffror kvar för en riktig kund.
4. Telefonnummer/mejl konsekvent på alla fyra ställen (header, footer, kontaktsektion, ev. modal).

## Steg 7 — Leverans

Committa, pusha till arbetsgrenen, fråga om merge till `main` (samma mönster som
`scroll-cinematic` — en ny kunddemo är en ny leverans, inte en automatisk
produktionspush). Skicka länken: `bahkobyra.se/cloud/[ny-kund]/`.

## Varför den här skillen finns

`scroll-cinematic` kostar ~150 credits och några minuters generering per demo. När en
ny lead ligger i (nära nog) samma nisch som en redan byggd demo är hela den kostnaden
onödig — samma princip som återanvändnings-steget i `scroll-cinematic` (Steg 1 där),
fast tillämpad på en KOMPLETT demo i stället för enstaka bilder/klipp.
