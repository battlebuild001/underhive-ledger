/* A cycle enters its post-cycle phase only after an explicit arbitrator close. */
const rowCycle=(row,current)=>Number.isSafeInteger(Number(row?.cycle))&&Number(row.cycle)>0?Number(row.cycle):current;
const terminal=new Set(['completed','played','cancelled','declined']);
const status=row=>String(row?.status||row?.stage||'').toLowerCase();
export const cycleNumber=c=>Number.isSafeInteger(Number(c?.currentCycle))&&Number(c.currentCycle)>0?Number(c.currentCycle):1;
export const supportedCycleCampaign=c=>String(c?.edition).toUpperCase()==='N26'&&(c.campaignTypeId==='official-003-campaign-necromunda-campaign'||!c.campaignTypeId&&c.campaignType==='Necromunda Campaign');
export const battlePhaseRecord=(c,n=cycleNumber(c))=>c?.automation?.cycleRecords?.[String(n)]||null;
export const battlePhaseClosed=(c,n=cycleNumber(c))=>!!battlePhaseRecord(c,n)?.battlePhaseClosedAt;
export function pendingCycleRecords(c,n=cycleNumber(c)){
 const reports=[...(c.sessions||[]),...(c.battles||[])],done=row=>terminal.has(status(row))||terminal.has(String(row?.stage||'').toLowerCase());
 const sessions=(c.sessions||[]).filter(row=>rowCycle(row,n)===n&&!done(row));
 const battles=(c.battles||[]).filter(row=>rowCycle(row,n)===n&&!done(row));
 const challenges=(c.automation?.challenges||[]).filter(row=>rowCycle(row,n)===n&&!done(row)&&!reports.some(report=>rowCycle(report,n)===n&&(['completed','played'].includes(status(report))||String(report.stage||'').toLowerCase()==='completed')&&(report.challengeId===row.id||report.id===row.sessionId)));
 return {sessions,battles,challenges};
}
export const activeCycleRoomSQL="NOT EXISTS(SELECT 1 FROM campaign_lobby_rooms WHERE campaign_id=? AND CAST(json_extract(state,'$.cycle') AS INTEGER)=? AND status NOT IN ('completed','declined','cancelled'))";
export async function requireNoPendingCycle(db,campaignId,c,n,check){
 const pending=pendingCycleRecords(c,n);
 check(!pending.sessions.length&&!pending.battles.length&&!pending.challenges.length,'현재 사이클의 전투·도전과 결과 기록을 모두 마친 뒤 전투를 마감하세요.',409);
 const rooms=await db.prepare("SELECT id FROM campaign_lobby_rooms WHERE campaign_id=? AND CAST(json_extract(state,'$.cycle') AS INTEGER)=? AND status NOT IN ('completed','declined','cancelled') LIMIT 1").bind(campaignId,n).first();
 check(!rooms,'초대·준비·진행·결과 확인 중인 경기가 있습니다. 모두 종료한 뒤 사이클 전투를 마감하세요.',409);
}
function storedAfter(changes,path){let result;for(const change of changes||[]){if(change.target!=='campaign'||!change.afterExists||change.path.length>path.length)continue;const prefix=path.slice(0,change.path.length);if(!prefix.every((part,i)=>part===change.path[i]))continue;let value=change.after;for(const key of path.slice(change.path.length))value=value?.[key];result=value;}return result;}
export async function verifiedCycleClosed(db,campaignId,c,n){
 const marker=battlePhaseRecord(c,n),key=marker?.battlePhaseCloseOperationKey;
 if(marker?.battlePhaseClosedAt&&typeof key==='string'){
  const receipt=await db.prepare('SELECT actor_id,operation_key,changes,reversed_at FROM campaign_automation_operations WHERE campaign_id=? AND operation_key=?').bind(campaignId,key).first();
  if(receipt&&!receipt.reversed_at&&/^(?:cycle-battles-close|cycle-advance):/.test(key)){
   const path=['automation','cycleRecords',String(n)],changes=JSON.parse(receipt.changes),at=storedAfter(changes,[...path,'battlePhaseClosedAt']),by=storedAfter(changes,[...path,'battlePhaseClosedBy']),operation=storedAfter(changes,[...path,'battlePhaseCloseOperationKey']);
   if(at===marker.battlePhaseClosedAt&&by===marker.battlePhaseClosedBy&&by===receipt.actor_id&&operation===key)return true;
  }
 }
 // Older completed progression records predate the explicit battle-phase marker.
 const current=cycleNumber(c),history=(c.campaignSchedule?.history||[]).filter(row=>!row.undoneAt&&Number(row.fromCycle)===n&&(Number(row.toCycle)>n||n===current&&c.campaignSchedule?.completed&&row.finishedAfter===true));
 for(const row of history){if(n>current||n===current&&!c.campaignSchedule?.completed)continue;if(!row.automationOperationKey)return true;const receipt=await db.prepare('SELECT operation_key,reversed_at FROM campaign_automation_operations WHERE campaign_id=? AND operation_key=?').bind(campaignId,row.automationOperationKey).first();if(!receipt||!receipt.reversed_at&&receipt.operation_key.startsWith('cycle-advance:'+n+':'))return true;}
 return false;
}
export function changedPostCycles(before,after){
 const result=new Set();
 for(const name of ['incomeReceipts','postCycleActions','rosterFinalized','medicalEscorts','baseCampRecovery']){
  const old=before.automationEconomy?.[name]||[],next=after.automationEconomy?.[name]||[];
  const seen=new Set(old.map(row=>JSON.stringify(row)));
  for(const row of next)if(!seen.has(JSON.stringify(row))){const n=Number(row.cycle);if(Number.isSafeInteger(n)&&n>0)result.add(n);}
 }
 return result;
}
export function closureMap(c){return Object.fromEntries(Object.entries(c?.automation?.cycleRecords||{}).filter(([,row])=>row?.battlePhaseClosedAt||row?.battlePhaseClosedBy||row?.battlePhaseCloseOperationKey).map(([n,row])=>[n,{battlePhaseClosedAt:row.battlePhaseClosedAt,battlePhaseClosedBy:row.battlePhaseClosedBy,battlePhaseCloseOperationKey:row.battlePhaseCloseOperationKey}]));}
export function withoutNewClosure(c,n){const value=JSON.parse(JSON.stringify(c));const row=value.automation?.cycleRecords?.[String(n)];if(row){for(const key of ['battlePhaseClosedAt','battlePhaseClosedBy','battlePhaseCloseOperationKey'])delete row[key];if(!Object.keys(row).length)delete value.automation.cycleRecords[String(n)];}if(value.automation){const a=value.automation;for(const key of ['cycleRecords','deadlines'])if(a[key]&&!Object.keys(a[key]).length)delete a[key];for(const key of ['challenges','receipts','announcements'])if(Array.isArray(a[key])&&!a[key].length)delete a[key];if(a.version===1)delete a.version;if(!Object.keys(a).length)delete value.automation;}return value;}
