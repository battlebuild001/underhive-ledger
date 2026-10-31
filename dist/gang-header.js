/* Group existing controls after render so their handlers and permission guards stay intact. */
(()=>{
'use strict';
const words=(ko,en)=>{const s=document.createElement('span');s.dataset.i18nKo=ko;s.dataset.i18nEn=en;s.textContent=window.UKI18n?.language==='en'?en:ko;return s;};
const region=(key,ko,en)=>{const n=document.createElement('div');n.className='gah-group gah-'+key;const h=document.createElement('span');h.className='gah-label';h.append(words(ko,en));n.append(h);return n;};
const disclosure=(key,ko,en)=>{const n=document.createElement('details');n.className='gah-menu gah-'+key;const s=document.createElement('summary');s.append(words(ko,en));const arrow=document.createElement('span');arrow.className='gah-chevron';arrow.setAttribute('aria-hidden','true');arrow.textContent='⌄';s.append(arrow);const panel=document.createElement('div');panel.className='gah-panel';n.append(s,panel);return n;};
function refresh(){
 if(data.view!=='gang')return;
 const actions=document.querySelector('.entity-card .entity-actions.main-actions');if(!actions||actions.dataset.gahReady)return;
 actions.dataset.gahReady='true';actions.classList.add('gah-header');
 const card=actions.closest('.entity-card'),tools=card.querySelector('.entity-tools'),old=[...actions.children],game=region('game','게임하기','Play'),info=disclosure('info','갱 정보','Gang info'),manage=disclosure('manage','관리·도구','Manage & tools'),edit=region('edit','갱 관리','Gang management'),exports=region('exports','보기·내보내기','View & export');
 manage.lastElementChild.append(edit,exports);
 const gameButtons=document.createElement('div');gameButtons.className='gah-game-actions';game.append(gameButtons);
 const gameKeys=['[data-play-mode="enter"]','[data-sk-action="new"]'];
 for(const key of gameKeys){const n=old.find(n=>n.matches(key)||n.querySelector(key));if(n)gameButtons.append(n);}
 for(const n of old){if(gameButtons.contains(n))continue;if(n.matches('[data-gang-lore],[data-gang-faction],[data-gang-guide]'))info.lastElementChild.append(n);else if(n.matches('[data-rp-view],[data-parity="view-mode"],[data-roster-text-open]'))exports.append(n);else edit.append(n);}
 if(tools){for(const n of [...tools.children]){const key=n.dataset.gp||n.dataset.ext||n.dataset.parity;const labels={'copy-gang':['갱 복사','Copy gang'],logs:['활동 기록','Activity log'],capture:['이미지 저장','Save image'],'share-gang':['공유·초대','Share & invite'],'print-gang':['인쇄','Print']};const label=labels[key];if(label){const icon=document.createElement('span');icon.className='gah-tool-icon';icon.setAttribute('aria-hidden','true');icon.append(...n.childNodes);n.append(icon,words(...label));n.removeAttribute('title');n.removeAttribute('aria-label');}n.classList.add('gah-tool');(key==='copy-gang'||key==='logs'?edit:exports).append(n);}tools.remove();}
 const manual=card.closest('.content')?.querySelector(':scope>[data-official-source-notice]');if(manual&&manual.dataset.referenceVerified==='true'){for(const button of manual.querySelectorAll('button'))button.classList.add('gah-tool');edit.append(manual);}
 actions.append(game);if(info.lastElementChild.children.length)actions.append(info);actions.append(manage);card.classList.add('gah-card');
 for(const menu of actions.querySelectorAll('.gah-menu'))menu.addEventListener('toggle',()=>{if(menu.open)for(const other of actions.querySelectorAll('.gah-menu'))if(other!==menu)other.open=false;});
 window.UKI18n?.refresh?.(actions);
}
function close(menu,focus){if(!menu?.open)return;menu.open=false;if(focus)menu.querySelector('summary').focus();}
window.MMGangHeader={refresh,closeForCapture(trigger){const menu=trigger.closest('.gah-menu');if(!menu?.open)return()=>{};close(menu,false);return()=>{if(menu.isConnected)menu.querySelector('summary').focus();};}};
document.addEventListener('keydown',e=>{if(e.key!=='Escape'||document.querySelector('.modal-bg,.mmrr-overlay,.mp-overlay'))return;const menu=document.querySelector('.gah-menu[open]');if(menu){e.preventDefault();close(menu,menu.contains(document.activeElement));}});
document.addEventListener('pointerdown',e=>{if(document.querySelector('.modal-bg,.mmrr-overlay,.mp-overlay'))return;for(const menu of document.querySelectorAll('.gah-menu[open]'))if(!menu.contains(e.target))close(menu,false);});
window.addEventListener('change',e=>{if(e.target.matches('[data-rp-view]')&&e.target.closest('.gah-header'))setTimeout(()=>document.querySelector('.gah-manage>summary')?.focus(),0);},true);
const original=render;render=function(){const result=original.apply(this,arguments);refresh();return result;};
let queued=false;new MutationObserver(()=>{if(!queued){queued=true;queueMicrotask(()=>{queued=false;refresh();});}}).observe(document.getElementById('app'),{childList:true,subtree:true});refresh();
})();
