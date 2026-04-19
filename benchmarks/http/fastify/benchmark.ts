import { runHttpBenchmark } from "../runner";

await runHttpBenchmark({
  name: "Fastify",
  startCmd: ["node", "index.js"],
  cwd: import.meta.dir,
});
