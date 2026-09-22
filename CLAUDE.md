# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Local Dev Environment (start it yourself — it is OFF by default)

**The dev server does NOT start at boot.** As of 2026-08-17 it is stopped and disabled so it costs
nothing while nobody is working on this project. **Start it when you begin, stop it when you're
done.** It's a systemd `--user` service on port **3014**, nginx-proxied over HTTPS.

- **URL:** https://my.gymnasticbodies.dev
- **Service:** `my-gymnasticbodies-dev.service`  (port 3014 — ~0.7 GB sitting idle, ~2 GB once the CRA build is warm)

> **Old CRA (`react-scripts@4.0.3`).** The service is **pinned to Node v16.20.2** because the app
> crashes on Node 22, and it runs `npm start` (not `next dev`) — there is no `.next` dir or
> `next.config`. Restart the service after editing `.env` for changes to take effect. Because it's
> a full CRA webpack build rather than Next's on-demand compile, **first start takes ~30–60s**
> before the site answers.

```bash
systemctl --user start     my-gymnasticbodies-dev.service   # begin working here
systemctl --user stop      my-gymnasticbodies-dev.service   # done — frees the RAM
systemctl --user restart   my-gymnasticbodies-dev.service   # after editing .env
systemctl --user is-active my-gymnasticbodies-dev.service   # is it up?
journalctl --user -u my-gymnasticbodies-dev.service -f      # live logs
```

**Still do not run `npm start` yourself — start the service instead.** It carries the Node v16 pin
and the `PORT`/`BROWSER`/`DANGEROUSLY_DISABLE_HOST_CHECK` env the `.dev` proxy needs; a hand-run
copy has none of that and will fight over port 3014. If the service is already active, use the
`.dev` URL and only **restart** it; never start a second copy.

To put it back to starting at boot: `systemctl --user enable --now my-gymnasticbodies-dev.service`
(`disable --now` to undo). Every dev env can also be driven from the buttons at
https://claude.tlchatt.com/dev-environments.

## Commands

```bash
npm run start    # last resort only — prefer `systemctl --user start my-gymnasticbodies-dev.service` then https://my.gymnasticbodies.dev (see Local Dev Environment above). Run by hand it loses the Node v16 pin and the proxy env. Proxies to https://api.gymnasticbodies.com
npm run build    # Production build (CRA)
npm run test     # Jest (CRA defaults, no custom config)
```

Single test: `npm run test -- --testPathPattern=<filename>` or `npm run test -- --watch`.

## Architecture

React 17 CRA single-page app. Redux + redux-thunk for all async state. Material-UI v4 throughout.

### Directory layout

| Path | Purpose |
|---|---|
| `src/Store/Action/` | All async thunks and action creators |
| `src/Store/Reducers/` | Redux reducers |
| `src/Store/util.js` | `updateObject`, `getCurrentWeek`, `AxiosConfig` |
| `src/Containers/` | Page-level components (routed) |
| `src/Components/` | Reusable UI components |
| `src/data/` | Large static JS workout data files (1–6 MB each) |
| `src/HOC/firebase.js` | Firebase Realtime DB init (maintenance/refresh signals only) |

### Redux store shape

```
{
  login:        { auth, webToken, firstName, lastName, UserId, timezone,
                  userLevel, levelId, isFreeMember, isAllAccessUser,
                  isThriveUser, isAdmin, integratedPlans }
  calendar:     { schedule, toasts, success/fail flags }
  classes:      { all available classes }
  data:         { allData }
  subClasses:   { }
  legacyCourse: { }
  demoModal:    { }
  freeMember:   { }
  levels:       { user progression }
  buildYourOwn: { BYO workout state }
  OhNo:         { error modal state }
  OpenDrawer:   { drawer visibility }
}
```

### Authentication

