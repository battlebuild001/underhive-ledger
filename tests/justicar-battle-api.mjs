import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import fs from 'node:fs';
import {handleApi} from '../worker/account-api.js';
const sql=new DatabaseSync(':memory:');sql.exec('PRAGMA foreign_keys=ON');
for(const file of fs.readdirSync(new URL('../drizzle/',import.meta.url)).filter(file=>file.endsWith('.sql')).sort())sql.exec(fs.readFileSync(new URL('../drizzle/'+file,import.meta.url),'utf8'));
class Statement{constructor(query,args=[]){this.query=query;this.args=args;}bind(...args){return new Statement(this.query,args);}async first(){return sql.prepare(this.query).get(...this.args)||null;}async all(){return {results:sql.prepare(this.query).all(...this.args)};}async run(){return {meta:{changes:sql.prepare(this.query).run(...this.args).changes}};}}
let failBatch=false;const DB={prepare:q=>new Statement(q),async batch(statements){sql.exec('BEGIN');try{const out=statements.map((statement,index)=>{if(failBatch&&index===1){failBatch=false;throw Error('Injected storage failure');}return {meta:{changes:sql.prepare(statement.query).run(...statement.args).changes}};});sql.exec('COMMIT');return out;}catch(error){sql.exec('ROLLBACK');throw error;}}};
async function api(actor,path,method='GET',body){const result=await handleApi(new Request('https://test.chatgpt.site/api'+path,{method,headers:{'oai-authenticated-user-id':actor,'oai-authenticated-user-email':actor+'@example.test','X-UK-Account-ID':actor,...(body?{'Content-Type':'application/json'}:{})},body:body?JSON.stringify(body):undefined}),{DB});return {status:result.status,...await result.json()};}
for(const actor of ['owner','guest'])assert.equal((await api(actor,'/account')).status,200);
const clone=structuredClone,allianceId='official-001-alliance-justicar-courts',type='official-001-fighter-justicar-court-delegation-bailiff';let serial=0,key=0;
const doc=actor=>{const row=sql.prepare('SELECT revision,state FROM documents WHERE user_id=?').get(actor);return {revision:row.revision,state:JSON.parse(row.state)};};
const write=(actor,state)=>sql.prepare('INSERT INTO documents(user_id,revision,state,updated_at) VALUES(?,1,?,?) ON CONFLICT(user_id) DO UPDATE SET state=excluded.state,revision=revision+1').run(actor,JSON.stringify(state),'2026-11-05');
const read=f=>JSON.parse(sql.prepare('SELECT snapshot FROM shared_campaigns WHERE id=?').get(f.id).snapshot);
function fixture({strong=false,delegates=1}={}){
 const id='justicar-battle-'+(++serial),request='justicar-enrollment-'+serial,foreign='enrolled-'+request;
 const leader=name=>({id:'leader',name:name+' Leader',subtypes:['Leader'],status:'Active',xp:0,stats:{Int:7}});
 const court=Array.from({length:delegates},(_,i)=>({id:'delegate'+i,name:'Bailiff '+i,fighterTypeId:type,subtypes:['Ganger'],allianceDelegation:true,allianceContractId:'contract',status:'Active',xp:0,equipment:[{id:'weapon'+i,name:'Heavy club',equipmentId:'official-001-heavy-club'}],loadouts:[],privateNotes:'private delegate'}));
 const host={id:'host',name:'Own allied gang',edition:'N26',gangTypeId:strong?'official-001-gang-palanite-enforcers':'official-001-gang-house-cawdor',credits:200,reputation:1,allianceId,allianceTithe:200,allianceContract:{id:'contract',version:1,status:'active',allianceId,delegationIds:court.map(f=>f.id),strongReplacementUsed:false,history:[]},fighters:[leader('Own'),{id:'ordinary',name:'Ordinary fighter',subtypes:['Ganger'],status:'Active',xp:0},...court],vehicles:[],stash:[{id:'keep',name:'Private stash'}],tactics:[],privateNotes:'own private'};
 const guest={id:'guest',name:'Other gang',edition:'N26',credits:100,reputation:1,fighters:[leader('Enemy')],vehicles:[],stash:[],tactics:[],privateNotes:'other private'};
 const campaign={id,name:'Justicar battle test',edition:'N26',phase:'Active',currentCycle:1,campaignTypeId:'official-003-campaign-necromunda-campaign',campaignSchedule:{stages:[{name:'Occupation',cycles:3}],completed:false},members:[{id:'host-member',gangId:'host'},{id:'guest-member',gangId:foreign,userId:'guest',ownerId:'guest',sourceGangId:'guest',enrollmentRequestId:request}],territories:[],sessions:[],battles:[],activity:[]};
 write('owner',{gangs:[host],campaigns:[clone(campaign)]});write('guest',{gangs:[guest],campaigns:[]});
 const pub=g=>{const v=clone(g);delete v.privateNotes;for(const f of v.fighters)delete f.privateNotes;return v;};
 sql.prepare('INSERT INTO shared_campaigns(id,owner_id,name,snapshot,revision,updated_at) VALUES(?,?,?,?,1,?)').run(id,'owner',campaign.name,JSON.stringify({campaign,gangs:[pub(host),{...pub(guest),id:foreign,remoteReadOnly:true,sourceGangId:'guest',sourceOwnerId:'guest',remoteOwnerId:'guest',enrollmentRequestId:request}]}),'2026-11-05');
 sql.prepare("INSERT INTO campaign_access(campaign_id,user_id,role,status,invited_at) VALUES(?,?,'viewer','accepted',?)").run(id,'guest','2026-11-05');
 sql.prepare("INSERT INTO campaign_join_requests(id,campaign_id,user_id,gang_id,gang_name,gang_snapshot,source_revision,message,status,created_at,updated_at) VALUES(?,?,?,?,?,?,?,'','approved',?,?)").run(request,id,'guest','guest',guest.name,JSON.stringify(pub(guest)),doc('guest').revision,'2026-11-05','2026-11-05');
 return {id,foreign,host};
}
const path=(f,room)=>'/campaigns/'+f.id+'/lobby'+(room?'/'+room.id:'');
async function action(f,room,actor,name,extra={},expected=200){const value=await api(actor,path(f,room),'POST',{action:name,revision:room.revision,operationKey:'justicar-'+(++key),...extra});assert.equal(value.status,expected,name+': '+value.error);return value.room||value;}
async function battle(f,own=['leader','ordinary','delegate0']){
 let result=await api('owner',path(f),'POST',{operationKey:'create-'+(++key),ownGangId:'host',targetUserId:'guest',targetGangId:f.foreign,setup:{deploymentId:'fixture',objectiveId:'fixture',crewSelectionId:'fixture'}});assert.equal(result.status,201,result.error);let room=await action(f,result.room,'guest','accept');
 room=await action(f,room,'owner','prepare',{preparation:{fighterIds:own,tacticIds:[],sideJobId:'',note:''}});room=await action(f,room,'guest','prepare',{preparation:{fighterIds:['leader'],tacticIds:[],sideJobId:'',note:''}});
 room=await action(f,room,'owner','ready',{ready:true});room=await action(f,room,'guest','ready',{ready:true});return action(f,room,'owner','start');
}
const realRandom=crypto.getRandomValues.bind(crypto);let queue=[];
crypto.getRandomValues=function(array){if(queue.length){array[0]=queue.shift();return array;}return realRandom(array);};
const rolls=(...values)=>{queue=values.map(value=>value-1);};
async function finish(f,room,winner='draw'){room=await action(f,room,'owner','propose-result',{result:{winnerId:winner,note:''}});return action(f,room,'guest','confirm-result');}
function original(){return doc('owner').state.gangs[0];}

