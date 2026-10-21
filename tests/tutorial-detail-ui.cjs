const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const root=path.resolve(__dirname,'../dist');
const dom=new JSDOM('<!doctype html><html><body><div id="app"><main class="main"><header class="topbar"></header><div class="crumb"></div><div class="content"></div></main></div></body></html>',{url:'https://test.chatgpt.site/learn/tutorials?edition=n26&lesson=workspace-basics&step=2',runScripts:'outside-only',pretendToBeVisual:true});
const w=dom.window,errors=[];Object.defineProperty(w,'innerWidth',{value:390});
w.addEventListener('error',event=>errors.push(event.message));w.alert=message=>{throw Error(message)};w.HTMLElement.prototype.scrollIntoView=function(){};
w.eval("var data={view:'learning',gangs:[{id:'keep-gang',name:'DO NOT CHANGE',fighters:[{id:'keep-fighter',xp:4}]}],campaigns:[{id:'keep-campaign',name:'DO NOT CHANGE CAMPAIGN'}]};var render=function(){};");
w.AccountParity={account:null};w.UKI18n={language:'ko',t:value=>value,refresh(){}};
w.eval(fs.readFileSync(path.join(root,'learning-tutorials.js'),'utf8'));
const base=w.UK_TUTORIALS.find(lesson=>lesson.id==='workspace-basics'),step=base.steps[2],bi=(ko,en)=>({ko,en});
// Structured fixture verifies the actual reader, disclosure state and escaping independently of lesson copy edits.
Object.assign(step,{
 objective:bi('판본을 맞추고 장비를 선택할 수 있습니다.','Choose equipment in the correct edition.'),
 preparation:[bi('N23 갱을 연 상태라고 가정하세요.','Assume an N23 gang is open.'),bi('가상 예산은 100크레딧입니다.','The imaginary budget is 100 credits.')],
 walkthrough:[
  {title:bi('판본 확인','Check edition'),body:bi('갱과 장비의 N23 표시를 비교하세요.','Compare the N23 labels on the gang and equipment.'),result:bi('두 판본이 같습니다.','Both editions match.')},
  {title:bi('비용 비교','Compare cost'),body:bi('장비 가격 25를 확인하세요.','Check the equipment price of 25.'),result:bi('잔액은 75입니다.','The remaining balance is 75.')},
  {title:bi('기록 확인','Check record'),body:bi('실제 구매를 실행하지 않고 결과만 확인합니다.','Inspect the expected result without making a real purchase.'),result:bi('실제 갱의 기록은 유지됩니다.','The real gang stays unchanged.')}
 ],
 workedExample:{situation:bi('가상 갱의 예산은 100입니다.','The imaginary gang has 100 credits.'),steps:[bi('N23 장비를 고릅니다.','Choose N23 equipment.'),bi('100 − 25 = 75를 계산합니다.','Calculate 100 − 25 = 75.')],result:bi('잔액 75, 실제 구매 없음.','75 credits remain, with no real purchase.')},
 pitfalls:[{problem:bi('다른 판본을 선택함','Selecting another edition'),fix:bi('판본 표시를 다시 확인합니다.','Check the edition label again.')}],
 selfCheck:bi('판본 일치와 잔액을 설명할 수 있나요?','Can you explain edition matching and the remaining balance?')
});
step.exercise.hint=bi('갱 이름 대신 판본 설정을 보세요.','Look at edition settings rather than the gang name.');
for(const option of step.exercise.options)option.feedback=option.id===step.exercise.correctOption?bi('판본부터 확인하는 선택입니다.','You checked the edition first.'):bi('같은 이름만으로는 판본이 같지 않습니다.','A matching name does not guarantee a matching edition.');
const original=JSON.stringify(w.eval('({gangs:data.gangs,campaigns:data.campaigns})'));
w.eval(fs.readFileSync(path.join(root,'learning-center.js'),'utf8'));
const q=selector=>w.document.querySelector(selector),qa=selector=>[...w.document.querySelectorAll(selector)],click=selector=>{const node=q(selector);assert(node,'Missing '+selector);node.click();return node},answer=id=>{const node=q('[data-learn-answer="'+id+'"]');node.checked=true;node.dispatchEvent(new w.Event('change',{bubbles:true}))};
(async()=>{
 assert(q('.ukl-step-objective').textContent.includes(step.objective.ko));
 assert.equal(qa('.ukl-preparation li').length,2);assert.equal(qa('.ukl-walkthrough>li').length,3);assert.equal(qa('.ukl-expected-result').length,3);
 assert(q('.ukl-self-check').textContent.includes(step.selfCheck.ko));
 assert(!q('[data-learn-toc]').open,'Mobile TOC starts collapsed');
 assert(!q('[data-learn-example]').open);assert(!q('[data-learn-pitfalls]').open);assert(q('.ukl-hint-content').hidden);
 q('[data-learn-example]').open=true;q('[data-learn-pitfalls]').open=true;
 click('[data-learn-hint-toggle]');assert.equal(q('[data-learn-hint-toggle]').getAttribute('aria-expanded'),'true');assert(!q('.ukl-hint-content').hidden);assert(q('[data-learn-example]').open,'Opening a hint preserves the expanded example');
 const wrong=step.exercise.options.find(option=>option.id!==step.exercise.correctOption);
 answer(wrong.id);assert(q('.ukl-feedback.is-incorrect'));assert(q('.ukl-option-feedback').textContent.includes(wrong.feedback.ko));assert(q('.ukl-answer-explanation').textContent.includes(step.exercise.explanation.ko));assert(q('[data-learn-next]').disabled);assert(q('[data-learn-example]').open);assert(q('[data-learn-pitfalls]').open);assert(!q('.ukl-hint-content').hidden);assert.equal(q('[data-learn-answer]:checked').value,wrong.id);
 answer(step.exercise.correctOption);assert(q('.ukl-feedback.is-correct'));assert(!q('[data-learn-next]').disabled);assert(q('.ukl-option-feedback').textContent.includes('판본부터'));
 click('[data-learn-next]');assert.equal(w.UKLearning.state.step,3);assert(w.UKLearning.progress.lessons['n26:workspace-basics'].done.includes(step.id));
 w.UKLearning.route('/learn/tutorials?edition=n26&lesson=workspace-basics&step=2');assert(q('.ukl-hint-content').hidden,'Hints reset when returning to another step');assert(!q('[data-learn-example]').open);assert.equal(q('[data-learn-answer]:checked').value,step.exercise.correctOption,'Stored answers remain stable');
 w.UKI18n.language='en';w.dispatchEvent(new w.Event('uk:languagechange'));assert(q('.ukl-step-objective').textContent.includes(step.objective.en));assert(!/[가-힣]/.test(q('.ukl-lesson-reader').textContent.replaceAll('한 / EN','Korean / EN')),'English detail UI uses English content');assert(!q('input[type=text]:focus,textarea:focus'),'Reader navigation does not summon a typing keyboard');
 // Strings in every added section are escaped rather than treated as active markup.
 const oldTitle=step.walkthrough[0].title;step.walkthrough[0].title=bi('<img src=x onerror=alert(1)>','<img src=x onerror=alert(1)>');w.UKLearning.refresh();assert.equal(qa('.ukl-walkthrough img').length,0);assert(q('.ukl-walkthrough').textContent.includes('<img'));step.walkthrough[0].title=oldTitle;
 w.UKLearning.route('/learn/tutorials?edition=n26');assert(q('.ukl-recommended'));assert(q('.ukl-lesson-meta').textContent.includes('guided steps'));
 const search=q('[data-learn-search]');search.value='remaining balance';search.dispatchEvent(new w.Event('input',{bubbles:true}));assert(qa('.ukl-lesson-card').some(card=>card.textContent.includes(base.title.en)),'Search finds detailed procedure text');
 w.UKLearning.route('/learn/tutorials?edition=n23');assert(qa('[data-learn-lesson]').every(link=>w.UK_TUTORIALS.find(lesson=>lesson.id===link.dataset.learnLesson).editions.includes('n23')),'N26-only lessons stay outside N23');
 w.UKLearning.route('/learn/tutorials?edition=n23&lesson=workspace-basics&step=2');assert.equal(q('[data-learn-answer]:checked'),null,'Answers remain edition-specific');
 assert.equal(JSON.stringify(w.eval('({gangs:data.gangs,campaigns:data.campaigns})')),original,'Practice and hints never change real game records');
 const css=fs.readFileSync(path.join(root,'learning-center.css'),'utf8');assert.match(css,/grid-template-columns:30px minmax\(0,1fr\)/);assert(css.includes('.ukl-hint-content[hidden]{display:none}'));assert(css.includes('.ukl-center[lang=ko] .ukl-lesson-reader{font-size:17px'));assert(css.includes('.ukl-center[lang=en] .ukl-lesson-reader{font-size:15px'));assert(css.includes('overflow-wrap:anywhere'));const styleDom=new JSDOM('<style>'+css+'</style>');assert(styleDom.window.document.styleSheets.length);styleDom.window.close();assert.equal(errors.length,0,errors.join('\n'));
 console.log('Detailed tutorial reader: goals, preparation, guided outcomes, collapsible examples/mistakes, contextual hints, answer-specific feedback, safe progress, deep search, mobile TOC, bilingual text and unchanged game records passed.');dom.window.close();
})().catch(error=>{console.error(error);dom.window.close();process.exitCode=1});
