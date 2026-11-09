# The six loops

Same engine for all of them: interview, preflight, teardown, loop. What changes is
the pieces, the three critics, and what counts as a mechanism in `bar.md`.

Write every critic brief yourself, adapted to the actual job. The briefs below are
the lens each critic looks through, not wording to paste.

All critic verdicts and all output to Mathias in **Swedish**. He is not technical:
name the defect in plain words, then the fix.

---

## 1. Copy loop

**Trigger:** "copy-loop", "loop copyn", "världsklass copy"

**Pieces:** hook or headline · body · the offer · the proof · the CTA.
Judge each on its own. A brilliant headline on a limp offer still loses.

**Critics**

| Critic | Passes only if |
|---|---|
| Löfte | There is **one** promise, it names a result the reader already wants, and a stranger can repeat it after one read. Fails on: two competing promises, a benefit so general it fits any firm, adjective stacking instead of a claim. |
| Bevis | Every claim is either verifiable or explicitly framed as an example. **Zero invented numbers, ratings, project counts, years or named references.** Fails instantly on one fabricated fact, no matter how good the sentence is. |
| Röst | Nothing in [ai-tropes.md](ai-tropes.md) is tripped: zero **never**-items, under three hits of anything else, counted and reported as numbers. It survives being read out loud. Sounds like one person talking to one person. Fails on: corporate hedging, stacked subordinate clauses, words nobody says in a phone call. For outreach also: greeting present, sign-off present, no em dashes. |

**Mechanisms for `bar.md`** — pull these off the reference, do not assume:
average sentence length · longest sentence · one idea per sentence or not ·
concrete nouns vs abstractions per 100 words · how many words before the promise
appears · does the CTA name an action or a feeling.

**Hard rule for this loop:** Bahko sells to real named firms. A fabricated fact in
copy that reaches a prospect is worse than weak copy. Bevis-kritikern outranks the
other two — if it fails, nothing else matters that round.

---

## 2. Animation loop

**Trigger:** "animeringsloop", "loop animationen", "loop rörelsen"

**Pieces:** entry · scroll choreography · interaction and hover · exit and loop point.

**Preflight is stricter here.** No filmstrip means no craft critic, and then this loop
does not run. Capture frames with the CDP tooling in `tools/demo/` (`webb.mjs` gives a
fresh browser context per shot, which is what makes two runs comparable). Freeze the
clock, or every run differs and the critic judges noise.

**Critics**

| Critic | Passes only if |
|---|---|
| Rörelse | Every motion resolves in one direction. Durations sit inside the floor and ceiling from `bar.md`. Easing is consistent across the piece. Fails on: things that animate and then settle backwards, two easings doing the same job, motion under the floor that reads as a glitch. |
| Prestanda | **Measured, not guessed.** Frames held on a throttled phone, no layout thrash, nothing animating a property that forces reflow. Fails on: jank the critic can see in the filmstrip, or animation that runs before the content it decorates exists. |
| Craft | Our filmstrip beside the reference filmstrip, labels stripped. Says which is better and names the single biggest gap. |

**Mechanisms for `bar.md`:** shortest and longest duration · how many things move at
once · stagger between siblings · does anything move on load or only on intent ·
distance travelled relative to element size · what stays completely still.

**Known trap in this repo:** an inline `<script>` must never carry `defer`, and library
flags must be measured *after* the deferred CDN scripts run — otherwise the whole motion
layer dies silently and the page just looks static. Check that before blaming the design.

---

## 3. Structure loop

**Trigger:** "strukturloop", "loop strukturen", "loop upplägget"

**Pieces:** navigation · section order · heading hierarchy · findability of the one
thing the page exists for.

**Critics**

| Critic | Passes only if |
|---|---|
| Hitta | A first-time visitor reaches the page's purpose — the offer, the phone number, the next step — inside the tap budget from `bar.md`. **Counted, not estimated.** Fails on: any dead end, any place where the next step is not visible without scrolling back. |
| Hierarki | Exactly one h1. No skipped levels. Every section is scannable from headings alone, and the headings alone tell the story. Fails on: headings that need the body text to make sense, or a section whose heading and content disagree. |
| Dubblett | The same content does not live in two places. Measured element-aware: split prose per `<p>` and `<li>`, never across the whole section — joining headings and table cells manufactures fake sentences and fake duplicates. Fails on any real duplicate that is not a deliberate summary index. |

