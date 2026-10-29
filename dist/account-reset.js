/* Discard cached account data once after the owner-requested account reset. */
(function(){
 const marker='underhive-account-reset-20261029-confirmed',key='underhive-ledger-v1';
 try{
  if(localStorage.getItem(marker)==='done')return;
  const linked=!!localStorage.getItem(key+'-cloud'),saved=linked||Object.keys(localStorage).some(name=>name===key+'-before-cloud'||name.startsWith(key+'-account-backup-'));if(!saved){localStorage.setItem(marker,'done');return;}
  for(const name of Object.keys(localStorage))if(name===key+'-cloud'||name===key+'-before-cloud'||name.startsWith(key+'-account-backup-'))localStorage.removeItem(name);
  if(linked)localStorage.removeItem(key);
  window.__accountResetReady=fetch('/api/auth/logout',{method:'POST',credentials:'same-origin'}).then(response=>{if(response.ok)localStorage.setItem(marker,'done');}).catch(()=>{});
 }catch{}
})();
