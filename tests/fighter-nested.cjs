const fs=require('fs');const {JSDOM}=require('jsdom');
const base=require('node:path').resolve(__dirname,'../dist/')+'/';const dom=new JSDOM('<div id="app"></div><input id="import-file" type="file">',{url:'https://local.test',runScripts:'dangerously'});const w=dom.window;w.alert=()=>{};w.structuredClone=x=>JSON.parse(JSON.stringify(x));
const files=['rules-data.js','app.js','extensions.js','catalog.js','gameplay.js','ui-match.js','parity.js','deep-parity.js','interaction-core.js','assets-parity.js','fighter-parity.js'];
const test=`
function assert(cond,msg){if(!cond)throw Error(msg)}
function set(name,val){let el=document.querySelector('#modal-form [name="'+name+'"]');assert(el,'missing field '+name);if(el.type==='checkbox')el.checked=!!val;else el.value=val;return el;}
function submit(){document.querySelector('#modal-submit').click()}
function tap(sel){let el=document.querySelector(sel);assert(el,'missing '+sel);el.click()}
let testGang=gang(),testFighter=testGang.fighters[0];testFighter.xp=40;data.view='fighter';data.selectedFighter=testFighter.id;save();
editFighter(testFighter);assert(document.querySelector('.modal-head').textContent.includes('Edit Fighter'),'edit title');set('name','Parity Test');set('label','PT');set('costAdjustment',5);set('startingXp',3);submit();assert(testFighter.name==='Parity Test'&&testFighter.xp===43,'edit persisted');
addXp(testFighter);tap('[data-fp="xp-plus"][data-sub="1"]');assert(document.querySelector('[name="amount"]').value==='2','XP counter');submit();assert(testFighter.xp===45&&testFighter.kills===2,'XP and OOA persisted');
let manualXpBefore=testFighter.xp;addXp(testFighter);set('amount',7).dispatchEvent(new Event('input',{bubbles:true}));set('amount',7).dispatchEvent(new Event('change',{bubbles:true}));assert(document.querySelector('[name="amount"]').value==='7','manual XP survives blur change');submit();assert(testFighter.xp===manualXpBefore+7,'manual XP override is saved after blur');
addAdvancement(testFighter);set('kind','Characteristic').dispatchEvent(new Event('change'));set('stat','T').dispatchEvent(new Event('change'));let oldT=Number(testFighter.stats.T),oldXp=testFighter.xp;submit();assert(testFighter.xp===oldXp-8&&FighterParity.stats(testFighter).T===oldT+1,'advancement applies cost and stat');
let a=testFighter.advancements[0];tap('[data-play="remove-advancement"][data-sub="'+a.id+'"]');submit();assert(testFighter.xp===oldXp&&FighterParity.stats(testFighter).T===oldT,'advancement deletion reverses');
FighterParity.addSkill(testFighter);set('skillSet','Agility').dispatchEvent(new Event('change'));let skills=document.querySelector('[name="skill"]');let choices=skills.closest('[data-mm-combo]').querySelectorAll('[data-mm-pick]');assert(choices.length>1,'real skills loaded');choices[1].click();submit();assert(testFighter.skills.length===2,'skill saved');
newLoadout(testFighter);set('name','First');tap('[data-fp="loadout-create"]');set('equipment',true).dispatchEvent(new Event('change'));submit();assert(testFighter.loadouts[0].equipmentIds.length===1,'loadout equipment persisted');
let before=testGang.fighters.length,credits=testGang.credits;FighterParity.copyFighter(testFighter);set('name','Fresh Clone');set('deduct',false);submit();assert(testGang.fighters.length===before+1&&testGang.fighters.at(-1).xp===3,'fresh copy resets XP');
let eq=RULES_DATA.equipment.find(x=>x.edition_slug==='n23'&&Number(x.cost)>0&&Number(x.cost)<100);let count=testFighter.equipment.length;FighterParity.purchaseEquipment(testFighter,eq,false);submit();assert(testFighter.equipment.length===count+1&&testGang.credits===credits-Number(eq.cost),'equipment purchase deducts credits');
testFighter.status='In Recovery';addInjury(testFighter);let item=FighterParity.injuryList().find(x=>x.name==='Eye Injury');set('injury',item.id);submit();assert(testFighter.injuries.length===1&&FighterParity.stats(testFighter).BS>Number(testFighter.stats.BS),'injury modifier persisted');
closeModal();FighterParity.changeStatus(testFighter,'Captured');submit();assert(testFighter.status==='Captured','capture persisted');
console.log('fighter workflows PASS: edit, XP, advancement/reversal, real skill, loadout, fresh copy, equipment purchase, injury modifier, capture');
`;
const more=`
(async()=>{
editFighter(testFighter);tap('[data-fp="adjust-stats"]');set('stat_T',9);submit();await new Promise(r=>setTimeout(r,1));assert(document.querySelector('.modal-head')?.textContent.includes('Edit Fighter'),'stats returns to draft edit');submit();assert(Number(testFighter.stats.T)===9,'nested stats draft commits to actual fighter');
testFighter.status='Active';addInjury(testFighter);let injury=FighterParity.injuryList().find(x=>x.name==='Eye Injury');set('injury',injury.id);submit();await new Promise(r=>setTimeout(r,1));assert(document.querySelector('.modal-head')?.textContent.includes('Recovery'),'recovery second step');submit();assert(testFighter.status==='In Recovery','recovery Yes persists');
let xpBefore=testFighter.xp,killsBefore=testFighter.kills;closeModal();tap('[data-fp="ooa-history"]');tap('[data-fp="ooa-add"]');submit();await new Promise(r=>setTimeout(r,1));assert(testFighter.ooaRecords.length===1&&testFighter.xp===xpBefore&&testFighter.kills===killsBefore,'manual OOA record has no XP/counter side effect');
console.log('nested workflows PASS: draft characteristics, recovery Yes, manual OOA record');
})();`;
Promise.resolve(w.eval(files.map(f=>fs.readFileSync(base+f,'utf8')).join('\n')+'\n'+test+'\n'+more)).catch(e=>{console.error(e);process.exitCode=1});
