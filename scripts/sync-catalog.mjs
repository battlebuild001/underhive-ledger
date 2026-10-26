import {readFile,writeFile} from 'node:fs/promises';
const data=JSON.parse(await readFile(new URL('../dist/rules-data.json',import.meta.url),'utf8'));
if(data.official_source_policy!=='provided_official_originals_only')throw Error('Supplied-original source policy required');
const rows=Object.entries(data).filter(([,v])=>Array.isArray(v)).flatMap(([,v])=>v);
if(rows.length&&(!['verified_partial','verified'].includes(data.official_source_status)||!data.verified_source_count||rows.some(row=>!row.source_verified||!row.id||!Array.isArray(row.verified_fields)||!row.verified_fields.length)))throw Error('Unreviewed catalog content cannot be synchronized');
await writeFile(new URL('../dist/rules-data.js',import.meta.url),'/* Reviewed supplied-original data; capabilities are enabled separately. */\nglobalThis.RULES_DATA = '+JSON.stringify(data)+';\n');
console.log(`Synchronized ${rows.length} source-reviewed records.`);
