/* The original roster renderer stays authoritative for every value and control. */
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
const cardNode=(p,g,f)=>{const host=p.w.document.createElement('div');host.innerHTML=p.w.RosterParity.card(g,f);return host;};
function richSeed(p){seed(p);const gun=catalog.equipment.find(e=>e.name==='Autogun'),skill=catalog.skills.find(s=>s.name==='Bulging Biceps');p.w.__themeGun=gun;p.w.__themeSkill=skill;p.run(`const f=currentFighter();f.name='실제 이름 <보존>';f.equipment=[{...structuredClone(window.__themeGun),id:'owned-autogun',catalogId:window.__themeGun.id,cost:20,quantity:2}];f.skills=[window.__themeSkill.name];f.skillDetails=[{name:window.__themeSkill.name,skillId:window.__themeSkill.id}];f.notes='User-authored notes';data.view='gang';data.tab='fighters';render()`);}
(async()=>{
 await test('All 17 themes keep the exact original data and action DOM in both editions, every roster view and model state',async()=>{const p=await page();try{
  richSeed(p);const saved=p.snapshot(),rules=JSON.stringify(p.w.RULES_DATA),themes=p.w.MMRosterThemes,base=copy(p.run('gang()')),model=base.fighters[0];assert.equal(themes.entries.length,17);
  for(const edition of ['N26','N23'])for(const type of catalog.gangTypes)for(const status of ['Active','Captured','In Recovery','Dead'])for(const mode of ['normal','2-card','3-card','4-card']){
   p.w.__themeMode=mode;p.run('data.rosterView=window.__themeMode');const g={...copy(base),faction:type.name,gangTypeId:type.id,edition},f={...copy(model),status};g.fighters=[f];
   const themed=cardNode(p,g,f);assert.equal(themed.querySelector('.rp-card').dataset.rosterFactionId,type.id);assert.equal(themed.querySelector('.rp-card').dataset.rosterFaction,themes.profile(g).slug);
   const mark=themed.querySelector('.rp-card-header>.rf-mark');assert(mark&&mark.getAttribute('aria-hidden')==='true'&&mark.getAttribute('focusable')==='false');assert.equal(mark.querySelector('button,a,[tabindex]'),null);
   p.w.MMRosterThemes=null;const original=cardNode(p,g,f);p.w.MMRosterThemes=themes;
   assert.equal(themed.querySelector('.rp-card h3').textContent,'실제 이름 <보존>');assert.equal(themed.querySelectorAll('[data-rp]').length,original.querySelectorAll('[data-rp]').length);
   const scroll=themed.querySelector(".rf-stat-scroll");if(scroll){assert.equal(scroll.getAttribute("role"),"region");assert.equal(scroll.getAttribute("tabindex"),"0");scroll.replaceWith(...scroll.childNodes)}mark.remove();themed.querySelectorAll(".rf-corner").forEach(node=>{assert.equal(node.getAttribute("aria-hidden"),"true");node.remove()});const card=themed.querySelector('.rp-card');card.removeAttribute('data-roster-faction');card.removeAttribute('data-roster-faction-id');card.removeAttribute('style');assert.equal(themed.innerHTML,original.innerHTML,type.name+' / '+edition+' / '+status+' / '+mode);
  }
  p.run('delete data.rosterView');assert.equal(p.snapshot(),saved);assert.equal(JSON.stringify(p.w.RULES_DATA),rules);assert.deepEqual(p.errors,[]);
 }finally{p.close();}});
 await test('The live card uses real names, prices, quantities and equipment while card, menu, rules, edit and reorder keep their original handlers',async()=>{const p=await page();try{
  richSeed(p);const source=JSON.stringify(p.w.RULES_DATA),before=p.snapshot();assert.equal(p.q('.rp-card').dataset.rosterFaction,'cawdor');assert.equal(p.q('.rp-credit-disc strong').textContent,'155');assert.match(p.q('.rp-weapon-link').textContent,/x2/);assert.equal(p.q('.rp-card').getAttribute('href'),'/fighter/verified-fighter');
  p.tap('.rp-card-menu');assert(p.q('.rp-action-menu [data-rp=xp]'));p.tap('.rp-action-menu [data-rp=xp]');assert(p.q('#modal-form'));p.tap('#modal-cancel');assert.equal(p.snapshot(),before);
  p.tap('.rp-card-menu');p.tap('.rp-action-menu [data-rp=injury]');assert(p.q('#modal-form'));p.tap('#modal-cancel');assert.equal(p.snapshot(),before);
  p.tap('.rp-weapon-link');assert(p.q('.rp-equipment-dialog'));p.tap('#modal-submit');assert.equal(p.snapshot(),before);
  const trait=p.q('.rp-weapons [data-mmrr-trait]');trait.click();assert(p.q('.mmrr-overlay'));p.w.MMRuleReference.close();assert.equal(p.snapshot(),before);
  p.q('.rp-card').click();assert.equal(p.run('data.view'),'fighter');assert.equal(p.run('data.selectedFighter'),'verified-fighter');p.run('editFighter(currentFighter())');assert.equal(p.q('#modal-form').elements.name.value,'실제 이름 <보존>');assert(p.q('[data-fighter-name-generate]'));p.tap('#modal-cancel');p.run("data.view='gang';render()");
  p.run(`const other=structuredClone(gang().fighters[0]);other.id='second-real-fighter';other.name='Second real fighter';gang().fighters.push(other);render()`);p.w.RosterParity.reorder('second-real-fighter','verified-fighter');assert.equal(p.run('gang().fighterOrder[0]'),'second-real-fighter');assert.equal(p.q('.rp-card-shell').dataset.rpFighter,'second-real-fighter');
  p.run('MMPrint.open(gang())');assert(p.q('.mp-print-page'));assert(p.q('[data-mp=print]'));assert.equal(p.all('.mp-print-page .rp-card-menu').length,0);assert.equal(p.all('.mp-print-page .rp-stats').length,2);assert.equal(p.q('.mp-print-page .rp-card').dataset.rosterFaction,'cawdor');assert.equal(p.q('.mp-print-page .rp-card').style.getPropertyValue('--rf-header'),'#211d1a');assert.equal(p.all('.mp-print-page .rf-corner').length,8);assert.equal(p.all('.mp-print-page [data-rp]').length,0);p.tap('[data-mp=cancel]');assert.equal(p.run('data.view'),'gang');assert.equal(JSON.stringify(p.w.RULES_DATA),source);assert.deepEqual(p.errors,[]);
 }finally{p.close();}});
 await test('Theme binding follows actual faction identity and leaves custom gangs and all stored records alone',async()=>{const p=await page();try{
  richSeed(p);const saved=p.snapshot(),base=copy(p.run('gang()')),goliath=catalog.gangTypes.find(g=>g.name==='House Goliath');
  assert.equal(p.w.MMRosterThemes.profile({...base,gangTypeId:goliath.id,faction:'House Cawdor'}).slug,'goliath');
  for(const extra of [{customGangTypeId:'my-custom'},{isCustomGang:true},{gangTypeId:'unknown',faction:'My own faction'}])assert.equal(p.w.MMRosterThemes.profile({...base,...extra}),null);
  assert.equal(p.w.MMRosterThemes.profile({...base,edition:'N23',gangTypeId:'legacy-id',faction:'House Cawdor'}).slug,'cawdor');
  assert.equal(p.snapshot(),saved);assert.deepEqual(p.errors,[]);
 }finally{p.close();}});
 await test('Native mouse drag survives pointer cancellation and cancelled touch gestures restore card scrolling',async()=>{const p=await page();try{
  richSeed(p);p.run(`const dragModel=structuredClone(gang().fighters[0]);dragModel.id='drag-second';dragModel.name='Second';gang().fighters.push(dragModel);render()`);
  const pointer=(type,kind)=>{const event=new p.w.Event(type,{bubbles:true,cancelable:true});Object.assign(event,{pointerType:kind,clientX:10,clientY:10});return event;},first=p.q('[data-rp-fighter="verified-fighter"]'),second=p.q('[data-rp-fighter="drag-second"]');
  const start=new p.w.Event('dragstart',{bubbles:true,cancelable:true});start.dataTransfer={setData(){},effectAllowed:''};second.dispatchEvent(start);first.dispatchEvent(pointer('pointercancel','mouse'));const over=new p.w.Event('dragover',{bubbles:true,cancelable:true});first.dispatchEvent(over);assert(over.defaultPrevented,'Native dragover must remain active after pointercancel');first.dispatchEvent(new p.w.Event('drop',{bubbles:true,cancelable:true}));assert.equal(p.run('gang().fighterOrder[0]'),'drag-second');assert.equal(p.q('.rp-card-shell').dataset.rpFighter,'drag-second');
  const card=p.q('.rp-card'),before=p.snapshot(),action=card.style.touchAction;card.dispatchEvent(pointer('pointerdown','touch'));await new Promise(resolve=>setTimeout(resolve,550));assert(card.closest('.rp-card-shell').classList.contains('rp-dragging'));assert.equal(card.style.touchAction,'none');card.dispatchEvent(pointer('pointercancel','touch'));assert.equal(card.style.touchAction,action);assert(!card.closest('.rp-card-shell').classList.contains('rp-dragging'));assert.equal(p.snapshot(),before);assert.deepEqual(p.errors,[]);
 }finally{p.close();}});
 if(failures.length)process.exitCode=1;else console.log(passes.length+' original-function faction theme cases passed.');
})();
