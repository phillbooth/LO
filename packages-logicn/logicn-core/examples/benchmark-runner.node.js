"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const DEFAULT_RUNS = 5;
const DEFAULT_TARGET_MS = 20000;
const DEFAULT_WARMUP_MS = 2000;
const DEFAULT_BATCH_SIZE = 100000;

function parseIntegerFlag(name, fallback) {
  const index = process.argv.indexOf(name);
  if (index === -1) return fallback;
  const value = Number.parseInt(String(process.argv[index + 1] || "").replace(/_/g, ""), 10);
  if (!Number.isFinite(value)) {
    throw new Error(`Invalid integer for ${name}`);
  }
  return value;
}

function parseStringFlag(name, fallback) {
  const index = process.argv.indexOf(name);
  if (index === -1) return fallback;
  return process.argv[index + 1] || fallback;
}

function buildBenchmarkArgs(config) {
  const args = [
    "--target-ms",
    String(config.targetMs),
    "--warmup-ms",
    String(config.warmupMs),
    "--batch-size",
    String(config.batchSize)
  ];
  if (config.operations !== null) {
    args.push("--operations", String(config.operations));
  }
  return args;
}

function parseJson(stdout, label) {
  const text = stdout.trim();
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) {
    throw new Error(`${label} did not emit JSON`);
  }
  return JSON.parse(text.slice(start, end + 1));
}

function runCommand(label, command, args) {
  const result = spawnSync(command, args, {
    cwd: path.resolve(__dirname, "..", "..", ".."),
    encoding: "utf8",
    windowsHide: true
  });

  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(`${label} failed:\n${result.stderr || result.stdout}`);
  }
  return parseJson(result.stdout, label);
}

function statistics(reports) {
  const values = reports.map((report) => report.operationsPerSecond).sort((a, b) => a - b);
  const mean = values.reduce((total, value) => total + value, 0) / values.length;
  const variance = values.reduce((total, value) => total + ((value - mean) ** 2), 0) / values.length;
  return {
    runs: values.length,
    bestOpsPerSecond: values[values.length - 1],
    worstOpsPerSecond: values[0],
    meanOpsPerSecond: Number(mean.toFixed(2)),
    medianOpsPerSecond: values[Math.floor(values.length / 2)],
    standardDeviation: Number(Math.sqrt(variance).toFixed(2)),
    medianElapsedMs: reports.map((report) => report.elapsedMs).sort((a, b) => a - b)[Math.floor(reports.length / 2)],
    checksumValues: Array.from(new Set(reports.map((report) => report.checksum)))
  };
}

function main() {
  const examplesDir = __dirname;
  const coreDir = path.resolve(examplesDir, "..");
  const repoRoot = path.resolve(coreDir, "..", "..");
  const config = {
    runs: parseIntegerFlag("--runs", DEFAULT_RUNS),
    targetMs: parseIntegerFlag("--target-ms", DEFAULT_TARGET_MS),
    warmupMs: parseIntegerFlag("--warmup-ms", DEFAULT_WARMUP_MS),
    batchSize: parseIntegerFlag("--batch-size", DEFAULT_BATCH_SIZE),
    operations: parseIntegerFlag("--operations", null),
    python: parseStringFlag("--python", "python")
  };

  const commonArgs = buildBenchmarkArgs(config);
  const commands = [
    {
      label: "logicn-prototype",
      command: process.execPath,
      args: [
        path.join(coreDir, "compiler", "logicn.js"),
        "run",
        path.join(examplesDir, "compute-mix-throughput-benchmark.lln"),
        ...commonArgs
      ]
    },
    {
      label: "nodejs",
      command: process.execPath,
      args: [path.join(examplesDir, "compute-mix-throughput-benchmark.node.js"), ...commonArgs]
    },
    {
      label: "python",
      command: config.python,
      args: [path.join(examplesDir, "compute-mix-throughput-benchmark.py"), ...commonArgs, "--no-tracemalloc"]
    }
  ];

  const results = {};
  for (const item of commands) {
    results[item.label] = [];
    for (let run = 1; run <= config.runs; run += 1) {
      const report = runCommand(`${item.label} run ${run}`, item.command, item.args);
      results[item.label].push(report);
      console.log(`${item.label} run ${run}: ${report.operationsPerSecond} ops/sec checksum=${report.checksum}`);
    }
  }

  const summary = {
    benchmark: "compute-mix-throughput",
    generatedAt: new Date().toISOString(),
    config,
    summary: Object.fromEntries(Object.entries(results).map(([label, reports]) => [label, statistics(reports)])),
    reports: results
  };

  const resultsDir = path.join(examplesDir, "benchmark-results");
  fs.mkdirSync(resultsDir, { recursive: true });
  const fileName = `compute-mix-throughput-${summary.generatedAt.replace(/[:.]/g, "-")}.json`;
  const outputPath = path.join(resultsDir, fileName);
  fs.writeFileSync(outputPath, JSON.stringify(summary, null, 2) + "\n", "utf8");

  console.log(JSON.stringify(summary.summary, null, 2));
  console.log(`Wrote ${path.relative(repoRoot, outputPath).replace(/\\/g, "/")}`);
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
