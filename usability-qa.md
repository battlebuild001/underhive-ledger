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

## Follow-up: battle Operations shell

- The app top bar and breadcrumb were incorrectly moved into the Operations content. The original app menu button now lives in the battle header; its menu contains the original home/context, language and theme controls. Closing the menu restores the same nodes, with no duplicate language switches or lost handlers.
- Campaign recruitment stays on the campaign management screen and is not inserted into report/session battle tabs. Report Operations has a clear battle-management card and shows authored notes when present, without a placeholder for an empty note.
- Verified report, live-session and skirmish Operations at 320×844, 390×844, 844×390 and 1280×1000: no floating app bar or recruitment control; native menu opening/closing, Escape, language and theme switching, reopening, responsive bounds and restored campaign navigation all passed without record changes. Build and compiled Worker validation passed. Evidence: `/workspace/shared/battle-operations-{320,390,844,1280}.png`, `/workspace/shared/battle-app-menu-{320,390,844,1280}.png`.

## Follow-up: preparation steps and dice spacing

- Restored step 2, Mission setup, between attacker/defender and battlefield setup. It summarizes the original deployment/objective/crew selections and opens the original Mission tab controls for changes. Removing the old empty heading avoids an extra blank gap.
- Grouped the original preparation status and remaining-dice button with consistent spacing. The role roll-off and attacker selector now align at desktop sizes and stack with full-width, 44px minimum controls on mobile. Original handlers, source tables and records are preserved.
- Verification: 29 command interface, 18 standalone skirmish production-flow and 5 campaign quick-flow cases passed. Build and compiled Worker validation passed. Chromium checks at 320×844, 390×844, 844×390 and 1280×1000 covered steps 1–5, control spacing/bounds, mission navigation, manual selections, remaining-roll cancel/apply, note preservation, English/light mode and no horizontal overflow or page errors. Evidence: `/workspace/shared/preparation-order-{320,390,844,1280}.png` and light-mode counterparts.

## Follow-up: discoverable XP/injury entry and compact Side Job completion

- The supplied screenshot matches the older pre-fighter-results renderer: no setup summary, outcome badges, fighter section, result title or app menu. Current source always renders the fighter-results heading, including empty/missing-roster states; no service worker exists and the Worker serves no-cache assets. A previously open page needs one refresh to execute the current code.
- Added an explicit XP & injuries shortcut beside the result heading. It focuses and scrolls to the existing fighter controls. Gang tabs show one roster at a time and retain the selected gang across rerenders; pointer and keyboard navigation are view-only. XP/injury actions keep the original verified rules and atomic campaign persistence. Viewer tabs remain usable outside disabled result fieldsets, while all writes remain blocked. Explicit empty saved crews stay empty.
- Side Job completion is now one compact group with separate gang and source-job lines, native checkboxes, full-row touch targets, and explicit Completed/Not completed text. Toggle styling and accessible native state agree; unfinished drafts, source IDs and final save semantics are preserved. Scoped styles override the existing 36px compact button rule to retain 44px minimum XP/injury controls.
- Verification: 30 command interface cases passed, including saved Played reports, both gang rosters, shortcut focus, Side Job drafts/save, viewer guards and empty crews. Actual authenticated Chromium → Worker API → SQLite confirmed XP, stat-modifying lasting injury and final victory with original/shared roster reconciliation, retained unfinished notes, three receipts and no duplicate save or fabricated crew/session. Build and compiled Worker validation passed.
- Chromium passed 320×844, 390×844, 844×390 and 1280×1000: saved-results visibility, gang tab click/keyboard/state retention, checkbox/whole-row/keyboard toggles, draft preservation, source Side Job save, 44px controls, Korean/English, dark/light and no overflow/page errors. Evidence: `/workspace/shared/result-optimized-{top,fighters,light}-{320,390,844,1280}.png`.

## Follow-up: faction rules designed for the roster

