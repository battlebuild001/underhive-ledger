/* Await server revocation before removing a synchronized campaign locally. */
(function(){
 const tr=(ko,en)=>window.UKI18n?.language==='en'?en:ko;
 window.UKDeleteCampaign=function(c){
  if(!c)return;
  formModal(tr('캠페인 삭제','Delete Campaign'),`<p class="wide">${esc(c.name)}</p><p class="wide">${tr('캠페인 기록, 공유 권한과 온라인 모집 링크를 삭제합니다. 확인하려면 Delete를 입력하세요.','Delete the campaign records, shared access and online recruitment link. Type Delete to confirm.')}</p><label class="wide">${tr('삭제 확인','Confirm deletion')}<input name="confirmation" required autocomplete="off" placeholder="Delete"></label><p class="wide" data-campaign-delete-error role="alert" hidden></p>`,()=>false,tr('삭제','Delete'));
  const dialog=document.querySelector('.modal-bg'),form=dialog.querySelector('#modal-form'),submit=dialog.querySelector('#modal-submit');let busy=false;
  submit.onclick=async()=>{
   if(busy||!form.reportValidity())return;
   const error=dialog.querySelector('[data-campaign-delete-error]');
   if(form.elements.confirmation.value!=='Delete'){error.hidden=false;error.textContent=tr('Delete를 정확히 입력하세요.','Type Delete exactly.');return;}
   busy=true;error.hidden=true;dialog.querySelectorAll('#modal-submit,#modal-cancel,#modal-close').forEach(x=>x.disabled=true);dialog.setAttribute('aria-busy','true');
   try{
    if(!window.AccountParity?.deleteCampaign)throw Error(tr('계정 연결을 확인한 뒤 다시 시도하세요.','Check your account connection and try again.'));
    await window.AccountParity.deleteCampaign(c.id);
    if(dialog.isConnected&&document.querySelector('.modal-bg')===dialog)closeModal();
   }catch(reason){if(dialog.isConnected){error.hidden=false;error.textContent=reason.message;}}
   finally{busy=false;if(dialog.isConnected){dialog.removeAttribute('aria-busy');dialog.querySelectorAll('#modal-submit,#modal-cancel,#modal-close').forEach(x=>x.disabled=false);}}
  };
 };
})();
