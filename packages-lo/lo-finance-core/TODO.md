# LO Finance TODO

- [ ] Define `lo-finance-core-math` contracts for decimal, money, currency, price,
  quantity, rate, basis points, rounding modes and reportable rounding.
- [ ] Define `lo-finance-core-calendar` contracts for exchange calendars, settlement
  calendars, holidays, business-day adjustment and trading sessions.
- [ ] Define `lo-finance-core-market-data` contracts for instruments, quotes, trades,
  order book levels, candles, snapshots and replayable market data events.
- [ ] Define `lo-finance-core-order` contracts for order lifecycle, execution
  reports, cancel/replace, fills, rejects and state transitions.
- [ ] Define `lo-finance-core-fix` contracts for FIX dictionaries, message parsing,
  validation, session state, sequence handling, TLS policy and stores.
- [ ] Define `lo-finance-core-audit` contracts for immutable finance event evidence,
  message hash chains, reconstruction and redacted evidence bundles.
- [ ] Define `lo-finance-core-risk` and `lo-finance-core-pricing` boundaries after the
  maths, market-data and audit contracts are stable.
- [ ] Decide when grouped contracts should split into separate packages.
- [ ] Keep exchange matching, HFT, broker-dealer, clearing, settlement and
  custody systems out of early beta scope.
