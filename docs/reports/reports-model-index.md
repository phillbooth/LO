# Reports: Model Index

## Purpose

The model index report lists typed model declarations and their classification
metadata.

## Contains

```text
model name
source file
fields
field classifications
public exposure status
related response contracts
```

## Security Rules

- Secret and sensitive fields must be marked.
- Potential public exposure must be reported.
- Raw model returns from public routes must be diagnostic candidates.

## v1 Scope

Typed record indexing and exposure relationships.