Login POSTs to `/api/authentication` (new) or `/auth` (legacy). Response contains `jwtAuthorizationToken` + `jwtRefreshToken`, both stored in `localStorage` with expiration timestamps. `checkAuthTimeout` schedules auto-logout. Token is decoded via `jsonwebtoken` to extract user info.

`AxiosConfig` (in `util.js`) builds the `Authorization: Bearer <token>` header — always use this for authenticated requests rather than building headers manually.

**Two auth rails.** `Login` POSTs to AWS `/auth` FIRST; its `.catch` falls through to
`LoginNew`, which POSTs to Neon `/api/authentication`. So AWS is still the primary
authenticator and Neon is the fallback — inverting that order is the single change that
makes the AWS shutoff safe. `postAWS` records which rail won: `false` = legacy (AWS),
`true` = Neon. On reload, `authCheckState` rebuilds the session from `localStorage`;
for the legacy rail it recovers the AWS integer id by `jwt.decode`-ing the stored token
(`cid`), because `localStorage.userId` may hold the Neon UUID.

**Renewal / paywall flow:** The `LoginNew` thunk calls `GET /api/user/renewalStatus?email=...` after credentials are verified. If `needsRenewal: true`, the browser is redirected to `https://app.gymnasticbodies.com/renew?email=...` before login is dispatched. On successful re-subscription the user is sent back with an auth token.

**User classification** (server-side `user` table): `migration_type` is binary —
`current` / `noncurrent` — and drives the paywall. Granularity lives in a separate
`customer_segment` column (`stripe`, `auth_net`, `subscriber`, `purchased`, `lapsed`,
`inactive`). The older five-value `migration_type` scheme (`active_current`,
`active_expired`, …) was replaced in June 2026 and no longer exists.

### Browser testing as a specific user

Testing member screens requires a live session on a specific rail. Use
`claudeTools/testSession.js` — it builds the `localStorage` state `authCheckState`
rehydrates from, so any test account can be assumed instantly and repeatably.

```bash
node claudeTools/testSession.js --list                            # test accounts + rails
node claudeTools/testSession.js --email=lukesearra@icloud.com     # prints a JS snippet
node claudeTools/testSession.js --email=gwtest@tlchatt.com --rail=neon
```

Run the printed snippet in the browser console on `https://my.gymnasticbodies.com` (or
via the Chrome javascript tool), then reload. The sidebar should greet that user.

It handles **no passwords** — everything is derived from Neon plus a locally-built JWT.
`authCheckState` calls `jwt.decode()`, which base64-decodes without verifying a
signature, so a local token is enough to make the app behave as that user.

**Limitation, and it is a useful one:** the token is not signed by AWS, so anything AWS
still authenticates will 401. Every screen migrated to Neon works, because those routes
ignore the bearer token by design. **A 401 from `api.gymnasticbodies.com` under a test
session therefore means that screen has not been migrated yet — treat it as a finding,
not a broken tool.**

Always test a change on **both rails** — legacy and neon — since the entire point of the
cutover is that they converge on one code path.

| account | rail | segment | notes |
|---|---|---|---|
| `lukesearra@icloud.com` | **legacy** (awsId 411847) | subscriber | the only legacy-rail account; 225 workout logs, real Guided Plans + BYO + Thrive history |
| `gwtest@tlchatt.com` | neon | stripe | all-access Neon user, light data |
| `test-acct-history@…` | neon | subscriber | seeded support emails + 24 workout logs |
| `test-acct-subscriber@…` | neon | subscriber | manual grant — no cancel, no renew |
| `test-acct-stripe@…` | neon | inactive | Stripe sub added per test run |
| `test-acct-trial@…` | neon | inactive | trial sub added per test run |
| `test-acct-authnet@…` | neon | auth_net | must NOT show the Stripe cancel button |
| `test-acct-lapsed@…` | neon | inactive | paywall / renew path |
| `test-acct-purchased@…` | neon | inactive | renew path, no price history |

