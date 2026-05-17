# Framework: Policies

## Purpose

Policies declare allowed behavior before runtime work starts.

## Short Definition

A policy is a source-visible rule that controls effects, capabilities, data
exposure, runtime adapters or package authority.

## Policy Areas

```text
app policy
route policy
flow policy
data policy
response policy
package policy
memory policy
runtime policy
```

## Security Rules

- Policy must fail closed when required facts are unknown.
- Effective policy must be reportable.
- Conflicting policy must produce diagnostics.
- Runtime choices must not silently weaken source policy.

## Generated Reports

```text
policy-index-report.json
policy-definition-report.json
policy-effective-report.json
policy-conflict-report.json
```

## v1 Scope

Declare and report core app, route, flow, response and package policy.
