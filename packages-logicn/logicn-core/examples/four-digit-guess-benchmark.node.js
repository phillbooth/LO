"use strict";

const { randomInt } = require("node:crypto");
const { performance } = require("node:perf_hooks");

function parseArgs(argv) {
const options = {
    target: "0420",
    maxAttempts: 100000,
    mode: "sequential",
  };

  for (let index = 2; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--target") {
      options.target = String(argv[index + 1] || "");
      index += 1;
    } else if (arg === "--max" || arg === "--max-attempts") {
      options.maxAttempts = Number.parseInt(argv[index + 1] || "", 10);
      index += 1;
    } else if (arg === "--mode") {
      options.mode = String(argv[index + 1] || "");
      index += 1;
    } else if (arg === "--help") {
      options.help = true;
    }
  }

  return options;
}

function usage() {
  console.log("Usage: node packages-logicn/logicn-core/examples/four-digit-guess-benchmark.node.js --target 0420 --max 100000 --mode sequential");
}

function validate(options) {
  if (!/^\d{4}$/.test(options.target)) {
    throw new Error("target must be exactly four digits, for example 0420");
  }

  if (!Number.isInteger(options.maxAttempts) || options.maxAttempts <= 0) {
    throw new Error("max attempts must be a positive integer");
  }

  if (options.maxAttempts > 10000000) {
    throw new Error("max attempts is capped at 10000000 for a local demo");
  }

  if (!["sequential", "random"].includes(options.mode)) {
    throw new Error("mode must be sequential or random");
  }
}

function formatCode(value) {
  return String(value).padStart(4, "0");
}

function guessFourDigitCode(target, maxAttempts, mode) {
  const startedAt = performance.now();
  const startedCpu = process.cpuUsage();

  let attempt = 0;
  let guessedValue = null;

  while (attempt < maxAttempts) {
    attempt += 1;
    const candidate = mode === "random" ? formatCode(randomInt(0, 10000)) : formatCode((attempt - 1) % 10000);

    if (candidate === target) {
      guessedValue = candidate;
      break;
    }
  }

  const elapsedMs = performance.now() - startedAt;
  const cpu = process.cpuUsage(startedCpu);
  const memory = process.memoryUsage();
  const resource = typeof process.resourceUsage === "function" ? process.resourceUsage() : null;
  const found = guessedValue !== null;

  return {
    runtime: "nodejs",
    mode,
    target,
    found,
    attempts: found ? attempt : maxAttempts,
    guessedValue,
    elapsedMs: Number(elapsedMs.toFixed(3)),
    attemptsPerSecond: Number(((found ? attempt : maxAttempts) / Math.max(elapsedMs / 1000, Number.EPSILON)).toFixed(2)),
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

  validate(options);
  const report = guessFourDigitCode(options.target, options.maxAttempts, options.mode);
  console.log(JSON.stringify(report, null, 2));
}

try {
  main();
} catch (error) {
  console.error(`four-digit benchmark failed: ${error.message}`);
  process.exitCode = 1;
}
