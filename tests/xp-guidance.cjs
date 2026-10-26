const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom');
const root=path.resolve(__dirname,'../dist'),html=fs.readFileSync(path.join(root,'index.html'),'utf8'),tick=()=>new Promise(resolve=>setTimeout(resolve,0));

(async()=>{
  const dom=new JSDOM(html.replace(/<script[^>]*>[\s\S]*?<\/script>/g,''),{url:'https://local.test/',runScripts:'dangerously',pretendToBeVisual:true}),w=dom.window,errors=[];
  w.matchMedia=()=>({matches:false,addListener(){},removeListener(){}});w.structuredClone=structuredClone;w.HTMLElement.prototype.scrollIntoView=function(){};
  w.fetch=async()=>({ok:false,status:401,json:async()=>({error:'Test account is offline'})});w.alert=message=>{throw Error(message)};w.confirm=()=>false;w.addEventListener('error',event=>errors.push(event.message));
  for(const match of html.matchAll(/<script src="\/([^"?]+)[^"]*"/g)){const script=w.document.createElement('script');script.textContent=fs.readFileSync(path.join(root,match[1]),'utf8');w.document.body.append(script);}
  await tick();await tick();
  const q=selector=>w.document.querySelector(selector),run=source=>w.eval(source),tap=selector=>{const node=q(selector);assert(node,'Missing '+selector);node.click();return node;},field=name=>q('#modal-form [name="'+name+'"]');
  const change=(name,value)=>{const node=field(name);assert(node,'Missing '+name);if(node.type==='checkbox')node.checked=!!value;else node.value=value;node.dispatchEvent(new w.Event('input',{bubbles:true}));node.dispatchEvent(new w.Event('change',{bubbles:true}));};
  assert(w.MMContextHelp,'Production context-help runtime is loaded');
  const shared=['xp.serious-injury','xp.out-of-action','xp.priority-target','xp.wreck-vehicle','xp.assistance','xp.misc','xp.participation','xp.manual-total','xp.cumulative'];
  for(const edition of ['N23','N26']){
    run(`data.view='fighter';data.selectedFighter=gang().fighters[0].id;gang().edition='${edition}';currentFighter().xp=20;currentFighter().kills=3;save();addXp(currentFighter())`);
    await tick();
    const form=q('#modal-form'),keys=[...shared,edition==='N23'?'xp.rally':'xp.objective'],controls=[...form.querySelectorAll('input[name^="count_"]')],badge=q('.modal-head .fp-credit b').textContent;
    assert.equal(controls.length,edition==='N23'?7:6,'Edition-specific XP counters retained');
    assert.equal(!!field('objective'),edition==='N26','Objective checkbox is N26 only');
    assert.equal(!!q('.modal-bg [data-mm-help="xp.rally"]'),edition==='N23','Rally guidance follows the existing N23 counter');
    tap('[data-fp="xp-plus"][data-sub="1"]');assert.equal(field('amount').value,'2','OOA award math unchanged');
    change('participation',true);if(edition==='N26')change('objective',true);
    change('count_'+(controls.length-1),1);change('reason','Draft XP reason / 임시 사유');change('amount','7');
    const saved=run('JSON.stringify({xp:currentFighter().xp,kills:currentFighter().kills,history:currentFighter().xpHistory})');
    const draft=()=>JSON.stringify([...form.elements].filter(node=>node.name).map(node=>[node.name,node.value,node.checked]));
    const beforeDraft=draft();
    for(const key of keys){
      const trigger=q('.modal-bg [data-mm-help="'+key+'"]');assert(trigger,'XP guidance exists: '+key);assert.equal(trigger.type,'button');assert.equal(trigger.dataset.mmHelpEdition,edition.toLowerCase());assert.equal(trigger.getAttribute('aria-haspopup'),'dialog');assert(!trigger.closest('label'),'Help is outside checkbox/count labels');
      assert(w.MMContextHelp.lookup(key,{edition:edition.toLowerCase()}),'XP explanation registered: '+key);
      trigger.focus();trigger.click();await tick();
      assert(q('.mmrr-overlay .mmrr-dialog.uk-context-help'),'Context explanation opens: '+key);assert(q('#mmrr-title').textContent.trim(),'Explanation has a title');assert.equal(q('#modal-form'),form,'Original XP form is retained');assert.equal(draft(),beforeDraft,'Opening help preserves all XP draft values');
      tap('.mmrr-overlay [data-mmrr-close]');await tick();
      assert(!q('.mmrr-overlay'),'Help closes without closing the XP dialog');assert.equal(q('#modal-form'),form);assert.equal(draft(),beforeDraft,'Closing help preserves all XP draft values');assert.equal(w.document.activeElement,trigger,'Focus returns to the help button');
      assert.equal(run('JSON.stringify({xp:currentFighter().xp,kills:currentFighter().kills,history:currentFighter().xpHistory})'),saved,'Help never awards XP or increments OOA');
      assert.equal(q('.modal-head .fp-credit b').textContent,badge,'Current XP badge is unchanged');
    }
    // A language switch updates the explanation without recreating the form or losing an override.
    w.UKI18n.setLanguage('ko');tap('.modal-bg [data-mm-help="xp.out-of-action"]');await tick();const titleKo=q('#mmrr-title').textContent;
    w.UKI18n.setLanguage('en');await tick();assert.notEqual(q('#mmrr-title').textContent,titleKo,'Explanation switches into English');assert.equal(q('#modal-form'),form);assert.equal(draft(),beforeDraft);
    w.UKI18n.setLanguage('ko');await tick();assert.equal(q('#mmrr-title').textContent,titleKo);tap('.mmrr-overlay [data-mmrr-close]');
    assert.equal(field('amount').value,'7','Manual XP override survives all guidance interactions');tap('#modal-submit');await tick();
    assert.equal(run('currentFighter().xp'),27,'Exactly the manual override is awarded');assert.equal(run('currentFighter().kills'),4,'Existing OOA counter increment remains intact');
    assert.equal(run('currentFighter().xpHistory[0].reason'),'Draft XP reason / 임시 사유');assert.equal(run('currentFighter().xpHistory[0].participation'),true);assert.equal(run('currentFighter().xpHistory[0].objective'),edition==='N26');
  }
  assert.equal(errors.length,0,errors.join('\n'));dom.window.close();
  console.log('PASS: Production XP guidance covers every N23/N26 counter, preserves drafts and checkboxes, restores focus, translates, and retains award math and manual overrides');
})().catch(error=>{console.error(error.stack);process.exitCode=1});
