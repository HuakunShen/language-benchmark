import Foundation

func fibonacci(_ n: Int) -> Int {
    if n <= 1 { return n }
    return fibonacci(n - 1) + fibonacci(n - 2)
}

// Read config file
let configURL = URL(fileURLWithPath: "../config.json")
guard let configData = try? Data(contentsOf: configURL),
    let config = try? JSONSerialization.jsonObject(with: configData, options: []) as? [String: Any]
else {
    fatalError("Failed to load or parse config.json")
}

print(config)

var results: [[String: Any]] = []

let iterations = config["iterations"] as? Int ?? 0
let inputs = config["inputs"] as? [Int] ?? []

for _ in 0..<iterations {
    for x in inputs {
        let start = DispatchTime.now()
        _ = fibonacci(x)
        let end = DispatchTime.now()
        let nanoTime = end.uptimeNanoseconds - start.uptimeNanoseconds
        let timeInterval = Double(nanoTime) / 1_000_000  // Convert to milliseconds

        results.append(["input": x, "time": timeInterval])
    }
}

// Write results to file
let resultsData = try! JSONSerialization.data(withJSONObject: results, options: [.prettyPrinted])
let resultsURL = URL(fileURLWithPath: "results.json")
try! resultsData.write(to: resultsURL)
