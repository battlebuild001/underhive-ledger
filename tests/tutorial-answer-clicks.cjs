const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {JSDOM}=require('jsdom');
const root=path.resolve(__dirname,'..'),dist=path.join(root,'dist');
const html=fs.readFileSync(path.join(dist,'index.html'),'utf8');
const scripts=[...html.matchAll(/<script src="\/([^"?]+)[^"]*"/g)].map(match=>match[1]);
const pages=[],delay=()=>new Promise(resolve=>setTimeout(resolve,15));
async function page(storage={}){
 const dom=new JSDOM(html.replace(/<script[^>]*>[\s\S]*?<\/script>/g,''),{url:'https://test.chatgpt.site/learn/tutorials?edition=n26&lesson=workspace-basics&step=2',runScripts:'dangerously',pretendToBeVisual:true});
 pages.push(dom);const w=dom.window,errors=[];
 for(const [key,value] of Object.entries(storage))w.localStorage.setItem(key,value);
 Object.defineProperty(w,'innerWidth',{value:390});w.structuredClone=structuredClone;
 w.matchMedia=()=>({matches:false,addListener(){},removeListener(){}});w.HTMLElement.prototype.scrollIntoView=function(){};
 w.alert=message=>{throw Error(message)};w.confirm=()=>true;w.addEventListener('error',event=>errors.push(event.message));
 w.fetch=async()=>new Response(JSON.stringify({error:'Sign in required'}),{status:401,headers:{'Content-Type':'application/json'}});
 for(const file of scripts){const script=w.document.createElement('script');script.textContent=fs.readFileSync(path.join(dist,file),'utf8');w.document.body.append(script)}
 for(let attempt=0;attempt<120&&w.AccountParity?.connecting;attempt++)await delay();
 assert.equal(w.AccountParity.connecting,false,'Account boot must settle before native input interaction');
 return {dom,w,errors};
}
const stored=w=>Object.fromEntries(Object.keys(w.localStorage).map(key=>[key,w.localStorage.getItem(key)]));
const gameState=w=>w.eval('JSON.stringify({gangs:data.gangs,campaigns:data.campaigns,tab:data.tab})');
function choice(w,id,part){
 const input=w.document.querySelector('[data-learn-answer="'+id+'"]');assert(input,'Missing answer '+id);
 const target=part==='radio'?input:part==='label'?input.closest('label'):input.closest('label').querySelector('span');
 // Use real click activation: setting checked + dispatching change bypasses the
 // browser's label/radio activation and misses a click handler replacing the DOM.
 target.click();
 assert.equal(w.document.querySelector('[data-learn-answer]:checked')?.value,id,'Native '+part+' click selects and preserves answer '+id);
}
(async()=>{
 const {w,errors}=await page(),original=gameState(w),lessons=w.UK_TUTORIALS;
 assert(scripts.indexOf('app.js')>=0&&scripts.indexOf('learning-center.js')>=0,'Use the actual full app script sequence');
 const uniqueExercises=lessons.flatMap(lesson=>lesson.steps.filter(step=>step.exercise));assert.equal(uniqueExercises.length,42);
 let cases=0;
 for(const language of ['ko','en']){
  w.UKI18n.setLanguage(language);
  for(const lesson of lessons)for(const edition of lesson.editions)for(let index=0;index<lesson.steps.length;index++){
   const step=lesson.steps[index],exercise=step.exercise;if(!exercise)continue;
   w.UKLearning.route('/learn/tutorials?edition='+edition+'&lesson='+lesson.id+'&step='+index);
   const wrong=exercise.options.filter(option=>option.id!==exercise.correctOption),key=edition+':'+lesson.id;
   const selections=[[wrong[0].id,'radio'],[exercise.correctOption,'label'],[wrong[1].id,'span'],[exercise.correctOption,'radio'],[wrong[0].id,'label'],[exercise.correctOption,'span']];
   for(const [id,part] of selections){
    choice(w,id,part);assert.equal(w.UKLearning.progress.lessons[key].answers[step.id],id,'Native choice reaches progress storage');
    const correct=id===exercise.correctOption;assert(w.document.querySelector('.ukl-feedback.'+(correct?'is-correct':'is-incorrect')),'Feedback is shown after a native click');
    assert.equal(w.document.querySelector('[data-learn-next]').disabled,!correct,'Only the correct choice enables continuation');
    assert.equal(w.document.querySelector('[data-learn-complete]').disabled,!correct);
   }
   w.document.querySelector('[data-learn-next]').click();
   assert(w.UKLearning.progress.lessons[key].done.includes(step.id),'Completion after a native choice is retained');
   assert.equal(w.UKLearning.state.lesson,index===lesson.steps.length-1?'':lesson.id);
   if(index<lesson.steps.length-1)assert.equal(w.UKLearning.state.step,index+1,'Continue opens the next step');
   assert.equal(gameState(w),original,'Answer clicks do not change real records or the gang tab');cases++;
  }
 }
 // Other native controls in this panel share the same app event boundaries.
 w.UKLearning.route('/learn/tutorials?edition=n26&lesson=workspace-basics&step=2');
 let example=w.document.querySelector('[data-learn-example]');assert(!example.open);example.querySelector('summary').click();
 assert(w.document.querySelector('[data-learn-example]').open,'Native details activation survives app click handling');
 w.UKLearning.route('/learn/rules?edition=n26');w.document.querySelector('[data-learn-bookmark]').click();
 const saved=w.document.querySelector('[data-learn-saved]');saved.click();assert(w.document.querySelector('[data-learn-saved]').checked,'Native saved-only checkbox stays checked');
 assert.equal(w.document.querySelectorAll('.ukl-rule').length,1,'Saved-only filter receives the native checkbox change');
 const editionSelect=w.document.querySelector('[data-learn-edition]');editionSelect.click();assert(editionSelect.isConnected,'Clicking the edition select does not replace it before native selection');
 editionSelect.value='n23';editionSelect.dispatchEvent(new w.Event('change',{bubbles:true}));assert.equal(w.UKLearning.state.edition,'n23');
 assert.equal(gameState(w),original);assert.equal(errors.length,0,errors.join('\n'));
 const snapshot=stored(w),reloaded=await page(snapshot),reload=reloaded.w;
 reload.UKLearning.route('/learn/tutorials?edition=n26&lesson=workspace-basics&step=2');
 assert.equal(reload.document.querySelector('[data-learn-answer]:checked')?.value,'1','Native selected answer survives a fresh page load');
 assert(!reload.document.querySelector('[data-learn-next]').disabled);assert(reload.UKLearning.progress.lessons['n26:workspace-basics'].done.includes('language-search'));
 assert.equal(reloaded.errors.length,0,reloaded.errors.join('\n'));
 console.log(`Tutorial native clicks: ${uniqueExercises.length} exercises, ${cases} bilingual edition cases; radio/label/text activation, feedback, gated next, reload progress, checkbox/select/details and unchanged game records passed.`);
})().catch(error=>{console.error(error);process.exitCode=1;}).finally(()=>{for(const dom of pages)dom.window.close()});
