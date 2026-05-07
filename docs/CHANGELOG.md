# Changelog

All notable changes to this app should be documented here.

## [Unreleased]

### Added

- Initial documentation structure.
- Added `packages/lo-app-kernel/` as the optional partial framework
  layer for secure runtime boundaries.
- Added a checked Run Mode hello-world test fixture for the app kernel package.
- Added the LO logic, compute type and secure runtime future-support proposal.
- Removed active legacy extension warning comments from LO core documentation.
- Added `packages/lo-api-server/` documentation as the built-in HTTP API
  serving layer for LO App Kernel.

### Changed

- Updated workspace documentation and configuration to use `packages/lo-core/`
  for the LO language package.
- Renamed the legacy language install script to `install-lo.sh`.
- Clarified that LO core is the language/compiler layer, while the Secure App
  Kernel is the optional runtime layer and full frameworks remain separate.
- Clarified that `lo-api-server` serves HTTP and delegates validation, auth and
  typed execution to `lo-app-kernel`.
- Added simple `console.log("...")` output support to LO core checked Run Mode.

### Removed

- Nothing yet.

### Fixed

- Nothing yet.
