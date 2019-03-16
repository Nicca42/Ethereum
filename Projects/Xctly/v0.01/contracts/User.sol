pragma solidity >=0.5.0 < 0.6.0;

import "./IERC20.sol";

contract User is IERC20 {
// DATA
    enum Consume {VIEW, LIKE, LOVE, DISLIKE}
    struct UserDetails {
        uint256 balance;
        string userName;
    }
    mapping(address => UserDetails) users;
// EVENTS
    event Transfer(
        address indexed from, 
        address indexed to, 
        uint256 value
    );
    event Approval(
        address indexed owner, 
        address indexed spender, 
        uint256 value
    );
// MODIFIERS
    modifier sufficientFunds(uint256 _amount) {
        require(
            users[msg.sender].balance >= _amount, 
            "User has insuficient funds"
        );
        _;
    }
// FUNCTIONS
    constructor() public {

    }

    function buy(uint256 _amount) 
        external 
        sufficientFunds(_amount)
    { 

    }

    function sell() 
        external 
    { 

    }

    function consumeContet(
        uint _constumeType,
        uint256 _tokenId
    ) 
        external
        returns(bool) 
    {
        return true;
    }

    function transfer(
        address to, 
        uint256 value
    ) 
        external 
        returns(bool)
    {

    }

    function approve(
        address spender, 
        uint256 value
    ) 
        external 
        returns(bool)
    {

    }

    function transferFrom(
        address from, 
        address to, 
        uint256 value
    ) 
        external 
        returns(bool)
    {

    }

    function totalSupply() 
        external 
        view 
        returns(uint256)
    {

    }

    function balanceOf(address who) 
        external 
        view 
        returns(uint256)
    {

    }

    function allowance(
        address owner, 
        address spender
    ) 
        external 
        view 
        returns(uint256)
    {

    }
}