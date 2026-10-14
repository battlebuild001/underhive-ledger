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
