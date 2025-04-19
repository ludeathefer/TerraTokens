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
	MinerAddress    common.Address
}

var db *sql.DB

func NewConn(cfg config.BlockchainConfig, database *sql.DB) (*BlockchainClient, error) {
	conn, err := ethclient.Dial(cfg.RpcUrl)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to rpc client: %v", err)
	}

	contractAddress := common.HexToAddress(cfg.ContractAddress)
	minerAddress := common.HexToAddress(cfg.MinerAddress)
	log.Printf("Miner address: %v %v", minerAddress, cfg.MinerAddress)

	land, err := NewLand(contractAddress, conn)
	if err != nil {
		return nil, fmt.Errorf("failed to instantiate Storage contract: %v", err)
	}

	blockchainClient := &BlockchainClient{
		Client:          conn,
		Land:            land,
		ContractAddress: contractAddress,
		MinerAddress:    minerAddress,
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

				updateMinerOwnedTokens := `
					INSERT INTO owned_tokens (user_public_key, land_token_id, quantity)
					VALUES (?, ?, ?)
					ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity);
				`
				_, err = db.ExecContext(ctx, updateMinerOwnedTokens, bcc.MinerAddress.String(), landId, numberOfFractions)
				if err != nil {
					log.Printf("failed to update miner's owned_tokens: %v", err)
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

				replaceSaleQuery := `
				REPLACE INTO sales (land_token_id, quantity, price, seller_id)
				VALUES (?, ?, ?, ?);
			`
				_, err = db.ExecContext(ctx, replaceSaleQuery, landId, amount, float32(pricePerToken), event.Seller.Hex())
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

				landId := int32(event.LandId.Int64())
				amount := int32(event.Amount.Int64())
				pricePerToken, _ := event.PricePerToken.Float64()

				updateSalesQuery := `UPDATE sales SET quantity = quantity - ? WHERE seller_id = ?;`
				_, err = db.ExecContext(ctx, updateSalesQuery, amount, event.Seller.Hex())
				if err != nil {
					log.Printf("failed to update sales table: %v", err)
				}

				updateBuyerOwnedTokens := `
								INSERT INTO owned_tokens (user_public_key, land_token_id, bought_price, quantity)
								VALUES (?, ?, ?)
								ON DUPLICATE KEY UPDATE 
								bought_price = VALUES(bought_price),
								quantity = quantity + VALUES(quantity);
				`
				_, err = db.ExecContext(ctx, updateBuyerOwnedTokens, event.Buyer.Hex(), landId, pricePerToken, amount)
				if err != nil {
					log.Printf("failed to update buyer owned_tokens: %v", err)
				}

				updateSellerOwnedTokens := `
						UPDATE owned_tokens SET quantity = quantity - ? WHERE user_public_key = ? AND land_token_id = ?;
				`
				_, err = db.ExecContext(ctx, updateSellerOwnedTokens, amount, event.Seller.Hex(), landId)
				if err != nil {
					log.Printf("failed to update seller owned_tokens: %v", err)
				}

				insertTransactedTokens := `
					INSERT INTO transacted_tokens (land_token_id, quantity, price, from_user, to_user)
					VALUES (?, ?, ?, ?, ?);
				`
				_, err = db.ExecContext(ctx, insertTransactedTokens, landId, amount, pricePerToken, event.Seller.Hex(), event.Buyer.Hex())
				if err != nil {
					log.Printf("failed to insert transacted tokens: %v", err)
				}

				deleteOwnedIfZero := `DELETE FROM owned_tokens WHERE user_public_key = ? AND quantity = 0;`
				_, err = db.ExecContext(ctx, deleteOwnedIfZero, event.Seller.Hex())
				if err != nil {
					log.Printf("failed to delete owned if quantity is zero: %v", err)
				}

				deleteSaleIfZero := `DELETE FROM sales WHERE seller_id = ? AND quantity = 0;`
				_, err = db.ExecContext(ctx, deleteSaleIfZero, event.Seller.Hex())
				if err != nil {
					log.Printf("failed to delete sale if quantity is zero: %v", err)
				}

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

				deleteSale := `DELETE FROM sales WHERE seller_id = ?`
				_, err = db.ExecContext(ctx, deleteSale, event.Seller.Hex())
				if err != nil {
					log.Printf("failed to delete sale: %v", err)
				}

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
