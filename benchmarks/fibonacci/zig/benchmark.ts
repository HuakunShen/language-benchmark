import {$} from 'bun'

console.log("Building...");
await $`zig build -Doptimize=ReleaseFast`
console.log("Running...");
await $`./zig-out/bin/zig`