- Added an explicit roster layout to the shared faction renderer. The default full guide stays unchanged. Battle rosters now use one inset panel with a 16px heading, small faction identity, compact native rule disclosures and thin dividers, replacing the pasted introduction and numbered guide cards. Overview/guidance moves into its own disclosure; rule bodies use 14px source prose and borderless condition/example disclosures.
- All verified entries, path labels, faction-specific cautions, examples and source references remain generated by the original functions and IDs. Custom/other-edition rosters keep their own unavailable state. Disclosure state uses stable faction/rule/fold keys across rerenders, side changes and language switching, with no game-record writes.
- Verification: 31 command interface cases and 8 full gang-guide cases passed, covering all 17 verified faction identities, exact rule prose parity, unchanged full-guide layout, nested disclosure restoration, source help and record preservation. Build and compiled Worker validation passed.
- Chromium passed 320×844, 390×844, 844×390 and 1280×1000 with ten-fighter rosters and Cawdor/Corpse Grinder footers: panel placement/spacing, default compact list, native keyboard expansion, conditions, reference modal return, retained state, 44px minimum targets, typography, Korean/English, dark/light and no horizontal overflow or page errors. Evidence: `/workspace/shared/faction-roster-{designed,open}-{0,1}-{320,390,844,1280}.png` and `/workspace/shared/faction-roster-light-{320,390,844,1280}.png`.

## Follow-up: Custom management under gang creation

- Removed Custom from the common home tabs, desktop/sidebar and mobile navigation, settings menu and legacy workspace navigation. The active mobile menu now has three equal columns. The original catalog renderer and custom records remain available internally.
- Added a real management action after the faction list in the gang-creation popup. It is outside the listbox and never becomes a faction value. Search keeps it available and Arrow/End/Tab navigation reaches it. It opens a compact manager using the original custom equipment/fighter/skill/gang-type/trading-post/collection sections and native asset editors.
- The existing nested dialog mechanism restores the same creation form and entered name, source faction, budget, optional settings and portrait DOM. Returning refreshes faction choices, including newly authored custom types. Edition context is carried by the current modal DOM, inherited by child editors and released on close; it never changes the global edition.
- New N23 gangs also reach the edition-filtered faction picker and custom action. With no verified presets they retain the original manual-create fallback, original generic defaults and entered draft values. Editing existing unsupported records and recruitment/XP policy remain unchanged; N23 never borrows N26 faction rows.
- Verification: 32 command interface cases, 14 new-gang-default cases and the shared interaction-control suite passed. Chromium passed 320×844, 390×844, 844×390 and 1280×1000: three-item navigation, footer keyboard/search access, nested cancel/create, scoped N26 manager with global N23, preserved original draft/focus, new custom type at the end of its group, actual custom gang creation, 44px manager actions, Korean/English, dark/light and viewport bounds. Build and compiled Worker validation passed. Evidence: `/workspace/shared/custom-entry-{main,picker,manager,light}-{320,390,844,1280}.png`.
- The legacy `assets-parity.cjs` suite is excluded by the repository's supplied-source runner and stops at its removed demo campaign fixture (`data.campaigns[0]`); it is not counted as passing. Its current nested asset creation path was exercised directly through the production script chain above.

## Follow-up: skirmish landing reduced to new/ongoing games

- Replaced the skirmish landing with two blocks: the New game action and the Ongoing games list. Removed the large introduction, guessed roster cards, setup preview, checklist, duplicate create actions and guide/workspace disclosure. Resume rows show only the authored match name, sides and current stage. Empty state stays compact.
- Only usable setup/battle records are listed. Completed/incomplete records remain untouched in storage/backups and original detail routes stay available. New-game creation and all native preparation/play controls are unchanged.
- End-to-end reload verification exposed missing Worker fallbacks for `/skirmishes` and its detail paths, now covered by compiled GET/HEAD HTML assertions. It also exposed settled-guest route application repeatedly clearing a new selection after a list reload. Bootstrap now claims a resolved list/found-match route after guest loading settles; unknown deep links and pending account/document routes keep their original protection.
- Verification: 33 command interface and 19 standalone skirmish production-flow cases passed, including active-only list/data preservation, create cancellation, native resume/back, actual guest401 reload/open, pending-document deep links, full optional crew/setup/result flows and unrelated roster/campaign preservation. The test request-options shadowing was corrected so its delayed-document assertion actually executes. Build and compiled Worker validation passed.
- Chromium against the actual compiled Worker passed 320×844, 390×844, 844×390 and 1280×1000: exactly two landing blocks, no preview/guide extras, native create/cancel/resume/back/reload, hidden records retained, empty state, Korean/English, dark/light, 44px actions and no horizontal overflow or page errors. Evidence: `/workspace/shared/skirmish-home-{simple,light,empty}-{320,390,844,1280}.png`.

## Follow-up: campaign name generation button

