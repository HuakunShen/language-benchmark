import { runHttpBenchmark } from "../runner";

await runHttpBenchmark({
  name: "Elysia",
  startCmd: ["bun", "run", "index.ts"],
  cwd: import.meta.dir,
});
