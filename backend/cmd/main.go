package main

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/ludeathfer/TerraTokens/backend/config"
	"github.com/ludeathfer/TerraTokens/backend/db"
	"github.com/ludeathfer/TerraTokens/backend/graph"
	"github.com/ludeathfer/TerraTokens/backend/middleware"
	blockchain "github.com/ludeathfer/TerraTokens/backend/pkg/go-eth"
	"github.com/vektah/gqlparser/v2/ast"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/lru"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/99designs/gqlgen/graphql/playground"
)

func graphqlHandler(database *sql.DB, blockchainClient *blockchain.BlockchainClient, cfg *config.Config) gin.HandlerFunc {
	// NewExecutableSchema and Config are in the generated.go file
	// Resolver is in the resolver.go file
	c := graph.Config{Resolvers: &graph.Resolver{Database: database, BlockchainClient: blockchainClient, Config: cfg}}
	c.Directives.Auth = graph.AuthDirective

	h := handler.New(graph.NewExecutableSchema(c))

	// Server setup:
	h.AddTransport(transport.Options{})
	h.AddTransport(transport.GET{})
	h.AddTransport(transport.POST{})

	h.SetQueryCache(lru.New[*ast.QueryDocument](1000))

	h.Use(extension.Introspection{})
	h.Use(extension.AutomaticPersistedQuery{
		Cache: lru.New[string](100),
	})

	return func(c *gin.Context) {
		h.ServeHTTP(c.Writer, c.Request)
	}

}

// Defining the Playground handler
func playgroundHandler() gin.HandlerFunc {
	h := playground.Handler("GraphQL", "/query")

	return func(c *gin.Context) {
		h.ServeHTTP(c.Writer, c.Request)
	}
}

func main() {
	// Load configuration
	cfg := config.LoadConfig()

	// Set Gin mode
	gin.SetMode(cfg.Server.Mode)

	// Initialize database
	database, err := db.NewDB(&cfg.Database)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	// Run migrations
	if err := db.AutoMigrate(database); err != nil {
		log.Fatalf("Failed to automigrate models: %v", err)
	}

	blockchainClient, err := blockchain.NewConn(cfg.Blockchain)
	if err != nil {
		log.Fatalf("%v", err)
	}

	r := gin.Default()

	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{"http://localhost:5173", "http://localhost:5174"}
	corsConfig.AllowHeaders = append(corsConfig.AllowHeaders, "Authorization")
	r.Use(cors.New(corsConfig))
	r.Use(middleware.GinContextToContextMiddleware())
	r.Use(middleware.AuthMiddleware(cfg.JWT))

	r.POST("/query", graphqlHandler(database, blockchainClient, cfg))
	r.GET("/playground", playgroundHandler())
	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Welcome to GraphQL API",
		})
	})

	log.Printf("Server starting on port %s", cfg.Server.Port)
	address := fmt.Sprintf(":%s", cfg.Server.Port)

	if err := r.Run(address); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
	r.Run()
}
