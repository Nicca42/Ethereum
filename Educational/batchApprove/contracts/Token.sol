pragma solidity 0.6.6;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor(
        string memory tokenName,
        string memory tokenSymbol
    ) 
        ERC20(
            tokenName,
            tokenSymbol
        ) 
        public 
    {

    }

    function mint(uint256 amount) public {
        _mint(msg.sender, amount);
    }
}