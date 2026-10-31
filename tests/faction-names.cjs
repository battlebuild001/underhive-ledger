/* Exact production scripts: researched faction labels, canonical values and authored text. */
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
(async()=>{
 await test('All 17 researched faction names keep exact source identities and old/official search aliases',async()=>{
  const p=await page();try{
   const review=JSON.parse(fs.readFileSync(path.resolve(root,'../data/localization/faction-names-ko.json'),'utf8')),saved=p.snapshot(),rules=JSON.stringify(p.w.RULES_DATA);
   for(const f of review.factions){
    const source=p.w.RULES_DATA.gangTypes.find(r=>r.id===f.id);assert.equal(source.name,f.english);assert.equal(source.name_ko,f.sourceKo);assert.equal(p.w.UKI18n.name(f.english),f.nameKo,f.english);
    for(const alias of [f.nameKo,f.sourceKo,...f.aliases])assert(p.w.UKI18n.matches(f.english,alias),f.english+' search '+alias);
    const el=p.w.document.createElement('span');el.dataset.i18nEn=f.english;el.dataset.i18nKo=source.name_ko;el.textContent=f.english;p.w.document.body.append(el);
    p.w.UKI18n.setLanguage('ko');assert.equal(el.textContent,f.nameKo);p.w.UKI18n.setLanguage('en');assert.equal(el.textContent,f.english);el.remove();
   }
   assert(!p.w.UKI18n.matches('House Delaque','커도르'));assert.equal(JSON.stringify(p.w.RULES_DATA),rules);assert.equal(p.snapshot(),saved);assert.deepEqual(p.errors,[]);
  }finally{p.close();}
 });
 await test('Reviewed fighter names and official prose update without rewriting custom names, notes or descriptions',async()=>{
  const p=await page();try{
   p.w.__namesFixture={...empty(),gangs:[{id:'authored',name:'코드로',faction:'House Cawdor',gangTypeId:'official-001-gang-house-cawdor',edition:'N26',fighters:[],stash:[],credits:1000,notes:'오를록과 코프스 그라인더 컬트',logs:[]}]};p.run('data=structuredClone(window.__namesFixture);render()');
   const saved=p.snapshot(),rules=JSON.stringify(p.w.RULES_DATA),row=p.w.RULES_DATA.fighterTypes.find(r=>r.name==='Cawdor Word-Keeper');
   const host=p.w.document.createElement('section');host.innerHTML='<h3 data-user-text>코드로</h3><p data-user-text>오를록과 코프스 그라인더 컬트</p><span data-i18n-en="'+row.name+'" data-i18n-ko="'+row.name_ko+'">'+row.name+'</span>';p.w.document.body.append(host);p.w.UKI18n.setLanguage('ko');assert.equal(host.querySelector('span').textContent,'커도르 워드 키퍼');
   host.insertAdjacentHTML('beforeend',p.w.MMRuleTerms.prose('Cawdor gangs use their own entry.','코드로 갱은 자신의 항목을 사용합니다.',{row,edition:'n26'}));
   assert.match(host.querySelector('[data-rule-prose]').textContent,/커도르 갱/);
   host.insertAdjacentHTML('beforeend',p.w.MMRuleTerms.prose('Authored text','코드로는 오를록과 코프스 그라인더 컬트를 만났다.',{row:{...row,is_custom:true},edition:'n26'}));
   const custom=host.querySelectorAll('[data-rule-prose]')[1];assert.equal(custom.textContent,'코드로는 오를록과 코프스 그라인더 컬트를 만났다.');
   p.w.UKI18n.setLanguage('en');await tick();assert.equal(host.querySelector('span').textContent,row.name);p.w.UKI18n.setLanguage('ko');await tick();assert.match(host.querySelector('[data-rule-prose]').textContent,/커도르 갱/);assert.equal(custom.textContent,'코드로는 오를록과 코프스 그라인더 컬트를 만났다.');assert.equal(host.querySelector('h3').textContent,'코드로');assert.equal(host.querySelector('[data-user-text] + p').textContent,'오를록과 코프스 그라인더 컬트');
   assert.equal(p.w.MMRuleTerms.lookup('커도르 워드 키퍼',{edition:'n26'})?.row?.id,row.id);assert.equal(p.w.MMRuleTerms.lookup('커도르 워드 키퍼',{edition:'n23'}),null);
   assert.equal(p.snapshot(),saved);assert.equal(JSON.stringify(p.w.RULES_DATA),rules);assert.deepEqual(p.errors,[]);
  }finally{p.close();}
 });
 await test('Real gang picker shows all researched labels, accepts old spellings, and saves canonical faction ID',async()=>{
  const p=await page();try{
   p.w.UKI18n.setLanguage('ko');p.tap('[data-action="new-gang"]');await tick();
   const input=p.q('#modal-form').elements.faction,host=input.closest('[data-mm-combo]'),options=[...host.querySelectorAll('[data-mm-pick]')],review=JSON.parse(fs.readFileSync(path.resolve(root,'../data/localization/faction-names-ko.json'),'utf8'));
   for(const f of review.factions){const node=options.find(n=>n.dataset.mmPick===f.id);assert(node,'Faction choice '+f.english);assert.equal([...node.childNodes].filter(n=>n.nodeType===3).map(n=>n.nodeValue).join('').trim(),f.nameKo);}
   host.querySelector('[data-mm-trigger]').click();const search=host.querySelector('[data-mm-search]');
   const f=review.factions.find(f=>f.english==='House Cawdor'),choice=options.find(n=>n.dataset.mmPick===f.id);
   for(const query of ['커도르','코드로','카우도르','코도어']){search.value=query;search.dispatchEvent(new p.w.Event('input',{bubbles:true}));assert(!choice.hidden&&!choice.closest('[data-mm-option-row]')?.hidden,'Visible search '+query);}
   choice.click();assert.equal(input.value,f.id);p.set('name','코드로');p.tap('#modal-submit');await tick();const stored=JSON.parse(p.snapshot()).gangs[0];assert.equal(stored.name,'코드로');assert.equal(stored.faction,f.english);assert.equal(stored.gangTypeId,f.id);
   assert.deepEqual(p.errors,[]);
  }finally{p.close();}
 });
 if(failures.length)process.exitCode=1;else console.log(passes.length+' faction naming cases passed.');
})();
