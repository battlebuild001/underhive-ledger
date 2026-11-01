# Usability and reliability review — 2026-10-31

## Goal and scope

Make ordinary play require fewer inputs, repeat confirmations and page movements. Preserve the verified source rules, original records, account permissions and permanent-results workflow. This review covers the original application, rather than a replacement prototype.

## Journey reviewed

| Step | Health after changes | Evidence and changes |
| --- | --- | --- |
| 1. Create a gang | Verified | Choosing a faction supplies a unique editable name, verified starting credits and default portrait. Optional imagery and settings are collapsed. Required source choices remain visible. |
| 2. Recruit a fighter | Verified | Source price and an editable unique name are ready after choosing a fighter. Specialist roles, powers and other meaningful source choices remain required. Extra settings are collapsed. |
| 3. Read the roster and buy equipment | Verified | Shorter mobile header brings the first fighter into view. Source controls remain in management. Own-list equipment uses its source cost. Recorded visits are recognized only with current, matching action evidence; independent equipment restrictions remain checked. |
| 4. Prepare and record a battle | Verified | Retained the permanent-results workflow. Removed physical-board preparation checkboxes. Invalid quick-battle input has a visible and announced reason. Participation XP remains automatic at settlement. |
| 5. Apply campaign operations | Verified | Post-cycle fields follow the selected action; unavailable actions explain their restriction. Starting territory uses one choice/preview/apply dialog. Trading visits and carry-forward no longer ask the same question twice. |
| 6. Save, recover and return | Verified | Save progress is visible. Failed forms retain their values. Quota failure keeps current records with retry and current-memory backup. Unsaved authored changes prevent logout data loss. Navigation alone does not prevent logout. |

## Data integrity fix

A shared campaign owner's native Trading Post visit previously updated a ledger parent outside the shared journal. The next journalled income operation failed with “record parent changed.” The visit, TP and action ledger now commit together through the existing authorized campaign transaction. The original frontend and actual Worker API passed visit → cloud save → income, alongside battle settlement and personal/shared roster reconciliation.

Storage failure no longer writes a new cloud marker beside an old failed local cache. A reload cannot mistake that stale cache for newly edited data and overwrite the confirmed cloud records. Successful cloud saving suppresses a misleading critical local warning.

## Evidence

Screenshots captured from this run are in `/workspace/shared/usability-audit-20261031/`.

| Flow | Before | After |
| --- | --- | --- |
| Gang creation | `02-new-gang-before.png`, `06-gang-chosen-before.png` | `11-create-ready-390.png` |
| Gang roster | `03-gang-roster-before.png` | `03-gang-roster-final.png`, `12-new-roster-390.png` |
| Recruitment | `04-recruit-before.png` | `13-recruit-ready-390.png` |
| Post-cycle action | `09-post-cycle-before.png` | `16-post-cycle-after.png` |
| Starting territory | `10-starting-territory-before.png` | `17-starting-territory-after.png` |
| Save recovery | Failure injection | `14-storage-recovery-390.png` |
| Landscape/light | Responsive review | `15-light-create-844.png` |

Real browser checks passed at 320×844, 390×844, 844×390 and 1440×1000: source gang creation, recruitment, equipment purchase and exact credit deduction, quota failure, actual backup download, storage retry, dark/light, preserved cancellation and unique suggested names. No horizontal page overflow, page errors or native alert failures occurred. Additional browser checks verified relevant economy fields, the single starting-territory form and removal of physical-board preparation checkboxes.

## Verification and limits

- Final `npm test`: 49 required account, campaign, source integrity and production-flow suites passed, including nine new usability cases and eleven Trading Post cases.
- `npm run build` and `npm run validate` passed. Every changed application asset matches the validated compiled Worker.
- Actual Worker/SQLite integration verifies battle results and the shared owner post-cycle chain; compiled Worker validation also verifies account signup, HttpOnly authentication, isolated documents, D1 migrations and static/deep-link assets.
- Existing source policy defers 58 legacy suites that reference removed demo/catalog fixtures. They are retained and are not counted as passing.
- This is a bounded review of the flows above, not a claim that every possible device, user record or rule combination is flawless. Real user records were not mutated during QA.
- Meaningful choices and destructive-operation confirmations remain. No source prices, rules, permissions, private notes, database schema or public access setting were changed.

