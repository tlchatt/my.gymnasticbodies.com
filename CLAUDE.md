# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Local Dev Environment (use this — do NOT start a separate dev server)

The dev server is **already running** as a **systemd `--user`** service on port **3014**,
nginx-proxied over HTTPS. Use the `.dev` URL — do **not** run `npm start` yourself: a second process
shares the same build/watch and fights over the port.

- **URL:** https://my.gymnasticbodies.dev
- **Service:** `my-gymnasticbodies-dev.service`  (port 3014)

> **Old CRA (`react-scripts@4.0.3`).** The service is **pinned to Node v16.20.2** because the app
> crashes on Node 22, and it runs `npm start` (not `next dev`) — there is no `.next` dir or
> `next.config`. Restart the service after editing `.env` for changes to take effect.

```bash
systemctl --user is-active my-gymnasticbodies-dev.service   # already up? then just use the URL
systemctl --user status   my-gymnasticbodies-dev.service    # status + recent logs
systemctl --user restart  my-gymnasticbodies-dev.service    # after editing .env
journalctl --user -u my-gymnasticbodies-dev.service -f       # live logs
```

Before starting a dev server, check `systemctl --user is-active my-gymnasticbodies-dev.service`. If
it's up, use the `.dev` URL and only **restart** the service — never start a second copy.

## Commands

```bash
npm run start    # ONLY if my-gymnasticbodies-dev.service is stopped — normally use https://my.gymnasticbodies.dev (see Local Dev Environment above). Proxies to https://api.gymnasticbodies.com
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

**Renewal / paywall flow:** The `LoginNew` thunk calls `GET /api/user/renewalStatus?email=...` after credentials are verified. If `needsRenewal: true` (user's `migration_type` is `active_expired`), the browser is redirected to `https://app.gymnasticbodies.com/renew?email=...` before login is dispatched. On successful re-subscription the user is sent back with an auth token.

**User migration types** (`migration_type` field on the server-side `user` table): `stripe`, `auth_net_subscriber`, `active_current`, `active_expired`, `inactive`.

The renewal redirect in `LoginNew` is live — `needsRenewal: true` redirects to `https://app.gymnasticbodies.com/renew?email=...` before dispatching login.

### API endpoints

Two concurrent base URLs are in use during an ongoing migration:

| Variable | URL | Usage |
|---|---|---|
| `REACT_APP_API` | `https://api.gymnasticbodies.com` | Legacy AWS — auth, schedule, BYO |
| `REACT_APP_API_NEW` | `https://gymnasticbodies-com.vercel.app` | Neon/app.gymnasticbodies.com — new endpoints |

New feature work should target `REACT_APP_API_NEW`. The legacy API remains for schedule, BYO workouts, and token refresh.

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

## Deployment

**Manual deploy (preferred):** `bash claudeTools/deploy.sh` — builds production, syncs to S3, invalidates CloudFront in one shot.

Bitbucket Pipelines → S3 + CloudFront (legacy pipeline, still wired up).

| Branch | S3 bucket | CloudFront |
|---|---|---|
| `master` | `my.react2026` | `E2TAHYRIUSC1ZN` (`my.gymnasticbodies.com`) |
| `Develop` | `my.react-testing` | `E1KQMIVMY2A66G` |
| `Staging` | `my.internal-testing` | `E2NDG89QP09SYX` |

**Important — `my.react2026` bucket:** ACLs are disabled on this bucket (Object Ownership = Bucket owner enforced). Do **not** use `--acl public-read` when syncing — it will fail with `AccessControlListNotSupported`. Public access is granted via bucket policy, not ACLs. The deploy script already handles this correctly.

**`my2026.gymnasticbodies.com`** is a separate subdomain (CloudFront `E19ULFELANCZSE`) also pointing to `my.react2026` — used for internal testing. Not the live site.

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
