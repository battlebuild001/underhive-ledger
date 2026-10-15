import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';

const source=await readFile(new URL('../dist/learning-tutorials.js',import.meta.url),'utf8');
const catalog=JSON.parse(await readFile(new URL('../dist/rules-data.json',import.meta.url),'utf8'));
const context={};
for(const key of ['document','localStorage','sessionStorage','navigator','fetch','AccountParity','data'])Object.defineProperty(context,key,{get(){throw Error('Tutorial content accessed live application state: '+key)}});
vm.runInNewContext(source,context);
const lessons=JSON.parse(JSON.stringify(context.UK_TUTORIALS));
const byId=new Map(lessons.map(lesson=>[lesson.id,lesson]));
const rules=new Map(catalog.coreRules.map(rule=>[rule.id,rule]));
assert.equal(lessons.length,18);
assert.equal(byId.size,lessons.length,'Lesson IDs are unique.');
assert.equal(lessons.flatMap(lesson=>lesson.steps).length,108);
assert.equal(lessons.flatMap(lesson=>lesson.steps).filter(step=>step.exercise).length,36);

function bilingual(value,path){
 assert(value&&typeof value==='object',path+' is bilingual.');
 for(const language of ['ko','en'])assert(typeof value[language]==='string'&&value[language].trim().length>0,path+'.'+language+' has usable content.');
 if(!/^[0-9+−. ,×=–%A-Z-]+$/.test(value.ko))assert.match(value.ko,/[가-힣]/,path+' has Korean content.');
 assert.doesNotMatch(value.en.replaceAll('한 / EN','Korean / EN'),/[가-힣]/,path+' English contains no untranslated Korean.');
}
function reference(value,lesson,path){
 assert.equal(value.kind,'coreRules',path+' uses a supported collection.');
 const row=rules.get(value.id);assert(row,path+' resolves to an existing rule.');
 assert.equal(value.edition,String(row.edition).toLowerCase(),path+' identifies the actual edition.');
 assert(lesson.editions.every(edition=>edition===value.edition),path+' does not expose N26 facts under N23.');
}
let references=0;
for(const lesson of lessons){
 assert.match(lesson.id,/^[a-z][a-z0-9-]+$/);
 assert(lesson.editions.length>0&&new Set(lesson.editions).size===lesson.editions.length);
 assert(lesson.editions.every(edition=>['n23','n26'].includes(edition)));
 assert(['app','battle','campaign'].includes(lesson.category));
 assert(Number.isInteger(lesson.minutes)&&lesson.minutes>=5);
 bilingual(lesson.title,lesson.id+'.title');bilingual(lesson.summary,lesson.id+'.summary');
 assert(lesson.steps.length>=5&&lesson.steps.length<=10);
 assert.equal(new Set(lesson.steps.map(step=>step.id)).size,lesson.steps.length,'Step IDs are unique within each lesson.');
 const lessonReferenceIds=new Set(lesson.references.map(ref=>ref.id));
 for(const ref of lesson.references)reference(ref,lesson,lesson.id+' reference');
 let choices=0;
 for(const step of lesson.steps){
  const path=lesson.id+'/'+step.id;bilingual(step.title,path+'.title');bilingual(step.body,path+'.body');
  assert(step.body.ko.length>=65&&step.body.en.length>=120,path+' explains the procedure in detail.');
  assert(step.bullets.length>=2,path+' includes practical reminders.');
  for(const bullet of step.bullets)bilingual(bullet,path+'.bullet');
  for(const ref of step.references){reference(ref,lesson,path);assert(lessonReferenceIds.has(ref.id));references++;}
  if(lesson.category!=='app')assert(step.references.length>0,path+' connects game facts to matching-edition references.');
  if(!step.exercise)continue;
  choices++;
  const exercise=step.exercise;assert.equal(exercise.type,'choice');bilingual(exercise.prompt,path+'.exercise.prompt');bilingual(exercise.explanation,path+'.exercise.explanation');
  assert(exercise.options.length>=3);
  const ids=exercise.options.map(option=>option.id);assert.equal(new Set(ids).size,ids.length);assert(ids.includes(exercise.correctOption));
  for(const option of exercise.options)bilingual(option.text,path+'.exercise.option');
  assert.equal(new Set(exercise.options.map(option=>option.text.ko)).size,ids.length,'Korean choices are distinct.');
  assert.equal(new Set(exercise.options.map(option=>option.text.en)).size,ids.length,'English choices are distinct.');
 }
 assert(choices>=2,lesson.id+' includes at least two verifiable exercises.');
}
const shared=lessons.filter(lesson=>lesson.editions.includes('n23'));
assert.equal(shared.length,8);
assert.equal(shared.filter(lesson=>lesson.category==='app'&&lesson.references.length===0).length,2);
assert.equal(shared.filter(lesson=>lesson.category!=='app'&&lesson.editions.join()==='n23').length,6);
assert(lessons.filter(lesson=>lesson.category!=='app').every(lesson=>lesson.editions.length===1),'Game lessons must select exactly one edition.');

