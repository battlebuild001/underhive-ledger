/* Campaign-scoped purchases use the existing roster purchase engine and owned originals. */
(function(){
'use strict';
const E=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const L=(en,ko)=>`<span data-i18n-en="${E(en)}" data-i18n-ko="${E(ko)}">${E(en)}</span>`;
const text=(en,ko)=>window.UKI18n?.language==='en'?en:ko;
const rule=id=>(window.RULES_DATA?.coreRules||[]).find(r=>r.id===id&&r.source_verified);
const ed=o=>String(o?.edition||o?.edition_slug||'').toUpperCase(),copy=o=>JSON.parse(JSON.stringify(o));
const flagged=v=>v===true||v==='true';
const whole=n=>Number.isSafeInteger(Number(n))&&Number(n)>=0;
const isOwned=g=>g&&!g.remoteReadOnly&&(!g.remoteOwnerId||g.remoteOwnerId===window.AccountParity?.account?.id);
const usable=f=>f&&!['Dead','Retired','Captured','Enslaved','Destroyed'].includes(f.status)&&!['killed','retired','captured','enslaved','destroyed'].some(k=>f[k]===true||f[k]==='true');
let draft=null;
function candidates(c){
 const result=[],me=window.AccountParity?.account?.id;
 for(const m of c?.members||[]){
  const linked=data.gangs.find(g=>g.id===m.gangId);
  const g=isOwned(linked)?linked:linked?.remoteReadOnly&&me&&(linked.sourceOwnerId||linked.ownerId||linked.remoteOwnerId)===me?data.gangs.find(g=>g.id===linked.sourceGangId&&isOwned(g)):null;
  if(g&&ed(g)===ed(c)&&!result.some(x=>x.g.id===g.id))result.push({g,m});
 }
 return result;
}
function resolve(ctx){const c=data.campaigns.find(c=>c.id===ctx?.campaignId),entry=candidates(c).find(x=>x.g.id===ctx?.gangId);return c&&entry?{c,...entry}:null;}
function visitorTP(f,c){
 if(ed(c)!=='N26'||!usable(f)||['In Recovery','Critically Injured','Critically Damaged'].includes(f.status)||f.inRecovery===true)return 0;
 const type=(window.RULES_DATA?.fighterTypes||[]).find(t=>t.id===f.fighterTypeId||t.id===f.catalogTypeId||t.id===f.presetId);
 const subtypes=f.subtypes??f.fighter_subtypes??type?.fighter_subtypes??[],names=Array.isArray(subtypes)?subtypes:String(subtypes).split(',').map(s=>s.trim());
 const tp=rule('n26-core-visit-trading-post')?.rule_data?.trade_points||{};
 return names.includes('Leader')?Number(tp.Leader)||0:names.includes('Champion')?Number(tp.Champion)||0:0;
}
function activeVisit(g,c){const v=g.tradingPostVisit;return v&&!v.closedAt&&v.campaignId===(c.remoteCampaignId||c.id)&&(!v.cycle||Number(v.cycle)===Number(window.MMCampaignAutomation?.cycle(c)||c.currentCycle||1))?v:null;}
function sourceItems(ctx,f){return window.FighterParity.equipmentFor(f,'trading',ctx);}
function validatePurchase(ctx,{f,a,stash,v}={}){
 const resolved=resolve(ctx),bad=text('This gang or campaign changed. Reopen the Trading Post.','갱 또는 캠페인이 변경되었습니다. 거래소를 다시 여세요.');
 if(ctx.committed||!resolved||data.selectedGang!==ctx.gangId||data.view!=='campaign'||data.selectedCampaign!==ctx.campaignId||resolved.c.phase==='Closed')return bad;
 const {g,c}=resolved;
 if(ctx.accountId!==(window.AccountParity?.account?.id||null)||ctx.gangObject!==g||ctx.campaignObject!==c)return bad;
 if(ctx.visitId&&activeVisit(g,c)?.id!==ctx.visitId)return bad;
 if(g.tradingPostVisit&&!g.tradingPostVisit.closedAt&&!activeVisit(g,c))return text('Finish the open Trading Post step in the other campaign first.','다른 캠페인에서 열린 거래소 단계를 먼저 종료하세요.');
 if(!whole(g.credits)||ed(g)==='N26'&&!whole(g.tradePoints??0))return text('Correct the gang’s recorded credits / TP before buying.','구매 전에 갱의 크레딧·TP 기록을 확인하세요.');
 if(stash!==!ctx.fighterId||f!==(ctx.fighterId?g.fighters.find(x=>x.id===ctx.fighterId):null)||f&&!usable(f))return bad;
 const current=sourceItems(ctx,f).find(x=>x.id===a?.id);
 if(!current||JSON.stringify(current)!==JSON.stringify(a)||flagged(current.banned)||current.purchase_available===false||window.FighterParity.knownEquipmentPrice(current)===null||!whole(current.cost)||current.cost_resource_name||current.resourceType||!whole(current.tradePoints??current.trade_points??0))return text('This item is unavailable or its campaign price changed. Reopen the list.','구매할 수 없거나 캠페인 가격이 변경된 품목입니다. 목록을 다시 여세요.');
 if(v){
  if(!whole(v.cost)||Number(v.cost)!==Number(current.cost)||ed(g)==='N26'&&(!whole(v.tradePoints)||Number(v.tradePoints)!==Number(current.tradePoints??current.trade_points??0)))return text('Use the listed campaign price and TP.','캠페인에 표시된 가격과 TP를 사용하세요.');
  if(f&&v.campaignEquipmentAccessConfirmed!=='yes')return text('Check the recipient’s equipment restrictions first.','받을 파이터의 장비 제한과 예외를 먼저 확인하세요.');
 }
 return '';
}
function purchased(ctx,{item,cost,tp}){
 const {g,c}=resolve(ctx),at=now();ctx.committed=true;
 item.purchaseContext={...(item.purchaseContext||{}),campaignId:c.remoteCampaignId||c.id,campaignName:c.name,gangId:g.id,recipientType:ctx.fighterId?'fighter':'stash',recipientId:ctx.fighterId||g.id,visitId:ctx.visitId||null};
 g.tradingPostTransactions??=[];
 g.tradingPostTransactions.push({id:id(),at,campaignId:c.remoteCampaignId||c.id,campaignName:c.name,gangId:g.id,itemId:item.id,catalogId:item.catalogId,name:item.name,credits:cost,tradePoints:tp,recipientId:ctx.fighterId||'',recipientName:ctx.fighterId?g.fighters.find(f=>f.id===ctx.fighterId)?.name||'':null,postId:item.price_context||null,visitId:ctx.visitId||null});
 const next={...ctx.draft,notice:{name:item.name,catalogId:item.catalogId,cost,tp}};
 setTimeout(()=>{if(data.view==='campaign'&&data.selectedCampaign===ctx.campaignId&&!document.querySelector('.modal-bg'))open(ctx.campaignId,next);},0);
}
function button(action,en,ko,attrs='',cls=''){return `<button type="button" class="btn small ${cls}" data-campaign-trade="${action}" ${attrs}>${L(en,ko)}</button>`;}
function submitLabel(en,ko){const b=document.getElementById('modal-submit');b.dataset.i18nEn=en;b.dataset.i18nKo=ko;b.textContent=text(en,ko);}
function recordedName(row){const source=(window.RULES_DATA?.equipment||[]).find(a=>a.id===row.catalogId&&a.name===row.name);return source?nameMarkup(source):`<span data-user-text>${E(row.name)}</span>`;}
function nameMarkup(row){return row.source_verified?L(row.name,row.name_ko||row.name):`<span data-user-text>${E(row.name)}</span>`;}
function guide(c){return `<details class="ctp-guide"><summary>${L('How to use · rules & example','사용 순서·룰·예시')}</summary><ol><li>${L('Choose your gang and where the equipment goes. A stash purchase changes Wealth; equipment assigned to a fighter also changes that fighter’s value and Gang Rating.','갱과 장비를 받을 대상을 고르세요. 보관함 구매는 자산에, 파이터에게 장비를 주면 해당 파이터 가치와 갱 레이팅에도 반영됩니다.')}</li><li>${L('Only Trading Posts authorised in this campaign are listed. Gang-only and unrestricted lists are available in the normal roster, outside this shop.','이 캠페인이 허용한 거래소의 품목만 표시합니다. 갱 전용·제한 없음 목록은 일반 로스터에서 별도로 이용하세요.')}</li>${ed(c)==='N26'?`<li>${L('Record completed Visit Trading Post actions: an eligible Leader adds 2 TP, a Champion 1 TP. Each model has one Post-cycle action; recovering or critically injured models cannot act. Confirm that visitors did not perform another action.','완료한 방문 행동을 기록하세요. 자격 있는 리더는 2TP, 챔피언은 1TP를 더합니다. 모델당 사이클 종료 후 행동은 1회이며 회복 중·치명적 부상 모델은 수행할 수 없습니다. 다른 행동에 쓰지 않은 방문자인지 확인하세요.')}</li><li>${L('Spend the listed credits and TP together. E means an exclusive gang-list item and is not a numeric TP cost. Finish this step to clear unused TP; closing the shop only pauses it.','표시된 크레딧과 TP를 함께 지불합니다. E는 갱 전용 장비 표시이며 TP 비용이 아닙니다. 구매를 마치면 거래소 방문을 종료하세요. 사용하지 않은 TP는 사라집니다. 창을 닫아도 방문은 끝나지 않습니다.')}</li>`:''}</ol><p>${L('Example: buying a 20-credit / 0-TP autogun with 100 credits leaves 80 credits. Buy into the stash or select a fighter before confirming. The same original roster is updated; no second gang is created.','예: 100크레딧에서 20크레딧·0TP인 오토건을 사면 잔액은 80입니다. 보관함 또는 받을 파이터를 고른 뒤 확정하세요. 선택한 갱의 명단에 장비가 추가됩니다.')}</p><p>${L('This shop checks money, TP and ownership. Check the receiving fighter’s own weapon / armour / accessory restrictions and exceptions before equipping.','이 거래소는 잔액·TP·소유권을 확인합니다. 장비를 줄 때는 파이터 고유 무장·아머·액세서리 제한과 예외도 확인하세요.')}</p>${ed(c)==='N26'?button('rule','Verified N26 Trading Post rule','확인된 N26 거래소 룰'):''}</details>`;}
function open(campaignId,previous={}){
 const c=data.campaigns.find(c=>c.id===campaignId);if(!c)return;
 const entries=candidates(c),chosen=entries.find(x=>x.g.id===previous.gangId)||entries[0],g=chosen?.g;
 draft={campaignId,gangId:g?.id||'',recipient:previous.recipient||'',query:previous.query||'',category:previous.category||'',page:previous.page||0,notice:previous.notice||null};
 if(g&&!g.fighters?.some(f=>f.id===draft.recipient&&usable(f)))draft.recipient='';
 closeModal();
 const top=`<div class="ctp-intro">${L('Buy here to update your original roster and balances.','구매한 장비와 사용한 크레딧이 해당 갱 명단에 저장됩니다.')}</div>`;
 const controls=g?`<div class="ctp-selectors"><label>${L('Gang','이용할 갱')}<select name="ctpGang">${entries.map(x=>`<option value="${E(x.g.id)}" ${x.g.id===g.id?'selected':''} data-user-text>${E(x.g.name)}</option>`).join('')}</select></label><label>${L('Receive equipment in','장비 장비를 받을 대상')}<select name="ctpRecipient"><option value="" data-i18n-en="Gang stash" data-i18n-ko="갱 보관함">Gang stash</option>${g.fighters.filter(usable).map(f=>`<option value="${E(f.id)}" ${f.id===draft.recipient?'selected':''} data-user-text>${E(f.name)}</option>`).join('')}</select></label></div><div class="ctp-balance"><span>${L('Credits','크레딧')} <b>${E(fmt(g.credits))}</b></span>${ed(c)==='N26'?`<span>TP <b>${E(fmt(g.tradePoints||0))}</b></span>`:''}${button('roster','Open roster','로스터 보기')}</div>${ed(c)==='N26'?`<div class="ctp-visit-actions">${button('visit','Record visit · gain TP','방문 기록·TP 받기',c.phase==='Closed'?'disabled':'')}${activeVisit(g,c)?button('end','Finish step · expire TP','단계 종료·TP 소멸'):''}</div>`:''}<div class="ctp-filters"><input name="ctpSearch" type="search" value="${E(draft.query)}" placeholder="Search equipment" data-i18n-ko-placeholder="장비 검색" aria-label="Search equipment" data-i18n-ko-aria-label="장비 검색"><select name="ctpCategory" aria-label="Equipment category" data-i18n-ko-aria-label="장비 분류"><option value="" data-i18n-en="All categories" data-i18n-ko="모든 분류">All categories</option></select></div><p class="ctp-result-count muted" role="status"></p><div class="ctp-items"></div><div class="ctp-pages"></div><details class="ctp-history"><summary>${L('This gang’s campaign transactions','이 갱의 캠페인 거래 내역')}</summary>${history(g,c)}</details>`:`<p class="muted">${L('No editable original gang is linked to your account in this campaign. Add your gang first. Shared snapshots belonging to other players cannot be purchased into.','먼저 내 갱을 캠페인에 참가시키세요. 이 화면에서는 내 갱의 장비만 구매할 수 있습니다.')}</p>`;
 showModal(L('Campaign Trading Post','캠페인 트레이딩 포스트'),`<div class="ctp-root" data-campaign-trading-root data-campaign-id="${E(c.id)}">${top}${previous.notice?`<p class="ctp-notice" role="status">${L('Purchase saved to roster','구매 완료')}: ${recordedName(previous.notice)} · −${E(previous.notice.cost)} cr · −${E(previous.notice.tp)} TP</p>`:''}${c.phase==='Closed'?`<p class="ctp-error">${L('This campaign is closed. Purchases and visits are disabled.','종료된 캠페인입니다. 구매와 방문 기록은 사용할 수 없습니다.')}</p>`:''}${controls}${guide(c)}<p class="ctp-error" role="alert" hidden></p></div>`,'Close',()=>true);submitLabel('Close','닫기');
 const modal=document.querySelector('.modal-bg .modal');modal.classList.add('ctp-modal');modal.querySelector('#modal-cancel').hidden=true;
 if(!g){window.UKI18n?.refresh();return;}
 data.selectedGang=g.id;
 const root=modal.querySelector('.ctp-root'),select=root.querySelector('[name=ctpCategory]');
 const items=sourceItems(draft,draft.recipient?g.fighters.find(f=>f.id===draft.recipient):null);
 const cats=[...new Set(items.map(x=>x.category||x.equipment_type||x.equipmentType||'Equipment'))].sort();
 select.insertAdjacentHTML('beforeend',cats.map(cat=>`<option value="${E(cat)}" data-i18n-catalog-name="${E(cat)}">${E(cat)}</option>`).join(''));select.value=cats.includes(draft.category)?draft.category:'';draft.category=select.value;
 root.querySelector('[name=ctpSearch]').addEventListener('input',e=>{draft.query=e.target.value;draft.page=0;draw(root,c,g);});
 root.querySelector('[name=ctpCategory]').addEventListener('change',e=>{draft.category=e.target.value;draft.page=0;draw(root,c,g);});
 root.querySelector('[name=ctpGang]').addEventListener('change',e=>open(c.id,{gangId:e.target.value}));
 root.querySelector('[name=ctpRecipient]').addEventListener('change',e=>open(c.id,{...draft,recipient:e.target.value,notice:null,page:0}));
 draw(root,c,g);window.UKI18n?.refresh();
}
function history(g,c){const rows=(g.tradingPostTransactions||[]).filter(t=>t.campaignId===(c.remoteCampaignId||c.id)).slice(-30).reverse();return rows.map(t=>`<div class="ctp-history-row"><strong>${recordedName(t)}</strong><small><span data-user-text>${E(t.recipientName||'')}</span>${!t.recipientName?L('Gang stash','갱 보관함'):''} · −${E(t.credits)} cr · −${E(t.tradePoints)} TP</small></div>`).join('')||`<p class="muted">${L('No purchases yet.','아직 구매 내역이 없습니다.')}</p>`;}
function draw(root,c,g){
 const f=draft.recipient?g.fighters.find(f=>f.id===draft.recipient):null,q=draft.query.trim().toLowerCase();
 const all=sourceItems(draft,f).filter(a=>(!draft.category||(a.category||a.equipment_type||a.equipmentType||'Equipment')===draft.category)&&(!q||(window.UKI18n?.matches?UKI18n.matches(a.name,q):a.name.toLowerCase().includes(q))));
 const size=20,pages=Math.max(1,Math.ceil(all.length/size));draft.page=Math.max(0,Math.min(draft.page,pages-1));
 root.querySelector('.ctp-result-count').innerHTML=`${L('Items','품목')} ${all.length} · ${draft.page+1} / ${pages}`;
 root.querySelector('.ctp-items').innerHTML=all.slice(draft.page*size,(draft.page+1)*size).map(a=>{const tp=a.tradePoints??a.trade_points??0,price=window.FighterParity.knownEquipmentPrice(a),blocked=c.phase==='Closed'||flagged(a.banned)||a.purchase_available===false||price===null||!whole(price)||!whole(tp)||!!(a.cost_resource_name||a.resourceType),poor=!blocked&&(Number(g.credits)<price||ed(g)==='N26'&&Number(g.tradePoints||0)<Number(tp));return `<article class="ctp-item"><div class="ctp-item-head"><div><strong>${nameMarkup(a)}</strong><small>${price===null?'—':E(price)} cr${ed(g)==='N26'?` · ${E(tp)} TP`:''}</small></div>${button('buy',poor?'Insufficient funds':'Buy',poor?'잔액 부족':'구매',`data-item="${E(a.id)}" ${blocked||poor?'disabled':''}`)}</div><details><summary>${L('Specs · explanation','스펙·설명')}</summary>${window.MMWeaponImages?.pickerButton(a,{edition:g.edition})||''}${window.FighterParity.stashProfiles(a,g.edition)}${button('item-rule','Equipment rule','장비 룰',`data-item="${E(a.id)}"`)}</details>${blocked?`<small class="muted">${L('Check availability, verified price and exclusive-list restrictions.','구매 가능 여부·확인 가격·전용 목록 제한을 확인하세요.')}</small>`:''}</article>`;}).join('')||`<p class="muted">${L('No equipment in this campaign matches. Check authorised Trading Posts in campaign settings.','이 캠페인에서 조건에 맞는 품목이 없습니다. 캠페인 설정의 허용 거래소를 확인하세요.')}</p>`;
 root.querySelector('.ctp-pages').innerHTML=pages>1?button('previous','Previous','이전',draft.page===0?'disabled':'')+button('next','Next','다음',draft.page===pages-1?'disabled':''):'';
 window.UKI18n?.refresh(root);
}
function context(){const r=resolve(draft);if(!r||data.view!=='campaign'||data.selectedCampaign!==draft.campaignId)return null;return r;}
function fail(message){const node=document.querySelector('.ctp-root>.ctp-error[role=alert]');if(node){node.hidden=false;node.textContent=message;}else window.alert(message);}
function visit(){
 const r=context();if(!r||r.c.phase==='Closed')return;const {c,g}=r,back=copy(draft),existing=activeVisit(g,c),other=g.tradingPostVisit;
 if(other&&!other.closedAt&&!existing)return fail(text('Finish the open Trading Post step in the other campaign first.','다른 캠페인에서 열린 거래소 단계를 먼저 종료하세요.'));
 const options=g.fighters.filter(f=>visitorTP(f,c)>0&&!existing?.visitors.some(v=>v.fighterId===f.id));
 closeModal();formModal(L('Record completed Trading Post visits','완료한 거래소 방문'),`<p class="wide">${L('Select eligible models that completed this action and have not used their Post-cycle action elsewhere. Each model is recorded once in this open step.','이 행동을 완료했고 다른 사이클 종료 후 행동에 사용하지 않은 모델을 고르세요. 현재 열린 단계에서는 모델당 한 번만 기록됩니다.')}</p>${options.map(f=>`<label class="checkline wide"><input type="checkbox" name="visitor" value="${E(f.id)}"><span data-user-text>${E(f.name)}</span><b>+${visitorTP(f,c)} TP</b></label>`).join('')||`<p>${L('No eligible unrecorded visitors.','이번 사이클에 거래소를 방문할 수 있는 파이터가 없습니다.')}</p>`}<label class="checkline wide"><input type="checkbox" name="confirmed" value="yes">${L('These actions were completed this Post-cycle; no other action was used.','이번 사이클 종료 후에 방문 행동을 완료했고 다른 행동에 사용하지 않았습니다.')}</label><p class="ctp-error wide" role="alert" hidden></p>`,v=>{
  const live=resolve(back),form=document.querySelector('#modal-form'),ids=[...form.querySelectorAll('[name=visitor]:checked')].map(x=>x.value),current=live&&activeVisit(live.g,live.c),deny=m=>{const n=form.querySelector('.ctp-error');n.hidden=false;n.textContent=m;return false;};
  if(!live||live.g!==g||live.c!==c||c.phase==='Closed'||!whole(g.tradePoints??0))return deny(text('The roster changed. Reopen the shop.','명단이 변경되었습니다. 거래소를 다시 여세요.'));
  if(v.confirmed!=='yes'||!ids.length||ids.some(fid=>!options.some(f=>f.id===fid)||!visitorTP(g.fighters.find(f=>f.id===fid),c)||current?.visitors.some(v=>v.fighterId===fid)))return deny(text('Choose eligible visitors and confirm their actions.','거래소를 방문할 수 있는 파이터를 고르고 방문을 확인하세요.'));
  const visitors=ids.map(fid=>{const f=g.fighters.find(f=>f.id===fid);return {fighterId:fid,name:f.name,tp:visitorTP(f,c)};}),gain=visitors.reduce((s,v)=>s+v.tp,0);
  if(!whole(Number(g.tradePoints||0)+gain))return deny(text('Invalid TP total.','TP 합계를 확인하세요.'));
  try{window.MMCampaignEconomy?.assertTradeVisitors(c,g,ids);}catch(e){return deny(e.message)}
  g.tradingPostVisit=current||{id:id(),campaignId:c.remoteCampaignId||c.id,openedAt:now(),cycle:window.MMCampaignAutomation?.cycle(c)||c.currentCycle||1,closedAt:null,visitors:[]};g.tradingPostVisit.visitors.push(...visitors);g.tradePoints=Number(g.tradePoints||0)+gain;window.MMCampaignEconomy?.recordTradeVisitors(c,g,visitors);log(g,`${c.name}: Visit Trading Post +${gain} TP (${visitors.map(v=>v.name).join(', ')})`);save();setTimeout(()=>open(c.id,back),0);return true;
 },'Record visits');submitLabel('Record visits','방문 기록');
 returnToShop(back);window.UKI18n?.refresh();
}
function returnToShop(back){for(const id of ['modal-close','modal-cancel'])document.getElementById(id).onclick=()=>open(back.campaignId,back);}
function end(){const r=context();if(!r)return;const {g,c}=r,v=activeVisit(g,c);if(!v)return;const back=copy(draft);closeModal();showModal(L('Finish Trading Post step','거래소 단계 종료'),`<p>${L('Finish this sub-step and expire all unused TP? Closing the shop without finishing keeps this step open.','이 단계를 끝내고 남은 TP를 모두 소멸시킬까요? 창만 닫으면 현재 단계를 유지합니다.')}</p><strong>${E(g.tradePoints||0)} TP → 0</strong>`,'Finish step',()=>{const live=resolve(back);if(!live||live.g!==g||activeVisit(g,c)!==v)return false;v.closedAt=now();v.expiredTP=Number(g.tradePoints||0);g.tradePoints=0;log(g,`${c.name}: Trading Post step finished; ${v.expiredTP} TP expired`);save();setTimeout(()=>open(c.id,back),0);return true;});submitLabel('Finish step','단계 종료');returnToShop(back);window.UKI18n?.refresh();}
window.addEventListener('click',e=>{
 const b=e.target.closest?.('[data-campaign-trade]');if(!b||b.disabled)return;e.preventDefault();e.stopImmediatePropagation();
 const action=b.dataset.campaignTrade;if(action==='open')return open(b.dataset.campaignId);
 const r=context();if(!r)return;const {g,c}=r;
 if(action==='rule')return window.MMRuleReference?.open('coreRules','n26-core-visit-trading-post',{edition:'n26',activator:b,nested:true});
 if(action==='item-rule')return window.MMRuleReference?.open('equipment',b.dataset.item,{edition:c.edition,activator:b,nested:true});
 if(action==='visit')return visit();if(action==='end')return end();
 if(action==='roster'){closeModal();data.selectedGang=g.id;data.view='gang';data.tab=draft.recipient?'fighters':'stash';save();return;}
 if(action==='previous'||action==='next'){draft.page+=action==='next'?1:-1;draw(document.querySelector('.ctp-root'),c,g);document.querySelector('.ctp-items')?.scrollIntoView({block:'start'});return;}
 if(action==='buy'){
  const f=draft.recipient?g.fighters.find(f=>f.id===draft.recipient):null,a=sourceItems(draft,f).find(a=>a.id===b.dataset.item);if(!a)return;
  const ctx={campaignId:c.id,gangId:g.id,fighterId:f?.id||'',accountId:window.AccountParity?.account?.id||null,gangObject:g,campaignObject:c,visitId:activeVisit(g,c)?.id||null,draft:copy(draft)},err=validatePurchase(ctx,{f,a,stash:!f});if(err)return fail(err);
  const back=copy(draft);return window.FighterParity.purchaseEquipment(f,a,!f,()=>open(c.id,back),ctx);
 }
},true);
// Synchronous read-only quoting for transaction drafts. The existing access/price engine
// still resolves campaign posts, custom overrides, recipient and edition together.
function catalogueItems(c,g,f,{mode='trading',gangs=data.gangs}={}){
 const original=data,workingGang=copy(g),workingCampaign=copy(c),recipient=f?workingGang.fighters?.find(row=>row.id===f.id)||copy(f):null;
 try{
  data={...original,customAssets:copy(original.customAssets||{}),selectedGang:workingGang.id,edition:workingGang.edition,gangs:[...copy(gangs.filter(row=>row.id!==g.id)),workingGang],campaigns:[workingCampaign]};
  return copy(window.FighterParity.equipmentFor(recipient,mode==='fighter_list'?'gang':'trading',{campaignId:workingCampaign.id}));
 }finally{data=original;}
}
window.MMCampaignTrading={open,candidates,validatePurchase,purchased,visitorTP,catalogueItems};
})();
