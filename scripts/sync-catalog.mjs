import {readFile,writeFile} from 'node:fs/promises';

const url=new URL('../dist/rules-data.json',import.meta.url);
const data=JSON.parse(await readFile(url,'utf8'));
// This synchronizer is not an importer or a verification mechanism. Until a
// supplied-original parser exists, it may publish only the empty pending shape.
if(data.official_source_policy!=='provided_official_originals_only'||data.official_source_status!=='awaiting_original'||data.verified_source_count!==0||Object.values(data).some(value=>Array.isArray(value)&&value.length)){
 throw Error('Catalog imports are disabled. A verified parser for the supplied official originals is required before adding rule or preset data.');
}
await writeFile(new URL('../dist/rules-data.js',import.meta.url),'/* No verified official-original catalog content is currently available. */\nglobalThis.RULES_DATA = Object.freeze('+JSON.stringify(data)+');\n');
console.log('Empty official-original pending catalog synchronized; no external data was imported.');
