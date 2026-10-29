/* Local original fiction. Preview history is session-only; game values never change. */
(function(){
'use strict';
const book=()=>window.MMFighterStoryData,history=new Map(),random=()=>{const v=new Uint32Array(1);crypto.getRandomValues(v);return v[0]/4294967296;};
function identity(f,g){
 const type=window.MMVerifiedRules?.modelType?.(f,g)||(RULES_DATA.fighterTypes||[]).find(t=>[f.fighterTypeId,f.catalogTypeId,f.presetId].includes(t.id));
 const house=window.MMVerifiedRules?.gangType?.(g)?.name||(RULES_DATA.gangTypes||[]).find(t=>[g.gangTypeId,g.gang_type_id].includes(t.id))?.name||g.faction;
 const sub=[...new Set([...(f.subtypes||[]),...(type?.fighter_subtypes||[])])];
 const kind=f.isVehicle||sub.includes('Vehicle')?'vehicle':/ambot|automata|servitor|cyber|robot/i.test(f.type||type?.name||'')?'machine':sub.some(s=>['Beast','Pet'].includes(s))?'beast':null;
 return {house,sub,kind};
}
function streamFor(f,g,language,options){
 if(options.history===false)return null;
 const key=JSON.stringify([g.id||g.name,f.id||f.name,language]);
 if(!history.has(key)){if(history.size>=96)history.delete(history.keys().next().value);history.set(key,{fields:Object.create(null),stories:[]});}
 return history.get(key);
}
function pick(pool,key,r,stream){
 const state=stream?(stream.fields[key]||{remaining:[],recent:[]}):null;
 if(state&&!state.remaining.length)state.remaining=pool.map((_,i)=>i);
 const poolIndexes=state?state.remaining:pool.map((_,i)=>i),fresh=state?poolIndexes.filter(i=>!state.recent.includes(i)):poolIndexes,available=fresh.length?fresh:poolIndexes;
 const v=Number(r()),n=Math.floor(Math.max(0,Math.min(.999999999,Number.isFinite(v)?v:0))*available.length),i=available[n];
 if(state){state.remaining=state.remaining.filter(index=>index!==i);state.recent=state.recent.concat(i).slice(-Math.min(2,pool.length-1));stream.fields[key]=state;}
 return pool[i];
}

function generate(f,g,options={}){
 const B=book(),en=(options.language||window.UKI18n?.language)==='en',language=en?'en':'ko',r=options.rng||random,identityData=identity(f,g),{house,sub,kind}=identityData,stream=streamFor(f,g,language,options);
 const name=f.name||(en?'The fighter':'이 파이터'),group=g.name||(en?'the gang':'갱'),text=pair=>pair[en?0:1].replace(/\{(name|gang)\}(으로|은|는|이|가|을|를|과|와|로)?/g,(_,key,particle)=>{const value=key==='name'?name:group;if(!particle)return value;const last=value.trim().codePointAt(value.trim().length-1),jong=last>=0xac00&&last<=0xd7a3?(last-0xac00)%28:({'0':21,'1':8,'3':16,'6':1,'7':8,'8':8}[value.trim().slice(-1)]||0),pairs={'은':['은','는'],'는':['은','는'],'이':['이','가'],'가':['이','가'],'을':['을','를'],'를':['을','를'],'과':['과','와'],'와':['과','와'],'으로':['으로','로'],'로':['으로','로']};return value+pairs[particle][(particle==='으로'||particle==='로')?(!jong||jong===8?1:0):jong?0:1];});
 function compose(){
  const pattern=pick([0,1,2,3,4,5],'structure',r,stream);
  if(kind){const pack=B.nonhuman[kind],origin=text(pick(pack.origins,kind+'-origin',r,stream)),event=text(pick(pack.episodes,kind+'-event',r,stream)),end=text(pick(pack.endings,kind+'-end',r,stream));return pattern%3===0?[origin,event,end].join('\n\n'):pattern%3===1?[event,origin+' '+end].join('\n\n'):[origin+' '+event,end].join('\n\n');}
  const faction=house==='House Cawdor'&&sub.includes('Fanatic')?'Cawdor Fanatic':house,pack=B.factions[faction]||B.factions.Outcasts;
  const focus=B.arcs[options.focus]?options.focus:pick(Object.keys(B.arcs),'focus',r,stream),arc=pick(B.arcs[focus],'episode-'+focus,r,stream),tone=B.tones[options.tone]?options.tone:pick(Object.keys(B.tones),'tone',r,stream);
  const origin=text(pick(pack.origins,'origin-'+faction,r,stream)),goal=text(pick(pack.goals,'goal-'+faction,r,stream)),persona=text(pick(B.personas,'persona',r,stream)),roleKey=sub.includes('Leader')?'Leader':sub.includes('Champion')?'Champion':sub.includes('Prospect')?'Prospect':'other',role=text(pick(B.roles[roleKey],'role-'+roleKey,r,stream)),mood=text(pick(B.tones[tone],'mood-'+tone,r,stream)),a=text(arc.setup),b=text(arc.turn),c=text(arc.end);
  const layouts=[
   [origin+' '+persona,a+' '+b,role+' '+c,goal+' '+mood],
   [a+' '+mood,origin+' '+role,b+' '+persona,c+' '+goal],
   [mood+' '+a,b,origin+' '+persona,role+' '+goal+' '+c],
   [origin,a+' '+b,c+' '+role,persona+' '+goal+' '+mood],
   [a+' '+b,persona+' '+origin,c+' '+mood,role+' '+goal],
   [persona+' '+origin,mood+' '+a,b+' '+role,goal+' '+c]
  ];return layouts[pattern].join('\n\n');
 }
 let story=compose();for(let n=0;n<8&&stream?.stories.includes(story);n++)story=compose();if(stream)stream.stories=stream.stories.concat(story).slice(-32);return story;
}
const label=(en,ko)=>`<span data-i18n-en="${esc(en)}" data-i18n-ko="${esc(ko)}">${esc(en)}</span>`;
function writable(f,g){return !!g&&!g.remoteReadOnly&&data.gangs.includes(g)&&g.fighters.includes(f);}
function open(){
 const f=currentFighter(),g=gang();if(!writable(f,g))return false;
 const owner=window.AccountParity?.account?.id,language=window.UKI18n?.language||'ko',kind=identity(f,g).kind;
 const choices=(name,title,values)=>`<label>${label(...title)}<select name="${name}" ${kind?'disabled':''}>${values.map(([value,en,ko])=>`<option value="${value}" data-i18n-en="${esc(en)}" data-i18n-ko="${esc(ko)}">${esc(en)}</option>`).join('')}</select></label>`;
 const tones=[['random','Surprise me','무작위'],['gritty','Gritty','거친 생존담'],['mystery','Mystery','미스터리'],['defiant','Defiant','저항과 희망'],['wry','Dark humour','블랙 유머']],focuses=[['random','Surprise me','무작위'],['debt','Debt & favours','빚과 은혜'],['rival','Rivalry','경쟁자'],['secret','A secret','숨겨진 비밀'],['loyalty','Loyalty','의리와 선택'],['ambition','Ambition','야망'],['survival','Survival','생존'],['identity','Identity','이름과 정체성'],['revenge','Unfinished business','복수와 원한']];
 formModal('Fighter Backstory',`<p class="wide">${label('Original fiction inspired by the fighter and gang. Changes to the saved story happen only when you save.','파이터와 갱에 어울리는 창작 이야기입니다. 저장 버튼을 눌러야 실제 배경에 반영됩니다.')}</p><details class="wide story-options"><summary>${label('Story options','분위기·주제 고르기')}</summary><div class="story-controls">`+choices('storyTone',['Tone','분위기'],tones)+choices('storyFocus',['Story focus','이야기 중심'],focuses)+`<p class="wide muted">${label(kind?'Creatures, machines and vehicles use dedicated events instead of human motives.':'Choose options, then generate again. Origins, central events and endings vary; recent selections are avoided.',kind?'생물·기계·차량은 사람의 동기 대신 각각의 전용 사건을 사용합니다.':'조건을 고른 뒤 다시 생성하세요. 출신·핵심 사건·결말이 달라지며 최근 조합은 피합니다.')}</p></div></details><div class="actions wide"><button type="button" class="btn" data-story-reroll>${label('Generate again','다시 생성')}</button></div><label class="wide">${label('Backstory','배경 이야기')}<textarea name="backstory" rows="14" maxlength="6000" data-user-text>${esc(generate(f,g,{language}))}</textarea></label>`,v=>{if(!writable(f,g)||window.AccountParity?.account?.id!==owner)return false;f.backstory=v.backstory;save();},'Save Backstory');
 const form=document.querySelector('#modal-form');form.querySelector('textarea').style.minHeight='300px';
 form.querySelector('[data-story-reroll]').onclick=()=>{form.elements.backstory.value=generate(f,g,{language:window.UKI18n?.language||language,tone:form.elements.storyTone.value,focus:form.elements.storyFocus.value});};
 const button=document.querySelector('#modal-submit');button.dataset.i18nEn='Save Backstory';button.dataset.i18nKo='배경 이야기 저장';window.UKI18n?.refresh();return true;
}
function decorate(){const edit=document.querySelector('.fighter-page [data-parity="fighter-backstory"]');if(!edit||edit.parentElement.querySelector('[data-story-generate]'))return;edit.insertAdjacentHTML('beforebegin',`<button type="button" class="btn small" data-story-generate data-parity="fighter-story-generate">${label('Random Backstory','무작위 작성')}</button>`);const button=edit.previousElementSibling,actions=document.createElement('div');actions.className='actions';actions.style.flexWrap='wrap';button.before(actions);actions.append(button,edit);button.disabled=!!gang()?.remoteReadOnly;const p=edit.closest('section')?.querySelector('p');if(p){if(currentFighter()?.backstory)p.dataset.userText='';else p.removeAttribute('data-user-text');p.style.whiteSpace='pre-wrap';}window.UKI18n?.refresh();}
window.addEventListener('click',e=>{if(!e.target.closest?.('[data-story-generate]'))return;e.preventDefault();e.stopImmediatePropagation();open();},true);const prior=render;render=function(...args){const result=prior.apply(this,args);decorate();return result;};const style=document.createElement('style');style.textContent='.story-options{margin:0}.story-options>summary{cursor:pointer;min-height:44px;padding:10px 12px;border:1px solid var(--line,#444);border-radius:5px}.story-controls{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;padding:16px 0 0}.story-controls>label{display:grid;gap:7px;min-width:0}.story-controls select{width:100%;min-width:0;min-height:44px;font-size:14px}.story-controls>p{grid-column:1/-1;font-size:12px;line-height:1.6;margin:0}';document.head.append(style);window.MMFighterStory={generate,open};decorate();
})();