**Mechanisms for `bar.md`:** taps to the primary action · sections above the fold ·
how many navigation items · does every section end pointing somewhere · screens of
scroll per section · what the reference chose *not* to include.

**Lesson that earned this loop:** merging four sections into one removed a whole class of
"which page was that on" friction. Fewer, deeper sections usually beat more, thinner ones.

---

## 4. Quality loop

**Trigger:** "kvalitetsloop", "loop kvaliteten", "loop kvalitén"

**Pieces:** reachability · robustness · truthfulness · weight.

**Critics**

| Critic | Passes only if |
|---|---|
| Tillgänglighet | Every **standalone** control is at least 44×44. Body text clears 4.5:1, large text 3:1. Everything reachable by keyboard with visible focus. Fails on any standalone control under 44. Links inside a sentence are exempt — forcing 44 px on an inline link breaks the line it sits in. |
| Robusthet | Nothing disappears if the script fails: reveal animations gated so content shows without JS. No duplicate ids. No dead internal links, no dead keyboard shortcuts, no button pointing at something that was deleted. Fails on any one of those. |
| Sanning | Zero fabricated claims about a real client or customer. Placeholders are visibly placeholders. Contradictions between pages are defects, not style. |

**Mechanisms for `bar.md`:** smallest tap target · lowest contrast ratio ·
total page weight · number of blocking resources · what happens with JS off.

**Verify the measuring tool before you trust it.** This is the rule that matters most in
this loop, and it is written from two real failures:

- Contrast: a semi-transparent background **must** be composited against its parent chain
  before the ratio is computed. Treating `rgba(220,38,38,.055)` as solid red compared grey
  text against saturated red and reported "1:1" on text that was perfectly legible.
- Readability: splitting a whole section on sentence punctuation glues headings and table
  cells into sentences that were never written. It reported 21 words per sentence where the
  real figure was 11.

Both would have led to "fixing" things that were not broken, which makes the page worse.
Before reporting any measured defect: check one instance by hand and confirm the number
describes reality.

---

## 5. Customer loop

**Trigger:** "kundloop", "loop för fler kunder", "loop konverteringen"

The one that pays. Target: a construction or trades firm's site should make a homeowner
call **them** instead of the next firm in the search results.

**Pieces:** the first five seconds · the reason to choose them · the proof · the path to contact.

**Critics**

| Critic | Passes only if |
|---|---|
| Kund | Read as a homeowner whose roof leaks, on a phone, with three firms open in three tabs. Would you call **this** one? The critic must name what made it choose, or what made it leave. Fails on: cannot tell what they do, cannot tell where they work, nothing that separates them from the other two tabs. |
| Friktion | **Counted on a phone:** taps to the phone number, taps to a quote request, seconds to first meaningful paint. Fails on: number hidden behind a menu, quote button only in the footer, any step that needs pinch-zoom. |
| Trovärdighet | Photos are of real jobs, not stock. A real person is named or shown. Claims are theirs, not ours. Fails on: stock photography of models in hard hats, invented reviews, invented project counts — and on a placeholder that looks like real data. |

**Mechanisms for `bar.md`:** what the reference shows in the first screen ·
where the phone number sits · before/after or process shots · how the offer is phrased ·
what proof appears before any claim.

**Read the target the way its customers do:** open it on a phone, not a desktop. The
mobile view is the one that decides. This is the same instruction the calling SOP gives a
salesperson looking for the pain, and it is the right one here too.

---

## 6. Script loop

**Trigger:** "manusloop", "script-loop", "loop manuset", "loop scriptet"

