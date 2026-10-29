# 화면·상호작용 조사 및 구현 기록

조사일: 2026-10-14. 제공된 계정의 일반 로그인과 정상 읽기 API로 공개 시스템 자료 및 본인에게 표시되는 화면을 조사했습니다. 이 저장소에는 원본 계정 비밀번호·토큰·개인 갱·캠페인이 없습니다.

## 실제 자료

`dist/rules-data.json`과 동기 로드용 `rules-data.js`는 같은 시스템 카탈로그입니다. 조회한 항목·개수·응답 상태는 데이터 내부 manifest에 기록되어 있습니다. 에디션2, 갱종류59, 파이터유형1103, 장비1535, 무기프로파일1271, 스킬385, 효과637, 영토292, 시나리오175, 차량유형18을 포함합니다. 기본 장비·선택 그룹·스킬 접근·가격 할인·거래소 관계도 포함합니다. 기본 갱 초상화62개의 공개 URL과 credit는 gang-portrait 모듈에 있습니다.

## 화면과 다음 단계

| 영역 | 구현한 선택·중첩 흐름 |
| --- | --- |
| 갱 | Edition→Gang Type→Variant/Affiliation/Origin/Subtypes→Credits/Portrait/Name, Edit, Resources별 증감 사유, Copy, 로그 필터·페이지 |
| 영입 | 실제 종류 검색→Specialisation/Legacy/Archetype/Starting Equipment→Cost/Rating/Name, Gang Additions 카테고리 |
| 파이터 | Edit의 특성 조정·스킬 접근·특수규칙, XP 원인별 계산, 발전 주사위·다음 선택·취소, 시작 스킬, 유료스킬 환불, N26승급, Spyrer Power Boost |
| 장비·부상 | 실제 장비/할인/프로파일/효과 그룹 선택, 결제1회, 로드아웃 편집, 부상→Recovery/포획/대상 선택, rig glitch와 해제 |
| 명단 | 활성 로드아웃 카드, 에디션별 특성·무기표, 상태·부상·스킬·특수규칙, 보기 모드, 카드 메뉴와 순서 저장 |
| 갱 활동 | 노트3종 리치 편집, 전술 팩·카드·주사위, N23 Escher 연금술, N26 Post-Cycle15종과 의료·손상·전술 후속 선택 |
| 차량·인쇄 | N23 타입·Locomotion·Crew·Hardpoints·장비·손상·수리·판매, N26 vehicle 손상·수리, Print Options·실시간 미리보기·인쇄 |
| 재정 | 창고·미배정 차량은 Wealth만, 배정 Crew·활동 상태·동맹 공납, Wealth/Gang Size 팝오버 |
| 캠페인 | 생성·편집, 자원·allegiance, 참가·역할, 영토 실제 카탈로그·소유 별도창, 전투 보고·동시승리·영토 점유 |
| 전투 세션 | Pre-Battle→Battle→Post-Battle→Completed, crew/loadout/ready, 라운드, XP/부상/보상, 중복 보상 방지 |
| 캠페인 도구 | N26 세 시나리오 표·D6, 지도/도형/그리드/영토 연결, 팩 리치 편집, 성과 실제 기준, JSON/XML |
| 사용자 자산 | Equipment/Fighter Types/Skills & Sets/Gang Types/Trading Posts/Collections, Create/Edit/View/Share/Copy/Delete, 중첩 규칙과 프로파일 |
| 계정 | Username/Email inline edit, friends 요청/수락/삭제, 알림 읽음/삭제/설정, 계정별 D1 문서와 충돌 검사, 공유캠페인 역할, R2 업로드 |

## 검증

`tests/`에는 정상·취소·필수값·비용·부상 modifier·승급 reversal·수락 권한·다른 계정 격리·이미지 접근 권한 등을 검사하는 재현 가능한 Node/SQLite/jsdom 시험이 있습니다. 이미지 시험은 실제 PNG decode/crop/WebP encode를 확인합니다. 빌드 검증은 완성된 Worker 모듈의 static/deep route와 인증된 계정·문서 저장, 생성된 SQL 적용을 확인합니다.

이 환경에는 Sites의 지원되는 관리 브라우저가 없어 새 앱의 픽셀 비교나 실제 브라우저 전체 버튼 순회를 완료했다고 주장하지 않습니다. 원본 사이트는 별도로 읽기 전용 관찰했습니다. Discord Bot/Patreon/이메일 발송은 외부 서비스 설정 없이 동작하는 것으로 가장하지 않습니다. 원본 전체 기능과 픽셀까지 1:1 검증을 마쳤다는 보장은 아닙니다.

