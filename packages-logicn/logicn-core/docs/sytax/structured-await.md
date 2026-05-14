# Structured Await Syntax

Status: draft.

## Purpose

Structured Await gives LogicN simple waiting syntax without unstructured async
programming. It standardises `await`, grouped waits, races, bounded streams,
queue handoff, timeout policy and cancellation policy.

## Grammar Direction

```text
await_expr       = "await" expression timeout_clause?
await_all        = "await" "all" timeout_clause? cancel_policy? block
await_race       = "await" "race" timeout_clause? race_policy block
await_stream     = "await" "stream" identifier "from" expression stream_block
await_queue      = "await" "queue" expression timeout_clause?
timeout_clause   = "timeout" duration
cancel_policy    = "cancelOnError" | "waitForAll" | "timeoutCancel" | "manualCancel"
race_policy      = "firstSuccess" | "firstResult"
```

## Examples

```LogicN
await all timeout 2500ms cancelOnError {
  user = UserDb.find(userId)
  orders = OrderDb.recent(userId)
  alerts = AlertService.get(userId)
}
```

```LogicN
await race timeout 200ms firstSuccess {
  cache = Cache.get(key)
  database = Database.get(key)
}
```

## Security Rules

```text
await requires an effect-declared context
pure functions cannot await
external network/database awaits require timeout policy in production
all child work must belong to a scope
unbounded streams and hidden background tasks are rejected
queue handoff must use declared queue/job contracts
```

## Report Output

Structured Await should feed async, await, timeout, queue, runtime and
concurrency reports. Diagnostics should include source locations and suggested
fixes for independent sequential awaits that should use `await all`.

## Open Work

```text
parse await all/race/stream/queue
check await effects and pure-flow restrictions
check timeout policy for external waits
emit async report fields
lower grouped waits into runtime scoped task groups
```