const rule=id=>rules.get('n26-core-'+id).rule_data;
const findStep=(lesson,step)=>byId.get(lesson).steps.find(value=>value.id===step);
const answer=(lesson,step)=>{const exercise=findStep(lesson,step).exercise;return exercise.options.find(option=>option.id===exercise.correctOption).text.en};
// These checks connect worked examples to the catalog rather than merely mirroring display strings.
assert.equal(rule('gang-budget').default_credits,1000);
const spent=650+280;assert.equal(answer('gang-foundations','budget-practice'),`${spent} spent, ${rule('gang-budget').default_credits-spent} retained`);
assert.equal(rule('gang-composition').pets_excluded,true);
assert.equal(findStep('gang-foundations','recruit').exercise.correctOption,'2');
assert.equal(rule('weapon-slots').fighter_weapon_slots_max,3);assert.equal(rule('weapon-slots').starred_weapon_slots,2);
assert.equal(rule('activation-action-economy').base_actions,2);assert.equal(rule('activation-action-economy').same_named_action_once_per_activation,true);
assert.equal(rule('actions-active-combat-movement').actions.Shoot.type,'Single');assert.equal(rule('actions-active-combat-movement').actions.Move.type,'Single');
assert.equal(answer('activation-states','activation-practice'),'Shoot (Single) → Move (Single)');
assert.equal(rule('round-priority').first_round_tie,'reroll');assert.equal(rule('round-priority').subsequent_tie,'previous_round_without_priority');
assert.equal(1+2*rule('dexterity-difficult-dangerous').difficult_cost,5);assert.equal(answer('movement-terrain','difficult'),'5 inches');
assert.equal(rule('falling').bands[1].min,3);assert.equal(rule('falling').bands[1].max_inclusive,6);
const wound=rule('wound-target').table;assert.equal(wound.find(value=>value.comparison==='T < S < 2*T').target,answer('ranged-combat','wound'));
assert.equal(rule('cover-save').ranged_cover_long_save_bonus,2);assert(3-1+rule('cover-save').ranged_cover_long_save_bonus>=4);assert.equal(findStep('ranged-combat','ranged-practice').exercise.correctOption,'1');
assert.deepEqual(rule('invulnerable-save').all_saves_natural_failures,[1,2]);
assert.equal(3+rule('initiative-order').charge_initiative_bonus,5);assert.equal(findStep('close-combat','initiative').exercise.correctOption,'1');
assert.equal(2+rule('melee-start').charge_primary_attacks_bonus,3);assert.equal(rule('melee-start').offhand_attacks,1);assert.equal(answer('close-combat','melee-practice'),'Primary 3 + offhand 1');
assert.equal(rule('wounds-and-lethality').wounds_lost_per_unsaved_wound,1);assert.equal(rule('wounds-and-lethality').multiple_injury_dice,'choose_one');assert.equal(rule('wounds-and-lethality').minimum_wounds,0);
assert.equal(rule('recovery').enemy_auto_ooa_range_inches,1);assert.equal(answer('wounds-recovery','recovery-practice'),'OOA without a roll');
assert.equal(rule('bottle-checks').trigger,'at_least_one_gang_model_OOA_this_round');
assert.equal(rule('objectives').pets_control,false);assert.equal(rule('objectives').pets_contest,true);assert.equal(rule('objectives').objective_radius_inches,3);
assert.equal(rule('xp-events').same_activation_same_enemy_max_award,'OOA_2_instead_of_serious_1_plus_OOA_2');assert.equal(findStep('postbattle-cycle','rewards-equipment').exercise.correctOption,'2');
const income=4*rule('work-territory').credits_each+3*rule('collect-income').credits_per_reputation+40;
assert.equal(answer('postbattle-cycle','cycle-practice'),income+' credits');assert(4<=rule('work-territory').max_models_per_cycle);
assert.equal(rule('advancement-timing').spend_xp,false);assert.equal(rule('advancement-timing').official_example.previous_xp,6);assert.equal(rule('advancement-timing').official_example.new_xp,7);
assert.equal(rule('prospect-promotion').minimum_xp,13);assert.equal(rule('ganger-promotion').minimum_xp,37);
assert.equal(rule('prospect-promotion').credit_increase,15);assert.equal(rule('train').xp_each,2);
assert.equal(rule('work-territory').max_models_per_cycle,5);assert.equal(rule('collect-income').credits_per_reputation,10);
const caution=findStep('growth-special-rules','reading-practice');assert.match(caution.body.en,/unresolved/);assert.equal(caution.exercise.correctOption,'3');
assert.equal(rule('visit-trading-post').tp_formula_status,'unresolved_translation');assert.equal(rule('advancement-table').cross_row_selection_direction,'unresolved_translation');
// Each app tutorial uses buttons and routes that exist in the current implementation.
const appSource=(await Promise.all(['app.js','campaign-enrollment.js','account-parity.js'].map(file=>readFile(new URL('../dist/'+file,import.meta.url),'utf8')))).join('\n');
for(const token of ['new-gang','new-campaign','new-fighter','enrollment-open','owner-save','join-submit','join-retry','approve','withdraw','export','import'])assert(appSource.includes(token),'Documented workflow exists: '+token);
assert.doesNotMatch(source,/battletablehobby|번역 합본|rulebook-enrichment|P\d{4}|sediment:\/\//i,'Tutorials contain no private upload provenance.');
// Independent N23 examples catch edition leakage and arithmetic mistakes.
const n23=id=>rules.get('n23-core-'+id).rule_data;
assert.equal(n23('action-economy').actions.Move,'Simple');
assert.equal(n23('action-economy').actions.Shoot,'Basic');
assert.equal(n23('ranged-modifiers').partial_cover_hit_modifier,-1);
assert.equal(n23('advancement').spend_xp,true);
assert.equal(n23('advancement').chosen_secondary_skill_base_xp,12);
assert.equal(answer('n23-movement','movement-practice'),(1+2*n23('movement-terrain').difficult_terrain_distance_cost)+' inches');
assert.equal(answer('n23-close-combat','dice-practice'),'Four: two for each weapon');
assert.equal(n23('damage-and-injury').example.injury_dice,2);
assert.equal(answer('n23-injury-recovery','damage-practice'),'Two');
console.log(`Tutorial data: ${lessons.length} bilingual lessons, 108 steps, 36 sandbox exercises, ${references} valid edition-bound references, workflow checks, and worked examples passed.`);
