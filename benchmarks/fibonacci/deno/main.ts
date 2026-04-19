function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const results = [];

const configPath = Deno.env.get("BENCHMARK_CONFIG") ?? "../config.json";
const outputPath = Deno.env.get("BENCHMARK_OUTPUT") ?? "results.json";
const config = JSON.parse(await Deno.readTextFile(configPath));
console.log(config);
for (let i = 0; i < config.iterations; i++) {
  for (const x of config.inputs) {
    const start = performance.now();
    fibonacci(x);
    const end = performance.now();
    results.push({ input: x, time: end - start });
  }
}
console.log(results);

Deno.writeTextFileSync(outputPath, JSON.stringify(results, null, 2));
