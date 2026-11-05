import {cycleNumber,supportedCycleCampaign,battlePhaseRecord,requireNoPendingCycle,verifiedCycleClosed,changedPostCycles,closureMap,withoutNewClosure,activeCycleRoomSQL,pendingCycleRecords} from './campaign-cycle-gate.js';
import {requireAllianceGangTransition,requireAllianceCampaignTransition} from './gang-alliances.js';
/* Atomic operational changes. Source ownership comes from server enrollment records. */
const CAMPAIGN_FIELDS=new Set(['name','description','campaignType','campaignTypeId','tradingPosts','allegiances','allowJoinRequests','currentCycle','campaignSchedule','phase','territories','sessions','battles','resources','triumphs','activity','members','automation','automationEconomy']);
const GANG_FIELDS=new Set(['credits','reputation','tradePoints','meat','exploration','stash','tactics','fighters','vehicles','logs','campaignTacticsAwards','campaignDowntimeAllowances','postCycleActions','campaignCaptives','campaignVisits','tradingPostVisit','tradingPostTransactions']);
const FIGHTER_FIELDS=new Set(['name','type','fighterTypeId','catalogTypeId','presetId','typeId','cost','ratingCost','status','inRecovery','xp','startingXp','kills','stats','subtypes','equipment','skills','skillDetails','effects','injuries','advancements','loadouts','xpHistory','ooaRecords','specialRules','captured','capturedBy','captured_by_gang_id','campaignCaptureId','campaignRecruitment','isVehicle','vehicleTypeId','vehicle_type_id','gang_type_id','fighter_type_id']);
const TRANSPORT=new Set(['remoteOwnerId','remoteRole','remoteRevision','remoteReadOnly','remoteCampaignId','remoteCampaignIds','remoteSnapshotId','sourceOwnerId','sourceGangId','enrollmentRequestId']);
const PRIVATE=new Set(['privateNotes','private_notes','battleRecords']);
const forbidden=key=>['__proto__','prototype','constructor'].includes(key);
const object=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
const own=(v,k)=>v!=null&&Object.hasOwn(v,k);
const copy=v=>v===undefined?undefined:JSON.parse(JSON.stringify(v));
const clean=v=>Array.isArray(v)?v.map(clean):object(v)?Object.fromEntries(Object.entries(v).filter(([k])=>!TRANSPORT.has(k)&&!PRIVATE.has(k)).map(([k,x])=>[k,clean(x)])):v;
const canonical=v=>Array.isArray(v)?v.map(canonical):object(v)?Object.fromEntries(Object.keys(v).filter(k=>v[k]!==undefined).sort().map(k=>[k,canonical(v[k])])):v;
const stable=v=>JSON.stringify(canonical(v));
const same=(a,b)=>a===undefined||b===undefined?a===b:stable(clean(a))===stable(clean(b));
const keyed=a=>Array.isArray(a)&&a.every(x=>object(x)&&typeof x.id==='string'&&x.id.length>0)&&new Set(a.map(x=>x.id)).size===a.length;
function validateJSON(value,check,depth=0){
 check(depth<45,'운영 기록이 너무 깊습니다.');
 if(typeof value==='number')check(Number.isFinite(value),'운영 수치는 유한한 숫자여야 합니다.');
 if(Array.isArray(value)){check(value.length<=10000,'운영 목록이 너무 큽니다.');for(const item of value)validateJSON(item,check,depth+1);}
 else if(object(value))for(const [key,item]of Object.entries(value)){check(!forbidden(key),'이 항목은 저장할 수 없습니다.');validateJSON(item,check,depth+1);}
}
function diff(before,after,path=[],out=[]){
 if(before===undefined&&after===undefined||before!==undefined&&after!==undefined&&stable(before)===stable(after))return out;
 if(object(before)&&object(after)){
  for(const key of new Set([...Object.keys(before),...Object.keys(after)])){
   if(TRANSPORT.has(key)||PRIVATE.has(key)){if(!same(before[key],after[key]))out.push({path:[...path,key],before:before[key],after:after[key]});continue;}
   diff(before[key],after[key],[...path,key],out);
  }
 }else if(keyed(before)&&keyed(after)){
  const a=new Map(before.map(x=>[x.id,x])),b=new Map(after.map(x=>[x.id,x]));
  for(const id of new Set([...a.keys(),...b.keys()]))diff(a.get(id),b.get(id),[...path,{id}],out);
 }else out.push({path,before,after});
 return out;
}
// A client may display an omitted optional list as []. For its first real entry,
// journal creation of that list instead of addressing a child of a missing parent.
// Existing lists, unchanged defaults and missing entities retain their normal guards.
function addedArrayBaseline(before,after,current){
 if(!object(before)||!object(after)||!object(current))return before;
 const baseline=copy(before);
 for(const key of Object.keys(before)){
  const previous=before[key],next=after[key],actual=current[key];
  if(Array.isArray(previous)&&previous.length===0&&Array.isArray(next)&&next.length>0&&actual===undefined)delete baseline[key];
  else if(object(previous)&&object(next)&&object(actual))baseline[key]=addedArrayBaseline(previous,next,actual);
  else if(keyed(previous)&&keyed(next)&&keyed(actual)){
   const nextRows=new Map(next.map(row=>[row.id,row])),actualRows=new Map(actual.map(row=>[row.id,row]));
   baseline[key]=previous.map(row=>nextRows.has(row.id)&&actualRows.has(row.id)?addedArrayBaseline(row,nextRows.get(row.id),actualRows.get(row.id)):row);
  }
 }
 return baseline;
}
// An owner's personal and shared copies may differ only in whether a touched
// optional list is omitted or explicitly empty. Recover that empty baseline
// from the other server copy; never recover objects, entities or nonempty data.
function reconcileEmptyArrayBaselines(before,after,current,source){
 if(!object(before)||!object(after)||!object(current)||!object(source))return;
 for(const key of Object.keys(before)){
  const previous=before[key],next=after[key],actual=current[key],saved=source[key];
  if(Array.isArray(previous)&&previous.length===0&&Array.isArray(next)&&next.length>0&&actual===undefined&&Array.isArray(saved)&&saved.length===0)current[key]=[];
  else if(object(previous)&&object(next)&&object(actual)&&object(saved))reconcileEmptyArrayBaselines(previous,next,actual,saved);
  else if(keyed(previous)&&keyed(next)&&keyed(actual)&&keyed(saved)){
   const nextRows=new Map(next.map(row=>[row.id,row])),actualRows=new Map(actual.map(row=>[row.id,row])),savedRows=new Map(saved.map(row=>[row.id,row]));
   for(const row of previous)if(nextRows.has(row.id)&&actualRows.has(row.id)&&savedRows.has(row.id))reconcileEmptyArrayBaselines(row,nextRows.get(row.id),actualRows.get(row.id),savedRows.get(row.id));
  }
 }
}
const CONFIG_DEFAULTS={description:'',notes:'',houseRules:'',allowJoinRequests:false,phase:'Active'};
function addedConfigBaseline(before,after,current){const baseline=copy(before);for(const [key,value]of Object.entries(CONFIG_DEFAULTS))if(own(before,key)&&before[key]===value&&own(after,key)&&after[key]!==value&&current[key]===undefined)delete baseline[key];return baseline;}
function reconcileConfigDefaults(before,after,current,source){for(const [key,value]of Object.entries(CONFIG_DEFAULTS))if(own(before,key)&&before[key]===value&&own(after,key)&&after[key]!==value&&current[key]===undefined&&source[key]===value)current[key]=value;}
function locate(root,path,check){
 let node=root;
 for(let i=0;i<path.length-1;i++){
  const token=path[i];
  if(object(token)){check(Array.isArray(node),'기록의 목록 구조가 변경되었습니다.',409);node=node.find(x=>x?.id===token.id);}
  else node=node?.[token];
  check(node!==undefined&&node!==null,'기록의 상위 항목이 변경되었습니다.',409);
 }
 const key=path.at(-1);if(object(key)){check(Array.isArray(node),'기록의 목록 구조가 변경되었습니다.',409);const index=node.findIndex(x=>x?.id===key.id);return {node,key:index,value:index<0?undefined:node[index],exists:index>=0,array:true};}
 return {node,key,value:node?.[key],exists:own(node,key),array:false};
}
function write(root,path,value,exists,check){const target=locate(root,path,check);if(target.array){if(!exists){if(target.exists)target.node.splice(target.key,1);}else if(target.exists)target.node[target.key]=copy(value);else target.node.push(copy(value));}else if(exists)target.node[target.key]=copy(value);else delete target.node[target.key];}
function allowed(patch,target,check,internal=false){
 const path=patch.path;check(path.length>0&&path.every(t=>typeof t==='string'&&!forbidden(t)||object(t)&&Object.keys(t).length===1&&typeof t.id==='string'&&t.id.length<=160),'운영 변경 경로가 올바르지 않습니다.');
 check((target==='campaign'?CAMPAIGN_FIELDS:GANG_FIELDS).has(path[0]),'이 필드는 자동 운영으로 변경할 수 없습니다: '+path[0]);
 if(!internal&&target==='campaign'&&path[0]==='members')check(path.length>=3&&object(path[1])&&['resources','allegianceId'].includes(path[2])||path.length===2&&object(path[1])&&patch.before===undefined&&object(patch.after),'기존 참가자 신원이나 권한은 운영 변경으로 수정할 수 없습니다.');
 if(target==='gang'&&['fighters','vehicles'].includes(path[0])&&path.length>=3)check(FIGHTER_FIELDS.has(path[2]),'파이터의 해당 필드는 운영 변경 대상이 아닙니다: '+path[2]);
 const consentReference=k=>target==='gang'&&path[0]==='campaignCaptives'&&k==='sourceOwnerId';
 const scan=(v)=>{if(Array.isArray(v))v.forEach(scan);else if(object(v))for(const [k,x]of Object.entries(v)){check(!forbidden(k)&&(!TRANSPORT.has(k)||consentReference(k))&&!PRIVATE.has(k),'신원·개인 메모는 운영 변경에 포함할 수 없습니다.');scan(x);}};
 if(!internal&&patch.after!==undefined)scan(patch.after);
 check(!path.some(t=>typeof t==='string'&&(TRANSPORT.has(t)&&!consentReference(t)||PRIVATE.has(t))),'신원·개인 메모는 운영 변경에 포함할 수 없습니다.');
 if(!internal&&target==='gang'&&path[0]==='campaignCaptives'){
  const protectedConsent=['sourceAcknowledgedBy','sourceAcknowledgedAt','acceptedBy','acceptedAt','declinedBy','declinedAt'];
  check(!path.some(t=>protectedConsent.includes(t)),'생포 확인은 파이터를 소유한 플레이어만 변경할 수 있습니다.');
  if(path.at(-1)==='status')check(!['accepted','declined'].includes(patch.after),'몸값 제안은 파이터를 소유한 플레이어만 수락할 수 있습니다.');
  const rejectConsent=v=>{if(Array.isArray(v))v.forEach(rejectConsent);else if(object(v))for(const [k,x]of Object.entries(v)){check(!protectedConsent.includes(k),'해당 플레이어가 직접 생포를 확인해야 합니다.');if(k==='status')check(!['accepted','declined'].includes(x),'몸값 제안은 파이터를 소유한 플레이어만 수락할 수 있습니다.');rejectConsent(x);}};if(patch.after!==undefined)rejectConsent(patch.after);
 }
}
const OWN_PARTICIPANT_FIELDS=['crew','crewPlan','reinforcements','ready','tacticsSelected','tacticsSelectionRevision','resources','creditsEarned','reputationChange','sideJob','sideJobId','sideJobName','sideJobCompleted','side_job_id','side_job_name','side_job_completed','notes','xpEarned'];
const OWN_ECONOMY_LISTS=['baseCampRecovery','downtimeReceipts','incomeReceipts','medicalEscorts','pendingBenefits','postCycleActions','rosterFinalized','startingPackages','tacticsAwards'];
const emptyPersonal=value=>value===undefined||value===null||value===''||value===false||value===0||Array.isArray(value)&&value.length===0||object(value)&&Object.keys(value).length===0;
const gangReference=row=>row?.gangId||row?.gang_id;
function ownedLedger(row,owned){const refs=[row?.gangId,row?.gang_id,row?.gangKey].filter(value=>typeof value==='string'&&value);return refs.length>0&&refs.every(value=>owned.has(value));}
// Campaign administration does not grant edit permission over another player's
// crew, Side Job, personal resources, fighter outcomes or economy ledger.
function foreignPersonal(c,owned){
 const result={reports:[],members:[],economy:[]};
 for(const kind of ['battles','sessions'])for(const report of c[kind]||[]){
  const parts=[];for(const participant of report.participants||[]){if(owned.has(gangReference(participant)))continue;const values=Object.fromEntries(Object.entries(participant).filter(([key,value])=>!['id','gangId','gang_id','role','isWinner','name','gangName'].includes(key)&&!emptyPersonal(value)).map(([key,value])=>[key,clean(value)]));if(Object.keys(values).length)parts.push({gangId:gangReference(participant),values});}
  const fighters=(report.fighterResults||[]).filter(row=>!owned.has(gangReference(row))).map(clean);if(parts.length||fighters.length)result.reports.push({kind,id:report.id,parts,fighters});
 }
 for(const member of c.members||[])if(!owned.has(member.gangId)){const values=Object.fromEntries(['resources','allegianceId'].filter(key=>!emptyPersonal(member[key])).map(key=>[key,clean(member[key])]));if(Object.keys(values).length)result.members.push({id:member.id,gangId:member.gangId,values});}
 for(const key of OWN_ECONOMY_LISTS){const rows=(c.automationEconomy?.[key]||[]).filter(row=>!ownedLedger(row,owned)).map(clean);if(rows.length)result.economy.push({key,rows});}
 return result;
}
export function campaignOwnedIds(c,actor,owner,originals,enrollmentHistory=[],canonicalGangs=[],personalCampaign){
 const originalIds=new Set((originals||[]).filter(g=>g&&!g.remoteReadOnly&&['remoteOwnerId','sourceOwnerId','ownerId'].every(key=>!g[key]||g[key]===actor)).map(g=>g.id)),aliases=new Set(enrollmentHistory.map(row=>'enrolled-'+row.id)),pending=personalCampaign&&String(personalCampaign.edition).toUpperCase()===String(c.edition).toUpperCase()?personalCampaign.members||[]:[],ownerMembers=[...(c.members||[]),...pending];
 return new Set([...(actor===owner?ownerMembers.filter(member=>{const row=canonicalGangs.find(g=>g.id===member.gangId);return originalIds.has(member.gangId)&&!aliases.has(member.gangId)&&(!row||!row.remoteReadOnly&&['remoteOwnerId','sourceOwnerId','ownerId'].every(key=>!row[key]||row[key]===actor));}).map(member=>member.gangId):[]),...enrollmentHistory.filter(row=>row.status==='approved'&&row.user_id===actor&&originalIds.has(row.gang_id)).map(row=>'enrolled-'+row.id)]);
}
export function requireOwnCampaignPersonal(before,after,owned,check){check(same(foreignPersonal(before,owned),foreignPersonal(after,owned)),'다른 플레이어의 크루·사이드 잡·파이터 결과는 변경할 수 없습니다.',403);}
function emptyAutomation(value){return object(value)&&Object.entries(value).every(([key,item])=>key==='version'?item===1:['challenges','receipts','announcements'].includes(key)?Array.isArray(item)&&item.length===0:['cycleRecords','deadlines'].includes(key)&&object(item)&&Object.keys(item).length===0);}
function participantProtected(c,owned){
 const value=clean(copy(c));for(const kind of ['battles','sessions'])for(const report of value[kind]||[]){for(const participant of report.participants||[])if(owned.has(gangReference(participant)))for(const key of OWN_PARTICIPANT_FIELDS)delete participant[key];if(Array.isArray(report.fighterResults)){report.fighterResults=report.fighterResults.filter(row=>!owned.has(gangReference(row)));if(!report.fighterResults.length)delete report.fighterResults;}}
 for(const member of value.members||[])if(owned.has(member.gangId)){delete member.resources;delete member.allegianceId;}
 if(value.automationEconomy){for(const key of OWN_ECONOMY_LISTS)if(Array.isArray(value.automationEconomy[key])){value.automationEconomy[key]=value.automationEconomy[key].filter(row=>!ownedLedger(row,owned));if(!value.automationEconomy[key].length)delete value.automationEconomy[key];}if(!Object.keys(value.automationEconomy).length)delete value.automationEconomy;}
 if(Array.isArray(value.territories))value.territories=value.territories.filter(row=>!owned.has(gangReference(row)));
 if(emptyAutomation(value.automation))delete value.automation;return value;
}
function appendOnlyActivity(before,after){if(same(before,after))return true;if(!keyed(before||[])||!keyed(after)||after.length<(before||[]).length)return false;const current=new Map(after.map(row=>[row.id,row]));return (before||[]).every(row=>current.has(row.id)&&same(row,current.get(row.id)));}
function publicReceipt(row,hide){return {id:row.id,campaignId:row.campaign_id,operationKey:row.operation_key,actorId:row.actor_id,label:row.label,createdAt:row.created_at,cycle:row.cycle,campaignRevision:row.campaign_revision,changes:hide(JSON.parse(row.changes)),sourceRevisions:JSON.parse(row.source_revisions),reversedAt:row.reversed_at||null,reversedBy:row.reversed_by||null,reverseRevisions:row.reverse_revisions?JSON.parse(row.reverse_revisions):null};}

