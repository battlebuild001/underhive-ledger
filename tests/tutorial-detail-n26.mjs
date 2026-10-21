import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const root=new URL('../',import.meta.url),read=path=>fs.readFileSync(new URL(path,root),'utf8');
const context={};
for(const key of ['document','localStorage','sessionStorage','navigator','fetch','AccountParity','data'])Object.defineProperty(context,key,{get(){throw Error('Tutorial detail accessed live application state: '+key)}});
vm.createContext(context);
vm.runInContext(read('dist/learning-tutorials.js'),context);
const baseline=JSON.parse(JSON.stringify(context.UK_TUTORIALS));
const source=read('dist/tutorial-detail-n26.js');
vm.runInContext(source,context);
const lessons=JSON.parse(JSON.stringify(context.UK_TUTORIALS)),targets=lessons.filter(l=>l.editions.length===1&&l.editions[0]==='n26');
assert.equal(targets.length,10);
function bilingual(value,path){
 assert(value&&typeof value.ko==='string'&&value.ko.trim()&&typeof value.en==='string'&&value.en.trim(),path+' is bilingual');
 assert.match(value.ko,/[가-힣]/,path+' contains Korean explanation');
 assert.doesNotMatch(value.en,/[가-힣]/,path+' contains fully English explanation');
}
let detailedSteps=0,walkthroughs=0,feedback=0;
for(const lesson of targets){
 const old=baseline.find(l=>l.id===lesson.id);
 assert.deepEqual(lesson.steps.map(s=>s.id),old.steps.map(s=>s.id),'Existing step IDs retain saved progress');
 for(const step of lesson.steps){
  detailedSteps++;const path=lesson.id+'/'+step.id,oldStep=old.steps.find(s=>s.id===step.id);
  bilingual(step.objective,path+'.objective');assert(step.preparation.length>=1);step.preparation.forEach((v,i)=>bilingual(v,path+'.preparation.'+i));
  assert(step.walkthrough.length>=3,path+' teaches a complete procedure');
  for(const [i,item]of step.walkthrough.entries()){walkthroughs++;for(const field of ['title','body','result'])bilingual(item[field],path+'.walkthrough.'+i+'.'+field)}
  bilingual(step.workedExample.situation,path+'.example.situation');assert(step.workedExample.steps.length>=2);step.workedExample.steps.forEach(v=>bilingual(v,path+'.example.step'));bilingual(step.workedExample.result,path+'.example.result');
  assert(step.pitfalls.length>=1);for(const item of step.pitfalls){bilingual(item.problem,path+'.pitfall.problem');bilingual(item.fix,path+'.pitfall.fix')}
  bilingual(step.selfCheck,path+'.selfCheck');
  if(oldStep.exercise){
   assert.equal(step.exercise.correctOption,oldStep.exercise.correctOption,'Correct answers stay stable');
   assert.deepEqual(step.exercise.options.map(o=>o.id),oldStep.exercise.options.map(o=>o.id),'Saved answer IDs stay valid');
   bilingual(step.exercise.hint,path+'.exercise.hint');
   const explanations=[];for(const option of step.exercise.options){feedback++;bilingual(option.feedback,path+'.option.'+option.id);explanations.push(option.feedback.en)}
   assert.equal(new Set(explanations).size,explanations.length,'Each option explains its particular reasoning');
  }else assert.equal(step.exercise,undefined,'Theory steps do not invalidate progress by gaining a new quiz');
 }
}
assert.equal(detailedSteps,60);assert.equal(walkthroughs,180);assert.equal(feedback,60);
const after=JSON.stringify(context.UK_TUTORIALS);vm.runInContext(source,context);assert.equal(JSON.stringify(context.UK_TUTORIALS),after,'Repeated script loading is idempotent');
for(const lesson of lessons.filter(l=>!targets.includes(l)))assert.deepEqual(lesson,baseline.find(l=>l.id===lesson.id),'Other edition/app content stays unchanged');

// Independently ground the new examples in their catalog values, not a generic edition guess.
const catalog=JSON.parse(read('dist/rules-data.json')),rules=new Map(catalog.coreRules.map(r=>[r.id,r.rule_data]));
const rule=id=>rules.get('n26-core-'+id),step=(l,id)=>targets.find(x=>x.id===l).steps.find(s=>s.id===id);
assert.equal(rule('gang-budget').default_credits,1000);
assert.match(step('gang-foundations','budget').workedExample.result.en,new RegExp(String(1000-600-250)));
assert.equal(rule('weapon-slots').fighter_weapon_slots_max,3);assert.equal(rule('weapon-slots').starred_weapon_slots,2);
assert.match(step('gang-foundations','profiles').workedExample.steps[0].en,/2 slots.*1.*3/);
assert.equal(rule('prebattle').underdog_difference_per_tactic_credits,200);
assert.match(step('prepare-round','tactics').workedExample.steps[1].en,/400 ÷ 200 = 2/);
assert.equal(rule('activation-action-economy').same_named_action_once_per_activation,true);
assert.equal(rule('actions-active-combat-movement').run_inches,'M + I');
assert.match(step('movement-terrain','distances').workedExample.steps[0].en,/5 \+ 3 = 8/);
assert.equal(rule('dexterity-difficult-dangerous').difficult_cost,2);
assert.equal(rule('falling').bands[1].max_inclusive,6);
assert.match(step('movement-terrain','falling').workedExample.steps[0].en,/Exactly 6.*3–6/);
assert.equal(rule('cover-save').ranged_cover_long_save_bonus,2);
assert.deepEqual(rule('invulnerable-save').all_saves_natural_failures,[1,2]);
assert.match(step('ranged-combat','ranged-practice').workedExample.steps[0].en,/3 − 1 \+ 2 = 4/);
assert.equal(rule('ammo-rapid-fire').ammo_failed_test_extra_firepower_dice,0);
assert.match(step('ranged-combat','ammo').pitfalls[0].fix.en,/not another Firepower die/);
assert.doesNotMatch(source,/battletablehobby|번역 합본|rulebook-enrichment|P\d{4}|sediment:\/\//i);
console.log(`N26 tutorial detail: ${detailedSteps} detailed steps, ${walkthroughs} walkthrough actions, worked examples, ${feedback} choice explanations, stable progress IDs and grounded rule checks passed.`);
