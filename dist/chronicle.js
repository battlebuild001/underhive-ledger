/* Public background reading; only UI preferences are stored here. */
(()=>{
 'use strict';
 const read=key=>{try{return localStorage.getItem(key)}catch{return null}},write=(key,value)=>{try{localStorage.setItem(key,value)}catch{}};
 let language=read('underhive-korea-language')==='en'?'en':'ko';
 let appTheme=null;try{appTheme=JSON.parse(read('underhive-ledger-v1')||'null')?.theme}catch{}
 let light=(read('underhive-chronicle-theme')||appTheme||'dark')==='light';
 function theme(){document.documentElement.classList.toggle('light',light);document.querySelector('[data-chronicle-theme]').setAttribute('aria-label',language==='ko'?(light?'어두운 화면으로 변경':'밝은 화면으로 변경'):(light?'Use dark theme':'Use light theme'));}
 function syncExpand(){const all=[...document.querySelectorAll('.ch-event')],open=all.length>0&&all.every(n=>n.open),b=document.querySelector('[data-chronicle-expand]');b.setAttribute('aria-expanded',String(open));b.textContent=language==='ko'?(open?'모두 접기':'모두 펼치기'):(open?'Collapse all':'Expand all');}
 function translate(){document.documentElement.lang=language;for(const n of document.querySelectorAll('[data-ko][data-en]'))n.textContent=n.dataset[language];for(const n of document.querySelectorAll('[data-chronicle-language]'))n.setAttribute('aria-pressed',String(n.dataset.chronicleLanguage===language));document.querySelector('.ch-contents').setAttribute('aria-label',language==='ko'?'시대별 목차':'Chronicle contents');document.title=language==='ko'?'네크로문다 연대기 · 언더하이브 코리아':'Chronicle of Necromunda · Underhive Korea';theme();syncExpand();}
 document.addEventListener('click',e=>{const languageButton=e.target.closest('[data-chronicle-language]');if(languageButton){language=languageButton.dataset.chronicleLanguage;write('underhive-korea-language',language);translate();return;}if(e.target.closest('[data-chronicle-theme]')){light=!light;write('underhive-chronicle-theme',light?'light':'dark');theme();return;}if(e.target.closest('[data-chronicle-expand]')){const rows=[...document.querySelectorAll('.ch-event')],open=!rows.every(n=>n.open);for(const n of rows)n.open=open;syncExpand();}});
 document.addEventListener('toggle',e=>{if(e.target.matches?.('.ch-event'))syncExpand();},true);
 function followHash(){const key=location.hash.slice(1),target=key?document.getElementById(key):null;for(const a of document.querySelectorAll('.ch-contents a')){if(a.hash===location.hash)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');}if(target?.matches('.ch-event'))target.open=true;}
 window.addEventListener('hashchange',followHash);
 let printState=null;window.addEventListener('beforeprint',()=>{if(printState)return;printState=[...document.querySelectorAll('details')].map(n=>[n,n.open]);for(const [n]of printState)n.open=true;});window.addEventListener('afterprint',()=>{for(const [n,open]of printState||[])n.open=open;printState=null;syncExpand();});
 translate();followHash();
})();
