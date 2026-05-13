# LO OT Core

`lo-ot-core` is a grouped beta package area for operational-technology
integration contracts used by electrical, industrial and manufacturing domains.

It does not implement PLC safety systems, SCADA products, certified controllers
or direct equipment control.

## First Package Contracts

Start with:

```text
read-only telemetry gateways
host allowlists
network segmentation policy
protocol adapter boundaries
signed command envelopes
operator approval records
control attempt audit logs
OT security reports
```

## Proposed Protocol Packages

Keep these as contracts inside `lo-ot-core` until boundaries are stable:

```text
lo-ot-opcua
lo-ot-iec61850
lo-ot-modbus
lo-ot-mqtt
lo-ot-scada
```

## Security Boundary

Default rule:

```text
read-only by default
deny internet access from control networks
deny arbitrary scripts
deny unknown outbound hosts
deny write control unless signed, approved and explicitly policy-bound
audit every control attempt
```

OT packages should align with industrial cybersecurity patterns such as network
segmentation, least privilege, allowlists, signed changes and full audit trails.

## Non-Goals

Do not start with:

```text
PLC runtime replacement
SCADA product replacement
safety controller replacement
unsupervised switching
protection override
standards compliance claims
```
