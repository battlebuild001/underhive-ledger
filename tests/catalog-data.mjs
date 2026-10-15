import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';

const data=JSON.parse(await readFile(new URL('../dist/rules-data.json',import.meta.url),'utf8'));
const context=vm.createContext({});
vm.runInContext(await readFile(new URL('../dist/rules-data.js',import.meta.url),'utf8'),context);
assert.equal(JSON.stringify(context.RULES_DATA),JSON.stringify(data),'Browser script and JSON catalog must agree.');
function edition(row){
 const direct=String(row?.edition_slug||row?.edition||data.editions.find(x=>x.id===row?.edition_id)?.slug||'').toLowerCase();if(direct)return direct;
 for(const[key,collection]of [['equipment_id','equipment'],['fighter_type_id','fighterTypes'],['vehicle_type_id','vehicleTypes'],['scenario_table_id','scenarioTables'],['campaign_type_id','campaignTypes'],['tactics_cards_pack_id','tacticsPacks']])if(row?.[key]){const parent=data[collection].find(x=>x.id===row[key]);if(parent)return edition(parent);}
 return '';
}
const row=(collection,name,version='n26')=>data[collection].find(r=>edition(r)===version&&r.name===name);
for(const collection of ['fighterTypes','fighterSubtypes','skills','skillTypes','equipment','weaponProfiles','territories','tactics','coreRules','weaponTraits']){
 const ids=data[collection].map(r=>r.id);assert.equal(new Set(ids).size,ids.length,collection+' IDs must be unique');
 for(const entry of data[collection]){assert(entry.id,collection+' entry has an ID');assert(['n23','n26'].includes(edition(entry)),collection+'/'+entry.id+' must identify its edition');}
}
let mirroredFields=0;
for(const[parentCollection,field,childCollection]of [['equipment','weapon_profiles','weaponProfiles'],['scenarioTables','entries','scenarioEntries'],['tacticsPacks','cards','tactics']]){
 const canonical=new Map(data[childCollection].map(entry=>[entry.id,entry]));
 for(const parent of data[parentCollection])for(const child of parent[field]||[]){
  const entry=canonical.get(child.id);if(!entry?.description)continue;
  assert.equal(edition(parent),edition(entry),parentCollection+'/'+child.id+' must not cross editions');
  for(const key of ['description','name_ko','rule_data'])if(entry[key]!==undefined){assert.deepEqual(child[key],entry[key],parentCollection+'/'+child.id+'/'+key);mirroredFields++;}
 }
}
assert(mirroredFields>=296,'Descriptions and structured conditions must remain synchronized in nested catalog choices.');
assert.equal(data.coreRules.length,105);assert.equal(data.weaponTraits.length,46);
assert.equal(row('skills','Quickening').rule_data.action,'single');
assert.equal(row('fighterSubtypes','Mounted').rule_data.gun_it_forward_only,true);
assert.equal(row('equipment','Drop rig').rule_data.descend_mounted_allowed,false);
assert.equal(row('equipment','Grapnel launcher').rule_data.grapnel_mounted_allowed,false);
assert.equal(row('equipment','Jump booster').rule_data.incompatible_with[0],'Mount');
assert.equal(row('territories','Settlement').rule_data.income_credits,15);
assert.equal(row('weaponTraits','Rapid Fire (X)').rule_data.ammo_trait_failure_extra_ammo_symbols,1);
assert.equal(data.weaponProfiles.find(p=>p.id==='e9254cce-4bfb-4e0d-bac0-89ca1ade5b7b').range_short,'4"');
assert.equal(row('equipment','Trazior heavy stubber').cost,85,'An unverified price must not silently replace the catalog.');
assert.match(row('equipment','Trazior heavy stubber').weapon_profiles[0].traits,/Rapid Fire \(3\)/);
assert.notEqual(row('skills','Dodge').id,row('skills','Dodge','n23').id,'Same-named rules from different editions retain distinct identities.');
const equipmentIds=new Set(data.equipment.map(entry=>entry.id));
for(const entry of data.effects.filter(r=>edition(r)==='n26')){const id=entry.type_specific_data?.equipment_id;if(id!=null)assert(equipmentIds.has(id),'An equipment effect must refer to a catalog item.');}
console.log('Catalog data: JSON/JS parity, unique IDs, edition boundaries, nested descriptions, numerical values, and equipment bindings passed.');
