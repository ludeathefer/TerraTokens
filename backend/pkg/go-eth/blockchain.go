package blockchain

import (
	"context"
	"fmt"
	"log"
	"strings"
	"time"

	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ludeathfer/TerraTokens/backend/config"
)

type BlockchainClient struct {
	Client          *ethclient.Client
	Land            *Land
	ContractAddress common.Address
}

func NewConn(cfg config.BlockchainConfig) (*BlockchainClient, error) {
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
	return blockchainClient, nil
}

func CreateTransactor(ctx context.Context, client *ethclient.Client, privateKeyHex string) (*bind.TransactOpts, error) {

	privateKeyHex = strings.TrimPrefix(privateKeyHex, "0x")

	privateKey, err := crypto.HexToECDSA(privateKeyHex)
	if err != nil {
		log.Printf("PrivateKeyHex: %v", privateKeyHex)
		return nil, err
	}

	chainID, err := client.ChainID(ctx)
	if err != nil {
		return nil, err
	}

	auth, err := bind.NewKeyedTransactorWithChainID(privateKey, chainID)
	if err != nil {
		return nil, err
	}

	return auth, nil
}

func WaitForEvent(ctx context.Context, blockchainClient *BlockchainClient, txHash string) (*types.Log, error) {

	timeoutDuration := 2 * time.Second
	pollInterval := timeoutDuration / 4

	timeout := time.After(timeoutDuration)
	ticker := time.NewTicker(pollInterval)
	defer ticker.Stop()

	for {
		select {
		case <-timeout:
			return nil, fmt.Errorf("timeout: event not received within %v", timeoutDuration)

		case <-ticker.C:
			eventLog, err := checkForEvent(ctx, blockchainClient, txHash)
			if err == nil && eventLog != nil {
				return eventLog, nil
			}
		}
	}
}

func checkForEvent(ctx context.Context, blockchainClient *BlockchainClient, txHash string) (*types.Log, error) {
	query := ethereum.FilterQuery{
		Addresses: []common.Address{blockchainClient.ContractAddress},
	}

	logs, err := blockchainClient.Client.FilterLogs(ctx, query)
	if err != nil {
		return nil, fmt.Errorf("failed fetching logs: %v", err)
	}

	for _, vLog := range logs {
		if vLog.TxHash.Hex() == txHash {
			return &vLog, nil
		}
	}

	return nil, fmt.Errorf("event not found")
}
