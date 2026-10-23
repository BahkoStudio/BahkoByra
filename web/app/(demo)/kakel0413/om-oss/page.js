import Image from 'next/image';
import { fontKlasser } from '../../_mall/fonter';
import s from '../../_mall/mall.module.css';
import { arKunddoman } from '../kunddoman';

/* Kakel 0413 AB — Om oss (länkad från footern på huvudsidan).
   Mathias 2026-10-22: Om Nuh bort från huvudsidan, kortare och roligare text i
   footerns Om oss. Samma fakta som kundens egen text (se VERIFIERAT i ../page.js):
   17+ år, upp till sju projekt samtidigt, ca 800 nya toaletter, Skanska/NCC/Peab,
   kvalitet och att hålla det man lovar. Inget annat påstås. */

const META = {
  title: 'Om oss — Kakel 0413 AB, kakelsättare i Eslöv',
  description: 'Bakom Kakel 0413 står Nuh: över 17 år i byggbranschen, upp till sju projekt samtidigt och kakel i hela Skåne.',
};

// Kunddomänen: indexeras med canonical https://kakel0413.se/om-oss/; på bahkobyra.se noindex som förut.
export async function generateMetadata() {
  return (await arKunddoman())
    ? { ...META, alternates: { canonical: 'https://kakel0413.se/om-oss/' }, robots: { index: true, follow: true } }
    : { ...META, robots: { index: false, follow: false } };
}

const M = '/kakel0413/media';
const tema = { '--mork': '#16130E', '--accent': '#C29B48', '--accent-hover': '#A9832F', '--accent-text': '#7A5A16', '--accent-ljus': '#D9B867', '--pa-accent': '#0F172A' };

export default function OmOss() {
  return (
    <div className={`${fontKlasser} ${s.sida}`} style={tema}>
      <style>{'#om [class*="omBevis"],#om [class*="omBevis"] *{animation:none!important;opacity:1!important;transform:none!important}'}</style>
      <header style={{ borderBottom: '1px solid #E7E1D6', background: '#fff' }}>
        <div className={s.wrap} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', minHeight: 72, flexWrap: 'nowrap' }}>
          <a href="/kakel0413/" style={{ fontWeight: 800, fontSize: 'var(--tx-xl)', letterSpacing: '-0.02em' }}>← Kakel 0413</a>
          <a className={s.btn} href="tel:+46738752725" aria-label="Ring 073-875 27 25">Ring oss</a>
        </div>
      </header>
      <main>
        <section className={`${s.sek} ${s.sekKram}`} id="om">
          <div className={s.wrap}>
            <div className={s.omGrid}>
              <div className={s.omKort}>
                <Image src={`${M}/logo.webp`} alt="Kakel 0413 AB" width={1000} height={502} sizes="340px" priority />
                <p className={s.omOrt}>Eslöv · hela Skåne</p>
              </div>
              <div className={s.omTxt}>
                <p className={s.eyebrow}>Om oss</p>
                <h1 className={s.h2}>Sjutton år i branschen. <em>Nu med eget namn på dörren.</em></h1>
                <div className={s.stycken}>
                  <p>Bakom Kakel 0413 står Nuh. Han har jobbat i byggbranschen i över 17 år, med allt från kakel och badrum till riktigt stora byggprojekt.</p>
                  <p>Som mest har han haft ansvar för sju stora projekt samtidigt. Sammanlagt blev det runt 800 nya toaletter. Däremellan har han lagt kakel och klinker i trapphus, hallar och kök, och jobbat ihop med Skanska, NCC och Peab.</p>
                  <p>Varför starta eget? För att få lägga all tid på det som faktiskt spelar roll: hög kvalitet, noggrant arbete, tydlig kommunikation och att alltid hålla det man lovar.</p>
                  <p>Helt nytt badrum eller ett mindre jobb, målet är detsamma: att du ska bli riktigt nöjd.</p>
                </div>
                <div className={s.omBevis}>
                  <div><b>17+ år</b><span>i byggbranschen</span></div>
                  <div><b>Upp till 7</b><span>projekt samtidigt</span></div>
                  <div><b>Ca 800</b><span>nya toaletter</span></div>
                </div>
                <p style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <a className={s.btn} href="/kakel0413/#kontakt">Boka kostnadsfri genomgång</a>
                  <a className={s.btn} style={{ background: '#fff', color: 'var(--text)', boxShadow: 'none', border: '1px solid #D6CFC2' }} href="/kakel0413/#process">Så går det till</a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
