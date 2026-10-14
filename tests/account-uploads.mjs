import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import fs from 'node:fs';
import {handleApi} from '../worker/account-api.js';
const sql=new DatabaseSync(':memory:');sql.exec('PRAGMA foreign_keys=ON');for(const file of fs.readdirSync(new URL('../drizzle/',import.meta.url)).filter(x=>x.endsWith('.sql')).sort())sql.exec(fs.readFileSync(new URL('../drizzle/'+file,import.meta.url),'utf8'));
class Statement{constructor(q,a=[]){this.q=q;this.a=a}bind(...a){return new Statement(this.q,a)}async first(){return sql.prepare(this.q).get(...this.a)||null}async all(){return {results:sql.prepare(this.q).all(...this.a)}}async run(){return {meta:{changes:sql.prepare(this.q).run(...this.a).changes}}}}
const DB={prepare:q=>new Statement(q),async batch(list){sql.exec('BEGIN');try{const rows=[];for(const s of list)rows.push(await s.run());sql.exec('COMMIT');return rows}catch(e){sql.exec('ROLLBACK');throw e}}};
const objects=new Map();const BUCKET={async put(k,bytes,options){objects.set(k,{bytes:bytes.slice(),options})},async get(k){const o=objects.get(k);return o?{body:o.bytes}:null},async delete(k){objects.delete(k)}};
async function request(user,path,method='GET',body,type='application/json',extra={}){const r=await handleApi(new Request('https://test.chatgpt.site/api'+path,{method,headers:{...(user?{'oai-authenticated-user-id':user,'oai-authenticated-user-email':user+'@example.test'}:{}),...(body?{'Content-Type':type}:{}),...extra},body:body?(type==='application/json'?JSON.stringify(body):body):undefined}),{DB,BUCKET});return r}
async function call(...args){const r=await request(...args);return {status:r.status,...await r.json()}}
const png=Uint8Array.from(Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+c9ZcAAAAASUVORK5CYII=','base64'));
for(const u of ['a','b','c','d'])await call(u,'/account');
assert.equal((await call(null,'/uploads','POST',png,'image/png')).status,401);
assert.equal((await call('a','/uploads','POST',png,'image/svg+xml')).status,415);
assert.equal((await call('a','/uploads','POST',png,'image/jpeg')).status,400);
assert.equal((await call('a','/uploads','POST',new Uint8Array(5*1024*1024+1),'image/png')).status,413);
assert.equal((await call('a','/uploads','POST',png,'image/png',{'Content-Length':String(6*1024*1024)})).status,413);
const image=await call('a','/uploads','POST',png,'image/png');assert.equal(image.status,201);assert.match(image.url,/^\/api\/uploads\/[a-f0-9-]{36}$/);assert.equal(objects.size,1);
const duplicate=await call('a','/uploads','POST',png,'image/png');assert.equal(duplicate.id,image.id);assert.equal(duplicate.deduplicated,true);assert.equal(objects.size,1);
const own=await request('a',image.url.slice(4));assert.equal(own.status,200);assert.equal(own.headers.get('Content-Type'),'image/png');assert.equal(own.headers.get('X-Content-Type-Options'),'nosniff');assert.deepEqual(new Uint8Array(await own.arrayBuffer()),png);
assert.equal((await request('b',image.url.slice(4))).status,404);
const campaign={id:'camp-a',name:'A campaign',image:image.url,members:[]};await call('a','/document','PUT',{revision:0,state:{gangs:[],campaigns:[campaign]}});await call('a','/campaign-shares','POST',{campaignId:'camp-a',userId:'b',role:'editor'});
assert.equal((await request('b',image.url.slice(4))).status,404,'Pending invite may not read images');
await call('b','/campaign-shares/camp-a/respond','POST',{action:'accept'});assert.equal((await request('b',image.url.slice(4))).status,200);
assert.equal((await request('c',image.url.slice(4))).status,404);
const cCampaign={id:'camp-c',name:'C campaign',image:image.url,members:[]};await call('c','/document','PUT',{revision:0,state:{gangs:[],campaigns:[cCampaign]}});await call('c','/campaign-shares','POST',{campaignId:'camp-c',userId:'d',role:'viewer'});await call('d','/campaign-shares/camp-c/respond','POST',{action:'accept'});assert.equal((await request('d',image.url.slice(4))).status,404,'Referencing another account image cannot grant access');
const bImage=await call('b','/uploads','POST',png,'image/png');assert.notEqual(bImage.id,image.id,'Deduplication is isolated by owner');assert.equal(objects.size,2);assert.equal((await request('a',bImage.url.slice(4))).status,404);
const snapshot={campaign:{...campaign,image:undefined,notes:`<p>Participant image <img src="${bImage.url}"></p>`},gangs:[]};await call('b','/campaigns/camp-a','PUT',{revision:1,snapshot});assert.equal((await request('a',bImage.url.slice(4))).status,200,'Campaign owner may read accepted editor referenced image');assert.equal((await request('b',image.url.slice(4))).status,404,'Removed image references revoke shared access');
await call('a','/campaign-shares/camp-a/members/b','DELETE');assert.equal((await request('a',bImage.url.slice(4))).status,404,'Removed uploader membership revokes foreign image sharing');assert.equal((await request('b',bImage.url.slice(4))).status,200,'Uploader retains ownership');
assert.equal((await call('a','/document','PUT',{revision:1,state:{gangs:[],campaigns:[{...campaign,notes:'x'.repeat(1900000)}]}})).status,413,'D1 row limit is enforced before storage');
console.log('Account uploads: file validation/size limit, owner deduplication, private reads, accepted sharing, reference removal, unrelated URL injection and membership revocation passed.');
