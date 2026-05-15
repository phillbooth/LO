# LogicN Syntax And Logic Status

This table gives a compact status view of common programming features compared
with C++ and Python. It is a planning aid, not a claim of full language maturity.

Status key:

| Status | Meaning |
|---|---|
| Implemented prototype | Covered by current `.lln` examples and prototype checks. |
| Documented draft | Described in language docs, but parser/checker coverage is incomplete. |
| Package-owned | Belongs in a reusable package, not the core language. |
| TODO | Needed for v1 or production maturity, but not yet implemented. |
| Not core | Intentionally excluded from core syntax. |

Security risk key:

| Risk | Meaning | Colour hint |
|---|---|---|
| High | Common source of injection, memory unsafety, secret leakage, unsafe I/O or hidden control flow. | Red |
| Potential | Safe if designed carefully, but needs parser/checker/runtime rules before production use. | Orange |
| Managed | Security-relevant, but LogicN has an explicit safer design direction or prototype check. | Blue |
| OK | Low direct security risk; mostly syntax, documentation or compile-time structure. | Green |
| N/A | Not core syntax or not applicable to normal LogicN source. | Grey |

Plain Markdown does not reliably preserve table-cell colours across GitHub,
editors and generated docs. Use the text grade as the stable source of truth;
HTML or CSS badges may be added later by the documentation renderer.

