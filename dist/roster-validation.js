/* Composition checks await a verified supplied official ruleset.
   This module never presents missing validation as a successful rules check. */
(function(){
  'use strict';
  const matchesEdition=(row,gang)=>{const actual=row?.edition_slug||row?.edition;return !actual||String(actual).toLowerCase()===String(gang?.edition).toLowerCase();};
  const none=()=>[];
  const summary=g=>String(g?.edition).toLowerCase()==='n26'&&(globalThis.RULES_DATA?.coreRules||[]).some(row=>row.source_verified&&row.id==='n26-core-gang-composition')?'<div class="notice" data-roster-validation-pending><strong data-i18n-ko="구성 조건 확인">Check roster conditions</strong><p data-i18n-ko="모집 전 갱별 구성·장비 제한과 예외를 확인하세요. 이 명단의 모든 조건을 자동 판정하지는 않습니다.">Check the gang composition, equipment restrictions and specific exceptions before recruitment. This roster does not automatically validate every condition.</p><button type="button" class="btn small" data-verified-rule="gang-composition" data-verified-edition="n26" data-i18n-ko="구성 조건 보기">Read composition rules</button></div>':'<div class="notice" data-roster-validation-pending><strong data-i18n-ko="공식 명부 검사 대기">Official roster validation pending</strong><p data-i18n-ko="확인된 공식 원본 데이터가 없어 구성·무기 슬롯·모집 자격을 판정하지 않습니다. 저장된 기록이 공식 규칙에 맞는다는 뜻은 아닙니다.">Composition, weapon limits and recruitment eligibility are not validated without verified original data. Saved records are not certified as rules compliant.</p></div>';
  const reviewBefore=(_gang,proceed)=>{proceed?.();return true;};
  window.MMRosterValidation={inspect:none,fighterWarnings:none,weaponSets:none,slotValue:()=>null,matchesEdition,guardForm:()=>true,summary,reviewBefore,requiresReview:()=>false,ensureReviewed:()=>Promise.resolve(true)};
})();