## Follow-up: paired battle roles

- Two-gang challenge/report drafts and pre-battle sessions now pair attacker and defender after either side is selected. Clearing the role clears both; reports with more than two gangs retain independent roles.
- Gang pickers exclude gangs already chosen on the other side. Old duplicate drafts require a new opponent without changing the stored record until Save. Single-gang challenge drafts open with an opponent slot ready.
- Role labels are Korean/English. Side jobs, their completion, notes, cancellation and the original result guards remain intact.
- Verification: 57 campaign data, 9 preparation, 16 session data and 16 command interface cases passed, plus build and compiled Worker validation. Chromium passed at widths 320, 390 and 1280: one-choice role pairing, excluded duplicate choices, Korean labels, saved roles after navigation/reload and preserved authored notes. Screenshots: `/workspace/shared/paired-roles-{320,390,1280}.png`.

## Follow-up: Side Job result timing

- Challenge preparation now hides and disables Side Job achievement controls. Played reports show the specific label “Side Job completed / 사이드 잡 달성.” Previously saved achievement values are preserved when editing a challenge.
- Reopening an unplayed challenge with an empty saved winners array now retains a winner selector when recording its result. Recorded draws also retain their selection.
- Targeted source-chain checks cover preparation/result switching, added participants, cancellation, preserved historical/custom jobs, and saving the eventual result. Browser checks at 320, 390 and 1280 verify actual visibility, enabled state, Korean labels and cancellation. Build and compiled Worker validation passed. Screenshots: `/workspace/shared/side-job-{preparation,results}-{320,390,1280}.png`.

## Follow-up: territory stake wording

- The native challenge/report field already stores the challenge stake in `territoryId`. Challenge preparation now calls it “Territory at stake / 전투에 건 영토,” with “No territory at stake / 건 영토 없음” and a short ownership note. Played reports retain their result wording.
- Switching between preparation and results preserves the selected territory. The claiming-winner control is hidden during preparation. Existing source eligibility and result-only ownership transfer logic remain intact.
- Source-chain regressions verify choosing/saving a stake leaves ownership intact, recorded victories can transfer it, and draws/cancellation do not. Responsive browser checks verify Korean wording, mode switching, and ownership plus stake preservation through save/reload. Screenshots: `/workspace/shared/stake-preparation-{320,390,1280}.png`.

## Follow-up: View battle routing

- Paired challenge/report rows previously opened the native edit form from a button labelled “View battle.” They now open the common battle workspace on the roster tab, with mission, result and operations tabs. Setup editing is an explicit action under Operations.
- Exact session/report links reuse the existing session, including adopted legacy challenges. Linked records are deduplicated in the list. Matching two gang IDs alone never creates or guesses a link.
- Viewing a report creates no session, crew selection, challenge acceptance or game result. Saved crews are displayed where available; otherwise the view explicitly displays full rosters. Result entry retains the original report validation and save path. Incomplete opponent slots retain their original edit action; shared viewers cannot edit results or setup.
- Browser checks at 320, 390 and 1280 cover completing an original challenge form, opening the roster without a settings modal, mission viewing, result cancellation, Back, reopening, reload, and one saved final draw without a duplicate session. Original gang/campaign records remain identical through view-only navigation. Screenshots: `/workspace/shared/report-battle-roster-{320,390,1280}.png`.

## Follow-up: faction rules below rosters

