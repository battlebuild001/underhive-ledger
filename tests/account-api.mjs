import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import { handleApi } from '../worker/account-api.js';
const sql=new DatabaseSync(':memory:');sql.exec('PRAGMA foreign_keys=ON');for(const file of fs.readdirSync(new URL('../drizzle/',import.meta.url)).filter(x=>x.endsWith('.sql')).sort())sql.exec(fs.readFileSync(new URL('../drizzle/'+file,import.meta.url),'utf8'));
class Statement{constructor(query,args=[]){this.query=query;this.args=args;}bind(...args){return new Statement(this.query,args)}async first(){return sql.prepare(this.query).get(...this.args)||null}async all(){return {results:sql.prepare(this.query).all(...this.args)}}async run(){const r=sql.prepare(this.query).run(...this.args);return {meta:{changes:r.changes}}}}
const DB={prepare:q=>new Statement(q),async batch(statements){sql.exec('BEGIN');try{const result=[];for(const s of statements)result.push(await s.run());sql.exec('COMMIT');return result}catch(e){sql.exec('ROLLBACK');throw e}}};
async function call(user,path,method='GET',body,headers={}){const req=new Request('https://test.chatgpt.site/api'+path,{method,headers:{...(user?{'oai-authenticated-user-id':user,'oai-authenticated-user-email':user+'@example.test'}:{}),...(body?{'Content-Type':'application/json'}:{}),...headers},body:body?JSON.stringify(body):undefined});const r=await handleApi(req,{DB});return {status:r.status,...await r.json()};}
assert.equal((await call(null,'/account')).status,401);
assert.equal(await handleApi(new Request('https://test.chatgpt.site/'),{DB}),null);
for(const [id,username] of [['a','Alpha'],['b','Beta'],['c','Gamma']]){assert.equal((await call(id,'/account')).status,200);assert.equal((await call(id,'/account','PATCH',{username})).status,200)}
assert.equal((await call('c','/account','PATCH',{username:'alpha'})).status,409);
assert.equal((await call('a','/account','PATCH',{username:3})).status,400);
assert.equal((await call('a','/account','PATCH',{preferences:{role:'admin'}})).status,400);
assert.equal((await call('a','/account','PATCH',{contactEmail:'bad'})).status,400);
assert.equal((await call('a','/account','PATCH',{username:'Malicious'}, {Origin:'https://foreign.test'})).status,403);
assert.equal((await call('a','/document')).state,null);
const campaign={id:'camp-one',name:'Ash Wastes',members:[{gangId:'gang-one'}],battles:[],territories:[]};const state={gangs:[{id:'gang-one',name:'One',fighters:[]}],campaigns:[campaign]};
assert.equal((await call('a','/document','PUT',{revision:0,state})).revision,1);
assert.equal((await call('a','/document','PUT',{revision:0,state})).status,409);
assert.equal((await call('a','/document','PUT',{revision:1,state})).revision,2);
assert.equal((await call('b','/document')).state,null);
assert.equal((await call('a','/document','PUT',{revision:2,state:{gangs:'bad',campaigns:[]}})).status,400);
// Independent matches use the existing private, revision-checked document contract.
await call('skirmish-owner','/account');
const match={id:'match-one',name:'Independent test',edition:'N26',createdAt:'2026-10-30T00:00:00Z',stage:'setup',round:1,participants:[{name:'Visitor <one>',gangId:'missing-reference-is-retained',role:'attacker',crew:[{fighterId:'fighter-one',loadoutId:'',kind:'starting'},{fighterId:'fighter-two',loadoutId:'loadout-two',kind:'reinforcement'}],notes:'Authored participant note',vp:0},{name:'Visitor two',gangId:'',role:'defender',crew:[],notes:'',vp:2}],deploymentId:'deployment-one',objectiveId:'objective-one',crewId:'crew-one',roleRoll:{dice:[6,2],winner:0},priorityRoll:{dice:[3,3],winner:-1},checklist:{terrain:true,authoredExtension:'preserve'},notes:'Authored match note',futureExtension:{values:[1,'two']}};
const independentState={gangs:structuredClone(state.gangs),campaigns:structuredClone(state.campaigns),skirmishes:[match,{id:'incomplete-match',name:'Incomplete draft'}],authoredRoot:{retained:true}};
assert.equal((await call('skirmish-owner','/document','PUT',{revision:0,state:independentState})).revision,1);
assert.deepEqual((await call('skirmish-owner','/document')).state,independentState,'Optional independent matches and extension fields round-trip unchanged');
for(const skirmishes of [null,'invalid',{},[null],[{id:'same',name:'One'},{id:'same',name:'Two'}],[{...match,round:1.5}],[{...match,participants:'invalid'}],[{...match,participants:[{crew:[null]}]}],[{...match,stage:'post-battle'}],[{...match,roleRoll:{dice:[0,7],winner:0}}],[{...match,checklist:[]}],[{...match,participants:[{vp:-1}]}],Array.from({length:1001},(_,i)=>({id:'m-'+i,name:'Match'}))]){
 assert.equal((await call('skirmish-owner','/document','PUT',{revision:1,state:{...independentState,skirmishes}})).status,400,'Malformed optional skirmish records are rejected');
 assert.deepEqual((await call('skirmish-owner','/document')).state,independentState,'Rejected independent matches preserve the entire stored document');
}
assert.equal((await call('skirmish-owner','/document','PUT',{revision:1,state})).revision,2,'Old documents without the optional property remain valid');
assert.deepEqual((await call('skirmish-owner','/document')).state,state);
const search=await call('a','/users?q=Bet');assert.equal(search.users[0].username,'Beta');assert.deepEqual(Object.keys(search.users[0]).sort(),['id','username']);
assert.deepEqual((await call('a','/users?q=%25_')).users,[]);
const friend=await call('a','/friends','POST',{userId:'b'});assert.equal(friend.status,201);
assert.equal((await call('b','/friends','POST',{userId:'a'})).status,409);
assert.equal((await call('c','/friends/'+friend.id,'PATCH',{action:'accept'})).status,404);
assert.equal((await call('a','/friends/'+friend.id,'PATCH',{action:'accept'})).status,403);
const notice=(await call('b','/notifications')).notifications[0];assert.equal(notice.type,'friend_request');
await call('c','/notifications/'+notice.id,'DELETE');assert.equal((await call('b','/notifications')).notifications.length,1);
await call('c','/notifications','PATCH',{ids:[notice.id]});assert.equal((await call('b','/notifications')).notifications[0].isRead,0);
assert.equal((await call('b','/friends/'+friend.id,'PATCH',{action:'accept'})).status,200);
assert.equal((await call('a','/friends')).friends[0].status,'accepted');assert.equal((await call('b','/notifications')).notifications.length,0);
assert.equal((await call('b','/campaign-shares','POST',{campaignId:'camp-one',userId:'c',role:'editor'})).status,403);
assert.equal((await call('a','/campaign-shares','POST',{campaignId:'camp-one',userId:'b',role:'editor'})).status,201);
assert.equal((await call('b','/campaigns/camp-one')).status,403);assert.equal((await call('c','/campaigns/camp-one')).status,403);
assert.equal((await call('c','/campaign-shares/camp-one/respond','POST',{action:'accept'})).status,404);
assert.equal((await call('b','/campaign-shares/camp-one/respond','POST',{action:'accept'})).status,200);
const shared=await call('b','/campaigns/camp-one');assert.equal(shared.role,'editor');assert.equal(shared.snapshot.campaign.name,'Ash Wastes');
assert.equal((await call('a','/campaign-shares','POST',{campaignId:'camp-one',userId:'c',role:'viewer'})).status,201);
await call('c','/campaign-shares/camp-one/respond','POST',{action:'accept'});
assert.equal((await call('c','/campaigns/camp-one','PUT',{revision:1,snapshot:shared.snapshot})).status,403);
assert.equal((await call('b','/campaigns/camp-one','PUT',{revision:1,snapshot:shared.snapshot})).revision,2);
assert.equal((await call('a','/campaigns/camp-one','PUT',{revision:1,snapshot:shared.snapshot})).status,409);
assert.equal((await call('b','/campaign-shares/camp-one/members')).status,403);
assert.equal((await call('b','/campaign-shares/camp-one/members/c','DELETE')).status,403);
assert.equal((await call('a','/campaign-shares/camp-one/members/c','DELETE')).status,200);
assert.equal((await call('c','/campaigns/camp-one')).status,403);
assert.equal((await call('a','/friends/'+friend.id,'DELETE')).status,200);assert.equal((await call('b','/friends')).friends.length,0);
assert.equal((await call('a','/notifications','PATCH',{ids:[]})).status,200);
await Promise.all([call('a','/account','PATCH',{username:'ConcurrentAlpha'}),call('a','/account','PATCH',{contactEmail:'concurrent@example.test'}),call('a','/account','PATCH',{preferences:{friend_request:false}}),call('a','/account','PATCH',{preferences:{campaign_invite:false}})]);const concurrent=(await call('a','/account')).profile;assert.equal(concurrent.username,'ConcurrentAlpha');assert.equal(concurrent.contactEmail,'concurrent@example.test');assert.equal(concurrent.preferences.friend_request,false);assert.equal(concurrent.preferences.campaign_invite,false,'Atomic partial profile changes retain independent concurrent fields');
console.log('Account API: authentication, private state, revision conflicts, validation, friend requests, notifications, campaign invitations and read/edit permissions passed.');
