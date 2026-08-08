# Varför den här katalogen finns kvar

`bahkobyra/cloud/smamaleri/` och `bahkobyra/cloud/brommatradgardsservice/` är
**kundsajternas källkod** och deployas av två EGNA Vercel-projekt
(`smamaleri` och `brommatradgardsservice.se`) som har sin **Root Directory**
inställd på just de här sökvägarna i Vercel-dashboarden.

Flyttas de går kundernas produktionsbyggen sönder. Det upptäcktes 2026-08-06
när de låg i `public/` en kort stund och smamaleri-bygget failade direkt.

Resten av den gamla `bahkobyra/`-webbroten ligger numera i `public/` och
serveras av Next.js-appen. Kundsajterna behöver INTE ligga där: `next.config.mjs`
301:ar `/cloud/smamaleri/*` och `/cloud/brommatradgardsservice/*` vidare till
kundernas egna domäner, så bahkobyra.se serverar dem aldrig själv.

Kort sagt: rör inte sökvägarna utan att först ändra Root Directory i respektive
Vercel-projekt.
