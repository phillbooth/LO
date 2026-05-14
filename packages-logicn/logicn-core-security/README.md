# LogicN Security

`logicn-core-security` is the package for reusable LogicN security primitives and security
report contracts.

LogicN's strongest honest security position is application security policy. It
should not claim to be more memory-safe than Rust. Instead, this package helps
make permissions, typed API boundaries, package effects, secrets, interop,
production rules and AI-readable reports visible and enforceable before code
runs.

It belongs in:

```text
/packages-logicn/logicn-core-security
```

Use this package for:

```text
SecureString model helpers
redaction primitives
permission model types
security diagnostics
security report contracts
safe token/cookie/header handling helpers
cryptographic policy types
network permission decision integration
security report creation
```

## Boundary

`logicn-core-security` provides shared primitives. It should not own application auth
flows, route enforcement or HTTP parsing.

```text
auth provider workflows -> logicn-framework-app-kernel
route auth enforcement  -> logicn-framework-app-kernel
HTTP header parsing     -> logicn-framework-api-server
network policy shape    -> logicn-core-network
task permission checks  -> logicn-core-tasks
compiler security rules -> logicn-core / logicn-core-compiler
```

## Contracts

The package defines:

```text
SecureStringReference
RedactionRule
RedactionResult
PermissionModel
PermissionDecision
SafeTokenReference
SafeCookieReference
SafeHeaderReference
CryptographicPolicy
SecurityDiagnostic
SecurityReport
```

Use `SecureStringReference` and safe token/cookie/header helpers to represent
sensitive values without storing the real value in source-controlled reports.
Use redaction helpers before writing diagnostics, logs or report text that may
include secrets.

## Safety Contracts

Security helpers must fail closed when a helper cannot prove that output is
safe.

```text
redaction input over the configured maximum is fully redacted
invalid redaction rules fully redact by default
redaction replacements that can re-emit full matches or surrounding context are rejected
permission models deny by default
explicit deny grants take precedence over allow grants
default-allow and wildcard-allow permission models are diagnosed
network.any, rawSocket, packetCapture and promiscuousMode are denied by default
weak crypto algorithms must not appear in allowed algorithm lists
raw SQL, shell execution and unsafe interop are production risks by default
secret flows to logs, AI prompts, external APIs and errors are reported
```

Callers can choose `onInvalidRule: "skip"` or `"throw"` for compatibility, but
the default redaction mode is `fail-closed`.

Final rule:

```text
logicn-core-security provides reusable security primitives.
logicn-core-network defines network policy and report contracts.
logicn-framework-app-kernel enforces application security policy.
logicn-core and logicn-core-compiler check language-level security contracts.
```
