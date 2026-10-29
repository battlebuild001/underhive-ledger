/* Normalize starting grants from existing, reviewed supplied-original facts.
   The caller verifies original bytes before invoking this pure transformation. */
import assert from 'node:assert/strict';

const clone=value=>JSON.parse(JSON.stringify(value));
const norm=value=>String(value??'').normalize('NFKC').replace(/[’‘]/g,"'").replace(/[–—]/g,'-').replace(/\s+/g,' ').trim().toLowerCase();
const slug=value=>norm(value).replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const unique=rows=>[...new Set(rows)];
const n26=row=>row?.source_verified===true&&norm(row.edition_slug||row.edition)==='n26';
const isPower=row=>!!(row?.is_power||row?.is_wyrd_power||row?.rule_data?.is_power||norm(row?.rule_data?.required_subtype)==='wyrd'||row?.rule_data?.required_subtypes?.some(role=>norm(role)==='wyrd'));

export function deriveStartingSkillData(inputCatalog,inputAudit,manifest){
  const catalog=clone(inputCatalog),audit=clone(inputAudit);
  assert.equal(manifest.policy,'provided_official_originals_only');
  assert.equal(manifest.sources?.length,3,'Three supplied originals required');
  const sources=new Map(manifest.sources.map(row=>[String(row.part),row]));
  assert.equal(sources.size,3);
  for(const source of sources.values()){
    assert.equal(source.edition,'n26');assert.equal(source.year,2026);
    assert(Number.isInteger(source.pages)&&source.pages>0);
    assert(/^[a-f0-9]{64}$/.test(source.sha256));
  }
  assert.equal(audit.sources?.length,3);
  for(const source of audit.sources)assert.equal(source.sha256,sources.get(String(source.part))?.sha256);
  const approvals=new Map();
  for(const row of audit.rows||[]){
    const key=row.kind+':'+row.id;assert(!approvals.has(key),'Duplicate source approval: '+key);
    assert(row.evidence?.length,'Missing page approval: '+key);
    const allEvidence=[...row.evidence,...Object.values(row.derived_fields||{}).flatMap(field=>field.evidence||[])];
    for(const evidence of allEvidence){
      const source=sources.get(String(evidence.part)),pages=Array.isArray(evidence.pdf_page)?evidence.pdf_page:[evidence.pdf_page];
      assert(source&&pages.length&&pages.every(page=>Number.isInteger(page)&&page>=1&&page<=source.pages),'Invalid source page: '+key);
      assert(evidence.fields?.length,'Missing reviewed fields: '+key);
      assert(evidence.visually_verified===true||/visual|image/i.test(evidence.verification||''),'Image approval required: '+key);
      if(evidence.source_sha256)assert.equal(evidence.source_sha256,source.sha256);
    }
    approvals.set(key,row);
  }
  const ids=new Set();
  for(const [kind,rows]of Object.entries(catalog).filter(([,rows])=>Array.isArray(rows)))for(const row of rows){
    assert(!ids.has(row.id),'Duplicate public identity: '+row.id);ids.add(row.id);
    assert(n26(row),'Unverified or unsupported edition: '+row.id);
    const approval=approvals.get(kind+':'+row.id);assert(approval,'Missing source approval: '+row.id);
    const fields=new Set(approval.evidence.flatMap(row=>row.fields));
    assert(row.verified_fields?.length&&row.verified_fields.every(field=>fields.has(field)),'Unapproved public field: '+row.id);
  }
  const summary={added_subtype_grants:0,added_model_type_grants:0,added_fixed_power_grants:0,primary_choice_flags:0,starting_power_choices:0,unresolved:[]};
  const evidenceFor=(kind,row)=>approvals.get(kind+':'+row.id).evidence;
  const mergeEvidence=rows=>[...new Map(rows.map(row=>[JSON.stringify(row),clone(row)])).values()];
  function annotate(kind,row,field,dependencies,reason){
    const approval=approvals.get(kind+':'+row.id);
    approval.derived_fields??={};
    approval.derived_fields[field]={from:dependencies.map(([kind,row])=>kind+':'+row.id),evidence:mergeEvidence(dependencies.flatMap(([kind,row])=>evidenceFor(kind,row))),derivation:reason};
  }
  function addGrant(fighter,skill,dependencies,origin,subtypes=[]){
    assert(n26(fighter)&&n26(skill));
    const proofs=[['fighterTypes',fighter],['skills',skill],...dependencies];
    let relation=catalog.fighterDefaults.find(row=>row.fighter_type_id===fighter.id&&row.skill_id===skill.id);
    if(!relation){
      const id='official-default-skill-'+slug(fighter.id+'-'+skill.id);assert(!ids.has(id),'Derived grant identity collision: '+id);ids.add(id);
      const evidence=mergeEvidence(proofs.flatMap(([kind,row])=>evidenceFor(kind,row)));
      relation={id,fighter_type_id:fighter.id,skill_id:skill.id,default_kind:'skill',default_name:skill.name,edition:'n26',edition_slug:'n26',source_verified:true,verified_fields:unique(evidence.flatMap(row=>row.fields)),verification_method:'original_page_image_review'};
      catalog.fighterDefaults.push(relation);
      const derivation=origin==='subtype'?'Permanent Subtype skill explicitly granted by the reviewed Subtype and model identity':origin==='model_type'?'Permanent Vehicle skill explicitly granted by the reviewed model-type rule and Vehicle identity':'Fixed known Wyrd Power resolved within the unique reviewed power set';
      const approval={kind:'fighterDefaults',id,evidence,derivation};
      audit.rows.push(approval);approvals.set('fighterDefaults:'+id,approval);
      summary[{subtype:'added_subtype_grants',model_type:'added_model_type_grants',fixed_power:'added_fixed_power_grants'}[origin]]++;
    }
    relation.grant_origin??=origin;
    relation.grant_source_ids=unique([...(relation.grant_source_ids||[]),...dependencies.map(([,row])=>row.id)]);
    if(subtypes.length)relation.granted_by_subtypes=unique([...(relation.granted_by_subtypes||[]),...subtypes]);
    annotate('fighterDefaults',relation,'starting_grant',proofs,'Existing reviewed facts normalized into a zero-cost initial skill relation; does not consume a chosen Primary skill.');
    return relation;
  }
  const skills=catalog.skills.filter(n26),sets=catalog.skillTypes.filter(n26),types=catalog.fighterTypes.filter(n26);
  const uniqueSkill=name=>{const matches=skills.filter(row=>norm(row.name)===norm(name)&&!isPower(row));return matches.length===1?matches[0]:null;};
  // Mounted grants depend on the mount chosen for a battle and must never become permanent starter rows.
  const permanentSubtypes=catalog.fighterSubtypes.filter(row=>n26(row)&&['Leader','Champion','Brute','Ogryn'].includes(row.name));
  for(const fighter of types)for(const subtype of permanentSubtypes.filter(row=>(fighter.fighter_subtypes||[]).includes(row.name))){
    const names=unique([...(subtype.rule_data?.skills||[]),...(subtype.rule_data?.default_skill_names||[])]);
    for(const name of names){const skill=uniqueSkill(name);if(!skill){summary.unresolved.push({id:fighter.id,grant:name,reason:'Permanent skill identity is not unique'});continue;}addGrant(fighter,skill,[['fighterSubtypes',subtype]],'subtype',[subtype.name]);}
  }
  const modelTypes=catalog.coreRules.find(row=>n26(row)&&row.id==='n26-core-model-types');
  if(modelTypes)for(const fighter of types.filter(row=>row.is_vehicle===true))for(const name of unique(modelTypes.rule_data?.vehicle_inherent_skills||[])){
    const skill=uniqueSkill(name);if(!skill){summary.unresolved.push({id:fighter.id,grant:name,reason:'Vehicle inherent skill identity is not unique'});continue;}
    const relation=addGrant(fighter,skill,[['coreRules',modelTypes]],'model_type');relation.granted_by_model_type='Vehicle';
  }
  for(const fighter of types){
    const gang=catalog.gangTypes.find(row=>n26(row)&&row.id===fighter.gang_type_id),roles=fighter.fighter_subtypes||[];
    // Named elevated Outcasts have a retain-or-replace choice and Arbitrator caveat; do not infer an extra skill.
    const elevated=/-outcast-(?:leader|champion)$/.test(fighter.id)||!!fighter.rule_data?.requires_outcast_leader;
    const statedRoles=gang?.rule_data?.starting_primary_skill_roles;
    if(fighter.recruitment_ready===true&&!fighter.free_skill&&!elevated&&Array.isArray(statedRoles)&&roles.some(role=>statedRoles.includes(role))){
      fighter.free_skill=true;summary.primary_choice_flags++;
      annotate('fighterTypes',fighter,'free_skill',[['fighterTypes',fighter],['gangTypes',gang]],'One chosen Primary starting skill explicitly stated for this faction role, separate from fixed and Subtype grants.');
    }
    const known=fighter.rule_data?.known_wyrd_powers;
    if(known){
      let matchedSets=[],names=[];
      if(Array.isArray(known)&&known.length){
        names=unique(known);
        matchedSets=sets.filter(set=>names.every(name=>skills.filter(skill=>isPower(skill)&&skill.skill_type_id===set.id&&norm(skill.name)===norm(name)).length===1));
      }else if(typeof known==='string'&&/^All\s+\S/i.test(known)){
        const setName=known.replace(/^All\s+/i,'');matchedSets=sets.filter(set=>norm(set.name)===norm(setName));
        if(matchedSets.length===1)names=skills.filter(skill=>isPower(skill)&&skill.skill_type_id===matchedSets[0].id).map(skill=>skill.name);
      }
      if(matchedSets.length===1&&names.length){
        const set=matchedSets[0];
        for(const name of names){const matches=skills.filter(skill=>isPower(skill)&&skill.skill_type_id===set.id&&norm(skill.name)===norm(name));assert.equal(matches.length,1);addGrant(fighter,matches[0],[['skillTypes',set]],'fixed_power');}
      }else summary.unresolved.push({id:fighter.id,reason:'Fixed known powers do not resolve to one verified set'});
    }
    if(fighter.recruitment_ready!==true)continue;
    const choiceFacts=(fighter.special_rules_details||[]).filter(detail=>detail.rule_data?.power_count||detail.rule_data?.starting_powers);
    if(!choiceFacts.length)continue;
    if(choiceFacts.length!==1){summary.unresolved.push({id:fighter.id,reason:'Multiple mandatory power-choice rules need review'});continue;}
    const detail=choiceFacts[0],rule=detail.rule_data;
    if(rule.additional_cost!=null)continue; // Optional paid upgrades are not automatic initial powers.
    const names=rule.power_set?[rule.power_set]:rule.power_type_choices;
    const matches=Array.isArray(names)?names.map(name=>sets.filter(set=>norm(set.name)===norm(name))):[];
    if(Number(rule.power_count??rule.starting_powers)!==1||!matches.length||matches.some(rows=>rows.length!==1)||matches.some(([set])=>!skills.some(skill=>isPower(skill)&&skill.skill_type_id===set.id))){summary.unresolved.push({id:fighter.id,reason:'Mandatory power choice cannot be normalized without guessing'});continue;}
    const choice={count:1,skill_set_ids:matches.map(([set])=>set.id),...(norm(rule.further_access)==='primary'?{primary_access:true}:{})};
    if(JSON.stringify(fighter.starting_power_choice)!==JSON.stringify(choice))summary.starting_power_choices++;
    fighter.starting_power_choice=choice;
    annotate('fighterTypes',fighter,'starting_power_choice',[['fighterTypes',fighter],...matches.map(([set])=>['skillTypes',set])],'Required roster-entry power selection normalized from the existing reviewed special rule; optional upgrades excluded.');
  }
  catalog.coverage_counts={...(catalog.coverage_counts||{}),...Object.fromEntries(Object.entries(catalog).filter(([,rows])=>Array.isArray(rows)).map(([kind,rows])=>[kind,rows.length]))};
  return {catalog,audit,summary};
}
