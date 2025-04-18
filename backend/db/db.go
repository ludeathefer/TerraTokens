package db

import (
	"fmt"
	"log"

	"github.com/ludeathfer/TerraTokens/backend/config"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// NewDB initializes and returns a database connection.
func NewDB(cfg *config.DatabaseConfig) (*gorm.DB, error) {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		cfg.Username,
		cfg.Password,
		cfg.Host,
		cfg.Port,
		cfg.DBName,
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	log.Println("Connected to database.")
	return db, nil
}
