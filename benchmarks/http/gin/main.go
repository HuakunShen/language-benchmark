package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

type Address struct {
	Street  string `json:"street"`
	City    string `json:"city"`
	State   string `json:"state"`
	Zip     string `json:"zip"`
	Country string `json:"country"`
}

type User struct {
	ID      int       `json:"id"`
	Name    string    `json:"name"`
	Email   string    `json:"email"`
	Active  bool      `json:"active"`
	Scores  []float64 `json:"scores"`
	Address Address   `json:"address"`
	Tags    []string  `json:"tags"`
}

type Metadata struct {
	Total      int `json:"total"`
	Page       int `json:"page"`
	PerPage    int `json:"perPage"`
	TotalPages int `json:"totalPages"`
}

type Response struct {
	Users     []User   `json:"users"`
	Metadata  Metadata `json:"metadata"`
	Timestamp string   `json:"timestamp"`
}

var jsonData = Response{
	Users: []User{
		{
			ID: 1, Name: "Alice Johnson", Email: "alice@example.com", Active: true,
			Scores:  []float64{95.5, 87.3, 91.8, 78.2, 88.9},
			Address: Address{Street: "123 Main St", City: "Springfield", State: "IL", Zip: "62701", Country: "US"},
			Tags:    []string{"admin", "verified", "premium"},
		},
		{
			ID: 2, Name: "Bob Smith", Email: "bob@example.com", Active: false,
			Scores:  []float64{72.1, 65.4, 80.9, 91.2, 77.8},
			Address: Address{Street: "456 Oak Ave", City: "Portland", State: "OR", Zip: "97201", Country: "US"},
			Tags:    []string{"user", "verified"},
		},
		{
			ID: 3, Name: "Charlie Brown", Email: "charlie@example.com", Active: true,
			Scores:  []float64{88.4, 92.1, 76.5, 83.7, 95.2},
			Address: Address{Street: "789 Pine Rd", City: "Austin", State: "TX", Zip: "73301", Country: "US"},
			Tags:    []string{"user", "premium"},
		},
		{
			ID: 4, Name: "Diana Prince", Email: "diana@example.com", Active: true,
			Scores:  []float64{99.1, 97.8, 95.5, 98.2, 96.7},
			Address: Address{Street: "321 Elm Blvd", City: "Seattle", State: "WA", Zip: "98101", Country: "US"},
			Tags:    []string{"admin", "verified", "premium", "moderator"},
		},
		{
			ID: 5, Name: "Eve Wilson", Email: "eve@example.com", Active: false,
			Scores:  []float64{67.3, 71.2, 69.8, 74.5, 70.1},
			Address: Address{Street: "654 Maple Dr", City: "Denver", State: "CO", Zip: "80201", Country: "US"},
			Tags:    []string{"user"},
		},
	},
	Metadata:  Metadata{Total: 5, Page: 1, PerPage: 10, TotalPages: 1},
	Timestamp: "2025-01-01T00:00:00Z",
}

func main() {
	gin.SetMode(gin.ReleaseMode)
	r := gin.New()

	r.GET("/text", func(c *gin.Context) {
		c.String(http.StatusOK, "Hello, World!")
	})

	r.GET("/json", func(c *gin.Context) {
		c.JSON(http.StatusOK, jsonData)
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}
	fmt.Printf("Gin server listening on port %s\n", port)
	r.Run(":" + port)
}
