import React from "react";
import contractABI from "../contractABI";
import { ethers } from "ethers";

const DeleteSale = ({ contractAddress, signer }) => {
  const handleDeleteSale = async () => {
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const tx = await contract.cancelTokenListing(1, 10, 100);
    const receipt = await tx.wait();
    console.log("Transaction confirmed:", receipt);
  };

  return (
    <button
      onClick={handleDeleteSale}
      className="bg-red-300 px-4 py-2 rounded-md"
    >
      Delete Sale
    </button>
  );
};

export default DeleteSale;
