# Contracts: Policy

## Purpose

A policy contract defines allowed behavior for routes, flows, packages, data and
runtime adapters.

## Short Definition

Policy contracts describe what may happen and under which authority.

## Security Rules

- Policy must be source-visible.
- Effective policy must be reportable.
- Unknown or conflicting policy must fail closed.
- Policy cannot silently weaken type, effect or response contracts.

## Generated Reports

```text
policy-index-report.json
policy-definition-report.json
policy-effective-report.json
policy-conflict-report.json
```

## v1 Scope

App, route, flow, response and package policy.
