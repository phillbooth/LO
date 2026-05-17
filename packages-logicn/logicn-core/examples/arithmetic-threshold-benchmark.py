import argparse
import json
import os
import platform
import sys
import time
import tracemalloc


def parse_args():
    parser = argparse.ArgumentParser(
        description="Deterministic arithmetic benchmark with time, CPU and memory stats."
    )
    parser.add_argument("--threshold", type=int, default=100_000_000_000_000)
    parser.add_argument("--no-tracemalloc", action="store_true", help="disable Python allocation tracing for raw loop speed")
    return parser.parse_args()


def validate(threshold):
    if threshold <= 0:
        raise ValueError("threshold must be a positive integer")


def get_optional_process_memory():
    try:
        import psutil  # type: ignore

        process = psutil.Process(os.getpid())
        info = process.memory_info()
        return {
            "rssBytes": int(info.rss),
            "vmsBytes": int(info.vms),
        }
    except Exception:
        return {
            "rssBytes": None,
            "vmsBytes": None,
        }


def run_arithmetic_threshold_benchmark(threshold, use_tracemalloc=True):
    if use_tracemalloc:
        tracemalloc.start()
    started_at = time.perf_counter()
    started_cpu = time.process_time()

    total = 0
    i = 0
    additions = 0

    while total <= threshold:
        total += i
        i += 1
        additions += 1

        total += i
        i += 1
        additions += 1

    elapsed_ms = (time.perf_counter() - started_at) * 1000
    cpu_ms = (time.process_time() - started_cpu) * 1000
    if use_tracemalloc:
        current_bytes, peak_bytes = tracemalloc.get_traced_memory()
    else:
        current_bytes, peak_bytes = None, None
    process_memory = get_optional_process_memory()
    if use_tracemalloc:
        tracemalloc.stop()

    return {
        "runtime": "python",
        "threshold": threshold,
        "total": total,
        "nextI": i,
        "additions": additions,
        "loopCycles": additions // 2,
        "elapsedMs": round(elapsed_ms, 3),
        "additionsPerSecond": round(additions / max(elapsed_ms / 1000, sys.float_info.epsilon), 2),
        "cpu": {
            "processMs": round(cpu_ms, 3),
        },
        "memory": {
            "tracemallocEnabled": use_tracemalloc,
            "tracemallocCurrentBytes": current_bytes,
            "tracemallocPeakBytes": peak_bytes,
            **process_memory,
        },
        "process": {
            "pid": os.getpid(),
            "python": sys.version.split()[0],
            "platform": platform.platform(),
            "machine": platform.machine(),
        },
    }


def main():
    args = parse_args()
    validate(args.threshold)
    report = run_arithmetic_threshold_benchmark(args.threshold, use_tracemalloc=not args.no_tracemalloc)
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(f"arithmetic benchmark failed: {exc}", file=sys.stderr)
        sys.exit(1)
