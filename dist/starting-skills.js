/* Fixed starting grants and chosen starting skills have separate records. */
(function(){
 'use strict';
 const R=()=>window.RULES_DATA||{},edition=g=>String(g?.edition||'').toLowerCase();
 const norm=x=>String(x||'').normalize('NFKC').replace(/[’‘]/g,"'").replace(/\s+/g,' ').trim().toLowerCase();
 const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const words=(en,ko)=>`<span data-i18n-ko="${esc(ko)}">${esc(en)}</span>`;
 const currentGang=()=>typeof gang==='function'?gang():null;
 function model(f,g=currentGang(),explicit){
  const rows=(R().fighterTypes||[]).filter(row=>row.source_verified&&String(row.edition_slug||row.edition).toLowerCase()===edition(g));
  if(explicit)return rows.find(row=>row.id===explicit.id)||null;
  const direct=[f?.fighterTypeId,f?.catalogTypeId,f?.presetId].map(key=>rows.find(row=>row.id===key)).find(Boolean);
  if(direct)return direct;if(f?.manual)return null;
  return window.MMVerifiedRules?.modelType?.(f,g)||null;
 }
 function owns(f,skill){const names=new Set((f.skills||[]).map(norm));return [skill.name,skill.name_ko].filter(Boolean).some(name=>names.has(norm(name)))||(f.skillDetails||[]).some(detail=>detail.skillId===skill.id&&names.has(norm(detail.name)));}
 function expected(f,g=currentGang(),explicit){
  const type=model(f,g,explicit);if(!type)return [];
  const values=new Map();
  for(const relation of R().fighterDefaults||[]){
   if(!relation.source_verified||relation.fighter_type_id!==type.id||!relation.skill_id||String(relation.edition_slug||relation.edition).toLowerCase()!==edition(g))continue;
   const skill=(R().skills||[]).find(row=>row.id===relation.skill_id&&row.source_verified&&String(row.edition_slug||row.edition).toLowerCase()===edition(g));if(!skill||values.has(skill.id))continue;
   const subtype=(relation.granted_by_subtypes||[]).join(', '),source=relation.grant_origin==='subtype'?'Subtype: '+subtype:relation.grant_origin==='fixed_power'?'Starting Power':relation.grant_origin==='model_type'?'Model Type: Vehicle':'Starting Skill';
   values.set(skill.id,{skill,source,subtype,relation});
  }
  const specialisation=(R().fighterSpecialisations||[]).find(row=>row.source_verified&&row.id===(f.specialisationId||type.fighter_specialisation_id)&&String(row.edition_slug||row.edition).toLowerCase()===edition(g));
  if(specialisation?.skill_id&&!values.has(specialisation.skill_id)){const skill=(R().skills||[]).find(row=>row.id===specialisation.skill_id&&row.source_verified&&String(row.edition_slug||row.edition).toLowerCase()===edition(g));if(skill)values.set(skill.id,{skill,source:'Specialist: '+specialisation.name,subtype:'Specialist',relation:{...specialisation,grant_origin:'specialisation'}});}
  const power=powerSpec(f,g);if(power?.selected&&!values.has(power.selected.id))values.set(power.selected.id,{skill:power.selected,source:'Starting Power',subtype:'Wyrd',relation:{grant_origin:'fixed_power'}});
  return [...values.values()];
 }
 function powerSpec(f,g=currentGang()){
  const type=model(f,g),config=type?.starting_power_choice;if(!config||config.count!==1)return null;
  const sets=(R().skillTypes||[]).filter(row=>row.source_verified&&config.skill_set_ids.includes(row.id)&&String(row.edition_slug||row.edition).toLowerCase()===edition(g));
  const skills=(R().skills||[]).filter(row=>row.source_verified&&sets.some(set=>set.id===row.skill_type_id)&&String(row.edition_slug||row.edition).toLowerCase()===edition(g));
  const choice=f.startingPowerChoice||{skillId:f.startingPowerId,skillSetId:f.startingPowerSetId},selected=skills.find(row=>row.id===choice.skillId&&row.skill_type_id===choice.skillSetId);
  return {type,config,sets,skills,selected,owned:skills.filter(row=>owns(f,row))};
 }
 function pendingPower(f,g=currentGang()){const power=powerSpec(f,g);return !!power&&!power.selected&&(power.config.primary_access===true||power.owned.length===0);}
 const missing=(f,g=currentGang())=>expected(f,g).filter(row=>!owns(f,row.skill));
 function fixedNames(f,g){const rows=expected(f,g),ids=new Set(rows.map(row=>row.skill.id)),names=new Set(rows.flatMap(row=>[norm(row.skill.name),norm(row.skill.name_ko)]));for(const detail of f.skillDetails||[])if(ids.has(detail.skillId))names.add(norm(detail.name));return names;}
 function chosenPrimary(f,g=currentGang()){
  const fixed=fixedNames(f,g);
  return (f.skillDetails||[]).some(detail=>(f.skills||[]).some(name=>norm(name)===norm(detail.name))&&(detail.source==='Starting Primary'||detail.isStarting&&!detail.automatic&&detail.source==='Starting Skill'&&!fixed.has(norm(detail.name))));
 }
 function allowance(f,g=currentGang()){return !!model(f,g)?.free_skill;}
 function pendingPrimary(f,g=currentGang()){
  if(!allowance(f,g)||chosenPrimary(f,g))return false;
  if((f.freeSkill??f.free_skill)===true)return true;
  const fixed=fixedNames(f,g);
  // Old recruits could have recorded false before their verified allowance was linked.
  // An unknown extra skill may already be their choice, so that case stays as recorded.
  return !(f.skills||[]).some(name=>!fixed.has(norm(name))&&!(f.skillDetails||[]).some(detail=>norm(detail.name)===norm(name)&&(detail.injuryId||detail.sourceEquipmentId||detail.advancementId||detail.isAdvance||detail.source==='Starting Power')));
 }
 function afterDeletion(f,deletedName,detail,g=currentGang()){
  if(detail?.source==='Starting Primary'||detail?.isStarting&&detail.source==='Starting Skill'&&!expected(f,g).some(row=>row.skill.id===detail?.skillId||norm(row.skill.name)===norm(deletedName))){
   f.freeSkill=allowance(f,g)&&!chosenPrimary(f,g);f.free_skill=f.freeSkill;
  }
 }
 function canEdit(f,g){
  if(!g||g.remoteReadOnly)return false;const auth=window.AccountParity;
  if(auth&&(auth.connecting||auth.busy||auth.account&&!auth.ready))return false;
  if(g.remoteOwnerId&&g.remoteOwnerId!==auth?.account?.id)return false;
  const probe=document.createElement('button');probe.dataset.addSkill=f.id;
  return !window.SharedCampaignControls?.blocked(probe);
 }
 function apply(f,g=currentGang()){
  if(!canEdit(f,g))return 0;const rows=missing(f,g);if(!rows.length)return 0;
  f.skills??=[];f.skillIds??=[];f.skillDetails??=[];
  for(const row of rows){f.skills.push(row.skill.name);if(!f.skillIds.includes(row.skill.id))f.skillIds.push(row.skill.id);f.skillDetails.push({id:id(),name:row.skill.name,skillId:row.skill.id,skillSet:row.skill.skill_type_id||'',source:row.source,cost:0,isStarting:true,isAdvance:false,automatic:true,grantOrigin:row.relation.grant_origin||'fixed',grantedBySubtypes:[...(row.relation.granted_by_subtypes||[])]});}
  return rows.length;
 }
 function openRepair(f,g=currentGang()){
  if(!f||!canEdit(f,g))return false;const rows=missing(f,g);if(!rows.length)return false;
  const account=window.AccountParity?.account?.id||'',type=model(f,g)?.id,ed=edition(g),ids=new Set(rows.map(row=>row.skill.id));
  formModal('Restore Starting Skills',`<p class="wide">${words('Add the missing fixed starting skills below. The chosen Primary skill is selected separately.','아래의 누락된 고정 시작 스킬을 추가합니다. 무료 프라이머리 스킬은 별도로 선택합니다.')}</p><ul class="wide starting-skills-list">${rows.map(row=>`<li>${words(row.skill.name,row.skill.name_ko||row.skill.name)} <button class="mmrr-info" type="button" data-starting-skill-info="${esc(row.skill.id)}" aria-label="Skill conditions" data-i18n-ko-aria-label="스킬 조건 보기">ⓘ</button></li>`).join('')}</ul><p class="wide muted">${words('XP, credits and rating are unchanged. Existing skill records keep their descriptions and acquisition details.','XP·크레딧·레이팅은 바뀌지 않습니다. 기존 스킬의 설명과 획득 내역은 유지됩니다.')}</p>`,()=>{
   const state=typeof data!=='undefined'?data:null,liveGang=state?.gangs?.find(row=>row.id===g.id),liveFighter=liveGang?.fighters?.find(row=>row.id===f.id);
   if(liveGang!==g||liveFighter!==f||account!==(window.AccountParity?.account?.id||'')||!canEdit(f,g)||model(f,g)?.id!==type||edition(g)!==ed||missing(f,g).some(row=>!ids.has(row.skill.id)))return false;
   const count=apply(f,g);if(count){log(g,`${f.name}: ${count} fixed starting skills restored`);save();}return true;
  },'Restore Skills');
  const form=document.querySelector('#modal-form');form.dataset.startingSkillsRepairForm='';const modal=form.closest('.modal');modal.querySelector('h2').dataset.i18nKo='시작 스킬 복구';modal.querySelector('#modal-submit').dataset.i18nKo='스킬 복구';window.UKI18n?.refresh(modal);return form;
 }
 function openPowerChoice(f,g=currentGang()){
  const power=powerSpec(f,g);if(!power||!canEdit(f,g)||!pendingPower(f,g))return false;
  const candidates=power.owned.length?power.owned:power.skills,sets=power.sets.filter(set=>candidates.some(row=>row.skill_type_id===set.id)),setRows=sets.map(set=>({value:set.id,label:set.name,labelKo:set.name_ko||set.name})),initialSet=sets.length===1?sets[0].id:'',account=window.AccountParity?.account?.id||'',typeId=power.type.id;
  const combo=window.MMWidgets.combo;
  formModal('Choose Starting Power',`<p class="wide">${words(power.owned.length?'Register the starting power from the powers already recorded. No additional power or reward is granted.':'Choose the required starting power from the model’s allowed discipline. This does not spend XP or credits.',power.owned.length?'이미 등록된 파워에서 시작 파워를 확인합니다. 추가 파워나 보상을 지급하지 않습니다.':'이 모델에게 허용된 계열에서 필수 시작 파워를 선택합니다. XP나 크레딧은 사용하지 않습니다.')}</p>`+combo('startingPowerSet','Power Set',setRows,initialSet,'Choose a power set')+combo('startingPower','Starting Power',[],'','Choose a power')+'<div class="wide" data-starting-power-preview></div>',values=>{
   const state=typeof data!=='undefined'?data:null,liveGang=state?.gangs?.find(row=>row.id===g.id),liveFighter=liveGang?.fighters?.find(row=>row.id===f.id),current=powerSpec(f,g),selected=current?.skills.find(row=>row.id===values.startingPower&&row.skill_type_id===values.startingPowerSet);
   if(liveGang!==g||liveFighter!==f||account!==(window.AccountParity?.account?.id||'')||!canEdit(f,g)||current?.type.id!==typeId||!selected||current.owned.length&&!current.owned.some(row=>row.id===selected.id)||!window.MMRecruitmentStartingChoices?.applyPower)return false;
   if(!MMRecruitmentStartingChoices.applyPower(f,current.type,selected,selected.skill_type_id))return false;
   log(g,`${f.name}: starting power registered`);save();return true;
  },'Confirm');
  const form=document.querySelector('#modal-form'),modal=form.closest('.modal'),submit=modal.querySelector('#modal-submit');form.dataset.startingPowerChoiceForm='';modal.querySelector('h2').dataset.i18nKo='시작 파워 선택';submit.dataset.i18nKo='확인';
  function localize(name,rows,placeholder){const input=form.elements[name],host=input.closest('[data-mm-combo]');host.querySelectorAll('[data-mm-pick]').forEach(option=>{const row=rows.find(row=>row.value===option.dataset.mmPick);if(row)option.dataset.i18nKo=row.labelKo;});const label=host.querySelector('[data-mm-value-label]');if(label)label.dataset.i18nKo=rows.find(row=>row.value===input.value)?.labelKo||placeholder;}
  function refresh(load){const rows=candidates.filter(row=>row.skill_type_id===form.elements.startingPowerSet.value).map(row=>({value:row.id,label:row.name,labelKo:row.name_ko||row.name}));if(load)MMWidgets.setOptions(form.elements.startingPower,rows,'');localize('startingPowerSet',setRows,'파워 계열 선택');localize('startingPower',rows,'파워 선택');const row=candidates.find(row=>row.id===form.elements.startingPower.value&&row.skill_type_id===form.elements.startingPowerSet.value);submit.disabled=!row;form.querySelector('[data-starting-power-preview]').innerHTML=row?`<p>${words(row.description_en||row.description||'',row.description||'')}</p><button class="btn small" type="button" data-starting-power-info="${esc(row.id)}">${words('Conditions','조건 보기')}</button>`:'';window.UKI18n?.refresh(modal);}
  form.addEventListener('change',event=>{if(event.target.name==='startingPowerSet')refresh(true);else if(event.target.name==='startingPower')refresh(false);});refresh(true);return form;
 }
 const beforePage=typeof fighterPage==='function'?fighterPage:null;
 if(beforePage)fighterPage=function(){
  const html=beforePage.apply(this,arguments),g=currentGang(),f=typeof currentFighter==='function'?currentFighter():null;if(!f||!g||!model(f,g))return html;
  const rows=missing(f,g),pending=pendingPrimary(f,g),powerPending=pendingPower(f,g);if(!rows.length&&!pending&&!powerPending)return html;
  const holder=document.createElement('div');holder.innerHTML=html;const title=[...holder.querySelectorAll('h2')].find(node=>['Skills','스킬'].includes(node.textContent.trim()));if(!title)return html;
  const note=document.createElement('aside');note.className='starting-skills-note';note.dataset.startingSkillsStatus='';
  note.innerHTML=(rows.length?`<div>${words('Missing fixed starting skills','누락된 고정 시작 스킬')}: ${rows.map(row=>words(row.skill.name,row.skill.name_ko||row.skill.name)).join(', ')} <button type="button" class="btn small" data-starting-skills-repair ${canEdit(f,g)?'':'disabled'}>${words('Restore','복구')}</button></div>`:'')+(pending?`<div data-starting-primary-pending>${words('Choose one free starting Primary skill. Fixed skills are already included separately.','무료 시작 프라이머리 스킬 1개를 선택하세요. 고정 스킬과는 별도로 받습니다.')} <button type="button" class="btn small" data-starting-primary-choice ${canEdit(f,g)?'':'disabled'}>${words('Choose Starting Skill','시작 스킬 선택')}</button></div>`:'');
  if(powerPending)note.insertAdjacentHTML('beforeend',`<div>${words('The required starting power has not been selected.','필수 시작 파워가 아직 선택되지 않았습니다.')} <button type="button" class="btn small" data-starting-power-choice ${canEdit(f,g)?'':'disabled'}>${words('Choose Starting Power','시작 파워 선택')}</button></div>`);
  (title.closest('.section-heading')||title).after(note);return holder.innerHTML;
 };
 document.addEventListener('click',event=>{
  const button=event.target.closest?.('[data-starting-skills-repair],[data-starting-primary-choice],[data-starting-skill-info],[data-starting-power-choice],[data-starting-power-info]');if(!button)return;event.preventDefault();event.stopImmediatePropagation();
  const g=currentGang(),f=typeof currentFighter==='function'?currentFighter():null;if(!f||!g)return;
  if(button.dataset.startingSkillInfo){const row=expected(f,g).find(row=>row.skill.id===button.dataset.startingSkillInfo);if(row)window.MMRuleReference?.open('skills',row.skill.id,{edition:edition(g),activator:button});return;}
  if(button.dataset.startingPowerInfo){const row=powerSpec(f,g)?.skills.find(row=>row.id===button.dataset.startingPowerInfo);if(row)window.MMRuleReference?.open('skills',row.id,{edition:edition(g),activator:button});return;}
  if(button.disabled||!canEdit(f,g))return;
  if(button.hasAttribute('data-starting-skills-repair'))openRepair(f,g);else if(button.hasAttribute('data-starting-power-choice'))openPowerChoice(f,g);else if(pendingPrimary(f,g))window.MMVerifiedRules?.addSkill(f);
 },true);
 const style=document.createElement('style');style.textContent='.starting-skills-note{padding:12px;margin:12px 0;border:1px solid var(--border,#262626);border-radius:6px;font-size:14px;line-height:1.6}.starting-skills-note>div+div{margin-top:10px}.starting-skills-note .btn{margin:8px 0 0 8px;white-space:normal}.starting-skills-list{line-height:1.9}@media(max-width:520px){.starting-skills-note .btn{display:block;margin-left:0;width:100%}}';document.head.append(style);
 window.MMStartingSkills={expected,missing,apply,openRepair,pendingPrimary,afterDeletion,model,pendingPower,openPowerChoice};
})();
