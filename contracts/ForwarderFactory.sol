// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Forwarder.sol";

/**
 * @title ForwarderFactory
 * @dev A factory contract to deploy multiple Forwarder contracts.
 */
contract ForwarderFactory {
    // Array to keep track of all deployed Forwarder contracts
    Forwarder[] public forwarders;

    // Events
    event ForwarderCreated(address forwarderAddress, address poolAddress);

    /**
     * @dev Deploys a new Forwarder contract with the specified pool address.
     * @param _pool The address of the pool to which the Forwarder will send ETH.
     * @return The address of the newly deployed Forwarder contract.
     */
    function createForwarder(address payable _pool) external returns (address) {
        Forwarder forwarder = new Forwarder(_pool);
        forwarders.push(forwarder);
        emit ForwarderCreated(address(forwarder), _pool);
        return address(forwarder);
    }

    /**
     * @dev Returns the total number of Forwarder contracts deployed.
     */
    function getForwardersCount() external view returns (uint256) {
        return forwarders.length;
    }

    /**
     * @dev Retrieves a Forwarder contract by index.
     * @param index The index in the forwarders array.
     * @return The Forwarder contract at the specified index.
     */
    function getForwarder(uint256 index) external view returns (Forwarder) {
        require(index < forwarders.length, "Index out of bounds.");
        return forwarders[index];
    }
}
