/* ── MaykasKitchen i18n ───────────────────────────────────── */
(function () {
  'use strict';

  const T = {
    sv: {
      /* NAV */
      'nav.home':    'Hem',
      'nav.book':    'Boken',
      'nav.recipes': 'Recept',
      'nav.about':   'Om Mayka',
      'nav.collab':  'Samarbeten',
      'nav.buybook': 'Köp min bok',
      'nav.open':    'Öppna meny',

      /* HERO – tre bilder i den fastnålade scenen */
      'hero.t1':     'Maykas',
      'hero.t2':     'gröna kök',
      'hero.sub':    'Kutle, hummus &amp; kärlek',
      'hero.btn':    'Köp min bok här',
      'hero.btn2':   'Gratis bloggrecept',
      'hero.scroll': 'Skrolla',

      's2.kicker': 'Om boken',
      's2.title':  'Gröna rätter, <em>tusenåriga traditioner</em>',
      's2.body':   'Växtbaserad matlagning möter uråldriga smaker från Mesopotamien. Boken hyllar kvinnorna som fört traditionen vidare.',

      's3.kicker': 'I boken',
      's3.title':  'Cirka 50 <em>recept</em>',
      's3.body':   'Från vardagsrätter och grön festmat till måltider för fasta och stillhet.',
      's4.kicker': 'Maykas ord',
      's4.quote':  '”Mat förenar människor, precis som kärlek, familj och tro.”',
      's4.by':     'Mayka Gulo',

      /* VAD FINNS I BOKEN */
      'inne.kicker': 'Vad finns i boken',
      'inne.title':  'Kutle, hummus <em>&amp; kärlek</em>',
      'inne.body':   'I sin debutbok bjuder Mayka Gulo in till ett kök som förenar det gamla och det nya.',
      'inne.1t':     'Växtbaserat',
      'inne.1b':     'Gröna rätter, uråldriga smaker.',
      'inne.2t':     'Påskfastan',
      'inne.2b':     'Många recept skapade med påskfastan i åtanke.',
      'inne.3t':     'Kvinnokraft och rötter',
      'inne.3b':     'Ett kapitel om Maykas farmor och kvinnorna i byn.',
      'f.recept.t': 'Recept', 'f.recept': 'cirka 50',
      'f.sidor.t':  'Sidor',
      'f.band.t':   'Band',   'f.band': 'inbunden',
      'f.forlag.t': 'Förlag',
      'f.isbn.t':   'ISBN',
      'inne.quote':  '”Det här kapitlet är för henne. För kvinnorna i byn. För dem som med sina händer byggde framtid med kärlek, kreativitet och smak.”',
      'inne.src':    'Ur kapitlet <em>En hyllning till kvinnokraft, kärlek och rötter</em>, sidan 37',
      'inne.btn':    'Köp min bok nu',

      /* UR MAYKAS KÖK */
      'kok.kicker': 'Från Maykas blogg',
      'kok.title':  'Maykas recept, <em>gratis</em>',
      'kok.body':   '17 av Maykas bloggrecept, gratis att laga hemma.',
      'kok.btn':    'Alla bloggrecept',

      /* SIFFROR */
      'sp.kicker': 'Följ Mayka',
      'sp.title':  'En gemenskap <em>runt bordet</em>',
      'sp.ig':     'följare på Instagram',
      'sp.tt':     'följare på TikTok',
      'sp.fb':     'följare på Facebook',
      'sp.yt':     'följare på YouTube',
      'sp.total':  'total räckvidd över alla kanaler',
      'sp.brands': 'Har samarbetat med',

      /* OM MAYKA */
      'om.kicker': 'Om Mayka',
      'om.title':  'Mayka Gulo',
      'om.roles':  'Matkreatör · Författare · Mamma',
      'om.body':   'Jag skapar matglädje, gemenskap och en varm plats i vardagen där mat, familj, tron på Jesus och livet möts.',
      'om.sign':   'Mayka',
      'om.banner': '”God mat, starkare människor och en varmare vardag.”',

      /* SLUT */
      'slut.btn':    'Beställ min bok',
      'kopbar.t': 'Köp min bok här',

      /* SOCIALA KANALER */
      'social.label': 'Följ mig',
      'social.title': 'Följ <em>Maykas Kitchen</em>',
      'social.ig':    'Följ på Instagram',
      'social.aven':  'Finns även på',

      /* SAMARBETEN */
      'cta.label':      'Samarbeten',
      'cta.heading':    'Låt oss skapa <em>tillsammans</em>',
      'cta.sub':        'Mayka samarbetar med varumärken som delar hennes värderingar och passar hennes målgrupp.',
      'cta.card1.body': 'Exempel på samarbeten',
      'cta.f1': 'visningar på Instagram, 30 dagar',
      'cta.f2': 'visningar på TikTok, 30 dagar',
      'cta.f3': 'kvinnor',
      'cta.f4': 'största åldersgruppen',
      'cta.var.t': 'Sverige',
      'cta.var': 'störst andel i Stockholm, Skåne och Västra Götaland',
      'collab.i1':  'Reels / videoinnehåll',
      'collab.i2':  'Story-serier',
      'collab.i3':  'Produktrecensioner',
      'collab.i4':  'Receptutveckling',
      'collab.i5':  'Event och lanseringar',
      'collab.i6':  'Långsiktiga samarbeten',
      'collab.i7': 'Uppslag i bok / receptsamarbeten',
      'collab.i8': 'Ambassadörskap',

      /* FOOTER */
      'footer.tagline':        'Recept, livsstil och äkta stunder<br>med hjärtat i min assyriska/syrianska matkultur.',
      'footer.explore':        'Utforska',
      'footer.nl.title':       'Nyhetsbrev',
      'footer.nl.p':           'Få nya recept och matinspiration direkt i din inkorg!',
      'footer.nl.placeholder': 'Din e-post',
      'footer.nl.btn':         'Prenumerera',
      'footer.nl.tack':        'Tack! Du är anmäld.',
      'nl.fel':                'Det gick inte att skicka. Försök igen om en stund.',
      'footer.copy':           '© 2026 MaykasKitchen. Alla rättigheter förbehållna.',
      'footer.made':           'Skapad med ♥ i Skåne, Sverige',
      'footer.priv':           'Integritet och kakor',
      'nl.integritet':         'Adressen används bara till nyhetsbrevet och du kan avsluta när du vill. <a href="integritet.html">Så hanterar vi dina uppgifter</a>.',

      /* POPUP */
      'popup.title':       'Matglädje<br><em>direkt i din inkorg</em>',
      'popup.sub':         'Nya recept och matinspiration från mitt kök.',
      'popup.placeholder': 'Din e-postadress',
      'popup.btn':         'Prenumerera gratis',
      'popup.success':     '<span>✓</span> Tack! Du är nu med i gemenskapen 🌿',
      'popup.or':          'eller',
      'popup.book.title':  'Köp min bok',
      'popup.book.sub':    'Maykas gröna kök · 349 kr',

      /* RECEPTSIDAN */
      'back':           'Tillbaka',
      'list.title':     'Bloggrecept',
      'list.sub':       'Maykas recept från bloggen och sociala medier, gratis att laga hemma. Kokboken har en egen samling.',
      'list.all':       'Alla',
      'list.count':     'recept',
      'recipe.view':    'Visa recept →',
      'r.loading':      'Laddar recept…',
      'r.notfound.h':   'Recept hittades inte',
      'r.notfound.p':   'Det här receptet finns inte.',
      'r.notfound.btn': '← Tillbaka till recept',
      'r.ingredients':  'Ingredienser',
      'r.instructions': 'Tillagning',
      'r.tips':         'Tips',
      'r.portions':     'portioner',
      'r.min':          'min',

      /* TAGGAR */
      'tag.bakverk':       'Bakverk',
      'tag.assyriskt':     'Assyriskt',
      'tag.traditionellt': 'Traditionellt',
      'tag.vegetariskt':   'Vegetariskt',
      'tag.vegan':         'Vegan',
      'tag.snabb':         'Snabb',
      'tag.fisk':          'Fisk',
      'tag.under60':       'Under 60 min',
      'tag.kott':          'Kött',
      'tag.syrianskt':     'Syrianskt',
      'tag.kyckling':      'Kyckling',
      'tag.friterat':      'Friterat',
      'tag.fredagsmys':    'Fredagsmys',
      'tag.gryta':         'Gryta',
      'tag.meze':          'Meze',
      'tag.nyhetsmorgon':  'Nyhetsmorgon',
      'tag.brod':          'Bröd',
      'tag.dessert':       'Dessert',
      'tag.mellanostern':  'Mellanöstern',
      'tag.hemlagat':      'Hemlagat',
      'tag.grill':         'Grill',
      'tag.bbq': 'BBQ',
      'tag.familj': 'Familj',
      'tag.halsosam': 'Hälsosam',
      'tag.indiskt': 'Indiskt',
      'tag.klassisk': 'Klassisk',
      'tag.libanesiskt': 'Libanesiskt',
      'tag.pasta': 'Pasta',
      'tag.pizza': 'Pizza',
      'tag.potatis': 'Potatis',
      'tag.protein': 'Protein',
      'tag.turkiskt': 'Turkiskt',
      'tag.vardagslyx': 'Vardagslyx'
    },

    en: {
      /* NAV */
      'nav.home':    'Home',
      'nav.book':    'The book',
      'nav.recipes': 'Recipes',
      'nav.about':   'About Mayka',
      'nav.collab':  'Collaborations',
      'nav.buybook': 'Buy my book',
      'nav.open':    'Open menu',

      /* HERO */
      'hero.t1':     'Maykas',
      'hero.t2':     'gröna kök',
      'hero.sub':    'Kutle, hummus &amp; kärlek',
      'hero.btn':    'Buy my book here',
      'hero.btn2':   'Free blog recipes',
      'hero.scroll': 'Scroll',

      's2.kicker': 'About the book',
      's2.title':  'Green dishes, <em>ancient traditions</em>',
      's2.body':   'Plant-based cooking meets ancient flavours from Mesopotamia. The book honours the women who carried the tradition forward.',

      's3.kicker': 'In the book',
      's3.title':  'About 50 <em>recipes</em>',
      's3.body':   'From everyday dishes and green festive food to meals for fasting and stillness.',
      's4.kicker': 'In Mayka’s words',
      's4.quote':  '“Food brings people together, just like love, family and faith.”',
      's4.by':     'Mayka Gulo',

      /* WHAT’S INSIDE */
      'inne.kicker': 'What’s inside',
      'inne.title':  'Kutle, hummus <em>&amp; kärlek</em>',
      'inne.body':   'In her debut cookbook Mayka Gulo invites you into a kitchen that joins the old and the new.',
      'inne.1t':     'Plant-based',
      'inne.1b':     'Green dishes, ancient flavours.',
      'inne.2t':     'Lent',
      'inne.2b':     'Many recipes created with Lent in mind.',
      'inne.3t':     'Strength of women, and roots',
      'inne.3b':     'A chapter about Mayka’s grandmother and the women of the village.',
      'f.recept.t': 'Recipes', 'f.recept': 'about 50',
      'f.sidor.t':  'Pages',
      'f.band.t':   'Binding', 'f.band': 'hardcover',
      'f.forlag.t': 'Publisher',
      'f.isbn.t':   'ISBN',
      'inne.quote':  '“This chapter is for her. For the women of the village. For those who built a future with their hands, with love, creativity and taste.”',
      'inne.src':    'From the chapter <em>A tribute to the strength of women, love and roots</em>, page 37 (in Swedish)',
      'inne.btn':    'Buy my book now',

      /* FROM MAYKA’S KITCHEN */
      'kok.kicker': 'From Mayka’s blog',
      'kok.title':  'Mayka’s recipes, <em>free</em>',
      'kok.body':   '17 of Mayka’s blog recipes, free to cook at home.',
      'kok.btn':    'All blog recipes',

      /* NUMBERS */
      'sp.kicker': 'Follow Mayka',
      'sp.title':  'A community <em>around the table</em>',
      'sp.ig':     'followers on Instagram',
      'sp.tt':     'followers on TikTok',
      'sp.fb':     'followers on Facebook',
      'sp.yt':     'followers on YouTube',
      'sp.total':  'total reach across all channels',
      'sp.brands': 'Has worked with',

      /* ABOUT */
      'om.kicker': 'About Mayka',
      'om.title':  'Mayka Gulo',
      'om.roles':  'Food creator · Author · Mother',
      'om.body':   'I create joy around food, community and a warm place in everyday life where food, family, faith in Jesus and life meet.',
      'om.sign':   'Mayka',
      'om.banner': '“Good food, stronger people and a warmer everyday life.”',

      /* CLOSING */
      'slut.btn':    'Order my book',
      'kopbar.t': 'Buy my book here',

      /* SOCIAL */
      'social.label': 'Follow me',
      'social.title': 'Follow <em>Maykas Kitchen</em>',
      'social.ig':    'Follow on Instagram',
      'social.aven':  'Also on',

      /* COLLABORATIONS */
      'cta.label':      'Collaborations',
      'cta.heading':    'Let’s create <em>together</em>',
      'cta.sub':        'Mayka works with brands that share her values and suit her audience.',
      'cta.card1.body': 'Examples of collaborations',
      'cta.f1': 'views on Instagram, 30 days',
      'cta.f2': 'views on TikTok, 30 days',
      'cta.f3': 'women',
      'cta.f4': 'largest age group',
      'cta.var.t': 'Sweden',
      'cta.var': 'largest share in Stockholm, Skåne and Västra Götaland',
      'collab.i1':  'Reels / video content',
      'collab.i2':  'Story series',
      'collab.i3':  'Product reviews',
      'collab.i4':  'Recipe development',
      'collab.i5':  'Events and launches',
      'collab.i6':  'Long-term partnerships',
      'collab.i7': 'Book spreads / recipe partnerships',
      'collab.i8': 'Ambassadorships',

      /* FOOTER */
      'footer.tagline':        'Recipes, lifestyle and real moments,<br>rooted in my Assyrian/Syriac food culture.',
      'footer.explore':        'Explore',
      'footer.nl.title':       'Newsletter',
      'footer.nl.p':           'Get new recipes and food inspiration straight to your inbox!',
      'footer.nl.placeholder': 'Your email',
      'footer.nl.btn':         'Subscribe',
      'footer.nl.tack':        'Thank you! You are signed up.',
      'nl.fel':                'It could not be sent. Please try again in a moment.',
      'footer.copy':           '© 2026 MaykasKitchen. All rights reserved.',
      'footer.made':           'Made with ♥ in Skåne, Sweden',
      'footer.priv':           'Privacy and cookies',
      'nl.integritet':         'Your address is only used for the newsletter and you can unsubscribe at any time. <a href="integritet.html">How we handle your data</a>.',

      /* POPUP */
      'popup.title':       'Food joy<br><em>straight to your inbox</em>',
      'popup.sub':         'New recipes and food inspiration from my kitchen.',
      'popup.placeholder': 'Your email address',
      'popup.btn':         'Subscribe for free',
      'popup.success':     '<span>✓</span> Thank you! You’re now part of the community 🌿',
      'popup.or':          'or',
      'popup.book.title':  'Buy my book',
      'popup.book.sub':    'Maykas gröna kök · 349 kr',

      /* RECIPE PAGE */
      'back':           'Back',
      'list.title':     'Blog recipes',
      'list.sub':       'Mayka’s recipes from the blog and social media, free to cook at home. The cookbook has its own collection.',
      'list.all':       'All',
      'list.count':     'recipes',
      'recipe.view':    'View recipe →',
      'r.loading':      'Loading recipe…',
      'r.notfound.h':   'Recipe not found',
      'r.notfound.p':   'This recipe does not exist.',
      'r.notfound.btn': '← Back to recipes',
      'r.ingredients':  'Ingredients',
      'r.instructions': 'Method',
      'r.tips':         'Tips',
      'r.portions':     'servings',
      'r.min':          'min',

      /* TAGS */
      'tag.bakverk':       'Pastry',
      'tag.assyriskt':     'Assyrian',
      'tag.traditionellt': 'Traditional',
      'tag.vegetariskt':   'Vegetarian',
      'tag.vegan':         'Vegan',
      'tag.snabb':         'Quick',
      'tag.fisk':          'Fish',
      'tag.under60':       'Under 60 min',
      'tag.kott':          'Meat',
      'tag.syrianskt':     'Syriac',
      'tag.kyckling':      'Chicken',
      'tag.friterat':      'Deep-fried',
      'tag.fredagsmys':    'Friday night',
      'tag.gryta':         'Stew',
      'tag.meze':          'Meze',
      'tag.nyhetsmorgon':  'Nyhetsmorgon',
      'tag.brod':          'Bread',
      'tag.dessert':       'Dessert',
      'tag.mellanostern':  'Middle East',
      'tag.hemlagat':      'Homemade',
      'tag.grill':         'Grill',
      'tag.bbq': 'BBQ',
      'tag.familj': 'Family',
      'tag.halsosam': 'Healthy',
      'tag.indiskt': 'Indian',
      'tag.klassisk': 'Classic',
      'tag.libanesiskt': 'Lebanese',
      'tag.pasta': 'Pasta',
      'tag.pizza': 'Pizza',
      'tag.potatis': 'Potato',
      'tag.protein': 'Protein',
      'tag.turkiskt': 'Turkish',
      'tag.vardagslyx': 'Everyday luxury'
    }
  };

  window.MK_T = T;
  let sparatSprak = null;
  try { sparatSprak = localStorage.getItem('mk-lang'); } catch (_) {}
  window.MK_LANG = sparatSprak === 'en' ? 'en' : 'sv';

  window.getT = function (key) {
    return (T[window.MK_LANG] && T[window.MK_LANG][key]) || (T.sv[key]) || key;
  };

  /* Svensk taggtext -> i18n-nyckel (recepten bär sina taggar som svenska ord) */
  window.tagKey = function (label) {
    const slug = label.toLowerCase()
      .replace(/å|ä/g, 'a').replace(/ö/g, 'o')
      .replace(/[^a-z0-9]/g, '');
    return T.sv['tag.' + slug] !== undefined ? 'tag.' + slug : null;
  };

  window.applyLang = function (lang) {
    window.MK_LANG = lang;
    try { localStorage.setItem('mk-lang', lang); } catch (_) {}
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const val = T[lang] && T[lang][el.dataset.i18n];
      if (val !== undefined) el.innerHTML = val;
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const val = T[lang] && T[lang][el.dataset.i18nPh];
      if (val !== undefined) el.placeholder = val;
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const val = T[lang] && T[lang][el.dataset.i18nAria];
      if (val !== undefined) el.setAttribute('aria-label', val);
    });

    document.querySelectorAll('.lang-toggle').forEach(btn => {
      btn.textContent = lang === 'sv' ? 'EN' : 'SV';
    });

    if (typeof window.MK_RENDER === 'function') window.MK_RENDER();
  };

  window.initLangToggle = function () {
    document.querySelectorAll('.lang-toggle').forEach(btn => {
      btn.textContent = window.MK_LANG === 'sv' ? 'EN' : 'SV';
      btn.addEventListener('click', () => {
        window.applyLang(window.MK_LANG === 'sv' ? 'en' : 'sv');
      });
    });
    if (window.MK_LANG !== 'sv') window.applyLang(window.MK_LANG);
  };
}());
