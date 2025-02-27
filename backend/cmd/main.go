package main

import (
	"fmt"
	"terra-tokens/config"
	"terra-tokens/internal/routes"
	"terra-tokens/pkg/logger"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	logger.InitLogger()
	log := logger.GetLogger()

	cfg, err := config.LoadConfig()
	if err != nil {
		log.Error("Failed to load config.")
	}

	e := echo.New()
	e.Use(middleware.RequestLoggerWithConfig(logger.LoggerConfig))

	routes.RegisterRoutes(e)

	address := fmt.Sprintf(":%s", cfg.Port)
	log.Info("Starting server on port ", address)
	if err := e.Start(address); err != nil {
		log.Error("Failed to start server on port ", address, err.Error())
	}
}
