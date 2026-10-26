import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFile,readdir} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const source=await readFile(resolve(root,'.sites-build/dist/server/index.js'),'utf8');
let worker;try{({default:worker}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64')))}catch(e){console.error('Worker parse failed:',e.message);process.exit(1)}
const res=await worker.fetch(new Request('https://manager.test/'),{},{});
assert.equal(res.status,200);assert.match(await res.text(),/rules-data.js/);
for(const path of ['/interaction-core.js','/gang-parity.js','/fighter-parity.js','/campaign-parity.js','/assets-parity.js','/account-parity.js','/rules-data.js']){const r=await worker.fetch(new Request('https://manager.test'+path),{},{});assert.equal(r.status,200,path)}
for(const file of ['learning-center.js','learning-center.css','learning-content.js','learning-tutorials.js','tutorial-detail-foundations.js','tutorial-detail-n26.js']){const response=await worker.fetch(new Request('https://manager.test/'+file),{},{});assert.equal(response.status,404,file+' must no longer be published');}
const portraitFiles=(await readdir(resolve(root,'dist/portraits/generated'))).filter(file=>file.endsWith('.webp'));
assert.equal(portraitFiles.length,18,'All 18 generated faction portraits must be packaged.');
for(const file of portraitFiles){
 const path='/portraits/generated/'+file;
 const r=await worker.fetch(new Request('https://manager.test'+path),{},{});
 assert.equal(r.status,200,path);
 assert.equal(r.headers.get('Content-Type'),'image/webp',path);
 const bytes=Buffer.from(await r.arrayBuffer());
 assert.equal(bytes.subarray(0,4).toString(),'RIFF',path);
 assert.equal(bytes.subarray(8,12).toString(),'WEBP',path);
 assert.deepEqual(bytes,await readFile(resolve(root,'dist'+path)),path+' must preserve the binary asset.');
 const head=await worker.fetch(new Request('https://manager.test'+path,{method:'HEAD'}),{},{});
 assert.equal(head.status,200,path+' HEAD');
 assert.equal((await head.arrayBuffer()).byteLength,0,path+' HEAD body');
}
console.log('All 18 generated portraits: binary integrity, image/webp and HEAD responses passed.');
assert.equal((await worker.fetch(new Request('https://manager.test/gang/test'),{},{})).status,200);
assert.equal((await worker.fetch(new Request('https://manager.test/join/example-invite'),{},{})).status,200);
for(const path of ['/learn','/learn/rules','/learn/quick','/learn/tutorials']){const response=await worker.fetch(new Request('https://manager.test'+path),{},{});assert.equal(response.status,302,path);assert.equal(response.headers.get('Location'),'/');}
for(const edition of ['n26','n23'])for(const language of ['ko','en']){
 const path='/guides/underhive-'+edition+'-'+language+'.html',guide=await worker.fetch(new Request('https://manager.test'+path),{},{});
 assert.equal(guide.status,404,path+' must no longer be published');
}
assert.equal((await worker.fetch(new Request('https://manager.test/api/account'),{},{})).status,401);
console.log('Worker ESM, static routes, deep links and anonymous API authorization passed.');

const sqlite=new DatabaseSync(':memory:');
for(const file of (await readdir(resolve(root,'drizzle'))).filter(name=>name.endsWith('.sql')).sort())sqlite.exec(await readFile(resolve(root,'drizzle',file),'utf8'));
class Statement{constructor(q,args=[]){this.q=q;this.args=args}bind(...args){return new Statement(this.q,args)}async first(){return sqlite.prepare(this.q).get(...this.args)||null}async all(){return{results:sqlite.prepare(this.q).all(...this.args)}}async run(){return{meta:{changes:sqlite.prepare(this.q).run(...this.args).changes}}}}
const DB={prepare:q=>new Statement(q),async batch(items){sqlite.exec('BEGIN');try{const results=[];for(const item of items)results.push(await item.run());sqlite.exec('COMMIT');return results}catch(e){sqlite.exec('ROLLBACK');throw e}}};
const headers={'oai-authenticated-user-id':'compiled-worker-test','oai-authenticated-user-email':'compiled@example.test'};
const account=await worker.fetch(new Request('https://manager.test/api/account',{headers}),{DB},{});assert.equal(account.status,200);assert((await account.json()).profile.username);
const saved=await worker.fetch(new Request('https://manager.test/api/document',{method:'PUT',headers:{...headers,'Content-Type':'application/json'},body:JSON.stringify({revision:0,state:{gangs:[],campaigns:[]}})}),{DB},{});assert.equal(saved.status,200);assert.equal((await saved.json()).revision,1);
console.log('Compiled Worker and generated D1 migrations: identity, account and saved document passed.');

const passwordSignup=await worker.fetch(new Request('https://manager.test/api/auth/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({loginId:'compiled-local-user',password:'Worker-test-password-839!'})}),{DB},{});
assert.equal(passwordSignup.status,201);const passwordAccount=await passwordSignup.json();
assert.equal(passwordAccount.auth.method,'password');assert.equal(passwordAccount.profile.identityEmail,'');
const passwordCookie=passwordSignup.headers.getSetCookie().map(value=>value.split(';')[0]).join('; ');
const localAccount=await worker.fetch(new Request('https://manager.test/api/account',{headers:{Cookie:passwordCookie,...headers}}),{DB},{});
assert.equal(localAccount.status,200);assert.equal((await localAccount.json()).profile.id,passwordAccount.profile.id);
const localSave=await worker.fetch(new Request('https://manager.test/api/document',{method:'PUT',headers:{Cookie:passwordCookie,'X-UK-Account-ID':passwordAccount.profile.id,'Content-Type':'application/json'},body:JSON.stringify({revision:0,state:{gangs:[],campaigns:[]}})}),{DB},{});
assert.equal(localSave.status,200);
console.log('Compiled Worker: ID/password signup with no email, HttpOnly session and isolated document API passed.');
