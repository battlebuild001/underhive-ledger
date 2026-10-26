const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom');
const root=path.resolve(__dirname,'../dist'),html=fs.readFileSync(path.join(root,'index.html'),'utf8'),tick=()=>new Promise(resolve=>setTimeout(resolve,0));

(async()=>{
  const markup=html.replace(/<script[^>]*>[\s\S]*?<\/script>/g,'').replace(/<link rel="stylesheet" href="\/([^"?]+)[^"]*">/g,(_,file)=>`<style data-test-stylesheet="${file}">${fs.readFileSync(path.join(root,file),'utf8')}</style>`);
  const dom=new JSDOM(markup,{url:'https://manager.test/',runScripts:'outside-only',pretendToBeVisual:true}),w=dom.window,context=dom.getInternalVMContext(),errors=[];
  w.structuredClone=structuredClone;w.matchMedia=()=>({matches:false,addListener(){},removeListener(){}});w.HTMLElement.prototype.scrollIntoView=function(){};
  w.fetch=async()=>({ok:false,status:401,json:async()=>({error:'Test account is offline'})});w.alert=message=>{throw Error(message)};w.confirm=()=>false;
  w.localStorage.setItem('underhive-korea-language','ko');w.addEventListener('error',event=>errors.push(event.message));
  Object.defineProperties(w,{innerWidth:{value:320,writable:true,configurable:true},innerHeight:{value:568,writable:true,configurable:true}});
  for(const match of html.matchAll(/<script src="\/([^"?]+)[^"]*"/g))vm.runInContext(fs.readFileSync(path.join(root,match[1]),'utf8'),context,{filename:match[1]});
  await tick();await tick();
  const run=source=>vm.runInContext(source,context),q=selector=>w.document.querySelector(selector),style=node=>w.getComputedStyle(node),click=selector=>{const node=q(selector);assert(node,'Missing '+selector);node.click();return node;};
  const records=run('JSON.stringify({gangs:data.gangs,campaigns:data.campaigns})');
  const open=async(overrides={})=>{const trigger=q('[data-action="menu"]');assert(trigger);trigger.getBoundingClientRect=()=>({left:w.innerWidth-44,right:w.innerWidth-4,top:16,bottom:56,width:40,height:40,...overrides});trigger.click();await tick();const menu=q('.mm-settings-menu');assert(menu,'Settings trigger opens the dropdown');return menu;};

  for(const language of ['ko','en']){
    w.UKI18n.setLanguage(language);await tick();
    const menu=await open();
    assert.equal(menu.getAttribute('role'),'menu');assert.equal(menu.querySelector('.mm-menu-social'),null,'The complete social row is removed');
    assert(!/discord|patreon|github|mundamanager/i.test(menu.outerHTML),'No removed external social link survives in either language');
    const rows=[...menu.children].filter(node=>node.matches('button,a'));
    assert.equal(rows.length,6,'Profile, account, gangs, campaigns, assets and logout remain available');
    for(const row of rows){
      assert.equal(row.getAttribute('role'),'menuitem');
      if(row.classList.contains('mm-menu-user'))continue;
      assert(row.querySelector(':scope > .mm-menu-icon svg'),'Every navigation row has a fixed SVG icon');
      assert(row.querySelector(':scope > .mm-menu-label'),'Every navigation row has a separate label');
      assert.equal(style(row).display,'grid');assert.equal(style(row).gridTemplateColumns.replace(/\s/g,''),'20pxminmax(0,1fr)');
      const icon=row.querySelector('.mm-menu-icon');assert.equal(style(icon).width,'20px');assert.equal(style(icon).height,'20px');
      assert.equal(parseFloat(style(row.querySelector('.mm-menu-label')).minWidth),0,'Labels can shrink inside the grid');
    }
    assert.equal(menu.querySelector('.mm-menu-learning,a[href^="/learn"]'),null,'Rulebook/tutorial menu entry is removed');
    assert(!/Rules Guide|Quick Sheet|Tutorial|룰 가이드|튜토리얼|학습/.test(menu.textContent),'Removed learning labels do not appear in either language');
    const menuRules=[...w.document.styleSheets].flatMap(sheet=>[...sheet.cssRules]).filter(rule=>rule.selectorText==='.mm-settings-menu');
    assert(menuRules.some(rule=>/^min\(300px,/.test(rule.style.width)&&rule.style.width.includes('100vw')&&rule.style.width.includes('-24px')),'Menu has a fluid viewport-bounded width');
    assert(menuRules.some(rule=>/calc\(100vw\s*-\s*24px\)/.test(rule.style.maxWidth)),'Menu retains its maximum viewport width');
    assert.equal(menu.style.top,'64px');assert.equal(menu.style.right,'12px','Right anchor retains the mobile viewport margin');
    assert.equal(parseFloat(menu.style.maxHeight),492,'Available dropdown height excludes anchor and bottom margin');
    assert.equal(style(menu).overflowY,'auto','Short viewports can scroll the menu itself');
    w.document.activeElement.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));assert.equal(q('.mm-settings-menu'),null);assert.equal(w.document.activeElement,q('[data-action="menu"]'),'Escape restores menu trigger focus');
  }

  // Rotation and viewport changes discard the old anchor before the next open.
  await open();w.dispatchEvent(new w.Event('resize'));assert.equal(q('.mm-settings-menu'),null);
  await open();w.dispatchEvent(new w.Event('orientationchange'));assert.equal(q('.mm-settings-menu'),null);
  w.innerHeight=240;const shortMenu=await open();assert.equal(parseFloat(shortMenu.style.maxHeight),164);w.document.body.click();assert.equal(q('.mm-settings-menu'),null,'An outside click dismisses the menu');w.innerHeight=568;
  w.innerWidth=393;const leftAnchored=await open({left:0,right:40});assert.equal(leftAnchored.style.right,'81px','An anchor near the left also clamps the menu inside the viewport');w.document.body.click();w.innerWidth=320;

  for(const [target,view,tab] of [['gangs','dashboard','gangs'],['campaigns','dashboard','campaigns'],['customassets','catalog',null]]){
    await open();click(`.mm-settings-menu [data-shell="nav"][data-value="${target}"]`);await tick();assert.equal(run('data.view'),view);if(tab)assert.equal(run('data.homeTab'),tab);assert.equal(q('.mm-settings-menu'),null);
  }
  await open();click('.mm-settings-menu [data-shell="profile"]');await tick();assert.equal(run('data.view'),'profile');assert(q('.mm-profile'));assert.equal(q('.mm-settings-menu'),null);
  await open();click('.mm-settings-menu [data-account-action="open"]');await tick();assert.equal(run('data.view'),'account');assert(q('.account-card'));assert.equal(q('.mm-settings-menu'),null);
  await open();assert.equal(q('.mm-menu-learning'),null);w.document.body.click();
  w.history.replaceState({},'','/learn/tutorials?edition=n26');w.dispatchEvent(new w.PopStateEvent('popstate'));await tick();assert.equal(w.location.pathname,'/');assert.equal(run('data.view'),'dashboard');assert.equal(q('.ukl-center'),null);assert.equal(q('.mm-settings-menu'),null);
  assert.equal(run('JSON.stringify({gangs:data.gangs,campaigns:data.campaigns})'),records,'Menu actions and localization preserve all gang and campaign records');
  assert.deepEqual(errors,[]);dom.window.close();
  console.log('PASS: settings menu social-row removal, bilingual aligned labels and SVG icons, responsive containment, dismissal/focus, original navigation and unchanged records.');
})().catch(error=>{console.error(error.stack);process.exitCode=1});
