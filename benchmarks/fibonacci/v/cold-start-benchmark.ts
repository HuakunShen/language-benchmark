import { $ } from "bun";
import path from "path";

const dir = import.meta.dir;
const configPath = path.resolve(dir, "../cold-start-config.json");
const outputPath = path.resolve(dir, "cold-start-results.json");

await $`v -prod src/main.v`;
await $`./src/main`.env({
  ...process.env,
  BENCHMARK_CONFIG: configPath,
  BENCHMARK_OUTPUT: outputPath,
});
await $`rm src/main`;