// D6 is rolled by the server once; forged D66, rerolls and proof deletion cannot change it.
let f=fixture(),room=await battle(f),before=clone(original()),body={action:'battle-delegation-injury',revision:room.revision,operationKey:'one-injury-roll',fighterId:'delegate0'};
rolls(3);let result=await api('owner',path(f,room),'POST',body);assert.equal(result.status,200,result.error);room=result.room;
let self=room.participants.find(p=>p.userId==='owner'),proof=self.battleRecord.delegationRolls[0];assert.equal(proof.roll,3);assert.equal(self.battleRecord.units.find(u=>u.fighterId==='delegate0').record.status,'In Recovery');assert.deepEqual(original(),before);
let replay=await api('owner',path(f,room),'POST',body);assert.equal(replay.status,200,replay.error);assert.equal(replay.room.revision,room.revision);assert.equal(replay.room.participants.find(p=>p.userId==='owner').battleRecord.delegationRolls[0].roll,3);
await action(f,room,'owner','battle-delegation-injury',{fighterId:'delegate0'},409);await action(f,room,'guest','battle-delegation-injury',{fighterId:'delegate0'},403);
const reset=clone(self.battleRecord.base.find(u=>u.fighterId==='delegate0').record);await action(f,room,'owner','battle-update',{units:[{fighterId:'delegate0',record:reset}]},403);
room=await action(f,room,'owner','battle-rebase',{confirm:true});assert.equal(room.participants.find(p=>p.userId==='owner').battleRecord.delegationRolls[0].roll,3);await action(f,room,'owner','battle-delegation-injury',{fighterId:'delegate0'},409);
room=await finish(f,room);assert.equal(original().fighters.find(f=>f.id==='delegate0').status,'In Recovery');assert.equal(original().fighters.find(f=>f.id==='delegate0').injuries.length,1);assert.equal(original().privateNotes,'own private');assert.equal(read(f).campaign.battles.length,1);assert.equal(JSON.stringify(read(f)).includes('private delegate'),false);
console.log('PASS server D6 injury proof, stable retries, actor ownership, rebase and recovery settlement');