// Verified N26 Collect Income (n26-core-collect-income) and territory rows.
// These are fixed recorded boons, never inferred from a territory's display name.
const AUTO_N26_TERRITORY_INCOME=Object.freeze(Object.fromEntries([
 ['settlement',15],['bullet-den',15],['rogue-doc-shop',15],['mess-shack',15],['drinking-hole',15],['fence-hangout',15],['bounty-den',25],['generatorium',15],['corpse-farm',25],['tunnels',20],['tech-bazaar',15],['promethium-cache',15],['collapsed-dome',20],['bone-shrine',25],['mine-workings',20],['gambling-den',15],['synth-still',20],['old-ruins',20],['fighting-pit',25]
].map(([id,credits])=>['official-003-territory-'+id,credits]).concat([['official-n26-002-territory-spyrer-base-camp',15]])));
function automaticN26Schedule(c){
 if(String(c?.edition).toUpperCase()!=='N26'||!(c.campaignTypeId==='official-003-campaign-necromunda-campaign'||!c.campaignTypeId&&c.campaignType==='Necromunda Campaign'))return null;
 const p=c.campaignSchedule;if(!object(p)||!['standard','custom'].includes(p.mode)||!Array.isArray(p.stages)||!p.stages.length||p.stages.length>3)return null;
 const order=['Occupation','Downtime','Takeover'];let last=-1,total=0,start=1,current=null;const cycle=Number(c.currentCycle||1);
 for(const stage of p.stages){const index=order.indexOf(stage.name);if(index<=last||!Number.isSafeInteger(stage.cycles)||stage.cycles<1||stage.cycles>999)return null;last=index;total+=stage.cycles;if(cycle>=start&&cycle<start+stage.cycles)current={name:stage.name,start};start+=stage.cycles;}
 if(p.mode==='standard'&&(p.stages.length!==3||p.stages.some((s,i)=>s.name!==order[i]||s.cycles!==[3,1,3][i])))return null;
 if(!Number.isSafeInteger(cycle)||cycle<1||cycle>total||!current)return null;
 return {cycle,total,stage:current.name,stageStart:current.start,plan:p};
}
function automaticCycleTransition(before,after,key,check){
 if(!key.startsWith('cycle-advance:'))return null;const previous=automaticN26Schedule(before);if(!previous)return null;
 const next=automaticN26Schedule(after),end=previous.cycle===previous.total,to=end?previous.cycle:previous.cycle+1,history=before.campaignSchedule.history||[],rows=after.campaignSchedule?.history||[];
 check(before.phase!=='Closed'&&!previous.plan.completed&&next&&same(previous.plan.stages,next.plan.stages)&&previous.plan.mode===next.plan.mode&&rows.length===history.length+1&&same(rows.slice(0,-1),history),'사이클 진행 조건이 변경되었습니다. 새로고침 후 다시 시도하세요.',409);
 const h=rows.at(-1);check(h&&h.automationOperationKey===key&&h.fromCycle===previous.cycle&&h.toCycle===to&&h.finishedBefore===!!previous.plan.completed&&h.finishedAfter===end&&next.cycle===to&&!!next.plan.completed===end,'사이클 마감 기록이 올바르지 않습니다.',409);
 return {before:previous,after:next,completed:end};
}

