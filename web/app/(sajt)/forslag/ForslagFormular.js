'use client';

import DemoFormular from '../../komponenter/DemoFormular';
import { NYCKEL_KONTAKT } from '../../formular';
import kontaktStil from '../kontakt/kontakt.module.css';
import styles from './forslag.module.css';

/* Formuläret på /forslag. Samma lösning som /kontakt/ (docs/formular-web3forms.md):
   DemoFormular skickar till Web3Forms med kontaktnyckeln och landar hos
   mathias@bahkobyra.se. Ämnesraden säger att det kom från /forslag och bär
   hemsidans adress, så det syns direkt i inkorgen.

   Fältet för LinkedIn eller e-post heter "kontakt", inte "email": Web3Forms
   skickar autosvar till fältet email, och kontaktnyckelns autosvar är skrivet
   för hemsideförslaget på /kontakt/, inte för det här erbjudandet. */
export const AMNE = 'Förslag via bahkobyra.se/forslag: {hemsida}';

const BRANSCHER = [
  'Måleri',
  'Bygg och snickeri',
  'VVS och rör',
  'El',
  'Trädgård',
  'Städ',
  'Restaurang och café',
  'Butik och e-handel',
  'Annat',
];

/* Felmeddelandena ur utkastet, i stället för webbläsarens standardtext. */
function fel(meddelande) {
  return {
    onInvalid: (e) => e.currentTarget.setCustomValidity(meddelande),
    onInput: (e) => e.currentTarget.setCustomValidity(''),
    onChange: (e) => e.currentTarget.setCustomValidity(''),
  };
}

export default function ForslagFormular() {
  return (
    <DemoFormular
      className={`${kontaktStil.form} ${styles.form}`}
      amne={AMNE}
      nyckel={NYCKEL_KONTAKT}
      fran="bahkobyra.se/forslag"
      tel="076-254 09 51"
      tack
      kvittens={
        <>
          <p className={kontaktStil.kvittensRubrik}>Tack, nu har jag din sida.</p>
          <p>Inom 48 timmar får du förslaget i DM på LinkedIn. Skrev du en e-post kommer det dit.</p>
          <p>
            Frågor under tiden? Ring <a href="tel:+46762540951">076-254 09 51</a>.
          </p>
        </>
      }
    >
      <h2 className={styles.formRubrik}>Få ditt förslag</h2>
      <label>
        Hemsidans adress
        <input
          type="text"
          name="hemsida"
          required
          inputMode="url"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          placeholder="dinfirma.se"
          {...fel('Skriv adressen till din hemsida.')}
        />
      </label>
      <label>
        Din LinkedIn-profil eller e-post
        <input
          type="text"
          name="kontakt"
          required
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          placeholder="linkedin.com/in/dittnamn"
          {...fel('Skriv din LinkedIn-profil eller en e-post.')}
        />
      </label>
      <label>
        Bransch
        <select name="bransch" required defaultValue="" {...fel('Välj den bransch som ligger närmast.')}>
          <option value="" disabled>
            Välj bransch
          </option>
          {BRANSCHER.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </label>
      <label>
        Förnamn
        <input
          type="text"
          name="fornamn"
          required
          autoComplete="given-name"
          placeholder="Mathias"
          {...fel('Skriv ditt förnamn.')}
        />
      </label>

      <button type="submit" className="btn btn-primar">
        Få mitt gratis förslag
      </button>
      <p className={kontaktStil.finstilt}>Inom 48 timmar. Utan förpliktelse.</p>
      <p className={styles.integritet}>
        Jag använder uppgifterna bara för att skicka ditt förslag. Inget nyhetsbrev, och jag delar
        dem inte med någon. Vill du att jag raderar dem räcker ett mejl till{' '}
        <a href="mailto:mathias@bahkobyra.se">mathias@bahkobyra.se</a>.
      </p>
    </DemoFormular>
  );
}
