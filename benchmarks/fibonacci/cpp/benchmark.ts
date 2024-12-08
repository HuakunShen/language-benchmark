import { $ } from "bun";

await $`mkdir -p build`;
await $`cmake .. -DCMAKE_BUILD_TYPE=Release`.cwd("build");
await $`cmake --build .`.cwd("build");
await $`./cpp`.cwd("build");
await $`cp build/results.json .`;
