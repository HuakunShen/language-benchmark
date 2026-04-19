import { $ } from "bun";
import path from "path";

const dir = import.meta.dir;
const outputPath = path.resolve(dir, "cold-start-results.json");

await $`zig build -Doptimize=ReleaseFast`;
await $`./zig-out/bin/zig`.env({
  ...process.env,
  BENCHMARK_INPUTS: "45",
  BENCHMARK_ITERATIONS: "3",
  BENCHMARK_OUTPUT: outputPath,
});
