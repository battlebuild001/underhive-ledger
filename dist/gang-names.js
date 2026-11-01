/* Original offline gang-name suggestions; no rule or campaign records are changed. */
(function(){'use strict';
const E=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const words=s=>s.split('|').map(pair=>pair.split('/'));
const theme=(first,last)=>({first:words(first),last:words(last)});
const pools={
 'House Cawdor':theme('불타는/Burning|잿빛/Ashen|속죄의/Penitent|성스러운/Hallowed|꺼지지 않는/Undying','성가대/Choir|횃불단/Torches|순례단/Pilgrims|종지기들/Bellkeepers|구도자들/Seekers'),
 'House Delaque':theme('침묵의/Silent|장막 속/Veiled|창백한/Pale|잊힌/Forgotten|보이지 않는/Unseen','속삭임/Whispers|감시자들/Watchers|그림자들/Shadows|비밀 결사/Cabal|목격자들/Witnesses'),
 'House Escher':theme('맹독의/Venomous|진홍빛/Crimson|밤의/Nocturnal|가시 돋친/Thorned|칠흑의/Onyx','독사단/Vipers|발톱단/Claws|가시단/Thorns|사냥꾼들/Hunters|칼날단/Blades'),
 'House Goliath':theme('강철의/Steel|용광로의/Furnace|불굴의/Unbroken|분노의/Wrathful|검은 철의/Black Iron','주먹단/Fists|분쇄자들/Crushers|망치단/Hammers|파괴자들/Breakers|거인들/Giants'),
 'House Orlock':theme('녹슨/Rusted|강철의/Iron|매연의/Smokebound|황무지의/Wasteland|검은 도로의/Blackroad','사슬단/Chains|도로왕들/Road Kings|운반자들/Haulers|방랑자들/Drifters|장총단/Long Guns'),
 'House Van Saar':theme('유령의/Ghost|빛나는/Radiant|푸른/Blue|불안정한/Volatile|최후의/Last','회로단/Circuits|광선단/Beams|핵심부/Core|기술 결사/Tech Cabal|신호단/Signals'),
 'Palanite Enforcers':theme('강철의/Iron|검은/Black|최후의/Final|완고한/Unyielding|심야의/Midnight','감시대/Watch|진압대/Suppressors|순찰대/Patrol|봉쇄대/Cordon|심판단/Judges'),
 'Venator Gangs':theme('잿빛/Ashen|붉은/Red|집요한/Relentless|황야의/Wildland|한밤의/Midnight','추적자들/Trackers|현상금 사냥단/Bounty Hunters|회수자들/Reclaimers|사냥개들/Hounds|명사수들/Deadeyes'),
 'Corpse Grinder Cults':theme('핏빛/Bloodstained|굶주린/Ravenous|진홍의/Crimson|광란의/Frenzied|뼈를 가르는/Bonecleaving','도살단/Butchers|식인귀들/Devourers|갈고리단/Hooks|절단자들/Cleavers|육식자들/Flesh Eaters'),
 'Outcasts':theme('버려진/Forsaken|잊힌/Forgotten|사슬 끊은/Unchained|먼지 속/Dustbound|이름 없는/Nameless','유랑단/Wanderers|생존자들/Survivors|망명자들/Exiles|도망자들/Runaways|잔당/Remnants'),
 'Free Ogryns':theme('사슬 끊은/Unchained|자유로운/Free|강철의/Iron|불굴의/Unbroken|우렁찬/Roaring','주먹들/Fists|해방자들/Liberators|거인들/Giants|철거단/Wreckers|망치들/Hammers'),
 'Genestealer Cults':theme('깊은 곳의/Deep|떠오르는/Rising|별을 기다리는/Starbound|숨겨진/Hidden|해방의/Liberating','형제단/Brotherhood|광부들/Miners|새벽단/Dawn|혈족/Kindred|예언자들/Prophets'),
 'Chaos Helots':theme('저주받은/Accursed|뒤틀린/Twisted|검은/Black|불경한/Profane|불타는/Burning','계약단/Covenant|신도들/Disciples|전령들/Heralds|성가대/Choir|제물단/Offerings'),
 'The Malstrain':theme('뒤틀린/Twisted|역병의/Blighted|창백한/Pale|오염된/Tainted|기형의/Warped','혈족/Brood|포자단/Spores|발톱들/Claws|둥지/Nest|굶주림/Hunger'),
 'Spyre Hunters':theme('황금빛/Golden|상층의/Highspire|심야의/Midnight|오만한/Proud|진홍빛/Crimson','사냥단/Hunt|추격자들/Pursuers|발톱단/Talons|귀공자들/Scions|결사단/Circle'),
 'Ironhead Squats':theme('강철의/Iron|깊은 산의/Deepstone|청동의/Bronze|불굴의/Unbroken|용광로의/Furnace','채굴단/Miners|곡괭이단/Picks|광맥단/Veins|굴착단/Drillers|탐광자들/Prospectors'),
 'Ash Waste Nomads':theme('잿바람의/Ashwind|모래 속/Sandbound|폭풍의/Storm|먼지 속/Dustbound|떠도는/Wandering','유랑단/Nomads|습격자들/Raiders|추적자들/Trackers|유령들/Ghosts|길잡이들/Pathfinders')
};
const fallback=theme('잿빛/Ashen|붉은/Red|검은/Black|강철의/Iron|황혼의/Dusk','사냥개들/Hounds|방랑자들/Drifters|칼날단/Blades|생존자들/Survivors|까마귀들/Ravens');
const norm=s=>String(s||'').normalize('NFKC').replace(/\s+/g,' ').trim().toLocaleLowerCase();
function generate(g={}, {language=window.UKI18n?.language||'ko',exclude=[]}={}){
 const expanded=window.MMNameVariety?.gang(g,{language,exclude});if(expanded)return expanded;
 const types=globalThis.RULES_DATA?.gangTypes||[];let t=types.find(t=>t.id===g.gangTypeId)||types.find(t=>t.name===g.faction);
 const seen=new Set;while(t?.parent_gang_type_id&&!pools[t.name]&&!seen.has(t.id)){seen.add(t.id);t=types.find(row=>row.id===t.parent_gang_type_id);}
 const pool=pools[t?.name||g.faction]||fallback,index=language==='en'?1:0,used=new Set([...(typeof data!=='undefined'?data.gangs||[]:[]).map(g=>g.name),...exclude].map(norm));
 const names=pool.first.flatMap(a=>pool.last.map(b=>[a[0]+' '+b[0],a[1]+' '+b[1]])),available=names.filter(pair=>pair.every(name=>!used.has(norm(name))));
 if(available.length){const random=new Uint32Array(1);crypto.getRandomValues(random);return available[random[0]%available.length][index];}
 for(let n=2;;n++)for(const pair of names){const candidate=pair[index]+' '+n;if(!used.has(norm(candidate)))return candidate;}
}
function field(value,g={}){return `<div class="wide gang-name-field"><label for="gang-name-input" data-i18n-en="Gang Name *" data-i18n-ko="갱 이름 *">Gang Name *</label><div class="gang-name-row"><input id="gang-name-input" name="name" value="${E(value)}" required placeholder="Enter gang name" data-i18n-en-placeholder="Enter gang name" data-i18n-ko-placeholder="갱 이름 입력"><button type="button" class="btn" data-gang-name-generate data-gang-name-type="${E(g.gangTypeId)}" data-gang-name-faction="${E(g.faction)}"><span data-i18n-en="Generate name" data-i18n-ko="자동 생성">Generate name</span></button></div><span class="gang-name-announcement" role="status" aria-live="polite"></span></div>`;}
document.addEventListener('click',event=>{
 const button=event.target.closest?.('[data-gang-name-generate]');if(!button||button.disabled)return;event.preventDefault();event.stopImmediatePropagation();
 const form=button.closest('form'),input=form?.elements.name;if(!input)return;
 const faction=form.elements.faction,g={gangTypeId:button.dataset.gangNameType,faction:faction?.type==='text'?faction.value:button.dataset.gangNameFaction};
 input.value=generate(g,{exclude:[input.value]});input.dispatchEvent(new Event('input',{bubbles:true}));input.dispatchEvent(new Event('change',{bubbles:true}));
 const status=form.querySelector('.gang-name-announcement');if(status)status.textContent=input.value;
},true);
window.MMGangNames={generate,field};
})();
