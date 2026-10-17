import DemoSida from '../_mall/DemoSida';

/* ===========================================================================
   MAXIMUM PLATT ENTREPRENAD AB — kostnadsfritt hemsideförslag från Bahko Byrå
   Lead: instagram.com/maximum_platt_enterpernad_ab (handle stavat så) · ingen
   hemsida hittad · ORT OKÄND. Byggd 2026-10-17 på demomallen v3 (kanon: swedcro).
   Mathias har lovat en prototyp i DM. Kunden svarade "Bättre hitta mig
   projekt": han vill ha fler jobb, så sidan är byggd för förfrågningar.

   Bärande idé: bygg och våtrum från samma firma. Ett badrum slutar sällan vid
   tröskeln, och kunden ska kunna lämna hela projektet till en kontakt. Sidan
   gör det enkelt att begära offert (en handling, åtta vägar till formuläret).
   Varför-filmen visar ett renoverat hus ur deras eget flöde.

   VERIFIERAT (2026-10-17):
   - Instagram-profilen (embed + profilsidan utan inloggning, och Mathias
     skärmdump): visningsnamn "Maximum Platt Entreprenad AB", 146 inlägg,
     1 157 följare. Bio ordagrant: "Vi är specialiserade inom bygg och våtrum
     och med vår mångåriga och breda erfarenhet är vi din trygga partner för
     bygg- och renoveringsprojekt."
   - Tjänsterna, exakt fyra (Mathias 2026-10-17): Badrumsrenovering,
     Takrenovering, Husrenovering, Markarbete.
   - Alla jobbilder och de två egna tjänstebilderna är stillbilder ur deras
     egna inlägg: reels DP1ea5PDAoL, DS3wlbwiJbE, DUkq9kXDAIn, DbMI2vit6P2 och
     bildkarusellen DPpHMjqDKox (1440 px). Varje fil används en gång.
   - Instagram-inläggen som bäddas in är deras egna arbetsinlägg:
     DS3wlbwiJbE (badrum och kök), DUkq9kXDAIn (tvättstuga och dusch),
     DS3u-MVCGpL (hall, kök och platsbyggt i en villa).

   INTE verifierat, och finns därför inte på sidan: org.nr ("Maximum Platt
   Entreprenad AB" finns inte i allabolag, merinfo, ratsit, proff eller
   hitta 2026-10-17), ort, telefon, e-post, adress, Google-profil, omdömen,
   antal år, antal projekt, garantier, certifieringar (inget BKR/GVK/behörig
   våtrumsbyggare). Underpunkterna i tjänstekorten är vad tjänsterna innebär i
   allmänhet. "Offert innan start" och "vi tittar på rummet" är erbjudanden i
   förslagets form — bekräfta med kunden.

   FLAGGOR:
   - Firmanamnet är läst ur Instagram-namnet. Registret saknar det.
   - MÖJLIG KOPPLING 1 (obelagd): Max Platt AB, 559334-5530, Huddinge
     (maxplatt.se, "MaxPlatt AB"). Använd inte deras uppgifter förrän Mathias
     bekräftat. Vilka fält som byts då står i leadfilen.
   - MÖJLIG KOPPLING 2 (obelagd, känslig, detaljer hos Mathias): en
     varseljacka i reelen DP1ea5PDAoL bär ett annat "Maximum"-firmanamn.
     Inget av det står på sidan, bildrutan används inte.
   - LOGOTYPEN ÄR ETT FÖRSLAG FRÅN BAHKO, kunden har ingen egen (Mathias
     uppdrag 2026-10-17). Tak + 2×2 plattor, ordmärket i Bebas Neue/Outfit som
     konturer. Källfiler: 1-byran/intern-tillvaxt/leads/maximumplatt-logotyp/.
     Temat (kobolt på marin) är taget ur den logotypen.
   - Hero-filmen är en genererad illustration (Qwen A → B + Kling, 0,38 USD),
     inte deras badrum. Ingen not på sidan (Mathias 2026-09-19).
   - Tak- och markkorten har lånade illustrationer (goldring/tjanst-tak,
     hg/tjanst-schakt), märkta i jobb.not. Kunden har inga egna tak- eller
     markbilder i de tolv inlägg som syns utan inloggning.
   - Ingen telefon: mallen byter Ring-knapparna mot Instagram och formuläret.
   - Omdömen i exempelläge. Formuläret går till mathias@bahkobyra.se.
   =========================================================================== */

