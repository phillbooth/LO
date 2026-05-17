# Framework: Models

## Purpose

Models define internal data shapes used by application flows, storage adapters
and domain logic.

## Short Definition

A model is an internal typed shape. It is not automatically safe for public
output.

## Syntax Example

```logicn
type User {
  id: UserId
  email: Email
  passwordHash: SecretHash
  role: UserRole
}
```

## How It Connects

```text
request contract -> flow -> model -> response contract
```

## Security Rules

- Raw models must not be returned by public routes.
- Secret, internal, hidden and sensitive fields must be classified.
- Public output must use response contracts.
- Storage models and response models must stay separate.

## Generated Reports

```text
model-index-report.json
model-definition-report.json
model-exposure-report.json
```

## Rejected Example

```logicn
return Response.ok(user)
```

Public routes should return a declared response contract, not a raw model.

## v1 Scope

Typed records, field classification and model exposure reporting.
