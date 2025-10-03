# DAO Condominium: A Decentralized Solution for Condominium Management

**DAO Condominium** is a full-stack Decentralized Autonomous Organization (DAO) designed to streamline condominium governance through blockchain technology. Built on the BSC Testnet, it empowers residents to manage daily operations transparently and securely, integrating Web2 and Web3 paradigms.

## Key Features

- **Resident Management**: Register and manage residents, assign roles (e.g., counselor, manager), and track residence details.
- **Fee Payments**: Handle monthly condo fees and supplier invoices via MetaMask wallet integration, with automated next-payment tracking.
- **Topic Creation & Voting**: Propose, discuss, and vote on community topics (e.g., decisions, budget changes) with immutable blockchain records.
- **Permission-Based Access**: Dynamic UI that unlocks features based on user roles and topic statuses.

## Architecture

- **On-Chain Backend**: Solidity smart contracts (with upgradeable Adapter) for core logic, tested with Hardhat for gas efficiency.
- **Off-Chain Backend**: Node.js/Express with MongoDB for sensitive data and file storage, secured by JWT and Multer.
- **Frontend dApp**: Responsive React + Vite interface for seamless user interaction.

## Setup Instructions

### 1. Prerequisites
- Node.js (v18+; includes npm), MetaMask wallet.
- MongoDB (local or Atlas account).
- BSC Testnet BNB (via faucet: [BSC Testnet Faucet](https://testnet.binance.org/faucet-smart)).
- Clone the repo: `git clone [repository-url] && cd dao-condominium`.

### 2. On-Chain Backend (Contracts)
- Navigate to `/contracts`: `cd contracts`.
- Install deps: `npm install`.
- Copy `.env.example` to `.env` and add your private key, BSC Testnet RPC (e.g., `https://data-seed-prebsc-1-s1.binance.org:8545`), and contract addresses.
- Compile & test: `npm run compile && npm run test`.
- Deploy: `npm run deploy` (updates `addresses.json`).

### 3. Off-Chain Backend (API)
- Navigate to `/backend`: `cd backend`.
- Install deps: `npm install`.
- Copy `.env.example` to `.env` and configure MongoDB URI, JWT secret, and contract addresses from `addresses.json`.
- Run: `npm run dev` (starts on `http://localhost:3001`).

### 4. Frontend dApp
- Navigate to `/frontend`: `cd frontend`.
- Install deps: `npm install`.
- Copy `.env.example` to `.env` and add API URL (`http://localhost:3001`), contract addresses, and BSC Testnet RPC.
- Run: `npm run dev` (starts on `http://localhost:3000`).

### 5. Test & Connect
- Open `http://localhost:3000` in MetaMask-enabled browser.
- Connect wallet to BSC Testnet, log in, and interact (e.g., register resident, pay fee).
- For production: Update env vars with mainnet RPC and deploy contracts.

**Troubleshooting**: Check console for errors; ensure env vars match across services. 

## Contributing

This project demonstrates practical Web3 adoption for real-world use cases like community governance. Explore the code, deploy on BSC Testnet.

[Repository Link] | **Tech Stack**: Solidity, Hardhat, Ethers.js, React, Vite, Express, MongoDB, JWT.

---

*Project developed as part of the WEB23 course by @luiztools.*