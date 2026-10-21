import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';

const files=['learning-tutorials.js','tutorial-detail-foundations.js','tutorial-detail-n26.js'];
const read=file=>readFile(new URL('../dist/'+file,import.meta.url),'utf8');
const sources=await Promise.all(files.map(read)),context={};
for(const key of ['document','localStorage','sessionStorage','navigator','fetch','AccountParity','data'])Object.defineProperty(context,key,{get(){throw Error('Tutorial content must not access application state: '+key)}});
vm.createContext(context);vm.runInContext(sources[0],context);
const original=JSON.parse(JSON.stringify(context.UK_TUTORIALS));
for(const source of sources.slice(1))vm.runInContext(source,context);
const expanded=JSON.parse(JSON.stringify(context.UK_TUTORIALS));
assert.equal(expanded.length,21);assert.equal(expanded.flatMap(lesson=>lesson.steps).length,126);
for(const prior of original){
 const lesson=expanded.find(item=>item.id===prior.id);assert(lesson,'Existing lesson remains: '+prior.id);
 assert.deepEqual(lesson.editions,prior.editions,'Existing edition scope stays stable');
 assert.deepEqual(lesson.steps.map(step=>step.id),prior.steps.map(step=>step.id),'Existing progress IDs and order stay stable');
 for(const step of prior.steps){
  const current=lesson.steps.find(value=>value.id===step.id);
  if(!step.exercise){assert(!current.exercise,'Already completed reading steps must not gain a new answer gate');continue}
  assert.equal(current.exercise.correctOption,step.exercise.correctOption,'Saved correct answers stay valid');
  assert.deepEqual(current.exercise.options.map(option=>option.id),step.exercise.options.map(option=>option.id),'Saved choice IDs stay valid');
 }
}
const bilingual=(value,path)=>{for(const locale of ['ko','en'])assert(typeof value?.[locale]==='string'&&value[locale].trim(),path+' needs '+locale);};
let procedureCount=0,exampleCount=0,pitfallCount=0;
for(const lesson of expanded)for(const step of lesson.steps){
 const path=lesson.id+'/'+step.id;bilingual(step.objective,path+'.objective');
 assert(step.preparation.length>=1,path+' gives preparation');step.preparation.forEach(value=>bilingual(value,path+'.preparation'));
 assert(step.walkthrough.length>=3,path+' has a concrete sequence');
 for(const instruction of step.walkthrough){for(const field of ['title','body','result'])bilingual(instruction[field],path+'.walkthrough.'+field);procedureCount++}
 bilingual(step.workedExample.situation,path+'.example.situation');bilingual(step.workedExample.result,path+'.example.result');
 assert(step.workedExample.steps.length>=2,path+' explains how to reach the example result');
 step.workedExample.steps.forEach(value=>bilingual(value,path+'.example.step'));exampleCount++;
 assert(step.pitfalls.length>=1,path+' explains a possible mistake');
 for(const pitfall of step.pitfalls){bilingual(pitfall.problem,path+'.mistake');bilingual(pitfall.fix,path+'.fix');pitfallCount++}
 bilingual(step.selfCheck,path+'.selfCheck');
 if(step.exercise){bilingual(step.exercise.hint,path+'.hint');for(const option of step.exercise.options)bilingual(option.feedback,path+'.feedback');assert.equal(new Set(step.exercise.options.map(option=>option.feedback.en)).size,step.exercise.options.length,path+' explains each choice individually')}
}
const ids=expanded.map(lesson=>lesson.id);assert.equal(new Set(ids).size,ids.length);
for(const id of ['account-id-and-sync','gang-equipment-workshop','battle-records-workshop']){
 const lesson=expanded.find(value=>value.id===id);assert(lesson);assert.deepEqual(lesson.editions,['n23','n26']);assert.equal(lesson.category,'app');
}
const participant=expanded.find(lesson=>lesson.id==='online-campaign').steps.find(step=>step.id==='participant-apply');
assert.doesNotMatch(participant.body.en,/sign in with ChatGPT/i,'Campaign applicants can use ID/password sign-in');
assert.doesNotMatch(JSON.stringify(expanded),/sediment:\/\/|file_[a-f\d]{20,}|battletablehobby|\.(?:pdf|docx)\b|pdf_page|book_page|source_errata/i);
for(const source of sources.slice(1))vm.runInContext(source,context);
assert.deepEqual(JSON.parse(JSON.stringify(context.UK_TUTORIALS)),expanded,'Supplemental content can load twice without duplicate lessons or changed learning facts');

const html=await read('index.html'),scripts=[...html.matchAll(/<script src="\/([^"?]+)[^"]*"/g)].map(match=>match[1]);
for(let index=1;index<files.length;index++)assert(scripts.indexOf(files[index])>scripts.indexOf(files[index-1]),'Detailed content loads after the base curriculum');
assert(scripts.indexOf('learning-center.js')>scripts.indexOf(files.at(-1)),'The reader starts after all lesson content');
console.log(`Detailed tutorials: 21 bilingual lessons, 126 examples, ${procedureCount} guided instructions, ${pitfallCount} explained mistakes, 42 exercises, stable progress IDs and actual index loading passed.`);
