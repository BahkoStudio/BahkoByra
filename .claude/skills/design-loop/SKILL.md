---
name: design-loop
description: Takes a goal and a real-world reference, extracts what actually makes the reference good, then runs builder and three fresh-context critics on every piece until all three agree ours wins. Six loops share the engine: copy, animation, structure, quality, customers, script. Triggers on "/design-loop", "design loop", "run the critic loop", "loop this against", "copy-loop", "loop copyn", "animeringsloop", "loop animationen", "strukturloop", "loop strukturen", "kvalitetsloop", "loop kvaliteten", "kundloop", "loop för fler kunder", "loop konverteringen", "manusloop", "script-loop", "loop manuset", "loop scriptet".
---

# Design Loop

Four phases: interview, preflight, teardown, loop. Do not skip ahead. Do not start building during phases 1 to 3.

## Pick the loop first

Six loops share this engine. They differ in what the pieces are, which three critics judge them, and what counts as a mechanism in `bar.md`. Full briefs: [references/loopar.md](references/loopar.md) — read the one you are running before Phase 1. The script loop already has its bar extracted: [references/manus-forlaga.md](references/manus-forlaga.md).

| Loop | Judges | Three critics |
|---|---|---|
| **Copy** | headline, body, offer, proof, CTA | Löfte · Bevis · Röst |
| **Animation** | entry, scroll, interaction, exit | Rörelse · Prestanda · Craft |
| **Structure** | navigation, order, hierarchy, findability | Hitta · Hierarki · Dubblett |
| **Quality** | reachability, robustness, truth, weight | Tillgänglighet · Robusthet · Sanning |
| **Customer** | first five seconds, reason, proof, path to contact | Kund · Friktion · Trovärdighet |
| **Script** | cold open, turn, escalation, landing | Hook · Klarhet · Craft |

If the user names a loop, run that one. If they describe a goal without naming one, say which loop you picked and why in one line, then continue. If two loops genuinely apply, run one and say which you are holding back — never both at once.

Answer in **Swedish**. Mathias is not technical: name the defect in plain words, then the fix.

Any loop that produces prose is also judged against [references/ai-tropes.md](references/ai-tropes.md) — the patterns that make text read as machine-written. The critic reports **counts**, not impressions: how many em dashes, how many "it is not X, it is Y", how many bold-first bullets. Counts are checkable and do not drift between rounds.

The builder in any prose loop gets [references/skriv-som-en-manniska.md](references/skriv-som-en-manniska.md) in its brief: the human-voice rules, the format for the text type, and Bahko Byrå's own voice (section 6). Critic gets the tropes list, builder gets the guide.

## Phase 1: Interview

Ask exactly these three, together, then stop and wait.

1. What are you building, and how long or how big?
2. Name something that already does this brilliantly. A site, a video, a doc, anything I can open. If nothing comes to mind, say skip.
3. Any files I should work from? Design system, brand doc, script, existing draft.

If they name something vague ("Apple's website", "good SaaS design"), push once for the specific page or file. A vague bar is the number one reason this method fails: the critic invents a comparison and approves everything on round one.

If they say skip on question 2, propose three candidate bars, one line each on why, and wait. If they do not answer, take the hardest one.

**If they lead with an idea instead of answering**, which is the normal case here — Mathias usually opens by pasting a concept he wants modelled — take the idea as the seed and keep asking the other two. The idea is the **subject**. The bar is the **standard**. They are different inputs and confusing them is a real failure: pasted reference material is not a brief, and a brief is not a bar. Say back in one line what you understood the idea to be, and what you are treating as the bar, before Phase 2.

## Phase 2: Preflight

A check, not a question. Run it before any work and report in one block.

- Fetch the bar now. Screenshot the URL or read the file. If it is blocked or missing, say so and ask for another.
- Confirm you can render our output: screenshots for a site, a filmstrip of frames for animation, a PDF render for a doc. No render means no craft critic.
- Name any generation tools the goal needs (image, video, voice) and confirm they are connected.
- Confirm the input files exist: design-system.md, brand doc, script.

Then print: what is working, what is missing, and **which critic goes blind** if something is missing. Never carry on quietly with a critic that cannot see.

Two blockers specific to this setup:

- **bahkobyra.se rate-limits automated requests.** Repeated polling triggers `X-Vercel-Mitigated: challenge` and every path on the domain returns 403 from this machine. If preflight hits it, say so and wait it out — do not keep requesting, that extends it. Verify deploys through git, never by polling.
- **Images have a cumulative limit in a long session.** If the main context can no longer read screenshots, the craft critic still can: it has fresh context. Hand it the file paths.

## Phase 3: Teardown

Read the reference properly and write 5 to 7 mechanisms to `bar.md`.

Mechanisms, not adjectives. "Feels premium" is useless. These are useful:
- headline is 5x body size, three type sizes total
- one accent colour, used at most twice per screen
- motion always resolves in one direction
- nothing animates for under 400ms
- whitespace above the fold is at least 40% of the frame

Every line must be something a critic can check by looking. The loop you picked decides *what kind* of mechanism counts — see its section in [references/loopar.md](references/loopar.md).

Show `bar.md` to the user before continuing.

## Phase 4: Loop

Split the goal into the smallest pieces that can be improved and judged on their own. The loop's own section names its usual pieces; you can override them. Keep it to three or four unless told otherwise, because every extra piece multiplies the run.

For each piece: fan out a builder, then the three critics for this loop, each with fresh context and no knowledge of how the builder worked.

Write each critic's brief yourself, adapted to this specific goal. Do not reuse generic wording across different goals.

Rules:
- Critics are harsh. Praise is not useful.
- Critics judge rendered output, never the code. Reading the implementation makes a critic evaluate intent instead of result.
- Binary verdicts, not scores. Scores drift upward every round.
- All three must pass. Any fail goes back to the builder with the single biggest gap named.
- No fixed round count. The exit is winning, or the user stopping the run.

Keep a live progress page updating as work evolves: piece status, each critic's verdict, gap history, round count.

## Shipping

**Ask before deploying.** Standing instruction. Commit locally as much as needed, but nothing gets pushed, PR'd or merged without an explicit yes.

When the yes comes: batch every round into **one** pull request. This repo has three Vercel projects that all build on any change — one push is 3 preview deploys, one merge is 3 production deploys. Six per round. The daily cap is shared with paying customers' sites, and hitting it blocks their updates for 24 hours too.

## Cost

There is no reliable self-reported token cost, so do not pretend to show one. Show round count and elapsed pieces instead.

If the user names a ceiling, treat it as a checkpoint: pause and ask before continuing past it. Tell them plainly that the real brake is them watching and stopping the run.

## What breaks this

- A vague bar. By far the most common failure.
- The builder judging its own work. Critics need fresh context.
- A soft critic. Binary job, not a score.
- A fixed round count. The exit is winning.
- Over-specifying. Every extra instruction is one fewer decision the model makes with its own judgment.
- **A measuring tool nobody checked.** A critic fed wrong numbers passes wrong work, or fails work that was fine. Confirm one instance by hand before reporting any measured defect — see the quality loop for two real cases where this cost real time.
