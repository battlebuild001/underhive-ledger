/* Personal display order lives in the account document, separate from shared rosters. */
(()=>{
 'use strict';
 const text=(ko,en)=>window.UKI18n?.language==='en'?en:ko;
 const label=(ko,en)=>`<span data-i18n-ko="${esc(ko)}" data-i18n-en="${esc(en)}">${esc(text(ko,en))}</span>`;
 const defaults=edition=>data.gangs.filter(g=>g.edition===edition&&window.MMCampaignOwnership.owns(g)).sort((a,b)=>Number(!!b.favorite)-Number(!!a.favorite));
 function sort(items,edition=data.edition){
  const stored=data.homeGangOrder?.[edition];if(!Array.isArray(stored))return items;
  const positions=new Map();for(const id of stored)if(typeof id==='string'&&!positions.has(id))positions.set(id,positions.size);
  return [...items].sort((a,b)=>(positions.get(a.id)??positions.size)-(positions.get(b.id)??positions.size));
 }
 function open(){
  if(data.view!=='dashboard'||(data.homeTab||'gangs')!=='gangs')return;
  const edition=data.edition,source=data,owner=window.AccountParity?.account?.id;
  let draft=sort(defaults(edition),edition).map(g=>g.id),reset=false;
  if(draft.length<2)return;
  showModal(label('갱 순서 변경','Change gang order')+' · '+esc(edition),
   `<div class="gang-order-editor"><p>${label('위·아래 화살표로 옮기거나 위치 번호를 선택하세요. 저장한 순서가 즐겨찾기보다 우선하며, 별 표시는 유지됩니다.','Use the arrows or choose a position number. Your saved order takes priority over favourites; stars are kept.')}</p><ol class="gang-order-list" aria-label="${esc(text('갱 표시 순서','Gang display order'))}"></ol><p class="gang-order-status" role="status" aria-live="polite"></p><button type="button" class="btn" data-gang-order-reset>${label('기본 순서로 되돌리기','Restore default order')}</button></div>`,text('순서 저장','Save order'),()=>{
    if(data!==source||window.AccountParity?.account?.id!==owner){dialog.querySelector('.gang-order-status').textContent=text('기록이 갱신되었습니다. 창을 닫고 다시 순서를 변경하세요.','Your records changed. Close this dialog and reopen it.');return false;}
    const previous=data.homeGangOrder;
    data.homeGangOrder={...(previous&&typeof previous==='object'&&!Array.isArray(previous)?previous:{})};
    if(reset)delete data.homeGangOrder[edition];
    else{const current=defaults(edition).map(g=>g.id),valid=new Set(current);data.homeGangOrder[edition]=[...draft.filter(id=>valid.has(id)),...current.filter(id=>!draft.includes(id))];}
    save();queueMicrotask(()=>document.querySelector('[data-gang-order-open]')?.focus({preventScroll:true}));return true;
   });
  const dialog=document.querySelector('.modal-bg');dialog.classList.add('gang-order-dialog');
  function draw(focusId,control){
   const gangs=new Map(data.gangs.map(g=>[g.id,g]));
   dialog.querySelector('.gang-order-list').innerHTML=draft.map((id,index)=>{
    const g=gangs.get(id);if(!g)return '';
    const up=text(g.name+' 위로 이동','Move '+g.name+' up'),down=text(g.name+' 아래로 이동','Move '+g.name+' down'),position=text(g.name+' 위치','Position of '+g.name);
    return `<li data-gang-order-row="${esc(id)}"><div class="gang-order-identity"><strong data-user-text>${esc(g.name)}</strong><small data-user-text>${esc(window.UKI18n?.t?.(g.faction)||g.faction)}</small></div><div class="gang-order-controls"><select class="field" data-gang-order-position aria-label="${esc(position)}">${draft.map((_,i)=>`<option value="${i}" ${i===index?'selected':''}>${i+1}</option>`).join('')}</select><button type="button" class="btn" data-gang-order-move="-1" aria-label="${esc(up)}" ${index===0?'disabled':''}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 14 6-6 6 6"/></svg></button><button type="button" class="btn" data-gang-order-move="1" aria-label="${esc(down)}" ${index===draft.length-1?'disabled':''}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 10 6 6 6-6"/></svg></button></div></li>`;
   }).join('');
   if(focusId){const row=[...dialog.querySelectorAll('[data-gang-order-row]')].find(n=>n.dataset.gangOrderRow===focusId);const target=row?.querySelector(control);(target&&!target.disabled?target:row?.querySelector('select'))?.focus({preventScroll:true});row?.scrollIntoView({block:'nearest'});}
  }
  function move(row,to,control){
   const from=draft.indexOf(row.dataset.gangOrderRow);if(from<0||!Number.isInteger(to)||to<0||to>=draft.length||to===from)return;
   const [id]=draft.splice(from,1);draft.splice(to,0,id);reset=false;draw(id,control);
   const name=data.gangs.find(g=>g.id===id)?.name||'';dialog.querySelector('.gang-order-status').textContent=text(`${name}: ${to+1}번째로 이동했습니다.`,`${name}: moved to position ${to+1}.`);
  }
  dialog.addEventListener('click',e=>{
   const button=e.target.closest('[data-gang-order-move]');
   if(button&&!button.disabled){const row=button.closest('[data-gang-order-row]');move(row,draft.indexOf(row.dataset.gangOrderRow)+Number(button.dataset.gangOrderMove),`[data-gang-order-move="${button.dataset.gangOrderMove}"]`);}
   if(e.target.closest('[data-gang-order-reset]')){draft=defaults(edition).map(g=>g.id);reset=true;draw();dialog.querySelector('.gang-order-status').textContent=text('기본 순서를 불러왔습니다. 저장하면 적용됩니다.','Default order loaded. Save to apply.');}
  });
  dialog.addEventListener('change',e=>{if(e.target.matches('[data-gang-order-position]'))move(e.target.closest('[data-gang-order-row]'),Number(e.target.value),'[data-gang-order-position]');});
  draw();window.UKI18n?.refresh(dialog);
 }
 document.addEventListener('click',e=>{if(e.target.closest('[data-gang-order-open]'))open();});
 window.MMGangOrder={sort,open};
})();
