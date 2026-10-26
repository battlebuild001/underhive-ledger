const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom');
const root=path.resolve(__dirname,'../dist'),dom=new JSDOM('<div id="app"></div><input id="import-file" type="file">',{url:'https://manager.test',runScripts:'outside-only',pretendToBeVisual:true}),w=dom.window,context=dom.getInternalVMContext();w.localStorage.setItem('underhive-korea-language','en');w.alert=()=>{};w.structuredClone=structuredClone;w.HTMLElement.prototype.scrollIntoView=function(){};
for(const x of fs.readFileSync(root+'/index.html','utf8').matchAll(/<script src="\/([^"?]+)[^"]*"/g)){if(x[1]==='account-parity.js')continue;vm.runInContext(fs.readFileSync(root+'/'+x[1],'utf8'),context,{filename:x[1]})}
const run=s=>vm.runInContext(s,context);run("data.view='gang';save()");assert.equal(w.location.pathname,'/gang/'+run('gang().id'));run("data.selectedFighter=gang().fighters[0].id;data.view='fighter';save()");assert.equal(w.location.pathname,'/fighter/'+run('currentFighter().id'));run('printGang(gang())');assert(w.location.pathname.endsWith('/print'));assert(w.document.querySelector('.mp-options'));w.history.replaceState({},'','/');w.dispatchEvent(new w.PopStateEvent('popstate'));assert.equal(run('data.view'),'dashboard');assert.equal(w.location.pathname,'/');const campaignId=run('campaign().id');w.history.replaceState({},'','/campaigns/'+campaignId);w.dispatchEvent(new w.PopStateEvent('popstate'));assert.equal(run('data.view'),'campaign');assert.equal(run('data.selectedCampaign'),campaignId);
const records=run('JSON.stringify({gangs:data.gangs,campaigns:data.campaigns})');
const nav=()=>[...w.document.querySelectorAll('.uk-workspace-nav [data-uk-section]')];
assert.deepEqual(nav().map(node=>node.dataset.ukSection),['gangs','campaigns','assets','account']);
assert(!w.document.querySelector('[data-uk-nav="learn"],.mm-menu-learning,a[href^="/learn"]'),'Removed learning has no navigation entry');
for(const language of ['ko','en']){w.UKI18n.setLanguage(language);assert.equal(nav().length,4);assert(!nav().some(node=>/학습|Learn/.test(node.textContent)));}
w.document.querySelector('[data-uk-nav="gangs"]').click();assert.equal(w.location.pathname,'/');assert.equal(run('data.view'),'dashboard');
w.document.querySelector('[data-uk-nav="campaigns"]').click();assert.equal(run('data.homeTab'),'campaigns');
w.document.querySelector('[data-uk-nav="assets"]').click();assert.equal(w.location.pathname,'/');assert.equal(run('data.view'),'catalog');
for(const route of ['/learn','/learn/rules?edition=n26','/learn/tutorials?lesson=workspace-basics','/learn/quick?edition=n23']){
 w.history.replaceState({},'',route);w.dispatchEvent(new w.PopStateEvent('popstate'));assert.equal(w.location.pathname,'/');assert.equal(w.location.search,'');assert.equal(run('data.view'),'dashboard');assert.equal(run('data.homeTab'),'gangs');assert(!w.document.querySelector('.ukl-center'));
}
// A same-path render after restoring an old cache must not preserve a deleted view.
run("data.view='learning';render()");assert.equal(run('data.view'),'dashboard');assert.equal(w.location.pathname,'/');
assert.equal(run('JSON.stringify({gangs:data.gangs,campaigns:data.campaigns})'),records,'Navigation and legacy learning links preserve every gang and campaign');
const css=fs.readFileSync(root+'/korea-ui.css','utf8');assert.match(css,/grid-template-columns:repeat\(4,minmax\(0,1fr\)\)/,'Mobile navigation has four equal columns');
const cached=JSON.parse(run('JSON.stringify(data)'));cached.view='learning';
for(const route of ['/','/learn/tutorials?edition=n26']){
 const restored=new JSDOM('<div id="app"></div><input id="import-file" type="file">',{url:'https://manager.test'+route,runScripts:'outside-only',pretendToBeVisual:true}),rw=restored.window,rc=restored.getInternalVMContext();
 rw.localStorage.setItem('underhive-ledger-v1',JSON.stringify(cached));rw.localStorage.setItem('underhive-korea-language','en');rw.structuredClone=structuredClone;rw.alert=()=>{};rw.HTMLElement.prototype.scrollIntoView=function(){};
 for(const x of fs.readFileSync(root+'/index.html','utf8').matchAll(/<script src="\/([^"?]+)[^"]*"/g)){if(x[1]==='account-parity.js')continue;vm.runInContext(fs.readFileSync(root+'/'+x[1],'utf8'),rc,{filename:x[1]})}
 const restoredRun=source=>vm.runInContext(source,rc);assert.equal(restoredRun('data.view'),'dashboard','An old learning cache opens the home screen on startup');assert.equal(rw.location.pathname,'/');assert.equal(rw.location.search,'');assert.equal(rw.document.querySelectorAll('.uk-workspace-nav [data-uk-section]').length,4);
 assert.deepEqual(JSON.parse(restoredRun('JSON.stringify({gangs:data.gangs,campaigns:data.campaigns})')),JSON.parse(records),'Startup recovery preserves cached records');restored.window.close();
}
console.log('Navigation: gang/fighter/print routes, four primary sections, removed learning links, legacy URL/cache recovery and unchanged records passed.');dom.window.close();
