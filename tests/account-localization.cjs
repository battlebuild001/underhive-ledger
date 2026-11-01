const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom');
const root=path.resolve(__dirname,'../dist'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const tick=()=>new Promise(resolve=>setTimeout(resolve,0));
async function until(test,label){for(let i=0;i<100;i++){if(test())return;await new Promise(resolve=>setTimeout(resolve,10))}throw Error('Timed out: '+label)}
(async()=>{
 const dom=new JSDOM(html.replace(/<script[^>]*>[\s\S]*?<\/script>/g,''),{url:'https://manager.test/account',runScripts:'dangerously',pretendToBeVisual:true}),w=dom.window,errors=[],requests=[];
 w.matchMedia=()=>({matches:false,addListener(){},removeListener(){}});w.structuredClone=structuredClone;w.HTMLElement.prototype.scrollIntoView=function(){};w.alert=()=>{};w.localStorage.setItem('underhive-korea-language','ko');w.addEventListener('error',event=>errors.push(event.message));
 const profile={id:'current',username:'Skills',identityEmail:'Combat@example.test',contactEmail:'Combat@example.test',createdAt:'2026-01-01T00:00:00Z',lastSignIn:'2026-10-29T00:00:00Z',preferences:{}},auth={method:'password',loginId:'Combat',hasPassword:true};
 const friends=[{id:'friend-combat',userId:'combat-user',username:'Combat',status:'accepted',direction:'incoming'},{id:'friend-owner',userId:'owner-user',username:'owner',status:'pending',direction:'incoming'},{id:'friend-skills',userId:'skills-user',username:'Skills',status:'pending',direction:'outgoing'}];
 const shared=[{id:'own',name:'Skills',ownerName:'owner',role:'owner',status:'accepted'},{id:'edit',name:'owner',ownerName:'Combat',role:'editor',status:'pending'},{id:'view',name:'Combat',ownerName:'Skills',role:'viewer',status:'accepted'}];
 const members=[{userId:'skills-user',username:'Skills',role:'owner',status:'accepted'},{userId:'owner-user',username:'owner',role:'editor',status:'pending'},{userId:'combat-user',username:'Combat',role:'viewer',status:'accepted'}];
 const canonical=JSON.stringify({profile,auth,friends,shared,members});let cloudState;
 w.fetch=async(route,options={})=>{const url=new URL(route,w.location.href);requests.push({path:url.pathname,method:options.method||'GET',body:options.body});let body;
  if(url.pathname==='/api/account')body={profile,auth};
  else if(url.pathname==='/api/auth/session')body={auth};
  else if(url.pathname==='/api/document')body={revision:1,state:cloudState};
  else if(url.pathname==='/api/friends')body={friends};
  else if(url.pathname==='/api/notifications')body={notifications:[]};
  else if(url.pathname==='/api/campaign-shares')body={campaigns:shared};
  else if(url.pathname==='/api/campaign-shares/own/members')body={members};
  else if(url.pathname==='/api/users')body={users:members.map(m=>({id:m.userId,username:m.username}))};
  else throw Error('Unexpected request '+url.pathname);
  return new Response(JSON.stringify(body),{headers:{'Content-Type':'application/json'}});
 };
 for(const [,name]of html.matchAll(/<script src="\/([^"?]+)[^"]*"/g)){if(name==='account-parity.js'){cloudState=JSON.parse(w.eval('JSON.stringify(data)'));cloudState.view='account';}const script=w.document.createElement('script');script.textContent=fs.readFileSync(path.join(root,name),'utf8');w.document.body.append(script);}
 const q=selector=>w.document.querySelector(selector),qa=selector=>[...w.document.querySelectorAll(selector)],click=selector=>{const node=q(selector);assert(node,'Missing '+selector);node.click();return node};
 await until(()=>w.AccountParity?.ready&&q('[data-account-share-members]'),'account boot');
 const originalRecords=w.eval('JSON.stringify(data)');
 assert.equal(q('[data-account-login-id]').textContent,'Combat','Login ID is an identity, even if it matches a catalog name');
 assert(q('[data-account-login-id]').hasAttribute('data-user-text'));
 assert.deepEqual(qa('.account-friend [data-user-text]').map(node=>node.textContent),['Combat']);
 assert.equal(q('[data-account-share-members]').closest('.account-list-row').querySelector('small').textContent,'owner · 소유자');
 assert.match(q('[data-account-campaign-answer="edit"]').closest('.account-list-row').querySelector('small').textContent,/^Combat · 편집자 · 초대 대기$/);
 assert.equal(q('[data-account-friend-answer="friend-owner"]').closest('.account-list-row').querySelector('small').textContent,'(요청 대기)');
 click('[data-account-share-members="own"]');await until(()=>q('[data-account-member-remove]'),'members dialog');
 const memberNames=()=>qa('.modal-bg [data-user-text]').map(node=>node.textContent);
 assert.deepEqual(memberNames(),['Skills','owner','Combat']);
 const labels=()=>qa('.modal-bg [data-account-member-label] [data-i18n-en]').map(node=>node.textContent);
 assert.deepEqual(labels(),['소유자','참가 중','편집자','초대 대기','열람자','참가 중']);
 for(const language of ['en','ko','en']){w.UKI18n.setLanguage(language);await tick();assert.deepEqual(memberNames(),['Skills','owner','Combat']);assert.deepEqual(labels(),language==='en'?['Owner','Accepted','Editor','Pending','Viewer','Accepted']:['소유자','참가 중','편집자','초대 대기','열람자','참가 중']);assert.deepEqual(qa('[data-account-member-remove]').map(node=>node.dataset.accountMemberRemove),['own|owner-user','own|combat-user'],'Canonical operation IDs are unchanged');}
 click('#modal-close');await tick();assert.equal(q('.modal-bg'),null);
 click('[data-account-friend-remove="friend-combat"]');await tick();assert.equal(q('.modal-bg [data-user-text]').textContent,'Combat');assert.match(q('.modal-bg').textContent,/Remove this user from your friends/);w.UKI18n.setLanguage('ko');await tick();assert.equal(q('.modal-bg [data-user-text]').textContent,'Combat');assert.match(q('.modal-bg').textContent,/친구 목록에서 삭제할까요/);click('#modal-cancel');await tick();
 const search=q('#account-user-search');search.value='Skills';search.dispatchEvent(new w.Event('input',{bubbles:true}));await until(()=>q('[data-account-send-friend]'),'search results');assert.deepEqual(qa('#account-search-results [data-user-text]').map(node=>node.textContent),['Skills','owner','Combat']);
 click('[data-account-action="username"]');const editor=q('#account-edit-value');editor.value='owner Combat Skills';editor.dispatchEvent(new w.Event('input',{bubbles:true}));editor.focus();editor.setSelectionRange(2,7);
 for(const language of ['en','ko','en']){w.UKI18n.setLanguage(language);await tick();assert.equal(q('#account-edit-value'),editor,'Locale switch preserves the actual input node');assert.equal(editor.value,'owner Combat Skills');assert.equal(w.document.activeElement,editor);assert.equal(editor.selectionStart,2);assert.equal(editor.selectionEnd,7);}
 click('[data-account-action="edit-cancel"]');await tick();assert.equal(q('#account-inline-form'),null);assert.equal(q('[data-account-login-id]').textContent,'Combat');
 assert.equal(w.eval('JSON.stringify(data)'),originalRecords,'Display-only changes preserve saved application records');assert.equal(JSON.stringify({profile,auth,friends,shared,members}),canonical,'Role/status and identity API records remain canonical');assert(requests.every(request=>request.method==='GET'),'The flow performs no account or role writes');assert.deepEqual(errors,[]);
 dom.window.close();console.log('Account localization: protected identities, friend/shared/member role and status round trips, unchanged operation IDs/state, search results, safe removal confirmation, and unsaved input/focus preservation passed.');
})().catch(error=>{console.error(error);process.exitCode=1});
