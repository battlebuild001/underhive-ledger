import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';

const root=new URL('../',import.meta.url),json=async path=>JSON.parse(await readFile(new URL(path,root),'utf8'));
const rules=await json('dist/rules-data.json'),english=await json('data/localization/rules-en.json'),conditions=await json('data/localization/conditions-en.json');
const context=vm.createContext({});
vm.runInContext(await readFile(new URL('dist/i18n-catalog-data.js',root),'utf8'),context);
const locale=context.UK_CATALOG_LOCALE,seen=new Set();
assert.equal(english.length,557);
for(const entry of english){
 const key=entry.collection+':'+entry.id,row=rules[entry.collection]?.find(row=>row.id===entry.id);
 assert(row?.description,'English descriptions must resolve to an existing catalog ID: '+key);
 assert(!seen.has(key),'Duplicate translation: '+key);seen.add(key);
 assert(!/[가-힣]/.test(entry.description_en),'English rule descriptions must be entirely English: '+key);
 assert.equal(locale.rulesEn[key],entry.description_en,'Bundled descriptions must reflect the reviewed translation: '+key);
 assert.equal(locale.descriptionsEn[row.description],entry.description_en,'Display lookup must use the current catalog text: '+key);
}
const koreanConditions=new Set();
function collect(value){if(typeof value==='string'&&/[가-힣]/.test(value))koreanConditions.add(value);else if(Array.isArray(value))value.forEach(collect);else if(value&&typeof value==='object')Object.values(value).forEach(collect);}
for(const rows of Object.values(rules))if(Array.isArray(rows))for(const row of rows)collect(row?.rule_data);
assert.equal(koreanConditions.size,221);
for(const condition of koreanConditions){assert(conditions[condition],'Every Korean structured condition needs English text');assert(!/[가-힣]/.test(conditions[condition]));assert.equal(locale.descriptionsEn[condition],conditions[condition]);}
for(const [name,expected] of Object.entries({'House Escher':'하우스 에셔','House Goliath':'하우스 골리앗','House Orlock':'하우스 오를록','Dodge':'닷지','Disarm':'디스암','Lasgun':'라스건','Boltgun':'볼트건','Autogun':'오토건'}))assert.equal(locale.names[name],expected,'Proper names use phonetic Korean: '+name);
assert.equal(locale.coverage.catalogNames,3606);assert.equal(Object.keys(locale.names).length,3606);
console.log('Localization data: 557 ID-bound English descriptions, 221 translated conditions, current bundle parity, phonetic names and edition-specific mappings passed.');
