# LogicN Core Network TODO

V1 freeze rule: this package defines network policy and report contracts only.
HTTP serving belongs in `logicn-framework-api-server`; application request
policy belongs in `logicn-framework-app-kernel`.

```text
[x] Create /packages-logicn/logicn-core-network
[x] Add README.md
[x] Add package metadata
[x] Add TODO.md
[x] Add typed network policy exports
[x] Define TLS policy contract
[x] Define endpoint allow/deny rules
[x] Define backend capability and safe auto-selection contract
[x] Define network report contract
[x] Add tests
[x] Add examples
[ ] Wire network reports into compiler/runtime reports
```