## 2026-10-15 모바일 조작 재점검

사용자 화면에서 선택 목록을 열자 키보드가 올라오는 원인을 확인했습니다. 선택 트리거 자체가 `type=search` 입력이었고 열릴 때 `.select()`를 호출했습니다. 트리거를 실제 버튼으로 바꾸고 검색 입력을 목록 내부로 옮겼습니다. 목록 열기·항목 선택·닫기는 텍스트 입력에 포커스하지 않으며 검색은 사용자가 직접 입력칸을 선택했을 때만 시작합니다.

- 공통: 검색·선택 분리, 숨은 FormData 값과 가시 라벨 일치, 동적 옵션 유지, Escape가 먼저 목록만 닫기, 터치 목록 스크롤, visualViewport에 맞춘 팝업·모달 높이, 취소 시 버튼 포커스, 오래된 비동기 저장이 새 모달을 닫지 않기.
- 파이터: 수동 XP와 메모 입력 충돌, 특성·스킬 접근·로드아웃의 중첩 취소, Enter의 잘못된 부모 저장, 발전 선택 잔존값, 늦은 이미지 처리 경합 수정.
- 캠페인·명단·인쇄: 시나리오 주사위 라벨, 공동승자 선택 갱신 시 노드 보존, 메뉴와 인쇄 옵션 포커스, 인쇄 카드의 표시 클래스 유지.
- 자산·초상화·재정: 중첩 창 취소·배경 클릭·초안 보존, 갤러리의 올바른 복귀 버튼, 긴 팝오버의 화면 경계와 스크롤.
- 전술·연금술·차량: 체크 시 목록 위치 보존, 불필요한 텍스트 자동 포커스 제거, 차량 편집 초안·하드포인트 위치 보존.
- 계정: 검색어·결과·선택 범위 보존, 취소한 요청의 새 창 침범 방지, 중복 동기화 대기, 프로필·설정 동시 저장의 필드 덮어쓰기 수정.

`tests/interaction-core.cjs`, `campaign-mobile-controls.cjs`, `fighter-interactions.cjs`, `mobile-own-controls.cjs` 및 기존 통합 시험으로 실제 DOM 버튼 클릭·검색·선택·취소·저장·포커스·스크롤·비동기 경합을 검사합니다. 휴대폰 OS의 실제 키보드를 띄워 측정한 시험은 아니며, 기존의 Sites 지원 브라우저 부재 제한은 계속 적용됩니다.

## 2026-10-15 파이터 하단 상태·복제·삭제 버튼

사용자 스크린샷의 하단 7개 버튼을 전체 클라이언트 스크립트의 실제 DOM 클릭으로 검사했습니다. 은퇴 상태에서는 Unretire/Copy/Delete만 허용되며 잠긴 버튼을 명확히 표시합니다. Recovery→Kill 허용, 상태 복귀 시 기존 boolean 상태값 해제, Capture/Rescue의 Captured 부상·대상 연결, 현재 가치의 판매, 새 인원/경험 유지 복제, 현재 장비를 포함한 삭제 환급, Crew 삭제 시 차량 배정 해제를 수정했습니다. 장비의 평점은 지불액과 분리해서 계산합니다.

`tests/fighter-bottom-actions.cjs`는 취소 시 불변, 확인 후 상태·크레딧·평점·부상·명단·브라우저 저장 반영, 비용 부족, 환급 미선택, 완료된 확인의 중복 실행 차단, N23/N26 버튼 차이를 검사합니다. 실제 사용자 기록은 시험에서 변경하지 않았습니다. 이는 DOM/저장 자동 시험이며 실제 휴대폰 조작 시험은 아닙니다.

## 2026-10-29 Beginner gang guide

Gang headers now expose a read-only guide with five sections: roster, weapons/roles, starting skills and advancement, play sequence, and current roster checks. It uses verified N26 catalogue IDs and recruitment prices. Cawdor has separate Pious (10 models, 870cr) and Fanatic (9 models, 830cr) examples; five other Houses have budgeted starting examples. Eleven special gangs receive faction-specific advice and catalogue role cards without substituting a standard House roster. Missing access/prices suppress the confirmed shopping list. Strategy suggestions are labelled separately from rules.

Starting Primary choices, fixed grants and Specialist specialisations remain distinct. Clickable units, equipment, skills and advancement conditions use nested reference navigation. No recruitment, credit, XP, account or document write occurs from using the guide.

