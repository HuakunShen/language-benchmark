#include <iostream>
#include <fstream>
#include <vector>
#include <chrono>
#include <nlohmann/json.hpp>

using json = nlohmann::json;
using namespace std;

// Function to calculate Fibonacci
long fibonacci(long n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    // Read configuration from JSON file
    const char* configEnv = std::getenv("BENCHMARK_CONFIG");
    std::string configPath = configEnv ? configEnv : "../../config.json";
    const char* outputEnv = std::getenv("BENCHMARK_OUTPUT");
    std::string outputPath = outputEnv ? outputEnv : "results.json";
    std::ifstream configFile(configPath);
    if (!configFile.is_open()) {
        cerr << "Could not open config.json file." << endl;
        return 1;
    }

    json config;
    configFile >> config;

    vector<json> results;

    // Iterate based on configuration
    for (int i = 0; i < config["iterations"]; ++i) {
        for (int x : config["inputs"]) {
            cout << "Calculating Fibonacci for " << x << endl;
            auto start = chrono::high_resolution_clock::now();
            auto result = fibonacci(x);
            cout << "Result: " << result << endl;
            auto end = chrono::high_resolution_clock::now();

            double duration = chrono::duration<double, std::milli>(end - start).count();
            cout << "Time taken: " << duration << "ms" << endl;
            results.push_back({{"input", x}, {"time", duration}});
        }
    }

    // Write results to JSON file
    std::ofstream resultsFile(outputPath);
    if (!resultsFile.is_open()) {
        cerr << "Could not open results.json file for writing." << endl;
        return 1;
    }

    resultsFile << json(results).dump(2);
    cout << "Results written to results.json" << endl;

    return 0;
}
