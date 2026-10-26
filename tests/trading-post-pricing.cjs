const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),{JSDOM}=require('jsdom');
const root=path.resolve(__dirname,'../dist'),dom=new JSDOM('<div id="app"></div><input id="import-file" type="file">',{url:'https://manager.test/',runScripts:'outside-only',pretendToBeVisual:true}),w=dom.window,context=dom.getInternalVMContext();
w.structuredClone=structuredClone;w.alert=message=>{throw Error(message)};w.HTMLElement.prototype.scrollIntoView=function(){};
for(const match of fs.readFileSync(path.join(root,'index.html'),'utf8').matchAll(/<script src="\/([^"?]+)[^"]*"/g)){if(match[1]==='account-parity.js')continue;vm.runInContext(fs.readFileSync(path.join(root,match[1]),'utf8'),context,{filename:match[1]});}
try{
 vm.runInContext('data.edition="N23";ensureAssets()',context);
 const item=w.RULES_DATA.equipment.find(row=>row.name==='Stub gun'&&row.edition_slug==='n26');assert(item);
 const before=vm.runInContext('JSON.stringify(data)',context),g={edition:'N26',subtypeIds:['sub-a','sub-b'],alignment:'Outlaw'},f={fighterTypeId:'fighter-target'};
 const entry={id:'post-entry-not-equipment-id',equipmentId:item.id,cost_override:25,availability_override:'R9',costRules:[{fighter_type_id:'fighter-target',adjusted_cost:15},{fighter_type_id:'fighter-target',gang_subtype_id:'sub-b',adjusted_cost:10}],availabilityRules:[{gang_subtype_id:'sub-b',availability:'C'}]},post={equipmentItems:[entry]};
 let effective=w.ApAssets.effectivePostItem(post,item.id,g,f);
 assert.equal(effective.id,item.id,'A post entry cannot replace the canonical equipment ID');assert.equal(effective.name,item.name);assert.equal(effective.cost,10,'Real fighter ID and multiple gang subtype IDs select the matching cost rule');assert.equal(effective.availability,'C');
 effective=w.ApAssets.effectivePostItem(post,item.id,{edition:'N26',subtypeIds:['sub-a']},{catalogTypeId:'fighter-target'});assert.equal(effective.cost,15,'Catalog-type identity aliases apply conditional prices');assert.equal(effective.availability,'R9');
 effective=w.ApAssets.effectivePostItem({equipmentItems:[]},item.id,g,f);assert.equal(effective.cost,item.cost,'N26 pricing uses the gang edition while the assets page still selects N23');
 assert.equal(w.ApAssets.effectivePostItem(post,item.id,{edition:'N23'},f),null,'A post cannot resolve equipment from another edition');
 assert.equal(w.ApAssets.effectivePostItem({equipmentItems:[{...entry,banned:true}]},item.id,g,f).banned,true);
 assert.equal(vm.runInContext('JSON.stringify(data)',context),before,'Resolving prices never changes records or the selected assets edition');
 console.log('Trading post pricing: gang edition, canonical equipment IDs, fighter identities, multiple subtypes, overrides, bans and read-only resolution passed.');
}finally{dom.window.close()}
