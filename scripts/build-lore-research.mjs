import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const groups=['world','houses','society','cults','wastes'];
const documents=groups.map(group=>JSON.parse(fs.readFileSync(new URL('../data/lore-research-'+group+'.json',import.meta.url),'utf8')));
const payload={checkedOn:'2026-10-31',sources:{},factions:[],worldChapters:documents[0].worldChapters,readingLinks:documents[0].readingLinks,accessIssues:[]};
for(const document of documents){
 for(const [id,source]of Object.entries(document.sources)){
  assert(!payload.sources[id],'Duplicate source ID '+id);assert.equal(new URL(source.url).protocol,'https:');
  assert(['wh40k.lexicanum.com','www.warhammer-community.com','assets.warhammer-community.com','necromunda.com','www.blacklibrary.com','www.warhammer.com','gall.dcinside.com'].includes(new URL(source.url).hostname),'Unexpected source host '+source.url);
  assert.equal(source.title.length,2);assert(source.publisher);assert.equal(source.checkedOn,payload.checkedOn);assert(source.access);payload.sources[id]=source;
 }
 payload.factions.push(...document.factions);payload.accessIssues.push(...(document.accessIssues||[]));
}
assert.equal(payload.factions.length,17);assert.equal(new Set(payload.factions.map(f=>f.name)).size,17);
const wordCounts=new Map();
for(const faction of [...payload.factions,{chapters:payload.worldChapters}])for(const chapter of faction.chapters){
 assert(chapter.paragraphs.length>=(chapter.editorialNote?1:2));assert.equal(chapter.title.length,2);assert(chapter.sourceIds.length);
 for(const pair of chapter.paragraphs){assert.equal(pair.length,2);assert(pair.every(t=>typeof t==='string'&&t.length>50));}
 for(const id of chapter.sourceIds)assert(payload.sources[id],'Unknown source '+id);
 if(chapter.paragraphSourceIds){assert.equal(chapter.paragraphSourceIds.length,chapter.paragraphs.length);assert.deepEqual([...new Set(chapter.paragraphSourceIds.flat())].sort(),[...new Set(chapter.sourceIds)].sort());}
 for(const [i,pair]of chapter.paragraphs.entries())for(const id of chapter.paragraphSourceIds?.[i]||chapter.sourceIds){
  const url=payload.sources[id].url.toLowerCase().replace(/\/$/,'');wordCounts.set(url,(wordCounts.get(url)||0)+pair.reduce((sum,t)=>sum+t.trim().split(/\s+/).length,0));
 }
}
for(const [url,count]of wordCounts)assert(count<=200,'Source summary budget exceeded: '+url+' ('+count+')');
const serialized=JSON.stringify(payload).replaceAll('<','\\u003c');
const implementation=`/* Generated original bilingual research notes. See data/lore-research-*.json. */
(()=>{'use strict';
const research=${serialized};
window.MMGangLoreSources=Object.freeze({...window.MMGangLoreSources,...research.sources});
const canonical=url=>{const value=new URL(url);value.hash='';value.search='';return value.href.toLowerCase().replace(/\\/$/,'');};
function replace(value,find,replacement){let count=0;if(typeof value==='string'){count=value.includes(find)?1:0;return {value:value.split(find).join(replacement),count};}if(!value||typeof value!=='object')return {value,count};for(const key of Object.keys(value)){const result=replace(value[key],find,replacement);value[key]=result.value;count+=result.count;}return {value,count};}
for(const addition of research.factions){
 const entry=Object.values(window.MMGangLoreData).find(e=>e.name===addition.name);if(!entry)throw Error('Missing faction '+addition.name);
 for(const correction of addition.corrections||[]){const result=replace(entry,correction.find,correction.replace);if(!result.count)throw Error('Unmatched lore correction '+addition.name+': '+correction.find);}
 const titles=new Set(entry.chapters.map(ch=>ch.title[0]));
 for(const chapter of addition.chapters){if(titles.has(chapter.title[0]))throw Error('Duplicate lore chapter '+chapter.title[0]);titles.add(chapter.title[0]);entry.chapters.push(chapter);}
 const merged=new Map(entry.sources.map(source=>[canonical(source.url),source]));
 for(const id of new Set(addition.chapters.flatMap(ch=>ch.sourceIds))){const source=research.sources[id];merged.set(canonical(source.url),source);}
 entry.sources=[...merged.values()];entry.researchedOn=research.checkedOn;entry.researchTopics=addition.chapters.length;
}
window.MMGangLoreResearch=research;
})();
`;
// Run generated data with the real catalogue before saving it.
const window={RULES_DATA:JSON.parse(fs.readFileSync(new URL('../dist/rules-data.json',import.meta.url),'utf8'))};
const context=vm.createContext({window,URL});
for(const name of ['gang-lore-data','gang-lore-sources','gang-lore-expanded'])vm.runInContext(fs.readFileSync(new URL('../dist/'+name+'.js',import.meta.url),'utf8'),context);
vm.runInContext(implementation,context);
fs.writeFileSync(new URL('../dist/gang-lore-researched.js',import.meta.url),implementation);

