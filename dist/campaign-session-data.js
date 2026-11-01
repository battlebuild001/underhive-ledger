/* Session controls use the existing campaign records; viewing help never awards rewards. */
(function(){
 'use strict';
 if(typeof cpSessionPage!=='function'||typeof cpModal!=='function')return;
 const keys={edit:'edit',sideJob:'side-job',help:'side-job-help'};
 const escape=value=>typeof esc==='function'?esc(String(value??'')):String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const text=(en,ko)=>`<span data-i18n-ko="${escape(ko)}">${escape(en)}</span>`;
 const edition=c=>String(c?.edition||c?.edition_slug||'').toUpperCase();
 const accountId=()=>window.AccountParity?.account?.id||'';
 const sessionFor=(c,sid)=>c?.sessions?.find(s=>s.id===sid);
 const manages=(c,p)=>!!p&&!!window.MMCampaignOwnership?.canManage(c,p.gangId);
 let modalState=null;

 function canEdit(c){
  if(window.MMCampaignPermissions)return window.MMCampaignPermissions.canEditMatch(c);
  if(!c||c.remoteReadOnly||c.remoteRole==='viewer')return false;
  const auth=window.AccountParity;
  if(auth&&(auth.connecting||auth.busy||auth.account&&!auth.ready))return false;
  if((c.remoteOwnerId||c.remoteRole)&&(!auth?.account||!auth.ready))return false;
  if(c.remoteOwnerId&&c.remoteOwnerId!==auth?.account?.id&&c.remoteRole!=='editor')return false;
  const probe=document.createElement('button');probe.dataset.cp='session-add-player';
  return !window.SharedCampaignControls?.blocked(probe);
 }
 function live(state){
  const c=typeof campaign==='function'?campaign():null;
  return c===state.c&&sessionFor(c,state.s.id)===state.s&&state.account===accountId()&&edition(c)===state.edition&&(state.p?manages(c,state.p):canEdit(c));
 }
 function rows(c){
  return (globalThis.RULES_DATA?.sideJobs||[]).filter(row=>row.source_verified===true&&String(row.edition_slug||row.edition||'').toUpperCase()===edition(c));
 }
 function job(c,p){
  const list=rows(c),id=String(p.sideJobId||p.side_job_id||''),named=String(p.sideJobName||p.side_job_name||''),legacy=String(p.sideJob||'');
  const found=id?list.find(row=>row.id===id):!named?list.find(row=>row.id===legacy||row.name===legacy):null;
  return {id,custom:named||(!found?legacy:''),row:found||null,label:found?.name||named||legacy,completed:Object.hasOwn(p,'sideJobCompleted')?p.sideJobCompleted===true:p.side_job_completed===true,exists:!!(id||named||legacy)};
 }
 function jobLabel(value){
  if(value.row)return `<span data-i18n-ko="${escape(value.row.name_ko||value.row.name)}">${escape(value.row.name)}</span>`;
  return value.label?`<span data-user-text>${escape(value.label)}</span>`:value.exists?text('Previously recorded Side Job','기존에 기록한 사이드 잡'):text('Not selected','선택하지 않음');
 }
 function button(action,label,ko,s,p,disabled=false){
  return `<button type="button" class="btn small" data-campaign-session="${action}" data-session-id="${escape(s.id)}"${p?` data-participant-id="${escape(p.id)}"`:''}${disabled?' disabled aria-disabled="true"':''}>${text(label,ko)}</button>`;
 }
 function panel(c,s,p){
  const value=job(c,p),allowed=manages(c,p),pre=s.stage==='pre-battle',post=['battle','post-battle'].includes(s.stage);
  return `<section class="cp-sidejob-data" data-session-side-job="${escape(p.id)}"><div class="mini-row"><div><strong>${text('Side Job','사이드 잡')}</strong><p class="muted">${jobLabel(value)}${value.completed?' · '+text('Completed','달성'):''}</p></div><div class="actions">${button(keys.help,'Conditions','달성 조건',s,p)}${button(keys.sideJob,post?'Record Result':'Choose Side Job',post?'달성 기록':'사이드 잡 선택',s,p,!allowed||!(pre||post)||post&&!value.exists)}</div></div></section>`;
 }
 const previousPage=cpSessionPage;
 cpSessionPage=function(c){
  const html=previousPage.apply(this,arguments),s=sessionFor(c,data.selectedBattleSession);if(!s)return html;
  const holder=document.createElement('div');holder.innerHTML=html;
  const actions=holder.querySelector('.card .section-heading .actions');
  if(actions)actions.insertAdjacentHTML('afterbegin',button(keys.edit,'Edit Battle','전투 수정',s,null,!canEdit(c)||s.stage!=='pre-battle'));
  if(edition(c)==='N26')holder.querySelectorAll('.cp-participant').forEach((node,i)=>{if(s.participants?.[i])node.insertAdjacentHTML('beforeend',panel(c,s,s.participants[i]));});
  return holder.innerHTML;
 };
 function error(en,ko){
  const form=document.querySelector('#modal-form');if(!form)return;
  form.querySelector('[data-session-data-error]')?.remove();form.insertAdjacentHTML('afterbegin',`<p class="cp-error wide" role="alert" data-session-data-error>${text(en,ko)}</p>`);window.UKI18n?.refresh(form);
 }
 function readonlyError(){error('This record or your access changed. Close this window and try again.','기록 또는 접근 권한이 변경되었습니다. 창을 닫고 다시 열어 주세요.');return false;}
 function stateFor(c,s,p){return {c,s,p,account:accountId(),edition:edition(c),stage:s.stage};}
 function openEdit(c,s){
  if(!canEdit(c)||s.stage!=='pre-battle'||typeof sessionForm!=='function')return false;
  const state=stateFor(c,s);sessionForm(s);
  const form=document.querySelector('#modal-form'),submit=document.querySelector('#modal-submit');if(!form||!submit)return false;
  form.dataset.campaignSessionEditor=s.id;
  const confirm=submit.onclick;submit.onclick=function(event){if(!live(state)||state.s.stage!=='pre-battle')return readonlyError();return confirm?.call(this,event);};
  return true;
 }
 function selectedJob(state){
  const form=state.form;if(!form?.isConnected)return null;
  return rows(state.c).find(row=>row.id===form.elements.sideJob?.value)||null;
 }
 function preview(state){
  const form=state.form;if(!form?.isConnected)return;
  const choice=form.elements.sideJob.value,custom=form.querySelector('[data-side-job-custom]');if(custom)custom.hidden=choice!=='custom';
  const row=selectedJob(state),host=form.querySelector('[data-side-job-preview]');
  if(host){
   const en=row&&(window.UK_CATALOG_LOCALE?.rulesEn?.['sideJobs:'+row.id]||row.description_en||row.description),ko=row?.description||'';
   host.hidden=!row;host.innerHTML=row?`<p data-i18n-ko="${escape(ko)}">${escape(en)}</p>`:'';
  }
  window.UKI18n?.refresh(form);
 }
 function applyJob(p,selected,custom,completed){
  p.sideJobId=selected?.id||'';p.sideJobName=selected?'':custom;p.sideJob=selected?.name||custom;p.sideJobCompleted=completed;
  if(Object.hasOwn(p,'side_job_id'))p.side_job_id=selected?.id||null;
  if(Object.hasOwn(p,'side_job_name'))p.side_job_name=selected?null:custom||null;
  if(Object.hasOwn(p,'side_job_completed'))p.side_job_completed=completed;
 }
 function openSideJob(c,s,p){
  if(edition(c)!=='N26'||!manages(c,p)||!['pre-battle','battle','post-battle'].includes(s.stage))return false;
  const state=stateFor(c,s,p),operation='side-job:'+s.id+':'+p.id+':'+crypto.randomUUID(),value=job(c,p),post=['battle','post-battle'].includes(s.stage);if(post&&!value.exists)return false;
  const unavailable=!value.row&&!!value.id&&!value.custom,selection=value.row?.id||(unavailable?'recorded':value.exists?'custom':''),options=[['','No Side Job'],...rows(c).map(row=>[row.id,row.name]),['custom','Custom']];
  if(unavailable)options.splice(1,0,['recorded',value.label||'Previously recorded Side Job']);
  const fields=`<p class="wide muted">${text('Record the Side Job for this gang. Rewards stay in the existing XP and credits controls.','이 갱의 사이드 잡을 기록합니다. 보상은 기존 XP와 크레딧 항목에서 직접 기록하세요.')}</p>`+(post?`<div class="wide"><strong>${text('Side Job','사이드 잡')}</strong><p>${jobLabel(value)}</p></div>`:MMSideJobs.nativeSelect(c,'sideJob',options,selection)+`<label class="wide" data-side-job-custom ${selection==='custom'?'':'hidden'}>${text('Custom Side Job','직접 입력한 사이드 잡')}<input name="sideJobCustom" maxlength="250" value="${escape(value.custom)}" data-user-text></label>`)+`<div class="wide cp-sidejob-preview" data-side-job-preview></div><div class="wide">${button(keys.help,'Conditions','달성 조건',s,p)}</div>`+(post?`<label class="checkline wide"><input type="checkbox" name="sideJobCompleted" value="yes" ${value.completed?'checked':''}>${text('Side Job completed','사이드 잡 달성')}</label>`:'');
  function commitJob(change){if(!(c.remoteOwnerId||c.remoteCampaignId||c.remoteRevision))return null;const original=window.MMCampaignOwnership.resolveOwn(p.gangId);return window.MMCampaignAutomation.apply(c,{key:operation,label:post?'Record my Side Job result':'Choose my Side Job',gangIds:[original.id],intent:{kind:'own-gang-update'},mutate:d=>{if(!live(state)||s.stage!==state.stage)throw Error('The Side Job or your access changed. Reopen it.');const participant=d.campaign.sessions?.find(row=>row.id===s.id)?.participants?.find(row=>row.id===p.id);if(!participant)throw Error('The participant changed. Reopen the Side Job.');change(participant);}});}
  cpModal(post?'Side Job Result':'Side Job',fields,'Save',v=>{
   if(!live(state)||s.stage!==state.stage||!s.participants.includes(p))return readonlyError();
   if(post){
    if(!['battle','post-battle'].includes(s.stage)||!job(c,p).exists)return readonlyError();
    const completed=v.sideJobCompleted==='yes';if(completed===value.completed)return true;const committed=commitJob(participant=>{participant.sideJobCompleted=completed;if(Object.hasOwn(participant,'side_job_completed'))participant.side_job_completed=completed;});if(committed!=null)return committed;
    p.sideJobCompleted=completed;if(Object.hasOwn(p,'side_job_completed'))p.side_job_completed=completed;
   }else{
    if(s.stage!=='pre-battle')return readonlyError();
    if(v.sideJob==='recorded')return true;
    const row=rows(c).find(item=>item.id===v.sideJob),custom=v.sideJob==='custom'?String(v.sideJobCustom||'').trim():'';
    if(v.sideJob==='custom'&&!custom){error('Enter a custom Side Job name.','사이드 잡 이름을 입력하세요.');return false;}
    if(v.sideJob&&!row&&v.sideJob!=='custom'){error('Select an available Side Job.','현재 선택할 수 있는 사이드 잡을 고르세요.');return false;}
    if((row?.id||'')===(value.row?.id||'')&&custom===value.custom&&(!!row||custom||!value.exists))return true;
    const committed=commitJob(participant=>applyJob(participant,row,custom,false));if(committed!=null)return committed;applyJob(p,row,custom,false);
   }
   if(typeof cpActivity==='function')cpActivity(c,'Side Job record updated');save();return true;
  });
  state.form=document.querySelector('#modal-form');state.form.dataset.campaignSessionSideJob=p.id;modalState=state;
  if(post){
   const row=value.row,host=state.form.querySelector('[data-side-job-preview]');
   if(row)host.innerHTML=`<p data-i18n-ko="${escape(row.description||'')}">${escape(window.UK_CATALOG_LOCALE?.rulesEn?.['sideJobs:'+row.id]||row.description_en||row.description||'')}</p>`;
  }else preview(state);
  window.UKI18n?.refresh(state.form);return true;
 }
 function help(c,s,p,activator){
  let row=job(c,p).row;
  if(modalState?.form?.isConnected&&modalState.c===c&&modalState.s===s&&modalState.p===p&&s.stage==='pre-battle')row=selectedJob(modalState);
  if(row)return window.MMRuleReference?.open('sideJobs',row.id,{edition:edition(c),activator})||false;
  return window.MMContextHelp?.open('battle.side-job',{edition:edition(c),activator})||false;
 }
 document.addEventListener('click',event=>{
  const target=event.target.closest?.('[data-campaign-session]');if(!target)return;
  event.preventDefault();event.stopImmediatePropagation();if(target.disabled||target.getAttribute('aria-disabled')==='true')return;
  const c=typeof campaign==='function'?campaign():null,s=sessionFor(c,target.dataset.sessionId),p=s?.participants?.find(item=>item.id===target.dataset.participantId);if(!c||!s)return;
  if(target.dataset.campaignSession===keys.help){if(p&&edition(c)==='N26')help(c,s,p,target);return;}
  if(!canEdit(c))return;
  if(target.dataset.campaignSession===keys.edit)openEdit(c,s);
  else if(target.dataset.campaignSession===keys.sideJob&&p)openSideJob(c,s,p);
 },true);
 document.addEventListener('change',event=>{if(event.target.name==='sideJob'&&modalState?.form?.contains(event.target))preview(modalState);},true);
 const style=document.createElement('style');style.textContent='.cp-sidejob-data{margin-top:16px;padding-top:12px;border-top:1px solid var(--line,var(--border,#333))}.cp-sidejob-data p{margin:6px 0}.cp-sidejob-data .mini-row{align-items:center;gap:12px;flex-wrap:wrap}.cp-sidejob-data .actions{flex-wrap:wrap}.cp-sidejob-preview{line-height:1.6}.cp-sidejob-preview p{margin:0}.cp-sidejob-data button{white-space:normal}@media(max-width:520px){.cp-sidejob-data .mini-row>div{min-width:0}.cp-sidejob-data .actions{width:100%}}';document.head.append(style);
 window.MMCampaignSessionData={canEdit,openSideJob,openEdit};
})();
