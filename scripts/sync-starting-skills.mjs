/* Private original validation precedes every incremental starting-grant sync. */
import assert from 'node:assert/strict';
import {createReadStream} from 'node:fs';
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {deriveStartingSkillData} from './starting-skills-data.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const manifestPath=process.argv[2];
assert(manifestPath,'Usage: node scripts/sync-starting-skills.mjs PRIVATE_MANIFEST');
const manifest=JSON.parse(await readFile(manifestPath,'utf8'));
assert.equal(manifest.policy,'provided_official_originals_only');assert.equal(manifest.sources?.length,3);
for(const source of manifest.sources){
  assert(/^[a-f0-9]{64}$/.test(source.sha256));
  const digest=createHash('sha256');for await(const chunk of createReadStream(source.path))digest.update(chunk);
  assert.equal(digest.digest('hex'),source.sha256,'Supplied-original bytes changed');
}
const evidencePath=path.join(path.dirname(path.resolve(manifestPath)),'public-row-evidence.json');
const input=JSON.parse(await readFile(path.join(root,'dist/rules-data.json'),'utf8'));
const evidence=JSON.parse(await readFile(evidencePath,'utf8'));
const {catalog,audit,summary}=deriveStartingSkillData(input,evidence,manifest);
assert.equal(summary.unresolved.length,0,'Starting grant identity requires manual review: '+JSON.stringify(summary.unresolved));
await writeFile(evidencePath,JSON.stringify(audit,null,2)+'\n');
await writeFile(path.join(root,'dist/rules-data.json'),JSON.stringify(catalog)+'\n');
await writeFile(path.join(root,'dist/rules-data.js'),'/* Facts reviewed against supplied originals; unsupported features remain manual. */\nglobalThis.RULES_DATA = '+JSON.stringify(catalog)+';\n');
console.log(JSON.stringify({...summary,fighterDefaults:catalog.fighterDefaults.length}));
