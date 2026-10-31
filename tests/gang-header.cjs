/* Oracles: reviewed N26 core pp52,72–74,162–163. Exercises actual purchase/reference/editor DOM. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom');
const root=path.resolve(__dirname,'../dist'),html=fs.readFileSync(root+'/index.html','utf8'),catalog=JSON.parse(fs.readFileSync(root+'/rules-data.json','utf8'));
const tick=()=>new Promise(resolve=>setTimeout(resolve,0)),failures=[],passes=[];
async function test(name,fn){if(process.env.GANG_STAT_FILTER&&!name.includes(process.env.GANG_STAT_FILTER))return;try{await fn();passes.push(name);console.log('PASS '+name)}catch(error){failures.push({name,message:error.stack});console.error('FAIL '+name+'\n'+error.stack)}}
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


(async()=>{
await test('Grouping preserves every action, locale and readonly permissions without changing roster data',async()=>{
 const p=await page();try{seed(p);p.run('data.view="gang";render()');await tick();const saved=p.snapshot();
 const selectors=['[data-play-mode="enter"]','[data-sk-action="new"]','[data-gang-lore]','[data-gang-faction]','[data-gang-guide]','[data-roster-text-open]','[data-rp-view]','[data-parity="gang-resources"]','[data-action="edit-current-gang"]','[data-gp="copy-gang"]','[data-gp="logs"]','[data-gp="share-gang"]','[data-parity="capture"]','[data-ext="print-gang"]'];
 for(const s of selectors)assert.equal(p.all('.gah-header '+s).length,1,s);
 assert.equal(p.all('.gah-menu[open]').length,0);assert.equal(p.all('.entity-card .entity-tools').length,0);p.w.MMGangHeader.refresh();assert.equal(p.all('.gah-header').length,1);
 const info=p.q('.gah-info'),manage=p.q('.gah-manage');info.open=true;await tick();manage.open=true;await tick();await tick();assert(!info.open);manage.querySelector('summary').focus();manage.querySelector('summary').dispatchEvent(new p.w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));assert(!manage.open);assert.equal(p.w.document.activeElement,manage.querySelector('summary'));
 p.w.UKI18n.setLanguage('ko');await tick();assert.match(p.q('.gah-game .gah-label').textContent,/게임하기/);p.w.UKI18n.setLanguage('en');await tick();assert.equal(p.q('.gah-game .gah-label').textContent,'Play');assert.equal(p.snapshot(),saved);
 p.run('gang().remoteReadOnly=true;render()');await tick();assert(p.q('[data-action="edit-current-gang"]').disabled);assert(p.q('[data-parity="gang-resources"]').disabled);assert(p.q('[data-gp="copy-gang"]').disabled);assert(!p.q('[data-gang-faction]').disabled);assert(!p.q('[data-rp-view]').disabled);assert.deepEqual(p.errors,[]);
 }finally{p.close()}
});
await test('Moved actions open their original dialogs; page selector keeps its original behavior',async()=>{
 const p=await page();try{seed(p);p.run('data.view="gang";render()');await tick();const before=p.snapshot();p.q('.gah-manage').open=true;p.tap('[data-parity="gang-resources"]');assert(p.q('.modal-bg'));p.run('closeModal()');assert.equal(p.snapshot(),before);p.tap('[data-gang-faction]');assert(p.q('.mmrr-overlay'));p.tap('[data-mmrr-close]');p.tap('[data-roster-text-open]');assert(p.q('.roster-text-export'));p.tap('[data-mmrr-close]');const select=p.q('[data-rp-view]');select.value='2-card';select.dispatchEvent(new p.w.Event('change',{bubbles:true}));await tick();assert.equal(p.run('data.rosterView'),'2-card');assert.equal(p.w.document.activeElement,p.q('.gah-manage>summary'));assert.deepEqual(p.errors,[]);
 }finally{p.close()}
});
await test('Breadcrumb home returns every app view to gang selection and preserves roster records',async()=>{
 const p=await page();try{seed(p);p.run('data.view="gang";render()');await tick();const records=p.run('JSON.stringify({gangs:data.gangs,campaigns:data.campaigns})');
 for(const view of ['gang','fighter','campaigns','catalog','dashboard']){
  p.run('data.view='+JSON.stringify(view)+';data.homeTab="skirmishes";render()');await tick();await tick();
  assert.equal(p.all('.crumb [data-mm-reference-home]').length,1);const home=p.q('[data-mm-reference-home]');assert.equal(home.tagName,'BUTTON');assert.equal(home.type,'button');assert.equal(home.getAttribute('aria-label'),'Go to gang selection');
  p.q('[data-mm-reference-home] svg').dispatchEvent(new p.w.MouseEvent('click',{bubbles:true}));await tick();await tick();assert.equal(p.run('data.view'),'dashboard');assert.equal(p.run('data.homeTab'),'gangs');assert.equal(p.w.location.pathname,'/');assert(p.q('[data-open-gang="verified-gang"]'));assert.equal(p.run('JSON.stringify({gangs:data.gangs,campaigns:data.campaigns})'),records);
 }
 p.run('data.view="fighter";render()');await tick();p.tap('[data-mm-reference-back]');assert.equal(p.run('data.view'),'gang');
 p.run('gang().remoteReadOnly=true;render()');await tick();p.w.UKI18n.setLanguage('ko');await tick();assert.equal(p.q('[data-mm-reference-home]').getAttribute('aria-label'),'갱 선택으로 돌아가기');assert(!p.q('[data-mm-reference-home]').disabled);p.tap('[data-mm-reference-home]');assert.equal(p.run('data.homeTab'),'gangs');assert.deepEqual(p.errors,[]);
 }finally{p.close()}
});
if(failures.length)process.exitCode=1;else console.log(passes.length+' gang header cases passed.');
})();
