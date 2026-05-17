# Framework: Capabilities

## Purpose

Capabilities describe named authority granted to code, packages, routes or
users.

## Short Definition

A capability is a permission token with scope, reason and report output.

## Examples

```text
users.pii.read
orders.write
network.external
database.write
runtime.metrics
```

## Security Rules

- Capabilities must be explicit.
- Sensitive capabilities require audit-friendly reports.
- Missing capabilities must fail closed.
- Capability inheritance must be visible in effective policy reports.

## Generated Reports

```text
capability-report.json
policy-effective-report.json
security-report.json
```

## v1 Scope

Capability names, route/flow/package links and effective capability reports.
