# LogicN Agent

`logicn-ai-agent` is the package for supervised AI agent definitions, tool
permissions, task groups, merge policies and agent reports.

It belongs in:

```text
/packages-logicn/logicn-ai-agent
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

`logicn-ai-agent` describes typed agent orchestration. It does not own model inference,
vector math, target selection, runtime scheduling internals or security
primitive implementation.

Related packages:

| Package | Responsibility |
|---|---|
| `logicn-core-runtime` | structured concurrency, cancellation, timeout and supervision runtime |
| `logicn-core-security` | permissions, redaction, unsafe reports and policy checks |
| `logicn-ai` | generic AI inference contracts and safety policy |
| `logicn-core-compute` | compute target planning and fallback reports |
| `logicn-core-vector` | vector, matrix, tensor and embedding operations |
| `logicn-target-cpu` | CPU fallback and orchestration baseline |
| `logicn-target-gpu` | GPU target planning for heavy compute |

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
logicn-ai-agent owns agent contracts.
logicn-core-runtime owns execution supervision.
logicn-core-compute owns heavy compute planning.
logicn-core-security owns permission and safety policy.
```
