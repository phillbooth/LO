
---

# `docs/SECURITY.md`

```md
# Security

## Security Summary

LogicN's strongest security position is application-level policy, not a claim
that it is more memory-safe than Rust or universally safer than C++ or Python.
The project should make permissions, typed API boundaries, package effects,
secrets, interop, production rules and AI-readable reports visible before code
runs. See `docs/APPLICATION_SECURITY_POSITIONING.md` for the comparison with
Rust, C++ and Python.

## Core Rules

- Do not commit secrets.
- Use environment variables for runtime configuration.
- Validate all user input.
- Handle errors safely.
- Avoid exposing internal error details to users.
- Log enough detail for debugging without logging sensitive data.
- Deny file, network, database, shell, AI, GPU and interop effects unless they
  are explicitly declared by package and application policy.
- Treat raw SQL, raw shell execution, unsafe interop and untrusted
  deserialization as denied-by-default production risks.
- Treat network access as a security-sensitive capability. Inbound ports,
  outbound hosts, raw sockets, packet capture, promiscuous mode and shell
  network tools must be denied unless declared and reported.
- Require TLS policy, route-level rate limits, timeout policy and backpressure
  for production public network routes unless a reviewed override exists.
- Deny plaintext fallback, silent TLS downgrade, disabled certificate
  validation, disabled hostname validation, debug proxying and secrets in URLs
  for production networked apps.
- Generate security reports that show risky permissions, secret flows, package
  effects, route policy gaps and production overrides.

## Environment Variables

Real environment variables should be stored in `.env`.

Example variables should be stored in `.env.example`.

## Input Validation

All external input should be validated before use.

API inputs should decode into strict typed request contracts before application
handler logic runs. Unknown fields, oversized JSON, invalid types and unsafe
payload shapes should fail at the boundary.

## Error Handling

Errors should be handled in a controlled way.

User-facing errors should be safe and simple.

Internal logs may include more detail, but must not include passwords, API keys or sensitive tokens.

## Secrets

The following must never be committed:

- API keys
- Database passwords
- Private keys
- Access tokens
- Production `.env` files

## Core Security Primitives

`packages-logicn/logicn-core-security/` owns reusable security primitives. Redaction
must fail closed by default: malformed rules, oversized inputs or replacements
that can re-emit matched secrets must produce redacted output instead of leaking
raw text. Permission models must deny by default, and matching deny grants must
win over matching allow grants.

`packages-logicn/logicn-core-logic/` owns `Tri` and `LogicN` semantics used by core
policy checks. `Tri` unknown states must not implicitly convert to `Bool` or
security decisions; callers must choose an explicit conversion policy and should
use `unknown_as_error` or `unknown_as_false` for security-sensitive decisions.

`packages-logicn/logicn-core-compiler/` must catch the same risks before execution when
source text is available. The interim syntax safety scan reports direct Tri
branch conditions, implicit Tri/Decision/Bool conversions, non-exhaustive Tri
matches, risky `unknown_as: true` use in secure flows, raw secret-like literals
and unsafe dynamic execution patterns.

NPM and `package.json` are host tooling only in this beta. LogicN package graph
selection, runtime profiles, compiler target policy and production package
overrides must not be hidden inside host manifests. Use the future
`package-logicn.json`/`LogicN.lock.json` boundary for LogicN packages once those schemas are
implemented.

## AI Inference

AI model output is untrusted by default.

AI output must not directly approve security, payment, access-control or other
high-impact decisions. Route AI output through deterministic application policy
before taking action.

Local AI inference packages such as `logicn-ai-lowbit` must use declared model paths,
memory limits, context limits, output token limits, thread limits and timeouts.
Prompts and reports must be redacted before logging when they may contain
secrets or user-sensitive data.

AI-readable project context must be generated from redacted summaries and
machine-readable reports. It must not leak secrets, private data, credentials or
unsafe runtime controls.

## Production Policy

Production builds should fail when core application security controls are
missing. Required release checks include typed input, auth on private routes,
rate limits for sensitive endpoints, HTTPS or equivalent transport policy,
secret-safe logging and a passing security report.

Production policy must deny debug mode, unsafe interop, raw SQL, shell
execution and wildcard network access unless an explicit, reviewed and reported
override exists.

Network policy should be defined through `logicn-core-network` contracts and
enforced with `logicn-core-security`, `logicn-framework-app-kernel` and the
HTTP/API transport layer. Network reports should show inbound ports, outbound
hosts, TLS posture, rate limits, selected I/O backend, zero-copy availability
raw socket or packet-filter permissions, secret URL checks, certificate
validation, hostname validation and plaintext fallback posture.

LogicN cannot prevent packets from being physically observed on a network. It
must assume packets can be observed, copied, delayed, blocked or modified, then
encrypt, authenticate, validate, minimise and report network communication.

## Security Checklist

- [ ] `.env` is ignored by Git.
- [ ] `.env.example` exists.
- [ ] Inputs are validated.
- [ ] Errors are handled safely.
- [ ] Secrets are not logged.
- [ ] Build output does not contain secrets.
- [ ] AI output cannot directly authorize high-impact actions.
- [ ] Package and application effects are explicitly declared.
- [ ] Raw SQL, shell execution and unsafe interop are denied or covered by a
      reviewed production override.
- [ ] Security reports pass before production release.
- [ ] AI-readable project context is redacted before use.
- [ ] Network ports, outbound hosts, TLS policy, raw socket permissions and
      backpressure are declared and reported.
- [ ] Plaintext fallback, TLS downgrade, debug proxying and secrets in URLs are
      denied in production.
