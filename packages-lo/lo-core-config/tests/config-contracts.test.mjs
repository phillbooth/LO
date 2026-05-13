import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  defineEnvironmentVariableReference,
  loadConfigFromObjects,
  parseEnvironmentConfig,
} from "../dist/index.js";

describe("lo-core-config contracts", () => {
  it("loads a runtime handoff from project and environment objects", () => {
    const result = loadConfigFromObjects({
      project: {
        name: "LO-app",
        version: "0.1.0",
        root: ".",
        entryFiles: ["packages-lo/lo-framework-example-app/src/index.lo"],
        packages: ["packages-lo/lo-core", "packages-lo/lo-core-config", "packages-lo/lo-framework-example-app"],
        strict: true,
        targets: ["cpu", "wasm"],
      },
      environment: {
        mode: "production",
        variables: ["LO_APP_ENV"],
        secrets: [{ name: "LO_APP_SECRET", required: true }],
      },
      availableEnvironment: {
        LO_APP_ENV: "production",
        LO_APP_SECRET: "set",
      },
      generatedAt: "2026-05-08T00:00:00.000Z",
    });

    assert.equal(result.runtime?.canRun, true);
    assert.equal(result.runtime?.environment.mode, "production");
    assert.deepEqual(result.diagnostics, []);
  });

  it("reports missing production secrets without exposing values", () => {
    const result = loadConfigFromObjects({
      project: {
        name: "LO-app",
        version: "0.1.0",
        root: ".",
        entryFiles: [],
        packages: [],
        strict: true,
        targets: [],
      },
      environment: {
        mode: "production",
        secrets: ["LO_APP_SECRET"],
      },
      availableEnvironment: {},
    });

    assert.equal(result.runtime?.canRun, false);
    assert.equal(
      result.diagnostics[0]?.code,
      "LO_CONFIG_REQUIRED_ENVIRONMENT_VARIABLE_MISSING",
    );
    assert.match(result.diagnostics[0]?.message ?? "", /LO_APP_SECRET/);
    assert.doesNotMatch(result.diagnostics[0]?.message ?? "", /undefined|null|set/);
  });

  it("requires environment validation before production runtime handoff", () => {
    const result = loadConfigFromObjects({
      project: {
        name: "LO-app",
        version: "0.1.0",
        root: ".",
        entryFiles: [],
        packages: [],
        strict: true,
        targets: [],
      },
      environment: {
        mode: "production",
      },
    });

    assert.equal(result.runtime?.canRun, false);
    assert.equal(
      result.diagnostics[0]?.code,
      "LO_CONFIG_PRODUCTION_REQUIRES_ENVIRONMENT_VALIDATION",
    );
  });

  it("disables benchmark packages by default in production", () => {
    const result = loadConfigFromObjects({
      project: {
        name: "LO-app",
        version: "0.1.0",
        root: ".",
        entryFiles: [],
        packages: [
          "packages-lo/lo-core",
          "packages-lo/lo-tools-benchmark",
        ],
        strict: true,
        targets: [],
      },
      environment: {
        mode: "production",
      },
      availableEnvironment: {},
    });

    assert.equal(result.runtime?.canRun, false);
    assert.equal(
      result.diagnostics.at(-1)?.code,
      "LO_CONFIG_PRODUCTION_PACKAGE_DISABLED",
    );
  });

  it("allows explicit reported production package overrides", () => {
    const result = loadConfigFromObjects({
      project: {
        name: "LO-app",
        version: "0.1.0",
        root: ".",
        entryFiles: [],
        packages: [
          "packages-lo/lo-core",
          "packages-lo/lo-tools-benchmark",
        ],
        production: {
          packageOverrides: [
            {
              path: "packages-lo/lo-tools-benchmark",
              reason: "One-off production hardware validation before launch.",
              expires: "2026-06-01",
            },
          ],
        },
        strict: true,
        targets: [],
      },
      environment: {
        mode: "production",
      },
      availableEnvironment: {},
    });

    assert.equal(result.runtime?.canRun, true);
    assert.equal(
      result.runtime?.activeProductionPackageOverrides[0]?.path,
      "packages-lo/lo-tools-benchmark",
    );
    assert.deepEqual(result.diagnostics, []);
  });

  it("can forbid production package overrides by policy", () => {
    const result = loadConfigFromObjects({
      project: {
        name: "LO-app",
        version: "0.1.0",
        root: ".",
        entryFiles: [],
        packages: ["packages-lo/lo-tools-benchmark"],
        production: {
          packageOverrides: [
            {
              path: "packages-lo/lo-tools-benchmark",
              reason: "Temporary validation.",
            },
          ],
        },
        strict: true,
        targets: [],
      },
      environment: {
        mode: "production",
      },
      availableEnvironment: {},
      productionPolicy: {
        allowProductionPackageOverrides: false,
      },
    });

    assert.equal(result.runtime?.canRun, false);
    assert.equal(
      result.diagnostics.at(-1)?.code,
      "LO_CONFIG_PRODUCTION_PACKAGE_OVERRIDE_NOT_ALLOWED",
    );
  });

  it("normalises safe environment variable references", () => {
    const reference = defineEnvironmentVariableReference("LO_CACHE_TTL", {
      required: false,
      scope: "runtime",
      defaultValue: "60",
    });
    const result = parseEnvironmentConfig({
      mode: "development",
      variables: [reference],
    });

    assert.equal(result.environment?.variables[0]?.kind, "env");
    assert.equal(result.environment?.variables[0]?.secret, false);
    assert.equal(result.diagnostics.length, 0);
  });
});
