import { $ } from "bun";
import path from "path";

const dir = import.meta.dir;
const configPath = path.resolve(dir, "../cold-start-config.json");
const outputPath = path.resolve(dir, "cold-start-results.json");

await $`rm -rf build`;
await $`mkdir -p build`;
await $`cmake .. -DCMAKE_BUILD_TYPE=Release`.cwd("build");
await $`cmake --build .`.cwd("build");
await $`./cpp`.cwd("build").env({
  ...process.env,
  BENCHMARK_CONFIG: configPath,
  BENCHMARK_OUTPUT: outputPath,
});
