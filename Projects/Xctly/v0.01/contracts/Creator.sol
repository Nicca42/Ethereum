pragma solidity >=0.5.0 < 0.6.0;

contract Creator {
    address private _userContract;
    struct CreatorDetails {
        uint256[] content;
    }
    enum ContentRating {FAMILY, PG13, PG16, PG18, R18}
    struct ContentInformation {
        address owner;
        ContentRating rating;
        bool moderated;
    }
    mapping (uint256 => ContentInformation) allContent;

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
        uint256 tokenId = uint256(keccak256(abi.encodePacked(_contentTitle, _contentDescripton)));

        return tokenId;
    }
}