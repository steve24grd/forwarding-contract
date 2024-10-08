# Forwarder Contract Project

This project implements a Forwarder contract system using Solidity, Truffle, and Ganache.

## Prerequisites

Before setting up the project, ensure you have the following installed:

1. Node.js and npm (Node Package Manager)
2. Truffle
3. Ganache

## Installation

1. Install Truffle globally:
   ```
   npm install -g truffle
   ```

2. Install Ganache:
   - For the GUI version, download from the [official Ganache website](https://trufflesuite.com/ganache/).
   - For the CLI version, install globally using npm:
     ```
     npm install -g ganache
     ```

## Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd <project-directory>
   ```

2. Copy the `.env.example` file to `.env` and fill in the required values:
   ```
   cp .env.example .env
   ```

## Install Dependencies

Install the necessary Node.js packages:

```
npm install
```

This will install dependencies like `ethers`, `dotenv`, and Truffle-related packages.

## Compile and Deploy with Truffle

1. Ensure Ganache is running locally on port 8545.

2. Compile the contracts:
   ```
   truffle compile
   ```

3. Deploy the contracts to the local Ganache network:
   ```
   truffle migrate
   ```

   This will deploy the `ForwarderFactory` contract and create a sample `Forwarder` instance.

## Extract ABI

After compilation, extract the ABI for the `ForwarderFactory` contract:

```
node scripts/extractABI.js
```

This script will create an `abis` folder and save the ABI as `ForwarderFactory.json`.