const E=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const kind={wiki:'팬 위키',article:'공식 기사','official-setting':'공식 세계관','fiction-catalog':'소설 소개','fan-summary':'팬 요약','article-index':'공식 기사 목록'};
const link=source=>'<a href="'+E(source.url)+'" target="_blank" rel="noopener noreferrer">'+E(source.title?.[1]||source.url)+'</a>';
const entries=Object.values(window.MMGangLoreData);
const newTopics=payload.factions.reduce((sum,f)=>sum+f.chapters.length,0);
const issues=[...new Map(payload.accessIssues.map(issue=>[issue.url+'|'+issue.status,issue])).values()];
const report=`<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>팩션 로어 보강 보고서 — 언더하이브 코리아</title><style>
:root{color-scheme:dark;--bg:#101511;--panel:#1e2621;--line:#3b443b;--text:#eeece1;--muted:#b9c0b5;--accent:#d3bd78}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font:16px/1.9 system-ui,sans-serif}main{max-width:1080px;margin:auto;padding:24px 18px 60px}a{color:var(--accent);text-underline-offset:4px;overflow-wrap:anywhere}header{border-bottom:1px solid var(--line);padding-bottom:20px}h1{font-size:28px;line-height:1.5}h2{font-size:21px;margin-top:36px}h3{font-size:17px}p,li{overflow-wrap:anywhere}small,.muted{color:var(--muted)}.metrics{display:flex;flex-wrap:wrap;gap:12px;margin:24px 0}.metrics span{padding:10px 16px;background:var(--panel);border:1px solid var(--line)}details{border:1px solid var(--line);border-radius:6px;padding:12px 16px;margin:12px 0}summary{cursor:pointer;min-height:36px;font-weight:600}li+li{margin-top:8px}.source{padding:12px 0;border-bottom:1px solid var(--line)}.source small{display:block}.notice{padding:14px 18px;border-left:3px solid var(--accent);background:var(--panel)}@media print{body{color:#111;background:white}a{color:inherit}.source,details{break-inside:avoid}}</style></head><body><main>
<header><a href="/">← 갱 선택으로 돌아가기</a><h1>팩션 배경·로어 보강 보고서</h1><p>확인·보강일: 2026-10-31 · 갱 상세 → 갱 정보 → 갱 배경·로어</p></header>
<div class="metrics"><span>전체 ${entries.length}개 팩션</span><span>새 팩션 주제 ${newTopics}개</span><span>공통 배경 ${payload.worldChapters.length}개</span><span>이번 참고 항목 ${Object.keys(payload.sources).length}개</span></div>
<section><h2>수정한 내용과 자료의 범위</h2><p>기존 입문 설명과 유용한 이야기 자료를 유지하고, 역사·조직·문화·생활·인물·사건·거점을 팩션별로 보강했습니다. 각 새 주제 아래에 실제 참고 자료를 연결하고 공식 기사·팬 위키·소설 소개의 유형을 표시했습니다. 렉시카눔은 원전 책·쪽수를 추적하기 위한 2차 자료이며, 그 원전을 모두 직접 열람했다는 뜻은 아닙니다.</p><p>공통 배경에는 행성 산업, 하이브의 층위, 프라이머스 밖의 지리, 더스트 폴스, 노동 교대, 계승 전쟁의 서사 시점을 정리했습니다. 통치 체제의 전통적 설명과 시대별 사건, 전설과 상충하는 서술을 구분했습니다.</p><p class="notice">접근 가능한 공개 자료를 확인해 작성한 해설입니다. 링크된 사이트 전체, 모든 과거 판본, 유료 소설·룰북의 전 내용을 수집한 완전판으로 표시하지 않습니다. 기존 출처의 이전 확인일은 유지하며, 이번에 확인한 항목에만 2026-10-31을 기록했습니다. 갱·파이터·캠페인의 기록과 게임 규칙에는 이 설명을 쓰지 않습니다.</p></section>
<section><h2>팩션별 보강 내역</h2>${payload.factions.map(f=>{const entry=entries.find(e=>e.name===f.name);return '<details><summary>'+E(window.RULES_DATA.gangTypes.find(t=>t.name===f.name)?.name_ko||f.name)+' · 새 주제 '+f.chapters.length+'개 / 전체 '+entry.chapters.length+'개</summary><ol>'+f.chapters.map(ch=>'<li>'+E(ch.title[1])+'</li>').join('')+'</ol>'+(f.corrections?.length?'<h3>기존 설명 수정</h3><ul>'+f.corrections.map(c=>'<li>'+E(Array.isArray(c.reason)?c.reason[1]:c.reason)+'</li>').join('')+'</ul>':'')+'</details>';}).join('')}</section>
<section><h2>사용자가 제공한 자료 입구</h2><ul>${payload.readingLinks.map(src=>'<li>'+link(src)+' <small>· '+E(kind[src.kind]||src.kind)+'</small></li>').join('')}</ul></section>
<section><h2>접근 실패·리디렉션·자료 간 차이</h2><p>다른 공개 경로와 검색 색인으로 확인한 경우, 전체 본문을 읽은 경우와 구분했습니다. 엉뚱한 페이지로 이동하는 HTTP 200 응답도 원문 열람 성공으로 세지 않습니다. 상충하는 내용은 임의로 하나로 합치지 않습니다.</p>${issues.map(issue=>'<details><summary>'+E(issue.status||'확인 메모')+'</summary><p><a href="'+E(issue.url)+'" target="_blank" rel="noopener noreferrer">'+E(issue.url)+'</a></p><p>'+E(Array.isArray(issue.note)?issue.note[1]:issue.note)+'</p></details>').join('')}</section>
<section><h2>이번 확인 자료</h2>${Object.values(payload.sources).map(source=>'<div class="source">'+link(source)+'<small>'+E(kind[source.kind]||source.kind)+' · '+E(source.publisher)+' · '+E(source.access==='search-excerpt'?'검색 색인 발췌만 확인':source.access==='read'?'본문 확인':source.access)+' · '+E(source.checkedOn)+'</small>'+(source.note?.length?'<small>'+E(Array.isArray(source.note)?source.note[1]:source.note)+'</small>':'')+'</div>').join('')}<p class="muted">렉시카눔 참고 항목은 해당 문서와 기여자들에게 출처를 표시합니다. 본문은 원문 전재나 소설·룰북의 대체물이 아닌 여러 자료를 비교한 독자적인 요약·해설입니다.</p></section>
</main></body></html>`;
fs.mkdirSync(new URL('../dist/reports/',import.meta.url),{recursive:true});
fs.writeFileSync(new URL('../dist/reports/lore-research-review.html',import.meta.url),report);
console.log('Built lore research: '+payload.factions.length+' factions, '+newTopics+' new topics, '+Object.keys(payload.sources).length+' references.');
