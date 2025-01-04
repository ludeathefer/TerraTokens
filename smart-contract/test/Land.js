const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Land contract", function () {
  let Land;
  let landContract;
  let owner;
  let buyer;
  let seller1;
  let seller2;

  beforeEach(async function () {
    [owner, buyer, seller1, seller2] = await ethers.getSigners();
    Land = await ethers.getContractFactory("Land");
    landContract = await Land.deploy();
    expect(await landContract.getAddress()).to.be.properAddress;
  });

  it("Should initialize the contract correctly", async function () {
    expect(await landContract.landIdCounter()).to.equal(0);
  });

  it("Should tokenize and fractionalize land", async function () {
    const metadataURI = "https://example.com/land-metadata/1";
    const numberOfFractions = 100;

    await expect(landContract.fractionalizeLand(metadataURI, numberOfFractions))
      .to.emit(landContract, "LandFractionalized")
      .withArgs(1, numberOfFractions, metadataURI);

    const landId = 1;

    expect(await landContract.landIdCounter()).to.equal(landId);
    expect(await landContract.totalFractions(landId)).to.equal(
      numberOfFractions
    );
    expect(await landContract.isFractionalized(landId)).to.equal(true);
  });

  it("Should fail when non-owner attempts to fractionalize land", async function () {
    const metadataURI = "https://example.com/land-metadata/3";
    const numberOfFractions = 200;

    await expect(
      landContract
        .connect(seller1)
        .fractionalizeLand(metadataURI, numberOfFractions)
    ).to.be.revertedWithCustomError(landContract, "OwnableUnauthorizedAccount");
  });

  it("Should list tokens for sale correctly", async function () {
    const metadataURI = "https://example.com/land-metadata/1";
    const numberOfFractions = 100;
    const pricePerToken = ethers.parseUnits("0.1", "ether");

    // Create land fractions
    await landContract.fractionalizeLand(metadataURI, numberOfFractions);

    // Transfer some tokens to seller1
    await landContract.transferFractionalTokens(seller1.address, 1, 50);

    // List tokens for sale
    await expect(
      landContract.connect(seller1).listTokensForSale(1, 20, pricePerToken)
    )
      .to.emit(landContract, "TokensListedForSale")
      .withArgs(1, seller1.address, 20, pricePerToken);
  });

  it("Should fail to list tokens for sale with insufficient balance", async function () {
    const metadataURI = "https://example.com/land-metadata/1";
    const numberOfFractions = 100;
    const pricePerToken = ethers.parseUnits("0.1", "ether");

    await landContract.fractionalizeLand(metadataURI, numberOfFractions);

    await expect(
      landContract.connect(seller1).listTokensForSale(1, 20, pricePerToken)
    ).to.be.revertedWith("Insufficient token balance");
  });

  it("Should purchase tokens from multiple sellers", async function () {
    const metadataURI = "https://example.com/land-metadata/1";
    const numberOfFractions = 100;
    const pricePerToken1 = ethers.parseUnits("0.1", "ether");
    const pricePerToken2 = ethers.parseUnits("0.12", "ether");

    // Create land fractions
    await landContract.fractionalizeLand(metadataURI, numberOfFractions);

    // Transfer tokens to sellers
    await landContract.transferFractionalTokens(seller1.address, 1, 40);
    await landContract.transferFractionalTokens(seller2.address, 1, 30);

    // Sellers approve the contract operator (buyer)
    await landContract.connect(seller1).setApprovalForAll(buyer.address, true);
    await landContract.connect(seller2).setApprovalForAll(buyer.address, true);

    // List tokens for sale
    await landContract
      .connect(seller1)
      .listTokensForSale(1, 20, pricePerToken1);
    await landContract
      .connect(seller2)
      .listTokensForSale(1, 15, pricePerToken2);

    // Create purchase orders
    const orders = [
      {
        seller: seller1.address,
        amount: 10,
        pricePerToken: pricePerToken1,
      },
      {
        seller: seller2.address,
        amount: 5,
        pricePerToken: pricePerToken2,
      },
    ];

    const totalPayment = pricePerToken1 * 10n + pricePerToken2 * 5n;

    // Purchase tokens
    await expect(
      landContract
        .connect(buyer)
        .purchaseTokens(1, orders, { value: totalPayment })
    )
      .to.emit(landContract, "TokensPurchased")
      .withArgs(1, buyer.address, seller1.address, 10, pricePerToken1)
      .to.emit(landContract, "TokensPurchased")
      .withArgs(1, buyer.address, seller2.address, 5, pricePerToken2);

    // Check balances
    expect(await landContract.balanceOf(buyer.address, 1)).to.equal(15);
    expect(await landContract.balanceOf(seller1.address, 1)).to.equal(30);
    expect(await landContract.balanceOf(seller2.address, 1)).to.equal(25);
  });

  it("Should fail when purchasing with insufficient payment", async function () {
    const metadataURI = "https://example.com/land-metadata/1";
    const numberOfFractions = 100;
    const pricePerToken = ethers.parseUnits("0.1", "ether");

    await landContract.fractionalizeLand(metadataURI, numberOfFractions);
    await landContract.transferFractionalTokens(seller1.address, 1, 40);
    await landContract
      .connect(seller1)
      .setApprovalForAll(landContract.getAddress(), true);
    await landContract.connect(seller1).listTokensForSale(1, 20, pricePerToken);

    const orders = [
      {
        seller: seller1.address,
        amount: 10,
        pricePerToken: pricePerToken,
      },
    ];

    const insufficientPayment = pricePerToken * 10n - 1n;

    await expect(
      landContract
        .connect(buyer)
        .purchaseTokens(1, orders, { value: insufficientPayment })
    ).to.be.revertedWith("Insufficient payment");
  });

  it("Should fail when seller has insufficient balance", async function () {
    const metadataURI = "https://example.com/land-metadata/1";
    const numberOfFractions = 100;
    const pricePerToken = ethers.parseUnits("0.1", "ether");

    await landContract.fractionalizeLand(metadataURI, numberOfFractions);
    await landContract.transferFractionalTokens(seller1.address, 1, 5);
    await landContract
      .connect(seller1)
      .setApprovalForAll(landContract.getAddress(), true);
    await landContract.connect(seller1).listTokensForSale(1, 5, pricePerToken);
    const orders = [
      {
        seller: seller1.address,
        amount: 10,
        pricePerToken: pricePerToken,
      },
    ];

    await expect(
      landContract
        .connect(buyer)
        .purchaseTokens(1, orders, { value: pricePerToken * 10n })
    ).to.be.revertedWith("Seller has insufficient balance");
  });

  it("Should transfer fractional tokens", async function () {
    const metadataURI = "https://example.com/land-metadata/8";
    const numberOfFractions = 100;

    await landContract.fractionalizeLand(metadataURI, numberOfFractions);

    await expect(landContract.transferFractionalTokens(buyer.address, 1, 10))
      .to.emit(landContract, "TransferFractionalTokens")
      .withArgs(owner.address, buyer.address, 1, 10);

    const buyerBalance = await landContract.balanceOf(buyer.address, 1);
    expect(buyerBalance).to.equal(10);
  });

  it("Should fail when transferring more fractional tokens than balance", async function () {
    const metadataURI = "https://example.com/land-metadata/9";
    const numberOfFractions = 100;

    await landContract.fractionalizeLand(metadataURI, numberOfFractions);

    await expect(
      landContract.transferFractionalTokens(buyer.address, 1, 200)
    ).to.be.revertedWith("Insufficient balance");
  });

  it("Should refund excess payment", async function () {
    const metadataURI = "https://example.com/land-metadata/1";
    const numberOfFractions = 100;
    const pricePerToken = ethers.parseUnits("0.1", "ether");
    const excessAmount = ethers.parseUnits("1", "ether");

    await landContract.fractionalizeLand(metadataURI, numberOfFractions);
    await landContract.transferFractionalTokens(seller1.address, 1, 40);
    await landContract.connect(seller1).setApprovalForAll(buyer.address, true);
    await landContract.connect(seller1).listTokensForSale(1, 20, pricePerToken);

    const orders = [
      {
        seller: seller1.address,
        amount: 10,
        pricePerToken: pricePerToken,
      },
    ];

    const requiredPayment = pricePerToken * 10n;
    const totalSent = requiredPayment + excessAmount;

    const buyerBalanceBefore = await ethers.provider.getBalance(buyer.address);

    const tx = await landContract
      .connect(buyer)
      .purchaseTokens(1, orders, { value: totalSent });
    const receipt = await tx.wait();
    const gasUsed = receipt.gasUsed * receipt.gasPrice;

    const buyerBalanceAfter = await ethers.provider.getBalance(buyer.address);

    expect(buyerBalanceBefore - buyerBalanceAfter).to.equal(
      requiredPayment + gasUsed
    );
  });
});
