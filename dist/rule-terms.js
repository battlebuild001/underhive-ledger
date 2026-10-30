/* Read-only cross references. Never rewrite authored text or saved gameplay values. */
(function(){
'use strict';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=s=>String(s||'').trim().replace(/[’‘]/g,"'").replace(/[（]/g,'(').replace(/[）]/g,')').replace(/\s+/g,' ').toLowerCase();
const base=s=>norm(s).replace(/\s*\([^()]*\)\s*$/,'').trim(),lang=()=>window.UKI18n?.language||'ko';
const entries=new Map(),aliases=new Map(),bySource=new Map(),families=new Set(),ambiguous=new Set();
const kinds=['coreRules','weaponTraits','skills','fighterSubtypes','specialRules','equipment','territories','sideJobs','fighterTypes','gangTypes','tactics','scenarios','effects','injuries','scenarioEntries','campaignTypes','campaignTriumphs'];
const verified=row=>row?.source_verified&&String(row.edition_slug||row.edition).toLowerCase()==='n26';
const catalogue=kinds.flatMap(kind=>(window.RULES_DATA?.[kind]||[]).filter(verified).map(row=>({kind,row})));
const sourceExists=id=>catalogue.some(({row})=>row.id===id);
function alias(name,id,replace=false){if(!name||name.length<2&&!/^[가-힣]$/.test(name))return;const key=norm(name),previous=aliases.get(key);if(!replace&&previous&&previous!==id&&entries.get(previous)?.row)ambiguous.add(key);if(replace||!previous)aliases.set(key,id);}
function add(entry){entries.set(entry.id,entry);for(const name of [entry.name,entry.nameKo,...entry.aliases||[]])alias(name,entry.id);}
for(const e of window.UK_RULE_TERMS?.entries||[]){if(e.sourceIds?.some(id=>!sourceExists(id)))continue;add({...e,edition:'n26'});}
for(const {kind,row}of catalogue){
 if(!row.name||(!row.description&&!row.rule_data))continue;
 const id=kind+':'+row.id,names=[row.name_ko,window.UKI18n?.name(row.name),(row.name_ko||'').replace(/숏/g,'샷')];
 add({id,name:row.name,nameKo:row.name_ko||window.UKI18n?.name(row.name),aliases:names,kind,row,edition:'n26'});bySource.set(row.id,id);
 if(kind==='weaponTraits'||kind==='fighterSubtypes'&&/\(/.test(row.name)||kind==='effects'&&row.id.includes('-condition-')){
  for(const name of [row.name,...names]){const key=base(name);if(key.length<2){continue;}alias(key,id);families.add(key);}
 }
}
for(const key of ambiguous)aliases.delete(key);
// Trait families are the default meaning of bare weapon keywords. Explicitly named skills stay separate.
for(const {kind,row}of catalogue){
 if(kind==='weaponTraits')for(const name of [row.name,row.name_ko,window.UKI18n?.name(row.name),base(row.name),base(row.name_ko)])alias(name,bySource.get(row.id),true);
 if(kind==='skills')for(const name of [row.name+' skill',(row.name_ko||window.UKI18n?.name(row.name))+' 스킬'])alias(name,bySource.get(row.id),true);
}

for(const ref of window.UK_RULE_TERMS?.references||[]){const id=bySource.get(ref.sourceId);if(id)for(const name of ref.aliases){alias(name,id,true);if(['official-003-core-visibility-and-pitch-black','official-003-core-crew-selection-methods'].includes(ref.sourceId))families.add(norm(name));}}
// A condition and a skill may share a name. Prose describing a condition must open its actual effect.
for(const {row,kind}of catalogue)if(kind==='effects'&&row.id.includes('-condition-'))for(const name of [row.name,row.name_ko,base(row.name),base(row.name_ko)])alias(name,bySource.get(row.id),true);
for(const [name,canonical]of Object.entries({'블라스트':'Blast','멜리':'Melee','리더십':'Characteristics and Checks','XP':'Gaining Experience','경험치':'Gaining Experience'})){const id=aliases.get(norm(canonical));if(id){alias(name,id,true);if(canonical==='Blast')families.add(norm(name));}}
const escapeRegex=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const parameter='(?:\\s*[（(][^()（）\\n]{1,32}[）)])?';
const pattern=new RegExp('(?<![A-Za-z0-9가-힣])(?:'+[...aliases.keys()].sort((a,b)=>b.length-a.length).map(a=>escapeRegex(a).replace(/ /g,'\\s+')+(families.has(a)?parameter:'')).join('|')+')(?![A-Za-z0-9])','gi');
function lookup(query,options={}){
 const ed=String(options.edition||window.MMRuleReference?.currentEdition()||'n26').toLowerCase();if(ed!=='n26')return null;
 return entries.get(query)||entries.get(bySource.get(query))||entries.get(aliases.get(norm(query)))||(families.has(base(query))?entries.get(aliases.get(base(query))):null)||null;
}
function markup(text,self='',edition='n26'){
 text=String(text??'');if(String(edition).toLowerCase()!=='n26')return esc(text);
 let out='',offset=0;
 for(const m of text.matchAll(pattern)){
  const e=lookup(m[0],{edition});if(!e||e.id===self||e.row?.id===self)continue;
  // Avoid turning everyday English words into unrelated actions or weapon traits.
  if(/^(?:single|double|free|light|heavy|limited|reliable|web|ram|shield|active|move|train|shoot|fight|charge|leader|champion)$/i.test(m[0])&&m[0]===m[0].toLowerCase())continue;
  const type=classification(e),label=lang()==='en'?type.en:type.ko;
  out+=esc(text.slice(offset,m.index))+`<button type="button" class="mmrr-term" data-rule-term="${esc(e.id)}" data-rule-token="${esc(m[0])}" data-rule-edition="n26" aria-haspopup="dialog" aria-label="${esc(m[0]+' · '+label+(lang()==='en'?' · View explanation':' · 설명 보기'))}" title="${esc(label)}">${esc(m[0])}</button>`;
  offset=m.index+m[0].length;
 }
 return out+esc(text.slice(offset));
}
function prose(en,ko,options={}){
 const edition=String(options.edition||'n26').toLowerCase(),self=options.self||bySource.get(options.row?.id)||lookup(options.row?.name,{edition})?.id||'';
 const text=lang()==='en'?en:window.UKI18n?.t(ko||en,'ko')||ko||en;
 return `<p class="mmrr-description mmrr-linked-prose" data-rule-prose data-rule-en="${esc(en)}" data-rule-ko="${esc(ko||en)}" data-rule-self="${esc(self)}" data-rule-edition="${esc(edition)}" data-rule-language="${lang()}" data-i18n-ignore>${markup(text,self,edition)}</p>`;
}
function classification(e){
 if(e.classification)return e.classification;
 const labels={coreRules:['Core rule','기본 규칙'],weaponTraits:['Weapon trait','무기 특성'],skills:['Skill','스킬'],fighterSubtypes:['Model subtype rule','모델 분류 규칙'],specialRules:['Special rule','특수 규칙'],equipment:['Equipment','장비'],territories:['Territory','영토'],sideJobs:['Secondary objective','부가 목표'],fighterTypes:['Fighter type','파이터 유형'],gangTypes:['Faction rule','팩션 규칙'],tactics:['Gang tactic','갱 택틱'],scenarioEntries:['Scenario rule','시나리오 규칙'],campaignTypes:['Campaign rule','캠페인 규칙'],campaignTriumphs:['Campaign triumph','캠페인 성과'],injuries:['Lasting injury','지속 부상']};
 const a=e.kind==='effects'?(e.row?.id?.includes('-condition-')?['Condition','컨디션 · 상태 효과']:['Effect','효과']):e.row?.id?.includes('core-action-')?['Action','행동']:labels[e.kind]||['Rule explanation','규칙 설명'];
 return {en:a[0],ko:a[1]};
}
const L=pair=>`<span data-i18n-en="${esc(pair.en)}" data-i18n-ko="${esc(pair.ko)}">${esc(pair.en)}</span>`;
function exampleMarkup(example,row){
 const p=pair=>prose(pair.en,pair.ko,{row,edition:'n26'});
 return `<details class="mmrr-term-example mmrr-skill-example" data-rule-example="${esc(example.id)}"><summary>${L(example.title)}</summary><div class="mmrr-example-content">${example.setup?`<div class="mmrr-example-setup"><strong>${L({en:'Situation',ko:'상황'})}</strong>${p(example.setup)}</div>`:''}${example.steps?.length?`<ol class="mmrr-example-steps">${example.steps.map(step=>`<li>${p(step)}</li>`).join('')}</ol>`:''}${example.result?`<div class="mmrr-example-result"><strong>${L({en:'Result',ko:'결과'})}</strong>${p(example.result)}</div>`:''}${example.caution?`<div class="mmrr-example-caution">${p(example.caution)}</div>`:''}</div></details>`;
}
function helpMarkup(row,kind,edition){
 if(String(edition).toLowerCase()!=='n26'||!verified(row)||row.is_custom||row.reference_custom_description||row.reference_description_cleared)return '';
 const help=window.UK_RULE_TERMS?.help?.[row.id];if(!help||help.sourceIds?.some(id=>!sourceExists(id)))return '';
 const cases=(help.examples||[]).map(e=>exampleMarkup(e,row)).join(''),related=(help.related||[]).map(id=>lookup(id,{edition:'n26'})).filter(Boolean);
 const links=related.length?`<nav class="mmrr-example-links" aria-label="Related rules" data-i18n-en-aria-label="Related rules" data-i18n-ko-aria-label="관련 규칙"><strong>${L({en:'Rules used in these examples',ko:'예시에 적용한 규칙'})}</strong>${related.map(e=>`<button type="button" class="btn small" data-rule-term="${esc(e.id)}" data-rule-edition="n26" aria-haspopup="dialog">${L({en:e.name,ko:e.nameKo||e.name})}</button>`).join('')}</nav>`:'';
 return `<aside class="mmrr-term-usage" data-rule-help="${esc(row.id)}">${help.when?`<strong>${L({en:'When to use it',ko:'언제 쓰는 규칙인가요?'})}</strong>${prose(help.when.en,help.when.ko,{row,edition})}`:''}${help.example?`<details class="mmrr-term-example"><summary>${L({en:'Simple example',ko:'쉬운 예시 보기'})}</summary>${prose(help.example.en,help.example.ko,{row,edition})}</details>`:''}${cases}${links?`<details class="mmrr-example-sources"><summary>${L({en:'Related rules',ko:'관련 규칙 보기'})}</summary>${links}</details>`:''}</aside>`;
}

function refresh(){
 for(const p of document.querySelectorAll('[data-rule-prose]')){
  if(p.dataset.ruleLanguage===lang())continue;
  const focused=p.contains(document.activeElement)?document.activeElement?.dataset.ruleTerm:null,ordinal=focused?[...p.querySelectorAll('[data-rule-term]')].indexOf(document.activeElement):-1;
  const text=lang()==='en'?p.dataset.ruleEn:window.UKI18n?.t(p.dataset.ruleKo,'ko')||p.dataset.ruleKo;
  p.innerHTML=markup(text,p.dataset.ruleSelf,p.dataset.ruleEdition);p.dataset.ruleLanguage=lang();
  if(focused){const next=[...p.querySelectorAll('[data-rule-term]')].filter(b=>b.dataset.ruleTerm===focused);(p.querySelectorAll('[data-rule-term]')[ordinal]||next[0])?.focus({preventScroll:true});}
 }
 const body=document.querySelector('.mmrr-overlay .mmrr-body');
 if(body?.querySelector('[data-rule-term]')&&!body.querySelector('.mmrr-term-hint')){
  const hint=document.createElement('p');hint.className='mmrr-term-hint';hint.innerHTML=L({en:'Tap a dotted-underlined term to see its rule type and explanation.',ko:'점선 밑줄 용어를 누르면 규칙 종류와 설명을 볼 수 있습니다.'});
  const heading=body.querySelector('.mmrr-heading');if(heading)heading.after(hint);else body.prepend(hint);window.UKI18n?.refresh(hint);
 }
}
function open(id,options={}){
 const e=lookup(id,options);if(!e)return false;const nested=!!document.querySelector('.mmrr-overlay');
 if(e.row)return window.MMRuleReference.open(e.kind,e.row,{edition:'n26',nested,activator:options.activator,termToken:options.token});
 const type=classification(e);
 const body=`<div class="mmrr-heading"><span class="mmrr-badge">N26</span>${L(type)}</div>`+(e.summary?prose(e.summary.en,e.summary.ko,{self:e.id,edition:'n26'}):'')+(e.sections||[]).map(s=>s.folded?`<details class="mmrr-term-section"><summary>${L(s.title)}</summary>${prose(s.text.en,s.text.ko,{self:e.id,edition:'n26'})}</details>`:`<section class="mmrr-term-section"><h3>${L(s.title)}</h3>${prose(s.text.en,s.text.ko,{self:e.id,edition:'n26'})}</section>`).join('');
 return window.MMRuleReference.openContext(e.name,body,{nested,activator:options.activator,nameKo:e.nameKo});
}
document.addEventListener('click',event=>{const b=event.target.closest?.('[data-rule-term]');if(!b)return;event.preventDefault();event.stopImmediatePropagation();open(b.dataset.ruleTerm,{edition:b.dataset.ruleEdition,activator:b,token:b.dataset.ruleToken});},true);
window.addEventListener('uk:languagechange',refresh);new MutationObserver(refresh).observe(document.body,{childList:true,subtree:true});
window.MMRuleTerms={lookup,open,prose,markup,helpMarkup,classification,refresh,get count(){return entries.size;}};
})();