Passwords for the `test-acct-*` accounts are in `app.gymnasticbodies.com/CLAUDE.md`;
canonical account credentials are in `claudePlans/test-users.json`. `testSession.js`
needs neither.

### API endpoints

Two concurrent base URLs are in use during an ongoing migration:

| Variable | URL | Usage |
|---|---|---|
| `REACT_APP_API` | `https://api.gymnasticbodies.com` | Legacy AWS — auth, schedule, BYO |
| `REACT_APP_API_NEW` | `https://gymnasticbodies-com.vercel.app` | Neon/app.gymnasticbodies.com — new endpoints |

New feature work should target `REACT_APP_API_NEW`.

> **Workout features migrated to Neon (2026-07 — `sessions/OffAWSWorkoutMigration.md`).**
> White Board (AutoPilot), Build Your Own (+ program curriculum), Workout History, and
> Thrive now call **Neon** routes at `${REACT_APP_API_NEW}/api/user/workout/*` for ALL
> users (was AWS `/auto-pilot`, `/byo`, `/workout-history`, `/thrive`). Storage:
> per-day JSON docs in `user_logs` (new `section` column) + `user_setting` typed rows +
> static catalogs in `app.gymnasticbodies.com/data/workout/*.json`. **Guided Plans**
> (`/myschedule/*`) is split: **legacy users (`state.login.awsUserId` set) stay on AWS**;
> **non-legacy users use Neon** (`/api/user/workout/levels` + `/byo/program`). The AWS
> legacy API still serves **auth (`/auth`, delegated to Keap), token refresh**, and the
> **schedule-editing / Beginner(level-0)** guided-plan edge features (not yet migrated).
> Only 1 test user (luke) is seeded — the full ~16k-user seed awaits a Keap email→userId map.

### Routing

`App.js` has two authenticated route trees — **you must add new routes to both or they won't work for all users:**

| Condition | Route tree | Component |
|---|---|---|
| `showAllAccessSite && isAuth` | Route 2 | `<NewMemberSite>` — has its own inner `<Switch>` |
| `isAuth` (regular) | Route 3 | Full flat route list with Header + Footer |

`NewMemberSite` (`src/Containers/NewMemberSite/index.jsx`) renders its own `<Switch>` internally. Routes defined only in Route 3 will 404→redirect to `/` for all-access users. Add new routes to `NewMemberSite`'s inner Switch **and** to Route 3 in `App.js`.

Notable routes (both trees): `/course-library`, `/class-finder`, `/class-finder/:category`, `/my-courses`, `/eqiupment-list`, `/information`, `/advocates`.

### Static workout data

`src/data/` holds large pre-built JS objects (not API-fetched). `AllDataForWorkout.js` (1.5 MB) and `programCoreData.js` (1.6 MB) are the primary sources. These are imported directly and hydrated into the Redux `data` slice.

### Firebase usage

Firebase Realtime DB is used exclusively for maintenance-mode flags and force-refresh signals. It is **not** used for auth or user data storage in this app (auth is JWT-based).

## Deployment — MOVED OFF AWS TO VERCEL (2026-09-22)

**`my.` is now hosted on Vercel**, project `my-gymnasticbodies` (team `technologicdigitalservices`).
It is served as a **pre-built static bundle**. The Vercel project is **NOT git-linked** — a push does
NOT auto-deploy; deploys are a manual CLI step.

**Deploy:**
```bash
export NVM_DIR="$HOME/.config/nvm"; . "$NVM_DIR/nvm.sh"; nvm use 16   # Node 16 — Node 22 breaks the CRA build
yarn build                                                          # produces build/
cd build && npx vercel deploy --prod --yes --scope technologicdigitalservices
```
The `build/` dir has a `vercel.json` (`{routes:[{handle:filesystem},{src:/.*,dest:/index.html}]}`) for
SPA-fallback routing. Since the bundle is pre-built and uploaded, a host/string change can also be
patched directly in `build/static/js/*.js` and redeployed without a full rebuild.

