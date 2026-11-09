'use client';

/* Dragbar före/efter-jämförelse för heron. Mallen (🔒 _mall/DemoSida) har bara en
   statisk bild i hero.foreEfter, så den här komponenten läggs ovanpå just den rutan
   via en portal. Utan JS syns före-bilden (mallens egen <Image>).
   Mus och touch: egna pekarhändelser. Reglaget flyttas FÖRST när draget är vågrätt
   (|dx| > |dy| efter en liten tröskel); ett lodrätt svep skrollar sidan som vanligt
   (touch-action: pan-y). Tangentbord och skärmläsare: ett visuellt dolt <input type="range">.
   Färger: svart handtag och vit linje (Philip 2026-11-09: ingen korall som yta).
   Ingen synlig "Illustration"-lapp (Mathias 2026-11-09, runda 3): det står i alt och aria-label. */
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const TROSKEL = 8; // px innan riktningen avgörs

const CSS = `
.feR{position:absolute;inset:0;z-index:2;touch-action:pan-y;user-select:none;-webkit-user-select:none;cursor:ew-resize}
.feR img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;pointer-events:none}
.feR .feFore{clip-path:inset(0 calc(100% - var(--pos)) 0 0)}
.feR .feLinje{position:absolute;top:0;bottom:0;left:var(--pos);width:2px;margin-left:-1px;background:#fff;box-shadow:0 0 0 1px rgba(10,10,10,.28);pointer-events:none}
.feR .feKnapp{position:absolute;top:50%;left:var(--pos);width:48px;height:48px;margin:-24px 0 0 -24px;border-radius:50%;background:#0A0A0A;color:#fff;border:2px solid #fff;display:grid;place-items:center;box-shadow:0 4px 14px rgba(10,10,10,.3);pointer-events:none;transition:transform .15s}
.feR .feKnapp svg{width:24px;height:24px}
.feR input{position:absolute;inset:0;width:100%;height:100%;margin:0;opacity:0;pointer-events:none;-webkit-appearance:none;appearance:none;background:transparent}
.feR input:focus-visible ~ .feKnapp{outline:3px solid #0F172A;outline-offset:2px;box-shadow:0 0 0 2px #fff;transform:scale(1.08)}
.feR .feEtikett{position:absolute;padding:.35rem .7rem;border-radius:999px;font:700 .75rem/1 var(--f-rubrik,sans-serif);letter-spacing:.08em;text-transform:uppercase;pointer-events:none}
.feR .feEtikett.v{top:14px;left:14px;background:rgba(10,10,10,.78);color:#fff}
.feR .feEtikett.h{top:14px;right:14px;background:rgba(255,255,255,.94);color:#0A0A0A}
`;

function Reglage({ fore, efter, altFore, altEfter }) {
  const [pos, setPos] = useState(50);
  const ruta = useRef(null);
  const drag = useRef(null);

  const satt = (clientX) => {
    const r = ruta.current.getBoundingClientRect();
    setPos(Math.round(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100))));
  };

  const ner = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, lage: 'oklar' };
  };
  const flytta = (e) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId || d.lage === 'lodrat') return;
    if (d.lage === 'oklar') {
      const dx = Math.abs(e.clientX - d.x);
      const dy = Math.abs(e.clientY - d.y);
      if (dx < TROSKEL && dy < TROSKEL) return;
      if (dx > dy) {
        d.lage = 'vagrat';
        try { ruta.current.setPointerCapture(e.pointerId); } catch { /* äldre webbläsare */ }
      } else {
        d.lage = 'lodrat'; // skroll: reglaget står still
        return;
      }
    }
    e.preventDefault();
    satt(e.clientX);
  };
  const upp = (e) => {
    const d = drag.current;
    if (d && d.id === e.pointerId && d.lage === 'oklar' && e.type === 'pointerup') satt(e.clientX); // ett tryck utan drag hoppar dit
    drag.current = null;
  };

  return (
    <div
      ref={ruta}
      className="feR"
      style={{ '--pos': `${pos}%` }}
      onPointerDown={ner}
      onPointerMove={flytta}
      onPointerUp={upp}
      onPointerCancel={upp}
    >
      <img src={efter} alt={altEfter} draggable={false} />
      <img className="feFore" src={fore} alt={altFore} draggable={false} />
      <span className="feEtikett v" aria-hidden="true">Före</span>
      <span className="feEtikett h" aria-hidden="true">Efter</span>
      <input
        type="range" min="0" max="100" step="1" value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Illustration: jämför taket före och efter målning. Pil vänster eller höger."
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
