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

    const inputs = [_]u64{ 1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 46, 47 };

    for (0..3) |_| {
        for (inputs) |input| {
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
        "results.json",
        .{ .read = true },
    );
    defer file.close();

    try file.writeAll(json_string.items);
}
