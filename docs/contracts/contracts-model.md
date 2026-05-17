# Contracts: Model

## Purpose

A model contract defines internal application data.

## Short Definition

Model contracts describe data the application owns or processes internally.

## Syntax

```logicn
type Order {
  id: OrderId
  sku: String
  quantity: Int
  internalRiskScore: RiskScore
}
```

## Security Rules

- Internal models are not public output contracts.
- Sensitive fields must be classified.
- Storage shape and API shape should be separate.
- Model exposure reports must show possible public leaks.

## Generated Reports

```text
model-index-report.json
model-definitions-report.json
model-exposure-report.json
```

## v1 Scope

Typed records, field classification and exposure reports.
