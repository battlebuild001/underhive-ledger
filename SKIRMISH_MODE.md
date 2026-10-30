# Standalone skirmish mode — N26

## User flow

Home → Skirmish (or gang page → Skirmish) → New battle. Choose two different saved N26 rosters, enter names for paper/external rosters, or mix both. Records live in `data.skirmishes`, separately from campaign sessions. List/detail routes are `/skirmishes` and `/skirmishes/<id>`.

Preparation follows: attacker choice → mission tables → battlefield → crews → effects, tactics and deployment. The app reuses the verified six deployment, six objective and six crew rows and the existing source-scoped diagrams/examples. Table rolls, attacker roll-off and deployment-zone roll-off are independent.

For linked rosters the crew helper supports explicit D3 rolls, Custom/Hybrid selection, one card per eligible model, random equipment sets, separate reserves and manual reserve replacement. Random reserve membership is labelled as helper convenience, not mandatory rules. Eligibility defaults to Active and is explicitly confirmed by players for model-specific exceptions. Shortages are reported; the helper does not manufacture extra fighters.

Battle view offers rounds, source-based Priority tie handling, manual VP, selected crew stats/equipment/skills/rules, mission reminders and explicit completion. Notes are saved explicitly; account/session-scoped input drafts survive rerender/help/locale changes. No XP, credits, injury, equipment, territory or campaign reward is applied to a linked roster by these controls.

## Verified rule sources reused

All are shipped N26 rows marked `source_verified` with the existing `original_page_image_review` verification method. Original PDFs/private page audit are absent in this execution environment; page images and page numbers were not independently rechecked this turn.

- `n26-core-prebattle-sequence`: skirmish D6 roll-off winner chooses attacker; preparation order.
- `n26-core-gang-budget`: normally 1,000 starting credits, unspent skirmish credits lost; reference only, no roster cash mutation.
- `n26-core-lasting-injuries`: optional in skirmish; no claim that skirmishes prohibit XP or injuries.
- `official-003-core-underhive-battlefield-setup`: typical 3×3–4×4 ft and alternating terrain.
- `official-003-core-crew-selection-methods`, `n26-core-equipment-sets`: eligible cards, chosen/random methods and equipment sets.
- `official-003-core-reinforcements`: separate reserve deck, End phase, Priority-first draws and arrival distances.
- `official-003-core-deployment-order`: defender first, one model at a time.
- `n26-core-tactics-selection`: full Gang Rating comparison, base one plus one per full 200 lower-side gap.
- `n26-core-round-sequence`: Priority/Action/End; first-round ties reroll, later ties favour previous non-priority side.

N23 data is not borrowed. Scenario-specific effects, physical objective control, individual eligibility exceptions and actual reserve arrival placement remain player decisions. The helpers show the applicable rules; VP and conclusion are recorded manually.

## Persistence and verification

Optional bounded validation preserves old account documents/backups without skirmishes and unknown extension fields. Incomplete imported records remain preserved but cannot open a broken detail view. Account API uses the existing revision-checked personal document; no database migration is required.

Focused tests cover source binding, dice ranges, two roll-offs, D3, unique models/loadouts, reserves, full roster preservation, selected loadout display, Priority ties, notes, completion, stale account forms, direct links with delayed account data, history and incomplete records. Browser QA uses mocked APIs only, at 320/375/1280 px plus a linked-roster crew selection flow at 375 px. No production account was changed during QA.

Final result: all 29 required repository suites passed, including 12 standalone production-flow cases and the optional-backup validation suite. The 58 legacy fixtures for removed catalog/demo inputs were deferred and are not counted as passes. Final build/Worker validation passed with 137 assets. Original-byte/private page-approval checks were not run because the private audit was absent; the gameplay catalog was not modified.
