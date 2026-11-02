const fs=require('fs'),path=require('path'),assert=require('assert'),{JSDOM}=require('jsdom');
const root=path.resolve(__dirname,'../dist'),dom=new JSDOM('<!doctype html><html lang="ko"><body><div id="app"></div><input id="import-file" type="file"></body></html>',{url:'https://local.test/',runScripts:'dangerously',pretendToBeVisual:true}),w=dom.window;
w.matchMedia=()=>({matches:false,addListener(){},removeListener(){}});w.alert=message=>{throw Error(message)};w.HTMLElement.prototype.scrollIntoView=function(){};
const errors=[];w.addEventListener('error',event=>errors.push(event.message));
for(const file of ['rules-data.js','app.js','extensions.js','catalog.js','gameplay.js','ui-match.js','parity.js','deep-parity.js','interaction-core.js','assets-parity.js','gang-parity.js','fighter-parity.js','campaign-parity.js','gang-tools.js','roster-parity.js','vehicle-parity.js','shell-parity.js','gang-portrait.js','financial-parity.js','korea-ui.js','bootstrap.js']){const script=w.document.createElement('script');script.textContent=fs.readFileSync(path.join(root,file),'utf8');w.document.body.append(script);}
const q=selector=>w.document.querySelector(selector),qa=selector=>[...w.document.querySelectorAll(selector)],run=source=>w.eval(source),tap=selector=>{const node=q(selector);assert(node,'Missing '+selector);node.click()};
run("data.view='dashboard';data.homeTab='gangs';data.edition='N23';save()");
assert.equal(qa('.uk-workspace-nav').length,1);assert.equal(qa('.uk-overview-stat').length,0);assert.equal(q('[data-uk-section="gangs"]').getAttribute('aria-current'),'page');
const original=run('JSON.stringify({gangs:data.gangs,campaigns:data.campaigns})');
// The new navigation reaches existing pages and retains all canonical records and routes.
tap('[data-uk-nav="campaigns"]');assert.equal(run('data.view'),'dashboard');assert.equal(run('data.homeTab'),'campaigns');assert(q('[data-parity="home"][data-value="campaigns"]').classList.contains('active'));
tap('[data-uk-nav="assets"]');assert.equal(run('data.view'),'catalog');assert(q('.ap-catalog-section'));assert.equal(q('[data-uk-section="assets"]').getAttribute('aria-current'),'page');
tap('[data-uk-nav="gangs"]');assert.equal(run('data.homeTab'),'gangs');assert.equal(run('JSON.stringify({gangs:data.gangs,campaigns:data.campaigns})'),original);
const selectedGang=q('[data-open-gang]');assert(selectedGang);assert(selectedGang.querySelector('.uk-home-portrait'));selectedGang.click();assert.equal(run('data.view'),'gang');assert(w.location.pathname.startsWith('/gang/'));assert(q('[data-action="new-fighter"]'));
tap('[data-uk-nav="gangs"]');assert.equal(w.location.pathname,'/');
// Existing modal action, close controls and data all survive presentation enhancement.
tap('[data-action="new-gang"]');assert(q('.modal-bg'));assert(q('.modal [name="name"]'));q('.modal [name="name"]').value='Unsaved test gang';const close=q('#modal-cancel')||q('#modal-close');assert(close);close.click();assert(!q('.modal-bg'));assert.equal(run('JSON.stringify({gangs:data.gangs,campaigns:data.campaigns})'),original);
// Refresh is idempotent, including records whose portrait cannot be resolved.
w.UKInterface.refresh();w.UKInterface.refresh();assert.equal(qa('.uk-workspace-nav').length,1);assert.equal(qa('.uk-overview').length,0);assert(qa('.home-card-main').every(button=>button.querySelectorAll('.uk-home-portrait').length<=1));assert(q('[data-uk-section="account"]').hasAttribute('data-account-action'));
const css=fs.readFileSync(path.join(root,'korea-ui.css'),'utf8');assert(css.includes('--uk-body:16px'));assert(/data-ui-language="en"[\s\S]{0,90}--uk-body:14\.5px/.test(css));assert(css.includes('--uk-leading:1.65'));assert(css.includes('--uk-leading:1.5'));assert(css.includes('min-height:44px'));assert(css.includes('env(safe-area-inset-bottom)'));assert(!css.includes('supabase.co'));assert.equal(errors.length,0,errors.join('\n'));
console.log('PASS: Korea UI navigation, routes, preserved records, modal cancel, portrait deduplication, localized typography and mobile touch targets');
w.close();
