import {readFile,writeFile} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

export function rowEdition(row,data){
 const direct=String(row?.edition_slug||row?.edition||'').toLowerCase();
 if(direct)return direct;
 if(row?.edition_id)return data.editions?.find(x=>x.id===row.edition_id)?.slug||'';
 for(const [key,collection] of [['equipment_id','equipment'],['fighter_type_id','fighterTypes'],['vehicle_type_id','vehicleTypes'],['scenario_table_id','scenarioTables'],['campaign_type_id','campaignTypes'],['tactics_cards_pack_id','tacticsPacks']]){
  if(row?.[key]){const parent=data[collection]?.find(x=>x.id===row[key]);if(parent)return rowEdition(parent,data);}
 }
 return '';
}

export function n23Snapshot(data){
 return Object.fromEntries(Object.entries(data).filter(([,value])=>Array.isArray(value)).map(([key,rows])=>[key,rows.filter(row=>rowEdition(row,data)==='n23')]).filter(([,rows])=>rows.length));
}

export function applyRulebookPatches(input,manifest){
 const data=structuredClone(input),changes=[];
 for(const patch of manifest.patches){
  const {collection,id,set,create}=patch;
  if(!Array.isArray(data[collection])){if(!create)throw Error('Unknown collection '+collection);data[collection]=[];}
  let row=data[collection].find(x=>x.id===id);
  if(!row){if(!create)throw Error('Unknown rule '+collection+'/'+id);row={id,edition:'n26',edition_slug:'n26'};data[collection].push(row);}
  if(rowEdition(row,data)!=='n26')throw Error('Refusing a change outside N26: '+collection+'/'+id);
  for(const [field,value] of Object.entries(set)){
   if(['id','edition','edition_slug','edition_id'].includes(field))throw Error('Identity fields cannot be patched: '+field);
   if(JSON.stringify(row[field])!==JSON.stringify(value))changes.push({collection,id,field,before:row[field]??null,after:value});
   row[field]=structuredClone(value);
  }
 }
 for(const cleanup of manifest.sanitizations||[]){
  const row=data[cleanup.collection]?.find(x=>x.id===cleanup.id);
  if(!row||rowEdition(row,data)!=='n26'||row.category!=='rig-glitches')throw Error('Unexpected sentinel cleanup scope');
  if(row.type_specific_data?.equipment_id!==cleanup.before&&row.type_specific_data?.equipment_id!==null)throw Error('Sentinel cleanup must not replace an equipment binding');
  if(row.type_specific_data.equipment_id!==null)changes.push({collection:cleanup.collection,id:cleanup.id,field:'type_specific_data.equipment_id',before:row.type_specific_data.equipment_id,after:null});
  row.type_specific_data.equipment_id=null;
 }
 const sourceById=new Map(manifest.sources.map(x=>[x.id,x]));
 for(const patch of manifest.patches){
  const row=data[patch.collection].find(x=>x.id===patch.id);
  const sourceIds=patch.source_ids||['provided-skirmish-translation',...(row.source_refs?.some(x=>/official-faq-2026-09|september2026/.test(x))?['official-faq-2026-09']:[])];
  if(sourceIds.some(id=>!sourceById.has(id)))throw Error('Unknown provenance source');
  row.rule_provenance={edition:'n26',source_ids:sourceIds,source_refs:[...(row.source_refs||[])],verified_at:manifest.verified_at};
 }
 // Catalog rows repeat in the original API response. Keep each exact-ID mirror current.
 for(const [parentCollection,field,childCollection] of [['equipment','weapon_profiles','weaponProfiles'],['scenarioTables','entries','scenarioEntries'],['tacticsPacks','cards','tactics']]){
  const lookup=new Map(data[childCollection].map(x=>[x.id,x]));
  const patched=new Map(manifest.patches.filter(x=>x.collection===childCollection).map(x=>[x.id,x]));
  for(const parent of data[parentCollection])for(const child of parent[field]||[]){
   const patch=patched.get(child.id),canonical=lookup.get(child.id);if(!patch)continue;
   if(rowEdition(parent,data)!=='n26')throw Error('Cross-edition mirror '+child.id);
   Object.assign(child,structuredClone(patch.set),{rule_provenance:structuredClone(canonical.rule_provenance)});
  }
 }
 data.ruleSources=structuredClone(manifest.sources);
 data.ruleAudit=structuredClone(manifest.summary);
 data.scope='Catalog names, numerical characteristics and relationships; source-checked N26 rule summaries and structured reference data. No account records.';
 return {data,changes};
}

if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
 const input=JSON.parse(await readFile(resolve(root,'dist/rules-data.json'),'utf8'));
 const manifest=JSON.parse(await readFile(resolve(root,'data/rulebook-enrichment.json'),'utf8'));
 const {data,changes}=applyRulebookPatches(input,manifest);
 await writeFile(resolve(root,'dist/rules-data.json'),JSON.stringify(data));
 await writeFile(resolve(root,'dist/rules-data.js'),'/* Catalog facts and source-checked, edition-specific rule references. */\nglobalThis.RULES_DATA = Object.freeze('+JSON.stringify(data)+');\n');
 console.log('Applied '+manifest.patches.length+' N26 rule records; '+changes.length+' changed fields.');
}
