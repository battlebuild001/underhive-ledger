# Campaign preparation: selected three-step design QA

**final result: passed**

## Comparison target and capture

- Source visual truth: `/workspace/generated_images/exec-81db0938-0c66-4e5d-8b48-41e589e4a140.png`, the third displayed design selected by the user.
- Source pixels: 853 × 1844. Normalized to the intended 390 × 844 CSS viewport for comparison; the less-than-one-pixel aspect rounding was normalized without cropping app content.
- Implementation: actual shipped script chain and command campaign renderer, entered through the campaign lobby's room-open action, with isolated account/API fixtures. Chromium/Playwright portable preview; no production account records used or changed.
- Primary screenshot: `/workspace/shared/prep-wizard-390-step2.png`, 390 × 844 pixels, CSS viewport 390 × 844, deviceScaleFactor 1.
- Matched state: Korean, dark theme, cycle 2 Occupation, current step 2, eight available fighters, six selected, own preparing and opponent ready.
- Full-view comparison reviewed together: `/workspace/shared/prep-wizard-comparison-final.png`.
- Focused typography/first crew-row comparison reviewed together: `/workspace/shared/prep-wizard-focus-final.png`.
- Additional browser screenshots: `prep-wizard-390-step1.png`, `prep-wizard-390-step3.png`, `prep-wizard-390-ready-final.png`, `prep-wizard-320-step2.png`, `prep-wizard-1280-step2.png`, and `prep-wizard-390-guest-step1.png`, all under `/workspace/shared/`.

## Findings and comparison history

All actionable P0/P1/P2 findings were resolved and the revised captures inspected.

1. **Resolved P2: header and cycle context scrolled outside the viewport on step changes.** Initial full comparison `/workspace/shared/prep-wizard-comparison-initial.png` shows the missing header; the wizard measured y = −97 at 390px. Step changes now scroll the wizard root to its top rather than the step rail. Final capture has wizard y = 0, a visible back action, title and cycle context.
2. **Resolved P2: the title, explanatory sentence and selected count formed three cramped columns.** The initial focused comparison `/workspace/shared/prep-wizard-focus-initial.png` shows the split title/sideways description. The stage heading now uses a grid with a full heading and a separate description/count row. Final focused comparison shows natural Korean wrapping and a clear selected count.
3. **Resolved P2: the fixed footer covered the bottom of the last crew row at 390px.** An intermediate review measured last-row bottom 748.27 against footer top 735.81. The mobile tiles were reduced to 84px while preserving their full-row tap areas. Final browser measurement is grid bottom 724.27 against footer top 735.81; all eight tiles are completely visible above the footer. At 320px the grid ends at 713.63; at 1280px it ends at 653.16.
4. **Resolved P2: footer count and explanatory text ran together.** Footer spacing was corrected, and the redundant selected count is omitted on the crew step. Final full-view comparison shows a distinct explanation and separate Previous/Next controls.
5. **Resolved P2: unrelated campaign-reference content remained below the preparation workflow.** The pre-fix ready capture `/workspace/shared/prep-wizard-390-ready.png` exposed the campaign guide below the preparation content. The focus-scoped stylesheet now hides those references. Final ready capture `/workspace/shared/prep-wizard-390-ready-final.png` and DOM geometry confirm no visible campaign-reference section; Unready and Start are both fully inside the viewport, at y 756.81–830.

## Required fidelity surfaces

