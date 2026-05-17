# Reports: Overview

## Purpose

Reports are generated proof that LogicN source, packages, policies and runtime
plans were checked.

## Short Definition

A report is a machine-readable summary of source-declared facts, derived facts,
diagnostics and safety decisions.

## Report Families

```text
policy reports
model reports
contract reports
security reports
memory reports
route reports
AI context reports
runtime bridge reports
```

## Security Rules

- Reports must redact secrets.
- Reports must avoid private payload dumps.
- Reports must distinguish declared facts from inferred facts.
- Reports must be safe for AI tooling unless explicitly marked private.

## v1 Scope

Define stable report names and safety rules for policies, contracts, models,
security and AI context.
