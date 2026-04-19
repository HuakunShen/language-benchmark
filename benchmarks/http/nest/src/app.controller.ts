import { Controller, Get, Header } from "@nestjs/common";

const jsonData = {
  users: [
    {
      id: 1, name: "Alice Johnson", email: "alice@example.com", active: true,
      scores: [95.5, 87.3, 91.8, 78.2, 88.9],
      address: { street: "123 Main St", city: "Springfield", state: "IL", zip: "62701", country: "US" },
      tags: ["admin", "verified", "premium"],
    },
    {
      id: 2, name: "Bob Smith", email: "bob@example.com", active: false,
      scores: [72.1, 65.4, 80.9, 91.2, 77.8],
      address: { street: "456 Oak Ave", city: "Portland", state: "OR", zip: "97201", country: "US" },
      tags: ["user", "verified"],
    },
    {
      id: 3, name: "Charlie Brown", email: "charlie@example.com", active: true,
      scores: [88.4, 92.1, 76.5, 83.7, 95.2],
      address: { street: "789 Pine Rd", city: "Austin", state: "TX", zip: "73301", country: "US" },
      tags: ["user", "premium"],
    },
    {
      id: 4, name: "Diana Prince", email: "diana@example.com", active: true,
      scores: [99.1, 97.8, 95.5, 98.2, 96.7],
      address: { street: "321 Elm Blvd", city: "Seattle", state: "WA", zip: "98101", country: "US" },
      tags: ["admin", "verified", "premium", "moderator"],
    },
    {
      id: 5, name: "Eve Wilson", email: "eve@example.com", active: false,
      scores: [67.3, 71.2, 69.8, 74.5, 70.1],
      address: { street: "654 Maple Dr", city: "Denver", state: "CO", zip: "80201", country: "US" },
      tags: ["user"],
    },
  ],
  metadata: { total: 5, page: 1, perPage: 10, totalPages: 1 },
  timestamp: "2025-01-01T00:00:00Z",
};

@Controller()
export class AppController {
  @Get("text")
  @Header("Content-Type", "text/plain")
  getText(): string {
    return "Hello, World!";
  }

  @Get("json")
  getJson() {
    return jsonData;
  }
}
