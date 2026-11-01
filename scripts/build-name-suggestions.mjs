/* Creative name data is independent from verified rules and saved user records. */
import fs from 'node:fs';
import assert from 'node:assert/strict';
const root=new URL('../',import.meta.url),read=file=>JSON.parse(fs.readFileSync(new URL(file,root),'utf8'));
const data=Object.fromEntries(['gangs','fighters','campaigns'].map(kind=>[kind,read('data/name-suggestions/'+kind+'.json')]));
const keys=read('dist/rules-data.json').gangTypes.map(row=>row.name).sort(),normal=s=>s.normalize('NFKC').replace(/\s+/g,' ').trim().toLowerCase();
function pairs(rows,count,label){assert.equal(rows.length,count,label);for(const row of rows){assert(Array.isArray(row)&&row.length===2,label);assert(row.every(value=>typeof value==='string'&&value.trim()===value&&value.length>0&&!/[<>\r\n|\/\d]/u.test(value)),label);assert(/[가-힣]/u.test(row[0]),label);assert(/[A-Za-z]/u.test(row[1]),label);}for(let l=0;l<2;l++)assert.equal(new Set(rows.map(row=>normal(row[l]))).size,count,label+' duplicate');}
for(const [key,pool]of Object.entries({...data.gangs.factions,fallback:data.gangs.fallback})){pairs(pool.first,24,key+' gang prefixes');pairs(pool.last,24,key+' gang groups');}
pairs(data.gangs.origins,64,'Gang origins');assert.deepEqual(Object.keys(data.gangs.factions).sort(),keys);
for(const [key,pool]of Object.entries({...data.fighters.factions,fallback:data.fighters.fallback})){pairs(pool.first,32,key+' given names');pairs(pool.last,32,key+' surnames');pairs(pool.epithets,24,key+' epithets');}
assert.deepEqual(Object.keys(data.fighters.factions).sort(),keys);pairs(data.campaigns.places,128,'Campaign places');pairs(data.campaigns.events,64,'Campaign events');pairs(data.campaigns.subtitles,32,'Campaign subtitles');
// Check the longest possible generated strings without allocating all combinations.
const longest=(rows,l)=>Math.max(...rows.map(row=>row[l].length));
for(const pool of [...Object.values(data.gangs.factions),data.gangs.fallback])for(let l=0;l<2;l++)assert(longest(data.gangs.origins,l)+longest(pool.first,l)+longest(pool.last,l)+5<=79,'Gang names must fit the input');
for(const pool of [...Object.values(data.fighters.factions),data.fighters.fallback])for(let l=0;l<2;l++)assert(longest(pool.first,l)+longest(pool.last,l)+longest(pool.epithets,l)+4<=79,'Fighter names must fit the input');
for(let l=0;l<2;l++)assert(longest(data.campaigns.places,l)+longest(data.campaigns.events,l)+longest(data.campaigns.subtitles,l)+7<=110,'Campaign names must fit the input');
fs.writeFileSync(new URL('dist/name-suggestions-data.js',root),'/* Original creative suggestions. Not official rules or stored roster names. */\nglobalThis.MM_NAME_SUGGESTIONS = '+JSON.stringify(data)+';\n');
console.log('Name suggestions:17 factions;38,976 gang /26,368 fighter combinations per faction;270,336 campaign combinations.');
