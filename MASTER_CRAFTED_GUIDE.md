# Master-crafted control guide

The user requested an explanation of why to use Master-crafted, when it applies and its restrictions, beside an equipment editor showing a Corpse Grinder cult icon.

## Verified scope

- The current production N26 dataset has 46 verified weapon-trait families and no common Master-crafted trait/purchase entry. The named Kal Jericho weapon is a separately supplied equipment profile; a name alone is not a general trait definition. Nothing in this change modifies the catalogue or certifies a general N26 upgrade.
- The exact Corpse grinder cult icon entry is verified N26 Wargear, not Weapon. Its Enrage/Movement ability is unchanged. Checking a manual marker does not grant a reroll or alter that ability.
- Web research reviewed the official **September 2026 FAQ, four pages**. It has no common Master-crafted addition. This bounded result is not a claim that every N26 book was read or that the rule was definitively removed.
- The older public official [Trading Post PDF](https://assets.warhammer-community.com/necromunda_faqs_tradingpost_eng_24.09-cm8tuqawdi.pdf), title `NEC_Trading_Post_April_22.indd`, has 28 pages and PDF metadata dated February 2022. Its actual rendered pages **21 and 26** were visually inspected. Page 21 covers Extravagant Goods eligibility (Gang Hierarchy (X), Gang Leaders or Champions), new weapon purchase, 25% premium rounded up to 5 credits, grenades being Wargear and the exception for replacing an owned weapon with a new version and stashing the original. Page 26 gives once-per-battle, weapon-specific single failed hit reroll. The app paraphrases these as **legacy reference**, not verified N26 mechanics.
- The guide uses an original 4+ example (2 fails, reroll 5 hits or 2 fails; weapon's use spent either way) and 40-credit weapon → 50-credit new version example. The latter explicitly does not apply that calculation to the 40-credit icon in the user's screenshot. No rarity, access or N26 pricing is invented.

## Changes

`dist/master-crafted-guide.js` / CSS supply a compact adjacent help button and six initially folded sections: purpose, timing/example, eligible user/equipment, purchase/cost example, what the app saves, source/edition scope. The N26 verification boundary and this item's Wargear context remain visible.

The existing checkbox is retained with its original field name, value and checked state. It is a manual stored flag. Opening the guide does not change the form, deduct credits or award mechanics; saving still uses the original editor callback. Existing cost, checkbox and account data are never corrected silently. The control now explicitly says that price/effects are not automatically applied.

`rules-reference.js` routes an otherwise undefined `Master-crafted` trait click to the same labelled guide. Known/custom definitions are not overridden. Nested reference return restores the original equipment popup and focus. The official source catalogue remains unmodified.

## Verification

- `tests/equipment-labels.cjs`: production equipment editor (icon cost40/checked, unsaved37), help click does not toggle checkbox, six initially folded sections, legacy limits/pricing and source links, N26 boundary, KO/EN disclosure state, original draft/focus return, no API/data/catalogue writes; trait popup nested return; custom text escaped and not certified as official equipment.
- Chromium 375px/1280px: actual icon editor, compact help control, all six folds, examples, locale switches, no horizontal overflow, unchanged unsaved fields, cancel preserves saved data; mocked account endpoints only.
- Existing equipment identity and rule-term suites, build and Worker validation.
