
---

# `docs/SECURITY.md`

```md
# Security

## Security Summary

Describe the main security concerns for this app.

## Core Rules

- Do not commit secrets.
- Use environment variables for runtime configuration.
- Validate all user input.
- Handle errors safely.
- Avoid exposing internal error details to users.
- Log enough detail for debugging without logging sensitive data.

## Environment Variables

Real environment variables should be stored in `.env`.

Example variables should be stored in `.env.example`.

## Input Validation

All external input should be validated before use.

## Error Handling

Errors should be handled in a controlled way.

User-facing errors should be safe and simple.

Internal logs may include more detail, but must not include passwords, API keys or sensitive tokens.

## Secrets

The foLOwing must never be committed:

- API keys
- Database passwords
- Private keys
- Access tokens
- Production `.env` files

## Core Security Primitives

`packages-lo/lo-core-security/` owns reusable security primitives. Redaction
must fail closed by default: malformed rules, oversized inputs or replacements
that can re-emit matched secrets must produce redacted output instead of leaking
raw text. Permission models must deny by default, and matching deny grants must
win over matching allow grants.

`packages-lo/lo-core-logic/` owns `Tri` and `Logic<N>` semantics used by core
policy checks. `Tri` unknown states must not implicitly convert to `Bool` or
security decisions; callers must choose an explicit conversion policy and should
use `unknown_as_error` or `unknown_as_false` for security-sensitive decisions.

`packages-lo/lo-core-compiler/` must catch the same risks before execution when
source text is available. The interim syntax safety scan reports direct Tri
branch conditions, implicit Tri/Decision/Bool conversions, non-exhaustive Tri
matches, risky `unknown_as: true` use in secure flows, raw secret-like literals
and unsafe dynamic execution patterns.

NPM and `package.json` are host tooling only in this beta. LO package graph
selection, runtime profiles, compiler target policy and production package
overrides must not be hidden inside host manifests. Use the future
`package-lo.json`/`lo.lock.json` boundary for LO packages once those schemas are
implemented.

## AI Inference

AI model output is untrusted by default.

AI output must not directly approve security, payment, access-control or other
high-impact decisions. Route AI output through deterministic application policy
before taking action.

Local AI inference packages such as `lo-ai-lowbit` must use declared model paths,
memory limits, context limits, output token limits, thread limits and timeouts.
Prompts and reports must be redacted before logging when they may contain
secrets or user-sensitive data.

## Security Checklist

- [ ] `.env` is ignored by Git.
- [ ] `.env.example` exists.
- [ ] Inputs are validated.
- [ ] Errors are handled safely.
- [ ] Secrets are not logged.
- [ ] Build output does not contain secrets.
- [ ] AI output cannot directly authorize high-impact actions.
