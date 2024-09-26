const ForwarderFactory = artifacts.require("ForwarderFactory");
const Forwarder = artifacts.require("Forwarder");

module.exports = async function(deployer, network, accounts) {
  // Deploy ForwarderFactory
  await deployer.deploy(ForwarderFactory);
  const forwarderFactory = await ForwarderFactory.deployed();

  console.log("ForwarderFactory deployed to:", forwarderFactory.address);

  // Deploy a sample Forwarder using the factory
  // Replace this address with your desired pool address
  // const samplePoolAddress = "0x8270ef105315729d0A12E340e54E3F1930E56054";
  
  // const result = await forwarderFactory.createForwarder(samplePoolAddress);
  
  // Get the ForwarderCreated event
  // const forwarderCreatedEvent = result.logs.find(log => log.event === "ForwarderCreated");
  // const forwarderAddress = forwarderCreatedEvent.args.forwarderAddress;

  // console.log("Sample Forwarder deployed to:", forwarderAddress);
};