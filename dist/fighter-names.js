/* Original, offline Warhammer-inspired names. These are creative suggestions, not rule records. */
(function(){'use strict';
const E=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const words=s=>s.split('|').map(pair=>pair.split('/'));
const common=words('세베린/Severin|말렉/Malek|실라스/Silas|카스파르/Kaspar|베스카/Veska|마라/Mara|루시엔/Lucien|드레이크/Drake|이리나/Irina|코르벤/Korven|라자르/Lazar|닉스/Nyx');
const surnames=words('애쉬본/Ashborne|크로우/Crow|베일/Veil|모른/Morne|그레이브/Grave|보스/Voss|블랙손/Blackthorn|아이언베인/Ironbane');
const theme=(first,last)=>({first:words(first),last:words(last)});
const pools={
 'House Cawdor':theme('말라키/Malachi|에브람/Evram|세베린/Severin|사비나/Sabina|로키아/Rochia|에녹/Enoch','애쉬본/Ashborne|신더/Cinder|엠버/Ember|브림스톤/Brimstone|애쉬벨/Ashbell|솔름/Solm'),
 'House Delaque':theme('실라스/Silas|베스퍼/Vesper|니라/Nyra|코르빈/Korvin|세드릭/Cedric|에리스/Eris','베일/Veil|노크스/Nox|셰이드/Shade|벨로크/Vellock|그레이스킨/Greyskin|모로/Morrow'),
 'House Escher':theme('닉스/Nyx|리사/Lyssa|베라/Vera|제트/Jett|시라/Syra|키라/Kyra','바이퍼/Viper|베녹스/Venox|애시드레인/Acidrain|래시/Lash|나이트셰이드/Nightshade|쏜/Thorn'),
 'House Goliath':theme('브라크/Brakk|크로그/Krogg|도르간/Dorgan|그레타/Gretta|바르크/Vark|렉사/Rexa','아이언핸드/Ironhand|슬래그본/Slagborn|로크조/Lockjaw|애시폴/Ashfall|스틸마울/Steelmaul|포지본/Forgeborn'),
 'House Orlock':theme('브램/Bram|마라/Mara|드레이크/Drake|케이드/Cade|베스/Vess|하르크/Hark','블랙스퍼/Blackspur|그리트/Grit|콜드웰/Coldwell|러스틀/Rustle|로드본/Roadborn|스틸로크/Steellock'),
 'House Van Saar':theme('에리크/Erik|엘리아스/Elias|프리다/Frida|디트리히/Dietrich|일자/Ilza|카스파르/Kaspar','크로넨/Kronen|헥스/Hex|보스/Voss|발트/Wald|크렐/Krell|하르트/Hart'),
 'Palanite Enforcers':theme('아드리안/Adrian|카스파르/Kaspar|레나/Lena|콘라드/Konrad|이리나/Irina|베릭/Verrik','홀트/Holt|그레이브/Grave|스턴/Stern|로크/Locke|드레이번/Draven|바르덴/Varden'),
 'Venator Gangs':theme('사이러스/Cyrus|칼릭/Kallik|드레이크/Drake|베스카/Veska|미라/Myra|오릭/Orrik','크로우/Crow|블랙스퍼/Blackspur|모른/Morne|레드잭/Redjack|더스크/Dusk|베인/Bane'),
 'Corpse Grinder Cults':theme('보르칸/Vorkan|모르칸/Morkan|카르보/Karvo|드렉/Drekk|베르크/Verk|브라카/Brakka','마로우/Marrow|레드핸드/Redhand|본소/Bonesaw|플렌서/Flenser|고어마크/Goremark|블러드훅/Bloodhook'),
 'Outcasts':theme('마라/Mara|케이드/Cade|세베린/Severin|닉스/Nyx|코르벤/Korven|엘라/Ella','애쉬/Ash|크로우/Crow|러스트/Rust|더스크/Dusk|블랙손/Blackthorn|로크/Locke'),
 'Free Ogryns':theme('브루그/Brugg|도르크/Dork|그로트/Grott|보르그/Borg|루가/Lugga|마그/Magg','체인브레이크/Chainbreak|아이언백/Ironback|블록/Block|램/Ram|브릭/Brick|스파크/Spark'),
 'Genestealer Cults':theme('에브람/Evram|실라스/Silas|라자르/Lazar|미리암/Miriam|요릭/Yorik|아벨/Avel','딥송/Deepsong|스톤본/Stoneborn|베인/Vane|홀로우/Hollow|언더스트/Underdust|크리드/Creed'),
 'Chaos Helots':theme('말렉/Malek|세베린/Severin|에리스/Eris|바라/Varra|라자르/Lazar|모르딘/Mordin','블랙칸트/Blackcant|애쉬벨/Ashbell|둘러/Duller|모른/Morne|나이트베일/Nightveil|그레이브/Grave'),
 'The Malstrain':theme('키릭/Kyrik|자르크/Zark|브릭/Vryk|크시라/Xyra|니르/Nyr|드라스/Drass','브루드/Brood|스포어/Spore|멀로우/Murlow|페일클로/Paleclaw|딥모우/Deepmaw|블라이트/Blight'),
 'Spyre Hunters':theme('루시엔/Lucien|발레리아/Valeria|오렐리안/Aurelian|세라핀/Seraphine|카시안/Cassian|이솔데/Isolde','폰 발텐/von Valten|드 모르베인/de Morvain|발크로스/Valkross|아우렐/Aurel|벨카르/Velkar|드 브라이어/de Briar'),
 'Ironhead Squats':theme('그룬드/Grund|보르간/Borgan|브록/Brokk|헬가/Helga|드라긴/Dragin|브린/Brynn','오어슨/Oreson|드릴마크/Drillmark|아이언록/Ironrock|그림홀트/Grimholt|스톤베인/Stonevein|코퍼핸드/Copperhand'),
 'Ash Waste Nomads':theme('카이르/Kair|사라크/Sarak|니마/Nima|자라/Zhara|이르카/Irka|타릭/Tarik','더스트워커/Dustwalker|윈드시어/Windshear|애쉬베일/Ashveil|샌드고스트/Sandghost|드라이윈드/Drywind|더스트클로/Dustclaw')
};
const norm=s=>String(s||'').normalize('NFKC').replace(/\s+/g,' ').trim().toLocaleLowerCase();
function generate(g,{language=window.UKI18n?.language||'ko',exclude=[]}={}){
 const expanded=window.MMNameVariety?.fighter(g,{language,exclude});if(expanded)return expanded;
 const key=window.MMGang?.findGangType?.(g)?.name||g?.faction,pool=pools[key]||{first:common,last:surnames},used=new Set([...(g?.fighters||[]).map(f=>f.name),...exclude].map(norm)),index=language==='en'?1:0;
 const names=pool.first.flatMap(first=>pool.last.map(last=>[first[0]+' '+last[0],first[1]+' '+last[1]])),available=names.filter(pair=>pair.every(name=>!used.has(norm(name))));
 if(available.length){const random=new Uint32Array(1);crypto.getRandomValues(random);return available[random[0]%available.length][index];}
 for(let n=2;;n++)for(const pair of names){const candidate=pair[index]+' '+n;if(!used.has(norm(candidate)))return candidate;}
}
function field(value,g,{editing=false}={}){return `<div class="wide fighter-name-field"><label for="fighter-name-input" data-i18n-en="${editing?'Name':'Fighter Name *'}" data-i18n-ko="${editing?'파이터 이름':'파이터 이름 *'}">${editing?'Name':'Fighter Name *'}</label><div class="fighter-name-row"><input id="fighter-name-input" name="name" value="${E(value)}" required placeholder="Enter fighter name" data-i18n-en-placeholder="Enter fighter name" data-i18n-ko-placeholder="파이터 이름 입력"><button type="button" class="btn" data-fighter-name-generate data-fighter-name-gang="${E(g.id)}"><span data-i18n-en="Generate name" data-i18n-ko="이름 생성">Generate name</span></button></div></div>`;}
document.addEventListener('click',event=>{const button=event.target.closest?.('[data-fighter-name-generate]');if(!button)return;event.preventDefault();event.stopImmediatePropagation();const form=button.closest('form'),input=form?.elements.name,g=typeof gang==='function'?gang():null;if(!input||!g||g.id!==button.dataset.fighterNameGang)return;input.value=generate(g,{exclude:[input.value]});input.dispatchEvent(new Event('input',{bubbles:true}));input.dispatchEvent(new Event('change',{bubbles:true}));},true);
window.MMFighterNames={generate,field};
})();
