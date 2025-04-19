import React from "react";
import contractABI from "../contractABI";
import { ethers } from "ethers";

const CreateSale = ({ contractAddress, signer }) => {
  const handleCreateSale = async () => {
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
      const approvalTx = await contract.setApprovalForAll(
        contractAddress,
        true
      );
      const approvalReceipt = await approvalTx.wait();
      console.log("Approval confirmed:", approvalReceipt);
    } catch (approvalError) {
      console.error("Error during approval:", approvalError);
      return;
    }

    const tx = await contract.listTokensForSale(1, 10, 100);
    const receipt = await tx.wait();
    console.log("Transaction confirmed:", receipt);
  };
  return (
    <button
      onClick={handleCreateSale}
      className="bg-blue-300 px-4 py-2 rounded-md"
    >
      Create Sale
    </button>
  );
};

export default CreateSale;
