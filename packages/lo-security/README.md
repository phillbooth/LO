# LO Security

`lo-security` is the package for reusable LO security primitives and security
report contracts.

It belongs in:

```text
/packages/lo-security
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

Final rule:

```text
lo-security provides reusable security primitives.
lo-app-kernel enforces application security policy.
lo-core and lo-compiler check language-level security contracts.
```
