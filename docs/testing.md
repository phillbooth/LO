# Testing

## Summary

This workspace currently uses the LO core prototype for checked Run Mode smoke
tests. These tests execute `.lo` source directly and do not produce compiled
artefacts.

## Current Smoke Tests

The app-kernel package has checked Run Mode fixtures:

```text
packages-lo/lo-framework-app-kernel/tests/hello-world.lo
packages-lo/lo-framework-app-kernel/tests/vector-function.lo
packages-lo/lo-framework-app-kernel/tests/sum.lo
packages-lo/lo-framework-app-kernel/tests/decimal-sum.lo
packages-lo/lo-framework-app-kernel/tests/json-return.lo
```

Run all app-kernel fixtures from the workspace root:

```bash
npm.cmd --prefix packages-lo/lo-framework-app-kernel test
```

Expected output includes:

```text
hello from LO app kernel test
vector total: 6
sum: 5
decimal sum: 3.50
json ids: 1,2,3 test: xxx
```

## Test Types

- Checked Run Mode smoke tests
- Unit tests
- Integration tests
- Security checks
- Manual testing
- Build verification

## Test Structure

```text
packages-lo/lo-framework-example-app/tests/
|-- unit/
`-- integration/

packages-lo/lo-framework-app-kernel/tests/
|-- hello-world.lo
|-- vector-function.lo
|-- sum.lo
|-- decimal-sum.lo
`-- json-return.lo
```
