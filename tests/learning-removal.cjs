const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {JSDOM}=require('jsdom');

const root=path.resolve(__dirname,'..'),dist=path.join(root,'dist'),KEY='underhive-ledger-v1';
const html=fs.readFileSync(path.join(dist,'index.html'),'utf8');
const scripts=[...html.matchAll(/<script src="\/([^"?]+)[^"]*"/g)].map(match=>match[1]);
const removed=['learning-center.js','learning-center.css','learning-content.js','learning-tutorials.js','tutorial-detail-foundations.js','tutorial-detail-n26.js'];
const pages=[],pause=()=>new Promise(resolve=>setTimeout(resolve,10));
async function page({url='/',state}={}){
 const dom=new JSDOM(html.replace(/<script[^>]*>[\s\S]*?<\/script>/g,''),{url:'https://manager.test'+url,runScripts:'dangerously',pretendToBeVisual:true});
 pages.push(dom);const w=dom.window,errors=[];
 if(state)w.localStorage.setItem(KEY,JSON.stringify(state));
 w.structuredClone=structuredClone;w.matchMedia=()=>({matches:false,addListener(){},removeListener(){}});w.HTMLElement.prototype.scrollIntoView=function(){};
 w.alert=message=>{throw Error(message)};w.fetch=async()=>new Response(JSON.stringify({error:'Sign in required'}),{status:401,headers:{'Content-Type':'application/json'}});
 w.addEventListener('error',event=>errors.push(event.message));
 for(const file of scripts){const script=w.document.createElement('script');script.textContent=fs.readFileSync(path.join(dist,file),'utf8');w.document.body.append(script)}
 for(let attempt=0;attempt<120&&w.AccountParity?.connecting;attempt++)await pause();
 assert(w.AccountParity&&!w.AccountParity.connecting,'Account boot finishes without the removed learning module');
 return {w,errors};
}
const snapshot=w=>JSON.parse(w.eval('JSON.stringify(data)'));
// Backup validation supplies these existing optional empty-list defaults.
const campaignsWithDefaults=rows=>rows.map(campaign=>({...campaign,resources:campaign.resources??[],allegiances:campaign.allegiances??[]}));
function absent(w){
 assert.equal(w.UKLearning,undefined);assert.equal(w.UK_TUTORIALS,undefined);assert.equal(w.UK_LEARNING_CONTENT,undefined);
 assert.equal(w.document.querySelector('.ukl-center,[data-uk-nav="learn"],[data-uk-section="learn"],.mm-menu-learning'),null);
 assert(![...w.document.querySelectorAll('a[href]')].some(node=>/^\/(?:learn|guides)(?:\/|$)/.test(node.getAttribute('href'))),'No navigation points at removed learning pages');
 assert(w.RULES_DATA.fighterTypes.length>1000,'Fighter recruitment catalog remains available');
 assert(w.RULES_DATA.equipment.length>1000,'Equipment profiles remain available');
}
(async()=>{
 for(const file of removed){assert(!html.includes('/'+file),'The app stops loading '+file);assert(!fs.existsSync(path.join(dist,file)),'Removed learning assets are not published: '+file)}
 for(const edition of ['n23','n26'])for(const language of ['ko','en'])assert(!fs.existsSync(path.join(dist,'guides','underhive-'+edition+'-'+language+'.html')),'Removed handbook download is not published');
 const first=await page();absent(first.w);const original=snapshot(first.w);
 assert.equal(original.view,'dashboard');
 const legacy=structuredClone(original);legacy.view='learning';legacy.learningProgress={version:2,ownerId:'guest',bookmarks:['n26-core-wound-target'],lessons:{'n26:workspace-basics':{done:['orientation'],answers:{},checkpoint:1}}};
 legacy.gangs[0].name='Keep my original gang';legacy.gangs[0].privateNotes='Keep private gang notes';legacy.campaigns[0].name='Keep my original campaign';
 const old=await page({state:legacy}),w=old.w;absent(w);
 assert.equal(snapshot(w).view,'dashboard','A saved learning view opens the roster home');
 assert.deepEqual(snapshot(w).gangs,legacy.gangs,'Removing learning does not change saved gangs');
 assert.deepEqual(snapshot(w).campaigns,legacy.campaigns,'Removing learning does not change saved campaigns');
 assert.deepEqual(snapshot(w).learningProgress,legacy.learningProgress,'Historical optional fields remain safe in existing records');
 const baseline=snapshot(w);
 const menuButton=w.document.querySelector('[data-action="menu"]');assert(menuButton);menuButton.click();
 const menu=w.document.querySelector('#mm-settings-menu');assert(menu);assert.doesNotMatch(menu.textContent,/Rules Guide|Tutorial|룰 가이드|튜토리얼|퀵시트/);
 assert.equal(menu.querySelector('a[href^="/learn"]'),null);menuButton.click();
 for(const url of ['/learn','/learn/rules?edition=n23','/learn/tutorials?lesson=workspace-basics']){
  w.history.replaceState({},'',url);w.dispatchEvent(new w.PopStateEvent('popstate'));await pause();absent(w);
  assert.equal(w.location.pathname,'/','Old learning links fall back to the roster home');assert.equal(snapshot(w).view,'dashboard');
  assert.deepEqual(snapshot(w).gangs,baseline.gangs);assert.deepEqual(snapshot(w).campaigns,baseline.campaigns);
 }
 // A backup exported before removal may still contain optional progress data.
 const imported=structuredClone(baseline);imported.view='learning';imported.gangs[0].name='Imported original gang';
 const wrapper={version:1,data:imported},expected=w.UKBackup.validate(wrapper);
 await w.UKBackup.importFile({size:100,text:async()=>JSON.stringify(wrapper)});
 assert(w.document.querySelector('[name="replaceConfirmed"]'),'Legacy backups still open the normal review step');
 w.document.querySelector('[name="replaceConfirmed"]').checked=true;w.document.querySelector('#modal-submit').click();await pause();
 assert(!w.document.querySelector('#backup-error')?.textContent,'Legacy backup import succeeds: '+(w.document.querySelector('#backup-error')?.textContent||''));
 assert.deepEqual(snapshot(w).gangs,JSON.parse(JSON.stringify(expected.gangs)));assert.deepEqual(snapshot(w).campaigns,JSON.parse(JSON.stringify(expected.campaigns)));
 assert.deepEqual(snapshot(w).learningProgress,imported.learningProgress);assert.equal(snapshot(w).view,'dashboard');absent(w);
 w.UKBackup.restore();w.document.querySelector('[name="replaceConfirmed"]').checked=true;w.document.querySelector('#modal-submit').click();await pause();
 assert.deepEqual(snapshot(w).gangs,baseline.gangs);assert.deepEqual(campaignsWithDefaults(snapshot(w).campaigns),campaignsWithDefaults(baseline.campaigns));
 w.history.replaceState({},'','/account');w.eval("data.view='account';render()");
 assert.equal(w.document.querySelector('#account-auth-form').querySelectorAll('input').length,2,'ID/password access still works without learning');
 assert.equal(w.AccountParity.safeReturnPath('/learn/tutorials'),'/account','Removed learning routes cannot become post-login destinations');absent(w);
 for(const p of [first,old])assert.deepEqual(p.errors,[]);
 console.log('Learning removal: no menus/assets/globals or handbook downloads, safe legacy routes and saved views, preserved catalogs/records/backups and ID/password account access passed.');
})().catch(error=>{console.error(error);process.exitCode=1}).finally(()=>{for(const dom of pages)dom.window.close()});
