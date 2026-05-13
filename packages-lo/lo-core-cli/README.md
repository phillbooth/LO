# LO CLI

`lo-core-cli` is the command-line interface for LO developers.

It belongs in:

```text
/packages-lo/lo-core-cli
```

It coordinates other LO packages instead of owning language, runtime, server or
application behaviour.

## Responsibilities

```text
read project configuration
load environment mode
call the compiler
call the runtime
start server tools
run task tools
print safe output
generate reports
show diagnostics
generate project graphs
```

## Early Commands

```text
lo check
lo build
lo run
lo serve
lo reports
lo security:check
lo routes
lo benchmark
lo task
lo graph
lo graph query
lo graph explain
lo graph path
```

`lo benchmark` is currently a placeholder command. The benchmark contracts,
recommended modes and report shape live in `packages-lo/lo-tools-benchmark/README.md`.

## Graph Command

`lo graph` reads `lo.workspace.json` and writes a local project graph summary.
The query commands read generated graph JSON.

From the repository root, run the current local CLI build with:

```text
node packages-lo\lo-core-cli\dist\index.js graph --out build\graph
```

The shorter `lo graph --out build\graph` form is the intended command once the
CLI is installed or linked.

Default outputs:

```text
build/graph/lo-devtools-project-graph.json
build/graph/LO_GRAPH_REPORT.md
build/graph/lo-ai-map.md
build/graph/lo-devtools-project-graph.html
```

Use `--out <dir>` to choose a different output directory.

Examples:

```text
node packages-lo\lo-core-cli\dist\index.js graph query lo-core-security --out build\graph
node packages-lo\lo-core-cli\dist\index.js graph explain package:lo-core-security --out build\graph
node packages-lo\lo-core-cli\dist\index.js graph path package:lo-devtools-project-graph report:project-graph --out build\graph

lo graph query lo-core-security
lo graph explain package:lo-core-security
lo graph path package:lo-devtools-project-graph report:project-graph
```

## Task Command

`lo task` loads safe project automation from `tasks.lo` in the repository root,
or from a file passed with `--file`.

Examples:

```text
lo task
lo task buildApi --dry-run
lo task generateReports --file packages-lo/lo-core-tasks/examples/tasks.lo --dry-run
lo task buildApi --report-out build/reports/task-report.json
```

Current task execution supports loading task definitions, listing tasks,
resolving dependency order, rejecting missing or circular dependencies and
running dry-run plans. Task runs write a structured report to
`build/reports/task-report.json` by default. Use `--report-out <path>` to choose
a different path, or `--no-report` to skip writing the report. Built-in
operation execution remains in `lo-core-tasks`.

## Security Rules

CLI output is safe by default. It must redact `SecureString` values, bearer
tokens, API keys, cookies, database passwords and private key material.

Production mode is strict and should fail when critical unsafe features are
enabled without explicit reason.

## Non-Goals

`lo-core-cli` must not contain business logic, routing logic, authentication logic,
ORM logic, template rendering, CMS features, admin UI or frontend framework
behaviour.
