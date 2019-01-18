pragma solidity ^0.5.0;

contract ContractName {
    address private Owner;

    constructor() public {
        Owner = msg.sender;
    }

    /**
      * @dev Fallback function, for if a function is
      *     called on the contract, that dose not exist.
      * @notice With mistaken funds the contract... ~TODO~
      */
    function() external {

    }
}