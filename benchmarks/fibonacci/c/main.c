#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

// Structure to store benchmark results
typedef struct
{
    long input;
    double time;
} BenchmarkResult;

// Fibonacci function
long fib(long n)
{
    if (n <= 1)
    {
        return n;
    }
    return fib(n - 1) + fib(n - 2);
}

// Timer helper function
double get_time_ms(struct timespec start, struct timespec end)
{
    return (end.tv_sec - start.tv_sec) * 1000.0 +
           (end.tv_nsec - start.tv_nsec) / 1e6;
}

int main()
{
    // Inputs: read from BENCHMARK_INPUTS env var (comma-separated) or fall back to defaults
    long inputs[64];
    size_t input_count = 0;
    const char *inputs_env = getenv("BENCHMARK_INPUTS");
    if (inputs_env)
    {
        char buf[512];
        strncpy(buf, inputs_env, sizeof(buf) - 1);
        buf[sizeof(buf) - 1] = '\0';
        char *tok = strtok(buf, ",");
        while (tok && input_count < 64)
        {
            inputs[input_count++] = atol(tok);
            tok = strtok(NULL, ",");
        }
    }
    else
    {
        long defaults[] = {1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 46, 47};
        input_count = sizeof(defaults) / sizeof(defaults[0]);
        memcpy(inputs, defaults, sizeof(defaults));
    }

    int iterations = 3;
    const char *iters_env = getenv("BENCHMARK_ITERATIONS");
    if (iters_env) iterations = atoi(iters_env);

    const char *output_file = getenv("BENCHMARK_OUTPUT");
    if (!output_file) output_file = "results.json";

    // Allocate memory for results
    size_t max_results = (size_t)iterations * input_count;
    BenchmarkResult *results = malloc(max_results * sizeof(BenchmarkResult));
    if (!results)
    {
        fprintf(stderr, "Failed to allocate memory for results\n");
        return 1;
    }
    size_t result_count = 0;

    // Perform the benchmark
    for (int iteration = 0; iteration < iterations; ++iteration)
    {
        for (size_t i = 0; i < input_count; ++i)
        {
            struct timespec start, end;

            clock_gettime(CLOCK_MONOTONIC, &start);
            long result = fib(inputs[i]);
            clock_gettime(CLOCK_MONOTONIC, &end);

            double time_ms = get_time_ms(start, end);

            // Store the result
            results[result_count].input = inputs[i];
            results[result_count].time = time_ms;
            result_count++;

            printf("fib(%lu) = %lu (took %.2f ms)\n", inputs[i], result, time_ms);
        }
    }

    // Create JSON output
    FILE *file = fopen(output_file, "w");
    if (!file)
    {
        fprintf(stderr, "Failed to open results.json for writing\n");
        free(results);
        return 1;
    }

    fprintf(file, "[\n");
    for (size_t i = 0; i < result_count; ++i)
    {
        fprintf(file, "  {\"input\": %lu, \"time\": %.2f}%s\n",
                results[i].input, results[i].time, (i + 1 < result_count) ? "," : "");
    }
    fprintf(file, "]\n");

    fclose(file);
    free(results);
    return 0;
}
