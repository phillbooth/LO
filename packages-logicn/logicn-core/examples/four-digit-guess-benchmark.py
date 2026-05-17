import argparse
import json
import os
import platform
import random
import sys
import time
import tracemalloc


def parse_args():
    parser = argparse.ArgumentParser(
        description="Local-only four-digit guessing benchmark with time, CPU and memory stats."
    )
    parser.add_argument("--target", default="0420", help="four digit target, for example 0420")
    parser.add_argument("--max", "--max-attempts", dest="max_attempts", type=int, default=100000)
    parser.add_argument("--mode", choices=["sequential", "random"], default="sequential")
    return parser.parse_args()


def validate(target, max_attempts):
    if len(target) != 4 or not target.isdigit():
        raise ValueError("target must be exactly four digits, for example 0420")

    if max_attempts <= 0:
        raise ValueError("max attempts must be a positive integer")

    if max_attempts > 10_000_000:
        raise ValueError("max attempts is capped at 10000000 for a local demo")


def format_code(value):
    return str(value).zfill(4)


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


def guess_four_digit_code(target, max_attempts, mode):
    tracemalloc.start()
    started_at = time.perf_counter()
    started_cpu = time.process_time()

    attempt = 0
    guessed_value = None

    while attempt < max_attempts:
        attempt += 1
        candidate = format_code(random.randrange(0, 10000) if mode == "random" else (attempt - 1) % 10000)

        if candidate == target:
            guessed_value = candidate
            break

    elapsed_ms = (time.perf_counter() - started_at) * 1000
    cpu_ms = (time.process_time() - started_cpu) * 1000
    current_bytes, peak_bytes = tracemalloc.get_traced_memory()
    process_memory = get_optional_process_memory()
    tracemalloc.stop()

    attempts = attempt if guessed_value is not None else max_attempts

    return {
        "runtime": "python",
        "mode": mode,
        "target": target,
        "found": guessed_value is not None,
        "attempts": attempts,
        "guessedValue": guessed_value,
        "elapsedMs": round(elapsed_ms, 3),
        "attemptsPerSecond": round(attempts / max(elapsed_ms / 1000, sys.float_info.epsilon), 2),
        "cpu": {
            "processMs": round(cpu_ms, 3),
        },
        "memory": {
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
    validate(args.target, args.max_attempts)
    report = guess_four_digit_code(args.target, args.max_attempts, args.mode)
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(f"four-digit benchmark failed: {exc}", file=sys.stderr)
        sys.exit(1)
