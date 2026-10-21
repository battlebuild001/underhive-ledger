import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import { handleLocalAuth, resolveLocalIdentity, resolveRequestIdentity, shouldUseSitesIdentity } from '../worker/local-auth.js';

const origin='https://test.chatgpt.site';
const sql=new DatabaseSync(':memory:');
sql.exec('PRAGMA foreign_keys=ON');
for(const file of fs.readdirSync(new URL('../drizzle/',import.meta.url)).filter(x=>x.endsWith('.sql')).sort())sql.exec(fs.readFileSync(new URL('../drizzle/'+file,import.meta.url),'utf8'));
class Statement{
 constructor(query,args=[]){this.query=query;this.args=args;}
 bind(...args){return new Statement(this.query,args);}
 async first(){return sql.prepare(this.query).get(...this.args)||null;}
 async all(){return {results:sql.prepare(this.query).all(...this.args)};}
 async run(){const result=sql.prepare(this.query).run(...this.args);return {meta:{changes:result.changes}};}
}
// D1 serializes each batch transaction. Serialize this adapter too, so overlapping
// requests exercise application races without overlapping SQLite transactions.
let previousBatch=Promise.resolve();
const DB={prepare:query=>new Statement(query),batch(statements){
 const result=previousBatch.then(async()=>{
  sql.exec('BEGIN');
  try{const results=[];for(const statement of statements)results.push(await statement.run());sql.exec('COMMIT');return results;}
  catch(error){sql.exec('ROLLBACK');throw error;}
 });
 previousBatch=result.catch(()=>{});return result;
}};
const credential=(loginKey)=>sql.prepare('SELECT * FROM local_credentials WHERE login_key=?').get(loginKey);
const count=(table)=>sql.prepare('SELECT count(*) AS total FROM '+table).get().total;
function request(path,{method='GET',body,cookies,headers={},url=origin}={}){
 return new Request(url+'/api/auth'+path,{method,headers:{...(body!==undefined?{'Content-Type':'application/json'}:{}),...(cookies?{Cookie:cookies}:{}),'CF-Connecting-IP':'192.0.2.1',...headers},body:body!==undefined?JSON.stringify(body):undefined});
}
async function call(path,options={}){
 const response=await handleLocalAuth(request(path,options),{DB});
 const body=await response.json();
 return {response,status:response.status,body,cookies:response.headers.getSetCookie().map(value=>value.split(';')[0]).join('; ')};
}
const password='Private passphrase!42';
const post=(body,cookies,headers)=>({method:'POST',body,cookies,headers});

assert.equal(await handleLocalAuth(new Request(origin+'/api/account'),{DB}),null);
assert.equal((await call('/session')).status,401);
assert.equal((await handleLocalAuth(request('/session'),{})).status,503);
assert.equal((await call('/not-a-route')).status,404);
assert.equal((await call('/register')).status,404);
assert.equal((await call('/register',post({loginId:'two',password:'short'}))).status,400);
assert.equal((await call('/register',post({loginId:'no spaces',password}))).status,400);
assert.equal((await call('/register',post({loginId:'ab',password}))).status,400);
assert.equal((await call('/register',post({loginId:'invalid',password:'x'.repeat(129)}))).status,400);
assert.equal((await call('/register',post({loginId:'OriginBad',password},undefined,{Origin:'https://foreign.test'}))).status,403);
assert.equal((await call('/register',post({loginId:'FetchBad',password},undefined,{'Sec-Fetch-Site':'cross-site'}))).status,403);
assert.equal((await call('/register',{...post({loginId:'HTTPBad',password}),url:'http://test.chatgpt.site'})).status,400);
assert.equal((await call('/register',post({loginId:'TooLarge',password,padding:'x'.repeat(9000)}))).status,413);
assert.equal((await call('/register',post({loginId:'DeclaredLarge',password},undefined,{'Content-Length':'9001'}))).status,413);
assert.equal((await handleLocalAuth(new Request(origin+'/api/auth/register',{method:'POST',body:'{}'}),{DB})).status,415);
assert.equal((await handleLocalAuth(new Request(origin+'/api/auth/register',{method:'POST',headers:{'Content-Type':'application/json'},body:'{' }),{DB})).status,400);
assert.equal(count('profiles'),0,'Rejected input must not create profiles');