for(const roll of [1,2,5]){f=fixture();room=await battle(f);rolls(roll);room=await action(f,room,'owner','battle-delegation-injury',{fighterId:'delegate0'});room=await finish(f,room);assert.equal(original().fighters.find(f=>f.id==='delegate0').status,roll<3?'Active':'In Recovery');}
f=fixture();room=await battle(f);self=room.participants.find(p=>p.userId==='owner');const forged=clone(self.battleRecord.base.find(u=>u.fighterId==='delegate0').record);forged.injuries.push({id:'fake-d66',name:'Out Cold',presetId:'n26-injury-out-cold',source_verified:true,rule_data:{d66_min:21,d66_max:26,model_type:'Fighter'},type_specific_data:{},sessionId:room.sessionId});await action(f,room,'owner','battle-update',{units:[{fighterId:'delegate0',record:forged}]},403);
console.log('PASS dedicated D6 intervals and rejection of ordinary D66 for delegation models');

// A D6 6 removes equipment with its model; Palanite strong replacement is used once per contract.
for(const strong of [false,true]){
 f=fixture({strong,delegates:2});room=await battle(f,['leader','delegate0','delegate1']);const oldGear=clone(original().fighters.find(f=>f.id==='delegate0').equipment),stash=clone(original().stash);
 for(const id of ['delegate1','delegate0']){rolls(6);room=await action(f,room,'owner','battle-delegation-injury',{fighterId:id});}
 room=await finish(f,room);const g=original(),settlement=room.justicarSettlement.gangs[0];assert(!g.fighters.some(f=>['delegate0','delegate1'].includes(f.id)));assert.deepEqual(g.stash,stash);assert.equal(settlement.losses.length,2);
 if(strong){assert.equal(g.fighters.filter(f=>f.fighterTypeId===type).length,1);assert.equal(g.allianceContract.strongReplacementUsed,true);const replacement=g.fighters.find(f=>f.fighterTypeId===type);assert.deepEqual(replacement.equipment,f.host.fighters.find(f=>f.id==='delegate1').equipment);assert.notDeepEqual(replacement.equipment,oldGear);assert.equal(replacement.injuries.length,0);assert.equal(g.allianceId,allianceId);assert.equal(settlement.losses.filter(row=>row.replacementId).length,1);assert.equal(settlement.losses.find(row=>row.replacementId).fighterId,'delegate1');}
 else{assert.equal(g.allianceContract.status,'broken');assert.equal(g.allianceContract.brokenReason,'delegation-lost');assert.equal(g.allianceId,'');assert.equal(g.allianceTithe,0);assert.equal(settlement.allianceBroken,true);}
}
console.log('PASS critical deletion removes equipment without stash transfer, one strong replacement and last-model alliance break');

