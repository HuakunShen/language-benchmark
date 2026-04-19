# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A monorepo for benchmarking programming languages on identical algorithms. Currently implements **recursive Fibonacci** across 13 languages: Bun, Node.js, Python, Rust, C, C++, Go, Java, Swift, Deno, Zig, and V.

**Orchestration**: Bun + Turbo  
**Results storage**: PocketBase (remote, via CI secrets)

## Commands

```bash
# Run all benchmarks
bun run benchmark

# Clean all build artifacts
bun run clean

# Install dependencies
bun install

# Run a single language benchmark (from its directory)
cd benchmarks/fibonacci/<language>
bun run benchmark

# Clean a single language
bun run clean
```

## Architecture

### Adding a New Language

Each language lives at `benchmarks/<algorithm>/<language>/` and must have:

1. **`package.json`** with `benchmark` and `clean` scripts
2. **Implementation** that:
   - Reads `../config.json` for `{ iterations, inputs[] }`
   - Runs recursive fibonacci for each input, `iterations` times
   - Records execution time in milliseconds per invocation
   - Writes `results.json`: `[{ "input": N, "time": ms }, ...]`

### Adding a New Algorithm

Create `benchmarks/<algorithm>/` and replicate the per-language structure. Add a `config.json` for the algorithm's parameters.

### Shared Utilities

`common/ts/index.ts` exports `appendResults()` and `getRepoRoot()` — use these in TypeScript-based implementations.

### Orchestrator (`test/`)

`test/src/run.ts` discovers all `benchmarks/*/*/` directories with a `package.json` and runs `bun run clean` then `bun run benchmark` for each. Results are uploaded to PocketBase if `POCKETBASE_URL`, `POCKETBASE_USERNAME`, and `POCKETBASE_PASSWORD` are set.

### Compiled Languages

Some languages use a TypeScript wrapper script (`benchmark.ts`) that compiles then runs the native binary:
- **C**: GCC compilation via `bun benchmark.ts`
- **C++**: CMake build via `bun benchmark.ts`
- **Zig**: Zig build system

### CI

GitHub Actions (`.github/workflows/ci.yml`) runs on push, matrix across `ubuntu-latest` and `macos-latest`. Sets up all language toolchains. C++ requires `nlohmann-json` (installed via apt/brew).

## Results & Analysis

- `results.csv`: Raw benchmark data (input, time, algorithm, language)
- `analysis.ipynb`: Jupyter notebook for visualization
- `images/`: Generated performance charts
