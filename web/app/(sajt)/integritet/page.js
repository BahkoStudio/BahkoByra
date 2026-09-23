import Link from 'next/link';
import styles from './integritet.module.css';

/* Integritetspolicyn. Skriven 2026-09-23 efter panelgranskningen: sajten har tre
   formulär som skickar via Web3Forms och GA4 bakom samtycke, men ingen policy.
   Håll den sann: ändras formulärtjänst, mätning eller lagring ändras texten samma dag. */
export const metadata = {
  title: 'Integritet och cookies',
  description: 'Så hanterar Bahko Byrå personuppgifter från formulären på bahkobyra.se, och vilka cookies sajten använder.',
  alternates: { canonical: '/integritet/' },
};

export default function Integritet() {
  return (
    <section className={styles.yta}>
      <div className={`wrap ${styles.inner}`}>
        <span className="eyebrow">Integritet</span>
        <h1>Så hanterar vi era uppgifter</h1>
        <p className="lede">
          Kort version: vi använder det ni skriver i formulären bara för att svara er. Vi säljer
          inget vidare och skickar inga nyhetsbrev. Statistik från Google Analytics används bara
          om ni säger ja.
        </p>

        <h2>Vem som ansvarar</h2>
        <p>
          Bahko Byrå, org.nr 650816-7738, Kungsängsvägen 27, 561 51 Huskvarna. Frågor om era
          uppgifter: <a href="mailto:mathias@bahkobyra.se">mathias@bahkobyra.se</a> eller{' '}
          <a href="tel:+46762540951">076-254 09 51</a>.
        </p>

        <h2>Formulären</h2>
        <p>
          När ni skickar ett formulär får vi det ni fyllt i: namn, företag, e-post och, om ni
          skriver dem, telefon, webbadress och meddelande. Vi använder uppgifterna för att svara,
          bygga förslaget eller skicka analysen och guiden ni bett om. Det är grunden för
          behandlingen: ni har bett oss om något, och vi behöver uppgifterna för att göra det.
        </p>
        <p>
          Formulären skickas via tjänsten Web3Forms, som tar emot inskicket och vidarebefordrar det
          till vår e-post. Uppgifterna sparas i vår e-post så länge vi har kontakt. Blir det inget
          samarbete raderar vi dem senast två år efter sista kontakten, eller tidigare om ni ber om
          det.
        </p>

        <h2>Cookies och statistik</h2>
        <p>
          Sajten använder Google Analytics för att se hur många som besöker den och vilka sidor
          som leder till förfrågningar. Det sätter cookies och laddas bara om ni tryckt
          &quot;Okej&quot; i rutan om statistik. Google behandlar uppgifterna åt oss och kan föra
          över dem till USA, inom ramen för EU:s och USA:s dataskyddsramverk. Ert val sparas i
          webbläsaren, och ni kan ändra det när som helst under{' '}
          <a href="#cookieval">Cookieinställningar</a>.
        </p>
        <p>
          Videon på startsidan kommer från YouTube och laddas först när ni trycker på den.
        </p>

        <h2>Era rättigheter</h2>
        <p>
          Ni kan när som helst be att få se vilka uppgifter vi har om er, få dem rättade eller
          raderade, och invända mot att vi använder dem. Mejla eller ring så ordnar vi det. Är ni
          inte nöjda med hur vi hanterat det kan ni vända er till Integritetsskyddsmyndigheten,
          IMY.
        </p>

        <p className={styles.fot}>
          Senast uppdaterad 23 september 2026. <Link href="/kontakt/">Till kontaktsidan</Link>
        </p>
      </div>
    </section>
  );
}
