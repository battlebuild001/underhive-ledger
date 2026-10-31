/* Offline interface translations. Data identifiers and saved values stay canonical. */
(function () {
  'use strict';
  const pairs = `
Record capture	생포 처리
Record release	생포 해제
Record resolved release	생포 해제 확인
Record Result	결과 기록
Record only	직접 입력
User record	직접 입력
Loadout	장비 세트
Session	전투
Reverse settlement	정산 취소 확인
Reverse	정산 취소
Settlement history	정산 이력
Applied once	정산 완료
Reversed · original receipt retained	정산 취소됨 · 이전 내역 보관
Collect Income	수입 정산
Collect income	수입 받기
Collect Income for all gangs	전체 갱 수입 정산
Collect income for all gangs	전체 갱 수입 정산
Generate Gang Tactics	갱 택틱 뽑기
Visit the Trading Post	거래소 방문
Update roster	명단 정리
Downtime allowance	다운타임 지원금
Starting territories	시작 영토 배정
Medical treatment	치료 받기
Link Champion promotion	챔피언 승급 보상 받기
Roster Role	로스터 역할
Recruitment Profile	모집 옵션
Select recruitment profile	모집 옵션 선택
Recruitment Profile *	모집 옵션 *
Select profile	모집 옵션 선택
Choose profile	모집 옵션 선택
An operation key and label are required.	저장할 작업 정보를 확인할 수 없습니다.
Prepare undecided steps	남은 준비 주사위 굴리기
Apply preparation	준비 완료
Income	수입
Record arriving reinforcements	증원 배치
Settle battle result	전투 결과 정산
Create challenge battle	도전 전투 만들기
Cycle deadlines updated	사이클 마감일 변경
Cycle announcement published	사이클 공지 등록
Advance campaign cycle	다음 사이클 진행
Configure campaign progression	캠페인 진행 설정
Campaign trading cart purchase	거래소 일괄 구매
Completed rescue	구출 완료
Captive source-owner consent	생포 확인·몸값 협상
Home	홈
Overview	현황
Dashboard	대시보드
Quick Actions	빠른 작업
Quick actions	빠른 작업
Workspace	작업 공간
WORKSPACE	작업 공간
Manage	관리
Management	관리
Create	만들기
New	새로 만들기
Add	추가
Edit	수정
Save	저장
Save Changes	변경 사항 저장
Update	변경 사항 저장
Delete	삭제
Remove	제거
Cancel	취소
Close	닫기
Confirm	확인
Confirm Selection	선택 확인
Select	선택
Selection	선택 항목
Select...	선택하세요...
Select an option	항목 선택
Select one	하나 선택
Choose	선택
All	전체
None	없음
Any	모두
Yes	예
No	아니요
Back	뒤로
Next	다음
Prev	이전
Done	완료
Finish	완료
Start	시작
End	종료
View	보기
Open	열기
Search	검색
Search...	검색...
Filters	필터
Clear	초기화
× Clear	× 초기화
Apply	적용
Reset	초기화
Copy	복제
Rename	이름 변경
Share	공유
Undo	되돌리기
Download	다운로드
Import	가져오기
Export	내보내기
Print	인쇄
Take Screenshot	스크린샷 저장
Screenshot failed	스크린샷을 저장하지 못했습니다
Actions	작업
Action	작업
Action Type	작업 유형
All Action Types	모든 작업 유형
Type	유형
Subtype	하위 유형
Subtypes	하위 유형
Category	분류
All Categories	모든 분류
Name	이름
Named Type	명명된 유형
Description	설명
Desc.	설명
Details	상세
Additional Details	추가 정보
Notes	메모
Note:	안내:
Backstory	배경 이야기
History	이력
Summary	요약
Status	상태
Current	현재
Default	기본
Custom	사용자 정의
General	일반
Other	기타
Misc.	기타
Miscellaneous	기타
Unknown	알 수 없음
Unknown Type	알 수 없는 유형
Unknown Gang	알 수 없는 갱
Unknown equipment	알 수 없는 장비
Unrestricted	제한 없음
Source	출처
System	시스템
Date	날짜
Count	개수
Number	숫자
Value	가치
Total	합계
Total Cost	총비용
Cost	비용
Cost (credits)	비용 (크레딧)
Credit cost	크레딧 비용
Credits	크레딧
Credits (default)	크레딧 (기본)
Credits Earned	획득 크레딧
Credits earned	획득 크레딧
Credits spent	사용 크레딧
Credits Increase	크레딧 증가
Credits Value Increase	크레딧 가치 증가
Starting Credits	시작 크레딧
Resource	자원
Resources	자원
Rating	레이팅
Gang Rating	갱 레이팅
Crew Rating	크루 레이팅
Wealth	자산
Wealth Breakdown	자산 구성
Reputation	명성
Rank	순위
Standings	순위
Victories	승리
Victories by Allegiance	소속별 승리
Top Gangs by Reputation	명성 상위 갱
Top Gangs by Wealth	자산 상위 갱
Edition	판본
Edition *	판본 *
Gang	갱
Gangs	갱
Gangs *	갱 *
Your Gang	내 갱
Your Profile	내 프로필
Gang Name	갱 이름
Gang Name *	갱 이름 *
Gang Type	갱 유형
Gang Types	갱 유형
Gang Variant	갱 변형
Gang Subtype	갱 하위 유형
Gang Subtypes	갱 하위 유형
Gang Origin	갱 출신
Gang Legacy	갱 레거시
Gang Colour	갱 색상
Gang Composition	갱 구성
Gang Size	갱 규모
Gang Credits	갱 크레딧
Gang Notes	갱 메모
Gang Backstory	갱 배경 이야기
Gang Logs	갱 기록
Gang Additions	갱 추가 항목
Gang additions	갱 추가 항목
Gang Stash Equipment	갱 보관함 장비
Gang Vehicles	갱 차량
Gang Territories	갱 영토
Gang Tactics	갱 택틱
Gang portrait	갱 초상화
Gang Portraits	갱 초상화
GANG ROSTER	갱 로스터
GANG DOSSIER	갱 기록부
Create Gang	갱 만들기
Create a New Gang	새 갱 만들기
Add Gang	갱 추가
Add your gang	내 갱 추가
Edit Gang	갱 수정
Copy Gang	갱 복제
Delete Gang	갱 삭제
Share Gang	갱 공유
Edit Gang Portrait	갱 초상화 수정
Choose a name for the new gang.	새 갱의 이름을 입력하세요.
Enter a gang name.	갱 이름을 입력하세요.
New gang name	새 갱 이름
Select gang type	갱 유형 선택
Select a gang type.	갱 유형을 선택하세요.
Enter gang type name	갱 유형 이름 입력
Select a Gang	갱 선택
Select a gang	갱 선택
Select your gang...	내 갱 선택...
Select gang (optional)	갱 선택 (선택 사항)
Any gang type	모든 갱 유형
Any origin	모든 출신
Any subtype	모든 하위 유형
Gang created	갱을 만들었습니다
Gang created.	갱을 만들었습니다.
Gang copied.	갱을 복제했습니다.
Gang updated	갱을 수정했습니다
Gang details updated.	갱 정보를 수정했습니다.
Gang removed from campaign	갱을 캠페인에서 제외했습니다
All Gangs	모든 갱
No gangs added.	추가한 갱이 없습니다.
No other gangs available.	선택할 다른 갱이 없습니다.
No other gangs in campaign.	캠페인에 다른 갱이 없습니다.
Hide gang from public view (Only you, admins, and campaign owners/arbitrators can see it)	갱 비공개 (본인, 관리자, 캠페인 소유자와 아비트레이터만 볼 수 있습니다)
All fighters and equipment belonging to this gang will be deleted.	이 갱에 속한 모든 파이터와 장비가 삭제됩니다.
Gang cards before fighters	파이터 앞에 갱 카드 배치
Gang cards after fighters	파이터 뒤에 갱 카드 배치
Fighter	파이터
Fighters	파이터
Fighter Name *	파이터 이름 *
Fighter Type	파이터 유형
Fighter Type *	파이터 유형 *
Fighter Subtype	파이터 하위 유형
Fighter Actions	파이터 작업
Fighter Logs	파이터 기록
Fighter Note	파이터 메모
Fighter Notes	파이터 메모
Fighter Backstory	파이터 배경 이야기
Custom Fighter Type	사용자 정의 파이터 유형
Create Fighter	파이터 만들기
Add Fighter	파이터 추가
Copy Fighter	파이터 복제
Delete Fighter	파이터 삭제
Edit Fighter Portrait	파이터 초상화 수정
New fighter name	새 파이터 이름
Enter fighter name	파이터 이름 입력
Enter fighter type	파이터 유형 입력
Enter fighter cost	파이터 비용 입력
Select fighter	파이터 선택
Select fighter type	파이터 유형 선택
Select a Fighter Type	파이터 유형 선택
Select a Fighter Type.	파이터 유형을 선택하세요.
Select Fighter Subtype	파이터 하위 유형 선택
Select fighter subtype	파이터 하위 유형 선택
Select fighter specialisation	파이터 전문화 선택
Select a fighter specialisation.	파이터 전문화를 선택하세요.
Fighter Type is required.	파이터 유형을 선택해야 합니다.
Fighter added	파이터를 추가했습니다
Fighter injured	파이터가 부상을 입었습니다
Fighter to fit bionics	바이오닉스를 장착할 파이터
All Fighters	모든 파이터
Any fighter type	모든 파이터 유형
No fighters	파이터 없음
No fighters added yet.	아직 추가한 파이터가 없습니다.
No fighters in this gang.	이 갱에는 파이터가 없습니다.
No fighters yet.	아직 파이터가 없습니다.
Choose a name for the fighter copy.	복제할 파이터의 이름을 입력하세요.
Enter a name for the fighter copy.	복제할 파이터의 이름을 입력하세요.
Copy Type	복제 방식
Copy as experienced fighter	경험 있는 파이터로 복제
Base fighter with equipment and default skills (fresh recruit)	장비와 기본 스킬을 가진 기본 파이터 (신규 영입)
Full copy with all experience, stat advancements, and lasting injuries	경험치, 능력치 성장과 지속 부상을 모두 복제
Change Fighter Status	파이터 상태 변경
Active	활동
Activated	활성화 완료
In Recovery	회복 중
Captured	생포됨
Retired	은퇴
Dead	사망
Enslaved	노예
Starved	굶주림
Injured / Damaged	부상 / 손상
Pending	대기 중
Completed	완료
Ready	준비 완료
Closed	종료
Hidden	숨김
Unclaimed	미점령
Unaligned	무소속
Neutral	중립
Law Abiding	법 준수
Outlaw	무법자
Alignment	성향
Select Alignment	성향 선택
Any alignment	모든 성향
Origin	출신
Legacy	레거시
No Legacy	레거시 없음
Archetype	아키타입
Specialisation	전문화
Select a Specialisation	전문화 선택
Select a Specialisation.	전문화를 선택하세요.
Kill Fighter	파이터 사망 처리
Unretire Fighter	파이터 복귀
Sell to Guilders	길더에게 판매
Release from Guilders	길더의 노예에서 해방
Send to Recovery	회복 중으로 변경
Send to Recovery?	회복 중으로 변경할까요?
Send fighter into Recovery?	파이터를 회복 중으로 변경할까요?
Do you want to send the fighter into Recovery?	파이터를 회복 중으로 변경할까요?
Capture Fighter	파이터 생포
Recover Fighter	회복 완료
Feed Fighter	식량 지급
Starve Fighter	기아 상태로 변경
Set as Active	활동 상태로 변경
Release	해방
Capture	생포
Captured Fighters	생포된 파이터
Captured by	생포한 갱
Mark as Captured?	생포 상태로 변경할까요?
Select capturing gang...	생포한 갱 선택...
No fighters are currently held captive by gangs in this campaign.	현재 이 캠페인의 갱이 잡고 있는 포로 파이터가 없습니다.
This fighter already has the Captured lasting injury	이 파이터는 이미 생포된 상태입니다.
You will need to manually remove the Recovery flag the next time you update the gang.	다음 갱 업데이트 시 회복 상태를 직접 해제해야 합니다.
Leader	리더
Champion	챔피언
Ganger	갱어
Prospect	프로스펙트
Specialist	스페셜리스트
Juve	주브
Brute	브루트
Hanger-on	행어온
Hangers-on & Brutes	행어온 & 브루트
Hired Guns & Other	하이어드 건 & 기타
Exotic Beast	엑조틱 비스트
Exotic Beast Specialist	엑조틱 비스트 스페셜리스트
Leader/Champion	리더/챔피언
Leader / Champion / Vehicle	리더 / 챔피언 / 차량
Leader/Champion/Brute/Vehicle	리더/챔피언/브루트/차량
Crew	크루
Vehicle Crews	차량 크루
Passenger	탑승자
Pet	펫
Beast	비스트
Member	구성원
Characteristics	능력치
Characteristic	능력치
Adjust Characteristics	능력치 조정
Select a Characteristic	능력치 선택
Select a characteristic.	능력치를 선택하세요.
Movement	이동력
Weapon Skill	근접전 능력
Ballistic Skill	사격 능력
Strength	힘
Toughness	내구력
Wounds	운드
Initiative	우선권
Attacks	공격 횟수
Leadership	리더십
Cool	침착성
Willpower	의지력
Intelligence	지능
Advancement	성장
Advancements	성장
Advancement available	성장 가능
Add Advancement	성장 추가
Buy Advancement	성장 구매
Delete Advancement	성장 삭제
Select an Advancement	성장 선택
Select Advancement Type	성장 유형 선택
Select an advancement type.	성장 유형을 선택하세요.
No advancements.	성장 내역이 없습니다.
XP	XP
Total XP: 0	총 XP: 0
XP Amount	XP 수치
XP Cost	XP 비용
Starting XP	시작 XP
Add XP	XP 추가
Subtract XP	XP 차감
Refund XP cost	XP 비용 환급
XP changed	XP를 변경했습니다
XP cannot be reduced below zero.	XP는 0 미만으로 줄일 수 없습니다.
Enter a whole XP amount.	XP를 정수로 입력하세요.
Changing starting XP adjusts total XP by the difference.	시작 XP를 바꾸면 차이만큼 총 XP가 조정됩니다.
Below value can be overridden (use a negative value to subtract)	아래 값을 직접 바꿀 수 있습니다 (음수로 입력하면 차감)
Promotion	승급
Promote	승급
Promote Fighter	파이터 승급
Promote to Fighter Type	승급할 파이터 유형
Promotion to Champion	챔피언으로 승급
Confirm Promotion	승급 확정
Select a Leader fighter type.	리더 파이터 유형을 선택하세요.
To promote a fighter using XP, use the Add Advancement button on the Fighter page.	XP로 승급하려면 파이터 페이지의 성장 추가 버튼을 사용하세요.
Skill	스킬
Skills	스킬
Skill Name	스킬 이름
Skill Set	스킬 세트
Skill Set *	스킬 세트 *
Skill Access	스킬 접근
Skill Set Access	스킬 세트 접근
Skills & Skill Sets	스킬 & 스킬 세트
Default Skills	기본 스킬
Starting Skill	시작 스킬
Free Skill	무료 스킬
This fighter has a free skill	이 파이터는 무료 스킬을 받을 수 있습니다
Create Skill	스킬 만들기
Add Skill	스킬 추가
Add Skill Set	스킬 세트 추가
Delete Skill	스킬 삭제
Enter skill name	스킬 이름 입력
New skill set name	새 스킬 세트 이름
Select a Skill	스킬 선택
Select a skill	스킬 선택
Select a skill.	스킬을 선택하세요.
Select a skill to add	추가할 스킬 선택
Select a Skill Set	스킬 세트 선택
Select a Skill Set.	스킬 세트를 선택하세요.
Select a skill set	스킬 세트 선택
Select a skill set.	스킬 세트를 선택하세요.
Select skill set	스킬 세트 선택
Select a skill set that is not marked for deletion.	삭제 대상으로 표시되지 않은 스킬 세트를 선택하세요.
Choose Any Skill	원하는 스킬 선택
Choose Primary Skill	프라이머리 스킬 선택
Choose Secondary Skill	세컨더리 스킬 선택
Random Primary Skill	무작위 프라이머리 스킬
Random Secondary Skill	무작위 세컨더리 스킬
Primary	프라이머리
Secondary	세컨더리
Random	무작위
Any skill	모든 스킬
Already taken	이미 습득함
Already added	이미 추가됨
Starting skill missing.	시작 스킬이 없습니다.
⚠ Starting skill missing.	⚠ 시작 스킬이 없습니다.
This fighter already has that skill.	이 파이터는 이미 해당 스킬을 가지고 있습니다.
This Skill Set is not accessible to this fighter.	이 파이터는 이 스킬 세트에 접근할 수 없습니다.
Override the fighter's access to each Skill Set.	파이터의 스킬 세트별 접근 권한을 직접 설정합니다.
Remove the granting injury or equipment to remove this skill.	이 스킬을 제거하려면 스킬을 부여한 부상이나 장비를 제거하세요.
Remove this skill in Advancements.	성장 목록에서 이 스킬을 제거하세요.
Add a skill to your fighter that is not part of a Promotion or an Advancement.	승급이나 성장에 포함되지 않는 스킬을 파이터에게 추가합니다.
No skills.	스킬이 없습니다.
Special Rules	특수 규칙
Special Rules to be Added	추가할 특수 규칙
Special Rules to be Removed	제거할 특수 규칙
Default Special Rules	기본 특수 규칙
Add a Special Rule	특수 규칙 입력
Add a Subtype	하위 유형 입력
Add Rule	규칙 추가
Save Rule	규칙 저장
Edit rule	규칙 수정
Delete rule	규칙 삭제
Rules	규칙
Rule	규칙
Effect	효과
Effects	효과
Conditions	상태 효과
Injury	부상
Lasting Injuries	지속 부상
Lasting Injury	지속 부상
Lasting Damage	지속 손상
Critical Injury	치명적 부상
Critical Damage	치명적 손상
Add Injury	부상 추가
Add Lasting Injury	지속 부상 추가
Add Lasting Injuries	지속 부상 추가
Add Lasting Damage	지속 손상 추가
Delete Lasting Injury	지속 부상 삭제
Delete Lasting Damage	지속 손상 삭제
Remove Lasting Injuries	지속 부상 제거
No Lasting Injuries	지속 부상 없음
No Critical Injuries	치명적 부상 없음
No Lasting Damage	지속 손상 없음
No lasting injuries.	지속 부상이 없습니다.
No lasting damage yet.	아직 지속 손상이 없습니다.
Select a Lasting Injury	지속 부상 선택
Select a Lasting Damage	지속 손상 선택
Choose Lasting Damage	지속 손상 선택
Select or enter a lasting injury.	지속 부상을 선택하거나 입력하세요.
Please select a lasting injury	지속 부상을 선택하세요
Please select a lasting damage	지속 손상을 선택하세요
Custom injury name	사용자 정의 부상 이름
Out of Action	전투 불능
Out of Ammo	탄약 부족
OOA / Wreck Records	전투 불능 / 격파 기록
OOA Caused	전투 불능 유발
Cause OOA	전투 불능 유발
Cause Serious Injury	중상 유발
Serious Injury	중상
Seriously Injured	중상
Flesh Wounds	경상
Pinned	엎드림
Broken	패주
Insane	광기
Insanity	광기
Suppressed	제압
Gunked	오염
Blind	실명
Intoxicated	중독
Rad-poisoned	방사능 중독
Webbed	포박
Jammed	탄걸림
No action	행동 없음
Kills	처치 수
Current Kills	현재 처치 수
Kill Cost	처치 비용
Kill cost	처치 비용
Spend kills	처치 수 사용
Not enough kills.	처치 수가 부족합니다.
Not enough kills available.	사용 가능한 처치 수가 부족합니다.
Kills spent will be refunded.	사용한 처치 수가 환급됩니다.
Caused	유발
Against	대상
No fighters have been put Out of Action or wrecked by this fighter yet.	이 파이터가 전투 불능이나 차량 격파를 유발한 기록이 없습니다.
No fighters have put this fighter Out of Action or wrecked their vehicle yet.	이 파이터를 전투 불능으로 만들거나 차량을 격파한 파이터 기록이 없습니다.
This only creates a record, it does not change the fighter’s OOA counter or award XP.	기록만 추가하며 파이터의 전투 불능 횟수를 바꾸거나 XP를 지급하지 않습니다.
Note: Fighter information is recorded as it was at the time the record was created.	안내: 파이터 정보는 이 기록이 작성된 시점의 상태로 저장됩니다.
Removed fighter	제거된 파이터
Equipment	장비
Equipment Items	장비 항목
Equipment Name	장비 이름
Equipment Type	장비 유형
Equipment Category	장비 분류
Equipment Effects	장비 효과
Equipment List	장비 목록
Equipment Loadouts	장비 세트
Default Equipment	기본 장비
All Equipment	모든 장비
Create Equipment	장비 만들기
Add Equipment	장비 추가
Delete Equipment	장비 삭제
Sell Equipment	장비 판매
Select Equipment	장비 선택
Select equipment...	장비 선택...
Select equipment to add	추가할 장비 선택
Select an equipment category	장비 분류 선택
Select an equipment effect.	장비 효과를 선택하세요.
Select equipment list	장비 목록 선택
Search equipment...	장비 검색...
Equipment purchased	장비를 구매했습니다
No equipment.	장비가 없습니다.
No equipment available	사용 가능한 장비 없음
No equipment available.	사용 가능한 장비가 없습니다.
No equipment matches these filters.	이 필터에 맞는 장비가 없습니다.
No equipment items added yet.	아직 추가한 장비가 없습니다.
No custom equipment. Create equipment in Custom Assets.	커스텀 장비가 없습니다. 커스텀에서 장비를 만드세요.
Unknown equipment	알 수 없는 장비
Select Equipment Options	장비 옵션 선택
Choose one equipment option.	장비 옵션 하나를 선택하세요.
Choose one equipment option to receive with your purchase:	구매 시 받을 장비 옵션 하나를 선택하세요:
Select the required starting equipment.	필수 시작 장비를 선택하세요.
Can be consumed by the fighter	파이터가 소비 가능
Consumable	소모품
This equipment will be removed from all fighters that currently have it equipped.	현재 장착한 모든 파이터에게서 이 장비가 제거됩니다.
Stash	보관함
Stash is empty.	보관함이 비어 있습니다.
Move to Stash	보관함으로 이동
Move to stash	보관함으로 이동
Move Equipment to Stash	장비를 보관함으로 이동
Buy	구매
Sell	판매
Sell Value	판매 가격
Sell Value (Credits)	판매 가격 (크레딧)
Enter a sell value of zero or more.	판매 가격을 0 이상으로 입력하세요.
Confirm Purchase	구매 확인
Not enough credits available.	사용 가능한 크레딧이 부족합니다.
Not enough gang credits.	갱 크레딧이 부족합니다.
Not enough credits to add this fighter.	이 파이터를 추가할 크레딧이 부족합니다.
Not enough credits to add this vehicle	이 차량을 추가할 크레딧이 부족합니다
Not enough credits to purchase this equipment.	이 장비를 구매할 크레딧이 부족합니다.
Trade Points	거래 포인트
Not enough Trade Points.	거래 포인트가 부족합니다.
Trade Points must be a number or E.	거래 포인트는 숫자 또는 E여야 합니다.
e.g. 2 or E	예: 2 또는 E
Include this cost in gang rating	이 비용을 갱 레이팅에 포함
Use Listed Cost for Rating	목록 가격을 레이팅에 사용
Use Delegation Cost	파견 비용 사용
Loadouts	장비 세트
Loadout name	장비 세트 이름
Add a Loadout (max 50 characters)	장비 세트 추가 (최대 50자)
Edit Loadout	장비 세트 수정
Delete Loadout	장비 세트 삭제
Are you sure you want to delete this loadout?	이 장비 세트를 삭제할까요?
Select a loadout from the list to manage its equipment	장비를 관리할 장비 세트를 선택하세요.
Select only one loadout per fighter.	파이터마다 장비 세트를 하나만 선택하세요.
Weapon	무기
Weapons	무기
Weapon Profiles	무기 프로필
Add Profile	프로필 추가
Profile	프로필
No weapon profiles defined	설정한 무기 프로필 없음
No weapon profiles added yet.	아직 추가한 무기 프로필이 없습니다.
Select Weapon	무기 선택
Select a Weapon	무기 선택
Select a weapon	무기 선택
Select a weapon.	무기를 선택하세요.
Target Weapon	대상 무기
This fighter has no weapons.	이 파이터는 무기가 없습니다.
This effect requires equipment but the fighter has no weapons	이 효과는 장비가 필요하지만 파이터에게 무기가 없습니다
Attach all profiles to an existing weapon. Use this for ammunition.	모든 프로필을 기존 무기에 연결합니다. 탄약을 등록할 때 사용하세요.
Range	사거리
Short	단거리
Long	장거리
Accuracy	명중 보정
Damage	피해
Ammo	탄약
Ammunition	탄약
Traits	특성
Traits (Optional)	특성 (선택 사항)
Armour	방어구
Wargear	워기어
Accessory	액세서리
Pistol	피스톨
Basic	베이식
Special	스페셜
Heavy	헤비
Melee	밀리
Grenade	그레네이드
Availability	입수 조건
Availability Rules	입수 조건 규칙
Allowed	허용
Denied	불허
Banned	금지
Banned items are visible but cannot be purchased.	금지 항목은 볼 수 있지만 구매할 수 없습니다.
Cost Rules	가격 규칙
General Cost Override	기본 가격 직접 설정
General Availability Override	기본 입수 조건 직접 설정
No pricing rules — default cost applies.	가격 규칙이 없어 기본 가격을 적용합니다.
No rules — available to all gangs.	제한 규칙이 없어 모든 갱이 이용할 수 있습니다.
Trading Post	거래소
Trading Posts	거래소
General Trading Post	일반 거래소
Authorised Trading Posts	허용 거래소
Visit Trading Post	거래소 방문
Create equipment to add it to this post.	이 거래소에 추가할 장비를 만드세요.
Once the Trading Post has been created, you will be able to add equipment items to it and set their custom cost and availability rules.	거래소를 만들면 장비를 추가하고 사용자 정의 가격과 입수 조건을 설정할 수 있습니다.
Only selected Trading Posts are available when gangs buy equipment. Players can also use the Unrestricted list.	갱의 장비 구매에는 선택한 거래소만 사용됩니다. 플레이어는 제한 없음 목록도 이용할 수 있습니다.
This will also delete all equipment items, availability rules, and pricing in this trading post, and remove any campaign shares.	이 거래소의 모든 장비, 입수 조건, 가격과 캠페인 공유도 삭제됩니다.
Campaign	캠페인
Campaigns	캠페인
Campaign Name	캠페인 이름
Campaign Name *	캠페인 이름 *
Campaign Status	캠페인 상태
Campaign Summary	캠페인 요약
Campaign Activity Logs	캠페인 활동 기록
Campaign Pack	캠페인 팩
Campaign Allegiance	캠페인 소속
Campaign Triumphs	캠페인 트라이엄프
CAMPAIGN RECORD	캠페인 기록
Core Campaign	코어 캠페인
Create Campaign	캠페인 만들기
Create a New Campaign	새 캠페인 만들기
Edit Campaign	캠페인 수정
Delete Campaign	캠페인 삭제
Share Campaign	캠페인 공유
View Campaign Data	캠페인 데이터 보기
Campaign created	캠페인을 만들었습니다
Campaign settings updated	캠페인 설정을 수정했습니다
Campaign Pack updated	캠페인 팩을 수정했습니다
Campaign notes cannot exceed 3500 characters	캠페인 메모는 3,500자를 초과할 수 없습니다
Enter campaign description...	캠페인 설명 입력...
Select campaign type	캠페인 유형 선택
Add Gang to Campaign	캠페인에 갱 추가
Remove Gang from Campaign	캠페인에서 갱 제외
Remove gang from campaign	캠페인에서 갱 제외
Add a gang to the campaign first.	먼저 캠페인에 갱을 추가하세요.
This gang is already in the campaign.	이 갱은 이미 캠페인에 참가 중입니다.
There are no accepted gangs in this campaign yet.	이 캠페인에는 아직 승인된 갱이 없습니다.
No campaign activity recorded.	기록된 캠페인 활동이 없습니다.
Allow join requests	참가 요청 허용
Allegiance	소속
Allegiances	소속
Allegiance (optional)	소속 (선택 사항)
Allegiance name	소속 이름
Edit Allegiance	소속 수정
Add an Allegiance (max 50 characters)	소속 추가 (최대 50자)
Select Allegiance...	소속 선택...
Select gang affiliation	갱 소속 선택
Select a gang affiliation.	갱 소속을 선택하세요.
Any allegiance	모든 소속
No Allegiance	소속 없음
Gangs can choose a side or remain Unaligned.	갱은 진영을 선택하거나 무소속으로 남을 수 있습니다.
Alliance	얼라이언스
Select Alliance	얼라이언스 선택
Player	플레이어
Players	플레이어
Local player	로컬 플레이어
Add Player	플레이어 추가
Search players	플레이어 검색
Search players by their username	사용자 이름으로 플레이어 검색
Change Player Role	플레이어 역할 변경
Change player role	플레이어 역할 변경
Change Role	역할 변경
Arbitrator	아비트레이터
User	사용자
Owner	소유자
No role	역할 없음
Access Level	접근 권한
Cycle	사이클
All Cycles	모든 사이클
Downtime	다운타임
Post Cycle	사이클 종료 후
Post-Cycle Actions	사이클 종료 후 행동
Post-cycle Action: Train	사이클 종료 후 행동: 훈련
Complete the Post-cycle Actions before applying them.	적용하기 전에 사이클 종료 후 행동 선택을 완료하세요.
Enter cycle number (optional)	사이클 번호 입력 (선택 사항)
Add or remove resources (e.g. 5 or -5)	자원 추가 또는 차감 (예: 5 또는 -5)
Enter a resource amount greater than zero.	자원 수량을 0보다 크게 입력하세요.
Add a Resource (max 50 characters)	자원 추가 (최대 50자)
Triumph	트라이엄프
Triumphs	트라이엄프
No triumphs available for this campaign type.	이 캠페인 유형에 사용 가능한 트라이엄프가 없습니다.
Challenge	도전
Challenge Round	사이클 도전
Open Challenge Round	사이클 도전 시작
Open Round	라운드 시작
Save Challenge	도전 신청
Edit Challenge	도전 수정
Every gang in the campaign gets a challenge to issue.	캠페인의 모든 갱이 도전을 제안할 수 있습니다.
Tick this once the battle has been fought to record the result and file the report. Leave it unticked to save the challenge.	전투를 마쳤다면 선택하여 결과와 보고서를 기록하세요. 도전만 저장하려면 선택하지 마세요.
Battle	전투
Battles	전투
Battle Sessions	진행 중인 전투
Battle Session	진행 중인 전투
Battle Participation	전투 참가
Battles Fought	치른 전투
Battle XP	전투 XP
Battle played	전투 완료
New Battle	새 전투
Create Battle	전투 만들기
Start Battle	전투 시작
End Battle	전투 종료
Complete Battle	전투 결과 확정
Save Battle	전투 저장
Edit Battle	전투 수정
Cancel Battle	전투 취소
Cancel Battle Session	진행 중인 전투 취소
Back to Pre-Battle	전투 전 단계로
Pre-Battle	전투 전
Post-Battle	전투 후
Complete Round	라운드 완료
Complete this round and reset fighter activations?	이 라운드를 마치고 파이터의 활성화 상태를 초기화할까요?
End the battle and begin the post-battle sequence?	전투를 종료하고 전투 후 절차를 시작할까요?
Are you sure you want to cancel this battle session? This will delete all session records.	진행 중인 전투을 취소할까요? 모든 세션 기록이 삭제됩니다.
Battle session cancelled	진행 중인 전투을 취소했습니다
Add this gang to a campaign to create a battle session.	진행 중인 전투을 만들려면 이 갱을 캠페인에 추가하세요.
Choose a gang to control	조작할 갱 선택
Opponent Gang	상대 갱
Select opponent gang...	상대 갱 선택...
Select enemy gang...	적 갱 선택...
Select enemy gang type...	적 갱 유형 선택...
Select enemy fighter...	적 파이터 선택...
Add gangs to the campaign to select opponents.	상대 갱을 선택하려면 캠페인에 갱을 추가하세요.
Select at least one opponent gang.	상대 갱을 하나 이상 선택하세요.
Select at least two different gangs.	서로 다른 갱을 둘 이상 선택하세요.
No battle sessions.	진행 중인 전투이 없습니다.
No battles recorded.	기록된 전투가 없습니다.
Add Battle Report	전투 보고 추가
Edit Battle Report	전투 보고 수정
Delete Battle Report	전투 보고 삭제
Delete this battle report?	이 전투 보고를 삭제할까요?
Battle report deleted	전투 보고를 삭제했습니다
Add any additional details about the battle...	전투에 관한 추가 정보 입력...
A battle log entry will be created for the campaign.	캠페인에 전투 기록이 추가됩니다.
Select a winner or Draw.	승리 갱 또는 무승부를 선택하세요.
Winner *	승리 갱 *
All Winners	모든 승리 갱
No winner selected	승리 갱을 선택하지 않음
Draw	무승부
Played	플레이 완료
Not played	플레이 전
Winners must take part in the battle.	승리 갱은 해당 전투에 참가해야 합니다.
Participation XP	참가 XP
Remove from Battle	전투에서 제외
Activate	활성화
Successful Rally	재집결 성공
Controlled an Objective	목표 점령
Controlled Objective	점령 목표
Select a fighter, or clear the gang to leave as Unknown.	파이터를 선택하거나 갱 선택을 해제하여 미상으로 남기세요.
Scenario	시나리오
Scenario name	시나리오 이름
Custom Scenario	사용자 정의 시나리오
All Scenarios	모든 시나리오
No scenario selected	시나리오 미선택
Select a Scenario or complete Deployment, Objective and Crew.	시나리오를 선택하거나 배치, 목표와 크루를 모두 설정하세요.
Deployment	배치
Objective	목표
Tactics Cards	택틱 카드
Gang Tactic changed	갱 택틱을 변경했습니다
Add Gang Tactics	갱 택틱 추가
Add a Gang Tactic	갱 택틱 추가
Choose Gang Tactic	갱 택틱 선택
Edit Tactics Card	택틱 카드 수정
Remove Tactics Card	택틱 카드 제거
Tactics card added	택틱 카드를 추가했습니다
View tactics card description	택틱 카드 설명 보기
Pick the tactics cards this gang holds.	이 갱이 보유한 택틱 카드를 선택하세요.
No tactics cards.	택틱 카드가 없습니다.
No tactics cards available.	사용 가능한 택틱 카드가 없습니다.
No gang tactics yet.	아직 갱 택틱이 없습니다.
This Gang Tactic is already owned.	이미 보유한 갱 택틱입니다.
Develop Tactics	택틱 개발
Territory	영토
Territories	영토
Territories Controlled	통제 영토
Territory Associations	영토 연결
Campaign Type Territories	캠페인 유형별 영토
Default Gang Territory	기본 갱 영토
Add Territory	영토 추가
Edit Territory	영토 수정
Delete Territory	영토 삭제
Update Territory	영토 수정
Assign Territory	영토 배정
List Default Territories	기본 영토 목록
Add a custom Territory (max 50 characters)	사용자 정의 영토 추가 (최대 50자)
Choose a campaign type, or add a custom territory.	캠페인 유형을 선택하거나 사용자 정의 영토를 추가하세요.
Select the campaign types that you want to add territories for.	영토를 추가할 캠페인 유형을 선택하세요.
Enter territory description...	영토 설명 입력...
Territory claimed by	영토 획득 갱
Claimed Territory	획득한 영토
No territory claimed	획득한 영토 없음
Select the claiming winner	영토를 획득한 승리 갱 선택
Select the winning gang that claims the territory.	영토를 획득할 승리 갱을 선택하세요.
Remove gang from territory	영토에서 갱 제외
No territories added.	추가한 영토가 없습니다.
No territories controlled.	통제 중인 영토가 없습니다.
No territories in this campaign	이 캠페인에 영토가 없습니다
Work Territory	영토 작업
Terrorise Territory	테러라이즈 테리토리
Map	지도
Campaign Map	캠페인 지도
Map Image	지도 이미지
Create Map	지도 만들기
Edit Map	지도 수정
Save Map	지도 저장
Delete Map	지도 삭제
Delete Object	개체 삭제
Enter map name	지도 이름 입력
Campaign map updated	캠페인 지도를 수정했습니다
No campaign map created yet.	아직 캠페인 지도를 만들지 않았습니다.
Delete this campaign map? Territories will remain in the campaign.	이 캠페인 지도를 삭제할까요? 영토는 캠페인에 남습니다.
Add territories to place them on the map.	지도에 배치할 영토를 추가하세요.
No object selected.	선택한 개체가 없습니다.
No landmarks placed.	배치한 지형지물이 없습니다.
Click a shape or landmark, then select a territory to link them.	도형이나 지형지물을 누른 뒤 연결할 영토를 선택하세요.
Finish Shape	도형 완성
Finish the current shape before saving.	저장하기 전에 현재 도형을 완성하세요.
Polygon	다각형
Hex Grid	육각 격자
Line	선
Line style	선 종류
Line width	선 두께
Marker size	표식 크기
Label	라벨
Place Landmark:	지형지물 배치:
Linked	연결됨
Unlinked	연결 안 됨
Vehicle	차량
Vehicles	차량
Vehicles (without crew)	차량 (크루 제외)
Vehicle Name	차량 이름
Vehicle Type	차량 유형
Vehicle Equipment	차량 장비
Universal Vehicles	유니버설 차량
Sump Sea Vehicles	섬프 시 차량
Base Vehicle Templates	기본 차량 템플릿
Custom Rig	커스텀 리그
Light Vehicle	경량 차량
Medium Vehicle	중형 차량
Heavy Vehicle	대형 차량
Create Vehicle	차량 만들기
Add Vehicle	차량 추가
Edit Vehicle	차량 수정
Sell Vehicle	차량 판매
Select vehicle type	차량 유형 선택
Please select a vehicle type, name and cost.	차량 유형, 이름과 비용을 지정하세요.
No vehicles available.	사용 가능한 차량이 없습니다.
No vehicle equipment.	차량 장비가 없습니다.
All Vehicles	모든 차량
Select Crew	크루 선택
Select a Crew	크루 선택
Select a Crew without an assigned vehicle.	차량이 배정되지 않은 크루를 선택하세요.
Assign Vehicle to a Crew	차량을 크루에 배정
Assign to Crew	크루에 배정
Unassign Vehicle	차량 배정 해제
Assign	배정
No crew selected.	선택한 크루가 없습니다.
This vehicle can later be assigned or reassigned to a crew on the Gang page in the Vehicles tab.	나중에 갱 페이지의 차량 탭에서 이 차량을 크루에 배정하거나 재배정할 수 있습니다.
Credits will be returned to the gang. If the vehicle is assigned to a Crew, the gang rating will decrease accordingly.	크레딧은 갱에 환급됩니다. 크루에 배정된 차량이라면 갱 레이팅도 그만큼 감소합니다.
Send vehicle into Recovery?	차량을 회복 중으로 변경할까요?
Wreck Vehicle	차량 격파 처리
Vehicle Wrecked	차량 격파
Destroyed	파괴됨
Ruined	폐허
Damaged	손상됨
Hull	차체
Hull Points	차체 포인트
Handling	조종성
Front	전면
Side	측면
Rear	후면
Front Armour	전면 장갑
Side Armour	측면 장갑
Rear Armour	후면 장갑
Locomotion	구동 방식
Select locomotion	구동 방식 선택
Select locomotion.	구동 방식을 선택하세요.
Wheeled	차륜식
Tracked	궤도식
Walker	보행식
Skimmer	스키머
Flying	비행식
Hardpoints	하드포인트
Edit Hardpoints	하드포인트 수정
Fit to Hardpoint	하드포인트에 장착
Fit a Weapon to this Hardpoint	이 하드포인트에 무기 장착
Unfit Weapon	무기 장착 해제
Select Crew or Passenger and at least one arc for every hardpoint.	모든 하드포인트에 크루 또는 탑승자와 사격 방향을 하나 이상 지정하세요.
Operated By	조작 담당
Operated By *	조작 담당 *
Arc	사격 방향
Arcs	사격 방향
Cab	운전석
Rear platform	후면 발판
Transport cage	수송 케이지
Rig Glitches	리그 결함
Add Rig Glitch	리그 결함 추가
Add Rig Glitches	리그 결함 추가
No Rig Glitches	리그 결함 없음
Select a Rig Glitch	리그 결함 선택
Clear Glitches	결함 제거
Clear all rig glitches	모든 리그 결함 제거
Cleared all Rig Glitches.	모든 리그 결함을 제거했습니다.
No rig glitches to clear.	제거할 리그 결함이 없습니다.
This Lasting Damage sends the vehicle into Recovery.	이 지속 손상은 차량을 회복 상태로 보냅니다.
Visit Chop Shop	촙 숍 방문
Select a Repair Type	수리 방식 선택
Repair Type	수리 방식
Choose one replacement	교체할 항목 하나 선택
No Lasting Damage to repair.	수리할 지속 손상이 없습니다.
No valid damages to repair.	수리 가능한 손상이 없습니다.
Select at least one Lasting Damage to repair.	수리할 지속 손상을 하나 이상 선택하세요.
The following damages will be repaired:	다음 손상을 수리합니다:
All Lasting Damage will be repaired.	모든 지속 손상을 수리합니다.
All Lasting Damage will be replaced with a Persistent Rattle.	모든 지속 손상을 퍼시스턴트 래틀로 교체합니다.
Almost like new	올모스트 라이크 뉴
Quality repairs	퀄리티 리페어
Percussive Repair	퍼커시브 리페어
Power Boost	파워 부스트
Power Boosts	파워 부스트
Power Boost Effects	파워 부스트 효과
Add Power Boost	파워 부스트 추가
Undo Power Boost	파워 부스트 되돌리기
Select power boost	파워 부스트 선택
Select power boost.	파워 부스트를 선택하세요.
Select a power boost effect.	파워 부스트 효과를 선택하세요.
No power boosts.	파워 부스트가 없습니다.
Suit Evolution	슈트 에볼루션
Suit Maintenance	슈트 정비
Complete the effect selections.	효과 선택을 완료하세요.
Chem-Alchemy	켐 알케미
Chem-alchemy	켐 알케미
Chem Type	켐 유형
Create Chem-alchemy Elixir	켐 알케미 엘릭서 만들기
Create Elixir	엘릭서 만들기
Elixir Name *	엘릭서 이름 *
Enter elixir name	엘릭서 이름 입력
Elixir created	엘릭서를 만들었습니다
Check the elixir name, selected effects and cost.	엘릭서 이름, 선택한 효과와 비용을 확인하세요.
Custom Assets	커스텀
CUSTOM ASSETS	커스텀
Create Custom	사용자 정의 항목 만들기
Create your own custom fighter with unique characteristics and abilities.	고유한 능력치와 능력을 가진 사용자 정의 파이터를 만드세요.
Asset Collection	커스텀 묶음
Asset Collections	커스텀 묶음
Asset Collection Name	커스텀 묶음 이름
Copy Asset Collection	커스텀 묶음 복사
Share Asset Collection	커스텀 묶음 공유
Copy Custom Asset	커스텀 항목 복사
Copy to my assets	내 커스텀에 복사
Delete Asset	커스텀 항목 삭제
Delete this custom asset?	이 커스텀 항목을 삭제할까요?
Share this custom asset	커스텀 항목 공유
Apply every item in this asset collection	이 커스텀 묶음 전체 추가
Bundle your custom items into an asset collection you can apply to your campaigns or share. Add items after creating.	사용자 정의 항목을 커스텀 묶음으로 묶어 캠페인에 적용하거나 공유하세요. 컬렉션을 만든 뒤 항목을 추가할 수 있습니다.
Create assets to add them to this collection.	이 묶음에 추가할 커스텀 항목을 만드세요.
No custom assets.	커스텀 항목이 없습니다.
No items in this collection yet.	아직 이 컬렉션에 항목이 없습니다.
This only deletes the asset collection. The custom items themselves are not deleted.	커스텀 묶음만 삭제하며 사용자 정의 항목 자체는 삭제하지 않습니다.
This will create a copy in your custom assets list.	내 커스텀 목록에 복사합니다.
Show fighter types you created in Custom Assets	커스텀에서 만든 파이터 유형 표시
Show types from every gang	모든 갱의 유형 표시
Include Custom Fighter Types	사용자 정의 파이터 유형 포함
Include all Fighter Types	모든 파이터 유형 포함
Include all Gang Fighter Types	모든 갱 파이터 유형 포함
Select at least one gang scope.	갱 적용 범위를 하나 이상 선택하세요.
Select a gang type, origin, or fighter type.	갱 유형, 출신 또는 파이터 유형을 선택하세요.
Delete custom skill sets:	사용자 정의 스킬 세트 삭제:
Items	항목
No items available	사용 가능한 항목 없음
Select an item...	항목 선택...
Account	계정
Username	표시 이름
Email	이메일
Password	비밀번호
Friends	친구
Notifications	알림
Notification Settings	알림 설정
Shared Campaigns	공유 캠페인
Storage & Sync	저장 및 동기화
Change Username	사용자 이름 변경
Change Email	이메일 변경
Change Password	비밀번호 변경
Update Username	표시 이름 변경
Update Email	이메일 변경
New username	새 사용자 이름
New email address	새 이메일 주소
Not set	미설정
Updating...	저장 중...
Requested / Friends	요청됨 / 친구
Add Friend	친구 추가
Remove Friend	친구 제거
Remove friend	친구 제거
Accept	수락
Decline	거절
(pending)	(대기 중)
Search for users to add as friends	친구로 추가할 사용자 검색
No users found.	검색된 사용자가 없습니다.
No notifications.	알림이 없습니다.
Delete Notification	알림 삭제
Delete notification	알림 삭제
Are you sure you want to delete this notification?	이 알림을 삭제할까요?
Mark all as read	모두 읽음으로 표시
Email notifications	이메일 알림
Campaign invitations	캠페인 초대
Gang campaign invitations	갱 캠페인 초대
Friend requests	친구 요청
Campaign join requests	캠페인 참가 요청
Campaign challenges	캠페인 도전
Invite to Campaign	캠페인에 초대
Sync now	지금 동기화
Retry connection	연결 재시도
Sign in with ChatGPT	ChatGPT로 로그인
Sign out	로그아웃
↪ Logout	↪ 로그아웃
Must be 3-20 characters and can only contain letters, numbers, underscores, and hyphens	영문, 숫자, 밑줄과 하이픈으로 3~20자를 입력하세요
New username must be different from your current username	현재 사용자 이름과 다른 이름을 입력하세요
New email must be different from your current email	현재 이메일과 다른 주소를 입력하세요
Username updated.	사용자 이름을 변경했습니다.
Contact email updated.	연락 이메일을 변경했습니다.
Image	이미지
Image editing is not supported by this browser.	이 브라우저는 이미지 편집을 지원하지 않습니다.
Image cropping is unavailable in this browser.	이 브라우저에서는 이미지를 자를 수 없습니다.
Image export is not available.	이미지를 내보낼 수 없습니다.
Change Image	이미지 변경
Upload Image	이미지 업로드
Remove Image	이미지 제거
Set Image	이미지 적용
Use silhouette	실루엣 사용
Silhouette	실루엣
Keep Default	기본값 유지
Choose a portrait for this gang.	이 갱에 사용할 초상화를 선택하세요.
Crop Image:	이미지 자르기:
Crop preview	자르기 미리보기
Drag the image to crop it	이미지를 끌어 잘라낼 영역을 조정하세요
Zoom:	확대:
Uploading...	업로드 중...
Processing image...	이미지 처리 중...
AI-generated illustration	AI 생성 일러스트
Choose an image smaller than 1.8 MB.	1.8 MB보다 작은 이미지를 선택하세요.
Choose an image smaller than 800 KB.	800 KB보다 작은 이미지를 선택하세요.
Please choose an image smaller than 10MB.	10MB보다 작은 이미지를 선택하세요.
Please select an image smaller than 10MB	10MB보다 작은 이미지를 선택하세요
Please select a JPG, PNG, WEBP, GIF, AVIF, SVG, or HEIC image.	JPG, PNG, WEBP, GIF, AVIF, SVG 또는 HEIC 이미지를 선택하세요.
Supported: JPG, PNG, WEBP, GIF, AVIF, SVG, HEIC • Max 10MB	지원: JPG, PNG, WEBP, GIF, AVIF, SVG, HEIC • 최대 10MB
PNG, JPEG or WebP, up to 800 KB	PNG, JPEG 또는 WebP, 최대 800 KB
This image has no readable dimensions.	이 이미지의 크기 정보를 읽을 수 없습니다.
The image could not be read.	이미지를 읽지 못했습니다.
The image could not be processed.	이미지를 처리하지 못했습니다.
The image could not be saved. Choose a different image.	이미지를 저장하지 못했습니다. 다른 이미지를 선택하세요.
Failed to process the image. Please try a different file.	이미지를 처리하지 못했습니다. 다른 파일을 선택하세요.
Unable to process this image. Choose a JPG, PNG or WEBP file.	이미지를 처리하지 못했습니다. JPG, PNG 또는 WEBP 파일을 선택하세요.
Unable to decode this image. Choose a JPG, PNG, WEBP, GIF, AVIF or SVG file supported by your browser.	이미지를 읽지 못했습니다. 이 브라우저가 지원하는 JPG, PNG, WEBP, GIF, AVIF 또는 SVG 파일을 선택하세요.
HEIC support could not be loaded. Please try again.	HEIC 지원 기능을 불러오지 못했습니다. 다시 시도하세요.
Campaign image	캠페인 이미지
Campaign image updated	캠페인 이미지를 변경했습니다
Edit Campaign Image	캠페인 이미지 수정
Upload a campaign image.	캠페인 이미지를 업로드하세요.
Add a note here...	메모 입력...
Add backstory here...	배경 이야기 입력...
Add private notes here. Only you and your Arbitrators can view and edit these notes.	개인 메모를 입력하세요. 본인과 아비트레이터만 보고 수정할 수 있습니다.
Only you and your Arbitrators can view and edit these notes.	본인과 아비트레이터만 이 메모를 보고 수정할 수 있습니다.
Private Notes	개인 메모
No notes.	메모가 없습니다.
No notes added.	추가한 메모가 없습니다.
No backstory.	배경 이야기가 없습니다.
Description updated	설명을 변경했습니다
Enter description (optional)	설명 입력 (선택 사항)
Max 5 Char.	최대 5자
0/400 characters	0/400자
Fields marked with * are required.	* 표시 항목은 필수입니다.
Text formatting	텍스트 서식
Text Colour	글자 색상
Background Color	배경색
Font size	글자 크기
Heading	제목
Heading 1	제목 1
Heading 2	제목 2
Heading 3	제목 3
Bold	굵게
Italic	기울임
Underline	밑줄
Strikethrough	취소선
Bullet List	글머리 목록
Numbered List	번호 목록
Quote	인용문
Align Left	왼쪽 정렬
Align Center	가운데 정렬
Align Right	오른쪽 정렬
Justify	양쪽 정렬
Move up	위로 이동
Move down	아래로 이동
Colour	색상
Size	크기
Black	검정
White	흰색
Red	빨강
Orange	주황
Yellow	노랑
Green	초록
Blue	파랑
Purple	보라
Link	링크
Link URL (https://)	링크 주소 (https://)
Add Link	링크 추가
Remove Link	링크 제거
Copy Link	링크 복사
Link copied to clipboard!	링크를 클립보드에 복사했습니다!
Link copied. Shared viewers need campaign access.	링크를 복사했습니다. 열람하려면 캠페인 접근 권한이 필요합니다.
Failed to copy link.	링크를 복사하지 못했습니다.
Enter a valid https://, http:// or mailto: link.	올바른 https://, http:// 또는 mailto: 링크를 입력하세요.
Share Your Data	데이터 공유
Download JSON	JSON 다운로드
Download Gang JSON	갱 JSON 다운로드
Download XML	XML 다운로드
Download your data and import it on another device.	데이터를 내려받아 다른 기기에서 가져오세요.
Share this gang file with another player to import the roster.	이 갱 파일을 다른 플레이어에게 공유하면 로스터를 가져올 수 있습니다.
Print Options	인쇄 설정
Print style	인쇄 스타일
View Mode	보기 방식
Page View	페이지 보기
Page View ▾	페이지 보기 ▾
List View	목록 보기
Cards layout	카드 배치
Standard	표준
Fancy	장식
Letter	레터
Include the following:	포함할 항목:
Include illustrated card backgrounds when printing.	인쇄 시 카드 배경 일러스트 포함
Hide decorative backgrounds to save ink.	잉크를 절약하도록 장식 배경 숨김
Displayed size on this page is indicative only. You can change the scale of your print in your printer settings.	화면의 크기는 참고용입니다. 실제 인쇄 배율은 프린터 설정에서 바꿀 수 있습니다.
Delete Record	기록 삭제
Delete this record?	이 기록을 삭제할까요?
Are you sure you want to delete this record?	이 기록을 삭제할까요?
Edit record	기록 수정
New record	새 기록
Logged only	기록만 저장
Event type	이벤트 유형
Reason (optional)	이유 (선택 사항)
No activity logs found.	활동 기록이 없습니다.
No logs match the selected filters.	선택한 필터에 맞는 기록이 없습니다.
No logs recorded.	저장한 기록이 없습니다.
Deleted item	삭제된 항목
This action cannot be undone.	이 작업은 되돌릴 수 없습니다.
Type Delete to confirm	확인하려면 Delete 입력
Type Delete to confirm.	확인하려면 Delete를 입력하세요.
Type Delete to confirm:	확인하려면 Delete를 입력하세요:
The action failed.	작업을 완료하지 못했습니다.
No results found.	검색 결과가 없습니다.
Open Settings Menu	설정 메뉴 열기
Dice Roller	주사위 굴리기
Roll	굴리기
Roll D6	D6 굴리기
Roll D66	D66 굴리기
Roll 2D6	2D6 굴리기
Roll for Skill	스킬 굴리기
1. List	1. 목록
2. Cards	2. 카드
3. Settings	3. 설정
Settings	설정
Language	언어
English	영어
Korean	한국어
Bilingual	한/영
Navigation	탐색
Recent activity	최근 활동
No recent activity	최근 활동 없음
More...	더 보기...
More	더 보기
Change Status	상태 변경
Change quantity (positive or negative)	수량 변경 (양수 또는 음수)
Role	역할
Sort by	정렬 기준
Group	그룹
Base	기본
Location	위치
Move	이동
Left	왼쪽
Right	오른쪽
Support	지원
Assistance	지원
Provide Assistance	프로바이드 어시스턴스
Issued	신청됨
Revealed	공개됨
Report	보고서
Resource name	자원 이름
Resource Type	자원 유형
Resource Amount	자원 수량
Resource changed	자원을 변경했습니다
Reputation Change	명성 변화
Reputation gained	획득 명성
Reputation lost	잃은 명성
Resume Battle	전투 이어가기
Return to Pre-Battle	전투 전 단계로 돌아가기
Return to Pre-Battle to change the crew or players?	크루나 플레이어를 변경하도록 전투 전 단계로 돌아갈까요?
Return to the previous round?	이전 라운드로 돌아갈까요?
Revert Round	이전 라운드로
Rescue Fighter	생포 해제
Restore Fighter	파이터 복구
Resurrect Fighter	파이터 부활
Retire Fighter	파이터 은퇴
Repair	수리
Repair Damage	손상 수리
Repair cost must be a non-negative whole number.	수리 비용을 0 이상의 정수로 입력하세요.
Fit Bionics	바이오닉스 장착
Critically Injured fighter	치명적 부상을 입은 파이터
Heal	치료
Enhance Weapon	인핸스 웨폰
Train	훈련
Lead Ritual	리드 리추얼
Medicate	메디케이트
Terrorise Territory	테러라이즈 테리토리
Side Job	사이드 잡
Ritual Focus	리추얼 포커스
Medical Escort	메디컬 에스코트
Delete this equipment?	이 장비를 삭제할까요?
Replace with Custom Image	사용자 이미지로 교체
Select Acquisition Type	획득 방식 선택
Select an acquisition type.	획득 방식을 선택하세요.
Select Category	분류 선택
Select category	분류 선택
Select a category...	분류 선택...
Select a gang first	먼저 갱을 선택하세요
Custom playing card	사용자 정의 플레잉 카드
Playing card (Ref.)	플레잉 카드 (참고)
Black Joker	블랙 조커
Red Joker	레드 조커
Total :	합계:
Winner:	승리 갱:
Pack	팩
Slot	슬롯
Upgrades	업그레이드
Ref.	참고
Lethality	살상력
Lethality:	살상력:
Houses	하우스
Mounted	마운티드
Manoeuvrable	머누버러블
Sustained	서스테인드
Transport (X)	트랜스포트 (X)
Unreliable	언릴라이어블
Agile	애자일
Master-crafted	마스터 크래프티드
Fearsome	피어섬
Terrifying	테러파잉
Inspiring	인스파이어링
Unborn Gang	언본 갱
You	나
e.g. Subtek or Bully	예: 서브텍 또는 불리
You're not part of any campaigns yet.	아직 참가한 캠페인이 없습니다.
This user	이 사용자
this user	이 사용자
this injury	이 부상
Fighter's total value	파이터의 총가치
Create your own Gang Types, Fighters, Equipment, Skills, Skill sets and Trading Posts and share them to campaigns you're an Arbitrator of. Bundle them into Asset Collections to apply a whole themed set to a campaign at once, or copy another arbitrator's asset collection into your account. Custom Territories and Scenarios are created in the campaign pages.	나만의 갱 유형, 파이터, 장비, 스킬, 스킬 세트와 거래소를 만들어 아비트레이터로 참여하는 캠페인에 공유하세요. 커스텀 묶음으로 묶어 한 번에 적용하거나 다른 아비트레이터의 컬렉션을 복제할 수 있습니다. 사용자 정의 영토와 시나리오는 캠페인 페이지에서 만드세요.
Are you sure you want to delete	다음을 삭제할까요:
Are you sure you want to sell	다음을 판매할까요:
Are you sure you want to buy	다음을 구매할까요:
Are you sure you want to undo	다음을 되돌릴까요:
Do you want to copy the custom asset	복제할 커스텀:
into your own profile?	내 프로필에 복제할까요?
from this gang's tactics?	이 갱의 택틱에서 제거할까요?
to the gang stash?	갱 보관함으로 이동할까요?
This fighter will remain a	현재 파이터 유형 유지:
This fighter will be promoted to	승급할 파이터 유형:
, lose the	, 제거할 하위 유형:
subtype, and gain	, 획득할 하위 유형:
and	및
, and	, 및
. Rating increases by	. 레이팅 증가:
. Rating is unchanged.	. 레이팅은 변하지 않습니다.
. Grants skill:	. 부여 스킬:
is added. Grants skill:	추가됨. 부여 스킬:
if not already known. Rating is unchanged.	아직 없다면 획득합니다. 레이팅은 변하지 않습니다.
Fighter's total cost:	파이터 총비용:
Cost (Available:	비용 (사용 가능:
Grants skill:	부여 스킬:
Controlled by	통제 갱
Held by	보유 갱
Alliances:	얼라이언스:
Territory ↑	영토 ↑
HP	HP
Hnd	Hnd
Acc	명중
Acc S	단거리 명중
Acc L	장거리 명중
Rng	사거리
Rng S	단거리 사거리
Rng L	장거리 사거리
Am	탄약
AP	AP
WS	WS
BS	BS
Str	힘
Sv	세이브
Ld	리더십
Cl	침착성
Wil	의지력
Int	지능
OOA	전투 불능
TP	TP
SR	SR
LR	LR
ID	ID
N23	N23
N26	N26
D3	D3
D6	D6
D66	D66
Patreon Status	패트리온 상태
Discord	디스코드
Patreon	패트리온
GitHub	깃허브
Guide	가이드
Active fighters	활동 중인 파이터
Active Fighters	활동 중인 파이터
Fighters in Recovery	회복 중인 파이터
Add Damage	손상 추가
Add favourite	즐겨찾기 추가
Remove favourite	즐겨찾기 제거
Adjust Cards Height to Content	내용에 맞게 카드 높이 조정
Additional	추가
Available credits	사용 가능 크레딧
Bionic	바이오닉
Cards	카드
Roster	로스터
Gang Card	갱 카드
Gang name	갱 이름
Page view	페이지 보기
Click to open action menu	눌러서 작업 메뉴 열기
Cost Adj.	비용 조정
Crew Weapon	크루 무기
Customise Skill Set Access	스킬 세트 접근 직접 설정
Cycles	사이클
Edit Fighter	파이터 수정
Fighter actions	파이터 작업
Edit campaign image	캠페인 이미지 수정
Enter adjusted cost	조정할 비용 입력
Enter asset collection name	커스텀 묶음 이름 입력
Enter campaign name	캠페인 이름 입력
Enter cost	비용 입력
Enter custom Scenario name	사용자 정의 시나리오 이름 입력
Enter custom Special Rule	사용자 정의 특수 규칙 입력
Enter custom injury name	사용자 정의 부상 이름 입력
Enter custom playing card value	사용자 정의 플레잉 카드 값 입력
Enter equipment name	장비 이름 입력
Enter gang name	갱 이름 입력
Enter scenario name	시나리오 이름 입력
Enter trading post name	거래소 이름 입력
Enter vehicle cost	차량 비용 입력
Enter vehicle name	차량 이름 입력
Flesh Wound	경상
Inactive Fighters (Killed/Retired/Enslaved)	비활동 파이터 (사망/은퇴/노예)
Inactive Fighters Loadouts	비활동 파이터 장비 세트
Include Custom	사용자 정의 포함
Include all	전체 포함
Injured	부상
Last. Injuries	지속 부상
Leave blank for N/A	해당 없으면 비워 두세요
Leave empty for default cost	기본 가격을 쓰려면 비워 두세요
Misc	기타
New name	새 이름
Participation	참가
Ready for the next battle.	다음 전투를 준비하세요.
Resource amount to charge	차감할 자원 수량
Scenarios	시나리오
Select Lasting Damage	지속 손상 선택
Select or enter a Side Job	사이드 잡 선택 또는 입력
Unknown fighter	알 수 없는 파이터
Unknown gang	알 수 없는 갱
View Campaign Logs	캠페인 기록 보기
View Fighter Logs	파이터 기록 보기
Winners	승리 갱
Workspace navigation	작업 공간 탐색
Workspace overview	작업 공간 현황
Wound/Flesh Wound Boxes	운드/경상 체크 칸
Wound/Injured Boxes	운드/부상 체크 칸
XP Boxes	XP 체크 칸
Your gangs, fighters and campaigns. All in one workspace.	갱, 파이터와 캠페인을 한 공간에서 관리하세요.
COMMAND CENTER	지휘 본부
COMMAND DECK	지휘 데크
CAMPAIGNS	캠페인
ARCHIVE	기록 보관소
N/A	해당 없음
R/A	레어/불법
FW	경상
SI	중상
LI	지속 부상
Ld/Ch	리더/챔피언
Fighter's List	파이터 전용 목록
credits	크레딧
credits)	크레딧)
Deduct fighter cost from gang credits (	갱 크레딧에서 파이터 비용 차감 (
Criteria	기준
Most battles fought.	가장 많은 전투 참가.
1st	1위
2nd	2위
3rd	3위
rank	순위
each	각
Sign in to manage online recruitment.	온라인 모집을 관리하려면 로그인하세요.
Link copied.	링크를 복사했습니다.
Copy the recruitment link shown above.	위 모집 링크를 길게 눌러 복사하세요.
Settings saved.	설정을 저장했습니다.
Request approved.	참가 신청을 승인했습니다.
Request rejected.	참가 신청을 거절했습니다.
Please try again.	다시 시도하세요.
Pending approval	승인 대기
Approved	승인됨
Rejected	거절됨
Withdrawn	취소됨
Removed	참가 종료
Not submitted	미신청
Online Participation	온라인 참가
Recruitment link	모집 링크
Recruiting	모집 중
Paused	모집 중지
Copy link	링크 복사
Approve	승인
Reject	거절
Retry	다시 시도
Refresh	새로고침
Open campaign	캠페인 열기
Open account	계정 열기
Request to join	참가 신청
Send join request	참가 신청 보내기
Withdraw request	신청 취소
Apply again	다시 신청
Refresh status	상태 새로고침
Registered gangs	등록된 갱
Player limit	최대 참가 인원
Public recruitment description	공개 모집 안내
Accept online join requests	온라인 참가 신청 받기
Save recruitment settings	모집 설정 저장
Link options	링크 관리
Replace recruitment link	모집 링크 교체
Confirm: replace link	확인: 링크 교체
Loading recruitment settings…	모집 설정을 불러오는 중…
Loading campaign…	캠페인을 불러오는 중…
Campaign link unavailable	캠페인 링크를 열 수 없습니다
Campaign is full	참가 인원이 마감되었습니다
Recruitment is paused	현재 모집이 중지되었습니다
Check your campaign access	캠페인 참여 상태를 확인하세요
Bring your gang to the campaign	내 갱으로 캠페인에 참가하기
Your account records are connecting.	저장된 데이터를 불러오는 중입니다.
Create a compatible gang first	같은 에디션의 갱이 필요합니다
Go to my gangs	내 갱으로 이동
Refresh gangs	갱 목록 새로고침
Your gang	참가할 내 갱
Message to the host (optional)	주최자에게 남길 말 (선택)
CAMPAIGN RECRUITMENT	캠페인 모집
Back to my workspace	내 작업 공간으로 돌아가기
Join requests	참가 신청
No join requests yet. Share the link to recruit players.	아직 참가 신청이 없습니다. 링크를 공유해 참가자를 모집하세요.
Share a recruitment link, review each request, and admit the gangs you approve.	모집 링크를 공유하고 참가 신청을 확인한 뒤 갱을 승인하세요.
Only the campaign name, edition, host, recruitment description and player count are public. Gang details are shown after approval.	캠페인 이름·에디션·주최자·모집 안내·참가 인원만 공개됩니다. 갱 상세 정보는 승인 후 표시됩니다.
Recruitment is paused. Enable it above before sharing the link.	현재 모집이 중지되어 있습니다. 위에서 참가 신청을 활성화하세요.
Replacing the link invalidates the old address. Existing requests remain.	링크를 교체하면 기존 주소는 사용할 수 없습니다. 접수된 신청은 유지됩니다.
The host will review your application. Refresh this page to check its status.	주최자가 신청을 확인합니다. 새로고침하여 승인 상태를 확인하세요.
Your gang has joined the campaign. You can now view the shared campaign.	갱이 캠페인에 등록되었습니다. 공유 캠페인을 열어볼 수 있습니다.
You withdrew this request. You may apply again while recruitment is open.	취소한 신청입니다. 모집 중이라면 다시 신청할 수 있습니다.
Your participation has ended. You may apply again while recruitment is open.	캠페인 참가가 종료되었습니다. 모집 중이라면 다시 신청할 수 있습니다.
This application was not accepted. Contact the host if you need more information.	이번 신청은 승인되지 않았습니다. 자세한 내용은 주최자에게 확인하세요.
Contact the host or check back later.	주최자에게 문의하거나 나중에 다시 확인하세요.
You already own this campaign or have an invitation. Check your account for access.	이미 소유한 캠페인이거나 초대가 있습니다. 계정에서 참여 상태를 확인하세요.
Sign in to choose a gang and send a join request to the host.	로그인한 뒤 내 갱을 선택하고 주최자에게 참가 신청을 보내세요.
You need your own synced gang in this campaign’s edition to apply.	이 캠페인과 같은 에디션으로 만든 본인 갱을 계정에 저장한 뒤 신청하세요.
Your gang name, roster and this message are shared with the host. Approval gives you access to view the campaign. If you change your gang while waiting, withdraw and apply again.	갱 이름·명단·메시지가 주최자에게 공유됩니다. 승인되면 캠페인을 열람할 수 있습니다. 대기 중 갱을 변경했다면 신청을 취소하고 다시 신청하세요.
Underhive Korea	언더하이브 코리아
ChatGPT sign-in is required.	ChatGPT 로그인이 필요합니다.
A JSON request is required.	JSON 요청이 필요합니다.
Invalid JSON format.	JSON 형식이 올바르지 않습니다.
Only PNG, JPEG or WebP images can be uploaded.	PNG, JPEG 또는 WebP 이미지만 업로드할 수 있습니다.
Personal records saved · Retry campaign update	개인 기록 저장됨 · 캠페인 갱신 재시도 필요
Connecting to your account.	계정에 연결하는 중입니다.
Finish syncing your records first.	기록 동기화를 먼저 완료하세요.
The gang and campaign use different editions.	갱과 캠페인의 판본이 다릅니다.
The online roster could not be updated because the gang and campaign use different editions.	갱과 캠페인의 판본이 달라 온라인 명단을 갱신하지 못했습니다.
A backup containing gangs and campaigns is required.	갱과 캠페인이 포함된 백업이 필요합니다.
The shared campaign is too large. Upload images as files.	공유 캠페인 기록이 너무 큽니다. 이미지를 파일로 업로드하세요.
Invalid shared campaign format.	공유 캠페인 형식이 올바르지 않습니다.
Invalid record format.	기록 형식이 올바르지 않습니다.
The records were changed on another device.	다른 기기에서 기록을 수정했습니다.
Resolve the record conflict with the other device first.	다른 기기의 기록 충돌을 먼저 해결하세요.
Another participant changed the campaign.	다른 참가자가 캠페인을 수정했습니다.
The data is too large.	데이터가 너무 큽니다.
You can only share your own synced campaigns.	동기화된 내 캠페인만 공유할 수 있습니다.
You can only recruit for your own synced campaigns.	동기화된 내 캠페인만 모집할 수 있습니다.
The maximum number of records has been exceeded.	등록 가능한 기록 수를 초과했습니다.
Invalid link replacement setting.	링크 재발급 설정이 올바르지 않습니다.
The recruitment settings or gang records changed. Refresh and apply again.	모집 또는 갱 기록이 변경되었습니다. 새로고침 후 다시 신청하세요.
The recruitment settings or campaign records changed. Refresh and try again.	모집 또는 캠페인 기록이 변경되었습니다. 새로고침 후 다시 처리하세요.
Recruitment link not found. Ask for a new link.	모집 링크를 찾을 수 없습니다. 새 링크를 요청하세요.
Choose a recruitment status.	모집 상태를 선택하세요.
The recruitment description must be 2000 characters or fewer.	모집 안내는 2000자 이하로 입력하세요.
Use 2–40 letters, numbers, spaces, underscores, periods or hyphens for your username.	사용자 이름은 2~40자의 문자, 숫자, 공백, _, . 또는 -를 사용하세요.
User not found.	사용자를 찾을 수 없습니다.
The server could not complete your request. Please try again shortly.	서버 요청을 처리하지 못했습니다. 잠시 후 다시 시도하세요.
Connecting to server storage.	서버 저장소를 연결하는 중입니다.
Choose one of your gangs that has been synced to the server.	서버에 동기화된 내 갱을 선택하세요.
Invalid settings format.	설정 형식이 올바르지 않습니다.
The gang changed after applying. The player must withdraw and apply again.	신청 후 갱 기록이 변경되었습니다. 참가자가 신청을 철회하고 다시 신청해야 합니다.
The submitted gang records could not be found.	신청한 갱 기록을 찾을 수 없습니다.
The submitted gang is missing or its edition has changed.	신청한 갱이 없거나 판본이 변경되었습니다.
Invalid notification list.	알림 목록이 올바르지 않습니다.
Invalid role.	역할이 올바르지 않습니다.
Sign in and connect your account before joining online.	온라인 참가를 위해 먼저 로그인하고 계정 연결을 확인하세요.
The online campaign roster could not be updated. Save again.	온라인 캠페인 명단을 갱신하지 못했습니다. 다시 저장하세요.
A valid save revision is required.	올바른 저장 버전이 필요합니다.
Invalid request format.	요청 형식이 올바르지 않습니다.
The requested feature could not be found.	요청한 기능을 찾을 수 없습니다.
No invitation is available to respond to.	응답 가능한 초대를 찾을 수 없습니다.
Invalid response value.	응답 값이 올바르지 않습니다.
You cannot respond to this request.	이 요청에 응답할 수 없습니다.
You cannot access this campaign.	이 캠페인에 접근할 수 없습니다.
You cannot edit this campaign.	이 캠페인을 수정할 수 없습니다.
Invalid email address.	이메일 주소가 올바르지 않습니다.
This gang is already registered.	이미 등록된 갱입니다.
This username is already in use.	이미 사용 중인 사용자 이름입니다.
You already have a join request being processed.	이미 처리 중인 참가 신청이 있습니다.
This join request has already been processed.	이미 처리된 참가 신청입니다.
This user has already been invited or joined.	이미 초대되었거나 참가한 사용자입니다.
This user is already invited or participating.	이미 초대했거나 참가한 사용자입니다.
You are already friends or a request already exists.	이미 친구이거나 요청이 있습니다.
Connecting to image storage.	이미지 저장소를 연결하는 중입니다.
The image file does not match its format.	이미지 파일 형식이 일치하지 않습니다.
An image file is required.	이미지 파일이 필요합니다.
Image not found.	이미지를 찾을 수 없습니다.
Invalid input value.	입력 값이 올바르지 않습니다.
You cannot send a friend request to yourself.	자신에게 친구 요청을 보낼 수 없습니다.
You cannot invite yourself.	자신을 초대할 수 없습니다.
You cannot apply to your own campaign.	자신의 캠페인에는 참가 신청할 수 없습니다.
This setting is not supported.	지원하지 않는 설정입니다.
The join message must be 1000 characters or fewer.	참가 메시지는 1000자 이하로 입력하세요.
Enter a player limit from 1 to 100.	참가 정원은 1~100명으로 입력하세요.
The campaign has reached its player limit.	참가 정원이 가득 찼습니다.
You do not have permission to manage participants.	참가자 관리 권한이 없습니다.
You do not have permission to remove participants.	참가자를 제거할 권한이 없습니다.
No pending join request is available to process.	처리 가능한 참가 신청이 없습니다.
There is no join request to withdraw.	철회할 참가 신청이 없습니다.
Friend request not found.	친구 요청을 찾을 수 없습니다.
The campaign records changed. Please try again.	캠페인 기록이 변경되었습니다. 다시 시도하세요.
The campaign records changed. Refresh and save again.	캠페인 기록이 변경되었습니다. 새로고침 후 다시 저장하세요.
The campaign records changed. Refresh and try again.	캠페인 기록이 변경되었습니다. 새로고침 후 다시 처리하세요.
Only the campaign owner can manage recruitment.	캠페인 소유자만 모집을 관리할 수 있습니다.
Only the campaign owner can invite participants.	캠페인 소유자만 초대할 수 있습니다.
Your campaign join request was rejected.	캠페인 참가 신청이 거절되었습니다.
Your campaign participation was approved.	캠페인 참가가 승인되었습니다.
Requested to join the campaign.	캠페인 참가를 신청했습니다.
Invalid campaign edition.	캠페인 판본이 올바르지 않습니다.
Invited to the campaign.	캠페인에 초대했습니다.
Campaign not found.	캠페인을 찾을 수 없습니다.
The online roster could not be updated because the campaign changed on another device. Save again.	캠페인이 다른 기기에서 변경되어 온라인 명단을 갱신하지 못했습니다. 다시 저장하세요.
This request is not allowed.	허용되지 않은 요청입니다.
Campaign recruitment is currently paused.	현재 참가 모집이 중지되어 있습니다.
The player limit cannot be lower than the current number of participants.	현재 참가자 수보다 정원을 줄일 수 없습니다.
`.trim().split('\n').map(line => line.split('\t'));
  const enToKo = Object.create(null);
  const koToEn = Object.create(null);
  for (const [en, ko] of pairs) {
    if (!en || !ko) throw new Error('Invalid UI translation entry');
    if (enToKo[en] && enToKo[en] !== ko) throw new Error('Conflicting UI translation: ' + en);
    enToKo[en] = ko;
    if (!koToEn[ko]) koToEn[ko] = en;
  }
  // Punctuation variants are generated only from existing interface labels.
  for (const [en, ko] of Object.entries(enToKo)) {
    if (/^[A-Z][A-Za-z &/()-]{1,45}$/.test(en)) {
      if (!enToKo[en + ':']) enToKo[en + ':'] = ko + ':';
      if (!enToKo[en + ' *']) enToKo[en + ' *'] = ko + ' *';
    }
  }
  const koreanPairs = `
언더하이브 코리아	Underhive Korea
언더하이브 코리아 홈	Underhive Korea home
갱 · 캠페인 매니저	Gang & campaign manager
갱과 캠페인의 기록을 한곳에.	Your gangs and campaigns in one place.
네크로문다의 갱, 파이터와 캠페인을 한곳에서 관리하세요.	Manage your Necromunda gangs, fighters and campaigns in one place.
빠른 시작	Quick start
갱 → 파이터 → 캠페인 순으로 등록하세요.	Start with a gang, add fighters, then create a campaign.
갱 / 파이터	Gang / fighter
갱 만들기	Create Gang
새 갱 만들기	Create a New Gang
갱 열기	Open Gang
갱 수정	Edit Gang
갱 유형	Gang Type
갱 이름	Gang Name
갱 하위 유형	Gang Subtype
갱 자원	Gang Resources
갱 메모	Gang Notes
갱 이야기	Gang Backstory
갱 정보	Gang Details
갱 장비 창고	Gang Equipment Stash
갱 창고	Gang Stash
갱 크레딧에서 비용 차감	Deduct cost from gang credits
갱 택틱	Gang Tactics
갱 평점	Gang Rating
갱 평점 순위	Gang Rating Rankings
갱, 파이터, 캠페인, 영토와 전투를 한 파일로 저장합니다.	Save gangs, fighters, campaigns, territories and battles in one file.
갱 자원, 파이터, 무기와 이력을 관리하세요.	Manage gang resources, fighters, weapons and history.
갱 정보를 수정했습니다.	Gang details updated.
갱을 만들었습니다.	Gang created.
갱을 복제했습니다.	Gang copied.
갱이 없습니다	No gangs
나의 갱	My Gangs
삭제된 갱	Deleted gang
소유 갱	Owning Gang
상대 갱	Opponent Gang
상대 갱 미정	Opponent Gang not selected
획득 갱	Claiming Gang
참가 갱	Participating Gangs
참가 갱 A	Participating Gang A
참가 갱 B	Participating Gang B
참가 갱 기준	By Participating Gang
참가 갱이 없습니다.	No participating gangs.
전체	All
관리	Manage
기본 정보 수정	Edit Basic Information
기본 비용 (cr)	Base Cost (cr)
비용 (cr)	Cost (cr)
가치	Value
비용	Cost
수량	Quantity
개수	Count
분류	Category
유형	Type
하위 유형	Subtype
이름	Name
이름 / 유형	Name / Type
이름 검색	Search by name
이름을 검색하면 나머지 항목도 찾을 수 있습니다.	Search by name to find more items.
설명	Description
설명 없음	No description
에디션	Edition
판본	Edition
성향	Alignment
역할	Role
상태	Status
상태 변경	Change Status
활성	Active
진행 중	In progress
준비 중	Preparing
미배정	Unassigned
미정	Not selected
지정되지 않음	Not specified
없음	None
아니요	No
사용 가능	Available
미사용	Unused
정보를 저장했습니다.	Information saved.
등록했습니다.	Added.
수정	Edit
저장	Save
취소	Cancel
삭제	Delete
제거	Remove
복제	Copy
구매	Buy
수리	Repair
조정	Adjust
열기	Open
닫기	Close
만들기	Create
완료	Complete
종료	End
추가 관리	Additional Management
추가 수치·조건	Additional Values & Conditions
항목 만들기	Create Item
항목 삭제	Delete Item
직접 입력	Enter Manually
사용자 정의	Custom
사용자 정의 항목	Custom Items
사용자 정의 항목을 추가해 명단과 장비 목록에 활용하세요.	Create custom items to use in rosters and equipment lists.
최근 활동	Recent Activity
기록	Records
활동 기록	Activity Logs
기록 없음	No records
기록이 없습니다.	No records.
노트	Notes
메모	Notes
메모 없음	No notes
개인 메모	Private Notes
이야기	Story
배경 이야기	Backstory
스토리	Story
능력치	Characteristics
능력치 수정	Edit Characteristics
능력치 변화	Characteristic Changes
변경 능력치	Changed Characteristic
능력치 영향	Characteristic Effects
경험치	XP
경험치와 발전	XP & Advancements
XP 소모	XP Cost
직접 지정 XP (선택)	Custom XP (optional)
발전 없음	No advancements
발전 이름	Advancement Name
계급 / 유형	Rank / Type
유형 / 계급	Type / Rank
평점	Rating
총 평점	Total Rating
최고 평점	Highest Rating
평점 구성	Rating Breakdown
평점 비용 증가 (cr)	Rating Cost Increase (cr)
명성	Reputation
명성 변화	Reputation Change
크레딧	Credits
거래 포인트	Trade Points
크레딧이 부족합니다.	Not enough credits.
이번 사이클 수입 (cr)	This Cycle's Income (cr)
이번 사이클 지출 (cr)	This Cycle's Expenses (cr)
파이터	Fighter
파이터 추가	Add Fighter
파이터 복제	Copy Fighter
파이터 삭제	Delete Fighter
파이터 상태	Fighter Status
파이터 유형	Fighter Type
파이터 분류	Fighter Category
사용자 파이터 유형	Custom Fighter Type
파이터 배경 이야기	Fighter Backstory
파이터 + 장비 + 차량	Fighters + Equipment + Vehicles
파이터와 장비의 비용 합계입니다.	The combined cost of fighters and equipment.
파이터에게 지급	Give to Fighter
처치 수	Kills
모두 활동 복귀	Return All to Active
회복	Recovery
회복 중 파이터	Fighters in Recovery
포로	Captured Fighters
포로가 없습니다.	No captured fighters.
부상 없음	No injuries
부상 이름	Injury Name
부상 메모	Injury Notes
지속 부상	Lasting Injuries
지속 손상	Lasting Damage
손상 이름	Damage Name
효과 / 부상	Effects / Injuries
효과·부상	Effects & Injuries
효과 메모	Effect Notes
효과 메모 없음	No effect notes
효과 삭제	Delete Effect
스킬	Skill
스킬·세트	Skills & Skill Sets
스킬 / 특성	Skills / Traits
스킬 삭제	Delete Skill
출처 / 세트	Source / Set
특수 규칙	Special Rules
규칙 메모	Rule Notes
규칙 보기	View Rules
기본 규칙	Core Rules
장비	Equipment
장비 등록	Add Equipment
장비 선택	Select Equipment
장비 유형	Equipment Type
장비 이름	Equipment Name
장비 없음	No equipment
파이터 장비가 없습니다.	No fighter equipment.
장비 장비 세트	Equipment Loadouts
장비 세트 이름	Loadout Name
무기 특성	Weapon Traits
소모품	Consumable
보관 위치	Storage Location
창고	Stash
창고로	Move to Stash
창고 장비는 갱 평점에 포함됩니다.	Stash equipment is included in gang rating.
사용자 장비	Custom Equipment
사용자 장비 관리	Manage Custom Equipment
커스텀	Custom Assets
사용자 거래소가 없습니다.	No custom trading posts.
커스텀에 장비가 없습니다. 먼저 장비를 만들어 주세요.	No equipment in Custom Assets. Create some equipment first.
나만의 장비, 파이터 유형, 스킬과 거래소를 구성하세요.	Create your own equipment, fighter types, skills and trading posts.
컬렉션	Collection
거래소	Trading Post
허용 거래소	Authorised Trading Posts
전술 카드	Tactics Cards
전술 카드 추가	Add Tactics Card
전술 카드가 없습니다	No tactics cards
카드 이름	Card Name
카드 이름과 효과를 직접 기록하세요.	Enter the card name and effects.
하우스 룰	House Rules
주사위	Dice
굴리기	Roll
굴리기를 누르세요.	Press Roll.
전투	Battle
진행 중인 전투	Battle Session
새 진행 중인 전투	New Battle Session
진행 중인 전투 수정	Edit Battle Session
진행 중인 전투 삭제	Delete Battle Session
진행 중인 전투이 없습니다	No battle sessions
이 진행 중인 전투을 삭제할까요?	Delete this battle session?
세션 열기	Open Session
전투 / 시나리오	Battle / Scenario
시나리오 / 전투 이름	Scenario / Battle Name
전투 기록	Battle Records
기록된 전투	Recorded Battles
완료된 전투 기록	Completed Battle Records
전투 결과	Battle Results
전투 메모	Battle Notes
전투 보고	Battle Report
전투 완료	Complete Battle
전투를 시작하세요	Start a battle
상대 갱, 배치, 목표와 크루를 정하고 전투를 진행하세요.	Select the opponent, deployment, objective and crew, then play the battle.
배치	Deployment
목표	Objective
배치·목표·크루	Deployment, Objective & Crew
시나리오	Scenario
이름 없는 시나리오	Unnamed Scenario
결과 / 점수	Result / Score
승자	Winner
승리	Victories
승리 갱	Winning Gang
승리 순위	Victory Rankings
날짜	Date
횟수	Count
차량	Vehicle
차량 등록	Add Vehicle
차량 수정	Edit Vehicle
차량 삭제	Delete Vehicle
차량 이름	Vehicle Name
차량 메모	Vehicle Notes
차량 비용	Vehicle Cost
차량 장비	Vehicle Equipment
차량 손상	Vehicle Damage
차량이 없습니다	No vehicles
차량과 조종자, 장비, 손상을 기록하세요.	Record vehicles, crew, equipment and damage.
조종자	Operator
크루	Crew
캠페인	Campaign
새 캠페인 만들기	Create a New Campaign
캠페인 수정	Edit Campaign
캠페인 보기	View Campaign
캠페인 열기	Open Campaign
캠페인 이름	Campaign Name
캠페인 유형	Campaign Type
캠페인 정보	Campaign Details
캠페인 팩	Campaign Pack
캠페인 스토리	Campaign Story
캠페인 메모	Campaign Notes
캠페인 공용	Shared Campaign
참가 캠페인	Campaigns Joined
참가 캠페인이 없습니다	No campaigns joined
캠페인 페이지에서 이 갱을 등록하세요.	Add this gang from the campaign page.
참가 갱과 플레이어	Participating Gangs & Players
플레이어	Player
플레이어 지정	Link Player
참가자	Participants
자원	Resources
자원 이름	Resource Name
자원 삭제	Delete Resource
캠페인 자원	Campaign Resources
캠페인 자원 추가	Add Campaign Resource
캠페인 자원 수정	Edit Campaign Resource
등록된 캠페인 자원이 없습니다.	No campaign resources have been added.
사이클	Cycle
사이클 메모	Cycle Notes
사이클 종료	End Cycle
사이드 잡	Side Job
성과	Triumphs
성과 / Triumphs	Triumphs
성과 이름	Triumph Name
성과 기록	Triumph Records
성과 기록이 없습니다	No triumph records
캠페인 성과	Campaign Triumphs
캠페인 성과와 수상 갱을 기록하세요.	Record campaign triumphs and the gangs that earned them.
획득 이유	Reason Earned
영토	Territory
영토 이름	Territory Name
영토 추가	Add Territory
영토 수정	Edit Territory
영토 관리	Manage Territories
등록된 영토	Added Territories
지도	Map
캠페인 지도	Campaign Map
지도 X 위치 (0–100)	Map X Position (0–100)
지도 Y 위치 (0–100)	Map Y Position (0–100)
영토를 눌러 지도 위치를 조정하세요. 지도는 캠페인별로 저장됩니다.	Select a territory to adjust its map position. Each campaign has its own map.
영토를 추가하면 지도에 표시됩니다.	Added territories appear on the map.
인쇄	Print
팝업을 허용하면 인쇄할 수 있습니다.	Allow pop-ups to print.
JSON 가져오기	Import JSON
JSON 내보내기	Export JSON
XML 내보내기	Export XML
이 앱에서 내보낸 백업 파일로 현재 데이터를 교체합니다.	Replace the current data with a backup exported from this app.
앱을 처음 연 상태로 되돌립니다.	Reset the app to its initial state.
예시 데이터	Sample Data
데이터는 이 브라우저에 저장됩니다.	Data is saved in this browser.
이 앱의 모든 데이터는 현재 브라우저에 저장됩니다.	All app data is currently saved in this browser.
계정 저장	Account Storage
데이터 관리	Data Management
계정 서버 저장과 파일 백업을 관리합니다.	Manage account storage and file backups.
지금 동기화	Sync now
계정 열기	Open Account
서버 연결 재시도	Retry server connection
서버 연결을 확인하세요.	Check the server connection.
서버에 저장하지 못했습니다.	Could not save to the server.
요청을 처리하지 못했습니다.	Could not complete the request.
서버 연결 전 기록은 이 기기에 보존됩니다.	Records stay on this device until the server connects.
같은 ChatGPT 계정으로 접속하면 갱과 캠페인 기록을 이어서 사용할 수 있습니다.	Sign in with the same ChatGPT account to access your gangs and campaigns.
연결 중	Connecting
동기화됨	Synced
저장 대기	Waiting to save
저장 중	Saving
이미지 및 기록 저장 중	Saving images and records
충돌 확인 필요	Resolve a sync conflict
기기 저장됨 · 서버 재시도 필요	Saved on device · retry server sync
기기 저장됨 · 서버 연결 안 됨	Saved on device · server disconnected
저장 공간 부족 · 이미지가 이 화면에 보존됨	Storage full · images remain on this page
로그인 필요	Sign in required
다른 기기의 변경 사항이 있습니다.	There are changes from another device.
이 기기 기록은 브라우저에 보존되어 있습니다. 사용할 기록을 선택하세요.	This device's records are preserved in the browser. Choose which version to use.
서버 기록 사용	Use server records
이 기기 기록으로 저장	Save this device's records
현재 기록 백업	Back up current records
다시 시도	Retry
이미지는 5MB 이하만 업로드할 수 있습니다.	Images must be 5MB or smaller.
이미지 데이터가 올바르지 않습니다. 원본 파일을 다시 선택하세요.	The image data is invalid. Select the original file again.
계정을 불러오는 중입니다.	Loading your account.
소유자	Owner
편집자	Editor
열람자	Viewer
초대 대기	Invitation pending
공유한 캠페인이 없습니다.	No shared campaigns.
초대한 참가자가 없습니다.	No invited participants.
공유 · 초대	Share & Invite
캠페인 초대	Campaign Invitation
친구	Friend
초대 보내기	Send Invitation
기록 동기화를 먼저 완료하세요.	Finish syncing your records first.
계정 연결을 확인하세요.	Check your account connection.
먼저 캠페인을 만드세요.	Create a campaign first.
초대할 친구를 먼저 계정에서 추가하세요.	Add a friend in your account before sending an invitation.
캠페인이 없습니다.	Campaign not found.
요청 확인	Review Request
확인	Confirm
캠페인 참가자	Campaign Participants
캠페인 공유	Share Campaign
캠페인 변경 사항을 참가자에게 게시하거나 서버의 최신 기록을 불러오세요.	Publish campaign changes to participants or load the latest records from the server.
변경 사항 게시	Publish Changes
서버 최신 기록 불러오기	Load Latest Server Records
친구 초대	Invite Friend
계정 보안 설정 열기	Open Account Security Settings
이 앱은 ChatGPT 로그인 계정을 사용합니다. 비밀번호는 OpenAI 계정 설정에서 관리하세요.	This app uses ChatGPT sign-in. Manage your password in your OpenAI account settings.
이 연락 이메일은 앱 프로필에 저장됩니다. ChatGPT 로그인 이메일은 로그인 제공자의 계정 설정에서 관리됩니다.	This contact email is saved in your app profile. Manage your ChatGPT sign-in email in your login provider's account settings.
앱 안 알림은 계정에서 확인할 수 있습니다. 아래 이메일 수신 설정은 저장되며 이메일 발송은 아직 연결되지 않았습니다.	View in-app notifications in your account. Email preferences are saved; email delivery is not connected yet.
이 에디션의 갱을 만들어 시작하세요.	Create a gang for this edition to get started.
테마 전환	Switch Theme
저장 위치	Storage Location
수정 / 소유권	Edit / Ownership
추가	Add
상세	Details
보관함	Stash
대시보드	Dashboard
내 갱	My Gangs
규칙	Rules
설정	Settings
도움말	Help
언어	Language
한글	Korean
영어	English
한/영	Korean / English
아직 확인된 규칙 설명이 없습니다.	No rule description is available yet.
이 판본·분류에 확인된 규칙이 없습니다.	No rules are available for this edition and category.
이 판본의 규칙을 찾을 수 없습니다.	No rules were found for this edition.
이 앱은 독립 제작한 팬 도구입니다. Munda Manager와 별도로 갱과 캠페인을 저장하는 팬 도구입니다.	This is an independently made fan tool with its own accounts and storage.
데이터는 브라우저와 계정 저장소에 저장됩니다.	Data is saved in your browser and account storage.
Munda Manager와 별도로 계정 데이터를 저장합니다.	This app uses its own account storage.
브라우저 저장 공간도 부족합니다. 이 화면을 닫기 전에 백업하거나 다시 업로드하세요.	Browser storage is also full. Back up or upload again before closing this page.
이 앱은 독립 제작한 팬 도구입니다.	This is an independently made fan tool.
서버에 동기화했습니다.	Synced to the server.
불러오는 중	Loading
저장되었습니다.	Saved.
업로드 중	Uploading
검색 결과가 없습니다.	No results found.
이름을 입력하세요.	Enter a name.
언더하이브	Underhive
JSON 백업	JSON Backup
백업 다운로드	Download Backup
백업 가져오기	Import Backup
예시로 초기화	Reset to Sample Data
이 앱은 독립 제작한 팬 도구입니다. Munda Manager와 별도로 계정 데이터를 저장합니다.	This independently made fan tool uses its own account storage.
개요	Overview
갱 명단	Gang Roster
갱 명단부터 캠페인 기록까지, 한곳에서 관리하세요.	Manage gang rosters and campaign records in one place.
갱 상세	Gang Details
갱과 플레이어	Gangs & Players
갱의 이야기를 기록하세요.	Record your gang's story.
결과 메모	Result Notes
규칙 닫기	Close Rules
규칙 참고	Rules Reference
규칙 참고 열기	Open Rules Reference
ⓘ 규칙 보기	ⓘ View Rules
▤ 규칙 참고	▤ Rules Reference
기록을 백업하고 다른 브라우저로 옮기세요.	Back up your records and move them to another browser.
다음 전투를 준비하세요	Prepare for the next battle
데이터는 현재 브라우저에만 저장됩니다.	Data is currently saved only in this browser.
먼저 갱을 만드세요.	Create a gang first.
먼저 파이터를 추가하세요.	Add a fighter first.
메뉴	Menu
메모 내용	Note Content
모든 캠페인	All Campaigns
모든 현재 데이터를 예시 데이터로 바꿀까요?	Replace all current data with sample data?
받을 파이터	Receiving Fighter
백업을 가져왔습니다.	Backup imported.
백업을 읽을 수 없습니다:	Could not read the backup:
보유 크레딧	Available Credits
사본	Copy
새 값	New Value
새 갱을 만들어 명단을 관리해 보세요.	Create a gang and start managing your roster.
새 캠페인을 만들어 보세요.	Create a new campaign.
세력	Faction
수치 변화	Value Changes
아직 갱이 없습니다	No gangs yet
언더하이브의 모든 기록을 한눈에 확인하세요.	See all your Underhive records at a glance.
영토가 없습니다	No territories
예비 무기나 장비를 등록하세요.	Add spare weapons and equipment.
예시 갱 · 자유롭게 수정하거나 삭제하세요.	Sample gang · edit or delete it freely.
예시 갱이 만들어졌습니다.	Sample gang created.
예시 캠페인	Sample Campaign
운영 중인 갱	Active Gangs
원본 Munda Manager의 Patreon 연동은 별도 서비스에서 관리됩니다.	Patreon membership for the original Munda Manager is managed by that service.
Munda Manager와 별도로 갱과 캠페인을 저장하는 팬 도구입니다.	This app uses its own accounts, data and sync.
이 영토를 삭제할까요?	Delete this territory?
이 전투 기록을 삭제할까요?	Delete this battle record?
이름 또는 유형 검색	Search by name or type
이름 또는 한국어 이름	Name or Korean name
작업 공간 메뉴	Workspace Menu
작업 공간 현황	Workspace Overview
작전 현황	Operations Overview
장비 지급	Give Equipment
장비 창고	Equipment Stash
장비 창고가 비었습니다	Equipment stash is empty
전투 기록이 없습니다	No battle records
전투 삭제	Delete Battle
중립 / 없음	Neutral / None
참가자 제거	Remove Participant
참가자 추가	Add Participant
참가자가 없습니다	No participants
첫 갱을 만들어 시작하세요.	Create your first gang to get started.
첫 전투를 기록하세요.	Record your first battle.
캠페인 상세	Campaign Details
캠페인 영토를 등록하세요.	Add territories to your campaign.
캠페인에서 이 참가자를 제거할까요?	Remove this participant from the campaign?
캠페인을 만들고 갱을 등록하세요.	Create a campaign and add your gangs.
캠페인이 없습니다	No campaigns
커스텀 에셋	Custom Assets
크레딧 상당	Credit Equivalent
탐사 포인트	Exploration Points
파이터 + 장비	Fighters + Equipment
파이터 수정	Edit Fighter
파이터가 없습니다	No fighters
파이터를 추가해 명단을 구성하세요.	Add fighters to build your roster.
플레이어 이름	Player Name
플레이어, 갱, 영토와 전투를 기록하세요.	Record players, gangs, territories and battles.
플레이어와 갱을 캠페인에 추가하세요.	Add players and gangs to the campaign.
형식 오류	Format Error
활동 메모	Activity Notes
활동 중인 파이터	Active Fighters
가능한 상태	Allowed States
가능한 행동	Available Actions
가용성	Availability
갱당 전투별 사용 횟수	Uses per Gang per Battle
거리	Range
거리(인치)	Range (inches)
내기로 걸기 가능	Can Be Staked
능력치 변경	Characteristic Overrides
능력치 향상	Characteristic Improvements
대상 모델	Eligible Models
대상 상태	Eligible States
득점	Scoring
라운드별 사용 횟수	Uses per Round
명단에서 제거	Remove from Roster
목표 승점	Target Victory Points
방어	Save
부상 주사위	Injury Dice
비용(cr)	Cost (cr)
사용 시점	Timing
사용자 설명	Custom Description
상실 가능	Can Be Lost
생포	Captured
선택지	Options
성공 시	On Success
성공 시 추가 XP	Additional XP on Success
성공에 필요한 값	Required Success Value
소유자 부담	Paid by Owner
수입	Income
수입 대신 선택	Income Replacement
수입 포기	Income Forgone
수입(cr)	Income (cr)
승리 조건	Victory Condition
승점	Victory Points
실패 시	On Failure
요양	Convalescence
이동(인치)	Movement (inches)
적과의 최소 거리(인치)	Minimum Enemy Distance (inches)
전투별 사용 횟수	Uses per Battle
제외 상태	Excluded States
제한	Restrictions
조건	Requirements
준비	Setup
증원	Reinforcements
지속	Duration
체크	Check
최소 비용(cr)	Minimum Cost (cr)
추가 공격	Additional Attacks
추가 크레딧	Additional Credits
추가 행동	Additional Actions
치명성	Lethality
템플릿 회피 이동(인치)	Template Evasion Move (inches)
파괴	Destroyed
판정	Test
할인(cr)	Discount (cr)
행동	Action
혜택	Benefits
회복 운드	Wounds Restored
회피에 필요한 D6	D6 Dodge Threshold
Save 향상	Save Improvement
Initiative 변화	Initiative Modifier
D66 최댓값	D66 Maximum
D66 최솟값	D66 Minimum
＋ 새 캠페인	＋ New Campaign
＋ 캠페인 만들기	＋ Create Campaign
← 규칙 목록	← Rules List
＋ 새 갱	＋ New Gang
＋ 새 진행 중인 전투	＋ New Battle Session
＋ 파이터	＋ Fighter
＋ 경험치	＋ XP
＋ 장비 세트	＋ Loadout
＋ 발전	＋ Advancement
＋ 부상	＋ Injury
＋ 스킬	＋ Skill
＋ 손상	＋ Damage
＋ 자원 추가	＋ Add Resource
＋ 장비	＋ Equipment
＋ 차량 등록	＋ Add Vehicle
＋ 카드 추가	＋ Add Card
＋ 효과/부상	＋ Effect / Injury
＋ 성과 기록	＋ Record Triumph
`.trim().split('\n').map(line => line.split('\t'));
  for (const [ko, en] of koreanPairs) {
    if (!ko || !en) throw new Error('Invalid reverse UI translation entry');
    koToEn[ko] = en;
  }
  const patterns = [
    { en: 'Account Created: {0}', ko: '계정 생성일: {0}' },
    { en: 'Last Sign In: {0}', ko: '마지막 로그인: {0}' },
    { en: 'Total XP: {0}', ko: '총 XP: {0}' },
    { en: 'Total: {0}', ko: '합계: {0}' },
    { en: 'Cost: {0}', ko: '비용: {0}' },
    { en: 'Cost (Available: {0})', ko: '비용 (사용 가능: {0})' },
    { en: 'Not enough credits. Gang Credits: {0}', ko: '크레딧이 부족합니다. 갱 크레딧: {0}' },
    { en: 'Not enough credits. Required: {0}', ko: '크레딧이 부족합니다. 필요 크레딧: {0}' },
    { en: 'Not enough credits to add this {0}', ko: '이 {0}을 추가할 크레딧이 부족합니다' },
    { en: 'Deduct fighter cost from gang credits ({0} credits)', ko: '갱 크레딧에서 파이터 비용 차감 ({0} 크레딧)' },
    { en: 'Are you sure you want to remove {0} from your friends?', ko: '{0} 님을 친구에서 제거할까요?' },
    { en: 'Are you sure you want to delete {0}?', ko: '{0}을 삭제할까요?' },
    { en: 'Are you sure you want to sell {0}?', ko: '{0}을 판매할까요?' },
    { en: 'Are you sure you want to buy {0}?', ko: '{0}을 구매할까요?' },
    { en: 'Are you sure you want to undo {0}?', ko: '{0}을 되돌릴까요?' },
    { en: 'Change the role of {0}', ko: '{0}의 역할 변경' },
    { en: 'Select a weapon for the {0}', ko: '{0}에 사용할 무기 선택' },
    { en: 'Please select the target for {0}', ko: '{0}의 대상을 선택하세요' },
    { en: '{0}/400 characters', ko: '{0}/400자' },
    { en: '{0}/{1} characters', ko: '{0}/{1}자' },
    { en: '{0} selected', ko: '{0}개 선택됨' },
    { en: '{0} items', ko: '{0}개' },
    { en: 'View rules for {0}', ko: '{0} 규칙 보기' },
    { en: '(+{0} XP each)', ko: '(각 +{0} XP)' },
    { en: 'Grants skill: {0}', ko: '부여 스킬: {0}' },
    { en: 'This fighter will be promoted to {0}', ko: '이 파이터는 {0}(으)로 승급합니다' },
    { en: 'This fighter will remain a {0}', ko: '이 파이터는 {0}(으)로 유지됩니다' },
    { en: 'Tactics roll {0}', ko: '택틱 굴림 {0}' },
    { en: 'Edit: {0}', ko: '수정: {0}' },
    { en: 'Held by {0}', ko: '보유한 갱: {0}' },
    { en: 'Controlled by {0}', ko: '점령한 갱: {0}' },
    { en: 'Unable to save. {0}', ko: '저장하지 못했습니다. {0}' },
    { en: 'Select up to {0}', ko: '최대 {0} 선택' },
    { en: 'Buy equipment from Custom Assets. Current credits: {0}', ko: '커스텀에서 장비를 구매합니다. 현재 크레딧: {0}' },
    { en: 'None of your campaigns are {0} campaigns.', ko: '{0} 캠페인이 없습니다.' },
    { en: 'Return {0} credits back to the gang stash', ko: '갱 보관함에 {0}크레딧 돌려받기' },
    { en: "Fighter's total cost: {0}", ko: '파이터 총비용: {0}' },
    { en: 'Not enough gang credits to repair these damages. Repair cost: {0}, Available credits: {1}', ko: '이 손상을 수리할 갱 크레딧이 부족합니다. 수리 비용: {0}, 사용 가능 크레딧: {1}' },
    { en: 'Remove {0} from this gang\'s tactics?', ko: '{0}을 이 갱의 택틱에서 제거할까요?' },
    { en: 'Remove {0} from this campaign?', ko: '{0}을 이 캠페인에서 제외할까요?' },
    { en: 'Are you sure you want to sell "{0}" to the Guilders?', ko: '"{0}"을 길더에게 판매할까요?' },
    { en: 'Are you sure you want to release "{0}" from the Guilders?', ko: '"{0}"을 길더에게서 해방할까요?' },
    { en: 'Are you sure you want to kill "{0}"?', ko: '"{0}"을 사망 처리할까요?' },
    { en: 'Are you sure you want to retire "{0}"?', ko: '"{0}"을 은퇴시킬까요?' },
    { en: 'Are you sure you want to unretire "{0}"?', ko: '"{0}"을 복귀시킬까요?' },
    { en: 'Are you sure you want to capture "{0}"?', ko: '"{0}"을 생포 상태로 변경할까요?' },
    { en: 'Are you sure you want to starve "{0}"?', ko: '"{0}"을 기아 상태로 변경할까요?' },
    { en: 'Are you sure you want to feed "{0}"?', ko: '"{0}"에게 식량을 지급할까요?' },
    { en: 'Are you sure you want to send into Recovery "{0}"?', ko: '"{0}"을 회복 중으로 변경할까요?' },
    { en: '{0} requested to join the {1} campaign.', ko: '{0}님이 {1} 캠페인 참가를 신청했습니다.' },
    { en: 'Your request to join the {0} campaign was rejected.', ko: '{0} 캠페인 참가 신청이 거절되었습니다.' },
    { en: 'Your participation in the {0} campaign was approved.', ko: '{0} 캠페인 참가가 승인되었습니다.' },
    { en: '{0} sent you a friend request.', ko: '{0}님이 친구 요청을 보냈습니다.' },
    { en: '{0} accepted your friend request.', ko: '{0}님이 친구 요청을 수락했습니다.' },
    { en: '{0} invited you to the {1} campaign.', ko: '{0}님이 {1} 캠페인에 초대했습니다.' }
  ];
  window.UK_UI_STRINGS = Object.freeze({ enToKo: Object.freeze(enToKo), koToEn: Object.freeze(koToEn), patterns: Object.freeze(patterns) });
})();
