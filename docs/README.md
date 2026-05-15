# App Documentation

This folder contains documentation for the bespoke LogicN application.

These files describe the app being built, not the LogicN language itself.

## Files

- `REQUIREMENTS.md` - what the app must do
- `DESIGN.md` - user interface, user flow and experience
- `DOMAIN_DRIVEN_DESIGN.md` - optional thin DDD guidance for domain, flow, infrastructure and policy boundaries
- `ARCHITECTURE.md` - technical structure
- `SECURITY.md` - security rules, risks and controls
- `CSRF_PROTECTION.md` - route-level CSRF defaults for cookie-authenticated browser apps and state-changing requests
- `why-controllers-not-used-in-LogicN.md` - route-first API policy and why controllers are optional framework sugar rather than a core LogicN concept
- `APPLICATION_SECURITY_POSITIONING.md` - honest LogicN application-security positioning compared with Rust, C++ and Python
- `ENV_SECRETS.md` - `.env` secret declarations, `Secret<T>` handling, taint tracking, safe sinks, secret reports and redaction
- `NETWORK_ETHERNET_IO.md` - LogicN network and Ethernet I/O positioning, network policy and high-speed network planning
- `API.md` - API routes and external services
- `API_RESPONSE_ERROR_HANDLING.md` - API response helpers, `Result<T, E>`, `try`/`catch`, `match` and route response contracts
- `APP_CRASH_HANDLING.md` - crash policies, route crash boundaries, structured crash reports, checkpoints and worker supervision
- `DATABASE.md` - database structure
- `DEPLOYMENT.md` - deployment process
- `DEPLOYMENT_AUTOCONFIG.md` - deployment auto-configuration, target detection, runtime capability profiles, gates, health checks and rollback reports
- `KUBERNETES_DEPLOYMENT.md` - Kubernetes as an optional deployment target, with secure manifest generation and enterprise policy-pack boundaries
- `TESTING.md` - testing strategy
- `LEARNING_MODE.md` - safe LogicN learning mode for students, children, teachers and beginners
- `TASKS.md` - planned work
- `TODO.md` - smaller reminders
- `DECISIONS.md` - technical decisions
- `CHANGELOG.md` - project changes
- `ENTERPRISE.md` - enterprise package lock-down objectives and free/open versus enterprise split
- `LOWBIT_AI_BACKENDS.md` - low-bit AI backend architecture note
- `MEMORY_HIERARCHY_RELIABILITY.md` - cache-aware memory layout guidance, L2/L3 reporting and ECC-aware reliability policy
- `AI_ACCELERATOR_TARGETS.md` - passive AI accelerator target profiles, including Intel Gaudi 3 as a backend profile rather than LogicN syntax
- `NEURAL_ACCELERATOR_PACKAGES.md` - neural, neuromorphic and AI accelerator package split
- `OPTICAL_IO.md` - optical I/O, Intel Silicon Photonics/OCI direction and data-movement-aware compute planning
- `PASSIVE_LLM_CACHE.md` - passive generic LLM and embedding cache policy, strict cache keys, safety gates, invalidation and reports
- `PROJECT_GRAPH.md` - project knowledge graph tooling note
- `PROFILE_INSTALLERS.md` - profile-aware installer model for web, server, agent, systems and future kernel project types
- `SERVER_PLATFORM_SUPPORT.md` - Nginx/Apache/Caddy reverse proxy generation, Node.js targets, Express adapters and LogicN-native API server direction
- `SECURE_FAST_ROUTING.md` - compiled route graphs, route manifests, object/property authorization, route effects, fast trie dispatch and resource limits
- `SECURE_HTTP_RESPONSES.md` - typed response contracts, secure headers, cache/cookie policy, safe redirects, CSP, response filtering and response security reports
- `MULTI_AGENT_RUNTIME.md` - zero-trust multi-agent runtime model with typed messages, tool gateways, secret guards, memory/cache policy, approval gates and audit reports
- `RESILIENT_FLOWS.md` - controlled recovery, resilient flows and partial success reporting
- `LOGICN_FINANCIAL_MARKETS.md` - LogicN-centered financial market contracts, runtime direction, safety rules and adapter boundaries
- `WEB_RENDERING.md` - typed browser rendering pipeline, safe HTML, client state, streaming render and web package boundaries
- `../packages-logicn/logicn-core/docs/logicn-language-core-maturity-gap.md` - missing LogicN language-core maturity items compared with modern C++ and Rust
- `../packages-logicn/logicn-core/docs/compliance-and-privacy.md` - LogicN compliance and privacy framework direction
- `../packages-logicn/logicn-core/docs/data-processing.md` - LogicN data-processing package family direction

## Package-Level Architecture Notes

- `../packages-logicn/logicn-ai-agent-parallel-compute.md` - parallel AI agents, CPU/GPU compute and supervised orchestration
- `../packages-logicn/logicn-tools-benchmark/README.md` - benchmark diagnostics, fallback checks, privacy-safe reports and future sharing payloads

## Language and Runtime Proposals

- `logicn-logic-compute-runtime-proposal.md` - future LogicN logic, compute type and secure runtime support proposal.
