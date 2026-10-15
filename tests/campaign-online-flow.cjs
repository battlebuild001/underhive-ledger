const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {DatabaseSync}=require('node:sqlite');
const {JSDOM}=require('jsdom');
const root=path.resolve(__dirname,'..');
const pause=()=>new Promise(resolve=>setTimeout(resolve,15));
async function ready(test,label){for(let attempt=0;attempt<120;attempt++){if(test())return;await pause()}throw Error('Timed out: '+label)}

(async()=>{
 const {handleApi}=await import(path.join(root,'worker/account-api.js'));
 const sql=new DatabaseSync(':memory:');sql.exec('PRAGMA foreign_keys=ON');
 for(const file of fs.readdirSync(path.join(root,'drizzle')).filter(file=>file.endsWith('.sql')).sort())sql.exec(fs.readFileSync(path.join(root,'drizzle',file),'utf8'));
 class Statement{
  constructor(query,args=[]){this.query=query;this.args=args}
  bind(...args){return new Statement(this.query,args)}
  async first(){return sql.prepare(this.query).get(...this.args)||null}
  async all(){return {results:sql.prepare(this.query).all(...this.args)}}
  async run(){return {meta:{changes:sql.prepare(this.query).run(...this.args).changes}}}
 }
 const DB={prepare:query=>new Statement(query),async batch(statements){sql.exec('BEGIN');try{const result=[];for(const statement of statements)result.push(await statement.run());sql.exec('COMMIT');return result}catch(error){sql.exec('ROLLBACK');throw error}}};
 const pages=[];
 const html=fs.readFileSync(path.join(root,'dist/index.html'),'utf8');
 const files=[...html.matchAll(/<script src="\/([^"?]+)[^"]*"/g)].map(match=>match[1]);
 assert(files.includes('campaign-enrollment.js'),'The real index must load online enrollment');
 const storageOf=page=>Object.fromEntries(Object.keys(page.w.localStorage).map(key=>[key,page.w.localStorage.getItem(key)]));
 async function page(user,url='/',storage={}){
  const dom=new JSDOM(html.replace(/<script[^>]*>[\s\S]*?<\/script>/g,''),{url:'https://test.chatgpt.site'+url,runScripts:'dangerously',pretendToBeVisual:true});
  const w=dom.window,errors=[],alerts=[];pages.push(dom);
  for(const [key,value]of Object.entries(storage))w.localStorage.setItem(key,value);
  w.localStorage.setItem('underhive-korea-language','en');
  w.structuredClone=structuredClone;w.matchMedia=()=>({matches:false,addListener(){},removeListener(){}});w.HTMLElement.prototype.scrollIntoView=function(){};
  w.alert=message=>alerts.push(message);w.confirm=()=>true;w.addEventListener('error',event=>errors.push(event.message));
  w.fetch=async(route,options={})=>handleApi(new Request(new URL(route,w.location.href),{...options,headers:{...options.headers,...(user?{'oai-authenticated-user-id':user,'oai-authenticated-user-email':user+'@example.test'}:{})}}),{DB});
  for(const file of files){const script=w.document.createElement('script');script.textContent=fs.readFileSync(path.join(root,'dist',file),'utf8');w.document.body.append(script)}
  const q=selector=>w.document.querySelector(selector),click=selector=>{const button=q(selector);assert(button,'Missing control '+selector);assert(!button.disabled,'Control is disabled '+selector);button.click()};
  const state=()=>JSON.parse(w.eval('JSON.stringify(data)'));
  if(user)await ready(()=>w.AccountParity?.ready,'signed-in account '+user);else await ready(()=>q('.enroll-public-card'),'anonymous recruitment page');
  return {dom,w,q,click,state,errors,alerts};
 }
 try{
  const owner=await page('host');
  owner.w.eval("data.gangs=[{...data.gangs[0],id:'same-source-id',name:'Organizer gang',privateNotes:'host gang secret',private_notes:'host legacy secret'}];data.campaigns=[];data.view='dashboard';save();");
  owner.click('[data-action="new-campaign"]');
  const campaignType=owner.q('#modal-form [name="campaignType"]').closest('[data-mm-combo]');
  campaignType.querySelector('[data-mm-trigger]').click();campaignType.querySelector('[data-mm-pick]:not([data-mm-pick=""])').click();
  owner.q('#modal-form [name="name"]').value='Online recruitment campaign';owner.click('#modal-submit');
  await ready(()=>owner.state().campaigns.length===1,'campaign created through UI');
  const campaignId=owner.state().campaigns[0].id;
  owner.w.eval("campaign().privateNotes='host campaign secret';campaign().members=[{id:'organizer-member',gangId:'same-source-id',player:'Host',role:'Arbitrator'}];save();");
  await owner.w.AccountParity.ensureSynced();
  owner.click('[data-enrollment-open]');
  await ready(()=>owner.q('#enrollment-settings')&&!owner.q('[data-enrollment-action="owner-save"]').disabled,'recruitment controls loaded');
  owner.q('#enrollment-settings [name="enabled"]').checked=true;
  owner.q('#enrollment-settings [name="maxPlayers"]').value='4';
  owner.q('#enrollment-settings [name="description"]').value='Bring a gang to the hive.';
  owner.click('[data-enrollment-action="owner-save"]');
  await ready(()=>owner.q('[data-enrollment-feedback]')?.textContent.includes('Settings saved'),'recruitment enabled');
  const joinURL=new URL(owner.q('.enroll-share-link').href),code=joinURL.pathname.split('/').pop();
  assert.match(code,/^[a-f0-9]{32}$/);
  const anonymous=await page(null,joinURL.pathname);
  await ready(()=>anonymous.q('a[href^="/signin-with-chatgpt"]'),'anonymous sign-in link');
  assert.equal(anonymous.w.location.pathname,joinURL.pathname,'Account boot must not overwrite the invite route');
  assert.equal(new URL(anonymous.q('a[href^="/signin-with-chatgpt"]').href).searchParams.get('return_to'),joinURL.pathname);
  assert(!anonymous.q('#app').textContent.includes('secret'),'Public preview excludes private campaign and roster notes');
  assert(!anonymous.q('.sidebar'),'Join page is independent of personal workspace');

  const applicant=await page('applicant');
  applicant.w.eval("data.gangs=[{...data.gangs[0],id:'same-source-id',name:'Applicant gang',credits:123,privateNotes:'applicant gang secret',private_notes:'applicant legacy secret',fighters:data.gangs[0].fighters.map(f=>({...f,privateNotes:'applicant fighter secret'}))},{...data.gangs[0],id:'different-edition',name:'Wrong edition',edition:'N26'},{...data.gangs[0],id:'borrowed',name:'Borrowed roster',remoteOwnerId:'other',remoteReadOnly:true}];data.campaigns=[];data.view='dashboard';save();");
  await applicant.w.AccountParity.ensureSynced();
  applicant.w.history.pushState({},'',joinURL.pathname);applicant.w.render();
  await ready(()=>applicant.q('#enrollment-join-form'),'authenticated join form');
  const choices=[...applicant.q('[name="gangId"]').options];assert.deepEqual(choices.map(option=>option.value),['same-source-id'],'Only the applicant’s compatible owned gang is selectable');
  applicant.q('[name="gangId"]').value='same-source-id';
  applicant.q('[name="message"]').value='Ready for the campaign.';
  applicant.click('[data-enrollment-action="join-submit"]');
  await ready(()=>applicant.q('[data-enrollment-action="withdraw"]'),'application submitted');
  assert.equal(applicant.w.location.pathname,joinURL.pathname);
  const before=await applicant.w.AccountParity.api('/campaign-invites/'+code);
  const enrolledId='enrolled-'+before.request.id;
  owner.click('[data-enrollment-action="owner-refresh"]');
  await ready(()=>owner.q('[data-enrollment-action="approve"]')&&!owner.q('[data-enrollment-action="approve"]').disabled,'owner sees applicant');
  assert(owner.q('.enroll-request').textContent.includes('Applicant gang'));
  owner.click('[data-enrollment-action="approve"]');
  await ready(()=>owner.q('.enroll-status-approved')&&!owner.q('[data-enrollment-action="approve"]'),'owner approved via UI');
  let shared=await owner.w.AccountParity.api('/campaigns/'+campaignId);
  assert(shared.snapshot.gangs.some(gang=>gang.id==='same-source-id'&&gang.name==='Organizer gang'),'Original organizer roster is retained despite matching source IDs');
  const accepted=shared.snapshot.gangs.find(gang=>gang.id===enrolledId);assert(accepted,'Approved roster receives a namespaced snapshot ID');
  assert.equal(accepted.sourceGangId,'same-source-id');assert.equal(accepted.sourceOwnerId,'applicant');assert.equal(accepted.remoteReadOnly,true);
  assert(shared.snapshot.campaign.members.some(member=>member.gangId===enrolledId&&member.ownerId==='applicant'));
  assert(!JSON.stringify(shared.snapshot).includes('secret'),'No nested private notes leak into shared records');
  assert.equal(owner.state().campaigns.find(campaign=>campaign.id===campaignId).privateNotes,'host campaign secret','Owner refresh preserves personal campaign notes');
  assert.equal(owner.state().gangs.find(gang=>gang.id==='same-source-id').privateNotes,'host gang secret','Import keeps the owner’s original private roster');
  assert.equal(owner.state().gangs.find(gang=>gang.remoteSnapshotId===enrolledId).remoteReadOnly,true);
  owner.click('#modal-submit');

  applicant.click('[data-enrollment-action="join-retry"]');
  await ready(()=>applicant.q('[data-enrollment-action="open-campaign"]')&&!applicant.q('[data-enrollment-action="open-campaign"]').disabled,'applicant sees approval');
  applicant.click('[data-enrollment-action="open-campaign"]');
  await ready(()=>applicant.w.location.pathname==='/campaigns/'+campaignId,'approved participant opens campaign');
  assert.equal(applicant.state().view,'campaign');assert.equal(applicant.state().campaigns[0].remoteRole,'viewer');
  const personal=applicant.state().gangs.find(gang=>gang.id==='same-source-id');
  assert.equal(personal.name,'Applicant gang');assert.equal(personal.privateNotes,'applicant gang secret');assert(!personal.remoteReadOnly,'Opening the shared campaign preserves the editable personal roster');
  assert(applicant.state().campaigns[0].members.some(member=>member.ownerId==='applicant'&&member.gangId===personal.id),'Own membership points to the personal source roster');
  assert.equal(applicant.state().gangs.filter(gang=>gang.sourceOwnerId==='applicant'&&gang.remoteReadOnly).length,0,'Own roster is not duplicated as a read-only imported roster');
  applicant.w.eval("data.gangs.find(g=>g.id==='same-source-id').credits=321;data.gangs.find(g=>g.id==='same-source-id').privateNotes='updated applicant secret';save();");
  await applicant.w.AccountParity.ensureSynced();
  shared=await owner.w.AccountParity.api('/campaigns/'+campaignId);
  assert.equal(shared.snapshot.gangs.find(gang=>gang.id===enrolledId).credits,321,'Player source changes reach shared server state');
  assert(!JSON.stringify(shared.snapshot).includes('secret'));
  await owner.w.AccountParity.refreshShared(campaignId,{navigate:false});
  assert.equal(owner.state().gangs.find(gang=>gang.remoteSnapshotId===enrolledId).credits,321,'Owner refresh updates the imported read-only roster');
  const personalServer=await applicant.w.AccountParity.api('/document');assert.equal(personalServer.state.gangs.find(gang=>gang.id==='same-source-id').privateNotes,'updated applicant secret');

  owner.w.eval("campaign().members=campaign().members.filter(m=>m.ownerId!=='applicant');save();");
  await owner.w.AccountParity.publishCampaign(campaignId);
  shared=await owner.w.AccountParity.api('/campaigns/'+campaignId);
  assert(shared.snapshot.campaign.members.some(member=>member.gangId===enrolledId),'Organizer publishing stale members cannot erase an approved participant');
  assert.equal(shared.snapshot.gangs.find(gang=>gang.id===enrolledId).credits,321);
  await owner.w.AccountParity.refresh();
  owner.click('[data-account-action="open"]');
  await ready(()=>owner.q('[data-account-share-members="'+campaignId+'"]'),'shared campaign membership controls');
  owner.click('[data-account-share-members="'+campaignId+'"]');
  await ready(()=>owner.q('[data-account-member-remove="'+campaignId+'|applicant"]'),'approved participant removal control');
  owner.click('[data-account-member-remove="'+campaignId+'|applicant"]');
  await ready(()=>!owner.q('.modal-bg'),'participant access revoked');
  await assert.rejects(applicant.w.AccountParity.api('/campaigns/'+campaignId),error=>error.status===403,'Removed participants lose server access');
  applicant.w.eval("data.gangs.find(g=>g.id==='same-source-id').credits=999;save();");
  await applicant.w.AccountParity.ensureSynced();
  shared=await owner.w.AccountParity.api('/campaigns/'+campaignId);
  assert(!shared.snapshot.gangs.some(gang=>gang.id===enrolledId),'Further source saves cannot restore revoked campaign access');
  const signedOut=await page(null,joinURL.pathname,storageOf(applicant));
  await ready(()=>signedOut.w.localStorage.getItem('underhive-ledger-v1-cloud')===null&&signedOut.state().gangs.length===0,'expired identity clears active account cache');
  await ready(()=>signedOut.q('a[href^="/signin-with-chatgpt"]'),'signed-out invite keeps its public sign-in entry');
  assert.equal(signedOut.w.location.pathname,joinURL.pathname);
  assert.equal(signedOut.w.AccountParity.account,null);assert.equal(signedOut.w.AccountParity.ready,false);
  assert(!signedOut.q('#app').textContent.includes('Applicant gang'),'Public view does not expose the previous account roster');
  assert(!signedOut.q('#app').textContent.includes('secret'),'Public view does not expose previous private notes');
  const activeCache=JSON.parse(signedOut.w.localStorage.getItem('underhive-ledger-v1'));
  assert.equal(activeCache.gangs.length,0);assert.equal(activeCache.campaigns.length,0);
  const preserved=JSON.parse(signedOut.w.localStorage.getItem('underhive-ledger-v1-account-backup-applicant'));
  assert.equal(preserved.gangs.find(gang=>gang.id==='same-source-id').privateNotes,'updated applicant secret','Expired identity retains a recoverable personal backup');
  const returned=await page('applicant','/',storageOf(signedOut));
  assert.equal(returned.w.AccountParity.account.id,'applicant');
  const restored=returned.state().gangs.find(gang=>gang.id==='same-source-id');
  assert.equal(restored.privateNotes,'updated applicant secret','Signing in again restores the correct private server records');assert.equal(restored.credits,999);
  assert.equal(JSON.parse(returned.w.localStorage.getItem('underhive-ledger-v1-cloud')).userId,'applicant');
  for(const page of [owner,applicant,anonymous,signedOut,returned]){assert.deepEqual(page.errors,[],'No uncaught UI errors');assert.deepEqual(page.alerts,[],'No unexpected alerts')}
  console.log('Campaign online flow: real index, worker and SQL migrations; public sign-in link, owned gang application, host approval, shared roster isolation, preserved source notes, two-account updates, publish protection, revocation and signed-out cache isolation/recovery passed.');
 }finally{for(const page of pages)page.window.close();sql.close()}
})().catch(error=>{console.error(error);process.exitCode=1});
