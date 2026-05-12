# Secure App Kernel Requirements

## Core Requirements

- Provide a safe request lifecycle for LO applications.
- Decode raw API input into strict typed values before handlers run.
- Enforce route, webhook and job security policy declared by LO source.
- Support auth provider declarations without hard-coding one identity system.
- Support idempotency and replay protection for risky side effects.
- Support memory, timeout, concurrency and rate-limit policies.
- Support queue and job contracts without becoming a queue product.
- Generate machine-readable runtime and audit reports.
- Provide a non-compiled checked Run Mode smoke test for basic framework
  development feedback.

## Boundary Requirements

- The kernel is optional.
- LO core must remain usable without the kernel.
- Frameworks can build on the kernel.
- The kernel must not become a CMS, admin UI, ORM, page builder, frontend
  framework or template system.

## Example Stack

```text
LO language
  -> LO Secure App Kernel
  -> LO HTTP Adapter for Node / native server / WASM edge
  -> optional framework such as LO Web, LO CMS, LO API Framework, React adapter or Angular adapter
```

## Test Requirements

The package should keep a hello-world `.lo` fixture that runs through LO core
Run Mode without compiling:

```bash
npm.cmd --prefix packages-lo/lo-app-kernel run test:hello
```

The package should also keep small checked Run Mode fixtures for vector-style
function calls, integer sums, decimal sums and JSON payload return shapes:

```bash
npm.cmd --prefix packages-lo/lo-app-kernel test
```