// N26 Intelligence passes on roll UNDER/equal; no roll for a draw or an unused delegation.
for(const [dice,passed] of [[[3,3],true],[[4,4],false]]){f=fixture();room=await battle(f);room=await action(f,room,'owner','propose-result',{result:{winnerId:'guest',note:''}});rolls(...dice,1);room=await action(f,room,'guest','confirm-result');const risk=room.justicarSettlement.gangs[0].enemyWithin;assert.equal(risk.total,dice[0]+dice[1]);assert.equal(risk.intelligence,7);assert.equal(risk.passed,passed);if(!passed){assert.equal(risk.recoveryFighterId,'leader');assert.equal(original().fighters.find(f=>f.id==='leader').status,'In Recovery');}else assert.equal(original().fighters.find(f=>f.id==='leader').status,'Active');}
f=fixture();room=await battle(f,['leader','ordinary']);room=await finish(f,room,'guest');assert.equal(room.justicarSettlement.gangs[0].enemyWithin,null);
f=fixture();room=await battle(f);room=await action(f,room,'owner','propose-result',{result:{winnerId:'guest',note:'Disputed loss'}});room=await action(f,room,'guest','dispute-result');room=await finish(f,room,'draw');assert.equal(room.justicarSettlement.gangs[0].enemyWithin,null);
console.log('PASS N26 Intelligence <= characteristic, loss-only participant condition and disputed-result isolation');

// Cut off the Head is inferred from the enemy Leader OOA record, once at agreed settlement.
f=fixture();room=await battle(f);room=await action(f,room,'guest','battle-update',{units:[{fighterId:'leader',combat:{status:'Out of Action'}}]});const creditsBefore=original().credits;room=await action(f,room,'owner','propose-result',{result:{winnerId:'owner',note:''}});body={action:'confirm-result',revision:room.revision,operationKey:'bonus-once'};rolls(2,3,1,1,1);result=await api('guest',path(f,room),'POST',body);assert.equal(result.status,200,result.error);room=result.room;let bonus=room.justicarSettlement.gangs[0].cutOffHead;assert.equal(bonus.credits,50);assert.deepEqual(bonus.rolls,[2,3]);assert.deepEqual(bonus.enemyLeaderIds,['leader']);assert.equal(original().credits,creditsBefore+70);assert.equal(room.rewardSettlement.rewards.find(r=>r.userId==='owner').credits,70);assert.equal(room.rewardSettlement.rewards.find(r=>r.userId==='owner').justicarCredits,50);assert.deepEqual(read(f).campaign.battles[0].automationSettlement.justicarSettlement,room.justicarSettlement);replay=await api('guest',path(f,room),'POST',body);assert.equal(replay.status,200,replay.error);assert.equal(original().credits,creditsBefore+70);
console.log('PASS enemy Leader OOA 2D3×10 reward, combined ledger and no duplicate payout on retry');

