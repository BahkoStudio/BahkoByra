/**
 * Shabifix — bygg, snickeri och måleri i Västra Frölunda, Göteborg.
 *
 * Verifierat 2026-08-16 genom Mathias inloggade koll av Instagram och Facebook:
 * personnamn Shaban, riktiga jobbfoton (mur, kök, golv, målade rum), ort
 * Västra Frölunda, tjänster bygg/snickeri/måleri.
 *
 * INGEN historik är verifierad — bolagsform, registreringsår och F-skatt är
 * okända. Alla siffror på sidan är därför löften om hur vi jobbar, aldrig
 * påståenden om vad som varit. Hitta aldrig på år eller antal jobb.
 *
 * Telefonnumret är en PLATSHÅLLARE. Det ska bytas mot det riktiga innan sidan
 * skickas — validatorn vägrar sätta status "levererad" så länge pl() står kvar.
 */

// Explicit .js — Next klarar sig utan, men validatorn körs i rå Node och
// kräver filändelse. Samma import ska fungera i båda.
import { pl } from './_schema.js';

export default {
  slug: 'shabifix',
  kit: 'v1',
  status: 'utkast',

  /* Den bärande idén. Allt på sidan ska argumentera för den här meningen, och
     den är samma sak som videon visar: ett rum som blir klart av samma händer. */
  barandeIde: 'En renovering kräver normalt tre firmor. Här räcker en.',

  /* Ärlighet som positionering — riskreversering genom att avstå försäljning. */
  arligMening: 'Passar jobbet inte oss säger vi det på plats. Hellre ett ärligt nej än ett halvfärdigt jobb.',

  /* EN handling, renderas överallt från denna sträng. Kan inte spreta. */
  cta: { verb: 'Begär offert' },

  varumarke: {
    namn: 'Shabifix',
    ordmark: ['Shabi', 'fix'],       // andra delen får accentfärgen
    ort: 'Västra Frölunda',
    omrade: 'Västra Frölunda · Göteborg med omnejd',
    yrke: 'bygg, snickeri och måleri',
    radie: '4px',
    /* Kobolt — matchar deras egen marinblå logga. Kontrasterna räknas av
       validatorn: accent mot bas 6,4:1, text mot bas 16:1. */
    palett: {
      bas: '#0B0E14',
      sektion: '#141924',
      yta: '#1A2130',
      accent: '#5B8DEF',
      accentLjus: '#93B7FA',
      accentMork: '#2E5AA8',
      text: '#F2F4F8',
      textLag: '#A6ADBC',
      linje: 'rgba(242,244,248,.12)',
    },
  },

  hero: {
    video: '/demo/shabifix/media/hero.mp4',
    poster: '/demo/shabifix/media/hero-poster.jpg',
    frysbild: '/demo/shabifix/media/hero-frysbild.jpg',
    etikett: 'Bygg · Snickeri · Måleri — Göteborg',
    setup: 'Renovering brukar kräva tre firmor.',
    punch: 'Här räcker en.',
    tagline: 'Fast pris innan start · En kontakt hela vägen · Vi täcker och städar varje dag',
    scrollcue: 'Se förvandlingen',
  },

  barande: {
    etikett: '001 / Hantverket',
    rubrik: 'En hantverkare. Hela jobbet.',
    stycken: [
      'Tre firmor betyder tre offerter, tre tidplaner och tre som skyller på varandra när något inte stämmer. Här tar samma händer helheten: från rivning och montering till sista strykningen.',
      'Du har en kontakt från första besöket tills sista listen sitter, och vi täcker och städar efter oss varje dag vi är hos dig.',
    ],
    bild: {
      fil: '/demo/shabifix/media/galleri-nymalat-vardagsrum.jpg',
      alt: 'Nymålat vardagsrum med lister och tak klara',
    },
  },

  foreEfter: {
    etikett: '002 / Beviset',
    rubrik: 'Ett rum i taget. Klart på riktigt.',
    ingress: 'Inget rivet i onödan, ingen flytt. Rummet görs om där det står.',
    fore: {
      fil: '/demo/shabifix/media/hero-poster.jpg',
      alt: 'Rum med sliten vägg och spackelmärken före renovering',
      text: 'Före — ojämn färg och gamla spackelmärken.',
    },
    efter: {
      fil: '/demo/shabifix/media/poster-efter-nymalat.jpg',
      alt: 'Samma rum färdigmålat med ny sockel',
      text: 'Efter — tvättat, lagat och målat.',
    },
  },

  /* Löften, inte historik. Varje rad är sann per definition eftersom den
     beskriver hur vi jobbar, inte vad vi gjort. */
  loften: {
    etikett: '003 / Så jobbar vi',
    rubrik: 'Fyra löften, noll överraskningar.',
    matare: { tal: 24, suffix: 'h', etikett: 'Svar på förfrågan' },
    rader: [
      { tal: 1, suffix: 'st', etikett: 'Kontaktperson hela vägen' },
      { tal: 0, suffix: 'kr', etikett: 'Hembesök och offert' },
      { tal: 0, suffix: 'st', etikett: 'Dolda avgifter' },
    ],
  },

  process: {
    etikett: 'Så går det till',
    rubrik: 'Fyra steg, inga överraskningar.',
    steg: [
      { n: '01', rubrik: 'Vi kommer ut', text: 'Kostnadsfritt hembesök. Vi tittar, mäter och säger ärligt vad som behöver göras.' },
      { n: '02', rubrik: 'Fast pris', text: 'Priset skriftligt innan vi börjar, uppdelat per rum eller moment. Inga tillägg under jobbets gång.' },
      { n: '03', rubrik: 'Förarbete', text: 'Täckning, rivning och underarbete. Det är här ett hantverksjobb vinns eller förloras.' },
      { n: '04', rubrik: 'Du synar', text: 'Vi går igenom allt med dig i dagsljus innan vi packar ihop. Missat något? Då tar vi det.' },
    ],
  },

  tjanster: {
    etikett: '004 / Tjänster',
    rubrik: 'Det här gör vi.',
    rader: [
      { namn: 'Måleri', tagg: 'Inne & ute', detalj: 'Väggar, tak, snickerier' },
      { namn: 'Snickeri', tagg: 'Passning som syns', detalj: 'Lister, dörrar, inredning' },
      { namn: 'Bygg & renovering', tagg: 'Rum för rum', detalj: 'Golv, väggar, ytskikt' },
      { namn: 'Montering', tagg: 'Kök & förvaring', detalj: 'Rakt, tyst och fastskruvat' },
    ],
  },

  galleri: {
    etikett: 'Galleri',
    rubrik: 'Före och efter.',
    bilder: [
      { fil: '/demo/shabifix/media/hero-poster.jpg', alt: 'Sliten vägg före målning', bildtext: 'Före — ojämn färg.' },
      { fil: '/demo/shabifix/media/poster-efter-nymalat.jpg', alt: 'Samma rum nymålat', bildtext: 'Efter — lagat och målat.' },
      { fil: '/demo/shabifix/media/galleri-detalj-skarpt-snitt.jpg', alt: 'Skarpt snitt mot sockeln', bildtext: 'Snittet — där man ser vem som tejpat.' },
      { fil: '/demo/shabifix/media/galleri-fore-villa-flagnande.jpg', alt: 'Villa med flagnande fasadfärg', bildtext: 'Ute, före — färg som släppt.' },
      { fil: '/demo/shabifix/media/galleri-efter-villa-antracit.jpg', alt: 'Villa ommålad i antracit', bildtext: 'Ute, efter — skrapat och målat.' },
      { fil: '/demo/shabifix/media/galleri-nymalad-trafasad.jpg', alt: 'Nymålad träfasad', bildtext: 'Träfasad — knutar i samma svep.' },
    ],
  },

  om: {
    etikett: 'Om oss',
    rubrik: 'En hantverkare för hela jobbet.',
    stycken: [
      'Shabifix är en hantverksfirma i Västra Frölunda som tar bygg, snickeri och måleri i ett. Du slipper jaga tre firmor och jämka tre tidplaner.',
      'Vi tar ett jobb i taget och gör det klart. Samma händer river, bygger, snickrar och målar tills rummet är färdigt.',
    ],
    punkter: [
      'Måleri — väggar, tak och snickerier',
      'Snickeri — lister, dörrar och inredning',
      'Bygg och renovering — rum för rum',
      'Montering — kök och förvaring',
    ],
    bild: {
      fil: '/demo/shabifix/media/galleri-nymalad-trafasad.jpg',
      alt: 'Nymålad träfasad i Göteborg',
    },
  },

  kontakt: {
    etikett: 'Kontakt',
    rubrik: 'Ring, eller be oss titta.',
    telefon: pl('070-123 45 67'),          // PLATSHÅLLARE — riktigt nummer saknas
    telefonLank: pl('0701234567'),
    epost: 'shabi92@icloud.com',
    instagram: '@shabifix',
    omrade: 'Västra Frölunda · Göteborg med omnejd',
    rot: 'ROT-avdrag på arbetskostnaden — draget direkt på fakturan',
    offertkort: {
      rubrik: 'Kostnadsfri offert',
      text: 'Vi kommer ut, tittar på jobbet och lämnar ett fast pris skriftligt, uppdelat per rum eller moment. Kostar ingenting och förbinder dig inte till något.',
    },
  },

  slutcta: {
    etikett: 'Nästa steg',
    setup: 'Vad ska',
    punch: 'fixas?',
    under: 'Fast pris innan start · En kontakt hela vägen',
  },

  nudge: {
    kicker: 'Ett samtal räcker',
    text: 'Hembesöket och offerten kostar ingenting — du får ett fast pris och bestämmer sen.',
  },

  bahko: {
    rubrik: 'Vill du ha en sida som denna för din firma?',
    text: 'Boka ett kostnadsfritt 15-minuterssamtal med Mathias. Vi visar exakt hur din firmas hemsida kan se ut.',
    cal: 'bahkobyra/15min',
    mejlAmne: 'Intresserad av demo-hemsida (Shabifix)',
  },

  seo: {
    titel: 'Shabifix — bygg, snickeri & måleri i Göteborg',
    beskrivning: 'Shabifix tar bygg, snickeri och måleri i ett — en hantverkare för hela jobbet i Göteborg. Demo av Bahko Byrå.',
  },
};
