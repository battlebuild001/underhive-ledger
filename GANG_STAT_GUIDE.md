# Gang summary metric explanations

The gang overview now exposes a dedicated, labelled help button beside Rating, Reputation, Credits, Trade Points, Wealth and Gang Size. Each help view starts with its current value and a short definition. Usage, a worked example, the current gang's calculation and verified source buttons are initially folded.

## Source scope

N26 explanations require exact, source-verified N26 entries in the supplied catalogue:

- `n26-core-gang-finances`: full roster Rating, Wealth, starting/minimum Reputation and no overall roster-size cap.
- `n26-core-reputation`: apply gains before losses, minimum 1.
- `n26-core-gang-budget`: campaign founding leftovers versus skirmish founding leftovers.
- `n26-core-visit-trading-post`: Leader 2TP / Champion 1TP on actual visits; eligible visitor required; credits and TP both spent; unused TP expire at the end of that sub-step; gang-list/Exclusive access.
- `n26-core-tactics-selection`: base 1, lower full Gang Rating gains one selection per full 200-credit gap.

The help opens these exact rules using the existing nested-reference stack. No web or older-edition rule is imported. N23/custom editions get the app-record explanation and current breakdown only, with no N26 TP mechanics, worked N26 examples or source links. N23 continues to hide the TP summary exactly as before.

## Actual app calculations

All values and live breakdowns call existing `MMFinancials` methods. The change does not alter financial or roster calculations, transactions, record statuses or saved documents. Original numeric summary text is preserved. Wealth and Size retain their existing `data-finance` popover buttons; help controls are separate sibling buttons, never nested buttons.

The current app calculation excludes captured/dead/retired/enslaved/destroyed records and corresponding flags, but includes In Recovery. The record fold explains this display convention. If excluded records actually exist, they are listed; Rating help explicitly notes the difference from the verified N26 wording about all roster models. The guide does not certify the status-filtered sum as the full official roster value. This task does not silently change existing arithmetic.

TP is a saved resource balance, not generated automatically just for owning a Leader/Champion. The app's purchase callback deducts recorded TP on non-fighter-list purchases, but visits/expiry require manual confirmation and resource records. The help makes this concrete, including the distinction between numeric 0TP and Exclusive `E`.

Examples use clearly hypothetical prices (100cr/3TP → purchase50cr/2TP →50cr/1TP, remainingTP expires), full Rating950 versus1350 (400gap →+2 tactics), Wealth950+50+0=1000, a20cr equipment purchase transferring cash into model value, Reputation1/+2/−4 stopping at1, and roster9 versus a hypothetical starting crew6. No example is a new equipment price or scenario entry.

## UI and context integration

`gang-stat-guide.js` wraps the final gang header renderer, preserves existing statistic nodes/value text and places help beside each one. CSS is scoped to these six wrappers and the new guide. `MMContextHelp.open` delegates corresponding keys only on the current gang/fighter screen and matching edition. Other campaign contexts retain their original help behavior.

The views are read-only. They preserve language/disclosure state, nested return, keyboard focus, form drafts and saved numeric zero values. User-supplied model/type labels are escaped. Existing control names, financial actions and account boundaries remain unchanged.

## Verification

- `tests/gang-stat-guide.cjs` (required in `scripts/test.mjs`): all six exact displayed values, one help per metric, four closed sections, existing wealth popover, TP source/eligibility/cost/expiry/E, nested return and locale, quantities/zero/status records/custom text, no N26 leakage into N23, immutable records/catalogue and no API writes.
- Chromium at375px and1280px: all six guides, all sections, each nested source return, KO/EN and focus, preserved Wealth popover, no horizontal overflow or account writes. Isolated API fixtures only.
- Existing rule-term suite, build and Worker validation.
