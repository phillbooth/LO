"use strict";

const { performance } = require("node:perf_hooks");

function parseArgs(argv) {
  const options = {
    threshold: 100_000_000_000_000,
  };

  for (let index = 2; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--threshold") {
      options.threshold = Number.parseInt(argv[index + 1] || "", 10);
      index += 1;
    } else if (arg === "--help") {
      options.help = true;
    }
  }

  return options;
}

function usage() {
  console.log("Usage: node packages-logicn/logicn-core/examples/arithmetic-threshold-benchmark.node.js --threshold 100000000000000");
}

function validate(threshold) {
  if (!Number.isSafeInteger(threshold) || threshold <= 0) {
    throw new Error("threshold must be a positive safe integer");
  }
}

function runArithmeticThresholdBenchmark(threshold) {
  const startedAt = performance.now();
  const startedCpu = process.cpuUsage();

  let total = 0;
  let i = 0;
  let additions = 0;

  while (total <= threshold) {
    total += i;
    i += 1;
    additions += 1;

    total += i;
    i += 1;
    additions += 1;
  }

  const elapsedMs = performance.now() - startedAt;
  const cpu = process.cpuUsage(startedCpu);
  const memory = process.memoryUsage();
  const resource = typeof process.resourceUsage === "function" ? process.resourceUsage() : null;

  return {
    runtime: "nodejs",
    threshold,
    total,
    nextI: i,
    additions,
    loopCycles: additions / 2,
    elapsedMs: Number(elapsedMs.toFixed(3)),
    additionsPerSecond: Number((additions / Math.max(elapsedMs / 1000, Number.EPSILON)).toFixed(2)),
    cpu: {
      userMs: Number((cpu.user / 1000).toFixed(3)),
      systemMs: Number((cpu.system / 1000).toFixed(3)),
      totalMs: Number(((cpu.user + cpu.system) / 1000).toFixed(3)),
    },
    memory: {
      rssBytes: memory.rss,
      heapTotalBytes: memory.heapTotal,
      heapUsedBytes: memory.heapUsed,
      externalBytes: memory.external,
      arrayBuffersBytes: memory.arrayBuffers,
      maxRssBytes: resource ? resource.maxRSS * 1024 : null,
    },
    process: {
      pid: process.pid,
      node: process.version,
      platform: process.platform,
      arch: process.arch,
    },
  };
}

function main() {
  const options = parseArgs(process.argv);
  if (options.help) {
    usage();
    return;
  }

  validate(options.threshold);
  const report = runArithmeticThresholdBenchmark(options.threshold);
  console.log(JSON.stringify(report, null, 2));
}

try {
  main();
} catch (error) {
  console.error(`arithmetic benchmark failed: ${error.message}`);
  process.exitCode = 1;
}