- **DNS:** `my.gymnasticbodies.com` CNAME → `cname.vercel-dns.com` (Vercel-managed `gymnasticbodies.com` zone).
- **Images:** served from **Vercel Blob** `https://6z1gtynqfxcjjwix.public.blob.vercel-storage.com/`,
  mirrored 1:1 from the old `gymfit-images` S3 bucket (identical paths). The image base-URL was swapped
  from `gymfit-images.s3.amazonaws.com` → the Blob host across source + bundle. Videos already on Blob.
- **Why:** AWS account `390008123206` was **suspended** (billing / `AllAccessDisabled`) on 2026-09-21,
  taking down CloudFront + S3 + `api.` at once. `my.` was migrated fully off AWS so it survives a future
  AWS suspension. Data/auth already run on Neon (`app.gymnasticbodies.com`).

**SUPERSEDED — do NOT use:** `bash claudeTools/deploy.sh` (S3 sync + CloudFront invalidate) and the
Bitbucket Pipelines path. Legacy AWS targets, kept only for reference / rollback:

| Branch | S3 bucket (legacy) | CloudFront (legacy) |
|---|---|---|
| `master` | `my.react2026` | `E2TAHYRIUSC1ZN` |
| `Develop` | `my.react-testing` | `E1KQMIVMY2A66G` |
| `Staging` | `my.internal-testing` | `E2NDG89QP09SYX` |

## Environment variables

```
REACT_APP_API              # Legacy AWS API base URL
REACT_APP_API_NEW          # Neon/app.gymnasticbodies.com API (https://gymnasticbodies-com.vercel.app)
REACT_APP_IS_PRODUCTION    # Enables Sentry, disables Redux DevTools
REACT_APP_TESTING          # Enables LogRocket
```

## Legacy AWS infrastructure

The legacy API (`api.gymnasticbodies.com`) is a **Spring Boot microservices** architecture (Eureka service registry) running behind an AWS ALB. There is no API Gateway — routes are not discoverable via `aws apigateway`.

**Load balancers (us-east-1):**
- Prod: `gymfit-membersite-prod-env-lb`
- Test: `gymfit-membersite-test-env-lb`

### MySQL RDS (source of truth for legacy users)

**Instance:** `gymfit-membersite-prod-db.cjcrilkibupc.us-east-1.rds.amazonaws.com:3306`  
Publicly accessible but restricted by security group `sg-04f6e2469d03448a5` — only allows VPC-internal service SGs by default. To connect from a dev machine, temporarily add your IP via:
```bash
aws ec2 authorize-security-group-ingress --group-id sg-04f6e2469d03448a5 --protocol tcp --port 3306 --cidr <YOUR_IP>/32
# ... run queries ...
aws ec2 revoke-security-group-ingress --group-id sg-04f6e2469d03448a5 --security-group-rule-ids <rule-id>
```

**Credentials** — stored in AWS SSM Parameter Store:
```
/prod/gymfit-memsite/RDS_HOSTNAME
/prod/gymfit-memsite/RDS_USERNAME
/prod/gymfit-memsite/RDS_PASSWORD
/prod/gymfit-memsite/RDS_PORT
```
Fetch with: `aws ssm get-parameters --names "/prod/gymfit-memsite/RDS_PASSWORD" ...`

**Key databases and tables:**

| Database | Key table(s) | Notes |
|---|---|---|
| `authorization_service` | `users_preferences` (userId, timezone) | 61,016 rows — closest to total registered user count |
| `myschedule_service_db` | `users_class_schedule`, `users_workout_level` | 36,772 / 30,678 unique users |
| `class_log_service_db` | `users_class_history` (userId, wppostId, date) | 10,309 unique users who logged a class |
| `level_service` | `users_workout_level` (userId, level, planId) | 14,884 users |
| `autopilot_service` | `users_auto_pilot_level` | 1,030 BYO users |
| `token_management_service_db` | `token_management` | Auth tokens only — no usernames |

