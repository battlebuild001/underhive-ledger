# Equipment visual references

Added 2026-10-30. These images help identify miniature weapons. They do not supply rules, stats, prices, eligibility, profile transitions, or ammunition options.

## Research and attribution

- Official public Warhammer Community article: [Learn About the Master Chemists That Could Poison All of Necromunda](https://www.warhammer-community.com/en-gb/articles/aGRQevMy/learn-about-the-master-chemists-that-could-poison-all-of-necromunda/). Complete close-up photos show the stiletto sword/knife together and the Escher combi-needler. No cropping or generated replacement art; standard WebP encoding is used for delivery.
- [Ashen Quarter weapon identification gallery](https://www.ashenquarter.com/exploring-the-arsenal-of-necromunda-a-comprehensive-guide-to-its-weapons/): individually captioned weapon appearance examples, including earlier miniature product photos and illustrations. This is a third-party visual index, not an official N26 rules source. Original image URLs are retained beside the gallery URL. Weapons/art/miniatures are credited to Games Workshop; the image reference host is credited separately.
- Reddit research: [named weapon references](https://www.reddit.com/r/necromunda/comments/v2p7im/) and [weapon appearance compilation question](https://www.reddit.com/r/necromunda/comments/ebulnl/). These discussions helped locate identification resources and highlight common confusions; no Reddit rule interpretation, user photo, or inferred profile is imported.
- Other identification sources, Lexicanum and Bits & Kits Cawdor parts pages, were inspected. Their images are not included in this release.

`dist/weapon-images-data.js` is the auditable manifest: 79 exact verified N26 equipment IDs, 71 image references, source page, original image URL, photo/illustration type, dimensions, copyright credit and SHA-256. Files are bundled under `dist/weapon-images/` at the original dimensions, encoded as WebP (quality 88) for delivery. Each manifest entry retains both the original-download SHA-256 and the served-asset SHA-256. No crops, compositing, drawn additions or generated replacements. Client images use same-origin paths, so opening a weapon does not contact the reference host. Source links open only on an explicit click.

## Matching and scope

- Require an exact catalogue/preset/source ID belonging to a verified N26 entry and its canonical name. Bare names are insufficient. An unknown authoritative ID cannot fall back to a name or another ID.
- Ammunition, combi-pistols, complete combi-weapons, standalone Meltagun/Flamer, and Cawdor polearms have separate identities. No family substring matching, automatic parent inference or generic placeholder weapon.
- Multiple complete editions of the same standard weapon (for example Shotgun and Shotgun with solid/scatter ammo) are explicitly mapped. This does not map separately purchased ammunition to the base gun.
- Custom IDs, renamed/user-defined items, N23, unresolved profile scopes and deliberately cleared references do not borrow a photo.
- Catalogue weapons without a reviewed image show one short availability line. For example Cawdor polearm/flamer and polearm/blunderbuss have no substituted autogun-polearm image.
- The pictured pattern may belong to a different House; the caption identifies it as an appearance example. Earlier art does not replace the verified N26 rules table. The shared stiletto photo explicitly says both weapons are pictured.

## UI

Image is present in the fighter equipment editor, roster equipment popup and equipment rule-reference popup (including the play-mode detail button). The equipment purchase picker has an explicit Photo button beside Buy for mapped weapons. It opens the reference above the original picker and restores focus without rebuilding search, price filters, expanded categories or scroll position. There is no image in the roster card table or the inline play-mode weapon list. Default height is bounded at 148px on small screens / 174px otherwise; the in-place enlarge button is optional. Sources and notes are initially folded. Broken images retain source access and show a concise error, with the zoom control hidden. Photo controls are `type=button` and never submit an equipment editor.

## Verification

- `tests/equipment-labels.cjs`: exact source IDs/asset hashes, independent Meltagun and combi identity, custom/renamed/N23/ammo rejection, actual fighter editor draft, roster popup, play reference, zoom, locale and failed-image fallback; no account writes or catalogue changes.
- Actual Chromium at 375px and 1280px: all 79 mapped entries decode local images; no horizontal overflow; editor/roster/play interactions, locale and enlarge checks; mocked account endpoints, no production data.
- Existing equipment identity/profile and rule-term tests, build and Worker validation remain required.

## Purchase picker correction (version 87)

The initial image release missed the purchase picker. Its inherited profile design also stacked the scope badge on its own line and reserved another row for the floating info icon. Added an explicit image button, kept the info icon within the title area, placed the scope badge inline and reduced per-profile padding, number spacing and trait spacing only within `.fp-equipment-modal`. The play-mode and roster layouts are unaffected.

The screenshot's Frag Lance now has the publicly published official Ridge Walker model photo from [House Cawdor Takes a Stroll Through the Ash Wastes](https://www.warhammer-community.com/en-gb/articles/3AZY9iCe/warhammer-preview-online-house-cawdor-takes-a-stroll-through-the-ash-wastes/). [Lexicanum's Frag Lance entry](https://wh40k.lexicanum.com/wiki/Frag_Lance) identifies the pictured weapon. The caption explicitly identifies this as an equipped model photo rather than a standalone weapon close-up. This changes appearance coverage only.

Chromium measured each Frag Lance profile at **188px before / 112px after** at a 375px viewport; the two-profile purchase entry fell from 564px to 360px in the isolated fixture. The profile title and scope remain on one line, all five stats and clickable traits remain visible. At 375px and 1280px, the actual purchase picker was checked for Frag Lance photo loading, enlarge, KO/EN, original search/scroll/focus return, independent Meltagun image, long Cawdor weapon names, no horizontal overflow and no data/API writes. A production-script regression case in `tests/equipment-labels.cjs` checks the same draft and purchase-control invariants, plus custom/N23/ammo exclusion.
