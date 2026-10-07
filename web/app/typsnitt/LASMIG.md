# Typsnitten ligger här, inte hos Google

Alla typsnitt på bahkobyra.se och i demosidorna laddas med `next/font/local` från den här
mappen. Ingen fil i `app/` får använda `next/font/google`.

## Varför

Med `next/font/google` hämtade bygget typsnitten från Google varje gång. 21 filer gjorde 54
sådana hämtningar samtidigt, och Google strypte en del av dem. Bygget föll då med

    An error occurred in `next/font`.
    TypeError: Cannot read properties of null (reading '1')

i en slumpvis demosida. Förhandsbyggena för #226, #229 och #230 föll så, och ett omförsök
hjälpte inte pålitligt. Med lokala filer gör bygget inga nätverksanrop för typsnitt alls.

## Filerna

Exakt de latin-filer Google serverade i oktober 2026, hämtade med Nexts egna funktioner för att
bygga förfrågan, så att sidorna ser likadana ut som förut. Latin räcker för svenska och norska
(å ä ö æ ø ingår).

- `*-variabel.woff2` är variabla typsnitt. En fil täcker alla vikter, och varje vikt sajten
  använder står som en egen rad i `src`, precis som Google gjorde det.
- Övriga filer är statiska och har en fil per vikt (Zilla Slab, Bebas Neue, Fraunces kursiv 600).

## Ny demo eller nytt typsnitt

Använd en fil som redan finns om det går. Behövs ett nytt typsnitt: hämta latin-filen från
Google Fonts en gång, lägg den här och använd `localFont` med samma mönster som de andra sidorna.
Serif-typsnitt får `adjustFontFallback: 'Times New Roman'`, annars blir reservtypsnittet Arial.