- Added Generate name / 자동 생성 beside the original campaign name input for create, edit and manual forms. Existing unique initial defaults stay unchanged until the button is pressed. Names combine bilingual location/event phrases, avoid saved/current/previously generated suggestions and remain ordinary editable input. Exhausted combinations use an unused numeric suffix.
- The original required input, native save/validation events and other draft settings remain intact. The visible label is associated through for/id and generated text is announced in a hidden live status. The button is a 44px native non-submit control; no network request or game-record write happens while generating.
- Verification: 6 campaign quick-flow cases and 9 campaign default/settlement cases passed, including deterministic collision probing,20 unique drafts, saved-name avoidance, language/manual forms, input/edition/type preservation, native save and cancellation. Build and compiled Worker validation passed. Chromium at 320×844, 390×844, 844×390 and 1280×1000 checked20 Korean suggestions per form, status/label/keyboard behavior, unrelated field and record preservation, manual edits, native creation/edit cancellation, English/light mode, 44px targets and viewport bounds. Evidence: `/workspace/shared/campaign-name-{320,390,844,1280}.png` and light-mode counterparts.

## Follow-up: XP save missing-parent conflict

- Reproduced the exact409 “기록의 상위 항목이 변경되었습니다.” in two server states: a battle report saved in the owner's personal document but absent from the shared snapshot, and a client empty XP-history default whose authoritative source field is omitted. Both failures left XP and receipts unchanged.
- The server now reconciles only touched, uniquely identified missing battle reports already stored in the owner's authoritative personal document, with an exact clean request-baseline match and valid participant references. It never replaces an existing shared report or creates a missing report from client-only data. This prior report survives undo; result changes retain their existing journal/revision/access guards.
- For changed source-gang arrays only, an empty client display default becoming populated can be treated as first creation when the authoritative field is strictly absent. The receipt records creation of the whole array, allowing exact undo. Unchanged defaults, explicit nulls, nonempty stale baselines and missing fighter entities retain their existing guards; no generic parent auto-creation was added.
- Verification: full campaign automation API suite passed with owner/editor/foreign-source authorization, private-note preservation, missing-report XP61→67, injury/effect mirrors, duplicate retry, report-preserving reversal, forged/duplicate/stale/outsider rejection, transactional races, injected storage rollback/retry, first XP/injury/effect/log array creation, unchanged absent fields and later-history undo conflicts. Ten central frontend automation cases and build/compiled Worker validation passed.
- Actual authenticated Chromium → current Worker API → SQLite reproduced the screenshot's five event counters at1 each (total+6), saved XP61→67 with manualOverride=false, then a verified lasting injury and final victory. Three receipts reconciled original/shared rosters and report outcomes, retained unfinished notes, preserved private notes and created no fake crew/session; repeated final save added no receipt. Evidence: `/workspace/shared/xp-parent-before-save.png`, `/workspace/shared/xp-parent-fixed.png`; logs `/tmp/xp-parent-api-final.log`, `/tmp/xp-parent-real-api.log`.

## Follow-up: automatic role selection after skirmish roll-off

- A native role roll-off now immediately selects the winner as the default attacker and the other side as defender. A tie clears the roles for a reroll. The original selector remains editable because the winner may choose either side under the source rule; help text makes the default/change distinction explicit. Deployment-edge dice stay independent.
- Native and remaining-preparation flows share a guarded role setter. It clears the match's role-specific crew/crewPlan only when roles actually change, preserving crews on same-role rolls/reselection and retaining all notes and original rosters.
- Remaining preparation preserves an existing complementary manual pair without drawing role dice. Unassigned roles can use a stored non-tie winner without rerolling; the action stays available for that older saved state. New ties clear partial imported roles, with cancel, stale-record and actor checks retained. Opening or rendering a record does not assign roles or write data.
- Verification:19 standalone skirmish and7 campaign quick-flow production cases passed. They cover A/B wins, ties/rerolls, manual opponent choice, edge independence, crew retention/reset, stored-winner application, remaining-table/manual-role preservation, cancellation/stale rejection, partial-role tie cleanup and protected notes/rosters/source data. Build and compiled Worker validation passed.
- Chromium passed 320×844,390×844,844×390 and1280×1000: direct automatic selection, tie/reroll, same-role crew retention, manual/edge independence, preview cancel, existing manual and stored-roll handling, note/roster preservation, Korean/English, dark/light and no overflow/page errors. Evidence:`/workspace/shared/role-auto-{320,390,844,1280}.png` and light-mode counterparts.

## Follow-up: mission confirmation returns to preparation

