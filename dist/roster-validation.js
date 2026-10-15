/* Roster checks use edition data and keep arbitrator exceptions explicit. */
(function(){
'use strict';
const num=value=>Number(value)||0,edition=value=>String(value||'').toLowerCase();
const title=row=>row?.name||row?.fighter_type||row?.equipment_name||'';
const text=(en,ko)=>`<span data-i18n-ko="${esc(ko)}">${esc(en)}</span>`;
const core=(g,id)=>(window.RULES_DATA?.coreRules||[]).find(row=>row.id===`${edition(g.edition)}-core-${id}`)?.rule_data||{};
const matchesEdition=(row,g)=>{const ed=row?.edition_slug||row?.edition;return !ed||edition(ed)===edition(g?.edition)};
function catalogItem(item,g){const rows=window.RULES_DATA?.equipment||[];return rows.find(row=>row.id===(item.catalogId||item.presetId||item.id)&&matchesEdition(row,g))||rows.find(row=>title(item)&&title(row)===title(item)&&matchesEdition(row,g))||item}
function modelType(f,g){return (window.RULES_DATA?.fighterTypes||[]).find(row=>row.id===(f.fighterTypeId||f.catalogTypeId||f.presetId)&&matchesEdition(row,g))||f}
function subtypes(f,g){return f.subtypes?.length?f.subtypes:modelType(f,g).fighter_subtypes||[];}
function profiles(item){return item.weaponProfiles||item.weapon_profiles||item.profiles||[]}
function isWeapon(item,g){const row=catalogItem(item,g),type=item.equipmentType||item.equipment_type||row.equipment_type||'';return type?/^weapons?$/i.test(type):!!profiles(item).length||!!profiles(row).length}
function starred(item,g){const row=catalogItem(item,g);return /\*/.test(title(item)||title(row))||num(row.rule_data?.weapon_slots)===2}
function slotValue(item,g,inventory){
 const row=catalogItem(item,g),config=core(g,'weapon-slots');
 if(!isWeapon(item,g)||/grenade/i.test(item.category||item.equipment_category||row.equipment_category||''))return 0;
 let slots=num(item.rule_data?.weapon_slots??row.rule_data?.weapon_slots)||((starred(item,g)||(edition(g.edition)==='n23'&&profiles(item).concat(profiles(row)).some(p=>/\bUnwieldy\b/i.test(String(p.traits||'')))))?(num(config.starred_weapon_slots)||2):1);
 for(const accessory of inventory){if(accessory.targetEquipmentId!==item.id)continue;const rules=accessory.rule_data||catalogItem(accessory,g).rule_data||{};if(Number.isFinite(Number(rules.weapon_slots_override))&&(!rules.requires_starred_weapon||starred(item,g)))slots=Number(rules.weapon_slots_override)}
 return slots*Math.max(1,num(item.quantity)||1);
}
function weaponSets(f,g){
 if(f.isVehicle||subtypes(f,g).includes('Vehicle'))return [];
 const inventory=f.equipment||[],max=num(core(g,'weapon-slots').fighter_weapon_slots_max)||3;
 const sets=(f.loadouts||[]).length?(f.loadouts||[]).map(loadout=>({id:loadout.id,name:loadout.name,items:inventory.filter(item=>(loadout.equipmentIds||[]).includes(item.id))})):[{id:'carried',name:'',items:inventory}];
 return sets.map(set=>({...set,max,used:set.items.reduce((total,item)=>total+slotValue(item,g,set.items),0)}));
}
function fighterWarnings(f,g){
 const warnings=[];
 for(const set of weaponSets(f,g))if(set.used>set.max)warnings.push({code:'weapon-slots',fighterId:f.id,used:set.used,max:set.max,en:`${f.name}${set.name?' / '+set.name:''}: ${set.used} weapon slots (limit ${set.max}). Check equipment sets or a gang-specific exception.`,ko:`${f.name}${set.name?' / '+set.name:''}: 무기 ${set.used}칸 / 기본 한도 ${set.max}칸. 장비 세트 또는 갱별 예외를 확인하세요.`});
 for(const item of f.equipment||[])if(!matchesEdition(item,g))warnings.push({code:'equipment-edition',fighterId:f.id,en:`${f.name}: ${title(item)} belongs to another edition.`,ko:`${f.name}: ${title(item)}은 다른 판본의 장비입니다.`});
 return warnings;
}
function inspect(g){
 if(!g)return [];
 const warnings=[],models=(g.fighters||[]).filter(f=>!['Dead','Retired','Enslaved','Destroyed'].includes(f.status)),composition=core(g,'gang-composition'),leaders=models.filter(f=>subtypes(f,g).includes('Leader'));
 if(leaders.length>1)warnings.push({code:'duplicate-leader',leaders:leaders.length,en:`${leaders.length} Leaders are on this roster. The usual limit is one; confirm a gang-specific exception with the arbitrator.`,ko:`리더가 ${leaders.length}명입니다. 일반 한도는 1명이므로 갱별 예외를 아비트레이터와 확인하세요.`});
 else if(models.length&&!leaders.length)warnings.push({code:'missing-leader',en:'No Leader is recorded. Check recruitment, succession or a gang-specific exception before play.',ko:'리더가 없습니다. 전투 전에 모집·승계 또는 갱별 예외를 확인하세요.'});
 if(composition.ratio_rule==='limited_total <= all_other_models_excluding_Pets'){
  const counted=models.filter(f=>!subtypes(f,g).some(s=>/^(Pet|Exotic Beast)( Specialist)?$/i.test(s))),limited=counted.filter(f=>subtypes(f,g).some(s=>(composition.ratio_limited_subtypes||[]).includes(s))),other=counted.length-limited.length;
  if(limited.length>other)warnings.push({code:'composition-ratio',limited:limited.length,other,en:`Champions, Brutes and Hangers-on: ${limited.length}; other models: ${other}. Check the gang exception or correct the ratio at the post-cycle recruitment step.`,ko:`챔피언·브루트·행어온 ${limited.length}명 / 그 밖의 모델 ${other}명입니다. 갱별 예외를 확인하거나 포스트 사이클 모집 단계에서 비율을 조정하세요.`});
 }
 for(const fighter of models)warnings.push(...fighterWarnings(fighter,g));
 for(const item of g.stash||[])if(!matchesEdition(item,g))warnings.push({code:'equipment-edition',en:`Stash: ${title(item)} belongs to another edition.`,ko:`보관함: ${title(item)}은 다른 판본의 장비입니다.`});
 return warnings;
}
const signature=warnings=>warnings.map(row=>row.code+':'+row.en).sort().join('|');
const warningList=warnings=>`<ul class="rv-warnings">${warnings.map(row=>`<li>${text(row.en,row.ko)}</li>`).join('')}</ul>`;
function guardForm(form,g,warnings,operation='roster'){
 if(!warnings.length)return true;
 const key=signature(warnings);let host=form.querySelector('[data-roster-review]');
 if(!host||host.dataset.rosterReview!==key){
  host?.remove();form.insertAdjacentHTML('beforeend',`<section class="rv-review wide" data-roster-review="${esc(key)}" role="alert"><h3>${text('Review roster warnings','명부 경고 확인')}</h3>${warningList(warnings)}<p>${text('Gang-specific rules, alternate equipment cards and house rules may allow an exception. Record the reason before continuing.','갱별 규칙·대체 장비 카드·하우스 룰에 따른 예외라면 근거를 적고 계속하세요.')}</p><label class="checkline"><input type="checkbox" name="rosterException" value="yes">${text('I checked these warnings with the applicable rules.','적용할 규칙과 위 경고를 확인했습니다.')}</label><label>${text('Exception or correction plan','예외 근거 또는 수정 계획')}<textarea name="rosterReason" rows="2" maxlength="1000" data-user-text></textarea></label><p class="rv-review-feedback" data-roster-feedback role="status"></p></section>`);window.UKI18n?.refresh();return false;
 }
 const reason=form.elements.rosterReason?.value.trim();
 if(!form.elements.rosterException?.checked||!reason){host.querySelector('[data-roster-feedback]').innerHTML=text('Check the acknowledgement and enter a reason.','확인란을 선택하고 근거를 입력하세요.');window.UKI18n?.refresh();return false}
 g.rosterReviews??=[];g.rosterReviews.push({signature:key,codes:warnings.map(row=>row.code),reason,operation,at:new Date().toISOString()});if(g.rosterReviews.length>50)g.rosterReviews.splice(0,g.rosterReviews.length-50);return true;
}
function summary(g){
 const warnings=inspect(g),latest=g?.rosterReviews?.at(-1);return `<details class="rv-summary" data-roster-summary ${warnings.length?'open':''}><summary>${text('Roster check','명부 검사')} <span class="rv-count">${warnings.length?text(`${warnings.length} warnings`,`${warnings.length}개 경고`):text('No basic issues found','기본 검사 통과')}</span></summary>${warnings.length?warningList(warnings):`<p>${text('Leader count, recorded weapon slots and available composition rules checked. Gang-specific requirements still apply.','리더 수·기록된 무기 슬롯·등록된 구성 규칙을 확인했습니다. 갱별 추가 조건도 적용하세요.')}</p>`}${latest?`<p class="muted">${text('Latest exception / correction plan','최근 예외 근거 / 수정 계획')}: <span data-user-text>${esc(latest.reason)}</span></p>`:''}</details>`;
}
function reviewBefore(g,proceed,{onCancel,operation='share'}={}){
 const warnings=inspect(g);if(!warnings.length||!requiresReview(g)){proceed();return true}
 let accepted=false;
 closeModal();formModal(text('Review Roster','명부 검사'),'',()=>{if(!guardForm(document.querySelector('#modal-form'),g,warnings,operation))return false;accepted=true;save();setTimeout(proceed,0);return true},'Continue');
 document.querySelector('#modal-submit').setAttribute('data-i18n-ko','계속');
 const form=document.querySelector('#modal-form'),background=form.closest('.modal-bg'),observer=new MutationObserver(()=>{if(!background.isConnected){observer.disconnect();if(!accepted)onCancel?.()}});observer.observe(document.body,{childList:true,subtree:true});guardForm(form,g,warnings,operation);return false;
}
function requiresReview(g){const warnings=inspect(g);return warnings.length>0&&!(g.rosterReviews||[]).some(review=>review.signature===signature(warnings)&&review.reason?.trim())}
function ensureReviewed(g,operation='share'){return !requiresReview(g)?Promise.resolve(true):new Promise(resolve=>reviewBefore(g,()=>resolve(true),{onCancel:()=>resolve(false),operation}))}
window.MMRosterValidation={inspect,fighterWarnings,weaponSets,slotValue,matchesEdition,guardForm,summary,reviewBefore,requiresReview,ensureReviewed};
})();
