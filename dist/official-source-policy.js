/* Rules are unavailable until the supplied official originals have been verified.
   Manual records and account data remain separate from rule recommendations. */
(function(){
  'use strict';
  const escape=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const currentEdition=()=>String((typeof data!=='undefined'&&['gang','fighter'].includes(data.view)&&typeof gang==='function'?gang()?.edition:typeof data!=='undefined'&&data.view==='campaign'&&typeof campaign==='function'?campaign()?.edition:typeof data!=='undefined'?data.edition:'n26')||'n26').toLowerCase();
  const can=(feature,ed=currentEdition())=>window.RULES_DATA?.edition_coverage?.[String(ed).toLowerCase()]?.[feature]===true;
  const pending=()=>!can('references');
  const lang=()=>window.UKI18n?.language==='en'?'en':'ko';
  const label=(en,ko,tag='span')=>`<${tag} data-i18n-ko="${escape(ko)}">${escape(en)}</${tag}>`;
  const pendingBody=()=>can('references')?`<div data-official-source-pending>${label('Source-verified data is available for this edition. Features without complete verified inputs remain manual.','이 판본의 룰북에서 확인한 정보를 제공합니다. 자동 계산에 필요한 규칙이 확인되지 않은 항목은 직접 입력할 수 있습니다.','p')}${label('Recorded custom values and manual rulings are not automatically certified by the app.','사용자 정의 값과 직접 기록한 재정은 앱이 자동으로 공식 규칙에 맞다고 판정하지 않습니다.','p')}</div>`:`<div data-official-source-pending>${label('Verified original data for this edition is not available. Use manual records for this edition.','이 판본의 룰북 정보가 아직 등록되지 않았습니다. 직접 입력해 주세요.','p')}</div>`;
  function showPending(options={}){
    if(window.MMRuleReference?.openContext)return window.MMRuleReference.openContext(can('references')?'Verified data coverage':'Official source pending',pendingBody(),{nameKo:can('references')?'룰북에서 확인한 내용':'룰북 확인 필요',activator:options.activator});
    if(typeof showModal==='function'){showModal(lang()==='ko'?'룰북 확인 필요':'Official source pending',pendingBody(),lang()==='ko'?'닫기':'Close',()=>true);return true;}
    return false;
  }
  function input(name,en,ko,value='',type='text',attributes=''){
    return `<label>${label(en,ko)}<input name="${escape(name)}" type="${escape(type)}" value="${escape(value)}" ${attributes}></label>`;
  }
  function notes(name,en,ko,value=''){return `<label class="wide">${label(en,ko)}<textarea name="${escape(name)}">${escape(value)}</textarea></label>`;}
  function choose(name,en,ko,options,value=''){
    return `<label>${label(en,ko)}<select name="${escape(name)}">${options.map(option=>{const [val,english,korean]=Array.isArray(option)?option:[option,option,option];return `<option value="${escape(val)}" ${String(val)===String(value)?'selected':''} data-i18n-ko="${escape(korean||english)}">${escape(english)}</option>`;}).join('')}</select></label>`;
  }
  function manualForm(kind,en,ko,body,callback){
    if(typeof formModal!=='function')return false;
    formModal(en,`<p class="wide muted" data-official-manual-note>${label('Manual record only. No rule table, automatic award or eligibility check is applied.','능력치와 결과를 직접 입력합니다. 판정이나 보상은 자동으로 계산하지 않습니다.')}</p>`+body,callback,'Save record');
    const form=document.querySelector('#modal-form');if(!form)return false;
    form.dataset.officialManual=kind;form.closest('.modal')?.classList.add('official-manual-modal');
    const heading=form.closest('.modal')?.querySelector('.modal-head h2');if(heading)heading.dataset.i18nKo=ko;
    const submit=form.closest('.modal')?.querySelector('#modal-submit');if(submit)submit.dataset.i18nKo='기록 저장';
    window.UKI18n?.refresh(form.closest('.modal'));
    return form;
  }
  const integer=value=>value!==''&&String(value).trim()!==''&&Number.isSafeInteger(Number(value));
  const validTotal=(value,change)=>Number.isSafeInteger((Number(value)||0)+change)&&(Number(value)||0)+change>=0;
  function reject(en,ko){window.alert(lang()==='ko'?ko:en);return false;}
  function persist(g,message){if(g&&typeof log==='function')log(g,message);if(typeof save==='function')save();return true;}
  function manualXp(f,context={}){
    if(!f)return false;const current=Number(f.xp)||0;
    return manualForm('xp','Record XP manually','XP 직접 기록',`<p class="wide">${label('Current XP','현재 XP')}: <strong data-official-current-xp>${escape(current)}</strong></p>`+input('amount','XP change','XP 변화량','','number','step="1" required')+input('reason','Reason','사유'),values=>{
      if(!integer(values.amount))return reject('Enter a whole XP change.','XP 변화량을 정수로 입력하세요.');
      const amount=Number(values.amount),before=Number(f.xp)||0;
      if(!validTotal(before,amount))return reject('XP must remain a non-negative safe whole number.','XP 합계는 0 이상의 안전한 정수여야 합니다.');
      f.xp=before+amount;f.xpHistory??=[];f.xpHistory.unshift({id:id(),at:now(),amount,reason:values.reason||'Manual XP record',manual:true,...(context.sessionId?{sessionId:context.sessionId}:{})});
      if(context.row)context.row.xpEarned=(Number(context.row.xpEarned)||0)+amount;
      return persist(context.gang||(typeof gang==='function'?gang():null),`${f.name}: ${amount>=0?'+':''}${amount} XP (manual)`);
    });
  }
  function manualAdvancement(f){
    if(!f)return false;
    const stats=Object.keys(f.stats||{}).map(key=>[key,key,key]);
    return manualForm('advancement','Record advancement manually','성장 직접 기록',input('name','Record name','기록 이름','','text','required')+choose('kind','Record type','기록 유형',[['Other','Other','기타'],['Characteristic','Characteristic','능력치'],['Skill','Skill','스킬']],'Other')+choose('stat','Characteristic to change','변경할 능력치',[['','None','없음'],...stats],'')+input('amount','Characteristic change','능력치 변화량',0,'number','step="1"')+input('xpChange','XP change','XP 변화량',0,'number','step="1"')+input('ratingChange','Recorded value change','기록 가치 변화량',0,'number','step="1"')+notes('notes','Notes','메모'),values=>{
      if(!String(values.name||'').trim())return reject('Enter a record name.','기록 이름을 입력하세요.');
      if(!['amount','xpChange','ratingChange'].every(key=>integer(values[key])))return reject('Enter whole-number changes.','변화량은 정수로 입력하세요.');
      const xpChange=Number(values.xpChange),ratingChange=Number(values.ratingChange),amount=Number(values.amount);
      if(!validTotal(f.xp,xpChange)||!validTotal(f.cost,ratingChange)||f.ratingCost!=null&&!validTotal(f.ratingCost,ratingChange))return reject('XP and recorded totals must remain non-negative safe whole numbers.','XP와 기록 합계는 0 이상의 안전한 정수여야 합니다.');
      const record={id:id(),name:String(values.name).trim(),kind:values.kind,stat:values.stat,amount,xpCost:-xpChange,cost:ratingChange,notes:values.notes,manual:true,acquiredAt:now()};
      f.xp=(Number(f.xp)||0)+xpChange;f.cost=(Number(f.cost)||0)+ratingChange;if(f.ratingCost!=null)f.ratingCost=(Number(f.ratingCost)||0)+ratingChange;
      f.advancements??=[];f.advancements.push(record);
      if(values.kind==='Skill'){f.skills??=[];if(!f.skills.includes(record.name))f.skills.push(record.name);}
      if(values.stat&&amount){f.effects??=[];f.effects.push({id:id(),name:record.name,category:'Advancement',stat:values.stat,amount,advancementId:record.id,manual:true});}
      return persist(typeof gang==='function'?gang():null,`${f.name}: ${record.name} (manual)`);
    });
  }
  function manualInjury(f,context={}){
    if(!f)return false;const stats=Object.keys(f.stats||{}).map(key=>[key,key,key]);
    return manualForm('injury','Record injury manually','부상 직접 기록',input('name','Record name','기록 이름','','text','required')+choose('stat','Characteristic to change','변경할 능력치',[['','None','없음'],...stats],'')+input('amount','Characteristic change','능력치 변화량',0,'number','step="1"')+notes('notes','Notes','메모'),values=>{
      if(!String(values.name||'').trim())return reject('Enter a record name.','기록 이름을 입력하세요.');
      if(!integer(values.amount))return reject('Enter a whole-number change.','변화량을 정수로 입력하세요.');
      const record={id:id(),name:String(values.name).trim(),stat:values.stat,amount:Number(values.amount),notes:values.notes,manual:true,...(context.sessionId?{sessionId:context.sessionId}:{})};
      f.injuries??=[];f.injuries.push(record);if(context.row){context.row.injuries??=[];context.row.injuries.push({...record});}
      if(record.stat&&record.amount){f.effects??=[];f.effects.push({id:id(),name:record.name,category:'Injury',stat:record.stat,amount:record.amount,injuryId:record.id,manual:true});}
      return persist(context.gang||(typeof gang==='function'?gang():null),`${f.name}: ${record.name} (manual)`);
    });
  }
  function manualCycle(){
    const g=typeof gang==='function'?gang():null;if(!g)return false;
    return manualForm('cycle','Record cycle changes manually','사이클 변화 직접 기록',input('creditsChange','Credits change','크레딧 변화량',0,'number','step="1"')+input('reputationChange','Reputation change','명성 변화량',0,'number','step="1"')+notes('notes','Notes','메모'),values=>{
      if(!['creditsChange','reputationChange'].every(key=>integer(values[key])))return reject('Enter whole-number changes.','변화량은 정수로 입력하세요.');
      const creditsChange=Number(values.creditsChange),reputationChange=Number(values.reputationChange);
      if(!validTotal(g.credits,creditsChange)||!validTotal(g.reputation,reputationChange))return reject('Recorded totals must remain non-negative safe whole numbers.','기록 합계는 0 이상의 안전한 정수여야 합니다.');
      g.credits=(Number(g.credits)||0)+creditsChange;g.reputation=(Number(g.reputation)||0)+reputationChange;
      return persist(g,`Cycle record: ${creditsChange>=0?'+':''}${creditsChange} credits; ${reputationChange>=0?'+':''}${reputationChange} reputation${values.notes?' · '+values.notes:''} (manual)`);
    });
  }
  function manualSell(g,item,remove){
    if(!g||!item||typeof remove!=='function')return false;
    return manualForm('sale','Record sale manually','판매 직접 기록',`<p class="wide" data-user-text>${escape(item.name)}</p>`+input('value','Agreed sale amount','합의한 판매 금액',item.cost!=null&&Number.isSafeInteger(Number(item.cost))&&Number(item.cost)>=0?Number(item.cost):'','number','min="0" step="1" required'),values=>{
      if(!integer(values.value)||Number(values.value)<0)return reject('Enter a non-negative whole sale amount.','판매 금액을 0 이상의 정수로 입력하세요.');
      const amount=Number(values.value);if(!validTotal(g.credits,amount))return reject('The credit total must remain a non-negative safe whole number.','크레딧 합계는 0 이상의 안전한 정수여야 합니다.');remove();g.credits=(Number(g.credits)||0)+amount;
      return persist(g,`${item.name}: ${amount} credits (manual sale)`);
    });
  }
  function manualGang(g,draft={}){
    const initial=g||draft,setup=window.MMFinancials?.creationDefaults(initial.edition||data.edition)||{startingCredits:1000,startingReputation:1};
    return manualForm('gang',g?'Edit manual gang record':'Create manual gang record',g?'갱 직접 기록 수정':'갱 직접 기록 생성',input('name','Gang name','갱 이름',initial.name||'','text','required')+input('faction','Recorded gang type','기록할 갱 유형',initial.faction||'')+choose('edition','Edition label','판본 표시',['N23','N26','Custom'],initial.edition||data.edition||'N26')+input('alignment','Recorded alignment','기록할 성향',initial.alignment||'')+input('credits','Credits','크레딧',initial.credits??setup.startingCredits,'number','min="0" step="1" required')+input('reputation','Reputation','명성',initial.reputation??setup.startingReputation,'number','min="0" step="1" required')+notes('notes','Notes','메모',initial.notes||''),values=>{
      if(!String(values.name||'').trim())return reject('Enter a gang name.','갱 이름을 입력하세요.');
      if(!integer(values.credits)||!integer(values.reputation)||Number(values.credits)<0||Number(values.reputation)<0)return reject('Enter non-negative whole totals.','합계는 0 이상의 정수로 입력하세요.');
      const changed={name:String(values.name).trim(),faction:values.faction||'Custom',edition:values.edition,alignment:values.alignment,credits:Number(values.credits),reputation:Number(values.reputation),notes:values.notes};
      if(g)Object.assign(g,changed);else{g={id:id(),...changed,meat:0,exploration:0,stash:[],fighters:[],vehicles:[],logs:[],manual:true};data.gangs.push(g);data.selectedGang=g.id;data.view='gang';data.tab='fighters';}
      return persist(g,lang()==='ko'?'갱 직접 기록 저장':'Manual gang record saved');
    });
  }
  function manualCampaign(c){
    return manualForm('campaign',c?'Edit manual campaign record':'Create manual campaign record',c?'캠페인 직접 기록 수정':'캠페인 직접 기록 생성',input('name','Campaign name','캠페인 이름',c?.name||'','text','required')+choose('edition','Edition label','판본 표시',['N23','N26','Custom'],c?.edition||data.edition||'N26')+input('campaignType','Recorded campaign type','기록할 캠페인 유형',c?.campaignType||'')+input('phase','Recorded phase','기록할 단계',c?.phase||'')+notes('description','Description','설명',c?.description||'')+notes('notes','Notes','메모',c?.notes||''),values=>{
      if(!String(values.name||'').trim())return reject('Enter a campaign name.','캠페인 이름을 입력하세요.');
      const changed={name:String(values.name).trim(),edition:values.edition,campaignType:values.campaignType||'Custom',phase:values.phase,description:values.description,notes:values.notes};
      if(c)Object.assign(c,changed);else{c={id:id(),...changed,campaignTypeId:'',ownerName:typeof cpPlayerName==='function'?cpPlayerName():'',createdAt:now(),tradingPosts:[],members:[],territories:[],battles:[],sessions:[],resources:[],allegiances:[],triumphs:[],logs:[],manual:true};data.campaigns.push(c);data.selectedCampaign=c.id;data.view='campaign';data.campaignTab='members';}
      if(typeof save==='function')save();return true;
    });
  }
  function manualFighter(){
    const g=typeof gang==='function'?gang():null;if(!g)return false;
    const stats=typeof baseStats!=='undefined'?Object.keys(baseStats):[];
    return manualForm('fighter','Create manual fighter record','파이터 직접 기록 생성',input('name','Name','이름','','text','required')+input('type','Recorded type','기록할 유형','')+input('cost','Recorded value','기록 가치',0,'number','min="0" step="1" required')+stats.map(key=>input('stat_'+key,key,key,'','number','step="1"')).join('')+notes('notes','Notes','메모'),values=>{
      if(!String(values.name||'').trim())return reject('Enter a name.','이름을 입력하세요.');
      if(!integer(values.cost)||Number(values.cost)<0)return reject('Enter a non-negative whole value.','기록 가치를 0 이상의 정수로 입력하세요.');
      const entered={};for(const key of stats){const value=values['stat_'+key];if(value==='')continue;if(!integer(value))return reject('Enter whole characteristic values or leave them blank.','능력치는 정수로 입력하거나 비워 두세요.');entered[key]=Number(value);}
      const f={id:id(),name:String(values.name).trim(),type:values.type||'Custom',cost:Number(values.cost),status:'Active',xp:0,kills:0,stats:entered,equipment:[],skills:[],effects:[],injuries:[],advancements:[],loadouts:[],xpHistory:[],notes:values.notes,manual:true};
      g.fighters??=[];g.fighters.push(f);data.selectedFighter=f.id;data.view='fighter';return persist(g,`${f.name}: manual record created`);
    });
  }
  const blocked={
    'data-fp':new Set(['advance-roll','skill-roll','injury-roll','power-boost-roll','add-power-boost','promote-fighter','clear-glitches','clear-glitches-kills','clear-glitches-downtime']),
    'data-vp':new Set(['damage-add','damage-roll','damage-repair','damage-repair-roll']),
    'data-cp':new Set(['participation-xp','scenario-roll']),
    'data-gt':new Set(['tactics-roll','chem-discount','pc-apply','pc-choose-damage','pc-choose-tactic']),
    'data-deep':new Set(['sale-half','sale-roll']),
    'data-ext':new Set(['repair-vehicle','add-vehicle-damage'])
  };
  function blockButtons(){
    for(const [attribute,values]of Object.entries(blocked))document.querySelectorAll('['+attribute+']').forEach(button=>{const action=button.getAttribute(attribute);const feature=attribute==='data-fp'&&/advance/.test(action)?'advancements':attribute==='data-fp'&&/injury/.test(action)?'injuries':attribute==='data-vp'?'vehicle_rules':attribute==='data-cp'&&action==='participation-xp'?'xp':attribute==='data-gt'&&action?.startsWith('pc-')?'post_cycle':null;if(attribute==='data-cp'&&action==='scenario-roll'&&window.MMCampaignData?.canRollScenario(button.dataset.value,typeof campaign==='function'?campaign():null))return;if(feature&&can(feature))return;if(!values.has(action)&&!(attribute==='data-gt'&&action?.startsWith('pc-')))return;button.dataset.officialBlocked=attribute+':'+action;button.removeAttribute(attribute);button.setAttribute('aria-disabled','true');button.removeAttribute('disabled');});
    document.querySelectorAll('[data-play="post-cycle"],[data-parity="post-cycle"]').forEach(button=>{button.removeAttribute('data-play');button.removeAttribute('data-parity');button.dataset.officialManual='cycle';});
    document.querySelectorAll('[data-gt-pc-action]').forEach(field=>{field.removeAttribute('data-gt-pc-action');field.disabled=true;});
    document.querySelectorAll('.gt-pc-panel:not([data-official-source-replaced])').forEach(panel=>{panel.dataset.officialSourceReplaced='yes';panel.replaceChildren();const note=document.createElement('div');note.className='notice';note.innerHTML=pendingBody()+`<button type="button" class="btn small" data-official-manual="cycle">${label('Record changes manually','변화 직접 기록')}</button>`;panel.append(note);});
  }
  let refreshing=false,queued=false,initialized=false;
  function refresh(){
    if(refreshing)return;refreshing=true;
    try{
      const content=document.querySelector('.content');
      if(content&&!content.querySelector(':scope > [data-official-source-notice]')){const banner=document.createElement('aside');banner.className='notice official-source-notice';banner.dataset.officialSourceNotice='';banner.dataset.referenceVerified=String(can('references'));banner.setAttribute('role','status');banner.innerHTML=(can('references')?label('Verified original data','룰북에서 확인한 정보','strong')+label('Verified data is available for this edition. Unverified categories stay manual.','이 판본의 룰북에서 확인한 항목을 제공합니다. 나머지 항목은 직접 입력할 수 있습니다.','p'):label('Official source pending','룰북 확인 필요','strong')+label('Automatic rules and preset data are unavailable. You can continue entering manual records.','룰북 내용이 확인되면 기본 정보와 자동 계산을 제공합니다. 그전에도 직접 입력할 수 있습니다.','p'))+`<button type="button" class="btn small" data-official-source-info>${label('Details','자세히')}</button>`+(data.view==='gang'?`<button type="button" class="btn small" data-official-manual="fighter">${label('Manual fighter','파이터 직접 기록')}</button>`:'');content.prepend(banner);}
      blockButtons();window.UKI18n?.refresh(document.querySelector('[data-official-source-notice]')||document.body);
    }finally{refreshing=false;}
  }
  function schedule(){if(queued)return;queued=true;queueMicrotask(()=>{queued=false;refresh();});}
  function init(){
    if(initialized)return;initialized=true;
    const originalXp=addXp,originalAdvance=addAdvancement,originalInjury=addInjury,originalCycle=postCycle,originalGang=editGang,originalCampaign=editCampaign;
    addXp=function(f,...args){return can('xp',gang()?.edition)?originalXp(f,...args):manualXp(f,...args);};
    addAdvancement=function(f,...args){return can('advancements',gang()?.edition)?originalAdvance(f,...args):manualAdvancement(f);};
    addInjury=function(f,...args){return can('injuries',gang()?.edition)?originalInjury(f,...args):manualInjury(f,...args);};
    postCycle=function(...args){return can('post_cycle')?originalCycle(...args):manualCycle();};
    editGang=function(g,...args){return can('gang_catalog',g?.edition||data.edition)?originalGang(g,...args):manualGang(g);};
    editCampaign=function(c,...args){const edition=c?.edition||data.edition,hasVerifiedCatalog=(window.RULES_DATA?.campaignTypes||[]).some(row=>row.source_verified===true&&String(row.edition_slug||row.edition||'').toLowerCase()===String(edition||'').toLowerCase());return can('campaign_catalog',edition)||hasVerifiedCatalog?originalCampaign(c,...args):manualCampaign(c);};if(typeof sellItem==='function')sellItem=manualSell;
    const previousFighter=editFighter;editFighter=function(f,...args){if(!f&&!can('recruitment'))return manualFighter();return previousFighter.call(this,f,...args);};
    if(typeof cpSessionXp==='function')cpSessionXp=function(s,p,row){const g=typeof cpGang==='function'?cpGang(p.gangId):null,f=g?.fighters?.find(f=>f.id===row.fighterId);return can('xp',g?.edition)?originalXp(f,{gang:g,row,sessionId:s.id}):manualXp(f,{gang:g,row,sessionId:s.id});};
    if(typeof cpSessionInjury==='function')cpSessionInjury=function(s,p,row){const g=typeof cpGang==='function'?cpGang(p.gangId):null,f=g?.fighters?.find(f=>f.id===row.fighterId);return can('injuries',g?.edition)?originalInjury(f,{gang:g,row,sessionId:s.id}):manualInjury(f,{gang:g,row,sessionId:s.id});};
    const previousRender=render;render=function(...args){const result=previousRender.apply(this,args);refresh();return result;};
    new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true});window.addEventListener('uk:languagechange',schedule);refresh();
  }
  window.addEventListener('click',event=>{
    const target=event.target.closest?.('[data-official-blocked],[data-official-source-info],button[data-official-manual]');if(!target)return;
    event.preventDefault();event.stopImmediatePropagation();if(target.dataset.officialManual==='cycle')manualCycle();else if(target.dataset.officialManual==='fighter')manualFighter();else showPending({activator:target});
  },true);
  window.MMOfficialSource={get pending(){return pending();},can,currentEdition,showPending,manualXp,manualAdvancement,manualInjury,manualCycle,manualSell,manualGang,refresh,init};
  init();
})();
