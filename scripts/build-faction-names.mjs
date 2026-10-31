/* Reviewed Korean display names only. Supplied rules and saved rosters stay canonical. */
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const read=file=>fs.readFileSync(new URL('../'+file,import.meta.url),'utf8');
const write=(file,text)=>fs.writeFileSync(new URL('../'+file,import.meta.url),text);
const review=JSON.parse(read('data/localization/faction-names-ko.json')),rules=JSON.parse(read('dist/rules-data.json'));
const ctx={};vm.runInNewContext(read('dist/i18n-terms-data.js'),ctx);const terms=ctx.UK_I18N_TERMS;
assert.equal(review.factions.length,rules.gangTypes.length);assert.equal(new Set(review.factions.map(f=>f.id)).size,17);
for(const source of Object.values(review.sources)){assert.equal(new URL(source.url).protocol,'https:');assert(['read','search-index'].includes(source.access));}
for(const f of review.factions){
 const row=rules.gangTypes.find(r=>r.id===f.id);assert(row?.source_verified,'Verified faction '+f.id);assert.equal(row.name,f.english);assert.equal(row.name_ko,f.sourceKo);
 assert(f.sourceIds.length&&f.sourceIds.every(id=>review.sources[id]),'Known evidence for '+f.english);
 terms.names[f.english]=f.nameKo;
 // House prefixes and plural forms are English identities, not saved Korean values.
 const shortEnglish=f.english.replace(/^House /,'').replace(/^The /,'');if(shortEnglish!==f.english)terms.names[shortEnglish]=f.shortKo;
}
for(const r of review.reviewedCatalogueLabels){
 const row=rules[r.kind]?.find(row=>row.id===r.id);assert(row?.source_verified,'Verified row '+r.id);assert.equal(row.name,r.english);assert.equal(row.name_ko,r.sourceKo);
 assert.notEqual(r.sourceKo,r.displayKo);terms.names[r.english]=r.displayKo;
 terms.displayNameAliases??={};terms.displayNameAliases[r.english]={sourceKo:r.sourceKo,displayKo:r.displayKo};
}
for(const [en,ko] of Object.entries(terms.names))terms.names[en]=ko.replace(/코드로/g,'커도르').replace(/오를록/g,'올록').replace(/코프스 그라인더/g,'콥스 그라인더');
terms.factionSearchAliases=Object.fromEntries(review.factions.map(f=>[f.english,[...new Set([f.nameKo,f.shortKo,f.sourceKo,...f.aliases])]]));
terms.factionTextAliases={'코프스 그라인더':'콥스 그라인더','코드로':'커도르','오를록':'올록','더 말스트레인':'말스트레인'};
write('dist/i18n-terms-data.js','/* Supplemental display terms; identifiers, saved text and rule records stay canonical. */\nglobalThis.UK_I18N_TERMS = '+JSON.stringify(terms,null,2)+';\n');
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sourceList=Object.entries(review.sources).map(([id,s])=>`<li id="source-${id}"><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)}</a> · ${esc(s.kind)} · ${s.access==='read'?'본문 확인':'검색 색인 확인'}<p>${esc(s.note)}</p></li>`).join('');
const rows=review.factions.map(f=>`<tr><th scope="row">${esc(f.english)}</th><td><strong>${esc(f.nameKo)}</strong>${f.sourceKo!==f.nameKo?`<small>기존: ${esc(f.sourceKo)}</small>`:''}</td><td>${esc(f.aliases.join(' · ')||'—')}</td><td>${esc(f.note)}<small>${f.sourceIds.map(id=>`<a href="#source-${id}">${esc(review.sources[id].kind)}</a>`).join(' · ')}</small></td></tr>`).join('');
write('dist/reports/faction-names.html',`<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>팩션 이름 표기 검토</title><style>body{font:16px/1.7 system-ui,sans-serif;background:#101611;color:#e7e7df;max-width:1200px;margin:auto;padding:24px}a{color:#d9c789}h1{font-size:1.8rem}table{border-collapse:collapse;width:100%}th,td{border:1px solid #465043;padding:12px;text-align:left;vertical-align:top}small{display:block;color:#bcc6b6}li{margin:20px 0}.table{overflow:auto}p{max-width:90ch}@media(max-width:600px){body{padding:16px}table{min-width:850px}}</style><main><a href="/">← 앱으로 돌아가기</a><h1>팩션 이름 표기 검토</h1><p>확인일 ${esc(review.checkedOn)} · 전체 ${review.factions.length}개 팩션 · 변경 4개 · 유지 13개</p><p>${esc(review.policy)}</p><p>갱 선택, 목록, 로어, 팩션 이름이 포함된 파이터·장비 분류와 검증된 규칙 설명에 표시 이름을 적용합니다. 검색 별칭은 같은 팩션을 찾는 용도이며 별도 팩션이나 추가 규칙을 만들지 않습니다.</p><div class="table"><table><thead><tr><th>영문 원명</th><th>앱 표시</th><th>다른 검색 표기</th><th>판단과 근거</th></tr></thead><tbody>${rows}</tbody></table></div><h2>확인한 자료</h2><ul>${sourceList}</ul><p>국내 자료와 공식 한국어 기사에서도 음차·의역이 섞여 있습니다. 이 검토는 앱의 일관된 표시를 위한 선택이며 통계적으로 가장 흔한 표기라는 주장은 하지 않습니다. 원문 문단은 복제하지 않았습니다.</p></main></html>\n`);
console.log(`Faction naming: ${review.factions.length} reviewed factions; ${review.reviewedCatalogueLabels.length} exact source-label overrides.`);
