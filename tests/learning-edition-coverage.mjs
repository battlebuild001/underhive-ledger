import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';

const catalog=JSON.parse(await readFile(new URL('../dist/rules-data.json',import.meta.url),'utf8'));
const ctx={};
vm.runInNewContext(await readFile(new URL('../dist/i18n-catalog-data.js',import.meta.url),'utf8'),ctx);
const row=(name,edition,type)=>catalog.skills.find(s=>s.name===name&&s.edition_slug===edition&&(!type||s.skill_type===type));
const read=(name,edition,type)=>{
 const skill=row(name,edition,type);assert(skill,'Skill identity exists: '+edition+'/'+name);
 assert(skill.description?.trim(),'Skill has an original Korean summary: '+edition+'/'+name);
 const english=ctx.UK_CATALOG_LOCALE.rulesEn['skills:'+skill.id];assert(english?.trim());
 assert(!/[가-힣]/.test(english),'English skill descriptions are localized.');
 return skill;
};
for(const skill of catalog.skills.filter(s=>s.edition_slug==='n26'&&['Finesse','Muscle'].includes(s.skill_type)))read(skill.name,'n26');
assert.equal(row('Lightning Reflexes','n26').rule_data.melee_invulnerable_save,'5+');
assert.equal(row('Somersault','n26').rule_data.action_type,'Double');
assert.equal(row('Tireless Worker','n26').rule_data.additional_credits,10);
assert.equal(row('Ground Pound','n26').rule_data.range_inches,6);
assert.equal(row('Unstoppable Force','n26').rule_data.additional_consolidation_inches,2);
assert.equal(row('Fists of Steel','n26').rule_data.granted_weapon.lethality,'2');
const legacy=read('Lightning Reflexes','n23'),modern=read('Lightning Reflexes','n26');
assert.notEqual(legacy.description,modern.description,'Same-named skills retain their edition-specific mechanics.');
assert.notEqual(legacy.id,modern.id);
const generic=row('Force Blast','n26','Wyrd Powers'),bonecrusher=row('Force Blast','n26','Bonecrusher Wyrd Powers');
assert(generic&&bonecrusher&&generic.id!==bonecrusher.id,'Repeated power names retain skill-type identities.');
assert.equal(bonecrusher.rule_data.review_required,true,'The verified weapon grant cannot imply its unverified manifestation cost.');
assert.match(bonecrusher.description_en,/needs verification/);
assert.notEqual(generic.description,bonecrusher.description,'A grant-only explanation must not overwrite another power with the same name.');
const n23Skills=catalog.skills.filter(s=>s.edition_slug==='n23'),n26Skills=catalog.skills.filter(s=>s.edition_slug==='n26');
assert.equal(n23Skills.filter(s=>s.description).length,285);
assert.equal(n26Skills.filter(s=>s.description).length,58);
assert.equal(row('Terrify','n26','Psyrender Wyrd Powers').description,undefined,'An unavailable N26 power must not inherit a legacy namesake.');
assert.equal(row('Hostile Negotiations','n23').description,undefined,'An unverified clan benefit must not receive invented filler.');
const gsc=read('Mind Control','n23','Genestealer Cult Wyrd Powers'),telepathy=read('Mind Control','n23','Telepathy Discipline');
assert(!/sustained/i.test(gsc.description_en),'The GSC Mind Control is not a continuous effect.');
assert(/sustained/i.test(telepathy.description_en),'The separate Telepathy version retains its continuous effect.');
assert.match(row('Mighty Leap','n23').description_en,/base size/,'The N23 Mighty Leap summary retains the FAQ base-size correction.');
assert.match(row("Helmar's Justice",'n23').description_en,/XP/,'The updated Palanite skill must retain its new XP effect.');
for(const skill of catalog.skills.filter(s=>s.description)){
 assert(ctx.UK_CATALOG_LOCALE.rulesEn['skills:'+skill.id],'Every described skill needs its own English catalog entry: '+skill.id);
 assert(!/sediment:\/\/|\.docx\b|battletablehobby|\/workspace\//i.test(JSON.stringify(skill)),'Skill explanations contain no private attachment metadata.');
}
console.log('Learning edition coverage: N23 battle references, bilingual skill explanations, N26 house skills, duplicate power identities and honest partial verification passed.');