Verification: 22 selected suites passed; 58 retained legacy fixture suites deferred. New guide cases cover source-priced budgets, Primary restrictions, edition/custom separation, unknown prices, language switching, nested return and unchanged data. Real Chromium at 375px and 1280px passed header access, modal bounds, tabs, nested back, Escape, language switching and read-only state. Build/Worker validation passed. Tests used isolated mocked accounts, not production records. Actual mobile OS and a complete special-gang roster legality audit were not performed; the guide explicitly directs special gangs to their own rules.

## 2026-10-29 Faction rules and gang reading

Gang headers now have a separate Faction Rules button. The beginner guide opens on Meet Your Gang and has an additional Faction Rules tab. All 17 catalogue factions have bilingual original setting introductions, strengths, weaknesses, first-battle advice and common mistakes/player-fit sections. These are labelled as setting and editorial advice rather than abilities.

Faction summaries and cards read verified N26 gang descriptions, reviewed embedded rules and matching Gang Rule effects by exact faction ID, with no imported other-edition text. Cawdor shows both conditional paths and clarifies the owned Prospect requirement; Venator set ranking is distinguished from its battle-level bounty reward. Factions with only summary coverage retain that summary; missing detailed ritual procedures are not invented. Related source entries and common composition rules remain clickable with nested return. Guide examples and all saved data are unchanged.

Verification: all 22 selected suites passed; 58 retained legacy fixtures deferred. Guide tests now cover all 17 reading entries, source rule membership, faction isolation, standalone and tab access, language changes and unchanged records. Chromium at 375px and 1280px passed both entries, modal bounds, nested return, path-tab preservation, language switching and read-only state. Desktop uses the intended 1000px dialog with bounded reading width; mobile reflows to one column. Build/Worker validation passed. No physical mobile OS test or independent expansion of incomplete faction source coverage was performed.

## 2026-10-29 Backstory variety

Replaced one fixed history per faction with original bilingual fiction components: multiple origins/goals for all 17 factions, a separate Cawdor Fanatic identity, 24 coherent central incidents across eight themes, varied personalities/role passages and six paragraph structures. Four selectable tones and eight selectable focuses are in a compact expandable settings section. Creatures, machines and vehicles use dedicated nonhuman stories with incompatible human settings disabled. Korean name particles adapt to the name ending.

Selection uses freshly shuffled component bags and bounded session-only recent-story memory. Reopening/rerolling does not write or replace a saved story. Changing options/language preserves the current text until an explicit reroll; manual edits save only through the existing save action. This remains local authored fiction, not a remote AI service or a new game rule.

Verification: 22 selected suites passed, 58 legacy fixture suites deferred; the final picker/layout revisions also passed the focused story suite and Chromium flow again. Tests cover 24 distinct central incidents in 24 default draws, selected focus/tone, bilingual faction coverage, Korean particles, nonhuman separation, draft preservation, cancel/save and shared read-only protection. Chromium at 375px/1280px passed settings, reroll, language, cancel, manual edit and save in isolated mocked accounts. Build/Worker validation passed. No physical mobile OS test was performed; unlimited never-repeating prose is not claimed.

## 2026-10-29 Equipment profile choices and timing

Reviewed the provided N26 original visually at core pp52,72–74,162–163 for profile ranges, declaration timing, profile-specific Out of Ammo/Reload, melee weapon choice, Combi, Heavy, Lance-bomb and Light. Existing verified catalogue profiles supply the item-specific associations. Refined the existing ranged-attack reference to explicitly name the one equipped/usable profile selected at Declare the Shot, before measurement/rolls, with trait exceptions preserved.

Added shared read-only usage notes for all 27 multi-profile equipment entries, plus additional ammunition. Distinguishes per-attack ammunition choice, melee/ranged use, Combi simultaneous same-target −1 attacks, first-successful-hit Primed→Spent transition and multi-component purchase bundles. Cawdor blunderbuss includes an actual grape/purgation/melee example, profile-local traits, ordinary ammo/Reload scope, weapon slots and the action-repeat restriction. Additional ammunition states that its base weapon must be acquired separately. Loadouts explain the separate one-card-per-battle choice.

Shop, stash, owned equipment editor and source references use the shared explanation; profile headings show their own names rather than inheriting the polearm owner name three times. Single-profile translations retain the approved glossary, including English-only placeholder cases. Modified/custom/unresolved/other-edition profiles do not receive unsupported automatic source permissions. No weapon profile, price, saved equipment, account or battle state is changed by reading help.

