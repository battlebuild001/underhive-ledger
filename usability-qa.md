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
