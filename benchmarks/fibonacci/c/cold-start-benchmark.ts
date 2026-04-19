import { $ } from "bun";
import path from "path";

const dir = import.meta.dir;
const outputPath = path.resolve(dir, "cold-start-results.json");

await $`gcc -O3 -o fibonacci main.c`;
await $`./fibonacci`.env({
  ...process.env,
  BENCHMARK_INPUTS: "45",
  BENCHMARK_ITERATIONS: "3",
  BENCHMARK_OUTPUT: outputPath,
});
