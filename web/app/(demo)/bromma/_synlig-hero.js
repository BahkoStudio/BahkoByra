import s from '../_mall/mall.module.css';

// Lighthouse mobil lab 2026-11-17: LCP 4,5 s på ortsraden i H1, nästan bara render delay
// från mallens hero-animation (heroUpp / stigUpp startar på opacity 0). Texten ska synas
// direkt. Videon och logotypens rörelse lämnas orörda. Överstyrningen ligger här, inte i
// den delade mallen, så andra sajter inte påverkas.
const REGLER = `
.${s.heroRubrik},
.${s.heroOrt},
.${s.heroTjanster},
.${s.heroBokstav},
.${s.heroOrd} {
  animation: none !important;
  opacity: 1 !important;
  transform: none !important;
  filter: none !important;
  clip-path: none !important;
}
`;

export default function SynligHero() {
  return <style dangerouslySetInnerHTML={{ __html: REGLER }} />;
}
