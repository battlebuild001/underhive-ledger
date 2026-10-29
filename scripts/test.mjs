import {readdir,readFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
const allTests=(await readdir(new URL('../tests/',import.meta.url))).filter(x=>/\.(mjs|cjs)$/.test(x)).sort();
const catalog=JSON.parse(await readFile(new URL('../dist/rules-data.json',import.meta.url),'utf8'));
const awaitingOriginals=catalog.official_source_policy==='provided_official_originals_only'&&catalog.official_source_status==='awaiting_original'&&catalog.verified_source_count===0;
const suppliedOriginals=catalog.official_source_policy==='provided_official_originals_only'&&['verified','verified_partial'].includes(catalog.official_source_status)&&catalog.verified_source_count===3;
const sourceIndependent=new Set(['account-api.mjs','account-uploads.mjs','campaign-enrollment-api.mjs','local-auth-flow.mjs','local-auth.mjs','account-localization.cjs']);
const required=new Set([...sourceIndependent,...(awaitingOriginals?['official-source-policy.cjs']:suppliedOriginals?['verified-originals.cjs','official-catalog-integrity.mjs','new-gang-defaults.cjs','campaign-defaults.cjs','special-rules-defaults.cjs','campaign-data.cjs','campaign-session-data.cjs','starting-skills.cjs','recruitment-starting-choices.cjs','localization-completeness.cjs']:[])]);
const tests=awaitingOriginals||suppliedOriginals?allTests.filter(file=>required.has(file)):allTests;
for(const file of required)if(!allTests.includes(file))throw Error('Missing required test suite: '+file);
if(awaitingOriginals){
 console.log(`Official originals are unavailable. Running ${tests.length} source-independent and source-policy suites.`);
 console.log(`${allTests.length-tests.length} legacy catalog/demo fixture suites are deferred; their removed inputs are not available. Test files are retained.`);
}
if(suppliedOriginals)console.log(`Running ${tests.length} account, campaign, supplied-original integrity and production-flow suites. ${allTests.length-tests.length} legacy catalog/demo fixture suites are deferred: they assert the removed data and are retained for reference, not counted as passes.`);
for(const file of tests){console.log('\n'+file);const result=spawnSync(process.execPath,['tests/'+file],{stdio:'inherit',cwd:new URL('../',import.meta.url),env:process.env});if(result.status!==0)process.exit(result.status||1)}
console.log(`\n${tests.length} test suites passed${awaitingOriginals||suppliedOriginals?`; ${allTests.length-tests.length} legacy fixture suites deferred`:''}.`);
