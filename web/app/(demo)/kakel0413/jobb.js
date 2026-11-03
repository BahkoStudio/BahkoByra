/* Kakel 0413: jobbgalleriet ("Våra jobb"). ENDA stället att lägga till ett jobb.
   Tom lista = sektionen syns inte alls. Bara Nuhs EGNA jobbfoton, aldrig stock- eller AI-bilder.

   Bilderna läggs i web/public/kakel0413/jobb/ (jpg/webp, gärna 1600 px på långsidan,
   före- och efterbild i SAMMA format, t.ex. 4:3). Sökväg i fälten: '/kakel0413/jobb/<fil>'.

   Fält per jobb:
     titel   (krävs)  t.ex. 'Badrum i Eslöv'
     plats   (valfri) t.ex. 'Eslöv'
     typ     'fore-efter' | 'bild'
     bilder  { fore, efter }   när typ = 'fore-efter'
     src                        när typ = 'bild'
     alt     (krävs)  kort beskrivning av bilden/bilderna
     bredd, hojd (valfria) bildens proportioner, standard 4:3

   Exempel:
     { titel: 'Badrum i Eslöv', plats: 'Eslöv', typ: 'fore-efter',
       bilder: { fore: '/kakel0413/jobb/eslov-fore.jpg', efter: '/kakel0413/jobb/eslov-efter.jpg' },
       alt: 'Badrum med gammalt kakel före och nytt vitt marmorkakel efter' },
     { titel: 'Trapphus i Lund', typ: 'bild', src: '/kakel0413/jobb/lund.jpg', alt: 'Nylagt klinker i trapphus' },
*/
export const jobb = [];
