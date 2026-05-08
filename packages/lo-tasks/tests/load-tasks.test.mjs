import assert from "node:assert/strict";
import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, it } from "node:test";

import {
  createTaskRunReport,
  loadTasks,
  parseTasksSource,
  resolveTaskDependencies,
  runTask
} from "../dist/index.js";

describe("lo-tasks", () => {
  it("parses tasks.lo task definitions", () => {
    const tasks = parseTasksSource(`
task generateReports {
  description "Generate local reports"
  effects [filesystem, reports]

  permissions {
    write "./build/reports"
  }

  run {
    reports.generate()
  }
}

task buildApi {
  depends [generateReports]
  effects [filesystem, compiler, reports]

  permissions {
    read "./src"
    write "./build"
  }
}
`);

    assert.equal(tasks.length, 2);
    assert.equal(tasks[0]?.name, "generateReports");
    assert.deepEqual(tasks[1]?.depends, ["generateReports"]);
    assert.deepEqual(tasks[1]?.effects, ["filesystem", "compiler", "reports"]);
    assert.equal(tasks[1]?.permissions[0]?.kind, "read");
  });

  it("loads tasks and resolves dependency order", async () => {
    const cwd = await mkdtemp(join(tmpdir(), "lo-tasks-"));
    const taskFile = join(cwd, "tasks.lo");

    await writeFile(
      taskFile,
      `task prepare {
  effects [filesystem]
  permissions {
    read "./src"
  }
}

task build {
  depends [prepare]
  effects [compiler]
  permissions {
    read "./src"
    write "./build"
  }
}
`,
      "utf8",
    );

    const loaded = await loadTasks(taskFile);
    const plan = resolveTaskDependencies(loaded, "build");

    assert.equal(plan.error, undefined);
    assert.deepEqual(plan.order.map((task) => task.name), ["prepare", "build"]);

    const result = await runTask(plan.order[1], { dryRun: true });
    assert.equal(result.status, "dry-run");
  });

  it("creates task run reports", () => {
    const task = {
      name: "build",
      effects: ["compiler"],
      permissions: []
    };
    const report = createTaskRunReport({
      taskFile: "tasks.lo",
      requestedTask: "build",
      dryRun: true,
      dependencyOrder: [task],
      results: [
        {
          task: "build",
          status: "dry-run",
          durationMs: 0,
          warnings: []
        }
      ],
      generatedAt: "2026-05-08T00:00:00.000Z"
    });

    assert.equal(report.status, "dry-run");
    assert.deepEqual(report.dependencyOrder, ["build"]);
    assert.equal(report.tasks[0]?.task, "build");
  });

  it("rejects circular dependencies", () => {
    const loaded = {
      path: "tasks.lo",
      tasks: [
        { name: "a", depends: ["b"], effects: [], permissions: [] },
        { name: "b", depends: ["a"], effects: [], permissions: [] }
      ]
    };
    const plan = resolveTaskDependencies(loaded, "a");

    assert.equal(plan.error?.code, "LO_TASK_DEPENDENCY_CYCLE");
  });
});