- Removed the “Full rosters / 전체 로스터” heading above the battle roster.
- The shared roster renderer now appends the selected gang's faction rules after its last fighter, for campaign reports, campaign sessions and skirmishes. It reuses the existing verified faction renderer and source references rather than duplicating rule text. Each side uses its own gang's identity; custom/N23 records do not borrow N26 rules.
- Rules remain readable inline. Existing conditions/examples can expand independently, their open state is retained in view state, and rule references open the original help. Footer colors follow the shared dark/light theme.
- Checks cover all 17 verified faction identities, footer placement, side switching, source-rule lists, help, Korean/English and record preservation. Responsive Chromium checks at 320, 390 and 1280 passed in dark/light modes without horizontal overflow. Build and compiled Worker validation passed. Screenshots: `/workspace/shared/roster-faction-{0,1,light}-{320,390,1280}.png`.

## Follow-up: inline report results

- The report workspace Results tab now contains the actual winner/draw, Side Job achievement and notes inputs, followed by one Save result action. The intermediate button and modal are removed. The selected stake is displayed without asking the user to choose it again.
- Native report saving and the inline form share `cpSaveReport`, retaining original membership, winner, scenario, protected-territory and result checks. Input alone changes no game records. Drafts survive tab switching and rerenders; stale records, changed identity/access and viewers cannot save. Repeating an unchanged saved result does not add another activity entry or award.
- Multiplayer reports keep draw exclusive and require an explicit territory recipient when multiple gangs win. Original mission fields and Side Job identities remain preserved by the shared report path.
- Verification: 61 campaign data cases and 24 command interface cases passed, plus build and compiled Worker validation. Chromium passed 320×844, 390×844, 844×390 and 1280×1000: immediate inline fields, invalid-result feedback, retained drafts, one result save, winner/Side Job/notes/stake application, duplicate-save no-op, reload and English/light mode. Screenshots: `/workspace/shared/inline-result-{320,390,844,1280}.png`.

## Follow-up: complete report fighter outcomes

- Existing paired report result entry now opens the Results tab directly, titled “Battle result / 전투 결과.” The explicit setup action remains under Operations and is titled “Battle settings / 전투 설정.” The old challenge-edit title is no longer used for these entries.
- Previously selected gangs, mission components and stake are displayed as a compact read-only summary. Choosing a winner also displays the other side's loss; draw remains exclusive. Each participating gang's fighter list exposes the existing verified XP and lasting-injury workflows, including current XP and recorded outcome summaries.
- Fighter updates commit the original roster and the report's fighter-result row together through campaign automation. XP history and lasting injuries carry a `battleReportId`. Pending winner/notes survive these updates. Final report saving also uses one atomic campaign operation, with duplicate retries handled without another result operation. Actual saved crews are retained; reference rosters are never invented as deployed crews or new sessions.
- Verification: 61 campaign data cases and 25 command interface cases passed. Actual authenticated Chromium → current Worker API → SQLite passed XP → stat-modifying lasting injury → final victory with three receipts, personal/shared roster and report reconciliation, retained unfinished inputs and preserved private notes. A duplicate save added no receipt. No API requests failed.
- Final responsive checks passed at 320×844, 390×844, 844×390 and 1280×1000, including result/setup titles, setup summary, XP/injury controls, victory/loss display, draft retention, one final save, reload and English/light mode. Build and compiled Worker validation passed. Evidence: `/workspace/shared/report-fighter-result-{320,390,844,1280}.png`, `/workspace/shared/report-fighter-real-api.png`.

## Follow-up: mission territory presentation — 2026-11-01

- The stake summary now uses the same mission-card class as deployment/objective/crew, so its heading matches their 15px size.
- Both report and real-session Mission tabs show the selected territory's description after the mission cards. Verified source descriptions include their recorded income and battlefield effects, with the original full-rule reference available. Authored descriptions remain literal, explicitly cleared descriptions stay cleared, and another edition's rules are not substituted.
- Verification: 27 command interface cases passed, including source/custom/cleared descriptions, edition isolation, report/session placement and read-only behavior. Browser checks at 320×844, 390×844, 844×390 and 1280×1000 confirmed equal computed heading sizes, footer placement, full-rule help, Korean/English, dark/light and no horizontal overflow or record changes. Build and compiled Worker validation passed. Screenshots: `/workspace/shared/mission-territory-{top,description,light}-{320,390,844,1280}.png`.
