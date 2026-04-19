import { runHttpBenchmark } from "../runner";

await runHttpBenchmark({
  name: "Express",
  startCmd: ["node", "index.js"],
  cwd: import.meta.dir,
});
