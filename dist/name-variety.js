/* Offline creative suggestions. Walk shuffled combinations without building the full name space. */
(()=>{'use strict';
const histories=new Map(),clean=s=>String(s??'').normalize('NFKC').replace(/\s+/g,' ').trim(),norm=s=>clean(s).toLocaleLowerCase();
const random=n=>{if(n<=1)return 0;const value=new Uint32Array(1);crypto.getRandomValues(value);return value[0]%n;};
function gcd(a,b){while(b){const next=a%b;a=b;b=next;}return a;}
function cursor(count){let step=count>1?1+random(count-1):1;while(gcd(step,count)!==1)step=step===count-1?1:step+1;return {next:random(count),step,left:count};}
function history(key,families){const signature=families.map(f=>f.count).join(':');let state=histories.get(key);if(!state||state.signature!==signature){state={signature,seen:new Set(),numberedSeen:new Set(),walks:families.map(f=>cursor(f.count))};histories.set(key,state);}return state;}
function pick(key,families,{language='ko',exclude=[],maxLength=79}={}){
 families=families.filter(f=>f.count>0);if(!families.length)return null;
 const state=history(key,families),used=new Set(exclude.map(norm)),index=language==='en'?1:0;
 const pairAt=(family,position)=>{const pair=family.at(position).map(clean);return pair.length===2&&pair.every(name=>name&&name.length<=maxLength)?pair:null;};
 for(let pass=0;pass<2;pass++){
  while(state.walks.some(w=>w.left>0)){
   const eligible=families.map((f,i)=>({f,i})).filter(({i})=>state.walks[i].left>0),total=eligible.reduce((sum,{f})=>sum+(f.weight||1),0);let choice=random(total),selected=eligible[0];
   for(const entry of eligible){choice-=entry.f.weight||1;if(choice<0){selected=entry;break;}}
   const walk=state.walks[selected.i],position=walk.next;walk.next=(walk.next+walk.step)%selected.f.count;walk.left--;
   const pair=pairAt(selected.f,position);if(!pair||pair.some(name=>used.has(norm(name))||state.seen.has(norm(name))))continue;
   for(const name of pair)state.seen.add(norm(name));return pair[index];
  }
  if(pass===0){state.seen.clear();state.walks=families.map(f=>cursor(f.count));}
 }
 // Only use numbered variants when every natural combination is already taken.
 for(let serial=2;;serial++)for(const family of families)for(let n=0;n<family.count;n++){
  const base=pairAt(family,n);if(!base)continue;const pair=base.map(name=>name+' '+serial);if(pair.every(name=>name.length<=maxLength&&!used.has(norm(name))&&!state.numberedSeen.has(norm(name)))){for(const name of pair)state.numberedSeen.add(norm(name));return pair[index];}
 }
}
function factionKey(g,pools){const types=globalThis.RULES_DATA?.gangTypes||[],found=window.MMGang?.findGangType?.(g);let type=found||types.find(row=>row.id===(g?.gangTypeId||g?.gang_type_id))||types.find(row=>row.name===g?.faction),seen=new Set();
 while(type&&!pools[type.name]&&type.parent_gang_type_id&&!seen.has(type.id)){seen.add(type.id);type=types.find(row=>row.id===type.parent_gang_type_id);}return pools[type?.name||g?.faction]?type?.name||g.faction:'fallback';
}
function gangFamilies(bank,pool){const a=pool.first,b=pool.last,p=bank.origins,base=a.length*b.length;return [
 {weight:4,count:base,at:n=>[0,1].map(l=>a[Math.floor(n/b.length)][l]+' '+b[n%b.length][l])},
 {weight:2,count:p.length*b.length,at:n=>{const place=p[Math.floor(n/b.length)],noun=b[n%b.length];return [place[0]+'의 '+noun[0],noun[1]+' of '+place[1]];}},
 {weight:4,count:p.length*base,at:n=>{const place=p[Math.floor(n/base)],local=n%base,first=a[Math.floor(local/b.length)],last=b[local%b.length];return [place[0]+'의 '+first[0]+' '+last[0],first[1]+' '+last[1]+' of '+place[1]];}}
 ];}
function fighterFamilies(pool){const a=pool.first,b=pool.last,e=pool.epithets,base=a.length*b.length;return [
 {weight:5,count:base,at:n=>[0,1].map(l=>a[Math.floor(n/b.length)][l]+' '+b[n%b.length][l])},
 {weight:3,count:base*e.length,at:n=>{const epithet=e[n%e.length],local=Math.floor(n/e.length);return [0,1].map(l=>a[Math.floor(local/b.length)][l]+" '"+epithet[l]+"' "+b[local%b.length][l]);}},
 {weight:2,count:a.length*e.length,at:n=>[0,1].map(l=>a[Math.floor(n/e.length)][l]+" '"+e[n%e.length][l]+"'")}
 ];}
function campaignFamilies(bank){const p=bank.places,e=bank.events,s=bank.subtitles,base=p.length*e.length,at=n=>{const place=p[Math.floor(n/e.length)],event=e[n%e.length];return [place[0]+'의 '+event[0],event[1]+' '+place[1]];};return [
 {weight:7,count:base,at},
 {weight:3,count:base*s.length,at:n=>{const title=at(Math.floor(n/s.length)),subtitle=s[n%s.length];return [title[0]+': '+subtitle[0],title[1]+' — '+subtitle[1]];}}
 ];}
function gang(g={},options={}){const bank=globalThis.MM_NAME_SUGGESTIONS?.gangs;if(!bank)return null;const key=factionKey(g,bank.factions),pool=bank.factions[key]||bank.fallback;return pick('gang:'+key,gangFamilies(bank,pool),{...options,exclude:[...(typeof data!=='undefined'?data.gangs||[]:[]).map(row=>row.name),...(options.exclude||[])]});}
function fighter(g={},options={}){const bank=globalThis.MM_NAME_SUGGESTIONS?.fighters;if(!bank)return null;const key=factionKey(g,bank.factions),pool=bank.factions[key]||bank.fallback;return pick('fighter:'+key,fighterFamilies(pool),{...options,exclude:[...(g.fighters||[]),...(g.vehicles||[])].map(row=>row.name).concat(options.exclude||[])});}
function campaign(options={}){const bank=globalThis.MM_NAME_SUGGESTIONS?.campaigns;if(!bank)return null;return pick('campaign',campaignFamilies(bank),{...options,maxLength:110,exclude:[...(typeof data!=='undefined'?data.campaigns||[]:[]).map(row=>row.name),...(options.exclude||[])]});}
window.MMNameVariety={gang,fighter,campaign};
})();
