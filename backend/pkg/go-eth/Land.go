// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package blockchain

import (
	"errors"
	"math/big"
	"strings"

	ethereum "github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/event"
)

// Reference imports to suppress errors if they are not otherwise used.
var (
	_ = errors.New
	_ = big.NewInt
	_ = strings.NewReader
	_ = ethereum.NotFound
	_ = bind.Bind
	_ = common.Big1
	_ = types.BloomLookup
	_ = event.NewSubscription
	_ = abi.ConvertType
)

// LandSaleOrder is an auto generated low-level Go binding around an user-defined struct.
type LandSaleOrder struct {
	Seller        common.Address
	LandId        *big.Int
	Amount        *big.Int
	PricePerToken *big.Int
}

// LandMetaData contains all meta data concerning the Land contract.
var LandMetaData = &bind.MetaData{
	ABI: "[{\"inputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"balance\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"needed\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"ERC1155InsufficientBalance\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"approver\",\"type\":\"address\"}],\"name\":\"ERC1155InvalidApprover\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"idsLength\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"valuesLength\",\"type\":\"uint256\"}],\"name\":\"ERC1155InvalidArrayLength\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"}],\"name\":\"ERC1155InvalidOperator\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"receiver\",\"type\":\"address\"}],\"name\":\"ERC1155InvalidReceiver\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"}],\"name\":\"ERC1155InvalidSender\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"ERC1155MissingApprovalForAll\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"OwnableInvalidOwner\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"OwnableUnauthorizedAccount\",\"type\":\"error\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"bool\",\"name\":\"approved\",\"type\":\"bool\"}],\"name\":\"ApprovalForAll\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"landId\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"numberOfFractions\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"string\",\"name\":\"metadataURI\",\"type\":\"string\"}],\"name\":\"LandFractionalized\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"landId\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"seller\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"pricePerToken\",\"type\":\"uint256\"}],\"name\":\"TokensListedForSale\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"landId\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"seller\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"pricePerToken\",\"type\":\"uint256\"}],\"name\":\"TokensListingCancelled\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"landId\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"buyer\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"seller\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"pricePerToken\",\"type\":\"uint256\"}],\"name\":\"TokensPurchased\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256[]\",\"name\":\"ids\",\"type\":\"uint256[]\"},{\"indexed\":false,\"internalType\":\"uint256[]\",\"name\":\"values\",\"type\":\"uint256[]\"}],\"name\":\"TransferBatch\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"landId\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"TransferFractionalTokens\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"TransferSingle\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"string\",\"name\":\"value\",\"type\":\"string\"},{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"}],\"name\":\"URI\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"activeSaleListings\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"seller\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"landId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"pricePerToken\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"}],\"name\":\"balanceOf\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address[]\",\"name\":\"accounts\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"ids\",\"type\":\"uint256[]\"}],\"name\":\"balanceOfBatch\",\"outputs\":[{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"landId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"pricePerToken\",\"type\":\"uint256\"}],\"name\":\"cancelTokenListing\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"metadataURI\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"numberOfFractions\",\"type\":\"uint256\"}],\"name\":\"fractionalizeLand\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"}],\"name\":\"isApprovedForAll\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"isFractionalized\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"landIdCounter\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"landId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"pricePerToken\",\"type\":\"uint256\"}],\"name\":\"listTokensForSale\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"landId\",\"type\":\"uint256\"},{\"components\":[{\"internalType\":\"address\",\"name\":\"seller\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"landId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"pricePerToken\",\"type\":\"uint256\"}],\"internalType\":\"structLand.SaleOrder[]\",\"name\":\"orders\",\"type\":\"tuple[]\"}],\"name\":\"purchaseTokens\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"renounceOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256[]\",\"name\":\"ids\",\"type\":\"uint256[]\"},{\"internalType\":\"uint256[]\",\"name\":\"values\",\"type\":\"uint256[]\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"safeBatchTransferFrom\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"safeTransferFrom\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"approved\",\"type\":\"bool\"}],\"name\":\"setApprovalForAll\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes4\",\"name\":\"interfaceId\",\"type\":\"bytes4\"}],\"name\":\"supportsInterface\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"totalFractions\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"landId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"transferFractionalTokens\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"landId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"pricePerToken\",\"type\":\"uint256\"}],\"name\":\"updateTokenListing\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"uri\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]",
}

// LandABI is the input ABI used to generate the binding from.
// Deprecated: Use LandMetaData.ABI instead.
var LandABI = LandMetaData.ABI

// Land is an auto generated Go binding around an Ethereum contract.
type Land struct {
	LandCaller     // Read-only binding to the contract
	LandTransactor // Write-only binding to the contract
	LandFilterer   // Log filterer for contract events
}

// LandCaller is an auto generated read-only Go binding around an Ethereum contract.
type LandCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// LandTransactor is an auto generated write-only Go binding around an Ethereum contract.
type LandTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// LandFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type LandFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// LandSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type LandSession struct {
	Contract     *Land             // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// LandCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type LandCallerSession struct {
	Contract *LandCaller   // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts // Call options to use throughout this session
}

// LandTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type LandTransactorSession struct {
	Contract     *LandTransactor   // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// LandRaw is an auto generated low-level Go binding around an Ethereum contract.
type LandRaw struct {
	Contract *Land // Generic contract binding to access the raw methods on
}

// LandCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type LandCallerRaw struct {
	Contract *LandCaller // Generic read-only contract binding to access the raw methods on
}

// LandTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type LandTransactorRaw struct {
	Contract *LandTransactor // Generic write-only contract binding to access the raw methods on
}

