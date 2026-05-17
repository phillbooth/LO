"use strict";

const DEFAULT_TARGET_MS = 20000;
const DEFAULT_WARMUP_MS = 2000;
const DEFAULT_BATCH_SIZE = 100000;
const DEFAULT_SEED = 123456789;

function parseIntegerFlag(name, fallback) {
  const index = process.argv.indexOf(name);
  if (index === -1) return fallback;
  const value = Number.parseInt(String(process.argv[index + 1] || "").replace(/_/g, ""), 10);
  if (!Number.isFinite(value)) {
    throw new Error(`Invalid integer for ${name}`);
  }
  return value;
}

function runBatch(state, batchSize) {
  let seed = state.seed >>> 0;
  let checksum = state.checksum >>> 0;

  for (let i = 0; i < batchSize; i += 1) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const mixed = Math.imul((seed ^ (seed >>> 16)) >>> 0, 2246822519) >>> 0;
    checksum = (checksum ^ mixed) >>> 0;
    if ((mixed & 1) === 1) {
      checksum = (checksum + mixed) >>> 0;
    } else {
      checksum = (checksum ^ ((mixed << 1) >>> 0)) >>> 0;
    }
  }

  state.seed = seed;
  state.checksum = checksum;
}

function elapsedMsSince(startedAt) {
  return Number(process.hrtime.bigint() - startedAt) / 1_000_000;
}

function validateConfig(config) {
  if (config.operations === null && (config.targetMs < 10000 || config.targetMs > 30000)) {
    throw new Error("--target-ms must be between 10000 and 30000 unless --operations is used");
  }
  if (config.warmupMs < 0) {
    throw new Error("--warmup-ms must be 0 or greater");
  }
  if (config.batchSize <= 0) {
    throw new Error("--batch-size must be greater than 0");
  }
  if (config.operations !== null && config.operations <= 0) {
    throw new Error("--operations must be greater than 0");
  }
}

function runBenchmark(config) {
  validateConfig(config);

  const state = {
    seed: config.seed >>> 0,
    checksum: 0
  };

  const warmupStartedAt = process.hrtime.bigint();
  if (config.warmupMs > 0) {
    while (elapsedMsSince(warmupStartedAt) < config.warmupMs) {
      runBatch(state, config.batchSize);
    }
  }

  const startedAt = process.hrtime.bigint();
  const startedCpu = process.cpuUsage();
  let operations = 0;

  if (config.operations !== null) {
    while (operations < config.operations) {
      const batch = Math.min(config.batchSize, config.operations - operations);
      runBatch(state, batch);
      operations += batch;
    }
  } else {
    while (elapsedMsSince(startedAt) < config.targetMs) {
      runBatch(state, config.batchSize);
      operations += config.batchSize;
    }
  }

  const elapsedMs = elapsedMsSince(startedAt);
  const cpu = process.cpuUsage(startedCpu);
  const memory = process.memoryUsage();
  const resource = typeof process.resourceUsage === "function" ? process.resourceUsage() : null;

  return {
    runtime: "nodejs",
    benchmark: "compute-mix-throughput",
    executionMode: "direct-nodejs",
    comparisonType: "direct-runtime",
    targetMs: config.targetMs,
    warmupMs: config.warmupMs,
    batchSize: config.batchSize,
    seed: config.seed,
    elapsedMs: Number(elapsedMs.toFixed(3)),
    operations,
    operationsPerSecond: Number((operations / Math.max(elapsedMs / 1000, Number.EPSILON)).toFixed(2)),
    checksum: state.checksum >>> 0,
    cpu: {
      userMs: Number((cpu.user / 1000).toFixed(3)),
      systemMs: Number((cpu.system / 1000).toFixed(3)),
      totalMs: Number(((cpu.user + cpu.system) / 1000).toFixed(3))
    },
    memory: {
      rssBytes: memory.rss,
      heapTotalBytes: memory.heapTotal,
      heapUsedBytes: memory.heapUsed,
      externalBytes: memory.external,
      arrayBuffersBytes: memory.arrayBuffers,
      maxRssBytes: resource ? resource.maxRSS * 1024 : null
    },
    process: {
      pid: process.pid,
      node: process.version,
      python: null,
      platform: process.platform,
      arch: process.arch
    },
    notes: []
  };
}

function main() {
  const config = {
    targetMs: parseIntegerFlag("--target-ms", DEFAULT_TARGET_MS),
    warmupMs: parseIntegerFlag("--warmup-ms", DEFAULT_WARMUP_MS),
    batchSize: parseIntegerFlag("--batch-size", DEFAULT_BATCH_SIZE),
    operations: parseIntegerFlag("--operations", null),
    seed: parseIntegerFlag("--seed", DEFAULT_SEED)
  };

  console.log(JSON.stringify(runBenchmark(config), null, 2));
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
