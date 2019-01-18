pragma Solidity ^0.5.0;

contract Content {
    address private Owner;
    uint256 private nonce = 0;

    struct ContentDetails {
        string IPFSAddress;
        address creator;
        string description;
        bool active;
    }

    mapping (uint256 => ContentDetails) TokensToContent;

    constructor() 
        public
    {
        Owner = msg.sender;
    }

    function CreateContent(
        string memory _description
    )
        public
    {
        uint256 tokenID = uint256(keccak256(abi.encodePacked(_description, msg.sender, nonce)));
        // TokensToContent[tokenID] = 
        // nonce = nonce + 1;
    }
}