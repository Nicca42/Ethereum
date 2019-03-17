pragma solidity >=0.5.0 < 0.6.0;

import "./IERC721.sol";

contract Content is IERC721 {
// DATA 
    address private _userContract;
    enum ContentRating { NOTRATED, FAMILY, PG13, PG16, PG18, R18}
    struct ContentInformation {
        address owner;
        ContentRating rating;
        bool moderated;
        ContentRating modRating;
    }
    mapping (uint256 => ContentInformation) allContent;
    mapping (address => uint256[]) creatorsContent;
// EVENTS
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
// MODIFIERS

// FUNCTIONS
    constructor(address _user) public {
        _userContract = _user;
    }

    function registerContent(
        string calldata _contentTitle,
        string calldata _contentDescripton,
        uint _rating
    )
        external
        returns(uint256)
    {
        require(uint(ContentRating.R18) >= _rating, "Invalid rating");
        uint256 tokenId = uint256(keccak256(abi.encodePacked(_contentTitle, _contentDescripton)));
        allContent[tokenId] = ContentInformation({
            owner: msg.sender,
            rating: ContentRating(_rating),
            moderated: false,
            modRating: ContentRating.NOTRATED
        });
        creatorsContent[msg.sender].push(tokenId);
        return tokenId;
    }

    function balanceOf(address _owner) 
        public 
        view 
        returns(uint256 balance)
    {
        return creatorsContent[_owner].length;
    }   
    
    function ownerOf(uint256 tokenId) public view returns (address owner);

    function approve(address to, uint256 tokenId) public;
    function getApproved(uint256 tokenId) public view returns (address operator);

    function setApprovalForAll(address operator, bool _approved) public;
    function isApprovedForAll(address owner, address operator) public view returns (bool);

    function transferFrom(address from, address to, uint256 tokenId) public;
    function safeTransferFrom(address from, address to, uint256 tokenId) public;

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) public;

}