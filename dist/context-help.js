/* Contextual explanations stay beside the control and never change saved records. */
(function(){
  'use strict';
  const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const entries=()=>window.MM_CONTEXT_HELP||{};
  const recordBindings=new WeakMap();
  const norm=value=>String(value||'').trim().replace(/\s+/g,' ').replace(/[：:*]+$/,'').toLocaleLowerCase();
  const edition=value=>String(value||window.MMRuleReference?.currentEdition()||'n26').toLowerCase();
  const icon='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9"/><path d="M12 10v7M12 7v.1"/></svg>';
  const text=(value,tag='p',className='')=>value?`<${tag}${className?' class="'+className+'"':''} data-i18n-ko="${esc(value.ko||value.en)}">${esc(value.en||value.ko)}</${tag}>`:'';
  let contextReturn=null;
  function related(key,ed){
    let ids=[];
    if(key.startsWith('xp.'))ids=ed==='n26'?['n26-core-xp-events',...(/assistance/.test(key)?['n26-core-recovery']:/objective/.test(key)?['n26-core-objectives']:/serious|out-of-action|wreck/.test(key)?['n26-core-wounds-and-lethality','n26-core-injury-dice-results']:[])]:['n23-core-postbattle',...(/assistance|rally/.test(key)?['n23-core-end-phase']:/serious|out-of-action/.test(key)?['n23-core-damage-and-injury']:[])];
    else if(key.startsWith('characteristic.'))ids=ed==='n26'?['n26-core-stats']:[];
    else if(key.startsWith('advancement.'))ids=ed==='n26'?['n26-core-advancement-timing','n26-core-advancement-table']:['n23-core-advancement'];
    else if(key.startsWith('equipment.')&&/range|accuracy|strength|damage|lethality|ammo|ap/.test(key))ids=ed==='n26'?['n26-core-weapon-profile-fields','n26-core-wounds-and-lethality']:['n23-core-shooting-sequence','n23-core-damage-and-injury'];
    const rows=ids.map(id=>window.MMRuleReference?.lookup('coreRules',id,{edition:ed})).filter(Boolean);
    return rows.length?'<section class="uk-help-related">'+text({ko:'관련 판정 자세히 보기',en:'Related resolution'},'h3')+rows.map(row=>`<button type="button" class="btn small" data-context-rule="${esc(row.id)}" data-context-parent="${esc(key)}" data-context-edition="${esc(ed)}" data-i18n-ko="${esc(row.name_ko||row.name)}">${esc(row.name)}</button>`).join('')+'</section>':'';
  }
  function lookup(key,options={}){
    if(key.startsWith('rule.')){const row=window.MMRuleReference?.lookup('coreRules',key.slice(5),{edition:edition(options.edition)});return row?{title:{ko:row.name_ko||row.name,en:row.name},summary:{ko:row.description,en:window.UK_CATALOG_LOCALE?.rulesEn?.['coreRules:'+row.id]||row.description},sections:[]}:null;}
    if(key.startsWith('trait.')){const row=window.MMRuleReference?.traitLookup(key.slice(6),{edition:edition(options.edition)});return row?{title:{ko:row.name_ko||row.name,en:row.name},summary:{ko:row.description,en:window.UK_CATALOG_LOCALE?.rulesEn?.['weaponTraits:'+row.id]||row.description},sections:[]}:null;}
    const row=entries()[key];if(!row||row.edition&&row.edition!==edition(options.edition))return null;
    const variant=row.variants?.[edition(options.edition)]||{};
    return JSON.parse(JSON.stringify({...row,...variant,title:variant.title||row.title}));
  }
  function open(key,options={}){
    const statKey=window.MMGangStatGuide?.contextKeys[key];if(statKey&&typeof data!=='undefined'&&['gang','fighter'].includes(data.view)&&typeof gang==='function'&&gang()&&(!options.edition||edition(options.edition)===edition(gang().edition)))return window.MMGangStatGuide.open(statKey,options);
    if(window.MMOfficialSource?.pending&&!lookup(key,options)?.source_verified)return window.MMOfficialSource.showPending({activator:options.activator});
    if(key.startsWith('rule.'))return window.MMRuleReference?.open('coreRules',key.slice(5),options)||false;
    if(key.startsWith('trait.'))return window.MMRuleReference?.openTrait(key.slice(6),options)||false;
    const ed=edition(options.edition),row=lookup(key,{edition:ed});if(!row||!window.MMRuleReference?.openContext)return window.MMOfficialSource?.showPending({activator:options.activator})||false;
    contextReturn=null;
    const explain=(value,className='')=>row.source_verified&&ed==='n26'&&window.MMRuleTerms&&value?window.MMRuleTerms.prose(value.en||value.ko,value.ko||value.en,{edition:ed}).replace('mmrr-linked-prose','mmrr-linked-prose '+className):text(value,'p',className);
    const body=`<div class="mmrr-heading"><span class="mmrr-badge" data-i18n-ignore>${esc(ed.toUpperCase())}</span><span data-i18n-ko="항목 설명">How this works</span></div><div class="uk-help-content" data-context-help-key="${esc(key)}">${explain(row.summary,'uk-help-summary')}${(row.sections||[]).map(section=>'<section>'+text(section.heading,'h3')+explain(section.text)+'</section>').join('')}${related(key,ed)}</div>`;
    return window.MMRuleReference.openContext(row.title.en||row.title.ko,body,{nameKo:row.title.ko,activator:options.activator});
  }
  const characteristicKeys=new Set(['M','WS','BS','S','T','W','I','A','Sv','Ld','Cl','Wil','Int']);
  const profileKeys={range_short:'equipment.short-range',range_long:'equipment.long-range',accuracy_short:'equipment.short-accuracy',accuracy_long:'equipment.long-accuracy',acc_short:'equipment.short-accuracy',acc_long:'equipment.long-accuracy',strength:'equipment.strength',ap:'equipment.ap',damage:'equipment.damage',ammo:'equipment.ammo',lethality:'equipment.lethality',sr:'equipment.short-range',lr:'equipment.long-range',as:'equipment.short-accuracy',al:'equipment.long-accuracy',s:'equipment.strength',d:'equipment.damage',l:'equipment.lethality'};
  const vehicleKeys={M:'vehicle.movement',Front:'vehicle.front',Side:'vehicle.side',Rear:'vehicle.rear',HP:'vehicle.hull-points',Hnd:'vehicle.handling',Save:'vehicle.save',Sv:'vehicle.save',전면:'vehicle.front',측면:'vehicle.side',후면:'vehicle.rear',세이브:'vehicle.save',유형:null};
  const fieldKeys={startingXp:'xp.starting',xp:'xp.cumulative',xpCost:'advancement.xp-cost',kills:'fighter.ooa-count',costAdjustment:'gang.rating',reputation:'gang.reputation',credits:'gang.credits',tradePoints:'equipment.trade-points',wealth:'gang.wealth',rating:'gang.rating',edition:'gang.edition',status:'fighter.status',movement:'vehicle.movement',front:'vehicle.front',side:'vehicle.side',rear:'vehicle.rear',hull_points:'vehicle.hull-points',handling:'vehicle.handling',save:'vehicle.save',crew:'vehicle.crew',vpCrew:'vehicle.crew',locomotion:'vehicle.locomotion',quality:'vehicle.repairs',damage:'vehicle.damage',gangId:'campaign.ownership',xpEarned:'battle.xp',creditsEarned:'battle.rewards',reputationChange:'gang.reputation',sideJob:'battle.side-job',sideJobCompleted:'battle.side-job',crewSelection:'battle.crew',deployment:'battle.deployment',objective:'battle.objective',roundComplete:'battle.complete',allegiance:'gang.allegiance',alignment:'gang.alignment',affiliation:'gang.affiliation',alliance:'gang.alliance',archetype:'fighter.archetype',specialisation:'gang.specialisation',faction:'gang.faction',legacy:'gang.legacy',acquisition:'advancement.acquisition',skillSet:'advancement.skill-access',band:'advancement.roll',promoteType:'fighter.promotion',cost:'equipment.cost'};
  const actionKeys={
    'data-play':{'add-xp':'xp.cumulative','add-advancement':'advancement.overview','add-injury':'fighter.injuries'},
    'data-fp':{'promote-fighter':'fighter.promotion','sell-fighter':'fighter.sell','loadouts':'equipment.loadouts','loadout-create':'equipment.loadouts','loadout-rename':'equipment.loadouts','loadout-select':'equipment.loadouts','loadout-active':'equipment.loadouts','loadout-delete':'equipment.loadouts'},
    'data-deep':{'sell-stash':'equipment.sell'},
    'data-ext':{'copy-fighter':'fighter.copy'},
    'data-vp':{'hardpoints':'vehicle.hardpoints','damage-repair':'vehicle.repairs','damage-add':'vehicle.damage','hardpoint-fit':'vehicle.hardpoints','hardpoint-unfit':'vehicle.hardpoints'},
    'data-cp':{'battle-new':'battle.overview','territory-add':'campaign.territories','income':'campaign.income'}
  };
  function directText(node){return [...node.childNodes].filter(child=>child.nodeType===3||child.nodeType===1&&child.matches('strong,b,small,span:not(.mm-combo):not(.mmrr-info):not(.fp-counter)')).filter(child=>!child.matches?.('[data-mm-help],.uk-help-label')).map(child=>child.textContent).join(' ').trim();}
  let index=null;
  function textKey(value){if(!index){index=new Map();for(const [key,row] of Object.entries(entries()))for(const label of [row.title?.en,row.title?.ko,...(row.aliases||[])])if(label&&!index.has(norm(label)))index.set(norm(label),key);}const full=norm(value);return index.get(full)||index.get(full.split(':')[0].trim());}
  function makeButton(key,ed){const row=lookup(key,{edition:ed});if(!row)return null;const button=document.createElement('button');button.type='button';button.className='uk-help-trigger';button.dataset.mmHelp=key;button.dataset.mmHelpEdition=ed;button.dataset.mmHelpAuto='yes';button.dataset.i18nIgnore='';button.innerHTML=icon;labelButton(button,row);return button;}
  function labelButton(button,row){const ko=window.UKI18n?.language!=='en',label=(ko?row.title.ko:row.title.en)+(ko?' 설명 보기':' — View explanation');if(button.getAttribute('aria-label')!==label)button.setAttribute('aria-label',label);if(button.title!==label)button.title=label;}
  function skip(node){return !node||node.closest('.mmrr-overlay,.rp-view-2-card,.rp-view-3-card,.rp-view-4-card,[data-user-text],[contenteditable],.cp-rich-content,.gt-note-content,.mm-combo-options')||node.matches('[data-mm-help],[data-campaign-help]')||node.querySelector('[data-mm-help],[data-mmrr-open],[data-mmrr-trait],[data-mmrr-vehicle-rule],[data-campaign-help]');}
  function bindTerm(host,key,ed){if(skip(host)||!lookup(key,{edition:ed}))return;const button=document.createElement('button');button.type='button';button.className='uk-help-term';button.dataset.mmHelp=key;button.dataset.mmHelpEdition=ed;button.dataset.mmHelpAuto='yes';button.setAttribute('aria-haspopup','dialog');const row=lookup(key,{edition:ed});labelButton(button,row);while(host.firstChild)button.append(host.firstChild);host.append(button);}
  function appendHelp(host,key,ed){if(skip(host))return;const button=makeButton(key,ed);if(button){button.setAttribute('aria-haspopup','dialog');host.append(button);}}
  function labelHelp(label,key,ed){if(skip(label)||label.nextElementSibling?.matches('[data-mm-help],[data-campaign-help]')||label.closest('.fp-xp-label,.fp-xp-option,.uk-help-checkline')||!lookup(key,{edition:ed}))return;const input=label.querySelector('input[type=checkbox],input[type=radio]');if(input){if(label.nextElementSibling?.dataset.ukHelpOwner===key)return;const button=makeButton(key,ed);button.dataset.ukHelpOwner=key;const wrapper=document.createElement('div');wrapper.className='uk-help-checkline'+(label.classList.contains('wide')?' wide':'');label.before(wrapper);wrapper.append(label,button);return;}
    const nodes=[...label.childNodes].filter(node=>node.nodeType===3&&node.textContent.trim());if(!nodes.length){const title=label.querySelector(':scope > strong,:scope > b,:scope > .mm-combo-caption');if(title)appendHelp(title,key,ed);return;}
    const header=document.createElement('span');header.className='uk-help-label';nodes[0].before(header);nodes.forEach(node=>header.append(node));header.append(makeButton(key,ed));
  }
  function actionHelp(button,key,ed){if(!lookup(key,{edition:ed})||button.closest('.mmrr-overlay,.rp-view-2-card,.rp-view-3-card,.rp-view-4-card')||button.closest('.uk-help-action-pair')||button.nextElementSibling?.matches('[data-mm-help],[data-campaign-help]'))return;const help=makeButton(key,ed);help.dataset.ukHelpOwner=key;help.classList.add('uk-help-action');const wrapper=document.createElement('span');wrapper.className='uk-help-action-pair'+(button.classList.contains('danger')?' danger':'');button.before(wrapper);wrapper.append(button,help);}
  function recordHelp(host,row,kind,ed,fallback){
    if(skip(host)||!row)return;
    let button=makeButton(fallback,ed);if(!button){button=document.createElement('button');button.type='button';button.className='uk-help-trigger';button.dataset.mmHelp=fallback;button.dataset.mmHelpEdition=ed;button.dataset.mmHelpAuto='yes';button.innerHTML=icon;labelButton(button,{title:{en:row.name||'Record',ko:row.name_ko||row.name||'기록'}});}
    const query={...row,catalogId:row.catalogId||row.effectId||row.injuryId||row.skillId};
    recordBindings.set(button,{row:query,kind,fallback});host.append(button);
  }
  function specialRuleRecord(f,name,ed){
    const details=f?.specialRulesDetails??f?.special_rules_details??[],matches=Array.isArray(details)?details.filter(row=>row&&(row.name===name||row.name_ko===name)):[];
    return {...(matches.length===1?matches[0]:{}),name:matches.length===1?matches[0].name||name:name,fighterTypeId:f?.fighterTypeId||f?.catalogTypeId||f?.presetId,edition:ed};
  }
  function openRecord(record,options){
    const api=window.MMRuleReference,found=api?.lookup(record.kind,record.row,{edition:options.edition});
    if(found&&(record.kind==='specialRules'||String(found.description||found.effect||'').trim()||Object.keys(found.rule_data||{}).length))return api.open(record.kind,record.row,options);
    const row=lookup(record.fallback,options);if(!row){if(record.row.description)return api.openContext(record.row.name||'User record','<p>'+esc(record.row.description)+'</p>',{activator:options.activator});return window.MMOfficialSource?.showPending({activator:options.activator})||false;}
    const r={...found,...record.row},values=[['Characteristic / 능력치',r.stat],['Change / 변화',r.amount],['XP cost / XP 비용',r.xpCost],['Rating increase / 레이팅 증가',r.cost]].filter(([,value])=>value!==undefined&&value!==null&&value!=='');
    const modifiers=(found?.modifiers||r.modifiers||[]).filter(item=>item.stat_name&&Number.isFinite(Number(item.numeric_value??item.default_numeric_value))).map(item=>{let amount=Number(item.numeric_value??item.default_numeric_value),prefix='';if(item.operation==='subtract')amount=-Math.abs(amount);if(item.operation==='set')prefix='= ';else if(item.operation==='multiply')prefix='× ';else if(item.operation==='divide')prefix='÷ ';else if(amount>=0)prefix='+';return '<li>'+esc(item.stat_name)+': '+esc(prefix)+esc(amount)+'</li>';}).join('');const flags=['recovery','convalescence','killed','captured'].filter(key=>[true,'true'].includes(r.type_specific_data?.[key])).map(key=>'<li>'+esc(({recovery:'Recovery / 회복 상태',convalescence:'Convalescence / 요양',killed:'Killed / 사망',captured:'Captured / 생포'})[key])+'</li>').join('');
    const body='<div class="uk-help-content">'+text(row.summary,'p','uk-help-summary')+(r.description?'<p>'+esc(r.description)+'</p>':'')+(values.length?'<dl class="uk-help-record">'+values.map(([label,value])=>'<div><dt>'+esc(label)+'</dt><dd>'+esc(value)+'</dd></div>').join('')+'</dl>':'')+(modifiers||flags?'<ul>'+modifiers+flags+'</ul>':'')+text({en:'These are the values saved on this record. Custom entries and campaign rulings may differ from a catalog result. Reading this explanation applies no changes.',ko:'이 기록에 저장된 값을 표시합니다. 사용자 항목이나 캠페인 재정은 카탈로그 결과와 다를 수 있습니다. 설명을 읽어도 변경 사항은 적용되지 않습니다.'})+'</div>';
    return api.openContext(r.name||row.title.en,body,{activator:options.activator});
  }
  function refresh(){
    if(!Object.keys(entries()).length)return;const ed=edition();
    document.querySelectorAll('[data-mm-help]').forEach(button=>{if(button.dataset.mmHelpAuto==='yes')button.dataset.mmHelpEdition=ed;const row=lookup(button.dataset.mmHelp,{edition:button.dataset.mmHelpEdition||ed});if(row)labelButton(button,row);});
    document.querySelectorAll('.fp-stat-table>span>b,.rp-stats th,.fp-adjust-grid label>strong').forEach(host=>{const name=host.textContent.trim();if(characteristicKeys.has(name))bindTerm(host,'characteristic.'+name,ed);});
    document.querySelectorAll('[data-profile-stat] dt').forEach(host=>{const key=profileKeys[host.parentElement.dataset.profileStat]||textKey(host.textContent);if(key)bindTerm(host,key,ed);});
    document.querySelectorAll('.vp-stat-table th').forEach(host=>{const key=vehicleKeys[host.textContent.trim()];if(key)bindTerm(host,key,ed);});
    document.querySelectorAll('.rp-weapons th').forEach(host=>{const name=host.textContent.trim(),key=({SR:'equipment.short-range',LR:'equipment.long-range',AS:'equipment.short-accuracy',AL:'equipment.long-accuracy',Str:'equipment.strength',S:'equipment.strength',AP:'equipment.ap',D:'equipment.damage',L:'equipment.lethality',Am:'equipment.ammo',Traits:'equipment.traits'})[name]||textKey(name);if(key)bindTerm(host,key,ed);});
    document.querySelectorAll('.form label,.form .mm-combo-label').forEach(label=>{const field=label.querySelector('input[name],select[name],textarea[name]');let key=field?.name.startsWith('stat_')?'characteristic.'+field.name.slice(5):fieldKeys[field?.name];if(field?.name==='cost'&&label.closest('[data-fp-advance]'))key='advancement.rating';if(field?.name==='status'&&label.closest('.cp-modal'))key='battle.status';if(field?.name==='condition'){const token=field.value;if(window.MMRuleReference?.traitLookup(token,{edition:ed}))key='trait.'+token;else if(ed==='n26'){const slug=/^(Suppressed|Seriously Injured)$/.test(token)?'serious-suppression-markers':/^(Injured \/ Damaged|Intoxicated|Webbed)$/.test(token)?'injured-intoxicated-webbed':token==='Insanity'?'insanity':/^(Fearsome|Frenzy|Terrifying)$/.test(token)?'fearsome-frenzy-hatred':'conditions';key='rule.n26-core-'+slug;}else key='rule.n23-core-fighter-states';}if(!key)key=textKey(directText(label));if(key)labelHelp(label,key,ed);});
    document.querySelectorAll('.section-heading h2,.fighter-page h2,.stash-page h2,.entity-facts>span,.entity-meta,.vp-slots label,.table-wrap th:not(.rp-stats th):not(.rp-weapons th)').forEach(host=>{const key=textKey(directText(host));if(key)appendHelp(host,key,ed);});
    for(const [attribute,mapping] of Object.entries(actionKeys))for(const [value,key] of Object.entries(mapping))document.querySelectorAll('['+attribute+'="'+value+'"]').forEach(button=>actionHelp(button,key,ed));
    document.querySelectorAll('[data-parity="fighter-status"]').forEach(button=>actionHelp(button,'fighter.'+({Active:'active',Recovery:'recovery','In Recovery':'recovery',Captured:'captured',Retired:'retired',Dead:'dead',Enslaved:'enslaved',Starved:'starved'}[button.dataset.value]||'status'),ed));
    document.querySelectorAll('[data-add-skill]').forEach(button=>actionHelp(button,'advancement.skills',ed));
    document.querySelectorAll('[data-stash-assign]').forEach(button=>actionHelp(button,'equipment.assign',ed));
    document.querySelectorAll('[data-to-stash]').forEach(button=>actionHelp(button,'equipment.stash',ed));
    document.querySelectorAll('[data-parity="delete-fighter-page"]').forEach(button=>actionHelp(button,'fighter.delete',ed));
    const s=typeof data!=='undefined'?data:{},g=(s.gangs||[]).find(row=>row.id===s.selectedGang),f=g?.fighters?.find(row=>row.id===s.selectedFighter);
    document.querySelectorAll('.fp-tag').forEach(host=>{const remove=host.querySelector('[data-fp="remove-rule"],[data-fp="remove-subtype"]');if(!remove)return;const name=[...host.childNodes].filter(node=>node.nodeType===3).map(node=>node.textContent).join('').trim(),subtype=remove.dataset.fp==='remove-subtype',owner=g?.fighters?.find(row=>row.id===remove.dataset.id)||f;recordHelp(host,subtype?{name}:specialRuleRecord(owner,name,ed),subtype?'fighterSubtypes':'specialRules',ed,subtype?'fighter.subtypes':'fighter.special-rules');});
    document.querySelectorAll('.fp-special-rules:not([data-uk-help-decorated])').forEach(host=>{const names=host.textContent.split(' · ').filter(Boolean);host.dataset.ukHelpDecorated='yes';host.replaceChildren();names.forEach((name,index)=>{if(index)host.append(document.createTextNode(' · '));const term=document.createElement('button');term.type='button';term.className='uk-help-term';term.dataset.mmHelp='fighter.special-rules';term.dataset.mmHelpEdition=ed;term.dataset.mmHelpAuto='yes';term.textContent=name;term.setAttribute('aria-haspopup','dialog');recordBindings.set(term,{row:specialRuleRecord(f,name,ed),kind:'specialRules',fallback:'fighter.special-rules'});host.append(term);});});
    if(f){
      document.querySelectorAll('[data-play="heal-injury"]').forEach(button=>recordHelp(button.closest('.mini-row')?.querySelector('span'),f.injuries?.find(row=>row.id===button.dataset.sub),'effects',ed,'fighter.injuries'));
      document.querySelectorAll('[data-play="remove-advancement"]').forEach(button=>recordHelp(button.closest('.mini-row')?.querySelector('span'),f.advancements?.find(row=>row.id===button.dataset.sub),'effects',ed,'advancement.overview'));
    }
  }
  let queued=false;
  function schedule(){if(queued)return;queued=true;queueMicrotask(()=>{queued=false;refresh();});}
  window.addEventListener('click',event=>{
    const drill=event.target.closest?.('[data-context-rule]'),back=event.target.closest?.('[data-context-return]');
    if(drill){event.preventDefault();event.stopImmediatePropagation();contextReturn={key:drill.dataset.contextParent,edition:drill.dataset.contextEdition,scrollTop:document.querySelector('.mmrr-body')?.scrollTop||0};if(window.MMRuleReference.open('coreRules',drill.dataset.contextRule,{edition:contextReturn.edition})){document.querySelector('.mmrr-body').insertAdjacentHTML('afterbegin','<button type="button" class="btn small mmrr-back" data-context-return data-i18n-ko="← 항목 설명으로">← Back to explanation</button>');window.UKI18n?.refresh(document.querySelector('.mmrr-overlay'));}return;}
    if(back&&contextReturn){event.preventDefault();event.stopImmediatePropagation();const parent=contextReturn;open(parent.key,{edition:parent.edition});document.querySelector('.mmrr-body').scrollTop=parent.scrollTop;return;}
    const trigger=event.target.closest?.('[data-mm-help]');if(!trigger)return;event.preventDefault();event.stopImmediatePropagation();const options={edition:trigger.dataset.mmHelpEdition,activator:trigger},record=recordBindings.get(trigger);if(record)openRecord(record,options);else open(trigger.dataset.mmHelp,options);
  },true);
  window.addEventListener('uk:languagechange',schedule);
  new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true});
  window.MMContextHelp={open,lookup,refresh};schedule();
})();
