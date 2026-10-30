# Clickable N26 rule terminology

This change links terminology inside verified rules, play-mode prose, mission and campaign guides, selected-skill previews, and verified context-help paragraphs. It does not rewrite saved descriptions or user-authored text.

## Coverage

- All 46 supplied-source weapon traits: English/Korean full names, short family names, and parameters such as `Toxin (3+)`, `톡신(3+)`, `Blast (3/5 inches)`; the actual parameter remains visible in the clicked text and trait popup.
- All nine verified conditions link to their condition effects rather than a similarly named skill (notably Fearsome).
- Verified catalogue rule names, actions, skills, equipment, model subtypes, territories, side jobs and scenario entries.
- Short aliases for visibility, terrain tests, OOA, income, trade points, AP, dice notation, recovery, actions and common transliteration differences.
- Dedicated Tunnel Warfare and Firepower Dice explanations derived from the existing verified records.
- Context and folded examples for Toxin, Visibility/Pitch Black, Agility/terrain, weapon-profile notation and dice conventions.

Tunnel Warfare distinguishes its normally agreed battlefield use from the specific Tunnels stake rule. Territory ownership alone does not apply it to every battle. Toxin explains S/T bypass, the different vehicle threshold and that it does not itself bypass saves.

## Source boundary

Uses the existing `source_verified` N26 catalogue, including original-page-reviewed source records. The original PDFs were not reread during this change. No new edition compatibility or unverified rule values are inferred. N23 is excluded. Aliases resolve by exact existing IDs; dedicated explanations are hidden if their referenced source rows are absent. User descriptions, cleared overrides and account values remain unchanged.

## Maintaining coverage

`dist/rule-terms-data.js` holds reviewed explanations, source ID aliases and contextual examples. `dist/rule-terms.js` registers catalogue names and parameter families. Do not add guessed mechanical definitions to make a missing term appear complete. General-English words are protected against incidental matching. Adding a source record automatically adds its names; shortened rule headings still require explicit aliases.

`tests/rule-terms.cjs` verifies all 46 trait families, conditions, territory terms, exact source IDs, numeric parameters, escaping, KO/EN changes, nested return/focus/scroll, folded examples, preserved drafts and immutable account/catalogue state.
