import React, { useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";

interface LandFractionalizationForm {
  metadataURI: string;
  numberOfFractions: number;
}

interface TransactionState {
  isProcessing: boolean;
  error: string | null;
  success: boolean;
  hash: string | null;
}

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contractABI = [
  "event LandFractionalized(uint256 landId, uint256 numberOfFractions, string metadataURI)",
  "function fractionalizeLand(string memory metadataURI, uint256 numberOfFractions) public",
];

const Demo = () => {
  // Form state
  const [formData, setFormData] = useState<LandFractionalizationForm>({
    metadataURI: "",
    numberOfFractions: 0,
  });

  // Wallet and contract state
  const [wallet, setWallet] = useState<ethers.Wallet | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [provider, setProvider] = useState<ethers.providers.Provider | null>(
    null
  );

  // Transaction and result state
  const [txState, setTxState] = useState<TransactionState>({
    isProcessing: false,
    error: null,
    success: false,
    hash: null,
  });
  const [landId, setLandId] = useState<string | null>(null);

  // Initialize provider and contract
  useEffect(() => {
    const initializeProvider = async () => {
      try {
        if (window.ethereum) {
          // Use MetaMask if available
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );

          setProvider(provider);
          setContract(contract);
        } else {
          // Fallback to local provider
          const localProvider = new ethers.providers.JsonRpcProvider(
            "http://127.0.0.1:8545/"
          );
          const privateKey =
            process.env.VITE_PRIVATE_KEY ||
            "a148871fe3abee28d588c57bb8188db3bbc22507cad3509ff1cafc8068c62d8f";
          const wallet = new ethers.Wallet(privateKey, localProvider);
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            wallet
          );

          setProvider(localProvider);
          setWallet(wallet);
          setContract(contract);
        }
      } catch (error) {
        console.error("Failed to initialize provider:", error);
        setTxState((prev) => ({
          ...prev,
          error: "Failed to connect to wallet or network",
        }));
      }
    };

    initializeProvider();
  }, []);

  // Handle form changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "numberOfFractions" ? parseInt(value) || 0 : value,
    }));
  };

  // Event listener setup
  useEffect(() => {
    if (!contract) return;

    const handleLandFractionalized = (
      landId: ethers.BigNumber,
      numberOfFractions: ethers.BigNumber,
      metadataURI: string
    ) => {
      setLandId(landId.toString());
      setTxState((prev) => ({
        ...prev,
        success: true,
        isProcessing: false,
      }));
    };

    contract.on("LandFractionalized", handleLandFractionalized);

    return () => {
      contract.off("LandFractionalized", handleLandFractionalized);
    };
  }, [contract]);

  // Fractionalize land function
  const fractionalizeLand = async () => {
    if (!contract || !provider) {
      setTxState((prev) => ({
        ...prev,
        error: "Please connect your wallet first",
      }));
      return;
    }

    if (!formData.metadataURI || formData.numberOfFractions <= 0) {
      setTxState((prev) => ({
        ...prev,
        error: "Please enter valid metadata URI and number of fractions",
      }));
      return;
    }

    setTxState({
      isProcessing: true,
      error: null,
      success: false,
      hash: null,
    });

    try {
      const signer =
        wallet || (provider as ethers.providers.Web3Provider).getSigner();
      const nonce = await provider.getTransactionCount(
        await signer.getAddress()
      );

      const tx = await contract.fractionalizeLand("formData.metadataURI", 12, {
        nonce,
      });

      setTxState((prev) => ({
        ...prev,
        hash: tx.hash,
      }));

      await tx.wait();
    } catch (error: any) {
      console.error("Error fractionalizing land:", error);
      setTxState((prev) => ({
        ...prev,
        isProcessing: false,
        error: error.message || "Transaction failed",
      }));
    }
  };

  // Reset form function
  const resetForm = () => {
    setFormData({
      metadataURI: "",
      numberOfFractions: 0,
    });
    setTxState({
      isProcessing: false,
      error: null,
      success: false,
      hash: null,
    });
    setLandId(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Fractionalize Land</h1>

      {txState.error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {txState.error}
        </div>
      )}

      {txState.success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Transaction successful! Land has been fractionalized.
        </div>
      )}

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Metadata URI:
            <input
              type="text"
              name="metadataURI"
              value={formData.metadataURI}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="Enter Metadata URI"
              disabled={txState.isProcessing}
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Number of Fractions:
            <input
              type="number"
              name="numberOfFractions"
              value={formData.numberOfFractions}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="Enter number of fractions"
              min="1"
              disabled={txState.isProcessing}
            />
          </label>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={fractionalizeLand}
            disabled={txState.isProcessing}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {txState.isProcessing ? "Processing..." : "Fractionalize Land"}
          </button>

          <button
            onClick={resetForm}
            disabled={txState.isProcessing}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
          >
            Reset
          </button>
        </div>
      </form>

      {txState.hash && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-medium">Transaction Hash:</h3>
          <p className="break-all">{txState.hash}</p>
        </div>
      )}

      {landId && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-medium">Land Details:</h3>
          <p>Land ID: {landId}</p>
          <p>Number of Fractions: {formData.numberOfFractions}</p>
          <p>Metadata URI: {formData.metadataURI}</p>
        </div>
      )}
    </div>
  );
};

export default Demo;
