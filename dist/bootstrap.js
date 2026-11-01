(function(){
 let routeApplied='',rendering=false;
 const skirmishPath=p=>p.match(/^\/skirmishes(?:\/([^/]+))?\/?$/);
 // A settled guest has a usable local document; account loading still owns its requested route.
 const skirmishRouteResolved=()=>{const a=window.AccountParity;return !a||a.ready||!a.connecting&&!a.account;};
 function applyRoute(){const p=location.pathname;if(data.view==='learning')data.view='dashboard';if(/^\/learn(?:\/|$)/.test(p)){data.view='dashboard';data.homeTab='gangs';history.replaceState({},'','/');routeApplied='/';return}if(routeApplied===p)return;if(p==='/account'){data.view='account';routeApplied=p;return}
  const standalone=skirmishPath(p);if(standalone){
   data.view='dashboard';data.homeTab='skirmishes';
   if(!standalone[1]){delete data.selectedSkirmish;if(skirmishRouteResolved())routeApplied=p;return;}
   let key;try{key=decodeURIComponent(standalone[1]);}catch{key='';}
   const match=Array.isArray(data.skirmishes)&&data.skirmishes.find(s=>s.id===key&&s.edition==='N26');
   if(match){data.selectedSkirmish=match.id;if(skirmishRouteResolved())routeApplied=p;return;}
   // The personal document may not have arrived yet. Preserve the requested URL
   // through account loading/sign-in so the later render can resolve its match.
   if(window.AccountParity&&!window.AccountParity.ready)return;
   delete data.selectedSkirmish;history.replaceState({},'','/skirmishes');routeApplied='/skirmishes';return;
  }
  let match=p.match(/^\/(gang|fighter|campaigns)\/([^/]+)(?:\/battle-session\/([^/]+))?\/?$/);if(!match)return;const [,type,raw,session]=match,key=decodeURIComponent(raw);if(type==='gang'&&data.gangs.some(g=>g.id===key)){data.view='gang';data.selectedGang=key;data.tab='fighters';routeApplied=p}else if(type==='fighter'){const g=data.gangs.find(g=>g.fighters.some(f=>f.id===key));if(g){data.view='fighter';data.selectedGang=g.id;data.selectedFighter=key;routeApplied=p}}else if(type==='campaigns'&&data.campaigns.some(c=>c.id===key)){data.view='campaign';data.selectedCampaign=key;data.campaignTab='members';routeApplied=p}if(session&&routeApplied===p){data.campaignTab='session-detail';data.selectedBattleSession=decodeURIComponent(session)}}
 function syncRoute(){const p=location.pathname;if(/^\/join\//.test(p))return;if(skirmishPath(p)&&routeApplied!==p&&window.AccountParity&&!window.AccountParity.ready)return;let path=null;if(data.view==='gang'&&gang())path='/gang/'+encodeURIComponent(gang().id);else if(data.view==='fighter'&&currentFighter())path='/fighter/'+encodeURIComponent(currentFighter().id);else if(data.view==='campaign'&&campaign()){path='/campaigns/'+encodeURIComponent(campaign().id);if(data.campaignTab==='session-detail'&&data.selectedBattleSession)path+='/battle-session/'+encodeURIComponent(data.selectedBattleSession)}else if(data.view==='account')path='/account';else if(data.view==='dashboard'&&data.homeTab==='skirmishes'){const match=Array.isArray(data.skirmishes)&&data.skirmishes.find(s=>s.id===data.selectedSkirmish&&s.edition==='N26');path='/skirmishes'+(match?'/'+encodeURIComponent(match.id):'');}else if(['dashboard','catalog','gangs','campaigns'].includes(data.view))path='/';if(path&&path!==p){history.pushState({},'',path);routeApplied=path}}
 const priorRender=render;render=function(){if(rendering)return;rendering=true;try{applyRoute();priorRender();syncRoute()}finally{rendering=false}};
 const priorSave=save;save=function(...args){syncRoute();return priorSave(...args)};
 window.addEventListener('popstate',()=>{routeApplied='';if(location.pathname==='/'){data.view='dashboard';data.homeTab='gangs';routeApplied='/'}render()},true);
 render();
})();
