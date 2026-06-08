---
name: grill-me
description: Interview the user relentlessly about a plan or design until reaching shared understanding, resolving each branch of the decision tree. Use when user wants to stress-test a plan, get grilled on their design, or mentions "grill me".
---

# Grill Me

Interview me relentlessly about every aspect of this plan until we reach a shared understanding.
Walk down each branch of the design tree resolving dependencies between decisions one by one.

If a question can be answered by exploring the codebase, explore the codebase instead.

For each question, provide your recommended answer.

## How to run it

1. **Ground first.** Before asking anything, explore the codebase / read the relevant files so your
   questions are sharp and you don't ask what the code already answers.
2. **Walk the design tree.** Identify the forks that everything else hangs on, then resolve them in
   dependency order — earlier answers shape later questions.
3. **Ask in rounds.** Use `AskUserQuestion` (max 4 per round). Keep going round after round until the
   tree is resolved — that's the "relentless" part. Don't stop at one round if branches remain open.
4. **Recommend every time.** For each question, put your recommended option first and mark it
   "(Recommended)" with a one-line reason. Never ask a bare question without your own answer.
5. **Reflect decisions back.** After each round, restate what got decided in one line so drift is caught.
6. **Finish.** When the tree is resolved, summarize the decisions and (in plan mode) write the plan.

## Notes

- One decision at a time; surface dependencies ("if A then B becomes irrelevant").
- Prefer concrete, mutually exclusive options over open-ended prompts.
- If the user contradicts an earlier answer, flag it and re-resolve the affected branch.
