# Google Företagsprofil — Smålands Måleri

**Kund:** Smålands Måleri AB (namnet enligt kundens egen logotyp)
**Status:** ingen profil finns enligt kunden. Verifiera i Google Maps på svenska innan en ny skapas, en dubblett är krångligare att städa än att göra rätt från början.
**Underlag skapat:** 2026-07-27
**Källa till tjänster och kontaktuppgifter:** kundens egen sajt smamaleri.se samt demon i `bahkobyra/cloud/smamaleri/`

Profilen är det enskilt viktigaste i hela uppdraget. Lokala Maps-träffar och AI-svar hämtar
härifrån, inte från sajtens HTML. *Dokumenterat.* Se `.claude/skills/optimering/` steg 3.

---

## 1. Företagstyp: tjänsteområdesföretag

Måla gör man hos kunden. Företaget har ingen butik dit någon går in, och då ska profilen
sättas upp som **tjänsteområdesföretag med dold adress**.

Det löser två problem samtidigt: adressen behöver inte vara en besöksadress, och
tjänsteområdena blir det som styr var profilen visas. Väljer man i stället butiksläge
kräver Google en adress kunder kan besöka, och en dold hemadress som visas publikt är
både fel och något kunden inte vill.

---

## 2. Namn

**Skriv exakt det namn företaget använder i verkligheten.** Inget mer, inga sökord.

Kundens logotyp säger **Smålands Måleri AB**. Kundens sajt säger på olika ställen
"Smålands Måleri" och "Smålands Måleri & Tak".

⚠️ **Måste bestämmas innan profilen skapas.** Tre skäl:

1. Google kräver det verkliga företagsnamnet. Ett påhittat eller sökordsstoppat namn
   ("Smålands Måleri Fasadmålning Jönköping") kan ge redigering eller avstängning.
2. Det finns minst ett annat etablerat **Smålands Måleri AB**, org.nr 556960-8002, som
   beskrivs med säte Göteborg respektive Malmö, 42 anställda och 29,4 Mkr i omsättning
   2021. Oavsett hur registret ser ut kommer vår kund att tävla mot dem om sitt eget
   namn i sökresultaten. Det är värt att veta i förväg, inte upptäcka efteråt.
3. Skriver kunden AB måste bolaget vara ett registrerat aktiebolag.

**Att hämta in:** organisationsnummer. Med det kan namn och säte verifieras, och numret
hör sedan hemma i sajtens `identifier` i schemat och i sidfoten.

---

## 3. Kategorier

**Primärkategori är den viktigaste enskilda inställningen i hela profilen.** *Dokumenterat.*

| | Värde |
|---|---|
| Primär | **Målare** |
| Underkategorier | Max tre, och bara det företaget faktiskt utför |

Kandidater till underkategorier utifrån tjänsterna på deras sajt: något som täcker
**takmålning eller takarbete**, och något som täcker **fasadtvätt eller högtryckstvätt**.

Välj dem ur Googles egen rullgardin, den listan är den enda som gäller och den ändras
över tid. Uppfinn aldrig en kategori och lägg inte till "Byggföretag" eller "Takläggare"
om de inte lägger tak. Fler kategorier späder ut, de skärper inte.

---

## 4. NAP och kontakt

| Fält | Värde | Status |
|---|---|---|
| Telefon | 072-011 91 73 | Verifierat på deras sajt |
| Webbplats | https://smamaleri.se | Verifierat, sajten är live |
| E-post | kontakt@smamaleri.se | Verifierat på deras sajt |
| Adress | Havsörnsgatan 57, 556 10 Jönköping | Står i sidfoten på vår sida. **Bekräfta med kunden** |

Telefonnumret måste vara **identiskt formaterat** på profilen, på sajten, i schemat och i
katalogerna. Ett nummer som skrivs på tre sätt läses i värsta fall som tre företag.

---

## 5. Tjänsteområden

Ange **orter, inte en radie.** Och bara orter där de faktiskt utfört arbeten.

Ett överbrett tjänsteområde skadar aktivt. "Hela Småland" är precis det misstaget: det
späder ut varje ort och gör att de inte rankar någonstans. *Sannolikt.*

Demon nämner Jönköping, Huskvarna och Habo. Deras egen sajt säger bara "Småland".

**Att hämta in:** de fem till åtta orter där de verkligen jobbat det senaste året.
Börja där. Listan går att utöka när de tagit jobb längre bort.

---

## 6. Tjänster i profilen

