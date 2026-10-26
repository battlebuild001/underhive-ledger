/* Import reviewed facts from the three supplied originals.
   PDFs, owner marks and page evidence remain in the private extraction directory. */
import {readFile, writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';

const [manifestPath, ...shardPaths] = process.argv.slice(2);
if (!manifestPath || !shardPaths.length) throw Error('Usage: import-official-catalog.mjs PRIVATE_MANIFEST REVIEWED_SHARD...');
const root = new URL('../', import.meta.url);
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
if (manifest.policy !== 'provided_official_originals_only' || !manifest.sources?.length) throw Error('Supplied-original manifest required');
const sources = new Map();
for (const source of manifest.sources) {
  if (source.edition !== 'n26' || source.year !== 2026 || !source.pages || !source.path || !source.sha256) throw Error('Incomplete source identity');
  const digest = createHash('sha256').update(await readFile(source.path)).digest('hex');
  if (digest !== source.sha256) throw Error('Original source digest changed');
  sources.set(String(source.part), source);
}
// An independent image review can upgrade only the exact rows that were actually reviewed.
const reviews=new Map(),reviewDir=path.join(path.dirname(path.resolve(manifestPath)),'book-003');
const stable=value=>JSON.stringify(value&&typeof value==='object'?Array.isArray(value)?value.map(item=>JSON.parse(stable(item))):Object.fromEntries(Object.keys(value).sort().map(key=>[key,JSON.parse(stable(value[key]))])):value??null);
try{
  const proof=JSON.parse(await readFile(path.join(reviewDir,'image-verification-review.json'),'utf8'));
  const targetBytes=await readFile(path.join(reviewDir,'core-full.json'));
  if(createHash('sha256').update(targetBytes).digest('hex')!==proof.reviewed_file_sha256)throw Error('Independent image review target changed');
  const target=JSON.parse(targetBytes).collections;
  if(proof.uncertain?.length)throw Error('Independent review contains unresolved rows');
  for(const approval of proof.approved || []){
    const row=target[approval.kind]?.find(row=>row.id===approval.id);
    if(!row||!approval.fields?.length||!approval.pdf_pages?.length||!/image/i.test(approval.verification||''))throw Error('Incomplete independent image review');
    reviews.set(approval.kind+':'+approval.id,{approval,target:row,corrections:(proof.corrections||[]).filter(change=>change.kind===approval.kind&&change.id===approval.id)});
  }
}catch(error){if(error.code!=='ENOENT')throw error;}
const previous = JSON.parse(await readFile(new URL('dist/rules-data.json', root), 'utf8'));
const keys = Object.keys(previous).filter(key => Array.isArray(previous[key]));
const indexes = new Map(keys.map(key => [key, new Map()]));
const audit = new Map(), rejected = [], unresolved = [], remap = new Map();
const norm = value => String(value ?? '').normalize('NFKC').replace(/[’‘]/g,"'").replace(/[–—]/g,'-').replace(/\s+/g,' ').trim().toLowerCase();
const context = value => norm(value).replace(/^house /, '');
const identityName = value => norm(value).replace(/\*/g,'').trim();
const slug = value => norm(value).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const finiteCost = value => value !== null && value !== undefined && String(value).trim() !== '' && Number.isFinite(Number(value)) && Number(value) >= 0;
const privateKeys = new Set(['evidence','source_sha256','source_file','source_path','pdf_page','printed_page','source_provenance','source_notes','source_part','owner_watermark','sourcewarnings','source_warnings','additional_evidence']);
const prune = value => Array.isArray(value) ? value.map(prune) : value && typeof value === 'object' ? Object.fromEntries(Object.entries(value).filter(([key]) => !privateKeys.has(key)).map(([key,item]) => [key,prune(item)])) : value;
const validEvidence = raw => (Array.isArray(raw) ? raw : [raw]).filter(Boolean).filter(item => {
  const source = sources.get(String(item.part)), pages = Array.isArray(item.pdf_page) ? item.pdf_page : [item.pdf_page];
  return source && pages.length && pages.every(page => Number.isInteger(page) && page >= 1 && page <= source.pages) && Array.isArray(item.fields) && item.fields.length && (item.visually_verified === true || /visual|image/i.test(String(item.verification || '')));
});
const evidenceFor = row => audit.get(row.id)?.evidence || [];
const putDerived = (kind, row, evidence, note) => {
  row.edition = row.edition_slug = 'n26'; row.source_verified = true;
  row.verified_fields = [...new Set(evidence.flatMap(item => item.fields))];
  row.verification_method='original_page_image_review';
  indexes.get(kind).set(row.id, row);
  audit.set(row.id, {kind,id:row.id,evidence,derivation:note});
  return row;
};
for (const shardPath of shardPaths) {
  const shard = JSON.parse(await readFile(shardPath, 'utf8'));
  for (const [kind, rows] of Object.entries(shard.collections || shard)) {
    if (!indexes.has(kind) || !Array.isArray(rows)) continue;
    for (const input of rows) {
      let reviewedInput=input,rawEvidence=input.evidence || shard.evidence?.[input.id];
      const review=reviews.get(kind+':'+input.id);
      if(review){
        if(review.approval.fields.some(field=>stable(input[field])!==stable(review.target[field])))throw Error('Independently reviewed row changed: '+input.id);
        reviewedInput={...input};for(const correction of review.corrections)if(correction.type==='description_source_discrepancy_presentation')for(const [field,value]of Object.entries(correction.proposed || {})){if(!review.approval.fields.includes(field))throw Error('Unreviewed correction field');reviewedInput[field]=value;}
        rawEvidence={part:'003',pdf_page:review.approval.pdf_pages,printed_page:review.approval.printed_pages,fields:review.approval.fields,verification:review.approval.verification,notes:review.approval.notes};
      }
      const evidence = validEvidence([...(Array.isArray(rawEvidence)?rawEvidence:[rawEvidence]),...(Array.isArray(input.additional_evidence)?input.additional_evidence:input.additional_evidence?[input.additional_evidence]:[])]);
      if (!input.id || !evidence.length || input.review_status === 'uncertain' || input.source_verified === false) {
        rejected.push({kind,id:input.id || null,reason:'Original image verification missing or uncertain'}); continue;
      }
      const row = prune(reviewedInput);
      row.name ??= row.equipment_name || row.fighter_type || row.gang_type || row.skill_name || row.effect_name || row.id;
      if (kind === 'equipment') row.equipment_name ??= row.name;
      if (kind === 'fighterTypes') row.fighter_type ??= row.name;
      if (kind === 'gangTypes') row.gang_type ??= row.name;
      putDerived(kind,row,evidence,'Reviewed source record');
    }
  }
}
// Small independent bundle overlay supplies only exact component/profile facts, never a guessed tier.
try{
  const bundleDir=path.join(path.dirname(path.resolve(manifestPath)),'book-002'),proof=JSON.parse(await readFile(path.join(bundleDir,'bundle-verification-review.json'),'utf8'));
  const bytes=await readFile(path.join(bundleDir,'equipment.json'));
  if(createHash('sha256').update(bytes).digest('hex')!==proof.reviewed_equipment_sha256)throw Error('Bundle review target changed');
  for(const reviewed of proof.rows || []){
    const item=indexes.get('equipment').get(reviewed.equipment_id),evidence=validEvidence(reviewed.evidence);
    if(!item||!evidence.length||!reviewed.profile_refs?.length||reviewed.profile_refs.some(id=>!indexes.get('weaponProfiles').has(id)))throw Error('Bundle image review is incomplete');
    item.profile_refs=[...reviewed.profile_refs];item.included_equipment_names=[...(reviewed.included_equipment_names||[])];
    putDerived('equipment',item,[...evidenceFor(item),...evidence],'Exact printed bundle components and base weapon profiles independently image-reviewed');
  }
}catch(error){if(error.code!=='ENOENT')throw error;}
// Apply the exact source002 baseline whitelist and direct image corrections, keeping required choices explicit.
try{
  const reviewDir=path.join(path.dirname(path.resolve(manifestPath)),'book-002'),review=JSON.parse(await readFile(path.join(reviewDir,'recruitment-base-review.json'),'utf8'));
  const bytes=await readFile(path.join(reviewDir,'extracted.json'));
  if(createHash('sha256').update(bytes).digest('hex')!==review.reviewed_frozen_shard_sha256||review.reviewed_original_source_sha256!==sources.get('002')?.sha256)throw Error('Recruitment image review target changed');
  for(const correction of review.source_corrections || []){
    const evidence=validEvidence({part:'002',pdf_page:correction.pdf_pages||correction.pdf_page,printed_page:correction.pdf_pages||correction.printed_page,fields:(correction.changes||[]).map(change=>change.field).concat(correction.automatic_starting_grant?['starting_equipment','counts_towards_weapon_limit']:[]),verification:correction.verification});
    if(!evidence.length)throw Error('Recruitment correction lacks original image review');
    for(const change of correction.changes || []){const row=indexes.get(change.collection)?.get(change.id);if(!row||stable(row[change.field])!==stable(change.before))throw Error('Recruitment correction target changed');row[change.field]=change.after;putDerived(change.collection,row,[...evidenceFor(row),...evidence],'Direct original-image transcription correction');}
    if(correction.automatic_starting_grant){const fighter=indexes.get('fighterTypes').get(correction.id);if(!fighter)throw Error('Intrinsic-grant actor missing');fighter.starting_equipment??=[];if(!fighter.starting_equipment.some(item=>norm(typeof item==='string'?item:item.name)===norm(correction.automatic_starting_grant)))fighter.starting_equipment.push({name:correction.automatic_starting_grant,included_in_cost:true,counts_towards_weapon_limit:correction.counts_towards_weapon_limit});fighter.recruitment_manual=false;delete fighter.recruitment_manual_reason;putDerived('fighterTypes',fighter,[...evidenceFor(fighter),...evidence],'Always-armed intrinsic source grant; no new price or profile inferred');}
  }
  for(const approval of review.approved || []){
    const fighter=indexes.get('fighterTypes').get(approval.id),evidence=validEvidence(approval.evidence);
    if(!fighter||!evidence.length||Number(fighter.total_cost??fighter.cost)!==approval.base_cost||fighter.starting_xp!==approval.starting_xp)throw Error('Base recruitment approval changed');
    fighter.recruitment_manual=false;delete fighter.recruitment_manual_reason;fighter.recruitment_baseline='Printed base model; no optional upgrades selected';
    putDerived('fighterTypes',fighter,[...evidenceFor(fighter),...evidence],'Exact reviewed baseline recruitment whitelist');
  }
  for(const entry of review.manual || []){
    const fighter=indexes.get('fighterTypes').get(entry.id),evidence=validEvidence(entry.evidence);if(!fighter||!evidence.length)throw Error('Incomplete conditional recruitment review');
    if(entry.baseline_loadout_legal_without_optional_purchase===true&&entry.mandatory_choices?.length===1&&entry.mandatory_choices[0]==='Specialisation and corresponding free skill'&&(fighter.fighter_subtypes||[]).includes('Specialist')){
      fighter.recruitment_manual=false;delete fighter.recruitment_manual_reason;fighter.recruitment_requirements=['source_specialisation',...(String(fighter.gang_type).toLowerCase()==='outcasts'?['leader_archetype']:[])];
      putDerived('fighterTypes',fighter,[...evidenceFor(fighter),...evidence],'Reviewed base with mandatory role/free-skill choice enforced in the recruitment form');
    }else if(entry.baseline_loadout_legal_without_optional_purchase===true&&!entry.mandatory_choices?.length&&(review.source_corrections||[]).some(correction=>correction.id===entry.id&&correction.changes?.some(change=>change.collection==='fighterTypes'&&change.field==='default_skills'))){
      fighter.recruitment_manual=false;delete fighter.recruitment_manual_reason;putDerived('fighterTypes',fighter,[...evidenceFor(fighter),...evidence],'Exact baseline enabled after its direct source transcription correction');
    }
  }
}catch(error){if(error.code!=='ENOENT')throw error;}
const rows = kind => [...indexes.get(kind).values()];
const byName = (kind, name) => rows(kind).filter(row => [row.name,...(row.aliases || [])].some(candidate => identityName(candidate) === identityName(name)));
const scoped = (kind,name,gang,part) => {
  let candidates = byName(kind,name);if(part){const sameSource=candidates.filter(row=>evidenceFor(row).some(e=>String(e.part)===String(part)));if(sameSource.length)candidates=sameSource;}const same = candidates.filter(row => context(row.gang_name || row.gang_type || row.profile_context || row.owner_context || row.profile_scope) === context(gang));
  if (same.length === 1) return same[0];
  const general = candidates.filter(row => !row.gang_name && !row.gang_type && !row.profile_context && !row.owner_context && !row.profile_scope);
  return same.length ? null : general.length === 1 ? general[0] : !gang && candidates.length === 1 ? candidates[0] : null;
};
const remapped = id => {const visited=new Set();while(remap.has(id)&&!visited.has(id)){visited.add(id);id=remap.get(id);}return id;};
const profileIndex = indexes.get('weaponProfiles');
const profileSignature = profile => JSON.stringify(['range_short','range_long','strength','ap','lethality','traits'].map(key => Array.isArray(profile[key])?profile[key].map(norm).sort():profile[key]==null?null:norm(profile[key])));
// Explicit profile bundles take precedence. No broad equipment-name matching joins two contexts.
for (const item of rows('equipment')) {
  const explicit = item.profile_refs?.map(id => profileIndex.get(id)).filter(Boolean);
  if (explicit?.length) item.weapon_profiles = explicit.map(prune);
  else if (!item.weapon_profiles?.length && !item.weaponProfiles?.length) {
    const attached = rows('weaponProfiles').filter(profile => profile.equipment_id === item.id);
    if (attached.length) item.weapon_profiles = attached.map(prune);
  }
}
// A shared name can describe different natural weapons. Keep conflicting scope variants separate.
for (const item of rows('equipment')) {
  const attached=item.weapon_profiles || item.weaponProfiles || [], groups=new Map();
  for(const profile of attached){const scope=profile.profile_context || profile.profile_scope || profile.owner_context || '';if(!groups.has(scope))groups.set(scope,[]);groups.get(scope).push(profile);}
  const setSignature=profiles=>JSON.stringify(profiles.map(profile=>norm(profile.profile_name || profile.name)+'|'+profileSignature(profile)).sort());
  if(groups.size>1&&new Set([...groups.values()].map(setSignature)).size>1){
    item.profile_scope_unresolved=true;item.weapon_profiles=[];item.profile_variants=[];
    for(const [scope,profiles]of groups){const clone={...item,id:item.id+'--scope-'+slug(scope),owner_context:scope,profile_scope_unresolved:false,profile_variants:undefined,weapon_profiles:profiles};item.profile_variants.push({owner_context:scope,equipment_id:clone.id});putDerived('equipment',clone,[...evidenceFor(item),...profiles.flatMap(evidenceFor)],'Distinct profile variant retained in its printed owner context');}
  }else if(attached.length){item.profile_contexts=[...groups.keys()].filter(Boolean);item.weapon_profiles=[...new Map(attached.map(profile=>[norm(profile.profile_name || profile.name)+'|'+profileSignature(profile),profile])).values()];}
}
// Exact shared list items may use the unique core market identity. Conflicting profiles stay separate.
const markets = rows('equipment').filter(item => evidenceFor(item).some(e => String(e.part) === '003') && item.trading_post_available === true);
for (const item of rows('equipment')) {
  if (markets.includes(item)) continue;
  const candidates = markets.filter(market => norm(market.name) === norm(item.name));
  if (candidates.length !== 1 || item.owner_context || item.profile_context) continue;
  const market = candidates[0], a = item.weapon_profiles || item.weaponProfiles || [], b = market.weapon_profiles || market.weaponProfiles || [];
  if (a.length && (a.length !== b.length || a.some((profile,i) => profileSignature(profile) !== profileSignature(b[i])))) continue;
  for (const key of ['description','description_en','rule_data','category_group','starred']) if (market[key] == null && item[key] != null) market[key] = item[key];
  market.aliases = [...new Set([...(market.aliases || []),...(item.aliases || [])])];
  const allEvidence = [...evidenceFor(market),...evidenceFor(item)];
  putDerived('equipment',market,allEvidence,'Exact shared identity; market price retained only from the core market');
  remap.set(item.id,market.id); indexes.get('equipment').delete(item.id);
}
// Resolve explicitly named ammunition bundles and role-qualified common weapons to their core profiles.
// This supplies profiles only: list prices and ownership remain scoped to the original item.
for (const item of rows('equipment')) {
  if (item.weapon_profiles?.length || item.weaponProfiles?.length || item.profile_scope_unresolved) continue;
  const named = String(item.name).replace(/\s*\([^)]* only\)\s*$/i,'');
  const bundle = named.match(/^(.*?) with (.+)$/i), baseName = bundle ? bundle[1] : named;
  const candidates = markets.filter(market => identityName(market.name) === identityName(baseName));
  if (candidates.length !== 1) continue;
  const market = candidates[0], profiles = market.weapon_profiles || market.weaponProfiles || [];
  let selected = profiles;
  if (bundle) {
    const token = value => identityName(value).replace(/\s*\([^)]*\)/g,'').replace(/\b(ammo|ammunition|grenades|grenade|shot)\b/g,'').replace(/\s+/g,' ').trim();
    const requested = bundle[2].split(/\s*&\s*|\s+and\s+/i).map(token);
    selected = profiles.filter(profile => requested.includes(token(profile.profile_name || profile.name)));
    if (selected.length !== requested.length) continue;
  }
  if (selected.length) {item.weapon_profiles=selected.map(prune);const evidence=[...evidenceFor(item),...evidenceFor(market)];putDerived('equipment',item,evidence,'Explicitly named bundle/role item linked to its unique core profile; price remains list-scoped');}
}
// Shared weapon identities with identical printed modes can be unified without moving any list price.
const identityGroups=new Map();
for(const item of rows('equipment')){if(item.owner_context||item.profile_scope_unresolved)continue;const key=identityName(item.name);if(!identityGroups.has(key))identityGroups.set(key,[]);identityGroups.get(key).push(item);}
for(const group of identityGroups.values()){
  if(group.length<2)continue;
  const first=group[0], profiles=item=>item.weapon_profiles||item.weaponProfiles||[], signature=item=>JSON.stringify(profiles(item).map(profile=>identityName(profile.profile_name||profile.name)+'|'+profileSignature(profile)).sort());
  if(!profiles(first).length||group.some(item=>signature(item)!==signature(first)))continue;
  const canonical=group.find(item=>markets.includes(item))||group.toSorted((a,b)=>a.id.localeCompare(b.id))[0];
  for(const item of group){if(item===canonical)continue;canonical.profile_contexts=[...new Set([...(canonical.profile_contexts||[]),...(item.profile_contexts||[])])];for(const key of ['description','description_en','rule_data','category_group'])if(!canonical[key]&&item[key])canonical[key]=item[key];const evidence=[...evidenceFor(canonical),...evidenceFor(item)];putDerived('equipment',canonical,evidence,'Identical named weapon modes unified; every source list keeps its own price');remap.set(item.id,canonical.id);indexes.get('equipment').delete(item.id);}
}
for (const kind of ['equipmentAvailability','fighterEquipment','equipmentDiscounts','fighterDefaults','tradingPostEquipment']) {
  for (const row of rows(kind)) if (row.equipment_id) row.equipment_id = remapped(row.equipment_id);
}
for (const item of rows('equipment')) {
  const marketEvidence = evidenceFor(item).some(e => String(e.part) === '003' && e.fields.some(field => /cost|price/.test(field)));
  const marketRelation = rows('tradingPostEquipment').find(row => row.equipment_id === item.id && finiteCost(row.cost) && evidenceFor(row).some(e => String(e.part) === '003'));
  // A gang list price is never the unrestricted price, including when no market price exists.
  if(!marketRelation&&item.trading_post_available!==true&&marketEvidence&&finiteCost(item.cost))item.reference_cost??=Number(item.cost);
  const price = marketRelation?.cost ?? (marketEvidence && item.trading_post_available === true ? item.cost : null);
  item.cost = finiteCost(price) ? Number(price) : null;
  item.price_unknown = !finiteCost(item.cost);
  item.purchase_available = !item.price_unknown && !item.profile_scope_unresolved;
  if(item.purchase_available)item.purchase_mode='trading_post';
  if (marketRelation) item.trade_points = marketRelation.trade_points ?? item.trade_points;
  item.weapon_profiles ??= item.weaponProfiles || [];
  item.equipmentType ??= item.equipment_type;
  if(item.maximum_per_gang==null&&finiteCost(item.rule_data?.gang_limit??item.rule_data?.maximum_per_gang))item.maximum_per_gang=Number(item.rule_data.gang_limit??item.rule_data.maximum_per_gang);
}
for(const item of rows('equipment')){
  if(!item.included_equipment_names?.length)continue;
  const components=item.included_equipment_names.map(name=>scoped('equipment',name,item.owner_context));
  if(components.some(component=>!component)){unresolved.push({kind:'equipment',id:item.id,reason:'Bundle component identity is unresolved'});continue;}
  item.grants_equipment={selection_type:'fixed',options:components.map(component=>({equipment_id:component.id,equipment_name:component.name,additional_cost:0,included_in_cost:true}))};
}
for (const post of rows('tradingPosts')) if (norm(post.name) === 'trading post') post.is_default = true;
for (const fighter of rows('fighterTypes')) {
  const gangName = fighter.gang_name || fighter.gang_type;
  const gangs = byName('gangTypes',gangName);
  const gang = gangs.length === 1 ? gangs[0] : null;
  if (gang) {fighter.gang_type_id = gang.id; fighter.gang_type = gang.name;}
  fighter.gang_name ??= fighter.gang_type;
  const expected = [...(fighter.starting_equipment || [])];
  for (const relation of rows('fighterDefaults').filter(row => row.fighter_type_id === fighter.id && row.default_kind === 'equipment')) {
    if (!expected.some(item => norm(typeof item === 'string' ? item : item.name || item.equipment_name) === norm(relation.default_name))) expected.push({name:relation.default_name,...(relation.included_in_cost === true ? {included_in_cost:true} : {})});
  }
  const defaults = [], defaultProblems = [];
  for (const entry of expected) {
    const item = typeof entry === 'string' ? {name:entry} : entry, name = item.name || item.equipment_name;
    let equipment = item.id ? indexes.get('equipment').get(remapped(item.id)) : scoped('equipment',name,gangName);
    const memberships = rows('equipmentAvailability').filter(row => norm(row.list_name) === norm(fighter.equipment_list_name) && norm(row.equipment_name) === norm(name));
    if (memberships.length === 1) equipment = indexes.get('equipment').get(memberships[0].equipment_id);
    if (!equipment) {
      let profiles = byName('weaponProfiles',name);
      if (!profiles.length) profiles = rows('weaponProfiles').filter(profile => identityName(profile.equipment_name) === identityName(name));
      if (!profiles.length) {
        const bundle=String(name).match(/^(.*?) with (.+)$/i);
        if(bundle){const base=identityName(bundle[1]),mode=identityName(bundle[2]);profiles=rows('weaponProfiles').filter(profile=>identityName(profile.equipment_name)===base&&identityName(profile.profile_name)===mode);}
      }
      const specific = profiles.filter(profile => context(profile.profile_context || profile.profile_scope || profile.gang_name || profile.gang_type || profile.owner_context) === context(gangName));
      profiles = specific.length ? specific : profiles;
      const groups = new Set(profiles.map(profile => context(profile.profile_context || profile.profile_scope || profile.gang_name || profile.gang_type || profile.owner_context)));
      if (profiles.length && groups.size <= 1) {
        const equipmentId = 'official-default-equipment-' + slug(gangName + '-' + name);
        equipment = indexes.get('equipment').get(equipmentId) || putDerived('equipment',{
          id:equipmentId,name,equipment_name:name,name_ko:profiles[0].name_ko || profiles[0].profile_name_ko,
          equipment_type:'Weapon',equipmentType:'Weapon',equipment_category:profiles[0].equipment_category || 'Intrinsic Weapons',
          owner_context:gangName,cost:null,price_unknown:true,purchase_available:false,starred:profiles.some(profile=>/\*/.test(profile.equipment_name||profile.profile_name||profile.name||'')),weapon_profiles:profiles.map(prune)
        },[...evidenceFor(fighter),...profiles.flatMap(evidenceFor)],'Intrinsic default linked only to its verified owner-context profile');
      }
    }
    if (!equipment) {defaultProblems.push({name,reason:'Starting equipment identity is unresolved in this gang context'}); continue;}
    if (item.included_in_cost !== true && !finiteCost(item.cost)) {defaultProblems.push({name,reason:'Starting equipment cost inclusion is not verified'}); continue;}
    if(item.counts_towards_weapon_limit===false){equipment.rule_data={...(equipment.rule_data||{}),counts_towards_weapon_limit:false};}
    defaults.push({id:equipment.id,equipment_name:equipment.name,quantity:item.quantity || 1,cost:item.included_in_cost === true ? 0 : Number(item.cost),included_in_cost:item.included_in_cost === true});
    const existingDefault=rows('fighterDefaults').find(row=>row.fighter_type_id===fighter.id&&row.default_kind==='equipment'&&identityName(row.default_name)===identityName(name));putDerived('fighterDefaults',{...existingDefault,id:existingDefault?.id||'official-default-gear-'+slug(fighter.id+'-'+equipment.id),fighter_type_id:fighter.id,equipment_id:equipment.id,default_kind:'equipment',default_name:equipment.name,quantity:item.quantity || 1,cost:item.included_in_cost === true?0:Number(item.cost),included_in_cost:item.included_in_cost === true},[...evidenceFor(fighter),...evidenceFor(equipment)],'Explicit starting equipment linked in owner context');
  }
  // Previously generated defaults are not imported as authority; rebuild from reviewed starter facts.
  fighter.default_equipment = defaults;
  fighter.defaults_resolved = defaults.length === expected.length && defaultProblems.length === 0;
  const skillNames = [...new Set([...(fighter.default_skill_names || []),...(fighter.default_skills || []).filter(item => typeof item === 'string'),...rows('fighterDefaults').filter(row => row.fighter_type_id === fighter.id && row.default_kind === 'skill').map(row => row.default_name)])];
  fighter.default_skills_resolved = true;
  for (const skillName of skillNames) {
    const skill = scoped('skills',skillName,gangName);
    if (!skill) {fighter.default_skills_resolved = false; defaultProblems.push({name:skillName,reason:'Starting skill identity is unresolved'}); continue;}
    const existingDefault=rows('fighterDefaults').find(row=>row.fighter_type_id===fighter.id&&row.default_kind==='skill'&&identityName(row.default_name)===identityName(skillName));const relationId = existingDefault?.id || 'official-default-skill-' + slug(fighter.id + '-' + skill.id);
    putDerived('fighterDefaults',{...existingDefault,id:relationId,fighter_type_id:fighter.id,skill_id:skill.id,default_kind:'skill',default_name:skill.name},[...evidenceFor(fighter),...evidenceFor(skill)],'Starting skill name linked to the unique verified skill in context');
  }
  const stats = fighter.stats || {}, requiredStats = ['M','WS','BS','S','T','W','I','A','Sv','Ld','Cl','Wil','Int'];
  const fixedStats = fighter.verified_fields.includes('stats') && requiredStats.every(key => typeof stats[key] === 'number' && Number.isFinite(stats[key]));
  const cost = fighter.total_cost ?? fighter.cost;
  fighter.price_unknown = !finiteCost(cost);
  if((fighter.fighter_subtypes||[]).includes('Pet')){fighter.recruitment_manual=true;fighter.recruitment_manual_reason='A verified owner selection is required; use manual recruitment until ownership can be bound.';fighter.recruitment_requirements=[...new Set([...(fighter.recruitment_requirements||[]),'pet_owner'])];}
  const manual = fighter.recruitment_manual === true || fighter.manual_recruitment === true || fighter.rule_data?.requires_manual_recruitment === true || fighter.rule_data?.variable_stats === true;
  fighter.recruitment_ready = fixedStats && !fighter.price_unknown && fighter.defaults_resolved && fighter.default_skills_resolved && !manual;
  if (!fighter.recruitment_ready) unresolved.push({kind:'fighterTypes',id:fighter.id,name:fighter.name,problems:defaultProblems,fixedStats,costKnown:!fighter.price_unknown,manual});
}
const listPurchaseRule=rows('coreRules').find(row=>row.id==='n26-core-visit-trading-post');
const restrictionMatches = (fighter,label) => {
  const gang = fighter.gang_name || fighter.gang_type, prefix = context(gang), fighterName = norm(fighter.name), shortName = fighterName.startsWith(prefix + ' ') ? fighterName.slice(prefix.length + 1) : fighterName;
  const variants = [fighter.name,shortName,fighter.fighter_variant,fighter.specialisation?.name,fighter.specialisation?.specialisation_name,...(fighter.fighter_subtypes || [])].filter(Boolean).map(norm);
  return variants.includes(norm(label)) || fighterName.endsWith(' '+norm(label));
};
const listIdentity=row=>{const full=norm(row.list_name||row.equipment_list_name),section=norm(row.equipment_section||row.restrictions?.equipment_section);return section&&full.endsWith(' - '+section)?full.slice(0,-section.length-3):full;};
// Generate each fighter's access and exact list price from that fighter's named list.
for (const fighter of rows('fighterTypes')) {
  const memberships = rows('equipmentAvailability').filter(row => fighter.equipment_list_name && listIdentity(row) === norm(fighter.equipment_list_name) || row.restrictions?.affiliation==='Aranthian' && norm(row.list_name)==='aranthian equipment list' && norm(fighter.gang_name||fighter.gang_type)==='outcasts' && (fighter.fighter_subtypes||[]).some(role=>rows('affiliations').find(a=>norm(a.name)==='aranthian')?.rule_data?.aranthian_equipment_roles?.includes(role)));
  for (const membership of memberships) {
    const restrictions=membership.restrictions || {}, labels=membership.fighter_type_restrictions || restrictions.fighter_types || [];
    const specialisationLabels=labels.filter(label=>/ specialist$/i.test(label)).map(label=>label.replace(/ specialist$/i,''));
    const directRole=labels.some(label=>restrictionMatches(fighter,label));
    const specialisedRole=!directRole&&specialisationLabels.length&&(fighter.fighter_subtypes || []).includes('Specialist');
    const hunterSection=String(restrictions.equipment_section || '').match(/^(Hunt Master|Jakara|Malcadon|Orrus|Yeld)(?: Ranged| Close Combat)? Weapons$/i);
    if(hunterSection){const role=norm(hunterSection[1]),allowed=role==='hunt master'?/\bhunt master$/i.test(fighter.name):new RegExp('^'+role+' spyre hunter$','i').test(fighter.name);if(!allowed)continue;}
    if(norm(fighter.name)==='caryatid prime')continue;
    const affiliations=restrictions.affiliation?byName('affiliations',restrictions.affiliation):[];
    if(restrictions.affiliation&&affiliations.length!==1){unresolved.push({kind:'equipmentAvailability',id:membership.id,reason:'Affiliation identity is unresolved'});continue;}
    const excluded = (membership.exclude_fighter_names || []).some(name => restrictionMatches(fighter,name));
    if (excluded || labels.length && !directRole && !specialisedRole) continue;
    let equipment = indexes.get('equipment').get(remapped(membership.equipment_id));
    if(equipment?.profile_scope_unresolved){const variants=(equipment.profile_variants || []).filter(variant=>context(variant.owner_context)===context(fighter.gang_name || fighter.gang_type));equipment=variants.length===1?indexes.get('equipment').get(variants[0].equipment_id):null;}
    if (!equipment) {unresolved.push({kind:'equipmentAvailability',id:membership.id,reason:'Equipment identity is missing'}); continue;}
    const evidence = [...evidenceFor(fighter),...evidenceFor(membership),...(listPurchaseRule?.rule_data?.gang_equipment_list_purchase_without_visit===true?evidenceFor(listPurchaseRule):[])];
    const id = 'official-list-access-' + slug(fighter.id + '-' + membership.id);
    const access = {id,fighter_type_id:fighter.id,gang_type_id:fighter.gang_type_id,equipment_id:equipment.id,list_name:membership.list_name,source_verified:true,
      ...(membership.requires_weapon_names ? {requires_weapon_names:membership.requires_weapon_names} : {}),
      ...(membership.target_weapon_name ? {target_weapon_name:membership.target_weapon_name} : {}),
      ...(membership.additional_cost === true || membership.cost_is_additional === true ? {additional_cost:true} : {}),
      ...(affiliations.length?{gang_affiliation_id:affiliations[0].id}:{}),
      ...(specialisedRole?{required_specialisation_names:specialisationLabels}:{}),
      ...(restrictions.requires_equipment?{requires_weapon_names:[restrictions.requires_equipment]}:{}),
      ...(restrictions.replaces?{replaces_equipment_name:restrictions.replaces}:{}),
      ...(restrictions.timing?{purchase_timing:restrictions.timing}:{}),
      ...(membership.maximum_per_gang!=null?{maximum_per_gang:membership.maximum_per_gang}:{}),
      ...(listPurchaseRule?.rule_data?.gang_equipment_list_purchase_without_visit===true?{trade_points:0,purchase_mode:'fighter_list',exclusive_reference:String(equipment.trade_points).toUpperCase()==='E'}:{})};
    putDerived('fighterEquipment',access,evidence,'Exact named equipment list and verified fighter restrictions');
    if (finiteCost(membership.cost)) putDerived('equipmentDiscounts',{...access,id:id+'-price',adjusted_cost:Number(membership.cost)},evidence,'Printed price for this fighter and equipment list; not a global market price');
  }
}
// Preserve faction-specific power-set identity even when two sets contain powers with the same name.
for(const skill of rows('skills')){
  const setName=skill.skill_set || skill.skill_type_name || skill.skill_type || skill.skill_set_name || skill.skillSet;
  if(!skill.skill_type_id&&setName&&!scoped('skillTypes',setName)){
    const id='official-skill-set-'+slug((skill.gang_name||skill.gang_type||'')+'-'+setName);
    putDerived('skillTypes',{id,name:setName,name_ko:skill.skill_set_name_ko||skill.skill_type_name_ko||({'Psychoteric Whispers':'사이코테릭 위스퍼스','Psyrender':'사이렌더','Bonecrusher':'본크러셔'}[setName])||setName,gang_name:skill.gang_name||skill.gang_type},evidenceFor(skill),'Power-set name explicitly stated in the reviewed power records');
  }
}
// Source002 stores a whole skill-access table on each fighter row; the app consumes one set per relation.
for(const relation of rows('fighterSkillAccess')){
  if(!relation.skill_access||Array.isArray(relation.skill_access)||typeof relation.skill_access!=='object')continue;
  const archetype=relation.archetype?scoped('archetypes',relation.archetype):null;
  for(const [setName,printed]of Object.entries(relation.skill_access)){
    const level=norm(printed),access=['unavailable','none','-'].includes(level)?'denied':level,skillType=scoped('skillTypes',setName);
    const child={...relation,id:relation.id+'--'+slug(setName),name:(relation.fighter_type||relation.name)+': '+setName,skill_type_id:skillType?.id,skill_set_name:setName,access_level:access,printed_access_level:printed,...(archetype?{archetype_id:archetype.id}:{})};delete child.skill_access;delete child.primary_skill_sets;delete child.secondary_skill_sets;
    putDerived('fighterSkillAccess',child,evidenceFor(relation),'One verified skill-set access cell from the printed fighter/archetype table');
  }
  indexes.get('fighterSkillAccess').delete(relation.id);
}
for (const relation of rows('fighterSkillAccess')) {
  relation.fighter_type_id ??= scoped('fighterTypes',relation.fighter_name || relation.fighter_type,relation.gang_name || relation.gang_type,evidenceFor(relation)[0]?.part)?.id;
  relation.skill_type_id ??= scoped('skillTypes',relation.skill_set_name || relation.skill_type_name || relation.skill_type || relation.skill_set)?.id;
  relation.access_level = String(relation.access_level || relation.access || '').toLowerCase();
}
for (const skill of rows('skills')) skill.skill_type_id ??= scoped('skillTypes',skill.skill_set || skill.skill_type_name || skill.skill_type || skill.skill_set_name || skill.skillSet)?.id;
// Resolve profile equipment IDs only when the original identity is unambiguous.
for (const profile of rows('weaponProfiles')) {
  if (profile.equipment_id) profile.equipment_id = remapped(profile.equipment_id);
  else profile.equipment_id = scoped('equipment',profile.equipment_name,profile.profile_context || profile.gang_name)?.id;
}
const catalog = Object.fromEntries(keys.map(key => [key, rows(key)]));
const core = id => catalog.coreRules.find(row => row.id === 'n26-core-' + id)?.rule_data;
const coverage = {
  references:audit.size > 0,gang_catalog:catalog.gangTypes.length > 0,
  fighter_catalog:catalog.fighterTypes.some(row => row.recruitment_ready),equipment_catalog:catalog.equipment.length > 0,
  xp:!!core('xp-events')?.events?.length,
  advancements:!!core('xp-bands')?.thresholds?.length && !!core('advancement-table')?.rows?.length && !!core('advancement-caps'),
  injuries:catalog.injuries.length > 0,post_cycle:false,vehicle_rules:false,
  recruitment:catalog.fighterTypes.some(row => row.recruitment_ready),
  equipment_purchase:catalog.equipment.some(row => row.purchase_available) || catalog.equipmentDiscounts.some(row => finiteCost(row.adjusted_cost))
};
const output = {
  official_source_policy:'provided_official_originals_only',official_source_status:'verified_partial',verified_source_count:sources.size,
  edition_coverage:{n26:coverage,n23:{}},coverage_counts:Object.fromEntries(keys.map(key => [key,catalog[key].length])),...catalog
};
await writeFile(new URL('dist/rules-data.json',root),JSON.stringify(output)+'\n');
await writeFile(new URL('dist/rules-data.js',root),'/* Facts reviewed against supplied originals; unsupported features remain manual. */\nglobalThis.RULES_DATA = '+JSON.stringify(output)+';\n');
await writeFile(path.join(path.dirname(path.resolve(manifestPath)),'public-row-evidence.json'),JSON.stringify({sources:[...sources.values()],rows:[...audit.values()],rejected,unresolved,identity_remap:Object.fromEntries(remap)},null,2));
console.log(JSON.stringify({rows:audit.size,rejected:rejected.length,unresolved:unresolved.length,counts:output.coverage_counts,coverage}));
