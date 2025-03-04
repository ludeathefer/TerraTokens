// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("Land Contract Integration Tests", function () {
//     let land;
//     let owner;
//     let addr1;
//     let addr2;
//     let addr3;

//     beforeEach(async function () {
//         [owner, addr1, addr2, addr3] = await ethers.getSigners();

//         // Deploy the contract
//         const Land = await ethers.getContractFactory("Land");
//         land = await Land.deploy();
//         await land.waitForDeployment();
//     });

//     // Full Process: Fractionalizing Land, Listing, Purchasing, and State Update
//     describe("Full Process: Fractionalizing Land, Listing, Purchasing, and State Update", function () {
//         it("Should allow the full process from fractionalizing land to purchase and update state correctly", async function () {
//             // 1. Fractionalize land by owner
//             const fractionalizeTx = await land.fractionalizeLand("ipfs://metadata", 100);
//             await fractionalizeTx.wait();
//             expect(await land.landIdCounter()).to.equal(1); // Land ID should be 1
//             expect(await land.totalFractions(1)).to.equal(100); // Should have 100 fractions
//             expect(await land.isFractionalized(1)).to.equal(true); // Land should be fractionalized
//             expect(await land.balanceOf(owner.address, 1)).to.equal(100); // Owner should have all 100 tokens

//             // 2. Transfer some tokens to addr1 and addr2
//             await land.transferFractionalTokens(addr1.address, 1, 50);
//             await land.transferFractionalTokens(addr2.address, 1, 30);

//             // 3. Ensure addr1 approves the contract to transfer their tokens
//             await land.connect(addr1).setApprovalForAll(land.address, true);

//             // 4. Ensure addr2 approves the contract to transfer their tokens
//             await land.connect(addr2).setApprovalForAll(land.address, true);

//             // 5. addr1 lists tokens for sale
//             await land
//                 .connect(addr1)
//                 .listTokensForSale(1, 20, ethers.parseEther("1"));
//             const addr1Listing = await land.activeSaleListings(addr1.address);
//             expect(addr1Listing.seller).to.equal(addr1.address);
//             expect(addr1Listing.amount).to.equal(20);
//             expect(addr1Listing.pricePerToken).to.equal(ethers.parseEther("1"));

//             // 6. addr2 lists tokens for sale
//             await land
//                 .connect(addr2)
//                 .listTokensForSale(1, 15, ethers.parseEther("1.5"));
//             const addr2Listing = await land.activeSaleListings(addr2.address);
//             expect(addr2Listing.seller).to.equal(addr2.address);
//             expect(addr2Listing.amount).to.equal(15);
//             expect(addr2Listing.pricePerToken).to.equal(ethers.parseEther("1.5"));

//             // 7. Ensure addr3 approves the contract to transfer their tokens
//             await land.connect(addr3).setApprovalForAll(land.address, true);

//             // 8. addr3 purchases tokens from addr1 and addr2
//             const orders = [
//                 {
//                     seller: addr1.address,
//                     landId: 1,
//                     amount: 10,
//                     pricePerToken: ethers.parseEther("1"),
//                 },
//                 {
//                     seller: addr2.address,
//                     landId: 1,
//                     amount: 5,
//                     pricePerToken: ethers.parseEther("1.5"),
//                 },
//             ];
//             const totalPrice = ethers.parseEther("17.5"); // Total price for the purchase
//             await land
//                 .connect(addr3)
//                 .purchaseTokens(1, orders, { value: totalPrice });

//             // 9. Verify balances after purchase
//             expect(await land.balanceOf(addr3.address, 1)).to.equal(15); // 10 from addr1, 5 from addr2
//             expect(await land.balanceOf(addr1.address, 1)).to.equal(40); // 50 - 10
//             expect(await land.balanceOf(addr2.address, 1)).to.equal(25); // 30 - 5

//             // 10. Verify that the sale listings are updated
//             const updatedAddr1Listing = await land.activeSaleListings(addr1.address);
//             const updatedAddr2Listing = await land.activeSaleListings(addr2.address);
//             expect(updatedAddr1Listing.amount).to.equal(10); // Remaining 10 tokens
//             expect(updatedAddr2Listing.amount).to.equal(10); // Remaining 10 tokens

