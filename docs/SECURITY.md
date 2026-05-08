
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

## AI Inference

AI model output is untrusted by default.

AI output must not directly approve security, payment, access-control or other
high-impact decisions. Route AI output through deterministic application policy
before taking action.

Local AI inference packages such as `lo-bitnet` must use declared model paths,
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
