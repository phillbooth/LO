# Reports: AI Context

## Purpose

The AI context report gives AI tools a safe project map based on checked facts.

## Short Definition

AI context is generated documentation for assistants and automation, not a
source of runtime authority.

## Contains

```text
package ownership
route summaries
contract summaries
policy summaries
effect summaries
safe diagnostics
redacted report links
```

## Security Rules

- Do not include raw secrets.
- Do not include private payload dumps.
- Prefer source locations and contract names over copied data.
- Mark inferred facts clearly.

## v1 Scope

AI-safe summaries from project graph, route, contract, policy and security
reports.
