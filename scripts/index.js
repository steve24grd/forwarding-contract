// index.js

const { ethers } = require("ethers");
const fs = require("fs");
require("dotenv").config();

(async () => {
    try {
        // Load environment variables
        const {
            SENDER_PRIVATE_KEY,
            FACTORY_CONTRACT_ADDRESS,
            FACTORY_ABI_PATH,
            POOL_ADDRESS,
            PROVIDER_URL,
            FORWARDER_ADDRESS // Load forwarder address from .env
        } = process.env;

        // Validate environment variables
        if (
            !SENDER_PRIVATE_KEY ||
            !FACTORY_CONTRACT_ADDRESS ||
            !FACTORY_ABI_PATH ||
            !POOL_ADDRESS ||
            !PROVIDER_URL ||
            !FORWARDER_ADDRESS // Validate forwarder address
        ) {
            throw new Error("Please set all required environment variables in .env");
        }

        // Read Factory ABI
        const factoryAbi = JSON.parse(fs.readFileSync(FACTORY_ABI_PATH, "utf8"));

        // Initialize provider
        const provider = new ethers.JsonRpcProvider(PROVIDER_URL);

        // Initialize wallet
        const wallet = new ethers.Wallet(SENDER_PRIVATE_KEY, provider);
        console.log(`Sender Address: ${wallet.address}`);

        // Instantiate Factory Contract
        const factoryContract = new ethers.Contract(
            FACTORY_CONTRACT_ADDRESS,
            factoryAbi,
            wallet
        );

        // Function to send ETH to the Forwarder
        const sendETHToForwarder = async (forwarderAddress, amountInEther) => {
            console.log(`Sending ${amountInEther} ETH to Forwarder at ${forwarderAddress}...`);

            const tx = await wallet.sendTransaction({
                to: forwarderAddress,
                value: ethers.parseEther(amountInEther),
                // Optional: You can specify gasLimit or gasPrice if needed
            });

            console.log("Transaction sent. Hash:", tx.hash);

            // Wait for transaction to be mined
            const receipt = await tx.wait();
            console.log("Transaction mined in block:", receipt.blockNumber);

            return receipt;
        };

        // Use the forwarder address from .env
        const forwarderAddress = FORWARDER_ADDRESS;
        console.log(`Using Forwarder deployed at: ${forwarderAddress}`);

        // Send ETH to the Forwarder
        const amountToSend = "0.05"; // ETH
        await sendETHToForwarder(forwarderAddress, amountToSend);

        // Optional: Verify the Pool's balance
        const poolBalance = await provider.getBalance(POOL_ADDRESS);
        console.log(`Pool Balance: ${ethers.formatEther(poolBalance)} ETH`);

    } catch (error) {
        console.error("Error:", error);
    }
})();
