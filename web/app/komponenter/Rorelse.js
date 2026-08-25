'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/* Avslöjar sektioner när de scrollas in i bild.

   Klassen js-rorelse sätts först här, från JavaScript. CSS:en som gömmer
   sektionerna är scopad under den klassen, så en sida utan JavaScript (eller
   med ett skriptfel) visar allt som vanligt istället för ingenting alls.

   Varje element avslöjas en gång och slutar sedan bevakas — en sektion som
   tonar in och ut när man scrollar fram och tillbaka blir bara stökig.

   Komponenten bor i layouten, och layouter återmonteras INTE vid klient-
   navigering — därför måste effekten köras om per sökväg. Utan det står varje
   sida efter den första med permanent osynliga sektioner (buggen 2026-08-21:
   9 av 9 dolda på startsidan efter ett varv till Tjänster och tillbaka). */

export default function Rorelse() {
  const sokvag = usePathname();

  useEffect(() => {
    const rot = document.documentElement;
    rot.classList.add('js-rorelse');

    const mal = document.querySelectorAll('[data-avsloja], [data-trapp]');
    const visaAllt = () => mal.forEach((el) => el.classList.add('synlig'));

    if (!('IntersectionObserver' in window)) {
      mal.forEach((el) => el.classList.add('synlig'));
      return undefined;
    }

    const obs = new IntersectionObserver(
      (poster) => {
        poster.forEach((post) => {
          if (!post.isIntersecting) return;
          post.target.classList.add('synlig');
          obs.unobserve(post.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
    );

    mal.forEach((el) => obs.observe(el));

    /* Skyddsnät. Observatorn utlöses bara av det som faktiskt hamnar i vy, och
       allt som aldrig gör det skulle annars bli permanent osynligt: utskrifter,
       skärmdumpsverktyg och sidor som laddas med ett ankare långt ner. Efter tre
       sekunder visas därför allt som fortfarande väntar, och vid utskrift direkt. */
    const timer = window.setTimeout(visaAllt, 3000);
    window.addEventListener('beforeprint', visaAllt);

    return () => {
      obs.disconnect();
      window.clearTimeout(timer);
      window.removeEventListener('beforeprint', visaAllt);
    };
  }, [sokvag]);

  return null;
}