- Added one Confirm / 확인 action after the original skirmish mission cards during setup. It returns to Preparation, focuses its tab and scrolls the step2 mission summary below the sticky navigation. Mobile uses a full-width44px button; desktop aligns it to the right.
- Confirmation is view-only: original autosaved selections remain unchanged, no extra dialog/save/start runs, and incomplete choices can return without losing their draft. The action is absent during battle/completed reference views.
- Verification: the expanded focused production-chain mission-navigation case passed for empty/partial/full selections, footer placement, focus, rerender, language, stage gating and record preservation. Build and compiled Worker validation passed. Chromium passed 320×844,390×844,844×390 and1280×1000 for actual selection→Confirm→Preparation, keyboard focus, visible step2 scroll target, preserved IDs/notes, no extra dialogs, Korean/English, dark/light,44px targets and viewport bounds. Evidence:`/workspace/shared/mission-confirm-{320,390,844,1280}.png`, return and light-mode counterparts.

## Follow-up: selected mission names open their rules

- Preparation step2 now renders each selected deployment/objective/crew name as a compact native reference button with an underline and book icon. It reuses the existing scenario-help route and exact verified source ID, opening the original rule/diagram window separately from mission selection. Missing/unknown values stay plain text with their existing message.
- Closing the window restores the original reference button and Preparation location. Viewing does not change the chosen mission, reroll, save, start a game or move to the Mission tab. Selecting another mission updates the reference after the original save/rerender.
- Verification: two focused production-chain cases passed for mission confirmation plus all three summary references, correct source/title/guide, keyboard/Escape return/focus, missing values, reselection, locale and record preservation. Build and compiled Worker validation passed. Chromium at320×844,390×844,844×390 and1280×1000 confirmed all three native rule/diagram windows, source-ID accuracy, selection/notes/roster preservation, updated references, Korean/English, dark/light,44px controls and no overflow/page errors. Evidence:`/workspace/shared/mission-summary-{links,rule,light}-{320,390,844,1280}.png`.

## Follow-up: remove the battlefield setup card

- Removed the standalone preparation card “3. Battlefield /3.전장 설치” and its generic terrain paragraph/help action. Renumbered Crews to3 and Effects/tactics/deployment to4; mission selections, source rules and game records stay intact.
- Updated the existing preparation numbering expectation to1–4, with a general numbered-heading filter so a stray later step cannot be hidden by the test. The focused preparation/mission-confirm production case passed. Chromium at390×900 and1280×900 confirmed card removal, continuous numbering, mission-confirm return, Korean/English/light display, unchanged selected mission/crews/notes/rosters and no overflow or page errors. Build and compiled Worker validation passed. Evidence:`/workspace/shared/preparation-no-field-{390,1280}.png`.

## Follow-up: tactics acquisition becomes a read-only table reference

- Replaced the first acquisition/generation teaching paragraph with a D66 tactics table button. It opens only the18 verified N26 core-pack results, showing source D66 ranges, localized names and effects. The long acquisition-rule shortcut was removed from this section; battle selection/use guidance and the owned-pool allowance remain available.
- Reused the native reference dialog for keyboard access, Escape/close, inert background and focus return. The table has a caption and column/row headers, wraps within narrow screens and contains no roll, grant, select or save actions.
- Verification: updated preparation-reference and existing selection-allowance production cases passed. Chromium passed320×844,390×844,844×390 and1280×1000 with all18 rows, Korean/English, dark/light, keyboard open/Escape/focus return, no horizontal overflow/page errors, retained unfinished notes and unchanged gangs/campaigns/matches/source catalog. Build and compiled Worker validation passed. Evidence: `/workspace/shared/tactics-table-{320,390,844,1280}.png`, entry and light-mode counterparts.

## Follow-up: arrow buttons for final victory points

- Added explicit up/down arrows to each side's final VP field. Each press changes only that side's draft by1 within the existing0–999 range; direct numeric entry and native keyboard arrows remain available. The existing single result-save action commits both scores and removes controls once completed.
- Each arrow has a localized, side-specific accessible label,44×44px target and keyboard focus treatment. Inputs use explicit labels outside the button group. Scoped workspace styles preserve the original two-column layout, including enough width for three digits at320px, without inherited nested score panels.
- Verification: expanded existing final-score production case passed independent sides,0/999bounds, empty entry, draft persistence after rerender, stale account/session rejection, atomic invalid-save rejection and final4/2 save with unchanged rosters/source data. Chromium passed320×844,390×844,844×390 and1280×1000 for actual arrow clicks, Enter/Space, native input arrows, direct entry, draft/rerender, native final save, completed read-only, Korean/English, dark/light,44px controls, visible digits and no overflow/page errors. Build and compiled Worker validation passed. Evidence:`/workspace/shared/vp-arrows-{320,390,844,1280}.png` and light-mode counterparts.
