---
name: hemsidor
description: Bygger kundhemsidor och demoförslag för Bahko Byrå på demomallen v3 (ljus design, delad mall i web/app/(demo)/_mall/) — server-renderad Next.js-route med noll egen klient-JS. Enda spåret. Trigger på "bygg hemsidan för [kund]", "kunddemo", "ny lead", "nytt förslag till [lead]", "demo enligt mallen", "gör om demon", "klä om demon till nya designen", "byt copy på demon", "ny lead samma nisch". INTE för bahkobyra.se själv (marknadssajten bor i (sajt)/), inte för reels (bahko-reel) och inte för enstaka bild eller video (higgsfield-generate).
argument-hint: [företag + nisch/ort, eller Instagram-länk, t.ex. "https://www.instagram.com/swedcromaleri"]
disable-model-invocation: true
---

# Hemsidor — kunddemo på demomallen v3

En väg, inga alternativ: **en delad mall, och en datafil per kund.**

- Mallen: `web/app/(demo)/_mall/` — `DemoSida.js` (serverkomponent),
  `mall.module.css` (all design), `fonter.js` (de fyra typsnitten).
  Understrecket gör mappen osynlig för routern.
- Kunden: `web/app/(demo)/<kund>/page.js` exporterar `metadata` och skickar ett
  `data`-objekt till `<DemoSida />`. **Ingen egen CSS-fil per kund.**
- **Kanon — KOPIERA DENNA:** `web/app/(demo)/swedcro/page.js` (2026-09-18).
- Noll egen klient-JS. Meny och modal på `:target`, popup på kryssruta, frågor
  på `<details name>`, rörelse på scroll-driven CSS. Inget script kan krascha,
  för det finns inget script.

