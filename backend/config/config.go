package config

import (
	"fmt"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

type BlockchainConfig struct {
	RpcUrl          string
	ContractAddress string
}

type JwtConfig struct {
	JWTSecret     string
	JWTExpiration string
}

type ServerConfig struct {
	Port string
	Mode string
}

type DatabaseConfig struct {
	Host     string
	Port     string
	Username string
	Password string
	DBName   string
}

type Config struct {
	Server     ServerConfig
	Database   DatabaseConfig
	JWT        JwtConfig
	Blockchain BlockchainConfig
}

func LoadConfig() *Config {
	// Load .env file
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}

	return &Config{
		Server: ServerConfig{
			Port: getEnv("SERVER_PORT", "8080"),
			Mode: getEnv("GIN_MODE", "debug"),
		},
		Database: DatabaseConfig{
			Host:     getEnv("DB_HOST", "localhost"),
			Port:     getEnv("DB_PORT", "3306"),
			Username: getEnv("DB_USER", "root"),
			Password: getEnv("DB_PASSWORD", "password"),
			DBName:   getEnv("DB_NAME", "database"),
		},
		JWT: JwtConfig{
			JWTSecret:     getEnv("JWT_SECRET", "lokistandsup"),
			JWTExpiration: getEnv("JWT_EXPIRATION", "24h"),
		},
		Blockchain: BlockchainConfig{
			RpcUrl:          getEnv("RPC_URL", "http://localhost:8085"),
			ContractAddress: getEnv("CONTRACT_ADDRESS", "0xg3ty0uraddr3551n3nvthi5i5no7g0ingt0w0rk"),
		},
	}
}

func getEnv(key, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
}

func getEnvAsInt(key string, defaultValue int64) int64 {
	if value, exists := os.LookupEnv(key); exists {
		intValue, err := strconv.ParseInt(value, 10, 64)
		if err == nil {
			return intValue
		}
	}
	return defaultValue
}

func getEnvAsBool(key string, defaultValue bool) bool {
	if value, exists := os.LookupEnv(key); exists {
		boolValue, err := strconv.ParseBool(value)
		if err == nil {
			return boolValue
		}
	}
	return defaultValue
}
