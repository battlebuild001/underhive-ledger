/* Justicar alliance recruitment is committed atomically by the account API. */
(()=>{
'use strict';
const ALLIANCE='official-001-alliance-justicar-courts',PREFIX='official-001-fighter-justicar-court-delegation-',keys=new Map();
const en=()=>window.UKI18n?.language==='en',T=(ko,english)=>en()?english:ko,E=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const words=(ko,english)=>`<span data-i18n-ko="${E(ko)}" data-i18n-en="${E(english)}">${E(T(ko,english))}</span>`,current=id=>(data.gangs||[]).find(g=>g.id===id),n=value=>Math.max(0,Number(value)||0);
const reason=value=>typeof value==='string'?value:value?.[en()?'en':'ko']||value?.reasonKo||value?.reasonEn||'';
const owns=g=>!!g&&!g.remoteReadOnly&&(!g.remoteOwnerId||g.remoteOwnerId===window.AccountParity?.account?.id);
const role=f=>String(f.fighterTypeId||f.catalogTypeId||'').startsWith(PREFIX)?String(f.fighterTypeId||f.catalogTypeId).slice(PREFIX.length):'';
const collectionJSON=()=>JSON.stringify({gangs:data.gangs,campaigns:data.campaigns,customAssets:data.customAssets,skirmishes:data.skirmishes});
const timingLabel=value=>({founding:T('캠페인 창설','Campaign founding'),'update-roster':T('사이클 종료 · 로스터 갱신','Post-cycle · Update Roster'),'downtime-end':T('다운타임 종료','End of Downtime')})[value]||T('지금은 체결·해체 시점이 아닙니다.','Alliance changes are not available at this point.');
const check=(name,ko,english)=>`<label class="checkline wide ga-confirm"><input type="checkbox" name="${name}" value="yes" required>${words(ko,english)}</label>`;
function styleModal(){document.querySelector('.modal')?.classList.add('ga-modal');window.UKI18n?.refresh?.(document.querySelector('.modal'));}
function message(ko,english){return `<p class="wide ga-status" role="status">${words(ko,english)}</p>`;}
function showError(error){showModal(T('저스티카 동맹','Justicar alliance'),`<p role="alert">${E(error?.message||error)}</p>`,T('닫기','Close'),()=>true);styleModal();}
function loadoutFields(){
 const choices=[[0,T('쇼크 피스톨 + 헤비 클럽','Shock pistol + heavy club')],[1,T('샷건 · 솔리드/스캐터','Shotgun · solid/scatter')],[2,T('풀멘 맨캐처','Fulmen man-catcher')]];
 return `<fieldset class="wide ga-loadouts"><legend>${words('베일리프 3명의 시작 무기','Starting weapons for the three Bailiffs')}</legend><p class="mm-note">${words('각자 하나씩 선택하세요. 추가 비용은 없습니다.','Choose one set for each Bailiff. There is no additional cost.')}</p>${[0,1,2].map(i=>`<label>${words('베일리프 '+(i+1),'Bailiff '+(i+1))}<select name="bailiff${i}" required>${choices.map(([value,label])=>`<option value="${value}">${E(label)}</option>`).join('')}</select></label>`).join('')}</fieldset>`;
}
function campaignFields(status,action='join'){
 const rows=status.campaigns||[];if(!rows.length)return `<p class="wide ga-timing">${E(timingLabel(status.timing))}</p>`;
 const selected=rows.find(row=>action!=='leave'&&row.id===status.rejoinPermission?.campaignId)||rows.find(row=>action==='leave'?(row.canLeave??row.timing==='update-roster'):row.eligible)||rows[0];
 return `<label class="wide">${words('적용 캠페인','Campaign')}<select name="allianceCampaign" required>${rows.map(row=>`<option value="${E(row.id)}" ${row.id===selected.id?'selected':''}>${E(row.name)} · ${E(timingLabel(row.timing))}</option>`).join('')}</select></label><p class="wide ga-timing" data-ga-timing></p><label class="checkline wide ga-override" data-ga-override hidden><input type="checkbox" name="arbitratorOverride" value="yes">${words('아비트레이터 권한으로 동맹 예외를 승인합니다.','Approve this alliance exception as the campaign arbitrator.')}</label>`;
}
function eligibility(status,form,action='join'){
 const selected=(status.campaigns||[]).find(row=>row.id===form.elements.allianceCampaign?.value),row=selected||status;
 const override=!!selected?.canOverride&&!!form.elements.arbitratorOverride?.checked;
 const permissionAllowed=action==='leave'||status.contract?.status!=='broken'||!!selected&&status.rejoinPermission?.campaignId===selected.id;const timingAllowed=action==='leave'?(row.canLeave===true||row.canLeave==null&&row.timing==='update-roster'):row.eligible===true,blockedReason=!permissionAllowed?(status.rejoinPermission?T('재체결 승인을 받은 캠페인을 선택하세요.','Select the campaign that approved rejoining.'):T('해체한 동맹을 다시 체결하려면 캠페인 아비트레이터의 1회 승인이 필요합니다.','Rejoining a broken alliance requires a one-time approval from the campaign arbitrator.')):action==='leave'?(reason(row.leaveReason)||T('동맹 해체는 사이클 종료 로스터 갱신 단계에서 할 수 있습니다.','End an alliance during the Post-cycle Update Roster step.')):reason(row.reason);return {selected,row,timingAllowed,permissionAllowed,blockedReason,allowed:timingAllowed&&permissionAllowed||override,override};
}
function bindEligibility(status,g,form,{review=false,legacyValid=true,action='join'}={}){
 const update=()=>{
  const state=eligibility(status,form,action),override=form.querySelector('[data-ga-override]'),timing=form.querySelector('[data-ga-timing]');
  if(override){override.hidden=state.timingAllowed&&state.permissionAllowed||!state.selected?.canOverride;if(override.hidden)form.elements.arbitratorOverride.checked=false;}
  if(timing)timing.textContent=state.timingAllowed&&state.permissionAllowed?timingLabel(state.row.timing):state.blockedReason||timingLabel(null);
  const error=form.querySelector('[data-ga-eligibility]');
  if(error){error.textContent=!state.allowed?(state.blockedReason||timingLabel(null)):n(g.credits)<200?T('동맹 비용을 지불하려면 창고에 200크레딧이 필요합니다.','You need 200 stash credits for this alliance action.'):review&&!legacyValid?T('기존 기록을 먼저 확인하고 정리해 주세요.','Review and correct the existing records first.'):'';error.hidden=!error.textContent;}
  document.querySelector('#modal-submit').disabled=!state.allowed||n(g.credits)<200||!legacyValid;
 };
 form.addEventListener('change',update);update();
}
async function commit(gid,status,action,values,extra={}){
 const account=window.AccountParity;if(!account?.account)throw Error(T('동맹을 처리하려면 먼저 로그인하세요.','Sign in before changing an alliance.'));
 const actor=account.account.id;if(!owns(current(gid)))throw Error(T('내 갱에서만 동맹을 관리할 수 있습니다.','You can manage alliances only for your own gang.'));
 const form=document.querySelector('#modal-form'),context={view:data.view,selectedGang:data.selectedGang},state=eligibility(status,form,action);
 if(!state.allowed)throw Error(state.blockedReason||timingLabel(null));
 const documentRevision=await account.ensureSynced();if(account.account?.id!==actor)throw Error(T('계정이 변경되었습니다. 동맹 화면을 다시 열어 주세요.','The account changed. Reopen the alliance screen.'));if(!form?.isConnected)return false;if(!owns(current(gid)))throw Error(T('갱에 대한 수정 권한이 변경되었습니다. 다시 확인해 주세요.','Your permission to edit this gang changed. Review the gang again.'));const baseline={accountId:actor,collections:collectionJSON()};
 const payload={action,allianceId:ALLIANCE,...(state.selected?{campaignId:state.selected.id}:{}),...(state.override?{arbitratorOverride:true}:{}),...extra};
 const fingerprint=actor+':'+gid+':'+JSON.stringify(payload);if(!keys.has(fingerprint))keys.set(fingerprint,'alliance:'+action+':'+(typeof id==='function'?id():crypto.randomUUID()));
 const result=await account.api('/gangs/'+encodeURIComponent(gid)+'/alliance',{method:'POST',body:JSON.stringify({...payload,operationKey:keys.get(fingerprint),documentRevision})});
 if(account.account?.id!==actor)return false;if(!account.acceptAutomation(result.document?result:{...result,document:{state:result.state,revision:result.revision}},baseline))throw Error(T('기록이 변경되었습니다. 표시된 동기화 안내에 따라 최신 기록을 확인하세요.','Your records changed. Follow the synchronization notice to review the latest records.'));
 keys.delete(fingerprint);render();
 setTimeout(()=>{if(account.account?.id!==actor||data.view!==context.view||data.selectedGang!==context.selectedGang||document.querySelector('.modal-bg'))return;open(gid,{notice:action==='leave'?T('200크레딧을 지불하고 동맹을 해체했습니다.','The alliance ended and 200 credits were paid.'):T('200크레딧을 지불하고 저스티카 파견대를 편입했습니다.','The Justicar delegation joined for 200 credits.')});},0);
 return true;
}
function delegationPreview(g,contract){
 const ids=new Set(contract?.delegationIds||[]),fighters=(g.fighters||[]).filter(f=>ids.has(f.id));
 return `<ul class="ga-delegates">${fighters.map(f=>`<li><strong>${E(f.name)}</strong><span>${E(f.type||role(f))}</span></li>`).join('')}</ul>`;
}
function leave(g,status){
 const content=`<div class="wide ga-summary"><strong>${words('동맹 해체 · 200크레딧','End alliance · 200 credits')}</strong><p>${words('계약을 끝내면 파견대와 파견 장비가 로스터에서 제거되고, 갱 레이팅에서 동맹 비용 200이 빠집니다.','Ending the contract removes its delegation and equipment from the roster, and removes the 200-credit alliance tithe from gang rating.')}</p></div>${campaignFields(status,'leave')}${delegationPreview(g,status.contract)}${check('confirmLeave','200크레딧 지불과 파견대 전체 제거를 확인했습니다.','I confirm the 200-credit payment and removal of the entire delegation.')}<p class="wide ga-error" data-ga-eligibility role="alert" hidden></p>`;
 formModal(T('저스티카 동맹 해체','End Justicar alliance'),content,values=>commit(g.id,status,'leave',values),T('200크레딧 지불 · 동맹 해체','Pay 200 · end alliance'));styleModal();document.querySelector('#modal-submit').classList.add('danger');bindEligibility(status,g,document.querySelector('#modal-form'),{action:'leave'});
}
function show(g,status,notice){
 const active=status.contract?.status==='active',legacy=status.legacy||{},candidates=legacy.candidates||[],review=!!legacy.requiresReview;
 const exactLegacy=candidates.length===5&&candidates.filter(f=>role(f)==='magistrate').length===1&&candidates.filter(f=>role(f)==='executioner').length===1&&candidates.filter(f=>role(f)==='bailiff').length===3;
 const adoption=review&&candidates.length>0,valid=!adoption||exactLegacy,create=!active&&!adoption;
 let body=(notice?`<p class="wide ga-success" role="status">${E(notice)}</p>`:'')+`<div class="wide ga-summary"><span class="ga-eyebrow">JUSTICAR COURTS</span><h3>${words('팔라나이트 저스티카','Palanite Justicars')}</h3><p>${active?words('동맹 체결 중 · 레이팅 +200','Alliance active · rating +200'):words('매지스트레이트 1명 · 엑시큐셔너 1명 · 베일리프 3명','1 Magistrate · 1 Executioner · 3 Bailiffs')}</p><div class="ga-balance">${words('보유 크레딧','Stash credits')}<strong>${E(fmt(g.credits))}</strong></div></div>`;
 if(active){
  body+=delegationPreview(g,status.contract)+`<p class="wide mm-note">${words('파견대는 XP·사이클 종료 후 행동·추가 장비 구매·개별 자진 해고가 제한됩니다. 동맹 전체 해체는 아래에서 처리하세요.','The delegation cannot gain XP, perform Post-cycle Actions, buy additional equipment, or be dismissed individually. End the complete alliance below.')}</p>`;
  showModal(T('저스티카 동맹 관리','Manage Justicar alliance'),body,T('동맹 해체 검토','Review ending alliance'),()=>{leave(g,status);return false;});styleModal();return;
 }
 body+=campaignFields(status);if(status.contract?.status==='broken')body+=`<p class="wide ga-status">${status.rejoinPermission?words('아비트레이터의 1회 재체결 승인을 받았습니다. 승인된 캠페인을 선택하고 200크레딧을 지불해 체결하세요.','One-time rejoining approval is available. Select the approved campaign and form the alliance for 200 credits.'):words('해체한 동맹입니다. 재체결하려면 해당 캠페인의 아비트레이터에게 1회 승인을 받으세요.','This alliance was ended. Ask the campaign arbitrator for a one-time approval before rejoining.')}</p>`;
 if(review){
  body+=`<section class="wide ga-legacy"><h4>${words('기존 동맹 기록 확인','Review existing alliance records')}</h4><p>${words('기존 화면의 동맹 선택·개별 무료 채용은 정식 체결로 기록되지 않았습니다. 아래 확인 후에만 200크레딧을 지불합니다.','The previous alliance selection or free individual recruits do not record a formal contract. The 200-credit payment happens only after your confirmation below.')}</p>`;
  if(adoption)body+=`<ul class="ga-delegates">${candidates.map(f=>`<li><strong>${E(f.name)}</strong><span>${E(role(f)||f.fighterTypeId)} · ${E(n(f.xp))} XP</span>${f.equipment?.length?'<small class="ga-existing-gear">'+f.equipment.map(item=>E(item.name||item.equipment_name||item.catalogId||item.presetId)).join(' · ')+'</small>':''}</li>`).join('')}</ul><p>${exactLegacy?words('위 5명을 기존 장비 그대로 계약 파견대로 등록합니다. 시작 장비와 XP 0 규정에 맞을 때만 비용을 지불하고 등록합니다.','Register these five existing models with their current equipment. Payment and registration require the prescribed starting gear and zero XP.'):words('매지스트레이트 1명·엑시큐셔너 1명·베일리프 3명 구성이 아닙니다. 기존 개별 저스티카 기록을 로스터에서 확인·정리한 뒤 다시 열어 주세요. 정식 계약 전의 잘못 추가한 기록은 개별 삭제할 수 있습니다.','These records are not one Magistrate, one Executioner and three Bailiffs. Review and correct the individual Justicar records in the roster, then reopen this screen. Incorrect records added before a formal contract can be deleted individually.')}</p>`;
  else body+=`<p>${words('기존 선택 기록을 정식 계약으로 바꾸고, 파견대 5명을 새로 편입합니다.','Convert the existing selection into a formal contract and add the five delegation models.')}</p>`;
  body+='</section>';
 }
 if(create)body+=loadoutFields();
 body+=`<div class="wide ga-cost"><span>${words('창고에서 지불','Payment from stash')}</span><strong>200 ${words('크레딧','credits')}</strong><small>${words('갱 레이팅 +200 · 파견대 추가 비용 0','Gang rating +200 · delegation adds no further cost')}</small></div>`;
 if(valid)body+=check('confirmAlliance',adoption?'위 기존 5명을 등록하고 200크레딧을 지불합니다.':'선택한 시작 무기로 파견대 5명을 편입하고 200크레딧을 지불합니다.',adoption?'Register these five existing models and pay 200 credits.':'Add all five delegates with the selected starting weapons and pay 200 credits.');
 body+='<p class="wide ga-error" data-ga-eligibility role="alert" hidden></p>';
 formModal(T(review?'기존 저스티카 기록 정리':'저스티카 동맹 체결',review?'Regularize Justicar records':'Form Justicar alliance'),body,values=>commit(g.id,status,review?'regularize':'join',values,adoption?{legacyFighterIds:candidates.map(f=>f.id)}:{bailiffLoadouts:[0,1,2].map(i=>Number(values['bailiff'+i])),...(review?{legacyFighterIds:[]}:{} )}),T('200크레딧으로 동맹 체결','Form alliance for 200 credits'));
 styleModal();bindEligibility(status,g,document.querySelector('#modal-form'),{review,legacyValid:valid});
}
async function open(gid=gang()?.id,{notice=''}={}){
 const g=current(gid);if(!g||String(g.edition).toUpperCase()!=='N26')return;
 if(!owns(g))return showError(T('내 갱에서만 동맹을 관리할 수 있습니다.','You can manage alliances only for your own gang.'));
 if(!window.AccountParity?.account)return showError(T('저스티카 동맹을 체결하려면 먼저 로그인하세요.','Sign in before forming a Justicar alliance.'));
 showModal(T('저스티카 동맹','Justicar alliance'),message('동맹 기록과 체결 시점을 확인하고 있습니다…','Checking the alliance record and recruitment timing…'),T('닫기','Close'),()=>true);styleModal();
 const loading=document.querySelector('.modal-bg'),actor=AccountParity.account.id,context={view:data.view,selectedGang:data.selectedGang};document.querySelector('#modal-submit').hidden=true;const sameContext=()=>AccountParity.account?.id===actor&&data.view===context.view&&data.selectedGang===context.selectedGang&&loading.isConnected;
 try{await AccountParity.ensureSynced();if(!sameContext())return;const status=await AccountParity.api('/gangs/'+encodeURIComponent(gid)+'/alliance');if(!sameContext())return;const latest=current(gid);if(latest&&owns(latest))show(latest,status,notice);}catch(error){if(sameContext())showError(error);}
}
function approvalCampaigns(g){
 return (data.campaigns||[]).filter(c=>String(c.edition).toUpperCase()==='N26'&&window.MMCampaignPermissions?.canArbitrate(c)&&((c.members||[]).some(m=>m.gangId===g.id||g.remoteSnapshotId&&m.gangId===g.remoteSnapshotId)||(g.remoteCampaignIds||[]).includes(c.remoteCampaignId||c.id)));
}
function approveRejoin(gid){
 const g=current(gid),account=window.AccountParity,actor=account?.account?.id,rows=g?approvalCampaigns(g):[];
 if(!actor||!g||g.allianceContract?.status!=='broken'||!rows.length)return showError(T('이 갱의 활성 캠페인에서 아비트레이터 권한을 확인하세요.','Review your arbitrator access in this gang’s active campaign.'));
 const contractId=g.allianceContract.id,publicGangId=g.remoteSnapshotId||g.id,context={view:data.view,selectedGang:data.selectedGang};
 const body=`<div class="wide ga-summary"><span class="ga-eyebrow">${words('승인 대상 갱','Gang receiving approval')}</span><h3>${E(g.name)}</h3><p>${E(g.faction)}</p></div><label class="wide">${words('승인할 캠페인','Campaign for approval')}<select name="permissionCampaign" required>${rows.map(c=>`<option value="${E(c.id)}">${E(c.name)}</option>`).join('')}</select></label><p class="wide">${words('이 갱이 선택한 캠페인에서 저스티카 동맹을 다시 체결하도록 1회 승인합니다. 승인 후 갱 소유자가 시작 무기를 선택하고 200크레딧을 지불해 파견대를 편입합니다.','Give this gang a one-time approval to rejoin the Justicar alliance in the selected campaign. Its owner then chooses starting weapons and pays 200 credits to add the delegation.')}</p><p class="wide mm-note">${words('승인 비용: 0크레딧 · 1회 체결 시 사용','Approval cost: 0 credits · consumed by one alliance contract')}</p>${check('confirmPermission','대상 갱과 캠페인을 확인하고 1회 재체결을 승인합니다.','I checked the target gang and campaign and approve one rejoining.')}`;
 formModal(T('동맹 재체결 승인','Approve alliance rejoining'),body,async values=>{
  const form=document.querySelector('#modal-form');await account.ensureSynced();if(account.account?.id!==actor||!form?.isConnected)return false;
  const latest=current(gid),selected=approvalCampaigns(latest||{}).find(c=>c.id===values.permissionCampaign);if(!latest||latest.allianceContract?.status!=='broken'||latest.allianceContract.id!==contractId||!selected)throw Error(T('갱 기록이나 권한이 변경되었습니다. 다시 확인하세요.','The gang record or your access changed. Review it again.'));
  const campaignId=selected.remoteCampaignId||selected.id,fingerprint='permission:'+actor+':'+campaignId+':'+publicGangId+':'+contractId;if(!keys.has(fingerprint))keys.set(fingerprint,'alliance-permission:'+(typeof id==='function'?id():crypto.randomUUID()));
  await account.api('/campaigns/'+encodeURIComponent(campaignId)+'/alliances/permission',{method:'POST',body:JSON.stringify({operationKey:keys.get(fingerprint),gangId:publicGangId,action:'approve-rejoin'})});
  if(account.account?.id!==actor)return false;keys.delete(fingerprint);
  setTimeout(()=>{if(account.account?.id!==actor||data.view!==context.view||data.selectedGang!==context.selectedGang||document.querySelector('.modal-bg'))return;showModal(T('재체결 승인 완료','Rejoining approved'),`<p>${E(latest.name)} · ${E(selected.name)}</p><p role="status">${words('갱 소유자가 동맹 관리에서 1회 재체결할 수 있습니다. 체결할 때 200크레딧을 지불합니다.','The gang owner can now rejoin once through alliance management, paying 200 credits when forming the contract.')}</p>`,T('닫기','Close'),()=>true);styleModal();},0);return true;
 },T('1회 재체결 승인','Approve one rejoining'));styleModal();
}
function refresh(){
 if(data.view!=='gang')return;const g=gang();if(!g||String(g.edition).toUpperCase()!=='N26')return;
 const own=owns(g),canApprove=!own&&g.allianceContract?.status==='broken'&&approvalCampaigns(g).length;if(!own&&!canApprove)return;
 const host=document.querySelector('.entity-card .gah-edit')||document.querySelector('.entity-card .entity-actions.main-actions')||canApprove&&document.querySelector('.entity-card');if(!host||host.querySelector('[data-gang-alliance-open],[data-gang-alliance-permission]'))return;
 const button=document.createElement('button');button.type='button';button.className='btn';if(own){button.dataset.gangAllianceOpen=g.id;button.innerHTML=words('저스티카 동맹','Justicar alliance');}else{button.dataset.gangAlliancePermission=g.id;button.innerHTML=words('동맹 재체결 승인','Approve alliance rejoining');}host.append(button);window.UKI18n?.refresh?.(button);
}
document.addEventListener('click',event=>{const permission=event.target.closest?.('[data-gang-alliance-permission]'),button=event.target.closest?.('[data-gang-alliance-open]');if(!button&&!permission)return;event.preventDefault();event.stopImmediatePropagation();if(permission)approveRejoin(permission.dataset.gangAlliancePermission);else open(button.dataset.gangAllianceOpen||gang()?.id);},true);
const prior=render;render=function(){const result=prior.apply(this,arguments);refresh();return result;};
let queued=false;new MutationObserver(()=>{if(queued)return;queued=true;queueMicrotask(()=>{queued=false;refresh();});}).observe(document.getElementById('app'),{childList:true,subtree:true});
window.MMGangAlliances={open,refresh,approveRejoin,role,allianceId:ALLIANCE};refresh();
})();
