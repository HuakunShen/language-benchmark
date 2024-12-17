import {$} from 'bun'

await $`go build -ldflags="-s -w" main.go`
await $`./main`
await $`rm main`