| Concept | C++ / Python equivalent | LogicN form or decision | Status | Security risk | Short reason |
|---|---|---|---|---|---|
| Source file | `.cpp`, `.hpp`, `.py` | `.lln` | Implemented prototype | OK | LogicN source examples and prototype CLI use `.lln`. |
| Entry point | `main()`, `if __name__ == "__main__"` | `boot.lln` / `secure flow main()` | Implemented prototype | Managed | Keeps startup explicit and policy-checkable. |
| Function | C++ function, Python `def` | `flow name(...) -> Type` | Implemented prototype | Managed | LogicN uses `flow` because functions may carry effects, reports and target planning. |
| Syntax governance | language feature flags, lint rules, security profiles | every syntax feature starts untrusted until typed, effect-checked, permissioned and reportable | Documented draft | Managed | Prevents new syntax from becoming implicitly trusted just because the parser accepts it. |
| Secure function | Manual policy checks, decorators | `secure flow` | Implemented prototype | Managed | Security-sensitive work is visible in the signature. |
| Pure function | `constexpr`/discipline, pure-by-convention Python | `pure flow` | Documented draft | Potential | Pure flows need effect checking before production claims. |
| Return type | C++ explicit return type, Python annotations optional | `-> Type` | Implemented prototype | OK | Return types are mandatory for clarity and checking. |
| Variables | `auto`, typed declarations, Python names | `let name: Type = value` | Implemented prototype | Managed | Explicit types avoid hidden coercion and undefined/null ambiguity. |
| Mutable variables | mutable by default in many languages | explicit mutable syntax still pending | TODO | Potential | Mutability must fit the ownership and borrowing model. |
| `if` | `if (...)`, `if condition:` | `if condition { ... }` | Documented draft | Potential | Basic branch syntax is documented; complete checker coverage is still part of v1 grammar work. |
| Pattern matching | `switch`, `std::variant` visitors, Python `match` | `match value { Case => ... }` | Implemented prototype | Managed | Used for enums, `Option`, `Result`, `Tri` and `Decision` with exhaustiveness checks planned/partly checked. |
| Result match | exceptions, return-code branches, Python `match` | `match result { Ok(value) => ... Err(error) => ... }` | Implemented prototype | Managed | Covered by `examples/result.lln`; Result exhaustiveness uses `Ok` and `Err`. |
| Boolean | `bool`, `True`/`False` | `Bool` | Documented draft | Potential | Bool exists as a primitive, but full conversion rules are still being finalised. |
| Ternary logic | libraries/custom enums | `Tri` | Implemented prototype/package-owned | Managed | Core syntax documents it; `logicn-core-logic` owns tested operations and conversion policy. |
| Decision logic | app enums or booleans | `Decision` with `ALOw`, `Deny`, `Review` | Implemented prototype/package-owned | Managed | Avoids reducing approval, denial and review states to unsafe booleans. |
| Omni logic | custom algebra/library | bounded Omni logic definitions | Package-owned | Potential | Belongs to `logicn-core-logic`; unbounded logic spaces are rejected. |
| Enums | `enum class`, `Enum` | `enum Name { Case }` | Implemented prototype | OK | Used by examples and match checks. |
| Records/structs | `struct`, class, `dataclass` | `type Name { field: Type }` | Implemented prototype | OK | Keeps data shape explicit and reportable. |
| Type alias | `using`, assignment alias | `type Id = String` | Implemented prototype | OK | Common for IDs and domain-specific scalar names. |
| Null | `nullptr`, `None` | no silent null; use `Option<T>` | Implemented prototype | Managed | Missing values must be explicit. |
| Optional value | `std::optional`, `Optional[T]` | `Option<T>`, `Some`, `None` | Implemented prototype | Managed | Avoids silent null checks and unchecked missing values. |
| Recoverable error | exceptions, return codes, `try`/`except` | `Result<T, E>`, `Ok`, `Err` | Implemented prototype | Managed | Errors are visible in function signatures. |
| Exceptions | `throw`, Python exceptions | not the default error model | Documented draft | Potential | LogicN may support readable `try` syntax over explicit `Result`, not hidden control flow by default. |
| Arrays/lists | `std::vector`, Python `list` | `Array<T>` | Implemented prototype | Potential | Generic collection shape is explicit, but bounds and memory checks still matter. |
| Maps/dicts | `std::map`, `dict` | `Map<K, V>` | Documented draft | Potential | Core type exists in docs; full parser/checker coverage is pending. |
| Sets | `std::set`, `set` | `Set<T>` | Documented draft | OK | Core type exists in docs; full parser/checker coverage is pending. |
| Printing simple text | `std::cout`, `print()` | `print("text")` | Implemented prototype | Potential | Useful for examples and checked run mode, but production output needs redaction policy. |
| `print_r` / object dump | PHP `print_r`, Python `pprint`, C++ stream/debug helpers | no native `print_r`; use future safe debug console/report output | TODO / Not core | High | Dumps must respect redaction, size limits and `SecureString`; unsafe raw dumps should not be core syntax. |
| Logging | logging libraries | planned `console.*` / reports | TODO | High | Production logging needs redaction and policy checks. |
| JSON decode | Python `json.loads`, C++ libraries | `json.decode<T>(input)` | Implemented prototype | Managed | JSON must decode into a declared type. |
| JSON encode | Python `json.dumps`, C++ libraries | `json.encode` | Documented draft | Potential | Planned as typed JSON support. |
| API route | framework/router syntax | `api Name { POST "/path" { ... } }` | Implemented prototype | Managed | LogicN treats API boundaries as typed contracts. |
| Webhook | framework route + HMAC checks | `webhook` syntax/docs | Implemented prototype/draft | High | Basic parser/report direction exists; deeper checks remain package/kernel work. |
| Effects | C++/Python by convention | `effects [network.inbound]` | Implemented prototype/draft | Managed | Effects need to be visible for security and target planning. |
| Async | `async`/`await`, futures/coroutines | `async flow`, `await` | Documented draft | Potential | Syntax direction exists; runtime/checker maturity is still pending. |
| Loops | `for`, `while`, comprehensions | `for`, `while`, `wait until` | Documented draft | Potential | Initial syntax is documented; full parser and safety checks are pending. |
| Parallel work | threads, tasks, asyncio | `parallel`, workers, channels | Implemented prototype/draft | High | Examples exist, but production scheduler and safety checks are future work. |
| Memory ownership | C++ RAII/move/borrow by convention, Python GC | hybrid ownership/borrowing model | TODO | High | Required before comparing maturity with C++ or Rust. |
| Manual pointer arithmetic | pointers, ctypes/native modules | not core LogicN syntax | Not core | High | Unsafe memory access must go through audited FFI/trusted modules. |
| Dynamic code execution | `eval`, `exec`, templates | rejected or gated | Implemented prototype check | High | Avoids code injection and AI-generated executable text risks. |
| Imports/modules | `#include`/`import`, Python `import` | `imports { use ... }` direction | Documented draft | Potential | Final module syntax remains open. |
| Packages | package managers, imports | package registry/lock/profile docs | TODO | High | Package resolution must be reproducible and permissioned. |
| Classes/inheritance | C++ classes, Python classes | not the initial core model | Not core | Potential | v1 favours records, enums, flows and explicit composition before class systems. |
| Templates/generics | C++ templates, Python typing generics | `Array<T>`, `Result<T,E>`, typed contracts | Documented draft | Potential | Generic constraints/protocols are still production-readiness work. |
| Traits/protocols/interfaces | C++ concepts, Python protocols | protocol/constraint model pending | TODO | Potential | Needed before mature generic libraries. |
| FFI/native interop | C ABI, ctypes, pybind | audited trusted module/FFI contracts | TODO | High | Interop must declare ownership, nullability, layout and audit reports. |
| Vector/matrix/tensor | libraries such as Eigen/NumPy/PyTorch | `Vector`, `Matrix`, `Tensor` contracts | Package-owned | Potential | `logicn-core-vector` and AI packages own detailed validation and reports. |
| AI inference | Python ML stack, C++ runtimes | `ai.infer` package contracts, generic targets | Package-owned | High | AI is package/runtime work, not normal app control-flow syntax. |
| NPU target | vendor SDKs/libraries | `prefer npu`, explicit fallback reports | Package-owned | Potential | NPU is a compute target for model inference, not a general-purpose code target. |
| Unsafe regex/patterns | regex libraries | `Pattern`, `UnsafeRegex` policy docs | Documented draft | High | Unsafe regex must be named and gated. |
| Tests | C++ test frameworks, `pytest` | `LogicN test`, future test syntax | Implemented prototype/draft | Managed | CLI has prototype tests; source-level test syntax remains pending. |

