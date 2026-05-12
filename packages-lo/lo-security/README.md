# LO Security

`lo-security` is the package for reusable LO security primitives and security
report contracts.

It belongs in:

```text
/packages-lo/lo-security
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
security report creation
```

## Boundary

`lo-security` provides shared primitives. It should not own application auth
flows, route enforcement or HTTP parsing.

```text
auth provider workflows -> lo-app-kernel
route auth enforcement  -> lo-app-kernel
HTTP header parsing     -> lo-api-server
task permission checks  -> lo-tasks
compiler security rules -> lo-core / lo-compiler
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

Final rule:

```text
lo-security provides reusable security primitives.
lo-app-kernel enforces application security policy.
lo-core and lo-compiler check language-level security contracts.
```
