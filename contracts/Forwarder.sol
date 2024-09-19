// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Forwarder
 * @dev A contract that forwards any received ETH to a pre-configured pool address.
 */
contract Forwarder {
    // The pool address to which all received ETH will be forwarded
    address payable public immutable pool;

    // Events
    event Forwarded(address indexed sender, uint256 amount);

    /**
     * @dev Sets the pool address upon deployment.
     * @param _pool The address of the pool to forward ETH to.
     */
    constructor(address payable _pool) {
        require(_pool != address(0), "Pool address cannot be zero.");
        pool = _pool;
    }

    /**
     * @dev Fallback function to receive ETH and forward it to the pool.
     * This function is called when the contract receives plain ETH transfers.
     */
    receive() external payable {
        _forward();
    }

    /**
     * @dev Fallback function to handle calls with data (if needed).
     */
    fallback() external payable {
        _forward();
    }

    /**
     * @dev Internal function to forward received ETH to the pool.
     */
    function _forward() internal {
        require(msg.value > 0, "No ETH to forward.");

        // Forward the ETH to the pool using call
        (bool success, ) = pool.call{value: msg.value}("");
        require(success, "Forwarding failed.");

        emit Forwarded(msg.sender, msg.value);
    }
}
