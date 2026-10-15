/* Read-only rule references. Catalog IDs and editions stay distinct from saved records. */
(function(){
  'use strict';
  const kinds={skills:'스킬',equipment:'장비',territories:'영토',tactics:'갱 택틱',fighterTypes:'파이터 유형',gangTypes:'갱 유형',effects:'효과·부상',scenarios:'시나리오',campaignTypes:'캠페인',sideJobs:'사이드 잡',weaponTraits:'무기 특성',specialRules:'특수 규칙',coreRules:'기본 규칙',fighterSubtypes:'파이터 분류',scenarioEntries:'배치·목표·크루',campaignTriumphs:'캠페인 성과'};
  const aliases={skill:'skills',weapon:'equipment',territory:'territories',tactic:'tactics',fighters:'fighterTypes',fighter:'fighterTypes',gang:'gangTypes',injuries:'effects',trait:'weaponTraits'};
  const bindings=new WeakMap();
  let overlay=null,restoreFocus=null,inertStates=[],previousOverflow='',scheduled=false,libraryState=null,libraryReturn=null,equipmentContext=null;
  const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const copy=value=>value==null?value:JSON.parse(JSON.stringify(value));
  const rules=()=>globalThis.RULES_DATA||{};
  const state=()=>typeof data!=='undefined'?data:{};
  const kindOf=value=>aliases[value]||value;
  const title=row=>row?.name||row?.equipment_name||row?.fighter_type||row?.territory_name||row?.effect_name||row?.scenario_name||row?.gang_type||row?.campaign_type_name||'';
  const edition=value=>String(value||'').trim().toLowerCase();
  function rowEdition(row,kind){
    const own=edition(row?.edition_slug||row?.edition);if(own)return own;
    if(kind==='tactics')return edition((rules().tacticsPacks||[]).find(pack=>pack.id===row?.tactics_cards_pack_id)?.edition_slug||(rules().tacticsPacks||[]).find(pack=>pack.id===row?.tactics_cards_pack_id)?.edition);
    return '';
  }
  function currentEdition(){
    const selected=document.querySelector('.gp-edition [data-value].selected,[data-cp="create-edition"].selected');
    if(selected)return edition(selected.dataset.value);
    const formEdition=document.querySelector('#modal-form [name="edition"]');if(formEdition?.value)return edition(formEdition.value);
    const s=state(),c=s.view==='campaign'?(s.campaigns||[]).find(row=>row.id===s.selectedCampaign):null,g=['gang','fighter'].includes(s.view)?(s.gangs||[]).find(row=>row.id===s.selectedGang):null;
    return edition(c?.edition||g?.edition||s.edition||'n26');
  }
  function customRows(kind){const key=kind==='fighterTypes'?'fighters':kind;return state().customAssets?.[key]||[];}
  function rows(kind){
    kind=kindOf(kind);let official=Array.isArray(rules()[kind])?rules()[kind]:[];
    if(kind==='tactics'){const nested=(rules().tacticsPacks||[]).flatMap(pack=>(pack.cards||[]).map(card=>({...card,edition_slug:rowEdition(card,kind)||rowEdition(pack),pack_name:card.pack_name||pack.name})));official=[...official,...nested.filter(card=>!official.some(row=>row.id===card.id))];}
    return [...customRows(kind).map(row=>({...row,is_custom:true})),...official];
  }
  function matchesEdition(row,kind,expected){const actual=rowEdition(row,kind);return !expected||!actual||actual===expected;}
  function lookup(kind,query,options={}){
    kind=kindOf(kind);const expected=edition(options.edition||currentEdition()),all=rows(kind),list=all.filter(row=>matchesEdition(row,kind,expected));
    if(query==null)return null;
    const supplied=typeof query==='object'?query:null;
    if(supplied&&!matchesEdition(supplied,kind,expected))return null;
    const ids=supplied?[supplied.customAssetId,supplied.catalogId,supplied.cardId,supplied.skillId,supplied.territoryId,supplied.fighterTypeId,supplied.catalogTypeId,supplied.presetId,supplied.tactics_cards_id,supplied.id].filter(Boolean):[String(query)];
    let found=null;for(const id of ids){const exact=all.find(row=>String(row.id)===String(id));if(exact&&!matchesEdition(exact,kind,expected))return null;found=list.find(row=>String(row.id)===String(id));if(found)break;}
    // A name is a fallback only when it identifies a single rule in this edition.
    if(!found){const name=supplied?title(supplied):String(query),named=list.filter(row=>title(row)===name||row.name_ko===name);if(named.length===1)found=named[0];}
    if(supplied){
      const hasOwn=String(supplied.description||supplied.effect||'').trim();
      if(found){const merged={...found};if(supplied.descriptionOverride===true){merged.description=supplied.description??supplied.notes??'';merged.rule_data=supplied.rule_data??{};merged.reference_custom_description=true;}else if(hasOwn){merged.description=supplied.description||supplied.effect;if(supplied.reference_custom_description||supplied.is_custom||merged.description!==found.description)merged.reference_custom_description=true;}if(supplied.name)merged.name=supplied.name;return copy(merged);}
      if(hasOwn&&title(supplied))return copy({...supplied,is_custom:true});
    }
    return found?copy(found):null;
  }
  const hasReference=row=>!!row&&(!!String(row.description||'').trim()||!!row.rule_data&&Object.keys(row.rule_data).length>0||!!(row.weapon_profiles||row.weaponProfiles||[]).length);
  function sourceLabel(row){
    if(row.reference_custom_description||row.is_custom)return '사용자 설명';
    const p=row.rule_provenance||{},sources=Array.isArray(p)?p:[p];
    const labels=sources.map(item=>typeof item==='string'?item:item?.book_title||item?.book||item?.source_title||item?.title||'').filter(Boolean);
    for(const item of sources)for(const id of item?.source_ids||[]){const source=(rules().ruleSources||[]).find(source=>source.id===id);if(source?.title)labels.push(source.title+(source.date?' ('+source.date+')':''));}
    if(row.source_title)labels.unshift(row.source_title);
    return [...new Set(labels)].join(' · ');
  }
  function details(row,options={}){
    if(!row)return null;const kind=kindOf(options.kind||'');if(!matchesEdition(row,kind,edition(options.edition||currentEdition())))return null;
    return {name:title(row),nameKo:row.name_ko||'',edition:rowEdition(row,kind),description:String(row.description||row.effect||''),sourceLabel:sourceLabel(row),ruleData:copy(row.rule_data||null),profiles:copy(row.weapon_profiles||row.weaponProfiles||[]),custom:!!(row.is_custom||row.reference_custom_description)};
  }
  const fieldNames={timing:'사용 시점',when:'사용 시점',effect:'효과',effects:'효과',benefit:'혜택',benefits:'혜택',cost:'비용',income:'수입',requirements:'조건',condition:'조건',conditions:'조건',restrictions:'제한',range:'거리',duration:'지속',action:'행동',actions:'행동',uses:'횟수',roll:'주사위',target:'대상',targets:'대상',save:'방어',availability:'가용성',trade_points:'거래 포인트',d66_min:'D66 최솟값',d66_max:'D66 최댓값',notes:'참고',special_rules:'특수 규칙',skills:'스킬',recovery:'회복',convalescence:'요양',name:'이름',description:'설명',type:'유형'};
  Object.assign(fieldNames,{eligible_models:'대상 모델',skill_set:'스킬 세트',dodge_d6:'회피에 필요한 D6',template_evade_inches:'템플릿 회피 이동(인치)',enemy_exclusion_inches:'적과의 최소 거리(인치)',income_credits:'수입(cr)',income_replacement:'수입 대신 선택',discount_credits:'할인(cr)',minimum_cost:'최소 비용(cr)',income_foregone:'수입 포기',can_be_staked:'내기로 걸기 가능',can_be_lost:'상실 가능',additional_actions:'추가 행동',uses_per_gang_per_battle:'갱당 전투별 사용 횟수',uses_per_battle:'전투별 사용 횟수',uses_per_round:'라운드별 사용 횟수',save_improvement:'Save 향상',initiative_modifier:'Initiative 변화',cost_credits:'비용(cr)',cost_on_owner:'소유자 부담',available_actions:'가능한 행동',eligible_states:'대상 상태',allowed_states:'가능한 상태',excluded_states:'제외 상태',additional_attacks:'추가 공격',additional_xp_on_success:'성공 시 추가 XP',restore_wounds:'회복 운드',lethality:'치명성',strength:'힘',ap:'AP',trait:'특성',traits:'특성',profile:'프로필',check:'체크',test:'판정',on_failure:'실패 시',on_success:'성공 시',success_at_least:'성공에 필요한 값',movement_inches:'이동(인치)',range_inches:'거리(인치)',distance_inches:'거리(인치)',range_short:'단거리',range_long:'장거리',characteristic_modifiers:'능력치 변화',characteristic_improvements:'능력치 향상',characteristic_overrides:'능력치 변경',choice:'선택',choices:'선택지',options:'선택지',quantity:'수량',recovery:'회복',convalescence:'요양',captured:'생포',dead:'사망',destroyed:'파괴',remove_from_roster:'명단에서 제거',roll_injury_dice:'부상 주사위',additional_credits:'추가 크레딧',reputation:'명성',scoring:'득점',vp:'승점',target_vp:'목표 승점',win_condition:'승리 조건',deployment:'배치',setup:'준비',reinforcements_deck:'증원',d6:'D6',d66:'D66','2d6':'2D6',Save:'Save',T:'T',W:'W',S:'S',M:'M',A:'A',WS:'WS',BS:'BS',I:'I',Sv:'Sv',Ld:'Ld',Cl:'Cl',Wil:'Wil',Int:'Int'});
  function structured(value,depth=0){
    if(value==null||value==='')return '';
    if(typeof value!=='object')return esc(typeof value==='boolean'?(value?'예':'아니요'):value);
    if(depth>5)return '';
    if(Array.isArray(value)){const items=value.map(item=>structured(item,depth+1)).filter(Boolean);return items.length?'<ul>'+items.map(item=>'<li>'+item+'</li>').join('')+'</ul>':'';}
    const fields=Object.entries(value).filter(([key,item])=>item!=null&&fieldNames[key]).map(([key,item])=>{const body=structured(item,depth+1);return body?`<div><dt>${esc(fieldNames[key])}</dt><dd>${body}</dd></div>`:'';}).filter(Boolean);return fields.length?'<dl class="mmrr-fields">'+fields.join('')+'</dl>':'';
  }
  function profileMarkup(profiles,ed){
    if(!profiles.length)return '';const n26=ed==='n26',columns=[['profile_name','프로필'],['range_short','단거리'],['range_long','장거리'],...(!n26?[['acc_short','단거리 명중'],['acc_long','장거리 명중']]:[]),['strength','S'],['ap','AP'],...(n26?[['lethality','L']]:[['damage','D'],['ammo','탄약']]),['traits','특성']];
    return `<div class="mmrr-table-wrap"><table><thead><tr>${columns.map(([,label])=>`<th>${label}</th>`).join('')}</tr></thead><tbody>${profiles.map(p=>'<tr>'+columns.map(([key])=>`<td>${esc(Array.isArray(p[key])?p[key].join(', '):p[key]??(key==='profile_name'?p.name:null)??'—')}</td>`).join('')+'</tr>').join('')}</tbody></table></div>`;
  }
  function detailMarkup(row,kind,ed){
    const d=details(row,{kind,edition:ed});if(!d)return '<p class="mmrr-empty">이 판본의 규칙을 찾을 수 없습니다.</p>';
    const extra=d.ruleData?structured(d.ruleData):'';
    return `<div class="mmrr-heading"><span class="mmrr-badge">${esc((d.edition||ed).toUpperCase())}</span>${kinds[kind]?`<span>${esc(kinds[kind])}</span>`:''}</div>${d.nameKo?`<h3 class="mmrr-korean-name">${esc(d.nameKo)}</h3>`:''}${d.description?`<p class="mmrr-description">${esc(d.description)}</p>`:''}${profileMarkup(d.profiles,d.edition||ed)}${extra?`<details class="mmrr-more" ${d.description?'':'open'}><summary>추가 수치·조건</summary>${extra}</details>`:''}${!hasReference(row)?'<p class="mmrr-empty">아직 확인된 규칙 설명이 없습니다.</p>':''}${d.sourceLabel?`<p class="mmrr-source">${esc(d.sourceLabel)}</p>`:''}`;
  }
  function editable(node){return node?.matches?.('input:not([type=hidden]):not([type=checkbox]):not([type=radio]),textarea,select,[contenteditable=true]');}
  function safeFocus(node){if(node?.isConnected&&!editable(node)&&!node.closest('[inert],[hidden]'))node.focus({preventScroll:true});}
  function close(){
    if(!overlay)return;overlay.remove();overlay=null;libraryState=null;libraryReturn=null;
    for(const item of inertStates){if(!item.node.isConnected)continue;if(!item.inert)item.node.removeAttribute('inert');if(item.aria==null)item.node.removeAttribute('aria-hidden');else item.node.setAttribute('aria-hidden',item.aria);}inertStates=[];
    document.body.style.overflow=previousOverflow;safeFocus(restoreFocus);restoreFocus=null;
  }
  function shell(name,body,activator){
    if(!overlay){restoreFocus=activator||document.activeElement;window.MMWidgets?.closeAll();if(editable(document.activeElement))document.activeElement.blur();previousOverflow=document.body.style.overflow;
      inertStates=[...document.body.children].filter(node=>node.tagName!=='SCRIPT').map(node=>({node,inert:node.hasAttribute('inert'),aria:node.getAttribute('aria-hidden')}));
      inertStates.forEach(({node})=>{node.setAttribute('inert','');node.setAttribute('aria-hidden','true');});
      overlay=document.createElement('div');overlay.className='mmrr-overlay';document.body.append(overlay);document.body.style.overflow='hidden';
    }
    overlay.innerHTML=`<section class="mmrr-dialog" role="dialog" aria-modal="true" aria-labelledby="mmrr-title"><header><h2 id="mmrr-title">${esc(name)}</h2><button type="button" data-mmrr-close aria-label="규칙 닫기">×</button></header><div class="mmrr-body">${body}</div><footer><button class="btn" type="button" data-mmrr-close>닫기</button></footer></section>`;
    safeFocus(overlay.querySelector('[data-mmrr-close]'));
  }
  function open(kind,query,options={}){
    if(typeof kind==='object'){options=query||{};query=kind;kind=options.kind||'skills';}
    kind=kindOf(kind);const ed=edition(options.edition||currentEdition()),row=lookup(kind,query,{edition:ed});if(!row)return false;
    libraryReturn=options.libraryReturn?{...options.libraryReturn}:null;libraryState=null;shell(title(row),(libraryReturn?'<button type="button" class="btn small mmrr-back" data-mmrr-back>← 규칙 목록</button>':'')+detailMarkup(row,kind,ed),options.activator);return true;
  }
  function availableKinds(){return Object.keys(kinds).filter(kind=>rows(kind).some(hasReference));}
  function library(options={}){
    const categories=availableKinds();libraryState={edition:edition(options.edition||currentEdition()),kind:categories.includes(options.kind)?options.kind:categories[0]||'skills',query:String(options.query||'')};
    shell('규칙 참고',`<div class="mmrr-filters"><label>판본<select data-mmrr-edition>${['n26','n23'].map(ed=>`<option value="${ed}" ${libraryState.edition===ed?'selected':''}>${ed.toUpperCase()}</option>`).join('')}</select></label><label>분류<select data-mmrr-kind>${categories.map(kind=>`<option value="${kind}" ${libraryState.kind===kind?'selected':''}>${esc(kinds[kind])}</option>`).join('')}</select></label><label class="mmrr-search">이름 검색<input type="search" data-mmrr-search placeholder="이름 또는 한국어 이름" autocomplete="off" value="${esc(libraryState.query)}"></label></div><div class="mmrr-results" aria-live="polite"></div>`,options.activator);drawLibrary();return true;
  }
  function drawLibrary(){
    if(!libraryState||!overlay)return;const s=libraryState,q=s.query.trim().toLocaleLowerCase(),list=rows(s.kind).filter(row=>matchesEdition(row,s.kind,s.edition)&&hasReference(row)&&(!q||(window.UKI18n?UKI18n.matches([title(row),row.name_ko],q):[title(row),row.name_ko].join(' ').toLocaleLowerCase().includes(q)))),container=overlay.querySelector('.mmrr-results');
    container.innerHTML=`<p class="mmrr-count">${list.length}개</p>`+(list.length?list.slice(0,150).map(row=>`<article><h3>${esc(title(row))}${row.name_ko?` <small>${esc(row.name_ko)}</small>`:''}</h3>${row.description?`<p>${esc(row.description)}</p>`:''}<button type="button" class="btn small" data-mmrr-result="${esc(row.id||title(row))}">규칙 보기</button></article>`).join('')+(list.length>150?'<p class="mmrr-empty">이름을 검색하면 나머지 항목도 찾을 수 있습니다.</p>':''):'<p class="mmrr-empty">이 판본·분류에 확인된 규칙이 없습니다.</p>');
  }
  function infoButton(row,kind,ed){const button=document.createElement('button');button.type='button';button.className='mmrr-info';button.dataset.mmrrOpen='';button.textContent='ⓘ';button.setAttribute('aria-label',title(row)+' 규칙 보기');button.title='규칙 보기';bindings.set(button,{row,kind,edition:ed});return button;}
  function addInfo(host,row,kind,ed){if(!host)return;const existing=host.querySelector(':scope > [data-mmrr-open]');if(!hasReference(row)){existing?.remove();return;}if(existing)return;host.append(infoButton(row,kind,ed));}
  function idIndex(ed){const result=new Map();for(const kind of Object.keys(kinds))for(const row of rows(kind))if(row.id&&matchesEdition(row,kind,ed)&&!result.has(row.id))result.set(row.id,{row,kind});return result;}
  function decorateCombos(ed){
    const index=idIndex(ed);
    document.querySelectorAll('[data-mm-combo]').forEach(combo=>{
      const input=combo.querySelector('input[type=hidden][name]');if(!input)return;
      combo.querySelectorAll('[data-mm-pick]').forEach(option=>{if(option.querySelector('.mmrr-option-summary'))return;const found=index.get(option.dataset.mmPick);if(found?.row.description){const summary=document.createElement('small');summary.className='mmrr-option-summary';if(found.row.name_ko){const name=document.createElement('span');name.dataset.i18nCatalogName=title(found.row);name.textContent=found.row.name_ko;summary.append(name,document.createTextNode(' · '));}const description=document.createElement('span');description.textContent=found.row.description;summary.append(description);option.append(summary);}});
      const label=combo.closest('label'),old=label?.querySelector(':scope > [data-mmrr-open]'),found=index.get(input.value);
      if(old&&(!found||!hasReference(found.row)||old.dataset.mmrrSelection!==input.value)){old.remove();}
      if(label&&found&&hasReference(found.row)&&!label.querySelector(':scope > [data-mmrr-open]')){const button=infoButton(found.row,found.kind,ed);button.dataset.mmrrSelection=input.value;button.classList.add('mmrr-selected-info');button.textContent='ⓘ 규칙 보기';label.append(button);}
    });
  }
  function decorate(){
    const ed=currentEdition(),s=state(),g=(s.gangs||[]).find(row=>row.id===s.selectedGang),c=(s.campaigns||[]).find(row=>row.id===s.selectedCampaign),f=g?.fighters?.find(row=>row.id===s.selectedFighter);
    const crumb=document.querySelector('.crumb');if(crumb&&!crumb.querySelector('[data-mmrr-library]')){const button=document.createElement('button');button.type='button';button.dataset.mmrrLibrary='';button.className='mmrr-library-button';button.textContent='규칙';button.setAttribute('aria-label','규칙 참고 열기');crumb.append(button);}
    const menu=document.querySelector('.mm-settings-menu');if(menu&&!menu.querySelector('[data-mmrr-library]')){const button=document.createElement('button');button.type='button';button.dataset.mmrrLibrary='';button.textContent='▤ 규칙 참고';menu.querySelector('.mm-menu-social')?.before(button);}
    decorateCombos(ed);
    document.querySelectorAll('[data-fp="equipment-buy"]').forEach(button=>addInfo(button.closest('.fp-buy-row')?.querySelector('span'),lookup('equipment',button.dataset.sub,{edition:ed}),'equipment',ed));
    document.querySelectorAll('[data-cp="territory-preset-add"]').forEach(button=>addInfo(button.closest('tr')?.querySelector('td'),lookup('territories',button.dataset.id,{edition:ed}),'territories',ed));
    document.querySelectorAll('[data-cp="territory-edit"]').forEach(button=>{const item=c?.territories?.find(row=>row.id===button.dataset.id);if(item)addInfo(button.closest('tr')?.querySelector('td'),lookup('territories',item,{edition:ed}),'territories',ed);});
    document.querySelectorAll('[data-cp="territory-description"]').forEach(button=>{const item=c?.territories?.find(row=>row.id===button.dataset.id);if(item)addInfo(button.closest('tr')?.querySelector('td:nth-child(2)'),lookup('territories',item,{edition:ed}),'territories',ed);});
    document.querySelectorAll('[data-gt-tactics-card]').forEach(input=>addInfo(input.closest('label'),lookup('tactics',input.dataset.gtTacticsCard,{edition:ed}),'tactics',ed));
    document.querySelectorAll('[data-gt="tactics-edit"]').forEach(button=>{const item=g?.tactics?.find(row=>row.id===button.dataset.card);if(item)addInfo(button.closest('tr')?.querySelector('td'),lookup('tactics',item,{edition:ed}),'tactics',ed);});
    document.querySelectorAll('[data-ext="remove-skill"]').forEach(button=>{const fighter=g?.fighters?.find(row=>row.id===button.dataset.id)||f,skillName=fighter?.skills?.[Number(button.dataset.sub)],item=fighter?.skillDetails?.find(row=>row.name===skillName)||{name:skillName};if(skillName)addInfo(button.closest('tr')?.querySelector('td'),lookup('skills',item,{edition:ed}),'skills',ed);});
    document.querySelectorAll('[data-fp="equipment-detail"]').forEach(button=>{const fighter=g?.fighters?.find(row=>row.id===button.dataset.id)||f,item=fighter?.equipment?.find(row=>row.id===button.dataset.sub);if(item)addInfo(button.parentElement,lookup('equipment',item,{edition:ed}),'equipment',ed);});
    const banner=document.querySelector('.fighter-banner>div');if(f&&banner)addInfo(banner,lookup('fighterTypes',{catalogId:f.fighterTypeId||f.catalogTypeId||f.presetId},{edition:ed}),'fighterTypes',ed);
    if(equipmentContext){const dialog=document.querySelector('.rp-equipment-dialog,.fp-modal'),head=dialog?.querySelector('.modal-head'),name=head?.querySelector('h2')?.textContent?.trim(),canonical=title(equipmentContext.row);if(name===canonical||window.UKI18n&&name===UKI18n.name(canonical))addInfo(head,equipmentContext.row,'equipment',equipmentContext.edition);if(!document.querySelector('.modal-bg'))equipmentContext=null;}
    const territorySummary=document.querySelector('.cp-summary-title')?.nextElementSibling;if(territorySummary&&c)territorySummary.querySelectorAll('tbody tr').forEach(row=>{const name=row.children[1]?.childNodes[0]?.textContent?.trim(),items=c.territories.filter(item=>item.name===name||window.UKI18n&&UKI18n.name(item.name)===name);if(items.length===1)addInfo(row.children[1],lookup('territories',items[0],{edition:ed}),'territories',ed);});
  }
  function schedule(){if(scheduled)return;scheduled=true;queueMicrotask(()=>{scheduled=false;decorate();});}
  window.addEventListener('click',event=>{
    const equipmentButton=event.target.closest?.('[data-rp="equipment"],[data-fp="equipment-detail"]');if(equipmentButton){const s=state(),g=(s.gangs||[]).find(row=>row.id===s.selectedGang),f=g?.fighters?.find(row=>row.id===equipmentButton.dataset.id),item=f?.equipment?.find(row=>row.id===(equipmentButton.dataset.equipment||equipmentButton.dataset.sub));if(item)equipmentContext={row:lookup('equipment',item),edition:currentEdition()};schedule();}
    const button=event.target.closest?.('[data-mmrr-open],[data-mmrr-library],[data-mmrr-close],[data-mmrr-result],[data-mmrr-back]');
    if(button){event.preventDefault();event.stopImmediatePropagation();if(button.hasAttribute('data-mmrr-close'))return close();if(button.hasAttribute('data-mmrr-back'))return library(libraryReturn||{});if(button.hasAttribute('data-mmrr-library'))return library({activator:button});if(button.hasAttribute('data-mmrr-result')){const s=libraryState;if(s)return open(s.kind,button.dataset.mmrrResult,{edition:s.edition,libraryReturn:{...s}});return;}const bound=bindings.get(button);if(bound)return open(bound.kind,bound.row,{edition:bound.edition,activator:button});}
    if(overlay&&event.target===overlay){event.preventDefault();event.stopImmediatePropagation();close();}
  },true);
  window.addEventListener('keydown',event=>{
    if(!overlay)return;if(event.key==='Escape'){event.preventDefault();event.stopImmediatePropagation();close();return;}
    if(event.key==='Tab'){const nodes=[...overlay.querySelectorAll('button,input,select,a[href]')].filter(node=>!node.disabled&&!node.hidden),first=nodes[0],last=nodes.at(-1);if(!overlay.contains(document.activeElement)||event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}}
  },true);
  document.addEventListener('change',event=>{if(libraryState&&event.target.matches('[data-mmrr-edition],[data-mmrr-kind]')){libraryState[event.target.matches('[data-mmrr-edition]')?'edition':'kind']=event.target.value;drawLibrary();}else schedule();});
  document.addEventListener('input',event=>{if(libraryState&&event.target.matches('[data-mmrr-search]')){libraryState.query=event.target.value;drawLibrary();}});
  new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true});
  window.MMRuleReference={lookup,open,details,library,close,currentEdition,refresh:decorate};
  decorate();
})();
