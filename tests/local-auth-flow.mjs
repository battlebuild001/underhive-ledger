import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import fs from 'node:fs';
import {handleApi} from '../worker/account-api.js';

const sql=new DatabaseSync(':memory:');sql.exec('PRAGMA foreign_keys=ON');
for(const file of fs.readdirSync(new URL('../drizzle/',import.meta.url)).filter(name=>name.endsWith('.sql')).sort())sql.exec(fs.readFileSync(new URL('../drizzle/'+file,import.meta.url),'utf8'));
class Statement{
 constructor(query,args=[]){this.query=query;this.args=args}
 bind(...args){return new Statement(this.query,args)}
 async first(){return sql.prepare(this.query).get(...this.args)||null}
 async all(){return {results:sql.prepare(this.query).all(...this.args)}}
 async run(){return {meta:{changes:sql.prepare(this.query).run(...this.args).changes}}}
}
const DB={prepare:query=>new Statement(query),async batch(statements){sql.exec('BEGIN');try{const result=[];for(const statement of statements)result.push(await statement.run());sql.exec('COMMIT');return result}catch(error){sql.exec('ROLLBACK');throw error}}};
const objects=new Map(),BUCKET={async put(key,bytes){objects.set(key,bytes.slice())},async get(key){return objects.has(key)?{body:objects.get(key)}:null},async delete(key){objects.delete(key)}};
function client(trustedId){
 const jar=new Map();let expectedAccount=null;
 return {jar,async raw(path,method='GET',body,extra={}){
  const binary=body instanceof Uint8Array;
  const headers={...(trustedId?{'oai-authenticated-user-id':trustedId,'oai-authenticated-user-email':trustedId+'@example.test'}:{}),...(body!==undefined?{'Content-Type':binary?'image/png':'application/json'}:{}),...(expectedAccount?{'X-UK-Account-ID':expectedAccount}:{}),Cookie:[...jar].map(([key,value])=>key+'='+value).join('; '),...extra};
  const response=await handleApi(new Request('https://test.chatgpt.site/api'+path,{method,headers,body:body===undefined?undefined:binary?body:JSON.stringify(body)}),{DB,BUCKET});
  for(const value of response.headers.getSetCookie()){const [pair]=value.split(';'),index=pair.indexOf('='),key=pair.slice(0,index),content=pair.slice(index+1);if(/Max-Age=0(?:;|$)/.test(value))jar.delete(key);else jar.set(key,content)}
  return response;
 },async call(...args){const response=await this.raw(...args);const result={status:response.status,...await response.json()};if(result.profile?.id)expectedAccount=result.profile.id;return result}};
}
const host=client('legacy-dispatch'),applicant=client(),anonymous=client();
const register=async(page,loginId)=>{const result=await page.call('/auth/register','POST',{loginId,password:'Test-password-928!'});assert.equal(result.status,201,result.error);assert.equal(result.profile.identityEmail,'');assert.equal(result.auth.method,'password');return result.profile.id};
const ownerId=await register(host,'온라인호스트'),applicantId=await register(applicant,'OnlinePlayer');
assert.notEqual(ownerId,'legacy-dispatch','An explicit ID signup cannot silently merge a ChatGPT profile');
assert.equal((await host.call('/account')).profile.id,ownerId,'Local cookie takes precedence over dispatched ChatGPT identity');
assert.equal((await applicant.call('/account')).auth.loginId,'OnlinePlayer');
const png=Uint8Array.from(Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+c9ZcAAAAASUVORK5CYII=','base64'));
const uploaded=await host.call('/uploads','POST',png);assert.equal(uploaded.status,201,uploaded.error);
assert.equal((await host.raw(uploaded.url.slice(4))).status,200,'Image elements authenticate through their HttpOnly cookie');
assert.equal((await applicant.raw(uploaded.url.slice(4))).status,404);
const gang=(id,name)=>({id,name,edition:'N23',fighters:[],credits:100,privateNotes:'private gang notes'});
const ownerGang=gang('host-gang','Host gang'),playerGang=gang('player-gang','Player gang');
const campaign={id:'password-campaign',name:'Password users campaign',edition:'N23',image:uploaded.url,members:[{id:'host-member',gangId:ownerGang.id}],battles:[],privateNotes:'private campaign notes'};
assert.equal((await host.call('/document','PUT',{revision:0,state:{gangs:[ownerGang],campaigns:[campaign]}})).revision,1);
assert.equal((await applicant.call('/document')).state,null,'New account cannot read the previous account document');
assert.equal((await applicant.call('/document','PUT',{revision:0,state:{gangs:[playerGang],campaigns:[]}})).revision,1);
let settings=await host.call('/campaign-enrollments/'+campaign.id);assert.equal(settings.status,200,settings.error);
settings=await host.call('/campaign-enrollments/'+campaign.id,'PUT',{enabled:true,maxPlayers:3,description:'Local login enrollment'});
assert.equal(settings.status,200,settings.error);const invite='/campaign-invites/'+settings.enrollment.code;
assert.equal((await anonymous.call(invite)).request,null);
const application=await applicant.call(invite+'/requests','POST',{gangId:playerGang.id,message:'Ready'});assert.equal(application.status,201,application.error);
assert.equal((await applicant.call(invite)).request.id,application.request.id,'Public invite preview resolves the local applicant cookie');
assert.equal((await anonymous.call(invite)).request,null,'Anonymous visitors never receive another applicant request');
settings=await host.call('/campaign-enrollments/'+campaign.id);
const approved=await host.call('/campaign-enrollments/'+campaign.id+'/requests/'+application.request.id+'/respond','POST',{action:'approve',revision:settings.enrollment.revision});
assert.equal(approved.status,200,approved.error);
const shared=await applicant.call('/campaigns/'+campaign.id);assert.equal(shared.status,200,shared.error);assert.equal(shared.role,'viewer');
assert(!JSON.stringify(shared.snapshot).includes('private gang notes'));
assert.equal((await applicant.raw(uploaded.url.slice(4))).status,200,'Approved local participant may read referenced campaign images');
assert.equal((await anonymous.raw(uploaded.url.slice(4))).status,401);

const cookieBeforeLogout=host.jar.get('__Host-uk-session');
assert.equal((await host.call('/auth/logout','POST',{})).status,200);
assert.equal(host.jar.has('__Host-uk-session'),false);
assert.equal((await host.call('/account')).status,401,'Logout cannot fall back to the still present ChatGPT header');
assert.equal((await host.call('/document')).status,401);
assert.equal((await host.call('/account','GET',undefined,{Cookie:'__Host-uk-session='+cookieBeforeLogout})).status,401,'Revoked local session cannot fall back to another provider');
assert.equal((await host.call('/auth/login','POST',{loginId:'온라인호스트',password:'Test-password-928!'})).profile.id,ownerId);
assert.equal((await host.call('/document')).state.campaigns[0].id,campaign.id);
sql.prepare('UPDATE auth_sessions SET expires_at=0 WHERE user_id=?').run(ownerId);
assert.equal((await host.call('/account')).status,401,'Expired session cannot silently switch to a different account');

const legacy=client('legacy-user');
const legacyProfile=(await legacy.call('/account')).profile;
const legacyState={gangs:[gang('old-gang','Preserved existing gang')],campaigns:[]};
await legacy.call('/document','PUT',{revision:0,state:legacyState});
const attached=await legacy.call('/auth/credentials','POST',{loginId:'LegacyLogin',password:'Test-password-948!'});
assert.equal(attached.status,200,attached.error);assert.equal(attached.profile.id,legacyProfile.id);
assert.equal((await legacy.call('/account')).profile.identityEmail,'legacy-user@example.test','Adding password login preserves identity metadata');
await legacy.call('/auth/logout','POST',{});
assert.equal((await legacy.call('/auth/login','POST',{loginId:'legacylogin',password:'Test-password-948!'})).profile.id,legacyProfile.id);
assert.deepEqual((await legacy.call('/document')).state,legacyState,'Explicit credential setup keeps existing gangs and document ownership');
await legacy.call('/account','PATCH',{username:'New display name'});
assert.equal((await legacy.call('/auth/session')).auth.loginId,'LegacyLogin','Changing display name cannot change the login ID');
assert.equal((await legacy.call('/auth/use-chatgpt','POST',{})).status,200);
const selectedProvider=await legacy.call('/account');
assert.equal(selectedProvider.profile.id,'legacy-user','Explicit provider selection may restore ChatGPT access');
assert.deepEqual(selectedProvider.auth,{method:'chatgpt',loginId:'LegacyLogin',hasPassword:true},'Selecting ChatGPT keeps the attached login ID metadata');
const blocked=await applicant.call('/document','PUT',{revision:1,state:{gangs:[],campaigns:[]}},{'X-UK-Account-ID':ownerId});assert.equal(blocked.status,409);assert.equal(blocked.accountChanged,true);assert.equal((await applicant.call('/document')).state.gangs[0].id,playerGang.id,'A stale tab cannot overwrite the newly selected account');
assert.equal((await applicant.call('/document','PUT',{revision:1,state:{gangs:[],campaigns:[]}},{'X-UK-Account-ID':''})).status,409,'Old tabs without an expected local identity cannot write into a password account');
assert.notEqual(ownerId,applicantId);
console.log('Password account integration: all APIs use cookie identity, account isolation, preserved legacy records, image permissions, online enrollment/approval, logout/expiry and explicit provider switching passed.');
