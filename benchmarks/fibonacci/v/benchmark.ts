import {$} from 'bun'

await $`v -prod src/main.v`
await $`./src/main`
await $`rm src/main`
