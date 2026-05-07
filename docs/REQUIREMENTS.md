# Requirements

## App Summary

Describe the application here.

## Problem

Describe the problem this app solves.

## Users

| User Type | Description |
|---|---|
| User | Standard application user |
| Admin | Manages application data and settings |

## Core Requirements

- [ ] Requirement 1
- [ ] Requirement 2
- [ ] Requirement 3

## User Features

- [ ] Users can...
- [ ] Users can...
- [ ] Users can...

## Admin Features

- [ ] Admins can...
- [ ] Admins can...
- [ ] Admins can...

## Non-Functional Requirements

- The app must be secure.
- The app must validate input.
- The app must handle errors safely.
- The app must not expose secrets.
- The app must be maintainable.
- The app must be documented.

## Workspace Requirements

- The LO language core must live in `packages/lo-core/`.
- The optional LO Secure App Kernel must live in `packages/lo-app-kernel/`.
- The built-in LO HTTP API server must live in `packages/lo-api-server/`.
- Bespoke app source must live in `packages/app/`.
- App documentation must live in `docs/`.
- Language documentation must stay within `packages/lo-core/`.
- Full framework features must stay outside `packages/lo-core/` and
  `packages/lo-app-kernel/`.

## Secure App Kernel Requirements

- The kernel may define typed API boundaries, validation, auth policy,
  rate-limit policy, idempotency, replay protection, jobs and runtime reports.
- The kernel must receive raw requests and pass only typed, validated values to
  LO handlers unless unsafe raw access is explicitly declared.
- The kernel must enforce `boot.lo` security policy at runtime where a runtime
  adapter is present.
- The kernel must support adapter boundaries for HTTP servers, queue backends,
  storage backends and identity providers.
- The kernel must not include CMS features, admin dashboards, page builders,
  mandatory ORM design, mandatory template engines or frontend framework syntax.
- The kernel package must support a non-compiled checked Run Mode smoke test
  for validating simple `.lo` execution during framework development.

## API Server Requirements

- `lo-api-server` must be an HTTP serving package, not a full web framework.
- `lo-api-server` must load route manifests generated from LO API contracts.
- `lo-api-server` must normalise HTTP requests before passing them to
  `lo-app-kernel`.
- `lo-api-server` must enforce server-level limits such as body size, timeout,
  connection shutdown and safe response writing.
- `lo-api-server` must ask `lo-app-kernel` for auth, validation, idempotency and
  typed route execution decisions.
- `lo-api-server` must redact secrets, bearer tokens, cookies and SecureString
  values from logs and reports.
- Bespoke frameworks may either use `lo-api-server` or call `lo-app-kernel`
  directly from their own HTTP layer.

## Out of Scope

- Item 1
- Item 2
- Item 3

## Success Criteria

- [ ] The app meets the core requirements.
- [ ] The app can be tested.
- [ ] The app can be deployed.
- [ ] The app handles errors safely.
