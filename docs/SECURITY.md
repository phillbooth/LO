
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

## Security Checklist

- [ ] `.env` is ignored by Git.
- [ ] `.env.example` exists.
- [ ] Inputs are validated.
- [ ] Errors are handled safely.
- [ ] Secrets are not logged.
- [ ] Build output does not contain secrets.