# SOP: Onboarding & avtal

**När:** samma dag som kunden säger ja. **Mål:** på två dagar ska avtalet vara påskrivet,
första fakturan betald och allt material inne, så att bygget kan starta dag 2.

## Checklistan

| # | Steg | Vem | Mall |
|---|---|---|---|
| 1 | Skicka avtalet (PDF) samma dag som ja:et | Mathias | `mallar/avtal-struktur.md` |
| 2 | Skicka välkomstmejlet med materiallistan | Mathias | `mallar/valkomstmejl.md` |
| 3 | Avtalet påskrivet | Kunden | |
| 4 | Faktura 1 skickas enligt avtalet (hittills: del 1 av hemsidan + första månaden i samma faktura) | Mathias | fakturanummer `BAHKO-` + fyra siffror, löpande |
| 5 | Uppstartsmöte, 20 minuter | Båda | `mallar/uppstartsmote.md` |
| 6 | Tillgång till domänhost | Kunden | se materiallistan |
| 7 | Tillgång till Google Företagsprofil (Bahko Byrå som ansvarig) | Kunden | se materiallistan |
| 7b | Profilen verifierad. Saknas verifieringen startar kunden den från sitt eget konto under uppstartsmötet. Det är det enda steget vi inte kan göra åt kunden, och utan det står SEO-arbetet och garantin still | Kunden | `mallar/uppstartsmote.md` punkt 4 |
| 7c | GA4 och Search Console skapas under Bahkos Google-konto, rapportverktygets tjänstekonto får läsrätt | Claude | se materiallistan |
| 8 | Bilder, videor och tjänstelistan inne | Kunden | `mallar/materiallista.md` |
| 9 | Kunden upplagd: de fyra filerna enligt `kunder/_mall/README.md`, Notion-affären på "Kund" med kontaktperson, "Nästa faktura" och "Nästa samtal", rapportdagen och övriga åtaganden i `web/public/crm-f2822a6f3a/atagande.json` | Claude | |
| 10 | Betalning inne, bygget startar | Mathias | |

## Om något dröjer

- **Material saknas dag 2:** vi börjar ändå med våra egna bilder och kundens befintliga sajt.
  Avtalet säger att vi tar fram bilder och videor, och att kunden levererar egna om den inte
  är nöjd. Bygget stannar aldrig på grund av bilder.
- **Ingen tillgång till domänhosten dag 5:** ring, inte mejla. Utan den kan sidan inte gå live.
- **Faktura 1 obetald:** följ påminnelsetrappan i `4-ekonomi-admin/fakturering.md`. Bygget
  startar inte förrän del 1 är betald, och 7-dagarsklockan börjar först då.

## Avtalet i korthet (så att inget glöms i ett nytt avtal)

Avtalet utgår från samma sex sidor varje gång (`mallar/avtal-struktur.md`). Det som alltid
ska stå med: ingen bindningstid, att kunden äger sida och domän, vad som ingår i
månadsavgiften (underhåll, förbättringar och ändringar, SEO, uppföljning), betalningen i två
delar, tidplanen på 7 dagar, vad vi behöver av kunden, och garantin om en sådan är lovad.
Beloppen står i avtalet och offerten, aldrig i repot.
