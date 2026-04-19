import fs from "fs";

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const results = [];

const configPath = process.env.BENCHMARK_CONFIG ?? "../config.json";
const outputPath = process.env.BENCHMARK_OUTPUT ?? "results.json";
const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
console.log(config);
for (let i = 0; i < config.iterations; i++) {
  for (const x of config.inputs) {
    const start = performance.now();
    fibonacci(x);
    const end = performance.now();
    results.push({ input: x, time: end - start });
  }
}

fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