// NewLand creates a new instance of Land, bound to a specific deployed contract.
func NewLand(address common.Address, backend bind.ContractBackend) (*Land, error) {
	contract, err := bindLand(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &Land{LandCaller: LandCaller{contract: contract}, LandTransactor: LandTransactor{contract: contract}, LandFilterer: LandFilterer{contract: contract}}, nil
}

// NewLandCaller creates a new read-only instance of Land, bound to a specific deployed contract.
func NewLandCaller(address common.Address, caller bind.ContractCaller) (*LandCaller, error) {
	contract, err := bindLand(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &LandCaller{contract: contract}, nil
}

// NewLandTransactor creates a new write-only instance of Land, bound to a specific deployed contract.
func NewLandTransactor(address common.Address, transactor bind.ContractTransactor) (*LandTransactor, error) {
	contract, err := bindLand(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &LandTransactor{contract: contract}, nil
}

// NewLandFilterer creates a new log filterer instance of Land, bound to a specific deployed contract.
func NewLandFilterer(address common.Address, filterer bind.ContractFilterer) (*LandFilterer, error) {
	contract, err := bindLand(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &LandFilterer{contract: contract}, nil
}

// bindLand binds a generic wrapper to an already deployed contract.
func bindLand(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := LandMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Land *LandRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Land.Contract.LandCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Land *LandRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Land.Contract.LandTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Land *LandRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Land.Contract.LandTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Land *LandCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Land.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Land *LandTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Land.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Land *LandTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Land.Contract.contract.Transact(opts, method, params...)
}

// ActiveSaleListings is a free data retrieval call binding the contract method 0x8fdc85ce.
//
// Solidity: function activeSaleListings(address ) view returns(address seller, uint256 landId, uint256 amount, uint256 pricePerToken)
func (_Land *LandCaller) ActiveSaleListings(opts *bind.CallOpts, arg0 common.Address) (struct {
	Seller        common.Address
	LandId        *big.Int
	Amount        *big.Int
	PricePerToken *big.Int
}, error) {
	var out []interface{}
	err := _Land.contract.Call(opts, &out, "activeSaleListings", arg0)

	outstruct := new(struct {
		Seller        common.Address
		LandId        *big.Int
		Amount        *big.Int
		PricePerToken *big.Int
	})
	if err != nil {
		return *outstruct, err
	}

	outstruct.Seller = *abi.ConvertType(out[0], new(common.Address)).(*common.Address)
	outstruct.LandId = *abi.ConvertType(out[1], new(*big.Int)).(**big.Int)
	outstruct.Amount = *abi.ConvertType(out[2], new(*big.Int)).(**big.Int)
	outstruct.PricePerToken = *abi.ConvertType(out[3], new(*big.Int)).(**big.Int)

	return *outstruct, err

}

// ActiveSaleListings is a free data retrieval call binding the contract method 0x8fdc85ce.
//
// Solidity: function activeSaleListings(address ) view returns(address seller, uint256 landId, uint256 amount, uint256 pricePerToken)
func (_Land *LandSession) ActiveSaleListings(arg0 common.Address) (struct {
	Seller        common.Address
	LandId        *big.Int
	Amount        *big.Int
	PricePerToken *big.Int
}, error) {
	return _Land.Contract.ActiveSaleListings(&_Land.CallOpts, arg0)
}

// ActiveSaleListings is a free data retrieval call binding the contract method 0x8fdc85ce.
//
// Solidity: function activeSaleListings(address ) view returns(address seller, uint256 landId, uint256 amount, uint256 pricePerToken)
func (_Land *LandCallerSession) ActiveSaleListings(arg0 common.Address) (struct {
	Seller        common.Address
	LandId        *big.Int
	Amount        *big.Int
	PricePerToken *big.Int
}, error) {
	return _Land.Contract.ActiveSaleListings(&_Land.CallOpts, arg0)
}

// BalanceOf is a free data retrieval call binding the contract method 0x00fdd58e.
//
// Solidity: function balanceOf(address account, uint256 id) view returns(uint256)
func (_Land *LandCaller) BalanceOf(opts *bind.CallOpts, account common.Address, id *big.Int) (*big.Int, error) {
	var out []interface{}
	err := _Land.contract.Call(opts, &out, "balanceOf", account, id)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// BalanceOf is a free data retrieval call binding the contract method 0x00fdd58e.
//
// Solidity: function balanceOf(address account, uint256 id) view returns(uint256)
func (_Land *LandSession) BalanceOf(account common.Address, id *big.Int) (*big.Int, error) {
	return _Land.Contract.BalanceOf(&_Land.CallOpts, account, id)
}

// BalanceOf is a free data retrieval call binding the contract method 0x00fdd58e.
//
// Solidity: function balanceOf(address account, uint256 id) view returns(uint256)
func (_Land *LandCallerSession) BalanceOf(account common.Address, id *big.Int) (*big.Int, error) {
	return _Land.Contract.BalanceOf(&_Land.CallOpts, account, id)
}

// BalanceOfBatch is a free data retrieval call binding the contract method 0x4e1273f4.
//
// Solidity: function balanceOfBatch(address[] accounts, uint256[] ids) view returns(uint256[])
func (_Land *LandCaller) BalanceOfBatch(opts *bind.CallOpts, accounts []common.Address, ids []*big.Int) ([]*big.Int, error) {
	var out []interface{}
	err := _Land.contract.Call(opts, &out, "balanceOfBatch", accounts, ids)

	if err != nil {
		return *new([]*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new([]*big.Int)).(*[]*big.Int)

	return out0, err

}

// BalanceOfBatch is a free data retrieval call binding the contract method 0x4e1273f4.
//
// Solidity: function balanceOfBatch(address[] accounts, uint256[] ids) view returns(uint256[])
func (_Land *LandSession) BalanceOfBatch(accounts []common.Address, ids []*big.Int) ([]*big.Int, error) {
	return _Land.Contract.BalanceOfBatch(&_Land.CallOpts, accounts, ids)
}

// BalanceOfBatch is a free data retrieval call binding the contract method 0x4e1273f4.
//
// Solidity: function balanceOfBatch(address[] accounts, uint256[] ids) view returns(uint256[])
func (_Land *LandCallerSession) BalanceOfBatch(accounts []common.Address, ids []*big.Int) ([]*big.Int, error) {
	return _Land.Contract.BalanceOfBatch(&_Land.CallOpts, accounts, ids)
}

// IsApprovedForAll is a free data retrieval call binding the contract method 0xe985e9c5.
//
// Solidity: function isApprovedForAll(address account, address operator) view returns(bool)
func (_Land *LandCaller) IsApprovedForAll(opts *bind.CallOpts, account common.Address, operator common.Address) (bool, error) {
	var out []interface{}
	err := _Land.contract.Call(opts, &out, "isApprovedForAll", account, operator)

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// IsApprovedForAll is a free data retrieval call binding the contract method 0xe985e9c5.
//
// Solidity: function isApprovedForAll(address account, address operator) view returns(bool)
func (_Land *LandSession) IsApprovedForAll(account common.Address, operator common.Address) (bool, error) {
	return _Land.Contract.IsApprovedForAll(&_Land.CallOpts, account, operator)
}

// IsApprovedForAll is a free data retrieval call binding the contract method 0xe985e9c5.
//
// Solidity: function isApprovedForAll(address account, address operator) view returns(bool)
func (_Land *LandCallerSession) IsApprovedForAll(account common.Address, operator common.Address) (bool, error) {
	return _Land.Contract.IsApprovedForAll(&_Land.CallOpts, account, operator)
}

// IsFractionalized is a free data retrieval call binding the contract method 0xb86b19de.
//
// Solidity: function isFractionalized(uint256 ) view returns(bool)
func (_Land *LandCaller) IsFractionalized(opts *bind.CallOpts, arg0 *big.Int) (bool, error) {
	var out []interface{}
	err := _Land.contract.Call(opts, &out, "isFractionalized", arg0)

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// IsFractionalized is a free data retrieval call binding the contract method 0xb86b19de.
//
// Solidity: function isFractionalized(uint256 ) view returns(bool)
func (_Land *LandSession) IsFractionalized(arg0 *big.Int) (bool, error) {
	return _Land.Contract.IsFractionalized(&_Land.CallOpts, arg0)
}

// IsFractionalized is a free data retrieval call binding the contract method 0xb86b19de.
//
// Solidity: function isFractionalized(uint256 ) view returns(bool)
func (_Land *LandCallerSession) IsFractionalized(arg0 *big.Int) (bool, error) {
	return _Land.Contract.IsFractionalized(&_Land.CallOpts, arg0)
}

// LandIdCounter is a free data retrieval call binding the contract method 0xf1807e5c.
//
// Solidity: function landIdCounter() view returns(uint256)
func (_Land *LandCaller) LandIdCounter(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _Land.contract.Call(opts, &out, "landIdCounter")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// LandIdCounter is a free data retrieval call binding the contract method 0xf1807e5c.
//
// Solidity: function landIdCounter() view returns(uint256)
func (_Land *LandSession) LandIdCounter() (*big.Int, error) {
	return _Land.Contract.LandIdCounter(&_Land.CallOpts)
}

// LandIdCounter is a free data retrieval call binding the contract method 0xf1807e5c.
//
// Solidity: function landIdCounter() view returns(uint256)
func (_Land *LandCallerSession) LandIdCounter() (*big.Int, error) {
	return _Land.Contract.LandIdCounter(&_Land.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_Land *LandCaller) Owner(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _Land.contract.Call(opts, &out, "owner")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_Land *LandSession) Owner() (common.Address, error) {
	return _Land.Contract.Owner(&_Land.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_Land *LandCallerSession) Owner() (common.Address, error) {
	return _Land.Contract.Owner(&_Land.CallOpts)
}

// SupportsInterface is a free data retrieval call binding the contract method 0x01ffc9a7.
//
// Solidity: function supportsInterface(bytes4 interfaceId) view returns(bool)
func (_Land *LandCaller) SupportsInterface(opts *bind.CallOpts, interfaceId [4]byte) (bool, error) {
	var out []interface{}
	err := _Land.contract.Call(opts, &out, "supportsInterface", interfaceId)

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// SupportsInterface is a free data retrieval call binding the contract method 0x01ffc9a7.
//
// Solidity: function supportsInterface(bytes4 interfaceId) view returns(bool)
func (_Land *LandSession) SupportsInterface(interfaceId [4]byte) (bool, error) {
	return _Land.Contract.SupportsInterface(&_Land.CallOpts, interfaceId)
}

// SupportsInterface is a free data retrieval call binding the contract method 0x01ffc9a7.
//
// Solidity: function supportsInterface(bytes4 interfaceId) view returns(bool)
func (_Land *LandCallerSession) SupportsInterface(interfaceId [4]byte) (bool, error) {
	return _Land.Contract.SupportsInterface(&_Land.CallOpts, interfaceId)
}

// TotalFractions is a free data retrieval call binding the contract method 0x766de47f.
//
// Solidity: function totalFractions(uint256 ) view returns(uint256)
func (_Land *LandCaller) TotalFractions(opts *bind.CallOpts, arg0 *big.Int) (*big.Int, error) {
	var out []interface{}
	err := _Land.contract.Call(opts, &out, "totalFractions", arg0)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// TotalFractions is a free data retrieval call binding the contract method 0x766de47f.
//
// Solidity: function totalFractions(uint256 ) view returns(uint256)
func (_Land *LandSession) TotalFractions(arg0 *big.Int) (*big.Int, error) {
	return _Land.Contract.TotalFractions(&_Land.CallOpts, arg0)
}

// TotalFractions is a free data retrieval call binding the contract method 0x766de47f.
//
// Solidity: function totalFractions(uint256 ) view returns(uint256)
func (_Land *LandCallerSession) TotalFractions(arg0 *big.Int) (*big.Int, error) {
	return _Land.Contract.TotalFractions(&_Land.CallOpts, arg0)
}

// Uri is a free data retrieval call binding the contract method 0x0e89341c.
//
// Solidity: function uri(uint256 ) view returns(string)
func (_Land *LandCaller) Uri(opts *bind.CallOpts, arg0 *big.Int) (string, error) {
	var out []interface{}
	err := _Land.contract.Call(opts, &out, "uri", arg0)

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Uri is a free data retrieval call binding the contract method 0x0e89341c.
//
// Solidity: function uri(uint256 ) view returns(string)
func (_Land *LandSession) Uri(arg0 *big.Int) (string, error) {
	return _Land.Contract.Uri(&_Land.CallOpts, arg0)
}

// Uri is a free data retrieval call binding the contract method 0x0e89341c.
//
// Solidity: function uri(uint256 ) view returns(string)
func (_Land *LandCallerSession) Uri(arg0 *big.Int) (string, error) {
	return _Land.Contract.Uri(&_Land.CallOpts, arg0)
}

// CancelTokenListing is a paid mutator transaction binding the contract method 0xee0db7eb.
//
// Solidity: function cancelTokenListing(uint256 landId, uint256 amount, uint256 pricePerToken) returns()
func (_Land *LandTransactor) CancelTokenListing(opts *bind.TransactOpts, landId *big.Int, amount *big.Int, pricePerToken *big.Int) (*types.Transaction, error) {
	return _Land.contract.Transact(opts, "cancelTokenListing", landId, amount, pricePerToken)
}

// CancelTokenListing is a paid mutator transaction binding the contract method 0xee0db7eb.
//
// Solidity: function cancelTokenListing(uint256 landId, uint256 amount, uint256 pricePerToken) returns()
func (_Land *LandSession) CancelTokenListing(landId *big.Int, amount *big.Int, pricePerToken *big.Int) (*types.Transaction, error) {
	return _Land.Contract.CancelTokenListing(&_Land.TransactOpts, landId, amount, pricePerToken)
}

// CancelTokenListing is a paid mutator transaction binding the contract method 0xee0db7eb.
//
// Solidity: function cancelTokenListing(uint256 landId, uint256 amount, uint256 pricePerToken) returns()
func (_Land *LandTransactorSession) CancelTokenListing(landId *big.Int, amount *big.Int, pricePerToken *big.Int) (*types.Transaction, error) {
	return _Land.Contract.CancelTokenListing(&_Land.TransactOpts, landId, amount, pricePerToken)
}

// FractionalizeLand is a paid mutator transaction binding the contract method 0x4a687aaa.
//
// Solidity: function fractionalizeLand(string metadataURI, uint256 numberOfFractions) returns()
func (_Land *LandTransactor) FractionalizeLand(opts *bind.TransactOpts, metadataURI string, numberOfFractions *big.Int) (*types.Transaction, error) {
	return _Land.contract.Transact(opts, "fractionalizeLand", metadataURI, numberOfFractions)
}

// FractionalizeLand is a paid mutator transaction binding the contract method 0x4a687aaa.
//
// Solidity: function fractionalizeLand(string metadataURI, uint256 numberOfFractions) returns()
func (_Land *LandSession) FractionalizeLand(metadataURI string, numberOfFractions *big.Int) (*types.Transaction, error) {
	return _Land.Contract.FractionalizeLand(&_Land.TransactOpts, metadataURI, numberOfFractions)
}

// FractionalizeLand is a paid mutator transaction binding the contract method 0x4a687aaa.
//
// Solidity: function fractionalizeLand(string metadataURI, uint256 numberOfFractions) returns()
func (_Land *LandTransactorSession) FractionalizeLand(metadataURI string, numberOfFractions *big.Int) (*types.Transaction, error) {
	return _Land.Contract.FractionalizeLand(&_Land.TransactOpts, metadataURI, numberOfFractions)
}

// ListTokensForSale is a paid mutator transaction binding the contract method 0xa379c877.
//
// Solidity: function listTokensForSale(uint256 landId, uint256 amount, uint256 pricePerToken) returns()
func (_Land *LandTransactor) ListTokensForSale(opts *bind.TransactOpts, landId *big.Int, amount *big.Int, pricePerToken *big.Int) (*types.Transaction, error) {
	return _Land.contract.Transact(opts, "listTokensForSale", landId, amount, pricePerToken)
}

// ListTokensForSale is a paid mutator transaction binding the contract method 0xa379c877.
//
// Solidity: function listTokensForSale(uint256 landId, uint256 amount, uint256 pricePerToken) returns()
func (_Land *LandSession) ListTokensForSale(landId *big.Int, amount *big.Int, pricePerToken *big.Int) (*types.Transaction, error) {
	return _Land.Contract.ListTokensForSale(&_Land.TransactOpts, landId, amount, pricePerToken)
}

// ListTokensForSale is a paid mutator transaction binding the contract method 0xa379c877.
//
// Solidity: function listTokensForSale(uint256 landId, uint256 amount, uint256 pricePerToken) returns()
func (_Land *LandTransactorSession) ListTokensForSale(landId *big.Int, amount *big.Int, pricePerToken *big.Int) (*types.Transaction, error) {
	return _Land.Contract.ListTokensForSale(&_Land.TransactOpts, landId, amount, pricePerToken)
}

// PurchaseTokens is a paid mutator transaction binding the contract method 0x58b3605c.
//
// Solidity: function purchaseTokens(uint256 landId, (address,uint256,uint256,uint256)[] orders) payable returns()
func (_Land *LandTransactor) PurchaseTokens(opts *bind.TransactOpts, landId *big.Int, orders []LandSaleOrder) (*types.Transaction, error) {
	return _Land.contract.Transact(opts, "purchaseTokens", landId, orders)
}

// PurchaseTokens is a paid mutator transaction binding the contract method 0x58b3605c.
//
// Solidity: function purchaseTokens(uint256 landId, (address,uint256,uint256,uint256)[] orders) payable returns()
func (_Land *LandSession) PurchaseTokens(landId *big.Int, orders []LandSaleOrder) (*types.Transaction, error) {
	return _Land.Contract.PurchaseTokens(&_Land.TransactOpts, landId, orders)
}

// PurchaseTokens is a paid mutator transaction binding the contract method 0x58b3605c.
//
// Solidity: function purchaseTokens(uint256 landId, (address,uint256,uint256,uint256)[] orders) payable returns()
func (_Land *LandTransactorSession) PurchaseTokens(landId *big.Int, orders []LandSaleOrder) (*types.Transaction, error) {
	return _Land.Contract.PurchaseTokens(&_Land.TransactOpts, landId, orders)
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_Land *LandTransactor) RenounceOwnership(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Land.contract.Transact(opts, "renounceOwnership")
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_Land *LandSession) RenounceOwnership() (*types.Transaction, error) {
	return _Land.Contract.RenounceOwnership(&_Land.TransactOpts)
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_Land *LandTransactorSession) RenounceOwnership() (*types.Transaction, error) {
	return _Land.Contract.RenounceOwnership(&_Land.TransactOpts)
}

// SafeBatchTransferFrom is a paid mutator transaction binding the contract method 0x2eb2c2d6.
//
// Solidity: function safeBatchTransferFrom(address from, address to, uint256[] ids, uint256[] values, bytes data) returns()
func (_Land *LandTransactor) SafeBatchTransferFrom(opts *bind.TransactOpts, from common.Address, to common.Address, ids []*big.Int, values []*big.Int, data []byte) (*types.Transaction, error) {
	return _Land.contract.Transact(opts, "safeBatchTransferFrom", from, to, ids, values, data)
}

// SafeBatchTransferFrom is a paid mutator transaction binding the contract method 0x2eb2c2d6.
//
// Solidity: function safeBatchTransferFrom(address from, address to, uint256[] ids, uint256[] values, bytes data) returns()
func (_Land *LandSession) SafeBatchTransferFrom(from common.Address, to common.Address, ids []*big.Int, values []*big.Int, data []byte) (*types.Transaction, error) {
	return _Land.Contract.SafeBatchTransferFrom(&_Land.TransactOpts, from, to, ids, values, data)
}

// SafeBatchTransferFrom is a paid mutator transaction binding the contract method 0x2eb2c2d6.
//
// Solidity: function safeBatchTransferFrom(address from, address to, uint256[] ids, uint256[] values, bytes data) returns()
func (_Land *LandTransactorSession) SafeBatchTransferFrom(from common.Address, to common.Address, ids []*big.Int, values []*big.Int, data []byte) (*types.Transaction, error) {
	return _Land.Contract.SafeBatchTransferFrom(&_Land.TransactOpts, from, to, ids, values, data)
}

// SafeTransferFrom is a paid mutator transaction binding the contract method 0xf242432a.
//
// Solidity: function safeTransferFrom(address from, address to, uint256 id, uint256 value, bytes data) returns()
func (_Land *LandTransactor) SafeTransferFrom(opts *bind.TransactOpts, from common.Address, to common.Address, id *big.Int, value *big.Int, data []byte) (*types.Transaction, error) {
	return _Land.contract.Transact(opts, "safeTransferFrom", from, to, id, value, data)
}

// SafeTransferFrom is a paid mutator transaction binding the contract method 0xf242432a.
//
// Solidity: function safeTransferFrom(address from, address to, uint256 id, uint256 value, bytes data) returns()
func (_Land *LandSession) SafeTransferFrom(from common.Address, to common.Address, id *big.Int, value *big.Int, data []byte) (*types.Transaction, error) {
	return _Land.Contract.SafeTransferFrom(&_Land.TransactOpts, from, to, id, value, data)
}

// SafeTransferFrom is a paid mutator transaction binding the contract method 0xf242432a.
//
// Solidity: function safeTransferFrom(address from, address to, uint256 id, uint256 value, bytes data) returns()
func (_Land *LandTransactorSession) SafeTransferFrom(from common.Address, to common.Address, id *big.Int, value *big.Int, data []byte) (*types.Transaction, error) {
	return _Land.Contract.SafeTransferFrom(&_Land.TransactOpts, from, to, id, value, data)
}

// SetApprovalForAll is a paid mutator transaction binding the contract method 0xa22cb465.
//
// Solidity: function setApprovalForAll(address operator, bool approved) returns()
func (_Land *LandTransactor) SetApprovalForAll(opts *bind.TransactOpts, operator common.Address, approved bool) (*types.Transaction, error) {
	return _Land.contract.Transact(opts, "setApprovalForAll", operator, approved)
}

// SetApprovalForAll is a paid mutator transaction binding the contract method 0xa22cb465.
//
// Solidity: function setApprovalForAll(address operator, bool approved) returns()
func (_Land *LandSession) SetApprovalForAll(operator common.Address, approved bool) (*types.Transaction, error) {
	return _Land.Contract.SetApprovalForAll(&_Land.TransactOpts, operator, approved)
}

// SetApprovalForAll is a paid mutator transaction binding the contract method 0xa22cb465.
//
// Solidity: function setApprovalForAll(address operator, bool approved) returns()
func (_Land *LandTransactorSession) SetApprovalForAll(operator common.Address, approved bool) (*types.Transaction, error) {
	return _Land.Contract.SetApprovalForAll(&_Land.TransactOpts, operator, approved)
}

// TransferFractionalTokens is a paid mutator transaction binding the contract method 0xafe9b7da.
//
// Solidity: function transferFractionalTokens(address to, uint256 landId, uint256 amount) returns()
func (_Land *LandTransactor) TransferFractionalTokens(opts *bind.TransactOpts, to common.Address, landId *big.Int, amount *big.Int) (*types.Transaction, error) {
	return _Land.contract.Transact(opts, "transferFractionalTokens", to, landId, amount)
}

// TransferFractionalTokens is a paid mutator transaction binding the contract method 0xafe9b7da.
//
// Solidity: function transferFractionalTokens(address to, uint256 landId, uint256 amount) returns()
func (_Land *LandSession) TransferFractionalTokens(to common.Address, landId *big.Int, amount *big.Int) (*types.Transaction, error) {
	return _Land.Contract.TransferFractionalTokens(&_Land.TransactOpts, to, landId, amount)
}

// TransferFractionalTokens is a paid mutator transaction binding the contract method 0xafe9b7da.
//
// Solidity: function transferFractionalTokens(address to, uint256 landId, uint256 amount) returns()
func (_Land *LandTransactorSession) TransferFractionalTokens(to common.Address, landId *big.Int, amount *big.Int) (*types.Transaction, error) {
	return _Land.Contract.TransferFractionalTokens(&_Land.TransactOpts, to, landId, amount)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_Land *LandTransactor) TransferOwnership(opts *bind.TransactOpts, newOwner common.Address) (*types.Transaction, error) {
	return _Land.contract.Transact(opts, "transferOwnership", newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_Land *LandSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _Land.Contract.TransferOwnership(&_Land.TransactOpts, newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_Land *LandTransactorSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _Land.Contract.TransferOwnership(&_Land.TransactOpts, newOwner)
}

// UpdateTokenListing is a paid mutator transaction binding the contract method 0x2e8a0f2b.
//
// Solidity: function updateTokenListing(uint256 landId, uint256 amount, uint256 pricePerToken) returns()
func (_Land *LandTransactor) UpdateTokenListing(opts *bind.TransactOpts, landId *big.Int, amount *big.Int, pricePerToken *big.Int) (*types.Transaction, error) {
	return _Land.contract.Transact(opts, "updateTokenListing", landId, amount, pricePerToken)
}

// UpdateTokenListing is a paid mutator transaction binding the contract method 0x2e8a0f2b.
//
// Solidity: function updateTokenListing(uint256 landId, uint256 amount, uint256 pricePerToken) returns()
func (_Land *LandSession) UpdateTokenListing(landId *big.Int, amount *big.Int, pricePerToken *big.Int) (*types.Transaction, error) {
	return _Land.Contract.UpdateTokenListing(&_Land.TransactOpts, landId, amount, pricePerToken)
}

// UpdateTokenListing is a paid mutator transaction binding the contract method 0x2e8a0f2b.
//
// Solidity: function updateTokenListing(uint256 landId, uint256 amount, uint256 pricePerToken) returns()
func (_Land *LandTransactorSession) UpdateTokenListing(landId *big.Int, amount *big.Int, pricePerToken *big.Int) (*types.Transaction, error) {
	return _Land.Contract.UpdateTokenListing(&_Land.TransactOpts, landId, amount, pricePerToken)
}

// LandApprovalForAllIterator is returned from FilterApprovalForAll and is used to iterate over the raw logs and unpacked data for ApprovalForAll events raised by the Land contract.
type LandApprovalForAllIterator struct {
	Event *LandApprovalForAll // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *LandApprovalForAllIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(LandApprovalForAll)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(LandApprovalForAll)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *LandApprovalForAllIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *LandApprovalForAllIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// LandApprovalForAll represents a ApprovalForAll event raised by the Land contract.
type LandApprovalForAll struct {
	Account  common.Address
	Operator common.Address
	Approved bool
	Raw      types.Log // Blockchain specific contextual infos
}

// FilterApprovalForAll is a free log retrieval operation binding the contract event 0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31.
//
// Solidity: event ApprovalForAll(address indexed account, address indexed operator, bool approved)
func (_Land *LandFilterer) FilterApprovalForAll(opts *bind.FilterOpts, account []common.Address, operator []common.Address) (*LandApprovalForAllIterator, error) {

	var accountRule []interface{}
	for _, accountItem := range account {
		accountRule = append(accountRule, accountItem)
	}
	var operatorRule []interface{}
	for _, operatorItem := range operator {
		operatorRule = append(operatorRule, operatorItem)
	}

	logs, sub, err := _Land.contract.FilterLogs(opts, "ApprovalForAll", accountRule, operatorRule)
	if err != nil {
		return nil, err
	}
	return &LandApprovalForAllIterator{contract: _Land.contract, event: "ApprovalForAll", logs: logs, sub: sub}, nil
}

// WatchApprovalForAll is a free log subscription operation binding the contract event 0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31.
//
// Solidity: event ApprovalForAll(address indexed account, address indexed operator, bool approved)
func (_Land *LandFilterer) WatchApprovalForAll(opts *bind.WatchOpts, sink chan<- *LandApprovalForAll, account []common.Address, operator []common.Address) (event.Subscription, error) {

	var accountRule []interface{}
	for _, accountItem := range account {
		accountRule = append(accountRule, accountItem)
	}
	var operatorRule []interface{}
	for _, operatorItem := range operator {
		operatorRule = append(operatorRule, operatorItem)
	}

	logs, sub, err := _Land.contract.WatchLogs(opts, "ApprovalForAll", accountRule, operatorRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(LandApprovalForAll)
				if err := _Land.contract.UnpackLog(event, "ApprovalForAll", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseApprovalForAll is a log parse operation binding the contract event 0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31.
//
// Solidity: event ApprovalForAll(address indexed account, address indexed operator, bool approved)
func (_Land *LandFilterer) ParseApprovalForAll(log types.Log) (*LandApprovalForAll, error) {
	event := new(LandApprovalForAll)
	if err := _Land.contract.UnpackLog(event, "ApprovalForAll", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// LandLandFractionalizedIterator is returned from FilterLandFractionalized and is used to iterate over the raw logs and unpacked data for LandFractionalized events raised by the Land contract.
type LandLandFractionalizedIterator struct {
	Event *LandLandFractionalized // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *LandLandFractionalizedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(LandLandFractionalized)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(LandLandFractionalized)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *LandLandFractionalizedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *LandLandFractionalizedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// LandLandFractionalized represents a LandFractionalized event raised by the Land contract.
type LandLandFractionalized struct {
	LandId            *big.Int
	NumberOfFractions *big.Int
	MetadataURI       string
	Raw               types.Log // Blockchain specific contextual infos
}

// FilterLandFractionalized is a free log retrieval operation binding the contract event 0xe04f3628166f9d500265606417509e03be4579a17394e8c4e1fa86c4fa0e4fae.
//
// Solidity: event LandFractionalized(uint256 indexed landId, uint256 numberOfFractions, string metadataURI)
func (_Land *LandFilterer) FilterLandFractionalized(opts *bind.FilterOpts, landId []*big.Int) (*LandLandFractionalizedIterator, error) {

	var landIdRule []interface{}
	for _, landIdItem := range landId {
		landIdRule = append(landIdRule, landIdItem)
	}

	logs, sub, err := _Land.contract.FilterLogs(opts, "LandFractionalized", landIdRule)
	if err != nil {
		return nil, err
	}
	return &LandLandFractionalizedIterator{contract: _Land.contract, event: "LandFractionalized", logs: logs, sub: sub}, nil
}

// WatchLandFractionalized is a free log subscription operation binding the contract event 0xe04f3628166f9d500265606417509e03be4579a17394e8c4e1fa86c4fa0e4fae.
//
// Solidity: event LandFractionalized(uint256 indexed landId, uint256 numberOfFractions, string metadataURI)
func (_Land *LandFilterer) WatchLandFractionalized(opts *bind.WatchOpts, sink chan<- *LandLandFractionalized, landId []*big.Int) (event.Subscription, error) {

	var landIdRule []interface{}
	for _, landIdItem := range landId {
		landIdRule = append(landIdRule, landIdItem)
	}

	logs, sub, err := _Land.contract.WatchLogs(opts, "LandFractionalized", landIdRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(LandLandFractionalized)
				if err := _Land.contract.UnpackLog(event, "LandFractionalized", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseLandFractionalized is a log parse operation binding the contract event 0xe04f3628166f9d500265606417509e03be4579a17394e8c4e1fa86c4fa0e4fae.
//
// Solidity: event LandFractionalized(uint256 indexed landId, uint256 numberOfFractions, string metadataURI)
func (_Land *LandFilterer) ParseLandFractionalized(log types.Log) (*LandLandFractionalized, error) {
	event := new(LandLandFractionalized)
	if err := _Land.contract.UnpackLog(event, "LandFractionalized", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// LandOwnershipTransferredIterator is returned from FilterOwnershipTransferred and is used to iterate over the raw logs and unpacked data for OwnershipTransferred events raised by the Land contract.
type LandOwnershipTransferredIterator struct {
	Event *LandOwnershipTransferred // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *LandOwnershipTransferredIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(LandOwnershipTransferred)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(LandOwnershipTransferred)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *LandOwnershipTransferredIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *LandOwnershipTransferredIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// LandOwnershipTransferred represents a OwnershipTransferred event raised by the Land contract.
type LandOwnershipTransferred struct {
	PreviousOwner common.Address
	NewOwner      common.Address
	Raw           types.Log // Blockchain specific contextual infos
}

// FilterOwnershipTransferred is a free log retrieval operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
func (_Land *LandFilterer) FilterOwnershipTransferred(opts *bind.FilterOpts, previousOwner []common.Address, newOwner []common.Address) (*LandOwnershipTransferredIterator, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _Land.contract.FilterLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return &LandOwnershipTransferredIterator{contract: _Land.contract, event: "OwnershipTransferred", logs: logs, sub: sub}, nil
}

// WatchOwnershipTransferred is a free log subscription operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
func (_Land *LandFilterer) WatchOwnershipTransferred(opts *bind.WatchOpts, sink chan<- *LandOwnershipTransferred, previousOwner []common.Address, newOwner []common.Address) (event.Subscription, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _Land.contract.WatchLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(LandOwnershipTransferred)
				if err := _Land.contract.UnpackLog(event, "OwnershipTransferred", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseOwnershipTransferred is a log parse operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
func (_Land *LandFilterer) ParseOwnershipTransferred(log types.Log) (*LandOwnershipTransferred, error) {
	event := new(LandOwnershipTransferred)
	if err := _Land.contract.UnpackLog(event, "OwnershipTransferred", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// LandTokensListedForSaleIterator is returned from FilterTokensListedForSale and is used to iterate over the raw logs and unpacked data for TokensListedForSale events raised by the Land contract.
type LandTokensListedForSaleIterator struct {
	Event *LandTokensListedForSale // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *LandTokensListedForSaleIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(LandTokensListedForSale)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(LandTokensListedForSale)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *LandTokensListedForSaleIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *LandTokensListedForSaleIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// LandTokensListedForSale represents a TokensListedForSale event raised by the Land contract.
type LandTokensListedForSale struct {
	LandId        *big.Int
	Seller        common.Address
	Amount        *big.Int
	PricePerToken *big.Int
	Raw           types.Log // Blockchain specific contextual infos
}

// FilterTokensListedForSale is a free log retrieval operation binding the contract event 0x8098ce837a1e7f11070ca4eb3fecff815014e0245b2788d11377149251c2b55b.
//
// Solidity: event TokensListedForSale(uint256 indexed landId, address indexed seller, uint256 amount, uint256 pricePerToken)
func (_Land *LandFilterer) FilterTokensListedForSale(opts *bind.FilterOpts, landId []*big.Int, seller []common.Address) (*LandTokensListedForSaleIterator, error) {

	var landIdRule []interface{}
	for _, landIdItem := range landId {
		landIdRule = append(landIdRule, landIdItem)
	}
	var sellerRule []interface{}
	for _, sellerItem := range seller {
		sellerRule = append(sellerRule, sellerItem)
	}

	logs, sub, err := _Land.contract.FilterLogs(opts, "TokensListedForSale", landIdRule, sellerRule)
	if err != nil {
		return nil, err
	}
	return &LandTokensListedForSaleIterator{contract: _Land.contract, event: "TokensListedForSale", logs: logs, sub: sub}, nil
}

// WatchTokensListedForSale is a free log subscription operation binding the contract event 0x8098ce837a1e7f11070ca4eb3fecff815014e0245b2788d11377149251c2b55b.
//
// Solidity: event TokensListedForSale(uint256 indexed landId, address indexed seller, uint256 amount, uint256 pricePerToken)
func (_Land *LandFilterer) WatchTokensListedForSale(opts *bind.WatchOpts, sink chan<- *LandTokensListedForSale, landId []*big.Int, seller []common.Address) (event.Subscription, error) {

	var landIdRule []interface{}
	for _, landIdItem := range landId {
		landIdRule = append(landIdRule, landIdItem)
	}
	var sellerRule []interface{}
	for _, sellerItem := range seller {
		sellerRule = append(sellerRule, sellerItem)
	}

	logs, sub, err := _Land.contract.WatchLogs(opts, "TokensListedForSale", landIdRule, sellerRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(LandTokensListedForSale)
				if err := _Land.contract.UnpackLog(event, "TokensListedForSale", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseTokensListedForSale is a log parse operation binding the contract event 0x8098ce837a1e7f11070ca4eb3fecff815014e0245b2788d11377149251c2b55b.
//
// Solidity: event TokensListedForSale(uint256 indexed landId, address indexed seller, uint256 amount, uint256 pricePerToken)
func (_Land *LandFilterer) ParseTokensListedForSale(log types.Log) (*LandTokensListedForSale, error) {
	event := new(LandTokensListedForSale)
	if err := _Land.contract.UnpackLog(event, "TokensListedForSale", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// LandTokensListingCancelledIterator is returned from FilterTokensListingCancelled and is used to iterate over the raw logs and unpacked data for TokensListingCancelled events raised by the Land contract.
type LandTokensListingCancelledIterator struct {
	Event *LandTokensListingCancelled // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *LandTokensListingCancelledIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(LandTokensListingCancelled)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(LandTokensListingCancelled)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *LandTokensListingCancelledIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *LandTokensListingCancelledIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// LandTokensListingCancelled represents a TokensListingCancelled event raised by the Land contract.
type LandTokensListingCancelled struct {
	LandId        *big.Int
	Seller        common.Address
	Amount        *big.Int
	PricePerToken *big.Int
	Raw           types.Log // Blockchain specific contextual infos
}

// FilterTokensListingCancelled is a free log retrieval operation binding the contract event 0x6b07c5730a95c41d70145025b4d89a30daef58b875d933b7be46e254a34aa0a5.
//
// Solidity: event TokensListingCancelled(uint256 indexed landId, address indexed seller, uint256 amount, uint256 pricePerToken)
func (_Land *LandFilterer) FilterTokensListingCancelled(opts *bind.FilterOpts, landId []*big.Int, seller []common.Address) (*LandTokensListingCancelledIterator, error) {

	var landIdRule []interface{}
	for _, landIdItem := range landId {
		landIdRule = append(landIdRule, landIdItem)
	}
	var sellerRule []interface{}
	for _, sellerItem := range seller {
		sellerRule = append(sellerRule, sellerItem)
	}

	logs, sub, err := _Land.contract.FilterLogs(opts, "TokensListingCancelled", landIdRule, sellerRule)
	if err != nil {
		return nil, err
	}
	return &LandTokensListingCancelledIterator{contract: _Land.contract, event: "TokensListingCancelled", logs: logs, sub: sub}, nil
}

// WatchTokensListingCancelled is a free log subscription operation binding the contract event 0x6b07c5730a95c41d70145025b4d89a30daef58b875d933b7be46e254a34aa0a5.
//
// Solidity: event TokensListingCancelled(uint256 indexed landId, address indexed seller, uint256 amount, uint256 pricePerToken)
func (_Land *LandFilterer) WatchTokensListingCancelled(opts *bind.WatchOpts, sink chan<- *LandTokensListingCancelled, landId []*big.Int, seller []common.Address) (event.Subscription, error) {

	var landIdRule []interface{}
	for _, landIdItem := range landId {
		landIdRule = append(landIdRule, landIdItem)
	}
	var sellerRule []interface{}
	for _, sellerItem := range seller {
		sellerRule = append(sellerRule, sellerItem)
	}

	logs, sub, err := _Land.contract.WatchLogs(opts, "TokensListingCancelled", landIdRule, sellerRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(LandTokensListingCancelled)
				if err := _Land.contract.UnpackLog(event, "TokensListingCancelled", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseTokensListingCancelled is a log parse operation binding the contract event 0x6b07c5730a95c41d70145025b4d89a30daef58b875d933b7be46e254a34aa0a5.
//
// Solidity: event TokensListingCancelled(uint256 indexed landId, address indexed seller, uint256 amount, uint256 pricePerToken)
func (_Land *LandFilterer) ParseTokensListingCancelled(log types.Log) (*LandTokensListingCancelled, error) {
	event := new(LandTokensListingCancelled)
	if err := _Land.contract.UnpackLog(event, "TokensListingCancelled", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// LandTokensPurchasedIterator is returned from FilterTokensPurchased and is used to iterate over the raw logs and unpacked data for TokensPurchased events raised by the Land contract.
type LandTokensPurchasedIterator struct {
	Event *LandTokensPurchased // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *LandTokensPurchasedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(LandTokensPurchased)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(LandTokensPurchased)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *LandTokensPurchasedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *LandTokensPurchasedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// LandTokensPurchased represents a TokensPurchased event raised by the Land contract.
type LandTokensPurchased struct {
	LandId        *big.Int
	Buyer         common.Address
	Seller        common.Address
	Amount        *big.Int
	PricePerToken *big.Int
	Raw           types.Log // Blockchain specific contextual infos
}

// FilterTokensPurchased is a free log retrieval operation binding the contract event 0x06a468bc780ea805d80491ed9f300c36122c94bcb715acc7a8606f510f6c2ecd.
//
// Solidity: event TokensPurchased(uint256 indexed landId, address indexed buyer, address indexed seller, uint256 amount, uint256 pricePerToken)
func (_Land *LandFilterer) FilterTokensPurchased(opts *bind.FilterOpts, landId []*big.Int, buyer []common.Address, seller []common.Address) (*LandTokensPurchasedIterator, error) {

	var landIdRule []interface{}
	for _, landIdItem := range landId {
		landIdRule = append(landIdRule, landIdItem)
	}
	var buyerRule []interface{}
	for _, buyerItem := range buyer {
		buyerRule = append(buyerRule, buyerItem)
	}
	var sellerRule []interface{}
	for _, sellerItem := range seller {
		sellerRule = append(sellerRule, sellerItem)
	}

	logs, sub, err := _Land.contract.FilterLogs(opts, "TokensPurchased", landIdRule, buyerRule, sellerRule)
	if err != nil {
		return nil, err
	}
	return &LandTokensPurchasedIterator{contract: _Land.contract, event: "TokensPurchased", logs: logs, sub: sub}, nil
}

// WatchTokensPurchased is a free log subscription operation binding the contract event 0x06a468bc780ea805d80491ed9f300c36122c94bcb715acc7a8606f510f6c2ecd.
//
// Solidity: event TokensPurchased(uint256 indexed landId, address indexed buyer, address indexed seller, uint256 amount, uint256 pricePerToken)
func (_Land *LandFilterer) WatchTokensPurchased(opts *bind.WatchOpts, sink chan<- *LandTokensPurchased, landId []*big.Int, buyer []common.Address, seller []common.Address) (event.Subscription, error) {

	var landIdRule []interface{}
	for _, landIdItem := range landId {
		landIdRule = append(landIdRule, landIdItem)
	}
	var buyerRule []interface{}
	for _, buyerItem := range buyer {
		buyerRule = append(buyerRule, buyerItem)
	}
	var sellerRule []interface{}
	for _, sellerItem := range seller {
		sellerRule = append(sellerRule, sellerItem)
	}

	logs, sub, err := _Land.contract.WatchLogs(opts, "TokensPurchased", landIdRule, buyerRule, sellerRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(LandTokensPurchased)
				if err := _Land.contract.UnpackLog(event, "TokensPurchased", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseTokensPurchased is a log parse operation binding the contract event 0x06a468bc780ea805d80491ed9f300c36122c94bcb715acc7a8606f510f6c2ecd.
//
// Solidity: event TokensPurchased(uint256 indexed landId, address indexed buyer, address indexed seller, uint256 amount, uint256 pricePerToken)
func (_Land *LandFilterer) ParseTokensPurchased(log types.Log) (*LandTokensPurchased, error) {
	event := new(LandTokensPurchased)
	if err := _Land.contract.UnpackLog(event, "TokensPurchased", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// LandTransferBatchIterator is returned from FilterTransferBatch and is used to iterate over the raw logs and unpacked data for TransferBatch events raised by the Land contract.
type LandTransferBatchIterator struct {
	Event *LandTransferBatch // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *LandTransferBatchIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(LandTransferBatch)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(LandTransferBatch)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *LandTransferBatchIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *LandTransferBatchIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// LandTransferBatch represents a TransferBatch event raised by the Land contract.
type LandTransferBatch struct {
	Operator common.Address
	From     common.Address
	To       common.Address
	Ids      []*big.Int
	Values   []*big.Int
	Raw      types.Log // Blockchain specific contextual infos
}

// FilterTransferBatch is a free log retrieval operation binding the contract event 0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb.
//
// Solidity: event TransferBatch(address indexed operator, address indexed from, address indexed to, uint256[] ids, uint256[] values)
func (_Land *LandFilterer) FilterTransferBatch(opts *bind.FilterOpts, operator []common.Address, from []common.Address, to []common.Address) (*LandTransferBatchIterator, error) {

	var operatorRule []interface{}
	for _, operatorItem := range operator {
		operatorRule = append(operatorRule, operatorItem)
	}
	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _Land.contract.FilterLogs(opts, "TransferBatch", operatorRule, fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return &LandTransferBatchIterator{contract: _Land.contract, event: "TransferBatch", logs: logs, sub: sub}, nil
}

// WatchTransferBatch is a free log subscription operation binding the contract event 0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb.
//
// Solidity: event TransferBatch(address indexed operator, address indexed from, address indexed to, uint256[] ids, uint256[] values)
func (_Land *LandFilterer) WatchTransferBatch(opts *bind.WatchOpts, sink chan<- *LandTransferBatch, operator []common.Address, from []common.Address, to []common.Address) (event.Subscription, error) {

	var operatorRule []interface{}
	for _, operatorItem := range operator {
		operatorRule = append(operatorRule, operatorItem)
	}
	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _Land.contract.WatchLogs(opts, "TransferBatch", operatorRule, fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(LandTransferBatch)
				if err := _Land.contract.UnpackLog(event, "TransferBatch", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseTransferBatch is a log parse operation binding the contract event 0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb.
//
// Solidity: event TransferBatch(address indexed operator, address indexed from, address indexed to, uint256[] ids, uint256[] values)
func (_Land *LandFilterer) ParseTransferBatch(log types.Log) (*LandTransferBatch, error) {
	event := new(LandTransferBatch)
	if err := _Land.contract.UnpackLog(event, "TransferBatch", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// LandTransferFractionalTokensIterator is returned from FilterTransferFractionalTokens and is used to iterate over the raw logs and unpacked data for TransferFractionalTokens events raised by the Land contract.
type LandTransferFractionalTokensIterator struct {
	Event *LandTransferFractionalTokens // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *LandTransferFractionalTokensIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(LandTransferFractionalTokens)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(LandTransferFractionalTokens)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *LandTransferFractionalTokensIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *LandTransferFractionalTokensIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// LandTransferFractionalTokens represents a TransferFractionalTokens event raised by the Land contract.
type LandTransferFractionalTokens struct {
	From   common.Address
	To     common.Address
	LandId *big.Int
	Amount *big.Int
	Raw    types.Log // Blockchain specific contextual infos
}

// FilterTransferFractionalTokens is a free log retrieval operation binding the contract event 0xa26bbe54fa0532e401916ac988b0e6d0a482b1e3de4a53dd1718aba39eeae7ad.
//
// Solidity: event TransferFractionalTokens(address indexed from, address indexed to, uint256 landId, uint256 amount)
func (_Land *LandFilterer) FilterTransferFractionalTokens(opts *bind.FilterOpts, from []common.Address, to []common.Address) (*LandTransferFractionalTokensIterator, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _Land.contract.FilterLogs(opts, "TransferFractionalTokens", fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return &LandTransferFractionalTokensIterator{contract: _Land.contract, event: "TransferFractionalTokens", logs: logs, sub: sub}, nil
}

// WatchTransferFractionalTokens is a free log subscription operation binding the contract event 0xa26bbe54fa0532e401916ac988b0e6d0a482b1e3de4a53dd1718aba39eeae7ad.
//
// Solidity: event TransferFractionalTokens(address indexed from, address indexed to, uint256 landId, uint256 amount)
func (_Land *LandFilterer) WatchTransferFractionalTokens(opts *bind.WatchOpts, sink chan<- *LandTransferFractionalTokens, from []common.Address, to []common.Address) (event.Subscription, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _Land.contract.WatchLogs(opts, "TransferFractionalTokens", fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(LandTransferFractionalTokens)
				if err := _Land.contract.UnpackLog(event, "TransferFractionalTokens", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseTransferFractionalTokens is a log parse operation binding the contract event 0xa26bbe54fa0532e401916ac988b0e6d0a482b1e3de4a53dd1718aba39eeae7ad.
//
// Solidity: event TransferFractionalTokens(address indexed from, address indexed to, uint256 landId, uint256 amount)
func (_Land *LandFilterer) ParseTransferFractionalTokens(log types.Log) (*LandTransferFractionalTokens, error) {
	event := new(LandTransferFractionalTokens)
	if err := _Land.contract.UnpackLog(event, "TransferFractionalTokens", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// LandTransferSingleIterator is returned from FilterTransferSingle and is used to iterate over the raw logs and unpacked data for TransferSingle events raised by the Land contract.
type LandTransferSingleIterator struct {
	Event *LandTransferSingle // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *LandTransferSingleIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(LandTransferSingle)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(LandTransferSingle)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *LandTransferSingleIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *LandTransferSingleIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// LandTransferSingle represents a TransferSingle event raised by the Land contract.
type LandTransferSingle struct {
	Operator common.Address
	From     common.Address
	To       common.Address
	Id       *big.Int
	Value    *big.Int
	Raw      types.Log // Blockchain specific contextual infos
}

// FilterTransferSingle is a free log retrieval operation binding the contract event 0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62.
//
// Solidity: event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value)
func (_Land *LandFilterer) FilterTransferSingle(opts *bind.FilterOpts, operator []common.Address, from []common.Address, to []common.Address) (*LandTransferSingleIterator, error) {

	var operatorRule []interface{}
	for _, operatorItem := range operator {
		operatorRule = append(operatorRule, operatorItem)
	}
	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _Land.contract.FilterLogs(opts, "TransferSingle", operatorRule, fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return &LandTransferSingleIterator{contract: _Land.contract, event: "TransferSingle", logs: logs, sub: sub}, nil
}

// WatchTransferSingle is a free log subscription operation binding the contract event 0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62.
//
// Solidity: event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value)
func (_Land *LandFilterer) WatchTransferSingle(opts *bind.WatchOpts, sink chan<- *LandTransferSingle, operator []common.Address, from []common.Address, to []common.Address) (event.Subscription, error) {

	var operatorRule []interface{}
	for _, operatorItem := range operator {
		operatorRule = append(operatorRule, operatorItem)
	}
	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _Land.contract.WatchLogs(opts, "TransferSingle", operatorRule, fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(LandTransferSingle)
				if err := _Land.contract.UnpackLog(event, "TransferSingle", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseTransferSingle is a log parse operation binding the contract event 0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62.
//
// Solidity: event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value)
func (_Land *LandFilterer) ParseTransferSingle(log types.Log) (*LandTransferSingle, error) {
	event := new(LandTransferSingle)
	if err := _Land.contract.UnpackLog(event, "TransferSingle", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// LandURIIterator is returned from FilterURI and is used to iterate over the raw logs and unpacked data for URI events raised by the Land contract.
type LandURIIterator struct {
	Event *LandURI // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *LandURIIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(LandURI)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(LandURI)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *LandURIIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *LandURIIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// LandURI represents a URI event raised by the Land contract.
type LandURI struct {
	Value string
	Id    *big.Int
	Raw   types.Log // Blockchain specific contextual infos
}

// FilterURI is a free log retrieval operation binding the contract event 0x6bb7ff708619ba0610cba295a58592e0451dee2622938c8755667688daf3529b.
//
// Solidity: event URI(string value, uint256 indexed id)
func (_Land *LandFilterer) FilterURI(opts *bind.FilterOpts, id []*big.Int) (*LandURIIterator, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}

	logs, sub, err := _Land.contract.FilterLogs(opts, "URI", idRule)
	if err != nil {
		return nil, err
	}
	return &LandURIIterator{contract: _Land.contract, event: "URI", logs: logs, sub: sub}, nil
}

// WatchURI is a free log subscription operation binding the contract event 0x6bb7ff708619ba0610cba295a58592e0451dee2622938c8755667688daf3529b.
//
// Solidity: event URI(string value, uint256 indexed id)
func (_Land *LandFilterer) WatchURI(opts *bind.WatchOpts, sink chan<- *LandURI, id []*big.Int) (event.Subscription, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}

	logs, sub, err := _Land.contract.WatchLogs(opts, "URI", idRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(LandURI)
				if err := _Land.contract.UnpackLog(event, "URI", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseURI is a log parse operation binding the contract event 0x6bb7ff708619ba0610cba295a58592e0451dee2622938c8755667688daf3529b.
//
// Solidity: event URI(string value, uint256 indexed id)
func (_Land *LandFilterer) ParseURI(log types.Log) (*LandURI, error) {
	event := new(LandURI)
	if err := _Land.contract.UnpackLog(event, "URI", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
