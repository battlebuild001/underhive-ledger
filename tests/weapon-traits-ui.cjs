const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom');
const root=path.resolve(__dirname,'../dist'),html=fs.readFileSync(root+'/index.html','utf8');
const dom=new JSDOM('<div id="app"></div><input id="import-file" type="file">',{url:'https://manager.test/',runScripts:'outside-only',pretendToBeVisual:true});
const w=dom.window,context=dom.getInternalVMContext(),errors=[];
w.structuredClone=structuredClone;w.alert=message=>{throw Error(message)};w.HTMLElement.prototype.scrollIntoView=function(){};
w.matchMedia=()=>({matches:false,addListener(){},removeListener(){}});w.localStorage.setItem('underhive-korea-language','en');
w.addEventListener('error',event=>errors.push(event.message));
const run=source=>vm.runInContext(source,context),tick=()=>new Promise(resolve=>setTimeout(resolve,0));
const q=(selector,parent=w.document)=>{const node=parent.querySelector(selector);assert(node,'Missing '+selector);return node};
const all=(selector,parent=w.document)=>[...parent.querySelectorAll(selector)],snapshot=()=>run('JSON.stringify(data)');
const trait=(token,parent=w.document)=>{const node=all('[data-mmrr-trait]',parent).find(node=>node.dataset.mmrrTrait===token);assert(node,'Missing trait '+token);return node};
const close=()=>q('[data-mmrr-close]').click();
for(const match of html.matchAll(/<script src="\/([^"?]+)[^"]*"/g)){
  if(match[1]==='account-parity.js')continue;
  vm.runInContext(fs.readFileSync(root+'/'+match[1],'utf8'),context,{filename:match[1]});
}
const api=w.MMRuleReference;
async function search(value){const field=q('#modal-form').elements.search;field.value=value;field.dispatchEvent(new w.Event('input',{bubbles:true}));await new Promise(resolve=>setTimeout(resolve,190));}
function shownDefinition(token,edition){
  assert.equal(q('.mmrr-badge').textContent,edition.toUpperCase());
  assert.equal(w.document.querySelector('[data-mmrr-definition-status="missing"]'),null);
  const row=api.traitLookup(token,{edition});assert(row,'Verified trait definition '+token);
  assert.equal(q('.mmrr-description').textContent,w.UKI18n.t(row.description));
  if(w.UKI18n.language==='en')assert.equal(q('.mmrr-description').textContent,w.UK_CATALOG_LOCALE.rulesEn['weaponTraits:'+row.id],'The English ability text is linked to this edition-specific trait ID');
  assert(!w.document.activeElement.matches('input,textarea,select'),'Trait reading does not open the mobile keyboard');
}
(async()=>{
  await tick();
  const catalogueBefore=JSON.stringify(w.RULES_DATA);
  assert.deepEqual(Array.from(api.traitTokens('Arc (Front, Right), Rapid Fire (2), Gas')),['Arc (Front, Right)','Rapid Fire (2)','Gas']);
  const markup=w.document.createElement('div');markup.innerHTML=api.traitMarkup(['Arc (Front, Right)','Rapid Fire (2)','-','N/A','Unknown <img src=x>'],{edition:'N26'});
  assert.equal(all('[data-mmrr-trait]',markup).length,3,'Placeholders are plain text, actual traits are buttons');
  assert.equal(trait('Arc (Front, Right)',markup).type,'button');assert.equal(trait('Unknown <img src=x>',markup).dataset.mmrrEdition,'n26');
  assert.equal(markup.querySelector('img,script'),null,'Custom trait names are escaped in markup and attributes');
  for(const item of w.RULES_DATA.equipment.filter(row=>row.edition_slug==='n26'))for(const profile of item.weapon_profiles||[])for(const token of api.traitTokens(profile.traits)){
    if(/^[-—–]$/.test(token))continue;
    assert(api.traitLookup(token,{edition:'n26'}),'Missing N26 profile trait family '+token);
  }
  assert.equal(api.traitLookup('Ammo (5+)',{edition:'n23'}),null,'A new-edition-only rule is not reused in N23');
  run(`gang().edition='N26';gang().credits=870;gang().tradePoints=7;data.edition='N23';data.selectedFighter=gang().fighters[0].id;data.view='fighter';render();addEquipment(currentFighter())`);
  q('[name="listMode"][value="all"]').click();await search('Executioner ammo (Shotgun)');
  const form=q('#modal-form'),parent=q('.modal-bg'),results=q('#fp-equipment-list'),row=q('[data-fp="equipment-buy"][data-sub="f87e3685-16da-4708-a8da-2ba01c51432b"]').closest('.fp-buy-row');
  assert.deepEqual(all('[data-mmrr-trait]',row).map(node=>node.dataset.mmrrTrait),['Ammo (5+)','Knockback (5+)']);
  const ammo=trait('Ammo (5+)',row),before=snapshot();results.scrollTop=47;ammo.click();await tick();
  shownDefinition('Ammo (5+)','n26');assert.equal(q('.mmrr-trait-value strong').textContent,'5+');assert.equal(q('#mmrr-title').textContent,'Ammo (5+)');
  assert(parent.hasAttribute('inert'));assert.equal(q('#modal-form'),form);assert.equal(form.elements.search.value,'Executioner ammo (Shotgun)');
  w.UKI18n.setLanguage('ko');await tick();shownDefinition('Ammo (5+)','n26');assert(q('#mmrr-title').textContent.endsWith('(5+)'));assert(q('.mmrr-trait-value').textContent.includes('설명의 X'));
  w.UKI18n.setLanguage('en');await tick();shownDefinition('Ammo (5+)','n26');close();await tick();
  assert.equal(w.document.activeElement,ammo);assert(!parent.hasAttribute('inert'));assert.equal(results.scrollTop,47);assert.equal(snapshot(),before,'Reading and translating cannot buy gear or change records');
  trait('Knockback (5+)',row).click();await tick();shownDefinition('Knockback (5+)','n26');
  w.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));assert.equal(w.document.querySelector('.mmrr-overlay'),null);assert.equal(q('#modal-form'),form);
  ammo.click();q('.mmrr-overlay').click();assert.equal(w.document.querySelector('.mmrr-overlay'),null);assert.equal(q('#modal-form'),form);
  w.MMRuleReference.refresh();q('[data-mmrr-open]',row).click();await tick();
  const equipmentTitle=q('#mmrr-title').textContent;q('.mmrr-body').scrollTop=31;trait('Ammo (5+)',q('.mmrr-body')).click();await tick();shownDefinition('Ammo (5+)','n26');
  q('[data-mmrr-trait-back]').click();await tick();assert.equal(q('#mmrr-title').textContent,equipmentTitle);assert.equal(q('.mmrr-body').scrollTop,31);assert.equal(w.document.activeElement,trait('Ammo (5+)',q('.mmrr-body')));close();
  assert.equal(snapshot(),before);q('#modal-close').click();

  // Traits inside clickable roster cards must not navigate the parent fighter link.
  run(`currentFighter().equipment.push({...structuredClone(RULES_DATA.equipment.find(row=>row.id==='f87e3685-16da-4708-a8da-2ba01c51432b')),id:'owned-executioner',catalogId:'f87e3685-16da-4708-a8da-2ba01c51432b'});data.view='gang';data.tab='fighters';render()`);await tick();
  const rosterBefore=snapshot(),rosterTrait=trait('Ammo (5+)',q('.rp-roster'));rosterTrait.click();await tick();shownDefinition('Ammo (5+)','n26');assert.equal(run('data.view'),'gang');assert.equal(w.document.querySelector('.rp-equipment-dialog'),null);close();assert.equal(w.document.activeElement,rosterTrait);assert.equal(snapshot(),rosterBefore);
  q('[data-rp="equipment"][data-equipment="owned-executioner"]').click();await tick();const rosterDialog=q('.rp-equipment-dialog');trait('Knockback (5+)',rosterDialog).click();await tick();shownDefinition('Knockback (5+)','n26');close();assert.equal(q('.rp-equipment-dialog'),rosterDialog);q('#modal-close').click();
  run(`data.view='fighter';render()`);q('[data-fp="equipment-detail"][data-sub="owned-executioner"]').click();await tick();const ownedForm=q('#modal-form');ownedForm.elements.cost.value='44';const ownedBefore=snapshot();trait('Ammo (5+)',ownedForm).click();await tick();shownDefinition('Ammo (5+)','n26');close();assert.equal(q('#modal-form'),ownedForm);assert.equal(ownedForm.elements.cost.value,'44','Unsaved equipment edits remain intact');assert.equal(snapshot(),ownedBefore);q('#modal-cancel').click();

  // A custom profile preserves commas within arc parameters and never executes markup.
  run(`ensureAssets();data.customAssets.equipment.push({id:'trait-custom',name:'Trait custom weapon',edition:'N26',cost:0,equipmentType:'Weapon',weaponProfiles:[{profile_name:'Custom',traits:['Arc (Front, Right)','Rapid Fire (2)','Unknown <img src=x>']}]});data.view='catalog';data.edition='N26';render();ApAssets.open('equipment',data.customAssets.equipment.find(row=>row.id==='trait-custom'),'view')`);await tick();
  const customDialog=q('.ap-modal'),customBefore=snapshot();assert.equal(all('[data-mmrr-trait]',customDialog).length,3);
  trait('Arc (Front, Right)',customDialog).click();await tick();shownDefinition('Arc (Front, Right)','n26');assert.equal(q('.mmrr-trait-value strong').textContent,'Front, Right');close();
  trait('Unknown <img src=x>',customDialog).click();await tick();assert(q('[data-mmrr-definition-status="missing"]'));assert.equal(q('.mmrr-dialog').querySelector('img,script'),null);assert.equal(q('#mmrr-title').textContent,'Unknown <img src=x>');assert.equal(q('.mmrr-badge').textContent,'N26');w.UKI18n.setLanguage('ko');await tick();assert.equal(q('[data-mmrr-definition-status] strong').textContent,'설명 미등록');close();assert.equal(snapshot(),customBefore);q('[data-ap-close]').click();w.UKI18n.setLanguage('en');

  // Real N23 definitions have their own identities and meanings, rather than N26 text.
  for(const token of ['Sidearm','Plentiful','Parry','Unwieldy','Rapid Fire (1)'])assert(api.traitLookup(token,{edition:'n23'}),'N23 definition '+token);
  assert.notEqual(api.traitLookup('Parry',{edition:'n23'}).id,api.traitLookup('Parry',{edition:'n26'}).id);
  assert.notEqual(api.traitLookup('Parry',{edition:'n23'}).description,api.traitLookup('Parry',{edition:'n26'}).description);
  run(`gang().edition='N23';data.edition='N26';data.view='fighter';render();addEquipment(currentFighter())`);q('[name="listMode"][value="all"]').click();await search('Stub gun');
  const n23Form=q('#modal-form'),n23Before=snapshot();trait('Sidearm',q('#fp-equipment-list')).click();await tick();shownDefinition('Sidearm','n23');close();assert.equal(q('#modal-form'),n23Form);assert.equal(snapshot(),n23Before);q('#modal-close').click();
  run(`gang().vehicles??=[];gang().vehicles.push({id:'trait-vehicle',name:'Trait buggy',type:'Light Vehicle',cost:50,equipment:[{...structuredClone(RULES_DATA.equipment.find(row=>row.edition_slug==='n23'&&row.name==='Autogun')),id:'vehicle-autogun'}]});VehicleParity.init(gang().vehicles.at(-1));vehicleDetail(gang().vehicles.at(-1))`);
  q('[data-vp="equipment-view"][data-item="vehicle-autogun"]').click();await tick();const vehicleDialog=q('.vp-modal'),vehicleBefore=snapshot();trait('Rapid Fire (1)',vehicleDialog).click();await tick();shownDefinition('Rapid Fire (1)','n23');w.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));assert.equal(q('.vp-modal'),vehicleDialog);assert.equal(snapshot(),vehicleBefore,'Reading a vehicle weapon trait leaves inventory and credits unchanged');q('#modal-cancel').click();
  assert.equal(JSON.stringify(w.RULES_DATA),catalogueBefore,'No catalogue records are rewritten by display, lookup, or translation');
  assert.equal(w.document.querySelector('[data-mmrr-library],a[href="/learn"]'),null,'Trait explanations do not restore the deleted rulebook/tutorial menus');assert.deepEqual(errors,[]);
  dom.window.close();console.log('Weapon traits PASS: real N26/N23 definitions, parameter/comma parsing, picker/roster/owned/custom/vehicle surfaces, nested back, KO/EN, safe focus, escaping and read-only state');
})().catch(error=>{console.error(error);dom.window.close();process.exit(1)});
