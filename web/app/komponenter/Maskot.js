import styles from './Maskot.module.css';

/* Bahko-maskoten — grön glaskub med vitt B och ett öga (kanon 2026-08-16, se brand.json).
   Ersatte Hemsidedoktorn: samma karaktär, men renderad utan stetoskop och läkarrock.

   Rendern är stel, så figuren ritas i tre lager — kropp, vänster arm, höger arm —
   och gesterna byggs genom att rotera armlagren kring axeln med CSS. Lagren delar
   samma ram och staplas med inset:0, så inga positioner behöver räknas om.
   Alla filer genereras av tools/assets/build_mascot.py ur karaktärsarket.

   Gest väljs efter vad texten bredvid säger:
     vinkar     hälsar, för rubriker och popup
     pekar      sträcker ut armen mot erbjudandet
     undersoker lutar sig fram och tittar, för genomgångar
     dansar     tvåtaktsdans, för CTA-kortet — glad energi vid erbjudandet
     master     lugn viloställning */

const LAGER = {
  kropp: '/brand/maskot/bahko-kropp.webp',
  armVanster: '/brand/maskot/bahko-arm-vanster.webp',
  armHoger: '/brand/maskot/bahko-arm-hoger.webp',
};

const GESTER = ['master', 'vinkar', 'pekar', 'undersoker', 'dansar'];

export default function Maskot({ pose = 'master', stil = 'rund', alt = 'Bahko-maskoten' }) {
  const gest = GESTER.includes(pose) ? pose : 'master';

  return (
    <span className={`${styles.maskot} ${styles[stil]} ${styles[gest]}`} role="img" aria-label={alt}>
      {/* Figurlagret bär kroppens rörelse. Armarna ligger inuti så de följer med
          när hon andas och lutar sig — annars spricker axelleden. */}
      <span className={styles.figur}>
        {/* Armarna ritas FÖRE kroppen och hamnar därmed bakom den. Axelroten
            göms då av kroppens egen silhuett, oavsett hur armen svänger — det
            är det som tar bort cirkeln vid armhålan. */}
        <img className={styles.armVanster} src={LAGER.armVanster} alt="" aria-hidden="true" loading="lazy" />
        <img className={styles.armHoger} src={LAGER.armHoger} alt="" aria-hidden="true" loading="lazy" />
        <img className={styles.kropp} src={LAGER.kropp} alt="" aria-hidden="true" loading="lazy" />
      </span>
    </span>
  );
}
