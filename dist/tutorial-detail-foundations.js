/* Detailed bilingual learning workshops. Content only: no live record operations. */
(function(){
'use strict';
const catalog=globalThis.UK_TUTORIALS;if(!Array.isArray(catalog))throw Error('Tutorial catalog must load before its details.');
const content={
  "details": [
    {
      "lessonId": "workspace-basics",
      "stepId": "orientation",
      "objective": {
        "ko": "갱·캠페인·계정이 각각 어떤 기록을 관리하는지 구분합니다.",
        "en": "Distinguish the records managed by gangs, campaigns and accounts."
      },
      "preparation": [
        {
          "ko": "연습 중인 갱이 아니라 학습 화면을 열어 두세요.",
          "en": "Keep the learning screen open rather than editing a live gang."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "기록의 주인 정하기",
            "en": "Identify the owner"
          },
          "body": {
            "ko": "내 갱의 파이터와 장비는 갱 화면에 속합니다. 같은 캠페인의 다른 사람 갱을 내 갱처럼 편집하지 않습니다.",
            "en": "Your gang screen holds its fighters and equipment. Another participant’s gang is not your own editable roster."
          },
          "result": {
            "ko": "내가 관리할 원본 갱을 구분합니다.",
            "en": "You identify the original gang you own."
          }
        },
        {
          "title": {
            "ko": "캠페인의 역할 보기",
            "en": "Identify the campaign"
          },
          "body": {
            "ko": "캠페인은 참가 갱·영토·전투를 묶습니다. 파이터 장비를 바꾸는 일과 캠페인 참가 승인을 구분합니다.",
            "en": "A campaign brings together gangs, territories and battles. Changing equipment and approving a participant are different operations."
          },
          "result": {
            "ko": "변경할 기록에 맞는 메뉴를 고릅니다.",
            "en": "You choose the menu that owns the intended record."
          }
        },
        {
          "title": {
            "ko": "계정 연결 확인하기",
            "en": "Check the account"
          },
          "body": {
            "ko": "계정 화면에서 로그인 아이디와 저장 상태를 확인합니다. 이 수업의 선택지는 실제 명단 편집이나 신청을 실행하지 않습니다.",
            "en": "Check the login ID and save status in Account. The choices in this lesson do not edit rosters or submit applications."
          },
          "result": {
            "ko": "학습 연습과 실제 편집을 구분합니다.",
            "en": "You separate a tutorial exercise from a real edit."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "파이터의 오토건을 바꾸고 다음 주 전투도 기록하려고 합니다.",
          "en": "You want to change a fighter’s Autogun and record next week’s battle."
        },
        "steps": [
          {
            "ko": "먼저 내가 소유한 갱에서 해당 파이터를 찾습니다.",
            "en": "First locate the fighter in the gang you own."
          },
          {
            "ko": "장비 변경은 파이터 화면에서 하고 전투는 캠페인에서 기록합니다.",
            "en": "Make the equipment change on the fighter screen and record the battle in the campaign."
          },
          {
            "ko": "계정에서 저장이 끝났는지 확인합니다.",
            "en": "Verify that account saving has completed."
          }
        ],
        "result": {
          "ko": "갱의 명단 변경과 캠페인의 전투 기록이 서로 섞이지 않습니다.",
          "en": "Roster changes and campaign battle records remain distinct."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "다른 참가자의 명단이 보여서 직접 수정하려 합니다.",
            "en": "You try to edit a visible roster owned by another participant."
          },
          "fix": {
            "ko": "읽기 전용 표시를 확인하고 원본 갱의 소유자에게 변경을 요청하세요.",
            "en": "Check the read-only indicator and ask the source gang’s owner to make the change."
          }
        }
      ],
      "selfCheck": {
        "ko": "파이터 장비는 어디에서, 참가 승인은 어디에서 관리하나요?",
        "en": "Where do you manage fighter equipment, and where do you approve participants?"
      }
    },
    {
      "lessonId": "workspace-basics",
      "stepId": "edition",
      "objective": {
        "ko": "기록의 판본을 확인한 뒤 같은 판본의 설명과 카탈로그를 사용합니다.",
        "en": "Confirm the record’s edition before choosing rules and catalog items."
      },
      "preparation": [
        {
          "ko": "함께 플레이할 상대와 N23 또는 N26을 먼저 합의합니다.",
          "en": "Agree with the other player on N23 or N26 first."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "기록의 판본 읽기",
            "en": "Read the record’s edition"
          },
          "body": {
            "ko": "갱이나 캠페인을 열고 판본 표시를 봅니다. 이름에 N23이라고 적은 것만으로 설정이 바뀌지는 않습니다.",
            "en": "Open the gang or campaign and inspect its edition label. Putting N23 in a name does not change its edition setting."
          },
          "result": {
            "ko": "표시된 설정을 기준으로 판단합니다.",
            "en": "You use the configured edition as the source of truth."
          }
        },
        {
          "title": {
            "ko": "학습 판본 맞추기",
            "en": "Match the learning edition"
          },
          "body": {
            "ko": "학습 화면의 규칙 판본을 같은 값으로 선택합니다. 판본을 바꾸면 다른 판본의 수업 목록으로 이동합니다.",
            "en": "Choose the same value in the learning edition selector. Switching the selector changes the eligible lesson list."
          },
          "result": {
            "ko": "내 기록과 학습 자료가 같은 판본입니다.",
            "en": "Your record and learning material use the same edition."
          }
        },
        {
          "title": {
            "ko": "같은 이름도 다시 비교하기",
            "en": "Compare matching names"
          },
          "body": {
            "ko": "무기 이름이 같아도 비용·명중 방식·피해 절차까지 같다고 가정하지 않습니다. 해당 판본의 프로필과 설명을 다시 읽습니다.",
            "en": "A shared weapon name does not guarantee identical cost, hit resolution or damage procedure. Read that edition’s profile and description."
          },
          "result": {
            "ko": "다른 판본의 수치를 옮기지 않습니다.",
            "en": "You avoid carrying values across editions."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "N23 갱으로 플레이하는데 학습 화면에는 N26이 선택돼 있습니다.",
          "en": "You are playing an N23 gang, but the learning selector shows N26."
        },
        "steps": [
          {
            "ko": "갱 설정에서 N23임을 확인합니다.",
            "en": "Verify N23 in the gang settings."
          },
          {
            "ko": "학습 판본을 N23으로 바꿉니다.",
            "en": "Switch the learning edition to N23."
          },
          {
            "ko": "N23 사격 수업에서 엄폐와 명중 보정을 다시 확인합니다.",
            "en": "Use the N23 shooting lesson to check cover and hit modifiers."
          }
        ],
        "result": {
          "ko": "이름이 비슷해도 N26의 엄폐 세이브 절차를 가져오지 않습니다.",
          "en": "Similar names do not justify importing the N26 cover-save procedure."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "다른 판본의 더 유리한 수치만 골라 씁니다.",
            "en": "You select whichever edition offers the most favorable value."
          },
          "fix": {
            "ko": "갱·캠페인·학습 판본을 맞추고 예외는 상대와 명시적으로 합의하세요.",
            "en": "Match the gang, campaign and learning editions; agree explicitly on any exception."
          }
        }
      ],
      "selfCheck": {
        "ko": "지금 보고 있는 기록과 학습 화면의 판본이 같은가요?",
        "en": "Does the learning edition match the record you are using?"
      }
    },
    {
      "lessonId": "workspace-basics",
      "stepId": "language-search",
      "objective": {
        "ko": "한글 음차와 영어 검색을 오가며 정확한 장비 항목을 찾습니다.",
        "en": "Use phonetic Korean and English search to locate the correct equipment entry."
      },
      "preparation": [
        {
          "ko": "찾을 장비의 이름과 갱의 판본을 확인합니다.",
          "en": "Identify the equipment name and the gang’s edition."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "표시 언어 바꾸기",
            "en": "Change the display language"
          },
          "body": {
            "ko": "한 또는 EN을 선택해 설명 언어를 바꿉니다. 직접 쓴 파이터 이름과 메모는 번역되는 메뉴 문구와 구분합니다.",
            "en": "Choose Korean or EN for the interface. Your written fighter names and notes are separate from translated menu labels."
          },
          "result": {
            "ko": "개인 기록을 메뉴 번역으로 오해하지 않습니다.",
            "en": "You distinguish user text from translated interface text."
          }
        },
        {
          "title": {
            "ko": "짧은 이름으로 검색하기",
            "en": "Search a short name"
          },
          "body": {
            "ko": "장비 검색란에 오토건 또는 Autogun처럼 구별되는 이름을 입력합니다. 결과가 없으면 분류와 장비 목록 필터도 확인합니다.",
            "en": "Search for a distinctive name such as Autogun or its Korean phonetic spelling. If there are no results, check category and equipment-list filters."
          },
          "result": {
            "ko": "검색어와 필터의 원인을 나눠 확인합니다.",
            "en": "You check the query and filters separately."
          }
        },
        {
          "title": {
            "ko": "프로필로 최종 확인하기",
            "en": "Verify the profile"
          },
          "body": {
            "ko": "결과 이름뿐 아니라 판본·가격·사거리·특성을 함께 봅니다. 같은 계열의 다른 사격 모드를 별도 무기로 오인하지 않습니다.",
            "en": "Compare edition, price, range and traits as well as the name. Do not mistake another firing mode for an unrelated weapon."
          },
          "result": {
            "ko": "구매 전에 정확한 항목을 식별합니다.",
            "en": "You identify the exact entry before purchase."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "오토건이 검색되지 않는데 분류가 근접 무기로 제한돼 있습니다.",
          "en": "An Autogun search returns no result while the category is restricted to melee weapons."
        },
        "steps": [
          {
            "ko": "검색어를 지우지 않고 현재 분류 필터를 확인합니다.",
            "en": "Inspect the category filter without immediately deleting the query."
          },
          {
            "ko": "모든 분류로 바꾸고 결과를 다시 확인합니다.",
            "en": "Switch to all categories and inspect the results again."
          },
          {
            "ko": "가격과 무기 프로필을 읽어 원하는 항목인지 확인합니다.",
            "en": "Read price and weapon profile to confirm the desired entry."
          }
        ],
        "result": {
          "ko": "필터로 숨겨진 항목과 실제로 없는 항목을 구분할 수 있습니다.",
          "en": "You can distinguish a hidden result from an unavailable entry."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "번역된 이름이 같으니 다른 판본을 선택합니다.",
            "en": "You select another edition because the translated name matches."
          },
          "fix": {
            "ko": "이름 다음에 반드시 판본과 프로필을 확인하세요.",
            "en": "Always verify edition and profile after matching the name."
          }
        }
      ],
      "selfCheck": {
        "ko": "검색 결과가 없을 때 검색어 외에 어떤 두 필터를 확인하나요?",
        "en": "Which two filters should you check besides the query when no result appears?"
      },
      "hint": {
        "ko": "이름이 아니라 기록의 판본 설정을 먼저 비교하세요.",
        "en": "Compare the record’s edition setting before comparing names."
      },
      "optionFeedback": {
        "1": {
          "ko": "맞습니다. 항목의 판본이 갱과 일치해야 규칙과 비용을 함께 맞출 수 있습니다.",
          "en": "Correct: matching the gang’s edition keeps the item’s rules and cost consistent."
        },
        "2": {
          "ko": "동명 장비라도 판본별 항목입니다. N26 항목을 고르면 N23 기록과 섞입니다.",
          "en": "A shared name can identify separate edition entries. Choosing N26 would mix editions."
        },
        "3": {
          "ko": "번역은 표시 방식일 뿐 판본 검사를 대신하지 않습니다.",
          "en": "Translation changes presentation; it does not replace the edition check."
        }
      }
    },
    {
      "lessonId": "workspace-basics",
      "stepId": "storage",
      "objective": {
        "ko": "기기 사본·계정 사본·동기화 충돌의 차이를 설명합니다.",
        "en": "Explain device copies, account copies and synchronization conflicts."
      },
      "preparation": [
        {
          "ko": "새 기기로 이동하기 전에 현재 기기의 계정 화면을 확인합니다.",
          "en": "Open Account on the current device before moving to another device."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "현재 계정 확인하기",
            "en": "Verify the account"
          },
          "body": {
            "ko": "로그인 아이디를 보고 의도한 계정인지 확인합니다. 표시 이름을 바꿔도 로그인 아이디가 바뀌는 것은 아닙니다.",
            "en": "Inspect the login ID to confirm the intended account. Changing a display name does not change the login ID."
          },
          "result": {
            "ko": "다른 계정의 빈 기록과 저장 실패를 구분합니다.",
            "en": "You distinguish another account’s empty workspace from a save failure."
          }
        },
        {
          "title": {
            "ko": "저장 완료 기다리기",
            "en": "Wait for saving"
          },
          "body": {
            "ko": "저장 중·연결 중이면 작업이 끝날 때까지 기다립니다. 오류 안내가 있으면 계정 연결을 다시 시도하고 중요한 기기 사본을 백업합니다.",
            "en": "Wait while saving or connecting is in progress. If an error appears, retry the account connection and back up important device records."
          },
          "result": {
            "ko": "전송되지 않은 기록을 남겨 두지 않습니다.",
            "en": "You avoid leaving unsent records behind."
          }
        },
        {
          "title": {
            "ko": "충돌 시 내용 비교하기",
            "en": "Compare a conflict"
          },
          "body": {
            "ko": "서로 다른 기기에서 같은 기록을 수정했다면 기기와 서버 중 보관할 내용을 확인합니다. 단순히 마지막에 연 창이 원하는 기록이라고 가정하지 않습니다.",
            "en": "After editing on two devices, compare the device and server versions before choosing. The most recently opened window is not necessarily the desired copy."
          },
          "result": {
            "ko": "원하는 변경이 든 사본을 선택합니다.",
            "en": "You choose the copy containing the desired edits."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "휴대전화에는 크레딧 200, PC에는 150으로 보입니다.",
          "en": "Your phone shows 200 credits while the PC shows 150."
        },
        "steps": [
          {
            "ko": "두 기기의 로그인 아이디가 같은지 확인합니다.",
            "en": "Check that both devices use the same login ID."
          },
          {
            "ko": "각각 어떤 구매·보상 기록을 반영했는지 비교합니다.",
            "en": "Compare which purchases and rewards each copy contains."
          },
          {
            "ko": "원하는 내용을 보존한 뒤 저장 상태를 확인하고 다른 기기를 다시 연결합니다.",
            "en": "Preserve the desired changes, verify saving and reconnect the other device."
          }
        ],
        "result": {
          "ko": "큰 숫자를 자동으로 최신으로 취급하지 않고 변경 이력으로 판단합니다.",
          "en": "You judge by the recorded changes rather than assuming the larger number is newer."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "충돌 안내를 닫고 양쪽에서 계속 편집합니다.",
            "en": "You dismiss a conflict and continue editing both copies."
          },
          "fix": {
            "ko": "편집을 잠시 멈추고 백업한 뒤 보관할 사본을 정하세요.",
            "en": "Pause edits, make a backup and choose the copy to retain."
          }
        }
      ],
      "selfCheck": {
        "ko": "다른 기기로 옮기기 전 어떤 계정 정보와 저장 상태를 확인하나요?",
        "en": "Which account information and save status do you check before moving devices?"
      }
    },
    {
      "lessonId": "workspace-basics",
      "stepId": "backup",
      "objective": {
        "ko": "내보내기와 가져오기를 구분하고 교체 전에 복구 가능한 사본을 확보합니다.",
        "en": "Separate export from import and preserve a recoverable copy before replacement."
      },
      "preparation": [
        {
          "ko": "현재 기록이 필요한 계정인지 먼저 확인합니다.",
          "en": "First confirm that the current records belong to the intended account."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "현재 사본 내보내기",
            "en": "Export the current copy"
          },
          "body": {
            "ko": "백업 내보내기를 선택해 JSON 파일을 받습니다. 파일을 열어 수정할 필요 없이 다운로드 위치와 날짜를 확인합니다.",
            "en": "Use Export backup to download a JSON file. You need not edit it; verify the download location and date."
          },
          "result": {
            "ko": "현재 상태를 파일로 보존합니다.",
            "en": "You preserve the current state in a file."
          }
        },
        {
          "title": {
            "ko": "가져올 내용 검토하기",
            "en": "Review the incoming copy"
          },
          "body": {
            "ko": "가져오기에서 파일을 선택한 뒤 검토 창의 갱·파이터·캠페인 수를 확인합니다. 병합이라고 생각하지 말고 적용 범위를 읽습니다.",
            "en": "Select the file for import and inspect gang, fighter and campaign counts in the review dialog. Read the scope instead of assuming it merges records."
          },
          "result": {
            "ko": "교체될 내용을 확인합니다.",
            "en": "You identify what will be replaced."
          }
        },
        {
          "title": {
            "ko": "적용 후 다시 확인하기",
            "en": "Verify after applying"
          },
          "body": {
            "ko": "확인한 파일만 적용하고 대표 갱의 이름과 크레딧을 비교합니다. 필요하면 가져오기 전 기록 복구 기능을 사용하고 계정 동기화를 확인합니다.",
            "en": "Apply only the reviewed file, compare a representative gang’s name and credits, and use Restore before import if needed. Verify account synchronization."
          },
          "result": {
            "ko": "파일 적용과 온라인 저장을 함께 점검합니다.",
            "en": "You verify both file replacement and online saving."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "작년 백업을 열어 보고 싶지만 오늘 기록도 남겨야 합니다.",
          "en": "You want to inspect last year’s backup without losing today’s records."
        },
        "steps": [
          {
            "ko": "오늘 기록을 먼저 별도 파일로 내보냅니다.",
            "en": "Export today’s records to a separate file first."
          },
          {
            "ko": "옛 백업의 검토 창을 읽고 원치 않으면 취소합니다.",
            "en": "Read the old file’s import review and cancel if it is not the intended copy."
          },
          {
            "ko": "적용했다면 대표 기록을 확인하고 필요 시 적용 전 사본을 복구합니다.",
            "en": "If applied, inspect representative records and restore the pre-import copy if needed."
          }
        ],
        "result": {
          "ko": "오늘의 사본을 보존한 상태에서 가져오기를 판단합니다.",
          "en": "You evaluate the import while preserving today’s copy."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "파일 선택 즉시 안전하게 병합된다고 생각합니다.",
            "en": "You assume selecting a file safely merges everything."
          },
          "fix": {
            "ko": "검토와 확인 단계를 읽고 기존 기록을 먼저 내보내세요.",
            "en": "Read the review and confirmation, and export existing records first."
          }
        }
      ],
      "selfCheck": {
        "ko": "가져오기 전에 현재 사본이 실제 파일로 다운로드됐나요?",
        "en": "Has the current copy actually downloaded before you import another file?"
      }
    },
    {
      "lessonId": "workspace-basics",
      "stepId": "checkpoint",
      "objective": {
        "ko": "새 기기로 옮길 때 사본 보존·계정 확인·내용 검증 순서를 세웁니다.",
        "en": "Plan a device transfer around preserving a copy, checking the account and verifying its contents."
      },
      "preparation": [
        {
          "ko": "이 문제는 가상 순서 연습이며 실제 파일이나 계정을 변경하지 않습니다.",
          "en": "This is a hypothetical sequence exercise; it changes no files or accounts."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "복구 근거 만들기",
            "en": "Preserve a recovery point"
          },
          "body": {
            "ko": "현재 브라우저에서 중요한 갱이 보이면 먼저 백업합니다. 계정 연결이 불확실한 상태에서 브라우저 데이터를 지우지 않습니다.",
            "en": "If an important gang is visible in this browser, back it up first. Do not erase browser data while account connection is uncertain."
          },
          "result": {
            "ko": "기기 사본을 잃어도 비교할 파일이 있습니다.",
            "en": "A file remains available if the device copy is lost."
          }
        },
        {
          "title": {
            "ko": "계정과 저장 대조하기",
            "en": "Check account and saving"
          },
          "body": {
            "ko": "아이디로 로그인하고 저장 완료를 확인합니다. 원래 ChatGPT 계정의 기록이라면 그 계정에서 아이디 로그인 설정을 해야 같은 기록을 유지합니다.",
            "en": "Sign in with the intended ID and verify saving. For records owned by an existing ChatGPT account, set up ID login from that account to retain the same records."
          },
          "result": {
            "ko": "새 계정을 기존 계정과 혼동하지 않습니다.",
            "en": "You avoid confusing a new account with the existing one."
          }
        },
        {
          "title": {
            "ko": "새 기기에서 확인하기",
            "en": "Verify the new device"
          },
          "body": {
            "ko": "새 기기에서 같은 아이디로 로그인하고 갱 이름·파이터 수·크레딧을 비교합니다. 다르면 기존 기기의 사본을 보존한 채 연결 상태부터 확인합니다.",
            "en": "On the new device, use the same ID and compare gang name, fighter count and credits. If they differ, keep the original copy while checking connection."
          },
          "result": {
            "ko": "원본을 지우기 전에 이전 결과를 검증합니다.",
            "en": "You verify the transfer before discarding the original."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "이전 휴대전화에 파이터 8명의 갱이 있고 새 기기에는 갱이 없습니다.",
          "en": "The old phone has an eight-fighter gang, while the new device has no gang."
        },
        "steps": [
          {
            "ko": "이전 기기에서 JSON 백업을 보관합니다.",
            "en": "Keep a JSON backup from the old device."
          },
          {
            "ko": "두 기기에서 로그인 아이디와 저장 완료 여부를 확인합니다.",
            "en": "Check login ID and completed saving on both devices."
          },
          {
            "ko": "새 기기에서 파이터 8명과 크레딧을 대조한 뒤 이전을 마칩니다.",
            "en": "Verify all eight fighters and credits on the new device before finishing."
          }
        ],
        "result": {
          "ko": "새 기기의 빈 화면만 보고 이전 기록을 초기화하지 않습니다.",
          "en": "An empty screen on the new device does not justify resetting the original."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "새 기기에서 예시 초기화를 하면 이전 갱이 복구된다고 생각합니다.",
            "en": "You expect resetting sample records on the new device to recover the old gang."
          },
          "fix": {
            "ko": "예시는 내 계정 사본이 아닙니다. 백업과 계정 저장을 확인하세요.",
            "en": "Samples are not your account copy. Check the backup and account saving."
          }
        }
      ],
      "selfCheck": {
        "ko": "이전 기기를 초기화하기 전에 새 기기에서 무엇을 비교해야 하나요?",
        "en": "What should you compare on the new device before resetting the old one?"
      },
      "hint": {
        "ko": "복구할 수 있는 사본을 가장 먼저 확보해야 합니다.",
        "en": "Start by preserving a copy you can recover."
      },
      "optionFeedback": {
        "1": {
          "ko": "사본을 남기고 연결과 새 기기를 순서대로 검증하므로 적절합니다.",
          "en": "This preserves a copy, then verifies connection and the new device in order."
        },
        "2": {
          "ko": "삭제 후에는 아직 서버에 없는 기기 기록을 백업할 수 없을 수 있습니다.",
          "en": "After deletion, unsent device records may no longer be available to back up."
        },
        "3": {
          "ko": "예시 초기화는 개인 계정이나 백업을 되살리는 기능이 아닙니다.",
          "en": "Resetting samples does not restore a personal account or backup."
        }
      }
    },
    {
      "lessonId": "online-campaign",
      "stepId": "host-create",
      "objective": {
        "ko": "소유자 계정에 저장된 캠페인으로 모집을 준비합니다.",
        "en": "Prepare recruitment from a campaign saved under its owner’s account."
      },
      "preparation": [
        {
          "ko": "판본·시작 일정·허용 갱을 참가자와 합의합니다.",
          "en": "Agree on edition, schedule and allowed gangs."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "로그인과 기록 확인",
            "en": "Verify sign-in and records"
          },
          "body": {
            "ko": "아이디로 로그인한 계정에서 캠페인을 만듭니다. 이미 있는 캠페인이라면 자신이 소유자인지 확인합니다.",
            "en": "Create the campaign while signed in with your ID, or confirm that you own the existing campaign."
          },
          "result": {
            "ko": "모집을 관리할 계정이 정해집니다.",
            "en": "The recruitment owner is established."
          }
        },
        {
          "title": {
            "ko": "설정 정리",
            "en": "Organize the settings"
          },
          "body": {
            "ko": "이름과 판본을 정하고 안내에 일정·제한·주최자 연락 방법을 적습니다. 비공개 메모와 공개 모집 설명을 구분합니다.",
            "en": "Set name and edition; explain schedule, restrictions and host contact. Separate private notes from the public recruitment description."
          },
          "result": {
            "ko": "참가자가 볼 정보를 준비합니다.",
            "en": "You prepare the information applicants will see."
          }
        },
        {
          "title": {
            "ko": "온라인 참가 열기",
            "en": "Open Online Participation"
          },
          "body": {
            "ko": "저장 완료를 확인한 뒤 온라인 참가를 엽니다. 이 화면에서 모집 설정과 개별 신청을 따로 관리합니다.",
            "en": "After saving completes, open Online Participation. Recruitment settings and individual applications are managed separately here."
          },
          "result": {
            "ko": "공유할 모집 설정 화면에 도달합니다.",
            "en": "You reach the controls for public recruitment."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "친구가 캠페인을 만들어 주었지만 내 화면은 읽기 전용입니다.",
          "en": "A friend created the campaign, and your copy is read-only."
        },
        "steps": [
          {
            "ko": "표시된 소유자를 확인합니다.",
            "en": "Inspect the displayed owner."
          },
          {
            "ko": "친구가 모집을 관리할지 내가 새 캠페인을 소유할지 합의합니다.",
            "en": "Agree whether the friend will host or you will own a new campaign."
          },
          {
            "ko": "실제 소유자의 계정에서 모집 설정을 저장합니다.",
            "en": "Save recruitment settings from the actual owner’s account."
          }
        ],
        "result": {
          "ko": "캠페인이 보인다는 사실만으로 운영 권한이 생기지 않습니다.",
          "en": "Visibility alone does not grant management rights."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "읽기 전용 캠페인에서 모집 설정을 바꾸려 합니다.",
            "en": "You try to configure recruitment on a read-only campaign."
          },
          "fix": {
            "ko": "소유자에게 설정 변경을 요청하고 자신의 기록과 구분하세요.",
            "en": "Ask the owner to update the settings and distinguish their campaign from your records."
          }
        }
      ],
      "selfCheck": {
        "ko": "이 캠페인의 모집을 승인할 수 있는 계정은 누구인가요?",
        "en": "Which account can approve this campaign’s applications?"
      }
    },
    {
      "lessonId": "online-campaign",
      "stepId": "host-publish",
      "objective": {
        "ko": "모집을 켜고 정원·공개 설명·유효한 링크를 확인합니다.",
        "en": "Enable recruitment and verify capacity, public description and the active link."
      },
      "preparation": [
        {
          "ko": "캠페인을 계정에 저장하고 온라인 참가 화면을 엽니다.",
          "en": "Save the campaign to your account and open Online Participation."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "모집 설정 저장",
            "en": "Save recruitment settings"
          },
          "body": {
            "ko": "신청 받기를 켜고 정원과 공개 안내를 입력한 뒤 저장합니다. 정원에는 이미 참가 중인 갱도 반영됩니다.",
            "en": "Enable requests, enter capacity and a public description, then save. Existing participating gangs count toward capacity."
          },
          "result": {
            "ko": "모집 가능 상태가 저장됩니다.",
            "en": "The recruiting state is saved."
          }
        },
        {
          "title": {
            "ko": "모집 링크 확인",
            "en": "Check the recruitment link"
          },
          "body": {
            "ko": "복사한 링크를 열어 캠페인 이름·판본·주최자·모집 상태를 확인합니다. 개인 메모나 비밀번호를 공개 안내에 적지 않습니다.",
            "en": "Open the copied link and verify campaign name, edition, host and recruitment status. Keep private notes and passwords out of the description."
          },
          "result": {
            "ko": "공개 화면의 내용을 검토합니다.",
            "en": "You review the public-facing information."
          }
        },
        {
          "title": {
            "ko": "링크 전달과 승인 구분",
            "en": "Separate sharing from approval"
          },
          "body": {
            "ko": "유효한 모집 링크를 참가자에게 보냅니다. 링크를 받은 사람도 로그인하고 자신의 갱으로 신청한 뒤 승인을 기다려야 합니다.",
            "en": "Send the active recruitment link. Recipients still sign in, apply with their own gang and wait for approval."
          },
          "result": {
            "ko": "링크 공유만으로 권한을 부여하지 않습니다.",
            "en": "Sharing the link does not grant membership."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "정원 3명 캠페인에 주최자 갱 1개가 이미 등록돼 있습니다.",
          "en": "A capacity-three campaign already contains the host’s gang."
        },
        "steps": [
          {
            "ko": "현재 등록된 갱 수 1을 확인합니다.",
            "en": "Confirm that one gang is registered."
          },
          {
            "ko": "모집 설명에 참가 조건을 적고 설정을 저장합니다.",
            "en": "Write the conditions and save recruitment settings."
          },
          {
            "ko": "추가 2개 갱이 승인되면 정원에 도달한다는 점을 확인합니다.",
            "en": "Recognize that approving two more gangs fills the capacity."
          }
        ],
        "result": {
          "ko": "현재 참가자를 제외하고 3명을 더 받는 것으로 계산하지 않습니다.",
          "en": "Capacity three does not mean three additional applicants beyond existing members."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "링크를 교체한 뒤 예전 주소를 계속 공유합니다.",
            "en": "You keep sharing an old address after replacing the link."
          },
          "fix": {
            "ko": "링크를 다시 복사하세요. 기존 접수 신청은 남지만 이전 주소는 무효입니다.",
            "en": "Copy the new link. Existing applications remain, but the old address is invalid."
          }
        }
      ],
      "selfCheck": {
        "ko": "지금 공유한 주소가 저장된 최신 모집 링크인가요?",
        "en": "Is the address you shared the current saved recruitment link?"
      }
    },
    {
      "lessonId": "online-campaign",
      "stepId": "participant-apply",
      "objective": {
        "ko": "아이디로 로그인하고 같은 판본의 본인 갱을 선택해 신청합니다.",
        "en": "Sign in with your ID and apply using your own matching-edition gang."
      },
      "preparation": [
        {
          "ko": "모집 링크와 계정에 저장된 본인 갱을 준비합니다.",
          "en": "Have the recruitment link and your own account-saved gang ready."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "로그인하고 링크로 돌아오기",
            "en": "Sign in and return to the link"
          },
          "body": {
            "ko": "로그인·회원가입을 선택합니다. 아이디와 비밀번호만으로 가입할 수 있으며 이메일이나 ChatGPT 로그인은 필수가 아닙니다. 연결이 끝나면 모집 화면으로 돌아옵니다.",
            "en": "Choose Sign in / Create account. Only an ID and password are required; email and ChatGPT sign-in are optional. Return to recruitment after connecting."
          },
          "result": {
            "ko": "모집을 신청할 계정이 연결됩니다.",
            "en": "The applicant account is connected."
          }
        },
        {
          "title": {
            "ko": "본인 갱과 판본 확인",
            "en": "Check ownership and edition"
          },
          "body": {
            "ko": "내가 소유하고 같은 판본으로 만든 갱을 선택합니다. 보이지 않으면 원본 갱을 계정에 저장한 뒤 목록을 새로고침합니다.",
            "en": "Select a gang you own in the campaign’s edition. If it is absent, save the original gang to your account and refresh the list."
          },
          "result": {
            "ko": "실제로 공유할 원본 명단을 선택합니다.",
            "en": "You select the source roster to share."
          }
        },
        {
          "title": {
            "ko": "명단 검토 후 신청",
            "en": "Review before submitting"
          },
          "body": {
            "ko": "명단 검토가 표시되면 구성 문제를 확인합니다. 메시지 내용을 읽고 참가 신청을 보낸 뒤 승인 대기 상태인지 확인합니다.",
            "en": "Review roster warnings when shown. Read your message, submit the application and verify that it is pending."
          },
          "result": {
            "ko": "신청 제출과 승인을 구분합니다.",
            "en": "You distinguish a submitted application from approval."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "N26 모집에 참가하려는데 목록에는 내 N23 갱뿐입니다.",
          "en": "You want to join N26 recruitment but only own an N23 gang."
        },
        "steps": [
          {
            "ko": "캠페인 판본 N26을 다시 읽습니다.",
            "en": "Read the campaign’s N26 edition label."
          },
          {
            "ko": "N26으로 만든 본인 갱을 준비하고 계정 저장을 확인합니다.",
            "en": "Prepare your own N26 gang and verify account saving."
          },
          {
            "ko": "모집 목록을 새로고침해 그 갱으로 신청합니다.",
            "en": "Refresh the recruitment list and apply with that gang."
          }
        ],
        "result": {
          "ko": "갱 이름을 바꾸거나 다른 사람의 갱을 고르는 것으로 해결하지 않습니다.",
          "en": "Renaming a gang or choosing another player’s roster does not fix the mismatch."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "새 아이디를 만들면 기존 다른 계정의 갱이 자동으로 따라온다고 생각합니다.",
            "en": "You expect a new ID account to automatically inherit another account’s gangs."
          },
          "fix": {
            "ko": "원래 계정에서 아이디 로그인 설정을 하거나 본인 백업을 확인한 뒤 계정 상태를 점검하세요.",
            "en": "Set up ID login from the original account, or review your own backup and account status."
          }
        }
      ],
      "selfCheck": {
        "ko": "신청한 갱은 본인 소유이며 모집과 같은 판본인가요?",
        "en": "Is the selected gang yours, and does its edition match recruitment?"
      },
      "body": {
        "ko": "모집 링크에서 로그인·회원가입을 선택하고 아이디와 비밀번호로 계정을 연결합니다. 이메일이나 ChatGPT 로그인은 필수가 아닙니다. 같은 판본의 본인 갱을 골라 메시지를 읽고 신청을 보낸 뒤 승인 대기 상태를 확인하세요. 갱이 보이지 않으면 소유자·판본·계정 저장 상태를 차례로 점검합니다.",
        "en": "Choose Sign in / Create account on the recruitment link and connect with an ID and password. Neither email nor ChatGPT sign-in is required. Select your own matching-edition gang, review the message, submit and check Pending approval. If the gang is absent, check ownership, edition and account saving in that order."
      },
      "hint": {
        "ko": "캠페인의 판본과 갱 설정의 판본을 직접 비교하세요.",
        "en": "Compare the campaign’s edition with the gang’s configured edition."
      },
      "optionFeedback": {
        "1": {
          "ko": "맞습니다. 같은 판본의 본인 원본 갱이 신청 대상입니다.",
          "en": "Correct: apply with your own source gang in the matching edition."
        },
        "2": {
          "ko": "이름은 판본 설정을 바꾸지 않습니다. 실제 갱 설정이 검사됩니다.",
          "en": "A name does not change the edition; the configured value is checked."
        },
        "3": {
          "ko": "공유받은 읽기 전용 갱은 다른 사람 소유라 신청 대상이 아닙니다.",
          "en": "A shared read-only gang belongs to another player and is not eligible."
        }
      }
    },
    {
      "lessonId": "online-campaign",
      "stepId": "host-approve",
      "objective": {
        "ko": "신청 명단·현재 정원·최신 상태를 보고 승인 또는 거절합니다.",
        "en": "Review the roster, available capacity and current state before approving or rejecting."
      },
      "preparation": [
        {
          "ko": "캠페인 소유자 계정으로 온라인 참가를 엽니다.",
          "en": "Open Online Participation using the campaign owner’s account."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "신청자와 원본 확인",
            "en": "Inspect applicant and source"
          },
          "body": {
            "ko": "신청 목록에서 플레이어·갱 이름·판본·메시지를 대조합니다. 대기 상태인 명단과 이미 승인된 참가자를 구분합니다.",
            "en": "Compare player, gang name, edition and message. Separate pending requests from approved participants."
          },
          "result": {
            "ko": "검토할 신청을 식별합니다.",
            "en": "You identify the application being reviewed."
          }
        },
        {
          "title": {
            "ko": "정원과 변경 확인",
            "en": "Check capacity and changes"
          },
          "body": {
            "ko": "등록된 갱 수와 모집 상태를 확인합니다. 신청 후 명단이 바뀌었다는 안내가 나오면 재신청을 받아 최신 명단으로 검토합니다.",
            "en": "Check registered gang count and recruitment status. If the source roster changed after applying, ask for a renewed application using the current roster."
          },
          "result": {
            "ko": "오래된 명단을 승인하지 않습니다.",
            "en": "You avoid approving a stale roster."
          }
        },
        {
          "title": {
            "ko": "처리 결과 확인",
            "en": "Verify the decision"
          },
          "body": {
            "ko": "승인 또는 거절을 선택하고 상태를 새로고침합니다. 승인된 참가자가 자신의 모집 화면에서 캠페인을 열 수 있는지 확인합니다.",
            "en": "Choose Approve or Reject and refresh the state. Confirm that an approved participant can open the campaign from recruitment."
          },
          "result": {
            "ko": "승인 결과와 접근 권한을 함께 확인합니다.",
            "en": "You verify both the decision and its access result."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "정원 3, 등록 2인데 신청 두 건이 대기 중입니다.",
          "en": "Capacity is three, two gangs are registered, and two requests are pending."
        },
        "steps": [
          {
            "ko": "남은 자리 1개를 확인합니다.",
            "en": "Identify one remaining place."
          },
          {
            "ko": "먼저 검토한 신청 하나를 승인합니다.",
            "en": "Approve one reviewed request."
          },
          {
            "ko": "상태를 새로고침하고 다른 신청은 정원 상황에 맞춰 처리합니다.",
            "en": "Refresh the state and handle the other request according to capacity."
          }
        ],
        "result": {
          "ko": "두 신청을 동시에 승인해 정원을 넘길 것으로 기대하지 않습니다.",
          "en": "Do not expect two simultaneous approvals to exceed capacity."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "승인 버튼을 눌렀으니 참가자도 모든 기록을 편집할 수 있다고 생각합니다.",
            "en": "You assume approval lets the participant edit all records."
          },
          "fix": {
            "ko": "온라인 승인으로 생기는 열람 권한과 소유자의 운영 권한을 구분하세요.",
            "en": "Separate campaign viewing access from owner management rights."
          }
        }
      ],
      "selfCheck": {
        "ko": "현재 신청 상태와 참가 인원 수를 확인한 뒤 승인했나요?",
        "en": "Did you check application state and registered count before approval?"
      }
    },
    {
      "lessonId": "online-campaign",
      "stepId": "sync-roster",
      "objective": {
        "ko": "원본 갱을 수정해 승인된 명단에 반영하고 개인 메모를 구분합니다.",
        "en": "Update the owned source gang and distinguish shared roster data from private notes."
      },
      "preparation": [
        {
          "ko": "이미 승인된 참가자 계정과 본인의 원본 갱을 확인합니다.",
          "en": "Confirm the approved participant account and its original gang."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "원본 갱에서 수정",
            "en": "Edit the original gang"
          },
          "body": {
            "ko": "갱 명단에서 내 원본 갱을 열고 장비·파이터·자원을 수정합니다. 캠페인의 읽기 전용 사본을 우회 편집하지 않습니다.",
            "en": "Open your original gang and edit equipment, fighters or resources there. Do not bypass the campaign copy’s read-only controls."
          },
          "result": {
            "ko": "올바른 소유 기록을 수정합니다.",
            "en": "You edit the owned source record."
          }
        },
        {
          "title": {
            "ko": "계정 저장 기다리기",
            "en": "Wait for account saving"
          },
          "body": {
            "ko": "저장 중 표시가 끝나는지 확인합니다. 오류가 있다면 원본을 반복 복제하기보다 연결 상태와 안내를 점검합니다.",
            "en": "Wait for saving to complete. If an error appears, inspect connection and the message rather than repeatedly duplicating the source."
          },
          "result": {
            "ko": "원본 변경이 서버에 도달합니다.",
            "en": "The source update reaches the server."
          }
        },
        {
          "title": {
            "ko": "공유 화면에서 대조",
            "en": "Compare the shared view"
          },
          "body": {
            "ko": "캠페인을 다시 열어 변경한 장비나 자원을 확인합니다. 개인 메모는 참가 명단 공유에서 제외되지만 공개 설명과 신청 메시지는 상대가 봅니다.",
            "en": "Reopen the campaign to compare the edited equipment or resource. Private notes are excluded from enrollment roster sharing, but public descriptions and application messages are visible."
          },
          "result": {
            "ko": "공유 범위와 갱신 결과를 이해합니다.",
            "en": "You understand both sharing scope and the update result."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "내 원본 갱 크레딧을 100에서 80으로 바꿨지만 주최자 화면은 아직 100입니다.",
          "en": "Your source credits changed from 100 to 80, but the host still sees 100."
        },
        "steps": [
          {
            "ko": "내 계정의 저장 완료와 오류 여부를 확인합니다.",
            "en": "Check completed saving and errors on your account."
          },
          {
            "ko": "주최자가 공유 캠페인을 새로고침합니다.",
            "en": "Have the host refresh the shared campaign."
          },
          {
            "ko": "원본 80과 공유 명단 80을 비교합니다.",
            "en": "Compare source 80 with shared roster 80."
          }
        ],
        "result": {
          "ko": "원본 저장과 공유 화면 새로고침을 구분해 점검합니다.",
          "en": "You check source saving separately from refreshing the shared view."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "주최자가 참가자의 원본 갱을 임의로 고쳐 최신 명단을 덮습니다.",
            "en": "The host tries to overwrite the participant’s source roster."
          },
          "fix": {
            "ko": "원본 소유자가 수정하고 저장하도록 요청하세요.",
            "en": "Ask the source owner to make and save the change."
          }
        }
      ],
      "selfCheck": {
        "ko": "내가 바꾼 내용은 원본 갱에 저장됐고 공유 화면에서도 확인됐나요?",
        "en": "Was the change saved to your original gang and verified in the shared view?"
      }
    },
    {
      "lessonId": "online-campaign",
      "stepId": "join-checkpoint",
      "objective": {
        "ko": "대기·승인·철회 상태에 맞게 다음 행동을 선택합니다.",
        "en": "Choose the next action according to pending, approved or withdrawn state."
      },
      "preparation": [
        {
          "ko": "가상 신청 상태를 읽고 주최자와 참가자 역할을 나눠 생각합니다.",
          "en": "Read the hypothetical state and distinguish host and applicant roles."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "현재 상태 읽기",
            "en": "Read the current state"
          },
          "body": {
            "ko": "승인 대기면 주최자의 결정이 남아 있습니다. 링크를 다시 열거나 복사해도 자동 승인되지 않습니다.",
            "en": "Pending approval means the host has not decided yet. Reopening or copying the link does not approve the request."
          },
          "result": {
            "ko": "대기의 의미를 이해합니다.",
            "en": "You understand what pending means."
          }
        },
        {
          "title": {
            "ko": "역할에 맞는 조작 선택",
            "en": "Choose the role’s action"
          },
          "body": {
            "ko": "참가자는 상태 새로고침 또는 신청 취소를 선택하고 주최자는 검토 후 승인·거절합니다. 명단을 바꿨다면 취소 후 다시 신청합니다.",
            "en": "Applicants refresh status or withdraw; hosts review then approve or reject. After changing a pending roster, withdraw and apply again."
          },
          "result": {
            "ko": "누가 어떤 결정을 하는지 구분합니다.",
            "en": "You distinguish who makes each decision."
          }
        },
        {
          "title": {
            "ko": "승인 뒤 열람 확인",
            "en": "Verify access after approval"
          },
          "body": {
            "ko": "승인됨 상태에서 캠페인 열기를 선택합니다. 읽기 전용 참가 명단과 본인 원본 갱의 편집 권한을 다시 확인합니다.",
            "en": "After approval, choose Open campaign. Distinguish read-only campaign rosters from editing your own original gang."
          },
          "result": {
            "ko": "참가 상태와 편집 권한을 혼동하지 않습니다.",
            "en": "You separate participation status from editing rights."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "신청을 보낸 뒤 크레딧을 바꿨고 여전히 대기 중입니다.",
          "en": "You changed credits after submitting, and the request is still pending."
        },
        "steps": [
          {
            "ko": "대기 중인 신청을 취소합니다.",
            "en": "Withdraw the pending request."
          },
          {
            "ko": "원본 갱의 계정 저장 완료를 확인합니다.",
            "en": "Confirm that the original gang has finished saving."
          },
          {
            "ko": "최신 명단으로 다시 신청하고 주최자에게 검토를 요청합니다.",
            "en": "Apply again using the current roster and ask the host to review it."
          }
        ],
        "result": {
          "ko": "주최자가 신청 당시와 다른 명단을 모른 채 승인하지 않도록 합니다.",
          "en": "The host can review the current roster rather than unknowingly approving an old snapshot."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "대기 상태에서 캠페인 운영 권한이 생겼다고 생각합니다.",
            "en": "You assume pending status grants campaign management rights."
          },
          "fix": {
            "ko": "상태가 승인됨인지 확인하고 운영 권한과 열람 권한을 구분하세요.",
            "en": "Check for approval and distinguish management from viewing rights."
          }
        }
      ],
      "selfCheck": {
        "ko": "지금 필요한 행동은 참가자의 새로고침인가요, 주최자의 승인인가요?",
        "en": "Does the current situation need an applicant refresh or a host approval?"
      },
      "hint": {
        "ko": "신청을 보낸 사람과 승인 결정을 내리는 사람은 다릅니다.",
        "en": "The person submitting a request and the person approving it are different."
      },
      "optionFeedback": {
        "1": {
          "ko": "신청만으로 운영자 권한이 생기지 않습니다. 주최자의 결정이 남아 있습니다.",
          "en": "Submission grants no administrator rights; the host still has to decide."
        },
        "2": {
          "ko": "맞습니다. 주최자가 검토·승인하고 참가자가 처리 결과를 확인합니다.",
          "en": "Correct: the host reviews and approves, and the participant checks the result."
        },
        "3": {
          "ko": "링크 복사는 주소를 전달할 뿐 신청 상태를 바꾸지 않습니다.",
          "en": "Copying a link shares its address without changing application state."
        }
      }
    },
    {
      "lessonId": "n23-round-actions",
      "stepId": "round",
      "objective": {
        "ko": "라운드의 세 단계를 구분하고 중간 회복을 방지합니다.",
        "en": "Distinguish the three phases and avoid resolving recovery during an attack."
      },
      "preparation": [
        {
          "ko": "라운드 번호와 양측 준비 마커를 확인합니다.",
          "en": "Check the round number and both sides’ Ready markers."
        },
        {
          "ko": "제압·중상·브로큰 마커를 준비 마커와 따로 놓습니다.",
          "en": "Keep Pinned, Seriously Injured and Broken markers separate from Ready markers."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "우선권 정하기",
            "en": "Determine Priority"
          },
          "body": {
            "ko": "라운드를 시작하면 양측 우선권을 판정하고 필요한 모델에 준비 마커를 놓습니다.",
            "en": "At the start of the round, determine Priority and place the appropriate Ready markers."
          },
          "result": {
            "ko": "누가 먼저 활성화하는지 분명해집니다.",
            "en": "The first activating player is clear."
          }
        },
        {
          "title": {
            "ko": "행동을 번갈아 해결",
            "en": "Alternate activations"
          },
          "body": {
            "ko": "준비 모델 한 명의 활성화를 끝까지 해결한 뒤 상대가 한 명을 활성화합니다.",
            "en": "Resolve one Ready model’s complete activation before the opponent activates one model."
          },
          "result": {
            "ko": "공격 하나마다 상대 활성화로 넘어가지 않습니다.",
            "en": "An individual attack does not itself pass activation to the opponent."
          }
        },
        {
          "title": {
            "ko": "종료 단계로 이동",
            "en": "Move to the End phase"
          },
          "body": {
            "ko": "양측의 활성화가 끝나면 보틀, 이탈, 회복, 랠리를 순서대로 확인합니다.",
            "en": "When activations finish, check Bottle, fleeing, recovery and rallying in order."
          },
          "result": {
            "ko": "회복은 해당 종료 시점에만 처리됩니다.",
            "en": "Recovery occurs at its specified End-phase timing."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "한 발의 사격으로 상대가 행동 단계에 중상이 됐습니다.",
          "en": "A shot makes an enemy Seriously Injured during the Action phase."
        },
        "steps": [
          {
            "ko": "중상 마커를 놓되 지금 회복 주사위를 굴리지 않습니다.",
            "en": "Place the Serious Injury marker without rolling recovery yet."
          },
          {
            "ko": "남아 있는 준비 모델의 활성화를 계속합니다.",
            "en": "Continue resolving the remaining Ready models."
          },
          {
            "ko": "종료 단계의 회복 순서에서 그 모델을 다시 확인합니다.",
            "en": "Revisit that model when the End phase reaches recovery."
          }
        ],
        "result": {
          "ko": "중상 발생과 회복 시점이 따로 추적됩니다.",
          "en": "The injury event and its recovery timing are tracked separately."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "피해 직후 회복을 굴려 모델을 다시 행동시킵니다.",
            "en": "Rolling recovery immediately after damage and allowing the model to act again."
          },
          "fix": {
            "ko": "현재 단계를 확인하고 회복은 종료 단계까지 보류합니다.",
            "en": "Check the phase and defer recovery until the End phase."
          }
        }
      ],
      "selfCheck": {
        "ko": "준비 마커가 붙어 있어도 중상 상태가 남는 이유를 설명할 수 있나요?",
        "en": "Can you explain why a Ready marker does not remove Serious Injury?"
      }
    },
    {
      "lessonId": "n23-round-actions",
      "stepId": "priority",
      "objective": {
        "ko": "첫 라운드와 이후 라운드의 우선권 동률을 다르게 처리합니다.",
        "en": "Resolve first-round and later Priority ties differently."
      },
      "preparation": [
        {
          "ko": "현재 라운드 번호를 적어 둡니다.",
          "en": "Write down the current round number."
        },
        {
          "ko": "이전 우선권 보유자를 기억할 마커를 준비합니다.",
          "en": "Use a marker to remember the previous Priority holder."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "동률 확인",
            "en": "Identify the tie"
          },
          "body": {
            "ko": "양측 우선권 결과를 비교합니다. 더 높은 결과가 있으면 동률 규칙을 적용하지 않습니다.",
            "en": "Compare both Priority results. Do not use the tie rule if one result is higher."
          },
          "result": {
            "ko": "동률인지 먼저 확정합니다.",
            "en": "First establish whether the roll is tied."
          }
        },
        {
          "title": {
            "ko": "라운드 번호 확인",
            "en": "Check the round"
          },
          "body": {
            "ko": "첫 라운드 동률은 재굴림합니다. 이전 우선권 보유자가 없는 상황입니다.",
            "en": "Reroll a first-round tie because there is no previous Priority holder."
          },
          "result": {
            "ko": "첫 라운드에는 이전 보유자를 추정하지 않습니다.",
            "en": "No previous holder is invented for round one."
          }
        },
        {
          "title": {
            "ko": "이전 보유자와 비교",
            "en": "Compare the previous holder"
          },
          "body": {
            "ko": "후속 라운드 동률이면 이전 라운드에서 우선권이 없던 플레이어가 얻습니다.",
            "en": "On a later-round tie, Priority goes to the player who lacked it last round."
          },
          "result": {
            "ko": "새 보유자를 표시하고 첫 활성화를 시작합니다.",
            "en": "Mark the new holder before beginning the first activation."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "2라운드에 양측이 4를 굴렸고 1라운드 우선권은 내가 가졌습니다.",
          "en": "Both players roll 4 in round two; you held Priority in round one."
        },
        "steps": [
          {
            "ko": "같은 4이므로 동률임을 확인합니다.",
            "en": "The matching results establish a tie."
          },
          {
            "ko": "첫 라운드가 아니므로 재굴림 분기를 제외합니다.",
            "en": "This is not round one, so discard the reroll branch."
          },
          {
            "ko": "이전에 우선권이 없던 상대에게 마커를 넘깁니다.",
            "en": "Pass the marker to the opponent who lacked Priority."
          }
        ],
        "result": {
          "ko": "상대가 2라운드 우선권을 얻습니다.",
          "en": "The opponent receives Priority in round two."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "동률마다 습관적으로 다시 굴립니다.",
            "en": "Automatically rerolling every tied result."
          },
          "fix": {
            "ko": "첫 라운드인지와 이전 보유자를 먼저 확인하세요.",
            "en": "Check the round number and previous holder first."
          }
        }
      ],
      "selfCheck": {
        "ko": "첫 라운드 4 대 4와 2라운드 4 대 4를 각각 어떻게 처리하나요?",
        "en": "How do you resolve 4 versus 4 in round one and round two?"
      },
      "hint": {
        "ko": "먼저 첫 라운드인지 확인하고 이전 우선권 보유자를 보세요.",
        "en": "First check whether this is round one, then identify the previous holder."
      },
      "optionFeedback": {
        "1": {
          "ko": "상대는 이전 우선권이 없었으므로 후속 라운드 동률을 이깁니다.",
          "en": "The opponent lacked Priority last round and therefore wins this later-round tie."
        },
        "2": {
          "ko": "이전 보유자가 그대로 유지하는 규칙이 아닙니다.",
          "en": "The previous holder does not retain Priority on this later tie."
        },
        "3": {
          "ko": "항상 재굴림이 아니라 첫 라운드 동률만 재굴림입니다.",
          "en": "Only first-round ties reroll, not every tie."
        }
      }
    },
    {
      "lessonId": "n23-round-actions",
      "stepId": "costs",
      "objective": {
        "ko": "행동 이름과 심플·베이식·더블 분류를 함께 읽습니다.",
        "en": "Read an action’s name together with its Simple, Basic or Double category."
      },
      "preparation": [
        {
          "ko": "파이터의 현재 상태와 두 행동 칸을 확인합니다.",
          "en": "Check the Fighter’s state and two action slots."
        },
        {
          "ko": "무브·슛·차지의 N23 행동 유형을 준비합니다.",
          "en": "Have the N23 Move, Shoot and Charge action types available."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "행동 이름 선언",
            "en": "Declare the action name"
          },
          "body": {
            "ko": "하고 싶은 행동을 먼저 이름으로 적습니다. 이동과 사격을 막연히 한 묶음으로 취급하지 않습니다.",
            "en": "Write down the intended action names instead of treating movement and shooting as an undefined bundle."
          },
          "result": {
            "ko": "검사할 행동 목록이 생깁니다.",
            "en": "You have an explicit list to check."
          }
        },
        {
          "title": {
            "ko": "비용과 반복 검사",
            "en": "Check cost and repetition"
          },
          "body": {
            "ko": "심플은 반복 가능, 같은 이름의 베이식은 활성화당 한 번, 더블은 두 칸 모두를 소비합니다.",
            "en": "Simple may repeat, the same Basic action may occur once per activation, and Double consumes both slots."
          },
          "result": {
            "ko": "반복 제한과 총비용을 각각 검사합니다.",
            "en": "Repetition limits and total cost are checked independently."
          }
        },
        {
          "title": {
            "ko": "남은 행동 표시",
            "en": "Mark remaining actions"
          },
          "body": {
            "ko": "선택한 행동을 처리할 때마다 칸을 지웁니다. 더블 뒤에는 일반 행동 칸이 남지 않습니다.",
            "en": "Cross off slots as each action resolves; a Double leaves no ordinary action slot."
          },
          "result": {
            "ko": "다음 행동을 고를 근거가 남습니다.",
            "en": "The remaining allowance is visible."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "활성 파이터가 이동 두 번 또는 사격 두 번을 하려 합니다.",
          "en": "An Active Fighter wants either two Moves or two Shoots."
        },
        "steps": [
          {
            "ko": "무브는 심플이므로 두 칸에 각각 적습니다.",
            "en": "Move is Simple, so write it in both slots."
          },
          {
            "ko": "슛은 베이식이므로 두 번째 같은 이름의 행동을 지웁니다.",
            "en": "Shoot is Basic, so reject its second use by name."
          },
          {
            "ko": "차지는 더블이므로 하나로 두 칸을 채웁니다.",
            "en": "Charge is Double, so it fills both slots at once."
          }
        ],
        "result": {
          "ko": "무브→무브는 가능하지만 슛→슛은 기본적으로 불가능합니다.",
          "en": "Move→Move is legal; ordinary Shoot→Shoot is not."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "행동 두 개가 남았으니 아무 행동이나 두 번 합니다.",
            "en": "Assuming two slots allow any action to be repeated."
          },
          "fix": {
            "ko": "남은 칸 수뿐 아니라 같은 이름의 베이식 반복 여부도 확인합니다.",
            "en": "Check repeated Basic names as well as the number of slots."
          }
        }
      ],
      "selfCheck": {
        "ko": "조준→사격과 사격→사격의 차이를 이름과 비용으로 설명해 보세요.",
        "en": "Explain Aim→Shoot versus Shoot→Shoot using names and costs."
      }
    },
    {
      "lessonId": "n23-round-actions",
      "stepId": "pinned",
      "objective": {
        "ko": "기립 비용을 먼저 지불하고 남은 행동 하나를 선택합니다.",
        "en": "Pay Stand Up first and select the one remaining action."
      },
      "preparation": [
        {
          "ko": "준비 상태인 제압 파이터를 가정합니다.",
          "en": "Use a Ready Pinned Fighter."
        },
        {
          "ko": "무기 특성이나 스킬 예외가 없는 상황으로 연습합니다.",
          "en": "Practice without weapon or skill exceptions."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "현재 상태 확인",
            "en": "Check the starting state"
          },
          "body": {
            "ko": "준비 마커는 활성화 가능 여부를 뜻합니다. 제압 마커는 여전히 별개로 남습니다.",
            "en": "Ready indicates activation availability; the Pinned marker remains a separate condition."
          },
          "result": {
            "ko": "일반 서 있는 파이터로 취급하지 않습니다.",
            "en": "Do not treat the model as ordinarily standing."
          }
        },
        {
          "title": {
            "ko": "기립 처리",
            "en": "Resolve Stand Up"
          },
          "body": {
            "ko": "스탠드 업 베이식으로 행동 하나를 쓰고 상태를 활성으로 바꿉니다.",
            "en": "Spend one action on Stand Up (Basic), then change the state to Active."
          },
          "result": {
            "ko": "두 행동 중 하나가 남습니다.",
            "en": "One of the two actions remains."
          }
        },
        {
          "title": {
            "ko": "다음 행동 선택",
            "en": "Choose the remaining action"
          },
          "body": {
            "ko": "새 상태에서 가능한 사격 등 한 행동을 고릅니다. 돌격 더블의 두 칸은 이제 없습니다.",
            "en": "Choose one legal action in the new state, such as Shoot; the two slots required for Charge are no longer available."
          },
          "result": {
            "ko": "기립→사격 같은 순서를 계획할 수 있습니다.",
            "en": "A sequence such as Stand Up→Shoot can be planned."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "제압된 슈터가 일어난 뒤 같은 활성화에서 사격하려 합니다.",
          "en": "A Pinned shooter wants to stand and shoot in one activation."
        },
        "steps": [
          {
            "ko": "첫 칸에 스탠드 업 베이식을 적습니다.",
            "en": "Place Stand Up (Basic) in the first slot."
          },
          {
            "ko": "제압 상태를 해제하고 활성 상태를 표시합니다.",
            "en": "Remove Pinned and mark the Fighter Active."
          },
          {
            "ko": "남은 한 칸에 슛 베이식을 적습니다.",
            "en": "Place Shoot (Basic) in the remaining slot."
          }
        ],
        "result": {
          "ko": "서로 다른 두 베이식이므로 일반적으로 적법한 두 행동입니다.",
          "en": "These are two different Basic actions and are ordinarily legal."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "준비 마커를 받을 때 제압 마커도 자동 제거합니다.",
            "en": "Removing Pinned automatically when Ready is placed."
          },
          "fix": {
            "ko": "준비와 상태를 분리하고 기립 행동으로 상태를 바꿉니다.",
            "en": "Keep readiness separate and change the state through Stand Up."
          }
        }
      ],
      "selfCheck": {
        "ko": "기립 후 차지를 할 수 없는 이유는 남은 행동 수로 설명되나요?",
        "en": "Can you explain the inability to Charge after standing using the remaining slots?"
      }
    },
    {
      "lessonId": "n23-round-actions",
      "stepId": "activation-practice",
      "objective": {
        "ko": "합법적인 두 행동 조합을 직접 검산합니다.",
        "en": "Verify a legal two-action combination yourself."
      },
      "preparation": [
        {
          "ko": "상태는 활성, 행동은 두 개, 별도 예외는 없다고 가정합니다.",
          "en": "Assume Active state, two actions and no exceptions."
        },
        {
          "ko": "각 선택지 옆에 행동 분류를 적습니다.",
          "en": "Write the action category beside each option."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "첫 조합 분해",
            "en": "Break down the first sequence"
          },
          "body": {
            "ko": "무브→무브를 심플1+심플1로 적어 총 두 행동인지 봅니다.",
            "en": "Write Move→Move as Simple 1+Simple 1 and check that it totals two actions."
          },
          "result": {
            "ko": "반복 가능한 심플 두 번입니다.",
            "en": "It repeats an action whose category permits repetition."
          }
        },
        {
          "title": {
            "ko": "두 번째 조합 검사",
            "en": "Check the second sequence"
          },
          "body": {
            "ko": "슛→슛은 총비용만 보면 두 행동이지만 같은 베이식 이름을 반복합니다.",
            "en": "Shoot→Shoot costs two actions but repeats the same Basic name."
          },
          "result": {
            "ko": "비용 이외의 반복 제한으로 탈락합니다.",
            "en": "The repetition rule makes it illegal despite its cost."
          }
        },
        {
          "title": {
            "ko": "더블 조합 검사",
            "en": "Check the Double sequence"
          },
          "body": {
            "ko": "차지→에임은 더블2+베이식1로 총 세 행동입니다.",
            "en": "Charge→Aim costs Double 2+Basic 1, totalling three actions."
          },
          "result": {
            "ko": "일반 두 행동 허용량을 넘습니다.",
            "en": "It exceeds the ordinary two-action allowance."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "세 후보 중 합법적인 한 가지를 선택해야 합니다.",
          "en": "Choose the legal sequence from the three candidates."
        },
        "steps": [
          {
            "ko": "무브→무브는 1+1=2이고 반복이 허용됩니다.",
            "en": "Move→Move costs 1+1=2 and may repeat."
          },
          {
            "ko": "슛→슛은 같은 베이식 반복이라 제외합니다.",
            "en": "Reject Shoot→Shoot for repeating the same Basic action."
          },
          {
            "ko": "차지→에임은 2+1=3이라 제외합니다.",
            "en": "Reject Charge→Aim because 2+1=3."
          }
        ],
        "result": {
          "ko": "정답은 무브→무브입니다.",
          "en": "The correct answer is Move→Move."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "사격 두 번이 더 좋아 보인다는 이유로 고릅니다.",
            "en": "Choosing two shots because they look more effective."
          },
          "fix": {
            "ko": "전술 효과보다 먼저 행동의 적법성을 확인하세요.",
            "en": "Check legality before comparing tactical value."
          }
        }
      ],
      "selfCheck": {
        "ko": "틀린 두 선택지는 서로 다른 이유로 불법이라는 것을 구분했나요?",
        "en": "Did you distinguish the different reasons the two wrong choices are illegal?"
      },
      "hint": {
        "ko": "각 선택지를 비용 합계와 같은 베이식 이름 반복이라는 두 기준으로 검사하세요.",
        "en": "Check each choice for both total cost and repetition of the same Basic name."
      },
      "optionFeedback": {
        "1": {
          "ko": "무브는 심플이므로1+1의 두 행동으로 반복할 수 있습니다.",
          "en": "Move is Simple and can repeat for two actions costing 1+1."
        },
        "2": {
          "ko": "슛은 베이식이며 같은 이름을 한 활성화에서 두 번 사용할 수 없습니다.",
          "en": "Shoot is Basic and cannot repeat by name in the same activation."
        },
        "3": {
          "ko": "차지 더블2 뒤 조준1을 더하면 세 행동이 됩니다.",
          "en": "Charge Double costs two, and Aim adds one, totalling three actions."
        }
      }
    },
    {
      "lessonId": "n23-round-actions",
      "stepId": "close-round",
      "objective": {
        "ko": "준비 마커 제거와 종료 단계 진입 조건을 정확히 처리합니다.",
        "en": "Remove Ready markers and enter the End phase at the correct time."
      },
      "preparation": [
        {
          "ko": "양측의 남은 준비 모델 수를 셉니다.",
          "en": "Count each side’s remaining Ready models."
        },
        {
          "ko": "활성화 중 지속되는 효과의 종료 시점을 확인합니다.",
          "en": "Check the expiry timing of activation effects."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "활성화 전체 마치기",
            "en": "Finish the full activation"
          },
          "body": {
            "ko": "현재 모델의 선언된 행동과 그 결과를 끝까지 해결합니다.",
            "en": "Finish the current model’s declared actions and their consequences."
          },
          "result": {
            "ko": "공격·이동 중간에 순서를 넘기지 않습니다.",
            "en": "Do not pass play midway through an attack or movement."
          }
        },
        {
          "title": {
            "ko": "준비 마커 제거",
            "en": "Remove the Ready marker"
          },
          "body": {
            "ko": "처리가 끝난 모델의 준비 마커를 제거하고 상대의 준비 모델 여부를 확인합니다.",
            "en": "Remove that model’s Ready marker, then check whether the opponent has a Ready model."
          },
          "result": {
            "ko": "이미 활성화한 모델을 다시 고르지 않습니다.",
            "en": "The model cannot be selected as Ready again."
          }
        },
        {
          "title": {
            "ko": "남은 활성화 후 종료",
            "en": "End after remaining activations"
          },
          "body": {
            "ko": "한쪽만 준비 모델이 남았다면 그쪽이 남은 활성화를 처리한 후 종료 단계로 갑니다.",
            "en": "If only one side has Ready models, it completes those activations before the End phase."
          },
          "result": {
            "ko": "양측에 준비 모델이 없을 때 단계가 바뀝니다.",
            "en": "The phase changes after both sides have no Ready models."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "내 준비 모델은 0명이고 상대는 2명 남았습니다.",
          "en": "You have no Ready models; the opponent has two."
        },
        "steps": [
          {
            "ko": "이미 활성화한 내 모델에 마커를 다시 놓지 않습니다.",
            "en": "Do not restore Ready markers to your activated models."
          },
          {
            "ko": "상대가 남은 두 모델의 활성화를 순서대로 마칩니다.",
            "en": "The opponent completes its two remaining activations."
          },
          {
            "ko": "그 뒤 보틀·이탈·회복·랠리 순서로 넘어갑니다.",
            "en": "Then proceed through Bottle, fleeing, recovery and rallying."
          }
        ],
        "result": {
          "ko": "내 모델이 먼저 소진돼도 상대의 활성화는 생략되지 않습니다.",
          "en": "Your depleted Ready pool does not cancel the opponent’s activations."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "내 마지막 활성화가 끝나면 바로 회복을 굴립니다.",
            "en": "Rolling recovery as soon as your final activation ends."
          },
          "fix": {
            "ko": "상대의 준비 모델도 모두 처리됐는지 확인합니다.",
            "en": "Check that the opponent’s Ready models have also finished."
          }
        }
      ],
      "selfCheck": {
        "ko": "상대 준비 모델이 하나 남았다면 지금은 어느 단계인가요?",
        "en": "Which phase are you in if the opponent still has one Ready model?"
      }
    },
    {
      "lessonId": "n23-movement",
      "stepId": "route",
      "objective": {
        "ko": "모델을 옮기기 전에 실제 경로와 도착 베이스 공간을 검토합니다.",
        "en": "Inspect the actual route and room for the base before moving the model."
      },
      "preparation": [
        {
          "ko": "파이터의 M과 베이스 크기를 확인합니다.",
          "en": "Check the Fighter’s M and base size."
        },
        {
          "ko": "지형 경계·높이와 적 위치를 보며 줄자를 놓습니다.",
          "en": "Lay out the tape against terrain boundaries, heights and enemy positions."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "시작과 도착 표시",
            "en": "Mark start and destination"
          },
          "body": {
            "ko": "베이스의 시작 위치와 놓고 싶은 끝 위치를 정합니다.",
            "en": "Identify the base’s starting point and intended ending position."
          },
          "result": {
            "ko": "왕복 측정 기준이 일정해집니다.",
            "en": "You have a consistent basis for measurement."
          }
        },
        {
          "title": {
            "ko": "경로 구간 나누기",
            "en": "Divide the route"
          },
          "body": {
            "ko": "평지, 어려운 지형, 등반 구간을 분리하고 적 주변 제한도 확인합니다.",
            "en": "Separate open ground, difficult terrain and climbing, and check enemy proximity restrictions."
          },
          "result": {
            "ko": "각 구간의 비용을 따로 계산할 수 있습니다.",
            "en": "Each segment can be costed independently."
          }
        },
        {
          "title": {
            "ko": "비용과 공간 확인",
            "en": "Check cost and space"
          },
          "body": {
            "ko": "총 이동 비용이 M 안에 드는지, 끝 지점이 베이스를 지지하는지 확인한 뒤 옮깁니다.",
            "en": "Check that the total cost fits M and that the destination supports the base before relocating it."
          },
          "result": {
            "ko": "도착 위치를 다시 되돌리는 일을 줄입니다.",
            "en": "You reduce avoidable takebacks."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "M5 파이터에게 직선 4인치 길이와 적 옆 우회길이 보입니다.",
          "en": "An M5 Fighter can see a straight 4-inch route and a detour beside an enemy."
        },
        "steps": [
          {
            "ko": "직선 거리가 짧다는 이유만으로 선택하지 않습니다.",
            "en": "Do not choose purely because the straight-line distance is shorter."
          },
          {
            "ko": "실제 통과 경로의 지형 비용과 적 1인치 제한을 확인합니다.",
            "en": "Check terrain costs and the normal 1-inch enemy exclusion along the route."
          },
          {
            "ko": "합법적인 도착 공간까지 비용을 계산합니다.",
            "en": "Measure the cost to a legal space for the base."
          }
        ],
        "result": {
          "ko": "합법적인 경로와 이동 가능 거리를 함께 만족해야 합니다.",
          "en": "Both route legality and movement allowance must be satisfied."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "공중 직선 거리만 재고 벽·낙차를 무시합니다.",
            "en": "Measuring only a straight line through walls and drops."
          },
          "fix": {
            "ko": "베이스가 실제로 이동할 경로를 구간별로 재세요.",
            "en": "Measure the route the base actually follows, segment by segment."
          }
        }
      ],
      "selfCheck": {
        "ko": "거리 안에 들어와도 베이스를 놓을 수 없다면 적법한 도착점인가요?",
        "en": "Is an ending point legal merely because it is in range if the base cannot fit there?"
      }
    },
    {
      "lessonId": "n23-movement",
      "stepId": "difficult",
      "objective": {
        "ko": "실제 거리와 이동 비용을 구분해 두 배 구간을 계산합니다.",
        "en": "Distinguish physical distance from movement cost in doubled-cost segments."
      },
      "preparation": [
        {
          "ko": "평지·어려운 지형·등반·사다리의 구분을 합의합니다.",
          "en": "Agree what counts as open ground, difficult terrain, climbing and ladders."
        },
        {
          "ko": "한 구간의 길이를 줄자로 측정합니다.",
          "en": "Measure the length of each segment."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "구간 유형 표시",
            "en": "Label each segment"
          },
          "body": {
            "ko": "평지와 사다리·계단은 정상 비용, 어려운 지형과 보통 수직 등반은 두 배 비용으로 적습니다.",
            "en": "Mark open ground, ladders and stairs at normal cost, and difficult ground or ordinary vertical climbing at double cost."
          },
          "result": {
            "ko": "모든 경로를 일괄 두 배로 만들지 않습니다.",
            "en": "Do not double the entire route indiscriminately."
          }
        },
        {
          "title": {
            "ko": "비용 변환",
            "en": "Convert distance to cost"
          },
          "body": {
            "ko": "각 구간의 길이에 해당 배수를 곱합니다. 어려운 지형 2인치는 4인치를 소비합니다.",
            "en": "Multiply each segment by its factor; 2 inches of difficult terrain consumes 4 inches."
          },
          "result": {
            "ko": "각각의 소비량이 나옵니다.",
            "en": "Each segment now has a movement cost."
          }
        },
        {
          "title": {
            "ko": "합계 비교",
            "en": "Compare the total"
          },
          "body": {
            "ko": "구간별 소비량을 더하고 파이터가 쓸 수 있는 이동 거리와 비교합니다.",
            "en": "Add the segment costs and compare them with the Fighter’s movement allowance."
          },
          "result": {
            "ko": "실제 이동 거리와 소비 비용을 별도로 말할 수 있습니다.",
            "en": "You can state physical distance and consumed movement separately."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "평지 1인치 뒤 어려운 지형 2인치가 이어집니다.",
          "en": "A route has 1 inch of open ground followed by 2 inches of difficult terrain."
        },
        "steps": [
          {
            "ko": "평지는 1×1=1인치입니다.",
            "en": "Open ground costs 1×1=1 inch."
          },
          {
            "ko": "어려운 지형은 2×2=4인치입니다.",
            "en": "Difficult terrain costs 2×2=4 inches."
          },
          {
            "ko": "합계는 1+4=5인치입니다.",
            "en": "The total cost is 1+4=5 inches."
          }
        ],
        "result": {
          "ko": "물리적 경로는 3인치지만 이동 비용은 5인치입니다.",
          "en": "The physical route is 3 inches but consumes 5 inches of movement."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "어려운 구간만 두 배인데 전체 3인치를 두 배로 계산합니다.",
            "en": "Doubling all 3 physical inches instead of only the difficult segment."
          },
          "fix": {
            "ko": "경계를 기준으로 나누고 각 구간에 다른 배수를 적용합니다.",
            "en": "Divide at the terrain boundary and apply each segment’s own factor."
          }
        }
      ],
      "selfCheck": {
        "ko": "같은 높이 2인치라도 사다리와 보통 등반의 비용은 어떻게 다른가요?",
        "en": "How do a 2-inch ladder and 2-inch ordinary climb differ in cost?"
      }
    },
    {
      "lessonId": "n23-movement",
      "stepId": "movement-practice",
      "objective": {
        "ko": "M5로 비용 5인치의 혼합 경로를 한 번에 갈 수 있는지 판단합니다.",
        "en": "Decide whether an M5 Fighter can cover a mixed route costing 5 inches in one Move."
      },
      "preparation": [
        {
          "ko": "M5, 평지 1인치, 어려운 지형 2인치를 적습니다.",
          "en": "Write down M5, 1 inch open and 2 inches difficult."
        },
        {
          "ko": "다른 스킬·이동 보정은 없다고 둡니다.",
          "en": "Assume no other movement modifiers or skills."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "평지 계산",
            "en": "Cost the open segment"
          },
          "body": {
            "ko": "평지 1인치는 정상 배수로 1인치를 소비합니다.",
            "en": "The 1-inch open segment consumes 1 inch."
          },
          "result": {
            "ko": "소비량은 현재 1입니다.",
            "en": "The running cost is 1."
          }
        },
        {
          "title": {
            "ko": "어려운 구간 계산",
            "en": "Cost the difficult segment"
          },
          "body": {
            "ko": "어려운 지형 2인치는 두 배이므로 4인치를 더합니다.",
            "en": "The 2-inch difficult segment costs double, so add 4 inches."
          },
          "result": {
            "ko": "소비량이 5가 됩니다.",
            "en": "The running cost becomes 5."
          }
        },
        {
          "title": {
            "ko": "M과 비교",
            "en": "Compare with M"
          },
          "body": {
            "ko": "M5와 비용5를 비교합니다. 같으므로 비용만 보면 한 번의 무브 안에 들어갑니다.",
            "en": "Compare allowance 5 with cost 5; the route fits a single Move on cost alone."
          },
          "result": {
            "ko": "최종 배치의 합법성은 별도로 확인합니다.",
            "en": "Still check that the ending placement is legal."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "파이터의 한 번 이동 허용량은 5인치입니다.",
          "en": "The Fighter’s single-Move allowance is 5 inches."
        },
        "steps": [
          {
            "ko": "1+2=3은 물리적 거리일 뿐입니다.",
            "en": "1+2=3 is only the physical distance."
          },
          {
            "ko": "정확한 비용은 1+(2×2)=5입니다.",
            "en": "The movement cost is 1+(2×2)=5."
          },
          {
            "ko": "5−5=0이므로 남은 이동 거리는 없습니다.",
            "en": "5−5=0, leaving no movement allowance unused."
          }
        ],
        "result": {
          "ko": "정답은 5인치이며 한 번의 무브를 모두 사용합니다.",
          "en": "The correct cost is 5 inches and uses the whole Move."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "3인치만 소비했다고 보고 남은 2인치를 더 움직입니다.",
            "en": "Spending only 3 and then moving an extra 2 inches."
          },
          "fix": {
            "ko": "두 배 비용을 먼저 반영하고 남은 거리를 계산합니다.",
            "en": "Apply doubled costs before calculating unused allowance."
          }
        }
      ],
      "selfCheck": {
        "ko": "이 예시에서 실제 이동 거리 3과 소비 거리 5를 구별했나요?",
        "en": "Did you distinguish 3 inches travelled from 5 inches consumed?"
      },
      "hint": {
        "ko": "평지1은 그대로, 어려운 지형2에만 두 배 비용을 곱하세요.",
        "en": "Keep the open 1 unchanged and double only the difficult segment of 2."
      },
      "optionFeedback": {
        "1": {
          "ko": "1+(2×2)=5인치로M5 한 번의 무브를 모두 사용합니다.",
          "en": "1+(2×2)=5 inches uses the whole M5 Move."
        },
        "2": {
          "ko": "3은 물리적 거리이며 어려운 지형의 두 배 비용이 빠졌습니다.",
          "en": "3 is the physical distance and omits the difficult segment’s doubled cost."
        },
        "3": {
          "ko": "6은 평지까지 두 배로 계산했을 때의 오답입니다.",
          "en": "6 incorrectly doubles the open-ground segment as well."
        }
      }
    },
    {
      "lessonId": "n23-movement",
      "stepId": "charge",
      "objective": {
        "ko": "차지 더블의 거리·지형·포함된 파이트를 함께 처리합니다.",
        "en": "Handle a Charge Double’s distance, terrain and included Fight together."
      },
      "preparation": [
        {
          "ko": "두 행동이 모두 남은 적법한 차지 상황을 준비합니다.",
          "en": "Use a legal charge situation with both action slots available."
        },
        {
          "ko": "M, 차지 D3와 접촉할 적을 확인합니다.",
          "en": "Check M, the Charge D3 and the enemy to contact."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "차지 선언",
            "en": "Declare Charge"
          },
          "body": {
            "ko": "차지는 더블이므로 시작 시 두 행동을 확보합니다.",
            "en": "Charge is Double, so reserve both actions before declaring it."
          },
          "result": {
            "ko": "보통 이동 후 남은 한 칸으로는 선택할 수 없습니다.",
            "en": "It cannot ordinarily be chosen with one slot left after a Move."
          }
        },
        {
          "title": {
            "ko": "거리 계산",
            "en": "Calculate distance"
          },
          "body": {
            "ko": "M에 D3인치를 더한 뒤 실제 경로의 지형 비용과 접촉 가능 여부를 확인합니다.",
            "en": "Add D3 inches to M, then account for terrain costs and whether contact can be reached."
          },
          "result": {
            "ko": "단순한 직선 사거리로 취급하지 않습니다.",
            "en": "Do not treat this as a simple straight-line range."
          }
        },
        {
          "title": {
            "ko": "성공 시 전투 해결",
            "en": "Resolve the successful charge"
          },
          "body": {
            "ko": "교전으로 이어진 성공한 차지는 포함된 파이트를 해결합니다.",
            "en": "A successful charge into engagement resolves its included Fight."
          },
          "result": {
            "ko": "포함된 공격과 추가 일반 행동을 혼동하지 않습니다.",
            "en": "Keep the included attack distinct from an extra ordinary action."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "M4, 차지 D3 결과2, 지형 비용 없음입니다.",
          "en": "The Fighter has M4, rolls 2 on the Charge D3, and crosses no costly terrain."
        },
        "steps": [
          {
            "ko": "4+2=6인치의 이동 허용량을 계산합니다.",
            "en": "Calculate a 4+2=6-inch allowance."
          },
          {
            "ko": "적에게 닿는 경로와 최종 접촉 배치를 확인합니다.",
            "en": "Check a route that reaches the enemy and allows contact."
          },
          {
            "ko": "성공했다면 파이트를 해결하고 두 행동을 모두 사용했다고 표시합니다.",
            "en": "On success, resolve Fight and mark both ordinary actions spent."
          }
        ],
        "result": {
          "ko": "6인치 차지와 포함된 파이트이며 별도 사격 칸은 남지 않습니다.",
          "en": "This is a 6-inch charge plus its included Fight, with no spare Shoot slot."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "차지를 이동 한 번으로 세어 이후 사격을 추가합니다.",
            "en": "Counting Charge as one ordinary Move and adding a Shoot afterward."
          },
          "fix": {
            "ko": "더블 두 칸과 차지에 포함된 파이트를 별도로 표시합니다.",
            "en": "Mark the two-slot Double and its included Fight separately."
          }
        }
      ],
      "selfCheck": {
        "ko": "차지 보너스가 있어도 어려운 지형 비용을 무시할 수 없는 이유는 무엇인가요?",
        "en": "Why does the charge bonus not let you ignore difficult-terrain costs?"
      }
    },
    {
      "lessonId": "n23-movement",
      "stepId": "charge-practice",
      "objective": {
        "ko": "성공한 차지 뒤 일반 행동이 남지 않음을 계산합니다.",
        "en": "Calculate why no ordinary action remains after a successful charge."
      },
      "preparation": [
        {
          "ko": "M4와 D3 결과2를 사용합니다.",
          "en": "Use M4 and a D3 result of 2."
        },
        {
          "ko": "시작 행동 수는2, 차지는 더블이라고 적습니다.",
          "en": "Write down two starting actions and Charge as Double."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "거리와 비용 분리",
            "en": "Separate distance from action cost"
          },
          "body": {
            "ko": "차지 이동은4+2=6인치지만 행동 비용은 항상 더블 두 칸입니다.",
            "en": "The charge allowance is 4+2=6 inches, but its action cost is a two-slot Double."
          },
          "result": {
            "ko": "인치 수가 행동 수를 바꾸지 않습니다.",
            "en": "Inches do not change the number of actions spent."
          }
        },
        {
          "title": {
            "ko": "포함 공격 처리",
            "en": "Resolve the included attack"
          },
          "body": {
            "ko": "성공한 차지의 파이트는 그 차지 안에서 처리합니다.",
            "en": "Resolve the successful charge’s Fight within the Charge action."
          },
          "result": {
            "ko": "별도 행동을 공짜로 돌려받는 것은 아닙니다.",
            "en": "It does not refund an ordinary action."
          }
        },
        {
          "title": {
            "ko": "남은 칸 계산",
            "en": "Count remaining slots"
          },
          "body": {
            "ko": "시작2−차지2=0을 적고 추가 조준·사격을 선언하지 않습니다.",
            "en": "Write 2 starting slots−2 for Charge=0 and do not declare another Aim or Shoot."
          },
          "result": {
            "ko": "답은0개입니다.",
            "en": "The answer is zero."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "6인치를 돌격해 접촉하고 파이트를 마쳤습니다.",
          "en": "The Fighter charges 6 inches into contact and finishes its Fight."
        },
        "steps": [
          {
            "ko": "첫째, 차지의 이동 부분을 마칩니다.",
            "en": "First complete the movement part of Charge."
          },
          {
            "ko": "둘째, 포함된 근접전 해결을 마칩니다.",
            "en": "Then complete the included melee resolution."
          },
          {
            "ko": "마지막으로 더블 비용이 두 행동을 사용했는지 확인합니다.",
            "en": "Finally confirm that the Double consumed both actions."
          }
        ],
        "result": {
          "ko": "남은 일반 행동은0개이고 활성화를 정리합니다.",
          "en": "Zero ordinary actions remain; finish the activation."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "차지에 포함된 파이트를 첫 행동으로 세어 두 번째 행동이 남았다고 생각합니다.",
            "en": "Counting the included Fight as action one and assuming a second remains."
          },
          "fix": {
            "ko": "활성화의 차지 더블 자체가 두 행동을 모두 사용합니다.",
            "en": "The Charge Double itself already consumes both actions."
          }
        }
      ],
      "selfCheck": {
        "ko": "이 문제의 6은 이동 거리이고 0은 남은 행동 수라는 점을 구별했나요?",
        "en": "Did you distinguish 6 inches of movement from zero remaining actions?"
      },
      "hint": {
        "ko": "차지의 인치 보너스와 더블의 행동 비용을 구분하세요.",
        "en": "Separate the Charge’s distance bonus from its Double action cost."
      },
      "optionFeedback": {
        "1": {
          "ko": "더블이 두 행동을 모두 사용하므로 일반 행동은0개 남습니다.",
          "en": "The Double consumes both actions, leaving zero ordinary actions."
        },
        "2": {
          "ko": "포함된 파이트가 일반 행동 한 개를 돌려주지는 않습니다.",
          "en": "The included Fight does not refund an ordinary action."
        },
        "3": {
          "ko": "차지 이동과 파이트를 처리해도 더블의 비용이 없어지지 않습니다.",
          "en": "Resolving the charge movement and Fight does not erase the Double’s cost."
        }
      }
    },
    {
      "lessonId": "n23-movement",
      "stepId": "hazards",
      "objective": {
        "ko": "도약·낙하의 추가 판정과 적법한 도착 위치를 확인합니다.",
        "en": "Check extra tests for gaps and drops and a legal landing position."
      },
      "preparation": [
        {
          "ko": "사용할 지형의 틈·높이·착지 면을 살펴봅니다.",
          "en": "Inspect the terrain’s gap, height and landing surface."
        },
        {
          "ko": "현재 N23 관련 이동 규칙과 이니셔티브를 확인합니다.",
          "en": "Check the relevant N23 movement rules and Initiative."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "지형 분류 합의",
            "en": "Agree the terrain type"
          },
          "body": {
            "ko": "틀을 건너는지, 아래로 뛰는지, 단순 등반인지 상대와 먼저 구분합니다.",
            "en": "Agree whether the route crosses a gap, jumps down or simply climbs."
          },
          "result": {
            "ko": "서로 다른 이동 절차를 섞지 않습니다.",
            "en": "Different movement procedures stay separate."
          }
        },
        {
          "title": {
            "ko": "추가 판정 확인",
            "en": "Check extra tests"
          },
          "body": {
            "ko": "해당 이니셔티브 판정과 실패 시 추락 처리를 확인한 뒤 이동을 선언합니다.",
            "en": "Check the relevant Initiative test and failure/fall procedure before declaring the movement."
          },
          "result": {
            "ko": "위험을 알고 경로를 선택합니다.",
            "en": "The route is chosen with its risks understood."
          }
        },
        {
          "title": {
            "ko": "끝 위치 검사",
            "en": "Inspect the end position"
          },
          "body": {
            "ko": "착지 면이 베이스를 지지하는지와 이동 비용·적 위치를 확인합니다.",
            "en": "Check base support at the landing point, movement cost and enemy positions."
          },
          "result": {
            "ko": "거리만 충족한 불가능한 착지를 피합니다.",
            "en": "Avoid an impossible landing that merely lies in range."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "같은 지점으로 가는 다리길과 틈을 넘는 지름길이 있습니다.",
          "en": "A bridge and a shortcut across a gap lead to the same point."
        },
        "steps": [
          {
            "ko": "다리길의 이동 비용을 측정합니다.",
            "en": "Measure the bridge route’s movement cost."
          },
          {
            "ko": "지름길의 도약 조건과 실패 결과를 확인합니다.",
            "en": "Check the shortcut’s leap conditions and failure consequence."
          },
          {
            "ko": "합의된 분류와 모델 상태에 따라 경로를 정합니다.",
            "en": "Choose after checking the agreed terrain category and model state."
          }
        ],
        "result": {
          "ko": "더 짧은 길이 항상 더 안전하거나 적법한 길은 아닙니다.",
          "en": "The shorter route is not automatically safer or legal."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "틈도 평지로 간주해 거리만 빼고 모델을 놓습니다.",
            "en": "Treating a gap as open ground and only deducting distance."
          },
          "fix": {
            "ko": "지형별 판정과 착지 가능 여부까지 함께 해결합니다.",
            "en": "Resolve terrain-specific tests and landing feasibility as well."
          }
        }
      ],
      "selfCheck": {
        "ko": "이동 전에 실패 시 결과까지 확인해야 하는 이유를 말해 보세요.",
        "en": "Explain why the failure consequence should be checked before moving."
      }
    },
    {
      "lessonId": "n23-ranged-combat",
      "stepId": "profile",
      "objective": {
        "ko": "슛 전에 한 무기 프로필과 적법한 표적을 확정합니다.",
        "en": "Choose one weapon profile and a legal target before Shoot."
      },
      "preparation": [
        {
          "ko": "N23 파이터의 BS와 장비 프로필을 엽니다.",
          "en": "Open the N23 Fighter’s BS and weapon profile."
        },
        {
          "ko": "사거리·시야·엄폐를 측정할 표적을 고릅니다.",
          "en": "Identify a target whose range, visibility and cover can be checked."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "발사 모드 선언",
            "en": "Declare the firing mode"
          },
          "body": {
            "ko": "다중 모드 무기는 사용할 행 하나를 선택하고 그 행의 S·AP·D·탄약·특성을 읽습니다.",
            "en": "For a multimode weapon, select one row and read that row’s S, AP, D, Ammo and traits."
          },
          "result": {
            "ko": "다른 모드의 좋은 수치를 섞지 않습니다.",
            "en": "Do not mix favourable values from another mode."
          }
        },
        {
          "title": {
            "ko": "표적 적법성 확인",
            "en": "Check target legality"
          },
          "body": {
            "ko": "시야와 선택 프로필의 사거리를 확인하고 더 먼 표적을 고르면 표적 우선순위도 확인합니다.",
            "en": "Check visibility and the selected profile’s range, plus Target Priority if choosing a more distant target."
          },
          "result": {
            "ko": "굴리기 전에 공격 가능 여부가 확정됩니다.",
            "en": "Whether the attack is permitted is clear before rolling."
          }
        },
        {
          "title": {
            "ko": "보정 준비",
            "en": "Prepare modifiers"
          },
          "body": {
            "ko": "해당 사거리 구간의 정확도와 엄폐·조준 보정을 적습니다.",
            "en": "Write down range-band accuracy, cover and Aim modifiers."
          },
          "result": {
            "ko": "명중 계산에 쓸 값만 모읍니다.",
            "en": "Only values relevant to the hit calculation are collected."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "한 무기에 두 발사 모드가 있고 표적은 장거리 구간에 있습니다.",
          "en": "A weapon has two modes and the target is in its long-range band."
        },
        "steps": [
          {
            "ko": "선택한 모드의 이름을 먼저 선언합니다.",
            "en": "Declare the selected mode by name."
          },
          {
            "ko": "그 모드의 장거리 정확도와 S·AP·D를 읽습니다.",
            "en": "Read that mode’s long-range accuracy and S, AP and D."
          },
          {
            "ko": "표적의 시야·사거리를 확인한 뒤 BS 굴림으로 갑니다.",
            "en": "Check visibility and range, then proceed to the BS roll."
          }
        ],
        "result": {
          "ko": "공격 전체에 사용할 하나의 프로필이 정해집니다.",
          "en": "One consistent profile is established for the whole attack."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "A 모드 사거리와 B 모드 D를 합칩니다.",
            "en": "Combining mode A’s range with mode B’s Damage."
          },
          "fix": {
            "ko": "같은 행의 수치를 끝까지 사용합니다.",
            "en": "Use values from the same declared row throughout."
          }
        }
      ],
      "selfCheck": {
        "ko": "프로필의 D와 명중에 쓰는 BS를 구별했나요?",
        "en": "Did you distinguish profile Damage from BS used to hit?"
      }
    },
    {
      "lessonId": "n23-ranged-combat",
      "stepId": "modifiers",
      "objective": {
        "ko": "N23 엄폐를 세이브가 아닌 명중 굴림에 적용합니다.",
        "en": "Apply N23 cover to the hit roll rather than to the armour save."
      },
      "preparation": [
        {
          "ko": "부분 엄폐 -1, 완전 엄폐 -2, 조준 +1을 확인합니다.",
          "en": "Check partial cover −1, full cover −2 and Aim +1."
        },
        {
          "ko": "선택 프로필의 현재 사거리 정확도를 읽습니다.",
          "en": "Read the selected profile’s accuracy for the current range band."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "엄폐 종류 확인",
            "en": "Identify cover"
          },
          "body": {
            "ko": "표적이 부분 또는 완전 엄폐인지 판정하고 해당 명중 보정을 적습니다.",
            "en": "Determine partial or full cover and write its hit modifier."
          },
          "result": {
            "ko": "엄폐의 효과를 명중 단계에 배치합니다.",
            "en": "Cover is assigned to the hit step."
          }
        },
        {
          "title": {
            "ko": "보정 합산",
            "en": "Add the modifiers"
          },
          "body": {
            "ko": "정확도·조준·엄폐 보정을 각각 적고 더해 순보정을 계산합니다.",
            "en": "List accuracy, Aim and cover separately, then add them for the net modifier."
          },
          "result": {
            "ko": "보너스와 페널티가 중복되거나 누락되지 않습니다.",
            "en": "Bonuses and penalties are not omitted or counted twice."
          }
        },
        {
          "title": {
            "ko": "BS와 대조",
            "en": "Compare with BS"
          },
          "body": {
            "ko": "D6에 순보정을 적용해 BS 목표와 비교하며 자연1 실패도 확인합니다.",
            "en": "Apply the net modifier to D6, compare with BS and remember that a natural 1 fails."
          },
          "result": {
            "ko": "명중 성공 뒤에만 운드 단계로 갑니다.",
            "en": "Proceed to wound only after a successful hit."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "BS4+, 정확도0, 조준+1, 부분 엄폐-1입니다.",
          "en": "The shot has BS4+, accuracy 0, Aim +1 and partial cover −1."
        },
        "steps": [
          {
            "ko": "순보정은0+1−1=0입니다.",
            "en": "The net modifier is 0+1−1=0."
          },
          {
            "ko": "D6 결과4는 최종4 그대로입니다.",
            "en": "A D6 result of 4 remains a final 4."
          },
          {
            "ko": "4가 BS4+를 만족하므로 명중입니다.",
            "en": "4 meets BS4+, so the attack hits."
          }
        ],
        "result": {
          "ko": "엄폐와 조준이 상쇄되어 기본 BS 목표로 돌아옵니다.",
          "en": "Aim cancels the cover penalty, returning to the basic BS target."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "엄폐를 명중에도 적용하고 세이브에도 더합니다.",
            "en": "Applying cover to both the hit roll and the save."
          },
          "fix": {
            "ko": "N23의 일반 엄폐는 명중 보정으로만 처리하고 별도 특성은 따로 확인합니다.",
            "en": "Use ordinary N23 cover as a hit modifier and check separate trait exceptions independently."
          }
        }
      ],
      "selfCheck": {
        "ko": "조준하지 않은 BS4+의 부분 엄폐 사격에서 D6의4는 성공인가요?",
        "en": "Without Aim, does a raw 4 succeed for BS4+ against partial cover?"
      }
    },
    {
      "lessonId": "n23-ranged-combat",
      "stepId": "hit-practice",
      "objective": {
        "ko": "순보정을 계산한 뒤 실제 D6 결과로 명중 여부를 결정합니다.",
        "en": "Calculate the net modifier before deciding a hit from the actual D6."
      },
      "preparation": [
        {
          "ko": "BS4+, 정확도0, 조준+1, 부분 엄폐-1을 적습니다.",
          "en": "Write down BS4+, accuracy 0, Aim +1 and partial cover −1."
        },
        {
          "ko": "이번 문제의 자연 주사위 결과는4입니다.",
          "en": "The natural die result in this exercise is 4."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "상쇄 계산",
            "en": "Calculate cancellation"
          },
          "body": {
            "ko": "+1과-1을 더하면0입니다. 서로 다른 효과라는 표시를 유지합니다.",
            "en": "Adding +1 and −1 gives zero; retain the labels showing their different sources."
          },
          "result": {
            "ko": "계산을 되짚을 수 있습니다.",
            "en": "The calculation remains auditable."
          }
        },
        {
          "title": {
            "ko": "주사위에 적용",
            "en": "Apply to the die"
          },
          "body": {
            "ko": "굴린4에0을 더해 최종4를 얻습니다.",
            "en": "Add zero to the rolled 4 for a final result of 4."
          },
          "result": {
            "ko": "명중 판정 값이 정해집니다.",
            "en": "The hit-check value is established."
          }
        },
        {
          "title": {
            "ko": "목표와 비교",
            "en": "Compare with the target"
          },
          "body": {
            "ko": "최종4는 BS4+를 충족하며 자연1도 아닙니다.",
            "en": "The final 4 meets BS4+ and is not a natural 1."
          },
          "result": {
            "ko": "공격은 명중해 운드 판정으로 이어집니다.",
            "en": "The attack hits and proceeds to wound."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "표적은 부분 엄폐지만 슈터가 조준했습니다.",
          "en": "The target has partial cover, but the shooter aimed."
        },
        "steps": [
          {
            "ko": "엄폐는 자동 실패가 아니라-1입니다.",
            "en": "Cover gives −1 rather than an automatic miss."
          },
          {
            "ko": "조준+1과 합쳐 순보정0입니다.",
            "en": "Aim +1 makes the net modifier zero."
          },
          {
            "ko": "D6의4로 BS4+를 만족합니다.",
            "en": "The rolled 4 meets BS4+."
          }
        ],
        "result": {
          "ko": "정답은 최종4로 명중입니다.",
          "en": "The correct outcome is a hit on the final 4."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "엄폐가 있다는 이유로 항상6이 필요하다고 처리합니다.",
            "en": "Assuming every shot into cover always needs a 6."
          },
          "fix": {
            "ko": "BS와 실제 순보정을 계산해서 이번 목표를 판단합니다.",
            "en": "Use BS and the actual net modifier to decide this shot."
          }
        }
      ],
      "selfCheck": {
        "ko": "보정이 모두0이라도 자연1은 왜 여전히 실패인가요?",
        "en": "Why does a natural 1 still fail even if all modifiers total zero?"
      },
      "hint": {
        "ko": "조준+1과 부분 엄폐-1을 먼저 합쳐 보세요.",
        "en": "Add Aim +1 and partial cover −1 before comparing BS."
      },
      "optionFeedback": {
        "1": {
          "ko": "순보정0이므로 굴린4가BS4+를 만족합니다.",
          "en": "The net modifier is zero, so the rolled 4 meets BS4+."
        },
        "2": {
          "ko": "N23 부분 엄폐는-1 명중 보정이며 자동 실패가 아닙니다.",
          "en": "N23 partial cover is a −1 hit modifier, not an automatic miss."
        },
        "3": {
          "ko": "이번에는+1과-1이 상쇄돼6이 아닌4+가 필요합니다.",
          "en": "Here +1 and −1 cancel, so the required target remains 4+, not always 6."
        }
      }
    },
    {
      "lessonId": "n23-ranged-combat",
      "stepId": "pin-ammo",
      "objective": {
        "ko": "제압·운드·탄약 실패를 각각 알맞은 시점에 적용합니다.",
        "en": "Apply pinning, wounding and ammunition failure at their own timings."
      },
      "preparation": [
        {
          "ko": "표적이 서서 활성 상태인지 확인합니다.",
          "en": "Check whether the target is Standing and Active."
        },
        {
          "ko": "사용 무기의 탄약 값과 발사 주사위 결과를 준비합니다.",
          "en": "Have the weapon’s Ammo value and firepower result available."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "명중에 따른 제압",
            "en": "Pin from the hit"
          },
          "body": {
            "ko": "서서 활성인 파이터가 원거리 명중을 받으면 일반 제압 조건을 확인합니다.",
            "en": "When a Standing Active Fighter is hit by ranged fire, check the ordinary pinning trigger."
          },
          "result": {
            "ko": "운드 성공 여부와 별개로 제압을 기록합니다.",
            "en": "Pinning is recorded separately from whether the shot wounds."
          }
        },
        {
          "title": {
            "ko": "탄약 기호 처리",
            "en": "Handle the Ammo symbol"
          },
          "body": {
            "ko": "탄약 기호가 나왔다면 해당 탄약 판정을 합니다.",
            "en": "If an Ammo symbol appears, make the relevant Ammo test."
          },
          "result": {
            "ko": "탄약 실패 여부가 기록됩니다.",
            "en": "The ammunition result is known."
          }
        },
        {
          "title": {
            "ko": "현재 공격 마무리",
            "en": "Finish this attack"
          },
          "body": {
            "ko": "탄약에 실패해도 이미 진행 중인 공격의 운드·세이브·피해는 끝까지 해결합니다.",
            "en": "Even on Ammo failure, finish the current attack’s wound, save and damage resolution."
          },
          "result": {
            "ko": "현재 공격과 이후 무기 사용 가능 여부를 분리합니다.",
            "en": "This attack is kept separate from future weapon availability."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "사격이 명중했지만 운드에 실패했고 탄약 판정도 실패했습니다.",
          "en": "A shot hits but fails to wound, and its Ammo test fails too."
        },
        "steps": [
          {
            "ko": "명중을 받은 서 있는 표적의 제압을 확인합니다.",
            "en": "Check pinning for the standing target that was hit."
          },
          {
            "ko": "실패한 운드로 피해는 발생하지 않습니다.",
            "en": "The failed wound causes no Damage."
          },
          {
            "ko": "탄약 상태는 기록하되 제압을 자동 취소하지 않습니다.",
            "en": "Record ammunition status without automatically cancelling pinning."
          }
        ],
        "result": {
          "ko": "피해 없음·제압 가능·탄약 소진을 별개로 기록합니다.",
          "en": "No damage, possible pinning and exhausted ammunition are separate outcomes."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "세이브 성공 또는 탄약 실패를 이유로 앞선 명중 전체를 취소합니다.",
            "en": "Cancelling the whole hit because a save succeeds or ammunition fails."
          },
          "fix": {
            "ko": "이미 발생한 명중·제압과 후속 피해·탄약 결과를 순서대로 분리합니다.",
            "en": "Keep the earlier hit and pinning distinct from later damage and ammo results."
          }
        }
      ],
      "selfCheck": {
        "ko": "탄약 실패가 현재 공격과 다음 사격에 미치는 영향을 각각 설명할 수 있나요?",
        "en": "Can you describe Ammo failure’s effects on this attack and on the next shot separately?"
      }
    },
    {
      "lessonId": "n23-ranged-combat",
      "stepId": "wound-practice",
      "objective": {
        "ko": "S4 대 T3를 두 배 경계와 비교해3+로 판정합니다.",
        "en": "Compare S4 against T3 and the double-strength boundary to determine 3+."
      },
      "preparation": [
        {
          "ko": "S4, T3이며 명중은 이미 성공했다고 둡니다.",
          "en": "Assume S4, T3 and an already successful hit."
        },
        {
          "ko": "S와 T 비교표를 확인합니다.",
          "en": "Have the S-versus-T table available."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "크기 비교",
            "en": "Compare the values"
          },
          "body": {
            "ko": "4는3보다 높으므로 S>T 구간입니다.",
            "en": "4 exceeds 3, so S is greater than T."
          },
          "result": {
            "ko": "동일값4+ 구간이 아닙니다.",
            "en": "This is not the equal-value 4+ band."
          }
        },
        {
          "title": {
            "ko": "두 배 경계 확인",
            "en": "Check the double boundary"
          },
          "body": {
            "ko": "T의 두 배는6이며 S4는6보다 낮습니다.",
            "en": "Double T is 6, and S4 is less than 6."
          },
          "result": {
            "ko": "두 배 이상2+ 구간도 아닙니다.",
            "en": "This is not the double-or-greater 2+ band either."
          }
        },
        {
          "title": {
            "ko": "목표 선택",
            "en": "Select the target"
          },
          "body": {
            "ko": "T<S<2T 조건에 따라3+를 사용합니다.",
            "en": "Use 3+ for the T<S<2T condition."
          },
          "result": {
            "ko": "BS나 AP를 운드 목표에 다시 적용하지 않습니다.",
            "en": "Do not reuse BS or AP as wound-target modifiers."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "S4 무기가 T3 표적에 한 발 명중했습니다.",
          "en": "An S4 weapon hits a T3 target once."
        },
        "steps": [
          {
            "ko": "3<4<6을 적어 비교 구간을 확정합니다.",
            "en": "Write 3<4<6 to establish the band."
          },
          {
            "ko": "운드 D6의3은3+를 충족합니다.",
            "en": "A wound die of 3 meets the 3+ target."
          },
          {
            "ko": "이후에 AP와 방어구 세이브를 확인합니다.",
            "en": "Then check AP and the armour save."
          }
        ],
        "result": {
          "ko": "운드 목표는3+이고 세이브는 그 다음 절차입니다.",
          "en": "The wound target is 3+; saving follows afterward."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "S가 T보다 높으면 무조건2+로 굴립니다.",
            "en": "Using 2+ whenever S is greater than T."
          },
          "fix": {
            "ko": "2+는 S가 T의 두 배 이상인지 확인해야 합니다.",
            "en": "Check whether S is at least double T before using 2+."
          }
        }
      ],
      "selfCheck": {
        "ko": "S4 대 T4라면 같은 표의 어느 구간으로 바뀌나요?",
        "en": "Which table band applies if S4 faces T4 instead?"
      },
      "hint": {
        "ko": "S4는T3보다 높고T의 두 배인6보다 낮습니다.",
        "en": "S4 is above T3 but below double T, which is 6."
      },
      "optionFeedback": {
        "1": {
          "ko": "T<S<2T이므로 운드는3+입니다.",
          "en": "T<S<2T gives a 3+ wound target."
        },
        "2": {
          "ko": "4+는S와T가 같은 구간입니다.",
          "en": "4+ is the equal-S-and-T band."
        },
        "3": {
          "ko": "2+를 쓰려면S가T의 두 배 이상이어야 합니다.",
          "en": "2+ requires S to be at least double T."
        }
      }
    },
    {
      "lessonId": "n23-ranged-combat",
      "stepId": "save",
      "objective": {
        "ko": "AP를 방어구에 적용한 뒤 실패한 명중의 D만 처리합니다.",
        "en": "Apply AP to armour, then resolve D only for an unsaved hit."
      },
      "preparation": [
        {
          "ko": "운드가 성공한 공격의 AP와 D를 읽습니다.",
          "en": "Read AP and D for an attack that successfully wounded."
        },
        {
          "ko": "표적의 방어구 세이브와 남은 W를 준비합니다.",
          "en": "Have the target’s armour save and remaining W ready."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "세이브 목표 조정",
            "en": "Adjust the save"
          },
          "body": {
            "ko": "예를 들어5+ 방어구에 AP-1이면 일반 방어구 세이브는6+가 됩니다.",
            "en": "For example, AP −1 turns an ordinary 5+ armour save into 6+."
          },
          "result": {
            "ko": "AP는 운드 목표를 바꾸지 않습니다.",
            "en": "AP does not change the wound target."
          }
        },
        {
          "title": {
            "ko": "세이브 굴림",
            "en": "Roll the save"
          },
          "body": {
            "ko": "수정된 세이브 목표로 판정하고 성공한 명중에는 일반 피해를 적용하지 않습니다.",
            "en": "Test against the modified save target and do not apply ordinary Damage for a saved hit."
          },
          "result": {
            "ko": "실패한 공격만 피해 단계로 넘어갑니다.",
            "en": "Only an unsaved attack proceeds to Damage."
          }
        },
        {
          "title": {
            "ko": "D와 W 대조",
            "en": "Compare D and W"
          },
          "body": {
            "ko": "실패하면 해당 공격의 D만큼 W를 줄이고0 도달·초과 피해를 추적합니다.",
            "en": "On failure, reduce W by that attack’s D and track reaching zero and any excess."
          },
          "result": {
            "ko": "필요한 부상 주사위를 계산할 수 있습니다.",
            "en": "The required Injury dice can then be calculated."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "방어구5+, AP-1, 남은W2, 공격D3입니다.",
          "en": "The target has armour 5+, AP −1, W2 remaining and suffers a D3 attack."
        },
        "steps": [
          {
            "ko": "세이브는6+로 바뀝니다.",
            "en": "The save becomes 6+."
          },
          {
            "ko": "D6의5는 실패하므로 D3을 처리합니다.",
            "en": "A save roll of 5 fails, so apply Damage 3."
          },
          {
            "ko": "두 피해로W0, 남는 한 피해로 추가 부상 주사위가 생깁니다.",
            "en": "Two damage reach W0 and the remaining point creates an additional Injury die."
          }
        ],
        "result": {
          "ko": "이 공격은 부상 주사위2개로 이어집니다.",
          "en": "This attack leads to two Injury dice."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "D3을 세이브 주사위 세 개로 해석합니다.",
            "en": "Treating D3 as three separate armour save dice."
          },
          "fix": {
            "ko": "이번 공격의 세이브와 실패 후 피해량을 구분합니다.",
            "en": "Separate the attack’s save from the amount of Damage after failure."
          }
        }
      ],
      "selfCheck": {
        "ko": "AP-1과 D3이 서로 다른 단계에서 쓰이는 이유를 설명해 보세요.",
        "en": "Explain why AP −1 and Damage 3 are used at different steps."
      }
    },
    {
      "lessonId": "n23-close-combat",
      "stepId": "engaged",
      "objective": {
        "ko": "교전 상태와 선택 무기 제한을 굴림 전에 확인합니다.",
        "en": "Check engagement and weapon selection restrictions before rolling."
      },
      "preparation": [
        {
          "ko": "현재 파이터가 적과 교전 중인지 확인합니다.",
          "en": "Check whether the Fighter is Engaged."
        },
        {
          "ko": "사용할 근접·사이드암 무기와 언위얼디 특성을 읽습니다.",
          "en": "Read the intended Melee or Sidearm weapons and any Unwieldy trait."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "행동 경로 선택",
            "en": "Identify the attack source"
          },
          "body": {
            "ko": "교전 중 파이트 베이식인지, 성공한 차지에 포함된 공격인지 확인합니다.",
            "en": "Identify whether the attack comes from Fight (Basic) while Engaged or a successful Charge."
          },
          "result": {
            "ko": "공격 권한과 행동 비용이 분명해집니다.",
            "en": "The source of the attack and its action cost are clear."
          }
        },
        {
          "title": {
            "ko": "방향과 무기 선언",
            "en": "Declare facing and weapons"
          },
          "body": {
            "ko": "대상 방향과 사용할 무기를 정하고 보통 두 개까지의 적법한 선택인지 검사합니다.",
            "en": "Declare facing and weapons, checking the ordinary limit of up to two legal selections."
          },
          "result": {
            "ko": "무기를 굴림 후에 바꾸지 않습니다.",
            "en": "Weapons are not switched after seeing dice."
          }
        },
        {
          "title": {
            "ko": "특수 제한 검토",
            "en": "Review special restrictions"
          },
          "body": {
            "ko": "언위얼디와 사이드암의 별도 제한을 확인합니다. 근접 사이드암의 명중도 WS를 씁니다.",
            "en": "Check separate Unwieldy and Sidearm restrictions; a Sidearm in melee still hits using WS."
          },
          "result": {
            "ko": "원거리 BS와 정확도를 가져오지 않습니다.",
            "en": "Do not import ranged BS or accuracy."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "파이터가 적과 교전 중이고 칼과 사이드암을 갖고 있습니다.",
          "en": "A Fighter is Engaged and carries a knife and Sidearm."
        },
        "steps": [
          {
            "ko": "파이트 베이식을 선언할 수 있는 상태인지 확인합니다.",
            "en": "Check that the state permits Fight (Basic)."
          },
          {
            "ko": "두 무기가 이번 공격에 적법한지 특성을 읽습니다.",
            "en": "Read traits to check that the two weapons are legal for this attack."
          },
          {
            "ko": "명중은 WS로 처리할 계획을 세웁니다.",
            "en": "Plan to resolve the attacks using WS."
          }
        ],
        "result": {
          "ko": "보유 무기와 실제 선택 무기를 구분해 공격을 시작합니다.",
          "en": "Begin after distinguishing carried weapons from those selected for the attack."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "보유한 세 무기를 전부 같은 근접전에 사용합니다.",
            "en": "Using all three carried weapons in one ordinary melee attack."
          },
          "fix": {
            "ko": "보통 선택 무기 수와 해당 특성의 예외를 먼저 확인합니다.",
            "en": "Check the normal weapon-selection limit and applicable exceptions first."
          }
        }
      ],
      "selfCheck": {
        "ko": "사이드암을 근접전에 쓰면 BS가 아니라 무엇으로 명중을 굴리나요?",
        "en": "Which characteristic hits with a Sidearm in melee instead of BS?"
      }
    },
    {
      "lessonId": "n23-close-combat",
      "stepId": "dice",
      "objective": {
        "ko": "A에 차지와 적법한 쌍수 보너스를 더하고 주사위를 배분합니다.",
        "en": "Add Charge and legal paired-weapon bonuses to A and allocate the dice."
      },
      "preparation": [
        {
          "ko": "파이터의 A와 차지 성공 여부를 확인합니다.",
          "en": "Check A and whether the Fighter charged successfully."
        },
        {
          "ko": "선택한 두 무기가 쌍수 보너스 조건을 만족하는지 봅니다.",
          "en": "Check whether the chosen weapons qualify for the paired-weapon bonus."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "기본 공격 수 적기",
            "en": "Record base attacks"
          },
          "body": {
            "ko": "현재 A에서 시작하고 상황에 맞는 보너스만 적습니다.",
            "en": "Start from the current A and list only applicable bonuses."
          },
          "result": {
            "ko": "A를 두 무기 각각에 중복 부여하지 않습니다.",
            "en": "Do not award the full A separately to each weapon."
          }
        },
        {
          "title": {
            "ko": "합계 계산",
            "en": "Calculate the total"
          },
          "body": {
            "ko": "차지+1과 적법한 쌍수+1을 해당되는 경우 더합니다.",
            "en": "Add +1 for Charge and +1 for a legal weapon pair when applicable."
          },
          "result": {
            "ko": "이번 근접전 전체의 주사위 수가 나옵니다.",
            "en": "You have the total attack pool for this melee."
          }
        },
        {
          "title": {
            "ko": "무기별 배분",
            "en": "Allocate by weapon"
          },
          "body": {
            "ko": "두 무기는 최대한 균등하게 배분하되 사이드암은 하나당 주사위 한 개 제한을 확인합니다.",
            "en": "Split two-weapon dice as evenly as possible while checking the one-die-per-Sidearm limit."
          },
          "result": {
            "ko": "각 무기의 S·AP·D로 별도 해결할 수 있습니다.",
            "en": "Each weapon can be resolved with its own S, AP and D."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "A2 파이터가 적법한 근접 무기 두 개로 차지했습니다.",
          "en": "An A2 Fighter charged with a legal pair of Melee weapons."
        },
        "steps": [
          {
            "ko": "기본2에 차지1을 더해3을 만듭니다.",
            "en": "Add one for Charge to the base two, giving three."
          },
          {
            "ko": "쌍수1을 더해 총4가 됩니다.",
            "en": "Add one for the pair, giving four total."
          },
          {
            "ko": "두 근접 무기에2개씩 배분합니다.",
            "en": "Allocate two dice to each Melee weapon."
          }
        ],
        "result": {
          "ko": "공격 주사위4개이며 각 무기에2개입니다.",
          "en": "There are four attack dice, two for each weapon."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "A2를 각 무기에 주어 보너스 전부터4개를 만듭니다.",
            "en": "Giving A2 to each weapon and starting at four before bonuses."
          },
          "fix": {
            "ko": "A는 기본 전체 풀 하나이며 그 위에 보너스를 더합니다.",
            "en": "A is one base pool to which bonuses are added."
          }
        }
      ],
      "selfCheck": {
        "ko": "주사위가 홀수이거나 사이드암이 포함되면 배분을 다시 확인했나요?",
        "en": "Did you recheck allocation when the pool is odd or includes a Sidearm?"
      }
    },
    {
      "lessonId": "n23-close-combat",
      "stepId": "dice-practice",
      "objective": {
        "ko": "차지 쌍수의 총4개를 두 무기에2개씩 배분합니다.",
        "en": "Allocate the four charge-and-pair dice as two per weapon."
      },
      "preparation": [
        {
          "ko": "A2, 차지 성공, 적법한 근접 무기 두 개를 사용합니다.",
          "en": "Use A2, a successful charge and two legal Melee weapons."
        },
        {
          "ko": "스킬·특성의 추가 보너스는 없다고 둡니다.",
          "en": "Assume no further skill or trait bonuses."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "보너스 원인 확인",
            "en": "Identify bonus sources"
          },
          "body": {
            "ko": "차지 보너스와 쌍수 보너스가 각각 충족됐는지 확인합니다.",
            "en": "Confirm that the Charge and paired-weapon bonuses both apply."
          },
          "result": {
            "ko": "두 보너스의 이유가 구분됩니다.",
            "en": "The two bonus sources are distinct."
          }
        },
        {
          "title": {
            "ko": "합산",
            "en": "Add the pool"
          },
          "body": {
            "ko": "2+1+1=4로 총 주사위를 계산합니다.",
            "en": "Calculate the pool as 2+1+1=4."
          },
          "result": {
            "ko": "세 개나 두 개로 줄이지 않습니다.",
            "en": "Do not incorrectly reduce the total to three or two."
          }
        },
        {
          "title": {
            "ko": "균등 배분",
            "en": "Split evenly"
          },
          "body": {
            "ko": "무기가 둘이고 주사위가4개이므로2개씩 배분합니다.",
            "en": "With two weapons and four dice, allocate two to each."
          },
          "result": {
            "ko": "각 무기의 결과를 구별해 굴릴 수 있습니다.",
            "en": "The weapons’ results can be tracked separately."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "빨간 주사위는 무기A, 흰 주사위는 무기B로 둡니다.",
          "en": "Use red dice for weapon A and white dice for weapon B."
        },
        "steps": [
          {
            "ko": "총4개 주사위를 준비합니다.",
            "en": "Prepare four dice in total."
          },
          {
            "ko": "빨간2개와 흰2개로 나눕니다.",
            "en": "Split them into two red and two white."
          },
          {
            "ko": "각 색은 자기 무기 프로필로 이후 운드·세이브를 처리합니다.",
            "en": "Resolve each colour’s wounds and saves with its own weapon profile."
          }
        ],
        "result": {
          "ko": "무기별 배분까지 포함한 정답은2+2입니다.",
          "en": "The full allocation is two plus two."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "N26의 주무기·보조무기 배분을 이 예시에 적용합니다.",
            "en": "Importing N26 primary/offhand allocation into this example."
          },
          "fix": {
            "ko": "선택 판본은N23이며 두 근접 무기에 균등 배분합니다.",
            "en": "This is N23; split the two Melee weapons’ dice evenly."
          }
        }
      ],
      "selfCheck": {
        "ko": "각 무기에 배분한2개는 총 공격4개 안에 포함되나요, 추가되나요?",
        "en": "Are the two dice per weapon part of the total four, or added on top?"
      },
      "hint": {
        "ko": "기본A2에차지1과쌍수1을 더하고 두 무기에 나누세요.",
        "en": "Add Charge 1 and pair 1 to base A2, then divide between the weapons."
      },
      "optionFeedback": {
        "1": {
          "ko": "2+1+1=4이며 적법한 근접 무기 두 개에2개씩입니다.",
          "en": "2+1+1=4, split two each between the legal Melee weapons."
        },
        "2": {
          "ko": "적법한 쌍수 보너스+1을 빠뜨렸습니다.",
          "en": "This omits the legal paired-weapon +1 bonus."
        },
        "3": {
          "ko": "차지와 쌍수 보너스 두 가지를 모두 빠뜨렸습니다.",
          "en": "This omits both Charge and paired-weapon bonuses."
        }
      }
    },
    {
      "lessonId": "n23-close-combat",
      "stepId": "hits",
      "objective": {
        "ko": "WS 명중과 무기별 S·AP·D를 분리해 해결합니다.",
        "en": "Resolve WS hits and each weapon’s S, AP and D separately."
      },
      "preparation": [
        {
          "ko": "배분한 공격 주사위를 무기별 색으로 나눕니다.",
          "en": "Use different dice colours for each allocated weapon."
        },
        {
          "ko": "WS와 지원·방해·방향 보정 조건을 읽습니다.",
          "en": "Read WS and the conditions for assists, interference and facing modifiers."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "표적·무기별 묶기",
            "en": "Group by target and weapon"
          },
          "body": {
            "ko": "어느 주사위가 어느 무기와 표적의 것인지 굴리기 전에 정합니다.",
            "en": "Assign each die to its weapon and target before rolling."
          },
          "result": {
            "ko": "굴림 후 유리한 프로필로 옮기지 않습니다.",
            "en": "Do not move successful dice to a favourable profile afterward."
          }
        },
        {
          "title": {
            "ko": "WS 명중 해결",
            "en": "Resolve WS hits"
          },
          "body": {
            "ko": "조건에 맞는 근접 보정을 적용해 WS로 명중합니다.",
            "en": "Apply relevant melee modifiers and roll to hit using WS."
          },
          "result": {
            "ko": "사이드암도 이 단계는 WS입니다.",
            "en": "A Sidearm also uses WS at this step."
          }
        },
        {
          "title": {
            "ko": "무기별 후속 판정",
            "en": "Resolve follow-up per weapon"
          },
          "body": {
            "ko": "명중한 각 무기의 S 대T, AP 세이브, D와 특성을 차례로 적용합니다.",
            "en": "For each weapon’s hits, resolve S versus T, AP saves, D and traits in order."
          },
          "result": {
            "ko": "서로 다른 피해량과 특성이 섞이지 않습니다.",
            "en": "Different Damage values and traits stay separate."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "무기A와B의 S·AP·D가 다르고 각각 한 번 명중했습니다.",
          "en": "Weapons A and B have different S, AP and D and each scores one hit."
        },
        "steps": [
          {
            "ko": "A의 명중 하나를A 프로필로 해결합니다.",
            "en": "Resolve A’s one hit using profile A."
          },
          {
            "ko": "B의 명중 하나를B 프로필로 해결합니다.",
            "en": "Resolve B’s one hit using profile B."
          },
          {
            "ko": "각 공격 뒤 바뀐 표적 상태를 다음 처리에 반영합니다.",
            "en": "Account for changed target state after each attack."
          }
        ],
        "result": {
          "ko": "명중 두 개를 하나의 가장 강한 프로필로 처리하지 않습니다.",
          "en": "The two hits are not combined under the strongest profile."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "사이드암에 BS와 원거리 정확도 보너스를 적용합니다.",
            "en": "Applying BS and ranged accuracy bonuses to a melee Sidearm."
          },
          "fix": {
            "ko": "근접 명중은 WS를 사용하고 사격용 정확도는 제외합니다.",
            "en": "Use WS for melee hits and exclude ranged accuracy."
          }
        }
      ],
      "selfCheck": {
        "ko": "두 무기의 D가 다를 때 어떤 기록을 분리해야 하나요?",
        "en": "What must remain separate when the two weapons have different D?"
      }
    },
    {
      "lessonId": "n23-close-combat",
      "stepId": "reactions",
      "objective": {
        "ko": "공격자 해결 후 살아남은 교전 적의 반격 가능 여부를 다시 봅니다.",
        "en": "After the attacker resolves, reassess surviving engaged enemies for Reaction attacks."
      },
      "preparation": [
        {
          "ko": "누가 현재 활성 공격자인지 표시합니다.",
          "en": "Mark the active attacker."
        },
        {
          "ko": "적의 현재 교전·중상·OOA 상태를 구분합니다.",
          "en": "Distinguish the enemy’s Engaged, Seriously Injured and OOA states."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "공격자 먼저 해결",
            "en": "Resolve the attacker first"
          },
          "body": {
            "ko": "N23의 일반 근접전에서는 활성 공격자의 공격을 먼저 끝냅니다.",
            "en": "In ordinary N23 melee, finish the active attacker’s attacks first."
          },
          "result": {
            "ko": "이니셔티브 순서로 서로 섞어 굴리지 않습니다.",
            "en": "Do not interleave attacks by Initiative order."
          }
        },
        {
          "title": {
            "ko": "결과 상태 갱신",
            "en": "Update resulting states"
          },
          "body": {
            "ko": "운드·부상 결과를 적용해 누가 여전히 서서 교전 중인지 확인합니다.",
            "en": "Apply wounds and injuries, then check who remains standing and Engaged."
          },
          "result": {
            "ko": "이미 OOA가 된 적을 반격자로 고르지 않습니다.",
            "en": "Do not select an enemy already taken OOA to react."
          }
        },
        {
          "title": {
            "ko": "적법한 반격 해결",
            "en": "Resolve eligible reactions"
          },
          "body": {
            "ko": "조건을 만족하는 남은 적의 반격을 해결합니다.",
            "en": "Resolve Reaction attacks from remaining eligible enemies."
          },
          "result": {
            "ko": "공격 결과가 반격 가능성을 바꿀 수 있습니다.",
            "en": "The attacker’s results can change reaction eligibility."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "공격자가 먼저 적에게 중상을 줬습니다.",
          "en": "The active attacker first makes the enemy Seriously Injured."
        },
        "steps": [
          {
            "ko": "공격자의 전체 해결을 먼저 마칩니다.",
            "en": "Complete the attacker’s resolution first."
          },
          {
            "ko": "적의 상태를 중상으로 갱신합니다.",
            "en": "Update the enemy to Seriously Injured."
          },
          {
            "ko": "서서 교전 중인 일반 적과 다른 상태임을 확인하고 반격 적법성을 봅니다.",
            "en": "Recheck reaction legality for this changed state instead of treating it as ordinarily standing and Engaged."
          }
        ],
        "result": {
          "ko": "반격은 공격자 결과를 적용한 뒤에 검토합니다.",
          "en": "Reaction eligibility is reviewed after applying the attacker’s results."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "적의 높은 이니셔티브를 이유로 먼저 반격시킵니다.",
            "en": "Letting the enemy react first merely because it has higher Initiative."
          },
          "fix": {
            "ko": "N23의 공격자 먼저·이후 반격 순서를 따릅니다.",
            "en": "Follow N23 attacker-first, then-reaction ordering."
          }
        }
      ],
      "selfCheck": {
        "ko": "공격자와 반격자가 동시에 굴리지 않는 이유를 상태 변화로 설명할 수 있나요?",
        "en": "Can you use state changes to explain why attacker and reactor do not simply roll together?"
      },
      "hint": {
        "ko": "공격자의 결과가 적을중상·OOA로 바꿀 수 있다는 점을 생각하세요.",
        "en": "Remember that the attacker’s results can make an enemy Seriously Injured or OOA."
      },
      "optionFeedback": {
        "1": {
          "ko": "공격자 해결로 바뀐 상태를 적용한 뒤 남은 적의 반격을 확인합니다.",
          "en": "Apply state changes from the attacker, then check remaining enemies’ reactions."
        },
        "2": {
          "ko": "일반N23 근접전은 모든 공격을 항상 동시에 처리하지 않습니다.",
          "en": "Ordinary N23 melee does not always resolve all attacks simultaneously."
        },
        "3": {
          "ko": "이 문제에N26의수정이니셔티브 순서를 가져오면 안 됩니다.",
          "en": "Do not import N26 modified-Initiative ordering into this exercise."
        }
      }
    },
    {
      "lessonId": "n23-close-combat",
      "stepId": "finish",
      "objective": {
        "ko": "공격 후 교전 해제 여부를 확인하고 정리 이동 또는 적법한 최후의 일격을 고릅니다.",
        "en": "Check whether engagement has ended, then choose consolidation or an eligible Coup de Grâce."
      },
      "preparation": [
        {
          "ko": "공격 후 남은 적의 위치와 상태를 확인합니다.",
          "en": "Check remaining enemies’ positions and states after attacks."
        },
        {
          "ko": "정리 이동 최대2인치와 무료 최후의 일격 조건을 준비합니다.",
          "en": "Have the up-to-2-inch consolidation and free Coup de Grâce conditions ready."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "남은 교전 확인",
            "en": "Check remaining engagement"
          },
          "body": {
            "ko": "처음 공격한 적뿐 아니라 다른 적과 여전히 교전 중인지 확인합니다.",
            "en": "Check engagement with other enemies, not just the original target."
          },
          "result": {
            "ko": "공격 후 선택의 전제 조건이 분명해집니다.",
            "en": "The prerequisite for post-fight choices is clear."
          }
        },
        {
          "title": {
            "ko": "후속 선택 검사",
            "en": "Check the follow-up choice"
          },
          "body": {
            "ko": "더 이상 교전 중이 아니면 최대2인치 정리 이동 또는 조건을 만족하는 무료 최후의 일격을 검토합니다.",
            "en": "If no longer Engaged, consider consolidation up to 2 inches or an eligible free Coup de Grâce."
          },
          "result": {
            "ko": "무조건 두 가지를 연속으로 얻는 것으로 처리하지 않습니다.",
            "en": "Do not assume both are automatically granted in sequence."
          }
        },
        {
          "title": {
            "ko": "결과 기록",
            "en": "Record the outcome"
          },
          "body": {
            "ko": "최후의 일격으로 OOA가 되면 전투 상태를 바꾸고 이후 캠페인 정산에 포함합니다.",
            "en": "If Coup de Grâce takes the enemy OOA, record the battle state for later campaign resolution."
          },
          "result": {
            "ko": "모델 제거와 파이터 명단 삭제는 구분됩니다.",
            "en": "Removing the model is distinct from deleting its roster record."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "적A는 중상이고 다른 적B가 여전히 파이터와 교전 중입니다.",
          "en": "Enemy A is Seriously Injured, while enemy B remains Engaged with the Fighter."
        },
        "steps": [
          {
            "ko": "A에게 중상을 줬다는 사실만으로 교전 해제를 선언하지 않습니다.",
            "en": "Do not declare engagement ended just because A was injured."
          },
          {
            "ko": "B와의 교전 관계를 다시 확인합니다.",
            "en": "Recheck the engagement with B."
          },
          {
            "ko": "그 제한을 고려해 무료 후속 행동이 가능한지 판단합니다.",
            "en": "Use that restriction when deciding whether the free follow-up is legal."
          }
        ],
        "result": {
          "ko": "중상 표적의 존재만으로 다른 교전 제한을 무시할 수 없습니다.",
          "en": "A Seriously Injured target does not erase engagement restrictions from another enemy."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "중상 적이 보이면 무조건 정리 이동과 최후의 일격을 모두 합니다.",
            "en": "Automatically taking both consolidation and Coup de Grâce whenever an injured enemy exists."
          },
          "fix": {
            "ko": "교전 여부와 대상 조건을 확인하고 허용된 선택만 적용합니다.",
            "en": "Check engagement and target conditions, then use only the permitted choice."
          }
        }
      ],
      "selfCheck": {
        "ko": "정리 이동2인치는 언제나 추가되는 보통 무브와 같은가요?",
        "en": "Is a 2-inch consolidation an ordinary extra Move granted in every case?"
      }
    },
    {
      "lessonId": "n23-injury-recovery",
      "stepId": "damage",
      "objective": {
        "ko": "한 공격의 D를 남은 W와 대조해 부상 주사위를 계산합니다.",
        "en": "Compare one attack’s D with remaining W to calculate Injury dice."
      },
      "preparation": [
        {
          "ko": "세이브에 실패한 공격의 D와 현재 남은 W를 적습니다.",
          "en": "Write down the unsaved attack’s D and the current remaining W."
        },
        {
          "ko": "현재 처리하는 명중 하나를 다른 명중과 분리합니다.",
          "en": "Keep this hit separate from other hits."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "남은 W부터 감소",
            "en": "Reduce remaining W first"
          },
          "body": {
            "ko": "D를 한 점씩 처리하며 W가0이 되기 전까지 남은 W를 줄입니다.",
            "en": "Apply D point by point, reducing the remaining W until it reaches zero."
          },
          "result": {
            "ko": "출발 W를 명확히 추적합니다.",
            "en": "The starting W is explicitly tracked."
          }
        },
        {
          "title": {
            "ko": "W0 도달 표시",
            "en": "Mark reaching W0"
          },
          "body": {
            "ko": "W0을 만드는 피해 점에서 첫 부상 주사위 하나가 생깁니다.",
            "en": "The point that reduces W to zero generates the first Injury die."
          },
          "result": {
            "ko": "D 전체를 곧바로 주사위 수로 바꾸지 않습니다.",
            "en": "Do not turn the whole D directly into a die count."
          }
        },
        {
          "title": {
            "ko": "초과 피해 추가",
            "en": "Add excess Damage"
          },
          "body": {
            "ko": "같은 공격에 남아 있는 피해 한 점마다 부상 주사위를 하나씩 더합니다.",
            "en": "For each remaining damage point of the same attack, add one Injury die."
          },
          "result": {
            "ko": "W0 도달분과 초과분을 구분합니다.",
            "en": "The reaching-zero point and excess points are distinct."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "W2 파이터가 D3 공격의 세이브를 실패했습니다.",
          "en": "A W2 Fighter fails the save against a D3 attack."
        },
        "steps": [
          {
            "ko": "첫 피해 후W1입니다.",
            "en": "The first point leaves W1."
          },
          {
            "ko": "두 번째 피해가W0을 만들어 주사위 하나입니다.",
            "en": "The second reaches W0 and generates one die."
          },
          {
            "ko": "세 번째는 초과 피해여서 주사위 하나를 더합니다.",
            "en": "The third is excess damage and adds one die."
          }
        ],
        "result": {
          "ko": "굴릴 부상 주사위는 총2개입니다.",
          "en": "Roll two Injury dice in total."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "D3이므로 남은 W와 관계없이 항상3개를 굴립니다.",
            "en": "Rolling three dice for D3 regardless of remaining W."
          },
          "fix": {
            "ko": "현재 W를 먼저 줄인 뒤0 도달과 초과 피해를 셉니다.",
            "en": "Reduce the current W before counting zero-reaching and excess points."
          }
        }
      ],
      "selfCheck": {
        "ko": "W2에 D1만 들어왔다면 왜 아직 부상 주사위가 없나요?",
        "en": "Why does D1 against W2 not yet generate an Injury die?"
      }
    },
    {
      "lessonId": "n23-injury-recovery",
      "stepId": "damage-practice",
      "objective": {
        "ko": "W2에 들어온 D3의 피해 세 점을 차례로 추적합니다.",
        "en": "Track the three damage points of D3 against W2 in order."
      },
      "preparation": [
        {
          "ko": "이 예시는 서로 다른 세 명중이 아니라 한 명중입니다.",
          "en": "This exercise is one hit, not three separate hits."
        },
        {
          "ko": "피해 칸 세 개와 W칸 두 개를 그립니다.",
          "en": "Draw three damage marks and two W boxes."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "첫 피해 적용",
            "en": "Apply point one"
          },
          "body": {
            "ko": "첫 피해 점으로W2가W1이 됩니다.",
            "en": "The first point reduces W2 to W1."
          },
          "result": {
            "ko": "아직 부상 주사위는 없습니다.",
            "en": "No Injury die is generated yet."
          }
        },
        {
          "title": {
            "ko": "두 번째 피해 적용",
            "en": "Apply point two"
          },
          "body": {
            "ko": "두 번째 점으로W1이W0이 되어 첫 부상 주사위를 준비합니다.",
            "en": "The second reduces W1 to W0 and creates the first Injury die."
          },
          "result": {
            "ko": "현재 주사위는1개입니다.",
            "en": "The running die count is one."
          }
        },
        {
          "title": {
            "ko": "남은 피해 적용",
            "en": "Apply the remaining point"
          },
          "body": {
            "ko": "남은 한 점은 초과 피해여서 주사위를 하나 더 준비합니다.",
            "en": "The last point is excess Damage and creates an additional die."
          },
          "result": {
            "ko": "최종 주사위는2개입니다.",
            "en": "The final die count is two."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "같은 공격의 D3을 세 점으로 나눠 계산합니다.",
          "en": "Break the one D3 attack into three damage points."
        },
        "steps": [
          {
            "ko": "피해1: W2→W1, 주사위0개.",
            "en": "Point 1: W2→W1, zero dice."
          },
          {
            "ko": "피해2: W1→W0, 주사위1개.",
            "en": "Point 2: W1→W0, one die."
          },
          {
            "ko": "피해3: 초과 피해, 주사위2개.",
            "en": "Point 3: excess Damage, two dice."
          }
        ],
        "result": {
          "ko": "정답은2개이며 D전체3개와 다릅니다.",
          "en": "The answer is two, not the full Damage value of three."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "W0이 되는 피해를 제외하고 초과분 하나만 굴립니다.",
            "en": "Rolling only the single excess point and omitting the zero-reaching die."
          },
          "fix": {
            "ko": "W0 도달 자체가 첫 주사위를 만든다는 점을 포함합니다.",
            "en": "Include the first die generated by reaching W0."
          }
        }
      ],
      "selfCheck": {
        "ko": "두 번째 피해 점과 세 번째 피해 점이 각각 왜 주사위를 만들었나요?",
        "en": "Why did both the second and third damage points generate a die?"
      },
      "hint": {
        "ko": "W0을 만드는 피해 한 점과 그 뒤 초과 피해를 각각 세세요.",
        "en": "Count the point that reaches W0 separately from the excess points afterward."
      },
      "optionFeedback": {
        "1": {
          "ko": "두 번째 피해로 첫 주사위, 세 번째 초과 피해로 두 번째 주사위입니다.",
          "en": "The second damage point creates the first die and the third excess point creates the second."
        },
        "2": {
          "ko": "첫 피해는W2를W1로 줄일 뿐이라 아직 부상 주사위가 없습니다.",
          "en": "The first point only reduces W2 to W1 and creates no Injury die."
        },
        "3": {
          "ko": "W0도달 뒤 남은 초과 피해 한 점도 주사위를 추가합니다.",
          "en": "The excess point after reaching W0 adds another die."
        }
      }
    },
    {
      "lessonId": "n23-injury-recovery",
      "stepId": "results",
      "objective": {
        "ko": "플레시 운드·중상·OOA 결과를 현재 상태에 맞춰 순서대로 적용합니다.",
        "en": "Apply Flesh Wound, Serious Injury and OOA results in order to the current state."
      },
      "preparation": [
        {
          "ko": "현재 T와 누적 플레시 운드 수를 확인합니다.",
          "en": "Check current T and accumulated Flesh Wounds."
        },
        {
          "ko": "이미 중상인지와 파이터 기록을 확인합니다.",
          "en": "Check whether the Fighter is already Seriously Injured and identify its record."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "플레시 운드 적용",
            "en": "Apply Flesh Wound"
          },
          "body": {
            "ko": "플레시 운드마다 T를1 줄이고 T0이면 OOA 여부를 처리합니다.",
            "en": "Reduce T by 1 for each Flesh Wound and resolve OOA at T0."
          },
          "result": {
            "ko": "T의 변화가 다음 판정에 반영됩니다.",
            "en": "Changed T is available for later tests."
          }
        },
        {
          "title": {
            "ko": "중상 상태 적용",
            "en": "Apply Serious Injury"
          },
          "body": {
            "ko": "중상이면 엎드린 중상 상태로 바꾸고 추가 중상 결과의 플레시 운드를 확인합니다.",
            "en": "Apply the Prone Seriously Injured state and check Flesh Wounds from additional Serious Injury results."
          },
          "result": {
            "ko": "같은 중상을 무의미한 중복 마커로만 남기지 않습니다.",
            "en": "Extra Serious Injury is not treated as an inert duplicate marker."
          }
        },
        {
          "title": {
            "ko": "OOA 기록",
            "en": "Record OOA"
          },
          "body": {
            "ko": "OOA이면 전장에서 모델을 제거하고 이후 래스팅 인저리 절차를 추적합니다.",
            "en": "On OOA, remove the battlefield model and track the later Lasting Injury procedure."
          },
          "result": {
            "ko": "앱의 파이터를 영구 삭제하지 않습니다.",
            "en": "Do not delete the app’s Fighter record."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "현재T2인 파이터에게 플레시 운드가 하나 적용됩니다.",
          "en": "A Fighter currently at T2 receives one Flesh Wound."
        },
        "steps": [
          {
            "ko": "T2−1=T1로 기록합니다.",
            "en": "Record T2−1=T1."
          },
          {
            "ko": "아직T0이 아니므로 이 감소만으로 OOA가 되지는 않습니다.",
            "en": "Because T is not zero, this reduction alone does not cause OOA."
          },
          {
            "ko": "후속 부상이 또 있다면 갱신된T1에서 처리합니다.",
            "en": "Resolve any later injury from the updated T1."
          }
        ],
        "result": {
          "ko": "누적 결과는 매번 현재T를 기준으로 처리합니다.",
          "en": "Each accumulated result uses the current T."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "OOA를 사망으로 단정하고 파이터 삭제 버튼을 누릅니다.",
            "en": "Treating OOA as certain death and deleting the Fighter."
          },
          "fix": {
            "ko": "OOA와 사망을 구분하고 실제 지속 부상 결과를 기록합니다.",
            "en": "Distinguish OOA from death and record the actual Lasting Injury result."
          }
        }
      ],
      "selfCheck": {
        "ko": "T1에서 플레시 운드 하나가 더 생겼을 때 다음 결과는 무엇인가요?",
        "en": "What happens if a Fighter at T1 suffers another Flesh Wound?"
      }
    },
    {
      "lessonId": "n23-injury-recovery",
      "stepId": "bottle",
      "objective": {
        "ko": "종료 단계의 보틀 식과 이후 이탈을 구분합니다.",
        "en": "Separate the End-phase Bottle formula from subsequent fleeing."
      },
      "preparation": [
        {
          "ko": "시작 크루 수와 현재 중상·OOA 수를 확인합니다.",
          "en": "Check starting crew, current Seriously Injured and OOA counts."
        },
        {
          "ko": "해당 시나리오가 크루 계산을 바꾸는지 확인합니다.",
          "en": "Check whether the scenario changes the crew-count calculation."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "보틀 시점 확인",
            "en": "Check Bottle timing"
          },
          "body": {
            "ko": "종료 단계에서 해당 갱의 보틀 조건을 확인합니다.",
            "en": "Check the gang’s Bottle conditions in the End phase."
          },
          "result": {
            "ko": "공격마다 보틀을 반복하지 않습니다.",
            "en": "Do not repeat Bottle after every attack."
          }
        },
        {
          "title": {
            "ko": "기본식 계산",
            "en": "Calculate the basic formula"
          },
          "body": {
            "ko": "D6+중상 수+OOA 수를 시작 크루 수와 비교합니다.",
            "en": "Compare D6+Seriously Injured+OOA with the starting crew."
          },
          "result": {
            "ko": "초과인지 여부를 정확히 확인합니다.",
            "en": "Check specifically whether the total exceeds it."
          }
        },
        {
          "title": {
            "ko": "이탈 판정 분리",
            "en": "Separate fleeing tests"
          },
          "body": {
            "ko": "보틀 실패라면 후속 이탈 쿨 판정을 해결하며 전원을 자동 제거하지 않습니다.",
            "en": "After Bottle failure, resolve the subsequent fleeing Cool tests instead of automatically removing the whole gang."
          },
          "result": {
            "ko": "보틀과 개별 이탈은 서로 다른 결과입니다.",
            "en": "Bottle and individual fleeing remain distinct outcomes."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "시작 크루6, 중상1, OOA1, D6결과4입니다.",
          "en": "The starting crew is 6, with one Seriously Injured, one OOA and a D6 result of 4."
        },
        "steps": [
          {
            "ko": "4+1+1=6을 계산합니다.",
            "en": "Calculate 4+1+1=6."
          },
          {
            "ko": "6은 시작 크루6을 초과하지 않습니다.",
            "en": "6 does not exceed the starting crew of 6."
          },
          {
            "ko": "D6가5라면5+1+1=7로 초과하게 됩니다.",
            "en": "If the die were 5, then 5+1+1=7 would exceed it."
          }
        ],
        "result": {
          "ko": "같음과 초과를 구분해야 합니다.",
          "en": "Equality and exceeding the crew count are different."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "합계가 시작 크루와 같아도 실패로 처리합니다.",
            "en": "Treating a total equal to the starting crew as failure."
          },
          "fix": {
            "ko": "기본식은 초과 조건이므로 > 관계를 확인합니다.",
            "en": "The basic formula uses exceeds, so check the > relation."
          }
        }
      ],
      "selfCheck": {
        "ko": "보틀 실패 직후 모든 모델을 치우면 어떤 후속 절차가 사라지나요?",
        "en": "Which subsequent procedure would be skipped by removing every model immediately after Bottle failure?"
      }
    },
    {
      "lessonId": "n23-injury-recovery",
      "stepId": "recovery-practice",
      "objective": {
        "ko": "보조 없는 중상 회복에서 중상 유지와 플레시 운드를 함께 기록합니다.",
        "en": "Record both continued Serious Injury and a Flesh Wound for an unassisted Serious Injury recovery result."
      },
      "preparation": [
        {
          "ko": "종료 단계 회복 순서이며 표적은 보조받지 않는다고 둡니다.",
          "en": "Assume End-phase recovery and no assistance."
        },
        {
          "ko": "현재T와 회복 주사위의 중상 결과를 확인합니다.",
          "en": "Check current T and the recovery die’s Serious Injury result."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "보조 여부 검사",
            "en": "Check assistance"
          },
          "body": {
            "ko": "이번 문제에는 보조나 스킬 예외가 없으므로 기본 결과를 사용합니다.",
            "en": "This exercise has neither assistance nor a skill exception, so use the basic result."
          },
          "result": {
            "ko": "결과를 바꿀 추가 조건을 임의로 넣지 않습니다.",
            "en": "Do not invent a condition that alters the outcome."
          }
        },
        {
          "title": {
            "ko": "상태 유지",
            "en": "Retain the state"
          },
          "body": {
            "ko": "굴린 중상 결과에 따라 중상 상태를 유지합니다.",
            "en": "The Serious Injury result leaves the Fighter Seriously Injured."
          },
          "result": {
            "ko": "자동으로 기립하거나 완전 회복하지 않습니다.",
            "en": "The Fighter does not automatically stand or heal fully."
          }
        },
        {
          "title": {
            "ko": "플레시 운드 추가",
            "en": "Add the Flesh Wound"
          },
          "body": {
            "ko": "플레시 운드로T를1 줄이고T0이면 OOA를 확인합니다.",
            "en": "Apply a Flesh Wound, reducing T by 1, and check OOA if T reaches zero."
          },
          "result": {
            "ko": "누적 부상을 빠뜨리지 않습니다.",
            "en": "The accumulating injury is not omitted."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "T2인 보조 없는 중상 파이터가 회복에서 중상을 굴렸습니다.",
          "en": "An unassisted Seriously Injured Fighter at T2 rolls Serious Injury in recovery."
        },
        "steps": [
          {
            "ko": "중상 마커는 그대로 둡니다.",
            "en": "Leave the Serious Injury marker in place."
          },
          {
            "ko": "플레시 운드 하나를 추가해T2→T1로 바꿉니다.",
            "en": "Add one Flesh Wound, changing T2→T1."
          },
          {
            "ko": "T1은0이 아니므로 그 감소만으로는 OOA가 아닙니다.",
            "en": "T1 is not zero, so that reduction alone does not cause OOA."
          }
        ],
        "result": {
          "ko": "최종 상태는 중상 유지와T1입니다.",
          "en": "The final state is still Seriously Injured with T1."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "상태가 그대로라서 수치 변화도 없다고 생각합니다.",
            "en": "Assuming unchanged state means no characteristic change."
          },
          "fix": {
            "ko": "상태 유지와 플레시 운드 누적을 각각 기록합니다.",
            "en": "Record continued state and accumulated Flesh Wound separately."
          }
        }
      ],
      "selfCheck": {
        "ko": "중상을 유지한다는 설명에 플레시 운드 적용도 포함했나요?",
        "en": "Did your answer include the Flesh Wound as well as remaining injured?"
      },
      "hint": {
        "ko": "보조가 없고 회복 결과가 중상이라는 두 조건을 함께 확인하세요.",
        "en": "Check both conditions: no assistance and a Serious Injury recovery result."
      },
      "optionFeedback": {
        "1": {
          "ko": "기본 결과는 중상 유지와 플레시 운드이며 T 감소도 기록합니다.",
          "en": "The basic result keeps Serious Injury and adds a Flesh Wound, including its T reduction."
        },
        "2": {
          "ko": "중상 결과는 완전 회복이나 자동 기립을 주지 않습니다.",
          "en": "A Serious Injury result does not grant complete recovery or automatic standing."
        },
        "3": {
          "ko": "상태가 유지돼도 플레시 운드 누적은 별도로 적용됩니다.",
          "en": "Even though the state persists, the additional Flesh Wound still applies."
        }
      }
    },
    {
      "lessonId": "n23-injury-recovery",
      "stepId": "rally",
      "objective": {
        "ko": "종료 단계 순서와 새 라운드의 상태 마커를 연결합니다.",
        "en": "Connect End-phase order to condition markers in the next round."
      },
      "preparation": [
        {
          "ko": "보틀·이탈·회복 처리가 끝났는지 확인합니다.",
          "en": "Check whether Bottle, fleeing and recovery are complete."
        },
        {
          "ko": "브로큰·제압·중상 모델을 상태별로 표시합니다.",
          "en": "Identify Broken, Pinned and Seriously Injured models."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "랠리 대상 확인",
            "en": "Identify Rally targets"
          },
          "body": {
            "ko": "회복 뒤 브로큰 모델의 랠리 등 남은 종료 판정을 확인합니다.",
            "en": "After recovery, identify remaining End-phase tests such as rallying Broken models."
          },
          "result": {
            "ko": "순서를 앞당겨 회복 전에 상태를 섞지 않습니다.",
            "en": "Do not move this earlier and mix states before recovery."
          }
        },
        {
          "title": {
            "ko": "실제 결과만 반영",
            "en": "Apply only actual results"
          },
          "body": {
            "ko": "해당 판정 결과와 명시된 효과만으로 상태를 바꿉니다.",
            "en": "Change conditions only according to the relevant test result and stated effects."
          },
          "result": {
            "ko": "단계 종료만으로 모든 상태를 지우지 않습니다.",
            "en": "Phase ending does not wipe every condition."
          }
        },
        {
          "title": {
            "ko": "다음 준비와 분리",
            "en": "Separate next-round readiness"
          },
          "body": {
            "ko": "다음 라운드의 준비 마커를 놓더라도 여전히 남은 제압·중상·브로큰 마커는 유지합니다.",
            "en": "Place next-round Ready markers separately from any remaining Pinned, Seriously Injured or Broken markers."
          },
          "result": {
            "ko": "다음 활성화의 적법한 행동이 유지됩니다.",
            "en": "The next activation starts from the correct legal state."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "새 라운드에 준비 마커를 받는 파이터가 여전히 제압 상태입니다.",
          "en": "A Fighter receives a Ready marker next round but remains Pinned."
        },
        "steps": [
          {
            "ko": "준비 마커로 활성화 가능 여부를 표시합니다.",
            "en": "Use Ready to mark activation availability."
          },
          {
            "ko": "제압 마커는 별도로 유지합니다.",
            "en": "Retain Pinned separately."
          },
          {
            "ko": "활성화하면 기립 비용부터 확인합니다.",
            "en": "When activated, check Stand Up’s cost first."
          }
        ],
        "result": {
          "ko": "준비는 회복 효과가 아닙니다.",
          "en": "Ready is not a healing effect."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "새 라운드가 시작돼 모든 상태 마커를 일괄 제거합니다.",
            "en": "Removing every condition marker when a new round begins."
          },
          "fix": {
            "ko": "각 상태가 실제로 종료되는 조건과 판정만 적용합니다.",
            "en": "Use only each condition’s actual removal timing and test."
          }
        }
      ],
      "selfCheck": {
        "ko": "준비·제압·브로큰이 서로 다른 정보를 주는 이유를 설명해 보세요.",
        "en": "Explain why Ready, Pinned and Broken convey different information."
      }
    },
    {
      "lessonId": "n23-postbattle-growth",
      "stepId": "wrap-up",
      "objective": {
        "ko": "시나리오 결과와 남은 부상을 양측이 같은 내용으로 정리합니다.",
        "en": "Reconcile the scenario outcome and remaining injuries with both players."
      },
      "preparation": [
        {
          "ko": "전투 결과·목표·파이터별OOA 기록을 모읍니다.",
          "en": "Collect result, objectives and Fighter-by-Fighter OOA records."
        },
        {
          "ko": "이미 처리한 래스팅 인저리 결과를 표시합니다.",
          "en": "Mark Lasting Injury results already resolved."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "시나리오 결과 확정",
            "en": "Confirm the scenario result"
          },
          "body": {
            "ko": "승패와 목표 달성 내용을 상대와 확인합니다.",
            "en": "Confirm winner, loser and objectives with the opponent."
          },
          "result": {
            "ko": "보상 계산의 출발점이 일치합니다.",
            "en": "Both players share the starting point for rewards."
          }
        },
        {
          "title": {
            "ko": "남은 중상 처리",
            "en": "Resolve remaining Serious Injury"
          },
          "body": {
            "ko": "전투가 끝날 때 남은 중상과 포획 등 필요한 후속 판정을 확인합니다.",
            "en": "Check remaining Seriously Injured Fighters and required follow-up procedures such as capture."
          },
          "result": {
            "ko": "전장 상태를 캠페인 결과로 연결합니다.",
            "en": "Battlefield states are connected to campaign results."
          }
        },
        {
          "title": {
            "ko": "중복 방지",
            "en": "Avoid duplicates"
          },
          "body": {
            "ko": "이미 기록한 지속 부상을 다시 굴리거나 덧씌우지 말고 개별 파이터에 연결합니다.",
            "en": "Do not reroll or duplicate recorded Lasting Injuries; attach each result to its Fighter."
          },
          "result": {
            "ko": "개인 명부와 전투 기록이 대조됩니다.",
            "en": "Personal roster and battle log can be reconciled."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "파이터A는 이미OOA 결과를 기록했고B는 중상으로 남았습니다.",
          "en": "Fighter A already has its OOA result recorded; B remains Seriously Injured."
        },
        "steps": [
          {
            "ko": "A의 기존 결과를 먼저 표시합니다.",
            "en": "Mark A’s existing result first."
          },
          {
            "ko": "B의 남은 중상 생존 절차를 확인합니다.",
            "en": "Check B’s remaining-Serious-Injury survival procedure."
          },
          {
            "ko": "A의 부상을 다시 굴리지 않은 채 두 기록을 명부에 연결합니다.",
            "en": "Link both records to the roster without rerolling A’s injury."
          }
        ],
        "result": {
          "ko": "처리 완료와 처리 대기 파이터가 분리됩니다.",
          "en": "Resolved and pending Fighters remain distinct."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "OOA 목록 전체에 부상 굴림을 한 번 더 적용합니다.",
            "en": "Applying another Injury roll to the entire OOA list."
          },
          "fix": {
            "ko": "각 파이터의 완료 표시를 보고 아직 필요한 판정만 처리합니다.",
            "en": "Check each Fighter’s completed record and resolve only pending procedures."
          }
        }
      ],
      "selfCheck": {
        "ko": "OOA 기록이 있다는 사실만으로 사망이라고 적으면 왜 안 되나요?",
        "en": "Why must an OOA entry not automatically be recorded as death?"
      }
    },
    {
      "lessonId": "n23-postbattle-growth",
      "stepId": "survival",
      "objective": {
        "ko": "전투 종료 생존 판정1–2를OOA와 지속 부상 굴림으로 연결합니다.",
        "en": "Connect an end-of-battle survival result of 1–2 to OOA and Lasting Injury."
      },
      "preparation": [
        {
          "ko": "전투 종료 시 남은 중상 파이터를 식별합니다.",
          "en": "Identify a Fighter remaining Seriously Injured at battle end."
        },
        {
          "ko": "이번 예시에는 시나리오·장비 예외가 없습니다.",
          "en": "There are no scenario or equipment exceptions in this example."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "판정 종류 구분",
            "en": "Identify the check"
          },
          "body": {
            "ko": "지금은 전투 중 회복 주사위가 아니라 전투 종료 생존D6입니다.",
            "en": "This is the end-of-battle survival D6, not an in-battle recovery die."
          },
          "result": {
            "ko": "다른 표의 결과를 가져오지 않습니다.",
            "en": "Do not import the result of another table."
          }
        },
        {
          "title": {
            "ko": "성공·실패 분기",
            "en": "Choose the result branch"
          },
          "body": {
            "ko": "3+는 이 생존 판정에 따른 래스팅 인저리를 피하고1–2는OOA로 간주합니다.",
            "en": "On 3+ avoid Lasting Injury from this survival check; on 1–2 count the Fighter as OOA."
          },
          "result": {
            "ko": "주사위2는 실패 분기에 들어갑니다.",
            "en": "A result of 2 enters the failure branch."
          }
        },
        {
          "title": {
            "ko": "지속 부상 처리",
            "en": "Resolve Lasting Injury"
          },
          "body": {
            "ko": "실패하면 해당 래스팅 인저리를 굴려 결과를 기록한 뒤 생존·요양·사망을 판단합니다.",
            "en": "On failure, roll and record Lasting Injury before deciding survival, Recovery or death."
          },
          "result": {
            "ko": "실패를 즉시 삭제로 바꾸지 않습니다.",
            "en": "Failure is not converted directly into deletion."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "중상으로 남은 파이터의 생존D6가2입니다.",
          "en": "A Fighter remaining Seriously Injured rolls 2 for survival."
        },
        "steps": [
          {
            "ko": "2는3+보다 낮습니다.",
            "en": "2 is below the 3+ success target."
          },
          {
            "ko": "1–2 실패이므로OOA로 간주합니다.",
            "en": "It is in the 1–2 failure band, so count the Fighter as OOA."
          },
          {
            "ko": "이어서 래스팅 인저리를 굴리고 실제 결과를 기록합니다.",
            "en": "Then roll Lasting Injury and record its actual result."
          }
        ],
        "result": {
          "ko": "다음 단계는 지속 부상 굴림이며 즉시 명단 삭제가 아닙니다.",
          "en": "The next step is Lasting Injury, not immediate roster deletion."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "생존 판정 실패를 사망 결과와 동일시합니다.",
            "en": "Equating a failed survival check with a death result."
          },
          "fix": {
            "ko": "후속 지속 부상 결과가 무엇인지 확인한 뒤 상태를 정합니다.",
            "en": "Determine the state from the subsequent Lasting Injury result."
          }
        }
      ],
      "selfCheck": {
        "ko": "이 예시의2가 전투 중 회복 주사위의 면을 뜻하지 않는 이유는 무엇인가요?",
        "en": "Why is the 2 here not a face on the in-battle recovery die?"
      },
      "hint": {
        "ko": "이 생존 판정의 성공은 3+이며 2는 1–2 실패 구간입니다.",
        "en": "Success on this survival check is 3+, and 2 lies in the 1–2 failure band."
      },
      "optionFeedback": {
        "1": {
          "ko": "1–2 실패는 OOA로 간주한 뒤 래스팅 인저리 결과를 확인합니다.",
          "en": "A 1–2 failure counts as OOA, followed by the Lasting Injury result."
        },
        "2": {
          "ko": "생존 실패가 즉시 사망이나 영구 삭제를 뜻하지 않습니다.",
          "en": "Failed survival does not immediately mean death or permanent deletion."
        },
        "3": {
          "ko": "3+ 성공이 아니므로 후속 지속 부상 판정을 생략할 수 없습니다.",
          "en": "It is not a 3+ success, so the subsequent Lasting Injury check cannot be skipped."
        }
      }
    },
    {
      "lessonId": "n23-postbattle-growth",
      "stepId": "rewards",
      "objective": {
        "ko": "시나리오 보상과 캠페인 수입의 지급 시점·항목을 분리합니다.",
        "en": "Separate scenario rewards from campaign income by timing and ledger entry."
      },
      "preparation": [
        {
          "ko": "전투 전 크레딧과 해당 시나리오 보상을 확인합니다.",
          "en": "Check opening credits and the scenario’s rewards."
        },
        {
          "ko": "선택 캠페인의 수입 조건·지급 시점을 확인합니다.",
          "en": "Check the chosen campaign’s income conditions and timing."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "보상 항목 기록",
            "en": "Record scenario rewards"
          },
          "body": {
            "ko": "승패·목표에 따른 시나리오 보상을 근거와 함께 적습니다.",
            "en": "Record scenario rewards and their basis in the result or objectives."
          },
          "result": {
            "ko": "전투 보상만의 금액이 남습니다.",
            "en": "The battle reward has its own amount."
          }
        },
        {
          "title": {
            "ko": "수입 시점 확인",
            "en": "Check income timing"
          },
          "body": {
            "ko": "현재 캠페인이 이번 시점에 자원 수입을 주는지 확인합니다.",
            "en": "Check whether this campaign actually grants resource income at this time."
          },
          "result": {
            "ko": "지급 전 수입을 미리 더하지 않습니다.",
            "en": "Do not add income before it becomes payable."
          }
        },
        {
          "title": {
            "ko": "장부 합산",
            "en": "Reconcile the ledger"
          },
          "body": {
            "ko": "기존 크레딧+확정 보상+이번 지급 수입−확정 지출로 계산합니다.",
            "en": "Calculate opening credits+confirmed rewards+income payable now−confirmed spending."
          },
          "result": {
            "ko": "각 항목을 별도 기록해 중복을 찾습니다.",
            "en": "Separate entries make duplicates visible."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "가상 장부에 기존80cr, 확정 보상30cr, 지금 지급되는 수입20cr, 지출15cr가 있습니다.",
          "en": "An illustrative ledger has 80cr opening, 30cr confirmed rewards, 20cr income payable now and 15cr spending."
        },
        "steps": [
          {
            "ko": "보상30과 수입20을 별도 줄에 적습니다.",
            "en": "List the 30 reward and 20 income on separate lines."
          },
          {
            "ko": "80+30+20−15=115를 계산합니다.",
            "en": "Calculate 80+30+20−15=115."
          },
          {
            "ko": "수입20을 이미 보상 안에 포함했는지 대조합니다.",
            "en": "Check that the income was not already included in the reward line."
          }
        ],
        "result": {
          "ko": "예시 잔액은115cr이며 금액은 규칙 보상표가 아닌 가상 장부입니다.",
          "en": "The example balance is 115cr; these figures illustrate bookkeeping rather than a reward table."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "N26 포스트 사이클 수입표를 N23 전투마다 자동 적용합니다.",
            "en": "Automatically applying the N26 post-cycle income table after every N23 battle."
          },
          "fix": {
            "ko": "현재N23 캠페인의 실제 지급 시점과 조건을 따릅니다.",
            "en": "Follow the actual timing and conditions of the selected N23 campaign."
          }
        }
      ],
      "selfCheck": {
        "ko": "이번 시점에 지급되지 않는 수입도 잔액에 더해야 하나요?",
        "en": "Should income not payable at this time already be added to the balance?"
      }
    },
    {
      "lessonId": "n23-postbattle-growth",
      "stepId": "recovery",
      "objective": {
        "ko": "이전 요양과 새 요양을 분리해 이번 부상이 지워지지 않게 합니다.",
        "en": "Separate old and new Recovery so this battle’s injuries are not erased."
      },
      "preparation": [
        {
          "ko": "전투 시작 전 요양 명단을 준비합니다.",
          "en": "Have the pre-battle Recovery list ready."
        },
        {
          "ko": "이번 전투에서 새 요양을 받은 파이터를 따로 표시합니다.",
          "en": "Mark Fighters newly placed in Recovery by this battle separately."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "이전 요양 확인",
            "en": "Identify previous Recovery"
          },
          "body": {
            "ko": "요양 때문에 실제로 이번 전투를 쉬었던 파이터를 확인합니다.",
            "en": "Identify Fighters who actually missed this battle because they were already in Recovery."
          },
          "result": {
            "ko": "처음부터 쉬었던 명단이 분명해집니다.",
            "en": "The pre-existing unavailable list is clear."
          }
        },
        {
          "title": {
            "ko": "새 결과 기록",
            "en": "Record new results"
          },
          "body": {
            "ko": "이번 전투의 래스팅 인저리로 생긴 요양을 새로운 항목으로 기록합니다.",
            "en": "Record Recovery caused by this battle’s Lasting Injury as a new entry."
          },
          "result": {
            "ko": "이전 요양과 같은 묶음으로 지우지 않습니다.",
            "en": "Do not merge it into the list to be cleared."
          }
        },
        {
          "title": {
            "ko": "해제 대상만 갱신",
            "en": "Update only eligible returns"
          },
          "body": {
            "ko": "캠페인 절차에 따라 이전 요양 해제 대상을 갱신하고 새 부상은 유지합니다.",
            "en": "Update eligible previous Recovery under the campaign procedure while retaining new injuries."
          },
          "result": {
            "ko": "다음 전투 가용 명단을 확인할 수 있습니다.",
            "en": "The next battle’s available roster can be reviewed."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "A는 기존 요양으로 쉬었고B는 이번 전투에서 새 요양을 얻었습니다.",
          "en": "A missed this battle in prior Recovery; B receives new Recovery from this battle."
        },
        "steps": [
          {
            "ko": "A를 이전 요양 목록에 둡니다.",
            "en": "Keep A on the prior-Recovery list."
          },
          {
            "ko": "B를 이번 새 요양 목록에 둡니다.",
            "en": "Put B on this battle’s new-Recovery list."
          },
          {
            "ko": "A의 복귀 처리와B의 새 제한을 각각 확인합니다.",
            "en": "Check A’s return procedure and B’s new restriction separately."
          }
        ],
        "result": {
          "ko": "전원을 일괄 활성으로 바꾸지 않습니다.",
          "en": "Do not mark the whole roster Active indiscriminately."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "전투 종료 후 모든 요양 상태를 해제합니다.",
            "en": "Clearing every Recovery status after the battle."
          },
          "fix": {
            "ko": "이전부터 쉬었던 대상과 이번에 새로 받은 대상을 먼저 분리합니다.",
            "en": "First separate those who already missed the battle from those newly affected."
          }
        }
      ],
      "selfCheck": {
        "ko": "전투 중 중상과 캠페인 요양을 같은 상태로 기록하면 어떤 문제가 생기나요?",
        "en": "What goes wrong if battlefield Serious Injury and campaign Recovery are recorded as the same state?"
      }
    },
    {
      "lessonId": "n23-postbattle-growth",
      "stepId": "xp",
      "objective": {
        "ko": "N23 선택형 성장에서 접근·추가 비용을 확인한 뒤XP를 차감합니다.",
        "en": "Check access and surcharges before spending XP on an N23 chosen advancement."
      },
      "preparation": [
        {
          "ko": "파이터의 현재XP·유형·스킬 접근을 확인합니다.",
          "en": "Check the Fighter’s current XP, type and skill access."
        },
        {
          "ko": "이번 예시는 보조 스킬 선택의 기본 비용12XP를 사용합니다.",
          "en": "This example uses the 12-XP base cost for choosing a Secondary skill."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "기본 비용 확인",
            "en": "Check base cost"
          },
          "body": {
            "ko": "선택할 성장 종류를 정하고 해당 기본XP 비용을 읽습니다.",
            "en": "Choose the advancement type and read its base XP cost."
          },
          "result": {
            "ko": "보조 스킬 선택의 기본값은12XP입니다.",
            "en": "Choosing a Secondary skill has a 12-XP base cost."
          }
        },
        {
          "title": {
            "ko": "접근과 추가 비용 검사",
            "en": "Check access and surcharge"
          },
          "body": {
            "ko": "실제 파이터에게 허용되는 선택인지와 추가 비용이 있는지 확인합니다.",
            "en": "Check whether the Fighter may make this selection and whether a surcharge applies."
          },
          "result": {
            "ko": "예시 기본값을 모든 실제 구매의 최종값으로 단정하지 않습니다.",
            "en": "Do not assume the example’s base figure is every actual purchase’s final cost."
          }
        },
        {
          "title": {
            "ko": "XP 지출 기록",
            "en": "Record XP spent"
          },
          "body": {
            "ko": "최종 비용을 충족하면 XP를 차감하고 성장·레이팅 변화를 기록합니다.",
            "en": "If XP covers the final cost, deduct it and record advancement and rating changes."
          },
          "result": {
            "ko": "누적XP 구간에 따른 무료 성장을 적용하지 않습니다.",
            "en": "Do not apply free advancement from cumulative XP bands."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "가상 파이터가18XP이고 보조 스킬 선택이 적법하며 추가 비용은 없습니다.",
          "en": "An illustrative Fighter has 18 XP; choosing the Secondary skill is legal and has no surcharge."
        },
        "steps": [
          {
            "ko": "최종 비용은 기본12XP입니다.",
            "en": "The final cost is the 12-XP base."
          },
          {
            "ko": "18−12=6XP를 계산합니다.",
            "en": "Calculate 18−12=6 XP."
          },
          {
            "ko": "스킬과 해당 레이팅 변화를 기록하고 남은XP6을 확인합니다.",
            "en": "Record the skill and applicable rating change, then confirm 6 XP remains."
          }
        ],
        "result": {
          "ko": "이 예시의 남은XP는6이며 실제 추가 비용은 별도로 확인합니다.",
          "en": "This example leaves 6 XP; actual surcharges must be checked independently."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "스킬을 추가하면서XP를18 그대로 둡니다.",
            "en": "Adding the skill while leaving XP unchanged at 18."
          },
          "fix": {
            "ko": "N23 선택형 성장은XP를 지불하며 최종 비용을 차감합니다.",
            "en": "N23 chosen advancement spends XP; deduct the final cost."
          }
        }
      ],
      "selfCheck": {
        "ko": "기본 비용12XP와 실제 최종 비용이 달라질 수 있는 이유를 말해 보세요.",
        "en": "Explain why the 12-XP base cost can differ from the final actual cost."
      },
      "hint": {
        "ko": "이 문제는 N23의 보조 스킬 선택 기본 비용만 묻습니다.",
        "en": "This question asks only for the N23 base cost of choosing a Secondary skill."
      },
      "optionFeedback": {
        "1": {
          "ko": "기본 비용은 12XP이며 실제 구매에는 접근과 추가 비용도 확인합니다.",
          "en": "The base is 12 XP; actual purchases also require checking access and surcharges."
        },
        "2": {
          "ko": "누적 구간 무료 성장은 N23 선택형 XP 지출을 대체하지 않습니다.",
          "en": "Free cumulative-band advancement does not replace N23 chosen-advancement XP spending."
        },
        "3": {
          "ko": "이 선택은 기본 12XP를 소비하므로 항상 0이 아닙니다.",
          "en": "This choice has a 12-XP base cost and is not always free."
        }
      }
    },
    {
      "lessonId": "n23-postbattle-growth",
      "stepId": "audit",
      "objective": {
        "ko": "전투 후 바뀐 항목을 원인별로 대조하고 저장·백업을 확인합니다.",
        "en": "Reconcile changed entries by cause and check saving and backup after the battle."
      },
      "preparation": [
        {
          "ko": "전투 전 백업 또는 기록과 이번 결과 목록을 준비합니다.",
          "en": "Have a pre-battle backup or record and this battle’s result list ready."
        },
        {
          "ko": "현재 크레딧·XP·레이팅·장비·부상·요양을 엽니다.",
          "en": "Open current credits, XP, rating, equipment, injuries and Recovery."
        }
      ],
      "walkthrough": [
        {
          "title": {
            "ko": "증감 대조",
            "en": "Reconcile changes"
          },
          "body": {
            "ko": "크레딧은 보상·수입·지출, XP는 획득·소비로 나누어 대조합니다.",
            "en": "Reconcile credits by rewards, income and spending, and XP by awards and spending."
          },
          "result": {
            "ko": "설명되지 않는 잔액 차이를 찾습니다.",
            "en": "Unexplained balance differences become visible."
          }
        },
        {
          "title": {
            "ko": "개별 파이터 확인",
            "en": "Review each Fighter"
          },
          "body": {
            "ko": "성장·레이팅 변화, 지속 부상, 새 요양과 이전 복귀를 파이터별로 확인합니다.",
            "en": "Review each Fighter’s advancement, rating changes, Lasting Injuries, new Recovery and returns."
          },
          "result": {
            "ko": "같은 이름의 다른 파이터에 결과가 붙지 않습니다.",
            "en": "Results do not attach to another Fighter with a similar name."
          }
        },
        {
          "title": {
            "ko": "저장과 사본 확보",
            "en": "Confirm saving and a copy"
          },
          "body": {
            "ko": "계정 저장 상태를 확인하고 필요하면 정산 후 백업을 내보냅니다.",
            "en": "Confirm account saving and export a post-settlement backup if needed."
          },
          "result": {
            "ko": "다음 전투의 시작 명부가 남습니다.",
            "en": "The starting roster for the next battle is preserved."
          }
        }
      ],
      "workedExample": {
        "situation": {
          "ko": "스킬을 산 파이터의XP는 줄었지만 갱 레이팅은 이전 값처럼 보입니다.",
          "en": "A Fighter’s XP decreased after buying a skill, but the gang rating appears unchanged."
        },
        "steps": [
          {
            "ko": "해당 성장에 레이팅 변화가 있는지 확인합니다.",
            "en": "Check whether that advancement carries a rating change."
          },
          {
            "ko": "파이터 성장 기록과 갱 요약이 같은 대상을 보고 있는지 확인합니다.",
            "en": "Check that the Fighter advancement and gang summary refer to the same record."
          },
          {
            "ko": "임의 수치 입력 전 실제 성장 항목과 저장 상태를 대조합니다.",
            "en": "Compare the actual advancement entry and save state before manually changing numbers."
          }
        ],
        "result": {
          "ko": "규칙 근거와 기록 연결을 확인한 뒤 정산을 마칩니다.",
          "en": "Finish settlement after checking the rule basis and record linkage."
        }
      },
      "pitfalls": [
        {
          "problem": {
            "ko": "XP만 맞으면 다른 부상·장비·크레딧도 맞다고 가정합니다.",
            "en": "Assuming correct XP means injuries, equipment and credits must also be correct."
          },
          "fix": {
            "ko": "원인별 항목을 따로 대조하고 최종 저장 상태까지 확인합니다.",
            "en": "Reconcile each category separately and confirm the final saved state."
          }
        }
      ],
      "selfCheck": {
        "ko": "다음 전투 명부를 열었을 때 지금 정산과 같은 잔액·상태를 볼 수 있나요?",
        "en": "Will the next battle’s roster show the same balances and states as this settlement?"
      }
    }
  ],
  "newLessons": [
    {
      "id": "account-id-and-sync",
      "category": "app",
      "editions": [
        "n23",
        "n26"
      ],
      "title": {
        "ko": "아이디 가입부터 안전한 동기화까지",
        "en": "ID signup and reliable synchronization"
      },
      "summary": {
        "ko": "아이디 가입·기존 계정 연결·저장 충돌·백업을 실제 화면 순서로 익힙니다.",
        "en": "Follow signup, existing-account setup, saving conflicts and backup screens step by step."
      },
      "minutes": 20,
      "references": [],
      "steps": [
        {
          "id": "create-id",
          "title": {
            "ko": "두 항목으로 회원가입",
            "en": "Create an account with two fields"
          },
          "body": {
            "ko": "이메일 없이 아이디와 비밀번호만으로 가입할 수 있습니다. 계정에서 회원가입을 선택합니다. 로그인과 회원가입은 같은 화면의 서로 다른 선택입니다. 아이디는 3~32자의 문자·숫자·밑줄·마침표·하이픈을 사용합니다. 비밀번호는 8~128자로 입력하고 표시 버튼으로 오타를 확인할 수 있습니다. 가입하고 로그인을 누르고 결과 안내를 읽습니다. 아이디 중복이나 형식 오류면 안내를 수정하고 다시 제출합니다.",
            "en": "Create an account using only a login ID and password. Choose Create account in Account. Sign in and Create account are separate modes on the same screen. Use a 3–32 character ID with letters, numbers, underscores, dots or hyphens. Enter an 8–128 character password; Show can help check a typing error. Choose Create account and sign in, then read the response. Correct duplicate-ID or format errors before retrying."
          },
          "bullets": [
            {
              "ko": "가입에는 아이디와 비밀번호만 필요하며 연락 이메일은 별도 선택 항목입니다.",
              "en": "Signup requires only ID and password; a contact email is a separate optional field."
            },
            {
              "ko": "가입 화면에 로그인 아이디와 비밀번호 외 필수 항목이 있나요?",
              "en": "Does signup require anything beyond login ID and password?"
            }
          ],
          "references": [],
          "objective": {
            "ko": "이메일 없이 아이디와 비밀번호만으로 가입할 수 있습니다.",
            "en": "Create an account using only a login ID and password."
          },
          "preparation": [
            {
              "ko": "기존 계정 기록이 있다면 새 가입보다 기존 계정의 연결 설정을 먼저 확인합니다.",
              "en": "If you already own records, inspect setup from that account before creating a new one."
            }
          ],
          "walkthrough": [
            {
              "title": {
                "ko": "계정 화면 열기",
                "en": "Open Account"
              },
              "body": {
                "ko": "계정에서 회원가입을 선택합니다. 로그인과 회원가입은 같은 화면의 서로 다른 선택입니다.",
                "en": "Choose Create account in Account. Sign in and Create account are separate modes on the same screen."
              },
              "result": {
                "ko": "새 가입 모드를 확인합니다.",
                "en": "You identify registration mode."
              }
            },
            {
              "title": {
                "ko": "아이디와 비밀번호 입력",
                "en": "Enter ID and password"
              },
              "body": {
                "ko": "아이디는 3~32자의 문자·숫자·밑줄·마침표·하이픈을 사용합니다. 비밀번호는 8~128자로 입력하고 표시 버튼으로 오타를 확인할 수 있습니다.",
                "en": "Use a 3–32 character ID with letters, numbers, underscores, dots or hyphens. Enter an 8–128 character password; Show can help check a typing error."
              },
              "result": {
                "ko": "필수 입력은 두 항목뿐입니다.",
                "en": "There are only two required fields."
              }
            },
            {
              "title": {
                "ko": "가입 결과 확인",
                "en": "Verify registration"
              },
              "body": {
                "ko": "가입하고 로그인을 누르고 결과 안내를 읽습니다. 아이디 중복이나 형식 오류면 안내를 수정하고 다시 제출합니다.",
                "en": "Choose Create account and sign in, then read the response. Correct duplicate-ID or format errors before retrying."
              },
              "result": {
                "ko": "연결된 계정과 로그인 아이디를 확인합니다.",
                "en": "You verify the connected account and login ID."
              }
            }
          ],
          "workedExample": {
            "situation": {
              "ko": "아이디 iron.rat, 12자 비밀번호로 새 계정을 만들려고 합니다.",
              "en": "You want a new account with ID iron.rat and a 12-character password."
            },
            "steps": [
              {
                "ko": "기존 기록이 다른 계정 소유가 아닌지 먼저 확인합니다.",
                "en": "First check whether existing records belong to another account."
              },
              {
                "ko": "회원가입 모드에서 아이디와 비밀번호를 입력합니다.",
                "en": "Enter the ID and password in registration mode."
              },
              {
                "ko": "이메일을 입력하지 않고 가입 결과와 저장 연결을 확인합니다.",
                "en": "Submit without an email, then verify registration and saving connection."
              }
            ],
            "result": {
              "ko": "새 계정이 만들어지며 다른 계정의 기록은 자동 합쳐지지 않습니다.",
              "en": "A new account is created; another account’s records are not automatically merged."
            }
          },
          "pitfalls": [
            {
              "problem": {
                "ko": "이메일을 필수로 입력해야 한다고 생각합니다.",
                "en": "You assume an email is mandatory."
              },
              "fix": {
                "ko": "가입에는 아이디와 비밀번호만 필요하며 연락 이메일은 별도 선택 항목입니다.",
                "en": "Signup requires only ID and password; a contact email is a separate optional field."
              }
            }
          ],
          "selfCheck": {
            "ko": "가입 화면에 로그인 아이디와 비밀번호 외 필수 항목이 있나요?",
            "en": "Does signup require anything beyond login ID and password?"
          }
        },
        {
          "id": "id-and-name",
          "title": {
            "ko": "로그인 아이디와 표시 이름",
            "en": "Login ID versus display name"
          },
          "body": {
            "ko": "이름 수정이 로그인 자격 정보를 바꾸지 않는다는 점을 이해합니다. 계정의 로그인 아이디는 접속할 때 쓰는 값입니다. 표시 이름 필드와 위치를 구분해 봅니다. 표시 이름은 사용자 목록이나 참가자 표시에서 보이는 이름입니다. 이름을 바꿔도 등록된 로그인 아이디는 그대로입니다. 로그아웃 후에는 처음 등록한 로그인 아이디와 비밀번호를 사용합니다. 바꾼 표시 이름으로 계속 실패하면 아이디 항목을 다시 확인합니다.",
            "en": "Understand that renaming the profile does not change the login credential. The login ID is the value used to sign in. Identify it separately from the display-name field. The display name is shown in user and participant lists. Changing it leaves the registered login ID unchanged. After logout, use the registered login ID and password. If the new display name fails, check the Login ID field again."
          },
          "bullets": [
            {
              "ko": "먼저 고정된 로그인 아이디를 확인하세요. 새 가입은 별개 기록을 만듭니다.",
              "en": "Check the fixed login ID first. New registration creates a separate account."
            },
            {
              "ko": "친구에게 보이는 이름과 로그인에 쓰는 아이디를 구분할 수 있나요?",
              "en": "Can you distinguish the visible profile name from the login ID?"
            }
          ],
          "references": [],
          "objective": {
            "ko": "이름 수정이 로그인 자격 정보를 바꾸지 않는다는 점을 이해합니다.",
            "en": "Understand that renaming the profile does not change the login credential."
          },
          "preparation": [
            {
              "ko": "가입한 계정의 로그인 아이디를 별도로 기록해 둡니다.",
              "en": "Keep a separate record of the login ID used at signup."
            }
          ],
          "walkthrough": [
            {
              "title": {
                "ko": "로그인 아이디 읽기",
                "en": "Read the login ID"
              },
              "body": {
                "ko": "계정의 로그인 아이디는 접속할 때 쓰는 값입니다. 표시 이름 필드와 위치를 구분해 봅니다.",
                "en": "The login ID is the value used to sign in. Identify it separately from the display-name field."
              },
              "result": {
                "ko": "접속에 필요한 값을 식별합니다.",
                "en": "You identify the sign-in credential."
              }
            },
            {
              "title": {
                "ko": "표시 이름의 용도 이해",
                "en": "Understand the display name"
              },
              "body": {
                "ko": "표시 이름은 사용자 목록이나 참가자 표시에서 보이는 이름입니다. 이름을 바꿔도 등록된 로그인 아이디는 그대로입니다.",
                "en": "The display name is shown in user and participant lists. Changing it leaves the registered login ID unchanged."
              },
              "result": {
                "ko": "프로필 이름과 접속 정보를 구분합니다.",
                "en": "You separate the profile name from access details."
              }
            },
            {
              "title": {
                "ko": "다음 로그인에 적용",
                "en": "Apply it at next sign-in"
              },
              "body": {
                "ko": "로그아웃 후에는 처음 등록한 로그인 아이디와 비밀번호를 사용합니다. 바꾼 표시 이름으로 계속 실패하면 아이디 항목을 다시 확인합니다.",
                "en": "After logout, use the registered login ID and password. If the new display name fails, check the Login ID field again."
              },
              "result": {
                "ko": "이름 변경 후에도 올바르게 로그인합니다.",
                "en": "You can sign in correctly after a rename."
              }
            }
          ],
          "workedExample": {
            "situation": {
              "ko": "아이디 iron.rat로 가입하고 표시 이름을 회색 쥐로 바꿨습니다.",
              "en": "You registered as iron.rat and changed the display name to Grey Rat."
            },
            "steps": [
              {
                "ko": "표시 이름은 회색 쥐로 보입니다.",
                "en": "The profile displays Grey Rat."
              },
              {
                "ko": "로그인 아이디 항목은 iron.rat로 남아 있습니다.",
                "en": "The Login ID field remains iron.rat."
              },
              {
                "ko": "다음 접속에는 iron.rat와 기존 비밀번호를 사용합니다.",
                "en": "Use iron.rat and the existing password at next sign-in."
              }
            ],
            "result": {
              "ko": "표시 이름 변경 때문에 새 계정을 만들 필요가 없습니다.",
              "en": "Renaming the profile does not require creating another account."
            }
          },
          "pitfalls": [
            {
              "problem": {
                "ko": "표시 이름으로 로그인하다 실패하자 새 계정을 만듭니다.",
                "en": "After a display-name login fails, you create another account."
              },
              "fix": {
                "ko": "먼저 고정된 로그인 아이디를 확인하세요. 새 가입은 별개 기록을 만듭니다.",
                "en": "Check the fixed login ID first. New registration creates a separate account."
              }
            }
          ],
          "selfCheck": {
            "ko": "친구에게 보이는 이름과 로그인에 쓰는 아이디를 구분할 수 있나요?",
            "en": "Can you distinguish the visible profile name from the login ID?"
          },
          "exercise": {
            "type": "choice",
            "prompt": {
              "ko": "표시 이름을 바꾼 뒤 다음 로그인에 사용할 값은?",
              "en": "After changing the display name, which value do you use to sign in?"
            },
            "options": [
              {
                "id": "1",
                "text": {
                  "ko": "처음 등록한 로그인 아이디",
                  "en": "The registered login ID"
                },
                "feedback": {
                  "ko": "맞습니다. 표시 이름 수정은 로그인 아이디를 바꾸지 않습니다.",
                  "en": "Correct: editing the display name leaves the login ID unchanged."
                }
              },
              {
                "id": "2",
                "text": {
                  "ko": "바꾼 표시 이름이 자동으로 새 아이디가 된다",
                  "en": "The new display name automatically becomes the ID"
                },
                "feedback": {
                  "ko": "표시 이름과 로그인 아이디는 별개이므로 자동 변경되지 않습니다.",
                  "en": "Display name and login ID are separate and do not change together."
                }
              },
              {
                "id": "3",
                "text": {
                  "ko": "연락 이메일만 입력한다",
                  "en": "Only the contact email"
                },
                "feedback": {
                  "ko": "연락 이메일은 아이디 로그인의 대체 값이 아닙니다.",
                  "en": "The contact email is not a substitute for the login ID."
                }
              }
            ],
            "correctOption": "1",
            "explanation": {
              "ko": "로그인 아이디는 별도 값입니다. 표시 이름은 다른 사람에게 보이는 이름을 바꾸는 설정입니다.",
              "en": "The login ID is a separate credential. A display-name edit changes how other people see the profile."
            },
            "hint": {
              "ko": "계정 화면에서 읽기 전용 로그인 아이디 항목을 떠올려 보세요.",
              "en": "Think of the read-only Login ID field in Account."
            }
          }
        },
        {
          "id": "attach-existing",
          "title": {
            "ko": "기존 기록에 아이디 로그인 연결",
            "en": "Add ID login to existing records"
          },
          "body": {
            "ko": "기존 ChatGPT 계정의 기록을 유지하면서 아이디 로그인을 설정합니다. 갱 이름·파이터 수·캠페인을 확인해 올바른 계정인지 판단합니다. 새 회원가입을 기존 계정 연결과 혼동하지 않습니다. 계정의 아이디 로그인 설정을 선택하고 사용 가능한 아이디와 새 비밀번호를 저장합니다. 이 작업은 현재 계정에 접속 방법을 추가합니다. 설정 뒤 로그인 아이디가 표시되는지 보고 기존 갱과 캠페인이 유지됐는지 확인합니다. 같은 이메일이나 이름이 자동 연결을 의미하지는 않습니다.",
            "en": "Set up ID login while retaining records owned by an existing ChatGPT account. Inspect gang names, fighter counts and campaigns to verify the account. Do not confuse new registration with connecting an existing profile. Choose Set up ID login and save an available ID with a new password. This adds a sign-in method to the current account. Check the saved login ID and verify the existing gangs and campaigns. Matching names or emails do not imply automatic account linking."
          },
          "bullets": [
            {
              "ko": "원래 계정에서 명시적으로 아이디 로그인 설정을 사용하세요.",
              "en": "Use explicit ID-login setup from the original account."
            },
            {
              "ko": "설정을 시작하기 전에 기존 갱과 캠페인이 원래 계정에 보이나요?",
              "en": "Are the original gangs and campaigns visible before you start setup?"
            }
          ],
          "references": [],
          "objective": {
            "ko": "기존 ChatGPT 계정의 기록을 유지하면서 아이디 로그인을 설정합니다.",
            "en": "Set up ID login while retaining records owned by an existing ChatGPT account."
          },
          "preparation": [
            {
              "ko": "갱과 캠페인이 보이는 원래 ChatGPT 계정에 먼저 로그인합니다.",
              "en": "First sign in to the original ChatGPT account where the gangs and campaigns are visible."
            }
          ],
          "walkthrough": [
            {
              "title": {
                "ko": "원래 기록 확인",
                "en": "Verify the original records"
              },
              "body": {
                "ko": "갱 이름·파이터 수·캠페인을 확인해 올바른 계정인지 판단합니다. 새 회원가입을 기존 계정 연결과 혼동하지 않습니다.",
                "en": "Inspect gang names, fighter counts and campaigns to verify the account. Do not confuse new registration with connecting an existing profile."
              },
              "result": {
                "ko": "기록 소유 계정을 확정합니다.",
                "en": "You establish which account owns the records."
              }
            },
            {
              "title": {
                "ko": "아이디 로그인 설정",
                "en": "Set up ID login"
              },
              "body": {
                "ko": "계정의 아이디 로그인 설정을 선택하고 사용 가능한 아이디와 새 비밀번호를 저장합니다. 이 작업은 현재 계정에 접속 방법을 추가합니다.",
                "en": "Choose Set up ID login and save an available ID with a new password. This adds a sign-in method to the current account."
              },
              "result": {
                "ko": "새 계정을 만들지 않고 연결합니다.",
                "en": "You connect a method without creating another account."
              }
            },
            {
              "title": {
                "ko": "같은 기록 검증",
                "en": "Verify the same records"
              },
              "body": {
                "ko": "설정 뒤 로그인 아이디가 표시되는지 보고 기존 갱과 캠페인이 유지됐는지 확인합니다. 같은 이메일이나 이름이 자동 연결을 의미하지는 않습니다.",
                "en": "Check the saved login ID and verify the existing gangs and campaigns. Matching names or emails do not imply automatic account linking."
              },
              "result": {
                "ko": "기존 소유권과 기록을 유지합니다.",
                "en": "You retain original ownership and records."
              }
            }
          ],
          "workedExample": {
            "situation": {
              "ko": "ChatGPT 계정에 캠페인 2개가 있고 새 아이디로 접속하고 싶습니다.",
              "en": "An existing ChatGPT account owns two campaigns, and you want ID sign-in."
            },
            "steps": [
              {
                "ko": "캠페인 2개가 보이는 기존 계정을 엽니다.",
                "en": "Open the existing account where both campaigns are visible."
              },
              {
                "ko": "그 계정에서 아이디 로그인 설정을 저장합니다.",
                "en": "Save Set up ID login from that account."
              },
              {
                "ko": "이후 아이디로 로그인해 같은 캠페인 2개를 확인합니다.",
                "en": "Later sign in with the ID and verify both campaigns."
              }
            ],
            "result": {
              "ko": "이메일이 같다는 이유로 서로 다른 계정을 자동 병합하지 않습니다.",
              "en": "Separate accounts do not merge automatically because their emails match."
            }
          },
          "pitfalls": [
            {
              "problem": {
                "ko": "새 회원가입만 하면 기존 ChatGPT 기록이 옮겨온다고 생각합니다.",
                "en": "You expect new registration to transfer existing ChatGPT records."
              },
              "fix": {
                "ko": "원래 계정에서 명시적으로 아이디 로그인 설정을 사용하세요.",
                "en": "Use explicit ID-login setup from the original account."
              }
            }
          ],
          "selfCheck": {
            "ko": "설정을 시작하기 전에 기존 갱과 캠페인이 원래 계정에 보이나요?",
            "en": "Are the original gangs and campaigns visible before you start setup?"
          }
        },
        {
          "id": "conflicts",
          "title": {
            "ko": "두 기기의 저장 충돌 다루기",
            "en": "Handle a conflict between devices"
          },
          "body": {
            "ko": "변경 내용을 비교한 뒤 보관할 사본을 선택합니다. 기기에서만 보이는 중요한 변경이 있다면 먼저 백업합니다. 더 높은 크레딧이나 더 늦게 연 창이 반드시 최신은 아닙니다. 최근 구매·보상·파이터 추가를 기준으로 어느 사본에 원하는 내용이 있는지 확인합니다. 계정 아이디도 함께 확인합니다. 충돌 창에서 선택한 사본을 적용한 뒤 저장 완료를 기다립니다. 다른 기기에서 기록을 다시 열어 같은 내용을 보는지 확인합니다.",
            "en": "Compare changes before selecting the copy to retain. Back up important changes visible only on the device. Higher credits or a more recently opened window do not necessarily identify the desired copy. Compare recent purchases, rewards and fighter additions to locate the desired edits. Verify the account ID as well. Apply the selected copy through the conflict controls, wait for saving, then reopen the records on the other device."
          },
          "bullets": [
            {
              "ko": "선택 전에 사본과 변경 내역을 확인하고 백업하세요.",
              "en": "Inspect and back up the copy before choosing."
            },
            {
              "ko": "선택할 사본에 원하는 구매·보상 기록이 들어 있나요?",
              "en": "Does the selected copy contain the purchases and rewards you intend to retain?"
            }
          ],
          "references": [],
          "objective": {
            "ko": "변경 내용을 비교한 뒤 보관할 사본을 선택합니다.",
            "en": "Compare changes before selecting the copy to retain."
          },
          "preparation": [
            {
              "ko": "충돌 안내가 보이면 양쪽 기기의 추가 편집을 잠시 멈춥니다.",
              "en": "Pause further editing on both devices when a conflict appears."
            }
          ],
          "walkthrough": [
            {
              "title": {
                "ko": "기기 사본 보존",
                "en": "Preserve the device copy"
              },
              "body": {
                "ko": "기기에서만 보이는 중요한 변경이 있다면 먼저 백업합니다. 더 높은 크레딧이나 더 늦게 연 창이 반드시 최신은 아닙니다.",
                "en": "Back up important changes visible only on the device. Higher credits or a more recently opened window do not necessarily identify the desired copy."
              },
              "result": {
                "ko": "비교할 근거를 남깁니다.",
                "en": "You preserve evidence for comparison."
              }
            },
            {
              "title": {
                "ko": "서버와 기기 내용 대조",
                "en": "Compare server and device changes"
              },
              "body": {
                "ko": "최근 구매·보상·파이터 추가를 기준으로 어느 사본에 원하는 내용이 있는지 확인합니다. 계정 아이디도 함께 확인합니다.",
                "en": "Compare recent purchases, rewards and fighter additions to locate the desired edits. Verify the account ID as well."
              },
              "result": {
                "ko": "보관할 사본을 정합니다.",
                "en": "You identify the copy to retain."
              }
            },
            {
              "title": {
                "ko": "한쪽 선택 후 다시 연결",
                "en": "Choose and reconnect"
              },
              "body": {
                "ko": "충돌 창에서 선택한 사본을 적용한 뒤 저장 완료를 기다립니다. 다른 기기에서 기록을 다시 열어 같은 내용을 보는지 확인합니다.",
                "en": "Apply the selected copy through the conflict controls, wait for saving, then reopen the records on the other device."
              },
              "result": {
                "ko": "두 기기의 기준을 다시 맞춥니다.",
                "en": "Both devices return to a consistent basis."
              }
            }
          ],
          "workedExample": {
            "situation": {
              "ko": "휴대전화는 장비 구매 후 80크레딧, PC는 구매 전 100크레딧입니다.",
              "en": "The phone shows 80 credits after a purchase; the PC still shows the previous 100."
            },
            "steps": [
              {
                "ko": "장비가 실제 추가된 사본과 구매 기록을 확인합니다.",
                "en": "Locate the copy containing the added equipment and purchase record."
              },
              {
                "ko": "현재 기기 사본을 백업하고 원하는 변경을 비교합니다.",
                "en": "Back up the device copy and compare the desired edits."
              },
              {
                "ko": "올바른 사본을 선택한 뒤 다른 기기를 다시 확인합니다.",
                "en": "Choose the intended copy and verify the other device again."
              }
            ],
            "result": {
              "ko": "잔액 100이라는 이유만으로 구매 전 사본을 선택하지 않습니다.",
              "en": "A balance of 100 does not make the pre-purchase copy preferable."
            }
          },
          "pitfalls": [
            {
              "problem": {
                "ko": "서버 사본을 고른 뒤 사라진 기기 변경을 다시 기억해 입력하려 합니다.",
                "en": "You choose the server copy and only then try to remember lost device edits."
              },
              "fix": {
                "ko": "선택 전에 사본과 변경 내역을 확인하고 백업하세요.",
                "en": "Inspect and back up the copy before choosing."
              }
            }
          ],
          "selfCheck": {
            "ko": "선택할 사본에 원하는 구매·보상 기록이 들어 있나요?",
            "en": "Does the selected copy contain the purchases and rewards you intend to retain?"
          },
          "exercise": {
            "type": "choice",
            "prompt": {
              "ko": "두 기기의 크레딧이 다를 때 먼저 할 일은?",
              "en": "When credits differ between two devices, what should you do first?"
            },
            "options": [
              {
                "id": "1",
                "text": {
                  "ko": "계정과 변경 내역을 비교하고 기기 사본을 보존한다",
                  "en": "Compare the account and changes, preserving the device copy"
                },
                "feedback": {
                  "ko": "맞습니다. 원하는 변경이 든 사본인지 판단할 근거가 생깁니다.",
                  "en": "Correct: this gives you a basis for choosing the copy containing the intended edits."
                }
              },
              {
                "id": "2",
                "text": {
                  "ko": "숫자가 큰 쪽을 무조건 고른다",
                  "en": "Always select the larger number"
                },
                "feedback": {
                  "ko": "구매가 반영된 최신 사본은 크레딧이 더 적을 수 있습니다.",
                  "en": "A copy containing a recent purchase can correctly have fewer credits."
                }
              },
              {
                "id": "3",
                "text": {
                  "ko": "브라우저 데이터를 모두 삭제한다",
                  "en": "Delete all browser data"
                },
                "feedback": {
                  "ko": "아직 전송되지 않은 변경까지 잃을 수 있습니다.",
                  "en": "You could lose changes that have not reached the server."
                }
              }
            ],
            "correctOption": "1",
            "explanation": {
              "ko": "잔액만으로 최신 여부를 판단할 수 없습니다. 사본을 보존하고 계정과 구체적 변경을 대조하세요.",
              "en": "A balance alone cannot identify the desired copy. Preserve a copy and compare the account and specific changes."
            },
            "hint": {
              "ko": "구매가 반영되면 잔액은 줄어든다는 점을 생각해 보세요.",
              "en": "Remember that a correctly recorded purchase reduces the balance."
            }
          }
        },
        {
          "id": "backup-review",
          "title": {
            "ko": "가져오기 검토와 복구",
            "en": "Review imports and recovery"
          },
          "body": {
            "ko": "백업 파일을 검토하고 원치 않는 교체를 취소하거나 복구합니다. 가져오기에서 JSON 파일을 선택하면 검토 내용을 읽습니다. 파일 이름만 믿지 말고 갱·파이터·캠페인 수를 확인합니다. 원하는 파일이 아니면 취소합니다. 적용은 현재 기록에 영향을 주므로 수업 연습을 실제 가져오기와 혼동하지 않습니다. 적용한 뒤 잘못된 파일임을 알았다면 가져오기 전 기록 복구 안내를 확인합니다. 복구 후 대표 갱과 계정 저장도 다시 봅니다.",
            "en": "Review a backup before replacement and cancel or recover an unintended import. After selecting JSON for import, read the review. Check gang, fighter and campaign counts instead of trusting only the filename. Cancel if it is not the intended file. Applying affects current records; a tutorial exercise is not a real import. If the applied file was wrong, inspect Restore before import. After recovery, verify a representative gang and account saving."
          },
          "bullets": [
            {
              "ko": "내보내기는 사본 생성, 가져오기는 파일 내용 적용이라는 차이를 확인하세요.",
              "en": "Export creates a copy; import applies a file’s contents."
            },
            {
              "ko": "파일 선택 뒤 적용 전에 기록 수를 확인했나요?",
              "en": "Did you check record counts after selecting the file and before applying it?"
            }
          ],
          "references": [],
          "objective": {
            "ko": "백업 파일을 검토하고 원치 않는 교체를 취소하거나 복구합니다.",
            "en": "Review a backup before replacement and cancel or recover an unintended import."
          },
          "preparation": [
            {
              "ko": "현재 기록부터 내보내고 실제 다운로드를 확인합니다.",
              "en": "Export the current records and verify the download first."
            }
          ],
          "walkthrough": [
            {
              "title": {
                "ko": "파일 선택과 검토 구분",
                "en": "Separate selection from review"
              },
              "body": {
                "ko": "가져오기에서 JSON 파일을 선택하면 검토 내용을 읽습니다. 파일 이름만 믿지 말고 갱·파이터·캠페인 수를 확인합니다.",
                "en": "After selecting JSON for import, read the review. Check gang, fighter and campaign counts instead of trusting only the filename."
              },
              "result": {
                "ko": "적용할 내용을 미리 확인합니다.",
                "en": "You inspect the incoming contents."
              }
            },
            {
              "title": {
                "ko": "명시적 적용 또는 취소",
                "en": "Apply or cancel explicitly"
              },
              "body": {
                "ko": "원하는 파일이 아니면 취소합니다. 적용은 현재 기록에 영향을 주므로 수업 연습을 실제 가져오기와 혼동하지 않습니다.",
                "en": "Cancel if it is not the intended file. Applying affects current records; a tutorial exercise is not a real import."
              },
              "result": {
                "ko": "원치 않는 교체를 막습니다.",
                "en": "You avoid an unintended replacement."
              }
            },
            {
              "title": {
                "ko": "복구 가능 상태 점검",
                "en": "Inspect recovery"
              },
              "body": {
                "ko": "적용한 뒤 잘못된 파일임을 알았다면 가져오기 전 기록 복구 안내를 확인합니다. 복구 후 대표 갱과 계정 저장도 다시 봅니다.",
                "en": "If the applied file was wrong, inspect Restore before import. After recovery, verify a representative gang and account saving."
              },
              "result": {
                "ko": "파일 복구와 저장 상태를 함께 확인합니다.",
                "en": "You check recovery and saving together."
              }
            }
          ],
          "workedExample": {
            "situation": {
              "ko": "현재 갱은 3개인데 검토 창에는 갱 1개만 나옵니다.",
              "en": "You currently own three gangs, but the import review lists one."
            },
            "steps": [
              {
                "ko": "이 파일로 현재 기록을 바꾸려는 것이 맞는지 확인합니다.",
                "en": "Decide whether replacing current records with that file is intended."
              },
              {
                "ko": "아니라면 적용하지 않고 취소합니다.",
                "en": "If not, cancel without applying."
              },
              {
                "ko": "정확한 파일을 찾고 다시 검토합니다.",
                "en": "Locate the correct file and review it again."
              }
            ],
            "result": {
              "ko": "검토 단계에서 취소하면 원래 명단을 보존할 수 있습니다.",
              "en": "Canceling at review preserves the original roster."
            }
          },
          "pitfalls": [
            {
              "problem": {
                "ko": "가져오기와 파일 내려받기를 같은 작업으로 생각합니다.",
                "en": "You confuse importing with downloading a backup."
              },
              "fix": {
                "ko": "내보내기는 사본 생성, 가져오기는 파일 내용 적용이라는 차이를 확인하세요.",
                "en": "Export creates a copy; import applies a file’s contents."
              }
            }
          ],
          "selfCheck": {
            "ko": "파일 선택 뒤 적용 전에 기록 수를 확인했나요?",
            "en": "Did you check record counts after selecting the file and before applying it?"
          }
        },
        {
          "id": "logout-and-switch",
          "title": {
            "ko": "로그아웃과 계정 전환 확인",
            "en": "Verify logout and account switching"
          },
          "body": {
            "ko": "다른 계정으로 전환한 뒤 아이디와 기록 소유자를 다시 확인합니다. 메뉴나 계정의 로그아웃을 사용합니다. 로그인 화면으로 돌아왔는지 확인하고 비밀번호를 공개 메모에 남기지 않습니다. 접속하려는 아이디와 비밀번호로 로그인합니다. 다른 계정이 비어 보이는 것은 이전 계정의 갱이 삭제됐다는 뜻이 아닙니다. 다른 탭에서 계정을 바꿨다는 안내가 나오면 현재 계정 연결을 확인합니다. 이전 탭의 명단을 새 계정 기록으로 무작정 덮지 않습니다.",
            "en": "After switching accounts, recheck the login ID and record owner. Use Logout in the menu or account. Verify the sign-in screen and never keep the password in public notes. Sign in with the intended ID and password. An empty different account does not mean the previous account’s gangs were deleted. If another-tab account-change notice appears, verify the current account connection. Do not overwrite the new account with an old tab’s roster."
          },
          "bullets": [
            {
              "ko": "먼저 로그인 아이디와 원하는 기록 소유자를 확인하세요.",
              "en": "First verify the login ID and intended record owner."
            },
            {
              "ko": "현재 아이디가 맞고 화면에 보이는 갱의 소유자도 맞나요?",
              "en": "Are both the current ID and the visible gang’s owner the intended ones?"
            }
          ],
          "references": [],
          "objective": {
            "ko": "다른 계정으로 전환한 뒤 아이디와 기록 소유자를 다시 확인합니다.",
            "en": "After switching accounts, recheck the login ID and record owner."
          },
          "preparation": [
            {
              "ko": "중요한 미저장 변경이 없고 계정 저장이 완료됐는지 봅니다.",
              "en": "Check that important changes have finished saving."
            }
          ],
          "walkthrough": [
            {
              "title": {
                "ko": "명시적으로 로그아웃",
                "en": "Sign out explicitly"
              },
              "body": {
                "ko": "메뉴나 계정의 로그아웃을 사용합니다. 로그인 화면으로 돌아왔는지 확인하고 비밀번호를 공개 메모에 남기지 않습니다.",
                "en": "Use Logout in the menu or account. Verify the sign-in screen and never keep the password in public notes."
              },
              "result": {
                "ko": "현재 계정 접속을 끝냅니다.",
                "en": "You end access to the current account."
              }
            },
            {
              "title": {
                "ko": "다음 아이디로 로그인",
                "en": "Sign in with the next ID"
              },
              "body": {
                "ko": "접속하려는 아이디와 비밀번호로 로그인합니다. 다른 계정이 비어 보이는 것은 이전 계정의 갱이 삭제됐다는 뜻이 아닙니다.",
                "en": "Sign in with the intended ID and password. An empty different account does not mean the previous account’s gangs were deleted."
              },
              "result": {
                "ko": "새 계정의 소유 기록을 구분합니다.",
                "en": "You distinguish the new account’s records."
              }
            },
            {
              "title": {
                "ko": "여러 탭 다시 확인",
                "en": "Recheck other tabs"
              },
              "body": {
                "ko": "다른 탭에서 계정을 바꿨다는 안내가 나오면 현재 계정 연결을 확인합니다. 이전 탭의 명단을 새 계정 기록으로 무작정 덮지 않습니다.",
                "en": "If another-tab account-change notice appears, verify the current account connection. Do not overwrite the new account with an old tab’s roster."
              },
              "result": {
                "ko": "계정이 바뀐 화면임을 확인합니다.",
                "en": "You recognize the changed account context."
              }
            }
          ],
          "workedExample": {
            "situation": {
              "ko": "아이디 A에는 갱 2개, 아이디 B는 새 계정입니다.",
              "en": "ID A owns two gangs; ID B is a new account."
            },
            "steps": [
              {
                "ko": "A의 저장 상태를 확인하고 로그아웃합니다.",
                "en": "Verify A has saved and sign out."
              },
              {
                "ko": "B로 로그인해 B의 로그인 아이디를 확인합니다.",
                "en": "Sign in as B and inspect B’s login ID."
              },
              {
                "ko": "B가 비어 있어도 A의 기록을 자동으로 가져오지 않습니다.",
                "en": "Do not automatically import A’s records simply because B is empty."
              }
            ],
            "result": {
              "ko": "계정별 기록을 분리한 채 원하는 계정으로 다시 접속할 수 있습니다.",
              "en": "Records remain separate, and you can return to the intended account."
            }
          },
          "pitfalls": [
            {
              "problem": {
                "ko": "다른 계정의 빈 화면을 보고 이전 백업을 곧바로 덮어씁니다.",
                "en": "You immediately overwrite an empty account using another account’s backup."
              },
              "fix": {
                "ko": "먼저 로그인 아이디와 원하는 기록 소유자를 확인하세요.",
                "en": "First verify the login ID and intended record owner."
              }
            }
          ],
          "selfCheck": {
            "ko": "현재 아이디가 맞고 화면에 보이는 갱의 소유자도 맞나요?",
            "en": "Are both the current ID and the visible gang’s owner the intended ones?"
          }
        }
      ]
    },
    {
      "id": "gang-equipment-workshop",
      "category": "app",
      "editions": [
        "n23",
        "n26"
      ],
      "title": {
        "ko": "갱 창설부터 장비 구매 검수까지",
        "en": "Build a gang and verify equipment purchases"
      },
      "summary": {
        "ko": "갱 생성·영입·장비 검색·무기 프로필·구매 후 잔액을 직접 확인하는 순서입니다.",
        "en": "Follow gang creation, recruitment, equipment search, weapon profiles and purchase checks."
      },
      "minutes": 24,
      "references": [],
      "steps": [
        {
          "id": "create-gang",
          "title": {
            "ko": "판본과 갱 유형 선택",
            "en": "Choose edition and gang type"
          },
          "body": {
            "ko": "갱의 판본·유형·시작 자원을 정하고 올바른 새 명단을 만듭니다. 갱 명단에서 새 갱을 선택합니다. 이름을 적기 전에 캠페인과 같은 판본인지 먼저 봅니다. 갱 유형을 선택하고 표시되는 변형·기원·소속 같은 선택지를 검토합니다. 이 설정은 모집 가능한 파이터와 장비 목록에 영향을 줍니다. 이름과 시작 자원을 입력하고 생성 결과를 확인합니다. 시작 예산은 캠페인 합의와 판본 규칙을 따르며 이 공통 사용법 수업이 특정 금액을 강제하지 않습니다.",
            "en": "Choose edition, gang type and starting resources for the new roster. Choose New gang from the gang list. Confirm the campaign’s edition before entering the name. Select the gang type and review available variants, origins or affiliations. These choices affect fighter and equipment lists. Enter name and starting resources, then verify the created roster. Budget comes from the campaign and edition; this shared app lesson imposes no universal amount."
          },
          "bullets": [
            {
              "ko": "실제 판본 선택과 갱 유형을 먼저 확인하세요.",
              "en": "Verify the actual edition selector and gang type first."
            },
            {
              "ko": "갱의 실제 판본·유형·시작 자원이 캠페인 합의와 같은가요?",
              "en": "Do the configured edition, type and opening resources match the campaign agreement?"
            }
          ],
          "references": [],
          "objective": {
            "ko": "갱의 판본·유형·시작 자원을 정하고 올바른 새 명단을 만듭니다.",
            "en": "Choose edition, gang type and starting resources for the new roster."
          },
          "preparation": [
            {
              "ko": "캠페인에서 허용한 갱 유형과 시작 예산을 확인합니다.",
              "en": "Check the gang types and starting budget permitted by the campaign."
            }
          ],
          "walkthrough": [
            {
              "title": {
                "ko": "새 갱 열기",
                "en": "Open New gang"
              },
              "body": {
                "ko": "갱 명단에서 새 갱을 선택합니다. 이름을 적기 전에 캠페인과 같은 판본인지 먼저 봅니다.",
                "en": "Choose New gang from the gang list. Confirm the campaign’s edition before entering the name."
              },
              "result": {
                "ko": "같은 판본으로 생성을 시작합니다.",
                "en": "Creation starts in the matching edition."
              }
            },
            {
              "title": {
                "ko": "유형과 세부 선택",
                "en": "Select type and details"
              },
              "body": {
                "ko": "갱 유형을 선택하고 표시되는 변형·기원·소속 같은 선택지를 검토합니다. 이 설정은 모집 가능한 파이터와 장비 목록에 영향을 줍니다.",
                "en": "Select the gang type and review available variants, origins or affiliations. These choices affect fighter and equipment lists."
              },
              "result": {
                "ko": "실제 사용할 카탈로그의 기준을 정합니다.",
                "en": "You set the basis for the applicable catalog."
              }
            },
            {
              "title": {
                "ko": "이름과 자원 검증",
                "en": "Verify name and resources"
              },
              "body": {
                "ko": "이름과 시작 자원을 입력하고 생성 결과를 확인합니다. 시작 예산은 캠페인 합의와 판본 규칙을 따르며 이 공통 사용법 수업이 특정 금액을 강제하지 않습니다.",
                "en": "Enter name and starting resources, then verify the created roster. Budget comes from the campaign and edition; this shared app lesson imposes no universal amount."
              },
              "result": {
                "ko": "새 갱의 표시와 시작 잔액을 확인합니다.",
                "en": "You verify the new gang and opening balance."
              }
            }
          ],
          "workedExample": {
            "situation": {
              "ko": "연습용 캠페인에서 시작 자원을 800크레딧으로 정했다고 가정합니다.",
              "en": "Assume a practice campaign has agreed on 800 starting credits."
            },
            "steps": [
              {
                "ko": "같은 판본과 허용 갱 유형을 선택합니다.",
                "en": "Choose the matching edition and allowed gang type."
              },
              {
                "ko": "이름과 합의한 시작 자원 800을 입력합니다.",
                "en": "Enter the name and agreed opening resources of 800."
              },
              {
                "ko": "새 명단에 파이터가 없고 잔액이 800인지 확인합니다.",
                "en": "Verify an empty starting roster and balance of 800."
              }
            ],
            "result": {
              "ko": "800은 앱 조작 예시이며 모든 캠페인의 공식 시작 예산이라는 뜻이 아닙니다.",
              "en": "800 is an interface example, not a universal official campaign budget."
            }
          },
          "pitfalls": [
            {
              "problem": {
                "ko": "이름에 판본을 써 넣었으니 실제 판본 선택은 무시합니다.",
                "en": "You put the edition in the name and ignore the edition selector."
              },
              "fix": {
                "ko": "실제 판본 선택과 갱 유형을 먼저 확인하세요.",
                "en": "Verify the actual edition selector and gang type first."
              }
            }
          ],
          "selfCheck": {
            "ko": "갱의 실제 판본·유형·시작 자원이 캠페인 합의와 같은가요?",
            "en": "Do the configured edition, type and opening resources match the campaign agreement?"
          }
        },
        {
          "id": "recruit-fighter",
          "title": {
            "ko": "파이터 유형과 실제 비용 확인",
            "en": "Verify fighter type and actual cost"
          },
          "body": {
            "ko": "파이터 유형·능력치·선택 장비를 보고 영입 비용을 확인합니다. 파이터 추가에서 실제 카탈로그 유형을 고릅니다. 직접 입력은 필요한 커스텀 기록에만 쓰고 표준 능력치를 대신 추측하지 않습니다. 전문화·기본 장비 선택이 나오면 빠진 항목이 없는지 봅니다. 유형을 바꾼 뒤 이전 선택이 그대로 유효하다고 가정하지 않습니다. 표시된 총 영입 비용을 잔액과 비교한 뒤 추가합니다. 새 파이터의 이름·능력치·장비와 차감된 자원을 확인합니다.",
            "en": "Check fighter type, characteristics and selected equipment before recruitment. Choose the catalog fighter type in Add fighter. Use manual input only for intentional custom records rather than guessing standard characteristics. Review required specialization or starting-equipment choices. After changing type, do not assume previous choices remain valid. Compare the displayed total cost with the balance, then add the fighter. Verify name, characteristics, equipment and deducted resources."
          },
          "bullets": [
            {
              "ko": "확인창의 능력치·전문화·선택 장비까지 읽고 추가하세요.",
              "en": "Read characteristics, specialization and selected equipment before adding."
            },
            {
              "ko": "영입 총액에 무엇이 포함됐는지 설명할 수 있나요?",
              "en": "Can you explain what the recruitment total includes?"
            }
          ],
          "references": [],
          "objective": {
            "ko": "파이터 유형·능력치·선택 장비를 보고 영입 비용을 확인합니다.",
            "en": "Check fighter type, characteristics and selected equipment before recruitment."
          },
          "preparation": [
            {
              "ko": "소유한 갱의 파이터 명단과 현재 크레딧을 확인합니다.",
              "en": "Open your owned gang’s fighter list and inspect current credits."
            }
          ],
          "walkthrough": [
            {
              "title": {
                "ko": "유형 선택",
                "en": "Select the fighter type"
              },
              "body": {
                "ko": "파이터 추가에서 실제 카탈로그 유형을 고릅니다. 직접 입력은 필요한 커스텀 기록에만 쓰고 표준 능력치를 대신 추측하지 않습니다.",
                "en": "Choose the catalog fighter type in Add fighter. Use manual input only for intentional custom records rather than guessing standard characteristics."
              },
              "result": {
                "ko": "기본 능력치와 유형 정보를 불러옵니다.",
                "en": "The type’s characteristics and information are loaded."
              }
            },
            {
              "title": {
                "ko": "필수 선택 확인",
                "en": "Review required choices"
              },
              "body": {
                "ko": "전문화·기본 장비 선택이 나오면 빠진 항목이 없는지 봅니다. 유형을 바꾼 뒤 이전 선택이 그대로 유효하다고 가정하지 않습니다.",
                "en": "Review required specialization or starting-equipment choices. After changing type, do not assume previous choices remain valid."
              },
              "result": {
                "ko": "영입할 파이터의 구성을 확정합니다.",
                "en": "You establish the recruited fighter’s actual configuration."
              }
            },
            {
              "title": {
                "ko": "비용과 결과 대조",
                "en": "Compare cost and result"
              },
              "body": {
                "ko": "표시된 총 영입 비용을 잔액과 비교한 뒤 추가합니다. 새 파이터의 이름·능력치·장비와 차감된 자원을 확인합니다.",
                "en": "Compare the displayed total cost with the balance, then add the fighter. Verify name, characteristics, equipment and deducted resources."
              },
              "result": {
                "ko": "기록과 잔액을 함께 검수합니다.",
                "en": "You inspect both the roster and balance."
              }
            }
          ],
          "workedExample": {
            "situation": {
              "ko": "가상 영입 창에서 기본 80, 선택 장비 20, 총 비용 100이 표시됩니다.",
              "en": "A hypothetical recruitment form shows base 80, selected equipment 20 and total 100."
            },
            "steps": [
              {
                "ko": "총 비용 100에 선택 장비가 포함됐는지 확인합니다.",
                "en": "Check whether the selected equipment is included in the total 100."
              },
              {
                "ko": "시작 잔액 300에서 총 100을 지불하면 200이 남습니다.",
                "en": "Paying the total 100 from an opening 300 leaves 200."
              },
              {
                "ko": "이미 포함된 20을 또 수동 차감하지 않습니다.",
                "en": "Do not manually deduct the already included 20 again."
              }
            ],
            "result": {
              "ko": "총액과 구성 내역을 대조해 비용 중복을 피합니다.",
              "en": "Comparing total and breakdown prevents double charging."
            }
          },
          "pitfalls": [
            {
              "problem": {
                "ko": "유형 이름만 보고 능력치나 필수 장비를 확인하지 않습니다.",
                "en": "You select by type name without checking characteristics or required equipment."
              },
              "fix": {
                "ko": "확인창의 능력치·전문화·선택 장비까지 읽고 추가하세요.",
                "en": "Read characteristics, specialization and selected equipment before adding."
              }
            }
          ],
          "selfCheck": {
            "ko": "영입 총액에 무엇이 포함됐는지 설명할 수 있나요?",
            "en": "Can you explain what the recruitment total includes?"
          },
          "exercise": {
            "type": "choice",
            "prompt": {
              "ko": "가상 영입 총액 100에 선택 장비 20이 이미 포함돼 있습니다. 올바른 지출은?",
              "en": "A hypothetical total of 100 already includes 20 of selected equipment. What is the correct spending?"
            },
            "options": [
              {
                "id": "1",
                "text": {
                  "ko": "총액 100만 지불한다",
                  "en": "Pay the total of 100 once"
                },
                "feedback": {
                  "ko": "맞습니다. 포함된 선택 장비를 다시 더하지 않습니다.",
                  "en": "Correct: do not add included selected equipment again."
                }
              },
              {
                "id": "2",
                "text": {
                  "ko": "총액 100에 20을 다시 더해 120을 지불한다",
                  "en": "Pay 120 by adding the 20 again"
                },
                "feedback": {
                  "ko": "이미 총액에 반영된 장비를 중복 지출하게 됩니다.",
                  "en": "This double counts equipment already included in the total."
                }
              },
              {
                "id": "3",
                "text": {
                  "ko": "장비 20만 지불한다",
                  "en": "Pay only the equipment cost of 20"
                },
                "feedback": {
                  "ko": "기본 파이터 비용이 빠져 총 영입 비용이 맞지 않습니다.",
                  "en": "This omits the fighter’s base cost."
                }
              }
            ],
            "correctOption": "1",
            "explanation": {
              "ko": "표시된 총액의 구성부터 확인하세요. 포함된 비용을 별도로 다시 차감하지 않습니다.",
              "en": "Check the displayed total’s components. Do not deduct included costs a second time."
            },
            "hint": {
              "ko": "총액에 포함된 항목인지가 핵심입니다.",
              "en": "The key is whether that amount is already included."
            }
          }
        },
        {
          "id": "equipment-filters",
          "title": {
            "ko": "장비 목록과 검색 필터",
            "en": "Use equipment lists and search filters"
          },
          "body": {
            "ko": "파이터 전용 목록·거래소·분류·검색을 조합해 후보를 찾습니다. 파이터의 장비에서 추가를 선택합니다. 갱 보관고 구매인지 파이터 지급인지 구분합니다. 파이터 전용 목록 또는 허용 거래소를 고르고 장비 분류를 좁힙니다. 무제한 목록에 표시된다는 사실만으로 캠페인 구매 허가를 뜻하지는 않습니다. 이름을 검색하고 결과 수와 페이지를 확인합니다. 조건을 바꾸면 목록이 다시 정렬될 수 있으므로 이전 위치만 믿지 않습니다.",
            "en": "Combine fighter lists, trading posts, categories and search to locate candidates. Choose Add from the fighter’s equipment. Distinguish a purchase for that fighter from one for the gang stash. Choose the fighter list or authorized trading post and narrow the category. Visibility in Unrestricted does not itself grant campaign permission. Search by name and inspect the result count and page. Filter changes can refresh the list, so do not rely only on a previous position."
          },
          "bullets": [
            {
              "ko": "파이터 접근·캠페인 거래소·상대와 합의한 제한을 확인하세요.",
              "en": "Check fighter access, campaign trading posts and agreed restrictions."
            },
            {
              "ko": "지금 목록은 무엇이며 구매 대상은 파이터인가요, 보관고인가요?",
              "en": "Which list is selected, and is the purchase for a fighter or the stash?"
            }
          ],
          "references": [],
          "objective": {
            "ko": "파이터 전용 목록·거래소·분류·검색을 조합해 후보를 찾습니다.",
            "en": "Combine fighter lists, trading posts, categories and search to locate candidates."
          },
          "preparation": [
            {
              "ko": "장비를 받을 파이터와 구매 권한을 확인합니다.",
              "en": "Confirm the recipient fighter and permitted access."
            }
          ],
          "walkthrough": [
            {
              "title": {
                "ko": "장비 받을 대상 열기",
                "en": "Open the recipient"
              },
              "body": {
                "ko": "파이터의 장비에서 추가를 선택합니다. 갱 보관고 구매인지 파이터 지급인지 구분합니다.",
                "en": "Choose Add from the fighter’s equipment. Distinguish a purchase for that fighter from one for the gang stash."
              },
              "result": {
                "ko": "구매 후 들어갈 위치를 확정합니다.",
                "en": "You identify where the purchase will go."
              }
            },
            {
              "title": {
                "ko": "목록과 분류 선택",
                "en": "Select list and category"
              },
              "body": {
                "ko": "파이터 전용 목록 또는 허용 거래소를 고르고 장비 분류를 좁힙니다. 무제한 목록에 표시된다는 사실만으로 캠페인 구매 허가를 뜻하지는 않습니다.",
                "en": "Choose the fighter list or authorized trading post and narrow the category. Visibility in Unrestricted does not itself grant campaign permission."
              },
              "result": {
                "ko": "목록 접근과 규칙 허가를 구분합니다.",
                "en": "You separate catalog visibility from rules permission."
              }
            },
            {
              "title": {
                "ko": "검색과 페이지 확인",
                "en": "Inspect search and pages"
              },
              "body": {
                "ko": "이름을 검색하고 결과 수와 페이지를 확인합니다. 조건을 바꾸면 목록이 다시 정렬될 수 있으므로 이전 위치만 믿지 않습니다.",
                "en": "Search by name and inspect the result count and page. Filter changes can refresh the list, so do not rely only on a previous position."
              },
              "result": {
                "ko": "원하는 항목을 다시 식별합니다.",
                "en": "You identify the intended item again."
              }
            }
          ],
          "workedExample": {
            "situation": {
              "ko": "검색 결과가 없지만 분류는 방어구로 제한돼 있고 찾는 것은 무기입니다.",
              "en": "The result is empty because the category is armor while you are searching for a weapon."
            },
            "steps": [
              {
                "ko": "현재 장비 목록과 분류를 읽습니다.",
                "en": "Read the selected equipment list and category."
              },
              {
                "ko": "모든 분류 또는 맞는 무기 분류로 바꿉니다.",
                "en": "Choose all categories or the appropriate weapon category."
              },
              {
                "ko": "판본·이름·가격을 대조한 뒤 프로필을 읽습니다.",
                "en": "Compare edition, name and price, then read the profile."
              }
            ],
            "result": {
              "ko": "검색 결과 없음이 곧 규칙상 존재하지 않음을 뜻하지는 않습니다.",
              "en": "No result does not necessarily mean that the rules contain no such item."
            }
          },
          "pitfalls": [
            {
              "problem": {
                "ko": "무제한 목록에서 보이니 아무 파이터나 살 수 있다고 생각합니다.",
                "en": "You assume any fighter may buy an item shown in Unrestricted."
              },
              "fix": {
                "ko": "파이터 접근·캠페인 거래소·상대와 합의한 제한을 확인하세요.",
                "en": "Check fighter access, campaign trading posts and agreed restrictions."
              }
            }
          ],
          "selfCheck": {
            "ko": "지금 목록은 무엇이며 구매 대상은 파이터인가요, 보관고인가요?",
            "en": "Which list is selected, and is the purchase for a fighter or the stash?"
          }
        },
        {
          "id": "read-profiles",
          "title": {
            "ko": "구매 전 무기 스탯 읽기",
            "en": "Read weapon statistics before buying"
          },
          "body": {
            "ko": "사거리·정확도·S·AP·D 또는 L·탄약·특성을 판본에 맞게 읽습니다. 한 장비에 프로필이 여러 개면 사격 모드별 행을 구분합니다. 한 행의 사거리와 다른 행의 피해를 임의로 합치지 않습니다. S·AP와 판본별 피해 항목을 읽고 대시·0·특수 기호를 누락으로 단정하지 않습니다. N23의 D와 N26의 L은 다른 절차이므로 같은 값처럼 취급하지 않습니다. 탄약과 특성을 읽고 추가 설명이 필요하면 정보 버튼을 사용합니다. 실제 캠페인에서 허용된 가격과 접근 조건도 확인합니다.",
            "en": "Read range, accuracy, S, AP, D or L, ammunition and traits in the correct edition. When one item has several profiles, separate its firing-mode rows. Do not combine one row’s range with another row’s damage. Read S, AP and the edition’s damage field. A dash, zero or symbol is not automatically missing data. N23 D and N26 L belong to different procedures. Read ammunition and traits, using the information control for explanations. Check the price and access permitted in the campaign."
          },
          "bullets": [
            {
              "ko": "기호의 의미를 해당 판본 설명에서 확인하고 원래 표기를 유지하세요.",
              "en": "Check the symbol’s meaning in the edition’s description and retain its notation."
            },
            {
              "ko": "이 무기의 모드와 판본별 피해 항목을 구분할 수 있나요?",
              "en": "Can you distinguish the weapon’s modes and its edition-specific damage field?"
            }
          ],
          "references": [],
          "objective": {
            "ko": "사거리·정확도·S·AP·D 또는 L·탄약·특성을 판본에 맞게 읽습니다.",
            "en": "Read range, accuracy, S, AP, D or L, ammunition and traits in the correct edition."
          },
          "preparation": [
            {
              "ko": "구매 버튼을 누르기 전에 장비 행 아래의 프로필을 펼쳐 봅니다.",
              "en": "Inspect the profile beneath the equipment entry before buying."
            }
          ],
          "walkthrough": [
            {
              "title": {
                "ko": "모드와 사거리 구분",
                "en": "Separate modes and range"
              },
              "body": {
                "ko": "한 장비에 프로필이 여러 개면 사격 모드별 행을 구분합니다. 한 행의 사거리와 다른 행의 피해를 임의로 합치지 않습니다.",
                "en": "When one item has several profiles, separate its firing-mode rows. Do not combine one row’s range with another row’s damage."
              },
              "result": {
                "ko": "각 모드를 완전한 프로필로 읽습니다.",
                "en": "You read each mode as a complete profile."
              }
            },
            {
              "title": {
                "ko": "수치와 기호 읽기",
                "en": "Read numbers and symbols"
              },
              "body": {
                "ko": "S·AP와 판본별 피해 항목을 읽고 대시·0·특수 기호를 누락으로 단정하지 않습니다. N23의 D와 N26의 L은 다른 절차이므로 같은 값처럼 취급하지 않습니다.",
                "en": "Read S, AP and the edition’s damage field. A dash, zero or symbol is not automatically missing data. N23 D and N26 L belong to different procedures."
              },
              "result": {
                "ko": "판본과 표시 의미를 함께 봅니다.",
                "en": "You interpret the field together with its edition."
              }
            },
            {
              "title": {
                "ko": "특성과 비용 확인",
                "en": "Check traits and price"
              },
              "body": {
                "ko": "탄약과 특성을 읽고 추가 설명이 필요하면 정보 버튼을 사용합니다. 실제 캠페인에서 허용된 가격과 접근 조건도 확인합니다.",
                "en": "Read ammunition and traits, using the information control for explanations. Check the price and access permitted in the campaign."
              },
              "result": {
                "ko": "가격만 보고 구매하지 않습니다.",
                "en": "You avoid buying by price alone."
              }
            }
          ],
          "workedExample": {
            "situation": {
              "ko": "가상 무기에는 표준 모드와 고출력 모드 두 행이 있습니다.",
              "en": "A hypothetical weapon has standard and high-power profile rows."
            },
            "steps": [
              {
                "ko": "표준 행의 사거리·S·AP·피해를 한 묶음으로 읽습니다.",
                "en": "Read range, S, AP and damage together for the standard row."
              },
              {
                "ko": "고출력 행은 별도 탄약·특성까지 확인합니다.",
                "en": "Inspect ammunition and traits separately for the high-power row."
              },
              {
                "ko": "실제 사용 시 선택할 모드의 전체 행을 적용합니다.",
                "en": "Apply the full row of the chosen mode when using it."
              }
            ],
            "result": {
              "ko": "유리한 수치만 서로 합쳐 새 프로필을 만들지 않습니다.",
              "en": "You do not invent a profile by combining favorable values from different rows."
            }
          },
          "pitfalls": [
            {
              "problem": {
                "ko": "프로필의 대시를 0으로 바꿔 계산합니다.",
                "en": "You replace a profile dash with zero."
              },
              "fix": {
                "ko": "기호의 의미를 해당 판본 설명에서 확인하고 원래 표기를 유지하세요.",
                "en": "Check the symbol’s meaning in the edition’s description and retain its notation."
              }
            }
          ],
          "selfCheck": {
            "ko": "이 무기의 모드와 판본별 피해 항목을 구분할 수 있나요?",
            "en": "Can you distinguish the weapon’s modes and its edition-specific damage field?"
          }
        },
        {
          "id": "purchase-audit",
          "title": {
            "ko": "구매 확정과 잔액 검산",
            "en": "Confirm a purchase and check the balance"
          },
          "body": {
            "ko": "가격·추가 선택·수량을 확인한 뒤 지급 위치와 실제 지출을 검산합니다. 구매를 누른 뒤 비용이나 추가 효과 선택이 나오면 끝까지 확인합니다. 무료·할인·기본 포함 장비라면 화면의 적용 금액을 봅니다. 원하는 선택이 맞을 때만 확정합니다. 중간 선택창에서 취소했다면 장비가 추가됐는지와 잔액이 유지됐는지 확인합니다. 지급된 장비 이름·수량·선택 효과를 읽고 잔액을 검산합니다. 크레딧과 갱 레이팅·자산은 같은 숫자가 아니므로 각각 확인합니다.",
            "en": "Check price, extra choices and quantity, then verify destination and actual spending. After Buy, review any cost or effect choices through to the end. For free, discounted or included equipment, inspect the amount actually applied. Confirm only the intended choices. If an intermediate dialog is canceled, check whether the item was added and whether the balance stayed unchanged. Check the item, quantity and selected effects, then reconcile credits. Credits, gang rating and wealth are different measures and must be checked separately."
          },
          "bullets": [
            {
              "ko": "구매 후 잔액과 기록을 확인하고 중복 조정하지 마세요.",
              "en": "Inspect the post-purchase balance and record instead of adjusting twice."
            },
            {
              "ko": "구매 개수와 잔액 변화가 한 번만 반영됐나요?",
              "en": "Were item quantity and balance changes applied exactly once?"
            }
          ],
          "references": [],
          "objective": {
            "ko": "가격·추가 선택·수량을 확인한 뒤 지급 위치와 실제 지출을 검산합니다.",
            "en": "Check price, extra choices and quantity, then verify destination and actual spending."
          },
          "preparation": [
            {
              "ko": "현재 잔액과 구매하려는 가상 항목 가격을 따로 적어 봅니다.",
              "en": "Note the current balance and the hypothetical item’s price separately."
            }
          ],
          "walkthrough": [
            {
              "title": {
                "ko": "구매 내용 읽기",
                "en": "Read the purchase details"
              },
              "body": {
                "ko": "구매를 누른 뒤 비용이나 추가 효과 선택이 나오면 끝까지 확인합니다. 무료·할인·기본 포함 장비라면 화면의 적용 금액을 봅니다.",
                "en": "After Buy, review any cost or effect choices through to the end. For free, discounted or included equipment, inspect the amount actually applied."
              },
              "result": {
                "ko": "최종 지출을 확인합니다.",
                "en": "You identify the final spending amount."
              }
            },
            {
              "title": {
                "ko": "확정 또는 취소",
                "en": "Confirm or cancel"
              },
              "body": {
                "ko": "원하는 선택이 맞을 때만 확정합니다. 중간 선택창에서 취소했다면 장비가 추가됐는지와 잔액이 유지됐는지 확인합니다.",
                "en": "Confirm only the intended choices. If an intermediate dialog is canceled, check whether the item was added and whether the balance stayed unchanged."
              },
              "result": {
                "ko": "취소와 확정의 결과를 구분합니다.",
                "en": "You distinguish canceling from committing."
              }
            },
            {
              "title": {
                "ko": "명단과 잔액 대조",
                "en": "Reconcile inventory and balance"
              },
              "body": {
                "ko": "지급된 장비 이름·수량·선택 효과를 읽고 잔액을 검산합니다. 크레딧과 갱 레이팅·자산은 같은 숫자가 아니므로 각각 확인합니다.",
                "en": "Check the item, quantity and selected effects, then reconcile credits. Credits, gang rating and wealth are different measures and must be checked separately."
              },
              "result": {
                "ko": "장비와 자원을 함께 검수합니다.",
                "en": "You verify both inventory and resources."
              }
            }
          ],
          "workedExample": {
            "situation": {
              "ko": "가상 장비 가격 35, 보유 크레딧 120이며 추가 비용은 없습니다.",
              "en": "A hypothetical item costs 35; you have 120 credits and no extra costs."
            },
            "steps": [
              {
                "ko": "구매 전 120과 표시 가격 35를 확인합니다.",
                "en": "Verify the opening 120 and listed 35."
              },
              {
                "ko": "한 개 구매를 확정하면 120−35=85입니다.",
                "en": "Confirming one purchase gives 120−35=85."
              },
              {
                "ko": "장비 한 개와 잔액 85를 확인하고 계정 저장을 기다립니다.",
                "en": "Verify one item and balance 85, then wait for account saving."
              }
            ],
            "result": {
              "ko": "35는 계산 연습용 가격이며 실제 항목 가격은 카탈로그와 캠페인 조건을 확인합니다.",
              "en": "35 is a practice price; real prices depend on the catalog and campaign conditions."
            }
          },
          "pitfalls": [
            {
              "problem": {
                "ko": "구매가 이미 잔액에 반영됐는데 다시 수동 차감합니다.",
                "en": "You manually subtract the price after the purchase already deducted it."
              },
              "fix": {
                "ko": "구매 후 잔액과 기록을 확인하고 중복 조정하지 마세요.",
                "en": "Inspect the post-purchase balance and record instead of adjusting twice."
              }
            }
          ],
          "selfCheck": {
            "ko": "구매 개수와 잔액 변화가 한 번만 반영됐나요?",
            "en": "Were item quantity and balance changes applied exactly once?"
          },
          "exercise": {
            "type": "choice",
            "prompt": {
              "ko": "가상 잔액 120에서 가격 35 장비 한 개를 샀습니다. 다른 비용이 없으면 남는 크레딧은?",
              "en": "You bought one hypothetical item costing 35 from a balance of 120, with no other costs. What remains?"
            },
            "options": [
              {
                "id": "1",
                "text": {
                  "ko": "85크레딧",
                  "en": "85 credits"
                },
                "feedback": {
                  "ko": "맞습니다. 120−35=85이며 구매 비용을 한 번만 차감합니다.",
                  "en": "Correct: 120−35=85, with the purchase deducted once."
                }
              },
              {
                "id": "2",
                "text": {
                  "ko": "50크레딧",
                  "en": "50 credits"
                },
                "feedback": {
                  "ko": "35를 두 번 차감한 값입니다. 실제 구매 내역을 중복 적용하지 마세요.",
                  "en": "This subtracts 35 twice. Do not duplicate the purchase entry."
                }
              },
              {
                "id": "3",
                "text": {
                  "ko": "120크레딧",
                  "en": "120 credits"
                },
                "feedback": {
                  "ko": "무료 구매가 아니라는 조건이므로 비용 35가 차감돼야 합니다.",
                  "en": "The example is not free, so the cost of 35 must be deducted."
                }
              }
            ],
            "correctOption": "1",
            "explanation": {
              "ko": "시작 잔액에서 실제 확정된 비용만 한 번 뺍니다. 장비 한 개와 잔액을 함께 확인하세요.",
              "en": "Subtract the committed cost once from the opening balance. Verify one item and the resulting credits."
            },
            "hint": {
              "ko": "한 개 구매이며 추가 비용이 없다는 조건을 사용하세요.",
              "en": "Use the conditions: one item and no extra costs."
            }
          }
        },
        {
          "id": "stash-and-loadout",
          "title": {
            "ko": "보관고와 로드아웃 최종 점검",
            "en": "Check stash and loadouts"
          },
          "body": {
            "ko": "소유 장비·보관고·전투용 로드아웃을 구분하고 명단을 검토합니다. 장비가 파이터에게 지급됐는지 갱 보관고에 있는지 봅니다. 보관고에 있다는 것만으로 전투 크루가 사용 중인 것은 아닙니다. 여러 로드아웃이 있다면 포함된 장비와 전투에서 선택할 세트를 확인합니다. 미선택 장비가 프로필에 모두 반영된다고 가정하지 않습니다. 명단 검토 경고를 확인하고 캠페인 예외가 필요하면 이유를 명시합니다. 파이터 수·무기 구성·잔액을 검토한 뒤 저장 상태를 확인합니다.",
            "en": "Distinguish owned equipment, stash and battle loadouts, then review the roster. Inspect whether the item belongs to a fighter or the stash. Being in the stash does not mean a battle crew is carrying it. With multiple loadouts, inspect included equipment and the set to use in battle. Do not assume unselected gear appears in every battle profile. Inspect roster warnings and record an explicit reason for agreed exceptions. Review fighter count, weapon configuration and credits, then verify saving."
          },
          "bullets": [
            {
              "ko": "로드아웃의 장비 선택과 실제 명단 카드를 함께 확인하세요.",
              "en": "Check loadout equipment selections against the actual roster card."
            },
            {
              "ko": "파이터가 이번 전투에 들고 갈 장비가 선택 로드아웃과 일치하나요?",
              "en": "Does the fighter’s chosen battle equipment match the selected loadout?"
            }
          ],
          "references": [],
          "objective": {
            "ko": "소유 장비·보관고·전투용 로드아웃을 구분하고 명단을 검토합니다.",
            "en": "Distinguish owned equipment, stash and battle loadouts, then review the roster."
          },
          "preparation": [
            {
              "ko": "구매가 끝난 파이터와 갱 보관고를 엽니다.",
              "en": "Open the equipped fighter and gang stash after purchasing."
            }
          ],
          "walkthrough": [
            {
              "title": {
                "ko": "현재 위치 확인",
                "en": "Check the item’s location"
              },
              "body": {
                "ko": "장비가 파이터에게 지급됐는지 갱 보관고에 있는지 봅니다. 보관고에 있다는 것만으로 전투 크루가 사용 중인 것은 아닙니다.",
                "en": "Inspect whether the item belongs to a fighter or the stash. Being in the stash does not mean a battle crew is carrying it."
              },
              "result": {
                "ko": "소유와 사용 위치를 구분합니다.",
                "en": "You distinguish ownership from current use."
              }
            },
            {
              "title": {
                "ko": "로드아웃 선택 검토",
                "en": "Review loadout selection"
              },
              "body": {
                "ko": "여러 로드아웃이 있다면 포함된 장비와 전투에서 선택할 세트를 확인합니다. 미선택 장비가 프로필에 모두 반영된다고 가정하지 않습니다.",
                "en": "With multiple loadouts, inspect included equipment and the set to use in battle. Do not assume unselected gear appears in every battle profile."
              },
              "result": {
                "ko": "전투용 구성을 확인합니다.",
                "en": "You identify the battle configuration."
              }
            },
            {
              "title": {
                "ko": "명단 검토와 저장",
                "en": "Review and save the roster"
              },
              "body": {
                "ko": "명단 검토 경고를 확인하고 캠페인 예외가 필요하면 이유를 명시합니다. 파이터 수·무기 구성·잔액을 검토한 뒤 저장 상태를 확인합니다.",
                "en": "Inspect roster warnings and record an explicit reason for agreed exceptions. Review fighter count, weapon configuration and credits, then verify saving."
              },
              "result": {
                "ko": "완성된 명단을 공유할 준비를 합니다.",
                "en": "The completed roster is ready for review or sharing."
              }
            }
          ],
          "workedExample": {
            "situation": {
              "ko": "장비 두 개를 소유하지만 전투용 로드아웃에는 하나만 포함했습니다.",
              "en": "You own two items but include only one in the battle loadout."
            },
            "steps": [
              {
                "ko": "소유 장비 목록에서 두 항목을 확인합니다.",
                "en": "Verify both items in owned equipment."
              },
              {
                "ko": "선택 로드아웃에서 사용할 한 항목이 체크됐는지 봅니다.",
                "en": "Check that the selected loadout includes the intended item."
              },
              {
                "ko": "크루 선택과 명단 카드에서 같은 로드아웃을 확인합니다.",
                "en": "Verify that crew selection and roster cards use that loadout."
              }
            ],
            "result": {
              "ko": "소유 목록과 실제 전투 프로필의 차이를 설명할 수 있습니다.",
              "en": "You can explain the difference between ownership and the battle profile."
            }
          },
          "pitfalls": [
            {
              "problem": {
                "ko": "구매한 장비가 있으니 모든 로드아웃에 자동 포함됐다고 생각합니다.",
                "en": "You assume purchased gear is automatically included in every loadout."
              },
              "fix": {
                "ko": "로드아웃의 장비 선택과 실제 명단 카드를 함께 확인하세요.",
                "en": "Check loadout equipment selections against the actual roster card."
              }
            }
          ],
          "selfCheck": {
            "ko": "파이터가 이번 전투에 들고 갈 장비가 선택 로드아웃과 일치하나요?",
            "en": "Does the fighter’s chosen battle equipment match the selected loadout?"
          }
        }
      ]
    },
    {
      "id": "battle-records-workshop",
      "category": "app",
      "editions": [
        "n23",
        "n26"
      ],
      "title": {
        "ko": "전투 세션과 결과 기록 실습",
        "en": "Battle sessions and result records"
      },
      "summary": {
        "ko": "참가 갱·시나리오·크루·단계별 기록과 완료 검산을 연습합니다.",
        "en": "Practice participants, scenarios, crews, phase records and completion checks."
      },
      "minutes": 22,
      "references": [],
      "steps": [
        {
          "id": "session-or-report",
          "title": {
            "ko": "전투 세션과 결과 보고 구분",
            "en": "Choose a session or a result report"
          },
          "body": {
            "ko": "진행 중 기록할 세션과 이미 끝난 전투의 결과 보고를 구분합니다. 읽기 전용 공유 캠페인에서는 전투 운영을 임의 수정하지 않습니다. 누가 기록 담당자인지 상대와 먼저 정합니다. 전투를 진행하며 크루와 상태를 기록하려면 세션 흐름을 사용합니다. 이미 끝난 전투를 요약하려면 전투 보고 추가를 사용합니다. 시나리오·참가 갱·날짜가 같은 기록이 이미 있는지 확인합니다. 같은 전투의 세션과 별도 보고로 보상과 XP를 두 번 입력하지 않습니다.",
            "en": "Separate a live battle session from a report of an already finished battle. Do not modify battle management on a read-only shared campaign. Agree with the opponent on who records the result. Use a session to track crews and states during play. Use Add Battle Report to summarize a battle already finished. Check for a record with the same scenario, participants and date. Do not enter rewards or XP twice through both a session and a separate report."
          },
          "bullets": [
            {
              "ko": "기존 완료 기록을 먼저 확인하고 같은 전투의 중복 항목을 피하세요.",
              "en": "Check the completed record first and avoid duplicate entries for the same battle."
            },
            {
              "ko": "지금 새로 만들려는 것은 진행 세션인가요, 끝난 전투의 보고인가요?",
              "en": "Are you creating a live session or a report of a completed battle?"
            }
          ],
          "references": [],
          "objective": {
            "ko": "진행 중 기록할 세션과 이미 끝난 전투의 결과 보고를 구분합니다.",
            "en": "Separate a live battle session from a report of an already finished battle."
          },
          "preparation": [
            {
              "ko": "소유한 캠페인 또는 편집 허가된 캠페인에서 연습용 흐름을 확인합니다.",
              "en": "Inspect the workflow in an owned or editable campaign."
            }
          ],
          "walkthrough": [
            {
              "title": {
                "ko": "편집 권한 확인",
                "en": "Check editing rights"
              },
              "body": {
                "ko": "읽기 전용 공유 캠페인에서는 전투 운영을 임의 수정하지 않습니다. 누가 기록 담당자인지 상대와 먼저 정합니다.",
                "en": "Do not modify battle management on a read-only shared campaign. Agree with the opponent on who records the result."
              },
              "result": {
                "ko": "같은 전투를 중복 작성하지 않도록 합니다.",
                "en": "You avoid two people recording the same battle twice."
              }
            },
            {
              "title": {
                "ko": "기록 방식 선택",
                "en": "Choose the recording mode"
              },
              "body": {
                "ko": "전투를 진행하며 크루와 상태를 기록하려면 세션 흐름을 사용합니다. 이미 끝난 전투를 요약하려면 전투 보고 추가를 사용합니다.",
                "en": "Use a session to track crews and states during play. Use Add Battle Report to summarize a battle already finished."
              },
              "result": {
                "ko": "목적에 맞는 입력 방식을 선택합니다.",
                "en": "You choose the mode that fits the task."
              }
            },
            {
              "title": {
                "ko": "원래 기록 대조",
                "en": "Check existing records"
              },
              "body": {
                "ko": "시나리오·참가 갱·날짜가 같은 기록이 이미 있는지 확인합니다. 같은 전투의 세션과 별도 보고로 보상과 XP를 두 번 입력하지 않습니다.",
                "en": "Check for a record with the same scenario, participants and date. Do not enter rewards or XP twice through both a session and a separate report."
              },
              "result": {
                "ko": "중복 정산을 막습니다.",
                "en": "You prevent duplicate settlement."
              }
            }
          ],
          "workedExample": {
            "situation": {
              "ko": "어제 끝난 전투를 종이 기록에서 옮기려 합니다.",
              "en": "You want to transfer yesterday’s completed battle from paper notes."
            },
            "steps": [
              {
                "ko": "캠페인의 기존 전투 목록에 같은 전투가 있는지 봅니다.",
                "en": "Look for the same battle in the campaign’s existing list."
              },
              {
                "ko": "없다면 결과 보고 방식으로 참가자·시나리오·결과를 옮깁니다.",
                "en": "If absent, transfer participants, scenario and outcome using the result-report workflow."
              },
              {
                "ko": "같은 내용을 새 진행 세션으로 또 정산하지 않습니다.",
                "en": "Do not settle the same data again through another live session."
              }
            ],
            "result": {
              "ko": "기록 방식이 달라도 한 번의 전투에는 한 번의 정산만 남깁니다.",
              "en": "Different recording modes do not justify settling one battle twice."
            }
          },
          "pitfalls": [
            {
              "problem": {
                "ko": "진행 세션을 완료한 뒤 같은 보상을 별도 보고에도 다시 입력합니다.",
                "en": "You complete a session and enter its rewards again in another report."
              },
              "fix": {
                "ko": "기존 완료 기록을 먼저 확인하고 같은 전투의 중복 항목을 피하세요.",
                "en": "Check the completed record first and avoid duplicate entries for the same battle."
              }
            }
          ],
          "selfCheck": {
            "ko": "지금 새로 만들려는 것은 진행 세션인가요, 끝난 전투의 보고인가요?",
            "en": "Are you creating a live session or a report of a completed battle?"
          }
        },
        {
          "id": "participants",
          "title": {
            "ko": "서로 다른 참가 갱 선택",
            "en": "Select distinct participating gangs"
          },
          "body": {
            "ko": "내 갱과 상대 갱을 정확하게 고르고 캠페인 등록 상태를 확인합니다. 새 전투에서 자신의 갱을 고릅니다. 같은 이름의 사본이 있으면 원본과 공유 읽기 전용 명단을 구분합니다. 상대 목록에서 실제 플레이할 다른 갱을 선택합니다. 같은 갱을 양쪽 참가자로 선택하지 않습니다. 공격자·방어자 역할이 필요한 시나리오라면 맞게 지정합니다. 결과 보고에는 서로 다른 갱이 최소 두 개 필요합니다.",
            "en": "Select your gang and opponents accurately, checking campaign membership. Choose your gang in New Battle. If names are duplicated, distinguish the original from a shared read-only roster. Select the actual opposing gangs. Do not select the same gang as both sides. Assign attacker or defender when required by the scenario. A result report needs at least two different gangs."
          },
          "bullets": [
            {
              "ko": "캠페인의 갱 등록 상태를 먼저 확인하세요.",
              "en": "Check the opponent’s campaign registration first."
            },
            {
              "ko": "선택된 갱이 실제 참가자와 같고 중복되지 않나요?",
              "en": "Do selected gangs match the real participants without duplicates?"
            }
          ],
          "references": [],
          "objective": {
            "ko": "내 갱과 상대 갱을 정확하게 고르고 캠페인 등록 상태를 확인합니다.",
            "en": "Select your gang and opponents accurately, checking campaign membership."
          },
          "preparation": [
            {
              "ko": "필요한 갱이 캠페인에 등록돼 있는지 봅니다.",
              "en": "Check that the required gangs are registered in the campaign."
            }
          ],
          "walkthrough": [
            {
              "title": {
                "ko": "내 갱 선택",
                "en": "Select your gang"
              },
              "body": {
                "ko": "새 전투에서 자신의 갱을 고릅니다. 같은 이름의 사본이 있으면 원본과 공유 읽기 전용 명단을 구분합니다.",
                "en": "Choose your gang in New Battle. If names are duplicated, distinguish the original from a shared read-only roster."
              },
              "result": {
                "ko": "자신의 참가 기록을 확인합니다.",
                "en": "You identify your participant record."
              }
            },
            {
              "title": {
                "ko": "상대 갱 선택",
                "en": "Select opponent gangs"
              },
              "body": {
                "ko": "상대 목록에서 실제 플레이할 다른 갱을 선택합니다. 같은 갱을 양쪽 참가자로 선택하지 않습니다.",
                "en": "Select the actual opposing gangs. Do not select the same gang as both sides."
              },
              "result": {
                "ko": "서로 다른 참가자 명단을 만듭니다.",
                "en": "You form a list of distinct participants."
              }
            },
            {
              "title": {
                "ko": "역할과 참가 수 검증",
                "en": "Verify roles and count"
              },
              "body": {
                "ko": "공격자·방어자 역할이 필요한 시나리오라면 맞게 지정합니다. 결과 보고에는 서로 다른 갱이 최소 두 개 필요합니다.",
                "en": "Assign attacker or defender when required by the scenario. A result report needs at least two different gangs."
              },
              "result": {
                "ko": "참가자와 역할을 대조합니다.",
                "en": "You reconcile participants and roles."
              }
            }
          ],
          "workedExample": {
            "situation": {
              "ko": "갱 A 대 갱 B의 결과를 기록하는데 두 칸에 모두 A를 골랐습니다.",
              "en": "You are recording A versus B but selected A in both fields."
            },
            "steps": [
              {
                "ko": "참가 갱 이름과 원본을 다시 확인합니다.",
                "en": "Recheck participant names and source records."
              },
              {
                "ko": "두 번째 칸을 갱 B로 바꿉니다.",
                "en": "Change the second field to gang B."
              },
              {
                "ko": "A와 B가 한 번씩 선택됐는지 확인합니다.",
                "en": "Verify that A and B are each selected once."
              }
            ],
            "result": {
              "ko": "최소 참가 수만 채우는 것이 아니라 서로 다른 갱이어야 합니다.",
              "en": "Meeting the count is not enough; participants must be distinct gangs."
            }
          },
          "pitfalls": [
            {
              "problem": {
                "ko": "상대 갱이 안 보이자 내 갱을 두 번 선택합니다.",
                "en": "You select your own gang twice because the opponent is absent."
              },
              "fix": {
                "ko": "캠페인의 갱 등록 상태를 먼저 확인하세요.",
                "en": "Check the opponent’s campaign registration first."
              }
            }
          ],
          "selfCheck": {
            "ko": "선택된 갱이 실제 참가자와 같고 중복되지 않나요?",
            "en": "Do selected gangs match the real participants without duplicates?"
          },
          "exercise": {
            "type": "choice",
            "prompt": {
              "ko": "전투 보고에서 갱 A를 양쪽에 선택했습니다. 올바른 수정은?",
              "en": "A battle report selects gang A on both sides. What is the correct correction?"
            },
            "options": [
              {
                "id": "1",
                "text": {
                  "ko": "실제 상대 갱 B로 한쪽을 바꾼다",
                  "en": "Replace one side with the actual opponent B"
                },
                "feedback": {
                  "ko": "맞습니다. 실제로 참가한 서로 다른 갱을 선택해야 합니다.",
                  "en": "Correct: choose the distinct gangs that actually participated."
                }
              },
              {
                "id": "2",
                "text": {
                  "ko": "이름만 다르게 표시하고 같은 갱을 유지한다",
                  "en": "Keep the same gang but change its displayed name"
                },
                "feedback": {
                  "ko": "표시 이름만으로 참가 기록의 중복이 해결되지 않습니다.",
                  "en": "A display-name change does not fix duplicate participant records."
                }
              },
              {
                "id": "3",
                "text": {
                  "ko": "참가자 없이 결과만 저장한다",
                  "en": "Save the outcome without participants"
                },
                "feedback": {
                  "ko": "보고에는 최소 두 개의 서로 다른 참가 갱이 필요합니다.",
                  "en": "A report needs at least two distinct participating gangs."
                }
              }
            ],
            "correctOption": "1",
            "explanation": {
              "ko": "실제 참가자와 갱 기록을 대응시켜야 결과와 자원이 올바른 대상에 연결됩니다.",
              "en": "Matching real participants to distinct gang records connects the outcome and resources correctly."
            },
            "hint": {
              "ko": "갱 이름뿐 아니라 선택한 기록이 서로 다른지 확인하세요.",
              "en": "Check that the selected records are distinct, not only their labels."
            }
          }
        },
        {
          "id": "scenario-setup",
          "title": {
            "ko": "시나리오와 승리 조건 입력",
            "en": "Enter scenario and victory conditions"
          },
          "body": {
            "ko": "시나리오 이름·배치·목표·크루 조건을 판본에 맞게 확인합니다. 전투 설정에서 해당 판본의 시나리오를 선택합니다. 사용자 지정 이름은 실제 합의 내용을 기록하는 용도이지 규칙 자동 생성 기능이 아닙니다. N26의 구성형 시나리오에서는 배치·목표·크루 선택 같은 필수 부분을 확인합니다. N23에서 다른 판본의 구성표를 대신 쓰지 않습니다. 저장 전 이름과 목표를 소리 내어 대조합니다. 무작위 결과를 썼다면 나온 조건과 실제 사용할 조건이 같은지 확인합니다.",
            "en": "Check scenario, deployment, objectives and crew requirements in the correct edition. Choose the scenario for the edition. A custom name records an agreement; it does not generate missing rules automatically. For an N26 scenario built from parts, review required deployment, objective and crew selections. Do not replace N23 procedures with another edition’s component tables. Before saving, reconcile the name and objectives with the opponent. If randomized, verify that the rolled result matches the conditions actually used."
          },
          "bullets": [
            {
              "ko": "실제로 합의한 시나리오 또는 필요한 구성 부분을 입력하세요.",
              "en": "Enter the agreed scenario or its required component selections."
            },
            {
              "ko": "시나리오·목표·판본을 상대와 같은 내용으로 확인했나요?",
              "en": "Have both players confirmed the same scenario, objective and edition?"
            }
          ],
          "references": [],
          "objective": {
            "ko": "시나리오 이름·배치·목표·크루 조건을 판본에 맞게 확인합니다.",
            "en": "Check scenario, deployment, objectives and crew requirements in the correct edition."
          },
          "preparation": [
            {
              "ko": "상대와 합의한 시나리오와 사용 판본을 준비합니다.",
              "en": "Have the agreed scenario and edition ready."
            }
          ],
          "walkthrough": [
            {
              "title": {
                "ko": "시나리오 선택",
                "en": "Select the scenario"
              },
              "body": {
                "ko": "전투 설정에서 해당 판본의 시나리오를 선택합니다. 사용자 지정 이름은 실제 합의 내용을 기록하는 용도이지 규칙 자동 생성 기능이 아닙니다.",
                "en": "Choose the scenario for the edition. A custom name records an agreement; it does not generate missing rules automatically."
              },
              "result": {
                "ko": "사용할 전투 조건을 식별합니다.",
                "en": "You identify the agreed battle conditions."
              }
            },
            {
              "title": {
                "ko": "필수 부분 검토",
                "en": "Review required parts"
              },
              "body": {
                "ko": "N26의 구성형 시나리오에서는 배치·목표·크루 선택 같은 필수 부분을 확인합니다. N23에서 다른 판본의 구성표를 대신 쓰지 않습니다.",
                "en": "For an N26 scenario built from parts, review required deployment, objective and crew selections. Do not replace N23 procedures with another edition’s component tables."
              },
              "result": {
                "ko": "판본별 필수 입력을 확인합니다.",
                "en": "You identify edition-specific required inputs."
              }
            },
            {
              "title": {
                "ko": "상대와 읽어 맞추기",
                "en": "Reconcile with the opponent"
              },
              "body": {
                "ko": "저장 전 이름과 목표를 소리 내어 대조합니다. 무작위 결과를 썼다면 나온 조건과 실제 사용할 조건이 같은지 확인합니다.",
                "en": "Before saving, reconcile the name and objectives with the opponent. If randomized, verify that the rolled result matches the conditions actually used."
              },
              "result": {
                "ko": "화면과 실제 플레이 조건을 맞춥니다.",
                "en": "The displayed conditions match the game being played."
              }
            }
          ],
          "workedExample": {
            "situation": {
              "ko": "두 사람이 서로 다른 목표로 알고 전투를 시작하려 합니다.",
              "en": "The two players are about to start with different understandings of the objective."
            },
            "steps": [
              {
                "ko": "전투 시작 전에 설정 화면을 함께 봅니다.",
                "en": "Inspect the setup together before starting."
              },
              {
                "ko": "합의한 목표와 시나리오 세부 조건을 확인합니다.",
                "en": "Confirm the agreed objective and scenario details."
              },
              {
                "ko": "올바른 내용을 저장한 뒤 크루 선택으로 넘어갑니다.",
                "en": "Save the correct conditions before selecting crews."
              }
            ],
            "result": {
              "ko": "목표 해석을 끝낸 뒤 진행 단계로 넘어갑니다.",
              "en": "Resolve the objective agreement before beginning play."
            }
          },
          "pitfalls": [
            {
              "problem": {
                "ko": "비어 있는 필수 부분을 임의 이름으로 넘기려 합니다.",
                "en": "You try to bypass an empty required component with an arbitrary name."
              },
              "fix": {
                "ko": "실제로 합의한 시나리오 또는 필요한 구성 부분을 입력하세요.",
                "en": "Enter the agreed scenario or its required component selections."
              }
            }
          ],
          "selfCheck": {
            "ko": "시나리오·목표·판본을 상대와 같은 내용으로 확인했나요?",
            "en": "Have both players confirmed the same scenario, objective and edition?"
          }
        },
        {
          "id": "crew-loadouts",
          "title": {
            "ko": "출전 크루와 장비 세트 선택",
            "en": "Select crews and loadouts"
          },
          "body": {
            "ko": "출전 가능한 파이터와 사용할 로드아웃을 골라 크루를 확인합니다. 참가 갱의 크루 선택을 엽니다. 사망·은퇴·요양·포획 등으로 선택할 수 없는 파이터의 상태를 확인합니다. 여러 로드아웃이 있으면 이번 전투의 세트를 고릅니다. 같은 파이터를 서로 다른 세트로 중복 출전시키지 않습니다. 선택된 파이터 수와 크루 레이팅을 봅니다. 갱 전체 레이팅·창고 장비·이번 크루 레이팅이 같은 뜻은 아닙니다.",
            "en": "Select eligible fighters and their intended loadouts, then review the crew. Open Select Crew for the participant. Inspect fighters disabled by states such as death, retirement, Recovery or capture. Choose the loadout for this battle when multiple sets exist. Do not field the same fighter twice through different loadouts. Inspect fighter count and crew rating. The full gang rating, stash equipment and selected crew rating are not identical measures."
          },
          "bullets": [
            {
              "ko": "요양 해제 조건과 실제 캠페인 결과를 먼저 확인하세요.",
              "en": "Check actual campaign results and Recovery-clearing conditions first."
            },
            {
              "ko": "이번 크루에 같은 파이터가 한 번만 있고 올바른 세트를 쓰나요?",
              "en": "Does the crew contain each fighter once with the correct set?"
            }
          ],
          "references": [],
          "objective": {
            "ko": "출전 가능한 파이터와 사용할 로드아웃을 골라 크루를 확인합니다.",
            "en": "Select eligible fighters and their intended loadouts, then review the crew."
          },
          "preparation": [
            {
              "ko": "전투 준비 단계에서 각 갱의 명단과 요양 상태를 확인합니다.",
              "en": "Check each gang’s roster and Recovery status in Pre-Battle."
            }
          ],
          "walkthrough": [
            {
              "title": {
                "ko": "크루 선택 열기",
                "en": "Open Select Crew"
              },
              "body": {
                "ko": "참가 갱의 크루 선택을 엽니다. 사망·은퇴·요양·포획 등으로 선택할 수 없는 파이터의 상태를 확인합니다.",
                "en": "Open Select Crew for the participant. Inspect fighters disabled by states such as death, retirement, Recovery or capture."
              },
              "result": {
                "ko": "출전 불가 이유를 파악합니다.",
                "en": "You identify why a fighter is unavailable."
              }
            },
            {
              "title": {
                "ko": "파이터와 세트 선택",
                "en": "Select fighter and set"
              },
              "body": {
                "ko": "여러 로드아웃이 있으면 이번 전투의 세트를 고릅니다. 같은 파이터를 서로 다른 세트로 중복 출전시키지 않습니다.",
                "en": "Choose the loadout for this battle when multiple sets exist. Do not field the same fighter twice through different loadouts."
              },
              "result": {
                "ko": "실제 출전 구성만 선택합니다.",
                "en": "You select the actual battle configuration."
              }
            },
            {
              "title": {
                "ko": "크루 레이팅 대조",
                "en": "Verify crew rating"
              },
              "body": {
                "ko": "선택된 파이터 수와 크루 레이팅을 봅니다. 갱 전체 레이팅·창고 장비·이번 크루 레이팅이 같은 뜻은 아닙니다.",
                "en": "Inspect fighter count and crew rating. The full gang rating, stash equipment and selected crew rating are not identical measures."
              },
              "result": {
                "ko": "시나리오의 크루 조건을 확인합니다.",
                "en": "You check the scenario’s crew requirements."
              }
            }
          ],
          "workedExample": {
            "situation": {
              "ko": "한 파이터에게 기본 세트와 장거리 세트 두 로드아웃이 있습니다.",
              "en": "A fighter has default and long-range loadouts."
            },
            "steps": [
              {
                "ko": "이번 전투에서 사용할 세트 하나를 고릅니다.",
                "en": "Choose one set for the current battle."
              },
              {
                "ko": "같은 파이터의 다른 세트가 함께 선택되지 않았는지 봅니다.",
                "en": "Check that the same fighter’s other set is not also selected."
              },
              {
                "ko": "선택 장비와 크루 레이팅을 대조합니다.",
                "en": "Compare selected equipment and crew rating."
              }
            ],
            "result": {
              "ko": "로드아웃 두 개는 파이터 두 명이 아닙니다.",
              "en": "Two loadouts are not two fighters."
            }
          },
          "pitfalls": [
            {
              "problem": {
                "ko": "요양 파이터가 안 보이자 상태를 억지로 활성으로 바꿉니다.",
                "en": "You force a Recovery fighter to Active merely because they cannot be selected."
              },
              "fix": {
                "ko": "요양 해제 조건과 실제 캠페인 결과를 먼저 확인하세요.",
                "en": "Check actual campaign results and Recovery-clearing conditions first."
              }
            }
          ],
          "selfCheck": {
            "ko": "이번 크루에 같은 파이터가 한 번만 있고 올바른 세트를 쓰나요?",
            "en": "Does the crew contain each fighter once with the correct set?"
          }
        },
        {
          "id": "track-during-battle",
          "title": {
            "ko": "단계·XP·부상 기록",
            "en": "Track phases, XP and injuries"
          },
          "body": {
            "ko": "전투의 실제 결과를 세션에 기록하고 자동 판정과 구분합니다. 전투 시작을 선택하면 준비 단계에서 진행 단계로 이동합니다. 라운드 표시는 진행 기록이며 실제 주사위 굴림과 규칙 판단은 플레이 결과에 맞춰 처리합니다. 파이터 행동에서 XP·상태·지속 부상 등 실제 발생한 결과를 입력합니다. XP를 이미 입력했다면 같은 사건을 정산 때 다시 더하지 않습니다. 전투 종료는 전투 후 단계로 이동합니다. 준비로 돌아가기나 전투 재개는 기록 점검에 맞춰 사용하고 세션 취소는 단순한 창 닫기와 다름을 확인합니다.",
            "en": "Record actual battle outcomes in the session without assuming automatic adjudication. Start Battle moves the session from preparation to play. The round display tracks progress; dice and rules decisions still follow the actual game. Use Fighter Actions for actual XP, states or Lasting Injuries. If XP is already entered, do not add the same event again during settlement. End Battle moves to Post-Battle. Use return or resume controls deliberately; Cancel Battle is different from simply closing a dialog."
          },
          "bullets": [
            {
              "ko": "실제 규칙 판정 결과와 지속 부상·XP 입력을 각각 확인하세요.",
              "en": "Verify the actual rules outcome and the separate injury and XP entries."
            },
            {
              "ko": "지금 입력할 XP와 부상은 이미 기록된 사건과 중복되지 않나요?",
              "en": "Are the XP and injuries you are entering distinct from events already recorded?"
            }
          ],
          "references": [],
          "objective": {
            "ko": "전투의 실제 결과를 세션에 기록하고 자동 판정과 구분합니다.",
            "en": "Record actual battle outcomes in the session without assuming automatic adjudication."
          },
          "preparation": [
            {
              "ko": "양쪽 크루와 준비 상태를 검토한 뒤 전투를 시작합니다.",
              "en": "Review both crews and readiness before starting the battle."
            }
          ],
          "walkthrough": [
            {
              "title": {
                "ko": "전투 단계 시작",
                "en": "Start the Battle phase"
              },
              "body": {
                "ko": "전투 시작을 선택하면 준비 단계에서 진행 단계로 이동합니다. 라운드 표시는 진행 기록이며 실제 주사위 굴림과 규칙 판단은 플레이 결과에 맞춰 처리합니다.",
                "en": "Start Battle moves the session from preparation to play. The round display tracks progress; dice and rules decisions still follow the actual game."
              },
              "result": {
                "ko": "진행 화면의 역할을 이해합니다.",
                "en": "You understand the tracking screen’s role."
              }
            },
            {
              "title": {
                "ko": "파이터 결과 입력",
                "en": "Enter fighter outcomes"
              },
              "body": {
                "ko": "파이터 행동에서 XP·상태·지속 부상 등 실제 발생한 결과를 입력합니다. XP를 이미 입력했다면 같은 사건을 정산 때 다시 더하지 않습니다.",
                "en": "Use Fighter Actions for actual XP, states or Lasting Injuries. If XP is already entered, do not add the same event again during settlement."
              },
              "result": {
                "ko": "사건별 기록을 한 번씩 남깁니다.",
                "en": "Each event is recorded once."
              }
            },
            {
              "title": {
                "ko": "종료와 되돌림 구분",
                "en": "Separate ending and returning"
              },
              "body": {
                "ko": "전투 종료는 전투 후 단계로 이동합니다. 준비로 돌아가기나 전투 재개는 기록 점검에 맞춰 사용하고 세션 취소는 단순한 창 닫기와 다름을 확인합니다.",
                "en": "End Battle moves to Post-Battle. Use return or resume controls deliberately; Cancel Battle is different from simply closing a dialog."
              },
              "result": {
                "ko": "단계 이동과 기록 삭제를 구분합니다.",
                "en": "You distinguish phase changes from deleting a session."
              }
            }
          ],
          "workedExample": {
            "situation": {
              "ko": "한 사건으로 XP 1을 기록했고 종이에 같은 사건이 다시 적혀 있습니다.",
              "en": "You entered 1 XP for an event, and the same event also appears in paper notes."
            },
            "steps": [
              {
                "ko": "세션의 파이터 XP 기록을 확인합니다.",
                "en": "Inspect the fighter’s session XP entry."
              },
              {
                "ko": "종이 기록의 사건이 이미 입력한 사건인지 비교합니다.",
                "en": "Check whether the paper note describes the same event."
              },
              {
                "ko": "같은 사건이면 추가로 1을 더하지 않습니다.",
                "en": "If it is the same event, do not add another 1."
              }
            ],
            "result": {
              "ko": "앱과 종이 메모를 합산하기보다 사건을 대조합니다.",
              "en": "Reconcile events instead of blindly summing app and paper totals."
            }
          },
          "pitfalls": [
            {
              "problem": {
                "ko": "상태 표시가 규칙상 부상을 자동으로 전부 해결한다고 생각합니다.",
                "en": "You assume marking a state automatically resolves every related rules effect."
              },
              "fix": {
                "ko": "실제 규칙 판정 결과와 지속 부상·XP 입력을 각각 확인하세요.",
                "en": "Verify the actual rules outcome and the separate injury and XP entries."
              }
            }
          ],
          "selfCheck": {
            "ko": "지금 입력할 XP와 부상은 이미 기록된 사건과 중복되지 않나요?",
            "en": "Are the XP and injuries you are entering distinct from events already recorded?"
          }
        },
        {
          "id": "complete-audit",
          "title": {
            "ko": "전투 완료 전 결과 검산",
            "en": "Reconcile before completing a battle"
          },
          "body": {
            "ko": "승패·보상·XP·크레딧·부상을 비교한 뒤 완료합니다. 완료 화면에서 참가 갱과 시나리오를 보고 승자 또는 무승부를 선택합니다. 입력이 남아 있는지 안내를 읽습니다. 전투 중 기록된 XP와 크레딧 보상을 확인합니다. 시나리오 보상·캠페인 수입·별도 지출을 구분하고 같은 항목을 두 번 더하지 않습니다. 완료를 확정한 뒤 전투 목록과 관련 갱의 잔액·XP·부상을 대조합니다. 계정 저장 완료도 확인하고 같은 전투 보고를 또 만들지 않습니다.",
            "en": "Compare outcome, rewards, XP, credits and injuries before completion. In completion, review participants and scenario, then choose the winner or Draw. Read messages about missing fields. Review recorded XP and credit rewards. Separate scenario rewards, campaign income and spending, avoiding duplicate entries. After completing, compare the battle list and affected gangs’ credits, XP and injuries. Verify saving and do not create a second report for the same battle."
          },
          "bullets": [
            {
              "ko": "완료 전 상대와 보상·XP·부상·잔액을 함께 대조하세요.",
              "en": "Before completion, reconcile rewards, XP, injuries and credits with the other player."
            },
            {
              "ko": "완료 기록과 갱의 XP·크레딧·부상이 서로 일치하나요?",
              "en": "Do the completed report and the gang’s XP, credits and injuries agree?"
            }
          ],
          "references": [],
          "objective": {
            "ko": "승패·보상·XP·크레딧·부상을 비교한 뒤 완료합니다.",
            "en": "Compare outcome, rewards, XP, credits and injuries before completion."
          },
          "preparation": [
            {
              "ko": "전투 후 단계에서 양쪽의 최종 기록을 준비합니다.",
              "en": "Have both sides’ final records ready in Post-Battle."
            }
          ],
          "walkthrough": [
            {
              "title": {
                "ko": "승자 또는 무승부 확인",
                "en": "Confirm winner or draw"
              },
              "body": {
                "ko": "완료 화면에서 참가 갱과 시나리오를 보고 승자 또는 무승부를 선택합니다. 입력이 남아 있는지 안내를 읽습니다.",
                "en": "In completion, review participants and scenario, then choose the winner or Draw. Read messages about missing fields."
              },
              "result": {
                "ko": "전투 결과를 확정할 준비를 합니다.",
                "en": "You prepare to confirm the outcome."
              }
            },
            {
              "title": {
                "ko": "자원과 XP 비교",
                "en": "Compare resources and XP"
              },
              "body": {
                "ko": "전투 중 기록된 XP와 크레딧 보상을 확인합니다. 시나리오 보상·캠페인 수입·별도 지출을 구분하고 같은 항목을 두 번 더하지 않습니다.",
                "en": "Review recorded XP and credit rewards. Separate scenario rewards, campaign income and spending, avoiding duplicate entries."
              },
              "result": {
                "ko": "합의한 정산을 검산합니다.",
                "en": "You reconcile the agreed settlement."
              }
            },
            {
              "title": {
                "ko": "완료 후 원본 확인",
                "en": "Verify originals after completion"
              },
              "body": {
                "ko": "완료를 확정한 뒤 전투 목록과 관련 갱의 잔액·XP·부상을 대조합니다. 계정 저장 완료도 확인하고 같은 전투 보고를 또 만들지 않습니다.",
                "en": "After completing, compare the battle list and affected gangs’ credits, XP and injuries. Verify saving and do not create a second report for the same battle."
              },
              "result": {
                "ko": "완료 기록과 원본 명단을 함께 확인합니다.",
                "en": "You verify the completed record against original rosters."
              }
            }
          ],
          "workedExample": {
            "situation": {
              "ko": "가상 시작 잔액 90에 확정 보상 30이 있고 이미 추가 지출은 없습니다.",
              "en": "A hypothetical opening balance is 90, with a confirmed reward of 30 and no extra spending."
            },
            "steps": [
              {
                "ko": "보상 30이 이 전투에서 이미 반영됐는지 확인합니다.",
                "en": "Check whether this battle’s 30 reward was already applied."
              },
              {
                "ko": "한 번 반영한 결과는 90+30=120입니다.",
                "en": "Applying it once gives 90+30=120."
              },
              {
                "ko": "완료 기록과 잔액 120을 확인하고 다시 30을 더하지 않습니다.",
                "en": "Verify the completed record and balance 120, without adding another 30."
              }
            ],
            "result": {
              "ko": "완료는 검산을 끝낸 뒤 한 번의 정산으로 처리합니다.",
              "en": "Completion follows reconciliation and represents one settlement."
            }
          },
          "pitfalls": [
            {
              "problem": {
                "ko": "승자만 맞으면 XP와 자원은 확인하지 않아도 된다고 생각합니다.",
                "en": "You assume that a correct winner makes XP and resource checks unnecessary."
              },
              "fix": {
                "ko": "완료 전 상대와 보상·XP·부상·잔액을 함께 대조하세요.",
                "en": "Before completion, reconcile rewards, XP, injuries and credits with the other player."
              }
            }
          ],
          "selfCheck": {
            "ko": "완료 기록과 갱의 XP·크레딧·부상이 서로 일치하나요?",
            "en": "Do the completed report and the gang’s XP, credits and injuries agree?"
          },
          "exercise": {
            "type": "choice",
            "prompt": {
              "ko": "세션에서 이미 반영한 보상 30을 별도 전투 보고에도 다시 더하면?",
              "en": "What happens if you add the same reward of 30 again in another report after the session already applied it?"
            },
            "options": [
              {
                "id": "1",
                "text": {
                  "ko": "같은 전투 보상이 중복되므로 기존 기록부터 확인한다",
                  "en": "It duplicates the reward, so inspect the existing record first"
                },
                "feedback": {
                  "ko": "맞습니다. 한 전투의 같은 보상은 한 번만 정산합니다.",
                  "en": "Correct: settle the same reward from one battle only once."
                }
              },
              {
                "id": "2",
                "text": {
                  "ko": "서로 다른 화면이라 두 번 더해도 된다",
                  "en": "Two screens allow adding the reward twice"
                },
                "feedback": {
                  "ko": "화면이 달라도 같은 전투의 보상은 별도 새 수입이 아닙니다.",
                  "en": "Different screens do not make one battle’s reward a new source of income."
                }
              },
              {
                "id": "3",
                "text": {
                  "ko": "XP만 확인하면 크레딧 중복은 상관없다",
                  "en": "Only XP matters, so duplicated credits are harmless"
                },
                "feedback": {
                  "ko": "크레딧도 실제 명단 자원이므로 중복되면 다음 구매와 자산 기록이 틀어집니다.",
                  "en": "Credits are roster resources; duplication corrupts later purchases and wealth records."
                }
              }
            ],
            "correctOption": "1",
            "explanation": {
              "ko": "세션과 전투 보고는 같은 사건을 기록할 수 있습니다. 기존 완료 내역과 자원 반영 여부를 확인하세요.",
              "en": "Sessions and reports can describe the same event. Inspect the completed record and whether its resources were already applied."
            },
            "hint": {
              "ko": "새 화면과 새로운 전투 사건은 같은 뜻이 아닙니다.",
              "en": "A new screen is not necessarily a new battle event."
            }
          }
        }
      ]
    }
  ]
};
for(const item of content.details){const lesson=catalog.find(row=>row.id===item.lessonId),step=lesson?.steps.find(row=>row.id===item.stepId);if(!step)throw Error('Missing tutorial detail target: '+item.lessonId+'/'+item.stepId);const {lessonId,stepId,hint,optionFeedback,...fields}=item;Object.assign(step,fields);if(step.exercise){if(hint)step.exercise.hint=hint;for(const option of step.exercise.options||[])if(optionFeedback?.[option.id])option.feedback=optionFeedback[option.id];}lesson.minutes=Math.max(lesson.minutes,lesson.category==='app'?20:22);}
let anchor=catalog.findIndex(row=>row.id==='workspace-basics')+1;for(const lesson of content.newLessons){const current=catalog.findIndex(row=>row.id===lesson.id);if(current<0)catalog.splice(anchor++,0,lesson);else anchor=current+1;}
})();
