# LO Agent

`lo-agent` is the package for supervised AI agent definitions, tool
permissions, task groups, merge policies and agent reports.

It belongs in:

```text
/packages-lo/lo-agent
```

Use this package for:

```text
AgentDefinition
AgentToolPermission
AgentLimits
AgentTaskGroupPlan
AgentResult
AgentMergePolicy
AgentReport
```

## Boundary

`lo-agent` describes typed agent orchestration. It does not own model inference,
vector math, target selection, runtime scheduling internals or security
primitive implementation.

Related packages:

| Package | Responsibility |
|---|---|
| `lo-runtime` | structured concurrency, cancellation, timeout and supervision runtime |
| `lo-security` | permissions, redaction, unsafe reports and policy checks |
| `lo-ai` | generic AI inference contracts and safety policy |
| `lo-compute` | compute target planning and fallback reports |
| `lo-vector` | vector, matrix, tensor and embedding operations |
| `lo-target-cpu` | CPU fallback and orchestration baseline |
| `lo-target-gpu` | GPU target planning for heavy compute |

Agents must be:

```text
typed
supervised
permissioned
bounded
cancelable
reportable
```

Final rule:

```text
lo-agent owns agent contracts.
lo-runtime owns execution supervision.
lo-compute owns heavy compute planning.
lo-security owns permission and safety policy.
```
