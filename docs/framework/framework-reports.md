# Framework: Reports

## Purpose

Reports provide machine-readable proof of checked LogicN behavior.

## Short Definition

A report is generated evidence about contracts, policies, models, effects,
security, memory, routes, packages or runtime setup.

## Why It Exists

Reports make LogicN understandable to developers, reviewers, deployment tools
and AI agents without exposing secrets or relying on hidden runtime state.

## Report Families

```text
contract reports
policy reports
model reports
route reports
effect reports
security reports
memory reports
AI context reports
runtime bridge reports
```

## Security Rules

- Reports must redact secrets.
- Reports must identify generated facts versus source-declared facts.
- Reports must not become a source of authority unless policy allows it.
- AI-safe reports must exclude private payloads and raw credentials.

## v1 Scope

Stable report names, redaction rules and AI-safe summaries.
