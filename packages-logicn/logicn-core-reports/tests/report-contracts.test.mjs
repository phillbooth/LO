import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  createAiGuideReport,
  createAsyncReport,
  createBuildReport,
  createBuildCacheReport,
  createProcessingReport,
  createReportDiagnostic,
  createReportMetadata,
  createSecurityReport,
  createStorageReport,
  createTargetReport,
  serializeReportJson,
  summarizeDiagnostics,
  validateLoReport,
} from "../dist/index.js";

const metadata = createReportMetadata({
  kind: "build",
  name: "LogicN build report",
  projectName: "logicn-app",
  projectVersion: "0.1.0",
  generatedAt: "2026-05-08T00:00:00.000Z",
  generator: {
    name: "logicn-core-cli",
    version: "0.1.0",
    packageName: "@logicn/core-cli",
  },
});

describe("logicn-core-reports contracts", () => {
  it("summarises diagnostics by severity and status", () => {
    const diagnostics = [
      createReportDiagnostic("LogicN_TEST_WARNING", "warning", "Check this."),
      createReportDiagnostic("LogicN_TEST_ERROR", "error", "Fix this."),
    ];

    assert.deepEqual(summarizeDiagnostics(diagnostics), {
      info: 0,
      warnings: 1,
      errors: 1,
      critical: 0,
      total: 2,
      status: "error",
    });
  });

  it("creates build reports with metadata, artifacts and warnings", () => {
    const report = createBuildReport({
      metadata,
      diagnostics: [
        createReportDiagnostic(
          "LogicN_BUILD_TARGET_FALLBACK",
          "warning",
          "GPU target fell back to CPU.",
          { path: "targets.gpu" },
        ),
      ],
      targets: ["cpu", "wasm"],
      artifacts: [
        {
          path: "build/app.wasm",
          kind: "wasm",
          bytes: 1024,
          sha256: "sha256:example",
        },
      ],
      durationMs: 42,
    });

    assert.equal(report.kind, "build");
    assert.equal(report.summary.status, "warning");
    assert.equal(report.artifacts[0]?.path, "build/app.wasm");
    assert.match(serializeReportJson(report), /LogicN_BUILD_TARGET_FALLBACK/);
  });

  it("creates security, target and AI guide report variants", () => {
    const securityReport = createSecurityReport({
      metadata: createReportMetadata({
        ...metadata,
        kind: "security",
        name: "LogicN security report",
      }),
      checkedPolicies: ["secrets", "permissions"],
      blockedOperations: ["secret.print"],
      redactedSecrets: 2,
    });
    const targetReport = createTargetReport({
      metadata: createReportMetadata({
        ...metadata,
        kind: "target",
        name: "LogicN target report",
      }),
      requestedTargets: ["gpu", "cpu"],
      selectedTargets: ["cpu"],
      fallbackUsed: true,
    });
    const aiGuideReport = createAiGuideReport({
      metadata: createReportMetadata({
        ...metadata,
        kind: "ai-guide",
        name: "LogicN AI guide",
      }),
      sections: [
        {
          title: "Packages",
          summary: "Package ownership summary.",
          sourcePaths: ["logicn.workspace.json"],
        },
      ],
      tokenEstimate: 128,
    });

    assert.equal(securityReport.redactedSecrets, 2);
    assert.equal(targetReport.fallbackUsed, true);
    assert.equal(aiGuideReport.sections[0]?.title, "Packages");
  });

  it("creates processing reports for resilient batch flows", () => {
    const report = createProcessingReport({
      metadata: createReportMetadata({
        ...metadata,
        kind: "processing",
        name: "Import customers report",
      }),
      flow: "importCustomers",
      totalItems: 10000,
      successfulItems: 9972,
      failedItems: 28,
      retriedItems: 11,
      quarantinedItems: 28,
      failureTypes: [
        {
          errorType: "ValidationError",
          count: 18,
          retryable: false,
          action: "quarantine",
        },
      ],
    });

    assert.equal(report.kind, "processing");
    assert.equal(report.summary.status, "ok");
    assert.equal(report.failedItems, 28);
    assert.equal(report.failureTypes[0]?.action, "quarantine");
    assert.deepEqual(validateLoReport(report), []);
  });

  it("creates async reports for Structured Await analysis", () => {
    const report = createAsyncReport({
      metadata: createReportMetadata({
        ...metadata,
        kind: "async",
        name: "LogicN async report",
      }),
      awaitPoints: 18,
      awaitGroups: 4,
      raceBlocks: 1,
      streamBlocks: 2,
      queueAwaits: 3,
      networkAwaitWithoutTimeout: 0,
      databaseAwaitWithoutTimeout: 0,
      unscopedTasks: 0,
      backgroundTasks: 0,
      structuredConcurrency: true,
      awaitSites: [
        {
          name: "CustomerApi.get",
          kind: "one",
          effects: ["network.outbound", "await"],
          timeoutMs: 2000,
          source: {
            path: "orders.lln",
            line: 12,
          },
        },
      ],
      groups: [
        {
          name: "LoadDashboard",
          kind: "all",
          awaitCount: 4,
          timeoutMs: 2500,
          cancellationPolicy: "cancelOnError",
          source: {
            path: "dashboard.lln",
            line: 20,
          },
        },
      ],
    });

    assert.equal(report.kind, "async");
    assert.equal(report.awaitPoints, 18);
    assert.equal(report.groups[0]?.cancellationPolicy, "cancelOnError");
    assert.deepEqual(validateLoReport(report), []);
    assert.match(serializeReportJson(report), /structuredConcurrency/);
  });

  it("creates conservative storage and build-cache reports", () => {
    const storageReport = createStorageReport({
      metadata: createReportMetadata({
        ...metadata,
        kind: "storage",
        name: "LogicN storage report",
      }),
      storage: {
        detected: false,
        kind: "unknown",
        detailsReliable: false,
        detectionNotes: ["Storage details unavailable in container."],
      },
    });
    const cacheReport = createBuildCacheReport({
      metadata: createReportMetadata({
        ...metadata,
        kind: "build-cache",
        name: "LogicN build cache report",
      }),
      hits: 12,
      misses: 3,
      bypasses: 1,
      invalidations: 2,
      cachedDataClasses: ["parsed_ast", "type_check_cache"],
    });

    assert.equal(storageReport.recommendedCacheMode, "minimal-bounded");
    assert.equal(storageReport.unknownFallbackUsed, true);
    assert.equal(cacheReport.correctnessRequiredCache, false);
    assert.equal(cacheReport.deniedDataClasses.includes("SecureString"), true);
    assert.deepEqual(validateLoReport(storageReport), []);
    assert.deepEqual(validateLoReport(cacheReport), []);
  });

  it("validates report metadata and diagnostic shape", () => {
    const report = {
      ...createBuildReport({
        metadata,
        diagnostics: [
          createReportDiagnostic("", "error", "Missing diagnostic code."),
        ],
      }),
      metadata: {
        ...metadata,
        name: "",
        kind: "security",
      },
    };

    assert.deepEqual(
      validateLoReport(report).map((diagnostic) => diagnostic.code),
      [
        "LogicN_REPORT_NAME_REQUIRED",
        "LogicN_REPORT_KIND_MISMATCH",
        "LogicN_REPORT_DIAGNOSTIC_CODE_REQUIRED",
      ],
    );
  });
});
