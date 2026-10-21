# Account and persistent storage integration

`worker/account-api.js` exports `handleApi(request, env, ctx)`. It returns a `Response` for `/api/*` and `null` for other routes so the Worker can serve embedded static assets. The runtime requires a Sites-managed D1 binding named `DB`. `worker/local-auth.js` handles ID/password authentication; trusted Sites dispatch identities remain an optional sign-in method. Callers with no valid user identity get 401. A service access token alone deliberately has no user record access.

The schema is declared in `db/schema.ts`. `drizzle/0000_thick_firelord.sql` and `drizzle/meta/` were generated with Drizzle Kit 0.31.11. Include those source migrations in deployment metadata using the hosting platform's supported D1 workflow; request handlers never create schema. No runtime npm dependencies are required by the account API.

Load `account-parity.css` after the main styles and `account-parity.js` after the existing app scripts. The client adds Account navigation and a header account/notifications button; wraps `save` with debounced server synchronization; augments Data Management with synchronization status; and exposes `window.AccountParity` for campaign integration.

## Data protection and migration

The server stores one document per authenticated user. Updates use the expected revision and return 409 for a competing writer. The browser keeps unsent local records and presents a choice after a conflict. Existing browser records are backed up under the app's `-before-cloud` key before the initial migration. Switching to another signed-in account saves a separate account backup and starts with that account's server data or empty records, rather than migrating the previous account's records.

User search returns only user ID and username. Friend and notification endpoints authorize against the current user. Campaign sharing uses explicit invitations. The owner chooses viewer or editor access; recipients gain snapshot access only after accepting; viewers cannot publish changes. Sharing publishes the campaign and its participating gangs, without unrelated user documents.

## Available routes

- `POST /api/auth/register`: create an account using only `loginId` and `password`.
- `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/session`: establish, revoke and inspect the server session.
- `POST /api/auth/change-password`: verify `currentPassword`, set `newPassword` and revoke previous sessions.
- `POST /api/auth/credentials`: an authenticated ChatGPT user explicitly adds ID/password login to the same existing profile, preserving ownership and records.
- `POST /api/auth/use-chatgpt`: clear local sign-in preference before explicitly choosing the optional ChatGPT provider.
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

Registration requires a unique 3–32 character login ID and an 8–128 character password, without email or external identity. Login IDs are normalized with NFKC and case-insensitive matching; changing the profile display name does not change the login ID. Passwords are salted PBKDF2-HMAC-SHA256 hashes with 100,000 iterations, the Cloudflare WebCrypto supported limit. Session tokens are random, stored only as SHA-256 hashes in D1, and sent in Secure, HttpOnly, SameSite=Lax host cookies. Sessions expire after 30 days. No passwords or bearer tokens are saved in browser storage. Authentication mutations require same-origin JSON requests; persistent atomic rate counters constrain IP and account attempts.

Local identity takes precedence over an optional dispatched ChatGPT identity for all private APIs, uploaded image reads and the caller's public invite application state. An invalid/expired local session or an explicit local-mode preference prevents automatic fallback into another provider's account. Logout revokes the session and keeps that preference. Explicit provider selection clears it. Credentials are never automatically linked through a matching display name or email. Existing ChatGPT users may add a unique login ID from their authenticated account screen; their profile ID, original identity metadata, gangs and campaigns stay intact.

Private client calls capture the expected profile ID in `X-UK-Account-ID`. A mismatch with the current cookie identity returns 409 with `accountChanged: true`; password-authenticated mutations require this header. This prevents an old tab from writing its previous account's document or profile into a newly signed-in account. The client reconnects without migrating the previous account's cache, and late responses are guarded by session generation and profile ID.

Contact email is optional and independent of sign-in. Email notification preferences are persisted, but no email transport or email-based password recovery is configured. The site remains public, allowing external visitors to sign up and apply through a recruitment link. Campaign access still requires the organizer's approval.

## Verification

`node tests/account-api.mjs` uses a real SQLite schema and exercises authentication, per-user state isolation, revision conflicts, input rejection, friend requests, read/delete authorization, invitation acceptance, and owner/editor/viewer permissions.

`node tests/local-auth.mjs` covers password authentication and session security. `node tests/local-auth-flow.mjs` exercises real cookie identities through document storage, legacy account linking, public recruitment, approval and private images. `node tests/local-auth-ui.cjs` verifies the ID/password forms and account switching. `npm run validate` also executes ID/password registration against the compiled deployment Worker and all generated migrations.

`NODE_PATH=<jsdom-node-modules> node tests/account-ui.cjs` joins the browser scripts to the same API in jsdom and verifies existing record migration, username form saving, account-switch isolation and backup, user search, and friend requests.

## Image uploads

An additional Sites-managed R2 binding named `BUCKET` stores image bytes. Migration `drizzle/0001_absurd_echo.sql` adds upload metadata; the original migration and snapshot remain unchanged. `POST /api/uploads` accepts a binary PNG, JPEG or WebP body with the matching Content-Type, checks its signature and enforces a 5 MB limit while reading. Per-user SHA-256 deduplication reuses existing uploads. The response includes a relative `/api/uploads/:id` URL.

`GET/HEAD /api/uploads/:id` requires the image owner or an accepted shared-campaign participant. Shared access additionally requires an exact image URL reference in that campaign's current snapshot and the uploader's membership in that same campaign. An unrelated account cannot grant itself access merely by pasting a foreign image URL into its own campaign. Removing a reference or membership revokes shared reads. Image responses are private, no-store and nosniff.

`AccountParity.upload(file)` returns a persistent image URL. `AccountParity.normalizeImages(object)` walks nested records and replaces supported base64 image URLs, including image sources inside rich HTML. Record synchronization runs it automatically before storing a document. Failed uploads preserve the original inline image, show an error and allow retry. Use direct file uploads for large images to avoid browser localStorage limits. Persistent document and campaign snapshot bodies are limited to 1.8 MB, leaving room below D1's row limit.

`node tests/account-uploads.mjs` verifies validation/size limits, deduplication, private reads, invitation acceptance, removal of image references, foreign URL injection and membership revocation. The account UI integration test also verifies recursive normalization, rich HTML sources, repeat image reuse, direct File uploads and preservation after an upload failure.

The Account form uses the original English labels and switches Username and Email into inline editors with Cancel / Update controls. The email editor clearly distinguishes the stored contact address from the provider-owned sign-in address. The app adds no account icon to the top navigation.
