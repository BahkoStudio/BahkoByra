# CEO-genomgång — Bahko Byrå (juni 2026)

Fullständig granskning av allt kundvänt: hemsida, landningssidor, demo, dashboard, CRM,
e-postflöden och dev-miljö. Det som kunde fixas i repot är fixat. Det som kräver konton,
inspelning eller beslut står under "Kräver dig" — i prioritetsordning.

## Fixat i denna runda

**Hemsidan (bahkobyra.se)**
- Intern pipelinesiffra ("87+ Leads Klara") visades för kunder → ersatt med kundlöftet "24h Svar På Gratis Analys"
- Popupen återkom var 90:e sekund i all evighet → visas nu en gång, sedan tyst i 7 dagar (localStorage)
- Nyhetsbrevsregistrering i footern (Formspree, ämnesrad "Ny prenumerant – nyhetsbrev") + länkar till Gratis Guide och Live Demo
- Honeypot-spamskydd (`_gotcha`) på kontaktformuläret

**Gratis analys-sidan**
- "Inga strings attached" (svengelska) → "utan krav och utan säljpitch"
- Formulärplaceholder var säljarens eget namn → neutralt exempel
- Nytt valfritt kvalificeringsfält: "Er största utmaning just nu" (gör 24h-rapporten träffsäker direkt)
- Succéläget levererar nu värde under väntetiden: länk till guiden
- Open Graph-taggar (ser professionell ut vid delning) + honeypot

**Gratis guide-sidan**
- Upplåsningen sparas nu (localStorage) — registrerade besökare möts inte av låst guide vid återbesök
- Honeypot

**Demon (Élara)**
- Sifferkonflikt: hero sa "4 900+ nöjda patienter", statistiken räknade till 4 200 → enhetligt 4 900+

**Det som saknades helt — nu byggt**
- `content/email/valkomstmejl-och-sekvens.md` — 5 färdiga mejl: välkomst (analys), välkomst (guide), dag 2, dag 5, dag 10 + setup-checklista för MailerLite/Brevo
- `content/email/nyhetsbrev-2026-q3.md` — 3 färdigskrivna nyhetsbrev (juni/juli/augusti) + idébank
- Dashboard: ny sektion **"E-post efter registrering & nyhetsbrev"** med alla mejl som kopieringskort — skicka manuellt samma dag tills automationen är live

**Infrastruktur**
- Dev-servern speglar nu Vercel (webbroot = `bahkobyra/`), loggen pekade på 4 döda sökvägar → korrekta
- Sitemap-datum uppdaterade

## Kräver dig (kan inte göras från repot)

1. **HÖGST: Skicka välkomstmejlen manuellt från idag.** Varje formulärsvar i Formspree-inkorgen
   ska få välkomstmejlet samma dag (kopieringskorten finns i dashboarden). Detta är skillnaden
   mellan en lead som svalnar och ett bokat möte.
2. **MailerLite/Brevo-konto + Formspree-webhook** — automatisera sekvensen (checklista i
   `content/email/valkomstmejl-och-sekvens.md`). Verifiera SPF/DKIM för bahkobyra.se så mejlen
   inte hamnar i skräppost.
3. **Spela in guide-videon** — manus klart i `content/gratis-guide-video-manus.md`. Guiden visar
   fortfarande en platshållare där videon ska vara. Ladda upp olistad (YouTube/Loom), klistra in
   embed (sök `BYT UT` i `gratis-guide.html`).
4. **GA4 + Search Console** — du flyger blint utan trafikdata. Steg-för-steg finns i
   `dashboard/todo.html`. Skicka in sitemapen.
5. **Socialt bevis** — sajten saknar riktiga resultat/testimonials. Be första nöjda kunden om
   3 meningar + siffra. Tills dess: använd Élara-demon som bevis (det görs redan i skripten).
6. **Schema-luckor i `index.html`** — fyll i `telephone` och `sameAs` (Instagram/LinkedIn) när
   profilerna finns.
7. **Google Business Profile för Bahko Byrå själv** — practice what you preach; det är dessutom
   ert eget bästa säljbevis ("vi gjorde det här för oss själva på X veckor").