## Detailed Syntax Checklist

This checklist is intentionally broad. Some entries are active v1 work, some are
package-owned, and some are listed specifically so they are not accidentally
invented as core syntax later. The compact table above carries the security-risk
grade; this detailed checklist keeps the broader syntax inventory readable.

| Area | Item | C++ / Python equivalent | LogicN status | LogicN decision |
|---|---|---|---|---|
| Functions | normal function | C++ function, Python `def` | Implemented prototype | Use `flow name(...) -> Type`. |
| Functions | secure function | decorators/manual checks | Implemented prototype | Use `secure flow` for security-sensitive work. |
| Functions | pure function | `constexpr`, pure convention | Documented draft | Use `pure flow`; needs full effect checker. |
| Functions | async function | coroutine, `async def` | Documented draft | Use `async flow`; runtime/checker still pending. |
| Functions | vector function | SIMD/library function | Documented draft/package-owned | Use vector flow direction and `logicn-core-vector` contracts. |
| Functions | required vector execution | explicit SIMD/backend requirement | Documented draft | Must reject scalar fallback unless declared. |
| Functions | generic function | templates, type variables | TODO | Needs generic constraints/protocol rules. |
| Functions | overloaded function | overload sets, dynamic dispatch | TODO | Needs name-resolution and ambiguity rules before adoption. |
| Functions | lambda/closure | lambdas, Python closures | TODO | Deferred until capture, lifetime and effect rules are clear. |
| Functions | decorators/attributes | Python decorators, C++ attributes | Documented draft | Prefer explicit blocks/metadata over arbitrary executable decorators. |
| Branching | `if` | `if`, `elif`, `else` | Documented draft | Core syntax planned; full parser/checker coverage pending. |
| Branching | `else` | `else` | Documented draft | Paired with `if`; must preserve strict Bool/Tri rules. |
| Branching | `else if` | `else if`, `elif` | Documented draft | Syntax decision pending; avoid multiple equivalent spellings. |
| Branching | `switch` | C++ `switch`, Python `match` | Implemented prototype | LogicN uses `match`. |
| Branching | pattern matching | variant/pattern match | Implemented prototype | Used for enums, `Option`, `Result`, `Tri`, `Decision`. |
| Branching | `match result` | exceptions, result-code checks | Implemented prototype | `examples/result.lln` uses `match result { Ok(order) => ... Err(error) => ... }`. |
| Branching | `match option` | `if value is None`, optional visitors | Implemented prototype | `match customer { Some(c) => ... None => ... }` exists in `examples/option.lln`. |
| Branching | `match enum` | `switch`, enum match | Implemented prototype | Enum exhaustiveness diagnostics exist in the prototype type checker. |
| Branching | wildcard match | `_` default case | Documented draft | Used in docs, but needs full exhaustiveness and reachability rules. |
| Branching | guard clauses in match | `case ... if ...` | TODO | Needs grammar and exhaustiveness rules. |
| Loops | counted `for` | `for (i=0;...)`, `range()` | Documented draft | Planned, but bounds and mutation checks are required. |
| Loops | `foreach` / for-each | range-for, `for x in xs` | Documented draft | Prefer explicit collection iteration with element type checks. |
| Loops | `while` | `while` | Documented draft | Planned with termination/resource diagnostics. |
| Loops | `break` | `break` | TODO | Needs cleanup/defer/rollback semantics. |
| Loops | `continue` | `continue` | TODO | Needs clear interaction with resource cleanup and reports. |
| Loops | `return` from loop | normal return | Implemented prototype | Already used in flows; deeper cleanup checks pending. |
| Waiting | `wait until` | condition wait/polling loop | Documented draft | Needs runtime scheduling and timeout policy. |
| Waiting | `await` | coroutine await | Documented draft | Structured await rules are documented. |
| Waiting | `await all` | gather/join-all | Documented draft | Must report cancellation and partial failure. |
| Waiting | `await race` | race/select | Documented draft | Needs cancellation safety and deterministic reports. |
| Waiting | `await stream` | async iteration | Documented draft | Needs stream lifetime and backpressure checks. |
| Concurrency | `parallel` block | threads/tasks/asyncio gather | Implemented prototype/draft | Example exists; production scheduler is pending. |
| Concurrency | worker | thread/process worker | Implemented prototype/draft | Example exists; pool/runtime contracts are pending. |
| Concurrency | channel | queues/channels | Documented draft | Needs type, capacity and overflow policy checks. |
| Data | primitive scalar types | built-in numeric/string types | Implemented prototype/draft | `String`, `Int`, `Bool`, etc. documented; parser coverage varies. |
| Data | explicit integer sizes | `int32_t`, `int64_t` | Documented draft | Needed for FFI, binary and deterministic reports. |
| Data | decimal/money | libraries/Decimal | Documented draft/package-owned | Core may define types; finance semantics are package-owned. |
| Data | string | `std::string`, `str` | Implemented prototype | Normal text type. |
| Data | secure string | secret wrappers | Documented draft | Must be redacted and blocked from unsafe sinks. |
| Data | bytes | byte arrays | Documented draft | Needed for binary, crypto and I/O boundaries. |
| Data | record type | struct/dataclass | Implemented prototype | Use `type Name { field: Type }`. |
| Data | enum type | enum/Enum | Implemented prototype | Used by examples and match checks. |
| Data | variant/sealed union | `std::variant`, tagged union | TODO | Needed for mature domain modelling. |
| Data | destructor/finalizer | destructor, `__del__` | TODO | Deterministic cleanup model must come first. |
| Data | interface/protocol | abstract class, protocol | TODO | Needed later for generic packages. |
| Data | trait/concept | C++ concept, Rust trait-like | TODO | Needed for production generic constraints. |
| Data | namespace/module | namespace, module/package | Documented draft | Final module syntax is still open. |
| Values | `let` binding | variable declaration | Implemented prototype | Immutable-by-default direction. |
| Values | mutable binding | mutable variable | TODO | Must align with ownership/borrowing rules. |
| Values | constant | `const`, module constant | Documented draft | Needs module and initialization rules. |
| Values | assignment | `=` mutation | TODO | Needs mutability and borrow checks. |
| Values | destructuring | tuple/object unpacking | TODO | Useful later, but can obscure ownership/moves. |
| Values | type inference | `auto`, inferred Python names | Documented draft | Must stay bounded; public boundaries should remain explicit. |
| Operators | arithmetic | `+ - * / %` | Documented draft | Needs overflow, decimal and target rules. |
| Operators | comparison | `==`, `<`, `>` | Documented draft | Needs strict type compatibility. |
| Operators | boolean operators | `&&`, `and`, `or`, `not` | Documented draft | Must reject implicit Tri/Decision coercion. |
| Errors | `Result` | return error union | Implemented prototype | Primary recoverable error model. |
| Errors | `Option` | optional/maybe | Implemented prototype | Primary missing-value model. |
| Errors | `try` over Result | `?`, `try`, exceptions | Documented draft | May be syntax sugar only over explicit `Result`. |
| Errors | exceptions | `throw`, `except` | Not default | Hidden control flow is not the normal LogicN model. |
| Errors | panic/fatal | abort/raise fatal | TODO | Needs fatal diagnostic and recovery policy. |
| Errors | assert | `assert` | TODO | Needs build-mode and security policy semantics. |
| I/O | print | `print`, `cout` | Implemented prototype | Simple text output exists for examples/run mode. |
| I/O | `print_r` dump | PHP `print_r`, `pprint` | TODO / Not core | Use safe debug/report tools with redaction, not raw dumps. |
| I/O | logging | logging libraries | TODO | Needs production redaction and policy checks. |
| I/O | file read/write | filesystem APIs | Documented draft/package-owned | Must be permissioned and effect-checked. |
| I/O | environment variable | `getenv`, `os.environ` | Documented draft | Secrets/config must remain separate and reportable. |
| I/O | network request | sockets/http libraries | Package-owned | `logicn-core-network` owns policy/report contracts. |
| I/O | raw socket | sockets | Package-owned/gated | Must be denied or explicitly permissioned. |
| I/O | database query | DB libraries/ORM | Package-owned | Database package owns query/model/report contracts. |
| API | API route | routers/frameworks | Implemented prototype | `api` blocks define typed routes. |
| API | route handler | controller/action | Implemented prototype | Handler is a typed flow. |
| API | middleware | framework middleware | Documented draft/package-owned | Kernel/framework package owns route lifecycle policy. |
| API | controller class | MVC controller | Not core | LogicN prefers route-first typed flows. |
| API | webhook | route plus signature checks | Implemented prototype/draft | Security checks must be explicit and reportable. |
| API | OpenAPI output | codegen/tools | Implemented prototype | Prototype can emit OpenAPI-style output. |
| JSON | decode | `json.loads`, parser lib | Implemented prototype | `json.decode<T>` into typed shape. |
| JSON | encode | `json.dumps` | Documented draft | Planned typed output. |
| JSON | raw JSON | dynamic dict/object | Documented draft | Must be bounded by policy. |
| JSON | unknown fields | runtime validation | Implemented prototype/draft | Strict decode should reject or report. |
| JSON | duplicate keys | parser policy | Documented draft | Must report because JSON-native safety depends on it. |
| Security | permissions block | config/policy files | Documented draft | Policy should be source-visible and reportable. |
| Security | security block | config/policy files | Documented draft | Core owns syntax direction; runtime packages enforce. |
| Security | package permission | dependency policy | Documented draft | Package use must be registry/lock checked. |
| Security | secret literal | ad hoc strings | Implemented prototype check | Raw secret-like literals are flagged. |
| Security | dynamic eval | `eval`, `exec` | Implemented prototype check | Unsafe dynamic execution is rejected or gated. |
| Memory | ownership | C++ ownership/RAII | TODO | Core v1 maturity blocker. |
| Memory | borrow/reference | references, views | TODO | Needs escape and mutation checks. |
| Memory | move | move semantics | TODO | Needed for large data and deterministic cleanup. |
| Memory | clone | copy/clone | Documented draft | Large clone warnings exist in prototype direction. |
| Memory | GC | Python GC | Not decided | If used, must not hide resource cleanup. |
| Memory | unsafe block | unsafe/native code | TODO | Must be explicit, audited and narrow if introduced. |
| Modules | import/use | `#include`, `import` | Documented draft | `imports { use ... }` direction exists. |
| Modules | package manifest | package config | TODO | Needs `package-logicn.json` and lockfile rules. |
| Modules | visibility | `public`, private modules | Documented draft | Module/visibility docs exist; parser work pending. |
| Modules | macro/preprocessor | C++ preprocessor/macros | Not core | Avoid hidden generated syntax and security ambiguity. |
| Metaprogramming | reflection | RTTI/introspection | TODO | Needs strict boundaries and report use cases. |
| Metaprogramming | code generation | templates, decorators | Package/tool-owned | Generated output must be documented and source-mapped. |
| Targets | CPU target | native/normal runtime | Documented draft/package-owned | `logicn-target-cpu` owns target contracts. |
| Targets | WASM target | Emscripten/Pyodide style | TODO/package-owned | `logicn-target-wasm` needs target plans. |
| Targets | GPU target | CUDA/OpenCL/libraries | Package-owned | Target planning exists; not normal core control flow. |
| Targets | NPU target | ML accelerator SDKs | Package-owned | AI inference target only, with explicit fallback reports. |
| Targets | photonic target | specialist hardware | Package-owned | Planning contracts only; no hardware claim. |
| Targets | browser target | JS/WebAssembly output | Documented draft | Browser-safe import checks exist in prototype direction. |
| Vector | vector type | SIMD/Eigen/NumPy | Package-owned | `logicn-core-vector` owns contracts. |
| Vector | matrix type | Eigen/NumPy | Package-owned | `logicn-core-vector` owns contracts. |
| Vector | tensor type | PyTorch/NumPy arrays | Package-owned | AI/vector packages own shape/precision checks. |
| Vector | `vectorize rows` | vectorized dataframe/NumPy | Documented draft | Syntax direction exists; parser coverage pending. |
| AI | model inference | ONNX/PyTorch/TensorRT | Package-owned | `logicn-ai` and target packages own inference contracts. |
| AI | model training | ML frameworks | Package-owned/later | Not a core v1 feature. |
| AI | prompt generation | LLM libraries | Package-owned | Text AI belongs in packages with privacy/report policy. |
| AI | embeddings | ML libraries | Package-owned | Package-owned with model, privacy and target reports. |
| Testing | CLI package tests | `pytest`, CTest | Implemented prototype | `LogicN test` command exists for prototype examples. |
| Testing | source test syntax | language test blocks | TODO | Needs test model and report schemas. |
| Testing | property tests | Hypothesis/QuickCheck | TODO | Useful later, but not core v1. |
| Tooling | formatter | `black`, clang-format | Implemented prototype | Prototype formatter/check exists. |
| Tooling | linter | linters/static analysis | TODO | Security/type/effect lints need compiler integration. |
| Tooling | debugger | debuggers/pdb/gdb | TODO | Needs source maps and runtime hooks. |
| Tooling | source maps | debug symbols/source maps | Implemented prototype/draft | Build reports include map manifest/source mapping direction. |

