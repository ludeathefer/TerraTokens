# TerraTokens

## Overview
TerraTokens is a blockchain-based platform that enables fractional land ownership through tokenization. By leveraging Ethereum, TerraTokens provides a secure, transparent, and efficient way to manage land ownership. The project integrates Web3.js for blockchain interaction and connects with a land registry database for ownership verification before tokenization.

## Features
- **Land Tokenization**: Convert land assets into fractional tokens for shared ownership.
- **Wallet Integration**: Supports Metamask wallet for transactions.
- **Transaction History**: Records all transactions on the blockchain for transparency.
- **Search and Filter**: Allows users to search and filter available tokenized land assets.
- **User Profile Management**: Enables users to manage their land assets and transactions.

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/ludeathefer/TerraTokens.git
   cd TerraTokens
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```
4. Deploy smart contracts to Polygon:
   ```sh
   npx hardhat run scripts/deploy.js --network polygon
   ```
5. Connect the frontend with Web3:
   - Configure `web3.js` with the deployed smart contract address.
   - Update `.env` with the required API keys and database credentials.
