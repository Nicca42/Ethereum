pragma solidity 0.5.10;

contract NeverLoose {
    address public owner_;
    address public holdingToken_;

    constructor(address _token) {
        owner_ = msg.sender;
        holdingToken_ = _token;
    }

    /**
      * Swapping Eth for a token
      */
    function short(
        uint256 _amount
    ) 
        public
        payable
    {
        /**
          * Sells the recived eth for a token
          * Records the price at the time of trade
          */
    }

    /**
      * Swapping a token for Eth
      */
    function long(
        uint256 _amount
    )
        public
    {
        /**
          * Sells the token for eth
          * Records price for sell
          */
    }

    /**
      * Make a JS/python script that will execute presigned txs. 
      * That swaps and buys at different prices 
      */
}