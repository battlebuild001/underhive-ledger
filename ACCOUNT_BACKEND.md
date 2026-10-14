# Account and persistent storage integration

`worker/account-api.js` exports `handleApi(request, env, ctx)`. It returns a `Response` for `/api/*` and `null` for other routes so the Worker can serve embedded static assets. The runtime requires a Sites-managed D1 binding named `DB`. Sites dispatch supplies `oai-authenticated-user-id` and `oai-authenticated-user-email`; callers with no user identity get 401. A service access token alone deliberately has no user record access.

The schema is declared in `db/schema.ts`. `drizzle/0000_thick_firelord.sql` and `drizzle/meta/` were generated with Drizzle Kit 0.31.11. Include those source migrations in deployment metadata using the hosting platform's supported D1 workflow; request handlers never create schema. No runtime npm dependencies are required by the account API.

Load `account-parity.css` after the main styles and `account-parity.js` after the existing app scripts. The client adds Account navigation and a header account/notifications button; wraps `save` with debounced server synchronization; augments Data Management with synchronization status; and exposes `window.AccountParity` for campaign integration.

## Data protection and migration

The server stores one document per authenticated user. Updates use the expected revision and return 409 for a competing writer. The browser keeps unsent local records and presents a choice after a conflict. Existing browser records are backed up under the app's `-before-cloud` key before the initial migration. Switching to another signed-in account saves a separate account backup and starts with that account's server data or empty records, rather than migrating the previous account's records.

User search returns only user ID and username. Friend and notification endpoints authorize against the current user. Campaign sharing uses explicit invitations. The owner chooses viewer or editor access; recipients gain snapshot access only after accepting; viewers cannot publish changes. Sharing publishes the campaign and its participating gangs, without unrelated user documents.

## Available routes

- `GET/PATCH /api/account`: own username, contact email, notification preferences and identity display.
- `GET/PUT /api/document`: own manager state and optimistic revision.
- `GET /api/users?q=...`: username search, at most 12 public name results.
- `GET/POST /api/friends`, `PATCH/DELETE /api/friends/:id`: friend requests, incoming accept/decline and removal.
- `GET/PATCH /api/notifications`, `DELETE /api/notifications/:id`: list, read and remove own notifications.
- `GET/POST /api/campaign-shares`: owned/received invitations and create invitation.
- `POST /api/campaign-shares/:id/respond`: accept or decline own invitation.
- `GET/PUT /api/campaigns/:id`: authorized shared campaign snapshot, revision checked publication.
- `GET /api/campaign-shares/:id/members`: owner-only membership management.
- `DELETE /api/campaign-shares/:id/members/:userId`: owner removes recipient or recipient leaves.

The identity provider owns the sign-in email and password. Contact email changes apply to this app's profile only. The password button explains this and opens ChatGPT account security settings. Email notification preferences are persisted, but no email transport is configured; the UI states that email delivery is not connected. Patreon status has no integration. Sites access policy remains owner private, so other users can use invitations only after the Site owner grants them Site access through the platform.

## Verification

`node tests/account-api.mjs` uses a real SQLite schema and exercises authentication, per-user state isolation, revision conflicts, input rejection, friend requests, read/delete authorization, invitation acceptance, and owner/editor/viewer permissions.

`NODE_PATH=<jsdom-node-modules> node tests/account-ui.cjs` joins the browser scripts to the same API in jsdom and verifies existing record migration, username form saving, account-switch isolation and backup, user search, and friend requests.

## Image uploads

An additional Sites-managed R2 binding named `BUCKET` stores image bytes. Migration `drizzle/0001_absurd_echo.sql` adds upload metadata; the original migration and snapshot remain unchanged. `POST /api/uploads` accepts a binary PNG, JPEG or WebP body with the matching Content-Type, checks its signature and enforces a 5 MB limit while reading. Per-user SHA-256 deduplication reuses existing uploads. The response includes a relative `/api/uploads/:id` URL.

`GET/HEAD /api/uploads/:id` requires the image owner or an accepted shared-campaign participant. Shared access additionally requires an exact image URL reference in that campaign's current snapshot and the uploader's membership in that same campaign. An unrelated account cannot grant itself access merely by pasting a foreign image URL into its own campaign. Removing a reference or membership revokes shared reads. Image responses are private, no-store and nosniff.

`AccountParity.upload(file)` returns a persistent image URL. `AccountParity.normalizeImages(object)` walks nested records and replaces supported base64 image URLs, including image sources inside rich HTML. Record synchronization runs it automatically before storing a document. Failed uploads preserve the original inline image, show an error and allow retry. Use direct file uploads for large images to avoid browser localStorage limits. Persistent document and campaign snapshot bodies are limited to 1.8 MB, leaving room below D1's row limit.

`node tests/account-uploads.mjs` verifies validation/size limits, deduplication, private reads, invitation acceptance, removal of image references, foreign URL injection and membership revocation. The account UI integration test also verifies recursive normalization, rich HTML sources, repeat image reuse, direct File uploads and preservation after an upload failure.

The Account form uses the original English labels and switches Username and Email into inline editors with Cancel / Update controls. The email editor clearly distinguishes the stored contact address from the provider-owned sign-in address. The app adds no account icon to the top navigation.