Each microservice has its own database. DB names per service are in SSM under `/prod/gymfit-memsite/<service>/RDS_DB_NAME`.

**User count findings (as of 2026-05-19):**

| Segment | Count | Notes |
|---|---|---|
| Total registered | 61,016 | `authorization_service.users_preferences` |
| Any activity (scheduled / leveled / logged) | 46,083 | Cross-DB union — proxy for paid/all-access users |
| No activity at all | 14,933 | Proxy for `isFreeMember` users — never scheduled, no level set, no class logged |

**Important:** `isFreeMember` / `isAllAccessUser` flags are **not stored in MySQL**. They come from **Infusionsoft/Keap** tag IDs returned by the `/welcome/v1/users` API endpoint. Infusionsoft credentials are in SSM: `/prod/gymfit-memsite/CLIENT_ID_INFUSION_SOFT_ENV` and `CLIENT_SECRET_INFUSION_SOFT_ENV`.

**Neon gap:** Free members (`isFreeMember` path in `Login`) are never synced to Neon — the `POST /api/user/subscription` call is skipped for that branch. Approximately 14,933 users exist in AWS but not in Neon.

## Media Architecture

### Course Library video pipeline

`/course-library` (`src/Containers/CourseLibrary/index.jsx`):

1. User clicks a sub-course → `handleThirdRowClick` calls:
   `GET https://api.gymnasticbodies.com/workout-service/course-library/users/{userId}/?workoutName={nameId}`
2. AWS returns exercise progression data. If it fails (or the course doesn't exist in the legacy system), the `.catch()` block serves **inline hardcoded fallback data** — the entire course library content is embedded directly in `index.jsx` (that's why the file is ~38,000 lines). If the call unexpectedly *succeeds* with a `nameId` that collides with a real AWS-registered one belonging to a different course, the `.then()` branch renders that wrong course's live data instead — this is exactly what happened with Rings/Movement (see below); always give new/placeholder sub-courses a `nameId` guaranteed not to collide with a real one.
3. Exercises render via `ProgressionRows` (complex nested, multi-key format) or `PlaylistRow` (flat, single-key format) — `allProgs.map()` picks via `prog.videoName ? <PlaylistRow> : <ProgressionRows>`. If a course's fallback resolves to exactly one third-row group, `handleThirdRowClick`'s success branch skips the redundant group card and populates the flat list directly.
4. Clicking a video calls `openVideoModal(videoName)`. **As of 2026-07-02, `CourseLibraryPlayer` plays video via a native `<video>` element sourced directly from Vercel Blob — it no longer uses JW Platform/`ReactJWPlayer` at all.** `videoName` comes in one of two formats depending on when the fallback data was written: new courses use a plain media ID (`"3bac3y3F"`); older/legacy exercise data uses `"{mediaId}.json?exp=...&sig=..."` (a JW-specific signed-feed reference). `CourseLibraryPlayer` strips everything after the first `.`/`?` (`videoName.split(/[.?]/)[0]`) to get the real media ID, then builds `${BLOB}/${mediaId}.mp4`.

**Why JW was dropped for this player:** the JW signed URL (`playerScript`) that gates `content.jwplatform.com/feeds/{id}` comes from Redux `state.login.signedUrl`, which is set once at login. Two compounding bugs made it unusable: (1) `LoginNew` in `loginActions.js` ships a hardcoded mock `playerScript` with a permanently-expired signature (as of this writing, expired since Dec 15 2025) instead of ever fetching a real one; (2) even the legitimate `/welcome/v1/users` endpoint, when it *is* called, issues a token with only a ~3.5 second TTL — nowhere near enough time for a user to log in, navigate, and click play. There's an existing self-heal pattern elsewhere (`VideoPlayer`'s `onSetupError` → `getNewSignedUrl()`), but it doesn't actually work either: `react-jw-player`'s `shouldComponentUpdate` only reacts to `file`/`playlist` prop changes, never `playerScript`, and `componentDidMount` skips reinstalling the JW script tag once `window.jwplayer` exists globally on the page — so no client-side retry/remount can recover from an expired signed URL without a full page reload. Given JW billing is lapsing, the decision was to bypass JW for course-library rather than fix the login flow (which is shared by every page, not just this one). **`VideoPlayer` (MyCourses/BuildYourOwn/Guided Plans) and `CoursePreivewData` still use JW/`ReactJWPlayer` as of this writing** — not yet migrated.

