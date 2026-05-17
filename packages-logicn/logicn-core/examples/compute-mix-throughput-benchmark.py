import argparse
import json
import os
import platform
import sys
import time
import tracemalloc

try:
    import resource
except ModuleNotFoundError:
    resource = None


DEFAULT_TARGET_MS = 20_000
DEFAULT_WARMUP_MS = 2_000
DEFAULT_BATCH_SIZE = 100_000
DEFAULT_SEED = 123_456_789
UINT32_MASK = 0xFFFFFFFF


def run_batch(seed, checksum, batch_size):
    for _ in range(batch_size):
        seed = ((seed * 1_664_525) + 1_013_904_223) & UINT32_MASK
        mixed = ((seed ^ (seed >> 16)) * 2_246_822_519) & UINT32_MASK
        checksum = (checksum ^ mixed) & UINT32_MASK
        if mixed & 1:
            checksum = (checksum + mixed) & UINT32_MASK
        else:
            checksum = (checksum ^ ((mixed << 1) & UINT32_MASK)) & UINT32_MASK
    return seed, checksum


def elapsed_ms(started_at):
    return (time.perf_counter() - started_at) * 1000


def validate_config(args):
    if args.operations is None and not 10_000 <= args.target_ms <= 30_000:
        raise ValueError("--target-ms must be between 10000 and 30000 unless --operations is used")
    if args.warmup_ms < 0:
        raise ValueError("--warmup-ms must be 0 or greater")
    if args.batch_size <= 0:
        raise ValueError("--batch-size must be greater than 0")
    if args.operations is not None and args.operations <= 0:
        raise ValueError("--operations must be greater than 0")


def memory_report(use_tracemalloc):
    report = {
        "rssBytes": None,
        "heapUsedBytes": None,
        "heapTotalBytes": None,
        "tracemallocCurrentBytes": None,
        "tracemallocPeakBytes": None,
        "maxRssBytes": None,
    }

    if use_tracemalloc:
        current, peak = tracemalloc.get_traced_memory()
        report["tracemallocCurrentBytes"] = current
        report["tracemallocPeakBytes"] = peak

    try:
        if resource is None:
            raise RuntimeError("resource module unavailable")
        usage = resource.getrusage(resource.RUSAGE_SELF)
        max_rss = usage.ru_maxrss
        if sys.platform == "win32":
            report["maxRssBytes"] = max_rss
        else:
            report["maxRssBytes"] = max_rss * 1024
    except Exception:
        report["maxRssBytes"] = None

    return report


def run_benchmark(args):
    validate_config(args)

    if args.tracemalloc:
        tracemalloc.start()

    seed = args.seed & UINT32_MASK
    checksum = 0

    warmup_started_at = time.perf_counter()
    if args.warmup_ms > 0:
        while elapsed_ms(warmup_started_at) < args.warmup_ms:
            seed, checksum = run_batch(seed, checksum, args.batch_size)

    started_at = time.perf_counter()
    started_cpu = time.process_time()
    operations = 0

    if args.operations is not None:
        while operations < args.operations:
            batch = min(args.batch_size, args.operations - operations)
            seed, checksum = run_batch(seed, checksum, batch)
            operations += batch
    else:
        while elapsed_ms(started_at) < args.target_ms:
            seed, checksum = run_batch(seed, checksum, args.batch_size)
            operations += args.batch_size

    elapsed = elapsed_ms(started_at)
    cpu_ms = (time.process_time() - started_cpu) * 1000

    return {
        "runtime": "python",
        "benchmark": "compute-mix-throughput",
        "executionMode": "direct-python",
        "comparisonType": "direct-runtime",
        "targetMs": args.target_ms,
        "warmupMs": args.warmup_ms,
        "batchSize": args.batch_size,
        "seed": args.seed,
        "elapsedMs": round(elapsed, 3),
        "operations": operations,
        "operationsPerSecond": round(operations / max(elapsed / 1000, sys.float_info.epsilon), 2),
        "checksum": checksum & UINT32_MASK,
        "cpu": {
            "userMs": None,
            "systemMs": None,
            "totalMs": round(cpu_ms, 3),
        },
        "memory": memory_report(args.tracemalloc),
        "process": {
            "pid": os.getpid(),
            "node": None,
            "python": platform.python_version(),
            "platform": platform.platform(),
            "arch": platform.machine(),
        },
        "notes": ["Memory tracing disabled for speed tests. Use --tracemalloc for diagnostics."]
        if not args.tracemalloc
        else ["Memory tracing enabled; do not use this run as the speed score."],
    }


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--target-ms", type=int, default=DEFAULT_TARGET_MS)
    parser.add_argument("--warmup-ms", type=int, default=DEFAULT_WARMUP_MS)
    parser.add_argument("--batch-size", type=int, default=DEFAULT_BATCH_SIZE)
    parser.add_argument("--operations", type=int, default=None)
    parser.add_argument("--seed", type=int, default=DEFAULT_SEED)
    parser.add_argument("--tracemalloc", action="store_true")
    parser.add_argument("--no-tracemalloc", action="store_true")
    args = parser.parse_args()
    if args.no_tracemalloc:
        args.tracemalloc = False
    return args


if __name__ == "__main__":
    try:
        print(json.dumps(run_benchmark(parse_args()), indent=2))
    except ValueError as error:
        print(str(error), file=sys.stderr)
        sys.exit(1)
