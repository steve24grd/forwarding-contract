const { ethers } = require("ethers");
require("dotenv").config();

async function getBalance(address) {
    try {
        // Connect to local Ganache provider
        const provider = new ethers.JsonRpcProvider("http://localhost:8545");

        // Get balance
        const balance = await provider.getBalance(address);

        console.log(`Address: ${address}`);
        console.log(`Balance: ${ethers.formatEther(balance)} ETH`);
    } catch (error) {
        console.error("Error:", error);
    }
}

// Usage
// const addressToCheck = process.env.ADDRESS_TO_CHECK || "0x..."; // Replace with an actual address or use .env
const addressToCheck = "0xC040D5Bc3730B06B85810eaB20A0f570d6229806";
getBalance(addressToCheck);