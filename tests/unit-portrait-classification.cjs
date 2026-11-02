const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const path=require('node:path'),root=path.resolve(__dirname,'../dist');
const rules=JSON.parse(fs.readFileSync(path.join(root,'rules-data.json'),'utf8'));
const state={gangs:[],selectedGang:null},context=vm.createContext({window:{RULES_DATA:rules},data:state});
vm.runInContext(fs.readFileSync(path.join(root,'unit-portraits.js'),'utf8'),context);
const portraits=context.window.MMUnitPortraits;
const models=rules.fighterTypes.filter(row=>row.edition_slug==='n26'&&row.gang_type==='House Cawdor');
const gang={id:'cawdor-original',edition:'N26',faction:'House Cawdor',gangTypeId:'official-001-gang-house-cawdor',fighters:[],vehicles:[]};
state.gangs.push(gang);state.selectedGang=gang.id;
for(const model of models){
 const fighter={id:'unit-'+model.id,name:model.name,type:model.name,fighterTypeId:model.id,subtypes:[...model.fighter_subtypes]};
 gang.fighters.push(fighter);
 const before=JSON.stringify(state),info=portraits.describe(fighter,gang);
 assert.equal(info.faction,'house-cawdor');
 if(model.fighter_subtypes.includes('Brute'))assert.equal(info.body,'brute','Stig-Shambler retains its nonhuman body');
 else if(model.fighter_subtypes.includes('Pet'))assert.equal(info.body,'beast','Sheen Bird retains its nonhuman body');
 else{
  assert.equal(info.bank,model.fighter_subtypes.includes('Fanatic')?'cawdor-redemption':'house-cawdor',model.name);
  const role=model.fighter_subtypes.includes('Leader')?'leader':model.fighter_subtypes.includes('Champion')?'champion':model.fighter_subtypes.includes('Prospect')?'prospect':'ganger';
  assert.equal(info.role,role,model.name+' rank');
  const url=new URL(info.source,'https://local.test');assert.match(url.pathname,new RegExp('^/portraits/units/'+info.bank+'/'+role+'-[1-8]\\.webp$'));
  assert.equal(url.search,info.bank==='house-cawdor'?'?v=cawdor-20261102':'','Replaced blue portraits bypass old cached red files');
 }
 assert.equal(JSON.stringify(state),before,'Portrait selection never edits records');
}
const pious=models.find(row=>row.name==='Cawdor Brethren'),redemption=models.find(row=>row.name==='Redemptionist Brethren');
// Older roster/snapshot records without stored subtype arrays use their verified profile.
for(const model of [pious,redemption]){
 const legacy={id:'legacy-'+model.id,type:model.name};
 assert.equal(portraits.describe(legacy,gang).bank,model===pious?'house-cawdor':'cawdor-redemption');
}
// Conversion and promotion are reflected immediately, without overwriting the fighter's records.
const promoted={id:'converted',type:pious.name,fighterTypeId:pious.id,subtypes:['Champion','Fanatic'],imageUrl:'/api/uploads/custom-photo'};
const convertedBefore=JSON.stringify(promoted);assert.equal(portraits.describe(promoted,gang).bank,'cawdor-redemption');assert.equal(portraits.describe(promoted,gang).role,'champion');assert.equal(JSON.stringify(promoted),convertedBefore);
const formerRedemption={id:'pious-now',type:redemption.name,fighterTypeId:redemption.id,subtypes:['Leader','Pious']};
assert.equal(portraits.describe(formerRedemption,gang).bank,'house-cawdor','Current Pious overrides a former Redemptionist template');assert.equal(portraits.describe(formerRedemption,gang).role,'leader');
// A single original and a shared snapshot may have matching IDs; explicit contexts remain isolated.
const redSnapshot={...gang,id:'shared-cawdor',fighters:[{id:'same-id',type:redemption.name,fighterTypeId:redemption.id}]};
const blueOriginal={...gang,id:'original-cawdor',fighters:[{id:'same-id',type:pious.name,fighterTypeId:pious.id}]};
state.gangs.push(blueOriginal,redSnapshot);
assert.equal(portraits.describe(blueOriginal.fighters[0],blueOriginal).bank,'house-cawdor');assert.equal(portraits.describe(redSnapshot.fighters[0],redSnapshot).bank,'cawdor-redemption');
for(const model of [pious,redemption]){
 const squad={...gang,id:'squad-'+model.id,fighters:Array.from({length:8},(_,i)=>({id:'ganger-'+i,type:model.name,fighterTypeId:model.id}))};
 assert.equal(new Set(squad.fighters.map(fighter=>portraits.source(fighter,squad))).size,8,'Each allegiance has eight distinct ganger portraits');
}
const other={...gang,faction:'House Escher',gangTypeId:undefined,fighters:[]};
assert.equal(portraits.describe({id:'other',type:'Ganger',subtypes:['Fanatic','Ganger']},other).bank,'house-escher','Fanatic tags do not recolor other Houses');
console.log('PASS Cawdor Pious/Redemption portraits: all verified profiles, current allegiance/promotion, legacy records, original/snapshot isolation, eight variants, unchanged unit records and nonhuman exceptions.');