**New courses** (Restore, Fundamentals, Elements, Foundation Intro) always return 400 on the legacy AWS API — their `nameId` values don't exist in the AWS workout-service. The `.catch()` block always fires for them, serving inline fallback data added to the catch block in `index.jsx`. All 30 of their sub-courses' video IDs have been verified byte-for-byte against the real JW playlist export (`app.gymnasticbodies.com/data/playlist/eachPlaylistData.json`) — zero mismatches.

**Rings/Movement content gap (known, not fixed):** Rings' 5 sub-courses and Movement's 9 were added by a human developer in Jan 2026 (commits `9aef691`, `d05d6fd`) with Stretch's real exercise data (video IDs, descriptions, everything) copy-pasted in as placeholder content — not a routing bug, the `nameId`s now correctly avoid AWS collisions (see below) and correctly reach the fallback, but the fallback content itself is still Stretch's. No real Ring/Movement footage exists in the local JW playlist exports (`app.gymnasticbodies.com/data/playlist/`, searched all 214 playlists, zero matches). Needs either real footage sourced from JW's dashboard directly, or new content produced.

**nameId collisions:** Rings' and Movement's `nameId` values used to be `SMS`/`SFS`/`STB` — the *real*, AWS-registered nameIds belonging to the Stretch course — so the AWS API call would unexpectedly succeed and render genuine Stretch data instead of falling to the catch block. Reassigned to `Movement-1..9`/`Rings-1..5` (2026-07-02) so the API reliably 400s and the (still placeholder) fallback data renders instead.

**Fallback data format:** Each new course sets `responseData` as `{ "Course Name": [{ name, videoName }, ...] }` — one key per sub-course containing its full flat video list. Existing courses use `ProgressionRows` (complex nested, multi-key format, one key per exercise group).

**UserId note:** All-access users (Neon auth path) have a UUID as their Redux `UserId`, not the legacy integer AWS userId. The course-library API rejects the UUID with a 400, so the catch fires for ALL courses for these users — inline fallback data is always used. This is fine; the UX is identical. (One test account, `yeldaour@gmail.com`, hit an unexplained "grid of 30 blank numbered cards" on a course-library third-row click during testing — account-specific, not reproducible with `lukesearra@icloud.com`, never root-caused.)

**Axios interceptor:** `src/Components/UtilComponents/Interceptor/index.jsx` intercepts axios responses. For 401 it refreshes the token; for 403 on specific URLs it checks session status. For all other errors it now calls `reject(err)` so the `.catch()` in calling code fires normally. Without this, any non-401/403 error silently hung (the Promise never settled).

### Video data sources

All of these live in the **`app.gymnasticbodies.com`** repo (`../app.gymnasticbodies.com/data/`), not this one.

