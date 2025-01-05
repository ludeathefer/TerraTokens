const { ethers } = require("hardhat");
const { ethers: rawEthers } = require("ethers");

async function main() {

  // Create a custom provider using ethers.js
  const customProvider = new rawEthers.JsonRpcProvider('http://localhost:8545');

  customProvider.pollingInterval = 1000;

  // Get the list of available signers in Hardhat
  const signers = await ethers.getSigners();

  if (signers.length === 0) {
    throw new Error("No accounts found in the Hardhat network");
  }

  const signer = signers[0]

  // Connect the signer to the custom provider
  const customSigner = signer.connect(customProvider);

  const Contract = await ethers.getContractFactory("Land", customSigner);

  console.log("Deploying contract...");

  const deployedTx = await Contract.deploy()
  const deployed = await deployedTx.waitForDeployment();

  console.log('Deployed at: ', await deployed.getAddress())

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});