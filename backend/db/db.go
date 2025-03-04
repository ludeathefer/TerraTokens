package db

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
	"github.com/ludeathfer/TerraTokens/backend/config"
)

// NewDB initializes and returns a database connection.
func NewDB(cfg *config.DatabaseConfig) (*sql.DB, error) {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		cfg.Username,
		cfg.Password,
		cfg.Host,
		cfg.Port,
		cfg.DBName,
	)

	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, err
	}

	// Check if connection is valid
	if err := db.Ping(); err != nil {
		return nil, err
	}
	log.Println("Connected to database.")
	return db, nil
}

// AutoMigrate runs database migrations (manual table creation)
func AutoMigrate(db *sql.DB) error {
	// Create users table
	queryUsers := `
	CREATE TABLE IF NOT EXISTS users (
		id CHAR(36) PRIMARY KEY, -- UUID
		public_key VARCHAR(130) NOT NULL UNIQUE, -- Blockchain public key
		username VARCHAR(255) NOT NULL,
		phone VARCHAR(20) NOT NULL UNIQUE,
		email VARCHAR(255) UNIQUE NOT NULL,
		password TEXT NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);
	`
	_, err := db.Exec(queryUsers)
	if err != nil {
		return fmt.Errorf("failed to create users table: %w", err)
	}

	// Create roles table
	queryRoles := `
	CREATE TABLE IF NOT EXISTS roles (
		id SERIAL PRIMARY KEY, 
		name VARCHAR(50) UNIQUE NOT NULL,
		description TEXT
	);
	`
	_, err = db.Exec(queryRoles)
	if err != nil {
		return fmt.Errorf("failed to create roles table: %w", err)
	}

	// Create user_roles table (Many-to-Many)
	queryUserRoles := `
	CREATE TABLE IF NOT EXISTS user_roles (
		user_id CHAR(36) NOT NULL,
		role_id BIGINT UNSIGNED NOT NULL,
		PRIMARY KEY (user_id, role_id),
		FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
		FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
	);
	`
	_, err = db.Exec(queryUserRoles)
	if err != nil {
		return fmt.Errorf("failed to create user_roles table: %w", err)
	}

	// Create land_tokens table
	queryLandTokens := `
	CREATE TABLE IF NOT EXISTS land_tokens (
		id CHAR(36) PRIMARY KEY, -- UUID
		land_id INT NOT NULL,
		name VARCHAR(255) NOT NULL,
		total_tokens INT NOT NULL,
		current_price DOUBLE PRECISION NOT NULL DEFAULT 0.0,
		property_type VARCHAR(100) NOT NULL,
		property_size DOUBLE PRECISION NOT NULL,
		property_size_unit VARCHAR(20) NOT NULL,
		landmark VARCHAR(255) NOT NULL,
		distance_from_landmark DOUBLE PRECISION NOT NULL,
		distance_unit VARCHAR(20) NOT NULL,
		property_description TEXT,
		latitude VARCHAR(50) NOT NULL,
		longitude VARCHAR(50) NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);
	`
	_, err = db.Exec(queryLandTokens)
	if err != nil {
		return fmt.Errorf("failed to create land_tokens table: %w", err)
	}

	// Create prices table
	queryPrices := `
	CREATE TABLE IF NOT EXISTS prices (
		id SERIAL PRIMARY KEY,
		land_token_id CHAR(36) NOT NULL,
		date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		value DOUBLE PRECISION NOT NULL,
		FOREIGN KEY (land_token_id) REFERENCES land_tokens(id) ON DELETE CASCADE
	);
	`
	_, err = db.Exec(queryPrices)
	if err != nil {
		return fmt.Errorf("failed to create prices table: %w", err)
	}

	// Create owned_tokens table (User owns Land Tokens)
	queryOwnedTokens := `
	CREATE TABLE IF NOT EXISTS owned_tokens (
		id SERIAL PRIMARY KEY,
		user_id CHAR(36) NOT NULL,
		land_token_id CHAR(36) NOT NULL,
		quantity INT NOT NULL,
		FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
		FOREIGN KEY (land_token_id) REFERENCES land_tokens(id) ON DELETE CASCADE
	);
	`
	_, err = db.Exec(queryOwnedTokens)
	if err != nil {
		return fmt.Errorf("failed to create owned_tokens table: %w", err)
	}

	// Create sales table
	querySales := `
	CREATE TABLE IF NOT EXISTS sales (
		id SERIAL PRIMARY KEY,
		land_token_id CHAR(36) NOT NULL,
		quantity INT NOT NULL,
		price DOUBLE PRECISION NOT NULL,
		seller_id CHAR(36) NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY (land_token_id) REFERENCES land_tokens(id) ON DELETE CASCADE,
		FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE
	);
	`
	_, err = db.Exec(querySales)
	if err != nil {
		return fmt.Errorf("failed to create sales table: %w", err)
	}

	// Create bids table (Bidding system)
	queryBids := `
	CREATE TABLE IF NOT EXISTS bids (
		id SERIAL PRIMARY KEY,
		sale_id BIGINT UNSIGNED NOT NULL,
		price DOUBLE PRECISION NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY (sale_id) REFERENCES sales(id) ON DELETE CASCADE
	);
	`
	_, err = db.Exec(queryBids)
	if err != nil {
		return fmt.Errorf("failed to create bids table: %w", err)
	}

	// Create transacted_tokens table (Transaction History)
	queryTransactedTokens := `
	CREATE TABLE IF NOT EXISTS transacted_tokens (
		id SERIAL PRIMARY KEY,
		land_token_id CHAR(36) NOT NULL,
		quantity INT NOT NULL,
		price DOUBLE PRECISION NOT NULL,
		from_user CHAR(36),
		to_user CHAR(36),
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY (land_token_id) REFERENCES land_tokens(id) ON DELETE CASCADE,
		FOREIGN KEY (from_user) REFERENCES users(id) ON DELETE SET NULL,
		FOREIGN KEY (to_user) REFERENCES users(id) ON DELETE SET NULL
	);
	`
	_, err = db.Exec(queryTransactedTokens)
	if err != nil {
		return fmt.Errorf("failed to create transacted_tokens table: %w", err)
	}

	// Create watchlist table (Users watch specific Land Tokens)
	queryWatchlist := `
	CREATE TABLE IF NOT EXISTS watchlist (
		user_id CHAR(36) NOT NULL,
		land_token_id CHAR(36) NOT NULL,
		PRIMARY KEY (user_id, land_token_id),
		FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
		FOREIGN KEY (land_token_id) REFERENCES land_tokens(id) ON DELETE CASCADE
	);
	`
	_, err = db.Exec(queryWatchlist)
	if err != nil {
		return fmt.Errorf("failed to create watchlist table: %w", err)
	}

	// Insert default roles if they don't exist
	insertRolesQuery := `
		INSERT INTO roles (name, description)
		SELECT * FROM (SELECT 'admin', 'Administrator with full access') AS tmp
		WHERE NOT EXISTS (SELECT 1 FROM roles WHERE name = 'admin')
		LIMIT 1;
	`
	_, err = db.Exec(insertRolesQuery)
	if err != nil {
		return fmt.Errorf("failed to insert 'admin' role: %w", err)
	}

	insertRolesQuery = `
		INSERT INTO roles (name, description)
		SELECT * FROM (SELECT 'user', 'Regular user with limited access') AS tmp
		WHERE NOT EXISTS (SELECT 1 FROM roles WHERE name = 'user')
		LIMIT 1;
	`
	_, err = db.Exec(insertRolesQuery)
	if err != nil {
		return fmt.Errorf("failed to insert 'user' role: %w", err)
	}

	return nil
}
