const hre = require("hardhat");

async function main() {
  try {
    console.log("Starting deployment of Land contract...");

    const Land = await hre.ethers.getContractFactory("Land");
    const land = await Land.deploy();
    const landAddress = await land.getAddress();

    console.log(`Land contract deployed to: ${landAddress}`);

    if (network.config.chainId !== 31337 && process.env.ETHERSCAN_API_KEY) {
      console.log("Waiting for block confirmations...");
      await land.deployTransaction.wait(6);

      console.log("Verifying contract...");
      await hre.run("verify:verify", {
        address: land.address,
        constructorArguments: [],
      });
      console.log("Contract verified on Etherscan");
    }

    const deploymentReceipt = await land.deploymentTransaction().wait();
    console.log(
      `Gas used for deployment: ${deploymentReceipt.gasUsed.toString()}`
    );
  } catch (error) {
    console.error("Error during deployment:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
