package blockchain

import (
	"context"
	"database/sql"
	"fmt"
	"log"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ludeathfer/TerraTokens/backend/config"
)

type BlockchainClient struct {
	Client          *ethclient.Client
	Land            *Land
	ContractAddress common.Address
}

var db *sql.DB

func NewConn(cfg config.BlockchainConfig, database *sql.DB) (*BlockchainClient, error) {
	conn, err := ethclient.Dial(cfg.RpcUrl)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to rpc client: %v", err)
	}

	contractAddress := common.HexToAddress(cfg.ContractAddress)

	land, err := NewLand(contractAddress, conn)
	if err != nil {
		return nil, fmt.Errorf("failed to instantiate Storage contract: %v", err)
	}

	blockchainClient := &BlockchainClient{
		Client:          conn,
		Land:            land,
		ContractAddress: contractAddress,
	}

	db = database

	return blockchainClient, nil
}

func ListenToContractEvents(bcc *BlockchainClient) error {
	log.Printf("Listening...")
	// Instantiate the contract filterer
	contract, err := NewLandFilterer(bcc.ContractAddress, bcc.Client)
	if err != nil {
		return fmt.Errorf("failed to instantiate contract filterer: %v", err)
	}

	// Set up a background context
	ctx := context.Background()

	// Channel and subscription for LandFractionalized event
	landFractionalizedCh := make(chan *LandLandFractionalized)
	landFractionalizedSub, err := contract.WatchLandFractionalized(&bind.WatchOpts{Context: ctx}, landFractionalizedCh, nil)
	if err != nil {
		return fmt.Errorf("failed to subscribe to LandFractionalized event: %v", err)
	}

	// Channel and subscription for TransferFractionalTokens event
	transferTokensCh := make(chan *LandTransferFractionalTokens)
	transferTokensSub, err := contract.WatchTransferFractionalTokens(&bind.WatchOpts{Context: ctx}, transferTokensCh, nil, nil)
	if err != nil {
		return fmt.Errorf("failed to subscribe to TransferFractionalTokens event: %v", err)
	}

	// Channel and subscription for TokensListedForSale event
	tokensListedCh := make(chan *LandTokensListedForSale)
	tokensListedSub, err := contract.WatchTokensListedForSale(&bind.WatchOpts{Context: ctx}, tokensListedCh, nil, nil)
	if err != nil {
		return fmt.Errorf("failed to subscribe to TokensListedForSale event: %v", err)
	}

	// Channel and subscription for TokensPurchased event
	tokensPurchasedCh := make(chan *LandTokensPurchased)
	tokensPurchasedSub, err := contract.WatchTokensPurchased(&bind.WatchOpts{Context: ctx}, tokensPurchasedCh, nil, nil, nil)
	if err != nil {
		return fmt.Errorf("failed to subscribe to TokensPurchased event: %v", err)
	}

	// Channel and subscription for TokensListingCancelled event
	tokensCancelledCh := make(chan *LandTokensListingCancelled)
	tokensCancelledSub, err := contract.WatchTokensListingCancelled(&bind.WatchOpts{Context: ctx}, tokensCancelledCh, nil, nil)
	if err != nil {
		return fmt.Errorf("failed to subscribe to TokensListingCancelled event: %v", err)
	}

	// Start goroutines to handle each event
	// LandFractionalized
	go func() {
		for {
			select {
			case event, ok := <-landFractionalizedCh:
				if !ok {
					log.Println("landFractionalizedCh closed")
					return
				}
				log.Printf("LandFractionalized: LandID=%v, Name=%v, Fractions=%v, MetadataURI=%s\n", event.LandId, event.Name, event.NumberOfFractions, event.MetadataURI)
				landId := int32(event.LandId.Int64())
				numberOfFractions := int32(event.NumberOfFractions.Int64())

				query := `
				INSERT INTO land_tokens (
					land_id, name, total_tokens
				) VALUES (?, ?, ?);
			`
				_, err := db.ExecContext(ctx, query, landId, event.Name, numberOfFractions)
				if err != nil {
					log.Printf("Failed inserting landId %v into database: %v", landId, err)
				}

			case err := <-landFractionalizedSub.Err():
				if err != nil {
					log.Printf("LandFractionalized subscription error: %v", err)
				} else {
					log.Println("LandFractionalized subscription closed gracefully.")
				}
				return
			}
		}
	}()

	// TransferFractionalTokens
	go func() {
		log.Print("Listening to TransferFractionalTokens...")
		for {
			select {
			case event, ok := <-transferTokensCh:
				if !ok {
					log.Println("transferTokensCh closed")
					return
				}
				log.Printf("TransferFractionalTokens: From=%s, To=%s, LandID=%v, Amount=%v\n", event.From.Hex(), event.To.Hex(), event.LandId, event.Amount)

			case err := <-transferTokensSub.Err():
				if err != nil {
					log.Printf("TransferFractionalTokens subscription error: %v", err)
				} else {
					log.Println("TransferFractionalTokens subscription closed gracefully.")
				}
				return
			}
		}
	}()

	// TokensListedForSale
	go func() {
		log.Print("Listening to TokensListedForSale...")
		for {
			select {
			case event, ok := <-tokensListedCh:
				if !ok {
					log.Println("tokensListedCh closed")
					return
				}
				log.Printf("TokensListedForSale: LandID=%v, Seller=%s, Amount=%v, PricePerToken=%v\n", event.LandId, event.Seller.Hex(), event.Amount, event.PricePerToken)

				landId := int32(event.LandId.Int64())
				amount := int32(event.Amount.Int64())
				pricePerToken, _ := event.PricePerToken.Float64()

				query := `SELECT name FROM land_tokens WHERE land_id = ?`
				row := db.QueryRowContext(ctx, query, landId)

				var name string
				err := row.Scan(&name)
				if err == sql.ErrNoRows {
					log.Printf("Land token not found for land ID %v", landId)
					continue
				} else if err != nil {
					log.Printf("Failed to scan land token: %v", err)
					continue
				}

				insertSaleQuery := `
				INSERT INTO sales (land_token_id, quantity, price, seller_id)
				VALUES (?, ?, ?, ?);
			`
				_, err = db.ExecContext(ctx, insertSaleQuery, landId, amount, float32(pricePerToken), event.Seller.Hex())
				if err != nil {
					log.Printf("Failed to insert sale into database: %v", err)
				}

			case err := <-tokensListedSub.Err():
				if err != nil {
					log.Printf("TokensListedForSale subscription error: %v", err)
				} else {
					log.Println("TokensListedForSale subscription closed gracefully.")
				}
				return
			}
		}
	}()

	// TokensPurchased
	go func() {
		log.Print("Listening to TokensPurchased...")
		for {
			select {
			case event, ok := <-tokensPurchasedCh:
				if !ok {
					log.Println("tokensPurchasedCh closed")
					return
				}
				log.Printf("TokensPurchased: LandID=%v, Buyer=%s, Seller=%s, Amount=%v, PricePerToken=%v\n", event.LandId, event.Buyer.Hex(), event.Seller.Hex(), event.Amount, event.PricePerToken)

				// TODO: Handle the purchase logic (e.g., updating ownership, history etc.)

			case err := <-tokensPurchasedSub.Err():
				if err != nil {
					log.Printf("TokensPurchased subscription error: %v", err)
				} else {
					log.Println("TokensPurchased subscription closed gracefully.")
				}
				return
			}
		}
	}()

	// TokensListingCancelled
	go func() {
		log.Print("Listening to TokensListingCancelled...")
		for {
			select {
			case event, ok := <-tokensCancelledCh:
				if !ok {
					log.Println("tokensCancelledCh closed")
					return
				}
				log.Printf("TokensListingCancelled: LandID=%v, Seller=%s, Amount=%v, PricePerToken=%v\n", event.LandId, event.Seller.Hex(), event.Amount, event.PricePerToken)

				// TODO: Handle removing listing from DB if needed

			case err := <-tokensCancelledSub.Err():
				if err != nil {
					log.Printf("TokensListingCancelled subscription error: %v", err)
				} else {
					log.Println("TokensListingCancelled subscription closed gracefully.")
				}
				return
			}
		}
	}()

	return nil
}
