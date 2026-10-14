# Karuseller och bildkort v38 (2026-09-13)

Byggda med ig-karusell i Cinematiskt läge. Bilder: GPT Image 2.5 (gpt_image_2_5), variant sunburst, kvalitet medium, 1k, 4:5. 1 credit per bild, 13 bilder totalt (2 omslag + 10 inre slides + bildkortet). CTA-slidesen använder den färdiga maskotbilden i ig-karusell-skillen (0 credits).

Flöde: maskotens master laddas upp (media_upload, PUT, media_confirm) och används som image_references på omslagen och bildkortet. Inre slides genereras utan maskot med omslagets job_id som image_references så allt lever i samma värld. Prompten säger alltid: ingen text, ingen maskot, nedre 55 procent mörk och lugn.

Text läggs på lokalt: overlay-v38.html (?s=t|h&i=0..) renderas transparent i Playwright/Edge till exakt 1080 x 1350 (v37 hade en rand nertill för att lagret var 70 px för kort), sedan komponera.mjs <bakgrund> <lager> <ut>. Bildkortets lager: bildkort-v38-overlay.html.

Regler i texten: alltid lokala företag, inga tankstreck, aldrig gratis, DEMO som CTA-ord. Leverans i Drive: Planerat v38/karusell 1 - tisdag, karusell 2 - torsdag, bildkort torsdag.
