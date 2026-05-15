import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";

import {
  createNetworkReport,
  defineNetworkPolicy,
  selectNetworkBackend,
  validateNetworkPolicy,
} from "../dist/index.js";

describe("logicn-core-network contracts", () => {
  it("defines deny-by-default TLS-first policy", () => {
    const policy = defineNetworkPolicy("default");

    assert.equal(policy.defaultEffect, "deny");
    assert.equal(policy.tls.requireTls, true);
    assert.equal(validateNetworkPolicy(policy).length, 0);
  });

  it("rejects plaintext HTTP, raw sockets and invalid ports", () => {
    const diagnostics = validateNetworkPolicy(
      defineNetworkPolicy("bad-network", {
        endpoints: [
          {
            direction: "outbound",
            protocol: "http",
            effect: "allow",
            hosts: ["api.example.com"],
          },
          {
            direction: "inbound",
            protocol: "rawSocket",
            effect: "allow",
            ports: [0],
          },
        ],
      }),
    );

    assert.equal(
      diagnostics.some(
        (diagnostic) =>
          diagnostic.code === "LogicN_NETWORK_PLAINTEXT_HTTP_ALLOWED",
      ),
      true,
    );
    assert.equal(
      diagnostics.some(
        (diagnostic) => diagnostic.code === "LogicN_NETWORK_RAW_SOCKET_DENIED",
      ),
      true,
    );
    assert.equal(
      diagnostics.some(
        (diagnostic) => diagnostic.code === "LogicN_NETWORK_PORT_INVALID",
      ),
      true,
    );
  });

  it("selects a safe network backend and reports fallback", () => {
    const selection = selectNetworkBackend(
      {
        prefer: ["dpdk", "ioUring", "buffered"],
        fallback: "buffered",
        requireSafeFallback: true,
      },
      [
        {
          backend: "dpdk",
          available: true,
          zeroCopy: true,
          requiresDedicatedCores: true,
          requiresElevatedPrivileges: true,
        },
        { backend: "ioUring", available: true, zeroCopy: false },
        { backend: "buffered", available: true, zeroCopy: false },
      ],
    );

    assert.equal(selection.selected, "ioUring");
    assert.equal(selection.fallback, true);
    assert.equal(selection.satisfied, true);
  });

  it("creates network reports with ports and hosts", () => {
    const report = createNetworkReport({
      policy: defineNetworkPolicy("api", {
        endpoints: [
          {
            direction: "inbound",
            protocol: "https",
            effect: "allow",
            ports: [443, 443],
          },
          {
            direction: "outbound",
            protocol: "https",
            effect: "allow",
            hosts: ["api.example.com"],
          },
        ],
      }),
    });

    assert.deepEqual(report.inboundPorts, [443]);
    assert.deepEqual(report.outboundHosts, ["api.example.com"]);
    assert.equal(report.plaintextAllowed, false);
    assert.equal(report.rawSocketsAllowed, false);
  });

  it("loads the secure API example as a valid network policy", async () => {
    const example = JSON.parse(
      await readFile(
        new URL("../examples/secure-api-network-policy.json", import.meta.url),
        "utf8",
      ),
    );
    const report = createNetworkReport({ policy: example, production: true });

    assert.equal(report.diagnostics.length, 0);
    assert.deepEqual(report.inboundPorts, [443]);
    assert.deepEqual(report.outboundHosts, ["payments.internal.example"]);
  });
});
