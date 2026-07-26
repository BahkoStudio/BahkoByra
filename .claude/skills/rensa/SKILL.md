---
name: rensa
description: Use when the user wants to clear the chat but keep what matters — "rensa chatten", "/rensa", "spara och rensa", "clear men behåll det viktiga", "save before clear", "rensa kontexten". Distills ONLY the essential state to a file that survives /clear, then hands off to the built-in /clear command.
disable-model-invocation: true
argument-hint: [valfri anteckning om vad som ska bevaras]
---

# Rensa (spara nödvändigt → /clear)

Destillerar **endast det nödvändiga** från den pågående sessionen till en liten fil som överlever `/clear`, så att en ny session kan plocka upp exakt där du släppte. Allt annat kastas medvetet.

`/clear` är ett inbyggt CLI-kommando som denna skill INTE kan köra åt dig. Den här skillen sparar först det som behövs, och säger sedan åt dig att köra `/clear` själv.

## Grundprincip: minimalism

Målet är **inte** en fullständig sammanfattning (det gör `session-handoff`). Målet är den minsta möjliga mängd information som krävs för att fortsätta. Om något kan återupptäckas trivialt av nästa agent (t.ex. via `git status` eller genom att läsa en fil) — ta INTE med det. När du är osäker: utelämna.

Ta bara med det som en ny agent omöjligt kan gissa sig till:
- **Aktiv uppgift** — vad höll vi på med, i en mening.
- **Beslut som är låsta** — val som redan är gjorda och inte ska omprövas.
- **Nästa steg** — den enda mest sannolika nästa handlingen.
- **Filer som rörts denna session** — bara sökväg + varför (inte innehåll).
- **Körande tillstånd** — bakgrundsprocesser (shell-ID + hur man dödar), portar, öppna branches/worktrees. Utelämna sektionen bara om det verkligen är tomt (skriv "inget").
- **Olösta frågor** — det du frågade användaren men aldrig fick svar på.

Ta INTE med: hela resonemang, kod som redan är committad, saker som git/filsystemet redan vet, artighetsfraser, retrospektiv.

## Steg

1. **Gå igenom hela sessionen**, inte bara de senaste turerna.
2. **Destillera** enligt minimalism-principen ovan. Om `$ARGUMENTS` finns, behandla det som en uttrycklig instruktion om vad som MÅSTE bevaras.
3. **Skriv filen** `.tmp/session-context.md` (skapa `.tmp/` om den saknas) enligt mallen nedan. Skriv över eventuell tidigare fil — detta är den aktuella kontexten, inte en logg.
4. **Bekräfta i chatten** med sökvägen och en enradssammanfattning av vad som sparades.
5. **Säg åt användaren att köra `/clear`** och att en ny session ska börja med att läsa `.tmp/session-context.md`.

## Mall — använd exakt denna struktur

```
# Sessionskontext — <en rad om vad detta handlade om>
Sparad: 2026-07-26

## Aktiv uppgift
<en mening>

## Beslut (låsta, ompröva inte)
- <beslut> — <varför>

## Filer som rörts
- `<absolut sökväg>` — <varför den är relevant>

## Körande tillstånd
- Bakgrundsprocesser: <shell-ID + vad + hur man dödar> — eller "inget"
- Portar / dev-servrar: <url + port> — eller "inget"
- Branch / worktrees: <namn/sökväg> — eller "inget"

## Olösta frågor
- <fråga som väntar på användarens svar> — eller "inga"

## Plocka upp här
<1 mening: den enskilt mest sannolika nästa handlingen>
```

## Hårda regler

1. **Filen skrivs alltid till `.tmp/session-context.md`.** Den är gitignorad och överlever `/clear` (som bara rensar konversationen, inte disken). Committa den aldrig.
2. **Kör aldrig `/clear` själv** — det går inte, och du får inte låtsas att du gjort det. Be användaren köra det.
3. **Uppfinn aldrig tillstånd.** Har en sektion inget att rapportera — skriv "inget"/"inga", utelämna den inte.
4. **Absoluta sökvägar** för filer och shell-ID för bakgrundsprocesser — annars hittar nästa agent dem inte.
5. **Minimalism slår fullständighet.** Är du osäker på om något behövs — utelämna det. Filen ska gå att läsa på 20 sekunder.
6. **Inga emojis, ingen hype.** Tersa, konkreta rader.

## Skillnad mot session-handoff

`session-handoff` producerar en fyllig sammanfattning **i chatten** (inget skrivs till disk). `rensa` gör motsatsen: skriver **endast det nödvändiga till en fil** som överlever `/clear`. Använd `rensa` när du faktiskt tänker rensa kontexten; använd `session-handoff` när du vill ha en läsbar överlämning i chatten.
