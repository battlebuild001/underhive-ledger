import {readFile,writeFile} from 'node:fs/promises';

const url=new URL('../dist/rules-data.json',import.meta.url);
const data=JSON.parse(await readFile(url,'utf8'));
await writeFile(new URL('../dist/rules-data.js',import.meta.url),'/* Edition-specific catalog data. */\nglobalThis.RULES_DATA = Object.freeze('+JSON.stringify(data)+');\n');
console.log('Catalog browser data synchronized.');
