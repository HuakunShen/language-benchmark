import json
import time

def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

def main():
    # Read config file
    try:
        with open('../config.json', 'r') as f:
            config = json.load(f)
    except Exception as e:
        print(f"Error reading config file: {e}")
        return

    print(config)

    results = []

    for i in range(config['iterations']):
        for x in config['inputs']:
            if x > 40:
                # will be too slow to run
                continue
            print(f"Running fibonacci({x}) {i+1}/{config['iterations']} times")
            start = time.time()
            fibonacci(x)
            duration = (time.time() - start) * 1000.0  # Convert to milliseconds
            results.append({
                "input": x,
                "time": duration,
            })

    # Write results to file
    try:
        with open('results.json', 'w') as f:
            json.dump(results, f, indent=2)
    except Exception as e:
        print(f"Error writing results file: {e}")
        return

if __name__ == "__main__":
    main()