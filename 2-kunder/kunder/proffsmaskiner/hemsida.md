# Proffsmaskiner Sverige AB — hemsida

| | |
|---|---|
| Live-URL | https://proffsmaskiner.se (**efter DNS-bytet**, se nedan). Tills dess: https://www.bahkobyra.se/proffsmaskiner/ |
| Gamla sajten | WordPress/Elementor byggd av Weblab, på 142.93.225.191 (nginx) |
| Källkod (i detta repo) | `web/app/(demo)/proffsmaskiner/` (en sida) och `web/public/proffsmaskiner/media/` |
| Kunddomänen | serveras av **samma Vercel-projekt** (`bahko-byra`) via `web/middleware.js`, som kakel0413.se |
| Org.nr | 559154-6329 |
| Adress | Bäckvägen 20, 192 54 Sollentuna (butik och hämtning) |
| Telefon / e-post | 08-545 899 90 · info@proffsmaskiner.se |
| Kontaktperson | Peter |
| Kund sedan | 2026-10-28 (avtal 2026-10-06) |
| Pris | 15 000 kr ex moms i två delar (7 500 vid start, 7 500 + första månaden 3 500 när sidan är live) + 3 500 kr/mån SEO och underhåll, utan bindningstid. Fakturor via Stripe, 7 dagar. |
| E-post hos kunden | Microsoft 365 (MX `proffsmaskiner-se.mail.protection.outlook.com`) — **får inte brytas vid DNS-bytet** |
| Formulär | `DemoFormular` med `KUND_NYCKEL` i page.js. TOM tills Peter verifierat en egen Web3Forms-nyckel för info@proffsmaskiner.se; tills dess landar förfrågningarna hos mathias@bahkobyra.se (demonyckeln) |

Peter är nöjd med förslaget som det är (Mathias 2026-10-28). Bilder och filmer byts bara på hans begäran.

## Domänen
Namnservrar: ns1–3.crossnet.net och ns4.crossnet.se, alltså **Crossnet** (svensk registrar och
webbhotell). Domänen är med stor sannolikhet registrerad hos Crossnet; bekräfta med Peter (står
på hans domänfaktura) eller via Internetstiftelsens domänsök. Webbplatsen ligger på en annan
server (142.93.225.191, nginx), troligen Weblabs. Mejlen går via Microsoft 365.

## Så går sidan live (Mathias i Vercel, Peter eller Crossnet i DNS)
1. Vercel → projektet `bahko-byra` → Settings → Domains → lägg till `proffsmaskiner.se` och
   `www.proffsmaskiner.se` (www → redirect 308 till apex). Vercel visar vilka DNS-poster som krävs.
2. DNS hos Crossnet (Peter loggar in, eller ger Mathias inloggning):
   - A `@` → **76.76.21.21** (ta bort 142.93.225.191)
   - CNAME `www` → **cname.vercel-dns.com**
   - **Rör inte** MX, TXT (SPF, DKIM, DMARC) eller autodiscover-poster: det är mejlen.
3. Vänta på att Vercel visar domänen som giltig (minuter till några timmar).
4. Kontrollera https://proffsmaskiner.se/ i mobilen: sidan, formuläret, robots.txt och sitemap.xml.
   Gamla adresser (`/om-oss/`, `/maskiner/`, `/kontakt/`, `/hyra-snoskoter/`) ska ge 301 till startsidan.
5. Byt `url` i `web/app/portfolj.js` till `https://proffsmaskiner.se/` och skicka faktura 2
   (7 500 + 3 500 kr ex moms) samma dag.
6. Google Search Console: lägg till proffsmaskiner.se (DNS- eller fil-verifiering), skicka in sitemap.

## Snöskotrarna
Gamla sajten har sidan `/hyra-snoskoter/` (uthyrning "i Norrbotten med omnejd"). Den nya sidan
nämner inte snöskotrar. Fråga Peter om den verksamheten ska vara med; i så fall en egen sektion
eller sida, annars räcker 301 till startsidan.
