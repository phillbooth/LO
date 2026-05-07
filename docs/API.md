# API

## API Serving Model

LO API serving is split across three layers:

```text
LO Core
  defines API contracts, types, diagnostics and generated reports

LO App Kernel
  enforces validation, auth, rate limits, idempotency and typed handler dispatch

lo-api-server
  serves HTTP, loads route manifests and passes normalised requests to the kernel
```

`lo-api-server` is the default built-in HTTP API server package for simple LO API
services. Bespoke frameworks can use it directly, use `lo-app-kernel` directly,
or later use adapter packages such as Express, Fastify, Lambda or Cloudflare
Workers.

## Runtime Flow

```text
HTTP request
  -> lo-api-server
  -> lo-app-kernel
  -> LO runtime / typed LO flow
  -> lo-app-kernel
  -> lo-api-server
  -> HTTP response
```

## Boundaries

`lo-api-server` owns:

```text
HTTP listener
request normalisation
route manifest loading
server-level body limits
server timeouts
safe response writing
health endpoint
safe server logs
runtime report files
graceful shutdown
```

`lo-app-kernel` owns:

```text
route matching policy
typed request decoding
auth and scopes
idempotency
webhook replay protection
rate-limit policy
memory budget policy
effect policy
typed handler execution
audit reports
```

LO Core owns:

```text
language syntax
API contract checks
schema generation
OpenAPI generation
source maps
diagnostics
security report contracts
```

## Non-Goals

`lo-api-server` must not become:

```text
a full web framework
a CMS
an ORM
a template engine
a frontend router
a React/Angular/Vue component system
a middleware marketplace
business logic
payment provider logic
email provider logic
```

Those belong in packages, frameworks or application code.

## First Practical Target

The first version should focus on:

```text
load route manifest
start HTTP server
match method and path
normalise request
pass request to app kernel handler
write typed response
return safe errors
support health endpoint
support body size limit
support request timeout
write simple logs
write basic reports
```
