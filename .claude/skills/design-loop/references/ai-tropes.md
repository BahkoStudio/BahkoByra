# AI writing tropes to avoid

Checklist for any loop that produces prose. Source: tropes.fyi by ossama.is.

A text that trips these reads as machine-written even when the argument is good. In the
copy loop this is the **Röst** critic's checklist. In the script loop it belongs to
**Klarhet**. Treat a hit as a defect, not a preference.

One caveat before using it: a single instance of most of these is fine and sometimes
good. The tell is repetition. One negative parallelism in a piece can land; ten is an
insult to the reader. Judge frequency, not existence — except for the ones marked
**never**, which are dead on first use.

---

## Word choice

### Magic adverbs
"Quietly" and friends, used to make a mundane description feel significant. Also:
deeply, fundamentally, remarkably, arguably.

Bad: "quietly orchestrating workflows, decisions, and interactions" · "the one that
quietly suffocates everything else" · "a quiet intelligence behind it"

### Delve and its family
"Delve" went from an uncommon word to an AI signature. Same family: certainly, utilize,
leverage as a verb, robust, streamline, harness.

Bad: "Let's delve into the details" · "We certainly need to leverage these robust
frameworks"

### Tapestry and landscape
Grandiose nouns where a plain word works. Anything interconnected becomes a tapestry;
any field becomes a landscape. Also: paradigm, synergy, ecosystem, framework.

Bad: "the rich tapestry of human experience" · "navigating the complex landscape of
modern AI" · "the ever-evolving landscape of technology"

### The "serves as" dodge
Replacing "is" with serves as, stands as, marks, represents. The repetition penalty
pushes models away from plain copulas.

Bad: "The building serves as a reminder of the city's heritage." · "The station marks a
pivotal moment in the evolution of regional transit."

---

## Sentence structure

### Negative parallelism — **never** more than one per piece
"It's not X, it's Y." The most recognised AI tell there is. Includes the causal variant
"not because X, but because Y", the dismissal "X, not Y", and the cross-sentence
reframe: "The question isn't X. The question is Y."

Bad: "It's not bold. It's backwards." · "Feeding isn't nutrition. It's dialysis." ·
"Half the bugs you chase aren't in your code. They're in your head."

### Not X. Not Y. Just Z.
The dramatic countdown. Negate two things to manufacture narrowing.

Bad: "Not a bug. Not a feature. A fundamental design flaw." · "Not ten. Not fifty. Five
hundred and twenty-three lint violations."

### The X? A Y.
A question nobody asked, answered immediately for drama.

Bad: "The result? Devastating." · "The worst part? Nobody saw it coming."

### Anaphora abuse
The same sentence opening three or more times running.

Bad: "They could expose... They could offer... They could provide... They could
create..."

### Tricolon abuse
One rule-of-three is elegant. Three in a row is pattern failure.

Bad: "Products impress people; platforms empower them. Products solve problems;
platforms create worlds. Products scale linearly; platforms scale exponentially."

### It's worth noting — **never**
Filler that signals nothing. Also: it bears mentioning, importantly, interestingly,
notably.

### Superficial analysis tacked on with -ing
An "-ing" phrase glued to the end of a sentence to add significance that isn't there.

Bad: "contributing to the region's rich cultural heritage" · "underscoring its role as a
dynamic hub of activity and culture"

### False ranges
"From X to Y" where X and Y aren't on any scale with a middle.

Bad: "From innovation to implementation to cultural transformation." · "From
problem-solving and tool-making to scientific discovery, artistic expression, and
technological innovation."

---

## Paragraph structure

### Short punchy fragments as paragraphs
One thought per line, no state to keep. Reads as machine cadence because no one writes
a first draft that way.

Bad: "He published this. Openly. In a book. As a priest." · "Platforms do."

Note for the script loop: the Beast of Ages references *do* use very short sentences,
deliberately, and it works there. The difference is that in narration they carry beats
of a story, and they are broken up by longer sentences. A wall of fragments with no
long sentence anywhere is still a defect.

### Listicle in a trench coat
A list disguised as prose by opening each paragraph with "The first... The second...
The third..."

---

## Tone

### Here's the kicker — **never**
False suspense before an unremarkable point. Also: here's the thing, here's where it
gets interesting, here's what most people miss, here's the deal.

### Think of it as...
The patronising analogy. Often less clear than the thing it explains.

Bad: "Think of it like a highway system for data." · "Think of it as a Swiss Army knife
for your workflow."

### Imagine a world where... — **never**
Futurism as persuasion.

### False vulnerability
Polished, risk-free admission that performs honesty. Real vulnerability is specific and
uncomfortable.

Bad: "And yes, I'm openly in love with the platform model" · "This is not a rant; it's a
diagnosis"

### The truth is simple
Asserting clarity instead of proving it. Includes the reveal variant: "but none of them
is the real story. The real story is..."

Bad: "The reality is simpler and less flattering" · "History is unambiguous on this
point"

### Grandiose stakes inflation
A post about API pricing becomes a meditation on civilisation.

Bad: "This will fundamentally reshape how we think about everything." · "will define the
next era of computing"

### Let's break this down
Teacher voice at an audience that doesn't need it. Also: let's unpack this, let's
explore, let's dive in.

### Vague attributions — **never**
"Experts argue", "industry reports suggest", "observers have cited". If you can't name
the source, you don't have one. Also covers inflating one person's view into "several
publications".

This one overlaps exactly with the Bevis critic in the copy loop and the Fakta gate in
the script loop. Same defect, three places it gets caught.

### Invented concept labels
Abstract problem-nouns bolted to domain words and used as if established: "the
supervision paradox", "the acceleration trap", "workload creep". Name a thing, skip the
argument.

---

## Formatting

### Em-dash addiction
A human writer uses two or three per piece, naturally. AI uses twenty.

For Bahko outreach this is already a hard rule: **no em dashes at all** in DMs or mail
to prospects.

### Bold-first bullets
Every list item opening with a bolded phrase. Very common in Claude output and almost
nobody writes lists that way by hand.

### Unicode decoration
Arrows, curly quotes, and characters you can't type on a normal keyboard. Real writers
in a text editor produce straight quotes and plain arrows.

---

## Composition

### Fractal summaries
Tell them what you'll say, say it, tell them what you said — at every level. Every
subsection summarised, every section summarised, the document summarised.

### The dead metaphor
Introducing one metaphor and using it thirty times. A human introduces it, uses it,
moves on.

---

## Using this in a loop

The Röst critic (copy) and Klarhet critic (script) get this file and report **counts**,
not impressions: how many em dashes, how many negative parallelisms, how many
bold-first bullets. Counts are checkable and don't drift between rounds the way "feels
a bit AI" does.

Fail the round on any **never** item, or on three or more hits of anything else.

One irony worth naming: this checklist is itself formatted with bold-first bullets and
arrows, because it is a lookup table and not prose. The rules apply to what we write,
not to the reference we write against.

## Byggarens guide

Kritikern räknar med den här filen. Byggaren skriver efter
[skriv-som-en-manniska.md](skriv-som-en-manniska.md) (inlagd 2026-11-09): kärnregler, format
per texttyp, Bahko Byrås röst i avsnitt 6 och checklistan i avsnitt 7. Ge byggaren den filen i
briefen, kritikern den här.
