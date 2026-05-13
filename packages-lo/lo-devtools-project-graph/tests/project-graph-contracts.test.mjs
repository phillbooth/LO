import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  createDocumentNode,
  createPackageNode,
  createWorkspaceProjectGraph,
  explainProjectGraphNode,
  findProjectGraphPath,
  createProjectGraphEdge,
  createProjectGraphReport,
  defineProjectGraphBackendPolicy,
  defineProjectGraphScanPolicy,
  selectProjectGraphBackend,
  queryProjectGraph,
  validateProjectGraphBackendReference,
  validateProjectGraph,
} from "../dist/index.js";

const graph = {
  version: "0.1.0",
  generatedAt: "2026-05-08T00:00:00.000Z",
  nodes: [
    createPackageNode(
      "package:lo-core-security",
      "lo-core-security",
      "packages-lo/lo-core-security/README.md",
      "Reusable security primitives and reports.",
    ),
    createDocumentNode(
      "doc:security",
      "Security",
      "docs/SECURITY.md",
      ["document", "security"],
    ),
    {
      id: "type:SecureString",
      kind: "Type",
      label: "SecureString",
      sourcePath: "packages-lo/lo-core-security/src/index.ts",
      tags: ["security", "type"],
    },
  ],
  edges: [
    createProjectGraphEdge(
      "package:lo-core-security",
      "type:SecureString",
      "provides",
    ),
    createProjectGraphEdge("doc:security", "package:lo-core-security", "documents"),
  ],
};

describe("lo-devtools-project-graph contracts", () => {
  it("validates a package/document/type graph", () => {
    assert.deepEqual(validateProjectGraph(graph), []);
  });

  it("reports missing edge endpoints", () => {
    const diagnostics = validateProjectGraph({
      ...graph,
      edges: [
        ...graph.edges,
        createProjectGraphEdge("package:missing", "type:SecureString", "uses"),
      ],
    });

    assert.equal(diagnostics[0]?.code, "LO_PROJECT_GRAPH_EDGE_FROM_MISSING");
  });

  it("creates graph reports and scan policy defaults", () => {
    const policy = defineProjectGraphScanPolicy({
      allowModelExtraction: false,
    });
    const backend = selectProjectGraphBackend(
      [
        {
          id: "lo_native",
          label: "LO native workspace scanner",
          source: "built-in",
          capabilities: ["workspace-metadata", "json-output", "report-output"],
        },
      ],
      defineProjectGraphBackendPolicy(),
    );
    const report = createProjectGraphReport(graph, {
      jsonPath: "build/graph/lo-devtools-project-graph.json",
      htmlPath: "build/graph/lo-devtools-project-graph.html",
      reportPath: "build/graph/LO_GRAPH_REPORT.md",
      aiMapPath: "build/graph/lo-ai-map.md",
      generatedFiles: [
        "build/graph/lo-devtools-project-graph.json",
        "build/graph/LO_GRAPH_REPORT.md",
      ],
    }, backend);

    assert.equal(policy.redactSecrets, true);
    assert.equal(report.backend?.selected, "lo_native");
    assert.equal(report.diagnostics.length, 0);
    assert.equal(report.manifest.reportPath, "build/graph/LO_GRAPH_REPORT.md");
  });

  it("allows Graphify as a swappable git backend only when pinned and allowed", () => {
    const backend = {
      id: "graphify",
      label: "Graphify",
      source: "git",
      packageName: "graphify",
      gitUrl: "https://github.com/safishamsi/graphify",
      gitRef: "v0.1.0",
      capabilities: [
        "static-analysis",
        "semantic-extraction",
        "json-output",
        "html-output",
        "report-output",
      ],
    };
    const policy = defineProjectGraphBackendPolicy({
      allowGitBackends: true,
    });

    assert.deepEqual(validateProjectGraphBackendReference(backend, policy), []);
    assert.equal(
      selectProjectGraphBackend([backend], policy).selected,
      "graphify",
    );
  });

  it("rejects unpinned git backends by default", () => {
    const diagnostics = validateProjectGraphBackendReference(
      {
        id: "graphify",
        label: "Graphify",
        source: "git",
        gitUrl: "https://github.com/safishamsi/graphify",
        capabilities: ["json-output"],
      },
      defineProjectGraphBackendPolicy({
        allowGitBackends: true,
      }),
    );

    assert.equal(
      diagnostics[0]?.code,
      "LO_PROJECT_GRAPH_GIT_BACKEND_REF_REQUIRED",
    );
  });

  it("builds a workspace graph from package files and exported contracts", () => {
    const workspaceGraph = createWorkspaceProjectGraph({
      workspace: {
        name: "LO-test",
        packages: [
          { path: "packages-lo/lo-core-security" },
          { path: "packages-lo/lo-devtools-project-graph" },
        ],
        docs: {
          security: "docs/SECURITY.md",
        },
      },
      generatedAt: "2026-05-08T00:00:00.000Z",
      files: [
        {
          path: "packages-lo/lo-core-security/package.json",
          kind: "json",
          text: JSON.stringify({
            name: "@lo/core-security",
            description: "Reusable security primitives.",
          }),
        },
        {
          path: "packages-lo/lo-core-security/README.md",
          kind: "markdown",
          text: "# LO Security\n\nReusable security primitives.",
        },
        {
          path: "packages-lo/lo-core-security/src/index.ts",
          kind: "typescript",
          text: "export interface SecureStringReference {}\nexport function redactText() {}",
        },
        {
          path: "docs/SECURITY.md",
          kind: "markdown",
          text: "Security docs mention packages-lo/lo-core-security and lo-devtools-project-graph.",
        },
      ],
    });

    assert.equal(
      workspaceGraph.nodes.some((node) => node.id === "package:lo-core-security"),
      true,
    );
    assert.equal(
      workspaceGraph.nodes.some(
        (node) => node.id === "type:lo-core-security:SecureStringReference",
      ),
      true,
    );
    assert.equal(
      workspaceGraph.edges.some(
        (edge) =>
          edge.from === "package:lo-core-security" &&
          edge.to === "type:lo-core-security:SecureStringReference" &&
          edge.kind === "provides",
      ),
      true,
    );
    assert.equal(validateProjectGraph(workspaceGraph).length, 0);
  });

  it("queries, explains and finds paths through a graph", () => {
    const query = queryProjectGraph(graph, { query: "SecureString" });
    const explanation = explainProjectGraphNode(graph, {
      nodeId: "package:lo-core-security",
    });
    const path = findProjectGraphPath(graph, {
      from: "package:lo-core-security",
      to: "type:SecureString",
    });

    assert.equal(query.nodes.some((node) => node.id === "type:SecureString"), true);
    assert.equal(explanation.outgoing.length, 1);
    assert.equal(path.found, true);
    assert.equal(path.edges[0]?.kind, "provides");
  });
});
