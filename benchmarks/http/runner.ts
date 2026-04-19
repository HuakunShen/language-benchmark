import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

interface Config {
  name: string;
  duration: number;
  connections: number;
  warmup: number;
  port: number;
  endpoints: string[];
}

interface BenchmarkResult {
  input: string;
  rps: number;
  latency_avg: number;
  latency_p50: number;
  latency_p99: number;
}

interface RunOptions {
  name: string;
  startCmd: string[];
  buildCmd?: string[];
  cwd: string;
}

export async function runHttpBenchmark(opts: RunOptions): Promise<void> {
  const configPath = join(opts.cwd, "..", "config.json");
  const config: Config = JSON.parse(readFileSync(configPath, "utf-8"));
  const { duration, connections, warmup, port, endpoints } = config;
  const baseUrl = `http://localhost:${port}`;

  // Build if needed
  if (opts.buildCmd) {
    console.log(`Building ${opts.name}...`);
    const build = Bun.spawn(opts.buildCmd, {
      cwd: opts.cwd,
      stdout: "inherit",
      stderr: "inherit",
    });
    const exitCode = await build.exited;
    if (exitCode !== 0) throw new Error(`Build failed with exit code ${exitCode}`);
  }

  // Start server
  console.log(`Starting ${opts.name} server...`);
  const server = Bun.spawn(opts.startCmd, {
    cwd: opts.cwd,
    stdout: "pipe",
    stderr: "pipe",
    env: { ...process.env, PORT: String(port) },
  });

  try {
    await waitForServer(baseUrl, 60000);
    console.log(`${opts.name} server is ready on port ${port}`);

    const results: BenchmarkResult[] = [];

    for (const endpoint of endpoints) {
      const url = `${baseUrl}/${endpoint}`;

      // Warmup
      console.log(`Warming up /${endpoint}...`);
      const warmupProc = Bun.spawn(
        ["bombardier", "-c", String(connections), "-d", `${warmup}s`, url],
        { stdout: "ignore", stderr: "ignore" }
      );
      await warmupProc.exited;

      // Measure
      console.log(
        `Benchmarking /${endpoint} for ${duration}s with ${connections} connections...`
      );
      const measureProc = Bun.spawn(
        [
          "bombardier",
          "-c",
          String(connections),
          "-d",
          `${duration}s`,
          "-l",
          "--format",
          "json",
          "--print",
          "r",
          url,
        ],
        { stdout: "pipe", stderr: "inherit" }
      );

      const output = await new Response(measureProc.stdout).text();
      await measureProc.exited;

      const data = JSON.parse(output);
      const latency = data.result.latency;
      const rps = data.result.rps;

      // bombardier reports latency in microseconds
      results.push({
        input: endpoint,
        rps: Math.round(rps.mean),
        latency_avg: +(latency.mean / 1000).toFixed(3),
        latency_p50: +((latency.percentiles?.["50"] ?? latency.mean) / 1000).toFixed(3),
        latency_p99: +((latency.percentiles?.["99"] ?? latency.max) / 1000).toFixed(3),
      });

      console.log(
        `  RPS: ${Math.round(rps.mean)} | Avg Latency: ${(latency.mean / 1000).toFixed(2)}ms`
      );
    }

    // Write results
    const resultsPath = join(opts.cwd, "results.json");
    writeFileSync(resultsPath, JSON.stringify(results, null, 2));
    console.log(`\n${opts.name} benchmark complete. Results written to results.json`);
  } finally {
    server.kill();
    await server.exited;
  }
}

async function waitForServer(
  baseUrl: string,
  timeoutMs: number
): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(`${baseUrl}/text`);
      if (res.ok) return;
    } catch {
      // Server not ready yet
    }
    await Bun.sleep(200);
  }
  throw new Error(`Server did not start within ${timeoutMs}ms`);
}
