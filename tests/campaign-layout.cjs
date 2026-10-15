const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),vm=require('node:vm'),{JSDOM}=require('jsdom');
const root=path.resolve(__dirname,'../dist'),html=fs.readFileSync(path.join(root,'index.html'),'utf8'),tick=()=>new Promise(resolve=>setTimeout(resolve,0));

(async()=>{
 const markup=html.replace(/<script[^>]*>[\s\S]*?<\/script>/g,'').replace(/<link rel="stylesheet" href="\/([^"?]+)[^"]*">/g,(_,file)=>`<style data-test-stylesheet="${file}">${fs.readFileSync(path.join(root,file),'utf8')}</style>`);
 const dom=new JSDOM(markup,{url:'https://manager.test/',runScripts:'outside-only',pretendToBeVisual:true}),w=dom.window,context=dom.getInternalVMContext(),errors=[];
 w.structuredClone=structuredClone;w.matchMedia=()=>({matches:false,addListener(){},removeListener(){}});w.HTMLElement.prototype.scrollIntoView=function(){};
 w.alert=message=>{throw Error(message)};w.confirm=()=>false;w.fetch=async()=>({ok:false,status:401,json:async()=>({error:'Test account is offline'})});
 w.localStorage.setItem('underhive-korea-language','en');w.addEventListener('error',event=>errors.push(event.message));Object.defineProperty(w,'innerWidth',{value:393,configurable:true});
 for(const match of html.matchAll(/<script src="\/([^"?]+)[^"]*"/g))vm.runInContext(fs.readFileSync(path.join(root,match[1]),'utf8'),context,{filename:match[1]});
 await tick();await tick();
 const run=source=>vm.runInContext(source,context),q=selector=>w.document.querySelector(selector),qa=selector=>[...w.document.querySelectorAll(selector)],click=selector=>{const node=q(selector);assert(node,'Missing '+selector);node.click();return node;},style=node=>w.getComputedStyle(node),field=name=>q(`#modal-form [name="${name}"]`);
 run(`
  var first=structuredClone(data.gangs[0]);first.id='layout-first';first.name='LongGangName'.repeat(10);first.reputation=4;first.edition='N23';
  var second=structuredClone(first);second.id='layout-second';second.name='Second Gang';second.fighters.forEach((f,i)=>f.id='second-fighter-'+i);
  var fixture=structuredClone(data.campaigns[0]);fixture.id='layout-campaign';fixture.name='VeryLongCampaignName'.repeat(12);fixture.edition='N23';
  fixture.members=[{id:'layout-alpha',gangId:first.id,player:'Alpha Player',role:'Arbitrator',resources:{'layout-supply':2}},{id:'layout-beta',gangId:second.id,player:'Beta Player',role:'Player',resources:{'layout-supply':0}}];
  fixture.resources=[{id:'layout-supply',name:'Supply',gangId:null}];fixture.allegiances=[];
  fixture.territories=[{id:'layout-territory',name:'LongTerritoryName'.repeat(12),gangId:first.id,description:'Saved territory note'}];
  fixture.battles=[];fixture.sessions=[{id:'layout-session',scenario:'LongScenarioName'.repeat(12),participants:[],round:1,stage:'pre-battle',status:'Active'}];
  fixture.packHtml='<p>User pack <a href="https://example.test/">'+('LongUnbrokenURL'.repeat(30))+'</a></p>';
  data.gangs=[first,second];data.campaigns=[fixture];data.selectedGang=first.id;data.selectedCampaign=fixture.id;data.view='campaign';data.campaignTab='members';save();
 `);await tick();

 // jsdom does not measure pixels. Check the real production cascade and DOM
 // boundaries that keep a wide table inside its own scroll area instead.
 const canonical=run('JSON.stringify({gangs:data.gangs,campaigns:data.campaigns})');
 let page=q('.cp-campaign-page'),stack=q('.cp-campaign-page>.stack'),scroll=q('.cp-members-scroll');
 assert(page&&stack&&scroll,'Campaign has its own page, stack and member-table boundaries');
 assert.equal(qa('.cp-campaign-page').length,1);assert(q('.cp-campaign-header .entity-title h1'));
 assert.equal(style(stack).gridTemplateColumns.replace(/\s/g,''),'minmax(0,1fr)');assert.equal(parseFloat(style(stack).minWidth),0);
 for(const child of stack.children){assert.equal(parseFloat(style(child).minWidth),0);assert.equal(style(child).maxWidth,'100%');}
 assert.equal(parseFloat(style(scroll).minWidth),0);assert.equal(style(scroll).maxWidth,'100%');assert.equal(style(scroll).overflowX,'auto');
 assert.equal(scroll.tabIndex,0);assert.equal(scroll.getAttribute('role'),'region');assert.equal(scroll.getAttribute('aria-label'),'Campaign gang statistics');assert(scroll.querySelector('table .cp-member-row [data-cp="member-remove"]'),'The rightmost management button remains inside the scroll region');
 assert.equal(style(scroll.querySelector('table')).minWidth,'600px','Keep full table columns accessible through local scrolling');
 assert.equal(q('.cp-scroll-hint').hidden,false);assert.match(q('.cp-scroll-hint').textContent,/sideways/);
 for(const node of qa('.content [data-campaign-tab]'))assert(page.contains(node),'Campaign tabs remain inside the page boundary');

 const search=q('#cp-player-search');search.value='Alpha';search.dispatchEvent(new w.Event('input',{bubbles:true}));
 assert.equal(q('.cp-member-row [data-id="layout-alpha"]').closest('tr').hidden,false);assert.equal(q('.cp-member-row [data-id="layout-beta"]').closest('tr').hidden,true);
 w.UKI18n.setLanguage('ko');await tick();assert.equal(q('#cp-player-search'),search);assert.equal(search.value,'Alpha');assert.equal(q('.cp-member-row [data-id="layout-beta"]').closest('tr').hidden,true);assert.equal(scroll.getAttribute('aria-label'),'캠페인 갱 통계');assert.match(q('.cp-scroll-hint').textContent,/좌우/);
 w.UKI18n.setLanguage('en');await tick();assert.equal(scroll.getAttribute('aria-label'),'Campaign gang statistics');assert.equal(run('JSON.stringify({gangs:data.gangs,campaigns:data.campaigns})'),canonical,'Layout, filtering and language changes preserve every campaign and gang field');
 scroll.focus();assert.equal(w.document.activeElement,scroll,'The scroll area is reachable without focusing an editable field');

 // Use existing member and resource actions through the new scroll wrapper.
 click('.cp-member-row [data-cp="member-role"][data-id="layout-alpha"]');assert(field('role'));w.MMWidgets.setValue(field('role'),'Player',{emit:true});click('#modal-submit');assert.equal(run('campaign().members[0].role'),'Player');assert(!q('.modal-bg'));
 click('.cp-member-row [data-cp="member-resource"][data-id="layout-alpha"]');assert(field('delta'));field('delta').value='3';click('#modal-submit');assert.equal(run("campaign().members[0].resources['layout-supply']"),5);assert.equal(run("campaign().members[1].resources['layout-supply']"),0);assert(q('.cp-members-scroll [data-cp="member-resource"][data-id="layout-alpha"]').textContent.includes('5'));

 for(const tab of ['territories','pack','map','triumphs','battles']){
  click(`[data-campaign-tab="${tab}"]`);await tick();page=q('.cp-campaign-page');assert(page,'Missing campaign boundary for '+tab);assert.equal(qa('.cp-campaign-page').length,1);assert.equal(run('data.campaignTab'),tab);
  for(const wrapper of qa('.content .table-wrap')){assert(page.contains(wrapper),tab+' table remains inside campaign boundary');assert.equal(style(wrapper).maxWidth,'100%');assert.equal(style(wrapper).overflowX,'auto');}
  if(tab==='pack'){assert(q('.cp-rich-content a').textContent.includes('LongUnbrokenURL'));assert.equal(style(q('.cp-rich-content')).overflowWrap,'anywhere');}
  if(tab==='triumphs'){const rankings=q('.cp-triumph-grid');assert(rankings.children.length>0,'Populated standings exercise nested wide tables');assert.equal(style(rankings).gridTemplateColumns.replace(/\s/g,''),'minmax(0,1fr)');for(const child of rankings.children)assert.equal(parseFloat(style(child).minWidth),0);}
 }
 click('[data-session="detail"][data-id="layout-session"]');await tick();assert.equal(run('data.campaignTab'),'session-detail');assert(q('.cp-campaign-page .cp-phase-row'),'Session detail retains the campaign containment boundary');assert.equal(qa('.cp-campaign-page').length,1);click('[data-cp="session-back"]');assert.equal(run('data.campaignTab'),'battles');
 assert.deepEqual(errors,[]);dom.window.close();console.log('PASS: campaign grid/table containment, accessible local scrolling, bilingual search and labels, member/resource actions, nested standings, campaign tabs and session boundaries.');
})().catch(error=>{console.error(error.stack);process.exitCode=1});
