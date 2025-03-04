package graph

//go:generate go run github.com/99designs/gqlgen generate

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/ludeathfer/TerraTokens/backend/config"
	"github.com/ludeathfer/TerraTokens/backend/middleware"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	Database *sql.DB
	Config   *config.Config
}

// GetGinContext extracts the Gin context from the context.Context
func GetGinContext(ctx context.Context) (*gin.Context, error) {
	ginContext := ctx.Value(middleware.GinContextKey)
	if ginContext == nil {
		return nil, fmt.Errorf("could not retrieve gin.Context")
	}

	gc, ok := ginContext.(*gin.Context)
	if !ok {
		return nil, fmt.Errorf("gin.Context has wrong type")
	}
	return gc, nil
}
