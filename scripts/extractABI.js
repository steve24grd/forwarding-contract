const fs = require('fs');
const path = require('path');

const contractName = 'ForwarderFactory';
const buildPath = path.join(__dirname, '..', 'build', 'contracts', `${contractName}.json`);
const outputPath = path.join(__dirname, '..', 'abis', `${contractName}.json`);

const contractJson = require(buildPath);
const abi = contractJson.abi;

fs.writeFileSync(outputPath, JSON.stringify(abi, null, 2));
console.log(`ABI extracted to ${outputPath}`);