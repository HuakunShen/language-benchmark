package main

import (
	"encoding/json"
	"fmt"
	"os"
	"time"
)

func fibonacci(n uint64) uint64 {
	if n <= 1 {
		return n
	}
	return fibonacci(n-1) + fibonacci(n-2)
}

func main() {
	// Read config file
	configData, err := os.ReadFile("../config.json")
	if err != nil {
		fmt.Println("Error reading config file:", err)
		return
	}

	var config struct {
		Iterations int      `json:"iterations"`
		Inputs     []uint64 `json:"inputs"`
	}
	err = json.Unmarshal(configData, &config)
	if err != nil {
		fmt.Println("Error parsing config file:", err)
		return
	}

	fmt.Println(config)

	var results []map[string]interface{}

	for i := 0; i < config.Iterations; i++ {
		for _, x := range config.Inputs {
			start := time.Now()
			fibonacci(x)
			duration := time.Since(start).Seconds() * 1000.0 // Convert to milliseconds
			results = append(results, map[string]interface{}{
				"input": x,
				"time":  duration,
			})
		}
	}

	// Write results to file
	resultsJSON, err := json.MarshalIndent(results, "", "  ")
	if err != nil {
		fmt.Println("Error marshaling results:", err)
		return
	}

	err = os.WriteFile("results.json", resultsJSON, 0644)
	if err != nil {
		fmt.Println("Error writing results file:", err)
		return
	}
}
