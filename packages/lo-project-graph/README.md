# LO Project Graph

`lo-project-graph` is the package for LO project knowledge graph contracts.

It belongs in:

```text
/packages/lo-project-graph
```

Use this package for:

```text
project graph nodes
project graph relationships
package ownership maps
document and decision links
policy and unsafe feature classification
report output manifests
AI assistant map files
graph query, path and explain request contracts
backend selection policy
workspace package/doc scanner
Markdown report and AI map rendering
```

## Backend Role

`lo-project-graph` should expose generic LO graph contracts and commands. It
should not expose one tool name as source syntax or CLI syntax.

Stable LO surface:

```text
lo graph
lo graph --out build/graph
project graph nodes and edges
project graph reports
```

Swappable backend implementations:

```text
lo_native
graphify
static_analyser
docs_indexer
future_standard
```

Graphify-style tooling is useful as inspiration and can be used as an optional
backend, including from a pinned Git package. The LO graph output should still
use LO-native node, edge, manifest and report contracts so the backend can be
replaced later without renaming commands or generated file formats.

Git backends must be explicitly allowed by backend policy and pinned to a ref.
Model-assisted extraction remains opt-in.

This package must not become part of LO core, compile-time security enforcement
or production runtime.

## Boundary

`lo-project-graph` explains relationships. It does not enforce security,
compile source code, run tasks, serve HTTP or replace compiler checks.

## Native Mapper

The package includes a LO-native workspace graph builder that can consume:

```text
lo.workspace.json package paths
README and TODO documents
package.json metadata
TypeScript exported contracts
top-level docs
generated JSON report examples
```

It maps packages, documents, exported contracts and package references into a
stable graph. The CLI can render:

```text
build/graph/lo-project-graph.json
build/graph/LO_GRAPH_REPORT.md
build/graph/lo-ai-map.md
build/graph/lo-project-graph.html
```

Final rule:

```text
lo-project-graph maps and explains the project.
graphify is one possible backend, not LO syntax.
lo-core and lo-compiler define language checks.
lo-security and runtime packages enforce policy.
```
