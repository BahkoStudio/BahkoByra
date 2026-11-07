'use client';

/* Dragbar före/efter-jämförelse för heron. Mallen (🔒 _mall/DemoSida) har bara en
   statisk bild i hero.foreEfter, så den här komponenten läggs ovanpå just den rutan
   via en portal. Utan JS syns före-bilden (mallens egen <Image>).
   Styrs med mus, touch och tangentbord: ett osynligt <input type="range"> täcker bilden. */
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const CSS = `
.feR{position:absolute;inset:0;z-index:2;touch-action:pan-y;user-select:none;-webkit-user-select:none}
.feR img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;pointer-events:none}
.feR .feFore{clip-path:inset(0 calc(100% - var(--pos)) 0 0)}
.feR .feLinje{position:absolute;top:0;bottom:0;left:var(--pos);width:4px;margin-left:-2px;background:#FE504F;box-shadow:0 0 0 1px rgba(0,0,0,.25);pointer-events:none}
.feR .feKnapp{position:absolute;top:50%;left:var(--pos);width:48px;height:48px;margin:-24px 0 0 -24px;border-radius:50%;background:#FE504F;color:#0A0A0A;display:grid;place-items:center;box-shadow:0 4px 16px rgba(0,0,0,.45);pointer-events:none;transition:transform .15s}
.feR .feKnapp svg{width:26px;height:26px}
.feR input{position:absolute;inset:0;width:100%;height:100%;margin:0;opacity:0;cursor:ew-resize;-webkit-appearance:none;appearance:none;background:transparent}
.feR input::-webkit-slider-thumb{-webkit-appearance:none;width:48px;height:100vh;cursor:ew-resize}
.feR input::-moz-range-thumb{width:48px;height:100vh;border:0;cursor:ew-resize}
.feR input:focus-visible ~ .feKnapp{outline:3px solid #fff;outline-offset:3px;transform:scale(1.08)}
.feR .feEtikett{position:absolute;top:14px;padding:.35rem .7rem;border-radius:999px;background:rgba(10,10,10,.72);color:#fff;font:700 .75rem/1 var(--f-rubrik,sans-serif);letter-spacing:.08em;text-transform:uppercase;pointer-events:none}
.feR .feEtikett.v{left:14px}.feR .feEtikett.h{right:14px;background:#FE504F;color:#0A0A0A}
`;

function Reglage({ fore, efter, altFore, altEfter }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="feR" style={{ '--pos': `${pos}%` }}>
      <img src={efter} alt={altEfter} draggable={false} />
      <img className="feFore" src={fore} alt={altFore} draggable={false} />
      <span className="feEtikett v" aria-hidden="true">Före</span>
      <span className="feEtikett h" aria-hidden="true">Efter</span>
      <input
        type="range" min="0" max="100" step="1" value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        onInput={(e) => setPos(Number(e.target.value))}
        aria-label="Jämför taket före och efter målning. Dra åt vänster eller höger."
        aria-valuetext={`${pos} procent före-bild visas`}
      />
      <span className="feLinje" aria-hidden="true" />
      <span className="feKnapp" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6" /></svg>
      </span>
    </div>
  );
}

export default function ForeEfterReglage(props) {
  const [mal, setMal] = useState(null);
  useEffect(() => {
    const ruta = document.querySelector('#top figure > div');
    if (!ruta) return;
    ruta.style.position = 'relative';
    setMal(ruta);
  }, []);
  return (
    <>
      <style>{CSS}</style>
      {mal ? createPortal(<Reglage {...props} />, mal) : null}
    </>
  );
}
