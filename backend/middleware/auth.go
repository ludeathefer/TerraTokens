package middleware

import (
	"fmt"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/ludeathfer/TerraTokens/backend/config"
)

type Claims struct {
	PublicKey string   `json:"public_key"`
	Roles     []string `json:"roles"`
	jwt.RegisteredClaims
}

func GenerateToken(cfg config.JwtConfig, publicKey string, roles []string) (string, error) {
	tokenDuration, err := time.ParseDuration(cfg.JWTExpiration)
	if err != nil {
		return "", fmt.Errorf("failed parsing jwt expiration: %v", err)
	}

	expirationTime := time.Now().Add(tokenDuration)
	claims := &Claims{
		PublicKey: publicKey,
		Roles:     roles,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(cfg.JWTSecret))
	if err != nil {
		return "", fmt.Errorf("failed getting signed token: %v", err)
	}

	return tokenString, nil
}

const UserContextKey ContextKey = "user"
const RolesContextKey ContextKey = "roles"

func AuthMiddleware(cfg config.JwtConfig) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.Next()
			return
		}

		bearerToken := strings.Split(authHeader, "Bearer ")
		if len(bearerToken) != 2 {
			c.Next()
			return
		}

		tokenString := bearerToken[1]
		claims := &Claims{}

		token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (any, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				fmt.Println("Token invalid")
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return []byte(cfg.JWTSecret), nil
		})

		if err != nil || !token.Valid {
			c.Next()
			return
		}

		c.Set(string(UserContextKey), claims.PublicKey)
		c.Set(string(RolesContextKey), claims.Roles)

		c.Next()
	}
}
