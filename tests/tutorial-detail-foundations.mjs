import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const base=fs.readFileSync(new URL('../dist/learning-tutorials.js',import.meta.url),'utf8');
const detail=fs.readFileSync(new URL('../dist/tutorial-detail-foundations.js',import.meta.url),'utf8');
const context={};
for(const name of ['document','localStorage','sessionStorage','navigator','fetch','AccountParity','data'])Object.defineProperty(context,name,{get(){throw Error('Content accessed live application state: '+name)}});
vm.runInNewContext(base,context);
const original=JSON.parse(JSON.stringify(context.UK_TUTORIALS));
vm.runInNewContext(detail,context);
const enhanced=JSON.parse(JSON.stringify(context.UK_TUTORIALS));
const byId=new Map(enhanced.map(lesson=>[lesson.id,lesson]));
const newIds=['account-id-and-sync','gang-equipment-workshop','battle-records-workshop'];
const existingIds=['workspace-basics','online-campaign','n23-round-actions','n23-movement','n23-ranged-combat','n23-close-combat','n23-injury-recovery','n23-postbattle-growth'];
assert.equal(enhanced.length,original.length+newIds.length);
assert.deepEqual(enhanced.slice(0,4).map(lesson=>lesson.id),['workspace-basics',...newIds]);
function bilingual(value,label){
 assert(value&&typeof value==='object',label+' is bilingual');
 for(const language of ['ko','en'])assert.equal(typeof value[language],'string',label+'.'+language);
 assert.match(value.ko,/[가-힣]/,label+' has Korean');
 assert(value.en.trim().length>=5,label+' has substantive English');
 assert.doesNotMatch(value.en,/[가-힣]/,label+' English is translated');
}
let steps=0,exercises=0;
for(const lessonId of [...existingIds,...newIds]){
 const lesson=byId.get(lessonId);assert(lesson,lessonId+' exists');
 if(newIds.includes(lessonId)){assert.equal(lesson.category,'app');assert.deepEqual(lesson.editions,['n23','n26']);assert.equal(lesson.steps.length,6);assert.equal(lesson.references.length,0)}
 for(const step of lesson.steps){
  steps++;const path=lessonId+'/'+step.id;
  bilingual(step.objective,path+' objective');bilingual(step.selfCheck,path+' self-check');
  assert(step.preparation.length>=1,path+' preparation');step.preparation.forEach(value=>bilingual(value,path+' preparation'));
  assert(step.walkthrough.length>=3,path+' has a concrete walkthrough');
  for(const item of step.walkthrough)for(const field of ['title','body','result'])bilingual(item[field],path+' walkthrough '+field);
  bilingual(step.workedExample.situation,path+' example situation');bilingual(step.workedExample.result,path+' example result');
  assert(step.workedExample.steps.length>=3,path+' example steps');step.workedExample.steps.forEach(value=>bilingual(value,path+' example step'));
  assert(step.pitfalls.length>=1,path+' troubleshooting');
  for(const issue of step.pitfalls){bilingual(issue.problem,path+' problem');bilingual(issue.fix,path+' fix')}
  if(step.exercise){
   exercises++;bilingual(step.exercise.hint,path+' hint');
   for(const option of step.exercise.options)bilingual(option.feedback,path+' option feedback');
   assert.equal(new Set(step.exercise.options.map(option=>option.feedback.en)).size,step.exercise.options.length,path+' options have distinct reasons');
  }
  if(newIds.includes(lessonId)){
   assert(step.body.ko.length>=65&&step.body.en.length>=120,path+' detailed base body');
   assert(step.bullets.length>=2,path+' reminders');
  }
 }
}
assert.equal(steps,66);assert.equal(exercises,22);
for(const before of original){
 const after=byId.get(before.id);assert(after,'Existing lesson is preserved');
 assert.deepEqual(after.steps.map(step=>step.id),before.steps.map(step=>step.id),'Existing step IDs preserve stored progress');
 for(const oldStep of before.steps){const updated=after.steps.find(step=>step.id===oldStep.id);if(oldStep.exercise){assert.equal(updated.exercise.correctOption,oldStep.exercise.correctOption);assert.deepEqual(updated.exercise.options.map(option=>[option.id,option.text]),oldStep.exercise.options.map(option=>[option.id,option.text]))}}
}
const step=(lesson,id)=>byId.get(lesson).steps.find(row=>row.id===id);
const apply=step('online-campaign','participant-apply');assert.match(apply.body.ko,/아이디와 비밀번호/);assert.doesNotMatch(apply.body.en,/sign in with ChatGPT/);assert.match(apply.body.en,/Neither email nor ChatGPT sign-in is required/);
assert.match(JSON.stringify(step('account-id-and-sync','create-id')),/3–32/);assert.match(JSON.stringify(step('account-id-and-sync','create-id')),/8–128/);
const attach=step('account-id-and-sync','attach-existing');assert.match(attach.workedExample.result.en,/do not merge automatically/);
const catalog=JSON.parse(fs.readFileSync(new URL('../dist/rules-data.json',import.meta.url),'utf8'));
const n23=id=>catalog.coreRules.find(rule=>rule.id==='n23-core-'+id).rule_data;
assert.equal(n23('action-economy').actions.Move,'Simple');assert.equal(n23('action-economy').actions.Shoot,'Basic');
assert.equal(n23('movement-terrain').difficult_terrain_distance_cost,2);
assert.match(step('n23-movement','movement-practice').workedExample.result.en,new RegExp((1+2*n23('movement-terrain').difficult_terrain_distance_cost)+' inches'));
assert.equal(n23('damage-and-injury').example.injury_dice,2);assert.match(step('n23-injury-recovery','damage-practice').workedExample.result.en,/answer is two/);
assert.equal(n23('advancement').chosen_secondary_skill_base_xp,12);assert.match(step('n23-postbattle-growth','xp').workedExample.steps.map(value=>value.en).join(' '),/18−12=6/);
assert.match(step('battle-records-workshop','session-or-report').workedExample.result.en,/settling one battle twice/);
assert.match(step('gang-equipment-workshop','purchase-audit').workedExample.result.en,/practice price/);
vm.runInNewContext(detail,context);
assert.deepEqual(JSON.parse(JSON.stringify(context.UK_TUTORIALS)),enhanced,'Reloading the content script is idempotent');
assert.doesNotMatch(detail,/battletablehobby|번역 합본|rulebook-enrichment|sediment:\/\//i);
console.log(`Foundation tutorial detail: ${existingIds.length} existing lessons and 3 shared workshops; ${steps} detailed steps, ${exercises} exercises with option feedback, no live record access, preserved progress IDs, edition facts and idempotent loading passed.`);