## Not Core For V1

These constructs are listed separately so they are visible without cluttering the
active syntax checklist. They are not part of the v1 core surface. Some may be
reconsidered later after the parser, checker, memory model, effect system and
package boundaries are stable.

| Area | Item | C++ / Python equivalent | Security risk | Reason not in v1 core |
|---|---|---|---|---|
| Functions | variadic function | `...`, `*args`, `**kwargs` | Potential | Weakens typed API contracts unless carefully constrained. |
| Branching | ternary expression | `?:`, `x if y else z` | Potential | `match` and explicit `if` are clearer for strict logic. |
| Loops | infinite `loop` | `while(true)`, `for(;;)` | High | Too easy to hide runaway work; require explicit `while` or worker policy. |
| Loops | `do while` | C++ `do while` | Potential | Avoid extra loop forms until core grammar is stable. |
| Loops | comprehensions | Python list/dict comprehensions | Potential | Can hide allocation, iteration cost and effects; consider later with memory reports. |
| Concurrency | detached task | background task | High | Unstructured tasks weaken cleanup, cancellation and auditability. |
| Data | class | C++/Python class | Potential | Use records plus flows first; class syntax can wait. |
| Data | method | member function | Potential | Prefer namespaced flows until the object model is designed. |
| Data | constructor | class constructor | Potential | Prefer typed values and validation flows. |
| Data | inheritance | class inheritance | Potential | Avoid fragile hierarchy before protocols/traits exist. |
| Values | global variable | global/static variable | High | Conflicts with strict global registry and effect visibility. |
| Values | static local | static local variable | High | Hidden state should be explicit and reported. |
| Operators | null coalescing | `??`, `or` idioms | Potential | Prefer explicit `Option` matching. |
| Operators | operator overloading | C++ operator overload | Potential | Can hide work/effects; reconsider after traits/protocols. |
| Metaprogramming | compile-time function execution | constexpr/metaclasses | High | Too much complexity before parser/checker maturity. |

## Practical Rule

When a feature is ordinary control flow or type safety, it can belong in
`logicn-core`. When a feature talks to a device, framework, model, database,
network provider or native library, it should usually be package-owned and
reported instead of becoming permanent core syntax.
