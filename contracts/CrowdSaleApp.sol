pragma solidity ^0.4.20;

import "./CrowdSale.sol";

contract CrowdSaleApp {
    address public owner;

    event LogCrowdSaleCreated(
        address contractAddr,
        address indexed creator,
        string title,
        string description,
        uint fundingGoalInEthers,
        uint durationInMinutes,
        string thumbnailHash
    );

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
}