/* Composition checks await a verified supplied official ruleset.
   This module never presents missing validation as a successful rules check. */
(function(){
  'use strict';
  const matchesEdition=(row,gang)=>{const actual=row?.edition_slug||row?.edition;return !actual||String(actual).toLowerCase()===String(gang?.edition).toLowerCase();};
  const none=()=>[];
  const summary=()=>'<div class="notice" data-roster-validation-pending><strong data-i18n-ko="공식 명부 검사 대기">Official roster validation pending</strong><p data-i18n-ko="확인된 공식 원본 데이터가 없어 구성·무기 슬롯·모집 자격을 판정하지 않습니다. 저장된 기록이 공식 규칙에 맞는다는 뜻은 아닙니다.">Composition, weapon limits and recruitment eligibility are not validated without verified original data. Saved records are not certified as rules compliant.</p></div>';
  const reviewBefore=(_gang,proceed)=>{proceed?.();return true;};
  window.MMRosterValidation={inspect:none,fighterWarnings:none,weaponSets:none,slotValue:()=>null,matchesEdition,guardForm:()=>true,summary,reviewBefore,requiresReview:()=>false,ensureReviewed:()=>Promise.resolve(true)};
})();
