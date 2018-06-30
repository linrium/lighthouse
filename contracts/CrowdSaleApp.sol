pragma solidity ^0.4.20;

import "./CrowdSale.sol";

contract CrowdSaleApp {
    address public owner;
    mapping(address => string) creators;

    event LogCrowdSaleCreated(
        address contractAddr,
        address indexed creator,
        string title,
        string description,
        uint fundingGoalInEthers,
        uint durationInMinutes,
        string thumbnailHash
    );
    event LogCreatorCreated(address indexed creator, string contentHash);

    modifier onlyCreator() {
        bytes memory creatorHash = bytes(creators[msg.sender]);
        require(creatorHash.length > 0);
        _;
    }

    constructor() public {
        owner = msg.sender;
    }

    function createCrowdSale(
        string _title,
        string _description,
        uint _fundingGoalInEthers,
        uint _durationInMinutes,
        string _thumbnailHash
    )
    public
    onlyCreator
    returns (bool) {
        address contractAddr = new CrowdSale(_title, _description, _fundingGoalInEthers, _durationInMinutes, _thumbnailHash);

        emit LogCrowdSaleCreated(
            contractAddr,
            msg.sender,
            _title,
            _description,
            _fundingGoalInEthers,
            _durationInMinutes,
            _thumbnailHash
        );

        return true;
    }

    function createCreator(string _infoHash) public {
        creators[msg.sender] = _infoHash;
        emit LogCreatorCreated(msg.sender, _infoHash);
    }
}