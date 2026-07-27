/* =====================================================================
   Bromma Trädgårdsservice — offertformulär, mobilnav, samtycke och mätning
   ---------------------------------------------------------------------
   Används av tjänstesidorna. Startsidan har samma logik inline eftersom
   den är sammanvävd med scroll-koreografin; beteendet här är medvetet
   identiskt, inklusive händelsenamn och nyckeln i localStorage, så att
   samtycke och GA4-rapportering fungerar likadant på hela sajten.

   KONFIGURATION
   Publika identifierare, avsiktligt i klientkoden. Ingen av dem ger
   åtkomst till något; riktiga API-nycklar hör hemma i .env enligt
   CLAUDE.md. Ändras något här ska det ändras i index.html också.

   web3forms : access key från web3forms.com, mottagare
               jens@brommatradgardsservice.se.
               Tom sträng = formuläret använder mailto/SMS i stället.
   ga4       : mät-ID i formen G-XXXXXXXXXX.
               Tom sträng = ingen samtyckesbanner, ingen mätkod, inga kakor.
   ===================================================================== */
const CFG={
  web3forms:'62471305-bee5-477f-bc2b-b0d6fffffa58',
  ga4:'G-1EKF0NFE5M'
};

const TEL='+46707666514';

function lockScroll(on){
  document.body.style.overflow=on?'hidden':'';
}

/* ===== OFFERTMODAL ===== */
function openOffert(){
  document.getElementById('offert-modal').classList.add('open');
  lockScroll(true);
  track('offert_oppnad',{});
}
function closeOffert(){
  document.getElementById('offert-modal').classList.remove('open');
  lockScroll(false);
  document.getElementById('of-step1').style.display='';
  document.getElementById('of-summary').classList.remove('show');
}

async function submitOffert(e){
  e.preventDefault();
  const tjanst=document.getElementById('of-tjanst').value;
  const namn=document.getElementById('of-namn').value.trim();
  const tel=document.getElementById('of-tel').value.trim();
  const ort=document.getElementById('of-ort').value.trim();
  const info=document.getElementById('of-info').value.trim();
  const hp=document.getElementById('of-hp').value;

  const rows=[
    '<b>Tjänst:</b> '+tjanst,
    '<b>Namn:</b> '+namn,
    '<b>Telefon:</b> '+tel,
    '<b>Ort:</b> '+ort
  ];
  if(info)rows.push('<b>Om jobbet:</b> '+info);
  document.getElementById('of-sum-text').innerHTML=rows.join('<br>');

  const body=
    'Hej!\n\nJag vill gärna ha en offert.\n\n'+
    'Tjänst: '+tjanst+'\n'+
    'Namn: '+namn+'\n'+
    'Telefon: '+tel+'\n'+
    'Ort: '+ort+'\n'+
    (info?('Om jobbet: '+info+'\n'):'')+
    '\nVänliga hälsningar\n'+namn;
  document.getElementById('of-mailto').href=
    'mailto:jens@brommatradgardsservice.se'+
    '?subject='+encodeURIComponent('Offertförfrågan: '+tjanst+' ('+ort+')')+
    '&body='+encodeURIComponent(body);

  const sms='Offertförfrågan: '+tjanst+'. '+namn+', '+tel+', '+ort+'.'+(info?(' '+info):'');
  document.getElementById('of-sms').href='sms:'+TEL+'?&body='+encodeURIComponent(sms);

  // Skicka på riktigt. Lyckas det når förfrågan Jens direkt; annars faller vi
  // tillbaka på mailto/SMS, vilket är exakt hur formuläret betedde sig innan
  // Web3Forms-nyckeln fanns.
  const btn=document.querySelector('.of-form .cta-button');
  let delivered=false;
  if(CFG.web3forms && !hp){
    if(btn){btn.setAttribute('aria-busy','true');btn.querySelector('span').textContent='Skickar...';}
    try{
      const res=await fetch('https://api.web3forms.com/submit',{
        method:'POST',
        headers:{'Content-Type':'application/json','Accept':'application/json'},
        body:JSON.stringify({
          access_key:CFG.web3forms,
          subject:'Offertförfrågan: '+tjanst+' ('+ort+')',
          from_name:'brommatradgardsservice.se',
          botcheck:'',
          Tjänst:tjanst, Namn:namn, Telefon:tel, Ort:ort,
          'Om jobbet':info||'(inget angivet)',
          Sida:document.title
        })
      });
      const json=await res.json().catch(()=>({}));
      delivered=res.ok && json.success!==false;
    }catch(err){delivered=false;}
    if(btn){btn.removeAttribute('aria-busy');btn.querySelector('span').textContent='Skicka förfrågan';}
  }

  setSummaryMode(delivered);
  track(delivered?'offert_skickad':'offert_reservlage',{tjanst:tjanst,ort:ort});

  document.getElementById('of-step1').style.display='none';
  document.getElementById('of-summary').classList.add('show');
  return false;
}