Long-form narration for **Beast of Ages** — wildlife, told so a 12-year-old follows every
UNIKHETSKONTROLL — INNAN ribban eller paketet skrivs, utan undantag:
sok idens exakta fraga med vidiq_youtube_search (order: viewCount). Algoritmen pushar
inte liknande ideer — VARJE IDE MASTE VARA UNIK. En farsk eller synlig video med samma
ide dodar iden, oavsett hur bra manuset skulle bli. FORMATET far lanas, IDEN maste vara
ny. Exempel pa dodsfall: Pig Milk skrevs 2026-08-24 och stoppades efter bygget, for
Knapp sjalv hade publicerat exakt samma fraga tolv dagar tidigare (53 438 visningar) —
kontrollen skulle gjorts FORE loopen, inte efter. Sma osynliga versioner (hundratals
visningar) dodar inte iden; en synlig eller farsk gor det. Ar det tveksamt: fraga Mathias.

sentence. Length: HARD CAP 2000 words, roughly 13 minutes at 150 words a minute
(Mathias beslut 2026-08-24). Galler aven nar forlagan ar langre: en 25-minuters
forlaga modelleras genom att komprimera dess akter, aldrig genom att matcha dess langd.
Offra forlagans utvikningar, aldrig dess dramaturgi.

The bar is already extracted: [manus-forlaga.md](manus-forlaga.md), eleven mechanisms
taken off the two reference scripts Mathias supplied. Start `bar.md` from those, then cut
the ones that don't fit the episode. Confirm in Phase 1 what "wildlife" means for this
channel — living animals, extinct megafauna, or both — and do not assume.

**Pieces:** cold open · the turn · the escalation · the landing.
Four pieces, because a script is read in order and a weak open kills a strong middle.

**Critics**

| Critic | Passes only if |
|---|---|
| Hook | The first paragraph contains the outcome, not the setup. A viewer who reads only the first 60 words wants the next 60. Every section transition is a question the viewer is already asking. Fails on: scene-setting before the first surprise, any paragraph that could be deleted without loss, "Additionally" or "Furthermore" doing the work of a transition. |
| Klarhet | **Measured, not felt.** Counted against [ai-tropes.md](ai-tropes.md) as well — narration tolerates short sentences, but not a wall of fragments with no long sentence anywhere. Average sentence under 14 words. No sentence over 25. Every abstraction cashed out in a concrete image within the same or next sentence. Every number above a million anchored to something picturable. Zero words a 12-year-old would have to look up, unless the script defines it in the same breath. Fails on: three long sentences in a row, an undefined term, a raw figure with no anchor. |
| Craft | Ours beside the reference scripts, labels stripped, judged on the mechanisms in `bar.md`. Says which is better and names the single biggest gap. |

**Hard gate before the critics: Fakta.**
Every animal claim must be real and checkable. Wildlife content is where false facts
spread fastest and live longest, and the audience is children. One invented behaviour,
speed, bite force, lifespan or population figure fails the round outright, no matter how
good the writing is — same standing the Bevis critic has in the copy loop.

Two specific traps:
- **No invented villain.** Both reference scripts run on corporate villainy. An animal has
  no malice. Tension comes from survival odds, time pressure, or a fight it cannot win by
  strength. Attributing intent to an animal is the wildlife equivalent of a fabricated stat.
- **No invented individual.** Following one named animal is the strongest mechanism in the
  references, but if the individual is a composite, say so in the script. Presenting an
  invented animal as a documented one is a fabrication.

**Leveransen ar inte bara manuset.** Varje manus levereras med ett paket, och paketet
skrivs FORE manuset — det ar det som avgor om nagon overhuvudtaget ser videon.

1. **Titel plus nio alternativ.** Tio totalt. Varje titel maste innehalla ett djur en
   tolvaring kan rita utan hjalp. Species Decoder fick 54 151 visningar pa megalodon och
   154 pa stegosaurus med samma mall, samma langd, samma produktion — djuret var hela
   skillnaden.
2. **En thumbnail-prompt.** Korbar rakt in i en bildgenerator, med den text som ska sta i
   bild angiven separat. En prompt, inte fem forslag.
3. **En kort beskrivning.** Vad videon svarar pa, inte en sammanfattning av den.
4. **En pinnad kommentar, HOGST tva meningar.** Skriven for att fa svar, inte for att
   informera. Den ar en fraga, inte ett pastaende.