//             // 11. Check for events
//             await expect(
//                 land.connect(addr3).purchaseTokens(1, orders, { value: totalPrice })
//             )
//                 .to.emit(land, "TokensPurchased")
//                 .withArgs(1, addr3.address, addr1.address, 10, ethers.parseEther("1"))
//                 .to.emit(land, "TokensPurchased")
//                 .withArgs(1, addr3.address, addr2.address, 5, ethers.parseEther("1.5"));
//         });
//     });

//     // Multiple Users: Buyers and Sellers Interacting
//     describe("Multiple Users: Buyers and Sellers Interacting", function () {
//         it("Should simulate multiple users interacting with different roles (buyers and sellers)", async function () {
//             // 1. Fractionalize land by owner
//             const fractionalizeTx = await land.fractionalizeLand("ipfs://metadata", 100);
//             await fractionalizeTx.wait();
//             expect(await land.landIdCounter()).to.equal(1);
//             expect(await land.totalFractions(1)).to.equal(100);
//             expect(await land.isFractionalized(1)).to.equal(true);

//             // 2. Transfer tokens to addr1, addr2, addr3
//             await land.transferFractionalTokens(addr1.address, 1, 40);
//             await land.transferFractionalTokens(addr2.address, 1, 30);
//             await land.transferFractionalTokens(addr3.address, 1, 30);

//             // 3. Ensure addr1 approves the contract to transfer their tokens
//             await land.connect(addr1).setApprovalForAll(land.address, true);

//             // 4. Ensure addr2 approves the contract to transfer their tokens
//             await land.connect(addr2).setApprovalForAll(land.address, true);

//             // 5. Ensure addr3 approves the contract to transfer their tokens
//             await land.connect(addr3).setApprovalForAll(land.address, true);

//             // 6. addr1 lists 15 tokens for sale at price 1 Ether
//             await land
//                 .connect(addr1)
//                 .listTokensForSale(1, 15, ethers.parseEther("1"));
//             const addr1Listing = await land.activeSaleListings(addr1.address);
//             expect(addr1Listing.amount).to.equal(15);
//             expect(addr1Listing.pricePerToken).to.equal(ethers.parseEther("1"));

//             // 7. addr2 lists 20 tokens for sale at price 1.5 Ether
//             await land
//                 .connect(addr2)
//                 .listTokensForSale(1, 20, ethers.parseEther("1.5"));
//             const addr2Listing = await land.activeSaleListings(addr2.address);
//             expect(addr2Listing.amount).to.equal(20);
//             expect(addr2Listing.pricePerToken).to.equal(ethers.parseEther("1.5"));

//             // 8. addr3 buys tokens from both addr1 and addr2
//             const orders = [
//                 {
//                     seller: addr1.address,
//                     landId: 1,
//                     amount: 10,
//                     pricePerToken: ethers.parseEther("1"),
//                 },
//                 {
//                     seller: addr2.address,
//                     landId: 1,
//                     amount: 10,
//                     pricePerToken: ethers.parseEther("1.5"),
//                 },
//             ];
//             const totalPrice = ethers.parseEther("25"); // 10 * 1 + 10 * 1.5
//             await land
//                 .connect(addr3)
//                 .purchaseTokens(1, orders, { value: totalPrice });

//             // 9. Verify that balances are updated correctly
//             expect(await land.balanceOf(addr1.address, 1)).to.equal(30); // 40 - 10
//             expect(await land.balanceOf(addr2.address, 1)).to.equal(20); // 30 - 10
//             expect(await land.balanceOf(addr3.address, 1)).to.equal(20); // 10 + 10

//             // 10. Verify that listings are updated after purchase
//             const updatedAddr1Listing = await land.activeSaleListings(addr1.address);
//             const updatedAddr2Listing = await land.activeSaleListings(addr2.address);
//             expect(updatedAddr1Listing.amount).to.equal(5); // 15 - 10
//             expect(updatedAddr2Listing.amount).to.equal(10); // 20 - 10

//             // 11. Verify events are emitted correctly
//             await expect(
//                 land.connect(addr3).purchaseTokens(1, orders, { value: totalPrice })
//             )
//                 .to.emit(land, "TokensPurchased")
//                 .withArgs(1, addr3.address, addr1.address, 10, ethers.parseEther("1"))
//                 .to.emit(land, "TokensPurchased")
//                 .withArgs(1, addr3.address, addr2.address, 10, ethers.parseEther("1.5"));
//         });
//     });
// });
