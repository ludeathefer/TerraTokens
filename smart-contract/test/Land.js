const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Land Contract", function () {
  let land;
  let owner;
  let addr1;
  let addr2;
  let addr3;
  let addrs;

  beforeEach(async function () {
    [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();

    const Land = await ethers.getContractFactory("Land");
    land = await Land.deploy();
    await land.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await land.owner()).to.equal(owner.address);
    });

    it("Should initialize with zero landIdCounter", async function () {
      expect(await land.landIdCounter()).to.equal(0);
    });
  });

  describe("Fractionalizing Land", function () {
    it("Should allow owner to fractionalize land", async function () {
      const tx = await land.fractionalizeLand("ipfs://metadata", 100);
      await tx.wait();

      expect(await land.landIdCounter()).to.equal(1);
      expect(await land.totalFractions(1)).to.equal(100);
      expect(await land.isFractionalized(1)).to.equal(true);
      expect(await land.balanceOf(owner.address, 1)).to.equal(100);
    });

    it("Should emit LandFractionalized event", async function () {
      await expect(land.fractionalizeLand("ipfs://metadata", 100))
        .to.emit(land, "LandFractionalized")
        .withArgs(1, 100, "ipfs://metadata");
    });

    it("Should not allow non-owner to fractionalize land", async function () {
      await expect(
        land.connect(addr1).fractionalizeLand("ipfs://metadata", 100)
      ).to.be.revertedWithCustomError(land, "OwnableUnauthorizedAccount");
    });
  });

  describe("Listing Tokens for Sale", function () {
    beforeEach(async function () {
      await land.fractionalizeLand("ipfs://metadata", 100);
      await land.transferFractionalTokens(addr1.address, 1, 50);
    });

    it("Should allow users to list tokens for sale", async function () {
      await land
        .connect(addr1)
        .listTokensForSale(1, 20, ethers.parseEther("1"));

      const listing = await land.activeSaleListings(addr1.address);
      expect(listing.seller).to.equal(addr1.address);
      expect(listing.landId).to.equal(1);
      expect(listing.amount).to.equal(20);
      expect(listing.pricePerToken).to.equal(ethers.parseEther("1"));
    });

    it("Should emit TokensListedForSale event", async function () {
      await expect(
        land.connect(addr1).listTokensForSale(1, 20, ethers.parseEther("1"))
      )
        .to.emit(land, "TokensListedForSale")
        .withArgs(1, addr1.address, 20, ethers.parseEther("1"));
    });

    it("Should not allow listing more tokens than owned", async function () {
      await expect(
        land.connect(addr1).listTokensForSale(1, 60, ethers.parseEther("1"))
      ).to.be.revertedWith("Insufficient token balance");
    });

    it("Should not allow listing with zero price", async function () {
      await expect(
        land.connect(addr1).listTokensForSale(1, 20, 0)
      ).to.be.revertedWith("Price must be greater than 0");
    });

    it("Should not allow multiple active listings from same seller", async function () {
      await land
        .connect(addr1)
        .listTokensForSale(1, 20, ethers.parseEther("1"));
      await expect(
        land.connect(addr1).listTokensForSale(1, 10, ethers.parseEther("2"))
      ).to.be.revertedWith("Already has an active listing");
    });
  });

  describe("Cancelling Token Listings", function () {
    beforeEach(async function () {
      await land.fractionalizeLand("ipfs://metadata", 100);
      await land.transferFractionalTokens(addr1.address, 1, 50);
      await land
        .connect(addr1)
        .listTokensForSale(1, 20, ethers.parseEther("1"));
    });

    it("Should allow seller to cancel their listing", async function () {
      await land
        .connect(addr1)
        .cancelTokenListing(1, 20, ethers.parseEther("1"));

      const listing = await land.activeSaleListings(addr1.address);
      expect(listing.amount).to.equal(0);
    });

    it("Should emit TokensListingCancelled event", async function () {
      await expect(
        land.connect(addr1).cancelTokenListing(1, 20, ethers.parseEther("1"))
      )
        .to.emit(land, "TokensListingCancelled")
        .withArgs(1, addr1.address, 20, ethers.parseEther("1"));
    });

    it("Should not allow cancelling if sender doesn't own enough tokens", async function () {
      // Transfer tokens away from addr1 so they don't have enough
      await land.connect(addr1).transferFractionalTokens(addr2.address, 1, 45);

      await expect(
        land.connect(addr1).cancelTokenListing(1, 20, ethers.parseEther("1"))
      ).to.be.revertedWith("Must still own the tokens to cancel listing");
    });

    it("Should not allow cancelling with incorrect amount", async function () {
      await expect(
        land.connect(addr1).cancelTokenListing(1, 10, ethers.parseEther("1"))
      ).to.be.revertedWith("Amount doesn't match listing");
    });

    it("Should not allow cancelling with incorrect price", async function () {
      await expect(
        land.connect(addr1).cancelTokenListing(1, 20, ethers.parseEther("2"))
      ).to.be.revertedWith("Price doesn't match listing");
    });

    it("Should not allow cancelling non-existent listing", async function () {
      // Test with addr2 who hasn't created any listing but owns tokens
      await land.transferFractionalTokens(addr2.address, 1, 20);

      await expect(
        land.connect(addr2).cancelTokenListing(1, 20, ethers.parseEther("1"))
      ).to.be.revertedWith("No active listing found");
    });
  });

  describe("Purchasing Tokens", function () {
    beforeEach(async function () {
      await land.fractionalizeLand("ipfs://metadata", 100);
      await land.transferFractionalTokens(addr1.address, 1, 50);
      await land.transferFractionalTokens(addr2.address, 1, 30);

      // Set approvals for the contract to transfer tokens
      await land.connect(addr1).setApprovalForAll(addr3.address, true);
      await land.connect(addr2).setApprovalForAll(addr3.address, true);

      await land
        .connect(addr1)
        .listTokensForSale(1, 20, ethers.parseEther("1"));
      await land
        .connect(addr2)
        .listTokensForSale(1, 15, ethers.parseEther("1.5"));
    });

    it("Should allow purchasing tokens from multiple sellers", async function () {
      const orders = [
        {
          seller: addr1.address,
          landId: 1,
          amount: 10,
          pricePerToken: ethers.parseEther("1"),
        },
        {
          seller: addr2.address,
          landId: 1,
          amount: 5,
          pricePerToken: ethers.parseEther("1.5"),
        },
      ];

      const totalPrice = ethers.parseEther("17.5"); // (10 * 1) + (5 * 1.5)
      await land
        .connect(addr3)
        .purchaseTokens(1, orders, { value: totalPrice });

      expect(await land.balanceOf(addr3.address, 1)).to.equal(15);
      expect(await land.balanceOf(addr1.address, 1)).to.equal(40);
      expect(await land.balanceOf(addr2.address, 1)).to.equal(25);
    });

    it("Should emit TokensPurchased events", async function () {
      const orders = [
        {
          seller: addr1.address,
          landId: 1,
          amount: 10,
          pricePerToken: ethers.parseEther("1"),
        },
      ];

      await expect(
        land
          .connect(addr3)
          .purchaseTokens(1, orders, { value: ethers.parseEther("10") })
      )
        .to.emit(land, "TokensPurchased")
        .withArgs(1, addr3.address, addr1.address, 10, ethers.parseEther("1"));
    });

    it("Should handle partial purchases and update listings correctly", async function () {
      const orders = [
        {
          seller: addr1.address,
          landId: 1,
          amount: 10,
          pricePerToken: ethers.parseEther("1"),
        },
      ];

      await land
        .connect(addr3)
        .purchaseTokens(1, orders, { value: ethers.parseEther("10") });

      const listing = await land.activeSaleListings(addr1.address);
      expect(listing.amount).to.equal(10); // Should be reduced from 20 to 10
    });

    it("Should remove listing when all tokens are purchased", async function () {
      const orders = [
        {
          seller: addr1.address,
          landId: 1,
          amount: 20,
          pricePerToken: ethers.parseEther("1"),
        },
      ];

      await land
        .connect(addr3)
        .purchaseTokens(1, orders, { value: ethers.parseEther("20") });

      const listing = await land.activeSaleListings(addr1.address);
      expect(listing.amount).to.equal(0);
    });

    it("Should refund excess payment", async function () {
      const orders = [
        {
          seller: addr1.address,
          landId: 1,
          amount: 10,
          pricePerToken: ethers.parseEther("1"),
        },
      ];

      const initialBalance = await ethers.provider.getBalance(addr3.address);
      const tx = await land
        .connect(addr3)
        .purchaseTokens(1, orders, { value: ethers.parseEther("15") });
      const receipt = await tx.wait();
      const gasUsed = receipt.gasUsed * receipt.gasPrice;

      const finalBalance = await ethers.provider.getBalance(addr3.address);
      const expectedBalance =
        initialBalance - ethers.parseEther("10") - gasUsed;

      expect(finalBalance).to.be.closeTo(
        expectedBalance,
        ethers.parseEther("0.01")
      );
    });

    it("Should not allow purchase with insufficient payment", async function () {
      const orders = [
        {
          seller: addr1.address,
          landId: 1,
          amount: 10,
          pricePerToken: ethers.parseEther("1"),
        },
      ];

      await expect(
        land
          .connect(addr3)
          .purchaseTokens(1, orders, { value: ethers.parseEther("5") })
      ).to.be.revertedWith("Insufficient payment");
    });
  });

  describe("Transferring Fractional Tokens", function () {
    beforeEach(async function () {
      await land.fractionalizeLand("ipfs://metadata", 100);
    });

    it("Should allow transfer of tokens", async function () {
      await land.transferFractionalTokens(addr1.address, 1, 30);
      expect(await land.balanceOf(addr1.address, 1)).to.equal(30);
      expect(await land.balanceOf(owner.address, 1)).to.equal(70);
    });

    it("Should emit TransferFractionalTokens event", async function () {
      await expect(land.transferFractionalTokens(addr1.address, 1, 30))
        .to.emit(land, "TransferFractionalTokens")
        .withArgs(owner.address, addr1.address, 1, 30);
    });

    it("Should not allow transfer of more tokens than owned", async function () {
      await expect(
        land.transferFractionalTokens(addr1.address, 1, 101)
      ).to.be.revertedWith("Insufficient balance");
    });
  });
});
