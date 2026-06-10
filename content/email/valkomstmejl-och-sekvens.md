# Välkomstmejl & uppföljningssekvens — efter registrering

**Trigger:** någon fyller i ett formulär på bahkobyra.se (gratis analys, gratis guide eller nyhetsbrev).
**Tills automationen finns (MailerLite/Brevo):** skicka manuellt från mathias@bahkobyra.se samma dag.
**När automationen finns:** lägg in mejlen nedan som sekvens (0 min → dag 2 → dag 5 → dag 10).
**Regel:** "Växa på Google"-copy är OK här — det är bahkobyra.se-trafik (inbound), inte outreach.
**Snabbkopiering:** alla mejl finns även som kopieringskort i dashboarden (sektion "E-post efter registrering").

---

## 1. Välkomstmejl — GRATIS ANALYS (skicka direkt, 0 min)

**Ämne:** Er analys är igång — rapporten kommer inom 24h

Hej [Förnamn],

tack för förfrågan! Jag har tagit emot [Klinik]s webbadress och börjar granskningen idag.

Det här händer nu:
1. Jag går igenom er sajt mot alla 10 punkter (mobil, hastighet, lokal SEO, bokningsflöde m.m.)
2. Inom 24 timmar får ni en personlig rapport hit till er e-post
3. Konkret lista: vad som fungerar, och vad som kostar er patienter — utan säljpitch

Medan ni väntar: här är vår korta guide med de 3 viktigaste sakerna för att synas
högre på Google → https://www.bahkobyra.se/kliniker/gratis-guide.html

Hörs inom 24 timmar!

/Mathias, Bahko Byrå
mathias@bahkobyra.se

---

## 2. Välkomstmejl — GRATIS GUIDE (skicka direkt, 0 min)

**Ämne:** Din guide: 3 sätt att ranka högre på Google

Hej [Förnamn],

kul att du vill synas högre på Google! Guiden + videon är upplåst här:
https://www.bahkobyra.se/kliniker/gratis-guide.html

Kortversionen — börja med detta redan idag:
1. **Fyll Google Företagsprofilen till 100 %** — rätt huvudkategori, alla tjänster, minst 10 riktiga foton
2. **Sätt recensioner i system** — be varje nöjd kund samma dag, mål 1–2 nya/vecka
3. **Samma namn/adress/telefon överallt** — sajt, Google, Hitta, Eniro, Facebook

Tips 1 ger oftast synlig rörelse inom ett par veckor.

PS: Vill du veta exakt var just din klinik ligger idag? Vi gör en gratis 10-punktsanalys
av er sajt — svar inom 24h → https://www.bahkobyra.se/kliniker/gratis-granskning.html

/Mathias, Bahko Byrå

---

## 3. Uppföljning — DAG 2 (värde, ingen pitch)

**Ämne:** Det vanligaste misstaget vi ser på kliniksajter

Hej [Förnamn],

snabb fråga: hur många klick tar det att boka en tid på er sajt — från startsidan, i mobilen?

Det är det första vi kollar i varje granskning, för det är där flest bokningar försvinner.
8 av 10 besökare sitter i mobilen, ofta på kvällen. Om bokningsknappen inte syns direkt,
eller formuläret kräver fem steg, går de vidare till nästa klinik i listan.

Testa själv ikväll: öppna er sajt i mobilen och ta tid på hur lång tid det tar att boka.
Mer än 30 sekunder = ni tappar patienter varje vecka.

Vill du att jag tittar? Jag spelar gärna in en kort video med exakt vad jag ser på er sajt — gratis.
Svara bara på det här mejlet.

/Mathias, Bahko Byrå

---

## 4. Uppföljning — DAG 5 (personlig knuff)

**Ämne:** 2 minuter om [Klinik]s sajt?

Hej [Förnamn],

jag har en ledig lucka i veckan och spelar gärna in en kort video (ca 2 min) där jag går
igenom er sajt — vad som fungerar, och de 2–3 sakerna jag hade fixat först för fler bokningar.

Kostar inget, kräver inget. Du får videon, gör vad du vill med den.

Vill du ha den? Svara "ja" så har du den inom ett par dagar.
Eller boka 15 minuter direkt så går vi igenom det live: https://cal.eu/bahkobyra/15min

/Mathias, Bahko Byrå

---

## 5. Uppföljning — DAG 10 (close-loop, sista mejlet)

**Ämne:** Sista mejlet från mig 🙂

Hej [Förnamn],

jag vill inte fylla din inkorg — det här är sista mejlet i den här rundan.

Om fler bokningar via sajten inte är prio just nu: helt lugnt, då hörs vi en annan gång.
Du har kvar guiden och kan alltid boka en gratis analys senare.

Om det ÄR prio: boka 15 minuter så visar jag exakt vad jag skulle göra för just er klinik —
inklusive ett utkast på hur er nya startsida kan se ut, innan ni betalar någonting.

https://cal.eu/bahkobyra/15min

Allt gott!

/Mathias, Bahko Byrå

---

## Setup-checklista (görs en gång)

- [ ] Skapa konto på MailerLite eller Brevo (gratis upp till ~1 000 kontakter)
- [ ] Formspree → Settings → Webhooks/Integrations → koppla nya leads till listan
- [ ] Tre grupper/taggar: `analys`, `guide`, `nyhetsbrev` (styr vilket välkomstmejl som går ut)
- [ ] Lägg in sekvensen: 0 min → dag 2 → dag 5 → dag 10 (stoppa sekvensen vid svar/bokning)
- [ ] Verifiera avsändardomän (SPF + DKIM för bahkobyra.se) så mejlen inte hamnar i skräppost
- [ ] Testa hela flödet med din egen e-post innan den går live
