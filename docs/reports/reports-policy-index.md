# Reports: Policy Index

## Purpose

The policy index report lists all policy declarations discovered in a project.

## Contains

```text
policy id
policy kind
source file
source location
declared scope
related routes, flows or packages
```

## Security Rules

- Do not include secret values.
- Include unresolved or conflicting policy entries.
- Keep source locations stable for diagnostics and AI tools.

## v1 Scope

Index app, route, flow, response and package policy declarations.
