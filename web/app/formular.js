/* Formulären på bahkobyra.se och i demosidorna skickas med Web3Forms.

   NYCKELN är avsiktligt publik. Web3Forms är byggt så: nyckeln säger bara vilken
   inkorg svaret ska till, den ger ingen åtkomst till något. Byt den aldrig mot en
   "hemlig" variabel, då slutar formuläret fungera i en statisk sida.

   Är NYCKEL tom faller varje formulär tillbaka på mailto, precis som förut. Inget
   går sönder innan nyckeln är ifylld, och ingen besökare möter ett dött formulär.

   Ny kund: ge kunden en egen nyckel (web3forms.com, deras egen mejladress) och skicka
   in den som `nyckel` i formProps, så landar förfrågningarna hos dem i stället för hos oss. */

export const NYCKEL = '';

/* Nyckeln för hemsideförslagen. Alla förslag delar den och landar hos oss, med
   firmans namn i ämnesraden. Blir ett förslag en skarp sajt får kunden en egen
   nyckel och byter ut den på sin sida. Autosvar är AV på den här i dashboarden:
   ett förslag ser ut som kundens egen sajt, och ett autosvar signerat Bahko Byrå
   avslöjar upplägget. (Skapad av Mathias 2026-09-22, mottagare mathias@bahkobyra.se.) */
export const DEMO_NYCKEL = '38db5da0-8af0-4b31-bcdc-a840e84e5764';

const URL = 'https://api.web3forms.com/submit';
export const TACK = 'https://www.bahkobyra.se/tack/';

/** Attribut till <form>. Web3Forms när nyckel finns, annars mailto som förut. */
export function formProps({ mailto, nyckel = NYCKEL }) {
  if (!nyckel) return { action: mailto, method: 'post', encType: 'text/plain' };
  return { action: URL, method: 'POST' };
}

/** Dolda fält som Web3Forms behöver. Renderar ingenting i mailto-läget. */
export function DoldaFalt({ amne, fran, tack = TACK, nyckel = NYCKEL }) {
  if (!nyckel) return null;
  return (
    <>
      <input type="hidden" name="access_key" value={nyckel} />
      <input type="hidden" name="subject" value={amne} />
      <input type="hidden" name="from_name" value={fran} />
      <input type="hidden" name="redirect" value={tack} />
      {/* Honungsfälla mot skräppost. Robotar fyller i den, människor ser den inte. */}
      <input type="checkbox" name="botcheck" tabIndex={-1} aria-hidden="true" style={{ display: 'none' }} />
    </>
  );
}
