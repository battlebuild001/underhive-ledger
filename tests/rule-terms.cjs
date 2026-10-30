/* Source-based eligibility explanations. Runs the exact production script chain
   in an isolated account. Oracles: supplied source001 p8 Word-Keeper access table,
   p9 subtype; source003 p44 Leader grant and p150 six universal skill tables.
   Exercises readable reasons and interaction/state guarantees, not implementation formulas. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom');
const root=path.resolve(__dirname,'../dist'),html=fs.readFileSync(root+'/index.html','utf8'),catalog=JSON.parse(fs.readFileSync(root+'/rules-data.json','utf8'));
const tick=()=>new Promise(resolve=>setTimeout(resolve,0)),failures=[],passes=[];
async function test(name,fn){try{await fn();passes.push(name);console.log('PASS '+name)}catch(error){failures.push({name,message:error.stack});console.error('FAIL '+name+'\n'+error.stack)}}
const copy=x=>JSON.parse(JSON.stringify(x));
const empty=()=>({gangs:[],campaigns:[],customAssets:{},view:'dashboard',homeTab:'gangs',tab:'fighters',edition:'N26'});
async function page(width=375){
 const dom=new JSDOM(html.replace(/<script[^>]*>[\s\S]*?<\/script>/g,''),{url:'https://verified.test/',runScripts:'outside-only',pretendToBeVisual:true}),w=dom.window,ctx=dom.getInternalVMContext(),errors=[],alerts=[],calls=[];
 Object.defineProperty(w,'innerWidth',{value:width,writable:true});w.structuredClone=structuredClone;w.matchMedia=query=>({matches:/max-width/.test(query)&&w.innerWidth<760,addListener(){},removeListener(){},addEventListener(){},removeEventListener(){}});w.HTMLElement.prototype.scrollIntoView=function(){};w.alert=message=>alerts.push(String(message));w.confirm=()=>false;w.localStorage.setItem('underhive-korea-language','en');w.localStorage.setItem('underhive-ledger-v1',JSON.stringify(empty()));w.addEventListener('error',event=>errors.push(event.message));
 let cloud=empty(),revision=0;const profile={id:'verified-test-account',username:'Verified Test',email:null,preferences:{},createdAt:'2026-10-01',lastSignIn:'2026-10-26'};
 w.fetch=async(url,options={})=>{const p=new URL(url,w.location.href).pathname,method=options.method||'GET';calls.push({p,method});let value;
  if(p==='/api/account')value={profile};else if(p==='/api/auth/session')value={auth:{method:'password',loginId:'verified-test'}};else if(p==='/api/document'&&method==='PUT'){cloud=JSON.parse(options.body).state;revision++;value={revision};}else if(p==='/api/document')value={state:copy(cloud),revision};else if(p==='/api/friends')value={friends:[]};else if(p==='/api/notifications')value={notifications:[]};else if(p==='/api/campaign-shares')value={campaigns:[]};else return {ok:false,status:404,json:async()=>({error:'Unstubbed test endpoint '+p})};return {ok:true,status:200,json:async()=>copy(value)};};
 for(const [,file]of html.matchAll(/<script src="\/([^"?]+)[^"]*"/g))vm.runInContext(fs.readFileSync(root+'/'+file,'utf8'),ctx,{filename:file});
 const run=source=>vm.runInContext(source,ctx),q=selector=>{const node=w.document.querySelector(selector);assert(node,'Missing '+selector);return node},all=selector=>[...w.document.querySelectorAll(selector)],set=(name,value)=>{const node=q('#modal-form').elements[name];assert(node,'Missing field '+name);if(node.type==='checkbox')node.checked=!!value;else node.value=String(value);node.dispatchEvent(new w.Event('input',{bubbles:true}));node.dispatchEvent(new w.Event('change',{bubbles:true}));return node;},tap=selector=>{const node=q(selector);node.click();return node;};
 for(let i=0;i<30&&(!w.AccountParity||w.AccountParity.connecting);i++)await tick();await tick();await tick();
 return {dom,w,run,q,all,set,tap,errors,alerts,calls,snapshot:()=>run('JSON.stringify(data)'),close:()=>dom.window.close()};
}
function seed(p,extra={}){
 const template=catalog.fighterTypes.find(x=>x.name==='Cawdor Word-Keeper'&&x.source_verified);assert(template,'Fresh supplied-source Cawdor template exists');
 const f={id:'verified-fighter',name:'Explicit test fighter',type:template.name,fighterTypeId:template.id,cost:template.cost,ratingCost:template.cost,status:'Active',xp:61,startingXp:61,kills:0,stats:copy(template.stats),subtypes:copy(template.fighter_subtypes),equipment:[],skills:[],skillDetails:[],effects:[],injuries:[],advancements:[],loadouts:[],xpHistory:[],ooaRecords:[],specialRules:[],notes:'Keep authored fighter note',backstory:'Keep authored history',...copy(extra)};
 const g={id:'verified-gang',name:'Explicit sourced test roster',faction:'House Cawdor',gangTypeId:template.gang_type_id,edition:'N26',credits:1000,reputation:1,stash:[],vehicles:[],fighters:[f],logs:[],notes:'Keep authored gang note'};
 p.w.__verifiedFixture={...empty(),gangs:[g],selectedGang:g.id,selectedFighter:f.id,view:'fighter'};p.run('closeModal();data=structuredClone(window.__verifiedFixture);render()');return f;
}
function seedCawdor(p,type,legacy='fresh'){
 seed(p);p.w.__cawdorType=type;p.w.__legacyMode=legacy;p.run('var t=window.__cawdorType,m=window.__legacyMode,f=currentFighter(),g=gang();Object.assign(f,{id:"76d2384c-a626-4db6-9e94-217cc028147e",type:t.name,fighterTypeId:m==="both"?"ea645952-649c-44ed-b5ed-a0b176ccf382":t.id,catalogTypeId:m==="both"?"ea645952-649c-44ed-b5ed-a0b176ccf382":t.id,subtypes:structuredClone(t.fighter_subtypes),stats:structuredClone(t.stats),xp:t.starting_xp,startingXp:t.starting_xp,notes:"Keep original user fighter description",backstory:"Keep original user backstory"});Object.assign(g,{id:"2d7f16bc-47fd-43db-af14-07fe077e8c19",gangTypeId:m==="fresh"?t.gang_type_id:"928bc0c0-9323-43c6-b588-7f306e9b4cb0",faction:"House Cawdor",tradePoints:0,notes:"Keep original user gang description"});data.selectedGang=g.id;data.selectedFighter=f.id;ensureAssets();render()');
}
const field=(p,name)=>p.q('#modal-form').elements[name];
const picker=(p,name)=>{const control=field(p,name);assert(control,'Picker value '+name);const node=control.closest('[data-mm-combo]');assert(node,'Button-based picker '+name);return node;};
const pickerOptions=(p,name)=>[...picker(p,name).querySelectorAll('[data-mm-pick]')];
function pick(p,name,value){const host=picker(p,name),trigger=host.querySelector('[data-mm-trigger]');assert(trigger&&!trigger.disabled,'Enabled picker '+name);if(host.querySelector('.mm-combo-list').hidden)trigger.click();const option=[...host.querySelectorAll('[data-mm-pick]')].find(node=>node.dataset.mmPick===value);assert(option&&!option.disabled&&!option.hidden,'Selectable '+name+' option '+value);option.click();assert.equal(field(p,name).value,value);return option;}

const formDraft=form=>JSON.stringify([...form.elements].filter(x=>x.name).map(x=>[x.name,x.value,x.checked]));
function chooseBand(p,index,choice){p.tap('[data-source-band="'+index+'"]');const node=[...p.q('[data-source-choice]').children].find(x=>x.tagName==='BUTTON'&&x.textContent===choice);assert(node,'Choice '+choice);node.click();}
function advance(p,roll,index,choice){p.run('addAdvancement(currentFighter())');p.set('roll',roll);chooseBand(p,index,choice);}
function submit(p){p.tap('#modal-submit');}

const text=node=>node.textContent.trim();

(async()=>{await test('Source terms explain Braced Shot and preserve nested bilingual drafts and authored text',async()=>{const p=await page();try{seed(p);p.run('FighterParity.addSkill(currentFighter())');const form=p.q('#modal-form'),draft=formDraft(form),saved=p.snapshot(),rules=JSON.stringify(p.w.RULES_DATA);const skill=catalog.skills.find(r=>r.name==='Bulging Biceps');p.w.__termSkill=skill.id;p.run('MMRuleReference.open("skills",window.__termSkill,{edition:"n26"})');await tick();const parent=p.q('.mmrr-dialog'),link=p.q('[data-rule-term="term-braced-shot"]');link.focus();link.click();await tick();assert.match(p.q('.mmrr-body').textContent,/two actions/);assert.match(p.q('.mmrr-body').textContent,/one action/);const braced=p.q('.mmrr-dialog'),double=p.q('[data-rule-term="term-double"]');double.focus();double.click();await tick();assert(p.q('[data-mmrr-nested-back]'));p.w.MMRuleReference.back();assert.equal(p.q('.mmrr-dialog'),braced);assert.equal(p.w.document.activeElement,double);p.w.UKI18n.setLanguage('ko');await tick();assert.match(p.q('.mmrr-body').textContent,/더블/);assert.match(p.q('.mmrr-body').textContent,/서프레스드/);p.w.MMRuleReference.back();assert.equal(p.q('.mmrr-dialog'),parent);assert.equal(p.w.document.activeElement.dataset.ruleTerm,'term-braced-shot');p.tap('.mmrr-overlay [data-mmrr-close]');assert.equal(p.q('#modal-form'),form);assert.equal(formDraft(form),draft);assert.equal(p.snapshot(),saved);assert.equal(JSON.stringify(p.w.RULES_DATA),rules);assert.equal(p.w.MMRuleTerms.lookup('Braced Shot',{edition:'n23'}),null);p.w.__custom={name:'My Braced Shot',description:'Braced Shot 사용자 작성 원문',is_custom:true,edition:'n26'};p.run('MMRuleReference.open("skills",window.__custom,{edition:"n26"})');await tick();assert.equal(p.w.document.querySelector('.mmrr-description [data-rule-term]'),null);assert.equal(p.q('.mmrr-description').textContent,'Braced Shot 사용자 작성 원문');assert.deepEqual(p.errors,[]);}finally{p.close();}});
await test('All 46 verified weapon-trait families resolve short and numeric KO/EN forms; conditions open their effect',async()=>{const p=await page();try{
 seed(p);const saved=p.snapshot(),rules=JSON.stringify(p.w.RULES_DATA),traits=catalog.weaponTraits.filter(x=>x.source_verified);
 assert.equal(traits.length,46);
 for(const ref of p.w.UK_RULE_TERMS.references)assert(p.w.MMRuleTerms.lookup(ref.sourceId,{edition:'n26'}),'Exact verified alias source '+ref.sourceId);
 assert.equal(p.w.MMRuleTerms.lookup('Backstab skill').kind,'skills');
 assert.equal(p.w.MMRuleTerms.lookup('Backstab').kind,'weaponTraits');
 assert.equal(p.w.MMRuleTerms.lookup('Lesson Learnt'),null,'Ambiguous Fighter/Vehicle results need their source context');
 for(const row of traits){
  for(const name of [row.name,row.name_ko]){
   const base=name.replace(/\s*\([^()]*\)\s*$/,'');
   for(const token of [name,base,...(/\(/.test(name)?[base+'(3+)',base+' (2)',base+'（6+）']:[])]){
    const e=p.w.MMRuleTerms.lookup(token,{edition:'n26'});assert.equal(e?.row?.id,row.id,token);
    const node=p.w.document.createElement('div');node.innerHTML=p.w.MMRuleTerms.prose('Rule: '+token+' applies.','규칙: '+token+'을 적용합니다.',{edition:'n26'});
    assert.equal(node.querySelector('[data-rule-term]')?.dataset.ruleTerm,e.id,token);
    assert.equal(node.querySelector('[data-rule-term]')?.textContent,token,token+' parameter must stay visible');
   }
  }
 }
 for(const row of catalog.effects.filter(r=>r.id.includes('-condition-'))){assert.equal(p.w.MMRuleTerms.lookup(row.name)?.row.id,row.id);assert.equal(p.w.MMRuleTerms.lookup(row.name_ko.replace(/\s*\([^()]*\)\s*$/,''))?.row.id,row.id);}
 p.w.MMRuleTerms.open('Fearsome',{edition:'n26'});await tick();assert.match(p.q('.mmrr-heading').textContent,/컨디션|Condition/);assert.match(p.q('.mmrr-description').textContent,/Willpower/);p.w.MMRuleReference.close();
 assert.equal(p.w.MMRuleTerms.lookup('Toxin (3+)',{edition:'n23'}),null);
 assert.equal(p.w.MMRuleTerms.lookup('터널 워페어',{edition:'n23'}),null);
 const raw='<img src=x onerror="alert(1)"> 톡신(3+)';const node=p.w.document.createElement('div');node.innerHTML=p.w.MMRuleTerms.prose(raw,raw,{edition:'n26'});assert.equal(node.querySelector('img'),null);assert.equal(node.querySelector('[data-rule-term]').textContent,'톡신(3+)');
 assert.equal(p.snapshot(),saved);assert.equal(JSON.stringify(p.w.RULES_DATA),rules);assert.deepEqual(p.errors,[]);
 }finally{p.close();}});
await test('Territory jargon, timing and examples are clickable, folded and preserve nested state and language',async()=>{const p=await page();try{
 seed(p);p.run('FighterParity.addSkill(currentFighter())');const form=p.q('#modal-form'),draft=formDraft(form),saved=p.snapshot(),catalogue=JSON.stringify(p.w.RULES_DATA);
 p.w.UKI18n.setLanguage('ko');p.w.MMRuleReference.open('territories','official-003-territory-tunnels',{edition:'n26'});await tick();
 const parent=p.q('.mmrr-dialog'),body=p.q('.mmrr-body'),tunnel=p.q('[data-rule-term="term-tunnel-warfare"]');body.scrollTop=42;tunnel.focus();tunnel.click();await tick();
 assert.match(p.q('.mmrr-heading').textContent,/전장 규칙/);assert.match(p.q('.mmrr-body').textContent,/천장/);assert.match(p.q('.mmrr-body').textContent,/모든 전투에 적용되는 것은 아닙니다/);
 const folds=p.all('.mmrr-term-section');assert.equal(folds.length,3);assert(folds.every(d=>!d.open));folds[2].open=true;p.w.UKI18n.setLanguage('en');await tick();assert.match(p.q('.mmrr-body').textContent,/cannot climb over/);assert(folds[2].open);
 p.w.MMRuleReference.back();assert.equal(p.q('.mmrr-dialog'),parent);assert.equal(body.scrollTop,42);assert.equal(p.w.document.activeElement.dataset.ruleTerm,'term-tunnel-warfare');p.w.MMRuleReference.close();
 p.w.UKI18n.setLanguage('ko');p.w.MMRuleReference.open('territories','official-003-territory-synth-still',{edition:'n26'});await tick();
 const synth=p.q('.mmrr-dialog'),toxin=p.all('[data-rule-term]').find(b=>b.textContent==='톡신(X+)');assert(toxin);assert.match(toxin.getAttribute('aria-label'),/무기 특성/);toxin.click();await tick();
 assert.match(p.q('.mmrr-heading').textContent,/무기 특성/);assert.match(p.q('.mmrr-term-usage').textContent,/운드 굴림/);assert.equal(p.q('.mmrr-term-example').open,false);p.q('.mmrr-term-example').open=true;assert.match(p.q('.mmrr-term-example').textContent,/차량은 자연 6/);assert.match(p.q('.mmrr-term-example').textContent,/세이브를 무시하게 하지는/);
 p.w.MMRuleReference.back();assert.equal(p.q('.mmrr-dialog'),synth);p.w.MMRuleReference.close();
 p.w.MMRuleReference.open('effects','official-n26-002-effect-toxic-blood',{edition:'n26'});await tick();const token=p.all('[data-rule-term]').find(b=>b.textContent==='톡신(3+)');assert(token);token.click();await tick();assert.match(p.q('.mmrr-trait-value').textContent,/3\+/);assert.equal(p.q('.mmrr-trait-value strong').textContent,'3+');p.w.UKI18n.setLanguage('en');await tick();assert.match(p.q('.mmrr-trait-value').textContent,/Value in the text/);p.w.MMRuleReference.close();
 for(const token of ['비지빌리티(18인치)','블라스트(3/5인치)','블레이즈(4+)','OOA','수입 수집','TP','D3','어질리티 테스트','회복 지원','AP','중상','프리 액션','애모-잭','로그 독','사이드 잡','파이어파워','인새니티','웹드','래드 포이즌드','블라인드'])assert(p.w.MMRuleTerms.lookup(token,{edition:'n26'}),token);
 assert.equal(p.w.MMRuleTerms.lookup('OOA').row.id,'n26-core-injury-dice-results');
 p.w.MMContextHelp.open('equipment.ap',{edition:'n26'});await tick();const context=p.q('.mmrr-dialog'),ap=p.all('.uk-help-content [data-rule-term]').find(b=>b.textContent==='AP');assert(ap,'Context explanations also link technical terms');ap.click();await tick();p.w.MMRuleReference.back();assert.equal(p.q('.mmrr-dialog'),context);p.w.MMRuleReference.close();
 p.w.MMRuleReference.library({edition:'n26',kind:'weaponTraits'});await tick();assert(p.q('[data-mmrr-kind]'));assert(p.all('[data-mmrr-result]').length);p.w.MMRuleReference.close();
 const custom={catalogId:'official-003-territory-synth-still',name:'User custom place',description:'터널 워페어 톡신(3+) my authored explanation',is_custom:true,edition:'n26'};p.w.MMRuleReference.open('territories',custom,{edition:'n26'});await tick();assert.equal(p.w.document.querySelector('.mmrr-description [data-rule-term]'),null);assert.equal(p.w.document.querySelector('.mmrr-term-usage'),null);p.w.MMRuleReference.close();
 assert.equal(p.q('#modal-form'),form);assert.equal(formDraft(form),draft);assert.equal(p.snapshot(),saved);assert.equal(JSON.stringify(p.w.RULES_DATA),catalogue);assert.deepEqual(p.errors,[]);
 }finally{p.close();}});
if(failures.length)process.exitCode=1;})().catch(e=>{console.error(e);process.exitCode=1});
