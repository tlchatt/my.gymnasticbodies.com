# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run start    # Dev server — proxies to https://api.gymnasticbodies.com by default
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

> **Pending:** `src/Store/Action/loginActions.js` has an in-progress change implementing the renewal redirect in `LoginNew` — blocked on a fresh pull from remote.

### API endpoints

Two concurrent base URLs are in use during an ongoing migration:

| Variable | URL | Usage |
|---|---|---|
| `REACT_APP_API` | `https://api.gymnasticbodies.com` | Legacy AWS — auth, schedule, BYO |
| `REACT_APP_API_NEW` | `https://gymnasticbodies-com.vercel.app` | Neon/app.gymnasticbodies.com — new endpoints |

New feature work should target `REACT_APP_API_NEW`. The legacy API remains for schedule, BYO workouts, and token refresh.

### Routing

All authenticated routes are wrapped in an auth guard that redirects to `/` if `login.auth` is false.

Notable routes: `/dashboard`, `/class-finder/:category`, `/history`, `/get-started` (onboarding), `/course-library`, `/thrive-lessons`, `/thrive-tasks`, `/thrive-profile`, `/admin`, `/paymentPortal`.

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