export async function handleCampaignAutomation(request,db,actor,deps){
 const {requireValue:check,ApiError,json,response,validateState,validSnapshot,withoutPrivate,shareable,enrolledGang,requireLiveCampaign,campaignRights,requireArbitratorSettings,requireLobbyReports,stamp,uid}=deps;
 const path=new URL(request.url).pathname.replace(/\/$/,''),match=path.match(/^\/api\/campaigns\/([^/]+)\/automation(?:\/(consent|[^/]+)(?:\/(reverse))?)?$/);if(!match)return null;
 const campaignId=match[1];check(campaignId.length<=160,'캠페인 ID가 올바르지 않습니다.');await requireLiveCampaign(db,campaignId);
 const documents=new Map();
 async function document(user){if(!documents.has(user)){const row=await db.prepare('SELECT revision,state FROM documents WHERE user_id=?').bind(user).first();check(row,'저장된 갱 명단을 불러올 수 없습니다. 먼저 동기화하세요.',409);documents.set(user,{user,revision:row.revision,state:JSON.parse(row.state),changed:false});}return documents.get(user);}
 const actorDoc=await document(actor);
 let shared=await db.prepare('SELECT * FROM shared_campaigns WHERE id=?').bind(campaignId).first(),role='owner',owner=actor;
 if(shared){const rights=await campaignRights(db,campaignId,actor);shared=rights.campaign;role=rights.role;owner=shared.owner_id;}
 const local=actorDoc.state.campaigns.find(c=>(c.id===campaignId||c.remoteCampaignId===campaignId)&&!c.remoteReadOnly&&(!c.remoteOwnerId||c.remoteOwnerId===actor));
 check(shared||local,'운영할 내 캠페인이 없습니다.',403);
 const snapshot=shared?JSON.parse(shared.snapshot):null,canonicalCampaign=snapshot?.campaign||local,initialCampaign=copy(canonicalCampaign);
 const members=new Set((canonicalCampaign.members||[]).map(m=>m.gangId));
 const enrollmentHistory=shared?(await db.prepare('SELECT * FROM campaign_join_requests WHERE campaign_id=?').bind(campaignId).all()).results:[],enrollments=enrollmentHistory.filter(row=>row.status==='approved');
 const sourceMappings=new Map(),usedEnrollments=new Map(),addedOwnedMembers=new Set(),reversedMemberAdds=new Set();
 async function resolve(gangId){
  if(sourceMappings.has(gangId))return sourceMappings.get(gangId);
  check(members.has(gangId),'캠페인 참가 갱만 변경할 수 있습니다.',403);
  const enrolled=enrollments.find(r=>'enrolled-'+r.id===gangId),user=enrolled?.user_id||owner,sourceId=enrolled?.gang_id||gangId;
  const doc=await document(user),gang=doc.state.gangs.find(g=>g.id===sourceId&&!g.remoteReadOnly&&(!g.remoteOwnerId||g.remoteOwnerId===user));check(gang,'갱 명단이 변경되었거나 삭제되었습니다.',409);
  check(String(gang.edition||'N23').toUpperCase()===String(canonicalCampaign.edition||'N23').toUpperCase(),'참가 갱의 판본이 변경되었습니다.',409);
  if(enrolled){const access=await db.prepare("SELECT role,status FROM campaign_access WHERE campaign_id=? AND user_id=?").bind(campaignId,user).first();check(access?.status==='accepted','참가 갱의 접근 권한이 변경되었습니다.',409);usedEnrollments.set(enrolled.id,enrolled);}
  else if(shared)check(addedOwnedMembers.has(gangId)||snapshot.gangs.some(g=>g.id===gangId&&!g.remoteReadOnly),'이 갱의 소유자를 확인할 수 없습니다.',403);
  const value={gangId,ownerId:user,sourceGangId:sourceId,doc,gang,originalGang:copy(gang),enrolled};sourceMappings.set(gangId,value);return value;
 }
 const hide=withoutPrivate,receiptResponse=async(row,replayed=false)=>{const fresh=await db.prepare('SELECT revision,state FROM documents WHERE user_id=?').bind(actor).first();const latest=await db.prepare('SELECT revision FROM shared_campaigns WHERE id=?').bind(campaignId).first();return response({receipt:publicReceipt(row,hide),replayed,document:{state:JSON.parse(fresh.state),revision:fresh.revision},campaignRevision:latest?.revision??null});};
 if(request.method==='GET'&&!match[2]){const rows=await db.prepare('SELECT * FROM campaign_automation_operations WHERE campaign_id=? ORDER BY created_at DESC,id DESC LIMIT 200').bind(campaignId).all();return response({receipts:rows.results.map(row=>publicReceipt(row,hide)),role,campaignRevision:shared?.revision??null});}
 check(request.method==='POST','지원하지 않는 운영 요청입니다.',405);
 const body=await json(request),consent=match[2]==='consent',reverse=!!match[3],closeIntent=!consent&&!reverse&&body.intent?.kind==='cycle-battles-close',cycleGuards=new Set();
 const owned=campaignOwnedIds(canonicalCampaign,actor,owner,actorDoc.state.gangs,enrollmentHistory,snapshot?.gangs||[],local);
 check(consent||['owner','arbitrator','editor'].includes(role)||owned.size>0,'캠페인 운영 권한이 없습니다.',403);
 check(!match[2]||consent||reverse,'지원하지 않는 운영 주소입니다.',404);
 let original=null,key,label,payloadHash;
 if(reverse){original=await db.prepare('SELECT * FROM campaign_automation_operations WHERE id=? AND campaign_id=?').bind(match[2],campaignId).first();check(original,'운영 기록을 찾을 수 없습니다.',404);check(!original.operation_key.startsWith('roster-registration:'),'캠페인 갱 등록은 정산 취소로 되돌릴 수 없습니다.',403);if(original.reversed_at)return receiptResponse(original,true);key='reverse:'+original.id;label='Undo '+original.label;}
 else{check(typeof body.operationKey==='string'&&body.operationKey.length>0&&body.operationKey.length<=160&&typeof body.label==='string'&&body.label.length>0&&body.label.length<=250||consent&&typeof body.operationKey==='string'&&body.operationKey.length>0&&body.operationKey.length<=160,'저장할 작업 정보를 확인할 수 없습니다. 작업을 다시 시작하세요.');key=body.operationKey;check(!key.startsWith('roster-registration:'),'캠페인 갱 등록 요청은 로비에서 처리하세요.',403);label=consent?'Captive source-owner consent':body.label;const payload=consent?{holderId:body.holderId,recordId:body.recordId,decision:body.decision,offerId:body.offerId??null}:{label,before:body.before,after:body.after,...(closeIntent?{intent:body.intent}:{})};validateJSON(payload,check);payloadHash=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(stable(payload)))),x=>x.toString(16).padStart(2,'0')).join('');const existing=await db.prepare('SELECT * FROM campaign_automation_operations WHERE campaign_id=? AND operation_key=?').bind(campaignId,key).first();if(existing){check(!consent||existing.actor_id===actor,'파이터를 소유한 플레이어만 응답 내용을 확인할 수 있습니다.',403);check(existing.payload_hash===payloadHash,'이미 보낸 요청과 내용이 다릅니다. 최신 상태를 불러온 뒤 다시 시도하세요.',409);return receiptResponse(existing,true);}}
 check(Number.isSafeInteger(body.documentRevision)&&body.documentRevision===actorDoc.revision,'개인 기록이 변경되었습니다. 동기화 후 다시 시도하세요.',409);
 if(shared&&body.expectedCampaignRevision!==undefined)check(body.expectedCampaignRevision===shared.revision,'캠페인 기록이 변경되었습니다. 새로고침 후 다시 시도하세요.',409);
 const changes=[];
 const automaticCycleUndo=reverse&&/^cycle-advance:/.test(original.operation_key)&&['owner','arbitrator'].includes(role)&&JSON.parse(original.changes).some(change=>change.target==='campaign'&&change.path[0]==='campaignSchedule'&&change.path[1]==='history'&&JSON.stringify(change.after||'').includes(original.operation_key));
 function apply(root,patch,target,mapping,internal=false){
  allowed(patch,target,check,internal);const found=locate(root,patch.path,check);check(same(found.value,patch.before),'변경 대상이 이미 수정되었습니다. 최신 기록을 확인하세요.',409);
  changes.push({target,...(mapping?{gangId:mapping.gangId,ownerId:mapping.ownerId,sourceGangId:mapping.sourceGangId}:{}),path:patch.path,beforeExists:found.exists,...(found.exists?{before:copy(found.value)}:{}),afterExists:patch.after!==undefined,...(patch.after!==undefined?{after:copy(patch.after)}:{})});
  write(root,patch.path,patch.after,patch.after!==undefined,check);
 }
 let campaignChanged=false;
 if(consent){
  check(typeof body.holderId==='string'&&typeof body.recordId==='string'&&['accept','decline','acknowledge'].includes(body.decision),'생포 동의 요청이 올바르지 않습니다.');
  const holder=await resolve(body.holderId),record=holder.gang.campaignCaptives?.find(r=>r.id===body.recordId&&r.campaignId===campaignId&&!r.releasedAt);check(record,'진행 중인 생포 기록이 없습니다.',409);
  const targetId=[...members].find(id=>{const r=enrollments.find(r=>'enrolled-'+r.id===id);return (r?.user_id||owner)===record.target?.ownerId&&(r?.gang_id||id)===record.target?.sourceId;});check(targetId,'생포된 파이터의 소유자를 확인할 수 없습니다.',403);
  const target=await resolve(targetId);check(actor===target.ownerId,'생포된 파이터를 소유한 플레이어만 확인할 수 있습니다.',403);
  const fighter=target.gang.fighters?.find(f=>f.id===record.target.fighterId);check(fighter,'생포 대상 파이터가 없습니다.',409);
  const holderAfter=copy(holder.gang),targetAfter=holder===target?holderAfter:copy(target.gang),r=holderAfter.campaignCaptives.find(x=>x.id===record.id),f=targetAfter.fighters.find(x=>x.id===fighter.id),at=stamp();
  if(body.decision==='acknowledge'){
   check(!record.sourceAcknowledgedBy&&!['Dead','Retired','Enslaved'].includes(f.status)&&(!f.campaignCaptureId||f.campaignCaptureId===r.id),'현재 파이터 상태에서는 생포를 확인할 수 없습니다.',409);
   if(!(record.rosterApplied&&f.campaignCaptureId===r.id&&object(r.beforeState))){
    r.beforeState={};for(const key of ['status','captured','capturedBy','captured_by_gang_id','campaignCaptureId'])if(own(f,key))r.beforeState[key]=copy(f[key]);
    if(r.beforeState.status==='Captured'||r.beforeState.captured===true||r.beforeState.captured==='true'){r.beforeState.status=f.inRecovery?'In Recovery':'Active';r.beforeState.captured=false;for(const key of ['capturedBy','captured_by_gang_id','campaignCaptureId'])delete r.beforeState[key];}
   }
   Object.assign(f,{status:'Captured',captured:true,capturedBy:body.holderId,captured_by_gang_id:body.holderId,campaignCaptureId:r.id});Object.assign(r,{rosterApplied:true,sourceAcknowledgedBy:actor,sourceAcknowledgedAt:at});
  }else{
   const offer=r.ransomOffer;check(offer&&offer.id===body.offerId&&offer.status==='offered'&&Number.isSafeInteger(offer.amount)&&offer.amount>=0&&offer.sourceOwnerId===target.ownerId&&offer.offeredBy===holder.ownerId,'유효한 몸값 제안이 아닙니다.',409);
   if(body.decision==='decline')Object.assign(offer,{status:'declined',declinedBy:actor,declinedAt:at});
   else{
    check(r.rosterApplied&&f.campaignCaptureId===r.id&&f.status==='Captured'&&Number.isSafeInteger(targetAfter.credits)&&targetAfter.credits>=offer.amount&&Number.isSafeInteger(Number(holderAfter.credits||0)+offer.amount),'몸값 지급 조건이나 파이터 상태가 변경되었습니다.',409);
    targetAfter.credits-=offer.amount;holderAfter.credits=Number(holderAfter.credits||0)+offer.amount;Object.assign(offer,{status:'accepted',acceptedBy:actor,acceptedAt:at});Object.assign(r,{releasedAt:at,releaseMethod:'ransom'});
    for(const key of ['status','captured','capturedBy','captured_by_gang_id','campaignCaptureId']){if(own(r.beforeState||{},key))f[key]=copy(r.beforeState[key]);else delete f[key];}
    const captured=value=>value===true||value==='true',injuryIds=new Set((f.injuries||[]).filter(i=>i.name==='Captured'||captured(i.rule_data?.captured)||captured((i.typeSpecificData||i.type_specific_data||{}).captured)).map(i=>i.id));
    if(injuryIds.size){f.injuries=f.injuries.filter(i=>!injuryIds.has(i.id));f.effects=(f.effects||[]).filter(e=>!injuryIds.has(e.injuryId));}
   }
  }
  for(const [mapping,next]of holder===target?[[holder,holderAfter]]:[[holder,holderAfter],[target,targetAfter]])for(const patch of diff(mapping.gang,next))apply(mapping.gang,patch,'gang',mapping,true);
 }else if(reverse){
  check(['owner','arbitrator','editor'].includes(role)||original.actor_id===actor,'본인이 처리한 갱 변경만 되돌릴 수 있습니다.',403);const campaignBefore=copy(canonicalCampaign);
  const list=JSON.parse(original.changes);
  for(const stored of [...list].reverse()){
   const patch={path:stored.path,before:stored.afterExists?stored.after:undefined,after:stored.beforeExists?stored.before:undefined};
   if(stored.target==='gang'){const mapping=await resolve(stored.gangId),consentUndo=original.actor_id===actor&&list.some(change=>change.target==='gang'&&['sourceAcknowledgedBy','acceptedBy','declinedBy'].includes(change.path.at(-1))&&change.after===actor);check(mapping.ownerId===actor||consentUndo||automaticCycleUndo,'다른 플레이어의 갱 변경은 되돌릴 수 없습니다.',403);check(mapping.ownerId===stored.ownerId&&mapping.sourceGangId===stored.sourceGangId,'갱 소유자가 변경되었습니다. 최신 명단을 불러오세요.',409);apply(mapping.gang,patch,'gang',mapping,true);}
   else{if(stored.path[0]==='members'&&stored.path.length===2&&!stored.beforeExists&&stored.after?.gangId)reversedMemberAdds.add(stored.after.gangId);apply(canonicalCampaign,patch,'campaign',null,true);campaignChanged=true;}
  }
  check(automaticCycleUndo||same(foreignPersonal(campaignBefore,owned),foreignPersonal(canonicalCampaign,owned)),'다른 플레이어의 개인 전투 기록은 되돌릴 수 없습니다.',403);requireLobbyReports?.(campaignBefore,canonicalCampaign,check);if(!['owner','arbitrator'].includes(role))requireArbitratorSettings(campaignBefore,canonicalCampaign,owned,check,{matchReverse:list.some(change=>change.target==='campaign'&&['battles','sessions'].includes(change.path[0]))});
  if(!['owner','arbitrator','editor'].includes(role)){const before=participantProtected(campaignBefore,owned),after=participantProtected(canonicalCampaign,owned);if(own(before,'activity'))after.activity=copy(before.activity);else delete after.activity;check(same(before,after),'본인 갱의 변경만 되돌릴 수 있습니다.',403);}
 }else{
  check(object(body.before)&&object(body.after)&&object(body.before.campaign)&&object(body.after.campaign)&&body.before.campaign.id===campaignId&&body.after.campaign.id===campaignId&&Array.isArray(body.before.gangs)&&Array.isArray(body.after.gangs),'캠페인 변경 전후 기록이 필요합니다.');
  requireOwnCampaignPersonal(body.before.campaign,body.after.campaign,owned,check);requireLobbyReports?.(body.before.campaign,body.after.campaign,check);if(!['owner','arbitrator'].includes(role))requireArbitratorSettings(body.before.campaign,body.after.campaign,owned,check);
  if(!['owner','arbitrator','editor'].includes(role)){
   const before=participantProtected(body.before.campaign,owned),after=participantProtected(body.after.campaign,owned);
   check(appendOnlyActivity(before.activity,after.activity),'다른 플레이어의 진행 기록을 수정할 수 없습니다.',403);if(own(before,'activity'))after.activity=copy(before.activity);else delete after.activity;
   check(same(before,after),'본인 갱의 크루·사이드 잡·파이터 결과·수입만 변경할 수 있습니다.',403);
  }
  // Owner membership already saved in the authoritative personal document may be
  // newer than the shared snapshot. Reconcile that baseline in this transaction;
  // it is not a new battle change and must survive reversing the battle receipt.
  if(shared&&actor===owner&&local&&Array.isArray(body.before.campaign.members)&&Array.isArray(body.after.campaign.members)&&String(local.edition).toUpperCase()===String(canonicalCampaign.edition).toUpperCase()){
   for(const member of local.members||[]){
    if(!object(member)||typeof member.id!=='string'||!member.id||typeof member.gangId!=='string'||!member.gangId)continue;
    if(members.has(member.gangId)||(canonicalCampaign.members||[]).some(m=>m.id===member.id)||String(member.gangId||'').startsWith('enrolled-'))continue;
    const beforeMember=body.before.campaign.members.find(m=>object(m)&&m.id===member.id&&m.gangId===member.gangId),afterMember=body.after.campaign.members.find(m=>object(m)&&m.id===member.id&&m.gangId===member.gangId);
    if(!same(member,beforeMember)||!same(member,afterMember))continue;
    const gang=actorDoc.state.gangs.find(g=>g.id===member.gangId&&!g.remoteReadOnly&&(!g.remoteOwnerId||g.remoteOwnerId===owner));
    if(!gang||String(gang.edition).toUpperCase()!==String(canonicalCampaign.edition).toUpperCase())continue;
    canonicalCampaign.members??=[];canonicalCampaign.members.push(hide(copy(member)));members.add(member.gangId);
    const index=snapshot.gangs.findIndex(g=>g.id===gang.id);if(index<0)snapshot.gangs.push(shareable(gang));else snapshot.gangs[index]=shareable(gang);
   }
  }
  // Native report saving may reach the owner's personal document before the
  // shared snapshot. Recover only an unchanged, server-owned report baseline;
  // the result changes remain journalled, while this prior report survives undo.
  if(shared&&actor===owner&&local&&Array.isArray(local.battles)&&Array.isArray(body.before.campaign.battles)&&Array.isArray(body.after.campaign.battles)&&(canonicalCampaign.battles===undefined||Array.isArray(canonicalCampaign.battles))&&String(local.edition).toUpperCase()===String(canonicalCampaign.edition).toUpperCase()){
   for(const report of local.battles){
    if(!object(report)||typeof report.id!=='string'||!report.id||report.id.length>160||(canonicalCampaign.battles||[]).some(b=>b?.id===report.id))continue;
    const personal=local.battles.filter(b=>b?.id===report.id),before=body.before.campaign.battles.filter(b=>b?.id===report.id),after=body.after.campaign.battles.filter(b=>b?.id===report.id);
    if(personal.length!==1||before.length!==1||after.length!==1||!same(report,before[0])||same(before[0],after[0]))continue;
    refs(report);canonicalCampaign.battles??=[];canonicalCampaign.battles.push(hide(copy(report)));campaignChanged=true;
   }
  }
  // Older native settings saves could store activity only in the owner's
  // personal document. Recover that exact retained server-owned history before
  // appending a new event; never replace an existing shared activity list.
  if(shared&&actor===owner&&local&&canonicalCampaign.activity===undefined&&keyed(local.activity)&&local.activity.length>0&&local.activity.every(row=>row.id.length<=160)&&same(local.activity,body.before.campaign.activity)&&keyed(body.after.campaign.activity)&&body.after.campaign.activity.length>local.activity.length){
   const retained=new Map(body.after.campaign.activity.map(row=>[row.id,row]));
   if(local.activity.every(row=>retained.has(row.id)&&same(row,retained.get(row.id)))){refs(local.activity);canonicalCampaign.activity=hide(copy(local.activity));campaignChanged=true;}
  }
  if(shared&&actor===owner&&local){reconcileEmptyArrayBaselines(body.before.campaign,body.after.campaign,canonicalCampaign,local);reconcileEmptyArrayBaselines(body.before.campaign,body.after.campaign,local,canonicalCampaign);}
  if(shared&&actor===owner&&local){reconcileConfigDefaults(body.before.campaign,body.after.campaign,canonicalCampaign,local);reconcileConfigDefaults(body.before.campaign,body.after.campaign,local,canonicalCampaign);}
  const beforeGangs=new Map(body.before.gangs.map(g=>[g.id,g])),afterGangs=new Map(body.after.gangs.map(g=>[g.id,g]));check(beforeGangs.size===body.before.gangs.length&&afterGangs.size===body.after.gangs.length&&beforeGangs.size===afterGangs.size&&[...beforeGangs.keys()].every(id=>afterGangs.has(id)),'이 작업에서는 갱의 ID를 바꾸거나 갱을 삭제할 수 없습니다.');
  const scalarBaseline=['owner','arbitrator'].includes(role)?addedConfigBaseline(body.before.campaign,body.after.campaign,canonicalCampaign):body.before.campaign,campaignBaseline=addedArrayBaseline(scalarBaseline,body.after.campaign,canonicalCampaign);
  for(const patch of diff(campaignBaseline,body.after.campaign)){
   if(patch.path[0]==='members'&&patch.path.length===2&&patch.before===undefined&&object(patch.after)){
    const member=patch.after;check(actor===owner&&Object.keys(member).every(k=>['id','gangId','player','role','allegianceId'].includes(k))&&member.id===patch.path[1]?.id&&typeof member.id==='string'&&member.id.length>0&&typeof member.player==='string'&&member.player.length<=500&&member.role==='Player'&&!members.has(member.gangId),'캠페인 소유자의 내 갱 추가만 자동 처리할 수 있습니다.',403);
    const gang=actorDoc.state.gangs.find(g=>g.id===member.gangId&&!g.remoteReadOnly&&!g.remoteOwnerId);check(gang&&String(gang.edition||'N23').toUpperCase()===String(canonicalCampaign.edition||'N23').toUpperCase(),'같은 판본을 사용하는 내 갱을 선택하세요.',403);
    members.add(member.gangId);addedOwnedMembers.add(member.gangId);await resolve(member.gangId);
   }
   apply(canonicalCampaign,patch,'campaign');campaignChanged=true;
  }
  for(const [gangId,before]of beforeGangs){const after=afterGangs.get(gangId);if(!diff(before,after).length)continue;const mapping=await resolve(gangId);check(mapping.ownerId===actor,'본인이 소유한 갱만 변경할 수 있습니다.',403);const baseline=addedArrayBaseline(before,after,mapping.gang);for(const patch of diff(baseline,after))apply(mapping.gang,patch,'gang',mapping);}
 }

 if(closeIntent)check(supportedCycleCampaign(initialCampaign),'이 캠페인은 확인된 사이클 전투 마감 방식을 사용하지 않습니다.',409);
 const autoTransition=!consent&&!reverse?automaticCycleTransition(initialCampaign,canonicalCampaign,key,check):null;
 if(!consent&&!reverse&&supportedCycleCampaign(initialCampaign)){
  const changedClosure=!same(closureMap(initialCampaign),closureMap(canonicalCampaign));
  check(!changedClosure||closeIntent,'사이클 전투 마감은 아비트레이터의 전투 마감 작업으로 처리하세요.',403);
  if(closeIntent){
   const n=body.intent.cycle;check(Object.keys(body.intent).every(name=>['kind','cycle'].includes(name))&&Number.isSafeInteger(n)&&key.startsWith('cycle-battles-close:'+n+':')&&n===cycleNumber(initialCampaign)&&cycleNumber(canonicalCampaign)===n,'현재 사이클의 전투만 마감할 수 있습니다.',409);
   check(['owner','arbitrator'].includes(role),'아비트레이터만 사이클 전투를 마감할 수 있습니다.',403);
   check(initialCampaign.phase!=='Closed'&&!initialCampaign.campaignSchedule?.completed,'이미 종료된 캠페인입니다.',409);
   check(!await verifiedCycleClosed(db,campaignId,initialCampaign,n),'이번 사이클의 전투는 이미 마감되었습니다. 새로고침하세요.',409);
   check(same(withoutNewClosure(body.before.campaign,n),withoutNewClosure(body.after.campaign,n))&&same(body.before.gangs,body.after.gangs),'전투 마감과 다른 변경은 따로 처리하세요.',400);
   const proposed=battlePhaseRecord(canonicalCampaign,n);check(proposed&&typeof proposed.battlePhaseClosedAt==='string'&&Number.isFinite(Date.parse(proposed.battlePhaseClosedAt))&&proposed.battlePhaseClosedBy===actor,'전투 마감 기록이 올바르지 않습니다.',400);
   await requireNoPendingCycle(db,campaignId,initialCampaign,n,check);cycleGuards.add(n);
   const next=copy(canonicalCampaign);next.automation??={};next.automation.cycleRecords??={};next.automation.cycleRecords[String(n)]={...(next.automation.cycleRecords[String(n)]||{}),battlePhaseClosedAt:stamp(),battlePhaseClosedBy:actor,battlePhaseCloseOperationKey:key};
   for(const patch of diff(canonicalCampaign,next)){apply(canonicalCampaign,patch,'campaign',null,true);campaignChanged=true;}
  }
  const closedCurrent=cycleNumber(initialCampaign);
  if(battlePhaseRecord(initialCampaign,closedCurrent)?.battlePhaseClosedAt){
   const previousSessions=new Set((initialCampaign.sessions||[]).map(row=>row.id)),previousChallenges=new Set((initialCampaign.automation?.challenges||[]).map(row=>row.id)),pending=pendingCycleRecords(canonicalCampaign,closedCurrent);
   check(!(canonicalCampaign.sessions||[]).some(row=>Number(row.cycle||closedCurrent)===closedCurrent&&!previousSessions.has(row.id))&&!(canonicalCampaign.automation?.challenges||[]).some(row=>Number(row.cycle||closedCurrent)===closedCurrent&&!previousChallenges.has(row.id))&&!pending.sessions.length&&!pending.battles.length&&!pending.challenges.length,'전투를 마감한 사이클에는 새 도전·전투를 만들거나 결과를 다시 진행 상태로 바꿀 수 없습니다.',409);
  }
  for(const n of changedPostCycles(initialCampaign,canonicalCampaign)){
   check(await verifiedCycleClosed(db,campaignId,initialCampaign,n),'사이클 전투가 아직 마감되지 않았습니다. 아비트레이터가 전투·결과 확인을 마친 뒤 전투를 마감해야 합니다.',409);
   await requireNoPendingCycle(db,campaignId,initialCampaign,n,check);cycleGuards.add(n);
  }
 }
 if(reverse&&/^cycle-battles-close:/.test(original.operation_key)){
  check(['owner','arbitrator'].includes(role),'아비트레이터만 사이클 전투 마감을 되돌릴 수 있습니다.',403);const n=Number(original.operation_key.split(':')[1]);check(n===cycleNumber(initialCampaign),'다음 사이클로 진행한 전투 마감은 되돌릴 수 없습니다.',409);
  check(!['incomeReceipts','postCycleActions','rosterFinalized','medicalEscorts','baseCampRecovery'].some(name=>(initialCampaign.automationEconomy?.[name]||[]).some(row=>Number(row.cycle)===n)),'수입·치료·사이클 행동이 처리된 뒤에는 전투 마감을 되돌릴 수 없습니다.',409);
 }
 if(autoTransition){
  check(['owner','arbitrator'].includes(role),'아비트레이터만 사이클을 마감할 수 있습니다.',403);
  const beforeCycle=autoTransition.before.cycle,nextCycle=autoTransition.after.cycle,autoCampaign=copy(canonicalCampaign),at=stamp();autoCampaign.automationEconomy??={};
  const ledger=(name)=>(autoCampaign.automationEconomy[name]??=[]),belongs=(row,id)=>row.gangKey?row.gangKey===id:row.gangId===id;
  autoCampaign.automation??={};autoCampaign.automation.cycleRecords??={};if(!await verifiedCycleClosed(db,campaignId,initialCampaign,beforeCycle))autoCampaign.automation.cycleRecords[String(beforeCycle)]={...(autoCampaign.automation.cycleRecords[String(beforeCycle)]||{}),battlePhaseClosedAt:at,battlePhaseClosedBy:actor,battlePhaseCloseOperationKey:key};
  for(const member of canonicalCampaign.members||[]){
   const mapping=await resolve(member.gangId),g=copy(mapping.gang),income=ledger('incomeReceipts');
   if(!income.some(row=>belongs(row,mapping.gangId)&&row.cycle===beforeCycle)){
    check(Number.isSafeInteger(g.credits)&&g.credits>=0&&Number.isSafeInteger(g.reputation)&&g.reputation>=0,'수입을 정산할 갱의 크레딧·명성을 확인하세요.',409);
    const rows=[],spyrer=(g.gangTypeId||g.gang_type_id)==='official-n26-002-gang-spyre-hunters',reputationCredits=g.reputation*10;let credits=reputationCredits,tp=0;
    for(const territory of initialCampaign.territories||[]){
     if((territory.gangId||territory.gang_id)!==mapping.gangId)continue;
     const ruleId=territory.territoryId||'',authored=own(territory,'credits'),known=own(AUTO_N26_TERRITORY_INCOME,ruleId);check(ruleId!=='official-n26-002-territory-spyrer-base-camp'||spyrer,'스파이어러 전용 영토의 소유자를 확인하세요: '+String(territory.name||territory.id),409);let amount=territory.noIncome===true?0:authored?territory.credits:spyrer&&known?15:AUTO_N26_TERRITORY_INCOME[ruleId];
     check(Number.isSafeInteger(amount)&&amount>=0,'수입을 확인할 수 없는 영토입니다: '+String(territory.name||territory.id)+'. 영토 설정에 수입액 또는 수입 없음(0)을 지정하세요.',409);
     credits+=amount;if(!spyrer&&ruleId==='official-003-territory-tech-bazaar')tp+=1;rows.push({territoryId:territory.id,name:territory.name||'',amount,rolls:[],choice:'credits',ruined:!!territory.ruined});
    }
    check(Number.isSafeInteger(g.credits+credits)&&Number.isSafeInteger(Number(g.tradePoints||0)+tp),'정산 후 크레딧·거래 포인트가 올바르지 않습니다.',409);
    if(tp>0&&g.tradingPostVisit&&!g.tradingPostVisit.closedAt)check(g.tradingPostVisit.campaignId===campaignId,'다른 캠페인의 거래소 방문을 먼저 마무리하세요.',409);
    g.credits+=credits;g.tradePoints=Number(g.tradePoints||0)+tp;
    income.push({id:uid(),gangId:mapping.gangId,gangKey:mapping.gangId,cycle:beforeCycle,credits,tp,rows,pending:[],reputationCredits,at,automatic:true,tradePointsAfter:g.tradePoints,recoverySnapshot:[...(g.fighters||[]),...(g.vehicles||[])].filter(f=>f.status==='In Recovery'||f.inRecovery===true).map(f=>({fighterId:f.id,status:f.status,inRecovery:!!f.inRecovery}))});
   }
   if(autoTransition.before.stage==='Downtime'&&(autoTransition.after.stage!=='Downtime'||autoTransition.completed))for(const allowance of g.campaignDowntimeAllowances||[])if(allowance.campaignId===campaignId&&allowance.occurrence==='downtime:'+autoTransition.before.stageStart&&!allowance.closed){allowance.closed=true;allowance.closedAt=at;}
   if(!autoTransition.completed&&autoTransition.after.stage==='Downtime'){
    const occurrence='downtime:'+autoTransition.after.stageStart,receipts=ledger('downtimeReceipts');
    if(!receipts.some(row=>belongs(row,mapping.gangId)&&row.occurrence===occurrence)){
     const existing=(g.campaignDowntimeAllowances||[]).find(a=>a.campaignId===campaignId&&a.occurrence===occurrence);let allowance=existing;
     if(!allowance){allowance={id:uid(),campaignId,occurrence,cycle:nextCycle,granted:250,remaining:250,closed:false,spending:[],automatic:true};(g.campaignDowntimeAllowances??=[]).push(allowance);}
     receipts.push({id:uid(),gangId:mapping.gangId,gangKey:mapping.gangId,occurrence,cycle:nextCycle,allowanceId:allowance.id,at,automatic:true});
    }
   }
   for(const patch of diff(mapping.gang,g))apply(mapping.gang,patch,'gang',mapping,true);
  }
  for(const patch of diff(canonicalCampaign,autoCampaign)){apply(canonicalCampaign,patch,'campaign',null,true);campaignChanged=true;}
 }
 requireLobbyReports?.(initialCampaign,canonicalCampaign,check);
 if(!consent&&!reverse&&!['owner','arbitrator','editor'].includes(role))check(changes.some(change=>change.target==='gang'||change.target==='campaign'&&!['activity','automation'].includes(change.path[0])),'본인 갱의 변경 내용이 필요합니다.',403);
 check(changes.length>0&&changes.length<=10000,'적용할 운영 변경이 없거나 너무 많습니다.');
 // All referenced gangs must still be campaign members. Ownership remains immutable.
 function refs(value,key=''){if(Array.isArray(value)){for(const x of value)refs(x,key);return;}if(object(value)){for(const [k,x]of Object.entries(value))refs(x,k);return;}if(typeof value==='string'&&value&&['gangId','gang_id','attacker','defender','winner','winners','challenger','opponent','claimedByGangId','stakeOwnerBefore','controlledBy','claimedBy','gangA','gangB','capturedBy','captured_by_gang_id'].includes(key))check(members.has(value),'캠페인 밖의 갱을 운영 기록에 연결할 수 없습니다.');}
 for(const change of changes)if(change.target==='campaign'&&change.afterExists)refs(change.after,typeof change.path.at(-1)==='string'?change.path.at(-1):'');
 if(campaignChanged&&shared&&owner===actor){const ownerCampaign=local;if(ownerCampaign){for(const change of changes.filter(c=>c.target==='campaign')){const current=locate(ownerCampaign,change.path,check);check(same(current.value,change.beforeExists?change.before:undefined),'내 캠페인과 공유된 캠페인의 내용이 다릅니다. 먼저 새로고침하세요.',409);write(ownerCampaign,change.path,change.after,change.afterExists,check);}actorDoc.changed=true;}}
 if(shared&&actor===owner&&local&&(local.remoteRevision!==undefined||local.remoteCampaignId||local.remoteOwnerId)){local.remoteRevision=shared.revision+1;actorDoc.changed=true;}
 if(campaignChanged&&!shared)actorDoc.changed=true;
 for(const mapping of sourceMappings.values())if(changes.some(c=>c.target==='gang'&&c.gangId===mapping.gangId))mapping.doc.changed=true;

 // Phase-only mirroring keeps an arbitrator close visible in the owner's
 // original campaign without replacing private fields or claiming a full sync.
 if(shared&&(closeIntent||reverse&&/^cycle-battles-close:/.test(original.operation_key))){
  const n=closeIntent?body.intent.cycle:Number(original.operation_key.split(':')[1]),record=battlePhaseRecord(canonicalCampaign,n)||{},mirrorDocs=new Set([actorDoc]);if(owner!==actor)mirrorDocs.add(await document(owner));
  for(const doc of mirrorDocs){if(doc.user===owner&&actor===owner)continue;for(const personal of doc.state.campaigns||[]){
   const matches=doc.user===owner?(personal.id===campaignId||personal.remoteCampaignId===campaignId)&&!personal.remoteReadOnly&&(!personal.remoteOwnerId||personal.remoteOwnerId===owner):personal.remoteCampaignId===campaignId&&personal.remoteOwnerId===owner;if(!matches)continue;
   const prior=stable(personal);personal.automation??={};personal.automation.cycleRecords??={};const row={...(personal.automation.cycleRecords[String(n)]||{})};for(const field of ['battlePhaseClosedAt','battlePhaseClosedBy','battlePhaseCloseOperationKey']){if(own(record,field))row[field]=copy(record[field]);else delete row[field];}
   if(Object.keys(row).length)personal.automation.cycleRecords[String(n)]=row;else delete personal.automation.cycleRecords[String(n)];if(!Object.keys(personal.automation.cycleRecords).length)delete personal.automation.cycleRecords;if(emptyAutomation(personal.automation))delete personal.automation;if(personal.remoteRevision!==undefined)personal.remoteRevision=Math.min(Number.isSafeInteger(personal.remoteRevision)?personal.remoteRevision:0,shared.revision);if(stable(personal)!==prior)doc.changed=true;
  }}
 }
 // Finance can change a participant document without replacing its imported
 // campaign. Keep only common progression metadata and the touched own receipts
 // consistent; never advance its full-snapshot revision from a partial mirror.
 if(shared&&(autoTransition||automaticCycleUndo)){
  if(automaticCycleUndo)for(const member of canonicalCampaign.members||[])await resolve(member.gangId);
  for(const doc of documents.values()){
   if(doc.user===owner&&doc.user===actor)continue;
   const ids=new Set([...sourceMappings.values()].filter(m=>m.ownerId===doc.user).map(m=>m.gangId));
   const ownRow=row=>row.gangKey?ids.has(row.gangKey):ids.has(row.gangId);
   for(const personal of doc.state.campaigns||[]){
    const matches=doc.user===owner?(personal.id===campaignId||personal.remoteCampaignId===campaignId)&&!personal.remoteReadOnly&&(!personal.remoteOwnerId||personal.remoteOwnerId===owner):personal.remoteCampaignId===campaignId&&personal.remoteOwnerId===owner;
    if(!matches)continue;
    personal.currentCycle=canonicalCampaign.currentCycle;
    personal.campaignSchedule={...(personal.campaignSchedule||{}),mode:canonicalCampaign.campaignSchedule.mode,stages:copy(canonicalCampaign.campaignSchedule.stages),history:copy(canonicalCampaign.campaignSchedule.history||[]),completed:!!canonicalCampaign.campaignSchedule.completed};
    for(const name of ['incomeReceipts','downtimeReceipts']){
     const oldRows=initialCampaign.automationEconomy?.[name]||[],newRows=canonicalCampaign.automationEconomy?.[name]||[],beforeIds=new Set(oldRows.map(r=>r.id)),afterIds=new Set(newRows.map(r=>r.id)),removed=new Set(oldRows.filter(r=>ownRow(r)&&!afterIds.has(r.id)).map(r=>r.id)),added=newRows.filter(r=>ownRow(r)&&!beforeIds.has(r.id));
     if(added.length||removed.size){personal.automationEconomy??={};const retained=(personal.automationEconomy[name]||[]).filter(r=>!removed.has(r.id)),present=new Set(retained.map(r=>r.id));for(const row of added)if(!present.has(row.id))retained.push(copy(row));if(retained.length||canonicalCampaign.automationEconomy?.[name])personal.automationEconomy[name]=retained;else delete personal.automationEconomy[name];if(!Object.keys(personal.automationEconomy).length)delete personal.automationEconomy;}
    }
    if(personal.remoteRevision!==undefined)personal.remoteRevision=Math.min(Number.isSafeInteger(personal.remoteRevision)?personal.remoteRevision:0,shared.revision);
    doc.changed=true;
   }
  }
 }
 // Refresh the target shared snapshot from each authoritative source, never client ownership fields.
 if(shared)for(const mapping of sourceMappings.values()){
  const index=snapshot.gangs.findIndex(g=>g.id===mapping.gangId),next=mapping.enrolled?enrolledGang(mapping.enrolled,mapping.gang):shareable(mapping.gang);check(index>=0||addedOwnedMembers.has(mapping.gangId),'공유 갱 기록이 없습니다.',409);
  if(index>=0)snapshot.gangs[index]=next;else snapshot.gangs.push(next);
 }
 if(shared&&reversedMemberAdds.size)snapshot.gangs=snapshot.gangs.filter(g=>!reversedMemberAdds.has(g.id)||(canonicalCampaign.members||[]).some(m=>m.gangId===g.id));
 const allianceRosters=shared?[...snapshot.gangs,...[...sourceMappings.values()].flatMap(mapping=>[mapping.originalGang,mapping.gang].map(g=>({...g,id:mapping.gangId,sourceGangId:mapping.sourceGangId,enrollmentRequestId:mapping.enrolled?.id})))]:[...actorDoc.state.gangs,...[...sourceMappings.values()].flatMap(mapping=>[mapping.originalGang,mapping.gang])];
 requireAllianceCampaignTransition(initialCampaign,canonicalCampaign,allianceRosters,check);
 for(const mapping of sourceMappings.values()){
  const g=mapping.gang;requireAllianceGangTransition(mapping.originalGang,g,check);for(const key of ['credits','reputation','tradePoints'])if(g[key]!==undefined)check(Number.isSafeInteger(g[key])&&g[key]>=0,'크레딧·명성·거래 포인트는 0 이상의 정수여야 합니다.');
  check(Array.isArray(g.fighters||[])&&Array.isArray(g.vehicles||[]),'파이터 목록 형식이 올바르지 않습니다.');const models=[...(g.fighters||[]),...(g.vehicles||[])];check(new Set(models.map(f=>f.id)).size===models.length,'파이터 식별자가 중복됩니다.');
  for(const f of models){check(typeof f.id==='string'&&f.id.length>0&&f.id.length<=160&&typeof f.name==='string'&&f.name.length<=500,'파이터 식별 정보가 올바르지 않습니다.');if(f.xp!==undefined)check(Number.isSafeInteger(f.xp)&&f.xp>=0,'XP 합계가 올바르지 않습니다.');for(const key of ['equipment','skills','skillDetails','effects','injuries','advancements','loadouts','xpHistory','ooaRecords','specialRules','subtypes'])if(f[key]!==undefined)check(Array.isArray(f[key]),'파이터 목록 필드 형식이 올바르지 않습니다: '+key);}
  for(const r of g.campaignCaptives||[])if(r.campaignId===campaignId){
   const previous=mapping.originalGang.campaignCaptives?.find(old=>old.id===r.id);if(same(previous,r))continue;
   const ref=[...members].find(id=>{const enrolled=enrollments.find(e=>'enrolled-'+e.id===id);return (enrolled?.user_id||owner)===r.target?.ownerId&&(enrolled?.gang_id||id)===r.target?.sourceId;});check(ref,'생포된 파이터의 소유자가 일치하지 않습니다.');
   if(r.ransomOffer?.status==='offered'){check(r.ransomOffer.offeredBy===mapping.ownerId&&r.ransomOffer.sourceOwnerId===r.target.ownerId&&Number.isSafeInteger(r.ransomOffer.amount)&&r.ransomOffer.amount>=0,'몸값 제안의 소유자나 금액이 올바르지 않습니다.');if(!consent&&!reverse&&!same(previous?.ransomOffer,r.ransomOffer))check(actor===mapping.ownerId,'생포한 갱을 소유한 플레이어만 몸값을 제안할 수 있습니다.',403);}
   if(!consent&&!reverse&&r.rosterApplied&&!previous?.rosterApplied)check(actor===r.target.ownerId,'상대 갱의 생포 상태는 해당 플레이어만 확인할 수 있습니다.',403);
   if(!consent&&!reverse&&r.releasedAt&&!previous?.releasedAt){
    check(r.releaseMethod!=='ransom','몸값을 지급하려면 파이터를 소유한 플레이어가 제안을 수락해야 합니다.',403);
    if(r.releaseMethod==='rescue'){
     const battle=[...(initialCampaign.battles||[]),...(initialCampaign.sessions||[])].find(b=>b.id===r.releaseBattleId),winners=battle?.winners||[battle?.winner],participants=(battle?.participants||[{gangId:battle?.attacker},{gangId:battle?.defender}]).map(p=>p.gangId||p.gang_id);
     check(battle&&['Played','Completed'].includes(battle.status)&&winners.includes(ref)&&participants.includes(mapping.gangId)&&battle.rescueResults?.some(result=>result.captureId===r.id&&result.fighterId===r.target.fighterId&&result.rescued===true),'완료된 구출 전투의 승자·참가자·구출 결과를 확인할 수 없습니다.',409);
    }
   }
  }
 }
 const at=stamp(),receiptId=reverse?original.id:uid(),token=uid(),updatedDocs=[...documents.values()].filter(d=>d.changed),revisions=Object.fromEntries(updatedDocs.map(d=>[d.user,{before:d.revision,after:d.revision+1}]));
 const guards=['NOT EXISTS(SELECT 1 FROM campaign_deletions WHERE campaign_id=?)'],args=[campaignId];
 for(const doc of documents.values()){guards.push('EXISTS(SELECT 1 FROM documents WHERE user_id=? AND revision=?)');args.push(doc.user,doc.revision);}
 if(shared){guards.push('EXISTS(SELECT 1 FROM shared_campaigns WHERE id=? AND owner_id=? AND revision=?)');args.push(campaignId,owner,shared.revision);if(actor!==owner){guards.push("EXISTS(SELECT 1 FROM campaign_access WHERE campaign_id=? AND user_id=? AND status='accepted' AND role=?)");args.push(campaignId,actor,role);}}
 else{guards.push('NOT EXISTS(SELECT 1 FROM shared_campaigns WHERE id=?)');args.push(campaignId);}
 for(const enrolled of usedEnrollments.values()){guards.push("EXISTS(SELECT 1 FROM campaign_join_requests WHERE id=? AND campaign_id=? AND user_id=? AND gang_id=? AND status='approved') AND EXISTS(SELECT 1 FROM campaign_access WHERE campaign_id=? AND user_id=? AND status='accepted')");args.push(enrolled.id,campaignId,enrolled.user_id,enrolled.gang_id,campaignId,enrolled.user_id);}
 for(const n of cycleGuards){guards.push(activeCycleRoomSQL);args.push(campaignId,n);}
 if(reverse){guards.push('EXISTS(SELECT 1 FROM campaign_automation_operations WHERE id=? AND reversed_at IS NULL)');args.push(original.id);}
 const commands=[db.prepare('INSERT INTO campaign_automation_assertions(token,valid) VALUES(?,CASE WHEN '+guards.join(' AND ')+' THEN 1 ELSE 0 END)').bind(token,...args)];
 for(const doc of updatedDocs)commands.push(db.prepare('UPDATE documents SET state=?,revision=revision+1,updated_at=? WHERE user_id=? AND revision=?').bind(validateState(doc.state),at,doc.user,doc.revision));
 if(shared)commands.push(db.prepare('UPDATE shared_campaigns SET snapshot=?,revision=revision+1,updated_at=? WHERE id=? AND revision=?').bind(validSnapshot(snapshot,campaignId),at,campaignId,shared.revision));
 if(reverse)commands.push(db.prepare('UPDATE campaign_automation_operations SET reversed_at=?,reversed_by=?,reverse_revisions=? WHERE id=? AND reversed_at IS NULL').bind(at,actor,JSON.stringify(revisions),original.id));
 else commands.push(db.prepare('INSERT INTO campaign_automation_operations(id,campaign_id,operation_key,actor_id,label,payload_hash,changes,source_revisions,campaign_revision,cycle,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)').bind(receiptId,campaignId,key,actor,label,payloadHash,JSON.stringify(changes),JSON.stringify(revisions),shared?shared.revision+1:null,Number.isSafeInteger(canonicalCampaign.currentCycle)?canonicalCampaign.currentCycle:null,at));
 commands.push(db.prepare('DELETE FROM campaign_automation_assertions WHERE token=?').bind(token));
 try{await db.batch(commands);}catch(error){if(!reverse){const existing=await db.prepare('SELECT * FROM campaign_automation_operations WHERE campaign_id=? AND operation_key=?').bind(campaignId,key).first();if(existing){check(!consent||existing.actor_id===actor,'파이터를 소유한 플레이어만 응답 내용을 확인할 수 있습니다.',403);check(existing.payload_hash===payloadHash,'이미 보낸 요청과 내용이 다릅니다. 최신 상태를 불러온 뒤 다시 시도하세요.',409);return receiptResponse(existing,true);}}else{const existing=await db.prepare('SELECT * FROM campaign_automation_operations WHERE id=?').bind(original.id).first();if(existing?.reversed_at)return receiptResponse(existing,true);}if(/automation_guard|CHECK constraint|UNIQUE constraint/.test(String(error.message)))throw new ApiError(409,'기록이나 접근 권한이 변경되었습니다. 새로고침 후 다시 시도하세요.');throw error;}
 const saved=await db.prepare('SELECT * FROM campaign_automation_operations WHERE id=?').bind(receiptId).first();return receiptResponse(saved);
}