Lägg in dem som separata tjänster, med kundens egna formuleringar. Hämtat från deras sajt:

- Invändig målning av väggar, tak, snickerier och dörrar
- Utvändig målning av villor och fastigheter
- Tapetsering
- Fasadtvätt
- Taktvätt
- Takmålning på betongtak, tegeltak och plåttak

---

## 7. Beskrivning

Google tillåter 750 tecken. Svara på vad de gör, var, och för vem, direkt i första
meningen. Ingen adjektivsoppa, den citeras inte och läses inte.

> Smålands Måleri utför invändig och utvändig målning, tapetsering, fasadtvätt, taktvätt
> och takmålning i Jönköping och närliggande orter. Vi målar villor och fastigheter,
> tvättar och målar betongtak, tegeltak och plåttak, och tar hand om allt från enstaka rum
> till hela fasader. Kostnadsfri offert innan arbetet börjar.

Justera orterna när listan i punkt 5 är bekräftad. Beskrivningen påverkar inte ranking,
den påverkar om någon ringer. Behandla den som säljtext.

---

## 8. Foton

**Riktiga jobbfoton, inga AI-bilder.** Demons bilder är Higgsfield-genererade och ligger på
CloudFront. De får aldrig laddas upp i profilen och påstås vara utförda arbeten.

Prioritetsordning:
1. Före och efter på samma fasad, samma vinkel. Starkast av allt för måleri.
2. Tak före och efter tvätt.
3. Invändigt, färdigt rum.
4. Bilen med logotypen, om den är skyltad.
5. Ett porträtt av den som kommer hem till kunden.

Telefonfoton i dagsljus räcker. Genuint slår polerat i den här branschen.

---

## 9. Omdömen: den billigaste stora hävstången

De har noll synliga omdömen. Google-stjärnor är det **enda** stället där betyg visas för
kunden, aldrig via schema på egen sajt. *Dokumenterat.*

Så fort profilen är verifierad:

1. Lista de tio senaste nöjda kunderna.
2. Ring, fråga inte via sms. Svarsfrekvensen är inte i samma liga.
3. Skicka Googles korta recensionslänk direkt efter samtalet, från profilen.
4. Svara på varje omdöme, även de korta. Svarsfrekvens och färskhet räknas.
5. Har de omdömen på Offerta eller Servicefinder påverkar de Google noll. Flytta över
   kunderna, det är ofta den enskilt billigaste stora vinsten i ett uppdrag som detta.

Sikta på fem stycken första månaden. Fem färska slår tjugo tre år gamla.

---

## 10. Verifiering

Bara kunden kan slutföra den, den kräver deras Google-konto. Vanligast för
tjänsteområdesföretag är video eller vykort. Räkna med dagar till veckor.

Ordningen som fungerar:

1. Kunden skapar profilen på sitt eget Google-konto, aldrig på Bahkos.
2. Bahko läggs till som **administratör**, inte ägare. Kunden ska äga sin profil, det är
   både rätt och det som gör att inget går sönder om samarbetet tar slut.
3. Fyll i allt innan verifieringen skickas in.
4. Rör ingenting under granskningen.

---

## Att hämta in från kunden

- [ ] Organisationsnummer, och därmed exakt firmanamn och bolagsform
- [ ] Bekräfta att Havsörnsgatan 57 är rätt adress, och om den får stå kvar publikt
      i sidfoten. Är det en bostadsadress vill många inte det, och för
      tjänsteområdesföretag krävs den bara för verifieringen
- [ ] Öppettider, eller besked om att telefonen svarar dygnet runt
- [ ] De fem till åtta orter där de faktiskt utfört arbeten
- [ ] Tio riktiga jobbfoton, gärna före och efter på samma objekt
- [ ] Namn på den som ska stå som ägare av profilen
- [ ] Befintliga omdömen någon annanstans, som kan flyttas över

## Gör inte

| Åtgärd | Varför |
|---|---|
| Sökord i företagsnamnet | Riktlinjebrott, riskerar avstängning |
| AI-bilder som utförda jobb | Vilseleder kunder, och det syns |
| "Hela Småland" som tjänsteområde | Späder ut varje ort, de rankar ingenstans |
| Profilen på Bahkos Google-konto | Kunden ska äga sin egen entitet |
| `Review`-schema på sajten för egna omdömen | Självbetjänande recensioner otillåtna sedan 2019 |
| Fler än tre underkategorier | Späder ut primärkategorin |
