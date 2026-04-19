import { $ } from "bun";
import { runHttpBenchmark } from "../runner";
import { join } from "path";

const dir = import.meta.dir;
const tsconfigPath = join(dir, "tsconfig.json");

// Build TypeScript with explicit project path to avoid workspace tsconfig interference
await $`npx tsc -p ${tsconfigPath}`;

await runHttpBenchmark({
  name: "NestJS",
  startCmd: ["node", "dist/main.js"],
  cwd: dir,
});
