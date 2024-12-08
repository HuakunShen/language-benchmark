import config from "../config.json";

function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const results = [];

// const config = await Bun.file("../config.json").json();
console.log(config);
for (let i = 0; i < config.iterations; i++) {
  for (const x of config.inputs) {
    const start = performance.now();
    fibonacci(x);
    const end = performance.now();
    results.push({ input: x, time: end - start });
  }
}

Bun.write("results.json", JSON.stringify(results, null, 2));
