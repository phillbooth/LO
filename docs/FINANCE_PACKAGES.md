# Finance Packages

Status: archived post-v2 planning.

Finance package folders have been moved out of the active workspace to:

```text
C:\laragon\www\LO_Archive\packages-lo\lo-finance-core
```

This document is retained as planning context only. Finance packages must not
be part of the active v1 build graph.

## Purpose

LO should treat finance as a serious domain package layer, not as core language
syntax and not as a claim that LO is ready to run live trading infrastructure.

The finance opportunity is strongest around safe data handling, typed
messaging, auditability, deterministic maths, market data, event streams,
research workflows and integration with mature systems.

## External Projects To Learn From

QuickFIX is an open-source FIX engine for C++ with FIX 4.0 through 5.0 SP2 and
FIXT 1.1 support, language bindings, database-backed stores, SSL/TLS and
pluggable stores/logging. QuickFIX/J is the Java implementation and describes
FIX as a messaging standard for real-time securities transactions.

QuantLib is a free/open-source quantitative finance library for modelling,
trading and risk management. OpenGamma Strata is an open-source analytics and
market-risk Java library with modules for measures, calculation, loaders,
pricers, market data, products, data and basics.

Apache Kafka is a distributed event-streaming platform used for high-performance
data pipelines, streaming analytics, integration and mission-critical
applications. FINOS FDC3 is an open standard for financial desktop applications
to interoperate through app launching, context sharing and intents.

OpenBB shows the value of connecting proprietary, licensed and public financial
data sources into Python, REST APIs, dashboards and AI-agent workflows. GS Quant
shows how Python remains important for quant research, derivatives analysis,
trading strategies and risk-management workflows, while some APIs require
institutional credentials.

References:

- https://github.com/quickfix/quickfix
- https://github.com/quickfix-j/quickfixj
- https://www.quantlib.org/
- https://github.com/OpenGamma/Strata
- https://github.com/apache/kafka
- https://github.com/finos/FDC3
- https://github.com/OpenBB-finance/OpenBB
- https://github.com/goldmansachs/gs-quant

## Package Strategy

Start grouped:

```text
packages-lo/lo-finance-core/
```

Split later only after contracts are stable:

```text
packages-lo/lo-finance-core-math/
packages-lo/lo-finance-core-calendar/
packages-lo/lo-finance-core-market-data/
packages-lo/lo-finance-core-order/
packages-lo/lo-finance-core-fix/
packages-lo/lo-finance-core-audit/
packages-lo/lo-finance-core-compliance/
packages-lo/lo-finance-core-risk/
packages-lo/lo-finance-core-pricing/
packages-lo/lo-finance-core-products/
packages-lo/lo-finance-core-scenarios/
packages-lo/lo-finance-core-fdc3/
```

Keep general infrastructure outside finance:

```text
packages-lo/lo-stream/
packages-lo/lo-stream-kafka/
packages-lo/lo-schema-registry/
packages-lo/lo-ffi/
packages-lo/lo-ffi-cpp/
packages-lo/lo-ffi-java/
packages-lo/lo-ffi-python/
packages-lo/lo-replay/
packages-lo/lo-core-runtime-low-latency/
```

## First Phase

Build contracts in this order:

```text
lo-finance-core-math
lo-finance-core-calendar
lo-finance-core-market-data
lo-finance-core-audit
lo-finance-core-fix
```

This keeps the beta realistic. LO should first prove it can model financial
data, rounding, identifiers, timestamps, market events, validation and audit
evidence safely.

## Later Phases

After the base contracts are stable:

```text
lo-stream-kafka
lo-schema-registry
lo-ffi-cpp
lo-ffi-java
lo-ffi-python
lo-finance-core-risk
lo-finance-core-pricing
lo-finance-core-fdc3
lo-core-runtime-low-latency
lo-replay
```

Interop should be controlled by policy. A LO app may wrap mature C++, Java,
Python or TypeScript systems, but the wrapper must declare memory isolation,
network permissions, credentials policy, audit requirements and fallback
behaviour.

## Non-Goals

Do not start finance support by building:

```text
full stock exchange matching engine
HFT engine
broker-dealer platform
settlement system
clearing system
custody platform
trading advice engine
```

These are regulated and high-risk systems. LO beta work should focus on typed
contracts, validation, replay, audit and safe integration first.
