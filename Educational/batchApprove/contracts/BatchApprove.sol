pragma solidity 0.6.6;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";

contract BatchApprove {

    /**
     * So here we are just doing a standard single approve, getting the smart
     * contract approved to spend the token.
     */
    function oneTokenApprove(address _token, uint256 _amount) public {
        bytes memory payload = abi.encodeWithSignature(
            "approve(address,uint256)", 
            address(this),
            _amount
        );

        (bool status, bytes memory returnData) = _token.delegatecall(payload);
    }
    
    // _token.delegatecall(
    //     bytes4(keccak256("approve(address,uint256)")),
    //     address(this),
    //     _amount
    // );

    // _e.delegatecall(
    //     bytes4(sha3("setN(uint256)")),
    //     _n
    // );

}