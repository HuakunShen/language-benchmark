const std = @import("std");
const json = std.json;

const BenchmarkResult = struct {
    input: u64,
    time: f64,
};

pub fn fib(n: u64) u64 {
    if (n <= 1) {
        return n;
    }
    return fib(n - 1) + fib(n - 2);
}

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    var results = std.ArrayList(BenchmarkResult).init(allocator);
    defer results.deinit();

    // Read inputs from BENCHMARK_INPUTS env var (comma-separated) or fall back to defaults
    var inputs_list = std.ArrayList(u64).init(allocator);
    defer inputs_list.deinit();
    var iterations: usize = 3;
    var output_path: []const u8 = "results.json";

    var env_map = try std.process.getEnvMap(allocator);
    defer env_map.deinit();

    if (env_map.get("BENCHMARK_INPUTS")) |inputs_env| {
        var it = std.mem.splitScalar(u8, inputs_env, ',');
        while (it.next()) |tok| {
            const n = try std.fmt.parseInt(u64, std.mem.trim(u8, tok, " "), 10);
            try inputs_list.append(n);
        }
    } else {
        const defaults = [_]u64{ 1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 46, 47, 48, 49, 50 };
        try inputs_list.appendSlice(&defaults);
    }

    if (env_map.get("BENCHMARK_ITERATIONS")) |iters_env| {
        iterations = try std.fmt.parseInt(usize, iters_env, 10);
    }
    if (env_map.get("BENCHMARK_OUTPUT")) |out_env| {
        output_path = out_env;
    }

    for (0..iterations) |_| {
        for (inputs_list.items) |input| {
            var timer = std.time.Timer.start() catch unreachable;
            const result = fib(input);
            const time = timer.read();
            const time_ms = @as(f64, @floatFromInt(time)) / 1_000_000.0;

            try results.append(.{
                .input = input,
                .time = time_ms,
            });

            std.debug.print("fib({}) = {} (took {d:.2} ms)\n", .{
                input,
                result,
                time_ms,
            });
        }
    }

    // Create JSON output
    var json_string = std.ArrayList(u8).init(allocator);
    defer json_string.deinit();

    try json.stringify(
        results.items,
        .{},
        json_string.writer(),
    );

    // Save to file
    const file = try std.fs.cwd().createFile(
        output_path,
        .{ .read = true },
    );
    defer file.close();

    try file.writeAll(json_string.items);
}