| Source | Location | Purpose |
|---|---|---|
| `mediaData.json` / `mediaDataBackup.json` | `app.gymnasticbodies.com/data/` | **The authoritative flat catalog.** 60 pages `[{media[], page, total}]`; each media item `{ id, duration, metadata:{title, description, tags} }`. **2,923 unique IDs, 100% have a `metadata.title` and a `duration`.** Use this to reconstruct a title/duration for ANY mediaId. (The two files are byte-identical.) |
| `eachPlaylistData.json` | `app.gymnasticbodies.com/data/playlist/` | Full playlist metadata: per-video titles, thumbnail URLs, multi-quality MP4 sources. Structure: `[{ "outerKey": { "feedid": "playlistId", "playlist": [{mediaid, title, image}] } }]` — search by `feedid` value, not outer key. |
| `allPlaylist.json` | `app.gymnasticbodies.com/data/playlist/` | Playlist titles and ordering |
| `map.json` | `app.gymnasticbodies.com/data/playlist/` | Nested `[{ libraryId: { playlistContainerId: [orderedMediaIds] } }]` — first mediaId in each list is the primary "Follow Along" video. The one-lookup fix for the playlist-ID-as-video-ID bug class. |
| `howTosJwPlayer.json` | `app.gymnasticbodies.com/data/` | How-To video catalog: `{ title, mediaid, image }` per item (e.g. "Build Your Own" → `3o98KK3H`). Source of How-To titles. |
| `whiteboardCategoryJwPlayer.json` | `app.gymnasticbodies.com/data/` | White Board / AutoPilot exercise catalog: `{ category, exerciseName, autoPilotExerciseId, repsOrSecs, rounds, exerciseFocusPoints:[{description,descOrder}], videos:[{mediaId, version}] }`. Source of White Board exercise names + focus-point **descriptions**. (Reference snapshot — the app fetches this live from AWS `autopilot_service` at runtime; not imported in `my.` src.) |
| `mediaData_Thrive.json` (+ other `mediaData_*.json`) | `app.gymnasticbodies.com/data/` | Segment-scoped flat catalogs (Thrive, Lessons, Marketing, OnlineClasses, GB_Pro+, etc.) — same shape as `mediaData.json`. |
| `*_mediaUrls.json` | `app.gymnasticbodies.com/data/` | Per-course cached `videoUrl` (CloudFront `videos-cloudfront.jwpsrv.com`) + `imageUrl` (`assets-jpcust.jwpsrv.com/thumbnails/...`). Note: `done: 'True'` fields are stale — actual blob status must be verified via API. |

### Text content (titles / descriptions) — fully local, ZERO JW runtime dependency

Dropping JW loses **no** text. JW feeds were only ever used at runtime for the video **sources (mp4)** and the **thumbnail image** — both now in Blob (`{id}.mp4`, `{id}.jpeg`). Titles/descriptions/focus-points/instructions all come from local data or the (separate) AWS API, never from a JW runtime call. Confirmed: JW's own `metadata.description` is populated for only **9 of 2,923** media items — descriptions never lived in JW.

Reconstruction map (mediaId → text), all sourced locally + Blob:

| Feature / player | Title source | Description / focus-points / instructions source |
|---|---|---|
| **Course Library** (`CourseLibraryPlayer`) | inline `{ name, videoName }` literals in `src/Containers/CourseLibrary/index.jsx` + `data.js` | inline literals in the same files (hardcoded) |
| **AutoPilot / Levels / Beginner / BYO** (`VideoPlayer`) | player shows no title overlay; exercise `name` is inline in `src/data/AllDataForWorkout.js` / `programCoreData.js` / `Foundation*.js` | `description`, `focusPoints`, `instructions`, `equipment` are **inline** in those same data files (`AllDataForWorkout.js`: 486 `name`, 528 `description`, 648 `instructions`, 324 `focusPoints`, 324 `equipment`) |
| **Legacy / Foundation / My Courses** (`LegacyWorkoutModal`) | `playerData.videoTitle` from AWS progression API (`GetUserPorgressions`) at runtime — also snapshotted in the local data files above | `focusPoints`, `instructions`, `technicalTips`, `equipment` from the same AWS API / local snapshot |
| **White Board** | `whiteboardCategoryJwPlayer.json` `exerciseName` (+ live AWS `autopilot_service`) | `whiteboardCategoryJwPlayer.json` `exerciseFocusPoints[].description` |
| **How-To** | `howTosJwPlayer.json` `title` | n/a (short clips) |
| **Any mediaId, flat fallback** | `mediaData.json` `metadata.title` (2,923 IDs, 100% titled) + `duration` | `mediaData.json` `metadata.description` — present for only 9 IDs, effectively n/a |

