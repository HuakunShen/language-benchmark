import { $ } from "bun";

console.log("Compiling and running C benchmark...");
await $`gcc -O3 -o fibonacci main.c`;
await $`./fibonacci`;
