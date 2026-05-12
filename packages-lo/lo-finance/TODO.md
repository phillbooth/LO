# LO Finance TODO

- [ ] Define `lo-finance-math` contracts for decimal, money, currency, price,
  quantity, rate, basis points, rounding modes and reportable rounding.
- [ ] Define `lo-finance-calendar` contracts for exchange calendars, settlement
  calendars, holidays, business-day adjustment and trading sessions.
- [ ] Define `lo-finance-market-data` contracts for instruments, quotes, trades,
  order book levels, candles, snapshots and replayable market data events.
- [ ] Define `lo-finance-order` contracts for order lifecycle, execution
  reports, cancel/replace, fills, rejects and state transitions.
- [ ] Define `lo-finance-fix` contracts for FIX dictionaries, message parsing,
  validation, session state, sequence handling, TLS policy and stores.
- [ ] Define `lo-finance-audit` contracts for immutable finance event evidence,
  message hash chains, reconstruction and redacted evidence bundles.
- [ ] Define `lo-finance-risk` and `lo-finance-pricing` boundaries after the
  maths, market-data and audit contracts are stable.
- [ ] Decide when grouped contracts should split into separate packages.
- [ ] Keep exchange matching, HFT, broker-dealer, clearing, settlement and
  custody systems out of early beta scope.