5. **En CTA som pekar pa den SENASTE videon pa kanalen.**

## CTA-regeln — galler varje video utan undantag

Avslutningen ska alltid skicka tittaren till Beast of Ages senaste video, sa att kanalen
ses som en serie och inte som losa klipp. Det galler pa tre stallen: sista raden i manuset,
forsta raden i beskrivningen, och den pinnade kommentaren.

**Hamta den senaste videon innan du skriver CTA:n.** Gissa aldrig vilken den ar:

    vidiq_channel_videos({ channelId: 'UCWxSYqJuIrRX92qZTEm2XwA',
                           videoFormat: 'long', popular: false })

`popular: false` ger senaste uppladdningarna, `true` ger de mest sedda. Du vill ha
senaste. Anvand dess faktiska titel i CTA:n, inte en omskrivning.

Kopplingen ska vara ETT AMNE, inte en artighetsfras. "Check out my last video" ar bortkastat.
"The wolf you just watched has a cousin nobody can find — that one is up next" fungerar,
for den bar over nyfikenheten fran videon tittaren just sett.

Titlar och thumbnails doms mot samma sak som manuset: vad som faktiskt far klick i nischen,
matt pa riktiga utliggare — inte pa vad ett verktyg poangsatter. En video pa kanalen fick
88 av 100 i vidIQ och 249 visningar.

## Testa eller dubbla ner — avgors INNAN manuset skrivs

Ordningen ar fristaende video → format → subnisch. Enskilda videor testas for att hitta
format. Tva eller tre vinnande format blir subnischen. Formatet uppfinns inte i forvag.

**Utliggarribban ar 3 000-5 000 visningar.** Under den finns inget att dubbla ner pa, och
da ar varje ny video ett test av ett NYTT format.

Fraga forst vilket lage kanalen ar i:

1. **Testlage.** Ingen video over ribban an. Skriv ett format som inte provats. Hogst 1-3
   videor i samma format — fungerade det inte forsta gangen, inte andra och mojligen inte
   tredje, ga vidare. Det vanligaste misstaget ar tjugo videor fordelade pa tre format.
2. **Nedslagningslage.** En video har passerat ribban. Identifiera FORMATET, inte amnet, och
   gor en till. Mat. Fler visningar an originalet betyder fortsatt tills det planar ut. Farre
   visningar ger ett forsok till — slar inget av dem originalet, sluta och ga tillbaka till
   att testa.

**Rakna med att en nedslagning ger farre visningar an originalet.** Det ar normalt.
300 000 foljt av 50 000, 80 000, 10 000, 2 000 ar en normal serie som avbryts efter den
fjarde. 10 000 foljt av 4 000 avbryts direkt.

En nedatgaende serie i manga steg betyder att spret ar slut. Beast of Ages direktvargsspar
gick 464 165 → 74 041 → 47 576 → 20 749 → 17 497 → 17 426 → 12 379 → 10 285 → 9 677. Nio
steg nedat utan en enda uppgang. Det ar inte ett format att gora en tionde video pa.

Testa hela tiden parallellt, aven nar en nedslagning fungerar. Varje nytt vinnande format
laggs till i rotationen.

**Skriv aldrig ett forbud mot att dubbla ner.** Att en klon floppade betyder att det
formatet skulle stoppats efter forsta forsoket, inte att kloning ar fel. Ett generellt
forbud kostar varje vinnande formats andra och tredje video.

**Mechanisms for `bar.md`** beyond the eleven in the förlaga: words before the first
surprise · number of escalation rungs the word budget allows · how many analogies ·
what the last sentence leaves open.

---

## Combining loops

Run one at a time. Two loops at once means two definitions of "better" and a builder
that satisfies neither. If a piece keeps failing the same critic across three rounds,
the problem is upstream of the piece — stop the loop and say so rather than grinding.

Order that tends to work when several apply: **structure → copy → customer → quality → animation.**
Structure decides what exists, copy decides what it says, the customer loop decides
whether it lands, quality makes it hold, animation is last because it decorates decisions
already made.
