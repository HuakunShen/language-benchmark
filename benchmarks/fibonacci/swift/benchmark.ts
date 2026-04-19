import { $ } from "bun";

console.log("Fibonacci benchmark in Swift");
await $`swiftc -O main.swift -o main`;
await $`./main`;
// remove the compiled file
await $`rm main`;
