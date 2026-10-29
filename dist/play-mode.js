/* A read-only tabletop reference view. Its filters never enter account or battle records. */
(function(){'use strict';
const R=()=>window.RULES_DATA||{},E=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),L=(en,ko)=>`<span data-i18n-en="${E(en)}" data-i18n-ko="${E(ko)}">${E(en)}</span>`,literal=s=>`<span data-user-text>${E(s)}</span>`,ed=g=>String(g?.edition||'').toLowerCase(),norm=s=>String(s||'').normalize('NFKC').trim().toLowerCase();
let active=null,bindings=new Map();
const account=()=>window.AccountParity?.account?.id||'',isActive=g=>!!g&&active?.gangId===g.id&&active?.account===account();
function title(row){if(!row)return '';const name=row.name||row.equipment_name||'';return row.is_custom||row.reference_custom_name?literal(name):L(name,row.name_ko&&/[가-힣]/.test(row.name_ko)?row.name_ko:window.UKI18n?.name(name)||name);}
function model(f,g){return window.MMVerifiedRules?.modelType(f,g)||null;}
const values=value=>Array.isArray(value)?value.map(x=>typeof x==='string'?{name:x}:x).filter(x=>x&&x.name):typeof value==='string'?[{name:value}]:[];
function register(kind,query,g){const key=String(bindings.size);bindings.set(key,{kind,query,edition:ed(g)});return key;}
function prose(row,kind,g){
 const api=window.MMRuleReference,info=api?.details(row,{kind,edition:ed(g)});
 if(info?.definitionStatus==='cleared')return `<p class="pm-empty">${L('Description deliberately left blank.','설명을 비워 둔 항목입니다.')}</p>`;
 const text=info?.description||row?.description||row?.effect||'';
 if(!text)return `<p class="pm-empty">${L('No description recorded. Open the entry for any available conditions.','등록된 설명이 없습니다. 항목을 누르면 확인된 추가 조건을 볼 수 있습니다.')}</p>`;
 if(info?.custom||row.is_custom||row.reference_custom_description)return `<p class="pm-authored" data-user-text>${E(text)}</p>`;
 return window.MMRuleTerms?.prose(row.description_en||text,text,{kind,row,edition:ed(g)})||`<p>${E(text)}</p>`;
}
function entry(kind,query,g,category){
 const found=window.MMRuleReference?.lookup(kind,query,{edition:ed(g)}),row=found||{...query,is_custom:true},key=register(kind,query,g);
 return `<article class="pm-rule-entry"><button type="button" class="pm-rule-title" data-play-ref="${key}" aria-haspopup="dialog">${title(row)}</button>${category?`<small>${L(...category)}</small>`:''}${prose(row,kind,g)}</article>`;
}
function skillQueries(f){
 const details=f.skillDetails||[],seen=new Set(),ids=new Set(equipment(f).items.map(e=>e.id));return values(f.skills).flatMap(item=>{const matches=details.filter(d=>[d.name,d.name_ko].includes(item.name)),eligible=matches.filter(d=>!d.sourceEquipmentId||ids.has(d.sourceEquipmentId));if(matches.length&&!eligible.length||item.sourceEquipmentId&&!ids.has(item.sourceEquipmentId))return [];const detail=eligible.find(d=>!d.sourceEquipmentId)||eligible[0],query={...detail,...item,skillId:item.skillId||detail?.skillId};const key=query.skillId||query.name;if(seen.has(key))return[];seen.add(key);return[query];});
}
function specialQueries(f,g){
 const type=model(f,g),details=f.specialRulesDetails??f.special_rules_details??[],own=f.specialRules??f.special_rules,names=own!=null?values(own).map(x=>x.name):window.FighterParity?.specialRulesFor(f)||[];
 const ids=new Set(equipment(f).items.map(e=>e.id));return [...new Set(names)].flatMap(name=>{const record=Array.isArray(details)?details.find(d=>d.name===name||d.name_ko===name):null;const authored=values(own).find(r=>r.name===name)||{};const query={...record,...authored,name:authored.name||record?.name||name,fighterTypeId:type?.id||f.fighterTypeId||f.catalogTypeId||f.presetId,edition:ed(g)};return query.sourceEquipmentId&&!ids.has(query.sourceEquipmentId)?[]:[query];});
}
function equipment(f){return window.RosterParity?.activeEquipment(f)||{items:f.equipment||[],loadout:null};}
function statValue(key,value,g){
 if(value==null||value==='')return '—';const s=String(value);if(key==='M')return /["″]$/.test(s)?s:s+'"';
 if(['WS','BS','Sv',...(ed(g)==='n26'?[]:['I','Ld','Cl','Wil','Int'])].includes(key)){if((key==='BS'||key==='Sv')&&Number(value)===0)return '—';return /^[\d.]+$/.test(s)?s+'+':s;}
 return ed(g)==='n26'&&['I','Ld','Cl','Wil','Int'].includes(key)?s.replace(/\+$/,''):s;
}
function stats(f,g,items){
 const computed=window.RosterParity?.stats(f,items)||{...f.stats},physical=['M','WS','BS','S','T','W','I','A'],mental=[...(ed(g)==='n26'?['Sv']:[]),'Ld','Cl','Wil','Int'];
 const cell=key=>`<div class="pm-stat" data-play-stat="${key}"><dt>${ed(g)==='n26'?`<button type="button" data-mm-help="characteristic.${key}" data-mm-help-edition="n26"><span data-i18n-ignore>${key}</span></button>`:`<span data-i18n-ignore>${key}</span>`}</dt><dd>${E(statValue(key,computed[key],g))}</dd></div>`;
 return `<div class="pm-stats"><dl class="pm-physical">${physical.map(cell).join('')}</dl><dl class="pm-mental">${mental.map(cell).join('')}<div class="pm-stat pm-xp"><dt>XP</dt><dd>${E(window.MMVerifiedRules?.xpDisplay?.(f,g)||(f.xp??'—'))}</dd></div></dl></div>`;
}
function equipmentBlock(item,g){
 const row=window.MMRuleReference?.lookup('equipment',item,{edition:ed(g)}),query=row?item:{...item,is_custom:true},key=register('equipment',query,g),body=window.FighterParity?.stashProfiles(item,g.edition)||'';
 return `<section class="pm-equipment"><button type="button" class="pm-rule-title" data-play-ref="${key}" aria-haspopup="dialog">${title(row||{...item,is_custom:true})}</button>${body||prose(row||{...item,is_custom:true},'equipment',g)}</section>`;
}
function fold(f,key,en,ko,count,body){
 const opened=active?.sections?.get(JSON.stringify([f.id,key]))===true;
 return `<details class="pm-section pm-collapsible" data-play-section="${E(key)}"${opened?' open':''}><summary>${L(en,ko)} <small>${count}</small></summary><div class="pm-section-body">${body}</div></details>`;
}
function card(f,g){
 const {items,loadout}=equipment(f),type=model(f,g),subtypes=Array.isArray(f.subtypes)?f.subtypes:Array.isArray(f.fighter_subtypes)?f.fighter_subtypes:type?.fighter_subtypes||[],skills=skillQueries(f),rules=specialQueries(f,g),missing=window.MMStartingSkills?.missing(f,g)||[],pending=window.MMStartingSkills?.pendingPrimary(f,g),portrait=window.FighterParity?.portraitSource(f),key=register('fighterTypes',type||{name:f.type,is_custom:true},g),status=f.status||'Active';
 const subtypeRows=subtypes.map(name=>window.MMRuleReference?.lookup('fighterSubtypes',name,{edition:ed(g)})).filter(Boolean);
 const grantedRules=items.flatMap(e=>values(e.grantedSpecialRules)).filter((r,i,a)=>a.findIndex(x=>x.name===r.name)===i);
 const aliases=(kind,q)=>{const row=window.MMRuleReference?.lookup(kind,q,{edition:ed(g)});return [q.name,row?.name,row?.name_ko].filter(Boolean).join(' ');};const search=[f.name,f.type,type?.name,type?.name_ko,status,window.UKI18n?.t(status,'ko'),...skills.map(x=>aliases('skills',x)),...rules.map(x=>aliases('specialRules',x)),...subtypes.map(name=>aliases('fighterSubtypes',{name}))].join(' ');
 return `<article class="pm-unit" data-play-unit="${E(f.id)}" data-play-search="${E(search)}"><header class="pm-unit-head">${portrait?`<img src="${E(portrait)}" alt="" loading="lazy">`:''}<div><h2 data-user-text>${E(f.name)}</h2><button type="button" class="pm-type" data-play-ref="${key}">${type&&[type.name,type.name_ko,window.UKI18n?.name(type.name)].includes(f.type)?title(type):literal(f.type||'—')}</button>${f.specialisationName||f.specialisation?`<p>${literal(f.specialisationName||f.specialisation)}</p>`:''}</div><span class="pm-status">${L(status,window.UKI18n?.t(status,'ko')||status)}</span></header>${stats(f,g,items)}<p class="pm-loadout">${loadout?`${L('Equipment set','장비 세트')}: ${literal(loadout.name)}`:L('No set selected · showing owned equipment','세트 미선택 · 보유 장비 기준')}</p>
 <section class="pm-section pm-weapons" data-play-section="weapons"><h3>${L('Equipment & weapon profiles','무장·장비 프로필')} <small>${items.length}</small></h3>${items.length?items.map(item=>equipmentBlock(item,g)).join(''):`<p class="pm-empty">${L('No equipment in this set.','이 세트에 장비가 없습니다.')}</p>`}</section>
 ${fold(f,'skills','Skills','스킬',skills.length,`${skills.length?skills.map(q=>entry('skills',q,g)).join(''):`<p class="pm-empty">${L('No recorded skills.','등록된 스킬이 없습니다.')}</p>`}${missing.length||pending?`<aside class="pm-warning">${L('Starting choices to check','시작 항목 확인')}${missing.length?`<p>${L('Missing fixed skills','미등록 고정 스킬')}: ${missing.map(x=>title(x.skill)).join(' · ')}</p>`:''}${pending?`<p>${L('A starting Primary choice is still unrecorded.','시작 프라이머리 선택이 아직 기록되지 않았습니다.')}</p>`:''}</aside>`:''}`)}
 ${fold(f,'unit-rules','Unit rules','유닛 룰',rules.length+grantedRules.length,`${rules.length?rules.map(q=>entry('specialRules',q,g)).join(''):!grantedRules.length?`<p class="pm-empty">${L('No recorded special rules.','등록된 특수 룰이 없습니다.')}</p>`:''}${grantedRules.map(q=>entry('specialRules',q,g,['Active equipment grant','선택 장비의 지급 룰'])).join('')}`)}
 ${fold(f,'class-rules','Class rules','클래스 룰',subtypeRows.length,subtypeRows.length?subtypeRows.map(r=>entry('fighterSubtypes',r,g,['Subtype rule','분류 룰'])).join(''):`<p class="pm-empty">${L('No recorded class rules.','등록된 클래스 룰이 없습니다.')}</p>`)}${f.injuries?.length?`<section class="pm-section pm-injuries"><h3>${L('Lasting injuries','지속 부상')}</h3>${f.injuries.map(r=>entry('injuries',r,g)).join('')}</section>`:''}</article>`;
}
function page(g){
 bindings=new Map();const faction=window.MMVerifiedRules?.gangType(g),fighters=(g.fighters||[]).filter(f=>!f.beastEquipmentStashed&&!f.beast_equipment_stashed),order=g.fighterOrder||[];fighters.sort((a,b)=>{const ai=order.indexOf(a.id),bi=order.indexOf(b.id);return (ai<0?order.length:ai)-(bi<0?order.length:bi);});
 return `<section class="pm-page"><header class="pm-toolbar"><div><p class="pm-eyebrow">${L('PLAY MODE','플레이 모드')} · ${E(String(g.edition||'').toUpperCase())}</p><h1 data-user-text>${E(g.name)}</h1><p>${L('Names, stats, skills and unit rules on one card.','이름·스탯·스킬·유닛 룰을 한 카드에서 확인하세요.')}</p></div><div class="pm-tools"><button type="button" class="btn" data-play-mode="faction">${L('Faction rules','팩션 룰')}</button><button type="button" class="btn primary" data-play-mode="exit">${L('Exit play mode','플레이 모드 종료')}</button></div></header>
 ${faction?.description?`<details class="pm-faction"><summary>${L('Shared faction rules','공통 팩션 룰')}</summary>${prose(faction,'gangTypes',g)}</details>`:''}
 <div class="pm-filter"><label>${L('Find a unit','유닛 찾기')}<input type="search" data-play-search-input value="${E(active.query)}" placeholder="Name, type or skill" data-i18n-en-placeholder="Name, type or skill" data-i18n-ko-placeholder="이름·유형·스킬 검색" autocomplete="off"></label><output aria-live="polite"><strong data-play-count>${fighters.length}</strong> / ${fighters.length}</output><button type="button" class="btn small" data-play-mode="clear" hidden>${L('Clear search','검색 초기화')}</button></div>
 <div class="pm-units">${fighters.map(f=>card(f,g)).join('')}</div><p class="pm-no-results" hidden>${L('No units match this search.','검색에 맞는 유닛이 없습니다.')}</p>${!fighters.length?`<div class="pm-empty-roster">${L('No units have been added to this gang yet. Exit play mode to build the roster.','이 갱에는 아직 유닛이 없습니다. 플레이 모드를 종료한 뒤 명단을 구성하세요.')}</div>`:''}</section>`;
}
function filter(){const host=document.querySelector('.pm-page');if(!host||!active)return;const query=norm(active.query),cards=[...host.querySelectorAll('[data-play-unit]')];let count=0;for(const card of cards){const match=!query||norm(card.dataset.playSearch+' '+card.textContent).includes(query);card.hidden=!match;if(match)count++;}host.querySelector('[data-play-count]').textContent=count;host.querySelector('[data-play-mode=clear]').hidden=!active.query;host.querySelector('.pm-no-results').hidden=count>0||cards.length===0;}
function open(g=gang()){if(!g)return false;active={gangId:g.id,account:account(),query:'',sections:new Map()};render();document.querySelector('.pm-toolbar h1')?.setAttribute('tabindex','-1');document.querySelector('.pm-toolbar h1')?.focus({preventScroll:true});return true;}
function close(){active=null;render();document.querySelector('[data-play-mode="enter"]')?.focus({preventScroll:true});}
const beforeTop=gangTop;gangTop=function(g){return beforeTop(g).replace('<div class="entity-actions main-actions">',`<div class="entity-actions main-actions"><button type="button" class="btn primary" data-play-mode="enter">${L('Play Mode','플레이 모드')}</button>`);};
const beforePage=gangPage;gangPage=function(){const g=gang();return isActive(g)?page(g):beforePage.apply(this,arguments);};
const beforeRender=render;render=function(...args){const result=beforeRender.apply(this,args);filter();return result;};
document.addEventListener('toggle',e=>{const node=e.target;if(!active||!node.matches?.('.pm-collapsible[data-play-section]')||!node.isConnected)return;const unit=node.closest('[data-play-unit]');if(unit)active.sections.set(JSON.stringify([unit.dataset.playUnit,node.dataset.playSection]),node.open);},true);
window.addEventListener('input',e=>{if(!e.target.matches?.('[data-play-search-input]')||!active)return;active.query=e.target.value;filter();});
window.addEventListener('click',e=>{const b=e.target.closest?.('[data-play-mode],[data-play-ref]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();const g=gang();if(b.dataset.playRef!=null){const ref=bindings.get(b.dataset.playRef);if(ref)window.MMRuleReference.open(ref.kind,ref.query,{edition:ref.edition,activator:b});return;}if(b.dataset.playMode==='enter')open();else if(b.dataset.playMode==='exit')close();else if(b.dataset.playMode==='faction')window.MMGangGuide?.openFaction(g);else if(b.dataset.playMode==='clear'&&active){active.query='';const input=document.querySelector('[data-play-search-input]');input.value='';filter();input.focus();}},true);
window.addEventListener('keydown',e=>{if(e.key==='Escape'&&isActive(gang())&&document.querySelector('.pm-page')&&!document.querySelector('.mmrr-overlay,.modal-bg')&&!e.target.matches?.('input,textarea,select')){e.preventDefault();e.stopImmediatePropagation();close();}});
window.addEventListener('uk:languagechange',()=>{if(document.querySelector('.pm-page'))queueMicrotask(filter);});
window.MMPlayMode={open,close,card,skillQueries,specialQueries,isActive};
})();
