import { ethers } from "ethers";
import { useState } from "react";
import Login from "../components/Login";
import CreateToken from "../components/CreateToken";
import BuyTokens from "../components/BuyTokens";
import CreateSale from "../components/CreateSale";
import ViewTokens from "../components/ViewTokens";
import ViewSales from "../components/ViewSales";
import UpdateSale from "../components/UpdateSale";
import DeleteSale from "../components/DeleteSale";

const contractAddress = `0x5FbDB2315678afecb367f032d93F642f64180aa3`;

async function connectWallet() {
  if (!window.ethereum) throw new Error("MetaMask not found");

  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);

  const signer = await provider.getSigner();
  const userAddress = await signer.getAddress();

  return { provider, signer, userAddress };
}

export default function App() {
  const [signer, setSigner] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  if (authToken) {
    console.log("Logged In.");
  }

  return (
    <div className="h-screen flex gap-4 justify-center items-center">
      <Login
        connectWallet={connectWallet}
        setSigner={setSigner}
        setAuthToken={setAuthToken}
      />
      <CreateToken
        contractAddress={contractAddress}
        connectWallet={connectWallet}
        signer={signer}
        authToken={authToken}
      />
      <ViewTokens authToken={authToken} />
      <CreateSale contractAddress={contractAddress} signer={signer} />
      <ViewSales authToken={authToken} />
      <BuyTokens contractAddress={contractAddress} signer={signer} />
      <UpdateSale contractAddress={contractAddress} signer={signer} />
      <DeleteSale contractAddress={contractAddress} signer={signer} />
    </div>
  );
}
