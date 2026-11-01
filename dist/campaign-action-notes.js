/* Reading notes for the verified N26 Post-cycle form. No records are changed here. */
(()=>{'use strict';
 const E=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const L=(en,ko)=>`<span data-i18n-en="${E(en)}" data-i18n-ko="${E(ko)}">${E(window.UKI18n?.language==='en'?en:ko)}</span>`;
 const api=()=>window.MMCampaignEconomy,rows=()=>window.RULES_DATA||{};
 const names={work:['Work Territory','영토 작업'],train:['Train','훈련'],develop:['Develop Tactics','택틱 개발'],trade:['Visit Trading Post','거래소 방문'],medical:['Medical Escort','의료 호송'],bionics:['Fit Bionics','바이오닉스 시술']};
 const roles={Leader:'리더',Champion:'챔피언',Ganger:'갱어',Prospect:'프로스펙트',Juve:'주브',Brute:'브루트','Hanger-on':'행어온',Pet:'펫',Beast:'비스트',Spyrer:'스파이어러',Delegation:'파견단'};
 const title=key=>L(...names[key]);
 const reasons=result=>(result?.reasons||[]).map(reason=>L(reason.en,reason.ko)).join(' · ');
 const item=(label,ko,body)=>`<div><dt>${L(label,ko)}</dt><dd>${body}</dd></div>`;
 function descriptions(c,g,f,key){
  const info=f?api().actionEligibility(c,g,f,key):null,cap=info?.workCap??api().workLimit(g);
  const values={
   work:[
    L('Leaders, Champions, Gangers and Prospects. An Ambot may work through its specific rule.','리더·챔피언·갱어·프로스펙트. 앰봇은 고유 규칙으로 영토 작업을 할 수 있습니다.'),
    L('Each worker earns 15 credits.','작업한 모델마다 15크레딧을 얻습니다.'),
    L(`The whole gang can assign up to ${cap} workers this cycle. This is a gang limit, not a limit per territory.`,`이번 사이클에 갱 전체에서 최대 ${cap}명을 배정할 수 있습니다. 영토마다 적용하는 한도가 아닙니다.`),
    L('Uses the model’s regular Post-cycle action.','모델의 일반 사이클 종료 후 행동 1회를 사용합니다.')],
   train:[
    L('Any model eligible for Post-cycle actions that can gain XP. Train has no Leader, Champion or Ganger requirement.','사이클 종료 후 행동을 할 자격이 있고 XP를 얻을 수 있는 모든 모델. 훈련에는 리더·챔피언·갱어 같은 역할 조건이 없습니다.'),
    L('Gain 2 XP, recorded in the model’s XP history.','경험치 2를 얻고 해당 모델의 경험치 이력에 기록합니다.'),
    L('Models whose own rules forbid XP or Post-cycle actions cannot choose this action.','고유 규칙으로 XP 획득 또는 사이클 종료 후 행동이 금지된 모델은 선택할 수 없습니다.'),
    L('Uses the regular action; review advancement during Update Roster.','일반 행동 1회를 사용하며, 성장은 명단 갱신 단계에서 확인합니다.')],
   develop:[
    L('A Leader or Champion.','리더 또는 챔피언.'),
    L('Generate one new Gang Tactic and add it to the gang roster. Reroll tactics already owned.','새 갱 택틱 1개를 생성해 명단에 추가합니다. 이미 보유한 결과는 다시 굴립니다.'),
    L('This is one model’s action, not a free reward for starting or finishing a battle.','모델 1명의 행동을 사용하는 것으로, 전투 시작·종료 때 무료로 받는 보상이 아닙니다.'),
    L('Resolve in Post-cycle Actions, before income and roster updates.','수입·명단 갱신에 앞선 사이클 종료 후 행동 단계에서 처리합니다.')],
   trade:[
    L('A Leader or Champion for a regular visit. Connected grants one additional visit as a specific exception.','일반 방문은 리더 또는 챔피언. 커넥티드 스킬은 예외적으로 추가 방문 1회를 허용합니다.'),
    L('A regular Leader visit generates 2 TP; a Champion generates 1 TP. A Connected extra visit generates 1 TP.','일반 방문은 리더 +2 TP, 챔피언 +1 TP입니다. 커넥티드 추가 방문은 +1 TP입니다.'),
    L('Trading Post purchases need a recorded visit and the required credits and TP. Gang Equipment List purchases do not require a visit. Unspent TP expire when the Trading Post sub-step closes.','일반 거래소 구매에는 방문 기록과 필요한 크레딧·TP가 모두 필요합니다. 갱 장비 목록 구매는 방문 없이 가능합니다. 쓰지 않은 TP는 거래소 하위 단계 종료 때 사라집니다.'),
    L('Record the visit as an action; buy equipment during Update Roster.','행동 단계에서 방문을 기록하고, 장비 구매는 명단 갱신 단계에서 진행합니다.')],
   medical:[
    L('A Leader or Champion, or a Rogue Doc using its own rule. The escort must be able to act.','리더·챔피언 또는 고유 규칙을 가진 로그 닥. 호송하는 모델이 행동 가능한 상태여야 합니다.'),
    L('Escort another Critically Injured Fighter. The patient cannot escort itself; this is not vehicle repair.','자신이 아닌 치명적 부상 상태의 파이터를 데려갑니다. 스스로 호송할 수 없으며 차량 수리 행동도 아닙니다.'),
    L('Base treatment costs 30 credits; if it is not paid, the patient dies. Before rolling, each additional 50 credits gives +1. A modified 1 means death, 2–3 a lasting injury in the 51–56 range, and 4+ recovery without lasting effects.','기본 치료비 30크레딧을 지불하지 않으면 대상이 사망합니다. 굴리기 전에 50크레딧씩 추가하면 결과에 +1을 더합니다. 수정 결과 1은 사망, 2–3은 51–56 지속 부상, 4 이상은 지속 영향 없이 회복입니다.'),
    L('Assign the escort now. Resolve and pay for treatment at the start of Update Roster, after income. A patient cannot also receive Fit Bionics in the same cycle.','지금은 호송을 배정합니다. 치료·비용 지불은 수입 이후 명단 갱신 시작에 처리합니다. 같은 사이클에 바이오닉스와 중복 배정할 수 없습니다.')],
   bionics:[
    L('A Leader or Champion, or a Rogue Doc using its own rule.','리더·챔피언 또는 고유 규칙을 가진 로그 닥.'),
    L('Remove chosen lasting injuries from another Fighter for 50 credits per injury instance. Repeated injuries are paid separately. Critical Injury is excluded.','다른 파이터의 선택한 지속 부상을 1건당 50크레딧으로 제거합니다. 같은 이름의 부상도 각각 계산하며, 치명적 부상은 제거할 수 없습니다.'),
    L('The patient also loses its Post-cycle action this cycle, so it must not have already acted. Do not combine with Medical Escort.','시술받는 대상도 이번 사이클에 행동할 수 없으므로 이미 행동한 모델을 지정할 수 없습니다. 의료 호송과 중복할 수 없습니다.'),
    L('Assign the patient and injury now; pay and remove the selected injury at the start of Update Roster, after income.','지금 대상과 부상을 배정하고, 수입 이후 명단 갱신 시작에 비용을 내고 선택한 부상을 제거합니다.')]
  };
  return values[key]||[];
 }
 function source(key){const pages={medical:'88',develop:'89, 148',trade:'89, 92, 153',sequence:'88–89, 92, 148, 153'};return `<p class="ca-action-source">${L('Rulebook','룰북')}: Necromunda Skirmish: Core Rulebook (2026), p. ${pages[key]||'89'}. ${L('Model-specific exceptions use the model’s own verified rules.','모델별 예외는 해당 모델의 검증된 고유 규칙을 함께 적용합니다.')}</p>`;}
 function intro(){return `<div class="ca-action-intro"><p>${L('Choose what this model did at the end of the cycle. The regular allowance is one action per model; Connected can add one Trading Post visit.','사이클이 끝난 뒤 이 모델이 수행한 행동을 기록합니다. 기본은 모델당 1회이며, 커넥티드는 거래소 추가 방문 1회를 허용합니다.')}</p><p>${L('Actions → income → Update Roster. Recovery and critical injury/damage prevent acting; an ordinary lasting injury alone does not.','행동 → 수입 → 명단 갱신 순서입니다. 회복 중·치명적 부상·치명적 손상 상태는 행동할 수 없으며, 일반 지속 부상만 남아 있다는 이유로 금지되지는 않습니다.')}</p></div>`;}
 function model(c,g,f){
  if(!f)return '';
  const sourceModel=[f.fighterTypeId,f.catalogTypeId,f.presetId].map(id=>(rows().fighterTypes||[]).find(row=>row.source_verified&&row.id===id)).find(Boolean),types=f.subtypes||f.fighter_subtypes||sourceModel?.fighter_subtypes||[],actions=Object.keys(names).filter(key=>api().actionEligibility(c,g,f,key).allowed),history=api().actionHistory(c,g,f.id),regular=history.find(row=>row.slot!=='connected'),restricted=Object.keys(names).filter(key=>!api().actionEligibility(c,g,f,key).allowed);
  return `<h4 data-user-text>${E(f.name)}</h4><p>${L('Classification','분류')}: ${types.length?types.map(role=>L(role,roles[role]||role)).join(' · '):L('No role recorded; role-limited actions need an eligible subtype.','역할 미등록 · 역할 제한 행동에는 해당 하위 유형이 필요합니다.')}</p><p>${L('Available actions','현재 가능한 행동')}: ${actions.length?actions.map(title).join(' · '):L('None in this form','이 창에서 가능한 행동 없음')}</p>${regular?`<p>${L('Regular action already used','일반 행동 사용 완료')}: ${names[regular.action]?title(regular.action):L('Treatment patient','시술 대상')}</p>`:''}${restricted.length?`<details class="ca-action-model-reasons"><summary>${L('Why other actions are unavailable','선택할 수 없는 행동과 사유')}</summary><ul>${restricted.map(key=>`<li><strong>${title(key)}</strong><span>${reasons(api().actionEligibility(c,g,f,key))}</span></li>`).join('')}</ul></details>`:''}${api().hasConnected(f)?`<p>${L('Connected: one extra Trading Post visit, +1 TP. Recovery, critical conditions and other action prohibitions still apply.','커넥티드: 거래소 추가 방문 1회, +1 TP. 회복·치명 상태 등 행동 불가 조건은 그대로 적용됩니다.')}</p>`:''}${sourceModel?.rule_data?.allowed_post_cycle_actions?.some(a=>!Object.values(names).some(n=>n[0]===a))?`<p>${L('This model also has a specific action outside the six common actions shown here.','이 모델에는 이 창의 공통 행동 6종과 별도로 고유 행동이 있습니다.')}</p>`:''}`;
 }
 function action(c,g,f,key){
  if(!key)return `<p>${L('Choose an action to see who may perform it, its effect, costs and restrictions. Read the full guide below for actions that are unavailable.','행동을 선택하면 가능한 모델·효과·비용·제한을 확인할 수 있습니다. 선택할 수 없는 행동도 아래 전체 설명에서 읽을 수 있습니다.')}</p>`;
  const info=api().actionEligibility(c,g,f,key),body=descriptions(c,g,f,key),discount=Number(info.discount||0);
  return `<h4>${title(key)}</h4><p class="ca-action-verdict">${info.allowed?L('Available for this model','이 모델이 수행 가능'):L('Unavailable for this model','이 모델은 수행 불가')}${info.reasons.length?' · '+reasons(info):''}${key==='work'?` · ${L(`${info.workUsed} / ${info.workCap} workers assigned`,`${info.workUsed} / ${info.workCap}명 배정`)}`:''}${key==='trade'&&info.allowed?` · +${E(info.tp)} TP${info.slot==='connected'?' · '+L('Connected extra visit','커넥티드 추가 방문'):''}`:''}</p><dl>${item('Eligible models','가능 모델',body[0])}${item('Effect / target','효과·대상',body[1])}${item('Restrictions / cost','제한·비용',body[2])}${item('When it resolves','처리 시점',body[3])}</dl>${discount&&['medical','bionics'].includes(key)?`<p class="ca-action-special">${L(`This escort’s verified rule reduces treatment cost by ${discount} credits, to a minimum of 0.`,`이 호송 모델의 고유 규칙으로 치료비가 ${discount}크레딧 줄어들며, 최소 비용은 0입니다.`)}</p>`:''}${source(key)}`;
 }
 function guide(c,g){return `<details class="ca-action-reference"><summary>${L('All six actions: eligibility and restrictions','행동 6종의 자격·제한 전체 설명')}</summary><div>${Object.keys(names).map(key=>{const body=descriptions(c,g,null,key);return `<section><h4>${title(key)}</h4><dl>${item('Eligible models','가능 모델',body[0])}${item('Effect / target','효과·대상',body[1])}${item('Restrictions / cost','제한·비용',body[2])}${item('When it resolves','처리 시점',body[3])}</dl></section>`;}).join('')}<p>${L('A broad role label alone does not replace a model’s own rules. Models with an explicit action prohibition, alliance delegations and hired guns cannot use these common actions. Spyre Hunters use their own Post-cycle rules.','역할 이름만으로 모델의 고유 규칙을 대신하지 않습니다. 행동 금지 규칙이 있는 모델·동맹 파견단·고용총잡이는 이 공통 행동을 사용할 수 없습니다. 스파이어 헌터는 전용 사이클 종료 규칙을 사용합니다.')}</p>${source('sequence')}</div></details>`;}
 function blocked(c,g){
  const excluded=[...(g.fighters||[]),...(g.vehicles||[])].filter(f=>!api().available(c,g,f));
  if(!excluded.length)return '';
  return `<details class="ca-action-blocked"><summary>${L(`Why ${excluded.length} models cannot act here`,`이 창에서 행동할 수 없는 모델 ${excluded.length}명과 사유`)}</summary><ul>${excluded.map(f=>{const base=api().baseEligibility(c,g,f),unique=new Map();for(const key of Object.keys(names))for(const reason of api().actionEligibility(c,g,f,key).reasons)unique.set(reason.en,reason);const info=base.reasons.length?base:{reasons:[...unique.values()]};return `<li><strong data-user-text>${E(f.name)}</strong><span>${reasons(info)||L('No eligible common action. Check the model’s specific rules.','가능한 공통 행동이 없습니다. 모델의 고유 규칙을 확인하세요.')}</span></li>`;}).join('')}</ul></details>`;
 }
 window.MMCampaignActionNotes={intro,model,action,guide,blocked};
})();
