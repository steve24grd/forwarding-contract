const ethers = require("ethers");
const fs = require("fs");
require("dotenv").config();

const createForwarderAddress = async () => {
    try {
        // Load environment variables
        const {
            SENDER_PRIVATE_KEY,
            FACTORY_CONTRACT_ADDRESS,
            FACTORY_ABI_PATH,
            POOL_ADDRESS,
            PROVIDER_URL
        } = process.env;

        // Validate environment variables
        if (
            !SENDER_PRIVATE_KEY ||
            !FACTORY_CONTRACT_ADDRESS ||
            !FACTORY_ABI_PATH ||
            !POOL_ADDRESS ||
            !PROVIDER_URL
        ) {
            throw new Error("Please set all required environment variables in .env");
        }

        // Read Factory ABI
        const factoryAbi = JSON.parse(fs.readFileSync(FACTORY_ABI_PATH, "utf8"));

        // Initialize provider for Polygon Amoy Testnet
        const provider = new ethers.JsonRpcProvider("https://rpc-amoy.polygon.technology/");

        // Add network configuration check
        const network = await provider.getNetwork();
        if (network.chainId !== 80002n) {
            throw new Error("Please connect to Polygon Amoy Testnet (Chain ID: 80002)");
        }

        console.log("Connected to Polygon Amoy Testnet");

        // Initialize wallet
        const wallet = new ethers.Wallet(SENDER_PRIVATE_KEY, provider);
        console.log(`Sender Address: ${wallet.address}`);

        // Instantiate Factory Contract
        const factoryContract = new ethers.Contract(
            FACTORY_CONTRACT_ADDRESS,
            factoryAbi,
            wallet
        );

        console.log("Deploying a new Forwarder...");

        // Send transaction to create a new Forwarder
        const tx = await factoryContract.createForwarder(POOL_ADDRESS);
        console.log("Transaction sent. Hash:", tx.hash);

        // Wait for transaction to be mined
        const receipt = await tx.wait();
        console.log("Transaction mined in block:", receipt.blockNumber);

        // Log the entire receipt for debugging
        console.log("Transaction receipt:", receipt);

        // **Log Gas Used**
        console.log("Gas Used:", receipt.gasUsed.toString());

        // Parse the logs using the contract interface
        const event = factoryContract.interface.parseLog(receipt.logs.find(
            (log) => log.address.toLowerCase() === FACTORY_CONTRACT_ADDRESS.toLowerCase()
        ));

        if (!event || event.name !== "ForwarderCreated") {
            throw new Error("ForwarderCreated event not found");
        }

        const forwarderAddress = event.args.forwarderAddress;
        console.log(`New Forwarder deployed at: ${forwarderAddress}`);

        return forwarderAddress;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

// Call the function locally
(async () => {
    try {
        const forwarderAddress = await createForwarderAddress();
        console.log(`Forwarder address: ${forwarderAddress}`);
    } catch (error) {
        console.error("Error:", error);
    }
})();

module.exports = { createForwarderAddress };