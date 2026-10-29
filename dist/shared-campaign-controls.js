/* Shared rosters are snapshots. Edit the original owned gang to publish changes. */
(function(){
 'use strict';
 const selectors='button,a,input,select,textarea,[contenteditable],[data-cp],[data-fp],[data-gp],[data-gc],[data-gt],[data-vp],[data-rp],[data-mgp],[data-parity],[data-ext],[data-play],[data-deep],[data-session],[draggable]';
 const directGang='[data-edit-gang],[data-edit-fighter],[data-delete-fighter],[data-stats],[data-resource],[data-stash-assign],[data-stash-remove],[data-add-equipment],[data-add-skill],[data-add-effect],[data-to-stash],[data-equipment-remove]';
 const directCampaign='[data-member-role],[data-member-remove],[data-territory-edit],[data-territory-remove],[data-battle-remove],[data-campaign-resource],[data-cp-role],[data-cp-resource]';
 const gangActions=new Set(['edit-current-gang','edit-gang','delete-gang','new-fighter','new-stash','new-log']);
 const campaignActions=new Set(['edit-campaign','delete-campaign','new-member','new-territory','new-battle']);
 const allowed={
  gp:new Set(['logs','share-gang','download-gang','copy-gang-link']),
  gc:new Set(['fighter-logs']),
  fp:new Set(['equipment-detail','ooa-history','ooa-tab']),
  gt:new Set(['tactics-view','post-cycle']),
  vp:new Set(['detail','equipment-view']),
  rp:new Set(['open','menu','equipment']),
  play:new Set(['dice','open-catalog']),
  parity:new Set(['open-fighter','back-gang','select-fighter','home','edition','favorite-gang','favorite-campaign','dice','goto-gang','battle-filter','session-filter','open-gang-battle','view-mode','view-list','view-page','campaign-summary','campaign-json','capture','share']),
  ext:new Set(['vehicle-detail','print-gang']),
  cp:new Set(['campaign-type-info','campaign-logs','campaign-data','campaign-download','territory-description','session-filter','session-back','fighter-actions','pack-cancel'])
 };
 const texts={
  ko:{gang:'공유 갱 · 읽기 전용',campaign:'참여 캠페인 · 읽기 전용',gangBody:'공유된 최신 명단을 확인하는 화면입니다. 갱의 변경은 소유자의 원본 갱에서 진행합니다.',campaignBody:'캠페인 설정과 전투 기록은 운영자가 관리합니다. 내 갱은 원본 갱 화면에서 수정할 수 있습니다.',edit:'내 갱 수정',disabled:'공유 기록은 이 화면에서 수정할 수 없습니다.'},
  en:{gang:'Shared gang · Read only',campaign:'Joined campaign · Read only',gangBody:'This is the shared roster. Its owner makes changes in the original gang.',campaignBody:'The organiser manages campaign settings and battle records. Edit your own gang in its original roster.',edit:'Edit My Gang',disabled:'Shared records cannot be edited in this view.'}
 };
 let queued=false,applying=false;const disabled=new Map(),dragged=new Map();
 function language(){return window.UKI18n?.language||document.documentElement.lang||'ko'}
 function words(){return texts[language()==='en'?'en':'ko']}
 function state(){return typeof data!=='undefined'?data:{gangs:[],campaigns:[]}}
 function current(){const s=state();return {s,g:['gang','fighter'].includes(s.view)?s.gangs?.find(g=>g.id===s.selectedGang):null,c:s.view==='campaign'?s.campaigns?.find(c=>c.id===s.selectedCampaign):null}}
 function remoteGang(target,ctx){if(ctx.g?.remoteReadOnly)return ctx.g;if(!target)return null;const s=ctx.s,d=target.dataset||{},explicit=d.editGang||d.gang;let candidate=explicit&&s.gangs?.find(g=>g.id===explicit);if(candidate?.remoteReadOnly)return candidate;const fid=d.editFighter||d.deleteFighter||d.stats||d.addEquipment||d.addSkill||d.addEffect||d.toStash?.split(':')[0]||d.equipmentRemove?.split(':')[0];if(fid){candidate=s.gangs?.find(g=>g.remoteReadOnly&&g.fighters?.some(f=>f.id===fid));if(candidate)return candidate}return null}
 function readField(node){return node.matches('#fighter-search,#cp-player-search,#cp-list-default-territories,#cp-group-territories,[data-parity="select-fighter"],[data-rp-view],[data-cp-filter],[data-parity-search],[data-parity-filter],[data-mmrr-search],[data-mmrr-edition],[data-mmrr-kind]')||!!node.closest('#gc-log-content,.mmrr-overlay,.mp-overlay,[data-account-action],.account-card,.uk-language-switch,[data-enrollment-root]')}
 function blocked(node){
  if(!node?.matches)return false;
  const ctx=current(),g=remoteGang(node,ctx),viewer=ctx.c?.remoteRole==='viewer';
  if(!g&&!viewer)return false;
  if(node.matches('[data-shared-edit-own]'))return false;
  if(g&&node.matches(directGang)||viewer&&node.matches(directCampaign))return true;
  if(g&&node.closest('[data-mm-combo]')?.querySelector('[data-gt-pc-action]'))return true;
  const d=node.dataset;
  if(g&&gangActions.has(d.action)||viewer&&campaignActions.has(d.action))return true;
  if(g){for(const key of ['gp','gc','fp','gt','vp','rp','play'])if(d[key]!==undefined&&!allowed[key].has(d[key]))return true;if(d.mgp!==undefined&&d.mgp!=='gallery-close')return true;if(d.deep!==undefined)return true;if(node.matches('[data-gt-pc-action],[data-gt-editor],[data-gt-tactics-card],[data-gt-tactics-pack]'))return true}
  if(viewer&&d.cp!==undefined&&!allowed.cp.has(d.cp))return true;
  if(viewer&&d.session!==undefined&&d.session!=='detail')return true;
  if((g||viewer)&&d.parity!==undefined&&!allowed.parity.has(d.parity))return true;
  if((g||viewer)&&d.ext!==undefined&&!allowed.ext.has(d.ext))return true;
  if(viewer&&d.deep==='map-editor')return true;
  if(viewer&&['publish-current','invite-current','invite'].includes(d.accountAction))return true;
  if(g&&node.matches('[draggable=true]'))return true;
  if((g||viewer)&&node.closest('.content')&&node.matches('input,select,textarea,[contenteditable=true]')&&!readField(node))return true;
  return false;
 }
 function originalGang(){
  const {s,g,c}=current(),me=window.AccountParity?.account?.id;if(!me)return null;
  const owned=id=>s.gangs?.find(g=>g.id===id&&!g.remoteReadOnly&&(!g.remoteOwnerId||g.remoteOwnerId===me));
  // A verified enrollment member may already point to this account's original roster.
  if(!g&&c?.remoteOwnerId&&c.remoteRole==='viewer')for(const member of c.members||[]){if(member.ownerId===me&&member.enrollmentRequestId&&member.sourceGangId===member.gangId){const own=owned(member.gangId);if(own)return own}}
  const candidates=g?[g]:(c?.members||[]).map(m=>s.gangs?.find(g=>g.id===m.gangId));
  for(const remote of candidates){if(!remote?.remoteReadOnly||!remote.sourceGangId||(remote.sourceOwnerId||remote.ownerId||remote.remoteOwnerId)!==me)continue;const own=owned(remote.sourceGangId);if(own)return own}return null;
 }
 function editOwn(){const own=originalGang();if(!own)return false;const s=state();if(typeof closeModal==='function'&&document.querySelector('.modal-bg'))closeModal();s.selectedGang=own.id;s.view='gang';s.tab='fighters';if(typeof save==='function')save();return true}
 function release(){for(const [node,prior]of disabled){if('disabled'in node)node.disabled=prior.disabled;if(prior.aria===null)node.removeAttribute('aria-disabled');else node.setAttribute('aria-disabled',prior.aria);if(prior.title===null)node.removeAttribute('title');else node.setAttribute('title',prior.title);if(prior.editable!==null)node.setAttribute('contenteditable',prior.editable);node.removeAttribute('data-shared-disabled')}disabled.clear();for(const [node,prior]of dragged){node.setAttribute('draggable',prior)}dragged.clear()}
 function refresh(){if(applying)return;applying=true;try{
  release();const ctx=current(),mode=ctx.g?.remoteReadOnly?'gang':ctx.c?.remoteRole==='viewer'?'campaign':null,host=document.querySelector('.content'),old=document.querySelector('[data-shared-readonly-banner]');
  if(!mode||!host)old?.remove();else{const own=originalGang(),w=words(),signature=mode+'|'+language()+'|'+(own?.id||'');let banner=old;if(!banner||banner.dataset.signature!==signature){banner=document.createElement('section');banner.dataset.sharedReadonlyBanner='';banner.dataset.userText='';banner.dataset.signature=signature;banner.className='shared-readonly-banner';banner.setAttribute('role','status');const copy=document.createElement('div'),title=document.createElement('strong'),body=document.createElement('p');title.textContent=w[mode];body.textContent=w[mode+'Body'];copy.append(title,body);banner.append(copy);if(own){const button=document.createElement('button');button.type='button';button.className='btn small';button.dataset.sharedEditOwn='';button.textContent=w.edit;banner.append(button)}if(old)old.replaceWith(banner);else host.prepend(banner)}else if(banner.parentElement!==host)host.prepend(banner)}
  for(const node of document.querySelectorAll(selectors)){if(!blocked(node))continue;if(node.matches('[draggable]')){dragged.set(node,node.getAttribute('draggable'));node.setAttribute('draggable','false');continue}disabled.set(node,{disabled:!!node.disabled,aria:node.getAttribute('aria-disabled'),title:node.getAttribute('title'),editable:node.getAttribute('contenteditable')});if('disabled'in node)node.disabled=true;if(node.hasAttribute('contenteditable'))node.setAttribute('contenteditable','false');node.setAttribute('aria-disabled','true');node.setAttribute('data-shared-disabled','');node.title=words().disabled}
 }finally{applying=false}}
 function schedule(){if(queued)return;queued=true;queueMicrotask(()=>{queued=false;refresh()})}
 function guard(event){const target=event.target?.closest?.(selectors);if(!target)return;if(event.type==='click'&&target.matches('[data-shared-edit-own]')){event.preventDefault();event.stopImmediatePropagation();editOwn();return}if(event.type==='pointerdown'&&target.closest('[data-rp-fighter]')&&current().g?.remoteReadOnly){event.stopImmediatePropagation();return}if((event.type==='dragstart'||event.type==='drop')&&target.closest('[data-rp-fighter]')&&current().g?.remoteReadOnly){event.preventDefault();event.stopImmediatePropagation();return}if(blocked(target)){event.preventDefault();event.stopImmediatePropagation();schedule()}}
 for(const type of ['click','input','change','beforeinput','keydown','submit','dragstart','drop','pointerdown'])window.addEventListener(type,guard,{capture:true,passive:false});
 const previousRender=render;render=function(...args){const result=previousRender.apply(this,args);schedule();return result};
 const style=document.createElement('style');style.textContent='.shared-readonly-banner{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:16px 18px;margin-bottom:18px;border:1px solid var(--line,#48433d);border-left:3px solid var(--uk-copper,#c78d5d);border-radius:12px;background:var(--panel,#171a1f)}.shared-readonly-banner strong{display:block;font-size:1rem}.shared-readonly-banner p{margin:5px 0 0;color:var(--muted,#b3b6be);font-size:.88rem;line-height:1.65}.shared-readonly-banner .btn{white-space:nowrap;min-height:44px}[data-shared-disabled]{opacity:.4!important;cursor:default!important}@media(max-width:520px){.shared-readonly-banner{align-items:flex-start;flex-direction:column;gap:12px}}@media print{.shared-readonly-banner{display:none!important}}';document.head.append(style);
 new MutationObserver(schedule).observe(document.body,{subtree:true,childList:true});window.addEventListener('uk:languagechange',refresh);
 window.SharedCampaignControls={refresh,blocked,editOwn,originalGang};schedule();
})();
