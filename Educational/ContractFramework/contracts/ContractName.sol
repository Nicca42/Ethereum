pragma solidity ^0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract ContractName is Ownable {
    address private Owner;
    string public name;

    modifier onlyOnwer() {
        require(Owner==msg.sender, "This is a restricted function");
        _;
    }

    constructor(string memory _name) public {
        Owner = msg.sender;
        name = _name;
    }

    function accessRestricted(string memory _newName) 
        public
        onlyOnwer()
    {
        name = _newName;
    }

    /**
      * @dev Fallback function, for if a function is
      *     called on the contract, that dose not exist.
      * @notice With mistaken funds the contract... ~TODO~
      */
    function() external {

    }
}