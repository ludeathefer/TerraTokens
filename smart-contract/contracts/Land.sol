// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Land is ERC1155, Ownable {
    uint256 public landIdCounter;

    mapping(uint256 => uint256) public totalFractions;
    mapping(uint256 => bool) public isFractionalized;

    // New mapping to track sale listings
    mapping(address => SaleOrder) public activeSaleListings;

    constructor() Ownable(msg.sender) ERC1155("") {}

    struct SaleOrder {
        address seller;
        uint256 landId;
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

    event TokensListingCancelled(
        uint256 indexed landId,
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
        require(
            activeSaleListings[msg.sender].amount == 0,
            "Already has an active listing"
        );

        activeSaleListings[msg.sender] = SaleOrder({
            seller: msg.sender,
            landId: landId,
            amount: amount,
            pricePerToken: pricePerToken
        });

        emit TokensListedForSale(landId, msg.sender, amount, pricePerToken);
    }

    function cancelTokenListing(
        uint256 landId,
        uint256 amount,
        uint256 pricePerToken
    ) public {
        require(isFractionalized[landId], "Land must be fractionalized first");
        require(
            balanceOf(msg.sender, landId) >= amount,
            "Must still own the tokens to cancel listing"
        );

        // Verify the listing exists and matches the parameters
        SaleOrder memory listing = activeSaleListings[msg.sender];
        require(listing.amount > 0, "No active listing found");
        require(listing.landId == landId, "Land ID doesn't match listing");
        require(listing.amount == amount, "Amount doesn't match listing");
        require(
            listing.pricePerToken == pricePerToken,
            "Price doesn't match listing"
        );

        // Remove the listing
        delete activeSaleListings[msg.sender];

        emit TokensListingCancelled(landId, msg.sender, amount, pricePerToken);
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
            address seller = orders[i].seller;

            // Verify the seller has an active listing that matches the order
            SaleOrder memory listing = activeSaleListings[seller];
            require(listing.amount > 0, "Seller has no active listing");
            require(listing.landId == landId, "Land ID doesn't match listing");
            require(
                listing.amount >= orders[i].amount,
                "Order amount exceeds listing"
            );
            require(
                listing.pricePerToken == orders[i].pricePerToken,
                "Price doesn't match listing"
            );

            require(
                balanceOf(seller, landId) >= orders[i].amount,
                "Seller has insufficient balance"
            );

            totalAmount += orders[i].amount;
            totalPrice += orders[i].amount * orders[i].pricePerToken;
        }

        require(msg.value >= totalPrice, "Insufficient payment");

        // Process transfers
        for (uint256 i = 0; i < orders.length; i++) {
            SaleOrder memory order = orders[i];
            address seller = order.seller;

            // Transfer tokens from seller to buyer
            safeTransferFrom(seller, msg.sender, landId, order.amount, "");

            // Transfer payment to seller
            uint256 payment = order.amount * order.pricePerToken;
            payable(seller).transfer(payment);

            // Update or remove the listing
            SaleOrder storage listing = activeSaleListings[seller];
            if (listing.amount == order.amount) {
                // If entire listing is purchased, remove it
                delete activeSaleListings[seller];
            } else {
                // If partial purchase, update the listing amount
                listing.amount -= order.amount;
            }

            emit TokensPurchased(
                landId,
                msg.sender,
                seller,
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
