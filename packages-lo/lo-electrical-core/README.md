# LO Electrical Core

`lo-electrical-core` is a grouped beta package area for electrical
infrastructure modelling, validation, monitoring, maintenance, energy and audit
contracts.

It does not implement certified electrical protection, circuit-breaker logic,
protection relays, PLC safety systems, grid protection or qualified electrical
design.

## First Package Contracts

Start with safe, read-only and audit-focused contracts:

```text
electrical asset models
meter and telemetry ingestion
alerts and reports
capacity checks
energy reports
maintenance schedules
protection setting record management
event audit logs
```

## Proposed Subpackages

Keep these as contracts inside `lo-electrical-core` until the boundaries are
stable:

```text
lo-electrical-assets
lo-electrical-monitoring
lo-electrical-energy
lo-electrical-capacity
lo-electrical-maintenance
lo-electrical-protection-records
lo-electrical-reports
```

OT protocol packages belong in `lo-ot-*`, not inside this package.

## Safety Boundary

Default rule:

```text
read and audit by default
control denied by default
high-risk commands require explicit policy, approval, signed jobs and audit
protection override is denied
```

## Non-Goals

Do not start with:

```text
direct breaker control
relay protection replacement
PLC replacement
safety interlock control
unsupervised switching
real-time grid control
standards compliance claims
```

Electrical package work must remain explicit about qualified engineering review,
local safety systems, certification boundaries and OT cybersecurity.