const registration=await call('/register',post({loginId:'  Ａｌｐｈａ  ',password}));
assert.equal(registration.status,201);
const firstId=registration.body.profile.id;
assert.match(firstId,/^local-[a-f0-9-]+$/);
assert.equal(registration.body.profile.username,'Alpha');
assert.equal(registration.body.profile.contactEmail,'');
assert.equal(registration.body.profile.identityEmail,'');
assert.deepEqual(registration.body.auth,{method:'password',loginId:'Alpha',hasPassword:true});
const saved=credential('alpha');
assert.equal(saved.password_iterations,100000);
assert.equal(saved.password_version,1);
assert.match(saved.password_salt,/^[a-f0-9]{32}$/);
assert.match(saved.password_hash,/^[a-f0-9]{64}$/);
assert(!JSON.stringify(registration.body).includes(password),'Credentials must never appear in API responses');
for(const stored of sql.prepare('SELECT * FROM local_credentials').all())assert(!Object.values(stored).includes(password),'Plaintext passwords must never be stored');
const setCookies=registration.response.headers.getSetCookie();
assert.equal(setCookies.length,2);
for(const value of setCookies){assert.match(value,/^__Host-/);assert.match(value,/; Path=\//);assert.match(value,/; HttpOnly/);assert.match(value,/; Secure/);assert.match(value,/; SameSite=Lax/);assert(!value.includes('Domain='));}
const token=registration.cookies.match(/__Host-uk-session=([^;]+)/)[1];
assert.equal(token.length,43);
assert(!JSON.stringify(sql.prepare('SELECT * FROM auth_sessions').all()).includes(token),'Only a token hash may be persisted');
assert.equal(registration.response.headers.get('cache-control'),'no-store');
assert.equal((await call('/session',{cookies:registration.cookies})).body.profile.id,firstId);
assert.deepEqual(await resolveLocalIdentity(request('/session',{cookies:registration.cookies}),DB),{id:firstId,email:'',authMethod:'password',loginId:'Alpha'});
assert.equal((await call('/register',post({loginId:'aLPHa',password}))).status,409);
assert.equal(count('profiles'),1,'Duplicate login ID cannot orphan a profile');
assert.equal((await call('/login',post({loginId:'ALPHA',password}))).status,200);
const wrong=await call('/login',post({loginId:'Alpha',password:'Wrong Password!'}));
const unknown=await call('/login',post({loginId:'Unknown',password:'Wrong Password!'}));
assert.equal(wrong.status,401);assert.equal(unknown.status,401);assert.deepEqual(wrong.body,unknown.body,'Wrong passwords and unknown IDs have the same login error');

const second=await call('/register',post({loginId:'Second',password}));
assert.equal(second.status,201);
assert.notEqual(credential('second').password_hash,saved.password_hash,'Same password must receive independently salted hashes');
assert.notEqual(credential('second').password_salt,saved.password_salt);
const spaces=await call('/register',post({loginId:'한글아이디',password:'  Keep spaces!  '}));
assert.equal(spaces.status,201);
assert.equal((await call('/login',post({loginId:'한글아이디',password:'Keep spaces!'}))).status,401);
assert.equal((await call('/login',post({loginId:'한글아이디',password:'  Keep spaces!  '}))).status,200,'Passwords are not trimmed');

const trusted={'oai-authenticated-user-id':'existing-site-user','oai-authenticated-user-email':'owner@example.test'};
const original=await call('/session',{headers:trusted});
assert.equal(original.status,200);assert.equal(original.body.auth.method,'chatgpt');assert.equal(original.body.auth.hasPassword,false);
const originalId=original.body.profile.id;
sql.prepare('INSERT INTO documents(user_id,state,revision,updated_at) VALUES(?,?,?,?)').run(originalId,'{"gangs":[{"id":"retained"}],"campaigns":[]}',7,new Date().toISOString());
assert.equal((await call('/credentials',post({loginId:'Attach',password}))).status,401);
const attached=await call('/credentials',post({loginId:'Attach',password},undefined,trusted));
assert.equal(attached.status,200);assert.equal(attached.body.profile.id,originalId);assert.equal(attached.body.profile.username,original.body.profile.username);
assert.equal(attached.body.profile.identityEmail,'owner@example.test');
assert.equal(sql.prepare('SELECT revision FROM documents WHERE user_id=?').get(originalId).revision,7,'Attaching credentials keeps existing documents');
assert.equal((await resolveLocalIdentity(request('/session',{cookies:attached.cookies}),DB)).email,'owner@example.test','Attached password identity preserves original email for legacy profile code');
assert.equal((await call('/credentials',post({loginId:'AttachAgain',password},undefined,trusted))).status,409);
assert.equal((await call('/credentials',post({loginId:'OtherAttach',password},registration.cookies,trusted))).status,401,'A local session cannot attach to a concurrently dispatched ChatGPT identity');
assert.equal((await call('/login',post({loginId:'Attach',password}))).body.profile.id,originalId);
const distinct=await call('/register',post({loginId:'Separate',password},undefined,trusted));
assert.equal(distinct.status,201);assert.notEqual(distinct.body.profile.id,originalId,'Registration never implicitly links an existing Sites identity');

for(const cookies of ['__Host-uk-auth-mode=local','__Host-uk-session=invalid','__Host-uk-session=']){
 assert.equal(shouldUseSitesIdentity(request('/session',{cookies})),false);
 assert.equal(await resolveRequestIdentity(request('/session',{cookies,headers:trusted}),DB),null,'Local auth state never silently reveals a different Sites account');
}
const duplicates='__Host-uk-session='+token+'; __Host-uk-session='+token;
assert.equal(await resolveRequestIdentity(request('/session',{cookies:duplicates,headers:trusted}),DB),null,'Ambiguous duplicate session cookies cannot authenticate');
assert.equal((await call('/session',{cookies:registration.cookies,headers:trusted})).body.profile.id,firstId,'Password identity takes precedence over Sites headers');
const expired=await call('/login',post({loginId:'Second',password}));
sql.prepare('UPDATE auth_sessions SET expires_at=0 WHERE user_id=?').run(second.body.profile.id);
assert.equal((await call('/session',{cookies:expired.cookies,headers:trusted})).status,401,'Expired sessions do not fall through to another account');
const logout=await call('/logout',{method:'POST',cookies:registration.cookies,headers:trusted});
assert.equal(logout.status,200);assert.match(logout.cookies,/__Host-uk-auth-mode=local/);
assert.equal((await call('/session',{cookies:registration.cookies,headers:trusted})).status,401,'Logout revokes the server session immediately');
assert.equal((await call('/session',{cookies:logout.cookies,headers:trusted})).status,401,'Logout keeps explicit local mode');
const backToSites=await call('/use-chatgpt',{method:'POST',cookies:attached.cookies});
assert.equal(backToSites.status,200);
assert(backToSites.response.headers.getSetCookie().every(value=>value.includes('Max-Age=0')));
assert.equal((await call('/session',{headers:trusted})).body.profile.id,originalId,'Sites identity is available after explicit provider switch');
assert.equal((await call('/session',{cookies:attached.cookies})).status,401,'Provider switch revokes the old local session');

const firstSession=await call('/login',post({loginId:'Alpha',password}));
const otherSession=await call('/login',post({loginId:'Alpha',password}));
assert.equal((await call('/change-password',post({currentPassword:password,newPassword:'Replacement!43'}))).status,401);
assert.equal((await call('/change-password',post({currentPassword:'Wrong Password!',newPassword:'Replacement!43'},firstSession.cookies))).status,401);
const changed=await call('/change-password',post({currentPassword:password,newPassword:'Replacement!43'},firstSession.cookies));
assert.equal(changed.status,200);
assert.equal(credential('alpha').password_version,2);
assert.notEqual(credential('alpha').password_salt,saved.password_salt);
assert.equal((await call('/session',{cookies:firstSession.cookies})).status,401);
assert.equal((await call('/session',{cookies:otherSession.cookies})).status,401,'Password change revokes every other session');
assert.equal((await call('/session',{cookies:changed.cookies})).body.profile.id,firstId);
assert.equal((await call('/login',post({loginId:'Alpha',password}))).status,401);
assert.equal((await call('/login',post({loginId:'Alpha',password:'Replacement!43'}))).status,200);
const staleToken='z'.repeat(43),staleHash=Buffer.from(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(staleToken))).toString('hex');
sql.prepare('INSERT INTO auth_sessions(token_hash,user_id,password_version,expires_at,created_at) VALUES(?,?,?,?,?)').run(staleHash,firstId,1,Math.floor(Date.now()/1000)+3600,Math.floor(Date.now()/1000));
assert.equal((await call('/session',{cookies:'__Host-uk-session='+staleToken})).status,401,'Even a present old-version session cannot authenticate');

sql.exec('DELETE FROM auth_rate_limits');
const beforeProfiles=count('profiles');
const collision=await Promise.all([call('/register',post({loginId:'Concurrent',password})),call('/register',post({loginId:'CONCURRENT',password}))]);
assert.deepEqual(collision.map(result=>result.status).sort(),[201,409]);
assert.equal(count('profiles'),beforeProfiles+1,'Concurrent duplicate signup is atomic and leaves no orphan');
assert.equal(sql.prepare('SELECT count(*) AS total FROM local_credentials WHERE login_key=?').get('concurrent').total,1);

sql.exec('DELETE FROM auth_rate_limits');
for(let attempt=0;attempt<15;attempt++)assert.equal((await call('/login',post({loginId:'MissingRateUser',password},undefined,{'CF-Connecting-IP':'198.51.100.'+(attempt+1)}))).status,401);
const idLimited=await call('/login',post({loginId:'missingrateuser',password},undefined,{'CF-Connecting-IP':'198.51.100.99'}));
assert.equal(idLimited.status,429,'ID limit persists independently of changing request IP');
assert(Number(idLimited.response.headers.get('retry-after'))>0);
sql.prepare('UPDATE auth_rate_limits SET window_start=?').run(Math.floor(Date.now()/1000)-901);
assert.equal((await call('/login',post({loginId:'MissingRateUser',password}))).status,401,'Expired rate windows reopen');
sql.exec('DELETE FROM auth_rate_limits');
for(let attempt=0;attempt<60;attempt++)assert.equal((await call('/login',post({loginId:'MissingIP'+attempt,password}))).status,401);
assert.equal((await call('/login',post({loginId:'AnotherMissingID',password}))).status,429,'IP limit persists independently of changing login ID');

sql.exec('DELETE FROM auth_rate_limits');
const raceSession=await call('/login',post({loginId:'Alpha',password:'Replacement!43'}));
const passwordRace=await Promise.all([
 call('/change-password',post({currentPassword:'Replacement!43',newPassword:'Race choice one!'},raceSession.cookies)),
 call('/change-password',post({currentPassword:'Replacement!43',newPassword:'Race choice two!'},raceSession.cookies))
]);
assert.deepEqual(passwordRace.map(result=>result.status).sort(),[200,409],'Only one competing password change can commit');
assert.equal(credential('alpha').password_version,3);
const winner=passwordRace.find(result=>result.status===200);
assert.equal((await call('/session',{cookies:winner.cookies})).status,200,'A losing password change cannot revoke the winner session');
assert.equal(count('local_credentials'),6);
assert.equal(sql.prepare('PRAGMA foreign_key_check').all().length,0);
console.log('Local auth: username-only signup, normalization, salted credentials, cookie sessions, provider isolation, existing-profile attachment, password rotation, atomic duplicate signup, persistent rate limits and request validation passed.');
