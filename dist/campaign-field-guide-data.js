/* Concise campaign help. Verified rules are resolved separately; examples stay folded. */
globalThis.MMCampaignFieldGuideData = {
  "members": {
    "title": [
      "Campaign overview",
      "캠페인 개요"
    ],
    "what": [
      "Register participating gangs before assigning territories or arranging battles.",
      "영토 배정과 전투 진행 전에 참가 갱을 등록하세요."
    ],
    "refs": [
      "official-003-core-campaign-setup",
      "official-003-core-campaign-challenges"
    ],
    "example": null,
    "mode": "mixed"
  },
  "territories": {
    "title": [
      "Territory management",
      "영토 관리"
    ],
    "what": [
      "Record territory ownership here; collect income at the Post-cycle step.",
      "영토별 통제 갱을 지정하고, 수입은 사이클 종료 후 정산합니다."
    ],
    "refs": [
      "official-003-core-campaign-setup",
      "official-003-core-campaign-territory-boons",
      "official-003-core-campaign-battle-territory-result"
    ],
    "example": [
      "Changing a map polygon does not transfer a territory. Confirm the battle outcome, then record the correct controlling gang here.",
      "지도 도형을 바꾼다고 소유권이 이전되지는 않습니다. 전투 결과를 확인한 뒤 여기서 통제 갱을 기록합니다."
    ],
    "mode": "mixed"
  },
  "battles": {
    "title": [
      "Battles: play and report",
      "전투: 진행과 결과 보고"
    ],
    "what": [
      "Use a session to play a battle and a report to record its confirmed result. A challenge is an invitation.",
      "전투는 세션에서 진행하고, 확정한 결과는 보고서로 남깁니다. 도전은 전투 제안입니다."
    ],
    "refs": [
      "n26-core-prebattle-sequence",
      "n26-core-post-battle-sequence"
    ],
    "example": [
      "An Issued Challenge has no played result yet. Do not treat its empty winner field as a draw.",
      "발행된 도전에는 아직 플레이 결과가 없습니다. 승리 갱이 비어 있다는 이유로 무승부로 읽지 마세요."
    ],
    "mode": "mixed"
  },
  "pack": {
    "title": [
      "Custom pack · Writing guide",
      "커스텀 팩 · 작성 가이드"
    ],
    "what": [
      "Keep schedules, roster conditions and agreed rulings together.",
      "일정·명단 작성 조건·판정 합의를 정리하세요."
    ],
    "refs": [],
    "example": null,
    "mode": "app",
    "sections": [
      {
        "title": [
          "What belongs in the pack?",
          "무엇을 적어 두나요?"
        ],
        "app": [
          "Include the edition and source books, participants, cycle dates, starting conditions and agreed rulings. Label house rules separately.",
          "판본·자료·참가자·사이클 일정·시작 조건·판정 합의를 적습니다. 하우스 룰은 구분해서 표시하세요."
        ],
        "example": null
      },
      {
        "title": [
          "How do I write and share it?",
          "어떻게 작성하고 확인하나요?"
        ],
        "app": [
          "Select Edit, write and Save. Supports formatting, lists, links and images; maximum 3,500 text characters. Editing requires campaign edit access.",
          "수정 → 작성 → 저장 순서입니다. 글자 꾸미기·목록·링크·이미지를 지원하며, 본문은 최대 3,500자입니다. 캠페인 수정 권한이 필요합니다."
        ],
        "example": [
          "Record the date and effective cycle when an agreed ruling changes.",
          "판정 합의가 바뀌면 변경 날짜와 적용할 사이클을 남기세요."
        ]
      },
      {
        "title": [
          "A short example to copy in your own words",
          "직접 바꾸어 쓸 작성 예시"
        ],
        "app": [
          "Overview: use the group’s agreed edition and source books. Schedule: list each cycle’s opening and deadline. Challenges: agree opponents and stakes using the campaign rules. Rulings: ask the organiser when players disagree and record the decision here. Changes: record date, change and when it takes effect.",
          "소개: 모임에서 합의한 판본·룰북을 사용합니다. 일정: 각 사이클의 시작·마감일을 적습니다. 도전: 캠페인 룰에 따라 상대와 내기 영토를 정합니다. 판정: 의견이 다르면 운영자와 확인하고 합의 내용을 여기에 남깁니다. 변경 이력: 날짜·변경점·적용 시점을 기록합니다."
        ],
        "example": null
      }
    ]
  },
  "map": {
    "title": [
      "Campaign map",
      "캠페인 지도"
    ],
    "what": [
      "Link territories to regions, then select Save Map.",
      "영역에 영토를 연결한 뒤 지도를 저장하세요."
    ],
    "refs": [],
    "example": null,
    "mode": "app"
  },
  "triumphs": {
    "title": [
      "Triumphs",
      "트라이엄프"
    ],
    "what": [
      "Compare each award criterion at campaign end. Break ties by Wealth; if still tied, award jointly.",
      "종료 시 성과별 기준을 비교합니다. 동률은 자산으로 비교하고, 자산도 같으면 공동 수상합니다."
    ],
    "refs": [
      "official-003-core-campaign-wrap-up"
    ],
    "example": [
      "For the supplied N26 campaign, compare territories, enemy OOA, Wealth, battles fought and Reputation. A tie is broken by Wealth; if still tied, share the award.",
      "현재 N26 캠페인은 영토·적 OOA·자산·전투 횟수·명성을 각각 비교합니다. 동률은 자산으로 비교하고 자산도 같으면 공동 수상합니다."
    ],
    "mode": "mixed"
  },
  "arbitrator": {
    "title": [
      "Arbitrator",
      "아비트레이터"
    ],
    "what": [
      "Sets the start, end and downtime schedule and resolves campaign rulings.",
      "시작·종료·다운타임 일정을 정하고 캠페인 판정을 조율합니다."
    ],
    "refs": [
      "official-003-core-campaign-setup"
    ],
    "example": null,
    "mode": "mixed"
  },
  "type": {
    "title": [
      "Campaign type",
      "캠페인 유형"
    ],
    "what": [
      "Determines the territory, phase and Triumph rules to use.",
      "적용할 영토·단계·트라이엄프 규칙을 정합니다."
    ],
    "refs": [
      [
        "campaignTypes",
        "official-003-campaign-necromunda-campaign"
      ],
      "official-003-core-campaign-setup"
    ],
    "example": [
      "The supplied N26 campaign normally uses Occupation 3 cycles → Downtime 1 → Takeover 3. The organiser sets the actual schedule.",
      "현재 N26 캠페인의 일반 구성은 오큐페이션 3사이클 → 다운타임 1 → 테이크오버 3입니다. 실제 일정은 아비트레이터가 정합니다."
    ],
    "mode": "mixed"
  },
  "phase": {
    "title": [
      "Campaign status",
      "캠페인 상태"
    ],
    "what": [
      "Active or completed is the app status. Occupation and Takeover follow the campaign schedule.",
      "활동·완료는 앱의 진행 상태입니다. 오큐페이션·테이크오버 단계는 캠페인 일정을 따릅니다."
    ],
    "refs": [],
    "example": [
      "“Active” is not itself “Occupation” or “Takeover”. The rules for those phases depend on the campaign schedule, not that single status label.",
      "‘활동’이라는 표시는 오큐페이션·테이크오버 중 어느 단계인지를 뜻하지 않습니다. 단계별 규칙은 운영 일정에 맞춰 확인합니다."
    ],
    "mode": "app"
  },
  "trading": {
    "title": [
      "Trading Post",
      "거래소"
    ],
    "what": [
      "Equipment purchases must also meet the model’s access restrictions.",
      "장비를 구매할 때는 모델별 장비 접근 조건도 충족해야 합니다."
    ],
    "refs": [
      "n26-core-post-cycle-sequence",
      "official-003-corerules-trading-post-scope"
    ],
    "example": null,
    "mode": "mixed"
  },
  "players": {
    "title": [
      "Players",
      "플레이어 수"
    ],
    "what": [
      "Counts distinct recorded player names, not gangs. One player may register several gangs.",
      "등록된 플레이어 이름을 중복 없이 셉니다. 한 사람이 여러 갱을 등록하면 갱 수와 다를 수 있습니다."
    ],
    "refs": [],
    "example": null,
    "mode": "app"
  },
  "gangs": {
    "title": [
      "Participating gangs",
      "참가 갱"
    ],
    "what": [
      "Register a gang before choosing it for a battle or territory. Edit its roster from gang management.",
      "전투·영토에 지정할 갱을 먼저 등록하세요. 로스터는 갱 관리에서 수정합니다."
    ],
    "refs": [
      "official-003-core-campaign-setup"
    ],
    "example": null,
    "mode": "mixed"
  },
  "gang-type": {
    "title": [
      "Gang type",
      "갱 유형"
    ],
    "what": [
      "The gang’s faction determines recruitment, equipment and faction rules.",
      "모집·장비·팩션 규칙을 결정하는 갱의 팩션입니다."
    ],
    "refs": [],
    "example": null,
    "mode": "app"
  },
  "rating": {
    "title": [
      "Gang Rating",
      "갱 레이팅"
    ],
    "what": [
      "Model and equipment credit value; excludes cash and unassigned Stash equipment.",
      "모델과 장비의 크레딧 가치입니다. 현금과 보관함의 미지급 장비는 제외합니다."
    ],
    "refs": [
      "n26-core-gang-finances",
      "official-003-core-campaign-challenges"
    ],
    "example": [
      "A gang with Rating 900 and 100 credits has 900 Rating; its cash does not make that Rating 1,000. Wealth also includes eligible stash value.",
      "레이팅 900에 현금 100이 있어도 레이팅은 900입니다. 현금을 합친 값은 자산 계산에 들어가며 보관함 장비 가치도 따로 포함됩니다."
    ],
    "mode": "mixed"
  },
  "wealth": {
    "title": [
      "Wealth",
      "자산"
    ],
    "what": [
      "Gang Rating + credits + Stash equipment value. Used for campaign asset comparisons and tie-breaks.",
      "갱 레이팅 + 크레딧 + 보관함 장비 가치입니다. 자산 비교와 동률 처리에 사용합니다."
    ],
    "refs": [
      "n26-core-gang-finances",
      "official-003-core-campaign-wrap-up"
    ],
    "example": [
      "Rating 900 + 100 credits + stash equipment worth 50 = Wealth 1,050. Do not mistake all 1,050 for spendable credits.",
      "레이팅 900 + 크레딧 100 + 보관함 장비 50이면 자산은 1,050입니다. 1,050 전부를 구매에 쓸 수 있는 현금으로 읽지 마세요."
    ],
    "mode": "mixed"
  },
  "reputation": {
    "title": [
      "Reputation",
      "명성"
    ],
    "what": [
      "Apply mission and territory changes. In N26, apply gains before losses; minimum 1.",
      "미션·영토의 명성 변화를 반영합니다. N26에서는 획득을 먼저 적용하며 최솟값은 1입니다."
    ],
    "refs": [
      "n26-core-reputation",
      "n26-core-gang-finances"
    ],
    "example": [
      "When gains and losses happen in the same processing, apply gains first. The supplied N26 minimum is 1.",
      "같은 처리에서 획득과 손실이 함께 발생하면 획득부터 적용합니다. 현재 N26의 명성 하한은 1입니다."
    ],
    "mode": "mixed"
  },
  "ownership": {
    "title": [
      "Territory control",
      "영토 통제 갱"
    ],
    "what": [
      "Assign the controlling gang after resolving the staked territory outcome.",
      "내기 영토의 결과를 처리한 뒤 통제 갱을 지정합니다."
    ],
    "refs": [
      "official-003-core-campaign-battle-territory-result",
      "official-003-core-campaign-territory-boons"
    ],
    "example": [
      "In an Occupation draw over an unclaimed stake, return it to the pool. In a Takeover draw, the previous owner keeps it.",
      "오큐페이션에서 미점유 영토를 걸고 비기면 미점유 풀로 돌아갑니다. 테이크오버에서 비기면 기존 소유자가 유지합니다."
    ],
    "mode": "mixed"
  },
  "income": {
    "title": [
      "Territory income",
      "영토 수입"
    ],
    "what": [
      "Collect at Post-cycle after checking each territory’s conditions. Work Territory is a separate action.",
      "영토별 조건을 확인한 뒤 사이클 종료 후 수입을 정산합니다. 워크 테리토리는 별도 행동입니다."
    ],
    "refs": [
      "official-003-core-campaign-territory-boons",
      "n26-core-post-cycle-sequence",
      "n26-core-work-territory"
    ],
    "example": [
      "Two eligible flat incomes of 25 and 20 would total 45 at the relevant collection step. Work Territory is a separate action with its own 15-credit rule and model limit.",
      "조건을 충족한 고정 수입이 25와 20이면 해당 수입 정산 때 합계 45입니다. 워크 테리토리는 별도의 행동으로 15크레딧 규칙과 인원 제한을 따릅니다."
    ],
    "mode": "mixed"
  },
  "reference": {
    "title": [
      "Reference card",
      "참고 카드"
    ],
    "what": [
      "Optional card reference. Leave blank if unused.",
      "선택 사항인 참고 카드 표기입니다. 사용하지 않으면 비워 두세요."
    ],
    "refs": [],
    "example": null,
    "mode": "app"
  },
  "groups": {
    "title": [
      "Group territories",
      "영토 그룹 표시"
    ],
    "what": [
      "Groups matching territory names in the display; ownership and income remain separate.",
      "같은 이름의 영토를 묶어 표시합니다. 소유권·수입은 영토별로 유지됩니다."
    ],
    "refs": [
      "official-003-core-territory-selection-table"
    ],
    "example": null,
    "mode": "app"
  },
  "sessions": {
    "title": [
      "Battle session",
      "진행 중인 전투"
    ],
    "what": [
      "Prepare the mission and crew, play rounds, then confirm post-battle results.",
      "미션·크루 준비 → 라운드 진행 → 전투 후 결과 확정 순서로 진행합니다."
    ],
    "refs": [
      "n26-core-prebattle-sequence",
      "n26-core-post-battle-sequence"
    ],
    "example": null,
    "mode": "mixed"
  },
  "reports": {
    "title": [
      "Battle report",
      "전투 결과 보고"
    ],
    "what": [
      "Record confirmed results once. A pending challenge has no battle outcome yet.",
      "확정한 전투 결과를 한 번만 기록하세요. 대기 중인 도전에는 아직 전투 결과가 없습니다."
    ],
    "refs": [
      "n26-core-post-battle-sequence",
      "official-003-core-campaign-battle-territory-result"
    ],
    "example": null,
    "mode": "mixed"
  },
  "challenges": {
    "title": [
      "Challenge Round",
      "도전 라운드"
    ],
    "what": [
      "Create the cycle’s challenge order. Check existing entries before generating it again.",
      "사이클의 도전 순서를 만듭니다. 다시 생성하기 전에 기존 기록을 확인하세요."
    ],
    "refs": [
      "official-003-core-campaign-challenges"
    ],
    "example": [
      "In the first cycle, order is random. In later cycles, Rating 900 goes before 1,200; tied Ratings use a roll-off. The created records still need opponents and mission details.",
      "첫 사이클 순서는 무작위입니다. 이후에는 레이팅 900이 1,200보다 먼저이며 동률은 롤오프합니다. 앱에서 만든 예고에는 상대와 미션을 이어서 입력해야 합니다."
    ],
    "mode": "mixed"
  },
  "cycle": {
    "title": [
      "Cycle versus round",
      "사이클과 라운드"
    ],
    "what": [
      "A cycle groups campaign activity; a round belongs to a single battle.",
      "사이클은 캠페인의 진행 단위이며, 라운드는 개별 전투의 진행 단위입니다."
    ],
    "refs": [
      "official-003-core-campaign-challenges",
      "n26-core-post-cycle-sequence"
    ],
    "example": null,
    "mode": "mixed"
  },
  "filters": {
    "title": [
      "Battle filters",
      "전투 목록 필터"
    ],
    "what": [
      "Clear the filters to show all records.",
      "필터를 지우면 전체 기록을 봅니다."
    ],
    "refs": [],
    "example": null,
    "mode": "app"
  },
  "captives": {
    "title": [
      "Captured fighters",
      "생포된 파이터"
    ],
    "what": [
      "Choose the capturing gang, opponent and fighter from the opponent’s roster.",
      "상대 로스터에서 생포한 갱·상대 갱·파이터를 선택합니다."
    ],
    "refs": [
      "n26-core-wrap-up"
    ],
    "example": [
      "Use the actual capture result’s escape or ransom procedure before changing status. Removing a Captured label is not itself that procedure.",
      "상태를 바꾸기 전에 실제 생포 결과의 탈출·몸값 절차를 확인합니다. 생포 표시를 지우는 것만으로 그 절차를 수행한 것은 아닙니다."
    ],
    "mode": "mixed"
  },
  "resources": {
    "title": [
      "Custom campaign resources",
      "사용자 정의 자원"
    ],
    "what": [
      "Define how each additional resource is earned and spent in the campaign pack.",
      "추가 자원의 획득·소비 기준은 캠페인 팩에 정하세요."
    ],
    "refs": [],
    "example": null,
    "mode": "app"
  },
  "allegiance": {
    "title": [
      "Allegiance",
      "소속 진영"
    ],
    "what": [
      "Assign the sides used by your campaign.",
      "캠페인에서 사용하는 진영을 지정합니다."
    ],
    "refs": [],
    "example": null,
    "mode": "app"
  },
  "sharing": {
    "title": [
      "Sharing and online participation",
      "공유·온라인 참가"
    ],
    "what": [
      "Manage viewing and editing access, and review online join requests.",
      "열람·수정 권한을 정하고 온라인 참가 신청을 검토합니다."
    ],
    "refs": [],
    "example": null,
    "mode": "app"
  },
  "battle-workflow": {
    "title": [
      "Campaign battle play guide",
      "캠페인 전투 진행 가이드"
    ],
    "what": null,
    "refs": [
      "official-003-core-campaign-challenges",
      "n26-core-prebattle-sequence",
      "n26-core-post-battle-sequence",
      "official-003-core-campaign-battle-territory-result",
      "n26-core-post-cycle-sequence"
    ],
    "example": null,
    "mode": "mixed",
    "sections": [
      {
        "title": [
          "Which button should I use?",
          "먼저 어떤 버튼을 누르나요?"
        ],
        "app": [
          "New under Battle Sessions: prepare and track a game you are about to play. Add under Battles: enter a result from a game already played. Challenge Round: create pending invitations for all registered gangs in a cycle. These are different app records, not three mandatory battles.",
          "진행 중인 전투의 ‘새로 만들기’는 지금 할 게임의 준비와 진행용입니다. 아래 전투의 ‘추가’는 이미 끝난 게임의 결과를 입력할 때 씁니다. ‘도전 라운드’는 등록된 갱마다 해당 사이클의 도전 예고를 만드는 운영 기능입니다. 세 버튼을 모두 눌러 같은 전투를 세 번 등록하는 절차가 아닙니다."
        ],
        "example": [
          "Playing today: make one session. Played yesterday on paper: use Add. Opening cycle 2 for the group: use Challenge Round after checking existing invitations.",
          "오늘 함께 게임한다면 세션 하나를 만듭니다. 어제 종이로 진행한 게임은 ‘추가’로 보고합니다. 참가자 전체의 2사이클 도전을 시작한다면 기존 예고를 확인한 뒤 ‘도전 라운드’를 사용합니다."
        ]
      },
      {
        "title": [
          "1. Issue a challenge and agree the stake",
          "1. 도전 순서·상대·내기 영토 정하기"
        ],
        "rule": [
          "Each player issues one challenge per cycle. The first cycle uses random order; later cycles go from lower Gang Rating to higher, with roll-offs for ties. The challenger is the attacker.",
          "각 플레이어는 사이클마다 도전 1회를 발행합니다. 첫 사이클은 무작위 순서, 이후에는 갱 레이팅이 낮은 순이며 동률은 롤오프합니다. 캠페인에서는 도전자가 공격자입니다."
        ],
        "app": [
          "Challenge Round creates one pending record per registered gang; it does not pair opponents, sort the rules order or play a battle automatically. Fill in the opponent, cycle and stake, then agree acceptance. Repeating the button creates more invitations.",
          "‘도전 라운드’는 등록 갱마다 대기 기록 하나를 만듭니다. 상대 자동 매칭·룰에 따른 순서 배정·실제 플레이까지 수행하지 않습니다. 상대·사이클·내기 영토를 정하고 수락 여부를 확인하세요. 같은 버튼을 다시 누르면 예고가 추가로 생깁니다."
        ],
        "example": [
          "Ratings 900, 1,200 and 1,500 in cycle 2: 900 issues first. An Occupation stake is unclaimed territory while any remains; otherwise stake an opponent territory. In Takeover, stake an opponent territory.",
          "2사이클에 레이팅이 900·1,200·1,500이면 900부터 도전합니다. 오큐페이션에서는 미점유 영토가 남아 있으면 그것을 걸고, 없으면 상대 영토를 겁니다. 테이크오버에서는 상대 영토를 겁니다."
        ]
      },
      {
        "title": [
          "2. Accept, decline and read Issued correctly",
          "2. 도전 수락·거절과 ‘발행됨’의 의미"
        ],
        "rule": [
          "Normally declining gives the challenger the stake. Exceptions allow refusal without losing territory after you have already issued a challenge, or for the second and later challenges received in the same cycle. Extra challenges are possible once outstanding games are resolved and time remains.",
          "일반적으로 도전을 거절하면 도전자가 걸린 영토를 얻습니다. 다만 자신이 이미 도전한 뒤 받은 도전, 같은 사이클에 받은 두 번째 이후 도전은 영토를 잃지 않고 거절할 수 있습니다. 미해결 전투를 모두 마쳤고 시간이 남으면 추가 도전을 할 수 있습니다."
        ],
        "app": [
          "Issued and Not played mean the proposed battle has no recorded played result. An empty winner is not a draw. Editing or deleting a proposal does not itself resolve the rules consequences of a refusal.",
          "‘발행됨’과 ‘플레이 전’은 아직 플레이 결과를 기록하지 않은 제안이라는 뜻입니다. 승리 갱이 비어 있다고 무승부가 아닙니다. 예고를 수정하거나 삭제하는 행위 자체가 거절에 따른 룰상 영토 처리를 대신하지는 않습니다."
        ],
        "example": [
          "The Challenge in the screenshot still needs an opponent/mission and an agreed outcome. If the game ends in a draw, explicitly record Draw after playing.",
          "사진처럼 Challenge가 ‘발행됨’이고 승리 갱이 ‘플레이 전’이면 아직 제안 상태입니다. 상대·미션과 처리 결과를 정해야 합니다. 실제 플레이 후 비겼다면 결과에 ‘무승부’를 명시합니다."
        ]
      },
      {
        "title": [
          "3. Prepare a battle session together",
          "3. 세션을 만들고 전투 준비하기"
        ],
        "rule": [
          "With both players present: determine scenario, set up battlefield, select crews, announce battlefield effects, choose tactics and deploy. Campaign attacker assignment does not replace a separate deployment-zone roll-off required by the selected deployment.",
          "두 플레이어가 함께 시나리오 결정 → 전장 설치 → 크루 선택 → 전장 효과 공지 → 택틱 선택 → 배치를 처리합니다. 캠페인의 공격자 결정과 배치 구역을 정하는 별도 롤오프는 구분하세요."
        ],
        "app": [
          "In New Battle choose participating gangs and Deployment, Objective and Crew. Open each rule or diagram before selecting eligible models and equipment sets. Mark both participants Ready when preparation is actually complete, then Start Battle.",
          "세션의 ‘새로 만들기’에서 참가 갱과 배치·목표·크루를 정합니다. 각 항목의 룰·도식을 읽은 뒤 참가 가능한 모델과 장비 세트를 고르세요. 실제 준비를 마친 후 양쪽을 ‘준비 완료’로 표시하고 전투를 시작합니다. 도전 예고를 만들었다고 세션이 자동 생성되는 것은 아닙니다."
        ],
        "example": [
          "A crew rule requiring chosen models plus random models must be resolved before deployment. Ready is an app confirmation, not a rule that grants extra fighters or makes an illegal crew legal.",
          "직접 선택 인원과 무작위 인원을 더하는 크루라면 배치 전에 그 명단을 먼저 정합니다. ‘준비 완료’는 앱의 확인 표시이며, 인원을 추가로 주거나 잘못 고른 크루를 합법으로 만드는 규칙이 아닙니다."
        ]
      },
      {
        "title": [
          "4. Play rounds, then resolve post-battle",
          "4. 라운드 진행과 전투 후 처리"
        ],
        "rule": [
          "After the battle, together resolve Wrap-up, Reassign Territory, Rewards, Clean-up and Report Results. Post-cycle actions, income and roster updates are a separate cycle procedure.",
          "전투가 끝나면 양 플레이어가 함께 마무리 → 영토 재배정 → 보상 → 정리 → 결과 보고 순으로 처리합니다. 사이클 종료 후 행동·수입 정산·명단 갱신은 별도의 사이클 절차입니다."
        ],
        "app": [
          "Use the live session for the round and model records. End Battle moves to the post-battle worksheet; it does not mean every injury, reward or territory ruling has already been resolved. Check recorded changes before both players confirm and Complete Battle.",
          "플레이 중에는 세션의 라운드와 모델 기록을 사용합니다. ‘전투 종료’로 전투 후 화면에 들어가도 모든 부상·보상·영토 판정이 끝난 것은 아닙니다. 입력한 증감과 실제 판정을 확인한 뒤 양쪽이 준비 완료를 표시하고 결과를 확정하세요."
        ],
        "example": [
          "Finishing a game in cycle 2 at round 5 does not make it cycle 5. Complete the game’s results now; collect cycle income at the appropriate Post-cycle step.",
          "2사이클의 전투가 5라운드에 끝나도 캠페인이 5사이클이 되는 것은 아닙니다. 그 전투의 결과를 먼저 정리하고 사이클 수입은 사이클 종료 후의 해당 단계에서 처리합니다."
        ]
      },
      {
        "title": [
          "5. Confirm the report and territory outcome",
          "5. 보고서·영토 결과 확인하기"
        ],
        "rule": [
          "A winner claims or retains the staked territory. In Occupation a drawn unclaimed stake returns to the unclaimed pool; in Takeover a draw leaves the existing owner in control.",
          "승자는 내기로 걸린 영토를 차지하거나 지킵니다. 오큐페이션에서 미점유 영토를 걸고 비기면 미점유 풀로 돌아갑니다. 테이크오버에서 비기면 기존 소유자가 유지합니다."
        ],
        "app": [
          "A completed session files its report. Invitations and sessions are not linked automatically; do not also save its invitation as a second played result. Check the Battles list before using Add for that same game. Add is suitable for a separate, already-played game; it is not a second completion button for the same session. Adding a report alone does not calculate and award XP or credits. Filters only change which records you see.",
          "세션을 완료하면 결과 보고가 등록됩니다. 도전 예고와 세션은 자동 연결되지 않습니다. 세션으로 이미 보고한 게임의 도전 예고를 다시 플레이 결과로 저장하면 중복 기록이 될 수 있습니다. 같은 게임을 ‘추가’로 다시 입력하기 전에 아래 전투 목록을 확인하세요. ‘추가’는 따로 진행한 이미 끝난 전투를 입력할 때 쓰며 같은 세션을 두 번 완료하는 버튼이 아닙니다. ‘추가’로 보고서를 입력하는 것만으로 XP·크레딧이 자동 계산되어 지급되지는 않습니다. 목록 필터는 표시할 기록만 바꿉니다."
        ],
        "example": [
          "After A wins against B, check the actual stake and winning claimant before confirming. The territory is not every territory on the map, and a drawn game needs its campaign-phase rule.",
          "A가 B에게 이겼다면 확정 전에 실제 걸린 영토와 획득할 승리 갱을 확인합니다. 지도 전체의 영토를 가져오는 것이 아니며, 무승부라면 캠페인 단계에 맞는 처리 규칙을 적용합니다."
        ]
      }
    ]
  }
};
