import { runHttpBenchmark } from "../runner";

await runHttpBenchmark({
  name: "Gin",
  buildCmd: ["go", "build", "-ldflags=-s -w", "-o", "server", "main.go"],
  startCmd: ["./server"],
  cwd: import.meta.dir,
});