**Practical rule:** to rebuild a video's card/modal from scratch given only a mediaId: video = `{BLOB}/{id}.mp4`, thumbnail = `{BLOB}/{id}.jpeg`, title+duration = `mediaData.json`, and any rich exercise text (name/description/focus-points/instructions) = the inline `src/data/*.js` workout files or `whiteboardCategoryJwPlayer.json`. `CategoryCard`'s runtime JW duration fetch is the only place that still pulls text-ish data from JW live — the Blob migration replaces it by reading `duration` from `mediaData.json`.

### Sub-course card images

Sub-course card `imgUrl` in `data.js` uses **Vercel Blob JPEG thumbnails**: `https://6z1gtynqfxcjjwix.public.blob.vercel-storage.com/{mediaId}.jpeg`. `CourseCard/index.jsx` has a guard: if `imgUrl.startsWith('http')`, use it directly; otherwise prepend the S3 base.

Top-level course card images (`imgUrl` on the `mainCourses` entries) remain S3 PNGs (`https://gymfit-images.s3.amazonaws.com/CourseLibraryImages/`).

### Blob storage — live for course-library, not yet migrated elsewhere

All course videos are in Vercel Blob at `https://6z1gtynqfxcjjwix.public.blob.vercel-storage.com/` (public, unauthenticated):

| Pattern | Example |
|---|---|
| `{mediaId}.mp4` | `3bac3y3F.mp4` |
| `{mediaId}.jpeg` | `3bac3y3F.jpeg` |
| `{mediaId}.vtt` | captions (some) |

**Coverage confirmed 2026-07-03, whole-app scope: 1,010/1,010.** Every unique video ID referenced anywhere in `my.gymnasticbodies.com` (course-library + Foundation/Levels data files + BYO/Thrive/etc.) resolves correctly in Blob — not just course-library. Full audit, methodology, and the "are we ready to drop JW" verdict: `claudePlans/media-jw-blob-audit.md`.

That audit found and fixed **3 instances** of the same bug class: a JW *playlist container* ID mistakenly used as if it were a video's own media ID (`KWnhXawG`→`2yO4CxF4` "Thoracic Bridge", `aH1k32u9`→`UwSbT4bF` "Front Split", `JatJjiFp`→`zhgu6OPL` "Middle Split" — the last one was byte-identical in Blob so not actually broken, but standardized anyway). Confirmed via exhaustive check against all 213 known JW playlist IDs that no further instances remain. **`playlist/map.json`** (in `app.gymnasticbodies.com/data/`) is the fastest way to catch/fix this bug class if it recurs — it maps each playlist container ID to its real ordered media IDs, first entry always being the "Follow Along"/primary video.

**Important gotcha discovered in the same audit:** `app.gymnasticbodies.com/data/Media/allMedia.json` is **not** a complete media catalog despite its name — it's playlist-scoped (same shape as `eachPlaylistData.json`) and misses anything never added to a JW playlist. `mediaData.json`/`mediaDataBackup.json` (identical to each other) are the real flat, complete-ish exports — use those for "does this video exist" checks, not `allMedia.json`.

**Course-library (`CourseLibraryPlayer`) is fully migrated off JW** — see "Course Library video pipeline" above. **`VideoPlayer` (MyCourses/BuildYourOwn/Guided Plans) and `CoursePreivewData` are not** — they still use `ReactJWPlayer` and the same broken login-flow signed-URL mechanism. The `/api/mediaBlob` endpoint already exists in `app.gymnasticbodies.com` if a `POST`-based lookup is ever needed instead of constructing the Blob URL directly by mediaId.
