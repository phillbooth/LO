import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, it } from "node:test";

import { runCli } from "../dist/index.js";

describe("lo graph command", () => {
  it("generates graph JSON and report files from workspace metadata", async () => {
    const cwd = await mkdtemp(join(tmpdir(), "lo-cli-graph-"));
    await writeFile(
      join(cwd, "lo.workspace.json"),
      `${JSON.stringify(
        {
          name: "LO-test",
          packages: [
            "packages/lo-core",
            "packages/lo-security",
            "packages/lo-project-graph",
          ],
          docs: {
            language: "packages/lo-core",
            security: "packages/lo-security",
            projectGraph: "packages/lo-project-graph",
          },
        },
        null,
        2,
      )}\n`,
      "utf8",
    );

    const result = await runCli(["graph", "--out", "graph-out"], cwd);
    const graph = JSON.parse(
      await readFile(join(cwd, "graph-out", "lo-project-graph.json"), "utf8"),
    );
    const report = await readFile(
      join(cwd, "graph-out", "LO_GRAPH_REPORT.md"),
      "utf8",
    );
    const aiMap = await readFile(join(cwd, "graph-out", "lo-ai-map.md"), "utf8");
    const html = await readFile(
      join(cwd, "graph-out", "lo-project-graph.html"),
      "utf8",
    );

    assert.equal(result.ok, true);
    assert.equal(graph.nodes.some((node) => node.id === "package:lo-core"), true);
    assert.equal(
      graph.edges.some((edge) => edge.kind === "generates"),
      true,
    );
    assert.match(report, /LO Graph Report/);
    assert.match(aiMap, /LO AI Map/);
    assert.match(html, /LO Project Graph/);
  });
});
