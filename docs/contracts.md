# Contracts

LO contracts describe externally visible behaviour that the compiler can validate or report.

## Contract Types

```text
API request and response contracts
webhook payload contracts
JSON schema contracts
target capability contracts
memory safety contracts
diagnostic report contracts
module visibility contracts
```

## Contract Rule

If LO can generate or validate a contract, the build should be able to explain:

```text
where it came from
which source file defines it
which target or runtime uses it
which diagnostics apply
which generated report contains it
```
