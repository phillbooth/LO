# Framework: Responses

## Purpose

Response docs define what may leave a LogicN application.

## Short Definition

A response contract is a safe public output boundary.

## Syntax Example

```logicn
type UserResponse {
  id: UserId
  email: Email
}
```

## Security Rules

- Public routes must use declared response contracts.
- Raw models must not be returned.
- Secrets must never be included.
- Sensitive fields require explicit capability and audit policy.

## Generated Reports

```text
response-contract-report.json
model-exposure-report.json
response-security-report.json
```

## AI Guidance

AI tools should use response contracts for public output examples and avoid raw
internal models.

## v1 Scope

Include/deny response shape direction, classification and response exposure
reports.
