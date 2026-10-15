/* Offline, reversible display localization. Canonical values and user records stay intact. */
(function(){
 'use strict';
 const KEY='underhive-korea-language',catalog=globalThis.UK_CATALOG_LOCALE||{},ui=globalThis.UK_UI_STRINGS||{};
 let language;try{language=localStorage.getItem(KEY)==='en'?'en':'ko';}catch{language='ko';}
 let queued=false,applying=false,protectedText=new Set();
 const textState=new WeakMap(),attributeState=new WeakMap(),rules=()=>globalThis.RULES_DATA||{};
 const enToKo=ui.enToKo||{},koToEn=ui.koToEn||{},names=catalog.names||{};
 const normalized=new Map(Object.entries(names).map(([key,value])=>[key.toLocaleLowerCase(),value]));
 const technical=/^(?:N23|N26|D3|D6|D66|2D6|WS|BS|AP|XP|TP|Ld|Cl|Wil|Int|[A-Z])(?:[+−-]?\d*)?$/;
 const reverseNames=new Map();for(const [key,value] of Object.entries(names)){if(!reverseNames.has(value))reverseNames.set(value,key);else if(reverseNames.get(value)!==key)reverseNames.set(value,null);}
 const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 function compile(template){let ids=[];const chunks=template.split(/(\{\d+\})/).map(part=>/^\{\d+\}$/.test(part)?(ids.push(part),'([\\s\\S]+?)'):escape(part));return {regex:new RegExp('^'+chunks.join('')+'$'),ids};}
 const patterns=(ui.patterns||[]).filter(x=>x.en&&x.ko).map(x=>({...x,enPattern:compile(x.en),koPattern:compile(x.ko)}));
 function phonetic(value){const text=String(value??'');if(technical.test(text))return text;return names[text]||catalog.phrases?.[text]||normalized.get(text.toLocaleLowerCase())||text;}
 function inlineKorean(text){return text.replace(/[A-Za-z][A-Za-z0-9'’+.-]*(?:[ \t]+[A-Za-z][A-Za-z0-9'’+.-]*)*/g,run=>{
   if(technical.test(run)||protectedText.has(run))return run;
   if(enToKo[run])return enToKo[run];if(names[run])return names[run];
   const tokens=run.split(' '),out=[];for(let i=0;i<tokens.length;){let chosen='',size=0;for(let n=Math.min(12,tokens.length-i);n>0;n--){const phrase=tokens.slice(i,i+n).join(' '),translated=enToKo[phrase]||names[phrase]||catalog.phrases?.[phrase];if(translated){chosen=translated;size=n;break;}}if(size){out.push(chosen);i+=size;}else{const token=tokens[i++];out.push(technical.test(token)?token:catalog.words?.[token.toLocaleLowerCase()]||token);}}return out.join(' ');
 });}
 function translate(raw,target=language){
   const text=String(raw??''),match=text.match(/^(\s*)([\s\S]*?)(\s*)$/),body=match[2];if(!body)return text;
   let result=body;
   if(body==='언더하이브 코리아'||body==='Underhive Korea')result=target==='ko'?'언더하이브 코리아':'Underhive Korea';
   else if(target==='ko'&&catalog.descriptionsKo?.[body])result=inlineKorean(catalog.descriptionsKo[body]);
   else if(target==='en'&&catalog.descriptionsEn?.[body])result=catalog.descriptionsEn[body];
   else if(target==='ko'&&enToKo[body])result=enToKo[body];
   else if(target==='en'&&koToEn[body])result=koToEn[body];
   else if(target==='ko'&&names[body])result=names[body];
   else if(body.includes('\n'))result=body.split('\n').map(line=>translate(line,target)).join('\n');
   else {
    let found=false;for(const pattern of patterns){const side=target==='ko'?pattern.enPattern:pattern.koPattern,hit=body.match(side.regex);if(!hit)continue;const substitutions={};side.ids.forEach((id,i)=>substitutions[id]=hit[i+1]);result=(target==='ko'?pattern.ko:pattern.en).replace(/\{\d+\}/g,id=>{const value=substitutions[id]??id;return target==='ko'&&!protectedText.has(value)?phonetic(value):value;});found=true;break;}
    if(!found&&target==='ko')result=inlineKorean(body);
    else if(!found&&target==='en'&&reverseNames.get(body))result=reverseNames.get(body);
   }
   return match[1]+result+match[3];
 }
 function collectProtected(){
   const set=new Set(),s=typeof data!=='undefined'?data:{};
   const protect=value=>{if(typeof value==='string'&&value.trim()){set.add(value);if(value.includes('<')){const el=document.createElement('div');el.innerHTML=value;set.add(el.textContent);}}};
   const fields=obj=>{for(const key of ['name','username','email','player','notes','backstory','privateNotes','houseRules'])protect(obj?.[key]);};
   fields(s.profile);fields(s.account);fields(window.AccountParity?.account);
   protect(window.AccountParity?.account?.contactEmail);protect(window.AccountParity?.account?.identityEmail);
   for(const name of window.AccountParity?.userNames||[])protect(name);
   for(const g of s.gangs||[]){fields(g);for(const f of g.fighters||[]){fields(f);for(const e of f.equipment||[])if(!e.catalogId&&!e.presetId){protect(e.name);protect(e.description);}}for(const e of g.stash||[])if(!e.catalogId&&!e.presetId)protect(e.name);for(const t of g.tactics||[])if(t.is_custom||!t.catalogId){protect(t.name);protect(t.description);}}
   for(const c of s.campaigns||[]){fields(c);protect(c.description);for(const row of [...(c.members||[]),...(c.battles||[]),...(c.sessions||[])])fields(row);for(const t of c.territories||[]){if(!t.territoryId)protect(t.name);if(t.descriptionOverride||t.description||t.notes){protect(t.description);protect(t.notes);}}}
   for(const rows of Object.values(s.customAssets||{}))if(Array.isArray(rows))for(const item of rows){fields(item);protect(item.description);}
   protectedText=set;
 }
 function userText(node,text){
   const el=node.parentElement;if(!el)return true;
   if(el.closest('[data-i18n-ignore],[data-user-text],[contenteditable="true"],.gt-note-content,.cp-rich-content,script,style,textarea,pre,code'))return true;
   if(!protectedText.has(text.trim()))return false;
   const control=el.closest('button,option,label');
   return !control||!!control.matches('[data-open-gang],[data-open-campaign],.mm-menu-user')||!!control.closest('[data-user-text]');
 }
 function translateNode(node){
   const current=node.nodeValue;if(!current?.trim()||userText(node,current))return;
   const parent=node.parentElement;let state=textState.get(node);
   if(!state||current!==state.output)state={base:current,output:current};
   if(parent.tagName==='OPTION'&&!parent.hasAttribute('value'))parent.setAttribute('value',parent.value);
   let output=parent.hasAttribute('data-i18n-catalog-name')?(language==='ko'?phonetic(parent.dataset.i18nCatalogName):parent.dataset.i18nCatalogName):parent.hasAttribute('data-i18n-ko')?(language==='ko'?parent.dataset.i18nKo:state.base):translate(state.base);
   if(parent.matches('.mmrr-korean-name,.mmrr-results h3 small')&&language==='ko')output=catalog.koAliases?.[state.base]||output;
   state.output=output;textState.set(node,state);if(current!==output)node.nodeValue=output;
 }
 function translateAttributes(el){
   if(el.closest('[data-i18n-ignore],[contenteditable="true"],script,style'))return;
   let records=attributeState.get(el);if(!records){records={};attributeState.set(el,records);}
   for(const name of ['placeholder','title','aria-label','alt']){
    if(!el.hasAttribute(name))continue;const current=el.getAttribute(name);if(!current||protectedText.has(current))continue;
    let state=records[name];if(!state||state.output!==current)state=records[name]={base:current,output:current};
    const explicit=el.getAttribute('data-i18n-ko-'+name),output=language==='ko'&&explicit?explicit:translate(state.base);
    state.output=output;if(current!==output)el.setAttribute(name,output);
   }
 }
 function mountSwitch(){
   const host=document.querySelector('.crumb');if(!host||host.querySelector('[data-uk-locale-toggle]'))return;
   const control=document.createElement('div');control.className='uk-language-switch';control.dataset.i18nIgnore='';control.setAttribute('role','group');control.setAttribute('aria-label','Language / 언어');
   control.innerHTML='<button type="button" data-uk-locale-toggle="ko" aria-label="한국어">한</button><span aria-hidden="true">/</span><button type="button" data-uk-locale-toggle="en" aria-label="English">EN</button>';
   const reference=host.querySelector('[data-mmrr-library]');if(reference)reference.before(control);else host.append(control);
 }
 function refresh(root=document.body){
   if(applying)return;applying=true;try{
    collectProtected();mountSwitch();document.documentElement.lang=language;document.documentElement.dataset.uiLanguage=language;
    document.title=language==='ko'?'언더하이브 코리아':'Underhive Korea';
    document.querySelectorAll('[data-uk-locale-toggle]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.ukLocaleToggle===language)));
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);nodes.forEach(translateNode);
    root.querySelectorAll?.('[placeholder],[title],[aria-label],img[alt]').forEach(translateAttributes);
    const manifest=document.querySelector('link[rel=manifest]');if(manifest)manifest.setAttribute('href',language==='en'?'/manifest-en.webmanifest':'/manifest.webmanifest');
   }finally{applying=false;}
 }
 function schedule(){if(queued)return;queued=true;queueMicrotask(()=>{queued=false;refresh();});}
 function setLanguage(value){if(!['ko','en'].includes(value))return false;language=value;try{localStorage.setItem(KEY,value);}catch{}refresh();window.dispatchEvent(new CustomEvent('uk:languagechange',{detail:{language}}));return true;}
 function matches(value,query){const q=String(query||'').toLocaleLowerCase().trim();if(!q)return true;const values=Array.isArray(value)?value:[value];return values.some(value=>[String(value||''),phonetic(value),translate(value,'ko'),translate(value,'en')].some(text=>text.toLocaleLowerCase().includes(q)));}
 function localizeRule(kind,row){if(!row)return row;const clone={...row},key=kind+':'+row.id;if(language==='en')clone.description=catalog.rulesEn?.[key]||catalog.descriptionsEn?.[row.description]||row.description;else clone.description=inlineKorean(row.description||'');clone.displayName=language==='ko'?phonetic(row.name||row.equipment_name||row.fighter_type||''):row.name;return clone;}
 document.addEventListener('click',event=>{const button=event.target.closest?.('[data-uk-locale-toggle]');if(!button)return;event.preventDefault();event.stopImmediatePropagation();setLanguage(button.dataset.ukLocaleToggle);},true);
 const previousRender=render;render=function(...args){const result=previousRender.apply(this,args);refresh();return result;};
 for(const method of ['alert','confirm'])if(typeof window[method]==='function'){const previous=window[method].bind(window);window[method]=message=>previous(translate(message));}
 new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['placeholder','title','aria-label','alt']});
 window.UKI18n={get language(){return language;},setLanguage,refresh,t:translate,name:phonetic,matches,localizeRule};refresh();
})();