**Designen bestämdes av Mathias 2026-09-18** utifrån två referenssajter
(P.N Byggentreprenad och Axel's Landscaping). En ändring av designen görs i
mallen och slår igenom på alla demos samtidigt — ändra aldrig utseendet i en
enskild kunds fil.

## Utdött — byggs aldrig mer

Allt nedan är borttaget ur mallen. Hittar du det i en äldre demo är den demon
inte omklädd än (se läget Omklädnad).

- **Mörk kol-sida** (golvvision-kanon 2026-09-06 och alla kopior av den). Sidan
  är ljus nu.
- **Lager-heron** med logotypen som h1 mitt i bild. Heron har rubrik igen.
- **Siffer-raden** (uppräknande tal under heron). Mathias 2026-09-18: "den
  delen ska bort, har ingen påverkan alls." Gäller även löftessiffror.
- **Tjänste-tejpen**, **Förvandlingen** (före/efter-par + kvadratiskt galleri),
  **klickbara steg**, **sociala rutnätet med platshållare**, **en CSS-fil per
  kund**, **en egen palett av tio variabler per kund**.
- Scroll-koreografin från augusti (fast videolager, GSAP, Lenis) och allt
  under `web/public/cloud/`. Avskaffat 2026-08-21.

## Sidan, uppifrån och ned

Ordningen är fast och ligger i `DemoSida.js`. QA:n kontrollerar den.

| # | Sektion | Vad den är |
|---|---|---|
| — | **Header** | Fast. Mitten: glaspiller med två länkar · **kundens logotyp** · två länkar. Vänster: telefonnumret. Höger: rund accentknapp. Genomskinlig med vit text över filmen, vitt glas med mörk text efter 120 px skroll. Mobil: logotyp, Ring-knapp, Meny. |
| 1 | **Hero** | Helskärmsfilm. Vänsterställt: ort-märke, **firmanamnet i Bebas Neue som h1**, EN mening, fylld knapp + konturknapp "Ring …", tre verifierade bevisord med bock. |
| 2 | **Tjänster** | Kort med **bild** överst, linjeritningen som liten ikon på bildkanten, rubrik, text, tre punkter, länk till formuläret. Hela kortet klickbart. |
| 3 | **Våra jobb** | **Två band som rullar åt var sitt håll** — första åt vänster, andra åt höger. Paus vid hover. Knapp efter banden. |
| 4 | **Varför oss** | **Mörk sektion.** Vänster: rubrik, fyra punkter i kort, två knappar. Höger: **förvandlingsfilm som slutar med kundens logotyp**. |
| 5 | **Om oss** | Krämvit. Vänster: **logotypen** på vitt kort. Höger: historien i två stycken, tre bevisord (ord, inte räknare), länk. |
| 6 | **Så går det till** | Numrerade kort (01–05), knapp. *Valfri — utelämna `steg` i data så försvinner den.* |
| 7 | **Omdömen** | Google-stil: betygsbricka (bara verifierat betyg), vita kort med färgad initial, G-märke på Google-omdömen, gula stjärnor. Två knappar. |
| 8 | **Instagram** | Profilrad i Instagram-stil med logotypen i gradientring + följ-knappar, och **tre riktiga inlägg inbäddade** med bildtext, gilla och kommentarer. |
| 9 | **Frågor** | Krämvit. Vänster: rubrik + kort med Ring-knapp (klistrat). Höger: dragspel, en öppen åt gången. |
| 10 | **Kontakt** | **Vårt formulär på vitt kort över en suddig film.** Vänster: rubrik, tre bockar, kontaktrutor. |
| 11 | **Footer** | Ljus. **Logotypen stor**, kort text, sociala ikoner, tre kolumner (Sidan, Tjänster, Kontaktuppgifter), org.nr i bottenraden när det är verifierat. |
| — | **Sidflik** | Stående "RING 07x-…" i högerkanten, accentfärg. Dold på mobil, där headern bär Ring-knappen. |
| — | **Popup** | Nere till höger, ovanför Bahko-knappen, efter 14 s. Stängs med kryssruta. |
| — | **Bahko** | Demo-knappen nere till höger + modalen. Smaragd `#10B981` på marin `#0A1628`. **Rörs aldrig.** |

**Uppmaningar:** minst tre knappar till formuläret i innehållet (mallen ger fem:
hero, jobb, varför, steg, omdömen) plus header, tjänstekortens länkar,
frågekortet, popupen och sidfliken. Alla bär **samma verb**.

## Designen — det som gör sidan proffsig

**Typsnitt (samma för alla kunder, ligger i `fonter.js`):**

| Roll | Typsnitt | Var |
|---|---|---|
| Firmanamnet | **Bebas Neue** 400, versaler, spärrat 0,035em | Bara h1 och stegnumren |
| Rubriker, meny, knappar | **Outfit** 500–800, rubriker 800 med −0,025em | h2, h3, nav, btn |
| Den bärande frasen | **Fraunces kursiv** 600 i accentfärg | `<em>` i varje h2 |
| Brödtext | **Inter** 400–600 | allt annat |

Tvåtonsrubriken är mallens signatur: `rubrik: ['Allt under', 'samma tak']` —
första delen rak och mörk, andra delen kursiv serif i märkets färg. Den
kursiva delen ska vara **poängen**, inte ett utfyllnadsord.

**Färg: vitt, och EN mättad accent ur kundens logotyp.** Ytor som växlar: vit
`#fff` · mjuk `#F5F7FA` · kräm `#F7F4EE`. Text `#0F172A` och `#475569`. Mörkt
bara på tre ställen: Varför-sektionen, kontaktsektionen och heron.

Kunden sätter exakt sex värden i `tema`:

| Fält | Vad | Krav (mät!) |
|---|---|---|
| `mork` | Märkets mörka ton. Slöjan över filmen, Varför, Kontakt | Luminans under 0,06 |
| `accent` | Knappfärgen, rakt ur logotypen | Vit (eller `paAccent`) text ≥ 4,5:1 |
| `accentHover` | Ett steg mörkare | — |
| `accentText` | Accenten som **text på ljus yta** | ≥ 4,5:1 mot kräm `#F7F4EE` — den strängaste ytan |
| `accentLjus` | Accenten som **text på mörk yta** | ≥ 4,5:1 mot `mork` |
| `paAccent` | Textfärg på knappen. `#fff`, eller `#0F172A` om accenten är ljus (gul, lime) | ≥ 4,5:1 |

Är logotypen svartvit: välj en mättad accent ur nischen (gräsgrön, signalorange,
kobolt) — aldrig grått. **Aldrig pastell som knappfärg, aldrig två accenter.**
Swedcro: `#0B132B` · `#D92525` · `#B91C1C` · `#B91C1C` · `#FF8A7E` · `#fff`.

**Typskala:** sex steg som variabler (`--tx-xs` 12 · `--tx-s` 14 · `--tx-m` 16 ·
`--tx-l` 18 · `--tx-xl` 22 · `--tx-2xl` 24 px, och `--tx-siffra` 32 px bara för
betygstalet), plus egna `clamp()` för h1, h2 och ingress. Knapptext minst 16 px. **Brödtext är aldrig under 16 px**; 12 och 14 är för etiketter, noter och
bildtexter. Inga lösa rem-värden — design-loopen räknade till tjugo närliggande
storlekar innan skalan fanns.

**Form:** alla kortytor 18 px radie (kort, frågor, betygsbricka, popup, meny, filmer),
knappar och fält 12 px, formulärkortet 24 px, piller 999. Inga andra radier. Neutrala höjdskuggor,
aldrig färgat glöd runt kort. Knappen får en mjuk skugga i sin egen färg —
det är det enda undantaget. Luft: sektioner `clamp(4,5rem, 9vw, 7,5rem)`.

## Lägen — skiljer sig bara i mediakostnad

| Läge | När | Credits |
|---|---|---|
| **Omklädnad** | En äldre demo (mörk kol-design) ska till v3 | **0** — se nedan |
| **Återbruk / lån** | Nischen finns redan i `web/public/*/media/` | 0 |
| **Nybygge** | Inget i nischen finns | **~35–50** — se Media |

Saldot är litet (Mathias 2026-09-14). Under 100 credits körs, över 100 frågas
(CLAUDE.md) — men sikta på under 50.

### Omklädnad: gammal demo → v3, utan credits

1. Läs den gamla `page.js`. **VERIFIERAT-blocket, kontaktuppgifterna, copyn,
   frågorna och omdömena följer med oförändrade** — de är redan granskade.
2. Gamla hero-filmen (före/efter, genererad) **blir förvandlingsfilmen** i
   Varför: skala till 1280×720 och sätt logokortet på slutet (recept nedan).
3. Ny hero: långsam rörelse över kundens bästa egna foto, eller det gamla
   Varför-klippet som ping-pong. Recept nedan.
4. Kontaktfilmen: samma klipp som heron, nedskalat och suddat.
5. Tjänstebilder och jobbband: kundens egna foton först, sedan demons gamla
   galleri- och socialbilder. **Räcker de inte till två band om minst fem
   bilder vardera: låna ur biblioteket och märk det i `jobb.not`** (se
   Sanningsregeln). Generera inte.
6. Ta bort den gamla `<kund>.module.css` och mediafiler som inte längre används.
7. Siffer-radens innehåll kastas inte: de verifierade orden flyttar till
   `hero.bevis` och `om.bevis` — som ord, utan räknare.

## Sanningsregeln — avgör om förslaget går att skicka

- **VERIFIERAT-block** i `page.js` toppkommentar: allt som får påstås, källa
  och datum, och en rad om vad som INTE är verifierat (ledtider, antal,
  garantier, priser). Allt utanför blocket är förbjudet.
- **Aldrig fabricerad historik åt en riktig kund.** Inga projektantal, inga
  årtal, inga betyg som inte står i deras egna kanaler eller i registret.
- **Omdömen:** riktiga först — Google-profilen, sedan kundens egen sajt
  (Offerta, Reco räknas). Ordagrant eller kortat utan ändrad innebörd, källan i
  `kalla`. `google: true` bara på omdömen som faktiskt står på Google.
  **`betyg` sätts bara när värde och antal är verifierade.** Saknas riktiga:
  exempelkort med `exempel: true` — mallen ger dem **tomma stjärnor** och
  taggen "Exempel", och `not` säger "Exempel — byts mot era riktiga omdömen".
  Aldrig ett samlat betyg i exempelläge.
- **Instagram:** bara kundens egna, riktiga inlägg. Går inga koder att få fram:
  `kort`-läget med deras egna bilder i Instagram-ram — **utan gilla-siffror och
  utan påhittade kommentarer.** Facebook-knappen bara med verifierad sida.
- **Varje bildfil används exakt en gång** och ligger i en enda sektion.
  `md5sum` på mappen före leverans: antal unika hashar = antal filer.
- **Lånade och genererade bilder märks, en gång per sektion:** `jobb.not`
  ("Illustrationsbilder — byts mot era egna projektfoton") och `varfor.not`
  ("Filmen är en illustration av …"). Är bilderna kundens egna säger noten det.
- **Kontaktuppgifter:** bara verifierade. Saknas telefon: utelämna `tel` —
  mallen byter då själv Ring-knapparna mot Instagram och formuläret. Aldrig ett
  gissat nummer. Formuläret går alltid till `mathias@bahkobyra.se` i demon.
- **Demos med riktiga kontaktuppgifter visas inte publikt** (Mathias). De är
  `robots: noindex` och länkas bara i DM till kunden.
- Firmanamnet är en uppgift. Läst ur ett Instagram-handle: säg det och be
  Mathias bekräfta stavningen. **Namnfällor** har slagit till tre gånger
  (alltfix.se var en städfirma, A.D. Valora AB var ett annat bolag) — ett
  registerträff på namnet räcker inte, orten och nischen ska stämma.

## Steg 1 — Verifiera nischen

Gissa aldrig bransch från firmanamnet. Ordning: kundens hemsida → Instagram →
bolagsregister (allabolag/merinfo via WebSearch, `r.jina.ai` när sidan
blockerar). Profilnamn och bio i en skärmbild Mathias klistrar in räknas som
verifiering. Går nischen inte att verifiera: säg det och fråga.

**Norska leads byggs på norska** (`sprak: 'nb'` i data — mallens egna texter
finns översatta) och verifieras mot brreg.no/proff.no.

**Instagram-koderna hämtas utan inloggning:**

```sh
curl -sL -A "Mozilla/5.0" "https://www.instagram.com/<handle>/embed/" -o ig.html
grep -o '\\"shortcode\\":\\"[A-Za-z0-9_-]*\\"' ig.html | sort -u
```

Välj tre inlägg som visar **arbete** (inte en logotyp eller en helgdagshälsning)
— öppna `https://www.instagram.com/p/<kod>/embed/captioned/` och titta. Mallen
bäddar in dem med `<iframe>`; ingen embed.js, så noll-JS-regeln håller.

## Steg 2 — Media

**Trappan, i kostnadsordning:** kundens egna foton (sajtens galleri, Instagram)
→ demons gamla bilder → lån ur `web/public/*/media/` (`md5sum` mot dubbletter)
→ generering.

Varje demo behöver: hero-film liggande + stående, två postrar, förvandlingsfilm
med logokort, poster, kontaktfilm + poster, en bild per tjänst (4:3), och
**10–14 jobbilder (4:3, 960×720) till två band**, logotypen.

### Var credits läggs (och inte)

Den enda filmen som **måste** genereras är förvandlingen i Varför — och den
visas i halv bredd, så **720p räcker** (5 s ≈ 32 credits; 4 s ≈ 26).
Heron, kontaktfilmen och slutkortet byggs lokalt med ffmpeg för 0 credits.

Förvandlingen är kedjan **A → B**: A = slitet utgångsläge
(`"documentary contractor photography, natural muted colors, no HDR, no
people, no text, no logos"`), B = samma bild färdig (`--image <A>`, "Keep the
geometry, position and perspective IDENTICAL to the reference, nothing added
or removed anywhere else"). **Granska B mot A punkt för punkt** innan klippet
körs — en insmugen detalj kostade 104 credits. Klippet:

```sh
higgsfield generate create seedance_2_5 --mode omni_reference \
  --start-image A.jpg --end-image B.jpg --duration 5 --resolution 720p \
  --aspect-ratio 16:9 --generate-audio false --prompt "<det fysiska arbetet, steg för steg>. \
  NO glowing lines, NO light effects, no crossfade, no morphing, locked camera."
```

`higgsfield generate cost` först, alltid. Saldo: `higgsfield account status`.
Förvandlingen ska se ut som **arbete**, aldrig som en uttoning. Granska med
bildrutor (`select` + `tile`) innan den används. Ladda ner direkt — Higgsfields
CDN raderar efter ~30 dagar.

### Recepten (ffmpeg, 0 credits)

**Logokortet på slutet av förvandlingsfilmen** — Mathias krav: loggan kommer
upp i slutet. Vit bakgrund för mörka logotyper, `mork`-färgen för ljusa.

```sh
ffmpeg -y -f lavfi -i "color=c=white:s=1280x720:d=2.2:r=24" -loop 1 -framerate 24 -t 2.2 -i logo.png \
  -filter_complex "[1]scale=900:-1,format=rgba,fade=t=in:st=0.25:d=0.6:alpha=1[l];[0][l]overlay=(W-w)/2:(H-h)/2:format=auto:shortest=1,format=yuv420p[v]" \
  -map "[v]" -an -c:v libx264 -crf 20 slutkort.mp4
ffmpeg -y -i forvandling-720.mp4 -i slutkort.mp4 -filter_complex \
  "[0:v]fps=24,scale=1280:720,format=yuv420p,settb=1/24[a];[1:v]fps=24,format=yuv420p,settb=1/24[b];[a][b]xfade=transition=fade:duration=0.6:offset=<klipplängd − 0.6>[v]" \
  -map "[v]" -an -c:v libx264 -crf 26 -movflags +faststart video-varfor-forvandling.mp4
```

`-loop 1 -framerate 24 -t` på logotypen är nödvändigt — utan dem blir kortet
vitt och tomt (hände 2026-09-18). `settb=1/24` på båda ingångarna, annars
vägrar `xfade` ("timebase do not match"). Loggan ska fylla **~70 % av
bredden** — 43 % såg ut som ett misstag. **Titta på sista bildrutan.**

**Hero ur ett eget foto** (långsam inzoomning, ping-pong så loopen aldrig
hoppar). Välj kundens ljusaste, gladaste exteriör — blå himmel slår grå puts.
Motivet till höger, texten står till vänster.

```sh
ffmpeg -y -loop 1 -i foto.jpg -vf "crop=<16:9-ruta>,scale=7680:-2:flags=lanczos,zoompan=z='1+0.08*on/216':x='(iw-iw/zoom)*0.6':y='(ih-ih/zoom)*0.25':d=216:s=1920x1080:fps=24" \
  -frames:v 216 -an -c:v libx264 -crf 20 in.mp4
ffmpeg -y -i in.mp4 -filter_complex "[0]split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1[v]" \
  -map "[v]" -an -c:v libx264 -crf 29 -preset slow -movflags +faststart video-hero.mp4
```

Uppskalningen till 7680 före `zoompan` tar bort darret. Stående: samma sak med
`crop` till 9:16 runt motivet och `s=720x1280`. Håll liggande under ~3 MB.
Finns inget eget foto som håller: ett 720p-klipp uppskalat med
`scale=1920:-2:flags=lanczos` duger under slöjan.

**Kontaktfilmen:** hero-filmen igen, nedskalad och **lätt** suddad:
`-vf "scale=960:540,boxblur=3:1" -crf 30` (~250 KB). Mallen lägger 4 px
CSS-oskärpa ovanpå och en slöja som bara är tät bakom texten till vänster.
Motivet ska gå att känna igen som en film i en stillbild — en närbild av en
slät vägg blev en platt grå toning och underkändes av design-loopen 2026-09-18.

**Postrar** är alltid den färdiga filens bildruta 0:
`ffmpeg -i fil.mp4 -frames:v 1 -update 1 -q:v 3 poster.jpg`.

## Steg 3 — Copyn

**Bärande idé först.** EN mening som är (a) sann för kunden, (b) särskiljande i
nischen och (c) det filmen i Varför visar. Den står som `varfor.lead` och ekar
i `hero.ingress`. En sida som följer varje formregel men saknar idé har ratats
med "hela copyn är värdelös".

- **Heron: firmanamnet + EN mening.** `h1` är namnet, delat på två rader när
  det är långt: `['Swedcro', { txt: 'Måleri & Fasad', liten: true }]`. Mallen
  räknar själv ut storleken så namnet fyller bredden på mobil utan att brytas.
  Ingressen är en mening, högst två, med kundens egna ord. Ingen slogan till.
- **Ärlighet som positionering.** Minst en mening som avstår försäljning
  ("Räcker det att måla om sockeln säger vi det"). Den bor i Varför-punkterna.
- **EN handling per sida.** `cta.txt` (lång), `cta.kort` (header, sidflik utan
  telefon), `cta.lank` (kortlänkar) — samma verb i alla tre. Nischens lägsta
  åtagande: hembesök < mätning < offert < köp.
- **Varför-punkterna** är `{ rubrik, text }`: tre–fyra ord i rubriken, en
  mening i texten, allt inom VERIFIERAT.
- **Om oss** är deras historia med deras ord. Två stycken. `om.bevis` är tre
  **ord** ("15+ år", "F-skatt", "24 timmar") med en förklarande rad — aldrig
  räknare, aldrig påhittat.
- **Jobbandens bildtexter** (`txt`) säger vad som gjordes, 2–4 ord. `alt`
  beskriver bilden. Skriv aldrig "håll muspekaren över" — mobilen har ingen.
- Rytm: brödtext i människoton med varierad meningslängd. Kolon hellre än
  tankstreck. Knapptext = handling, aldrig "Läs mer" eller "Skicka".
- Svenska, du-tilltal, inga klyschor. Personligt varumärke → jag-form.

## Steg 4 — Datafilen

Kopiera `swedcro/page.js` och byt innehållet. Fälten:

| Fält | Innehåll |
|---|---|
| `namn`, `sprak` | Firmanamnet. `sprak: 'nb'` för norska |
| `tema` | De sex färgerna (se Designen) |
| `logo` | `{ src, w, h, alt, topp }` — eller utelämna och sätt `ordmarke: 'Namn'` |
| `kontakt` | `tel`, `telHref`, `epost`, `adress`, `oppet`, `ig`, `igHandle`, `fb`, `orgnr` — bara verifierade, resten utelämnas |
| `cta` | `txt`, `kort`, `lank` |
| `nav` | `vanster` och `hoger`, två länkar var (logotypen hamnar emellan) |
| `formAction` | `mailto:mathias@bahkobyra.se?subject=<Kund>%20-%20…` |
| `hero` | `marke`, `h1`, `ingress`, `video`, `videoMobil`, `poster`, `posterMobil`, `bevis` (tre ord) |
| `tjanster` | `eyebrow`, `rubrik`, `lead`, `kort[]`: `id`, `namn`, `bild`, `alt`, `text`, `punkter`, `ritning` (JSX-paths, viewBox 200×120) |
| `jobb` | rubrikfält + `rad1[]`, `rad2[]`: `src`, `alt`, `txt` · `not` · `tid` (varvtid, ~10 s per bild) |
| `varfor` | rubrikfält + `punkter[]`, `video`, `poster`, `videoAlt`, `not` |
| `om` | `eyebrow`, `rubrik`, `kortRad` (orten under logotypen), `stycken[]`, `bevis[]` |
| `steg` | rubrikfält + `lista[]`: `namn`, `text`. **Utelämna för att ta bort sektionen** |
| `omdomen` | rubrikfält + `betyg` (bara verifierat), `lista[]`, `not`, `lank` |
| `instagram` | rubrikfält + `bio`, och `koder[]` **eller** `kort[]`. Utelämna helt om kontot saknas |
| `fragor` | rubrikfält + `kort` (rubrik, text), `lista[]` (q, a) — 6–8 frågor, pengar och risk först |
| `kontaktSektion` | `eyebrow`, `rubrik`, `lead`, `checkar` (tre), `video`, `poster`, `formRubrik`, `placeholder`, `formNot` |
| `popup`, `footer`, `modal` | `rubrik` + `text` · `text` · `rubrik` + `text` |

"Rubrikfält" = `eyebrow`, `rubrik: ['rak del', 'kursiv del']`, `lead`.

**Linjeritningarna** lever kvar som ikoner: enkla `<path>` i 200×120, nischens
eget språk (husgavel, panel, tapetvåd). Håll dem grova — de visas i 60 px.

## Logotypen

**Kundens egen logotyp** — i headerns mitt, på Om oss-kortet, i
Instagram-ringen, i footern och på filmens slutkort. Det är det första de
tittar efter. Hämta den ur deras egna kanaler (sajtens header, `og:image`,
profilbilden), eller fråga Mathias.

- **Frilägg den.** Nyckla bort bakgrundsplattan så filen har alfa. Halo efter
  nycklingen tas bort med erosion. Är originalet litet: skala upp och be om
  vektorfilen. Är loggans egen fil avklippt (R. Olssons slogan): beskär bort
  det trasiga och flagga det.
- **`topp` styr hur den syns över filmen**, innan headern blivit vit:
  `'vit'` = vit siluett som tonar till egna färger vid skroll (mörka
  logotyper med tydlig form) · `'bricka'` = liten vit bricka bakom
  (flerfärgade, detaljrika eller redan ljusa märken som blir en klump som
  siluett) · utelämnat = som den är (ljusa logotyper). **Titta på siluetten
  i 1x** — går firmanamnet inte att läsa är det `'bricka'`. Tredimensionella,
  flerfärgade märken med text i (Swedcro) blir nästan alltid en klump; de är
  `'bricka'` från början.
- **Hitta aldrig på en logotyp.** Går den inte att få fram: `ordmarke`, och
  flagga i leveransen att logotypen saknas. Slutkortet får då ordmärket satt
  med ffmpeg `drawtext` i Outfit.

## Mallens mönster och deras fallgropar

Rör dem inte i en kunds fil. Ändras de, ändras de i `_mall/` — och då körs QA
på **kanon och minst en demo till**.

| Mönster | Så | Fallgrop |
|---|---|---|
| Header-toning | `@property --bahko-hdr-t` (0→1) animerad på `scroll(root)`, `animation-range: 0 120px`. Färg, glas, pillerfärg och loggans filter räknas ur den med `color-mix`/`calc` | Utan stöd för scroll-tidslinjer står värdet på 1 = vit header från start, aldrig en oläslig. **Pillret är MÖRKT glas högst upp** — ljust glas över ljus film gav oläsliga länkar. |
| H1-storlek | `--h1-tecken` räknas i `DemoSida.js` ur längsta raden; CSS delar bredden med den | Raden får aldrig brytas eller spilla. QA mäter `scrollWidth`. |
| Band | Spår med två grupper, kopian `aria-hidden` med tomma `alt`, `translateX(-50%)`, band två `animation-direction: reverse` | Vid minskad rörelse: stilla, sidledsskroll, kopian dold. |
| Tjänstekort | Länkens `::before` täcker kortet | Nästla aldrig länkar. Ikonen sticker ut under bilden — `overflow` sitter på den inre bildlådan, inte på bildytan. |
| Mobilmeny, modal | `:target`-lager utanför headern, stängs mot `#stangd` | Aldrig `aria-modal`/`role="dialog"` — utan JS finns ingen fokusfälla att lova. Stäng aldrig mot `#top`, då hoppar sidan. |
| Popup | 14 s fördröjd CSS-animation, kryssruta stänger. Nere till **höger**, ovanför Bahko-knappen | Till vänster täckte den herons primärknapp (design-loopen 2026-09-18). Startar `visibility: hidden` så den är oklickbar före entrén. Vid minskad rörelse visas den **inte alls** — en ruta som dyker upp av sig själv ÄR rörelse. |
| Frågor | `<details name="faq">` | Äldre webbläsare: flera kan stå öppna. Godtagbart. |
| Hero-film | Två `<video>`, liggande och stående, växlade med CSS | `<source media>` fungerar inte för video i Chrome. `svh`, aldrig `vh`. Mobilen har egen slöja uppifrån och ned, eftersom texten går över hela bredden. |
| Instagram | `<iframe …/embed/captioned/>`, `loading="lazy"`, 940 px hög (860 på mobil) | Ingen embed.js. Knappens gradient är mörkare än Instagrams egen så vit text klarar 4,5:1. |
| Länkfärg | `.sida :where(a) { color: inherit }` | Skrivs den `.sida a` slår den ut varje knappklass (uppmätt 1,00:1). Aldrig `!important`. |
| Rutnät | Fasta kolumnsteg (4 → 2 → 1 för tjänster), flex med centrerad sista rad för stegen | `auto-fit` lämnade ensamma kort vid 1100 och 768 px. |
| Kontakt på mobil | Vänsterspalten blir `display: contents`; formuläret läggs direkt efter bockarna, kontaktrutorna sist | Annars låg formuläret en hel skärm under där CTA:n landar. |
| Varför-filmen | `position: sticky` i högerspalten, sektionen har `overflow: clip` | `overflow: hidden` gör sektionen till skrollbehållare och sticky fastnar aldrig — lämnade 390 px tomt mörker under filmen. |
| Slöjan över heron | Tre varianter: dator (vänster→höger), surfplatta 761–1180 px (tätare och längre åt höger), mobil (uppifrån och ned) | Surfplattan föll till 4,2:1 på bevisraden när bara dator och mobil var mätta. QA:n mäter nu 768 och 1100 också. Text över film mäts med texten genomskinlig, inte dold — annars räknas inte brickans eget glas. |
| Formulärfält | Ram `#7C8BA1` (3:1 mot vitt), platshållare `#475569` | Webbläsarens grå platshållare och `#64748B` låg under 4,5:1 på den mjuka fältytan. |
| Fokusring | Dubbel: `outline 3px #0F172A` + `box-shadow 0 0 0 2px #fff`, offset 2 px | En ring i accentfärg gav 2,4:1 över herofilmen. Den dubbla syns mot allt. |
| Knapptext | Minst 16 px överallt, även mobilens Ring-knapp och sidfliken | |
| Motsatt ton | Varje yta i en sektion med motsatt ton sätter `color` explicit | Vitt formulärkort i mörk sektion, mörka kort i ljus — har slagit till tre gånger. |

## Steg 5 — Verifiering (obligatorisk före merge)

**Mät, tro inte.**

1. `cd web && rm -rf .next && npx next build`. (`readlink EINVAL` på
   `.next` = rensa mappen och bygg om. Aldrig två byggen samtidigt.)
2. `npx next start -p <port>` och kör QA-skriptet, som bor i skillens mapp:

   ```sh
   cp .claude/skills/hemsidor/qa.mjs web/qa.mjs && cd web
   node qa.mjs <route> <port> "<början på firmanamnet>" "<förra leadets namn|lorem>" <betyg ja|nej> <inbaddat|kort|ingen>
   ```

   **Ta bort `web/qa.mjs` före commit.** Skriptet kontrollerar på 1440 och
   390 px: sektionsordning, exakt en h1 i Bebas Neue som ryms på raden, att
   siffer-raden är borta, headerns toning, logotypen mitt i pillret, kontrast
   över filmen i fem bildrutor (h1, ingress, bevisrad, header, kontaktrubrik),
   **kontrast på all övrig text**, minst tre formulärknappar + popup + sidflik,
   tjänstekortens bilder, att banden rör sig åt var sitt håll, mörk
   Varför-sektion, filmens längd och ljusa slutbild, logotypen i Om oss och
   footer, omdömesreglerna, Instagram-inbäddningarna (HTTP 200), frågorna,
   formuläret, att all media laddar och att ingen bild står i två sektioner,
   versalrader, sidledsskroll, tryckytor ≥ 44 px, minskad rörelse.
3. **`color-mix()` svarar `color(srgb 1 1 1)`**, inte `rgb(…)`. Ett
   mätskript som läser det som rgb ser vitt som svart — det gav ett falskt
   underkänt 2026-09-18 och en onödigt mörk slöja. Skriptet hanterar det;
   egna mätningar måste också.
4. **Titta på bilderna** i `.tmp/<route>/qa/`: hero, varje sektion, footer, i
   båda bredderna — och `*-varfor-slutbild.png`, där logotypen ska synas.
5. `md5sum web/public/<kund>/media/*` — unika hashar = antal filer. Och ingen
   fil i mappen som sidan inte använder.
6. Färgerna i `tema` mätta mot kraven i tabellen ovan.

## Steg 6 — Leverans

- Leadfilen `content/leads/<kund>.md` (vad som är verifierat, flaggor, DM-utkast)
  och en rad i `content/leads/demolankar.md`.
- Gren från färsk `origin/main` (`git fetch` först). Lägg bara till demons
  egna sökvägar — **aldrig `git add -A`** (junctions i `.claude/skills/`, och
  Brommas filer hör inte hit). Commit-meddelanden med citattecken skrivs till
  fil: `git commit -F`, `gh pr create --body-file`.
- **Ingen merge utan att Mathias skriver "merga".** Batcha flera demos i EN
  pull request — varje push och merge kostar deploys, och taket delas med
  kundsajterna.
- Efter merge: kontrollera deployen via Vercel (`list_deployments`) eller
  `gh api repos/BahkoStudio/BahkoByra/commits/<sha>/status`. **Polla aldrig
  bahkobyra.se** — hela domänen 403:ar från Mathias IP.
- Ersätter demon en redan skickad länk under `/cloud/<kund>/`: redirect i
  `next.config.mjs` (mönstret finns — sök på shabifix). Filen är helig.
- Flagga i leveransen: saknad logotyp, obekräftat firmanamn, exempelomdömen,
  lånade eller genererade bilder, och varje kontroll du inte kunde köra.
- Varje leverans följs av en färdig mejl-/DM-text på högst två meningar.
- **Ändras arbetssättet ska det in i den här filen**, och den globala kopian
  `~/.claude/skills/hemsidor/` synkas (SKILL.md + qa.mjs) — en skill som bara
  låg i repot var en gång osynlig och kostade ett helt demobygge.

## Varför skillen finns

En lead ska kunna få ett förslag samma dag, byggt på sanningen om just den
kunden, som ser ut som något ett stort bolag har betalt för. Mallen är färdig
— det enda nya är kunden.