// A failed native transaction leaves the roster and room unchanged, including strong replacement.
f=fixture({strong:true});room=await battle(f);rolls(6);room=await action(f,room,'owner','battle-delegation-injury',{fighterId:'delegate0'});room=await action(f,room,'owner','propose-result',{result:{winnerId:'draw',note:''}});before=clone(doc('owner'));const snapshot=clone(read(f));body={action:'confirm-result',revision:room.revision,operationKey:'rollback-replacement'};failBatch=true;result=await api('guest',path(f,room),'POST',body);assert(result.status>=500);assert.deepEqual(doc('owner'),before);assert.deepEqual(read(f),snapshot);result=await api('guest',path(f,room),'POST',body);assert.equal(result.status,200,result.error);assert.equal(original().fighters.filter(f=>f.fighterTypeId===type).length,1);assert.equal(original().allianceContract.strongReplacementUsed,true);
console.log('PASS atomic rollback and safe retry for deletion, replacement and rewards');

// A selected reserve is not a participant until deployed; the explicit flag is canonical and one-way after injury.
for(const entered of [false,true]){
 f=fixture();const state=doc('owner').state,g=state.gangs[0];for(let i=0;i<6;i++)g.fighters.push({id:'extra'+i,name:'Extra '+i,subtypes:['Ganger'],status:'Active',xp:0});write('owner',state);let snapshot=read(f);snapshot.gangs[0]=clone(g);sql.prepare('UPDATE shared_campaigns SET snapshot=?,revision=revision+1 WHERE id=?').run(JSON.stringify(snapshot),f.id);
 result=await api('owner',path(f),'POST',{operationKey:'reserve-create-'+(++key),ownGangId:'host',targetUserId:'guest',targetGangId:f.foreign,setup:{deploymentId:'fixture',objectiveId:'fixture',crewSelectionId:'official-003-scenario-entry-escalating-engagement'}});assert.equal(result.status,201,result.error);room=await action(f,result.room,'guest','accept');
 rolls(1,1,5,4,3,2);room=await action(f,room,'owner','crew-draw',{selection:{chosenIds:['leader','ordinary','extra0']}});assert(room.participants[0].preparation.reinforcements.some(row=>row.fighterId==='delegate0'));
 room=await action(f,room,'guest','crew-draw',{selection:{chosenIds:['leader']}});room=await action(f,room,'owner','ready',{ready:true});room=await action(f,room,'guest','ready',{ready:true});room=await action(f,room,'owner','start');assert.equal(room.participants[0].battleRecord.units.find(unit=>unit.fighterId==='delegate0').combat.deployed,false);
 if(entered)room=await action(f,room,'owner','battle-update',{units:[{fighterId:'delegate0',combat:{status:'Ready',deployed:true}}]});
 room=await action(f,room,'owner','propose-result',{result:{winnerId:'guest',note:''}});rolls(4,4,1);room=await action(f,room,'guest','confirm-result');const row=room.justicarSettlement.gangs[0];assert.equal(row.participated,entered);assert.equal(!!row.enemyWithin,entered);if(entered)assert.equal(row.enemyWithin.passed,false);
}
console.log('PASS managed reserves trigger Enemy Within only after actual deployment, with canonical persisted deployment flags');

f=fixture();const prisonerState=doc('owner').state;prisonerState.gangs[0].fighters.find(f=>f.id==='ordinary').status='Captured';prisonerState.gangs[0].fighters.find(f=>f.id==='ordinary').captured=true;write('owner',prisonerState);room=await battle(f,['leader','delegate0']);room=await action(f,room,'owner','propose-result',{result:{winnerId:'guest',note:''}});rolls(4,4,1);room=await action(f,room,'guest','confirm-result');assert.equal(room.justicarSettlement.gangs[0].enemyWithin.recoveryFighterId,'leader');assert.equal(original().fighters.find(f=>f.id==='ordinary').status,'Captured');
console.log('PASS Enemy Within keeps captured records intact while selecting a gang fighter for Recovery');
crypto.getRandomValues=realRandom;
