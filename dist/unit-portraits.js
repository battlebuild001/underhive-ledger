/* Generated display portraits. Classification and variant assignment never edit roster records. */
(()=>{'use strict';
const root='/portraits/units/',humanoidCounts={leader:4,champion:4,ganger:8,prospect:4,support:4};
const factionNames={
 'house-cawdor':['House Cawdor','Cawdor','하우스 코드로','코드로'],
 'house-delaque':['House Delaque','Delaque','하우스 델라크','델라크'],
 'house-escher':['House Escher','Escher','하우스 에셔','에셔'],
 'house-goliath':['House Goliath','Goliath','하우스 골리앗','골리앗'],
 'house-orlock':['House Orlock','Orlock','하우스 오를록','오를록'],
 'house-van-saar':['House Van Saar','Van Saar','하우스 반 사르','반 사르'],
 'palanite-enforcers':['Palanite Enforcers','Badzone Enforcers','Enforcers','팔라나이트 인포서','배드존 인포서'],
 venators:['Venator Gangs','Venators','베나터 갱','베나터'],
 'corpse-grinder-cults':['Corpse Grinder Cults','Corpse Grinder Cult','코프스 그라인더 컬트'],
 outcasts:['Outcasts','Outcast','아웃캐스트'],
 'free-ogryns':['Free Ogryns','Free Ogryn','Slave Ogryns','프리 오그린'],
 'genestealer-cults':['Genestealer Cults','Genestealer Cult','진스틸러 컬트'],
 'chaos-helots':['Chaos Helots','Helot Chaos Cults','Helot Chaos Cult','카오스 헬롯'],
 'the-malstrain':['The Malstrain','Malstrain','더 말스트레인','말스트레인'],
 'spyre-hunters':['Spyre Hunters','Spyrer Hunters','Spyrers','스파이어 헌터','스파이러'],
 'ironhead-squats':['Ironhead Squats','Ironhead Squat Prospectors','아이언헤드 스쿼트'],
 'ash-waste-nomads':['Ash Waste Nomads','Ash Wastes Nomads','애쉬 웨이스트 노매드'],
 ratlings:['Ratlings','Ratling','래틀링'],beastmen:['Beastmen','Beastman','비스트맨'],generic:['Generic']
};
const norm=value=>String(value??'').normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,'');
const aliases=new Map(Object.entries(factionNames).flatMap(([slug,names])=>[slug,...names].map(value=>[norm(value),slug])));
const rows=()=>Array.isArray(window.RULES_DATA?.fighterTypes)?window.RULES_DATA.fighterTypes:[];
const gangs=()=>typeof data!=='undefined'&&Array.isArray(data.gangs)?data.gangs:[];
const members=g=>[...(g?.fighters||[]),...(g?.vehicles||[])];
const labels=value=>Array.isArray(value)?value.map(x=>typeof x==='string'?x:x?.name||x?.label||'').filter(Boolean):typeof value==='string'?[value]:[];
const hash=value=>{let h=2166136261;for(const c of String(value)){h^=c.codePointAt(0);h=Math.imul(h,16777619);}return h>>>0;};
function gangFor(f,g){
 if(g&&typeof g==='object')return g;
 const all=gangs(),exact=all.find(row=>members(row).includes(f));if(exact)return exact;
 const selected=typeof data!=='undefined'?all.find(row=>row.id===data.selectedGang):null;
 if(selected&&f?.id&&members(selected).some(row=>row.id===f.id))return selected;
 const candidates=f?.id?all.filter(row=>members(row).some(unit=>unit.id===f.id)):[];
 return candidates.length===1?candidates[0]:null;
}
function modelFor(f,g){
 const id=f?.fighterTypeId||f?.fighter_type_id||f?.customFighterTypeId||f?.custom_fighter_type_id||f?.presetId;
 const edition=String(g?.edition||f?.edition||'').toLowerCase(),matches=r=>!edition||String(r.edition_slug||r.edition||'').toLowerCase()===edition;
 const custom=typeof data!=='undefined'?(data.customAssets?.fighters||data.customAssets?.fighterTypes||[]):[];
 const all=[...rows(),...(Array.isArray(custom)?custom:[])];
 return id&&all.find(r=>r.id===id&&matches(r))||all.find(r=>matches(r)&&[r.name,r.name_ko,r.fighter_type].some(n=>n&&norm(n)===norm(f?.type||f?.fighter_type)))||null;
}
function factionFor(f,g,model){
 const gangTypes=window.RULES_DATA?.gangTypes||[],id=g?.gangTypeId||g?.gang_type_id||model?.gang_type_id||f?.gangTypeId||f?.gang_type_id;
 let type=gangTypes.find(row=>row.id===id),seen=new Set();
 while(type?.parent_gang_type_id&&!seen.has(type.id)){seen.add(type.id);type=gangTypes.find(row=>row.id===type.parent_gang_type_id)||type;}
 for(const value of [g?.faction,type?.name,type?.name_ko,model?.gang_name,model?.gang_type]){const slug=aliases.get(norm(value));if(slug)return slug;}
 return 'generic';
}
function classify(f,g){
 const stored=f?.id?members(g).find(unit=>unit.id===f.id):null,unit=stored?{...stored,...f}:f,model=modelFor(unit,g);
 const declared=unit?.subtypes??unit?.fighter_subtypes,current=labels(declared),fallback=labels(model?.fighter_subtypes),hasRank=values=>values.some(x=>/^(leader|champion|ganger|prospect|juve|specialist|리더|챔피언|갱어|주브)$/i.test(x));
 // Current ranks are authoritative after promotion; template labels only fill absent rank data.
 const tags=new Set([...current,...fallback].map(norm)),rankTags=new Set((hasRank(current)?current:fallback).map(norm));
 const text=[unit?.type,unit?.fighter_type,unit?.vehicleType,unit?.vehicle_type,model?.name,model?.fighter_type].filter(Boolean).join(' ').toLowerCase();
 if(!rankTags.size){for(const [pattern,rank] of [[/\b(leader|boss)\b/,'leader'],[/\bchampion\b/,'champion'],[/\b(juve|prospect)\b/,'prospect'],[/\b(specialist|specialisation|specialization)\b/,'specialist']])if(pattern.test(text)){rankTags.add(rank);break;}}
 let faction=factionFor(unit,g,model),role='ganger',body='humanoid',family=null,bank=faction;
 const tagged=(...names)=>names.some(n=>tags.has(norm(n))),ranked=(...names)=>names.some(n=>rankTags.has(norm(n)));
 const vehicle=(g?.vehicles||[]).some(row=>row===f||f?.id&&row.id===f.id)||unit?.isVehicle||unit?.is_vehicle||unit?.vehicle||tagged('Wheeled','Tracked','Walker','Vehicle')||/\b(ridgehauler|rockgrinder|goliath truck|vehicle)\b/.test(text);
 if(vehicle){body='vehicle';role='vehicle';bank='vehicles';family=/ridgehauler|hauler|cargo|truck|rockgrinder/.test(text)?'hauler':/cutter|bike|dirtbike|motorcycle/.test(text)?'bike':/hover|skimmer|grav|glider/.test(text)?'hover':tagged('Walker')||/walker|arachni.rig|sanctioner/.test(text)?'walker':tagged('Tracked')||/tracked|crawler|tank/.test(text)?'tracked':'wheeled';}
 else if(tagged('Brute')||/\b(ambot|servitor ogryn|stig.shambler|khimerix|aberrant|abominant|chaos spawn|piscean spektor|malstrain coalescence)\b/.test(text)){body='brute';role='brute';bank='brutes';family=/ogryn|jotunn|zerker|berserker/.test(text)?'ogryn':/ambot|automata|servitor|robot|driller|exo.drill/.test(text)?'ambot':/spektor|psyker|wyrd|psychic|coalescence/.test(text)?'psyker':/aberrant|abominant|spawn/.test(text)?'aberrant':/malstrain|insect|beetle|arthromite|helamite/.test(text)?'insectoid':'mutant';}
 else if(tagged('Pet','Beast')||/\b(mastiff|sumpkroc|phyrr cat|phelynx|cyberachnid|sheen bird|psychoteric wyrm|cephalopod spektor)\b/.test(text)){body='beast';role='pet';bank='beasts';if(/familiar|cephalopod/.test(text)){bank='brutes';family='psyker';}else if(/techmite/.test(text)){bank='brutes';family='ambot';}else family=/cyberachnid|tyramite|helamite/.test(text)?'insect':/cat|phelynx|felin|lynx|gyrinx/.test(text)?'feline':/rat|rodent/.test(text)?'rodent':/bird|bat|wing|hawk|eagle|ripperjack/.test(text)||tagged('Flying')?'winged':/spider|arachnid|insect|malstrain|mite|beetle|millisaur|arthromite/.test(text)?'insect':/kroc|croc|reptil|wyrm|snake|serpent/.test(text)?'reptile':'canine';}
 else {
  if(tagged('Ogryn')||/\bogryn\b/.test(text))faction='free-ogryns';
  else if(tagged('Ratling')||/\bratling\b/.test(text))faction='ratlings';
  else if(tagged('Beastman')||/\bbeastm[ae]n\b/.test(text))faction='beastmen';
  else if(/\bsquat\b|ironhead/.test(text))faction='ironhead-squats';
  bank=faction;
  if(faction==='house-cawdor'){
   // Pious and Redemptionist fighters share a House but have different dress.
   // A fighter's current allegiance wins after conversion; template tags only fill absent allegiance data.
   const allegiance=values=>values.map(norm).filter(value=>value==='pious'||value==='fanatic'),declaredAllegiance=allegiance(current),faith=declaredAllegiance.length?declaredAllegiance:allegiance(fallback);
   if(faith.includes('fanatic')||!faith.includes('pious')&&/redemption|리뎀셔|리뎀션/.test(text))bank='cawdor-redemption';
  }
  role=ranked('Leader','리더')?'leader':ranked('Champion','챔피언')?'champion':ranked('Prospect','Juve','주브')?'prospect':ranked('Ganger','갱어')?'ganger':tagged('Hanger-on','Support')||ranked('Specialist')||unit?.specialisation||unit?.specialization?'support':'ganger';
 }
 return {faction,role,body,family,bank,count:body==='humanoid'?humanoidCounts[role]:4};
}
function identity(f){return String(f?.id||f?.fighterId||f?.fighter_id||[f?.type,f?.name].filter(Boolean).join(':')||'unit');}
function bankKey(info){return info.bank+'/'+(info.family||info.role);}
function variantFor(f,g,info){
 const key=bankKey(info),wanted=identity(f),pool=members(g).filter(unit=>bankKey(classify(unit,g))===key),byId=new Map(pool.map(unit=>[identity(unit),unit]));
 if(!byId.has(wanted))byId.set(wanted,f);
 const taken=new Set();
 for(const id of [...byId.keys()].sort((a,b)=>a<b?-1:a>b?1:0)){
  let index=hash('unit-portrait-v1:'+key+':'+id)%info.count;
  if(taken.size<info.count)while(taken.has(index))index=(index+1)%info.count;
  taken.add(index);if(id===wanted)return index+1;
 }
 return 1;
}
function describe(f,g){
 if(!f||typeof f!=='object')return null;
 g=gangFor(f,g);const info=classify(f,g),variant=variantFor(f,g,info);
 return {...info,variant,source:root+bankKey(info)+'-'+variant+'.webp'+(info.bank==='house-cawdor'?'?v=cawdor-20261102':'')};
}
function source(f,g){return describe(f,g)?.source||'';}
window.MMUnitPortraits={source,describe,roles:{...humanoidCounts},factions:Object.keys(factionNames)};
})();
