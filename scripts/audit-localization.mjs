/* Read-only inventory of public catalogue labels and display dictionaries. */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const data=JSON.parse(fs.readFileSync(path.join(root,'dist/rules-data.json'),'utf8'));
const context={};context.window=context;context.globalThis=context;vm.createContext(context);
for(const file of ['i18n-ui-data.js','i18n-catalog-data.js','i18n-terms-data.js']){
 vm.runInContext(fs.readFileSync(path.join(root,'dist',file),'utf8'),context,{filename:file,timeout:1000});
}
const terms=context.UK_I18N_TERMS||{},oldNames=context.UK_CATALOG_LOCALE?.names||{},ui={...(context.UK_UI_STRINGS?.enToKo||{}),...(terms.enToKo||{})};
const names={...oldNames},approved=new Map(),placeholders=[];
const allowed=new Set(terms.allowedTokens||[]),latin=value=>(String(value).match(/[A-Za-z]+(?:\d+[A-Za-z]*)?/g)||[]).filter(token=>!allowed.has(token));
const fields=['equipment_category','category','category_group','source_category_group','skillSet','skill_type','skill_type_name','skill_set_name','fighter_subtypes','model_type','fighter_variant','equipment_type','table_type','gang_type','alliance_type','access_level','printed_access_level'];
const classifications=new Map(),allRows=[];
for(const [kind,rows]of Object.entries(data)){
 if(!Array.isArray(rows))continue;
 for(const row of rows){
  allRows.push({kind,row});
  if(row.name&&row.name_ko){
   if(row.name_ko===row.name&&/[A-Za-z]/.test(row.name))placeholders.push({kind,id:row.id,name:row.name});
   else{names[row.name]=row.name_ko;if(!approved.has(row.name))approved.set(row.name,new Set());approved.get(row.name).add(row.name_ko);}
  }
  for(const field of fields){
   const value=row[field],values=Array.isArray(value)?value:typeof value==='string'?[value]:[];
   for(const text of values){if(typeof text!=='string'||!text.trim())continue;if(!classifications.has(text))classifications.set(text,new Set());classifications.get(text).add(kind+'.'+field);}
  }
 }
}
Object.assign(names,terms.names||{});
const folded=new Map(Object.entries(names).map(([key,value])=>[key.toLowerCase(),value]));
const mapped=text=>names[text]||ui[text]||folded.get(text.toLowerCase())||'';
const classificationMissing=[...classifications].filter(([en])=>/[A-Za-z]/.test(en)&&!allowed.has(en)&&(!mapped(en)||mapped(en)===en)).map(([en,locations])=>({en,locations:[...locations]}));
const equipmentCategories=[...new Set((data.equipment||[]).map(row=>row.equipment_category).filter(Boolean))];
const allEquipmentCategories=[...new Set(allRows.map(({row})=>row.equipment_category).filter(Boolean))];
const unmappedCategories=allEquipmentCategories.filter(en=>!mapped(en)||mapped(en)===en);
const untranslatedNames=allRows.filter(({row})=>row.name&&row.name_ko&&latin(mapped(row.name)||row.name_ko).length).map(({kind,row})=>({kind,id:row.id,name:row.name,display:mapped(row.name)||row.name_ko}));
const conflictingApprovedNames=[...approved].filter(([,values])=>values.size>1).map(([en,values])=>({en,spellings:[...values]}));
const introducedApprovedNameConflicts=allRows.filter(({row})=>terms.names?.[row.name]&&row.name_ko&&row.name_ko!==row.name&&terms.names[row.name]!==row.name_ko).map(({kind,row})=>({kind,id:row.id,name:row.name,approved:row.name_ko,supplement:terms.names[row.name]}));
const oldMapNameGaps=allRows.filter(({row})=>row.name&&row.name_ko&&!oldNames[row.name]).map(({kind,row})=>({kind,id:row.id,name:row.name}));
const report={
 counts:{equipmentCategories:equipmentCategories.length,allEquipmentCategoryFields:allEquipmentCategories.length,classificationTerms:classifications.size,supplementalNames:Object.keys(terms.names||{}).length,supplementalUI:Object.keys(terms.enToKo||{}).length,supplementalPatterns:(terms.patterns||[]).length,oldMapNameGaps:oldMapNameGaps.length,unmappedCategories:unmappedCategories.length,unmappedClassificationTerms:classificationMissing.length,unexpectedLatinNameRows:untranslatedNames.length,placeholderNameRows:placeholders.length,conflictingApprovedNames:conflictingApprovedNames.length,introducedApprovedNameConflicts:introducedApprovedNameConflicts.length},
 unmappedCategories,classificationMissing,untranslatedNames,placeholders,conflictingApprovedNames,introducedApprovedNameConflicts,oldMapNameGaps,
 allowedTechnicalTokens:[...allowed],
 scope:'Public catalogue names/classification labels only. Saved user records, form values, descriptions and rule prose are not treated as untranslated UI.',
 notes:['Conflicting approved spellings require entity context; the audit does not rewrite them.','English placeholders are ignored when a current approved Korean name or supplemental display term exists.','The literal Delete confirmation value, usernames and account IDs are intentionally outside this catalogue audit.']
};
process.stdout.write(JSON.stringify(report,null,2)+'\n');
if(unmappedCategories.length||classificationMissing.length||untranslatedNames.length||introducedApprovedNameConflicts.length)process.exitCode=1;
