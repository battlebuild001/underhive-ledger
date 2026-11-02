/* Personal order: exercise the real dashboard, modal, local storage and account persistence. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom');
const root=path.resolve(__dirname,'../dist'),html=fs.readFileSync(root+'/index.html','utf8'),catalog=JSON.parse(fs.readFileSync(root+'/rules-data.json','utf8'));
const tick=()=>new Promise(resolve=>setTimeout(resolve,0)),failures=[],passes=[];
async function test(name,fn){if(process.env.GANG_STAT_FILTER&&!name.includes(process.env.GANG_STAT_FILTER))return;try{await fn();passes.push(name);console.log('PASS '+name)}catch(error){failures.push({name,message:error.stack});console.error('FAIL '+name+'\n'+error.stack)}}
const copy=x=>JSON.parse(JSON.stringify(x));
const empty=()=>({gangs:[],campaigns:[],customAssets:{},view:'dashboard',homeTab:'gangs',tab:'fighters',edition:'N26'});
async function page(width=375,initial=empty()){
 const dom=new JSDOM(html.replace(/<script[^>]*>[\s\S]*?<\/script>/g,''),{url:'https://verified.test/',runScripts:'outside-only',pretendToBeVisual:true}),w=dom.window,ctx=dom.getInternalVMContext(),errors=[],alerts=[],calls=[];
 Object.defineProperty(w,'innerWidth',{value:width,writable:true});w.structuredClone=structuredClone;w.matchMedia=query=>({matches:/max-width/.test(query)&&w.innerWidth<760,addListener(){},removeListener(){},addEventListener(){},removeEventListener(){}});w.HTMLElement.prototype.scrollIntoView=function(){};w.alert=message=>alerts.push(String(message));w.confirm=()=>false;w.localStorage.setItem('underhive-korea-language','en');w.localStorage.setItem('underhive-ledger-v1',JSON.stringify(empty()));w.addEventListener('error',event=>errors.push(event.message));
 let cloud=copy(initial),revision=0;const profile={id:'verified-test-account',username:'Verified Test',email:null,preferences:{},createdAt:'2026-10-01',lastSignIn:'2026-10-26'};
 w.fetch=async(url,options={})=>{const p=new URL(url,w.location.href).pathname,method=options.method||'GET';calls.push({p,method});let value;
  if(p==='/api/account')value={profile};else if(p==='/api/auth/session')value={auth:{method:'password',loginId:'verified-test'}};else if(p==='/api/document'&&method==='PUT'){cloud=JSON.parse(options.body).state;revision++;value={revision};}else if(p==='/api/document')value={state:copy(cloud),revision};else if(p==='/api/friends')value={friends:[]};else if(p==='/api/notifications')value={notifications:[]};else if(p==='/api/campaign-shares')value={campaigns:[]};else return {ok:false,status:404,json:async()=>({error:'Unstubbed test endpoint '+p})};return {ok:true,status:200,json:async()=>copy(value)};};
 for(const [,file]of html.matchAll(/<script src="\/([^"?]+)[^"]*"/g))vm.runInContext(fs.readFileSync(root+'/'+file,'utf8'),ctx,{filename:file});
 const run=source=>vm.runInContext(source,ctx),q=selector=>{const node=w.document.querySelector(selector);assert(node,'Missing '+selector);return node},all=selector=>[...w.document.querySelectorAll(selector)],set=(name,value)=>{const node=q('#modal-form').elements[name];assert(node,'Missing field '+name);if(node.type==='checkbox')node.checked=!!value;else node.value=String(value);node.dispatchEvent(new w.Event('input',{bubbles:true}));node.dispatchEvent(new w.Event('change',{bubbles:true}));return node;},tap=selector=>{const node=q(selector);node.click();return node;};
 for(let i=0;i<30&&(!w.AccountParity||w.AccountParity.connecting);i++)await tick();await tick();await tick();
 return {dom,w,run,q,all,set,tap,errors,alerts,calls,snapshot:()=>run('JSON.stringify(data)'),close:()=>dom.window.close()};
}
function setup(p){
 const gang=(id,name,edition='N26',favorite=false)=>({id,name,edition,favorite,faction:'House Cawdor',credits:1000,reputation:1,fighters:[],stash:[],logs:[],vehicles:[]});
 p.w.__orderFixture={...empty(),gangs:[gang('a','Alpha'),gang('b','Beta','N26',true),gang('c','Gamma'),gang('old','Old edition','N23')],campaigns:[]};p.run('data=structuredClone(window.__orderFixture);render()');
}
const visible=p=>p.all('.home-list [data-open-gang]').map(n=>n.dataset.openGang);
const draft=p=>p.all('[data-gang-order-row]').map(n=>n.dataset.gangOrderRow);
const row=(p,id)=>p.all('[data-gang-order-row]').find(n=>n.dataset.gangOrderRow===id);
function position(p,id,to){const n=row(p,id).querySelector('select');n.value=String(to);n.dispatchEvent(new p.w.Event('change',{bubbles:true}));}
(async()=>{
await test('Order editor previews arrows and positions, cancels safely, and saves personal order to the account',async()=>{
 const p=await page();let saved;try{setup(p);const records=p.run('JSON.stringify({gangs:data.gangs,campaigns:data.campaigns})');assert.deepEqual(visible(p),['b','a','c']);
 p.tap('[data-gang-order-open]');assert.deepEqual(draft(p),['b','a','c']);assert(row(p,'b').querySelector('[data-gang-order-move="-1"]').disabled);assert(row(p,'c').querySelector('[data-gang-order-move="1"]').disabled);
 position(p,'c',0);assert.deepEqual(draft(p),['c','b','a']);assert.deepEqual(visible(p),['b','a','c']);p.tap('#modal-cancel');assert.equal(p.run('data.homeGangOrder'),undefined);assert.equal(p.run('JSON.stringify({gangs:data.gangs,campaigns:data.campaigns})'),records);
 p.tap('[data-gang-order-open]');position(p,'c',0);row(p,'a').querySelector('[data-gang-order-move="-1"]').click();assert.deepEqual(draft(p),['c','a','b']);assert.equal(p.w.document.activeElement,row(p,'a').querySelector('[data-gang-order-move="-1"]'));
 p.tap('#modal-submit');await tick();assert.deepEqual(visible(p),['c','a','b']);assert.equal(p.run('JSON.stringify({gangs:data.gangs,campaigns:data.campaigns})'),records);assert.equal(p.w.document.activeElement,p.q('[data-gang-order-open]'));assert.deepEqual(JSON.parse(p.w.localStorage.getItem('underhive-ledger-v1')).homeGangOrder.N26,['c','a','b']);
 await p.w.AccountParity.sync();saved=(await p.w.AccountParity.api('/document')).state;assert.deepEqual(saved.homeGangOrder.N26,['c','a','b']);assert.deepEqual(saved.gangs,JSON.parse(records).gangs);assert.deepEqual(p.errors,[]);
 }finally{p.close()}
 const fresh=await page(375,saved);try{assert.deepEqual(visible(fresh),['c','a','b']);assert.deepEqual(fresh.errors,[]);}finally{fresh.close()}
});
await test('Orders stay separate by edition, handle new/deleted/shared gangs, and reset only after saving',async()=>{
 const p=await page();try{setup(p);p.run(`data.homeGangOrder={N26:["c","a","b","foreign-owner","own-alias"],N23:["old"]};
  data.gangs[0].ownerId=AccountParity.account.id;data.gangs[1].sourceOwnerId=AccountParity.account.id;data.gangs[2].remoteReadOnly=true;
  data.gangs[0].fighters=[{id:"own-active",name:"Own active fighter",status:"Active",cost:10,equipment:[]}];data.gangs[1].fighters=[{id:"own-recovery",name:"Own recovering fighter",status:"In Recovery",cost:10,equipment:[]}];data.gangs[2].credits=9000;data.gangs[2].fighters=[{id:"shared-active",name:"Shared active fighter",status:"Active",cost:10,equipment:[]}];
  data.gangs.push(...[
   {id:"foreign-owner",ownerId:"other-account"},
   {id:"foreign-remote",remoteOwnerId:"other-account"},
   {id:"foreign-source",ownerId:AccountParity.account.id,sourceOwnerId:"other-account"},
   {id:"own-alias",remoteReadOnly:true,sourceOwnerId:AccountParity.account.id,sourceGangId:"a"}
  ].map(meta=>({...structuredClone(data.gangs[0]),...meta,name:meta.id,favorite:true})));
  data.campaigns=[{id:"shared-campaign",name:"Shared campaign",edition:"N26",members:[{gangId:"c"},{gangId:"foreign-owner"}],battles:[],matchRooms:[{id:"room",gangIds:["a","c"]}]}];render()`);const records=p.run('JSON.stringify({gangs:data.gangs,campaigns:data.campaigns})');
 assert.deepEqual(visible(p),['a','b']);assert.equal(p.q('.collection-heading .muted').textContent.trim(),'2 rosters');assert.deepEqual(p.all('.home-list [data-parity="favorite-gang"]').map(n=>n.dataset.id),['a','b']);
 assert.equal(p.all('.uk-overview').length,0);
 p.tap('[data-gang-order-open]');assert.deepEqual(draft(p),['a','b']);position(p,'b',0);p.tap('#modal-submit');assert.deepEqual(visible(p),['b','a']);assert.equal(p.run('JSON.stringify({gangs:data.gangs,campaigns:data.campaigns})'),records);assert.equal(p.run('JSON.stringify(data.homeGangOrder.N26)'),'["b","a"]');
 p.run('data.gangs.push({...data.gangs[0],id:"new",name:"New gang",favorite:true});data.gangs=data.gangs.filter(g=>g.id!=="b");render()');assert.deepEqual(visible(p),['a','new']);
 p.tap('[data-gang-order-open]');p.tap('[data-gang-order-reset]');assert.deepEqual(draft(p),['new','a']);p.tap('#modal-cancel');assert.deepEqual(visible(p),['a','new']);
 p.tap('[data-gang-order-open]');p.tap('[data-gang-order-reset]');p.tap('#modal-submit');assert.deepEqual(visible(p),['new','a']);assert.equal(p.run('data.homeGangOrder.N26'),undefined);assert.equal(p.run('JSON.stringify(data.homeGangOrder.N23)'),'["old"]');
 p.run('data.edition="N23";render()');assert.deepEqual(visible(p),['old']);assert.equal(p.all('[data-gang-order-open]').length,0);p.run('data.edition="Custom";render()');assert.equal(p.all('[data-gang-order-open]').length,0);
 p.run('data.edition="N26";data.homeTab="campaigns";render()');assert.equal(p.all('[data-gang-order-open]').length,0);assert.deepEqual(p.errors,[]);
 p.run('data.homeTab="gangs";data.gangs=data.gangs.filter(g=>!MMCampaignOwnership.owns(g));render()');const sharedRecords=p.run('JSON.stringify({gangs:data.gangs,campaigns:data.campaigns})');assert.deepEqual(visible(p),[]);assert.equal(p.q('.collection-heading .muted').textContent.trim(),'0 rosters');assert.match(p.q('.cmd-reference-home > .empty-line').textContent,/No gangs created yet/i);assert.equal(p.all('[data-gang-order-open]').length,0);assert.equal(p.all('.uk-overview').length,0);assert.equal(p.run('JSON.stringify({gangs:data.gangs,campaigns:data.campaigns})'),sharedRecords);assert.deepEqual(p.errors,[]);
 }finally{p.close()}
});
if(failures.length)process.exitCode=1;else console.log(passes.length+' gang order cases passed.');
})();
