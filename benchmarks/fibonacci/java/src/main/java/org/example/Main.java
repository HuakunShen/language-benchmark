package org.example;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static long fibonacci(long n) {
        if (n <= 1) {
            return n;
        }
        return fibonacci(n - 1) + fibonacci(n - 2);
    }

    public static void main(String[] args) throws IOException {
        // read ../config.json and get its "iterations" attribute
        String configStr = new String(Files.readAllBytes(Paths.get("../config.json")));
        ObjectMapper mapper = new ObjectMapper();
        JsonNode config = mapper.readTree(configStr);

        System.out.println(config);


        List<ObjectNode> results = new ArrayList<>();

        int iterations = config.path("iterations").asInt(0);
        ArrayNode inputs = (ArrayNode) config.path("inputs");

        for (int i = 0; i < iterations; i++) {
            for (JsonNode inputNode : inputs) {
                long input = inputNode.asLong(0);
                long startTime = System.nanoTime();
                long fib = fibonacci(input);
                long duration = System.nanoTime() - startTime;

                ObjectNode result = mapper.createObjectNode();
                result.put("input", input);
                result.put("time", duration / 1_000_000.0); // Convert nanoseconds to milliseconds
                results.add(result);
                System.out.println("fib(" + input + ") = " + fib + " took " + duration / 1_000_000.0 + "ms");
            }
        }

        // Write results to file
        ObjectNode resultsWrapper = mapper.createObjectNode();
        resultsWrapper.set("results", mapper.valueToTree(results));
        mapper.writerWithDefaultPrettyPrinter().writeValue(new File("results.json"), results);

    }
}