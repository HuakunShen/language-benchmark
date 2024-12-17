module main

import os
import json
import time

fn fibonacci(n u64) u64 {
	if n <= 1 {
		return n
	}
	return fibonacci(n - 1) + fibonacci(n - 2)
}

struct Config {
	iterations u64
	inputs     []u64
}

struct Result {
	input u64
	time  f64
}

fn main() {
	// Read config file
	config_content := os.read_file('../config.json') or {
		println('Failed to read config file: ${err}')
		return
	}

	config := json.decode(Config, config_content) or {
		println('Failed to parse config: ${err}')
		return
	}

	println(config)

	mut results := []Result{}

	// Run benchmarks
	for i in 0 .. config.iterations {
		println('Running benchmark ${i + 1} of ${config.iterations}')
		for input in config.inputs {
			sw := time.new_stopwatch()
			output := fibonacci(input)
			elapsed := sw.elapsed().milliseconds()
			// Convert ticks to milliseconds
			println('Input: ${input}, Output: ${output}, Duration: ${elapsed} ms')
			results << Result{
				input: input
				time: elapsed
			}
		}
	}

	// Write results to file
	results_json := json.encode(results)
	os.write_file('results.json', results_json) or {
		println('Failed to write results: ${err}')
		return
	}
}
