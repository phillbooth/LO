# Webhooks

LO should support secure webhook handling as a first-class API pattern.
LO core defines the webhook contract and reports. The optional LO Secure App
Kernel enforces verification, replay protection, idempotency and typed decode at
runtime when an application uses a kernel-backed adapter.

## Required Defaults

```text
HMAC verification
replay protection
idempotency key support
payload size limits
typed JSON decoding
structured diagnostics
safe logging
secret redaction
```

## Rule

Webhook failures should return explicit errors and should never expose secrets in generated reports.

## Boundary

A `webhook` block is not a general API route group.

It is a secured inbound event boundary for provider callbacks such as payment events, subscription events, repository events or third-party system notifications.

Use `api` for normal request/response product routes.

Use `service` for listener ownership, health routes and mounting APIs or webhooks.

Webhook compiler checks should require:

```text
method
path
handler
payload size limit
signature or explicit development-mode override
replay protection or explicit development-mode override
idempotency key or explicit reason why replayed events are harmless
```

Duplicate webhook events should be handled through replay protection and
idempotency metadata. Detailed duplicate API, webhook duplicate and
idempotency planning lives in
`docs/api-duplicate-detection-and-idempotency.md`.
