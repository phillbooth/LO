# LO Finance

`lo-finance-core` is a grouped beta package area for financial-market contracts. It
does not implement live trading, exchange matching, brokerage, settlement,
clearing or custody.

The first purpose is to define safe, typed finance primitives and integration
boundaries that can later split into smaller packages.

## Proposed Subpackages

Keep these as contracts inside `lo-finance-core` until the boundaries are stable:

```text
lo-finance-core-math
lo-finance-core-calendar
lo-finance-core-market-data
lo-finance-core-order
lo-finance-core-fix
lo-finance-core-audit
lo-finance-core-compliance
lo-finance-core-risk
lo-finance-core-pricing
lo-finance-core-products
lo-finance-core-scenarios
lo-finance-core-fdc3
```

General infrastructure packages should stay outside the finance namespace:

```text
lo-stream
lo-stream-kafka
lo-schema-registry
lo-ffi
lo-ffi-cpp
lo-ffi-java
lo-ffi-python
lo-replay
lo-core-runtime-low-latency
```

## First Package Contracts

`lo-finance-core-math` should own deterministic finance maths:

```text
Decimal128
Money
Currency
Price
Quantity
Rate
BasisPoint
Percentage
Notional
RoundingMode
```

Rules:

```text
no float money by default
no silent rounding
explicit currency conversion
explicit rounding mode
fixed scale where required
rounding decisions reportable
```

`lo-finance-core-market-data` should own market data contracts:

```text
InstrumentId
Exchange
TradingSession
Quote
TradeTick
OrderBookLevel
OHLC
MarketSnapshot
MarketDataSource
```

`lo-finance-core-fix` should own FIX protocol integration contracts:

```text
FIX dictionary references
FIX message validation
session state
sequence numbers
heartbeats
resend requests
reject handling
execution reports
order cancel/replace
message persistence policy
```

`lo-finance-core-audit` should own finance-specific audit and replay evidence:

```text
immutable event references
message hashes
order lifecycle reconstruction
risk decision reports
permission decision reports
redacted evidence bundles
```

## External Ecosystem To Study

- QuickFIX and QuickFIX/J for FIX messaging boundaries.
- QuantLib and OpenGamma Strata for pricing, products, curves and risk.
- Apache Kafka for event-streaming patterns.
- FINOS FDC3 for financial desktop context sharing and intents.
- OpenBB and GS Quant for data, quant research and Python workflow patterns.

These projects should inform LO package boundaries. They should not become LO
syntax, required runtime dependencies or proof that LO should replace mature
C++, Java, Python or TypeScript finance systems.

## Non-Goals

Do not start with:

```text
full exchange matching engine
HFT engine
broker-dealer platform
settlement system
clearing system
custody platform
regulated trading advice
```

Finance package work must remain explicit about risk, auditability, data
licensing, security review and regulatory boundaries.
