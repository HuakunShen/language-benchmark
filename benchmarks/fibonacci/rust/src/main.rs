use serde_json::{json, Value};
use std::fs;
use std::time::Instant;

fn fibonacci(n: u64) -> u64 {
    if n <= 1 {
        n
    } else {
        fibonacci(n - 1) + fibonacci(n - 2)
    }
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Read config file
    let config_str = fs::read_to_string("../config.json")?;
    let config: Value = serde_json::from_str(&config_str)?;

    println!("{}", config);

    let mut results = Vec::new();

    for _ in 0..config["iterations"].as_u64().unwrap_or(0) {
        for x in config["inputs"].as_array().unwrap_or(&Vec::new()) {
            let x = x.as_u64().unwrap_or(0);
            let start = Instant::now();
            fibonacci(x);
            let duration = start.elapsed();
            println!("fibonacci({}) = {}; took {}ms", x, fibonacci(x), duration.as_millis());
            results.push(json!({
                "input": x,
                "time": duration.as_secs_f64() * 1000.0 // Convert to milliseconds
            }));
        }
    }

    // Write results to file
    let results_json = serde_json::to_string_pretty(&results)?;
    fs::write("results.json", results_json)?;

    Ok(())
}
