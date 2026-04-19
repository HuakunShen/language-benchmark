package benchmark;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@SpringBootApplication
@RestController
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @GetMapping(value = "/text", produces = "text/plain")
    public String text() {
        return "Hello, World!";
    }

    @GetMapping("/json")
    public Response json() {
        return RESPONSE;
    }

    // Pre-built response object - serialized by Jackson on each request
    private static final Response RESPONSE = new Response(
        List.of(
            new User(1, "Alice Johnson", "alice@example.com", true,
                List.of(95.5, 87.3, 91.8, 78.2, 88.9),
                new Address("123 Main St", "Springfield", "IL", "62701", "US"),
                List.of("admin", "verified", "premium")),
            new User(2, "Bob Smith", "bob@example.com", false,
                List.of(72.1, 65.4, 80.9, 91.2, 77.8),
                new Address("456 Oak Ave", "Portland", "OR", "97201", "US"),
                List.of("user", "verified")),
            new User(3, "Charlie Brown", "charlie@example.com", true,
                List.of(88.4, 92.1, 76.5, 83.7, 95.2),
                new Address("789 Pine Rd", "Austin", "TX", "73301", "US"),
                List.of("user", "premium")),
            new User(4, "Diana Prince", "diana@example.com", true,
                List.of(99.1, 97.8, 95.5, 98.2, 96.7),
                new Address("321 Elm Blvd", "Seattle", "WA", "98101", "US"),
                List.of("admin", "verified", "premium", "moderator")),
            new User(5, "Eve Wilson", "eve@example.com", false,
                List.of(67.3, 71.2, 69.8, 74.5, 70.1),
                new Address("654 Maple Dr", "Denver", "CO", "80201", "US"),
                List.of("user"))
        ),
        new Metadata(5, 1, 10, 1),
        "2025-01-01T00:00:00Z"
    );

    public record Address(String street, String city, String state, String zip, String country) {}
    public record User(int id, String name, String email, boolean active,
                       List<Double> scores, Address address, List<String> tags) {}
    public record Metadata(int total, int page, int perPage, int totalPages) {}
    public record Response(List<User> users, Metadata metadata, String timestamp) {}
}
