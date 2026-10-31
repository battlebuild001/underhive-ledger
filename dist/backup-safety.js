/* Validate a detached backup before replacing records; preserve one recovery copy. */
(function(){
 'use strict';
 const RECOVERY=KEY+'-before-import',MAX_FILE=32*1024*1024;
 const recoveryKey=()=>RECOVERY+':'+(window.AccountParity?.account?.id||'guest');
 const plain=value=>!!value&&typeof value==='object'&&!Array.isArray(value);
 const copy=value=>JSON.parse(JSON.stringify(value));
 const tr=(ko,en)=>window.UKI18n?.language==='en'?en:ko;
 const fail=message=>{throw Error(message);};
 function record(value,label){if(!plain(value))fail(label+': '+tr('기록 형식이 올바르지 않습니다.','Invalid record.'));return value;}
 function array(owner,key,label,defaults=true){if(owner[key]===undefined&&defaults)owner[key]=[];if(!Array.isArray(owner[key]))fail(label+': '+tr('목록 형식이 올바르지 않습니다.','Expected a list.'));return owner[key];}
 function identities(rows,label,requireName=false){const seen=new Set();for(const row of rows){record(row,label);if(typeof row.id!=='string'||!row.id||row.id.length>160||seen.has(row.id))fail(label+': '+tr('ID가 없거나 중복되었습니다.','Missing or duplicate ID.'));seen.add(row.id);if(requireName&&(typeof row.name!=='string'||row.name.length>500))fail(label+': '+tr('이름 형식이 올바르지 않습니다.','Invalid name.'));}}
 function validateBackup(wrapper){
  record(wrapper,tr('백업','Backup'));if(wrapper.version!=null&&wrapper.version!==1)fail(tr('지원하지 않는 백업 버전입니다.','Unsupported backup version.'));
  const state=copy(record(wrapper.data,tr('백업 데이터','Backup data')));
  const gangs=array(state,'gangs','Gangs',false),campaigns=array(state,'campaigns','Campaigns',false);
  if(gangs.length>2000||campaigns.length>1000)fail(tr('백업의 기록 수가 너무 많습니다.','The backup contains too many records.'));
  identities(gangs,'Gangs',true);identities(campaigns,'Campaigns',true);
  if(state.skirmishes!==undefined)validateSkirmishes(state.skirmishes);
  function walk(value,depth=0){if(depth>80)fail(tr('백업의 중첩 구조가 너무 깊습니다.','The backup is nested too deeply.'));if(value&&typeof value==='object')for(const key of Object.keys(value)){if(['__proto__','prototype','constructor'].includes(key))fail(tr('허용되지 않는 백업 필드입니다.','Disallowed backup field.'));walk(value[key],depth+1);}}
  walk(state);
  for(const g of gangs){
   identities(array(g,'fighters','Fighters'),'Fighters',true);
   for(const key of ['stash','vehicles','tactics','logs'])for(const row of array(g,key,key))record(row,key);
   for(const f of g.fighters){for(const key of ['equipment','effects','advancements','injuries','loadouts'])for(const row of array(f,key,key))record(row,key);for(const key of ['skills','subtypes','specialRules'])if(f[key]!==undefined)array(f,key,key);if(f.stats===undefined)f.stats={...baseStats};record(f.stats,'Stats');}
  }
  for(const c of campaigns){for(const key of ['members','territories','battles','sessions','resources','allegiances'])for(const row of array(c,key,key))record(row,key);}
  if(state.customAssets!==undefined){record(state.customAssets,'Custom assets');for(const [kind,rows]of Object.entries(state.customAssets)){if(!Array.isArray(rows))fail(tr('커스텀 목록 형식이 올바르지 않습니다.','Invalid custom asset list.'));for(const row of rows)record(row,kind);}}
  state.view='dashboard';state.tab='fighters';state.campaignTab='members';
  state.selectedGang=gangs.some(g=>g.id===state.selectedGang)?state.selectedGang:gangs[0]?.id||null;
  state.selectedCampaign=campaigns.some(c=>c.id===state.selectedCampaign)?state.selectedCampaign:campaigns[0]?.id||null;
  delete state.selectedFighter;
  return state;
 }
 function validateSkirmishes(rows){
  const check=ok=>{if(!ok)fail(tr('스커미시 기록 형식이 올바르지 않습니다.','Invalid skirmish record.'));};
  const string=(record,key,max)=>{if(record[key]!==undefined)check(typeof record[key]==='string'&&record[key].length<=max);};
  const integer=(record,key,min,max)=>{if(record[key]!==undefined)check(Number.isSafeInteger(record[key])&&record[key]>=min&&record[key]<=max);};
  const choice=(record,key,values)=>{if(record[key]!==undefined)check(values.includes(record[key]));};
  const roll=value=>{if(value===undefined)return;check(plain(value));if(value.dice!==undefined)check(Array.isArray(value.dice)&&value.dice.length===2&&value.dice.every(die=>Number.isSafeInteger(die)&&die>=1&&die<=6));choice(value,'winner',[-1,0,1]);};
  check(Array.isArray(rows)&&rows.length<=1000);identities(rows,'Skirmishes',true);
  for(const match of rows){
   string(match,'edition',16);string(match,'createdAt',80);string(match,'notes',10000);
   for(const key of ['deploymentId','objectiveId','crewId'])string(match,key,160);
   choice(match,'stage',['setup','battle','completed']);integer(match,'round',0,1000000);
   roll(match.roleRoll);roll(match.priorityRoll);
   if(match.checklist!==undefined)check(plain(match.checklist)&&Object.keys(match.checklist).length<=100);
   if(match.participants===undefined)continue;check(Array.isArray(match.participants)&&match.participants.length<=100);
   for(const participant of match.participants){
    check(plain(participant));string(participant,'name',500);string(participant,'gangId',160);string(participant,'notes',10000);integer(participant,'vp',0,1000000);choice(participant,'role',['','attacker','defender']);
    if(participant.crew===undefined)continue;check(Array.isArray(participant.crew)&&participant.crew.length<=2000);
    for(const fighter of participant.crew){check(plain(fighter));string(fighter,'fighterId',160);string(fighter,'loadoutId',160);choice(fighter,'kind',['starting','reinforcement']);}
   }
  }
 }
 function notifyError(error){showModal(tr('백업을 적용하지 못했습니다','Backup was not applied'),`<p role="alert">${esc(error.message)}</p><p>${tr('기존 기록은 유지됩니다. 파일을 확인하고 다시 시도하세요.','Your existing records are retained. Check the file and try again.')}</p>`,'OK',()=>true);}
 function apply(candidate){
  if(window.AccountParity?.connecting||(window.AccountParity?.account&&window.AccountParity?.ready===false))fail(tr('계정 연결과 기록 불러오기가 끝난 뒤 다시 적용하세요.','Wait for your account records to finish loading, then apply the backup again.'));
  const previous=data,previousText=JSON.stringify(previous),serialized=JSON.stringify(candidate);
  try{localStorage.setItem(recoveryKey(),JSON.stringify({version:1,savedAt:new Date().toISOString(),data:previous}));}catch{fail(tr('복구용 사본을 저장할 공간이 없습니다. 기존 기록을 내보내고 저장 공간을 확보한 뒤 다시 시도하세요.','There is no space for a recovery copy. Export your existing records and free storage before importing.'));}
  try{localStorage.setItem(KEY,serialized);data=candidate;render();save();}
  catch(error){data=previous;try{localStorage.setItem(KEY,previousText);}catch{}try{render();}catch{}throw error;}
  window.dispatchEvent(new CustomEvent('uk:backup-imported'));
 }
 function preview(candidate,restoring=false){
  const title=restoring?tr('이전 기록 복구','Restore previous records'):tr('백업 가져오기 확인','Review backup import');
  formModal(title,`<p class="wide">${tr('갱','Gangs')}: <strong>${candidate.gangs.length}</strong> · ${tr('캠페인','Campaigns')}: <strong>${candidate.campaigns.length}</strong></p><p class="wide">${tr('현재 기록을 이 백업으로 교체합니다. 교체 전 기록은 복구용 사본으로 보관합니다.','This replaces your current records. A recovery copy is saved before replacement.')}</p><label class="checkline wide"><input type="checkbox" name="replaceConfirmed" required>${tr('현재 기록을 교체하는 것을 확인했습니다.','I understand that my current records will be replaced.')}</label><p class="wide" id="backup-error" role="alert" hidden></p>`,values=>{if(!values.replaceConfirmed)return false;try{apply(candidate);return true;}catch(error){const box=document.querySelector('#backup-error');if(box){box.hidden=false;box.textContent=error.message;}else notifyError(error);return false;}},tr('적용','Apply'));
 }
 async function importFile(file){if(!file)return;try{if(file.size>MAX_FILE)fail(tr('백업 파일은 32MB 이하여야 합니다.','Backup files must be 32 MB or smaller.'));const raw=await file.text();if(raw.length>MAX_FILE)fail(tr('백업 파일이 너무 큽니다.','The backup file is too large.'));const candidate=validateBackup(JSON.parse(raw));preview(candidate);}catch(error){notifyError(error);}}
 function restore(){try{const raw=localStorage.getItem(recoveryKey());if(!raw)fail(tr('복구할 이전 기록이 없습니다.','No recovery copy is available.'));preview(validateBackup(JSON.parse(raw)),true);}catch(error){notifyError(error);}}
 document.querySelector('#import-file')?.addEventListener('change',event=>{const file=event.target.files?.[0];event.target.value='';void importFile(file);});
 document.addEventListener('click',event=>{if(event.target.closest('[data-backup-restore]')){event.preventDefault();restore();}});
 window.UKBackup={validate:validateBackup,importFile,restore,get hasRecovery(){return !!localStorage.getItem(recoveryKey());}};
})();
