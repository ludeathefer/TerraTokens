require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      // accounts: {
      //   mnemonic: "extend pact fetch false arm umbrella journey split bottom country oven luxury",
      // },
      chainId: 1337,
    },
  },
};