- **Fonts and typography:** Existing app font stack and Korean fallback are retained. The 25px mobile question heading, restrained 14px body/controls, strong fighter names and secondary unit-type text preserve the source hierarchy. Main title and explanation no longer collide. Authored/catalog unit types may remain English and wrap, as visible in the focused comparison; they are not rewritten into invented unit roles.
- **Spacing and layout rhythm:** The same order is preserved: compact header, cycle, two-player readiness, three-step rail, focused crew selection, two-column mobile grid and persistent footer. Six selected out of eight available is a count, not an invented crew limit. At 390 × 844 every crew tile and both footer controls are visible. The 1280px adaptation uses four columns instead of artificially stretching the mobile layout.
- **Colors and tokens:** The existing dark slate application surfaces, warm text, muted secondary text, terracotta selected borders/primary action and readiness indicators match the selected direction. The implementation uses application tokens and restrained separators rather than a new decorative theme or image background.
- **Image quality and asset fidelity:** Actual original-roster portraits are used, with existing faction art as the fallback. The fixture deliberately supplies the same existing Cawdor faction portrait for its units, so portrait diversity and color differ from the illustrative mock. Preserving real roster imagery is an intentional product constraint; no user portraits are overwritten with generated characters. Images remain crisp at their small display size, retain aspect ratio and use an intentional cover crop. No generated UI raster or decorative placeholder art replaces live controls.
- **Copy/content:** The three labels, crew question and final-review action follow the selected design. Production has no “sample” badge. Side Job, tactics and notes remain optional, and their content/rules come from the existing verified catalogs. The next action does not mark a player ready before final review. Server saving and readiness retain the existing semantics.

## Interaction and responsive verification

- Real browser checks at 320 × 844, 390 × 844 and 1280 × 844: no horizontal viewport overflow; fixed footer remains at viewport bottom 844.
- Previous/Next and step navigation retain selected crew, optional Side Job/tactics and a typed note. Navigation alone sends no room mutation request.
- Saving a changed shared setup through “save and next” sends exactly one setup request, clears both ready states and retains the selected crew. Saved setup starts as a compact summary, with its editor collapsed. Opponents cannot see the host-only setup form.
- Zero selected crew cannot advance to final review, and the next action is disabled with a useful reason.
- Save & ready uses the existing atomic ready request. An intentionally injected 503 retained all draft values; retry reused its operation key and succeeded once. Ready locks the submitted choices, Unready restores editing, and both-ready reveals the existing Start action.
- Original roster/campaign fixture JSON remained unchanged by the preparation interactions.
- No page JavaScript errors or unexpected console errors. The injected 503 intentionally produces a browser network error and was treated as expected test evidence, not as a JavaScript failure.
- Native buttons, labels, inputs, checkboxes and select controls remain accessible to normal keyboard/form behavior; crew labels provide full-tile tap targets and existing focus styles remain in place. No accessibility certification or exhaustive screen-reader audit is claimed.
- Browser scripts/logs: `/tmp/prep-wizard-browser.cjs`, `/tmp/prep-wizard-browser-results.json`, `/tmp/prep-wizard-browser.log`, `/tmp/prep-wizard-settings-browser.cjs`, `/tmp/prep-wizard-settings-browser.log`, `/tmp/prep-wizard-ready-capture.cjs`, `/tmp/prep-wizard-ready-capture.log`.
- All preview servers and browser processes owned by these QA runs were closed after capture.

## Open questions / accepted constraints

- The mock depicts fictional individual portraits and shortened roles. Production continues to show the user's actual portraits and unit types. This is intentional, not unfinished placeholder work.
- Longer rosters and expanded optional details can still scroll; the persistent actions remain reachable. The verified eight-unit crew state fits the selected mobile viewport completely.

## Implementation checklist

- [x] Compact preparation focus replaces repeated campaign chrome.
- [x] Three working steps retain drafts and existing permissions.
- [x] Eight-unit mobile crew grid and persistent footer fit together.
- [x] Existing save, readiness, retry and shared-setup behavior verified.
- [x] Normalized full-view and focused visual comparisons inspected after fixes.
- [x] No actionable P0/P1/P2 findings remain.

## Follow-up polish

- P3: Optional catalog-derived Korean short role labels could reduce wrapping for English/authored unit types, provided the original type remains available and gameplay meaning is not changed.
- P3: The completed-step numeral could use the application's existing check icon in a later polish pass; current numbering and active-step styling remain clear.