// Steg 2 har två lägen: skickat (mailto/SMS är genvägar) och reserv (de är enda vägen).
function setSummaryMode(delivered){
  const badge=document.getElementById('of-badge');
  const head=document.getElementById('of-head');
  const lead=document.getElementById('of-lead');
  const note=document.getElementById('of-alt-note');
  const mailLabel=document.getElementById('of-mailto-label');
  if(delivered){
    badge.textContent='Skickat';
    head.textContent='Tack, vi har fått din förfrågan';
    lead.textContent='Jens hör av sig inom 24 timmar på vardagar. Här är vad du skickade.';
    note.textContent='Vill du hellre höra av dig direkt går det bra att ringa eller mejla.';
    note.style.display='';
    mailLabel.textContent='Mejla oss också';
  }else{
    badge.textContent='Ett steg kvar';
    head.textContent='Skicka din förfrågan';
    lead.textContent='Klicka nedan så öppnas den färdigskriven i din e-post eller som SMS, eller ring oss direkt.';
    note.style.display='none';
    mailLabel.textContent='Öppna i e-post';
  }
}

/* ===== MOBILNAV ===== */
function toggleMobileNav(){
  const nav=document.getElementById('mobile-nav'),btn=document.getElementById('hamburger');
  nav.classList.toggle('open');btn.classList.toggle('open');
  lockScroll(nav.classList.contains('open'));
}
function closeMobileNav(){
  document.getElementById('mobile-nav').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
  lockScroll(false);
}

/* ===== SAMTYCKE OCH MÄTNING =====
   Ingen begäran går till Google innan besökaren klickat Acceptera. Valet
   sparas per domän, så ett ja på startsidan gäller även här. */
function setConsent(ok){
  try{localStorage.setItem('bts-consent',ok?'yes':'no');}catch(e){}
  hideCookieBar();
  if(ok)loadGA();
}
function hideCookieBar(){
  const bar=document.getElementById('cookie-bar');
  if(!bar)return;
  bar.classList.remove('in');
  document.body.classList.remove('cb-open');
  setTimeout(()=>bar.classList.remove('show'),450);
}
function loadGA(){
  if(!CFG.ga4 || window.__gaLoaded)return;
  window.__gaLoaded=true;
  const s=document.createElement('script');
  s.async=true;
  s.src='https://www.googletagmanager.com/gtag/js?id='+CFG.ga4;
  document.head.appendChild(s);
  window.dataLayer=window.dataLayer||[];
  window.gtag=function(){window.dataLayer.push(arguments);};
  gtag('js',new Date());
  gtag('config',CFG.ga4);
  // Händelser som köats innan samtycke skickas nu, inte tidigare.
  (window.__queued||[]).forEach(a=>gtag('event',a[0],a[1]));
  window.__queued=[];
}
// Loggar bara om samtycke finns. Utan det hamnar inget i kö och inget skickas.
function track(name,params){
  if(!CFG.ga4)return;
  if(window.gtag){gtag('event',name,params||{});return;}
  let c=null;try{c=localStorage.getItem('bts-consent');}catch(e){}
  if(c==='yes'){window.__queued=window.__queued||[];window.__queued.push([name,params||{}]);}
}

/* ===== UPPSTART =====
   Körs efter att DOM:en finns. Skriptet laddas med defer, så det är
   uppfyllt, men lyssnarna kopplas ändå defensivt: saknas modalen på en
   framtida sida ska resten fortsätta fungera. */
(function(){
  "use strict";

  const modal=document.getElementById('offert-modal');
  if(modal){
    modal.addEventListener('click',function(e){if(e.target===this)closeOffert();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))closeOffert();});
  }

  // Samtycke
  if(CFG.ga4){
    let c=null;try{c=localStorage.getItem('bts-consent');}catch(e){}
    if(c==='yes'){
      loadGA();
    }else if(c!=='no'){
      const bar=document.getElementById('cookie-bar');
      if(bar){
        bar.classList.add('show');
        document.body.classList.add('cb-open');
        // Faktisk höjd, så offertknappen lyfts exakt så mycket som krävs.
        requestAnimationFrame(()=>{
          document.body.style.setProperty('--cb-h',bar.offsetHeight+'px');
          bar.classList.add('in');
        });
      }
    }
  }

  // Flytande offertknapp: dyker upp när besökaren läst en skärmhöjd.
  const float=document.getElementById('float-offert');
  if(float){
    const toggleFloat=()=>float.classList.toggle('visible',scrollY>window.innerHeight*.8);
    addEventListener('scroll',toggleFloat,{passive:true});
    toggleFloat();
  }

  // Delegerad klicklyssnare: telefon, reservvägarna och Google-profilen.
  addEventListener('click',function(e){
    const a=e.target.closest && e.target.closest('a');
    if(!a)return;
    const href=a.getAttribute('href')||'';
    if(href.indexOf('tel:')===0){
      const k=['mn-tel','nav-tel','hero-tel','pris-tel','contact-big','of-tel'].find(x=>a.classList.contains(x));
      track('ring_klick',{plats:k||'okand'});
    }else if(a.id==='of-mailto'){
      track('reservvag_mejl',{});
    }else if(a.id==='of-sms'){
      track('reservvag_sms',{});
    }else if(a.classList.contains('gpanel-cta')){
      track('google_profil_klick',{});
    }
  },{passive:true});
})();
