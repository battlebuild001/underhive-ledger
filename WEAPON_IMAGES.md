# Equipment visual references

Added 2026-10-30. These images help identify miniature weapons. They do not supply rules, stats, prices, eligibility, profile transitions, or ammunition options.

## Research and attribution

- Official public Warhammer Community article: [Learn About the Master Chemists That Could Poison All of Necromunda](https://www.warhammer-community.com/en-gb/articles/aGRQevMy/learn-about-the-master-chemists-that-could-poison-all-of-necromunda/). Complete close-up photos show the stiletto sword/knife together and the Escher combi-needler. No cropping or generated replacement art; standard WebP encoding is used for delivery.
- [Ashen Quarter weapon identification gallery](https://www.ashenquarter.com/exploring-the-arsenal-of-necromunda-a-comprehensive-guide-to-its-weapons/): individually captioned weapon appearance examples, including earlier miniature product photos and illustrations. This is a third-party visual index, not an official N26 rules source. Original image URLs are retained beside the gallery URL. Weapons/art/miniatures are credited to Games Workshop; the image reference host is credited separately.
- Reddit research: [named weapon references](https://www.reddit.com/r/necromunda/comments/v2p7im/) and [weapon appearance compilation question](https://www.reddit.com/r/necromunda/comments/ebulnl/). These discussions helped locate identification resources and highlight common confusions; no Reddit rule interpretation, user photo, or inferred profile is imported.
- Other identification sources, Lexicanum and Bits & Kits Cawdor parts pages, were inspected. Their images are not included in this release.

`dist/weapon-images-data.js` is the auditable manifest: 78 exact verified N26 equipment IDs, 70 original image assets, source page, original image URL, photo/illustration type, dimensions, copyright credit and SHA-256. Files are bundled under `dist/weapon-images/` at the original dimensions, encoded as WebP (quality 88) for delivery. Each manifest entry retains both the original-download SHA-256 and the served-asset SHA-256. No crops, compositing, drawn additions or generated replacements. Client images use same-origin paths, so opening a weapon does not contact the reference host. Source links open only on an explicit click.

## Matching and scope

- Require an exact catalogue/preset/source ID belonging to a verified N26 entry and its canonical name. Bare names are insufficient. An unknown authoritative ID cannot fall back to a name or another ID.
- Ammunition, combi-pistols, complete combi-weapons, standalone Meltagun/Flamer, and Cawdor polearms have separate identities. No family substring matching, automatic parent inference or generic placeholder weapon.
- Multiple complete editions of the same standard weapon (for example Shotgun and Shotgun with solid/scatter ammo) are explicitly mapped. This does not map separately purchased ammunition to the base gun.
- Custom IDs, renamed/user-defined items, N23, unresolved profile scopes and deliberately cleared references do not borrow a photo.
- Catalogue weapons without a reviewed image show one short availability line. For example Cawdor polearm/flamer and polearm/blunderbuss have no substituted autogun-polearm image.
- The pictured pattern may belong to a different House; the caption identifies it as an appearance example. Earlier art does not replace the verified N26 rules table. The shared stiletto photo explicitly says both weapons are pictured.

## UI

Image is present in the fighter equipment editor, roster equipment popup and equipment rule-reference popup (including the play-mode detail button). There is no image in the roster card table or the inline play-mode weapon list. Default height is bounded at 148px on small screens / 174px otherwise; the in-place enlarge button is optional. Sources and notes are initially folded. Broken images retain source access and show a concise error, with the zoom control hidden. Photo controls are `type=button` and never submit an equipment editor.

## Verification

- `tests/equipment-labels.cjs`: exact source IDs/asset hashes, independent Meltagun and combi identity, custom/renamed/N23/ammo rejection, actual fighter editor draft, roster popup, play reference, zoom, locale and failed-image fallback; no account writes or catalogue changes.
- Actual Chromium at 375px and 1280px: all 78 mapped entries decode local images; no horizontal overflow; editor/roster/play interactions, locale and enlarge checks; mocked account endpoints, no production data.
- Existing equipment identity/profile and rule-term tests, build and Worker validation remain required.
