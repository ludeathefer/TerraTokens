// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Land is ERC1155, Ownable {
    uint256 public landIdCounter;

    mapping(uint256 => uint256) public totalFractions;
    mapping(uint256 => bool) public isFractionalized;

    constructor() Ownable(msg.sender) ERC1155("") {}

    struct SaleOrder {
        address seller;
        uint256 amount;
        uint256 pricePerToken;
    }

    event LandFractionalized(
        uint256 indexed landId,
        uint256 numberOfFractions,
        string metadataURI
    );

    event TransferFractionalTokens(
        address indexed from,
        address indexed to,
        uint256 landId,
        uint256 amount
    );

    event TokensListedForSale(
        uint256 indexed landId,
        address indexed seller,
        uint256 amount,
        uint256 pricePerToken
    );

    event TokensPurchased(
        uint256 indexed landId,
        address indexed buyer,
        address indexed seller,
        uint256 amount,
        uint256 pricePerToken
    );

    function fractionalizeLand(
        string memory metadataURI,
        uint256 numberOfFractions
    ) public onlyOwner {
        landIdCounter++;
        uint256 landId = landIdCounter;

        _mint(msg.sender, landId, numberOfFractions, "");

        totalFractions[landId] = numberOfFractions;
        isFractionalized[landId] = true;

        emit LandFractionalized(landId, numberOfFractions, metadataURI);
    }

    function listTokensForSale(
        uint256 landId,
        uint256 amount,
        uint256 pricePerToken
    ) public {
        require(isFractionalized[landId], "Land must be fractionalized first");
        require(
            balanceOf(msg.sender, landId) >= amount,
            "Insufficient token balance"
        );
        require(pricePerToken > 0, "Price must be greater than 0");

        emit TokensListedForSale(landId, msg.sender, amount, pricePerToken);
    }

    function purchaseTokens(
        uint256 landId,
        SaleOrder[] calldata orders
    ) public payable {
        require(isFractionalized[landId], "Land must be fractionalized first");

        uint256 totalAmount;
        uint256 totalPrice;

        // Calculate total amount and price
        for (uint256 i = 0; i < orders.length; i++) {
            require(
                balanceOf(orders[i].seller, landId) >= orders[i].amount,
                "Seller has insufficient balance"
            );

            totalAmount += orders[i].amount;
            totalPrice += orders[i].amount * orders[i].pricePerToken;
        }

        require(msg.value >= totalPrice, "Insufficient payment");

        // Process transfers
        for (uint256 i = 0; i < orders.length; i++) {
            SaleOrder memory order = orders[i];

            // Transfer tokens from seller to buyer
            safeTransferFrom(
                order.seller,
                msg.sender,
                landId,
                order.amount,
                ""
            );

            // Transfer payment to seller
            uint256 payment = order.amount * order.pricePerToken;
            payable(order.seller).transfer(payment);

            emit TokensPurchased(
                landId,
                msg.sender,
                order.seller,
                order.amount,
                order.pricePerToken
            );
        }

        // Refund excess payment if any
        uint256 excess = msg.value - totalPrice;
        if (excess > 0) {
            payable(msg.sender).transfer(excess);
        }
    }

    function transferFractionalTokens(
        address to,
        uint256 landId,
        uint256 amount
    ) public {
        require(
            balanceOf(msg.sender, landId) >= amount,
            "Insufficient balance"
        );
        safeTransferFrom(msg.sender, to, landId, amount, "");
        emit TransferFractionalTokens(msg.sender, to, landId, amount);
    }
}
