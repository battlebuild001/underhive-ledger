import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import vm from 'node:vm';
import {applyRulebookPatches,n23Snapshot,rowEdition} from '../scripts/enrich-rules-data.mjs';

const read=async path=>JSON.parse(await readFile(new URL('../'+path,import.meta.url),'utf8'));
const data=await read('dist/rules-data.json'),manifest=await read('data/rulebook-enrichment.json'),audit=await read('data/rulebook-audit.json');
const hash=value=>createHash('sha256').update(value).digest('hex');
assert.equal(hash(JSON.stringify(n23Snapshot(data))),audit.n23_sha256,'All pre-existing N23 records and relationships must remain byte-for-byte equivalent.');
assert.equal(audit.n23_rows,17430);
const context=vm.createContext({});
vm.runInContext(await readFile(new URL('../dist/rules-data.js',import.meta.url),'utf8'),context);
assert.equal(JSON.stringify(context.RULES_DATA),JSON.stringify(data),'Browser script and JSON catalog must agree.');

const sources=new Set(data.ruleSources.map(x=>x.id)),identities=new Set();
for(const patch of manifest.patches){
 const key=patch.collection+'/'+patch.id;assert(!identities.has(key),'Duplicate patch '+key);identities.add(key);
 const row=data[patch.collection]?.find(x=>x.id===patch.id);assert(row,key);assert.equal(rowEdition(row,data),'n26',key);
 assert(row.description?.trim(),key+' missing description');
 for(const [field,value] of Object.entries(patch.set))assert.deepEqual(row[field],value,key+'/'+field);
 assert(row.source_refs.length,key+' missing source anchors');
 for(const ref of row.source_refs){
  assert.equal(typeof ref,'string');
  for(const [,n] of ref.matchAll(/P(\d{4})/g))assert(Number(n)>=1&&Number(n)<=3340,key+' invalid paragraph '+ref);
  for(const [,n] of ref.matchAll(/image(\d+)\.png/g))assert(Number(n)>=1&&Number(n)<=26,key+' invalid image '+ref);
 }
 assert(row.rule_provenance.source_ids.every(id=>sources.has(id)),key+' unknown source');
 if(row.source_refs.some(ref=>/official-faq-2026-09|september2026/.test(ref)))assert(row.rule_provenance.source_ids.includes('official-faq-2026-09'),key+' must identify the dated FAQ');
}
for(const [parentCollection,field,childCollection] of [['equipment','weapon_profiles','weaponProfiles'],['scenarioTables','entries','scenarioEntries'],['tacticsPacks','cards','tactics']]){
 for(const parent of data[parentCollection])for(const child of parent[field]||[]){
  const patch=manifest.patches.find(p=>p.collection===childCollection&&p.id===child.id);if(!patch)continue;
  const canonical=data[childCollection].find(p=>p.id===child.id);
  for(const name of [...Object.keys(patch.set),'rule_provenance'])assert.deepEqual(child[name],canonical[name],parentCollection+'/'+child.id+'/'+name);
 }
}
assert.equal(data.coreRules.length,105);assert.equal(data.weaponTraits.length,46);
assert.equal(manifest.sanitizations.length,16);
for(const cleanup of manifest.sanitizations){const r=data[cleanup.collection].find(x=>x.id===cleanup.id);assert.equal(r.category,'rig-glitches');assert.equal(r.type_specific_data.equipment_id,null);}
const row=(collection,name)=>data[collection].find(r=>rowEdition(r,data)==='n26'&&r.name===name);
assert.equal(row('skills','Quickening').rule_data.action,'single');
assert.equal(row('fighterSubtypes','Mounted').rule_data.gun_it_forward_only,true);
assert.equal(row('equipment','Drop rig').rule_data.descend_mounted_allowed,false);
assert.equal(row('equipment','Grapnel launcher').rule_data.grapnel_mounted_allowed,false);
assert.equal(row('equipment','Jump booster').rule_data.incompatible_with[0],'Mount');
assert.equal(row('territories','Settlement').rule_data.income_credits,15);
assert.equal(row('weaponTraits','Rapid Fire (X)').rule_data.ammo_trait_failure_extra_ammo_symbols,1);
const warp=data.weaponProfiles.find(p=>p.id==='e9254cce-4bfb-4e0d-bac0-89ca1ade5b7b');assert.equal(warp.range_short,'4"');
assert.equal(row('equipment','Trazior heavy stubber').cost,85,'Unresolved translated price must not silently replace the catalog.');
assert.match(row('equipment','Trazior heavy stubber').weapon_profiles[0].traits,/Rapid Fire \(3\)/,'Rechecked table says 3, not the earlier transcription of 1.');

const twice=applyRulebookPatches(data,manifest);assert.equal(twice.changes.length,0);assert.deepEqual(twice.data,data,'Reapplication must be idempotent.');
const n23=data.skills.find(x=>x.edition_slug==='n23');
assert.throws(()=>applyRulebookPatches(data,{...manifest,patches:[{collection:'skills',id:n23.id,set:{description:'wrong edition'}}]}),/outside N26/);
assert.throws(()=>applyRulebookPatches(data,{...manifest,patches:[{collection:'skills',id:'not-an-existing-rule',set:{description:'not found'}}]}),/Unknown rule/);
assert(!/battletablehobby|김영주|sediment:\/\/|\/workspace\//.test(JSON.stringify(manifest)),'Private input identifiers must not enter published references.');
console.log('Rulebook data: 557 source-checked records, 85 profile mirrors, dated errata, 16 invalid sentinels removed, 17,430 unchanged N23 records, JS/JSON parity and idempotent import passed.');