Verification: 23 selected suites passed; 58 retained legacy fixtures deferred. Final source-link refinement passed the focused usage suite again. New cases cover all 27 profile groups, canonical rule links, five explicitly linked extra-ammunition entries, exceptions, edition/custom isolation, three distinct Cawdor headings and draft/data preservation. Chromium 375px/1280px passed actual shop/reference/owned editor flows, nested back, language, search and unsaved-cost preservation, cancel and bounds. Build/Worker validation passed. Original PDF and page renders remain private, outside source/build assets; no original file is published. Physical mobile OS was not tested; unverified custom rules are not validated by these annotations.

## 2026-10-29 Play mode

Added a separate read-only play reference from the gang header. It uses full-size cards, with two columns on wider screens and one on mobile, instead of scaling roster cards down. Each card keeps the unit's authored name, adjusted recorded characteristics, recorded skill effects, special rules and subtype rules visible together. Equipment profiles are an optional expansion; the active equipment-set selection filters equipment-derived modifiers and grants. Without an active set the card explicitly says it shows owned equipment. Shared faction summaries are a separate collapsed section and full reference button. No battle activation, HP, XP, purchase or eligibility simulation was introduced.

Source lookups respect edition and authored/cleared descriptions. Empty explicit special-rule arrays stay empty; missing fixed starting skills/Primary choices are shown as unrecorded rather than silently granted. Recovery-status units retain readable stats. Search matches names/type/skill aliases across KO/EN, preserves DOM and focus and stays session-only. Rule dialogs return to the same cards, while leaving play mode restores the ordinary gang screen. No source catalogue or saved document fields are changed by entry, search, help, language changes or exit. Verified-mode manual recruitment UI is hidden only in this reference screen; normal management controls remain available on exit.

Verification: 24 selected suites passed; 58 legacy fixtures deferred. Final compact-layout/search refinements passed the focused suite and real Chromium again. New tests cover adjusted stats with active/inactive equipment, skill and rule overrides, empty arrays, missing grants, source/data immutability, search/focus, language, help return, shared read-only views, empty rosters and N23 separation. Chromium at 320px/375px/1280px passed bounds, readable desktop card width, names/stats/skills/rules, search, help/Escape, language and exit, using isolated mocked accounts. Build/Worker validation passed. A physical mobile OS and an in-progress multiplayer battle were not tested; this mode is a reference view of the fighter roster, not a combat-state tracker.

## 2026-10-29 Plain-text roster export

Added Roster Text buttons to gang management and play mode. The preview offers independent KO/EN output, all-owned or selected-set equipment scope, unit stats, optional weapon profiles and optional skill/special/subtype rule descriptions. It includes authored unit names, source type/equipment names, status, equipment quantities/costs, displayed-equipment value, recorded XP, skills, rules, injuries and any recorded vehicle summaries. Active-set skill/rule grants and stat effects use the same read-only helpers as play mode. Unknown prices remain unknown rather than becoming free. Overall rating is labelled separately from displayed equipment value.

Copy is explicitly user-triggered with success feedback only after clipboard or legacy copy succeeds; blocked copy selects the readonly preview and gives a manual fallback. Download produces a UTF-8 BOM plain-text .txt file with a bounded safe filename and revokes its object URL. No external messaging or sharing-permission change occurs. Export uses a whitelist, excluding gang/fighter notes, backstories, private notes, account/owner details, IDs and log records. Rule descriptions are opt-in and retain authored overrides/blank definitions.

Verification: 25 selected suites passed; 58 retained legacy fixtures deferred. The final additional-grant/subtype-description refinement passed the focused suite again. New tests cover KO/EN, exact zeros/unknown prices, chosen equipment scope, private-field exclusion, source/data immutability, readonly preview, clipboard success/failure and download type/filename. Chromium at 375px/1280px verified both entry points, options, clipboard payload, actual downloaded UTF-8 text matching the preview, bounds and unchanged data. Build/Worker validation passed. Tests used isolated mocked accounts; physical mobile OS clipboard restrictions were not exercised, and the UI exposes a manual selection fallback.

## 2026-10-29 Remove unconditional footer notice

The gang-page wrapper appended `MMRosterValidation.summary()` on every render. For verified N26 data that function returned the generic “Check roster conditions” notice regardless of the roster; its `inspect` implementation currently reports no evaluated warnings. The footer therefore was an informational reminder, not a detected roster error.

Removed that unconditional append. Composition references remain accessible from Faction Rules and the beginner guide; no successful-validation badge or new automatic legality claim was added. Data, validation APIs, recruitment guards and unverified-source policy remain unchanged.

Verification: the existing six gang-guide checks passed. A runtime DOM read confirmed zero footer notices, both rule/guide buttons present, the composition reference link available, unchanged saved data and no runtime errors. Build/Worker validation passed. No full-suite rerun or physical device test was needed for this single rendering removal.
