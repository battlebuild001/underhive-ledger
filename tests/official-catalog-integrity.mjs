/* Public invariants always run. Original bytes and page approvals are checked
   only in a workspace that also holds the private supplied-original audit. */
import assert from 'node:assert/strict';
import {createReadStream} from 'node:fs';
import {access, readFile, readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const publicRoot=path.join(root,'dist');
const catalog=JSON.parse(await readFile(path.join(publicRoot,'rules-data.json'),'utf8'));
const context={};
vm.runInNewContext(await readFile(path.join(publicRoot,'rules-data.js'),'utf8'),context,{filename:'rules-data.js',timeout:5000});
assert.deepEqual(JSON.parse(JSON.stringify(context.RULES_DATA)),catalog,'Public JSON and executable catalog must describe the same state');
assert.equal(catalog.official_source_policy,'provided_official_originals_only');
assert(['awaiting_original','verified_partial','verified'].includes(catalog.official_source_status));

const collections=new Map(Object.entries(catalog).filter(([,value])=>Array.isArray(value)));
const rows=[...collections].flatMap(([kind,items])=>items.map(row=>({kind,row})));
const identities=new Map([...collections].map(([kind,items])=>[kind,new Set(items.map(row=>row.id))]));
const publicRows=new Map(),globalIds=new Set();
const relationTargets={
  fighter_type_id:'fighterTypes',equipment_id:'equipment',gang_type_id:'gangTypes',
  skill_id:'skills',skill_type_id:'skillTypes',archetype_id:'archetypes',
  fighter_archetype_id:'archetypes',equipment_category_id:'equipmentCategories',
  tactics_cards_pack_id:'tacticsPacks',trading_post_id:'tradingPosts',
  gang_affiliation_id:'affiliations',gang_origin_id:'gangOrigins',
  effect_id:'effects',fighter_effect_id:'effects'
};
const privateKeys=new Set(['evidence','additional_evidence','source_sha256','source_file','source_path','pdf_page','printed_page','source_provenance','source_notes','source_part','owner_watermark','sourcewarnings','source_warnings']);
function checkPrivateKeys(value,at='catalog'){
  if(Array.isArray(value)){value.forEach((item,index)=>checkPrivateKeys(item,`${at}[${index}]`));return;}
  if(!value||typeof value!=='object')return;
  for(const [key,item]of Object.entries(value)){
    assert(!privateKeys.has(key),`Private page evidence must not be published: ${at}.${key}`);
    checkPrivateKeys(item,`${at}.${key}`);
  }
}
checkPrivateKeys(catalog);
for(const {kind,row}of rows){
  assert(row&&typeof row==='object'&&!Array.isArray(row),`${kind}: record object required`);
  assert.equal(typeof row.id,'string',`${kind}: stable identity required`);
  assert(row.id.length>0&&!globalIds.has(row.id),`Duplicate catalog identity: ${kind}:${row.id}`);
  globalIds.add(row.id);publicRows.set(`${kind}:${row.id}`,row);
  assert.equal(row.source_verified,true,`Unverified source row: ${kind}:${row.id}`);
  assert.equal(String(row.edition_slug||row.edition||'').toLowerCase(),'n26',`No supplied-original row may be labeled as another edition: ${kind}:${row.id}`);
  assert(Array.isArray(row.verified_fields)&&row.verified_fields.length,`Reviewed fields missing: ${kind}:${row.id}`);
  for(const [field,target]of Object.entries(relationTargets))if(row[field]!=null&&row[field]!==''){
    assert(identities.get(target)?.has(row[field]),`Orphan relation: ${kind}:${row.id}.${field}`);
  }
  if(kind==='equipment'){
    if(row.price_unknown){assert.notEqual(row.cost,0,`An unknown price cannot default to zero: ${row.id}`);assert.notEqual(row.purchase_available,true,`An unknown global price cannot enable standalone purchase: ${row.id}`);}
    if(row.purchase_available){assert(row.cost!==null&&row.cost!==undefined&&String(row.cost).trim()!=='',`Purchase price missing: ${row.id}`);assert(Number.isFinite(Number(row.cost))&&Number(row.cost)>=0,`Invalid purchase price: ${row.id}`);}
  }
}
if(catalog.coverage_counts)for(const [kind,items]of collections)assert.equal(catalog.coverage_counts[kind],items.length,`Stale coverage count: ${kind}`);
for(const [feature,enabled]of Object.entries(catalog.edition_coverage?.n23||{}))assert.notEqual(enabled,true,`Unsupplied N23 automatic feature must remain unavailable: ${feature}`);
if(catalog.official_source_status==='awaiting_original'){
  assert.equal(rows.length,0,'Awaiting originals cannot publish catalog facts');assert.equal(catalog.verified_source_count,0);
}else{
  assert.equal(catalog.verified_source_count,3,'This import is grounded in the three supplied originals');
  const core=suffix=>(catalog.coreRules||[]).find(row=>row.id==='n26-core-'+suffix);
  const coverage=catalog.edition_coverage?.n26||{};
  if(coverage.xp)assert(core('xp-events')?.rule_data?.events?.length,'XP cannot be enabled without its reviewed events');
  if(coverage.advancements){assert(core('xp-bands')?.rule_data?.thresholds?.length);assert(core('advancement-table')?.rule_data?.rows?.length);assert(core('advancement-caps'));}
  if(coverage.injuries)assert(catalog.injuries?.length,'Injury automation needs reviewed injury rows');
  if(coverage.recruitment)assert(catalog.fighterTypes.some(row=>row.recruitment_ready),'Recruitment needs a complete reviewed model');
  // Independent printed oracles: Core p43 Vehicles, p44 Leaders/Champions/Brutes.
  // These grants belong to every applicable model, including a manual-only profile.
  for(const fighter of catalog.fighterTypes){
    const roles=fighter.fighter_subtypes||[],required=new Set();
    if(roles.includes('Leader')||roles.includes('Champion'))required.add('Inspiring');
    if(roles.includes('Brute')||fighter.is_vehicle===true)required.add('Juggernaut');
    for(const name of required){
      const skill=catalog.skills.find(row=>row.name===name&&row.edition_slug==='n26');
      assert(skill,`Reviewed starting skill exists: ${name}`);
      assert(catalog.fighterDefaults.some(row=>row.fighter_type_id===fighter.id&&row.skill_id===skill.id),`Missing fixed starting ${name}: ${fighter.name}`);
    }
  }
}

async function walk(directory){
  const out=[];
  for(const entry of await readdir(directory,{withFileTypes:true})){
    const full=path.join(directory,entry.name);
    if(entry.isDirectory())out.push(...await walk(full));else if(entry.isFile())out.push(full);
  }
  return out;
}
const sourceIdentifier=/battletablehobby|김영주|@gmail\.com|\/workspace\/official-source-work|source-00[123]\.pdf|\[4\]00[123]\.pdf/i;
const textAssets=new Set(['.js','.css','.html','.webmanifest','.svg','.json']);
for(const file of await walk(publicRoot)){
  const relative=path.relative(publicRoot,file),extension=path.extname(file).toLowerCase();
  assert(!['.pdf','.tsv','.hocr'].includes(extension),`Raw supplied-book artifact must stay private: ${relative}`);
  assert(!/(?:^|[/\\])(?:originals|book-00[123]|priority-(?:core|trading|campaign))(?:[/\\]|$)|(?:^|[/\\])(?:page-\d{3}|p\d{4})\.(?:png|jpe?g)$/i.test(relative),`Raw page image must stay outside public assets: ${relative}`);
  if(textAssets.has(extension))assert(!sourceIdentifier.test(await readFile(file,'utf8')),`Private source identifier leaked into public asset: ${relative}`);
}

const privateRoot=path.resolve(process.env.UNDERHIVE_OFFICIAL_AUDIT_DIR||path.join(root,'../../official-source-work'));
const manifestPath=path.join(privateRoot,'source-manifest.json'),evidencePath=path.join(privateRoot,'public-row-evidence.json');
const exists=async file=>{try{await access(file);return true;}catch(error){if(error.code==='ENOENT')return false;throw error;}};
const hasManifest=await exists(manifestPath),hasEvidence=await exists(evidencePath);
if(!hasManifest&&!hasEvidence){
  console.log(`Official catalog integrity: ${rows.length} public rows passed. Private supplied-original audit is absent; original-byte and private page-approval checks were not run.`);
}else{
  assert(hasManifest&&hasEvidence,'A present private source audit must contain both manifest and public-row evidence');
  const manifest=JSON.parse(await readFile(manifestPath,'utf8')),audit=JSON.parse(await readFile(evidencePath,'utf8'));
  assert.equal(manifest.policy,'provided_official_originals_only');
  assert.equal(manifest.sources.length,catalog.verified_source_count);
  const sources=new Map(),approved=new Map();
  for(const source of manifest.sources){
    const part=String(source.part);assert(!sources.has(part),'Duplicate private source identity');
    assert.equal(source.edition,'n26');assert.equal(source.year,2026);assert(Number.isInteger(source.pages)&&source.pages>0);assert(/^[a-f0-9]{64}$/.test(source.sha256));
    const hash=createHash('sha256');for await(const chunk of createReadStream(source.path))hash.update(chunk);
    assert.equal(hash.digest('hex'),source.sha256,`Original bytes changed for supplied part ${part}`);sources.set(part,source);
  }
  assert.equal(audit.sources.length,sources.size);
  for(const source of audit.sources)assert.equal(source.sha256,sources.get(String(source.part))?.sha256,'Evidence manifest source does not match the supplied-original manifest');
  for(const item of audit.rows){
    const key=`${item.kind}:${item.id}`;assert(!approved.has(key),`Duplicate private approval: ${key}`);approved.set(key,item);
    assert(Array.isArray(item.evidence)&&item.evidence.length,`Empty private evidence: ${key}`);
    for(const entry of item.evidence){
      const source=sources.get(String(entry.part));assert(source,`Unknown supplied source part: ${key}`);
      const pages=Array.isArray(entry.pdf_page)?entry.pdf_page:[entry.pdf_page];
      assert(pages.length&&pages.every(page=>Number.isInteger(page)&&page>=1&&page<=source.pages),`Source page outside original bounds: ${key}`);
      assert(Array.isArray(entry.fields)&&entry.fields.length,`Evidence has no reviewed fields: ${key}`);
      assert(entry.visually_verified===true||/visual|image/i.test(String(entry.verification||'')),`Source image approval missing: ${key}`);
      if(entry.source_sha256)assert.equal(entry.source_sha256,source.sha256,`Page evidence source digest mismatch: ${key}`);
    }
  }
  for(const [key,row]of publicRows){
    const item=approved.get(key);assert(item,`Public row lacks a private approved source record: ${key}`);
    const fields=new Set(item.evidence.flatMap(entry=>entry.fields));
    assert(row.verified_fields.every(field=>fields.has(field)),`Public verified field has no page approval: ${key}`);
  }
  for(const rejected of audit.rejected||[])assert(!publicRows.has(`${rejected.kind}:${rejected.id}`),`Rejected source record was published: ${rejected.id}`);
  for(const unresolved of audit.unresolved||[]){const row=publicRows.get(`${unresolved.kind}:${unresolved.id}`);if(row&&unresolved.kind==='fighterTypes')assert.notEqual(row.recruitment_ready,true,`Unresolved model enabled automatic recruitment: ${unresolved.id}`);}
  console.log(`Official catalog integrity: ${rows.length} public rows, ${sources.size} original SHA-256 digests, source-page approvals, edition boundaries, identity relations and public-artifact privacy passed.`);
}
