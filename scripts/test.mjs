import {readdir} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
const tests=(await readdir(new URL('../tests/',import.meta.url))).filter(x=>/\.(mjs|cjs)$/.test(x)).sort();
for(const file of tests){console.log('\n'+file);const result=spawnSync(process.execPath,['tests/'+file],{stdio:'inherit',cwd:new URL('../',import.meta.url),env:process.env});if(result.status!==0)process.exit(result.status||1)}
console.log(`\n${tests.length} test suites passed.`);
