# LO Agent

`lo-ai-agent` is the package for supervised AI agent definitions, tool
permissions, task groups, merge policies and agent reports.

It belongs in:

```text
/packages-lo/lo-ai-agent
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

`lo-ai-agent` describes typed agent orchestration. It does not own model inference,
vector math, target selection, runtime scheduling internals or security
primitive implementation.

Related packages:

| Package | Responsibility |
|---|---|
| `lo-core-runtime` | structured concurrency, cancellation, timeout and supervision runtime |
| `lo-core-security` | permissions, redaction, unsafe reports and policy checks |
| `lo-ai` | generic AI inference contracts and safety policy |
| `lo-core-compute` | compute target planning and fallback reports |
| `lo-core-vector` | vector, matrix, tensor and embedding operations |
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
lo-ai-agent owns agent contracts.
lo-core-runtime owns execution supervision.
lo-core-compute owns heavy compute planning.
lo-core-security owns permission and safety policy.
```
