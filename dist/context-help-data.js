/* Bilingual contextual explanations. Presentation data only; no state writes. */
(function(){
"use strict";
window.MM_CONTEXT_HELP = Object.freeze({
  "characteristic.overview": {
    "title": {
      "ko": "능력치",
      "en": "Characteristics"
    },
    "summary": {
      "ko": "기본값에 성장·장비·부상 효과를 합친 현재 값을 사용합니다. 판본에 따라 높은 값과 낮은 값 중 유리한 방향이 다릅니다.",
      "en": "Use the current value after advancements, equipment and injuries. Which direction is better depends on the edition."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "WS·BS·세이브는 목표 숫자가 낮을수록 좋습니다. 다른 능력치는 N23과 N26의 판정 방식이 다르므로 각 능력치 설명을 확인하세요.",
          "en": "Lower WS, BS and save targets are better. Other characteristic tests differ between N23 and N26; open the individual characteristic for details."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "능력치 조정은 기록된 값을 변경합니다. 전투 중 임시 효과와 영구 성장·부상을 구분해 기록하세요.",
          "en": "Adjust Characteristics changes the recorded values. Keep temporary battle modifiers separate from permanent advancements and injuries."
        }
      }
    ]
  },
  "characteristic.m": {
    "title": {
      "ko": "이동 · M",
      "en": "Movement · M"
    },
    "summary": {
      "ko": "이동할 수 있는 거리를 인치로 나타냅니다. 값이 클수록 멀리 이동합니다.",
      "en": "Movement is measured in inches. A higher value allows a longer move."
    },
    "sections": [
      {
        "heading": {
          "ko": "언제 사용하나요?",
          "en": "When to use"
        },
        "text": {
          "ko": "이동·달리기·돌격처럼 거리를 정하는 행동을 할 때 사용합니다.",
          "en": "Use it for actions that determine movement distance."
        }
      },
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "행동 종류, 지형, 상태, 장비의 보정을 먼저 적용하세요. M만큼 이동하는 행동과 추가 주사위를 굴리는 행동은 서로 다릅니다.",
          "en": "Apply the action, terrain, state and equipment modifiers first. A move of M and an action that adds a die are different rules."
        }
      }
    ],
    "aliases": [
      "M",
      "Movement",
      "이동"
    ]
  },
  "characteristic.ws": {
    "title": {
      "ko": "근접 명중 · WS",
      "en": "Weapon Skill · WS"
    },
    "summary": {
      "ko": "근접 공격이 명중하는지 판정할 때 사용하는 목표 숫자입니다.",
      "en": "The target number used to hit with a close combat attack."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "D6를 굴려 적용할 보정 후 목표 이상이면 명중합니다. 3+는 보정이 없을 때 3·4·5·6이 성공이라는 뜻입니다. 무기·상태의 예외도 적용하세요.",
          "en": "Roll a D6 and apply the relevant modifiers; reach the target to hit. An unmodified 3+ succeeds on 3, 4, 5 or 6. Apply weapon and state exceptions."
        }
      }
    ],
    "aliases": [
      "WS",
      "Weapon Skill",
      "근접 명중"
    ]
  },
  "characteristic.bs": {
    "title": {
      "ko": "사격 명중 · BS",
      "en": "Ballistic Skill · BS"
    },
    "summary": {
      "ko": "원거리 공격이 명중하는지 판정할 때 사용하는 목표 숫자입니다.",
      "en": "The target number used to hit with a ranged attack."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "D6 결과에 해당 사거리·상태·무기 보정을 적용해 목표 이상인지 확인합니다. 단거리와 장거리 명중 보정을 혼동하지 마세요.",
          "en": "Apply the relevant range, state and weapon modifiers to a D6 roll and compare with the target. Short and long range may have different modifiers."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "무기 프로필의 명중 보정은 BS 자체를 영구 변경하는 값이 아닙니다.",
          "en": "A weapon profile accuracy modifier does not permanently change BS."
        }
      }
    ],
    "aliases": [
      "BS",
      "Ballistic Skill",
      "사격 명중"
    ]
  },
  "characteristic.s": {
    "title": {
      "ko": "힘 · S",
      "en": "Strength · S"
    },
    "summary": {
      "ko": "근접 공격의 위력과 힘을 쓰는 판정에 사용합니다.",
      "en": "Used for the strength of close combat attacks and tests of physical power."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "무기 S가 사용자의 S를 기준으로 적혀 있으면 파이터 S와 무기 보정을 합칩니다. 운드 굴림은 공격 S와 대상 T를 비교합니다.",
          "en": "If a weapon uses the wielder’s S, combine that characteristic with the weapon modifier. Compare attack S with target T to determine the wound target."
        }
      }
    ],
    "aliases": [
      "S",
      "Strength",
      "힘"
    ]
  },
  "characteristic.t": {
    "title": {
      "ko": "강인함 · T",
      "en": "Toughness · T"
    },
    "summary": {
      "ko": "공격에 얼마나 잘 버티는지 나타냅니다. 값이 높을수록 상대가 운드를 내기 어렵습니다.",
      "en": "Resistance to being wounded. A higher value makes it harder for attacks to wound."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "공격 S와 T를 비교해 운드 목표를 정합니다. T는 세이브와 별개이며 AP로 T를 직접 깎지 않습니다.",
          "en": "Compare attack S with T to determine the wound target. T is separate from an armour save; AP does not directly reduce T."
        }
      }
    ],
    "aliases": [
      "T",
      "Toughness",
      "강인함"
    ]
  },
  "characteristic.w": {
    "title": {
      "ko": "운드 · W",
      "en": "Wounds · W"
    },
    "summary": {
      "ko": "심각한 부상 판정에 들어가기 전까지 견딜 수 있는 운드를 나타냅니다.",
      "en": "How many wounds a model can sustain before injury resolution."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "피해를 받은 뒤 현재 W와 해당 판본의 피해 규칙을 적용합니다. W가 0이라는 사실과 사망은 같은 뜻이 아닙니다.",
          "en": "Apply the edition’s damage rules to the model’s remaining W. Reaching W0 does not itself mean the model dies."
        }
      }
    ],
    "variants": {
      "n23": {
        "summary": {
          "ko": "N23에서는 방어하지 못한 공격의 D만큼 W를 줄이고, W0 도달 및 초과 피해에 따라 부상 주사위를 굴립니다.",
          "en": "In N23, an unsaved hit reduces W by its Damage; reaching W0 and excess damage determine the injury dice."
        },
        "sections": [
          {
            "heading": {
              "ko": "어떻게 처리하나요?",
              "en": "Resolution"
            },
            "text": {
              "ko": "예: W2인 대상에게 D3이 들어오면 부상 주사위 2개입니다. 이후 플레시 운드·중상·OOA를 처리하며, 사망 여부는 지속 부상 결과로 결정합니다.",
              "en": "For example, D3 against a W2 target produces two injury dice. Resolve Flesh Wound, Serious Injury or OOA, then any lasting injury; death is a separate result."
            }
          }
        ]
      },
      "n26": {
        "summary": {
          "ko": "N26에서는 방어하지 못한 운드마다 W1을 잃습니다. W0이 되거나 이미 W0인 모델이 추가 피해를 받으면 무기의 L만큼 부상 주사위를 굴립니다.",
          "en": "In N26, each unsaved wound removes one W. At W0, or when an already W0 model takes further damage, roll injury dice equal to the weapon’s L."
        },
        "sections": [
          {
            "heading": {
              "ko": "어떻게 처리하나요?",
              "en": "Resolution"
            },
            "text": {
              "ko": "부상 주사위가 여러 개면 통제자가 결과 하나를 선택합니다. N23의 D만큼 W를 줄이는 방식을 여기에 적용하지 마세요.",
              "en": "When several injury dice are rolled, the controlling player selects one result. Do not apply the N23 Damage-based W reduction here."
            }
          }
        ]
      }
    },
    "aliases": [
      "W",
      "Wounds",
      "운드"
    ]
  },
  "characteristic.i": {
    "title": {
      "ko": "주도력 · I",
      "en": "Initiative · I"
    },
    "summary": {
      "ko": "반응 속도와 민첩성을 나타냅니다. 판본에 따라 값의 유리한 방향과 판정 방식이 다릅니다.",
      "en": "Reaction speed and agility. The direction of improvement and roll depend on the edition."
    },
    "sections": [
      {
        "heading": {
          "ko": "언제 사용하나요?",
          "en": "When to use"
        },
        "text": {
          "ko": "추락·도약·탈출 등 해당 행동에서 I 판정을 요구할 때 사용합니다.",
          "en": "Use it when an action calls for Initiative, such as certain movement or escape situations."
        }
      }
    ],
    "variants": {
      "n23": {
        "summary": {
          "ko": "N23의 Initiative는 D6 목표 숫자입니다. 낮은 목표가 유리하며, 보정을 적용한 결과가 목표 이상이면 성공합니다.",
          "en": "N23 Initiative is a D6 target. Lower is better; meet or exceed the target after modifiers."
        },
        "sections": [
          {
            "heading": {
              "ko": "확인할 점",
              "en": "Check first"
            },
            "text": {
              "ko": "낙하·도약·후퇴 등 각각의 행동이 요구하는 시점과 보정은 다를 수 있습니다.",
              "en": "The timing and modifiers depend on the specific fall, leap, retreat or other action."
            }
          }
        ]
      },
      "n26": {
        "summary": {
          "ko": "N26의 Initiative는 클수록 유리합니다. I 체크는 D6 결과가 보정한 능력치 이하이면 성공합니다.",
          "en": "N26 Initiative is better when higher. For an I check, a D6 result at or below the modified characteristic succeeds."
        },
        "sections": [
          {
            "heading": {
              "ko": "다른 사용처",
              "en": "Other uses"
            },
            "text": {
              "ko": "근접전 공격 순서와 일부 이동 행동의 거리에도 I를 사용합니다. 판정 목표인 N23 I와 구분하세요.",
              "en": "I also affects melee attack order and some movement distances. Keep it separate from the N23 target-number characteristic."
            }
          }
        ]
      }
    },
    "aliases": [
      "I",
      "Initiative",
      "주도력"
    ]
  },
  "characteristic.a": {
    "title": {
      "ko": "공격 수 · A",
      "en": "Attacks · A"
    },
    "summary": {
      "ko": "근접전에서 사용할 공격 수를 정하는 기준입니다.",
      "en": "The starting point for determining the number of close combat attacks."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "돌격, 무기 선택, 보조무기, 상태와 스킬에 따른 변화를 적용합니다. 모든 참가자가 항상 A만큼 공격하는 것은 아닙니다.",
          "en": "Apply the edition’s rules for charging, chosen weapons, secondary weapons, states and skills. Not every participant always attacks A times."
        }
      }
    ],
    "variants": {
      "n23": {
        "summary": {
          "ko": "N23에서는 A에 적법한 돌격·쌍수 보너스 등을 더한 뒤 선택한 무기에 공격을 배분합니다.",
          "en": "In N23, add applicable charge and dual-weapon bonuses to A, then allocate attacks between eligible weapons."
        },
        "sections": [
          {
            "heading": {
              "ko": "무기 제한",
              "en": "Weapon limits"
            },
            "text": {
              "ko": "사이드암 하나에는 보통 공격 하나만 배정합니다. 언위얼디 등 특성의 예외를 확인하세요.",
              "en": "Normally only one attack is allocated to each Sidearm. Check Unwieldy and other weapon exceptions."
            }
          }
        ]
      },
      "n26": {
        "summary": {
          "ko": "N26의 활성 모델은 주무기에 A를 사용하고, 허용된 보조무기는 별도 공격 1회입니다. 다른 근접전 참가자는 주무기 공격 1회입니다.",
          "en": "In N26, the active model uses A for its main weapon and one attack for a permitted secondary weapon. Other melee participants make one main-weapon attack."
        },
        "sections": [
          {
            "heading": {
              "ko": "보정",
              "en": "Modifiers"
            },
            "text": {
              "ko": "활성 모델의 이번 활성화 돌격 보너스, Light 무기 제한 등 해당 조건을 적용하세요.",
              "en": "Apply the active model’s charge bonus for that activation, Light weapon limits and other relevant conditions."
            }
          }
        ]
      }
    },
    "aliases": [
      "A",
      "Attacks",
      "공격"
    ]
  },
  "characteristic.ld": {
    "title": {
      "ko": "리더십 · Ld",
      "en": "Leadership · Ld"
    },
    "summary": {
      "ko": "지휘·그룹 활성화·전투 이탈 등 규칙에서 요구하는 지휘 판정에 사용합니다. 판본별 판정 방향을 확인하세요.",
      "en": "Used for leadership-related rules such as command, group activation or battle withdrawal. Check the edition’s roll direction."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "이 능력치를 사용하는 행동이라고 해서 자동으로 성공하거나 항상 같은 행동 비용을 쓰는 것은 아닙니다. 행동의 조건과 보정을 함께 적용하세요.",
          "en": "Using this characteristic does not make an action automatic or give every action the same cost. Apply that action’s conditions and modifiers."
        }
      }
    ],
    "variants": {
      "n23": {
        "summary": {
          "ko": "리더십 · Ld는 N23에서 2D6 목표 숫자입니다. 낮은 목표가 유리하며 보정 후 합이 목표 이상이면 성공합니다.",
          "en": "Leadership · Ld is a 2D6 target in N23. Lower is better; the modified total must meet or exceed the target."
        },
        "sections": [
          {
            "heading": {
              "ko": "판정",
              "en": "Roll"
            },
            "text": {
              "ko": "2D6를 합산합니다. 대상 행동·상태·스킬이 주는 보정과 재굴림을 적용하세요.",
              "en": "Add the two D6. Apply the action, state and skill modifiers and any permitted reroll."
            }
          }
        ]
      },
      "n26": {
        "summary": {
          "ko": "리더십 · Ld는 N26에서 클수록 유리합니다. 2D6 합이 보정한 능력치 이하이면 체크에 성공합니다.",
          "en": "Leadership · Ld is better when higher in N26. A 2D6 total at or below the modified characteristic passes the check."
        },
        "sections": [
          {
            "heading": {
              "ko": "판정",
              "en": "Roll"
            },
            "text": {
              "ko": "양수 체크 보정은 체크 목표 능력치에 더합니다. N23의 목표 이상 판정과 구분하세요.",
              "en": "A positive check modifier increases the target characteristic. Keep this separate from N23’s meet-or-exceed test."
            }
          }
        ]
      }
    },
    "aliases": [
      "Ld",
      "Leadership",
      "리더십"
    ]
  },
  "characteristic.cl": {
    "title": {
      "ko": "냉정 · Cl",
      "en": "Cool · Cl"
    },
    "summary": {
      "ko": "동요·공포·전장 압박을 견디는 판정에 사용합니다. 판본별 판정 방향을 확인하세요.",
      "en": "Used for tests of composure under fear, nearby casualties or battlefield pressure. Check the edition’s roll direction."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "이 능력치를 사용하는 행동이라고 해서 자동으로 성공하거나 항상 같은 행동 비용을 쓰는 것은 아닙니다. 행동의 조건과 보정을 함께 적용하세요.",
          "en": "Using this characteristic does not make an action automatic or give every action the same cost. Apply that action’s conditions and modifiers."
        }
      }
    ],
    "variants": {
      "n23": {
        "summary": {
          "ko": "냉정 · Cl는 N23에서 2D6 목표 숫자입니다. 낮은 목표가 유리하며 보정 후 합이 목표 이상이면 성공합니다.",
          "en": "Cool · Cl is a 2D6 target in N23. Lower is better; the modified total must meet or exceed the target."
        },
        "sections": [
          {
            "heading": {
              "ko": "판정",
              "en": "Roll"
            },
            "text": {
              "ko": "2D6를 합산합니다. 대상 행동·상태·스킬이 주는 보정과 재굴림을 적용하세요.",
              "en": "Add the two D6. Apply the action, state and skill modifiers and any permitted reroll."
            }
          }
        ]
      },
      "n26": {
        "summary": {
          "ko": "냉정 · Cl는 N26에서 클수록 유리합니다. 2D6 합이 보정한 능력치 이하이면 체크에 성공합니다.",
          "en": "Cool · Cl is better when higher in N26. A 2D6 total at or below the modified characteristic passes the check."
        },
        "sections": [
          {
            "heading": {
              "ko": "판정",
              "en": "Roll"
            },
            "text": {
              "ko": "양수 체크 보정은 체크 목표 능력치에 더합니다. N23의 목표 이상 판정과 구분하세요.",
              "en": "A positive check modifier increases the target characteristic. Keep this separate from N23’s meet-or-exceed test."
            }
          }
        ]
      }
    },
    "aliases": [
      "Cl",
      "Cool",
      "냉정"
    ]
  },
  "characteristic.wil": {
    "title": {
      "ko": "의지 · Wil",
      "en": "Willpower · Wil"
    },
    "summary": {
      "ko": "사이킥 파워와 정신적 저항 등에서 요구하는 판정에 사용합니다. 판본별 판정 방향을 확인하세요.",
      "en": "Used for psychic powers and other tests of will or mental resistance. Check the edition’s roll direction."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "이 능력치를 사용하는 행동이라고 해서 자동으로 성공하거나 항상 같은 행동 비용을 쓰는 것은 아닙니다. 행동의 조건과 보정을 함께 적용하세요.",
          "en": "Using this characteristic does not make an action automatic or give every action the same cost. Apply that action’s conditions and modifiers."
        }
      }
    ],
    "variants": {
      "n23": {
        "summary": {
          "ko": "의지 · Wil는 N23에서 2D6 목표 숫자입니다. 낮은 목표가 유리하며 보정 후 합이 목표 이상이면 성공합니다.",
          "en": "Willpower · Wil is a 2D6 target in N23. Lower is better; the modified total must meet or exceed the target."
        },
        "sections": [
          {
            "heading": {
              "ko": "판정",
              "en": "Roll"
            },
            "text": {
              "ko": "2D6를 합산합니다. 대상 행동·상태·스킬이 주는 보정과 재굴림을 적용하세요.",
              "en": "Add the two D6. Apply the action, state and skill modifiers and any permitted reroll."
            }
          }
        ]
      },
      "n26": {
        "summary": {
          "ko": "의지 · Wil는 N26에서 클수록 유리합니다. 2D6 합이 보정한 능력치 이하이면 체크에 성공합니다.",
          "en": "Willpower · Wil is better when higher in N26. A 2D6 total at or below the modified characteristic passes the check."
        },
        "sections": [
          {
            "heading": {
              "ko": "판정",
              "en": "Roll"
            },
            "text": {
              "ko": "양수 체크 보정은 체크 목표 능력치에 더합니다. N23의 목표 이상 판정과 구분하세요.",
              "en": "A positive check modifier increases the target characteristic. Keep this separate from N23’s meet-or-exceed test."
            }
          }
        ]
      }
    },
    "aliases": [
      "Wil",
      "Willpower",
      "의지"
    ]
  },
  "characteristic.int": {
    "title": {
      "ko": "지능 · Int",
      "en": "Intelligence · Int"
    },
    "summary": {
      "ko": "단말기 조작·수리·공작 등 해당 행동이 요구하는 판정에 사용합니다. 판본별 판정 방향을 확인하세요.",
      "en": "Used for interacting with devices, repairs, sabotage and other intellectual tasks. Check the edition’s roll direction."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "이 능력치를 사용하는 행동이라고 해서 자동으로 성공하거나 항상 같은 행동 비용을 쓰는 것은 아닙니다. 행동의 조건과 보정을 함께 적용하세요.",
          "en": "Using this characteristic does not make an action automatic or give every action the same cost. Apply that action’s conditions and modifiers."
        }
      }
    ],
    "variants": {
      "n23": {
        "summary": {
          "ko": "지능 · Int는 N23에서 2D6 목표 숫자입니다. 낮은 목표가 유리하며 보정 후 합이 목표 이상이면 성공합니다.",
          "en": "Intelligence · Int is a 2D6 target in N23. Lower is better; the modified total must meet or exceed the target."
        },
        "sections": [
          {
            "heading": {
              "ko": "판정",
              "en": "Roll"
            },
            "text": {
              "ko": "2D6를 합산합니다. 대상 행동·상태·스킬이 주는 보정과 재굴림을 적용하세요.",
              "en": "Add the two D6. Apply the action, state and skill modifiers and any permitted reroll."
            }
          }
        ]
      },
      "n26": {
        "summary": {
          "ko": "지능 · Int는 N26에서 클수록 유리합니다. 2D6 합이 보정한 능력치 이하이면 체크에 성공합니다.",
          "en": "Intelligence · Int is better when higher in N26. A 2D6 total at or below the modified characteristic passes the check."
        },
        "sections": [
          {
            "heading": {
              "ko": "판정",
              "en": "Roll"
            },
            "text": {
              "ko": "양수 체크 보정은 체크 목표 능력치에 더합니다. N23의 목표 이상 판정과 구분하세요.",
              "en": "A positive check modifier increases the target characteristic. Keep this separate from N23’s meet-or-exceed test."
            }
          }
        ]
      }
    },
    "aliases": [
      "Int",
      "Intelligence",
      "지능"
    ]
  },
  "characteristic.save": {
    "title": {
      "ko": "세이브 · Sv",
      "en": "Save · Sv"
    },
    "summary": {
      "ko": "공격의 운드를 막는 방어 목표입니다. 낮은 목표 숫자가 유리합니다.",
      "en": "The target used to prevent a wound. A lower target number is better."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "적용 가능한 세이브를 정하고 AP와 장비·엄폐 등 해당 판본의 보정을 적용한 뒤 굴립니다. 여러 방어 장비가 항상 중첩되는 것은 아닙니다.",
          "en": "Determine the applicable save, apply AP and the edition’s equipment or cover modifiers, then roll. Multiple defensive items do not automatically stack."
        }
      }
    ],
    "aliases": [
      "Sv",
      "Save",
      "세이브"
    ]
  },
  "xp.overview": {
    "title": {
      "ko": "경험치 추가",
      "en": "Add XP"
    },
    "summary": {
      "ko": "전투에서 실제로 달성한 사건을 경험치로 기록하는 화면입니다. XP를 얻기 위해 별도의 XP 주사위를 굴리는 화면은 아닙니다.",
      "en": "Record XP for events actually achieved in battle. This screen does not make a separate XP award roll."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "명중·운드·부상·회복·목표 판정을 먼저 끝낸 뒤, 그 결과가 해당 XP 조건을 충족하는지 확인해 횟수를 더하세요.",
          "en": "Finish the hit, wound, injury, recovery or objective resolution first; then count events that meet the XP condition."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "횟수와 체크박스가 입력 합계를 계산합니다. 최종 XP 추가를 눌러야 저장되며 시나리오·캠페인의 추가 보상은 별도로 확인합니다.",
          "en": "Counters and checkboxes calculate the proposed amount. Nothing is saved until Add XP is submitted. Check scenario and campaign rewards separately."
        }
      }
    ],
    "aliases": [
      "Add XP",
      "XP 추가",
      "경험치 추가"
    ]
  },
  "xp.serious-injury": {
    "title": {
      "ko": "중상 유발",
      "en": "Cause Serious Injury"
    },
    "summary": {
      "ko": "공격 결과 상대가 실제로 중상이 된 사건을 세는 항목입니다. 단순 명중·운드·핀만으로 추가하지 않습니다.",
      "en": "Count an event that actually causes Serious Injury. A hit, wound or Pin alone is not sufficient."
    },
    "sections": [
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "각 횟수는 이 화면에서 +1 XP입니다. 동일 사건을 다른 보상과 중복해 입력하지 않도록 확인하세요.",
          "en": "Each count adds 1 XP in this form. Check for overlap with other awards before counting the same event twice."
        }
      }
    ],
    "variants": {
      "n26": {
        "summary": {
          "ko": "자신의 행동으로 적에게 직접 중상을 유발하면 +1 XP입니다. 부상 판정을 끝내고 중상 상태가 확정된 뒤 기록합니다.",
          "en": "Gain 1 XP when your own action directly causes an enemy to become Seriously Injured. Record it after resolving the injury."
        },
        "sections": [
          {
            "heading": {
              "ko": "중복 방지",
              "en": "Avoid duplicates"
            },
            "text": {
              "ko": "동일 활성화에서 같은 적을 중상에 이어 OOA로 만들었다면 중상1+OOA2를 합치지 않고 OOA2만 기록합니다. 우선 대상 보너스는 별도 조건을 확인합니다.",
              "en": "If the same enemy becomes Seriously Injured and then OOA in the same activation, record the 2 XP OOA award instead of 1+2. Check the priority-target bonus separately."
            }
          }
        ]
      },
      "n23": {
        "summary": {
          "ko": "이 화면의 중상 횟수는 각 +1 XP로 계산됩니다. 해당 N23 캠페인·시나리오가 이 중상 보상을 허용하는지 먼저 확인하세요.",
          "en": "This form calculates 1 XP per Serious Injury count. First confirm that the N23 campaign or scenario awards XP for that event."
        },
        "sections": [
          {
            "heading": {
              "ko": "판정과 기록",
              "en": "Resolution and record"
            },
            "text": {
              "ko": "실제 부상 결과를 먼저 확정하세요. N26의 보상 조건을 N23에 자동 적용하지 않습니다.",
              "en": "Resolve the actual injury first. Do not automatically transfer N26 award conditions to N23."
            }
          }
        ]
      }
    }
  },
  "xp.out-of-action": {
    "title": {
      "ko": "전투 불능 유발",
      "en": "Cause OOA"
    },
    "summary": {
      "ko": "상대를 Out of Action으로 만든 사건을 세는 항목입니다. OOA는 전장에서 제거되는 결과이며 영구 사망과는 다릅니다.",
      "en": "Count events that cause an opponent to go Out of Action. OOA removes a model from the battlefield; it does not necessarily mean death."
    },
    "sections": [
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "이 화면에서는 횟수당 +2 XP이며 저장 시 OOA 카운터에도 해당 횟수가 더해집니다. 최종 XP 숫자를 수동 수정해도 OOA 횟수는 별도로 반영됩니다.",
          "en": "Each count is worth 2 XP in this form and also increments the fighter’s OOA counter when saved. A manual XP override does not change that separate count."
        }
      }
    ],
    "variants": {
      "n26": {
        "summary": {
          "ko": "자신의 행동으로 적을 직접 OOA로 만들면 +2 XP입니다. 동일 활성화·동일 적의 중상 보상은 이 보상에 더하지 않습니다.",
          "en": "Gain 2 XP when your own action directly causes an enemy to go OOA. Do not add the Serious Injury award for that same enemy in the same activation."
        },
        "sections": [
          {
            "heading": {
              "ko": "차량과 기록",
              "en": "Vehicles and records"
            },
            "text": {
              "ko": "같은 차량 격파를 OOA와 차량 격파 양쪽에 중복 입력하지 마세요. 별도의 OOA 이력 추가는 경험치나 이 카운터를 자동 변경하지 않습니다.",
              "en": "Do not count the same vehicle destruction under both OOA and Wreck Vehicle. A separate OOA history entry does not automatically award XP or change this counter."
            }
          }
        ]
      },
      "n23": {
        "summary": {
          "ko": "이 화면의 OOA 횟수는 각 +2 XP로 계산됩니다. 실제 지급 조건과 보상값은 사용 중인 N23 시나리오·캠페인에 맞춰 확인하세요.",
          "en": "This form calculates 2 XP per OOA count. Verify eligibility and the award against the N23 scenario or campaign being played."
        },
        "sections": [
          {
            "heading": {
              "ko": "중복 방지",
              "en": "Avoid duplicates"
            },
            "text": {
              "ko": "환경 피해·지속 효과 등 원인이 복잡한 경우 누가 보상을 받는지 합의한 뒤 기록합니다. 단순 OOA 이력은 XP를 자동 지급하지 않습니다.",
              "en": "Where environmental damage or ongoing effects complicate attribution, settle who receives the award before recording it. An OOA history entry alone does not award XP."
            }
          }
        ]
      }
    }
  },
  "xp.priority-target": {
    "title": {
      "ko": "리더·챔피언 등 추가 보상",
      "en": "Priority Target Bonus"
    },
    "summary": {
      "ko": "특정 계급이나 대상에 대해 인정되는 기본 보상 외 추가 XP입니다. 상대의 분류를 먼저 확인하세요.",
      "en": "An additional award for an eligible target category. Check the target’s classification first."
    },
    "sections": [
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "이 항목만으로 기본 중상·OOA 결과를 대신 기록하지는 않습니다. 조건을 충족한 기본 사건과 추가 보너스를 각각 구분합니다.",
          "en": "This does not replace recording the underlying injury or OOA event. Keep the basic event and the eligible bonus separate."
        }
      }
    ],
    "variants": {
      "n26": {
        "summary": {
          "ko": "대상이 Leader·Champion·Brute·Vehicle에 해당하면 인정되는 중상·OOA 사건에 +1 XP 보너스를 더합니다.",
          "en": "Add a 1 XP bonus to an eligible injury/OOA event when the target is a Leader, Champion, Brute or Vehicle."
        },
        "sections": [
          {
            "heading": {
              "ko": "중복 방지",
              "en": "Avoid duplicates"
            },
            "text": {
              "ko": "대상에 분류가 여러 개 붙어 있어도 분류 이름마다 보너스를 반복 입력하지 마세요. 같은 사건의 기본 보상도 중복하지 않습니다.",
              "en": "Do not repeat the bonus for each matching classification on one target. Also avoid duplicating the underlying event award."
            }
          }
        ]
      },
      "n23": {
        "summary": {
          "ko": "N23 화면에서는 Leader·Champion 추가 보상을 각 +1 XP로 계산합니다. 대상 유형과 해당 캠페인의 지급 조건을 확인하세요.",
          "en": "In the N23 form, the Leader/Champion bonus is calculated as 1 XP each. Confirm the target category and the campaign’s eligibility conditions."
        },
        "sections": [
          {
            "heading": {
              "ko": "판본 확인",
              "en": "Edition check"
            },
            "text": {
              "ko": "N26 항목의 Brute·Vehicle 확대 조건을 N23에 자동 적용하지 마세요.",
              "en": "Do not automatically extend this to Brutes or Vehicles using the N26 option."
            }
          }
        ]
      }
    }
  },
  "xp.wreck-vehicle": {
    "title": {
      "ko": "차량 격파 처리",
      "en": "Wreck Vehicle"
    },
    "summary": {
      "ko": "차량을 실제로 격파한 결과를 기록하는 항목입니다. HP 감소나 일시적 손상만으로 격파 처리하지 않습니다.",
      "en": "Record a vehicle that was actually wrecked. Losing HP or taking temporary damage alone is not a wreck."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "공격·손상·격파 판정을 먼저 처리한 뒤 보상 대상과 횟수를 확인합니다. 같은 차량을 OOA와 이 항목에 중복 계산하지 마세요.",
          "en": "Resolve the attack, damage and wreck result before deciding the recipient and count. Do not count one destruction under both OOA and this item."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "이 입력 항목은 횟수당 +2 XP입니다. 별도의 독립 격파 보상이나 중복 지급이 허용되는지는 해당 판본·시나리오에서 확인하세요.",
          "en": "This counter adds 2 XP per entry. Check the edition and scenario before treating it as an independent or stackable additional award."
        }
      }
    ]
  },
  "xp.rally": {
    "title": {
      "ko": "집결 성공",
      "en": "Successful Rally"
    },
    "summary": {
      "ko": "흔들린 파이터가 해당 규칙의 집결 판정에 실제로 성공한 경우를 기록합니다.",
      "en": "Record a fighter who actually passes the applicable Rally test."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "해당 N23 집결 규칙이 요구하는 판정과 보정을 먼저 적용합니다. 시도 횟수가 아니라 보상 조건을 만족한 성공 횟수를 입력하세요.",
          "en": "First resolve the test and modifiers required by the N23 Rally rule. Enter qualifying successes, not attempts."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "N23 화면에서 횟수당 +1 XP로 계산합니다. N26에는 이 항목을 표시하지 않습니다.",
          "en": "The N23 form awards 1 XP per count. This item is not shown for N26."
        }
      }
    ]
  },
  "xp.assistance": {
    "title": {
      "ko": "회복 지원",
      "en": "Provide Assistance"
    },
    "summary": {
      "ko": "다른 파이터의 회복을 도와 보상 조건을 충족한 성공을 기록합니다. 단순히 근처에 있었던 횟수가 아닙니다.",
      "en": "Record successful qualifying assistance with another fighter’s recovery, rather than simply being nearby."
    },
    "sections": [
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "횟수당 +1 XP로 계산합니다. 같은 회복 성공에 지원자 여러 명을 임의로 지정하지 마세요.",
          "en": "Each count adds 1 XP in this form. Do not assign several assistants to one successful recovery unless the rule allows it."
        }
      }
    ],
    "variants": {
      "n26": {
        "summary": {
          "ko": "1인치 내의 교전하지 않고 중상이 아닌 아군 파이터 1명이 회복 주사위 +1로 지원할 수 있습니다. 지원한 회복 테스트가 성공해야 +1 XP입니다.",
          "en": "One friendly fighter within 1 inch who is neither Engaged nor Seriously Injured may add one recovery die. The supported Recovery test must succeed to earn 1 XP."
        },
        "sections": [
          {
            "heading": {
              "ko": "제외 대상",
              "en": "Exclusions"
            },
            "text": {
              "ko": "비스트와 차량은 지원할 수 없으며 차량은 지원받을 수도 없습니다. 실제 회복 결과를 먼저 처리한 뒤 지원자에게 기록하세요.",
              "en": "Beasts and vehicles cannot assist, and vehicles cannot receive assistance. Resolve the recovery first, then record the award for the assistant."
            }
          }
        ]
      },
      "n23": {
        "summary": {
          "ko": "N23의 지원 가능 상태·거리·성공 조건을 사용 중인 회복 규칙에서 확인한 뒤, 보상 대상인 성공에만 횟수를 추가하세요.",
          "en": "Check the N23 recovery rule for eligible assistants, range and success conditions, then count only successful events that earn the award."
        },
        "sections": [
          {
            "heading": {
              "ko": "판본 확인",
              "en": "Edition check"
            },
            "text": {
              "ko": "N26의 회복 시점과 주사위 선택 방식을 N23에 그대로 적용하지 않습니다.",
              "en": "Do not transfer N26 recovery timing and die-selection rules directly to N23."
            }
          }
        ]
      }
    }
  },
  "xp.misc": {
    "title": {
      "ko": "기타 경험치",
      "en": "Miscellaneous XP"
    },
    "summary": {
      "ko": "시나리오·캠페인·중재자 결정 등 다른 항목에 없는 보상을 기록합니다.",
      "en": "Record scenario, campaign or Arbitrator awards that do not fit another category."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "어떤 사건으로 몇 XP를 받았는지 먼저 확인하세요. 보상 사유를 남겨 나중에 기본 보상과 중복되지 않았는지 확인할 수 있게 합니다.",
          "en": "Confirm the reason and amount of the award. Leave a reason so it can later be checked against the basic awards."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "횟수당 +1 XP이며 기타 횟수를 올리면 사유 입력란이 나타납니다. 임의 보정은 최종 XP 입력으로도 할 수 있습니다.",
          "en": "Each count adds 1 XP. A reason field appears when the count is increased. The final amount also supports a manual adjustment."
        }
      }
    ]
  },
  "xp.participation": {
    "title": {
      "ko": "전투 참가",
      "en": "Battle Participation"
    },
    "summary": {
      "ko": "이 파이터가 해당 전투의 참가 보상 대상인지 확인한 뒤 체크합니다. 명부에 등록돼 있기만 한 파이터에게 일괄 지급하지 않습니다.",
      "en": "Select this only if the fighter qualifies for participation in that battle. Merely being on the gang roster is not enough."
    },
    "sections": [
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "체크하면 합계에 +1 XP를 한 번 더합니다. 개별 전투 기록과 보상 지급 여부를 확인해 중복 저장하지 마세요.",
          "en": "Adds 1 XP once when checked. Check the battle record and previous awards to avoid recording it twice."
        }
      }
    ],
    "variants": {
      "n26": {
        "summary": {
          "ko": "해당 전투에 참가한 파이터는 +1 XP를 얻습니다. 중상·OOA 등 전투 결과 보상과는 별개의 참가 보상입니다.",
          "en": "A fighter who participates in the battle gains 1 XP. This is separate from event awards such as causing injury or OOA."
        },
        "sections": [
          {
            "heading": {
              "ko": "확인할 점",
              "en": "Check first"
            },
            "text": {
              "ko": "전투 참가 크루에 포함되지 않았거나 참전하지 못한 모델에는 자동으로 지급하지 않습니다. 시나리오의 예외를 확인하세요.",
              "en": "Do not automatically award it to models outside the participating crew or unable to take part. Check scenario exceptions."
            }
          }
        ]
      }
    }
  },
  "xp.objective": {
    "title": {
      "ko": "목표 통제",
      "en": "Controlled an Objective"
    },
    "summary": {
      "ko": "N26 종료 단계의 목표 통제 조건을 충족한 파이터에게 주는 +1 XP입니다. 단순히 목표 근처를 지나간 것만으로 받지 않습니다.",
      "en": "A 1 XP N26 award for a qualifying fighter controlling an objective in the End phase. Passing near an objective is not enough."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "목표 중심 3인치 안에 펫이 아닌 아군 파이터가 있고 적 모델이 없어야 통제합니다. 적 펫도 방해할 수 있으며 중상·중손상 모델은 통제 판정에서 무시합니다.",
          "en": "Control requires a friendly non-Pet fighter within 3 inches of the objective centre and no enemy models. Enemy Pets can contest; Seriously Injured/Damaged models are ignored."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "통제 중인 파이터 중 플레이어가 고른 1명만 받으며, 파이터마다 전투당 최대 1회입니다. 차량·펫은 받을 수 없습니다.",
          "en": "Only one selected controlling fighter receives the award, at most once per fighter per battle. Vehicles and Pets cannot receive it."
        }
      }
    ]
  },
  "xp.manual-total": {
    "title": {
      "ko": "최종 XP 직접 입력",
      "en": "Manual XP Total"
    },
    "summary": {
      "ko": "이번 저장에서 실제로 더하거나 뺄 최종 XP입니다. 위 횟수 계산값을 직접 덮어쓸 수 있습니다.",
      "en": "The actual XP amount to add or subtract on this submission. It can override the counter calculation."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "정수를 입력합니다. 음수는 XP 차감이며 저장 후 총 XP가 0보다 작아질 수 없습니다. XP를 수정하는 이유를 함께 기록하는 것이 좋습니다.",
          "en": "Enter a whole number. A negative value subtracts XP; the resulting total cannot fall below zero. Record why the adjustment is needed."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "횟수나 체크박스를 다시 바꾸면 합계가 재계산돼 직접 입력한 숫자가 바뀝니다. OOA 횟수는 최종 XP와 별도로 저장됩니다.",
          "en": "Changing a counter or checkbox recalculates and replaces the manual amount. OOA counts are saved separately from the XP amount."
        }
      }
    ]
  },
  "xp.cumulative": {
    "title": {
      "ko": "보유·누적 경험치",
      "en": "Current / Cumulative XP"
    },
    "summary": {
      "ko": "XP 표기와 성장에 사용하는 방식은 판본에 따라 다릅니다.",
      "en": "The XP display and advancement method depend on the edition."
    },
    "sections": [
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "이력에서 기록 사유와 지급량을 확인할 수 있습니다. 경험치 추가를 여는 것만으로 XP나 성장이 저장되지 않습니다.",
          "en": "The history records the reason and amount. Opening Add XP alone does not change XP or grant an advancement."
        }
      }
    ],
    "variants": {
      "n23": {
        "summary": {
          "ko": "N23에서는 성장 비용을 보유 XP에서 소비합니다. 현재 XP와 다음 성장에 필요한 비용을 비교하세요.",
          "en": "In N23, advancement costs are paid from available XP. Compare the current amount with the cost of the next advancement."
        },
        "sections": [
          {
            "heading": {
              "ko": "성장",
              "en": "Advancement"
            },
            "text": {
              "ko": "파이터의 성장 방식, 이전 성장에 따른 추가 비용, 스킬 접근과 능력치 상한을 확인한 뒤 구매합니다.",
              "en": "Check the fighter’s advancement method, additional costs for previous advances, skill access and characteristic limits before purchasing."
            }
          }
        ]
      },
      "n26": {
        "summary": {
          "ko": "N26에서는 XP를 소비하지 않고 누적합니다. 새 XP 구간에 진입했을 때 해당 성장 기회를 처리합니다.",
          "en": "In N26, XP is cumulative and is not spent. Entering a new XP band grants the relevant advancement opportunity."
        },
        "sections": [
          {
            "heading": {
              "ko": "표시와 시점",
              "en": "Display and timing"
            },
            "text": {
              "ko": "현재 XP/다음 구간 표시는 성장 진행도입니다. 모집 시 시작 XP 자체는 무료 성장을 주지 않으며 포스트 사이클 성장 시점에 처리합니다.",
              "en": "The current XP / next band display shows advancement progress. Starting XP at recruitment does not itself grant free advances; process advancement at the post-cycle timing."
            }
          }
        ]
      }
    },
    "aliases": [
      "XP",
      "경험치",
      "누적 XP"
    ]
  },
  "advancement.overview": {
    "title": {
      "ko": "성장",
      "en": "Advancements"
    },
    "summary": {
      "ko": "경험치를 통해 능력치·스킬·계급을 발전시키고 파이터의 레이팅 변화를 기록합니다.",
      "en": "Improve characteristics, skills or rank through experience and record the rating change."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "선택한 판본과 파이터 계급에 맞는 성장 절차를 사용합니다. XP를 더하는 것과 성장을 적용하는 것은 별도 작업입니다.",
          "en": "Use the procedure for the selected edition and fighter category. Adding XP and applying an advancement are separate operations."
        }
      }
    ],
    "variants": {
      "n23": {
        "summary": {
          "ko": "N23에서는 적용 가능한 성장 표나 선택형 절차를 사용하고 XP 비용을 지불합니다.",
          "en": "In N23, use the applicable advancement table or selection procedure and pay the XP cost."
        },
        "sections": [
          {
            "heading": {
              "ko": "확인",
              "en": "Check"
            },
            "text": {
              "ko": "갱어의 무작위 성장과 선택 가능한 파이터의 성장을 구분하세요. 이전 성장 수에 따른 추가 비용과 레이팅 증가도 확인합니다.",
              "en": "Distinguish random Ganger advancement from fighters who can choose. Check additional cost for previous advances and the rating increase."
            }
          }
        ]
      },
      "n26": {
        "summary": {
          "ko": "N26에서는 누적 XP가 새 구간에 도달한 성장 기회를 포스트 사이클에 처리합니다. XP 자체를 소비하지 않습니다.",
          "en": "In N26, resolve advancement opportunities from new cumulative XP bands during the post-cycle. XP itself is not spent."
        },
        "sections": [
          {
            "heading": {
              "ko": "굴림과 기록",
              "en": "Roll and record"
            },
            "text": {
              "ko": "2D6 성장 표의 해당 결과와 레이팅 증가를 기록합니다. 임의로 높거나 낮은 결과를 고르는 것은 캠페인에서 허용한 경우에만 하세요.",
              "en": "Record the applicable 2D6 advancement result and rating increase. Only choose a different higher or lower result if the campaign explicitly allows it."
            }
          }
        ]
      }
    },
    "aliases": [
      "Add Advancement",
      "Advancements",
      "성장",
      "발전"
    ]
  },
  "advancement.roll": {
    "title": {
      "ko": "성장 주사위",
      "en": "Advancement Roll"
    },
    "summary": {
      "ko": "실제 성장 표의 결과를 정하기 위한 굴림입니다. XP 획득 조건을 확인하는 굴림과 다릅니다.",
      "en": "A roll to determine an advancement table result, rather than a roll to decide whether an XP event occurred."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "해당 파이터가 사용할 수 있는 판본별 성장 표를 먼저 정한 뒤 굴립니다. 오프라인에서 이미 굴렸다면 그 결과를 기록하세요.",
          "en": "First determine the table available to this fighter in the selected edition. If the roll was already made at the table, record that result."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "주사위 버튼은 결과 선택을 돕습니다. 최종 성장 저장 전까지 파이터 기록을 확정하지 않습니다.",
          "en": "The roll control helps select a result. The fighter’s advancement is not committed until the form is submitted."
        }
      }
    ],
    "aliases": [
      "Roll 2D6",
      "2D6 굴리기",
      "성장 굴림"
    ]
  },
  "advancement.characteristic": {
    "title": {
      "ko": "능력치 성장",
      "en": "Characteristic Advancement"
    },
    "summary": {
      "ko": "성장 결과로 지정된 능력치를 영구적으로 향상합니다.",
      "en": "Permanently improve the characteristic specified by an advancement result."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "허용된 능력치, 변화량, 판본별 상한을 확인합니다. 목표 숫자를 낮추는 성장과 수치를 높이는 성장을 구분하세요.",
          "en": "Check the allowed characteristic, adjustment and edition-specific cap. Distinguish lowering a target number from increasing a characteristic."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "성장은 별도 효과로 기록되며 레이팅 증가가 반영됩니다. 같은 향상을 기본값에 다시 더해 이중 적용하지 마세요.",
          "en": "The advancement is recorded as an effect with a rating increase. Do not apply it a second time by also changing the base value."
        }
      }
    ]
  },
  "advancement.skill": {
    "title": {
      "ko": "스킬 성장",
      "en": "Skill Advancement"
    },
    "summary": {
      "ko": "성장으로 새 스킬을 얻는 절차입니다. 스킬 접근과 획득 방식을 함께 확인해야 합니다.",
      "en": "An advancement that grants a new skill. Check skill access and the acquisition method."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "프라이머리·세컨더리 등 접근 등급, 무작위·선택 획득 방식, 중복 스킬 제한을 확인한 뒤 적법한 스킬을 고릅니다.",
          "en": "Check Primary/Secondary access, random or chosen acquisition and duplicate-skill restrictions before selecting a legal skill."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "스킬 설명은 해당 스킬 이름을 눌러 확인할 수 있습니다. 성장 취소 시 연결된 스킬·비용 기록도 확인하세요.",
          "en": "Open the skill name for its effect. When removing an advancement, check its linked skill and cost records."
        }
      }
    ]
  },
  "advancement.promotion": {
    "title": {
      "ko": "승급",
      "en": "Promotion"
    },
    "summary": {
      "ko": "파이터의 계급·하위 유형·특수 규칙이 바뀌는 절차입니다. 판본과 기존 계급에 따라 결과가 다릅니다.",
      "en": "Changes a fighter’s rank, subtypes or special rules. The result depends on the edition and current category."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "XP 성장에 따른 승급과 명부 관리에 따른 승급을 구분하세요. 사용 가능한 새 유형, 리더 수 제한, 부여 스킬·규칙을 확인합니다.",
          "en": "Distinguish advancement promotion from roster-management promotion. Check eligible types, leader limits and granted skills or rules."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "저장 전 바뀌는 유형·하위 유형·규칙을 확인합니다. 명칭만 바꾸는 이름 수정과는 다릅니다.",
          "en": "Review the new type, subtypes and rules before saving. This is more than renaming the fighter."
        }
      }
    ]
  },
  "advancement.xp-cost": {
    "title": {
      "ko": "성장 XP 비용",
      "en": "XP Cost"
    },
    "summary": {
      "ko": "N23 성장 구매 시 보유 XP에서 차감할 경험치입니다.",
      "en": "XP deducted from the available pool when purchasing an N23 advancement."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "파이터의 성장 방식·이전 성장에 따른 비용·스킬 접근을 확인합니다. 입력한 XP 비용이 자동으로 크레딧을 차감하는 것은 아닙니다.",
          "en": "Check the fighter’s advancement method, previous-advancement surcharge and skill access. An XP cost is not a credit payment."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "N26은 누적 XP 구간 방식을 사용하므로 N23의 소비 비용을 적용하지 않습니다.",
          "en": "N26 uses cumulative XP bands; the N23 spending cost does not apply."
        }
      }
    ]
  },
  "advancement.rating-cost": {
    "title": {
      "ko": "레이팅 증가",
      "en": "Credits Value Increase"
    },
    "summary": {
      "ko": "성장으로 파이터의 평가 가치가 얼마나 오르는지 나타냅니다. 실제 지출 크레딧과 구분하세요.",
      "en": "The increase in the fighter’s rating value from an advancement. This is separate from credits actually spent."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "성장 표나 획득 방식에 지정된 증가량을 적용합니다. 스킬 가격과 레이팅 증가가 항상 같은 것은 아닙니다.",
          "en": "Apply the increase specified by the advancement table or acquisition method. A skill’s price and its rating increase are not always the same."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "저장 시 파이터 가치에 반영되어 갱 레이팅에도 영향을 줍니다. 성장 삭제 시 연결된 증가량을 되돌립니다.",
          "en": "Saving updates the fighter’s value and therefore the gang rating. Removing the advancement reverses its linked increase."
        }
      }
    ],
    "aliases": [
      "Credits Value Increase",
      "Rating Increase",
      "레이팅 증가"
    ]
  },
  "advancement.acquisition": {
    "title": {
      "ko": "스킬 획득 방식",
      "en": "Skill Acquisition"
    },
    "summary": {
      "ko": "스킬을 무작위로 얻는지 직접 고르는지 정합니다.",
      "en": "Determines whether a skill is randomly generated or chosen."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "파이터의 스킬 접근과 판본별 성장 절차에 맞는 방식을 사용하세요. 접근할 수 있는 스킬 세트라고 해서 모든 획득 방식이 항상 허용되는 것은 아닙니다.",
          "en": "Use the method allowed by the fighter’s skill access and edition. Access to a skill set does not automatically allow every acquisition method."
        }
      }
    ]
  },
  "advancement.skill-access": {
    "title": {
      "ko": "스킬 접근",
      "en": "Skill Set Access"
    },
    "summary": {
      "ko": "파이터가 성장으로 어떤 스킬 세트를 어떤 조건에서 이용할 수 있는지 나타냅니다.",
      "en": "Which skill sets a fighter may use for advancement, and under what conditions."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "프라이머리·세컨더리 등의 분류에 따라 선택·무작위 방식이나 비용이 달라질 수 있습니다. 파이터 유형과 하위 유형의 예외를 확인하세요.",
          "en": "Primary/Secondary classification may affect chosen or random acquisition and cost. Check fighter-type and subtype exceptions."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "커스터마이즈는 이 파이터의 접근 기록을 바꿉니다. 단순 검색 필터와 구분하세요.",
          "en": "Customising access changes this fighter’s recorded permissions, rather than only filtering a search."
        }
      }
    ]
  },
  "fighter.status": {
    "title": {
      "ko": "파이터 상태",
      "en": "Fighter Status"
    },
    "summary": {
      "ko": "명부의 참가 가능 상태입니다. 전투 중 핀·교전·중상 같은 상태와 구분합니다.",
      "en": "The roster availability state, separate from temporary battle states such as Pinned, Engaged or Seriously Injured."
    },
    "sections": [
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "활성·회복·포로·은퇴·사망 등 상태에 따라 명부와 참가 선택에 미치는 영향이 다릅니다. 변경 전 현재 전투와 캠페인 처리를 확인하세요.",
          "en": "Active, Recovery, Captured, Retired and Dead have different roster and participation effects. Check the current battle and campaign before changing a state."
        }
      }
    ],
    "aliases": [
      "Status",
      "상태"
    ]
  },
  "fighter.active": {
    "title": {
      "ko": "활성",
      "en": "Active"
    },
    "summary": {
      "ko": "보통 참가 가능한 명부 상태입니다. 전투 중 현재 활성화 차례라는 뜻은 아닙니다.",
      "en": "Normally available on the roster. This does not mean the model is currently taking its activation."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "회복·포로·사망 등 제한이 해소됐는지 확인하고 참가 크루를 고릅니다.",
          "en": "Check that Recovery, Captured, Dead and other restrictions no longer apply before selecting the crew."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "확인창에서 저장되는 변경을 확인하세요. 설명을 여는 것만으로 상태는 바뀌지 않습니다.",
          "en": "Review the change in the confirmation form. Opening this explanation does not alter the state."
        }
      }
    ]
  },
  "fighter.recovery": {
    "title": {
      "ko": "회복",
      "en": "Recovery"
    },
    "summary": {
      "ko": "캠페인 규칙상 참전하지 못하는 회복 상태입니다. 전투 중 회복 주사위 굴림과는 다릅니다.",
      "en": "Campaign recovery that restricts participation, rather than an in-battle Recovery roll."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "판본과 캠페인에서 정한 회복 기간과 해제 시점을 확인하세요. 전투가 끝났다고 즉시 해제된다고 가정하지 마세요.",
          "en": "Check the edition and campaign’s duration and release timing. Do not assume it ends immediately after a battle."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "확인창에서 저장되는 변경을 확인하세요. 설명을 여는 것만으로 상태는 바뀌지 않습니다.",
          "en": "Review the change in the confirmation form. Opening this explanation does not alter the state."
        }
      }
    ],
    "variants": {
      "n26": {
        "summary": {
          "ko": "N26 Recovery는 해당 캠페인 사이클의 남은 전투와 포스트 사이클 행동을 막습니다.",
          "en": "In N26, Recovery prevents participation in the remaining battles and post-cycle actions of that campaign cycle."
        },
        "sections": [
          {
            "heading": {
              "ko": "해제 시점",
              "en": "Release timing"
            },
            "text": {
              "ko": "명부 업데이트 단계에서 회복을 해제한 뒤 이후 참가 여부를 정합니다. 전투 중 중상 회복과는 별개입니다.",
              "en": "Clear Recovery at the roster-update step, then determine later availability. This is separate from recovering from Serious Injury during a battle."
            }
          }
        ]
      }
    },
    "aliases": [
      "Send to Recovery",
      "In Recovery",
      "회복 보내기",
      "회복 중"
    ]
  },
  "fighter.retired": {
    "title": {
      "ko": "은퇴",
      "en": "Retired"
    },
    "summary": {
      "ko": "파이터를 기록에 남기면서 활동 명부에서 은퇴 처리합니다. 삭제와 다릅니다.",
      "en": "Retains the fighter’s record while retiring it from the active roster. This is different from deletion."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "은퇴를 취소해 복귀시키기 전에 캠페인의 허용 여부와 장비·가치 처리 상태를 확인합니다.",
          "en": "Before unretiring, check campaign permission and how equipment and value were handled."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "확인창에서 저장되는 변경을 확인하세요. 설명을 여는 것만으로 상태는 바뀌지 않습니다.",
          "en": "Review the change in the confirmation form. Opening this explanation does not alter the state."
        }
      }
    ],
    "aliases": [
      "Retire Fighter",
      "Unretire Fighter",
      "파이터 은퇴",
      "은퇴 취소"
    ]
  },
  "fighter.dead": {
    "title": {
      "ko": "사망",
      "en": "Dead"
    },
    "summary": {
      "ko": "지속 부상이나 캠페인 결과로 파이터가 사망한 상태입니다. 전투 불능 자체가 사망을 뜻하지는 않습니다.",
      "en": "A fighter killed by a lasting injury or campaign result. OOA alone does not mean death."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "사망 판정을 확정하고 장비 회수·상속·장례 등 해당 캠페인의 처리를 확인한 뒤 상태를 바꾸세요.",
          "en": "Confirm the death result and the campaign’s equipment recovery or succession rules before changing the state."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "확인창에서 저장되는 변경을 확인하세요. 설명을 여는 것만으로 상태는 바뀌지 않습니다.",
          "en": "Review the change in the confirmation form. Opening this explanation does not alter the state."
        }
      }
    ],
    "aliases": [
      "Kill Fighter",
      "파이터 사망"
    ]
  },
  "fighter.captured": {
    "title": {
      "ko": "포로",
      "en": "Captured"
    },
    "summary": {
      "ko": "상대 갱 등에 사로잡혀 자유롭게 참전할 수 없는 상태입니다.",
      "en": "Held captive and unable to participate freely."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "포획 판정·구출·몸값·해방은 해당 캠페인 규칙으로 처리합니다. 상태를 바꾸는 것만으로 상대 계정과 거래가 성립하지는 않습니다.",
          "en": "Resolve capture, rescue, ransom or release under the campaign rules. Changing a state alone does not complete a trade with another account."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "확인창에서 저장되는 변경을 확인하세요. 설명을 여는 것만으로 상태는 바뀌지 않습니다.",
          "en": "Review the change in the confirmation form. Opening this explanation does not alter the state."
        }
      }
    ],
    "aliases": [
      "Capture Fighter",
      "파이터 포획"
    ]
  },
  "fighter.sold": {
    "title": {
      "ko": "길더에게 판매",
      "en": "Sold to Guilders"
    },
    "summary": {
      "ko": "캠페인에서 허용한 파이터 매각을 기록하는 처리입니다. 일반 장비 판매와 다릅니다.",
      "en": "Records a permitted sale of a fighter under campaign rules, rather than an ordinary equipment sale."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "매각 가능 조건·받는 크레딧·장비 처리와 중재자 결정을 먼저 확인합니다.",
          "en": "Check eligibility, credits received, equipment handling and any Arbitrator decision first."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "확인창에서 저장되는 변경을 확인하세요. 설명을 여는 것만으로 상태는 바뀌지 않습니다.",
          "en": "Review the change in the confirmation form. Opening this explanation does not alter the state."
        }
      }
    ],
    "aliases": [
      "Sell to Guilders",
      "길더에게 판매"
    ]
  },
  "fighter.injuries": {
    "title": {
      "ko": "지속 부상",
      "en": "Lasting Injuries"
    },
    "summary": {
      "ko": "전투 후에도 남는 부상 결과와 그 능력치 효과를 기록합니다. 전투 중 부상 주사위 결과와 연결되지만 별도 단계입니다.",
      "en": "Records injury results and effects that persist after the battle. It is a separate step from the in-battle injury die."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "OOA 등 해당 규칙이 요구할 때 지속 부상 표를 굴리고 결과·회복 상태·영구 효과를 적용합니다. 모든 OOA가 같은 부상을 주지는 않습니다.",
          "en": "When required by OOA or another rule, resolve the lasting-injury table and apply the result, recovery state and permanent effects."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "부상 효과가 능력치에 반영된 경우 기본 능력치를 다시 수정해 이중 차감하지 마세요. 치료·삭제 시 연결된 효과를 확인합니다.",
          "en": "If an injury effect already modifies the displayed characteristics, do not also reduce the base value. Check linked effects when healing or deleting it."
        }
      }
    ],
    "aliases": [
      "Lasting Injuries",
      "Add Lasting Injury",
      "지속 부상",
      "부상 추가"
    ]
  },
  "fighter.skills": {
    "title": {
      "ko": "스킬",
      "en": "Skills"
    },
    "summary": {
      "ko": "파이터에게 적용되는 능력과 예외 규칙입니다. 스킬 이름을 눌러 발동 조건·타이밍·효과를 확인하세요.",
      "en": "Abilities and rule exceptions applying to the fighter. Open a skill name for its trigger, timing and effect."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "항상 적용되는 패시브와 특정 행동·상태·판정을 요구하는 스킬을 구분합니다. 같은 이름의 스킬을 중복 부여하지 마세요.",
          "en": "Distinguish passive effects from skills requiring an action, state or test. Avoid granting the same skill twice."
        }
      }
    ],
    "aliases": [
      "Skills",
      "스킬"
    ]
  },
  "fighter.special-rules": {
    "title": {
      "ko": "특수 규칙",
      "en": "Special Rules"
    },
    "summary": {
      "ko": "파이터·차량·갱 유형의 고유 예외 규칙입니다. 이름만으로 효과를 추측하지 마세요.",
      "en": "Specific exceptions attached to a fighter, vehicle or gang type. Do not infer the effect from the name alone."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "현재 판본에 맞는 항목의 설명을 확인합니다. 다른 판본의 동명 규칙이나 임의로 입력한 사용자 규칙은 효과가 다를 수 있습니다.",
          "en": "Use the description for the current edition. A rule with the same name in another edition, or a custom rule, may work differently."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "규칙을 추가하는 것과 실제 장비·능력치 효과를 추가하는 것은 다를 수 있습니다. 자동 반영 여부를 저장 결과에서 확인하세요.",
          "en": "Adding a rule label may be separate from adding equipment or characteristic effects. Check the saved result for any automatic adjustment."
        }
      }
    ],
    "aliases": [
      "Special Rules",
      "Special Rules to be Added",
      "특수 규칙"
    ]
  },
  "fighter.ooa": {
    "title": {
      "ko": "OOA 기록",
      "en": "OOA / Wreck Records"
    },
    "summary": {
      "ko": "누가 누구를 전투 불능 또는 격파했는지 남기는 사건 이력입니다.",
      "en": "A history of who caused an OOA or vehicle wreck."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "실제 전투 결과와 발생 날짜·대상을 확인해 기록합니다. 상대가 살아 있는지 여부와 OOA 사건은 구분합니다.",
          "en": "Record the actual battle result, date and target. An OOA event is separate from whether the target survives afterward."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "이력 추가만으로 XP나 OOA 카운터는 자동 증가하지 않습니다. XP 추가 화면에서 보상을 별도로 확인해 기록하세요.",
          "en": "Adding a history entry does not automatically award XP or increment the OOA counter. Record eligible awards separately in Add XP."
        }
      }
    ]
  },
  "fighter.cost": {
    "title": {
      "ko": "파이터 비용",
      "en": "Fighter Cost"
    },
    "summary": {
      "ko": "모집 시 지출, 환불 기준, 레이팅용 가치가 서로 다를 수 있습니다.",
      "en": "Recruitment payment, refund basis and rating value can differ."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "할인·대체 시작 장비·특별 모집 규칙을 확인합니다. 레이팅 증가를 지출 크레딧으로 다시 차감하지 마세요.",
          "en": "Check discounts, alternative starting equipment and special recruitment rules. Do not deduct a rating increase from credits as a second payment."
        }
      }
    ]
  },
  "fighter.starting-xp": {
    "title": {
      "ko": "시작 XP",
      "en": "Starting XP"
    },
    "summary": {
      "ko": "모집 시 파이터가 가지고 시작하는 경험치입니다. 이후 얻은 전투 XP와 구분합니다.",
      "en": "XP the fighter has at recruitment, separate from XP earned later."
    },
    "sections": [
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "시작 XP 수정은 기존 시작 XP와 새 값의 차이만큼 총 XP를 조정합니다. N26에서는 시작 XP 자체로 무료 성장을 발생시키지 않습니다.",
          "en": "Changing starting XP adjusts the total by the difference between old and new starting XP. In N26, starting XP itself does not grant free advancements."
        }
      }
    ]
  },
  "fighter.effects": {
    "title": {
      "ko": "능력치 효과",
      "en": "Characteristic Effects"
    },
    "summary": {
      "ko": "성장·부상·장비·사용자 조정으로 현재 능력치에 적용되는 변화입니다.",
      "en": "Modifiers from advancements, injuries, equipment or custom adjustments."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "기본값과 효과 합계를 구분해 확인하세요. 임시 전투 보정을 영구 효과로 기록하지 않도록 주의합니다.",
          "en": "Check base values separately from the effect total. Keep temporary battle modifiers separate from permanent recorded effects."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "같은 효과를 여러 경로로 추가하면 중복 적용될 수 있습니다. 원인을 확인한 뒤 연결된 항목을 수정합니다.",
          "en": "Adding the same effect through several paths may double-apply it. Check the originating item before editing."
        }
      }
    ]
  },
  "fighter.copy": {
    "title": {
      "ko": "파이터 복사",
      "en": "Copy Fighter"
    },
    "summary": {
      "ko": "현재 기록을 바탕으로 별도의 파이터 기록을 만듭니다.",
      "en": "Creates a separate fighter record based on this one."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "복사가 캠페인상 무료 모집을 허용하는 것은 아닙니다. 새 파이터의 비용·장비·XP·상태를 검토하세요.",
          "en": "Copying does not itself authorise free recruitment in a campaign. Review the new fighter’s cost, equipment, XP and state."
        }
      }
    ]
  },
  "fighter.delete": {
    "title": {
      "ko": "파이터 삭제",
      "en": "Delete Fighter"
    },
    "summary": {
      "ko": "파이터 기록을 지우는 작업입니다. 은퇴·사망 상태를 남기는 처리와 다릅니다.",
      "en": "Removes a fighter record rather than retaining it as Retired or Dead."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "캠페인 기록을 보존하려면 은퇴 등 적절한 상태가 필요한지 먼저 확인하세요. 삭제 전 백업을 권장합니다.",
          "en": "If campaign history must be kept, consider whether an appropriate state such as Retired is required. Back up before deletion."
        }
      }
    ]
  },
  "fighter.subtypes": {
    "title": {
      "ko": "하위 유형",
      "en": "Subtypes"
    },
    "summary": {
      "ko": "리더·챔피언·갱어·브루트 같은 규칙상 분류입니다. 표시용 별칭과는 다릅니다.",
      "en": "Rules classifications such as Leader, Champion, Ganger or Brute, rather than a display nickname."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "모집 제한·성장·스킬 접근·보상 조건에 영향을 줄 수 있습니다. 이름이 비슷해도 해당 파이터 데이터에 지정된 분류를 확인합니다.",
          "en": "They can affect recruitment, advancement, skill access and award eligibility. Use the classifications assigned to the fighter, not a similar-sounding name."
        }
      }
    ]
  },
  "fighter.type": {
    "title": {
      "ko": "파이터 유형",
      "en": "Fighter Type"
    },
    "summary": {
      "ko": "특정 갱 명단의 파이터 프로필과 모집 조건을 선택합니다.",
      "en": "Selects a fighter profile and recruitment conditions from a gang roster."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "판본·갱 유형·하위 유형·시작 장비를 확인합니다. 모든 유형 보기 옵션으로 표시된 유형이 현재 갱에 자동으로 적법해지는 것은 아닙니다.",
          "en": "Check the edition, gang type, subtypes and starting equipment. Showing all types does not make every displayed type legal for the current gang."
        }
      }
    ]
  },
  "fighter.backstory": {
    "title": {
      "ko": "파이터 배경",
      "en": "Fighter Backstory"
    },
    "summary": {
      "ko": "캐릭터의 설정을 기록하는 자유 메모입니다.",
      "en": "Free text for the character’s background."
    },
    "sections": [
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "서술을 저장해도 XP·능력치·장비 효과는 자동 변경되지 않습니다. 규칙상 변화는 해당 항목에서 별도로 기록하세요.",
          "en": "Saving narrative text does not change XP, characteristics or equipment effects. Record mechanical changes in the relevant controls."
        }
      }
    ]
  },
  "fighter.notes": {
    "title": {
      "ko": "파이터 메모",
      "en": "Fighter Notes"
    },
    "summary": {
      "ko": "파이터 관련 합의·전투 메모·보류 중인 처리를 기록합니다.",
      "en": "Notes for agreements, battle reminders or pending updates."
    },
    "sections": [
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "메모를 적는 것만으로 실제 값이나 캠페인 상태가 바뀌지는 않습니다. 필요한 변경은 해당 관리 화면에서 저장하세요.",
          "en": "Notes alone do not change values or campaign states. Save any required mechanical changes in their respective controls."
        }
      }
    ]
  },
  "equipment.overview": {
    "title": {
      "ko": "장비",
      "en": "Equipment"
    },
    "summary": {
      "ko": "무기·방어구·개인 장비를 선택하고 구매·배정합니다. 가격뿐 아니라 사용 가능 조건과 프로필을 확인하세요.",
      "en": "Select, buy and assign weapons, armour and personal equipment. Check eligibility and profiles as well as price."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "갱·파이터 전용 목록, 거래소, 제한 없는 목록은 제공 범위가 다릅니다. 사용 중인 캠페인에서 허용한 목록을 선택합니다.",
          "en": "Fighter lists, trading posts and unrestricted lists offer different scopes. Use the list allowed by the campaign."
        }
      }
    ],
    "aliases": [
      "Equipment",
      "장비"
    ]
  },
  "equipment.fighter-list": {
    "title": {
      "ko": "파이터 전용 목록",
      "en": "Fighter’s List"
    },
    "summary": {
      "ko": "현재 갱·파이터 유형의 장비 접근과 가격을 기준으로 보는 목록입니다.",
      "en": "Equipment available through the current gang and fighter type, using their access and pricing."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "전용 할인·변형·필수 장비 등 파이터별 조건을 확인합니다. 같은 이름의 거래소 장비와 가격이 다를 수 있습니다.",
          "en": "Check fighter-specific discounts, variants and required equipment. The trading-post version of the same name may have a different price."
        }
      }
    ]
  },
  "equipment.trading-post": {
    "title": {
      "ko": "거래소",
      "en": "Trading Post"
    },
    "summary": {
      "ko": "캠페인에서 사용하는 거래소 목록입니다. 희귀도·불법성·시점·접근 제한을 함께 확인합니다.",
      "en": "The trading-post list used by the campaign. Check rarity, legality, timing and access restrictions."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "목록에 보인다고 획득 판정까지 자동 성공한 것은 아닙니다. 필요한 거래소 방문·탐색·접근 판정을 먼저 처리하세요.",
          "en": "Being listed does not mean the availability roll succeeded. First resolve any required visit, search or access test."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "구매 확인에서 실제 적용 가격과 갱 크레딧을 확인합니다. 사용자 거래소의 별도 가격·금지 조건이 있을 수 있습니다.",
          "en": "Check the actual price and gang credits in the purchase form. Custom posts may define additional prices or bans."
        }
      }
    ]
  },
  "equipment.unrestricted": {
    "title": {
      "ko": "제한 없는 목록",
      "en": "Unrestricted"
    },
    "summary": {
      "ko": "현재 목록의 접근 필터를 넓혀 장비를 찾는 모드입니다.",
      "en": "A browsing mode that widens equipment access filters."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "목록에 노출되는 것과 캠페인에서 적법하게 획득·사용할 수 있는 것은 다릅니다. 중재자 허용이나 별도 규칙을 먼저 확인하세요.",
          "en": "Visibility in this mode is separate from legal acquisition and use. Check Arbitrator permission or a specific rule first."
        }
      }
    ]
  },
  "equipment.cost": {
    "title": {
      "ko": "장비 가격",
      "en": "Equipment Cost"
    },
    "summary": {
      "ko": "이번 구매에 적용되는 크레딧 비용입니다. 무기의 성능 수치와는 별개입니다.",
      "en": "The credit price applied to this purchase, separate from weapon performance."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "전용 목록 할인·거래소 수정·무료 또는 대체 장비 규칙을 확인합니다. 별표나 고정 가격 표기를 임의로 보통 가격으로 해석하지 마세요.",
          "en": "Check fighter-list discounts, post modifiers, free items and replacement rules. Do not assume a starred or specially priced entry is an ordinary fixed price."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "구매 저장 시 지출과 장비가 기록됩니다. 장비 설명을 여는 것만으로는 크레딧이 차감되지 않습니다.",
          "en": "Submitting a purchase records the item and payment. Opening its explanation does not spend credits."
        }
      }
    ],
    "aliases": [
      "Cost",
      "Cost (credits)",
      "Cost (cr)",
      "비용",
      "가격"
    ]
  },
  "equipment.rarity": {
    "title": {
      "ko": "희귀도",
      "en": "Rarity"
    },
    "summary": {
      "ko": "장비를 찾거나 획득할 때 요구되는 접근 난도를 나타냅니다. 명중 판정값이 아닙니다.",
      "en": "Availability difficulty for finding or obtaining equipment, rather than a hit target."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "사용 중인 거래소·캠페인의 희귀 장비 탐색 절차와 보정을 적용합니다. 가격을 지불할 수 있다고 희귀도 조건이 자동 충족되지는 않습니다.",
          "en": "Use the trading post or campaign’s rare-item search procedure and modifiers. Having enough credits does not automatically satisfy availability."
        }
      }
    ]
  },
  "equipment.illegality": {
    "title": {
      "ko": "불법성",
      "en": "Illegality"
    },
    "summary": {
      "ko": "암시장 등에서 불법 장비의 접근·위험을 다루는 분류입니다.",
      "en": "A classification for availability or risk when obtaining illegal equipment."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "갱의 성향과 거래소 종류, 캠페인에서 정한 불법 장비 절차를 확인합니다. 희귀도와 같은 항목으로 간주하지 마세요.",
          "en": "Check gang alignment, post type and the campaign’s illegal-equipment procedure. Do not treat it as identical to Rarity."
        }
      }
    ]
  },
  "equipment.availability": {
    "title": {
      "ko": "장비 접근",
      "en": "Equipment Availability"
    },
    "summary": {
      "ko": "이 파이터가 현재 판본·갱 목록·거래소 조건에서 장비를 획득할 수 있는지 나타냅니다.",
      "en": "Whether the fighter can obtain equipment under the current edition, roster and trading conditions."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "구매 가능, 장비 배정 가능, 실제 사용 가능은 서로 다른 제한이 있을 수 있습니다. 파이터의 장비 슬롯과 특수 규칙도 확인합니다.",
          "en": "Purchase, assignment and use can have different restrictions. Check weapon slots and fighter-specific rules too."
        }
      }
    ]
  },
  "equipment.loadout": {
    "title": {
      "ko": "로드아웃",
      "en": "Loadouts"
    },
    "summary": {
      "ko": "같은 파이터가 전투에 가져갈 장비 조합을 기록합니다. 새 장비를 무료로 생성하는 기능은 아닙니다.",
      "en": "Records equipment combinations a fighter can take to battle. It does not create additional free equipment."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "파이터에게 실제로 배정된 장비 중 조합을 고릅니다. 전투 크루 선택에서 사용할 로드아웃을 확인하세요.",
          "en": "Choose a combination from equipment actually assigned to the fighter. Check the selected loadout when choosing the battle crew."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "로드아웃 변경은 장비 소유권이나 보관고 수량과 구분됩니다. 사용하지 않는 조합을 지워도 실제 장비 판매와는 다릅니다.",
          "en": "Loadouts are separate from ownership and stash quantities. Deleting a combination is not the same as selling its equipment."
        }
      }
    ],
    "aliases": [
      "Loadout",
      "Loadouts",
      "로드아웃"
    ]
  },
  "equipment.stash": {
    "title": {
      "ko": "보관고",
      "en": "Stash"
    },
    "summary": {
      "ko": "갱이 소유하지만 현재 파이터에게 배정되지 않은 장비를 관리합니다.",
      "en": "Equipment owned by the gang but not currently assigned to a fighter."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "배정은 장비를 파이터에게 옮기는 작업이고 구매는 새 장비를 얻는 작업입니다. 같은 장비를 여러 파이터에게 중복 소유로 기록하지 마세요.",
          "en": "Assignment transfers equipment to a fighter; purchasing acquires a new item. Do not duplicate ownership of one item across fighters."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "무기라면 실제 프로필과 트레잇을 함께 표시합니다. 이름만 같은 장비라도 판본·프로필이 다를 수 있습니다.",
          "en": "Weapons display their actual profiles and traits. Items with the same name may still differ by edition or profile."
        }
      }
    ],
    "aliases": [
      "Stash",
      "보관고"
    ]
  },
  "equipment.assign": {
    "title": {
      "ko": "장비 배정",
      "en": "Assign Equipment"
    },
    "summary": {
      "ko": "보관고 장비를 선택한 파이터에게 옮깁니다.",
      "en": "Transfers stash equipment to a selected fighter."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "해당 파이터의 장비 접근·슬롯 제한과 캠페인에서 장비를 옮길 수 있는 시점을 확인합니다.",
          "en": "Check the fighter’s access and slot restrictions, and when the campaign allows equipment transfers."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "배정은 새 구매가 아닙니다. 저장 후 보관고와 파이터 장비 양쪽을 확인하세요.",
          "en": "Assignment is not a new purchase. Check both the stash and fighter equipment after saving."
        }
      }
    ]
  },
  "equipment.sell": {
    "title": {
      "ko": "장비 판매",
      "en": "Sell Equipment"
    },
    "summary": {
      "ko": "장비를 처분하고 해당 절차에 따른 판매 대금을 기록합니다.",
      "en": "Disposes of equipment and records the proceeds allowed by the applicable procedure."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "구매가와 판매가는 항상 같지 않습니다. 캠페인 판매 규칙·판매 불가 장비·소모품 상태를 먼저 확인하세요.",
          "en": "Sale value is not always the purchase price. Check campaign sale rules, unsellable items and consumable status first."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "확인창에서 실제 크레딧 변화와 삭제되는 장비를 검토합니다.",
          "en": "Review the actual credit change and the equipment removed in the confirmation form."
        }
      }
    ]
  },
  "equipment.weapon-profile": {
    "title": {
      "ko": "무기 프로필",
      "en": "Weapon Profile"
    },
    "summary": {
      "ko": "무기의 사거리·명중·위력·방어 관통·피해 또는 치명성·탄약·트레잇을 나타냅니다.",
      "en": "A weapon’s range, accuracy, strength, armour penetration, damage or lethality, ammo and traits."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "사격 모드·탄종마다 다른 프로필이 있으면 이번 공격에 사용할 프로필 하나를 먼저 고릅니다. 여러 프로필의 좋은 수치만 합치지 마세요.",
          "en": "Where firing modes or ammunition provide several profiles, select the profile used for this attack. Do not combine the best values from different profiles."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "능력치는 한 줄로 표시되며 좁은 화면에서는 해당 줄을 가로로 밀어 볼 수 있습니다. 트레잇 이름을 누르면 능력 설명이 열립니다.",
          "en": "Stats appear in one row that can scroll locally on narrow screens. Open a trait name to read its effect."
        }
      }
    ]
  },
  "equipment.range": {
    "title": {
      "ko": "사거리",
      "en": "Range"
    },
    "summary": {
      "ko": "현재 프로필이 사용할 수 있는 거리 구간입니다. 단거리와 장거리의 명중 보정이 다를 수 있습니다.",
      "en": "The distance bands available to the selected profile. Short and long range can have different accuracy modifiers."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "공격 시 실제 거리를 잰 뒤 해당 구간의 보정을 사용합니다. 템플릿·근접·특수 사거리 표시는 숫자 사거리와 별도 규칙을 따릅니다.",
          "en": "Measure the attack distance, then use the corresponding band. Template, Melee and special range notation follow their own rules."
        }
      }
    ],
    "aliases": [
      "Short Range",
      "Long Range",
      "SR",
      "LR",
      "단거리",
      "장거리"
    ]
  },
  "equipment.accuracy": {
    "title": {
      "ko": "명중 보정",
      "en": "Accuracy Modifier"
    },
    "summary": {
      "ko": "선택한 사거리 구간에서 명중 굴림에 적용하는 보정입니다.",
      "en": "The hit modifier for the selected range band."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "현재 구간의 단거리 또는 장거리 보정 하나와 해당 상태·행동의 보정을 적용합니다. +1은 무기 S나 피해가 오르는 뜻이 아닙니다.",
          "en": "Use the one modifier for the current range band together with applicable state and action modifiers. +1 does not increase weapon S or damage."
        }
      }
    ],
    "aliases": [
      "Short Accuracy",
      "Long Accuracy",
      "명중 단",
      "명중 장"
    ]
  },
  "equipment.strength": {
    "title": {
      "ko": "무기 위력 · S",
      "en": "Weapon Strength · S"
    },
    "summary": {
      "ko": "대상의 T와 비교해 운드 굴림 목표를 정하는 값입니다.",
      "en": "Compared with target T to determine the wound roll."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "사용자 S에 더하는 표기와 고정 수치를 구분합니다. N26 기준 S≥2T는2+, S>T는3+, S=T는4+, S<T이되 절반 초과는5+, S≤T/2는6+입니다.",
          "en": "Distinguish a fixed value from a modifier to the wielder’s S. In N26: S≥2T is2+, S>T3+, S=T4+, below T but above half T5+, and S≤T/2 is6+."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "무기 프로필의 수치를 파이터의 기본 S에 임의로 중복 더하지 마세요.",
          "en": "Do not add a fixed weapon-profile S to the fighter’s base S a second time."
        }
      }
    ]
  },
  "equipment.ap": {
    "title": {
      "ko": "방어 관통 · AP",
      "en": "Armour Penetration · AP"
    },
    "summary": {
      "ko": "대상의 세이브에 적용하는 관통 보정입니다. T를 직접 깎는 수치가 아닙니다.",
      "en": "A modifier to the target’s save, rather than a direct reduction to T."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "선택한 무기 프로필과 적용 가능한 방어 규칙을 확인해 세이브를 처리합니다. AP가 없는 표기는 보통 관통 보정이 없다는 의미입니다.",
          "en": "Resolve the save using the selected weapon profile and applicable defensive rules. A dash normally means there is no AP modifier."
        }
      }
    ],
    "aliases": [
      "AP",
      "방어 관통"
    ]
  },
  "equipment.damage": {
    "title": {
      "ko": "피해 · D",
      "en": "Damage · D"
    },
    "summary": {
      "ko": "N23에서 방어하지 못한 공격이 줄이는 W와 부상 주사위 수에 관여합니다.",
      "en": "In N23, affects W lost to an unsaved attack and the resulting injury dice."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "W를 D만큼 줄이고 W0과 초과 피해를 처리합니다. 명중 수·운드 수·D는 서로 다른 단계입니다.",
          "en": "Reduce W by D, then resolve reaching W0 and any excess. Hits, wounds and Damage are different steps."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "N26의 L은 N23 D와 다른 항목입니다. 서로 같은 값처럼 해석하지 마세요.",
          "en": "N26 L is a different characteristic from N23 D. Do not treat them as interchangeable."
        }
      }
    ],
    "aliases": [
      "D",
      "Damage",
      "피해"
    ]
  },
  "equipment.lethality": {
    "title": {
      "ko": "치명성 · L",
      "en": "Lethality · L"
    },
    "summary": {
      "ko": "N26에서 W0에 이르거나 이미 W0인 대상이 추가 피해를 받을 때 굴리는 부상 주사위 수입니다.",
      "en": "In N26, the number of injury dice rolled when a target reaches W0 or takes further damage while at W0."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "부상 주사위가 여러 개면 통제자가 결과 하나를 고릅니다. L만큼 W를 직접 깎는 방식이 아닙니다.",
          "en": "When multiple injury dice are rolled, the controlling player selects one result. L does not directly remove that many W."
        }
      }
    ],
    "aliases": [
      "L",
      "Lethality",
      "치명성"
    ]
  },
  "equipment.ammo": {
    "title": {
      "ko": "탄약",
      "en": "Ammo"
    },
    "summary": {
      "ko": "탄약 고갈·유지 또는 보급 관련 판정을 처리하는 무기 수치입니다.",
      "en": "A weapon value used by ammunition checks and resupply rules."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "탄약 체크가 요구되는 시점과 해당 프로필의 탄약·트레잇을 함께 확인합니다. 매 사격마다 자동으로 굴리거나 표기만 보고 탄약 수량으로 해석하지 마세요.",
          "en": "Check when an Ammo test is required together with the profile’s Ammo value and traits. Do not assume it is rolled for every shot or that the number is a stock of rounds."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "Out of Ammo와 재장전 처리는 해당 판본 규칙을 따릅니다. 탄약 프로필 구매와 전투 중 재장전은 별도입니다.",
          "en": "Out of Ammo and Reload follow the edition rules. Buying an ammunition profile is separate from reloading during battle."
        }
      }
    ],
    "aliases": [
      "Ammo",
      "탄약"
    ]
  },
  "equipment.traits": {
    "title": {
      "ko": "무기 트레잇",
      "en": "Weapon Traits"
    },
    "summary": {
      "ko": "기본 공격 절차를 바꾸거나 추가 효과를 주는 무기 능력입니다.",
      "en": "Weapon abilities that modify the normal attack sequence or add effects."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "트레잇 이름과 괄호 안 수치를 함께 확인합니다. 발동 시점·추가 주사위·상태 조건은 각 트레잇 설명을 따릅니다.",
          "en": "Read the name together with any value in parentheses. The trait explanation defines timing, extra dice and state conditions."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "이름을 누르면 현재 판본의 설명을 엽니다. 설명이 확인되지 않은 동명 항목을 다른 판본의 효과로 대체하지 않습니다.",
          "en": "Open a name to see its explanation for the current edition. An unavailable definition is not replaced with a same-named rule from another edition."
        }
      }
    ],
    "aliases": [
      "Traits",
      "트레잇"
    ]
  },
  "equipment.armour": {
    "title": {
      "ko": "방어구",
      "en": "Armour"
    },
    "summary": {
      "ko": "세이브와 보호 효과를 제공하는 장비입니다.",
      "en": "Equipment providing a save or protective effect."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "세이브 값·필드 방어구·언더슈트 등 중첩 가능 여부를 확인합니다. 방어구를 여러 개 구매했다고 모두 더할 수 있는 것은 아닙니다.",
          "en": "Check the save value and stacking rules for field armour, undersuits and other protection. Buying several pieces does not mean every bonus stacks."
        }
      }
    ]
  },
  "equipment.trade-points": {
    "title": {
      "ko": "거래 포인트 · TP",
      "en": "Trade Points · TP"
    },
    "summary": {
      "ko": "해당 거래 방식에서 크레딧과 별도로 추적하는 자원입니다.",
      "en": "A resource tracked separately from credits for the applicable trading system."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "사용 중인 판본·거래소가 TP를 언제 얻고 어떻게 소비하는지 확인하세요. 크레딧과 같은 단위로 임의 환산하지 마세요.",
          "en": "Check how the edition and trading post grant and spend TP. Do not convert it to credits without an explicit rule."
        }
      }
    ],
    "aliases": [
      "TP",
      "Trade Points",
      "거래 포인트"
    ]
  },
  "gang.rating": {
    "title": {
      "ko": "갱 레이팅",
      "en": "Gang Rating"
    },
    "summary": {
      "ko": "현재 명부의 파이터·차량·장비·성장 가치를 바탕으로 보는 전력 가치입니다. 보유 현금 자체와 구분합니다.",
      "en": "The roster’s value from fighters, vehicles, equipment and advancements, separate from cash on hand."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "누가 평가 대상에 포함되는지와 장비·성장 증가분을 확인합니다. 특정 전투의 크루 레이팅은 전체 갱 레이팅과 다를 수 있습니다.",
          "en": "Check which models count and how equipment and advancement increases are included. A battle crew rating can differ from the whole gang rating."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "구매·판매·성장·상태 변경에 따른 결과를 갱 요약에서 확인하세요. 사용자 조정 값이 있으면 계산 내역도 살펴봅니다.",
          "en": "Check the gang summary after purchases, sales, advancements or state changes, including any custom adjustments."
        }
      }
    ],
    "aliases": [
      "Rating",
      "Gang Rating",
      "레이팅",
      "갱 레이팅"
    ]
  },
  "gang.wealth": {
    "title": {
      "ko": "갱 자산",
      "en": "Wealth"
    },
    "summary": {
      "ko": "앱에서 갱 레이팅에 보유 크레딧을 더해 보여 주는 자산 지표입니다.",
      "en": "The app’s wealth indicator adds gang rating and available credits."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "캠페인이 다른 자산 계산이나 보관고 포함 규칙을 사용한다면 그 기준을 별도로 확인합니다. 자산과 레이팅을 같은 의미로 사용하지 마세요.",
          "en": "If the campaign uses another wealth formula or stash rule, check that separately. Do not use Wealth and Rating as synonyms."
        }
      }
    ],
    "aliases": [
      "Wealth",
      "자산"
    ]
  },
  "gang.reputation": {
    "title": {
      "ko": "명성",
      "en": "Reputation"
    },
    "summary": {
      "ko": "캠페인에서 갱의 위상과 실적을 추적하는 수치입니다.",
      "en": "A campaign measure of a gang’s standing and achievements."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "시나리오 보상·패널티·영토·특수 규칙이 명시한 변화만 반영합니다. 승리했다고 언제나 같은 양을 받는 것은 아닙니다.",
          "en": "Apply changes specified by scenario rewards, penalties, territories or special rules. A win does not always grant the same amount."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "직접 조정하거나 전투 정산할 때 기존 반영 여부를 확인해 중복 지급하지 마세요.",
          "en": "Check whether a reward was already applied before making a manual or battle-settlement adjustment."
        }
      }
    ],
    "aliases": [
      "Reputation",
      "명성"
    ]
  },
  "gang.credits": {
    "title": {
      "ko": "갱 크레딧",
      "en": "Gang Credits"
    },
    "summary": {
      "ko": "현재 지출할 수 있는 갱의 현금입니다.",
      "en": "The gang’s available cash."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "수입·구매·판매·고용·치료 등 실제 거래를 기록합니다. 레이팅이나 성장 가치 증가를 현금 수입으로 더하지 않습니다.",
          "en": "Record actual income, purchases, sales, hiring and treatment. A rating or advancement-value increase is not cash income."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "입금·출금 사유를 남기고 로그와 잔액을 확인하세요. 설명 팝업을 여는 것은 잔액을 바꾸지 않습니다.",
          "en": "Leave a reason for adjustments and check the log and balance. Opening help does not change the balance."
        }
      }
    ],
    "aliases": [
      "Credits",
      "Gang Credits",
      "크레딧",
      "갱 크레딧"
    ]
  },
  "gang.edition": {
    "title": {
      "ko": "규칙 판본",
      "en": "Rules Edition"
    },
    "summary": {
      "ko": "이 갱·캠페인의 데이터와 판정 기준을 정합니다. N23과 N26은 숫자의 의미와 절차도 다를 수 있습니다.",
      "en": "Selects the data and resolution rules for this gang or campaign. N23 and N26 can differ in what values mean and how actions resolve."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "파이터·장비·스킬·영토의 같은 이름만 보고 서로 다른 판본의 수치를 섞지 마세요. 참가자끼리 적용 판본과 예외를 합의합니다.",
          "en": "Do not mix same-named fighter, equipment, skill or territory values across editions. Agree the edition and exceptions with participants."
        }
      }
    ],
    "aliases": [
      "Edition",
      "판본"
    ]
  },
  "gang.alignment": {
    "title": {
      "ko": "갱 성향",
      "en": "Gang Alignment"
    },
    "summary": {
      "ko": "질서 준수·불법 등 캠페인상 갱의 성향 분류입니다.",
      "en": "A campaign classification such as Law Abiding or Outlaw."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "사용 가능한 거래소·동맹·행동·보상에 영향을 줄 수 있습니다. 단순한 선악 설정 문구와 구분하세요.",
          "en": "It can affect trading posts, alliances, actions and rewards. It is more than a narrative good/evil label."
        }
      }
    ]
  },
  "gang.affiliation": {
    "title": {
      "ko": "소속",
      "en": "Affiliation"
    },
    "summary": {
      "ko": "갱의 조직·하우스·세력 소속을 기록합니다.",
      "en": "Records the organisation, House or faction a gang is affiliated with."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "선택한 갱 유형과 판본에서 허용한 소속인지 확인합니다. 소속에 따른 실제 규칙이 있으면 해당 설명과 별도 적용 항목을 확인하세요.",
          "en": "Check that the selected gang type and edition allow the affiliation. Where it grants rules, check both the explanation and any required mechanical updates."
        }
      }
    ]
  },
  "gang.origin": {
    "title": {
      "ko": "출신",
      "en": "Origin"
    },
    "summary": {
      "ko": "갱의 출신 배경이나 캠페인에서 쓰는 기원 분류입니다.",
      "en": "A gang’s origin or background category used by the campaign."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "출신 선택이 부여하는 장비·능력·접근 제한이 있다면 해당 판본과 갱 규칙을 확인합니다. 이름만으로 효과를 추측하지 마세요.",
          "en": "If an origin grants equipment, abilities or restrictions, check the edition and gang rules. Do not infer effects from the name alone."
        }
      }
    ]
  },
  "gang.legacy": {
    "title": {
      "ko": "갱 레거시",
      "en": "Gang Legacy"
    },
    "summary": {
      "ko": "특정 파이터가 사용하는 과거 소속·전통 관련 규칙 선택입니다.",
      "en": "A rules selection relating to a fighter’s heritage or former affiliation."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "파이터 유형이 레거시 선택을 허용하는지와 장비·스킬 접근에 미치는 효과를 확인하세요. 갱 전체의 소속을 자동 변경하는 항목은 아닙니다.",
          "en": "Check whether the fighter type allows a Legacy and what it changes in equipment or skill access. It does not automatically change the entire gang’s affiliation."
        }
      }
    ]
  },
  "gang.archetype": {
    "title": {
      "ko": "아키타입",
      "en": "Archetype"
    },
    "summary": {
      "ko": "특정 파이터의 역할과 스킬 접근 등을 정하는 분류입니다.",
      "en": "A classification that can determine a fighter’s role and skill access."
    },
    "sections": [
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "아키타입 선택은 이 앱에서 해당 파이터의 스킬 접근을 설정할 수 있습니다. 저장 전 적용되는 세트를 확인하세요.",
          "en": "Selecting an Archetype can set the fighter’s skill access in this app. Check the resulting sets before saving."
        }
      }
    ]
  },
  "gang.roster-check": {
    "title": {
      "ko": "명부 검사",
      "en": "Roster Validation"
    },
    "summary": {
      "ko": "현재 명부가 판본·갱 유형의 모집 제한을 만족하는지 알려 주는 점검입니다.",
      "en": "Checks the current roster against recruitment restrictions for the edition and gang type."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "리더 수·계급 비율·참가 제한 등 경고를 읽고 해당 원인을 수정합니다. 캠페인이 허용한 예외는 중재자와 확인하세요.",
          "en": "Read warnings about leaders, category ratios or participation limits and correct their cause. Confirm campaign exceptions with the Arbitrator."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "경고가 없다고 모든 사용자 규칙·시나리오 조건까지 자동 검증된 것은 아닙니다.",
          "en": "No warnings does not mean every custom rule or scenario condition has been checked."
        }
      }
    ]
  },
  "campaign.overview": {
    "title": {
      "ko": "캠페인",
      "en": "Campaign"
    },
    "summary": {
      "ko": "여러 갱이 이어지는 전투·자원·성장·영토 변화를 함께 관리하는 기록입니다.",
      "en": "A shared record of linked battles, resources, advancement and territory changes across gangs."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "판본·캠페인 유형·중재자·사용 거래소와 하우스 규칙을 먼저 합의합니다. 같은 판본에서도 캠페인별 절차가 다를 수 있습니다.",
          "en": "Agree the edition, campaign type, Arbitrator, trading posts and house rules first. Campaign procedures can differ within the same edition."
        }
      }
    ],
    "aliases": [
      "Campaign",
      "캠페인"
    ]
  },
  "campaign.type": {
    "title": {
      "ko": "캠페인 유형",
      "en": "Campaign Type"
    },
    "summary": {
      "ko": "캠페인의 구조·자원·영토·정산 절차를 정하는 규칙 묶음입니다.",
      "en": "A rules framework defining campaign structure, resources, territories and settlement."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "코어·도미니언 등 이름이 다르면 사용 가능한 영토와 단계도 다를 수 있습니다. 해당 캠페인의 실제 진행 절차를 확인하세요.",
          "en": "Core, Dominion and other named campaigns can use different territories and phases. Check the selected campaign’s actual procedure."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "유형 선택은 관련 카탈로그와 관리 옵션을 정합니다. 과거 기록을 새 규칙으로 자동 재정산하는 명령은 아닙니다.",
          "en": "Selecting a type controls related catalogues and options. It does not automatically recalculate old records using new rules."
        }
      }
    ],
    "aliases": [
      "Campaign Type",
      "캠페인 유형"
    ]
  },
  "campaign.arbitrator": {
    "title": {
      "ko": "중재자",
      "en": "Arbitrator"
    },
    "summary": {
      "ko": "캠페인의 설정·참가·분쟁·예외 규칙을 관리하는 운영 역할입니다.",
      "en": "The organiser role managing campaign settings, participation, disputes and exceptions."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "규칙 해석이나 사용자 예외가 필요하면 참가자와 합의하고 기록합니다. 역할 변경은 실제 관리 권한에 영향을 줄 수 있습니다.",
          "en": "Agree and record interpretations or custom exceptions with participants. Changing the role can affect management permissions."
        }
      }
    ],
    "aliases": [
      "Arbitrator",
      "아비트레이터",
      "중재자"
    ]
  },
  "campaign.allegiance": {
    "title": {
      "ko": "진영",
      "en": "Allegiance"
    },
    "summary": {
      "ko": "캠페인에서 갱들이 어느 편에 속하는지 구분하는 분류입니다.",
      "en": "A campaign grouping that records which side a gang supports."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "동맹·승점·보상·적대 규칙이 있는 경우 캠페인에서 정한 효과를 확인합니다. 갱의 하우스나 질서 성향과 같은 항목은 아닙니다.",
          "en": "Check any campaign effects on alliances, scoring, rewards or hostility. It is separate from a gang’s House or Law Abiding/Outlaw status."
        }
      }
    ],
    "aliases": [
      "Allegiance",
      "진영"
    ]
  },
  "campaign.territory": {
    "title": {
      "ko": "영토",
      "en": "Territories"
    },
    "summary": {
      "ko": "캠페인에서 갱이 보유·쟁탈하는 지역과 혜택을 기록합니다.",
      "en": "Records areas and benefits held or contested by gangs in a campaign."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "영토 이름을 눌러 수입·하우스 보너스·전장 효과·적용 시점을 확인하세요. 보유와 수입 수령은 별도일 수 있습니다.",
          "en": "Open a territory name to check income, House boons, battlefield effects and timing. Ownership and receiving income may be separate steps."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "현재 판본의 설명만 사용합니다. 일부 규칙만 확인된 항목은 표시된 범위를 넘어 임의로 보상하지 마세요.",
          "en": "Use the current edition’s explanation. Where only part of a rule is confirmed, do not invent rewards beyond the displayed information."
        }
      }
    ],
    "aliases": [
      "Territory",
      "Territories",
      "영토"
    ]
  },
  "campaign.racket": {
    "title": {
      "ko": "라켓",
      "en": "Rackets"
    },
    "summary": {
      "ko": "특정 캠페인에서 지배·관리하는 사업이나 영향력 자원입니다.",
      "en": "Businesses or spheres of influence controlled in certain campaigns."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "영토와 같은 규칙이라고 가정하지 마세요. 보유 조건·향상 혜택·조합·수입 시점을 해당 캠페인에서 확인합니다.",
          "en": "Do not assume Rackets follow Territory rules. Check ownership, enhanced benefits, combinations and income timing in the selected campaign."
        }
      }
    ],
    "aliases": [
      "Racket",
      "Rackets",
      "라켓"
    ]
  },
  "campaign.resource": {
    "title": {
      "ko": "캠페인 자원",
      "en": "Campaign Resources"
    },
    "summary": {
      "ko": "크레딧·명성 외에 캠페인에서 추적하는 자원과 사용자 지표입니다.",
      "en": "Resources and custom measures tracked by the campaign beyond credits and reputation."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "자원마다 획득·소비·상한·정산 시점이 다를 수 있습니다. 이름만 같은 크레딧이나 TP로 바꿔 사용하지 마세요.",
          "en": "Each resource may have its own income, spending, cap and settlement timing. Do not substitute it for credits or TP without a rule."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "수동 변경은 다른 자원이나 갱 상태를 자동으로 바꾸지 않을 수 있습니다. 변경 사유를 로그에 남깁니다.",
          "en": "A manual change may not automatically alter other resources or gang states. Record the reason in the log."
        }
      }
    ],
    "aliases": [
      "Resources",
      "자원"
    ]
  },
  "campaign.cycle": {
    "title": {
      "ko": "캠페인 사이클",
      "en": "Campaign Cycle"
    },
    "summary": {
      "ko": "한 묶음의 전투와 사이클 종료 처리를 나누는 캠페인 시간 단위입니다.",
      "en": "A campaign time period grouping battles and end-of-cycle procedures."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "전투 후 처리와 포스트 사이클 처리는 시점이 다를 수 있습니다. 수입·회복·성장·모집의 실제 적용 단계를 확인하세요.",
          "en": "Post-battle and post-cycle steps can occur at different times. Check when income, recovery, advancement and recruitment are resolved."
        }
      }
    ],
    "aliases": [
      "Cycle",
      "사이클"
    ]
  },
  "campaign.enrollment": {
    "title": {
      "ko": "온라인 참가",
      "en": "Online Enrollment"
    },
    "summary": {
      "ko": "모집 링크를 통해 캠페인 참가를 신청하고 중재자가 승인하는 기능입니다.",
      "en": "Apply to a campaign through a recruitment link for approval by the organiser."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "로그인한 계정과 참가할 갱을 확인해 신청합니다. 링크 접속 자체가 즉시 참가 승인이나 관리 권한을 부여하지 않습니다.",
          "en": "Check the signed-in account and selected gang before applying. Opening a link does not itself grant membership or management rights."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "개인 명부와 공유 캠페인은 구분됩니다. 참가 승인 상태와 역할을 확인하세요.",
          "en": "Personal rosters and shared campaigns are separate. Check the application status and assigned role."
        }
      }
    ]
  },
  "campaign.share": {
    "title": {
      "ko": "공유·초대",
      "en": "Share / Invite"
    },
    "summary": {
      "ko": "캠페인 모집 링크와 접근 옵션을 관리합니다.",
      "en": "Manages recruitment links and campaign access options."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "모집 공개 여부·승인 방식·참가자의 역할을 확인합니다. 공개 링크를 만들었다고 개인 기록 전체를 공개하는 것은 아닙니다.",
          "en": "Check recruitment visibility, approval settings and participant roles. A public recruitment link is separate from publishing all personal records."
        }
      }
    ]
  },
  "campaign.map": {
    "title": {
      "ko": "캠페인 지도",
      "en": "Campaign Map"
    },
    "summary": {
      "ko": "영토·노드·연결과 소유권을 시각적으로 관리하는 화면입니다.",
      "en": "A visual workspace for territory nodes, connections and ownership."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "연결선이나 위치가 규칙상 의미를 갖는지는 해당 캠페인에서 합의합니다. 지도 이동만으로 전투 승리나 영토 점령을 확정하지 마세요.",
          "en": "Agree whether positions and connections have mechanical meaning in the campaign. Moving a node alone does not settle a battle or capture."
        }
      }
    ]
  },
  "campaign.trading-post": {
    "title": {
      "ko": "캠페인 거래소",
      "en": "Campaign Trading Posts"
    },
    "summary": {
      "ko": "캠페인에서 사용할 장비 목록·접근·가격 규칙을 선택합니다.",
      "en": "Selects equipment lists, access and pricing used by the campaign."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "일반 거래소·암시장·사용자 거래소가 함께 있을 때 어떤 시점에 어느 목록을 쓸 수 있는지 확인하세요.",
          "en": "Where general, black-market or custom posts coexist, check which list is available and when."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "금지·가격 수정·추가 항목은 이후 구매 목록에 영향을 줍니다. 이미 소유한 장비를 자동 재구매하는 것은 아닙니다.",
          "en": "Bans, price modifiers and extra entries affect later purchases. They do not automatically repurchase existing equipment."
        }
      }
    ]
  },
  "battle.overview": {
    "title": {
      "ko": "전투",
      "en": "Battle"
    },
    "summary": {
      "ko": "시나리오·참가 갱·크루·진행 단계·전투 결과를 기록합니다.",
      "en": "Records the scenario, participating gangs, crews, stages and battle outcome."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "전투 시작 전 적용 판본, 시나리오, 배치, 목표, 크루 선택, 보상을 확정합니다. 전투 중 주사위 결과는 실제 게임의 판정에 따릅니다.",
          "en": "Before play, confirm the edition, scenario, deployment, objective, crew selection and rewards. Resolve dice in the actual game."
        }
      }
    ],
    "aliases": [
      "Battle",
      "Battles",
      "전투"
    ]
  },
  "battle.scenario": {
    "title": {
      "ko": "시나리오",
      "en": "Scenario"
    },
    "summary": {
      "ko": "전투의 배치·목표·종료 조건·보상을 정합니다.",
      "en": "Defines deployment, objectives, end conditions and rewards."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "시나리오 이름뿐 아니라 사용 판본·변형·공격자/방어자 역할을 확인하세요. 승리와 XP·크레딧 보상 조건은 서로 다를 수 있습니다.",
          "en": "Check the edition, variant and attacker/defender roles as well as the name. Winning and earning XP or credits can have different conditions."
        }
      }
    ],
    "aliases": [
      "Scenario",
      "시나리오"
    ]
  },
  "battle.deployment": {
    "title": {
      "ko": "배치",
      "en": "Deployment"
    },
    "summary": {
      "ko": "모델을 어디에 어떤 순서로 배치하고 지원군이 어떻게 들어오는지 정합니다.",
      "en": "Determines where and in what order models deploy and how reinforcements enter."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "배치 구역·우선권·거리 제한·특별 배치 능력을 확인합니다. 지도의 빈 공간이면 어디든 배치 가능한 것은 아닙니다.",
          "en": "Check zones, priority, distance restrictions and special deployment abilities. Empty map space is not automatically a legal deployment location."
        }
      }
    ],
    "aliases": [
      "Deployment",
      "배치"
    ]
  },
  "battle.objective": {
    "title": {
      "ko": "전투 목표",
      "en": "Battle Objective"
    },
    "summary": {
      "ko": "승리·점수·보상에 필요한 행동이나 통제 조건입니다.",
      "en": "Actions or control conditions used for victory, scoring and rewards."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "목표 달성과 전투 종료가 같은 시점인지, 목표를 누가 통제할 수 있는지 확인합니다. 시나리오 조건을 먼저 적용하세요.",
          "en": "Check who can control or complete it, and whether scoring and battle end occur at the same time. Apply the scenario conditions first."
        }
      }
    ],
    "aliases": [
      "Objective",
      "Objectives",
      "목표"
    ]
  },
  "battle.crew": {
    "title": {
      "ko": "참가 크루",
      "en": "Battle Crew"
    },
    "summary": {
      "ko": "이번 전투에 실제로 참가하는 파이터·차량과 사용할 로드아웃을 고릅니다.",
      "en": "Selects the fighters, vehicles and loadouts actually taking part in this battle."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "시나리오의 랜덤/선택 방식, 인원 상한, 회복·포로 상태, 필수·제외 대상을 확인합니다. 전체 명부가 항상 전부 참가하는 것은 아닙니다.",
          "en": "Check random/chosen selection, crew size, Recovery/Captured states and required or excluded models. The whole roster does not always take part."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "전투 레이팅은 선택한 크루와 로드아웃 기준으로 볼 수 있습니다. 참전 XP는 실제 참가와 보상 조건을 확인해 지급합니다.",
          "en": "Crew rating may use the selected crew and loadouts. Award participation XP only after checking actual participation and eligibility."
        }
      }
    ],
    "aliases": [
      "Crew Selection",
      "Crew",
      "크루 선택",
      "참가 크루"
    ]
  },
  "battle.crew-rating": {
    "title": {
      "ko": "크루 레이팅",
      "en": "Crew Rating"
    },
    "summary": {
      "ko": "이번 전투에 선택한 파이터와 로드아웃의 평가 가치입니다.",
      "en": "The value of the fighters and loadouts selected for this battle."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "전체 갱 레이팅·갱 자산과 구분하세요. 전력 차 보정은 시나리오나 캠페인이 정한 기준으로 계산합니다.",
          "en": "Keep it separate from total gang rating and Wealth. Resolve underdog adjustments using the scenario or campaign’s specified measure."
        }
      }
    ],
    "aliases": [
      "Crew Rating",
      "크루 레이팅"
    ]
  },
  "battle.pre-battle": {
    "title": {
      "ko": "전투 전 처리",
      "en": "Pre-battle"
    },
    "summary": {
      "ko": "참가 크루·로드아웃·역할·전술 등 시작 전 준비를 확인하는 단계입니다.",
      "en": "Confirms crew, loadouts, roles, tactics and other preparations before play."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "회복 중인 파이터, 장비 제한, 시나리오 특수 규칙과 참가자 준비 완료를 확인합니다.",
          "en": "Check unavailable fighters, equipment limits, scenario exceptions and participant readiness."
        }
      }
    ],
    "aliases": [
      "Pre-battle",
      "전투 전"
    ]
  },
  "battle.post-battle": {
    "title": {
      "ko": "전투 후 처리",
      "en": "Post-battle"
    },
    "summary": {
      "ko": "전투 결과를 수입·XP·부상·명성 등 지속 기록으로 반영하는 단계입니다.",
      "en": "Applies the battle outcome to lasting records such as income, XP, injuries and reputation."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "승자·목표·OOA·지속 부상·보상을 확인하고 처리 순서를 따릅니다. 전투 후와 사이클 종료 항목을 한 번에 중복 지급하지 마세요.",
          "en": "Confirm victory, objectives, OOA, lasting injuries and rewards in the prescribed order. Avoid applying post-battle and end-of-cycle rewards twice."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "정산 저장 전 이미 수동으로 반영한 수입·XP가 있는지 확인합니다.",
          "en": "Before settlement, check whether income or XP was already applied manually."
        }
      }
    ],
    "aliases": [
      "Post-battle",
      "전투 후"
    ]
  },
  "battle.report": {
    "title": {
      "ko": "전투 보고·정산",
      "en": "Battle Report / Settlement"
    },
    "summary": {
      "ko": "전투 결과와 자원 변화를 확인해 기록하는 기능입니다.",
      "en": "Records the result and confirms resource changes from a battle."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "참가자별 수입·명성·목표·부상과 승패를 검토합니다. 작성한 보고서와 실제 값을 반영하는 정산 단계를 구분하세요.",
          "en": "Review each participant’s income, reputation, objectives, injuries and result. Distinguish a written report from the settlement that applies values."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "정산을 반복하거나 수동 수정과 함께 적용해 중복 보상이 발생하지 않도록 처리 이력을 확인하세요.",
          "en": "Check the settlement history to avoid repeated rewards or overlap with manual adjustments."
        }
      }
    ]
  },
  "battle.income": {
    "title": {
      "ko": "전투 수입",
      "en": "Credits Earned"
    },
    "summary": {
      "ko": "시나리오·전투 결과로 실제 받는 크레딧입니다.",
      "en": "Credits actually awarded by the scenario and battle outcome."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "D6 등 수입 굴림이 있으면 지정한 시점에 굴리고 참가자별 보상을 계산합니다. 상대 자산이나 레이팅을 수입으로 입력하지 마세요.",
          "en": "Make any income roll at the prescribed timing and calculate each participant’s award. Do not enter the opponent’s Wealth or Rating as income."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "이미 갱 크레딧에 직접 더했다면 정산에서 다시 더하지 않도록 확인합니다.",
          "en": "If it was already added directly to gang credits, avoid adding it again in settlement."
        }
      }
    ]
  },
  "battle.reputation-change": {
    "title": {
      "ko": "명성 변화",
      "en": "Reputation Change"
    },
    "summary": {
      "ko": "이번 전투의 보상·벌칙으로 변화하는 명성량입니다. 현재 총 명성이 아닙니다.",
      "en": "The change from this battle’s rewards or penalties, rather than the current reputation total."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "시나리오가 정한 승리·열세·이탈 등의 조건을 확인해 증감량을 입력합니다.",
          "en": "Check the scenario’s conditions for victory, underdog awards or withdrawal and enter the change."
        }
      }
    ]
  },
  "battle.activation": {
    "title": {
      "ko": "활성화와 행동",
      "en": "Activation and Actions"
    },
    "summary": {
      "ko": "한 모델이 행동하는 차례입니다. 사용할 수 있는 행동 수와 반복 제한은 판본에 따라 다릅니다.",
      "en": "A model’s turn to act. Action costs and repetition limits depend on the edition."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "현재 상태와 행동의 종류를 확인한 뒤 하나씩 해결합니다. 스킬·무기·시나리오의 예외가 있으면 적용합니다.",
          "en": "Check the current state and action type, then resolve actions one at a time. Apply skill, weapon and scenario exceptions."
        }
      }
    ],
    "variants": {
      "n23": {
        "summary": {
          "ko": "N23은 보통 행동 2개를 사용합니다. Simple은 반복 가능, Basic은 같은 이름을 활성화당 한 번, Double은 행동 2개를 사용합니다.",
          "en": "N23 normally allows two actions. Simple can repeat, the same Basic action is once per activation, and Double spends both actions."
        },
        "sections": [
          {
            "heading": {
              "ko": "예시",
              "en": "Example"
            },
            "text": {
              "ko": "이동 두 번은 가능하지만 일반 사격 두 번은 불가능합니다. 돌격은 Double이며 상태·스킬 예외는 별도입니다.",
              "en": "Two Moves are allowed, but normally two Shoots are not. Charge is Double; state and skill exceptions are separate."
            }
          }
        ]
      },
      "n26": {
        "summary": {
          "ko": "N26은 보통 행동 2개입니다. Single은 1개, Double은 2개, Free는 0개를 씁니다. 명시적 예외 없이는 같은 이름 행동을 한 활성화에 반복할 수 없습니다.",
          "en": "N26 normally allows two actions. Single spends one, Double two, and Free none. The same named action cannot repeat in one activation without an explicit exception."
        },
        "sections": [
          {
            "heading": {
              "ko": "상태",
              "en": "State"
            },
            "text": {
              "ko": "제압된 모델은 보통 다음 활성화에서 행동 1개만 수행합니다. 상태 우선순위와 각 행동의 자격을 확인하세요.",
              "en": "A Suppressed model normally has only one action in its next activation. Check state priority and action eligibility."
            }
          }
        ]
      }
    }
  },
  "battle.hit": {
    "title": {
      "ko": "명중 판정",
      "en": "Hit Roll"
    },
    "summary": {
      "ko": "공격이 대상에게 맞았는지 정하는 단계입니다. 명중 후에도 운드와 세이브 등 남은 처리가 있습니다.",
      "en": "Determines whether an attack hits. A hit still requires further wound, save and damage resolution."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "사격은 보통 BS, 근접은 WS와 해당 프로필·거리·상태 보정을 사용합니다. 자연 주사위 결과 예외와 특수 트레잇을 확인하세요.",
          "en": "Shooting normally uses BS and melee uses WS, with profile, range and state modifiers. Check natural-die exceptions and traits."
        }
      }
    ]
  },
  "battle.wound": {
    "title": {
      "ko": "운드 판정",
      "en": "Wound Roll"
    },
    "summary": {
      "ko": "명중한 공격이 대상을 상처 입히는지 S와 T를 비교해 정합니다.",
      "en": "Compares S with T to determine whether a hit wounds."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "해당 공격의 실제 S와 대상의 현재 T를 사용합니다. 명중 보정과 AP는 운드 표에 그대로 더하는 값이 아닙니다.",
          "en": "Use the attack’s actual S and the target’s current T. Hit modifiers and AP are not added directly to the wound table."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "운드 성공과 W 감소·부상 결과를 구분하세요. 세이브가 허용되면 세이브도 처리합니다.",
          "en": "Distinguish a successful wound roll from W loss and injury. Resolve any permitted save too."
        }
      }
    ]
  },
  "battle.injury": {
    "title": {
      "ko": "전투 중 부상",
      "en": "Injury Resolution"
    },
    "summary": {
      "ko": "피해 규칙에서 요구할 때 부상 주사위로 전장 결과를 정합니다.",
      "en": "Uses injury dice when required by the damage rules to determine the battlefield result."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "플레시 운드·중상·OOA 결과와 추가 주사위 처리 방식은 판본에 따라 다릅니다. 지속 부상은 별도 후속 처리입니다.",
          "en": "Flesh Wound, Serious Injury, OOA and the handling of extra dice depend on the edition. Lasting Injury is a separate follow-up."
        }
      }
    ]
  },
  "battle.recovery": {
    "title": {
      "ko": "전투 중 회복",
      "en": "Recovery Test"
    },
    "summary": {
      "ko": "전투 중 중상·중손상 모델의 회복 또는 이탈 결과를 정합니다. 캠페인 Recovery 상태와 다릅니다.",
      "en": "Determines recovery or removal for a Seriously Injured/Damaged model in battle, separate from campaign Recovery status."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "굴리는 시점·지원자 자격·근처 적·부상 주사위 처리 방식을 현재 판본에서 확인합니다.",
          "en": "Check the edition’s timing, assistant eligibility, nearby enemies and injury-die procedure."
        }
      }
    ],
    "variants": {
      "n26": {
        "summary": {
          "ko": "활성화를 중상·중손상으로 시작한 모델은 그 활성화 끝에 회복합니다. 여러 부상 주사위 중 결과 하나를 선택합니다.",
          "en": "A model that starts its activation Seriously Injured/Damaged recovers at the end of that activation. Choose one result from multiple injury dice."
        },
        "sections": [
          {
            "heading": {
              "ko": "적과 지원",
              "en": "Enemies and assistance"
            },
            "text": {
              "ko": "1인치 내에 중상·중손상이 아닌 적이 있으면 굴리지 않고 OOA입니다. 적격 아군 파이터 1명의 지원은 주사위 +1이며 비스트·차량 제한이 있습니다.",
              "en": "With a non-Seriously Injured/Damaged enemy within 1 inch, the model goes OOA without rolling. One eligible friendly fighter can add one die; Beast and vehicle restrictions apply."
            }
          }
        ]
      }
    }
  },
  "battle.bottle": {
    "title": {
      "ko": "전투 이탈 판정",
      "en": "Bottle Check"
    },
    "summary": {
      "ko": "갱이 피해와 압박 속에서 전투를 계속할 수 있는지 처리하는 절차입니다.",
      "en": "Resolves a gang’s ability to continue fighting under casualties and pressure."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "N23과 N26의 발동 조건·사용 능력치·실패 결과가 다릅니다. 현재 판본의 절차를 사용하세요.",
          "en": "The trigger, characteristic and failure result differ between N23 and N26. Use the current edition’s procedure."
        }
      }
    ],
    "variants": {
      "n26": {
        "summary": {
          "ko": "이번 라운드에 갱의 OOA가 1명 이상 발생했을 때 라운드 종료 단계에 전장 최고 Ld로 체크합니다.",
          "en": "If the gang suffered at least one OOA this round, make an End-phase check using the highest Ld on the battlefield."
        },
        "sections": [
          {
            "heading": {
              "ko": "실패",
              "en": "Failure"
            },
            "text": {
              "ko": "실패 시 모델 1명 철수, 자연 12이면 2명입니다. 비교전 아군이 남아 있으면 교전 모델을 먼저 철수시킬 수 없으며 중상·손상 철수자의 후속 체크도 처리합니다.",
              "en": "Failure withdraws one model, or two on a natural 12. Engaged models cannot be chosen first while unengaged friends remain; resolve the additional check for injured/damaged withdrawing models."
            }
          }
        ]
      }
    }
  },
  "battle.cover": {
    "title": {
      "ko": "엄폐",
      "en": "Cover"
    },
    "summary": {
      "ko": "지형이 공격을 방해하거나 방어를 돕는 조건입니다. 판본에 따라 적용 단계가 다릅니다.",
      "en": "Terrain-based protection or interference with an attack. The stage at which it applies depends on the edition."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "부분·완전 엄폐의 판정과 예외를 확인합니다. N23의 명중 보정과 N26의 세이브 관련 처리를 섞지 마세요.",
          "en": "Check partial/full cover and exceptions. Keep N23 hit modifiers separate from N26 save-related rules."
        }
      }
    ]
  },
  "battle.tactics": {
    "title": {
      "ko": "전술",
      "en": "Tactics"
    },
    "summary": {
      "ko": "시나리오·갱·전술 팩에서 허용한 일회성 또는 조건부 전술 효과입니다.",
      "en": "One-off or conditional effects allowed by the scenario, gang or tactics pack."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "선택·무작위 획득 수, 사용 시점, 대상과 사용 후 처리 조건을 확인합니다. 카드나 이름을 목록에 추가했다고 효과를 자동 사용한 것은 아닙니다.",
          "en": "Check how many are chosen or drawn, timing, targets and use/discard conditions. Adding a name to a list does not automatically play its effect."
        }
      }
    ]
  },
  "vehicle.overview": {
    "title": {
      "ko": "차량",
      "en": "Vehicles"
    },
    "summary": {
      "ko": "차량 프로필·승무원·장비·장착점·손상을 관리합니다. 파이터와 다른 능력치와 손상 절차를 사용할 수 있습니다.",
      "en": "Manages vehicle profiles, crew, equipment, mounts and damage. Vehicles may use different characteristics and damage procedures from fighters."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "현재 판본과 차량 유형의 이동·승무원·공격·손상 규칙을 확인합니다. 전투원 T와 차량 면별 수치를 혼동하지 마세요.",
          "en": "Check movement, crew, attack and damage rules for the edition and vehicle type. Distinguish fighter T from a vehicle’s facing values."
        }
      }
    ],
    "aliases": [
      "Vehicles",
      "Vehicle",
      "차량"
    ]
  },
  "vehicle.m": {
    "title": {
      "ko": "차량 이동 · M",
      "en": "Vehicle Movement · M"
    },
    "summary": {
      "ko": "차량의 기준 이동 거리입니다.",
      "en": "The vehicle’s base movement distance."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "이동 행동·구동 방식·지형·손상 보정을 적용합니다. 직진 거리와 회전·피벗 제한이 별도일 수 있습니다.",
          "en": "Apply action, locomotion, terrain and damage modifiers. Straight-line distance and turn/pivot restrictions may be separate."
        }
      }
    ]
  },
  "vehicle.front": {
    "title": {
      "ko": "전면 방호",
      "en": "Front Facing"
    },
    "summary": {
      "ko": "전면 방향에서 들어오는 공격에 사용하는 차량 방호/강인함 수치입니다.",
      "en": "The vehicle’s defensive/toughness value against attacks from its front facing."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "공격자와 차량의 위치로 피격 면을 먼저 정한 뒤 해당 면 수치를 공격 S와 비교합니다. 차량의 세이브와는 별도입니다.",
          "en": "Determine the struck facing from the attacker and vehicle positions, then compare that facing value with attack S. The vehicle’s save is separate."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "장갑 업그레이드·손상 효과를 포함한 현재 값을 사용합니다. 이 숫자를 세이브 목표로 읽지 마세요.",
          "en": "Use the current value after armour upgrades and damage. Do not read this number as a save target."
        }
      }
    ]
  },
  "vehicle.side": {
    "title": {
      "ko": "측면 방호",
      "en": "Side Facing"
    },
    "summary": {
      "ko": "측면 방향에서 들어오는 공격에 사용하는 차량 방호/강인함 수치입니다.",
      "en": "The vehicle’s defensive/toughness value against attacks from its side facing."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "공격자와 차량의 위치로 피격 면을 먼저 정한 뒤 해당 면 수치를 공격 S와 비교합니다. 차량의 세이브와는 별도입니다.",
          "en": "Determine the struck facing from the attacker and vehicle positions, then compare that facing value with attack S. The vehicle’s save is separate."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "장갑 업그레이드·손상 효과를 포함한 현재 값을 사용합니다. 이 숫자를 세이브 목표로 읽지 마세요.",
          "en": "Use the current value after armour upgrades and damage. Do not read this number as a save target."
        }
      }
    ]
  },
  "vehicle.rear": {
    "title": {
      "ko": "후면 방호",
      "en": "Rear Facing"
    },
    "summary": {
      "ko": "후면 방향에서 들어오는 공격에 사용하는 차량 방호/강인함 수치입니다.",
      "en": "The vehicle’s defensive/toughness value against attacks from its rear facing."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "공격자와 차량의 위치로 피격 면을 먼저 정한 뒤 해당 면 수치를 공격 S와 비교합니다. 차량의 세이브와는 별도입니다.",
          "en": "Determine the struck facing from the attacker and vehicle positions, then compare that facing value with attack S. The vehicle’s save is separate."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "장갑 업그레이드·손상 효과를 포함한 현재 값을 사용합니다. 이 숫자를 세이브 목표로 읽지 마세요.",
          "en": "Use the current value after armour upgrades and damage. Do not read this number as a save target."
        }
      }
    ]
  },
  "vehicle.hp": {
    "title": {
      "ko": "차체 포인트 · HP",
      "en": "Hull Points · HP"
    },
    "summary": {
      "ko": "차량이 견딜 수 있는 차체 손상의 기준입니다. 파이터 W와 표기가 다릅니다.",
      "en": "The vehicle’s capacity to sustain hull damage, distinct from a fighter’s W."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "현재 판본의 차량 피해·손상 절차로 감소와 후속 굴림을 처리합니다. HP 감소만으로 즉시 영구 삭제하지 마세요.",
          "en": "Apply the edition’s vehicle damage procedure to losses and follow-up rolls. A loss of HP does not itself mean deleting the vehicle."
        }
      }
    ],
    "aliases": [
      "HP",
      "Hull Points",
      "차체 포인트"
    ]
  },
  "vehicle.hnd": {
    "title": {
      "ko": "조종 · Hnd",
      "en": "Handling · Hnd"
    },
    "summary": {
      "ko": "차량의 조종·기동 관련 판정에 사용하는 수치입니다.",
      "en": "Used for vehicle handling and manoeuvre checks."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "구동 방식·지형·회전·손상이 요구하는 조종 판정과 보정을 확인합니다. 일반 파이터 Initiative 판정으로 임의 대체하지 마세요.",
          "en": "Check the handling test and modifiers required by locomotion, terrain, turns and damage. Do not substitute a fighter Initiative test without a rule."
        }
      }
    ],
    "aliases": [
      "Hnd",
      "Handling",
      "조종"
    ]
  },
  "vehicle.save": {
    "title": {
      "ko": "차량 세이브",
      "en": "Vehicle Save"
    },
    "summary": {
      "ko": "차량이 운드를 막기 위해 사용하는 방어 목표입니다. 면별 방호 수치와 별개입니다.",
      "en": "The vehicle’s save target against wounds, separate from facing values."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "공격의 AP와 적용 가능한 장비·차량 규칙을 반영해 판정합니다. 전면·측면·후면의 숫자를 세이브 대신 쓰지 않습니다.",
          "en": "Apply AP and relevant equipment or vehicle rules. Front, side and rear values are not substitutes for the save."
        }
      }
    ]
  },
  "vehicle.crew": {
    "title": {
      "ko": "승무원",
      "en": "Crew"
    },
    "summary": {
      "ko": "차량 조종과 탑재 무기 운용 등에서 사용하는 승무원 기록입니다.",
      "en": "Crew records used for driving and operating mounted weapons."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "차량 유형이 요구하는 승무원과 어떤 능력치를 사용하는지 확인합니다. 탑승한 모든 파이터가 자동으로 운전자나 사수가 되는 것은 아닙니다.",
          "en": "Check required crew and which characteristics the vehicle uses. Every embarked fighter is not automatically a driver or gunner."
        }
      }
    ]
  },
  "vehicle.locomotion": {
    "title": {
      "ko": "구동 방식",
      "en": "Locomotion"
    },
    "summary": {
      "ko": "바퀴·궤도·워커·스키머처럼 차량의 이동 방식을 정하는 분류입니다.",
      "en": "The vehicle’s movement type, such as Wheeled, Tracked, Walker or Skimmer."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "지형·회전·이동·손상 예외는 해당 방식의 규칙을 적용합니다. 이름만 바꾸는 외형 설정과 구분하세요.",
          "en": "Apply that type’s terrain, turning, movement and damage exceptions. It is a rules choice rather than only appearance."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "선택한 구동 방식의 특수 규칙 이름을 눌러 설명을 확인할 수 있습니다.",
          "en": "Open the selected locomotion rule name for its explanation."
        }
      }
    ],
    "aliases": [
      "Locomotion",
      "구동 방식"
    ]
  },
  "vehicle.fire-points": {
    "title": {
      "ko": "파이어 포인트",
      "en": "Fire Points"
    },
    "summary": {
      "ko": "탑승 파이터가 차량 밖으로 사격할 수 있는 위치·통로를 나타내는 규칙입니다. 차량 무기 장착점과 다릅니다.",
      "en": "Positions or openings from which embarked fighters may fire, separate from vehicle weapon mounts."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "몇 명이 어느 방향으로 어떤 무기를 사용할 수 있는지 해당 차량 규칙을 확인합니다. 파이어 포인트 수만큼 차량 무기를 추가할 수 있다는 뜻은 아닙니다.",
          "en": "Check how many fighters may fire, in which directions and with which weapons. A Fire Point does not automatically grant another mounted weapon."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "차량 특수 규칙의 파이어 포인트를 누르면 현재 판본에 등록된 상세 규칙을 볼 수 있습니다.",
          "en": "Open the Fire Points special-rule chip for the current edition’s registered details."
        }
      }
    ],
    "aliases": [
      "Fire Points",
      "파이어 포인트"
    ]
  },
  "vehicle.hardpoints": {
    "title": {
      "ko": "무기 하드포인트",
      "en": "Weapon Hardpoints"
    },
    "summary": {
      "ko": "차량 무기를 설치하는 장착점과 무기 제한을 관리합니다.",
      "en": "Weapon mounts and their installation restrictions."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "장착 위치·사격 방향·허용 무기·슬롯 수를 확인해 무기를 배정합니다. 파이어 포인트에서 탑승자가 사격하는 것과는 별도입니다.",
          "en": "Check mount position, firing arc, eligible weapons and slots before assignment. This is separate from a passenger firing through a Fire Point."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "하드포인트 편집은 실제 장착 구성을 바꿉니다. 정보 버튼은 설명만 열고 편집 중인 값은 저장하지 않습니다.",
          "en": "Editing changes the mount configuration. The information button only opens help and does not save draft values."
        }
      }
    ],
    "aliases": [
      "Hardpoints",
      "Weapon Hardpoints",
      "무기 하드포인트"
    ]
  },
  "vehicle.transport": {
    "title": {
      "ko": "수송 차량",
      "en": "Transport Vehicle"
    },
    "summary": {
      "ko": "파이터를 태우고 이동시키는 차량 기능입니다.",
      "en": "A vehicle capability for transporting fighters."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "수용 가능 인원·승하차·탑승 중 행동·피격 처리·장비 제한을 해당 차량 규칙에서 확인합니다. 탑승이 자동으로 완전한 보호를 뜻하지 않습니다.",
          "en": "Check capacity, embark/disembark, actions while aboard, attack resolution and equipment limits. Being aboard does not automatically grant complete protection."
        }
      }
    ],
    "aliases": [
      "Transport Vehicle",
      "수송 차량"
    ]
  },
  "vehicle.upgrade-slots": {
    "title": {
      "ko": "업그레이드 슬롯",
      "en": "Upgrade Slots"
    },
    "summary": {
      "ko": "차량에 설치할 수 있는 업그레이드의 자리와 제한입니다.",
      "en": "The capacity and restrictions for installing vehicle upgrades."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "업그레이드 분류·장착 위치·슬롯 수·상호 배타 조건을 확인합니다. 무기 하드포인트와 같은 슬롯으로 임의 계산하지 마세요.",
          "en": "Check upgrade category, position, slots used and mutual exclusions. Do not assume these are the same slots as weapon hardpoints."
        }
      }
    ],
    "aliases": [
      "Upgrade Slots",
      "업그레이드 슬롯"
    ]
  },
  "vehicle.damage": {
    "title": {
      "ko": "차량 손상",
      "en": "Vehicle Damage"
    },
    "summary": {
      "ko": "전투 후에도 남는 손상과 차량 프로필 변화 등을 기록합니다.",
      "en": "Records lasting vehicle damage and changes to its profile."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "파이터 지속 부상 표와 차량 손상 표는 다를 수 있습니다. 피해 결과에 맞는 표·수리 비용·회복 상태를 확인합니다.",
          "en": "Vehicle damage and fighter lasting-injury tables can differ. Use the appropriate table, repair cost and recovery state for the result."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "손상 효과가 능력치에 반영됐다면 기본값을 다시 수정해 이중 적용하지 마세요.",
          "en": "If a damage effect already changes the displayed characteristics, do not also change the base value for the same effect."
        }
      }
    ]
  },
  "vehicle.repair": {
    "title": {
      "ko": "차량 수리",
      "en": "Repair Vehicle"
    },
    "summary": {
      "ko": "차량 손상을 회복하거나 캠페인 수리를 기록하는 처리입니다.",
      "en": "Resolves vehicle repair in battle or records campaign repairs."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "전투 중 Repair 행동과 전투 후 크레딧 수리는 절차가 다릅니다. 시점·대상 상태·판정·비용을 먼저 확인합니다.",
          "en": "In-battle Repair actions and post-battle repairs paid in credits are different procedures. Check timing, target state, roll and cost first."
        }
      }
    ]
  },
  "vehicle.arc": {
    "title": {
      "ko": "사격 방향",
      "en": "Firing Arc"
    },
    "summary": {
      "ko": "장착 무기가 공격할 수 있는 방향 범위입니다.",
      "en": "The directions in which a mounted weapon can attack."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "차량 방향과 무기 장착 위치를 기준으로 확인합니다. 사거리 안에 있어도 사격 방향 밖이면 그 무기로 공격하지 못할 수 있습니다.",
          "en": "Check the vehicle’s facing and mount position. A target within range may still be outside the weapon’s arc."
        }
      }
    ]
  },
  "vehicle.road": {
    "title": {
      "ko": "도로·지형",
      "en": "Road / Terrain"
    },
    "summary": {
      "ko": "이동 경로와 지형이 차량 행동·조종·손상에 주는 영향을 확인하는 항목입니다.",
      "en": "How the route and terrain affect vehicle movement, handling and damage."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "차량 구동 방식과 지형 분류에 맞는 이동·조종 조건을 적용하세요. 지도 배경이 평평해 보인다고 자동으로 안전한 도로인 것은 아닙니다.",
          "en": "Apply movement and handling rules for the locomotion type and terrain. A visually flat map background is not automatically a safe road."
        }
      }
    ]
  },
  "campaign.notes": {
    "title": {
      "ko": "캠페인 메모",
      "en": "Campaign Notes"
    },
    "summary": {
      "ko": "하우스 규칙·참가자 합의·운영 메모를 기록합니다.",
      "en": "Records house rules, participant agreements and organiser notes."
    },
    "sections": [
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "메모는 규칙 값을 자동 적용하지 않습니다. 실제 수치나 소유권 변경은 해당 관리 항목에서 저장합니다.",
          "en": "Notes do not automatically apply mechanical changes. Save values and ownership changes in the relevant controls."
        }
      }
    ]
  },
  "battle.round": {
    "title": {
      "ko": "전투 라운드",
      "en": "Battle Round"
    },
    "summary": {
      "ko": "현재 전투의 진행 순서를 추적하는 라운드 번호입니다.",
      "en": "The round number used to track the battle sequence."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "시나리오가 정한 시작·종료 단계와 라운드 제한을 확인합니다. 라운드를 올리는 것만으로 모델 활성화나 보상이 자동 해결되지는 않습니다.",
          "en": "Check the scenario’s start/end phases and round limit. Incrementing the round does not automatically resolve model activations or rewards."
        }
      }
    ]
  },
  "battle.role": {
    "title": {
      "ko": "공격자·방어자 역할",
      "en": "Attacker / Defender Role"
    },
    "summary": {
      "ko": "시나리오에서 참가 갱이 맡는 역할입니다.",
      "en": "A participating gang’s role in the scenario."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "선택·주사위·이전 전투 결과 등 시나리오가 지정한 방법으로 정합니다. 역할에 따라 배치·목표·보상이 달라질 수 있습니다.",
          "en": "Assign it using the scenario’s specified choice, roll or previous result. Deployment, objectives and rewards may differ by role."
        }
      }
    ]
  },
  "equipment.quantity": {
    "title": {
      "ko": "장비 수량",
      "en": "Equipment Quantity"
    },
    "summary": {
      "ko": "해당 장비 인스턴스 또는 보유 묶음의 개수입니다.",
      "en": "The number of item instances or units in an owned stack."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "무기 프로필의 공격 수·탄약 판정·템플릿 수와 구분합니다. 수량을 늘리는 것이 캠페인상 무료 획득을 의미하지 않습니다.",
          "en": "Keep it separate from attacks, Ammo tests or templates. Increasing a quantity does not itself authorise free acquisition."
        }
      }
    ]
  },
  "battle.status": {
    "title": {
      "ko": "전투 상태",
      "en": "Battle Status"
    },
    "summary": {
      "ko": "이 전투가 준비·진행·완료 등 어느 관리 단계인지 나타냅니다. 모델의 전투 상태와는 다릅니다.",
      "en": "The administrative stage of the battle, such as preparation, active play or completion, rather than an individual model state."
    },
    "sections": [
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "완료 표시만으로 모든 부상·XP·수입 정산이 끝났다고 가정하지 마세요. 정산 이력과 참가자별 반영 내역을 확인합니다.",
          "en": "A Completed label does not by itself mean every injury, XP award and income adjustment has been settled. Check settlement history and each participant’s updates."
        }
      }
    ]
  },
  "battle.conditions": {
    "title": {
      "ko": "전투 조건·상태",
      "en": "Battle Conditions"
    },
    "summary": {
      "ko": "불붙음·독성 등 전투 중 모델에게 적용되는 조건을 추적합니다. 명부의 회복·은퇴 상태와 구분하세요.",
      "en": "Tracks conditions affecting a model during battle, separate from roster states such as Recovery or Retired."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "조건별 발동·종료·중첩·제거 시점을 해당 판본에서 확인합니다. 조건을 체크하는 작업과 그 조건의 판정·효과를 해결하는 작업은 별도입니다.",
          "en": "Check each condition’s trigger, duration, stacking and removal in the selected edition. Marking a condition and resolving its tests or effects are separate steps."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "조건 기록만으로 모든 주사위·W 감소·XP가 자동 처리되는 것은 아닙니다. 실제 결과를 해결한 뒤 필요한 기록을 함께 갱신하세요.",
          "en": "A condition marker does not automatically resolve every roll, W loss or XP award. Resolve the effect and update the relevant records."
        }
      }
    ],
    "aliases": [
      "Conditions",
      "조건"
    ]
  },
  "battle.wounds": {
    "title": {
      "ko": "상실 운드",
      "en": "Lost Wounds"
    },
    "summary": {
      "ko": "전투 중 현재 잃은 운드를 추적합니다. 기본 W를 영구적으로 바꾸는 성장·부상과 구분합니다.",
      "en": "Tracks wounds lost during battle, separate from advancements or injuries that permanently change base W."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "판본별 피해 절차로 현재 W를 계산한 뒤 W0과 부상 결과를 처리합니다. N23의 D와 N26의 L은 다르게 적용됩니다.",
          "en": "Calculate remaining W using the edition’s damage procedure, then resolve W0 and injuries. N23 D and N26 L work differently."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "전투 종료·치료·회복 때 해당 규칙대로 초기화 또는 갱신합니다. 운드 마커 변경만으로 지속 부상이 확정되지는 않습니다.",
          "en": "Reset or update this at battle end, healing or recovery as instructed by the rules. Changing a wound marker does not itself determine a lasting injury."
        }
      }
    ]
  },
  "battle.side-job": {
    "title": {
      "ko": "사이드 잡",
      "en": "Side Jobs"
    },
    "summary": {
      "ko": "전투 중 또는 캠페인에서 별도로 주어진 부가 목표와 보상입니다.",
      "en": "An additional task or reward condition assigned during a battle or campaign."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "배정 방법·달성 시점·대상·보상·중복 조건을 해당 사이드 잡 설명에서 확인합니다. 주 시나리오 승리와 별개일 수 있습니다.",
          "en": "Check assignment, timing, target, reward and stacking in the specific Side Job description. It may be separate from winning the main scenario."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "완료 표시는 달성 여부의 기록입니다. 실제 보상과 XP를 언제 적용하는지 확인해 한 번만 정산하세요.",
          "en": "The completion marker records achievement. Check when rewards and XP are applied, then settle them once."
        }
      }
    ],
    "aliases": [
      "Side Job",
      "Side Jobs",
      "사이드 잡"
    ]
  },
  "battle.complete": {
    "title": {
      "ko": "전투 완료",
      "en": "Complete Battle"
    },
    "summary": {
      "ko": "실제 게임을 끝내고 전투 기록을 완료 상태로 옮기는 단계입니다.",
      "en": "Closes the played game and moves its record to completion."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "종료 조건·승자·목표·미해결 부상과 보상을 확인합니다. 일찍 끝났더라도 시나리오의 이탈·보상 규칙을 따릅니다.",
          "en": "Confirm the end condition, winner, objectives, unresolved injuries and rewards. Follow withdrawal and reward rules even if play ends early."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "완료 전 참가자별 정산과 이미 수동 반영한 변경을 확인합니다. 완료 버튼을 여러 번 눌러 같은 보상을 반복 적용하지 마세요.",
          "en": "Review each participant’s settlement and any manual adjustments before completion. Do not repeatedly apply the same rewards."
        }
      }
    ]
  },
  "battle.rewards": {
    "title": {
      "ko": "전투 보상",
      "en": "Battle Rewards"
    },
    "summary": {
      "ko": "시나리오·목표·캠페인 조건을 충족해 받는 크레딧·XP·명성·자원입니다.",
      "en": "Credits, XP, reputation or resources earned by meeting scenario, objective or campaign conditions."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "승리 보상·참가 보상·개별 사건 보상이 각각 누구에게 언제 지급되는지 확인합니다. 모든 참가자가 같은 보상을 받는다고 가정하지 마세요.",
          "en": "Check who receives each victory, participation or event award, and when. Do not assume every participant receives the same rewards."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "입력값은 실제 획득한 증감량입니다. 이미 갱·파이터에 직접 반영했다면 정산 때 중복 적용하지 않습니다.",
          "en": "Enter the actual earned change. If it was already applied directly to a gang or fighter, avoid applying it again at settlement."
        }
      }
    ]
  },
  "campaign.ownership": {
    "title": {
      "ko": "영토·자원 소유자",
      "en": "Ownership"
    },
    "summary": {
      "ko": "영토나 캠페인 자원이 어느 갱에 속하는지 지정합니다.",
      "en": "Assigns a territory or campaign resource to its owning gang."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "점령·교환·이전 조건과 처리 시점을 해당 캠페인에서 확인합니다. 단순히 소유자를 고른다고 전투 판정이나 참가자 합의가 대신 이루어지는 것은 아닙니다.",
          "en": "Check capture, exchange, transfer conditions and timing in the campaign. Selecting an owner does not replace battle resolution or agreement among participants."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "새 소유자를 저장한 뒤 수입과 특수 혜택의 실제 적용 여부를 확인하세요. 과거 수입은 자동 재정산되지 않을 수 있습니다.",
          "en": "After saving the new owner, check income and special benefits. Historical income may not be recalculated automatically."
        }
      }
    ]
  },
  "gang.alliance": {
    "title": {
      "ko": "동맹",
      "en": "Alliance"
    },
    "summary": {
      "ko": "갱이 다른 세력과 맺는 캠페인상 관계입니다.",
      "en": "A campaign relationship between the gang and another faction."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "동맹의 혜택·요구·시험·종료 조건과 다른 동맹과의 양립 여부를 확인합니다. 진영 분류와는 별개입니다.",
          "en": "Check benefits, obligations, tests, termination and compatibility with other alliances. It is separate from an Allegiance classification."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "동맹 이름을 등록하는 것만으로 모든 파이터·크레딧·장비가 자동 지급되는 것은 아닙니다. 필요한 항목을 실제 절차에 맞춰 기록합니다.",
          "en": "Registering an alliance name does not necessarily grant all fighters, credits or equipment automatically. Record required changes through the applicable procedure."
        }
      }
    ]
  },
  "gang.faction": {
    "title": {
      "ko": "갱 유형·하우스",
      "en": "Gang Type / House"
    },
    "summary": {
      "ko": "갱이 사용하는 모집 명부와 고유 규칙의 기반입니다.",
      "en": "The basis for the gang’s recruitment roster and faction rules."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "하우스·기타 세력·사용자 갱 유형을 구분하고 현재 판본에서 맞는 유형을 선택합니다. 같은 세력 이름도 판본별 프로필이 다를 수 있습니다.",
          "en": "Distinguish Houses, other factions and custom gang types, and use the current edition’s type. The same faction name may have different profiles across editions."
        }
      }
    ],
    "aliases": [
      "Faction",
      "Gang Type",
      "갱 유형",
      "세력"
    ]
  },
  "gang.specialisation": {
    "title": {
      "ko": "파이터 스페셜라이제이션",
      "en": "Fighter Specialisation"
    },
    "summary": {
      "ko": "특정 파이터의 전문화 선택으로 시작 구성이나 스킬·성장 결과를 정합니다.",
      "en": "A fighter’s specialisation, which may determine starting configuration, a skill or an advancement result."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "모집과 승급에서 전문화를 고르는 절차가 다를 수 있습니다. 해당 파이터 유형의 선택지와 부여 스킬을 확인합니다.",
          "en": "Recruitment and promotion may use different selection procedures. Check the choices and granted skill for the fighter type."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "저장 전 전문화와 연결된 스킬·가치 증가가 이미 적용됐는지 확인해 중복 추가하지 마세요.",
          "en": "Before saving, check whether the linked skill or value increase has already been applied to avoid duplication."
        }
      }
    ],
    "aliases": [
      "Specialisation",
      "Fighter Specialisation",
      "전문화",
      "스페셜라이제이션"
    ]
  },
  "fighter.ooa-count": {
    "title": {
      "ko": "OOA 횟수",
      "en": "OOA Count"
    },
    "summary": {
      "ko": "이 파이터가 적을 전투 불능으로 만든 누적 사건 수입니다. XP 총량이나 영구 사망자 수와는 다릅니다.",
      "en": "The cumulative number of enemy OOA events caused by this fighter, separate from XP or permanent deaths."
    },
    "sections": [
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "XP 추가의 Cause OOA 횟수는 저장 시 이 값에도 더해집니다. 별도 OOA 이력 작성은 이 카운터를 자동 변경하지 않습니다.",
          "en": "The Cause OOA count in Add XP also increments this value when saved. A separate OOA history entry does not automatically change it."
        }
      }
    ]
  },
  "fighter.enslaved": {
    "title": {
      "ko": "노예 상태",
      "en": "Enslaved"
    },
    "summary": {
      "ko": "특정 캠페인 결과에 따라 파이터가 예속된 상태를 기록합니다.",
      "en": "Records enslavement resulting from a specific campaign rule."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "발생 조건·장비 처리·참가 제한·해방 방법은 해당 캠페인과 중재자의 결정에 따릅니다. 일반 포로 상태와 같은 효과라고 가정하지 마세요.",
          "en": "Follow the campaign and Arbitrator for the trigger, equipment, availability and release procedure. Do not assume it has the same effects as Captured."
        }
      }
    ]
  },
  "fighter.starved": {
    "title": {
      "ko": "굶주림 상태",
      "en": "Starved"
    },
    "summary": {
      "ko": "식량·고기 등 자원을 쓰는 캠페인에서 굶주림 결과를 추적하는 상태입니다.",
      "en": "Tracks starvation in a campaign using food, meat or similar resources."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "적용 시점·능력치 변화·회복 조건은 해당 캠페인 규칙을 확인합니다. 상태 이름을 지정하는 것과 수치 효과 적용을 구분하세요.",
          "en": "Check the campaign’s timing, characteristic effects and recovery conditions. Assigning the label and applying numerical effects can be separate operations."
        }
      }
    ]
  },
  "characteristic.M": {
    "title": {
      "ko": "이동 · M",
      "en": "Movement · M"
    },
    "summary": {
      "ko": "이동할 수 있는 거리를 인치로 나타냅니다. 값이 클수록 멀리 이동합니다.",
      "en": "Movement is measured in inches. A higher value allows a longer move."
    },
    "sections": [
      {
        "heading": {
          "ko": "언제 사용하나요?",
          "en": "When to use"
        },
        "text": {
          "ko": "이동·달리기·돌격처럼 거리를 정하는 행동을 할 때 사용합니다.",
          "en": "Use it for actions that determine movement distance."
        }
      },
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "행동 종류, 지형, 상태, 장비의 보정을 먼저 적용하세요. M만큼 이동하는 행동과 추가 주사위를 굴리는 행동은 서로 다릅니다.",
          "en": "Apply the action, terrain, state and equipment modifiers first. A move of M and an action that adds a die are different rules."
        }
      }
    ],
    "aliases": [
      "M",
      "Movement",
      "이동"
    ]
  },
  "characteristic.WS": {
    "title": {
      "ko": "근접 명중 · WS",
      "en": "Weapon Skill · WS"
    },
    "summary": {
      "ko": "근접 공격이 명중하는지 판정할 때 사용하는 목표 숫자입니다.",
      "en": "The target number used to hit with a close combat attack."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "D6를 굴려 적용할 보정 후 목표 이상이면 명중합니다. 3+는 보정이 없을 때 3·4·5·6이 성공이라는 뜻입니다. 무기·상태의 예외도 적용하세요.",
          "en": "Roll a D6 and apply the relevant modifiers; reach the target to hit. An unmodified 3+ succeeds on 3, 4, 5 or 6. Apply weapon and state exceptions."
        }
      }
    ],
    "aliases": [
      "WS",
      "Weapon Skill",
      "근접 명중"
    ]
  },
  "characteristic.BS": {
    "title": {
      "ko": "사격 명중 · BS",
      "en": "Ballistic Skill · BS"
    },
    "summary": {
      "ko": "원거리 공격이 명중하는지 판정할 때 사용하는 목표 숫자입니다.",
      "en": "The target number used to hit with a ranged attack."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "D6 결과에 해당 사거리·상태·무기 보정을 적용해 목표 이상인지 확인합니다. 단거리와 장거리 명중 보정을 혼동하지 마세요.",
          "en": "Apply the relevant range, state and weapon modifiers to a D6 roll and compare with the target. Short and long range may have different modifiers."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "무기 프로필의 명중 보정은 BS 자체를 영구 변경하는 값이 아닙니다.",
          "en": "A weapon profile accuracy modifier does not permanently change BS."
        }
      }
    ],
    "aliases": [
      "BS",
      "Ballistic Skill",
      "사격 명중"
    ]
  },
  "characteristic.S": {
    "title": {
      "ko": "힘 · S",
      "en": "Strength · S"
    },
    "summary": {
      "ko": "근접 공격의 위력과 힘을 쓰는 판정에 사용합니다.",
      "en": "Used for the strength of close combat attacks and tests of physical power."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "무기 S가 사용자의 S를 기준으로 적혀 있으면 파이터 S와 무기 보정을 합칩니다. 운드 굴림은 공격 S와 대상 T를 비교합니다.",
          "en": "If a weapon uses the wielder’s S, combine that characteristic with the weapon modifier. Compare attack S with target T to determine the wound target."
        }
      }
    ],
    "aliases": [
      "S",
      "Strength",
      "힘"
    ]
  },
  "characteristic.T": {
    "title": {
      "ko": "강인함 · T",
      "en": "Toughness · T"
    },
    "summary": {
      "ko": "공격에 얼마나 잘 버티는지 나타냅니다. 값이 높을수록 상대가 운드를 내기 어렵습니다.",
      "en": "Resistance to being wounded. A higher value makes it harder for attacks to wound."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "공격 S와 T를 비교해 운드 목표를 정합니다. T는 세이브와 별개이며 AP로 T를 직접 깎지 않습니다.",
          "en": "Compare attack S with T to determine the wound target. T is separate from an armour save; AP does not directly reduce T."
        }
      }
    ],
    "aliases": [
      "T",
      "Toughness",
      "강인함"
    ]
  },
  "characteristic.W": {
    "title": {
      "ko": "운드 · W",
      "en": "Wounds · W"
    },
    "summary": {
      "ko": "심각한 부상 판정에 들어가기 전까지 견딜 수 있는 운드를 나타냅니다.",
      "en": "How many wounds a model can sustain before injury resolution."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "피해를 받은 뒤 현재 W와 해당 판본의 피해 규칙을 적용합니다. W가 0이라는 사실과 사망은 같은 뜻이 아닙니다.",
          "en": "Apply the edition’s damage rules to the model’s remaining W. Reaching W0 does not itself mean the model dies."
        }
      }
    ],
    "variants": {
      "n23": {
        "summary": {
          "ko": "N23에서는 방어하지 못한 공격의 D만큼 W를 줄이고, W0 도달 및 초과 피해에 따라 부상 주사위를 굴립니다.",
          "en": "In N23, an unsaved hit reduces W by its Damage; reaching W0 and excess damage determine the injury dice."
        },
        "sections": [
          {
            "heading": {
              "ko": "어떻게 처리하나요?",
              "en": "Resolution"
            },
            "text": {
              "ko": "예: W2인 대상에게 D3이 들어오면 부상 주사위 2개입니다. 이후 플레시 운드·중상·OOA를 처리하며, 사망 여부는 지속 부상 결과로 결정합니다.",
              "en": "For example, D3 against a W2 target produces two injury dice. Resolve Flesh Wound, Serious Injury or OOA, then any lasting injury; death is a separate result."
            }
          }
        ]
      },
      "n26": {
        "summary": {
          "ko": "N26에서는 방어하지 못한 운드마다 W1을 잃습니다. W0이 되거나 이미 W0인 모델이 추가 피해를 받으면 무기의 L만큼 부상 주사위를 굴립니다.",
          "en": "In N26, each unsaved wound removes one W. At W0, or when an already W0 model takes further damage, roll injury dice equal to the weapon’s L."
        },
        "sections": [
          {
            "heading": {
              "ko": "어떻게 처리하나요?",
              "en": "Resolution"
            },
            "text": {
              "ko": "부상 주사위가 여러 개면 통제자가 결과 하나를 선택합니다. N23의 D만큼 W를 줄이는 방식을 여기에 적용하지 마세요.",
              "en": "When several injury dice are rolled, the controlling player selects one result. Do not apply the N23 Damage-based W reduction here."
            }
          }
        ]
      }
    },
    "aliases": [
      "W",
      "Wounds",
      "운드"
    ]
  },
  "characteristic.I": {
    "title": {
      "ko": "주도력 · I",
      "en": "Initiative · I"
    },
    "summary": {
      "ko": "반응 속도와 민첩성을 나타냅니다. 판본에 따라 값의 유리한 방향과 판정 방식이 다릅니다.",
      "en": "Reaction speed and agility. The direction of improvement and roll depend on the edition."
    },
    "sections": [
      {
        "heading": {
          "ko": "언제 사용하나요?",
          "en": "When to use"
        },
        "text": {
          "ko": "추락·도약·탈출 등 해당 행동에서 I 판정을 요구할 때 사용합니다.",
          "en": "Use it when an action calls for Initiative, such as certain movement or escape situations."
        }
      }
    ],
    "variants": {
      "n23": {
        "summary": {
          "ko": "N23의 Initiative는 D6 목표 숫자입니다. 낮은 목표가 유리하며, 보정을 적용한 결과가 목표 이상이면 성공합니다.",
          "en": "N23 Initiative is a D6 target. Lower is better; meet or exceed the target after modifiers."
        },
        "sections": [
          {
            "heading": {
              "ko": "확인할 점",
              "en": "Check first"
            },
            "text": {
              "ko": "낙하·도약·후퇴 등 각각의 행동이 요구하는 시점과 보정은 다를 수 있습니다.",
              "en": "The timing and modifiers depend on the specific fall, leap, retreat or other action."
            }
          }
        ]
      },
      "n26": {
        "summary": {
          "ko": "N26의 Initiative는 클수록 유리합니다. I 체크는 D6 결과가 보정한 능력치 이하이면 성공합니다.",
          "en": "N26 Initiative is better when higher. For an I check, a D6 result at or below the modified characteristic succeeds."
        },
        "sections": [
          {
            "heading": {
              "ko": "다른 사용처",
              "en": "Other uses"
            },
            "text": {
              "ko": "근접전 공격 순서와 일부 이동 행동의 거리에도 I를 사용합니다. 판정 목표인 N23 I와 구분하세요.",
              "en": "I also affects melee attack order and some movement distances. Keep it separate from the N23 target-number characteristic."
            }
          }
        ]
      }
    },
    "aliases": [
      "I",
      "Initiative",
      "주도력"
    ]
  },
  "characteristic.A": {
    "title": {
      "ko": "공격 수 · A",
      "en": "Attacks · A"
    },
    "summary": {
      "ko": "근접전에서 사용할 공격 수를 정하는 기준입니다.",
      "en": "The starting point for determining the number of close combat attacks."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "돌격, 무기 선택, 보조무기, 상태와 스킬에 따른 변화를 적용합니다. 모든 참가자가 항상 A만큼 공격하는 것은 아닙니다.",
          "en": "Apply the edition’s rules for charging, chosen weapons, secondary weapons, states and skills. Not every participant always attacks A times."
        }
      }
    ],
    "variants": {
      "n23": {
        "summary": {
          "ko": "N23에서는 A에 적법한 돌격·쌍수 보너스 등을 더한 뒤 선택한 무기에 공격을 배분합니다.",
          "en": "In N23, add applicable charge and dual-weapon bonuses to A, then allocate attacks between eligible weapons."
        },
        "sections": [
          {
            "heading": {
              "ko": "무기 제한",
              "en": "Weapon limits"
            },
            "text": {
              "ko": "사이드암 하나에는 보통 공격 하나만 배정합니다. 언위얼디 등 특성의 예외를 확인하세요.",
              "en": "Normally only one attack is allocated to each Sidearm. Check Unwieldy and other weapon exceptions."
            }
          }
        ]
      },
      "n26": {
        "summary": {
          "ko": "N26의 활성 모델은 주무기에 A를 사용하고, 허용된 보조무기는 별도 공격 1회입니다. 다른 근접전 참가자는 주무기 공격 1회입니다.",
          "en": "In N26, the active model uses A for its main weapon and one attack for a permitted secondary weapon. Other melee participants make one main-weapon attack."
        },
        "sections": [
          {
            "heading": {
              "ko": "보정",
              "en": "Modifiers"
            },
            "text": {
              "ko": "활성 모델의 이번 활성화 돌격 보너스, Light 무기 제한 등 해당 조건을 적용하세요.",
              "en": "Apply the active model’s charge bonus for that activation, Light weapon limits and other relevant conditions."
            }
          }
        ]
      }
    },
    "aliases": [
      "A",
      "Attacks",
      "공격"
    ]
  },
  "characteristic.Sv": {
    "title": {
      "ko": "세이브 · Sv",
      "en": "Save · Sv"
    },
    "summary": {
      "ko": "공격의 운드를 막는 방어 목표입니다. 낮은 목표 숫자가 유리합니다.",
      "en": "The target used to prevent a wound. A lower target number is better."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "적용 가능한 세이브를 정하고 AP와 장비·엄폐 등 해당 판본의 보정을 적용한 뒤 굴립니다. 여러 방어 장비가 항상 중첩되는 것은 아닙니다.",
          "en": "Determine the applicable save, apply AP and the edition’s equipment or cover modifiers, then roll. Multiple defensive items do not automatically stack."
        }
      }
    ],
    "aliases": [
      "Sv",
      "Save",
      "세이브"
    ]
  },
  "characteristic.Ld": {
    "title": {
      "ko": "리더십 · Ld",
      "en": "Leadership · Ld"
    },
    "summary": {
      "ko": "지휘·그룹 활성화·전투 이탈 등 규칙에서 요구하는 지휘 판정에 사용합니다. 판본별 판정 방향을 확인하세요.",
      "en": "Used for leadership-related rules such as command, group activation or battle withdrawal. Check the edition’s roll direction."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "이 능력치를 사용하는 행동이라고 해서 자동으로 성공하거나 항상 같은 행동 비용을 쓰는 것은 아닙니다. 행동의 조건과 보정을 함께 적용하세요.",
          "en": "Using this characteristic does not make an action automatic or give every action the same cost. Apply that action’s conditions and modifiers."
        }
      }
    ],
    "variants": {
      "n23": {
        "summary": {
          "ko": "리더십 · Ld는 N23에서 2D6 목표 숫자입니다. 낮은 목표가 유리하며 보정 후 합이 목표 이상이면 성공합니다.",
          "en": "Leadership · Ld is a 2D6 target in N23. Lower is better; the modified total must meet or exceed the target."
        },
        "sections": [
          {
            "heading": {
              "ko": "판정",
              "en": "Roll"
            },
            "text": {
              "ko": "2D6를 합산합니다. 대상 행동·상태·스킬이 주는 보정과 재굴림을 적용하세요.",
              "en": "Add the two D6. Apply the action, state and skill modifiers and any permitted reroll."
            }
          }
        ]
      },
      "n26": {
        "summary": {
          "ko": "리더십 · Ld는 N26에서 클수록 유리합니다. 2D6 합이 보정한 능력치 이하이면 체크에 성공합니다.",
          "en": "Leadership · Ld is better when higher in N26. A 2D6 total at or below the modified characteristic passes the check."
        },
        "sections": [
          {
            "heading": {
              "ko": "판정",
              "en": "Roll"
            },
            "text": {
              "ko": "양수 체크 보정은 체크 목표 능력치에 더합니다. N23의 목표 이상 판정과 구분하세요.",
              "en": "A positive check modifier increases the target characteristic. Keep this separate from N23’s meet-or-exceed test."
            }
          }
        ]
      }
    },
    "aliases": [
      "Ld",
      "Leadership",
      "리더십"
    ]
  },
  "characteristic.Cl": {
    "title": {
      "ko": "냉정 · Cl",
      "en": "Cool · Cl"
    },
    "summary": {
      "ko": "동요·공포·전장 압박을 견디는 판정에 사용합니다. 판본별 판정 방향을 확인하세요.",
      "en": "Used for tests of composure under fear, nearby casualties or battlefield pressure. Check the edition’s roll direction."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "이 능력치를 사용하는 행동이라고 해서 자동으로 성공하거나 항상 같은 행동 비용을 쓰는 것은 아닙니다. 행동의 조건과 보정을 함께 적용하세요.",
          "en": "Using this characteristic does not make an action automatic or give every action the same cost. Apply that action’s conditions and modifiers."
        }
      }
    ],
    "variants": {
      "n23": {
        "summary": {
          "ko": "냉정 · Cl는 N23에서 2D6 목표 숫자입니다. 낮은 목표가 유리하며 보정 후 합이 목표 이상이면 성공합니다.",
          "en": "Cool · Cl is a 2D6 target in N23. Lower is better; the modified total must meet or exceed the target."
        },
        "sections": [
          {
            "heading": {
              "ko": "판정",
              "en": "Roll"
            },
            "text": {
              "ko": "2D6를 합산합니다. 대상 행동·상태·스킬이 주는 보정과 재굴림을 적용하세요.",
              "en": "Add the two D6. Apply the action, state and skill modifiers and any permitted reroll."
            }
          }
        ]
      },
      "n26": {
        "summary": {
          "ko": "냉정 · Cl는 N26에서 클수록 유리합니다. 2D6 합이 보정한 능력치 이하이면 체크에 성공합니다.",
          "en": "Cool · Cl is better when higher in N26. A 2D6 total at or below the modified characteristic passes the check."
        },
        "sections": [
          {
            "heading": {
              "ko": "판정",
              "en": "Roll"
            },
            "text": {
              "ko": "양수 체크 보정은 체크 목표 능력치에 더합니다. N23의 목표 이상 판정과 구분하세요.",
              "en": "A positive check modifier increases the target characteristic. Keep this separate from N23’s meet-or-exceed test."
            }
          }
        ]
      }
    },
    "aliases": [
      "Cl",
      "Cool",
      "냉정"
    ]
  },
  "characteristic.Wil": {
    "title": {
      "ko": "의지 · Wil",
      "en": "Willpower · Wil"
    },
    "summary": {
      "ko": "사이킥 파워와 정신적 저항 등에서 요구하는 판정에 사용합니다. 판본별 판정 방향을 확인하세요.",
      "en": "Used for psychic powers and other tests of will or mental resistance. Check the edition’s roll direction."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "이 능력치를 사용하는 행동이라고 해서 자동으로 성공하거나 항상 같은 행동 비용을 쓰는 것은 아닙니다. 행동의 조건과 보정을 함께 적용하세요.",
          "en": "Using this characteristic does not make an action automatic or give every action the same cost. Apply that action’s conditions and modifiers."
        }
      }
    ],
    "variants": {
      "n23": {
        "summary": {
          "ko": "의지 · Wil는 N23에서 2D6 목표 숫자입니다. 낮은 목표가 유리하며 보정 후 합이 목표 이상이면 성공합니다.",
          "en": "Willpower · Wil is a 2D6 target in N23. Lower is better; the modified total must meet or exceed the target."
        },
        "sections": [
          {
            "heading": {
              "ko": "판정",
              "en": "Roll"
            },
            "text": {
              "ko": "2D6를 합산합니다. 대상 행동·상태·스킬이 주는 보정과 재굴림을 적용하세요.",
              "en": "Add the two D6. Apply the action, state and skill modifiers and any permitted reroll."
            }
          }
        ]
      },
      "n26": {
        "summary": {
          "ko": "의지 · Wil는 N26에서 클수록 유리합니다. 2D6 합이 보정한 능력치 이하이면 체크에 성공합니다.",
          "en": "Willpower · Wil is better when higher in N26. A 2D6 total at or below the modified characteristic passes the check."
        },
        "sections": [
          {
            "heading": {
              "ko": "판정",
              "en": "Roll"
            },
            "text": {
              "ko": "양수 체크 보정은 체크 목표 능력치에 더합니다. N23의 목표 이상 판정과 구분하세요.",
              "en": "A positive check modifier increases the target characteristic. Keep this separate from N23’s meet-or-exceed test."
            }
          }
        ]
      }
    },
    "aliases": [
      "Wil",
      "Willpower",
      "의지"
    ]
  },
  "characteristic.Int": {
    "title": {
      "ko": "지능 · Int",
      "en": "Intelligence · Int"
    },
    "summary": {
      "ko": "단말기 조작·수리·공작 등 해당 행동이 요구하는 판정에 사용합니다. 판본별 판정 방향을 확인하세요.",
      "en": "Used for interacting with devices, repairs, sabotage and other intellectual tasks. Check the edition’s roll direction."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "이 능력치를 사용하는 행동이라고 해서 자동으로 성공하거나 항상 같은 행동 비용을 쓰는 것은 아닙니다. 행동의 조건과 보정을 함께 적용하세요.",
          "en": "Using this characteristic does not make an action automatic or give every action the same cost. Apply that action’s conditions and modifiers."
        }
      }
    ],
    "variants": {
      "n23": {
        "summary": {
          "ko": "지능 · Int는 N23에서 2D6 목표 숫자입니다. 낮은 목표가 유리하며 보정 후 합이 목표 이상이면 성공합니다.",
          "en": "Intelligence · Int is a 2D6 target in N23. Lower is better; the modified total must meet or exceed the target."
        },
        "sections": [
          {
            "heading": {
              "ko": "판정",
              "en": "Roll"
            },
            "text": {
              "ko": "2D6를 합산합니다. 대상 행동·상태·스킬이 주는 보정과 재굴림을 적용하세요.",
              "en": "Add the two D6. Apply the action, state and skill modifiers and any permitted reroll."
            }
          }
        ]
      },
      "n26": {
        "summary": {
          "ko": "지능 · Int는 N26에서 클수록 유리합니다. 2D6 합이 보정한 능력치 이하이면 체크에 성공합니다.",
          "en": "Intelligence · Int is better when higher in N26. A 2D6 total at or below the modified characteristic passes the check."
        },
        "sections": [
          {
            "heading": {
              "ko": "판정",
              "en": "Roll"
            },
            "text": {
              "ko": "양수 체크 보정은 체크 목표 능력치에 더합니다. N23의 목표 이상 판정과 구분하세요.",
              "en": "A positive check modifier increases the target characteristic. Keep this separate from N23’s meet-or-exceed test."
            }
          }
        ]
      }
    },
    "aliases": [
      "Int",
      "Intelligence",
      "지능"
    ]
  },
  "xp.starting": {
    "title": {
      "ko": "시작 XP",
      "en": "Starting XP"
    },
    "summary": {
      "ko": "모집 시 파이터가 가지고 시작하는 경험치입니다. 이후 얻은 전투 XP와 구분합니다.",
      "en": "XP the fighter has at recruitment, separate from XP earned later."
    },
    "sections": [
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "시작 XP 수정은 기존 시작 XP와 새 값의 차이만큼 총 XP를 조정합니다. N26에서는 시작 XP 자체로 무료 성장을 발생시키지 않습니다.",
          "en": "Changing starting XP adjusts the total by the difference between old and new starting XP. In N26, starting XP itself does not grant free advancements."
        }
      }
    ]
  },
  "fighter.promotion": {
    "title": {
      "ko": "승급",
      "en": "Promotion"
    },
    "summary": {
      "ko": "파이터의 계급·하위 유형·특수 규칙이 바뀌는 절차입니다. 판본과 기존 계급에 따라 결과가 다릅니다.",
      "en": "Changes a fighter’s rank, subtypes or special rules. The result depends on the edition and current category."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "XP 성장에 따른 승급과 명부 관리에 따른 승급을 구분하세요. 사용 가능한 새 유형, 리더 수 제한, 부여 스킬·규칙을 확인합니다.",
          "en": "Distinguish advancement promotion from roster-management promotion. Check eligible types, leader limits and granted skills or rules."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "저장 전 바뀌는 유형·하위 유형·규칙을 확인합니다. 명칭만 바꾸는 이름 수정과는 다릅니다.",
          "en": "Review the new type, subtypes and rules before saving. This is more than renaming the fighter."
        }
      }
    ]
  },
  "fighter.sell": {
    "title": {
      "ko": "길더에게 판매",
      "en": "Sold to Guilders"
    },
    "summary": {
      "ko": "캠페인에서 허용한 파이터 매각을 기록하는 처리입니다. 일반 장비 판매와 다릅니다.",
      "en": "Records a permitted sale of a fighter under campaign rules, rather than an ordinary equipment sale."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "매각 가능 조건·받는 크레딧·장비 처리와 중재자 결정을 먼저 확인합니다.",
          "en": "Check eligibility, credits received, equipment handling and any Arbitrator decision first."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "확인창에서 저장되는 변경을 확인하세요. 설명을 여는 것만으로 상태는 바뀌지 않습니다.",
          "en": "Review the change in the confirmation form. Opening this explanation does not alter the state."
        }
      }
    ],
    "aliases": [
      "Sell to Guilders",
      "길더에게 판매"
    ]
  },
  "advancement.skills": {
    "title": {
      "ko": "스킬",
      "en": "Skills"
    },
    "summary": {
      "ko": "파이터에게 적용되는 능력과 예외 규칙입니다. 스킬 이름을 눌러 발동 조건·타이밍·효과를 확인하세요.",
      "en": "Abilities and rule exceptions applying to the fighter. Open a skill name for its trigger, timing and effect."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "항상 적용되는 패시브와 특정 행동·상태·판정을 요구하는 스킬을 구분합니다. 같은 이름의 스킬을 중복 부여하지 마세요.",
          "en": "Distinguish passive effects from skills requiring an action, state or test. Avoid granting the same skill twice."
        }
      }
    ],
    "aliases": [
      "Skills",
      "스킬"
    ]
  },
  "advancement.rating": {
    "title": {
      "ko": "레이팅 증가",
      "en": "Credits Value Increase"
    },
    "summary": {
      "ko": "성장으로 파이터의 평가 가치가 얼마나 오르는지 나타냅니다. 실제 지출 크레딧과 구분하세요.",
      "en": "The increase in the fighter’s rating value from an advancement. This is separate from credits actually spent."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "성장 표나 획득 방식에 지정된 증가량을 적용합니다. 스킬 가격과 레이팅 증가가 항상 같은 것은 아닙니다.",
          "en": "Apply the increase specified by the advancement table or acquisition method. A skill’s price and its rating increase are not always the same."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "저장 시 파이터 가치에 반영되어 갱 레이팅에도 영향을 줍니다. 성장 삭제 시 연결된 증가량을 되돌립니다.",
          "en": "Saving updates the fighter’s value and therefore the gang rating. Removing the advancement reverses its linked increase."
        }
      }
    ],
    "aliases": [
      "Credits Value Increase",
      "Rating Increase",
      "레이팅 증가"
    ]
  },
  "equipment.loadouts": {
    "title": {
      "ko": "로드아웃",
      "en": "Loadouts"
    },
    "summary": {
      "ko": "같은 파이터가 전투에 가져갈 장비 조합을 기록합니다. 새 장비를 무료로 생성하는 기능은 아닙니다.",
      "en": "Records equipment combinations a fighter can take to battle. It does not create additional free equipment."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "파이터에게 실제로 배정된 장비 중 조합을 고릅니다. 전투 크루 선택에서 사용할 로드아웃을 확인하세요.",
          "en": "Choose a combination from equipment actually assigned to the fighter. Check the selected loadout when choosing the battle crew."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "로드아웃 변경은 장비 소유권이나 보관고 수량과 구분됩니다. 사용하지 않는 조합을 지워도 실제 장비 판매와는 다릅니다.",
          "en": "Loadouts are separate from ownership and stash quantities. Deleting a combination is not the same as selling its equipment."
        }
      }
    ],
    "aliases": [
      "Loadout",
      "Loadouts",
      "로드아웃"
    ]
  },
  "vehicle.movement": {
    "title": {
      "ko": "차량 이동 · M",
      "en": "Vehicle Movement · M"
    },
    "summary": {
      "ko": "차량의 기준 이동 거리입니다.",
      "en": "The vehicle’s base movement distance."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "이동 행동·구동 방식·지형·손상 보정을 적용합니다. 직진 거리와 회전·피벗 제한이 별도일 수 있습니다.",
          "en": "Apply action, locomotion, terrain and damage modifiers. Straight-line distance and turn/pivot restrictions may be separate."
        }
      }
    ]
  },
  "vehicle.hull-points": {
    "title": {
      "ko": "차체 포인트 · HP",
      "en": "Hull Points · HP"
    },
    "summary": {
      "ko": "차량이 견딜 수 있는 차체 손상의 기준입니다. 파이터 W와 표기가 다릅니다.",
      "en": "The vehicle’s capacity to sustain hull damage, distinct from a fighter’s W."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "현재 판본의 차량 피해·손상 절차로 감소와 후속 굴림을 처리합니다. HP 감소만으로 즉시 영구 삭제하지 마세요.",
          "en": "Apply the edition’s vehicle damage procedure to losses and follow-up rolls. A loss of HP does not itself mean deleting the vehicle."
        }
      }
    ],
    "aliases": [
      "HP",
      "Hull Points",
      "차체 포인트"
    ]
  },
  "vehicle.handling": {
    "title": {
      "ko": "조종 · Hnd",
      "en": "Handling · Hnd"
    },
    "summary": {
      "ko": "차량의 조종·기동 관련 판정에 사용하는 수치입니다.",
      "en": "Used for vehicle handling and manoeuvre checks."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "구동 방식·지형·회전·손상이 요구하는 조종 판정과 보정을 확인합니다. 일반 파이터 Initiative 판정으로 임의 대체하지 마세요.",
          "en": "Check the handling test and modifiers required by locomotion, terrain, turns and damage. Do not substitute a fighter Initiative test without a rule."
        }
      }
    ],
    "aliases": [
      "Hnd",
      "Handling",
      "조종"
    ]
  },
  "vehicle.repairs": {
    "title": {
      "ko": "차량 수리",
      "en": "Repair Vehicle"
    },
    "summary": {
      "ko": "차량 손상을 회복하거나 캠페인 수리를 기록하는 처리입니다.",
      "en": "Resolves vehicle repair in battle or records campaign repairs."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "전투 중 Repair 행동과 전투 후 크레딧 수리는 절차가 다릅니다. 시점·대상 상태·판정·비용을 먼저 확인합니다.",
          "en": "In-battle Repair actions and post-battle repairs paid in credits are different procedures. Check timing, target state, roll and cost first."
        }
      }
    ]
  },
  "campaign.territories": {
    "title": {
      "ko": "영토",
      "en": "Territories"
    },
    "summary": {
      "ko": "캠페인에서 갱이 보유·쟁탈하는 지역과 혜택을 기록합니다.",
      "en": "Records areas and benefits held or contested by gangs in a campaign."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "영토 이름을 눌러 수입·하우스 보너스·전장 효과·적용 시점을 확인하세요. 보유와 수입 수령은 별도일 수 있습니다.",
          "en": "Open a territory name to check income, House boons, battlefield effects and timing. Ownership and receiving income may be separate steps."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "현재 판본의 설명만 사용합니다. 일부 규칙만 확인된 항목은 표시된 범위를 넘어 임의로 보상하지 마세요.",
          "en": "Use the current edition’s explanation. Where only part of a rule is confirmed, do not invent rewards beyond the displayed information."
        }
      }
    ],
    "aliases": [
      "Territory",
      "Territories",
      "영토"
    ]
  },
  "campaign.income": {
    "title": {
      "ko": "전투 수입",
      "en": "Credits Earned"
    },
    "summary": {
      "ko": "시나리오·전투 결과로 실제 받는 크레딧입니다.",
      "en": "Credits actually awarded by the scenario and battle outcome."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "D6 등 수입 굴림이 있으면 지정한 시점에 굴리고 참가자별 보상을 계산합니다. 상대 자산이나 레이팅을 수입으로 입력하지 마세요.",
          "en": "Make any income roll at the prescribed timing and calculate each participant’s award. Do not enter the opponent’s Wealth or Rating as income."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "이미 갱 크레딧에 직접 더했다면 정산에서 다시 더하지 않도록 확인합니다.",
          "en": "If it was already added directly to gang credits, avoid adding it again in settlement."
        }
      }
    ]
  },
  "battle.xp": {
    "title": {
      "ko": "경험치 추가",
      "en": "Add XP"
    },
    "summary": {
      "ko": "전투에서 실제로 달성한 사건을 경험치로 기록하는 화면입니다. XP를 얻기 위해 별도의 XP 주사위를 굴리는 화면은 아닙니다.",
      "en": "Record XP for events actually achieved in battle. This screen does not make a separate XP award roll."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "명중·운드·부상·회복·목표 판정을 먼저 끝낸 뒤, 그 결과가 해당 XP 조건을 충족하는지 확인해 횟수를 더하세요.",
          "en": "Finish the hit, wound, injury, recovery or objective resolution first; then count events that meet the XP condition."
        }
      },
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "횟수와 체크박스가 입력 합계를 계산합니다. 최종 XP 추가를 눌러야 저장되며 시나리오·캠페인의 추가 보상은 별도로 확인합니다.",
          "en": "Counters and checkboxes calculate the proposed amount. Nothing is saved until Add XP is submitted. Check scenario and campaign rewards separately."
        }
      }
    ],
    "aliases": [
      "Add XP",
      "XP 추가",
      "경험치 추가"
    ]
  },
  "gang.allegiance": {
    "title": {
      "ko": "진영",
      "en": "Allegiance"
    },
    "summary": {
      "ko": "캠페인에서 갱들이 어느 편에 속하는지 구분하는 분류입니다.",
      "en": "A campaign grouping that records which side a gang supports."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "동맹·승점·보상·적대 규칙이 있는 경우 캠페인에서 정한 효과를 확인합니다. 갱의 하우스나 질서 성향과 같은 항목은 아닙니다.",
          "en": "Check any campaign effects on alliances, scoring, rewards or hostility. It is separate from a gang’s House or Law Abiding/Outlaw status."
        }
      }
    ],
    "aliases": [
      "Allegiance",
      "진영"
    ]
  },
  "fighter.archetype": {
    "title": {
      "ko": "아키타입",
      "en": "Archetype"
    },
    "summary": {
      "ko": "특정 파이터의 역할과 스킬 접근 등을 정하는 분류입니다.",
      "en": "A classification that can determine a fighter’s role and skill access."
    },
    "sections": [
      {
        "heading": {
          "ko": "앱에서는",
          "en": "In this app"
        },
        "text": {
          "ko": "아키타입 선택은 이 앱에서 해당 파이터의 스킬 접근을 설정할 수 있습니다. 저장 전 적용되는 세트를 확인하세요.",
          "en": "Selecting an Archetype can set the fighter’s skill access in this app. Check the resulting sets before saving."
        }
      }
    ]
  },
  "equipment.short-range": {
    "title": {
      "ko": "사거리",
      "en": "Range"
    },
    "summary": {
      "ko": "현재 프로필이 사용할 수 있는 거리 구간입니다. 단거리와 장거리의 명중 보정이 다를 수 있습니다.",
      "en": "The distance bands available to the selected profile. Short and long range can have different accuracy modifiers."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "공격 시 실제 거리를 잰 뒤 해당 구간의 보정을 사용합니다. 템플릿·근접·특수 사거리 표시는 숫자 사거리와 별도 규칙을 따릅니다.",
          "en": "Measure the attack distance, then use the corresponding band. Template, Melee and special range notation follow their own rules."
        }
      }
    ],
    "aliases": [
      "Short Range",
      "Long Range",
      "SR",
      "LR",
      "단거리",
      "장거리"
    ]
  },
  "equipment.long-range": {
    "title": {
      "ko": "사거리",
      "en": "Range"
    },
    "summary": {
      "ko": "현재 프로필이 사용할 수 있는 거리 구간입니다. 단거리와 장거리의 명중 보정이 다를 수 있습니다.",
      "en": "The distance bands available to the selected profile. Short and long range can have different accuracy modifiers."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "공격 시 실제 거리를 잰 뒤 해당 구간의 보정을 사용합니다. 템플릿·근접·특수 사거리 표시는 숫자 사거리와 별도 규칙을 따릅니다.",
          "en": "Measure the attack distance, then use the corresponding band. Template, Melee and special range notation follow their own rules."
        }
      }
    ],
    "aliases": [
      "Short Range",
      "Long Range",
      "SR",
      "LR",
      "단거리",
      "장거리"
    ]
  },
  "equipment.short-accuracy": {
    "title": {
      "ko": "명중 보정",
      "en": "Accuracy Modifier"
    },
    "summary": {
      "ko": "선택한 사거리 구간에서 명중 굴림에 적용하는 보정입니다.",
      "en": "The hit modifier for the selected range band."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "현재 구간의 단거리 또는 장거리 보정 하나와 해당 상태·행동의 보정을 적용합니다. +1은 무기 S나 피해가 오르는 뜻이 아닙니다.",
          "en": "Use the one modifier for the current range band together with applicable state and action modifiers. +1 does not increase weapon S or damage."
        }
      }
    ],
    "aliases": [
      "Short Accuracy",
      "Long Accuracy",
      "명중 단",
      "명중 장"
    ]
  },
  "equipment.long-accuracy": {
    "title": {
      "ko": "명중 보정",
      "en": "Accuracy Modifier"
    },
    "summary": {
      "ko": "선택한 사거리 구간에서 명중 굴림에 적용하는 보정입니다.",
      "en": "The hit modifier for the selected range band."
    },
    "sections": [
      {
        "heading": {
          "ko": "어떻게 처리하나요?",
          "en": "Resolution"
        },
        "text": {
          "ko": "현재 구간의 단거리 또는 장거리 보정 하나와 해당 상태·행동의 보정을 적용합니다. +1은 무기 S나 피해가 오르는 뜻이 아닙니다.",
          "en": "Use the one modifier for the current range band together with applicable state and action modifiers. +1 does not increase weapon S or damage."
        }
      }
    ],
    "aliases": [
      "Short Accuracy",
      "Long Accuracy",
      "명중 단",
      "명중 장"
    ]
  }
});
})();
