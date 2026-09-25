# Higgsfield API — bilder och film till demos

Sedan 2026-09-23 genereras demomedia via Higgsfields API, betalt per generering i
dollar, i stället för med `higgsfield`-CLI:t och abonnemangskrediter.

## Nyckeln

1. Skapa konto på <https://console.higgsfield.ai>, fyll på saldot (minst $5) och
   skapa en API-nyckel. Den består av ett **nyckel-ID** och en **hemlighet**, och
   hemligheten visas bara en gång.
2. Skriv in dem i `tools/hf-api/.env.local`, på en rad med kolon emellan:

   ```
   HF_CREDENTIALS=nyckel-id:hemlighet
   ```

   Filen ignoreras av Git (`.env.local` står i `.gitignore`). Både `hf.mjs` och
   SDK-exemplet läser den när de körs och skriver aldrig ut nyckeln.

**Lägg aldrig nyckeln i repot eller i en chatt.** Repot är publikt.

Kontrollera nyckeln gratis:

```sh
node tools/hf-api/hf.mjs test
```

## SDK-exemplet

`index.mjs` visar hur Higgsfields officiella SDK (`@higgsfield/client`) används,
med en Seedance 2.5-film på 5 s i 720p. **Kör det inte.** Mathias 2026-09-23:
Seedance är för dyr. Använd `hf.mjs test` för att kontrollera nyckeln.

## Användning

```sh
node tools/hf-api/hf.mjs modeller                      # modeller och priser
node tools/hf-api/hf.mjs bild --modell qwen --prompt-fil p.txt --format 16:9 --ut A.png
node tools/hf-api/hf.mjs bild --modell qwen --prompt-fil p.txt --ref A.png --ut B.png
node tools/hf-api/hf.mjs film --modell kling --start A.png --slut B.png --prompt-fil f.txt --sek 5 --ut film.mp4
node tools/hf-api/hf.mjs pris film --modell wan --start A.png --slut B.png --res 1080p   # bara pris
node tools/hf-api/hf.mjs ra <endpoint> '<json>' --ut fil                                # valfri modell
```

Verktyget skriver ut priset före varje körning, laddar upp lokala filer, väntar in
resultatet och sparar det. Misslyckade körningar debiteras inte.

## Jämförelsetestet (körs en gång när nyckeln finns)

Mathias krav 2026-09-23: inte Seedance 2.5, utan något **billigare och minst lika
bra**. Testet använder Sam Flytts vardagsrum, där facit redan finns: A- och
B-bilden är gjorda med Nano Banana 2, och filmen med Seedance 2.5 i 1080p.

```sh
T=.tmp/samflytt/film
# Film: samma A → B genom tre billiga modeller ($0,36 + $0,48 + $0,50 = $1,34)
node tools/hf-api/hf.mjs film --modell kling --start $T/A.png --slut $T/B.png --prompt-fil $T/p-film.txt --sek 5 --ut $T/test-kling.mp4
node tools/hf-api/hf.mjs film --modell kling-pro --start $T/A.png --slut $T/B.png --prompt-fil $T/p-film.txt --sek 5 --ut $T/test-kling-pro.mp4
node tools/hf-api/hf.mjs film --modell wan --start $T/A.png --slut $T/B.png --prompt-fil $T/p-film.txt --sek 5 --res 720p --format 9:16 --ut $T/test-wan.mp4
# Bild: B-bilden ur A ($0,075 + $0,08 = $0,16)
node tools/hf-api/hf.mjs bild --modell qwen --prompt-fil $T/p-B.txt --ref $T/A.png --format 9:16 --ut $T/test-B-qwen.png
node tools/hf-api/hf.mjs bild --modell grok --prompt-fil $T/p-B.txt --ref $T/A.png --format 9:16 --ut $T/test-B-grok.png
```

Varje film döms mot `film-raw.mp4` med samma bildrutenät (`select` + `tile`):
rummet och kameran ska hålla hela vägen, arbetet ska synas och inget får morfa
fram. Vinnaren skrivs in i `.claude/skills/hemsidor/SKILL.md` under
"Var pengarna läggs".
