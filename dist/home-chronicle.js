/* Keep a real link so the archive supports direct access, reload and browser history. */
(()=>{
 'use strict';
 function refresh(){if(data.view!=='dashboard')return;const actions=document.querySelector('.home-welcome .actions');if(!actions||actions.querySelector('[data-chronicle-open]'))return;const link=document.createElement('a');link.href='/chronicle.html';link.className='btn home-chronicle-link';link.dataset.chronicleOpen='';link.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 5v15M12 5C8 2 3 3 3 3v16s5-1 9 1c4-2 9-1 9-1V3s-5-1-9 2Z"/></svg><span data-i18n-ko="네크로문다 연대기" data-i18n-en="Necromunda chronicle">네크로문다 연대기</span>';actions.append(link);window.UKI18n?.refresh(link);}
 const previous=render;render=function(){const result=previous.apply(this,arguments);refresh();return result;};window.addEventListener('pageshow',()=>{let stored;try{stored=localStorage.getItem('underhive-korea-language')}catch{}if(['ko','en'].includes(stored)&&window.UKI18n?.language!==stored)window.UKI18n?.setLanguage(stored);refresh();});refresh();
})();
