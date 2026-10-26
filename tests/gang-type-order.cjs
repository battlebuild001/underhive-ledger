const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom');
const root=path.resolve(__dirname,'../dist'),html=fs.readFileSync(root+'/index.html','utf8');
const dom=new JSDOM('<div id="app"></div><input id="import-file" type="file">',{url:'https://manager.test/',runScripts:'outside-only',pretendToBeVisual:true});
const w=dom.window,context=dom.getInternalVMContext(),errors=[];
w.structuredClone=structuredClone;w.alert=message=>{throw Error(message)};w.HTMLElement.prototype.scrollIntoView=function(){};
w.matchMedia=()=>({matches:false,addListener(){},removeListener(){}});w.localStorage.setItem('underhive-korea-language','en');w.addEventListener('error',event=>errors.push(event.message));
const run=source=>vm.runInContext(source,context),tick=()=>new Promise(resolve=>setTimeout(resolve,0));
const q=(selector,parent=w.document)=>{const node=parent.querySelector(selector);assert(node,'Missing '+selector);return node},all=(selector,parent=w.document)=>[...parent.querySelectorAll(selector)];
const snapshot=()=>run('JSON.stringify(data)'),form=()=>q('#modal-form'),wrapper=()=>form().elements.faction.closest('[data-mm-combo]');
const englishHouses=['House Cawdor','House Delaque','House Escher','House Goliath','House Orlock','House Van Saar'];
const koreanHouses=['House Goliath','House Delaque','House Van Saar','House Escher','House Orlock','House Cawdor'];
for(const match of html.matchAll(/<script src="\/([^"?]+)[^"]*"/g)){if(match[1]==='account-parity.js')continue;vm.runInContext(fs.readFileSync(root+'/'+match[1],'utf8'),context,{filename:match[1]});}
function groups(){const result=[];for(const node of q('.mm-combo-options',wrapper()).children){if(node.matches('.mm-combo-group'))result.push({name:node.textContent,rows:[]});else if(node.matches('[data-mm-pick]'))result.at(-1).rows.push(node);}return result;}
function assertOrder(language){
  const grouped=groups();assert.deepEqual(grouped.map(group=>group.name),['Houses','Other','Custom'].map(name=>language==='ko'?w.UKI18n.t(name):name),'Each group appears once in the intended order');
  assert.deepEqual(grouped[0].rows.map(node=>node.dataset.mmLabel),language==='ko'?koreanHouses:englishHouses,'All six Houses sort by the displayed language');
  for(const group of grouped){const labels=group.rows.map(node=>node.textContent);assert.deepEqual(labels,[...labels].sort(new Intl.Collator(language,{numeric:true,sensitivity:'base'}).compare),'Visible labels sort within '+group.name);}
  assert(grouped[2].rows.some(node=>node.dataset.mmLabel==='House Zebra Custom'),'Custom House-named types remain in Custom');
  assert.equal(new Set(grouped.flatMap(group=>group.rows.map(node=>node.dataset.mmPick))).size,grouped.reduce((sum,group)=>sum+group.rows.length,0));
}
function search(value){const input=q('[data-mm-search]',wrapper());input.value=value;input.dispatchEvent(new w.Event('input',{bubbles:true}));return input;}
function setField(name,value){const input=form().elements[name];input.value=value;input.dispatchEvent(new w.Event('input',{bubbles:true}));}
(async()=>{
  await tick();run(`ensureAssets();data.customAssets.gangTypes.push({id:'order-house-custom',name:'House Zebra Custom',edition:'N23'},{id:'order-house-custom26',name:'House Zebra Custom',edition:'N26'},{id:'order-neutral-custom',name:'Alpha custom'},{id:'order-ko-custom',name:'가나다 사용자'},{id:'order-hidden-custom',name:'Hidden custom',is_hidden:true});data.view='dashboard';render()`);
  const catalogBefore=JSON.stringify(w.RULES_DATA);
  for(const edition of ['N23','N26']){
    w.UKI18n.setLanguage('en');run(`data.edition=${JSON.stringify(edition)};render()`);const before=snapshot();run('editGang()');await tick();assertOrder('en');
    const source=w.RULES_DATA.gangTypes.filter(row=>row.edition_slug===edition.toLowerCase()&&!row.parent_gang_type_id&&!row.is_hidden),ids=all('[data-mm-pick]',wrapper()).map(node=>node.dataset.mmPick);
    assert(source.every(row=>ids.includes(row.id)));assert.equal(ids.length,source.length+3,'Only matching, visible custom types are included');assert(!ids.includes('order-hidden-custom'));
    const type=source.find(row=>row.name==='House Escher');w.MMWidgets.setValue(form().elements.faction,type.id,{emit:true});await tick();setField('name','정렬 검토 초안');setField('credits','1234');
    const activeForm=form(),selectedInput=activeForm.elements.faction;q('[data-mm-trigger]',wrapper()).click();const searchInput=search('House');searchInput.focus();q('.mm-combo-options',wrapper()).scrollTop=71;
    w.UKI18n.setLanguage('ko');await tick();assert.equal(form(),activeForm,'Language sorting does not rebuild the creation form');assert.equal(activeForm.elements.faction,selectedInput);assert.equal(selectedInput.value,type.id);assert.equal(q('[data-mm-search]',wrapper()),searchInput);assert.equal(searchInput.value,'House');assert.equal(w.document.activeElement,searchInput,'Explicit search focus is preserved');assert(!q('.mm-combo-list',wrapper()).hidden);assert.equal(q('.mm-combo-options',wrapper()).scrollTop,71);assert.equal(activeForm.elements.name.value,'정렬 검토 초안');assert.equal(activeForm.elements.credits.value,'1234');assertOrder('ko');
    const cawdor=all('[data-mm-pick]',wrapper()).find(node=>node.dataset.mmLabel==='House Cawdor');cawdor.focus();w.UKI18n.setLanguage('en');await tick();assertOrder('en');assert.equal(w.document.activeElement.dataset.mmPick,cawdor.dataset.mmPick,'A focused option keeps its identity when reordered');assert.equal(activeForm.elements.faction.value,type.id);assert.equal(searchInput.value,'House');
    w.MMWidgets.closeAll();const detached=q('.modal-bg');detached.remove();w.UKI18n.setLanguage('ko');w.document.body.append(detached);q('[data-mm-trigger]',wrapper()).click();await tick();assertOrder('ko');assert.equal(activeForm.elements.name.value,'정렬 검토 초안','A temporarily detached parent keeps its draft');assert.equal(activeForm.elements.faction.value,type.id);
    search('에셔');assert.equal(all('[data-mm-pick]:not([hidden])',wrapper()).length,1);assert.equal(all('.mm-combo-group:not([hidden])',wrapper()).length,1,'Empty groups are hidden during search');w.UKI18n.setLanguage('ko');await tick();assert.equal(searchInput.value,'에셔');assert.equal(all('[data-mm-pick]:not([hidden])',wrapper())[0].dataset.mmPick,type.id);
    search('No such faction anywhere');w.UKI18n.setLanguage('en');await tick();assert.equal(all('.mm-combo-group:not([hidden])',wrapper()).length,0);assert(!q('.mm-combo-empty',wrapper()).hidden);assert.equal(snapshot(),before,'Sorting, selecting draft fields and reading options never save a gang');w.MMWidgets.closeAll();q('#modal-cancel').click();assert.equal(snapshot(),before);
  }
  run(`data.edition='N26';editGang()`);const escher=w.RULES_DATA.gangTypes.find(row=>row.edition_slug==='n26'&&row.name==='House Escher');w.MMWidgets.setValue(form().elements.faction,escher.id,{emit:true});await tick();
  const variant=w.RULES_DATA.gangTypes.find(row=>row.parent_gang_type_id===escher.id);assert(variant);assert(q('input[name="variant"][value="'+variant.id+'"]'));assert.equal(wrapper().querySelector('[data-mm-pick="'+variant.id+'"]'),null,'Variants stay in their dedicated selection');
  setField('name','Sorted canonical gang');setField('credits','1234');w.UKI18n.setLanguage('ko');await tick();q('#modal-submit').click();await tick();const created=run('data.gangs.find(row=>row.name==="Sorted canonical gang")');assert(created);assert.equal(created.gangTypeId,escher.id);assert.equal(created.faction,'House Escher');assert.equal(created.edition,'N26');assert.equal(created.credits,1234);assert.equal(JSON.stringify(w.RULES_DATA),catalogBefore);assert.deepEqual(errors,[]);
  dom.window.close();console.log('Gang type ordering PASS: unique Houses/Other/Custom groups, EN/KO ordering, both editions, live query/selection/focus/drafts, variants, read-only browsing and canonical creation');
})().catch(error=>{console.error(error);dom.window.close();process.exit(1)});
