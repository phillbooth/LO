# LO Startup Validation

This document describes the proposed **Startup Validation** model for **LO /
Logic Omni**.

LO is a strict, memory-safe, security-first, JSON-native, API-native and
accelerator-aware programming language concept.

Startup validation ensures a LO project is checked before `main()` or a server
entry point can run.

Status: Draft. The v0.1 prototype performs parse, type, target, global and
security checks before simple checked run mode, but the full startup validation
contract described here is not implemented yet.

---

## Core Rule

```text
LO must validate the project before main() runs.
```

This keeps LO security-first and avoids starting an app with missing secrets,
unsafe routes, wrong ports, broken package permissions or invalid config.

---

## Startup Order

Recommended startup order:

```text
1. Read boot.lo
2. Validate project config
3. Validate imports and packages
4. Validate globals, env vars and secrets
5. Validate security policy
6. Validate routes/webhooks
7. Validate memory/vector/json policies
8. Load entry file
9. Run main()
```

`main()` should not run until the app has passed its startup checks.

---

## Example boot.lo

```LO
project "VatApi"

entry "./src/main.lo"

startup {
  validate true
  fail_fast true
  generate_report true
}

globals {
  const APP_NAME: String = "VatApi"
  const VAT_RATE: Decimal = 0.20

  config APP_PORT: Int = env.int("APP_PORT", default: 8080)
  secret API_KEY: SecureString = env.secret("API_KEY")
}

security {
  strict_types true
  null "deny"
  undefined "deny"

  api_methods {
    allow [GET, POST]
    deny [PUT, PATCH, DELETE, CONNECT, TRACE]
  }

  inbound_ports {
    allow [80, 443, 8080]
    deny_all_other true
  }
}
```

---

## Validation Checks

Startup validation should check:

```text
boot.lo is valid
entry file exists
main() exists
required env variables exist
secrets are not empty
global values match declared types
aLOwed ports match server.listen()
API methods match security policy
routes have handlers
webhooks have HMAC/replay/idempotency if required
packages are registered before use
package permissions are valid
JSON body limits are set
memory/cache policies are valid
vector policies are valid
```

---

## Missing Secret Failure

If `boot.lo` says:

```LO
secret API_KEY: SecureString = env.secret("API_KEY")
```

but the runtime environment or `.env` file does not contain `API_KEY`, LO
should fail before `main()`:

```text
Startup validation error:
Missing required secret API_KEY.

Declared:
  boot.lo:12

Suggestion:
  Add API_KEY to the runtime environment or .env file.
```

---

## Route Security Failure

If a route has:

```LO
DELETE "/orders/{id}" {
  handler deleteOrder
}
```

but `boot.lo` only aLOws:

```LO
allow [GET, POST]
```

LO should stop before startup:

```text
Startup validation error:
DELETE /orders/{id} is not aLOwed by security.api_methods.

ALOwed:
  GET, POST

Source:
  src/routes/orders.lo:8
```

---

## Run Mode vs Build Mode

In `LO run` or `LO dev`, startup validation should happen before the app
starts.

```bash
LO run
# validate -> run main()
```

In `LO build`, the same checks should happen at compile/build time.

```bash
LO build
# validate -> compile -> generate reports
```

---

## Startup Report

When configured:

```LO
startup {
  validate true
  fail_fast true
  generate_report true
}
```

LO should be able to write a startup validation report.

Suggested output:

```text
app.startup-report.json
```

The report should include:

```text
project config status
entry file status
main() status
environment variable status
secret presence status without secret values
global registry status
security policy status
route and webhook status
package registry status
memory/vector/json policy status
startup diagnostics
```

Secret values must never appear in the startup report.

---

## Security Rule

Startup validation is part of LO's security model.

```text
Do not run a project with invalid config.
Do not run a project with missing required secrets.
Do not run routes that violate the security policy.
Do not load unapproved packages.
Do not allow memory, JSON or vector policy errors to become runtime surprises.
```

---

## Final Principle

```text
Validate first.
Run second.
Report every startup decision.
Never start with unsafe or incomplete configuration.
```
