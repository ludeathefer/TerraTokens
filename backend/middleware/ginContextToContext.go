package middleware

import (
	"context"

	"github.com/gin-gonic/gin"
)

type ContextKey string

const GinContextKey ContextKey = "gck"

func GinContextToContextMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx := context.WithValue(c.Request.Context(), GinContextKey, c)
		c.Request = c.Request.WithContext(ctx)
		c.Next()
	}
}
