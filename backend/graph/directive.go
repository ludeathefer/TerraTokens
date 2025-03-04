package graph

import (
	"context"
	"errors"
	"slices"

	"github.com/99designs/gqlgen/graphql"
	"github.com/ludeathfer/TerraTokens/backend/middleware"
)

func AuthDirective(ctx context.Context, obj any, next graphql.Resolver, requires []string) (any, error) {
	gc, err := GetGinContext(ctx)
	if err != nil {
		return nil, err
	}

	_, exists := gc.Get(string(middleware.UserContextKey))
	if !exists {
		return nil, errors.New("user not authenticated")
	}

	if len(requires) == 0 {
		return next(ctx)
	}

	userRoles := gc.GetStringSlice(string(middleware.RolesContextKey))
	if len(userRoles) == 0 {
		return nil, errors.New("insufficient permissions")
	}

	for _, requiredRole := range requires {
		if slices.Contains(userRoles, requiredRole) {
			return next(ctx)
		}
	}

	return nil, errors.New("insufficient permissions")
}
