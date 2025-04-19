import React from "react";
import contractABI from "../contractABI";
import { ethers } from "ethers";

const BuyTokens = ({ contractAddress, signer }) => {
  const handleBuyTokens = async () => {
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    const order = {
      seller: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      landId: 1,
      amount: 5,
      pricePerToken: 100,
    };

    try {
      const approvalTx = await contract.setApprovalForAll(
        contractAddress,
        true
      );
      const approvalReceipt = await approvalTx.wait();
      console.log("Approval confirmed:", approvalReceipt);
    } catch (approvalError) {
      console.error("Error during approval:", approvalError);
      return; // Stop if approval fails
    }

    const tx = await contract.purchaseTokens(1, order, {
      value: order.amount * order.pricePerToken,
    });

    const receipt = await tx.wait();
    console.log("Transaction confirmed:", receipt);
  };
  return (
    <button
      onClick={handleBuyTokens}
      className="bg-blue-300 px-4 py-2 rounded-md"
    >
      Buy tokens
    </button>
  );
};

export default BuyTokens;