export const metadata = {
  title: 'Maximum Platt Entreprenad AB — badrumsrenovering, bygg och våtrum',
  description:
    'Specialiserade inom bygg och våtrum. Badrumsrenovering, takrenovering, husrenovering och markarbete från samma firma. Begär offert på ditt projekt. Förslag på hemsida från Bahko Byrå.',
  robots: { index: false, follow: false },
};

const M = '/maximumplatt/media';

const data = {
  namn: 'Maximum Platt Entreprenad AB',
  tema: {
    mork: '#0A1020',
    accent: '#1D4ED8',
    accentHover: '#1E40AF',
    accentText: '#1D4ED8',
    accentLjus: '#8FB0FF',
    paAccent: '#fff',
  },
  logo: { src: `${M}/logo-maximumplatt.png`, w: 1200, h: 288, alt: 'Maximum Platt Entreprenad AB', topp: 'vit', ljus: `${M}/logo-maximumplatt-ljus.png` },
  kontakt: {
    ig: 'https://www.instagram.com/maximum_platt_enterpernad_ab/',
    igHandle: '@maximum_platt_enterpernad_ab',
  },
  cta: { txt: 'Begär offert på ditt projekt', kort: 'Begär offert', lank: 'Begär offert' },
  nav: {
    vanster: [{ href: '#tjanster', txt: 'Tjänster' }, { href: '#jobb', txt: 'Våra jobb' }],
    hoger: [{ href: '#om', txt: 'Om oss' }, { href: '#fragor', txt: 'Frågor' }],
  },

  hero: {
    // Ingen ort är verifierad, så raden utelämnas.
    tjanster: ['Badrum', 'Renovering'],
    video: `${M}/video-hero.mp4`,
    videoMobil: `${M}/video-hero-mobil.mp4`,
    poster: `${M}/poster-hero.jpg`,
    posterMobil: `${M}/poster-hero-mobil.jpg`,
  },
  tejp: ['Badrumsrenovering', 'Våtrum', 'Kakel', 'Klinker', 'Takrenovering', 'Husrenovering', 'Markarbete', 'Bygg'],

  tjanster: {
    eyebrow: 'Vad vi gör',
    rubrik: ['Fyra tjänster,', 'en firma'],
    lead: 'Bygg och våtrum är det vi är specialiserade på. Du lämnar hela projektet till oss, från badrummet till marken runt huset.',
    kort: [
      { id: 'badrum', namn: 'Badrumsrenovering', bild: `${M}/tjanst-badrum.jpg`, alt: 'Dusch med svart spröjsad glasvägg, grått kakel och klinker', text: 'Från rivning och underarbete till tätskikt, kakel och klinker. Ett badrum som tål vatten i många år börjar under plattorna.', punkter: ['Rivning och underarbete', 'Tätskikt', 'Kakel och klinker'], ritning: (<><path d="M30 20h140v84H30z" /><path d="M30 48h140M30 76h140M77 20v84M123 20v84" /><path d="M150 30v20" /></>) },
      { id: 'tak', namn: 'Takrenovering', bild: `${M}/tjanst-tak.jpg`, alt: 'Takläggning pågår på ett villatak i kvällsljus', text: 'Ett tak som läcker eller har gjort sitt. Vi går igenom skicket och säger vad som behöver göras innan vi räknar.', punkter: ['Genomgång av skicket', 'Delvis eller helt', 'Offert före start'], ritning: (<><path d="M16 84l84-60 84 60" /><path d="M40 67h120M62 51h76M84 36h32" /><path d="M30 84v20h140V84" /></>) },
      { id: 'hus', namn: 'Husrenovering', bild: `${M}/tjanst-hus.jpg`, alt: 'Renoverat kök med köksö, ekluckor och parkettgolv', text: 'Kök, hall, golv, väggar och platsbyggd förvaring. Ett rum eller hela huset, med samma firma från start till slut.', punkter: ['Kök och hall', 'Golv och väggar', 'Platsbyggd förvaring'], ritning: (<><path d="M24 104V54l76-36 76 36v50" /><path d="M24 104h152" /><path d="M86 104V72h28v32" /><path d="M44 66h24v20H44zM132 66h24v20h-24z" /></>) },
      { id: 'mark', namn: 'Markarbete', bild: `${M}/tjanst-mark.jpg`, alt: 'Grävt dike längs en grusväg med en gul ledning i botten', text: 'Grävning och markarbeten runt huset, så att det som byggs står på rätt grund.', punkter: ['Grävning och schakt', 'Planering av mark', 'Underarbete inför bygget'], ritning: (<><path d="M14 54h56v40h60V54h56" /><path d="M14 108h172" /><path d="M86 80h28" /></>) },
    ],
  },

  jobb: {
    eyebrow: 'Våra jobb',
    rubrik: ['Badrum och renoveringar', 'vi har lämnat efter oss'],
    lead: 'Våtrum i det ena bandet, bygg och renovering i det andra. Fotograferat av oss på plats.',
    not: 'Bilderna i banden är från våra egna jobb. Tak- och markkortens bilder är illustrationer som byts mot era egna.',
    tid: '80s',
    rad1: [
      { src: `${M}/jobb-badkar-fonster.jpg`, alt: 'Ljust kaklat badrum med badkar under ett fönster och duschvägg i glas', txt: 'Badrum med badkar' },
      { src: `${M}/jobb-tvattstuga.jpg`, alt: 'Tvättstuga med tvättmaskin och torktumlare under en bänk, grått klinker', txt: 'Tvättstuga i grått' },
      { src: `${M}/jobb-duschbank.jpg`, alt: 'Kaklad bänk i en dusch med stora grå plattor', txt: 'Kaklad duschbänk' },
      { src: `${M}/jobb-tatskikt.jpg`, alt: 'Våtrumsväggar klädda med gula våtrumsskivor och förberedda genomföringar', txt: 'Underarbetet före kaklet' },
      { src: `${M}/jobb-duschnisch.jpg`, alt: 'Dusch med takdusch och en kaklad nisch för flaskor', txt: 'Dusch med nisch' },
      { src: `${M}/jobb-mosaik-simhall.jpg`, alt: 'Vägg i ett bassängrum kaklad i grönt, rött och vitt', txt: 'Kakel i bassängrum' },
      { src: `${M}/jobb-badrum-ledspegel.jpg`, alt: 'Badrum med rund belyst spegel, mörk kommod och ljust klinker', txt: 'Badrum med belyst spegel' },
    ],
    rad2: [
      { src: `${M}/jobb-trappa.jpg`, alt: 'Trappa med trästeg och smala stålspjälor under arbete', txt: 'Ny trappa' },
      { src: `${M}/jobb-ekvagg-kok.jpg`, alt: 'Kök med hel vägg av ekluckor och solljus genom en altandörr', txt: 'Kök i ek' },
      { src: `${M}/jobb-hall.jpg`, alt: 'Lång hall med parkettgolv och vita dörrar', txt: 'Hall med parkett' },
      { src: `${M}/jobb-platsbyggd-garderob.jpg`, alt: 'Platsbyggd förvaring i plywood med hyllor, lådor och fack', txt: 'Platsbyggd förvaring' },
      { src: `${M}/jobb-entre.jpg`, alt: 'Entré under renovering med plywoodväggar och svart ytterdörr', txt: 'Entrén under arbete' },
      { src: `${M}/jobb-kok-dorr.jpg`, alt: 'Ljust kök med vit bänkskiva och vy genom en dörr mot entrén', txt: 'Kök och entré' },
      { src: `${M}/jobb-simhall.jpg`, alt: 'Stort bassängrum under renovering med tom bassäng', txt: 'Bassängrum under arbete' },
    ],
  },

  varfor: {
    eyebrow: 'Varför Maximum Platt',
    rubrik: ['Bygg och våtrum,', 'samma firma'],
    lead: 'Ett badrum slutar sällan vid tröskeln. Golvet utanför, väggen bakom och taket ovanför hör ihop med det. När samma firma kan både våtrum och bygg har du ett projekt, inte tre hantverkare.',
    punkter: [
      { rubrik: 'Våtrum är vår specialitet', text: 'Tätskikt och underarbete görs ordentligt innan en enda platta sätts.' },
      { rubrik: 'Ett projekt, en firma', text: 'Badrum, renovering, tak och mark från samma ställe. Du slipper samordna flera hantverkare.' },
      { rubrik: 'Offert innan start', text: 'Du får veta vad som ingår och vad det kostar innan arbetet börjar.' },
      { rubrik: 'Ärliga råd', text: 'Räcker det att byta golvet i badrummet säger vi det, även när en helrenovering hade gett oss mer betalt.' },
    ],
    video: `${M}/video-varfor.mp4`,
    poster: `${M}/poster-varfor.jpg`,
    videoAlt: 'Långsam inzoomning genom ett renoverat hus med kakelugn och solljus. Filmen slutar med Maximum Platts logotyp.',
  },

  om: {
    eyebrow: 'Om oss',
    rubrik: ['Specialiserade på', 'bygg och våtrum'],
    kortRad: 'Bygg och våtrum',
    stycken: [
      'Vi är specialiserade inom bygg och våtrum. Med vår mångåriga och breda erfarenhet är vi din trygga partner för bygg- och renoveringsprojekt.',
      'Vi gör badrum, tvättstugor och duschar, och lika gärna kök, hallar, trappor och platsbyggd förvaring. Bilderna på sidan är från våra egna jobb.',
    ],
    bevis: [
      { ord: 'Bygg + våtrum', text: 'från samma firma' },
      { ord: 'Fyra tjänster', text: 'badrum, tak, hus och mark' },
      { ord: 'Egna bilder', text: 'från våra jobb på Instagram' },
    ],
  },

  steg: {
    eyebrow: 'Så går det till',
    rubrik: ['Från första raden', 'till färdigt rum'],
    lead: 'Fem steg, och du vet vad det kostar innan något startar.',
    lista: [
      { namn: 'Förfrågan', text: 'Beskriv rummet eller projektet med några rader.', ikon: 'kontakt' },
      { namn: 'Vi tittar på jobbet', text: 'Vi ser på skicket så att vi räknar på rätt sak.', ikon: 'besok' },
      { namn: 'Offert', text: 'Vad som ingår, vad det kostar och när vi kan börja.', ikon: 'offert' },
      { namn: 'Arbetet', text: 'Underarbete, tätskikt och bygg i rätt ordning.', ikon: 'arbete' },
      { namn: 'Klart', text: 'Vi går igenom resultatet tillsammans.', ikon: 'klart' },
    ],
  },

  omdomen: {
    eyebrow: 'Omdömen',
    rubrik: ['Vad kunderna', 'säger'],
    lista: [
      { namn: 'Villaägare', kalla: 'Badrumsrenovering', exempel: true, text: 'Här står ett riktigt omdöme från en kund, med namn och ort som de själva skrivit det.' },
      { namn: 'Bostadsrätt', kalla: 'Tvättstuga och dusch', exempel: true, text: 'Ett andra kort, hämtat ur er Google-profil när den är på plats.' },
      { namn: 'Fastighetsägare', kalla: 'Husrenovering', exempel: true, text: 'Ett tredje kort. Tre riktiga omdömen räcker för att sidan ska kännas sann.' },
    ],
    not: 'Exempel — byts mot era riktiga omdömen.',
  },

  instagram: {
    eyebrow: 'Instagram',
    rubrik: ['Följ jobben', 'på Instagram'],
    lead: 'Det senaste från vårt konto, direkt från Instagram.',
    bio: 'Bygg och våtrum',
    koder: ['DS3wlbwiJbE', 'DUkq9kXDAIn', 'DS3u-MVCGpL'],
  },

  fragor: {
    eyebrow: 'Vanliga frågor',
    rubrik: ['Det du brukar', 'fråga först'],
    lead: 'Pengar och risk först, det praktiska sedan.',
    kort: { rubrik: 'Hittar du inte svaret?', text: 'Beskriv projektet i formuläret, så får du ett rakt besked om vad som går.' },
    lista: [
      { q: 'Vad kostar ett nytt badrum?', a: 'Det beror på storleken, skicket och vad som ska in. Därför tittar vi på rummet först och lämnar en offert innan något startar.' },
      { q: 'Kan jag använda ROT-avdrag?', a: 'Arbetskostnaden för renovering i din bostad ger ofta rätt till ROT-avdrag. Vi går igenom vad som gäller ditt jobb när vi har sett det.' },
      { q: 'Vad är tätskikt, och varför spelar det roll?', a: 'Tätskiktet är lagret under kaklet och klinkern som stoppar vattnet. Det syns inte när badrummet är klart, men det är det som avgör om rummet håller.' },
      { q: 'Tar ni hela badrummet?', a: 'Ja. Rivning, underarbete, tätskikt, kakel och klinker, så att du har en firma för hela rummet.' },
      { q: 'Gör ni mer än badrum?', a: 'Ja. Vi gör husrenovering, takrenovering och markarbete också, så ett större projekt kan stanna hos samma firma.' },
      { q: 'Hur lång tid tar det?', a: 'Det beror på storleken och vad som ska göras. Du får en tidplan tillsammans med offerten.' },
      { q: 'Var arbetar ni?', a: 'Berätta var jobbet ligger, så säger vi om vi kan ta det.' },
    ],
  },

  kontaktSektion: {
    eyebrow: 'Kontakt',
    rubrik: ['Vad ska göras,', 'och var?'],
    lead: 'Beskriv rummet eller projektet med några rader. Du får ett besked och en offert innan något startar.',
    checkar: ['Offert innan arbetet startar', 'Bygg och våtrum från samma firma', 'En kontakt genom hela projektet'],
    video: `${M}/video-kontakt.mp4`,
    poster: `${M}/poster-kontakt.jpg`,
    formRubrik: 'Berätta kort om projektet',
    placeholder: 'Vilket rum eller projekt, ungefärlig storlek, var huset ligger och när du vill ha det klart',
    formNot: 'Skriv kort om projektet, då kan vi ge ett vettigt svar direkt. Inga massutskick, ingen säljlista.',
  },

  popup: {
    rubrik: 'Dags för badrummet?',
    text: 'Beskriv rummet med några rader. Du får veta vad som behöver göras och vad det kostar innan något startar.',
  },

  footer: {
    text: 'Badrumsrenovering, takrenovering, husrenovering och markarbete. Specialiserade inom bygg och våtrum.',
  },

  modal: {
    rubrik: 'Så här kan Maximum Platt se ut på nätet',
    text: 'Det här är ett kostnadsfritt förslag, byggt på det ni själva visar på Instagram, med bilder från era egna jobb. Logotypen är vårt förslag. Ingen beställning, inget åtagande. Vill ni se den skarpt med ett formulär som landar i inkorgen? Boka ett kostnadsfritt 15-minuterssamtal med Mathias.',
  },
};

export default function MaximumPlattDemo() {
  return <DemoSida data={data} />;
}
